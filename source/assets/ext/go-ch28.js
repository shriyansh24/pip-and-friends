/* Go book, chapter 28 ("Stopwatches and Code Review") additions. Classic deferred script; loads after comic-cast.js.

   1. [data-allocrace]: the allocation race. Each lane is one way of doing the same job; its runner must make one
      pit stop at the storage unit (the heap) for every allocation the real run counted. Time on a real stopwatch
      wobbles from run to run, so the race is decided by pit stops (allocs/op), which do not.
      Model: { "title": "Glue 16 label lines", "lanes": [
                 { "label": "+=", "program": "bench.go", "line": "BenchmarkPlus-2", "allocs": 16, "note": "HTML" }, ... ] }
      Each lane's "line" is the start of one line of that program's captured stdout. The allocation count is read
      from that line ("16 allocs/op", or a trailing ": 16"), and must equal the lane's "allocs" claim; bytes are read
      from "B/op" when present. Any mismatch turns the badge bad and calls L.report.
      Keyboard: a real <button> starts the race, skips to the finish while it runs, and resets it.
      Text version: the table under the track. Layout: labels left of each lane when the box is 560px or wider,
      labels above each lane (a 400-unit-wide drawing, every label 17 units) when it is narrower, so the whole
      track, finish line and results always fit; redrawn when the box crosses that width.

   2. [data-prboard]: the pull-request review board. Static HTML holds every comment card (tab buttons) and pane
      (each with the buggy program, its real run, the fix and its real run), so without script every pane is shown.
      The script turns the cards into tabs (arrow keys, Home, End) and checks each pane's claims:
        data-bug="prog.go" data-bug-claim="line\nline"   lines (consecutive) that must appear in that run's
        data-fix="prog.go" data-fix-claim="..."           stdout or stderr; the two claims must differ.
      One badge per board says whether every claim matched. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch28.js loaded before comic.js"); return; }
  var esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function runText(prog) { return (L.shown(prog) || "") + "\n" + (prog.stderr || ""); }
  function hasBlock(text, block) {
    var lines = text.split("\n"), want = block.split("\n");
    for (var i = 0; i + want.length <= lines.length; i++) {
      var ok = true;
      for (var j = 0; j < want.length; j++) if (lines[i + j] !== want[j]) { ok = false; break; }
      if (ok) return true;
    }
    return false;
  }
  function setBadge(el, ok, good, bad) { if (!el) return; el.textContent = ok ? good : bad; el.classList.toggle("bad", !ok); }

  /* ---------------- 1. the allocation race ---------------- */
  function race(box) {
    var id = box.getAttribute("data-allocrace"), node = document.getElementById(id), m;
    try { m = JSON.parse(node.textContent); } catch (e) { L.report("allocrace:" + id, "bad model JSON"); return; }
    var ok = true, lanes = m.lanes.map(function (ln) {
      var prog = L.program(ln.program), allocs = null, bytes = null, line = null;
      if (prog) {
        (L.shown(prog) || "").split("\n").forEach(function (l) { if (line === null && l.indexOf(ln.line) === 0) line = l; });
      }
      if (line !== null) {
        var a = /(\d+) allocs\/op/.exec(line) || /:\s*(\d+(?:\.\d+)?)\s*$/.exec(line);
        var b = /(\d+) B\/op/.exec(line);
        if (a) allocs = Number(a[1]);
        if (b) bytes = Number(b[1]);
      }
      if (line === null) { ok = false; L.report("allocrace:" + id, "no line starting " + JSON.stringify(ln.line) + " in " + ln.program); }
      else if (allocs !== ln.allocs) { ok = false; L.report("allocrace:" + id, ln.label + ": claimed " + ln.allocs + " allocs, real run says " + allocs); }
      return { label: ln.label, note: ln.note || "", allocs: allocs === null ? ln.allocs : allocs, bytes: bytes, line: line || "", program: ln.program };
    });
    var svg = box.querySelector("svg.race-svg"), wrap = box.querySelector(".race-wrap") || svg.parentNode;
    // geometry of the current layout: G.cy(i) is lane i's runner line
    var G = null, runners = [], stops = [], pos = lanes.map(function () { return 0; });
    function draw() {
      var narrow = (wrap.clientWidth || 680) < 560;
      G = narrow ? { W: 400, LH: 100, TOP: 34, X0: 22, X1: 380, fs: 17, nar: true }
                 : { W: 680, LH: 78, TOP: 30, X0: 190, X1: 640, fs: 15, nar: false };
      G.cy = function (i) { return G.TOP + i * G.LH + (G.nar ? 66 : 40); };
      var W = G.W, LH = G.LH, X0 = G.X0, X1 = G.X1, H = G.TOP + lanes.length * LH + 10;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.setAttribute("data-layout", G.nar ? "phone" : "wide");
      var out = '<g font-family="Comic Neue, sans-serif" font-weight="700" fill="#111111">';
      out += '<text x="' + X0 + '" y="22" font-size="' + G.fs + '">START</text><text x="' + X1 + '" y="22" font-size="' + G.fs + '" text-anchor="end">FINISH</text>';
      lanes.forEach(function (ln, i) {
        var y = G.TOP + i * LH, cy = G.cy(i), stopsTxt = ln.allocs + (ln.allocs === 1 ? " pit stop" : " pit stops");
        out += '<rect x="4" y="' + (y + 6) + '" width="' + (W - 8) + '" height="' + (LH - 10) + '" rx="10" fill="' + (i % 2 ? "#FFFFFF" : "#F4F1EA") + '" stroke="#111111" stroke-width="2.5"/>';
        if (G.nar) {
          out += '<text x="16" y="' + (y + 30) + '" font-size="18"><tspan font-family="JetBrains Mono, monospace" font-weight="800">' + esc(ln.label) + '</tspan><tspan font-size="17"> · ' + stopsTxt + "</tspan></text>";
        } else {
          out += '<text x="16" y="' + (cy - 4) + '" font-size="17" font-family="JetBrains Mono, monospace" font-weight="800">' + esc(ln.label) + "</text>";
          out += '<text x="16" y="' + (cy + 18) + '" font-size="15">' + stopsTxt + "</text>";
        }
        out += '<path d="M' + X0 + " " + (cy + 14) + " H" + X1 + '" stroke="#111111" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>';
        out += '<path d="M' + X1 + " " + (cy - 24) + " V" + (cy + 24) + '" stroke="#111111" stroke-width="5"/>';
        // one storage-unit door per allocation, spread along the track
        for (var k = 0; k < ln.allocs; k++) {
          var x = X0 + (X1 - X0) * (k + 1) / (ln.allocs + 1);   // where the runner pauses (see frame())
          out += '<rect class="race-door" x="' + (x - 5) + '" y="' + (cy + 4) + '" width="10" height="12" rx="1.5" fill="#FFD60A" stroke="#111111" stroke-width="2"/>';
        }
        out += '<g class="race-runner" data-lane="' + i + '" transform="translate(' + X0 + " " + cy + ')">' +
          '<circle r="13" cx="0" cy="-6" fill="#FF5A4E" stroke="#111111" stroke-width="3"/>' +
          '<path d="M-11 -12 Q0 -26 11 -12 Z" fill="#2E7D32" stroke="#111111" stroke-width="2.5"/>' +
          '<path d="M-6 8 l-6 8 M6 8 l6 8" stroke="#111111" stroke-width="3.5" stroke-linecap="round"/></g>';
        out += G.nar ? '<text class="race-stops" data-lane="' + i + '" x="' + (W - 16) + '" y="' + (y + 30) + '" font-size="17" text-anchor="end"></text>'
                     : '<text class="race-stops" data-lane="' + i + '" x="' + (X1 - 22) + '" y="' + (y + 26) + '" font-size="15" text-anchor="end"></text>';
      });
      out += "</g>";
      var old = [].map.call(stops, function (s) { return s.textContent; });
      svg.innerHTML = out;
      runners = svg.querySelectorAll(".race-runner"); stops = svg.querySelectorAll(".race-stops");
      lanes.forEach(function (l, i) { place(i, pos[i]); if (old[i]) stops[i].textContent = old[i]; });
    }
    var aria = lanes.map(function (l) { return l.label + ": " + l.allocs + (l.allocs === 1 ? " allocation" : " allocations"); }).join("; ");
    svg.setAttribute("aria-label", m.title + ". A race track with one lane per version; each yellow door on a lane is one allocation the runner must stop at. " + aria + ". The table below has the real lines.");

    // the text version
    var tb = box.querySelector("table.race-table tbody");
    if (tb) tb.innerHTML = lanes.map(function (l) {
      return "<tr><td><code>" + esc(l.label) + "</code></td><td>" + l.allocs + "</td><td>" + (l.bytes === null ? "not measured" : l.bytes + " B") + "</td><td><samp>" + esc(l.line.replace(/\t/g, " ").replace(/ {2,}/g, " ")) + "</samp> <small>(" + esc(l.program) + ")</small></td><td>" + l.note + "</td></tr>";
    }).join("");
    setBadge(box.querySelector(".parity"), ok, "Pit stops match the real runs", "Does not match the real runs");

    var btn = box.querySelector("[data-race-go]"), live = box.querySelector("[aria-live]"), timer = null;
    function place(i, f) {
      pos[i] = f;
      if (runners[i]) runners[i].setAttribute("transform", "translate(" + (G.X0 + (G.X1 - G.X0) * f) + " " + G.cy(i) + ")");
    }
    function finish(i, order) { stops[i].textContent = "finished " + ordinal(order); }
    function ordinal(n) { return n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"); }
    var ranks = lanes.map(function (l, i) { return i; }).sort(function (a, b) { return lanes[a].allocs - lanes[b].allocs; });
    var rankOf = []; ranks.forEach(function (li, r) { rankOf[li] = r + 1; });
    function reset() {
      if (timer) { root.cancelAnimationFrame(timer); timer = null; }
      lanes.forEach(function (l, i) { place(i, 0); stops[i].textContent = ""; });
      btn.textContent = "Start the race"; btn.setAttribute("data-state", "ready");
    }
    function done() {
      lanes.forEach(function (l, i) { place(i, 1); finish(i, rankOf[i]); });
      btn.textContent = "Reset the race"; btn.setAttribute("data-state", "done");
      if (live) live.textContent = "Race over. " + ranks.map(function (li, r) { return ordinal(r + 1) + ": " + lanes[li].label + " with " + lanes[li].allocs + (lanes[li].allocs === 1 ? " pit stop" : " pit stops"); }).join(". ") + ".";
    }
    btn.addEventListener("click", function () {
      if (btn.getAttribute("data-state") === "done") { reset(); return; }
      if (btn.getAttribute("data-state") === "running") {   // "Skip to the finish"
        if (timer) { root.cancelAnimationFrame(timer); timer = null; }
        done(); return;
      }
      if (!L.motionOn()) { done(); return; }
      btn.setAttribute("data-state", "running"); btn.textContent = "Skip to the finish";
      // model: 1 second of running plus 0.25 s per pit stop, scaled so the slowest lane takes about 5 seconds
      var dur = lanes.map(function (l) { return 1 + 0.25 * l.allocs; }), slow = Math.max.apply(null, dur), scale = 5 / slow, t0 = null;
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var t = (ts - t0) / 1000, all = true;
        lanes.forEach(function (l, i) {
          var d = dur[i] * scale, f = Math.min(1, t / d);
          if (f < 1) all = false;
          // hold at each door: the runner pauses a moment at every pit stop
          var steps = l.allocs, g = f;
          if (steps > 0 && f < 1) { var seg = 1 / (steps + 1), k = Math.floor(f / seg), r = (f - k * seg) / seg; g = (k + Math.min(1, r / 0.6)) * seg; }
          place(i, g);
          if (f >= 1 && !stops[i].textContent) finish(i, rankOf[i]);
        });
        if (all) { done(); return; }
        timer = root.requestAnimationFrame(frame);
      }
      timer = root.requestAnimationFrame(frame);
    });
    draw();
    reset();
    // redraw when the box crosses the phone/wide width (rotation, window resize); the race state is kept
    if (root.ResizeObserver) {
      new root.ResizeObserver(function () {
        if (((wrap.clientWidth || 680) < 560) !== G.nar) draw();
      }).observe(wrap);
    }
  }

  /* ---------------- 2. the pull-request review board ---------------- */
  function board(box) {
    var tabs = [].slice.call(box.querySelectorAll('[role="tab"]')), panes = [].slice.call(box.querySelectorAll('[role="tabpanel"]'));
    var ok = true, bid = box.id || "prboard";
    panes.forEach(function (p) {
      ["bug", "fix"].forEach(function (k) {
        var name = p.getAttribute("data-" + k), claim = p.getAttribute("data-" + k + "-claim");
        if (!name || claim === null) return;
        var prog = L.program(name);
        claim = claim.replace(/\\n/g, "\n");
        if (!prog || !hasBlock(runText(prog), claim)) { ok = false; L.report("prboard:" + bid, p.id + ": " + k + " claim not in the real run of " + name + ": " + JSON.stringify(claim)); }
      });
      if (p.getAttribute("data-bug-claim") === p.getAttribute("data-fix-claim")) { ok = false; L.report("prboard:" + bid, p.id + ": bug and fix claims are the same"); }
    });
    setBadge(box.querySelector(".prb-badge"), ok, "Every comment matches its real runs", "A comment does not match its real run");
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var pane = document.getElementById(t.getAttribute("aria-controls"));
        if (pane) pane.hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, j = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % n;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + n) % n;
        else if (e.key === "Home") j = 0;
        else if (e.key === "End") j = n - 1;
        if (j !== null) { e.preventDefault(); select(j, true); }
      });
    });
    box.classList.add("prb-live");
    select(0, false);
  }

  P.comic.ext(function () {
    [].forEach.call(document.querySelectorAll("[data-allocrace]"), race);
    [].forEach.call(document.querySelectorAll("[data-prboard]"), board);
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
