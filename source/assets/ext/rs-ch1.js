/* Rust book, chapter 1 extension (The Translator Robot). Loads after comic-cast.js.
   Adds one thing the shared engine does not have:
     [data-lens]  the detective lens for compiler messages: steps through a REAL captured error, highlighting its
        parts in reading order (first line, the --> location, the copied line and its markers, help). Every
        highlight target is looked up in the captured stderr; if one is missing the badge turns red and the
        problem is reported.
   (Earlier versions also carried a nested-comment highlighter, a Mabel swap for the walker and map, and prompts
   that followed `cd`. The engine now does all three: it nests Rust block comments, draws each book's guide, and
   captured terminal sessions record the real folder for every prompt.)
   Everything shown comes from POLYGLOT.data.captures. Keyboard: the lens uses the engine's stepper. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch1.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------- the detective lens ---------- */
  var ORDER = [["what", "1", "WHAT · first line"], ["where", "2", "WHERE · -->"], ["exact", "3", "EXACTLY · CARET"], ["help", "4", "HELP"], ["fix", "✓", "THE FIX"]];
  function kindOf(t) {
    if (/^error: could not compile/.test(t)) return "cargo";
    if (/^error: aborting due/.test(t)) return "abort";
    if (/^error(\[E\d{4}\])?: /.test(t)) return "head";
    if (/^\s*--> /.test(t)) return "loc";
    if (/^\s*\d+\s+\|/.test(t)) return "src";
    if (/^\s*\|\s*$/.test(t)) return "gutter";
    if (/^\s*\|/.test(t)) return "mark";
    if (/^\s*= note:/.test(t) || /^note:/.test(t)) return "note";
    if (/^help:/.test(t) || /^\s*= help:/.test(t)) return "help";
    if (/^For more information/.test(t)) return "explain";
    return t ? "err" : "blank";
  }
  function partsOf(q) {
    var meta = P.data.captures.meta || {}, st = q.steps ? q.steps[q.steps.length - 1] : null;
    var dir = (st && st.dir) || String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var lines = [{ t: "you@laptop:" + dir + "$ " + (st ? st.cmd : ""), k: "cmd" }], seen = {};
    var out = q.stdout.replace(/\n$/, ""), err = q.stderr.replace(/\n$/, "");
    if (out) out.split("\n").forEach(function (t) { lines.push({ t: t, k: "out" }); });
    if (err) err.split("\n").forEach(function (t) {
      var k = kindOf(t); seen[k] = (seen[k] || 0) + 1;
      lines.push({ t: t, k: k, n: seen[k], e: true });
    });
    return lines;
  }
  function hits(l, hl) {
    return hl.some(function (h) {
      if (h === "err") return !!l.e;
      var m = /^(\w+)#(\d+)$/.exec(h);
      return m ? l.k === m[1] && l.n === Number(m[2]) : l.k === h;
    });
  }
  function mountLens(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-lens")).textContent);
    var bar = box.querySelector(".paths"), pre = box.querySelector(".lens-term"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), strip = box.querySelector(".lens-order"), tb = box.querySelector(".transcript tbody");
    bar.insertAdjacentHTML("beforeend", m.cases.map(function (c) { return '<button type="button" class="path-btn bug" aria-pressed="false" data-case="' + c.id + '">' + esc(c.label) + "</button>"; }).join(""));
    strip.innerHTML = ORDER.map(function (o) { return '<li data-o="' + o[0] + '"><b>' + o[1] + "</b> " + o[2] + "</li>"; }).join("");
    var cur, lines, run;
    function check(c) {
      var q = L.program(c.program); if (!q) return false;
      var ls = partsOf(q), first = ls.filter(function (l) { return l.e && l.k !== "blank"; })[0];
      var ok = q.exit !== 0 && !!first && first.k === "head";
      if (!ok) L.report("lens:" + c.program, "the real run did not fail with a compiler error on its first line");
      c.steps.forEach(function (s, i) {
        (s.hl || []).forEach(function (h) {
          if (!ls.some(function (l) { return hits(l, [h]); })) { ok = false; L.report("lens:" + c.program, "step " + (i + 1) + " highlights '" + h + "' but the real message has no such line"); }
        });
      });
      if ("exit" in c && c.exit !== q.exit) { ok = false; L.report("lens:" + c.program, "expected exit " + c.exit + ", real exit " + q.exit); }
      return ok;
    }
    function shownLines(hl) { return lines.filter(function (l) { return hits(l, hl); }).map(function (l) { return l.t.trim(); }); }
    function render(st, announce) {
      var s = cur.steps[st.step], hl = s.hl || [];
      var first = true;   // the first highlighted line carries data-now, so on phones the engine scrolls it into view
      pre.innerHTML = lines.map(function (l) {
        var on = hits(l, hl), now = on && first; if (on) first = false;
        return '<span class="lens-ln' + (on ? " hit" : "") + (l.e ? " err" : "") + (l.k === "cmd" ? " cmd" : "") + '"' + (now ? " data-now" : "") + '><span class="lens-g" aria-hidden="true">' + (on ? "▶ " : "  ") + "</span>" + esc(l.t) + "</span>";
      }).join("\n");
      var lis = strip.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) { var here = lis[i].getAttribute("data-o") === s.clue; lis[i].classList.toggle("on", here); if (here) lis[i].setAttribute("aria-current", "step"); else lis[i].removeAttribute("aria-current"); }
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + (hl.length ? " Highlighted: " + shownLines(hl).join(" / ") : "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-case") === cur.id ? "true" : "false");
    }
    function choose(id) {
      cur = m.cases.filter(function (c) { return c.id === id; })[0] || m.cases[0];
      var q = L.program(cur.program); if (!q) return;
      lines = partsOf(q);
      var ok = check(cur);
      if (par) { par.textContent = ok ? "Real compiler message from " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      if (tb) tb.innerHTML = cur.steps.map(function (s, i) {
        var shown = shownLines(s.hl || []).map(esc).join("<br>");
        return "<tr><td>" + (i + 1) + "</td><td><code>" + (shown || "(none)") + "</code></td><td>" + s.note + "</td></tr>";
      }).join("");
      if (!run) run = L.runner(box, cur.steps.length, render);
      run.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-case")); if (live) live.textContent = "Case chosen: " + b.textContent + "."; } });
    choose(m.cases[0].id);
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-lens]");
    for (var j = 0; j < b.length; j++) { try { mountLens(b[j]); } catch (e) { L.report("lens", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
