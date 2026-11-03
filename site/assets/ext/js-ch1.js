/* JavaScript book, chapter 1 additions ("Two Kitchens, One Recipe"). Classic deferred script, loaded after
   comic-cast.js. One job, local to this page:

   The kitchen inspector ([data-kitchens]): pick a recipe word, guess where it comes from, then see what the two
   real runs (kitchen_check.js in Node, kitchen_check.html in headless Chromium) printed for it. Every yes/no is
   read from the captures, and the parity badge checks that each card's answer agrees with both runs.
   (The engine now draws Kit in walkers and on maps and says "Real run", so the old guide swap, the wording rewrite
   and the capture clean-up that used to live here are gone.) */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch1.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------- the kitchen inspector ---------- */
  var KINDS = {
    language: { t: "The language itself", where: "every kitchen understands it", node: true, browser: true },
    both: { t: "A host tool both kitchens have", where: "each kitchen brings its own", node: true, browser: true },
    browser: { t: "Browser kitchen only", where: "a host tool of the browser", node: false, browser: true },
    node: { t: "Node kitchen only", where: "a host tool of Node", node: true, browser: false }
  };
  /* "Math true" -> {Math: true}: kitchen_check prints a name, a space, then true or false */
  function presence(name) {
    var p = L.program(name), map = {};
    if (!p) return null;
    L.shown(p).split(/\r?\n/).forEach(function (line) { var m = /^(\S+) (true|false)$/.exec(line); if (m) map[m[1]] = m[2] === "true"; });
    return map;
  }
  function mountKitchens(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-kitchens")).textContent);
    var inNode = presence(m.node), inBrowser = presence(m.browser);
    if (!inNode || !inBrowser) return;
    var bad = 0;
    m.cards.forEach(function (c) {
      var k = KINDS[c.kind];
      if (!k) { bad++; L.report("kitchens", "unknown kind " + c.kind); return; }
      if (c.name) {
        c.n = inNode[c.name]; c.b = inBrowser[c.name];
        if (c.n !== k.node || c.b !== k.browser) { bad++; L.report("kitchens", c.code + ": the real runs say node=" + c.n + ", browser=" + c.b + ", which does not fit '" + c.kind + "'"); }
      }
      if (c.proof) {
        var q = L.program(c.proof.program);
        c.proofOk = !!q && L.shown(q).split(/\r?\n/).indexOf(c.proof.line) >= 0;   // pty transcripts end echoed lines with \r\n
        if (!c.proofOk) { bad++; L.report("kitchens", c.code + ": proof line not found in " + c.proof.program); }
      }
    });
    var cards = box.querySelector(".ks-cards"), ask = box.querySelector(".ks-ask"), out = box.querySelector(".ks-result");
    var live = box.querySelector("[aria-live]"), par = box.querySelector(".parity"), tb = box.querySelector(".transcript tbody");
    if (par) { par.textContent = bad ? bad + " card(s) disagree with the real runs" : "Every ✓ and ✗ comes from the two real runs"; par.classList.toggle("bad", !!bad); }
    cards.innerHTML = '<span class="label">PICK A WORD:</span>' + m.cards.map(function (c, i) { return '<button type="button" class="path-btn" aria-pressed="false" data-c="' + i + '"><code>' + esc(c.code) + "</code></button>"; }).join("");
    ask.innerHTML = '<span class="label">YOUR GUESS:</span>' + Object.keys(KINDS).map(function (k) { return '<button type="button" class="path-btn" aria-pressed="false" data-k="' + k + '">' + esc(KINDS[k].t) + "</button>"; }).join("");
    var cur = 0, guessed = null;
    function mark(v) { return v === true ? '<span class="ks-yes">✓ yes</span>' : v === false ? '<span class="ks-no">✗ no</span>' : '<span class="ks-na">see note</span>'; }
    function paint(announce) {
      var c = m.cards[cur], k = KINDS[c.kind];
      var cb = cards.querySelectorAll(".path-btn"); for (var i = 0; i < cb.length; i++) cb[i].setAttribute("aria-pressed", String(i === cur));
      var gb = ask.querySelectorAll(".path-btn"); for (var j = 0; j < gb.length; j++) gb[j].setAttribute("aria-pressed", String(gb[j].getAttribute("data-k") === guessed));
      if (!guessed) {
        out.innerHTML = '<p class="ks-word"><code>' + esc(c.code) + '</code></p><p class="ks-wait">Where does this word come from? Pick your guess above, then compare with the real runs.</p>';
        if (live && announce) live.textContent = "Card " + c.code + " picked. Make a guess.";
        return;
      }
      var right = guessed === c.kind;
      var rows = c.name
        ? '<table class="ks-table"><thead><tr><th>Kitchen</th><th>Has <code>' + esc(c.name) + '</code>?</th><th>Real line printed</th></tr></thead><tbody>' +
          '<tr><td>Browser (Chromium)</td><td>' + mark(c.b) + "</td><td><samp>" + esc(c.name + " " + c.b) + "</samp></td></tr>" +
          '<tr><td>Node 26</td><td>' + mark(c.n) + "</td><td><samp>" + esc(c.name + " " + c.n) + "</samp></td></tr></tbody></table>"
        : (c.proof ? '<p class="ks-proof">Real run of <code>' + esc(c.proof.program) + "</code> printed: <samp>" + esc(c.proof.line) + "</samp></p>" : "");
      out.innerHTML = '<p class="ks-word"><code>' + esc(c.code) + "</code></p>" +
        '<p class="ks-verdict">' + (right ? "✓ Right: " : "✗ Not quite. ") + "<b>" + esc(k.t) + "</b> (" + esc(k.where) + ").</p>" + rows + '<p class="ks-note">' + c.note + "</p>";
      if (live && announce) live.textContent = (right ? "Right. " : "Not quite. ") + c.code + ": " + k.t + ". " + out.querySelector(".ks-note").textContent;
    }
    cards.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (!b) return; cur = Number(b.getAttribute("data-c")); guessed = null; paint(true); });
    ask.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (!b) return; guessed = b.getAttribute("data-k"); paint(true); });
    if (tb) tb.innerHTML = m.cards.map(function (c) {
      var ev = c.name ? "browser: " + (c.b ? "yes" : "no") + "; Node: " + (c.n ? "yes" : "no") : (c.proof ? c.proof.program + " printed " + c.proof.line : "");
      return "<tr><td><code>" + esc(c.code) + "</code></td><td>" + esc(KINDS[c.kind].t) + "</td><td>" + esc(ev) + "</td><td>" + c.note + "</td></tr>";
    }).join("");
    paint(false);
  }
  function initKitchens() {
    var boxes = document.querySelectorAll("[data-kitchens]");
    for (var i = 0; i < boxes.length; i++) { try { mountKitchens(boxes[i]); } catch (e) { L.report("kitchens", e.message); } }
  }

  P.comic.ext(function () { initKitchens(); });
})(typeof globalThis !== "undefined" ? globalThis : this);
