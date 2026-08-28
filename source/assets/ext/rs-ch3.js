/* Rust book, chapter 3 extension (Odometers and Speech Bubbles). Loads after comic-cast.js.
   Adds three things the shared engine does not have:
     1. chartile: the char creature, a letter tile that holds ONE character from any alphabet (or an emoji), with
        its "4 B" (4 bytes) tag. <svg class="char" data-char="chartile" data-label="λ"></svg>. The tag is a
        decorative plate (.lbl-deco): the engine hides it wherever the tile is drawn too small for 12px text.
     2. [data-lens]  the detective lens for compiler messages (same model as the Rust chapter 1 extension, copied
        here so this page stands alone): steps through a REAL captured error, highlighting its parts in reading
        order. Every highlight target is looked up in the captured stderr; a missing one turns the badge red.
     3. [data-ruler] the format ruler: each captured output line of a formatting program is drawn as a row of
        numbered cells, so padding, alignment and precision are visible character by character. The rows ARE the
        real stdout lines; the model only says which spec made each line, and that is checked against the source.
   (Earlier versions also lower-cased the lamp's label and renamed tracer boxes of kind char; the engine now does both.)
   Both widgets are keyboard-usable (buttons, and the engine's stepper keys for the lens) and have text versions. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] rs-ch3.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, C = L.cast, INK = "#111111";

  /* ---------- 1. the char tile creature (registered before the engine draws the cast) ---------- */
  C.chartile = { vb: "0 0 130 150", draw: function (el) {
    var t = Array.from(el.getAttribute("data-label") || "a")[0] || "a";
    return '<g class="bob">' +
      '<rect x="14" y="14" width="102" height="102" rx="14" fill="#FFF6CC"' + S(4) + "/>" +
      '<rect x="22" y="22" width="86" height="86" rx="9" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<circle cx="42" cy="38" r="3.4" fill="' + INK + '"/><circle cx="88" cy="38" r="3.4" fill="' + INK + '"/>' +
      '<path d="M56 44 q9 6 18 0" fill="none"' + S(3) + "/>" +
      '<text x="65" y="96" text-anchor="middle" font-family="JetBrains Mono, Noto Color Emoji, Segoe UI Emoji, sans-serif" font-weight="800" font-size="40" fill="' + INK + '">' + esc(t) + "</text>" +
      '<path d="M40 116 v14 M90 116 v14" fill="none"' + S(5) + '/><ellipse cx="38" cy="134" rx="10" ry="5" fill="' + INK + '"/><ellipse cx="92" cy="134" rx="10" ry="5" fill="' + INK + '"/>' +
      '<rect x="86" y="2" width="42" height="22" rx="4" fill="#C9F2D9"' + S(2.5) + "/>" +
      '<text class="lbl-deco" x="107" y="19" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">4 B</text>' +
      "</g>";
  } };

  /* ---------- 2. the detective lens ---------- */
  var ORDER = [["what", "1", "WHAT · first line"], ["where", "2", "WHERE · -->"], ["exact", "3", "EXACTLY · MARKS"], ["help", "4", "HELP · NOTE"], ["fix", "✓", "THE FIX"]];
  function kindOf(t) {
    if (/^error: could not compile/.test(t)) return "cargo";
    if (/^error: aborting due/.test(t)) return "abort";
    if (/^error(\[E\d{4}\])?: /.test(t)) return "head";
    if (/^\s*--> /.test(t)) return "loc";
    if (/^\s*\d+\s+\|/.test(t)) return "src";
    if (/^\s*\|\s*$/.test(t)) return "gutter";
    if (/^\s*\|/.test(t)) return "mark";
    if (/^\s*= note:/.test(t) || /^note:/.test(t)) return "note";
    if (/^help:/.test(t) || /^\s*= help:/.test(t)) return "help";
    if (/^For more information/.test(t)) return "explain";
    return t ? "err" : "blank";
  }
  function partsOf(q) {
    var meta = P.data.captures.meta || {}, st = q.steps ? q.steps[q.steps.length - 1] : null;
    var dir = (st && st.dir) || String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var lines = [{ t: "you@laptop:" + dir + "$ " + (st ? st.cmd : ""), k: "cmd" }], seen = {};
    var out = q.stdout.replace(/\n$/, ""), err = q.stderr.replace(/\n$/, "");
    if (out) out.split("\n").forEach(function (t) { lines.push({ t: t, k: "out" }); });
    if (err) err.split("\n").forEach(function (t) {
      var k = kindOf(t); seen[k] = (seen[k] || 0) + 1;
      lines.push({ t: t, k: k, n: seen[k], e: true });
    });
    return lines;
  }
  function hits(l, hl) {
    return hl.some(function (h) {
      if (h === "err") return !!l.e;
      var m = /^(\w+)#(\d+)$/.exec(h);
      return m ? l.k === m[1] && l.n === Number(m[2]) : l.k === h;
    });
  }
  function mountLens(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-lens")).textContent);
    var bar = box.querySelector(".paths"), pre = box.querySelector(".lens-term"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), strip = box.querySelector(".lens-order"), tb = box.querySelector(".transcript tbody");
    bar.insertAdjacentHTML("beforeend", m.cases.map(function (c) { return '<button type="button" class="path-btn bug" aria-pressed="false" data-case="' + c.id + '">' + esc(c.label) + "</button>"; }).join(""));
    strip.innerHTML = ORDER.map(function (o) { return '<li data-o="' + o[0] + '"><b>' + o[1] + "</b> " + o[2] + "</li>"; }).join("");
    var cur, lines, run;
    function check(c) {
      var q = L.program(c.program); if (!q) return false;
      var ls = partsOf(q), first = ls.filter(function (l) { return l.e && l.k !== "blank"; })[0];
      var ok = q.exit !== 0 && !!first && first.k === "head";
      if (!ok) L.report("lens:" + c.program, "the real run did not fail with a compiler error on its first line");
      c.steps.forEach(function (s, i) {
        (s.hl || []).forEach(function (h) {
          if (!ls.some(function (l) { return hits(l, [h]); })) { ok = false; L.report("lens:" + c.program, "step " + (i + 1) + " highlights '" + h + "' but the real message has no such line"); }
        });
      });
      if ("exit" in c && c.exit !== q.exit) { ok = false; L.report("lens:" + c.program, "expected exit " + c.exit + ", real exit " + q.exit); }
      return ok;
    }
    function shownLines(hl) { return lines.filter(function (l) { return hits(l, hl); }).map(function (l) { return l.t.trim(); }); }
    function render(st, announce) {
      var s = cur.steps[st.step], hl = s.hl || [];
      var first = true;   // the first highlighted line carries data-now, so on phones the engine scrolls it into view
      pre.innerHTML = lines.map(function (l) {
        var on = hits(l, hl), now = on && first; if (on) first = false;
        return '<span class="lens-ln' + (on ? " hit" : "") + (l.e ? " err" : "") + (l.k === "cmd" ? " cmd" : "") + '"' + (now ? " data-now" : "") + '><span class="lens-g" aria-hidden="true">' + (on ? "▶ " : "  ") + "</span>" + esc(l.t) + "</span>";
      }).join("\n");
      var lis = strip.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) { var here = lis[i].getAttribute("data-o") === s.clue; lis[i].classList.toggle("on", here); if (here) lis[i].setAttribute("aria-current", "step"); else lis[i].removeAttribute("aria-current"); }
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + (hl.length ? " Highlighted: " + shownLines(hl).join(" / ") : "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-case") === cur.id ? "true" : "false");
    }
    function choose(id) {
      cur = m.cases.filter(function (c) { return c.id === id; })[0] || m.cases[0];
      var q = L.program(cur.program); if (!q) return;
      lines = partsOf(q);
      var ok = check(cur);
      if (par) { par.textContent = ok ? "Real compiler message from " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      if (tb) tb.innerHTML = cur.steps.map(function (s, i) {
        var shown = shownLines(s.hl || []).map(esc).join("<br>");
        return "<tr><td>" + (i + 1) + "</td><td><code>" + (shown || "(none)") + "</code></td><td>" + s.note + "</td></tr>";
      }).join("");
      if (!run) run = L.runner(box, cur.steps.length, render);
      run.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-case")); if (live) live.textContent = "Case chosen: " + b.textContent + "."; } });
    choose(m.cases[0].id);
  }

  /* ---------- 3. the format ruler ---------- */
  /* Model: { program, rows: [{ spec, value, line, note }] }. `line` is the 1-based line of the program's real stdout.
     Checks: that stdout line exists, the program's source contains "[" + spec + "]", and the value appears in the line. */
  function mountRuler(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-ruler")).textContent);
    var q = L.program(m.program); if (!q) return;
    var out = L.shown(q).replace(/\n$/, "").split("\n");
    var chips = box.querySelector(".ruler-chips"), stage = box.querySelector(".ruler-stage"), note = box.querySelector(".narration");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody");
    var bad = [];
    m.rows.forEach(function (r) {
      var l = out[r.line - 1];
      if (l == null) bad.push(r.spec + ": no output line " + r.line);
      else if (l.indexOf(r.value) < 0) bad.push(r.spec + ": value " + r.value + " not in '" + l + "'");
      if (q.src.indexOf("[" + r.spec + "]") < 0) bad.push(r.spec + ": not in the source of " + m.program);
    });
    bad.forEach(function (b) { L.report("ruler:" + m.program, b); });
    if (par) { par.textContent = bad.length ? "Does not match the real run of " + m.program : "Every row is a real output line of " + m.program; par.classList.toggle("bad", !!bad.length); }
    function cellsOf(r) {
      var line = out[r.line - 1] || "", chars = Array.from(line), inner = chars.slice(1, -1).join("");
      var at = inner.indexOf(r.value), vs = Array.from(inner.slice(0, at)).length, ve = vs + Array.from(r.value).length;
      return chars.map(function (ch, i) {
        var kind = i === 0 || i === chars.length - 1 ? "edge" : (i - 1 >= vs && i - 1 < ve ? "val" : "pad");
        return { ch: ch, kind: kind };
      });
    }
    function words(r) {
      var cs = cellsOf(r), inner = cs.filter(function (c) { return c.kind !== "edge"; });
      var pads = inner.filter(function (c) { return c.kind === "pad"; });
      return inner.length + " characters between the brackets: " + (pads.length ? pads.length + " filler " + (pads.length === 1 ? "character" : "characters") + " (" + pads.map(function (c) { return c.ch === " " ? "space" : c.ch; }).join(", ") + ") and " : "") + "the value " + r.value + ".";
    }
    chips.insertAdjacentHTML("beforeend", m.rows.map(function (r, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(r.spec) + "</code></button>"; }).join(""));
    function show(i, announce) {
      var r = m.rows[i], cs = cellsOf(r);
      stage.innerHTML = '<p class="ruler-call"><code>println!("[' + esc(r.spec) + ']");</code> <span aria-hidden="true">→</span> <samp>' + esc(out[r.line - 1] || "") + "</samp></p>" +
        '<ol class="ruler-cells" aria-hidden="true">' + cs.map(function (c, k) {
          return '<li class="rc ' + c.kind + '"><span class="rc-ch">' + (c.ch === " " ? "·" : esc(c.ch)) + '</span><span class="rc-no">' + (c.kind === "edge" ? "" : k) + "</span></li>";
        }).join("") + "</ol>" +
        '<p class="ruler-key" aria-hidden="true"><span class="rc-k val">value</span><span class="rc-k pad">filler (· is a space)</span><span class="rc-k edge">bracket</span></p>';
      note.innerHTML = r.note + " <span class='sr-only'>" + esc(words(r)) + "</span>";
      var bs = chips.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(j === i));
      if (live && announce) live.textContent = r.spec + " prints " + (out[r.line - 1] || "") + ". " + words(r);
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) show(Number(b.getAttribute("data-i")), true); });
    if (tb) tb.innerHTML = m.rows.map(function (r) { return "<tr><td><code>" + esc(r.spec) + "</code></td><td><samp>" + esc(out[r.line - 1] || "") + "</samp></td><td>" + esc(words(r)) + " " + r.note + "</td></tr>"; }).join("");
    show(0, false);
  }

  P.comic.ext(function () {
    var b = document.querySelectorAll("[data-lens]");
    for (var j = 0; j < b.length; j++) { try { mountLens(b[j]); } catch (e) { L.report("lens", e.message); } }
    var r = document.querySelectorAll("[data-ruler]");
    for (var k = 0; k < r.length; k++) { try { mountRuler(r[k]); } catch (e) { L.report("ruler", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
