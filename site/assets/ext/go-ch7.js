/* Go book, chapter 7 ("Machines and Mail Slots"): one new character.
   data-char="clerk"  PENNY, the mail-room clerk. Everything typed into a program arrives through the mail slot as
   paper (text). Penny reads the paper and either fills a number box (strconv.Atoi succeeded) or hands back a
   receipt with a complaint on it (an error value; chapter 8 calls every error a receipt). Original character, drawn in the house style: 4px ink, flat fills.
   Attributes:
     data-hold  = "slip" (default: a pink receipt with a complaint on it; label <= 4 characters) | "box" (a number box) | "paper" (an incoming letter)
     data-label = the text on what she holds (<= 6 characters; e.g. "42", "abc")
     data-mood  = "happy" (default) | "stern" | "o"
   Text equivalents: like every character, the drawing is aria-hidden; pages add an .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch7.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(6) + "/>"; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#F2C9A0"' + S(3) + "/>"; }

  L.cast.clerk = { vb: "0 0 170 190", draw: function (el) {
    var hold = el.getAttribute("data-hold") || "slip", label = (el.getAttribute("data-label") || "").slice(0, 6), mood = el.getAttribute("data-mood") || "happy";
    var mouth = mood === "stern" ? '<path d="M70 92 h20" fill="none"' + S(4) + "/>" :
      mood === "o" ? '<ellipse cx="80" cy="93" rx="6" ry="7" fill="' + INK + '"/>' :
      '<path d="M68 89 q12 11 24 0" fill="none"' + S(4) + "/>";
    var brows = mood === "stern" ? '<path d="M56 56 l14 4 M104 56 l-14 4" fill="none"' + S(3.5) + "/>" : "";
    // the counter she stands behind
    var out = '<rect x="4" y="150" width="162" height="36" rx="4" fill="#C8955E"' + S(4) + '/><path d="M4 162 h162" fill="none"' + S(3) + "/>";
    out += '<g class="bob">' +
      // body: shirt and waistcoat, with a bow tie
      '<path d="M40 150 q0 -40 40 -42 q40 2 40 42 z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M48 150 q2 -30 22 -38 l10 20 l10 -20 q20 8 22 38 z" fill="#B9D7C3"' + S(3.5) + "/>" +
      '<path d="M70 112 l10 8 l-10 8 z M90 112 l-10 8 l10 8 z" fill="#FF5A4E"' + S(3) + "/>" + dot(80, 120, 3.5) +
      '<circle cx="66" cy="138" r="2.5" fill="' + INK + '"/><circle cx="94" cy="138" r="2.5" fill="' + INK + '"/>' +
      // head
      '<circle cx="80" cy="70" r="34" fill="#F2C9A0"' + S(4) + "/>" +
      '<path d="M48 62 q2 -30 32 -32 q30 2 32 32 q-10 -14 -32 -14 q-22 0 -32 14 z" fill="#5A3A22"' + S(3) + "/>" +
      // the green eyeshade visor
      '<path d="M44 52 q36 -18 72 0 l6 10 q-42 -16 -84 0 z" fill="#3FA66B" fill-opacity="0.9"' + S(3.5) + "/>" +
      // round glasses and eyes
      '<g class="eyes">' + dot(66, 72, 3.6) + dot(94, 72, 3.6) + "</g>" +
      '<circle cx="66" cy="72" r="10" fill="none"' + S(3) + '/><circle cx="94" cy="72" r="10" fill="none"' + S(3) + '/><path d="M76 72 h8" fill="none"' + S(3) + "/>" +
      brows + mouth;
    // left arm: a rubber stamp
    out += limb(44, 128, 24, 112) + '<rect x="12" y="78" width="12" height="22" rx="4" fill="#FF5A4E"' + S(3) + '/><rect x="6" y="98" width="24" height="10" rx="2" fill="#2B2B2B"' + S(3) + "/>" + hand(24, 110);
    // right arm: what she holds
    out += limb(116, 128, 132, 110);
    if (hold === "box") {
      out += '<rect x="118" y="66" width="48" height="42" rx="6" fill="#F2C9A0"' + S(4) + "/>" +
        '<text x="142" y="94" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (label.length > 3 ? 15 : 18) + '" fill="' + INK + '">' + esc(label || "42") + "</text>";
    } else if (hold === "paper") {
      out += '<path d="M116 64 h46 v44 h-46 z" fill="#FFFFFF"' + S(3.5) + '/><path d="M116 64 l23 22 l23 -22" fill="none"' + S(3) + "/>" +
        (label ? '<text x="139" y="104" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="12" fill="' + INK + '">' + esc(label) + "</text>" : "");
    } else {
      out += '<path d="M118 60 h44 v50 l-6 -4 l-6 4 l-6 -4 l-6 4 l-6 -4 l-6 4 l-8 -4 z" fill="#FFE1E1" stroke="' + INK + '" stroke-width="3.5" stroke-dasharray="7 4" stroke-linejoin="round"/>' +
        '<text x="140" y="84" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="22" fill="' + INK + '">!</text>' +
        (label ? '<text x="140" y="103" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">' + esc(label.slice(0, 4)) + "</text>" : '<path d="M126 98 h28" fill="none"' + S(2.5) + "/>");
    }
    out += hand(132, 110) + "</g>";
    return out;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
