/* Rust book, chapter 29 extension: "Open the Restaurant" (a multithreaded web server).
   Adds, registered with the comic engine:
   (1)  cast: linecook (Chapter 26) and asyncwaiter (Chapter 27) are the engine's (comic-critters.js since engine pass 3;
        this page's copies are gone).
   (2)  [data-rushlanes]   rush hour: five diners arrive 50 ms apart at a server with 1, 2 or 4 workers. One lane per worker plus
                           the ticket rail, stepped event by event. Model: { program, gap, slow, fast, threshold, orders[], sizes[] },
                           in ticks of 50 ms. The widget plays the queue (first come, first served; a free worker takes the next
                           ticket) and works out which quick orders waited longer than `threshold`. Parity: every one of those
                           verdicts, and every order's path, must equal the matching row of the real run's block for that pool size
                           ("--- N workers ---"). Which worker takes which ticket is up to the scheduler, so the lanes are labelled
                           "one possible assignment"; only the verdicts are claimed, and they are checked.
   The stepper uses the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fills a text
   version. States are told apart by words, hatching and border style (solid = cooking or done, dashed = waiting), never by
   colour alone. Problems are reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch29.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";

  /* ---------------- (2) rush hour lanes ---------------- */
  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }

  // Play the queue: tickets in arrival order; each goes to the worker that is free first (lowest number on a tie).
  function simulate(m, size) {
    var free = [], i, jobs = [];
    for (i = 0; i < size; i++) free.push(0);
    m.orders.forEach(function (path, k) {
      var arr = k * m.gap, dur = path === "/sleep" ? m.slow : m.fast, w = 0;
      for (i = 1; i < size; i++) if (free[i] < free[w]) w = i;
      var start = Math.max(arr, free[w]), end = start + dur;
      free[w] = end;
      jobs.push({ n: k + 1, path: path, slow: path === "/sleep", arr: arr, worker: w, start: start, end: end,
        waited: path === "/sleep" ? null : (end - arr) > m.threshold });
    });
    return jobs;
  }
  function realBlock(lines, size) {
    var head = "--- " + size + " worker" + (size === 1 ? "" : "s") + " ---", at = lines.indexOf(head), out = [];
    if (at < 0) return null;
    for (var i = at + 1; i < lines.length && lines[i].indexOf("---") !== 0; i++) out.push(lines[i]);
    return { head: head, lines: out };
  }
  function rowFor(block, n) {
    var hit = block.lines.filter(function (l) { return l.indexOf("diner " + n + " ") === 0; });
    return hit.length === 1 ? hit[0] : null;
  }

  function mountRush(box) {
    var m = model(box.getAttribute("data-rushlanes")), prog = L.program(m.program);
    if (!prog) return;
    var lines = L.shown(prog).replace(/\n$/, "").split("\n");
    var bar = box.querySelector(".rl-sizes"), svg = box.querySelector(".rl-svg"), note = box.querySelector(".narration");
    var out = box.querySelector(".screen pre"), live = box.querySelector("[aria-live]"), par = box.querySelector(".controls .parity");
    var tb = box.querySelector(".transcript tbody");
    var allOk = true;

    // Build and check every pool size once.
    var sims = m.sizes.map(function (size) {
      var jobs = simulate(m, size), block = realBlock(lines, size), ok = !!block;
      if (!block) L.report("rushlanes", "no block for " + size + " worker(s) in " + m.program);
      jobs.forEach(function (j) {
        var row = block ? rowFor(block, j.n) : null;
        j.real = row || "(missing)";
        if (!row) { ok = false; L.report("rushlanes", "no row for diner " + j.n + " in the " + size + "-worker block"); return; }
        if (row.indexOf("GET " + j.path + ":") < 0) { ok = false; L.report("rushlanes", "diner " + j.n + " ordered something else in the real run"); }
        if (j.slow) { if (row.indexOf("slow dish") < 0) { ok = false; L.report("rushlanes", "diner " + j.n + " should be a stew"); } }
        else {
          var said = / waited behind a stew\? (yes|no)$/.exec(row);
          if (!said || (said[1] === "yes") !== j.waited) { ok = false; L.report("rushlanes", "diner " + j.n + " with " + size + " worker(s): the model says waited=" + j.waited + ", the real run says '" + row + "'"); }
        }
      });
      if (!ok) allOk = false;
      var times = [0];
      jobs.forEach(function (j) { [j.arr, j.start, j.end].forEach(function (t) { if (times.indexOf(t) < 0) times.push(t); }); });
      times.sort(function (a, b) { return a - b; });
      var maxT = times[times.length - 1];
      return { size: size, jobs: jobs, block: block, ok: ok, times: times, maxT: maxT };
    });
    var maxAll = Math.max.apply(null, sims.map(function (s) { return s.maxT; }));

    bar.insertAdjacentHTML("beforeend", sims.map(function (s) {
      return '<button type="button" class="path-btn" aria-pressed="false" data-size="' + s.size + '">' + s.size + " worker" + (s.size === 1 ? "" : "s") + "</button>";
    }).join(""));

    var cur = sims[0];
    var X0 = 104, PX = (690 - X0 - 16) / (maxAll + 1);
    function x(t) { return X0 + t * PX; }

    function draw(T, last) {
      var n = cur.size, railRow = 23, railTop = 34, railH = m.orders.length * railRow + 10, laneTop = railTop + railH + 14, laneH = 50;
      var H = laneTop + n * laneH + 52, o = "";
      o += '<defs><pattern id="rl-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#FFF6CC"/><path d="M0 0 V8" stroke="#111111" stroke-width="2"/></pattern></defs>';
      // the rail
      o += '<rect x="' + (X0 - 4) + '" y="' + railTop + '" width="' + (690 - X0 - 8) + '" height="' + railH + '" rx="8" fill="#F4F1EA" stroke="#111111" stroke-width="2.5"/>';
      o += '<text class="rl-lab" x="8" y="' + (railTop + 22) + '">ticket</text><text class="rl-lab" x="8" y="' + (railTop + 42) + '">rail</text>';
      cur.jobs.forEach(function (j, k) {
        if (j.arr > T) return;
        var y = railTop + 6 + k * railRow, to = Math.min(j.start, T);
        if (to > j.arr) {
          o += '<rect x="' + x(j.arr) + '" y="' + y + '" width="' + (x(to) - x(j.arr)) + '" height="' + (railRow - 5) + '" rx="3" fill="#FFFFFF" stroke="#111111" stroke-width="2" stroke-dasharray="5 4"/>';
        }
        var lab = "d" + j.n + (j.start > T ? " waits" : "");
        o += '<text class="rl-tk" x="' + (x(j.arr) + 4) + '" y="' + (y + railRow - 9) + '">' + esc(lab) + "</text>";
      });
      // worker lanes
      for (var w = 0; w < n; w++) {
        var y0 = laneTop + w * laneH;
        o += '<line x1="' + (X0 - 4) + '" x2="' + (690 - 12) + '" y1="' + (y0 + laneH - 4) + '" y2="' + (y0 + laneH - 4) + '" stroke="#B9C7E3" stroke-width="2"/>';
        o += '<text class="rl-lab" x="8" y="' + (y0 + 30) + '">worker ' + w + "</text>";
      }
      cur.jobs.forEach(function (j) {
        if (j.start > T) return;
        var y0 = laneTop + j.worker * laneH + 6, to = Math.min(j.end, T), cooking = j.end > T, wpx = Math.max(x(to) - x(j.start), 3);
        o += '<rect x="' + x(j.start) + '" y="' + y0 + '" width="' + wpx + '" height="' + (laneH - 16) + '" rx="4" fill="' + (j.slow ? "url(#rl-hatch)" : "#FFFFFF") + '" stroke="#111111" stroke-width="' + (cooking ? 4 : 2.5) + '"/>';
        var label = "d" + j.n + (j.slow ? " stew" : "");
        var lx = x(j.start) + 4, fits = wpx > (j.slow ? 84 : 30);   // the label's white backing fits 16-unit text ("d1 stew" is 7 characters)
        if (fits) o += '<rect x="' + (lx - 1) + '" y="' + (y0 + 6) + '" width="' + (j.slow ? 80 : 28) + '" height="22" rx="3" fill="#FFFFFF"/>';
        o += '<text class="rl-job" x="' + (fits ? lx + 1 : x(j.start) + wpx + 4) + '" y="' + (y0 + 22) + '">' + esc(label + (cooking ? " ▶" : "")) + "</text>";
      });
      // time axis
      var ay = laneTop + n * laneH + 6;
      o += '<line x1="' + X0 + '" x2="' + x(maxAll + 0.5) + '" y1="' + ay + '" y2="' + ay + '" stroke="#111111" stroke-width="2.5"/>';
      for (var t = 0; t <= maxAll; t += 4) {
        o += '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="' + ay + '" y2="' + (ay + 6) + '" stroke="#111111" stroke-width="2"/>';
        o += '<text class="rl-ax" x="' + x(t) + '" y="' + (ay + 22) + '" text-anchor="middle">' + (t * 50) + "</text>";
      }
      o += '<text class="rl-ax" x="8" y="' + (ay + 22) + '">ms</text>';
      // now line
      o += '<line x1="' + x(T) + '" x2="' + x(T) + '" y1="' + (railTop - 8) + '" y2="' + (ay + 2) + '" stroke="#111111" stroke-width="2.5" stroke-dasharray="3 5"/>';
      o += '<text class="rl-now" x="' + Math.min(x(T), 690 - 60) + '" y="' + (railTop - 14) + '" text-anchor="middle">' + (last ? "all served" : "now: " + (T * 50) + " ms") + "</text>";
      svg.setAttribute("viewBox", "0 0 690 " + H);
      svg.innerHTML = o;
    }

    function story(T, last) {
      var bits = [];
      cur.jobs.forEach(function (j) {
        var what = j.slow ? "a stew (800 ms)" : "a quick hello";
        if (j.arr === T) bits.push("Diner " + j.n + " arrives and orders " + what + ". The ticket goes on the rail.");
        if (j.start === T) bits.push("Worker " + j.worker + " takes diner " + j.n + "'s ticket" + (j.start > j.arr ? ", after it waited " + ((j.start - j.arr) * 50) + " ms on the rail." : " straight away."));
        if (j.end === T && j.end !== j.start) bits.push("Worker " + j.worker + " plates diner " + j.n + "'s " + (j.slow ? "stew" : "order") + ".");
      });
      if (last) {
        var waited = cur.jobs.filter(function (j) { return j.waited; }).map(function (j) { return "diner " + j.n; });
        bits.push("Everyone is served. Quick orders that waited behind a stew: " + (waited.length ? waited.join(", ") : "none") + ". The real run printed the same verdicts.");
      }
      return bits.join(" ");
    }

    function render(st, announce) {
      var T = cur.times[st.step], last = st.step === cur.times.length - 1;
      draw(T, last);
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.times.length + "</span>" + esc(story(T, last));
      out.innerHTML = last ? esc(cur.block.head) + "\n" + cur.block.lines.map(esc).join("\n")
        : '<span class="empty">Nothing on the screen yet: rush.rs prints its table once every diner is back.</span>';
      if (live && announce) live.textContent = cur.size + " worker" + (cur.size === 1 ? "" : "s") + ", step " + (st.step + 1) + ". " + story(T, last);
    }
    var rn = L.runner(box, cur.times.length, render, { reserve: true });
    function choose(size) {
      cur = sims.filter(function (s) { return s.size === size; })[0] || sims[0];
      var bs = bar.querySelectorAll(".path-btn");
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", +bs[i].getAttribute("data-size") === cur.size ? "true" : "false");
      if (par) { par.textContent = cur.ok ? "Matches the real run of " + m.program + " (" + cur.block.head.replace(/-/g, "").trim() + ")" : "Does not match the real run of " + m.program; par.classList.toggle("bad", !cur.ok); }
      if (tb) tb.innerHTML = cur.jobs.map(function (j) {
        return "<tr><td>" + j.n + "</td><td>GET " + esc(j.path) + "</td><td>" + j.arr * 50 + " ms</td><td>worker " + j.worker + " (one possible)</td><td>" + j.start * 50 + " ms</td><td>" + (j.slow ? "about " + j.end * 50 + " ms" : "right after it starts") + "</td><td>" + (j.slow ? "(slow dish)" : (j.waited ? "yes" : "no")) + "</td><td><samp>" + esc(j.real) + "</samp></td></tr>";
      }).join("");
      rn.reset(cur.times.length);
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn");
      if (b) { choose(+b.getAttribute("data-size")); if (live) live.textContent = "Showing " + b.textContent + "."; }
    });
    choose(sims[0].size);
    if (!allOk && par) par.classList.add("bad");
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-rushlanes]");
    for (var i = 0; i < b.length; i++) { try { mountRush(b[i]); } catch (e) { L.report("rushlanes", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
