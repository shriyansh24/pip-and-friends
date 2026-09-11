/* Rust book, chapter 24 ("Cities and Pyramids"). Two additions, all drawn in code (the Inspector, item 1 below, now
   comes from assets/comic-critters.js; this file no longer carries a copy):

   1. data-char="inspector": the Inspector, the quality-control inspector for tests first drawn in Chapter 14
      (assets/ext/rs-ch14.js). The drawing code below is an unchanged copy, because a chapter may not load another
      chapter's extension (Chapter 16 does the same). Yellow hard hat with a label, orange safety vest, a clipboard
      checklist and a rubber stamp.
        data-stamp = "pass" | "fail" | "none" (default none); a FAIL stamp also has a dashed border, so the verdict never
                     depends on colour.
        data-mood  = normal | happy | stern
        data-label = text on the hat band (<= 6 chars, default "TEST")
      Engine request (repeated from Chapter 16): move the Inspector into assets/comic-critters.js.

   2. [data-testreport]: a real terminal run with numbered callouts, for reading a long `cargo test` report part by part.
      Same idea as Chapter 14's [data-report], renamed so the two can never clash.
        <section class="panel clean testreport" data-testreport="MODEL-ID" aria-label="...">
          <div class="rep-wrap"><ol class="rep-lines" aria-label="..."></ol></div><ol class="rep-notes"></ol><span class="parity"></span>
          <script type="application/json" id="MODEL-ID">{"program": "full.rs", "step": 0,
            "marks": [{"n": 1, "match": "Running unittests src/lib.rs", "lines": 1, "note": "HTML"}, ...]}</script>
        </section>
      Every line shown is the capture's own text (stdout and stderr in their real order). Each mark must match a real
      line, or L.report fires and the badge turns bad. A note's number is a button that highlights its lines.

   3. [data-citytree]: the real `cargo tree` output of a workspace, drawn as a city: every crate is a building, every
      dependency is a road. Buttons pick a building; its roads out ("needs") are drawn thick and solid, its roads in
      ("needed by") thick and dashed, and a sentence says the same in words.
        <section class="panel sketch citytree" data-citytree="MODEL-ID" aria-label="...">
          <div class="ct-pick" role="group" aria-label="Pick a building"><span class="label">PICK A BUILDING:</span></div>
          <div class="ct-stage"><svg class="ct-svg" role="img" aria-label="..."></svg></div>
          <p class="narration"></p><span class="parity"></span><p class="sr-only" aria-live="polite"></p>
          <details><summary>Text version</summary><div class="ct-text"></div></details>
          <script type="application/json" id="MODEL-ID">{"program": "town_tree.rs", "step": 0, "size": [680, 330],
            "crates": {"desk": {"x": 260, "y": 30, "kind": "bin", "about": "..."}, ...},
            "edges": [["desk", "catalog"], ...]}</script>
        </section>
      Parity: the output is parsed (one crate per line; the depth comes from the 4-character "│   ", "├── ", "└── " and
      "    " groups), giving the members (lines at depth 0), each crate's version, and every parent -> child edge.
      The model's crates must be exactly the members, and its edges exactly the parsed edges; any mismatch goes to
      L.report. Names and versions drawn on the buildings are read from the output, not from the model. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch24.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111", NS = "http://www.w3.org/2000/svg";

  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function tx(p, x, y, s, cls) { var t = sv("text", { x: x, y: y, "class": cls }, p); t.textContent = s; return t; }
  function stepOf(prog, i) {
    var steps = prog.steps || [{ cmd: "", out: prog.stdout, err: prog.stderr, exit: prog.exit }];
    return steps[i == null ? steps.length - 1 : i];
  }

  /* ======================= 2. the annotated test report ======================= */
  function mountReport(box) {
    var id = box.getAttribute("data-testreport");
    var m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var st = stepOf(prog, m.step);
    var text = st.merged != null ? st.merged : st.out + st.err;
    var lines = text.replace(/\n$/, "").split("\n");
    var errSet = {}; (st.err || "").split("\n").forEach(function (l) { if (l) errSet[l] = true; });
    var marks = {}, bad = [];
    m.marks.forEach(function (mk) {
      var at = -1;
      for (var i = 0; i < lines.length; i++) { if (lines[i].indexOf(mk.match) >= 0 && !(i in marks)) { at = i; break; } }
      if (at < 0) { bad.push("mark " + mk.n + " (" + mk.match + ") is not in the real output of " + m.program); return; }
      for (var j = 0; j < (mk.lines || 1); j++) marks[at + j] = mk.n;
    });
    bad.forEach(function (b) { L.report("testreport:" + id, b); });
    var ol = box.querySelector(".rep-lines"), notes = box.querySelector(".rep-notes");
    ol.innerHTML = '<li class="rep-prompt"><span class="rep-n" aria-hidden="true"></span><span class="rep-t">you@laptop:' + esc(st.dir || "~") + "$ " + esc(st.cmd) + "</span></li>" + lines.map(function (l, i) {
      var n = marks[i], first = n && marks[i - 1] !== n;
      return '<li class="' + (l && errSet[l] ? "err " : "") + (n ? "marked" : "") + '" data-n="' + (n || "") + '"><span class="rep-n">' + (first ? '<span class="rep-badge">' + n + "</span>" : "") + '</span><span class="rep-t">' + (l ? esc(l) : " ") + "</span></li>";
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
      var first = ol.querySelector("li.lit"), wrap = box.querySelector(".rep-wrap");
      if (first) wrap.scrollTop = Math.max(0, first.offsetTop - 30);
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad.length ? bad.length + " callout(s) do not match the real run" : "Every line is the real run of " + m.program; par.classList.toggle("bad", !!bad.length); }
  }

  /* ======================= 3. cargo tree, drawn as a city ======================= */
  function parseTree(text) {
    var crates = {}, members = [], edges = [], stack = [];
    text.replace(/\n$/, "").split("\n").forEach(function (line) {
      if (!line.trim()) return;
      var depth = 0, rest = line;
      while (/^(│   |├── |└── |    )/.test(rest)) { depth++; rest = rest.slice(4); }
      var mm = /^(\S+) v(\S+)/.exec(rest); if (!mm) return;
      var name = mm[1];
      crates[name] = mm[2];
      stack[depth] = name; stack.length = depth + 1;
      if (depth === 0) { if (members.indexOf(name) < 0) members.push(name); }
      else { var key = stack[depth - 1] + ">" + name; if (edges.indexOf(key) < 0) edges.push(key); }
    });
    return { versions: crates, members: members, edges: edges };
  }

  function mountCity(box) {
    var id = box.getAttribute("data-citytree");
    var m = JSON.parse(document.getElementById(id).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var st = stepOf(prog, m.step);
    var real = parseTree(st.out), bad = [];
    var names = Object.keys(m.crates);
    names.forEach(function (n) { if (real.members.indexOf(n) < 0) bad.push("crate " + n + " is not a member in the real cargo tree"); });
    real.members.forEach(function (n) { if (!m.crates[n]) bad.push("member " + n + " of the real cargo tree is not drawn"); });
    var mEdges = m.edges.map(function (e) { return e[0] + ">" + e[1]; });
    mEdges.forEach(function (e) { if (real.edges.indexOf(e) < 0) bad.push("road " + e + " is not in the real cargo tree"); });
    real.edges.forEach(function (e) { if (mEdges.indexOf(e) < 0) bad.push("road " + e + " from the real cargo tree is not drawn"); });
    bad.forEach(function (b) { L.report("citytree:" + id, b); });

    var svg = box.querySelector(".ct-svg"), W = m.size[0], H = m.size[1], BW = 150, BH = 92;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var gRoads = sv("g", {}, svg), gB = sv("g", {}, svg);
    var defs = sv("defs", {}, svg);
    var mk = sv("marker", { id: id + "-arrow", viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, defs);
    sv("path", { d: "M0 0 L10 5 L0 10 z", fill: INK }, mk);
    function centre(n) { var c = m.crates[n]; return [c.x + BW / 2, c.y + BH / 2]; }
    // a road leaves the dependent building's edge and stops at the dependency's edge (clip a centre-to-centre line to both boxes)
    function clip(from, to) {
      var a = centre(from), b = centre(to), dx = b[0] - a[0], dy = b[1] - a[1];
      function t(dx, dy) { var tx = dx ? (BW / 2 + 6) / Math.abs(dx) : Infinity, ty = dy ? (BH / 2 + 6) / Math.abs(dy) : Infinity; return Math.min(tx, ty); }
      var t0 = t(dx, dy);
      return [[a[0] + dx * t0, a[1] + dy * t0], [b[0] - dx * t0, b[1] - dy * t0]];
    }
    var roadEls = {};
    m.edges.forEach(function (e) {
      var p = clip(e[0], e[1]);
      var g = sv("g", { "class": "ct-road" }, gRoads);
      sv("line", { x1: p[0][0].toFixed(1), y1: p[0][1].toFixed(1), x2: p[1][0].toFixed(1), y2: p[1][1].toFixed(1), "class": "ct-line", "marker-end": "url(#" + id + "-arrow)" }, g);
      roadEls[e[0] + ">" + e[1]] = g;
    });
    var bEls = {};
    names.forEach(function (n) {
      var c = m.crates[n], g = sv("g", { "class": "ct-b " + (c.kind || "lib") }, gB), x = c.x, y = c.y;
      // a building: a roof, a body, windows (library) or a big door (program) or a dashed outline (not in use)
      sv("path", { d: "M" + (x - 6) + " " + (y + 24) + " L" + (x + BW / 2) + " " + (y - 2) + " L" + (x + BW + 6) + " " + (y + 24) + " Z", "class": "ct-roof" }, g);
      sv("rect", { x: x, y: y + 24, width: BW, height: BH - 24, rx: 4, "class": "ct-body" }, g);
      tx(g, x + BW / 2, y + 50, n, "ct-name");
      tx(g, x + BW / 2, y + 72, "v" + (real.versions[n] || "?") + " · " + (c.kind === "bin" ? "program" : "library"), "ct-sub");
      bEls[n] = g;
    });
    // the picker
    var pick = box.querySelector(".ct-pick");
    pick.insertAdjacentHTML("beforeend", names.map(function (n) { return '<button type="button" class="path-btn" aria-pressed="false" data-n="' + esc(n) + '"><code>' + esc(n) + "</code></button>"; }).join(""));
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function list(a) { return a.length ? a.map(function (s) { return "<code>" + esc(s) + "</code>"; }).join(" and ") : "nothing"; }
    function show(n, announce) {
      var outs = m.edges.filter(function (e) { return e[0] === n; }).map(function (e) { return e[1]; });
      var ins = m.edges.filter(function (e) { return e[1] === n; }).map(function (e) { return e[0]; });
      Object.keys(roadEls).forEach(function (k) {
        var e = k.split(">");
        roadEls[k].classList.toggle("out", e[0] === n);
        roadEls[k].classList.toggle("in", e[1] === n);
      });
      names.forEach(function (o) { bEls[o].classList.toggle("on", o === n); bEls[o].classList.toggle("near", outs.indexOf(o) >= 0 || ins.indexOf(o) >= 0); });
      var bs = pick.querySelectorAll(".path-btn"); for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(bs[i].getAttribute("data-n") === n));
      note.innerHTML = "<b><code>" + esc(n) + "</code></b> " + esc(m.crates[n].about || "") + " <b>Needs</b> (solid roads out): " + list(outs) + ". <b>Needed by</b> (dashed roads in): " + list(ins) + ".";
      if (live && announce) live.textContent = note.textContent;
    }
    pick.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(b.getAttribute("data-n"), true); });
    show(m.start || names[0], false);
    var tv = box.querySelector(".ct-text");
    if (tv) tv.innerHTML = "<p>The real output of <code>" + esc(st.cmd) + "</code>:</p><pre class=\"term\">" + esc(st.out.replace(/\n$/, "")) + "</pre><p>Roads, read from it:</p><ul>" +
      m.edges.map(function (e) { return "<li><code>" + esc(e[0]) + "</code> needs <code>" + esc(e[1]) + "</code></li>"; }).join("") + "</ul>";
    var stage = box.querySelector(".ct-stage"); if (stage && L.scrollHint) { L.scrollHint(stage); if (root.addEventListener) root.addEventListener("resize", function () { L.scrollHint(stage); }); }
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad.length ? bad.length + " road(s) or building(s) do not match the real cargo tree" : "Every building and road is read from the real run of cargo tree"; par.classList.toggle("bad", !!bad.length); }
  }

  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-testreport]");
    for (var j = 0; j < r.length; j++) { try { mountReport(r[j]); } catch (e) { L.report("testreport:" + r[j].id, e.message); } }
    var c = document.querySelectorAll("[data-citytree]");
    for (var k = 0; k < c.length; k++) { try { mountCity(c[k]); } catch (e) { L.report("citytree:" + c[k].id, e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
