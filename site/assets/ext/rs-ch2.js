/* Rust book, chapter 2 extension (Red Pens and Boxes). Loads after comic-cast.js.
   Adds what the shared engine does not have:
     1. [data-xray]  the error X-ray: a REAL captured compiler message drawn as a labelled diagram. Every part
        (level, code, message, location, gutter, labels, help, notes, the last lines) gets a numbered badge in
        the margin, and Next walks through the parts in reading order. Every highlight is looked up in the
        captured stderr; if one is missing the badge turns red and the problem is reported. Lines appear in the
        captured terminal order (the `merged` record) when there is one;
     2. [data-boxes] box drawings: a `let` box is sealed with a window, a `let mut` box has a lid, an old box
        hidden behind a new one (shadowing) is faded. Integer values are drawn as the brick creature;
     3. [data-capline] fills a short piece of text (one line of a captured message) into an illustration, so even
        the editor picture shows the compiler's real words.
   (Earlier versions also rewrote "Real Python", re-ordered warnings above program output, and made prompts follow
   `cd`. The engine now says "Real run" and names Mabel, the capture records the real stream order, and captured
   terminal sessions record the real folder for every prompt.)
   Everything shown comes from POLYGLOT.data.captures. Keyboard: the X-ray uses the engine's stepper. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch2.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, NS = "http://www.w3.org/2000/svg";

  /* ---------- 1. the error X-ray ---------- */
  /* A case: { id, label, program, parts: [{ name, hl: [{ re, sub?, subre?, all? }], note }] }.
     re picks the line(s) of the real stderr (first match, or every match with all:true); sub (literal) or subre
     (regex) picks the piece of that line to light up; without either, the whole line lights up. */
  function linesOf(q) {
    var meta = P.data.captures.meta || {}, st = q.steps ? q.steps[q.steps.length - 1] : null;
    var dir = (st && st.dir) || String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var out = [{ t: "you@laptop:" + dir + "$ " + (st ? st.cmd : ""), cmd: true }];
    var errs = q.stderr ? q.stderr.replace(/\n$/, "").split("\n") : [];
    if (st && st.merged) {
      // the real terminal order, recorded by the capture; a line is error-styled when it came from stderr
      var outs = q.stdout ? q.stdout.replace(/\n$/, "").split("\n") : [];
      st.merged.replace(/\n$/, "").split("\n").forEach(function (t) { out.push({ t: t, e: errs.indexOf(t) >= 0 && outs.indexOf(t) < 0 }); });
      return out;
    }
    errs.forEach(function (t) { out.push({ t: t, e: true }); });
    if (q.stdout) q.stdout.replace(/\n$/, "").split("\n").forEach(function (t) { out.push({ t: t }); });
    return out;
  }
  /* [{line index, from, to}] for one highlight spec, or [] when the real message has no such text */
  function locate(lines, h) {
    var re = new RegExp(h.re), hits = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].cmd || !re.test(lines[i].t)) continue;
      var t = lines[i].t, from = 0, to = t.length;
      if (h.sub != null) { from = t.indexOf(h.sub); if (from < 0) continue; to = from + h.sub.length; }
      else if (h.subre) { var m = new RegExp(h.subre).exec(t); if (!m) continue; from = m.index; to = from + m[0].length; }
      hits.push({ i: i, from: from, to: to });
      if (!h.all) break;
    }
    return hits;
  }
  function mountXray(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-xray")).textContent);
    var bar = box.querySelector(".paths"), pre = box.querySelector(".xr-term"), legend = box.querySelector(".xr-legend");
    var card = box.querySelector(".xr-card"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody"), next = box.querySelector('[data-act="next"]'), resetB = box.querySelector('[data-act="reset"]');
    bar.insertAdjacentHTML("beforeend", m.cases.map(function (c) { return '<button type="button" class="path-btn' + (c.warn ? "" : " bug") + '" aria-pressed="false" data-case="' + c.id + '">' + esc(c.label) + "</button>"; }).join(""));
    var cur, lines, found, run;
    function prepare(c) {
      var q = L.program(c.program); if (!q) return false;
      lines = linesOf(q); found = [];
      var ok = true;
      c.parts.forEach(function (p, pi) {
        var hits = [];
        p.hl.forEach(function (h) {
          var hh = locate(lines, h);
          if (!hh.length) { ok = false; L.report("xray:" + c.program, "part " + (pi + 1) + " (" + p.name + ") looks for /" + h.re + "/" + (h.sub ? " '" + h.sub + "'" : "") + " but the real message has no such text"); }
          hits = hits.concat(hh);
        });
        found.push(hits);
      });
      if ("exit" in c && c.exit !== q.exit) { ok = false; L.report("xray:" + c.program, "expected exit " + c.exit + ", real exit " + q.exit); }
      return ok;
    }
    function pieceText(pi) { return found[pi].map(function (h) { return lines[h.i].t.slice(h.from, h.to).trim(); }).filter(Boolean); }
    function render(st, announce) {
      var p = cur.parts[st.step];
      pre.innerHTML = lines.map(function (l, li) {
        var marks = [], badges = [];
        found.forEach(function (hits, pi) {
          hits.forEach(function (h) { if (h.i === li) { if (badges.indexOf(pi) < 0) badges.push(pi); if (pi === st.step) marks.push(h); } });
        });
        marks.sort(function (a, b) { return a.from - b.from; });
        var html = "", at = 0;
        marks.forEach(function (h) { if (h.from < at) return; html += esc(l.t.slice(at, h.from)) + '<mark class="xr-hit">' + esc(l.t.slice(h.from, h.to)) + "</mark>"; at = h.to; });
        html += esc(l.t.slice(at));
        var b = badges.map(function (pi) { return '<span class="xr-b' + (pi === st.step ? " on" : "") + '">' + (pi + 1) + "</span>"; }).join("");
        return '<span class="xr-ln' + (l.e ? " err" : "") + (l.cmd ? " cmd" : "") + (marks.length ? " now" : "") + '"' + (marks.length ? " data-now" : "") + '><span class="xr-g" aria-hidden="true">' + (b || "") + '</span><span class="xr-t">' + (html || " ") + "</span></span>";
      }).join("");
      var lis = legend.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) {
        var here = i === st.step; lis[i].classList.toggle("on", here);
        if (here) lis[i].setAttribute("aria-current", "step"); else lis[i].removeAttribute("aria-current");
        var jb = lis[i].querySelector(".xr-jump"); if (jb) jb.setAttribute("aria-pressed", here ? "true" : "false");
      }
      var real = pieceText(st.step);
      card.innerHTML = '<p class="xr-name"><span class="xr-b on">' + (st.step + 1) + "</span> " + esc(p.name) + "</p>" +
        '<p class="xr-real"><span class="xr-k">The real text:</span> ' + real.map(function (t) { return "<code>" + esc(t) + "</code>"; }).join(" ") + "</p>";
      note.innerHTML = '<span class="count">Part ' + (st.step + 1) + " of " + cur.parts.length + "</span>" + p.note;
      if (live && announce) live.textContent = cur.label + ", part " + (st.step + 1) + ": " + p.name + ". The real text: " + real.join(" / ") + ". " + note.textContent.replace(/^Part \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-case") === cur.id ? "true" : "false");
    }
    function goTo(n) { resetB.click(); for (var k = 0; k < n; k++) next.click(); }
    function choose(id) {
      cur = m.cases.filter(function (c) { return c.id === id; })[0] || m.cases[0];
      var ok = prepare(cur);
      if (par) { par.textContent = ok ? "Real compiler message from " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      legend.innerHTML = cur.parts.map(function (p, i) { return '<li><button type="button" class="xr-jump" aria-pressed="false" data-n="' + i + '"><span class="xr-b">' + (i + 1) + "</span> " + esc(p.name) + "</button></li>"; }).join("");
      if (tb) tb.innerHTML = cur.parts.map(function (p, i) { return "<tr><td>" + (i + 1) + "</td><td>" + esc(p.name) + "</td><td><code>" + pieceText(i).map(esc).join("<br>") + "</code></td><td>" + p.note + "</td></tr>"; }).join("");
      if (!run) run = L.runner(box, cur.parts.length, render);
      run.reset(cur.parts.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-case")); if (live) live.textContent = "Message chosen: " + b.textContent + "."; } });
    legend.addEventListener("click", function (e) { var b = e.target.closest(".xr-jump"); if (b) goTo(Number(b.getAttribute("data-n"))); });
    choose(m.cases[0].id);
  }

  /* ---------- 2. box drawings ---------- */
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function tx(p, x, y, s, cls, anchor) { var t = sv("text", { x: x, y: y, "class": cls }, p); if (anchor) t.setAttribute("text-anchor", anchor); t.textContent = s; return t; }
  function wobPath(r, pts, amp) {
    var d = "";
    for (var i = 0; i < pts.length; i++) d += (i ? " L" : "M") + (pts[i][0] + (r() - 0.5) * amp).toFixed(1) + " " + (pts[i][1] + (r() - 0.5) * amp).toFixed(1);
    return d + " Z";
  }
  function brickInto(g, x, y, w, h, label, mood) {
    var c = L.cast.brick; if (!c) return;
    var fake = document.createElementNS(NS, "svg"); fake.setAttribute("data-label", label); if (mood) fake.setAttribute("data-mood", mood);
    var s = sv("svg", { x: x, y: y, width: w, height: h, viewBox: c.vb, "class": "bx-brick" }, g);
    s.innerHTML = c.draw(fake);
  }
  /* one box: kind sealed | lid | empty; old:true draws it faded (a box no name reaches any more) */
  function drawBox(svg, it, r) {
    var x = it.x, y = it.y, w = it.w || 196, h = it.h || 168, d = 16, g = sv("g", { "class": "bx" + (it.old ? " bx-old" : "") + (it.hot ? " bx-hot" : "") }, svg);
    // side and top faces (a little perspective), then the front
    sv("path", { d: wobPath(r, [[x + w, y], [x + w + d, y - d], [x + w + d, y + h - d], [x + w, y + h]], 1.2), "class": "bx-side" }, g);
    if (it.kind === "lid") {
      sv("path", { d: wobPath(r, [[x, y], [x + d, y - d], [x + w + d, y - d], [x + w, y]], 1), "class": "bx-inside" }, g);
      sv("path", { d: wobPath(r, [[x + d, y - d], [x + w + d, y - d], [x + w + d - 26, y - d - 58], [x + d - 26, y - d - 58]], 1.4), "class": "bx-lid" }, g);
      tx(g, x + w / 2 - 4, y - d - 22, "mut", "bx-lidtext", "middle");
    } else {
      sv("path", { d: wobPath(r, [[x, y], [x + d, y - d], [x + w + d, y - d], [x + w, y]], 1), "class": "bx-top" }, g);
      if (it.kind === "sealed") {
        sv("path", { d: wobPath(r, [[x + w / 2 - 14, y], [x + w / 2 - 14 + d, y - d], [x + w / 2 + 14 + d, y - d], [x + w / 2 + 14, y]], 0.6), "class": "bx-tape" }, g);
        sv("rect", { x: x + w / 2 - 14, y: y, width: 28, height: 22, "class": "bx-tape" }, g);
      }
    }
    sv("path", { d: wobPath(r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], 1.6), "class": "bx-front" }, g);
    // the window, with the value inside
    var wx = x + 16, wy = y + 30, ww = w - 32, wh = h - 80;
    sv("rect", { x: wx, y: wy, width: ww, height: wh, rx: 6, "class": "bx-window" }, g);
    if (it.val != null && it.val !== "") {
      if (it.brick) brickInto(g, wx + 6, wy + 2, ww - 12, wh - 4, it.val, it.mood);
      else tx(g, x + w / 2, wy + wh / 2 + 7, it.val, it.val.length > 9 ? "bx-val sm" : "bx-val", "middle");
    } else tx(g, x + w / 2, wy + wh / 2 + 6, it.emptyText || "(empty)", "bx-empty", "middle");
    sv("path", { d: "M" + (wx + 8) + " " + (wy + wh - 8) + " l14 -14 M" + (wx + 8) + " " + (wy + wh - 20) + " l6 -6", "class": "bx-glint" }, g);
    // name tag
    var tw = Math.max(70, it.name.length * 11 + 30);
    sv("rect", { x: x + w / 2 - tw / 2, y: y + h - 40, width: tw, height: 30, rx: 5, "class": "bx-tag" }, g);
    sv("circle", { cx: x + w / 2 - tw / 2 + 10, cy: y + h - 25, r: 3.5, "class": "bx-hole" }, g);
    tx(g, x + w / 2 + 5, y + h - 19, it.name, "bx-name", "middle");
    if (it.sealedText !== false && it.kind === "sealed") tx(g, x + w / 2, y + 19, "SEALED", "bx-seal", "middle");
    if (it.type) tx(g, x + w / 2, y + h + 22, it.type, "bx-type", "middle");
    return g;
  }
  function arrowHead(pts) { var a = pts[pts.length - 1], b = pts[pts.length - 2], g = Math.atan2(a[1] - b[1], a[0] - b[0]), l = 12; return "M" + (a[0] - l * Math.cos(g - 0.45)).toFixed(1) + " " + (a[1] - l * Math.sin(g - 0.45)).toFixed(1) + " L" + a[0] + " " + a[1] + " L" + (a[0] - l * Math.cos(g + 0.45)).toFixed(1) + " " + (a[1] - l * Math.sin(g + 0.45)).toFixed(1); }
  function mountBoxes(svg) {
    var m = JSON.parse(document.getElementById(svg.getAttribute("data-boxes")).textContent), r = L.rng(m.seed || 3);
    svg.setAttribute("viewBox", "0 0 " + m.size[0] + " " + m.size[1]);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", m.alt);
    svg.innerHTML = "";
    m.items.forEach(function (it) {
      if (it.box) drawBox(svg, { kind: it.box, x: it.x, y: it.y, w: it.w, h: it.h, name: it.name, val: it.val, brick: it.brick, mood: it.mood, type: it.type, old: it.old, hot: it.hot, emptyText: it.emptyText }, r);
      else if (it.t) tx(svg, it.x, it.y, it.t, "bx-" + (it.cls || "hand"), it.anchor);
      else if (it.arrow) { var g = sv("g", { "class": "bx-arrow" + (it.cls ? " " + it.cls : "") }, svg); sv("path", { d: "M" + it.arrow.map(function (p) { return p[0] + " " + p[1]; }).join(" L"), "class": "bx-line" }, g); sv("path", { d: arrowHead(it.arrow), "class": "bx-line bx-head" }, g); }
      else if (it.num) { var gn = sv("g", { "class": "bx-num" }, svg); sv("circle", { cx: it.x, cy: it.y, r: 15 }, gn); tx(gn, it.x, it.y + 7, it.num, "", "middle"); }
      else if (it.cross) { sv("path", { d: "M" + (it.x - 14) + " " + (it.y - 14) + " l28 28 M" + (it.x + 14) + " " + (it.y - 14) + " l-28 28", "class": "bx-cross" }, svg); }
    });
  }

  /* ---------- 3. real words in illustrations ---------- */
  function capLines() {
    var els = document.querySelectorAll("[data-capline]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], q = L.program(el.getAttribute("data-capline")); if (!q) continue;
      var re = new RegExp(el.getAttribute("data-re")), line = q.stderr.split("\n").filter(function (l) { return re.test(l); })[0];
      if (!line) { L.report("capline", "no line matching " + el.getAttribute("data-re") + " in " + el.getAttribute("data-capline")); continue; }
      var m = el.getAttribute("data-take") ? new RegExp(el.getAttribute("data-take")).exec(line) : null;
      el.textContent = m ? (m[1] != null ? m[1] : m[0]) : line.trim();
    }
  }

  P.comic.ext(function () {
    capLines();
    var bx = document.querySelectorAll("svg[data-boxes]");
    for (var i = 0; i < bx.length; i++) { try { mountBoxes(bx[i]); } catch (e) { L.report("boxes", e.message); } }
    var xs = document.querySelectorAll("[data-xray]");
    for (var j = 0; j < xs.length; j++) { try { mountXray(xs[j]); } catch (e) { L.report("xray", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
