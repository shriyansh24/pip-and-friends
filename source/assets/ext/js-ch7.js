/* JavaScript book, chapter 7 additions ("Vending Machines and Recipe Cards"). Classic deferred script, loaded after
   comic-cast.js. Everything here is local to javascript/ch7.html:

   1. [data-same-out="a.js,b.js,..."]: proves that several captured programs printed exactly the same screen (for
      example the copy-paste program and its one-function rewrite). The element becomes a parity badge.
   2. [data-out="prog.js#N"]: an element inside a hand-drawn picture whose text is line N of a captured run's output.
      It is filled from the capture (never typed). A .parity[data-out-badge] in the same panel says whether every
      line was found. If the element already holds text, that text must equal the captured line. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch7.js loaded before comic.js"); return; }
  var L = P.comic.lib;

  function screenOf(p) { return p.screen != null ? p.screen : p.stdout; }

  function sameOut() {
    var spots = document.querySelectorAll("[data-same-out]");
    for (var i = 0; i < spots.length; i++) {
      var el = spots[i], names = el.getAttribute("data-same-out").split(","), first = L.program(names[0]), ok = !!first;
      for (var k = 1; k < names.length && ok; k++) {
        var p = L.program(names[k]);
        if (!p || screenOf(p) !== screenOf(first)) ok = false;
      }
      el.classList.add("parity");
      el.classList.toggle("bad", !ok);
      el.textContent = ok ? "Same screen, character for character: " + names.join(" and ") : "These programs did not print the same screen";
      if (!ok) L.report("same-out", "outputs differ: " + names.join(", "));
    }
  }

  function outs() {
    var els = document.querySelectorAll("[data-out]"), byPanel = new Map();
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]), ok = false;
      var lines = prog ? screenOf(prog).replace(/\n$/, "").split("\n") : [], n = Number(spec[1]);
      if (prog && n >= 1 && n <= lines.length) {
        var want = lines[n - 1], have = e.textContent.trim();
        if (have && have !== want.trim()) ok = false; else { e.textContent = want; ok = true; }
      }
      if (!ok) L.report("data-out", "'" + e.textContent + "' is not line " + spec[1] + " of " + spec[0]);
      var panel = e.closest("section") || document.body, st = byPanel.get(panel) || { n: 0, bad: 0 };
      st.n++; if (!ok) st.bad++; byPanel.set(panel, st);
    }
    byPanel.forEach(function (st, panel) {
      var b = panel.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.textContent = st.bad ? st.bad + " value(s) in the picture do not match the real run" : "Every value in the picture comes from a real run";
      b.classList.toggle("bad", !!st.bad);
    });
  }

  P.comic.ext(function () {
    try { sameOut(); } catch (e) { L.report("same-out", e.message); }
    try { outs(); } catch (e) { L.report("data-out", e.message); }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
