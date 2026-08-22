/* Chapter 26 extension: "Preflight Checklist".
   Two new props drawn in code in Pip's house style, and two small widgets that read the captured runs.
     checklist  NEW prop: a clipboard with up to 6 checklist lines. data-marks = one letter per line: v (ticked),
                x (crossed), o (not checked yet). data-label = the heading on the clip (<= 10 chars, default PREFLIGHT); hidden below 12px (.lbl-deco).
     blackbox   NEW prop: the flight recorder (logging): an orange box with a level dial. data-label = the level the dial
                points at (DEBUG, INFO, WARNING, ERROR, CRITICAL; default WARNING).
     [data-checkboard="prog.py"]  builds a clipboard checklist from a real `pytest -qq -rA` run: one line per test, in
                the order pytest ran them (merged from the progress marks and the PASSED/FAILED/ERROR summary lines).
                data-cols="a,b" splits parametrize ids such as [5-A] into table columns. Parity badge: the number of
                summary lines must equal the number of progress marks.
     [data-dial="model-id"]  the logging dial: pick where the recorder's dial points and see which messages get written.
                Model { program, messages: [{level, text}] }. The program prints "dial at LEVEL" and then the lines its
                logger wrote; the widget works out the expected lines (level number >= dial number) and checks them
                against that section of the real run. Parity badge; keyboard buttons; text version table.
   Every state is told by a word or a mark as well as colour. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch26.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  /* ---------------- checklist: a clipboard of ticks and crosses ---------------- */
  C.checklist = { vb: "0 0 170 210", draw: function (el) {
    var marks = (el.getAttribute("data-marks") || "vvxo").slice(0, 6), label = (el.getAttribute("data-label") || "PREFLIGHT").slice(0, 10);
    var out = '<g class="bob">' +
      '<rect x="14" y="20" width="142" height="182" rx="12" fill="#B87A45"' + S(4) + "/>" +
      '<rect x="26" y="40" width="118" height="152" rx="4" fill="#FFFFFF"' + S(3) + "/>" +
      '<rect x="52" y="8" width="66" height="30" rx="8" fill="#C9CED6"' + S(4) + "/>" +
      '<circle cx="85" cy="18" r="5" fill="#FFFFFF"' + S(3) + "/>" +
      '<text class="lbl-deco" x="85" y="62" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="' + (label.length > 8 ? 15 : 18) + '" letter-spacing="1" fill="' + INK + '">' + esc(label) + "</text>";
    var step = Math.min(24, 118 / Math.max(1, marks.length));
    for (var i = 0; i < marks.length; i++) {
      var y = 76 + i * step, m = marks.charAt(i);
      out += '<rect x="34" y="' + y + '" width="16" height="16" rx="2" fill="' + (m === "x" ? "#FFE1E1" : m === "v" ? "#C9F2D9" : "#FFFFFF") + '"' + S(2.5) + "/>" +
        '<path d="M56 ' + (y + 9) + " h" + (50 + (i * 17) % 28) + '" fill="none"' + S(2.5) + "/>";
      if (m === "v") out += '<path d="M36 ' + (y + 8) + " l5 6 l11 -14" + '" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
      if (m === "x") out += '<path d="M37 ' + (y + 3) + " l10 10 M47 " + (y + 3) + ' l-10 10" fill="none" stroke="#B00020" stroke-width="3.5" stroke-linecap="round"/>';
    }
    return out + "</g>";
  } };

  /* ---------------- blackbox: the flight recorder with a level dial ---------------- */
  var LEVELS = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"], NUM = { DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40, CRITICAL: 50 };
  function dialSvg(level) {
    var k = Math.max(0, LEVELS.indexOf(level)), ang = -150 + k * 75, cx = 95, cy = 112, r = 34, out = "";
    for (var i = 0; i < 5; i++) {
      var a = (-150 + i * 75 - 90) * Math.PI / 180;
      out += '<path d="M' + (cx + Math.cos(a) * (r - 2)).toFixed(1) + " " + (cy + Math.sin(a) * (r - 2)).toFixed(1) + " L" + (cx + Math.cos(a) * (r + 6)).toFixed(1) + " " + (cy + Math.sin(a) * (r + 6)).toFixed(1) + '" fill="none"' + S(3) + "/>";
    }
    out += '<g style="transform-origin:' + cx + "px " + cy + "px;transform:rotate(" + ang + 'deg)"><path d="M' + cx + " " + (cy + 6) + " L" + cx + " " + (cy - r + 4) + '" fill="none" stroke="#B00020" stroke-width="5" stroke-linecap="round"/></g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + INK + '"/>';
    return out;
  }
  C.blackbox = { vb: "0 0 190 200", draw: function (el) {
    var level = (el.getAttribute("data-label") || "WARNING").toUpperCase();
    return '<g class="bob">' +
      '<rect x="14" y="30" width="162" height="156" rx="16" fill="#FF9F43"' + S(4) + "/>" +
      '<path d="M14 62 h162 M14 166 h162" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<rect x="60" y="8" width="70" height="26" rx="8" fill="#C9CED6"' + S(4) + "/>" +
      '<text class="lbl-deco" x="95" y="54" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="17" letter-spacing="1" fill="' + INK + '">FLIGHT RECORDER</text>' +
      '<circle cx="95" cy="112" r="44" fill="#FFFFFF"' + S(4) + "/>" + dialSvg(level) +
      '<rect x="46" y="170" width="98" height="24" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
      '<text class="lbl-deco" x="95" y="188" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (level.length > 7 ? 16 : 18) + '" fill="' + INK + '">' + esc(level) + "</text>" +
      '<g class="eyes"><circle cx="34" cy="86" r="4" fill="' + INK + '"/><circle cx="156" cy="86" r="4" fill="' + INK + '"/></g>' +
      "</g>";
  } };

  /* ---------------- checkboard: a clipboard built from a real pytest -rA run ---------------- */
  function initCheckboards() {
    var els = document.querySelectorAll("[data-checkboard]");
    for (var i = 0; i < els.length; i++) { try { mountCheckboard(els[i]); } catch (e) { L.report("checkboard", e.message); } }
  }
  function mountCheckboard(box) {
    var name = box.getAttribute("data-checkboard"), p = L.program(name);
    if (!p) { L.report("checkboard", "no capture for " + name); return; }
    var text = p.stdout, lines = text.split("\n");
    var marks = (lines[0].match(/^[.FEsx]+/) || [""])[0].split("");
    var groups = { ".": [], F: [], E: [] }, word = { PASSED: ".", FAILED: "F", ERROR: "E" };
    lines.forEach(function (l) {
      var m = l.match(/^(PASSED|FAILED|ERROR) ([^:\s]+)::(\S+?)(?: - (.*))?$/);
      if (m) groups[word[m[1]]].push({ status: m[1], test: m[3], why: m[4] || "" });
    });
    var rows = [], ok = true, used = { ".": 0, F: 0, E: 0 };
    marks.forEach(function (mk) { var g = groups[mk]; if (!g || !g[used[mk]]) { ok = false; return; } rows.push(g[used[mk]++]); });
    var total = groups["."].length + groups.F.length + groups.E.length;
    if (total !== rows.length || !rows.length) ok = false;
    if (!ok) L.report("checkboard", name + ": summary lines do not match the progress marks");
    var cols = (box.getAttribute("data-cols") || "").split(",").filter(Boolean);
    var head = '<p class="ckb-head"><span>CHECKLIST</span><code>' + esc(name) + "</code></p>";
    var body;
    if (cols.length) {
      body = '<table class="ckb-grid"><thead><tr><th>#</th>' + cols.map(function (c) { return "<th><code>" + esc(c) + "</code></th>"; }).join("") + "<th>result</th></tr></thead><tbody>" +
        rows.map(function (r, k) {
          var id = (r.test.match(/\[(.*)\]$/) || ["", ""])[1], parts = id.split("-");
          return '<tr class="' + (r.status === "PASSED" ? "pass" : "fail") + '"><td>' + (k + 1) + "</td>" + cols.map(function (c, ci) { return "<td><code>" + esc(parts[ci] || "") + "</code></td>"; }).join("") +
            '<td class="res">' + (r.status === "PASSED" ? '<span class="tick" aria-hidden="true">✓</span> passed' : '<span class="cross" aria-hidden="true">✗</span> ' + r.status.toLowerCase()) + "</td></tr>";
        }).join("") + "</tbody></table>";
    } else {
      body = '<ol class="ckb-list">' + rows.map(function (r) {
        return '<li class="' + (r.status === "PASSED" ? "pass" : "fail") + '"><span class="box" aria-hidden="true">' + (r.status === "PASSED" ? "✓" : "✗") + "</span><code>" + esc(r.test) + "</code><b>" + r.status.toLowerCase() + "</b></li>";
      }).join("") + "</ol>";
    }
    var passed = rows.filter(function (r) { return r.status === "PASSED"; }).length;
    box.innerHTML = head + body + '<p class="ckb-foot"><span class="parity' + (ok ? "" : " bad") + '">' + (ok ? "Built from the real pytest run: " + rows.length + " checks, " + passed + " ticked" : "Does not match the real run") + "</span></p>";
  }

  /* ---------------- dial: which log messages does the recorder write? ---------------- */
  function initDials() {
    var els = document.querySelectorAll("[data-dial]");
    for (var i = 0; i < els.length; i++) { try { mountDial(els[i]); } catch (e) { L.report("dial", e.message); } }
  }
  function mountDial(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-dial")).textContent), p = L.program(m.program);
    if (!p) { L.report("dial", "no capture for " + m.program); return; }
    var sections = {}, cur = null;
    p.stdout.replace(/\n$/, "").split("\n").forEach(function (l) {
      var h = l.match(/^dial at (\w+)$/);
      if (h) { cur = h[1]; sections[cur] = []; } else if (cur) sections[cur].push(l.trim());
    });
    function expected(dial) { return m.messages.filter(function (x) { return NUM[x.level] >= NUM[dial]; }).map(function (x) { return x.level + " " + x.text; }); }
    var bad = LEVELS.filter(function (d) { return !sections[d] || sections[d].join("\n") !== expected(d).join("\n"); });
    if (bad.length) L.report("dial", "dial positions not matching the real run: " + bad.join(", "));
    box.querySelector(".chips").innerHTML = '<span class="label">SET THE DIAL:</span>' + LEVELS.map(function (d, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '">' + d + "</button>"; }).join("");
    var par = box.querySelector(".parity");
    par.textContent = bad.length ? bad.length + " dial position(s) do not match the real run" : "All 5 dial positions match the real run of " + m.program;
    par.classList.toggle("bad", !!bad.length);
    var art = box.querySelector(".dial-art"), ins = box.querySelector(".dial-in"), outs = box.querySelector(".dial-out pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = LEVELS.map(function (d) { return "<tr><td>" + d + " (" + NUM[d] + ")</td><td>" + m.messages.map(function (x) { return x.level + (NUM[x.level] >= NUM[d] ? " written" : " filtered"); }).join(", ") + "</td><td><code>" + esc((sections[d] || []).join(" / ") || "(nothing)") + "</code></td></tr>"; }).join("");
    function show(i, announce) {
      var d = LEVELS[i], bs = box.querySelectorAll(".chips .path-btn");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      art.setAttribute("data-label", d); L.drawCast(art.parentNode); if (L.fitLabels) L.fitLabels();
      ins.innerHTML = m.messages.map(function (x) {
        var pass = NUM[x.level] >= NUM[d];
        return '<li class="' + (pass ? "pass" : "drop") + '"><b>log.' + x.level.toLowerCase() + "()</b> <span>" + esc(x.text) + '</span><em>' + (pass ? "✓ written" : "✗ filtered out") + "</em></li>";
      }).join("");
      var got = sections[d] || [];
      outs.textContent = got.length ? got.join("\n") : "(nothing)";
      var n = got.length;
      note.innerHTML = "Dial at <b>" + d + "</b> (level number " + NUM[d] + "): the recorder writes every message whose level number is " + NUM[d] + " or more. " + n + " of " + m.messages.length + " messages get through.";
      if (live && announce) live.textContent = "Dial at " + d + ". " + n + " of " + m.messages.length + " messages written: " + (got.join("; ") || "none") + ".";
    }
    box.querySelector(".chips").addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    show(m.start != null ? m.start : 2, false);
  }

  /* ---------------- the pdb walk-through's text version: only what each step adds ---------------- */
  /* The engine's walker transcript repeats the whole screen in every row; for a pdb session with a long traceback that
     buries what each command printed. Rewrite the Screen column of [data-walk-new-lines] walkers to show only the lines
     added at that step (the full session is in the "whole session in one terminal" box under it). */
  function trimWalkTranscripts() {
    var boxes = document.querySelectorAll("[data-walk-new-lines]");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i], m = JSON.parse(document.getElementById(box.getAttribute("data-walk")).textContent);
      var th = box.querySelectorAll(".transcript thead th"), rows = box.querySelectorAll(".transcript tbody tr");
      if (th.length) th[th.length - 1].textContent = "New on the screen";
      if (rows.length !== m.steps.length) { L.report("walk-new-lines", "transcript rows do not match the walk's steps"); continue; }
      var prev = [];
      m.steps.forEach(function (st, k) {
        var o = st.output, same = prev.every(function (l, n) { return o[n] === l; });
        if (!same) L.report("walk-new-lines", "step " + (k + 1) + " does not extend the previous screen");
        var added = o.slice(prev.length), cell = rows[k].lastElementChild;
        cell.setAttribute("data-h", "New on the screen");
        cell.innerHTML = added.length ? "<code>" + esc(added.join(" / ")) + "</code>" : "(no new output)";
        prev = o;
      });
    }
  }

  P.comic.ext(function () { initCheckboards(); initDials(); trimWalkTranscripts(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
