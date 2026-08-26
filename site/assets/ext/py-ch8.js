/* Chapter 8 extension: the Bag (set creature) and the Venn explorer.
   - the Bag (set creature, data-char="bag") was first drawn here; it is comic-critters.js's now (engine pass 3).
   - [data-venn] draws two overlapping circles from a model, shades the region(s) an operator keeps,
     and shows the real output line for that operator. Parity: every operator's result is computed from
     the model's items AND compared with the captured line of the program; any mismatch is reported
     (console.error) and shown on a .parity badge. Buttons are native <button>s (keyboard usable);
     a transcript table gives the text version. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) return;
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var NS = "http://www.w3.org/2000/svg";


  /* ---------- Venn explorer ---------- */
  function el(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  var OPS = {
    "|": { word: "union", f: function (a, b) { return a || b; } },
    "&": { word: "intersection", f: function (a, b) { return a && b; } },
    "-": { word: "difference", f: function (a, b) { return a && !b; } },
    "^": { word: "symmetric difference", f: function (a, b) { return a !== b; } }
  };
  function pyList(arr) { return "[" + arr.map(function (s) { return "'" + s + "'"; }).join(", ") + "]"; }

  function mountVenn(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-venn")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var outLines = L.shown(prog).replace(/\n$/, "").split("\n"), srcLines = prog.src.replace(/\n$/, "").split("\n");
    var Lset = m.left.items, Rset = m.right.items, bad = 0;
    // the model's items must be the ones written in the program
    [m.left, m.right].forEach(function (side) {
      var def = srcLines.filter(function (l) { return l.indexOf(side.name + " = {") === 0; })[0] || "";
      side.items.forEach(function (it) { if (def.indexOf('"' + it + '"') < 0) { bad++; L.report("venn:" + m.program, side.name + " item " + it + " is not in the program"); } });
    });
    function side(name) { return name === m.left.name ? Lset : name === m.right.name ? Rset : null; }
    m.ops.forEach(function (op) {
      var t = op.expr.split(" "), A = side(t[0]), B = side(t[2]), O = OPS[t[1]];
      if (!A || !B || !O) { bad++; L.report("venn", "cannot read expression " + op.expr); op._ok = false; return; }
      op._word = O.word;
      op._result = A.concat(B.filter(function (x) { return A.indexOf(x) < 0; })).filter(function (x) { return O.f(A.indexOf(x) >= 0, B.indexOf(x) >= 0); }).sort();
      op._line = outLines[op.out] || "";
      op._src = srcLines.filter(function (l) { return l.indexOf("(" + op.expr + ")") >= 0; })[0] || "";
      // region shading: (inLeft, inRight) -> (inA, inB)
      op._regions = { L: [true, false], B: [true, true], R: [false, true] };
      Object.keys(op._regions).forEach(function (r) {
        var fl = op._regions[r], inA = t[0] === m.left.name ? fl[0] : fl[1], inB = t[2] === m.left.name ? fl[0] : fl[1];
        op._regions[r] = O.f(inA, inB);
      });
      op._ok = !!op._src && op._line.slice(-pyList(op._result).length) === pyList(op._result) && op._line.length > pyList(op._result).length;
      if (!op._ok) { bad++; L.report("venn:" + m.program, op.expr + " does not match the captured line " + op.out); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " result(s) do not match the real run" : "Every shaded result matches the real run of " + m.program; par.classList.toggle("bad", !!bad); }

    // drawing
    var svg = box.querySelector("svg.venn-svg"), id = box.getAttribute("data-venn");
    svg.setAttribute("viewBox", "0 0 460 300");
    var cxL = 175, cxR = 285, cy = 165, r = 115;
    var defs = el("defs", {}, svg);
    defs.innerHTML =
      '<pattern id="' + id + '-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" class="venn-fill"/><line x1="0" y1="0" x2="0" y2="12" class="venn-hatch"/></pattern>' +
      '<clipPath id="' + id + '-cL"><circle cx="' + cxL + '" cy="' + cy + '" r="' + r + '"/></clipPath>' +
      '<clipPath id="' + id + '-cR"><circle cx="' + cxR + '" cy="' + cy + '" r="' + r + '"/></clipPath>' +
      '<mask id="' + id + '-mL"><rect width="460" height="300" fill="#fff"/><circle cx="' + cxR + '" cy="' + cy + '" r="' + r + '" fill="#000"/></mask>' +
      '<mask id="' + id + '-mR"><rect width="460" height="300" fill="#fff"/><circle cx="' + cxL + '" cy="' + cy + '" r="' + r + '" fill="#000"/></mask>';
    var shade = {
      L: el("circle", { cx: cxL, cy: cy, r: r, mask: "url(#" + id + "-mL)", "class": "venn-region" }, svg),
      B: el("circle", { cx: cxR, cy: cy, r: r, "clip-path": "url(#" + id + "-cL)", "class": "venn-region" }, svg),
      R: el("circle", { cx: cxR, cy: cy, r: r, mask: "url(#" + id + "-mR)", "class": "venn-region" }, svg)
    };
    el("circle", { cx: cxL, cy: cy, r: r, "class": "venn-ring" }, svg);
    el("circle", { cx: cxR, cy: cy, r: r, "class": "venn-ring" }, svg);
    var tl = el("text", { x: cxL - 55, y: 34, "text-anchor": "middle", "class": "venn-name" }, svg); tl.textContent = m.left.name;
    var tr = el("text", { x: cxR + 55, y: 34, "text-anchor": "middle", "class": "venn-name" }, svg); tr.textContent = m.right.name;
    var regionItems = {
      L: Lset.filter(function (x) { return Rset.indexOf(x) < 0; }),
      B: Lset.filter(function (x) { return Rset.indexOf(x) >= 0; }),
      R: Rset.filter(function (x) { return Lset.indexOf(x) < 0; })
    };
    var regionX = { L: 112, B: 230, R: 348 }, chips = {};
    Object.keys(regionItems).forEach(function (rk) {
      var list = regionItems[rk], top = cy - (list.length - 1) * 21;
      chips[rk] = list.map(function (name, i) {
        var g = el("g", { "class": "venn-chip" }, svg), y = top + i * 42, w = name.length * 13 + 26;
        el("rect", { x: regionX[rk] - w / 2, y: y - 17, width: w, height: 34, rx: 9, "class": "venn-chip-bg" }, g);
        var t = el("text", { x: regionX[rk], y: y + 7, "text-anchor": "middle", "class": "venn-chip-t" }, g); t.textContent = name;
        return g;
      });
    });

    var bar = box.querySelector(".venn-ops"), code = box.querySelector(".venn-code"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    bar.insertAdjacentHTML("beforeend", m.ops.map(function (op, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(op.expr) + "</code></button>"; }).join(""));
    function show(i, announce) {
      var op = m.ops[i];
      var bs = bar.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      Object.keys(shade).forEach(function (rk) {
        shade[rk].classList.toggle("on", !!op._regions[rk]);
        shade[rk].style.fill = op._regions[rk] ? "url(#" + id + "-hatch)" : "";
        chips[rk].forEach(function (g) { g.classList.toggle("kept", !!op._regions[rk]); });
      });
      code.innerHTML = L.highlight(op._src);
      out.textContent = op._line;
      note.innerHTML = "<b>" + esc(op.expr) + "</b> is the <b>" + op._word + "</b>. " + op.note;
      if (live && announce) live.textContent = op.expr + ", the " + op._word + ": keeps " + (op._result.length ? op._result.join(", ") : "nothing") + ". Real output: " + op._line;
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.ops.map(function (op) {
      var keep = ["L", "B", "R"].filter(function (rk) { return op._regions[rk]; }).map(function (rk) { return rk === "B" ? "in both" : "only in " + (rk === "L" ? m.left.name : m.right.name); });
      return "<tr><td><code>" + esc(op.expr) + "</code></td><td>" + op._word + "</td><td>" + esc(keep.join(" + ")) + "</td><td><code>" + esc(op._line) + "</code></td></tr>";
    }).join("");
    show(0, false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-venn]");
    for (var i = 0; i < boxes.length; i++) { try { mountVenn(boxes[i]); } catch (e) { L.report("venn", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
