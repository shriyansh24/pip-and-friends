/* JavaScript book, chapter 3 additions ("Tags and the Number Line"). Classic deferred script, loaded after
   comic-critters.js. Two jobs, both local to this page:

   1. [data-rounder]: the rounding lanes. Pick an input chip; the number x is marked on a number line, and four lanes
      below show where Math.floor, Math.trunc, Math.ceil and Math.round land, with an arrow from x to the result.
      Every value drawn is read from the captured run of the model's program (one output row per input:
      "x floor trunc ceil round"). The parity badge checks that the rows line up with the program's own `x = ...`
      lines and that recomputing each row in this browser gives the same numbers as the real Node run.
   2. [data-line-of="prog.js#N"]: a label inside a hand-drawn picture that quotes line N of a captured run. Each one is
      compared with the capture; a .parity[data-lines-badge] badge in the same panel reports the result. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch3.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function el(name, attrs, parent, text) {
    var e = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ---------- 1. the rounding lanes ---------- */
  var LANES = [
    { fn: "floor", label: "Math.floor", rule: "always down (to the left)", fill: "#DDE8FF", f: Math.floor },
    { fn: "trunc", label: "Math.trunc", rule: "chop off the decimals (toward 0)", fill: "#C9F2D9", f: Math.trunc },
    { fn: "ceil", label: "Math.ceil", rule: "always up (to the right)", fill: "#FFE1E1", f: Math.ceil },
    { fn: "round", label: "Math.round", rule: "nearest; a .5 goes up (right)", fill: "#FFD60A", f: Math.round }
  ];
  /* Each strip shows a zoomed window of the number line: from half a step below floor(x) to half a step above ceil(x),
     with a tick at every tenth, so even a 0.2 move is a clearly visible arrow. The lane names are HTML beside (wide)
     or above (narrow) each strip, so they stay crisp at any size. */
  var SW = 300, SX0 = 18, SSPAN = 264;
  function mountRounder(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-rounder")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var rows = prog.stdout.replace(/\n$/, "").split("\n").map(function (line) { return { line: line, v: line.trim().split(/\s+/).map(Number) }; });
    // parity: one row per `x = ...` line of the source, in order, and the browser agrees with Node on every value
    var srcXs = (prog.src.match(/\bx = (-?[0-9.]+);/g) || []).map(function (s) { return Number(s.replace(/[^0-9.\-]/g, "")); });
    var ok = rows.length === srcXs.length && rows.every(function (r, i) {
      return r.v.length === 5 && r.v[0] === srcXs[i] && LANES.every(function (ln, k) { return ln.f(r.v[0]) === r.v[k + 1]; });
    });
    if (!ok) L.report("rounder", "rows do not match the real run of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every lane matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }

    var chips = box.querySelector(".rd-chips"), stage = box.querySelector(".rd-stage"), out = box.querySelector(".rd-row"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    chips.innerHTML = '<span class="label">PICK x:</span>' + rows.map(function (r, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(String(r.v[0])) + "</code></button>"; }).join("");

    // the transcript lists every real row
    var tb = box.querySelector("table.transcript tbody");
    if (tb) tb.innerHTML = rows.map(function (r) { return "<tr>" + r.v.map(function (v) { return "<td><code>" + esc(String(v)) + "</code></td>"; }).join("") + "</tr>"; }).join("");

    // build the grid once: a head row (x and the zoomed axis), then one row per lane
    stage.innerHTML = '<div class="rd-grid" aria-hidden="true"><div class="rd-lab rd-xcell"></div><svg class="rd-strip rd-top" viewBox="0 0 ' + SW + ' 66"></svg>' +
      LANES.map(function (ln) { return '<div class="rd-lab"><code>' + esc(ln.label) + "</code><span>" + esc(ln.rule) + '</span></div><svg class="rd-strip" viewBox="0 0 ' + SW + ' 60"></svg>'; }).join("") + "</div>";
    var xcell = stage.querySelector(".rd-xcell"), top = stage.querySelector(".rd-top"), strips = stage.querySelectorAll(".rd-strip:not(.rd-top)");

    function draw(i, animate) {
      var r = rows[i].v, x = r[0];
      var lo = Math.floor(x) - 0.5, hi = Math.ceil(x) + 0.5;
      function px(v) { return SX0 + (v - lo) * SSPAN / (hi - lo); }
      function ticks(g, y, big) {
        for (var k = Math.round(lo * 10) + 1; k < Math.round(hi * 10); k++) {
          var whole = k % 10 === 0, v = k / 10;
          el("line", { x1: px(v), y1: y - (whole ? big : 4), x2: px(v), y2: y + (whole ? big : 4), "class": whole ? "rd-tick" : "rd-tick sm" }, g);
        }
      }
      // head row: the axis with its two whole numbers, x on it, and which way 0 lies
      xcell.innerHTML = "<b>x = " + esc(String(x)) + "</b><span>zoomed in: a tick every tenth</span>";
      top.innerHTML = "";
      el("line", { x1: 6, y1: 38, x2: SW - 6, y2: 38, "class": "rd-axis" }, top);
      ticks(top, 38, 11);
      [Math.floor(x), Math.ceil(x)].forEach(function (n) { el("text", { x: px(n), y: 18, "text-anchor": "middle", "class": "rd-num" }, top, String(n)); });
      if (lo > 0) el("text", { x: 6, y: 64, "class": "rd-zero" }, top, "← 0 is this way");
      if (hi < 0) el("text", { x: SW - 6, y: 64, "text-anchor": "end", "class": "rd-zero" }, top, "0 is this way →");
      el("circle", { cx: px(x), cy: 38, r: 8, "class": "rd-x" }, top);
      LANES.forEach(function (ln, k) {
        var g = strips[k], res = r[k + 1], xp = px(x), rp = px(res), y = 40;
        g.innerHTML = "";
        el("line", { x1: 6, y1: y, x2: SW - 6, y2: y, "class": "rd-lane-line" }, g);
        ticks(g, y, 9);
        el("line", { x1: xp, y1: 30, x2: xp, y2: 60, "class": "rd-guide" }, g);
        var dir = rp < xp ? -1 : 1, x2 = rp - dir * 1.5;
        var arrow = el("path", { d: "M" + xp + " " + y + " H" + x2 + " M" + (x2 - dir * 9) + " " + (y - 6) + " L" + x2 + " " + y + " L" + (x2 - dir * 9) + " " + (y + 6), "class": "rd-arrow" }, g);
        if (animate && L.motionOn() && arrow.getTotalLength) {
          var len = arrow.getTotalLength();
          arrow.style.strokeDasharray = len + " " + len; arrow.style.strokeDashoffset = String(len);
          arrow.getBoundingClientRect(); arrow.style.transition = "stroke-dashoffset 200ms cubic-bezier(0.23, 1, 0.32, 1) " + (k * 40) + "ms";   // --ease-out; last lane done by 320ms arrow.style.strokeDashoffset = "0";
        }
        el("circle", { cx: xp, cy: y, r: 5, "class": "rd-x" }, g);
        el("rect", { x: rp - 19, y: 2, width: 38, height: 24, rx: 7, fill: ln.fill, "class": "rd-pill" }, g);
        el("text", { x: rp, y: 20, "text-anchor": "middle", "class": "rd-res" }, g, String(res));
      });
      out.innerHTML = '<span class="rd-k">Real output row:</span> <code>' + esc(rows[i].line) + "</code>";
      note.innerHTML = noteFor(r);
      var bs = chips.querySelectorAll(".path-btn"); for (var b = 0; b < bs.length; b++) bs[b].setAttribute("aria-pressed", String(b === i));
    }
    function noteFor(r) {
      var x = r[0], s = "<b>x = " + esc(String(x)) + "</b>: floor gives <b>" + r[1] + "</b>, trunc <b>" + r[2] + "</b>, ceil <b>" + r[3] + "</b>, round <b>" + r[4] + "</b>.";
      if (x < 0 && r[1] !== r[2]) s += " For a negative number, <code>floor</code> (down, to the left) and <code>trunc</code> (toward 0, to the right) disagree.";
      else if (x > 0) s += " For a positive number, <code>floor</code> and <code>trunc</code> agree: down and toward 0 are the same direction.";
      if (Math.abs(x % 1) === 0.5) s += " Exactly halfway: <code>Math.round</code> picks the neighbour to the right" + (x < 0 ? ", which for a negative number is the one <em>closer to 0</em>." : ".");
      return s;
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn"); if (!b) return;
      var i = Number(b.getAttribute("data-i")); draw(i, true);
      if (live) { var r = rows[i].v; live.textContent = "x = " + r[0] + ". floor " + r[1] + ", trunc " + r[2] + ", ceil " + r[3] + ", round " + r[4] + "."; }
    });
    draw(Number(m.start || 0), false);
  }

  /* ---------- 2. labels in pictures that quote a captured line ---------- */
  function checkLines() {
    var boxes = new Set();
    Array.prototype.forEach.call(document.querySelectorAll("[data-line-of]"), function (e) { boxes.add(e.closest("section") || document.body); });
    boxes.forEach(function (box) {
      var bad = 0, n = 0;
      Array.prototype.forEach.call(box.querySelectorAll("[data-line-of]"), function (e) {
        var spec = e.getAttribute("data-line-of").split("#"), prog = L.program(spec[0]); n++;
        var line = prog ? prog.stdout.split("\n")[Number(spec[1]) - 1] : null;
        if (line == null || line !== e.textContent.trim()) { bad++; L.report("picture-label", spec.join("#") + " says '" + e.textContent.trim() + "' but the real run printed '" + line + "'"); }
      });
      var par = box.querySelector(".parity[data-lines-badge]");
      if (par) { par.textContent = bad ? bad + " label(s) do not match the real run" : "All " + n + " numbers in the picture match the real run"; par.classList.toggle("bad", !!bad); }
    });
  }

  P.comic.ext(function () {
    Array.prototype.forEach.call(document.querySelectorAll("[data-rounder]"), function (b) { try { mountRounder(b); } catch (e) { L.report("rounder", e.message); } });
    checkLines();
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
