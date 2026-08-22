/* Chapter 25 extension: "Stencils and Codebooks" (regular expressions, text versus bytes).
   Adds, registered with the comic engine:
   (1) cast: restencil a plastic stencil sheet with a face and a cut-out window; data-label = the pattern cut into it.
             byterow   a row of byte boxes (the "codebook" drawing for bytes): data-bytes = hex bytes separated by spaces
                       (<= 10), each box numbered with its index underneath; optional data-label above the row.
   (2) [data-stencil]  the regex walker: a stencil slides along a real string. Every step is one line of the program's
                       captured output ("try N: no" / "try N: fits 'X'"), so the positions come from Python, not from
                       JavaScript's own regex engine. Parity: the final screen equals the real output; every fit's text
                       equals the string's characters at that position; the matches collected along the way, written as
                       a Python list, equal the program's last line (its real findall result); the model's text occurs in
                       the program source.
   (3) [data-codebook] the codebook stepper: one character at a time becomes its code point and its UTF-8 bytes, read from
                       the program's output lines ("C U+XXXX hh hh"). Parity: the screen rule above; every printed code
                       point and byte list agrees with the browser's own String.codePointAt and TextEncoder; all the bytes
                       joined equal the program's final bytes line.
   (4) [data-cprow]    code-point rows: each matching output line ("LABEL U+XXXX U+YYYY" or "TEXT LEN BYTES U+XXXX ...")
                       drawn as a row of carriages, one per code point, with names from an optional second program
                       ("U+XXXX NAME" lines). Parity: printed lengths and byte counts agree with the carriages and with
                       TextEncoder; mode "nfc" also checks the rows against the browser's String.normalize and against
                       the program's "len len" line.
   Steppers use the engine's runner (Back / Next / Play / Reset, arrow keys, aria-disabled, aria-live) and fill a
   text-version table. States are told apart by border style, marks and words, never by colour alone. Problems are
   reported with L.report, which the page checker treats as a failure. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch25.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  function model(id) { var el = document.getElementById(id); if (!el) throw new Error("missing model " + id); return JSON.parse(el.textContent); }
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  function txt(x, y, t, size, extra) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (size || 16) + '" fill="' + INK + '"' + (extra || "") + ">" + esc(t) + "</text>"; }
  function cps(s) { return Array.from(s); }
  function hex2(n) { return (n < 16 ? "0" : "") + n.toString(16); }
  function utf8(s) { return Array.prototype.slice.call(new TextEncoder().encode(s)); }

  /* ---------------- cast: the stencil ---------------- */
  C.restencil = { vb: "0 0 220 150", draw: function (el) {
    var label = (el.getAttribute("data-label") || "\\d+").slice(0, 9);
    var fs = label.length > 6 ? 17 : 22, w = Math.max(70, label.length * (fs * 0.62) + 26);
    var x = 118 - w / 2;
    return '<g class="bob">' +
      '<rect x="14" y="16" width="192" height="110" rx="18" fill="#DDE8FF"' + S(4) + "/>" +
      '<circle cx="36" cy="38" r="8" fill="#FFFFFF"' + S(3) + "/>" +
      '<rect x="' + x + '" y="58" width="' + w + '" height="44" rx="8" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="7 5"/>' +
      txt(118, 88, label, fs) +
      '<g class="eyes">' + dot(98, 36, 4.5) + dot(138, 36, 4.5) + "</g>" +
      '<path d="M108 46 q10 7 20 0" fill="none"' + S(3) + "/>" +
      '<path d="M14 140 q60 -10 96 0 q36 10 96 0" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="4 6"/></g>';
  } };

  /* ---------------- cast: a row of byte boxes ---------------- */
  function byteTokens(el) { return (el.getAttribute("data-bytes") || "63 61 74").trim().split(/\s+/).slice(0, 10); }
  C.byterow = {
    vb: function (el) { var n = byteTokens(el).length, lab = el.getAttribute("data-label"); return "0 0 " + (12 + n * 50) + " " + (lab ? 104 : 80); },
    draw: function (el) {
      var t = byteTokens(el), lab = el.getAttribute("data-label"), top = lab ? 26 : 4, out = "";
      if (lab) out += txt((12 + t.length * 50) / 2, 18, lab, 15);
      t.forEach(function (b, i) {
        var x = 8 + i * 50;
        out += '<rect x="' + x + '" y="' + top + '" width="44" height="44" rx="6" fill="#FFF6CC"' + S(3) + "/>" +
          txt(x + 22, top + 29, b, 17) +
          '<text x="' + (x + 22) + '" y="' + (top + 66) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="15" fill="#2B2B2B">' + i + "</text>";   // index at 15 units: 12.6px at 220px for 5 bytes (it was 13, 10.9px)
      });
      return out;
    }
  };

  /* ---------------- shared stepper helpers ---------------- */
  function realLines(name) { var q = L.program(name); if (!q) return null; return L.shown(q).replace(/\n$/, "").split("\n"); }
  function screenHtml(out, prevLen, announce) {
    return out.length ? out.map(function (l, i) { return '<span class="' + (i >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
  }
  function screenParity(name, steps, where) {
    var q = L.program(name); if (!q) return false;
    var real = L.shown(q), lines = real.replace(/\n$/, "").split("\n"), last = steps[steps.length - 1].output;
    var ok = (last.length ? last.join("\n") + "\n" : "") === real;
    steps.forEach(function (s, i) { s.output.forEach(function (l, k) { if (lines[k] !== l) { ok = false; L.report(where, "step " + (i + 1) + " screen line " + (k + 1) + " is not in the real run of " + name); } }); });
    if (!ok) L.report(where, "final screen does not match the real run of " + name);
    return ok;
  }
  function setParity(box, ok, text) { var par = box.querySelector(".parity"); if (par) { par.textContent = ok ? text : "Does not match the real run"; par.classList.toggle("bad", !ok); } }
  function pyRepr(s) { return s.indexOf("'") >= 0 && s.indexOf('"') < 0 ? '"' + s + '"' : "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"; }
  function charWord(c) { return c === " " ? "a space" : "<code>" + esc(c) + "</code>"; }

  /* ---------------- (2) the stencil walker ---------------- */
  /* Model: { program, text, pattern } */
  function mountStencil(box) {
    var m = model(box.getAttribute("data-stencil")), lines = realLines(m.program);
    if (!lines) return;
    var prog = L.program(m.program), ok = true, text = m.text, chars = cps(text);
    if (prog.src.indexOf('"' + text + '"') < 0) { ok = false; L.report("stencil", "the text " + text + " is not in " + m.program); }
    var tries = [], found = [], k;
    for (k = 0; k < lines.length; k++) {
      var t = /^try (\d+): (no|fits '(.*)')$/.exec(lines[k]);
      if (!t) break;
      var tr = { pos: +t[1], fit: t[2] !== "no", text: t[3] || "" };
      if (tr.fit) {
        if (chars.slice(tr.pos, tr.pos + cps(tr.text).length).join("") !== tr.text) { ok = false; L.report("stencil", "line " + (k + 1) + ": '" + tr.text + "' is not at position " + tr.pos); }
        found.push(tr);
      }
      tries.push(tr);
    }
    var listLine = "[" + found.map(function (f) { return pyRepr(f.text); }).join(", ") + "]";
    if (lines[k] !== listLine || k !== lines.length - 1) { ok = false; L.report("stencil", "the matches collected, " + listLine + ", are not the program's last line " + lines[lines.length - 1]); }
    var steps = [{ upto: -1, output: [] }];
    tries.forEach(function (tr, i) { steps.push({ upto: i, output: lines.slice(0, i + 1) }); });
    steps.push({ upto: tries.length, output: lines.slice() });
    ok = screenParity(m.program, steps, "stencil") && ok;
    setParity(box, ok, "Every position comes from the real run of " + m.program);

    var cellsBox = box.querySelector(".sw-cells"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    cellsBox.innerHTML = chars.map(function (c, i) {
      return '<div class="sw-cell" data-i="' + i + '"><span class="sw-ch">' + (c === " " ? '<span class="sw-sp" aria-hidden="true">␣</span>' : esc(c)) + '</span><span class="sw-ix">' + i + '</span><span class="sw-tag"></span></div>';
    }).join("");
    var cells = cellsBox.querySelectorAll(".sw-cell");
    function describe(st) {
      if (st.upto < 0) return "The stencil <code>" + esc(m.pattern) + "</code> waits at the left edge. Nothing tried yet.";
      if (st.upto >= tries.length) return "The stencil ran off the end of the text. Every spot was tried, and the matches it found, in order, are exactly the list <code>findall</code> prints: <samp>" + esc(listLine) + "</samp>.";
      var tr = tries[st.upto];
      if (tr.fit) {
        var end = tr.pos + cps(tr.text).length;
        return "Try position " + tr.pos + ": it <b>fits</b>! <code>\\d+</code> takes <samp>" + esc(tr.text) + "</samp>, every digit in a row (positions " + tr.pos + " to " + (end - 1) + "). The search carries on from position " + end + ", just after the match.";
      }
      return "Try position " + tr.pos + ": " + charWord(chars[tr.pos]) + " is not a digit, so the stencil <b>doesn't fit</b> here. Slide one step right.";
    }
    var prevLen = 0;
    function render(si, announce) {
      var st = steps[si.step], doneFits = {};
      found.forEach(function (f, n) { if (tries.indexOf(f) <= st.upto) for (var j = f.pos; j < f.pos + cps(f.text).length; j++) doneFits[j] = n + 1; });
      var cur = st.upto >= 0 && st.upto < tries.length ? tries[st.upto] : null;
      for (var i = 0; i < cells.length; i++) {
        var inWin = cur && i >= cur.pos && i < cur.pos + (cur.fit ? cps(cur.text).length : 1);
        cells[i].className = "sw-cell" + (doneFits[i] ? " found" : "") + (inWin ? (cur.fit ? " win fit" : " win miss") : "");
        if (inWin && i === cur.pos) cells[i].setAttribute("data-now", ""); else cells[i].removeAttribute("data-now");
        var tag = cells[i].querySelector(".sw-tag");
        tag.textContent = inWin ? (cur.fit ? "✓" : "✗") : (doneFits[i] && (i === 0 || doneFits[i - 1] !== doneFits[i]) ? "#" + doneFits[i] : "");
      }
      out.innerHTML = screenHtml(st.output, prevLen, announce); prevLen = st.output.length;
      note.innerHTML = '<span class="count">Step ' + (si.step + 1) + " of " + steps.length + "</span>" + describe(st);
      if (live && announce) live.textContent = "Step " + (si.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (st, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + describe(st) + "</td><td><code>" + (st.output.length ? esc(st.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  /* ---------------- (3) the codebook stepper ---------------- */
  /* Model: { program } printing "C U+XXXX hh hh ..." per character, then the whole bytes object. */
  function parseBytesRepr(s) {
    var mm = /^b'(.*)'$/.exec(s); if (!mm) return null;
    var body = mm[1], out = [], i = 0;
    while (i < body.length) {
      if (body[i] === "\\" && body[i + 1] === "x") { out.push(parseInt(body.substr(i + 2, 2), 16)); i += 4; }
      else if (body[i] === "\\") { out.push({ n: 10, t: 9, r: 13, "\\": 92, "'": 39 }[body[i + 1]]); i += 2; }
      else { out.push(body.charCodeAt(i)); i += 1; }
    }
    return out;
  }
  var BYTE_WORD = ["", "fits in <b>one byte</b>, exactly as in plain old ASCII", "is too big for one byte, so UTF-8 uses <b>2 bytes</b>", "needs <b>3 bytes</b>", "needs <b>4 bytes</b>, the most UTF-8 ever uses"];
  function mountCodebook(box) {
    var m = model(box.getAttribute("data-codebook")), lines = realLines(m.program);
    if (!lines) return;
    var ok = true, cols = [], k;
    for (k = 0; k < lines.length; k++) {
      var mm = /^(.+) U\+([0-9A-F]{4,6}) ((?:[0-9a-f]{2} ?)+)$/.exec(lines[k]);
      if (!mm) break;
      var ch = mm[1], code = parseInt(mm[2], 16), bytes = mm[3].trim().split(" ").map(function (h) { return parseInt(h, 16); });
      if (ch.codePointAt(0) !== code || cps(ch).length !== 1) { ok = false; L.report("codebook", "line " + (k + 1) + ": " + ch + " is not U+" + mm[2]); }
      if (utf8(ch).join(",") !== bytes.join(",")) { ok = false; L.report("codebook", "line " + (k + 1) + ": the browser's UTF-8 for " + ch + " differs"); }
      cols.push({ ch: ch, code: mm[2], dec: code, bytes: bytes });
    }
    var all = parseBytesRepr(lines[k] || "");
    var joined = [].concat.apply([], cols.map(function (c) { return c.bytes; }));
    if (!all || all.join(",") !== joined.join(",") || k !== lines.length - 1) { ok = false; L.report("codebook", "the bytes of each character, joined, are not the program's final bytes line"); }
    var steps = [{ upto: 0, output: [] }];
    cols.forEach(function (c, i) { steps.push({ upto: i + 1, output: lines.slice(0, i + 1) }); });
    steps.push({ upto: cols.length, output: lines.slice(), whole: true });
    ok = screenParity(m.program, steps, "codebook") && ok;
    setParity(box, ok, "Matches the real run of " + m.program + " and the browser's own UTF-8");
    var stage = box.querySelector(".cb-stage"), out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    stage.innerHTML = cols.map(function (c, i) {
      return '<div class="cb-col" data-i="' + i + '"><div class="cb-car"><span class="cb-ch">' + esc(c.ch) + '</span><code class="cb-cp">U+' + c.code + '</code></div>' +
        '<span class="cb-arrow" aria-hidden="true">↓</span><div class="cb-bytes">' +
        c.bytes.map(function (b) { return '<span class="cb-byte"><b>' + hex2(b) + "</b></span>"; }).join("") + "</div>" +
        '<span class="cb-count"></span></div>';
    }).join("");
    var colEls = stage.querySelectorAll(".cb-col");
    function describe(st) {
      if (st.upto === 0) return "Four characters, each with its code point from the Unicode table (Chapter 11). None of them has gone through the codebook yet.";
      if (st.whole) return "Glued together, the four characters make <b>" + joined.length + " bytes</b>. Python shows the bytes it can as ASCII letters (<samp>A</samp>) and writes every other byte as <samp>\\x</samp> plus two hex digits. Same message, now ready for the wire.";
      var c = cols[st.upto - 1];
      return "<code>" + esc(c.ch) + "</code> is code point U+" + c.code + " (" + c.dec + " in everyday numbers). It " + BYTE_WORD[c.bytes.length] + ": <samp>" + c.bytes.map(hex2).join(" ") + "</samp>.";
    }
    var prevLen = 0;
    function render(si, announce) {
      var st = steps[si.step];
      for (var i = 0; i < colEls.length; i++) {
        var done = i < st.upto, now = i === st.upto - 1 && !st.whole;
        colEls[i].className = "cb-col" + (done ? " done" : " todo") + (now ? " now" : "") + (st.whole ? " whole" : "");
        if (now) colEls[i].setAttribute("data-now", ""); else colEls[i].removeAttribute("data-now");
        colEls[i].querySelector(".cb-count").textContent = done ? cols[i].bytes.length + (cols[i].bytes.length === 1 ? " byte" : " bytes") : "not yet";
      }
      out.innerHTML = screenHtml(st.output, prevLen, announce); prevLen = st.output.length;
      note.innerHTML = '<span class="count">Step ' + (si.step + 1) + " of " + steps.length + "</span>" + describe(st);
      if (live && announce) live.textContent = "Step " + (si.step + 1) + " of " + steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = steps.map(function (st, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + describe(st) + "</td><td><code>" + (st.output.length ? esc(st.output.join(" / ")) : "(nothing)") + "</code></td></tr>";
    }).join("");
    L.runner(box, steps.length, render, { reserve: true }).reset(steps.length);
  }

  /* ---------------- (4) code-point rows ---------------- */
  /* Model: { program, match (regex source for the row lines), names?: program printing "U+XXXX NAME", mode?: "nfc" } */
  function glyph(cp) {
    var c = String.fromCodePoint(cp);
    if (cp >= 0x300 && cp <= 0x36F) return "◌" + c;   // a combining mark is drawn on a dotted circle, the usual convention
    if (cp === 0x200D) return "ZWJ";
    return c;
  }
  function mountCpRow(box) {
    var m = model(box.getAttribute("data-cprow")), lines = realLines(m.program);
    if (!lines) return;
    var ok = true, re = new RegExp(m.match), names = {};
    if (m.names) (realLines(m.names) || []).forEach(function (l) { var mm = /^U\+([0-9A-F]{4,6}) (.+)$/.exec(l); if (mm) names[mm[1]] = mm[2]; });
    var rows = lines.filter(function (l) { return re.test(l); }).map(function (l) {
      var tok = l.split(" "), codes = tok.filter(function (t) { return /^U\+[0-9A-F]{4,6}$/.test(t); });
      var nums = tok.slice(1, tok.length - codes.length).map(Number);
      var row = { label: tok[0], codes: codes.map(function (t) { return t.slice(2); }), nums: nums, line: l };
      var s = row.codes.map(function (h) { return String.fromCodePoint(parseInt(h, 16)); }).join("");
      row.text = s;
      if (nums.length >= 1 && nums[0] !== row.codes.length) { ok = false; L.report("cprow", l + ": len says " + nums[0] + " but " + row.codes.length + " code points are listed"); }
      if (nums.length >= 2 && nums[1] !== utf8(s).length) { ok = false; L.report("cprow", l + ": " + nums[1] + " bytes, but the browser's UTF-8 has " + utf8(s).length); }
      if (nums.length && row.label !== s) { ok = false; L.report("cprow", l + ": the code points do not spell " + row.label); }
      return row;
    });
    if (!rows.length) { ok = false; L.report("cprow", "no row lines in " + m.program); }
    if (m.mode === "nfc" && rows.length === 2) {
      if (rows[0].text !== rows[1].text.normalize("NFC") || rows[1].text !== rows[0].text.normalize("NFD")) { ok = false; L.report("cprow", "the NFC and NFD rows are not each other's normal forms"); }
      if (lines.indexOf(rows[0].codes.length + " " + rows[1].codes.length) < 0) { ok = false; L.report("cprow", "the program's len line does not match the rows"); }
    }
    setParity(box, ok, "Built from the real run of " + m.program + (m.names ? " and " + m.names : ""));
    var stage = box.querySelector(".cp-rows");
    stage.innerHTML = rows.map(function (r) {
      return '<div class="cp-row"><p class="cp-label">' + (r.nums.length ? '<span class="cp-big">' + esc(r.label) + "</span>" : "<b>" + esc(r.label) + "</b>") +
        '<span class="cp-n">' + r.codes.length + (r.codes.length === 1 ? " code point" : " code points") + (r.nums.length >= 2 ? " · " + r.nums[1] + " bytes" : "") + "</span></p>" +
        '<ol class="cp-cars">' + r.codes.map(function (h, i) {
          var cp = parseInt(h, 16);
          return '<li class="cp-car' + ((cp >= 0x300 && cp <= 0x36F) || cp === 0x200D || (cp >= 0x1F3FB && cp <= 0x1F3FF) ? " joiner" : "") + '"><span class="cp-g" aria-hidden="true">' + esc(glyph(cp)) + '</span><code>U+' + h + "</code>" +
            (names[h] ? '<small>' + esc(names[h].toLowerCase()) + "</small>" : "") + '<span class="cp-i">' + i + "</span></li>";
        }).join("") + "</ol></div>";
    }).join("");
    var sr = box.querySelector(".cp-sr");
    if (sr) sr.textContent = rows.map(function (r) { return r.label + ": " + r.codes.length + " code points, " + r.codes.map(function (h) { return "U+" + h + (names[h] ? " " + names[h].toLowerCase() : ""); }).join(", ") + (r.nums.length >= 2 ? "; " + r.nums[1] + " bytes in UTF-8" : "") + "."; }).join(" ");
  }

  P.comic.ext(function () {
    var i, b;
    b = document.querySelectorAll("[data-stencil]"); for (i = 0; i < b.length; i++) { try { mountStencil(b[i]); } catch (e) { L.report("stencil", e.message); } }
    b = document.querySelectorAll("[data-codebook]"); for (i = 0; i < b.length; i++) { try { mountCodebook(b[i]); } catch (e) { L.report("codebook", e.message); } }
    b = document.querySelectorAll("[data-cprow]"); for (i = 0; i < b.length; i++) { try { mountCpRow(b[i]); } catch (e) { L.report("cprow", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
