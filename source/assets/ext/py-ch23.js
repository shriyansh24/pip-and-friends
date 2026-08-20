/* Chapter 23 extension: "The Hardware Store".
   Adds one cast member drawn in code in Pip's house style. Nothing here claims any program output, so there is no
   parity badge; every picture that carries meaning has a .sr-only sentence or an SVG <title>/<desc> on the page.
   (Fetch, the import-error dog, now comes from the engine's comic-critters.js.)
     pricetag  NEW: the "exact decimal" prop for decimal.Decimal: a paper price tag on a string, with the digits written
               exactly as given. Beside the jelly (float, wobbly) it shows the difference between exact and close-enough.
               data-label = the digits (<= 8 chars, default "0.10"); data-mood = happy | o. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch23.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* ---------------- pricetag: decimal.Decimal, exact digits ---------------- */
  C.pricetag = { vb: "0 0 190 150", draw: function (el) {
    var label = (el.getAttribute("data-label") || "0.10").slice(0, 8), mood = el.getAttribute("data-mood") || "happy";
    var fs = label.length > 6 ? 22 : label.length > 4 ? 26 : 30;
    var mouth = mood === "o" ? '<ellipse cx="128" cy="116" rx="5" ry="6" fill="' + INK + '"/>'
      : '<path d="M120 112 q8 8 16 0" fill="none"' + S(3.5) + "/>";
    return '<g class="bob">' +
      // string loop to a hook
      '<path d="M8 20 q20 -18 40 6 q10 14 14 40" fill="none"' + S(3) + "/>" +
      '<path d="M2 14 h14" fill="none"' + S(5) + "/>" +
      // the tag: pointed left end, hole, body
      '<path d="M58 62 l26 -30 h96 v104 h-96 z" fill="#FFF6CC"' + S(4) + "/>" +
      '<circle cx="74" cy="62" r="7" fill="#FFFFFF"' + S(3) + "/>" +
      // ruler ticks along the top edge: exact, measured
      '<path d="M96 32 v10 M112 32 v6 M128 32 v10 M144 32 v6 M160 32 v10 M176 32 v6" fill="none"' + S(2.5) + "/>" +
      // the exact digits
      '<text x="134" y="' + (78 + fs / 3) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" +
      // face along the bottom
      '<g class="eyes">' + dot(118, 102, 3.5) + dot(138, 102, 3.5) + "</g>" + mouth +
      "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
