/* JavaScript book, chapter 4 additions ("Necklaces and Scissors"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch4.html:

   1. (The ghost creature now says "undefined" in the engine for this book, and trace folding with [data-fold] on a terminal is done by the engine.)
   2. The bead bench ([data-beads]): a string drawn as beads on a thread, with bead numbers above (from 0) and negative
      numbers below. Pick an expression chip: the beads it reads are raised, a slice shows its two scissor cuts in the
      gaps between beads, and a search shows where the match starts. The chip text is read from the model program's own
      source (line k+2 is `console.log(EXPR);` for item k), the printed result from its captured run (stdout line k+1).
      The parity badge checks every item: recomputing the expression in this browser must give exactly what Node printed.
   3. [data-out="prog.js#N"]: an element inside a drawing whose text is line N of a captured run's output. It is filled
      from the capture (never typed), and a .parity[data-out-badge] in the same panel says whether every line was found. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch4.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, C = L.cast;

  /* ---------- 2. the bead bench ---------- */
  var SLICERS = { slice: 1, substring: 1 };
  var SEARCH = { indexOf: 1, lastIndexOf: 1, includes: 1, startsWith: 1, endsWith: 1 };
  function compute(s, it) {
    var a = it.a || [];
    if (it.op === "idx") return s[a[0]];
    if (it.op === "at") return s.at(a[0]);
    if (SLICERS[it.op] || SEARCH[it.op]) return String.prototype[it.op].apply(s, a);
    throw new Error("unknown op " + it.op);
  }
  function kindOf(v) { return v === undefined ? "undefined" : typeof v; }
  function shownValue(v) {
    if (v === undefined) return "undefined";
    if (typeof v === "string") return '"' + v + '"';
    return String(v);
  }
  /* Which beads an item reads, and where cuts or a search window go. */
  function geometry(s, it, v) {
    var n = s.length, a = it.a || [], g = { beads: [], cuts: [], past: false, window: null, mode: "idx" };
    if (it.op === "idx" || it.op === "at") {
      var i = it.op === "at" && a[0] < 0 ? n + a[0] : a[0];
      if (i >= 0 && i < n) g.beads = [i]; else if (i >= n) g.past = true;
      g.mode = it.op === "at" && a[0] < 0 ? "neg" : "idx";
      g.pos = i;
    } else if (it.op === "slice") {
      var st = a[0] < 0 ? Math.max(n + a[0], 0) : Math.min(a[0], n);
      var en = a.length < 2 ? n : (a[1] < 0 ? Math.max(n + a[1], 0) : Math.min(a[1], n));
      g.cuts = [st, en]; g.mode = (a[0] < 0 || a[1] < 0) ? "gapneg" : "gap";
      for (var k = st; k < en; k++) g.beads.push(k);
    } else if (it.op === "substring") {
      var c0 = Math.min(Math.max(a[0] || 0, 0), n), c1 = a.length < 2 ? n : Math.min(Math.max(a[1], 0), n);
      var lo = Math.min(c0, c1), hi = Math.max(c0, c1);
      g.cuts = [lo, hi]; g.mode = "gap";
      for (var q = lo; q < hi; q++) g.beads.push(q);
    } else {
      var needle = a[0], at = -1;
      if (it.op === "indexOf" || it.op === "includes") at = s.indexOf(needle);
      else if (it.op === "lastIndexOf") at = s.lastIndexOf(needle);
      else if (it.op === "startsWith") at = s.startsWith(needle) ? 0 : -1;
      else if (it.op === "endsWith") at = s.endsWith(needle) ? n - needle.length : -1;
      g.mode = "search";
      if (at >= 0) { for (var r = at; r < at + needle.length; r++) g.beads.push(r); g.window = [at, at + needle.length]; }
      g.found = at;
    }
    return g;
  }
  function mountBeads(box) {
    var id = box.getAttribute("data-beads"), m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = prog.src.replace(/\n$/, "").split("\n"), out = L.shown(prog).replace(/\n$/, "").split("\n");
    var s = m.text, n = s.length, problems = [];
    if (src[0].indexOf(JSON.stringify(s)) < 0) problems.push("line 1 does not define " + JSON.stringify(s));
    var items = m.items.map(function (it, k) {
      var line = src[k + 1] || "", mm = /^console\.log\((.*)\);$/.exec(line);
      var expr = mm ? mm[1] : line, printed = out[k], v;
      if (!mm) problems.push("line " + (k + 2) + " is not console.log(...)");
      try { v = compute(s, it); } catch (e) { problems.push(e.message); }
      if (it.op !== "idx" && expr.indexOf("." + it.op + "(") < 0) problems.push("line " + (k + 2) + " does not call " + it.op);
      if (String(v) !== printed) problems.push("item " + (k + 1) + ": browser gives " + String(v) + ", Node printed " + printed);
      return { it: it, expr: expr, printed: printed, v: v, line: k + 2 };
    });
    var ok = !problems.length;
    if (!ok) L.report("beads", id + ": " + problems.join("; "));
    var par = box.querySelector(":scope > .parity");
    if (par) { par.textContent = ok ? "Matches the real run (" + items.length + " of " + items.length + ")" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var chips = box.querySelector(".bd-chips"), bench = box.querySelector(".bd-bench"), res = box.querySelector(".bd-result"), live = box.querySelector("[aria-live]");
    chips.innerHTML = '<span class="label">PICK ONE:</span>' + items.map(function (x, k) {
      return '<button type="button" class="path-btn" aria-pressed="false" data-k="' + k + '"><code>' + esc(x.expr) + "</code></button>";
    }).join("");
    function cell(cls, col, row, html, extra) { return '<div class="' + cls + '" style="grid-column:' + col + ";grid-row:" + row + '"' + (extra || "") + ">" + html + "</div>"; }
    function show(k) {
      var x = items[k], g = geometry(s, x.it, x.v), gapMode = g.mode === "gap" || g.mode === "gapneg", neg = g.mode === "neg" || g.mode === "gapneg";
      var cols = n + (g.past ? 1 : 0), html = "";
      // thread
      html += cell("bd-thread", "1 / -1", 2, "", ' aria-hidden="true"');
      for (var i = 0; i < n; i++) {
        var col = 2 * i + 2, on = g.beads.indexOf(i) >= 0;
        html += cell("bd-bead" + (on ? " on" : ""), col, 2, "<span>" + esc(s[i] === " " ? "␣" : s[i]) + "</span>");
        if (!gapMode) {
          html += cell("bd-num" + (on && !neg ? " hot" : ""), col, 1, String(i));
          if (g.mode !== "search") html += cell("bd-num neg" + (on && neg ? " hot" : ""), col, 3, String(i - n));
        }
      }
      if (g.past) {
        var pc = 2 * n + 2;
        html += cell("bd-bead empty", pc, 2, "<span>?</span>");
        html += cell("bd-num hot", pc, 1, String(g.pos));
      }
      for (var j = 0; j <= n; j++) {
        var gc = 2 * j + 1, cut = g.cuts.indexOf(j) >= 0;
        if (gapMode) {
          html += cell("bd-num gapn" + (cut ? " hot" : ""), gc, 1, String(j));
          if (neg && j > 0 && j < n) html += cell("bd-num neg gapn" + (cut ? " hot" : ""), gc, 3, String(j - n));
          if (cut) { html += cell("bd-cut", gc, "2 / 4", ""); html += cell("bd-snip", gc, 4, '<span aria-hidden="true">✂</span>'); }
        }
      }
      if (g.window) {
        html += cell("bd-window", (2 * g.window[0] + 2) + " / " + (2 * g.window[1] + 1), 3, '<span>match starts at ' + g.window[0] + "</span>");
      }
      bench.innerHTML = html;
      bench.style.gridTemplateColumns = "repeat(" + cols + ", var(--gap) minmax(0, 1fr)) var(--gap)";
      // the result
      var kind = kindOf(x.v), what;
      if (SLICERS[x.it.op]) what = "a <b>new</b> string, cut out as a copy. The necklace itself is untouched.";
      else if (kind === "undefined") what = "there is no bead there, so you get the ghost. No crash.";
      else if (kind === "number") what = x.v === -1 ? "a number: <b>-1</b> means \"not found anywhere\"." : "a number: the bead number where the match starts.";
      else if (kind === "boolean") what = "a boolean: a yes-or-no answer.";
      else what = "a string of one character: a new one-bead string.";
      res.innerHTML = '<div class="bd-row"><span class="bd-k">CODE</span><span><code>' + L.highlight(x.expr) + "</code></span></div>" +
        '<div class="bd-row"><span class="bd-k">REAL RUN PRINTS</span><span>' + (x.printed === "" ? "<i>(an empty line)</i>" : "<samp>" + esc(x.printed) + "</samp>") + "</span></div>" +
        '<div class="bd-row"><span class="bd-k">THE VALUE</span><span><code>' + esc(shownValue(x.v)) + "</code> " + what + "</span></div>" +
        (x.it.note ? '<p class="bd-note">' + x.it.note + "</p>" : "") +
        (kind === "undefined" ? '<svg class="char sm" data-char="ghost"></svg>' : "");
      if (kind === "undefined" && L.drawCast) L.drawCast(res);
      var bs = chips.querySelectorAll(".path-btn");
      for (var b = 0; b < bs.length; b++) bs[b].setAttribute("aria-pressed", String(b === k));
      if (live) live.textContent = x.expr + " prints " + (x.printed === "" ? "an empty line" : x.printed) + ". " + (x.it.note ? x.it.note.replace(/<[^>]+>/g, "") : "");
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn"); if (!b) return;
      show(+b.getAttribute("data-k"));
    });
    var tb = box.querySelector("table.transcript tbody");
    if (tb) tb.innerHTML = items.map(function (x) {
      return "<tr><td><code>" + esc(x.expr) + "</code></td><td><samp>" + (x.printed === "" ? "(empty line)" : esc(x.printed)) + "</samp></td><td>" + esc(shownValue(x.v)) + "</td><td>" + (x.it.note || "") + "</td></tr>";
    }).join("");
    show(m.start || 0);
  }

  /* ---------- 3. lines quoted from captures inside drawings ---------- */
  function fillOuts() {
    var els = document.querySelectorAll("[data-out]"), bad = {}, panels = [];
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]);
      var sec = e.closest("section"); if (panels.indexOf(sec) < 0) panels.push(sec);
      var lines = prog ? L.shown(prog).replace(/\n$/, "").split("\n") : [], t = lines[+spec[1] - 1];
      if (t == null) { bad[panels.indexOf(sec)] = true; L.report("out", "no line " + spec[1] + " in " + spec[0]); continue; }
      e.textContent = t;
    }
    panels.forEach(function (sec, k) {
      var b = sec && sec.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.textContent = bad[k] ? "Does not match the real run" : "Every value in this picture is read from the real run";
      b.classList.toggle("bad", !!bad[k]);
    });
  }

  P.comic.ext(function () {
    try { fillOuts(); } catch (e) { L.report("out", e.message); }
    var bb = document.querySelectorAll("[data-beads]");
    for (var k = 0; k < bb.length; k++) { try { mountBeads(bb[k]); } catch (e) { L.report("beads", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
