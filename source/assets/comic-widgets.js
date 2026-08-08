/* Pip & Friends — widget library (loads after comic.js; classic deferred script).
   Adds: creature cast, memory tracer, conversion machine, six self-checking exercise types,
   a per-chapter score, and a self-test that proves every exercise agrees with its captured run.
   Authoring rules live in AUTHORING.md. Every widget reads code and output from the captured data
   (POLYGLOT.data.captures), never from text typed into the page. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] comic-widgets.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* =========================== creature cast =========================== */
  function face(cx, cy, mood) {
    var e = mood === "sad" ? '<path d="M' + (cx - 12) + " " + (cy - 2) + " l8 -3 M" + (cx + 12) + " " + (cy - 2) + ' l-8 -3" fill="none"' + S(3) + "/>" : "";
    var eyes = '<circle cx="' + (cx - 9) + '" cy="' + cy + '" r="3.6" fill="' + INK + '"/><circle cx="' + (cx + 9) + '" cy="' + cy + '" r="3.6" fill="' + INK + '"/>';
    var m = mood === "sad" ? '<path d="M' + (cx - 8) + " " + (cy + 14) + " q8 -7 16 0" + '" fill="none"' + S(3.5) + "/>"
      : mood === "o" ? '<circle cx="' + cx + '" cy="' + (cy + 12) + '" r="4" fill="' + INK + '"/>'
        : '<path d="M' + (cx - 8) + " " + (cy + 9) + " q8 8 16 0" + '" fill="none"' + S(3.5) + "/>";
    return e + '<g class="eyes">' + eyes + "</g>" + m;
  }
  function lbl(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (size || 18) + '" fill="' + INK + '">' + esc(t) + "</text>"; }
  /* grow(label, attrs): mark a data label lbl-grow (comic.js fitLabels grows it toward 12px when the drawing is small).
     attrs: { fitw, maxk, cy, plate } become data-fitw, data-maxk, data-cy, data-plate. */
  function grow(svgText, a) {
    var at = ' class="lbl-grow"';
    for (var k in a) if (a[k] != null) at += " data-" + k + '="' + a[k] + '"';
    return svgText.replace("<text ", "<text" + at + " ");
  }
  var C = L.cast;
  function book() { return document.documentElement.getAttribute("data-book") || "python"; }
  C.professor = { vb: "0 0 150 200", draw: function () {
    return '<g class="bob"><path d="M36 56 q-8 -34 30 -38 q40 -4 40 34 q-10 -12 -36 -10 q-22 2 -34 14 z" fill="#F2F2F2"' + S(4) + "/>" +
      '<circle cx="73" cy="70" r="30" fill="#E9B98E"' + S(4) + '/><circle cx="61" cy="70" r="10" fill="#fff"' + S(3.5) + '/><circle cx="85" cy="70" r="10" fill="#fff"' + S(3.5) + '/><path d="M71 70 h4" fill="none"' + S(3) + "/>" +
      '<circle cx="61" cy="71" r="3.5" fill="' + INK + '"/><circle cx="85" cy="71" r="3.5" fill="' + INK + '"/><path d="M62 90 q11 7 22 0" fill="none"' + S(3.5) + "/>" +
      '<path d="M30 196 L38 110 q35 -16 70 0 L116 196 z" fill="#fff"' + S(4) + '/><path d="M73 104 L73 196" fill="none"' + S(3) + '/><path d="M60 110 l13 18 l13 -18" fill="#FF5A4E"' + S(3) + "/>" +
      '<path d="M40 122 L20 156 M106 122 L130 94" fill="none"' + S(8) + '/><circle cx="19" cy="158" r="8" fill="#E9B98E"' + S(3) + '/><circle cx="131" cy="92" r="8" fill="#E9B98E"' + S(3) + '/><path d="M131 84 v-22" fill="none"' + S(4) + "/></g>";
  } };
  C.brick = { vb: "0 0 140 110", draw: function (el) {
    var t = el.getAttribute("data-label") || "42";
    return '<g class="bob"><rect x="10" y="20" width="120" height="76" rx="8" fill="#FF9F43"' + S(4) + '/><path d="M10 46 h120 M50 20 v26 M90 46 v24 M10 70 h120" fill="none" stroke="#B85A00" stroke-width="2"/>' +
      '<rect x="30" y="52" width="80" height="36" rx="8" fill="#fff"' + S(3) + "/>" + grow(lbl(70, 77, t, t.length > 6 ? 13 : 20), { fitw: 72, cy: 70 }) + face(70, 33, el.getAttribute("data-mood")) + "</g>";
  } };
  C.jelly = { vb: "0 0 140 120", draw: function (el) {
    var t = el.getAttribute("data-label") || "3.14", fs = t.length > 6 ? 13 : 18;
    /* The plate widens for a long value (up to 104 units, inside the body) and the value grows toward 12px when the
       jelly is drawn small (python ch14's 0.3000…04 was 8.9px). */
    var pw = Math.max(76, Math.min(104, t.length * 0.62 * fs + 14));
    return '<g class="wobble"><path d="M14 104 q-6 -60 30 -76 q26 -14 52 0 q36 16 30 76 z" fill="#8EE6A8"' + S(4) + '/><path d="M30 104 q-2 6 8 8 h64 q10 -2 8 -8" fill="#5CC27F"' + S(3) + "/>" +
      '<rect x="' + (70 - pw / 2) + '" y="66" width="' + pw + '" height="30" rx="8" fill="#fff"' + S(3) + "/>" + grow(lbl(70, 88, t, fs), { fitw: 94, cy: 81, plate: 108 }) + face(70, 46, el.getAttribute("data-mood")) + "</g>";
  } };
  C.lamp = { vb: "0 0 120 160", draw: function (el) {
    var on = el.getAttribute("data-on") !== "false";
    return '<g class="bob">' + (on ? '<path d="M60 6 v-0 M20 20 l10 10 M100 20 l-10 10 M8 62 h14 M98 62 h14" fill="none" stroke="#C98A00" stroke-width="5" stroke-linecap="round"/>' : "") +
      '<circle cx="60" cy="60" r="38" fill="' + (on ? "#FFE45C" : "#DADADA") + '"' + S(4) + '/><rect x="42" y="96" width="36" height="26" rx="4" fill="#9AA3AE"' + S(4) + '/><path d="M44 104 h32 M44 112 h32" fill="none"' + S(2.5) + "/>" +
      face(60, 54, on ? "" : "sad") + grow(lbl(60, 150, el.getAttribute("data-label") || (book() === "python" ? (on ? "True" : "False") : (on ? "true" : "false")), 18), { fitw: 110 }) + "</g>";   // data-label: true / false / nil per language
  } };
  C.ghost = { vb: "0 0 120 150", draw: function (el) {
    return '<g class="bob"><path d="M18 130 V60 q0 -48 42 -48 q42 0 42 48 v70 l-14 -12 l-14 12 l-14 -12 l-14 12 l-14 -12 z" fill="#FFFFFF"' + S(4) + "/>" +
      face(60, 60, "o") + (function (t) { return lbl(60, 112, t, t.length > 5 ? 13 : 18).replace("<text ", '<text class="lbl-grow" data-fitw="80" '); })(el.getAttribute("data-label") || ({ go: "nil", cpp: "nullptr", javascript: "undefined" })[book()] || "None") + "</g>";
  } };
  /* Index numbers under the carriages are drawn at 20 units (they were 13), so they stay readable when a train is drawn
     at the default 130px width; the frame is 130 tall to make room. */
  C.train = { vb: function (el) { var n = Math.max(1, (el.getAttribute("data-text") || "hi").slice(0, 8).length); return "0 0 " + Math.max(120, 66 + n * 38 + 8) + " 130"; }, draw: function (el) {
    var text = (el.getAttribute("data-text") || "hi").slice(0, 8), n = text.length, w = 34, out = '<g class="bob">';
    out += '<rect x="4" y="34" width="56" height="58" rx="8" fill="#FF5A4E"' + S(4) + '/><rect x="14" y="16" width="20" height="22" fill="#FF5A4E"' + S(4) + '/><rect x="16" y="46" width="30" height="22" rx="4" fill="#fff"' + S(3) + "/>" + face(31, 54, "").replace(/r="3.6"/g, 'r="2.6"');
    for (var i = 0; i < n; i++) {
      var x = 66 + i * (w + 4);
      out += '<rect x="' + x + '" y="40" width="' + w + '" height="52" rx="6" fill="#DDE8FF"' + S(3.5) + "/>" + grow(lbl(x + w / 2, 74, text[i], 22), { fitw: 30, cy: 66 }) +
        '<text class="lbl-grow" data-fitw="34" x="' + (x + w / 2) + '" y="124" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="20" fill="#2B2B2B">' + i + "</text>";
    }
    for (var j = 0; j <= n; j++) { out += '<circle cx="' + (j === 0 ? 20 : 66 + (j - 1) * (w + 4) + w / 2) + '" cy="96" r="6" fill="' + INK + '"/>'; }
    return out + "</g>";
  } };
  /* The machine's name plate fits its label: it widens up to the body's width (140), the font steps down from 18 to 13,
     and only a label still too long at 13px is squeezed horizontally (textLength), so "structuredClone()" stays whole.
     Width estimate: JetBrains Mono advance is 0.6em; 0.62 leaves room for the heavy weight. */
  function plate(t) {
    var len = Math.max(1, String(t).length), size = 18;
    while (size > 13 && len * 0.62 * size > 96) size--;
    var need = len * 0.62 * size, w = Math.max(108, Math.min(136, need + 14)), x = 110 - w / 2, fit = need > w - 12;
    /* lbl-grow: a machine drawn small (a .sm scene, a 64px cast-list icon) grows its name toward 12px; the plate
       widens to 136 units and gets taller with it (data-plate), and a name still too long is squeezed to 124. */
    var txt = grow(lbl(110, 126 + (size - 18) / 3, t, size), { fitw: 124, maxk: 2.6, cy: 120, plate: 136 });
    if (fit) txt = txt.replace("<text ", '<text textLength="' + (w - 12) + '" lengthAdjust="spacingAndGlyphs" ');
    return '<rect x="' + x + '" y="104" width="' + w + '" height="32" rx="6" fill="#fff"' + S(3) + "/>" + txt;
  }
  C.machine = { vb: "0 0 220 170", draw: function (el) {
    var t = el.getAttribute("data-label") || "f()";
    return '<path d="M10 40 h44 l-10 22 h-24 z" fill="#DDE8FF"' + S(3.5) + '/><rect x="40" y="56" width="140" height="92" rx="12" fill="#FFD60A"' + S(4) + "/>" +
      '<circle cx="74" cy="84" r="12" fill="#fff"' + S(3) + '/><path d="M74 72 v24 M62 84 h24" fill="none"' + S(2.5) + '/><circle cx="146" cy="84" r="12" fill="#fff"' + S(3) + '/><path d="M138 76 l16 16 M154 76 l-16 16" fill="none"' + S(2.5) + "/>" +
      plate(t) + '<path d="M180 120 h30 l-6 -10 M210 120 l-6 10" fill="none"' + S(3.5) + "/>";
  } };
  /* Arm labels at 20 units (13px at the default 130px width; they were 16, 10.4px); a label too long for its arm is
     squeezed to fit rather than shrunk. */
  C.signpost = { vb: "0 0 200 170", draw: function (el) {
    var a = el.getAttribute("data-yes") || "True", b = el.getAttribute("data-no") || "False";
    function arm(x, y, t) { var l = lbl(x, y, t, 20).replace("<text ", '<text class="lbl-grow" data-fitw="66" '); return String(t).length * 0.62 * 20 > 66 ? l.replace("<text ", '<text textLength="66" lengthAdjust="spacingAndGlyphs" ') : l; }   // lbl-grow: grows toward 12px when drawn small (comic.js fitLabels)
    return '<g class="bob"><rect x="92" y="20" width="16" height="146" fill="#C8955E"' + S(4) + '/><path d="M108 34 h70 l16 18 l-16 18 h-70 z" fill="#C9F2D9"' + S(4) + '/><path d="M92 84 h-70 l-16 18 l16 18 h70 z" fill="#FFE1E1"' + S(4) + "/>" +
      arm(146, 59, a) + arm(54, 109, b) + "</g>";
  } };
  C.wheel = { vb: "0 0 160 160", draw: function (el) {
    var t = el.getAttribute("data-label") || "loop";
    return '<g class="spin"><circle cx="80" cy="80" r="60" fill="#FFF6CC"' + S(4) + '/><path d="M80 20 a60 60 0 1 1 -52 30" fill="none"' + S(5) + '/><path d="M20 38 l8 14 l14 -6" fill="none"' + S(5) + "/></g>" + grow(lbl(80, 88, t, 20), { fitw: 104, cy: 81 });
  } };
  C.crate = { vb: function (el) { var n = Math.max(1, Math.min(5, (el.getAttribute("data-items") || "a,b,c").split(",").length)); return "0 0 " + (16 + n * 58) + " 120"; }, draw: function (el) {
    var items = (el.getAttribute("data-items") || "a,b,c").split(","), w = 52, out = "";
    items.slice(0, 5).forEach(function (it, i) {
      var x = 10 + i * (w + 6);
      /* item: 18 units, or as large as fits the box (at least 12) for a longer item; both the item and its index grow
         toward 12px when the crate is drawn small (lbl-grow), the item squeezed to the box. */
      var s = it.trim(), fs = s.length > 3 ? Math.max(12, Math.min(18, Math.floor(44 / (s.length * 0.62)))) : 18;
      out += '<rect x="' + x + '" y="20" width="' + w + '" height="56" rx="6" fill="#FFEFD9"' + S(3.5) + '/>' + grow(lbl(x + w / 2, 55, s, fs), { fitw: 46, maxk: 2, cy: 48 }) +
        '<text class="lbl-grow" data-fitw="50" data-maxk="2" x="' + (x + w / 2) + '" y="102" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="19" fill="#2B2B2B">' + i + "</text>";   // 19: readable at the default width
    });
    return '<g class="bob">' + out + "</g>";
  } };
  C.cabinet = { vb: "0 0 180 200", draw: function (el) {
    var keys = (el.getAttribute("data-keys") || "name,age,city").split(",").slice(0, 4), out = '<rect x="20" y="10" width="140" height="' + (keys.length * 44 + 20) + '" rx="8" fill="#B0D7FF"' + S(4) + "/>";
    /* Drawer labels (the dict keys, the point of the picture) at 17 units, about 12px at the default 130px width; a
       label too long for the drawer is squeezed to fit instead of shrinking. */
    keys.forEach(function (k, i) {
      var y = 20 + i * 44, t = k.trim(), lab = grow(lbl(84, y + 25, t, 17), { fitw: 98, cy: y + 19 });
      if (t.length * 0.62 * 17 > 98) lab = lab.replace("<text ", '<text textLength="98" lengthAdjust="spacingAndGlyphs" ');
      out += '<rect x="32" y="' + y + '" width="116" height="36" rx="5" fill="#fff"' + S(3) + '/><circle cx="140" cy="' + (y + 18) + '" r="4" fill="' + INK + '"/>' + lab;
    });
    return '<g class="bob">' + out + "</g>";
  } };

  /* =========================== memory tracer =========================== */
  /* Model: { program, steps: [{ line, note, output: [...], frames: [{ name, vars: [{ n, ref }] }],
     objects: { id: { kind, value | items: [{ val } | { ref }] | pairs: [{ k, val } | { k, ref }] } }, changed: [names] }] } */
  var NS = "http://www.w3.org/2000/svg";
  function svg(tag, a, p) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; }
  function txt(p, x, y, s, cls, anchor) { var t = svg("text", { x: x, y: y, "class": cls }, p); if (anchor) t.setAttribute("text-anchor", anchor); t.textContent = s; return t; }
  /* Wide: names on the left, objects on the right. Narrow (phones): names on top, objects stacked below,
     so text stays readable instead of the whole diagram shrinking. */
  /* Sizes are estimated from character counts of the monospace font (JetBrains Mono advance = 0.6em, plus margin). */
  var CH = { val: 11.2, sm: 8.8, name: 10.2, type: 7.6 };
  /* The header ("list · L1" or the model's label) is part of the width, so a long label stays inside its box. On phones
     (narrow) name/value cells start smaller, so more pictures fit a phone without scrolling. */
  function objSize(o, narrow, id) {
    var head = String(o.label || (o.kind + "  · " + (id || "XX"))).length * CH.type + 24;
    if (o.items) {
      var cw = narrow ? 44 : 52;
      (o.items || []).forEach(function (it) { if (!it.ref) cw = Math.max(cw, String(it.val).length * CH.sm + 18); });
      var label = (o.kind + "  · ").length * CH.type + 40;
      return { w: Math.max(narrow ? 100 : 120, label, head, (o.items || []).length * (cw + 4) + 16), h: 92, cw: cw };
    }
    if (o.pairs) {
      var kw = narrow ? 90 : 130, vw = narrow ? 110 : 144;
      (o.pairs || []).forEach(function (pr) { kw = Math.max(kw, String(pr.k).length * CH.sm + 20); if (!pr.ref) vw = Math.max(vw, String(pr.val).length * CH.sm + 20); });
      vw = Math.max(vw, head - kw - 26);
      return { w: kw + vw + 26, h: 34 + Math.max(1, (o.pairs || []).length) * 34, kw: kw, vw: vw };
    }
    return { w: Math.max(narrow ? 120 : 150, 14 + String(o.value).length * CH.val + 18 + valTag(o).length * CH.type + 12), h: 46 };
  }
  /* A plain value box shows its kind at the right; an optional label ("main's", "the copy") is appended to it. */
  function valTag(o) { return o.label ? String(o.kind) + " · " + o.label : String(o.kind); }
  /* A plan fixes each object's slot for the whole run, so objects stay put while tags move between them
     ("tags move, objects stay"). Slots follow first appearance across all steps; each is as tall as the object ever gets. */
  function planTracer(steps) {
    var order = [], size = {}, longest = 1, first = {};
    steps.forEach(function (st, si) {
      var objs = st.objects || {};
      function add(id) { if (id && objs[id] && order.indexOf(id) < 0) { order.push(id); first[id] = si; } }
      (st.frames || []).forEach(function (f) { f.vars.forEach(function (v) { longest = Math.max(longest, v.n.length); add(v.ref); }); });
      Object.keys(objs).forEach(function (id) { (objs[id].items || []).concat(objs[id].pairs || []).forEach(function (it) { add(it.ref); }); });
      Object.keys(objs).forEach(add);
      Object.keys(objs).forEach(function (id) {
        var z = objSize(objs[id], false, id), cur = size[id] || { w: 0, h: 0 };
        size[id] = { w: Math.max(cur.w, z.w), h: Math.max(cur.h, z.h) };
      });
    });
    var tagW = Math.max(120, longest * CH.name + 26);
    return { order: order, size: size, first: first, cur: steps.length, tagW: tagW, frameW: Math.max(250, tagW + 32 + 40) };
  }
  function layoutTracer(step, narrow, plan) {
    plan = plan || planTracer([step]);
    var FX = 16, FW = plan.frameW, ROW = 46, OX = narrow ? 16 : FX + FW + 94, y = 40, frames = [], objs = [], objPos = {}, varPos = [];
    (step.frames || []).forEach(function (f) {
      var h = 36 + Math.max(1, f.vars.length) * ROW;   // 32px header for the frame name, then one row per name
      frames.push({ f: f, x: FX, y: y, w: FW, h: h });
      f.vars.forEach(function (v, i) { varPos.push({ frame: f.name, v: v, x: FX + 16, y: y + 56 + i * ROW }); });
      y += h + 18;
    });
    var oy0 = narrow ? y + 44 : 40, oy = oy0, maxRight = OX;
    plan.order.forEach(function (id) {
      if (plan.first && plan.first[id] > plan.cur) return;   // not born yet: no empty slot for it (it will appear below the others)
      var slot = plan.size[id], o = (step.objects || {})[id];
      if (o) {
        var z = objSize(o, narrow, id);
        objPos[id] = { x: OX, y: oy, w: z.w, h: z.h, o: o, cw: z.cw, kw: z.kw, vw: z.vw };
        objs.push(id); maxRight = Math.max(maxRight, OX + z.w);
      }
      oy += slot.h + 22;   // the slot is kept even when the object is absent at this step
    });
    var inner = 0;
    objs.forEach(function (id) { (objPos[id].o.items || []).concat(objPos[id].o.pairs || []).forEach(function (it) { if (it.ref && objPos[it.ref]) inner++; }); });
    var gutter = maxRight + 24, tagArrows = narrow ? varPos.filter(function (vp) { return objPos[vp.v.ref]; }).length : 0;
    var width = Math.max(narrow ? 280 : 640, gutter + (inner + tagArrows) * 12 + 16);
    return { narrow: !!narrow, objTop: narrow ? y + 14 : 24, frames: frames, varPos: varPos, objPos: objPos, objs: objs,
      width: width, height: Math.max(y, oy) + 10, gutter: gutter, tagW: plan.tagW, OX: OX };
  }
  /* Orthogonal route through the right-hand gutter: out of the start point, along the gutter, into the target's right edge. */
  /* Kind names become CSS classes; a few would collide with layout classes (e.g. Rust's "char" with the cast's .char). */
  var RESERVED = { char: 1, wide: 1, sm: 1, lg: 1, token: 1, panel: 1 };
  function kindClass(k) { k = String(k || "value").replace(/[^\w-]/g, "_"); return "k-" + k + (RESERVED[k] ? "" : " " + k); }
  function gutterPath(x1, y1, drop, gx, x2, y2) {
    return "M" + x1 + " " + y1 + " V" + drop + " H" + gx + " V" + y2 + " H" + x2;
  }
  /* One picture size for the whole run: the widest and tallest any step needs, per layout (wide / narrow), so labels
     never zoom between steps and the controls below never jump. */
  function sizeRun(steps, plan) {
    var cur = plan.cur, dims = {};
    [false, true].forEach(function (n) {
      var w = 0, h = 0;
      steps.forEach(function (st, i) { plan.cur = i; var lay = layoutTracer(st, n, plan); w = Math.max(w, lay.width); h = Math.max(h, lay.height); });
      dims[n ? "narrow" : "wide"] = { w: w, h: h };
    });
    plan.cur = cur;
    return dims;
  }
  /* Natural size when the picture is wider than its box (labels at their 12px+ design size; the box scrolls sideways
     and says so); otherwise it fills the box. Shared with comic-memory.js through L.fitPicture. */
  function fitPicture(svgEl, w, slack) {
    var box = svgEl.parentNode, avail = box ? box.clientWidth : 0;
    /* slack: blank units at the right edge of the picture that may be cropped (the tracer always leaves 28). A picture at
       most that much wider than its box is cropped to the box at natural size, instead of switching to a scroller with a
       "Swipe sideways" hint for a 12px overflow. */
    if (slack && avail && w > avail && w - avail <= slack) {
      var vb = svgEl.viewBox && svgEl.viewBox.baseVal;
      if (vb && vb.height) svgEl.setAttribute("viewBox", "0 0 " + avail + " " + vb.height);
      w = avail;
    }
    var natural = !!avail && w > avail;
    svgEl.style.width = natural ? w + "px" : "";
    svgEl.classList.toggle("natural", natural);
    if (box) box.classList.toggle("scrolls", natural);
  }
  L.fitPicture = fitPicture;
  function renderTracer(el, step, prev, plan) {
    while (el.firstChild) el.removeChild(el.firstChild);
    var narrow = (el.parentNode && el.parentNode.clientWidth || 800) < 560;
    var lay = layoutTracer(step, narrow, plan), id = el.id || "tr", lane = 0;
    var fixed = plan.dims ? plan.dims[narrow ? "narrow" : "wide"] : { w: lay.width, h: lay.height };
    lay.width = Math.max(lay.width, fixed.w); lay.height = Math.max(lay.height, fixed.h);
    el.classList.toggle("narrow", narrow);
    el.setAttribute("viewBox", "0 0 " + lay.width + " " + lay.height);
    el._fullW = lay.width;
    fitPicture(el, lay.width, 24);
    var defs = svg("defs", {}, el);
    defs.innerHTML = '<marker id="' + id + '-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#111"/></marker>' +
      '<marker id="' + id + '-ahg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#8A5A00"/></marker>';
    txt(el, 16, 24, "NAMES", "tr-col");
    txt(el, narrow ? 16 : lay.OX, lay.objTop, "OBJECTS IN MEMORY", "tr-col");
    if (!lay.objs.length) txt(el, narrow ? 16 : lay.OX, lay.objTop + 28, "(nothing in memory yet)", "tr-type");   // early steps of a run sized for its last
    var changed = step.changed || [];
    var prevRefs = {};
    if (prev) (prev.frames || []).forEach(function (f) { f.vars.forEach(function (v) { prevRefs[f.name + "/" + v.n] = v.ref; }); });
    lay.frames.forEach(function (fr) {
      svg("rect", { x: fr.x, y: fr.y, width: fr.w, height: fr.h, rx: 10, "class": "tr-frame" }, el);
      txt(el, fr.x + 12, fr.y + 22, fr.f.name, "tr-frame-name");
    });
    var refCount = {};
    lay.varPos.forEach(function (vp) { if (vp.v.ref) refCount[vp.v.ref] = (refCount[vp.v.ref] || 0) + 1; });
    Object.keys(step.objects || {}).forEach(function (oid) { var o = step.objects[oid]; (o.items || []).concat(o.pairs || []).forEach(function (it) { if (it.ref) refCount[it.ref] = (refCount[it.ref] || 0) + 1; }); });
    var innerRefs = [], routed = [];
    // objects
    lay.objs.forEach(function (oid) {
      var p = lay.objPos[oid], o = p.o, isNew = !prev || !(prev.objects || {})[oid];
      // An object nothing points at fades. "leaked": true fades it too: objects in a reference cycle still point at each
      // other (so refCount > 0), but no name can reach them any more (C++ shared_ptr cycles, Rust Rc cycles).
      var g = svg("g", { "class": "tr-obj" + (isNew ? " tr-new" : "") + (refCount[oid] && !o.leaked ? "" : " tr-orphan") + (o.leaked ? " tr-leaked" : "") }, el);
      if (o.items) {
        svg("rect", { x: p.x, y: p.y, width: p.w, height: p.h, rx: 10, "class": "tr-box " + kindClass(o.kind) }, g);
        txt(g, p.x + 10, p.y + 18, o.label || (o.kind + "  · " + oid), "tr-type");
        (o.items || []).forEach(function (it, i) {
          var cx = p.x + 10 + i * (p.cw + 4), mid = cx + p.cw / 2;
          svg("rect", { x: cx, y: p.y + 26, width: p.cw, height: 40, rx: 4, "class": "tr-cell" }, g);
          if (it.ref) { svg("circle", { cx: mid, cy: p.y + 46, r: 5, "class": "tr-dot" }, g); innerRefs.push({ x: mid, y: p.y + 46, drop: p.y + p.h + 8, to: it.ref }); }
          else txt(g, mid, p.y + 52, it.val, "tr-val-sm", "middle");
          if (o.kind !== "set") { if (it.ref) txt(g, cx + 4, p.y + 84, String(i), "tr-idx"); else txt(g, mid, p.y + 84, String(i), "tr-idx", "middle"); }
        });
      } else if (o.pairs) {
        svg("rect", { x: p.x, y: p.y, width: p.w, height: p.h, rx: 10, "class": "tr-box dict " + kindClass(o.kind) }, g);
        txt(g, p.x + 10, p.y + 20, o.label || (o.kind + "  · " + oid), "tr-type");
        (o.pairs || []).forEach(function (pr, i) {
          var ry = p.y + 28 + i * 34, vx = p.x + 16 + p.kw;
          svg("rect", { x: p.x + 10, y: ry, width: p.kw, height: 30, rx: 4, "class": "tr-cell key" }, g);
          svg("rect", { x: vx, y: ry, width: p.vw, height: 30, rx: 4, "class": "tr-cell" }, g);
          txt(g, p.x + 10 + p.kw / 2, ry + 21, pr.k, "tr-val-sm", "middle");
          if (pr.ref) { svg("circle", { cx: vx + p.vw / 2, cy: ry + 15, r: 5, "class": "tr-dot" }, g); innerRefs.push({ x: vx + p.vw / 2, y: ry + 15, drop: ry + 15, to: pr.ref, side: true, edge: vx + p.vw }); }
          else txt(g, vx + p.vw / 2, ry + 21, pr.val, "tr-val-sm", "middle");
        });
      } else {
        svg("rect", { x: p.x, y: p.y, width: p.w, height: p.h, rx: 12, "class": "tr-box " + kindClass(o.kind) }, g);
        txt(g, p.x + 14, p.y + 29, o.value, "tr-val");
        txt(g, p.x + p.w - 10, p.y + 29, valTag(o), "tr-type", "end");
      }
    });
    // variables (tags) and arrows
    lay.varPos.forEach(function (vp) {
      var key = vp.frame + "/" + vp.v.n, moved = !prev || prevRefs[key] !== vp.v.ref, hot = changed.indexOf(vp.v.n) >= 0 || (moved && prev);
      var g = svg("g", { "class": "tr-var" + (hot ? " tr-hot" : "") }, el), tw = lay.tagW;
      svg("path", { d: "M" + vp.x + " " + (vp.y - 15) + " h" + tw + " l14 15 l-14 15 h-" + tw + " z", "class": "tr-tag" }, g);
      txt(g, vp.x + 12, vp.y + 6, vp.v.n, "tr-name");
      var t = lay.objPos[vp.v.ref];
      if (t) {
        var x1 = vp.x + tw + 16, y1 = vp.y, d;
        if (lay.narrow) {   // names sit above objects: routed later through the right gutter (see routed below)
          routed.push({ g: g, x: x1, y: y1, drop: y1, tx: t.x + t.w + 2, ty: t.y + Math.min(t.h / 2, 23), hot: hot, side: true });
          return;
        } else {
          var x2 = t.x - 4, y2 = t.y + Math.min(t.h / 2, 23);
          d = "M" + x1 + " " + y1 + " C " + (x1 + 50) + " " + y1 + ", " + (x2 - 50) + " " + y2 + ", " + x2 + " " + y2;
        }
        svg("path", { d: d, "class": "tr-arrow" + (hot ? " hot" : ""), "marker-end": "url(#" + id + (hot ? "-ahg" : "-ah") + ")" }, g);
      }
    });
    // references from inside containers join the routed set
    innerRefs.forEach(function (r, k) {
      var t = lay.objPos[r.to]; if (!t) return;
      routed.push({ g: el, x: r.x, y: r.y, drop: r.side ? r.y : r.drop + (k % 3) * 4, tx: t.x + t.w + 2, ty: t.y + 12, side: r.side });
    });
    // Each routed arrow gets its own lane in the right gutter, so it never crosses an object. Short spans take the
    // inner lanes and long spans the outer ones, which keeps nested arrows from crossing each other.
    routed.sort(function (p, q) { return Math.abs(p.ty - p.drop) - Math.abs(q.ty - q.drop); }).forEach(function (r) {
      var gx = lay.gutter + (lane++) * 12;
      var d = r.side ? "M" + r.x + " " + r.y + " H" + gx + " V" + r.ty + " H" + r.tx : gutterPath(r.x, r.y, r.drop, gx, r.tx, r.ty);
      svg("path", { d: d, "class": "tr-arrow" + (r.hot ? " hot" : ""), "marker-end": "url(#" + id + (r.hot ? "-ahg" : "-ah") + ")" }, r.g);
    });
  }
  function describeStep(step) {
    var parts = [];
    (step.frames || []).forEach(function (f) {
      parts.push(f.name + ": " + (f.vars.length ? f.vars.map(function (v) { var o = (step.objects || {})[v.ref]; return v.n + " → " + objText(o, step); }).join("; ") : "no names yet"));
    });
    return parts.join(" | ");
  }
  /* Text version of an object. References can form cycles (a constructor and its prototype point at each other; a list
     can contain itself), so an object already being written out is shown as [...] or {...}, as Python prints it. */
  function objText(o, step, seen) {
    if (!o) return "?";
    if (o.leaked && !seen) return objText(o, step, []) + " (leaked: no name can reach it)";
    seen = seen || [];
    if (seen.indexOf(o) >= 0) return o.items ? (o.kind === "tuple" ? "(...)" : "[...]") : "{...}";
    var inner = seen.concat([o]);
    if (o.items) return (o.kind === "tuple" ? "(" : o.kind === "set" ? "{" : "[") + o.items.map(function (it) { return it.ref ? objText(step.objects[it.ref], step, inner) : it.val; }).join(", ") + (o.kind === "tuple" ? ")" : o.kind === "set" ? "}" : "]");
    if (o.pairs) return "{" + o.pairs.map(function (p) { return p.k + ": " + (p.ref ? objText(step.objects[p.ref], step, inner) : p.val); }).join(", ") + "}";
    return o.value + " (" + valTag(o) + ")";
  }
  function initTracers() {
    var boxes = document.querySelectorAll("[data-tracer]");
    for (var i = 0; i < boxes.length; i++) { try { mountTracer(boxes[i]); } catch (e) { L.report("tracer:" + boxes[i].id, e.message); } }
  }
  function mountTracer(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-tracer")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n");
    var last = m.steps[m.steps.length - 1];
    var real = shown(prog), ok = (last.output.length ? last.output.join("\n") + "\n" : "") === real;
    // every intermediate screen must be a prefix of the real one (output only ever grows, in order)
    m.steps.forEach(function (st, i) { var t = st.output.length ? st.output.join("\n") + "\n" : ""; if (real.indexOf(t) !== 0) { ok = false; L.report("tracer:" + m.program, "step " + (i + 1) + " screen is not a prefix of the real output"); } });
    if (!ok) L.report("tracer:" + m.program, "parity failed: final output differs from the captured run");
    var par = (box.querySelector(".controls .parity") || box.querySelector(".parity:not([data-same-src])")); if (par) { par.textContent = ok ? "Matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    var code = box.querySelector(".tr-code"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), canvas = box.querySelector("svg.tracer-svg");
    code.innerHTML = lines.map(function (l) { return "<li>" + L.highlight(l) + "</li>"; }).join("");
    L.hangLines(code.querySelectorAll("li"));
    var lis = code.querySelectorAll("li"), prevStep = null, plan = planTracer(m.steps);
    plan.dims = sizeRun(m.steps, plan);
    function render(st, announce) {
      var s = m.steps[st.step];
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      plan.cur = st.step;
      renderTracer(canvas, s, st.step > 0 ? m.steps[st.step - 1] : null, plan);
      out.innerHTML = s.output.length ? s.output.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Memory: " + describeStep(s);
      prevStep = s;
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(lines[s.line - 1]) + "</code>" : "end") + "</td><td>" + s.note + "</td><td>" + esc(describeStep(s)) + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>"; }).join("");
    // The code in the text version breaks at the engine's break points (after . , ( and ::), not mid-name, when its card is narrow.
    if (tb) { var tcs = tb.querySelectorAll("td code"); for (var tc = 0; tc < tcs.length; tc++) L.addBreaks(tcs[tc]); }
    var run = L.runner(box, m.steps.length, render, { reserve: ".narration, .screen pre, .tr-code, [data-reserve]" });   // .tr-code: the "◀ next" marker can add a row to a wrapped line
    run.reset(m.steps.length);
    var wasNarrow = canvas.parentNode.clientWidth < 560;
    root.addEventListener("resize", function () {
      var n = canvas.parentNode.clientWidth < 560;
      if (n !== wasNarrow) { wasNarrow = n; render(run.state(), false); }
      else { canvas.setAttribute("viewBox", "0 0 " + (canvas._fullW || canvas.viewBox.baseVal.width) + " " + canvas.viewBox.baseVal.height); fitPicture(canvas, canvas._fullW || canvas.viewBox.baseVal.width, 24); }
    });
  }

  /* =========================== conversion / function machine =========================== */
  /* Model: { label, program, examples: [{ in, out, outKind, error, note, expectLine }] } */
  function initMachines() {
    var boxes = document.querySelectorAll("[data-machine]");
    for (var i = 0; i < boxes.length; i++) { try { mountMachine(boxes[i]); } catch (e) { L.report("machine", e.message); } }
  }
  function mountMachine(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-machine")).textContent);
    var chips = box.querySelector(".chips"), stage = box.querySelector(".machine-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), par = (box.querySelector(".controls .parity") || box.querySelector(".parity:not([data-same-src])"));
    var badCount = 0;
    m.examples.forEach(function (ex) {
      var prog = L.program(ex.program || m.program);
      ex._ok = !!prog && (ex.error ? prog.stderr.indexOf(ex.error) >= 0 : shown(prog).split("\n").indexOf(ex.expectLine || ex.out) >= 0);
      if (!ex._ok) { badCount++; L.report("machine:" + m.label, "example " + ex.in + " does not match its captured run"); }
    });
    if (par) { par.textContent = badCount ? badCount + " example(s) do not match the real run" : "Every result matches a real run"; par.classList.toggle("bad", !!badCount); }
    chips.innerHTML = '<span class="label">FEED IT:</span>' + m.examples.map(function (ex, i) { return '<button type="button" class="path-btn' + (ex.error ? " bug" : "") + '" aria-pressed="false" data-i="' + i + '"><code>' + esc(ex.in) + "</code></button>"; }).join("");
    var chipCodes = chips.querySelectorAll(".path-btn code"); for (var cc = 0; cc < chipCodes.length; cc++) L.addBreaks(chipCodes[cc]);   // a long method chain breaks at `.size(`, not mid-word
    stage.innerHTML = '<div class="m-in token"></div><svg class="char machine-art" data-char="machine" data-label="' + esc(m.label) + '"></svg><div class="m-out token"></div>';
    L.drawCast(stage);
    var tin = stage.querySelector(".m-in"), tout = stage.querySelector(".m-out"), art = stage.querySelector(".machine-art");
    function show(i, announce) {
      var ex = m.examples[i];
      var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i));
      tin.innerHTML = "<code>" + esc(ex.in) + "</code>"; L.addBreaks(tin.firstChild);
      tout.className = "m-out token" + (ex.error ? " jam" : "");
      tout.innerHTML = ex.error ? "<b>JAMMED!</b><br><code>" + esc(ex.error) + "</code>" : "<code>" + esc(ex.out) + "</code>" + (ex.outKind ? "<small>" + esc(ex.outKind) + "</small>" : "");
      note.innerHTML = ex.note;
      stage.classList.remove("run"); void stage.offsetWidth; if (L.motionOn()) stage.classList.add("run");
      art.classList.toggle("shake-me", !!ex.error);
      if (live && announce) live.textContent = m.label + " fed " + ex.in + ": " + (ex.error ? "error, " + ex.error : "gives " + ex.out) + ".";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    show(0, false);
  }

  /* =========================== exercises =========================== */
  var REG = [], revealing = false;
  function norm(s) { return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/\n+$/, ""); }
  /* What the learner sees in a terminal: the pty transcript for programs that read input, else stdout. */
  var LANGNAME = { python: "Python", rust: "Rust", go: "Go", cpp: "C++", javascript: "JavaScript" };
  function langName() { var m = P.data && P.data.captures && P.data.captures.meta; return LANGNAME[(m && m.lang) || "python"] || "the program"; }
  function shown(p) { return p.screen != null ? p.screen : p.stdout; }
  /* Everything the terminal shows, errors included (the pty transcript already contains stderr). */
  function terminal(p) { return p.screen != null ? p.screen : p.stdout + p.stderr; }
  function srcLines(name) { var p = L.program(name); return p ? p.src.replace(/\n$/, "").split("\n") : []; }
  function lastErrorLine(p) {   // the last meaningful stderr line (Node appends a "Node.js v26..." line after the error)
    var ls = p.stderr.replace(/\n$/, "").split("\n").filter(function (l) { return l.trim() && !/^Node\.js v\d/.test(l); });
    return ls[ls.length - 1] || "";
  }
  function sideBySide(yours, real, labelA, labelB) {
    var a = yours.split("\n"), b = real.split("\n"), n = Math.max(a.length, b.length), rows = "";
    for (var i = 0; i < n; i++) {
      var ya = a[i] == null ? "" : a[i], rb = b[i] == null ? "" : b[i], same = ya === rb;
      rows += '<tr class="' + (same ? "ok" : "no") + '"><td class="n">' + (i + 1) + '</td><td><code>' + (ya ? esc(ya) : "<em>(empty)</em>") + '</code></td><td><code>' + (rb ? esc(rb) : "<em>(empty)</em>") + '</code></td><td class="m" aria-label="' + (same ? "match" : "different") + '">' + (same ? "✓" : "✗") + "</td></tr>";
    }
    return '<table class="sbs"><thead><tr><th>#</th><th>' + (labelA || "Your answer") + "</th><th>" + (labelB || "Real run") + "</th><th></th></tr></thead><tbody>" + rows + "</tbody></table>";
  }
  var score = { key: "score." + (root.location ? root.location.pathname.split("/").slice(-2).join("/") : "page"), done: {} };
  function loadScore() { try { score.done = JSON.parse(L.store.get(score.key, "{}")) || {}; } catch (e) { score.done = {}; } }
  function saveScore() { L.store.set(score.key, JSON.stringify(score.done)); paintScore(); }
  function paintScore() {
    var total = REG.length, got = REG.filter(function (r) { return score.done[r.id]; }).length;
    var els = document.querySelectorAll("[data-score]");
    for (var i = 0; i < els.length; i++) {
      // Progress: role=progressbar with its values; the fill is scaled (transform), so it eases instead of resizing.
      els[i].innerHTML = '<span class="score-num">' + got + " / " + total + '</span> checks passed <span class="score-bar" role="progressbar" aria-label="Checks passed" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + got + '" aria-valuetext="' + got + " of " + total + '"><span style="transform:scaleX(' + (total ? (got / total).toFixed(4) : 0) + ')"></span></span>';
    }
  }
  function shell(box, kind, title) {
    box.classList.add("ex-card");
    box.innerHTML = '<div class="ex-head"><span class="ex-kind">' + kind + '</span><span class="ex-state" aria-live="polite"></span></div><p class="ex-q">' + title + '</p><div class="ex-body"></div>' +
      '<div class="ex-actions"><button type="button" class="btn btn-go ex-check">Check my answer</button><button type="button" class="btn ex-show">Show the answer</button><button type="button" class="btn ex-reset">Try again</button></div><div class="ex-result" hidden></div>';
    return { body: box.querySelector(".ex-body"), result: box.querySelector(".ex-result"), state: box.querySelector(".ex-state"), check: box.querySelector(".ex-check"), show: box.querySelector(".ex-show"), reset: box.querySelector(".ex-reset") };
  }
  function verdict(ui, ok, html, id) {
    ui.result.hidden = false;
    ui.result.className = "ex-result " + (ok ? "good" : "bad");
    ui.result.innerHTML = '<p class="ex-verdict">' + (revealing ? "Here is the answer, next to the real run." : ok ? "Correct! Nice work." : "Not quite yet. Compare the two sides:") + "</p>" + html;
    ui.state.textContent = revealing ? "Answer shown" : ok ? "Passed" : "Try again";
    // Only a learner's own correct check counts; revealing the answer never adds to the score.
    if (ok && id && !revealing) { score.done[id] = 1; saveScore(); }
  }
  var BUILD = {
    predict: function (box, m, id) {
      var p = L.program(m.program); if (!p) return null;
      // expect "error": the reader names the error. Python: the class name from the last stderr line. Other languages
      // (or to ask for something else): the model gives "answer", which must appear in the real stderr.
      var wantErr = m.expect === "error", real = wantErr ? (m.answer || lastErrorLine(p).split(":")[0]) : norm(shown(p));
      if (wantErr && m.answer && p.stderr.indexOf(m.answer) < 0) L.report("exercise:" + id, "answer '" + m.answer + "' is not in the real error output of " + m.program);
      var ui = shell(box, wantErr ? "NAME THAT ERROR" : "PREDICT THE OUTPUT", m.prompt || (wantErr ? "This program fails. What does the error say?" : "What does this program print? Type it exactly, one line per line."));
      var rows = wantErr ? 1 : Math.max(2, real.split("\n").length + 1);
      ui.body.innerHTML = '<pre class="code">' + L.highlight(p.src.replace(/\n$/, "")) + '</pre><label class="ex-label" for="' + id + '-a">' + (wantErr ? (m.ask || "Which error does " + langName() + " report? (just its name)") : "Your prediction:") + '</label>' +
        (wantErr ? '<input class="ex-input" id="' + id + '-a" autocomplete="off" spellcheck="false">' : '<textarea class="ex-input" id="' + id + '-a" rows="' + rows + '" spellcheck="false"></textarea>') + (m.hint ? '<details class="hint"><summary>Need a hint?</summary><p>' + m.hint + "</p></details>" : "");
      var input = ui.body.querySelector(".ex-input");
      function full() { return '<pre class="term">' + esc(terminal(p).replace(/\n$/, "")) + "</pre>"; }
      function check() {
        var mine = wantErr ? input.value.trim() : norm(input.value), ok = mine === real;
        verdict(ui, ok, (wantErr ? sideBySide(mine, real, "Your answer", "Real error") : sideBySide(mine, real)) + '<p class="ex-why"><b>The real run:</b></p>' + full() + (m.explain ? '<p class="ex-why">' + m.explain + "</p>" : ""), id);
        return ok;
      }
      return { check: check, solve: function () { input.value = real; }, show: function () { input.value = real; check(); }, reset: function () { input.value = ""; } };
    },
    choice: function (box, m, id) {
      var ui = shell(box, "QUICK CHECK", m.q);
      if (m.program) ui.body.innerHTML = '<pre class="code">' + L.highlight(L.program(m.program).src.replace(/\n$/, "")) + "</pre>";
      /* Display order is a deterministic shuffle seeded by the exercise id, so the right answer isn't always in the same
         slot (authors tended to write it first or second). Options that only make sense after the others ("Neither ...",
         "Both ...", "None of ...", "All of ...") stay at the end, in their written order. "keepOrder": true shows the
         written order (use it for options that are a sequence, such as ascending numbers). Indexes stay the written ones. */
      var show = m.options.map(function (o, i) { return i; });
      if (!m.keepOrder) {
        var tail = show.filter(function (i) { return /^\s*(neither|both|none of|all of)\b/i.test(String(m.options[i].t).replace(/<[^>]+>/g, "")); });
        var head = show.filter(function (i) { return tail.indexOf(i) < 0; });
        var seed = 0; String(id).split("").forEach(function (ch) { seed = (seed * 31 + ch.charCodeAt(0)) >>> 0; });
        var rr = L.rng(seed || 11);
        for (var si = head.length - 1; si > 0; si--) { var sj = Math.floor(rr() * (si + 1)), st = head[si]; head[si] = head[sj]; head[sj] = st; }
        show = head.concat(tail);
      }
      ui.body.insertAdjacentHTML("beforeend", '<div class="ex-options" role="radiogroup" aria-label="Answers">' + show.map(function (i) { var o = m.options[i]; return '<button type="button" role="radio" aria-checked="false" class="ex-opt" data-i="' + i + '">' + o.t + "</button>"; }).join("") + "</div>");
      var opts = ui.body.querySelectorAll(".ex-opt"), picked = -1;
      /* Radio group, as Radix does it: one tab stop (the checked option, else the first); arrow keys move to the
         next/previous option and select it, wrapping; Home/End jump to the ends. Click and Space/Enter still select. */
      function paintOpts() {
        var anyChecked = false;
        for (var k = 0; k < opts.length; k++) { var on = Number(opts[k].getAttribute("data-i")) === picked; opts[k].setAttribute("aria-checked", String(on)); if (on) anyChecked = true; }
        for (var k2 = 0; k2 < opts.length; k2++) opts[k2].tabIndex = (anyChecked ? opts[k2].getAttribute("aria-checked") === "true" : k2 === 0) ? 0 : -1;
      }
      paintOpts();
      ui.body.addEventListener("click", function (e) { var b = e.target.closest(".ex-opt"); if (!b) return; picked = Number(b.getAttribute("data-i")); paintOpts(); });
      ui.body.addEventListener("keydown", function (e) {
        var b = e.target.closest(".ex-opt"); if (!b || e.altKey || e.ctrlKey || e.metaKey) return;
        var list = Array.prototype.slice.call(opts), at = list.indexOf(b), to = -1;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (at + 1) % list.length;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (at - 1 + list.length) % list.length;
        else if (e.key === "Home") to = 0; else if (e.key === "End") to = list.length - 1;
        if (to < 0) return;
        e.preventDefault(); e.stopPropagation();
        picked = Number(list[to].getAttribute("data-i")); paintOpts(); list[to].focus();
      });
      var right = m.options.findIndex(function (o) { return o.correct; });
      function check() {
        if (picked < 0) { ui.result.hidden = false; ui.result.className = "ex-result bad"; ui.result.innerHTML = "<p>Pick an answer first.</p>"; return false; }
        var ok = picked === right;
        verdict(ui, ok, '<div class="sbs-2"><div><b>You picked</b><p>' + m.options[picked].t + "</p><p>" + (m.options[picked].why || "") + "</p></div><div><b>The answer</b><p>" + m.options[right].t + "</p><p>" + (m.options[right].why || "") + "</p></div></div>", id);
        return ok;
      }
      return { check: check, solve: function () { picked = right; }, show: function () { picked = right; paintOpts(); check(); }, reset: function () { picked = -1; paintOpts(); } };
    },
    parsons: function (box, m, id) {
      /* Only "movable" lines are scrambled. Blank lines stay where they are and are not shown as pieces; lines listed in
         m.pin (1-based numbers, e.g. [1, 2, 3] for package + imports) are shown fixed in place with no arrows. With no blank
         lines and no pins, every line is movable and the scramble is the same as before this option existed. */
      var lines = srcLines(m.program), p = L.program(m.program); if (!lines.length) return null;
      var pinned = {}; (m.pin || []).forEach(function (n) { pinned[n - 1] = true; });
      var slots = []; lines.forEach(function (l, i) { if (l.trim() !== "" && !pinned[i]) slots.push(i); });
      var ui = shell(box, "PUT THE LINES IN ORDER", m.prompt || "These lines are scrambled. Use the arrows to put them in the right order so the program prints the output below.");
      var r = L.rng(m.seed || 7), order = slots.slice();
      function shuffle() { order = slots.slice(); for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = order[i]; order[i] = order[j]; order[j] = t; } if (order.every(function (v, i) { return v === slots[i]; }) && order.length > 1) { var t2 = order[0]; order[0] = order[1]; order[1] = t2; } }
      shuffle();
      ui.body.innerHTML = '<p class="ex-label">Goal output:</p><pre class="term">' + esc(shown(p).replace(/\n$/, "")) + '</pre><ol class="parsons"></ol>';
      var ol = ui.body.querySelector(".parsons");
      function assemble() { var k = 0; return lines.map(function (l, i) { return slots.indexOf(i) >= 0 ? lines[order[k++]] : l; }); }
      function paint(focusIdx) {
        var k = 0, rows = [];
        lines.forEach(function (l, i) {
          if (l.trim() === "") return;
          if (pinned[i]) { rows.push('<li class="pz-pinned"><code>' + L.highlight(l) + '</code><span class="pz-fixed">fixed</span></li>'); return; }
          var pos = k++;
          rows.push('<li><code>' + L.highlight(lines[order[pos]]) + '</code><span class="pz-btns"><button type="button" class="pz" data-pos="' + pos + '" data-d="-1" aria-label="Move line up">↑</button><button type="button" class="pz" data-pos="' + pos + '" data-d="1" aria-label="Move line down">↓</button></span></li>');
        });
        ol.innerHTML = rows.join("");
        L.hangLines(ol.querySelectorAll("li > code"));
        if (focusIdx != null) { var b = ol.querySelector('[data-pos="' + focusIdx.pos + '"][data-d="' + focusIdx.d + '"]'); if (b) b.focus(); }
      }
      ol.addEventListener("click", function (e) {
        var b = e.target.closest(".pz"); if (!b) return;
        var pos = Number(b.getAttribute("data-pos")), d = Number(b.getAttribute("data-d")), to = pos + d;
        if (to < 0 || to >= order.length) return;
        var t = order[pos]; order[pos] = order[to]; order[to] = t; paint({ pos: to, d: d });
      });
      paint();
      /* "alts": extra accepted orders, each the full program as 1-based source line numbers ([1, 3, 2, 4]) or
         {"order": [...], "program": "alt.py"}. The program form is proven: its captured source must be exactly that
         order and its real output must equal the main program's. Blank and pinned lines must stay where they are. */
      var alts = [];
      (m.alts || []).forEach(function (a, ai) {
        var order = Array.isArray(a) ? a : a && a.order, where = "parsons:" + id + " alt " + (ai + 1);
        if (!Array.isArray(order) || order.length !== lines.length || order.slice().sort(function (x, y) { return x - y; }).some(function (v, i) { return v !== i + 1; })) { L.report(where, "must list every line number of " + m.program + " exactly once"); return; }
        if (order.some(function (n, i) { return (lines[i].trim() === "" || pinned[i]) && n !== i + 1; })) { L.report(where, "moves a blank or pinned line"); return; }
        var text = order.map(function (n) { return lines[n - 1]; }).join("\n");
        if (a.program) {
          var q = L.program(a.program);
          if (!q || q.src.replace(/\n$/, "") !== text) { L.report(where, a.program + " does not hold exactly this order"); return; }
          if (shown(q) !== shown(p)) { L.report(where, a.program + " prints something different from " + m.program); return; }
        }
        alts.push(text);
      });
      function check() {
        var mine = assemble().join("\n"), real = lines.join("\n"), alt = mine !== real && alts.indexOf(mine) >= 0, ok = mine === real || alt;
        verdict(ui, ok, (alt ? '<p class="ex-why">Your order is different from the program\'s, and it works too: it is one of the accepted orders.</p>' + sideBySide(mine, mine, "Your order", "An accepted order") : sideBySide(mine, real, "Your order", "Working program")) + '<p class="ex-why"><b>Its real output:</b></p><pre class="term">' + esc(shown(p).replace(/\n$/, "")) + "</pre>" + (m.explain ? '<p class="ex-why">' + m.explain + "</p>" : ""), id);
        return ok;
      }
      return { check: check, solve: function () { order = slots.slice(); paint(); }, show: function () { order = slots.slice(); paint(); check(); }, reset: function () { r = L.rng(m.seed || 7); shuffle(); paint(); } };
    },
    fill: function (box, m, id) {
      var lines = srcLines(m.program), p = L.program(m.program); if (!lines.length) return null;
      var ui = shell(box, "FILL IN THE BLANKS", m.prompt || "Fill each blank so the program prints the output shown.");
      // Blanks are located in the raw line (left to right, optional "nth" for repeats), then each piece is escaped,
      // so a blank like ";" or "\"" can never land inside an HTML entity.
      var cutAt = {};
      var html = lines.map(function (l, i) {
        var cuts = [];
        (m.blanks || []).forEach(function (b, bi) {
          if (b.line !== i + 1) return;
          var at = -1, from = 0;
          for (var k = 0; k < (b.nth || 1); k++) { at = l.indexOf(b.text, from); if (at < 0) break; from = at + b.text.length; }
          if (at < 0) { L.report("fill:" + m.program, "blank text not found on line " + b.line); return; }
          cuts.push({ at: at, len: b.text.length, bi: bi, b: b, line: i });
        });
        cuts.sort(function (x, y) { return x.at - y.at; });
        var out = "", pos = 0;
        cuts.forEach(function (c) {
          if (c.at < pos) { L.report("fill:" + m.program, "overlapping blanks on line " + c.b.line); return; }
          cutAt[c.bi] = c;
          out += esc(l.slice(pos, c.at)) + '<input class="ex-blank" data-b="' + c.bi + '" size="' + Math.max(3, c.len + 1) + '" aria-label="Blank ' + (c.bi + 1) + '" autocomplete="off" spellcheck="false">';
          pos = c.at + c.len;
        });
        return out + esc(l.slice(pos));
      }).join("\n");
      ui.body.innerHTML = '<p class="ex-label">Goal output:</p><pre class="term">' + esc(shown(p).replace(/\n$/, "")) + '</pre><pre class="code fill-code">' + html + "</pre>";
      var inputs = ui.body.querySelectorAll(".ex-blank");
      /* "sets": whole answers, one value per blank in blank order (["<", "0"], [">=", "1"]). Without sets each blank is
         graded alone (its text or one of its accept spellings). With sets, the blanks must together match the key
         (with accept spellings) or one complete set, so two halves of different answers are not accepted; each blank
         is marked against the closest complete answer. */
      var sets = (m.sets || []).filter(function (st, si) { if (Array.isArray(st) && st.length === (m.blanks || []).length) return true; L.report("fill:" + id, "set " + (si + 1) + " must give one value per blank"); return false; });
      function check() {
        var okAll = true, mineLines = lines.slice(), vals = {}, k, bi;
        for (k = 0; k < inputs.length; k++) vals[inputs[k].getAttribute("data-b")] = inputs[k].value.trim();
        var cands = [m.blanks.map(function (b) { return [b.text].concat(b.accept || []); })].concat(sets.map(function (st) { return st.map(function (v) { return [String(v)]; }); }));
        var best = cands[0], bestHits = -1;
        cands.forEach(function (c) { var hits = 0; for (var j = 0; j < c.length; j++) if (c[j].indexOf(vals[j]) >= 0) hits++; if (hits > bestHits) { best = c; bestHits = hits; } });
        if (!sets.length) best = cands[0];
        for (k = 0; k < inputs.length; k++) {
          bi = Number(inputs[k].getAttribute("data-b"));
          var ok = best[bi].indexOf(vals[bi]) >= 0;
          inputs[k].classList.toggle("ok", ok); inputs[k].classList.toggle("no", !ok); if (!ok) okAll = false;
          if (ok) inputs[k].removeAttribute("aria-invalid"); else inputs[k].setAttribute("aria-invalid", "true");
        }
        // "Your code": splice each answer in at its own blank's position (right to left, so positions stay valid)
        Object.keys(cutAt).map(function (x) { return cutAt[x]; }).sort(function (x, y) { return y.at - x.at; }).forEach(function (c) {
          var l = mineLines[c.line]; mineLines[c.line] = l.slice(0, c.at) + (vals[c.bi] || "____") + l.slice(c.at + c.len);
        });
        verdict(ui, okAll, sideBySide(mineLines.join("\n"), lines.join("\n"), "Your code", "Working program") + '<p class="ex-why"><b>Its real output:</b></p><pre class="term">' + esc(shown(p).replace(/\n$/, "")) + "</pre>" + (m.explain ? '<p class="ex-why">' + m.explain + "</p>" : ""), id);
        return okAll;
      }
      return { check: check, solve: function () { for (var k = 0; k < inputs.length; k++) inputs[k].value = m.blanks[Number(inputs[k].getAttribute("data-b"))].text; }, show: function () { this.solve(); check(); }, reset: function () { for (var k = 0; k < inputs.length; k++) { inputs[k].value = ""; inputs[k].className = "ex-blank"; inputs[k].removeAttribute("aria-invalid"); } } };
    },
    spot: function (box, m, id) {
      var lines = srcLines(m.program), p = L.program(m.program); if (!lines.length) return null;
      var ui = shell(box, "SPOT THE BUG", m.prompt || "This program has a bug. Click the line you think is wrong.");
      // Blank lines are spacers, not answers (parsons hides them too); numbering still follows the source.
      ui.body.innerHTML = '<ol class="spot">' + lines.map(function (l, i) { if (!l.trim()) return '<li class="spot-blank" aria-hidden="true"></li>'; return '<li><button type="button" class="spot-line" aria-pressed="false" data-l="' + (i + 1) + '"><span class="ln">' + (i + 1) + "</span><code>" + L.highlight(l) + "</code></button></li>"; }).join("") + "</ol>";
      L.hangLines(ui.body.querySelectorAll(".spot-line > code"));
      var btns = ui.body.querySelectorAll(".spot-line"), picked = 0;
      ui.body.addEventListener("click", function (e) { var b = e.target.closest(".spot-line"); if (!b) return; picked = Number(b.getAttribute("data-l")); for (var k = 0; k < btns.length; k++) btns[k].setAttribute("aria-pressed", String(Number(btns[k].getAttribute("data-l")) === picked)); });
      function check() {
        if (!picked) { ui.result.hidden = false; ui.result.className = "ex-result bad"; ui.result.innerHTML = "<p>Click a line first.</p>"; return false; }
        var ok = picked === m.bug;
        verdict(ui, ok, '<div class="sbs-2"><div><b>You picked line ' + picked + "</b><p><code>" + esc(lines[picked - 1]) + '</code></p></div><div><b>The bug is on line ' + m.bug + "</b><p><code>" + esc(lines[m.bug - 1]) + "</code></p></div></div><p class=\"ex-why\"><b>What really happens when you run it:</b></p><pre class=\"term\">" + esc(terminal(p).replace(/\n$/, "")) + "</pre>" + (m.explain ? '<p class="ex-why">' + m.explain + "</p>" : ""), id);
        return ok;
      }
      return { check: check, solve: function () { picked = m.bug; }, show: function () { picked = m.bug; for (var k = 0; k < btns.length; k++) btns[k].setAttribute("aria-pressed", String(Number(btns[k].getAttribute("data-l")) === picked)); check(); }, reset: function () { picked = 0; for (var k = 0; k < btns.length; k++) btns[k].setAttribute("aria-pressed", "false"); } };
    },
    trace: function (box, m, id) {
      var p = L.program(m.program); if (!p) return null;
      // The program prints one row per step; the expected table IS the captured output.
      // "from": "stdout" reads the rows from the program's own output only (no prompts or echoed typing from a .stdin run)
      var rows = norm(m.from === "stdout" ? p.stdout : shown(p)).split("\n").map(function (l) { return l.trim().split(/\s+/); });
      var cols = m.columns, given = m.given || [0];
      var ui = shell(box, "TRACE TABLE", m.prompt || "Fill in the table: the value of each name every time the loop body ends.");
      var tbl = '<table class="trace"><thead><tr>' + cols.map(function (c) { return "<th><code>" + esc(c) + "</code></th>"; }).join("") + "</tr></thead><tbody>" +
        rows.map(function (r, ri) { return "<tr>" + cols.map(function (c, ci) { return "<td>" + (given.indexOf(ci) >= 0 ? "<code>" + esc(r[ci] || "") + "</code>" : '<input class="ex-cell" data-r="' + ri + '" data-c="' + ci + '" size="6" aria-label="' + esc(c) + ", row " + (ri + 1) + '" autocomplete="off" spellcheck="false">') + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
      ui.body.innerHTML = '<pre class="code">' + L.highlight((m.showProgram || p.src).replace(/\n$/, "")) + "</pre>" + tbl;
      var cells = ui.body.querySelectorAll(".ex-cell");
      function check() {
        var okAll = true;
        for (var k = 0; k < cells.length; k++) { var r = rows[Number(cells[k].getAttribute("data-r"))][Number(cells[k].getAttribute("data-c"))], ok = cells[k].value.trim() === r; cells[k].classList.toggle("ok", ok); cells[k].classList.toggle("no", !ok); if (ok) cells[k].removeAttribute("aria-invalid"); else cells[k].setAttribute("aria-invalid", "true"); if (!ok) okAll = false; }
        verdict(ui, okAll, '<p class="ex-why">Green cells match the real run; red cells do not. The real program printed:</p><pre class="term">' + esc(shown(p).replace(/\n$/, "")) + "</pre>" + (m.explain ? '<p class="ex-why">' + m.explain + "</p>" : ""), id);
        return okAll;
      }
      return { check: check, solve: function () { for (var k = 0; k < cells.length; k++) cells[k].value = rows[Number(cells[k].getAttribute("data-r"))][Number(cells[k].getAttribute("data-c"))]; }, show: function () { this.solve(); check(); }, reset: function () { for (var k = 0; k < cells.length; k++) { cells[k].value = ""; cells[k].className = "ex-cell"; cells[k].removeAttribute("aria-invalid"); } } };
    }
  };
  function initExercises() {
    loadScore();
    var boxes = document.querySelectorAll("[data-ex]");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i], kind = box.getAttribute("data-ex"), id = box.id || ("ex" + i);
      try {
        var m = JSON.parse(document.getElementById(box.getAttribute("data-model")).textContent);
        var cap = m.program && L.program(m.program);
        if (cap && cap.nondeterministic && kind !== "choice") { L.report("exercise:" + id, m.program + " is nondeterministic and cannot be an answer key"); continue; }
        var api = BUILD[kind] && BUILD[kind](box, m, id);
        if (!api) { L.report("exercise:" + id, "could not build " + kind); continue; }
        (function (box, api, id) {
          box.querySelector(".ex-check").addEventListener("click", function () { api.check(); });
          box.querySelector(".ex-show").addEventListener("click", function () { revealing = true; try { api.show(); } finally { revealing = false; } });
          box.querySelector(".ex-reset").addEventListener("click", function () { api.reset(); var r = box.querySelector(".ex-result"); r.hidden = true; box.querySelector(".ex-state").textContent = ""; });
          REG.push({ id: id, kind: kind, api: api, box: box });
          if (score.done[id]) box.querySelector(".ex-state").textContent = "Passed before";
        })(box, api, id);
      } catch (e) { L.report("exercise:" + id, e.message); }
    }
    paintScore();
    var reset = document.querySelector("[data-score-reset]");
    if (reset) reset.addEventListener("click", function () { score.done = {}; saveScore(); REG.forEach(function (r) { r.box.querySelector(".ex-state").textContent = ""; }); });
  }
  /* Self-test: solve every exercise with its answer key and confirm the checker accepts it.
     Used by tools/check_chapter.js; it restores each exercise and does not touch the saved score. */
  P.comic.selfTest = function () {
    var saved = JSON.stringify(score.done), results = REG.map(function (r) {
      var ok = false;
      try { r.api.solve(); ok = r.api.check(); } catch (e) { ok = false; }
      r.api.reset(); r.box.querySelector(".ex-result").hidden = true; r.box.querySelector(".ex-state").textContent = "";
      return { id: r.id, kind: r.kind, ok: ok };
    });
    score.done = JSON.parse(saved); L.store.set(score.key, saved); paintScore();
    return results;
  };

  P.comic.ext(function () { initTracers(); initMachines(); initExercises(); L.drawCast(); });
})(typeof globalThis !== "undefined" ? globalThis : this);

