/* Go book, chapter 2 additions (classic deferred script; loads after comic-cast.js and comic-critters.js).
   Tidy (gofmt) and Specs (go vet), Scoot in walkers and maps, "Real run" labels, prompt folders and lamp words all
   come from the engine now; this file only adds two widgets.
   1. [data-editor]: the error-address lens. A code editor drawn from the captured source, with a wavy underline
      at every file:line:column the real run reported, stepped through as street (file), house (line), door (column)
      and message. Every address and message is parsed from the captured stderr; a parity badge says so.
   2. [data-reduce]: the precedence reducer. An expression shrinks one operation at a time. Each step is
      re-evaluated with Go's integer rules (division truncates toward zero, % takes the dividend's sign) and the final
      value must equal the matching line of the real run's output. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch2.js loaded before comic.js"); return; }
  var esc = L.esc;

  /* ---------- 1. the error-address lens ---------- */
  var ADDR = /^(vet: )?(\.\/)?([\w.\/-]+\.go):(\d+):(\d+): (.*)$/;
  function parseErrors(stderr) {
    var out = [], header = null;
    stderr.replace(/\n$/, "").split("\n").forEach(function (line, i) {
      var m = ADDR.exec(line);
      if (m) out.push({ raw: line, idx: i, vet: m[1] || "", dot: m[2] || "", file: m[3], line: +m[4], col: +m[5], msg: m[6] });
      else if (/^# /.test(line) && header === null) header = { raw: line, idx: i };
    });
    return { errors: out, header: header, lines: stderr.replace(/\n$/, "").split("\n") };
  }
  function tokenEnd(text, c0) {   // c0: 0-based start; underline one "word" (a literal, a name, or one symbol)
    var ch = text.charAt(c0);
    if (ch === "%") return c0 + 2;
    if (ch === '"') { var j = text.indexOf('"', c0 + 1); return j < 0 ? text.length : j + 1; }
    if (/[\w.]/.test(ch)) { var k = c0; while (k < text.length && /[\w.]/.test(text.charAt(k))) k++; return k; }
    return Math.min(text.length, c0 + 1) || c0 + 1;
  }
  function wrapRange(html, a, b, open, close) {   // a, b: character offsets in the visible text
    var out = "", n = 0, i = 0, inside = false;
    while (i < html.length) {
      if (n === a && !inside && a < b) { out += open; inside = true; }
      if (n === b && inside) { out += close; inside = false; }
      var ch = html.charAt(i);
      if (ch === "<") { var j = html.indexOf(">", i) + 1; out += inside ? close + html.slice(i, j) + open : html.slice(i, j); i = j; continue; }
      if (ch === "&") { var k = html.indexOf(";", i) + 1; out += html.slice(i, k); i = k; n++; continue; }
      out += ch; i++; n++;
    }
    if (!inside && n === a && a < b) { out += open + "&nbsp;"; inside = true; }
    if (inside) out += close;
    return out;
  }
  function mountEditor(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-editor")).textContent);
    var prog = L.program(m.program);
    if (!prog) { L.report("editor", "no capture for " + m.program); return; }
    var src = prog.src.replace(/\n$/, "").split("\n"), info = parseErrors(prog.stderr), errs = info.errors;
    // parity: every address must exist in the source, and the run must really have failed
    var bad = 0;
    if (!errs.length || prog.exit === 0) { bad++; L.report("editor", m.program + ": the real run reported no file:line:column error"); }
    errs.forEach(function (e) { if (e.line < 1 || e.line > src.length || e.col < 1 || e.col > src[e.line - 1].length + 1) { bad++; L.report("editor", m.program + ": address " + e.line + ":" + e.col + " is outside the file"); } });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? "Does not match the real run" : "Every address and message is read from the real run"; par.classList.toggle("bad", !!bad); }
    var fname = (errs[0] && errs[0].file) || m.program;
    var isVet = !!(prog.steps && /^go vet/.test(prog.steps[prog.steps.length - 1].cmd));
    var ed = box.querySelector(".ed"), msgBox = box.querySelector(".ed-msg"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    ed.innerHTML = '<div class="ed-bar" aria-hidden="true"><span class="ed-dots"><i></i><i></i><i></i></span><span class="ed-tab"><span class="ed-tab-label">street</span>' + esc(fname) + '</span></div>' +
      '<ol class="ed-lines"></ol>';
    var ol = ed.querySelector(".ed-lines"), tab = ed.querySelector(".ed-tab");
    function lineHtml(i, focusErr, showDoors) {
      var text = src[i], here = errs.filter(function (e) { return e.line === i + 1; });
      var cuts = here.map(function (e) { var a = e.col - 1; return { a: a, b: Math.max(a + 1, tokenEnd(text, a)), e: e }; }).sort(function (x, y) { return x.a - y.a; });
      var html = L.highlight(text);
      // wrap each squiggle range by walking the highlighted HTML, counting only visible characters
      cuts.slice().reverse().forEach(function (c) { html = wrapRange(html, c.a, c.b, '<span class="sq' + (c.e === focusErr ? " now" : "") + '">', "</span>"); });
      var doors = "";
      if (showDoors && focusErr && focusErr.line === i + 1) {
        var n = Math.max(focusErr.col + 2, Math.min(text.length, focusErr.col + 6));
        doors = '<div class="ed-doors" aria-hidden="true">' + text.slice(0, n).split("").map(function (ch, k) {
          var c = k + 1, label = ch === "\t" ? "tab" : ch === " " ? "space" : ch;
          return '<span class="door' + (c === focusErr.col ? " hit" : "") + '"><b>' + esc(label) + "</b><small>" + c + "</small></span>";
        }).join("") + "</div>";
      }
      return '<li class="' + (here.length ? "has-err" : "") + '"><span class="ln">' + (here.length ? '<span class="x" aria-hidden="true">✗</span>' : "") + (i + 1) + '</span><span class="lc">' + (html || "&nbsp;") + "</span>" + doors + "</li>";
    }
    function msgHtml(focus, e) {
      return info.lines.map(function (line, i) {
        if (info.header && i === info.header.idx) return '<span class="part k0' + (focus === "header" ? " hot" : "") + '">' + esc(line) + "<small>header: which package</small></span>";
        var x = errs.filter(function (q) { return q.idx === i; })[0];
        if (!x) return '<span class="plain">' + esc(line) + "</span>";
        var on = x === e;
        function part(cls, t, lab, f) { return '<span class="part ' + cls + (on && focus === f ? " hot" : "") + '">' + esc(t) + (on ? "<small>" + lab + "</small>" : "") + "</span>"; }
        return '<span class="addr' + (on ? " on" : "") + '">' + (x.vet ? '<span class="plain">' + esc(x.vet) + "</span>" : "") +
          part("k1", x.dot + x.file, "file (street)", "file") + ":" + part("k2", String(x.line), "line (house)", "line") + ":" + part("k3", String(x.col), "column (door)", "col") + ": " +
          part("k4", x.msg, "what's wrong", "msg") + "</span>";
      }).join("\n");
    }
    function render(st, announce) {
      var s = m.steps[st.step], e = errs[s.err || 0], f = s.focus || "all";
      var lines = "";
      for (var i = 0; i < src.length; i++) lines += lineHtml(i, f === "all" ? null : e, f === "col");
      ol.innerHTML = lines;
      var lis = ol.querySelectorAll("li");
      if (e && (f === "line" || f === "col" || f === "msg") && lis[e.line - 1]) { lis[e.line - 1].classList.add("hot"); lis[e.line - 1].setAttribute("data-now", ""); }
      if (e && f === "msg" && lis[e.line - 1]) lis[e.line - 1].insertAdjacentHTML("beforeend", '<div class="ed-hover"><b>' + esc(e.vet || isVet ? "go vet says" : "the Compiler says") + "</b>" + esc(e.msg) + "</div>");
      tab.classList.toggle("hot", f === "file");
      msgBox.innerHTML = '<p class="label">THE REAL MESSAGE (' + esc(prog.steps ? prog.steps[prog.steps.length - 1].cmd : "go run " + m.program) + ")</p><pre>" + msgHtml(f, e) + "</pre>";
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      var e = errs[s.err || 0];
      return "<tr><td>" + (i + 1) + "</td><td>" + (e ? "<code>" + esc(e.file) + ":" + e.line + ":" + e.col + "</code>" : "") + "</td><td>" + s.note + "</td></tr>";
    }).join("") + '<tr><td colspan="3"><b>Source</b><pre class="code">' + esc(prog.src.replace(/\n$/, "")) + '</pre><b>Real message</b><pre class="term">' + esc(prog.stderr.replace(/\n$/, "")) + "</pre></td></tr>";
    // the editor grows a row of doors or a hover box on some steps: reserve the tallest so the buttons never move
    var r = L.runner(box, m.steps.length, render, { reserve: ".narration, .ed, .ed-msg" });
    r.reset(m.steps.length);
  }

  /* ---------- 2. the precedence reducer ---------- */
  function goEval(expr) {   // + - * / % and parentheses on integers, Go semantics; returns null if it cannot parse
    var t = expr.replace(/\s+/g, "").match(/\d+|[-+*/%()]/g) || [], p = 0;
    function atom() {
      var k = t[p];
      if (k === "-") { p++; return -atom(); }
      if (k === "(") { p++; var v = sum(); if (t[p] !== ")") throw new Error("missing )"); p++; return v; }
      if (/^\d+$/.test(k || "")) { p++; return parseInt(k, 10); }
      throw new Error("unexpected " + k);
    }
    function prod() {
      var v = atom();
      while (t[p] === "*" || t[p] === "/" || t[p] === "%") {
        var op = t[p++], w = atom();
        if ((op === "/" || op === "%") && w === 0) throw new Error("division by zero");
        v = op === "*" ? v * w : op === "/" ? Math.trunc(v / w) : v % w;
      }
      return v;
    }
    function sum() { var v = prod(); while (t[p] === "+" || t[p] === "-") { var op = t[p++], w = prod(); v = op === "+" ? v + w : v - w; } return v; }
    try { var v = sum(); return p === t.length ? v : null; } catch (e) { return null; }
  }
  function exprHtml(e, live) {
    return esc(e).replace(/\[([^\]]*)\]/, live ? '<span class="rd-hot"><span class="rd-tag" aria-hidden="true">next</span>$1</span>' : '<span class="rd-was">$1</span>');
  }
  function mountReducer(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-reduce")).textContent);
    var prog = L.program(m.program); if (!prog) { L.report("reduce", "no capture for " + m.program); return; }
    var outLines = L.shown(prog).replace(/\n$/, "").split("\n");
    var stage = box.querySelector(".rd-stage"), bar = box.querySelector(".paths"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), par = box.querySelector(".parity");
    m.items.forEach(function (it) {
      var real = outLines[it.line - 1], fin = it.steps[it.steps.length - 1].e;
      it._ok = String(goEval(fin.replace(/[\[\]]/g, ""))) === real;
      it.steps.forEach(function (s) { var v = goEval(s.e.replace(/[\[\]]/g, "")); if (String(v) !== real) it._ok = false; });
      if (!it._ok) L.report("reduce", it.label + ": a step does not equal line " + it.line + " of the real run (" + real + ")");
    });
    bar.insertAdjacentHTML("beforeend", m.items.map(function (it, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(it.label) + "</code></button>"; }).join(""));
    var cur = m.items[0];
    function render(st, announce) {
      var rows = "";
      for (var i = 0; i <= st.step; i++) {
        var s = cur.steps[i], last = i === cur.steps.length - 1;
        if (i) rows += '<li class="rd-arrow" aria-hidden="true">↓ ' + esc(cur.steps[i - 1].did || "") + "</li>";
        rows += '<li class="rd-row' + (i === st.step ? " now" : "") + (last ? " end" : "") + '"><code>' + exprHtml(s.e, i === st.step) + "</code>" +
          (last && i === st.step ? '<span class="rd-ok">' + (cur._ok ? "✓ the real run printed " : "✗ the real run printed ") + "<samp>" + esc(outLines[cur.line - 1]) + "</samp></span>" : "") + "</li>";
      }
      stage.innerHTML = '<ol class="rd-rows">' + rows + "</ol>";
      var s2 = cur.steps[st.step];
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.steps.length + "</span>" + s2.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ": " + s2.e.replace(/[\[\]]/g, "") + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(m.items[+bs[j].getAttribute("data-i")] === cur));
    }
    var rn = L.runner(box, cur.steps.length, render, { reserve: ".narration, .rd-stage" });
    var tb = box.querySelector(".transcript tbody");
    function choose(i) {
      cur = m.items[i];
      if (par) { par.textContent = cur._ok ? "Every step equals line " + cur.line + " of the real run" : "Does not match the real run"; par.classList.toggle("bad", !cur._ok); }
      if (tb) tb.innerHTML = cur.steps.map(function (s, k) { return "<tr><td>" + (k + 1) + "</td><td><code>" + esc(s.e.replace(/[\[\]]/g, "")) + "</code></td><td>" + s.note + "</td></tr>"; }).join("");
      rn.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(+b.getAttribute("data-i")); if (live) live.textContent = "Expression chosen: " + b.textContent + "."; } });
    choose(0);
  }

  P.comic.ext(function () {
    Array.prototype.forEach.call(document.querySelectorAll("[data-editor]"), function (b) { try { mountEditor(b); } catch (e) { L.report("editor", e.message); } });
    Array.prototype.forEach.call(document.querySelectorAll("[data-reduce]"), function (b) { try { mountReducer(b); } catch (e) { L.report("reduce", e.message); } });
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
