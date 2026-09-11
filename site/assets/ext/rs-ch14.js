/* Rust book, chapter 14 ("Buildings and Inspectors"). Two additions, all drawn in code. (The Inspector character,
   data-char="inspector", first drawn here, now lives in comic-critters.js.)

   1. [data-building]: the module tree drawn as a building. The crate is the building, modules are rooms (nested rooms are
      rooms inside rooms), and every room and item has a door marked with an icon AND a word: "pub" (open door) or
      "private" (padlock). Path buttons walk Mabel from main to an item, one door at a time.
        Markup:
          <section class="panel sketch building" data-building="MODEL-ID" aria-label="...">
            <div class="paths" role="group" aria-label="Choose a path"><span class="label">WALK FROM main TO:</span></div>
            <div class="bld-stage"><svg class="bld-svg" role="img" aria-label="..."></svg></div>
            <div class="screen"><p class="label">SCREEN</p><pre></pre></div>
            <p class="narration"></p>
            <div class="controls"><div class="btns">prev / next / play / reset buttons</div><span class="parity"></span></div>
            <p class="sr-only" aria-live="polite"></p>
            <details><summary>Text version</summary><div class="bld-text"></div><table class="transcript">...</table></details>
            <script type="application/json" id="MODEL-ID">{ "program": "library.rs",
              "rooms": [{"id": "front_desk", "parent": null, "pub": false}, ...],        parent null = the crate root
              "items": [{"id": "check_out", "room": "front_desk", "kind": "fn", "pub": true}, ...],
              "paths": [{"id": "p1", "label": "front_desk::check_out", "route": ["front_desk", "check_out"],
                         "program": "library.rs", "expectLine": "checked out: Owls"}, ...] }</script>
          </section>
        Parity, two kinds:
          - every room and item is looked up in the program's real source: "pub mod x" / "pub fn x" must be there exactly
            when the model says pub, and "mod x" / "fn x" must be there at all;
          - each walk is decided in the browser from Rust's rule (an item is reachable from main if it is pub, or if main's
            room is the room the item sits in or a room around it), and then compared with that path's real run: an open
            walk must have exit 0 and print expectLine; a locked walk must fail with error[E0603] naming the locked door.
          Any mismatch goes to L.report (a console error the checker catches) and turns the badge bad.

   2. [data-testboard]: a real terminal run with numbered callouts, for reading a cargo test report part by part.
        (Named data-testboard, not data-report: other chapters use [data-report] for different widgets.)
        <section class="panel clean testboard" data-testboard="MODEL-ID" aria-label="...">
          <div class="rep-wrap"><ol class="rep-lines" aria-label="..."></ol></div><ol class="rep-notes"></ol><span class="parity"></span>
          <script type="application/json" id="MODEL-ID">{"program": "report.rs", "step": 0,
            "marks": [{"n": 1, "match": "Running unittests", "lines": 1, "note": "HTML"}, ...]}</script>
        Every output line shown comes from the capture (stdout and stderr in their real order, stderr in error style).
        Each mark must match a real line, or L.report fires. Pressing a note's number highlights its lines (keyboard: the
        numbers are toggle buttons with aria-pressed, styled like the engine's .path-btn). The text version is the text itself. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch14.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111", NS = "http://www.w3.org/2000/svg";

  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function tx(p, x, y, s, cls) { var t = sv("text", { x: x, y: y, "class": cls }, p); t.textContent = s; return t; }

  /* ======================= 1. the building ======================= */
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // An open door (pub) or a closed door with a padlock (private), drawn at (x, y), 24 x 30.
  function door(g, x, y, open) {
    sv("rect", { x: x, y: y, width: 24, height: 30, rx: 2, "class": "bld-frame" }, g);
    if (open) {
      sv("path", { d: "M" + (x + 2) + " " + (y + 2) + " l12 4 v26 l-12 -4 z", "class": "bld-leaf open" }, g);
      sv("circle", { cx: x + 11, cy: y + 18, r: 1.8, "class": "bld-knob" }, g);
    } else {
      sv("rect", { x: x + 2, y: y + 2, width: 20, height: 26, "class": "bld-leaf" }, g);
      sv("path", { d: "M" + (x + 8) + " " + (y + 15) + " v-4 a4 4 0 0 1 8 0 v4", "class": "bld-shackle" }, g);
      sv("rect", { x: x + 6, y: y + 14, width: 12, height: 10, rx: 2, "class": "bld-lock" }, g);
    }
  }

  function mountBuilding(box) {
    var id = box.getAttribute("data-building");
    var m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = prog.src, bad = [];
    var rooms = {}, kids = { "": [] };
    m.rooms.forEach(function (r) { rooms[r.id] = r; kids[r.id] = []; });
    m.rooms.forEach(function (r) { kids[r.parent || ""].push({ t: "room", r: r }); });
    m.items.forEach(function (it) { (kids[it.room || ""] = kids[it.room || ""] || []).push({ t: "item", r: it }); });
    var byId = {};
    m.rooms.forEach(function (r) { byId[r.id] = { kind: "mod", pub: r.pub, parent: r.parent || "", name: r.id }; });
    m.items.forEach(function (it) { byId[it.id] = { kind: it.kind, pub: it.pub, parent: it.room || "", name: it.id }; });

    // source parity: every door in the picture is the door in the real file
    Object.keys(byId).forEach(function (k) {
      var d = byId[k], kw = d.kind === "mod" ? "mod" : d.kind;
      var any = new RegExp("(^|\\s)" + kw + "\\s+" + escRe(d.name) + "\\b", "m").test(src);
      var pub = new RegExp("(^|\\s)pub\\s+" + kw + "\\s+" + escRe(d.name) + "\\b", "m").test(src);
      if (!any) bad.push(kw + " " + d.name + " is not in " + m.program);
      else if (pub !== !!d.pub) bad.push(kw + " " + d.name + " is " + (pub ? "pub" : "private") + " in " + m.program + " but drawn " + (d.pub ? "pub" : "private"));
    });

    // Rust's rule, as the Compiler applies it: from main (in the crate root), a name is reachable if it is pub,
    // or if the crate root is the room it sits in or a room around it. For main that second case is only the root itself.
    function inside(viewer, room) { var r = viewer; while (true) { if (r === room) return true; if (r === "") return false; r = byId[r] ? byId[r].parent : ""; } }
    var walks = m.paths.map(function (p) {
      var steps = [], locked = null;
      p.route.forEach(function (name) {
        if (locked) return;
        var d = byId[name];
        if (!d) { bad.push("path " + p.label + " names unknown " + name); return; }
        var ok = d.pub || inside("", d.parent);
        steps.push({ name: name, ok: ok, why: d.pub ? "pub" : (ok ? "private, but main is in the same room" : "private") });
        if (!ok) locked = d;
      });
      var cap = L.program(p.program), verdict = "";
      if (cap) {
        if (locked) {
          var want = "error[E0603]: " + (locked.kind === "mod" ? "module" : locked.kind === "fn" ? "function" : locked.kind) + " `" + locked.name + "` is private";
          var errLine = (cap.stderr || "").split("\n").filter(function (l) { return l.indexOf(want) === 0; })[0];
          if (!errLine || cap.exit === 0) bad.push("walk " + p.label + ": the rule says locked at " + locked.name + ", but " + p.program + " did not fail with: " + want);
          verdict = errLine || want;
        } else {
          var lines = (cap.stdout || "").split("\n");
          if (cap.exit !== 0 || lines.indexOf(p.expectLine) < 0) bad.push("walk " + p.label + ": the rule says open, but " + p.program + " did not print: " + p.expectLine);
          verdict = p.expectLine;
        }
      }
      return { p: p, steps: steps, locked: locked, verdict: verdict };
    });
    bad.forEach(function (b) { L.report("building:" + id, b); });
    var par = box.querySelector(".parity");
    if (par) {
      par.textContent = bad.length ? bad.length + " door(s) do not match the real program" : "Every door matches " + m.program + ", and every walk matches a real run";
      par.classList.toggle("bad", !!bad.length);
    }

    var svg = box.querySelector(".bld-svg"), chips = box.querySelector(".paths"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var current = 0, wideNow = null, pos = {};

    // layout: rooms are boxes; items are rows; child rooms nest inside their parent
    var ROW = 40, HEAD = 46, PAD = 12;
    function measure(list) {
      var h = 0;
      list.forEach(function (k) { h += k.t === "item" ? ROW : roomH(k.r.id) + 10; });
      return h;
    }
    function roomH(rid) { return HEAD + measure(kids[rid]) + PAD; }
    function drawList(g, list, x, y, w, depth) {
      list.forEach(function (k) {
        if (k.t === "item") { drawItem(g, k.r, x, y, w); y += ROW; }
        else { var h = roomH(k.r.id); drawRoom(g, k.r, x, y, w, h, depth); y += h + 10; }
      });
    }
    function drawItem(g, it, x, y, w) {
      var gi = sv("g", { "class": "bld-item", "data-id": it.id }, g);
      sv("rect", { x: x, y: y + 2, width: w, height: ROW - 6, rx: 6, "class": "bld-itembox" }, gi);
      door(gi, x + 6, y + 4, it.pub);
      tx(gi, x + 38, y + 25, it.kind + " " + it.id, "bld-iname");
      tx(gi, x + w - 8, y + 25, it.pub ? "pub" : "private", "bld-word end");
      pos[it.id] = { x: x, y: y + 2, w: w, h: ROW - 6 };
    }
    var FILLS = ["#FFF6CC", "#DDE8FF", "#C9F2D9"];
    function drawRoom(g, r, x, y, w, h, depth) {
      var gr = sv("g", { "class": "bld-room", "data-id": r.id }, g);
      sv("rect", { x: x, y: y, width: w, height: h, rx: 10, fill: FILLS[depth % 3], "class": "bld-roombox" }, gr);
      door(gr, x + 8, y + 8, r.pub);
      tx(gr, x + 40, y + 30, "mod " + r.id, "bld-rname");
      tx(gr, x + w - 10, y + 30, r.pub ? "pub" : "private", "bld-word end");
      pos[r.id] = { x: x, y: y, w: w, h: HEAD - 6 };
      drawList(gr, kids[r.id], x + PAD, y + HEAD, w - 2 * PAD, depth + 1);
    }
    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      pos = {};
      var wide = box.clientWidth > 600, W = wide ? 700 : 330, top = 66;
      var g = sv("g", {}, svg);
      var items = kids[""].filter(function (k) { return k.t === "item"; }), rms = kids[""].filter(function (k) { return k.t === "room"; });
      var H;
      // the building outline, its roof and its name
      if (wide) {
        var colW = (W - 3 * 16) / 2, ys = [top + items.length * ROW + 8, top + items.length * ROW + 8], col = 0;
        drawList(g, items, 16, top, W - 32, 0);
        rms.forEach(function (k) { var c = ys[0] <= ys[1] ? 0 : 1; var h = roomH(k.r.id); drawRoom(g, k.r, 16 + c * (colW + 16), ys[c], colW, h, 0); ys[c] += h + 10; col++; });
        H = Math.max(ys[0], ys[1]) + 6;
      } else {
        H = top + measure(kids[""]) + 6;
        drawList(g, items, 12, top, W - 24, 0);
        var y = top + items.length * ROW + 8;
        rms.forEach(function (k) { var h = roomH(k.r.id); drawRoom(g, k.r, 12, y, W - 24, h, 0); y += h + 10; });
        H = y;
      }
      var shell = sv("g", {}, svg);
      svg.insertBefore(shell, g);
      sv("path", { d: "M4 " + (top - 8) + " L" + (W / 2) + " 6 L" + (W - 4) + " " + (top - 8) + " Z", "class": "bld-roof" }, shell);
      sv("rect", { x: 4, y: top - 8, width: W - 8, height: H - top + 14, rx: 6, "class": "bld-shell" }, shell);
      tx(shell, W / 2, top - 22, m.crateLabel || "the crate", "bld-cname mid");
      svg.setAttribute("viewBox", "0 0 " + W + " " + (H + 12));
      wideNow = wide;
    }

    function stepsOf(w) {
      var s = [{ on: "main", note: "Mabel starts in <code>main</code>, in the crate's lobby (the crate root). She wants to reach <code>" + esc(w.p.label) + "</code>.", out: [] }];
      w.steps.forEach(function (st, i) {
        var d = byId[st.name];
        var what = (d.kind === "mod" ? "the room <code>" : "<code>" + d.kind + " ") + esc(st.name) + "</code>" + (d.kind === "mod" ? "" : "");
        s.push({ on: st.name, ok: st.ok, note: (st.ok
          ? (d.pub ? "Door " + (i + 1) + ": " + what + " is marked <b>pub</b>. Open. ✓" : "Door " + (i + 1) + ": " + what + " is <b>private</b>, but it sits in the lobby, and so does <code>main</code>. Neighbours may use each other's private things. Open. ✓")
          : "Door " + (i + 1) + ": " + what + " is <b>private</b>, and <code>main</code> is not inside " + (d.parent ? "<code>" + esc(d.parent) + "</code>" : "its room") + ". Locked. ✗"), out: [] });
      });
      var last = w.locked
        ? { on: w.locked.name, ok: false, note: "The Compiler stops the build here, before anything runs. The real message from <code>" + esc(w.p.program) + "</code> is on the screen.", out: [w.verdict], err: true }
        : { on: w.steps[w.steps.length - 1].name, ok: true, note: "Every door on the way was open, so the call compiles and runs. The screen shows the line it really printed (from <code>" + esc(w.p.program) + "</code>).", out: [w.verdict] };
      s.push(last);
      return s;
    }

    var walkSteps = walks.map(stepsOf);
    function render(st, announce) {
      var s = walkSteps[current][st.step];
      var nodes = svg.querySelectorAll(".bld-room, .bld-item");
      for (var i = 0; i < nodes.length; i++) { nodes[i].classList.remove("now", "passed", "blocked"); nodes[i].removeAttribute("data-now"); }
      // everything walked through so far is "passed"; the current spot is "now"; a locked door is "blocked"
      for (var k = 1; k <= st.step && k < walkSteps[current].length; k++) {
        var on = walkSteps[current][k].on, el = svg.querySelector('[data-id="' + on + '"]');
        if (el) el.classList.add(walkSteps[current][k].ok === false ? "blocked" : "passed");
      }
      var cur = svg.querySelector('[data-id="' + s.on + '"]');
      if (cur) { cur.classList.add("now"); cur.setAttribute("data-now", ""); }   // data-now: the engine keeps it in view on phones
      var mark = svg.querySelector(".bld-mark"); if (mark) mark.parentNode.removeChild(mark);
      var p = pos[s.on];
      if (p) {
        // a round badge on the door: ▶ where Mabel starts, ✓ for an open door, ✗ for a locked one
        var g = sv("g", { "class": "bld-mark" }, svg);
        var sym = st.step === 0 ? "▶" : s.ok === false ? "✗" : "✓";
        sv("circle", { cx: p.x + 6, cy: p.y + 6, r: 15, "class": "bld-tag" + (s.ok === false ? " no" : "") }, g);
        tx(g, p.x + 6, p.y + 13, sym, "bld-tagtext mid");
      }
      out.innerHTML = s.out.length ? s.out.map(function (l) { return '<span class="' + (s.err ? "err" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing yet: the Compiler is still checking the doors.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + walkSteps[current].length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    chips.insertAdjacentHTML("beforeend", walks.map(function (w, i) { return '<button type="button" class="path-btn" aria-pressed="' + (i === 0) + '" data-i="' + i + '"><code>' + esc(w.p.label) + "</code></button>"; }).join(""));
    draw();
    var run = L.runner(box, walkSteps[0].length, render, { reserve: true });   // keep the buttons still: tallest step's height
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn"); if (!b) return;
      current = Number(b.getAttribute("data-i"));
      var bs = chips.querySelectorAll(".path-btn");
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(i === current));
      run.reset(walkSteps[current].length);
    });
    run.reset(walkSteps[0].length);
    root.addEventListener("resize", function () { if ((box.clientWidth > 600) !== wideNow) { draw(); run.reset(walkSteps[current].length); } });

    // text version: the tree, then every walk
    var tv = box.querySelector(".bld-text");
    if (tv) {
      var list = function (rid) {
        return "<ul>" + kids[rid].map(function (k) {
          if (k.t === "item") return "<li><code>" + esc(k.r.kind + " " + k.r.id) + "</code>: " + (k.r.pub ? "pub (open door)" : "private (locked door)") + "</li>";
          return "<li>room <code>mod " + esc(k.r.id) + "</code>: " + (k.r.pub ? "pub (open door)" : "private (locked door)") + list(k.r.id) + "</li>";
        }).join("") + "</ul>";
      };
      tv.innerHTML = "<p>The crate (lobby) holds:</p>" + list("");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = walks.map(function (w) {
      return "<tr><td><code>" + esc(w.p.label) + "</code></td><td>" + w.steps.map(function (s) { return esc(s.name) + ": " + (s.ok ? "open (" + esc(s.why) + ")" : "locked (private)"); }).join("; ") + "</td><td><code>" + esc(w.verdict) + "</code> (real run of " + esc(w.p.program) + ")</td></tr>";
    }).join("");
  }

  /* ======================= 2. the annotated report ======================= */
  function mountReport(box) {
    var id = box.getAttribute("data-testboard");
    var m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var steps = prog.steps || [{ cmd: "", out: prog.stdout, err: prog.stderr, exit: prog.exit }];
    var st = steps[m.step == null ? steps.length - 1 : m.step];
    // With no recorded interleaving (a run that varies can't be re-run for it), put cargo's own status lines where cargo
    // prints them: everything up to its "Running ..." line comes before the test program's report, the rest after it.
    var text = st.merged;
    if (text == null) {
      var el = (st.err || "").replace(/\n$/, "").split("\n"), cut = 0;
      el.forEach(function (l, i) { if (/^\s*Running /.test(l)) cut = i + 1; });
      text = (cut ? el.slice(0, cut).join("\n") + "\n" : "") + st.out + (el.slice(cut).join("\n") ? el.slice(cut).join("\n") + "\n" : "");
    }
    var lines = text.replace(/\n$/, "").split("\n");
    // stderr lines are shown in error style. The merged run is a second real run, so a timing on a cargo status line
    // can differ by a hundredth: compare with digits left out.
    function key(l) { return l.replace(/[0-9]+/g, "#"); }
    var errSet = {}; (st.err || "").split("\n").forEach(function (l) { if (l) errSet[key(l)] = true; });
    var marks = {}, bad = [];
    m.marks.forEach(function (mk) {
      var at = -1;
      for (var i = 0; i < lines.length; i++) { if (lines[i].indexOf(mk.match) >= 0 && !(i in marks)) { at = i; break; } }
      if (at < 0) { bad.push("mark " + mk.n + " (" + mk.match + ") is not in the real output of " + m.program); return; }
      for (var j = 0; j < (mk.lines || 1); j++) marks[at + j] = mk.n;
    });
    bad.forEach(function (b) { L.report("testboard:" + id, b); });
    var ol = box.querySelector(".rep-lines"), notes = box.querySelector(".rep-notes");
    var dir = st.dir || "~";
    ol.innerHTML = '<li class="rep-prompt"><span class="rep-n" aria-hidden="true"></span><span class="rep-t">you@laptop:' + esc(dir) + "$ " + esc(st.cmd) + "</span></li>" + lines.map(function (l, i) {
      var n = marks[i], first = n && marks[i - 1] !== n;
      return '<li class="' + (l && errSet[key(l)] ? "err " : "") + (n ? "marked m" + n : "") + '" data-n="' + (n || "") + '"><span class="rep-n">' + (first ? '<span class="rep-badge">' + n + "</span>" : "") + '</span><span class="rep-t">' + (l ? esc(l) : " ") + "</span></li>";
    }).join("");
    notes.innerHTML = m.marks.map(function (mk) {
      return '<li><button type="button" class="path-btn rep-pick" data-n="' + mk.n + '" aria-pressed="false" aria-label="Highlight part ' + mk.n + '">' + mk.n + "</button><div>" + mk.note + "</div></li>";
    }).join("");
    notes.addEventListener("click", function (e) {
      var b = e.target.closest(".rep-pick"); if (!b) return;
      var n = b.getAttribute("data-n"), on = b.getAttribute("aria-pressed") !== "true";
      var bs = notes.querySelectorAll(".rep-pick");
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(on && bs[i] === b));
      var lis = ol.querySelectorAll("li");
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("lit", on && lis[k].getAttribute("data-n") === n);
      var first = ol.querySelector("li.lit");
      // on desktop the report box scrolls on its own; on phones it grows with the page, and this does nothing
      var wrap = box.querySelector(".rep-wrap");
      if (first && wrap.scrollHeight > wrap.clientHeight + 1) wrap.scrollTop = Math.max(0, first.offsetTop - 30);
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad.length ? bad.length + " callout(s) do not match the real run" : "Every line is the real run of " + m.program + " (" + st.cmd + ")"; par.classList.toggle("bad", !!bad.length); }
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-building]");
    for (var i = 0; i < b.length; i++) { try { mountBuilding(b[i]); } catch (e) { L.report("building:" + b[i].id, e.message); } }
    var r = document.querySelectorAll("[data-testboard]");
    for (var j = 0; j < r.length; j++) { try { mountReport(r[j]); } catch (e) { L.report("testboard:" + r[j].id, e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
