/* Chapter 22 extension: "Alarms and Key Cards".
   Adds two props drawn in code in Pip's house style. Nothing here claims any program output, so there is no parity
   badge; every picture that carries meaning has a .sr-only sentence on the page.
     alarmbell  a wall-mounted fire-alarm bell with a name plate: one kind of exception.
                data-label = text on the plate (<= 14 chars); data-ring = "true" adds ring lines and a striking hammer;
                data-mood = calm | ringing (eyes: open dots, or squeezed shut).
     keycard    a hotel key-card slot on a wall, a card and the room's light: a context manager.
                data-room = room number on the card (<= 4 chars); data-state = "in" (card in the slot, light ON with rays)
                or "out" (card lifted out, light OFF drawn with a dashed outline and the word OFF). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch22.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* ---------------- the alarm bell: one kind of exception ---------------- */
  C.alarmbell = { vb: "0 0 170 190", draw: function (el) {
    var label = (el.getAttribute("data-label") || "ALARM").slice(0, 14);
    var ring = el.getAttribute("data-ring") === "true";
    var fs = label.length > 11 ? 16 : 17;   // 12.6px at 126px wide (it was 16, 11.8px); lbl-grow below that
    var plateW = Math.min(164, Math.max(70, label.length * fs * 0.64 + 22));
    var eyes = ring
      ? '<path d="M64 74 l10 5 l-10 5 M106 74 l-10 5 l10 5" fill="none"' + S(3.5) + "/>"
      : dot(70, 79, 5) + dot(100, 79, 5);
    var mouth = ring ? '<ellipse cx="85" cy="100" rx="9" ry="8" fill="' + INK + '"/>' : '<path d="M75 98 q10 8 20 0" fill="none"' + S(3.5) + "/>";
    var lines = ring
      ? '<path d="M22 46 q-12 30 0 60 M10 38 q-16 38 0 76 M148 46 q12 30 0 60 M160 38 q16 38 0 76" fill="none"' + S(4) + "/>"
      : "";
    return '<g class="bob">' + lines +
      // wall plate
      '<rect x="74" y="8" width="22" height="18" rx="4" fill="#7A8794"' + S(3) + "/>" +
      // the bell dome
      '<circle cx="85" cy="84" r="52" fill="#FF5A4E"' + S(4) + "/>" +
      '<circle cx="85" cy="84" r="38" fill="#FFE1E1"' + S(3) + "/>" +
      '<path d="M58 58 q10 -12 26 -14" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>' +
      '<g class="eyes">' + eyes + "</g>" + mouth +
      // the striker
      (ring ? '<path d="M128 112 L146 134" fill="none"' + S(5) + '/><circle cx="148" cy="138" r="8" fill="#FFD60A"' + S(3) + "/>"
            : '<path d="M85 136 V146" fill="none"' + S(5) + '/><circle cx="85" cy="150" r="7" fill="#FFD60A"' + S(3) + "/>") +
      // name plate
      '<rect x="' + (85 - plateW / 2) + '" y="160" width="' + plateW + '" height="26" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
      '<text class="lbl-grow" data-fitw="154" data-cy="173" data-plate="166" x="85" y="' + (178 - (16 - fs) / 3) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" +
      "</g>";
  } };

  /* ---------------- the key card: a context manager ---------------- */
  C.keycard = { vb: "0 0 220 180", draw: function (el) {
    var room = (el.getAttribute("data-room") || "204").slice(0, 4);
    var on = el.getAttribute("data-state") !== "out";
    var cardY = on ? 34 : 4;
    // the light bulb, on the right
    var bulb = on
      ? '<path d="M168 22 v-12 M138 34 l-9 -8 M198 34 l9 -8 M130 62 h-12 M206 62 h12" fill="none"' + S(4) + "/>" +
        '<circle cx="168" cy="62" r="24" fill="#FFD60A"' + S(4) + "/>" +
        '<text x="168" y="68" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="18" fill="' + INK + '">ON</text>'
      : '<circle cx="168" cy="62" r="24" fill="#FFFFFF" stroke="' + INK + '" stroke-width="4" stroke-dasharray="7 6"/>' +
        '<text x="168" y="68" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="17" fill="' + INK + '">OFF</text>';
    return '<g>' +
      // wall
      '<rect x="4" y="22" width="212" height="152" rx="10" fill="#F4F1EA"' + S(3) + "/>" +
      bulb +
      '<rect x="156" y="86" width="24" height="14" rx="3" fill="#7A8794"' + S(3) + "/>" +
      // wire from slot to bulb
      '<path d="M112 120 h56 V100" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="' + (on ? "0" : "5 5") + '"/>' +
      // the slot box
      '<rect x="22" y="78" width="90" height="84" rx="8" fill="#FFFFFF"' + S(4) + "/>" +
      '<rect x="34" y="88" width="66" height="10" rx="4" fill="' + INK + '"/>' +
      '<circle cx="67" cy="140" r="7" fill="' + (on ? "#C9F2D9" : "#FFE1E1") + '"' + S(3) + "/>" +
      '<text x="67" y="126" text-anchor="middle" font-family="Comic Neue, sans-serif" font-weight="700" font-size="17" fill="' + INK + '">' + (on ? "card in" : "no card") + "</text>" +   // 17: 12.6px at 163px wide
      // the card
      '<g class="' + (on ? "" : "bob") + '">' +
        '<rect x="38" y="' + cardY + '" width="58" height="' + (on ? 60 : 64) + '" rx="6" fill="#DDE8FF"' + S(3.5) + "/>" +
        '<rect x="38" y="' + (cardY + 10) + '" width="58" height="9" fill="' + INK + '"/>' +
        '<text class="lbl-grow" data-fitw="52" x="67" y="' + (cardY + 40) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">' + esc(room) + "</text>" +
      "</g>" +
      (on ? '<rect x="30" y="94" width="74" height="6" fill="#FFFFFF"/>' : "") +
      (on ? "" : '<path d="M112 40 l12 -12 l12 12 M124 28 v34" fill="none"' + S(3.5) + "/>") +
      "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
