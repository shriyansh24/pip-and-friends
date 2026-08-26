/* Chapter 11 extension: "The Text Workshop".
   Adds (1) cast: a new prop character, the copier (a string method makes a changed copy). The error critters this
       chapter meets again (pockets, taster, jigsaw, jangles, sneak) are drawn by the shared assets/comic-critters.js;
   (2) the format-spec decoder [data-specdec]: splits a spec such as >8.2f into its parts (fill, align, sign, zero,
       width, grouping, precision, type), names each part, and lays the REAL captured output out in character cells.
       Each example names the line it expects in the captured stdout and the "core" text (the value before padding);
       the page checks that the line exists and that it is exactly core + padding as the align rule says, or the
       parity badge turns bad and an error is reported;
   (3) the split conveyor [data-splitter]: shows a string as a train of character cells, marks where split() cuts,
       and drops the pieces into crates. The pieces are worked out with Python's rules (no argument: cut on runs of
       whitespace and drop empty pieces; with a separator: cut at every separator and keep empty pieces), written as
       Python would print the list, and checked against a whole line of the captured output.
   Cast members are registered at load time, before the engine's boot draws the cast. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch11.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  /* The error critters (pockets, taster, jigsaw, jangles, sneak) come from the shared assets/comic-critters.js. */
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* The copier: the original page stays on the glass; a changed copy slides out of the side.
     The pages carry scribble lines only, never output text: the real outputs live in the machine panel. */
  function page(x, y, rot, fill, mark) {
    var lines = "";
    for (var i = 0; i < 4; i++) lines += '<path d="M' + (x + 8) + " " + (y + 14 + i * 10) + " h" + (i === 3 ? 18 : 30) + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
    return '<g transform="rotate(' + rot + " " + (x + 23) + " " + (y + 28) + ')"><rect x="' + x + '" y="' + y + '" width="46" height="56" rx="3" fill="' + fill + '"' + S(3) + "/>" + lines + (mark || "") + "</g>";
  }
  C.copier = { vb: "0 0 260 180", draw: function () {
    var star = '<path d="M0 -8 L2.4 -2.4 L8 -2.4 L3.6 1.2 L5.2 7 L0 3.6 L-5.2 7 L-3.6 1.2 L-8 -2.4 L-2.4 -2.4 Z" fill="#FFD60A" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    return '<g class="bob">' +
      '<rect x="30" y="70" width="160" height="86" rx="12" fill="#DDE8FF"' + S(4) + "/>" +             // body
      '<rect x="22" y="52" width="176" height="22" rx="6" fill="#FFFFFF"' + S(4) + "/>" +              // glass and lid
      page(82, 8, -4, "#FFFFFF", '<g transform="translate(118 18)">' + star + "</g>") +               // the original, on the glass
      '<rect x="52" y="90" width="60" height="38" rx="8" fill="#FFFFFF"' + S(3) + "/>" +              // face screen
      '<g class="eyes">' + dot(70, 106, 4.2) + dot(94, 106, 4.2) + "</g>" +
      '<path d="M72 118 q10 7 20 0" fill="none"' + S(3.5) + "/>" +
      '<circle cx="140" cy="100" r="9" fill="#C9F2D9"' + S(3) + '/><circle cx="166" cy="100" r="9" fill="#FFE1E1"' + S(3) + "/>" +
      '<rect x="128" y="120" width="50" height="10" rx="4" fill="#FFFFFF"' + S(3) + "/>" +
      '<path d="M190 128 h40 l6 -6" fill="none"' + S(4) + "/>" +                                          // output tray
      page(196, 64, 8, "#C9F2D9", '<g transform="translate(232 74)">' + star + '</g><path d="M200 112 l8 -8 M206 116 l8 -8" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>') +
      '<rect x="44" y="156" width="18" height="12" fill="' + INK + '"/><rect x="158" y="156" width="18" height="12" fill="' + INK + '"/>' +
      "</g>";
  } };

  /* ---------------- shared helpers ---------------- */
  function model(box, attr) { return JSON.parse(document.getElementById(box.getAttribute(attr)).textContent); }
  function lines(prog) { return L.shown(prog).replace(/\n$/, "").split("\n"); }
  function setParity(box, bad, okText) {
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " example(s) do not match the real run" : okText; par.classList.toggle("bad", !!bad); }
  }
  function chipsFor(box, items, labelOf) {
    var chips = box.querySelector(".chips");
    chips.insertAdjacentHTML("beforeend", items.map(function (ex, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(labelOf(ex)) + "</code></button>"; }).join(""));
    return chips;
  }
  function press(chips, i) { var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(k === i)); }

  /* ---------------- format-spec decoder ---------------- */
  /* Model: { program, examples: [{ name, spec, value ("'Pip'" for text, a number otherwise), core, expectLine, note }] }.
     The program prints each example between bars, e.g. print(f"|{price:>8.2f}|"). */
  var ALIGN = { "<": "left", ">": "right", "^": "centre", "=": "after the sign" };
  var TYPES = { f: "fixed-point decimal", d: "whole number, in ordinary digits", "%": "percent: times 100, then a % sign", e: "scientific notation", s: "text", x: "hexadecimal", b: "binary", g: "general number" };
  function parseSpec(spec) {
    var s = spec, i = 0, parts = [], out = {};
    if (s.length > 1 && ALIGN[s[1]]) { parts.push({ k: "fill", t: s[0] }); parts.push({ k: "align", t: s[1] }); out.fill = s[0]; out.align = s[1]; i = 2; }
    else if (ALIGN[s[0]]) { parts.push({ k: "align", t: s[0] }); out.align = s[0]; i = 1; }
    var m = /^([+\- ])?(z)?(#)?(0)?(\d+)?([,_])?(?:\.(\d+))?([bcdeEfFgGnosxX%])?$/.exec(s.slice(i));
    if (!m) return null;
    if (m[1]) parts.push({ k: "sign", t: m[1] });
    if (m[4]) { parts.push({ k: "zero", t: "0" }); out.zero = true; }
    if (m[5]) { parts.push({ k: "width", t: m[5] }); out.width = Number(m[5]); }
    if (m[6]) parts.push({ k: "group", t: m[6] });
    if (m[7]) { parts.push({ k: "prec", t: "." + m[7] }); out.prec = Number(m[7]); }
    if (m[8]) { parts.push({ k: "type", t: m[8] }); out.type = m[8]; }
    out.parts = parts;
    return out;
  }
  var KLABEL = { fill: "fill", align: "align", sign: "sign", zero: "zero pad", width: "width", group: "grouping", prec: "precision", type: "type" };
  function explain(p, sp, isText) {
    switch (p.k) {
      case "fill": return "<b>" + esc(p.t) + "</b> fill: pad with <code>" + esc(p.t) + "</code> instead of spaces.";
      case "align": return "<b>" + esc(p.t) + "</b> align: line the value up on the <b>" + ALIGN[p.t] + "</b> of its space.";
      case "sign": return "<b>" + esc(p.t) + "</b> sign: how to show plus and minus.";
      case "zero": return "<b>0</b> zero pad: fill the space in front with zeros (numbers only).";
      case "width": return "<b>" + p.t + "</b> width: take up at least " + p.t + " characters. Short values get padding." + (sp.align || sp.zero ? "" : (isText ? " Text sits on the <b>left</b> unless you say otherwise." : " Numbers sit on the <b>right</b> unless you say otherwise."));
      case "group": return "<b>" + esc(p.t) + "</b> grouping: a <code>" + esc(p.t) + "</code> between every 3 digits.";
      case "prec": return "<b>" + esc(p.t) + "</b> precision: " + (sp.type === "f" || sp.type === "%" || sp.type === "e" ? "exactly " + sp.prec + " digit" + (sp.prec === 1 ? "" : "s") + " after the point (rounded)." : "at most " + sp.prec + " characters.");
      case "type": return "<b>" + esc(p.t) + "</b> type: " + (TYPES[p.t] || "presentation type") + ".";
    }
    return "";
  }
  function padCheck(inner, ex, sp, isText) {
    var core = ex.core, pad = inner.length - core.length;
    if (pad < 0) return null;
    var fill = sp.zero && !sp.align ? "0" : (sp.fill || " ");
    var align = sp.align || (sp.zero ? "=" : (isText ? "<" : ">"));
    if (!sp.width && pad) return null;
    var left = align === "<" ? 0 : align === "^" ? Math.floor(pad / 2) : pad, right = pad - left;
    var want = new Array(left + 1).join(fill) + core + new Array(right + 1).join(fill);
    return want === inner ? { left: left, right: right, fill: fill, align: align } : null;
  }
  function initSpec() {
    var boxes = document.querySelectorAll("[data-specdec]");
    for (var i = 0; i < boxes.length; i++) { try { mountSpec(boxes[i]); } catch (e) { L.report("specdec", e.message); } }
  }
  function mountSpec(box) {
    var m = model(box, "data-specdec"), prog = L.program(m.program); if (!prog) return;
    var out = lines(prog), bad = 0;
    m.examples.forEach(function (ex) {
      ex._sp = parseSpec(ex.spec); ex._text = /^'.*'$/.test(ex.value);
      ex._ok = false;
      if (!ex._sp) { L.report("specdec", "cannot read the spec " + ex.spec); }
      else if (out.indexOf(ex.expectLine) < 0) { L.report("specdec", "line " + ex.expectLine + " is not in the output of " + m.program); }
      else if (!/^\|.*\|$/.test(ex.expectLine)) { L.report("specdec", "line " + ex.expectLine + " is not printed between bars"); }
      else {
        ex._lay = padCheck(ex.expectLine.slice(1, -1), ex, ex._sp, ex._text);
        if (!ex._lay) L.report("specdec", "the real output " + ex.expectLine + " is not " + ex.core + " padded as " + ex.spec + " says");
        else ex._ok = true;
      }
      if (!ex._ok) bad++;
    });
    setParity(box, bad, "Every output is the real run, cell by cell");
    var chips = chipsFor(box, m.examples, function (ex) { return "{" + ex.name + ":" + ex.spec + "}"; });
    var codeEl = box.querySelector(".sd-code"), cellsEl = box.querySelector(".sd-cells"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function render(i, announce) {
      var ex = m.examples[i], sp = ex._sp || { parts: [] };
      press(chips, i);
      codeEl.innerHTML = '<span class="sd-plain"><code>f"|{' + esc(ex.name) + "</code></span>" + '<span class="sd-tok k-colon"><code>:</code><small>rules</small></span>' +
        sp.parts.map(function (p) { return '<span class="sd-tok k-' + p.k + '"><code>' + (p.t === " " ? "␣" : esc(p.t)) + "</code><small>" + KLABEL[p.k] + "</small></span>"; }).join("") +
        '<span class="sd-plain"><code>}|"</code></span>';
      var inner = ex.expectLine.slice(1, -1), lay = ex._lay || { left: 0, right: 0 }, cells = "";
      for (var k = 0; k < inner.length; k++) {
        var isPad = k < lay.left || k >= inner.length - lay.right, ch = inner[k];
        cells += '<span class="sd-cell' + (isPad ? " pad" : "") + '"><b>' + (ch === " " ? "·" : esc(ch)) + "</b><small>" + (k + 1) + "</small></span>";
      }
      var padN = lay.left + lay.right;
      cellsEl.innerHTML = '<span class="sd-row"><span class="sd-bar">|</span>' + cells + '<span class="sd-bar">|</span></span>' +
        '<p class="sd-sum">' + inner.length + " character" + (inner.length === 1 ? "" : "s") + ": " + (inner.length - padN) + " from the value (solid boxes)" + (padN ? ", " + padN + " padding (dotted boxes" + (lay.fill === " " ? ", spaces shown as ·" : "") + ")" : ", no padding") + ".</p>";
      note.innerHTML = '<span class="count">Value:</span> <code>' + esc(ex.value) + "</code><ul class=\"sd-why\">" + sp.parts.map(function (p) { return "<li>" + explain(p, sp, ex._text) + "</li>"; }).join("") + "</ul>" + (ex.note ? "<p>" + ex.note + "</p>" : "");
      if (live && announce) live.textContent = "{" + ex.name + ":" + ex.spec + "} prints " + ex.expectLine + ". " + note.textContent.replace(/\s+/g, " ");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.examples.map(function (ex) {
      var sp = ex._sp || { parts: [] };
      return "<tr><td><code>{" + esc(ex.name + ":" + ex.spec) + "}</code></td><td>" + sp.parts.map(function (p) { return explain(p, sp, ex._text); }).join(" ") + "</td><td><code>" + esc(ex.expectLine).replace(/ /g, "&nbsp;") + "</code></td></tr>";
    }).join("");
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) render(Number(b.getAttribute("data-i")), true); });
    render(0, false);
  }

  /* ---------------- split conveyor ---------------- */
  /* Model: { program, examples: [{ s, sep (null for split()), expectLine, note }] } */
  function pySplit(s, sep) {
    if (sep == null) return { pieces: s.split(/\s+/).filter(function (x) { return x !== ""; }) };
    return { pieces: s.split(sep) };
  }
  function pyRepr(list) {
    for (var i = 0; i < list.length; i++) if (/['\\\n\t]/.test(list[i])) return null;
    return "[" + list.map(function (x) { return "'" + x + "'"; }).join(", ") + "]";
  }
  function cutMask(s, sep) {
    var mask = [], i;
    for (i = 0; i < s.length; i++) mask.push(false);
    if (sep == null) { for (i = 0; i < s.length; i++) mask[i] = /\s/.test(s[i]); }
    else { var at = s.indexOf(sep); while (at >= 0) { for (i = at; i < at + sep.length; i++) mask[i] = true; at = s.indexOf(sep, at + sep.length); } }
    return mask;
  }
  function callText(ex) { return JSON.stringify(ex.s) + ".split(" + (ex.sep == null ? "" : JSON.stringify(ex.sep)) + ")"; }
  function initSplit() {
    var boxes = document.querySelectorAll("[data-splitter]");
    for (var i = 0; i < boxes.length; i++) { try { mountSplit(boxes[i]); } catch (e) { L.report("splitter", e.message); } }
  }
  function mountSplit(box) {
    var m = model(box, "data-splitter"), prog = L.program(m.program); if (!prog) return;
    var out = lines(prog), bad = 0;
    m.examples.forEach(function (ex) {
      ex._pieces = pySplit(ex.s, ex.sep).pieces;
      var r = pyRepr(ex._pieces);
      ex._ok = r !== null && r === ex.expectLine && out.indexOf(ex.expectLine) >= 0;
      if (!ex._ok) { bad++; L.report("splitter", callText(ex) + " gives " + r + "; the model or the captured output says " + ex.expectLine); }
    });
    setParity(box, bad, "Every crate row matches the real run");
    var chips = chipsFor(box, m.examples, callText);
    var stage = box.querySelector(".sp-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function render(i, announce) {
      var ex = m.examples[i], mask = cutMask(ex.s, ex.sep), cells = "";
      press(chips, i);
      for (var k = 0; k < ex.s.length; k++) {
        var ch = ex.s[k];
        cells += '<span class="sp-car' + (mask[k] ? " cut" : "") + '"><b>' + (ch === " " ? "␣" : esc(ch)) + "</b><small>" + k + "</small>" + (mask[k] ? '<i aria-hidden="true">✂</i>' : "") + "</span>";
      }
      var crates = ex._pieces.map(function (p, j) {
        return '<span class="sp-crate' + (p === "" ? " empty" : "") + '"><b>' + (p === "" ? "''" : "'" + esc(p).replace(/ /g, "␣") + "'") + "</b><small>" + (p === "" ? "empty · " : "") + "[" + j + "]</small></span>";
      }).join("");
      stage.innerHTML = '<p class="sp-lab">THE TRAIN <span>' + ex.s.length + " carriages · ✂ marks a cut</span></p>" +
        '<div class="sp-row">' + cells + "</div>" +
        '<p class="sp-arrow"><code>' + esc(ex.sep == null ? ".split()" : ".split(" + JSON.stringify(ex.sep) + ")") + "</code> ↓</p>" +
        '<p class="sp-lab">THE CRATES <span>' + ex._pieces.length + " piece" + (ex._pieces.length === 1 ? "" : "s") + "</span></p>" +
        '<div class="sp-row">' + crates + "</div>" +
        '<p class="sp-real">Real Python prints: <code>' + esc(ex.expectLine) + "</code></p>";
      note.innerHTML = ex.note;
      if (live && announce) live.textContent = callText(ex) + " gives " + ex.expectLine + ". " + note.textContent;
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.examples.map(function (ex) { return "<tr><td><code>" + esc(callText(ex)) + "</code></td><td>" + ex._pieces.length + "</td><td><code>" + esc(ex.expectLine) + "</code></td><td>" + ex.note + "</td></tr>"; }).join("");
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) render(Number(b.getAttribute("data-i")), true); });
    render(0, false);
  }

  P.comic.ext(function () { initSpec(); initSplit(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
