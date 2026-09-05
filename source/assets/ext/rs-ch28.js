/* Rust book, chapter 28 extension: "Handles, Race Cars, Hardware" (API design, performance basics, the crate ecosystem).
   Adds, registered with the comic engine (the Trail Guide character now comes from comic-critters.js):
   (2) [data-allocbars]  the allocation bars: one group of horizontal bars per comparison, each bar's number read from the
                         captured stdout of the named program (lines of the form "<label>: <N> allocations"). Model:
                         { program, groups: [{title, bars: [{label, name}], note}] } where label is the text before the
                         colon in the real output and name is what the bar says on the page.
                         Parity: every bar must find its line in the real run, and every "allocations" line of the run
                         must be drawn by some bar; otherwise L.report() fails the page. Bars are plain HTML with the
                         number written next to each bar, so nothing depends on colour or on the bar's length alone,
                         and a table under the bars repeats every number (the text version). Nothing is interactive. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch28.js loaded before the engine"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------------- (2) [data-allocbars] ---------------- */
  var LINE = /^(.+): (\d+) allocations?$/;
  function allocbars(box) {
    var id = box.getAttribute("data-allocbars"), where = "allocbars:" + id;
    var src = document.getElementById(id), m;
    try { m = JSON.parse(src.textContent); } catch (e) { L.report(where, "model is not valid JSON"); return; }
    var q = L.program(m.program); if (!q) return;
    var found = {}, used = {}, ok = true;
    q.stdout.split("\n").forEach(function (l) { var r = LINE.exec(l); if (r) found[r[1]] = Number(r[2]); });
    var html = "", rows = "";
    m.groups.forEach(function (g) {
      var nums = g.bars.map(function (b) {
        if (!(b.label in found)) { ok = false; L.report(where, "no line \"" + b.label + ": N allocations\" in the run of " + m.program); return 0; }
        used[b.label] = true; return found[b.label];
      });
      var max = Math.max.apply(null, nums.concat([1]));
      html += '<div class="ab-group"><h3 class="ab-title">' + g.title + "</h3>";
      g.bars.forEach(function (b, i) {
        var n = nums[i], pct = n === 0 ? 0 : Math.max(2, Math.round(100 * n / max));
        html += '<div class="ab-row"><span class="ab-name">' + b.name + '</span><span class="ab-track"><span class="ab-bar' + (n === 0 ? " zero" : "") + '" style="width:' + pct + '%"></span></span>' +
          '<span class="ab-num">' + n + (n === 1 ? " allocation" : " allocations") + (n === 0 ? " (none!)" : "") + "</span></div>";
        rows += "<tr><td>" + esc(g.title.replace(/<[^>]+>/g, "")) + "</td><td>" + b.name + "</td><td>" + n + "</td></tr>";
      });
      if (g.note) html += '<p class="ab-note">' + g.note + "</p>";
      html += "</div>";
    });
    Object.keys(found).forEach(function (k) { if (!used[k]) { ok = false; L.report(where, "the run prints \"" + k + "\", but no bar draws it"); } });
    box.querySelector(".ab-chart").innerHTML = html;
    var tb = box.querySelector(".transcript tbody"); if (tb) tb.innerHTML = rows;
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every number matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-allocbars]");
    for (var i = 0; i < boxes.length; i++) allocbars(boxes[i]);
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
