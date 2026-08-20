/* Chapter 15 extension: "Cookie Cutters".
   The page's cookie cutter (a class, data-char="cookiecutter") and cookies (instances, data-char="cookie") are the
   engine's: they were first drawn here and moved to comic-critters.js in engine pass 3. Jigsaw, Pockets and Sneak come from comic-critters.js; instance and
   class boxes in the tracers use the engine's object `label`; second-version runs use the engine's data-alt.
   Also fills [data-ver] tags with the version names. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch15.js loaded before the engine"); return; }
  var L = P.comic.lib;

  /* ---------------- version tags ---------------- */
  function initTags() {
    var meta = (P.data && P.data.captures && P.data.captures.meta) || {};
    var tags = document.querySelectorAll("[data-ver]");
    for (var j = 0; j < tags.length; j++) {
      var which = tags[j].getAttribute("data-ver"), prog = tags[j].getAttribute("data-prog"), p = prog ? L.program(prog) : null;
      if (which === "alt") tags[j].textContent = p && p.alt ? p.alt.version : "?";
      else tags[j].textContent = meta.primary || "?";
    }
  }

  P.comic.ext(initTags);
})(typeof globalThis !== "undefined" ? globalThis : this);
