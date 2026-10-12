/* C++ book, chapter 18 extension: "Inspectors and Magnifiers".
   Adds no widget that invents output: everything it claims is checked against the captured runs in data/cpp-ch18.js,
   and each widget shows a parity badge. It adds:
     - Inspector Pike (cast member "pike"; renamed from "inspector", which is the Rust book's engine critter): runs the car-inspection lane. Hi-vis tabard, peaked cap with a badge,
       and a clipboard or a big magnifying glass.
       data-mood  = normal | happy | focus | surprised | stern
       data-mouth = smile | o | flat | frown | shout (default follows the mood)
       data-arms  = down (default) | point | cheer
       data-prop  = clipboard (default) | magnifier | none
     - [data-bytes="ID"]: the byte train. A row of word buttons; the chosen word is drawn as carriages, one per byte
       (hex on each carriage), coupled into groups, one group per code point, with the character above its group.
       The bytes come from the browser's own UTF-8 encoder (TextEncoder). Every word's byte count and code-point count
       is checked against a line of a captured program ("café: 5 bytes, 4 code points"), and optionally its hex bytes
       against another captured line. Model: {"program": "letters.cpp", "words": [{"w": "café", "line": "...",
       "hexProgram": "bytes.cpp", "hexLine": "63 61 66 c3 a9"}]}
     - [data-toolgrid="ID"]: "which inspector catches it?" Eight bug cards, each with one button per tool. Choosing
       a tool says right or wrong, why, and shows the line the real tool printed for that bug, read from a capture.
       Model: {"tools": [{"id", "t"}], "items": [{"bug", "answers": [ids], "program", "find", "why"}]}.
       "find" must occur in that program's captured output (any step, stdout or stderr), or the badge turns bad.
   Drawings are aria-hidden by the engine; the page gives every picture that carries meaning a .sr-only sentence. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch18.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  var SKIN = "#B97A55", VEST = "#FFD60A", SHIRT = "#DDE8FF", CAP = "#3B4A66", TROUSER = "#3B4A66";

  /* ---------------- Inspector Pike ---------------- */
  function eyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M63 72 q6 -8 12 0 M85 72 q6 -8 12 0" fill="none"' + S(4) + "/>";
      case "surprised": return '<circle cx="69" cy="71" r="6.5" fill="#fff"' + S(3) + '/><circle cx="91" cy="71" r="6.5" fill="#fff"' + S(3) + "/>" +
        '<circle cx="69" cy="72" r="2.8" fill="' + INK + '"/><circle cx="91" cy="72" r="2.8" fill="' + INK + '"/>';
      case "focus": return '<path d="M62 71 h13 M85 71 h13" fill="none"' + S(5) + '/><path d="M61 63 l13 3 M99 63 l-13 3" fill="none"' + S(3) + "/>";
      case "stern": return '<circle cx="69" cy="72" r="4" fill="' + INK + '"/><circle cx="91" cy="72" r="4" fill="' + INK + '"/><path d="M60 61 l13 5 M100 61 l-13 5" fill="none"' + S(4) + "/>";
      default: return '<circle cx="69" cy="71" r="4.5" fill="' + INK + '"/><circle cx="91" cy="71" r="4.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m) {
    switch (m) {
      case "o": return '<circle cx="80" cy="89" r="4.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M72 89 h16" fill="none"' + S(4) + "/>";
      case "frown": return '<path d="M71 93 q9 -8 18 0" fill="none"' + S(4) + "/>";
      case "shout": return '<path d="M69 84 h22 q-1 13 -11 13 q-10 0 -11 -13 z" fill="' + INK + '"/>';
      default: return '<path d="M70 86 q10 9 20 0" fill="none"' + S(4) + "/>";
    }
  }
  function arm(x1, y1, x2, y2) {
    var d = ' d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"';
    return "<path" + d + ' fill="none"' + S(10) + "/><path" + d + ' fill="none" stroke="' + SHIRT + '" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + x2 + '" cy="' + y2 + '" r="7.5" fill="' + SKIN + '"' + S(3) + "/>";
  }
  function clipboard(x, y) {
    return '<g transform="translate(' + x + " " + y + ') rotate(8)"><rect x="-16" y="-22" width="32" height="42" rx="4" fill="#C8955E"' + S(3) + "/>" +
      '<rect x="-12" y="-16" width="24" height="32" fill="#fff"' + S(2) + '/><rect x="-7" y="-26" width="14" height="8" rx="2" fill="#B8BEC8"' + S(2.5) + "/>" +
      '<path d="M-8 -9 l3 3 l5 -6 M-8 1 l3 3 l5 -6 M3 -7 h6 M3 3 h6 M-8 11 h17" fill="none"' + S(2) + "/></g>";
  }
  function magnifier(x, y) {
    return '<g transform="translate(' + x + " " + y + ')"><path d="M-2 4 L-14 22" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/>' +
      '<path d="M-2 4 L-14 22" fill="none" stroke="#C8955E" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="8" cy="-12" r="17" fill="#EAF6FF"' + S(4) + '/><path d="M-1 -20 q6 -6 14 -3" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>';
  }
  L.cast.pike = { vb: "0 0 160 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", pose = el.getAttribute("data-arms") || "down";
    var m = el.getAttribute("data-mouth") || (mood === "stern" ? "flat" : mood === "surprised" ? "o" : "smile");
    var prop = el.getAttribute("data-prop") || "clipboard";
    var right, left, held = "";
    if (pose === "point") right = arm(108, 120, 148, 104);
    else if (pose === "cheer") right = arm(108, 120, 134, 84);
    else right = arm(108, 120, 122, 150);
    left = pose === "cheer" ? arm(52, 120, 26, 84) : arm(52, 120, 34, 146);
    if (prop === "clipboard") held = pose === "cheer" ? clipboard(24, 72) : clipboard(30, 150);
    else if (prop === "magnifier") held = pose === "cheer" ? magnifier(132, 70) : pose === "point" ? magnifier(150, 96) : magnifier(124, 140);
    return '<g class="bob">' +
      /* legs and shoes */
      '<rect x="60" y="170" width="16" height="16" fill="' + TROUSER + '"' + S(3) + '/><rect x="84" y="170" width="16" height="16" fill="' + TROUSER + '"' + S(3) + "/>" +
      '<path d="M54 186 h24 v8 h-24 z M82 186 h24 v8 h-24 z" fill="' + INK + '"' + S(3) + "/>" +
      /* shirt and hi-vis tabard with two reflective stripes and a pocket badge */
      '<path d="M48 176 L52 112 Q80 98 108 112 L112 176 Z" fill="' + SHIRT + '"' + S(4) + "/>" +
      '<path d="M56 176 L60 110 Q80 104 100 110 L104 176 Z" fill="' + VEST + '"' + S(3.5) + "/>" +
      '<path d="M58 140 H102 M57 156 H103" fill="none" stroke="' + INK + '" stroke-width="8"/><path d="M58 140 H102 M57 156 H103" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>' +
      '<path d="M86 118 h10 v12 q-5 4 -10 0 z" fill="#FF5A4E"' + S(2.5) + "/>" +
      /* head and peaked cap */
      '<circle cx="80" cy="76" r="25" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M56 60 Q58 34 80 34 Q102 34 104 60 Z" fill="' + CAP + '"' + S(4) + "/>" +
      '<path d="M52 60 H112 Q114 68 104 66 H56 Q50 66 52 60 Z" fill="' + INK + '"/>' +
      '<circle cx="80" cy="46" r="6" fill="' + VEST + '"' + S(2.5) + "/>" +
      '<g class="eyes">' + eyes(mood) + "</g>" + mouth(m) +
      left + right + held +
      "</g>";
  } };

  /* ---------------- helpers ---------------- */
  function allText(q) {
    if (!q) return "";
    var t = (q.stdout || "") + "\n" + (q.stderr || "");
    (q.steps || []).forEach(function (s) { t += "\n" + (s.out || "") + "\n" + (s.err || ""); });
    return t;
  }
  function hasLine(q, line) {
    var text = (q && (q.screen != null ? q.screen : q.stdout)) || "";
    return text.split("\n").some(function (l) { return l.replace(/\s+$/, "") === line.replace(/\s+$/, ""); });
  }
  function model(id) {
    var s = document.getElementById(id);
    if (!s) { L.report("cpp-ch18", "no model " + id); return null; }
    try { return JSON.parse(s.textContent); } catch (e) { L.report("cpp-ch18", "bad JSON in " + id + ": " + e.message); return null; }
  }
  function hex2(b) { return (b < 16 ? "0" : "") + b.toString(16); }

  /* ---------------- the byte train ---------------- */
  function mountBytes(box) {
    var m = model(box.getAttribute("data-bytes")); if (!m) return;
    var bar = box.querySelector(".bt-words"), stage = box.querySelector(".bt-stage"), say = box.querySelector(".bt-say"),
      live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), list = box.querySelector(".bt-text");
    var enc = new TextEncoder(), bad = [];
    var words = m.words.map(function (w) {
      var cps = Array.from(w.w), groups = cps.map(function (ch) { return Array.from(enc.encode(ch)); });
      var nbytes = groups.reduce(function (a, g) { return a + g.length; }, 0);
      var claim = w.w + ": " + nbytes + " bytes, " + cps.length + " code points";
      if (w.line !== claim || !hasLine(L.program(w.program || m.program), w.line)) bad.push(w.w);
      if (w.hexLine) {
        var hx = [].concat.apply([], groups).map(hex2).join(" ");
        if (hx !== w.hexLine || !hasLine(L.program(w.hexProgram), w.hexLine + " ")) bad.push(w.w + " (hex)");
      }
      return { w: w.w, cps: cps, groups: groups, nbytes: nbytes, note: w.note || "" };
    });
    if (bad.length) L.report("byte-train", "parity failed for " + bad.join(", "));
    if (par) {
      par.textContent = bad.length ? "Does not match the real runs: " + bad.join(", ") : "Every count matches the real run of " + m.program + (m.words.some(function (w) { return w.hexLine; }) ? ", and the bytes match bytes.cpp" : "");
      par.classList.toggle("bad", !!bad.length);
    }
    if (list) list.innerHTML = words.map(function (w) {
      return "<li><b>" + esc(w.w) + "</b>: " + w.nbytes + " bytes, " + w.cps.length + " code points. " +
        w.cps.map(function (ch, i) { return "<code>" + esc(ch) + "</code> = " + w.groups[i].map(hex2).join(" "); }).join("; ") + ".</li>";
    }).join("");
    function draw(i) {
      var w = words[i], CW = 54, GAP = 10, CGAP = 22, x = 8, parts = [], tops = [];
      w.groups.forEach(function (g, gi) {
        var gx = x;
        g.forEach(function (b, bi) {
          var multi = g.length > 1, lead = bi === 0;
          parts.push('<g class="bt-car' + (multi ? " multi" : "") + '"><rect x="' + x + '" y="60" width="' + CW + '" height="46" rx="7" class="bt-body' + (multi ? (lead ? " lead" : " cont") : "") + '"/>' +
            '<circle cx="' + (x + 14) + '" cy="112" r="7" class="bt-wheel"/><circle cx="' + (x + CW - 14) + '" cy="112" r="7" class="bt-wheel"/>' +
            '<text x="' + (x + CW / 2) + '" y="90" class="bt-hex">' + hex2(b) + "</text></g>");
          if (bi < g.length - 1) parts.push('<path d="M' + (x + CW) + " 83 h" + GAP + '" class="bt-couple tight"/>');
          x += CW + (bi < g.length - 1 ? GAP : 0);
        });
        var mid = (gx + x) / 2;
        tops.push('<path d="M' + (gx + 4) + " 50 v-6 H" + (x - 4) + ' v6" class="bt-brace"/><text x="' + mid + '" y="34" class="bt-ch">' + esc(w.cps[gi]) + "</text>" +
          (g.length > 1 ? '<text x="' + mid + '" y="140" class="bt-n">' + g.length + " bytes</text>" : '<text x="' + mid + '" y="140" class="bt-n">1 byte</text>'));
        if (gi < w.groups.length - 1) { parts.push('<path d="M' + x + " 83 h" + CGAP + '" class="bt-couple"/>'); x += CGAP; }
      });
      var W = Math.max(x + 8, 200);
      stage.innerHTML = '<svg class="bt-svg" viewBox="0 0 ' + W + ' 150" style="max-width:' + (W * 1.15) + 'px" role="img" aria-label="' + esc(w.w + " as a train of " + w.nbytes + " byte carriages, grouped into " + w.cps.length + " code points") + '">' + tops.join("") + parts.join("") + "</svg>";
      var txt = "<b>" + esc(w.w) + "</b>: <code>.size()</code> says <b>" + w.nbytes + "</b> (bytes), but there are <b>" + w.cps.length + "</b> code points. " + w.note;
      say.innerHTML = txt;
      if (live) live.textContent = w.w + ": " + w.nbytes + " bytes, " + w.cps.length + " code points.";
      var bs = bar.querySelectorAll("button");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", k === i ? "true" : "false");
    }
    bar.innerHTML = '<span class="label">WORDS:</span>' + words.map(function (w, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '">' + esc(w.w) + "</button>"; }).join("");
    bar.addEventListener("click", function (e) { var b = e.target.closest("button[data-i]"); if (b) draw(+b.getAttribute("data-i")); });
    draw(Math.min(m.start || 0, words.length - 1));
  }

  /* ---------------- which inspector catches it? ---------------- */
  function mountGrid(box) {
    var m = model(box.getAttribute("data-toolgrid")); if (!m) return;
    var host = box.querySelector(".tg-cards"), par = box.querySelector(".parity"), live = box.querySelector("[aria-live]"), bad = [];
    var name = {}; m.tools.forEach(function (t) { name[t.id] = t.t; });
    host.innerHTML = m.items.map(function (it, i) {
      var q = L.program(it.program), text = allText(q), line = "";
      text.split("\n").some(function (l) { if (l.indexOf(it.find) >= 0) { line = l; return true; } return false; });
      if (!line) bad.push(it.program);
      it._line = line;
      return '<li class="tg-card" data-i="' + i + '"><p class="tg-bug"><span class="tg-no">' + (i + 1) + "</span>" + it.bug + "</p>" +
        '<div class="tg-tools" role="group" aria-label="Which tool catches bug ' + (i + 1) + '?">' +
        m.tools.map(function (t) { return '<button type="button" class="path-btn tg-btn" data-tool="' + t.id + '" aria-pressed="false">' + esc(t.t) + "</button>"; }).join("") +
        '</div><div class="tg-out" hidden></div></li>';
    }).join("");
    if (bad.length) L.report("toolgrid", "line not found in the capture of " + bad.join(", "));
    if (par) { par.textContent = bad.length ? "Missing from the captures: " + bad.join(", ") : "Every quoted line comes from a real tool run"; par.classList.toggle("bad", !!bad.length); }
    host.addEventListener("click", function (e) {
      var b = e.target.closest(".tg-btn"); if (!b) return;
      var card = b.closest(".tg-card"), it = m.items[+card.getAttribute("data-i")], tool = b.getAttribute("data-tool");
      var ok = it.answers.indexOf(tool) >= 0, out = card.querySelector(".tg-out");
      var bs = card.querySelectorAll(".tg-btn");
      for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", bs[k] === b ? "true" : "false");
      card.classList.toggle("ok", ok); card.classList.toggle("no", !ok);
      out.hidden = false;
      out.innerHTML = '<p class="tg-verdict">' + (ok ? "✓ Yes: " : "✗ Not this one. ") + (ok ? esc(name[tool]) + " catches it." : "The one that catches it: " + it.answers.map(function (a) { return esc(name[a]); }).join(" or ") + ".") + "</p>" +
        "<p>" + it.why + '</p><p class="tg-real">What the real tool printed (<code>' + esc(it.program) + "</code>):</p><pre class=\"tg-line\">" + esc(it._line.trim()) + "</pre>";
      if (live) live.textContent = "Bug " + (+card.getAttribute("data-i") + 1) + ": " + (ok ? "right, " : "not this one, ") + it.answers.map(function (a) { return name[a]; }).join(" or ") + " catches it.";
    });
  }

  P.comic.ext(function () {
    var bt = document.querySelectorAll("[data-bytes]");
    for (var i = 0; i < bt.length; i++) { try { mountBytes(bt[i]); } catch (e) { L.report("byte-train", e.message); } }
    var tg = document.querySelectorAll("[data-toolgrid]");
    for (var j = 0; j < tg.length; j++) { try { mountGrid(tg[j]); } catch (e) { L.report("toolgrid", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
