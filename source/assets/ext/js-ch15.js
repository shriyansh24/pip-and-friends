/* JavaScript book, chapter 15 ("Trees and Doorbells"): the DOM family-tree viewer.
   [data-domtree] draws a page's real DOM tree from a captured run. The program walks the tree in a real browser and prints
   one line per node, indented two spaces per generation (js/print-tree.js). Lines starting with "## " begin a new
   moment (a snapshot after one operation); each moment gets a button. Nothing in the drawing is typed by hand: every node
   is a line of the captured console output, and the badge says so after checking that every line was drawn.
   Between moments, lines that are new (by an ordered comparison with the previous moment) carry a NEW tag and a dashed
   outline, and lines that disappeared are listed as "gone". The author's note for each moment comes from the model.
   Keyboard: the moment buttons are ordinary buttons. Text version: the tree is a nested HTML list (read in order by
   screen readers), and the full captured output sits in a terminal below it. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib || !P.comic.ext) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch15: engine not ready"); return; }
  var L = P.comic.lib, esc = L.esc;

  function parse(out) {
    var moments = [], cur = null, lines = out.replace(/\n$/, "").split("\n"), drawn = 0;
    lines.forEach(function (raw) {
      if (/^## /.test(raw)) { cur = { title: raw.slice(3), nodes: [] }; moments.push(cur); drawn++; return; }
      if (!cur) { cur = { title: "", nodes: [] }; moments.push(cur); }
      var m = /^( *)(.*)$/.exec(raw), depth = m[1].length / 2, label = m[2];
      if (depth !== Math.floor(depth) || !label) return;
      cur.nodes.push({ depth: depth, label: label });
      drawn++;
    });
    return { moments: moments, total: lines.length, drawn: drawn };
  }
  function kind(label) {
    if (label === "document") return "doc";
    if (/^<!doctype/i.test(label)) return "doctype";
    if (/^"/.test(label)) return "text";
    return "el";
  }
  function chip(n) {
    var k = kind(n.label), lab = esc(n.label), tag = "";
    if (k === "el") {
      lab = lab.replace(/^&lt;([a-z0-9-]+)/, '&lt;<b>$1</b>');
      tag = "element";
    } else if (k === "text") tag = "text";
    else if (k === "doctype") tag = "doctype";
    else tag = "the whole page";
    return '<span class="dt-chip dt-' + k + (n.isNew ? " dt-new" : "") + '"><code>' + lab + '</code><small>' + tag + "</small>" + (n.isNew ? '<em class="dt-flag">NEW</em>' : "") + "</span>";
  }
  /* nested <ul> from depths */
  function treeHtml(nodes) {
    if (!nodes.length) return "";
    var base = nodes[0].depth, html = "", depth = base - 1;
    nodes.forEach(function (n, i) {
      if (n.depth > depth) { html += "<ul>"; }
      else { html += "</li>"; while (depth > n.depth) { html += "</ul></li>"; depth--; } }
      depth = n.depth;
      html += "<li>" + chip(n);
    });
    html += "</li>";
    while (depth > base) { html += "</ul></li>"; depth--; }
    return html + "</ul>";
  }
  /* ordered comparison (longest common subsequence) of two moments: marks new lines, returns gone ones */
  function diff(prev, cur) {
    var a = prev.map(function (n) { return n.depth + "|" + n.label; }), b = cur.map(function (n) { return n.depth + "|" + n.label; });
    var T = [], i, j;
    for (i = 0; i <= a.length; i++) { T.push([]); for (j = 0; j <= b.length; j++) T[i].push(0); }
    for (i = a.length - 1; i >= 0; i--) for (j = b.length - 1; j >= 0; j--) T[i][j] = a[i] === b[j] ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
    var keepA = {}, keepB = {};
    i = 0; j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { keepA[i] = keepB[j] = true; i++; j++; }
      else if (T[i + 1][j] >= T[i][j + 1]) i++; else j++;
    }
    cur.forEach(function (n, k) { n.isNew = !keepB[k]; });
    return prev.filter(function (n, k) { return !keepA[k]; });
  }
  function mount(box) {
    var name = box.getAttribute("data-domtree"), q = L.program(name);
    if (!q) return;
    var model = {}, ms = box.querySelector("script[type='application/json']");
    if (ms) { try { model = JSON.parse(ms.textContent); } catch (e) { L.report("domtree:" + name, "bad model: " + e.message); } }
    var res = parse(q.stdout), moments = res.moments;
    var par = box.querySelector(".parity"), ok = res.drawn === res.total && moments.length > 0;
    if (model.notes && model.notes.length !== moments.length) { ok = false; L.report("domtree:" + name, model.notes.length + " notes for " + moments.length + " moments"); }
    if (!ok) L.report("domtree:" + name, "could not draw every line of the captured output");
    if (par) { par.textContent = ok ? "Every node is a line from the real run of " + name : "Does not match the real run of " + name; par.classList.toggle("bad", !ok); }
    var bar = box.querySelector(".dt-moments"), title = box.querySelector(".dt-title"), tree = box.querySelector(".dt-tree"),
      gone = box.querySelector(".dt-gone"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    if (bar && moments.length > 1) {
      bar.insertAdjacentHTML("beforeend", moments.map(function (m, i) {
        return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '" aria-label="Moment ' + esc(m.title) + '">' + (i === 0 ? "Start" : "Step " + i) + "</button>";
      }).join(""));
    } else if (bar) bar.hidden = true;
    function show(i, announce) {
      var m = moments[i], lost = [];
      m.nodes.forEach(function (n) { n.isNew = false; });
      if (i > 0) lost = diff(moments[i - 1].nodes, m.nodes);
      if (title) { title.hidden = !m.title; title.innerHTML = m.title ? "<code>" + esc(m.title) + "</code>" : ""; }
      tree.innerHTML = treeHtml(m.nodes);
      if (gone) {
        gone.hidden = !lost.length;
        gone.innerHTML = lost.length ? "<b>Gone since the last moment:</b> " + lost.map(function (n) { return '<del class="dt-chip dt-' + kind(n.label) + '"><code>' + esc(n.label) + "</code></del>"; }).join(" ") : "";
      }
      if (note) note.innerHTML = model.notes ? model.notes[i] : "";
      if (bar) { var bs = bar.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i)); }
      if (live && announce) {
        var news = m.nodes.filter(function (n) { return n.isNew; }).map(function (n) { return n.label; });
        live.textContent = "Moment: " + m.title + ". " + (news.length ? "New: " + news.join(", ") + ". " : "") + (lost.length ? "Gone: " + lost.map(function (n) { return n.label; }).join(", ") + "." : "");
      }
    }
    if (bar) bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    show(0, false);
  }
  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-domtree]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("domtree", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
