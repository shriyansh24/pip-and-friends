/* Pip & Friends: shared critters (engine file; load after comic-widgets.js, any order with comic-cast.js).
   Moved here from chapter extensions so every chapter can use them without copying:
     error critters from Python ch9: jigsaw (TypeError), taster (ValueError), tumble (IndexError), jangles (KeyError),
       zilch (ZeroDivisionError), pockets (AttributeError), digger (FileNotFoundError), sneak (logic bug), duck (rubber duck)
     sealed (tuple: a padlocked crate, data-items) from Python ch7; bag (set: a drawstring sack, data-items) from Python ch8.
     giftbox (Rust Option: data-state some/none, data-label) from Rust ch11; fetch (Python ImportError) from Python ch13; marshal (C++ exceptions, Ember) from C++ ch15; parcel (Rust Result ok/err) from Rust ch13; pager (JS async states) from JavaScript ch16; inspector (Rust hard-hat Inspector) from Rust ch14; kitchenhand (Go goroutine helper) from Go ch24; umpire (Juno, JS test referee) from JavaScript ch14; trailguide (Rust clippy hiker) from Rust ch15.
     linker (C++ link errors) from C++ ch1; nullframe (JavaScript null) and gremlin (JavaScript automatic semicolon insertion) from JavaScript ch2.
   Chapter extensions that still define them overwrite these with the same drawing, which is harmless. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js loaded before comic-widgets.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";
  /* ---------------- the error critters ---------------- */
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function hand(x, y, fill) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="' + (fill || "#FFFFFF") + '"' + S(3) + "/>"; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(6) + "/>"; }
  function foot(x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="11" ry="5.5" fill="' + INK + '"/>'; }

  // TypeError: a jigsaw piece that will not fit; one square eye, one round eye.
  C.jigsaw = { vb: "0 0 140 165", draw: function () {
    return '<g class="bob">' + limb(38, 128, 36, 146) + limb(88, 128, 90, 146) + foot(36, 152) + foot(92, 152) +
      limb(22, 108, 6, 90) + hand(6, 88, "#DDE8FF") + limb(104, 116, 126, 130) + hand(127, 131, "#DDE8FF") +
      '<path d="M22 50 h30 a11 11 0 1 1 22 0 h30 v28 a11 11 0 1 1 0 22 v30 h-82 v-30 a11 11 0 1 0 0 -22 z" fill="#DDE8FF"' + S(4) + "/>" +
      '<g class="eyes"><rect x="40" y="70" width="12" height="12" fill="' + INK + '"/>' + dot(80, 76, 6) + "</g>" +
      '<path d="M46 104 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5" fill="none"' + S(3.5) + "/></g>";
  } };
  // ValueError: a taster with a spoon. Right kind of thing, wrong taste.
  C.taster = { vb: "0 0 150 165", draw: function () {
    return '<g class="bob">' + foot(54, 152) + foot(88, 152) +
      limb(34, 100, 14, 118) + hand(13, 120, "#FFE7CC") +
      '<path d="M70 26 q36 0 42 52 q8 62 -42 66 q-50 -4 -42 -66 q6 -52 42 -52 z" fill="#FFE7CC"' + S(4) + "/>" +
      '<g class="eyes"><path d="M48 66 l11 6 l-11 6 M92 66 l-11 6 l11 6" fill="none"' + S(3.5) + "/></g>" +
      '<path d="M56 94 q14 16 28 0 z" fill="' + INK + '"/><ellipse cx="70" cy="104" rx="8" ry="6.5" fill="#FF5A4E"' + S(2.5) + "/>" +
      limb(108, 98, 124, 80) + '<path d="M126 78 L134 40" fill="none"' + S(5) + '/><ellipse cx="135" cy="32" rx="8" ry="11" fill="#DDE8FF"' + S(3.5) + "/>" + hand(124, 82, "#FFE7CC") + "</g>";
  } };
  // IndexError: fell off the end of a row of boxes; box 3 does not exist.
  C.tumble = { vb: "0 0 200 165", draw: function () {
    var out = "";
    for (var i = 0; i < 3; i++) {
      var x = 8 + i * 44;
      out += '<rect x="' + x + '" y="18" width="40" height="36" rx="5" fill="#FFEFD9"' + S(3) + "/>" +
        '<text class="lbl-grow" data-fitw="40" x="' + (x + 20) + '" y="80" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="26" fill="#2B2B2B">' + i + "</text>";   // 26: 12.5px at .sm (96px), 17px at the default 130px; lbl-grow below that
    }
    out += '<rect x="144" y="18" width="40" height="36" rx="5" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
      '<text class="lbl-grow" data-fitw="36" data-cy="36" x="164" y="44" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="26" fill="' + INK + '">3?</text>';
    return out + '<g class="bob">' + limb(136, 58, 146, 92) + hand(136, 57, "#FF9F43") + limb(174, 104, 190, 86) + hand(191, 84, "#FF9F43") +
      limb(144, 134, 138, 152) + limb(160, 134, 166, 152) + foot(136, 156) + foot(168, 156) +
      '<circle cx="152" cy="112" r="25" fill="#FF9F43"' + S(4) + '/><g class="eyes">' + dot(143, 107, 3.8) + dot(161, 107, 3.8) + "</g>" + dot(152, 122, 4.5) +
      '<path d="M138 96 l8 4 M166 96 l-8 4" fill="none"' + S(3) + "/></g>";
  } };
  // KeyError: a worried key ring; none of its keys fits.
  C.jangles = { vb: "0 0 140 165", draw: function () {
    function key(x, rot) {
      return '<g transform="rotate(' + rot + " " + x + ' 100)"><path d="M' + x + " 104 V148 M" + x + " 136 h9 M" + x + ' 144 h7" fill="none"' + S(4.5) + '/><circle cx="' + x + '" cy="112" r="8" fill="#DDE8FF"' + S(3.5) + "/></g>";
    }
    return '<g class="bob">' + key(46, 14) + key(70, 0) + key(94, -14) +
      limb(32, 66, 12, 88) + hand(11, 90, "#FFD60A") + limb(108, 66, 128, 88) + hand(129, 90, "#FFD60A") +
      '<circle cx="70" cy="60" r="40" fill="#FFF6CC" stroke="' + INK + '" stroke-width="16"/><circle cx="70" cy="60" r="40" fill="none" stroke="#FFD60A" stroke-width="9"/>' +
      '<g class="eyes">' + dot(58, 56, 4.5) + dot(82, 56, 4.5) + "</g>" + '<path d="M50 44 l11 4 M90 44 l-11 4" fill="none"' + S(3) + "/>" +
      '<path d="M58 78 q12 -9 24 0" fill="none"' + S(4) + "/></g>";
  } };
  // ZeroDivisionError: a dizzy zero with a hole in the middle.
  C.zilch = { vb: "0 0 140 165", draw: function () {
    return '<g class="bob">' + foot(52, 152) + foot(90, 152) + limb(56, 138, 52, 148) + limb(86, 138, 90, 148) +
      limb(26, 80, 8, 58) + hand(7, 56, "#FFE1E1") + limb(114, 80, 132, 58) + hand(133, 56, "#FFE1E1") +
      '<ellipse cx="70" cy="86" rx="48" ry="56" fill="#FFE1E1"' + S(4) + '/><ellipse cx="70" cy="98" rx="15" ry="22" fill="#FFFFFF"' + S(4) + "/>" +
      '<g class="eyes"><path d="M49 47 l10 10 M59 47 l-10 10 M81 47 l10 10 M91 47 l-10 10" fill="none"' + S(3.5) + "/></g>" +
      '<path d="M62 68 q8 -6 16 0" fill="none"' + S(3.5) + "/></g>";
  } };
  // AttributeError: a critter in a many-pocket vest, one pocket turned out: that tool is not here.
  C.pockets = { vb: "0 0 140 165", draw: function () {
    return '<g class="bob">' + limb(56, 132, 54, 146) + limb(84, 132, 86, 146) + foot(52, 152) + foot(88, 152) +
      limb(30, 92, 10, 74) + hand(9, 72, "#C9F2D9") + limb(110, 92, 130, 74) + hand(131, 72, "#C9F2D9") +
      '<rect x="30" y="30" width="80" height="104" rx="32" fill="#C9F2D9"' + S(4) + "/>" +
      '<path d="M32 84 H108 V108 q0 26 -38 26 q-38 0 -38 -26 z" fill="#FFD60A"' + S(3.5) + "/>" +
      '<rect x="40" y="94" width="24" height="16" rx="3" fill="#FFF6CC"' + S(3) + '/><rect x="76" y="94" width="24" height="16" rx="3" fill="#FFF6CC"' + S(3) + "/>" +
      '<path d="M42 110 h20 l-4 15 h-12 z" fill="#FFFFFF"' + S(3) + "/>" +
      '<g class="eyes">' + dot(56, 58, 4.5) + dot(84, 58, 4.5) + "</g>" + '<path d="M60 72 h20" fill="none"' + S(4) + "/></g>";
  } };
  // FileNotFoundError: a mole in a hard hat, digging for a file that is not there.
  C.digger = { vb: "0 0 150 165", draw: function () {
    return '<g class="bob">' +
      '<rect x="108" y="6" width="32" height="40" rx="3" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
      '<text class="lbl-grow" data-fitw="28" data-cy="26" x="124" y="34" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" fill="' + INK + '">?</text>' +
      '<path d="M104 128 L128 70" fill="none"' + S(5) + '/><path d="M96 124 l16 8 l-5 18 q-13 -2 -17 -13 z" fill="#DDE8FF"' + S(3.5) + "/>" +
      '<ellipse cx="64" cy="100" rx="40" ry="44" fill="#C8955E"' + S(4) + "/>" +
      '<path d="M28 70 q36 -46 72 0 z" fill="#FFD60A"' + S(3.5) + '/><path d="M22 70 h84" fill="none"' + S(5) + '/><circle cx="64" cy="48" r="7" fill="#FFF6CC"' + S(3) + "/>" +
      '<g class="eyes">' + dot(52, 88, 3.8) + dot(76, 88, 3.8) + "</g>" + '<ellipse cx="64" cy="100" rx="8" ry="5.5" fill="#FF9F43"' + S(2.5) + "/>" +
      '<path d="M58 112 q6 4 12 0" fill="none"' + S(3) + "/>" + hand(98, 120, "#C8955E") +
      '<path d="M4 160 q30 -30 62 -22 q32 -8 80 22 z" fill="#E3B98F"' + S(4) + "/></g>";
  } };
  // A logic bug: no crash, no noise. Finger on lips, eyes sliding sideways.
  C.sneak = { vb: "0 0 140 165", draw: function () {
    return '<g class="bob">' + limb(60, 138, 54, 152) + limb(82, 138, 92, 150) + dot(53, 154, 5) + dot(94, 152, 5) +
      '<path d="M70 34 q42 30 36 72 q-4 34 -36 34 q-32 0 -36 -34 q-6 -42 36 -72 z" fill="#DADADA"' + S(4) + "/>" +
      '<g class="eyes"><ellipse cx="57" cy="80" rx="9" ry="8" fill="#FFFFFF"' + S(3) + '/><ellipse cx="83" cy="80" rx="9" ry="8" fill="#FFFFFF"' + S(3) + "/>" + dot(61, 81, 3.5) + dot(87, 81, 3.5) + "</g>" +
      '<path d="M62 104 h16" fill="none"' + S(3.5) + "/>" + limb(38, 120, 62, 112) + '<path d="M70 92 V114" fill="none"' + S(5) + '/><circle cx="66" cy="114" r="6" fill="#DADADA"' + S(3) + "/>" +
      limb(104, 108, 124, 120) + hand(125, 121, "#DADADA") + "</g>";
  } };
  // The rubber duck: listens to everything, says nothing.
  C.duck = { vb: "0 0 150 130", draw: function () {
    return '<g class="bob"><path d="M26 82 l-16 -18 l24 6 z" fill="#FFD60A"' + S(3.5) + "/>" +
      '<ellipse cx="74" cy="92" rx="52" ry="30" fill="#FFD60A"' + S(4) + "/>" +
      '<path d="M48 86 q24 -8 40 10 q-22 12 -40 -10 z" fill="#FFE45C"' + S(3) + "/>" +
      '<circle cx="98" cy="50" r="26" fill="#FFD60A"' + S(4) + "/>" +
      '<path d="M120 48 q22 0 22 8 q-4 8 -24 5 z" fill="#FF9F43"' + S(3.5) + '/><g class="eyes">' + dot(104, 44, 4.2) + "</g></g>";
  } };

  /* Labels (engine pass 3): item values at 22 units (16 for 4+ characters) and index digits at 20 (they were 18/12 and
     14: 5.5px when a three-item tuple was drawn 125px wide). Both are lbl-grow, so a small drawing grows them toward
     12px, squeezed to their box; the digits sit lower (the frame is 142 tall) to leave room to grow. */
  L.cast.sealed = { vb: "0 0 320 142", draw: function (node) {
    var items = (node.getAttribute("data-items") || "3,4").split(",").slice(0, 4), w = 52, g = 6;
    var total = items.length * (w + g) - g, x0 = (320 - total) / 2, S = L.stroke, out = '<g class="bob">';
    out += '<rect x="' + (x0 - 12) + '" y="34" width="' + (total + 24) + '" height="72" rx="14" fill="#EFE6FF"' + S(3) + "/>";
    items.forEach(function (it, i) {
      var x = x0 + i * (w + g), t = it.trim();
      out += '<rect x="' + x + '" y="42" width="' + w + '" height="56" rx="6" fill="#FFEFD9"' + S(3.5) + "/>" +
        '<text class="lbl-grow" data-fitw="46" x="' + (x + w / 2) + '" y="80" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (t.length > 3 ? 16 : 22) + '" fill="#111111"' + (t.length * 0.62 * (t.length > 3 ? 16 : 22) > 46 ? ' textLength="46" lengthAdjust="spacingAndGlyphs"' : "") + '>' + esc(t) + "</text>" +
        '<text class="lbl-grow" data-fitw="46" x="' + (x + w / 2) + '" y="134" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="20" fill="#2B2B2B">' + i + "</text>";
    });
    out += '<path d="M' + (x0 - 22) + " 24 q-26 46 0 92 M" + (x0 + total + 22) + " 24 q26 46 0 92" + '" fill="none"' + S(6) + "/>";
    var cx = 160;
    out += '<path d="M' + (cx - 11) + " 22 v-8 a11 11 0 0 1 22 0 v8" + '" fill="none"' + S(4) + "/>" +
      '<rect x="' + (cx - 17) + '" y="20" width="34" height="26" rx="5" fill="#FFD60A"' + S(3.5) + "/>" +
      '<circle cx="' + cx + '" cy="31" r="3.5" fill="#111111"/><path d="M' + cx + " 33 v7" + '"' + S(3) + "/>";
    return out + "</g>";
  } };
  /* Item circles are r 20 (were 17) and items are 20 units, 18 for 3+ characters (they were 17/12: "Ada" was 8.2px at the
     default width); an item that still doesn't fit is squeezed to the circle, and lbl-grow grows it toward 12px when the
     bag is drawn small. */
  L.cast.bag = { vb: "0 0 190 180", draw: function (el) {
    var items = (el.getAttribute("data-items") || "1,2,3").split(",").slice(0, 5);
    var spots = [[72, 110], [118, 110], [95, 146], [52, 146], [138, 146]];
    var out = '<g class="bob">' +
      '<path d="M62 44 q-52 30 -46 84 q6 44 79 44 q73 0 79 -44 q6 -54 -46 -84 z" fill="#FDE7F3"' + S(4) + "/>" +
      '<path d="M58 32 q37 -14 74 0 l-6 14 q-31 -9 -62 0 z" fill="#FDE7F3"' + S(4) + "/>" +
      '<path d="M64 46 q31 8 62 0" fill="none"' + S(4) + '/><path d="M95 50 q-20 10 -30 -4 M95 50 q22 12 32 -2" fill="none"' + S(3) + "/>" +
      '<g class="eyes"><circle cx="82" cy="76" r="3.6" fill="' + INK + '"/><circle cx="108" cy="76" r="3.6" fill="' + INK + '"/></g>' +
      '<path d="M86 86 q9 7 18 0" fill="none"' + S(3.5) + "/>";
    items.forEach(function (it, i) {
      var p = spots[i], t = it.trim();
      var fs = t.length > 2 ? 18 : 20;
      out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="20" fill="#FFFFFF"' + S(3) + "/>" +
        '<text class="lbl-grow" data-fitw="34" x="' + p[0] + '" y="' + (p[1] + 7) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '"' + (t.length * 0.62 * fs > 34 ? ' textLength="34" lengthAdjust="spacingAndGlyphs"' : "") + '>' + esc(t) + "</text>";
    });
    return out + "</g>";
  } };
  /* ---- the Linker (C++ ch1: delivers link errors) ---- */
  function linkerFace(mood) {
    var eyes, mouth;
    switch (mood) {
      case "happy": eyes = '<path d="M62 64 q6 -8 12 0 M82 64 q6 -8 12 0" fill="none"' + S(4) + "/>"; mouth = '<path d="M66 78 q12 10 24 0" fill="none"' + S(4) + "/>"; break;
      case "worried": eyes = '<circle cx="68" cy="64" r="4.5" fill="' + INK + '"/><circle cx="88" cy="64" r="4.5" fill="' + INK + '"/><path d="M60 54 l12 -3 M96 54 l-12 -3" fill="none"' + S(3.5) + "/>"; mouth = '<path d="M68 82 q10 -8 20 0" fill="none"' + S(4) + "/>"; break;
      case "surprised": eyes = '<circle cx="68" cy="63" r="7" fill="#fff"' + S(3) + '/><circle cx="88" cy="63" r="7" fill="#fff"' + S(3) + '/><circle cx="68" cy="64" r="3" fill="' + INK + '"/><circle cx="88" cy="64" r="3" fill="' + INK + '"/>'; mouth = '<circle cx="78" cy="81" r="5" fill="' + INK + '"/>'; break;
      default: eyes = '<circle cx="68" cy="64" r="5" fill="' + INK + '"/><circle cx="88" cy="64" r="5" fill="' + INK + '"/>'; mouth = '<path d="M67 77 q11 9 22 0" fill="none"' + S(4) + "/>";
    }
    return '<g class="eyes">' + eyes + "</g>" + mouth;
  }
  L.cast.linker = { vb: "0 0 156 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", skin = "#E8B48A", shirt = "#7FD6C2", apron = "#C8955E", box = "#E7C08A";
    return '<g class="bob">' +
      /* legs and boots */
      '<rect x="56" y="160" width="17" height="26" rx="4" fill="#3B3F66"' + S(3.5) + '/><rect x="83" y="160" width="17" height="26" rx="4" fill="#3B3F66"' + S(3.5) + "/>" +
      '<ellipse cx="63" cy="190" rx="15" ry="6.5" fill="' + INK + '"/><ellipse cx="93" cy="190" rx="15" ry="6.5" fill="' + INK + '"/>' +
      /* shirt, apron with name */
      '<path d="M40 168 L46 104 Q78 88 110 104 L116 168 Z" fill="' + shirt + '"' + S(4) + "/>" +
      '<path d="M54 108 H102 L106 168 H50 Z" fill="' + apron + '"' + S(3.5) + "/>" +
      '<path d="M54 108 L64 96 M102 108 L92 96" fill="none"' + S(3) + "/>" +
      /* head and cap */
      '<circle cx="78" cy="66" r="27" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M50 56 Q52 30 78 30 Q104 30 106 56 Z" fill="#FF5A4E"' + S(4) + '/><path d="M98 54 Q122 52 128 60 Q114 64 100 60 Z" fill="#FF5A4E"' + S(3.5) + "/>" +
      '<circle cx="78" cy="31" r="4" fill="#FFD60A"' + S(2.5) + "/>" +
      linkerFace(mood) +
      /* the box held in front, with tape across the flaps */
      '<path d="M36 122 L120 122 L120 164 L36 164 Z" fill="' + box + '"' + S(4) + "/>" +
      '<path d="M36 122 L48 110 L132 110 L120 122 Z" fill="#F2D3A2"' + S(3.5) + '/><path d="M120 122 L132 110 L132 152 L120 164 Z" fill="#D4A66A"' + S(3.5) + "/>" +
      '<path d="M78 110 L72 122 V164" fill="none" stroke="#FFD60A" stroke-width="7"/><path d="M78 110 L72 122 V164" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="4 5"/>' +
      /* "LINK" on the box is decoration (the name is in the bubble): 14.2px at the default width, hidden under 12px (.sm). */
      '<text class="lbl-deco" x="96" y="150" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="17" letter-spacing="1.5" fill="' + INK + '">LINK</text>' +
      /* hands on the box */
      '<circle cx="36" cy="140" r="9" fill="' + skin + '"' + S(3) + '/><circle cx="121" cy="146" r="9" fill="' + skin + '"' + S(3) + "/>" +
      "</g>";
  } };
  /* ---- JavaScript ch2: nullframe (null: an empty picture frame) and the ASI gremlin ---- */
  (function () {
  function S2(w) { return ' stroke="' + INK + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function txt(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>"; }

  /* ---------- 1. cast ---------- */
  C.nullframe = { vb: "0 0 140 156", draw: function () {
    return '<g class="bob">' +
      '<circle cx="70" cy="8" r="4.5" fill="' + INK + '"/><path d="M70 8 L32 32 M70 8 L108 32" fill="none"' + S2(3) + "/>" +
      '<rect x="14" y="30" width="112" height="96" rx="6" fill="#E8B04B"' + S2(4) + "/>" +
      '<rect x="31" y="47" width="78" height="62" rx="2" fill="#FFFFFF"' + S2(3) + "/>" +
      '<path d="M31 47 l78 62 M109 47 l-78 62" fill="none" stroke="#B9C7E3" stroke-width="2" stroke-dasharray="5 5"/>' +
      '<circle cx="22" cy="38" r="4" fill="#FFF6CC"' + S2(2) + '/><circle cx="118" cy="38" r="4" fill="#FFF6CC"' + S2(2) + "/>" +
      '<circle cx="22" cy="118" r="4" fill="#FFF6CC"' + S2(2) + '/><circle cx="118" cy="118" r="4" fill="#FFF6CC"' + S2(2) + "/>" +
      '<circle cx="58" cy="38.5" r="3.4" fill="' + INK + '"/><circle cx="82" cy="38.5" r="3.4" fill="' + INK + '"/>' +
      '<path d="M62 117 q8 5 16 0" fill="none"' + S2(3) + "/>" +
      '<rect x="40" y="132" width="60" height="22" rx="5" fill="#FFFFFF"' + S2(3) + "/>" + txt(70, 149, "null", 17).replace("<text ", '<text class="lbl-grow" data-fitw="54" data-cy="143" ') + "</g>";   // 17 units: 11.7px at .sm, then lbl-grow
  } };
  C.gremlin = { vb: "0 0 150 170", draw: function (el) {
    var hold = el.getAttribute("data-hold") !== "none";
    var arms = hold ? '<path d="M50 112 L44 52 M100 112 L106 52" fill="none"' + S2(7) + '/><circle cx="75" cy="30" r="22" fill="' + INK + '"/>' +
      '<path d="M62 24 q6 -7 13 -6" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>'
      : '<path d="M50 112 L30 132 M100 112 L120 92" fill="none"' + S2(7) + "/>";
    return '<g class="bob">' + arms +
      '<ellipse cx="75" cy="128" rx="30" ry="28" fill="#8EE6A8"' + S2(4) + "/>" +
      '<path d="M58 152 l-8 12 h16 M92 152 l8 12 h-16" fill="none"' + S2(4) + "/>" +
      '<path d="M52 82 L24 66 L50 98 z M98 82 L126 66 L100 98 z" fill="#8EE6A8"' + S2(4) + "/>" +
      '<circle cx="75" cy="88" r="27" fill="#8EE6A8"' + S2(4) + "/>" +
      '<circle cx="64" cy="84" r="7" fill="#FFFFFF"' + S2(3) + '/><circle cx="86" cy="84" r="7" fill="#FFFFFF"' + S2(3) + "/>" +
      '<circle cx="66" cy="85" r="3" fill="' + INK + '"/><circle cx="88" cy="85" r="3" fill="' + INK + '"/>' +
      '<path d="M56 74 l12 4 M94 74 l-12 4" fill="none"' + S2(3) + "/>" +
      '<path d="M62 98 q13 12 26 0" fill="#FFFFFF"' + S2(3) + '/><path d="M68 101 v4 M75 102 v5 M82 101 v4" fill="none"' + S2(2) + "/></g>";
  } };
  })();

  /* ---- Go ch2: tidy (gofmt, a robot with a broom) and specs (go vet, a proof-reader with big glasses) ---- */
  (function () {
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(6) + "/>"; }
  function hand(x, y, f) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="' + (f || "#FFFFFF") + '"' + S(3) + "/>"; }
  // Tidy: a small square robot on one wheel, sweeping stray spaces away with a broom.
  L.cast.tidy = { vb: "0 0 160 170", draw: function () {
    return '<g class="bob">' +
      '<path d="M12 150 q20 -8 40 0" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>' +
      '<circle cx="80" cy="150" r="14" fill="#DADADA"' + S(4) + '/><circle cx="80" cy="150" r="4" fill="' + INK + '"/>' +
      '<rect x="44" y="62" width="72" height="72" rx="14" fill="#C9F2D9"' + S(4) + "/>" +
      '<rect x="56" y="76" width="48" height="30" rx="8" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<g class="eyes">' + dot(70, 91, 4.5) + dot(90, 91, 4.5) + "</g>" +
      '<path d="M70 118 q10 8 20 0" fill="none"' + S(3.5) + "/>" +
      '<path d="M80 62 V44" fill="none"' + S(4) + '/><circle cx="80" cy="40" r="7" fill="#FFD60A"' + S(3.5) + "/>" +
      limb(116, 96, 134, 112) + hand(135, 113, "#C9F2D9") +
      // broom: handle from the hand down to the left, bristles on the floor
      '<path d="M140 104 L36 150" fill="none" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M140 104 L36 150" fill="none"' + S(1.5) + "/>" +
      '<path d="M44 140 L16 152 L22 166 L52 156 z" fill="#FFD60A"' + S(3.5) + "/>" +
      '<path d="M22 154 l6 10 M30 151 l6 10 M38 148 l6 10" fill="none"' + S(2) + "/>" +
      limb(44, 96, 28, 82) + hand(27, 80, "#C9F2D9") + "</g>";
  } };
  // Specs: a round proof-reader with big glasses, holding a magnifier up to a page.
  L.cast.specs = { vb: "0 0 160 170", draw: function () {
    return '<g class="bob">' +
      '<ellipse cx="62" cy="160" rx="12" ry="5.5" fill="' + INK + '"/><ellipse cx="98" cy="160" rx="12" ry="5.5" fill="' + INK + '"/>' +
      limb(66, 144, 62, 156) + limb(94, 144, 98, 156) +
      '<path d="M80 30 q46 0 46 62 q0 56 -46 56 q-46 0 -46 -56 q0 -62 46 -62 z" fill="#DDE8FF"' + S(4) + "/>" +
      '<path d="M50 40 q30 -22 60 0" fill="none"' + S(4) + "/>" +
      '<g class="eyes"><circle cx="64" cy="80" r="15" fill="#FFFFFF"' + S(4) + '/><circle cx="96" cy="80" r="15" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M79 80 h2" fill="none"' + S(4) + "/>" + dot(66, 82, 5) + dot(98, 82, 5) + "</g>" +
      '<path d="M70 112 h20" fill="none"' + S(3.5) + "/>" +
      // a page in the left hand
      limb(38, 100, 22, 112) + '<rect x="2" y="96" width="30" height="40" rx="3" fill="#FFF6CC"' + S(3) + "/>" +
      '<path d="M8 106 h18 M8 114 h18 M8 122 h12" fill="none"' + S(2) + "/>" + hand(22, 114, "#DDE8FF") +
      // magnifier in the right hand
      limb(122, 100, 136, 84) + '<path d="M138 82 L150 66" fill="none"' + S(5) + '/>' +
      '<circle cx="140" cy="52" r="16" fill="#FFFFFF" fill-opacity="0.85"' + S(4) + "/>" + hand(136, 86, "#DDE8FF") + "</g>";
  } };
  })();

  /* ---- C++ ch3: sanitizer (night-vision goggles; reports undefined behaviour) ---- */
  (function () {

  /* ---------------- the Sanitizer: night-vision goggles ---------------- */
  L.cast.sanitizer = { vb: "0 0 150 190", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal";
    var mouth = mood === "happy" ? '<path d="M62 92 q13 10 26 0" fill="none"' + S(4) + "/>"
      : mood === "stern" ? '<path d="M63 95 h24" fill="none"' + S(4) + "/>"
      : '<circle cx="75" cy="94" r="5" fill="' + INK + '"/>';
    return '<g class="bob">' +
      /* boots and legs */
      '<rect x="52" y="150" width="16" height="24" rx="4" fill="#2F3A5A"' + S(3.5) + '/><rect x="82" y="150" width="16" height="24" rx="4" fill="#2F3A5A"' + S(3.5) + "/>" +
      '<ellipse cx="58" cy="178" rx="15" ry="6.5" fill="' + INK + '"/><ellipse cx="92" cy="178" rx="15" ry="6.5" fill="' + INK + '"/>' +
      /* long coat with a badge */
      '<path d="M34 160 L42 108 Q75 94 108 108 L116 160 Z" fill="#3E6E64"' + S(4) + "/>" +
      '<path d="M75 104 V160" fill="none"' + S(3) + "/>" +
      '<path d="M88 122 l6 -4 l6 4 v8 q-6 5 -12 0 z" fill="#FFD60A"' + S(2.5) + "/>" +
      /* arm holding a torch, beam dashed */
      '<path d="M40 116 Q26 128 30 146" fill="none"' + S(6) + "/>" +
      '<path d="M110 116 Q130 120 132 104" fill="none"' + S(6) + "/>" +
      '<rect x="124" y="86" width="14" height="22" rx="3" fill="#D9D9D9"' + S(3) + "/>" +
      '<path d="M127 84 l-10 -26 M135 84 l8 -26" fill="none" stroke="#111111" stroke-width="2.5" stroke-dasharray="5 4"/>' +
      /* head */
      '<circle cx="75" cy="72" r="30" fill="#E9B98F"' + S(4) + "/>" +
      '<path d="M46 62 Q50 36 75 36 Q100 36 104 62" fill="#2B2B2B"' + S(3.5) + "/>" +
      /* goggles: strap and two big green lenses */
      '<path d="M44 66 H106" fill="none"' + S(5) + "/>" +
      '<g class="eyes"><circle cx="62" cy="68" r="13" fill="#9BF2B8"' + S(4) + '/><circle cx="88" cy="68" r="13" fill="#9BF2B8"' + S(4) + "/>" +
      '<circle cx="58" cy="64" r="3.5" fill="#FFFFFF"/><circle cx="84" cy="64" r="3.5" fill="#FFFFFF"/></g>' +
      '<path d="M75 68 h0" fill="none"' + S(4) + "/>" + mouth + "</g>";
  } };
  })();
  /* ---- C++ ch5: conductor (switching trains at a junction: if/else) ---- */
  (function () {

  /* ---------------- the Conductor: peaked cap, navy uniform, ticket punch ---------------- */
  L.cast.conductor = { vb: "0 0 150 190", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal";
    var mouth = mood === "happy" ? '<path d="M63 90 q12 10 24 0" fill="none"' + S(4) + "/>"
      : mood === "stern" ? '<path d="M64 94 h22" fill="none"' + S(4) + "/>"
      : '<path d="M65 92 q10 5 20 0" fill="none"' + S(3.5) + "/>";
    var brows = mood === "stern" ? '<path d="M56 60 l12 4 M94 60 l-12 4" fill="none"' + S(3.5) + "/>" : "";
    return '<g class="bob">' +
      /* shoes and trousers */
      '<rect x="54" y="146" width="16" height="28" rx="3" fill="#24324F"' + S(3.5) + '/><rect x="80" y="146" width="16" height="28" rx="3" fill="#24324F"' + S(3.5) + "/>" +
      '<ellipse cx="60" cy="178" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="90" cy="178" rx="14" ry="6" fill="' + INK + '"/>' +
      /* jacket with two rows of gold buttons */
      '<path d="M38 152 L44 106 Q75 94 106 106 L112 152 Z" fill="#2E4A86"' + S(4) + "/>" +
      '<path d="M75 102 V152" fill="none"' + S(3) + "/>" +
      '<circle cx="67" cy="118" r="3.5" fill="#FFD60A"' + S(2) + '/><circle cx="67" cy="134" r="3.5" fill="#FFD60A"' + S(2) + "/>" +
      '<circle cx="83" cy="118" r="3.5" fill="#FFD60A"' + S(2) + '/><circle cx="83" cy="134" r="3.5" fill="#FFD60A"' + S(2) + "/>" +
      /* left arm down, right arm up holding a ticket and a punch */
      '<path d="M44 114 Q30 128 34 148" fill="none"' + S(6) + '/><circle cx="34" cy="150" r="6" fill="#C98E64"' + S(3) + "/>" +
      '<path d="M106 114 Q124 112 126 96" fill="none"' + S(6) + "/>" +
      '<rect x="114" y="60" width="30" height="20" rx="3" fill="#FFF6CC"' + S(3) + '/><path d="M120 67 h18 M120 73 h12" fill="none" stroke="#111111" stroke-width="2"/>' +
      '<circle cx="139" cy="64" r="2.6" fill="' + INK + '"/>' +
      '<path d="M120 84 l10 10 l6 -6 l-10 -10 z" fill="#B9B9B9"' + S(3) + '/><circle cx="126" cy="96" r="6" fill="#C98E64"' + S(3) + "/>" +
      /* head */
      '<circle cx="75" cy="72" r="28" fill="#C98E64"' + S(4) + "/>" +
      '<path d="M50 84 q-6 14 6 18 M100 84 q6 14 -6 18" fill="none"' + S(3) + "/>" +
      /* peaked cap with a badge */
      '<path d="M44 54 Q46 30 75 30 Q104 30 106 54 Z" fill="#2E4A86"' + S(4) + "/>" +
      '<path d="M40 56 H112 Q104 64 76 62 Q48 64 40 56 Z" fill="' + INK + '"/>' +
      '<rect x="68" y="38" width="14" height="10" rx="2" fill="#FFD60A"' + S(2) + "/>" +
      brows +
      '<g class="eyes"><circle cx="64" cy="72" r="3.8" fill="' + INK + '"/><circle cx="86" cy="72" r="3.8" fill="' + INK + '"/></g>' +
      mouth + "</g>";
  } };
  })();

  P.comic.ext(function () { L.drawCast(); });
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- giftbox (Option<T>), promoted from rs-ch11.js so later chapters can reuse it ----------------
   Usage and attributes are as documented in rs-ch11.js: data-state some|none, data-label (<=9 chars), data-mood. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (giftbox) loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(5) + "/>"; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#FFFFFF"' + S(3) + "/>"; }
  function foot(x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="12" ry="5.5" fill="' + INK + '"/>'; }

  L.cast.giftbox = {
    vb: "0 0 170 190",
    draw: function (el) {
      var none = el.getAttribute("data-state") === "none";
      var lab = (el.getAttribute("data-label") || "").slice(0, 9);
      var mood = el.getAttribute("data-mood") || (none ? "o" : "happy");
      var out = foot(56, 182) + foot(114, 182) + limb(56, 172, 56, 178) + limb(114, 172, 114, 178);
      // arms: raised in delight when full, thrown wide when empty
      out += limb(26, 124, 8, none ? 108 : 96) + hand(7, none ? 106 : 94) + limb(144, 124, 162, none ? 108 : 96) + hand(163, none ? 106 : 94);
      // the lid has popped off and floats above the box, tilted, with its bow
      out += '<g transform="rotate(' + (none ? 16 : -12) + ' 85 ' + (none ? 34 : 46) + ')"><rect x="22" y="' + (none ? 24 : 36) + '" width="126" height="20" rx="5" fill="#7FB2FF"' + S(4) + "/>" +
        '<rect x="76" y="' + (none ? 24 : 36) + '" width="18" height="20" fill="#FFD60A"' + S(3) + "/>" +
        '<path d="M85 ' + (none ? 24 : 36) + ' q-22 -20 -26 -2 q4 8 26 2 q22 -20 26 -2 q-4 8 -26 2 z" fill="#FFD60A"' + S(3) + "/></g>";
      // the inside of the box, seen through the open top
      out += '<path d="M26 96 L36 82 H134 L144 96 Z" fill="#2B2B2B"' + S(3) + "/>";
      if (none) {
        out += '<path d="M50 90 h70" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="6 5"/>';
      } else {
        // one thing inside, held up on a card in front of the lid
        var w = Math.max(60, lab.length * 13 + 26);
        out += '<g class="bob"><path d="M85 88 V80" fill="none"' + S(3) + "/>" +
          '<rect x="' + (85 - w / 2) + '" y="38" width="' + w + '" height="42" rx="8" fill="#FFF6CC"' + S(3.5) + "/>" +
          (lab ? '<text class="lbl-grow" data-fitw="' + (w - 12) + '" data-cy="59" data-plate="150" x="85" y="67" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="20" fill="' + INK + '">' + esc(lab) + "</text>" : "") + "</g>";
      }
      // the box body with its ribbon
      out += '<rect x="26" y="96" width="118" height="78" rx="6" fill="#7FB2FF"' + S(4) + "/>" +
        '<rect x="76" y="96" width="18" height="78" fill="#FFD60A"' + S(3) + "/>";
      // the face on the front
      out += '<g class="eyes">' + dot(52, 124, 5) + dot(118, 124, 5) + "</g>";
      if (mood === "o") out += '<ellipse cx="85" cy="148" rx="7" ry="8" fill="' + INK + '"/>';
      else if (mood === "sad") out += '<path d="M70 154 q15 -12 30 0" fill="none"' + S(4) + "/>";
      else out += '<path d="M68 142 q17 16 34 0" fill="none"' + S(4) + "/>";
      if (none) out += '<path d="M42 112 l12 4 M128 112 l-12 4" fill="none"' + S(3) + "/>";
      return out;
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- fetch (Python ImportError / ModuleNotFoundError): a little dog with an open, empty box ----------------
   Promoted from py-ch13.js (copied into py-ch23). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (fetch) loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, C = L.cast, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function hand(x, y, fill) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="' + (fill || "#FFFFFF") + '"' + S(3) + "/>"; }
  C.fetch = { vb: "0 0 150 165", draw: function () {
    return '<g class="bob">' +
      '<rect x="112" y="4" width="32" height="40" rx="3" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
      '<text class="lbl-grow" data-fitw="28" data-cy="24" x="128" y="33" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" fill="' + INK + '">?</text>' +
      '<path d="M40 40 q-22 4 -24 34 q8 10 20 2 z" fill="#B87A45"' + S(3.5) + "/>" +
      '<path d="M110 40 q22 4 24 34 q-8 10 -20 2 z" fill="#B87A45"' + S(3.5) + "/>" +
      '<ellipse cx="75" cy="60" rx="38" ry="34" fill="#F2C48D"' + S(4) + "/>" +
      '<ellipse cx="75" cy="76" rx="18" ry="12" fill="#FFF6CC"' + S(3) + "/>" +
      '<g class="eyes">' + dot(61, 54, 4.5) + dot(89, 54, 4.5) + "</g>" +
      '<ellipse cx="75" cy="70" rx="6" ry="4.5" fill="' + INK + '"/><path d="M68 82 q7 5 14 0" fill="none"' + S(3) + "/>" +
      '<path d="M34 104 l-14 -16 l26 8 z" fill="#E3B98F"' + S(3.5) + '/><path d="M116 104 l14 -16 l-26 8 z" fill="#E3B98F"' + S(3.5) + "/>" +
      '<path d="M34 104 h82 l-6 50 h-70 z" fill="#E3B98F"' + S(4) + '/><path d="M34 104 h82" fill="none"' + S(4) + "/>" +
      '<path d="M48 120 h54" fill="none" stroke="#8A5A2B" stroke-width="3" stroke-dasharray="6 5"/>' +
      hand(44, 102, "#F2C48D") + hand(106, 102, "#F2C48D") + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- marshal: Ember the Fire Marshal (C++ exceptions), promoted from cpp-ch15.js (copied into cpp-ch16) ----------------
   Attributes as documented in cpp-ch15.js (mood, mouth, arms, prop). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch15.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, INK = "#111111";
  var SKIN = "#E9B98E", COAT = "#FFD60A", BAND = "#DDE8FF", HELMET = "#FF5A4E", BOOT = "#2B2B2B";

  function eyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M63 72 q6 -8 12 0 M85 72 q6 -8 12 0" fill="none"' + S(4) + "/>";
      case "surprised": return '<circle cx="69" cy="71" r="6.5" fill="#fff"' + S(3) + '/><circle cx="91" cy="71" r="6.5" fill="#fff"' + S(3) + "/>" +
        '<circle cx="69" cy="72" r="2.8" fill="' + INK + '"/><circle cx="91" cy="72" r="2.8" fill="' + INK + '"/>';
      case "focus": return '<path d="M62 71 h13 M85 71 h13" fill="none"' + S(5) + '/><path d="M61 63 l13 3 M99 63 l-13 3" fill="none"' + S(3) + "/>";
      case "worried": return '<circle cx="69" cy="72" r="4" fill="' + INK + '"/><circle cx="91" cy="72" r="4" fill="' + INK + '"/><path d="M61 63 l11 -3 M99 63 l-11 -3" fill="none"' + S(3.5) + "/>";
      case "stern": return '<circle cx="69" cy="72" r="4" fill="' + INK + '"/><circle cx="91" cy="72" r="4" fill="' + INK + '"/><path d="M60 61 l13 5 M100 61 l-13 5" fill="none"' + S(4) + "/>";
      default: return '<circle cx="69" cy="71" r="4.5" fill="' + INK + '"/><circle cx="91" cy="71" r="4.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m) {
    switch (m) {
      case "o": return '<circle cx="80" cy="88" r="4.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M72 88 h16" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M71 92 q9 -8 18 0" fill="none"' + S(4) + "/>";
      case "shout": return '<path d="M69 83 h22 q-1 13 -11 13 q-10 0 -11 -13 z" fill="' + INK + '"/>';
      default: return '<path d="M70 85 q10 9 20 0" fill="none"' + S(4) + "/>";
    }
  }
  function arm(x1, y1, x2, y2) {
    var d = ' d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"';
    return "<path" + d + ' fill="none"' + S(10) + "/><path" + d + ' fill="none" stroke="' + COAT + '" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="' + SKIN + '"' + S(3) + "/>";
  }
  function megaphone(x, y) {
    return '<g transform="translate(' + x + " " + y + ') rotate(-20)"><path d="M-2 -6 L-26 -16 L-26 16 L-2 6 Z" fill="#fff"' + S(3.5) + "/>" +
      '<rect x="-4" y="-7" width="10" height="14" rx="3" fill="' + HELMET + '"' + S(3) + "/>" +
      '<path d="M-32 -12 l-6 -4 M-33 0 h-7 M-32 12 l-6 4" fill="none"' + S(2.5) + "/></g>";
  }
  function extinguisher() {
    return '<rect x="128" y="146" width="22" height="44" rx="8" fill="' + HELMET + '"' + S(3.5) + "/>" +
      '<rect x="133" y="160" width="12" height="14" rx="2" fill="#fff"' + S(2) + "/>" +
      '<path d="M134 146 v-8 h10 v8 M144 140 q12 -2 12 12" fill="none"' + S(3) + "/>";
  }

  L.cast.marshal = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", pose = el.getAttribute("data-arms") || "down";
    var m = el.getAttribute("data-mouth") || (mood === "worried" || mood === "stern" ? "flat" : mood === "surprised" ? "o" : "smile");
    var prop = el.getAttribute("data-prop") || "none";
    var right, left;
    if (pose === "point") right = arm(108, 120, 146, 106);
    else if (pose === "stop") right = arm(108, 120, 126, 86) +
      '<path d="M118 84 v-14 q0 -4 4 -4 q3 0 3 4 v-4 q0 -4 4 -4 q3 0 3 4 v2 q0 -4 4 -4 q3 0 3 4 v16 q0 8 -10 8 q-11 0 -11 -8 z" fill="' + SKIN + '"' + S(3) + "/>";
    else if (pose === "cheer") right = arm(108, 120, 134, 84);
    else right = arm(108, 120, 122, 156);
    left = pose === "cheer" ? arm(52, 120, 26, 84) : arm(52, 120, 36, 156);
    return '<g class="bob">' +
      (prop === "extinguisher" ? extinguisher() : "") +
      /* boots and trousers */
      '<rect x="58" y="170" width="18" height="16" fill="#3B4A66"' + S(3) + '/><rect x="84" y="170" width="18" height="16" fill="#3B4A66"' + S(3) + "/>" +
      '<path d="M52 186 h26 v8 h-26 z M82 186 h26 v8 h-26 z" fill="' + BOOT + '"' + S(3) + "/>" +
      /* the coat with two reflective bands */
      '<path d="M46 176 L50 112 Q80 96 110 112 L114 176 Z" fill="' + COAT + '"' + S(4) + "/>" +
      '<path d="M48 146 H112 M47 160 H113" fill="none" stroke="' + INK + '" stroke-width="9"/><path d="M48 146 H112 M47 160 H113" fill="none" stroke="' + BAND + '" stroke-width="4"/>' +
      '<path d="M80 108 V176" fill="none"' + S(3) + '/><circle cx="74" cy="124" r="2.5" fill="' + INK + '"/><circle cx="74" cy="136" r="2.5" fill="' + INK + '"/>' +
      '<path d="M66 102 L80 114 L94 102" fill="#fff"' + S(3) + "/>" +
      /* head and helmet with brim and shield badge */
      '<circle cx="80" cy="76" r="25" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M54 64 Q54 30 80 30 Q106 30 106 64 Z" fill="' + HELMET + '"' + S(4) + "/>" +
      '<path d="M46 64 Q80 56 114 64 Q114 70 110 70 Q80 64 50 70 Q46 70 46 64 Z" fill="' + HELMET + '"' + S(3.5) + "/>" +
      '<path d="M80 36 V58" fill="none" stroke="#C23A30" stroke-width="5"/>' +
      '<path d="M71 40 h18 v8 q0 8 -9 11 q-9 -3 -9 -11 z" fill="' + COAT + '"' + S(3) + "/>" +
      '<g class="eyes">' + eyes(mood) + "</g>" + mouth(m) +
      left + right +
      (prop === "megaphone" ? megaphone(pose === "cheer" ? 26 : 36, pose === "cheer" ? 80 : 150) : "") +
      "</g>";
  } };
  /* Registered while the script loads, so the engine's own drawCast() at boot draws her with everyone else. */
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- parcel: Rust Result (data-state ok|err, data-label), promoted from rs-ch13.js (copied into rs-ch21) ----------------
   NOTE: Python ch17 and ch21 define a different `parcel` in their own extensions; those load after this file and win on their
   pages, so they are unaffected. New chapters: data-char="parcel" means this Result parcel. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch13.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(5) + "/>"; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#FFFFFF"' + S(3) + "/>"; }
  function foot(x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="12" ry="5.5" fill="' + INK + '"/>'; }

  L.cast.parcel = {
    vb: "0 0 180 196",
    draw: function (el) {
      var err = el.getAttribute("data-state") === "err";
      var lab = (el.getAttribute("data-label") || (err ? "Err" : "Ok")).slice(0, 10);
      var mood = el.getAttribute("data-mood") || (err ? "o" : "happy");
      var out = foot(60, 188) + foot(120, 188) + limb(60, 178, 60, 184) + limb(120, 178, 120, 184);
      // arms: up holding the contents high when Ok, one hand on the cheek when Err
      out += err ? limb(30, 130, 12, 118) + hand(11, 116) + limb(150, 130, 168, 146) + hand(169, 148)
                 : limb(30, 130, 12, 100) + hand(11, 98) + limb(150, 130, 168, 100) + hand(169, 98);
      var w = Math.min(150, Math.max(54, lab.length * 11 + 20));   // label at 17 units (12.3px at the default 130px), lbl-grow below
      if (err) {
        // a folded note sticking up out of the parcel, with a big exclamation mark and the label underneath
        out += '<g class="bob"><path d="M58 22 L128 14 L134 92 L64 98 Z" fill="#FFFFFF"' + S(3.5) + "/>" +
          '<path d="M64 40 L126 34" fill="none"' + S(2) + ' stroke-dasharray="5 4"/>' +
          '<text x="96" y="76" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="38" fill="#B00020" transform="rotate(-5 96 66)">!</text></g>';
      } else {
        // a wrapped present held up on a card
        out += '<g class="bob"><rect x="70" y="50" width="40" height="34" rx="4" fill="#7FB2FF"' + S(3) + "/>" +
          '<rect x="85" y="50" width="10" height="34" fill="#FFD60A"' + S(2.5) + "/>" +
          '<path d="M90 50 q-16 -16 -20 -2 q3 6 20 2 q16 -16 20 -2 q-3 6 -20 2 z" fill="#FFD60A"' + S(2.5) + "/></g>";
      }
      // open flaps
      out += '<path d="M30 98 L10 78 L64 78 L76 98 Z" fill="#D9B98C"' + S(3.5) + "/>" +
        '<path d="M150 98 L170 78 L116 78 L104 98 Z" fill="#D9B98C"' + S(3.5) + "/>" +
        '<path d="M30 98 L40 88 H140 L150 98 Z" fill="#2B2B2B"' + S(3) + "/>";
      // the box with tape across the front
      out += '<rect x="30" y="98" width="120" height="82" rx="5" fill="#E8D3B0"' + S(4) + "/>" +
        '<path d="M30 114 H150" stroke="#B9C7E3" stroke-width="10"/><path d="M30 109 H150 M30 119 H150" fill="none"' + S(1.5) + "/>";
      // the face
      out += '<g class="eyes">' + dot(64, 142, 5) + dot(116, 142, 5) + "</g>";
      if (mood === "o") out += '<ellipse cx="90" cy="163" rx="7" ry="8" fill="' + INK + '"/>';
      else if (mood === "sad") out += '<path d="M76 168 q14 -12 28 0" fill="none"' + S(4) + "/>";
      else out += '<path d="M74 157 q16 15 32 0" fill="none"' + S(4) + "/>";
      if (err) out += '<path d="M54 131 l12 4 M126 131 l-12 4" fill="none"' + S(3) + "/>";
 // the label, on the tape across the front
      out += '<rect x="' + (90 - w / 2) + '" y="102" width="' + w + '" height="24" rx="6" fill="' + (err ? "#FFE1E1" : "#C9F2D9") + '"' + S(3) + "/>" +
        '<text class="lbl-grow" data-fitw="138" data-cy="114" data-plate="150" x="90" y="120" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">' + esc(lab) + "</text>";
      return out;
    }
  };

  P.comic.ext(function () { L.drawCast(); });
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- pager (JavaScript async: data-state wait|buzz|no|never), promoted from js-ch16.js (copied into js-ch24 as pager24) ---------------- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch16.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  L.cast.pager = { vb: "0 0 160 170", draw: function (el) {
    var state = el.getAttribute("data-state") || "wait", label = el.getAttribute("data-label") || "7";
    var lit = state === "buzz", dashed = state === "never" || state === "no";
    var body = state === "never" ? "#F3F3F3" : state === "no" ? "#FFE1E1" : lit ? "#FFF6CC" : "#DDE8FF";
    var rim = dashed ? ' stroke="' + INK + '" stroke-width="4" stroke-dasharray="8 5"' : S(4);
    var out = '<g class="bob">';
    // buzz lines on both sides when the order is ready
    if (lit) out += '<path d="M10 52 l-8 6 l8 6 l-8 6 M10 92 l-8 6 l8 6 l-8 6 M150 52 l8 6 l-8 6 l8 6 M150 92 l8 6 l-8 6 l8 6" fill="none"' + S(3.5) + "/>";
    // the coaster body
    out += '<rect x="18" y="18" width="124" height="124" rx="26" fill="' + body + '"' + rim + "/>";
    // ring of lights
    for (var i = 0; i < 12; i++) {
      var a = (i / 12) * Math.PI * 2, x = 80 + Math.cos(a) * 50, y = 80 + Math.sin(a) * 50;
      out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5" fill="' + (lit ? "#FFD60A" : "#FFFFFF") + '"' + S(2.5) + "/>";
    }
    // the face
    out += '<g class="eyes">';
    if (lit) out += '<circle cx="66" cy="66" r="7" fill="#FFFFFF"' + S(3) + '/><circle cx="94" cy="66" r="7" fill="#FFFFFF"' + S(3) + '/><circle cx="66" cy="67" r="3.2" fill="' + INK + '"/><circle cx="94" cy="67" r="3.2" fill="' + INK + '"/>';
    else if (state === "no") out += '<path d="M60 60 l12 10 M72 60 l-12 10 M88 60 l12 10 M100 60 l-12 10" fill="none"' + S(3.5) + "/>";
    else out += '<path d="M59 67 q7 6 14 0 M87 67 q7 6 14 0" fill="none"' + S(3.5) + "/>";
    out += "</g>";
    // the screen with the state word
    var word = lit ? "BUZZ!" : state === "no" ? "SORRY" : state === "never" ? "..." : "WAIT";
    out += '<rect x="46" y="84" width="68" height="30" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
      '<text class="lbl-grow" data-fitw="62" x="80" y="107" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="22" letter-spacing="1" fill="' + INK + '">' + word + "</text>";   // the state in words: grows toward 12px when the pager is drawn small
    // the order-number tag: 20 units (16px at the default width; it was 16, under 12px below 120px wide). The tag widens
    // for longer numbers; when the pager is drawn small the number grows toward 12px (lbl-grow) and is squeezed to the tag.
    var tagW = Math.max(48, Math.min(64, (label.length + 1) * 12.4 + 12)), tagX = 152 - tagW;
    out += '<rect x="' + tagX + '" y="126" width="' + tagW + '" height="34" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
      '<text class="lbl-grow" data-fitw="' + (tagW - 8) + '" x="' + (tagX + tagW / 2) + '" y="150" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="20" fill="' + INK + '"' + ((label.length + 1) * 12.4 > tagW - 8 ? ' textLength="' + (tagW - 8) + '" lengthAdjust="spacingAndGlyphs"' : "") + '>#' + esc(label) + "</text>";
    // a cobweb for the order that never comes
    if (state === "never") out += '<path d="M18 46 Q34 40 46 18 M18 30 Q26 28 30 18 M18 46 L38 26 M24 18 L30 36" fill="none" stroke="' + INK + '" stroke-width="1.8"/>';
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- inspector: the Rust book's hard-hat Inspector (PASS/FAIL stamp), promoted from rs-ch14.js (copied into rs-ch16, rs-ch24) ----------------
   NOTE: Python ch21 (mypy inspector) and C++ ch18 (Inspector Pike) define different `inspector` drawings in their own
   extensions; those load after this file and win on their pages. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (inspector) loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  /* ======================= 1. the Inspector ======================= */
  C.inspector = { vb: "0 0 180 210", draw: function (el) {
    var stamp = el.getAttribute("data-stamp") || "none", mood = el.getAttribute("data-mood") || "normal";
    var label = (el.getAttribute("data-label") || "TEST").slice(0, 6);
    var eyes = mood === "happy" ? '<path d="M68 92 q6 -8 12 0 M96 92 q6 -8 12 0" fill="none"' + S(4) + "/>"
      : '<circle cx="74" cy="92" r="5" fill="' + INK + '"/><circle cx="102" cy="92" r="5" fill="' + INK + '"/>';
    var brows = mood === "stern" ? '<path d="M64 78 l16 5 M112 78 l-16 5" fill="none"' + S(4) + "/>" : '<path d="M66 80 q8 -4 15 0 M95 80 q8 -4 15 0" fill="none"' + S(3) + "/>";
    var mouth = mood === "happy" ? '<path d="M76 110 q12 12 24 0" fill="#FFFFFF"' + S(4) + "/>"
      : mood === "stern" ? '<path d="M77 114 q11 -7 22 0" fill="none"' + S(4) + "/>"
      : '<path d="M78 112 h20" fill="none"' + S(4) + "/>";
    var out = '<g class="bob">' +
      // legs and boots
      '<rect x="70" y="176" width="15" height="18" rx="3" fill="#3D4B5C"' + S(3) + '/><rect x="94" y="176" width="15" height="18" rx="3" fill="#3D4B5C"' + S(3) + "/>" +
      '<path d="M64 194 h24 v8 h-26 z M92 194 h24 l2 8 h-26 z" fill="#5A3A1E"' + S(3) + "/>" +
      // body: shirt and orange safety vest with reflective stripes
      '<path d="M54 134 q35 -12 72 0 l6 46 h-84 z" fill="#7FB2FF"' + S(4) + "/>" +
      '<path d="M58 136 q14 -6 22 -6 l-2 50 h-26 z M122 136 q-14 -6 -22 -6 l2 50 h26 z" fill="#FF9F43"' + S(3.5) + "/>" +
      '<path d="M57 158 h21 M102 158 h21" fill="none" stroke="#FFFFFF" stroke-width="5"/><path d="M57 154 h21 M57 162 h21 M102 154 h21 M102 162 h21" fill="none"' + S(1.5) + "/>" +
      // left arm holding the clipboard
      '<path d="M58 142 L38 160" fill="none"' + S(9) + '/><path d="M58 142 L38 160" fill="none" stroke="#7FB2FF" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="10" y="132" width="42" height="54" rx="4" fill="#B97A45"' + S(3.5) + '/><rect x="15" y="140" width="32" height="42" fill="#FFFFFF"' + S(2) + "/>" +
      '<rect x="23" y="128" width="16" height="8" rx="2" fill="#7A8794"' + S(2) + "/>" +
      '<path d="M18 149 l3 3 l5 -6 M18 161 l3 3 l5 -6 M18 173 l3 3 l5 -6" fill="none"' + S(2.2) + "/>" +
      '<path d="M30 149 h12 M30 161 h12 M30 173 h12" fill="none"' + S(2) + "/>" +
      '<circle cx="40" cy="162" r="7" fill="#E8B48A"' + S(3) + "/>";
    // right arm raised with the stamp
    out += '<path d="M122 142 L146 118" fill="none"' + S(9) + '/><path d="M122 142 L146 118" fill="none" stroke="#7FB2FF" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="148" cy="114" r="7" fill="#E8B48A"' + S(3) + "/>" +
      '<rect x="142" y="86" width="12" height="22" rx="4" fill="#8B5A2B"' + S(3) + '/><ellipse cx="148" cy="84" rx="10" ry="6" fill="#8B5A2B"' + S(3) + "/>";
    if (stamp === "pass" || stamp === "fail") {
      var word = stamp === "pass" ? "PASS" : "FAIL";
      out += '<g transform="rotate(-8 152 60)"><rect x="118" y="44" width="62" height="32" rx="4" fill="#FFFFFF"' + S(3) + (stamp === "fail" ? ' stroke-dasharray="6 4"' : "") + "/>" +
        '<text class="lbl-grow" data-fitw="56" x="149" y="67" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="21" letter-spacing="1" fill="' + INK + '">' + word + "</text></g>" +
        (stamp === "pass" ? '<path d="M124 30 l6 6 l12 -14" fill="none"' + S(4) + "/>" : '<path d="M124 22 l14 14 M138 22 l-14 14" fill="none"' + S(4) + "/>");
    } else {
      out += '<rect x="138" y="108" width="20" height="8" rx="2" fill="#2B2B2B"/>';
    }
    // head, face and hard hat
    out += '<circle cx="88" cy="96" r="32" fill="#E8B48A"' + S(4) + "/>" +
      '<g class="eyes">' + eyes + "</g>" + brows + mouth +
      '<path d="M86 100 q-3 6 2 7" fill="none"' + S(2.5) + "/>" +
      '<path d="M52 76 q36 -50 72 0 z" fill="#FFD60A"' + S(4) + "/>" +
      '<path d="M44 76 h88 q4 8 -4 10 h-80 q-8 -2 -4 -10 z" fill="#FFD60A"' + S(4) + "/>" +
      '<path d="M88 34 v42" fill="none"' + S(3) + "/>" +
      /* Hat label at 17 units (12.3px at the default 130px width; it was 12, 8.7px); hidden below 12px (.lbl-deco). */
      '<rect x="' + (88 - Math.max(24, label.length * 5.3 + 7)) + '" y="53" width="' + Math.max(48, label.length * 10.6 + 14) + '" height="22" rx="4" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<text class="lbl-deco" x="88" y="70" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">' + esc(label) + "</text>";
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- kitchenhand: Go goroutine kitchen helper (data-label number), promoted from go-ch24.js (copied into go-ch25, go-ch26) ---------------- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (kitchenhand) loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  L.cast.kitchenhand = { vb: "0 0 120 150", draw: function (el) {
    var st = el.getAttribute("data-state") || "idle", lab = String(el.getAttribute("data-label") || "1").slice(0, 3);
    var BODY = "#F7C59F", out = '<g class="bob">';
    // feet
    out += '<ellipse cx="44" cy="141" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="76" cy="141" rx="13" ry="6" fill="' + INK + '"/>';
    // round body
    out += '<path d="M60 40 C92 40 104 70 104 98 C104 124 86 138 60 138 C34 138 16 124 16 98 C16 70 28 40 60 40 Z" fill="' + BODY + '"' + S(4) + "/>";
    // apron with number badge. The badge is drawn last when the helper is busy (on the front of the pot), so the pot no
    // longer hides the number (go ch24 drew 96px helpers with HTML names to work around it). When the helper is drawn
    // small the number grows toward 12px (lbl-grow) and is squeezed to the badge.
    function badge(cy) {
      return '<circle cx="60" cy="' + cy + '" r="13" fill="#FFD60A"' + S(3) + "/>" +
        '<text class="lbl-grow" data-fitw="22" x="60" y="' + (cy + 6) + '" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="' + (lab.length > 2 ? 13 : 17) + '" fill="' + INK + '">' + esc(lab) + "</text>";
    }
    out += '<path d="M36 92 H84 V128 Q60 136 36 128 Z" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<path d="M40 92 Q60 82 80 92" fill="none"' + S(3) + "/>" + (st === "busy" ? "" : badge(110));
    // chef's hat
    out += '<path d="M40 44 Q30 26 44 20 Q50 6 62 12 Q76 4 82 20 Q94 26 80 44 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M40 44 H80" fill="none"' + S(4) + "/>";
    // face
    out += '<g class="eyes">' + dot(48, 64, 4.5) + dot(72, 64, 4.5) + "</g>" +
      '<path d="M50 76 q10 9 20 0" fill="none"' + S(3.5) + "/>" +
      '<circle cx="40" cy="74" r="4" fill="#FF9C8E"/><circle cx="80" cy="74" r="4" fill="#FF9C8E"/>';
    if (st === "busy") {
      // a little pot in front, a spoon stirring
      out += '<path d="M22 96 Q14 106 30 112 M98 96 Q106 106 92 112" fill="none"' + S(6) + "/>" +
        '<path d="M26 112 H94 V128 Q60 140 26 128 Z" fill="#9AA3AE"' + S(4) + "/>" +
        '<path d="M70 86 L82 114" fill="none"' + S(5) + "/>" +
        '<path d="M44 104 q4 -8 0 -14 M56 102 q4 -8 0 -14" fill="none"' + S(2.5) + "/>" + badge(121);
    } else if (st === "done") {
      // both arms up holding a plate with a tick
      out += '<path d="M20 90 Q8 70 22 52 M100 90 Q112 70 98 52" fill="none"' + S(6) + "/>" +
        '<ellipse cx="60" cy="40" rx="42" ry="9" fill="#FFFFFF"' + S(4) + "/>" +
        '<path d="M46 38 l10 8 18 -16" fill="none" stroke="#1B5E20" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      out += '<path d="M20 90 Q10 104 20 116 M100 90 Q110 104 100 116" fill="none"' + S(6) + "/>";
    }
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- umpire: Juno the test referee (JavaScript testing), promoted from js-ch14.js (redrawn in js-ch27 as juno27) ---------------- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (umpire) loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  function face(mood, cx, cy) {
    var e, m;
    if (mood === "happy") { e = '<path d="M' + (cx - 16) + " " + (cy - 2) + " q6 -8 12 0 M" + (cx + 4) + " " + (cy - 2) + ' q6 -8 12 0" fill="none"' + S(4) + "/>"; m = '<path d="M' + (cx - 11) + " " + (cy + 13) + ' q11 10 22 0" fill="none"' + S(4) + "/>"; }
    else if (mood === "surprised") { e = '<circle cx="' + (cx - 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx + 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx - 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/>'; m = '<circle cx="' + cx + '" cy="' + (cy + 16) + '" r="5" fill="' + INK + '"/>'; }
    else if (mood === "worried") { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><path d="M' + (cx - 18) + " " + (cy - 10) + " l11 -3 M" + (cx + 18) + " " + (cy - 10) + ' l-11 -3" fill="none"' + S(3) + "/>"; m = '<path d="M' + (cx - 10) + " " + (cy + 18) + ' q10 -8 20 0" fill="none"' + S(4) + "/>"; }
    else if (mood === "focus") { e = '<path d="M' + (cx - 16) + " " + cy + " h11 M" + (cx + 5) + " " + cy + ' h11" fill="none"' + S(4.5) + '/><path d="M' + (cx - 17) + " " + (cy - 9) + " l11 3 M" + (cx + 17) + " " + (cy - 9) + ' l-11 3" fill="none"' + S(3) + "/>"; m = '<path d="M' + (cx - 8) + " " + (cy + 15) + ' h16" fill="none"' + S(4) + "/>"; }
    else { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/>'; m = '<path d="M' + (cx - 9) + " " + (cy + 14) + ' q9 6 18 0" fill="none"' + S(3.5) + "/>"; }
    return '<g class="eyes">' + e + "</g>" + m;
  }

  /* ---------------- Juno, the test referee ---------------- */
  L.cast.umpire = { vb: "0 0 180 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", card = el.getAttribute("data-card") || "green";
    var stripes = "";
    for (var x = 50; x < 108; x += 12) stripes += '<path d="M' + x + ' 106 V156" fill="none" stroke="' + INK + '" stroke-width="6"/>';
    var cardArt = "";
    if (card === "green") cardArt = '<g transform="rotate(8 150 52)"><rect x="126" y="22" width="48" height="62" rx="5" fill="#C9F2D9"' + S(3.5) + '/>' +
      '<path d="M138 50 l8 9 l16 -20" fill="none"' + S(5) + '/><text class="lbl-grow" data-fitw="40" x="150" y="78" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="16" fill="' + INK + '">PASS</text></g>';
    else if (card === "red") cardArt = '<g transform="rotate(8 150 52)"><rect x="126" y="22" width="48" height="62" rx="5" fill="#FFE1E1" stroke="' + INK + '" stroke-width="3.5" stroke-dasharray="7 4"/>' +
      '<path d="M140 36 l20 22 M160 36 l-20 22" fill="none"' + S(5) + '/><text class="lbl-grow" data-fitw="40" x="150" y="78" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="16" fill="' + INK + '">FAIL</text></g>';
    var right = card === "none"
      ? '<path d="M110 118 Q124 132 120 150" fill="none"' + S(6) + '/><circle cx="120" cy="152" r="6.5" fill="#E9B48A"' + S(3) + "/>"
      : '<path d="M110 116 Q128 104 138 84" fill="none"' + S(6) + '/><circle cx="139" cy="82" r="6.5" fill="#E9B48A"' + S(3) + "/>";
    return '<g class="bob">' +
      /* legs, shoes */
      '<rect x="58" y="152" width="16" height="26" rx="3" fill="' + INK + '"/><rect x="84" y="152" width="16" height="26" rx="3" fill="' + INK + '"/>' +
      '<ellipse cx="64" cy="182" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="94" cy="182" rx="14" ry="6" fill="' + INK + '"/>' +
      /* striped shirt */
      '<path d="M42 158 L48 110 Q79 98 110 110 L116 158 Z" fill="#FFFFFF"' + S(4) + "/>" + stripes +
      '<path d="M42 158 L48 110 Q79 98 110 110 L116 158 Z" fill="none"' + S(4) + "/>" +
      /* whistle on a cord */
      '<path d="M68 106 Q79 126 90 106" fill="none"' + S(2) + '/><rect x="74" y="122" width="15" height="8" rx="3" fill="#FFD60A"' + S(2.5) + "/>" +
      /* left arm holds the rulebook card */
      '<path d="M48 118 Q30 128 30 142" fill="none"' + S(6) + "/>" +
      '<rect x="6" y="128" width="40" height="30" rx="3" fill="#FFF6CC"' + S(3) + '/><path d="M12 137 h28 M12 144 h22 M12 151 h26" fill="none"' + S(2) + "/>" +
      '<circle cx="30" cy="144" r="6.5" fill="#E9B48A"' + S(3) + "/>" +
      right + cardArt +
      /* head: hair, cap with a peak */
      '<circle cx="79" cy="74" r="28" fill="#E9B48A"' + S(4) + "/>" +
      '<path d="M53 80 q-6 14 6 22 M105 80 q6 14 -6 22" fill="none" stroke="#5A3B2E" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M52 66 Q54 42 79 42 Q104 42 106 66 Z" fill="#0B3FA8"' + S(3.5) + '/><path d="M100 64 H124" fill="none"' + S(6) + "/>" +
      '<circle cx="79" cy="44" r="3.5" fill="' + INK + '"/>' +
      face(mood, 79, 78) + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- trailguide: the Rust Trail Guide hiker standing in for clippy (data-sign SHORTCUT/CLIFF), promoted from rs-ch15.js (copied into rs-ch28) ---------------- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch15.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2, w) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(w || 7) + ' stroke-linecap="round"/>'; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7.5" fill="#E9B98E"' + S(3) + "/>"; }

  L.cast.trailguide = {
    vb: function (el) { return el.getAttribute("data-sign") ? "-70 0 230 200" : "0 0 160 200"; },
    draw: function (el) {
      var mood = el.getAttribute("data-mood") || "happy", arms = el.getAttribute("data-arms") || "point";
      var sign = (el.getAttribute("data-sign") || "").slice(0, 9), out = "";
      if (sign) {
        var cliff = /cliff/i.test(sign);
        out += '<path d="M-38 196 V98" fill="none"' + S(5) + "/>" +
          '<path d="M-66 64 H-4 L8 82 L-4 100 H-66 Z" fill="' + (cliff ? "#FFE1E1" : "#FFF6CC") + '"' + S(3.5) + (cliff ? ' stroke-dasharray="7 4"' : "") + "/>" +
          // 23 units: 13px at the default width (was 15-18, 8.5-10.2px); a long word is squeezed onto the board
          '<text class="lbl-grow" data-fitw="60" x="-32" y="90" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="23" letter-spacing="1"' + (sign.length * 0.5 * 23 > 60 ? ' textLength="60" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + INK + '">' + esc(sign) + "</text>";
      }
      out += '<g class="bob">';
      // walking stick in the left hand
      out += '<path d="M22 196 L34 104" fill="none" stroke="#7A4A1E" stroke-width="6" stroke-linecap="round"/><path d="M22 196 L34 104" fill="none"' + S(1.5) + "/>";
      // boots and legs (khaki shorts)
      out += limb(62, 168, 60, 186, 8) + limb(96, 168, 98, 186, 8) +
        '<path d="M48 186 h22 v8 h-26 z M88 186 h22 l4 8 h-26 z" fill="#5A3A1A"' + S(3) + "/>" +
        '<path d="M50 140 h58 l4 32 h-24 l-8 -16 l-8 16 h-26 z" fill="#D9C08C"' + S(3.5) + "/>";
      // shirt and vest
      out += '<path d="M46 92 q33 -14 66 0 l4 52 h-74 z" fill="#FFFFFF"' + S(4) + "/>" +
        '<path d="M46 92 q10 -5 22 -7 l4 59 h-30 z M112 92 q-10 -5 -22 -7 l-4 59 h30 z" fill="#8EE6A8"' + S(3.5) + "/>" +
        '<path d="M58 106 h10 v10 h-10 z M90 106 h10 v10 h-10 z" fill="none"' + S(2.5) + "/>";
      // compass on a cord
      out += '<path d="M66 86 q13 22 26 0" fill="none"' + S(2) + '/><circle cx="79" cy="112" r="11" fill="#FFF6CC"' + S(3) + "/>" +
        '<path d="M79 103 l4 9 l-4 9 l-4 -9 z" fill="#FF5A4E"' + S(1.5) + "/>";   // no "N": at 8 units it drew at 4-6px
      // arms
      out += limb(48, 98, 34, 120) + hand(34, 122);
      if (arms === "down") out += limb(110, 98, 124, 132) + hand(125, 134);
      else if (arms === "wave") out += '<g class="wave">' + limb(110, 98, 136, 66) + hand(138, 63) + "</g>";
      else if (arms === "stop") out += limb(110, 98, 138, 92) + '<path d="M136 80 q10 -2 12 8 v14 q-2 8 -12 6 z" fill="#E9B98E"' + S(3) + "/>";
      else out += limb(110, 98, 140, 78) + hand(142, 76) + '<path d="M146 72 l12 -6" fill="none"' + S(4) + ' stroke-linecap="round"/>';
      // neck, neckerchief, head
      out += '<path d="M64 84 l15 14 l15 -14 z" fill="#FF5A4E"' + S(3) + "/>" +
        '<circle cx="79" cy="58" r="26" fill="#E9B98E"' + S(4) + "/>";
      // face
      var eyes = mood === "worried" ? '<path d="M64 52 l8 4 M94 52 l-8 4" fill="none"' + S(3) + "/>" + dot(69, 60, 3.6) + dot(89, 60, 3.6)
        : dot(69, 58, 3.8) + dot(89, 58, 3.8);
      var mouth = mood === "focus" ? '<path d="M71 72 h16" fill="none"' + S(3.5) + "/>"
        : mood === "worried" ? '<ellipse cx="79" cy="73" rx="5" ry="6" fill="' + INK + '"/>'
          : '<path d="M69 69 q10 10 20 0" fill="none"' + S(3.5) + "/>";
      out += '<g class="eyes">' + eyes + "</g>" + mouth + '<path d="M60 66 q-4 4 0 8 M98 66 q4 4 0 8" fill="none" stroke="#C98A6A" stroke-width="2"/>';
      // wide-brimmed hat with a band
      out += '<path d="M38 42 q41 -14 82 0 q-4 7 -41 7 q-37 0 -41 -7 z" fill="#C9A26B"' + S(3.5) + "/>" +
        '<path d="M58 40 q2 -26 21 -26 q19 0 21 26 z" fill="#C9A26B"' + S(3.5) + "/>" +
        '<path d="M58.5 34 q20.5 6 41 0 l0.5 6 q-21 6 -42 0 z" fill="#7A4A1E"' + S(2) + "/>";
      return out + "</g>";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- linecook (Rust threads: a line cook, data-variant a|b|c|d, data-label badge, data-pose
   work|wait|ticket|knife|cheer) and asyncwaiter (Rust async: the one waiter, data-pose tray|run|frozen|note|cheer,
   data-label badge), promoted in engine pass 3 from rs-ch26.js and rs-ch27.js (rust ch29 copied both). The badges are
   text.lbl-deco: hidden under 12px; the lane title or caption names the character in words. ---------------- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (linecook) loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  function limb(x1, y1, x2, y2, skin) {
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(9) + '/><path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="8" fill="' + skin + '"' + S(3) + "/>";
  }


  /* the line cook */
  var SCARF = { a: "#7FB2FF", b: "#FFD60A", c: "#C9F2D9", d: "#FFE1E1" }, SKIN = { a: "#F3C9A1", b: "#C68E5F", c: "#E8B38A", d: "#8D5A3B" };
  var BADGE = { a: "ANA", b: "BEN", c: "CY", d: "DEV" };
  L.cast.linecook = { vb: "0 0 170 210", draw: function (el) {
    var v = el.getAttribute("data-variant") || "a", scarf = SCARF[v] || SCARF.a, skin = SKIN[v] || SKIN.a;
    var pose = el.getAttribute("data-pose") || "work", label = (el.getAttribute("data-label") || BADGE[v] || "ANA").slice(0, 5);
    var out = '<g class="bob">';
    // legs and clogs
    out += '<path d="M66 168 L63 196 M94 168 L97 196" fill="none"' + S(10) + '/><path d="M66 168 L63 196 M94 168 L97 196" fill="none" stroke="#2B2B2B" stroke-width="5" stroke-linecap="round"/>' +
      '<ellipse cx="58" cy="200" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="102" cy="200" rx="14" ry="6" fill="' + INK + '"/>';
    // white jacket, apron, badge
    out += '<path d="M44 172 L50 112 q30 -14 60 0 L116 172 z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M56 132 h48 l6 42 h-60 z" fill="' + scarf + '"' + S(3.5) + "/>" +
      '<circle cx="70" cy="122" r="3" fill="' + INK + '"/><circle cx="90" cy="122" r="3" fill="' + INK + '"/>' +
      '<rect x="56" y="140" width="48" height="21" rx="3" fill="#FFFFFF"' + S(2.5) + "/>" +
      // badge text at 16 units (12.2px at the default 130px width); hidden as decoration by comic.js fitLabels() when the
      // cook is drawn so small it would be under 12px (the lane title or caption always names the cook in words)
      '<text class="lbl-deco" x="80" y="156" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16"' + (label.length > 4 ? ' textLength="44" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + INK + '">' + esc(label) + "</text>";
    // head, neckerchief, tall hat
    out += '<path d="M64 104 l16 10 l16 -10 l-4 10 l-12 6 l-12 -6 z" fill="' + scarf + '"' + S(3) + "/>" +
      '<circle cx="80" cy="80" r="25" fill="' + skin + '"' + S(4) + "/>" +
      '<g class="eyes"><circle cx="71" cy="80" r="3.5" fill="' + INK + '"/><circle cx="89" cy="80" r="3.5" fill="' + INK + '"/></g>' +
      (pose === "wait" ? '<path d="M72 93 h16" fill="none"' + S(3.5) + "/>" : '<path d="M70 90 q10 9 20 0" fill="none"' + S(3.5) + "/>") +
      '<rect x="56" y="48" width="48" height="14" rx="2" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M58 50 q-20 -6 -14 -24 q6 -14 22 -8 q4 -14 14 -14 q12 0 16 14 q16 -6 22 8 q6 18 -14 24 z" fill="#FFFFFF"' + S(4) + "/>";
    // arms and props
    if (pose === "wait") {
      out += '<path d="M54 120 q26 20 52 0" fill="none"' + S(9) + '/><path d="M54 120 q26 20 52 0" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>' +
        '<circle cx="54" cy="122" r="7" fill="' + skin + '"' + S(3) + '/><circle cx="106" cy="122" r="7" fill="' + skin + '"' + S(3) + "/>" +
        '<rect x="112" y="40" width="50" height="28" rx="12" fill="#FFFFFF"' + S(3) + '/><path d="M118 66 l-8 10 l14 -8" fill="#FFFFFF"' + S(3) + "/>" +
        '<text class="lbl-grow" data-fitw="40" data-cy="54" x="137" y="60" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="20" letter-spacing="2" fill="' + INK + '">...</text>';
    } else if (pose === "ticket") {
      out += limb(52, 118, 32, 150, skin) + limb(108, 118, 136, 90, skin) +
        '<path d="M126 52 h30 v40 l-5 -4 l-5 4 l-5 -4 l-5 4 l-5 -4 l-5 4 z" fill="#FFF6CC"' + S(3) + "/>" +
        '<path d="M132 62 h18 M132 70 h12 M132 78 h16" fill="none"' + S(2.5) + "/>";
    } else if (pose === "knife") {
      out += limb(52, 118, 32, 150, skin) + limb(108, 118, 134, 96, skin) +
        '<path d="M138 92 l18 -40 q4 -6 6 2 l-12 42 z" fill="#DDE8FF"' + S(3) + '/><rect x="128" y="90" width="12" height="20" rx="3" transform="rotate(20 134 100)" fill="#2B2B2B"' + S(2.5) + "/>";
    } else if (pose === "cheer") {
      out += limb(52, 118, 26, 84, skin) + limb(108, 118, 134, 84, skin);
    } else { // work: a frying pan
      out += limb(52, 118, 32, 150, skin) + limb(108, 118, 132, 132, skin) +
        '<path d="M138 132 h24" fill="none"' + S(7) + '/><ellipse cx="128" cy="138" rx="26" ry="9" fill="#2B2B2B"' + S(3.5) + "/>" +
        '<path d="M118 120 q4 -8 0 -16 M130 118 q4 -8 0 -16" fill="none"' + S(2.5) + "/>";
    }
    return out + "</g>";
  } };

  /* the one waiter */
  L.cast.asyncwaiter = { vb: "0 0 180 220", draw: function (el) {
    var pose = el.getAttribute("data-pose") || "tray", label = (el.getAttribute("data-label") || "TOKIO").slice(0, 5), skin = "#D9A27A";
    var out = '<g class="bob">';
    if (pose === "run") out += '<path d="M8 104 h28 M4 128 h32 M12 152 h24" fill="none"' + S(3.5) + "/>";
    if (pose === "frozen") out += '<g fill="none"' + S(3) + '><path d="M18 40 l10 10 M28 40 l-10 10 M23 36 v18"/><path d="M152 30 l10 10 M162 30 l-10 10 M157 26 v18"/><path d="M160 120 l8 8 M168 120 l-8 8"/></g>';
    // legs and shoes
    out += '<path d="M70 176 L66 204 M100 176 L104 204" fill="none"' + S(10) + '/><path d="M70 176 L66 204 M100 176 L104 204" fill="none" stroke="#2B2B2B" stroke-width="5" stroke-linecap="round"/>' +
      '<ellipse cx="61" cy="208" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="109" cy="208" rx="14" ry="6" fill="' + INK + '"/>';
    // shirt, waistcoat, long apron, badge
    out += '<path d="M52 178 L56 110 q29 -13 58 0 L118 178 z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M56 112 q29 -11 58 0 L112 146 L85 154 L58 146 z" fill="#B5D3FF"' + S(3.5) + "/>" +
      '<path d="M85 114 v40" fill="none"' + S(2.5) + '/><circle cx="85" cy="128" r="2.5" fill="' + INK + '"/><circle cx="85" cy="140" r="2.5" fill="' + INK + '"/>' +
      '<path d="M60 150 h50 l8 44 h-66 z" fill="#FFF6CC"' + S(3.5) + "/>" +
      // name badge on the apron, 17 units (12.3px at the default 130px width); hidden as decoration by comic.js
      // fitLabels() when the waiter is drawn so small it would be under 12px (the bubble or caption names him in words)
      '<rect x="58" y="160" width="54" height="22" rx="3" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<text class="lbl-deco" x="85" y="177" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17"' + (label.length > 4 ? ' textLength="48" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + INK + '">' + esc(label) + "</text>";
    // head, hair, bow tie
    out += '<circle cx="85" cy="70" r="27" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M58 64 q2 -32 28 -30 q26 2 26 28 q-8 -12 -24 -14 q-18 0 -30 16 z" fill="#5A3A22"' + S(3) + "/>" +
      (pose === "frozen"
        ? '<g class="eyes"><path d="M70 70 h9 M91 70 h9" fill="none"' + S(4) + '/></g><path d="M76 84 h18" fill="none"' + S(3.5) + "/>"
        : '<g class="eyes"><circle cx="75" cy="70" r="3.6" fill="' + INK + '"/><circle cx="95" cy="70" r="3.6" fill="' + INK + '"/></g>' +
          '<path d="M75 81 q10 9 20 0" fill="none"' + S(3.5) + "/>") +
      '<path d="M73 102 l12 6 l12 -6 v12 l-12 -6 l-12 6 z" fill="' + INK + '"/>';
    // arms and props
    if (pose === "tray" || pose === "run") {
      out += limb(58, 116, 40, 152, skin) + limb(112, 116, 142, 84, skin) +
        '<ellipse cx="144" cy="76" rx="32" ry="6" fill="#DDE8FF"' + S(3.5) + "/>" +
        '<path d="M122 72 q22 -32 44 0 z" fill="#FFFFFF"' + S(3.5) + '/><circle cx="144" cy="46" r="4" fill="#FFFFFF"' + S(3) + "/>";
    } else if (pose === "frozen") {
      out += limb(58, 116, 52, 166, skin) + limb(112, 116, 118, 166, skin) +
        '<path d="M60 26 q4 -10 10 0 M80 20 q4 -10 10 0 M100 26 q4 -10 10 0" fill="none"' + S(3) + "/>";
    } else if (pose === "note") {
      out += limb(58, 116, 72, 150, skin) + limb(112, 116, 120, 140, skin) +
        '<rect x="62" y="132" width="42" height="34" rx="3" fill="#FFFFFF"' + S(3.5) + '/><path d="M68 142 h28 M68 150 h22 M68 158 h26" fill="none"' + S(2.5) + "/>" +
        '<path d="M118 128 l14 -22" fill="none"' + S(5) + "/>";
    } else { // cheer
      out += limb(58, 116, 34, 76, skin) + limb(112, 116, 136, 76, skin);
    }
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);

/* ---------------- cookiecutter (a class: a star cutter, data-label on the handle, <= 7 characters, lbl-grow; data-size="small" = a child
   cutter with a yellow handle, for subclasses) and cookie (an
   instance: data-label iced on it, <= 6 characters; data-icing pink|mint|sky|yellow|cream), promoted in engine pass 3
   from py-ch15.js and py-ch19.js (ch19 added data-size and the growing name; ch20 copied the cookie). Named cookiecutter because Rust ch17 has a different `cutter`. --- */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-critters.js (cookiecutter) loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function star(cx, cy, ro, ri) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? ri : ro;
      pts.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
    }
    return pts.join(" ");
  }
  var ICING = { pink: "#FFB8C9", mint: "#C9F2D9", sky: "#DDE8FF", yellow: "#FFD60A", cream: "#FFF6CC" };

  /* ---------------- the cookie cutter: a class ---------------- */
  C.cookiecutter = { vb: "0 0 170 180", draw: function (el) {
    var label = (el.getAttribute("data-label") || "class").slice(0, 7);
    var handle = el.getAttribute("data-size") === "small" ? "#FFD60A" : "#FF9F43";
    return '<g class="bob">' +
      '<rect x="45" y="6" width="80" height="34" rx="12" fill="' + handle + '"' + S(4) + "/>" +
      '<text class="lbl-grow" data-fitw="74" x="85" y="30" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (label.length > 5 ? 15 : 18) + '" fill="' + INK + '">' + esc(label) + "</text>" +
      '<path d="M70 40 v12 M100 40 v12" fill="none"' + S(5) + "/>" +
      '<polygon points="' + star(85, 112, 66, 30) + '" fill="#FFFFFF" stroke="#7A8794" stroke-width="12" stroke-linejoin="round"/>' +
      '<polygon points="' + star(85, 112, 66, 30) + '" fill="none"' + S(3.5) + "/>" +
      '<polygon points="' + star(85, 112, 54, 22) + '" fill="#FFFFFF"' + S(2.5) + ' stroke-dasharray="6 5"/>' +
      '<g class="eyes">' + dot(74, 106, 4.5) + dot(96, 106, 4.5) + "</g>" +
      '<path d="M76 122 q9 8 18 0" fill="none"' + S(3.5) + "/></g>";
  } };

  /* ---------------- a cookie: an instance with its own icing ---------------- */
  C.cookie = { vb: "0 0 140 150", draw: function (el) {
    var label = (el.getAttribute("data-label") || "").slice(0, 6), icing = ICING[el.getAttribute("data-icing")] || ICING.pink;
    var out = '<g class="bob">' +
      '<polygon points="' + star(70, 76, 66, 32) + '" fill="#E3B98F"' + S(4) + "/>" +
      '<polygon points="' + star(70, 76, 50, 24) + '" fill="' + icing + '"' + S(2.5) + "/>" +
      '<circle cx="48" cy="58" r="3" fill="' + INK + '"/><circle cx="94" cy="62" r="3" fill="' + INK + '"/><circle cx="70" cy="44" r="3" fill="' + INK + '"/>' +
      '<g class="eyes">' + dot(60, 72, 4) + dot(80, 72, 4) + "</g>" +
      '<path d="M63 84 q7 6 14 0" fill="none"' + S(3) + "/>";
    if (label) out += '<rect x="' + (70 - label.length * 6 - 8) + '" y="96" width="' + (label.length * 12 + 16) + '" height="24" rx="6" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<text class="lbl-grow" data-fitw="' + (label.length * 12 + 10) + '" x="70" y="114" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16" fill="' + INK + '">' + esc(label) + "</text>";   // grows toward 12px when the cookie is drawn small
    return out + "</g>";
  } };

  /* the empty string: the train's engine with one dashed, empty carriage (Python ch4, copied in ch21). JavaScript ch5 has
     its own drawing under the same name (a dashed track and ""), which its extension registers for that page. */
  C.emptytrain = { vb: "0 0 116 110", draw: function () {
    var S = L.stroke, INK = "#111111";
    return '<g class="bob"><rect x="4" y="34" width="56" height="58" rx="8" fill="#FF5A4E"' + S(4) + '/><rect x="14" y="16" width="20" height="22" fill="#FF5A4E"' + S(4) + '/>' +
      '<rect x="16" y="46" width="30" height="22" rx="4" fill="#fff"' + S(3) + '/><circle cx="25" cy="55" r="2.6" fill="' + INK + '"/><circle cx="37" cy="55" r="2.6" fill="' + INK + '"/><path d="M25 64 q6 -5 12 0" fill="none"' + S(3) + '/>' +
      '<rect x="72" y="40" width="34" height="52" rx="6" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<circle cx="20" cy="96" r="6" fill="' + INK + '"/><circle cx="46" cy="96" r="6" fill="' + INK + '"/></g>';
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
