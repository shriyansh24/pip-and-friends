/* Rust book, chapter 12 ("Notebooks and Photocopies"): the graph-paper ruler.
   One square per byte. Each letter (char) covers as many squares as UTF-8 needs for it: 1 for plain English letters,
   2 for é, 3 for 日, 4 for most emoji. Thick lines mark char boundaries (where a slice may start or stop); dotted
   lines inside a letter mark places a slice may never cut.
   Markup:
     <section class="panel clean ruler" data-ruler="MODEL-ID" ...>
       <div class="chips"></div><div class="ru-stage"><svg class="ru-svg" role="img" aria-label="..."></svg></div>
       <ul class="ru-legend">...</ul><p class="ru-sum"></p><p class="narration"></p><span class="parity"></span><p class="sr-only" aria-live="polite"></p>
       <details><summary>Text version</summary><table class="transcript"><thead>...</thead><tbody></tbody></table></details>
       <script type="application/json" id="MODEL-ID">{"program": "ruler.rs", "words": [{"w": "héllo", "note": "HTML"}]}</script>
     </section>
   Parity: the program prints one line per word, "word|len|chars|byte values|char start indexes". The squares are
   computed in the browser (TextEncoder) and every number is compared with that captured line; the badge says so,
   and any mismatch is reported through L.report (a console error the checker catches).
   Keyboard: the word buttons are ordinary buttons. Text version: a table with every byte of every word. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) return;
  var L = P.comic.lib, esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function analyse(word) {
    var enc = new TextEncoder(), chars = [], bytes = [], starts = [];
    Array.from(word).forEach(function (c) {
      var b = Array.from(enc.encode(c));
      starts.push(bytes.length);
      chars.push({ c: c, start: bytes.length, bytes: b });
      bytes = bytes.concat(b);
    });
    return { chars: chars, bytes: bytes, starts: starts };
  }
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function tx(p, x, y, s, cls) { var t = sv("text", { x: x, y: y, "class": cls }, p); t.textContent = s; return t; }
  var FILLS = ["#FFF6CC", "#DDE8FF", "#C9F2D9", "#FFE1E1"];
  var CW = 60, X0 = 16;

  function draw(svg, a, maxBytes) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var W = X0 + maxBytes * CW + 20, H = 210;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    // graph-paper background
    var g0 = sv("g", { "class": "ru-grid" }, svg);
    for (var gx = 10; gx < W; gx += 14) sv("path", { d: "M" + gx + " 0 V" + H }, g0);
    for (var gy = 6; gy < H; gy += 14) sv("path", { d: "M0 " + gy + " H" + W }, g0);
    a.chars.forEach(function (ch, ci) {
      var x = X0 + ch.start * CW, w = ch.bytes.length * CW;
      // the letter's card, spanning its bytes
      sv("rect", { x: x + 3, y: 10, width: w - 6, height: 58, rx: 8, "class": "ru-char", fill: FILLS[ch.bytes.length - 1] }, svg);
      tx(svg, x + w / 2, 50, ch.c, "ru-glyph");
      tx(svg, x + 10, 26, String(ci), "ru-ci");
      tx(svg, x + w / 2, 88, ch.bytes.length === 1 ? "1 byte" : ch.bytes.length + " bytes", "ru-w");
      ch.bytes.forEach(function (b, k) {
        var bx = x + k * CW;
        sv("rect", { x: bx + 2, y: 100, width: CW - 4, height: 44, rx: 3, "class": "ru-byte" }, svg);
        tx(svg, bx + CW / 2, 128, String(b), "ru-bval");
        tx(svg, bx + CW / 2, 172, String(ch.start + k), "ru-bi");
        if (k > 0) sv("path", { d: "M" + bx + " 94 V150", "class": "ru-nocut" }, svg);
      });
    });
    // char boundaries: thick lines where a slice may start or stop (including the very end)
    a.starts.concat([a.bytes.length]).forEach(function (s) {
      var bx = X0 + s * CW;
      sv("path", { d: "M" + bx + " 94 V196", "class": "ru-cut" }, svg);
      sv("path", { d: "M" + (bx - 7) + " 204 l7 -10 l7 10 z", "class": "ru-tri" }, svg);
    });
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-ruler")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var lines = L.shown(prog).replace(/\n$/, "").split("\n"), bad = 0;
    var data = m.words.map(function (wd) {
      var a = analyse(wd.w), want = wd.w + "|" + a.bytes.length + "|" + a.chars.length + "|" + a.bytes.join(" ") + "|" + a.starts.join(" ");
      var ok = lines.indexOf(want) >= 0;
      if (!ok) { bad++; L.report("ruler:" + m.program, "word " + wd.w + " does not match its captured line (wanted: " + want + ")"); }
      return { wd: wd, a: a, ok: ok };
    });
    var maxBytes = data.reduce(function (n, d) { return Math.max(n, d.a.bytes.length); }, 1);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " word(s) do not match the real run" : "Every square matches the real run of " + m.program; par.classList.toggle("bad", !!bad); }
    var chips = box.querySelector(".chips"), svg = box.querySelector(".ru-svg"), sum = box.querySelector(".ru-sum"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    chips.innerHTML = '<span class="label">PICK A WORD:</span>' + data.map(function (d, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>"' + esc(d.wd.w) + '"</code></button>'; }).join("");
    function describe(d) {
      return d.a.chars.map(function (ch, ci) { return "char " + ci + " " + ch.c + ": byte" + (ch.bytes.length > 1 ? "s " + ch.start + " to " + (ch.start + ch.bytes.length - 1) : " " + ch.start) + " (" + ch.bytes.join(", ") + ")"; }).join("; ");
    }
    function show(i, announce) {
      var d = data[i], bs = chips.querySelectorAll(".path-btn");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      draw(svg, d.a, maxBytes);
      svg.setAttribute("aria-label", "Graph paper for " + d.wd.w + ": " + describe(d) + ".");
      sum.innerHTML = "<code>len()</code> = <b>" + d.a.bytes.length + "</b> bytes &nbsp;·&nbsp; <code>chars().count()</code> = <b>" + d.a.chars.length + "</b> letters";
      note.innerHTML = d.wd.note;
      if (live && announce) live.textContent = d.wd.w + ": " + d.a.bytes.length + " bytes, " + d.a.chars.length + " chars. " + describe(d) + ".";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = data.map(function (d) {
      return "<tr><td><code>\"" + esc(d.wd.w) + "\"</code></td><td>" + d.a.bytes.length + "</td><td>" + d.a.chars.length + "</td><td>" + esc(describe(d)) + "</td><td><code>" + esc(d.wd.w + "|" + d.a.bytes.length + "|" + d.a.chars.length + "|" + d.a.bytes.join(" ") + "|" + d.a.starts.join(" ")) + "</code> " + (d.ok ? "(matches)" : "(DOES NOT MATCH)") + "</td></tr>";
    }).join("");
    show(m.start || 0, false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-ruler]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("ruler:" + boxes[i].id, e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
