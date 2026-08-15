/* Chapter 2 extension: name-tag drawings ("tag scenes").
   Why: Chapter 2's analogy IS the memory tracer's picture (a tag on a string, tied to an object). These static
   drawings use the same tag and object shapes as the tracer, so the comic panels and the tracer read as one
   picture language. They are pictures only: they claim no program output, need no keyboard interaction, and
   every one carries a text equivalent (aria-label from the model's "alt", plus a .sr-only sentence in the page).
   Markup: <svg class="tagscene" data-tagscene="MODEL-ID" id="..."></svg> + <script type="application/json" id="MODEL-ID">
   Model: { size: [w, h], alt: "text equivalent", items: [ ...shapes... ] }
     { obj: "'pizza'", k: "str", id: "a", x, y, w?, fade? }       an object (same colours as the tracer)
     { tag: "snack", to: "a", x, y, hot?, side? }                   a name tag; x,y = left middle; arrow to object
     { t: "text", x, y, cls?: "hand|code|big|small", anchor? }      a label
     { num: "1", x, y }    { mark: "ok"|"no", x, y }                step number, tick / cross
     { arrow: [[x,y], ...], dash? }   { box: [x, y, w, h], label? }   free arrow, dashed frame
     { pip: {mood, arms, mouth}, x, y, w }   { char: "professor", x, y, w }   small cast members */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch2.js loaded before comic.js"); return; }
  var L = P.comic.lib, NS = "http://www.w3.org/2000/svg";
  function mk(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function txt(p, x, y, s, cls, anchor) { var t = mk("text", { x: x, y: y, "class": cls }, p); if (anchor) t.setAttribute("text-anchor", anchor); t.textContent = s; return t; }
  function tagW(n) { return Math.max(84, Math.round(String(n).length * 10.6 + 36)); }
  function objW(o) { return o.w || Math.max(96, Math.round(String(o.obj).length * 11 + 58)); }
  function head(p, pts, cls) {
    var a = pts[pts.length - 1], b = pts[pts.length - 2], g = Math.atan2(a[1] - b[1], a[0] - b[0]), H = 12;
    mk("path", { d: "M" + (a[0] - H * Math.cos(g - 0.45)).toFixed(1) + " " + (a[1] - H * Math.sin(g - 0.45)).toFixed(1) + " L" + a[0] + " " + a[1] + " L" + (a[0] - H * Math.cos(g + 0.45)).toFixed(1) + " " + (a[1] - H * Math.sin(g + 0.45)).toFixed(1), "class": cls }, p);
  }
  function draw(svg, m) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + m.size[0] + " " + m.size[1]);
    svg.setAttribute("role", "img");
    if (m.alt) svg.setAttribute("aria-label", m.alt); else L.report("tagscene:" + svg.id, "missing alt text");
    var gBack = mk("g", {}, svg), gArrow = mk("g", {}, svg), gObj = mk("g", {}, svg), gFront = mk("g", {}, svg);
    var objs = {};
    m.items.forEach(function (it) { if (it.obj != null) objs[it.id] = { x: it.x, y: it.y, w: objW(it), h: 46 }; });
    m.items.forEach(function (it) {
      if (it.box) {
        mk("rect", { x: it.box[0], y: it.box[1], width: it.box[2], height: it.box[3], rx: 10, "class": "ts-box" }, gBack);
        if (it.label) txt(gBack, it.box[0] + 12, it.box[1] + 24, it.label, "ts-small");
      } else if (it.obj != null) {
        var o = objs[it.id], g = mk("g", { "class": "ts-o" + (it.fade ? " ts-drift" : "") + (it.pop ? " ts-pop" : "") }, gObj);
        mk("rect", { x: o.x, y: o.y, width: o.w, height: o.h, rx: 12, "class": "ts-obj " + (it.k || "") + (it.fade ? " fade" : "") }, g);
        txt(g, o.x + 14, o.y + 30, it.obj, "ts-val");
        if (it.k) txt(g, o.x + o.w - 10, o.y + 30, it.k, "ts-kind", "end");
      } else if (it.tag != null) {
        var w = tagW(it.tag), x = it.x, y = it.y, tg = mk("g", { "class": "ts-t" + (it.hot ? " ts-hot" : "") }, gFront);
        mk("path", { d: "M" + x + " " + (y - 17) + " h" + w + " l16 17 l-16 17 h-" + w + " z", "class": "ts-tag" }, tg);
        mk("circle", { cx: x + 12, cy: y, r: 4.5, "class": "ts-hole" }, tg);
        txt(tg, x + 24, y + 6, it.tag, "ts-name");
        var t = objs[it.to];
        if (it.to && !t) { L.report("tagscene:" + svg.id, "tag " + it.tag + " points at unknown object " + it.to); return; }
        if (t) {
          var x1 = x + w + 18, y1 = y, x2, y2, d;
          if (it.side === "top" || (it.side !== "left" && t.x < x1 + 30)) {
            x2 = Math.min(t.x + t.w - 14, Math.max(t.x + 14, x1 + 10)); y2 = t.y - 4;
            d = "M" + x1 + " " + y1 + " C " + (x1 + 30) + " " + y1 + ", " + x2 + " " + (y2 - 40) + ", " + x2 + " " + y2;
            head(gArrow, [[x2, y2 - 10], [x2, y2]], "ts-arrow" + (it.hot ? " hot" : "") + " ts-head");
          } else {
            x2 = t.x - 4; y2 = Math.max(t.y + 10, Math.min(t.y + t.h - 10, y1 + (t.y + t.h / 2 - y1) * 0.6));
            d = "M" + x1 + " " + y1 + " C " + (x1 + 40) + " " + y1 + ", " + (x2 - 40) + " " + y2 + ", " + x2 + " " + y2;
            head(gArrow, [[x2 - 10, y2], [x2, y2]], "ts-arrow" + (it.hot ? " hot" : "") + " ts-head");
          }
          mk("path", { d: d, "class": "ts-arrow" + (it.hot ? " hot" : "") }, gArrow);
        }
      } else if (it.t != null) {
        txt(gFront, it.x, it.y, it.t, "ts-" + (it.cls || "hand"), it.anchor);
      } else if (it.num != null) {
        var gn = mk("g", { "class": "ts-num" }, gFront);
        mk("circle", { cx: it.x, cy: it.y, r: 14 }, gn); txt(gn, it.x, it.y + 6.5, it.num, "", "middle");
      } else if (it.mark) {
        var gm = mk("g", { "class": "ts-mark ts-" + it.mark }, gFront);
        mk("circle", { cx: it.x, cy: it.y, r: 13 }, gm);
        mk("path", { d: it.mark === "ok" ? "M" + (it.x - 6) + " " + it.y + " l4.5 5 l8 -10" : "M" + (it.x - 5.5) + " " + (it.y - 5.5) + " l11 11 M" + (it.x + 5.5) + " " + (it.y - 5.5) + " l-11 11" }, gm);
      } else if (it.arrow) {
        var pts = it.arrow, dd = "M" + pts.map(function (q) { return q[0] + " " + q[1]; }).join(" L");
        mk("path", { d: dd, "class": "ts-arrow" + (it.dash ? " dash" : "") }, gArrow);
        head(gArrow, pts, "ts-arrow ts-head");
      } else if (it.pip || it.char) {
        var c = it.pip ? { vb: "0 0 140 190" } : L.cast[it.char];
        if (!c) { L.report("tagscene:" + svg.id, "unknown character " + it.char); return; }
        var vb = c.vb.split(" ").map(Number), h = it.w * vb[3] / vb[2];
        var inner = mk("svg", { x: it.x, y: it.y, width: it.w, height: h, viewBox: c.vb, "aria-hidden": "true", "class": "ts-char" }, gFront);
        inner.innerHTML = it.pip ? L.pip(it.pip) : c.draw({ getAttribute: function (k) { return (it.attrs && it.attrs[k]) || null; } });
      }
    });
  }
  P.comic.ext(function () {
    var els = document.querySelectorAll("svg[data-tagscene]");
    for (var i = 0; i < els.length; i++) {
      try {
        var src = document.getElementById(els[i].getAttribute("data-tagscene"));
        if (!src) { L.report("tagscene", "no model " + els[i].getAttribute("data-tagscene")); continue; }
        draw(els[i], JSON.parse(src.textContent));
      } catch (e) { L.report("tagscene:" + els[i].id, e.message); }
    }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
