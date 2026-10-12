/* C++ book, chapter 14 extension: "Coat Checks and Gadgets".
   Adds no widget that invents output; everything it shows is read from the captured runs in data/cpp-ch14.js.
   It adds:
     - Mo the coat-check attendant (cast member "attendant"): stands behind the coat-check counter with a rack of
       numbered hooks behind him. He is the face of std::map: hand over a ticket (key), get your coat (value).
       data-mood = happy | surprised | focus | worried | normal | stern; data-mouth = smile | o | flat | frown | shout;
       data-arms = counter (default) | ticket (holds up a ticket) | stop (one palm raised: no such ticket);
       data-ticket = the number on the held ticket (at most 4 characters, default 7).
     - [data-first-error="name.cpp"]: the detective's first clue in a long compiler message. It finds the first line
       of the program's captured stderr that contains "error:" and shows it, with a parity badge that says which
       capture it came from. The whole message stays available in a terminal right after it. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch14.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  /* ---------------- Mo the coat-check attendant ---------------- */
  function face(mood, mouth) {
    var e;
    switch (mood) {
      case "happy": e = '<path d="M71 70 q6 -8 12 0 M89 70 q6 -8 12 0" fill="none"' + S(4) + "/>"; break;
      case "surprised": e = '<circle cx="77" cy="68" r="6.5" fill="#fff"' + S(3) + '/><circle cx="95" cy="68" r="6.5" fill="#fff"' + S(3) + '/><circle cx="77" cy="69" r="2.8" fill="' + INK + '"/><circle cx="95" cy="69" r="2.8" fill="' + INK + '"/>'; break;
      case "focus": e = '<path d="M70 69 h13 M89 69 h13" fill="none"' + S(5) + "/>"; break;
      case "worried": e = '<circle cx="77" cy="70" r="4" fill="' + INK + '"/><circle cx="95" cy="70" r="4" fill="' + INK + '"/><path d="M69 61 l11 -3 M103 61 l-11 -3" fill="none"' + S(3.5) + "/>"; break;
      case "stern": e = '<circle cx="77" cy="70" r="4" fill="' + INK + '"/><circle cx="95" cy="70" r="4" fill="' + INK + '"/><path d="M69 58 l12 5 M103 58 l-12 5" fill="none"' + S(4) + "/>"; break;
      default: e = '<circle cx="77" cy="69" r="4.5" fill="' + INK + '"/><circle cx="95" cy="69" r="4.5" fill="' + INK + '"/>';
    }
    var m = mouth || (mood === "worried" || mood === "stern" ? "flat" : mood === "surprised" ? "o" : "smile");
    var mm = m === "o" ? '<circle cx="86" cy="85" r="4.5" fill="' + INK + '"/>'
      : m === "frown" ? '<path d="M77 88 q9 -8 18 0" fill="none"' + S(4) + "/>"
      : m === "flat" ? '<path d="M78 85 h16" fill="none"' + S(4) + "/>"
      : m === "shout" ? '<path d="M76 81 h20 q-1 12 -10 12 q-9 0 -10 -12 z" fill="' + INK + '"/>'
      : '<path d="M76 82 q10 9 20 0" fill="none"' + S(4) + "/>";
    return '<g class="eyes">' + e + "</g>" + mm;
  }
  function hook(x, n, coat) {
    return '<path d="M' + x + ' 26 v10 q0 6 6 6" fill="none"' + S(3) + "/>" +
      (coat ? '<path d="M' + (x - 9) + " 44 q9 -8 18 0 l4 34 h-26 z" + '" fill="' + coat + '"' + S(3) + "/>" : "") +
      '<rect x="' + (x - 14) + '" y="3" width="28" height="21" rx="3" fill="#FFFFFF"' + S(2.5) + "/>" +
      '<text class="lbl-deco" x="' + x + '" y="20" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16" fill="' + INK + '">' + n + "</text>";
  }
  L.cast.attendant = { vb: "0 0 172 200", draw: function (el) {
    var mood = el.getAttribute("data-mood") || "normal", arms = el.getAttribute("data-arms") || "counter";
    var t = String(el.getAttribute("data-ticket") || "7").slice(0, 4);
    var skin = "#C98B5E", hands;
    if (arms === "ticket") {
      hands = '<circle cx="54" cy="140" r="8" fill="' + skin + '"' + S(3) + "/>" +
        '<path d="M124 138 V104" fill="none"' + S(9) + '/><path d="M124 138 V104" fill="none" stroke="#E63946" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="104" y="76" width="44" height="28" rx="3" fill="#FFD60A"' + S(3) + "/>" +
        '<circle cx="110" cy="90" r="3" fill="' + INK + '"/>' +
        '<text x="129" y="97" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">' + esc(t) + "</text>" +
        '<circle cx="124" cy="106" r="8" fill="' + skin + '"' + S(3) + "/>";
    } else if (arms === "stop") {
      hands = '<circle cx="54" cy="140" r="8" fill="' + skin + '"' + S(3) + "/>" +
        '<path d="M122 138 V108" fill="none"' + S(9) + '/><path d="M122 138 V108" fill="none" stroke="#E63946" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M112 108 v-14 q0 -4 4 -4 q3 0 3 4 v-4 q0 -4 4 -4 q3 0 3 4 v2 q0 -4 4 -4 q3 0 3 4 v18 q0 8 -10 8 q-11 0 -11 -10 z" fill="' + skin + '"' + S(3) + "/>";
    } else {
      hands = '<circle cx="56" cy="140" r="8" fill="' + skin + '"' + S(3) + '/><circle cx="116" cy="140" r="8" fill="' + skin + '"' + S(3) + "/>";
    }
    return '<g class="bob">' +
      /* the back wall with a rail of numbered hooks */
      '<rect x="6" y="2" width="160" height="150" rx="8" fill="#F4F1EA"' + S(3.5) + "/>" +
      '<path d="M10 26 H162" fill="none"' + S(4) + "/>" +
      hook(24, "3", "#7FB2FF") + hook(148, "12", "#FF5A4E") +
      /* body: red waistcoat over a white shirt */
      '<path d="M40 140 Q42 108 86 106 Q130 108 132 140 Z" fill="#E63946"' + S(3.5) + "/>" +
      '<path d="M74 108 L86 128 L98 108 Z" fill="#FFFFFF"' + S(3) + "/>" +
      '<circle cx="86" cy="134" r="2.6" fill="' + INK + '"/>' +
      /* head, little round cap with a band */
      '<circle cx="86" cy="76" r="24" fill="' + skin + '"' + S(3.5) + "/>" +
      '<path d="M66 60 Q86 36 106 60 Z" fill="#E63946"' + S(3.5) + '/><path d="M64 60 H108" fill="none"' + S(4) + "/>" +
      '<path d="M66 56 H106" fill="none" stroke="#FFD60A" stroke-width="3"/>' +
      face(mood, el.getAttribute("data-mouth")) +
      /* the counter with its ticket book */
      '<rect x="6" y="140" width="160" height="26" fill="#E7C08A"' + S(3.5) + "/>" + hands +
      '<rect x="22" y="170" width="128" height="27" rx="4" fill="#FFF6CC"' + S(3) + "/>" +
      '<text class="lbl-deco" x="86" y="190" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="17" fill="' + INK + '">COAT CHECK</text>' +
      "</g>";
  } };

  /* ---------------- the first error line of a long message ---------------- */
  P.comic.ext(function () {
    var spots = document.querySelectorAll("[data-first-error]");
    for (var i = 0; i < spots.length; i++) {
      var box = spots[i], name = box.getAttribute("data-first-error"), q = L.program(name);
      var pre = box.querySelector("pre"), badge = box.querySelector(".parity");
      var line = null, count = 0;
      if (q && q.stderr) {
        var lines = q.stderr.split("\n");
        count = lines.filter(function (s) { return s.length; }).length;
        for (var j = 0; j < lines.length; j++) { if (/\berror:/.test(lines[j])) { line = lines[j]; break; } }
      }
      if (line === null) {
        if (pre) pre.textContent = "(no error line found)";
        if (badge) { badge.textContent = "No error line in the capture of " + name; badge.classList.add("bad"); }
        L.report("first-error", "no error line in " + name);
        continue;
      }
      /* split "file:line:col: error: message" so the reader sees where, then what */
      var k = line.indexOf("error:");
      pre.innerHTML = '<span class="fe-where">' + esc(line.slice(0, k)) + '</span><span class="err">' + esc(line.slice(k)) + "</span>";
      /* the line count also appears in the summary of the <details> right after the box */
      var nx = box.nextElementSibling, cnts = box.querySelectorAll("[data-line-count]");
      if (nx && nx.matches("details.long-msg")) cnts = [].slice.call(cnts).concat([].slice.call(nx.querySelectorAll("[data-line-count]")));
      for (var c = 0; c < cnts.length; c++) cnts[c].textContent = String(count);
      if (badge) badge.textContent = "First error line of the real g++ run of " + name + " (" + count + " lines in all)";
    }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
