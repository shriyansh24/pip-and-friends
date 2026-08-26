/* Chapter 9 extension: "When Things Go Wrong".
   The error critters (jigsaw, taster, tumble, jangles, zilch, pockets, digger, sneak, duck) come from the engine's
   comic-critters.js. This file adds
   (1) the traceback reader [data-tbread]: steps through a REAL captured traceback from the bottom up,
       next to the call stack it describes. Every highlighted line must be found in the captured stderr,
       or the parity badge turns bad and an error is reported;
   (2) [data-ver] tags naming the Python version of each run (beside the engine's data-alt terminals). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch9.js loaded before the engine"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------------- version tags (the second run itself is the engine's data-alt terminal) ---------------- */
  function initAlt() {
    var meta = (P.data && P.data.captures && P.data.captures.meta) || {};
    var tags = document.querySelectorAll("[data-ver]");
    for (var j = 0; j < tags.length; j++) {
      var which = tags[j].getAttribute("data-ver"), prog = tags[j].getAttribute("data-prog"), p = prog ? L.program(prog) : null;
      if (which === "alt") tags[j].textContent = p && p.alt ? p.alt.version : "?";
      else tags[j].textContent = meta.primary || "?";
    }
  }

  /* ---------------- traceback reader ---------------- */
  /* Model: { program, steps: [{ hl: ["exact text of a stderr line, or a unique part of it", ...], note }] }.
     Highlighting a 'File "..."' line also lights the code and caret lines printed under it. */
  var FILE_RE = /^\s*File "[^"]+", line (\d+), in (.+)$/;
  function initReaders() {
    var boxes = document.querySelectorAll("[data-tbread]");
    for (var i = 0; i < boxes.length; i++) { try { mountReader(boxes[i]); } catch (e) { L.report("tbread", e.message); } }
  }
  function mountReader(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-tbread")).textContent);
    var q = L.program(m.program); if (!q) return;
    var meta = P.data.captures.meta, dir = String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var outLines = q.stdout ? q.stdout.replace(/\n$/, "").split("\n") : [];
    var err = q.stderr.replace(/\n$/, "").split("\n");
    var frames = [];
    err.forEach(function (l, i) { var f = FILE_RE.exec(l); if (f) frames.push({ i: i, line: Number(f[1]), fn: f[2], code: (err[i + 1] || "").trim() }); });
    function group(i) { // a File line brings its code line and caret line with it
      var g = [i];
      if (FILE_RE.test(err[i])) for (var k = i + 1; k < err.length && /^\s/.test(err[k]) && !FILE_RE.test(err[k]); k++) g.push(k);
      return g;
    }
    var ok = true;
    m.steps.forEach(function (s, si) {
      s._lit = [];
      (s.hl || []).forEach(function (h) {
        var at = -1;
        for (var i = 0; i < err.length; i++) if (err[i].indexOf(h) >= 0) { at = i; break; }
        if (at < 0) { ok = false; L.report("tbread:" + m.program, "step " + (si + 1) + " highlights text that is not in the real traceback: " + h); return; }
        s._lit = s._lit.concat(group(at));
      });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every highlighted line is from the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    var term = box.querySelector(".tb-term"), stack = box.querySelector(".tb-stack"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var head = '<span class="prompt">you@laptop:' + esc(dir) + "$ </span>python3 " + esc(m.program) + "\n" + (outLines.length ? esc(outLines.join("\n")) + "\n" : "");
    stack.innerHTML = frames.map(function (f, k) {
      var tag = frames.length > 1 ? (k === 0 ? "oldest call: it all started here" : k === frames.length - 1 ? "newest call: it broke here" : "called next") : "the only frame";
      return '<li data-fi="' + f.i + '"><span class="tb-tag">' + esc(tag) + '</span><b>in ' + esc(f.fn) + "</b> · line " + f.line + "<code>" + esc(f.code) + "</code></li>";
    }).join("");
    var lis = stack.querySelectorAll("li");
    function render(st, announce) {
      var s = m.steps[st.step];
      term.innerHTML = head + err.map(function (l, i) { return '<span class="err tb-l' + (s._lit.indexOf(i) >= 0 ? " hl" : "") + '">' + esc(l) + "</span>"; }).join("\n");
      for (var k = 0; k < lis.length; k++) {
        var on = s._lit.indexOf(Number(lis[k].getAttribute("data-fi"))) >= 0;
        lis[k].classList.toggle("on", on);
      }
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". Highlighted: " + s._lit.map(function (i) { return err[i].trim(); }).join(" / ") + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s._lit.map(function (j) { return err[j].trim(); }).join(" / ")) + "</code></td><td>" + s.note + "</td></tr>"; }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () { initAlt(); initReaders(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
