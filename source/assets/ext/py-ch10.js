/* Chapter 10 extension: two visuals the shared engine does not have.
   1. [data-diff="old.py new.py"]  a "what changed" panel between two program versions. It is computed in the
      browser from the two captured source files (a line diff), so it cannot drift from the real programs.
      The page proves it: replaying the diff must rebuild both files exactly, or the badge turns bad.
   2. [data-ribbon="prog.py"]  draws a file as one ribbon of characters, with the hidden newline characters shown.
      It is drawn from the program's real output: the repr() of a file's contents, printed on its first line.
   Both are plain text underneath (marks + words, never colour alone) and need no pointer to use. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch10.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  function srcLines(name) { var p = L.program(name); return p ? p.src.replace(/\n$/, "").split("\n") : null; }

  /* Longest-common-subsequence line diff. Returns [{t: "same"|"del"|"add", s, na, nb}] in reading order. */
  function diff(a, b) {
    var n = a.length, m = b.length, i, j, T = [];
    for (i = 0; i <= n; i++) { T.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) T[i][j] = a[i] === b[j] ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
    var ops = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) { ops.push({ t: "same", s: b[j], na: i + 1, nb: j + 1 }); i++; j++; }
      else if (T[i + 1][j] >= T[i][j + 1]) { ops.push({ t: "del", s: a[i], na: i + 1 }); i++; }
      else { ops.push({ t: "add", s: b[j], nb: j + 1 }); j++; }
    }
    while (i < n) { ops.push({ t: "del", s: a[i], na: i + 1 }); i++; }
    while (j < m) { ops.push({ t: "add", s: b[j], nb: j + 1 }); j++; }
    return ops;
  }
  var CTX = 2; // unchanged lines kept around each change when folded

  function mountDiff(box) {
    var names = box.getAttribute("data-diff").trim().split(/\s+/), A = srcLines(names[0]), B = srcLines(names[1]);
    if (!A || !B) { L.report("diff", "missing captured program " + names.join(" or ")); return; }
    var ops = diff(A, B);
    // proof: the diff must rebuild both files exactly
    var oldBack = ops.filter(function (o) { return o.t !== "add"; }).map(function (o) { return o.s; }).join("\n");
    var newBack = ops.filter(function (o) { return o.t !== "del"; }).map(function (o) { return o.s; }).join("\n");
    var ok = oldBack === A.join("\n") && newBack === B.join("\n");
    if (!ok) L.report("diff:" + names.join("→"), "diff does not rebuild the captured files");
    var adds = ops.filter(function (o) { return o.t === "add"; }).length, dels = ops.filter(function (o) { return o.t === "del"; }).length;
    // which unchanged lines stay visible when folded
    var keep = ops.map(function () { return false; });
    ops.forEach(function (o, k) { if (o.t !== "same") for (var d = -CTX; d <= CTX; d++) if (ops[k + d]) keep[k + d] = true; });
    // a fold must save space: runs of 1 or 2 hidden lines are shown instead
    for (var r = 0; r < ops.length;) {
      if (keep[r] || ops[r].t !== "same") { r++; continue; }
      var e = r; while (e < ops.length && !keep[e] && ops[e].t === "same") e++;
      if (e - r < 3) for (var q = r; q < e; q++) keep[q] = true;
      r = e;
    }
    function row(o) {
      var mark = o.t === "add" ? "+" : o.t === "del" ? "−" : " ", word = o.t === "add" ? "added line: " : o.t === "del" ? "removed line: " : "";
      return '<li class="d-' + o.t + '"><span class="d-no" aria-hidden="true">' + (o.t === "del" ? "" : o.nb) + '</span><span class="d-mark" aria-hidden="true">' + mark + "</span>" +
        (word ? '<span class="sr-only">' + word + "</span>" : "") + "<code>" + (o.s ? esc(o.s) : " ") + "</code></li>";
    }
    function paint(full) {
      var html = "", k = 0;
      while (k < ops.length) {
        if (full || keep[k] || ops[k].t !== "same") { html += row(ops[k]); k++; continue; }
        var start = k; while (k < ops.length && !keep[k] && ops[k].t === "same") k++;
        html += '<li class="d-fold"><span>⋯ ' + (k - start) + " unchanged line" + (k - start === 1 ? "" : "s") + " (lines " + ops[start].nb + "–" + ops[k - 1].nb + ")</span></li>";
      }
      list.innerHTML = html;
    }
    box.classList.add("diff");
    box.innerHTML = '<div class="diff-head"><span class="diff-files"><code>' + esc(names[0]) + '</code> <span aria-hidden="true">→</span><span class="sr-only">changed into</span> <code>' + esc(names[1]) + "</code></span>" +
      '<span class="diff-count"><span class="d-chip add"><b aria-hidden="true">+</b> ' + adds + " added</span> <span class=\"d-chip del\"><b aria-hidden=\"true\">−</b> " + dels + " removed</span></span></div>" +
      '<ol class="diff-lines" aria-label="Changes from ' + esc(names[0]) + " to " + esc(names[1]) + '"></ol>' +
      '<div class="controls"><button type="button" class="btn d-toggle" aria-pressed="false">Show the whole new file</button><span class="parity"></span></div>';
    var list = box.querySelector(".diff-lines"), btn = box.querySelector(".d-toggle"), par = box.querySelector(".parity");
    par.textContent = ok ? "Built from the two real files" : "Does not match the real files";
    par.classList.toggle("bad", !ok);
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = on ? "Show only the changes" : "Show the whole new file";
      paint(on);
    });
    paint(false);
  }

  /* Parse a Python repr of a str ('...' or "...") into its characters. Handles the escapes repr uses for text. */
  function unrepr(s) {
    s = s.trim();
    var q = s.charAt(0);
    if ((q !== "'" && q !== '"') || s.charAt(s.length - 1) !== q) return null;
    var body = s.slice(1, -1), out = [], map = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"' };
    for (var i = 0; i < body.length; i++) {
      var c = body.charAt(i);
      if (c === "\\") { var nx = body.charAt(i + 1); if (!(nx in map)) return null; out.push(map[nx]); i++; }
      else out.push(c);
    }
    return out;
  }
  function mountRibbon(box) {
    var name = box.getAttribute("data-ribbon"), p = L.program(name); if (!p) return;
    var first = L.shown(p).split("\n")[0], chars = unrepr(first);
    var par = box.querySelector(".parity");
    if (!chars) { L.report("ribbon:" + name, "first output line is not a str repr"); if (par) { par.textContent = "Does not match the real run"; par.classList.add("bad"); } return; }
    var lines = [[]];
    chars.forEach(function (c) { lines[lines.length - 1].push(c); if (c === "\n") lines.push([]); });
    if (!lines[lines.length - 1].length) lines.pop();
    var pos = 0, html = "", say = [];
    lines.forEach(function (ln, li) {
      html += '<div class="rb-line"><span class="rb-tag">line ' + (li + 1) + '</span><span class="rb-cells">';
      ln.forEach(function (c) {
        var nl = c === "\n", sp = c === " ";
        html += '<span class="rb-cell' + (nl ? " nl" : "") + '"><span class="rb-ch">' + (nl ? "\\n" : sp ? "␣" : esc(c)) + '</span><span class="rb-i">' + pos + "</span></span>";
        pos++;
      });
      html += "</span></div>";
      say.push("line " + (li + 1) + ": " + ln.map(function (c) { return c === "\n" ? "newline" : c === " " ? "space" : c; }).join(" "));
    });
    box.querySelector(".rb-strip").innerHTML = html;
    var sr = box.querySelector(".rb-say"); if (sr) sr.textContent = "The file holds " + chars.length + " characters. " + say.join(". ") + ".";
    if (par) { par.textContent = "Drawn from the real output of " + name; par.classList.remove("bad"); }
  }

  P.comic.ext(function () {
    var ds = document.querySelectorAll("[data-diff]");
    for (var i = 0; i < ds.length; i++) { try { mountDiff(ds[i]); } catch (e) { L.report("diff", e.message); } }
    var rs = document.querySelectorAll("[data-ribbon]");
    for (var k = 0; k < rs.length; k++) { try { mountRibbon(rs[k]); } catch (e) { L.report("ribbon", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
