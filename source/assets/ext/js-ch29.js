/* JavaScript book, chapter 29 additions ("Rush Hour Library"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch29.html. It adds two picture characters and no widget, so it claims nothing
   about program output (every output on the page comes from the engine's captured terminals and widgets).

   The two characters are copied unchanged from assets/ext/js-ch20.js, where Chapter 20 introduced them (the plan for
   this chapter asks for the same creatures, and they are not in the shared engine yet):
   data-char="coatcheck"   A Map: a coat-check counter. One hook per entry; the ticket under each coat is the KEY and the
                           coat is the VALUE. data-pairs = comma-separated "key=>value" (at most 4). data-label = the plate.
                           data-state="weak" draws a WeakMap: dashed outline, a WEAK plate and an EXIT door.
   data-char="guestlist"   A Set: a clipboard with a face, one ticked row per member. data-names = members (at most 5).
                           data-reject = a name that tried to join twice: a dashed, crossed-out "already listed" row. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch29.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';
  var HAND = 'font-family="Shantell Sans, cursive" font-weight="700"';
  var TITLE = 'font-family="Bangers, Impact, sans-serif" letter-spacing="1.2"';

  function list(el, attr) { return (el.getAttribute(attr) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function fit(text, max, big, small) { return Math.max(small, Math.min(big, max / (Math.max(1, text.length) * 0.62))); }
  function txt(x, y, s, max, big, small, extra) {
    var fs = fit(s, max, big, small);
    var squeeze = s.length * fs * 0.62 > max ? ' textLength="' + max + '" lengthAdjust="spacingAndGlyphs"' : "";
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '"' + squeeze + (extra || "") + ">" + esc(s) + "</text>";
  }
  function plate(cx, y, label, max) {
    var fs = fit(label, max, 19, 12), w = Math.min(max + 20, label.length * fs * 0.62 + 24);
    return '<rect x="' + (cx - w / 2).toFixed(1) + '" y="' + y + '" width="' + w.toFixed(1) + '" height="30" rx="7" fill="#FFFFFF"' + S(3) + "/>" + txt(cx, y + 21, label, max, 19, 12);
  }
  function eyes(x1, x2, y, r) { return '<g class="eyes"><circle cx="' + x1 + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/><circle cx="' + x2 + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/></g>'; }

  /* ---------- coatcheck (Map / WeakMap) ---------- */
  var COATS = ["#FFE1E1", "#DDE8FF", "#C9F2D9", "#FFF6CC"];
  function pairsOf(el) {
    return list(el, "data-pairs").slice(0, 4).map(function (p) { var i = p.indexOf("=>"); return i < 0 ? { k: p, v: "" } : { k: p.slice(0, i).trim(), v: p.slice(i + 2).trim() }; });
  }
  L.cast.coatcheck = {
    vb: function (el) { return "0 0 " + (40 + Math.max(2, pairsOf(el).length) * 132 + (el.getAttribute("data-state") === "weak" ? 86 : 0)) + " 268"; },
    draw: function (el) {
      var pairs = pairsOf(el), n = Math.max(2, pairs.length), weak = el.getAttribute("data-state") === "weak";
      var W = 40 + n * 132, label = el.getAttribute("data-label") || "", out = '<g class="bob">';
      var dash = weak ? ' stroke-dasharray="10 6"' : "";
      // booth back wall
      out += '<rect x="6" y="20" width="' + (W - 12) + '" height="236" rx="14" fill="#F4F1EA"' + S(4) + dash + "/>";
      // rail
      out += '<path d="M22 58 H' + (W - 22) + '" fill="none"' + S(7) + "/>";
      if (label) out += weak ? plate(104 + (W - 104) / 2, 6, label, Math.min(240, W - 130)) : plate(W / 2, 6, label, Math.min(240, W - 60));
      if (weak) out += '<rect x="22" y="6" width="74" height="30" rx="7" fill="#FFFFFF"' + S(3) + '/><text x="59" y="29" text-anchor="middle" ' + TITLE + ' font-size="21" fill="' + INK + '">WEAK</text>';
      pairs.forEach(function (p, i) {
        var cx = 20 + 66 + i * 132;
        // hook and hanger
        out += '<path d="M' + cx + " 58 v10 q0 8 -7 8" + '" fill="none"' + S(3.5) + "/>";
        out += '<path d="M' + cx + " 72 L" + (cx - 44) + " 98 H" + (cx + 44) + ' Z" fill="none"' + S(3.5) + "/>";
        // coat (the value)
        out += '<path d="M' + (cx - 42) + " 98 L" + (cx - 52) + " 178 H" + (cx + 52) + " L" + (cx + 42) + ' 98 Z" fill="' + COATS[i % 4] + '"' + S(3.5) + dash + "/>";
        out += '<path d="M' + (cx - 16) + " 98 L" + cx + " 120 L" + (cx + 16) + ' 98" fill="none"' + S(3) + "/>";
        if (p.v) out += txt(cx, 152, p.v, 96, 17, 10);
        // ticket (the key): string on a loop from the hanger
        out += '<path d="M' + cx + " 178 v12" + '" fill="none"' + S(2.5) + ' stroke-dasharray="3 3"/>';
        out += '<path d="M' + (cx - 58) + " 190 h116 v36 h-116 z" + '" fill="#FFFFFF"' + S(3) + "/>";
        out += '<circle cx="' + (cx - 48) + '" cy="208" r="4" fill="#FFFFFF"' + S(2.5) + "/>";
        out += txt(cx + 6, 214, p.k, 96, 17, 10);
      });
      // counter top
      out += '<rect x="14" y="236" width="' + (W - 28) + '" height="14" rx="5" fill="#FFD60A"' + S(3) + "/>";
      if (weak) {
        // an EXIT door at the right: coats leave when their owner does
        var dx = W + 6;
        out += '<rect x="' + dx + '" y="96" width="66" height="154" rx="6" fill="#FFFFFF"' + S(4) + "/>";
        out += '<circle cx="' + (dx + 52) + '" cy="176" r="5" fill="' + INK + '"/>';
        out += '<rect x="' + (dx + 6) + '" y="66" width="54" height="26" rx="5" fill="#FFFFFF"' + S(3) + '/><text x="' + (dx + 33) + '" y="86" text-anchor="middle" ' + TITLE + ' font-size="19" fill="' + INK + '">EXIT</text>';
        out += '<path d="M' + (dx - 26) + " 214 h40 m-12 -10 l12 10 l-12 10" + '" fill="none"' + S(3.5) + "/>";
      }
      return out + "</g>";
    }
  };

  /* ---------- guestlist (Set) ---------- */
  L.cast.guestlist = {
    vb: function (el) { return "0 0 260 " + (110 + Math.max(1, list(el, "data-names").slice(0, 5).length) * 40 + (el.getAttribute("data-reject") ? 54 : 0)); },
    draw: function (el) {
      var names = list(el, "data-names").slice(0, 5), rej = el.getAttribute("data-reject") || "";
      var rows = Math.max(1, names.length), H = 96 + rows * 40 + (rej ? 54 : 0), out = '<g class="bob">';
      out += '<rect x="20" y="20" width="220" height="' + H + '" rx="14" fill="#FFF6CC"' + S(4) + "/>";
      // the clip, with a face
      out += '<rect x="74" y="6" width="112" height="44" rx="12" fill="#B9C7E3"' + S(4) + "/>";
      out += eyes(112, 148, 24, 4.2) + '<path d="M118 36 q12 8 24 0" fill="none"' + S(3.5) + "/>";
      out += '<text x="130" y="76" text-anchor="middle" ' + TITLE + ' font-size="20" fill="' + INK + '">GUEST LIST</text>';
      names.forEach(function (nm, i) {
        var y = 92 + i * 40;
        out += '<rect x="36" y="' + y + '" width="26" height="26" rx="5" fill="#FFFFFF"' + S(3) + "/>";
        out += '<path d="M41 ' + (y + 14) + " l6 6 l11 -13" + '" fill="none"' + S(3.5) + "/>";
        var fs = fit(nm, 150, 19, 11);
        out += '<text x="74" y="' + (y + 20) + '" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(nm) + "</text>";
        out += '<path d="M72 ' + (y + 30) + ' H222" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="3 4"/>';
      });
      if (rej) {
        var ry = 96 + rows * 40;
        out += '<rect x="32" y="' + ry + '" width="196" height="42" rx="7" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5"/>';
        var fs2 = fit(rej, 60, 17, 10);
        out += '<text x="44" y="' + (ry + 27) + '" ' + MONO + ' font-size="' + fs2.toFixed(1) + '" fill="' + INK + '">' + esc(rej) + "</text>";
        out += '<path d="M40 ' + (ry + 21) + " H" + (48 + rej.length * fs2 * 0.62) + '" fill="none"' + S(3) + "/>";
        out += '<text x="222" y="' + (ry + 26) + '" text-anchor="end" ' + HAND + ' font-size="13" fill="' + INK + '">✗ already listed</text>';
      }
      return out + "</g>";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
