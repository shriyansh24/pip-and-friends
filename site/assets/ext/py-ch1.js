/* Chapter 1 extension (Pip Reads a Recipe). Loads after comic-widgets.js.
   Adds two things the shared engine does not have (the engine's highlighter now handles # comments and
   backslash escapes, so this file no longer replaces it):
     1. [data-repl]  a real >>> session, rendered from the pseudo-terminal capture of repl_demo.py;
     2. [data-lens]  the detective lens: steps through a REAL captured traceback, highlighting the
        lines in reading order (last line, line number, code copy, caret). Every highlight target is
        looked up in the captured stderr; if one is missing the badge turns red and the problem is reported.
   Everything shown comes from POLYGLOT.data.captures. Keyboard: the lens uses the engine's stepper. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch1.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------- 1. the >>> prompt ---------- */
  function mountRepl(box) {
    var name = box.getAttribute("data-repl"), q = L.program(name), pre = box.querySelector("pre"), par = box.querySelector(".parity");
    var ok = !!(q && q.screen && q.screen.indexOf(">>> ") === 0 && q.exit === 0);
    if (!ok) L.report("repl:" + name, "no real >>> transcript captured");
    if (par) { par.textContent = ok ? "Real >>> session, captured" : "No real session captured"; par.classList.toggle("bad", !ok); }
    if (!q || !q.screen) return;
    var head = '<span class="prompt">you@laptop:~/python-ch1$ </span>python3 -q\n';
    pre.innerHTML = head + q.screen.replace(/\n$/, "").split("\n").map(function (l) {
      return l.indexOf(">>> ") === 0 ? '<span class="repl-ps">&gt;&gt;&gt; </span><b class="repl-in">' + esc(l.slice(4)) + "</b>" : '<span class="repl-out">' + esc(l) + "</span>";
    }).join("\n");
  }

  /* ---------- 2. the detective lens ---------- */
  var ORDER = [["last", "1", "LAST LINE"], ["file", "2", "LINE NUMBER"], ["code", "3", "THE LINE"], ["caret", "4", "CARET"], ["fix", "✓", "THE FIX"]];
  function partsOf(q, name) {
    var out = q.stdout.replace(/\n$/, ""), err = q.stderr.replace(/\n$/, "");
    var lines = [{ t: "you@laptop:~/python-ch1$ python3 " + name, k: "cmd" }];
    if (out) out.split("\n").forEach(function (t) { lines.push({ t: t, k: "out" }); });
    var errs = err ? err.split("\n") : [], fileAt = -1;
    errs.forEach(function (t, i) {
      var k = "err";
      if (/^Traceback \(most recent call last\):$/.test(t)) k = "tb";
      else if (/^\s*File ".*", line \d+/.test(t)) { k = "file"; fileAt = i; }
      else if (i === errs.length - 1) k = "last";
      else if (/^\s*[\^~]+\s*$/.test(t)) k = "caret";
      else if (fileAt >= 0 && i === fileAt + 1) k = "code";
      lines.push({ t: t, k: k, e: true });
    });
    return lines;
  }
  function mountLens(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-lens")).textContent);
    var bar = box.querySelector(".paths"), pre = box.querySelector(".lens-term"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), strip = box.querySelector(".lens-order"), tb = box.querySelector(".transcript tbody");
    bar.insertAdjacentHTML("beforeend", m.cases.map(function (c) { return '<button type="button" class="path-btn bug" aria-pressed="false" data-case="' + c.id + '">' + esc(c.label) + "</button>"; }).join(""));
    strip.innerHTML = ORDER.map(function (o) { return '<li data-o="' + o[0] + '"><b>' + o[1] + "</b> " + o[2] + "</li>"; }).join("");
    var cur, lines, run;
    function check(c) {
      var q = L.program(c.program); if (!q) return false;
      var ls = partsOf(q, c.program), ok = q.exit !== 0 && /^\w+Error\b/.test(q.stderr.replace(/\n$/, "").split("\n").pop());
      c.steps.forEach(function (s, i) {
        (s.hl ? [].concat(s.hl) : []).forEach(function (h) {
          if (!ls.some(function (l) { return l.k === h || (h === "err" && l.e); })) { ok = false; L.report("lens:" + c.program, "step " + (i + 1) + " highlights '" + h + "' but the real run has no such line"); }
        });
      });
      return ok;
    }
    function render(st, announce) {
      var s = cur.steps[st.step], hl = s.hl ? [].concat(s.hl) : [];
      var first = true;   // the first highlighted line carries data-now, so on phones the engine scrolls it into view
      pre.innerHTML = lines.map(function (l) {
        var on = hl.indexOf(l.k) >= 0 || (hl.indexOf("err") >= 0 && l.e), now = on && first; if (on) first = false;
        return '<span class="lens-ln' + (on ? " hit" : "") + (l.e ? " err" : "") + (l.k === "cmd" ? " cmd" : "") + '"' + (now ? " data-now" : "") + '><span class="lens-g" aria-hidden="true">' + (on ? "▶ " : "  ") + "</span>" + esc(l.t) + "</span>";
      }).join("\n");
      var lis = strip.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) { var here = lis[i].getAttribute("data-o") === s.clue; lis[i].classList.toggle("on", here); if (here) lis[i].setAttribute("aria-current", "step"); else lis[i].removeAttribute("aria-current"); }
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + (hl.length ? " Highlighted: " + lines.filter(function (l) { return hl.indexOf(l.k) >= 0 || (hl.indexOf("err") >= 0 && l.e); }).map(function (l) { return l.t.trim(); }).join(" / ") : "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-case") === cur.id ? "true" : "false");
    }
    function choose(id) {
      cur = m.cases.filter(function (c) { return c.id === id; })[0] || m.cases[0];
      var q = L.program(cur.program); if (!q) return;
      lines = partsOf(q, cur.program);
      var ok = check(cur);
      if (par) { par.textContent = ok ? "Real traceback from " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      if (tb) tb.innerHTML = cur.steps.map(function (s, i) {
        var hl = s.hl ? [].concat(s.hl) : [];
        var shown = lines.filter(function (l) { return hl.indexOf(l.k) >= 0 || (hl.indexOf("err") >= 0 && l.e); }).map(function (l) { return esc(l.t.trim()); }).join("<br>");
        return "<tr><td>" + (i + 1) + "</td><td><code>" + (shown || "(none)") + "</code></td><td>" + s.note + "</td></tr>";
      }).join("");
      if (!run) run = L.runner(box, cur.steps.length, render, { reserve: true });   // narration keeps its tallest height: the buttons never move
      run.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-case")); if (live) live.textContent = "Traceback chosen: " + b.textContent + "."; } });
    choose(m.cases[0].id);
  }

  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-repl]");
    for (var i = 0; i < r.length; i++) { try { mountRepl(r[i]); } catch (e) { L.report("repl", e.message); } }
    var b = document.querySelectorAll("[data-lens]");
    for (var j = 0; j < b.length; j++) { try { mountLens(b[j]); } catch (e) { L.report("lens", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
