/* Chapter 16 extension: "Lazy Conveyor Belts" (comprehensions, iterators, generators, itertools).
   Adds, registered with the comic engine:
   (1) cast: teller (the storyteller = a generator), dispenser (a loaded candy dispenser = an iterator),
       factory (a tiny conveyor-belt factory for the cover). Jigsaw and the Taster come from comic-critters.js;
   (2) [data-factory]  the factory line: a stepper that sends each item of a list comprehension's source past the
       quality gate (if) and the stamping machine (expression) into the new list. Its final list must be a whole line
       of the program's captured output, and every gate verdict is worked out here from the model and must agree;
   (3) [data-teller]   the storyteller walker: steps a generator and its consumer, showing the line about to run AND
       the bookmark where the generator is paused at yield. The final screen must equal the real output and every
       step's screen must be a prefix of it;
   (4) [data-pipeline] a generator pipeline: four stages, who is asking whom, which item is travelling, which item
       was dropped. Same parity rules as the teller;
   (5) [data-ver]      a version tag over a terminal: the primary toolchain, or the secondary one's version for a program
       whose runs differ (the terminals themselves are engine terminals: data-run, plus data-alt for the second run).
   Every stepper uses the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) with
   { reserve: true }, so the tallest step's height is kept and the buttons never move, marks the part that changes
   with data-now (or li.now) for the engine's phone scroll, and fills a text-version table. Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch16.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function hand(x, y, fill) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="' + (fill || "#FFFFFF") + '"' + S(3) + "/>"; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(6) + "/>"; }
  function foot(x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="11" ry="5.5" fill="' + INK + '"/>'; }
  function txt(x, y, t, size, extra) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (size || 16) + '" fill="' + INK + '"' + (extra || "") + ">" + esc(t) + "</text>"; }

  /* ---------------- cast ---------------- */
  // The storyteller: a cosy round character holding a big open book with a ribbon bookmark.
  // data-state: asleep (eyes shut, z z), talk (mouth open, words flying), pause (finger on the bookmark), done (book shut, smile).
  C.teller = { vb: "0 0 160 190", draw: function (el) {
    var st = el.getAttribute("data-state") || "talk", out = '<g class="bob">';
    out += foot(58, 180) + foot(102, 180);
    out += '<path d="M30 176 q-10 -70 50 -78 q60 8 50 78 z" fill="#EFE6FF"' + S(4) + "/>";                  // body (cloak)
    out += '<circle cx="80" cy="66" r="34" fill="#F3C9A1"' + S(4) + "/>";                                       // head
    out += '<path d="M44 58 q4 -44 44 -40 q30 4 30 30 l14 -8 l-4 16 q-40 -14 -84 2 z" fill="#7FB2FF"' + S(4) + "/>"; // night cap
    out += '<circle cx="134" cy="48" r="7" fill="#FFD60A"' + S(3) + "/>";
    if (st === "asleep") {
      out += '<g class="eyes"><path d="M62 68 q6 5 12 0 M86 68 q6 5 12 0" fill="none"' + S(3.5) + "/></g>" + '<path d="M74 86 h12" fill="none"' + S(3.5) + "/>" +
        txt(122, 30, "z", 18, ' class="lbl-deco"') + txt(138, 16, "z", 14, ' class="lbl-deco"');
    } else if (st === "done") {
      out += '<g class="eyes"><path d="M62 66 q6 -7 12 0 M86 66 q6 -7 12 0" fill="none"' + S(3.5) + "/></g>" + '<path d="M70 82 q10 9 20 0" fill="none"' + S(3.5) + "/>";
    } else {
      out += '<g class="eyes">' + dot(68, 66, 4) + dot(92, 66, 4) + "</g>";
      out += st === "talk" ? '<ellipse cx="80" cy="85" rx="7" ry="6" fill="' + INK + '"/>' + '<path d="M120 76 l14 -6 M122 88 h16 M120 100 l14 6" fill="none"' + S(3) + "/>"
        : '<path d="M72 84 h16" fill="none"' + S(3.5) + "/>";
    }
    if (st === "done") {
      out += '<rect x="50" y="118" width="60" height="44" rx="4" fill="#FF5A4E"' + S(4) + '/><path d="M58 118 v44" fill="none"' + S(3) + "/>" + limb(46, 130, 54, 140) + limb(114, 130, 106, 140);
    } else {
      out += '<path d="M80 124 q-24 -8 -46 0 v40 q22 -8 46 0 q24 -8 46 0 v-40 q-22 -8 -46 0 z" fill="#FFFFFF"' + S(4) + '/><path d="M80 124 v40" fill="none"' + S(3) + "/>" +
        '<path d="M44 136 h26 M44 146 h22 M90 136 h26 M90 146 h20" fill="none" stroke="#2B2B2B" stroke-width="2.5" stroke-linecap="round"/>';
      out += st === "pause" ? '<path d="M100 122 v34 l6 -6 l6 6 v-34" fill="#FF5A4E"' + S(3) + "/>" + hand(106, 120, "#F3C9A1") : '<path d="M102 160 v18 l5 -5 l5 5 v-18" fill="#FF5A4E"' + S(2.5) + "/>";
      out += hand(34, 150, "#F3C9A1") + (st === "pause" ? "" : hand(126, 150, "#F3C9A1"));
    }
    return out + "</g>";
  } };
  // The candy dispenser: a tall tube with a spring and a flip-top head; data-left = candies still loaded (0-4),
  // data-label = text on the tube. An empty dispenser shows a dashed tube and a frown.
  C.dispenser = { vb: "0 0 120 200", draw: function (el) {
    var left = Math.max(0, Math.min(4, Number(el.getAttribute("data-left") || 3))), lab = el.getAttribute("data-label") || "", out = '<g class="bob">';
    var empty = left === 0;
    out += '<rect x="34" y="62" width="52" height="124" rx="8" fill="' + (empty ? "#FFFFFF" : "#C9F2D9") + '"' + S(4) + (empty ? ' stroke-dasharray="8 5"' : "") + "/>";
    out += '<path d="M42 176 l36 -6 l-36 -6 l36 -6 l-36 -6" fill="none" stroke="#2B2B2B" stroke-width="2.5" stroke-linecap="round"/>';
    for (var i = 0; i < left; i++) { var y = 146 - i * 22; out += '<rect x="42" y="' + y + '" width="36" height="18" rx="6" fill="#FFD60A"' + S(3) + "/>"; }
    out += '<path d="M30 60 h60 v-8 h-60 z" fill="#FF5A4E"' + S(3.5) + "/>";
    out += '<path d="M34 52 q-4 -38 26 -40 q30 2 26 40 z" fill="#FFE1E1"' + S(4) + "/>";                // flip-top head
    out += '<g class="eyes">' + dot(50, 34, 3.6) + dot(70, 34, 3.6) + "</g>";
    out += empty ? '<path d="M52 47 q8 -6 16 0" fill="none"' + S(3.5) + "/>" : '<path d="M52 43 q8 7 16 0" fill="none"' + S(3.5) + "/>";
    if (lab) out += txt(60, 196, lab, 14);
    return out + "</g>";
  } };
  // A small conveyor-belt factory for the cover: belt, gate, stamp, crate.
  C.factory = { vb: "0 0 340 150", draw: function () {
    var out = '<path d="M10 112 h250" fill="none"' + S(4) + '/><path d="M10 128 h250" fill="none"' + S(4) + "/>";
    for (var i = 0; i < 9; i++) out += '<circle cx="' + (22 + i * 28) + '" cy="120" r="6" fill="#FFFFFF"' + S(3) + "/>";
    out += '<rect x="20" y="82" width="28" height="28" rx="5" fill="#FFEFD9"' + S(3) + "/>" + txt(34, 102, "4", 15) +
      '<rect x="56" y="82" width="28" height="28" rx="5" fill="#FFEFD9"' + S(3) + "/>" + txt(70, 102, "12", 13);
    out += '<path d="M104 112 v-74 h40 v74" fill="none"' + S(4) + '/><path d="M104 46 h40" fill="none"' + S(3) + "/>" + txt(124, 32, "if", 16);
    out += '<rect x="172" y="20" width="44" height="34" rx="5" fill="#FFD60A"' + S(4) + '/><path d="M194 54 v18" fill="none"' + S(5) + '/><rect x="178" y="72" width="32" height="10" rx="2" fill="#FFFFFF"' + S(3) + "/>" + txt(194, 43, "x2", 15);
    out += '<path d="M268 76 h62 v44 h-62 z" fill="#FFEFD9"' + S(4) + '/><path d="M268 76 l8 -10 h46 l8 10" fill="none"' + S(3) + "/>" + txt(299, 105, "[ ]", 18);
    return '<g class="bob">' + out + "</g>";
  } };

  /* ---------------- shared stepper helpers ---------------- */
  function linesOf(name) { var q = L.program(name); return q ? q.src.replace(/\n$/, "").split("\n") : []; }
  function screenHtml(out, prevLen, announce) {
    return out.length ? out.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
  }
  /* Final screen equals the real output; every step's screen is a prefix of it. */
  function screenParity(name, steps, where) {
    var q = L.program(name); if (!q) return false;
    var real = L.shown(q), lines = real.replace(/\n$/, "").split("\n"), last = steps[steps.length - 1].output;
    var ok = (last.length ? last.join("\n") + "\n" : "") === real;
    steps.forEach(function (s, i) { s.output.forEach(function (l, k) { if (lines[k] !== l) { ok = false; L.report(where, "step " + (i + 1) + " screen line " + (k + 1) + " is not in the real run"); } }); });
    if (!ok) L.report(where, "final screen does not match the real run of " + name);
    return ok;
  }
  function setParity(box, ok, name) { var par = box.querySelector(".parity"); if (par) { par.textContent = ok ? "Matches the real run of " + name : "Does not match the real run of " + name; par.classList.toggle("bad", !ok); } }

  /* ---------------- (2) the factory line ---------------- */
  /* Model: { program, expectLine, source, var, cond, expr, items: [{ v, test, pass, out }] }.
     The gate verdict "pass" must agree with the test text ending in True/False; outputs of passing items, joined like a
     Python list, must equal expectLine, which must be a whole line of the program's real output. */
  function icon(kind) {
    var b = '<svg class="fac-ic" viewBox="0 0 80 50" aria-hidden="true" focusable="false">';
    if (kind === "belt") b += '<path d="M6 30 h68 M6 42 h68" fill="none"' + S(3) + '/><circle cx="16" cy="36" r="4" fill="#fff"' + S(2.5) + '/><circle cx="40" cy="36" r="4" fill="#fff"' + S(2.5) + '/><circle cx="64" cy="36" r="4" fill="#fff"' + S(2.5) + '/><rect x="12" y="8" width="18" height="18" rx="3" fill="#FFEFD9"' + S(2.5) + '/><rect x="36" y="8" width="18" height="18" rx="3" fill="#FFEFD9"' + S(2.5) + "/>";
    if (kind === "gate") b += '<path d="M20 46 v-38 h40 v38" fill="none"' + S(3.5) + '/><path d="M20 18 h40" fill="none"' + S(2.5) + '/><path d="M30 34 l6 6 l12 -14" fill="none"' + S(3) + "/>";
    if (kind === "stamp") b += '<rect x="22" y="4" width="36" height="20" rx="4" fill="#FFD60A"' + S(3) + '/><path d="M40 24 v10" fill="none"' + S(4) + '/><rect x="26" y="34" width="28" height="8" rx="2" fill="#fff"' + S(2.5) + '/><path d="M10 46 h60" fill="none"' + S(3) + "/>";
    if (kind === "crate") b += '<path d="M12 18 h56 v28 h-56 z" fill="#FFEFD9"' + S(3) + '/><path d="M12 18 l6 -10 h44 l6 10" fill="none"' + S(2.5) + "/>" + txt(40, 38, "[ ]", 14);
    return b + "</svg>";
  }
  function mountFactory(box) {
    var m = model(box.getAttribute("data-factory")), q = L.program(m.program), ok = !!q;
    if (q && L.shown(q).split("\n").indexOf(m.expectLine) < 0) { ok = false; L.report("factory", m.expectLine + " is not a line of " + m.program); }
    m.items.forEach(function (it) { if (/True$/.test(it.test) !== !!it.pass) { ok = false; L.report("factory", "gate verdict for " + it.v + " disagrees with its test"); } });
    var outs = m.items.filter(function (it) { return it.pass; }).map(function (it) { return it.out; });
    if ("[" + outs.join(", ") + "]" !== m.expectLine) { ok = false; L.report("factory", "the stamped items do not make " + m.expectLine); }
    setParity(box, ok, m.program);
    // Steps: 0 = belt loaded; per item: "gate", then "stamp" for passing items; last = print.
    var steps = [{ kind: "load" }];
    m.items.forEach(function (it, i) { steps.push({ kind: "gate", i: i }); if (it.pass) steps.push({ kind: "stamp", i: i }); });
    steps.push({ kind: "print" });
    var stage = box.querySelector(".fac-stage");
    stage.innerHTML =
      '<div class="fac-st fac-belt"><p class="fac-h">' + icon("belt") + '<span>1 · SOURCE BELT</span></p><code>for ' + esc(m["var"]) + " in " + esc(m.source) + '</code><div class="fac-items" data-slot="belt"></div></div>' +
      '<p class="fac-arrow" aria-hidden="true">→</p>' +
      '<div class="fac-st fac-gate"><p class="fac-h">' + icon("gate") + '<span>2 · QUALITY GATE</span></p><code>if ' + esc(m.cond) + '</code><div class="fac-slot" data-slot="gate"></div></div>' +
      '<p class="fac-arrow" aria-hidden="true">→</p>' +
      '<div class="fac-st fac-stamp"><p class="fac-h">' + icon("stamp") + '<span>3 · STAMPING MACHINE</span></p><code>' + esc(m.expr) + '</code><div class="fac-slot" data-slot="stamp"></div></div>' +
      '<p class="fac-arrow" aria-hidden="true">→</p>' +
      '<div class="fac-st fac-out"><p class="fac-h">' + icon("crate") + '<span>4 · NEW LIST</span></p><code>[ … ]</code><div class="fac-items" data-slot="out"></div></div>';
    var slot = {}; ["belt", "gate", "stamp", "out"].forEach(function (k) { slot[k] = stage.querySelector('[data-slot="' + k + '"]'); });
    var bin = box.querySelector(".fac-bin"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var sts = { belt: stage.querySelector(".fac-belt"), gate: stage.querySelector(".fac-gate"), stamp: stage.querySelector(".fac-stamp"), out: stage.querySelector(".fac-out") };
    function tok(v, cls) { return '<span class="fac-tok ' + (cls || "") + '"><code>' + esc(v) + "</code></span>"; }
    function describe(s) {
      var it = m.items[s.i];
      if (s.kind === "load") return "The source belt is loaded with every item of <code>" + esc(m.source) + "</code>. Nothing has been checked yet, and the new list is empty.";
      if (s.kind === "gate") return "<code>" + esc(m["var"]) + "</code> is <code>" + esc(it.v) + "</code>. The gate asks <code>" + esc(it.test) + "</code>. " +
        (it.pass ? "✓ Let through, on to the stamping machine." : "✗ Turned away. This item never reaches the stamp, so it is <b>not</b> in the new list.");
      if (s.kind === "stamp") return "The stamping machine works out <code>" + esc(m.expr.split(m["var"]).join(it.v)) + "</code> = <code>" + esc(it.out) + "</code>. That value goes into the new list.";
      return "The belt is empty, so the comprehension is finished: the new list is <code>" + esc(m.expectLine) + "</code>, and <code>print</code> shows it.";
    }
    var prevLen = 0;
    function render(st, announce) {
      var s = steps[st.step], upto = s.kind === "print" ? m.items.length : s.kind === "load" ? -1 : s.i;
      var waiting = m.items.filter(function (_, k) { return k > upto || (s.kind !== "load" && k === upto && false); });
      slot.belt.innerHTML = waiting.length ? waiting.map(function (it) { return tok(it.v); }).join("") : '<span class="fac-empty">empty</span>';
      var it = s.i != null ? m.items[s.i] : null;
      slot.gate.innerHTML = s.kind === "gate" ? tok(it.v, "now") + '<span class="fac-verdict ' + (it.pass ? "yes" : "no") + '">' + (it.pass ? "✓ True: pass" : "✗ False: rejected") + "</span>" : '<span class="fac-empty">waiting</span>';
      slot.stamp.innerHTML = s.kind === "stamp" ? tok(it.v, "now") + '<span class="fac-verdict yes">→ <code>' + esc(it.out) + "</code></span>" : '<span class="fac-empty">waiting</span>';
      var made = m.items.filter(function (x, k) { return x.pass && (k < upto || (k === upto && s.kind === "stamp") || s.kind === "print"); });
      slot.out.innerHTML = made.length ? made.map(function (x) { return tok(x.out, "made"); }).join("") : '<span class="fac-empty">empty</span>';
      var rej = m.items.filter(function (x, k) { return !x.pass && (k < upto || (k === upto && s.kind === "gate") || s.kind === "print"); });
      bin.innerHTML = "<b>Rejected bin:</b> " + (rej.length ? rej.map(function (x) { return tok(x.v, "rej"); }).join(" ") : "nothing yet");
      for (var k in sts) { sts[k].classList.remove("on"); sts[k].removeAttribute("data-now"); }
      var on = s.kind === "load" ? sts.belt : s.kind === "gate" ? sts.gate : s.kind === "stamp" ? sts.stamp : sts.out;
      on.classList.add("on"); on.setAttribute("data-now", "");
      var o = s.kind === "print" ? [m.expectLine] : [];
      out.innerHTML = screenHtml(o, prevLen, announce); prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + "</span>" + describe(s);
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + { load: "source belt", gate: "quality gate", stamp: "stamping machine", print: "print" }[s.kind] + "</td><td>" + describe(s) + "</td></tr>"; }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  /* ---------------- (3) the storyteller walker ---------------- */
  /* Model: { program, steps: [{ line, mark, state, output, note }] }: line = next line to run (null at the end);
     mark = line where the generator is paused at a yield (null if it is not paused); state = asleep | talk | pause | done. */
  var STATE_WORD = { asleep: "Not started: the story has not begun", talk: "Telling: running its own code", pause: "Paused at yield, bookmark in place", done: "Finished: the book is closed" };
  function mountTeller(box) {
    var m = model(box.getAttribute("data-teller")), lines = linesOf(m.program); if (!lines.length) return;
    var ok = screenParity(m.program, m.steps, "teller"); setParity(box, ok, m.program);
    var ol = box.querySelector(".tl-code");
    ol.innerHTML = lines.map(function (l) { return "<li>" + (l ? L.highlight(l) : " ") + "</li>"; }).join("");
    L.hangLines(ol.querySelectorAll("li"));   // a wrapped line continues under its own first character (phones)
    var lis = ol.querySelectorAll("li"), who = box.querySelector(".tl-who"), word = box.querySelector(".tl-state"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), prevLen = 0;
    function render(st, announce) {
      var s = m.steps[st.step];
      for (var k = 0; k < lis.length; k++) { lis[k].classList.toggle("now", s.line === k + 1); lis[k].classList.toggle("mark", s.mark === k + 1); }
      who.setAttribute("data-state", s.state); who.innerHTML = C.teller.draw(who); if (L.fitLabels) L.fitLabels();   // the decorative "z z" hides where it would be under 12px
      word.innerHTML = "<b>The teller:</b> " + STATE_WORD[s.state] + (s.mark ? " (line " + s.mark + ")" : "");
      out.innerHTML = screenHtml(s.output, prevLen, announce); prevLen = s.output.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " " + word.textContent;
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(lines[s.line - 1].trim()) + "</code>" : "finished") + "</td><td>" + s.note + "</td><td>" + STATE_WORD[s.state] + (s.mark ? " (line " + s.mark + ")" : "") + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>"; }).join("");
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
  }

  /* ---------------- (4) the generator pipeline ---------------- */
  /* Model: { program, stages: [{ id, label, code }], steps: [{ active, status: { id: text }, wait: [ids], carry: { at, v },
     output, note }] }. Status words carry the state; the active stage also gets a thick border and a marker. */
  function mountPipeline(box) {
    var m = model(box.getAttribute("data-pipeline"));
    var ok = screenParity(m.program, m.steps, "pipeline"); setParity(box, ok, m.program);
    var row = box.querySelector(".pl-row");
    row.innerHTML = m.stages.map(function (st, i) {
      return (i ? '<p class="pl-link" aria-hidden="true"><span class="pl-ask">← ask</span><span class="pl-give">give →</span></p>' : "") +
        '<div class="pl-st" data-id="' + esc(st.id) + '"><p class="pl-h">' + esc(st.label) + "</p><code>" + esc(st.code) + '</code><p class="pl-status"></p><p class="pl-carry"></p></div>';
    }).join("");
    var boxes = row.querySelectorAll(".pl-st"), links = row.querySelectorAll(".pl-link"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), prevLen = 0;
    function idx(id) { for (var i = 0; i < m.stages.length; i++) if (m.stages[i].id === id) return i; return -1; }
    function render(st, announce) {
      var s = m.steps[st.step], wait = s.wait || [];
      for (var i = 0; i < boxes.length; i++) {
        var id = m.stages[i].id;
        boxes[i].classList.toggle("on", s.active === id);
        if (s.active === id) boxes[i].setAttribute("data-now", ""); else boxes[i].removeAttribute("data-now");
        boxes[i].classList.toggle("waiting", wait.indexOf(id) >= 0);
        boxes[i].querySelector(".pl-status").textContent = (s.active === id ? "▶ " : "") + ((s.status || {})[id] || "asleep");
        boxes[i].querySelector(".pl-carry").innerHTML = s.carry && s.carry.at === id ? "<code>" + esc(s.carry.v) + "</code>" : "";
      }
      for (var j = 0; j < links.length; j++) {   // link j sits between stage j and stage j+1
        var askOn = wait.indexOf(m.stages[j + 1].id) >= 0 && (wait.indexOf(m.stages[j].id) >= 0 || s.active === m.stages[j].id);
        var giveOn = !!(s.give && idx(s.give) === j);
        links[j].classList.toggle("ask", askOn); links[j].classList.toggle("give", giveOn);
      }
      out.innerHTML = screenHtml(s.output, prevLen, announce); prevLen = s.output.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + m.stages.map(function (stg) { return "<b>" + esc(stg.label) + "</b>: " + esc((s.status || {})[stg.id] || "asleep"); }).join("<br>") + "</td><td>" + s.note + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
  }

  /* ---------------- (5) version tags over terminals ---------------- */
  function fillVersionTags() {
    var meta = (P.data && P.data.captures && P.data.captures.meta) || {};
    var tags = document.querySelectorAll("[data-ver]");
    for (var j = 0; j < tags.length; j++) {
      var p = L.program(tags[j].getAttribute("data-prog") || "");
      tags[j].textContent = tags[j].getAttribute("data-ver") === "alt" ? (p && p.alt ? p.alt.version : "?") : (meta.primary || "?");
    }
  }

  P.comic.ext(function () {
    fillVersionTags();
    [["[data-factory]", mountFactory, "factory"], ["[data-teller]", mountTeller, "teller"], ["[data-pipeline]", mountPipeline, "pipeline"]].forEach(function (w) {
      var els = document.querySelectorAll(w[0]);
      for (var i = 0; i < els.length; i++) { try { w[1](els[i]); } catch (e) { L.report(w[2], e.message); } }
    });
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
