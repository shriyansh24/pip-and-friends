/* JavaScript book, chapter 9 additions ("Crates and Conveyor Belts"). Classic deferred script, loaded after
   comic-cast.js. Everything here is local to javascript/ch9.html.

   1. The loading dock ([data-yard="model-id"]): an array drawn as a crate of boxes with a FRONT end, with each
      box's index painted underneath. Step through a program whose line 1 is `const NAME = [...];` and whose
      every later line is `console.log(NAME.OP(ARGS), NAME);`. The yard reads the operations from the program's own
      source, really runs them on a real array in this browser, and draws what changed: new boxes, the box that
      left, and every box whose number had to be repainted. Parity: for every line, the browser's result, formatted
      the way Node prints it, must equal that line of the captured Node run.
   2. The conveyor belt ([data-belt="model-id"]): pick a station (map, filter, find, findIndex, some, every, reduce,
      forEach) and step through every callback call. The model names each station's callback text; the source line must
      be exactly `console.log(boxes.METHOD(CALLBACK[, INIT]));`. The belt wraps that callback and runs the REAL array
      method in this browser, so every step shown is a real call with its real arguments and return value. Parity: the
      final result, formatted as Node prints it, must equal the captured output line.
   3. [data-out="prog.js#N"]: text inside a hand-drawn picture filled from line N of a captured run (never typed).

   Keyboard: both steppers use the engine's runner (arrow keys, Space, R) and keep aria-disabled buttons and an aria-live
   line; belt stations are ordinary buttons with aria-pressed. Each has a text version in a <details> table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch9.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------- Node's console.log formatting, for the short values this chapter prints ---------- */
  function inspect(v, nested) {
    if (v === undefined) return "undefined";
    if (v === null) return "null";
    if (typeof v === "number") return Object.is(v, -0) ? "-0" : String(v);
    if (typeof v === "string") return nested ? "'" + v + "'" : v;
    if (typeof v === "boolean") return String(v);
    if (Array.isArray(v)) {
      if (!v.length) return "[]";
      var parts = [], holes = 0;
      for (var i = 0; i < v.length; i++) {
        if (!(i in v)) { holes++; continue; }
        if (holes) { parts.push("<" + holes + " empty item" + (holes > 1 ? "s" : "") + ">"); holes = 0; }
        parts.push(inspect(v[i], true));
      }
      if (holes) parts.push("<" + holes + " empty item" + (holes > 1 ? "s" : "") + ">");
      return "[ " + parts.join(", ") + " ]";
    }
    return String(v);
  }
  function linesOf(text) { return text.replace(/\n$/, "").split("\n"); }
  function lit(v) { return typeof v === "string" ? '"' + v + '"' : inspect(v, true); }

  /* ======================= 1. the loading dock ======================= */
  function carHTML(val, idx, cls, tag) {
    return '<li class="car' + (cls ? " " + cls : "") + '"><span class="car-body"><span class="car-val">' + esc(lit(val)) + "</span></span>" +
      '<span class="car-idx">' + esc(String(idx)) + "</span>" + (tag ? '<span class="car-tag">' + esc(tag) + "</span>" : "") + "</li>";
  }
  function mountYard(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-yard")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = linesOf(prog.src), out = linesOf(L.shown(prog)), problems = [];
    var head = /^const (\w+) = (\[.*\]);$/.exec(src[0]);
    if (!head) { L.report("yard", "line 1 of " + m.program + " is not const NAME = [...];"); return; }
    var name = head[1], arr = JSON.parse(head[2]);
    var states = [{ line: 1, code: src[0], cars: arr.slice(), op: null }];
    for (var k = 1; k < src.length; k++) {
      var mm = new RegExp("^console\\.log\\(" + name + "\\.(push|pop|shift|unshift)\\((.*)\\), " + name + "\\);$").exec(src[k]);
      if (!mm) { problems.push("line " + (k + 1) + " is not console.log(" + name + ".OP(...), " + name + ");"); continue; }
      var before = arr.slice(), args = JSON.parse("[" + mm[2] + "]"), ret = Array.prototype[mm[1]].apply(arr, args);
      var printed = inspect(ret) + " " + inspect(arr, false);
      if (printed !== out[k - 1]) problems.push("line " + (k + 1) + ": browser gives '" + printed + "', Node printed '" + out[k - 1] + "'");
      states.push({ line: k + 1, code: src[k], op: mm[1], args: args, ret: ret, before: before, cars: arr.slice(), printed: out[k - 1] });
    }
    if (out.length !== src.length - 1) problems.push("expected " + (src.length - 1) + " output lines, got " + out.length);
    var ok = !problems.length;
    problems.forEach(function (p) { L.report("yard", m.program + ": " + p); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every step matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var codeEl = box.querySelector(".yard-code"), trainEl = box.querySelector(".yard-train"), gone = box.querySelector(".yard-gone");
    var retEl = box.querySelector(".yard-ret"), renEl = box.querySelector(".yard-renum"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");

    function describe(s) {
      if (!s.op) return { gone: null, renum: 0, html: "The crate arrives at the dock: " + s.cars.length + " boxes, numbered 0 to " + (s.cars.length - 1) + ". Box 0 sits at the FRONT end." };
      var n = s.before.length, html = "", gone = null, renum = 0;
      if (s.op === "push") html = "<code>push</code> adds " + s.args.map(lit).join(" and ") + " at the <b>back</b>. Nobody else moves, so no numbers change. It hands back the new <b>length</b>: <samp>" + esc(inspect(s.ret)) + "</samp>, not the crate.";
      if (s.op === "pop") { gone = s.ret; html = "<code>pop</code> removes the <b>last</b> box and hands it back: <samp>" + esc(inspect(s.ret)) + "</samp>. Nobody else moves."; }
      if (s.op === "unshift") { renum = n; html = "<code>unshift</code> squeezes " + s.args.map(lit).join(" and ") + " in at the <b>front</b>. All " + n + " old boxes move back one place, so every number is repainted. It hands back the new length: <samp>" + esc(inspect(s.ret)) + "</samp>."; }
      if (s.op === "shift") { gone = s.ret; renum = s.cars.length; html = "<code>shift</code> takes the <b>front</b> box away and hands it back: <samp>" + esc(inspect(s.ret)) + "</samp>. The other " + s.cars.length + " move up one place, and every number is repainted."; }
      return { gone: gone, renum: renum, html: html };
    }
    function render(st, announce) {
      var s = states[st.step], d = describe(s), cars = "";
      codeEl.innerHTML = '<span class="ln">line ' + s.line + "</span>" + L.highlight(s.code);
      s.cars.forEach(function (v, i) {
        var cls = "", tag = "";
        if (s.op === "push" && i >= s.before.length) { cls = "is-new"; tag = "new"; }
        if (s.op === "unshift" && i < s.args.length) { cls = "is-new"; tag = "new"; }
        if (s.op === "unshift" && i >= s.args.length) { cls = "is-renum"; tag = "was " + (i - s.args.length); }
        if (s.op === "shift") { cls = "is-renum"; tag = "was " + (i + 1); }
        cars += carHTML(v, i, cls, tag);
      });
      trainEl.innerHTML = '<li class="engine" aria-hidden="true"><span class="eng-body">FRONT</span></li>' + cars + '<li class="caboose" aria-hidden="true">back</li>';
      trainEl.setAttribute("aria-label", "The crate now: " + (s.cars.length ? s.cars.map(function (v, i) { return "box " + i + " holds " + lit(v); }).join(", ") : "no boxes") + ".");
      gone.innerHTML = d.gone !== null ? '<span class="lbl">LEFT THE CRATE</span>' + '<span class="car gone"><span class="car-body"><span class="car-val">' + esc(lit(d.gone)) + "</span></span></span>" : "";
      gone.hidden = d.gone === null;
      retEl.innerHTML = s.op ? '<span class="lbl">HANDS BACK</span><code>' + esc(inspect(s.ret)) + "</code>" + (s.op === "push" || s.op === "unshift" ? "<small>the new length</small>" : "<small>the box</small>") : '<span class="lbl">HANDS BACK</span><small>(nothing yet)</small>';
      renEl.innerHTML = '<span class="lbl">NUMBERS REPAINTED</span><b>' + d.renum + "</b><small>" + (d.renum ? "slow end: everyone renumbers" : "quick: nobody moves") + "</small>";
      renEl.classList.toggle("busy", d.renum > 0);
      var shown = states.slice(1, st.step + 1).map(function (x) { return x.printed; });
      scr.innerHTML = shown.length ? shown.map(function (l, i) { return '<span class="' + (announce && i === shown.length - 1 ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + states.length + "</span>" + d.html;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + states.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " " + trainEl.getAttribute("aria-label");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = states.map(function (s, i) {
      var d = describe(s);
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s.code) + "</code></td><td>" + (s.op ? "<code>" + esc(inspect(s.ret)) + "</code>" : "") + "</td><td>" + d.renum + "</td><td><code>" + esc(inspect(s.cars, false)) + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, states.length, render, { reserve: true });
    r.reset(states.length);
  }

  /* ======================= 2. the conveyor belt ======================= */
  var KIND = { map: "paint", filter: "trap", find: "stop", findIndex: "stop", some: "stop", every: "stop", reduce: "crate", forEach: "bin" };
  function boxHTML(v, cls, tag, idx) {
    return '<li class="bx' + (cls ? " " + cls : "") + '"><span class="bx-val">' + esc(inspect(v, true)) + "</span>" +
      (idx != null ? '<span class="bx-idx">' + idx + "</span>" : "") + (tag ? '<span class="bx-tag">' + esc(tag) + "</span>" : "") + "</li>";
  }
  function mountBelt(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-belt")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = linesOf(prog.src), out = linesOf(L.shown(prog)), problems = [];
    var head = /^const (\w+) = (\[.*\]);$/.exec(src[0]);
    if (!head) { L.report("belt", "line 1 of " + m.program + " is not const NAME = [...];"); return; }
    var name = head[1], items = JSON.parse(head[2]);
    if (JSON.stringify(items) !== JSON.stringify(m.items)) problems.push("model items differ from line 1");
    var stations = m.stations.map(function (st) {
      var want = "console.log(" + name + "." + st.method + "(" + st.cb + (st.init != null ? ", " + st.init : "") + "));";
      if (src[st.line - 1] !== want) problems.push("line " + st.line + " is not " + want);
      var fn = (new Function("return (" + st.cb + ");"))(), calls = [];
      var wrapped = function () { var a = Array.prototype.slice.call(arguments, 0, st.method === "reduce" ? 3 : 2), r = fn.apply(null, arguments); calls.push({ args: a, ret: r }); return r; };
      var arr = items.slice(), res = st.init != null ? arr[st.method](wrapped, JSON.parse(st.init)) : arr[st.method](wrapped);
      var printed = inspect(res, false);
      if (printed !== out[st.line - 2]) problems.push(st.method + ": browser gives '" + printed + "', Node printed '" + out[st.line - 2] + "'");
      return { st: st, calls: calls, res: res, printed: printed };
    });
    var ok = !problems.length;
    problems.forEach(function (p) { L.report("belt", m.program + ": " + p); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every station matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var chips = box.querySelector(".belt-chips"), codeEl = box.querySelector(".belt-code"), inEl = box.querySelector(".belt-in");
    var stEl = box.querySelector(".belt-station"), outEl = box.querySelector(".belt-out"), resEl = box.querySelector(".belt-result");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), cur = 0, runner;
    chips.innerHTML = '<span class="label">STATION:</span>' + stations.map(function (s, i) { return '<button type="button" class="path-btn" aria-pressed="' + (i === 0) + '" data-i="' + i + '"><code>' + esc(s.st.method) + "</code></button>"; }).join("");

    function stepsOf(S) {
      // step 0: nothing processed; one step per real callback call; a last step for the result.
      return S.calls.length + 2;
    }
    function render(state, announce) {
      var S = stations[cur], st = S.st, kind = KIND[st.method], n = state.step, done = Math.max(0, Math.min(n, S.calls.length));
      var last = n === S.calls.length + 1, call = n >= 1 && n <= S.calls.length ? S.calls[n - 1] : null;
      codeEl.innerHTML = '<span class="ln">line ' + st.line + "</span>" + L.highlight(src[st.line - 1]);
      // which items the callback has seen, by index
      var seen = {}; S.calls.slice(0, done).forEach(function (c) { seen[st.method === "reduce" ? c.args[2] : c.args[1]] = c; });
      var nowIdx = call ? (st.method === "reduce" ? call.args[2] : call.args[1]) : -1;
      inEl.innerHTML = items.map(function (v, i) {
        var c = seen[i], cls = "", tag = "";
        if (i === nowIdx) { cls = "now"; tag = "now"; }
        else if (c) { cls = "done"; tag = "done"; }
        else if (last || (done === S.calls.length && n > 0)) { cls = "skipped"; tag = "never checked"; }
        return boxHTML(v, cls, tag, i);
      }).join("");
      // the station: the callback and the current call
      var cbLine = '<code class="cb">' + L.highlight(st.cb) + "</code>";
      if (call) {
        var argTxt = st.method === "reduce" ? call.args[0] + " , " + inspect(call.args[1], true) : inspect(call.args[0], true);
        stEl.innerHTML = '<span class="lbl">' + esc(st.method.toUpperCase()) + " STATION</span>" + cbLine +
          '<span class="call">called with <code>' + esc(argTxt) + "</code> → returns <code>" + esc(inspect(call.ret, true)) + "</code></span>";
      } else {
        stEl.innerHTML = '<span class="lbl">' + esc(st.method.toUpperCase()) + " STATION</span>" + cbLine + '<span class="call">' + (n === 0 ? "waiting for the first box" : "the belt has stopped") + "</span>";
      }
      // the out side
      var calls = S.calls.slice(0, done), html = "";
      if (kind === "paint") html = '<span class="lbl">OUT: REPAINTED BOXES</span><ol class="tray">' + calls.map(function (c) { return boxHTML(c.ret, "painted", "", null); }).join("") + "</ol>";
      if (kind === "trap") html = '<span class="lbl">KEPT</span><ol class="tray">' + calls.filter(function (c) { return c.ret; }).map(function (c) { return boxHTML(c.args[0], "kept", "", null); }).join("") + '</ol><span class="lbl">TRAPDOOR</span><ol class="tray trapdoor">' +
        calls.filter(function (c) { return !c.ret; }).map(function (c) { return boxHTML(c.args[0], "dropped", "✗ dropped", null); }).join("") + "</ol>";
      if (kind === "crate") html = '<span class="lbl">THE BUCKET (running total)</span><span class="crate-val"><code>' + esc(inspect(done ? calls[done - 1].ret : JSON.parse(st.init), true)) + "</code></span>";
      if (kind === "bin") html = '<span class="lbl">RETURN VALUES: THROWN AWAY</span><ol class="tray bin">' + calls.map(function (c) { return boxHTML(c.ret, "binned", "✗ ignored", null); }).join("") + "</ol>";
      if (kind === "stop") html = '<span class="lbl">STOP RULE</span><span class="rule">' + esc(m.rules[st.method]) + "</span>";
      outEl.innerHTML = html;
      resEl.innerHTML = last ? '<span class="lbl">THE CALL HANDS BACK</span><code>' + esc(S.printed) + '</code><small>Real run, line ' + st.line + ": <samp>" + esc(out[st.line - 2]) + "</samp></small>" : '<span class="lbl">THE CALL HANDS BACK</span><small>…still working</small>';
      var txt;
      if (n === 0) txt = "Station <code>" + esc(st.method) + "</code>. " + st.note;
      else if (call) txt = callNote(st, call, n, S);
      else txt = endNote(st, S);
      note.innerHTML = '<span class="count">Step ' + (n + 1) + " of " + stepsOf(S) + "</span>" + txt;
      if (live && announce) live.textContent = "Step " + (n + 1) + " of " + stepsOf(S) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    function callNote(st, c, n, S) {
      var v = esc(inspect(c.args[0], true)), r = esc(inspect(c.ret, true)), lastCall = n === S.calls.length;
      switch (st.method) {
        case "map": return "Box " + v + " goes through the paint booth and comes out as " + r + ". Same number of boxes out as in.";
        case "filter": return c.ret ? "The test gives " + r + " for " + v + ": the box rides on into the kept tray." : "The test gives " + r + " for " + v + ": the trapdoor opens and the box drops out.";
        case "find": case "findIndex": return c.ret ? "The test gives <b>true</b> for " + v + ". Stop! The belt halts right here" + (S.calls.length < items.length ? ", and the boxes behind it are never checked." : ".") : "The test gives false for " + v + ". On to the next box.";
        case "some": return c.ret ? "True for " + v + ": one is enough. Stop, the answer is <samp>true</samp>." : "False for " + v + ". Keep looking for just one.";
        case "every": return c.ret ? "True for " + v + ". So far, so good." + (lastCall && S.calls.length === items.length ? " That was the last box." : "") : "False for " + v + "! One failure is enough. Stop, the answer is <samp>false</samp>.";
        case "reduce": return "The bucket holds " + esc(String(c.args[0])) + ". Box " + esc(inspect(c.args[1], true)) + " goes in: the callback returns " + r + ", and that becomes the bucket's new value.";
        case "forEach": return "Box " + v + " goes through, and the callback returns " + r + "... which <code>forEach</code> throws straight in the bin.";
      }
      return "";
    }
    function endNote(st, S) {
      var p = "<samp>" + esc(S.printed) + "</samp>";
      switch (st.method) {
        case "map": return "Every box was repainted. <code>map</code> hands back a <b>new</b> array of the same length: " + p + ". The original <code>boxes</code> is untouched.";
        case "filter": return "Done. The kept boxes form a new, shorter array: " + p + ".";
        case "find": return "<code>find</code> hands back the <b>box itself</b>: " + p + ".";
        case "findIndex": return "<code>findIndex</code> hands back the box's <b>number</b> instead: " + p + ".";
        case "some": return "<code>some</code> answers yes or no: " + p + ".";
        case "every": return "<code>every</code> answers yes or no: " + p + ". It stopped at the first box that failed.";
        case "reduce": return "No boxes left. The bucket's final value is what <code>reduce</code> hands back: " + p + ".";
        case "forEach": return "<code>forEach</code> visited every box, then handed back " + p + ". It's for doing something with each box, not for making a new array.";
      }
      return "";
    }
    runner = L.runner(box, stepsOf(stations[0]), render, { reserve: true });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn"); if (!b) return;
      cur = Number(b.getAttribute("data-i"));
      [].forEach.call(chips.querySelectorAll(".path-btn"), function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      runner.reset(stepsOf(stations[cur]));
    });
    runner.reset(stepsOf(stations[0]));
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = stations.map(function (S) {
      return "<tr><td><code>" + esc(S.st.method) + "</code></td><td><code>" + esc(S.st.cb) + "</code></td><td>" + S.calls.map(function (c) {
        return S.st.method === "reduce" ? esc(c.args[0] + ", " + inspect(c.args[1], true)) + " → " + esc(inspect(c.ret, true)) : esc(inspect(c.args[0], true)) + " → " + esc(inspect(c.ret, true));
      }).join("; ") + "</td><td><code>" + esc(S.printed) + "</code></td></tr>";
    }).join("");
  }

  /* ======================= 3. values in pictures ======================= */
  function outs() {
    var els = document.querySelectorAll("[data-out]"), byPanel = new Map();
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]), ok = false;
      var lines = prog ? linesOf(L.shown(prog)) : [], n = Number(spec[1]);
      if (prog && n >= 1 && n <= lines.length) {
        var want = lines[n - 1], have = e.textContent.trim();
        if (have && have !== want.trim()) ok = false; else { e.textContent = want; ok = true; }
      }
      if (!ok) L.report("data-out", "'" + e.textContent + "' is not line " + spec[1] + " of " + spec[0]);
      var panel = e.closest("section") || document.body, st = byPanel.get(panel) || { n: 0, bad: 0 };
      st.n++; if (!ok) st.bad++; byPanel.set(panel, st);
    }
    byPanel.forEach(function (st, panel) {
      var b = panel.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.textContent = st.bad ? st.bad + " value(s) in the picture do not match the real run" : "Every value in the picture comes from a real run";
      b.classList.toggle("bad", !!st.bad);
    });
  }

  P.comic.ext(function () {
    [].forEach.call(document.querySelectorAll("[data-yard]"), function (b) { try { mountYard(b); } catch (e) { L.report("yard", e.message); } });
    [].forEach.call(document.querySelectorAll("[data-belt]"), function (b) { try { mountBelt(b); } catch (e) { L.report("belt", e.message); } });
    try { outs(); } catch (e) { L.report("data-out", e.message); }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
