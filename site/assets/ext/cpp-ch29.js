/* C++ book, chapter 29 extension: "Many Cooks, One Stopwatch".
   Adds one character, one stepper and one terminal helper. Names were grepped in assets/ and assets/ext/ first: neither is used elsewhere.
     - "timekeeper": Tick, the kitchen timekeeper, holding a big stopwatch. Stands for MEASURING (<chrono>, profilers).
       data-mood = normal | happy | focus | surprised      data-label = what the stopwatch face shows (<= 6 chars, default "0:00")
     - [data-cookrail]: a kitchen ticket rail. Two cooks' lanes either side of the shared notebook; each step pins one
       ticket (one tiny step of one cook) on the rail, in time order, top to bottom. It is a teaching model of ONE possible
       order of steps, acted out by a single-threaded program, and it checks itself against that program's real run:
       every step's screen must be a prefix of the captured output, and the last step's screen must equal it (parity badge).
       Model: {"program": "x.cpp", "lanes": ["Cook A", "Cook B"], "labels": ["A", "B"], "book": "41",
               "steps": [{"who": null|0|1, "act": "reads", "heads": ["41", ""], "book": "41", "output": [...], "note": "html"}]}
       The first step is the starting state (who: null). Keyboard: the engine's runner (arrow keys, Space, R).
       Text version: the transcript table lists every ticket.
     - [data-libfold] on a wrapping terminal: folds runs of standard-library frames in a ThreadSanitizer report (see below). */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch29.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  /* ---------------- Tick the timekeeper ---------------- */
  L.cast.timekeeper = { vb: "0 0 170 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", label = String(el.getAttribute("data-label") || "0:00").slice(0, 6);
    var eyes, mouth;
    if (mood === "happy") eyes = '<path d="M60 66 q6 -7 12 0 M86 66 q6 -7 12 0" fill="none"' + S(3.5) + "/>";
    else if (mood === "surprised") eyes = '<circle cx="66" cy="66" r="6" fill="#FFFFFF"' + S(3) + '/><circle cx="92" cy="66" r="6" fill="#FFFFFF"' + S(3) + '/><circle cx="66" cy="66" r="2.5" fill="' + INK + '"/><circle cx="92" cy="66" r="2.5" fill="' + INK + '"/>';
    else eyes = '<circle cx="66" cy="66" r="4" fill="' + INK + '"/><circle cx="92" cy="66" r="4" fill="' + INK + '"/>';
    var brows = mood === "focus" ? '<path d="M58 56 l13 3 M100 56 l-13 3" fill="none"' + S(3.5) + "/>" : "";
    if (mood === "happy") mouth = '<path d="M68 82 q11 10 22 0" fill="none"' + S(3.5) + "/>";
    else if (mood === "surprised") mouth = '<circle cx="79" cy="85" r="5" fill="' + INK + '"/>';
    else if (mood === "focus") mouth = '<path d="M70 85 h18" fill="none"' + S(3.5) + "/>";
    else mouth = '<path d="M70 83 q9 5 18 0" fill="none"' + S(3.5) + "/>";
    /* The dial reading is the joke and the point of most Tick panels, so it must read at 12px or more: the label is a
       text.lbl-grow (the engine grows it when Tick is drawn small, squeezing it to fit the dial), and the 3 and 9 o'clock
       ticks are left out whenever there is a reading, so nothing runs through it. */
    var fs = label.length > 5 ? 13 : 16;
    return '<g class="bob">' +
      /* shoes and legs */
      '<path d="M64 160 v22 M94 160 v22" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/>' +
      '<ellipse cx="60" cy="186" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="98" cy="186" rx="14" ry="6" fill="' + INK + '"/>' +
      /* striped referee-style shirt in kitchen blue and white */
      '<path d="M40 166 L46 110 Q79 96 112 110 L118 166 Z" fill="#DDE8FF"' + S(4) + "/>" +
      '<path d="M58 104 L54 166 M79 100 V166 M100 104 L104 166" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
      /* left arm down, whistle on a cord */
      '<path d="M46 116 Q30 136 36 156" fill="none"' + S(7) + "/>" +
      '<path d="M66 104 Q79 126 92 104" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<rect x="74" y="120" width="12" height="8" rx="3" fill="#FFD60A"' + S(2.5) + "/>" +
      /* right arm up holding the stopwatch */
      '<path d="M112 116 Q134 112 134 88" fill="none"' + S(7) + "/>" +
      /* head with a flat cap */
      '<circle cx="79" cy="70" r="28" fill="#E9B98F"' + S(4) + "/>" +
      '<path d="M50 60 Q52 34 79 34 Q106 34 108 60 Z" fill="#2F3A5A"' + S(4) + "/>" +
      '<path d="M50 60 H118 Q118 66 108 66 H50 Z" fill="#2F3A5A"' + S(3.5) + "/>" +
      '<g class="eyes">' + eyes + "</g>" + brows + mouth +
      /* the stopwatch is drawn last, so the cap's brim never covers its reading */
      '<rect x="128" y="22" width="12" height="10" rx="2" fill="#D9D9D9"' + S(3) + "/>" +
      '<circle cx="134" cy="58" r="28" fill="#FFFFFF"' + S(4.5) + "/>" +
      '<path d="M134 34 v5 M134 82 v-5' + (label ? "" : " M158 58 h-5 M110 58 h5") + '" fill="none"' + S(3) + "/>" +
      '<text class="lbl-grow" data-fitw="50" x="134" y="' + (58 + fs * 0.36).toFixed(1) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs + '" fill="' + INK + '">' + esc(label) + "</text>" + "</g>";
  } };

  /* ---------------- folding long library reports ([data-libfold]) ----------------
     The engine's data-fold knows only Node's internal frames. A ThreadSanitizer report repeats the same six frames inside
     the standard library under every access, which buried the clues panel 14 reads. On a wrapping terminal (one .tl
     block per line), each run of frames that sit inside the standard library becomes one marked line in the page's own
     words (.fold, never error red); the complete, unedited report follows in a "Show the full report" box. Text only:
     the captured output itself is not changed, and nothing claims output. */
  var LIBFRAME = /^\s+#\d+ .*(\/usr\/include\/|\(libstdc\+\+\.so)/;
  P.comic.ext(function () {
    var ts = document.querySelectorAll("pre.term[data-libfold]");
    for (var i = 0; i < ts.length; i++) { try { libfold(ts[i]); } catch (e) { L.report("libfold", e.message); } }
  });
  function libfold(t) {
    var tls = Array.prototype.slice.call(t.querySelectorAll(":scope > .tl"));
    if (!tls.length) { L.report("libfold", "terminal " + t.getAttribute("data-run") + " has no line blocks (add class wrap)"); return; }
    var full = t.textContent, run = [], folded = 0;
    if (t.getAttribute("data-libfold") === "rest") return foldRest(t, tls, full);
    function flush() {
      if (!run.length) return;
      var n = document.createElement("span"); n.className = "tl";
      n.innerHTML = '<span class="fold">    \u2026 ' + run.length + " frame" + (run.length > 1 ? "s" : "") + " inside the standard library (folded; full report below)</span>\n";
      run[0].parentNode.insertBefore(n, run[0]);
      run.forEach(function (r) { r.parentNode.removeChild(r); });
      folded += run.length; run = [];
    }
    tls.forEach(function (el) { if (LIBFRAME.test(el.textContent.replace(/\n$/, ""))) run.push(el); else flush(); });
    flush();
    if (folded && !(t.nextElementSibling && t.nextElementSibling.classList.contains("fold-full"))) {
      var d = document.createElement("details"); d.className = "fold-full";
      d.innerHTML = "<summary>Show the full report</summary><pre class=\"term\">" + esc(full) + "</pre>";
      t.parentNode.insertBefore(d, t.nextSibling);
    }
  }

  /* data-libfold="rest" (a compiler's template error): keep the message up to the first note that points back into the
     page's own file (with its source and caret lines), fold every later line except the closing "N errors generated."
     into one marked line, and put the complete message in the box after the terminal. */
  function foldRest(t, tls, full) {
    var own = (t.getAttribute("data-run") || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var mark = new RegExp("^" + own + ":\\d+:\\d+: note:"), cut = -1;
    for (var i = 0; i < tls.length; i++) {
      if (mark.test(tls[i].textContent)) { cut = i + 1; while (cut < tls.length && /^\s+(\d+\s*)?\|/.test(tls[cut].textContent)) cut++; break; }
    }
    if (cut < 0) { L.report("libfold", "no note pointing at " + t.getAttribute("data-run")); return; }
    var last = tls.length - 1; while (last > cut && !/errors? generated/.test(tls[last].textContent)) last--;
    var end = last > cut ? last : tls.length, n = end - cut;
    if (n < 2) return;
    var note = document.createElement("span"); note.className = "tl";
    note.innerHTML = '<span class="fold">\u2026 ' + n + " more lines: follow-on errors and notes from inside the standard library (folded; full message below)</span>\n";
    tls[cut].parentNode.insertBefore(note, tls[cut]);
    for (var k = cut; k < end; k++) tls[k].parentNode.removeChild(tls[k]);
    var d = document.createElement("details"); d.className = "fold-full";
    d.innerHTML = "<summary>Show the full message</summary><pre class=\"term\">" + esc(full) + "</pre>";
    t.parentNode.insertBefore(d, t.nextSibling);
  }

  /* ---------------- the ticket rail ---------------- */
  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-cookrail]");
    for (var i = 0; i < boxes.length; i++) {
      try { mount(boxes[i]); } catch (e) { L.report("cookrail", e.message); }
    }
  });

  function mount(box) {
    var id = box.getAttribute("data-cookrail");
    var m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) { L.report("cookrail:" + id, "no capture for " + m.program); return; }
    var real = L.shown(prog), steps = m.steps;
    var labels = m.labels || ["A", "B"], lanes = m.lanes || ["Cook A", "Cook B"];
    /* parity: every screen is a prefix of the real one, and the last screen is the whole of it */
    function text(o) { return o.length ? o.join("\n") + "\n" : ""; }
    var ok = steps.every(function (s) { return real.indexOf(text(s.output || [])) === 0; }) && text(steps[steps.length - 1].output || []) === real;
    if (!ok) L.report("cookrail:" + id, "parity failed against " + m.program);
    var par = box.querySelector(".controls .parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }

    var rail = box.querySelector(".rail");
    var head = '<div class="rail-row rail-head">' +
      '<div class="rail-lane"><svg class="char sm" data-char="kitchenhand" data-label="' + esc(labels[0]) + '"></svg><b>' + esc(lanes[0]) + '</b><span class="hand">in her head: <code data-hand="0"></code></span></div>' +
      '<div class="rail-book"><svg viewBox="0 0 80 64" aria-hidden="true"><rect x="10" y="6" width="60" height="52" rx="5" fill="#FFF6CC" stroke="#111" stroke-width="3"/><path d="M40 6 V58" stroke="#111" stroke-width="3"/><path d="M18 20 h14 M18 30 h14 M48 20 h14 M48 30 h14" stroke="#111" stroke-width="2.5"/></svg><b>NOTEBOOK</b><code class="book-now" data-book></code></div>' +
      '<div class="rail-lane"><svg class="char sm" data-char="kitchenhand" data-label="' + esc(labels[1]) + '"></svg><b>' + esc(lanes[1]) + '</b><span class="hand">in her head: <code data-hand="1"></code></span></div>' +
      "</div>";
    var rows = "";
    steps.forEach(function (s, k) {
      if (s.who == null) return;
      /* the ticket number is the step number, the same as "Step N of M" and the text version's row */
      var card = '<div class="ticket"><span class="tno">' + (k + 1) + "</span>" + s.act + "</div>";
      rows += '<div class="rail-row rail-step" data-k="' + k + '">' +
        '<div class="rail-lane">' + (s.who === 0 ? card : "") + "</div>" +
        '<div class="rail-book"><code>' + esc(s.book) + "</code></div>" +
        '<div class="rail-lane">' + (s.who === 1 ? card : "") + "</div></div>";
    });
    rail.innerHTML = head + rows;
    rail.setAttribute("data-reserve", "");   // the rail grows step by step: keep its tallest height so the buttons stay put
    L.drawCast(rail);
    var stepRows = rail.querySelectorAll(".rail-step"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), hands = rail.querySelectorAll("[data-hand]"), bookNow = rail.querySelector("[data-book]");

    function render(st, announce) {
      var s = steps[st.step], prevBook = st.step > 0 ? steps[st.step - 1].book : s.book;
      for (var r = 0; r < stepRows.length; r++) {
        var k = +stepRows[r].getAttribute("data-k");
        stepRows[r].hidden = k > st.step;
        stepRows[r].classList.toggle("now", k === st.step);
        if (k === st.step) stepRows[r].setAttribute("data-now", ""); else stepRows[r].removeAttribute("data-now");
        var bc = stepRows[r].querySelector(".rail-book code");
        var changed = k > 0 && steps[k].book !== steps[k - 1].book;
        bc.classList.toggle("changed", changed);
        bc.textContent = steps[k].book + (changed ? " new" : "");
      }
      for (var h = 0; h < hands.length; h++) hands[h].textContent = (s.heads && s.heads[h] !== "" && s.heads[h] != null) ? s.heads[h] : "nothing yet";
      bookNow.textContent = s.book;
      bookNow.classList.toggle("changed", s.book !== prevBook);
      var o = s.output || [];
      out.innerHTML = o.length ? o.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". Notebook says " + s.book + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + (s.who == null ? "start" : esc(lanes[s.who])) + "</td><td>" + s.note + "</td><td>" +
        esc(lanes[0]) + ": " + esc(s.heads[0] || "nothing") + "; " + esc(lanes[1]) + ": " + esc(s.heads[1] || "nothing") + "</td><td>" + esc(s.book) + "</td></tr>";
    }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
