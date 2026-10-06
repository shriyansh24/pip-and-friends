/* C++ book, chapter 4 extension: "Mail Sorters and Jugs".
   Everything here reads the captured runs in data/cpp-ch4.js; nothing claims output that was typed by hand.
     - Cindy the mail sorter (cast member "sorter"): std::cin as a sorting cabinet with pigeonholes, a name plate
       reading "cin", and an arm that takes one item (a word or a number) at a time. data-mood = happy | surprised | focus | worried | normal;
       data-jam="true" draws her jammed (sparks, a crumpled letter): the fail state.
     - [data-sorter="MODEL_ID"] the mail-sorter stepper. The input tray holds the program's real .stdin, split into
       items (words and numbers), spaces and newline envelopes. Each step applies one read operation, which this file
       SIMULATES on that stdin with the stream rules (>> skips whitespace then takes what fits the type; getline takes
       up to the newline and throws the newline away; std::ws sweeps whitespace; a failed read writes 0 and jams the
       sorter; later reads do nothing until clear()). Text is "typed" one line at a time, only when a read needs more,
       exactly as the capture's pseudo-terminal typed it. Checks: every "val" the model claims equals the simulated
       value, every step's screen is a prefix of the real terminal transcript and the last equals it.
       Model: { "program": "x.cpp", "vars": [{"n": "age", "v": "0"}],
                "steps": [{ "line": 7, "op": null | {"op": "int|double|word|line|ws|clear|ignore", "var": "age", "val": "30"},
                            "note": "html", "output": ["screen line", ...] }] }
       "line" is the NEXT line to run (null at the end), as in the engine's tracer. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch4.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------------- Cindy the mail sorter ---------------- */
  function envelope(x, y, w, h, fill) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="1.5" fill="' + (fill || "#FFFFFF") + '"' + S(2.2) + '/>' +
      '<path d="M' + x + " " + y + " L" + (x + w / 2) + " " + (y + h * 0.6) + " L" + (x + w) + " " + y + '" fill="none"' + S(2) + "/>";
  }
  function sorterFace(mood, mouth) {
    var e;
    switch (mood) {
      case "happy": e = '<path d="M60 47 q6 -8 12 0 M88 47 q6 -8 12 0" fill="none"' + S(4) + "/>"; break;
      case "surprised": e = '<circle cx="66" cy="45" r="7" fill="#fff"' + S(3) + '/><circle cx="94" cy="45" r="7" fill="#fff"' + S(3) + '/><circle cx="66" cy="46" r="3" fill="' + INK + '"/><circle cx="94" cy="46" r="3" fill="' + INK + '"/>'; break;
      case "focus": e = '<path d="M59 46 h13 M88 46 h13" fill="none"' + S(5) + "/>"; break;
      case "worried": e = '<circle cx="66" cy="47" r="4.5" fill="' + INK + '"/><circle cx="94" cy="47" r="4.5" fill="' + INK + '"/><path d="M58 37 l12 -3 M102 37 l-12 -3" fill="none"' + S(3.5) + "/>"; break;
      default: e = '<circle cx="66" cy="46" r="5" fill="' + INK + '"/><circle cx="94" cy="46" r="5" fill="' + INK + '"/>';
    }
    var m = mouth || (mood === "worried" ? "frown" : mood === "surprised" ? "o" : "smile");
    var mm = m === "o" ? '<circle cx="80" cy="60" r="4.5" fill="' + INK + '"/>'
      : m === "frown" ? '<path d="M70 63 q10 -8 20 0" fill="none"' + S(4) + "/>"
      : m === "flat" ? '<path d="M71 60 h18" fill="none"' + S(4) + "/>"
      : m === "shout" ? '<path d="M69 56 h22 q-1 12 -11 12 q-10 0 -11 -12 z" fill="' + INK + '"/>'
      : '<path d="M69 57 q11 9 22 0" fill="none"' + S(4) + "/>";
    return '<g class="eyes">' + e + "</g>" + mm;
  }
  L.cast.sorter = { vb: "0 0 170 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", jam = el.getAttribute("data-jam") === "true";
    var holes = "", xs = [40, 70, 100], ys = [90, 116], k = 0;
    for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) {
      holes += '<rect x="' + xs[c] + '" y="' + ys[r] + '" width="26" height="22" rx="2" fill="#FFF6CC"' + S(3) + "/>";
      if ((k++ % 2) === 0) holes += envelope(xs[c] + 4, ys[r] + 6, 18, 12);
    }
    var jamArt = jam ? '<path d="M126 30 l8 -6 l-2 9 l9 -4 l-5 8" fill="none"' + S(3) + '/><path d="M30 30 l-8 -6 l2 9 l-9 -4 l5 8" fill="none"' + S(3) + "/>" +
      '<path d="M74 118 l10 -8 l8 6 l6 -4 l-2 14 l-14 2 z" fill="#FFFFFF"' + S(2.5) + "/>" : "";
    return '<g class="bob">' +
      /* wheels */
      '<circle cx="56" cy="186" r="10" fill="' + INK + '"/><circle cx="114" cy="186" r="10" fill="' + INK + '"/>' +
      '<circle cx="56" cy="186" r="3.5" fill="#FFFFFF"/><circle cx="114" cy="186" r="3.5" fill="#FFFFFF"/>' +
      /* cabinet body with pigeonholes */
      '<rect x="30" y="78" width="110" height="100" rx="10" fill="#9AD9C9"' + S(4) + "/>" + holes +
      '<rect x="50" y="144" width="70" height="28" rx="4" fill="#FFFFFF"' + S(3) + "/>" +
      /* name plate: 23 units, so 12px or more at the default size; lbl-deco lets L.fitLabels() hide it on tiny drawings */
      '<text class="lbl-deco" x="85" y="166" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="23" fill="' + INK + '">cin</text>' +
      /* intake tray on the left, with letters waiting */
      '<path d="M2 140 L30 132 L30 160 L8 166 Z" fill="#E7C08A"' + S(3.5) + "/>" + envelope(9, 140, 16, 11) +
      /* arm reaching out on the right, holding a letter */
      '<path d="M140 104 Q156 96 156 78" fill="none"' + S(7) + '/><path d="M140 104 Q156 96 156 78" fill="none" stroke="#9AD9C9" stroke-width="2.5" stroke-linecap="round"/>' +
      envelope(146, 62, 20, 14) +
      /* head */
      '<path d="M85 22 V10" fill="none"' + S(3.5) + "/>" + envelope(85, 2, 16, 11, "#FFD60A") +
      '<rect x="46" y="22" width="78" height="54" rx="14" fill="#FFB86B"' + S(4) + "/>" +
      '<rect x="54" y="30" width="62" height="40" rx="10" fill="#FFFFFF"' + S(3) + "/>" +
      sorterFace(mood, el.getAttribute("data-mouth")) + jamArt + "</g>";
  } };

  /* ---------------- the mail sorter: a simulated input stream ---------------- */
  function isWs(ch) { return ch === " " || ch === "\n" || ch === "\t"; }
  function Stream(text) { this.t = text; this.pos = 0; this.typed = 0; this.fail = false; }
  /* type the next line of the keyboard input (what the pseudo-terminal did when the program waited) */
  Stream.prototype.typeLine = function () {
    if (this.typed >= this.t.length) return false;
    var nl = this.t.indexOf("\n", this.typed);
    this.typed = nl < 0 ? this.t.length : nl + 1;
    return true;
  };
  Stream.prototype.need = function () { return this.pos < this.typed || this.typeLine(); };
  Stream.prototype.skipWs = function () {
    while (this.need() && isWs(this.t[this.pos])) this.pos++;
  };
  Stream.prototype.apply = function (op) {
    var t = this.t, start, res = { took: "", wrote: false, val: null };
    if (op.op === "clear") { this.fail = false; return res; }
    if (this.fail) { res.skipped = true; return res; }
    if (op.op === "ws") { start = this.pos; this.skipWs(); res.took = t.slice(start, this.pos); return res; }
    if (op.op === "ignore") {
      if (!this.need()) return res;
      start = this.pos;
      while (this.need() && t[this.pos] !== "\n") this.pos++;
      if (this.pos < this.typed) this.pos++;
      res.took = t.slice(start, this.pos); return res;
    }
    if (op.op === "line") {
      if (!this.need()) { this.fail = true; return res; }
      start = this.pos;
      while (this.pos < this.typed && t[this.pos] !== "\n") this.pos++;
      res.val = t.slice(start, this.pos);
      if (this.pos < this.typed) this.pos++;
      res.took = t.slice(start, this.pos); res.wrote = true; return res;
    }
    this.skipWs();
    start = this.pos;
    var re = op.op === "int" ? /^[+-]?\d+/ : op.op === "double" ? /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/ : /^[^\s]+/;
    var m = re.exec(t.slice(this.pos, this.typed));
    if (!m) { this.fail = true; res.wrote = op.op !== "word"; res.val = op.op === "word" ? null : "0"; return res; }
    this.pos += m[0].length;
    res.took = m[0]; res.wrote = true;
    res.val = op.op === "int" ? String(parseInt(m[0], 10)) : op.op === "double" ? String(parseFloat(m[0])) : m[0];
    return res;
  };

  function show(ch) { return ch === "\n" ? "↵" : ch === " " ? "·" : ch === "\t" ? "⇥" : ch; }
  function trayText(s, from, to) { var o = ""; for (var i = from; i < to; i++) o += show(s[i]); return o || "(empty)"; }
  /* split the input into tiles: runs of non-space characters, single spaces, single newlines; then cut the tiles at the
     given boundaries so a letter that is only partly taken (7 of 7.25) shows as two pieces */
  function tiles(text, cuts) {
    var out = [], i = 0;
    while (i < text.length) {
      var j = i + 1;
      if (!isWs(text[i])) while (j < text.length && !isWs(text[j]) && cuts.indexOf(j) < 0) j++;
      out.push({ a: i, b: j, s: text.slice(i, j) });
      i = j;
    }
    return out;
  }
  function mountSorter(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-sorter")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    if (prog.stdin == null) { L.report("sorter", m.program + " has no captured keyboard input"); return; }
    var input = prog.stdin, screen = L.shown(prog), lines = prog.src.replace(/\n$/, "").split("\n");
    /* simulate every step once, up front */
    var st = new Stream(input), vars = {}, order = [], states = [], problems = [];
    (m.vars || []).forEach(function (v) { vars[v.n] = v.v; order.push(v.n); });
    m.steps.forEach(function (s, i) {
      var prev = st.pos, res = null;
      if (s.op) {
        res = st.apply(s.op);
        if (res.wrote && s.op.var) vars[s.op.var] = s.op.op === "line" || s.op.op === "word" ? '"' + res.val + '"' : res.val;
        if (s.op.val != null && (!res.wrote || String(res.val) !== String(s.op.val))) problems.push("step " + (i + 1) + ": model says " + s.op.var + " gets " + s.op.val + ", the stream rules give " + (res.wrote ? res.val : "no change"));
      }
      var out = s.output.join("\n");
      if (screen.indexOf(out) !== 0) problems.push("step " + (i + 1) + ": screen is not a prefix of the real run");
      states.push({ prev: prev, pos: st.pos, typed: st.typed, fail: st.fail, res: res, vars: JSON.parse(JSON.stringify(vars)) });
    });
    var last = m.steps[m.steps.length - 1];
    if ((last.output.length ? last.output.join("\n") + "\n" : "") !== screen) problems.push("the last screen does not equal the real run");
    problems.forEach(function (p) { L.report("sorter:" + m.program, p); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = problems.length ? "Does not match the real run" : "Tray rules and screen match the real run"; par.classList.toggle("bad", !!problems.length); }

    var ol = box.querySelector(".tr-code"), tray = box.querySelector(".srt-tray"), holes = box.querySelector(".srt-holes");
    var arm = box.querySelector(".srt-arm"), lamp = box.querySelector(".srt-lamp"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), who = box.querySelector(".srt-who");
    ol.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = ol.querySelectorAll("li");
    function opWords(op) {
      return op.op === "int" ? "&gt;&gt; into an int" : op.op === "double" ? "&gt;&gt; into a double" : op.op === "word" ? "&gt;&gt; into a string"
        : op.op === "line" ? "getline" : op.op === "ws" ? "std::ws" : op.op === "clear" ? "clear()" : "ignore()";
    }
    function render(rs, announce) {
      var s = m.steps[rs.step], x = states[rs.step];
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      /* the tray */
      var tl = tiles(input, [x.prev, x.pos, x.typed]);
      var emptyMark = '<span class="srt-tile empty">tray empty</span>', marked = false;
      tray.innerHTML = tl.map(function (t) {
        var pre = "";
        if (!marked && x.pos >= x.typed && t.a >= x.typed) { pre = emptyMark; marked = true; }
        var cls = t.b <= x.prev ? "used" : t.b <= x.pos ? "taken" : t.a >= x.typed ? "later" : "wait";
        var kind = t.s === "\n" ? " nl" : t.s === " " || t.s === "\t" ? " sp" : "";
        var label = cls === "used" ? "already read: " : cls === "taken" ? "just taken: " : cls === "later" ? "not typed yet: " : "waiting: ";
        var txt = t.s === "\n" ? "newline" : t.s === " " ? "space" : t.s;
        return pre + '<span class="srt-tile ' + cls + kind + '"><span class="sr-only">' + label + "</span>" + esc(show(t.s)) + (kind ? '<span class="sr-only"> (' + txt + ")</span>" : "") + "</span>";
      }).join("") + (x.pos >= x.typed && !marked ? emptyMark : "");
      /* what the arm took */
      if (!s.op) arm.innerHTML = "Nothing read yet.";
      else if (x.res.skipped) arm.innerHTML = "<code>" + opWords(s.op) + "</code> did <b>nothing</b>: the sorter is jammed.";
      else if (s.op.op === "clear") arm.innerHTML = "<code>clear()</code> un-jams the sorter. The tray is unchanged.";
      else if (s.op.op === "ws" || s.op.op === "ignore") arm.innerHTML = "<code>" + opWords(s.op) + "</code> swept away <code>" + esc(trayText(input, x.prev, x.pos)) + "</code>.";
      else if (!x.res.wrote && s.op.op === "word") arm.innerHTML = "<code>" + opWords(s.op) + "</code> found nothing.";
      else if (x.fail && x.res.val === "0" && !x.res.took) arm.innerHTML = "<code>" + opWords(s.op) + "</code> found <code>" + esc(show(input[x.pos] || "")) + "</code>, which can't start a number. <b>JAM!</b> " + esc(s.op.var) + " gets 0.";
      else if (s.op.op === "line") arm.innerHTML = "<code>getline</code> took <code>" + esc(x.res.val ? trayText(x.res.val, 0, x.res.val.length) : "(nothing)") + "</code>" + (x.res.took.slice(-1) === "\n" ? " and threw away the <code>↵</code>" : "") + " → <b>" + esc(s.op.var) + "</b> = <code>" + esc(x.vars[s.op.var]) + "</code>.";
      else arm.innerHTML = "<code>" + opWords(s.op) + "</code> took <code>" + esc(trayText(input, x.prev, x.pos)) + "</code>" + (s.op.var ? " → <b>" + esc(s.op.var) + "</b> = <code>" + esc(x.vars[s.op.var]) + "</code>" : "") + ".";
      /* pigeonholes */
      holes.innerHTML = order.map(function (n) {
        var hot = s.op && s.op.var === n && x.res && x.res.wrote;
        return '<span class="srt-hole' + (hot ? " hot" : "") + '"><b>' + esc(n) + "</b><code>" + esc(x.vars[n]) + "</code>" + (hot ? '<small>just filled</small>' : "") + "</span>";
      }).join("");
      lamp.className = "srt-lamp" + (x.fail ? " jam" : "");
      lamp.innerHTML = x.fail ? "✗ JAMMED: fail state. Every read does nothing until <code>clear()</code>." : "✓ Ready: reads work.";
      if (who) { who.setAttribute("data-mood", x.fail ? "worried" : s.op ? "focus" : "happy"); who.setAttribute("data-jam", x.fail ? "true" : "false"); L.drawCast(who.parentNode); }
      var o = s.output;
      out.innerHTML = o.length ? o.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (rs.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Tray waiting: " + trayText(input, x.pos, x.typed) + ".";
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      var x = states[i];
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "next: line " + s.line : "finished") + "</td><td>" + s.note + "</td><td><code>" + esc(trayText(input, x.pos, x.typed)) + "</code>" + (x.fail ? " (jammed)" : "") + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre, .srt-arm, .srt-tray-wrap" });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var i, els = document.querySelectorAll("[data-sorter]");
    for (i = 0; i < els.length; i++) { try { mountSorter(els[i]); } catch (e) { L.report("sorter", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
