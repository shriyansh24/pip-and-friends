/* Go book, chapter 23 ("The Test Lab") additions. Classic deferred script; loads after comic-cast.js.

   [data-rack]: the test-tube rack. It reads the REAL captured output of one `go test -v` command and turns every
   subtest into a labelled test tube: a PASS tube is full and carries a tick and the word PASS, a FAIL tube is cracked
   and carries a cross and the word FAIL (never colour alone). The stepper visits the tubes in the order `=== RUN`
   printed them and shows the log lines that belong to each one.
   Model: { "program": "rack.go",                 // a captured program (a .cmd run of go test -v)
            "step": 0,                            // optional: which command of that run (default: the last one)
            "test": "TestFee",                    // the parent test whose subtests are the tubes
            "tubes": [ { "name": "feather",       // the name given to t.Run (spaces allowed)
                         "want": "PASS",          // what the page claims; checked against the real run
                         "note": "HTML" } ] }
   Parity: each tube's real name (spaces become underscores, as go test prints them), its order and its PASS/FAIL
   must match the real run, and the parent's verdict must be the one the tubes imply. Any mismatch turns the badge bad
   and calls L.report(). Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table.

   [data-cover]: the coverage highlighter. It reads a REAL cover.out (printed by `cat cover.out` in a captured run)
   and marks each line of the source file: "ran" (a tick) when a test reached it, "never ran" (a cross) when no test
   did. Lines that are not statements stay plain.
   Model: { "program": "cover.go", "step": 3,      // the run and the step that printed cover.out
            "file": "cover/fee.go",               // a captured source file (a .cmd "show" entry)
            "percentStep": 0 }                    // the step whose "coverage: N% of statements" line is checked
   Parity: the percentage computed from cover.out must equal the one go test printed. Text version: a list of the
   lines that never ran. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch23.js loaded before comic.js"); return; }
  var esc = L.esc;

  function stepOut(q, i) {
    var steps = q.steps || [{ out: q.stdout }];
    return steps[i == null ? steps.length - 1 : i] || {};
  }

  /* ---------------- the test-tube rack ---------------- */

  function parseRun(text) {
    var lines = String(text || "").replace(/\n$/, "").split("\n");
    var order = [], logs = {}, result = {}, cur = null;
    lines.forEach(function (l) {
      var m;
      if ((m = /^=== RUN\s+(\S+)$/.exec(l))) { cur = m[1]; order.push(cur); logs[cur] = []; return; }
      if ((m = /^\s*--- (PASS|FAIL|SKIP): (\S+) \(/.exec(l))) { result[m[2]] = m[1]; cur = null; return; }
      if (cur && /^\s{4}\S/.test(l)) logs[cur].push(l.replace(/^\s+/, ""));
    });
    return { order: order, logs: logs, result: result };
  }

  function tubeSVG(t, i, x, now) {
    var pass = t.real === "PASS", fail = t.real === "FAIL";
    var s = '<g class="tube' + (now ? " now" : "") + '" transform="translate(' + x + ' 0)">';
    if (now) s += '<path d="M44 6 l10 14 l10 -14 Z" fill="#111"/><text x="54" y="2" text-anchor="middle" class="rk-now" dy="-2">NOW</text>';
    // the glass: straight sides and a round bottom
    var glass = "M30 34 V170 a24 24 0 0 0 48 0 V34";
    // contents: full for PASS, low and bubbling for FAIL
    var top = fail ? 132 : 70;
    s += '<path d="M33 ' + top + ' V170 a21 21 0 0 0 42 0 V' + top + ' Z" fill="' + (fail ? "#FFE1E1" : pass ? "#C9F2D9" : "#F3F3F3") + '"/>';
    if (fail) s += '<g fill="none" stroke="#111" stroke-width="2"><circle cx="46" cy="150" r="4"/><circle cx="60" cy="162" r="5"/><circle cx="52" cy="176" r="3"/></g>';
    if (pass) s += '<path d="M33 70 H75" stroke="#111" stroke-width="2" stroke-dasharray="4 3"/>';
    s += '<path d="' + glass + '" fill="none" stroke="#111" stroke-width="' + (now ? 6 : 4) + '" stroke-linejoin="round"/>';
    s += '<rect x="24" y="26" width="60" height="10" rx="4" fill="#fff" stroke="#111" stroke-width="3"/>';
    if (fail) s += '<path d="M78 118 l-10 8 l7 6 l-10 10" fill="none" stroke="#111" stroke-width="3" stroke-linejoin="round"/>';
    // label on the glass: the tube number; the name goes underneath
    s += '<rect x="36" y="84" width="36" height="28" rx="3" fill="#fff" stroke="#111" stroke-width="2"/><text x="54" y="104" text-anchor="middle" class="rk-no">' + (i + 1) + "</text>";
    // the stamp
    var mark = pass ? "✓ PASS" : fail ? "✗ FAIL" : "? " + (t.real || "NOT RUN");
    s += '<rect x="10" y="206" width="88" height="30" rx="6" fill="' + (pass ? "#C9F2D9" : fail ? "#FFE1E1" : "#F3F3F3") + '" stroke="#111" stroke-width="3"' + (fail ? ' stroke-dasharray="7 4"' : "") + "/>";
    s += '<text x="54" y="228" text-anchor="middle" class="rk-stamp">' + esc(mark) + "</text>";
    s += '<text x="54" y="258" text-anchor="middle" class="rk-name">' + esc(t.short) + "</text>";
    return s + "</g>";
  }

  function mountRack(box) {
    var id = box.getAttribute("data-rack"), el = document.getElementById(id);
    if (!el) { L.report("rack:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program);
    if (!q) return;
    var st = stepOut(q, m.step), run = parseRun(st.out);
    var ok = true, problems = [];
    var subs = run.order.filter(function (n) { return n.indexOf(m.test + "/") === 0; });
    var tubes = m.tubes.map(function (t, i) {
      var real = m.test + "/" + t.name.replace(/ /g, "_");
      if (subs[i] !== real) { ok = false; problems.push("tube " + (i + 1) + " is " + (subs[i] || "missing") + " in the real run, not " + real); }
      var r = run.result[real];
      if (r !== t.want) { ok = false; problems.push(real + " is " + (r || "missing") + " in the real run, not " + t.want); }
      return { name: t.name, full: real, short: real.slice(m.test.length + 1), real: r, logs: run.logs[real] || [], note: t.note || "" };
    });
    if (subs.length !== tubes.length) { ok = false; problems.push("the real run has " + subs.length + " subtests, the model " + tubes.length); }
    var anyFail = tubes.some(function (t) { return t.real === "FAIL"; });
    var parent = run.result[m.test];
    if (parent !== (anyFail ? "FAIL" : "PASS")) { ok = false; problems.push("parent verdict " + parent); }
    problems.forEach(function (p) { L.report("rack:" + id, p); });

    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every tube matches the real go test -v run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var cmd = box.querySelector(".rk-cmd");
    if (cmd && st.cmd) cmd.innerHTML = '<span class="prompt">you@laptop:' + esc(st.dir || "~") + "$ </span>" + esc(st.cmd);

    var svg = box.querySelector(".rk-svg"), W = 108, n = tubes.length, width = Math.max(n * W + 20, 320);
    svg.setAttribute("viewBox", "0 -14 " + width + " 290");
    var stage = box.querySelector(".rk-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var logBox = box.querySelector(".rk-log");
    var total = n + 1;
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = tubes.map(function (t, i) {
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(t.full) + "</code></td><td>" + esc(t.real || "missing") + "</td><td>" + (t.logs.length ? t.logs.map(function (l) { return "<code>" + esc(l) + "</code>"; }).join("<br>") : "none") + "</td><td>" + t.note + "</td></tr>";
    }).join("") + "<tr><td>" + total + "</td><td><code>" + esc(m.test) + "</code></td><td>" + esc(parent || "missing") + "</td><td>none</td><td>The parent test fails if any tube fails.</td></tr>";

    function draw(k) {
      var s = '<rect x="4" y="190" width="' + (width - 8) + '" height="12" rx="4" fill="#E9DCC3" stroke="#111" stroke-width="3"/>';
      for (var i = 0; i < n; i++) s += tubeSVG(tubes[i], i, 10 + i * W, i === k);
      svg.innerHTML = s;
    }
    function render(s, announce) {
      var k = s.step;
      if (k < n) {
        var t = tubes[k];
        draw(k);
        logBox.innerHTML = '<p class="label">TUBE ' + (k + 1) + " · " + esc(t.full) + "</p><pre>" + (t.logs.length ? t.logs.map(esc).join("\n") : '<span class="empty">No log lines: nothing went wrong in this tube.</span>') + "</pre>";
        note.innerHTML = '<span class="count">Tube ' + (k + 1) + " of " + n + "</span><b>" + esc(t.real === "PASS" ? "✓ PASS." : t.real === "FAIL" ? "✗ FAIL." : "Not run.") + "</b> <code>t.Run(\"" + esc(t.name) + "\", …)</code> is printed as <samp>" + esc(t.full) + "</samp>. " + t.note;
      } else {
        draw(-1);
        var fails = tubes.filter(function (t) { return t.real === "FAIL"; }).length;
        logBox.innerHTML = '<p class="label">THE WHOLE RACK · ' + esc(m.test) + "</p><pre>--- " + esc(parent || "?") + ": " + esc(m.test) + "</pre>";
        note.innerHTML = '<span class="count">Rack</span><b>' + esc(parent === "FAIL" ? "✗ " + m.test + " FAILS." : "✓ " + m.test + " PASSES.") + "</b> " + (fails ? fails + " of " + n + " tubes failed, so the parent test fails too, and so does the whole <code>go test</code> run." : "Every tube passed, so the parent test passes.");
      }
      if (live && announce) live.textContent = note.textContent;
      if (announce && stage && stage.scrollWidth > stage.clientWidth && k < n) stage.scrollLeft = Math.max(0, 10 + k * W - stage.clientWidth / 2 + W / 2);
    }
    var rn = L.runner(box, total, render, { reserve: true });
    rn.reset(total);
  }

  /* ---------------- the coverage highlighter ---------------- */

  function mountCover(box) {
    var id = box.getAttribute("data-cover"), el = document.getElementById(id);
    if (!el) { L.report("cover:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program), f = L.program(m.file);
    if (!q || !f) return;
    var prof = String(stepOut(q, m.step).out || "").split("\n");
    var line = {}, stmts = 0, hit = 0, base = m.file.split("/").pop();
    prof.forEach(function (l) {
      var r = /^\S+\/([^/:]+):(\d+)\.\d+,(\d+)\.(\d+) (\d+) (\d+)$/.exec(l);
      if (!r || r[1] !== base) return;
      var a = +r[2], b = +r[4] <= 1 ? +r[3] - 1 : +r[3], ns = +r[5], cnt = +r[6];   // a block ending at column 1 stops before that line
      stmts += ns; if (cnt > 0) hit += ns;
      for (var k = a; k <= b; k++) line[k] = cnt > 0 ? (line[k] === "no" ? "no" : "yes") : "no";
    });
    var pct = stmts ? (Math.round(1000 * hit / stmts) / 10).toFixed(1) : "0.0";
    var said = /coverage: ([0-9.]+)% of statements/.exec(String(stepOut(q, m.percentStep || 0).out || ""));
    var ok = !!said && said[1] === pct;
    if (!ok) L.report("cover:" + id, "cover.out gives " + pct + "% but go test printed " + (said ? said[1] : "nothing"));
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Built from the real cover.out: " + pct + "% of statements, as go test printed" : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var src = f.src.replace(/\n$/, "").split("\n");
    var ol = box.querySelector(".cv-lines");
    ol.innerHTML = src.map(function (l, i) {
      var st = line[i + 1];
      var tag = st === "yes" ? '<span class="cv-tag">✓ ran</span>' : st === "no" ? '<span class="cv-tag">✗ never ran</span>' : '<span class="cv-tag"></span>';
      return '<li class="' + (st === "yes" ? "cv-yes" : st === "no" ? "cv-no" : "") + '"><span class="cv-code">' + (l ? L.highlight(l) : "&nbsp;") + "</span>" + tag + "</li>";
    }).join("");
    var tv = box.querySelector(".cv-text");
    if (tv) {
      var never = [], ran = [];
      src.forEach(function (l, i) { if (line[i + 1] === "no") never.push(i + 1); else if (line[i + 1] === "yes") ran.push(i + 1); });
      tv.innerHTML = "<p>Lines that ran during the tests: " + ran.join(", ") + ".</p><p>Lines that never ran: " + never.map(function (n) { return n + " (<code>" + esc(src[n - 1].trim()) + "</code>)"; }).join(", ") + ".</p>";
    }
  }

  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-rack]");
    for (var i = 0; i < r.length; i++) { try { mountRack(r[i]); } catch (e) { L.report("rack", e.message); } }
    var c = document.querySelectorAll("[data-cover]");
    for (var j = 0; j < c.length; j++) { try { mountCover(c[j]); } catch (e) { L.report("cover", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
