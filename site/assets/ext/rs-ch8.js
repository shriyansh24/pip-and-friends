/* Rust book, chapter 8 extension (The Library Ledger). Loads after comic-cast.js.
   Adds one widget the engine does not have: Mabel's ledger, a line-by-line permission table in the style of the
   Brown University edition of the Rust book. For each line of a real program it shows which permissions
   (R = read, W = write, O = own) the owner and each borrower have, which loans are open in the ledger, and
   what is on the screen so far.

     <section class="panel clean ledger" data-ledger="ID"> ... controls like the tracer ... </section>
     <script type="application/json" id="ID">{ "program": "last_use.rs", "places": ["book", "through r1", ...],
       "steps": [{ "line": 3, "note": "...", "perms": { "book": "R", "through r1": "R" }, "loans": ["r1 reads book"], "output": [] }] }</script>

   "line" is the line that has JUST run (null before the first line). A place missing from "perms" does not exist
   at that step (drawn as an empty row). Permissions are a teaching model of what the borrow checker tracks at
   compile time; nothing here claims program output except "output", which is checked against the capture:
   every step's screen must be a prefix of the real stdout and the last one must equal it, and the program must
   really compile and run (exit 0). The parity badge says so. Keyboard: the shared stepper (arrows, Space, R). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch8.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;
  var KINDS = [["R", "read"], ["W", "write"], ["O", "own"]];

  function screenOf(prog) { return L.shown ? L.shown(prog) : (prog.screen != null ? prog.screen : prog.stdout); }

  function mountLedger(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-ledger")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n"), real = screenOf(prog), ok = prog.exit === 0;
    m.steps.forEach(function (st, i) {
      var t = (st.output || []).length ? st.output.join("\n") + "\n" : "";
      if (real.indexOf(t) !== 0) { ok = false; L.report("ledger:" + m.program, "step " + (i + 1) + " screen is not a prefix of the real output"); }
    });
    var last = m.steps[m.steps.length - 1], lastT = (last.output || []).length ? last.output.join("\n") + "\n" : "";
    if (lastT !== real) { ok = false; L.report("ledger:" + m.program, "final screen differs from the captured run"); }
    if (prog.exit !== 0) L.report("ledger:" + m.program, "the ledger program must compile and run (exit 0)");
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run (it compiles and runs, exit 0)" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var code = box.querySelector(".lg-code"), table = box.querySelector(".lg-table"), loans = box.querySelector(".lg-loans"),
        out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    if (L.hangLines) L.hangLines(code.querySelectorAll("li"));   // engine hanging indent for wrapped lines
    var lis = code.querySelectorAll("li");

    function cell(has, before, exists) {
      var mark = "";
      if (exists && before != null && has !== before) mark = has ? '<span class="lg-chg back">back</span>' : '<span class="lg-chg lost">lost</span>';
      return mark ? { mark: mark } : { mark: "" };
    }
    function render(st, announce) {
      var s = m.steps[st.step], prev = st.step > 0 ? m.steps[st.step - 1] : null, perms = s.perms || {}, pp = prev ? (prev.perms || {}) : {};
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      var html = '<thead><tr><th scope="col">Place</th>' + KINDS.map(function (kd) { return '<th scope="col"><abbr title="' + kd[1] + '">' + kd[0] + "</abbr><small>" + kd[1] + "</small></th>"; }).join("") + "</tr></thead><tbody>";
      m.places.forEach(function (pl) {
        var exists = Object.prototype.hasOwnProperty.call(perms, pl), had = Object.prototype.hasOwnProperty.call(pp, pl);
        var seen = m.steps.slice(0, st.step).some(function (q) { return q.perms && Object.prototype.hasOwnProperty.call(q.perms, pl); });
        html += '<tr class="' + (exists ? "" : "gone") + '"><th scope="row"><code>' + esc(pl) + "</code>" + (exists ? "" : "<small>" + (seen ? "loan ended" : "not yet") + "</small>") + "</th>";
        KINDS.forEach(function (kd) {
          var has = exists && perms[pl].indexOf(kd[0]) >= 0, before = had ? pp[pl].indexOf(kd[0]) >= 0 : null;
          var c = cell(has, before, exists && had);
          html += '<td><span class="lg-p ' + (has ? "on" : "off") + '" aria-label="' + kd[1] + ": " + (has ? "yes" : "no") + '">' + (has ? kd[0] : "–") + "</span>" + c.mark + "</td>";
        });
        html += "</tr>";
      });
      table.innerHTML = html + "</tbody>";
      loans.innerHTML = (s.loans && s.loans.length) ? s.loans.map(function (l) { return "<li>" + l + "</li>"; }).join("") : '<li class="none">No open loans. The owner holds everything.</li>';
      out.innerHTML = (s.output || []).length ? s.output.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + (s.line ? "<b>Just ran line " + s.line + ".</b> " : "") + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " " + describe(s);
    }
    function describe(s) {
      var perms = s.perms || {};
      return "Permissions: " + m.places.map(function (pl) { return pl + " " + (perms[pl] == null ? "(none, no such place)" : perms[pl] ? perms[pl].split("").join(" ") : "nothing"); }).join("; ") + ".";
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(lines[s.line - 1].trim()) + "</code>" : "start") + "</td><td>" + s.note + "</td><td>" + esc(describe(s)) + "</td><td>" + ((s.loans && s.loans.length) ? s.loans.join("; ") : "none") + "</td></tr>";
    }).join("");
    var run = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre, .lg-ledger, .tr-code" });
    run.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-ledger]");
    for (var i = 0; i < boxes.length; i++) { try { mountLedger(boxes[i]); } catch (e) { L.report("ledger", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
