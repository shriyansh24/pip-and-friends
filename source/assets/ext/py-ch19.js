/* Chapter 19 extension: "Family Trees and Toolbelts".
   Adds one cast member drawn in code in Pip's house style. Nothing here claims any program output, so there is no
   parity badge; every picture that carries meaning has a .sr-only sentence on the page. The cookie cutter
   (data-char="cookiecutter", with data-size="small" for a child cutter, first drawn here) and the cookie are the
   engine's (comic-critters.js, engine pass 3).
     toolbelt a belt with up to three pouches, each holding a labelled part: composition ("has-a").
              data-items = comma-separated part names (<= 3 parts, <= 8 chars each). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch19.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* ---------------- a toolbelt: an object that HAS parts ---------------- */
  // Three pouch slots hang under the strap; each part's name sits on a tag above the strap, tied to its pouch.
  C.toolbelt = { vb: "0 0 300 176", draw: function (el) {
    var items = (el.getAttribute("data-items") || "part,part,part").split(",").slice(0, 3).map(function (s) { return s.trim().slice(0, 8); });
    var fills = ["#FFD60A", "#C9F2D9", "#DDE8FF"], cx = [52, 150, 248];
    var out = '<g class="bob">';
    items.forEach(function (name, i) {   // tags and strings first, so the strap is drawn over the strings
      var tw = Math.max(44, name.length * 9.6 + 14), x = cx[i];
      out += '<path d="M' + x + ' 36 V70" fill="none" stroke="' + INK + '" stroke-width="2" stroke-dasharray="3 3"/>' +
        '<rect x="' + (x - tw / 2).toFixed(1) + '" y="6" width="' + tw.toFixed(1) + '" height="30" rx="7" fill="#FFFFFF"' + S(2.5) + "/>" +
        '<text x="' + x + '" y="27" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">' + esc(name) + "</text>";
    });
    out += '<path d="M6 60 Q150 86 294 60 L294 88 Q150 114 6 88 Z" fill="#B97A45"' + S(4) + "/>" +
      '<path d="M12 74 Q150 100 288 74" fill="none" stroke="#FFF6CC" stroke-width="2.5" stroke-dasharray="7 6"/>';
    items.forEach(function (name, i) {
      var x = cx[i] - 34, y = i === 1 ? 102 : 94;
      out += '<path d="M' + x + " " + y + ' h68 v40 q0 16 -16 16 h-36 q-16 0 -16 -16 z" fill="' + fills[i] + '"' + S(3.5) + "/>" +
        '<path d="M' + x + " " + (y + 14) + ' h68" fill="none"' + S(2.5) + "/>" + dot(cx[i], y + 26, 3);
    });
    out += '<rect x="132" y="70" width="36" height="34" rx="5" fill="#FFD60A"' + S(4) + '/><path d="M150 77 V97" fill="none"' + S(4) + "/>";
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
