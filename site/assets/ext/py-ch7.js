/* Chapter 7 extension: the index ruler and the slice stepper (lists).
   Both draw a row of crates (the list creature) and check every claim against the captured runs:
     [data-ruler]  click an index (positive, negative, or out of range) and see which crate it picks.
                   Each pick's result must be a whole line of its program's output, or its error must be in stderr.
     [data-slicer] pick a slice and step through it: start at START, take, jump by step, stop BEFORE stop.
                   The stepper computes the slice with Python's rules; the result must equal the example's `out`
                   and `out` must be a whole line of the captured program's output. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch7.js loaded before comic.js"); return; }
  var esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function el(tag, a, parent, text) {
    var n = document.createElementNS(NS, tag);
    for (var k in a) n.setAttribute(k, a[k]);
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }
  /* The sealed crate (tuple) was first drawn here; it is comic-critters.js's `sealed` now (engine pass 3 removed this copy). */

  function lines(prog) { return L.shown(prog).replace(/\n$/, "").split("\n"); }
  function narrowFor(svg) { return ((svg.parentNode && svg.parentNode.clientWidth) || 800) < 560; }
  function geo(n, narrow, extra, nw) {
    var w = narrow ? (nw || 56) : 88, gap = narrow ? 4 : 16, mx = narrow ? 8 : 40;
    var slots = n + (extra || 0);
    return { w: w, gap: gap, mx: mx, width: mx * 2 + slots * w + (slots - 1) * gap, x: function (i) { return mx + i * (w + gap); },
      font: narrow ? 17 : 18, small: narrow ? 14 : 14 };
  }

  /* ============================ index ruler ============================ */
  function mountRuler(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-ruler")).textContent);
    var n = m.items.length, bad = 0;
    m.picks.forEach(function (p) {
      var prog = L.program(p.program || m.program);
      p._ok = !!prog && (p.error ? prog.stderr.indexOf(p.error) >= 0 : lines(prog).indexOf(p.expectLine) >= 0);
      if (!p._ok) { bad++; L.report("ruler:" + m.name, "pick " + p.i + " does not match its captured run"); }
      var want = p.i < 0 ? p.i + n : p.i;   // the crate this index should land on (or none)
      if (!p.error && (want < 0 || want >= n)) { bad++; L.report("ruler:" + m.name, "pick " + p.i + " is out of range but has no error"); }
      if (!p.error && p.expectLine.indexOf(String(m.items[want]).replace(/^'|'$/g, "")) < 0) { bad++; L.report("ruler:" + m.name, "pick " + p.i + " does not land on " + m.plain[want]); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " pick(s) do not match the real run" : "Every pick matches a real run"; par.classList.toggle("bad", !!bad); }
    var chips = box.querySelector(".chips"), svg = box.querySelector("svg.ruler-svg"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    chips.insertAdjacentHTML("beforeend", m.picks.map(function (p, k) {
      return '<button type="button" class="path-btn' + (p.error ? " bug" : "") + '" aria-pressed="false" data-k="' + k + '"><code>' + esc(m.name + "[" + p.i + "]") + "</code></button>";
    }).join(""));
    var cur = 0;
    function draw() {
      var p = m.picks[cur], narrow = narrowFor(svg), oob = !!p.error, g = geo(n, narrow, 1, 58), at = p.i < 0 ? p.i + n : p.i;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var H = 214;
      svg.setAttribute("viewBox", "0 0 " + g.width + " " + H);
      svg.classList.toggle("narrow", narrow);
      for (var i = 0; i <= n; i++) {
        var x = g.x(i), cx = x + g.w / 2, ghost = i === n, on = i === at;
        if (ghost && !oob) {
          el("text", { x: cx, y: 100, "class": "rl-end", "text-anchor": "middle" }, svg, narrow ? "end" : "end of row");
          continue;
        }
        var cls = "rl-crate" + (ghost ? " ghost" : "") + (on ? " on" : "");
        el("rect", { x: x, y: 58, width: g.w, height: 76, rx: 8, "class": cls }, svg);
        if (ghost) {
          el("text", { x: cx, y: 106, "class": "rl-val err", "text-anchor": "middle", "font-size": g.font + 6 }, svg, "?");
          el("text", { x: cx, y: 156, "class": "rl-idx" + (on ? " on" : ""), "text-anchor": "middle", "font-size": g.font }, svg, String(n));
        } else {
          el("text", { x: cx, y: 104, "class": "rl-val", "text-anchor": "middle", "font-size": narrow ? 12 : 16 }, svg, m.items[i]);
          el("text", { x: cx, y: 34, "class": "rl-idx neg" + (on && p.i < 0 ? " on" : ""), "text-anchor": "middle", "font-size": g.small + 2 }, svg, String(i - n));
          el("text", { x: cx, y: 160, "class": "rl-idx" + (on && p.i >= 0 ? " on" : ""), "text-anchor": "middle", "font-size": g.font + 2 }, svg, String(i));
          if (on) {   // a ring around the index that was used, plus a pointer
            var ry = p.i < 0 ? 29 : 154;
            el("ellipse", { cx: cx, cy: ry, rx: narrow ? 20 : 26, ry: 15, "class": "rl-ring" }, svg);
          }
        }
        if (on) {
          el("path", { d: "M" + (cx - 12) + " 186 L" + cx + " 170 L" + (cx + 12) + " 186 Z", "class": "rl-ptr" + (ghost ? " err" : "") }, svg);
          el("text", { x: cx, y: 206, "class": "rl-say" + (ghost ? " err" : ""), "text-anchor": "middle", "font-size": g.small }, svg, ghost ? "no crate!" : "this one");
        }
      }
    }
    function show(k, announce) {
      cur = k;
      var p = m.picks[k], bs = chips.querySelectorAll(".path-btn");
      for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(j === k));
      draw();
      note.innerHTML = '<span class="count">' + esc(m.name + "[" + p.i + "]") + "</span>" + p.note +
        (p.error ? ' <span class="rl-err"><code>' + esc(p.error) + "</code></span>" : ' Real run: <samp>' + esc(p.expectLine) + "</samp>");
      if (live && announce) live.textContent = note.textContent;
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-k")), true); });
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.items.map(function (it, i) { return "<tr><td><code>" + i + "</code></td><td><code>" + (i - n) + "</code></td><td><code>" + esc(it) + "</code></td></tr>"; }).join("") +
      "<tr><td><code>" + n + "</code> or more</td><td><code>" + (-n - 1) + "</code> or less</td><td>no crate: <code>IndexError</code></td></tr>";
    var wasNarrow = null;
    root.addEventListener("resize", function () { var nn = narrowFor(svg); if (nn !== wasNarrow) { wasNarrow = nn; draw(); } });
    show(0, false);
  }

  /* ============================ slice stepper ============================ */
  function parseSlice(expr) {   // "[1:5:2]" -> {start:1, stop:5, step:2}; empty parts are null
    var parts = expr.replace(/^\[|\]$/g, "").split(":");
    function num(s) { s = (s || "").trim(); return s === "" ? null : Number(s); }
    return { start: num(parts[0]), stop: num(parts[1]), step: parts.length > 2 ? num(parts[2]) : null };
  }
  /* Python's slice.indices() rules, written out so the page can explain each normalisation. */
  function resolve(s, n) {
    var step = s.step == null ? 1 : s.step, why = [], start, stop;
    if (step > 0) {
      if (s.start == null) { start = 0; why.push("no start, so start at the front: index 0"); }
      else { start = s.start; if (start < 0) { why.push("start " + start + " counts from the end: " + n + " + (" + start + ") = " + (start + n)); start += n; } if (start < 0) start = 0; if (start > n) start = n; }
      if (s.stop == null) { stop = n; why.push("no stop, so go to the end of the row"); }
      else { stop = s.stop; if (stop < 0) { why.push("stop " + stop + " counts from the end: " + (stop + n)); stop += n; } if (stop > n) { why.push("stop " + s.stop + " is past the end, so it is treated as " + n); stop = n; } if (stop < 0) stop = 0; }
    } else {
      if (s.start == null) { start = n - 1; why.push("negative step and no start, so start at the last crate: index " + (n - 1)); }
      else { start = s.start < 0 ? s.start + n : s.start; if (start > n - 1) start = n - 1; }
      if (s.stop == null) { stop = -1; why.push("no stop, so keep going past the front"); }
      else { stop = s.stop < 0 ? s.stop + n : s.stop; }
    }
    var idx = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) idx.push(i);
    return { start: start, stop: stop, step: step, idx: idx, next: start + idx.length * step, why: why };
  }
  function mountSlicer(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-slicer")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var real = lines(prog), n = m.items.length, bad = 0;
    m.examples.forEach(function (ex) {
      ex._s = parseSlice(ex.expr); ex._r = resolve(ex._s, n);
      var got = "[" + ex._r.idx.map(function (i) { return m.items[i]; }).join(", ") + "]";
      ex._got = got;
      if (got !== ex.out) { bad++; L.report("slicer:" + m.name, ex.expr + " computes " + got + " but the model says " + ex.out); }
      if (real.indexOf(ex.out) < 0) { bad++; L.report("slicer:" + m.name, ex.expr + ": " + ex.out + " is not a line of " + m.program); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " slice(s) do not match the real run" : "Every slice matches the real run"; par.classList.toggle("bad", !!bad); }
    var chips = box.querySelector(".chips"), svg = box.querySelector("svg.slicer-svg"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), resEl = box.querySelector(".slice-result");
    chips.insertAdjacentHTML("beforeend", m.examples.map(function (ex, k) { return '<button type="button" class="path-btn" aria-pressed="false" data-k="' + k + '"><code>' + esc(m.name + ex.expr) + "</code></button>"; }).join(""));
    var cur = 0, steps = [], run = null;
    function build(ex) {
      var r = ex._r, out = [];
      var first = "<b>" + esc(m.name + ex.expr) + "</b>: start " + r.start + ", stop " + (r.stop < 0 ? "before index 0" : r.stop) + ", step " + r.step + ". " +
        (r.why.length ? "Why: " + esc(r.why.join("; ")) + ". " : "") + "The crate at stop is <em>never</em> taken.";
      out.push({ cursor: null, taken: 0, note: first });
      r.idx.forEach(function (i, k) {
        out.push({ cursor: i, taken: k + 1, note: "Index <b>" + i + "</b> is " + (r.step > 0 ? "before" : "after") + " stop, so take <code>" + esc(m.items[i]) + "</code>. Then jump " + (r.step > 0 ? "+" : "") + r.step + " to index " + (i + r.step) + "." });
      });
      var nx = r.next, past = nx >= n || nx < 0, why;
      if (r.step > 0) why = nx >= n ? "Index <b>" + nx + "</b> is past the end of the row, so the slice ends." : "Index <b>" + nx + "</b> is not before stop (" + r.stop + "), so the slice ends. The crate at stop stays behind.";
      else why = nx < 0 ? "There is no crate before index 0, so the slice ends." : "Index <b>" + nx + "</b> has reached stop, so the slice ends. The crate at stop stays behind.";
      out.push({ cursor: past ? null : nx, end: true, taken: r.idx.length, note: why + " Result: <code>" + esc(ex.out) + "</code>, the same as the real run." });
      return out;
    }
    function draw(st) {
      var ex = m.examples[cur], r = ex._r, s = steps[st.step], narrow = narrowFor(svg), g = geo(n, narrow, 0, 48);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var H = 304, top = 66, ch = 66, resY = 226;
      svg.setAttribute("viewBox", "0 0 " + g.width + " " + H);
      svg.classList.toggle("narrow", narrow);
      var takenSet = r.idx.slice(0, s.taken);
      for (var i = 0; i < n; i++) {
        var x = g.x(i), cx = x + g.w / 2, taken = takenSet.indexOf(i) >= 0, on = s.cursor === i;
        el("rect", { x: x, y: top, width: g.w, height: ch, rx: 8, "class": "rl-crate" + (taken ? " taken" : "") + (on ? " on" : "") }, svg);
        el("text", { x: cx, y: top + 41, "class": "rl-val", "text-anchor": "middle", "font-size": g.font }, svg, m.items[i]);
        if (taken) el("text", { x: x + g.w - (narrow ? 8 : 12), y: top + 18, "class": "rl-tick", "text-anchor": "middle", "font-size": g.small }, svg, "✓");
        el("text", { x: cx, y: top - 10, "class": "rl-idx neg", "text-anchor": "middle", "font-size": g.small }, svg, String(i - n));
        el("text", { x: cx, y: top + ch + 22, "class": "rl-idx" + (on ? " on" : ""), "text-anchor": "middle", "font-size": g.font }, svg, String(i));
      }
      // START flag over the first crate the slice looks at
      if (r.start >= 0 && r.start < n) {
        var sx = g.x(r.start) + g.w / 2;
        el("rect", { x: sx - (narrow ? 27 : 30), y: 10, width: narrow ? 54 : 60, height: 22, rx: 4, "class": "rl-flag" }, svg);
        el("text", { x: sx, y: 26, "class": "rl-flag-t", "text-anchor": "middle", "font-size": 13 }, svg, "START");
      }
      // STOP wall on the boundary that is never crossed
      var wx = r.step > 0 ? (r.stop >= n ? g.x(n - 1) + g.w + g.gap / 2 : g.x(r.stop) - g.gap / 2) : (r.stop < 0 ? g.x(0) - g.gap / 2 : g.x(r.stop) + g.w + g.gap / 2);
      wx = Math.max(4, Math.min(g.width - 4, wx));
      el("line", { x1: wx, y1: 36, x2: wx, y2: top + ch + 6, "class": "rl-wall" }, svg);
      var lx = Math.max(narrow ? 26 : 28, Math.min(g.width - (narrow ? 26 : 28), wx));
      el("rect", { x: lx - (narrow ? 24 : 26), y: 10, width: narrow ? 48 : 52, height: 22, rx: 4, "class": "rl-stop" }, svg);
      el("text", { x: lx, y: 26, "class": "rl-stop-t", "text-anchor": "middle", "font-size": 13 }, svg, "STOP");
      // cursor
      if (s.cursor != null) {
        var cx2 = g.x(s.cursor) + g.w / 2;
        el("path", { d: "M" + (cx2 - 11) + " " + (top + ch + 48) + " L" + cx2 + " " + (top + ch + 30) + " L" + (cx2 + 11) + " " + (top + ch + 48) + " Z", "class": "rl-ptr" + (s.end ? " err" : "") }, svg);
        el("text", { x: cx2, y: top + ch + 66, "class": "rl-say" + (s.end ? " err" : ""), "text-anchor": "middle", "font-size": g.small }, svg, s.end ? "stop here" : "take it");
      } else if (s.end) {
        el("text", { x: g.width / 2, y: top + ch + 60, "class": "rl-say err", "text-anchor": "middle", "font-size": g.small }, svg, "next index is off the row: done");
      }
      // result row: the new list the slice builds, crate by crate
      el("text", { x: g.mx, y: resY, "class": "rl-res-l", "font-size": g.small + 2 }, svg, s.taken ? "NEW LIST:" : "NEW LIST: [ ]  empty so far");
      var rw = narrow ? 42 : 60, rg = 6;
      takenSet.forEach(function (i, k) {
        var x = g.mx + k * (rw + rg);
        el("rect", { x: x, y: resY + 10, width: rw, height: 40, rx: 6, "class": "rl-crate taken small" }, svg);
        el("text", { x: x + rw / 2, y: resY + 36, "class": "rl-val", "text-anchor": "middle", "font-size": g.small }, svg, m.items[i]);
        el("text", { x: x + rw / 2, y: resY + 68, "class": "rl-idx", "text-anchor": "middle", "font-size": g.small - 1 }, svg, String(k));
      });
    }
    function render(st, announce) {
      var s = steps[st.step], ex = m.examples[cur];
      draw(st);
      var part = "[" + ex._r.idx.slice(0, s.taken).map(function (i) { return m.items[i]; }).join(", ") + "]";
      resEl.innerHTML = "<code>" + esc(m.name + ex.expr) + "</code> → <code>" + esc(s.end ? ex.out : part) + "</code>" + (s.end ? " <b>done</b>" : " <em>so far</em>");
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = note.textContent;
    }
    function choose(k, announce) {
      cur = k; steps = build(m.examples[k]);
      var bs = chips.querySelectorAll(".path-btn");
      for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(j === k));
      if (!run) run = L.runner(box, steps.length, render, { reserve: true });
      run.reset(steps.length);
      var tb = box.querySelector(".transcript tbody");
      if (tb) tb.innerHTML = steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + s.note + "</td><td><code>" + esc("[" + m.examples[k]._r.idx.slice(0, s.taken).map(function (x) { return m.items[x]; }).join(", ") + "]") + "</code></td></tr>"; }).join("");
      if (live && announce) live.textContent = "Slice chosen: " + m.name + m.examples[k].expr + ".";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) choose(Number(b.getAttribute("data-k")), true); });
    var wasNarrow = null;
    root.addEventListener("resize", function () { var nn = narrowFor(svg); if (nn !== wasNarrow && run) { wasNarrow = nn; render(run.state(), false); } });
    choose(0, false);
  }

  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-ruler]"), s = document.querySelectorAll("[data-slicer]"), i;
    for (i = 0; i < r.length; i++) { try { mountRuler(r[i]); } catch (e) { L.report("ruler", e.message); } }
    for (i = 0; i < s.length; i++) { try { mountSlicer(s[i]); } catch (e) { L.report("slicer", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
