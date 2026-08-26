/* Chapter 21 extension: "Labels and Sorting Chutes".
   Adds two cast members drawn in code in Pip's house style. Nothing here claims any program output, so there is no
   parity badge; every picture that carries meaning has a .sr-only sentence on the page.
     mypyinspector  the label inspector at the warehouse door: a static type checker such as mypy. Peaked cap with a name
                band, round glasses, a clipboard and a magnifying glass. (Renamed from "inspector": comic-critters.js now has
                the Rust book's different hard-hat inspector under that name.) The cap text is a lbl-grow label, so it grows
                toward 12px when the drawing is small.
                data-label = text on the cap band (<= 7 chars, default "mypy"); data-mood = normal | happy | stern.
     (emptytrain, the empty string, is the engine's: comic-critters.js since engine pass 3; first drawn in Chapter 4.)
     parcel     a cardboard parcel with a paper type label tied on: a value with a type hint.
                data-label = the label text (<= 10 chars); data-mood = happy | o (a small face on the box);
                data-x = "true" stamps a big cross on the label (a label that does not match what is inside). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch21.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* ---------------- the inspector: a static type checker ---------------- */
  C.mypyinspector = { vb: "0 0 170 200", draw: function (el) {
    var label = (el.getAttribute("data-label") || "mypy").slice(0, 7), mood = el.getAttribute("data-mood") || "normal";
    var band = Math.min(96, Math.max(56, label.length * 13 + 16));
    var brows = mood === "stern" ? '<path d="M58 70 l16 5 M110 70 l-16 5" fill="none"' + S(4) + "/>"
      : '<path d="M58 68 q8 -5 16 0 M94 68 q8 -5 16 0" fill="none"' + S(3.5) + "/>";
    var mouth = mood === "happy" ? '<path d="M72 104 q12 11 24 0" fill="none"' + S(4) + "/>"
      : mood === "stern" ? '<path d="M72 108 q12 -8 24 0" fill="none"' + S(4) + "/>"
      : '<path d="M74 105 h20" fill="none"' + S(4) + "/>";
    return '<g class="bob">' +
      // legs and shoes
      '<rect x="66" y="168" width="14" height="20" rx="4" fill="#3D4B5C"' + S(3) + '/><rect x="90" y="168" width="14" height="20" rx="4" fill="#3D4B5C"' + S(3) + "/>" +
      '<ellipse cx="72" cy="190" rx="12" ry="6" fill="' + INK + '"/><ellipse cx="98" cy="190" rx="12" ry="6" fill="' + INK + '"/>' +
      // coat
      '<path d="M50 124 q34 -10 70 0 l8 50 h-86 z" fill="#C9A66B"' + S(4) + "/>" +
      '<path d="M85 122 V172" fill="none"' + S(3) + "/>" + dot(92, 140, 3) + dot(92, 156, 3) +
      '<path d="M70 122 l15 16 l15 -16" fill="#FFFFFF"' + S(3) + "/>" +
      // left arm with magnifying glass
      '<path d="M54 132 L28 150" fill="none"' + S(8) + '/><path d="M54 132 L28 150" fill="none" stroke="#C9A66B" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M24 146 L12 124" fill="none"' + S(6) + "/>" +
      '<circle cx="14" cy="108" r="15" fill="#DDE8FF"' + S(4) + '/><path d="M8 102 q4 -5 10 -4" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="27" cy="151" r="7" fill="#F3C9A1"' + S(3) + "/>" +
      // right arm with clipboard
      '<path d="M116 132 L138 142" fill="none"' + S(8) + '/><path d="M116 132 L138 142" fill="none" stroke="#C9A66B" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="128" y="112" width="38" height="50" rx="4" fill="#B97A45"' + S(3.5) + '/><rect x="133" y="120" width="28" height="38" fill="#FFFFFF"' + S(2) + "/>" +
      '<rect x="140" y="108" width="14" height="8" rx="2" fill="#7A8794"' + S(2) + "/>" +
      '<path d="M136 128 l3 3 l5 -6 M136 139 l3 3 l5 -6 M136 150 l3 3 l5 -6" fill="none"' + S(2) + "/>" +
      '<path d="M148 128 h9 M148 139 h9 M148 150 h9" fill="none"' + S(2) + "/>" +
      '<circle cx="139" cy="143" r="7" fill="#F3C9A1"' + S(3) + "/>" +
      // head
      '<circle cx="85" cy="86" r="34" fill="#F3C9A1"' + S(4) + "/>" +
      // glasses
      '<g class="eyes"><circle cx="70" cy="84" r="11" fill="#FFFFFF"' + S(3.5) + '/><circle cx="100" cy="84" r="11" fill="#FFFFFF"' + S(3.5) + "/>" +
      dot(70, 85, 4) + dot(100, 85, 4) + "</g>" +
      '<path d="M81 84 h8" fill="none"' + S(3) + "/>" + brows + mouth +
      // cap
      '<path d="M50 62 q35 -40 70 0 z" fill="#2C4A7A"' + S(4) + "/>" +
      '<path d="M44 62 h82 q4 8 -6 10 h-70 q-10 -2 -6 -10 z" fill="#111111"/>' +
      '<rect x="' + (85 - band / 2) + '" y="36" width="' + band + '" height="24" rx="5" fill="#FFD60A"' + S(2.5) + "/>" +
      '<text class="lbl-grow" data-fitw="' + (band - 6) + '" x="85" y="54" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (label.length > 5 ? 13 : 16) + '" fill="' + INK + '">' + esc(label) + "</text>" +
      "</g>";
  } };

  /* ---------------- a parcel with a type label ---------------- */
  C.parcel = { vb: "0 0 150 150", draw: function (el) {
    var label = (el.getAttribute("data-label") || "int").slice(0, 10), mood = el.getAttribute("data-mood") || "";
    var w = Math.min(146, Math.max(56, label.length * 10.2 + 18)), cross = el.getAttribute("data-x") === "true";
    var out = '<g class="bob">' +
      '<path d="M18 52 L75 34 L132 52 L132 128 L75 146 L18 128 Z" fill="#D9A86C"' + S(4) + "/>" +
      '<path d="M18 52 L75 70 L132 52 M75 70 V146" fill="none"' + S(3.5) + "/>" +
      '<path d="M45 43 L102 61" fill="none" stroke="#FFF6CC" stroke-width="7"/><path d="M45 43 L102 61" fill="none"' + S(1.5) + ' stroke-dasharray="2 4"/>';
    if (mood) out += '<g class="eyes">' + dot(94, 98, 3.5) + dot(114, 92, 3.5) + "</g>" +
      (mood === "o" ? '<ellipse cx="105" cy="112" rx="4" ry="5" fill="' + INK + '"/>' : '<path d="M96 112 q9 5 17 -4" fill="none"' + S(3) + "/>");
    // the label tag, tied with a string to the top of the box
    out += '<path d="M75 30 L75 50" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' + dot(75, 51, 3.5) +
      '<rect x="' + (75 - w / 2).toFixed(1) + '" y="2" width="' + w.toFixed(1) + '" height="28" rx="6" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<text class="lbl-grow" data-fitw="' + Math.round(w - 8) + '" x="75" y="22" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">' + esc(label) + "</text>";
    if (cross) out += '<path d="M' + (75 - w / 2 + 4) + ' 6 L' + (75 + w / 2 - 4) + ' 26 M' + (75 + w / 2 - 4) + ' 6 L' + (75 - w / 2 + 4) + ' 26" fill="none" stroke="#B00020" stroke-width="4" stroke-linecap="round"/>';
    return out + "</g>";
  } };
  /* ---------------- the empty string: Chapter 4's empty train, copied exactly (py-ch4.js) so the reader meets the same
     picture again; a candidate for comic-critters.js (js-ch5.js has a third version) ---------------- */
})(typeof globalThis !== "undefined" ? globalThis : this);
