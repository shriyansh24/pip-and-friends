/* Go book, chapter 26 ("Walkie-Talkies and Waiters") additions. Classic deferred script; loads after comic-cast.js.

   1. data-char="kitchenhand": the small kitchen helper from chapter 24, now drawn by comic-critters.js.

   2. data-char="maitred": Hana, the restaurant host (the ServeMux), original to this chapter. She reads each order's
      method and path and seats it with the right waiter. data-prop = "menu" (default, holds the menu book) | "point"
      (points to the right, seating someone); data-mood = "happy" (default) | "stern".

   3. data-char="tablewaiter": Wes, a waiter (a handler), original to this chapter.
      data-prop = "tray" (default, raises a covered plate) | "note" (writes an order on a notepad) | "none".

   4. data-char="radioset": a walkie-talkie (a context). data-label = the name on its little screen (up to 8 characters);
      data-state = "live" (default, radio waves) | "abort" (jagged ABORT bolts, screen marked with a cross) |
      "off" (no waves, dim screen) | "done" (a tick on the screen).

   5. [data-radiochain]: the cancellation stepper. A chain of functions, each holding a walkie-talkie (the ctx it was
      given), beside the program with the next line marked.
      Model: { "program": "chain.go",
               "nodes": [ {"id": "hq", "name": "HQ", "sub": "main · ctx from WithCancel"},
                          {"id": "region", "name": "region", "sub": "...", "parent": "hq"}, ... ],   // a chain or tree
               "steps": [ {"line": 31,                         // the NEXT line to run (null at the end)
                           "state": {"hq": "run", "region": "off", ...},   // off | run | wait | cancel | stop | back
                           "canceled": ["hq", "region"],       // nodes whose ctx is canceled (Done closed) after this step
                           "output": [], "note": "HTML"} ] }
      Parity (any failure turns the badge bad and calls L.report): the last screen equals the real run; every screen is
      a prefix of it; every line number exists; a canceled node's children are canceled in the same step (cancellation
      flows down at once) and a canceled node stays canceled; the error word drawn on a canceled radio
      ("context canceled") appears in the real output.
      Keyboard: the shared stepper (buttons, arrow keys, Space, R). Text version: the transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch26.js loaded before comic.js"); return; }
  var esc = L.esc, S = L.stroke, INK = "#111111";
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }

  /* ---------------- Hana, the host ---------------- */
  L.cast.maitred = { vb: "0 0 160 200", draw: function (el) {
    var prop = el.getAttribute("data-prop") || "menu", stern = el.getAttribute("data-mood") === "stern";
    var SKIN = "#E0A97E", HAIR = "#3B2A20", VEST = "#9B7BEA", SKIRT = "#24407A";
    var out = '<g class="bob">' +
      '<path d="M68 168 V186 M92 168 V186" fill="none"' + S(7) + "/>" +
      '<ellipse cx="64" cy="190" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="96" cy="190" rx="13" ry="6" fill="' + INK + '"/>' +
      '<path d="M54 140 H106 L112 172 H48 Z" fill="' + SKIRT + '"' + S(4) + "/>" +
      '<rect x="73" y="70" width="14" height="16" fill="' + SKIN + '"' + S(3) + "/>" +
      '<path d="M52 88 Q80 78 108 88 L106 146 H54 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M52 88 L72 92 L80 146 H54 Z M108 88 L88 92 L80 146 H106 Z" fill="' + VEST + '"' + S(3.5) + "/>" +
      dot(76, 118, 3) + dot(76, 132, 3) +
      '<path d="M68 86 L80 92 L68 98 Z M92 86 L80 92 L92 98 Z" fill="' + INK + '"/>' + dot(80, 92, 3.5) +
      // name badge
      '<rect x="88" y="104" width="16" height="9" rx="2" fill="#FFD60A"' + S(2) + "/>" +
      // head and hair (a neat bob)
      '<circle cx="80" cy="50" r="24" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M55 58 Q50 22 80 20 Q110 22 105 58 L103 68 Q100 50 96 40 Q80 46 64 40 Q60 50 57 68 Z" fill="' + HAIR + '"' + S(3.5) + "/>" +
      '<g class="eyes">' + dot(71, 52, 3.8) + dot(89, 52, 3.8) + "</g>" +
      (stern ? '<path d="M64 44 l12 4 M96 44 l-12 4" fill="none"' + S(3) + '/><path d="M72 64 h16" fill="none"' + S(3.5) + "/>"
             : '<path d="M71 62 q9 8 18 0" fill="none"' + S(3.5) + '/><circle cx="64" cy="60" r="3.5" fill="#FF9C8E"/><circle cx="96" cy="60" r="3.5" fill="#FF9C8E"/>');
    if (prop === "point") {
      out += '<path d="M106 98 Q130 92 148 84" fill="none"' + S(6) + '/><circle cx="149" cy="84" r="6" fill="' + SKIN + '"' + S(3) + "/>" +
        '<path d="M54 98 Q44 116 56 128" fill="none"' + S(6) + "/>" +
        '<g transform="rotate(-8 56 128)"><rect x="40" y="114" width="30" height="36" rx="3" fill="#B00020"' + S(3.5) + '/><path d="M46 124 h18 M46 132 h14" stroke="#FFF6CC" stroke-width="3"/></g>';
    } else {
      out += '<path d="M54 98 Q40 120 60 130" fill="none"' + S(6) + '/><path d="M106 98 Q120 120 100 130" fill="none"' + S(6) + "/>" +
        '<rect x="56" y="112" width="48" height="36" rx="3" fill="#B00020"' + S(4) + "/>" +
        '<path d="M80 112 V148" fill="none" stroke="#FFF6CC" stroke-width="2.5"/>' +
        '<path d="M62 122 h12 M62 130 h10 M86 122 h12 M86 130 h10" stroke="#FFF6CC" stroke-width="3"/>' +
        '<circle cx="58" cy="130" r="6" fill="' + SKIN + '"' + S(3) + '/><circle cx="102" cy="130" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- Wes, the waiter ---------------- */
  L.cast.tablewaiter = { vb: "0 0 170 200", draw: function (el) {
    var prop = el.getAttribute("data-prop") || "tray";
    var SKIN = "#8D5A3B", VEST = "#2B2B2B";
    var out = '<g class="bob">' +
      '<path d="M68 168 V186 M92 168 V186" fill="none"' + S(7) + "/>" +
      '<ellipse cx="64" cy="190" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="96" cy="190" rx="13" ry="6" fill="' + INK + '"/>' +
      '<path d="M56 140 H104 L106 172 H54 Z" fill="#2B2B2B"' + S(4) + "/>" +
      '<rect x="73" y="70" width="14" height="16" fill="' + SKIN + '"' + S(3) + "/>" +
      '<path d="M54 88 Q80 78 106 88 L104 146 H56 Z" fill="#FFFFFF"' + S(4) + "/>" +
      '<path d="M54 88 L72 94 L78 146 H56 Z M106 88 L88 94 L82 146 H104 Z" fill="' + VEST + '"' + S(3.5) + "/>" +
      '<circle cx="74" cy="116" r="2.6" fill="#FFFFFF"/><circle cx="74" cy="130" r="2.6" fill="#FFFFFF"/>' +
      '<path d="M69 86 L80 92 L69 98 Z M91 86 L80 92 L91 98 Z" fill="#FF5A4E"' + S(2.5) + "/>" + dot(80, 92, 3.5) +
      '<circle cx="80" cy="50" r="24" fill="' + SKIN + '"' + S(4) + "/>" +
      '<path d="M57 44 Q58 22 80 24 Q102 22 103 44 Q92 34 80 36 Q68 34 57 44 Z" fill="' + INK + '"/>' +
      '<g class="eyes">' + dot(71, 50, 3.8) + dot(89, 50, 3.8) + "</g>" +
      '<path d="M70 62 q10 -6 20 0 q-10 5 -20 0 Z" fill="' + INK + '"/>' +
      '<path d="M72 68 q8 5 16 0" fill="none"' + S(3) + "/>" +
      // left arm with a towel over it
      '<path d="M54 98 Q42 116 54 128" fill="none"' + S(6) + "/>" +
      '<path d="M42 110 H62 V140 L56 136 L50 141 L44 136 Z" fill="#FFFFFF"' + S(3) + "/>";
    if (prop === "tray") {
      out += '<path d="M106 98 Q126 86 130 66" fill="none"' + S(6) + "/>" +
        '<path d="M106 58 Q130 22 154 58 Z" fill="#DDE8FF"' + S(4) + '/><circle cx="130" cy="32" r="4" fill="#DDE8FF"' + S(3) + "/>" +
        '<ellipse cx="130" cy="60" rx="32" ry="6" fill="#9AA3AE"' + S(4) + "/>" +
        '<circle cx="130" cy="68" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    } else if (prop === "note") {
      out += '<path d="M106 98 Q118 110 108 120" fill="none"' + S(6) + "/>" +
        '<rect x="92" y="104" width="30" height="36" rx="3" fill="#FFF6CC"' + S(3.5) + '/><path d="M97 114 h20 M97 122 h16 M97 130 h18" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M124 96 L112 128" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="108" cy="120" r="6" fill="' + SKIN + '"' + S(3) + "/>";
    } else {
      out += '<path d="M106 98 Q118 116 106 128" fill="none"' + S(6) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- a walkie-talkie (one context) ---------------- */
  L.cast.radioset = { vb: "0 0 120 170", draw: function (el) {
    var st = el.getAttribute("data-state") || "live", lab = String(el.getAttribute("data-label") || "").slice(0, 8);
    var screen = st === "abort" ? "#FFE1E1" : st === "off" ? "#F3F3F3" : st === "done" ? "#C9F2D9" : "#DDE8FF";
    var out = '<g class="bob">' +
      '<rect x="30" y="6" width="11" height="44" rx="5" fill="' + INK + '"/>' +
      '<rect x="18" y="40" width="84" height="122" rx="16" fill="' + (st === "off" ? "#E7E7E7" : "#FFD60A") + '"' + S(4) + "/>" +
      '<rect x="30" y="54" width="60" height="38" rx="6" fill="' + screen + '"' + S(3) + "/>" +
      (lab ? '<text x="60" y="' + (st === "abort" || st === "done" ? 68 : 79) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + (lab.length > 6 ? 11 : lab.length > 4 ? 13 : 16) + '" fill="' + INK + '">' + esc(lab) + "</text>" : "") +
      '<path d="M34 108 H86 M34 118 H86 M34 128 H86 M34 138 H86" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="100" y="66" width="10" height="28" rx="3" fill="#FF5A4E"' + S(3) + "/>";
    if (st === "abort") {
      out += '<path d="M44 76 l32 12 M76 76 l-32 12" stroke="#B00020" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M52 4 l10 10 -8 4 12 12 M8 22 l12 4 -6 8 14 4" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>';
    } else if (st === "done") {
      out += '<path d="M48 80 l8 7 16 -14" fill="none" stroke="#1B5E20" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>';
    } else if (st === "live") {
      out += '<path d="M50 14 q8 10 0 20 M58 8 q14 16 0 32 M22 14 q-8 10 0 20" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
    }
    return out + "</g>";
  } };

  /* ---------------- the cancellation stepper ---------------- */
  var WORDS = { off: "· not called yet", run: "▶ running", wait: "⏸ waiting", cancel: "! pressed ABORT: cancel()", stop: "✖ heard ABORT", back: "✓ returned" };
  var RADIO = { off: "off", run: "live", wait: "live", cancel: "abort", stop: "abort", back: "done" };
  var ERRWORD = "context canceled";

  function mountChain(box) {
    var id = box.getAttribute("data-radiochain"), el = document.getElementById(id);
    if (!el) { L.report("radiochain:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent), prog = L.program(m.program);
    if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n"), real = L.shown(prog), realLines = real.replace(/\n$/, "").split("\n");
    var ok = true, why = [], byId = {};
    m.nodes.forEach(function (n) { byId[n.id] = n; });
    function bad(msg) { ok = false; why.push(msg); L.report("radiochain:" + id, msg); }
    var before = [];
    m.steps.forEach(function (s, i) {
      var o = s.output || [], c = s.canceled || [];
      for (var k = 0; k < o.length; k++) if (o[k] !== realLines[k]) { bad("step " + (i + 1) + ": screen line " + (k + 1) + " is not in the real run of " + m.program); break; }
      if (s.line != null && (s.line < 1 || s.line > lines.length)) bad("step " + (i + 1) + ": no line " + s.line);
      m.nodes.forEach(function (n) {
        if (n.parent && c.indexOf(n.parent) >= 0 && c.indexOf(n.id) < 0) bad("step " + (i + 1) + ": " + n.parent + " is canceled but its child " + n.id + " is not");
      });
      before.forEach(function (x) { if (c.indexOf(x) < 0) bad("step " + (i + 1) + ": " + x + " was canceled and became live again"); });
      before = c.slice();
    });
    if (before.length && real.indexOf(ERRWORD) < 0) bad("the real run never prints '" + ERRWORD + "'");
    var last = m.steps[m.steps.length - 1].output || [];
    if ((last.length ? last.join("\n") + "\n" : "") !== real) bad("the last step's screen is not the real output of " + m.program);
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Matches the real run of " + m.program : "Does not match the real run: " + why[0]; par.classList.toggle("bad", !ok); }

    var wrap = box.querySelector(".rc-wrap"), stage = "";
    m.nodes.forEach(function (n, i) {
      if (i > 0) stage += '<div class="rc-link" data-link="' + esc(n.id) + '"><span class="arr wide-only">→</span><span class="arr phone-only">↓</span><span class="w">ctx</span></div>';
      stage += '<div class="rc-node" data-node="' + esc(n.id) + '"><svg class="char sm" data-char="radioset"></svg>' +
        '<span class="name">' + esc(n.name) + '</span><span class="sub">' + n.sub + '</span><span class="st"></span><span class="err"></span></div>';
    });
    wrap.innerHTML = '<ol class="rc-code" tabindex="0" aria-label="The program, ' + esc(m.program) + '">' + lines.map(function (l) { return "<li>" + (L.highlight(l) || " ") + "</li>"; }).join("") + "</ol>" +
      '<div class="rc-stage" aria-hidden="true" data-reserve>' + stage + "</div>";
    var code = wrap.querySelector(".rc-code"), lis = code.querySelectorAll("li");
    L.hangLines(lis);   // on phones the code wraps with a hanging indent and scrolls up and down only (go-ch26.css)
    var out = box.querySelector(".screen pre"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    function errOf(s, nid) { return (s.canceled || []).indexOf(nid) >= 0 ? ERRWORD : "nil"; }
    function render(st, announce) {
      var s = m.steps[st.step], prev = st.step > 0 ? m.steps[st.step - 1] : { canceled: [] };
      for (var k = 0; k < lis.length; k++) lis[k].classList.toggle("now", s.line === k + 1);
      if (s.line) { var li = lis[s.line - 1]; code.scrollTop = Math.max(0, li.offsetTop - code.clientHeight / 2 + li.offsetHeight / 2); }
      m.nodes.forEach(function (n) {
        var node = wrap.querySelector('[data-node="' + n.id + '"]'), state = (s.state || {})[n.id] || "off";
        node.className = "rc-node " + state;
        node.querySelector(".st").textContent = WORDS[state] || state;
        var e = errOf(s, n.id);
        node.querySelector(".err").innerHTML = state === "off" ? "" : "ctx.Err(): <b>" + esc(e) + "</b>";
        var svg = node.querySelector("svg");
        var want = RADIO[state] || "live";
        if (svg.getAttribute("data-state") !== want) { svg.setAttribute("data-state", want); L.drawCast(node); }
        if (n.parent) {
          var link = wrap.querySelector('[data-link="' + n.id + '"]'), nowC = (s.canceled || []).indexOf(n.id) >= 0, wasC = (prev.canceled || []).indexOf(n.id) >= 0;
          link.className = "rc-link" + (nowC && !wasC ? " abort" : nowC ? " closed" : "");
          link.querySelector(".w").textContent = nowC && !wasC ? "ABORT!" : nowC ? "Done closed" : "ctx";
        }
      });
      var o = s.output || [];
      out.innerHTML = o.length ? o.map(esc).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". " + m.nodes.map(function (n) { var x = (s.state || {})[n.id] || "off"; return n.name + ": " + (WORDS[x] || x) + (x === "off" ? "" : ", Err " + errOf(s, n.id)); }).join(". ") + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    L.drawCast(wrap);
    L.runner(box, m.steps.length, render, { reserve: true }).reset(m.steps.length);
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) {
      return "<tr><td>" + (i + 1) + "</td><td>" + (s.line == null ? "end" : s.line) + "</td>" + m.nodes.map(function (n) { var x = (s.state || {})[n.id] || "off"; return "<td>" + esc(WORDS[x] || x) + (x === "off" ? "" : "; Err " + esc(errOf(s, n.id))) + "</td>"; }).join("") + "<td>" + s.note + "</td></tr>";
    }).join("");
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-radiochain]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._rcMounted) continue; boxes[i]._rcMounted = true; try { mountChain(boxes[i]); } catch (e) { L.report("radiochain", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
