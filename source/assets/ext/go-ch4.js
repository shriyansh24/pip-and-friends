/* Go book, chapter 4 additions (classic deferred script; loads after comic-cast.js and comic-critters.js).
   1. (Specs, the go vet proof-reader, now comes from comic-critters.js.)
   2. [data-odo]: the odometer. A uint8 or int8 counter steps through a captured run, one printed line per step.
      A dial of 256 positions shows where the value sits (and where it wraps), eight switch wheels show its bits, and a
      readout shows the number. Each reading is predicted with Go's wrap-around rules and must equal the matching line
      of the real run (for uint8 the printed switches are checked too); a parity badge says so.
   3. [data-form]: the Printf form. One fmt.Printf call, read straight from the captured source, drawn as a form with a
      blank box for each verb. Arguments fill the blanks left to right, one per step, and jam with Go's real
      %!verb(type=value), %!verb(MISSING) and %!(EXTRA type=value) marks. The finished line must equal the matching
      line of the real run; a parity badge says so. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch4.js loaded before comic.js"); return; }
  var esc = L.esc;

  /* 1. Specs, the go vet proof-reader, comes from comic-critters.js. */

  function readModel(box, attr) {
    var id = box.getAttribute(attr), el = document.getElementById(id);
    if (!el) throw new Error("no model #" + id);
    return JSON.parse(el.textContent);
  }
  function setParity(par, ok, good) { if (!par) return; par.textContent = ok ? good : "Does not match the real run"; par.classList.toggle("bad", !ok); }

  /* ---------- 2. the odometer ---------- */
  var TYPES = { uint8: { min: 0, max: 255 }, int8: { min: -128, max: 127 } };
  function wrap(v, t) { var r = TYPES[t], n = r.max - r.min + 1; return ((v - r.min) % n + n) % n + r.min; }
  function pos(v) { return ((v % 256) + 256) % 256; }                       // the eight switches read as 0..255
  function bits(v) { var s = pos(v).toString(2); while (s.length < 8) s = "0" + s; return s; }

  function dialSvg(item) {
    var cx = 150, cy = 150, R = 112, out = "";
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 16) + '" class="od-rim"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" class="od-face"/>';
    for (var k = 0; k < 64; k++) {
      var a = k / 64 * 2 * Math.PI, big = k % 16 === 0, r1 = big ? R - 16 : R - 8;
      out += '<line class="od-tick' + (big ? " big" : "") + '" x1="' + (cx + Math.sin(a) * r1).toFixed(1) + '" y1="' + (cy - Math.cos(a) * r1).toFixed(1) + '" x2="' + (cx + Math.sin(a) * R).toFixed(1) + '" y2="' + (cy - Math.cos(a) * R).toFixed(1) + '"/>';
    }
    // labels: where each value sits on the same 256-position dial
    // [position, text, anchor]: the two values on either side of a seam sit side by side, anchored away from it
    var labs = item.type === "uint8"
      ? [[0, "0", "start"], [64, "64"], [128, "128"], [192, "192"], [256, "255", "end"]]
      : [[0, "0", "start"], [64, "64"], [128, "127", "end"], [128, "-128", "start"], [192, "-64"], [256, "-1", "end"]];
    labs.forEach(function (l) {
      var a = l[0] / 256 * 2 * Math.PI, r = R - 34, dx = l[2] === "start" ? 6 : l[2] === "end" ? -6 : 0;
      if (l[0] === 128 && item.type === "int8") dx = -dx;   // bottom: 127 just right of the seam (clockwise side), -128 just left
      out += '<text class="od-lab" x="' + (cx + Math.sin(a) * r + dx).toFixed(1) + '" y="' + (cy - Math.cos(a) * r + 6).toFixed(1) + '" text-anchor="' + (l[2] ? (l[0] === 128 && item.type === "int8" ? (l[2] === "end" ? "start" : "end") : l[2]) : "middle") + '">' + l[1] + "</text>";
    });
    // the seam where the counter wraps: top for uint8 (255 to 0), bottom for int8 (127 to -128)
    var seam = item.type === "uint8" ? 0 : 128, sa = seam / 256 * 2 * Math.PI;
    var sx1 = cx + Math.sin(sa) * (R - 22), sy1 = cy - Math.cos(sa) * (R - 22), sx2 = cx + Math.sin(sa) * (R + 16), sy2 = cy - Math.cos(sa) * (R + 16);
    out += '<line class="od-seam" x1="' + sx1.toFixed(1) + '" y1="' + sy1.toFixed(1) + '" x2="' + sx2.toFixed(1) + '" y2="' + sy2.toFixed(1) + '"/>';
    out += '<text class="od-seam-lab" x="' + cx + '" y="' + (seam === 0 ? 14 : 298) + '" text-anchor="middle">WRAP</text>';
    out += '<g class="od-trail"></g>';
    out += '<g class="od-hand"><path d="M150 150 L150 52" class="od-needle"/><path d="M142 64 L150 44 L158 64 z" class="od-tip"/></g>';
    out += '<circle cx="150" cy="150" r="10" class="od-hub"/>';
    return '<svg class="od-dial" viewBox="0 0 300 310" aria-hidden="true">' + out + "</svg>";
  }

  function mountOdo(box) {
    var m = readModel(box, "data-odo");
    var stage = box.querySelector(".odo-stage"), bar = box.querySelector(".paths"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody");
    var tabs = box.querySelectorAll("[data-odo-src]");
    m.items.forEach(function (it) {
      var prog = L.program(it.program); it._ok = !!prog; it.read = [];
      if (!prog) return;
      var lines = L.shown(prog).replace(/\n$/, "").split("\n");
      if (lines.length !== it.notes.length) { it._ok = false; L.report("odometer", it.program + ": " + it.notes.length + " notes for " + lines.length + " printed lines"); }
      lines.forEach(function (ln, k) {
        var want = wrap(it.start + k, it.type), mm = it.bits ? /^\s*(-?\d+) ([01]{8})$/.exec(ln) : /^\s*(-?\d+)$/.exec(ln);
        var ok = !!mm && Number(mm[1]) === want && (!it.bits || mm[2] === bits(want));
        if (!ok) { it._ok = false; L.report("odometer", it.program + " line " + (k + 1) + ": predicted " + want + (it.bits ? " " + bits(want) : "") + ", the real run printed " + ln); }
        it.read.push({ v: want, raw: ln, line: it.srcLines[k] });
      });
    });
    bar.insertAdjacentHTML("beforeend", m.items.map(function (it, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '">' + esc(it.label) + "</button>"; }).join(""));
    var cur = m.items[0];
    function drawStage() {
      var weights = cur.type === "int8" ? ["−128", "64", "32", "16", "8", "4", "2", "1"] : ["128", "64", "32", "16", "8", "4", "2", "1"];
      stage.innerHTML = '<div class="od-grid">' + dialSvg(cur) +
        '<div class="od-side"><p class="od-type"><code>' + esc(cur.decl) + '</code></p>' +
        '<div class="od-read" aria-hidden="true" data-now><span class="od-num"></span><small>printed value</small></div>' +
        '<p class="od-cap">8 switches (bits)</p><div class="od-wheels" aria-hidden="true">' +
        weights.map(function (w) { return '<span class="od-w"><b>0</b><small>' + w + "</small></span>"; }).join("") + "</div>" +
        '<p class="od-line"></p></div></div>';
      Array.prototype.forEach.call(tabs, function (t) { t.hidden = t.getAttribute("data-odo-src") !== cur.program; });
    }
    function render(st, announce) {
      var r = cur.read[st.step]; if (!r) return;
      var prev = st.step ? cur.read[st.step - 1] : null;
      var hand = stage.querySelector(".od-hand"), unwrapped = pos(cur.start) + st.step;
      hand.style.transform = "rotate(" + (unwrapped / 256 * 360).toFixed(2) + "deg)";
      var trail = "";
      for (var k = 0; k <= st.step; k++) {
        var a = (pos(cur.start) + k) / 256 * 2 * Math.PI;
        trail += '<circle class="od-dot' + (k === st.step ? " now" : "") + '" cx="' + (150 + Math.sin(a) * 124).toFixed(1) + '" cy="' + (150 - Math.cos(a) * 124).toFixed(1) + '" r="' + (k === st.step ? 7 : 5) + '"/>';
      }
      stage.querySelector(".od-trail").innerHTML = trail;
      stage.querySelector(".od-num").textContent = String(r.v);
      var b = bits(r.v), pb = prev ? bits(prev.v) : b, ws = stage.querySelectorAll(".od-w");
      for (var j = 0; j < 8; j++) {
        ws[j].querySelector("b").textContent = b.charAt(j);
        ws[j].classList.toggle("on", b.charAt(j) === "1");
        ws[j].classList.toggle("flip", !!prev && b.charAt(j) !== pb.charAt(j));
      }
      var wrapped = prev && ((cur.type === "uint8" && prev.v === 255) || (cur.type === "int8" && prev.v === 127));
      stage.querySelector(".od-line").innerHTML = 'Printed by line ' + r.line + ': <samp>' + esc(r.raw.trim()) + "</samp>" + (wrapped ? ' <span class="od-wrapped">WRAPPED</span>' : "");
      note.innerHTML = '<span class="count">Reading ' + (st.step + 1) + " of " + cur.read.length + "</span>" + cur.notes[st.step];
      if (live && announce) live.textContent = cur.label + ", reading " + (st.step + 1) + ": " + r.v + ", switches " + b + ". " + note.textContent.replace(/^Reading \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var q = 0; q < bs.length; q++) bs[q].setAttribute("aria-pressed", String(m.items[+bs[q].getAttribute("data-i")] === cur));
    }
    var rn = L.runner(box, cur.read.length || 1, render, { reserve: true });
    function choose(i) {
      cur = m.items[i];
      drawStage();
      setParity(par, cur._ok, "Every reading equals the real run");
      if (tb) tb.innerHTML = cur.read.map(function (r, k) { return "<tr><td>" + (k + 1) + "</td><td>" + r.line + "</td><td><samp>" + esc(r.raw.trim()) + "</samp></td><td><code>" + bits(r.v) + "</code></td><td>" + cur.notes[k] + "</td></tr>"; }).join("");
      rn.reset(cur.read.length || 1);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(+b.getAttribute("data-i")); if (live) live.textContent = "Counter chosen: " + b.textContent + "."; } });
    choose(0);
  }

  /* ---------- 3. the Printf form ---------- */
  function unq(s) { return s.replace(/\\(.)/g, function (_, c) { return c === "n" ? "\n" : c === "t" ? "\t" : c; }); }
  function parseCall(line) {
    var mm = /fmt\.Printf\("((?:[^"\\]|\\.)*)"(.*)\)\s*$/.exec(line);
    if (!mm) return null;
    var args = [], rest = mm[2].replace(/^\s*,\s*/, "");
    if (rest.trim()) rest.split(/\s*,\s*/).forEach(function (a) {
      if (/^".*"$/.test(a)) args.push({ src: a, v: unq(a.slice(1, -1)), t: "string" });
      else if (/^-?\d+$/.test(a)) args.push({ src: a, v: Number(a), t: "int" });
      else if (/^-?\d*\.\d+$/.test(a)) args.push({ src: a, v: Number(a), t: "float64" });
      else args.push({ src: a, v: a, t: "?" });
    });
    return { fmt: unq(mm[1]), fmtSrc: mm[1], args: args };
  }
  function tokens(f) {
    var out = [], lit = "", i = 0;
    function flush() { if (lit) { out.push({ lit: lit }); lit = ""; } }
    while (i < f.length) {
      var c = f.charAt(i);
      if (c === "%") {
        if (f.charAt(i + 1) === "%") { lit += "%"; i += 2; continue; }
        var mm = /^%([-+# 0]*)(\d*)(?:\.(\d+))?([a-zA-Z])/.exec(f.slice(i));
        if (!mm) { lit += c; i++; continue; }
        flush(); out.push({ verb: mm[4], flags: mm[1], width: mm[2] ? +mm[2] : 0, prec: mm[3] != null ? +mm[3] : null, text: mm[0] }); i += mm[0].length;
      } else if (c === "\n") { flush(); out.push({ nl: true }); i++; }
      else { lit += c; i++; }
    }
    flush();
    return out;
  }
  function pad(s, tk) {
    if (!tk.width || s.length >= tk.width) return s;
    var n = tk.width - s.length;
    if (tk.flags.indexOf("-") >= 0) return s + new Array(n + 1).join(" ");
    if (tk.flags.indexOf("0") >= 0 && /^-?[\d.]+$/.test(s)) { var neg = s.charAt(0) === "-"; return (neg ? "-" : "") + new Array(n + 1).join("0") + (neg ? s.slice(1) : s); }
    return new Array(n + 1).join(" ") + s;
  }
  function goVal(a) { return a.t === "float64" ? String(a.v) : String(a.v); }
  function fill(tk, a) {   // returns { text, jam }
    if (!a) return { text: "%!" + tk.verb + "(MISSING)", jam: "missing" };
    var v = tk.verb;
    if (v === "v") return { text: pad(goVal(a), tk) };
    if (v === "s" && a.t === "string") return { text: pad(a.v, tk) };
    if (v === "q" && a.t === "string") return { text: pad(JSON.stringify(a.v), tk) };
    if (v === "d" && a.t === "int") return { text: pad(String(a.v), tk) };
    if (v === "f" && a.t === "float64") return { text: pad(a.v.toFixed(tk.prec == null ? 6 : tk.prec), tk) };
    return { text: "%!" + v + "(" + a.t + "=" + goVal(a) + ")", jam: "wrong" };
  }
  function kindWord(t) { return t === "int" ? "a whole number (int)" : t === "float64" ? "a number with a point (float64)" : t === "string" ? "text (string)" : t; }
  function verbWord(v) { return { d: "a whole number", s: "text", f: "a number with a point", v: "any value", q: "text, to show in quotes" }[v] || "a value"; }

  function plan(call) {
    var tks = tokens(call.fmt), verbs = tks.filter(function (t) { return t.verb; }), steps = [];
    verbs.forEach(function (t, i) { t.n = i + 1; t.res = fill(t, call.args[i]); });
    steps.push({ filled: 0, extra: false, note: "An empty form. It has <b>" + verbs.length + "</b> blank" + (verbs.length === 1 ? "" : "s") + " and <b>" + call.args.length + "</b> argument" + (call.args.length === 1 ? "" : "s") + " waiting below. They will be matched left to right: blank 1 gets argument 1, and so on." });
    verbs.forEach(function (t, i) {
      var a = call.args[i], n;
      if (!a) n = "Blank " + t.n + " is <code>" + esc(t.text) + "</code>, but there are no arguments left. Go doesn't stop: it writes <samp>" + esc(t.res.text) + "</samp> in the blank.";
      else if (t.res.jam) n = "Blank " + t.n + " is <code>" + esc(t.text) + "</code>: it wants " + verbWord(t.verb) + ". Argument " + t.n + " is <code>" + esc(a.src) + "</code>, " + kindWord(a.t) + ". Wrong kind: Go writes <samp>" + esc(t.res.text) + "</samp>, which names the verb, the argument's type and its value.";
      else n = "Blank " + t.n + " is <code>" + esc(t.text) + "</code>: it wants " + verbWord(t.verb) + ". Argument " + t.n + " is <code>" + esc(a.src) + "</code>, " + kindWord(a.t) + ". It fits" + (t.width ? ", padded to " + t.width + " characters" + (t.flags.indexOf("-") >= 0 ? " on the right (the <code>-</code> flag)" : " on the left") : "") + (t.prec != null ? ", with " + t.prec + " digits after the point" : "") + ": <samp>" + esc(t.res.text) + "</samp>.";
      steps.push({ filled: i + 1, extra: false, note: n });
    });
    var extras = call.args.slice(verbs.length);
    var extraText = extras.length ? "%!(EXTRA " + extras.map(function (a) { return a.t + "=" + goVal(a); }).join(", ") + ")" : "";
    if (extras.length) steps.push({ filled: verbs.length, extra: true, note: "Every blank is full, but argument" + (extras.length > 1 ? "s " : " ") + extras.map(function (a) { return "<code>" + esc(a.src) + "</code>"; }).join(", ") + (extras.length > 1 ? " are" : " is") + " left over. Go adds <samp>" + esc(extraText) + "</samp> after the text, so you notice." });
    var line = "";
    tks.forEach(function (t) { if (t.lit) line += t.lit; else if (t.verb) line += t.res.text; });
    line += extraText;
    steps.push({ filled: verbs.length, extra: !!extras.length, done: true, note: "" });
    return { tks: tks, verbs: verbs, extras: extras, extraText: extraText, line: line, steps: steps, newline: tks.some(function (t) { return t.nl; }) };
  }

  function mountForm(box) {
    var m = readModel(box, "data-form");
    var prog = L.program(m.program); if (!prog) return;
    var src = prog.src.replace(/\n$/, "").split("\n"), out = L.shown(prog).replace(/\n$/, "").split("\n");
    var stage = box.querySelector(".form-stage"), bar = box.querySelector(".paths"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody");
    m.items.forEach(function (it) {
      var call = parseCall(src[it.src - 1] || "");
      if (!call) { it._ok = false; L.report("form", m.program + " line " + it.src + " is not a fmt.Printf call with a quoted format"); return; }
      it.call = call; it.p = plan(call); it.real = out[it.line - 1];
      it._ok = it.p.line === it.real;
      if (!it._ok) L.report("form", m.program + " line " + it.src + ": the form gives '" + it.p.line + "', the real run printed '" + it.real + "'");
      var last = it.p.steps[it.p.steps.length - 1];
      last.note = (it.p.verbs.some(function (t) { return t.res.jam; }) || it.p.extras.length ? "Finished, jams and all. The program still compiled and ran: these marks are printed, not reported as errors. " : "Finished. Every blank got the right kind of value. ") +
        (it.p.newline ? "The <code>\\n</code> at the end starts a new line. " : "There is no <code>\\n</code> in this format, so the next print would continue on the same line. ") +
        "This is exactly what line " + it.line + " of the real run printed.";
    });
    bar.insertAdjacentHTML("beforeend", m.items.map(function (it, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '">' + esc(it.label) + "</button>"; }).join(""));
    var cur = m.items[0];
    function render(st, announce) {
      if (!cur.p) return;
      var s = cur.p.steps[st.step], h = '<p class="fm-call"><span class="fm-k">line ' + cur.src + "</span> <code>" + L.highlight(src[cur.src - 1].trim()) + "</code></p>";
      h += '<div class="fm-sheet" role="img" aria-label="' + esc("The format string drawn as a form: " + cur.p.tks.map(function (t) { return t.lit ? t.lit : t.verb ? "[blank " + t.n + " " + t.text + "]" : "[new line]"; }).join("")) + '">';
      cur.p.tks.forEach(function (t) {
        if (t.lit) h += '<span class="fm-lit">' + esc(t.lit).replace(/ /g, "&nbsp;") + "</span>";
        else if (t.nl) h += '<span class="fm-nl" title="new line">\\n</span>';
        else {
          var full = t.n <= s.filled, cls = "fm-blank" + (full ? " full" : "") + (full && t.res.jam ? " jam" : "") + (t.n === s.filled && !s.extra && !s.done ? " now" : "");
          h += '<span class="' + cls + '"' + (/ now$/.test(cls) ? " data-now" : "") + '><span class="fm-tab">' + t.n + " · " + esc(t.text) + '</span><span class="fm-val">' + (full ? esc(t.res.text).replace(/ /g, "&nbsp;") : "&nbsp;") + "</span>" + (full && t.res.jam ? '<span class="fm-stamp">JAM</span>' : "") + "</span>";
        }
      });
      if (s.extra) h += '<span class="fm-blank full jam extra' + (s.done ? "" : " now") + '"><span class="fm-tab">no blank</span><span class="fm-val">' + esc(cur.p.extraText) + '</span><span class="fm-stamp">EXTRA</span></span>';
      h += "</div>";
      h += '<p class="fm-cap">Arguments, in order</p><ol class="fm-args">';
      cur.call.args.forEach(function (a, i) {
        var used = i < s.filled || (s.extra && i >= cur.p.verbs.length), spare = i >= cur.p.verbs.length;
        h += '<li class="fm-arg' + (used ? " used" : "") + (spare ? " spare" : "") + '"><b>' + (i + 1) + "</b><code>" + esc(a.src) + "</code><small>" + esc(a.t) + "</small>" + (used ? '<span class="fm-mark">' + (spare ? "left over" : "placed ✓") + "</span>" : "") + "</li>";
      });
      if (!cur.call.args.length) h += '<li class="fm-arg none">no arguments</li>';
      h += "</ol>";
      if (s.done) h += '<div class="fm-result"><p><b>The form prints</b></p><pre>' + esc(cur.p.line) + '</pre><p class="fm-real">' + (cur._ok ? "✓" : "✗") + " Real run, line " + cur.line + ": <samp>" + esc(cur.real) + "</samp></p></div>";
      stage.innerHTML = h;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.p.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var q = 0; q < bs.length; q++) bs[q].setAttribute("aria-pressed", String(m.items[+bs[q].getAttribute("data-i")] === cur));
    }
    var rn = L.runner(box, (cur.p && cur.p.steps.length) || 1, render, { reserve: true });
    function choose(i) {
      cur = m.items[i];
      setParity(par, cur._ok, "The finished form equals line " + cur.line + " of the real run");
      if (tb && cur.p) tb.innerHTML = cur.p.steps.map(function (s, k) { return "<tr><td>" + (k + 1) + "</td><td>" + s.note + "</td></tr>"; }).join("") + "<tr><td>Result</td><td><samp>" + esc(cur.p.line) + "</samp></td></tr>";
      rn.reset((cur.p && cur.p.steps.length) || 1);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(+b.getAttribute("data-i")); if (live) live.textContent = "Form chosen: " + b.textContent + "."; } });
    choose(0);
  }

  /* ---------- 4. the width ruler: printed fields drawn as character cells, straight from the captured output ---------- */
  function mountRuler(box) {
    var prog = L.program(box.getAttribute("data-ruler")); if (!prog) return;
    var out = L.shown(prog).replace(/\n$/, "").split("\n");
    var fmts = prog.src.split("\n").map(function (l) { var mm = /fmt\.Printf\("((?:[^"\\]|\\.)*)"/.exec(l); return mm && mm[1]; }).filter(Boolean);
    if (fmts.length !== out.length) { L.report("ruler", box.getAttribute("data-ruler") + ": " + fmts.length + " Printf lines for " + out.length + " printed lines"); return; }
    var rows = box.getAttribute("data-lines").split(",").map(Number), h = "";
    rows.forEach(function (n) {
      var line = out[n - 1], f = fmts[n - 1].replace(/\\n$/, ""), label = f.replace(/^\|/, "").replace(/\|$/, "");
      if (!/^\|.*\|$/.test(line)) { L.report("ruler", "line " + n + " is not a |field|"); return; }
      var cells = line.slice(1, -1), zero = /%0\d/.test(f), lead = true;
      h += '<div class="ruler-row"><code>' + esc(label) + '</code><span class="bar" aria-hidden="true">|</span>';
      for (var i = 0; i < cells.length; i++) {
        var c = cells.charAt(i), cls = c === " " ? "cell pad" : (zero && lead && c === "0" && i < cells.length - 1 && cells.charAt(i + 1) !== ".") ? "cell zero" : "cell";
        if (c !== " " && cls !== "cell zero") lead = false;
        h += '<span class="' + cls + '">' + (c === " " ? "&middot;" : esc(c)) + "</span>";
      }
      h += '<span class="bar" aria-hidden="true">|</span><span class="ruler-n">' + cells.length + " cells</span></div>";
    });
    box.innerHTML = h;
    box.setAttribute("aria-label", "Each printed field drawn as character cells, built from the real output: " + rows.map(function (n) { return fmts[n - 1].replace(/\\n$/, "") + " printed " + out[n - 1]; }).join("; ") + ". Dotted cells are padding spaces.");
  }

  P.comic.ext(function () {
    Array.prototype.forEach.call(document.querySelectorAll("[data-ruler]"), function (b) { try { mountRuler(b); } catch (e) { L.report("ruler", e.message); } });
    Array.prototype.forEach.call(document.querySelectorAll("[data-odo]"), function (b) { try { mountOdo(b); } catch (e) { L.report("odometer", e.message); } });
    Array.prototype.forEach.call(document.querySelectorAll("[data-form]"), function (b) { try { mountForm(b); } catch (e) { L.report("form", e.message); } });
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
