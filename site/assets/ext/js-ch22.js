/* JavaScript book, chapter 22 additions ("Stencils and Emoji"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch22.html.

   data-char="bookshelf"  Unicode as a library shelf. Every shelf slot holds one UTF-16 code unit (its hex number is
                          printed under the slot, with the slot's index); every book is one code point and covers one or
                          two slots. data-books = books separated by "|", each "shown text:HEX HEX" (one hex number per
                          code unit), e.g. "H:0048|😀:D83D DE00". data-label = the string's name on the plate.
                          A two-slot book carries a "2 SLOTS" band, so the width is never told by colour alone.
   data-char="stencilcard" A regex as a stencil card with a row of eight flag dials (g i m s u v y d) under it.
                          data-pattern = the text cut into the card, data-flags = flags switched ON, e.g. "g,i".
                          Every dial says ON or OFF in words and its knob sits right (on) or left (off).
                          (Named stencilcard, not stencil, so it can't be confused with py-ch25's restencil.)

   [data-slide]           The stencil slider: a stepper that slides a stencil along a text, one start position per step.
                          Model (JSON script named by data-slide):
                            { "program": "slide.js", "text": "my cat sat", "width": 3,
                              "steps": [ { "line": "0 no", "note": "...", "at": 0 }, ... ] }
                          Each step reveals one line of the program's output ("line", or null for none) and places the
                          stencil at "at" (default: the number that starts the line). A line ending in "match" draws a
                          solid frame with the word MATCH; "no" draws a dashed frame with the word "no".
                          Parity: the step lines joined together must equal the real captured output exactly; the badge
                          says so, and any mismatch is reported with L.report. Keyboard and aria-live come from L.runner.
                          The text version is a table of every step. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch22.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111", MONO = 'font-family="JetBrains Mono, monospace" font-weight="800"';
  var EMOJI = 'font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Twemoji Mozilla, sans-serif"';
  var FILLS = ["#DDE8FF", "#FFF6CC", "#C9F2D9", "#FFE1E1"];

  function fit(text, max, big, small) { return Math.max(small, Math.min(big, max / (Math.max(1, text.length) * 0.62))); }

  /* ---------- bookshelf ---------- */
  var SLOT = 62;
  function books(el) {
    return (el.getAttribute("data-books") || "a:0061").split("|").map(function (b) {
      var i = b.lastIndexOf(":"); return { shown: b.slice(0, i), units: b.slice(i + 1).trim().split(/\s+/) };
    });
  }
  L.cast.bookshelf = { vb: function (el) { var n = 0; books(el).forEach(function (b) { n += b.units.length; }); return "0 0 " + (32 + n * SLOT) + " 236"; }, draw: function (el) {
    var bs = books(el), label = el.getAttribute("data-label") || "", n = 0, out = "";
    bs.forEach(function (b) { n += b.units.length; });
    var W = 32 + n * SLOT;
    if (label) {
      var fs = fit(label, 260, 18, 12), w = Math.min(W - 24, label.length * fs * 0.62 + 26);
      out += '<rect x="12" y="4" width="' + w.toFixed(1) + '" height="30" rx="7" fill="#FFFFFF"' + S(3) + "/>" +
        '<text x="' + (12 + w / 2).toFixed(1) + '" y="25" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>";
    }
    // the shelf board and the slot dividers
    out += '<rect x="8" y="150" width="' + (W - 16) + '" height="14" rx="3" fill="#F4F1EA"' + S(3.5) + "/>";
    var slot = 0;
    bs.forEach(function (b, bi) {
      var x = 16 + slot * SLOT, w = b.units.length * SLOT - 6, two = b.units.length > 1, tall = 98 - (bi % 3) * 6;
      out += '<g class="bob"><rect x="' + (x + 3) + '" y="' + (150 - tall) + '" width="' + w + '" height="' + tall + '" rx="6" fill="' + FILLS[bi % FILLS.length] + '"' + S(3.5) + "/>";
      var cx = x + 3 + w / 2, txt = b.shown, isWord = /^[A-Za-z]{2,}$/.test(txt) || txt === "space";
      var size = isWord ? fit(txt, w - 8, 15, 10) : (two ? 36 : 30);
      out += '<text x="' + cx.toFixed(1) + '" y="' + (150 - tall / 2 + (isWord ? 5 : 11)) + '" text-anchor="middle" ' + (isWord ? MONO : EMOJI + ' font-weight="800"') + ' font-size="' + size.toFixed(1) + '" fill="' + INK + '">' + esc(txt) + "</text>";
      if (two) out += '<rect x="' + (x + 10) + '" y="' + (150 - tall + 6) + '" width="' + (w - 14) + '" height="18" rx="4" fill="#FFFFFF"' + S(2) + '/><text x="' + cx.toFixed(1) + '" y="' + (150 - tall + 20) + '" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="14" fill="' + INK + '">2 SLOTS</text>';   // 14 units: 12px from 0.86px/unit (it was 12, 10.3px at 294px)
      out += "</g>";
      b.units.forEach(function (u) {
        var sx = 16 + slot * SLOT + SLOT / 2;
        out += '<text x="' + sx + '" y="186" text-anchor="middle" ' + MONO + ' font-size="15" fill="' + INK + '">' + esc(u.toUpperCase()) + "</text>" +
          '<circle cx="' + sx + '" cy="212" r="13" fill="#FFFFFF"' + S(2.5) + '/><text x="' + sx + '" y="217.5" text-anchor="middle" ' + MONO + ' font-size="14" fill="' + INK + '">' + slot + "</text>";
        if (slot > 0) out += '<path d="M' + (16 + slot * SLOT) + ' 170 V198" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="3 4"/>';
        slot++;
      });
    });
    return out;
  } };

  /* ---------- stencil ---------- */
  var FLAGS = ["g", "i", "m", "s", "u", "v", "y", "d"];
  L.cast.stencilcard = { vb: "0 0 440 250", draw: function (el) {
    var pat = el.getAttribute("data-pattern") || "cat", on = (el.getAttribute("data-flags") || "").split(",").map(function (s) { return s.trim(); });
    var out = '<g class="bob">';
    // the card, with a handle hole and the cut-out pattern
    out += '<rect x="10" y="8" width="420" height="120" rx="14" fill="#FFD60A"' + S(4) + "/>";
    out += '<circle cx="34" cy="32" r="9" fill="#FFFFFF"' + S(3) + "/>";
    var fs = fit("/" + pat + "/", 330, 34, 15);
    var tw = Math.min(360, ("/" + pat + "/").length * fs * 0.62 + 30);
    out += '<rect x="' + (220 - tw / 2).toFixed(1) + '" y="40" width="' + tw.toFixed(1) + '" height="60" rx="8" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3" stroke-dasharray="9 5"/>';
    out += '<text x="220" y="' + (70 + fs * 0.36).toFixed(1) + '" text-anchor="middle" ' + MONO + ' font-size="' + fs.toFixed(1) + '" fill="' + INK + '">/' + esc(pat) + "/</text>";
    out += '<text x="420" y="122" text-anchor="end" font-family="Bangers, Impact, sans-serif" font-size="20" letter-spacing="1.5" fill="' + INK + '">STENCIL</text>';
    out += "</g>";
    // the dial row (ON/OFF words at 20 units: at least 12px wherever the card is drawn 265px wide or more)
    out += '<rect x="10" y="138" width="420" height="106" rx="12" fill="#F4F1EA"' + S(3) + "/>";
    FLAGS.forEach(function (f, i) {
      var cx = 38 + i * 52, isOn = on.indexOf(f) >= 0;
      out += '<text x="' + cx + '" y="166" text-anchor="middle" ' + MONO + ' font-size="20" fill="' + INK + '">' + f + "</text>";
      out += '<rect x="' + (cx - 20) + '" y="176" width="40" height="24" rx="12" fill="' + (isOn ? "#C9F2D9" : "#FFFFFF") + '"' + S(2.5) + (isOn ? "" : ' stroke-dasharray="4 3"') + "/>";
      out += '<circle cx="' + (isOn ? cx + 8 : cx - 8) + '" cy="188" r="8" fill="' + (isOn ? INK : "#F3F3F3") + '"' + S(2) + "/>";
      out += '<text x="' + cx + '" y="226" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="20" fill="' + INK + '">' + (isOn ? "ON" : "OFF") + "</text>";
    });
    return out;
  } };

  /* ---------- the stencil slider ---------- */
  function mountSlide(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-slide")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var real = L.shown(prog), said = m.steps.filter(function (s) { return s.line != null; }).map(function (s) { return s.line + "\n"; }).join("");
    var ok = said === real;
    if (!ok) L.report("slide", "steps do not match the real output of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }
    var chars = Array.from(m.text), n = chars.length, w = m.width || 1;
    var stage = box.querySelector(".slide-stage");
    stage.innerHTML = '<div class="slide-row" style="--n:' + n + '">' + chars.map(function (c, i) {
      return '<div class="slide-cell"><span class="ch">' + (c === " " ? "␣" : esc(c)) + '</span><span class="ix">' + i + "</span></div>";
    }).join("") + '<div class="slide-frame" data-now><span class="tag"></span></div></div>';
    var frame = stage.querySelector(".slide-frame"), tag = frame.querySelector(".tag"), cells = stage.querySelectorAll(".slide-cell");
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function info(s) {
      var at = s.at != null ? s.at : parseInt(s.line, 10);
      var res = s.result || (/ match$/.test(s.line || "") ? "match" : / no$/.test(s.line || "") ? "no" : "");
      return { at: isNaN(at) ? null : at, res: res };
    }
    function render(st, announce) {
      var s = m.steps[st.step], f = info(s), lines = [];
      for (var i = 0; i <= st.step; i++) if (m.steps[i].line != null) lines.push(m.steps[i].line);
      frame.hidden = f.at == null;
      if (f.at != null) {
        frame.style.width = (w / n * 100) + "%"; frame.style.transform = "translateX(" + (f.at / w * 100) + "%)";
        var lefty = f.at + w / 2 <= n / 2; tag.style.left = lefty ? "-4px" : "auto"; tag.style.right = lefty ? "auto" : "-4px";
        frame.className = "slide-frame" + (f.res === "match" ? " hit" : f.res === "no" ? " miss" : "");
        tag.textContent = (m.label || "stencil") + (f.res === "match" ? " · MATCH ✓" : f.res === "no" ? " · no ✗" : "");
      }
      for (var k = 0; k < cells.length; k++) cells[k].classList.toggle("under", f.at != null && k >= f.at && k < f.at + w);
      out.innerHTML = lines.length ? lines.map(function (l, idx) { return '<span class="' + (announce && idx === lines.length - 1 && s.line != null ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + (f.at != null ? "Stencil at position " + f.at + (f.res ? ", " + f.res : "") + ". " : "") + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      var f = info(s), covered = f.at != null ? chars.slice(f.at, f.at + w).join("") : "";
      return "<tr><td>" + (i + 1) + "</td><td>" + (f.at != null ? "position " + f.at + " (covers <code>" + esc(covered) + "</code>)" : "(stencil put away)") + "</td><td>" + (f.res || "-") + "</td><td>" + s.note + "</td><td><code>" + (s.line != null ? esc(s.line) : "(nothing new)") + "</code></td></tr>";
    }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-slide]");
    for (var i = 0; i < boxes.length; i++) { try { mountSlide(boxes[i]); } catch (e) { L.report("slide", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
