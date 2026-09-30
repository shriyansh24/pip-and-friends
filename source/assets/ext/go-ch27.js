/* Go book, chapter 27 ("Docks and Pit Crews") additions. Classic deferred script; loads after comic-cast.js.

   [data-pitcrew]: the pit crew. One program with several planted problems is checked by a crew of tools, one after
   another, in ONE captured terminal session (a .cmd run). Each crew member is a step of that session. The stepper visits
   the crew in order: the member's helmet is marked NOW, the line it flags in the source is marked with a cross and the
   tool's name (never colour alone), and the member's real output is shown under the code.
   Model: { "program": "pitcrew.go",                 // a captured .cmd run; one step per crew member
            "file": "pitcrew.go",                    // the captured source the tools inspected (line numbers match)
            "crew": [ { "step": 0,                   // which command of the run this member is
                        "tool": "go vet",            // short name shown on the helmet plate
                        "icon": "glass",             // optional: glass, spanner, wrench, shield or broom
                        "role": "checks calls",      // a few words under the name
                        "line": 14,                  // the source line this member flags
                        "find": "missing a final value",   // text that must appear in the member's real output
                        "note": "HTML" } ] }
   Parity: for every member, the real output of its step must contain `find`, and must point at `line`: either it
   contains "main.go:<line>:" or it contains the text of that source line (a diff shows the line itself). Any miss
   turns the badge bad and calls L.report(). Keyboard: the engine's stepper (arrows, Space, R). Text version: the
   transcript table lists every member, its command, its flagged line and its message. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch27.js loaded before comic.js"); return; }
  var esc = L.esc;

  function stepOf(q, i) {
    var steps = q.steps || [{ out: q.stdout, err: q.stderr, cmd: "" }];
    return steps[i == null ? steps.length - 1 : i] || {};
  }

  var TOOLS = ["wrench", "glass", "spanner", "shield", "broom"];
  function icon(kind) {
    if (kind === "glass") return '<circle cx="0" cy="-2" r="11" fill="#fff" stroke="#111" stroke-width="3"/><path d="M8 7 l10 10" stroke="#111" stroke-width="5" stroke-linecap="round"/>';
    if (kind === "spanner") return '<path d="M-14 12 L8 -10" stroke="#111" stroke-width="6" stroke-linecap="round"/><circle cx="11" cy="-13" r="8" fill="#FFD60A" stroke="#111" stroke-width="3"/><path d="M8 -16 l6 6" stroke="#111" stroke-width="3"/>';
    if (kind === "shield") return '<path d="M0 -16 L14 -10 V2 C14 10 7 15 0 18 C-7 15 -14 10 -14 2 V-10 Z" fill="#C9F2D9" stroke="#111" stroke-width="3"/><path d="M-6 1 l5 5 l8 -10" fill="none" stroke="#111" stroke-width="3"/>';
    if (kind === "broom") return '<path d="M10 -16 L-6 10" stroke="#8A5A2B" stroke-width="5" stroke-linecap="round"/><path d="M-10 6 L2 14 L-6 20 L-16 12 Z" fill="#FFD60A" stroke="#111" stroke-width="3"/>';
    return '<path d="M-12 12 L6 -6" stroke="#111" stroke-width="6" stroke-linecap="round"/><path d="M2 -12 a9 9 0 1 0 10 10 l-6 -2 l-2 -6 z" fill="#DDE8FF" stroke="#111" stroke-width="3"/>';
  }

  function memberSVG(c, i, x, state) {
    // state: "now", "done" or "wait"
    var now = state === "now", done = state === "done";
    var s = '<g transform="translate(' + x + ' 0)">';
    if (now) s += '<path d="M62 4 l10 14 l10 -14 Z" fill="#111"/><text x="72" y="0" text-anchor="middle" class="pc-now">NOW</text>';
    // body (overalls) and helmet
    s += '<path d="M40 150 q0 -44 32 -44 q32 0 32 44 Z" fill="' + (i % 2 ? "#DDE8FF" : "#FFF6CC") + '" stroke="#111" stroke-width="' + (now ? 5 : 4) + '"/>';
    s += '<circle cx="72" cy="70" r="34" fill="#fff" stroke="#111" stroke-width="' + (now ? 6 : 4) + '"/>';
    s += '<path d="M44 66 q28 -18 56 0 v10 q-28 -10 -56 0 z" fill="#2B2B2B"/>';
    s += '<path d="M40 60 q32 -48 64 0" fill="none" stroke="#111" stroke-width="4"/>';
    s += '<text x="72" y="54" text-anchor="middle" class="pc-no">' + (i + 1) + "</text>";
    s += '<path d="M62 92 q10 7 20 0" fill="none" stroke="#111" stroke-width="3"/>';
    // the tool in hand
    s += '<g transform="translate(112 122)">' + icon(c.icon || TOOLS[i % TOOLS.length]) + "</g>";
    // name plate
    s += '<rect x="6" y="160" width="132" height="30" rx="6" fill="#fff" stroke="#111" stroke-width="3"/>';
    s += '<text x="72" y="181" text-anchor="middle" class="pc-name">' + esc(c.tool) + "</text>";
    // result tag: a word and a mark, never colour alone
    if (done || now) {
      s += '<rect x="22" y="198" width="100" height="26" rx="6" fill="' + (now ? "#FFE1E1" : "#C9F2D9") + '" stroke="#111" stroke-width="3"' + (now ? ' stroke-dasharray="7 4"' : "") + "/>";
      s += '<text x="72" y="217" text-anchor="middle" class="pc-tag">' + (now ? "✗ FLAGS LINE " + c.line : "✓ LINE " + c.line) + "</text>";
    } else {
      s += '<text x="72" y="217" text-anchor="middle" class="pc-wait">waiting…</text>';
    }
    return s + "</g>";
  }

  function mountCrew(box) {
    var id = box.getAttribute("data-pitcrew"), el = document.getElementById(id);
    if (!el) { L.report("pitcrew:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), q = L.program(m.program), f = L.program(m.file);
    if (!q || !f) return;
    var src = f.src.replace(/\n$/, "").split("\n");
    var ok = true;
    var crew = m.crew.map(function (c) {
      var st = stepOf(q, c.step), text = (st.out || "") + (st.err || "");
      var lineText = (src[c.line - 1] || "").trim();
      var found = text.indexOf(c.find) >= 0;
      var points = text.indexOf("main.go:" + c.line + ":") >= 0 || (lineText && text.indexOf(lineText) >= 0);
      if (!found) { ok = false; L.report("pitcrew:" + id, c.tool + ": the real output does not contain " + JSON.stringify(c.find)); }
      if (!points) { ok = false; L.report("pitcrew:" + id, c.tool + ": the real output does not point at line " + c.line); }
      return { tool: c.tool, icon: c.icon, role: c.role || "", line: c.line, note: c.note || "", cmd: st.cmd || "", dir: st.dir || "~", out: (st.out || "") + (st.err || ""), exit: st.exit };
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every crew member's message comes from the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }

    // One row of crew members when the stage is wide enough to keep their text at its design size (15px); on phones
    // they stand in rows of two, so nothing is hidden behind a sideways scroll.
    var n = crew.length, W = 150, ROW = 248;
    var svg = box.querySelector(".pc-svg");
    function cols() { var st = box.querySelector(".pc-stage"); return st && st.clientWidth && st.clientWidth < n * W + 10 ? 2 : n; }
    var codeBox = box.querySelector(".pc-code"), outBox = box.querySelector(".pc-out");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), stage = box.querySelector(".pc-stage");

    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = crew.map(function (c, i) {
      // the real output gets a full-width row of its own, so tool messages keep their real lines (they scroll sideways)
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(c.cmd) + "</code></td><td>" + c.line + " (<code>" + esc((src[c.line - 1] || "").trim()) + "</code>)</td><td>" + c.note + "</td></tr>" +
        '<tr class="pc-outrow"><td colspan="4" data-h="Real output"><pre class="pc-tt" tabindex="0">' + esc(c.out.replace(/\n$/, "")) + "</pre></td></tr>";
    }).join("");

    function drawCode(k) {
      var marks = {};
      crew.forEach(function (c, i) { if (k >= n || i <= k) marks[c.line] = { i: i, now: i === k }; });
      codeBox.innerHTML = src.map(function (l, i) {
        var mk = marks[i + 1];
        var cls = mk ? (mk.now ? "pc-flag" : "pc-seen") : "";
        var tag = mk ? '<span class="pc-ltag">' + (mk.now ? "✗ " : "✓ ") + esc(crew[mk.i].tool) + "</span>" : '<span class="pc-ltag"></span>';
        return '<li class="' + cls + '"' + (mk && mk.now ? " data-now" : "") + '><span class="pc-lcode">' + (l ? L.highlight(l) : "&nbsp;") + "</span>" + tag + "</li>";
      }).join("");
    }
    function render(s, announce) {
      var k = s.step, h = "", c2 = cols(), rows = Math.ceil(n / c2), width = Math.max(c2 * W + 10, 310);
      svg.setAttribute("viewBox", "0 -16 " + width + " " + (rows * ROW));
      svg.classList.toggle("pc-grid", c2 < n);
      for (var r = 0; r < rows; r++) h += '<rect x="2" y="' + (226 + r * ROW) + '" width="' + (width - 4) + '" height="6" fill="#111"/>';
      for (var i = 0; i < n; i++) h += '<g transform="translate(0 ' + (Math.floor(i / c2) * ROW) + ')">' + memberSVG(crew[i], i, 5 + (i % c2) * W, k >= n ? "done" : i === k ? "now" : i < k ? "done" : "wait") + "</g>";
      svg.innerHTML = h;
      drawCode(k);
      if (k < n) {
        var c = crew[k];
        outBox.innerHTML = '<pre class="term pc-term" tabindex="0"><span class="prompt">you@laptop:' + esc(c.dir) + "$ </span>" + esc(c.cmd) + "\n" + esc(c.out.replace(/\n$/, "")) + "</pre>";
        note.innerHTML = '<span class="count">Crew member ' + (k + 1) + " of " + n + "</span><b>" + esc(c.tool) + "</b> (" + esc(c.role) + ") flags line " + c.line + ". " + c.note;
      } else {
        outBox.innerHTML = '<pre class="term pc-term"><b>Pit stop over</b>\n' + crew.map(function (c) { return "✓ " + esc(c.tool) + ": line " + c.line; }).join("\n") + "</pre>";
        note.innerHTML = '<span class="count">Pit stop over</span>' + n + " crew members, " + n + " different problems, " + n + " different lines. The Compiler let this program through: it builds and runs. Every problem here was found by a different specialist.";
      }
      if (live && announce) live.textContent = note.textContent;
    }
    var rn = L.runner(box, n + 1, render, { reserve: true });
    rn.reset(n + 1);
  }

  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-pitcrew]");
    for (var i = 0; i < r.length; i++) { try { mountCrew(r[i]); } catch (e) { L.report("pitcrew", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
