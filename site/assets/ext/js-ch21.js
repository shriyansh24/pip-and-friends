/* JavaScript book, chapter 21 additions ("Bricks and Tray Stacks"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch21.html. It adds two prop characters and no widget, so it claims nothing
   about program output (every output on the page comes from the engine's captured terminals and widgets).

   data-char="traystack"  A stack of cafeteria trays: the call stack. One tray per function call still in progress.
                          data-items = comma-separated tray labels, TOP FIRST, e.g. "factorial(1),factorial(2),factorial(3)".
                          data-note  = optional words on a sticky note beside the top tray (e.g. "running").
                          data-state = "topple" draws the top trays sliding off with a TOO MANY TRAYS sign (stack overflow);
                                       the words carry the state, not the colour.
   data-char="toybrick"   A building brick: a pure function. data-label = the call on its side (e.g. "price(2, 5)"),
                          data-gives = what it always gives (drawn on a tag under it, e.g. "35"),
                          data-color = yellow | sky | mint | pink (decorative; the words are what matter). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch21.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111", MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';
  var FILL = { yellow: "#FFD60A", sky: "#DDE8FF", mint: "#C9F2D9", pink: "#FFE1E1", cream: "#FFF6CC" };

  function list(el, attr) { return (el.getAttribute(attr) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function fit(text, max, big, small) { return Math.max(small, Math.min(big, max / (Math.max(1, text.length) * 0.62))); }

  /* ---------- traystack ---------- */
  var TRAY_H = 46;
  L.cast.traystack = { vb: function (el) { return "0 0 340 " + (70 + Math.max(1, list(el, "data-items").slice(0, 7).length) * TRAY_H + 34); }, draw: function (el) {
    var items = list(el, "data-items").slice(0, 7), note = el.getAttribute("data-note") || "", topple = el.getAttribute("data-state") === "topple";
    var n = items.length, baseY = 70 + n * TRAY_H, out = '<g class="bob">';
    // the counter the trays sit on
    out += '<rect x="20" y="' + (baseY + 4) + '" width="300" height="22" rx="4" fill="#F4F1EA"' + S(3.5) + "/>";
    out += '<text x="170" y="' + (baseY + 21) + '" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="16" letter-spacing="1.5" fill="' + INK + '">CALL STACK</text>';
    // trays, bottom first so the top one is drawn last
    for (var i = n - 1; i >= 0; i--) {
      var y = 70 + i * TRAY_H, top = i === 0, shift = 0, tilt = 0;
      if (topple && i < 2) { shift = (2 - i) * 22; tilt = (2 - i) * 6; }
      var tf = shift || tilt ? ' transform="translate(' + shift + " 0) rotate(" + tilt + " 170 " + (y + 20) + ')"' : "";
      out += "<g" + tf + ">";
      out += '<path d="M34 ' + (y + 6) + " L306 " + (y + 6) + " L292 " + (y + 38) + " L48 " + (y + 38) + ' Z" fill="' + (top ? "#FFD60A" : "#DDE8FF") + '"' + S(3.5) + "/>";
      out += '<path d="M56 ' + (y + 31) + " H284" + '" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="4 5"/>';
      var fs = fit(items[i], 220, 17, 16);   // labels stay 12px+ at the drawn sizes
      out += '<text x="170" y="' + (y + 27) + '" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(items[i]) + "</text>";
      out += "</g>";
    }
    if (note && n && !topple) {
      var nw = Math.min(150, note.length * 9 + 24);
      out += '<path d="M' + (306) + " " + (92) + " L" + (330 - nw / 2) + " 50" + '" fill="none"' + S(2.5) + "/>";
      out += '<rect x="' + (334 - nw) + '" y="14" width="' + nw + '" height="34" rx="6" fill="#FFFFFF"' + S(3) + "/>";
      out += '<text x="' + (334 - nw / 2) + '" y="37" text-anchor="middle" font-family="Shantell Sans, cursive" font-weight="700" font-size="16" fill="' + INK + '">' + esc(note) + "</text>";
    }
    if (topple) {
      out += '<rect x="20" y="10" width="200" height="38" rx="8" fill="#FFE1E1" stroke="' + INK + '" stroke-width="3.5" stroke-dasharray="9 5"/>';
      out += '<text x="120" y="37" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="21" letter-spacing="1.5" fill="' + INK + '">TOO MANY TRAYS!</text>';
      out += '<path d="M318 64 l10 -14 M328 82 l12 -6 M312 48 l2 -16" fill="none"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------- toybrick ---------- */
  L.cast.toybrick = { vb: "0 0 230 170", draw: function (el) {
    var label = el.getAttribute("data-label") || "f(x)", outv = el.getAttribute("data-gives") || "", fill = FILL[el.getAttribute("data-color")] || FILL.yellow;
    var out = '<g class="bob">';
    // studs on top
    [44, 92, 140, 188].forEach(function (x) {
      out += '<rect x="' + (x - 16) + '" y="14" width="32" height="18" rx="5" fill="' + fill + '"' + S(3) + "/>";
      out += '<path d="M' + (x - 9) + " 20 h10" + '" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round"/>';
    });
    // body
    out += '<rect x="12" y="30" width="206" height="72" rx="8" fill="' + fill + '"' + S(4) + "/>";
    out += '<path d="M24 92 H206" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="3 6"/>';
    var fs = fit(label, 180, 20, 16);
    out += '<text x="115" y="73" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>";
    if (outv) {
      var ofs = fit(outv, 120, 20, 16), w = Math.min(170, outv.length * ofs * 0.62 + 50);
      out += '<path d="M115 102 V122" fill="none"' + S(3) + "/>";
      out += '<rect x="' + (115 - w / 2).toFixed(1) + '" y="122" width="' + w.toFixed(1) + '" height="36" rx="8" fill="#FFFFFF"' + S(3) + "/>";
      out += '<text x="115" y="147" text-anchor="middle" ' + MONO + ' font-size="' + ofs.toFixed(1) + '" fill="' + INK + '">→ ' + esc(outv) + "</text>";
    }
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
