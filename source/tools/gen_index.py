#!/usr/bin/env python3
"""Generate the bookshelf (index.html) and each book's contents page (<folder>/index.html).

Source of truth:
  tools/plans/<lang>.json   every planned chapter: number, title, part (beginner / intermediate)
  tools/queue.json          which swarm chapters are finished ("done"); python ch1-10 predate the queue
  <folder>/chN.html         the chapter page; its <meta name="description"> supplies the one-line summary

A chapter is "ready" only when its page exists AND it is finished (queue status done, or python 1-10). A page that
exists while its author is still working on it is listed as "being written", so a preview never links to half a
chapter. Re-run after every finished chapter; the output is deterministic.

index.html stays a bare page body (the Artifact publish wraps it; build.py wraps it for dist/local).
Book contents pages are full documents, like chapter pages."""
import html
import json
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
LANGS = ["python", "rust", "go", "cpp", "javascript"]
GUIDE = {  # data-char and name from assets/CAST.md; Pip is drawn by comic.js
    "python": ("pip", "Pip", {"data-arms": "wave"}),
    "rust": ("librarian", "Mabel", {"data-prop": "book"}),
    "go": ("courier", "Scoot", {}),
    "cpp": ("mechanic", "Wren", {}),
    "javascript": ("stagehand", "Kit", {}),
}
BLURB = {
    "python": "Friendly first language: names, decisions, loops, functions, data, files, classes and testing.",
    "rust": "A careful compiler that catches mistakes before they run: ownership, borrowing, traits and more.",
    "go": "Small, fast and simple: types, slices, maps, errors, interfaces, packages and goroutines.",
    "cpp": "Close to the machine: types, memory, pointers, classes, templates and the standard library.",
    "javascript": "The language of the web: values, functions, objects, the DOM, events and async code.",
}
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700'
         '&family=Bangers&family=Comic+Neue:wght@400;700&family=JetBrains+Mono:wght@500;600;800'
         '&family=Shantell+Sans:wght@500;600;700&display=swap">\n')


def ready_set():
    q = json.loads((SITE / "tools" / "queue.json").read_text())
    entries = q if isinstance(q, list) else q.get("entries") or q.get("queue") or []
    done = {(e["lang"], int(e["n"])) for e in entries if e.get("status") == "done"}
    done |= {("python", n) for n in range(1, 11)}
    out = {}
    for lang in LANGS:
        out[lang] = {n for (l, n) in done if l == lang and (SITE / lang / f"ch{n}.html").exists()}
    return out


def summary(page):
    m = re.search(r'<meta name="description" content="([^"]*)"', page.read_text())
    if not m:
        sys.exit(f"gen_index: {page.relative_to(SITE)} has no meta description")
    s = html.unescape(m.group(1))
    # Chapter descriptions open with "Chapter N of <book>, a comic course: ..." or, for last chapters, "..., a comic
    # course, and the last chapter of the book: ...". Drop everything up to the first colon after "comic course".
    s = re.sub(r"^.*?comic course[^:]*:\s*", "", s, count=1)
    # Capitalise the first word only when it is an ordinary word: "std::string", "switch", "match" or "fmt.Println"
    # must keep their real spelling (the book review found "Std::string" and "Switch" on the C++ contents page).
    first = s.split(" ", 1)[0].rstrip(",.;:")
    code_words = {"switch", "if", "for", "while", "match", "enum", "struct", "class", "let", "const", "async", "await",
                  "impl", "trait", "fn", "def", "lambda", "try", "catch", "defer", "go", "goroutines", "this", "new", "typeof"}
    if not (re.search(r"[:()_<>.\[\]#&*=]", first) or first in code_words):
        s = s[0].upper() + s[1:]
    if len(s) > 170:
        s = s[:170].rsplit(" ", 1)[0].rstrip(",;:(") + "…"
    return s


def attrs(d):
    return "".join(f' {k}="{v}"' for k, v in d.items())


