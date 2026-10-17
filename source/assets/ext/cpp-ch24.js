/* C++ book, chapter 24 extension: "Remotes and Packed Lunches".
   Adds one cast member and nothing that claims output (every terminal, walk, map, tracer, memory picture and machine on
   the page is an engine widget checked against data/cpp-ch24.js).
     - Zap, the universal remote (cast member "uniremote"): one PLAY button that every device understands in its own
       way. Stands for a base-class interface and virtual dispatch. A charcoal remote with a little screen for a face,
       a big yellow PLAY button, a keypad, an infrared bulb on top, thin arms in white gloves and red sneakers.
       data-mood  = normal | happy | focus | surprised | worried
       data-mouth = smile | o | flat | frown | shout (default follows the mood)
       data-arms  = down (default) | point | wave | cheer
       data-beam  = on: draw the infrared signal leaving the bulb
   The engine marks drawings aria-hidden; the page gives every picture that carries meaning a .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch24.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, INK = "#111111";
  var BODY = "#3A3F4B", SCREEN = "#DDE8FF", PLAY = "#FFD60A", PINK = "#FFE1EC", MINT = "#C9F2D9", SHOE = "#D94848";

  function eyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M66 64 q6 -8 12 0 M84 64 q6 -8 12 0" fill="none"' + S(4) + "/>";
      case "surprised": return '<circle cx="72" cy="63" r="6.5" fill="#fff"' + S(3) + '/><circle cx="90" cy="63" r="6.5" fill="#fff"' + S(3) + "/>" +
        '<circle cx="72" cy="64" r="2.8" fill="' + INK + '"/><circle cx="90" cy="64" r="2.8" fill="' + INK + '"/>';
      case "focus": return '<path d="M66 63 h12 M84 63 h12" fill="none"' + S(5) + '/><path d="M65 55 l12 3 M97 55 l-12 3" fill="none"' + S(3) + "/>";
      case "worried": return '<circle cx="72" cy="64" r="4.5" fill="' + INK + '"/><circle cx="90" cy="64" r="4.5" fill="' + INK + '"/><path d="M64 57 l11 -4 M98 57 l-11 -4" fill="none"' + S(3) + "/>";
      default: return '<circle cx="72" cy="63" r="4.5" fill="' + INK + '"/><circle cx="90" cy="63" r="4.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m) {
    switch (m) {
      case "o": return '<circle cx="81" cy="78" r="4" fill="' + INK + '"/>';
      case "flat": return '<path d="M74 78 h14" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M73 82 q8 -7 16 0" fill="none"' + S(4) + "/>";
      case "shout": return '<path d="M71 74 h20 q-1 11 -10 11 q-9 0 -10 -11 z" fill="' + INK + '"/>';
      default: return '<path d="M73 76 q8 7 16 0" fill="none"' + S(4) + "/>";
    }
  }
  function arm(x1, y1, x2, y2) {
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(5) + "/>" +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="#FFFFFF"' + S(3) + "/>";
  }
  L.cast.uniremote = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", pose = el.getAttribute("data-arms") || "down";
    var m = el.getAttribute("data-mouth") || (mood === "surprised" ? "o" : mood === "worried" ? "frown" : mood === "focus" ? "flat" : "smile");
    var beam = el.getAttribute("data-beam") === "on";
    var right, left;
    if (pose === "point") right = arm(114, 112, 148, 96);
    else if (pose === "wave") right = arm(114, 112, 138, 74);
    else if (pose === "cheer") right = arm(114, 112, 136, 76);
    else right = arm(114, 112, 128, 146);
    left = pose === "cheer" ? arm(48, 112, 24, 76) : arm(48, 112, 32, 146);
    var keys = "";
    for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++)
      keys += '<rect x="' + (62 + c * 14) + '" y="' + (150 + r * 12) + '" width="10" height="8" rx="2" fill="#FFFFFF"' + S(2) + "/>";
    return '<g class="bob">' +
      (beam ? '<path d="M70 18 q11 -10 22 0 M64 10 q17 -15 34 0" fill="none"' + S(3) + "/>" : "") +
      /* sneakers */
      '<path d="M54 186 h22 v8 h-26 z M86 186 h22 l4 8 h-26 z" fill="' + SHOE + '"' + S(3) + "/>" +
      /* body */
      '<rect x="48" y="34" width="66" height="156" rx="18" fill="' + BODY + '"' + S(4) + "/>" +
      /* infrared bulb */
      '<path d="M72 34 q0 -12 9 -12 q9 0 9 12 z" fill="' + PINK + '"' + S(3) + "/>" +
      /* screen face */
      '<rect x="58" y="46" width="46" height="46" rx="10" fill="' + SCREEN + '"' + S(3) + "/>" +
      '<g class="eyes">' + eyes(mood) + "</g>" + mouth(m) +
      /* big PLAY button with a triangle */
      '<circle cx="81" cy="116" r="15" fill="' + PLAY + '"' + S(3) + '/><path d="M76 108 l12 8 l-12 8 z" fill="' + INK + '"/>' +
      /* two small buttons and a keypad */
      '<circle cx="62" cy="138" r="5" fill="' + MINT + '"' + S(2) + '/><circle cx="100" cy="138" r="5" fill="' + PINK + '"' + S(2) + "/>" +
      keys + left + right + "</g>";
  } };
  /* Registered while the script loads, so the engine's own drawCast() at boot draws Zap with everyone else. */
})(typeof globalThis !== "undefined" ? globalThis : this);
