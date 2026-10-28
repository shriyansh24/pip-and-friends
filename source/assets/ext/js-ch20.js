/* JavaScript book, chapter 20 additions ("Coat Checks and Dispensers"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch20.html. It adds five picture characters and no widget, so it claims nothing about
   program output (every output on the page comes from the engine's captured terminals and widgets).

   data-char="coatcheck"   A Map: a coat-check counter. One hook per entry; the ticket under each coat is the KEY and the
                           coat is the VALUE. data-pairs = comma-separated "key=>value" (at most 4), e.g. "'Ada'=>red,{ }=>hat".
                           data-label = the plate above the rail. data-state="weak" draws a WeakMap: dashed outline, a WEAK
                           plate and an EXIT door (the words carry the state, not colour).
   data-char="guestlist"   A Set: a clipboard with a face, one ticked row per member. data-names = members (at most 5).
                           data-reject = a name that tried to join twice: drawn as a dashed, crossed-out row that says
                           "already listed".
   data-char="dispenser"   An iterator: a candy dispenser. data-value = the text on the candy that just popped out;
                           data-done = "true" draws an empty dispenser with a dashed "undefined" candy. A tag beside it
                           says "done: false" or "done: true" in words. data-label = the plate on the body.
   data-char="storyteller" A generator: an open book with a face. data-says = the yielded value in the speech bubble;
                           data-state = "start" (zzz, not started), "paused" (PAUSED badge) or "done" (THE END badge).
   data-char="venn"        Two overlapping sets. data-op = union | intersection | difference | symdiff; data-a / data-b =
                           the set names; data-left / data-mid / data-right = members in each region (comma-separated).
                           Regions in the result are filled AND hatched, and the members of the result are drawn in bold
                           boxes; others are plain, so the result never depends on colour alone. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch20.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';
  var HAND = 'font-family="Shantell Sans, cursive" font-weight="700"';
  var TITLE = 'font-family="Bangers, Impact, sans-serif" letter-spacing="1.2"';
  var uid = 0;

  function list(el, attr) { return (el.getAttribute(attr) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function fit(text, max, big, small) { return Math.max(small, Math.min(big, max / (Math.max(1, text.length) * 0.62))); }
  function txt(x, y, s, max, big, small, extra) {
    var fs = fit(s, max, big, small);
    var squeeze = s.length * fs * 0.62 > max ? ' textLength="' + max + '" lengthAdjust="spacingAndGlyphs"' : "";
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '"' + squeeze + (extra || "") + ">" + esc(s) + "</text>";
  }
  function plate(cx, y, label, max) {
    var fs = fit(label, max, 19, 12), w = Math.min(max + 20, label.length * fs * 0.62 + 24);
    return '<rect x="' + (cx - w / 2).toFixed(1) + '" y="' + y + '" width="' + w.toFixed(1) + '" height="30" rx="7" fill="#FFFFFF"' + S(3) + "/>" + txt(cx, y + 21, label, max, 19, 12);
  }
  function eyes(x1, x2, y, r) { return '<g class="eyes"><circle cx="' + x1 + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/><circle cx="' + x2 + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/></g>'; }

  /* ---------- coatcheck (Map / WeakMap) ---------- */
  var COATS = ["#FFE1E1", "#DDE8FF", "#C9F2D9", "#FFF6CC"];
  function pairsOf(el) {
    return list(el, "data-pairs").slice(0, 4).map(function (p) { var i = p.indexOf("=>"); return i < 0 ? { k: p, v: "" } : { k: p.slice(0, i).trim(), v: p.slice(i + 2).trim() }; });
  }
  L.cast.coatcheck = {
    vb: function (el) { return "0 0 " + (40 + Math.max(2, pairsOf(el).length) * 132 + (el.getAttribute("data-state") === "weak" ? 86 : 0)) + " 268"; },
    draw: function (el) {
      var pairs = pairsOf(el), n = Math.max(2, pairs.length), weak = el.getAttribute("data-state") === "weak";
      var W = 40 + n * 132, label = el.getAttribute("data-label") || "", out = "<g>";   // a reference diagram: no idle bob
      var dash = weak ? ' stroke-dasharray="10 6"' : "";
      // booth back wall
      out += '<rect x="6" y="20" width="' + (W - 12) + '" height="236" rx="14" fill="#F4F1EA"' + S(4) + dash + "/>";
      // rail
      out += '<path d="M22 58 H' + (W - 22) + '" fill="none"' + S(7) + "/>";
      if (label) out += weak ? plate(104 + (W - 104) / 2, 6, label, Math.min(240, W - 130)) : plate(W / 2, 6, label, Math.min(240, W - 60));
      if (weak) out += '<rect x="22" y="6" width="74" height="30" rx="7" fill="#FFFFFF"' + S(3) + '/><text x="59" y="29" text-anchor="middle" ' + TITLE + ' font-size="21" fill="' + INK + '">WEAK</text>';
      pairs.forEach(function (p, i) {
        var cx = 20 + 66 + i * 132;
        // hook and hanger
        out += '<path d="M' + cx + " 58 v10 q0 8 -7 8" + '" fill="none"' + S(3.5) + "/>";
        out += '<path d="M' + cx + " 72 L" + (cx - 44) + " 98 H" + (cx + 44) + ' Z" fill="none"' + S(3.5) + "/>";
        // coat (the value)
        out += '<path d="M' + (cx - 42) + " 98 L" + (cx - 52) + " 178 H" + (cx + 52) + " L" + (cx + 42) + ' 98 Z" fill="' + COATS[i % 4] + '"' + S(3.5) + dash + "/>";
        out += '<path d="M' + (cx - 16) + " 98 L" + cx + " 120 L" + (cx + 16) + ' 98" fill="none"' + S(3) + "/>";
        if (p.v) out += txt(cx, 152, p.v, 96, 17, 17);   // 17 units, squeezed to fit: stays 12px+ when drawn small
        // ticket (the key): string on a loop from the hanger
        out += '<path d="M' + cx + " 178 v12" + '" fill="none"' + S(2.5) + ' stroke-dasharray="3 3"/>';
        out += '<path d="M' + (cx - 58) + " 190 h116 v36 h-116 z" + '" fill="#FFFFFF"' + S(3) + "/>";
        out += '<circle cx="' + (cx - 48) + '" cy="208" r="4" fill="#FFFFFF"' + S(2.5) + "/>";
        out += txt(cx + 6, 214, p.k, 96, 17, 17);
      });
      // counter top
      out += '<rect x="14" y="236" width="' + (W - 28) + '" height="14" rx="5" fill="#FFD60A"' + S(3) + "/>";
      if (weak) {
        // an EXIT door at the right: coats leave when their owner does
        var dx = W + 6;
        out += '<rect x="' + dx + '" y="96" width="66" height="154" rx="6" fill="#FFFFFF"' + S(4) + "/>";
        out += '<circle cx="' + (dx + 52) + '" cy="176" r="5" fill="' + INK + '"/>';
        out += '<rect x="' + (dx + 6) + '" y="66" width="54" height="26" rx="5" fill="#FFFFFF"' + S(3) + '/><text x="' + (dx + 33) + '" y="86" text-anchor="middle" ' + TITLE + ' font-size="19" fill="' + INK + '">EXIT</text>';
        out += '<path d="M' + (dx - 26) + " 214 h40 m-12 -10 l12 10 l-12 10" + '" fill="none"' + S(3.5) + "/>";
      }
      return out + "</g>";
    }
  };

  /* ---------- guestlist (Set) ---------- */
  L.cast.guestlist = {
    vb: function (el) { return "0 0 260 " + (110 + Math.max(1, list(el, "data-names").slice(0, 5).length) * 40 + (el.getAttribute("data-reject") ? 54 : 0)); },
    draw: function (el) {
      var names = list(el, "data-names").slice(0, 5), rej = el.getAttribute("data-reject") || "";
      var rows = Math.max(1, names.length), H = 96 + rows * 40 + (rej ? 54 : 0), out = "<g>";   // a reference diagram: no idle bob
      out += '<rect x="20" y="20" width="220" height="' + H + '" rx="14" fill="#FFF6CC"' + S(4) + "/>";
      // the clip, with a face
      out += '<rect x="74" y="6" width="112" height="44" rx="12" fill="#B9C7E3"' + S(4) + "/>";
      out += eyes(112, 148, 24, 4.2) + '<path d="M118 36 q12 8 24 0" fill="none"' + S(3.5) + "/>";
      out += '<text x="130" y="76" text-anchor="middle" ' + TITLE + ' font-size="20" fill="' + INK + '">GUEST LIST</text>';
      names.forEach(function (nm, i) {
        var y = 92 + i * 40;
        out += '<rect x="36" y="' + y + '" width="26" height="26" rx="5" fill="#FFFFFF"' + S(3) + "/>";
        out += '<path d="M41 ' + (y + 14) + " l6 6 l11 -13" + '" fill="none"' + S(3.5) + "/>";
        var fs = fit(nm, 150, 19, 11);
        out += '<text x="74" y="' + (y + 20) + '" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(nm) + "</text>";
        out += '<path d="M72 ' + (y + 30) + ' H222" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="3 4"/>';
      });
      if (rej) {
        var ry = 96 + rows * 40;
        out += '<rect x="32" y="' + ry + '" width="196" height="42" rx="7" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5"/>';
        var fs2 = fit(rej, 60, 17, 10);
        out += '<text x="44" y="' + (ry + 27) + '" ' + MONO + ' font-size="' + fs2.toFixed(1) + '" fill="' + INK + '">' + esc(rej) + "</text>";
        out += '<path d="M40 ' + (ry + 21) + " H" + (48 + rej.length * fs2 * 0.62) + '" fill="none"' + S(3) + "/>";
        out += '<text x="222" y="' + (ry + 26) + '" text-anchor="end" ' + HAND + ' font-size="13" fill="' + INK + '">✗ already listed</text>';
      }
      return out + "</g>";
    }
  };

  /* ---------- dispenser (iterator) ---------- */
  L.cast.dispenser = { vb: "0 0 270 270", draw: function (el) {
    var done = el.getAttribute("data-done") === "true", val = el.getAttribute("data-value") || "", label = el.getAttribute("data-label") || "";
    var out = '<g class="bob">';
    // body (the stack of candies inside)
    out += '<rect x="44" y="112" width="84" height="138" rx="12" fill="#DDE8FF"' + S(4) + "/>";
    if (!done) for (var i = 0; i < 3; i++) out += '<rect x="58" y="' + (176 + i * 22) + '" width="56" height="16" rx="8" fill="#FFE1E1"' + S(2.5) + "/>";
    else out += '<text x="86" y="216" text-anchor="middle" ' + HAND + ' font-size="18" fill="' + INK + '">empty</text>';
    if (label) out += txt(86, 152, label, 74, 17, 13);
    // the head, tipped back on its hinge (drawn as a tilted box, no transforms)
    out += '<path d="M44 116 L134 100 L128 64 L38 80 Z" fill="#C9F2D9"' + S(4) + "/>";
    out += done ? '<path d="M62 92 l8 2 l-8 6 M104 84 l-8 4 l9 4" fill="none"' + S(3) + '/><path d="M74 104 l22 -4" fill="none"' + S(3) + "/>"
                : '<g class="eyes"><circle cx="68" cy="92" r="4.5" fill="' + INK + '"/><circle cx="102" cy="86" r="4.5" fill="' + INK + '"/></g><path d="M76 103 q12 4 22 -4" fill="none"' + S(3.5) + "/>";
    // the candy that just popped out
    if (!done) {
      out += '<rect x="30" y="6" width="150" height="40" rx="20" fill="#FFE1E1"' + S(4) + "/>" + txt(105, 33, val, 126, 18, 13);
      out += '<path d="M150 52 l10 8 M162 46 l12 2" fill="none"' + S(3) + "/>";
    } else {
      out += '<rect x="30" y="6" width="150" height="40" rx="20" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5"/>' + txt(105, 33, "undefined", 126, 17, 13);
    }
    // the tag: done in words
    out += '<path d="M128 150 H146" fill="none"' + S(2.5) + "/>";
    out += '<rect x="146" y="130" width="118" height="40" rx="8" fill="' + (done ? "#FFF6CC" : "#FFFFFF") + '"' + S(3) + (done ? ' stroke-dasharray="7 5"' : "") + "/>";
    out += txt(205, 156, done ? "done: true" : "done: false", 108, 17, 13);   // "done: false" at 15.8 units: 12.2px at 209px wide
    return out + "</g>";
  } };

  /* ---------- storyteller (generator) ---------- */
  L.cast.storyteller = { vb: "0 0 280 210", draw: function (el) {
    var says = el.getAttribute("data-says") || "", st = el.getAttribute("data-state") || "paused", out = '<g class="bob">';
    // legs and feet
    out += '<path d="M66 176 v18 M108 176 v18" fill="none"' + S(6) + '/><ellipse cx="62" cy="198" rx="11" ry="5.5" fill="' + INK + '"/><ellipse cx="112" cy="198" rx="11" ry="5.5" fill="' + INK + '"/>';
    // open book: two pages
    out += '<path d="M86 96 Q56 82 16 92 V178 Q56 168 86 182 Z" fill="#FFFFFF"' + S(4) + "/>";
    out += '<path d="M86 96 Q116 82 156 92 V178 Q116 168 86 182 Z" fill="#FFF6CC"' + S(4) + "/>";
    out += '<path d="M30 156 q22 -6 44 0 M100 156 q22 -6 44 0 M30 166 q22 -6 44 0" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    if (st === "start") out += '<path d="M40 122 q8 6 16 0 M116 122 q8 6 16 0" fill="none"' + S(3.5) + "/>";
    else out += eyes(48, 124, 122, 5);
    out += st === "done" ? '<path d="M70 138 q16 12 32 0" fill="none"' + S(3.5) + "/>" : '<path d="M76 140 h20" fill="none"' + S(3.5) + "/>";
    // speech bubble
    var bubble = st === "start" ? "zzz…" : (says || "…");
    out += '<path d="M150 14 H272 V66 H186 L166 84 L172 66 H150 Z" fill="#FFFFFF"' + S(3.5) + "/>";
    out += txt(211, 47, bubble, 110, 18, 10);
    // badge in words
    var badge = st === "start" ? "NOT STARTED" : st === "done" ? "THE END" : "PAUSED";
    out += '<rect x="172" y="104" width="100" height="34" rx="8" fill="' + (st === "paused" ? "#FFD60A" : "#FFFFFF") + '"' + S(3) + (st === "start" ? ' stroke-dasharray="6 4"' : "") + "/>";
    if (st === "paused") out += '<rect x="182" y="113" width="5" height="16" fill="' + INK + '"/><rect x="191" y="113" width="5" height="16" fill="' + INK + '"/>';
    out += '<text x="' + (st === "paused" ? 232 : 222) + '" y="128" text-anchor="middle" ' + TITLE + ' font-size="' + (st === "start" ? 17 : 19) + '" fill="' + INK + '">' + badge + "</text>";
    return out + "</g>";
  } };

  /* ---------- venn (Set methods) ---------- */
  var IN = { union: [1, 1, 1], intersection: [0, 1, 0], difference: [1, 0, 0], symdiff: [1, 0, 1] };
  L.cast.venn = { vb: "0 0 240 176", draw: function (el) {
    var op = el.getAttribute("data-op") || "union", inr = IN[op] || IN.union, id = "vn20-" + (++uid);
    var a = el.getAttribute("data-a") || "A", b = el.getAttribute("data-b") || "B";
    var regions = [list(el, "data-left"), list(el, "data-mid"), list(el, "data-right")];
    var AX = 90, BX = 150, CY = 96, R = 62;
    var out = "<defs>" +
      '<pattern id="' + id + 'h" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#FFD60A"/><path d="M0 0 V10" stroke="' + INK + '" stroke-width="1.6"/></pattern>' +
      '<clipPath id="' + id + 'a"><circle cx="' + AX + '" cy="' + CY + '" r="' + R + '"/></clipPath>' +
      '<mask id="' + id + 'nb"><rect width="240" height="176" fill="#fff"/><circle cx="' + BX + '" cy="' + CY + '" r="' + R + '" fill="#000"/></mask>' +
      '<mask id="' + id + 'na"><rect width="240" height="176" fill="#fff"/><circle cx="' + AX + '" cy="' + CY + '" r="' + R + '" fill="#000"/></mask>' +
      "</defs>";
    var fillA = "url(#" + id + "h)";
    if (inr[0]) out += '<circle cx="' + AX + '" cy="' + CY + '" r="' + R + '" fill="' + fillA + '" mask="url(#' + id + 'nb)"/>';
    if (inr[2]) out += '<circle cx="' + BX + '" cy="' + CY + '" r="' + R + '" fill="' + fillA + '" mask="url(#' + id + 'na)"/>';
    if (inr[1]) out += '<circle cx="' + BX + '" cy="' + CY + '" r="' + R + '" fill="' + fillA + '" clip-path="url(#' + id + 'a)"/>';
    out += '<circle cx="' + AX + '" cy="' + CY + '" r="' + R + '" fill="none"' + S(3.5) + "/>";
    out += '<circle cx="' + BX + '" cy="' + CY + '" r="' + R + '" fill="none"' + S(3.5) + "/>";
    out += '<text x="' + (AX - 30) + '" y="24" text-anchor="middle" ' + MONO + ' font-size="16" fill="' + INK + '">' + esc(a) + "</text>";
    out += '<text x="' + (BX + 30) + '" y="24" text-anchor="middle" ' + MONO + ' font-size="16" fill="' + INK + '">' + esc(b) + "</text>";
    var xs = [AX - 30, (AX + BX) / 2, BX + 30];
    regions.forEach(function (names, r) {
      names.forEach(function (nm, j) {
        var y = CY - (names.length - 1) * 13 + j * 26 + 5, w = nm.length * 9.6 + 10;
        if (inr[r]) out += '<rect x="' + (xs[r] - w / 2).toFixed(1) + '" y="' + (y - 15) + '" width="' + w.toFixed(1) + '" height="21" rx="4" fill="#FFFFFF"' + S(2.5) + "/>";
        out += '<text x="' + xs[r] + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="' + (inr[r] ? 800 : 500) + '" font-size="15" fill="' + INK + '">' + esc(nm) + "</text>";
      });
    });
    return out;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