def book_page(lang, plan, ready):
    char, name, a = GUIDE[lang]
    book, chs = plan["book"], plan["chapters"]
    parts = []
    for part in ("beginner", "intermediate"):
        cards = []
        for c in [c for c in chs if c["part"] == part]:
            n, t = c["n"], html.escape(c["title"])
            if n in ready:
                d = html.escape(summary(SITE / lang / f"ch{n}.html"))
                cards.append(f'<a class="book" id="ch{n}" href="ch{n}.html" data-n="{n}"><span class="no">CHAPTER {n}</span>'
                             f'<h3>{t}</h3><p>{d}</p><span class="tag" data-progress>start</span></a>')
            else:
                cards.append(f'<div class="book soon" id="ch{n}"><span class="no">CHAPTER {n}</span><h3>{t}</h3>'
                             f'<p>{html.escape(c.get("nav") or "")}</p><span class="tag">being written</span></div>')
        if cards:
            label = "BEGINNER" if part == "beginner" else "INTERMEDIATE"
            parts.append(f'<section aria-labelledby="{part}-h"><h2 class="shelf-h" id="{part}-h">{label} '
                         f'<small>{len(cards)} chapters</small></h2>\n<div class="shelf">\n' + "\n".join(cards) + "\n</div></section>")
    cast_js = "" if lang == "python" else '<script defer src="../assets/comic-cast.js"></script>\n'
    return f"""<!doctype html>
<html lang="en" data-book="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{book} book contents</title>
<meta name="description" content="Contents of the Pip &amp; Friends {book} book: {len(chs)} comic chapters, {len(ready)} ready.">
{FONTS}<link rel="stylesheet" href="../assets/comic.css">
<link rel="stylesheet" href="../assets/comic-widgets.css">
<script defer src="../assets/comic.js"></script>
<script defer src="../assets/comic-widgets.js"></script>
{cast_js}<style>
  .home {{ max-width: 980px; margin: 0 auto; padding: 0 16px 48px; display: grid; gap: 28px; }}
  .hero {{ display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 18px; align-items: center; background: var(--paper); border: 4px solid var(--ink); border-radius: 14px; box-shadow: 8px 8px 0 var(--ink); padding: 22px 24px; }}
  .hero h1 {{ font: 400 clamp(2.2rem, 6vw, 3.6rem)/0.95 var(--f-title); letter-spacing: 0.03em; }}
  .hero p {{ font: 700 1.125rem/1.5 var(--f-bubble); max-width: 52ch; }}
  .hero .char {{ width: 110px; }}
  .shelf-h {{ font: 400 1.75rem var(--f-title); letter-spacing: 0.05em; display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; margin-bottom: 12px; }}
  .shelf-h small {{ font: 700 1rem var(--f-bubble); letter-spacing: 0; }}
  .book {{ min-height: 0; grid-template-rows: auto auto 1fr auto; }}
  @media (max-width: 640px) {{ .hero {{ grid-template-columns: 1fr; }} .hero .char {{ width: 80px; }} }}
</style>
</head>
<body>
<a class="skip" href="#chapters">Skip to the chapters</a>
<header class="topbar" style="max-width:980px;padding-inline:16px">
  <p class="series"><a href="../index.html" style="color:inherit;text-decoration:none">PIP &amp; FRIENDS</a> <small>{book} book</small></p>
  <button type="button" class="motion-toggle" id="motion-toggle" aria-pressed="true">Animations: on</button>
</header>
<main class="home" id="chapters">
  <section class="hero" aria-labelledby="hero-h">
    <div>
      <h1 id="hero-h">THE {book.upper()} BOOK</h1>
      <p>{html.escape(BLURB[lang])} Your guide is {name}. {(f"All {len(chs)} chapters are ready." if len(ready) == len(chs) else f"{len(ready)} of {len(chs)} chapters are ready; the rest are being written.")}</p>
    </div>
    <svg class="char" data-char="{char}"{attrs(a)} aria-hidden="true"></svg>
  </section>
{chr(10).join(parts)}
</main>
<footer class="fineprint">
  <p>Every program in these chapters really ran; each chapter's footer names the toolchains and versions. Progress is saved only in this browser.</p>
</footer>
<script>
  /* Marks each ready chapter with the number of checks passed in this browser (polyglot.v1.comic.score.<folder>/chN.html). */
  (function () {{
    "use strict";
    var cards = document.querySelectorAll("a.book[data-n]");
    for (var i = 0; i < cards.length; i++) {{
      var n = cards[i].getAttribute("data-n"), got = 0;
      try {{ var v = localStorage.getItem("polyglot.v1.comic.score.{lang}/ch" + n + ".html"); got = v ? Object.keys(JSON.parse(v)).length : 0; }}
      catch (e) {{ got = 0; }}
      if (got) cards[i].querySelector("[data-progress]").textContent = got + " check" + (got === 1 ? "" : "s") + " passed";
    }}
  }})();
</script>
</body>
</html>
"""


