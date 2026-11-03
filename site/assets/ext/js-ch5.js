/* JavaScript book, chapter 5 additions ("Doorkeepers and Translators"). Classic deferred script, loaded after
   comic-cast.js. Everything here is local to javascript/ch5.html:

   1. Cast. The drawings this chapter needs, registered before the engine draws the page:
        doorkeeper  NEW: the Doorkeeper of the truthy club. Navy usher's coat and cap, a clipboard with the list of
                    eight falsy faces, and a red velvet rope between two brass posts. data-rope="open" (rope unhooked,
                    arm waving the value in) or "closed" (rope across, palm up: not tonight). data-mood = happy, stern,
                    normal. Deliberately a different character from the Bouncer, who means ReferenceError in this book.
        translator  NEW: the Translator robot (type conversion and coercion). Teal body, dish ears, a phrasebook in one
                    hand, a chest screen showing data-label (at most 4 characters, e.g. "==", "+", "-").
                    data-mood = happy, focus, worried; data-arms = point (default), wave, down.
        emptytrain  the train creature (string) with no carriages: the empty string "".
   2. The door ([data-door]): pick a value, and the Doorkeeper lets it in (truthy) or turns it away (falsy). Every
      verdict is read from the captured run of the model's program, which prints one line per value: the value as
      written in the code, then Boolean(value). The parity badge checks that (a) each output line's value appears as
      Boolean(<that value>) on the same line of the source, and (b) this browser's own Boolean() agrees with Node on
      every value. A tally counts how many of the eight falsy faces the reader has found. A text version lists all. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch5.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, C = L.cast, INK = "#111111";
  function S(w) { return ' stroke="' + INK + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function mono(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + size + '" fill="' + INK + '">' + esc(t) + "</text>"; }
  function eyes(cx, cy, gap, mood) {
    if (mood === "stern") return '<g class="eyes"><path d="M' + (cx - gap - 6) + " " + (cy - 7) + " l11 4 M" + (cx + gap + 6) + " " + (cy - 7) + ' l-11 4" fill="none"' + S(3) + '/><circle cx="' + (cx - gap) + '" cy="' + (cy + 1) + '" r="3.2" fill="' + INK + '"/><circle cx="' + (cx + gap) + '" cy="' + (cy + 1) + '" r="3.2" fill="' + INK + '"/></g>';
    if (mood === "happy") return '<g class="eyes"><path d="M' + (cx - gap - 5) + " " + (cy + 1) + " q5 -7 10 0 M" + (cx + gap - 5) + " " + (cy + 1) + ' q5 -7 10 0" fill="none"' + S(3) + "/></g>";
    if (mood === "worried") return '<g class="eyes"><path d="M' + (cx - gap - 6) + " " + (cy - 9) + " l10 -3 M" + (cx + gap + 6) + " " + (cy - 9) + ' l-10 -3" fill="none"' + S(2.5) + '/><circle cx="' + (cx - gap) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/><circle cx="' + (cx + gap) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/></g>';
    return '<g class="eyes"><circle cx="' + (cx - gap) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/><circle cx="' + (cx + gap) + '" cy="' + cy + '" r="3.4" fill="' + INK + '"/></g>';
  }

  /* ---------- 1. cast ---------- */
  C.doorkeeper = { vb: "0 0 200 210", draw: function (el) {
    var open = el.getAttribute("data-rope") === "open", mood = el.getAttribute("data-mood") || (open ? "happy" : "normal");
    var coat = "#34407A", skin = "#B97A4E", gold = "#FFD60A", rope = "#D7263D";
    var mouth = mood === "stern" ? '<path d="M66 82 h18" fill="none"' + S(3.5) + "/>" : mood === "happy" ? '<path d="M64 79 q11 10 22 0" fill="none"' + S(3.5) + "/>" : '<path d="M66 81 q9 5 18 0" fill="none"' + S(3.5) + "/>";
    var out = '<g class="bob">';
    // posts and rope (drawn first, behind the arm)
    out += '<rect x="146" y="134" width="9" height="62" fill="#C98A00"' + S(3) + '/><ellipse cx="150.5" cy="198" rx="15" ry="5" fill="#C98A00"' + S(3) + '/><circle cx="150.5" cy="130" r="8" fill="' + gold + '"' + S(3) + "/>";
    out += '<rect x="182" y="134" width="9" height="62" fill="#C98A00"' + S(3) + '/><ellipse cx="186.5" cy="198" rx="12" ry="5" fill="#C98A00"' + S(3) + '/><circle cx="186.5" cy="130" r="8" fill="' + gold + '"' + S(3) + "/>";
    out += open ? '<path d="M157 134 q8 26 2 46" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/><path d="M157 134 q8 26 2 46" fill="none" stroke="' + rope + '" stroke-width="5" stroke-linecap="round"/><circle cx="159" cy="181" r="4" fill="' + gold + '"' + S(2.5) + "/>"
      : '<path d="M157 134 q14 22 26 0" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/><path d="M157 134 q14 22 26 0" fill="none" stroke="' + rope + '" stroke-width="5" stroke-linecap="round"/>';
    // legs, shoes, coat
    out += '<path d="M62 176 v20 M88 176 v20" fill="none" stroke="' + INK + '" stroke-width="11" stroke-linecap="round"/><path d="M48 199 h20 M84 199 h20" fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>';
    out += '<path d="M42 182 L48 108 Q75 94 102 108 L108 182 Z" fill="' + coat + '"' + S(4) + '/><path d="M75 104 V182" fill="none" stroke="' + gold + '" stroke-width="3"/><path d="M75 104 V182" fill="none"' + S(1.5) + "/>";
    out += '<circle cx="66" cy="126" r="3.5" fill="' + gold + '"' + S(2) + '/><circle cx="66" cy="146" r="3.5" fill="' + gold + '"' + S(2) + '/><circle cx="84" cy="126" r="3.5" fill="' + gold + '"' + S(2) + '/><circle cx="84" cy="146" r="3.5" fill="' + gold + '"' + S(2) + "/>";
    out += '<path d="M60 104 l15 14 l15 -14" fill="#FFFFFF"' + S(3) + "/>";
    // head and cap
    out += '<circle cx="75" cy="68" r="25" fill="' + skin + '"' + S(4) + "/>";
    out += '<path d="M48 52 Q50 28 75 28 Q100 28 102 52 Z" fill="' + coat + '"' + S(4) + '/><path d="M46 52 H108 Q106 60 96 58 H46 Z" fill="' + INK + '"' + S(2) + '/><rect x="69" y="34" width="12" height="11" rx="2" fill="' + gold + '"' + S(2.5) + "/>";
    out += eyes(75, 69, 9, mood) + mouth;
    // clipboard arm (viewer's left): the list of eight
    out += '<path d="M50 116 L34 150" fill="none" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/><path d="M50 116 L34 150" fill="none" stroke="' + coat + '" stroke-width="7" stroke-linecap="round"/>';
    out += '<rect x="6" y="122" width="40" height="54" rx="4" fill="#FFF6CC"' + S(3.5) + '/><rect x="18" y="117" width="16" height="9" rx="3" fill="#9AA3AE"' + S(2.5) + "/>";
    for (var i = 0; i < 8; i++) { var yy = 133 + i * 5.2; out += '<path d="M12 ' + yy + " h4 M20 " + yy + ' h20" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/>'; }
    out += '<circle cx="36" cy="156" r="7" fill="' + skin + '"' + S(3) + "/>";
    // the other arm: palm up (closed) or waving in toward the rope (open)
    out += open ? '<path d="M100 116 L132 128" fill="none" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/><path d="M100 116 L132 128" fill="none" stroke="' + coat + '" stroke-width="7" stroke-linecap="round"/><circle cx="138" cy="130" r="8" fill="' + skin + '"' + S(3) + '/><path d="M140 112 q8 4 10 12 M146 106 q10 6 12 16" fill="none"' + S(2.5) + "/>"
      : '<path d="M100 116 L120 88" fill="none" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/><path d="M100 116 L120 88" fill="none" stroke="' + coat + '" stroke-width="7" stroke-linecap="round"/><rect x="113" y="64" width="18" height="24" rx="8" fill="' + skin + '"' + S(3) + '/><path d="M117 70 v-6 M122 69 v-8 M127 70 v-6" fill="none"' + S(2) + "/>";
    return out + "</g>";
  } };

  C.translator = { vb: "0 0 170 200", draw: function (el) {
    var label = (el.getAttribute("data-label") || "A⇄1").slice(0, 4), mood = el.getAttribute("data-mood") || "happy", arms = el.getAttribute("data-arms") || "point";
    var body = "#7FE0D8", dark = "#2E8F88";
    var out = '<g class="bob">';
    // antenna with a tiny speech bubble
    out += '<path d="M85 30 V14" fill="none"' + S(3.5) + '/><circle cx="85" cy="11" r="5" fill="#FFD60A"' + S(3) + "/>";
    out += '<path d="M96 4 h26 q6 0 6 6 v8 q0 6 -6 6 h-14 l-7 6 l1 -6 h-6 q-6 0 -6 -6 v-8 q0 -6 6 -6 z" fill="#FFFFFF"' + S(2.5) + '/><path d="M101 14 h4 M108 14 h4 M115 14 h4" fill="none"' + S(2.5) + "/>";
    // dish ears with sound waves
    out += '<path d="M42 50 q-14 10 0 20" fill="#FFF6CC"' + S(3) + '/><path d="M128 50 q14 10 0 20" fill="#FFF6CC"' + S(3) + "/>";
    out += '<path d="M24 52 q-6 8 0 16 M150 52 q6 8 0 16" fill="none"' + S(2.5) + "/>";
    // head
    out += '<rect x="44" y="30" width="82" height="58" rx="16" fill="' + body + '"' + S(4) + '/><rect x="54" y="40" width="62" height="38" rx="10" fill="#FFFFFF"' + S(3) + "/>";
    out += eyes(85, 55, 12, mood);
    out += '<rect x="72" y="66" width="26" height="8" rx="3" fill="#FFFFFF"' + S(2.5) + '/><path d="M79 66 v8 M85 66 v8 M91 66 v8" fill="none"' + S(1.8) + "/>";
    // neck and body with chest screen
    out += '<rect x="76" y="88" width="18" height="10" fill="' + dark + '"' + S(3) + "/>";
    out += '<rect x="40" y="96" width="90" height="70" rx="12" fill="' + body + '"' + S(4) + '/><rect x="52" y="106" width="66" height="34" rx="6" fill="#FFFFFF"' + S(3) + "/>" + mono(85, 131, label, Math.min(26, Math.floor(56 / (0.62 * Math.max(label.length, 2)))));   // sized from the 66-unit plate, like the engine's machine plate: 3 characters draw at 26 units (about 14px on a phone cover), 4 at 22
    out += '<circle cx="62" cy="152" r="5" fill="#FFD60A"' + S(2.5) + '/><circle cx="78" cy="152" r="5" fill="#FF9F43"' + S(2.5) + '/><path d="M94 152 h22" fill="none"' + S(3) + "/>";
    // legs and feet
    out += '<path d="M66 166 v18 M104 166 v18" fill="none"' + S(9) + '/><rect x="50" y="182" width="30" height="12" rx="6" fill="' + dark + '"' + S(3) + '/><rect x="90" y="182" width="30" height="12" rx="6" fill="' + dark + '"' + S(3) + "/>";
    // left arm (viewer's left) holds the phrasebook
    out += '<path d="M42 108 L22 136" fill="none"' + S(8) + '/><rect x="2" y="128" width="34" height="40" rx="3" fill="#FF5A4E"' + S(3.5) + '/><path d="M8 128 v40" fill="none"' + S(2.5) + '/><rect x="12" y="138" width="20" height="16" rx="2" fill="#FFFFFF"' + S(2) + '/><path d="M15 143 h14 M15 149 h10" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/>';
    // right arm
    if (arms === "wave") out += '<path d="M128 108 L150 82" fill="none"' + S(8) + '/><circle cx="153" cy="78" r="8" fill="' + body + '"' + S(3) + "/>";
    else if (arms === "down") out += '<path d="M128 110 L140 146" fill="none"' + S(8) + '/><circle cx="141" cy="150" r="8" fill="' + body + '"' + S(3) + "/>";
    else out += '<path d="M128 112 L158 108" fill="none"' + S(8) + '/><circle cx="162" cy="107" r="7" fill="' + body + '"' + S(3) + "/>";
    return out + "</g>";
  } };

  C.emptytrain = { vb: "0 0 150 120", draw: function () {
    return '<g class="bob"><rect x="4" y="34" width="56" height="58" rx="8" fill="#FF5A4E"' + S(4) + '/><rect x="14" y="16" width="20" height="22" fill="#FF5A4E"' + S(4) + "/>" +
      '<rect x="16" y="46" width="30" height="22" rx="4" fill="#fff"' + S(3) + '/><circle cx="25" cy="54" r="2.6" fill="' + INK + '"/><circle cx="37" cy="54" r="2.6" fill="' + INK + '"/><path d="M27 62 q4 -3 8 0" fill="none"' + S(2.5) + "/>" +
      '<circle cx="20" cy="96" r="6" fill="' + INK + '"/><circle cx="46" cy="96" r="6" fill="' + INK + '"/>' +
      '<path d="M70 66 h72" fill="none" stroke="#2B2B2B" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>' + mono(106, 56, '""', 24) + "</g>";
  } };

  /* ---------- 2. the door ---------- */
  // The same values, built in this browser, so the page can check its own Boolean() against Node's.
  var VALUES = { "false": false, "0": 0, "-0": -0, "0n": typeof BigInt === "function" ? BigInt(0) : 0, '""': "", "null": null, "undefined": undefined, "NaN": NaN,
    "true": true, "42": 42, "-1": -1, '"hi"': "hi", '"false"': "false", '"0"': "0", '" "': " ", "[]": [], "{}": {}, "Infinity": Infinity };
  function mountDoor(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-door")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var src = prog.src.replace(/\n$/, "").split("\n");
    var rows = L.shown(prog).replace(/\n$/, "").split("\n").map(function (line, i) {
      var mm = /^(.*) (true|false)$/.exec(line);
      return mm ? { v: mm[1], truthy: mm[2] === "true", line: line, src: src[i] || "" } : { v: line, bad: true, src: src[i] || "" };
    });
    var problems = [];
    rows.forEach(function (r) {
      if (r.bad) { problems.push("unreadable output line: " + r.v); return; }
      if (r.src.indexOf("Boolean(" + r.v + ")") < 0) problems.push(r.v + " is not the value tested on its source line");
      if (!(r.v in VALUES)) problems.push(r.v + " has no browser twin");
      else if (Boolean(VALUES[r.v]) !== r.truthy) problems.push(r.v + ": this browser's Boolean() disagrees with Node");
    });
    if (rows.length !== src.length) problems.push("output has " + rows.length + " lines but the program has " + src.length);
    problems.forEach(function (p) { L.report("door", p); });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = problems.length ? problems.length + " value(s) do not match the real run" : "Every verdict matches the real run, and this browser agrees"; par.classList.toggle("bad", !!problems.length); }

    var chips = box.querySelector(".chips"), stage = box.querySelector(".door-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), tally = box.querySelector(".door-tally");
    var falsyTotal = rows.filter(function (r) { return !r.bad && !r.truthy; }).length, found = {};
    chips.innerHTML = '<span class="label">WHO IS AT THE DOOR?</span>' + rows.map(function (r, i) { return r.bad ? "" : '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(r.v) + "</code></button>"; }).join("");
    stage.innerHTML = '<div class="door-guest"><span class="k">VALUE</span><code class="gv"></code></div>' +
      '<svg class="char door-art" data-char="doorkeeper" data-rope="closed"></svg>' +
      '<div class="door-verdict"><span class="k">VERDICT</span><p class="dv"></p><p class="door-line"><code class="dl"></code></p></div>';
    var gv = stage.querySelector(".gv"), art = stage.querySelector(".door-art"), dv = stage.querySelector(".dv"), dl = stage.querySelector(".dl"), verdictBox = stage.querySelector(".door-verdict");
    function paintTally() { var n = Object.keys(found).length; tally.innerHTML = "Falsy faces found: <b>" + n + " / " + falsyTotal + "</b>" + (n === falsyTotal ? " — the whole list! Everyone else gets in." : ""); }
    function show(i, announce) {
      var r = rows[i];
      var bs = chips.querySelectorAll(".path-btn"); for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", String(bs[k].getAttribute("data-i") === String(i)));
      gv.textContent = r.v;
      art.setAttribute("data-rope", r.truthy ? "open" : "closed");
      art.setAttribute("data-mood", r.truthy ? "happy" : "stern");
      L.drawCast(stage);
      verdictBox.className = "door-verdict " + (r.truthy ? "in" : "out");
      dv.innerHTML = r.truthy ? "<b>✓ COME IN.</b> Truthy." : "<b>✗ NOT TONIGHT.</b> Falsy: it is on the list.";
      dl.textContent = "Boolean(" + r.v + ")  →  " + (r.truthy ? "true" : "false");
      note.innerHTML = (m.notes && m.notes[r.v]) || (r.truthy ? "Not on the list, so it gets in." : "One of the eight faces on the list.");
      stage.classList.remove("run"); void stage.offsetWidth; if (L.motionOn()) stage.classList.add("run");
      if (!r.truthy && announce) { found[r.v] = 1; paintTally(); }
      if (live && announce) live.textContent = r.v + ": " + (r.truthy ? "truthy, comes in." : "falsy, turned away.") + " Boolean gives " + (r.truthy ? "true" : "false") + ".";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    paintTally();
    var first = rows.findIndex(function (r) { return !r.bad; });
    if (first >= 0) show(first, false);
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = rows.filter(function (r) { return !r.bad; }).map(function (r) { return "<tr><td><code>" + esc(r.v) + "</code></td><td><code>" + esc(r.line) + "</code></td><td>" + (r.truthy ? "truthy: comes in" : "falsy: turned away") + "</td></tr>"; }).join("");
  }

  /* ---------- 3. values quoted inside hand-drawn pictures ---------- */
  // [data-line-of="prog.js#N"]: the element's text must equal line N of that program's real output (with data-tail:
  // the last space-separated word of that line, e.g. the value after "->"). A .parity[data-lines-badge] in the same
  // panel reports the result for every quoted value in that panel.
  function checkQuotes() {
    var bad = 0, byPanel = new Map();
    var els = document.querySelectorAll("[data-line-of]");
    for (var i = 0; i < els.length; i++) {
      var e = els[i], spec = e.getAttribute("data-line-of").split("#"), prog = L.program(spec[0]), ok = false;
      if (prog) {
        var line = (L.shown(prog).split("\n")[Number(spec[1]) - 1] || "");
        var want = e.hasAttribute("data-tail") ? line.split(" ").pop() : line;
        ok = e.textContent.trim() === want.trim();
      }
      if (!ok) { bad++; L.report("picture", "'" + e.textContent + "' does not match line " + spec[1] + " of " + spec[0]); }
      var panel = e.closest("section") || document.body, st = byPanel.get(panel) || { n: 0, bad: 0 };
      st.n++; if (!ok) st.bad++; byPanel.set(panel, st);
    }
    byPanel.forEach(function (st, panel) {
      var b = panel.querySelector(".parity[data-lines-badge]"); if (!b) return;
      b.textContent = st.bad ? st.bad + " value(s) in the picture do not match the real run" : "Every value in the picture matches a real run";
      b.classList.toggle("bad", !!st.bad);
    });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-door]");
    for (var i = 0; i < boxes.length; i++) { try { mountDoor(boxes[i]); } catch (e) { L.report("door", e.message); } }
    try { checkQuotes(); } catch (e) { L.report("picture", e.message); }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
