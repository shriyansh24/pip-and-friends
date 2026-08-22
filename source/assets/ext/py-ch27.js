/* Chapter 27 extension: "Waiters and Open Doors" (concurrency, and programs that talk to the world).
   Adds, registered with the comic engine:
   (1) cast: waiter    a café waiter with a bow tie and an apron. data-pose = tray (default), phone (on hold), run (speed
                       lines), cheer; data-variant = a | b | c (vest colour, so several waiters can be told apart; each also
                       gets a different name badge); data-label = the badge text (<= 6 characters).
             door      the kitchen door with its "one at a time" turnstile: the GIL.
             jar       the tally jar, with a number on its label: data-label.
             station   one station of the shop counter picture: data-kind = counter | printer | desk | bell | door.
   (2) [data-timeline] the event-loop timeline: one row per task plus a row for the waiter (the event loop). Each step is
                       one moment of a real asyncio run: which task runs, which are asleep until when, and the line it
                       printed. Parity: every printed line is the next line of the program's real output, and the screen
                       at the last step equals that output exactly. The clock times are a teaching model, labelled as such;
                       they come from the sleep lengths in the program's source, which the model quotes (checked).
   The stepper uses the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fills a
   text-version table. States are told apart by words, marks (▶ zz ✓ !) and border style, never by colour alone.
   Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch27.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function txt(x, y, t, size, extra) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (size || 16) + '" fill="' + INK + '"' + (extra || "") + ">" + esc(t) + "</text>"; }
  function title(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="' + (size || 20) + '" letter-spacing="1.5" fill="' + INK + '">' + esc(t) + "</text>"; }
  function limb(x1, y1, x2, y2, skin) {
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + S(8) + '/><path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="8" fill="' + skin + '"' + S(3) + "/>";
  }

  /* ---------------- cast: the waiter ---------------- */
  var VEST = { a: "#7FB2FF", b: "#FFD60A", c: "#C9F2D9" }, SKIN = { a: "#F3C9A1", b: "#C68E5F", c: "#E8B38A" }, BADGE = { a: "ANA", b: "BEN", c: "CY" };
  C.waiter = { vb: "0 0 170 200", draw: function (el) {
    var v = el.getAttribute("data-variant") || "a", vest = VEST[v] || VEST.a, skin = SKIN[v] || SKIN.a;
    var pose = el.getAttribute("data-pose") || "tray", label = (el.getAttribute("data-label") || BADGE[v] || "ANA").slice(0, 6);
    var out = '<g class="bob">';
    if (pose === "run") out += '<path d="M6 96 h26 M2 118 h30 M10 140 h22" fill="none"' + S(3.5) + "/>";
    // legs and shoes
    out += '<path d="M64 150 L60 184 M92 150 L96 184" fill="none"' + S(9) + '/><path d="M64 150 L60 184 M92 150 L96 184" fill="none" stroke="#2B2B2B" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="188" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="100" cy="188" rx="13" ry="6" fill="' + INK + '"/>';
    // body: shirt, vest, apron
    out += '<path d="M46 156 L50 96 q28 -12 56 0 L110 156 z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M50 98 q28 -10 56 0 L104 128 L78 136 L52 128 z" fill="' + vest + '"' + S(3.5) + "/>" +
      '<path d="M56 128 h44 l6 32 h-56 z" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<path d="M78 100 v34" fill="none"' + S(2.5) + "/>" +
      '<rect x="80" y="101" width="42" height="21" rx="4" fill="#FFFFFF"' + S(2.5) + "/>" +
      // name badge at 16 units (12.2px at the 130px default); hidden by L.fitLabels() where the drawing is too small, and the captions name the waiter
      '<text class="lbl-deco" x="101" y="117" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16"' + (label.length > 4 ? ' textLength="38" lengthAdjust="spacingAndGlyphs"' : "") + ' fill="' + INK + '">' + esc(label) + "</text>";
    // head, hair, bow tie
    out += '<circle cx="78" cy="62" r="26" fill="' + skin + '"' + S(4) + "/>" +
      '<path d="M52 56 q4 -28 28 -26 q22 0 24 24 q-12 -10 -26 -10 q-16 0 -26 12 z" fill="#2B2B2B"' + S(3) + "/>" +
      '<g class="eyes"><circle cx="69" cy="62" r="3.5" fill="' + INK + '"/><circle cx="88" cy="62" r="3.5" fill="' + INK + '"/></g>' +
      (pose === "phone" ? '<path d="M70 76 h16" fill="none"' + S(3.5) + "/>" : '<path d="M68 73 q10 9 20 0" fill="none"' + S(3.5) + "/>") +
      '<path d="M66 92 l12 6 l12 -6 v12 l-12 -6 l-12 6 z" fill="' + INK + '"/>';
    // arms and props
    if (pose === "tray") {
      out += limb(52, 104, 34, 140, skin) + limb(104, 104, 134, 74, skin) +
        '<ellipse cx="136" cy="66" rx="32" ry="6" fill="#DDE8FF"' + S(3.5) + "/>" +
        '<path d="M114 62 q22 -34 44 0 z" fill="#FFFFFF"' + S(3.5) + '/><circle cx="136" cy="36" r="4" fill="#FFFFFF"' + S(3) + "/>";
    } else if (pose === "phone") {
      out += limb(52, 104, 34, 140, skin) + limb(104, 104, 104, 66, skin) +
        '<rect x="100" y="44" width="14" height="34" rx="5" fill="#2B2B2B"' + S(3) + "/>" +
        '<text x="140" y="44" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="20" letter-spacing="1" fill="' + INK + '">zzz</text>';
    } else if (pose === "cheer") {
      out += limb(52, 104, 26, 70, skin) + limb(104, 104, 130, 70, skin);
    } else { // run
      out += limb(52, 104, 26, 124, skin) + limb(104, 104, 136, 92, skin) +
        '<ellipse cx="146" cy="86" rx="20" ry="5" fill="#DDE8FF"' + S(3) + '/><rect x="136" y="70" width="18" height="14" rx="3" fill="#FFF6CC"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- cast: the kitchen door (the GIL) ---------------- */
  C.door = { vb: "0 0 190 200", draw: function () {
    return '<rect x="20" y="14" width="150" height="180" rx="6" fill="#F4F1EA"' + S(4) + "/>" +
      '<rect x="40" y="40" width="110" height="154" fill="#FFFFFF"' + S(4) + "/>" +
      '<circle cx="95" cy="96" r="22" fill="#DDE8FF"' + S(3.5) + '/><path d="M95 74 v44 M73 96 h44" fill="none"' + S(3) + "/>" +
      '<path d="M50 150 h90" fill="none"' + S(5) + '/><path d="M95 150 v40 M64 150 l-8 40 M126 150 l8 40" fill="none"' + S(4) + "/>" +
      '<rect x="44" y="18" width="102" height="20" rx="4" fill="#FFD60A"' + S(3) + "/>" +
      '<text class="lbl-deco" x="95" y="33" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="15" letter-spacing="1" fill="' + INK + '">ONE AT A TIME</text>';
  } };

  /* ---------------- cast: the tally jar (shared by threads; not Chapter 17's tip jar) ---------------- */
  C.jar = { vb: "0 0 140 170", draw: function (el) {
    var label = (el.getAttribute("data-label") || "0").slice(0, 4);
    return '<g class="bob"><rect x="36" y="10" width="68" height="16" rx="4" fill="#B9C7E3"' + S(3.5) + "/>" +
      '<path d="M30 30 q-8 0 -8 14 v100 q0 14 14 14 h68 q14 0 14 -14 v-100 q0 -14 -8 -14 z" fill="#FFFFFF" fill-opacity="0.9"' + S(4) + "/>" +
      '<circle cx="50" cy="140" r="9" fill="#FFD60A"' + S(2.5) + '/><circle cx="72" cy="146" r="9" fill="#FFD60A"' + S(2.5) + "/>" +
      '<rect x="34" y="62" width="72" height="44" rx="8" fill="#FFF6CC"' + S(3) + "/>" +
      title(70, 81, "TALLY", 17) + txt(70, 101, label, 18) +   // TALLY at 17: 12.6px at 104px wide
      '<path d="M40 44 q2 -6 8 -8" fill="none" stroke="#B9C7E3" stroke-width="4" stroke-linecap="round"/></g>';
  } };

  /* ---------------- cast: the shop counter stations ---------------- */
  C.station = { vb: "0 0 150 120", draw: function (el) {
    var k = el.getAttribute("data-kind") || "counter";
    if (k === "counter") return '<rect x="14" y="58" width="122" height="50" rx="6" fill="#FFD60A"' + S(4) + "/>" +
      '<path d="M8 58 h134" fill="none"' + S(5) + '/><rect x="30" y="20" width="44" height="30" rx="4" fill="#FFFFFF"' + S(3) + '/><path d="M38 30 h28 M38 40 h20" fill="none"' + S(2.5) + "/>" +
      '<path d="M96 52 q12 -26 24 0 z" fill="#DDE8FF"' + S(3) + '/><circle cx="108" cy="24" r="3" fill="' + INK + '"/>' + title(75, 92, "IN", 22);
    if (k === "printer") return '<rect x="24" y="50" width="102" height="56" rx="8" fill="#DDE8FF"' + S(4) + "/>" +
      '<path d="M44 52 V10 h62 v42" fill="#FFFFFF"' + S(3.5) + '/><path d="M54 22 h42 M54 32 h30 M54 42 h38" fill="none"' + S(2.5) + "/>" +
      '<rect x="40" y="70" width="70" height="8" rx="3" fill="' + INK + '"/>' + txt(75, 100, "stdout", 17);   // 17: 12.5px at 110px wide (was 15, 11px)
    if (k === "desk") return '<rect x="18" y="62" width="114" height="44" rx="6" fill="#FFE1E1"' + S(4) + "/>" +
      '<rect x="44" y="12" width="62" height="40" rx="6" fill="#FFFFFF"' + S(3.5) + '/><path d="M75 52 v10" fill="none"' + S(3.5) + "/>" +
      title(75, 42, "!", 30) + txt(75, 93, "stderr", 17);
    if (k === "bell") return '<path d="M44 86 q0 -50 31 -54 q31 4 31 54 z" fill="#FFD60A"' + S(4) + "/>" +
      '<rect x="34" y="86" width="82" height="12" rx="5" fill="#FFD60A"' + S(4) + '/><circle cx="75" cy="26" r="6" fill="#FFFFFF"' + S(3) + "/>" +
      txt(75, 74, "0", 26) + '<path d="M22 50 l-10 -6 M128 50 l10 -6 M20 70 h-12 M130 70 h12" fill="none"' + S(3) + "/>";
    return '<rect x="40" y="10" width="70" height="100" rx="4" fill="#F4F1EA"' + S(4) + "/>" +   // the back door
      '<rect x="50" y="20" width="50" height="34" rx="3" fill="#FFFFFF"' + S(3) + '/><circle cx="96" cy="70" r="5" fill="' + INK + '"/>' +
      '<path d="M112 66 h30 M130 54 l12 12 l-12 12" fill="none"' + S(4) + "/>";
  } };

  /* ---------------- (2) the event-loop timeline ---------------- */
  /* Model: { program, quote: [source fragments that must occur in the program], tasks: [{id, label}],
              steps: [{ t, loop, states: {taskId: "run" | "wait:<until>" | "done" | "todo" | "blocked"}, print?, note }] } */
  var WORD = { run: "▶ running", done: "✓ done", todo: "· not started", blocked: "! stuck in line" };
  function mountTimeline(box) {
    var m = model(box.getAttribute("data-timeline")), prog = L.program(m.program);
    if (!prog) return;
    var ok = true, real = L.shown(prog), lines = real.replace(/\n$/, "").split("\n");
    (m.quote || []).forEach(function (q) { if (prog.src.indexOf(q) < 0) { ok = false; L.report("timeline", "the model quotes " + q + ", which is not in " + m.program); } });
    var shown = [], steps = m.steps.map(function (s, i) {
      if (s.print != null) {
        (Array.isArray(s.print) ? s.print : [s.print]).forEach(function (p) {
          if (lines[shown.length] !== p) { ok = false; L.report("timeline", "step " + (i + 1) + " prints '" + p + "', but line " + (shown.length + 1) + " of the real run is '" + lines[shown.length] + "'"); }
          shown.push(p);
        });
      }
      return { t: s.t, loop: s.loop, states: s.states, note: s.note, output: shown.slice() };
    });
    var last = steps[steps.length - 1].output;
    if ((last.length ? last.join("\n") + "\n" : "") !== real) { ok = false; L.report("timeline", "the final screen does not equal the real run of " + m.program); }
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every printed line matches the real run of " + m.program : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var stage = box.querySelector(".tl-stage"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var maxT = Math.max.apply(null, m.steps.map(function (s) { return s.t; }).concat([1]));
    var ticks = ""; for (var k = 0; k <= maxT; k++) ticks += '<span style="left:' + (k / maxT * 100) + '%">' + k + " s</span>";
    stage.innerHTML = '<div class="tl-clock"><span class="tl-clock-label">clock</span><div class="tl-axis"><div class="tl-ticks">' + ticks + '</div><div class="tl-hand-track" aria-hidden="true"><div class="tl-hand"></div></div></div></div>' +
      '<div class="tl-row tl-loop"><span class="tl-name">the waiter<small>(event loop)</small></span><span class="tl-state"></span></div>' +
      m.tasks.map(function (t) { return '<div class="tl-row" data-task="' + esc(t.id) + '"><span class="tl-name">' + esc(t.label) + '</span><span class="tl-state"></span></div>'; }).join("");
    var hand = stage.querySelector(".tl-hand-track"), loopState = stage.querySelector(".tl-loop .tl-state");
    function stateWord(st) {
      if (!st) return WORD.todo;
      if (st.indexOf("wait:") === 0) return "zz asleep until " + esc(st.slice(5));
      return WORD[st] || esc(st);
    }
    function memory(s) { return m.tasks.map(function (t) { return t.label + ": " + stateWord(s.states[t.id]).replace(/^(▶|zz|✓|·|!) /, ""); }).join("; "); }
    var prevLen = 0;
    function render(si, announce) {
      var s = steps[si.step];
      hand.style.transform = "translateX(" + (s.t / maxT * 100) + "%)";
      loopState.innerHTML = esc(s.loop);
      m.tasks.forEach(function (t) {
        var row = stage.querySelector('[data-task="' + t.id + '"]'), st = s.states[t.id] || "todo";
        row.className = "tl-row is-" + st.split(":")[0];
        if (st === "run") row.setAttribute("data-now", ""); else row.removeAttribute("data-now");
        row.querySelector(".tl-state").innerHTML = stateWord(st);
      });
      out.innerHTML = s.output.length ? s.output.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = s.output.length;
      note.innerHTML = '<span class="count">Step ' + (si.step + 1) + " of " + steps.length + " · clock about " + s.t + " s</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (si.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>about " + s.t + " s</td><td>" + s.note + "</td><td>" + esc(s.loop) + "; " + esc(memory(s)) + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    stage.setAttribute("data-reserve", "");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-timeline]");
    for (var i = 0; i < b.length; i++) { try { mountTimeline(b[i]); } catch (e) { L.report("timeline", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
