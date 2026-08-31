/* Rust book, chapter 19 additions ("Due-Date Stamps"). Classic deferred script; loads after comic-cast.js.
   1. duecard: a library loan card with a due-date stamp, this chapter's picture of a lifetime.
        <svg class="char" data-char="duecard" data-title="Dune" data-label="MAY 3" data-state="overdue"></svg>
      data-title: the book's name on the card's top line (at most 10 characters; optional).
      data-label: the words in the stamp (at most 8 characters), e.g. MAY 3, 'a, 'static.
      data-state: (none) a normal loan; "overdue" adds a dashed OVERDUE stamp and a worried face;
                  "forever" adds an infinity sign under the stamp ('static). State is shown by words and line style.
      Like every cast member it is aria-hidden; pages add a .sr-only sentence when the picture carries meaning.
   2. [data-life]: the loan timeline. Code lines run down the page; each name gets a column, and its live region is
      drawn as a bar beside the lines where it is valid. Owners are solid bars; loans (references) are striped bars.
      If a loan is still in use after its owner's bar has ended, those rows are drawn dashed and marked OVERDUE:
      the E0597 moment. Step through a program line by line; the bars grow as you go.
      Model (JSON in <script id=...>):
        { "paths": [ { "id": "p1", "label": "1 · it compiles", "program": "loan_ok.rs", "from": 1, "to": 6,
            "bars": [ { "n": "book", "kind": "owner", "from": 2, "to": 6 },
                      { "n": "card", "kind": "loan", "from": 3, "to": 4, "owner": "book" } ],
            "expect": { "exit": 0 }                      // or { "exit": 101, "code": "E0597", "labels": { "dropped here while still borrowed": 6, ... } }
            "steps": [ { "line": 2, "note": "HTML", "output": [], "error": "optional headline shown in red" } ] } ] }
      "line" is the last line looked at; bars are drawn for rows up to it ("line": null shows everything).
      Parity (a badge, and L.report on any problem):
        - the real exit code must equal expect.exit;
        - exit 0: the last step's screen must equal the real stdout, and every step's screen must be a prefix of it;
        - an error path: expect.code and each step's "error" must appear in the real stderr, and every entry of
          expect.labels must be a label rustc really printed under that source line. In addition, the bar named in the
          error's title must end on the "dropped here" line, and a loan of it must reach the "borrow later used" line.
      Keyboard: the engine's stepper (arrow keys, Space, R). Text version: a transcript table of every step. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch19.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  // colours come from the comic.css tokens (an inline style may use var(); a presentation attribute may not)
  var RED_STROKE = ' style="stroke: var(--error)"', RED_FILL = ' style="fill: var(--error)"';

  /* ---------- 1. the due-date card ---------- */
  L.cast.duecard = {
    vb: "0 0 170 200",
    draw: function (el) {
      var title = (el.getAttribute("data-title") || "").slice(0, 10), label = (el.getAttribute("data-label") || "'a").slice(0, 8);
      var state = el.getAttribute("data-state") || "", over = state === "overdue", out = '<g class="bob">';
      out += '<rect x="10" y="10" width="150" height="180" rx="8" fill="#FFF6CC"' + S(4) + "/>";
      out += '<path d="M10 52 H160" fill="none"' + S(3) + "/>";
      if (title) out += '<text x="20" y="40" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (title.length > 7 ? 17 : 18) + '" fill="' + INK + '">' + esc(title) + "</text>";
      // a small face in the top corner: the card is a character
      var cx = 136, cy = 30;
      out += '<g class="eyes"><circle cx="' + (cx - 7) + '" cy="' + cy + '" r="3" fill="' + INK + '"/><circle cx="' + (cx + 7) + '" cy="' + cy + '" r="3" fill="' + INK + '"/></g>';
      out += over ? '<path d="M' + (cx - 6) + " " + (cy + 12) + ' q6 -5 12 0" fill="none"' + S(2.5) + "/>" + '<path d="M' + (cx - 11) + " " + (cy - 8) + " l7 3 M" + (cx + 11) + " " + (cy - 8) + ' l-7 3" fill="none"' + S(2) + "/>"
        : '<path d="M' + (cx - 6) + " " + (cy + 7) + ' q6 6 12 0" fill="none"' + S(2.5) + "/>";
      out += '<text x="85" y="72" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="20" letter-spacing="2" fill="' + INK + '">DATE DUE</text>';
      out += '<path d="M22 84 H148 M22 150 H148 M22 176 H148" fill="none" stroke-width="1.5" style="stroke: var(--rule)"/>';
      // the stamp itself: a double-ruled box, slightly crooked, as a real rubber stamp lands
      out += '<g transform="rotate(-7 85 118)"><rect x="24" y="94" width="122" height="48" rx="7" fill="#FFFFFF"' + S(3.5) + "/>" +
        '<rect x="30" y="99" width="110" height="38" rx="5" fill="none" stroke="' + INK + '" stroke-width="1.5"/>' +
        '<text x="85" y="' + (label.length > 6 ? 125 : 127) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (label.length > 6 ? 18 : 22) + '" fill="' + INK + '">' + esc(label) + "</text></g>";
      if (state === "forever") out += '<text x="85" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="26" fill="' + INK + '">∞</text>';
      if (over) out += '<g transform="rotate(9 85 166)"><rect x="34" y="150" width="102" height="32" rx="5" fill="#FFFFFF"' + RED_STROKE + ' stroke-width="3" stroke-dasharray="7 4"/>' +
        '<text x="85" y="174" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="21" letter-spacing="1.5"' + RED_FILL + '>OVERDUE</text></g>';
      return out + "</g>";
    }
  };

  /* ---------- 2. the loan timeline ---------- */
  // Labels rustc printed under each source line: { "text": line }.
  function rustcLabels(stderr) {
    var out = [], cur = null;
    String(stderr || "").split("\n").forEach(function (l) {
      var m = /^\s*(\d+)\s+[|~]/.exec(l);
      if (m) { cur = Number(m[1]); return; }
      var lab = /^\s*\|[\s|]*[-^]+\s+(\S.*)$/.exec(l) || /^\s*\|[\s|]*(?:\|\s+)+(\S.*)$/.exec(l);
      if (lab && cur != null) out.push({ text: lab[1], line: cur });
      if (/^\S/.test(l)) cur = null;
    });
    return out;
  }

  function checkPath(p) {
    var q = L.program(p.program), why = [];
    if (!q) return ["missing capture"];
    var e = p.expect || {}, last = p.steps[p.steps.length - 1];
    if ("exit" in e && e.exit !== q.exit) why.push("exit " + q.exit + ", model says " + e.exit);
    var real = L.shown(q);
    if (q.exit === 0) {
      if (((last.output || []).length ? last.output.join("\n") + "\n" : "") !== real) why.push("last screen differs from the real output");
      p.steps.forEach(function (s, i) { var t = (s.output || []).length ? s.output.join("\n") + "\n" : ""; if (real.indexOf(t) !== 0) why.push("step " + (i + 1) + " screen is not a prefix of the real output"); });
    } else {
      if (e.code && q.stderr.indexOf("error[" + e.code + "]") < 0) why.push(e.code + " not in the real stderr");
      p.steps.forEach(function (s, i) { if (s.error && q.stderr.indexOf(s.error) < 0) why.push("step " + (i + 1) + " error line not in the real stderr"); });
      var labs = rustcLabels(q.stderr);
      Object.keys(e.labels || {}).forEach(function (t) {
        var hit = labs.filter(function (x) { return x.text.indexOf(t) >= 0 && x.line === e.labels[t]; });
        if (!hit.length) why.push("rustc printed no label '" + t + "' under line " + e.labels[t]);
      });
      var who = /error\[E0597\]: `([^`]+)` does not live long enough/.exec(q.stderr);
      if (who) {
        var owner = p.bars.filter(function (b) { return b.n === who[1]; })[0];
        var dropped = labs.filter(function (x) { return x.text.indexOf("dropped here while still borrowed") >= 0; })[0];
        var used = labs.filter(function (x) { return /borrow later used/.test(x.text); })[0];
        if (!owner) why.push("no bar for `" + who[1] + "`");
        else {
          if (dropped && owner.to !== dropped.line) why.push("bar `" + owner.n + "` should end on line " + dropped.line);
          var loans = p.bars.filter(function (b) { return b.owner === owner.n; });
          if (used && !loans.some(function (b) { return b.to === used.line; })) why.push("no loan of `" + owner.n + "` reaches line " + used.line);
        }
      }
    }
    return why;
  }

  function mount(box) {
    var id = box.getAttribute("data-life"), el = document.getElementById(id);
    if (!el) { L.report("life:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent);
    var bar = box.querySelector(".paths"), grid = box.querySelector(".life-grid"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), par = box.querySelector(".parity");
    var tb = box.querySelector(".transcript tbody"), cur = m.paths[0];
    if (bar) bar.insertAdjacentHTML("beforeend", m.paths.map(function (p) { return '<button type="button" class="path-btn" aria-pressed="false" data-path="' + p.id + '">' + esc(p.label) + "</button>"; }).join(""));

    function ownerOf(p, b) { return b.owner ? p.bars.filter(function (o) { return o.n === b.owner; })[0] : null; }
    // what a bar is doing on one row: "" (not alive), "start", "mid", "end", "one"; and whether it is overdue there
    function cellState(p, b, row) {
      if (row < b.from || row > b.to) return null;
      var o = ownerOf(p, b), over = !!(o && (row > o.to || row < o.from));
      var pos = b.from === b.to ? "one" : row === b.from ? "start" : row === b.to ? "end" : "mid";
      return { pos: pos, over: over };
    }
    function describeAt(p, row) {
      if (row == null) row = p.to;
      var alive = p.bars.map(function (b) {
        var c = cellState(p, b, row);
        if (row < b.from) return null;
        if (!c) return b.n + ": " + (b.kind === "owner" ? "gone (dropped)" : "loan over");
        return b.n + ": " + (c.over ? "OVERDUE, its owner is gone" : b.kind === "owner" ? "alive, owns its value" : "on loan");
      }).filter(Boolean);
      return alive.length ? alive.join("; ") : "nothing alive yet";
    }

    // leading indentation goes in its own span, so phones can draw it narrower
    function codeLine(l) {
      var ind = /^ */.exec(l)[0];
      return (ind ? '<span class="ind">' + ind + "</span>" : "") + (L.highlight(l.slice(ind.length)) || " ");
    }
    function build(p) {
      var q = L.program(p.program);
      var lines = q ? q.src.replace(/\n$/, "").split("\n") : [];
      var head = '<div class="lf-row lf-head" aria-hidden="true"><div class="lf-bars">' + p.bars.map(function (b) {
        return '<span class="lf-name ' + b.kind + (b.n.length > 2 ? " long" : "") + '"><b>' + esc(b.n) + "</b><small>" + (b.kind === "owner" ? "owner" : "loan") + "</small></span>";
      }).join("") + '</div><span class="lf-no"></span><span class="lf-code lf-codehead">' + esc(p.program) + "</span></div>";
      var rows = "";
      for (var r = p.from; r <= p.to; r++) {
        rows += '<div class="lf-row" data-row="' + r + '"><div class="lf-bars" aria-hidden="true">' + p.bars.map(function (b) { return '<span class="lf-cell" data-n="' + esc(b.n) + '"></span>'; }).join("") +
          '</div><span class="lf-no" aria-hidden="true">' + r + '</span><code class="lf-code">' + codeLine(lines[r - 1] || "") + "</code></div>";
      }
      grid.style.setProperty("--lf-cols", p.bars.length);
      grid.innerHTML = '<div class="lf-scroll">' + head + rows + "</div>";
    }

    function render(st, announce) {
      var p = cur, s = p.steps[st.step], upto = s.line == null ? p.to : s.line;
      var rowsEl = grid.querySelectorAll(".lf-row[data-row]");
      for (var i = 0; i < rowsEl.length; i++) {
        var row = Number(rowsEl[i].getAttribute("data-row"));
        var isNow = s.line != null && row === s.line;
        rowsEl[i].classList.toggle("now", isNow);
        if (isNow) rowsEl[i].setAttribute("data-now", ""); else rowsEl[i].removeAttribute("data-now");   // the engine scrolls this row into view on phones
        rowsEl[i].classList.toggle("later", row > upto);
        var cells = rowsEl[i].querySelectorAll(".lf-cell");
        for (var k = 0; k < cells.length; k++) {
          var b = p.bars[k], c = row <= upto ? cellState(p, b, row) : null;
          cells[k].className = "lf-cell" + (c ? " on " + b.kind + " " + c.pos + (c.over ? " over" : "") : "");
          cells[k].textContent = c && c.over ? "!" : c && b.kind === "owner" && (c.pos === "end" || c.pos === "one") && row === b.to && b.drop !== false ? "✕" : "";
        }
      }
      var o = s.output || [];
      out.innerHTML = (o.length ? o.map(esc).join("\n") : (s.error ? "" : '<span class="empty">Nothing on the screen yet.</span>')) + (s.error ? (o.length ? "\n" : "") + '<span class="err">' + esc(s.error) + "</span>" : "");
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + p.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = p.label + ", step " + (st.step + 1) + (s.line != null ? ", line " + s.line : "") + ". " + describeAt(p, upto) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      if (bar) { var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-path") === p.id ? "true" : "false"); }
    }

    var rn = L.runner(box, cur.steps.length, render, { reserve: true });
    function choose(pid) {
      cur = m.paths.filter(function (p) { return p.id === pid; })[0] || m.paths[0];
      var why = checkPath(cur), ok = !why.length;
      why.forEach(function (w) { L.report("life:" + id + ":" + cur.id, w + " (" + cur.program + ")"); });
      if (par) { par.textContent = ok ? "Matches the real run of " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      build(cur);
      if (tb) {
        var q = L.program(cur.program), lines = q ? q.src.replace(/\n$/, "").split("\n") : [];
        tb.innerHTML = cur.steps.map(function (s, i) {
          var o = s.output || [];
          return "<tr><td>" + (i + 1) + "</td><td>" + (s.line != null ? "line " + s.line + ": <code>" + esc((lines[s.line - 1] || "").trim()) + "</code>" : "end") + "</td><td>" + s.note + "</td><td>" + esc(describeAt(cur, s.line)) + "</td><td><code>" + (o.length ? esc(o.join(" / ")) : s.error ? esc(s.error) : "(nothing)") + "</code></td></tr>";
        }).join("");
      }
      rn.reset(cur.steps.length);
    }
    if (bar) bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-path")); if (live) live.textContent = "Program chosen: " + b.textContent + "."; } });
    choose(m.paths[0].id);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-life]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("life", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
