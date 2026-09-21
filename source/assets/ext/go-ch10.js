/* Go book, chapter 10 ("Two Windows, One Shelf") additions. Classic deferred script; loads after comic-cast.js.
   [data-shelves]: the many-windows, many-shelves stepper. Each shelf (a backing array) is drawn as a row of boxes on a
   plank. Each slice is a window bar above its shelf: a solid frame over the boxes it shows (len), then a dashed line on
   to the end of the shelf (the rest of its cap). Two slices on one shelf get two bars over the same boxes, so painting
   a box through one window visibly shows in the other. A shelf that no window looks at any more is drawn dashed.
   Each step is the state right after one line of a REAL captured program ran; that line is lit in the code list.
   Model: { "program": "share.go",
            "steps": [ { "at": 7,                                   // the line that just ran (lit)
                         "shelves": { "S1": ["A", "B", "C"] },       // every shelf: all its boxes, left to right
                         "windows": [ { "n": "today", "shelf": "S1", "start": 1, "len": 2 } ],
                         "hot": { "S1": [1] },                       // optional: boxes that just changed (thick border, "new")
                         "print": "{route} {today}",                 // optional: this line printed. Tokens: {name} the
                                                                     //   window's boxes as Go prints them, {len:name}, {cap:name}
                         "note": "HTML" } ] }
   cap is never typed: it is the shelf's length minus the window's start. Parity: every printed line the model builds
   must equal the real run's stdout line for line, and together they must be the whole stdout; otherwise the badge turns
   bad and L.report() fires. Keyboard: the engine's stepper (arrows, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch10.js loaded before comic.js"); return; }
  var esc = L.esc, INK = "#111111", INK2 = "#2B2B2B";
  var CW = 54, GAP = 8, PAD = 22, BAR = 52, FILLS = ["#FFD60A", "#BDE3FF", "#C9F2D9", "#FFD9E8"];

  function xOf(i) { return PAD + i * (CW + GAP); }
  function capOf(st, w) { return w.cap != null ? w.cap : st.shelves[w.shelf].length - w.start; }
  function items(st, w) { return st.shelves[w.shelf].slice(w.start, w.start + w.len); }
  function win(st, n) { for (var i = 0; i < st.windows.length; i++) if (st.windows[i].n === n) return st.windows[i]; return null; }
  function fmtLine(st, tpl, bad) {
    return tpl.replace(/\{(len:|cap:)?([^{}]+)\}/g, function (all, kind, n) {
      var w = win(st, n);
      if (!w) { bad("print names an unknown window: " + n); return all; }
      if (kind === "len:") return String(w.len);
      if (kind === "cap:") return String(capOf(st, w));
      return "[" + items(st, w).join(" ") + "]";
    });
  }
  function txt(x, y, t, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") + '" font-family="' + (o.font || "JetBrains Mono, monospace") +
      '" font-weight="' + (o.weight || 800) + '" font-size="' + size + '" fill="' + (o.fill || INK) + '">' + esc(t) + "</text>";
  }
  function shelfOrder(m) {
    var order = [];
    m.steps.forEach(function (st) { Object.keys(st.shelves).forEach(function (id) { if (order.indexOf(id) < 0) order.push(id); }); });
    return order;
  }

  /* one shelf block: title, one bar row per window looking at it, the boxes, the plank and the spot numbers */
  function shelfBlock(st, id, num, y, colour) {
    var cells = st.shelves[id], ws = st.windows.filter(function (w) { return w.shelf === id; }), out = "";
    var orphan = !ws.length, hot = (st.hot && st.hot[id]) || [];
    out += txt(PAD - 6, y + 22, "SHELF #" + num + " · " + cells.length + " boxes" + (orphan ? " · no window looks here now" : ""), 21, { anchor: "start", font: "Bangers, sans-serif", weight: 400 });
    var yy = y + 34, endX = xOf(cells.length) - GAP;
    ws.forEach(function (w) {
      var k = st.windows.indexOf(w), fill = colour[w.n] || FILLS[k % FILLS.length];
      var x1 = xOf(w.start) - 3, x2 = w.len ? xOf(w.start + w.len) - GAP + 3 : x1 + 12;
      var lab = w.n + " · len " + w.len + " · cap " + capOf(st, w), wEnd = xOf(w.start + capOf(st, w)) - GAP;
      out += txt(x1 + 2, yy + 18, lab, 18, { anchor: "start" });
      // the window bar: solid over what it shows, dashed on to the end of the shelf (the rest of cap)
      if (x2 < wEnd) out += '<path d="M' + x2 + " " + (yy + 34) + " H" + (wEnd + 3) + '" stroke="' + INK + '" stroke-width="3" stroke-dasharray="8 6"/>';
      out += '<path d="M' + (wEnd + 3) + " " + (yy + 24) + " v20" + '" stroke="' + INK + '" stroke-width="' + (w.cap != null ? 6 : 3) + '"/>';
      if (w.cap != null && wEnd < endX) out += txt(wEnd + 10, yy + 40, "cap stops here", 14, { anchor: "start", font: "Comic Neue, sans-serif" });
      out += '<rect x="' + x1 + '" y="' + (yy + 26) + '" width="' + (x2 - x1) + '" height="16" rx="5" fill="' + fill + '" stroke="' + INK + '" stroke-width="3.5"/>';
      // guide lines from the bar down to the boxes' edges
      out += '<path d="M' + x1 + " " + (yy + 42) + " V" + (y + 34 + ws.length * BAR + 6) + " M" + x2 + " " + (yy + 42) + " V" + (y + 34 + ws.length * BAR + 6) + '" stroke="' + INK2 + '" stroke-width="1.5" stroke-dasharray="2 4"/>';
      yy += BAR;
    });
    var yc = y + 34 + ws.length * BAR + 8;
    for (var i = 0; i < cells.length; i++) {
      var seen = ws.some(function (w) { return i >= w.start && i < w.start + w.len; }), isHot = hot.indexOf(i) >= 0;
      var dash = orphan ? ' stroke-dasharray="5 5"' : seen ? "" : ' stroke-dasharray="7 5"';
      out += '<rect x="' + xOf(i) + '" y="' + yc + '" width="' + CW + '" height="50" rx="6" fill="' + (seen ? "#FFFFFF" : "#F3F3F3") + '" stroke="' + INK + '" stroke-width="' + (isHot ? 5.5 : seen ? 3 : 2.5) + '"' + dash + "/>";
      var v = cells[i];
      out += txt(xOf(i) + CW / 2, yc + 34, v === "" ? '""' : v, v.length > 3 ? 16 : 24, { fill: seen ? INK : INK2, weight: seen ? 800 : 600 });
      if (isHot) out += '<rect x="' + (xOf(i) + 6) + '" y="' + (yc + 52) + '" width="' + (CW - 12) + '" height="18" rx="4" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2"/>' + txt(xOf(i) + CW / 2, yc + 66, "new", 14, { font: "Comic Neue, sans-serif" });
    }
    var yp = yc + (hot.length ? 74 : 56);
    out += '<rect x="' + (PAD - 8) + '" y="' + yp + '" width="' + (endX - PAD + 16) + '" height="12" rx="3" fill="#C8955E" stroke="' + INK + '" stroke-width="3"' + (orphan ? ' stroke-dasharray="6 4"' : "") + "/>";
    for (var s = 0; s < cells.length; s++) out += txt(xOf(s) + CW / 2, yp + 34, String(s), 17, { fill: INK2, weight: 600 });
    return { svg: out, h: yp + 46 - y, w: endX + PAD };
  }

  function draw(m, st, order, minW) {
    var out = "", y = 6, w = minW || 0, num = 0;
    order.forEach(function (id) {
      if (!st.shelves[id]) return;
      num = order.indexOf(id) + 1;
      var b = shelfBlock(st, id, num, y, m.colour || {});
      out += b.svg; y += b.h + 12; w = Math.max(w, b.w);
      st.windows.forEach(function (wn) { if (wn.shelf === id) w = Math.max(w, xOf(wn.start) + (wn.n.length + 18) * 11); });
    });
    return { svg: out, vb: "0 0 " + Math.max(w, 300) + " " + y };
  }

  function describe(st, order) {
    return order.filter(function (id) { return st.shelves[id]; }).map(function (id) {
      var ws = st.windows.filter(function (w) { return w.shelf === id; });
      return "Shelf #" + (order.indexOf(id) + 1) + ": " + st.shelves[id].map(function (v) { return v === "" ? '""' : v; }).join(" ") + ". " +
        (ws.length ? ws.map(function (w) { return w.n + " starts at spot " + w.start + ", len " + w.len + ", cap " + capOf(st, w) + ", shows [" + items(st, w).join(" ") + "]"; }).join("; ") + "." : "No window looks at it any more.");
    }).join(" ");
  }

  function mount(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-shelves")).textContent);
    var q = L.program(m.program); if (!q) return;
    var real = q.stdout.replace(/\n$/, "").split("\n"), ok = true, printed = [], order = shelfOrder(m), fullW = 0, fullH = 0;
    function bad(msg) { ok = false; L.report("shelves:" + m.program, msg); }
    m.steps.forEach(function (st, k) {
      st.windows.forEach(function (w) {
        var sh = st.shelves[w.shelf];
        if (!sh) bad("step " + (k + 1) + ": window " + w.n + " looks at a missing shelf");
        else if (w.start < 0 || w.start + w.len > sh.length || w.len > capOf(st, w) || w.start + capOf(st, w) > sh.length) bad("step " + (k + 1) + ": window " + w.n + " does not fit on its shelf");
      });
      if (st.print) {
        var mine = fmtLine(st, st.print, bad), want = real[printed.length];
        if (mine !== want) bad("step " + (k + 1) + " prints \"" + mine + "\" but the real run printed \"" + want + "\"");
        printed.push(mine);
      }
      st._screen = printed.slice();
    });
    m.steps.forEach(function (st) { var vb = draw(m, st, order, 0).vb.split(" "); fullW = Math.max(fullW, Number(vb[2])); fullH = Math.max(fullH, Number(vb[3])); });
    if (printed.join("\n") !== real.join("\n")) bad("the model prints " + printed.length + " lines; the real run printed " + real.length);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every printed line matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }

    var src = q.src.replace(/\n$/, "").split("\n");
    var code = box.querySelector(".sh-code"), svg = box.querySelector("svg.shelf-svg"), stage = box.querySelector(".stage"), scr = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    code.innerHTML = src.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    var lis = code.querySelectorAll("li");
    if (L.hangLines) L.hangLines(lis);
    svg.style.maxWidth = Math.round(fullW * 1.3) + "px";   // keep boxes near their drawn size on wide screens
    if (fullW > 440) svg.style.minWidth = Math.round(fullW * 0.76) + "px";   // long shelves scroll sideways on phones instead of shrinking
    function render(rs, announce) {
      var st = m.steps[rs.step], d = draw(m, st, order, fullW);
      for (var a = 0; a < lis.length; a++) {
        lis[a].classList.toggle("ran", st.at === a + 1);
        if (st.at === a + 1) lis[a].setAttribute("data-now", ""); else lis[a].removeAttribute("data-now");
      }
      // one picture size for the whole run (the widest and tallest step), so the picture and the buttons never jump
      svg.setAttribute("viewBox", "0 0 " + fullW + " " + fullH);
      svg.innerHTML = d.svg;
      if (L.scrollHint) L.scrollHint(stage);   // "Swipe sideways…" only while the picture really overflows
      var prev = rs.step > 0 ? m.steps[rs.step - 1]._screen.length : 0;
      scr.innerHTML = st._screen.length ? st._screen.map(function (l, k) { return k >= prev ? '<span class="new">' + esc(l) + "</span>" : esc(l); }).join("\n") : '<span class="empty">(nothing printed yet)</span>';
      note.innerHTML = '<span class="count">Step ' + (rs.step + 1) + " of " + m.steps.length + "</span>" + st.note;
      if (live && announce) live.textContent = "Step " + (rs.step + 1) + " of " + m.steps.length + ". " + (st.at ? "Line " + st.at + " ran. " : "") + st.note.replace(/<[^>]+>/g, "") + " " + describe(st, order);
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (st, k) {
      return "<tr><td>" + (k + 1) + "</td><td>" + (st.at ? "line " + st.at + ": <code>" + esc(src[st.at - 1].trim()) + "</code>" : "start") + "</td><td>" + st.note + "</td><td>" + esc(describe(st, order)) + "</td><td><code>" + (st._screen.length ? esc(st._screen.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    code.setAttribute("data-reserve", "");   // the lit line can wrap onto a second row; keep the tallest list height
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-shelves]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._shMounted) continue; boxes[i]._shMounted = true; try { mount(boxes[i]); } catch (e) { L.report("shelves", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
