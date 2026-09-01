/* Rust book, chapter 27 extension: "One Waiter, Many Stamps" (async with Tokio, and macros).
   Adds, registered with the comic engine:
   (1) cast: asyncwaiter  (now in comic-critters.js, engine pass 3; this page loads it) the restaurant's one waiter (one thread running the async runtime). data-pose = tray (default),
                          frozen (stuck at the kitchen door: stiff arms, frost marks, flat mouth), run (speed lines),
                          note (writing an order slip), cheer. data-label = name badge (<= 5 characters, default "TOKIO").
             codestamp    a rubber stamp that prints code: a knob, a wooden block with data-label (<= 9 characters) and a
                          rubber face of code lines. data-state = up (default) or press (stamped onto paper, with the
                          printed lines showing underneath).
   (2) [data-waitline]    the one-waiter timeline: a clock axis, a lane for the waiter and one lane per task. Stepping
                          fills the lanes in: short solid blocks marked ▶ where code runs, dashed bars marked zz while a
                          task waits, hatched bars marked ! where the waiter is frozen. Model: { program, quote: [source
                          fragments that must occur in the program], max, unit, tasks: [{id, label}], steps: [{ t, waiter:
                          {kind: serve|idle|frozen|main, text}, states: {taskId: "todo"|"run"|"wait"|"blocked"|"done"},
                          print?, note }] }. Parity: every printed line is the next line of the program's real stdout,
                          and the screen at the last step equals it exactly. The clock is a teaching model worked out from
                          the sleep lengths in the source (which the model quotes, checked), and is labelled as such.
   (3) [data-stamppress]  the macro stamp press: pick a macro call and the stamp prints the code the compiler really
                          wrote for it. Model: { label, examples: [{ in, program, from, to, skip?, note }] }. The expansion shown is CUT
                          from the program's real captured output (the -Zunpretty=expanded step): from the first line
                          whose trimmed text equals `from` to the next line whose trimmed text equals `to` (after skipping
                          `skip` earlier matches), de-indented.
                          Nothing is typed. A missing line is reported and the badge turns bad.
   Steppers use the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fill a
   text-version table. States are told apart by words, marks (▶ zz ! ✓ ·) and border styles, never by colour alone.
   Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch27.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function mono(x, y, t, size, anchor) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>";
  }

  /* ---------------- (1b) cast: the code stamp ---------------- */
  L.cast.codestamp = { vb: "0 0 200 200", draw: function (el) {
    var label = (el.getAttribute("data-label") || "macro!").slice(0, 9), press = el.getAttribute("data-state") === "press";
    // the label names the stamp, so it must stay readable: 28 units (24 for long labels, squeezed to the 100-unit plate)
    // is 12px or more at the 104px phone size used by the stamp press
    var fs = label.length > 7 ? 24 : 28, squeeze = label.length * 0.6 * fs > 100, dy = press ? 26 : 0, out = "";
    // the paper, and (when pressed) the printed lines
    out += '<path d="M14 168 L186 168 L178 196 L22 196 z" fill="#FFFFFF"' + S(3.5) + "/>";
    if (press) out += '<g fill="none"' + S(3) + '><path d="M50 176 h70 M50 184 h96 M50 192 h56"/></g>' +
      '<path d="M30 150 l-12 -8 M170 150 l12 -8 M26 128 l-14 -2 M174 128 l14 -2" fill="none"' + S(3) + "/>";
    out += '<g class="bob" transform="translate(0 ' + dy + ')">';
    out += '<circle cx="100" cy="24" r="18" fill="#FF5A4E"' + S(4) + '/><path d="M92 40 h16 v22 h-16 z" fill="#E8D3B0"' + S(4) + "/>";
    out += '<rect x="36" y="62" width="128" height="50" rx="8" fill="#E8D3B0"' + S(4) + "/>" +
      '<rect x="48" y="70" width="104" height="34" rx="5" fill="#FFFFFF"' + S(3) + "/>" + mono(100, 96, label, fs).replace("<text ", squeeze ? '<text textLength="100" lengthAdjust="spacingAndGlyphs" ' : "<text ");
    out += '<rect x="42" y="112" width="116" height="20" rx="3" fill="#2B2B2B"' + S(3) + "/>" +
      '<path d="M54 122 h40 M100 122 h46" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>';
    return out + "</g>";
  } };

  /* ---------------- (2) the one-waiter timeline ---------------- */
  var WORD = { run: "▶ running its code", wait: "zz waiting (the waiter is free)", blocked: "! stuck: the waiter is frozen elsewhere", done: "✓ finished", todo: "· not started" };
  var WAITERWORD = { serve: "▶ ", idle: "zz ", frozen: "! ", main: "▶ " };
  function mountWaitline(box) {
    var m = model(box.getAttribute("data-waitline")), prog = L.program(m.program);
    if (!prog) return;
    var ok = true, real = L.shown(prog), lines = real.replace(/\n$/, "").split("\n"), unit = m.unit || "ms";
    (m.quote || []).forEach(function (q) { if (prog.src.indexOf(q) < 0) { ok = false; L.report("waitline", "the model quotes " + q + ", which is not in " + m.program); } });
    var shownSoFar = [], steps = m.steps.map(function (s, i) {
      if (s.print != null) {
        (Array.isArray(s.print) ? s.print : [s.print]).forEach(function (p) {
          if (lines[shownSoFar.length] !== p) { ok = false; L.report("waitline", "step " + (i + 1) + " prints '" + p + "', but line " + (shownSoFar.length + 1) + " of the real run is '" + lines[shownSoFar.length] + "'"); }
          shownSoFar.push(p);
        });
      }
      return { t: s.t, waiter: s.waiter, states: s.states, note: s.note, output: shownSoFar.slice() };
    });
    var last = steps[steps.length - 1].output;
    if ((last.length ? last.join("\n") + "\n" : "") !== real) { ok = false; L.report("waitline", "the final screen does not equal the real run of " + m.program); }
    var par = box.querySelector(".controls .parity");
    if (par) { par.textContent = ok ? "Every printed line matches the real run of " + m.program : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    // Segments per lane, built from the steps: a state holds from its step's time until the next step's time.
    var maxT = m.max || Math.max.apply(null, steps.map(function (s) { return s.t; }).concat([1]));
    function segmentsUpTo(k) {
      var lanes = { waiter: [] };
      m.tasks.forEach(function (t) { lanes[t.id] = []; });
      for (var i = 0; i <= k; i++) {
        var s = steps[i], end = i < k ? steps[i + 1].t : s.t;
        var wk = s.waiter.kind;
        add(lanes.waiter, { from: s.t, to: end, kind: wk === "main" ? "serve" : wk });
        m.tasks.forEach(function (t) { var st = s.states[t.id] || "todo"; if (st !== "todo" && st !== "done") add(lanes[t.id], { from: s.t, to: end, kind: st }); });
      }
      return lanes;
    }
    // A wait that starts exactly where the previous wait of the same kind ended is one bar, not two.
    function add(list, sg) {
      var prev = list[list.length - 1];
      if (prev && prev.kind === sg.kind && prev.to === sg.from && sg.kind !== "run" && sg.kind !== "serve") prev.to = sg.to; else list.push(sg);
    }
    var stage = box.querySelector(".wl-stage"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var ticks = "", step = m.tick || (maxT <= 300 ? 50 : 100);
    for (var k = 0; k <= maxT + 0.001; k += step) ticks += '<span style="left:' + (k / maxT * 100) + '%">' + k + "</span>";
    stage.innerHTML = '<div class="wl-row wl-axisrow"><span class="wl-name">model clock<small>(' + esc(unit) + ")</small></span><div class=\"wl-track wl-axis\"><div class=\"wl-ticks\">" + ticks + "</div></div></div>" +
      '<div class="wl-row wl-waiter" data-lane="waiter"><span class="wl-name">the waiter<small>one thread</small></span><div class="wl-track"><div class="wl-segs"></div><div class="wl-hand"></div></div><span class="wl-state"></span></div>' +
      m.tasks.map(function (t) { return '<div class="wl-row" data-lane="' + esc(t.id) + '"><span class="wl-name">' + esc(t.label) + '</span><div class="wl-track"><div class="wl-segs"></div><div class="wl-hand"></div></div><span class="wl-state"></span></div>'; }).join("");
    function segHtml(sg, nth) {
      var left = sg.from / maxT * 100, w = (sg.to - sg.from) / maxT * 100;
      var mark = sg.kind === "run" || sg.kind === "serve" ? "▶" : sg.kind === "wait" || sg.kind === "idle" ? "zz" : "!";
      var cls = sg.kind === "serve" ? "run" : sg.kind === "idle" ? "wait" : sg.kind === "frozen" ? "blocked" : sg.kind;
      if (w < 0.5 && cls !== "run") return "";   // a wait that has only just begun has no length to draw yet
      var shift = w < 0.5 && nth ? ";margin-left:" + (-13 + 14 * nth) + "px" : "";
      return '<span class="wl-seg is-' + cls + (w < 0.5 ? " dot" : "") + '" style="left:' + left + "%;width:" + Math.max(w, 0) + "%" + shift + '">' + mark + "</span>";
    }
    function stateText(st) { return WORD[st || "todo"] || esc(st); }
    var prevLen = 0;
    function render(si, announce) {
      var s = steps[si.step], lanes = segmentsUpTo(si.step);
      var rows = stage.querySelectorAll("[data-lane]");
      for (var r = 0; r < rows.length; r++) {
        var id = rows[r].getAttribute("data-lane");
        var atT = {};   // several moments at the same clock time (three polls at 0 ms) are drawn side by side, not on top of each other
        rows[r].querySelector(".wl-segs").innerHTML = lanes[id].map(function (sg) { var n = atT[sg.from] = (atT[sg.from] || 0) + 1; return segHtml(sg, n - 1); }).join("");
        rows[r].querySelector(".wl-hand").style.left = (s.t / maxT * 100) + "%";
        var st = id === "waiter" ? null : (s.states[id] || "todo");
        rows[r].className = "wl-row" + (id === "waiter" ? " wl-waiter is-" + s.waiter.kind : " is-" + st);
        if (id === "waiter") rows[r].setAttribute("data-now", ""); 
        rows[r].querySelector(".wl-state").innerHTML = id === "waiter" ? (WAITERWORD[s.waiter.kind] || "") + esc(s.waiter.text) : stateText(st);
      }
      out.innerHTML = s.output.length ? s.output.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = s.output.length;
      note.innerHTML = '<span class="count">Step ' + (si.step + 1) + " of " + steps.length + " · model clock " + s.t + " " + esc(unit) + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (si.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, i) {
      var who = "waiter: " + esc(s.waiter.text) + "; " + m.tasks.map(function (t) { return esc(t.label) + ": " + stateText(s.states[t.id]).replace(/^(▶|zz|!|✓|·) /, ""); }).join("; ");
      return "<tr><td>" + (i + 1) + "</td><td>" + s.t + " " + esc(unit) + "</td><td>" + s.note + "</td><td>" + who + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  /* ---------------- (3) the macro stamp press ---------------- */
  function cut(prog, from, to, skip) {
    var ls = prog.stdout.replace(/\n$/, "").split("\n"), a = -1, b = -1, left = skip || 0;
    for (var i = 0; i < ls.length; i++) { if (ls[i].trim() === from) { a = i; break; } }
    if (a < 0) return null;
    for (var j = a; j < ls.length; j++) { if (ls[j].trim() === to) { if (left-- > 0) continue; b = j; break; } }
    if (b < 0) return null;
    var part = ls.slice(a, b + 1), ind = Math.min.apply(null, part.filter(function (l) { return l.trim(); }).map(function (l) { return l.match(/^ */)[0].length; }));
    return part.map(function (l) { return l.slice(ind); }).join("\n");
  }
  function mountPress(box) {
    var m = model(box.getAttribute("data-stamppress")), bad = 0;
    m.examples.forEach(function (ex) {
      var prog = L.program(ex.program);
      ex._code = prog ? cut(prog, ex.from, ex.to, ex.skip) : null;
      if (ex._code == null) { bad++; L.report("stamppress", "the expansion for " + ex.in + " was not found in the real output of " + ex.program); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " expansion(s) not found in the real compiler output" : "Every expansion is cut from the compiler's real output"; par.classList.toggle("bad", !!bad); }
    var chips = box.querySelector(".chips"), stage = box.querySelector(".press-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    chips.innerHTML = '<span class="label">PRESS THE STAMP ON:</span>' + m.examples.map(function (ex, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(ex.in) + "</code></button>"; }).join("");
    stage.innerHTML = '<div class="press-in"><p class="label">YOU WRITE</p><pre class="code"></pre></div>' +
      '<svg class="char press-art" data-char="codestamp" data-label="' + esc(m.label || "macro!") + '"></svg>' +
      '<div class="press-out"><p class="label">THE COMPILER GETS</p><pre class="code"></pre></div>';
    var art = stage.querySelector(".press-art"), pin = stage.querySelector(".press-in pre"), pout = stage.querySelector(".press-out pre");
    function show(i, announce) {
      var ex = m.examples[i];
      var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      pin.innerHTML = L.highlight(ex.in);
      pout.innerHTML = ex._code == null ? "(not found)" : L.highlight(ex._code);
      art.setAttribute("data-state", "press");
      L.drawCast(stage);
      if (L.fitLabels) L.fitLabels();
      stage.classList.remove("run"); void stage.offsetWidth; if (L.motionOn()) stage.classList.add("run");
      note.innerHTML = ex.note;
      if (live && announce) live.textContent = ex.in + " expands to " + (ex._code || "").split("\n").length + " lines of code. " + note.textContent;
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    var tv = box.querySelector(".press-text");
    if (tv) tv.innerHTML = m.examples.map(function (ex) { return "<h4><code>" + esc(ex.in) + "</code></h4><pre class=\"code\">" + (ex._code == null ? "(not found)" : L.highlight(ex._code)) + "</pre>"; }).join("");
    show(0, false);
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-waitline]");
    for (var i = 0; i < b.length; i++) { try { mountWaitline(b[i]); } catch (e) { L.report("waitline", e.message); } }
    var p = document.querySelectorAll("[data-stamppress]");
    for (var j = 0; j < p.length; j++) { try { mountPress(p[j]); } catch (e) { L.report("stamppress", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
