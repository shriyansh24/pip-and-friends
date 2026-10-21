/* C++ book, chapter 8 extension: "Nicknames and Egg Cartons".
   Everything here reads the captured runs in data/cpp-ch8.js; nothing claims output that was typed by hand.
     - [data-carton="MODEL_ID"] the egg-carton stepper for a growing std::vector. The carton has one cup per unit of
       capacity; eggs fill the cups from the left (size). When a push_back finds no empty cup, the vector gets a bigger
       carton, moves every egg across and throws the old carton away: the stepper draws the old carton, dashed and
       labelled "thrown away", above the new one.
       Model: { "program": "grow.cpp",
                "steps": [{ "line": 7, "eggs": ["62"], "cap": 1, "moved": true, "output": ["size 1, capacity 1"], "note": "html" }] }
       Checks: every step's screen is a prefix of the real run and the last equals it; and whenever a step's last screen
       line reads "size N, capacity C", N and C must equal the step's egg count and cup count. One parity badge says both.
       "line" is the NEXT line to run (null at the end), as in the engine's tracer. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch8.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  var BTNS = '<div class="controls"><div class="btns">' +
    '<button type="button" class="btn" data-act="prev">Back <kbd>←</kbd></button>' +
    '<button type="button" class="btn btn-go" data-act="next">Next step <kbd>→</kbd></button>' +
    '<button type="button" class="btn" data-act="play" aria-pressed="false"><span>Play</span> <kbd>Space</kbd></button>' +
    '<button type="button" class="btn" data-act="reset">Reset <kbd>R</kbd></button>' +
    '</div><span class="parity"></span></div>';

  function cartonHtml(eggs, cap, cls, title) {
    var cups = "";
    for (var i = 0; i < cap; i++) {
      var has = i < eggs.length;
      cups += '<li class="cup' + (has ? " full" : "") + '"><span class="egg">' + (has ? esc(eggs[i]) : "") + '</span><span class="cup-i">' + i + "</span></li>";
    }
    if (!cap) cups = '<li class="no-cups">no cups yet</li>';
    return '<div class="carton ' + cls + '"><p class="carton-h">' + title + '</p><ol class="cups">' + cups + "</ol></div>";
  }

  function mountCarton(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-carton")).textContent);
    var prog = L.program(m.program);
    if (!prog) { L.report("cpp-ch8", "no capture for " + m.program); return; }
    var lines = prog.src.replace(/\n$/, "").split("\n");
    box.insertAdjacentHTML("beforeend",
      '<div class="ct-split"><ol class="tr-code"></ol><div class="screen"><p class="label">SCREEN</p><pre></pre></div></div>' +
      '<div class="ct-stage" aria-hidden="true" data-reserve></div><p class="narration"></p>' + BTNS +
      '<p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every step</summary><table class="transcript"><thead><tr><th>Step</th><th>Next line</th><th>Carton</th><th>What happens</th><th>Screen</th></tr></thead><tbody></tbody></table></details>');
    var code = box.querySelector(".tr-code");
    code.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    if (L.hangLines) L.hangLines(code.querySelectorAll("li"));   /* wrapped lines continue under their own indent */
    var real = L.shown(prog), ok = true, why = "";
    m.steps.forEach(function (s, i) {
      var txt = s.output.length ? s.output.join("\n") + "\n" : "";
      if (i === m.steps.length - 1 ? txt !== real : real.indexOf(txt) !== 0) { ok = false; why = "screen of step " + (i + 1); }
      var last = s.output[s.output.length - 1] || "", mm = /^size (\d+), capacity (\d+)$/.exec(last);
      if (mm && (Number(mm[1]) !== s.eggs.length || Number(mm[2]) !== s.cap)) { ok = false; why = "carton of step " + (i + 1); }
    });
    var par = box.querySelector(".parity");
    par.textContent = ok ? "Matches the real run of " + m.program + " (screen, size and capacity)" : "Does not match the real run of " + m.program;
    par.classList.toggle("bad", !ok);
    if (!ok) L.report("cpp-ch8", "carton parity failed for " + m.program + ": " + why);
    var lis = code.querySelectorAll("li"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"),
      live = box.querySelector("[aria-live]"), stage = box.querySelector(".ct-stage"), prevLen = 0;
    function cartonWords(s) { return s.cap ? s.eggs.length + " of " + s.cap + " cups full" + (s.moved ? " (new carton)" : "") : "no carton yet"; }
    box.querySelector(".transcript tbody").innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? s.line : "end") + "</td><td>" + esc(cartonWords(s)) + (s.eggs.length ? ": <code>" + s.eggs.map(esc).join(" ") + "</code>" : "") + "</td><td>" + s.note + "</td><td>" +
        (s.output.length ? "<code>" + s.output.map(esc).join("<br>") + "</code>" : "(empty)") + "</td></tr>";
    }).join("");
    function render(st, announce) {
      var s = m.steps[st.step], prev = st.step > 0 ? m.steps[st.step - 1] : null;
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      var html = "";
      if (s.moved && prev && prev.cap) {
        html += cartonHtml(prev.eggs, prev.cap, "old", "OLD CARTON · " + prev.cap + " cup" + (prev.cap === 1 ? "" : "s") + " · thrown away") +
          '<p class="move-note">every egg is moved into a bigger carton ↓</p>';
      }
      html += cartonHtml(s.eggs, s.cap, "now" + (s.moved ? " fresh" : ""), s.cap ? "CARTON · size " + s.eggs.length + " · capacity " + s.cap : "NO CARTON YET · size 0 · capacity 0");
      stage.innerHTML = html;
      /* the new carton enters with the engine's .fx-in: CSS decides between pop-in, a reduced-motion fade, or nothing */
      if (announce) { var nw = stage.querySelector(".carton.now .cups"); if (nw) nw.classList.add("fx-in"); }
      var o = s.output;
      out.innerHTML = o.length ? o.map(function (l, i) { return '<span class="' + (announce && i >= prevLen ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + cartonWords(s) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var rn = L.runner(box, m.steps.length, render, { reserve: true });   /* keeps the buttons still while cartons are added */
    rn.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-carton]");
    for (var i = 0; i < boxes.length; i++) { try { mountCarton(boxes[i]); } catch (e) { L.report("cpp-ch8", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
