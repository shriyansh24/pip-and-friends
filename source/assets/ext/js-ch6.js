/* JavaScript book, chapter 6 additions ("Switches and Laps"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch6.html:

   1. [data-same-body="a.js,b.js,..."]: proves that the copies a map runs (one per road) are the same program except for
      line 1, where the input value is set. Compared against the captured sources; the element becomes a parity badge.
      (Named apart from the engine's [data-same-src], which proves fully identical sources.)
   2. [data-out="prog.js#N"]: an element inside a drawing whose text is line N of a captured run's output. It is filled
      from the capture (never typed), and a .parity[data-out-badge] in the same panel says whether every line was found. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch6.js loaded before comic.js"); return; }
  var L = P.comic.lib;

  function sameSrc() {
    var spots = document.querySelectorAll("[data-same-body]");
    for (var i = 0; i < spots.length; i++) {
      var el = spots[i], names = el.getAttribute("data-same-body").split(","), first = L.program(names[0]), ok = !!first;
      var rest = first ? first.src.split("\n").slice(1).join("\n") : "";
      for (var k = 1; k < names.length && ok; k++) {
        var p = L.program(names[k]);
        if (!p || p.src.split("\n").slice(1).join("\n") !== rest) ok = false;
      }
      el.classList.add("parity");
      el.classList.toggle("bad", !ok);
      el.textContent = ok ? "Same program on every road: only line 1 differs (" + names.join(", ") + ")"
                          : "The road programs are not the same program";
      if (!ok) L.report("same-body", "programs differ beyond line 1: " + names.join(", "));
    }
  }

  function outs() {
    var els = document.querySelectorAll("[data-out]"), bad = {}, panels = [];
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]);
      var sec = e.closest("section");
      if (panels.indexOf(sec) < 0) panels.push(sec);
      var lines = prog ? L.shown(prog).replace(/\n$/, "").split("\n") : [];
      var n = Number(spec[1]);
      if (!prog || !(n >= 1 && n <= lines.length)) { bad[panels.indexOf(sec)] = true; L.report("data-out", "no line " + spec[1] + " in " + spec[0]); continue; }
      e.textContent = lines[n - 1];
    }
    panels.forEach(function (sec, k) {
      var b = sec && sec.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.classList.toggle("bad", !!bad[k]);
      b.textContent = bad[k] ? "A value in this picture is missing from the real runs" : "The answers drawn in this picture are read from the real runs";
    });
  }

  P.comic.ext(function () { sameSrc(); outs(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
