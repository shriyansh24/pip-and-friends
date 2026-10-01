/* Go book, chapter 20 ("Cutters and Gumballs") additions. Classic deferred script; loads after comic-cast.js.

   [data-gumball]: an iterator as a gumball machine you crank. The left side is the iterator function (the machine);
   the right side is the loop body (Scoot's hand). Each step of the stepper is one moment of the real program: the
   machine drops a gumball and calls yield, the loop body runs, and yield's answer (true or false) travels back.
   Model: { "program": "crank.go", "balls": ["red", "blue", "green", "pink"],
            "steps": [ { "line": 11,                 // the line of the program that just ran (highlighted)
                         "run": "machine",            // who is running now: "main", "machine" or "body"
                         "chute": "red",              // the gumball travelling down the chute (or null)
                         "hand": "red",               // the gumball in Scoot's hand (or null)
                         "eaten": ["red"],            // gumballs the loop body has already handled
                         "answer": "true",            // yield's answer on the way back ("true", "false" or null)
                         "output": ["machine: drops red"],   // the whole screen so far
                         "note": "HTML sentence" } ] }
   Gumballs still in the globe are worked out from the model: every ball not yet dropped.
   Parity: every step's output must be a prefix of the real stdout (line by line), and the last step's output must equal
   it exactly; otherwise the badge turns bad and L.report() fires. Every gumball carries its colour name as a word, so
   nothing is shown by colour alone. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch20.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111";
  var FILL = { red: "#FFB0B0", blue: "#A8D4FF", green: "#A6E8BF", pink: "#FFC4EC", yellow: "#FFE27A" };

  function txt(x, y, t, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") + '" font-family="' + (o.font || "Comic Neue, sans-serif") +
      '" font-weight="' + (o.weight || 700) + '" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>";
  }
  function rect(x, y, w, h, fill, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.rx == null ? 10 : o.rx) + '" fill="' + fill + '" stroke="' + INK +
      '" stroke-width="' + (o.sw || 3) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") + "/>";
  }
  function ball(x, y, r, color, o) {
    o = o || {};
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (FILL[color] || "#FFFFFF") + '" stroke="' + INK + '" stroke-width="3"' +
      (o.dash ? ' stroke-dasharray="5 4"' : "") + "/>" + '<path d="M' + (x - r * 0.45) + " " + (y - r * 0.35) + " q" + (r * 0.2) + " " + (-r * 0.3) + " " + (r * 0.5) + ' -0.2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
      txt(x, y + 5, color, Math.min(15, Math.max(12, r * 0.62)));
  }
  function arrow(x1, y1, x2, y2, on, dash) {
    var g = Math.atan2(y2 - y1, x2 - x1), H = 12;
    var a = (x2 - H * Math.cos(g - 0.45)).toFixed(1) + " " + (y2 - H * Math.sin(g - 0.45)).toFixed(1), b = (x2 - H * Math.cos(g + 0.45)).toFixed(1) + " " + (y2 - H * Math.sin(g + 0.45)).toFixed(1);
    var sw = on ? 5 : 3;
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" stroke="' + INK + '" stroke-width="' + sw + '"' + (dash ? ' stroke-dasharray="7 6"' : "") + ' fill="none"/>' +
      '<path d="M' + a + " L" + x2 + " " + y2 + " L" + b + '" stroke="' + INK + '" stroke-width="' + sw + '" fill="none" stroke-linejoin="round"/>';
  }
  function setParity(box, ok, okText) {
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? okText : "Does not match the real run"; par.classList.toggle("bad", !ok); }
  }

  function dropped(m, k) {
    // every ball that has reached the chute at or before step k has left the globe
    var gone = {};
    for (var i = 0; i <= k; i++) { var s = m.steps[i]; if (s.chute) gone[s.chute] = 1; if (s.hand) gone[s.hand] = 1; (s.eaten || []).forEach(function (b) { gone[b] = 1; }); }
    return gone;
  }

  // Two layouts: wide (machine left, hand right, roads across) and narrow for phones (machine on top, hand below,
  // roads running down and up), so nothing has to scroll sideways.
  function draw(m, k, narrow) {
    var s = m.steps[k], mOn = s.run === "machine", bOn = s.run === "body";
    var title = { font: "Bangers, sans-serif", weight: 400 }, mono = { font: "JetBrains Mono, monospace", weight: 800 };
    // --- the machine (iterator), drawn around x = 150 ---
    var mach = txt(150, 24, "THE MACHINE: the iterator", 18, title);
    mach += '<circle cx="150" cy="118" r="82" fill="#F4FAFF" stroke="' + INK + '" stroke-width="' + (mOn ? 6 : 4) + '"' + (mOn ? "" : ' stroke-dasharray="10 6"') + "/>";
    var gone = dropped(m, k), left = m.balls.filter(function (b) { return !gone[b]; });
    var spots = [[118, 92], [180, 92], [112, 150], [174, 150], [146, 122]];
    left.forEach(function (b, i) { var p = spots[i % spots.length]; mach += ball(p[0], p[1], 27, b); });
    if (!left.length) mach += txt(150, 124, "(empty)", 16);
    mach += '<path d="M92 192 L208 192 L222 272 L78 272 Z" fill="#FFD60A" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    // crank handle: turned while the machine runs
    mach += '<circle cx="150" cy="226" r="16" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3"/>';
    mach += '<path d="M150 226 L' + (mOn ? "170 210" : "150 202") + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>';
    mach += rect(186, 242, 46, 34, "#FFFFFF", { rx: 6 });
    if (s.chute) mach += ball(209, 300, 22, s.chute);
    mach += txt(110, 300, mOn ? "RUNNING" : "waiting", 16, title);
    // --- the loop body (Scoot's hand), drawn in a box at (410, 44) ---
    var body = txt(530, 24, "THE LOOP BODY: Scoot's hand", 18, title);
    body += rect(410, 44, 240, 196, bOn ? "#FFF6CC" : "#FFFFFF", { sw: bOn ? 6 : 4, rx: 16, dash: bOn ? null : "10 6" });
    body += '<path d="M470 196 q60 40 120 0" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
    body += '<path d="M470 196 q-10 -14 6 -18 M590 196 q10 -14 -6 -18" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
    if (s.hand) body += ball(530, 160, 32, s.hand);
    else body += txt(530, 160, "(hand empty)", 16);
    body += txt(530, 74, bOn ? "RUNNING" : "waiting", 16, title);
    var eaten = (s.eaten || []);
    body += txt(530, 270, "handled: " + (eaten.length ? eaten.join(", ") : "none yet"), 16);
    // --- the two roads between them ---
    var callOn = bOn && s.hand && !s.answer, ansOn = !!s.answer;
    var callTxt = "yield(" + (s.hand || "v") + ")", ansTxt = s.answer ? "returns " + s.answer : "returns ...";
    var mainTxt = s.done ? "main carries on after the loop" : "main starts the for range loop";
    var out, W, H;
    if (!narrow) {
      W = 680; H = 330;
      out = mach + body;
      out += arrow(252, 112, 400, 112, callOn, !callOn);
      out += rect(276, 82, 100, 26, callOn ? "#FFD60A" : "#FFFFFF", { rx: 6, sw: 2 }) + txt(326, 101, callTxt, 14, mono);
      out += arrow(400, 168, 252, 168, ansOn, !ansOn);
      out += rect(266, 174, 120, 26, ansOn ? "#FFD60A" : "#FFFFFF", { rx: 6, sw: 2 }) + txt(326, 193, ansTxt, 14, mono);
      if (s.run === "main") out += rect(290, 286, 340, 34, "#DDE8FF", { rx: 8 }) + txt(460, 309, mainTxt, 16);
    } else {
      W = 340; H = 724;   // one size for every step (the "main" strip stays empty when main is not running), so the buttons never move
      out = '<g transform="translate(20 0)">' + mach + "</g>";
      out += '<g transform="translate(-360 392)">' + body + "</g>";
      out += arrow(150, 330, 150, 392, callOn, !callOn);
      out += rect(36, 348, 106, 26, callOn ? "#FFD60A" : "#FFFFFF", { rx: 6, sw: 2 }) + txt(89, 367, callTxt, 13, mono);
      out += arrow(190, 392, 190, 330, ansOn, !ansOn);
      out += rect(198, 348, 132, 26, ansOn ? "#FFD60A" : "#FFFFFF", { rx: 6, sw: 2 }) + txt(264, 367, ansTxt, 13, mono);
      if (s.run === "main") out += rect(10, 680, 320, 34, "#DDE8FF", { rx: 8 }) + txt(170, 703, mainTxt, 15);
    }
    return '<svg viewBox="0 0 ' + W + " " + H + '" class="gb-svg' + (narrow ? " narrow" : "") + '" aria-hidden="true">' + out + "</svg>";
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-gumball")).textContent);
    var p = L.program(m.program); if (!p) return;
    var real = p.stdout.replace(/\n$/, "").split("\n"), ok = true;
    m.steps.forEach(function (s, i) {
      s.output.forEach(function (l, j) { if (real[j] !== l) { ok = false; L.report("gumball:" + m.program, "step " + (i + 1) + ": line " + (j + 1) + " is '" + l + "' but the real run printed '" + real[j] + "'"); } });
    });
    var last = m.steps[m.steps.length - 1].output;
    if ((last.length ? last.join("\n") + "\n" : "") !== p.stdout) { ok = false; L.report("gumball:" + m.program, "the last step's screen is not the real output"); }
    setParity(box, ok, "Every crank matches the real run of " + m.program);

    var lines = p.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".gb-code"), stage = box.querySelector(".gb-stage"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = lines.map(function (l, i) { return '<li data-n="' + (i + 1) + '">' + L.highlight(l) + "</li>"; }).join("");
    var lis = code.querySelectorAll("li");
    L.hangLines(lis);   // wrapped lines continue under their first character (DESIGN_SYSTEM.md section 6)
    var WHO = { main: "main", machine: "the machine (iterator)", body: "the loop body" };
    function render(rs, announce) {
      var s = m.steps[rs.step];
      stage.innerHTML = draw(m, rs.step, stage.clientWidth < 560);
      for (var i = 0; i < lis.length; i++) lis[i].classList.toggle("now", s.line === i + 1);
      var cur = s.line ? lis[s.line - 1] : null;
      if (cur && code.scrollHeight > code.clientHeight) code.scrollTop = Math.max(0, code.scrollTop + cur.getBoundingClientRect().top - code.getBoundingClientRect().top - code.clientHeight / 2);
      out.innerHTML = s.output.length ? s.output.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (rs.step + 1) + ". Line " + s.line + ". Running: " + WHO[s.run] + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>line " + s.line + ": <code>" + esc(lines[s.line - 1].trim()) + "</code></td><td>" + esc(WHO[s.run]) + "</td><td>" + s.note + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    var rn = L.runner(box, m.steps.length, render, { reserve: true });
    rn.reset(m.steps.length);
    var timer = null;
    root.addEventListener("resize", function () { if (timer) root.clearTimeout(timer); timer = root.setTimeout(function () { render(rn.state(), false); }, 150); });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-gumball]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._gbMounted) continue; boxes[i]._gbMounted = true; try { mount(boxes[i]); } catch (e) { L.report("gumball", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
