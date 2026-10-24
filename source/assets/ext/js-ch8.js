/* JavaScript book, chapter 8 additions ("Rooms with Windows"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch8.html:
   1. [data-out="prog.js#N"]: an element inside a hand-drawn picture whose text is line N of a captured run's output.
      It is filled from the capture (never typed). A .parity[data-out-badge] in the same panel says whether every
      line was found. If the element already holds text, that text must equal the captured line.
   2. The loop duel ([data-duel]): the var loop and the let loop stepped side by side, lap by lap. Each side draws its
      `i` name tags (one shared tag for var, a new tag for each lap for let) and the timer cues on Kit's clipboard, each
      joined by a line to the tag it will read when it finally runs. The model's steps are a teaching model; the final
      screen of each side must equal the real run of its program (parity badge), and every step's screen must be a
      prefix of it. Keyboard: the engine's stepper (arrows, Space, R). Text version: a transcript table.
   3. The verdict board ([data-verdict]): one-line programs, each with three buttons: "Throws", "Prints undefined",
      "Prints a value". The right verdict is derived from the program's real run (non-zero exit: throws; last output
      line "undefined": prints undefined; anything else: prints a value), never typed. After a pick, the card shows the
      real last line and why. A parity badge confirms that every card's program was captured and classified. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch8.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function screenOf(p) { return p.screen != null ? p.screen : p.stdout; }
  function lines(s) { return s.replace(/\n$/, "") === "" ? [] : s.replace(/\n$/, "").split("\n"); }

  /* ---------- 1. values inside pictures ---------- */
  function outs() {
    var els = document.querySelectorAll("[data-out]"), byPanel = new Map();
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-out").split("#"), prog = L.program(spec[0]), ok = false;
      var ls = prog ? lines(screenOf(prog)) : [], n = Number(spec[1]);
      if (prog && n >= 1 && n <= ls.length) {
        var want = ls[n - 1], have = e.textContent.trim();
        if (have && have !== want.trim()) ok = false; else { e.textContent = want; ok = true; }
      }
      if (!ok) L.report("data-out", "'" + e.textContent + "' is not line " + spec[1] + " of " + spec[0]);
      var panel = e.closest("section") || document.body, st = byPanel.get(panel) || { n: 0, bad: 0 };
      st.n++; if (!ok) st.bad++; byPanel.set(panel, st);
    }
    byPanel.forEach(function (st, panel) {
      var b = panel.querySelector(".parity[data-out-badge]"); if (!b) return;
      b.textContent = st.bad ? st.bad + " value(s) in the picture do not match the real run" : "Every value in the picture comes from a real run";
      b.classList.toggle("bad", !!st.bad);
    });
  }

  /* ---------- 2. the loop duel ---------- */
  function sv(tag, attrs, parent) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; }
  function txt(parent, x, y, s, cls, anchor) { var t = sv("text", { x: x, y: y, "class": cls }, parent); if (anchor) t.setAttribute("text-anchor", anchor); t.textContent = s; return t; }

  /* side state: { line, boxes: [{label, val, changed?}], cards: [boxIndex...], ran: n (cards already run), out: [...] } */
  function drawSide(svg, s, kind) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var W = 320, H = 250, r = L.rng(kind === "var" ? 3 : 9);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    txt(svg, 10, 22, kind === "var" ? "ONE SHARED i TAG" : "A NEW i TAG EACH LAP", "d-head");
    var n = s.boxes.length, bw = n === 1 ? 180 : 92, gap = 10, total = n * bw + (n - 1) * gap, x0 = (W - total) / 2, pos = [];
    s.boxes.forEach(function (b, i) {
      var x = x0 + i * (bw + gap), y = 36;
      pos.push(x + bw / 2);
      sv("rect", { x: x, y: y, width: bw, height: 66, rx: 9, "class": "d-box" + (b.changed ? " changed" : "") }, svg);
      sv("path", { d: L.wobRect(r, x, y, bw, 66), "class": "d-wob" + (b.changed ? " changed" : "") }, svg);
      sv("circle", { cx: x + 11, cy: y + 11, r: 4, "class": "d-hole" }, svg); // the tag's punched hole
      txt(svg, x + bw / 2 + 4, y + 22, n === 1 ? b.label : b.label.replace(/'s tag$/, ""), "d-lab", "middle");
      txt(svg, x + bw / 2, y + 52, "i = " + b.val, "d-val", "middle");
      if (b.changed) txt(svg, x + bw - 6, y - 4, "new", "d-new", "end");
    });
    if (!n) txt(svg, W / 2, 76, "(no i yet)", "d-lab", "middle");
    // the clipboard of cues
    sv("rect", { x: 14, y: 150, width: W - 28, height: 92, rx: 10, "class": "d-clip" }, svg);
    sv("rect", { x: W / 2 - 30, y: 143, width: 60, height: 14, rx: 4, "class": "d-clamp" }, svg);
    txt(svg, 24, 170, "CUES WAITING", "d-small");
    var cw = 84, cg = 10, ct = 3 * cw + 2 * cg, cx0 = (W - ct) / 2;
    s.cards.forEach(function (bi, k) {
      var x = cx0 + k * (cw + cg), y = 182, done = k < (s.ran || 0), mid = x + cw / 2;
      if (!done) sv("path", { d: "M" + mid + " " + y + " C " + mid + " 130, " + pos[bi] + " 140, " + pos[bi] + " 104", "class": "d-link" }, svg);
      sv("rect", { x: x, y: y, width: cw, height: 50, rx: 7, "class": "d-card" + (done ? " done" : "") }, svg);
      txt(svg, mid, y + 20, "cue " + (k + 1), "d-small", "middle");
      txt(svg, mid, y + 40, done ? "✓ ran" : "log(i)", "d-code", "middle");
    });
    if (!s.cards.length) txt(svg, W / 2, 214, "(empty)", "d-small", "middle");
  }

  function mountDuel(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-duel")).textContent);
    var progs = { "var": L.program(m["var"]), "let": L.program(m["let"]) };
    if (!progs["var"] || !progs["let"]) return;
    var ok = true;
    ["var", "let"].forEach(function (k) {
      var real = lines(screenOf(progs[k])), last = m.steps[m.steps.length - 1][k].out;
      if (last.join("\n") !== real.join("\n")) ok = false;
      m.steps.forEach(function (st) { st[k].out.forEach(function (l, i) { if (real[i] !== l) ok = false; }); });
    });
    if (!ok) L.report("duel", "the duel's screens do not match the real runs of " + m["var"] + " and " + m["let"]);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Both screens match the real runs" : "Does not match the real runs"; par.classList.toggle("bad", !ok); }
    var sides = {};
    ["var", "let"].forEach(function (k) {
      var col = box.querySelector('[data-side="' + k + '"]');
      var src = lines(progs[k].src);
      col.querySelector("ol.d-code").innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
      sides[k] = { col: col, lis: col.querySelectorAll("ol.d-code li"), svg: col.querySelector("svg"), out: col.querySelector(".screen pre"), src: src };
    });
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function render(st, announce) {
      var s = m.steps[st.step];
      ["var", "let"].forEach(function (k) {
        var side = sides[k], ss = s[k];
        for (var i = 0; i < side.lis.length; i++) side.lis[i].classList.toggle("now", ss.line === i + 1);
        drawSide(side.svg, ss, k);
        side.svg.setAttribute("aria-label", (k === "var" ? "var loop: " : "let loop: ") + (ss.boxes.length ? ss.boxes.map(function (b) { return b.label + " holds " + b.val; }).join(", ") : "no i yet") + ". " + (ss.cards.length ? ss.cards.length + " cue(s) on the clipboard, each reading " + ss.cards.map(function (bi) { return ss.boxes[bi].label; }).join(", ") : "no cues yet") + ".");
        side.out.innerHTML = ss.out.length ? ss.out.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      });
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      function cell(k) { var ss = s[k]; return (ss.line ? "line " + ss.line : "timers") + "; " + (ss.boxes.map(function (b) { return esc(b.label) + " = " + esc(String(b.val)); }).join(", ") || "no i") + "; cues: " + (ss.cards.length || "none") + "; screen: <code>" + (ss.out.length ? esc(ss.out.join(" / ")) : "(nothing)") + "</code>"; }
      return "<tr><td>" + (i + 1) + "</td><td>" + s.note + "</td><td>" + cell("var") + "</td><td>" + cell("let") + "</td></tr>";
    }).join("");
    var rn = L.runner(box, m.steps.length, render, { reserve: true });
    rn.reset(m.steps.length);
  }

  /* ---------- 3. the verdict board ---------- */
  var VERDICTS = { "throws": "It throws", "undefined": "It prints undefined", "value": "It prints a value" };
  function verdictOf(p) {
    if (p.exit !== 0) return "throws";
    var out = lines(screenOf(p));
    return out[out.length - 1] === "undefined" ? "undefined" : "value";
  }
  function lastLine(p) {
    if (p.exit !== 0) { var mm = /^(\w*Error[^\n]*)$/m.exec(p.stderr); return mm ? mm[1] : "(the program stopped with an error)"; }
    var out = lines(screenOf(p)); return out[out.length - 1];
  }
  function mountVerdict(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-verdict")).textContent);
    var grid = box.querySelector(".vd-grid"), bad = 0, tally = box.querySelector(".vd-tally"), answered = 0, right = 0;
    var cards = m.cards.map(function (c, i) {
      var p = L.program(c.program); if (!p) { bad++; return null; }
      var v = verdictOf(p);
      if (c.expect && c.expect !== v) { bad++; L.report("verdict", c.program + " was expected to be '" + c.expect + "' but its real run says '" + v + "'"); }
      var el = document.createElement("div");
      el.className = "vd-card";
      el.innerHTML = '<p class="vd-no">Card ' + (i + 1) + '<small>' + esc(c.program) + '</small></p><pre class="code">' + L.highlight(p.src.replace(/\n$/, "")) + "</pre>" +
        '<div class="vd-btns" role="group" aria-label="Card ' + (i + 1) + ': what happens?">' +
        Object.keys(VERDICTS).map(function (k) { return '<button type="button" class="path-btn vd-btn" data-v="' + k + '" aria-pressed="false">' + VERDICTS[k] + '<span class="vd-mine"> \u2190 my pick</span></button>'; }).join("") +
        '</div><div class="vd-result" aria-live="polite"></div>';
      grid.appendChild(el);
      return { el: el, p: p, v: v, c: c, done: false };
    });
    function reveal(card, pick) {
      if (card.done) return;
      card.done = true; answered++;
      var good = pick === null ? null : pick === card.v;
      if (good) right++;
      [].forEach.call(card.el.querySelectorAll(".vd-btn"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-v") === pick ? "true" : "false");
        b.setAttribute("aria-disabled", "true");
        if (b.getAttribute("data-v") === card.v) b.classList.add("vd-real");
      });
      card.el.classList.add(good === null ? "shown" : good ? "right" : "wrong");
      card.el.querySelector(".vd-result").innerHTML = '<p class="vd-verdict">' + (good === null ? "Answer: " : good ? "✓ Right: " : "✗ Not quite. Real run: ") + VERDICTS[card.v].replace(/^It /, "it ") + '.</p><p class="vd-real-line">Last line of the real run: <samp class="' + (card.v === "throws" ? "err" : "") + '">' + esc(lastLine(card.p)) + "</samp></p><p>" + card.c.why + "</p>";
      if (tally) tally.textContent = answered + " of " + cards.length + " cards answered, " + right + " right.";
    }
    cards.forEach(function (card) {
      if (!card) return;
      card.el.addEventListener("click", function (e) {
        var b = e.target.closest(".vd-btn"); if (!b) return;
        reveal(card, b.getAttribute("data-v"));
      });
    });
    var all = box.querySelector("[data-vd-all]");
    if (all) all.addEventListener("click", function () { cards.forEach(function (c) { if (c) reveal(c, null); }); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " card(s) do not match their real runs" : "All " + cards.length + " verdicts come from real runs"; par.classList.toggle("bad", !!bad); }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = cards.map(function (c, i) { return c ? "<tr><td>" + (i + 1) + "</td><td><code>" + esc(c.p.src.replace(/\n$/, "").replace(/\n/g, " ")) + "</code></td><td>" + VERDICTS[c.v] + "</td><td><code>" + esc(lastLine(c.p)) + "</code></td></tr>" : ""; }).join("");
  }

  P.comic.ext(function () {
    try { outs(); } catch (e) { L.report("data-out", e.message); }
    var d = document.querySelectorAll("[data-duel]");
    for (var i = 0; i < d.length; i++) { try { mountDuel(d[i]); } catch (e) { L.report("duel", e.message); } }
    var v = document.querySelectorAll("[data-verdict]");
    for (var j = 0; j < v.length; j++) { try { mountVerdict(v[j]); } catch (e) { L.report("verdict", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
