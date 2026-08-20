/* Chapter 14 extension: "Smoke Alarms and Blueprints".
   Sneak and the duck come from comic-critters.js; terminals for .cmd programs (pytest, doctest, an environment
   variable) and second-version runs use the engine's data-run / data-alt, which show the recorded commands. Adds
   (1) cast: a smoke alarm, smokealarm (data-on="true" rings: red light, sound lines, open mouth);
   (2) "one possible run" check: every terminal whose program is marked nondeterministic (pytest's elapsed time) must
       sit right after a .tag14 badge saying so, or an error is reported;
   (3) the pytest report reader [data-rpread]: steps through a REAL captured pytest report, highlighting lines.
       Every highlight must be found in the captured output, or the parity badge turns bad and an error is reported.
       The report wraps like the engine's .term.wrap (per-line blocks with a hanging indent);
   (4) [data-quote="prog"]: text in the page that quotes a program's output; it must appear in that capture;
   (5) the editor debugger mock-up, whose code lines come from a captured program.
   Cast members are registered at load time, before the engine's boot draws the cast. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch14.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  /* ---------------- cast ---------------- */
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  // The smoke alarm: a disc on the ceiling. Quiet: green light, smile. Ringing: red light, sound lines, open mouth.
  C.smokealarm = { vb: "0 0 160 120", draw: function (el) {
    var on = el.getAttribute("data-on") === "true", out = "";
    out += '<rect x="66" y="2" width="28" height="12" rx="2" fill="#DADADA"' + S(3) + "/>";
    if (on) out += '<g class="shake-me"><path d="M18 40 l-12 -6 M14 58 h-12 M18 76 l-12 6 M142 40 l12 -6 M146 58 h12 M142 76 l12 6" fill="none"' + S(4) + "/></g>";
    out += '<g class="' + (on ? "" : "bob") + '"><ellipse cx="80" cy="58" rx="58" ry="40" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M44 84 q36 16 72 0" fill="none"' + S(2.5) + "/>" +
      '<circle cx="80" cy="30" r="8" fill="' + (on ? "#FF5A4E" : "#C9F2D9") + '"' + S(3) + "/>" +
      '<g class="eyes">' + dot(64, 54, 4.2) + dot(96, 54, 4.2) + "</g>" +
      (on ? '<ellipse cx="80" cy="72" rx="9" ry="7" fill="' + INK + '"/>' : '<path d="M70 68 q10 9 20 0" fill="none"' + S(3.5) + "/>") + "</g>";
    return out;
  } };

  /* ---------------- helpers ---------------- */
  function caps() { return (P.data && P.data.captures) || { meta: {}, programs: {} }; }
  function workdir() { return String(caps().meta.workdir || "/home/you").replace(/^\/home\/you/, "~"); }
  function prompt(dir) { return '<span class="prompt">you@laptop:' + esc(dir || workdir()) + "$ </span>"; }

  /* ---------------- "one possible run" badges and version tags ---------------- */
  function initTags() {
    var terms = document.querySelectorAll("pre.term[data-run], [data-rpread]");
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i], name = t.getAttribute("data-run") || (JSON.parse(document.getElementById(t.getAttribute("data-rpread")).textContent).program);
      var q = L.program(name); if (!q || !q.nondeterministic) continue;
      var tagged = false;
      for (var e = t.previousElementSibling; e && !tagged; e = e.previousElementSibling) { if (e.matches(".tag14, p:has(> .tag14)")) tagged = true; if (e.matches("pre, .rpread > .controls")) break; }
      if (t.matches("[data-rpread]") && t.querySelector(".tag14")) tagged = true;
      if (!tagged) L.report("nondet:" + name, "a nondeterministic run is shown without a \"one possible run\" badge");
    }
    var tags = document.querySelectorAll("[data-ver]");
    for (var j = 0; j < tags.length; j++) {
      var which = tags[j].getAttribute("data-ver"), prog = tags[j].getAttribute("data-prog"), p = prog ? caps().programs[prog] : null;
      tags[j].textContent = which === "alt" ? (p && p.alt ? p.alt.version : "?") : (caps().meta.primary || "?");
    }
  }

  /* ---------------- quotes checked against captures ---------------- */
  function allText(q) { return (q.screen != null ? q.screen : q.stdout) + "\n" + q.stderr; }
  function initQuotes() {
    var qs = document.querySelectorAll("[data-quote]");
    for (var i = 0; i < qs.length; i++) {
      var name = qs[i].getAttribute("data-quote"), q = L.program(name); if (!q) continue;
      var t = qs[i].textContent.replace(/\s+/g, " ").trim();
      if (allText(q).replace(/\s+/g, " ").indexOf(t) < 0) L.report("quote:" + name, "quoted text is not in the real run: " + t);
    }
  }

  /* ---------------- pytest report reader ---------------- */
  /* Model: { program, steps: [{ hl: ["a unique part of a captured output line", ...], note }] } */
  function initReaders() {
    var boxes = document.querySelectorAll("[data-rpread]");
    for (var i = 0; i < boxes.length; i++) { try { mountReader(boxes[i]); } catch (e) { L.report("rpread", e.message); } }
  }
  function mountReader(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-rpread")).textContent);
    var q = L.program(m.program); if (!q) return;
    var steps = q.steps || [{ cmd: "python3 " + m.program }];
    var lines = q.stdout.replace(/\n$/, "").split("\n"), ok = true;
    m.steps.forEach(function (s, si) {
      s._lit = [];
      (s.hl || []).forEach(function (h) {
        var at = -1;
        for (var i = 0; i < lines.length; i++) if (lines[i].indexOf(h) >= 0) { at = i; break; }
        if (at < 0) { ok = false; L.report("rpread:" + m.program, "step " + (si + 1) + " highlights text that is not in the real report: " + h); return; }
        s._lit.push(at);
      });
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every highlighted line is from the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    var term = box.querySelector(".rp-term"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var head = steps.map(function (s) { return '<span class="tl">' + prompt(s.dir) + esc(s.cmd) + "\n</span>"; }).join("");
    function render(st, announce) {
      var s = m.steps[st.step];
      term.innerHTML = head + lines.map(function (l, i) { var on = s._lit.indexOf(i) >= 0; return '<span class="tl rp-l' + (on ? " hl" : "") + '">' + esc(l || " ") + "\n</span>"; }).join("");
      L.hangLines(term.querySelectorAll(":scope > .tl"));
      var hl = term.querySelectorAll(".rp-l.hl .rest");
      for (var h = 0; h < hl.length; h++) hl[h].insertAdjacentHTML("afterbegin", '<span class="sr-only">Highlighted: </span>');
      note.innerHTML = '<span class="count">Clue ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Clue " + (st.step + 1) + " of " + m.steps.length + ". Highlighted: " + s._lit.map(function (i) { return lines[i].trim(); }).join(" / ") + ". " + note.textContent.replace(/^Clue \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s._lit.map(function (j) { return lines[j].trim(); }).join(" / ")) + "</code></td><td>" + s.note + "</td></tr>"; }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }


  /* ---------------- the editor mock-up: its code lines come from a captured program ---------------- */
  function initIde() {
    var els = document.querySelectorAll("[data-ide-src]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], q = L.program(el.getAttribute("data-ide-src")); if (!q) continue;
      var bp = Number(el.getAttribute("data-bp")), cur = Number(el.getAttribute("data-cur"));
      el.innerHTML = q.src.replace(/\n$/, "").split("\n").map(function (l, k) {
        var n = k + 1, cls = (n === bp ? "bp" : "") + (n === cur ? " cur" : "");
        var mark = (n === bp ? '<span class="sr-only">(breakpoint) </span>' : "") + (n === cur ? '<span class="arrow" aria-hidden="true">\u27a4</span><span class="sr-only">(paused here, about to run) </span>' : "");
        return '<li class="' + cls.trim() + '">' + mark + (l ? L.highlight(l) : " ") + "</li>";
      }).join("");
    }
  }

  P.comic.ext(function () { initTags(); initQuotes(); initReaders(); initIde(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
