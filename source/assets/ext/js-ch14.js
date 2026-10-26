/* JavaScript book, chapter 14 additions ("Shops and Referees"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch14.html.

   Characters (registered with the engine's cast, drawn in the house style):
     (Juno, data-char="umpire", now comes from the engine's comic-critters.js; this file no longer redraws her.)
     data-char="shopfront" A shop on the street of modules. data-name = the file name on the sign;
                           data-window = comma-separated exports shown in the shop window; data-back = optional
                           comma-separated names kept in the back room (not exported), drawn dashed behind a wall;
                           data-tint = sky | mint | cream | pink (awning colour).

   [data-ref14]: the referee's board. Its attribute names a JSON model:
     { "runs": [ { "program": "first.test.js", "label": "first.test.js" }, ... ] }
   For the chosen run it reads the REAL stdout of the `node --test` capture (never typed text): every ✔/✖ line before
   the summary is one test (suite headers ▶ and their closing lines are skipped), the summary's "ℹ pass N" / "ℹ fail N"
   give the counts, and each failure block's own "actual:" and "expected:" lines give the two values the referee
   compares. Each test's rule (its first assert line) is taken from the test file's real source.
   Parity: the badge says the board matches the run only if the ✔ and ✖ it found equal the summary's counts, and every
   failed test has its block; otherwise L.report() makes the checker fail. Keyboard: every control is a real button.
   Text version: a table of every test in the run, rebuilt for each run. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch14.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";


  /* ---------------- a shop on the street of modules ---------------- */
  var TINT = { sky: "#DDE8FF", mint: "#C9F2D9", cream: "#FFF6CC", pink: "#FFE1E1" };
  function list(s) { return String(s || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean); }
  L.cast.shopfront = { vb: "0 0 262 230", draw: function (el) {
    var name = el.getAttribute("data-name") || "shop.js", win = list(el.getAttribute("data-window")), back = list(el.getAttribute("data-back"));
    var tint = TINT[el.getAttribute("data-tint")] || TINT.sky, out = "";
    /* back room behind the shop: names that are not exported */
    if (back.length) {
      out += '<rect x="158" y="78" width="100" height="' + (40 + back.length * 24) + '" rx="4" fill="#F4F1EA" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 4"/>' +
        '<text x="208" y="98" text-anchor="middle" font-family="Shantell Sans, cursive" font-weight="700" font-size="14" fill="' + INK + '">back room</text>';
      back.forEach(function (b, i) { out += '<text x="208" y="' + (122 + i * 24) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (b.length > 9 ? 12 : 13) + '" fill="' + INK + '">' + esc(b) + "</text>"; });
    }
    /* building */
    out += '<rect x="8" y="46" width="146" height="176" rx="4" fill="#FFFFFF"' + S(4) + "/>";
    /* awning */
    var aw = "";
    for (var i = 0; i < 6; i++) aw += '<path d="M' + (4 + i * 26) + " 46 h26 v16 q-13 10 -26 0 z" + '" fill="' + (i % 2 ? "#FFFFFF" : tint) + '"' + S(3) + "/>";
    out += aw;
    /* sign with the file name */
    var fs = name.length > 12 ? 13 : 16;
    out += '<rect x="20" y="10" width="122" height="32" rx="6" fill="#FFD60A"' + S(3.5) + '/><text x="81" y="' + (31 - (16 - fs) / 3) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(name) + "</text>";
    /* the shop window: exported names */
    var wh = Math.max(64, 26 + win.length * 22);
    out += '<rect x="20" y="78" width="122" height="' + wh + '" rx="3" fill="' + tint + '"' + S(3.5) + "/>" +
      '<text x="81" y="94" text-anchor="middle" font-family="Shantell Sans, cursive" font-weight="700" font-size="14" fill="' + INK + '">window</text>';
    win.forEach(function (w, k) { out += '<text x="81" y="' + (114 + k * 22) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (w.length > 11 ? 13 : 15) + '" fill="' + INK + '">' + esc(w) + "</text>"; });
    /* door */
    var dy = 78 + wh + 8;
    out += '<rect x="62" y="' + dy + '" width="38" height="' + (222 - dy) + '" rx="3" fill="#E8C66A"' + S(3) + '/><circle cx="92" cy="' + (dy + (222 - dy) / 2) + '" r="3" fill="' + INK + '"/>';
    return back.length ? out : '<g transform="translate(50 0)">' + out + "</g>";
  } };

  /* ---------------- the referee's board ---------------- */
  function parseRun(prog) {
    var lines = prog.stdout.replace(/\n$/, "").split("\n"), tests = [], suites = {}, counts = {}, i;
    var sumAt = lines.length;
    for (i = 0; i < lines.length; i++) if (/^ℹ tests \d+/.test(lines[i])) { sumAt = i; break; }
    for (i = 0; i < sumAt; i++) {
      var t = lines[i], m;
      if ((m = /^(\s*)▶ (.+)$/.exec(t))) { suites[m[1].length + "|" + m[2]] = 1; continue; }
      if ((m = /^(\s*)(✔|✖) (.+) \(…ms\)$/.exec(t))) {
        if (suites[m[1].length + "|" + m[3]]) continue;          // a suite's closing line, not a test
        tests.push({ name: m[3], ok: m[2] === "✔", depth: m[1].length });
      }
    }
    for (i = sumAt; i < lines.length; i++) { var c = /^ℹ (pass|fail) (\d+)$/.exec(lines[i]); if (c) counts[c[1]] = Number(c[2]); }
    /* failure blocks: "✖ name (…ms)" after "✖ failing tests:", then the message and the actual/expected lines */
    var fs = lines.indexOf("✖ failing tests:");
    if (fs >= 0) {
      var cur = null;
      for (i = fs + 1; i < lines.length; i++) {
        var l = lines[i], mm;
        if ((mm = /^✖ (.+) \(…ms\)$/.exec(l))) { cur = tests.filter(function (x) { return !x.ok && x.name === mm[1] && !x.block; })[0] || null; if (cur) cur.block = { msg: "" }; continue; }
        if (!cur) continue;
        if (!cur.block.msg && /^\s+[A-Za-z]*Error\b.*:/.test(l)) cur.block.msg = l.trim();
        if ((mm = /^\s+actual: (.*),$/.exec(l))) cur.block.actual = mm[1];
        if ((mm = /^\s+expected: (.*),$/.exec(l))) cur.block.expected = mm[1];
      }
    }
    return { tests: tests, counts: counts };
  }
  /* The rule card: the first assert line after the test's own name in the real source. */
  function ruleOf(src, name) {
    var lines = src.split("\n"), q = JSON.stringify(name);
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf(q) >= 0 && /\b(test|it)\(/.test(lines[i])) {
        for (var k = i + 1; k < lines.length && k < i + 8; k++) if (/assert\./.test(lines[k])) return { line: k + 1, text: lines[k].trim() };
      }
    }
    return null;
  }

  function mountRef(box) {
    var model = JSON.parse(document.getElementById(box.getAttribute("data-ref14")).textContent);
    var runs = model.runs.map(function (r) {
      var prog = L.program(r.program);
      if (!prog) { L.report("ref14", "no capture for " + r.program); return null; }
      var res = parseRun(prog), bad = [];
      var pass = res.tests.filter(function (t) { return t.ok; }).length, fail = res.tests.length - pass;
      if (pass !== res.counts.pass) bad.push("found " + pass + " passes, summary says " + res.counts.pass);
      if (fail !== res.counts.fail) bad.push("found " + fail + " failures, summary says " + res.counts.fail);
      res.tests.forEach(function (t) {
        t.rule = ruleOf(prog.src, t.name);
        if (!t.rule) bad.push("no assert line found for " + t.name);
        if (!t.ok && !(t.block && t.block.actual != null && t.block.expected != null)) {
          /* a failure with no actual/expected pair (an error thrown inside the test) must at least have its message */
          if (!(t.block && t.block.msg)) bad.push("no failure block for " + t.name);
        }
      });
      if (bad.length) L.report("ref14:" + r.program, bad.join("; "));
      return { label: r.label || r.program, program: r.program, res: res, ok: !bad.length, exit: prog.exit };
    }).filter(Boolean);
    if (!runs.length) return;

    box.insertAdjacentHTML("beforeend",
      '<div class="paths ref14-runs" role="group" aria-label="Choose a test run"><span class="label">TEST FILE:</span>' +
      runs.map(function (r, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-run="' + i + '"><code>' + esc(r.label) + "</code></button>"; }).join("") + "</div>" +
      '<div class="ref14-stage"><div class="ref14-ump"></div><div class="ref14-side"><p class="ref14-score"></p><div class="ref14-tests" role="group" aria-label="Tests in this run"></div></div></div>' +
      '<div class="ref14-call"></div><span class="parity"></span><p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every test in this run</summary><table class="transcript"><thead><tr><th>Test</th><th>Card</th><th>Rule (assert line)</th><th>Expected</th><th>Actual</th></tr></thead><tbody></tbody></table></details>');
    var ump = box.querySelector(".ref14-ump"), list = box.querySelector(".ref14-tests"), score = box.querySelector(".ref14-score"),
      call = box.querySelector(".ref14-call"), par = box.querySelector(".parity"), live = box.querySelector("[aria-live]"), tb = box.querySelector(".transcript tbody");
    var cur = 0;

    function card(t) { return t.ok ? "green" : "red"; }
    function vals(t) {
      if (t.ok) return { exp: "(same as actual)", act: "(same as expected)" };
      if (t.block && t.block.actual != null) return { exp: t.block.expected, act: t.block.actual };
      return { exp: "(no value: the test crashed first)", act: t.block ? t.block.msg : "" };
    }
    function showTest(j, announce) {
      var r = runs[cur], t = r.res.tests[j];
      var bs = list.querySelectorAll("button"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === j));
      ump.innerHTML = '<svg class="char" data-char="umpire" data-card="' + card(t) + '" data-mood="' + (t.ok ? "happy" : "surprised") + '"></svg>';
      L.drawCast(ump);
      var v = vals(t);
      call.className = "ref14-call " + (t.ok ? "ok" : "bad");
      call.innerHTML = '<p class="ref14-verdict">' + (t.ok ? "&#x2714; GREEN CARD: PASS" : "&#x2716; RED CARD: FAIL") + "</p>" +
        '<p class="ref14-name">Test: <b>' + esc(t.name) + "</b></p>" +
        (t.rule ? '<p class="ref14-rule">Rulebook card, line ' + t.rule.line + ': <code>' + L.highlight(t.rule.text) + "</code></p>" : "") +
        '<div class="ref14-pair"><div><p class="label">EXPECTED</p><code>' + esc(v.exp) + '</code></div><div><p class="label">ACTUAL</p><code>' + esc(v.act) + "</code></div></div>" +
        (!t.ok && t.block && t.block.msg ? '<p class="ref14-msg">Real message: <code>' + esc(t.block.msg) + "</code></p>" : "");
      if (live && announce) live.textContent = t.name + ": " + (t.ok ? "green card, pass." : "red card, fail. Expected " + v.exp + ", actual " + v.act + ".");
    }
    function showRun(i, announce) {
      cur = i;
      var r = runs[i], bs = box.querySelectorAll(".ref14-runs .path-btn");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      var pass = r.res.counts.pass, fail = r.res.counts.fail;
      score.innerHTML = "<b>" + pass + "</b> pass &middot; <b>" + fail + "</b> fail &middot; exit code " + r.exit;
      list.innerHTML = r.res.tests.map(function (t, j) {
        return '<button type="button" class="ref14-test ' + (t.ok ? "ok" : "bad") + '" aria-pressed="false" data-t="' + j + '"><span class="mk" aria-hidden="true">' + (t.ok ? "&#x2714;" : "&#x2716;") + "</span> " + esc(t.name) + '<span class="sr-only">' + (t.ok ? " (pass)" : " (fail)") + "</span></button>";
      }).join("");
      par.textContent = r.ok ? "Matches the real run of " + r.program + " (" + pass + " pass, " + fail + " fail)" : "Does not match the real run of " + r.program;
      par.classList.toggle("bad", !r.ok);
      tb.innerHTML = r.res.tests.map(function (t) { var v = vals(t); return "<tr><td>" + esc(t.name) + "</td><td>" + (t.ok ? "green: pass" : "red: fail") + "</td><td><code>" + (t.rule ? esc(t.rule.text) : "") + "</code></td><td><code>" + esc(v.exp) + "</code></td><td><code>" + esc(v.act) + "</code></td></tr>"; }).join("");
      var firstBad = 0; r.res.tests.some(function (t, j) { if (!t.ok) { firstBad = j; return true; } return false; });
      showTest(firstBad, false);
      if (live && announce) live.textContent = r.label + ": " + pass + " pass, " + fail + " fail.";
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".ref14-runs .path-btn"); if (b) { showRun(Number(b.getAttribute("data-run")), true); return; }
      var t = e.target.closest(".ref14-test"); if (t) showTest(Number(t.getAttribute("data-t")), true);
    });
    showRun(0, false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-ref14]");
    for (var i = 0; i < boxes.length; i++) { try { mountRef(boxes[i]); } catch (e) { L.report("ref14", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
