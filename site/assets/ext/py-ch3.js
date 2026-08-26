/* Chapter 3 extension: the "who goes first" reducer.
   Markup: <section data-reduce="MODEL_ID"> with .paths, .rd-ladder (li[data-rung]), .rd-lines, .narration, controls, .parity,
   an aria-live line and a transcript table. Model: { program, roads: [{ id, label, line, steps: [{ expr, hi, rung, note }] }] }.
   Parity: for every road, steps[0].expr must appear on source line `line` of the program, and the last step's expr must equal
   output line `line` of the captured run (each print in the program is one road). Any mismatch is reported and shown. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch3.js loaded before comic.js"); return; }
  var esc = L.esc;

  function mark(expr, hi) {
    if (!hi) return esc(expr);
    var at = expr.indexOf(hi);
    if (at < 0) return null;
    return esc(expr.slice(0, at)) + '<mark class="rd-hi">' + esc(hi) + "</mark>" + esc(expr.slice(at + hi.length));
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-reduce")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = prog.src.replace(/\n$/, "").split("\n"), out = L.shown(prog).replace(/\n$/, "").split("\n");
    var bad = 0;
    m.roads.forEach(function (rd) {
      var first = rd.steps[0].expr, last = rd.steps[rd.steps.length - 1].expr;
      var okSrc = (src[rd.line - 1] || "").indexOf(first) >= 0, okOut = out[rd.line - 1] === last;
      rd.steps.forEach(function (s, i) { if (s.hi && mark(s.expr, s.hi) === null) { okSrc = false; L.report("reduce:" + rd.id, "step " + (i + 1) + ": '" + s.hi + "' not found in '" + s.expr + "'"); } });
      if (!okSrc) L.report("reduce:" + rd.id, "first expression is not on line " + rd.line + " of " + m.program);
      if (!okOut) L.report("reduce:" + rd.id, "final value " + last + " differs from the real output line " + rd.line + ": " + out[rd.line - 1]);
      rd._ok = okSrc && okOut; if (!rd._ok) bad++;
    });
    var par = box.querySelector(".parity");
    var bar = box.querySelector(".paths"), lines = box.querySelector(".rd-lines"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), rungs = box.querySelectorAll(".rd-ladder [data-rung]"), tb = box.querySelector(".transcript tbody");
    bar.insertAdjacentHTML("beforeend", m.roads.map(function (rd) { return '<button type="button" class="path-btn" aria-pressed="false" data-road="' + esc(rd.id) + '"><code>' + esc(rd.label) + "</code></button>"; }).join(""));
    var cur = m.roads[0];
    function render(st, announce) {
      var steps = cur.steps, s = steps[st.step];
      lines.innerHTML = steps.slice(0, st.step + 1).map(function (x, i) {
        var now = i === st.step, done = i === steps.length - 1;
        var body = now ? (mark(x.expr, x.hi) || esc(x.expr)) : esc(x.expr);
        return '<li class="' + (now ? "now" : "was") + (now && done ? " done" : "") + '"><code>' + body + "</code>" +
          (now && x.hi ? '<span class="rd-tag">goes first</span>' : now && done ? '<span class="rd-tag">answer</span>' : "") + "</li>";
      }).join("");
      for (var k = 0; k < rungs.length; k++) {
        var on = s.rung != null && Number(rungs[k].getAttribute("data-rung")) === s.rung;
        rungs[k].classList.toggle("on", on);
      }
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". Expression: " + s.expr + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(bs[j].getAttribute("data-road") === cur.id));
    }
    var run = L.runner(box, cur.steps.length, render, { reserve: true });   // the board keeps its tallest height ([data-reserve]): buttons never move
    function choose(id) {
      cur = m.roads.filter(function (r) { return r.id === id; })[0] || m.roads[0];
      if (par) { par.textContent = cur._ok ? "Answer matches the real run (line " + cur.line + " of " + m.program + ")" : "Does not match the real run"; par.classList.toggle("bad", !cur._ok || bad > 0); }
      if (tb) tb.innerHTML = cur.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s.expr) + "</code></td><td>" + (s.hi ? "Goes first: <code>" + esc(s.hi) + "</code>. " : "") + s.note + "</td></tr>"; }).join("");
      run.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-road")); if (live) live.textContent = "Sum chosen: " + b.textContent + "."; } });
    choose(cur.id);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-reduce]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("reduce", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
