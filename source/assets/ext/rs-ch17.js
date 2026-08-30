/* Rust book, chapter 17 additions ("Cookie Cutters and Badges").
   Two original drawings in the cast's house style, used as this chapter's pictures of generics and traits:
     <svg class="char" data-char="cutter" data-label="T" data-shape="blob"></svg>
       a cookie cutter seen from above: a metal outline with a rolled rim and a little handle plate carrying a label.
       data-label: the words on the handle plate (at most 8 characters), e.g. T, i32, f64, char
       data-shape: blob (default; the "any shape" generic cutter, drawn dashed, with a question mark in the middle),
                   star, heart, round (a stamped copy: solid outline with dough inside)
     <svg class="char" data-char="badge" data-label="SPEAK" data-state="worn"></svg>
       a round rosette badge with two ribbon tails.
       data-label: the word on the badge (at most 8 characters)
       data-state: worn (default; solid rim, a tick under the word) or missing (dashed rim, an empty pin outline, a
                   question mark under the word): the state is shown by line style and a mark, never by colour alone.
   Both are aria-hidden like every cast member; pages add a .sr-only sentence when the picture carries meaning. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch17.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  var SHAPES = {
    blob: "M80 22 C112 14 142 34 140 66 C150 94 132 128 100 128 C78 142 40 136 30 108 C10 86 18 50 42 38 C52 26 66 24 80 22 Z",
    star: "M80 16 L96 56 L140 58 L106 84 L118 128 L80 104 L42 128 L54 84 L20 58 L64 56 Z",
    heart: "M80 132 C40 106 16 84 18 56 C20 32 48 20 66 34 C72 38 76 44 80 50 C84 44 88 38 94 34 C112 20 140 32 142 56 C144 84 120 106 80 132 Z",
    round: "M80 18 A56 56 0 1 1 79.9 18 Z"
  };
  var DOUGH = { star: "#FFE7A8", heart: "#FFD3C4", round: "#E8D3B0" };

  L.cast.cutter = {
    vb: "0 0 160 190",
    draw: function (el) {
      var shape = el.getAttribute("data-shape") || "blob";
      if (!SHAPES[shape]) shape = "blob";
      var label = (el.getAttribute("data-label") || "T").slice(0, 8);
      var generic = shape === "blob", d = SHAPES[shape], out = '<g class="bob">';
      // the metal edge: a thick light-grey band, outlined in ink on both sides
      out += '<path d="' + d + '" fill="' + (generic ? "#FFF6CC" : DOUGH[shape]) + '"' + S(14) + "/>";
      out += '<path d="' + d + '" fill="none" stroke="#DADADA" stroke-width="8" stroke-linejoin="round"' + (generic ? ' stroke-dasharray="10 7"' : "") + "/>";
      if (generic) {
        out += '<text x="80" y="92" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="46" fill="' + INK + '">?</text>';
      } else {
        out += '<circle cx="66" cy="72" r="4" fill="' + INK + '"/><circle cx="94" cy="72" r="4" fill="' + INK + '"/>' +
          '<path d="M68 90 q12 9 24 0" fill="none"' + S(3.5) + "/>";
      }
      // the handle plate with its label
      var w = Math.max(52, 16 + label.length * 15);
      out += '<rect x="' + (80 - w / 2) + '" y="148" width="' + w + '" height="34" rx="8" fill="#FFFFFF"' + S(4) + "/>";
      out += '<path d="M80 136 V148"' + S(4) + "/>";
      out += '<text x="80" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (label.length > 5 ? 17 : 22) + '" fill="' + INK + '">' + esc(label) + "</text>";
      return out + "</g>";
    }
  };

  L.cast.badge = {
    vb: "0 0 150 190",
    draw: function (el) {
      var label = (el.getAttribute("data-label") || "SPEAK").slice(0, 8);
      var missing = el.getAttribute("data-state") === "missing", out = '<g class="bob">';
      if (missing) {
        out += '<circle cx="75" cy="78" r="58" fill="#FFFFFF"' + S(4) + ' stroke-dasharray="10 8"/>';
        out += '<text x="75" y="86" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="' + (label.length > 6 ? 19 : 24) + '" letter-spacing="1" fill="' + INK + '">' + esc(label) + "</text>";
        out += '<text x="75" y="122" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="30" fill="' + INK + '">?</text>';
        out += '<path d="M54 150 h42" fill="none"' + S(3) + ' stroke-dasharray="6 6"/>';
        return out + "</g>";
      }
      // two ribbon tails behind the rosette
      out += '<path d="M50 112 L34 182 L52 170 L64 186 L76 118 Z" fill="#7FB2FF"' + S(4) + "/>";
      out += '<path d="M100 112 L116 182 L98 170 L86 186 L74 118 Z" fill="#7FB2FF"' + S(4) + "/>";
      // the scalloped rosette
      var pts = [], i, a, r;
      for (i = 0; i < 32; i++) { a = (Math.PI * 2 * i) / 32; r = i % 2 ? 54 : 62; pts.push((75 + r * Math.cos(a)).toFixed(1) + " " + (78 + r * Math.sin(a)).toFixed(1)); }
      out += '<path d="M' + pts.join(" L") + ' Z" fill="#FFD60A"' + S(4) + "/>";
      out += '<circle cx="75" cy="78" r="42" fill="#FFF6CC"' + S(3.5) + "/>";
      out += '<text x="75" y="80" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="' + (label.length > 6 ? 19 : 24) + '" letter-spacing="1" fill="' + INK + '">' + esc(label) + "</text>";
      out += '<path d="M62 94 l9 9 l17 -18" fill="none"' + S(5) + "/>";
      return out + "</g>";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
