/* C++ book, chapter 20 extension: "Gift Boxes, Clock Faces".
   Adds two steppers. Neither invents output: each step shows the first N lines of the captured stdout of its program
   (data/cpp-ch20.js), and every picture is drawn from the text of those real lines. A parity badge says so.
     - [data-clock="MODEL_ID"]  the unsigned clock face. A dial for std::uint8_t (0 at the top, 255 just before it),
       with a hand pointing at the value printed on the newest screen line ("tick N: V"). Earlier values stay as
       numbered dots, so wrapping past the top is visible.
       Model: { "program": "clock_u8.cpp", "steps": [ { "line": 8, "out": 1, "note": "html" }, ... ] }
     - [data-bits="MODEL_ID"]   the bit row. Eight switch tiles (bit 7 on the left, bit 0 on the right) showing the
       8-digit binary number at the end of the newest screen line that has one. Tiles that changed since the previous
       picture get a dashed border and the word "changed"; a step may name "test": B to mark bit B as "tested".
       Model: { "program": "flags_steps.cpp", "steps": [ { "line": 8, "out": 1, "note": "html", "test": 6 }, ... ] }
   Shared step fields: "line" = the next source line to run (highlighted; null at the end), "out" = how many lines of
   the real output are on the screen after this step. Checks: "out" never decreases, never exceeds the real line count,
   and the last step shows the whole real output. Every control is a real button with the engine's keyboard keys
   (via L.runner), the newest step is announced in an aria-live line, and a text version lists every step.
   Every step keeps the height of the tallest one (L.runner reserve), and the highlighted line is li.now, which the
   engine scrolls into view above the sticky controls on phones. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch20.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  var BTNS = '<div class="controls"><div class="btns">' +
    '<button type="button" class="btn" data-act="prev">Back <kbd>←</kbd></button>' +
    '<button type="button" class="btn btn-go" data-act="next">Next step <kbd>→</kbd></button>' +
    '<button type="button" class="btn" data-act="play" aria-pressed="false"><span>Play</span> <kbd>Space</kbd></button>' +
    '<button type="button" class="btn" data-act="reset">Reset <kbd>R</kbd></button>' +
    '</div><span class="parity"></span></div>';

  /* Builds the shared frame (code, screen, stage, narration, controls, text version) and checks the model. */
  function frame(box, kind, stageLabel, headCols) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-" + kind)).textContent);
    var prog = L.program(m.program);
    if (!prog) { L.report("cpp-ch20", "no capture for " + m.program); return null; }
    var src = prog.src.replace(/\n$/, "").split("\n");
    var real = L.shown(prog).replace(/\n$/, "").split("\n");
    box.insertAdjacentHTML("beforeend",
      '<div class="x20-split"><ol class="tr-code"></ol><div class="screen"><p class="label">SCREEN</p><pre></pre></div></div>' +
      '<div class="x20-stage" role="img" aria-label="' + esc(stageLabel) + '"></div><p class="narration"></p>' + BTNS +
      '<p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every step</summary><table class="transcript"><thead><tr><th>Step</th><th>Next line</th>' +
      headCols + '<th>What happens</th><th>Screen</th></tr></thead><tbody></tbody></table></details>');
    var code = box.querySelector(".tr-code");
    code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    if (L.hangLines) L.hangLines(code.querySelectorAll("li"));   // wrapped lines continue under their first character (AUTHORING "Wrapped code lines")
    var ok = true, why = "", prev = 0;
    m.steps.forEach(function (s, i) {
      if (typeof s.out !== "number" || s.out < prev || s.out > real.length) { ok = false; why = "screen of step " + (i + 1); }
      prev = s.out;
    });
    if (prev !== real.length) { ok = false; why = "last step does not show the whole run"; }
    return { m: m, prog: prog, src: src, real: real, ok: ok, why: why, code: code };
  }
  function finish(box, f, words, extraCells, draw) {
    var par = box.querySelector(".parity");
    par.textContent = f.ok ? "Drawn from the real run of " + f.m.program : "Does not match the real run of " + f.m.program;
    par.classList.toggle("bad", !f.ok);
    if (!f.ok) L.report("cpp-ch20", "parity failed for " + f.m.program + ": " + f.why);
    var lis = f.code.querySelectorAll("li"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"),
      live = box.querySelector("[aria-live]"), stage = box.querySelector(".x20-stage"), prevLen = 0;
    box.querySelector(".transcript tbody").innerHTML = f.m.steps.map(function (s, i) {
      var scr = f.real.slice(0, s.out);
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(f.src[s.line - 1].trim()) + "</code>" : "finished") + "</td>" +
        extraCells(i) + "<td>" + s.note + "</td><td>" + (scr.length ? "<code>" + scr.map(esc).join("<br>") + "</code>" : "(empty)") + "</td></tr>";
    }).join("");
    function render(st, announce) {
      var s = f.m.steps[st.step];
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      stage.innerHTML = draw(st.step);
      stage.setAttribute("aria-label", words(st.step));
      var o = f.real.slice(0, s.out);
      out.innerHTML = o.length ? o.map(function (l, i) { return '<span class="' + (announce && i >= prevLen ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + f.m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + words(st.step) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    // reserve the tallest step for the code, the screen, the picture and the narration, so Next never moves under the finger
    var rn = L.runner(box, f.m.steps.length, render, { reserve: ".narration, .screen pre, .tr-code, .x20-stage" });
    rn.reset(f.m.steps.length);
  }

  /* ---------------- the clock face ---------------- */
  var CX = 170, CY = 168, R = 118;
  function pt(v, r) { var a = (v / 256) * 2 * Math.PI; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; }
  function f1(n) { return Math.round(n * 10) / 10; }
  function mountClock(box) {
    var f = frame(box, "clock", "Clock face for an 8-bit unsigned number", "<th>Hand points at</th>");
    if (!f) return;
    var vals = f.real.map(function (l) { var mm = /:\s*(\d+)$/.exec(l); return mm ? Number(mm[1]) : null; });
    vals.forEach(function (v, i) { if (v === null || v > 255 || (v > 5 && v < 250)) { f.ok = false; f.why = "line " + (i + 1) + " has no value in 250..255 or 0..5"; } });
    function seen(step) { return vals.slice(0, f.m.steps[step].out); }
    function words(step) {
      var v = seen(step);
      return v.length ? "Clock face from 0 to 255. The hand points at " + v[v.length - 1] + (v.length > 1 ? ". Earlier values: " + v.slice(0, -1).join(", ") : "") : "Clock face from 0 to 255, no value yet";
    }
    var dial = (function () {
      var s = '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="#FFF6CC" stroke="#111" stroke-width="5"/>';
      for (var t = 0; t < 256; t += 16) {
        var a = pt(t, R - 4), b = pt(t, t % 64 === 0 ? R - 22 : R - 14);
        s += '<path d="M' + f1(a[0]) + " " + f1(a[1]) + " L" + f1(b[0]) + " " + f1(b[1]) + '" stroke="#111" stroke-width="' + (t % 64 === 0 ? 4 : 2.5) + '"/>';
      }
      [32, 64, 96, 128, 160, 192, 224].forEach(function (t) {
        var p = pt(t, R + 22);
        s += '<text x="' + f1(p[0]) + '" y="' + f1(p[1] + 6) + '" text-anchor="middle" class="x20-num">' + t + "</text>";
      });
      s += '<text x="' + (CX + 6) + '" y="' + (CY - R - 14) + '" text-anchor="start" class="x20-num">0</text>' +
        '<text x="' + (CX - 6) + '" y="' + (CY - R - 14) + '" text-anchor="end" class="x20-num">255</text>' +
        '<path d="M' + CX + " " + (CY - R - 8) + " V" + (CY - R + 26) + '" stroke="#111" stroke-width="3" stroke-dasharray="5 4"/>';
      return s;
    })();
    function draw(step) {
      var v = seen(step), s = '<svg viewBox="0 0 340 340" class="x20-clock" aria-hidden="true">' + dial;
      if (v.length) {
        var cur = v[v.length - 1], h = pt(cur, R - 30);
        s += '<path d="M' + CX + " " + CY + " L" + f1(h[0]) + " " + f1(h[1]) + '" stroke="#111" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M' + CX + " " + CY + " L" + f1(h[0]) + " " + f1(h[1]) + '" stroke="#FF5A4E" stroke-width="4" stroke-linecap="round"/>' +
          '<circle cx="' + CX + '" cy="' + CY + '" r="10" fill="#111"/>' +
          '<rect x="' + (CX - 52) + '" y="' + (CY + 30) + '" width="104" height="40" rx="8" fill="#FFFFFF" stroke="#111" stroke-width="3"/>' +
          '<text x="' + CX + '" y="' + (CY + 58) + '" text-anchor="middle" class="x20-big">' + cur + "</text>";
      } else {
        s += '<circle cx="' + CX + '" cy="' + CY + '" r="10" fill="#111"/>';
      }
      s += "</svg>";
      /* the magnifier: the 12 marks around the top of the clock, where every value of this run sits */
      var cells = [], k;
      for (k = 250; k < 256; k++) cells.push(k);
      for (k = 0; k < 6; k++) cells.push(k);
      s += '<p class="x20-cap">Magnified: the top of the clock</p><ol class="x20-strip">';
      cells.forEach(function (c, i) {
        var now = v.length && v[v.length - 1] === c, was = !now && v.indexOf(c) >= 0;
        s += '<li class="x20-cell' + (now ? " now" : was ? " was" : "") + (i === 6 ? " after-wrap" : "") + '"><span class="x20-cv">' + c + '</span><span class="x20-cm">' + (now ? "▲" : was ? "✓" : "&nbsp;") + "</span></li>";
      });
      return s + '</ol><p class="x20-legend">▲ yellow: the hand now. ✓ dashed: visited earlier. After 255 comes 0: that is the wrap point.</p>';
    }
    finish(box, f, words, function (i) { var v = seen(i); return "<td>" + (v.length ? v[v.length - 1] : "(no hand yet)") + "</td>"; }, draw);
  }

  /* ---------------- the bit row ---------------- */
  function mountBits(box) {
    var f = frame(box, "bits", "A row of eight bits", "<th>Bits (7 to 0)</th>");
    if (!f) return;
    var rows = f.real.map(function (l) { var mm = /^(.*?):?\s+([01]{8})$/.exec(l); return mm ? { label: mm[1], bits: mm[2] } : null; });
    function at(step) {          // the newest bit row on screen at this step, and the one before it
      var n = f.m.steps[step].out, cur = null, before = null, idx = -1;
      for (var i = 0; i < n; i++) if (rows[i]) { before = cur; cur = rows[i]; idx = i; }
      return { cur: cur, before: before, fresh: idx === n - 1 };
    }
    if (!at(f.m.steps.length - 1).cur) { f.ok = false; f.why = "no 8-bit line in the run"; }
    function words(step) {
      var r = at(step).cur, t = f.m.steps[step].test;
      if (!r) return "Eight bits, nothing shown yet";
      var on = [];
      for (var b = 7; b >= 0; b--) if (r.bits[7 - b] === "1") on.push(b);
      return "Bits " + r.bits + " (" + esc(r.label) + "), value " + parseInt(r.bits, 2) + ". Bits on: " + (on.length ? on.join(", ") : "none") + (typeof t === "number" ? ". Bit " + t + " is being tested" : "");
    }
    function draw(step) {
      var a = at(step), r = a.cur, t = f.m.steps[step].test;
      if (!r) return '<p class="x20-empty">No bits on the screen yet.</p>';
      var s = '<p class="x20-cap"><b>' + esc(r.label || "bits") + "</b> · value " + parseInt(r.bits, 2) + " · hex 0x" + parseInt(r.bits, 2).toString(16) + '</p><ol class="x20-bits">';
      for (var b = 7; b >= 0; b--) {
        var c = r.bits[7 - b], changed = !!(a.fresh && a.before && a.before.bits[7 - b] !== c);
        var tested = t === b;
        s += '<li class="x20-bit' + (c === "1" ? " on" : "") + (changed ? " changed" : "") + (tested ? " tested" : "") + '">' +
          '<span class="x20-pos">bit ' + b + '</span><span class="x20-val">' + c + '</span><span class="x20-word">' + (c === "1" ? "ON" : "off") + "</span>" +
          '<span class="x20-mark">' + (tested ? '<span class="g">◉</span> <span class="w">tested</span>' : changed ? '<span class="g">★</span> <span class="w">changed</span>' : "&nbsp;") + "</span>" +
          '<span class="x20-w">' + (1 << b) + "</span></li>";
      }
      return s + '</ol><p class="x20-legend">★ dashed border: changed by this line. ◉ double outline: the bit being tested. The small number under each switch is what that bit is worth (1 &lt;&lt; position).</p>';
    }
    finish(box, f, words, function (i) { var r = at(i).cur; return "<td>" + (r ? "<code>" + r.bits + "</code>" : "(none yet)") + "</td>"; }, draw);
  }

  P.comic.ext(function () {
    var c = document.querySelectorAll("[data-clock]"), b = document.querySelectorAll("[data-bits]"), i;
    for (i = 0; i < c.length; i++) { try { mountClock(c[i]); } catch (e) { L.report("cpp-ch20", e.message); } }
    for (i = 0; i < b.length; i++) { try { mountBits(b[i]); } catch (e) { L.report("cpp-ch20", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
