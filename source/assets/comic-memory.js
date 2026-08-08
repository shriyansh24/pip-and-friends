/* Pip & Friends: memory pictures for systems books (engine file, promoted from Rust ch7 "Plate Stacks, House Keys").
   Load after comic-widgets.js. Used by Rust (ownership, borrowing, Box/Rc), C++ (stack/heap, pointers, unique_ptr) and Go (pointers).
   Provides:
     1. key: the ownership key creature. One key = one owner. Used from this chapter on.
          <svg class="char" data-char="key" data-label="s1" data-mood="happy"></svg>
        data-label: the owner's name on the key's tag (at most 8 characters; empty for no tag).
        data-mood: happy (default), sad, o.  data-state="moved": drawn as a dashed outline with no face
        (the key has been handed to someone else; this name holds nothing).
        data-variant="copy": a photocopied flyer (for Copy values); "cut": a freshly cut spare key (clone).
     2. [data-mem]: the stack-and-heap stepper. Stack frames are drawn as a pile of plates, newest on top;
        heap blocks sit in the heap area on the right, and a pointer is drawn as a ticket number (#1)
        with an arrow. The heap's caption is "HEAP"; data-heap-label="the coat-check room" on the [data-mem] box (or on
        any ancestor, such as <main> for a whole page) makes it "HEAP · the coat-check room", in the chapter's own picture
        (Rust: the coat-check room; C++ ch13: the library; Go ch28: the storage unit). "Coat check" is not the default:
        it means a map in C++ ch14 and Go ch12. Moved names are dashed and say "moved away"; freed heap blocks are dashed and say
        "freed". Model (JSON in <script id=...>):
          { "program": "move_ok.rs", "steps": [ {
              "line": 3, "note": "HTML", "output": ["..."],
              "frames": [ { "name": "main", "slots": [
                  { "n": "age", "type": "i32", "val": "36" },
                  { "n": "name", "type": "String", "ptr": "H1", "len": 5, "cap": 5 },
                  { "n": "b", "type": "Box<i32>", "ptr": "H2" },
                  { "n": "s1", "type": "String", "moved": true } ] } ],
              "heap": { "H1": { "cells": ["M","a","b","e","l"], "cap": 5, "label": "String bytes" },
                        "H2": { "cells": ["5"], "label": "i32", "freed": true } },
              "changed": ["name", "H1"] } ] }
        Parity, exactly as the engine's tracer: the last step's screen must equal the captured run and every
        step's screen must be a prefix of it. The badge says so, and any mismatch is reported (console error).
        Keyboard: the engine's stepper (arrow keys, Space, R). Text version: a transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch7.js loaded before comic.js"); return; }
  if (P.comic.memoryLoaded) return;   // a chapter may also load its own copy (Rust ch7); mount once
  P.comic.memoryLoaded = true;
  var L = P.comic.lib, esc = L.esc, S = L.stroke, C = L.cast, INK = "#111111", NS = "http://www.w3.org/2000/svg";

  /* ---------- 1. the key creature ---------- */
  function keyFace(cx, cy, mood) {
    var eyes = '<g class="eyes"><circle cx="' + (cx - 8) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/><circle cx="' + (cx + 8) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/></g>';
    var m = mood === "sad" ? '<path d="M' + (cx - 7) + " " + (cy + 14) + ' q7 -6 14 0" fill="none"' + S(3) + "/>"
      : mood === "o" ? '<circle cx="' + cx + '" cy="' + (cy + 11) + '" r="4" fill="' + INK + '"/>'
        : '<path d="M' + (cx - 7) + " " + (cy + 8) + ' q7 7 14 0" fill="none"' + S(3) + "/>";
    var brows = mood === "sad" ? '<path d="M' + (cx - 13) + " " + (cy - 7) + " l8 3 M" + (cx + 13) + " " + (cy - 7) + ' l-8 3" fill="none"' + S(2.5) + "/>" : "";
    return brows + eyes + m;
  }
  function keyShape(fill, dashed) {
    var st = dashed ? ' stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5" stroke-linejoin="round"' : S(4);
    return '<circle cx="44" cy="58" r="32" fill="' + fill + '"' + st + "/>" +
      '<circle cx="44" cy="58" r="20" fill="#FFFFFF"' + (dashed ? ' stroke="' + INK + '" stroke-width="2" stroke-dasharray="5 4"' : S(3)) + "/>" +
      '<path d="M74 50 h76 v16 h-10 v14 h-10 v-14 h-8 v20 h-10 v-20 h-38 z" fill="' + fill + '"' + st + "/>";
  }
  C.key = {
    vb: function (el) { return el.getAttribute("data-variant") === "copy" ? "0 0 170 150" : "0 0 170 132"; },
    draw: function (el) {
      var lab = (el.getAttribute("data-label") || "").slice(0, 8), mood = el.getAttribute("data-mood") || "happy";
      var variant = el.getAttribute("data-variant"), moved = el.getAttribute("data-state") === "moved", out = "";
      function tag(x, y) {
        if (!lab) return "";
        // tag text at 17 units (12px at 120px wide; it was 15, 10.6px), lbl-grow below that; the tag widens with it
        var w = Math.max(44, lab.length * 11 + 18);
        return '<path d="M' + (x - 6) + " " + (y - 30) + " L" + (x + 4) + " " + (y - 2) + '" fill="none"' + S(2.5) + "/>" +
          '<rect x="' + (x - w / 2) + '" y="' + y + '" width="' + w + '" height="26" rx="5" fill="#FFF6CC"' + S(2.5) + "/>" +
          '<text class="lbl-grow" data-fitw="90" data-cy="' + (y + 13) + '" data-plate="100" x="' + x + '" y="' + (y + 19) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">' + esc(lab) + "</text>";
      }
      if (variant === "copy") {
        // a photocopied flyer: a sheet of paper with a printed key and a COPY stamp
        out += '<g class="bob"><path d="M14 10 h120 l20 20 v112 h-140 z" fill="#FFFFFF"' + S(4) + '/><path d="M134 10 v20 h20" fill="#EDEDED"' + S(3) + "/>" +
          '<g transform="translate(22 40) scale(0.72)">' + keyShape("#FFE7A3", false) + "</g>" +
          '<g transform="rotate(-12 84 118)"><rect x="46" y="102" width="78" height="30" rx="4" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3"/>' +
          '<text x="85" y="125" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="24" letter-spacing="2" fill="' + INK + '">COPY</text></g>' + keyFace(48, 78, mood) + "</g>";
        return out;
      }
      var fill = variant === "cut" ? "#D9E3EC" : "#FFC94A";
      out += '<g class="bob">' + keyShape(moved ? "#FFFFFF" : fill, moved) + (moved ? '<text x="44" y="64" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="20" fill="' + INK + '">?</text>' : keyFace(44, 54, mood));
      if (variant === "cut") out += '<path d="M150 30 l6 -10 M160 40 l10 -4 M156 22 l2 -12" fill="none"' + S(3) + "/>";
      return out + tag(120, 98) + "</g>";
    }
  };

  /* ---------- 2. the stack-and-heap stepper ---------- */
  function sv(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) if (a[k] != null) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function tx(p, x, y, s, cls, anchor) { var t = sv("text", { x: x, y: y, "class": cls }, p); if (anchor) t.setAttribute("text-anchor", anchor); t.textContent = s; return t; }
  var CHW = 10.2;                       // monospace advance at 17px
  var ROW = 60, HEAD = 42, CELL_H = 32;   // HEAD 42: a long type label on the first slot clears the "running now" note
  function slotCells(s) {
    if (s.moved) return [{ t: "moved away", w: 130, kind: "moved" }];
    // A slot with ptr + len and no cap is a borrowed view (&str, &[T], a Go string header): it draws two fields, not three.
    if (s.ptr && s.len != null) return [{ t: String(s.len), w: 58, kind: "num", lab: "len" }].concat(s.cap != null ? [{ t: String(s.cap), w: 58, kind: "num", lab: "cap" }] : []).concat([{ t: "#" + s.ptr.replace(/^H/, ""), w: 74, kind: "ptr", lab: "ptr" }]);
    if (s.ptr) return [{ t: "#" + s.ptr.replace(/^H/, ""), w: 72, kind: "ptr", lab: "ptr" }];
    // A reference/pointer to another stack slot: "ref": "name" or "frame/name" (Rust &x, C++ &x / int* p = &x, Go &a).
    if (s.ref) { var rl = s.refLabel || ("&" + String(s.ref).split("/").pop()); return [{ t: rl, w: Math.max(88, rl.length * CHW + 52), kind: "ptr", lab: "ref" }]; }   // +52: room for the corner "ref" label, the value and the dot
    var v = String(s.val);
    return [{ t: v, w: Math.max(64, v.length * CHW + 22), kind: "val" }];
  }
  function cellsW(cs) { return cs.reduce(function (a, c) { return a + c.w + 6; }, 0) - 6; }
  function heapW(h, id) {   // wide enough for its cells and for its header ("#1 · String bytes · FREED")
    var n = Math.max(h.cap || 0, h.cells.length);
    return Math.max(170, 16 + n * 34, 20 + ("#" + String(id || "").replace(/^H/, "") + " · " + (h.label || "bytes") + (h.freed ? " · FREED" : "")).length * 7.9);
  }
  var HEAP_H = 74;
  function plan(steps) {
    var tagW = 70, slotW = 0, maxStack = 0, order = [], hw = {};
    steps.forEach(function (st) {
      var h = 0;
      (st.frames || []).forEach(function (f) {
        h += HEAD + Math.max(1, f.slots.length) * ROW + 12;
        f.slots.forEach(function (s) {
          tagW = Math.max(tagW, s.n.length * CHW + 26);
          slotW = Math.max(slotW, cellsW(slotCells(s)), String(s.type || "").length * 7.6 + 4);
        });
      });
      maxStack = Math.max(maxStack, h);
      Object.keys(st.heap || {}).forEach(function (id) { if (order.indexOf(id) < 0) order.push(id); hw[id] = Math.max(hw[id] || 0, heapW(st.heap[id], id)); });
    });
    var frameW = Math.max(270, 14 + tagW + 22 + slotW + 16);
    var heapMax = order.reduce(function (a, id) { return Math.max(a, hw[id]); }, 170);
    return { tagW: tagW, frameW: frameW, maxStack: Math.max(maxStack, 60), order: order, hw: hw, heapMax: heapMax };
  }
  function render(svgEl, step, pl, narrow, uid, heapCap) {
    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
    var X0 = 16, TOP = 40, FW = pl.frameW, changed = step.changed || [];
    var HX = narrow ? X0 : X0 + FW + 96;
    var heapTop = narrow ? TOP + pl.maxStack + 54 : TOP;
    var ptrs = [], refs = [];
    var defs = sv("defs", {}, svgEl);
    defs.innerHTML = '<marker id="' + uid + '-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#111"/></marker>' +
      '<pattern id="' + uid + '-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#FFFFFF"/><path d="M0 0 V10" stroke="#C9C9C9" stroke-width="3"/></pattern>';
    tx(svgEl, X0, 24, "STACK · plates, newest on top", "mh-col");
    tx(svgEl, HX, heapTop - 16, heapCap || "HEAP", "mh-col");
    // stack: frames from the bottom up (main is the bottom plate)
    var y = TOP + pl.maxStack, slotPos = {};
    (step.frames || []).forEach(function (f, fi) {
      var h = HEAD + Math.max(1, f.slots.length) * ROW + 12;
      y -= h;
      var g = sv("g", { "class": "mh-frame-g" }, svgEl);
      sv("rect", { x: X0, y: y, width: FW, height: h - 6, rx: 12, "class": "mh-frame" + (fi === step.frames.length - 1 && fi > 0 ? " top" : "") }, g);
      sv("path", { d: "M" + (X0 + 10) + " " + (y + h - 6) + " q" + (FW / 2 - 10) + " 10 " + (FW - 20) + " 0", "class": "mh-plate-rim" }, g);
      tx(g, X0 + 12, y + 22, f.name, "mh-frame-name");
      if (fi === step.frames.length - 1) tx(g, X0 + FW - 12, y + 22, step.frames.length > 1 ? "top plate: running now" : "running now", "mh-frame-sub", "end");
      if (!f.slots.length) tx(g, X0 + 16, y + HEAD + 28, "(no names yet)", "mh-type");
      f.slots.forEach(function (s, i) {
        var ry = y + HEAD + i * ROW, hot = changed.indexOf(s.n) >= 0;
        var sg = sv("g", { "class": "mh-slot" + (hot ? " hot" : "") + (s.moved ? " moved" : "") }, g);
        var tw = pl.tagW;
        sv("path", { d: "M" + (X0 + 12) + " " + (ry + 6) + " h" + tw + " l12 17 l-12 17 h-" + tw + " z", "class": "mh-tag" }, sg);
        tx(sg, X0 + 22, ry + 29, s.n, "mh-name");
        var cx = X0 + 12 + tw + 22;
        tx(sg, cx, ry + 2, (s.type || "") + (s.moved ? "" : ""), "mh-type");
        slotCells(s).forEach(function (c) {
          sv("rect", { x: cx, y: ry + 8, width: c.w, height: CELL_H, rx: 5, "class": "mh-cell " + c.kind, style: c.kind === "moved" ? "fill:url(#" + uid + "-hatch)" : null }, sg);
          if (c.lab) tx(sg, cx + 5, ry + 21, c.lab, "mh-lab");
          tx(sg, c.kind === "ptr" ? cx + c.w - 20 : c.lab ? cx + c.w - 8 : cx + c.w / 2, ry + 31, c.t, c.kind === "moved" ? "mh-moved" : "mh-val", c.lab ? "end" : "middle");
          if (c.kind === "ptr") { sv("circle", { cx: cx + c.w - 10, cy: ry + 24, r: 4.5, "class": "mh-dot" }, sg); if (s.ref) refs.push({ x: cx + c.w - 10, y: ry + 24, to: s.ref, hot: hot }); else ptrs.push({ x: cx + c.w - 10, y: ry + 24, to: s.ptr, hot: hot }); }
          cx += c.w + 6;
        });
        slotPos[s.n] = ry; slotPos[f.name + "/" + s.n] = ry;
      });
    });
    if (!(step.frames || []).length) tx(svgEl, X0 + 10, TOP + pl.maxStack - 14, "(the stack is empty)", "mh-type");
    // heap
    var hy = heapTop, hpos = {}, heap = step.heap || {}, any = false;
    pl.order.forEach(function (id) {
      var h = heap[id];
      if (h) {
        any = true;
        var w = pl.hw[id], hot = changed.indexOf(id) >= 0;
        var g = sv("g", { "class": "mh-heap" + (h.freed ? " freed" : "") + (hot ? " hot" : "") }, svgEl);
        sv("rect", { x: HX, y: hy, width: w, height: HEAP_H - 10, rx: 10, "class": "mh-hbox", style: h.freed ? "fill:url(#" + uid + "-hatch)" : null }, g);
        tx(g, HX + 10, hy + 18, "#" + id.replace(/^H/, "") + " · " + (h.label || "bytes") + (h.freed ? " · FREED" : ""), "mh-hlabel");
        var n = Math.max(h.cap || 0, h.cells.length);
        for (var k = 0; k < n; k++) {
          var empty = k >= h.cells.length;
          sv("rect", { x: HX + 8 + k * 34, y: hy + 26, width: 30, height: 30, rx: 4, "class": "mh-hcell" + (empty ? " spare" : "") }, g);
          if (!empty) tx(g, HX + 23 + k * 34, hy + 47, h.cells[k], "mh-hval", "middle");
        }
        hpos[id] = { x: HX, y: hy, w: w };
      }
      hy += HEAP_H;
    });
    if (!any) tx(svgEl, HX + 4, heapTop + 26, "(empty: nothing on the heap)", "mh-type");
    // arrows: pointer (ticket number) to its heap block
    var maxRight = narrow ? Math.max(X0 + FW, HX + pl.heapMax) : HX + pl.heapMax, lane = 0;
    ptrs.forEach(function (p) {
      var t = hpos[p.to]; if (!t) return;
      var d;
      if (narrow) {
        var gx = maxRight + 16 + (lane++) * 12;
        d = "M" + p.x + " " + p.y + " H" + gx + " V" + (t.y + 32) + " H" + (t.x + t.w + 3);
      } else {
        var x2 = t.x - 4, y2 = t.y + 32;
        d = "M" + p.x + " " + p.y + " C " + (p.x + 50) + " " + p.y + ", " + (x2 - 50) + " " + y2 + ", " + x2 + " " + y2;
      }
      sv("path", { d: d, "class": "mh-arrow" + (p.hot ? " hot" : ""), "marker-end": "url(#" + uid + "-ah)" }, svgEl);
    });
    // arrows: a stack reference to another stack slot. It leaves the ref cell, runs up or down a lane just right of the
    // plates, and ends at the right edge of the plate, level with the slot it refers to (dashed when hot, like heap arrows).
    var rlane = 0;
    refs.forEach(function (r) {
      var ty = slotPos[r.to]; if (ty == null) { L.report("mem", "ref target not found: " + r.to); return; }
      var gx = X0 + FW + 10 + (rlane++) * 10, y2 = ty + 24;
      var d = "M" + r.x + " " + r.y + " H" + gx + " V" + y2 + " H" + (X0 + FW - 4);
      if (Math.abs(y2 - r.y) < 1) d = "M" + r.x + " " + r.y + " H" + gx + " v-14 h-14";
      sv("path", { d: d, "class": "mh-arrow" + (r.hot ? " hot" : ""), "marker-end": "url(#" + uid + "-ah)" }, svgEl);
    });
    var width = narrow ? Math.max(maxRight, X0 + FW + 12 + rlane * 10) + 16 + Math.max(1, lane) * 12 + 10 : Math.max(640, maxRight + 20);
    var height = Math.max(TOP + pl.maxStack + 16, hy + 6, heapTop + 40);
    // one picture size for the whole run (pl.dims, measured at mount), so labels never zoom between steps
    var fixed = pl.dims && pl.dims[narrow ? "narrow" : "wide"];
    if (fixed) { width = Math.max(width, fixed.w); height = Math.max(height, fixed.h); }
    svgEl.setAttribute("viewBox", "0 0 " + width + " " + height);
    svgEl.classList.toggle("narrow", narrow);
    return { w: width, h: height };
  }
  function sizeRun(steps, pl, uid, heapCap) {
    var scratch = document.createElementNS(NS, "svg"), dims = {};
    [false, true].forEach(function (n) {
      var w = 0, h = 0;
      steps.forEach(function (st) { var d = render(scratch, st, pl, n, uid + "-size", heapCap); w = Math.max(w, d.w); h = Math.max(h, d.h); });
      dims[n ? "narrow" : "wide"] = { w: w, h: h };
    });
    return dims;
  }
  function fit(svgEl) {   // natural size + sideways scroll when wider than the box (L.fitPicture from comic-widgets.js)
    if (L.fitPicture) L.fitPicture(svgEl, svgEl.viewBox.baseVal.width);
  }
  function describe(step) {
    var st = (step.frames || []).slice().reverse().map(function (f) {
      return f.name + ": " + (f.slots.length ? f.slots.map(function (s) {
        if (s.moved) return s.n + " (moved away, holds nothing)";
        if (s.ref) return s.n + " = " + (s.type || "reference") + " pointing at " + s.ref;
        if (s.ptr && s.len != null) return s.n + " = " + s.type + " {ptr → #" + s.ptr.replace(/^H/, "") + ", len " + s.len + (s.cap != null ? ", cap " + s.cap : "") + "}";
        if (s.ptr) return s.n + " = " + s.type + " {ptr → #" + s.ptr.replace(/^H/, "") + "}";
        return s.n + " = " + s.val + " (" + s.type + ")";
      }).join("; ") : "no names");
    });
    var hp = Object.keys(step.heap || {}).map(function (id) {
      var h = step.heap[id];
      return "#" + id.replace(/^H/, "") + " " + (h.label || "bytes") + ": [" + h.cells.join(" ") + "]" + (h.cap && h.cap > h.cells.length ? " with room for " + h.cap : "") + (h.freed ? ", FREED" : "");
    });
    return { stack: st.length ? "top plate first. " + st.join(" | ") : "empty", heap: hp.length ? hp.join(" | ") : "empty" };
  }
  function mountMem(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-mem")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var real = L.shown(prog), lines = prog.src.replace(/\n$/, "").split("\n"), ok = true;
    var last = m.steps[m.steps.length - 1];
    if ((last.output.length ? last.output.join("\n") + "\n" : "") !== real) { ok = false; L.report("mem:" + m.program, "parity failed: final screen differs from the captured run"); }
    m.steps.forEach(function (s, i) { var t = s.output.length ? s.output.join("\n") + "\n" : ""; if (real.indexOf(t) !== 0) { ok = false; L.report("mem:" + m.program, "step " + (i + 1) + " screen is not a prefix of the real output"); } });
    var par = (box.querySelector(".controls .parity") || box.querySelector(".parity:not([data-same-src])")); if (par) { par.textContent = ok ? "Matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    var code = box.querySelector(".tr-code"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), canvas = box.querySelector("svg.mem-svg");
    code.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    if (L.hangLines) L.hangLines(code.querySelectorAll("li"));
    var lis = code.querySelectorAll("li"), pl = plan(m.steps), uid = box.id || ("mem-" + Math.random().toString(36).slice(2));
    var capEl = box.closest("[data-heap-label]"), capTxt = capEl ? capEl.getAttribute("data-heap-label").trim() : "";
    var heapCap = capTxt ? "HEAP · " + capTxt : "HEAP";
    // a long caption widens the picture instead of running past it (the heap column starts at the right of the plates)
    pl.heapMax = Math.max(pl.heapMax, heapCap.length * 8.6 + 8);
    pl.dims = sizeRun(m.steps, pl, uid, heapCap);
    function narrowNow() { return (canvas.parentNode.clientWidth || 800) < 560; }
    function draw(st, announce) {
      var s = m.steps[st.step];
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      render(canvas, s, pl, narrowNow(), uid, heapCap); fit(canvas);
      out.innerHTML = s.output.length ? s.output.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) { var d = describe(s); live.textContent = "Step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Stack: " + d.stack + ". Heap: " + d.heap + "."; }
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { var d = describe(s); return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(lines[s.line - 1]) + "</code>" : "end") + "</td><td>" + s.note + "</td><td>" + esc(d.stack) + "</td><td>" + esc(d.heap) + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>"; }).join("");
    if (tb && L.addBreaks) { var tcs = tb.querySelectorAll("td code"); for (var tc = 0; tc < tcs.length; tc++) L.addBreaks(tcs[tc]); }   // as the tracer's text version
    var run = L.runner(box, m.steps.length, draw, { reserve: ".narration, .screen pre, .tr-code, [data-reserve]" });
    run.reset(m.steps.length);
    var was = narrowNow();
    root.addEventListener("resize", function () { var n = narrowNow(); if (n !== was) { was = n; draw(run.state(), false); } else fit(canvas); });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-mem]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._memMounted) continue; boxes[i]._memMounted = true; try { mountMem(boxes[i]); } catch (e) { L.report("mem:" + boxes[i].id, e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
