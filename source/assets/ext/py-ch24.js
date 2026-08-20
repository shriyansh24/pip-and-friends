/* Chapter 24 extension: "Dolls and Stopwatches" (recursion and performance).
   Adds, registered with the comic engine:
   (1) cast: doll       a nesting doll. data-state = shut (not opened yet) | open (top half lifted, waiting for the doll
                        inside) | solid (the smallest doll, which does not open: the base case) | done (closed again);
                        data-tone = 0-4 picks the paint. Meaning is never carried by colour alone: the page prints the
                        state in words under every doll.
             stopwatch  a stopwatch with a face; data-label = the text on its display (<= 8 chars).
   (2) [data-dolls]     the nesting-doll stepper: one doll per call, opened on the way down and closed on the way up with
                        the value it hands back. The final screen must equal the real output of the program, and every
                        step's screen must be a prefix of it.
   (3) [data-calltree]  the call tree of a recursive fib, built FROM the program's captured output (one indented line per
                        call). Steps through the calls in the real order. Repeated questions are marked "again" (dashed),
                        answers taken from a memo are marked "memo" (double border). Parity: the screen prefix rule above,
                        plus the tree's own arithmetic must give the program's "answer:" line, and (plain mode) the number
                        of nodes must equal its "calls:" line.
   (4) [data-opschart]  a line chart of step counts read from a program's output table ("guests linear binary set").
                        Series are told apart by line style, marker shape and direct labels, not colour; a table with the
                        same numbers sits under it.
   Every stepper uses the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fills
   a text-version table. Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch24.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";
  var TONES = ["#FF5A4E", "#7FB2FF", "#FFD60A", "#C9F2D9", "#FFE1E1"];

  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function txt(x, y, t, size, extra) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (size || 16) + '" fill="' + INK + '"' + (extra || "") + ">" + esc(t) + "</text>"; }

  /* ---------------- cast: the nesting doll ---------------- */
  function dollSvg(state, tone) {
    var fill = TONES[(+tone || 0) % TONES.length];
    var shut = state === "shut", open = state === "open", solid = state === "solid";
    var dash = shut ? ' stroke-dasharray="8 6"' : "";
    // bottom half: a round-bellied cup from the waist (y = 96) down to the base
    var bottom = '<path d="M22 96 C10 128 14 160 34 172 H86 C106 160 110 128 98 96 Z" fill="' + fill + '"' + S(4) + dash + "/>" +
      '<circle cx="60" cy="136" r="17" fill="#FFFFFF"' + S(3) + dash + "/>" +
      '<path d="M60 124 q6 6 0 12 q-6 6 0 12 M48 136 h24" fill="none"' + S(2.5) + "/>";
    // top half: the head and shoulders, from the top down to the waist
    var face = solid
      ? '<g class="eyes">' + dot(50, 58, 4) + dot(70, 58, 4) + '</g><path d="M50 70 q10 9 20 0" fill="none"' + S(3) + "/>"
      : open ? '<g class="eyes">' + dot(50, 58, 4) + dot(70, 58, 4) + '</g><ellipse cx="60" cy="72" rx="5" ry="5" fill="' + INK + '"/>'
        : '<g class="eyes"><path d="M45 58 q5 -5 10 0 M65 58 q5 -5 10 0" fill="none"' + S(3) + '/></g><path d="M54 70 q6 4 12 0" fill="none"' + S(3) + "/>";
    var top = '<path d="M22 96 C14 70 24 22 60 18 C96 22 106 70 98 96 Z" fill="' + fill + '"' + S(4) + dash + "/>" +
      '<ellipse cx="60" cy="60" rx="26" ry="24" fill="#FFF6CC"' + S(3) + dash + "/>" + face +
      '<circle cx="44" cy="68" r="4" fill="#FFE1E1"/><circle cx="76" cy="68" r="4" fill="#FFE1E1"/>' +
      '<path d="M34 42 q26 -22 52 0" fill="none"' + S(3) + "/>";
    var out = "";
    if (open) {
      out += bottom + '<ellipse cx="60" cy="96" rx="37" ry="8" fill="' + INK + '"/>';
      out += '<g transform="translate(-6 -16) rotate(-14 22 96)">' + top + "</g>";
    } else {
      out += bottom + top + '<path d="M22 96 H98" fill="none"' + S(3) + dash + "/>";
    }
    if (solid) out += '<path d="M104 18 l4 9 l10 1 l-8 6 l3 10 l-9 -5 l-9 5 l3 -10 l-8 -6 l10 -1 z" fill="#FFD60A"' + S(2.5) + "/>";
    return '<g class="' + (open ? "" : "bob") + '">' + out + "</g>";
  }
  C.doll = { vb: "0 0 124 180", draw: function (el) { return dollSvg(el.getAttribute("data-state") || "done", el.getAttribute("data-tone") || 0); } };

  /* ---------------- cast: the stopwatch ---------------- */
  C.stopwatch = { vb: "0 0 150 180", draw: function (el) {
    var label = (el.getAttribute("data-label") || "0.00 s").slice(0, 8);
    var fs = label.length > 6 ? 15 : 20;
    return '<g class="bob">' +
      '<rect x="62" y="6" width="26" height="16" rx="4" fill="#7A8794"' + S(3) + "/>" +
      '<path d="M75 22 v10" fill="none"' + S(5) + "/>" +
      '<path d="M114 34 l12 -12" fill="none"' + S(5) + "/>" +
      '<circle cx="75" cy="104" r="68" fill="#7FB2FF"' + S(4) + "/>" +
      '<circle cx="75" cy="104" r="54" fill="#FFFFFF"' + S(3) + "/>" +
      '<path d="M75 54 v8 M75 146 v8 M25 104 h8 M117 104 h8" fill="none"' + S(3) + "/>" +
      '<g class="eyes">' + dot(60, 86, 4.5) + dot(90, 86, 4.5) + "</g>" +
      '<path d="M64 100 q11 8 22 0" fill="none"' + S(3) + "/>" +
      '<path d="M75 104 L98 72" fill="none"' + S(3.5) + "/>" + dot(75, 104, 4) +
      '<rect x="38" y="116" width="74" height="26" rx="5" fill="#FFF6CC"' + S(3) + "/>" +
      txt(75, 135, label, fs) + "</g>";
  } };

  /* ---------------- shared stepper helpers ---------------- */
  function screenHtml(out, prevLen, announce) {
    return out.length ? out.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
  }
  function realLines(name) { var q = L.program(name); if (!q) return null; return L.shown(q).replace(/\n$/, "").split("\n"); }
  /* Final screen equals the real output; every step's screen is a prefix of it. */
  function screenParity(name, steps, where) {
    var q = L.program(name); if (!q) return false;
    var real = L.shown(q), lines = real.replace(/\n$/, "").split("\n"), last = steps[steps.length - 1].output;
    var ok = (last.length ? last.join("\n") + "\n" : "") === real;
    steps.forEach(function (s, i) { s.output.forEach(function (l, k) { if (lines[k] !== l) { ok = false; L.report(where, "step " + (i + 1) + " screen line " + (k + 1) + " is not in the real run of " + name); } }); });
    if (!ok) L.report(where, "final screen does not match the real run of " + name);
    return ok;
  }
  function setParity(box, ok, text) { var par = box.querySelector(".parity"); if (par) { par.textContent = ok ? text : "Does not match the real run"; par.classList.toggle("bad", !ok); } }

  /* ---------------- (2) the nesting-doll stepper ---------------- */
  /* Model: { program, steps: [{ dolls: [{ label, state, ret? }], output, note }] } */
  var DOLL_WORD = { shut: "not opened yet", open: "open: waiting for the doll inside", solid: "solid: the base case", done: "closed again" };
  var DOLL_SHORT = { shut: "shut", open: "waiting", solid: "solid", done: "closed" };   // phones: one word per doll; the text version keeps the sentence
  function mountDolls(box) {
    var m = model(box.getAttribute("data-dolls"));
    var ok = screenParity(m.program, m.steps, "dolls"); setParity(box, ok, "Matches the real run of " + m.program);
    var row = box.querySelector(".dl-row"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var prevLen = 0;
    function dollText(d) { return d.label + ": " + DOLL_WORD[d.state] + (d.ret != null ? ", hands back " + d.ret : ""); }
    function render(st, announce) {
      var s = m.steps[st.step], n = s.dolls.length;
      row.innerHTML = s.dolls.map(function (d, i) {
        var size = Math.round(100 - i * (46 / Math.max(1, n - 1)));
        return '<figure class="dl-doll dl-' + d.state + '" style="--dl-size:' + size + '%">' +
          '<svg class="char" viewBox="' + C.doll.vb + '" aria-hidden="true" focusable="false">' + dollSvg(d.state, i) + "</svg>" +
          "<figcaption><code>" + esc(d.label) + '</code><span class="dl-long">' + DOLL_WORD[d.state] + '</span><span class="dl-short">' + DOLL_SHORT[d.state] + "</span>" +
          (d.ret != null ? '<b class="dl-ret">hands back ' + esc(d.ret) + "</b>" : "") + "</figcaption></figure>";
      }).join("");
      out.innerHTML = screenHtml(s.output, prevLen, announce); prevLen = s.output.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Dolls: " + s.dolls.map(dollText).join("; ") + ".";
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + s.note + "</td><td>" + s.dolls.map(function (d) { return esc(dollText(d)); }).join("<br>") +
        "</td><td><code>" + (s.output.length ? esc(s.output.map(function (l) { return l.trim(); }).join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);   // reserve: .narration, .screen pre and the [data-reserve] doll row keep the tallest step's height
  }

  /* ---------------- (3) the call tree ---------------- */
  /* Model: { program, mode: "plain" | "memo" }. The program prints one line per call: two spaces per level of depth,
     then fib(N), plus " remembered" when the answer came from the memo. Then "answer: X" (and "calls: N" in plain mode). */
  function parseCalls(lines, where) {
    var nodes = [], stack = [], k;
    for (k = 0; k < lines.length; k++) {
      var mm = /^( *)fib\((\d+)\)( remembered)?$/.exec(lines[k]);
      if (!mm) break;
      var depth = mm[1].length / 2;
      if (depth !== Math.floor(depth) || depth > stack.length) throw new Error(where + ": bad indentation on output line " + (k + 1));
      stack.length = depth;
      var node = { n: +mm[2], memo: !!mm[3], depth: depth, kids: [], parent: depth ? stack[depth - 1] : null, order: nodes.length };
      if (node.parent) node.parent.kids.push(node);
      nodes.push(node); stack.push(node);
    }
    return { nodes: nodes, rest: lines.slice(k) };
  }
  function valueOf(node, known) {
    var v;
    if (node.memo) v = known[node.n];
    else if (!node.kids.length) v = node.n;
    else v = node.kids.reduce(function (a, c) { return a + valueOf(c, known); }, 0);
    if (!node.memo) known[node.n] = v;
    node.value = v;
    return v;
  }
  function mountCallTree(box) {
    var m = model(box.getAttribute("data-calltree")), lines = realLines(m.program);
    if (!lines) return;
    var parsed = parseCalls(lines, "calltree"), nodes = parsed.nodes, ok = nodes.length > 0;
    // answer and call-count parity
    var known = {}, val = valueOf(nodes[0], known);
    var ans = parsed.rest.filter(function (l) { return /^answer: /.test(l); })[0];
    if (!ans || +ans.slice(8) !== val) { ok = false; L.report("calltree", "the tree's arithmetic gives " + val + ", the real run says " + ans); }
    if (m.mode === "plain") {
      var cl = parsed.rest.filter(function (l) { return /^calls: /.test(l); })[0];
      if (!cl || +cl.slice(7) !== nodes.length) { ok = false; L.report("calltree", "the tree has " + nodes.length + " calls, the real run says " + cl); }
    }
    // values of each computed node, and "again" marks for questions already asked
    var seen = {};
    nodes.forEach(function (nd) {
      if (!nd.memo) { nd.again = seen[nd.n] != null ? seen[nd.n] : null; if (seen[nd.n] == null) seen[nd.n] = nd.order; }
    });
    var steps = [{ upto: -1, output: [] }];
    nodes.forEach(function (nd, i) { steps.push({ upto: i, output: lines.slice(0, i + 1) }); });
    steps.push({ upto: nodes.length, output: lines.slice() });
    var parityOk = screenParity(m.program, steps, "calltree") && ok;
    var repeats = nodes.filter(function (nd) { return nd.again != null; }).length, memos = nodes.filter(function (nd) { return nd.memo; }).length;
    setParity(box, parityOk, "Built from the real run of " + m.program + ": " + nodes.length + " calls");
    // layout: leaves get consecutive slots, parents sit over the middle of their children
    var slot = 0, SW = 94, LH = 90, NW = 80, NH = 56, PAD = 14;
    (function place(nd) { if (!nd.kids.length) { nd.x = slot++ * SW; } else { nd.kids.forEach(place); nd.x = (nd.kids[0].x + nd.kids[nd.kids.length - 1].x) / 2; } nd.y = nd.depth * LH; })(nodes[0]);
    var maxD = Math.max.apply(null, nodes.map(function (nd) { return nd.depth; }));
    var W = (slot - 1) * SW + NW + PAD * 2, H = maxD * LH + NH + PAD * 2 + 22;
    var svg = box.querySelector(".ct-svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    function cx(nd) { return nd.x + NW / 2 + PAD; }
    function cy(nd) { return nd.y + PAD + 6 + NH / 2; }
    var stage = box.querySelector(".ct-stage"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function describe(st) {
      if (st.upto < 0) return "Nobody has called <code>fib</code> yet. The program is about to ask for <code>fib(" + nodes[0].n + ")</code>.";
      if (st.upto >= nodes.length) return "Every call has handed its answer back up the tree. The top call returns <b>" + val + "</b>, after <b>" + nodes.length + " calls</b>" +
        (m.mode === "plain" ? ", " + repeats + " of them repeats of a question already answered." : ", " + memos + " of them answered straight from the memo.");
      var nd = nodes[st.upto], who = nd.parent ? "<code>fib(" + nd.parent.n + ")</code> asks" : "The program asks";
      var s = "Call " + (nd.order + 1) + ": " + who + " for <code>fib(" + nd.n + ")</code>. ";
      if (nd.memo) return s + "It's already in the memo, so it hands back <b>" + nd.value + "</b> at once, with no calls of its own.";
      if (nd.again != null) s += "<b>Again!</b> This exact question was already worked out at call " + (nd.again + 1) + ". ";
      if (!nd.kids.length) return s + "Base case: <code>" + nd.n + " &lt; 2</code>, so it returns <b>" + nd.value + "</b> straight away.";
      return s + "Not a base case, so it needs <code>fib(" + (nd.n - 1) + ")</code> and <code>fib(" + (nd.n - 2) + ")</code>, and asks for <code>fib(" + (nd.n - 1) + ")</code> first.";
    }
    var prevLen = 0;
    function render(si, announce) {
      var st = steps[si.step], g = "";
      nodes.forEach(function (nd) {
        if (nd.parent) { var vis = nd.order <= st.upto; g += '<path d="M' + cx(nd.parent) + " " + (cy(nd.parent) + NH / 2) + " L" + cx(nd) + " " + (cy(nd) - NH / 2) + '" fill="none" stroke="' + INK + '" stroke-width="' + (vis ? 3 : 2) + '"' + (vis ? "" : ' stroke-dasharray="3 6"') + "/>"; }
      });
      nodes.forEach(function (nd) {
        var vis = nd.order <= st.upto, now = nd.order === st.upto, x = cx(nd) - NW / 2, y = cy(nd) - NH / 2;
        var cls = "ct-node" + (vis ? "" : " ct-later") + (now ? " ct-now" : "") + (nd.again != null ? " ct-again" : "") + (nd.memo ? " ct-memo" : "");
        var fill = now ? "#FFD60A" : nd.memo ? "#C9F2D9" : nd.again != null ? "#FFE1E1" : "#FFFFFF";
        // a call not made yet keeps ink text (7:1); only its box is faded and dotted
        g += '<g class="' + cls + '"' + (now ? " data-now" : "") + '><title>call ' + (nd.order + 1) + ": fib(" + nd.n + ")" + (nd.memo ? ", from the memo" : nd.again != null ? ", asked again" : "") + "</title>";
        g += '<rect x="' + x + '" y="' + y + '" width="' + NW + '" height="' + NH + '" rx="' + (nd.memo ? 19 : 9) + '" fill="' + (vis ? fill : "#FFFFFF") + '" stroke="' + INK + '" stroke-width="' + (now ? 5 : vis ? 3 : 2) + '"' + (vis && nd.again != null ? ' stroke-dasharray="7 5"' : "") + (vis ? "" : ' stroke-dasharray="3 5" fill-opacity="0.6"') + "/>";
        if (nd.memo && vis) g += '<rect x="' + (x + 4) + '" y="' + (y + 4) + '" width="' + (NW - 8) + '" height="' + (NH - 8) + '" rx="16" fill="none" stroke="' + INK + '" stroke-width="2"/>';
        var tag = vis && nd.memo ? "memo" : vis && nd.again != null ? "again" : vis && st.upto >= nodes.length ? "= " + nd.value : "";
        g += txt(cx(nd), cy(nd) + (tag ? -3 : 7), "fib(" + nd.n + ")", 20);
        if (tag) g += txt(cx(nd), cy(nd) + 20, tag, 20, tag.charAt(0) === "=" ? "" : ' font-family="Comic Neue, sans-serif"');
        g += txt(x + 2, y - 6, String(nd.order + 1), 20, ' text-anchor="start" font-family="Comic Neue, sans-serif"');
        g += "</g>";
      });
      svg.innerHTML = g;
      out.innerHTML = screenHtml(st.output, prevLen, announce); prevLen = st.output.length;
      note.innerHTML = '<span class="count">Step ' + (si.step + 1) + " of " + steps.length + "</span>" + describe(st);
      if (live && announce) live.textContent = "Step " + (si.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      if (stage) stage.setAttribute("data-step", si.step);
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (st, i) { return "<tr><td>" + (i + 1) + "</td><td>" + describe(st) + "</td><td><code>" + (st.output.length ? esc(st.output[st.output.length - 1].trim()) : "(nothing)") + "</code></td></tr>"; }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);   // narration and screen keep the tallest step's height
  }

  /* ---------------- (4) the step-count chart ---------------- */
  /* Model: { program, series: [{ col, name, label }] }. The program prints a header line, then rows of numbers. */
  function mountOpsChart(box) {
    var m = model(box.getAttribute("data-opschart")), lines = realLines(m.program); if (!lines) return;
    var head = lines[0].split(" "), rows = lines.slice(1).map(function (l) { return l.split(" ").map(Number); });
    var ok = rows.length >= 2 && rows.every(function (r) { return r.length === head.length && r.every(function (v) { return isFinite(v); }); });
    m.series.forEach(function (s) { if (head.indexOf(s.col) < 0) { ok = false; L.report("opschart", "no column " + s.col + " in " + m.program); } });
    if (!ok) L.report("opschart", "could not read the table printed by " + m.program);
    setParity(box, ok, "Drawn from the real run of " + m.program);
    var svg = box.querySelector(".oc-svg"), wrapW = svg.parentNode.clientWidth - 18;
    var W = Math.max(280, Math.min(720, wrapW || 640)), narrow = W < 480;
    var H = narrow ? 300 : 360, ml = narrow ? 62 : 64, mr = narrow ? 96 : 150, mt = 20, mb = 56, tf = narrow ? 13 : 14;
    var xs = rows.map(function (r) { return r[0]; }), xmax = Math.max.apply(null, xs);
    var ymax = Math.max.apply(null, rows.map(function (r) { return Math.max.apply(null, m.series.map(function (s) { return r[head.indexOf(s.col)]; })); }));
    var step = Math.pow(10, Math.floor(Math.log10(ymax))) , top = Math.ceil(ymax / step) * step;
    if (top / step < 4) step /= 2;
    function X(v) { return ml + (v / xmax) * (W - ml - mr); }
    function Y(v) { return mt + (1 - v / top) * (H - mt - mb); }
    var g = "";
    for (var t = 0; t <= top + 1e-9; t += step) {
      g += '<path d="M' + ml + " " + Y(t) + " H" + (W - mr) + '" stroke="#B9C7E3" stroke-width="1.5"/>' +
        '<text x="' + (ml - 8) + '" y="' + (Y(t) + 5) + '" text-anchor="end" font-family="JetBrains Mono, monospace" font-weight="600" font-size="' + tf + '" fill="' + INK + '">' + t + "</text>";
    }
    g += '<path d="M' + ml + " " + mt + " V" + (H - mb) + " H" + (W - mr) + '" fill="none" stroke="' + INK + '" stroke-width="2"/>';
    var lastX = -1e9;
    xs.forEach(function (v) { if (X(v) - lastX < 44) return; lastX = X(v); g += '<text x="' + X(v) + '" y="' + (H - mb + 22) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="14" fill="' + INK + '">' + v + "</text>"; });
    g += '<text x="' + ((ml + W - mr) / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-family="Comic Neue, sans-serif" font-weight="700" font-size="16" fill="' + INK + '">number of guests</text>';
    g += '<text transform="translate(' + (narrow ? 13 : 16) + ' ' + ((mt + H - mb) / 2) + ') rotate(-90)" text-anchor="middle" font-family="Comic Neue, sans-serif" font-weight="700" font-size="16" fill="' + INK + '">steps to find the last guest</text>';
    var DASH = ["", "10 7", "2 6"], FILL = ["#7FB2FF", "#FFD60A", "#FF5A4E"];
    function marker(k, x, y) {
      if (k === 0) return '<rect x="' + (x - 6) + '" y="' + (y - 6) + '" width="12" height="12" fill="' + FILL[0] + '" stroke="' + INK + '" stroke-width="2"/>';
      if (k === 1) return '<circle cx="' + x + '" cy="' + y + '" r="6.5" fill="' + FILL[1] + '" stroke="' + INK + '" stroke-width="2"/>';
      return '<path d="M' + x + " " + (y - 8) + " L" + (x + 7) + " " + (y + 5) + " L" + (x - 7) + " " + (y + 5) + ' Z" fill="' + FILL[2] + '" stroke="' + INK + '" stroke-width="2"/>';
    }
    var labelYs = [];
    m.series.forEach(function (s, k) {
      var c = head.indexOf(s.col), pts = rows.map(function (r) { return [X(r[0]), Y(r[c]), r[0], r[c]]; });
      g += '<path d="M' + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" L") + '" fill="none" stroke="' + INK + '" stroke-width="2.5"' + (DASH[k] ? ' stroke-dasharray="' + DASH[k] + '"' : "") + "/>";
      pts.forEach(function (p) { g += '<g class="oc-pt">' + marker(k, p[0], p[1]) + '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="14" fill="transparent"><title>' +  esc(s.name) + ": " + p[3] + (p[3] === 1 ? " step" : " steps") + " for " + p[2] + " guests</title></circle></g>"; });
      var last = pts[pts.length - 1], ly = last[1];
      labelYs.forEach(function (u) { if (Math.abs(u - ly) < 34) ly = u - 34; });
      labelYs.push(ly);
      g += marker(k, W - mr + 16, ly - 5) + '<text x="' + (W - mr + 28) + '" y="' + ly + '" font-family="Comic Neue, sans-serif" font-weight="700" font-size="16" fill="' + INK + '">' + esc(s.label) + "</text>" +
        '<text x="' + (W - mr + 28) + '" y="' + (ly + 17) + '" font-family="JetBrains Mono, monospace" font-weight="600" font-size="' + tf + '" fill="' + INK + '">' + last[3] + (narrow ? "" : last[3] === 1 ? " step" : " steps") + "</text>";
    });
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.innerHTML = g;
    var leg = box.querySelector(".oc-legend");
    if (leg) leg.innerHTML = m.series.map(function (s, k) { return '<li><svg viewBox="0 0 40 16" aria-hidden="true" focusable="false"><path d="M2 8 H38" stroke="' + INK + '" stroke-width="2.5"' + (DASH[k] ? ' stroke-dasharray="' + DASH[k] + '"' : "") + "/>" + marker(k, 20, 8) + "</svg>" + esc(s.name) + "</li>"; }).join("");
    var tb = box.querySelector(".oc-table");
    if (tb) tb.innerHTML = "<thead><tr><th>guests</th>" + m.series.map(function (s) { return "<th>" + esc(s.name) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr><td>" + r[0] + "</td>" + m.series.map(function (s) { return "<td>" + r[head.indexOf(s.col)] + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody>";
  }

  P.comic.ext(function () {
    [["[data-dolls]", mountDolls, "dolls"], ["[data-calltree]", mountCallTree, "calltree"], ["[data-opschart]", mountOpsChart, "opschart"]].forEach(function (w) {
      var els = document.querySelectorAll(w[0]);
      for (var i = 0; i < els.length; i++) { try { w[1](els[i]); } catch (e) { L.report(w[2], e.message); } }
    });
    // the chart is drawn at the width it really has, so redraw it when that width changes
    var charts = document.querySelectorAll("[data-opschart]"), timer = null, lastW = root.innerWidth;
    if (charts.length) root.addEventListener("resize", function () {
      if (root.innerWidth === lastW) return; lastW = root.innerWidth;
      root.clearTimeout(timer);
      timer = root.setTimeout(function () { for (var i = 0; i < charts.length; i++) { try { mountOpsChart(charts[i]); } catch (e) { L.report("opschart", e.message); } } }, 150);
    });
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
