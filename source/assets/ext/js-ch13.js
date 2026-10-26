/* JavaScript book, chapter 13 additions ("Plan It, Pack It"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch13.html:
   [data-out="prog.js#N"]: an element inside a hand-drawn picture (or a call card) whose text is line N of a captured
   run's output. It is filled from the capture (never typed). A .parity[data-out-badge] in the same panel says whether
   every line was found. If the element already holds text, that text must equal the captured line. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch13.js loaded before comic.js"); return; }
  var L = P.comic.lib;

  function screenOf(p) { return p.screen != null ? p.screen : p.stdout; }
  function lines(s) { return s.replace(/\n$/, "") === "" ? [] : s.replace(/\n$/, "").split("\n"); }

  function outs() {
    var els = document.querySelectorAll("[data-out]"), byPanel = new Map();
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]), ok = false;
      var ls = prog ? lines(screenOf(prog)) : [], n = Number(spec[1]);
      if (prog && n >= 1 && n <= ls.length) {
        var want = ls[n - 1], have = e.textContent.trim();
        if (have && have !== want.trim()) ok = false; else { e.textContent = want; ok = true; }
      }
      if (!ok) L.report("data-out", "'" + e.textContent + "' is not line " + spec[1] + " of " + spec[0]);
      var panel = e.closest("section") || document.body, st = byPanel.get(panel) || { n: 0, bad: 0 };
      st.n++; if (!ok) st.bad++; byPanel.set(panel, st);
    }
    byPanel.forEach(function (st, panel) {
      var b = panel.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.textContent = st.bad ? st.bad + " value(s) shown here do not match the real run" : "Every value shown here comes from a real run";
      b.classList.toggle("bad", !!st.bad);
    });
  }

  P.comic.ext(function () {
    try { outs(); } catch (e) { L.report("data-out", e.message); }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
