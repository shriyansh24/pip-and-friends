/* Chapter 17 extension: "Machines as Parcels" (functions as values, lambda, key functions, *args/**kwargs, / and *,
   the mutable default trap).
   Adds four drawings to the cast, registered with the comic engine. They are pictures only: none of them claims an
   output, so none needs a parity badge. Every use on the page has a .sr-only sentence beside it.
   (1) machineparcel  a cardboard parcel with a little machine peeking out: "a function handed over without running it".
                data-label = the name on the parcel's tag (default "f").
   (2) tipjar   a glass tip jar with coins: the one default list a function keeps. data-coins = "1,2" (up to 5 coins),
                data-label = the jar's tag, data-fresh="true" draws a sparkle for a brand-new jar.
   (3) card     a recipe card: the function handed to another cook. data-label = the recipe's name.
   (4) hopper   a big machine with a small machine dropped into its hopper: sorted() fed a key function.
                data-label = the big machine, data-inner = the small one. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch17.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function txt(x, y, t, size, weight) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="' + (weight || 800) + '" font-size="' + (size || 16) + '" fill="' + INK + '">' + esc(t) + "</text>"; }
  function fit(t, room, max) { return Math.max(9, Math.min(max, Math.floor(room / Math.max(1, String(t).length) * 1.6))); }

  // A small function machine: hopper, yellow body, output chute. (x, y) is the top-left of the body.
  function miniMachine(x, y, w, label) {
    var h = Math.round(w * 0.62);
    return '<path d="M' + (x - 26) + " " + (y - 18) + " h28 l-6 14 h-16 z" + '" fill="#DDE8FF"' + S(3) + "/>" +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="#FFD60A"' + S(3.5) + "/>" +
      '<rect x="' + (x + 8) + '" y="' + (y + h - 26) + '" width="' + (w - 16) + '" height="20" rx="4" fill="#FFFFFF"' + S(2.5) + "/>" +
      txt(x + w / 2, y + h - 11, label, fit(label, w - 20, 14)) +
      '<circle cx="' + (x + w * 0.3) + '" cy="' + (y + 14) + '" r="6" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<circle cx="' + (x + w * 0.7) + '" cy="' + (y + 14) + '" r="6" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<path d="M' + (x + w) + " " + (y + h - 16) + " h16" + '" fill="none"' + S(3) + "/>";
  }

  /* ---------------- parcel ---------------- */
  C.machineparcel = { vb: "0 0 200 190", draw: function (el) {
    var lab = el.getAttribute("data-label") || "f", out = '<g class="bob">';
    // the little machine peeking over the flaps
    out += '<g transform="translate(0,0)">' + miniMachine(78, 24, 76, "") + "</g>";
    // box
    out += '<path d="M28 78 h144 v92 h-144 z" fill="#F2D7AE"' + S(4) + "/>";
    out += '<path d="M28 78 l-14 -20 h60 l14 20 z M172 78 l14 -20 h-60 l-14 20 z" fill="#E8C48E"' + S(3.5) + "/>";
    out += '<path d="M88 78 h24 v92 h-24 z" fill="#FFF6CC"' + S(3) + "/>";                                  // tape
    out += '<path d="M40 150 l10 -10 M52 150 l10 -10" fill="none" stroke="#2B2B2B" stroke-width="2.5" stroke-linecap="round"/>'; // "this way up"
    // tag on a string
    out += '<path d="M150 104 q16 -4 22 10" fill="none"' + S(2.5) + "/>";
    var tw = Math.max(64, String(lab).length * 11 + 20);
    out += '<rect x="' + (186 - tw) + '" y="114" width="' + tw + '" height="30" rx="6" fill="#FFFFFF"' + S(3) + "/>" + txt(186 - tw / 2, 135, lab, fit(lab, tw - 10, 17));
    out += '<g class="eyes">' + dot(58, 110, 4) + dot(76, 110, 4) + "</g>" + '<path d="M60 124 q8 7 16 0" fill="none"' + S(3) + "/>";
    return out + "</g>";
  } };

  /* ---------------- tip jar ---------------- */
  C.tipjar = { vb: "0 0 170 200", draw: function (el) {
    var coins = (el.getAttribute("data-coins") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 5);
    var lab = el.getAttribute("data-label") || "", fresh = el.getAttribute("data-fresh") === "true", out = '<g class="bob">';
    out += '<rect x="44" y="26" width="82" height="18" rx="5" fill="#C8955E"' + S(3.5) + "/>";                    // lid
    out += '<path d="M40 50 q-8 6 -8 18 v96 q0 22 22 22 h62 q22 0 22 -22 v-96 q0 -12 -8 -18 z" fill="#EEF4FF"' + S(4) + "/>";
    out += '<path d="M44 70 v86" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>';          // shine
    var spots = [[66, 160], [104, 160], [85, 136], [62, 112], [106, 112]];
    coins.forEach(function (c, i) {
      var p = spots[i];
      out += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="17" ry="13" fill="#FFD60A"' + S(3) + "/>" + txt(p[0], p[1] + 5, c, c.length > 2 ? 11 : 15);
    });
    if (!coins.length) out += txt(85, 150, "empty", 13, 700);
    if (lab) { var tw = Math.max(56, lab.length * 10 + 18); out += '<rect x="' + (85 - tw / 2) + '" y="74" width="' + tw + '" height="24" rx="5" fill="#FFFFFF"' + S(2.5) + "/>" + txt(85, 91, lab, fit(lab, tw - 8, 14)); }
    if (fresh) out += '<path d="M146 30 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#FFF6CC"' + S(2.5) + "/>";
    return out + "</g>";
  } };

  /* ---------------- recipe card ---------------- */
  C.card = { vb: "0 0 190 140", draw: function (el) {
    var lab = el.getAttribute("data-label") || "recipe", out = '<g class="bob">';
    out += '<path d="M14 18 h162 v108 h-162 z" fill="#FFFFFF"' + S(4) + ' transform="rotate(-4 95 72)"/>';
    out += '<g transform="rotate(-4 95 72)">' +
      '<path d="M14 46 h162" fill="none" stroke="#B00020" stroke-width="2.5"/>' +
      txt(95, 38, "RECIPE: " + lab, fit("RECIPE: " + lab, 150, 15)) +
      '<path d="M30 66 h120 M30 84 h96 M30 102 h110" fill="none" stroke="#2B2B2B" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="140" y="92" width="24" height="24" rx="4" fill="#FFD60A"' + S(2.5) + "/></g>";
    return out + "</g>";
  } };

  /* ---------------- machine with a machine in its hopper ---------------- */
  C.hopper = { vb: "0 0 300 230", draw: function (el) {
    var big = el.getAttribute("data-label") || "sorted()", inner = el.getAttribute("data-inner") || "key", out = "";
    // big machine (same shapes as the engine's machine, larger)
    out += '<path d="M14 92 h80 l-16 30 h-48 z" fill="#DDE8FF"' + S(4) + "/>";
    out += '<rect x="60" y="116" width="200" height="104" rx="14" fill="#FFD60A"' + S(4) + "/>";
    out += '<circle cx="104" cy="146" r="13" fill="#FFFFFF"' + S(3) + '/><circle cx="216" cy="146" r="13" fill="#FFFFFF"' + S(3) + "/>";
    out += '<rect x="80" y="170" width="160" height="38" rx="7" fill="#FFFFFF"' + S(3) + "/>" + txt(160, 196, big, fit(big, 150, 22));
    out += '<path d="M260 190 h30 l-6 -10 M290 190 l-6 10" fill="none"' + S(3.5) + "/>";
    // small machine dropping into the hopper, with motion lines
    out += '<g class="pop-me">' + miniMachine(40, 18, 80, inner) + "</g>";
    out += '<path d="M130 20 l12 -6 M132 36 h14 M130 52 l12 6" fill="none"' + S(3) + "/>";
    out += '<path d="M54 86 v10 l-5 -5 M54 96 l5 -5" fill="none"' + S(3) + "/>";
    return out;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
