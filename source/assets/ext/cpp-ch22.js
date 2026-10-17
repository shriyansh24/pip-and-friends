/* C++ book, chapter 22 extension: "Key Cards, Moving Day".
   Adds one cast member and nothing that claims output (every terminal, walk, map, memory picture and machine on the
   page is an engine widget checked against data/cpp-ch22.js).
     - Basil the concierge (cast member "concierge"): runs the front desk of the Hotel Ferrum and stands for RAII.
       Burgundy jacket with gold buttons, a pillbox hat, a bow tie and a neat moustache.
       data-mood  = normal | happy | focus | surprised | worried
       data-mouth = smile | o | flat | frown | shout (default follows the mood)
       data-arms  = down (default) | point | wave | cheer
       data-prop  = card (default: a key card) | bell (a desk bell) | none
   The engine marks drawings aria-hidden; the page gives every picture that carries meaning a .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch22.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, INK = "#111111";
  var SKIN = "#E8B48A", JACKET = "#9B2C3A", GOLD = "#FFC94A", SHIRT = "#FFFFFF", TROUSER = "#2E2A3A", HAIR = "#5A3A22";

  function eyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M63 72 q6 -8 12 0 M85 72 q6 -8 12 0" fill="none"' + S(4) + "/>";
      case "surprised": return '<circle cx="69" cy="71" r="6.5" fill="#fff"' + S(3) + '/><circle cx="91" cy="71" r="6.5" fill="#fff"' + S(3) + "/>" +
        '<circle cx="69" cy="72" r="2.8" fill="' + INK + '"/><circle cx="91" cy="72" r="2.8" fill="' + INK + '"/>';
      case "focus": return '<path d="M62 71 h13 M85 71 h13" fill="none"' + S(5) + '/><path d="M61 62 l13 3 M99 62 l-13 3" fill="none"' + S(3) + "/>";
      case "worried": return '<circle cx="69" cy="72" r="4.5" fill="' + INK + '"/><circle cx="91" cy="72" r="4.5" fill="' + INK + '"/><path d="M60 64 l12 -4 M100 64 l-12 -4" fill="none"' + S(3) + "/>";
      default: return '<circle cx="69" cy="71" r="4.5" fill="' + INK + '"/><circle cx="91" cy="71" r="4.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m) {
    switch (m) {
      case "o": return '<circle cx="80" cy="93" r="4.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M72 93 h16" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M71 97 q9 -8 18 0" fill="none"' + S(4) + "/>";
      case "shout": return '<path d="M69 89 h22 q-1 13 -11 13 q-10 0 -11 -13 z" fill="' + INK + '"/>';
      default: return '<path d="M71 91 q9 8 18 0" fill="none"' + S(4) + "/>";
    }
  }
  function arm(x1, y1, x2, y2) {
    var d = ' d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"';
    return "<path" + d + ' fill="none"' + S(11) + "/><path" + d + ' fill="none" stroke="' + JACKET + '" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="#FFFFFF"' + S(3) + "/>";   // white gloves
  }
  function card(x, y) {
    return '<g transform="translate(' + x + " " + y + ') rotate(-12)"><rect x="-17" y="-11" width="34" height="22" rx="4" fill="' + GOLD + '"' + S(3) + "/>" +
      '<rect x="-12" y="-6" width="9" height="7" rx="1.5" fill="#FFFFFF"' + S(2) + '/><path d="M2 -3 h10 M2 3 h10" fill="none"' + S(2) + "/></g>";
  }
  function bell(x, y) {
    return '<g transform="translate(' + x + " " + y + ')"><path d="M-15 6 q0 -20 15 -20 q15 0 15 20 z" fill="' + GOLD + '"' + S(3) + "/>" +
      '<rect x="-19" y="6" width="38" height="6" rx="2" fill="' + GOLD + '"' + S(3) + '/><circle cx="0" cy="-17" r="3.5" fill="' + GOLD + '"' + S(2.5) + "/></g>";
  }
  L.cast.concierge = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", pose = el.getAttribute("data-arms") || "down";
    var m = el.getAttribute("data-mouth") || (mood === "surprised" ? "o" : mood === "worried" ? "frown" : mood === "focus" ? "flat" : "smile");
    var prop = el.getAttribute("data-prop") || "card";
    var right, left, held = "", hx, hy;
    if (pose === "point") { right = arm(108, 122, 148, 106); hx = 150; hy = 98; }
    else if (pose === "wave") { right = arm(108, 122, 136, 82); hx = 136; hy = 72; }
    else if (pose === "cheer") { right = arm(108, 122, 134, 84); hx = 134; hy = 72; }
    else { right = arm(108, 122, 120, 152); hx = 124; hy = 160; }
    left = pose === "cheer" ? arm(52, 122, 26, 84) : arm(52, 122, 36, 150);
    if (prop === "card") held = card(hx, hy);
    else if (prop === "bell") held = bell(pose === "cheer" ? 26 : 36, pose === "cheer" ? 70 : 168);
    return '<g class="bob">' +
      /* legs and shoes */
      '<rect x="60" y="172" width="16" height="14" fill="' + TROUSER + '"' + S(3) + '/><rect x="84" y="172" width="16" height="14" fill="' + TROUSER + '"' + S(3) + "/>" +
      '<path d="M54 186 h24 v8 h-24 z M82 186 h24 v8 h-24 z" fill="' + INK + '"' + S(3) + "/>" +
      /* jacket with tails, white shirt front, bow tie, gold buttons */
      '<path d="M46 180 L52 112 Q80 100 108 112 L114 180 L96 176 L80 182 L64 176 Z" fill="' + JACKET + '"' + S(4) + "/>" +
      '<path d="M70 108 L80 150 L90 108 Z" fill="' + SHIRT + '"' + S(3) + "/>" +
      '<path d="M70 112 l10 6 l-10 6 z M90 112 l-10 6 l10 6 z" fill="' + INK + '"' + S(2) + '/><circle cx="80" cy="118" r="3" fill="' + INK + '"/>' +
      '<circle cx="80" cy="160" r="3.5" fill="' + GOLD + '"' + S(2) + '/><circle cx="80" cy="171" r="3.5" fill="' + GOLD + '"' + S(2) + "/>" +
      '<path d="M58 130 q8 -3 12 4" fill="none" stroke="' + GOLD + '" stroke-width="3" stroke-linecap="round"/>' +
      /* head, side hair, moustache */
      '<circle cx="80" cy="78" r="25" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M56 74 q-2 -14 6 -20 M104 74 q2 -14 -6 -20" fill="none" stroke="' + HAIR + '" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M68 85 q6 -5 12 0 q6 -5 12 0 q-6 4 -12 1 q-6 3 -12 -1 z" fill="' + HAIR + '"' + S(2) + "/>" +
      /* pillbox hat with a gold band */
      '<path d="M60 56 L62 34 Q80 28 98 34 L100 56 Q80 60 60 56 Z" fill="' + JACKET + '"' + S(4) + "/>" +
      '<path d="M61 48 Q80 52 99 48" fill="none" stroke="' + INK + '" stroke-width="8"/><path d="M61 48 Q80 52 99 48" fill="none" stroke="' + GOLD + '" stroke-width="4"/>' +
      '<g class="eyes">' + eyes(mood) + "</g>" + mouth(m) +
      left + right + held +
      "</g>";
  } };
  /* Registered while the script loads, so the engine's own drawCast() at boot draws Basil with everyone else. */
})(typeof globalThis !== "undefined" ? globalThis : this);
