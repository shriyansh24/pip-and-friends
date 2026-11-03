/* JavaScript book, chapter 12 additions ("Footprints and Safety Nets"). Classic deferred script, loaded after
   comic-cast.js. Everything here is local to javascript/ch12.html.

   [data-anat12]: the error-anatomy reader. Its JSON attribute lists captured programs that crashed:
     data-anat12='[{"program": "crash_ticket.js", "label": "TypeError"}, ...]'
   For the chosen program it takes the REAL stderr from the captures (never typed text), sorts every line into a part of
   the "detective's note" (name and message, where, the copied line, the caret, footprints in your file, Node's own steps,
   the version footer, plus the exit code the terminal records), and lets the reader light up one part at a time.
   Runs of Node-internal frames are folded into one marked line, exactly like the engine's data-fold terminals.
   Parity: the badge says the lines are the real run; a part the reader expects but cannot find is reported with
   L.report, so the checker fails instead of showing a wrong picture. Keyboard: every control is a real button.
   Text version: a table of every part and its lines, rebuilt for each program. State is never colour alone: the lit
   lines carry a "▶" marker in the gutter, and the pressed buttons have aria-pressed plus a shadow. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch12.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  var KIND = {
    TypeError: "the wrong <b>kind</b> of value for the job (here, something was <code>undefined</code>)",
    ReferenceError: "a <b>name</b> nobody ever declared: the Bouncer can't find it on the list",
    RangeError: "the right kind of value, but <b>outside the allowed range</b>",
    SyntaxError: "the file couldn't even be <b>read</b> as JavaScript, so <b>nothing ran</b>",
    Error: "a plain error, thrown on purpose"
  };
  var ORDER = [
    ["msg", "1 · Name: message", "What kind of trouble, and what happened"],
    ["loc", "2 · Where", "File and line number"],
    ["src", "3 · The copied line", "Your line, copied out of the file"],
    ["caret", "4 · The caret ^", "The exact spot"],
    ["own", "5 · Your footprints", "at … lines in your own file"],
    ["internal", "6 · Node's own steps", "Lines to skip"],
    ["foot", "7 · Version footer", "Which Node ran it"],
    ["exit", "8 · Exit code", "Recorded by the terminal"]
  ];

  function base(path) { return path.replace(/^.*\//, ""); }

  /* Sort the real stderr lines into parts. Returns { rows: [{t, p, n}], info } where n counts folded lines. */
  function parse(stderr, exit) {
    var lines = stderr.replace(/\n$/, "").split("\n"), rows = [], info = { own: [], internal: 0 }, sawCaret = false;
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i], p = "blank";
      if (i === 0 && /^(file:\/\/\S+|node:\S+):\d+$/.test(t)) { p = "loc"; info.loc = t; }
      else if (i === 1 && info.loc) { p = "src"; info.src = t; }
      else if (!sawCaret && /^\s*\^+\s*$/.test(t)) { p = "caret"; sawCaret = true; info.caret = t; }
      else if (/^Node\.js v\d/.test(t)) { p = "foot"; info.foot = t; }
      else if (/^\s+at /.test(t)) {
        if (/file:\/\//.test(t)) { p = "own"; info.own.push(t); }
        else { p = "internal"; info.internal++; }
      }
      else if (!info.msg && /^[A-Z][A-Za-z]*(Error)?( \[[A-Z_]+\])?: /.test(t)) { p = "msg"; info.msg = t; }
      else if (t.trim() && i === 1) { p = "src"; info.src = t; }
      rows.push({ t: t, p: p, n: 1 });
    }
    // fold each run of Node-internal frames (node:internal / node:diagnostics_channel) into one marked line
    var out = [];
    for (var k = 0; k < rows.length; k++) {
      var r = rows[k];
      if (r.p === "internal" && /\(?node:/.test(r.t) && out.length && out[out.length - 1].fold) { out[out.length - 1].n++; continue; }
      if (r.p === "internal" && /\(?node:/.test(r.t)) { out.push({ t: "", p: "internal", n: 1, fold: true }); continue; }
      out.push(r);
    }
    out.forEach(function (r) { if (r.fold) r.t = "    … " + r.n + " line" + (r.n > 1 ? "s" : "") + " inside Node itself (folded)"; });
    out.push({ t: "", p: "blank", n: 1 });
    out.push({ t: "[exit code " + exit + (exit === 0 ? ": success]" : ": failure]"), p: "exit", n: 1 });
    info.exit = exit;
    return { rows: out, info: info };
  }

  function frameText(f) {
    var m = /^\s+at (?:(.+?) \()?file:\/\/\S*?([^/\s]+):(\d+):(\d+)\)?$/.exec(f);
    if (!m) return esc(f.trim());
    return (m[1] ? "<code>" + esc(m[1]) + "</code>" : "the top level of the file") + ", line " + m[3] + ", column " + m[4];
  }

  function explain(part, info, prog) {
    var name = info.msg ? info.msg.split(":")[0].replace(/ \[.*$/, "") : "?", msgText = info.msg ? info.msg.slice(info.msg.indexOf(":") + 1).trim() : "";
    switch (part) {
      case "msg": return "Start here. The <b>name</b> before the colon is the kind of crime: <b>" + esc(name) + "</b>, " + (KIND[name] || "an error") + ". After the colon, the <b>message</b> says what happened: <q>" + esc(msgText) + "</q>.";
      case "loc":
        var m = /([^/]+):(\d+)$/.exec(info.loc || "");
        return m ? "The very first line says where: file <code>" + esc(m[1]) + "</code>, line <b>" + m[2] + "</b>. The long <code>file:///…</code> part is the file's full address on this computer." : "No location line.";
      case "src": return "Node copies that line out of your file, so you don't have to go and find it.";
      case "caret":
        var col = info.own.length ? /:(\d+)\)?$/.exec(info.own[0]) : null;
        return "The caret <code>^</code> sits under the exact spot" + (col ? " (column " + col[1] + ", the same number the first footprint gives)" : "") + ". Several carets in a row underline a whole piece of code. But careful: it marks where JavaScript <em>noticed</em> the trouble, not always where you made the mistake.";
      case "own":
        if (!info.own.length) return "<b>None.</b> A " + esc(name) + " is found before the program starts, so there are no footprints in your file at all. Every <code>at</code> line here belongs to Node's loader.";
        return info.own.length + " footprint" + (info.own.length > 1 ? "s" : "") + " in your own file, <b>newest first</b>: " + info.own.map(frameText).join(" &larr; called from ") + ". The first one is where it broke; each line below it is who called it.";
      case "internal": return info.internal ? info.internal + " line" + (info.internal > 1 ? "s" : "") + " from Node's own machinery (<code>node:internal/…</code>). They are the same for every program: skip them." : "No Node-internal lines in this one.";
      case "foot": return "The last line names the Node version that ran it: <code>" + esc((info.foot || "").replace(/^Node\.js /, "")) + "</code>. Mention it when you ask someone for help.";
      case "exit": return "Not printed by Node: the terminal records how the program ended. <b>" + info.exit + "</b> means failure (0 would mean success). Every uncaught error ends a Node program with exit code 1.";
    }
    return "";
  }

  function build(box) {
    var specs;
    try { specs = JSON.parse(box.getAttribute("data-anat12")); } catch (e) { L.report("anat12", "bad JSON in data-anat12"); return; }
    var id = box.id || "anat12";
    box.insertAdjacentHTML("beforeend",
      '<div class="paths an12-tabs" role="group" aria-label="Choose a real crash"><span class="label">CRASHES:</span></div>' +
      '<pre class="term an12-pre" aria-label="The real error output, with the chosen part marked"></pre>' +
      '<ul class="anat-keys an12-keys" aria-label="Choose a part of the note"></ul>' +
      '<p class="narration an12-say"></p><span class="parity"></span><p class="sr-only" aria-live="polite"></p>' +
      '<details><summary>Text version: every part of this note</summary><table class="transcript"><thead><tr><th>Part</th><th>Lines</th></tr></thead><tbody></tbody></table></details>');
    var tabs = box.querySelector(".an12-tabs"), pre = box.querySelector(".an12-pre"), keys = box.querySelector(".an12-keys");
    var say = box.querySelector(".an12-say"), badge = box.querySelector(".parity"), live = box.querySelector("[aria-live]"), tbody = box.querySelector("tbody");
    var cur = null, part = "msg", parsed = {}, bad = 0;

    specs.forEach(function (s, i) {
      var p = L.program(s.program);
      if (!p) { bad++; return; }
      var r = parse(p.stderr, p.exit);
      ["msg", "loc", "src", "caret", "foot"].forEach(function (need) { if (!r.info[need]) { bad++; L.report("anat12", s.program + ": no '" + need + "' part found in the real stderr"); } });
      if (p.exit === 0) { bad++; L.report("anat12", s.program + " did not crash"); }
      parsed[s.program] = r;
      var b = document.createElement("button");
      b.type = "button"; b.className = "path-btn"; b.textContent = s.label || s.program; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { choose(s.program, true); });
      tabs.appendChild(b); s.btn = b;
    });
    ORDER.forEach(function (o) {
      var li = document.createElement("li");
      li.innerHTML = '<button type="button" data-part="' + o[0] + '" aria-pressed="false"><b>' + esc(o[1]) + "</b>" + esc(o[2]) + "</button>";
      li.firstChild.addEventListener("click", function () { light(o[0], true); });
      keys.appendChild(li);
    });

    function light(which, announce) {
      part = which;
      var r = parsed[cur]; if (!r) return;
      var spans = pre.querySelectorAll(".an12-l"), any = false;
      for (var i = 0; i < spans.length; i++) {
        var on = spans[i].getAttribute("data-p") === which;
        spans[i].classList.toggle("on", on);
        spans[i].firstChild.textContent = on ? "▶ " : "  ";
        if (on) any = true;
      }
      var kb = keys.querySelectorAll("button");
      for (var k = 0; k < kb.length; k++) kb[k].setAttribute("aria-pressed", kb[k].getAttribute("data-part") === which ? "true" : "false");
      say.innerHTML = explain(which, r.info, cur) + (any ? "" : " <i>(Nothing to mark in this note.)</i>");
      if (announce) live.textContent = say.textContent;
    }

    function choose(name, announce) {
      cur = name;
      specs.forEach(function (s) { if (s.btn) s.btn.setAttribute("aria-pressed", s.program === name ? "true" : "false"); });
      var r = parsed[name], p = L.program(name);
      pre.innerHTML = '<span class="prompt">you@laptop:~/javascript-ch12$ node ' + esc(name) + "</span>\n" +
        (p.stdout ? '<span class="an12-out">' + esc(p.stdout.replace(/\n$/, "")) + "</span>\n" : "") +
        r.rows.map(function (row) { return '<span class="an12-l p-' + row.p + '" data-p="' + row.p + '"><span class="an12-g" aria-hidden="true">  </span>' + esc(row.t) + "</span>"; }).join("\n");
      tbody.innerHTML = ORDER.map(function (o) {
        var ls = r.rows.filter(function (row) { return row.p === o[0]; }).map(function (row) { return esc(row.t.trim() || "(blank)"); });
        return "<tr><td>" + esc(o[1]) + "</td><td>" + (ls.length ? "<code>" + ls.join("</code><br><code>") + "</code>" : "none") + "<br>" + explain(o[0], r.info, name) + "</td></tr>";
      }).join("");
      light(part, false);
      if (announce) live.textContent = "Showing the real crash of " + name + ". " + say.textContent;
    }

    badge.classList.toggle("bad", bad > 0);
    badge.textContent = bad ? "Some parts were not found in the real runs" : "Every line is the real error output of these " + specs.length + " runs (Node-internal lines folded)";
    if (specs.length && parsed[specs[0].program]) choose(specs[0].program, false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-anat12]");
    for (var i = 0; i < boxes.length; i++) { try { build(boxes[i]); } catch (e) { L.report("anat12", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
