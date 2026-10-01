/* Go book, chapter 24 ("Helpers and Batons") additions. Classic deferred script; loads after comic-cast.js.

   1. data-char="kitchenhand": a small kitchen helper (one goroutine); promoted to comic-critters.js, no longer defined here.
      Attributes: data-label = the number on its apron (up to 3 characters, default "1");
                  data-state = "idle" (default, arms down) | "busy" (stirring a pot) | "done" (holds up a plate with a tick).

   2. data-char="mailcarrier": Rosa, the mail carrier who runs the channels (original to this chapter).
      Attributes: data-mood = "happy" (default) | "worried"; data-prop = "letter" (default, raises an envelope) |
                  "flag" (raises the red "no more mail" flag, for close) | "none".

   3. [data-chanstep]: a channel stepper. The sender, the channel (a baton handoff zone when cap is 0, or a mailbox
      with cap slots) and the receiver, step by step, beside the program with the next line marked.
      Model: { "program": "handoff.go", "cap": 0,
               "left":  {"name": "helper", "char": "kitchenhand", "label": "1"},     // char: any cast name
               "right": {"name": "main",   "char": "courier"},
               "lenPattern": "(\\d+) of (\\d+)",      // optional: printed lines that report len and cap
               "steps": [ {"line": 6,                 // the NEXT line to run (null at the end)
                           "L": "run" | "send" | "recv" | "done" | "new" | "dead" | "idle", "R": ...,   // what each one is doing
                           "slots": ["card"],         // mailbox contents, front first (cap > 0)
                           "hand": "soup",            // the baton passing right now (cap 0)
                           "output": ["..."],         // the whole screen so far
                           "note": "HTML" } ] }
      Parity (any failure turns the badge bad and calls L.report): the last step's output equals the real run, every
      step's output is a prefix of it, no step holds more than cap letters, every line number exists, and every new
      printed line matching lenPattern reports exactly the slots shown in that step and the model's cap.
      Keyboard: the shared stepper (buttons, arrow keys, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch24.js loaded before comic.js"); return; }
  var esc = L.esc, S = L.stroke, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* The kitchen helper (data-char="kitchenhand") now lives in comic-critters.js; this page loads it. */

  /* ---------------- Rosa, the mail carrier ---------------- */
  L.cast.mailcarrier = { vb: "0 0 160 200", draw: function (el) {
    var worried = el.getAttribute("data-mood") === "worried", prop = el.getAttribute("data-prop") || "letter";
    var SKIN = "#B9805A", SHIRT = "#7FB2FF", NAVY = "#24407A", BAG = "#A0662B";
    var out = '<g class="bob">' +
      // legs and shoes
      '<path d="M68 168 V186 M92 168 V186" fill="none"' + S(7) + "/>" +
      '<ellipse cx="64" cy="190" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="96" cy="190" rx="13" ry="6" fill="' + INK + '"/>' +
      // shorts
      '<path d="M54 150 H106 V172 H84 L80 160 L76 172 H54 Z" fill="' + NAVY + '"' + S(4) + "/>" +
      // shirt
      '<path d="M48 108 Q48 96 62 94 H98 Q112 96 112 108 V154 H48 Z" fill="' + SHIRT + '"' + S(4) + "/>" +
      '<path d="M70 94 L80 108 L90 94" fill="#FFFFFF"' + S(3) + "/>" +
      // bag strap and bag
      '<path d="M100 96 L58 150" fill="none" stroke="' + BAG + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M100 96 L58 150" fill="none"' + S(1.5) + "/>" +
      '<rect x="30" y="134" width="48" height="36" rx="6" fill="' + BAG + '"' + S(4) + "/>" +
      '<path d="M30 146 H78" fill="none"' + S(3) + "/>" +
      '<rect x="38" y="126" width="22" height="12" fill="#FFFFFF"' + S(2.5) + ' transform="rotate(-8 49 132)"/>' +
      // head, curly hair
      '<circle cx="80" cy="66" r="27" fill="' + SKIN + '"' + S(4) + "/>" +
      '<g fill="' + INK + '"><circle cx="56" cy="64" r="8"/><circle cx="104" cy="64" r="8"/><circle cx="58" cy="78" r="7"/><circle cx="102" cy="78" r="7"/></g>' +
      // cap with an envelope badge
      '<path d="M54 52 Q56 30 80 28 Q104 30 106 52 Z" fill="' + NAVY + '"' + S(4) + "/>" +
      '<path d="M50 54 Q80 46 116 56 Q118 62 108 60 Q80 54 52 60 Z" fill="' + INK + '"/>' +
      '<rect x="71" y="34" width="18" height="12" fill="#FFFFFF"' + S(2) + '/><path d="M71 34 L80 41 L89 34" fill="none"' + S(2) + "/>" +
      // face
      '<g class="eyes">' + dot(70, 68, 4.5) + dot(90, 68, 4.5) + "</g>" +
      (worried ? '<path d="M64 58 l10 -3 M96 58 l-10 -3" fill="none"' + S(3) + '/><path d="M72 84 q8 -6 16 0" fill="none"' + S(3.5) + "/>"
               : '<path d="M70 80 q10 9 20 0" fill="none"' + S(3.5) + "/>");
    // left arm resting on the bag
    out += '<path d="M50 108 Q38 124 46 138" fill="none"' + S(6) + '/><circle cx="46" cy="138" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    if (prop === "flag") {
      out += '<path d="M110 106 Q128 92 130 70" fill="none"' + S(6) + "/>" +
        '<path d="M130 82 V20" fill="none"' + S(4) + "/>" +
        '<path d="M130 22 H156 V46 H130 Z" fill="#FF5A4E"' + S(3.5) + "/>" +
        '<circle cx="130" cy="72" r="7" fill="' + SKIN + '"' + S(3) + "/>";
    } else if (prop === "letter") {
      out += '<path d="M110 106 Q128 92 130 70" fill="none"' + S(6) + "/>" +
        '<g transform="rotate(-10 132 56)"><rect x="114" y="44" width="38" height="26" fill="#FFFFFF"' + S(3.5) + '/><path d="M114 44 L133 59 L152 44" fill="none"' + S(3) + "/></g>" +
        '<circle cx="130" cy="72" r="7" fill="' + SKIN + '"' + S(3) + "/>";
    } else {
      out += '<path d="M110 108 Q122 124 114 140" fill="none"' + S(6) + '/><circle cx="114" cy="140" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- the channel stepper ---------------- */
  var WORDS = { run: "▶ running", send: "⏸ waiting to send", recv: "⏸ waiting to receive", done: "✓ finished", "new": "· not started yet", dead: "✗ stuck forever", idle: "· not doing this now" };
  var CLS = { send: "wait", recv: "wait", done: "done", dead: "dead" };

  function mount(box) {
    var id = box.getAttribute("data-chanstep"), el = document.getElementById(id);
    if (!el) { L.report("chanstep:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), prog = L.program(m.program);
    if (!prog) return;
    var cap = m.cap || 0, lines = prog.src.replace(/\n$/, "").split("\n"), real = L.shown(prog), ok = true, why = [];
    var realLines = real.replace(/\n$/, "").split("\n");
    function bad(msg) { ok = false; why.push(msg); L.report("chanstep:" + id, msg); }
    var lenRe = m.lenPattern ? new RegExp(m.lenPattern) : null, prevOut = 0;
    m.steps.forEach(function (s, i) {
      var o = s.output || [];
      for (var k = 0; k < o.length; k++) if (o[k] !== realLines[k]) { bad("step " + (i + 1) + ": screen line " + (k + 1) + " is not in the real run of " + m.program); break; }
      if ((s.slots || []).length > cap) bad("step " + (i + 1) + " holds " + s.slots.length + " letters but cap is " + cap);
      if (s.line != null && (s.line < 1 || s.line > lines.length)) bad("step " + (i + 1) + ": no line " + s.line);
      if (lenRe) for (var n = prevOut; n < o.length; n++) {
        var mm = lenRe.exec(o[n]);
        if (mm && (Number(mm[1]) !== (s.slots || []).length || Number(mm[2]) !== cap)) bad("step " + (i + 1) + ": the run printed '" + o[n] + "' but the picture shows " + (s.slots || []).length + " of " + cap);
      }
      prevOut = Math.max(prevOut, o.length);
    });
    var last = m.steps[m.steps.length - 1].output || [];
    if ((last.length ? last.join("\n") + "\n" : "") !== real) bad("the last step's screen is not the real output of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program + (lenRe ? ", including every len and cap it printed" : "") : "Does not match the real run: " + why[0]; par.classList.toggle("bad", !ok); }

    function who(side, w) {
      return '<div class="cs-who" data-side="' + side + '"><svg class="char sm" data-char="' + esc(w.char || "courier") + '"' + (w.label ? ' data-label="' + esc(w.label) + '"' : "") +
        (w.attrs ? " " + w.attrs : "") + '></svg><span class="name">' + esc(w.name) + '</span><span class="st"></span></div>';
    }
    var wrap = box.querySelector(".cs-wrap");
    wrap.innerHTML = '<div class="cs-grid"><ol class="cs-code" aria-label="The program, ' + esc(m.program) + '">' + lines.map(function (l) { return "<li>" + (L.highlight(l) || " ") + "</li>"; }).join("") + "</ol>" +
      '<div class="cs-stage" aria-hidden="true">' + who("L", m.left) +
      '<div class="cs-box"><span class="title">' + (cap ? "MAILBOX · cap " + cap : "HANDOFF ZONE · cap 0") + "</span>" +
      (cap ? '<div class="cs-slots"></div>' : '<div class="cs-hand"></div>') + '<span class="meta"></span></div>' +
      who("R", m.right) + "</div></div>";
    L.drawCast(wrap);
    var lis = wrap.querySelectorAll(".cs-code li"), whoL = wrap.querySelector('[data-side="L"]'), whoR = wrap.querySelector('[data-side="R"]');
    var slotsEl = wrap.querySelector(".cs-slots"), handEl = wrap.querySelector(".cs-hand"), meta = wrap.querySelector(".cs-box .meta");
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function setWho(node, state) {
      node.className = "cs-who " + (CLS[state] || "");
      node.querySelector(".st").textContent = WORDS[state] || state;
    }
    function boxText(s) {
      if (cap) return (s.slots || []).length ? "[" + s.slots.join(", ") + "] (" + s.slots.length + " of " + cap + ")" : "empty (0 of " + cap + ")";
      return s.hand ? "passing " + s.hand : "nothing passing";
    }
    var lastStep = -1;
    function render(st, announce) {
      var s = m.steps[st.step], forward = st.step === lastStep + 1;
      lastStep = st.step;
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      setWho(whoL, s.L || "new"); setWho(whoR, s.R || "new");
      if (cap) {
        var sl = s.slots || [], h = "";
        for (var j = 0; j < cap; j++) h += j < sl.length ? '<span class="cs-slot' + (j === 0 ? " front" : "") + '">' + esc(sl[j]) + "</span>" : '<span class="cs-slot empty">empty</span>';
        slotsEl.innerHTML = h;
        meta.textContent = "len " + sl.length + " of cap " + cap + (sl.length ? " · front: " + sl[0] : "");
      } else {
        handEl.innerHTML = s.hand ? '<span class="cs-baton' + (forward && announce ? " go" : "") + '">' + esc(s.hand) + " →</span>" : '<span class="none">no baton</span>';
        meta.textContent = s.hand ? "both meet: handoff!" : "nothing can wait here";
      }
      var o = s.output || [];
      out.innerHTML = o.length ? o.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + m.left.name + ": " + (WORDS[s.L] || s.L) + ". " + m.right.name + ": " + (WORDS[s.R] || s.R) + ". Channel: " + boxText(s) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    if (L.hangLines) L.hangLines(lis);
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line == null ? "end" : s.line) + "</td><td>" + esc(WORDS[s.L] || s.L) + "</td><td>" + esc(boxText(s)) + "</td><td>" + esc(WORDS[s.R] || s.R) + "</td><td>" + s.note + "</td></tr>";
    }).join("");
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-chanstep]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._csMounted) continue; boxes[i]._csMounted = true; try { mount(boxes[i]); } catch (e) { L.report("chanstep", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
