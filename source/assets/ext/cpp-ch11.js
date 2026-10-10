/* C++ book, chapter 11 extension: "Smoke Alarms, Dark Rooms".
   One small addition; everything else on the page uses the engine's widgets (the [data-same-src] badge is the engine's).
     - [data-asan="ID"] (the annotated sanitizer report) was first built here; it is the engine's since engine pass 3
       (comic-widgets.js). This file keeps the foot fade for this chapter's tall terminals (.term.tall).
     - [data-sort="ID"]: a sorting game. Ten short code fragments, each to be put in one box: undefined, implementation-
       defined, or fine. It claims no program output (no fragment is ever run), so it needs no parity badge. It is not
       scored by the engine: it reports "n of 10" in its own live line. Each snippet's three boxes are the engine's radio
       options (.ex-opt in a role=radiogroup), with the same keyboard model as the engine's choice exercises: one tab stop
       per group, arrow keys move and select, Home and End jump to the ends. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch11.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  function model(el, attr) {
    var id = el.getAttribute(attr), s = document.getElementById(id);
    if (!s) { L.report(attr, "no model script #" + id); return null; }
    try { return JSON.parse(s.textContent); } catch (e) { L.report(attr, id + ": bad JSON: " + e.message); return null; }
  }

  /* a scroll box shows a fade at its foot (CSS, :not(.at-end)) until it is scrolled to the end */
  function endFade(el) {
    function upd() { el.classList.toggle("at-end", el.scrollTop + el.clientHeight >= el.scrollHeight - 2); }
    el.addEventListener("scroll", upd, { passive: true }); root.addEventListener("resize", upd); upd();
  }

  /* ---------- sorting game ---------- */
  function sorter(box) {
    var m = model(box, "data-sort"); if (!m) return;
    var list = box.querySelector(".sort-list"), out = box.querySelector(".sort-result");
    var picks = m.items.map(function () { return -1; });
    function catIndex(id) { for (var c = 0; c < m.cats.length; c++) if (m.cats[c].id === id) return c; L.report("sort", "unknown box " + id); return -1; }
    list.innerHTML = m.items.map(function (it, i) {
      return '<li class="sort-item" data-i="' + i + '"><span class="sort-n" aria-hidden="true">' + (i + 1) + '</span><div class="sort-main"><pre class="code sort-code">' + L.highlight(it.code) + "</pre>" +
        '<div class="sort-opts" role="radiogroup" aria-label="Snippet ' + (i + 1) + ': which box?">' +
        m.cats.map(function (c, ci) { return '<button type="button" class="ex-opt sort-opt" role="radio" aria-checked="false" tabindex="' + (ci ? -1 : 0) + '" data-c="' + ci + '">' + esc(c.t) + "</button>"; }).join("") +
        '</div><p class="sort-why" hidden></p></div></li>';
    }).join("");
    function paint(li, i) {   // aria-checked, and one tab stop per group: the checked box, else the first
      var os = li.querySelectorAll(".sort-opt");
      for (var k = 0; k < os.length; k++) { os[k].setAttribute("aria-checked", String(k === picks[i])); os[k].tabIndex = (picks[i] < 0 ? k === 0 : k === picks[i]) ? 0 : -1; }
    }
    list.addEventListener("click", function (e) {
      var b = e.target.closest(".sort-opt"); if (!b) return;
      var li = b.closest(".sort-item"), i = Number(li.getAttribute("data-i"));
      picks[i] = Number(b.getAttribute("data-c")); paint(li, i);
    });
    list.addEventListener("keydown", function (e) {
      var b = e.target.closest(".sort-opt"); if (!b || e.altKey || e.ctrlKey || e.metaKey) return;
      var li = b.closest(".sort-item"), i = Number(li.getAttribute("data-i")), os = li.querySelectorAll(".sort-opt"), n = os.length, at = Number(b.getAttribute("data-c")), to = -1;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (at + 1) % n;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (at - 1 + n) % n;
      else if (e.key === "Home") to = 0; else if (e.key === "End") to = n - 1;
      if (to < 0) return;
      e.preventDefault();
      picks[i] = to; paint(li, i); os[to].focus();
    });
    function mark(reveal) {
      var right = 0, blank = 0;
      m.items.forEach(function (it, i) {
        var li = list.children[i], want = catIndex(it.ans), why = li.querySelector(".sort-why");
        if (reveal) { picks[i] = want; paint(li, i); }
        var ok = picks[i] === want;
        if (picks[i] < 0) blank++;
        if (ok) right++;
        li.classList.toggle("good", ok); li.classList.toggle("bad", !ok);
        why.hidden = false;
        why.innerHTML = '<b class="sort-mark">' + (ok ? "✓ Right: " : picks[i] < 0 ? "✗ Not sorted yet. " : "✗ Not quite. ") + esc(m.cats[want].t) + ".</b> " + it.why;
      });
      out.textContent = reveal ? "Here are all " + m.items.length + " answers, with the reason for each." :
        right + " of " + m.items.length + " sorted correctly" + (blank ? " (" + blank + " not sorted yet)" : "") + ". Read the reason under each snippet.";
    }
    box.querySelector(".sort-check").addEventListener("click", function () { mark(false); });
    box.querySelector(".sort-show").addEventListener("click", function () { mark(true); });
    box.querySelector(".sort-reset").addEventListener("click", function () {
      picks = picks.map(function () { return -1; });
      var lis = list.children;
      for (var i = 0; i < lis.length; i++) {
        lis[i].classList.remove("good", "bad"); lis[i].querySelector(".sort-why").hidden = true;
        paint(lis[i], i);
      }
      out.textContent = "Cleared. Sort all ten again.";
    });
  }

  P.comic.ext(function () {
    var t = document.querySelectorAll(".term.tall"); for (var k = 0; k < t.length; k++) endFade(t[k]);
    var s = document.querySelectorAll("[data-sort]"); for (var j = 0; j < s.length; j++) sorter(s[j]);
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
