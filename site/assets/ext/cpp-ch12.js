/* C++ book, chapter 12 extension: "The Bank Vault".
   Adds no widgets that claim output; every terminal, stepper and exercise reads the captured runs in data/cpp-ch12.js
   through the engine. It adds:
     - Tally the teller (cast member "bankteller"; renamed from "teller" on 2026-11-08 because python ch16 has a different "teller"): a bank teller in her window, the face of a class's public interface.
       data-mood = happy | surprised | focus | worried | normal | stern; data-mouth = smile | o | flat | frown | shout;
       data-arms = counter (default, hands on the counter) | stop (one palm raised: a refused request) | stamp (stamping a
       paid request); data-sign = the plate on the counter (at most 8 characters, default TELLER).
   The [data-same-src] badges on the page are the engine's (comic-widgets.js); this file no longer carries a copy. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch12.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------------- Tally the teller ---------------- */
  function face(mood, mouth) {
    var e;
    switch (mood) {
      case "happy": e = '<path d="M71 66 q6 -8 12 0 M89 66 q6 -8 12 0" fill="none"' + S(4) + "/>"; break;
      case "surprised": e = '<circle cx="77" cy="64" r="6.5" fill="#fff"' + S(3) + '/><circle cx="95" cy="64" r="6.5" fill="#fff"' + S(3) + '/><circle cx="77" cy="65" r="2.8" fill="' + INK + '"/><circle cx="95" cy="65" r="2.8" fill="' + INK + '"/>'; break;
      case "focus": e = '<path d="M70 65 h13 M89 65 h13" fill="none"' + S(5) + "/>"; break;
      case "worried": e = '<circle cx="77" cy="66" r="4" fill="' + INK + '"/><circle cx="95" cy="66" r="4" fill="' + INK + '"/><path d="M69 57 l11 -3 M103 57 l-11 -3" fill="none"' + S(3.5) + "/>"; break;
      case "stern": e = '<circle cx="77" cy="66" r="4" fill="' + INK + '"/><circle cx="95" cy="66" r="4" fill="' + INK + '"/><path d="M69 54 l12 5 M103 54 l-12 5" fill="none"' + S(4) + "/>"; break;
      default: e = '<circle cx="77" cy="65" r="4.5" fill="' + INK + '"/><circle cx="95" cy="65" r="4.5" fill="' + INK + '"/>';
    }
    var m = mouth || (mood === "worried" || mood === "stern" ? "flat" : mood === "surprised" ? "o" : "smile");
    var mm = m === "o" ? '<circle cx="86" cy="80" r="4.5" fill="' + INK + '"/>'
      : m === "frown" ? '<path d="M77 83 q9 -8 18 0" fill="none"' + S(4) + "/>"
      : m === "flat" ? '<path d="M78 80 h16" fill="none"' + S(4) + "/>"
      : m === "shout" ? '<path d="M76 76 h20 q-1 12 -10 12 q-9 0 -10 -12 z" fill="' + INK + '"/>'
      : '<path d="M76 77 q10 9 20 0" fill="none"' + S(4) + "/>";
    return '<g class="eyes">' + e + "</g>" + mm;
  }
  L.cast.bankteller = { vb: "0 0 172 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", arms = el.getAttribute("data-arms") || "counter";
    var sign = String(el.getAttribute("data-sign") || "TELLER").slice(0, 8);
    var hands;
    if (arms === "stop") {
      hands = '<circle cx="52" cy="128" r="8" fill="#F4C7A1"' + S(3) + "/>" +
        '<path d="M120 126 V96" fill="none"' + S(9) + '/><path d="M120 126 V96" fill="none" stroke="#9AD9C9" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M110 96 v-14 q0 -4 4 -4 q3 0 3 4 v-4 q0 -4 4 -4 q3 0 3 4 v2 q0 -4 4 -4 q3 0 3 4 v18 q0 8 -10 8 q-11 0 -11 -10 z" fill="#F4C7A1"' + S(3) + "/>";
    } else if (arms === "stamp") {
      hands = '<circle cx="52" cy="128" r="8" fill="#F4C7A1"' + S(3) + "/>" +
        '<rect x="108" y="96" width="22" height="16" rx="3" fill="#E63946"' + S(3) + '/><rect x="114" y="80" width="10" height="17" rx="3" fill="#7A4B2A"' + S(3) + "/>" +
        '<circle cx="119" cy="80" r="7" fill="#F4C7A1"' + S(3) + "/>" +
        '<path d="M100 120 l6 -4 M138 120 l-6 -4 M119 124 v6" fill="none"' + S(2.5) + "/>";
    } else {
      hands = '<circle cx="54" cy="128" r="8" fill="#F4C7A1"' + S(3) + '/><circle cx="118" cy="128" r="8" fill="#F4C7A1"' + S(3) + "/>";
    }
    return '<g class="bob">' +
      /* the booth and its arched sign */
      '<rect x="8" y="18" width="156" height="176" rx="10" fill="#DDE8FF"' + S(4) + "/>" +
      '<path d="M30 30 Q86 2 142 30" fill="#FFD60A"' + S(3.5) + "/>" +
      '<rect x="24" y="30" width="124" height="98" rx="6" fill="#FFFFFF"' + S(3.5) + "/>" +
      /* shoulders, shirt and bow tie */
      '<path d="M40 128 Q42 100 86 98 Q130 100 132 128 Z" fill="#9AD9C9"' + S(3.5) + "/>" +
      '<path d="M74 100 L86 118 L98 100 Z" fill="#FFFFFF"' + S(3) + "/>" +
      '<path d="M78 104 L86 108 L78 112 Z M94 104 L86 108 L94 112 Z" fill="#FFD60A"' + S(2.5) + "/>" +
      /* head and green eyeshade visor */
      '<circle cx="86" cy="70" r="24" fill="#F4C7A1"' + S(3.5) + "/>" +
      '<path d="M62 60 Q86 34 110 60" fill="#4FB286"' + S(3.5) + '/><path d="M58 60 H114" fill="none"' + S(4) + "/>" +
      '<path d="M64 52 q-6 2 -6 8" fill="none"' + S(2.5) + "/>" +
      face(mood, el.getAttribute("data-mouth")) +
      /* the counter, the money slot, the name plate */
      '<rect x="8" y="128" width="156" height="26" fill="#E7C08A"' + S(3.5) + "/>" +
      '<rect x="62" y="137" width="48" height="7" rx="2" fill="' + INK + '"/>' + hands +
      '<rect x="40" y="160" width="92" height="26" rx="4" fill="#FFF6CC"' + S(3) + "/>" +
      '<text x="86" y="179" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">' + esc(sign) + "</text>" +
      "</g>";
  } };

})(typeof globalThis !== "undefined" ? globalThis : this);
