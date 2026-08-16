/* Chapter 5 extension: loops. Registers three small widgets with the comic engine.
   1. [data-laps]      a lap counter wheel that sits inside a walker or tracer. It reads the same step model
                       (extra fields per step: lap, rule, state) and follows the stepper by watching its narration.
                       It claims nothing about output; the stepper's own parity badge covers the screen.
   2. [data-rangeline] a number line for range(start, stop, step). Each example is computed here AND checked
                       against the numbers its captured program really printed (parity badge per example).
   3. [data-runaway]   the infinite-loop wheel: a lap counter that races until you press Ctrl+C. It shows no
                       program output (an infinite run cannot be captured), only how many laps went by.
   Keyboard: every control is a real <button>. Text versions: aria-live lines plus a sentence under each drawing. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT; if (!P || !P.comic || !P.comic.ext) return;
  var L = P.comic.lib, esc = L.esc, NS = "http://www.w3.org/2000/svg";
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }

  /* ---------- shared wheel drawing (hand-drawn, with lap dots around the rim) ---------- */
  function wheelSvg(total, done, big) {
    var r = L.rng(11), out = '<g class="lw-rot">', cx = 80, cy = 80, R = 58;
    out += '<circle cx="80" cy="80" r="' + R + '" fill="#FFF6CC"' + L.stroke(4) + "/>";
    for (var s = 0; s < 6; s++) { var a = s * Math.PI / 3; out += '<path d="M' + (cx + Math.cos(a) * 20).toFixed(1) + " " + (cy + Math.sin(a) * 20).toFixed(1) + " L" + (cx + Math.cos(a) * (R - 6)).toFixed(1) + " " + (cy + Math.sin(a) * (R - 6)).toFixed(1) + '" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>'; }
    out += '<path d="' + L.wob(r, [[cx - R + 4, cy - 30], [cx - R + 10, cy - 44]], 0.6) + '" fill="none"' + L.stroke(3) + "/></g>";
    out += '<circle cx="80" cy="80" r="30" fill="#FFFFFF"' + L.stroke(3.5) + "/>";
    out += '<text x="80" y="' + (big ? 92 : 90) + '" text-anchor="middle" class="lw-num">' + esc(String(big == null ? "" : big)) + "</text>";
    for (var i = 0; i < total; i++) {
      var ang = total === 1 ? -Math.PI / 2 : -Math.PI * 0.8 + i * (Math.PI * 0.6 / (total - 1));
      var x = cx + Math.cos(ang) * (R + 14), y = cy + Math.sin(ang) * (R + 14);
      out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="7" class="lw-dot' + (i < done ? " on" : "") + '"/>';
    }
    return out;
  }

  /* ---------- 1. lap counter that follows a stepper ---------- */
  function mountLaps(box) {
    var m = model(box.getAttribute("data-laps")), host = box.closest("[data-walk],[data-tracer]");
    if (!host) { L.report("laps", "lap counter must sit inside a walker or tracer"); return; }
    var total = Number(box.getAttribute("data-total") || 3), word = box.getAttribute("data-word") || "lap";
    box.innerHTML = '<svg class="lw-svg" viewBox="0 -12 160 172" aria-hidden="true" focusable="false"></svg><div class="lw-text"><p class="lw-state"></p><p class="lw-rule"></p></div>';
    var art = box.querySelector(".lw-svg"), st = box.querySelector(".lw-state"), ru = box.querySelector(".lw-rule");
    var note = host.querySelector(".narration"), lastLap = null;
    function paint() {
      var mt = /Step (\d+) of/.exec((note.querySelector(".count") || note).textContent || ""); if (!mt) return;
      var s = m.steps[Number(mt[1]) - 1]; if (!s) return;
      var lap = s.lap || 0, state = s.state || (lap ? "spin" : "wait");
      art.innerHTML = wheelSvg(total, lap, lap || "–");
      box.classList.toggle("stopped", state === "stop");
      st.innerHTML = state === "wait" ? "<b>Not spinning yet</b>" : state === "stop" ? "<b>Stopped</b> after " + lap + " " + word + (lap === 1 ? "" : "s") : "<b>" + word.toUpperCase() + " " + lap + "</b> of " + total;
      ru.innerHTML = s.rule ? "<code>" + esc(s.rule) + "</code>" + (/True$/.test(s.rule) ? " ✓ keep going" : /False$/.test(s.rule) ? " ✗ stop" : "") : "&nbsp;";
      if (lap !== lastLap && lastLap !== null && lap > lastLap && L.motionOn()) { box.classList.remove("turn"); void box.offsetWidth; box.classList.add("turn"); }
      lastLap = lap;
    }
    paint();
    new MutationObserver(paint).observe(note, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- 2. range() number line ---------- */
  function rangeValues(a, b, c) { var v = [], g = 0; if (c > 0) for (var i = a; i < b && g++ < 200; i += c) v.push(i); else for (var j = a; j > b && g++ < 200; j += c) v.push(j); return v; }
  function mountRange(box) {
    var m = model(box.getAttribute("data-rangeline")), svg = box.querySelector(".rl-svg"), chips = box.querySelector(".rl-chips");
    var note = box.querySelector(".rl-note"), par = box.querySelector(".parity"), live = box.querySelector("[aria-live]"), text = box.querySelector(".rl-text");
    var W = 600, H = 210, X0 = 30, X1 = W - 30, AY = 140, span = m.max - m.min, cur = 0;
    // Phones: a narrower drawing (420 units) so the numbers stay readable without sideways scrolling.
    function fit() { var nw = (box.querySelector(".rl-wrap").clientWidth || 600) < 500 ? 420 : 600; if (nw === W) return false; W = nw; X1 = W - 30; return true; }
    fit();
    function x(v) { return X0 + (v - m.min) * (X1 - X0) / span; }
    m.examples.forEach(function (ex) {
      ex.values = rangeValues(ex.start, ex.stop, ex.step);
      var q = L.program(ex.program);
      var printed = q ? L.shown(q).split("\n").filter(function (l) { return /^-?\d+$/.test(l); }).map(Number) : [];
      ex.ok = !!q && printed.join(",") === ex.values.join(",");
      if (!ex.ok) L.report("rangeline:" + ex.code, "values do not match the captured run of " + ex.program);
    });
    chips.innerHTML = '<span class="label">TRY:</span>' + m.examples.map(function (ex, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(ex.code) + "</code></button>"; }).join("");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    function draw(i, announce) {
      var ex = m.examples[i], r = L.rng(3 + i); cur = i;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.classList.toggle("narrow", W < 600);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      // axis and ticks
      sv("path", { d: L.wob(r, [[X0 - 14, AY], [X1 + 14, AY]], 1.2), "class": "rl-axis" }, svg);
      for (var v = m.min; v <= m.max; v++) {
        sv("path", { d: "M" + x(v) + " " + (AY - 8) + " V" + (AY + 8), "class": "rl-tick" }, svg);
        var t = sv("text", { x: x(v), y: AY + 34, "text-anchor": "middle", "class": "rl-n" + (ex.values.indexOf(v) >= 0 ? " on" : "") }, svg); t.textContent = v;
      }
      // the stop sign: dashed box, a cross, and words (never colour alone)
      var sx = x(ex.stop);
      var gap = (X1 - X0) / span, bw = Math.min(40, gap * 0.86), cr = Math.min(9, gap * 0.22);
      sv("rect", { x: sx - bw / 2, y: AY - 22, width: bw, height: 66, rx: 8, "class": "rl-stop" }, svg);
      sv("path", { d: "M" + (sx - cr) + " " + (AY - cr) + " l" + 2 * cr + " " + 2 * cr + " M" + (sx + cr) + " " + (AY - cr) + " l" + (-2 * cr) + " " + 2 * cr, "class": "rl-x" }, svg);
      var st = sv("text", { x: sx, y: AY + 64, "text-anchor": "middle", "class": "rl-lab stop" }, svg); st.textContent = "stop " + ex.stop + ": not included";
      if (sx + (W < 600 ? 100 : 90) > W) { st.setAttribute("text-anchor", "end"); st.setAttribute("x", sx + 22); }
      if (sx - (W < 600 ? 100 : 90) < 0) { st.setAttribute("text-anchor", "start"); st.setAttribute("x", sx - 22); }
      // hops: arcs from each value to the next; the last hop goes on to where the next value WOULD be
      var hops = ex.values.slice(), next = ex.values[ex.values.length - 1] + ex.step;
      for (var h = 0; h < hops.length; h++) {
        var a = x(hops[h]), b = x(h + 1 < hops.length ? hops[h + 1] : next), ghost = h + 1 >= hops.length;
        if (ghost && (next < m.min - 0.5 || next > m.max + 0.5)) continue;
        var lift = Math.min(70, 26 + Math.abs(b - a) * 0.35);
        var p = sv("path", { d: "M" + a + " " + (AY - 14) + " Q " + ((a + b) / 2) + " " + (AY - 14 - lift * 1.6) + " " + b + " " + (AY - 14), "class": "rl-hop" + (ghost ? " ghost" : "") }, svg);
        p.style.animationDelay = (h * 0.18) + "s";

      }
      ex.values.forEach(function (v, k) {
        var c = sv("circle", { cx: x(v), cy: AY, r: Math.min(11, (X1 - X0) / span * 0.32), "class": "rl-dot" }, svg); c.style.animationDelay = (k * 0.18) + "s";
      });
      var fx = x(ex.start);
      sv("path", { d: "M" + fx + " " + (AY - 12) + " V" + (AY - 52) + " l22 7 l-22 7", "class": "rl-flag" }, svg);
      var sl = sv("text", { x: Math.max(fx + 11, 34), y: AY - 60, "text-anchor": "middle", "class": "rl-lab" }, svg); sl.textContent = "start";
      // hop size: once, at the top, centred over the numbers it produced
      var mid = (x(Math.min.apply(null, ex.values)) + x(Math.max.apply(null, ex.values))) / 2;
      var lt = sv("text", { x: Math.min(Math.max(mid, 120), W - 120), y: 30, "text-anchor": "middle", "class": "rl-lab" }, svg);
      lt.textContent = "hop size (step): " + (ex.step > 0 ? "+" : "") + ex.step;
      svg.classList.remove("go"); void svg.getBoundingClientRect(); if (L.motionOn()) svg.classList.add("go");
      var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      note.innerHTML = ex.note;
      var sentence = esc(ex.code) + " gives " + ex.values.join(", ") + ". That is " + ex.values.length + " number" + (ex.values.length === 1 ? "" : "s") + ", and it stops before " + ex.stop + ".";
      text.innerHTML = "<b>In words:</b> <code>" + esc(ex.code) + "</code> gives " + esc(ex.values.join(", ")) + ". That is " + ex.values.length + " numbers; it stops before " + esc(String(ex.stop)) + ".";
      if (par) { par.textContent = ex.ok ? "Matches the real run of " + ex.program : "Does not match the real run of " + ex.program; par.classList.toggle("bad", !ex.ok); }
      svg.setAttribute("aria-label", "Number line from " + m.min + " to " + m.max + ". " + sentence);
      if (live && announce) live.textContent = sentence;
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) draw(Number(b.getAttribute("data-i")), true); });
    draw(0, false);
    root.addEventListener("resize", function () { if (fit()) draw(cur, false); });
  }

  /* ---------- 3. the runaway wheel (infinite loop) ---------- */
  function mountRunaway(box) {
    box.insertAdjacentHTML("afterbegin", '<svg class="lw-svg rw-wheel" viewBox="0 -12 160 172" aria-hidden="true" focusable="false"></svg>');
    var art = box.querySelector(".rw-wheel"), num = box.querySelector(".rw-count b"), stop = box.querySelector(".rw-stop"), again = box.querySelector(".rw-again"), msg = box.querySelector(".rw-msg");
    var laps = 0, timer = null, userStopped = false;
    art.innerHTML = wheelSvg(0, 0, "∞");
    function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
    function tick() { laps += L.motionOn() ? 7919 : 104729; num.textContent = fmt(laps); }
    function run() { if (timer) return; box.classList.add("running"); timer = root.setInterval(tick, L.motionOn() ? 60 : 700); }
    function pause() { if (timer) { root.clearInterval(timer); timer = null; } box.classList.remove("running"); }
    function start() {
      userStopped = false; box.classList.remove("halted");
      stop.setAttribute("aria-disabled", "false"); again.setAttribute("aria-disabled", "true");
      msg.textContent = "Running. The wheel will never stop by itself."; run();
    }
    function halt() {
      pause(); userStopped = true; box.classList.add("halted");
      stop.setAttribute("aria-disabled", "true"); again.setAttribute("aria-disabled", "false");
      msg.textContent = "Stopped after " + fmt(laps) + " laps. In a real terminal you would see ^C, then a traceback whose last line is KeyboardInterrupt.";
    }
    stop.addEventListener("click", function () { if (this.getAttribute("aria-disabled") !== "true") halt(); });
    again.addEventListener("click", function () { if (this.getAttribute("aria-disabled") !== "true") { laps = 0; num.textContent = "0"; start(); } });
    stop.setAttribute("aria-disabled", "true"); again.setAttribute("aria-disabled", "false");
    msg.textContent = "Press Run the bug to start the wheel.";
    if ("IntersectionObserver" in root) {
      var first = true;
      new IntersectionObserver(function (en) { en.forEach(function (e) {
        if (e.isIntersecting) { if (first) { first = false; start(); } else if (!userStopped) run(); }
        else pause();
      }); }, { threshold: 0.5 }).observe(box);
    }
  }

  P.comic.ext(function () {
    var a = document.querySelectorAll("[data-laps]"), b = document.querySelectorAll("[data-rangeline]"), c = document.querySelectorAll("[data-runaway]");
    for (var i = 0; i < a.length; i++) { try { mountLaps(a[i]); } catch (e) { L.report("laps", e.message); } }
    for (var j = 0; j < b.length; j++) { try { mountRange(b[j]); } catch (e) { L.report("rangeline", e.message); } }
    for (var k = 0; k < c.length; k++) { try { mountRunaway(c[k]); } catch (e) { L.report("runaway", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
