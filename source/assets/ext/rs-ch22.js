/* Rust book, chapter 22 additions ("Drawers and Typesetters"). Classic deferred script; loads after comic-cast.js.
   1. [data-heap]: the BinaryHeap stepper. A max-heap is drawn twice: as a tree of numbered discs (each parent is at
      least as big as its children) and as the array the heap really keeps, slot by slot. Each step is one small move:
      a new number lands in the next free slot and swaps upward while it is bigger than its parent (push), or the last
      number jumps to the top after the biggest leaves and swaps downward with its bigger child (pop).
      Model (JSON in <script id=...>): { "program": "heap_steps.rs", "ops": [ ["push", 3], ["push", 8], ["pop"] ] }
      Parity (a badge, and L.report on any problem): after every op the model's array must equal the array the real
      program printed for that op ("push 9: [9, 8, 5, 3]"), and the screen after the last op must equal the real stdout.
      The moving number is drawn with a dashed outer ring (a dashed cell in the array); the one it is compared with has a
      thick ring, and the pair is labelled with ">", "<", "≤" or "≥", so nothing is shown by colour alone. Keyboard: the engine's stepper. Text version: a transcript.
   2. [data-ruler]: the typesetter's ruler for format specs. Choose a spec; its pieces (fill, align, sign, #, 0,
      width, precision, type) are named, and the real output is laid out cell by cell on a ruler with column numbers.
      Padding cells are hatched and marked with a dot underneath; the value's own characters are plain.
      Model: { "program": "fmt_ruler.rs", "examples": [ { "spec": "{:>8}", "value": "\"Pip\"", "line": "|     Pip|",
                 "pad": "ppppp...", "note": "HTML" } ] }
      "line" must be a whole line of the real output; the cells are the characters between the two bars. "pad" marks
      padding cells with p (optional: by default the cells outside the value's text, when "content" is given, are padding).
      Text version: a table of every example. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch22.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, INK = "#111111";

  /* ---------- 1. the heap stepper ---------- */
  function heapSteps(ops) {
    var a = [], steps = [], screen = [];
    function snap(note, extra) {
      steps.push({ arr: a.slice(), note: note, mov: extra.mov, cmp: extra.cmp || null, rel: extra.rel || "", screen: screen.slice(), out: extra.out || null, gone: extra.gone });
    }
    ops.forEach(function (op) {
      if (op[0] === "push") {
        var n = op[1];
        a.push(n);
        var i = a.length - 1;
        snap("<code>push(" + n + ")</code>: " + (i === 0 ? n + " goes into slot 0. The heap was empty, so it is the top." : n + " goes into the next free slot, slot " + i + ": the first empty place on the bottom row of the tree."), { mov: i });
        while (i > 0) {
          var par = Math.floor((i - 1) / 2);
          if (a[i] > a[par]) {
            snap(n + " is bigger than its parent " + a[par] + " (slot " + par + "), so they swap.", { mov: i, cmp: par, rel: ">" });
            var t = a[i]; a[i] = a[par]; a[par] = t; i = par;
          } else {
            snap(n + " is not bigger than its parent " + a[par] + ", so it stays in slot " + i + ".", { mov: i, cmp: par, rel: "≤" });
            break;
          }
        }
        var line = "push " + n + ": [" + a.join(", ") + "]";
        screen.push(line);
        snap((i === 0 ? n + " reached the top. " : "") + "Settled. Every parent is at least as big as its children again. The program prints the array.", { out: line });
      } else {
        var top = a[0], last = a.pop();
        if (!a.length) {
          screen.push("pop " + top + ": []");
          snap("<code>pop()</code> hands back " + top + ". The heap is empty.", { out: "pop " + top + ": []" });
          return;
        }
        a[0] = last;
        var j = 0;
        snap("<code>pop()</code> hands back the top, <b>" + top + "</b>. The last number, " + last + ", jumps into the empty top slot.", { mov: 0, gone: top });
        for (;;) {
          var l = 2 * j + 1, r = l + 1;
          if (l >= a.length) { snap(last + " has no children below it, so it stops in slot " + j + ".", { mov: j }); break; }
          var c = r < a.length && a[r] > a[l] ? r : l;
          if (a[c] > a[j]) {
            snap(last + " is smaller than its bigger child " + a[c] + " (slot " + c + "), so they swap.", { mov: j, cmp: c, rel: "<" });
            var u = a[j]; a[j] = a[c]; a[c] = u; j = c;
          } else {
            snap(last + " is at least as big as its children, so it stays in slot " + j + ".", { mov: j, cmp: c, rel: "≥" });
            break;
          }
        }
        var line2 = "pop " + top + ": [" + a.join(", ") + "]";
        screen.push(line2);
        snap("Settled. The biggest number left, " + a[0] + ", is on top again.", { out: line2 });
      }
    });
    return steps;
  }

  function heapSvg(s, maxN) {
    var n = s.arr.length, levels = Math.max(1, Math.floor(Math.log2(Math.max(maxN, 1))) + 1);
    var cw = 58, W = Math.max(Math.pow(2, levels - 1) * 96, maxN * cw + 24), out = "";
    function pos(i) { var lv = Math.floor(Math.log2(i + 1)), k = i - (Math.pow(2, lv) - 1), cnt = Math.pow(2, lv); return { x: (k + 0.5) * W / cnt, y: 40 + lv * 84 }; }
    for (var i = 1; i < n; i++) { var p = pos(i), q = pos(Math.floor((i - 1) / 2)); out += '<line x1="' + q.x + '" y1="' + q.y + '" x2="' + p.x + '" y2="' + p.y + '" stroke="' + INK + '" stroke-width="3"/>'; }
    for (var k = 0; k < n; k++) {
      var c = pos(k), mov = s.mov === k, cmp = s.cmp === k;
      out += '<g class="hp-node"' + (mov ? " data-now" : "") + ">";
      if (mov) out += '<circle cx="' + c.x + '" cy="' + c.y + '" r="33" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 4"/>';
      out += '<circle cx="' + c.x + '" cy="' + c.y + '" r="25" fill="' + (mov ? "#FFD60A" : cmp ? "#DDE8FF" : "#FFFFFF") + '" stroke="' + INK + '" stroke-width="' + (cmp ? 6 : 3.5) + '"/>';
      out += '<text class="hp-num" x="' + c.x + '" y="' + (c.y + 8) + '">' + s.arr[k] + "</text>";
      out += '<rect x="' + (c.x - 11) + '" y="' + (c.y + 35) + '" width="22" height="18" rx="4" fill="#FFFFFF"/><text class="hp-slot" x="' + c.x + '" y="' + (c.y + 49) + '">' + k + "</text>";
      out += "</g>";
    }
    if (s.cmp != null && s.mov != null && s.rel) {
      var A = pos(s.mov), B = pos(s.cmp), mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      out += '<g class="hp-rel"><rect x="' + (mx - 18) + '" y="' + (my - 17) + '" width="36" height="30" rx="6" fill="#FFF6CC" stroke="' + INK + '" stroke-width="2.5"/><text x="' + mx + '" y="' + (my + 5) + '">' + s.rel + "</text></g>";
    }
    if (!n) out += '<text class="hp-empty" x="' + W / 2 + '" y="50">(empty)</text>';
    if (s.gone != null) out += '<g class="hp-gone"><rect x="4" y="4" width="104" height="40" rx="8" fill="#C9F2D9" stroke="' + INK + '" stroke-width="3"/><text x="56" y="31">out: ' + s.gone + "</text></g>";
    var top = 40 + (levels - 1) * 84 + 92, x0 = (W - Math.max(n, 1) * cw) / 2;
    out += '<text class="hp-lab" x="' + 12 + '" y="' + (top - 8) + '">the real array:</text>';
    for (var m = 0; m < n; m++) {
      var x = x0 + m * cw;
      out += '<rect x="' + x + '" y="' + top + '" width="' + cw + '" height="48" fill="' + (s.mov === m ? "#FFD60A" : s.cmp === m ? "#DDE8FF" : "#FFFFFF") + '" stroke="' + INK + '" stroke-width="' + (s.cmp === m ? 6 : s.mov === m ? 4 : 3) + '"' + (s.mov === m ? ' stroke-dasharray="8 4"' : "") + "/>";
      out += '<text class="hp-num" x="' + (x + cw / 2) + '" y="' + (top + 33) + '">' + s.arr[m] + "</text>";
      out += '<text class="hp-idx" x="' + (x + cw / 2) + '" y="' + (top + 70) + '">' + m + "</text>";
    }
    return '<svg class="hp-svg" viewBox="0 0 ' + W + " " + (top + 80) + '" style="max-width:' + Math.round(W * 1.25) + 'px" role="img" aria-label="Heap drawn as a tree and as an array. The text version below lists every step.">' + out + "</svg>";
  }

  function mountHeap(box) {
    var id = box.getAttribute("data-heap"), el = document.getElementById(id);
    if (!el) { L.report("heap:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program);
    var steps = heapSteps(m.ops), why = [], maxN = steps.reduce(function (a, s) { return Math.max(a, s.arr.length); }, 1);
    if (!q) why.push("missing capture " + m.program);
    else {
      var real = L.shown(q).replace(/\n$/, "").split("\n");
      var mine = steps[steps.length - 1].screen;
      if (mine.join("\n") !== real.join("\n")) why.push("model screen differs from the real output");
      mine.forEach(function (l, i) { if (real[i] !== l) why.push("op " + (i + 1) + ": model says '" + l + "', real run says '" + real[i] + "'"); });
    }
    why.forEach(function (w) { L.report("heap:" + id, w); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = why.length ? "Does not match the real run of " + m.program : "Matches the real run of " + m.program; par.classList.toggle("bad", !!why.length); }
    var stage = box.querySelector(".hp-stage"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + s.note + "</td><td><code>[" + esc(s.arr.join(", ")) + "]</code></td><td><code>" + (s.screen.length ? esc(s.screen[s.screen.length - 1]) : "(nothing)") + "</code></td></tr>"; }).join("");
    function render(st, announce) {
      var s = steps[st.step];
      stage.innerHTML = heapSvg(s, maxN);
      out.innerHTML = s.screen.length ? s.screen.map(function (l, i) { return '<span class="' + (s.out && i === s.screen.length - 1 && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Array now: " + (s.arr.length ? s.arr.join(", ") : "empty") + ".";
    }
    stage.setAttribute("data-reserve", "");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  /* ---------- 2. the format ruler ---------- */
  function specParts(spec) {
    var inner = spec.replace(/^\{[^:]*:?/, "").replace(/\}$/, ""), parts = [];
    var m = /^(?:(.)?([<^>]))?([+-])?(#)?(0)?(\d+\$?|[A-Za-z_]\w*\$)?(?:\.(\d+\$?|[A-Za-z_]\w*\$|\*))?([?xXobeEp]|x\?|X\?)?$/.exec(inner);
    if (!m) return [{ k: "spec", v: inner }];
    if (m[1]) parts.push({ k: "fill", v: m[1] === " " ? "space" : m[1] });
    if (m[2]) parts.push({ k: "align", v: m[2] + (m[2] === "<" ? " left" : m[2] === "^" ? " centre" : " right") });
    if (m[3]) parts.push({ k: "sign", v: m[3] + " always" });
    if (m[4]) parts.push({ k: "#", v: "alternate form" });
    if (m[5]) parts.push({ k: "0", v: "zero-pad" });
    if (m[6]) parts.push({ k: "width", v: m[6] });
    if (m[7]) parts.push({ k: "precision", v: "." + m[7] });
    if (m[8]) parts.push({ k: "type", v: m[8] });
    if (!parts.length) parts.push({ k: "nothing", v: "plain Display" });
    return parts;
  }
  function rulerSvg(cells, pad) {
    var cw = 40, n = cells.length, W = Math.max(n * cw + 20, 120), out = "";
    for (var i = 0; i < n; i++) {
      var x = 10 + i * cw, isPad = pad[i] === "p";
      out += '<rect x="' + x + '" y="10" width="' + cw + '" height="54" fill="' + (isPad ? "url(#rl-hatch)" : "#FFFFFF") + '" stroke="' + INK + '" stroke-width="3"/>';
      if (isPad && cells[i] !== " ") out += '<rect x="' + (x + 8) + '" y="18" width="' + (cw - 16) + '" height="38" fill="#FFFFFF"/>';
      out += '<text class="rl-ch" x="' + (x + cw / 2) + '" y="47">' + esc(cells[i] === " " ? "" : cells[i]) + "</text>";
      out += '<text class="rl-no" x="' + (x + cw / 2) + '" y="86">' + (i + 1) + "</text>";
      if (isPad) out += '<circle cx="' + (x + cw / 2) + '" cy="100" r="4" fill="' + INK + '"/>';
    }
    return '<svg class="rl-svg" viewBox="0 0 ' + W + ' 110" style="--rl-w:' + W + ';max-width:' + W + 'px" role="img" aria-label="Ruler of ' + n + ' cells">' +
      '<defs><pattern id="rl-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#FFFFFF"/><line x1="0" y1="0" x2="0" y2="8" stroke="#6B6B6B" stroke-width="3"/></pattern></defs>' + out + "</svg>";
  }
  function mountRuler(box) {
    var id = box.getAttribute("data-ruler"), el = document.getElementById(id);
    if (!el) { L.report("ruler:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program), bad = 0;
    var lines = q ? L.shown(q).split("\n") : [];
    if (!q) { L.report("ruler:" + id, "missing capture " + m.program); bad++; }
    m.examples.forEach(function (ex) {
      var inner = ex.line.slice(1, -1);
      if (lines.indexOf(ex.line) < 0) { L.report("ruler:" + id, "line '" + ex.line + "' is not a line of the real output of " + m.program); bad++; }
      if (!ex.pad) {
        var at = ex.content != null ? inner.indexOf(ex.content) : -1;
        ex.pad = inner.split("").map(function (c, i) { return at < 0 ? "." : (i < at || i >= at + ex.content.length) ? "p" : "."; }).join("");
      }
      if (ex.pad.length !== inner.length) { L.report("ruler:" + id, "pad mask length differs for " + ex.spec); bad++; }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? "Does not match the real run of " + m.program : "Every line matches the real run of " + m.program; par.classList.toggle("bad", !!bad); }
    var chips = box.querySelector(".chips"), stage = box.querySelector(".rl-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), tb = box.querySelector(".transcript tbody");
    chips.innerHTML = '<span class="label">CHOOSE A SPEC:</span>' + m.examples.map(function (ex, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(ex.spec) + "</code></button>"; }).join("");
    if (tb) tb.innerHTML = m.examples.map(function (ex) { var inner = ex.line.slice(1, -1); return "<tr><td><code>" + esc(ex.spec) + "</code></td><td><code>" + esc(ex.value) + "</code></td><td><code>" + esc(ex.line) + "</code></td><td>" + inner.length + "</td><td>" + ex.pad.split("").filter(function (c) { return c === "p"; }).length + "</td><td>" + ex.note + "</td></tr>"; }).join("");
    function show(i, announce) {
      var ex = m.examples[i], inner = ex.line.slice(1, -1), cells = inner.split("");
      var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      var parts = specParts(ex.spec), npad = ex.pad.split("").filter(function (c) { return c === "p"; }).length;
      stage.innerHTML = '<p class="rl-call"><code>println!("|' + esc(ex.spec) + '|", ' + esc(ex.value) + ")</code></p>" +
        '<ul class="rl-parts" aria-label="Pieces of the spec">' + parts.map(function (p) { return "<li><small>" + esc(p.k) + "</small><b>" + esc(p.v) + "</b></li>"; }).join("") + "</ul>" +
        '<div class="rl-wrap picscroll">' + rulerSvg(cells, ex.pad) + "</div>" +
        '<p class="rl-real">Real output: <samp>' + esc(ex.line).replace(/ /g, "&#x2423;") + "</samp> <small>(each &#x2423; is a space)</small></p>";
      note.innerHTML = ex.note + " <b>" + cells.length + " cell" + (cells.length === 1 ? "" : "s") + ", " + npad + " of them padding.</b>";
      var wrap = stage.querySelector(".rl-wrap"); if (wrap && L.scrollHint) L.scrollHint(wrap);
      if (live && announce) live.textContent = ex.spec + " with " + ex.value + " gives " + JSON.stringify(inner) + ": " + cells.length + " cells, " + npad + " padding. " + note.textContent;
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    show(0, false);
  }

  P.comic.ext(function () {
    var h = document.querySelectorAll("[data-heap]"), r = document.querySelectorAll("[data-ruler]");
    for (var i = 0; i < h.length; i++) { try { mountHeap(h[i]); } catch (e) { L.report("heap", e.message); } }
    for (var j = 0; j < r.length; j++) { try { mountRuler(r[j]); } catch (e) { L.report("ruler", e.message); } }
    // (The tracers' text versions get the engine's break points from the tracer itself since engine pass 3.)
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
