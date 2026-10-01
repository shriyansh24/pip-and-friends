/* Go book, chapter 19 ("Pipes and Nesting Dolls") additions. Classic deferred script; loads after comic-cast.js.
   Two steppers, each checked against a REAL captured run and shown with a parity badge.

   [data-pipe]: io.Copy as a pipe. A strings.Reader tank on the left, a wrapping Reader (the rot13 filter) in the
   middle, os.Stdout on the right. Each step is one trip of bytes through the pipe. The trips are worked out here from
   the model (the source text and the filter's width), then CHECKED against the real run: the bytes that reach the
   screen must be the start of the real stdout, the next line must report the real total, and the line after that must
   list exactly the real trip sizes (the program records them itself).
   Model: { "program": "rot13.go", "source": "Uryyb, Fpbbg!\n", "width": 5, "filter": "rot13Reader",
            "copiedLine": "copied {n} bytes, err: <nil>", "tripsLine": "trips: [{trips}]" }

   [data-dolls]: errors.Is opening nesting dolls. Each doll is one error in a wrap chain, outermost first; the real run
   prints every doll's text (one "doll: ..." line each, found with errors.Unwrap). Each search opens the dolls one at a
   time until one IS the target, or until Unwrap gives nil.
   Model: { "program": "dolls.go",
            "dolls": [ {"text": "route B: parcel 42: no stamp", "made": "fmt.Errorf(\"route B: %w\", inner)"}, ... ],
            "searches": [ {"id": "a", "label": "errors.Is(err, ErrNoStamp)", "target": "ErrNoStamp",
                           "match": 2, "line": "Is ErrNoStamp: true"}, ... ] }
   Checks: the first lines of stdout are "doll: " + each doll's text, in order; each search's line is a real stdout
   line whose final word is "true" exactly when the model names a matching doll; a matching doll's "made" is the
   target itself. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript tables. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch19.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111";

  function txt(x, y, t, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") + '" font-family="' + (o.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (o.weight || 800) + '" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>";
  }
  function rect(x, y, w, h, fill, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.rx == null ? 10 : o.rx) + '" fill="' + fill + '" stroke="' + INK +
      '" stroke-width="' + (o.sw || 3) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") + "/>";
  }
  // bytes shown so that spaces and newlines are visible: "Hello,·Scoot!⏎"
  function vis(s) { return s.replace(/ /g, "·").replace(/\n/g, "⏎"); }
  function quoteVis(s) { return "“" + vis(s) + "”"; }
  function fit(t, width, max) { return Math.max(13, Math.min(max, Math.floor(width / (Math.max(t.length, 1) * 0.62)))); }
  function setParity(box, ok, okText) {
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? okText : "Does not match the real run"; par.classList.toggle("bad", !ok); }
  }
  function onResize(fn) {
    var timer = null;
    root.addEventListener("resize", function () { if (timer) root.clearTimeout(timer); timer = root.setTimeout(fn, 150); });
  }

  /* ================= the pipe ================= */
  function rot13(s) {
    return s.replace(/[a-zA-Z]/g, function (c) { var b = c <= "Z" ? 65 : 97; return String.fromCharCode(b + (c.charCodeAt(0) - b + 13) % 26); });
  }

  function pipeSteps(m) {
    var src = m.source, w = m.width, steps = [], pos = 0, screen = "", trips = [];
    steps.push({ kind: "start", left: src, chunkIn: "", chunkOut: "", screen: "", trips: [], lines: [] });
    while (pos < src.length) {
      var piece = src.slice(pos, pos + w);
      pos += piece.length; trips.push(piece.length);
      screen += rot13(piece);
      steps.push({ kind: "trip", n: trips.length, left: src.slice(pos), chunkIn: piece, chunkOut: rot13(piece), screen: screen, trips: trips.slice(), lines: [] });
    }
    trips.push(0);
    steps.push({ kind: "eof", left: "", chunkIn: "", chunkOut: "", screen: screen, trips: trips.slice(), lines: [] });
    var total = trips.reduce(function (a, b) { return a + b; }, 0);
    var l1 = m.copiedLine.replace("{n}", String(total)), l2 = m.tripsLine.replace("{trips}", trips.join(" "));
    steps.push({ kind: "done", left: "", chunkIn: "", chunkOut: "", screen: screen, trips: trips.slice(), lines: [l1, l2], total: total });
    return steps;
  }

  function drawPipe(m, st, narrow) {
    var out = "", W = narrow ? 340 : 680, H;
    var label = {};
    var small = { font: "Comic Neue, sans-serif", weight: 700 };
    var active = st.kind === "trip";
    function tank(x, y, w, h) {
      out += rect(x, y, w, h, "#DDE8FF", { sw: 4, rx: 14 });
      out += txt(x + w / 2, y + 26, "strings.Reader", 18, label);
      out += txt(x + w / 2, y + 46, "bytes still inside:", 15, small);
      var left = st.left ? quoteVis(st.left) : "(empty)";
      out += rect(x + 10, y + 56, w - 20, 40, "#FFFFFF", { rx: 6, dash: st.left ? null : "6 4" });
      out += txt(x + w / 2, y + 82, left, fit(left, w - 30, 17), st.left ? {} : small);
      out += txt(x + w / 2, y + h - 12, st.left.length + " of " + m.source.length + " bytes left", 15, small);
    }
    function filter(x, y, w, h) {
      out += rect(x, y, w, h, active ? "#FFD60A" : "#FFF6CC", { sw: active ? 5 : 4, rx: 14 });
      out += txt(x + w / 2, y + 26, m.filter, 18, label);
      out += txt(x + w / 2, y + 46, "at most " + m.width + " bytes a trip", 15, small);
      if (active) {
        out += txt(x + 12, y + 76, "in:", 15, { font: "Comic Neue, sans-serif", weight: 700, anchor: "start" });
        out += txt(x + w / 2 + 14, y + 76, quoteVis(st.chunkIn), fit(quoteVis(st.chunkIn), w - 60, 17));
        out += txt(x + 12, y + 104, "out:", 15, { font: "Comic Neue, sans-serif", weight: 700, anchor: "start" });
        out += txt(x + w / 2 + 14, y + 104, quoteVis(st.chunkOut), fit(quoteVis(st.chunkOut), w - 60, 17));
      } else {
        var msg = st.kind === "start" ? "waiting for io.Copy" : st.kind === "eof" ? "Read: 0 bytes, io.EOF" : "pipe is closed";
        out += txt(x + w / 2, y + 92, msg, 16, small);
      }
    }
    function screen(x, y, w, h) {
      out += rect(x, y, w, h, "#FFFFFF", { sw: 4, rx: 14 });
      out += txt(x + w / 2, y + 26, "os.Stdout", 18, label);
      out += txt(x + w / 2, y + 46, "bytes written so far:", 15, small);
      var s = st.screen ? quoteVis(st.screen) : "(nothing yet)";
      out += rect(x + 10, y + 56, w - 20, 40, "#F4F1EA", { rx: 6 });
      out += txt(x + w / 2, y + 82, s, fit(s, w - 30, 17), st.screen ? {} : small);
      out += txt(x + w / 2, y + h - 12, st.screen.length + " bytes", 15, small);
    }
    function arrow(x1, y1, x2, y2, on) {
      out += '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" stroke="' + INK + '" stroke-width="' + (on ? 7 : 4) + '"' + (on ? "" : ' stroke-dasharray="8 6"') + ' stroke-linecap="round"/>';
      var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
      var ax = x2 + ux * 4, ay = y2 + uy * 4, px = -uy * 9, py = ux * 9;
      out += '<path d="M' + (ax - ux * 14 + px) + " " + (ay - uy * 14 + py) + " L" + ax + " " + ay + " L" + (ax - ux * 14 - px) + " " + (ay - uy * 14 - py) + '" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    }
    if (!narrow) {
      H = 250;
      tank(8, 40, 200, 130); filter(240, 40, 200, 130); screen(472, 40, 200, 130);
      arrow(210, 105, 234, 105, active); arrow(442, 105, 466, 105, active);
      out += txt(340, 24, "io.Copy(os.Stdout, " + m.wrapVar + ") pumps the bytes along", 17, small);
      var tr = "trips so far: [" + st.trips.join(" ") + "]";
      out += txt(340, 202, tr, 17);
      out += txt(340, 232, active ? "trip " + st.n + ": Read gave " + st.chunkIn.length + " bytes, then Write passed them on" : st.kind === "eof" ? "the source is empty: Read says io.EOF, and io.Copy stops" : st.kind === "done" ? "io.Copy returned " + st.total + ", nil" : "nothing has moved yet", 16, small);
    } else {
      H = 560;
      out += txt(170, 22, "io.Copy pumps the bytes down", 16, small);
      tank(20, 34, 300, 130); arrow(170, 166, 170, 192, active);
      filter(20, 196, 300, 130); arrow(170, 328, 170, 354, active);
      screen(20, 358, 300, 130);
      out += txt(170, 516, "trips so far: [" + st.trips.join(" ") + "]", 17);
      out += txt(170, 544, active ? "trip " + st.n + ": " + st.chunkIn.length + " bytes through" : st.kind === "eof" ? "Read says io.EOF: stop" : st.kind === "done" ? "io.Copy returned " + st.total + ", nil" : "nothing has moved yet", 16, small);
    }
    return { svg: out, vb: "0 0 " + W + " " + H };
  }

  function describePipe(m, st) {
    var s = "Reader holds " + (st.left ? quoteVis(st.left) : "nothing") + ". ";
    if (st.kind === "trip") s += "Trip " + st.n + ": in " + quoteVis(st.chunkIn) + ", out " + quoteVis(st.chunkOut) + ". ";
    s += "Screen has " + (st.screen ? quoteVis(st.screen) : "nothing") + ". Trips: [" + st.trips.join(" ") + "].";
    return s;
  }

  function mountPipe(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-pipe")).textContent);
    var q = L.program(m.program); if (!q) return;
    m.wrapVar = m.wrapVar || "pipe";
    var steps = pipeSteps(m), last = steps[steps.length - 1], ok = true;
    function bad(msg) { ok = false; L.report("pipe:" + m.program, msg); }
    var real = q.stdout;
    if (real.indexOf(last.screen) !== 0) bad("the bytes the pipe delivers are not the start of the real output");
    var rest = real.slice(last.screen.length).replace(/\n$/, "").split("\n");
    if (rest[0] !== last.lines[0]) bad("total line: model says \"" + last.lines[0] + "\", real run printed \"" + rest[0] + "\"");
    if (rest[1] !== last.lines[1]) bad("trips line: model says \"" + last.lines[1] + "\", real run printed \"" + rest[1] + "\"");
    if (rest.length !== 2) bad("the real run printed " + rest.length + " lines after the copy; the model expects 2");
    setParity(box, ok, "Bytes, total and trips match the real run");

    var src = q.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".pipe-code");
    if (code) code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = code ? code.querySelectorAll("li") : [];
    L.hangLines(lis);   // wrapped lines continue under their first character (DESIGN_SYSTEM.md section 6)
    var svg = box.querySelector("svg.pipe-svg"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), stage = box.querySelector(".stage");
    var notes = m.notes || {};
    function noteFor(st) {
      if (st.kind === "start") return notes.start || "";
      if (st.kind === "trip") return (notes.trip || "").replace("{n}", st.n).replace("{in}", esc(quoteVis(st.chunkIn))).replace("{out}", esc(quoteVis(st.chunkOut))).replace("{k}", st.chunkIn.length);
      if (st.kind === "eof") return notes.eof || "";
      return (notes.done || "").replace("{total}", st.total);
    }
    function screenLines(st) { var t = st.screen + (st.lines.length ? (st.screen.slice(-1) === "\n" ? "" : "\n") + st.lines.join("\n") : ""); return t.replace(/\n$/, ""); }
    var narrow = false;
    function render(rs, announce) {
      narrow = (stage ? stage.clientWidth : 700) < 560;
      var st = steps[rs.step], d = drawPipe(m, st, narrow);
      var lit = st.kind === "trip" ? m.tripLines : st.kind === "eof" ? m.eofLines : st.kind === "done" ? m.doneLines : m.startLines;
      // Light every line of this step, but tag only the first one ("busy now"), and scroll the code window so it shows.
      var first = null;
      for (var a = 0; a < lis.length; a++) {
        var on = (lit || []).indexOf(a + 1) >= 0;
        lis[a].classList.toggle("ran", on);
        lis[a].classList.toggle("tag", on && !first);
        if (on && !first) { first = lis[a]; lis[a].setAttribute("data-now", ""); } else lis[a].removeAttribute("data-now");
      }
      if (first && code && code.scrollHeight > code.clientHeight + 2) {
        var top = first.getBoundingClientRect().top - code.getBoundingClientRect().top + code.scrollTop;
        code.scrollTop = Math.max(0, top - code.clientHeight / 4);
      }
      svg.setAttribute("viewBox", d.vb); svg.innerHTML = d.svg;
      var shown = screenLines(st);
      scr.innerHTML = shown ? esc(shown) : '<span class="empty">(nothing printed yet)</span>';
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + steps.length + "</span>" + noteFor(st);
      if (live && announce) live.textContent = "Step " + (rs.step + 1) + " of " + steps.length + ". " + noteFor(st).replace(/<[^>]+>/g, "") + " " + describePipe(m, st);
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (st, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + noteFor(st) + "</td><td>" + esc(describePipe(m, st)) + "</td><td><code>" + (screenLines(st) ? esc(screenLines(st)).replace(/\n/g, " / ") : "(nothing)") + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, steps.length, render, { reserve: true });
    r.reset(steps.length);
    onResize(function () { var w = (stage ? stage.clientWidth : 700) < 560; if (w !== narrow) render(r.state(), false); });
  }

  /* ================= the nesting dolls ================= */
  function dollShape(cx, top, w, h, o) {
    // a doll: round head on a rounded body; "open" draws the head lifted off with a gap
    var s = "", lift = o.open ? 16 : 0, fill = o.cur ? "#FFD60A" : o.match ? "#C9F2D9" : o.checked ? "#F4F1EA" : "#F2C9A0";
    var hr = w * 0.3, hy = top + hr + 2 - lift;
    s += '<g stroke="' + INK + '" stroke-width="' + (o.cur ? 5 : 3.5) + '" stroke-linejoin="round"' + (o.checked && !o.match && !o.cur ? ' stroke-dasharray="7 5"' : "") + ">";
    s += '<path d="M' + (cx - w / 2) + " " + (top + h) + " Q" + (cx - w / 2 - 6) + " " + (top + hr * 2 + 6) + " " + (cx - hr) + " " + (top + hr * 2 + 4) +
      " H" + (cx + hr) + " Q" + (cx + w / 2 + 6) + " " + (top + hr * 2 + 6) + " " + (cx + w / 2) + " " + (top + h) + ' Z" fill="' + fill + '"/>';
    s += '<circle cx="' + cx + '" cy="' + hy + '" r="' + hr + '" fill="' + fill + '"/>';
    s += "</g>";
    s += '<circle cx="' + cx + '" cy="' + hy + '" r="' + (hr * 0.62) + '" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2.5"/>';
    s += '<circle cx="' + (cx - hr * 0.22) + '" cy="' + (hy - 2) + '" r="2.6" fill="' + INK + '"/><circle cx="' + (cx + hr * 0.22) + '" cy="' + (hy - 2) + '" r="2.6" fill="' + INK + '"/>';
    s += '<path d="M' + (cx - hr * 0.22) + " " + (hy + hr * 0.25) + " q" + (hr * 0.22) + " " + (hr * 0.2) + " " + (hr * 0.44) + ' 0" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>';
    if (o.open) s += '<path d="M' + (cx - hr - 6) + " " + (top + hr * 2 + 4) + " H" + (cx + hr + 6) + '" stroke="' + INK + '" stroke-width="2" stroke-dasharray="4 4"/>';
    return s;
  }
  function wrapText(t, max) {
    var words = t.split(" "), lines = [], cur = "";
    words.forEach(function (w) { if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); });
    if (cur) lines.push(cur);
    return lines;
  }

  function drawDolls(m, search, st, narrow) {
    var out = "", n = m.dolls.length, label = { font: "Bangers, sans-serif", weight: 400 }, small = { font: "Comic Neue, sans-serif", weight: 700 };
    var W = narrow ? 340 : 680, H;
    function verdict(k) {
      if (k === st.at) return st.found ? "IS IT! MATCH" : "is it " + search.target + "?";
      if (k < st.at || (st.at === n && k < n)) return "not it: unwrap";
      return "still closed";
    }
    function stateOf(k) { return { cur: k === st.at && !st.found, match: k === st.at && st.found, checked: k < st.at || st.at === n, open: k < st.at || (st.at === n) }; }
    if (!narrow) {
      H = 330;
      out += txt(340, 26, search.label, 21);
      var colW = 680 / n;
      for (var k = 0; k < n; k++) {
        var cx = colW * k + colW / 2, scale = 1 - k * 0.16, w = 110 * scale, h = 150 * scale, top = 60 + (150 - h);
        out += dollShape(cx, top, w, h, stateOf(k));
        out += txt(cx, top + h * 0.78, String(k + 1), 22 * scale + 4, label);
        var lines = wrapText(m.dolls[k].text, 20);
        lines.forEach(function (ln, i) { out += txt(cx, 240 + i * 20, ln, 16); });
        out += rect(cx - colW / 2 + 12, 280, colW - 24, 34, k === st.at ? "#FFFFFF" : "#F4F1EA", { rx: 8, sw: k === st.at ? 3.5 : 2, dash: k > st.at && st.at !== n ? "5 4" : null });
        out += txt(cx, 303, verdict(k), 16, label);
        if (k < n - 1) out += '<path d="M' + (cx + colW / 2 - 18) + ' 140 h12 m-6 -6 l6 6 -6 6" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
      }
      if (st.at === n) out += txt(340, 52, "Unwrap gave nil: no more dolls, so errors.Is returns false", 15, small);
      else if (st.found) out += txt(340, 52, "found it: errors.Is returns true", 15, small);
    } else {
      var rowH = 100; H = 60 + n * rowH + (st.at === n || st.found ? 34 : 0);
      out += txt(170, 26, search.label, 17);
      for (var j = 0; j < n; j++) {
        var y = 44 + j * rowH, sc = 1 - j * 0.14, dw = 60 * sc, dh = 84 * sc;
        out += dollShape(46, y + (86 - dh), dw, dh, stateOf(j));
        out += txt(46, y + 86 - dh * 0.2, String(j + 1), 16, label);
        var ls = wrapText(m.dolls[j].text, 20);
        ls.forEach(function (ln, i) { out += txt(92, y + 20 + i * 19, ln, 16, { anchor: "start" }); });
        out += rect(90, y + 54, 236, 30, j === st.at ? "#FFFFFF" : "#F4F1EA", { rx: 8, sw: j === st.at ? 3.5 : 2, dash: j > st.at && st.at !== n ? "5 4" : null });
        out += txt(208, y + 75, verdict(j), 16, label);
      }
      if (st.at === n) out += txt(170, 64 + n * rowH, "Unwrap gave nil: false", 16, small);
      else if (st.found) out += txt(170, 64 + n * rowH, "match: errors.Is returns true", 16, small);
    }
    return { svg: out, vb: "0 0 " + W + " " + H };
  }

  function mountDolls(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-dolls")).textContent);
    var q = L.program(m.program); if (!q) return;
    var real = q.stdout.replace(/\n$/, "").split("\n"), ok = true, n = m.dolls.length;
    function bad(msg) { ok = false; L.report("dolls:" + m.program, msg); }
    m.dolls.forEach(function (d, k) { if (real[k] !== "doll: " + d.text) bad("doll " + (k + 1) + ": model says \"" + d.text + "\", real run printed \"" + real[k] + "\""); });
    if (real[n] && real[n].indexOf("doll: ") === 0) bad("the real run printed more dolls than the model has");
    m.searches.forEach(function (s) {
      var line = real.filter(function (l) { return l === s.line; })[0];
      if (!line) { bad("search " + s.id + ": the line \"" + s.line + "\" is not in the real output"); return; }
      var said = /true$/.test(line) ? true : /false$/.test(line) ? false : null;
      if (said !== (s.match != null)) bad("search " + s.id + ": the model " + (s.match != null ? "finds" : "does not find") + " a match, but the real run printed \"" + line + "\"");
      if (s.match != null && m.dolls[s.match].made !== s.target) bad("search " + s.id + ": the matching doll is not " + s.target + " itself");
      // steps: start (nothing opened), then one step per doll looked at, then the end
      var steps = [{ at: -1, found: false }];
      var last = s.match != null ? s.match : n - 1;
      for (var k = 0; k <= last; k++) steps.push({ at: k, found: s.match === k });
      if (s.match == null) steps.push({ at: n, found: false });
      s._steps = steps;
    });
    setParity(box, ok, "Every doll and every true/false matches the real run");

    var bar = box.querySelector(".paths"), svg = box.querySelector("svg.dolls-svg"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), stage = box.querySelector(".stage"), result = box.querySelector(".dolls-result");
    m.searches.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "path-btn"; b.setAttribute("data-path", s.id); b.setAttribute("aria-pressed", "false");
      b.textContent = s.label; bar.appendChild(b);
    });
    var cur = m.searches[0], narrow = false;
    function noteFor(s, st) {
      if (st.at === -1) return "<code>" + esc(s.label) + "</code> starts with the outside doll. Nothing is open yet.";
      if (st.at === n) return "Doll " + n + " wraps nothing: <code>errors.Unwrap</code> gives <code>nil</code>. Every doll was checked and none was <code>" + esc(s.target) + "</code>, so the answer is <b>false</b>. Real run: <samp>" + esc(s.line) + "</samp>.";
      var d = m.dolls[st.at];
      if (st.found) return "Doll " + (st.at + 1) + " is <code>" + esc(d.made) + "</code>: it <b>is</b> <code>" + esc(s.target) + "</code>. Stop opening: the answer is <b>true</b>. Real run: <samp>" + esc(s.line) + "</samp>.";
      return "Doll " + (st.at + 1) + " was made by <code>" + esc(d.made) + "</code>. Is it <code>" + esc(s.target) + "</code> itself? No. Open it with <code>Unwrap</code> and look at the doll inside.";
    }
    function render(rs, announce) {
      narrow = (stage ? stage.clientWidth : 700) < 560;
      var st = cur._steps[rs.step], d = drawDolls(m, cur, st, narrow);
      svg.setAttribute("viewBox", d.vb); svg.innerHTML = d.svg; svg.setAttribute("data-now", "");
      var done = rs.step === cur._steps.length - 1;
      if (result) result.innerHTML = done ? "Answer: <samp>" + esc(cur.line) + "</samp>" : "Answer: (still opening dolls)";
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + cur._steps.length + "</span>" + noteFor(cur, st);
      if (live && announce) live.textContent = cur.label + ", step " + (rs.step + 1) + ". " + noteFor(cur, st).replace(/<[^>]+>/g, "");
      var bs = bar.querySelectorAll(".path-btn");
      for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-path") === cur.id ? "true" : "false");
    }
    var r = L.runner(box, cur._steps.length, render, { reserve: true });
    function choose(id) {
      cur = m.searches.filter(function (s) { return s.id === id; })[0] || m.searches[0];
      var tb = box.querySelector(".transcript tbody");
      if (tb) tb.innerHTML = cur._steps.map(function (st, k) { return "<tr><td>" + (k + 1) + "</td><td>" + (st.at < 0 ? "none" : st.at === n ? "none left" : "doll " + (st.at + 1)) + "</td><td>" + noteFor(cur, st) + "</td></tr>"; }).join("");
      var cap = box.querySelector(".transcript caption"); if (cap) cap.textContent = "Chosen search: " + cur.label;
      r.reset(cur._steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-path")); if (live) live.textContent = "Search chosen: " + b.textContent + "."; } });
    var dl = box.querySelector(".dolls-list");
    if (dl) dl.innerHTML = m.dolls.map(function (d, k) { return "<li>Doll " + (k + 1) + ": <code>" + esc(d.text) + "</code>, made by <code>" + esc(d.made) + "</code></li>"; }).join("");
    choose(cur.id);
    onResize(function () { var w = (stage ? stage.clientWidth : 700) < 560; if (w !== narrow) render(r.state(), false); });
  }

  P.comic.ext(function () {
    var a = document.querySelectorAll("[data-pipe]"), b = document.querySelectorAll("[data-dolls]"), i;
    for (i = 0; i < a.length; i++) { if (a[i]._pipe) continue; a[i]._pipe = true; try { mountPipe(a[i]); } catch (e) { L.report("pipe", e.message); } }
    for (i = 0; i < b.length; i++) { if (b[i]._dolls) continue; b[i]._dolls = true; try { mountDolls(b[i]); } catch (e) { L.report("dolls", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
