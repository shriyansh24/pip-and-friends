/* JavaScript book, chapter 23 additions ("Rulers and Tape Measures"). Classic deferred script, loaded after
   comic-critters.js and comic-cast.js. Three jobs, all local to this page:

   1. data-char="bigabacus": BigInt drawn as an abacus with a face. Rods of beads, no decimal point (a crossed-out
      dot on the frame), and a plate with data-label (e.g. "10n", at most 9 characters). data-mood: happy | o.
   2. [data-xray23="MODEL-ID"]: the float x-ray. The model names a captured program that prints one row per number:
      "x sign exponent fraction" (1 + 11 + 52 bits). Pick a number; the 64 bits are laid out as three labelled groups,
      and a decoding table reads them back: sign, exponent minus 1023, and 1.fraction. The parity badge recomputes
      every row in this browser (DataView, the same as the program) and compares it with the real Node run.
      Keyboard: the number chips are buttons. Text version: a table of every captured row.
   3. [data-quote23="prog.js#N"]: a label inside a hand-drawn picture that quotes line N of a captured run's stdout.
      Each is compared with the capture; a .parity[data-quote-badge] in the same section reports the result. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch23.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------- 1. the BigInt abacus ---------- */
  L.cast.bigabacus = {
    vb: "0 0 190 190",
    draw: function (el) {
      var lab = (el.getAttribute("data-label") || "123n").slice(0, 9);
      var mood = el.getAttribute("data-mood") || "happy";
      var out = '<g class="bob">';
      // legs and feet
      out += '<path d="M58 150 L52 172 M132 150 L138 172" fill="none"' + S(6) + "/>" +
        '<ellipse cx="50" cy="176" rx="13" ry="5.5" fill="' + INK + '"/><ellipse cx="140" cy="176" rx="13" ry="5.5" fill="' + INK + '"/>';
      // arms
      out += '<path d="M24 96 L6 78" fill="none"' + S(6) + '/><circle cx="6" cy="76" r="7" fill="#FFFFFF"' + S(3) + "/>" +
        '<path d="M166 96 L184 78" fill="none"' + S(6) + '/><circle cx="184" cy="76" r="7" fill="#FFFFFF"' + S(3) + "/>";
      // frame
      out += '<rect x="22" y="40" width="146" height="112" rx="10" fill="#E9C99A"' + S(5) + "/>" +
        '<rect x="34" y="52" width="122" height="88" rx="4" fill="#FFF6CC"' + S(3) + "/>";
      // rods with beads: a different count per rod, like digits
      var counts = [3, 1, 4, 2, 5];
      for (var r = 0; r < 5; r++) {
        var y = 64 + r * 17;
        out += '<path d="M34 ' + y + ' H156" fill="none"' + S(2.5) + "/>";
        for (var b = 0; b < counts[r]; b++) {
          var x = 46 + b * 16;
          out += '<ellipse cx="' + x + '" cy="' + y + '" rx="7.5" ry="6.5" fill="' + (r % 2 ? "#7FB2FF" : "#FF5A4E") + '"' + S(2.5) + "/>";
        }
      }
      // face on the right side of the frame
      out += '<circle cx="132" cy="80" r="5" fill="' + INK + '"/><circle cx="148" cy="80" r="5" fill="' + INK + '"/>';
      out += mood === "o" ? '<ellipse cx="140" cy="100" rx="6" ry="7" fill="' + INK + '"/>' : '<path d="M128 96 Q140 110 152 96" fill="none"' + S(3.5) + "/>";
      // "no decimal point": a dot in a crossed-out circle on the top bar
      out += '<circle cx="152" cy="28" r="12" fill="#FFFFFF"' + S(3) + '/><circle cx="152" cy="31" r="3" fill="' + INK + '"/>' +
        '<path d="M143 19 L161 37" fill="none" stroke="#B00020" stroke-width="3.5" stroke-linecap="round"/>';
      // name plate
      // Labels longer than 4 characters ("no Math") use 24-unit text, so they stay at 12px or more at the default
      // 130px width; the plate then shifts left to clear the crossed-out decimal point.
      var big = lab.length > 4, fsz = big ? 24 : 17, w = big ? lab.length * 14.5 + 14 : Math.max(56, lab.length * 12 + 20), cx = big ? 82 : 95;
      out += '<rect x="' + (cx - w / 2) + '" y="' + (big ? 10 : 14) + '" width="' + w + '" height="' + (big ? 33 : 28) + '" rx="6" fill="#FFFFFF"' + S(3) + "/>" +
        '<text x="' + cx + '" y="' + (big ? 35 : 34) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fsz + '" fill="' + INK + '">' + esc(lab) + "</text>";
      return out + "</g>";
    }
  };

  /* ---------- 2. the float x-ray ---------- */
  function bitsOf(x) {
    var v = new DataView(new ArrayBuffer(8)); v.setFloat64(0, x);
    var s = ""; for (var i = 0; i < 8; i++) s += ("00000000" + v.getUint8(i).toString(2)).slice(-8);
    return s;
  }
  function mountXray(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-xray23")).textContent);
    var prog = L.program(m.program); if (!prog) return;
    var rows = prog.stdout.replace(/\n$/, "").split("\n").map(function (line) {
      var t = line.trim().split(/\s+/);
      return { line: line, x: t[0], sign: t[1], exp: t[2], frac: t[3] };
    });
    var ok = rows.length > 0 && rows.every(function (r) {
      return r.sign && r.exp && r.frac && r.sign.length === 1 && r.exp.length === 11 && r.frac.length === 52 &&
        bitsOf(Number(r.x)) === r.sign + r.exp + r.frac;
    });
    if (!ok) L.report("xray", "rows do not match the real run of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "All 64 bits of every number match the real run of " + m.program : "Does not match the real run of " + m.program; par.classList.toggle("bad", !ok); }

    var chips = box.querySelector(".xr-chips"), stage = box.querySelector(".xr-stage"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    chips.innerHTML = '<span class="label">X-RAY:</span>' + rows.map(function (r, i) {
      return '<button type="button" class="path-btn" aria-pressed="false" data-i="' + i + '"><code>' + esc(r.x) + "</code></button>";
    }).join("");
    var tb = box.querySelector("table.transcript tbody");
    if (tb) tb.innerHTML = rows.map(function (r) {
      var d = decode(r);
      return "<tr><td><code>" + esc(r.x) + "</code></td><td><code>" + r.sign + "</code></td><td><code>" + r.exp + "</code> = " + d.e + "</td><td><code>" + r.frac + "</code></td><td>" + esc(d.reading) + "</td></tr>";
    }).join("");

    function cells(bits, cls) {
      var h = "";
      for (var i = 0; i < bits.length; i++) h += '<span class="xr-bit ' + cls + (bits[i] === "1" ? " on" : "") + '">' + bits[i] + "</span>";
      return h;
    }
    function trimFrac(f) { var t = f.replace(/0+$/, ""); return t === "" ? "0" : t; }
    function decode(r) {
      var e = parseInt(r.exp, 2), p = e - 1023, f = trimFrac(r.frac);
      var mant = "1." + f;
      var reading = (r.sign === "1" ? "minus " : "plus ") + mant + " (binary) × 2^" + p;
      return { e: e, p: p, mant: mant, reading: reading, repeats: f.length > 40 };
    }
    function draw(i) {
      var r = rows[i], d = decode(r);
      stage.innerHTML =
        '<div class="xr-groups" aria-hidden="true">' +
          '<div class="xr-g xr-gs"><p class="xr-h">SIGN <small>1 bit</small></p><div class="xr-cells">' + cells(r.sign, "s") + "</div></div>" +
          '<div class="xr-g xr-ge"><p class="xr-h">EXPONENT <small>11 bits: how far to slide the point</small></p><div class="xr-cells">' + cells(r.exp, "e") + "</div></div>" +
          '<div class="xr-g xr-gf"><p class="xr-h">FRACTION <small>52 bits: the digits after "1."</small></p><div class="xr-cells">' + cells(r.frac, "f") + "</div></div>" +
        "</div>" +
        '<table class="mini xr-read"><caption>Reading the bits of <code>' + esc(r.x) + "</code></caption><tbody>" +
          "<tr><th>sign</th><td><code>" + r.sign + "</code> means " + (r.sign === "1" ? "<b>minus</b>" : "<b>plus</b>") + "</td></tr>" +
          "<tr><th>exponent</th><td><code>" + r.exp + "</code> is " + d.e + "; take away 1023: <b>" + d.p + "</b>, so multiply by 2<sup>" + d.p + "</sup></td></tr>" +
          "<tr><th>fraction</th><td>a hidden <b>1.</b> in front: <code class=\"xr-mant\">" + esc(d.mant.length > 30 ? d.mant.slice(0, 30) + "…" : d.mant) + "</code> in binary</td></tr>" +
        "</tbody></table>" +
        '<p class="xr-row"><span class="xr-k">Real output row:</span> <code>' + esc(r.line) + "</code></p>";
      note.innerHTML = noteFor(r, d);
      var bs = chips.querySelectorAll(".path-btn"); for (var b = 0; b < bs.length; b++) bs[b].setAttribute("aria-pressed", String(b === i));
      if (live) live.textContent = r.x + ": sign " + r.sign + ", exponent " + d.p + ", fraction " + trimFrac(r.frac) + ".";
    }
    function noteFor(r, d) {
      var x = Number(r.x);
      if (d.repeats) return "<b>" + esc(r.x) + "</b> is <b>1.1001100110011…</b> × 2<sup>" + d.p + "</sup>: the pattern <code>1100</code> repeats forever, like 1/3 = 0.333… in decimal. The 52 boxes run out, so the last bit is rounded. That rounding is why 0.1 sits a hair off its mark on the ruler.";
      if (trimFrac(r.frac) === "0") return "<b>" + esc(r.x) + "</b> is " + (x < 0 ? "minus " : "") + "1.0 × 2<sup>" + d.p + "</sup>. Every fraction bit is 0: a power of two sits exactly on a mark.";
      return "<b>" + esc(r.x) + "</b> is " + (x < 0 ? "minus " : "") + "binary " + esc(d.mant) + " × 2<sup>" + d.p + "</sup>. Only a few fraction bits are needed, and then zeros: exact.";
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".path-btn"); if (!b) return;
      draw(Number(b.getAttribute("data-i")));
    });
    draw(Number(m.start || 0));
  }

  /* ---------- 3. labels in pictures that quote a captured line ---------- */
  function checkQuotes() {
    var boxes = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-quote23]"), function (e) {
      var b = e.closest("section") || document.body; if (boxes.indexOf(b) < 0) boxes.push(b);
    });
    boxes.forEach(function (box) {
      var bad = 0, n = 0;
      Array.prototype.forEach.call(box.querySelectorAll("[data-quote23]"), function (e) {
        var spec = e.getAttribute("data-quote23").split("#"), prog = L.program(spec[0]); n++;
        var line = prog ? prog.stdout.split("\n")[Number(spec[1]) - 1] : null;
        if (line == null || line.trim() !== e.textContent.trim()) { bad++; L.report("picture-label", spec.join("#") + " says '" + e.textContent.trim() + "' but the real run printed '" + line + "'"); }
      });
      var par = box.querySelector(".parity[data-quote-badge]");
      if (par) { par.textContent = bad ? bad + " label(s) do not match the real run" : "All " + n + " quoted lines in the picture match the real run"; par.classList.toggle("bad", !!bad); }
    });
  }

  P.comic.ext(function () {
    Array.prototype.forEach.call(document.querySelectorAll("[data-xray23]"), function (b) { try { mountXray(b); } catch (e) { L.report("xray", e.message); } });
    checkQuotes();
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
