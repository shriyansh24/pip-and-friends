/* Rust book, chapter 20 additions ("Backpacks and Conveyor Belts"). Classic deferred script; loads after comic-cast.js.
   1. closurepack: the closure's backpack (named distinctively: js-ch17.js and py-ch18.js have their own "backpack"), this chapter's picture of what a closure carries from home.
        <svg class="char" data-char="closurepack" data-state="notes" data-label="greet"></svg>
      data-state: "notes"  sticky notes with arrows pointing back home (captures by shared reference: Fn)
                  "pencil" the same notes plus a pencil (captures by mutable reference: FnMut)
                  "items"  the real things packed inside, a book and a key (move)
                  "empty"  open and empty, with a small dashed outline where the item was (FnOnce, after the call)
      data-label: the closure's name on a tag hanging under the bag (at most 9 characters; optional).
      State is shown by the drawing and a written word on the flap, never by colour alone.
      Like every cast member it is aria-hidden; pages add a .sr-only sentence when the picture carries meaning.
   2. [data-belt]: the conveyor belt. An iterator chain drawn as stations along a belt: the source shelf, each adapter
      as a station, and the consumer (the packer) at the end. Step through a real run: one item at a time travels the
      whole belt before the next one leaves the shelf, which is what "lazy" means.
      Model (JSON in <script id=...>):
        { "program": "lazy_belt.rs",
          "stations": [ { "label": "iter()", "sub": "the shelf" }, { "label": "map", "sub": "n * 10" },
                        { "label": "filter", "sub": "n > 15", "bin": true }, { "label": "take(2)" }, { "label": "collect", "packer": true } ],
          "steps": [ { "at": 1, "val": "10", "shelf": ["2","3","4"], "bin": [], "packed": [], "pull": false,
                       "tags": { "3": "1 of 2" }, "output": ["..."], "note": "HTML" } ] }
      "at" is the index of the station holding the moving item (null: no item on the belt); "val" is its value there.
      "shelf" lists the items not yet taken from the source; "bin" the items a filter dropped; "packed" what the packer holds.
      "pull": true draws the packer's "next?" request travelling back up the belt. "tags" replace a station's small text.
      Parity, exactly as the engine's tracer: the last step's screen must equal the captured run, and every step's screen
      must be a prefix of it. In addition, when a step adds lines to the screen, the moving item's value must appear in
      each new line, so the picture can't claim a value the program didn't print. Badge, and L.report on any problem.
      Keyboard: the engine's stepper (arrow keys, Space, R). Text version: a transcript table of every step.
      Layout: stations left to right when the widget is at least 600px wide, top to bottom below that, so text stays large. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch20.js loaded before comic.js"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, INK = "#111111";
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';

  /* ---------- 1. the backpack ---------- */
  L.cast.closurepack = {
    vb: "0 0 200 240",
    draw: function (el) {
      var st = el.getAttribute("data-state") || "notes", lab = (el.getAttribute("data-label") || "").slice(0, 9), o = '<g class="bob">';
      // straps behind the bag
      o += '<path d="M62 52 q-30 40 -18 120 M138 52 q30 40 18 120" fill="none"' + S(6) + "/>";
      // contents peeking out of the top (drawn before the bag so the bag overlaps them)
      if (st === "notes" || st === "pencil") {
        o += '<g transform="rotate(-10 78 40)"><rect x="58" y="18" width="40" height="40" rx="3" fill="#FFE7A3"' + S(3) + '/><path d="M66 30 h22 M66 38 h16" fill="none"' + S(2) + "/></g>";
        o += '<g transform="rotate(8 120 36)"><rect x="100" y="14" width="40" height="40" rx="3" fill="#FFE7A3"' + S(3) + '/><path d="M108 26 h22 M108 34 h14" fill="none"' + S(2) + "/></g>";
        // a dashed string from each note back home (off the picture to the left)
        o += '<path d="M60 30 q-30 -10 -52 6" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 5"/><path d="M8 36 l10 -8 M8 36 l12 4" fill="none"' + S(2.5) + "/>";
        if (st === "pencil") o += '<g transform="rotate(28 150 30)"><rect x="140" y="2" width="14" height="58" rx="2" fill="#FFD60A"' + S(3) + '/><path d="M140 60 l7 14 l7 -14 z" fill="#F4F1EA"' + S(3) + "/></g>";
      } else if (st === "items") {
        o += '<rect x="64" y="10" width="34" height="52" rx="3" fill="#DDE8FF"' + S(3) + '/><path d="M72 18 v38" fill="none"' + S(2) + "/>";
        o += '<circle cx="124" cy="30" r="14" fill="#FFC94A"' + S(3) + '/><circle cx="124" cy="30" r="6" fill="#FFFFFF"' + S(2) + '/><path d="M134 40 l14 16 l-6 4 l-4 -5 l-4 3" fill="#FFC94A"' + S(3) + "/>";
      } else if (st === "empty") {
        o += '<rect x="80" y="14" width="34" height="48" rx="3" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="6 5"/>';
      }
      // the bag
      o += '<path d="M40 70 q0 -26 30 -26 h60 q30 0 30 26 v108 q0 18 -18 18 h-84 q-18 0 -18 -18 z" fill="#E07A5F"' + S(4) + "/>";
      // the flap with a word on it (the state in words)
      var word = st === "items" ? "MOVE" : st === "pencil" ? "&MUT" : st === "empty" ? "USED" : "&";
      o += '<path d="M40 74 q0 -22 30 -22 h60 q30 0 30 22 v34 q-60 18 -120 0 z" fill="#F2A48C"' + S(4) + "/>";
      o += '<text x="100" y="96" text-anchor="middle" ' + MONO + ' font-size="24" fill="' + INK + '">' + word + "</text>";
      // a pocket with a tag
      o += '<rect x="66" y="132" width="68" height="44" rx="8" fill="#F2A48C"' + S(3) + "/>";
      // a face on the pocket: the backpack is a character
      o += '<g class="eyes"><circle cx="88" cy="150" r="3.4" fill="' + INK + '"/><circle cx="112" cy="150" r="3.4" fill="' + INK + '"/></g>';
      o += st === "empty" ? '<path d="M92 166 q8 -6 16 0" fill="none"' + S(3) + "/>" : '<path d="M92 160 q8 7 16 0" fill="none"' + S(3) + "/>";
      if (lab) {
        // the name tag hangs under the bag, so a long name fits inside the drawing; 20 units = 13px at the default width
        var w = Math.max(60, lab.length * 13 + 18);
        o += '<path d="M100 196 V206" fill="none"' + S(2.5) + "/>" +
          '<rect x="' + (100 - w / 2) + '" y="206" width="' + w + '" height="30" rx="5" fill="#FFF6CC"' + S(2.5) + "/>" +
          '<text x="100" y="228" text-anchor="middle" ' + MONO + ' font-size="20" fill="' + INK + '">' + esc(lab) + "</text>";
      }
      return o + "</g>";
    }
  };

  /* ---------- 2. the conveyor belt ---------- */
  function lines(o) { return (o || []).length ? o.join("\n") + "\n" : ""; }

  function check(m) {
    var q = L.program(m.program), why = [];
    if (!q) return ["missing capture"];
    var real = L.shown(q), last = m.steps[m.steps.length - 1];
    if (lines(last.output) !== real) why.push("last screen differs from the real output");
    var prev = 0;
    m.steps.forEach(function (s, i) {
      var o = s.output || [];
      if (real.indexOf(lines(o)) !== 0) why.push("step " + (i + 1) + " screen is not a prefix of the real output");
      if (s.at != null) {
        if (s.at < 0 || s.at >= m.stations.length) why.push("step " + (i + 1) + " names station " + s.at + ", which doesn't exist");
        for (var k = prev; k < o.length; k++) {
          if (s.val != null && !new RegExp("(^|[^0-9])" + String(s.val).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^0-9]|$)").test(o[k])) why.push("step " + (i + 1) + ": the item's value " + s.val + " is not in the new line '" + o[k] + "'");
        }
      }
      prev = o.length;
    });
    return why;
  }

  function token(x, y, val, w) {
    w = w || Math.max(52, String(val).length * 13 + 22);
    return '<g class="belt-item"><rect x="' + (x - w / 2) + '" y="' + (y - 21) + '" width="' + w + '" height="42" rx="8" fill="#FFE7A3"' + S(3.5) + "/>" +
      '<text class="bv" x="' + x + '" y="' + (y + 7) + '" text-anchor="middle">' + esc(val) + "</text></g>";
  }
  function chips(x, y, items, max, cls) {
    // a row of small boxes, one per value; "+n" when they don't fit
    var o = "", shown = items.slice(0, max), cx = x;
    shown.forEach(function (v) {
      var w = Math.max(34, String(v).length * 11 + 14);
      o += '<rect x="' + cx + '" y="' + (y - 15) + '" width="' + w + '" height="30" rx="5" fill="' + (cls === "bin" ? "#F4F1EA" : cls === "packed" ? "#C9F2D9" : "#FFFFFF") + '"' + (cls === "bin" ? ' stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 4"' : S(2.5)) + "/>" +
        '<text class="bc" x="' + (cx + w / 2) + '" y="' + (y + 6) + '" text-anchor="middle">' + esc(v) + "</text>";
      cx += w + 6;
    });
    if (items.length > max) o += '<text class="bc" x="' + cx + '" y="' + (y + 6) + '">+' + (items.length - max) + "</text>";
    if (!items.length) o += '<text class="bs" x="' + x + '" y="' + (y + 6) + '">empty</text>';
    return o;
  }

  function drawWide(m, s) {
    var n = m.stations.length, W = 760, gap = (W - 40) / n, o = "";
    var cx = function (i) { return 20 + gap * i + gap / 2; };
    // the belt with rollers
    o += '<rect x="10" y="214" width="' + (W - 20) + '" height="24" rx="12" fill="#D9D4C7"' + S(3.5) + "/>";
    for (var r = 0; r < 14; r++) o += '<circle cx="' + (30 + r * ((W - 60) / 13)) + '" cy="226" r="6" fill="#FFFFFF"' + S(2) + "/>";
    m.stations.forEach(function (st, i) {
      var x = cx(i), bw = gap - 14, hot = s.at === i;
      o += '<rect x="' + (x - bw / 2) + '" y="128" width="' + bw + '" height="82" rx="10" fill="' + (st.packer ? "#C9F2D9" : i === 0 ? "#DDE8FF" : "#FFFFFF") + '"' + S(hot ? 5 : 3.5) + (hot ? "" : "") + "/>";
      if (hot) o += '<rect x="' + (x - bw / 2 - 6) + '" y="122" width="' + (bw + 12) + '" height="94" rx="13" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="6 5"/>';
      o += '<text class="bl" x="' + x + '" y="160" text-anchor="middle">' + esc(st.label) + "</text>";
      var sub = (s.tags && s.tags[i] != null) ? s.tags[i] : st.sub || "";
      if (sub) o += '<text class="bs" x="' + x + '" y="190" text-anchor="middle">' + esc(sub) + "</text>";
      if (i > 0) o += '<path d="M' + (cx(i - 1) + (gap - 14) / 2 + 2) + ' 170 H' + (x - bw / 2 - 2) + '" fill="none"' + S(2.5) + "/>";
    });
    // the shelf above the source; the packed items above the packer
    o += '<text class="bs" x="' + (cx(0) - (gap - 14) / 2) + '" y="22">still on the shelf</text>' + chips(cx(0) - (gap - 14) / 2, 44, s.shelf || [], 4, "shelf");
    var pk = m.stations.length - 1;
    o += '<text class="bs" x="' + (cx(pk) + (gap - 14) / 2) + '" y="22" text-anchor="end">packed</text>' + chips(cx(pk) - (gap - 14) / 2, 44, s.packed || [], 3, "packed");
    // the bin under a filtering station
    m.stations.forEach(function (st, i) {
      if (!st.bin) return;
      var x = cx(i);
      o += '<path d="M' + (x - 50) + ' 252 h100 l-10 44 h-80 z" fill="#F4F1EA"' + S(3) + "/>" + '<text class="bs" x="' + (x - 62) + '" y="280" text-anchor="end">bin</text>' + chips(x - 40, 274, s.bin || [], 2, "bin");
    });
    // the packer's request travelling back up the belt
    if (s.pull) o += '<path class="belt-pull" d="M' + (cx(pk) - 10) + ' 108 H' + (cx(0) + 10) + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="9 7"/><path d="M' + (cx(0) + 10) + ' 108 l14 -8 M' + (cx(0) + 10) + ' 108 l14 8" fill="none"' + S(3) + '/><text class="bs" x="' + ((cx(0) + cx(pk)) / 2) + '" y="100" text-anchor="middle">next one, please?</text>';
    if (s.at != null) o += token(cx(s.at), s.pull ? 80 : 98, s.val);
    return { vb: "0 0 " + W + " 300", svg: o };
  }

  function drawNarrow(m, s) {
    var n = m.stations.length, row = 96, top = 70, W = 360, o = "";
    var cy = function (i) { return top + row * i + 40; };
    o += '<rect x="8" y="' + (top - 6) + '" width="22" height="' + (row * n) + '" rx="11" fill="#D9D4C7"' + S(3) + "/>";
    for (var r = 0; r < n * 3; r++) o += '<circle cx="19" cy="' + (top + 10 + r * (row * n - 30) / (n * 3 - 1)) + '" r="5" fill="#FFFFFF"' + S(2) + "/>";
    o += '<text class="bs" x="40" y="22">still on the shelf</text>' + chips(40, 44, s.shelf || [], 4, "shelf");
    m.stations.forEach(function (st, i) {
      var y = cy(i), hot = s.at === i;
      o += '<rect x="40" y="' + (y - 34) + '" width="170" height="68" rx="10" fill="' + (st.packer ? "#C9F2D9" : i === 0 ? "#DDE8FF" : "#FFFFFF") + '"' + S(hot ? 5 : 3.5) + "/>";
      if (hot) o += '<rect x="34" y="' + (y - 40) + '" width="182" height="80" rx="13" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="6 5"/>';
      o += '<text class="bl" x="125" y="' + (y - 4) + '" text-anchor="middle">' + esc(st.label) + "</text>";
      var sub = (s.tags && s.tags[i] != null) ? s.tags[i] : st.sub || "";
      if (sub) o += '<text class="bs" x="125" y="' + (y + 22) + '" text-anchor="middle">' + esc(sub) + "</text>";
      if (i > 0) o += '<path d="M125 ' + (cy(i - 1) + 36) + " V" + (y - 36) + '" fill="none"' + S(2.5) + "/>";
      if (st.bin) o += '<text class="bs" x="228" y="' + (y + 28) + '">bin</text>' + chips(262, y + 22, s.bin || [], 2, "bin");
      if (st.packer) o += '<text class="bs" x="228" y="' + (y - 12) + '">packed</text>' + chips(228, y + 16, s.packed || [], 3, "packed");
    });
    if (s.pull) o += '<path class="belt-pull" d="M340 ' + (cy(n - 1)) + " V" + (cy(0)) + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="9 7"/><path d="M340 ' + cy(0) + " l-8 14 M340 " + cy(0) + ' l8 14" fill="none"' + S(3) + '/><text class="bs" x="332" y="' + ((cy(0) + cy(n - 1)) / 2) + '" text-anchor="middle" transform="rotate(-90 332 ' + ((cy(0) + cy(n - 1)) / 2) + ')">next one, please?</text>';
    if (s.at != null) o += token(270, cy(s.at) - 6, s.val, 64);
    return { vb: "0 0 " + W + " " + (top + row * n + 10), svg: o };
  }

  function describe(m, s) {
    var where = s.at == null ? "no item on the belt" : "item " + s.val + " at " + m.stations[s.at].label;
    return where + "; shelf: " + ((s.shelf || []).join(", ") || "empty") + "; bin: " + ((s.bin || []).join(", ") || "empty") + "; packed: " + ((s.packed || []).join(", ") || "nothing");
  }

  function mount(box) {
    var id = box.getAttribute("data-belt"), el = document.getElementById(id);
    if (!el) { L.report("belt:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent);
    var svg = box.querySelector(".belt-svg"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody");
    var why = check(m), ok = !why.length;
    why.forEach(function (w) { L.report("belt:" + id, w + " (" + m.program + ")"); });
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var prevLen = 0;
    function render(st, announce) {
      var s = m.steps[st.step], wide = box.clientWidth >= 600, d = wide ? drawWide(m, s) : drawNarrow(m, s);
      svg.setAttribute("viewBox", d.vb);
      svg.classList.toggle("narrow", !wide);
      svg.innerHTML = d.svg;
      var o = s.output || [];
      out.innerHTML = o.length ? o.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + describe(m, s) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      var o = s.output || [];
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.at == null ? "(none)" : "<code>" + esc(s.val) + "</code> at " + esc(m.stations[s.at].label)) + "</td><td>" + s.note + "</td><td>" + esc(((s.shelf || []).join(", ")) || "empty") + " / " + esc(((s.bin || []).join(", ")) || "empty") + " / " + esc(((s.packed || []).join(", ")) || "nothing") + "</td><td><code>" + (o.length ? esc(o.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    var rn = L.runner(box, m.steps.length, render, { reserve: true });
    rn.reset(m.steps.length);
    var last = box.clientWidth >= 600;
    root.addEventListener("resize", function () { var w = box.clientWidth >= 600; if (w !== last) { last = w; render(rn.state(), false); } });
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-belt]");
    for (var i = 0; i < boxes.length; i++) { try { mount(boxes[i]); } catch (e) { L.report("belt", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
