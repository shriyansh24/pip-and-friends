/* Rust book, chapter 5 extension (Laps and Egg Cartons). Loads after comic-cast.js.
   Adds two drawings the shared cast does not have. Both are pictures only: they claim no program output.
     1. carton: an egg carton = a Rust array. Fixed number of cups, one kind of thing in every cup, each cup
        numbered from 0. The Python "crate" creature means a growable list, and "crate" means a package in Rust,
        so this book draws arrays as egg cartons instead.
          <svg class="char wide" data-char="carton" data-items="52,61,58" data-label="[i32; 3]"></svg>
        data-items: comma-separated egg labels (at most 8). An item written as _ draws an empty cup.
        data-label: optional type tag drawn above the carton.
     2. lunchbox: a tuple. A fixed set of compartments of different sizes, each holding a different kind of
        thing, opened with .0, .1, .2. Fills follow the shared creatures: whole numbers are brick orange,
        decimals jelly green, chars letter-tile cream, text sky blue.
          <svg class="char wide" data-char="lunchbox" data-items="500|6.4|'z'"></svg>
        data-items: items separated by | (so a comma can appear inside one), at most 4. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch5.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, C = L.cast, INK = "#111111";

  function mono(x, y, t, size, extra) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + size + '" fill="' + INK + '"' + (extra || "") + ">" + esc(t) + "</text>";
  }
  function items(el, sep, max, dflt) {
    return String(el.getAttribute("data-items") || dflt).split(sep).map(function (s) { return s.trim(); }).slice(0, max);
  }

  /* ---------- 1. the egg carton (array) ---------- */
  var CUP = 58;
  C.carton = {
    vb: function (el) { var n = items(el, ",", 8, "1,2,3").length, top = el.getAttribute("data-label") ? 30 : 0; return "0 0 " + (24 + n * CUP) + " " + (126 + top); },
    draw: function (el) {
      var its = items(el, ",", 8, "1,2,3"), n = its.length, lab = el.getAttribute("data-label"), top = lab ? 30 : 0, w = n * CUP + 8, out = "";
      if (lab) out += '<rect x="10" y="2" width="' + Math.max(84, lab.length * 11 + 18) + '" height="26" rx="6" fill="#DDE8FF"' + S(2.5) + "/>" + mono(10 + Math.max(84, lab.length * 11 + 18) / 2, 21, lab, 16);
      out += '<g transform="translate(0 ' + top + ')"><g class="bob">';
      // back wall of the carton, then the eggs, then the front of the tray (so eggs sit IN the cups)
      out += '<path d="M8 66 q0 -10 10 -10 h' + (w - 12) + ' q10 0 10 10 v14 h-' + (w + 8) + ' z" fill="#D9BF94"' + S(3) + "/>";
      its.forEach(function (it, i) {
        var cx = 12 + CUP / 2 + i * CUP;
        if (it === "_") return;
        out += '<ellipse cx="' + cx + '" cy="58" rx="23" ry="29" fill="#FFFDF5"' + S(3) + "/>" +
          '<path d="M' + (cx - 11) + " 40 q5 -6 11 -7" + '" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>' +
          mono(cx, 67, it, it.length > 3 ? 13 : it.length > 2 ? 16 : 21);
      });
      out += '<path d="M8 80 h' + (w + 8) + ' v26 q0 12 -12 12 h-' + (w - 16) + ' q-12 0 -12 -12 z" fill="#E8D3B0"' + S(3.5) + "/>";
      for (var i = 0; i < n; i++) {
        var x = 12 + i * CUP;
        if (i > 0) out += '<path d="M' + x + ' 84 v28" stroke="#8A6A3E" stroke-width="2.5" stroke-linecap="round"/>';
        out += '<rect x="' + (x + CUP / 2 - 13) + '" y="88" width="26" height="22" rx="5" fill="#FFFFFF"' + S(2) + "/>" + mono(x + CUP / 2, 106, String(i), 17, ' class="lbl-grow" data-fitw="22"');   // index at 17: 13px for a six-cup carton at 286px (was 15)
      }
      return out + "</g></g>";
    }
  };

  /* ---------- 2. the lunchbox (tuple) ---------- */
  function fillFor(t) {
    if (/^'.*'$/.test(t)) return "#FFF6CC";          // char: letter-tile cream
    if (/^".*"$/.test(t)) return "#DDE8FF";          // text
    if (/^-?\d+\.\d*$/.test(t)) return "#C9F2D9";    // float: jelly green
    if (/^-?\d+$/.test(t)) return "#FFEFD9";         // integer: brick orange
    return "#FFFFFF";
  }
  C.lunchbox = {
    vb: function (el) {
      var its = items(el, "|", 4, "1|2.5|'a'"), w = its.reduce(function (s, t) { return s + Math.max(62, t.length * 13 + 26); }, 0);
      return "0 0 " + (w + 40) + " 140";
    },
    draw: function (el) {
      var its = items(el, "|", 4, "1|2.5|'a'"), ws = its.map(function (t) { return Math.max(62, t.length * 13 + 26); });
      var W = ws.reduce(function (a, b) { return a + b; }, 0) + 16, out = '<g class="bob">';
      out += '<path d="M' + (W / 2 - 34 + 12) + ' 30 v-14 q0 -10 10 -10 h48 q10 0 10 10 v14" fill="none"' + S(5) + "/>";
      out += '<rect x="12" y="28" width="' + W + '" height="102" rx="14" fill="#FFC2CF"' + S(4) + "/>";
      var x = 20;
      its.forEach(function (t, i) {
        out += '<rect x="' + x + '" y="36" width="' + (ws[i] - 8) + '" height="58" rx="8" fill="' + fillFor(t) + '"' + S(3) + "/>" + mono(x + (ws[i] - 8) / 2, 72, t, t.length > 5 ? 15 : 19);
        out += '<rect x="' + (x + (ws[i] - 8) / 2 - 18) + '" y="100" width="36" height="22" rx="5" fill="#FFFFFF"' + S(2) + "/>" + mono(x + (ws[i] - 8) / 2, 117, "." + i, 15);
        x += ws[i];
      });
      return out + "</g>";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