/* [data-same-src="a.cpp,b.cpp"]: a badge proving that two or more captured files hold the same source code. Used when one
   program is captured two ways (g++ and clang++ compile-only runs, -std=c++17 vs -std=c++23), because capture.py takes one
   build recipe per file. Promoted from ext/cpp-ch7.js (copied into cpp ch9-ch12). Style it with the engine's .parity class.
   Chapter copies that still run it set the same text again, which is harmless. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib || !P.comic.ext) { if (root.console) root.console.error("[POLYGLOT.comic] data-same-src: engine not ready"); return; }
  var L = P.comic.lib;
  P.comic.ext(function () {
    var spots = document.querySelectorAll("[data-same-src]");
    for (var i = 0; i < spots.length; i++) {
      var names = spots[i].getAttribute("data-same-src").split(","), first = L.program(names[0]), ok = !!first;
      for (var j = 1; ok && j < names.length; j++) { var q = L.program(names[j]); ok = !!q && q.src === first.src; }
      spots[i].textContent = ok ? "Same source code in " + names.join(", ") : "Sources differ: " + names.join(", ");
      spots[i].classList.toggle("bad", !ok);
      if (!ok && !spots[i].hasAttribute("data-same-src-reported")) { spots[i].setAttribute("data-same-src-reported", ""); L.report("same-src", "sources differ: " + names.join(", ")); }
    }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);

/* [data-asan="ID"]: an annotated sanitizer (or assert) report, promoted in engine pass 3 from ext/cpp-ch11.js (cpp ch13
   and ch21 had copies under the name [data-report], which other chapters use for different widgets). The text is the
   captured stderr of the model's program, never typed into the page. Model (JSON in <script id=ID>):
     { "program": "oob.cpp", "fold": { "from": "Shadow bytes around", "to": "ABORTING", "label": "the shadow-byte map" },
       "parts": [ { "title": "The accusation", "match": "ERROR: AddressSanitizer", "after": "optional earlier line",
                    "all": false, "note": "HTML" }, ... ] }
   Each part names a piece of text that must occur in a real line of the report (the first line containing it, at or
   after the line containing "after"; "all": true marks every such line). The line gets the part's number, and a button
   per part highlights it and explains it in the narration. A parity badge says whether every part was found (a missing
   part is reported). "fold" collapses a skippable stretch (from the line containing "from" to the one containing "to")
   into one marked line; the complete report goes into .rep-full. Markup inside the panel: .rep-keys, .rep-text,
   .narration, .parity, [aria-live], and optionally ol.rep-tv (text version) and pre.rep-full (in details.rep-more).
   Each line gets the hanging indent and the code break points (a path breaks after a "/", so the file:line at its end
   stays in view on phones; a token longer than the line breaks rather than hiding); on wide screens a long report scrolls in its box and fades at its foot until it
   is scrolled to the end (.at-end). Styles: comic-widgets.css "Annotated sanitizer reports". */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib || !P.comic.ext) { if (root.console) root.console.error("[POLYGLOT.comic] data-asan: engine not ready"); return; }
  var L = P.comic.lib, esc = L.esc;
  function model(el) {
    var id = el.getAttribute("data-asan"), s = document.getElementById(id);
    if (!s) { L.report("asan", "no model script #" + id); return null; }
    try { return JSON.parse(s.textContent); } catch (e) { L.report("asan", id + ": bad JSON: " + e.message); return null; }
  }
  function endFade(el) {   // .at-end once the box is scrolled to its foot (or doesn't scroll at all)
    function upd() { el.classList.toggle("at-end", el.scrollTop + el.clientHeight >= el.scrollHeight - 2); }
    el.addEventListener("scroll", upd, { passive: true }); root.addEventListener("resize", upd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(upd, upd);
    upd();
  }
  function mount(box) {
    var m = model(box); if (!m) return;
    var q = L.program(m.program); if (!q) return;
    var lines = String(q.stderr).replace(/\n$/, "").split("\n");
    var found = 0, owner = {};
    m.parts.forEach(function (p, pi) {
      p.lines = [];
      var from = 0;
      if (p.after) { for (var a = 0; a < lines.length; a++) if (lines[a].indexOf(p.after) >= 0) { from = a; break; } }
      for (var k = from; k < lines.length; k++) if (lines[k].indexOf(p.match) >= 0) { p.lines.push(k); if (!p.all) break; }
      if (p.lines.length) { found++; p.lines.forEach(function (k) { if (owner[k] == null) owner[k] = pi; }); }
      else L.report("asan:" + m.program, "part '" + p.title + "' not found: " + p.match);
    });
    var f0 = -1, f1 = -1;
    if (m.fold) {
      for (var i = 0; i < lines.length; i++) { if (f0 < 0 && lines[i].indexOf(m.fold.from) >= 0) f0 = i; if (f0 >= 0 && m.fold.to && lines[i].indexOf(m.fold.to) >= 0) { f1 = i; break; } }
      if (f0 >= 0 && f1 < 0) f1 = lines.length;
    }
    var html = "";
    for (var n = 0; n < lines.length; n++) {
      if (n === f0) {
        html += '<div class="rl fold"><b class="rm" aria-hidden="true">&hellip;</b>' + esc("… " + (f1 - f0) + " lines: " + m.fold.label + " (folded; the full report is below)") + "</div>";
        n = f1 - 1; continue;
      }
      var pi = owner[n];
      html += '<div class="rl' + (pi != null ? " marked" : "") + '"' + (pi != null ? ' data-part="' + pi + '"' : "") + ">" +
        (pi != null ? '<b class="rm" aria-hidden="true">' + (pi + 1) + "</b>" : '<b class="rm blank" aria-hidden="true"></b>') +
        '<span class="rt">' + (lines[n] ? esc(lines[n]) : "&nbsp;") + "</span></div>";
    }
    var keys = box.querySelector(".rep-keys"), text = box.querySelector(".rep-text"), note = box.querySelector(".narration"),
      live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tv = box.querySelector(".rep-tv"), full = box.querySelector(".rep-full");
    text.innerHTML = html;
    L.hangLines(text.querySelectorAll(".rt"));
    endFade(text);
    keys.innerHTML = m.parts.map(function (p, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '">' + (i + 1) + " · " + esc(p.title) + "</button>"; }).join("");
    if (full) full.textContent = lines.join("\n");
    if (tv) tv.innerHTML = m.parts.map(function (p) {
      return "<li><b>" + esc(p.title) + ".</b> " + (p.lines.length ? "The line: <code>" + esc(lines[p.lines[0]].trim()) + "</code>. " : "") + p.note + "</li>";
    }).join("");
    var ok = found === m.parts.length;
    if (par) { par.textContent = ok ? "All " + found + " marked parts are lines of the real report of " + m.program : "Some marked parts are missing from the real report of " + m.program; par.classList.toggle("bad", !ok); }
    function pick(i, announce) {
      var bs = keys.querySelectorAll(".path-btn");
      for (var b = 0; b < bs.length; b++) bs[b].setAttribute("aria-pressed", String(b === i));
      var ls = text.querySelectorAll(".rl[data-part]");
      for (var c = 0; c < ls.length; c++) ls[c].classList.toggle("on", Number(ls[c].getAttribute("data-part")) === i);
      var p = m.parts[i];
      note.innerHTML = '<span class="count">Part ' + (i + 1) + " of " + m.parts.length + "</span><b>" + esc(p.title) + ".</b> " + p.note;
      if (live && announce) live.textContent = "Part " + (i + 1) + ", " + p.title + ". " + (p.lines.length ? "Line: " + lines[p.lines[0]].trim() + ". " : "") + note.textContent.replace(/^Part \d+ of \d+/, "");
      var first = text.querySelector(".rl.on");
      if (announce && first && text.scrollHeight > text.clientHeight) text.scrollTop = Math.max(0, first.offsetTop - text.offsetTop - 30);
    }
    keys.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) pick(Number(b.getAttribute("data-i")), true); });
    pick(0, false);
  }
  P.comic.ext(function () {
    var r = document.querySelectorAll("[data-asan]");
    for (var i = 0; i < r.length; i++) { if (r[i]._asan) continue; r[i]._asan = true; try { mount(r[i]); } catch (e) { L.report("asan", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
