/* Go book, chapter 21 ("Branches and Plumbing") addition. Classic deferred script; loads after comic-cast.js.

   [data-bucket]: a bufio.Writer as a bucket under a tap, emptying into a drain (the screen). Each step is one call to
   Write (one fmt.Fprintf), then the end of main: either w.Flush() empties the bucket, or main returns and the bytes
   still in the bucket are never written. The steps are worked out HERE from the model, using the same rule as
   bufio.Writer.Write in Go's standard library:
       while the bytes don't fit in the space left:
           if the bucket is empty: write them straight to the drain (a big write skips the bucket)
           else: top the bucket up to full, then pour the whole bucket into the drain
       put the rest in the bucket
   and then CHECKED against the real run of each program: everything the model says reached the screen must equal the
   program's real stdout, byte for byte. A parity badge shows the result for the chosen road.
   Model: { "size": 16, "writes": ["parcel 1\n", ...],
            "paths": [ { "id": "no", "label": "...", "program": "bucket.go", "flush": false,
                         "writeLine": 12, "endLine": 14 }, ... ] }
   Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch21.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111";

  function txt(x, y, t, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") + '" font-family="' + (o.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (o.weight || 800) + '" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>";
  }
  function rect(x, y, w, h, fill, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.rx == null ? 10 : o.rx) + '" fill="' + fill + '" stroke="' + INK +
      '" stroke-width="' + (o.sw || 3) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") + "/>";
  }
  function vis(s) { return s.replace(/ /g, "·").replace(/\n/g, "⏎"); }
  function q(s) { return "“" + vis(s) + "”"; }
  var SMALL = { font: "Comic Neue, sans-serif", weight: 700 };

  /* bufio.Writer.Write, step by step. Returns the list of steps for one road. */
  function bucketSteps(m, path) {
    var size = m.size, buf = "", screen = "", steps = [];
    steps.push({ kind: "start", buf: "", screen: "", poured: "", note: "start" });
    m.writes.forEach(function (p, i) {
      var poured = "", direct = false, kept = "";
      while (p.length > size - buf.length) {
        if (buf.length === 0) { poured += p; screen += p; direct = true; p = ""; break; }
        var n = size - buf.length;
        kept = p.slice(0, n);
        buf += kept; p = p.slice(n);
        poured += buf; screen += buf; buf = "";
      }
      buf += p;
      steps.push({ kind: "write", n: i + 1, data: m.writes[i], buf: buf, screen: screen, poured: poured, topped: kept, direct: direct });
    });
    if (path.flush) {
      var out = buf; screen += buf;
      steps.push({ kind: "flush", buf: "", screen: screen, poured: out });
      steps.push({ kind: "end", buf: "", screen: screen, poured: "", lost: "" });
    } else {
      steps.push({ kind: "end", buf: buf, screen: screen, poured: "", lost: buf });
    }
    return steps;
  }

  function noteFor(m, path, st) {
    if (st.kind === "start") return "<code>bufio.NewWriterSize(os.Stdout, " + m.size + ")</code> puts an empty " + m.size + "-byte bucket under the tap. Its drain is <code>os.Stdout</code>, the screen. Nothing has been written yet.";
    if (st.kind === "write") {
      var s = "Write " + st.n + ": <code>fmt.Fprintf</code> hands the bucket " + st.data.length + " bytes, " + esc(q(st.data)) + ". ";
      if (!st.poured) return s + "They fit, so they just sit in the bucket. <b>Nothing reaches the screen.</b> The bucket now holds " + st.buf.length + " of " + m.size + " bytes.";
      if (st.direct) return s + "The bucket was empty and the bytes are bigger than it, so they go straight down the drain.";
      return s + "Only " + st.topped.length + " fit (" + esc(q(st.topped)) + "). The bucket is now <b>full</b>, so it pours all " + m.size + " bytes down the drain: " + esc(q(st.poured)) +
        " reaches the screen, even half a word. The other " + st.buf.length + " bytes start a fresh bucket.";
    }
    if (st.kind === "flush") return "<code>w.Flush()</code> pours what's left, " + esc(q(st.poured)) + ", down the drain. The bucket is empty.";
    if (path.flush) return "<code>main</code> returns. Every byte reached the screen: the parity badge compares it with the real run.";
    return "<code>main</code> returns <b>without</b> <code>Flush</code>. The program ends, and the " + st.lost.length + " bytes still in the bucket, " + esc(q(st.lost)) +
      ", are thrown away. They never reach the screen. Compare the screen with the real run: it stops in the middle of a word.";
  }
  function describe(m, st) {
    return "Bucket holds " + st.buf.length + " of " + m.size + " bytes" + (st.buf ? ": " + q(st.buf) : "") + ". Screen has " + st.screen.length + " bytes" +
      (st.screen ? ": " + q(st.screen) : "") + "." + (st.kind === "end" && st.lost ? " Lost when main returned: " + q(st.lost) + "." : "");
  }

  function drawBucket(m, st, narrow) {
    var out = "", size = m.size, W = narrow ? 340 : 690, H = narrow ? 600 : 340;
    var pouring = !!st.poured, cols = 8, cw = narrow ? 36 : 40, rows = Math.ceil(size / cols);
    var tx = narrow ? 170 : 110;
    // the tap
    out += '<g stroke="' + INK + '" stroke-width="4" stroke-linejoin="round">';
    out += '<path d="M' + (tx - 60) + ' 34 H' + (tx + 20) + ' V54 H' + (tx + 2) + ' V72 H' + (tx - 22) + ' V54 H' + (tx - 60) + ' Z" fill="#DDE8FF"/>';
    out += '<rect x="' + (tx - 34) + '" y="18" width="40" height="16" rx="4" fill="#FFD60A"/>';
    out += "</g>";
    out += txt(tx - 20, 98, "fmt.Fprintf", 16);
    var tapLabel = st.kind === "write" ? "write " + st.n + ": " + q(st.data) : st.kind === "flush" ? "w.Flush()" : st.kind === "end" ? "main returned" : "tap closed";
    out += txt(narrow ? 150 : 124, 124, tapLabel, narrow ? 15 : 14);
    // the bucket
    var bx = narrow ? (W - cols * cw) / 2 : 250, by = narrow ? 150 : 50, bw = cols * cw, bh = rows * 40 + 20;
    out += '<path d="M' + (bx - 10) + " " + by + " L" + (bx + 6) + " " + (by + bh) + " H" + (bx + bw - 6) + " L" + (bx + bw + 10) + " " + by + '" fill="#FFF6CC" stroke="' + INK + '" stroke-width="' + (pouring ? 6 : 4) + '" stroke-linejoin="round"/>';
    out += '<path d="M' + (bx + 20) + " " + (by - 2) + " Q" + (bx + bw / 2) + " " + (by - 30) + " " + (bx + bw - 20) + " " + (by - 2) + '" fill="none" stroke="' + INK + '" stroke-width="4"/>';
    out += txt(bx + bw / 2, by + bh + 24, "bufio.Writer: " + st.buf.length + " of " + size + " bytes" + (st.buf.length === size ? " (FULL)" : ""), 16, SMALL);
    for (var i = 0; i < size; i++) {
      var r = Math.floor(i / cols), c = i % cols, x = bx + c * cw + 3, y = by + 10 + r * 40;
      var ch = st.buf[i];
      out += rect(x, y, cw - 6, 32, ch ? "#FFFFFF" : "#F4F1EA", { rx: 5, sw: 2, dash: ch ? null : "4 3" });
      if (ch) out += txt(x + (cw - 6) / 2, y + 23, vis(ch), 17);
    }
    // the drain and the screen
    var sx = narrow ? 20 : 250, sy = narrow ? 400 : 226, sw = narrow ? 300 : 330, sh = narrow ? 150 : 100;
    var lineW = pouring ? 8 : 4, dash = pouring ? "" : ' stroke-dasharray="9 6"';
    if (!narrow) {
      var dx = bx + bw + 46;
      out += '<path d="M' + (bx + bw + 8) + " " + (by + 40) + " H" + dx + " V" + (sy + 50) + " H" + (sx + sw + 6) + '" fill="none" stroke="' + INK + '" stroke-width="' + lineW + '"' + dash + ' stroke-linecap="round" stroke-linejoin="round"/>';
      out += txt(dx + 8, by + 100, pouring ? "POURING" : "drain", 15, { font: "Comic Neue, sans-serif", weight: 700, anchor: "start" });
    } else {
      out += '<path d="M170 ' + (by + bh + 36) + " V" + (sy - 4) + '" fill="none" stroke="' + INK + '" stroke-width="' + lineW + '"' + dash + ' stroke-linecap="round"/>';
      out += txt(184, sy - 14, pouring ? "POURING" : "drain", 15, { font: "Comic Neue, sans-serif", weight: 700, anchor: "start" });
    }
    out += rect(sx, sy, sw, sh, "#FFFFFF", { sw: 4, rx: 12 });
    out += txt(sx + 12, sy + 22, "os.Stdout (the screen): " + st.screen.length + " bytes", 15, { font: "Comic Neue, sans-serif", weight: 700, anchor: "start" });
    var lines = st.screen.split("\n"), keep = narrow ? 5 : 3, shownLines = lines.slice(Math.max(0, lines.length - keep));
    shownLines.forEach(function (l, k) { out += txt(sx + 14, sy + 46 + k * 20, l || (k === shownLines.length - 1 ? "▌" : ""), 16, { anchor: "start" }); });
    if (st.kind === "end" && st.lost) {
      if (narrow) { out += rect(20, 562, 300, 32, "#FFE1E1", { rx: 8, sw: 3, dash: "7 5" }); out += txt(170, 583, "LOST: " + q(st.lost), 14); }
      else {
        out += rect(20, 206, 200, 110, "#FFE1E1", { rx: 8, sw: 3, dash: "7 5" });
        out += txt(120, 234, "LOST when", 16, SMALL); out += txt(120, 256, "main returned:", 16, SMALL); out += txt(120, 288, q(st.lost), 13);
      }
    }
    return { svg: out, vb: "0 0 " + W + " " + H };
  }

  function mountBucket(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-bucket")).textContent);
    var bar = box.querySelector(".paths"), codeOl = box.querySelector(".bucket-code"), tab = box.querySelector(".bucket-tab");
    var svg = box.querySelector("svg.bucket-svg"), scr = box.querySelector(".screen pre"), stage = box.querySelector(".stage");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), par = box.querySelector(".parity");
    var tb = box.querySelector(".transcript tbody");
    var roads = m.paths.map(function (p) {
      var prog = L.program(p.program), steps = bucketSteps(m, p);
      var ok = !!prog && steps[steps.length - 1].screen === prog.stdout && prog.exit === 0;
      if (!ok) L.report("bucket:" + p.program, "the model's screen does not match the real stdout of " + p.program);
      return { p: p, prog: prog, steps: steps, ok: ok };
    });
    bar.insertAdjacentHTML("beforeend", roads.map(function (r, i) {
      return '<button type="button" class="path-btn' + (r.p.flush ? "" : " bug") + '" aria-pressed="' + (i === 0) + '" data-path="' + esc(r.p.id) + '">' + esc(r.p.label) + "</button>";
    }).join(""));
    var cur = roads[0], narrow = false, lis = [];
    function lineFor(st) { return st.kind === "start" ? cur.p.startLine : st.kind === "write" ? cur.p.writeLine : st.kind === "flush" ? cur.p.flushLine : cur.p.endLine; }
    function render(rs, announce) {
      narrow = (stage ? stage.clientWidth : 700) < 560;
      var st = cur.steps[rs.step], d = drawBucket(m, st, narrow);
      svg.setAttribute("viewBox", d.vb); svg.innerHTML = d.svg;
      var ln = lineFor(st);
      for (var a = 0; a < lis.length; a++) { lis[a].classList.toggle("ran", ln === a + 1); if (ln === a + 1) lis[a].setAttribute("data-now", ""); else lis[a].removeAttribute("data-now"); }
      scr.innerHTML = st.screen ? esc(st.screen.replace(/\n$/, "")) : '<span class="empty">(nothing on the screen yet)</span>';
      var n = noteFor(m, cur.p, st);
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + cur.steps.length + "</span>" + n;
      if (live && announce) live.textContent = cur.p.label + ", step " + (rs.step + 1) + " of " + cur.steps.length + ". " + n.replace(/<[^>]+>/g, "") + " " + describe(m, st);
    }
    function choose(id) {
      cur = roads.filter(function (r) { return r.p.id === id; })[0] || roads[0];
      var bs = bar.querySelectorAll(".path-btn");
      for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(bs[j].getAttribute("data-path") === cur.p.id));
      if (tab) tab.textContent = cur.p.program;
      var src = cur.prog ? cur.prog.src.replace(/\n$/, "").split("\n") : [];
      codeOl.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
      lis = codeOl.querySelectorAll("li");
      L.hangLines(lis);   // wrapped lines continue under their first character (DESIGN_SYSTEM.md section 6)
      if (par) { par.textContent = cur.ok ? "Screen matches the real run of " + cur.p.program : "Does not match the real run of " + cur.p.program; par.classList.toggle("bad", !cur.ok); }
      if (tb) tb.innerHTML = cur.steps.map(function (st, k) {
        return "<tr><td>" + (k + 1) + "</td><td>" + noteFor(m, cur.p, st) + "</td><td>" + esc(describe(m, st)) + "</td></tr>";
      }).join("");
      runner.reset(cur.steps.length);
    }
    var runner = L.runner(box, cur.steps.length, render, { reserve: true });
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) choose(b.getAttribute("data-path")); });
    choose(cur.p.id);
    var timer = null;
    root.addEventListener("resize", function () {
      if (timer) root.clearTimeout(timer);
      timer = root.setTimeout(function () { var w = (stage ? stage.clientWidth : 700) < 560; if (w !== narrow) render(runner.state(), false); }, 150);
    });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-bucket]");
    for (var i = 0; i < boxes.length; i++) { try { mountBucket(boxes[i]); } catch (e) { L.report("bucket", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
