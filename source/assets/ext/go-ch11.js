/* Go book, chapter 11 ("Beads on a Necklace") additions. Classic deferred script; loads after comic-cast.js.
   [data-necklace]: the bead-necklace stepper. A string is drawn as a necklace of beads (its bytes); each letter (rune) is a
   charm hung over the one to four beads that spell it in UTF-8. Stepping walks the REAL program's `for i, r := range w`
   loop: one step per lap, lighting the beads of that rune, with i (the byte offset) and r (the rune).
   Model: { "program": "necklace.go",
            "words": ["héllo", "日本"],          // the words the program ranges over, in order
            "intro": { "héllo": "HTML" },      // optional: the note for a word's first (overview) step
            "headerLine": 10, "lapLine": 12 }    // the source lines that print the header and one lap (lit in the code list)
   The program must print, for each word: `<word> len <bytes> runes <runes>`, then for each lap `<i> <letter> [<bytes>]`.
   Parity: the extension encodes every word to UTF-8 itself, computes each of those lines, and compares them, line for line,
   with the real run's stdout (together they must be the whole stdout). A mismatch turns the badge bad and calls L.report().
   Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch11.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111", INK2 = "#2B2B2B";
  var D = 70, G = 14, PAD = 34, CY = 196;

  function utf8(cp) {
    if (cp < 0x80) return [cp];
    if (cp < 0x800) return [0xC0 | (cp >> 6), 0x80 | (cp & 63)];
    if (cp < 0x10000) return [0xE0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
    return [0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
  }
  function analyse(w) {
    var runes = [], off = 0, bytes = [];
    Array.from(w).forEach(function (ch) {
      var b = utf8(ch.codePointAt(0));
      runes.push({ ch: ch, off: off, bytes: b });
      bytes = bytes.concat(b);
      off += b.length;
    });
    return { word: w, runes: runes, bytes: bytes };
  }
  function txt(x, y, t, size, opts) {
    opts = opts || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (opts.anchor || "middle") + '" font-family="' + (opts.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (opts.weight || 800) + '" font-size="' + size + '" fill="' + (opts.fill || INK) + '">' + esc(t) + "</text>";
  }
  function bx(k) { return PAD + k * (D + G) + D / 2; }
  function beadWord(n) { return n === 1 ? "1 bead" : n + " beads"; }

  function draw(a, active, maxBytes) {
    var W = PAD * 2 + maxBytes * (D + G) - G, out = "";
    // the cord: a string through every bead, curling up at both ends like a necklace
    var x0 = 10, x1 = PAD * 2 + a.bytes.length * (D + G) - G - 10;
    out += '<path d="M' + x0 + " " + (CY - 52) + " Q" + x0 + " " + CY + " " + (x0 + 34) + " " + CY + " L" + (x1 - 34) + " " + CY + " Q" + x1 + " " + CY + " " + x1 + " " + (CY - 52) +
      '" fill="none" stroke="#8A5A2B" stroke-width="5" stroke-linecap="round"/>';
    // charms: one per rune, over its beads
    a.runes.forEach(function (r, k) {
      var first = bx(r.off) - D / 2 + 2, last = bx(r.off + r.bytes.length - 1) + D / 2 - 2, mid = (first + last) / 2, on = k === active;
      out += '<path d="M' + (first + 6) + " " + (CY - 52) + " V" + (CY - 62) + " H" + (last - 6) + " V" + (CY - 52) + '" fill="none" stroke="' + INK + '" stroke-width="' + (on ? 5 : 3) + '" stroke-linejoin="round"/>';
      out += '<path d="M' + mid + " " + (CY - 62) + " V" + (CY - 76) + '" stroke="' + INK + '" stroke-width="3"/>';
      out += '<rect x="' + (mid - 30) + '" y="' + (CY - 134) + '" width="60" height="58" rx="12" fill="' + (on ? "#FFD60A" : "#FFFFFF") + '" stroke="' + INK + '" stroke-width="' + (on ? 5 : 3) + '"/>';
      out += txt(mid, CY - 92, r.ch, 36, { font: "Atkinson Hyperlegible Next, Noto Sans CJK JP, sans-serif", weight: 700 });
    });
    // beads, with their numbers inside and their byte index underneath
    a.bytes.forEach(function (b, k) {
      var r = null, ri = -1;
      a.runes.forEach(function (q, qi) { if (k >= q.off && k < q.off + q.bytes.length) { r = q; ri = qi; } });
      var on = ri === active, cont = k !== r.off;
      out += '<circle cx="' + bx(k) + '" cy="' + CY + '" r="' + (D / 2 - 2) + '" fill="' + (on ? "#FFD60A" : r.bytes.length > 1 ? "#F2C9A0" : "#FFF6CC") + '" stroke="' + INK + '" stroke-width="' + (on ? 5 : 3) + '"' + (cont ? ' stroke-dasharray="9 5"' : "") + "/>";
      out += txt(bx(k), CY + 9, String(b), b > 99 ? 24 : 27);
      out += txt(bx(k), CY + 66, String(k), 24, { fill: INK2, weight: 600 });
    });
    out += txt(PAD - 31, CY + 66, "byte", 23, { anchor: "start", fill: INK2, weight: 600, font: "Comic Neue, sans-serif" });
    var bottom = CY + 86;
    if (active < 0) {
      var l = bx(0) - D / 2, rgt = bx(a.bytes.length - 1) + D / 2;
      out += '<path d="M' + l + " " + bottom + " v10 H" + rgt + " v-10" + '" fill="none" stroke="' + INK + '" stroke-width="3.5"/>';
      out += txt((l + rgt) / 2, bottom + 44, "len = " + a.bytes.length + " beads · " + a.runes.length + " letters (runes)", 28, { font: "Bangers, sans-serif", weight: 400 });
    } else {
      var r0 = a.runes[active], f = bx(r0.off), e = bx(r0.off + r0.bytes.length - 1);
      out += '<path d="M' + f + " " + (bottom + 30) + " V" + (bottom + 4) + '" stroke="' + INK + '" stroke-width="4"/><path d="M' + (f - 9) + " " + (bottom + 14) + " L" + f + " " + (bottom + 2) + " L" + (f + 9) + " " + (bottom + 14) + '" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
      out += txt(W / 2, bottom + 60, "i = " + r0.off + " · r = '" + r0.ch + "' · " + beadWord(r0.bytes.length), 30, { weight: 800 });
      if (e !== f) out += '<path d="M' + f + " " + (bottom + 20) + " H" + e + '" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 5"/>';
    }
    return { svg: out, vb: "0 0 " + W + " " + (bottom + 72) };
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-necklace")).textContent);
    var q = L.program(m.program); if (!q) return;
    var real = q.stdout.replace(/\n$/, "").split("\n"), ok = true, steps = [], printed = [], maxBytes = 0;
    function bad(msg) { ok = false; L.report("necklace:" + m.program, msg); }
    m.words.forEach(function (w) {
      var a = analyse(w);
      maxBytes = Math.max(maxBytes, a.bytes.length);
      var head = w + " len " + a.bytes.length + " runes " + a.runes.length;
      var intro = (m.intro && m.intro[w]) || ("<b>" + esc(w) + "</b>: " + a.bytes.length + " beads, " + a.runes.length + " letters.");
      steps.push({ a: a, active: -1, line: head, at: m.headerLine, note: intro });
      a.runes.forEach(function (r, k) {
        var next = k + 1 < a.runes.length ? " The next lap starts at byte " + a.runes[k + 1].off + "." : " That was the last bead, so the loop ends.";
        var note = "<code>range</code> hands over <code>i = " + r.off + "</code> and <code>r = '" + esc(r.ch) + "'</code>. This letter is " + beadWord(r.bytes.length) +
          (r.bytes.length > 1 ? ", bytes " + r.off + " to " + (r.off + r.bytes.length - 1) : ", byte " + r.off) + ": <samp>[" + r.bytes.join(" ") + "]</samp>." + next;
        steps.push({ a: a, active: k, line: r.off + " " + r.ch + " [" + r.bytes.join(" ") + "]", at: m.lapLine, note: note });
      });
    });
    steps.forEach(function (s, k) {
      var want = real[k];
      if (s.line !== want) bad("step " + (k + 1) + " computes \"" + s.line + "\" but the real run printed \"" + want + "\"");
      printed.push(s.line);
      s._screen = printed.slice();
    });
    if (steps.length !== real.length) bad("the model prints " + steps.length + " lines; the real run printed " + real.length);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every bead and offset matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var src = q.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".nk-code"), svg = box.querySelector("svg.nk-svg"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = code.querySelectorAll("li");
    if (L.hangLines) L.hangLines(lis);   // the engine's hanging indent: long lines wrap under their own first character
    function describe(s) {
      if (s.active < 0) return "Necklace " + s.a.word + ": beads " + s.a.bytes.join(" ") + "; len " + s.a.bytes.length + ", " + s.a.runes.length + " runes.";
      var r = s.a.runes[s.active];
      return "Lit: the letter " + r.ch + " at byte offset " + r.off + ", beads " + r.bytes.join(" ") + ".";
    }
    function render(st, announce) {
      var s = steps[st.step], d = draw(s.a, s.active, maxBytes);
      for (var i = 0; i < lis.length; i++) {
        lis[i].classList.toggle("ran", s.at === i + 1);
        if (s.at === i + 1) lis[i].setAttribute("data-now", ""); else lis[i].removeAttribute("data-now");
      }
      svg.setAttribute("viewBox", d.vb);
      svg.innerHTML = d.svg;
      scr.innerHTML = s._screen.map(function (l, k) { return k === s._screen.length - 1 ? '<span class="new">' + esc(l) + "</span>" : esc(l); }).join("\n");
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + '</span><code class="nk-tag">' + esc(s.a.word) + "</code> " + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + steps.length + ". " + s.note.replace(/<[^>]+>/g, "") + " " + describe(s) + " Printed: " + s.line;
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + esc(s.a.word) + "</td><td>" + s.note + "</td><td>" + esc(describe(s)) + "</td><td><code>" + esc(s.line) + "</code></td></tr>";
    }).join("");
    code.setAttribute("data-reserve", "");   // the lit line can wrap onto a second row; keep the tallest list height
    var r = L.runner(box, steps.length, render, { reserve: true });
    r.reset(steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-necklace]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("necklace", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
