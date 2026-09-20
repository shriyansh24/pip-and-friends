/* Go book, chapter 9 ("Windows on a Shelf") additions. Classic deferred script; loads after comic-cast.js.
   [data-shelf]: the shelf-and-window stepper. A slice is drawn as a window frame over a long shelf (its backing array):
   where the window starts, how wide it is (len) and how far the shelf goes on past the start (cap). Each step is the
   state right after one line of a REAL captured program ran; that line is lit in the code list.
   Model: { "program": "shelf_grow.go", "fmt": "len={len} cap={cap} {items}",
            "steps": [ { "at": 7,                 // the line that just ran (lit), or null before the first line
                         "label": "s",            // the name (or expression) on the window
                         "cells": ["10", "0"],    // everything on the shelf, left to right
                         "start": 0, "len": 1,    // the window: first shelf spot it shows, and how many spots
                         "old": ["10"],           // optional: the full old shelf the values were copied from
                         "print": true,           // this line printed: fmt, filled from the window, is its output
                         "note": "HTML" } ] }
   Parity: every printed line the model computes (len, cap = shelf length - start, items = the window's cells) must equal
   the real run's stdout, line for line, and together they must be the whole stdout. Otherwise the badge turns bad and
   L.report() fires. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch9.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111", INK2 = "#2B2B2B";
  var CW = 58, GAP = 8, PAD = 26;

  function xOf(i) { return PAD + i * (CW + GAP); }
  function capOf(s) { return s.cells.length - s.start; }
  function items(s) { return s.cells.slice(s.start, s.start + s.len); }
  function line(m, s) {
    return m.fmt.replace("{len}", String(s.len)).replace("{cap}", String(capOf(s))).replace("{items}", "[" + items(s).join(" ") + "]");
  }
  function txt(x, y, t, size, opts) {
    opts = opts || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (opts.anchor || "middle") + '" font-family="' + (opts.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (opts.weight || 800) + '" font-size="' + size + '" fill="' + (opts.fill || INK) + '">' + esc(t) + "</text>";
  }
  function bracket(x1, x2, y, up) {
    var d = up ? -10 : 10;
    return '<path d="M' + x1 + " " + (y + d) + " V" + y + " H" + x2 + " V" + (y + d) + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
  }
  function cell(i, y, v, kind) {
    // kind: "in" (inside the window), "after" (behind the wall, inside cap), "before" (left of the window), "old"
    var x = xOf(i), fill = kind === "in" ? "#FFFFFF" : "#F3F3F3";
    var dash = kind === "after" ? ' stroke-dasharray="7 5"' : kind === "before" ? ' stroke-dasharray="2 5"' : kind === "old" ? ' stroke-dasharray="4 4"' : "";
    var sw = kind === "in" ? 3 : 2.5;
    return '<rect x="' + x + '" y="' + y + '" width="' + CW + '" height="52" rx="6" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + sw + '"' + dash + "/>" +
      txt(x + CW / 2, y + 35, v, v.length > 3 ? 19 : 26, { fill: kind === "in" ? INK : INK2, weight: kind === "in" ? 800 : 600 });
  }

  // maxTop: the height of the "old shelf" band, reserved on EVERY step of a run that ever shows one, so the picture
  // (and the buttons under it) keep one size for the whole run
  function draw(m, s, maxCells, maxTop) {
    var W = xOf(maxCells) - GAP + PAD, out = "", top = maxTop || 0;
    if (s.old) {
      out += txt(PAD, 22, "OLD SHELF: full, so append left it", 20, { anchor: "start", font: "Comic Neue, sans-serif" });
      for (var o = 0; o < s.old.length; o++) out += cell(o, 32, s.old[o], "old");
      var ox = xOf(s.old.length) - GAP;
      out += '<path d="M' + (PAD + 8) + " 88 v12 h" + (ox - PAD - 16) + ' v-12" fill="none" stroke="' + INK2 + '" stroke-width="2.5" stroke-dasharray="4 4"/>';
      out += '<path d="M' + (PAD + ox) / 2 + ' 100 v22" stroke="' + INK + '" stroke-width="3.5"/><path d="M' + ((PAD + ox) / 2 - 8) + " 114 l8 10 l8 -10" + '" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
      out += txt((PAD + ox) / 2 + 14, 118, "copied to a new, longer shelf", 20, { anchor: "start", font: "Comic Neue, sans-serif" });
    }
    var yCell = top + 84, x1 = xOf(s.start) - 7, x2 = s.len ? xOf(s.start + s.len) - GAP + 7 : x1 + 14;
    // len bracket and window indexes
    out += bracket(x1 + 4, x2 - 4, top + 34, false);
    out += txt((x1 + x2) / 2, top + 24, "len " + s.len, 26, { font: "Bangers, sans-serif", weight: 400 });
    // shelf cells
    for (var i = 0; i < s.cells.length; i++) {
      var kind = i < s.start ? "before" : i < s.start + s.len ? "in" : "after";
      out += cell(i, yCell, s.cells[i], kind);
      if (kind === "in") out += txt(xOf(i) + CW / 2, yCell - 10, "[" + (i - s.start) + "]", 19, { weight: 800 });
    }
    // the window frame: a thick frame with a sill, drawn over the cells it shows
    out += '<rect x="' + x1 + '" y="' + (yCell - 34) + '" width="' + (x2 - x1) + '" height="94" rx="9" fill="none" stroke="' + INK + '" stroke-width="6"/>';
    out += '<rect x="' + (x1 + 4) + '" y="' + (yCell - 30) + '" width="' + Math.max(0, x2 - x1 - 8) + '" height="86" rx="6" fill="none" stroke="#FFD60A" stroke-width="3"/>';
    out += '<rect x="' + (x1 - 6) + '" y="' + (yCell + 58) + '" width="' + (x2 - x1 + 12) + '" height="9" rx="3" fill="#FFD60A" stroke="' + INK + '" stroke-width="3"/>';
    // the shelf plank and its spot numbers
    var pw = xOf(s.cells.length) - GAP - PAD + 16;
    out += '<rect x="' + (PAD - 8) + '" y="' + (yCell + 70) + '" width="' + pw + '" height="13" rx="3" fill="#C8955E" stroke="' + INK + '" stroke-width="3"/>';
    for (var k = 0; k < s.cells.length; k++) out += txt(xOf(k) + CW / 2, yCell + 106, String(k), 19, { fill: INK2, weight: 600 });
    // cap bracket: from the window's start to the end of the shelf
    var cx1 = xOf(s.start) + 2, cx2 = xOf(s.cells.length) - GAP - 2;
    out += bracket(cx1, cx2, yCell + 122, true);
    out += txt((cx1 + cx2) / 2, yCell + 150, "cap " + capOf(s), 26, { font: "Bangers, sans-serif", weight: 400 });
    // the window's name, at the top left of the frame
    var H = yCell + 160;
    return { svg: out, vb: "0 0 " + W + " " + H, label: s.label };
  }

  function describe(s) {
    return (s.old ? "The old shelf [" + s.old.join(" ") + "] was full; append copied it to a new shelf. " : "") +
      "Shelf: " + s.cells.join(" ") + ". Window " + s.label + " starts at shelf spot " + s.start + ", len " + s.len + ", cap " + capOf(s) +
      ", so it shows [" + items(s).join(" ") + "].";
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-shelf")).textContent);
    var q = L.program(m.program); if (!q) return;
    var real = q.stdout.replace(/\n$/, "").split("\n"), ok = true, printed = [], maxCells = 0;
    var maxTop = m.steps.some(function (s) { return s.old; }) ? 132 : 0;
    function bad(msg) { ok = false; L.report("shelf:" + m.program, msg); }
    m.steps.forEach(function (s, k) {
      if (s.start < 0 || s.start + s.len > s.cells.length) bad("step " + (k + 1) + ": the window does not fit on the shelf");
      maxCells = Math.max(maxCells, s.cells.length, s.old ? s.old.length : 0);
      if (s.print) {
        var mine = line(m, s), want = real[printed.length];
        if (mine !== want) bad("step " + (k + 1) + " prints \"" + mine + "\" but the real run printed \"" + want + "\"");
        printed.push(mine);
      }
      s._screen = printed.slice();
    });
    if (printed.length !== real.length) bad("the model prints " + printed.length + " lines; the real run printed " + real.length);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every len and cap matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var src = q.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".sh-code"), svg = box.querySelector("svg.shelf-svg"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = code.querySelectorAll("li");
    // one viewBox for the whole run; a long shelf keeps 76% of its drawn size on phones and scrolls sideways
    var fullW = xOf(maxCells) - GAP + PAD, stage = box.querySelector(".stage");
    if (fullW > 440) svg.style.minWidth = Math.round(fullW * 0.76) + "px";
    svg.style.maxWidth = Math.round(fullW * 1.15) + "px";   // keep boxes near their drawn size on wide screens
    if (stage && L.scrollHint) L.scrollHint(stage);
    function render(st, announce) {
      var s = m.steps[st.step], d = draw(m, s, maxCells, maxTop);
      for (var a = 0; a < lis.length; a++) lis[a].classList.toggle("ran", s.at === a + 1);
      svg.setAttribute("viewBox", d.vb);
      svg.innerHTML = d.svg;
      var prev = st.step > 0 ? m.steps[st.step - 1]._screen.length : 0;
      scr.innerHTML = s._screen.length ? s._screen.map(function (l, k) { return k >= prev ? '<span class="new">' + esc(l) + "</span>" : esc(l); }).join("\n") : '<span class="empty">(nothing printed yet)</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + '</span><code class="sh-tag">' + esc(s.label) + "</code> " + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + (s.at ? "Line " + s.at + " ran. " : "") + s.note.replace(/<[^>]+>/g, "") + " " + describe(s);
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + (s.at || "") + "</td><td>" + s.note + "</td><td>" + esc(describe(s)) + "</td><td><code>" + esc(s._screen.join(" / ")) + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre, .sh-code, [data-reserve]" });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-shelf]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("shelf", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
