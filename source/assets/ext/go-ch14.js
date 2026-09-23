/* Go book, chapter 14 ("Plugs and Sticky Notes") additions. Classic deferred script; loads after comic-cast.js.
   [data-notedoor]: the sticky-note door (renamed from [data-door], which js ch5 uses for a different widget), a stepper for defer. Each `defer` line sticks a note on the door of the function
   that is running; the note already says exactly what it will do, with its arguments written in ink (they were worked
   out when the defer line ran). When the function returns, the notes are peeled off from the top: last stuck, first done.
   Each step is the state right after one line of a REAL captured program ran; that line is lit in the code list.
   Model: { "program": "door.go", "fn": "main()",
            "steps": [ { "at": 7,                                         // the line that just ran (lit)
                         "notes": [ {"t": "Println(\"lock the door\")",   // every note on the door, oldest first;
                                     "out": "lock the door"} ],           //   t is written on it, out is what it prints
                         "phase": "run" | "leave",                        // optional; "leave" once the function returns
                         "print": "arrive at the depot",                  // optional: an ordinary line printed now
                         "note": "HTML" } ] }
   A step may change the notes in only two ways: one new note on top (a defer line ran), or the top note peeled off (the
   function is leaving; the peeled note's out is printed). Anything else is reported. Parity: every printed line must
   equal the real run's stdout, line for line, and together they must be the whole stdout; otherwise the badge turns
   bad and L.report() fires. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch14.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111", INK2 = "#2B2B2B";
  var NH = 50, NG = 10, W = 640;

  function same(a, b) { return a && b && a.t === b.t && a.out === b.out; }
  function txt(x, y, t, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") + '" font-family="' + (o.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (o.weight || 800) + '" font-size="' + size + '" fill="' + INK + '"' + (o.rot ? ' transform="rotate(' + o.rot + ')"' : "") + ">" + esc(t) + "</text>";
  }
  function fit(t, width, max) { return Math.max(11, Math.min(max, Math.floor(width / (Math.max(t.length, 1) * 0.61)))); }

  /* one sticky note: a square-ish paper with a folded corner and a strip of "glue" at the top */
  function noteSvg(x, y, w, n, o) {
    o = o || {};
    var fill = o.top ? "#FFD60A" : o.done ? "#F3F3F3" : "#FFF6CC";
    var s = '<g' + (o.rot ? ' transform="rotate(' + o.rot + " " + (x + w / 2) + " " + (y + NH / 2) + ')"' : "") + ">";
    s += '<path d="M' + x + " " + y + " h" + w + " v" + (NH - 12) + " l-12 12 h" + (12 - w) + ' z" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (o.top ? 4 : 3) + '"' + (o.done ? ' stroke-dasharray="6 4"' : "") + "/>";
    s += '<path d="M' + (x + w) + " " + (y + NH - 12) + " h-12 v12" + '" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
    s += '<rect x="' + (x + 4) + '" y="' + (y + 3) + '" width="' + (w - 8) + '" height="7" fill="' + INK + '" opacity="0.12"/>';
    s += txt(x + w / 2 - 4, y + 33, n.t, fit(n.t, w - 26, 17));
    if (o.done) s += '<path d="M' + (x + 10) + " " + (y + 27) + " H" + (x + w - 18) + '" stroke="' + INK + '" stroke-width="3"/>';
    return s + "</g>";
  }

  /* Wide screens: the door on the left, what the function is doing on the right. Narrow screens (phones): the same
     pieces stacked, so nothing needs sideways scrolling. */
  function draw(m, st, maxN, peeled, doneN, narrow) {
    var notes = st.notes, leaving = st.phase === "leave", fn = m.fn || "main()";
    var Wv = narrow ? 344 : W, doorX = 24, doorW = narrow ? 296 : 300, doorY = 22;
    var y0 = doorY + (narrow ? 92 : 62);
    var doorH = Math.max(narrow ? 0 : 300, (y0 - doorY) + maxN * (NH + NG) + 40);
    var out = "";
    // the door and its frame
    out += '<rect x="' + (doorX - 10) + '" y="' + (doorY - 10) + '" width="' + (doorW + 20) + '" height="' + (doorH + 10) + '" rx="6" fill="#E9C99A" stroke="' + INK + '" stroke-width="4"/>';
    out += '<rect x="' + doorX + '" y="' + doorY + '" width="' + doorW + '" height="' + doorH + '" rx="4" fill="#C8955E" stroke="' + INK + '" stroke-width="4"/>';
    out += '<circle cx="' + (doorX + doorW - 22) + '" cy="' + (doorY + doorH - 26) + '" r="9" fill="#FFD60A" stroke="' + INK + '" stroke-width="3"/>';
    // name plate: whose door this is
    out += '<rect x="' + (doorX + 50) + '" y="' + (doorY + 12) + '" width="' + (doorW - 100) + '" height="34" rx="6" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3"/>';
    out += txt(doorX + doorW / 2, doorY + 37, "DOOR OF " + fn, 19, { font: "Bangers, sans-serif", weight: 400 });
    // the notes: newest at the top, so the top of the stack is what you see first
    if (!notes.length) out += '<rect x="' + (doorX + 30) + '" y="' + (y0 + 12) + '" width="' + (doorW - 60) + '" height="34" rx="6" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2" stroke-dasharray="5 4"/>' + txt(doorX + doorW / 2, y0 + 35, "(no notes on the door)", 16, { font: "Comic Neue, sans-serif" });
    for (var i = notes.length - 1, row = 0; i >= 0; i--, row++) {
      var y = y0 + row * (NH + NG), isTop = i === notes.length - 1;
      out += noteSvg(doorX + 18, y, doorW - 60, notes[i], { top: isTop, rot: row % 2 ? 1.2 : -1.2 });
      // order badge: which note was stuck when
      out += '<circle cx="' + (doorX + doorW - 20) + '" cy="' + (y + NH / 2) + '" r="14" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2.5"/>' + txt(doorX + doorW - 20, y + NH / 2 + 6, String(i + 1), 16, { font: "Bangers, sans-serif", weight: 400 });
    }
    if (notes.length && !narrow) {
      var ty = y0 + NH / 2;
      out += '<path d="M' + (doorX + doorW + 38) + " " + ty + " H" + (doorX + doorW + 14) + " m10 -8 l-10 8 l10 8" + '" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
      out += txt(doorX + doorW + 44, ty - 4, "TOP: done first", 17, { anchor: "start", font: "Comic Neue, sans-serif" });
      out += txt(doorX + doorW + 44, ty + 16, "(last one stuck)", 15, { anchor: "start", font: "Comic Neue, sans-serif", weight: 700 });
    } else if (notes.length) {
      out += '<rect x="' + (doorX + 18) + '" y="' + (doorY + 56) + '" width="' + (doorW - 60) + '" height="28" rx="6" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2.5"/>';
      out += txt(doorX + 18 + (doorW - 60) / 2, doorY + 76, "TOP: done first (last stuck)", 15, { font: "Comic Neue, sans-serif" });
      out += '<path d="M' + (doorX + 30) + " " + (doorY + 84) + " v6 m-5 -4 l5 5 l5 -5" + '" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
    }
    // what the function is doing: to the right of the door, or under it on phones
    var rx = narrow ? doorX - 10 : doorX + doorW + 30, ry = narrow ? doorY + doorH + 18 : doorY + 110, rw = Wv - rx - (narrow ? 10 : 12);
    out += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="58" rx="10" fill="' + (leaving ? "#FFE1E1" : "#C9F2D9") + '" stroke="' + INK + '" stroke-width="3"' + (leaving ? ' stroke-dasharray="9 5"' : "") + "/>";
    out += txt(rx + rw / 2, ry + 25, leaving ? "LEAVING: " + fn + " RETURNS" : "RUNNING: " + fn, 18, { font: "Bangers, sans-serif", weight: 400 });
    out += txt(rx + rw / 2, ry + 47, leaving ? "peel notes from the top" : "notes wait on the door", 15, { font: "Comic Neue, sans-serif" });
    var bottom = ry + 70;
    if (peeled) {
      out += txt(rx + 8, ry + 96, "DOING NOW:", 18, { anchor: "start", font: "Bangers, sans-serif", weight: 400 });
      out += noteSvg(rx + 6, ry + 108, rw - 18, peeled, { top: true, rot: narrow ? 2 : 5 });
      out += txt(rx + 8, ry + 196, "prints:", 15, { anchor: "start", font: "Comic Neue, sans-serif" });
      out += txt(rx + 66, ry + 196, peeled.out, fit(peeled.out, rw - 70, 16), { anchor: "start" });
      bottom = ry + 206;
    }
    if (leaving && !notes.length && !peeled) { out += txt(rx + 8, ry + 96, "door is clear: the function is gone", 15, { anchor: "start", font: "Comic Neue, sans-serif" }); bottom = ry + 106; }
    if (doneN) {
      out += txt(rx + 8, bottom + 20, "DONE: " + doneN + (doneN === 1 ? " note" : " notes"), 17, { anchor: "start", font: "Bangers, sans-serif", weight: 400 });
      bottom += 30;
    }
    var full = narrow ? ry + 236 : Math.max(doorY + doorH + 16, ry + 236);
    return { svg: out, vb: "0 0 " + Wv + " " + Math.max(full, bottom + 8) };
  }

  function describe(st) {
    var n = st.notes;
    return (st.phase === "leave" ? "Leaving. " : "Running. ") + (n.length ? "Notes on the door, top first: " + n.slice().reverse().map(function (x) { return x.t; }).join("; ") + "." : "No notes on the door.");
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-notedoor")).textContent);
    var q = L.program(m.program); if (!q) return;
    var real = q.stdout.replace(/\n$/, "").split("\n"), ok = true, printed = [], maxN = 0, doneN = 0;
    function bad(msg) { ok = false; L.report("door:" + m.program, msg); }
    m.steps.forEach(function (st, k) {
      var prev = k ? m.steps[k - 1].notes : [], now = st.notes;
      maxN = Math.max(maxN, now.length);
      st._peeled = null; st._stuck = false;
      if (now.length === prev.length + 1) {
        for (var i = 0; i < prev.length; i++) if (!same(prev[i], now[i])) bad("step " + (k + 1) + ": a note under the new one changed");
        st._stuck = true;
      } else if (now.length === prev.length - 1) {
        for (var j = 0; j < now.length; j++) if (!same(prev[j], now[j])) bad("step " + (k + 1) + ": only the top note can be peeled");
        st._peeled = prev[prev.length - 1];
        if (st.phase !== "leave") bad("step " + (k + 1) + ": notes are peeled only while the function is leaving");
        if (st.print != null) bad("step " + (k + 1) + ": a peel prints the note itself; remove \"print\"");
        printed.push(st._peeled.out);
        doneN++;
      } else if (now.length !== prev.length) bad("step " + (k + 1) + ": the door gained or lost more than one note");
      else for (var h = 0; h < now.length; h++) if (!same(prev[h], now[h])) bad("step " + (k + 1) + ": a note changed while on the door");
      if (st.print != null) printed.push(st.print);
      var want = real.slice(0, printed.length).join("\n");
      if (printed.join("\n") !== want) bad("step " + (k + 1) + " prints \"" + printed[printed.length - 1] + "\" but the real run printed \"" + real[printed.length - 1] + "\"");
      st._screen = printed.slice(); st._done = doneN;
    });
    if (printed.join("\n") !== real.join("\n")) bad("the model prints " + printed.length + " lines; the real run printed " + real.length);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every printed line matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var src = q.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".door-code"), svg = box.querySelector("svg.door-svg"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = code.querySelectorAll("li");
    L.hangLines(lis);   // phones: wrapped lines keep their indent and short strings stay whole (engine .tr-code rules)
    var stage = box.querySelector(".stage"), narrow = false;
    function render(rs, announce) {
      narrow = (stage ? stage.clientWidth : 700) < 560;
      var st = m.steps[rs.step], d = draw(m, st, maxN, st._peeled, st._done, narrow);
      for (var a = 0; a < lis.length; a++) { lis[a].classList.toggle("ran", st.at === a + 1); if (st.at === a + 1) lis[a].setAttribute("data-now", ""); else lis[a].removeAttribute("data-now"); }
      svg.setAttribute("viewBox", d.vb);
      svg.innerHTML = d.svg;
      var prev = rs.step > 0 ? m.steps[rs.step - 1]._screen.length : 0;
      scr.innerHTML = st._screen.length ? st._screen.map(function (l, k) { return k >= prev ? '<span class="new">' + esc(l) + "</span>" : esc(l); }).join("\n") : '<span class="empty">(nothing printed yet)</span>';
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + m.steps.length + "</span>" + st.note;
      if (live && announce) live.textContent = "Step " + (rs.step + 1) + " of " + m.steps.length + ". " + (st.at ? "Line " + st.at + " ran. " : "") + st.note.replace(/<[^>]+>/g, "") + " " + describe(st);
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (st, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + (st.at ? "line " + st.at + ": <code>" + esc(src[st.at - 1].trim()) + "</code>" : "start") + "</td><td>" + st.note + "</td><td>" + esc(describe(st)) + "</td><td><code>" + (st._screen.length ? esc(st._screen.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: true });   // keeps the tallest step's height, so the buttons never move
    r.reset(m.steps.length);
    // a phone turned sideways (or a resized window) switches between the stacked and side-by-side layouts
    var timer = null;
    root.addEventListener("resize", function () {
      if (timer) root.clearTimeout(timer);
      timer = root.setTimeout(function () { var w = (stage ? stage.clientWidth : 700) < 560; if (w !== narrow) render(r.state(), false); }, 150);
    });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-notedoor]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._doorMounted) continue; boxes[i]._doorMounted = true; try { mount(boxes[i]); } catch (e) { L.report("door", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
