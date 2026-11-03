/* JavaScript book, chapter 19 additions ("Toggles and Invisible Ink"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch19.html. It adds three prop characters and no widget, so it claims nothing
   about program output (every output on the page comes from the engine's captured terminals and widgets).

   data-char="switchpanel"  A property's control panel: one row per property, three toggles per row for the
                            property flags writable (W), enumerable (E) and configurable (C).
                            data-rows  = comma-separated "name:WEC" with 1 = on and 0 = off, e.g. "title:111,seats:011".
                            data-label = the object's name on the plate at the top, e.g. "show".
                            data-state = "frozen" adds a FROZEN badge and a dashed outline (the words carry the state).
                            Every toggle says ON or OFF in words, and its knob sits right (on) or left (off), so the state
                            never depends on colour.
   data-char="inkkey"       An invisible-ink key: a symbol used as a property key. Its outline is dashed with little
                            sparkles. data-label = the tag under it (e.g. "Symbol(note)"); data-teeth = a pattern of 1/0
                            (default "1011") so two keys that look alike can be told apart by their teeth.
   data-char="inkcab"       A cabinet (an object) whose ordinary drawers are drawn solid and whose symbol-keyed drawers are
                            drawn dashed with an "invisible ink" note and a key hole. data-keys = ordinary drawers,
                            data-ink = symbol drawers, data-label = the plate at the top. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch19.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111", MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';

  function list(el, attr) { return (el.getAttribute(attr) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function fit(text, max, big, small) { return Math.max(small, Math.min(big, max / (Math.max(1, text.length) * 0.62))); }

  /* ---------- switchpanel ---------- */
  function rowsOf(el) { return list(el, "data-rows").slice(0, 5).map(function (r) { var i = r.lastIndexOf(":"); return { name: r.slice(0, i), bits: (r.slice(i + 1) + "000").slice(0, 3) }; }); }
  var COLS = [190, 262, 334];
  L.cast.switchpanel = { vb: function (el) { return "0 0 380 " + (104 + rowsOf(el).length * 50); }, draw: function (el) {
    var rows = rowsOf(el), label = el.getAttribute("data-label") || "", frozen = el.getAttribute("data-state") === "frozen";
    var h = 92 + rows.length * 50, line = frozen ? ' stroke="' + INK + '" stroke-width="4" stroke-dasharray="10 6" stroke-linejoin="round"' : S(4);
    var out = "<g>";   // a reference diagram: no idle bob, so its labels hold still
    out += '<rect x="6" y="6" width="368" height="' + h + '" rx="16" fill="' + (frozen ? "#DDE8FF" : "#F4F1EA") + '"' + line + "/>";
    // name plate
    if (label) {
      var fs = fit(label, 170, 20, 13), w = Math.min(220, label.length * fs * 0.62 + 26);
      out += '<rect x="18" y="16" width="' + w.toFixed(1) + '" height="32" rx="7" fill="#FFFFFF"' + S(3) + "/>" +
        '<text x="' + (18 + w / 2).toFixed(1) + '" y="38" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>";
    }
    if (frozen) {
      out += '<rect x="250" y="14" width="114" height="34" rx="8" fill="#FFFFFF"' + S(3) + "/>" +
        '<path d="M268 22 v18 M260 26 l16 10 M276 26 l-16 10" fill="none"' + S(2.5) + "/>" +
        '<text x="320" y="38" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="21" letter-spacing="1.5" fill="' + INK + '">FROZEN</text>';
    }
    // column heads: W E C
    ["W", "E", "C"].forEach(function (c, i) {
      out += '<circle cx="' + COLS[i] + '" cy="72" r="14" fill="#FFFFFF"' + S(3) + "/>" +
        '<text x="' + COLS[i] + '" y="79" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="20" fill="' + INK + '">' + c + "</text>";
    });
    rows.forEach(function (r, ri) {
      var y = 96 + ri * 50;
      out += '<path d="M18 ' + (y - 4) + ' H362" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="3 5"/>';
      var fs = fit(r.name, 126, 18, 11);
      out += '<text x="22" y="' + (y + 27) + '" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(r.name) + "</text>";
      for (var i = 0; i < 3; i++) {
        var on = r.bits.charAt(i) === "1", cx = COLS[i], x0 = cx - 33;
        out += '<rect x="' + x0 + '" y="' + (y + 6) + '" width="66" height="30" rx="15" fill="' + (on ? "#C9F2D9" : "#FFFFFF") + '"' + S(3) + (on ? "" : ' stroke-dasharray="5 4"') + "/>";
        out += '<circle cx="' + (on ? cx + 18 : cx - 18) + '" cy="' + (y + 21) + '" r="11" fill="' + (on ? "#111111" : "#F3F3F3") + '"' + S(2.5) + "/>";
        out += '<text x="' + (on ? cx - 10 : cx + 10) + '" y="' + (y + 27) + '" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="16" fill="' + INK + '">' + (on ? "ON" : "OFF") + "</text>";
      }
    });
    return out + "</g>";
  } };

  /* ---------- inkkey ---------- */
  L.cast.inkkey = { vb: "0 0 200 170", draw: function (el) {
    var label = el.getAttribute("data-label") || "Symbol()", teeth = (el.getAttribute("data-teeth") || "1011").replace(/[^01]/g, "").slice(0, 6) || "1011";
    var dash = ' stroke="' + INK + '" stroke-width="4" stroke-dasharray="8 5" stroke-linecap="round" stroke-linejoin="round"';
    var out = '<g class="bob">';
    // sparkles: it's written in invisible ink
    [[22, 20], [96, 14], [34, 92]].forEach(function (p) { out += '<path d="M' + p[0] + " " + (p[1] - 8) + " v16 M" + (p[0] - 8) + " " + p[1] + ' h16" fill="none"' + S(2.5) + "/>"; });
    // bow (the ring you hold)
    out += '<circle cx="56" cy="56" r="30" fill="#DDE8FF"' + dash + "/>";
    out += '<circle cx="56" cy="56" r="11" fill="#FFFFFF"' + S(3) + "/>";
    // shaft
    out += '<path d="M86 50 H186 V62 H86 Z" fill="#DDE8FF"' + dash + "/>";
    // teeth: one notch per bit
    for (var i = 0; i < teeth.length; i++) {
      var x = 112 + i * 14, d = teeth.charAt(i) === "1" ? 20 : 10;
      out += '<path d="M' + x + " 62 v" + d + " h9 v-" + d + '" fill="#DDE8FF"' + S(3) + "/>";
    }
    // tag
    var fs = fit(label, 176, 17, 11), w = Math.min(190, label.length * fs * 0.62 + 20);
    out += '<path d="M56 86 V112" fill="none"' + S(2.5) + "/>";
    out += '<rect x="' + (100 - w / 2).toFixed(1) + '" y="112" width="' + w.toFixed(1) + '" height="30" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
      '<text x="100" y="133" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>";
    return out + "</g>";
  } };

  /* ---------- inkcab ---------- */
  function cabRows(el) { return list(el, "data-keys").slice(0, 4).map(function (k) { return { k: k, ink: false }; }).concat(list(el, "data-ink").slice(0, 3).map(function (k) { return { k: k, ink: true }; })); }
  L.cast.inkcab = { vb: function (el) { return "0 0 240 " + (78 + cabRows(el).length * 52); }, draw: function (el) {
    var rows = cabRows(el), label = el.getAttribute("data-label") || "";
    var h = 56 + rows.length * 52;
    var out = "<g>";   // a reference diagram: no idle bob
    out += '<rect x="8" y="10" width="224" height="' + h + '" rx="10" fill="#FFF6CC"' + S(4) + "/>";
    if (label) {
      var fs = fit(label, 150, 19, 12), w = Math.min(190, label.length * fs * 0.62 + 24);
      out += '<rect x="' + (120 - w / 2).toFixed(1) + '" y="18" width="' + w.toFixed(1) + '" height="30" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
        '<text x="120" y="39" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>";
    }
    rows.forEach(function (r, i) {
      var y = 58 + i * 52;
      if (r.ink) {
        out += '<rect x="20" y="' + y + '" width="200" height="44" rx="6" fill="#DDE8FF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5"/>';
        out += '<circle cx="200" cy="' + (y + 16) + '" r="5" fill="' + INK + '"/><path d="M200 ' + (y + 18) + " v10" + '" fill="none"' + S(3) + "/>";
        var fs1 = fit(r.k, 150, 15, 10);
        out += '<text x="30" y="' + (y + 19) + '" ' + MONO + ' font-size="' + fs1.toFixed(1) + '" fill="' + INK + '">' + esc(r.k) + "</text>";
        out += '<text x="30" y="' + (y + 37) + '" font-family="Shantell Sans, cursive" font-weight="600" font-style="italic" font-size="13" fill="' + INK + '">invisible ink</text>';
      } else {
        out += '<rect x="20" y="' + y + '" width="200" height="44" rx="6" fill="#FFFFFF"' + S(3) + "/>";
        out += '<rect x="100" y="' + (y + 30) + '" width="40" height="7" rx="3" fill="#111111"/>';
        var fs2 = fit(r.k, 170, 17, 11);
        out += '<text x="120" y="' + (y + 22) + '" text-anchor="middle" ' + MONO + ' font-size="' + fs2.toFixed(1) + '" fill="' + INK + '">' + esc(r.k) + "</text>";
      }
    });
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
