/* Go book, chapter 15 ("Libraries and Answer Keys") additions. Classic deferred script; loads after comic-cast.js.
   [data-testrun]: the test-report reader (renamed from [data-report], which names three other widgets in other chapters). It prints the REAL captured output of one `go test` command, line for line,
   and steps through it like a detective, lighting one line at a time with a word tag and a note.
   Model: { "program": "rp_table.go",          // a captured program (usually a .cmd run of go test)
            "step": 0,                          // optional: which command of that run (default: the last one)
            "marks": [ { "line": "=== RUN   TestAdd",   // must equal a whole line of that output, found in order
                         "tag": "STARTS",               // a short word shown on the lit line (never colour alone)
                         "note": "HTML" } ] }
   Parity: every mark's line must be found, in order, among the real output's lines; otherwise the badge turns bad and
   L.report() fires. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table lists every
   lit line with its meaning. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch15.js loaded before comic.js"); return; }
  var esc = L.esc;

  function show(s) { return esc(s).replace(/\t/g, '<span class="rr-tab">\t</span>'); }

  function mount(box) {
    var id = box.getAttribute("data-testrun"), el = document.getElementById(id);
    if (!el) { L.report("report:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program);
    if (!q) return;
    var steps = q.steps || [{ out: q.stdout }];
    var st = steps[m.step == null ? steps.length - 1 : m.step];
    var lines = String(st.out || "").replace(/\n$/, "").split("\n");
    // find each mark in order
    var at = [], from = 0, ok = true;
    m.marks.forEach(function (mk) {
      var k = lines.indexOf(mk.line, from);
      if (k < 0) { ok = false; at.push(-1); L.report("report:" + id, "line not in the real run of " + m.program + ": " + mk.line); }
      else { at.push(k); from = k + 1; }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every lit line is in the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var cmd = box.querySelector(".rr-cmd");
    if (cmd && st.cmd) cmd.innerHTML = '<span class="prompt">you@laptop:' + esc(st.dir || "~") + "$ </span>" + esc(st.cmd);
    var ol = box.querySelector(".rr-lines");
    ol.innerHTML = lines.map(function (l) { return '<li><span class="rr-text">' + (l ? show(l) : "&nbsp;") + '</span><span class="rr-tag" aria-hidden="true"></span></li>'; }).join("");
    // wrapped report lines continue under their own first character, so a subtest's indent stays visible on phones
    L.hangLines(ol.querySelectorAll(".rr-text"));
    var lis = ol.querySelectorAll("li"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.marks.map(function (mk, i) {
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(mk.line.replace(/\t/g, "  ")) + "</code></td><td>" + esc(mk.tag) + "</td><td>" + mk.note + "</td></tr>";
    }).join("");
    function render(s, announce) {
      var mk = m.marks[s.step], k = at[s.step];
      for (var i = 0; i < lis.length; i++) {
        var on = i === k, seen = at.slice(0, s.step).indexOf(i) >= 0;
        lis[i].classList.toggle("on", on);
        if (on) lis[i].setAttribute("data-now", ""); else lis[i].removeAttribute("data-now");
        lis[i].classList.toggle("seen", seen && !on);
        lis[i].querySelector(".rr-tag").textContent = on ? "◀ " + mk.tag : "";
      }
      note.innerHTML = '<span class="count">Line ' + (s.step + 1) + " of " + m.marks.length + "</span><b>" + esc(mk.tag) + ".</b> " + mk.note;
      // keep the lit line in the middle of the scrolling box on every render (reset too). The offset is measured inside
      // the box: li.offsetTop counts from the panel, which overshot by the box's own position.
      if (k >= 0) {
        var li = lis[k], wrap = ol.parentNode;
        if (wrap && wrap.scrollHeight > wrap.clientHeight) wrap.scrollTop = Math.max(0, li.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop - wrap.clientHeight / 2);
      }
      if (live && announce) live.textContent = "Line " + (s.step + 1) + ": " + mk.line.replace(/\t/g, " ") + ". " + mk.tag + ". " + note.textContent.replace(/^Line \d+ of \d+/, "");
    }
    var rn = L.runner(box, m.marks.length, render, { reserve: true });   // keeps the tallest narration, so the buttons never move
    rn.reset(m.marks.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-testrun]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("report", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
