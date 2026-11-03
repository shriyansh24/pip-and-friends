/* JavaScript book, chapter 2 additions ("Sentences and Jars"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch2.html:

   1. Cast. cabinetfit: the engine's cabinet creature with a frame sized to its drawers (so a one-drawer object box does
      not leave a tall empty frame). The ghost (undefined), lamp (true/false), nullframe (null) and ASI gremlin now come
      from the engine (comic-widgets.js and comic-critters.js), and the engine folds Node's internal trace lines
      ([data-fold]) and names Kit on the map, so the chapter copies of those are gone.
   2. The jar shelf ([data-jars]): pick a jar, and typeof reads its label. Every answer is read from the real run of
      the model's program (one console.log(typeof ...) line per jar), and the parity badge checks that each jar's
      expected label agrees with that run. The null jar shows the misprint: the jar holds null, the label says object. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch2.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, C = L.cast, INK = "#111111";
  function S(w) { return ' stroke="' + INK + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function txt(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>"; }

  /* ---------- 1. cast ---------- */
  if (C.cabinet) C.cabinetfit = { vb: function (el) { var n = Math.min(4, (el.getAttribute("data-keys") || "name,age,city").split(",").length); return "0 0 180 " + (n * 44 + 34); }, draw: C.cabinet.draw };

  /* ---------- 2. the jar shelf ---------- */
  var LID = { number: "#FF9F43", string: "#DDE8FF", boolean: "#FFE45C", undefined: "#FFFFFF", "null": "#E8B04B", bigint: "#FFC2A1", symbol: "#E0D4FF", object: "#B0D7FF" };
  function jarSvg(j, words) {
    var lid = LID[j.kind] || "#FFFFFF";
    if (j.kind === "object") {
      return '<svg viewBox="0 0 110 120" aria-hidden="true" focusable="false"><path d="M8 44 L20 22 H90 L102 44 z" fill="#E8C49A"' + S(3) + "/>" +
        '<rect x="8" y="44" width="94" height="70" rx="4" fill="#F2D7B3"' + S(3.5) + '/><path d="M55 44 v70" fill="none" stroke="#B8895A" stroke-width="2.5"/>' +
        '<rect x="16" y="62" width="78" height="22" rx="4" fill="' + lid + '"' + S(2.5) + "/>" + (words ? txt(55, 78, j.kind, 13) + txt(55, 104, j.code.length > 11 ? j.code.slice(0, 10) + "…" : j.code, 11) : "") + "</svg>";
    }
    return '<svg viewBox="0 0 90 120" aria-hidden="true" focusable="false"><rect x="16" y="10" width="58" height="16" rx="4" fill="' + lid + '"' + S(3) + "/>" +
      '<path d="M20 26 h50 q12 8 12 22 v54 q0 12 -12 12 h-50 q-12 0 -12 -12 v-54 q0 -14 12 -22 z" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<path d="M18 40 q-4 6 -3 16" fill="none" stroke="#B9C7E3" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="12" y="56" width="66" height="22" rx="4" fill="' + lid + '"' + S(2.5) + "/>" + (words ? txt(45, 72, j.kind, j.kind.length > 7 ? 11.5 : 13) +
      txt(45, 100, j.code.length > 9 ? j.code.slice(0, 8) + "…" : j.code, 11) : "") + "</svg>";
  }
  function mountJars(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-jars")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var srcLines = prog.src.replace(/\n$/, "").split("\n"), outLines = L.shown(prog).replace(/\n$/, "").split("\n");
    var ok = outLines.length === m.jars.length && m.jars.every(function (j, i) { return outLines[i] === j.says; });
    if (!ok) L.report("jars", "parity failed against " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every label matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var row = box.querySelector(".jar-row"), res = box.querySelector(".jar-result"), live = box.querySelector("[aria-live]");
    row.innerHTML = m.jars.map(function (j, i) {
      return '<button type="button" class="path-btn jar' + (j.kind === "object" ? " box" : "") + '" aria-pressed="false" data-i="' + i + '">' + jarSvg(j, false) +
        '<span class="jk">' + esc(j.kind) + '</span><code class="jv">' + esc(j.short || j.code) + '</code><span class="sr-only"> jar, holding ' + esc(j.code) + "</span></button>";
    }).join("");
    function show(i) {
      var j = m.jars[i], real = outLines[i], mis = real !== j.kind;
      res.innerHTML =
        '<div class="jar-pic">' + (j.char ? '<svg class="char' + (j.char === "train" ? " wide" : "") + '" data-char="' + esc(j.char) + '"' + (j.charLabel ? ' data-label="' + esc(j.charLabel) + '"' : "") + (j.charText ? ' data-text="' + esc(j.charText) + '"' : "") + (j.on ? ' data-on="' + esc(j.on) + '"' : "") + (j.keys ? ' data-keys="' + esc(j.keys) + '"' : "") + "></svg>" : jarSvg(j, true)) + "</div>" +
        '<div class="jar-say"><p class="jar-line"><span class="jar-k">LINE ' + (i + 1) + ' OF ' + esc(m.program) + "</span><code>" + L.highlight(srcLines[i]) + "</code></p>" +
        '<p class="jar-out"><span class="jar-k">REAL RUN PRINTS</span><samp>' + esc(real) + "</samp>" + (mis ? ' <span class="misprint">MISPRINT: the jar holds <b>null</b></span>' : ' <span class="match">✓ label = what is inside</span>') + "</p>" +
        '<p class="jar-note">' + j.note + "</p></div>";
      L.drawCast(res);
      var bs = row.querySelectorAll(".jar");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", k === i ? "true" : "false");
      if (live) live.textContent = "The " + j.kind + " jar. typeof says " + real + "." + (mis ? " That is the misprint: the value is null." : "");
    }
    row.addEventListener("click", function (e) { var b = e.target.closest(".jar"); if (b) show(Number(b.getAttribute("data-i"))); });
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.jars.map(function (j, i) {
      return "<tr><td>" + esc(j.kind) + "</td><td><code>" + esc(srcLines[i]) + "</code></td><td><samp>" + esc(outLines[i]) + "</samp>" + (outLines[i] !== j.kind ? " (misprint)" : "") + "</td><td>" + j.note + "</td></tr>";
    }).join("");
    show(m.start || 0);
  }

  P.comic.ext(function () {
    var jars = document.querySelectorAll("[data-jars]");
    for (var k = 0; k < jars.length; k++) { try { mountJars(jars[k]); } catch (e) { L.report("jars", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