def shelf(plans, ready):
    total = sum(len(p["chapters"]) for p in plans.values())
    have = sum(len(r) for r in ready.values())
    cards = []
    for i, lang in enumerate(LANGS, 1):
        p, r = plans[lang], ready[lang]
        char, name, a = GUIDE[lang]
        cards.append(f'<a class="book" href="{lang}/index.html"><span class="no">BOOK {i}</span><h3>{p["book"].upper()}</h3>'
                     f'<p>{html.escape(BLURB[lang])} Guide: {name}.</p>'
                     f'<svg class="char" data-char="{char}"{attrs(a)} aria-hidden="true"></svg>'
                     f'<span class="tag">{len(r)} of {len(p["chapters"])} chapters ready</span></a>')
    return f"""<title>Pip and Friends</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="A comic-book programming course for complete beginners, one book per language: Python, Rust, Go, C++ and JavaScript, with real runs and self-checking exercises.">
{FONTS}<link rel="stylesheet" href="assets/comic.css">
<link rel="stylesheet" href="assets/comic-widgets.css">
<script defer src="assets/comic.js"></script>
<script defer src="assets/comic-widgets.js"></script>
<script defer src="assets/comic-cast.js"></script>
<style>
  .home {{ max-width: 980px; margin: 0 auto; padding: 0 16px 48px; display: grid; gap: 28px; }}
  .hero {{ display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 18px; align-items: center; background: var(--paper); border: 4px solid var(--ink); border-radius: 14px; box-shadow: 8px 8px 0 var(--ink); padding: 22px 24px; background-image: radial-gradient(var(--dot) 1.4px, transparent 1.6px); background-size: 12px 12px; }}
  .hero h1 {{ font: 400 clamp(2.4rem, 6vw, 4rem)/0.95 var(--f-title); letter-spacing: 0.03em; }}
  .hero p {{ font: 700 1.125rem/1.5 var(--f-bubble); max-width: 52ch; background: var(--paper); }}
  .hero .cast {{ display: flex; gap: 2px; align-items: end; flex-wrap: wrap; justify-content: end; max-width: 330px; }}
  .hero .cast .char {{ width: 62px; }}
  .shelf-h {{ font: 400 1.75rem var(--f-title); letter-spacing: 0.05em; display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; margin-bottom: 12px; }}
  .shelf-h small {{ font: 700 1rem var(--f-bubble); letter-spacing: 0; }}
  .how {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 14px; }}
  .how > div {{ background: var(--sketch-paper); border: 3px solid var(--pencil); border-radius: 8px; padding: 12px 14px; font: 400 1rem/1.5 var(--f-body); }}
  .how b {{ display: block; font: 700 1.0625rem var(--f-hand); margin-bottom: 4px; }}
  @media (max-width: 640px) {{ .hero {{ grid-template-columns: 1fr; }} .hero .cast {{ justify-content: start; }} .hero .cast .char {{ width: 54px; }} }}
</style>
<a class="skip" href="#books">Skip to the books</a>
<header class="topbar" style="max-width:980px;padding-inline:16px">
  <p class="series">PIP &amp; FRIENDS <small>comic-book coding</small></p>
  <button type="button" class="motion-toggle" id="motion-toggle" aria-pressed="true">Animations: on</button>
</header>
<main class="home">
  <section class="hero" aria-labelledby="hero-h">
    <div>
      <h1 id="hero-h">LEARN TO CODE,<br>ONE PANEL AT A TIME</h1>
      <p>A comic-book course for complete beginners, one standalone book per language. Every program you see really ran, and every exercise checks your answer side by side against the real output.</p>
    </div>
    <div class="cast" aria-hidden="true">
{chr(10).join(f'      <svg class="char" data-char="{GUIDE[l][0]}"{attrs(GUIDE[l][2])}></svg>' for l in LANGS)}
    </div>
    <p class="sr-only">Picture: the five guides side by side: Pip the robot, Mabel the librarian, Scoot the courier, Wren the mechanic and Kit the stage manager.</p>
  </section>
  <section class="how" aria-label="How this course works">
    <div><b>Read the comic</b>Each guide explains an idea with a story, then shows the real code and the real output.</div>
    <div><b>Step through it</b>Walk a program line by line, watch names point at memory, feed values into machines.</div>
    <div><b>Check yourself</b>Predict, reorder, fill in, spot the bug, trace. Your answer appears next to the real run.</div>
    <div><b>Go deeper</b>The Professor's notebook at the end of each chapter has the under-the-hood details and a lab to try on your own computer.</div>
  </section>
  <section id="books" aria-labelledby="books-h">
    <h2 class="shelf-h" id="books-h">THE BOOKS <small>{have} of {total} chapters ready · each book starts from zero</small></h2>
    <div class="shelf">
{chr(10).join("      " + c for c in cards)}
    </div>
  </section>
</main>
<footer class="fineprint">
  <p>Pip, Mabel, Scoot, Wren, Kit, the Professor, the Compiler and every creature are original characters drawn in code. Programs were run in real toolchains; each chapter's footer says which versions, where and when. Progress is saved only in this browser. Fonts load from Google Fonts; offline copies fall back to system fonts.</p>
</footer>
"""


def main():
    plans = {l: json.loads((SITE / "tools" / "plans" / f"{l}.json").read_text()) for l in LANGS}
    ready = ready_set()
    for lang in LANGS:
        (SITE / lang / "index.html").write_text(book_page(lang, plans[lang], ready[lang]))
    (SITE / "index.html").write_text(shelf(plans, ready))
    print("gen_index: " + ", ".join(f"{l} {len(ready[l])}/{len(plans[l]['chapters'])}" for l in LANGS))


if __name__ == "__main__":
    main()
