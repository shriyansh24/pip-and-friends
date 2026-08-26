/* Chapter 4 extension: lamp circuits for and / or / not, a block view that draws what belongs to each
   if / elif / else (built from the captured source). (The same-source badge is the engine's [data-same-src].)
   Every claim is checked against the captured runs (POLYGLOT.data.captures) and shows a parity badge. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P.comic.lib, esc = L.esc;
  var NS = "http://www.w3.org/2000/svg";
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }

  /* ------------------------------------------------------------------ lamp circuits */
  /* truth.py prints four rows "a b (a and b) (a or b)" and two rows "a (not a)". */
  function readTruth(prog) {
    var rows = { and: [], or: [], not: [] };
    L.shown(prog).replace(/\n$/, "").split("\n").forEach(function (line) {
      var t = line.trim().split(/\s+/).map(function (w) { return w === "True"; });
      if (t.length === 4) { rows.and.push({ a: t[0], b: t[1], r: t[2] }); rows.or.push({ a: t[0], b: t[1], r: t[3] }); }
      else if (t.length === 2) rows.not.push({ a: t[0], r: t[1] });
    });
    return rows;
  }
  var JS = { and: function (a, b) { return a && b; }, or: function (a, b) { return a || b; }, not: function (a) { return !a; } };
  function T(v) { return v ? "True" : "False"; }

  function sw(g, x, y, closed, name, val, ly) {
    var s = sv("g", { "class": "c-switch" + (closed ? " closed" : " open") }, g);
    sv("circle", { cx: x - 28, cy: y, r: 6, "class": "c-contact" }, s);
    sv("circle", { cx: x + 28, cy: y, r: 6, "class": "c-contact" }, s);
    sv("path", { d: closed ? "M" + (x - 28) + " " + y + " L" + (x + 28) + " " + y : "M" + (x - 28) + " " + y + " L" + (x + 18) + " " + (y - 30), "class": "c-lever" }, s);
    var t = sv("text", { x: x, y: y + (ly || 36), "text-anchor": "middle", "class": "c-label" }, s);
    t.textContent = name + " = " + T(val);
    var t2 = sv("text", { x: x, y: y + (ly || 36) + 20, "text-anchor": "middle", "class": "c-sub" }, s);
    t2.textContent = closed ? "(closed)" : "(open)";
  }
  function wire(g, pts, live) {
    var d = "M" + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L");
    sv("path", { d: d, "class": "c-wire" + (live ? " live" : "") }, g);
    if (live) sv("path", { d: d, "class": "c-flow" }, g);
  }
  function drawCircuit(svg, op, a, b, lit) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 440 300");
    var g = sv("g", {}, svg);
    // battery on the left, lamp on the bottom wire, right wire back up; compact so labels stay readable on phones
    var L1 = lit;
    if (op === "and") {
      wire(g, [[34, 120], [34, 50], [122, 50]], L1); wire(g, [[178, 50], [262, 50]], L1); wire(g, [[318, 50], [420, 50], [420, 250], [374, 250]], L1);
      wire(g, [[346, 250], [34, 250], [34, 180]], L1);
      sw(g, 150, 50, a, "a", a); sw(g, 290, 50, b, "b", b);
    } else if (op === "or") {
      wire(g, [[34, 120], [34, 50], [80, 50]], L1);
      wire(g, [[80, 50], [182, 50]], a); wire(g, [[238, 50], [340, 50]], a);
      wire(g, [[80, 50], [80, 140], [182, 140]], b); wire(g, [[238, 140], [340, 140], [340, 50]], b);
      wire(g, [[340, 50], [420, 50], [420, 250], [374, 250]], L1); wire(g, [[346, 250], [34, 250], [34, 180]], L1);
      sw(g, 210, 50, a, "a", a, 34); sw(g, 210, 140, b, "b", b, 34);
    } else {
      wire(g, [[34, 120], [34, 50], [122, 50]], a); wire(g, [[178, 50], [250, 50]], a);
      wire(g, [[330, 50], [420, 50], [420, 250], [374, 250]], L1); wire(g, [[346, 250], [34, 250], [34, 180]], L1);
      sw(g, 150, 50, a, "a", a);
      sv("rect", { x: 250, y: 26, width: 80, height: 48, rx: 10, "class": "c-not" }, g);
      var nt = sv("text", { x: 290, y: 58, "text-anchor": "middle", "class": "c-not-t" }, g); nt.textContent = "not";
      var ns = sv("text", { x: 290, y: 100, "text-anchor": "middle", "class": "c-sub" }, g); ns.textContent = "flips it";
    }
    // battery
    sv("rect", { x: 14, y: 120, width: 40, height: 60, rx: 6, "class": "c-battery" }, g);
    sv("path", { d: "M24 136 h20 M28 150 h12 M24 164 h20", "class": "c-plates" }, g);
    var bt = sv("text", { x: 62, y: 156, "class": "c-sub" }, g); bt.textContent = "power";
    // the lamp creature sits in a socket on the bottom wire
    var lamp = sv("svg", { x: 312, y: 152, width: 96, height: 128, viewBox: L.cast.lamp.vb, "aria-hidden": "true", "class": "c-lamp" }, g);
    lamp.innerHTML = L.cast.lamp.draw({ getAttribute: function (k) { return k === "data-on" ? String(lit) : null; } });
  }

  function mountCircuit(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-circuit")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var rows = readTruth(prog), bad = 0;
    ["and", "or", "not"].forEach(function (op) {
      var need = op === "not" ? 2 : 4;
      if (rows[op].length !== need) { bad++; L.report("circuit", op + ": expected " + need + " rows in " + m.program); }
      rows[op].forEach(function (r) { if (JS[op](r.a, r.b) !== r.r) { bad++; L.report("circuit", op + " row " + T(r.a) + " " + T(r.b) + " disagrees with " + m.program); } });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? "Does not match the real run of " + m.program : "Every lamp matches the real run of " + m.program; par.classList.toggle("bad", !!bad); }
    var svg = box.querySelector("svg.circ-svg"), expr = box.querySelector(".circ-expr"), tbl = box.querySelector(".circ-table"), cap = box.querySelector(".circ-cap"), live = box.querySelector("[aria-live]");
    var opBtns = box.querySelectorAll("[data-op]"), swA = box.querySelector('[data-sw="a"]'), swB = box.querySelector('[data-sw="b"]');
    var st = { op: m.start || "and", a: true, b: false };
    function lookup() {
      var list = rows[st.op];
      for (var i = 0; i < list.length; i++) if (list[i].a === st.a && (st.op === "not" || list[i].b === st.b)) return { i: i, r: list[i].r };
      return { i: -1, r: JS[st.op](st.a, st.b) };
    }
    function render(announce) {
      var hit = lookup(), lit = hit.r;
      drawCircuit(svg, st.op, st.a, st.b, lit);
      for (var i = 0; i < opBtns.length; i++) opBtns[i].setAttribute("aria-pressed", String(opBtns[i].getAttribute("data-op") === st.op));
      swA.setAttribute("aria-pressed", String(st.a)); swA.innerHTML = "Switch <code>a</code>: <b>" + T(st.a) + "</b>";
      swB.setAttribute("aria-pressed", String(st.b)); swB.innerHTML = "Switch <code>b</code>: <b>" + T(st.b) + "</b>";
      swB.hidden = st.op === "not";
      var code = st.op === "not" ? "not " + T(st.a) : T(st.a) + " " + st.op + " " + T(st.b);
      expr.innerHTML = '<code class="circ-code">' + esc(code) + '</code> <span class="circ-arrow" aria-hidden="true">→</span> <span class="circ-res ' + (lit ? "on" : "off") + '">' + T(lit) + (lit ? " · lamp ON" : " · lamp off") + "</span>";
      var cols = st.op === "not" ? ["a", "not a"] : ["a", "b", "a " + st.op + " b"];
      if (cap) cap.innerHTML = "Truth table for <code>" + st.op + "</code>. Every row comes from the real run of " + esc(m.program) + ".";
      tbl.innerHTML = "<caption class=\"sr-only\">Truth table for " + st.op + "</caption><thead><tr>" + cols.map(function (c) { return "<th scope=\"col\"><code>" + esc(c) + "</code></th>"; }).join("") + "<th scope=\"col\"><span class=\"sr-only\">Current row</span></th></tr></thead><tbody>" +
        rows[st.op].map(function (r, i) { var now = i === hit.i; return '<tr class="' + (now ? "now" : "") + '"><td>' + T(r.a) + "</td>" + (st.op === "not" ? "" : "<td>" + T(r.b) + "</td>") + '<td><b>' + T(r.r) + "</b></td><td class=\"mk\">" + (now ? "◀ now" : "") + "</td></tr>"; }).join("") + "</tbody>";
      svg.setAttribute("aria-label", "Circuit for " + code + ": the lamp is " + (lit ? "on, so the result is True." : "off, so the result is False."));
      if (announce && live) live.textContent = code + " gives " + T(lit) + ". The lamp is " + (lit ? "on." : "off.");
    }
    box.addEventListener("click", function (e) {
      var o = e.target.closest("[data-op]"), s = e.target.closest("[data-sw]");
      if (o) { st.op = o.getAttribute("data-op"); render(true); }
      else if (s) { st[s.getAttribute("data-sw")] = !st[s.getAttribute("data-sw")]; render(true); }
    });
    render(false);
  }

  /* ------------------------------------------------------------------ block view */
  /* Groups the captured source by indentation: every line ending in ":" owns the more-indented lines after it. */
  var TAGS = { "if": "inside the if: runs only if its check is True", "elif": "inside this elif: tried only if every check above was False", "else": "inside the else: runs only if every check above was False" };
  function indentOf(s) { return s.length - s.replace(/^ +/, "").length; }
  function buildBlocks(lines, from, to, depth) {
    var html = "", i = from;
    while (i < to) {
      var line = lines[i], ind = indentOf(line), text = line.slice(ind);
      var num = '<span class="bv-n" aria-hidden="true">' + (i + 1) + "</span>";
      if (/:\s*$/.test(text)) {
        var j = i + 1; while (j < to && (lines[j].trim() === "" || indentOf(lines[j]) > ind)) j++;
        var kw = (text.match(/^(if|elif|else)\b/) || [])[1];
        html += '<div class="bv-line bv-head">' + num + "<code>" + L.highlight(text) + "</code></div>";
        html += '<div class="bv-block d' + depth + '" role="group" aria-label="Lines ' + (i + 2) + " to " + j + ", " + esc(kw ? TAGS[kw] : "inside this block") + '"><p class="bv-tag">' + (kw ? "INSIDE THE <code>" + kw + "</code>" : "INSIDE") + '<span class="bv-why">' + esc(kw ? TAGS[kw].replace(/^inside [^:]+: /, "") : "") + "</span></p>" + buildBlocks(lines, i + 1, j, depth + 1) + "</div>";
        i = j;
      } else {
        html += '<div class="bv-line">' + num + "<code>" + L.highlight(text) + "</code></div>";
        i++;
      }
    }
    return html;
  }
  function mountBlocks(box) {
    var name = box.getAttribute("data-blocks"), prog = L.program(name); if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n");
    box.innerHTML = '<p class="bv-file">' + esc(name) + " · block view</p>" + buildBlocks(lines, 0, lines.length, 0);
  }

  P.comic.ext(function () {
    var c = document.querySelectorAll("[data-circuit]");
    for (var i = 0; i < c.length; i++) { try { mountCircuit(c[i]); } catch (e) { L.report("circuit", e.message); } }
    var b = document.querySelectorAll("[data-blocks]");
    for (var j = 0; j < b.length; j++) { try { mountBlocks(b[j]); } catch (e2) { L.report("blocks", e2.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
