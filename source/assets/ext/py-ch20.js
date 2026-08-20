/* Chapter 20 extension: "Sockets and Stamped Forms".
   Adds cast drawings in Pip's house style (the cookie is the engine's, comic-critters.js). Nothing here claims any program output, so there is no parity badge; every
   picture that carries meaning has a .sr-only sentence on the page.
     sockets  the back panel of an appliance (an object) with up to 4 sockets (special methods). Each built-in cable
              (len(), for, [], +, ...) hangs above its socket.
              data-label = the object's name plate on the bottom edge (<= 8 chars).
              data-plugs = "cable:__socket__,..." sockets that exist; the cable's plug is pushed in (solid outline).
              data-empty = "cable:__socket__,..." sockets that are missing; the plate is dashed and crossed out and the
              cable's plug hangs loose. Plugged sockets come first, then empty ones, in the order given.
     form     a pre-printed form (a dataclass): a title band, one printed row per field with the value written in by
              hand, and an inked stamp in the corner listing what the stamp generated.
              data-title (<= 10 chars), data-fields = "x: int,y: int = 0" (<= 4), data-values = "3,4" (may be empty),
              data-stamp = stamp text (default "@dataclass"), data-made = small print under the stamp.
     stamp    a rubber stamp with a wooden knob; its rubber face carries data-label (default "@dataclass").
   Labels that must stay readable on phones carry class="lbl-grow" (comic.js fitLabels): drawn small, they grow toward
   12px and are squeezed to data-fitw units if they then get too wide. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch20.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111", STAMP_INK = "#B00020";
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function list(el, attr) {
    var raw = el.getAttribute(attr);
    if (!raw) return [];
    return raw.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /* ---------------- the back of an appliance: sockets are special methods ---------------- */
  // Layout (viewBox 400 x 236): cable tags along the top (y 4..32), cables down to the plugs, the appliance body from
  // y 92, socket plates at y 120..170, socket names under the plates at y 192.
  C.sockets = { vb: "0 0 400 236", draw: function (el) {
    var label = (el.getAttribute("data-label") || "object").slice(0, 8);
    var slots = [];
    list(el, "data-plugs").forEach(function (s) { var p = s.split(":"); slots.push({ cable: p[0], socket: p[1] || "", on: true }); });
    list(el, "data-empty").forEach(function (s) { var p = s.split(":"); slots.push({ cable: p[0], socket: p[1] || "", on: false }); });
    slots = slots.slice(0, 4);
    var n = Math.max(1, slots.length), step = 380 / n;
    var out = '<g class="bob">' +
      // body, feet and name plate
      '<rect x="10" y="92" width="380" height="122" rx="18" fill="#DDE8FF"' + S(4) + "/>" +
      '<path d="M40 214 v12 h30 v-12 M330 214 v12 h30 v-12" fill="#FFFFFF"' + S(3.5) + "/>";
    // the name plate hangs on the body's bottom edge, centred between the feet, clear of every cable
    var pw = label.length * 10.5 + 22;
    out += '<rect x="' + (200 - pw / 2).toFixed(1) + '" y="200" width="' + pw.toFixed(1) + '" height="28" rx="8" fill="#FFFFFF"' + S(3) + "/>" +
      '<text x="200" y="220" text-anchor="middle" ' + MONO + ' font-size="17" fill="' + INK + '">' + esc(label) + "</text>";
    slots.forEach(function (s, i) {
      var cx = 10 + step * (i + 0.5), tw = Math.max(46, s.cable.length * 9.6 + 16);
      // the socket plate
      if (s.on) {
        out += '<rect x="' + (cx - 30) + '" y="120" width="60" height="50" rx="10" fill="#FFFFFF"' + S(3.5) + "/>";
      } else {
        out += '<rect x="' + (cx - 30) + '" y="120" width="60" height="50" rx="10" fill="#FFFFFF"' + S(3) + ' stroke-dasharray="7 6"/>' +
          '<path d="M' + (cx - 16) + " 131 L" + (cx + 16) + " 159 M" + (cx + 16) + " 131 L" + (cx - 16) + ' 159" fill="none"' + S(3.5) + "/>";
      }
      // the socket's name under the plate
      var fs = s.socket.length > 9 ? 15 : 17;
      out += '<text class="lbl-grow" data-fitw="' + Math.floor(step - 8) + '" x="' + cx + '" y="194" text-anchor="middle" ' + MONO + ' font-size="' + fs + '" fill="' + INK + '">' + esc(s.socket) + "</text>";
      // the cable tag at the top
      out += '<rect x="' + (cx - tw / 2).toFixed(1) + '" y="4" width="' + tw.toFixed(1) + '" height="28" rx="7" fill="#FFF6CC"' + S(2.5) + "/>" +
        '<text class="lbl-grow" data-fitw="' + Math.floor(tw - 6) + '" x="' + cx + '" y="24" text-anchor="middle" ' + MONO + ' font-size="15" fill="' + INK + '">' + esc(s.cable) + "</text>";
      if (s.on) {
        // cable straight down into a plug pushed into the socket
        out += '<path d="M' + cx + " 32 C" + (cx - 14) + " 60 " + (cx + 14) + " 80 " + cx + ' 104" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
          '<rect x="' + (cx - 16) + '" y="104" width="32" height="26" rx="6" fill="#FFD60A"' + S(3.5) + "/>" +
          '<path d="M' + (cx - 7) + " 130 v12 M" + (cx + 7) + ' 130 v12" fill="none"' + S(4) + "/>";
      } else {
        // the cable hangs loose beside the socket, prongs showing, plug tilted
        out += '<path d="M' + cx + " 32 C" + (cx + 22) + " 48 " + (cx + 30) + " 62 " + (cx + 22) + ' 74" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
          '<g transform="rotate(24 ' + (cx + 20) + ' 86)"><rect x="' + (cx + 4) + '" y="74" width="32" height="24" rx="6" fill="#FFD60A"' + S(3.5) + "/>" +
          '<path d="M' + (cx + 13) + " 98 v10 M" + (cx + 27) + ' 98 v10" fill="none"' + S(4) + "/></g>";
      }
    });
    return out + "</g>";
  } };

  /* ---------------- a pre-printed form: a dataclass ---------------- */
  C.form = { vb: "0 0 300 260", draw: function (el) {
    var title = (el.getAttribute("data-title") || "Record").slice(0, 10);
    var fields = list(el, "data-fields").slice(0, 4), values = (el.getAttribute("data-values") || "").split(",");
    var stampText = el.getAttribute("data-stamp") || "@dataclass", made = el.getAttribute("data-made") || "";
    var out = '<g class="bob">' +
      '<path d="M14 8 H252 L286 42 V252 H14 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M252 8 V42 H286" fill="#F4F1EA"' + S(3) + "/>" +
      '<rect x="28" y="20" width="210" height="34" rx="6" fill="#FFD60A"' + S(3) + "/>" +
      '<text class="lbl-grow" data-fitw="200" x="133" y="44" text-anchor="middle" ' + MONO + ' font-size="19" fill="' + INK + '">' + esc(title) + "</text>";
    fields.forEach(function (f, i) {
      var y = 86 + i * 36, v = (values[i] || "").trim();
      out += '<text class="lbl-grow" data-fitw="190" x="30" y="' + y + '" ' + MONO + ' font-size="18" fill="' + INK + '">' + esc(f) + "</text>" +
        '<path d="M30 ' + (y + 9) + ' H268" fill="none" stroke="' + INK + '" stroke-width="2" stroke-dasharray="2 5"/>';
      if (v) out += '<text x="266" y="' + (y + 2) + '" text-anchor="end" font-family="Shantell Sans, cursive" font-weight="700" font-size="22" fill="#0B3FA8">' + esc(v) + "</text>";
    });
    // the stamp mark: a tilted double-ruled box in stamp ink, with its words
    var sy = 86 + fields.length * 36 + 4;
    out += '<g transform="rotate(-8 150 ' + (sy + 30) + ')">' +
      '<rect x="50" y="' + sy + '" width="200" height="' + (made ? 58 : 38) + '" rx="8" fill="none" stroke="' + STAMP_INK + '" stroke-width="4"/>' +
      '<rect x="56" y="' + (sy + 6) + '" width="188" height="' + (made ? 46 : 26) + '" rx="5" fill="none" stroke="' + STAMP_INK + '" stroke-width="1.5"/>' +
      '<text class="lbl-grow" data-fitw="180" x="150" y="' + (sy + 26) + '" text-anchor="middle" ' + MONO + ' font-size="17" fill="' + STAMP_INK + '">' + esc(stampText) + "</text>";
    if (made) out += '<text class="lbl-grow" data-fitw="182" x="150" y="' + (sy + 46) + '" text-anchor="middle" ' + MONO + ' font-size="13" fill="' + STAMP_INK + '">' + esc(made) + "</text>";
    return out + "</g></g>";
  } };

  /* ---------------- a rubber stamp ---------------- */
  C.stamp = { vb: "0 0 180 190", draw: function (el) {
    var label = (el.getAttribute("data-label") || "@dataclass").slice(0, 11);
    return '<g class="bob">' +
      '<ellipse cx="90" cy="30" rx="30" ry="24" fill="#B97A45"' + S(4) + "/>" +
      '<path d="M78 52 h24 v40 h-24 z" fill="#B97A45"' + S(4) + "/>" +
      '<rect x="22" y="92" width="136" height="40" rx="8" fill="#FFD60A"' + S(4) + "/>" +
      '<g class="eyes">' + dot(76, 110, 4) + dot(104, 110, 4) + "</g>" +
      '<path d="M83 120 q7 6 14 0" fill="none"' + S(3) + "/>" +
      '<rect x="14" y="132" width="152" height="40" rx="6" fill="#FFFFFF"' + S(4) + "/>" +
      '<text x="90" y="158" text-anchor="middle" ' + MONO + ' font-size="' + (label.length > 9 ? 16 : 18) + '" fill="' + STAMP_INK + '">' + esc(label) + "</text>" +
      "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
