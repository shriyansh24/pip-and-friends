/* Rust book, chapter 9 extension (Case Files and Windows). Loads after comic-cast.js.
   Adds one widget the engine does not have: the slice window. A row of heap bytes (one box per character,
   as wide as the bytes it takes in UTF-8) with byte numbers on the boundaries, a window frame laid over the
   bytes start..end, and the slice's own small record (ptr and len) with an arrow to the exact byte where the
   window starts. Use it to show what &s[a..b] borrows, and why a cut inside a character fails.

     <section class="panel clean slicewin" data-slicewin="ID"> ... .sw-stage, .screen, narration, controls ... </section>
     <script type="application/json" id="ID">{ "text": "hello world", "owner": "s", "name": "world",
       "program": "windows.rs",
       "steps": [ { "a": 6, "b": 11, "code": "&s[6..11]", "line": "[6..11] world", "note": "HTML" },
                  { "a": 0, "b": 2, "code": "&s[..2]", "program": "case_boundary.rs",
                    "error": "end byte index 2 is not a char boundary", "note": "HTML" } ] }</script>

   Parity: a step with "line" must find that exact line in its program's real output; a step with "error" must
   find that text in its program's real stderr (each step may name its own "program"). The window drawn for an
   "error" step must really cut a character (a or b inside one), and for a "line" step must not; the widget
   checks both, shows a badge, and reports any mismatch (console error). Keyboard: the shared stepper
   (arrows, Space, R). Text version: a transcript table listing every window. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch9.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, sv = L.sv;

  function utf8Len(ch) { var c = ch.codePointAt(0); return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4; }
  function shownOf(prog) { return L.shown ? L.shown(prog) : (prog.screen != null ? prog.screen : prog.stdout); }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-slicewin")).textContent);
    var chars = Array.from(m.text), starts = [], n = 0;
    chars.forEach(function (ch) { starts.push(n); n += utf8Len(ch); });
    var bounds = starts.concat([n]);
    function onBoundary(i) { return bounds.indexOf(i) >= 0; }
    function charAt(i) { for (var k = 0; k < chars.length; k++) if (i > starts[k] && i < starts[k] + utf8Len(chars[k])) return k; return -1; }

    // parity: every step against its real run
    var ok = true;
    m.steps.forEach(function (s, i) {
      var name = s.program || m.program, prog = L.program(name);
      if (!prog) { ok = false; return; }
      var cut = !onBoundary(s.a) || !onBoundary(s.b);
      if (s.error != null) {
        if (prog.stderr.indexOf(s.error) < 0) { ok = false; L.report("slicewin:" + name, "step " + (i + 1) + " error text not in the real stderr"); }
        if (!cut) { ok = false; L.report("slicewin:" + name, "step " + (i + 1) + " is an error step but the window cuts no character"); }
      } else {
        var lines = shownOf(prog).split("\n");
        if (lines.indexOf(s.line) < 0) { ok = false; L.report("slicewin:" + name, "step " + (i + 1) + " line not in the real output: " + s.line); }
        if (cut) { ok = false; L.report("slicewin:" + name, "step " + (i + 1) + " cuts a character but claims an output"); }
      }
    });
    var progs = [];
    m.steps.forEach(function (s) { var p = s.program || m.program; if (progs.indexOf(p) < 0) progs.push(p); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every window matches the real run of " + progs.join(" and ") : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var svgEl = box.querySelector("svg.sw-svg"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    // Layout is chosen from the space available: on a phone the drawing gets a narrower viewBox (smaller byte
    // boxes, same type sizes). When even that is wider than the box, it is drawn at natural size (every label at its
    // design size, 17px and up) and its .picscroll wrapper scrolls sideways with the engine's hint (L.scrollHint).
    var W, X0, TOP = 86, CH = 58, VW, VH = 314, scroller = svgEl.parentNode, stage = scroller.parentNode;
    function bx(i) { return X0 + i * W; }
    function layout() {
      var avail = (stage && stage.clientWidth ? stage.clientWidth - 12 : 660), narrow = avail < 560;
      W = narrow ? Math.min(40, Math.floor(600 / n)) : Math.min(54, Math.floor(600 / n));
      VW = narrow ? Math.max(n * W + 44, 350) : 660;
      X0 = Math.round((VW - n * W) / 2);
      svgEl.setAttribute("viewBox", "0 0 " + VW + " " + VH);
      var natural = narrow && VW > avail;
      svgEl.style.width = natural ? VW + "px" : "";
      svgEl.style.maxWidth = natural ? "none" : "";
      if (L.scrollHint) L.scrollHint(scroller);
    }

    function draw(s) {
      layout();
      while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
      var cut = !onBoundary(s.a) || !onBoundary(s.b);
      var t = sv("text", { x: 12, y: 26, "class": "sw-h" }, svgEl); t.textContent = "HEAP BYTES · owned by " + m.owner;
      // the shelf board under the bytes
      sv("rect", { x: X0 - 12, y: TOP + CH + 2, width: n * W + 24, height: 12, rx: 3, "class": "sw-board" }, svgEl);
      chars.forEach(function (ch, k) {
        var x = bx(starts[k]), w = utf8Len(ch) * W, inside = starts[k] >= s.a && starts[k] + utf8Len(ch) <= s.b;
        var g = sv("g", { "class": "sw-book" + (inside ? " in" : "") }, svgEl);
        sv("rect", { x: x + 2, y: TOP, width: w - 4, height: CH, rx: 5, "class": "sw-cell" }, g);
        for (var j = 1; j < utf8Len(ch); j++) sv("path", { d: "M" + (x + j * W) + " " + (TOP + 6) + " v" + (CH - 12), "class": "sw-split" }, g);
        var tt = sv("text", { x: x + w / 2, y: TOP + 38, "class": "sw-ch" }, g); tt.textContent = ch === " " ? "\u2423" : ch;
      });
      for (var i = 0; i <= n; i++) {
        var tk = sv("text", { x: bx(i), y: TOP + CH + 38, "class": "sw-idx" + (onBoundary(i) ? "" : " mid") }, svgEl); tk.textContent = String(i);
        sv("path", { d: "M" + bx(i) + " " + (TOP + CH + 14) + " v8", "class": "sw-tick" }, svgEl);
      }
      // the window frame, with the slice expression written above it
      var fx = bx(s.a) - 5, fw = Math.max(10, (s.b - s.a) * W + 10);
      var fg = sv("g", { "class": "sw-frame" + (cut ? " bad" : ""), "data-now": "" }, svgEl);   // the clue the engine keeps in view on phones
      sv("rect", { x: fx, y: TOP - 12, width: fw, height: CH + 24, rx: 4, "class": "sw-glass" }, fg);
      sv("rect", { x: fx, y: TOP - 12, width: fw, height: CH + 24, rx: 4, "class": "sw-wood" }, fg);
      if (s.b - s.a > 1) sv("path", { d: "M" + (fx + fw / 2) + " " + (TOP - 12) + " v" + (CH + 24), "class": "sw-mullion" }, fg);
      var lx = Math.min(Math.max(fx + fw / 2, 80), VW - 80);
      var lbl = sv("text", { x: lx, y: TOP - 22, "class": "sw-code" }, fg); lbl.textContent = s.code + (cut ? "  \u2717" : "");
      // the slice's own record: ptr + len, with an arrow from ptr to the byte where the window starts
      var ax = bx(s.a) + 16, cw = 320, cy = TOP + CH + 56, cx = Math.min(Math.max(12, ax - 20), VW - cw - 12);
      var cg = sv("g", { "class": "sw-card" + (cut ? " bad" : "") }, svgEl);
      sv("rect", { x: cx, y: cy, width: cw, height: 100, rx: 8, "class": "sw-cardbg" }, cg);
      var bad = onBoundary(s.a) ? s.b : s.a;
      var r1 = sv("text", { x: cx + 38, y: cy + 32, "class": "sw-row" }, cg); r1.textContent = cut ? "byte " + bad + " is inside '" + chars[charAt(bad)] + "'" : "ptr \u2192 byte " + s.a;
      var r2 = sv("text", { x: cx + 38, y: cy + 62, "class": "sw-row" }, cg); r2.textContent = cut ? "not on a letter's edge" : "len = " + (s.b - s.a) + "  (" + s.b + " \u2212 " + s.a + ")";
      var h = sv("text", { x: cx + 38, y: cy + 89, "class": "sw-cardh" }, cg); h.textContent = cut ? "so no slice is made: panic" : m.name + ": &" + (m.kind || "str") + ", a window";
      if (cut) { var xx = sv("text", { x: cx + 12, y: cy + 34, "class": "sw-row" }, cg); xx.textContent = "\u2717"; }
      else {
        var sx = cx + 20, sy = cy + 26, ty = TOP + CH + 17;
        sv("circle", { cx: sx, cy: sy, r: 6, "class": "sw-dot" }, cg);
        sv("path", { d: "M" + sx + " " + sy + " C " + sx + " " + (sy - 24) + ", " + ax + " " + (ty + 22) + ", " + ax + " " + (ty + 2), "class": "sw-arrow" }, cg);
        sv("path", { d: "M" + (ax - 8) + " " + (ty + 13) + " L" + ax + " " + (ty + 1) + " L" + (ax + 8) + " " + (ty + 13), "class": "sw-arrow" }, cg);
      }
    }

    function render(st, announce) {
      var s = m.steps[st.step];
      draw(s);
      if (s.error != null) out.innerHTML = '<span class="err">' + esc(s.error) + "</span>";
      else out.textContent = s.line;
      note.innerHTML = '<span class="count">Window ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Window " + (st.step + 1) + ": " + s.code + ", bytes " + s.a + " to " + s.b + ". " + (s.error != null ? "Error: " + s.error : "Shows: " + s.line) + ". " + note.textContent.replace(/^Window \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s.code) + "</code></td><td>" + s.a + " up to (not including) " + s.b + "</td><td>" + (s.error != null ? "panic: " + esc(s.error) : "<samp>" + esc(s.line) + "</samp>") + "</td><td>" + s.note + "</td></tr>";
    }).join("");
    var run = L.runner(box, m.steps.length, render, { reserve: true });
    run.reset(m.steps.length);
    var lastW = 0;
    root.addEventListener("resize", function () { var w = stage.clientWidth; if (w !== lastW) { lastW = w; draw(m.steps[run.state().step]); } });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-slicewin]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("slicewin", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
