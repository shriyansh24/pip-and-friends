/* Polyglot comics — guide cast for the Rust, Go, C++ and JavaScript books (classic deferred script,
   loads after comic-widgets.js). Drawn in SVG from code in Pip's house style: 4px ink outline, flat bright
   fills, simple shapes, Pip's own expressions. Full notes for chapter authors: assets/CAST.md.

   WHO'S WHO (use these names, voices and catchphrases consistently in every chapter)

   data-char="librarian"  MABEL, the Rust guide. A careful, kind librarian (hair bun with a pencil, terracotta
       cardigan, library card on a lanyard). She never loses track of a book: every book has one owner, and
       her ledger records who has borrowed it.  Stands for ownership, borrowing and lifetimes.
       Catchphrases: "Every book has exactly one owner."
                     "Lend it to many readers, or to one writer. Never both at once."
                     "Bring it back before the owner leaves."
                     "When the owner leaves, the book goes back on the shelf."
   data-char="courier"    SCOOT, the Go guide. A fast, cheerful bike courier (red cap, green jacket, satchel of
       letters, red sneakers with speed lines). Stands for goroutines (couriers) and channels (hand-to-hand
       deliveries).
       Catchphrases: "Don't share the note. Send it!"
                     "I wait at the door until someone takes the letter."
                     "Need more hands? Just say go!"
   data-char="mechanic"   WREN, the C++ guide. A capable, unflappable mechanic (orange coveralls, goggles up on
       curly hair, wrench in hand, red toolbox at her feet). Works close to the machine and respects it.
       Catchphrases: "Close to the metal. Careful with the wrench."
                     "Every bolt you tighten, you loosen later."
                     "Measure twice, compile once."
   data-char="stagehand"  KIT, the JavaScript guide. A calm stage manager (pink hoodie, headset with a mic,
       clipboard of cues). Runs the show one cue at a time. Stands for events, callbacks and the event loop.
       Catchphrases: "One cue at a time."
                     "Stand by... GO!"
                     "Long job? I'll call you back when it's done."
   data-char="compiler"   THE COMPILER, shared by Rust, Go and C++. A big checkpoint robot: a dark screen face
       with a beacon on top, a printer that writes notes with arrows and suggested fixes, and a striped gate
       that stays down until the whole program checks out. Strict, never mean; always says where and how
       to fix. Catchphrases: "Nothing runs until everything checks out."
                             "Here's the problem, here's where, and here's a fix."

   ATTRIBUTES
     Guides:   data-mood  = happy | surprised | focus | worried | normal
               data-mouth = smile | shout | o | flat | frown
               data-arms  = down | wave | point | pointL | cheer | shrug
               data-prop  = what the guide holds (see each guide; "none" empties the hand)
                 librarian: book (default) | ledger | none      (also holds a stamp when arms are down or point)
                 courier:   letter (default) | none
                 mechanic:  wrench (default) | none
                 stagehand: clipboard (default) | none
     Compiler: data-mood  = normal | happy | focus | stern   (the beacon colour and the gate follow the mood)
               data-gate  = up | down   (optional; default: up when happy, otherwise down)
               data-label = name plate, e.g. "rustc", "go build", "g++" (≤ 9 characters)
   Animation hooks are Pip's: .bob (whole body), .wave (waving arm), .eyes (blink). The engine's CSS runs
   them only when motion is on and never under prefers-reduced-motion. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-cast.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  /* ---------- Pip's expressions, re-centred and scaled so every guide emotes the same way ---------- */
  function pipEyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M51 60 q7 -9 14 0 M75 60 q7 -9 14 0" fill="none"' + S(4.5) + "/>";
      case "surprised": return '<circle cx="58" cy="57" r="8" fill="#fff"' + S(3) + '/><circle cx="82" cy="57" r="8" fill="#fff"' + S(3) + '/><circle cx="58" cy="58" r="3.5" fill="' + INK + '"/><circle cx="82" cy="58" r="3.5" fill="' + INK + '"/><path d="M48 42 l14 -4 M78 38 l14 4" fill="none"' + S(3.5) + "/>";
      case "focus": return '<path d="M51 57 h13 M76 57 h13" fill="none"' + S(5) + '/><path d="M50 47 l14 3 M90 47 l-14 3" fill="none"' + S(3) + "/>";
      case "worried": return '<circle cx="58" cy="59" r="5" fill="' + INK + '"/><circle cx="82" cy="59" r="5" fill="' + INK + '"/><path d="M50 47 l13 -4 M90 47 l-13 -4" fill="none"' + S(3.5) + "/>";
      default: return '<circle cx="58" cy="58" r="5.5" fill="' + INK + '"/><circle cx="82" cy="58" r="5.5" fill="' + INK + '"/>';
    }
  }
  function pipMouth(m) {
    switch (m) {
      case "shout": return '<path d="M56 67 h28 q-2 15 -14 15 q-12 0 -14 -15 z" fill="' + INK + '"/><path d="M62 75 q8 5 16 0" fill="none" stroke="#FF5A4E" stroke-width="3"/>';
      case "o": return '<circle cx="70" cy="72" r="5.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M60 72 h20" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M58 76 q12 -9 24 0" fill="none"' + S(4) + "/>";
      default: return '<path d="M57 69 q13 11 26 0" fill="none"' + S(4.5) + "/>";
    }
  }
  /* The transform sits on an outer group so the .eyes blink animation never overrides it. */
  function face(cx, cy, k, o) {
    return '<g transform="translate(' + (cx - 70 * k).toFixed(2) + " " + (cy - 65 * k).toFixed(2) + ") scale(" + k + ')"><g class="eyes">' + pipEyes(o.mood) + "</g>" + pipMouth(o.mouth) + "</g>";
  }
  function blush(x1, x2, y) { return '<circle cx="' + x1 + '" cy="' + y + '" r="4.5" fill="#FF9E8F"/><circle cx="' + x2 + '" cy="' + y + '" r="4.5" fill="#FF9E8F"/>'; }

  /* ---------- arms: Pip's six poses, measured from each shoulder ---------- */
  var POSE = {
    down: [[-16, 30], [16, 30]],
    wave: [[-16, 30], [24, -36]],
    point: [[-16, 30], [36, -10]],
    pointL: [[-36, -10], [16, 30]],
    cheer: [[-24, -34], [24, -34]],
    shrug: [[-28, -12], [28, -12]]
  };
  function limb(x1, y1, x2, y2, sleeve) {
    var d = ' d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"';
    return "<path" + d + ' fill="none"' + S(9.5) + "/><path" + d + ' fill="none" stroke="' + sleeve + '" stroke-width="4.5" stroke-linecap="round"/>';
  }
  /* o: { lx, rx, sy, sleeve, skin, pose, propL(x, y, deg, pose), propR(...) }. A prop is drawn under the hand so the hand grips it. */
  function arms(o) {
    var name = POSE[o.pose] ? o.pose : "down", p = POSE[name], out = "";
    [["L", o.lx, p[0], o.propL], ["R", o.rx, p[1], o.propR]].forEach(function (a) {
      var x2 = a[1] + a[2][0], y2 = o.sy + a[2][1], deg = Math.atan2(a[2][1], a[2][0]) * 180 / Math.PI;
      out += '<g class="' + (a[0] === "R" && name === "wave" ? "wave" : "") + '">' + limb(a[1], o.sy, x2, y2, o.sleeve) +
        (a[3] ? a[3](x2, y2, deg, name) : "") + '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="' + o.skin + '"' + S(3) + "/></g>";
    });
    return out;
  }
  function at(x, y, inner, deg) { return '<g transform="translate(' + x + " " + y + ")" + (deg ? " rotate(" + deg.toFixed(1) + ")" : "") + '">' + inner + "</g>"; }
  function attrs(el) {
    return { mood: el.getAttribute("data-mood"), mouth: el.getAttribute("data-mouth"), pose: el.getAttribute("data-arms") || "down", prop: el.getAttribute("data-prop") };
  }

  /* ---------- props ---------- */
  var PROP = {
    book: function (x, y) {
      return at(x, y, '<rect x="2" y="-12" width="8" height="12" fill="#FFD60A"' + S(2.5) + "/>" +
        '<rect x="-12" y="-6" width="25" height="31" rx="3" fill="#FF5A4E"' + S(3.5) + '/><path d="M-7 -5 V24" fill="none"' + S(2.5) + '/><rect x="-2" y="4" width="11" height="7" rx="1.5" fill="#FFF6CC"' + S(2) + "/>");
    },
    ledger: function (x, y) {
      return at(x, y, '<path d="M-23 0 q11 -6 23 0 q12 -6 23 0 v26 q-11 -6 -23 0 q-12 -6 -23 0 z" fill="#2E9E57"' + S(3.5) + "/>" +
        '<path d="M-20 1 q10 -5 20 0 q10 -5 20 0 v21 q-10 -5 -20 0 q-10 -5 -20 0 z" fill="#fff"' + S(2.5) + "/>" +
        '<path d="M0 1 V22 M-16 8 h11 M-16 13 h11 M5 8 h11 M5 13 h8" fill="none"' + S(2) + '/><path d="M8 15 l2.5 2.5 l5 -6" fill="none" stroke="#1B7A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>');
    },
    stamp: function (x, y) {
      return at(x, y, '<rect x="-3.5" y="-12" width="7" height="22" fill="#FF5A4E"' + S(2.5) + '/><circle cx="0" cy="-15" r="6" fill="#FF5A4E"' + S(3) + '/><rect x="-12" y="9" width="24" height="9" rx="2" fill="#5A6472"' + S(3) + '/><path d="M-9 21 h18" fill="none" stroke="#FF5A4E" stroke-width="3" stroke-linecap="round"/>');
    },
    letter: function (x, y) {
      return at(x, y, '<rect x="-14" y="-3" width="28" height="18" rx="2" fill="#fff"' + S(3) + '/><path d="M-13 -2 L0 8 L13 -2" fill="none"' + S(2.5) + '/><rect x="5" y="5" width="6" height="7" fill="#FF5A4E" stroke="' + INK + '" stroke-width="1.5"/>');
    },
    wrench: function (x, y) {   /* held raised at a fixed angle, so the frame stays narrow in every pose */
      return at(x, y, '<path d="M0 0 L23 0" fill="none"' + S(10) + '/><path d="M0 0 L23 0" fill="none" stroke="#C9D3DC" stroke-width="4.5" stroke-linecap="round"/>' +
        '<path d="M21 -8 L32 -10 L38 -4 L30 -3 L30 3 L38 4 L32 10 L21 8 Z" fill="#C9D3DC"' + S(3) + "/>", -72);
    },
    clipboard: function (x, y) {
      return at(x, y, '<rect x="-15" y="-5" width="30" height="38" rx="3" fill="#C8955E"' + S(3.5) + '/><rect x="-11" y="1" width="22" height="28" fill="#fff"' + S(2) + "/>" +
        '<path d="M-8 8 l2 2.5 l4 -5 M-8 16 l2 2.5 l4 -5" fill="none" stroke="#1B7A3A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M1 8 h7 M1 16 h7 M1 24 h7" fill="none"' + S(2) + '/><path d="M-8 21 l5 3 l-5 3 z" fill="#FF5A4E" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<rect x="-7" y="-8" width="14" height="7" rx="2" fill="#9AA3AE"' + S(2.5) + "/>");
    }
  };
  function held(prop, def, allowed) { var p = prop || def; return allowed.indexOf(p) >= 0 ? PROP[p] : null; }
  function feet(x1, x2, y, fill) {
    return '<ellipse cx="' + x1 + '" cy="' + y + '" rx="11.5" ry="6" fill="' + fill + '"' + (fill === INK ? "" : S(3)) + '/><ellipse cx="' + x2 + '" cy="' + y + '" rx="11.5" ry="6" fill="' + fill + '"' + (fill === INK ? "" : S(3)) + "/>";
  }
  function legs(x1, x2, y, h, fill) {
    return '<rect x="' + (x1 - 5) + '" y="' + y + '" width="10" height="' + h + '" rx="3" fill="' + fill + '"' + S(3) + '/><rect x="' + (x2 - 5) + '" y="' + y + '" width="10" height="' + h + '" rx="3" fill="' + fill + '"' + S(3) + "/>";
  }

  /* ---------- MABEL, the librarian (Rust) ---------- */
  function librarian(el) {
    var o = attrs(el), skin = "#C98B5B", hair = "#4A2E1C", card = "#E8875A";
    var stamp = (o.pose === "down" || o.pose === "point") && o.prop !== "none" ? PROP.stamp : null;
    return '<g class="bob">' +
      legs(63, 87, 172, 14, skin) + feet(63, 87, 190, INK) +
      '<path d="M45 177 L49 154 H101 L105 177 Z" fill="#B79CFF"' + S(4) + "/>" +
      '<path d="M42 164 L50 106 Q75 90 100 106 L108 164 Z" fill="' + card + '"' + S(4) + "/>" +
      '<path d="M64 97 L75 118 L86 97 Z" fill="#FFF6CC"' + S(3) + '/><path d="M66 99 L75 126 L84 99" fill="none" stroke="#0B3FA8" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="62" y="124" width="26" height="20" rx="3" fill="#DDE8FF"' + S(3) + '/><path d="M66 131 h10 M66 137 h15" fill="none"' + S(2) + '/><circle cx="82" cy="131" r="3.2" fill="#FF5A4E"/>' +
      '<path d="M54 24 L96 36" fill="none"' + S(8) + '/><path d="M54 24 L96 36" fill="none" stroke="#FFD60A" stroke-width="3.5" stroke-linecap="round"/><circle cx="54" cy="24" r="3.2" fill="#FF9E8F" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="75" cy="27" r="13" fill="' + hair + '"' + S(4) + "/>" +
      '<circle cx="75" cy="66" r="31" fill="' + hair + '"' + S(4) + "/>" +
      '<circle cx="75" cy="68" r="26" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M48 62 C46 38 64 34 75 36 C88 34 104 40 102 62 C96 50 88 46 80 50 C72 44 58 46 48 62 Z" fill="' + hair + '"' + S(3.5) + "/>" +
      blush(57, 93, 80) + face(75, 74, 0.76, o) +
      arms({ lx: 52, rx: 98, sy: 112, sleeve: card, skin: skin, pose: o.pose, propL: held(o.prop, "book", ["book", "ledger"]), propR: stamp }) +
      "</g>";
  }

  /* ---------- SCOOT, the courier (Go) ---------- */
  function courier(el) {
    var o = attrs(el), skin = "#F3C9A1", jacket = "#4CC38A";
    return '<g class="bob">' +
      '<path d="M16 38 h16 M10 48 h18 M18 182 h16 M10 190 h20" fill="none"' + S(3.5) + "/>" +
      legs(59, 85, 168, 16, skin) +
      '<ellipse cx="58" cy="189" rx="12" ry="6.5" fill="#FF5A4E"' + S(3) + '/><ellipse cx="86" cy="189" rx="12" ry="6.5" fill="#FF5A4E"' + S(3) + '/><path d="M48 191 h20 M76 191 h20" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M48 156 H96 V172 H75 L72 166 L69 172 H48 Z" fill="#7FB2FF"' + S(3.5) + "/>" +
      '<path d="M46 160 L50 108 Q72 94 94 108 L98 160 Z" fill="' + jacket + '"' + S(4) + '/><path d="M72 104 V160" fill="none"' + S(2.5) + "/>" +
      '<path d="M54 104 L110 148" fill="none"' + S(11) + '/><path d="M54 104 L110 148" fill="none" stroke="#C8955E" stroke-width="5.5" stroke-linecap="round"/>' +
      '<rect x="97" y="116" width="15" height="12" fill="#fff"' + S(2.5) + ' transform="rotate(-12 104 122)"/><rect x="111" y="118" width="13" height="11" fill="#FFF6CC"' + S(2.5) + ' transform="rotate(10 117 123)"/>' +
      '<rect x="92" y="126" width="38" height="32" rx="5" fill="#C8955E"' + S(3.5) + '/><path d="M92 128 h38 v10 q-19 9 -38 0 z" fill="#A9743F"' + S(3) + '/><rect x="107" y="138" width="8" height="6" rx="1.5" fill="#FFD60A"' + S(2) + "/>" +
      '<circle cx="72" cy="72" r="26" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M47 60 q-9 4 -5 15 q3 -6 9 -5 z M97 60 q8 4 5 14 q-3 -5 -8 -5 z" fill="#B5562A"' + S(3) + "/>" +
      '<path d="M44 56 C44 20 100 20 100 56 Z" fill="#FF5A4E"' + S(4) + '/><path d="M98 50 Q118 48 128 57 Q114 62 98 58 Z" fill="#FF5A4E"' + S(3.5) + "/>" +
      '<rect x="44" y="49" width="56" height="8" rx="3" fill="#fff"' + S(3) + '/><circle cx="72" cy="37" r="6.5" fill="#FFD60A"' + S(3) + '/><path d="M69.5 34 l4 3 l-4 3" fill="none"' + S(2) + "/>" +
      '<circle cx="57" cy="85" r="1.5" fill="#B5562A"/><circle cx="61" cy="88" r="1.5" fill="#B5562A"/><circle cx="56" cy="89.5" r="1.5" fill="#B5562A"/><circle cx="87" cy="85" r="1.5" fill="#B5562A"/><circle cx="83" cy="88" r="1.5" fill="#B5562A"/><circle cx="88" cy="89.5" r="1.5" fill="#B5562A"/>' +
      face(72, 78, 0.74, o) +
      arms({ lx: 50, rx: 94, sy: 112, sleeve: jacket, skin: skin, pose: o.pose, propL: held(o.prop, "letter", ["letter"]) }) +
      "</g>";
  }

  /* ---------- WREN, the mechanic (C++) ---------- */
  function mechanic(el) {
    var o = attrs(el), skin = "#8D5A3B", suit = "#FF9F43";
    return '<g class="bob">' +
      '<rect x="2" y="166" width="38" height="26" rx="4" fill="#FF5A4E"' + S(3.5) + '/><path d="M12 166 v-7 h18 v7" fill="none"' + S(4) + '/><path d="M2 175 h38" fill="none"' + S(3) + '/><rect x="17" y="172" width="8" height="6" rx="1.5" fill="#FFD60A"' + S(2) + "/>" +
      '<path d="M50 170 H72 V186 H50 Z M80 170 H102 V186 H80 Z" fill="' + suit + '"' + S(3.5) + "/>" + feet(61, 91, 189, INK) +
      '<path d="M44 174 L48 106 Q76 90 104 106 L108 174 Z" fill="' + suit + '"' + S(4) + '/><path d="M76 150 V174" fill="none"' + S(3) + "/>" +
      '<path d="M64 97 Q76 106 88 97" fill="#fff"' + S(3) + "/>" +
      '<rect x="58" y="114" width="36" height="28" rx="4" fill="' + suit + '"' + S(3) + '/><path d="M60 114 L54 101 M92 114 L98 101" fill="none"' + S(3) + "/>" +
      '<circle cx="76" cy="128" r="8.5" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-dasharray="3.4 2.6"/><circle cx="76" cy="128" r="6" fill="#FFD60A"' + S(2.5) + '/><circle cx="76" cy="128" r="2" fill="' + INK + '"/>' +
      '<circle cx="56" cy="47" r="10" fill="#1E1E1E"' + S(4) + '/><circle cx="67" cy="39" r="11" fill="#1E1E1E"' + S(4) + '/><circle cx="84" cy="38" r="11" fill="#1E1E1E"' + S(4) + '/><circle cx="96" cy="46" r="10" fill="#1E1E1E"' + S(4) + "/>" +
      '<circle cx="76" cy="68" r="27" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M49 50 Q76 30 103 50" fill="none"' + S(8) + '/><path d="M49 50 Q76 30 103 50" fill="none" stroke="#5A6472" stroke-width="3.5" stroke-linecap="round"/>' +
      '<rect x="55" y="29" width="20" height="14" rx="6" fill="#8FE3FF"' + S(3.5) + '/><rect x="77" y="29" width="20" height="14" rx="6" fill="#8FE3FF"' + S(3.5) + '/><path d="M59 35 l5 -3 M81 35 l5 -3" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>' +
      face(76, 76, 0.74, o) +
      arms({ lx: 52, rx: 100, sy: 112, sleeve: suit, skin: skin, pose: o.pose, propR: held(o.prop, "wrench", ["wrench"]) }) +
      "</g>";
  }

  /* ---------- KIT, the stage manager (JavaScript) ---------- */
  function stagehand(el) {
    var o = attrs(el), skin = "#F1B98C", hood = "#FF7AB0", hair = "#2B2B44";
    return '<g class="bob">' +
      legs(63, 87, 176, 10, "#3B3F66") + feet(63, 87, 189, "#fff") +
      '<path d="M48 164 H102 V182 H78 L75 174 L72 182 H48 Z" fill="#3B3F66"' + S(3.5) + "/>" +
      '<path d="M44 168 L50 106 Q75 92 100 106 L106 168 Z" fill="' + hood + '"' + S(4) + "/>" +
      '<path d="M55 101 Q75 116 95 101" fill="' + hood + '"' + S(3.5) + '/><path d="M68 110 v16 M82 110 v16" fill="none"' + S(2.5) + '/><circle cx="68" cy="128" r="2.6" fill="#fff"' + S(2) + '/><circle cx="82" cy="128" r="2.6" fill="#fff"' + S(2) + "/>" +
      '<path d="M57 146 H93 L97 162 H53 Z" fill="' + hood + '"' + S(3) + "/>" +
      '<path d="M46 90 C40 54 52 38 75 38 C98 38 110 54 104 90 Z" fill="' + hair + '"' + S(4) + "/>" +
      '<circle cx="75" cy="70" r="26" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M49 62 C48 44 60 40 75 40 C90 40 102 44 101 62 C94 52 84 50 76 52 C66 48 56 52 49 62 Z" fill="' + hair + '"' + S(3.5) + '/><path d="M80 41 C88 42 94 46 96 54 C92 51 88 50 84 50 Z" fill="' + hood + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M45 70 C42 18 108 18 105 70" fill="none"' + S(8) + '/><path d="M45 70 C42 18 108 18 105 70" fill="none" stroke="#9AA3AE" stroke-width="3.5" stroke-linecap="round"/>' +
      '<rect x="39" y="62" width="12" height="21" rx="5" fill="#FF5A4E"' + S(3.5) + '/><rect x="99" y="62" width="12" height="21" rx="5" fill="#FF5A4E"' + S(3.5) + "/>" +
      '<path d="M45 82 Q46 96 57 95" fill="none"' + S(4) + '/><rect x="55" y="90.5" width="10" height="9" rx="4.5" fill="' + INK + '"/>' +
      blush(58, 92, 82) + face(75, 76, 0.74, o) +
      arms({ lx: 52, rx: 98, sy: 112, sleeve: hood, skin: skin, pose: o.pose, propL: held(o.prop, "clipboard", ["clipboard"]) }) +
      "</g>";
  }

  /* ---------- THE COMPILER: checkpoint robot (Rust, Go, C++) ---------- */
  var BEACON = { normal: "#7FB2FF", happy: "#3FD07A", focus: "#FFD60A", stern: "#FF5A4E" };
  function compilerFace(mood) {
    var G = "#FFE45C", st = function (w) { return ' fill="none" stroke="' + G + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"'; };
    var eyes, mouth;
    switch (mood) {
      case "happy": eyes = '<path d="M74 70 q8 -13 16 0 M110 70 q8 -13 16 0"' + st(5.5) + "/>"; mouth = '<path d="M84 82 q16 13 32 0"' + st(5) + "/>"; break;
      case "focus": eyes = '<rect x="73" y="63" width="18" height="6" rx="3" fill="' + G + '"/><rect x="109" y="63" width="18" height="6" rx="3" fill="' + G + '"/><path d="M72 55 l18 4 M128 55 l-18 4"' + st(3.5) + "/>"; mouth = '<circle cx="90" cy="87" r="2.8" fill="' + G + '"/><circle cx="100" cy="87" r="2.8" fill="' + G + '"/><circle cx="110" cy="87" r="2.8" fill="' + G + '"/>'; break;
      case "stern": eyes = '<rect x="75" y="61" width="13" height="12" rx="3" fill="' + G + '"/><rect x="112" y="61" width="13" height="12" rx="3" fill="' + G + '"/><path d="M70 51 l20 7 M130 51 l-20 7"' + st(4.5) + "/>"; mouth = '<path d="M86 90 q14 -9 28 0"' + st(4.5) + "/>"; break;
      default: eyes = '<rect x="76" y="56" width="12" height="17" rx="5" fill="' + G + '"/><rect x="112" y="56" width="12" height="17" rx="5" fill="' + G + '"/>'; mouth = '<path d="M88 85 q12 6 24 0"' + st(4.5) + "/>";
    }
    return '<g class="eyes">' + eyes + "</g>" + mouth;
  }
  function hazard(x, y, w, h) {
    var out = "";
    for (var s = x - h; s < x + w; s += 16) {
      var pts = [[s, y + h], [s + 8, y + h], [s + 8 + h, y], [s + h, y]].map(function (p) { return Math.max(x, Math.min(x + w, p[0])) + "," + p[1]; });
      out += '<polygon points="' + pts.join(" ") + '" fill="' + INK + '"/>';
    }
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#FFD60A"/>' + out + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none"' + S(3) + "/>";
  }
  function compiler(el) {
    var mood = BEACON[el.getAttribute("data-mood")] ? el.getAttribute("data-mood") : "normal";
    var gate = el.getAttribute("data-gate") || (mood === "happy" ? "up" : "down");
    var label = (el.getAttribute("data-label") || "COMPILER").slice(0, 9), steel = "#B9C6D6", dark = "#5A6472";
    var rays = mood === "stern" || mood === "happy" ? '<path d="M80 12 l-8 -3 M80 22 l-9 1 M120 12 l8 -3 M120 22 l9 1" fill="none"' + S(3.5) + "/>" : "";
    return '<g class="bob">' +
      /* gate post and striped boom: down blocks the road, up lets the program through */
      '<rect x="172" y="132" width="13" height="72" rx="3" fill="' + dark + '"' + S(3.5) + "/>" +
      '<g transform="rotate(' + (gate === "up" ? -78 : 0) + ' 178.5 142)"><rect x="176" y="135.5" width="60" height="13" rx="6" fill="#fff"' + S(3.5) + '/><path d="M192 137.5 v9 M206 137.5 v9 M220 137.5 v9" fill="none" stroke="#FF5A4E" stroke-width="8"/><rect x="176" y="135.5" width="60" height="13" rx="6" fill="none"' + S(3.5) + "/></g>" +
      '<circle cx="178.5" cy="142" r="6" fill="#FFD60A"' + S(3) + "/>" +
      /* treads, cabinet, neck */
      '<rect x="34" y="182" width="132" height="24" rx="12" fill="' + dark + '"' + S(4) + "/>" +
      [52, 76, 100, 124, 148].map(function (x) { return '<circle cx="' + x + '" cy="194" r="6.5" fill="#9AA3AE"' + S(3) + "/>"; }).join("") +
      '<rect x="86" y="104" width="28" height="16" fill="' + dark + '"' + S(3.5) + "/>" +
      '<rect x="30" y="116" width="140" height="70" rx="10" fill="' + steel + '"' + S(4.5) + "/>" + hazard(30, 168, 140, 13) +
      /* Name plate across the cabinet: 23 units, 12.5px at the default 130px width (it was 14, 7.6px). A 9-character
         name is squeezed to the plate; below 12px (a .sm drawing) comic.js hides it (.lbl-deco). */
      '<rect x="38" y="119" width="124" height="27" rx="4" fill="#fff"' + S(3) + "/>" +
      '<text class="lbl-deco" x="100" y="140" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="23"' + (label.length * 0.6 * 23 > 114 ? ' textLength="114" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + INK + '">' + esc(label) + "</text>" +
      '<rect x="58" y="148" width="84" height="6" rx="3" fill="' + INK + '"/>' +
      /* the note: a problem underlined in red, an arrow, and the suggested fix in green */
      '<path d="M68 151 H132 V190 Q132 198 124 196 Q116 194 108 198 Q100 202 92 198 Q84 194 76 198 Q68 200 68 192 Z" fill="#fff"' + S(3) + "/>" +
      '<path d="M76 161 h24" fill="none"' + S(3) + '/><path d="M76 167 q3 -3.5 6 0 t6 0 t6 0 t6 0" fill="none" stroke="#D11F1F" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M104 166 C124 166 124 184 106 184" fill="none"' + S(2.6) + '/><path d="M111 180 L105 184 L111 188" fill="none"' + S(2.6) + "/>" +
      '<path d="M76 184 h22" fill="none" stroke="#1B7A3A" stroke-width="3.2" stroke-linecap="round"/>' +
      /* arm raising a red marker */
      '<path d="M34 134 L14 112" fill="none"' + S(10) + '/><path d="M34 134 L14 112" fill="none" stroke="' + steel + '" stroke-width="4.5" stroke-linecap="round"/>' +
      '<rect x="8" y="80" width="12" height="28" rx="3" fill="#FF5A4E"' + S(3) + '/><path d="M10 81 L14 71 L18 81" fill="#fff"' + S(2.5) + "/>" +
      '<circle cx="14" cy="110" r="8" fill="' + dark + '"' + S(3) + "/>" +
      /* beacon and head */
      rays + '<path d="M90 24 Q90 6 100 6 Q110 6 110 24 Z" fill="' + BEACON[mood] + '"' + S(3.5) + '/><rect x="85" y="21" width="30" height="11" rx="3" fill="' + dark + '"' + S(3.5) + "/>" +
      '<rect x="36" y="30" width="128" height="78" rx="16" fill="' + steel + '"' + S(4.5) + "/>" +
      '<circle cx="36" cy="69" r="8" fill="#FFD60A"' + S(3.5) + '/><circle cx="164" cy="69" r="8" fill="#FFD60A"' + S(3.5) + "/>" +
      '<rect x="50" y="41" width="100" height="56" rx="10" fill="' + INK + '"/><path d="M58 50 h12" fill="none" stroke="#4A4F5A" stroke-width="3" stroke-linecap="round"/>' +
      compilerFace(mood) +
      "</g>";
  }

  var C = L.cast;
  C.librarian = { vb: "0 0 150 200", draw: librarian };
  C.courier = { vb: "0 0 150 200", draw: courier };
  C.mechanic = { vb: "0 0 158 200", draw: mechanic };
  C.stagehand = { vb: "0 0 150 200", draw: stagehand };
  C.compiler = { vb: "0 0 240 210", draw: compiler };

  P.comic.ext(function () { L.drawCast(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
