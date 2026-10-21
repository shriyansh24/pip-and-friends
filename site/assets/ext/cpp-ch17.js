/* C++ book, chapter 17 extension: "Head Chefs and Examiners".
   Adds no widget that claims output: every terminal, walker, map, machine and exercise on the page reads the captured
   runs in data/cpp-ch17.js through the engine. It adds three cast members:
     - Cam the planner (data-char="planner"): the face of CMake. A green waistcoat, a pencil behind the ear, and a stack
       of recipe cards. Cam reads your menu (CMakeLists.txt) and writes a card for every station (the build files).
     - The head chef (data-char="headchef"): the face of the build tool that reads Cam's cards and shouts the orders,
       Make or Ninja. A tall chef's hat whose band carries data-label ("make" by default, "ninja"), a white double-breasted
       jacket and a red neckerchief.
     - Dot the examiner (data-char="examiner"): the face of the test framework. A flat cap, round glasses, a blazer and a
       clipboard with a checklist; each line on it is one test.
   Shared attributes:
       data-mood  = happy | surprised | focus | worried | stern | normal
       data-mouth = smile | o | flat | frown | shout (default follows the mood)
       data-arms  = down (default) | point (right arm out) | cheer (both arms up)
   Extra: headchef data-label (hat band text, at most 6 characters); examiner data-verdict = pass | fail (a large tick or
   cross on the clipboard instead of the checklist). Drawings are aria-hidden by the engine; the page gives every picture
   that carries meaning a .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch17.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, INK = "#111111", SKIN = "#E9B98E", SKIN2 = "#C98E62";

  function eyes(mood, y) {
    y = y || 72;
    switch (mood) {
      case "happy": return '<path d="M63 ' + y + ' q6 -8 12 0 M85 ' + y + ' q6 -8 12 0" fill="none"' + S(4) + "/>";
      case "surprised": return '<circle cx="69" cy="' + (y - 1) + '" r="6.5" fill="#fff"' + S(3) + '/><circle cx="91" cy="' + (y - 1) + '" r="6.5" fill="#fff"' + S(3) + "/>" +
        '<circle cx="69" cy="' + y + '" r="2.8" fill="' + INK + '"/><circle cx="91" cy="' + y + '" r="2.8" fill="' + INK + '"/>';
      case "focus": return '<path d="M62 ' + (y - 1) + ' h13 M85 ' + (y - 1) + ' h13" fill="none"' + S(5) + '/><path d="M61 ' + (y - 9) + ' l13 3 M99 ' + (y - 9) + ' l-13 3" fill="none"' + S(3) + "/>";
      case "worried": return '<circle cx="69" cy="' + y + '" r="4" fill="' + INK + '"/><circle cx="91" cy="' + y + '" r="4" fill="' + INK + '"/><path d="M61 ' + (y - 9) + ' l11 -3 M99 ' + (y - 9) + ' l-11 -3" fill="none"' + S(3.5) + "/>";
      case "stern": return '<circle cx="69" cy="' + y + '" r="4" fill="' + INK + '"/><circle cx="91" cy="' + y + '" r="4" fill="' + INK + '"/><path d="M60 ' + (y - 11) + ' l13 5 M100 ' + (y - 11) + ' l-13 5" fill="none"' + S(4) + "/>";
      default: return '<circle cx="69" cy="' + (y - 1) + '" r="4.5" fill="' + INK + '"/><circle cx="91" cy="' + (y - 1) + '" r="4.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m, y) {
    y = y || 88;
    switch (m) {
      case "o": return '<circle cx="80" cy="' + y + '" r="4.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M72 ' + y + ' h16" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M71 ' + (y + 4) + ' q9 -8 18 0" fill="none"' + S(4) + "/>";
      case "shout": return '<path d="M69 ' + (y - 5) + ' h22 q-1 13 -11 13 q-10 0 -11 -13 z" fill="' + INK + '"/>';
      default: return '<path d="M70 ' + (y - 3) + ' q10 9 20 0" fill="none"' + S(4) + "/>";
    }
  }
  function moodMouth(el) {
    var mood = el.getAttribute("data-mood") || "normal";
    return { mood: mood, mouth: el.getAttribute("data-mouth") || (mood === "worried" || mood === "stern" ? "flat" : mood === "surprised" ? "o" : "smile") };
  }
  function arm(x1, y1, x2, y2, sleeve, skin) {
    var d = ' d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"';
    return "<path" + d + ' fill="none"' + S(10) + "/><path" + d + ' fill="none" stroke="' + sleeve + '" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="' + (skin || SKIN) + '"' + S(3) + "/>";
  }
  function legs(trouser, shoe) {
    return '<rect x="58" y="170" width="18" height="16" fill="' + trouser + '"' + S(3) + '/><rect x="84" y="170" width="18" height="16" fill="' + trouser + '"' + S(3) + "/>" +
      '<path d="M52 186 h26 v8 h-26 z M82 186 h26 v8 h-26 z" fill="' + shoe + '"' + S(3) + "/>";
  }
  function arms(el, sleeve, skin, leftHolds) {
    var pose = el.getAttribute("data-arms") || "down";
    var right = pose === "point" ? arm(108, 120, 146, 106, sleeve, skin) : pose === "cheer" ? arm(108, 120, 134, 84, sleeve, skin) : arm(108, 120, 122, 156, sleeve, skin);
    var left = pose === "cheer" ? arm(52, 120, 26, 84, sleeve, skin) : leftHolds ? arm(52, 120, 40, 146, sleeve, skin) : arm(52, 120, 36, 156, sleeve, skin);
    return { pose: pose, right: right, left: left };
  }

  /* ---------------- Cam the planner (CMake) ---------------- */
  L.cast.planner = { vb: "0 0 160 200", draw: function (el) {
    var f = moodMouth(el), a = arms(el, "#3E8E5E", SKIN2, true);
    var cards = a.pose === "cheer" ? "" :
      '<g transform="translate(12 128) rotate(-8)"><rect x="0" y="0" width="46" height="34" rx="4" fill="#FFF6CC"' + S(3) + '/><rect x="4" y="-6" width="46" height="34" rx="4" fill="#fff"' + S(3) + "/>" +
      '<path d="M11 4 h30 M11 12 h24 M11 20 h28" fill="none"' + S(2.5) + "/></g>";
    return '<g class="bob">' + legs("#5A4632", "#2B2B2B") +
      '<path d="M46 176 L50 112 Q80 96 110 112 L114 176 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M56 108 L62 176 H98 L104 108 Q80 120 56 108 Z" fill="#7BC89A"' + S(4) + "/>" +
      '<circle cx="80" cy="132" r="2.8" fill="' + INK + '"/><circle cx="80" cy="146" r="2.8" fill="' + INK + '"/><circle cx="80" cy="160" r="2.8" fill="' + INK + '"/>' +
      '<rect x="88" y="124" width="12" height="9" rx="2" fill="#fff"' + S(2.5) + "/>" +
      '<circle cx="80" cy="76" r="25" fill="' + SKIN2 + '"' + S(4) + "/>" +
      '<path d="M55 72 Q52 44 80 44 Q108 44 105 72 Q100 56 80 56 Q60 56 55 72 Z" fill="#2B2B2B"' + S(3.5) + "/>" +
      '<g transform="translate(104 52) rotate(28)"><rect x="-3" y="-16" width="7" height="30" fill="#FFD60A"' + S(2.5) + '/><path d="M-3 14 L0.5 22 L4 14 Z" fill="#E9B98E"' + S(2) + "/></g>" +
      '<g class="eyes">' + eyes(f.mood) + "</g>" + mouth(f.mouth) +
      a.left + a.right + cards + "</g>";
  } };

  /* ---------------- the head chef (Make or Ninja) ---------------- */
  L.cast.headchef = { vb: "0 0 160 210", draw: function (el) {
    var f = moodMouth(el), a = arms(el, "#FFFFFF", SKIN, false);
    var label = (el.getAttribute("data-label") || "make").slice(0, 6), ninja = label === "ninja";
    var ticket = a.pose === "point" ? '<g transform="translate(140 84) rotate(12)"><rect x="0" y="0" width="22" height="30" rx="2" fill="#FFF6CC"' + S(2.5) + '/><path d="M4 8 h14 M4 15 h10 M4 22 h13" fill="none"' + S(2) + "/></g>" : "";
    return '<g class="bob" transform="translate(0 10)">' + legs("#2B2B2B", "#111111") +
      '<path d="M46 176 L50 112 Q80 96 110 112 L114 176 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M64 106 L92 176" fill="none"' + S(3) + "/>" +
      '<circle cx="70" cy="128" r="3" fill="' + INK + '"/><circle cx="74" cy="144" r="3" fill="' + INK + '"/><circle cx="92" cy="128" r="3" fill="' + INK + '"/><circle cx="96" cy="144" r="3" fill="' + INK + '"/>' +
      '<path d="M64 102 L80 116 L96 102 Q80 108 64 102 Z" fill="' + (ninja ? "#2B2B2B" : "#FF5A4E") + '"' + S(3) + "/>" +
      '<circle cx="80" cy="76" r="25" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M57 58 Q44 40 58 28 Q62 10 80 14 Q98 10 102 28 Q116 40 103 58 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<rect x="44" y="44" width="72" height="26" rx="4" fill="' + (ninja ? "#2B2B2B" : "#FFFFFF") + '"' + S(3.5) + "/>" +
      /* 21 units: 12.6px at .sm (96px), 17px at the default 130px; labels longer than 5 letters are squeezed into the band */
      '<text x="80" y="64" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="21"' + (label.length > 5 ? ' textLength="64" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + (ninja ? "#FFFFFF" : INK) + '">' + L.esc(label) + "</text>" +
      '<path d="M66 30 q4 6 0 11 M94 30 q-4 6 0 11" fill="none"' + S(2.5) + "/>" +
      '<g class="eyes">' + eyes(f.mood, 78) + "</g>" + mouth(f.mouth, 92) +
      '<path d="M70 86 q-8 -2 -10 2 M90 86 q8 -2 10 2" fill="none"' + S(3) + "/>" +
      a.left + a.right + ticket + "</g>";
  } };

  /* ---------------- Dot the examiner (the test framework) ---------------- */
  L.cast.examiner = { vb: "0 0 160 200", draw: function (el) {
    var f = moodMouth(el), a = arms(el, "#33507A", SKIN, true), verdict = el.getAttribute("data-verdict");
    var marks = verdict === "pass" ? '<path d="M16 150 l8 9 l16 -20" fill="none" stroke="#1B5E20" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' :
      verdict === "fail" ? '<path d="M17 136 l20 22 M37 136 l-20 22" fill="none" stroke="#B00020" stroke-width="6" stroke-linecap="round"/>' :
      '<path d="M14 137 l3 4 l6 -7 M14 149 l3 4 l6 -7 M14 161 l4 -6 M14 155 l4 6" fill="none"' + S(2.2) + '/><path d="M27 138 h14 M27 150 h14 M27 159 h12" fill="none"' + S(2.2) + "/>";
    var board = a.pose === "cheer" ? "" : '<rect x="8" y="126" width="40" height="44" rx="4" fill="#E7C08A"' + S(3) + '/><rect x="11" y="130" width="34" height="37" rx="2" fill="#fff"' + S(2) + '/><rect x="20" y="122" width="16" height="7" rx="2" fill="#B9C7E3"' + S(2.5) + "/>" + marks;
    return '<g class="bob">' + legs("#3B3B3B", "#5A3A22") +
      '<path d="M46 176 L50 112 Q80 96 110 112 L114 176 Z" fill="#33507A"' + S(4) + "/>" +
      '<path d="M66 104 L80 132 L94 104 Q80 110 66 104 Z" fill="#FFFFFF"' + S(3) + '/><path d="M80 114 L76 130 L80 138 L84 130 Z" fill="#FFD60A"' + S(2.5) + "/>" +
      '<path d="M88 140 h14 v8 h-14 z" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<circle cx="80" cy="76" r="25" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M54 64 Q56 40 80 40 Q104 40 106 64 Z" fill="#8A6D4B"' + S(4) + '/><path d="M54 62 Q86 54 122 62 Q122 68 116 68 Q86 62 54 68 Z" fill="#8A6D4B"' + S(3.5) + "/>" +
      '<circle cx="69" cy="72" r="9" fill="#fff" fill-opacity="0.35"' + S(3) + '/><circle cx="91" cy="72" r="9" fill="#fff" fill-opacity="0.35"' + S(3) + '/><path d="M78 72 h4" fill="none"' + S(3) + "/>" +
      '<g class="eyes">' + eyes(f.mood) + "</g>" + mouth(f.mouth, 91) +
      a.left + a.right + board + "</g>";
  } };
  /* Registered while the script loads, so the engine's own drawCast() at boot draws them with everyone else. */
})(typeof globalThis !== "undefined" ? globalThis : this);
