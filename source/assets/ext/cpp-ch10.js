/* C++ book, chapter 10 extension: "Menus and Pause Buttons".
   Claims no output of its own: every screen, terminal and exercise reads the captured runs in data/cpp-ch10.js through the
   engine. It does one thing: the gdb screens of the walk-through (panel 27) and the call-stack tracer (panel 28) are
   engine screens whose text changes at every step. gdb lines are long (`15      int bill = total_bill(12, 8);`,
   library paths), so after each change their text is split into one block per line and handed to the engine's
   L.hangLines: a wrapped line then continues under its own first character, and breaks fall at spaces only, never inside a
   path or after a hyphen. The text itself is not changed (each block keeps its own newline). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch10.js loaded before comic.js"); return; }
  var L = P.comic.lib;
  function lines(pre) {
    var txt = pre.textContent;
    if (pre.getAttribute("data-gdb-done") === txt && pre.querySelector(".tl")) return;   // already split: our own mutation
    var parts = txt.split("\n"), html = "";
    for (var i = 0; i < parts.length; i++) {
      if (i === parts.length - 1 && parts[i] === "") break;
      html += '<span class="tl">' + L.esc(parts[i]) + (i < parts.length - 1 ? "\n" : "") + "</span>";
    }
    pre.innerHTML = html;
    pre.setAttribute("data-gdb-done", txt);
    if (L.hangLines) L.hangLines(pre.querySelectorAll(".tl"));
  }
  P.comic.ext(function () {
    var pres = document.querySelectorAll(".gdb-screen pre");
    if (!pres.length) return;
    if (!L.hangLines) { L.report("cpp-ch10", "L.hangLines is missing: gdb screens wrap without a hanging indent"); return; }
    Array.prototype.forEach.call(pres, function (pre) {
      lines(pre);
      new MutationObserver(function () { lines(pre); }).observe(pre, { childList: true, characterData: true, subtree: true });
    });
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
