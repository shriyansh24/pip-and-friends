/* Chapter 18 extension: "Backpacks and Gift Wrap" (closures, nonlocal, late binding, decorators).
   Adds three drawings to the cast. They are pictures only: none of them claims an output, so none needs a parity
   badge. Every use on the page has a .sr-only sentence beside it.
   (1) closurepack  a little function machine wearing a backpack. data-label = the machine's name, data-items = what is in
                 the backpack, separated by "|" (up to 3 short lines, e.g. "n = 2").
   (2) gift      a present: the function machine inside, wrapped in one or more layers of gift paper. data-label = the
                 function's name, data-layers = wrapper names, outermost first, separated by "|" (up to 3). Layers differ
                 by paper pattern (stripes, dots, zigzag) as well as by their written tag, never by colour alone.
   (3) nest      three nested boxes, labelled outermost first: data-layers = "repeat(3)|decorator|wrapper" (exactly 3).
                 Used for the "decorator with arguments" picture. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch18.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function txt(x, y, t, size, weight, anchor) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" font-family="JetBrains Mono, monospace" font-weight="' + (weight || 800) + '" font-size="' + (size || 16) + '" fill="' + INK + '">' + esc(t) + "</text>"; }
  function fit(t, room, max) { return Math.max(10, Math.min(max, Math.floor(room / Math.max(1, String(t).length) * 1.6))); }
  function list(el, attr, n) { return (el.getAttribute(attr) || "").split("|").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, n); }

  // A small function machine: hopper, yellow body, label plate, eyes, output chute. (x, y) = top-left of the body.
  function miniMachine(x, y, w, label) {
    var h = Math.round(w * 0.66);
    return '<path d="M' + (x - 22) + " " + (y - 16) + " h28 l-6 13 h-16 z" + '" fill="#DDE8FF"' + S(3) + "/>" +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="#FFD60A"' + S(3.5) + "/>" +
      '<rect x="' + (x + 7) + '" y="' + (y + h - 26) + '" width="' + (w - 14) + '" height="20" rx="4" fill="#FFFFFF"' + S(2.5) + "/>" +
      (label ? txt(x + w / 2, y + h - 11, label, fit(label, w - 18, 14)) : "") +
      '<circle cx="' + (x + w * 0.32) + '" cy="' + (y + 14) + '" r="6" fill="#FFFFFF"' + S(2.5) + "/>" + dot(x + w * 0.32, y + 15, 2.5) +
      '<circle cx="' + (x + w * 0.68) + '" cy="' + (y + 14) + '" r="6" fill="#FFFFFF"' + S(2.5) + "/>" + dot(x + w * 0.68, y + 15, 2.5) +
      '<path d="M' + (x + w) + " " + (y + h - 16) + " h14" + '" fill="none"' + S(3) + "/>";
  }

  /* ---------------- backpack ---------------- */
  C.closurepack = { vb: "0 0 250 190", draw: function (el) {
    var lab = el.getAttribute("data-label") || "inner", items = list(el, "data-items", 3), out = '<g class="bob">';
    // straps over the machine's "shoulders"
    out += '<path d="M118 46 q-14 -26 -40 -10 M118 112 q-20 20 -40 6" fill="none"' + S(4) + "/>";
    out += miniMachine(26, 40, 96, lab);
    // the backpack, behind-right of the machine
    out += '<path d="M126 34 q0 -18 18 -18 h66 q18 0 18 18 v124 q0 16 -16 16 h-70 q-16 0 -16 -16 z" fill="#C9F2D9"' + S(4) + "/>";
    out += '<path d="M150 16 q0 -12 14 -12 h26 q14 0 14 12" fill="none"' + S(4) + "/>";                 // carry handle
    out += '<path d="M126 58 h102" fill="none"' + S(3) + "/>";                                             // flap line
    out += '<rect x="168" y="50" width="18" height="14" rx="3" fill="#FFF6CC"' + S(2.5) + "/>";          // buckle
    // the pocket with what is inside
    out += '<rect x="136" y="72" width="82" height="' + (Math.max(1, items.length) * 26 + 14) + '" rx="8" fill="#FFFFFF"' + S(3) + "/>";
    if (!items.length) out += txt(177, 98, "empty", 13, 700);
    items.forEach(function (it, i) { out += txt(177, 96 + i * 26, it, fit(it, 74, 15)); });
    return out + "</g>";
  } };

  /* ---------------- gift (wrapped function) ---------------- */
  var PATTERNS = ["stripes", "dots", "zigzag"];
  function paper(kind, x, y, w, h) {
    var out = "", i;
    if (kind === "stripes") { for (i = -h; i < w; i += 18) out += '<path d="M' + (x + i) + " " + (y + h) + " L" + (x + i + h) + " " + y + '" stroke="#2B2B2B" stroke-width="2.5" fill="none"/>'; }
    else if (kind === "dots") { for (var yy = y + 12; yy < y + h - 4; yy += 18) for (var xx = x + 12 + ((yy - y) % 36 ? 9 : 0); xx < x + w - 4; xx += 18) out += '<circle cx="' + xx + '" cy="' + yy + '" r="3" fill="#2B2B2B"/>'; }
    else { for (var zy = y + 14; zy < y + h - 4; zy += 20) { var d = "M" + (x + 4) + " " + zy; for (var zx = x + 4; zx < x + w - 10; zx += 12) d += " l6 -6 l6 6"; out += '<path d="' + d + '" stroke="#2B2B2B" stroke-width="2.2" fill="none"/>'; } }
    return out;
  }
  var clipCount = 0;
  C.gift = { vb: function (el) { var n = list(el, "data-layers", 3).length; return "0 0 " + (170 + n * 56) + " " + (140 + n * 60); }, draw: function (el) {
    var lab = el.getAttribute("data-label") || "f", layers = list(el, "data-layers", 3), n = layers.length, out = "";
    var W = 170 + n * 56, H = 140 + n * 60, inset = 28, top = 40;
    layers.forEach(function (name, i) {
      var x = 10 + i * inset, y = top + i * 34, w = W - 20 - i * inset * 2, h = H - top - 10 - i * 34 * 2;
      var id = "g18clip" + (++clipCount);   // a counter, not a random id: the same drawing on every load
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + (i % 2 ? "#FFE1E1" : "#DDE8FF") + '"' + S(3.5) + "/>";
      out += '<clipPath id="' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12"/></clipPath>';
      out += '<g clip-path="url(#' + id + ')" opacity="0.55">' + paper(PATTERNS[i % 3], x, y, w, h) + "</g>";
      // the layer's tag
      var tw = Math.max(70, name.length * 10 + 22);
      out += '<rect x="' + (x + 10) + '" y="' + (y - 14) + '" width="' + tw + '" height="26" rx="6" fill="#FFFFFF"' + S(3) + "/>" + txt(x + 10 + tw / 2, y + 4, name, fit(name, tw - 10, 15));
    });
    // the present itself: the original machine, unchanged
    var mw = 100, mx = W / 2 - mw / 2 + 6, my = top + n * 34 + 6;
    out += '<rect x="' + (mx - 30) + '" y="' + (my - 22) + '" width="' + (mw + 50) + '" height="' + (mw * 0.66 + 36) + '" rx="10" fill="#FFFFFF"' + S(3) + "/>";
    out += miniMachine(mx, my - 4, mw, lab);
    // bow on the top-right corner, clear of the layer tags
    var bx = W - 52;
    out += '<path d="M' + bx + " 34 q-34 -30 -40 -6 q4 16 40 6 z M" + bx + " 34 q34 -30 40 -6 q-4 16 -40 6 z" + '" fill="#FF5A4E"' + S(3) + "/>";
    out += '<circle cx="' + bx + '" cy="32" r="8" fill="#FFD60A"' + S(3) + "/>";
    return out;
  } };

  /* ---------------- nest: three nested boxes ---------------- */
  C.nest = { vb: "0 0 340 230", draw: function (el) {
    var names = list(el, "data-layers", 3); while (names.length < 3) names.push("?");
    var out = "", boxes = [[8, 18, 324, 204, "#F4F1EA", ""], [38, 66, 264, 146, "#DDE8FF", ' stroke-dasharray="10 7"'], [70, 112, 200, 92, "#FFF6CC", ""]];
    boxes.forEach(function (b, i) {
      out += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" rx="14" fill="' + b[4] + '"' + S(i === 2 ? 4 : 3.5) + b[5] + "/>";
      out += txt(b[0] + 14, b[1] + 28, names[i], fit(names[i], b[2] - 28, 18), 800, "start");
    });
    out += txt(170, 182, "runs at call time", 14, 700);
    return out;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
