/* C++ book, chapter 2 extension: "Hello, Detective!".
   Everything here reads the captured runs in data/cpp-ch2.js; nothing claims output that was typed by hand.
     (The Linker comes from comic-critters.js; clang++ terminals use the engine's data-alt.)
     - [data-msgparts]         the detective's report: one real compiler message split into its parts (address,
                               accusation, evidence, caret, fix-it, witnesses...). The parts are rebuilt from the
                               real stderr and the badge says whether the rebuilt text equals it, character for character.
     - [data-pile]             a cascade counted: how many lines, errors, warnings and notes one run printed, with
                               each error and warning as a "suspect" card and the first one stamped.
     - [data-belt]             the std::cout conveyor belt: each << drops one box; the screen grows. Every screen in
                               the model must be a prefix of the real stdout and the last must equal it. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) return;
  var L = P.comic.lib, esc = L.esc;

  function run(name, which) {
    var q = L.program(name);
    if (!q) return null;
    if (which === "alt") { if (!q.alt) { L.report("cpp-ch2", "no clang++ run recorded for " + name); return null; } return q.alt; }
    return q;
  }

  /* ---------------- reading a compiler message ---------------- */
  var DIAG = /^(.+?):(\d+):(\d+): (fatal error|error|warning|note): (.*)$/;
  var ENDLINE = /^(compilation terminated\.|\d+ (?:errors?|warnings?)(?: and \d+ (?:errors?|warnings?))? generated\.|cc1plus: .*|collect2: .*|clang\+\+: error: .*)$/;
  function classify(text) {
    var lines = text.replace(/\n$/, "").split("\n"), rows = [], block = "main";
    lines.forEach(function (ln) {
      var m, row = { text: ln, role: "other", spans: null, kind: null };
      if (!DIAG.test(ln) && / In function .*:$/.test(ln)) row.role = "ctx";
      else if ((m = DIAG.exec(ln))) {
        row.kind = m[4];
        if (m[4] === "note") { block = "wit"; row.role = "wit"; }
        else {
          block = "main"; row.role = "diag";
          var msg = " " + m[5], fm = / \[-W[^\]]+\]$/.exec(msg), flag = fm ? fm[0] : "";
          if (flag) msg = msg.slice(0, -flag.length);
          row.spans = [["addr", m[1] + ":" + m[2] + ":" + m[3] + ":"], ["acc", " " + m[4] + ":" + msg]].concat(flag ? [["flag", flag]] : []);
        }
      }
      else if (/^In file included from |^\s+from .+[:,]$/.test(ln)) { block = "wit"; row.role = "wit"; }
      else if (/^\s*\d+ \|( |$)/.test(ln)) row.role = block === "wit" ? "wit" : "evid";
      else if (/^\s+\|( |$)/.test(ln)) {
        if (block === "wit") row.role = "wit";
        else row.role = /^[\s^~|]*$/.test(ln.replace(/^\s+\| ?/, "")) ? "caret" : "fix";
      }
      else if (/^\/usr\/bin\/ld: |\(\.text\+0x[0-9a-f]+\): /.test(ln)) row.role = "link";
      else if (ENDLINE.test(ln)) row.role = "end";
      rows.push(row);
    });
    return rows;
  }
  var ROLES = {
    ctx:   { b: "CONTEXT", d: "Which function the trouble is in. A heading, not the problem itself." },
    addr:  { b: "ADDRESS", d: "file : line : column. Where the Compiler noticed the problem. Go there first." },
    acc:   { b: "ACCUSATION", d: "What kind of message (error, warning, fatal error) and what the Compiler expected." },
    flag:  { b: "FLAG", d: "The warning switch that turned this warning on. Search for it to learn more." },
    evid:  { b: "EVIDENCE", d: "Your own line of code, copied, with its line number in the margin before the bar." },
    caret: { b: "CARET", d: "The ^ points at the exact column. ~ marks underline the rest of the suspect." },
    fix:   { b: "FIX-IT", d: "A suggested repair, printed under the caret: type this there." },
    wit:   { b: "WITNESS", d: "note: lines. Extra clues: where something was declared, or which { a } should match." },
    link:  { b: "LINKER", d: "Lines from ld, the linker. The Compiler already finished; a piece is missing." },
    end:   { b: "SIGN-OFF", d: "The last word: a count of problems, or the tool giving up." }
  };
  var ORDER = ["ctx", "addr", "acc", "flag", "evid", "caret", "fix", "wit", "link", "end"];
  function rowHtml(r) {
    var inner = r.spans ? r.spans.map(function (s) { return '<span class="rp-part" data-p="' + s[0] + '">' + esc(s[1]) + "</span>"; }).join("") : esc(r.text);
    return '<span class="rp-line' + (r.spans ? "" : " rp-part") + '"' + (r.spans ? "" : ' data-p="' + r.role + '"') + ">" + (inner || " ") + "</span>";
  }
  function mountReport(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-msgparts")).textContent);
    var a = run(m.program, m.which); if (!a) return;
    var rows = classify(a.stderr), rebuilt = rows.map(function (r) { return r.spans ? r.spans.map(function (s) { return s[1]; }).join("") : r.text; }).join("\n") + "\n";
    var ok = rebuilt === a.stderr && rows.every(function (r) { return r.role !== "other"; });
    if (!ok) L.report("report:" + m.program, "the parts do not rebuild the real message (or a line was not recognised)");
    var present = ORDER.filter(function (k) { return rows.some(function (r) { return r.role === k || (r.spans && r.spans.some(function (s) { return s[0] === k; })); }); });
    var tool = m.which === "alt" ? "clang++" : "g++";
    box.innerHTML = '<div class="rp-folder"><p class="rp-tab">CASE FILE · ' + esc(m.program) + " · " + tool + '</p><pre class="rp-paper">' + rows.map(rowHtml).join("\n") + "</pre></div>" +
      '<ul class="anat-keys rp-keys" aria-label="Parts of the message: press one to highlight it">' + present.map(function (k) {
        var d = (m.notes && m.notes[k]) || ROLES[k].d;
        return '<li><button type="button" aria-pressed="false" data-p="' + k + '"><b>' + ROLES[k].b + "</b>" + d + "</button></li>";
      }).join("") + "</ul>" +
      '<p class="parity' + (ok ? "" : " bad") + '">' + (ok ? "Rebuilt character for character from the real " + tool + " run" : "Does not match the real run") + "</p>" +
      '<p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every line and its part</summary><table class="transcript"><thead><tr><th>Line</th><th>Part</th><th>Text</th></tr></thead><tbody>' +
      rows.map(function (r, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (r.spans ? r.spans.map(function (s) { return ROLES[s[0]].b.toLowerCase(); }).join(" + ") : ROLES[r.role] ? ROLES[r.role].b.toLowerCase() : "") + "</td><td><code>" + esc(r.text) + "</code></td></tr>"; }).join("") + "</tbody></table></details>";
    var btns = box.querySelectorAll(".rp-keys button"), live = box.querySelector("[aria-live]");
    function show(k, say) {
      for (var i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", String(btns[i].getAttribute("data-p") === k));
      var parts = box.querySelectorAll(".rp-part");
      for (var j = 0; j < parts.length; j++) parts[j].classList.toggle("on", parts[j].getAttribute("data-p") === k);
      if (say && live) {
        var txt = [].slice.call(box.querySelectorAll('.rp-part[data-p="' + k + '"]')).map(function (e) { return e.textContent.trim(); }).join(" / ");
        live.textContent = ROLES[k].b + ": " + txt;
      }
    }
    box.querySelector(".rp-keys").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) show(b.getAttribute("data-p"), true); });
    show(m.start || present[0], false);
  }

  /* ---------------- a cascade, counted ---------------- */
  function mountPile(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-pile")).textContent);
    var a = run(m.program, m.which); if (!a) return;
    var rows = classify(a.stderr), n = a.stderr.replace(/\n$/, "").split("\n").length, c = { error: 0, warning: 0, note: 0 }, sus = [];
    rows.forEach(function (r) {
      if (!r.kind) return;
      var k = r.kind === "fatal error" ? "error" : r.kind;
      c[k]++;
      if (k !== "note") sus.push(r);
    });
    var tool = m.which === "alt" ? "clang++" : "g++", max = m.max || 4;
    function plural(x, w) { return x + " " + w + (x === 1 ? "" : "s"); }
    var cut = function (s) { return s.length > 96 ? s.slice(0, 93) + "…" : s; };
    box.innerHTML = '<p class="pile-h"><b>' + tool + "</b> printed <b>" + plural(n, "line") + "</b></p>" +
      '<p class="pile-count"><span>' + plural(c.error, "error") + "</span><span>" + plural(c.warning, "warning") + '</span><span class="dash">' + plural(c.note, "note") + "</span></p>" +
      '<ol class="pile">' + sus.slice(0, max).map(function (r, i) {
        return '<li class="' + (i === 0 ? "first" : "") + '"><span class="pile-top"><span class="pile-no">SUSPECT ' + (i + 1) + "</span>" + (i === 0 ? '<span class="pile-stamp">QUESTION FIRST</span>' : "") + "</span><code>" + esc(cut(r.text)) + "</code></li>";
      }).join("") + (sus.length > max ? '<li class="more">…and ' + plural(sus.length - max, "more suspect") + "</li>" : "") + "</ol>" +
      '<p class="parity">Counted from the real ' + tool + " run</p>";
  }

  /* ---------------- the std::cout conveyor belt ---------------- */
  var KIND = { str: "text", num: "number", nl: "new line", endl: "new line + ship now", chr: "one character" };
  function mountBelt(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-belt")).textContent);
    var q = L.program(m.program); if (!q) return;
    var src = q.src.replace(/\n$/, "").split("\n"), real = L.shown(q), ok = true, why = [];
    var last = m.steps[m.steps.length - 1];
    if (last.text !== real) { ok = false; why.push("last screen is not the real output"); }
    m.steps.forEach(function (s, i) { if (real.indexOf(s.text) !== 0) { ok = false; why.push("step " + (i + 1) + " screen is not a prefix of the real output"); } });
    /* where each piece sits in its source line (searching left to right, so repeated pieces are found in order) */
    var from = {};
    m.steps.forEach(function (s, i) {
      if (!s.piece) return;
      var line = src[s.line - 1] || "", at = line.indexOf(s.piece, from[s.line] || 0);
      if (at < 0) { ok = false; why.push("step " + (i + 1) + ": " + s.piece + " is not on line " + s.line); return; }
      s._at = at; from[s.line] = at + s.piece.length;
    });
    if (!ok) L.report("belt:" + m.program, why.join("; "));
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every screen matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    var stage = box.querySelector(".belt-stage");
    stage.innerHTML = '<div class="belt-code"></div><div class="belt-row"><div class="belt-hopper" aria-hidden="true"><svg viewBox="0 0 110 90"><path d="M8 10 H102 L78 52 H32 Z" fill="#FFD60A" stroke="#111" stroke-width="4" stroke-linejoin="round"/><rect x="38" y="52" width="34" height="22" fill="#fff" stroke="#111" stroke-width="4"/><text x="55" y="38" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="#111">cout</text></svg><span>std::cout</span></div>' +
      '<div class="belt-track"><ol class="belt-boxes"></ol><div class="belt-band" aria-hidden="true"></div></div>' +
      '<div class="screen belt-screen"><p class="label">SCREEN</p><pre></pre></div></div>';
    var codeEl = stage.querySelector(".belt-code"), ol = stage.querySelector(".belt-boxes"), pre = stage.querySelector(".belt-screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function boxHtml(s, isNew) {
      return '<li class="bx ' + s.kind + (isNew ? " new fx-in" : "") + '"><code>' + esc(s.piece) + "</code><small>" + KIND[s.kind] + "</small>" + (s.kind === "endl" ? '<b class="ship">SHIP NOW!</b>' : "") + "</li>";
    }
    function render(st, announce) {
      var s = m.steps[st.step], line = src[s.line - 1] || "";
      var lineHtml = s.piece && s._at != null ? esc(line.slice(0, s._at)) + "<mark>" + esc(s.piece) + "</mark>" + esc(line.slice(s._at + s.piece.length)) : esc(line);
      codeEl.innerHTML = '<span class="ln">' + s.line + "</span><code>" + lineHtml + "</code>";
      var drops = m.steps.slice(0, st.step + 1).filter(function (x) { return x.piece; });
      ol.innerHTML = drops.length ? drops.map(function (x, i) { return boxHtml(x, announce && i === drops.length - 1 && s.piece); }).join("") : '<li class="bx-empty">The belt is empty.</li>';
      pre.innerHTML = (s.text ? esc(s.text) : "") + '<span class="cursor" aria-hidden="true">▌</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "") + " Screen: " + (s.text ? s.text.replace(/\n/g, " / ") : "empty") + ".";
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (s.piece ? "<code>" + esc(s.piece) + "</code> (" + KIND[s.kind] + ")" : "nothing yet") + "</td><td>" + s.note + "</td><td><code>" + (s.text ? esc(s.text.replace(/\n/g, "↵")) : "(empty)") + "</code></td></tr>"; }).join("");
    var r = L.runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
  }

  P.comic.ext(function () {
    var i, els;
    els = document.querySelectorAll("[data-msgparts]"); for (i = 0; i < els.length; i++) { try { mountReport(els[i]); } catch (e) { L.report("msgparts", e.message); } }
    els = document.querySelectorAll("[data-pile]"); for (i = 0; i < els.length; i++) { try { mountPile(els[i]); } catch (e) { L.report("pile", e.message); } }
    els = document.querySelectorAll("[data-belt]"); for (i = 0; i < els.length; i++) { try { mountBelt(els[i]); } catch (e) { L.report("belt", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
