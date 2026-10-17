/* C++ book, chapter 26 extension: "Cookie Cutters and Bouncers".
   Adds three cast members and nothing that claims output (every terminal, walk, map, tracer and machine on the page is
   an engine widget checked against data/cpp-ch26.js).
     - "tincutter": Tin, a gingerbread-shaped tin cookie cutter with a little face and a handle. Stands for a TEMPLATE:
       a pattern, not a cookie. A name plate under it shows data-label (default "template").
       data-mood = normal | happy | surprised | worried
     - "typecookie": one baked cookie stamped from Tin. Stands for an INSTANTIATION; its icing banner shows the type
       it was stamped for, data-label (e.g. "int", "double"). data-state="burnt" draws it cracked and grey (a failed
       instantiation).
     - "idabouncer": Ida, the club bouncer with a guest list. Stands for a CONCEPT checking a type at the door.
       data-mood  = normal | happy | stern | surprised
       data-arms  = down (default) | stop (palm out: not on the list) | wave (come in) | point
       data-label = the list's heading, e.g. "integral" (default "GUEST LIST")
       data-rope  = open | closed: draw the velvet rope beside her, unhooked or hooked
   Names were grepped in assets/ and assets/ext/ first: none of them is used elsewhere.
   The engine marks drawings aria-hidden; the page gives every picture that carries meaning a .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch26.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, INK = "#111111";
  var TIN = "#DDE3EA", TIN2 = "#B9C3CF", DOUGH = "#E8C49A", ICING = "#FFFFFF", PINK = "#FFE1EC", MINT = "#C9F2D9";
  var SUIT = "#2B2F38", SKIN = "#C68A5E", BRASS = "#E2B33C", ROPE = "#D94848", PAPER = "#FFFFFF", CREAM = "#FFF6CC";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fitSize(text, maxW, big, small) {
    // monospace-ish estimate: 0.62em per character
    var n = Math.max(1, String(text).length), s = big;
    while (s > small && n * s * 0.66 > maxW) s -= 1;
    return s;
  }
  /* the gingerbread outline, centred on x=cx, top of head at y=top, scale k */
  function person(cx, top, k) {
    function p(x, y) { return (cx + x * k).toFixed(1) + " " + (top + y * k).toFixed(1); }
    return "M" + p(-14, 30) + " C" + p(-30, 28) + " " + p(-30, -2) + " " + p(0, -2) + " C" + p(30, -2) + " " + p(30, 28) + " " + p(14, 30) +
      " L" + p(44, 34) + " C" + p(58, 36) + " " + p(58, 56) + " " + p(44, 58) + " L" + p(20, 58) +
      " L" + p(32, 100) + " C" + p(36, 114) + " " + p(18, 120) + " " + p(12, 106) + " L" + p(0, 80) +
      " L" + p(-12, 106) + " C" + p(-18, 120) + " " + p(-36, 114) + " " + p(-32, 100) + " L" + p(-20, 58) +
      " L" + p(-44, 58) + " C" + p(-58, 56) + " " + p(-58, 36) + " " + p(-44, 34) + " Z";
  }
  function face(cx, cy, mood) {
    var eyes, mouth;
    if (mood === "happy") eyes = '<path d="M' + (cx - 11) + " " + cy + " q5 -7 10 0 M" + (cx + 1) + " " + cy + ' q5 -7 10 0" fill="none"' + S(3.5) + "/>";
    else if (mood === "surprised") eyes = '<circle cx="' + (cx - 6) + '" cy="' + cy + '" r="4.5" fill="#fff"' + S(2.5) + '/><circle cx="' + (cx + 6) + '" cy="' + cy + '" r="4.5" fill="#fff"' + S(2.5) + "/>" +
      '<circle cx="' + (cx - 6) + '" cy="' + cy + '" r="2" fill="' + INK + '"/><circle cx="' + (cx + 6) + '" cy="' + cy + '" r="2" fill="' + INK + '"/>';
    else if (mood === "worried") eyes = '<circle cx="' + (cx - 6) + '" cy="' + cy + '" r="3" fill="' + INK + '"/><circle cx="' + (cx + 6) + '" cy="' + cy + '" r="3" fill="' + INK + '"/>' +
      '<path d="M' + (cx - 12) + " " + (cy - 6) + " l8 -3 M" + (cx + 12) + " " + (cy - 6) + ' l-8 -3" fill="none"' + S(2.5) + "/>";
    else eyes = '<circle cx="' + (cx - 6) + '" cy="' + cy + '" r="3" fill="' + INK + '"/><circle cx="' + (cx + 6) + '" cy="' + cy + '" r="3" fill="' + INK + '"/>';
    if (mood === "surprised") mouth = '<circle cx="' + cx + '" cy="' + (cy + 11) + '" r="3.5" fill="' + INK + '"/>';
    else if (mood === "worried") mouth = '<path d="M' + (cx - 6) + " " + (cy + 14) + " q6 -6 12 0" + '" fill="none"' + S(3) + "/>";
    else mouth = '<path d="M' + (cx - 7) + " " + (cy + 9) + " q7 7 14 0" + '" fill="none"' + S(3) + "/>";
    return '<g class="eyes">' + eyes + "</g>" + mouth;
  }

  L.cast.tincutter = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", label = el.getAttribute("data-label") || "template";
    var fs = fitSize(label, 120, 17, 11);
    return '<g class="bob">' +
      /* handle strap over the head */
      '<path d="M62 22 q18 -18 36 0" fill="none"' + S(5) + "/>" + '<path d="M62 22 q18 -18 36 0" fill="none" stroke="' + TIN2 + '" stroke-width="2"/>' +
      /* the metal strip: a thick outline with a thin inner edge, empty inside (a cutter is not a cookie) */
      '<path d="' + person(80, 22, 1.18) + '" fill="#FFFFFF" fill-opacity="0.55" stroke="' + INK + '" stroke-width="11" stroke-linejoin="round"/>' +
      '<path d="' + person(80, 22, 1.18) + '" fill="none" stroke="' + TIN + '" stroke-width="6" stroke-linejoin="round"/>' +
      '<path d="' + person(80, 22, 1.18) + '" fill="none" stroke="' + TIN2 + '" stroke-width="1.5" stroke-dasharray="3 5"/>' +
      face(80, 48, mood) +
      /* name plate */
      '<rect x="14" y="166" width="132" height="28" rx="8" fill="' + CREAM + '"' + S(3) + "/>" +
      '<text x="80" y="' + (180 + fs * 0.35).toFixed(1) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" +
      "</g>";
  } };

  L.cast.typecookie = { vb: "0 0 130 170", draw: function (el) {
    var label = el.getAttribute("data-label") || "T", burnt = el.getAttribute("data-state") === "burnt";
    var fs = fitSize(label, 118, 18, 12);
    var dots = burnt ? "" : '<circle cx="59" cy="78" r="3.5" fill="' + ICING + '"' + S(1.5) + '/><circle cx="71" cy="78" r="3.5" fill="' + ICING + '"' + S(1.5) + "/>";
    return '<g class="bob">' +
      '<path d="' + person(65, 14, 1) + '" fill="' + (burnt ? "#B9B4AE" : DOUGH) + '"' + S(4) + "/>" +
      /* icing face */
      (burnt ? '<path d="M56 36 l6 6 M62 36 l-6 6 M68 36 l6 6 M74 36 l-6 6" fill="none"' + S(3) + '/><path d="M58 52 h14" fill="none"' + S(3) + "/>" +
               '<path d="M40 60 l14 14 l-6 8 l12 10" fill="none"' + S(2.5) + "/>"
             : '<circle cx="59" cy="38" r="3" fill="' + INK + '"/><circle cx="71" cy="38" r="3" fill="' + INK + '"/><path d="M58 47 q7 6 14 0" fill="none"' + S(3) + "/>") +
      dots +
      /* type banner across the tummy */
      '<rect x="3" y="96" width="124" height="28" rx="7" fill="' + (burnt ? PINK : MINT) + '"' + S(3) + "/>" +
      '<text x="65" y="' + (109 + fs * 0.35).toFixed(1) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" +
      "</g>";
  } };

  L.cast.idabouncer = { vb: "0 0 200 220", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", arms = el.getAttribute("data-arms") || "down";
    var label = el.getAttribute("data-label") || "GUEST LIST", rope = el.getAttribute("data-rope");
    var fs = fitSize(label, 88, 17, 13);
    var eyes, mouth, brows = "";
    if (mood === "happy") eyes = '<path d="M68 58 q5 -6 10 0 M88 58 q5 -6 10 0" fill="none"' + S(3.5) + "/>";
    else if (mood === "surprised") eyes = '<circle cx="73" cy="58" r="5" fill="#fff"' + S(2.5) + '/><circle cx="93" cy="58" r="5" fill="#fff"' + S(2.5) + '/><circle cx="73" cy="58" r="2.2" fill="' + INK + '"/><circle cx="93" cy="58" r="2.2" fill="' + INK + '"/>';
    else eyes = '<circle cx="73" cy="58" r="3.4" fill="' + INK + '"/><circle cx="93" cy="58" r="3.4" fill="' + INK + '"/>';
    if (mood === "stern") brows = '<path d="M65 49 l14 4 M101 49 l-14 4" fill="none"' + S(3.5) + "/>";
    if (mood === "happy") mouth = '<path d="M74 72 q9 8 18 0" fill="none"' + S(3.5) + "/>";
    else if (mood === "surprised") mouth = '<circle cx="83" cy="74" r="4" fill="' + INK + '"/>';
    else if (mood === "stern") mouth = '<path d="M75 75 h16" fill="none"' + S(4) + "/>";
    else mouth = '<path d="M76 73 q7 4 14 0" fill="none"' + S(3.5) + "/>";
    /* right arm (viewer's right) */
    var right;
    if (arms === "stop") right = '<path d="M122 104 L150 88" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/><path d="M122 104 L150 88" fill="none" stroke="' + SUIT + '" stroke-width="9" stroke-linecap="round"/>' +
      '<rect x="146" y="62" width="22" height="32" rx="9" fill="' + SKIN + '"' + S(3) + '/><path d="M151 64 v-8 M157 62 v-9 M163 64 v-8" fill="none"' + S(3) + "/>";
    else if (arms === "wave") right = '<path d="M122 104 L154 104 L168 120" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="M122 104 L154 104 L168 120" fill="none" stroke="' + SUIT + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="172" cy="126" r="9" fill="' + SKIN + '"' + S(3) + "/>";
    else if (arms === "point") right = '<path d="M122 104 L160 96" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/><path d="M122 104 L160 96" fill="none" stroke="' + SUIT + '" stroke-width="9" stroke-linecap="round"/>' +
      '<circle cx="164" cy="95" r="8" fill="' + SKIN + '"' + S(3) + '/><path d="M170 93 h12" fill="none"' + S(4) + "/>";
    else right = '<path d="M122 104 L132 150" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/><path d="M122 104 L132 150" fill="none" stroke="' + SUIT + '" stroke-width="9" stroke-linecap="round"/>' +
      '<circle cx="133" cy="156" r="8" fill="' + SKIN + '"' + S(3) + "/>";
    var ropeArt = "";
    if (rope === "open" || rope === "closed") {
      ropeArt = '<rect x="182" y="120" width="10" height="84" rx="3" fill="' + BRASS + '"' + S(3) + '/><circle cx="187" cy="116" r="8" fill="' + BRASS + '"' + S(3) + "/>" +
        '<rect x="174" y="202" width="26" height="10" rx="3" fill="' + BRASS + '"' + S(3) + "/>" +
        (rope === "closed" ? '<path d="M150 150 q18 26 34 -26" fill="none" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/><path d="M150 150 q18 26 34 -26" fill="none" stroke="' + ROPE + '" stroke-width="5" stroke-linecap="round"/>'
                           : '<path d="M187 124 q8 40 -4 70" fill="none" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/><path d="M187 124 q8 40 -4 70" fill="none" stroke="' + ROPE + '" stroke-width="5" stroke-linecap="round"/>');
    }
    return ropeArt + '<g class="bob">' +
      /* legs and shoes */
      '<path d="M62 176 v30 M102 176 v30" fill="none" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M62 176 v30 M102 176 v30" fill="none" stroke="' + SUIT + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M48 208 h26 v8 h-30 z M92 208 h26 l4 8 h-30 z" fill="' + INK + '"/>' +
      /* body: broad suit with a white shirt and tie */
      '<path d="M40 182 L44 104 q39 -22 78 0 L126 182 z" fill="' + SUIT + '"' + S(4) + "/>" +
      '<path d="M70 92 L83 128 L96 92 z" fill="' + PAPER + '"' + S(3) + '/><path d="M80 98 h6 l2 6 l-5 22 l-5 -22 z" fill="' + ROPE + '"' + S(2) + "/>" +
      /* neck and head */
      '<rect x="74" y="80" width="18" height="14" fill="' + SKIN + '"' + S(3) + "/>" +
      '<rect x="56" y="28" width="54" height="58" rx="22" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M56 46 q0 -22 27 -22 q27 0 27 22 q-8 -10 -27 -10 q-19 0 -27 10 z" fill="' + INK + '"/>' +
      /* earpiece with its curly wire */
      '<circle cx="111" cy="58" r="4.5" fill="' + PAPER + '"' + S(2.5) + '/><path d="M112 63 q6 10 0 16 q-6 6 2 12" fill="none"' + S(2) + "/>" +
      '<g class="eyes">' + eyes + "</g>" + brows + mouth +
      /* left arm holding the clipboard */
      '<path d="M44 106 L30 140" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/><path d="M44 106 L30 140" fill="none" stroke="' + SUIT + '" stroke-width="9" stroke-linecap="round"/>' +
      '<rect x="0" y="114" width="98" height="76" rx="5" fill="' + BRASS + '"' + S(3) + '/><rect x="4" y="122" width="90" height="64" fill="' + PAPER + '"' + S(2) + '/><rect x="38" y="109" width="22" height="9" rx="3" fill="' + TIN2 + '"' + S(2) + "/>" +
      '<text x="49" y="' + (140).toFixed(0) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" +
      '<path d="M14 156 h70 M14 166 h56 M14 176 h64" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' +
      right + "</g>";
  } };
  /* Registered while the script loads, so the engine's own drawCast() at boot draws them with everyone else. */
})(typeof globalThis !== "undefined" ? globalThis : this);
