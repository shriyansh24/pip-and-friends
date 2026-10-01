/* Go book, chapter 22 ("Customs and Clocks") additions. Classic deferred script; loads after comic-cast.js.

   1. data-char="officer": Officer Ines, the customs officer (an original prop character for this chapter).
      Attributes: data-mood = "happy" (default) | "stern"; data-prop = "stamp" (default, raised rubber stamp) | "form".

   2. [data-photo]: the magic-photo layout builder. The reader builds a Go time layout out of chips and sees what
      t.Format(layout) prints for one fixed moment, piece by piece.
      Model: { "tokens": "tokens.go",      // a captured program printing  TOKEN => [VALUE]  for every token chip
               "groups": [ {"name": "year", "photo": "2006", "items": [{"t": "2006", "say": "4-digit year"}]} ],
               "seps": [" ", "-", "/", ":", ", "],            // copied as they are
               "literals": ["YYYY", "MM", "DD"],              // not tokens: also copied as they are
               "presets": [ {"chips": ["2006", "-", "01", "-", "02"], "program": "format.go"},       // line "LAYOUT => OUTPUT"
                            {"chips": ["YYYY", "-", "MM", "-", "DD"], "program": "yyyy.go", "line": true} ],  // whole output line
               "strip": [3, 1, 2, 4, 5, 6, 7, 8, 0],                // optional: photo-strip order (Mon Jan 2 15 04 05 PM MST 2006)
               "start": 0 }
      Where the pieces come from: every token's piece is read from the real run of "tokens"; separators and
      literals are copied unchanged. Parity: (a) every token chip must appear in that run; (b) for every preset,
      the joined pieces must equal what the real t.Format printed for that layout (format.go's "LAYOUT => OUTPUT"
      line, or a whole output line for "line": true). Any mismatch turns the badge bad and calls L.report().
      With these chips, no two pieces can merge into a different token (for example there is no "5" chip that
      could follow "1" to make "15"), so joining pieces is exactly what Go's Format does for any layout built here.
      Keyboard: every chip, Undo, Clear and preset is a button. Text version: the token table in the <details>. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch22.js loaded before comic.js"); return; }
  var esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------------- Officer Ines, the customs officer ---------------- */
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 4) + '" fill="' + INK + '"/>'; }
  L.cast.officer = { vb: "0 0 160 200", draw: function (el) {
    var stern = el.getAttribute("data-mood") === "stern", prop = el.getAttribute("data-prop") || "stamp";
    var NAVY = "#3A5BA0", SKIN = "#F2C9A0";
    var out = '<g class="bob">' +
      // legs and shoes
      '<path d="M66 168 V186 M94 168 V186" fill="none"' + S(7) + "/>" +
      '<ellipse cx="62" cy="190" rx="13" ry="6" fill="' + INK + '"/><ellipse cx="98" cy="190" rx="13" ry="6" fill="' + INK + '"/>' +
      // jacket with lapels, buttons and a star badge
      '<path d="M44 108 Q44 96 58 94 H102 Q116 96 116 108 V170 H44 Z" fill="' + NAVY + '"' + S(4) + "/>" +
      '<path d="M66 94 L80 120 L94 94" fill="#DDE8FF"' + S(3.5) + "/>" +
      '<path d="M80 120 V166" fill="none"' + S(2.5) + "/>" + dot(86, 134, 3) + dot(86, 152, 3) +
      '<path d="M102 112 l3.5 7 7.5 1 -5.5 5 1.5 7.5 -7 -4 -7 4 1.5 -7.5 -5.5 -5 7.5 -1 z" fill="#FFD60A"' + S(2.5) + "/>" +
      // head
      '<circle cx="80" cy="64" r="28" fill="' + SKIN + '"' + S(4) + "/>" +
      // peaked cap with badge
      '<path d="M50 50 Q52 26 80 24 Q108 26 110 50 Z" fill="' + NAVY + '"' + S(4) + "/>" +
      '<path d="M46 52 Q80 44 114 52 Q114 60 106 58 Q80 52 54 58 Q46 60 46 52 Z" fill="' + INK + '"/>' +
      '<rect x="72" y="32" width="16" height="12" rx="3" fill="#FFD60A"' + S(2.5) + "/>" +
      // face
      '<g class="eyes">' + dot(70, 68, 4.5) + dot(90, 68, 4.5) + "</g>" +
      (stern ? '<path d="M63 59 l12 4 M97 59 l-12 4" fill="none"' + S(3.5) + '/><path d="M71 82 h18" fill="none"' + S(3.5) + "/>"
             : '<path d="M70 80 q10 9 20 0" fill="none"' + S(3.5) + "/>");
    if (prop === "form") {
      // both hands hold a form with fields
      out += '<path d="M48 112 Q34 130 52 140 M112 112 Q126 130 108 140" fill="none"' + S(6) + "/>" +
        '<rect x="46" y="118" width="68" height="46" rx="4" fill="#FFF6CC"' + S(3.5) + "/>" +
        '<path d="M54 130 h22 M82 130 h24 M54 142 h22 M82 142 h24 M54 154 h22 M82 154 h16" fill="none"' + S(2.5) + "/>" +
        '<circle cx="52" cy="140" r="7" fill="' + SKIN + '"' + S(3) + '/><circle cx="108" cy="140" r="7" fill="' + SKIN + '"' + S(3) + "/>";
    } else {
      // left hand down holding a form, right hand raises a rubber stamp
      out += '<path d="M46 110 Q30 128 36 146" fill="none"' + S(6) + "/>" +
        '<rect x="18" y="140" width="34" height="42" rx="3" fill="#FFF6CC"' + S(3) + "/>" +
        '<path d="M24 152 h22 M24 160 h22 M24 168 h14" fill="none"' + S(2) + "/>" +
        '<circle cx="36" cy="146" r="7" fill="' + SKIN + '"' + S(3) + "/>" +
        '<path d="M114 108 Q132 96 134 74" fill="none"' + S(6) + "/>" +
        '<path d="M126 58 h16 v10 h-16 z" fill="#FF5A4E"' + S(3) + "/>" +
        '<path d="M130 40 h8 v18 h-8 z" fill="#FF5A4E"' + S(3) + '/><circle cx="134" cy="36" r="7" fill="#FF5A4E"' + S(3) + "/>" +
        '<rect x="122" y="68" width="24" height="7" rx="2" fill="' + INK + '"/>' +
        '<circle cx="134" cy="76" r="7" fill="' + SKIN + '"' + S(3) + "/>";
    }
    return out + "</g>";
  } };

  /* ---------------- the magic-photo layout builder ---------------- */
  var VIS = { " ": "space", ", ": "comma+space" };

  function mount(box) {
    var id = box.getAttribute("data-photo"), el = document.getElementById(id);
    if (!el) { L.report("photo:" + id, "missing model"); return; }
    var m = JSON.parse(el.textContent);
    var prog = L.program(m.tokens);
    if (!prog) return;
    var val = {}, ok = true, problems = 0;
    prog.stdout.replace(/\n$/, "").split("\n").forEach(function (line) {
      var mm = /^(.*) => \[(.*)\]$/.exec(line);
      if (mm) val[mm[1]] = mm[2];
    });
    var groupOf = {};
    m.groups.forEach(function (g) {
      g.items.forEach(function (it) {
        groupOf[it.t] = g;
        if (!(it.t in val)) { ok = false; problems++; L.report("photo:" + id, "token " + it.t + " is not in the real run of " + m.tokens); }
      });
    });
    function isTok(c) { return Object.prototype.hasOwnProperty.call(groupOf, c); }
    function piece(c) { return isTok(c) ? val[c] : c; }
    function layoutOf(chips) { return chips.join(""); }
    function outOf(chips) { return chips.map(piece).join(""); }

    // presets: check each against its real run
    m.presets.forEach(function (pr) {
      var q = L.program(pr.program), lay = layoutOf(pr.chips), got = outOf(pr.chips), real = null;
      if (q) {
        var lines = q.stdout.replace(/\n$/, "").split("\n");
        if (pr.line) { if (lines.indexOf(got) >= 0) real = got; }
        else lines.forEach(function (l) { if (l.indexOf(lay + " => ") === 0) real = l.slice(lay.length + 4); });
      }
      pr._real = real;
      if (real === null || real !== got) { ok = false; problems++; L.report("photo:" + id, "preset " + lay + " gives " + got + " here, but the real run of " + pr.program + " says " + real); }
    });
    var par = box.querySelector(".parity");
    if (par) {
      par.textContent = ok ? "Every piece comes from the real run of " + m.tokens + ", and all " + m.presets.length + " sample layouts match real t.Format runs"
                           : problems + " piece(s) do not match the real runs";
      par.classList.toggle("bad", !ok);
    }

    var wrap = box.querySelector(".ph-wrap");
    wrap.innerHTML =
      '<div class="ph-strip" aria-hidden="true"><p class="ph-title">THE MAGIC PHOTO · ✓ = used in your layout</p>' +
        (m.strip || m.groups.map(function (g, i) { return i; })).map(function (i) { var g = m.groups[i]; return '<div class="ph-part" data-g="' + i + '"><code>' + esc(g.photo) + "</code><small>" + esc(g.name) + '</small><span class="mark">&nbsp;</span></div>'; }).join("") +
      "</div>" +
      '<div class="ph-table-wrap"><div class="ph-table-slot"></div></div>' +
      '<p class="ph-result"></p>' +
      '<div class="ph-palette" role="group" aria-label="Pieces you can add to the layout">' +
        m.groups.map(function (g) {
          return '<div class="ph-group"><span class="glab">' + esc(g.name) + "</span>" + g.items.map(function (it) {
            return '<button type="button" class="path-btn ph-chip" data-chip="' + esc(it.t) + '" aria-label="add ' + esc(it.t) + ", " + esc(it.say) + '">' + esc(it.t) + "</button>";
          }).join("") + "</div>";
        }).join("") +
        '<div class="ph-group"><span class="glab">copy as-is</span>' + m.seps.map(function (s) {
          return '<button type="button" class="path-btn ph-chip sep" data-chip="' + esc(s) + '" aria-label="add ' + esc(VIS[s] || s) + '">' + (VIS[s] ? esc(s.trim()) + '<span class="vis">' + esc(VIS[s]) + "</span>" : esc(s)) + "</button>";
        }).join("") + m.literals.map(function (s) {
          return '<button type="button" class="path-btn ph-chip lit" data-chip="' + esc(s) + '" aria-label="add the letters ' + esc(s) + '">' + esc(s) + "</button>";
        }).join("") + "</div>" +
      "</div>" +
      '<div class="ph-tools"><button type="button" class="btn" data-ph="undo">Undo last piece</button><button type="button" class="btn" data-ph="clear">Clear</button></div>' +
      '<div class="ph-presets"><span class="label">TRY A REAL ONE:</span>' + m.presets.map(function (pr, i) {
        return '<button type="button" class="path-btn" aria-pressed="false" data-p="' + i + '"><code>' + esc(layoutOf(pr.chips)) + "</code></button>";
      }).join("") + "</div>";

    var chips = [], current = -1;
    var slot = wrap.querySelector(".ph-table-slot"), res = wrap.querySelector(".ph-result"), live = box.querySelector("[aria-live]"), note = box.querySelector(".narration");
    var parts = wrap.querySelectorAll(".ph-part"), pbtns = wrap.querySelectorAll(".ph-presets .path-btn");

    function render(announce) {
      var lay = layoutOf(chips), out = outOf(chips);
      if (!chips.length) slot.innerHTML = '<p class="ph-empty">Your layout is empty. Click pieces below, or try a real one.</p>';
      else slot.innerHTML = '<table class="ph-table"><tbody><tr><th scope="row">LAYOUT</th>' +
        chips.map(function (c) { var t = isTok(c); return '<td class="' + (t ? "tok" : "lit") + '"><code>' + esc(c) + "</code><small>" + (t ? esc(groupOf[c].name) : "as-is") + "</small></td>"; }).join("") +
        '</tr><tr class="out"><th scope="row">PRINTS</th>' +
        chips.map(function (c) { var t = isTok(c); return '<td class="' + (t ? "tok" : "lit") + '"><samp>' + esc(piece(c)) + "</samp></td>"; }).join("") + "</tr></tbody></table>";
      res.innerHTML = 't.Format(<code>"' + esc(lay) + '"</code>) → <samp>' + (out ? esc(out) : "(nothing)") + "</samp>" +
        (current >= 0 ? " <b>✓ same as the real run of " + esc(m.presets[current].program) + "</b>" : "");
      for (var i = 0; i < parts.length; i++) {
        var used = m.groups[Number(parts[i].getAttribute("data-g"))].items.some(function (it) { return chips.indexOf(it.t) >= 0; });
        parts[i].classList.toggle("used", used);
        parts[i].querySelector(".mark").textContent = used ? "✓ used" : " ";
      }
      for (var k = 0; k < pbtns.length; k++) pbtns[k].setAttribute("aria-pressed", String(k === current));
      var lits = chips.filter(function (c) { return !isTok(c) && m.literals.indexOf(c) >= 0; });
      if (note) note.innerHTML = !chips.length ? "Start with a piece from the photo, such as <code>2006</code>." :
        lits.length ? "<b>" + esc(lits[0]) + "</b> isn't part of the magic photo, so Go copies it letter for letter. That's exactly the <code>YYYY-MM-DD</code> mistake." :
        "Each solid box is a piece of the magic photo, replaced by the same piece of the delivery moment. Dashed boxes are copied unchanged.";
      if (live && announce) live.textContent = "Layout " + (lay || "empty") + " prints " + (out || "nothing") + ".";
    }
    wrap.addEventListener("click", function (e) {
      var c = e.target.closest(".ph-chip"), t = e.target.closest("[data-ph]"), p = e.target.closest(".ph-presets .path-btn");
      if (c) { if (chips.length < 14) chips.push(c.getAttribute("data-chip")); current = -1; render(true); }
      else if (t) { if (t.getAttribute("data-ph") === "undo") chips.pop(); else chips = []; current = -1; render(true); }
      else if (p) { current = Number(p.getAttribute("data-p")); chips = m.presets[current].chips.slice(); render(true); }
    });
    // text version: every token
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.groups.map(function (g) {
      return g.items.map(function (it) { return "<tr><td><code>" + esc(it.t) + "</code></td><td>" + esc(g.name) + ": " + esc(it.say) + "</td><td><samp>" + esc(val[it.t] == null ? "?" : val[it.t]) + "</samp></td></tr>"; }).join("");
    }).join("") + m.literals.map(function (s) { return "<tr><td><code>" + esc(s) + "</code></td><td>not a token: copied as-is</td><td><samp>" + esc(s) + "</samp></td></tr>"; }).join("");
    if (m.start != null) { current = m.start; chips = m.presets[current].chips.slice(); }
    render(false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-photo]");
    for (var i = 0; i < boxes.length; i++) { if (boxes[i]._phMounted) continue; boxes[i]._phMounted = true; try { mount(boxes[i]); } catch (e) { L.report("photo", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
