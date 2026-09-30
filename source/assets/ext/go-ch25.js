/* Go book, chapter 25 ("Keys and Conveyor Belts") additions. Classic deferred script; loads after comic-cast.js.

   1. data-char="kitchenhand": the small kitchen helper from chapter 24 (one goroutine), drawn by comic-critters.js.
      data-label = apron number (up to 3 characters); data-state = "idle" | "busy" | "done"; this chapter wraps the
      engine drawing to add data-key="yes" (holds the gold key up high).

   2. data-char="keykeeper": Ida, the Key Keeper, original to this chapter. She looks after the one key on the hook.
      data-mood = "happy" (default) | "stern"; data-prop = "key" (default, raises a big gold key) | "ring" (shows her
      key ring, hands empty) | "none".

   3. [data-keyhook]: the key-hook stepper. One key (a sync.Mutex), a board room with a tally board (the shared
      variable), a waiting line, and the program beside it with the line the key holder is on marked.
      Model: { "program": "keyhook.go", "helpers": ["1", "2", "3"],
               "steps": [ { "line": 15,                // the line the key holder runs next (null at the end)
                            "holder": "1" | null,      // who has the key (null: the key is on its hook)
                            "queue": ["2", "3"],       // waiting at mu.Lock(), front first
                            "done": ["1"],             // helpers that have finished
                            "board": 0,                // the tally board
                            "output": [], "note": "HTML" } ] }
      Parity (any failure turns the badge bad and calls L.report): the last screen equals the real run; every screen is a
      prefix of it; the board only ever changes by +1, and only while someone holds the key; nobody holding the key is
      also waiting or finished; the final board equals the last number the real run printed; every line exists.

   4. [data-beltline]: the conveyor-belt stepper for a pipeline. Stations in a row, joined by belts (channels).
      Model: { "program": "pipeline.go",
               "stations": [ {"name": "source", "does": "puts 2, 3, 4 on the belt"}, ... , {"name": "main", "does": "prints"} ],
               "steps": [ { "hold": ["3", "2 → 4", null, null],    // what each station has in hand
                            "state": ["send", "work", "recv", "recv"],  // run | work | send | recv | home
                            "belts": [null, "4", null],                 // the item being handed over on each belt
                            "closed": [false, false, false],            // belt closed?
                            "output": [], "note": "HTML" } ] }
      Parity: the last screen equals the real run; every screen is a prefix of it; every line main prints arrived on the
      last belt in that step or the one before; a closed belt carries nothing afterwards.
   Both steppers use the shared runner (buttons, arrow keys, Space, R) and fill a transcript table as their text version. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch25.js loaded before comic.js"); return; }
  var esc = L.esc, S = L.stroke, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function keyShape(x, y, s) {   // a gold key, bow at (x, y), pointing right, scale s
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')"><circle cx="0" cy="0" r="11" fill="#FFD60A"' + S(4) +
      '/><circle cx="0" cy="0" r="4" fill="#FFFFFF"' + S(2.5) + '/><path d="M11 0 H40 M30 0 V9 M37 0 V7" fill="none"' + S(5) + "/></g>";
  }

  /* ---------------- kitchen helper: drawn by comic-critters.js (from chapter 24) ---------------- */
  // chapter 25: a helper may hold the key. Wrap whichever drawing is in place.
  (function () {
    if (!L.cast.kitchenhand) { L.report("go-ch25", "comic-critters.js (kitchenhand) must load before go-ch25.js"); return; }
    var base = L.cast.kitchenhand.draw;
    L.cast.kitchenhand = { vb: "0 0 120 150", draw: function (el) {
      var out = base(el);
      if (el.getAttribute("data-key") === "yes") {
        out += '<path d="M100 92 Q114 76 108 44" fill="none"' + S(6) + "/>" + keyShape(100, 30, 0.62);
      }
      return out;
    } };
  })();

  /* ---------------- Ida, the Key Keeper ---------------- */
  L.cast.keykeeper = { vb: "0 0 160 200", draw: function (el) {
    var stern = el.getAttribute("data-mood") === "stern", prop = el.getAttribute("data-prop") || "key";
    var SKIN = "#8D5A3B", TEAL = "#2E8B87", HAIR = "#D9D9D9";
    var out = '<g class="bob">' +
      // boots
      '<path d="M66 170 V186 M94 170 V186" fill="none"' + S(8) + "/>" +
      '<ellipse cx="62" cy="190" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="98" cy="190" rx="14" ry="6" fill="' + INK + '"/>' +
      // overalls body
      '<path d="M46 108 Q46 94 62 92 H98 Q114 94 114 108 V172 H46 Z" fill="' + TEAL + '"' + S(4) + "/>" +
      // bib with a key badge
      '<path d="M60 112 H100 V140 H60 Z" fill="#BFE7E5"' + S(3) + "/>" + keyShape(70, 126, 0.42) +
      // belt and key ring
      '<path d="M46 150 H114" fill="none"' + S(4) + "/>" +
      '<circle cx="58" cy="160" r="8" fill="none"' + S(3) + '/><path d="M56 166 l-3 12 M60 167 l2 11" fill="none"' + S(3) + "/>" +
      // head
      '<circle cx="80" cy="60" r="30" fill="' + SKIN + '"' + S(4) + "/>" +
      // hair bun and fringe
      '<circle cx="80" cy="26" r="11" fill="' + HAIR + '"' + S(3.5) + "/>" +
      '<path d="M52 54 Q56 30 80 30 Q104 30 108 54 Q96 42 80 44 Q64 42 52 54 Z" fill="' + HAIR + '"' + S(3.5) + "/>" +
      // round glasses
      '<circle cx="69" cy="62" r="9" fill="#FFFFFF"' + S(3) + '/><circle cx="91" cy="62" r="9" fill="#FFFFFF"' + S(3) + '/><path d="M78 62 H82" fill="none"' + S(3) + "/>" +
      '<g class="eyes">' + dot(69, 63, 3.5) + dot(91, 63, 3.5) + "</g>" +
      (stern ? '<path d="M60 49 l16 4 M100 49 l-16 4" fill="none"' + S(3.5) + '/><path d="M72 79 h16" fill="none"' + S(4) + "/>"
             : '<path d="M71 77 q9 8 18 0" fill="none"' + S(3.5) + "/>");
    // left arm down
    out += '<path d="M48 110 Q36 128 42 146" fill="none"' + S(7) + '/><circle cx="42" cy="146" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    if (prop === "key") {
      out += '<path d="M112 110 Q130 94 130 72" fill="none"' + S(7) + '/><circle cx="130" cy="70" r="7" fill="' + SKIN + '"' + S(3) + "/>" +
        '<g transform="rotate(-60 130 60)">' + keyShape(124, 60, 0.9) + "</g>";
    } else if (prop === "ring") {
      out += '<path d="M112 110 Q128 120 124 140" fill="none"' + S(7) + '/><circle cx="124" cy="142" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    } else {
      out += '<path d="M112 110 Q124 128 118 146" fill="none"' + S(7) + '/><circle cx="118" cy="146" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- shared bits ---------------- */
  function codeList(lines, prog) {
    return '<ol class="kh-code" aria-label="The program, ' + esc(prog) + '">' + lines.map(function (l) { return "<li>" + (L.highlight(l) || " ") + "</li>"; }).join("") + "</ol>";
  }
  function checkScreens(m, real, bad) {
    var realLines = real.replace(/\n$/, "").split("\n");
    m.steps.forEach(function (s, i) {
      var o = s.output || [];
      for (var k = 0; k < o.length; k++) if (o[k] !== realLines[k]) { bad("step " + (i + 1) + ": screen line " + (k + 1) + " is not in the real run of " + m.program); break; }
    });
    var last = m.steps[m.steps.length - 1].output || [];
    if ((last.length ? last.join("\n") + "\n" : "") !== real) bad("the last step's screen is not the real output of " + m.program);
  }
  function screenHTML(o) { return o.length ? o.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>'; }

  /* ---------------- the key-hook stepper ---------------- */
  function mountKeyhook(box) {
    var id = box.getAttribute("data-keyhook"), el = document.getElementById(id);
    if (!el) { L.report("keyhook:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), prog = L.program(m.program);
    if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n"), real = L.shown(prog), ok = true, why = [];
    function bad(msg) { ok = false; why.push(msg); L.report("keyhook:" + id, msg); }
    checkScreens(m, real, bad);
    var prevBoard = null;
    m.steps.forEach(function (s, i) {
      if (s.line != null && (s.line < 1 || s.line > lines.length)) bad("step " + (i + 1) + ": no line " + s.line);
      if (s.holder && ((s.queue || []).indexOf(s.holder) >= 0 || (s.done || []).indexOf(s.holder) >= 0)) bad("step " + (i + 1) + ": helper " + s.holder + " holds the key and waits at the same time");
      if (prevBoard !== null && s.board !== prevBoard) {
        if (s.board !== prevBoard + 1) bad("step " + (i + 1) + ": the board jumps from " + prevBoard + " to " + s.board);
        if (!s.holder) bad("step " + (i + 1) + ": the board changes while the key is on its hook");
      }
      prevBoard = s.board;
    });
    var nums = real.match(/(\d+)\s*$/);
    if (!nums || Number(nums[1]) !== m.steps[m.steps.length - 1].board) bad("the final board is not the number the real run printed");
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program + ", final board included" : "Does not match the real run: " + why[0]; par.classList.toggle("bad", !ok); }

    var wrap = box.querySelector(".kh-wrap");
    wrap.innerHTML = '<div class="kh-grid">' + codeList(lines, m.program) +
      '<div class="kh-stage" aria-hidden="true" data-reserve>' +
        '<div class="kh-hook"><span class="title">KEY HOOK</span><div class="kh-hookpic"></div><span class="kh-hookst"></span></div>' +
        '<div class="kh-room"><span class="title">BOARD ROOM · one at a time</span><div class="kh-inside"></div><div class="kh-board"><span>board</span><b></b></div></div>' +
        '<div class="kh-line"><span class="title">WAITING AT mu.Lock()</span><div class="kh-queue"></div></div>' +
        '<div class="kh-done"><span class="title">FINISHED</span><div class="kh-fin"></div></div>' +
      "</div></div>";
    var lis = wrap.querySelectorAll(".kh-code li"), hookpic = wrap.querySelector(".kh-hookpic"), hookst = wrap.querySelector(".kh-hookst");
    L.hangLines(lis);   // on phones the code wraps with a hanging indent (go-ch25.css)
    var inside = wrap.querySelector(".kh-inside"), boardB = wrap.querySelector(".kh-board b"), queue = wrap.querySelector(".kh-queue"), fin = wrap.querySelector(".kh-fin");
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var hookSVG = function (on) {
      return '<svg viewBox="0 0 120 70" class="kh-hooksvg"><path d="M10 12 H110" fill="none"' + S(5) + '/><path d="M60 12 V26 q0 10 -10 10" fill="none"' + S(4) + "/>" +
        (on ? keyShape(48, 44, 0.8) : '<text x="60" y="62" text-anchor="middle" font-family="Comic Neue, sans-serif" font-weight="700" font-size="15" fill="' + INK + '">empty hook</text>') + "</svg>";
    };
    function chip(h, extra) { return '<span class="kh-who"><svg class="char sm" data-char="kitchenhand" data-label="' + esc(h) + '"' + (extra || "") + '></svg><span>helper ' + esc(h) + "</span></span>"; }
    function sayState(s) {
      return (s.holder ? "Helper " + s.holder + " has the key" : "The key is on its hook") + "; waiting: " + ((s.queue || []).length ? (s.queue || []).join(", ") : "nobody") +
        "; finished: " + ((s.done || []).length ? s.done.join(", ") : "nobody") + "; board " + s.board + ".";
    }
    function render(st, announce) {
      var s = m.steps[st.step];
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      hookpic.innerHTML = hookSVG(!s.holder);
      hookst.textContent = s.holder ? "key taken by helper " + s.holder : "key free";
      inside.innerHTML = s.holder ? chip(s.holder, ' data-key="yes" data-state="busy"') : '<span class="none">nobody inside</span>';
      boardB.textContent = String(s.board);
      queue.innerHTML = (s.queue || []).length ? s.queue.map(function (h) { return chip(h); }).join("") : '<span class="none">nobody waiting</span>';
      fin.innerHTML = (s.done || []).length ? s.done.map(function (h) { return chip(h, ' data-state="done"'); }).join("") : '<span class="none">nobody yet</span>';
      L.drawCast(wrap);
      out.innerHTML = screenHTML(s.output || []);
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + sayState(s) + " " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line == null ? "end" : s.line) + "</td><td>" + esc(sayState(s)) + "</td><td>" + s.note + "</td></tr>";
    }).join("");
  }

  /* ---------------- the conveyor-belt stepper ---------------- */
  var WORDS = { run: "▶ starting", work: "⚙ working", send: "‖ waiting to hand over", recv: "‖ waiting for an item", home: "✓ gone home" };
  var CLS = { send: "wait", recv: "wait", home: "done", work: "busy" };
  function mountBelt(box) {
    var id = box.getAttribute("data-beltline"), el = document.getElementById(id);
    if (!el) { L.report("beltline:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), prog = L.program(m.program);
    if (!prog) return;
    var real = L.shown(prog), ok = true, why = [], n = m.stations.length;
    function bad(msg) { ok = false; why.push(msg); L.report("beltline:" + id, msg); }
    checkScreens(m, real, bad);
    var prevOut = 0, prevLast = null, closedBefore = [];
    m.steps.forEach(function (s, i) {
      if ((s.hold || []).length !== n || (s.state || []).length !== n || (s.belts || []).length !== n - 1) bad("step " + (i + 1) + ": needs one hold and state per station and one belt between each pair");
      var o = s.output || [], lastBelt = (s.belts || [])[n - 2];
      for (var k = prevOut; k < o.length; k++) if (o[k] !== lastBelt && o[k] !== prevLast) bad("step " + (i + 1) + ": main printed '" + o[k] + "', which did not arrive on the last belt");
      (s.belts || []).forEach(function (b, j) { if (b != null && closedBefore[j]) bad("step " + (i + 1) + ": belt " + (j + 1) + " carries an item after it was closed"); });
      (s.closed || []).forEach(function (c, j) { if (c) closedBefore[j] = true; });
      prevOut = Math.max(prevOut, o.length); prevLast = lastBelt;
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program + ", line by line" : "Does not match the real run: " + why[0]; par.classList.toggle("bad", !ok); }

    var wrap = box.querySelector(".bl-wrap"), h = '<div class="bl-row" aria-hidden="true" data-reserve>';
    m.stations.forEach(function (st, j) {
      h += '<div class="bl-st" data-i="' + j + '"><span class="name">' + esc(st.name) + '</span><span class="does">' + esc(st.does || "") + '</span><span class="hold"></span><span class="st"></span></div>';
      if (j < n - 1) h += '<div class="bl-belt" data-b="' + j + '"><span class="lab">belt ' + (j + 1) + '</span><span class="it"></span><span class="arrow">→</span></div>';
    });
    wrap.innerHTML = h + "</div>";
    var sts = wrap.querySelectorAll(".bl-st"), belts = wrap.querySelectorAll(".bl-belt");
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function sayState(s) {
      return m.stations.map(function (st, j) { return st.name + ": " + (WORDS[s.state[j]] || s.state[j]) + (s.hold[j] != null ? " (holding " + s.hold[j] + ")" : ""); }).join("; ") + ". " +
        s.belts.map(function (b, j) { return "belt " + (j + 1) + ": " + (b != null ? "handing over " + b : (s.closed && s.closed[j] ? "closed" : "empty")); }).join("; ") + ".";
    }
    function render(st, announce) {
      var s = m.steps[st.step];
      for (var j = 0; j < n; j++) {
        var node = sts[j], state = s.state[j];
        node.className = "bl-st " + (CLS[state] || "");
        node.querySelector(".hold").innerHTML = s.hold[j] != null ? '<span class="bl-item">' + esc(s.hold[j]) + "</span>" : '<span class="none">empty hands</span>';
        node.querySelector(".st").textContent = WORDS[state] || state;
      }
      for (var b = 0; b < belts.length; b++) {
        var closed = s.closed && s.closed[b];
        belts[b].className = "bl-belt" + (closed ? " closed" : "") + (s.belts[b] != null ? " moving" : "");
        if (s.belts[b] != null) belts[b].setAttribute("data-now", ""); else belts[b].removeAttribute("data-now");
        belts[b].querySelector(".it").innerHTML = s.belts[b] != null ? '<span class="bl-item go fx-in">' + esc(s.belts[b]) + "</span>" : (closed ? '<span class="shut">CLOSED</span>' : "");
      }
      out.innerHTML = screenHTML(s.output || []);
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + sayState(s) + " " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + esc(sayState(s)) + "</td><td>" + s.note + "</td></tr>"; }).join("");
  }

  P.comic.ext(function () {
    var a = document.querySelectorAll("[data-keyhook]"), b = document.querySelectorAll("[data-beltline]"), i;
    for (i = 0; i < a.length; i++) { if (a[i]._khMounted) continue; a[i]._khMounted = true; try { mountKeyhook(a[i]); } catch (e) { L.report("keyhook", e.message); } }
    for (i = 0; i < b.length; i++) { if (b[i]._blMounted) continue; b[i]._blMounted = true; try { mountBelt(b[i]); } catch (e) { L.report("beltline", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
