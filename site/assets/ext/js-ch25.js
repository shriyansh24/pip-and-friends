/* JavaScript book, chapter 25 additions ("The Chef's Two Spikes"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch25.html.

   data-char="spike25"   An order spike: a nail on a round base with paper tickets stuck on it, and a name plate.
                         data-label   = the plate text, e.g. "VIP" or "NORMAL" (a VIP plate also carries a star)
                         data-tickets = how many tickets are on the spike (0 to 4, default 2)
                         The plate always says which spike it is in words, never by colour alone.

   [data-spikes25]       The chef's two spikes: an event-loop stepper. Model (JSON script named by the attribute):
                           { "program": "chef_await.js", "lanes": ["vip", "normal"],          // lanes to draw, in order
                             "steps": [ { "line": 7,                // the program line this step is about (optional)
                                          "stove": ["module code"], // what is cooking: the call stack, oldest first
                                          "tick": [], "vip": ["…"], "normal": ["…"], "check": [],   // tickets, oldest first
                                          "output": ["…"],          // the whole screen so far
                                          "note": "HTML" }, … ] }
                         Lanes: "tick" = the chef's sticky note (process.nextTick), "vip" = the VIP spike (microtasks:
                         promise callbacks, await continuations, queueMicrotask), "normal" = the normal spike (timer
                         tasks), "check" = the check window (setImmediate). A ticket that is new at this step says NEW;
                         the oldest ticket on each spike says NEXT (first in, first out), so no state rests on colour.
                         Parity: every step's screen must be a prefix of the real captured run and the last step must equal
                         it exactly; the badge says so and any mismatch is reported with L.report. Keyboard, Play and the
                         aria-live line come from L.runner. The text version is a table of every step.

   [data-timeline25]     Sequential or parallel awaits as a timeline drawn from the program's fixed fake delays. Model:
                           { "program": "sequential.js", "mode": "seq" | "par", "jobs": [["soup", 30], …],
                             "start": "  start {dish}", "done": "  done  {dish} ({ms} ms)" }
                         The widget computes when each job starts and finishes (seq: one after another; par: all start at
                         0 ms), draws one bar per job on a millisecond ruler, and works out the order of the start/done
                         lines that follows from those delays. Parity: that computed order must equal, line for line, the
                         start/done lines of the real run (other lines are ignored). It checks order, never timings: no
                         real time is measured or shown. The text version is a table of the computed events. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch25.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var TITLE = 'font-family="Bangers, Impact, sans-serif" letter-spacing="1" fill="' + INK + '"';
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800" fill="' + INK + '"';
  var BODY = 'font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" fill="' + INK + '"';

  /* ---------------- the order spike ---------------- */
  L.cast.spike25 = { vb: "0 0 150 210", draw: function (el) {
    var label = el.getAttribute("data-label") || "NORMAL", n = Math.max(0, Math.min(4, parseInt(el.getAttribute("data-tickets") || "2", 10) || 0));
    var vip = /vip/i.test(label), o = "";
    // base and nail
    o += '<ellipse cx="75" cy="176" rx="56" ry="14" fill="#F4F1EA"' + S(4) + "/>";
    o += '<path d="M75 172 V34" fill="none"' + S(5) + '/><path d="M71 38 L75 18 L79 38" fill="#FFFFFF"' + S(3) + "/>";
    // tickets, the newest on top
    var fills = ["#FFFFFF", "#FFF6CC", "#FFFFFF", "#FFF6CC"];
    for (var i = 0; i < n; i++) {
      var y = 140 - i * 26, rot = (i % 2 ? 6 : -5);
      o += '<g class="bob" transform="rotate(' + rot + ' 75 ' + (y + 14) + ')"><rect x="30" y="' + y + '" width="90" height="30" rx="3" fill="' + fills[i] + '"' + S(3) + "/>" +
        '<path d="M40 ' + (y + 11) + ' h44 M40 ' + (y + 20) + ' h30" fill="none"' + S(2.5) + '/><circle cx="75" cy="' + (y + 15) + '" r="2.6" fill="' + INK + '"/></g>';
    }
    // name plate
    var w = Math.max(70, label.length * 13 + (vip ? 40 : 22));
    o += '<rect x="' + (75 - w / 2) + '" y="186" width="' + w + '" height="22" rx="6" fill="' + (vip ? "#FFD60A" : "#DDE8FF") + '"' + S(3) + "/>";
    if (vip) o += '<path d="' + star(75 - w / 2 + 14, 197, 7, 3) + '" fill="#FFFFFF"' + S(1.8) + "/>";
    o += '<text x="' + (vip ? 75 + 8 : 75) + '" y="204" text-anchor="middle" font-size="17" ' + TITLE + ">" + esc(label) + "</text>";
    return o;
  } };
  function star(cx, cy, r1, r2) {
    var d = "";
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? r2 : r1;
      d += (i ? "L" : "M") + (cx + Math.cos(a) * r).toFixed(1) + " " + (cy + Math.sin(a) * r).toFixed(1);
    }
    return d + "Z";
  }

  /* ---------------- the chef's two spikes: event-loop stepper ---------------- */
  var LANES = {
    tick: { title: "STICKY NOTE", sub: "process.nextTick", cls: "tick" },
    vip: { title: "VIP SPIKE", sub: "microtasks", cls: "vip" },
    normal: { title: "NORMAL SPIKE", sub: "timers", cls: "normal" },
    check: { title: "CHECK WINDOW", sub: "setImmediate", cls: "check" }
  };
  function mountSpikes(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-spikes25")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var real = L.shown(prog), ok = true;
    m.steps.forEach(function (s, i) {
      var txt = s.output.length ? s.output.join("\n") + "\n" : "";
      if (real.indexOf(txt) !== 0) { ok = false; L.report("spikes25", "step " + (i + 1) + "'s screen is not a prefix of the real run of " + m.program); }
    });
    var last = m.steps[m.steps.length - 1];
    if ((last.output.length ? last.output.join("\n") + "\n" : "") !== real) { ok = false; L.report("spikes25", "the last screen does not equal the real run of " + m.program); }
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }

    var lanes = m.lanes || ["vip", "normal"];
    var lines = prog.src.replace(/\n$/, "").split("\n");
    var ol = box.querySelector(".spk-code");
    ol.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = ol.querySelectorAll("li");
    var kitchen = box.querySelector(".spk-kitchen");
    kitchen.innerHTML = '<div class="spk-lane stove"><h3>STOVE<small>call stack: cooking now</small></h3>' +
      '<div class="spk-chef"><svg class="char sm" data-char="chef"></svg></div><ol class="spk-pans"></ol></div>' +
      lanes.map(function (k) {
        var d = LANES[k];
        return '<div class="spk-lane ' + d.cls + '" data-lane="' + k + '"><h3>' + d.title + "<small>" + d.sub + '</small></h3><ol class="spk-tickets"></ol></div>';
      }).join("");
    L.drawCast(kitchen);
    var pans = kitchen.querySelector(".spk-pans");
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var prevLen = 0;

    function tickets(list, before) {
      if (!list || !list.length) return '<li class="none">(empty)</li>';
      return list.map(function (t, i) {
        var isNew = !before || before.indexOf(t) < 0;
        return '<li class="tk' + (isNew ? " new" : "") + '">' + (i === 0 ? '<span class="tag">NEXT</span>' : "") + (isNew ? '<span class="tag nw">NEW</span>' : "") + "<span>" + esc(t) + "</span></li>";
      }).join("");
    }
    function render(st, announce) {
      var s = m.steps[st.step], p = st.step > 0 ? m.steps[st.step - 1] : null;
      for (var k = 0; k < lis.length; k++) { var on = s.line === k + 1; lis[k].classList.toggle("on", on); if (on) lis[k].setAttribute("data-now", ""); else lis[k].removeAttribute("data-now"); }
      var stove = s.stove || [];
      pans.innerHTML = stove.length ? stove.slice().reverse().map(function (f, i) { return '<li class="pan' + (i === 0 ? " top" : "") + '">' + (i === 0 ? '<span class="tag">NOW</span>' : "") + "<span>" + esc(f) + "</span></li>"; }).join("") : '<li class="none">(stove empty: the chef looks at the spikes)</li>';
      lanes.forEach(function (k) {
        kitchen.querySelector('[data-lane="' + k + '"] .spk-tickets').innerHTML = tickets(s[k], p ? p[k] || [] : null);
      });
      var o = s.output;
      out.innerHTML = o.length ? o.map(function (l, idx) { return '<span class="' + (idx >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      var cells = lanes.map(function (k) { return "<td>" + ((s[k] && s[k].length) ? s[k].map(esc).join("; ") : "(empty)") + "</td>"; }).join("");
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line || "-") + "</td><td>" + ((s.stove && s.stove.length) ? s.stove.map(esc).join(" &gt; ") : "(empty)") + "</td>" + cells + "<td>" + s.note + "</td><td><code>" + (s.output.length ? esc(s.output[s.output.length - 1]) : "(nothing yet)") + "</code></td></tr>";
    }).join("");
    var th = box.querySelector(".transcript thead tr");
    if (th) th.innerHTML = "<th>Step</th><th>Line</th><th>Stove</th>" + lanes.map(function (k) { return "<th>" + LANES[k].title.toLowerCase() + "</th>"; }).join("") + "<th>What happens</th><th>Last screen line</th>";
    kitchen.setAttribute("data-reserve", "");   // the lanes grow and shrink per step: keep the tallest, so the buttons never move
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  /* ---------------- sequential vs parallel timeline ---------------- */
  function fmt(t, dish, ms) { return t.replace("{dish}", dish).replace("{ms}", String(ms)); }
  function mountTimeline(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-timeline25")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var ev = [], t = 0, bars = [];
    m.jobs.forEach(function (j, i) {
      var start = m.mode === "seq" ? t : 0, end = start + j[1];
      bars.push({ dish: j[0], ms: j[1], start: start, end: end, i: i });
      ev.push({ at: start, kind: 0, i: i, line: fmt(m.start, j[0], j[1]) });
      ev.push({ at: end, kind: 1, i: i, line: fmt(m.done, j[0], j[1]) });
      if (m.mode === "seq") t = end;
    });
    // at the same moment a start line is printed before a done line only in parallel mode (all start at 0 ms);
    // in sequential mode the next job starts right after the previous one is done
    ev.sort(function (a, b) { return a.at - b.at || (m.mode === "seq" ? b.kind - a.kind : a.kind - b.kind) || a.i - b.i; });
    var predicted = ev.map(function (e) { return e.line; });
    var startHead = m.start.split("{")[0], doneHead = m.done.split("{")[0];
    var realLines = L.shown(prog).split("\n").filter(function (l) { return l.indexOf(startHead) === 0 || l.indexOf(doneHead) === 0; });
    var ok = predicted.join("\n") === realLines.join("\n");
    if (!ok) L.report("timeline25", "the computed order does not match the real run of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Computed order matches the real run of " + m.program : "Computed order does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var total = Math.max.apply(null, bars.map(function (b) { return b.end; }));
    var scaleMax = Math.max(60, Math.ceil(total / 10) * 10);
    var W = 560, left = 96, right = 20, rowH = 46, top = 30, H = top + bars.length * rowH + 44;
    var px = function (ms) { return left + (ms / scaleMax) * (W - left - right); };
    var s = '<svg class="tl25-svg pic-wide" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(m.mode === "seq" ? "Sequential" : "Parallel") + ' timeline; the table below lists every start and finish.">';
    for (var ms = 0; ms <= scaleMax; ms += 10) {
      var x = px(ms);
      s += '<path d="M' + x.toFixed(1) + " " + (top - 6) + " V" + (top + bars.length * rowH) + '" stroke="#B9C7E3" stroke-width="1.5" stroke-dasharray="3 4" fill="none"/>';
      s += '<text x="' + x.toFixed(1) + '" y="' + (top - 12) + '" text-anchor="middle" font-size="14" ' + MONO + ">" + ms + "</text>";
    }
    var fills = ["#FFF6CC", "#DDE8FF", "#C9F2D9", "#FFE1E1"];
    bars.forEach(function (b, k) {
      var y = top + k * rowH + 8, x1 = px(b.start), x2 = px(b.end);
      s += '<text x="' + (left - 10) + '" y="' + (y + 21) + '" text-anchor="end" font-size="15" ' + MONO + ">" + esc(b.dish) + "</text>";
      s += '<g class="tl25-bar" style="--i:' + k + '"><rect x="' + x1.toFixed(1) + '" y="' + y + '" width="' + (x2 - x1).toFixed(1) + '" height="30" rx="6" fill="' + fills[k % 4] + '"' + S(3) + "/>";
      s += '<text x="' + ((x1 + x2) / 2).toFixed(1) + '" y="' + (y + 20) + '" text-anchor="middle" font-size="14" ' + BODY + ">" + b.ms + " ms</text></g>";
      s += '<path d="M' + x2.toFixed(1) + " " + (y - 3) + " v36" + '" fill="none"' + S(2.5) + "/>";
    });
    var yEnd = top + bars.length * rowH + 4, xe = px(total);
    s += '<path d="M' + xe.toFixed(1) + " " + (top - 2) + " V" + (yEnd + 6) + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 4"/>';
    var anchor = xe > W - 150 ? "end" : "start", tx = anchor === "end" ? xe - 6 : xe + 6;
    s += '<text x="' + tx.toFixed(1) + '" y="' + (yEnd + 28) + '" text-anchor="' + anchor + '" font-size="15" ' + BODY + ">all done at " + total + " ms</text>";
    s += '<text x="' + left + '" y="' + (yEnd + 28) + '" font-size="14" ' + BODY + ">milliseconds</text>";
    s += "</svg>";
    var stage = box.querySelector(".tl25-stage");
    stage.innerHTML = s;
    if (L.scrollHint) L.scrollHint(stage);   // engine .picscroll: 560px on phones, with its own swipe hint
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = ev.map(function (e, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + e.at + " ms</td><td>" + (e.kind ? "done" : "start") + " " + esc(bars[e.i].dish) + "</td><td><code>" + esc(e.line.trim()) + "</code></td></tr>";
    }).join("") + '<tr><td colspan="4">All done at ' + total + " ms (computed from the delays in the code, not measured).</td></tr>";
  }

  P.comic.ext(function () {
    var a = document.querySelectorAll("[data-spikes25]");
    for (var i = 0; i < a.length; i++) { try { mountSpikes(a[i]); } catch (e) { L.report("spikes25", e.message); } }
    var b = document.querySelectorAll("[data-timeline25]");
    for (var j = 0; j < b.length; j++) { try { mountTimeline(b[j]); } catch (e2) { L.report("timeline25", e2.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
