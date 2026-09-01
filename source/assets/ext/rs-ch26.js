/* Rust book, chapter 26 extension: "The Busy Kitchen" (threads, channels, Arc and Mutex).
   Adds, registered with the comic engine:
   (1) cast: linecook   (now in comic-critters.js, engine pass 3; this page loads it) a line cook in a tall white hat, standing for one thread. data-variant = a | b | c | d (neckerchief
                        and apron colour, so several cooks can be told apart; each also has a different name badge);
                        data-label = badge text (<= 5 characters); data-pose = work (a pan, default), wait (arms folded,
                        "..." bubble), ticket (holding an order ticket), knife (holding the one knife), cheer.
   (2) [data-cooklanes] the kitchen swimlanes: one lane per thread, one row per event, for several runs of the SAME
                        program. Model: { program, lanes: [{id, label, prefix, cook}], pre: [{lane, act}],
                        waitAfter: {lane, act}, post: [{lane, act}], runs: [{id, label, real?, lines?, impossible?, why?}] }.
                        Every printed line belongs to the lane whose prefix it starts with.
                        Parity: the run marked real IS the captured stdout (built from it, never typed); every other run
                        must use exactly the captured lines, and must keep each lane's own order (a valid interleaving),
                        unless it is marked impossible, in which case the check must FAIL for it (so the page can never
                        call a possible run impossible, or the other way round).
   The stepper uses the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fills a
   text-version table. States are told apart by words and marks (▶, zz, ✓, ✗) and border style, never by colour alone.
   Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch26.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  /* ---------------- (2) the kitchen swimlanes ---------------- */
  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function laneOf(m, line) {
    var hit = m.lanes.filter(function (ln) { return line.indexOf(ln.prefix) === 0; });
    return hit.length === 1 ? hit[0].id : null;
  }
  function perLane(m, lines) {
    var o = {}; m.lanes.forEach(function (ln) { o[ln.id] = []; });
    lines.forEach(function (l) { var id = laneOf(m, l); if (id) o[id].push(l); });
    return o;
  }
  function sameLists(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }
  function sortedCopy(a) { return a.slice().sort(); }

  function mountLanes(box) {
    var m = model(box.getAttribute("data-cooklanes")), prog = L.program(m.program);
    if (!prog) return;
    var ok = true, real = L.shown(prog).replace(/\n$/, "").split("\n");
    real.forEach(function (l, i) { if (!laneOf(m, l)) { ok = false; L.report("cooklanes", "line " + (i + 1) + " of " + m.program + " ('" + l + "') matches no single lane prefix"); } });
    var want = perLane(m, real);
    var laneById = {}; m.lanes.forEach(function (ln) { laneById[ln.id] = ln; });

    // Build and check every run.
    var runs = m.runs.map(function (r) {
      var lines = r.real ? real.slice() : r.lines;
      var valid = sameLists(sortedCopy(lines), sortedCopy(real));
      if (!valid && !r.impossible) { ok = false; L.report("cooklanes", "run '" + r.label + "' does not use exactly the lines of the real run"); }
      var got = perLane(m, lines);
      var keepsOrder = m.lanes.every(function (ln) { return sameLists(got[ln.id], want[ln.id]); });
      if (r.impossible && valid && keepsOrder) { ok = false; L.report("cooklanes", "run '" + r.label + "' is marked impossible, but it is a valid interleaving"); }
      if (!r.impossible && !keepsOrder) { ok = false; L.report("cooklanes", "run '" + r.label + "' breaks a thread's own order, so it is not possible"); }
      var same = !r.real && sameLists(lines, real);
      // events: pre, the prints (with the wait marker after the waiting lane's last print), post
      var ev = (m.pre || []).map(function (e) { return { lane: e.lane, act: e.act }; });
      var lastOfWaiter = -1;
      if (m.waitAfter) lines.forEach(function (l, i) { if (laneOf(m, l) === m.waitAfter.lane) lastOfWaiter = i; });
      lines.forEach(function (l, i) {
        ev.push({ lane: laneOf(m, l), print: l });
        if (i === lastOfWaiter) ev.push({ lane: m.waitAfter.lane, act: m.waitAfter.act, waits: true });
      });
      (m.post || []).forEach(function (e) { ev.push({ lane: e.lane, act: e.act, ends: true }); });
      // the screen after each event
      var shown = [];
      ev.forEach(function (e) { if (e.print != null) shown.push(e.print); e.output = shown.slice(); });
      return { id: r.id, label: r.label, real: !!r.real, impossible: !!r.impossible, why: r.why || "", same: same, lines: lines, ev: ev };
    });
    var realRun = runs.filter(function (r) { return r.real; })[0];
    if (!realRun) { ok = false; L.report("cooklanes", "no run is marked real"); }
    else if ((realRun.lines.join("\n") + "\n") !== L.shown(prog)) { ok = false; L.report("cooklanes", "the captured run does not equal the real output of " + m.program); }
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Checked: the first run is the real capture of " + m.program + "; the others keep each thread's own order" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    // Static gallery: every run side by side, each with its label.
    var gal = box.querySelector(".kl-gallery");
    if (gal) gal.innerHTML = runs.map(function (r) {
      var tag = r.impossible ? '<span class="kl-tag no">✗ impossible</span>' : r.real ? '<span class="kl-tag yes">✓ one possible run (captured)</span>' : '<span class="kl-tag yes">✓ one possible run</span>';
      return '<div class="kl-card' + (r.impossible ? " bad" : "") + '"><h4>' + esc(r.label) + "</h4>" + tag +
        "<pre>" + r.lines.map(function (l) { return esc(l); }).join("\n") + "</pre>" +
        (r.impossible && r.why ? '<p class="kl-why">' + r.why + "</p>" : "") + (r.same ? '<p class="kl-why">This time, the captured run was exactly this one too.</p>' : "") + "</div>";
    }).join("");

    // The stepper.
    var bar = box.querySelector(".kl-runs"), grid = box.querySelector(".kl-grid"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), story = box.querySelector(".kl-story");
    bar.insertAdjacentHTML("beforeend", runs.map(function (r) { return '<button type="button" class="path-btn' + (r.impossible ? " bug" : "") + '" aria-pressed="false" data-run="' + esc(r.id) + '">' + esc(r.label) + "</button>"; }).join(""));
    var cur = runs[0];
    var cols = m.lanes.length;
    grid.style.setProperty("--kl-cols", cols);
    function laneState(r, k, laneId) {
      // what this lane is doing after event k
      var last = -1, waiting = false, ended = false;
      for (var i = 0; i <= k; i++) { var e = r.ev[i]; if (e.lane !== laneId) continue; last = i; if (e.waits) waiting = true; if (e.ends) { ended = true; waiting = false; } }
      var prints = r.ev.filter(function (e) { return e.lane === laneId && e.print != null; }).length;
      var done = r.ev.slice(0, k + 1).filter(function (e) { return e.lane === laneId && e.print != null; }).length;
      if (ended) return "✓ finished";
      if (waiting) return "zz waiting in join()";
      if (laneById[laneId].helper && done === prints && prints > 0) return "✓ finished";
      if (last < 0 && laneById[laneId].helper) return "· not started";
      return "▶ working";
    }
    function render(st, announce) {
      var k = st.step, r = cur, e = r.ev[k];
      var head = '<div class="kl-head">' + m.lanes.map(function (ln) {
        return '<div class="kl-lane-h"><svg class="char sm kl-cook" data-char="linecook" data-variant="' + esc(ln.cook || "a") + '" data-label="' + esc(ln.badge || "") + '" data-pose="' + (laneState(r, k, ln.id).indexOf("zz") === 0 ? "wait" : laneState(r, k, ln.id).indexOf("✓") === 0 ? "cheer" : "work") + '" aria-hidden="true"></svg><b>' + esc(ln.label) + '</b><span class="kl-state">' + laneState(r, k, ln.id) + "</span></div>";
      }).join("") + "</div>";
      var rows = r.ev.map(function (ev, i) {
        var cls = "kl-row" + (i === k ? " now" : "") + (i > k ? " later" : "");
        return '<div class="' + cls + '"' + (i === k ? " data-now" : "") + (i > k ? ' aria-hidden="true"' : "") + ">" + m.lanes.map(function (ln) {
          if (ev.lane !== ln.id || i > k) return '<div class="kl-cell"></div>';
          var body = ev.print != null ? '<code class="kl-print">' + esc(ev.print) + "</code>" : '<span class="kl-act' + (ev.waits ? " waits" : "") + '">' + esc(ev.act) + "</span>";
          return '<div class="kl-cell on">' + (i === k ? '<span class="kl-now">▶ now</span>' : "") + body + "</div>";
        }).join("") + "</div>";
      }).join("");
      grid.innerHTML = head + '<div class="kl-body">' + rows + "</div>";
      L.drawCast(grid);
      if (L.fitLabels) L.fitLabels();
      out.innerHTML = e.output.length ? e.output.map(function (l, i) { return '<span class="' + (announce && e.print != null && i === e.output.length - 1 ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      var who = laneById[e.lane] ? laneById[e.lane].label : e.lane;
      var what = e.print != null ? "<b>" + esc(who) + "</b> prints <code>" + esc(e.print) + "</code>." : "<b>" + esc(who) + "</b>: " + esc(e.act) + ".";
      note.innerHTML = '<span class="count">Step ' + (k + 1) + " of " + r.ev.length + "</span>" + what;
      if (live && announce) live.textContent = r.label + ", step " + (k + 1) + " of " + r.ev.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-run") === cur.id ? "true" : "false");
    }
    var rn = L.runner(box, cur.ev.length, render, { reserve: true });
    function choose(id) {
      cur = runs.filter(function (r) { return r.id === id; })[0] || runs[0];
      if (story) story.innerHTML = cur.impossible ? "<b>✗ Impossible.</b> " + cur.why : cur.real ? "<b>✓ The run we captured</b>: one possible run, exactly as the terminal printed it." + (m.realNote ? " " + m.realNote : "") : "<b>✓ One possible run.</b> Each thread still does its own lines in order; only the mixing differs." + (cur.same ? " (This time, the captured run was this one too.)" : "");
      story.classList.toggle("bad", cur.impossible);
      var tb = box.querySelector(".transcript tbody");
      if (tb) tb.innerHTML = cur.ev.map(function (e, i) {
        var who = laneById[e.lane] ? laneById[e.lane].label : e.lane;
        return "<tr><td>" + (i + 1) + "</td><td>" + esc(who) + "</td><td>" + (e.print != null ? "prints <code>" + esc(e.print) + "</code>" : esc(e.act)) + "</td><td><code>" + (e.output.length ? esc(e.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
      }).join("");
      var cap = box.querySelector(".transcript caption"); if (cap) cap.textContent = "Chosen run: " + cur.label + (cur.impossible ? " (impossible)" : " (one possible run)");
      rn.reset(cur.ev.length);
    }
    bar.addEventListener("click", function (ev) { var b = ev.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-run")); if (live) live.textContent = "Run chosen: " + b.textContent + "."; } });
    choose(runs[0].id);
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-cooklanes]");
    for (var i = 0; i < b.length; i++) { try { mountLanes(b[i]); } catch (e) { L.report("cooklanes", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
