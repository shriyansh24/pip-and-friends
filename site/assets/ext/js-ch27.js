/* JavaScript book, chapter 27 additions ("Simulators and Robot Arms"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch27.html. It only registers drawings with the engine's cast; every claim
   about output on the page comes from the engine's own widgets (terminals, maps, machine, walker, tracer, exercises).

   Characters (drawn in the house style; names carry the chapter number so they cannot collide):
     data-char="juno27"  Juno, the test referee (the shared "umpire" in comic-critters.js), holding a stopwatch for async
                         tests: the one pose the shared drawing lacks. For her PASS/FAIL cards use data-char="umpire"
                         data-card="green" | "red". data-mood = normal | happy | focus | worried | surprised.
     data-char="sim27"   The flight simulator: a cabin on hydraulic legs with a windscreen. data-state = "fly" (a plane on
                         the horizon, a SAFE lamp) | "crash" (the plane nose-down, a CRASH TEST stamp with a dashed edge and
                         a RESET button). The words are always drawn, so the state never rests on colour.
     data-char="robot27" Node as a workshop robot. A screen face, a name badge reading "process" with "exit N" under it
                         (data-code, default 0; the face smiles at 0 and frowns otherwise), a filing arm holding a folder
                         marked "fs", a phone arm marked "http", and a hose marked "stream" coiled at its feet.
                         data-arm = "fs" | "http" | "stream" | "badge" draws a thick dashed ring around that part
                         (shape, not colour, marks the highlight). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch27.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var T = 'font-family="Bangers, Impact, sans-serif"', M = 'font-family="JetBrains Mono, monospace" font-weight="800"', H = 'font-family="Shantell Sans, cursive" font-weight="700"';

  function face(mood, cx, cy) {
    var e, m;
    if (mood === "happy") { e = '<path d="M' + (cx - 16) + " " + (cy - 2) + " q6 -8 12 0 M" + (cx + 4) + " " + (cy - 2) + ' q6 -8 12 0" fill="none"' + S(4) + "/>"; m = '<path d="M' + (cx - 11) + " " + (cy + 13) + ' q11 10 22 0" fill="none"' + S(4) + "/>"; }
    else if (mood === "surprised") { e = '<circle cx="' + (cx - 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx + 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx - 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/>'; m = '<circle cx="' + cx + '" cy="' + (cy + 16) + '" r="5" fill="' + INK + '"/>'; }
    else if (mood === "worried") { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><path d="M' + (cx - 18) + " " + (cy - 10) + " l11 -3 M" + (cx + 18) + " " + (cy - 10) + ' l-11 -3" fill="none"' + S(3) + "/>"; m = '<path d="M' + (cx - 10) + " " + (cy + 18) + ' q10 -8 20 0" fill="none"' + S(4) + "/>"; }
    else if (mood === "focus") { e = '<path d="M' + (cx - 16) + " " + cy + " h11 M" + (cx + 5) + " " + cy + ' h11" fill="none"' + S(4.5) + '/><path d="M' + (cx - 17) + " " + (cy - 9) + " l11 3 M" + (cx + 17) + " " + (cy - 9) + ' l-11 3" fill="none"' + S(3) + "/>"; m = '<path d="M' + (cx - 8) + " " + (cy + 15) + ' h16" fill="none"' + S(4) + "/>"; }
    else { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/>'; m = '<path d="M' + (cx - 9) + " " + (cy + 14) + ' q9 6 18 0" fill="none"' + S(3.5) + "/>"; }
    return '<g class="eyes">' + e + "</g>" + m;
  }

  /* ---------------- Juno the referee, with a stopwatch ---------------- */
  L.cast.juno27 = { vb: "0 0 186 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal";
    var stripes = "";
    for (var x = 50; x < 108; x += 12) stripes += '<path d="M' + x + ' 106 V156" fill="none" stroke="' + INK + '" stroke-width="6"/>';
    var held = /* stopwatch: crown, button, face with ticks and a hand */
      '<rect x="146" y="22" width="12" height="9" rx="2" fill="#FFD60A"' + S(3) + '/><path d="M170 34 l7 -6" fill="none"' + S(4) + "/>" +
      '<circle cx="152" cy="58" r="26" fill="#FFFFFF"' + S(4) + '/><circle cx="152" cy="58" r="20" fill="#DDE8FF"' + S(2) + "/>" +
      '<path d="M152 40 v5 M170 58 h-5 M152 76 v-5 M134 58 h5" fill="none"' + S(3) + "/>" +
      '<path d="M152 58 L163 47" fill="none"' + S(4) + '/><circle cx="152" cy="58" r="3.5" fill="' + INK + '"/>';
    return '<g class="bob">' +
      '<rect x="58" y="152" width="16" height="26" rx="3" fill="' + INK + '"/><rect x="84" y="152" width="16" height="26" rx="3" fill="' + INK + '"/>' +
      '<ellipse cx="64" cy="182" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="94" cy="182" rx="14" ry="6" fill="' + INK + '"/>' +
      '<path d="M42 158 L48 110 Q79 98 110 110 L116 158 Z" fill="#FFFFFF"' + S(4) + "/>" + stripes +
      '<path d="M42 158 L48 110 Q79 98 110 110 L116 158 Z" fill="none"' + S(4) + "/>" +
      '<path d="M68 106 Q79 126 90 106" fill="none"' + S(2) + '/><rect x="74" y="122" width="15" height="8" rx="3" fill="#FFD60A"' + S(2.5) + "/>" +
      '<path d="M48 118 Q30 128 30 142" fill="none"' + S(6) + "/>" +
      '<rect x="6" y="128" width="40" height="30" rx="3" fill="#FFF6CC"' + S(3) + '/><path d="M12 137 h28 M12 144 h22 M12 151 h26" fill="none"' + S(2) + "/>" +
      '<circle cx="30" cy="144" r="6.5" fill="#E9B48A"' + S(3) + "/>" +
      '<path d="M110 116 Q128 104 138 86" fill="none"' + S(6) + '/><circle cx="139" cy="84" r="6.5" fill="#E9B48A"' + S(3) + "/>" + held +
      '<circle cx="79" cy="74" r="28" fill="#E9B48A"' + S(4) + "/>" +
      '<path d="M53 80 q-6 14 6 22 M105 80 q6 14 -6 22" fill="none" stroke="#5A3B2E" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M52 66 Q54 42 79 42 Q104 42 106 66 Z" fill="#0B3FA8"' + S(3.5) + '/><path d="M100 64 H124" fill="none"' + S(6) + "/>" +
      '<circle cx="79" cy="44" r="3.5" fill="' + INK + '"/>' +
      face(mood, 79, 78) + "</g>";
  } };

  /* ---------------- the flight simulator ---------------- */
  L.cast.sim27 = { vb: "0 0 260 210", draw: function (el) {
    var crash = el.getAttribute("data-state") === "crash";
    var out = "";
    /* hydraulic legs and the floor */
    out += '<path d="M14 202 H246" fill="none"' + S(4) + "/>";
    out += '<path d="M62 150 L46 200 M198 150 L214 200 M100 150 L96 200 M160 150 L164 200" fill="none"' + S(5) + "/>";
    out += '<rect x="40" y="168" width="14" height="18" rx="3" fill="#D9D9D9"' + S(3) + '/><rect x="206" y="168" width="14" height="18" rx="3" fill="#D9D9D9"' + S(3) + "/>";
    /* the cabin */
    out += '<path d="M30 150 Q22 70 70 40 Q130 10 190 40 Q238 70 230 150 Z" fill="#FFFFFF"' + S(4.5) + "/>";
    /* windscreen */
    out += '<path d="M58 118 Q56 76 90 58 Q130 42 170 58 Q204 76 202 118 Z" fill="#DDE8FF"' + S(4) + "/>";
    if (crash) {
      out += '<path d="M60 112 L200 84" fill="none"' + S(3) + '/><path d="M60 112 L200 84 L202 118 L58 118 Z" fill="#C9F2D9" stroke="none"/>';
      /* nose-down plane */
      out += '<g transform="rotate(38 130 82)"><path d="M104 82 h52 q8 0 8 4 q0 4 -8 4 h-52 z" fill="#FFFFFF"' + S(3) + '/><path d="M124 82 l-6 -16 h8 l12 16 M124 90 l-6 14 h8 l12 -14" fill="#FFFFFF"' + S(3) + "/></g>";
      out += '<path d="M168 70 l10 -6 M172 80 l12 0 M168 90 l10 6" fill="none"' + S(3) + "/>";
      /* the stamp */
      out += '<g transform="rotate(-8 130 136)"><rect x="70" y="122" width="120" height="30" rx="6" fill="#FFE1E1" stroke="' + INK + '" stroke-width="3.5" stroke-dasharray="8 4"/>' +
        '<text x="130" y="145" text-anchor="middle" ' + T + ' font-size="21" fill="' + INK + '">CRASH TEST</text></g>';
      out += '<circle cx="245" cy="104" r="12" fill="#FFD60A"' + S(3.5) + '/><text x="252" y="150" text-anchor="middle" transform="rotate(-90 252 150)" ' + H + ' font-size="19" fill="' + INK + '">RESET</text>' +   // 19: 12.4px at 170px wide (was 17)
        '<path d="M239 104 a6 6 0 1 1 6 6" fill="none"' + S(2.5) + '/><path d="M242 108 l3 2 l-3 2" fill="none"' + S(2.5) + "/>";
    } else {
      out += '<path d="M60 96 L200 96" fill="none"' + S(3) + '/><path d="M60 96 L200 96 L202 118 L58 118 Z" fill="#C9F2D9" stroke="none"/>';
      out += '<path d="M60 96 L200 96" fill="none"' + S(3) + "/>";
      /* level plane */
      out += '<path d="M104 78 h52 q8 0 8 4 q0 4 -8 4 h-52 z" fill="#FFFFFF"' + S(3) + '/><path d="M124 78 l-6 -16 h8 l12 16 M124 86 l-6 14 h8 l12 -14" fill="#FFFFFF"' + S(3) + "/>";
      out += '<path d="M98 82 h-16 M96 76 h-10" fill="none"' + S(3) + "/>";
      out += '<rect x="96" y="124" width="68" height="24" rx="6" fill="#C9F2D9"' + S(3) + '/><text x="130" y="142" text-anchor="middle" ' + T + ' font-size="18" fill="' + INK + '">SAFE</text>';
    }
    /* dials */
    out += '<circle cx="48" cy="132" r="9" fill="#FFF6CC"' + S(3) + '/><path d="M48 132 l5 -5" fill="none"' + S(2.5) + "/>";
    if (!crash) out += '<circle cx="212" cy="132" r="9" fill="#FFF6CC"' + S(3) + '/><path d="M212 132 l-5 -5" fill="none"' + S(2.5) + "/>";
    return out;
  } };

  /* ---------------- Node, the workshop robot ---------------- */
  L.cast.robot27 = { vb: "0 0 320 250", draw: function (el) {
    var code = el.getAttribute("data-code") || "0", arm = el.getAttribute("data-arm") || "", ok = code === "0";
    var out = "";
    function ring(cx, cy, rx, ry) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + INK + '" stroke-width="4" stroke-dasharray="9 6"/>'; }
    /* hose ("stream") coiled at the feet */
    out += '<path d="M188 214 q30 -4 46 10 q16 14 46 6 q20 -6 26 8" fill="none" stroke="#5FA8A0" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M188 214 q30 -4 46 10 q16 14 46 6 q20 -6 26 8" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 10"/>' +
      '<rect x="292" y="226" width="22" height="14" rx="3" fill="#FFD60A"' + S(3) + "/>" +
      '<text x="250" y="208" text-anchor="middle" ' + M + ' font-size="20" fill="' + INK + '">stream</text>';
    /* wheels and body */
    out += '<rect x="110" y="200" width="100" height="22" rx="10" fill="#D9D9D9"' + S(4) + '/><circle cx="128" cy="226" r="12" fill="' + INK + '"/><circle cx="192" cy="226" r="12" fill="' + INK + '"/>';
    out += '<rect x="104" y="104" width="112" height="100" rx="16" fill="#7FD3A8"' + S(4.5) + "/>";
    /* name badge */
    out += '<rect x="112" y="114" width="96" height="66" rx="8" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<text x="160" y="139" text-anchor="middle" ' + M + ' font-size="20" fill="' + INK + '" textLength="84" lengthAdjust="spacingAndGlyphs">process</text>' +
      '<text x="160" y="168" text-anchor="middle" ' + M + ' font-size="20" fill="' + INK + '">exit ' + esc(code) + "</text>";
    /* head with a screen face */
    out += '<path d="M160 22 V8" fill="none"' + S(4) + '/><circle cx="160" cy="8" r="6" fill="#FFD60A"' + S(3) + "/>";
    out += '<rect x="112" y="22" width="96" height="76" rx="14" fill="#7FD3A8"' + S(4.5) + '/><rect x="124" y="34" width="72" height="52" rx="8" fill="#1E2A26"' + S(3) + "/>";
    out += '<g class="eyes"><circle cx="146" cy="56" r="5" fill="#C9F2D9"/><circle cx="174" cy="56" r="5" fill="#C9F2D9"/></g>' +
      (ok ? '<path d="M146 70 q14 10 28 0" fill="none" stroke="#C9F2D9" stroke-width="4" stroke-linecap="round"/>'
          : '<path d="M146 76 q14 -10 28 0" fill="none" stroke="#C9F2D9" stroke-width="4" stroke-linecap="round"/>');
    out += '<rect x="148" y="98" width="24" height="8" fill="#D9D9D9"' + S(3) + "/>";
    /* left arm: the filing arm holding a folder */
    out += '<path d="M104 128 L72 116 L50 132" fill="none"' + S(8) + '/><circle cx="72" cy="116" r="6" fill="#D9D9D9"' + S(3) + "/>";
    out += '<path d="M12 132 h30 l6 -8 h26 v52 h-62 z" fill="#FFF6CC"' + S(3.5) + '/><path d="M20 150 h44 M20 162 h34" fill="none"' + S(2.5) + "/>" +
      '<text x="43" y="200" text-anchor="middle" ' + M + ' font-size="20" fill="' + INK + '">fs</text>';
    /* right arm: the phone */
    out += '<path d="M216 128 L248 114 L262 92" fill="none"' + S(8) + '/><circle cx="248" cy="114" r="6" fill="#D9D9D9"' + S(3) + "/>";
    out += '<path d="M246 78 q16 -16 40 -4 l-6 12 q-14 -6 -26 2 z" fill="#FFE1E1"' + S(3.5) + '/><path d="M246 78 l-8 10 l12 6 M286 74 l10 6 l-6 12" fill="none"' + S(3.5) + "/>" +
      '<path d="M290 52 q8 6 6 16 M300 46 q12 10 8 26" fill="none"' + S(3) + "/>" +
      '<text x="290" y="132" text-anchor="middle" ' + M + ' font-size="20" fill="' + INK + '">http</text>';
    /* highlight: a dashed ring, never colour alone */
    if (arm === "fs") out += ring(43, 162, 46, 54);
    else if (arm === "http") out += ring(270, 78, 40, 34);
    else if (arm === "stream") out += ring(252, 222, 66, 24);
    else if (arm === "badge") out += ring(160, 147, 58, 42);
    return out;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
