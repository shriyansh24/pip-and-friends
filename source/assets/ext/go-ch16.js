/* Go book, chapter 16 ("The Heist Plan") additions. Classic deferred script; loads after comic-cast.js.
   [data-board]: the heist-plan board. Each card is one job of the capstone program (one function) with its own test.
   Each stage of the stepper is ONE REAL captured `go test -v` run of a snapshot of the project; a card's stamp is read
   straight from that run's output: "--- PASS: TestX (" lights it (PASSED), "--- FAIL: TestX (" marks it FAILED, and a
   test that does not appear leaves it at NO TEST YET. The last card (the getaway: main, built and run) has no test
   function; it is lit by a stage with "run": true when the named real run exited 0 and printed a report.
   Model: { "cards":  [ {"id": "parse", "n": 2, "job": "CRACK EACH LINE", "fn": "parseLine", "file": "parse.go", "test": "TestParseLine"},
                        {"id": "getaway", "n": 5, "job": "THE GETAWAY", "fn": "main", "file": "main.go", "run": "run_good.go"} ],
            "stages": [ {"program": "board_s1.go", "label": "short label", "note": "HTML",
                         "expect": {"parse": "fail", "read": "none", ...}, "run": false} ] }
   Parity: every stage's "expect" must equal the stamps read from the real captures, or the badge turns bad and
   L.report() fires. The real terminal output of each stage is shown by ordinary engine terminals inside the box,
   <pre class="term" data-run="..." data-stage="0 1">, which this script shows and hides. The wall and the terminal
   area carry data-reserve, so the engine runner keeps the tallest stage's height and the buttons never jump. Keyboard: the engine's stepper
   (arrows, Space, R). Text version: the transcript table, one row per stage. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch16.js loaded before comic.js"); return; }
  var esc = L.esc;
  var WORD = { pass: "✓ PASSED", fail: "✗ FAILED", none: "NO TEST YET", wait: "NOT RUN YET" };
  var SAY = { pass: "passed", fail: "failed", none: "has no test yet", wait: "has not run yet" };

  function stamp(card, st) {
    if (card.test) {
      var q = L.program(st.program); if (!q) return "none";
      if (q.stdout.indexOf("--- PASS: " + card.test + " (") >= 0) return "pass";
      if (q.stdout.indexOf("--- FAIL: " + card.test + " (") >= 0) return "fail";
      return "none";
    }
    if (card.run) {
      if (!st.run) return "wait";
      var r = L.program(card.run); if (!r) return "wait";
      return r.exit === 0 && r.stdout.trim() ? "pass" : "fail";
    }
    return "none";
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-board")).textContent);
    var ok = true;
    m.stages.forEach(function (st, k) {
      st._s = {};
      m.cards.forEach(function (c) {
        var s = stamp(c, st);
        st._s[c.id] = s;
        var want = (st.expect || {})[c.id];
        if (want && want !== s) { ok = false; L.report("board:" + st.program, "stage " + (k + 1) + ": card " + c.id + " is " + s + " in the real run, model says " + want); }
      });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every stamp matches the real go test -v runs" : "Does not match the real runs"; par.classList.toggle("bad", !ok); }

    var grid = box.querySelector(".board-cards"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var terms = box.querySelectorAll("[data-stage]"), head = box.querySelector(".board-stage");
    grid.innerHTML = m.cards.map(function (c) {
      return '<li class="bcard" data-card="' + c.id + '"><span class="bnum" aria-hidden="true">' + c.n + '</span><p class="bjob">' + esc(c.job) + "</p>" +
        '<p class="bfn"><code>' + esc(c.fn) + "</code> <small>in " + esc(c.file) + "</small></p>" +
        '<p class="btest">' + (c.test ? "answer key: <code>" + esc(c.test) + "</code>" : "checked by: a real run") + '</p><p class="bstamp"></p></li>';
    }).join("");
    var items = grid.querySelectorAll(".bcard");
    function render(rs, announce) {
      var st = m.stages[rs.step];
      for (var i = 0; i < items.length; i++) {
        var s = st._s[m.cards[i].id];
        items[i].className = "bcard " + s;
        items[i].querySelector(".bstamp").textContent = WORD[s];
      }
      for (var t = 0; t < terms.length; t++) terms[t].hidden = terms[t].getAttribute("data-stage").split(" ").indexOf(String(rs.step)) < 0;
      if (head) head.textContent = "Stage " + (rs.step + 1) + " of " + m.stages.length + ": " + st.label;
      note.innerHTML = '<span class="count">Stage ' + (rs.step + 1) + " of " + m.stages.length + "</span>" + st.note;
      if (live && announce) live.textContent = "Stage " + (rs.step + 1) + ", " + st.label + ". " + m.cards.map(function (c) { return c.job.toLowerCase() + " " + SAY[st._s[c.id]]; }).join("; ") + ".";
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.stages.map(function (st, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + esc(st.label) + "</td><td>" + m.cards.map(function (c) { return esc(c.fn) + ": " + WORD[st._s[c.id]]; }).join("<br>") + "</td><td>" + st.note + "</td></tr>";
    }).join("");
    // reserve: the wall and the terminal area keep the tallest stage's height, so Back/Next never move between stages
    L.runner(box, m.stages.length, render, { reserve: true }).reset(m.stages.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-board]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._boardMounted) continue; boxes[i]._boardMounted = true; try { mount(boxes[i]); } catch (e) { L.report("board", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
