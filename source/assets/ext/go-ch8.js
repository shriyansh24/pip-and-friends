/* Go book, chapter 8 ("Receipts and Footprints") additions. Classic deferred script; loads after comic-cast.js and
   comic-critters.js.
   1. data-char="detective": INSPECTOR PELL, an original detective (brown fedora, tan trench coat, magnifying glass)
      who reads panic reports. Attributes:
        data-mood = "normal" (default) | "happy" | "focus" | "surprised"
        data-prop = "glass" (default: a magnifying glass) | "notebook" (her case notebook)
      Like every character the drawing is aria-hidden; pages add an .sr-only sentence.
   2. [data-lens]: the panic lens. Steps through a REAL captured panic report, one clue at a time, next to the source
      (the line each highlighted footprint points at is lit) and the trail of footprints (one card per stack frame,
      parsed from the captured stderr, newest call first, exactly as Go prints them). Every highlighted text must be
      found in the captured stderr, and the report must have Go's panic shape (panic: line, goroutine 1 [running]:,
      at least one frame, exit status 2), or the parity badge turns bad and L.report() fires.
      Model: { "program": "trail.go", "steps": [ { "hl": ["text in stderr", ...], "tag": "CRIME", "note": "HTML" } ] }
      Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch8.js loaded before comic.js"); return; }
  var esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------- 1. Inspector Pell ---------- */
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function limb(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(6) + "/>"; }
  function hand(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#C8955E"' + S(3) + "/>"; }
  L.cast.detective = { vb: "0 0 180 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", prop = el.getAttribute("data-prop") || "glass";
    var eyes = mood === "happy" ? '<path d="M68 76 q6 -7 12 0 M96 76 q6 -7 12 0" fill="none"' + S(4) + "/>" :
      mood === "surprised" ? '<circle cx="74" cy="76" r="5.5" fill="#FFFFFF"' + S(3) + "/>" + dot(74, 76, 2.6) + '<circle cx="102" cy="76" r="5.5" fill="#FFFFFF"' + S(3) + "/>" + dot(102, 76, 2.6) :
      dot(74, 76, 4) + dot(102, 76, 4);
    var brows = mood === "focus" ? '<path d="M64 64 l16 4 M112 64 l-16 4" fill="none"' + S(3.5) + "/>" :
      mood === "surprised" ? '<path d="M66 62 q8 -5 16 0 M94 62 q8 -5 16 0" fill="none"' + S(3.5) + "/>" : "";
    var mouth = mood === "happy" ? '<path d="M78 96 q10 10 20 0" fill="none"' + S(4) + "/>" :
      mood === "surprised" ? '<ellipse cx="88" cy="98" rx="6" ry="7" fill="' + INK + '"/>' :
      mood === "focus" ? '<path d="M80 98 h16" fill="none"' + S(4) + "/>" :
      '<path d="M79 96 q9 6 18 0" fill="none"' + S(4) + "/>";
    // legs and shoes under the coat
    var out = '<g class="bob">' + limb(74, 176, 72, 190) + limb(102, 176, 104, 190) +
      '<ellipse cx="68" cy="193" rx="13" ry="5.5" fill="' + INK + '"/><ellipse cx="108" cy="193" rx="13" ry="5.5" fill="' + INK + '"/>' +
      // trench coat: body, lapels, belt and buttons
      '<path d="M48 178 L56 124 Q88 108 120 124 L128 178 Z" fill="#D8B27A"' + S(4) + "/>" +
      '<path d="M70 118 L88 146 L106 118" fill="#C49A5E"' + S(3.5) + "/>" +
      '<path d="M84 146 L88 178 M92 146 L88 178" fill="none"' + S(3) + "/>" +
      '<rect x="52" y="150" width="72" height="10" rx="3" fill="#8A5A2B"' + S(3) + "/>" +
      '<rect x="82" y="148" width="12" height="14" rx="2" fill="#FFD60A"' + S(3) + "/>" +
      dot(76, 168, 3) + dot(100, 168, 3) +
      // head
      '<circle cx="88" cy="82" r="30" fill="#C8955E"' + S(4) + "/>" +
      // fedora: brim, crown and band
      '<path d="M44 58 Q88 44 132 58 Q130 66 88 62 Q46 66 44 58 Z" fill="#6B4423"' + S(3.5) + "/>" +
      '<path d="M60 56 Q62 28 88 26 Q114 28 116 56 Q88 50 60 56 Z" fill="#7A5230"' + S(3.5) + "/>" +
      '<path d="M61 50 Q88 44 115 50 L115 56 Q88 50 61 56 Z" fill="#2B2B2B"/>' +
      '<g class="eyes">' + eyes + "</g>" + brows + mouth + "</g>";
    // left arm: the case notebook, or resting
    if (prop === "notebook") {
      out += limb(58, 132, 34, 112) + '<rect x="14" y="78" width="34" height="42" rx="3" fill="#FFF6CC"' + S(3.5) + '/><path d="M20 90 h22 M20 100 h22 M20 110 h14" fill="none"' + S(2.5) + "/>" + hand(36, 114);
    } else {
      out += limb(58, 132, 44, 160) + hand(43, 162);
    }
    // right arm: the magnifying glass
    out += limb(118, 132, 136, 112) + '<path d="M138 110 L150 92" fill="none"' + S(7) + "/>" +
      '<circle cx="158" cy="76" r="17" fill="#DDE8FF"' + S(4.5) + '/><path d="M150 70 q4 -6 10 -6" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' + hand(136, 112);
    return out;
  } };

  /* ---------- 2. the panic lens ---------- */
  var FILE_RE = /^\t(\S+\.go):(\d+)(?: \+0x[0-9a-f]+)?$/;
  function initLenses() {
    var boxes = document.querySelectorAll("[data-lens]");
    for (var i = 0; i < boxes.length; i++) { try { mountLens(boxes[i]); } catch (e) { L.report("lens", e.message); } }
  }
  function mountLens(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-lens")).textContent);
    var q = L.program(m.program); if (!q) return;
    var meta = P.data.captures.meta, dir = String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var err = q.stderr.replace(/\n$/, "").split("\n");
    var outLines = q.stdout ? q.stdout.replace(/\n$/, "").split("\n") : [];
    var src = q.src.replace(/\n$/, "").split("\n");
    var ok = true;
    function bad(msg) { ok = false; L.report("lens:" + m.program, msg); }
    // Go's panic shape
    if (!/^panic: /.test(err[0] || "")) bad("the first stderr line is not a panic: line");
    if (err.indexOf("goroutine 1 [running]:") < 0) bad("no goroutine 1 [running]: line");
    if (err[err.length - 1] !== "exit status 2") bad("the last line is not exit status 2");
    // frames: a function line followed by a tab-indented file:line
    var frames = [];
    for (var i = 1; i < err.length; i++) {
      var f = FILE_RE.exec(err[i]);
      if (f && i > 0) frames.push({ fn: err[i - 1], fnAt: i - 1, at: i, line: Number(f[2]), file: f[1] });
    }
    if (!frames.length) bad("no stack frames found");
    // which stderr lines each step lights
    m.steps.forEach(function (s, si) {
      s._lit = [];
      (s.hl || []).forEach(function (h) {
        var at = -1;
        for (var k = 0; k < err.length; k++) if (err[k].indexOf(h) >= 0) { at = k; break; }
        if (at < 0) bad("step " + (si + 1) + " highlights text that is not in the real run: " + h);
        else s._lit.push(at);
      });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every clue is a line of the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var term = box.querySelector(".lens-term"), code = box.querySelector(".lens-code"), trail = box.querySelector(".lens-trail");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var head = '<span class="prompt">you@laptop:' + esc(dir) + "$ </span>go run " + esc(m.program) + "\n" + (outLines.length ? esc(outLines.join("\n")) + "\n" : "");
    code.innerHTML = src.map(function (l, k) { return '<li data-ln="' + (k + 1) + '"><span class="ln">' + (k + 1) + "</span><code>" + L.highlight(l) + "</code></li>"; }).join("");
    var foot = '<svg class="lens-foot" viewBox="0 0 30 40" aria-hidden="true"><ellipse cx="15" cy="24" rx="9" ry="13" fill="#111111"/><circle cx="7" cy="7" r="3" fill="#111111"/><circle cx="14" cy="4" r="3" fill="#111111"/><circle cx="21" cy="6" r="3" fill="#111111"/></svg>';
    trail.innerHTML = frames.map(function (f, k) {
      var role = frames.length === 1 ? "the scene, and the start of the trail" : k === 0 ? "the scene: the newest call, where it broke" : k === frames.length - 1 ? "the start of the trail: where it all began" : "a footprint: who called the call above";
      var name = f.fn.replace(/\(.*$/, "");
      return '<li data-fn="' + f.fnAt + '" data-at="' + f.at + '">' + foot + '<span><span class="lens-role">' + esc(role) + "</span><b>" + esc(name) + "</b> · line " + f.line + "<code>" + esc((src[f.line - 1] || "").trim()) + "</code></span></li>";
    }).join("");
    var codeLis = code.querySelectorAll("li"), trailLis = trail.querySelectorAll("li");
    function render(st, announce) {
      var s = m.steps[st.step], litLines = [];
      term.innerHTML = head + err.map(function (l, k) {
        var on = s._lit.indexOf(k) >= 0;
        if (on) { var f = FILE_RE.exec(l); if (f) litLines.push(Number(f[2])); }
        return '<span class="err lens-l' + (on ? " hl" : "") + '">' + esc(l).replace(/[^ \t]+/g, function (w) { return '<span class="nb">' + w + "</span>"; }) + (on && s.tag ? '<span class="lens-tag">' + esc(s.tag) + "</span>" : "") + "</span>";
      }).join("\n");
      for (var a = 0; a < codeLis.length; a++) codeLis[a].classList.toggle("hl", litLines.indexOf(a + 1) >= 0);
      for (var b = 0; b < trailLis.length; b++) {
        var on = s._lit.indexOf(Number(trailLis[b].getAttribute("data-fn"))) >= 0 || s._lit.indexOf(Number(trailLis[b].getAttribute("data-at"))) >= 0;
        trailLis[b].classList.toggle("on", on);
      }
      note.innerHTML = '<span class="count">Clue ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Clue " + (st.step + 1) + " of " + m.steps.length + ". " + (s.tag ? s.tag + ": " : "") + s._lit.map(function (k) { return err[k].trim(); }).join(" / ") + ". " + note.textContent.replace(/^Clue \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, k) { return "<tr><td>" + (k + 1) + "</td><td>" + esc(s.tag || "") + "</td><td><code>" + esc(s._lit.map(function (j) { return err[j].trim(); }).join(" / ")) + "</code></td><td>" + s.note + "</td></tr>"; }).join("");
    // reserve: the narration and the whole lens (terminal, code, trail) keep the tallest clue's height, so the buttons never move
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () { initLenses(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
