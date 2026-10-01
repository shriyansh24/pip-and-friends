/* Go book, chapter 5 extension: lamp circuits for &&, || and !, with short-circuit evaluation made visible.
   The switch Go never looks at is drawn behind a dashed "NOT CHECKED" fence. Every lamp, every truth-table row and
   every "checked" note comes from the captured run of circuit.go (POLYGLOT.data.captures), which prints which sides
   were really evaluated; the widget shows a parity badge and reports any disagreement. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P.comic.lib, esc = L.esc;
  var NS = "http://www.w3.org/2000/svg";
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function T(v) { return v ? "true" : "false"; }
  var SYM = { and: "&&", or: "||", not: "!" };
  var JS = { and: function (a, b) { return a && b; }, or: function (a, b) { return a || b; }, not: function (a) { return !a; } };
  /* Go evaluates the right side of && only when the left is true, and of || only when the left is false. */
  function needsB(op, a) { return op === "and" ? a : op === "or" ? !a : false; }

  /* circuit.go prints "true && false: asked a b -> false" and "!true: asked a -> false". */
  function readRuns(prog) {
    var rows = { and: [], or: [], not: [] }, bad = [];
    L.shown(prog).replace(/\n$/, "").split("\n").forEach(function (line) {
      var m = line.match(/^(true|false) (&&|\|\|) (true|false): asked((?: [ab])+) -> (true|false)$/), n;
      if (m) { rows[m[2] === "&&" ? "and" : "or"].push({ a: m[1] === "true", b: m[3] === "true", asked: m[4].trim().split(" "), r: m[5] === "true" }); return; }
      n = line.match(/^!(true|false): asked((?: [ab])+) -> (true|false)$/);
      if (n) { rows.not.push({ a: n[1] === "true", asked: n[2].trim().split(" "), r: n[3] === "true" }); return; }
      bad.push(line);
    });
    return { rows: rows, bad: bad };
  }

  function sw(g, x, y, closed, name, val, skipped) {
    var s = sv("g", { "class": "c-switch" + (closed ? " closed" : " open") + (skipped ? " skipped" : "") }, g);
    if (skipped) {
      sv("rect", { x: x - 56, y: y - 34, width: 112, height: 100, rx: 10, "class": "c-fence" }, s);
    }
    sv("circle", { cx: x - 28, cy: y, r: 6, "class": "c-contact" }, s);
    sv("circle", { cx: x + 28, cy: y, r: 6, "class": "c-contact" }, s);
    sv("path", { d: closed ? "M" + (x - 28) + " " + y + " L" + (x + 28) + " " + y : "M" + (x - 28) + " " + y + " L" + (x + 18) + " " + (y - 30), "class": "c-lever" }, s);
    var t = sv("text", { x: x, y: y + 32, "text-anchor": "middle", "class": "c-label" }, s);
    t.textContent = name + " = " + T(val);
    var t2 = sv("text", { x: x, y: y + 52, "text-anchor": "middle", "class": skipped ? "c-skip" : "c-sub" }, s);
    t2.textContent = skipped ? "NOT CHECKED" : (closed ? "(closed)" : "(open)");
  }
  function wire(g, pts, live) {
    var d = "M" + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L");
    sv("path", { d: d, "class": "c-wire" + (live ? " live" : "") }, g);
    if (live) sv("path", { d: d, "class": "c-flow" }, g);
  }
  function drawCircuit(svg, op, a, b, lit) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 440 310");
    var g = sv("g", {}, svg), skipB = !needsB(op, a);
    if (op === "and") {
      // in a row: current reaches b only through a
      wire(g, [[34, 120], [34, 56], [122, 56]], true);
      wire(g, [[178, 56], [262, 56]], a);
      wire(g, [[318, 56], [420, 56], [420, 272], [374, 272]], lit);
      wire(g, [[346, 272], [34, 272], [34, 180]], lit);
      sw(g, 150, 56, a, "a", a, false); sw(g, 290, 56, b, "b", b, skipB);
    } else if (op === "or") {
      // side by side: either path lights the lamp
      wire(g, [[34, 120], [34, 56], [80, 56]], true);
      wire(g, [[80, 56], [182, 56]], true); wire(g, [[238, 56], [340, 56]], a);
      wire(g, [[80, 56], [80, 176], [182, 176]], !a); wire(g, [[238, 176], [300, 176], [300, 56]], !a && b);
      wire(g, [[340, 56], [420, 56], [420, 272], [374, 272]], lit); wire(g, [[346, 272], [34, 272], [34, 180]], lit);
      sw(g, 210, 56, a, "a", a, false); sw(g, 210, 176, b, "b", b, skipB);
    } else {
      wire(g, [[34, 120], [34, 56], [122, 56]], true); wire(g, [[178, 56], [250, 56]], a);
      wire(g, [[330, 56], [420, 56], [420, 272], [374, 272]], lit); wire(g, [[346, 272], [34, 272], [34, 180]], lit);
      sw(g, 150, 56, a, "a", a, false);
      sv("rect", { x: 250, y: 32, width: 80, height: 48, rx: 10, "class": "c-not" }, g);
      var nt = sv("text", { x: 290, y: 64, "text-anchor": "middle", "class": "c-not-t" }, g); nt.textContent = "!";
      var ns = sv("text", { x: 290, y: 104, "text-anchor": "middle", "class": "c-sub" }, g); ns.textContent = "flips it";
    }
    sv("rect", { x: 14, y: 120, width: 40, height: 60, rx: 6, "class": "c-battery" }, g);
    sv("path", { d: "M24 136 h20 M28 150 h12 M24 164 h20", "class": "c-plates" }, g);
    var bt = sv("text", { x: 62, y: 205, "class": "c-sub" }, g); bt.textContent = "power";
    var lamp = sv("svg", { x: 302, y: 155, width: 115, height: 154, viewBox: L.cast.lamp.vb, "aria-hidden": "true", "class": "c-lamp" }, g);
    lamp.innerHTML = L.cast.lamp.draw({ getAttribute: function (k) { return k === "data-on" ? String(lit) : k === "data-label" ? T(lit) : null; } });
  }

  function mountCircuit(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-circuit")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var got = readRuns(prog), rows = got.rows, bad = 0;
    got.bad.forEach(function (l) { bad++; L.report("circuit", "unexpected line in " + m.program + ": " + l); });
    ["and", "or", "not"].forEach(function (op) {
      var need = op === "not" ? 2 : 4;
      if (rows[op].length !== need) { bad++; L.report("circuit", SYM[op] + ": expected " + need + " rows in " + m.program); }
      rows[op].forEach(function (r) {
        if (JS[op](r.a, r.b) !== r.r) { bad++; L.report("circuit", SYM[op] + " row " + T(r.a) + " " + T(r.b) + " disagrees with " + m.program); }
        var want = needsB(op, r.a) ? "a b" : "a";
        if (r.asked.join(" ") !== want) { bad++; L.report("circuit", SYM[op] + " row " + T(r.a) + " " + T(r.b) + ": the run checked '" + r.asked.join(" ") + "', the drawing shows '" + want + "'"); }
      });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? "Does not match the real run of " + m.program : "Every lamp and every NOT CHECKED matches the real run of " + m.program; par.classList.toggle("bad", !!bad); }
    var svg = box.querySelector("svg.circ-svg"), expr = box.querySelector(".circ-expr"), chk = box.querySelector(".circ-checked"), tbl = box.querySelector(".circ-table"), cap = box.querySelector(".circ-cap"), live = box.querySelector("[aria-live]");
    var opBtns = box.querySelectorAll("[data-op]"), swA = box.querySelector('[data-sw="a"]'), swB = box.querySelector('[data-sw="b"]');
    var st = { op: m.start || "and", a: false, b: true };
    function lookup() {
      var list = rows[st.op];
      for (var i = 0; i < list.length; i++) if (list[i].a === st.a && (st.op === "not" || list[i].b === st.b)) return { i: i, r: list[i].r, asked: list[i].asked };
      return { i: -1, r: JS[st.op](st.a, st.b), asked: needsB(st.op, st.a) ? ["a", "b"] : ["a"] };
    }
    function render(announce) {
      var hit = lookup(), lit = hit.r, skipB = st.op !== "not" && hit.asked.length === 1;
      drawCircuit(svg, st.op, st.a, st.b, lit);
      for (var i = 0; i < opBtns.length; i++) opBtns[i].setAttribute("aria-pressed", String(opBtns[i].getAttribute("data-op") === st.op));
      swA.setAttribute("aria-pressed", String(st.a)); swA.innerHTML = "Switch <code>a</code>: <b>" + T(st.a) + "</b>";
      swB.setAttribute("aria-pressed", String(st.b)); swB.innerHTML = "Switch <code>b</code>: <b>" + T(st.b) + "</b>";
      swB.hidden = st.op === "not";
      var code = st.op === "not" ? "!" + T(st.a) : T(st.a) + " " + SYM[st.op] + " " + T(st.b);
      expr.innerHTML = '<code class="circ-code">' + esc(code) + '</code> <span class="circ-arrow" aria-hidden="true">→</span> <span class="circ-res ' + (lit ? "on" : "off") + '">' + T(lit) + (lit ? " · lamp ON" : " · lamp off") + "</span>";
      var why = st.op === "not" ? "Go checked <code>a</code> and flipped it."
        : skipB ? "Go checked only <code>a</code>. " + (st.op === "and" ? "<code>a</code> is <code>false</code>, so <code>&amp;&amp;</code> is already <code>false</code>" : "<code>a</code> is <code>true</code>, so <code>||</code> is already <code>true</code>") + ", whatever <code>b</code> holds. <b>Switch <code>b</code> is never looked at.</b>"
        : "Go checked <code>a</code>, then <code>b</code>: " + (st.op === "and" ? "<code>a</code> is <code>true</code>, so the answer depends on <code>b</code>." : "<code>a</code> is <code>false</code>, so the answer depends on <code>b</code>.");
      chk.innerHTML = why;
      var cols = st.op === "not" ? ["a", "!a"] : ["a", "b", "a " + SYM[st.op] + " b"];
      if (cap) cap.innerHTML = "Truth table for <code>" + esc(SYM[st.op]) + "</code>. Every row, and the sides Go checked, come from the real run of " + esc(m.program) + ".";
      tbl.innerHTML = "<caption class=\"sr-only\">Truth table for " + esc(SYM[st.op]) + "</caption><thead><tr>" + cols.map(function (c) { return "<th scope=\"col\"><code>" + esc(c) + "</code></th>"; }).join("") + "<th scope=\"col\">Go checked</th><th scope=\"col\" class=\"mk\"><span class=\"sr-only\">Current row</span></th></tr></thead><tbody>" +
        rows[st.op].map(function (r, i) { var now = i === hit.i; return '<tr class="' + (now ? "now" : "") + '"><td>' + T(r.a) + "</td>" + (st.op === "not" ? "" : "<td>" + T(r.b) + "</td>") + "<td><b>" + T(r.r) + "</b></td><td>" + (r.asked.length === 1 && st.op !== "not" ? "only a" : r.asked.join(" then ")) + "</td><td class=\"mk\">" + (now ? "◀ now" : "") + "</td></tr>"; }).join("") + "</tbody>";
      svg.setAttribute("aria-label", "Circuit for " + code + ": the lamp is " + (lit ? "on, so the result is true." : "off, so the result is false.") + (skipB ? " Switch b is fenced off: Go never checks it." : ""));
      if (announce && live) live.textContent = code + " gives " + T(lit) + ". The lamp is " + (lit ? "on." : "off.") + (skipB ? " Go never checked b." : "");
    }
    box.addEventListener("click", function (e) {
      var o = e.target.closest("[data-op]"), s = e.target.closest("[data-sw]");
      if (o) { st.op = o.getAttribute("data-op"); render(true); }
      else if (s) { st[s.getAttribute("data-sw")] = !st[s.getAttribute("data-sw")]; render(true); }
    });
    render(false);
    // The flowing current loops for ever: pause it while the circuit is off screen (comic.js does the same for svg.char).
    if ("IntersectionObserver" in root) new IntersectionObserver(function (en) { en.forEach(function (x) { svg.classList.toggle("idle-off", !x.isIntersecting); }); }, { rootMargin: "200px 0px" }).observe(svg);
  }

  P.comic.ext(function () {
    var c = document.querySelectorAll("[data-circuit]");
    for (var i = 0; i < c.length; i++) { try { mountCircuit(c[i]); } catch (e) { L.report("circuit", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
