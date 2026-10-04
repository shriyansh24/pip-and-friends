/* C++ book, chapter 1 extension: "From Recipe to Cake".
   Adds (all reading the captured runs in data/cpp-ch1.js, never typed output):
     - [data-session] the terminal-session walker: one recorded command per step, the real terminal growing on the
       right and a picture of the folder underneath. Folder claims made between `ls` commands are checked against the
       next real `ls`; the badge says whether they all matched.
     - [data-bytes] byte tiles: the first machine-code bytes of main(), read from a real objdump run
   The Linker now comes from comic-critters.js, and the engine draws Wren on the map and says "Real run". */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) return;
  var L = P.comic.lib, esc = L.esc, S = L.stroke, NS = "http://www.w3.org/2000/svg";

  /* ---------------- helpers ---------------- */
  function dirLabel() {
    var meta = (P.data && P.data.captures && P.data.captures.meta) || {};
    return String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
  }
  function kindOf(name) {
    if (/\.(cpp|cc|cxx)$/.test(name)) return { k: "src", t: "source code (the recipe card)" };
    if (/\.ii$/.test(name)) return { k: "ii", t: "preprocessed source (headers pasted in)" };
    if (/\.o$/.test(name)) return { k: "obj", t: "object file (a baked tray)" };
    if (/\.s$/.test(name)) return { k: "asm", t: "assembly text" };
    return { k: "exe", t: "executable (the boxed cake)" };
  }
  var ICON = {
    src: '<path d="M8 4 h22 l8 8 v32 h-30 z" fill="#FFF6CC"' + S(3) + '/><path d="M30 4 v8 h8" fill="none"' + S(3) + '/><path d="M13 20 h18 M13 27 h18 M13 34 h12" fill="none"' + S(2.5) + "/>",
    ii: '<path d="M6 20 h36 q-2 22 -18 22 q-16 0 -18 -22 z" fill="#DDE8FF"' + S(3) + '/><path d="M14 16 q4 -8 10 -2 q6 -8 10 2" fill="none"' + S(2.5) + "/>",
    obj: '<rect x="4" y="22" width="40" height="14" rx="3" fill="#C9C9C9"' + S(3) + '/><circle cx="15" cy="20" r="6" fill="#FF9F43"' + S(2.5) + '/><circle cx="31" cy="20" r="6" fill="#FF9F43"' + S(2.5) + "/>",
    asm: '<rect x="6" y="6" width="36" height="36" rx="4" fill="#FFFFFF"' + S(3) + '/><path d="M12 16 h18 M12 24 h24 M12 32 h14" fill="none"' + S(2.5) + "/>",
    exe: '<path d="M6 18 h36 v24 h-36 z" fill="#E7C08A"' + S(3) + '/><path d="M6 18 l6 -8 h24 l6 8" fill="#F2D3A2"' + S(3) + '/><path d="M18 30 q6 -8 12 0" fill="none" stroke="#FF5A4E" stroke-width="4" stroke-linecap="round"/>'
  };
  function fileTile(name, isNew) {
    var k = kindOf(name);
    return '<li class="ses-file ' + k.k + (isNew ? " new" : "") + '"><svg viewBox="0 0 48 48" aria-hidden="true">' + ICON[k.k] + "</svg><code>" + esc(name) + "</code><small>" + k.t + "</small>" + (isNew ? '<b class="ses-new">NEW</b>' : "") + "</li>";
  }

  /* commands break only at spaces: `-Wall -Wextra` and `~/cpp-ch1/kitchen/bread` never split at a hyphen */
  function nw(text) { return String(text).split(" ").map(function (t) { return t ? '<span class="nw">' + esc(t) + "</span>" : ""; }).join(" "); }

  /* ---------------- terminal-session walker ---------------- */
  function mountSession(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-session")).textContent);
    var q = L.program(m.program);
    if (!q || !q.steps) { L.report("session", "no recorded steps for " + m.program); return; }
    var steps = q.steps, n = steps.length, ok = true, why = [];
    if (m.steps.length !== n + 1) { ok = false; why.push("model has " + m.steps.length + " steps, recording has " + (n + 1)); }
    /* folder after each step: a model claim, or what a real `ls` printed (claims are checked against the next ls) */
    var folders = [m.folder.slice().sort()], cur = folders[0].slice(), claimed = false;
    for (var i = 0; i < n; i++) {
      var st = m.steps[i + 1] || {};
      if (st.files) { cur = st.files.slice().sort(); claimed = true; }
      if (/^ls\b/.test(steps[i].cmd)) {
        var real = steps[i].out.trim().split(/\s+/).filter(Boolean).sort();
        if (real.join(" ") !== cur.join(" ")) { ok = false; why.push("folder before step " + (i + 1) + " is " + cur.join(",") + " but ls printed " + real.join(",")); }
        cur = real; claimed = false;
      }
      folders.push(cur.slice());
    }
    if (claimed) { ok = false; why.push("the last folder claim is never confirmed by ls"); }
    if (m.expectLast != null && steps[n - 1].out.replace(/\n$/, "") !== m.expectLast) { ok = false; why.push("last command did not print " + m.expectLast); }
    if (!ok) L.report("session:" + m.program, why.join("; "));
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Every line is from the real recording" : "Does not match the real recording"; par.classList.toggle("bad", !ok); }

    var body = box.querySelector(".ses-body"), dir = steps[0].dir || dirLabel();
    body.innerHTML = '<div class="ses-grid"><div class="recipe ses-cmds"><svg class="walker ses-guide" viewBox="0 0 158 200" aria-hidden="true"></svg><p class="card-title">' + esc(m.title || "What you type") + '</p><ol></ol></div>' +
      '<div class="ses-side"><div class="screen ses-term"><p class="label">TERMINAL</p><pre></pre></div><div class="ses-folder"><p class="label">FOLDER ' + esc(dir) + '</p><ul></ul></div></div></div>';
    var ol = body.querySelector("ol"), pre = body.querySelector(".ses-term pre"), ul = body.querySelector(".ses-folder ul"), guide = body.querySelector(".ses-guide");
    ol.innerHTML = steps.map(function (s) { return "<li>" + nw(s.cmd) + "</li>"; }).join("");
    var lis = ol.querySelectorAll("li"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function termHtml(upto, fresh) {
      var out = "";
      for (var j = 0; j < upto; j++) {
        var s = steps[j], cls = j === upto - 1 && fresh ? ' class="new"' : "";
        out += (j ? "\n" : "") + '<span class="prompt nw">you@laptop:' + esc(s.dir || dir) + "$</span> <span" + cls + ">" + nw(s.cmd) + "</span>";
        if (s.out) out += "\n<span" + cls + ">" + esc(s.out.replace(/\n$/, "")) + "</span>";
        if (s.err) out += '\n<span class="err">' + esc(s.err.replace(/\n$/, "")) + "</span>";
      }
      return out || '<span class="prompt nw">you@laptop:' + esc(dir) + '$</span> <span class="empty">(waiting for your first command)</span>';
    }
    var fake = document.createElementNS(NS, "svg");
    function render(state, announce) {
      var k = state.step;
      for (var j = 0; j < lis.length; j++) { lis[j].classList.toggle("now", j === k); lis[j].classList.toggle("done", j < k); }
      var target = k < lis.length ? lis[k] : lis[lis.length - 1];
      guide.style.transform = "translateY(" + (target.offsetTop + target.offsetHeight / 2 - 41) + "px)";
      var sm = m.steps[k] || {};
      fake.setAttribute("data-mood", sm.mood || (k === n ? "happy" : "focus"));
      fake.setAttribute("data-mouth", sm.mouth || "smile");
      fake.setAttribute("data-arms", k === n ? "cheer" : "point");
      fake.setAttribute("data-prop", "none");
      guide.innerHTML = L.cast.mechanic ? L.cast.mechanic.draw(fake) : "";
      pre.innerHTML = termHtml(k, announce);
      pre.scrollTop = pre.scrollHeight;
      var before = k ? folders[k - 1] : folders[0];
      ul.innerHTML = folders[k].map(function (f) { return fileTile(f, k > 0 && before.indexOf(f) < 0); }).join("") || "<li>(empty)</li>";
      note.innerHTML = '<span class="count">Step ' + (k + 1) + " of " + (n + 1) + "</span>" + (sm.note || "");
      if (live && announce) live.textContent = "Step " + (k + 1) + " of " + (n + 1) + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, j) {
      var c = j ? steps[j - 1] : null;
      return "<tr><td>" + (j + 1) + "</td><td>" + (c ? "<code>" + esc(c.cmd) + "</code>" : "(nothing yet)") + "</td><td>" + (s.note || "") + (c && (c.out || c.err) ? '<br>Terminal shows: <code>' + esc((c.out + c.err).replace(/\n$/, "").split("\n").join(" / ")) + "</code>" : "") + "</td><td>" + esc((folders[j] || []).join(", ")) + "</td></tr>";
    }).join("");
    var r = L.runner(box, n + 1, render, { reserve: true });
    r.reset(n + 1);
    root.addEventListener("resize", function () { render(r.state(), false); });
  }

  /* ---------------- machine-code byte tiles ---------------- */
  function mountBytes(box) {
    var q = L.program(box.getAttribute("data-bytes")); if (!q) return;
    var max = Number(box.getAttribute("data-max") || 24), bytes = [], insns = 0;
    q.stdout.split("\n").forEach(function (line) {
      var mm = /^\s+[0-9a-f]+:\t((?:[0-9a-f]{2} )+)/.exec(line);
      if (mm) { insns++; mm[1].trim().split(" ").forEach(function (b) { bytes.push(b); }); }
    });
    var par = box.querySelector(".parity"), grid = box.querySelector(".byte-grid"), sr = box.querySelector(".byte-text");
    if (!bytes.length) { L.report("bytes", "no machine-code bytes found in " + box.getAttribute("data-bytes")); if (par) { par.textContent = "Does not match the real run"; par.classList.add("bad"); } return; }
    grid.innerHTML = bytes.slice(0, max).map(function (b) { return "<span>" + b + "</span>"; }).join("") + (bytes.length > max ? '<span class="more">+' + (bytes.length - max) + " more</span>" : "");
    if (sr) sr.textContent = "The first " + Math.min(max, bytes.length) + " of " + bytes.length + " bytes of main, in hexadecimal: " + bytes.slice(0, max).join(" ") + ". They make " + insns + " machine instructions.";
    var scope = box.closest("section") || box, cnt = scope.querySelector("[data-byte-count]"); if (cnt) cnt.textContent = String(bytes.length);
    var ic = scope.querySelector("[data-insn-count]"); if (ic) ic.textContent = String(insns);
    if (par) par.textContent = "Bytes read from the real cake executable";
  }

  P.comic.ext(function () {
    var s = document.querySelectorAll("[data-session]");
    for (var i = 0; i < s.length; i++) { try { mountSession(s[i]); } catch (e) { L.report("session", e.message); } }
    var b = document.querySelectorAll("[data-bytes]");
    for (var j = 0; j < b.length; j++) { try { mountBytes(b[j]); } catch (e) { L.report("bytes", e.message); } }
    L.drawCast();
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
