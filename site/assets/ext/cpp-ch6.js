/* C++ book, chapter 6 extension: "Lifts and Racetracks".
   Everything here reads the captured runs in data/cpp-ch6.js; nothing claims output that was typed by hand.
     - Lev the lift operator (cast member "liftop"): a lift attendant with a pillbox hat and a brass lever. He stands
       for switch: data-mood = normal | happy | surprised | worried.
     - Rita the referee (cast member "referee"): striped shirt, whistle and a flag. She stands for a loop condition,
       checked before every lap. data-flag = go | stop | none (the flag carries the word GO or STOP, never colour alone).
     - [data-lift="MODEL_ID"] the lift stepper for a switch statement. Each floor of the shaft is one case label; the
       cab shows where the program is. A floor without break has no stop bar, so the cab keeps going down.
       Model: { "program": "x.cpp", "value": "floor is 3",
                "floors": [{ "label": "case 1:", "does": "html", "brk": true }],
                "steps": [{ "line": 5, "at": "top" | 0..n-1 | "out", "output": ["screen line"], "note": "html" }] }
     - [data-track="MODEL_ID"] the racetrack stepper for a loop. Four stations around an oval: 1 start (the starting
       value), 2 the referee (the condition), 3 the lap (the body), 4 the lap counter (the change); the exit road leaves
       from the referee. Model: { "program": "x.cpp", "stations": { "start": {"code": "int lap{1}"}, "ref": {...},
                "body": {...}, "step": {...}, "exit": {...} },
                "steps": [{ "line": 4, "at": "start|ref|body|step|exit", "flag": "go|stop", "vars": {"lap": "1"},
                            "laps": 0, "output": [], "note": "html" }] }
     Both steppers check every step's screen against the real run (each must be a prefix; the last must equal it) and
     show a parity badge. "line" is the NEXT line to run (null at the end), as in the engine's tracer.
     (The data-same-src badge on this page is the engine's.) */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch6.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------------- Lev, the lift operator ---------------- */
  function face(mood, cx, cy) {
    var e, m;
    if (mood === "happy") { e = '<path d="M' + (cx - 16) + " " + (cy - 2) + " q6 -8 12 0 M" + (cx + 4) + " " + (cy - 2) + ' q6 -8 12 0" fill="none"' + S(4) + "/>"; m = '<path d="M' + (cx - 11) + " " + (cy + 14) + ' q11 10 22 0" fill="none"' + S(4) + "/>"; }
    else if (mood === "surprised") { e = '<circle cx="' + (cx - 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx + 10) + '" cy="' + (cy - 2) + '" r="6" fill="#fff"' + S(3) + '/><circle cx="' + (cx - 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + (cy - 1) + '" r="2.6" fill="' + INK + '"/>'; m = '<circle cx="' + cx + '" cy="' + (cy + 17) + '" r="5" fill="' + INK + '"/>'; }
    else if (mood === "worried") { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4" fill="' + INK + '"/><path d="M' + (cx - 18) + " " + (cy - 10) + " l11 -3 M" + (cx + 18) + " " + (cy - 10) + ' l-11 -3" fill="none"' + S(3) + "/>"; m = '<path d="M' + (cx - 10) + " " + (cy + 19) + ' q10 -8 20 0" fill="none"' + S(4) + "/>"; }
    else { e = '<circle cx="' + (cx - 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/><circle cx="' + (cx + 10) + '" cy="' + cy + '" r="4.2" fill="' + INK + '"/>'; m = '<path d="M' + (cx - 9) + " " + (cy + 15) + ' q9 6 18 0" fill="none"' + S(3.5) + "/>"; }
    return '<g class="eyes">' + e + "</g>" + m;
  }
  L.cast.liftop = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal";
    return '<g class="bob">' +
      /* the lever panel he stands beside */
      '<rect x="112" y="92" width="38" height="70" rx="5" fill="#E8C66A"' + S(3.5) + "/>" +
      '<path d="M131 104 v42" fill="none"' + S(3) + '/><circle cx="131" cy="104" r="3" fill="' + INK + '"/><circle cx="131" cy="146" r="3" fill="' + INK + '"/>' +
      '<path d="M131 132 L118 112" fill="none"' + S(5) + '/><circle cx="117" cy="110" r="6" fill="#B00020"' + S(2.5) + "/>" +
      /* legs and shoes */
      '<rect x="52" y="150" width="16" height="28" rx="3" fill="#3A2440"' + S(3.5) + '/><rect x="78" y="150" width="16" height="28" rx="3" fill="#3A2440"' + S(3.5) + "/>" +
      '<ellipse cx="58" cy="182" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="88" cy="182" rx="14" ry="6" fill="' + INK + '"/>' +
      /* maroon jacket with gold braid */
      '<path d="M36 156 L42 108 Q73 96 104 108 L110 156 Z" fill="#7A2E46"' + S(4) + "/>" +
      '<path d="M73 104 V156" fill="none"' + S(3) + "/>" +
      '<path d="M44 120 H102 M42 136 H104" fill="none" stroke="#E8C66A" stroke-width="4"/>' +
      '<circle cx="66" cy="114" r="3" fill="#E8C66A"' + S(1.8) + '/><circle cx="80" cy="114" r="3" fill="#E8C66A"' + S(1.8) + "/>" +
      /* left arm down with a white glove; right arm on the lever */
      '<path d="M42 116 Q28 130 32 150" fill="none"' + S(6) + '/><circle cx="32" cy="152" r="7" fill="#FFFFFF"' + S(3) + "/>" +
      '<path d="M104 116 Q114 116 116 112" fill="none"' + S(6) + '/><circle cx="117" cy="110" r="7" fill="#FFFFFF"' + S(3) + "/>" +
      /* head */
      '<circle cx="73" cy="74" r="28" fill="#D9A27A"' + S(4) + "/>" +
      '<path d="M47 70 q-4 -14 8 -20 M99 70 q4 -14 -8 -20" fill="none"' + S(3) + "/>" +
      /* pillbox hat with a strap */
      '<rect x="50" y="34" width="46" height="20" rx="4" fill="#7A2E46"' + S(4) + "/>" +
      '<path d="M50 40 H96" fill="none" stroke="#E8C66A" stroke-width="4"/>' +
      '<path d="M54 54 Q73 64 92 54" fill="none"' + S(2.5) + "/>" +
      face(mood, 73, 76) + "</g>";
  } };

  /* ---------------- Rita, the referee ---------------- */
  L.cast.referee = { vb: "0 0 170 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", flag = el.getAttribute("data-flag") || "go";
    var stripes = "";
    for (var x = 46; x < 104; x += 12) stripes += '<path d="M' + x + ' 104 V156" fill="none" stroke="' + INK + '" stroke-width="6"/>';
    var flagArt = flag === "none" ? "" :
      '<path d="M112 26 V118" fill="none"' + S(4) + "/>" +
      (flag === "stop"
        /* 56x38 flag, 24-unit word: the word carries the state, so it must stay readable (12px+ at .sm) */
        ? '<rect x="112" y="26" width="56" height="38" rx="2" fill="#FF5A4E"' + S(3) + '/><text x="140" y="54" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" fill="' + INK + '">STOP</text>'
        : '<rect x="112" y="26" width="56" height="38" rx="2" fill="#C9F2D9"' + S(3) + '/><text x="140" y="54" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" fill="' + INK + '">GO</text>');
    return '<g class="bob">' +
      '<rect x="54" y="152" width="16" height="26" rx="3" fill="' + INK + '"/><rect x="80" y="152" width="16" height="26" rx="3" fill="' + INK + '"/>' +
      '<ellipse cx="60" cy="182" rx="14" ry="6" fill="' + INK + '"/><ellipse cx="90" cy="182" rx="14" ry="6" fill="' + INK + '"/>' +
      '<path d="M38 158 L44 108 Q75 96 106 108 L112 158 Z" fill="#FFFFFF"' + S(4) + "/>" + stripes +
      '<path d="M38 158 L44 108 Q75 96 106 108 L112 158 Z" fill="none"' + S(4) + "/>" +
      /* whistle on a cord */
      '<path d="M64 104 Q75 124 86 104" fill="none"' + S(2) + '/><rect x="70" y="120" width="14" height="8" rx="3" fill="#D9D9D9"' + S(2.5) + "/>" +
      /* arms: left down, right up holding the flag pole */
      '<path d="M44 116 Q30 130 34 150" fill="none"' + S(6) + '/><circle cx="34" cy="152" r="6" fill="#8C5A3C"' + S(3) + "/>" +
      '<path d="M106 116 Q114 110 113 96" fill="none"' + S(6) + '/><circle cx="113" cy="94" r="6" fill="#8C5A3C"' + S(3) + "/>" +
      flagArt +
      /* head with a black cap */
      '<circle cx="75" cy="74" r="28" fill="#8C5A3C"' + S(4) + "/>" +
      '<path d="M48 66 Q50 42 75 42 Q100 42 102 66 Z" fill="' + INK + '"/><path d="M96 62 H109" fill="none"' + S(6) + "/>" +
      '<path d="M50 82 q-8 10 2 16 M100 82 q8 10 -2 16" fill="none"' + S(3) + "/>" +
      face(mood === "normal" ? "normal" : mood, 75, 78) + "</g>";
  } };

  /* ---------------- shared stepper frame ---------------- */
  var BTNS = '<div class="controls"><div class="btns">' +
    '<button type="button" class="btn" data-act="prev">Back <kbd>←</kbd></button>' +
    '<button type="button" class="btn btn-go" data-act="next">Next step <kbd>→</kbd></button>' +
    '<button type="button" class="btn" data-act="play" aria-pressed="false"><span>Play</span> <kbd>Space</kbd></button>' +
    '<button type="button" class="btn" data-act="reset">Reset <kbd>R</kbd></button>' +
    '</div><span class="parity"></span></div>';

  function frame(box, m, picClass, extraHead) {
    var prog = L.program(m.program);
    if (!prog) { L.report("cpp-ch6", "no capture for " + m.program); return null; }
    var lines = prog.src.replace(/\n$/, "").split("\n");
    box.insertAdjacentHTML("beforeend",
      '<div class="xs-split"><ol class="tr-code"></ol><div class="screen"><p class="label">SCREEN</p><pre></pre></div></div>' +
      '<div class="' + picClass + '"></div><p class="narration"></p>' + BTNS +
      '<p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every step</summary><table class="transcript"><thead><tr><th>Step</th><th>Next line</th>' + extraHead + "<th>What happens</th><th>Screen</th></tr></thead><tbody></tbody></table></details>");
    var code = box.querySelector(".tr-code");
    code.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    // parity: each step's screen is a prefix of the real one, and the last equals it
    var real = L.shown(prog), ok = true;
    m.steps.forEach(function (s, i) {
      var txt = s.output.length ? s.output.join("\n") + "\n" : "";
      if (i === m.steps.length - 1 ? txt !== real : real.indexOf(s.output.join("\n")) !== 0) ok = false;
    });
    var par = box.querySelector(".parity");
    par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run of " + m.program;
    par.classList.toggle("bad", !ok);
    if (!ok) L.report("cpp-ch6", "parity failed for " + m.program);
    return { lis: code.querySelectorAll("li"), out: box.querySelector(".screen pre"), note: box.querySelector(".narration"),
      live: box.querySelector("[aria-live]"), pic: box.querySelector("." + picClass), tbody: box.querySelector(".transcript tbody") };
  }
  function paintCommon(f, m, st, announce, prevLen) {
    var s = m.steps[st.step];
    for (var k = 0; k < f.lis.length; k++) f.lis[k].classList.toggle("now", s.line === k + 1);
    var o = s.output;
    f.out.innerHTML = o.length ? o.map(function (l, i) { return '<span class="' + (announce && i >= prevLen ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
    f.note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
    if (f.live && announce) f.live.textContent = "Step " + (st.step + 1) + ". " + f.note.textContent.replace(/^Step \d+ of \d+/, "");
    return o.length;
  }
  function lineCell(s) { return s.line ? String(s.line) : "end"; }
  function screenCell(s) { return s.output.length ? "<code>" + s.output.map(esc).join("<br>") + "</code>" : "(empty)"; }

  /* ---------------- the lift (switch) ---------------- */
  function mountLift(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-lift")).textContent);
    var f = frame(box, m, "lift", "<th>Lift is at</th>"); if (!f) return;
    var n = m.floors.length;
    function where(at) { return at === "top" ? "the call button" : at === "out" ? "after the switch" : m.floors[at].label; }
    var rows = '<li class="lift-row lift-top" data-at="top"><span class="lift-cell"></span><span class="lift-door call"><b>CALL</b><code>' + esc(m.value) + '</code></span><span class="lift-does">The switch reads the value and sends the lift straight to the matching floor.</span><span class="lift-mark"></span></li>' +
      m.floors.map(function (fl, i) {
        return '<li class="lift-row" data-at="' + i + '"><span class="lift-cell"></span><span class="lift-door"><code>' + esc(fl.label) + "</code></span>" +
          '<span class="lift-does"><span>' + fl.does + "</span>" + (fl.brk ? '<span class="lift-brk">▬ STOP: <code>break</code></span>' : '<span class="lift-brk none">↓ no break: keeps going</span>') + '</span><span class="lift-mark"></span></li>';
      }).join("") +
      '<li class="lift-row lift-out" data-at="out"><span class="lift-cell"></span><span class="lift-door exit"><b>EXIT</b></span><span class="lift-does">After the switch: the line after its closing brace.</span><span class="lift-mark"></span></li>';
    f.pic.innerHTML = '<ol class="lift-shaft" aria-hidden="true">' + rows + '</ol>';
    var cab = document.createElement("span");
    cab.className = "lift-cab";
    cab.innerHTML = '<svg class="char" data-char="liftop" data-mood="normal"></svg>';
    L.drawCast(cab);
    var rowEls = f.pic.querySelectorAll(".lift-row"), prevLen = 0;
    f.tbody.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + lineCell(s) + "</td><td>" + esc(where(s.at)) + "</td><td>" + s.note + "</td><td>" + screenCell(s) + "</td></tr>"; }).join("");
    function render(st, announce) {
      var s = m.steps[st.step];
      var before = cab.parentNode ? cab.getBoundingClientRect().top : null;
      var seen = {};
      for (var j = 0; j <= st.step; j++) seen[String(m.steps[j].at)] = 1;
      for (var k = 0; k < rowEls.length; k++) {
        var at = rowEls[k].getAttribute("data-at"), here = at === String(s.at);
        rowEls[k].classList.toggle("here", here);
        rowEls[k].classList.toggle("seen", !here && !!seen[at] && at !== "top");
        rowEls[k].querySelector(".lift-mark").textContent = here ? "◀ HERE" : (seen[at] && at !== "top" ? "✓ visited" : "");
        if (here) rowEls[k].querySelector(".lift-cell").appendChild(cab);
      }
      var sv = cab.querySelector("svg");
      sv.setAttribute("data-mood", s.at === "out" && st.step === m.steps.length - 1 ? "happy" : (typeof s.at === "number" && !m.floors[s.at].brk ? "surprised" : "normal"));
      L.drawCast(cab);
      if (announce && before !== null && L.motionOn()) {
        var dy = before - cab.getBoundingClientRect().top;
        if (dy) { cab.style.transition = "none"; cab.style.transform = "translateY(" + dy + "px)"; void cab.offsetWidth; cab.style.transition = "transform var(--dur-move) var(--ease-in-out)"; cab.style.transform = ""; }
      }
      prevLen = paintCommon(f, m, st, announce, prevLen);
    }
    var rn = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre" });
    rn.reset(m.steps.length);
    if (n === 0) L.report("lift", "no floors");
  }

  /* ---------------- the racetrack (loops) ---------------- */
  var SPOTS = { start: [70, 150], ref: [300, 44], body: [530, 150], step: [300, 256], exit: [96, 34] };
  /* where the runner stands relative to each station badge, so it never covers the number */
  var RUN_OFF = { start: [-32, -110], ref: [26, -26], body: [-32, -110], step: [30, -50], exit: [-14, 20] };
  var TITLES = { start: "1 · START", ref: "2 · REFEREE", body: "3 · THE LAP", step: "4 · LAP COUNTER", exit: "EXIT" };
  var ROLE = { start: "the starting value, set once", ref: "the condition, checked before every lap", body: "the body: the work done on each lap", step: "the change that moves toward the finish", exit: "the line after the loop" };
  function trackSvg() {
    var badge = function (id, n) { var p = SPOTS[id]; return '<g class="trk-badge" data-st="' + id + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="22"/><text x="' + p[0] + '" y="' + (p[1] + 10) + '" text-anchor="middle">' + n + "</text></g>"; };
    return '<svg class="trk-svg" viewBox="0 0 600 300" aria-hidden="true">' +
      '<rect x="4" y="4" width="592" height="292" rx="22" fill="#C9F2D9" stroke="' + INK + '" stroke-width="4"/>' +
      '<ellipse cx="300" cy="150" rx="230" ry="106" fill="none" stroke="' + INK + '" stroke-width="46"/>' +
      '<ellipse cx="300" cy="150" rx="230" ry="106" fill="none" stroke="#E9C08F" stroke-width="38"/>' +
      '<ellipse cx="300" cy="150" rx="230" ry="106" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="12 12"/>' +
      /* start line, chequered */
      '<g><rect x="51" y="142" width="38" height="8" fill="' + INK + '"/><rect x="51" y="150" width="38" height="8" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2"/></g>' +
      /* the referee's gate across the top */
      '<path d="M300 18 V70" fill="none" stroke="' + INK + '" stroke-width="5" stroke-dasharray="8 6"/>' +
      /* the exit road from the gate */
      '<path class="trk-exitroad" d="M276 36 Q200 18 128 30" fill="none" stroke="' + INK + '" stroke-width="5" stroke-dasharray="10 8"/>' +
      '<path class="trk-exitroad" d="M132 20 l-12 10 l14 6" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      /* arrows showing the direction of travel */
      '<path d="M190 58 l18 -8 l-6 16" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M410 242 l-18 8 l6 -16" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      badge("start", 1) + badge("ref", 2) + badge("body", 3) + badge("step", 4) +
      '<g class="trk-badge exit" data-st="exit"><rect x="44" y="16" width="70" height="34" rx="6"/><text x="79" y="42" text-anchor="middle">EXIT</text></g>' +
      /* the lap board in the infield */
      '<rect x="190" y="104" width="220" height="96" rx="10" fill="#FFFFFF" stroke="' + INK + '" stroke-width="4"/>' +
      '<text class="trk-board-k" x="300" y="130" text-anchor="middle">LAP BOARD</text>' +
      '<text class="trk-board" x="300" y="166" text-anchor="middle"></text>' +
      '<text class="trk-board-s" x="300" y="190" text-anchor="middle"></text>' +
      '<g class="trk-runner"><svg x="0" y="0" width="64" height="82" viewBox="' + ((L.cast.mechanic && L.cast.mechanic.vb) || "0 0 140 190") + '"></svg></g>' +
      "</svg>";
  }
  function mountTrack(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-track")).textContent);
    var f = frame(box, m, "trk", "<th>Runner is at</th><th>Values</th>"); if (!f) return;
    var order = ["start", "ref", "body", "step", "exit"];
    f.pic.innerHTML = '<div class="trk-stage">' + trackSvg() +
      '<div class="trk-ref"><svg class="char" data-char="referee" data-flag="none"></svg><p class="trk-call"></p></div></div>' +
      '<ol class="trk-legend">' + order.map(function (id) {
        var st = m.stations[id] || {};
        return '<li data-st="' + id + '"><b>' + TITLES[id] + "</b><code>" + esc(st.code || "") + "</code><small>" + (st.role || ROLE[id]) + '</small><span class="trk-mark"></span></li>';
      }).join("") + "</ol>";
    L.drawCast(f.pic);
    var svg = f.pic.querySelector(".trk-svg"), runner = svg.querySelector(".trk-runner"), inner = runner.querySelector("svg");
    var board = svg.querySelector(".trk-board"), boardS = svg.querySelector(".trk-board-s"), refEl = f.pic.querySelector(".trk-ref svg"), call = f.pic.querySelector(".trk-call");
    var items = f.pic.querySelectorAll(".trk-legend li"), badges = svg.querySelectorAll(".trk-badge"), prevLen = 0;
    function vals(s) { return s.board || Object.keys(s.vars || {}).map(function (k) { return k + " = " + s.vars[k]; }).join(", ") || "(empty)"; }
    f.tbody.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + lineCell(s) + "</td><td>" + esc(TITLES[s.at]) + (s.flag ? " (" + (s.flag === "go" ? "GO" : "STOP") + ")" : "") + "</td><td><code>" + esc(vals(s)) + "</code></td><td>" + s.note + "</td><td>" + screenCell(s) + "</td></tr>"; }).join("");
    function render(st, announce) {
      var s = m.steps[st.step], p0 = SPOTS[s.at] || SPOTS.start, off = RUN_OFF[s.at] || [0, 0], p = [p0[0] + off[0], p0[1] + off[1]];
      runner.setAttribute("transform", "translate(" + p[0] + " " + p[1] + ")");
      runner.style.transform = "translate(" + p[0] + "px, " + p[1] + "px)";
      runner.classList.toggle("glide", !!announce && L.motionOn());
      inner.innerHTML = L.guide({ mood: s.at === "exit" ? "happy" : s.flag === "stop" ? "surprised" : "focus", mouth: s.at === "exit" ? "shout" : "smile", arms: s.at === "exit" ? "cheer" : "down" });
      board.textContent = vals(s);
      boardS.textContent = "laps finished: " + (s.laps || 0);
      for (var k = 0; k < items.length; k++) {
        var id = items[k].getAttribute("data-st"), here = id === s.at;
        items[k].classList.toggle("here", here);
        items[k].querySelector(".trk-mark").textContent = here ? (id === "ref" && s.flag ? (s.flag === "go" ? "◀ HERE: says GO" : "◀ HERE: says STOP") : "◀ HERE") : "";
      }
      for (var b = 0; b < badges.length; b++) badges[b].classList.toggle("here", badges[b].getAttribute("data-st") === s.at);
      refEl.setAttribute("data-flag", s.at === "ref" && s.flag ? s.flag : "none");
      refEl.setAttribute("data-mood", s.flag === "stop" ? "surprised" : "normal");
      L.drawCast(refEl.parentNode);
      call.innerHTML = s.at === "ref" && s.flag ? (s.flag === "go" ? "<b>GO!</b> <code>" + esc(m.stations.ref.code) + "</code> is <b>true</b>" : "<b>STOP!</b> <code>" + esc(m.stations.ref.code) + "</code> is <b>false</b>") : "Rita checks the condition at the gate.";
      prevLen = paintCommon(f, m, st, announce, prevLen);
    }
    var rn = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre, .trk-call" });
    rn.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var i, els = document.querySelectorAll("[data-lift]");
    for (i = 0; i < els.length; i++) { try { mountLift(els[i]); } catch (e) { L.report("lift", e.message); } }
    els = document.querySelectorAll("[data-track]");
    for (i = 0; i < els.length; i++) { try { mountTrack(els[i]); } catch (e) { L.report("track", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
