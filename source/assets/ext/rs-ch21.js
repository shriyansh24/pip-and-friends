/* Rust book, chapter 21 additions ("Shape Sorters and Customs").
   Two characters, drawn in the cast's house style. No widget: every interactive model on the page is an engine widget.

     <svg class="char" data-char="customs" data-mood="happy" data-arms="stamp"></svg>
        The Customs Officer: navy uniform, peaked cap with a badge, a form in one hand and a big rubber stamp in the other.
        He stands at each border (each function) and turns a foreign error form into his own form (From).
        data-mood: happy (default), focus, stern.   data-arms: stamp (stamp raised, default), down (stamp held low).
        data-label: the word on the form (at most 6 characters, default "FORM"). It is 16 units tall (13px at the default
        width) and carries class="lbl-deco", so the engine hides it where the officer is drawn too small to read it (.sm).

   The Result parcel (data-char="parcel") is the shared one in comic-critters.js; this file no longer keeps a copy.

   The drawing is aria-hidden like every character; the page gives each a .sr-only sentence when it carries meaning. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch21.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(5) + "/>"; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#FFFFFF"' + S(3) + "/>"; }

  /* ---------- the Customs Officer ---------- */
  L.cast.customs = {
    vb: "0 0 160 200",
    draw: function (el) {
      var mood = el.getAttribute("data-mood") || "happy";
      var pose = el.getAttribute("data-arms") || "stamp";
      var word = (el.getAttribute("data-label") || "FORM").slice(0, 6);
      var skin = "#E0AC7E", coat = "#3B5BA9", out = '<g class="bob">';
      // legs and boots
      out += '<rect x="58" y="160" width="12" height="24" rx="3" fill="#24345E"' + S(3) + '/><rect x="88" y="160" width="12" height="24" rx="3" fill="#24345E"' + S(3) + "/>";
      out += '<ellipse cx="63" cy="190" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="95" cy="190" rx="13" ry="6" fill="' + INK + '"/>';
      // coat with a belt and two brass buttons
      out += '<path d="M44 166 L50 104 Q79 90 108 104 L114 166 Z" fill="' + coat + '"' + S(4) + "/>";
      out += '<path d="M46 146 H112" fill="none"' + S(6) + '/><rect x="72" y="140" width="14" height="12" rx="2" fill="#FFD60A"' + S(2.5) + "/>";
      out += '<circle cx="79" cy="118" r="3.5" fill="#FFD60A"' + S(2) + '/><circle cx="79" cy="131" r="3.5" fill="#FFD60A"' + S(2) + "/>";
      // collar and tie
      out += '<path d="M66 98 L79 112 L92 98 Z" fill="#FFFFFF"' + S(3) + '/><path d="M79 106 l-4 12 l4 5 l4 -5 z" fill="#FF5A4E"' + S(2) + "/>";
      // shoulder badge
      out += '<path d="M54 112 l8 -3 l3 8 l-8 3 z" fill="#FFD60A"' + S(2) + "/>";
      // head
      out += '<circle cx="79" cy="68" r="27" fill="' + skin + '"' + S(4) + "/>";
      // a moustache
      out += '<path d="M66 79 q6 -6 13 -1 q7 -5 13 1 q-6 4 -13 1 q-7 3 -13 -1 z" fill="#5A3A22"' + S(2) + "/>";
      // peaked cap: crown, band, brim, badge
      out += '<path d="M48 52 C46 26 112 26 110 52 Z" fill="' + coat + '"' + S(4) + "/>";
      out += '<rect x="50" y="46" width="58" height="10" rx="3" fill="#24345E"' + S(3) + "/>";
      out += '<path d="M50 56 Q79 70 110 56 L112 60 Q79 76 48 60 Z" fill="' + INK + '"/>';
      out += '<path d="M79 31 l4 6 l7 1 l-5 5 l1 7 l-7 -3 l-7 3 l1 -7 l-5 -5 l7 -1 z" fill="#FFD60A"' + S(2) + "/>";
      // eyes and mouth
      if (mood === "focus") out += '<g class="eyes"><path d="M64 68 h10 M84 68 h10" fill="none"' + S(4.5) + "/></g>";
      else if (mood === "stern") out += '<g class="eyes">' + dot(69, 69, 4.5) + dot(89, 69, 4.5) + '</g><path d="M61 62 l12 3 M97 62 l-12 3" fill="none"' + S(3) + "/>";
      else out += '<g class="eyes"><path d="M63 70 q6 -7 12 0 M83 70 q6 -7 12 0" fill="none"' + S(4) + "/></g>";
      if (mood === "stern") out += '<path d="M71 88 h16" fill="none"' + S(4) + "/>";
      else out += '<path d="M70 86 q9 8 18 0" fill="none"' + S(4) + "/>";
      // left arm holds the form: a sheet with lines and a word
      out += limb(52, 112, 30, 140) + '<g transform="rotate(-8 24 150)"><rect x="0" y="122" width="52" height="56" rx="3" fill="#FFFFFF"' + S(3) + "/>" +
        '<text class="lbl-deco" x="26" y="174" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16" textLength="' + Math.min(44, word.length * 10) + '" lengthAdjust="spacingAndGlyphs" fill="' + INK + '">' + esc(word) + "</text>" +
        '<path d="M8 146 h36 M8 152 h36 M8 158 h24" fill="none"' + S(2) + "/></g>" + hand(30, 140);
      // right arm: a big rubber stamp, raised or low
      if (pose === "down") {
        out += limb(106, 112, 128, 146) + '<rect x="122" y="150" width="14" height="22" fill="#FF5A4E"' + S(3) + '/><rect x="114" y="170" width="30" height="10" rx="2" fill="#5A6472"' + S(3) + "/>" + hand(128, 146);
      } else {
        out += limb(106, 112, 132, 74) + '<g><circle cx="132" cy="50" r="8" fill="#FF5A4E"' + S(3) + '/><rect x="126" y="56" width="12" height="20" fill="#FF5A4E"' + S(3) + "/>" +
          '<rect x="117" y="76" width="30" height="11" rx="2" fill="#5A6472"' + S(3) + '/><path d="M121 92 h22" fill="none" stroke="#FF5A4E" stroke-width="3" stroke-linecap="round"/></g>' + hand(132, 74);
      }
      return out + "</g>";
    }
  };

  P.comic.ext(function () { L.drawCast(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
