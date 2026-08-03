# Pip & Friends: authoring guide for chapter pages

This guide is the contract for anyone writing a chapter, human or agent. It covers:

- what a chapter page is made of
- how every code sample and output is captured from a real run
- how each widget is declared
- how a page proves it is correct before it ships

**What it is not:** a style guide for prose. The voice rules are in "Voice and teaching rules" below.

**Live references (open these; copy their markup):**

- `tools/fixture/widgets.html`: every new widget working against `data/py-ch99.js` (cast, tracer, machine, all six exercise types, score, terminal).
- `src/python/ch1-pilot.html`: the approved pilot. It shows the comic panels, scenes, bubbles, the recipe walker, the map and the Professor's notebook. Its markup is the house style. Its "Check yourself" `<details>` quiz is replaced by real exercises in new pages.

**Code highlighting:** `highlight()` colours strings (with escapes and r/b/f/u prefixes), `#` comments, numbers, keywords and common built-ins. JetBrains Mono ligatures are switched off in code, so `!=`, `<=` and `==` show the characters a beginner types.

**Capture interpreters:** CPython 3.15.2 (primary, shown on pages) and CPython 3.13.18 (comparison).

**Engine files (shared; do NOT edit in a chapter task):**

- `assets/comic.css`
- `assets/comic.js`
- `assets/comic-widgets.css`
- `assets/comic-widgets.js`

If you need an engine change, say so in your report with the exact reason. A chapter may add its own `assets/ext/py-chN.css` and `assets/ext/py-chN.js`; see "Chapter extensions" below.

---

## 1. Folder layout and ownership

```
comic-site/
  index.html                 bookshelf home page (integration owns it)
  python/chN.html            one full HTML document per chapter (the chapter author owns it)
  data/py-chN.js / .json     captured runs for chapter N (written ONLY by tools/capture.py)
  assets/                    shared engine (integration owns it)
  assets/ext/py-chN.{css,js} optional per-chapter additions (the chapter author owns them)
  tools/capture.py           runs programs, writes data files
  tools/check_chapter.js     browser checks; must PASS before a chapter is done
/home/you/python-chN/        the chapter's real program files (+ .stdin / .nondet sidecars)
```

Each chapter task owns exactly these:

- `python/chN.html`
- `/home/you/python-chN/`
- `data/py-chN.*`
- `assets/ext/py-chN.*`

Never touch another chapter's files.

## 2. Hard rules (the page is wrong if any is broken)

1. **Real runs only.** Every piece of code shown comes from a `.py` file in `/home/you/python-chN/`. Every output, traceback and answer key comes from `data/py-chN.js`. Never type output into HTML.
   - Use `data-src` / `data-run` / widgets that read the captures.
   - A short inline `<code>` fragment inside a sentence is fine, but it may not claim an output.
2. **Re-capture after every edit to a program:** `python3 tools/capture.py python N`.
   - The tool refuses to write if a program times out or prints different output on different runs, for example a `set` of strings, whose order changes with the hash seed. In that case either sort the output, or add `name.nondet` and never use that program as an answer.
   - If 3.15 and 3.13 differ, the tool records it. Mention real version differences in the page's notes.
3. **Works from file://.** That means:
   - classic `<script defer>` only
   - no modules, no `fetch`, no workers
   - relative URLs only
   - only external resource: the Google Fonts stylesheet
4. **Light palette only, every text pair at least 7:1.** Use the tokens in `comic.css`. Never introduce a text colour that is not already a token.
   - Never show state by colour alone (add a mark, border style or word).
   - **No thick one-sided "accent stripe" borders.**
5. **Accessible:**
   - every panel `<section>` has an `aria-label`
   - every drawing has a text equivalent (`.sr-only` sentence or a transcript)
   - bubbles start with `<span class="sr-only">Pip says: </span>`
   - steppers keep `aria-disabled` buttons and the `aria-live` line
   - motion respects the toggle and reduced-motion (the engine handles this if you use its classes)
6. **Original characters only.** Never draw or name a known mascot or brand character.
7. **`node tools/check_chapter.js python/chN.html` must PASS**, at both widths and with zero console errors. Then look at the screenshots yourself (`--shots DIR`) at 1280px and 390px. Fix anything clipped, overlapping, unreadable or ugly. A PASS from the checker is necessary, not sufficient.

## 3. Page skeleton

Copy this skeleton. The chapter list in the nav is fixed for the Python book. Mark your chapter with `aria-current="page"`, using a `<span>` instead of an `<a>` for it.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Forks in the Road</title>   <!-- the chapter title, 2-4 words -->
<meta name="description" content="Chapter 4 of Pip & Python, a comic course: ...">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700&family=Bangers&family=Comic+Neue:wght@400;700&family=JetBrains+Mono:wght@500;600;800&family=Shantell+Sans:wght@500;600;700&display=swap">
<link rel="stylesheet" href="../assets/comic.css">
<link rel="stylesheet" href="../assets/comic-widgets.css">
<script defer src="../data/py-ch4.js"></script>
<script defer src="../assets/comic.js"></script>
<script defer src="../assets/comic-widgets.js"></script>
<!-- optional: <link rel="stylesheet" href="../assets/ext/py-ch4.css"> <script defer src="../assets/ext/py-ch4.js"></script> (after comic-widgets.js) -->
</head>
<body>
<a class="skip" href="#strip">Skip to the comic</a>
<header class="topbar">
  <p class="series"><a href="../index.html" style="color:inherit;text-decoration:none">PIP &amp; PYTHON</a> <small>a comic course</small></p>
  <nav class="chapters" aria-label="Chapters">
    <a href="ch1.html">1 · Recipe</a><a href="ch2.html">2 · Name tags</a><a href="ch3.html">3 · Kinds</a>
    <span aria-current="page">4 · Forks</span><a href="ch5.html">5 · Loops</a><a href="ch6.html">6 · Machines</a>
    <a href="ch7.html">7 · Crates</a><a href="ch8.html">8 · Cabinet</a><a href="ch9.html">9 · Oops</a><a href="ch10.html">10 · Project</a>
  </nav>
  <button type="button" class="motion-toggle" id="motion-toggle" aria-pressed="true">Animations: on</button>
</header>
<main class="strip" id="strip">
  <section class="panel cover" data-play aria-labelledby="cover-h"> ... CHAPTER N kicker, h1, character, blurb (time to read) ... </section>
  <nav class="toc" aria-label="In this chapter"><ol><li><a href="#part-1">...</a></li>...</ol></nav>
  <div class="score"><span data-score></span><button type="button" class="btn" data-score-reset>Reset my score</button></div>
  ... panels ...
</main>
<nav class="ch-nav" aria-label="Chapter navigation"><a href="ch3.html">← Ch 3 · ...</a><a class="next" href="ch5.html">Ch 5 · ... →</a></nav>
<section class="notebook" aria-labelledby="nb-h"> ... Professor's notebook pages ... </section>
<footer class="fineprint"> ... provenance (real runs, versions, folder) + sources consulted ... </footer>
</body>
</html>
```

## 4. Building blocks

### Comic panels (from the pilot)

- `<section class="panel pop|clean|sketch" aria-label="Panel 7: ...">`. Use `pop` for story and error moments, `clean` for code and terminals, `sketch` for analogies, maps and notebook-style drawings.
  - Add `data-play` to get a one-shot entrance animation.
  - Use `.replay` if you want a replay button.
- `<p class="caption">` for narration boxes. `.caption.soft` is a cream box.
- `.scene` (with `.scene.flip` for the mirrored version) wraps a character drawing plus `.talk > .bubble`. Bubble modifiers: `.right`, `.shout`, `.up`, `.think`.
- `<span class="panel-no" aria-hidden="true">7</span>` gives the panel number. Use `.row.two` for side-by-side panels.
- `<svg class="sfx tr" data-sfx="BONK!" data-seed="4"></svg>` draws a sound-effect burst. Decorative only, and it needs a real sentence elsewhere.

### Code and terminals

- `<span class="file-tab">age.py</span><pre class="code" data-src="age.py"></pre>` shows the source, highlighted.
- `<pre class="term" data-run="age.py" data-exit></pre>` shows the terminal, with the prompt `you@laptop:~/python-chN$ python3 age.py`, the real output, stderr in error style and an optional exit-code line.
  - For programs with a `.stdin` file, the terminal shows the pseudo-terminal transcript: prompts with the typed text echoed after them, exactly as a real terminal would.
- `data-type` on a terminal types it out when scrolled into view (the pilot uses this on its first run).

### Characters

Every character is `<svg class="char [sm|lg|wide]" data-char="NAME" ...attributes></svg>`. Add a `.sr-only` sentence describing the picture whenever it carries meaning.

| data-char | who | attributes |
|---|---|---|
| `pip` | Pip, the Python robot (main guide) | `data-mood` = happy, surprised, focus, worried or normal; `data-mouth` = smile, shout, o, flat or frown; `data-arms` = down, wave, point, pointL, cheer or shrug |
| `chef` | the cook (recipe analogy) | — |
| `proofreader` | the Proofreader = SyntaxError checker | — |
| `bouncer` | the Bouncer = NameError | — |
| `professor` | Professor, who owns the notebook and appears for deep dives | — |
| `brick` | int creature (solid, countable) | `data-label="42"`, `data-mood` (sad/o) |
| `jelly` | float creature (wobbly, a little imprecise) | `data-label="3.14"`, `data-mood` |
| `lamp` | bool creature | `data-on="true"/"false"`, optional `data-label` (e.g. `true`, `false`) |
| `ghost` | None / nil / null / nullptr ("nothing here") | optional `data-label` (e.g. `nil`, `null`, `nullptr`) |
| `train` | str: a train of character carriages with index numbers | `data-text="Pip!"` (≤8 chars); use `class="char wide"` |
| `machine` | a function: input hopper → body → output | `data-label="len()"` |
| `signpost` | if / else fork | `data-yes`, `data-no` (labels) |
| `wheel` | a loop (spins when motion is on) | `data-label` |
| `crate` | list: a row of boxes with indexes | `data-items="7,'a',True"` (≤5); `class="char wide"` |
| `cabinet` | dict: drawers with key labels | `data-keys="name,age"` (≤4) |

Use these creatures consistently across all chapters: once `jelly` means float, it always means float. The pilot's scenes show how characters stand next to bubbles.

### Pip walks a recipe (`data-walk`), from the pilot

Line-by-line stepping with the screen. It suits short straight-line programs. Each step is `{line, output[], mood, mouth, arms, note}`, where `line` is the **next** line to run (`null` at the end), and `output` is the whole screen so far. The final screen must equal the real output; the page shows a parity badge.

### The map (`data-map`), from the pilot

A statechart: places, roads, and several "roads" (paths) a run can take. It suits control flow, such as the error-path map in Chapter 1, an if/elif ladder, loop exit conditions, or try/except flow. Each path names its program and an `expect` object, and is checked against the real run. Copy the pilot's model and adjust the coordinates. Keep labels ≥ 14px at 690px wide, and check that no label collides with a line.

### Memory tracer (`data-tracer`), new

Shows names (tags) on the left and objects on the right, with arrows between them. On phones it stacks names over objects. Use it for anything about what a name *refers to*:

- assignment
- reassignment
- aliasing
- mutation
- function frames
- lists and dicts

```html
<section class="panel clean tracer" aria-label="Panel 9: two tags, one list" data-tracer="tr-alias" id="tr-alias-box">
  <div class="tr-split"><ol class="tr-code"></ol><div class="screen"><p class="label">SCREEN</p><pre></pre></div></div>
  <div class="mem"><svg class="tracer-svg" id="tr-alias-svg" role="img" aria-label="Memory diagram; the text version below lists every step."></svg></div>
  <p class="narration"></p>
  <div class="controls"><div class="btns">
    <button type="button" class="btn" data-act="prev">Back <kbd>←</kbd></button>
    <button type="button" class="btn btn-go" data-act="next">Next step <kbd>→</kbd></button>
    <button type="button" class="btn" data-act="play" aria-pressed="false"><span>Play</span> <kbd>Space</kbd></button>
    <button type="button" class="btn" data-act="reset">Reset <kbd>R</kbd></button>
  </div><span class="parity"></span></div>
  <p class="sr-only" aria-live="polite"></p>
  <details><summary>Text version: every step</summary><table class="transcript"><thead><tr><th>Step</th><th>Line</th><th>What happens</th><th>Memory</th><th>Screen</th></tr></thead><tbody></tbody></table></details>
  <script type="application/json" id="tr-alias">{ "program": "alias.py", "steps": [ ... ] }</script>
</section>
```

Each step looks like this:

```
{ "line": 3,                       // the NEXT line to run (null at the end)
  "note": "HTML sentence explaining what just happened",
  "output": ["[1, 2]"],            // the whole screen so far; final step must equal the real output exactly
  "frames": [ { "name": "global", "vars": [ {"n": "a", "ref": "L1"} ] },
              { "name": "double(x)", "vars": [ {"n": "x", "ref": "i7"} ] } ],   // function frames below global
  "objects": { "L1": {"kind": "list", "items": [ {"val": "1"}, {"ref": "s1"} ]},
               "s1": {"kind": "str", "value": "'hi'"},
               "i7": {"kind": "int", "value": "7"},
               "D1": {"kind": "dict", "pairs": [ {"k": "'name'", "ref": "s1"}, {"k": "'age'", "val": "36"} ]} },
  "changed": ["a"] }               // names to highlight (moved arrows are highlighted automatically)
```

- Object kinds: `int`, `float`, `str`, `bool`, `NoneType`, `function`, `list`, `tuple`, `set`, `dict`. Any other kind name is drawn as a plain value box labelled with that kind. **Any object with `pairs`** is drawn as rows of name and value (use it for instances, classes, structs, maps and objects in every language, e.g. `{"kind": "object", "label": "Pet object · P1", "pairs": [{"k": "name", "ref": "s1"}]}`). **Any object with `items`** is drawn as a row of cells (arrays, vectors, slices). `label` replaces the default "kind · id" header on both.
- Layout is planned over the whole run: every object keeps one slot from its first appearance to the end (a gap stays where it is absent), so tags visibly move while objects stay put. Boxes and name tags are sized from their text. Arrows from inside containers, and every arrow in the phone layout, run through a gutter on the right so they never cross an object.
- Small immutable values inside containers may be drawn inline (`{"val": "1"}`), which is how Python Tutor shows them by default. Use `{"ref": ...}` when sharing or aliasing matters.
- An object that no name or container references is drawn faded. That is how garbage becomes visible.
- **Parity checks:**
  - the final `output` must equal the real screen
  - every step's `output` must be a prefix of it
  - for programs that read input, `output` must include the echoed typing, exactly as in the `screen` transcript

### Machine (`data-machine`), new

Shows an input going in, a result coming out, or the machine jamming with the real error. Use it for:

- conversions: `int()`, `str()`, `float()`, `bool()`
- built-ins: `len()`, `type()`, `round()`
- a function the chapter defines
- operators, viewed as machines

```html
<section class="panel clean machine" aria-label="Panel 12: the int() machine" data-machine="m-int">
  <div class="chips"></div><div class="machine-stage"></div><p class="narration"></p><span class="parity"></span><p class="sr-only" aria-live="polite"></p>
  <script type="application/json" id="m-int">{"label": "int()", "program": "conversions.py", "examples": [
    {"in": "\"42\"", "out": "42", "outKind": "int", "note": "..."},
    {"in": "\"hi\"", "error": "ValueError: invalid literal for int() with base 10: 'hi'", "note": "...", "program": "not_a_number.py"} ]}</script>
</section>
```

Each example is checked against a real program. Either `out` (or `expectLine`) must appear as a whole line of that program's output, or `error` must appear in its stderr. Each example may name its own `program`. Write the program so that each example prints its own line, and so that errors come from a program that runs only that failing call.

### Exercises (`data-ex`), new: the core of "hands-on, self-checking"

Every exercise is `<div data-ex="KIND" data-model="ID" id="UNIQUE"></div>` followed by `<script type="application/json" id="ID">{...}</script>`. The engine builds:

- the question
- the inputs
- **Check my answer**, **Show the answer** and **Try again** buttons
- a side-by-side "your answer vs real Python" comparison, with ✓/✗ per line, the real run, and your `explain` text

Passing an exercise with **Check my answer** adds to the chapter score, which is saved in the browser. **Show the answer** never counts toward the score. Answer keys come from the captures, so a key cannot drift from real Python.

| kind | model fields | answer key comes from |
|---|---|---|
| `predict` | `program`; optional `prompt`, `hint`, `explain`; `"expect": "error"` to ask for the error's name instead of the output. Outside Python, an error prediction must also give `"answer"` (for example `"E0382"` or `"declared and not used"`), which must appear in the real stderr, and may give `"ask"` (the question text) | the real stdout (or the pty `screen`), or the real error's class name |
| `choice` | `q`; `options: [{t, why, correct?}]` (exactly one `correct`); optional `program` to show its code | the option marked correct; use it for concepts, not for outputs that a predict could check |
| `parsons` | `program`; optional `seed`, `prompt`, `explain` | the program's own line order; the goal output shown is real. Prefer 4–8 lines; avoid lines that are interchangeable, such as two independent assignments, or the key becomes ambiguous |
| `fill` | `program`; `blanks: [{line, text, accept?[]}]`; `explain` | `text` must literally occur on that line; `accept` lists equivalent spellings |
| `spot` | `program` (a buggy one that really fails or misbehaves); `bug` (the line number); `explain` | the line you name; the real error output is shown |
| `trace` | `program` that prints one row per step, values separated by spaces; `columns`; `given` (column indexes pre-filled); optional `showProgram` | the real printed rows. Tip: write the program with the `print` as the last line of the loop body; you may show a version without the print via `showProgram`, but the captured program is what runs |

Every chapter should mix all six kinds, and place them **right after** the panel that teaches the idea, not only at the end. End with a "Boss level" set of harder exercises. `P.comic.selfTest()`, run by the checker, solves every exercise with its key and fails the page if any key is rejected.

### Score, table of contents and navigation

- `<span data-score></span>` shows the "n / total checks passed" counter with its bar. Put one at the top and one at the end.
- `<button data-score-reset>` clears the score.
- `.toc`, `.ch-nav`, `.notebook > details.page`, `.recap`, `.terms` and `.next-chapter` work as in the pilot.

### Chapter extensions (rare)

If the chapter needs a visual the engine lacks, you may add `assets/ext/py-chN.js`, which registers with the engine:

```js
(function (root) { "use strict"; var P = root.POLYGLOT, L = P.comic.lib;
  P.comic.ext(function () { /* find your [data-...] elements and draw; L.report(where, msg) on any problem */ });
})(typeof globalThis !== "undefined" ? globalThis : this);
```

`L` provides:

- `program(name)`
- `esc`
- `highlight`
- `runner(box, total, render)`, the stepper with keyboard and aria
- `rng(seed)`
- `wob`, `wobRect` (hand-drawn shapes)
- `motionOn()`
- `store`
- `cast` (add characters: `L.cast.name = {vb, draw(el)}`)
- `drawCast(scope)`
- `shown(capture)`

**Rules for an extension:**

- Anything it claims about output must check against captures and show a parity badge.
- It must be keyboard-usable.
- It must have a text version.

Prefer the existing widgets. Explain any extension in your report.

## 5. Voice and teaching rules

- **Audience:** complete beginners, including younger readers and adults new to code. Be friendly, funny, warm and memorable, and never condescending.
- **Short sentences.** One idea per panel. Define every new word the first time, in a bubble or caption, and add it to "Words from this chapter".
- **Every concept appears in four ways:**
  1. a story or analogy picture (comic)
  2. the real code and real output (clean panel)
  3. a visual model (walker, tracer, machine or map)
  4. hands-on exercises with side-by-side checking

  Then a recap.
- **Show the common mistakes on purpose.** Each chapter has the real error messages its topic produces. Read them like a detective: last line first, then the line number, then the caret.
- **Memory hooks:** give each big idea a short catchphrase. The pilot uses "Errors aren't failures. They're me telling you exactly where to look." Recap the catchphrases in "What you learned".
- **Depth:**
  - the comic carries the main path
  - the Professor's notebook pages go deeper: under the hood, real-world use, common wrong ideas, a lab ("run it yourself": steps on a real computer with Windows, macOS and Linux notes), words, and go-deeper links
  - the goal is more thorough than any free curriculum, without making the main path heavy
- **Accuracy:** state what CPython actually does, and check any claim you are unsure of against the official docs (docs.python.org). Flag version-specific behaviour. Never invent statistics, history or quotes.
- **Sources:** research free curricula for scope and common pitfalls:
  - boot.dev Learn Python
  - the official Python Tutorial
  - Automate the Boring Stuff (3rd ed.)
  - Think Python (3rd ed.)
  - Python for Everybody
  - CS50P
  - freeCodeCamp
  - roadmap.sh/python
  - Python Tutor

  Do not copy their text or exercises; write original material. List the sources you used in the footer's "Sources consulted".

## 6. Done means

1. All programs are captured, and `capture.py` exits 0.
2. `node tools/check_chapter.js python/chN.html --shots DIR` passes at both widths.
3. You looked at the screenshots, found no clipping, overlap, unreadable text or empty panels, and fixed what you found.
4. The report lists:
   - panels and exercises (by kind)
   - widgets used
   - programs captured
   - version differences
   - sources consulted
   - anything you could not do, or that needs an engine change, each with the reason


---

## 7. Books in every language (Rust, Go, C++, JavaScript, and Python chapters 11+)

This section extends sections 1–6 to all books. Where it differs from earlier sections, this section wins.

**Folders and names.** Each book has a site folder, a data prefix and a programs folder:

| Book | Site folder | Data prefix | Programs folder | Source files |
|---|---|---|---|---|
| Python | `python/` | `py` | `/home/you/python-chN/` | `.py` |
| Rust | `rust/` | `rs` | `/home/you/rust-chN/` | `.rs` (one program per file; capture builds each as a Cargo project `~/rust-chN/<name>/`, so errors say `src/main.rs`) |
| Go | `go/` | `go` | `/home/you/go-chN/` | `.go` (capture adds a `go.mod` with `go 1.27`) |
| C++ | `cpp/` | `cpp` | `/home/you/cpp-chN/` | `.cpp` |
| JavaScript | `javascript/` | `js` | `/home/you/javascript-chN/` | `.js` `.mjs` `.cjs` `.ts` `.html` |

A chapter owns `<folder>/chN.html`, `/home/you/<lang>-chN/`, `data/<prefix>-chN.*` and `assets/ext/<prefix>-chN.*`. Capture with `python3 tools/capture.py <lang> N`. Read the docstring at the top of `tools/capture.py`: it lists every sidecar (`.stdin`, `.nondet`, `.args`, `.deps`, `.edition`, `.release`, `.san`, `.actions.json`, `.cmd`) and exactly which commands run. The terminal widget shows every command the reader would type (for C++: the compile command, then `./name`), each with its real output.

**Your plan.** Your chapter's title, nav label, modules, scope, what not to teach yet, visual ideas, cast and capture notes are in `tools/plans/<lang>.json` (the entry with your `n`). The scope paragraph is the minimum content. The research map `research/<lang>.md` has the full module rows (concepts, real error messages, analogies, exercise ideas): use the rows for your modules.

**The cast.** `assets/CAST.md` is the source of truth for every language's guide and the shared Compiler character (names, looks, personalities, catchphrases, attributes). Character names written in the plans are only suggestions; where they differ, CAST.md wins. Load `../assets/comic-critters.js` and `../assets/comic-cast.js` after `comic-widgets.js`. comic-critters.js holds the shared critters first drawn for Python: the error critters jigsaw (TypeError-style "wrong kind" errors), taster (bad value), tumble (index out of range), jangles (missing key), zilch (divide by zero), pockets (missing attribute/member), digger (file not found), sneak (a logic bug), duck (rubber-duck debugging), plus sealed (tuple) and bag (set). Reuse them in any book where the meaning fits; never redraw them in a chapter extension. Creatures (brick, jelly, train, lamp, ghost, machine, signpost, wheel, crate, cabinet) mean the same thing in every book: map them to the language's nearest type (for example the cabinet is a Rust `HashMap`, a Go `map`, a C++ `std::map`, a JavaScript object or `Map`). The Proofreader and the Bouncer are Python's; compiled books use the Compiler for compile-time errors and their guide for run-time errors.

**Page skeleton for these books.** Same as section 3, except:

- `<html lang="en" data-book="rust">` (the book's folder name).
- Load `../data/<prefix>-chN.js`, then `comic.js`, `comic-widgets.js` and `comic-cast.js`.
- The top bar links to the home page and the book contents, plus previous and next chapters:

```html
<header class="topbar">
  <p class="series"><a href="../index.html" style="color:inherit;text-decoration:none">PIP &amp; FRIENDS</a> <small>Rust book</small></p>
  <nav class="chapters" aria-label="Book">
    <a href="index.html">Contents</a><a href="ch2.html">&larr; Ch 2</a><span aria-current="page">Ch 3 of 29</span><a href="ch4.html">Ch 4 &rarr;</a>
  </nav>
  <button type="button" class="motion-toggle" id="motion-toggle" aria-pressed="true">Animations: on</button>
</header>
```

For chapter 1, leave out the previous link. For the last chapter, leave out the next link. The book contents page (`<folder>/index.html`) is generated at integration, so a missing one is expected. The checker prints a note, not a failure, for links to chapter, contents or home pages that do not exist yet.

**Language-specific musts.**

- **Rust:** show `cargo run -q` runs (that is what the capture does). Compile errors are a central teaching moment: read them like a detective (primary label, secondary label, `help:`), with the Compiler character. Panic messages show `thread 'main' (1)`: say once that the number is a thread id that differs on a reader's machine.
- **Go:** `go run name.go`. `declared and not used` errors are part of the language's character. Programs that print from goroutines or range over maps vary from run to run: use `.nondet` and say "one possible run".
- **C++:** the two-step compile-then-run model is the first thing to teach. Never show undefined behaviour as ordinary output: show it only through sanitizer reports (`.san`). `<print>` is not available on this toolchain: use `std::cout` and `std::format`.
- **JavaScript:** Node is the default runner. Browser chapters use `.html` programs with `.actions.json`, and the terminal shows the browser console. Capture pins `TZ=UTC` and `LANG=en_US.UTF-8`: say so wherever dates, times, numbers or locales appear.
- **Highlighting** follows the chapter's language automatically, from the captures' `meta.lang`; `.html` sources are highlighted as markup.

**Engine behaviour every book gets (2026-11-07):** the recipe walker and the map token draw the book's own guide, chosen by `<html data-book>`. Exercise labels say "Real run", not "Real Python". `/* */` comments are highlighted across lines. A `.cmd` step may give a third element: the folder the prompt shows.

**Terminal sessions:** a `.cmd` file may set `"session": true` so that every step runs in one shell, as in a real terminal. `cd`, variables and `$?` then carry over, and each prompt shows the folder the shell is really in. Shell errors then say `bash: line N:`, where N is the step number, because the steps are run as one script. Say so once on the page.
**Stream order:** when a step prints to both stdout and stderr, the capture also records `merged`, the real interleaving with stderr written into stdout. The terminal widget shows that order, with stderr lines in error style. Rust warnings, for example, appear before the program's output, as they do in a real terminal. Each Rust chapter now has its own build cache, so captures no longer pick up "Blocking waiting for file lock".
**Second-version terminals:** `<pre class="term" data-run="x.cpp" data-alt data-exit></pre>` shows the secondary toolchain's run (clang++ 18, Rust 1.97, Go 1.24, Node 22, CPython 3.13), so version differences can be shown side by side with the primary run. Label it with the version in `meta.capturedWith[1]`. Only programs whose runs differ have one; asking for any other program reports an error.
**Folding runtime-internal stack lines:** `data-fold` on a terminal collapses each run of Node `at ... (node:internal/...)` frames into one marked line, and adds a "Show the full, unfolded output" box with the complete text directly after the terminal. Shared characters added to comic-critters.js: `linker` (C++ link errors), `sanitizer` (C++ sanitizer reports), `conductor` (C++ if/else junctions), `nullframe` (JavaScript `null`) and `gremlin` (JavaScript automatic semicolon insertion). Tracer kinds such as `char` no longer clash with layout classes.
**Defaults per book:** without a `data-label`, the lamp says `true`/`false` in every book except Python, and the ghost says `nil` (Go), `nullptr` (C++), `undefined` (JavaScript: the ghost is `undefined`, and the `nullframe` character from comic-critters.js is `null`) or `None` (Python, Rust). C++ `.san` builds now stop at the first sanitizer report (`-fno-sanitize-recover=all`).
**More shared pieces:** `tidy` (gofmt) and `specs` (go vet) are now in comic-critters.js. These CSS classes are now in the engine, for every book: `.part-h` (part headings), `.duo` / `.duo.three` / `.duo-card` (side-by-side cards that stack on phones), `.checklist`, `.boss-h` and `.teaser`.
**C++ runs and abort:** C++ programs run as the child of a small shell, so `abort()`, uncaught exceptions and failed `assert`s really end with exit 134. The terminal then shows the shell's `Aborted` line, as a real terminal does, and sanitizer reports say `==2==` (the program's process id). Rust programs that abort, through stack overflow or `process::abort`, need a `name.abort` sidecar for the same reason.
**Trace exercises with keyboard input:** add `"from": "stdout"` to a trace model to read its rows from the program's own output, leaving out the prompts and echoed typing of a `.stdin` run.
**Stack-and-heap pictures (`[data-mem]`):** load `../assets/comic-memory.js` after comic-widgets.js. Its header documents the model. It draws stack frames as plates and heap blocks in a coat-check room, with pointer tickets and arrows. Moved names are dashed, freed blocks are hatched, and the screen is parity-checked like the tracer. It also provides the `key` creature for ownership (one key = one owner; `data-state="moved"`, `data-variant="copy"` or `"cut"`). Use it in Rust ownership, borrowing and smart-pointer chapters, in C++ pointer, reference and `unique_ptr` chapters, and in Go pointer chapters. Rust chapter 7 shows it in use.

**Tracer value-box labels (engine note).** A plain value object (`{ kind, value }`) now accepts an optional `label` too, shown after its kind (`int · main's`) in both the picture and the text version. Use it to tell apart two boxes of the same type, such as an argument and its copy.

**Stack-and-heap stepper styles (engine note).** The `.mem-*` / `.mh-*` styles for `[data-mem]` now ship in `assets/comic-widgets.css`. Load `comic-memory.js` and you get the look; don't copy rs-ch7.css rules into your chapter CSS.

**Machine name plates (engine note).** The `machine` creature's label plate now fits its text: it widens up to the machine's body, the font steps down from 18px to 13px, and a label still too long is squeezed to fit. Labels like `Object.keys()`, `structuredClone()` and `Thermostat::new` can be used as-is, with no need to shorten them.

**giftbox critter (engine note).** `data-char="giftbox"` (Rust's Option: `data-state="some"` with `data-label`, or `data-state="none"`) is now in comic-critters.js. Load comic-critters.js to use it; don't copy it from rs-ch11.js.

**Parsons: blank lines and pinned lines (engine note).** Blank lines in a parsons program are no longer puzzle pieces: they stay where they are and aren't shown, so there's no need to strip them from the program. Add `"pin": [1, 2, 3]` (1-based line numbers) to show lines fixed in place with no arrows. Use it for headers whose order is a convention rather than logic, such as Go's `package` and `import` lines or C++ `#include`s. Unpinned programs without blank lines scramble exactly as before.

**Choice options are shuffled (engine note).** The engine now shows a choice exercise's options in a deterministic shuffle seeded by the exercise id. Across the first 58 chapters the right answer was written first or second in 349 of 403 questions, and in Go it came first in 64 of 69. Write options in any order. Options starting with "Neither", "Both", "None of" or "All of" stay at the end. Add `"keepOrder": true` when the options form a sequence, such as ascending numbers. Don't refer to options by position ("the second answer") in text.

**Memory stepper views (engine note).** In `[data-mem]` a slot with `ptr` and `len` but no `cap` is drawn as a two-field view (len, ptr). Use it for `&str`, `&[T]` and Go string headers.

**`data-same-src` badge (engine note).** `<span class="parity" data-same-src="a.cpp,b.cpp"></span>` is now in comic-widgets.js. It proves that the listed captured files hold identical source. Don't copy it from cpp-ch7.js.

**versionDifferences (capture note).** capture.py now lists a program in `meta.versionDifferences` only when the secondary run differs in output, exit code or messages. A different displayed command (g++ vs clang++) no longer counts. `alt` is still recorded for every program whose secondary record differs in any way, so `data-alt` keeps working.

**Memory stepper: references to stack slots (engine note).** In `[data-mem]` a slot may carry `"ref": "x"` or `"ref": "frame/x"` instead of `ptr`. It draws a `ref` cell labelled `&x` (override with `"refLabel"`) and an arrow running just right of the plates to the slot it refers to, including slots in other frames (for example `bump`'s `p: &mut i32` pointing at `main/x`). Use it for Rust `&x`/`&mut x`, C++ `&x` references and `int* p = &x`, and Go `&a`. The text version says "pointing at main/x". An unknown target is reported as an error.

**SVG text sizing in chapter CSS (house rule).** A CSS rule such as `.fig text { font-size: 16px }` beats the `font-size`/`fill` attributes written on `<text>` or on a parent `<g>`, because CSS always overrides SVG presentation attributes. Three authors hit this. If your drawings size text with attributes, scope the rule as `.fig text:not([font-size])` or use classes (`.fig text.s`, `.fig text.h`). Don't copy another chapter's `.fig text` block without checking this.

**Timings, PIDs and other run-to-run noise (house rule).** capture.py deliberately does not rewrite output behind the reader's back. When a real run prints something that changes every time (test durations, process IDs, install times, temp paths), normalise it visibly in the shown command, e.g. `node --test | sed -E 's/[0-9.]+ms/…ms/'`, and say so on the page, as js ch14 does. Otherwise mark the program `.nondet`, label it "one possible run", and never use it as an answer key. Hidden normalisation would make "every program really ran" untrue.

**Showing variation (house rule).** To show that something varies between runs (map order, test order, addresses), don't rely on the secondary toolchain happening to differ: a recapture can make them match, and the panel breaks (go ch12 and rust ch14 both did this). Write one program that prints the varying thing several times, or capture two named programs on the primary toolchain and mark them `.nondet`.

**More shared critters (engine note).** comic-critters.js now also has `fetch` (Python ImportError dog) and `marshal` (Ember the Fire Marshal, C++ exceptions). Load comic-critters.js and use them; don't copy them from py-ch13.js or cpp-ch15.js.

**Checklists (engine note).** `.checklist li` no longer needs a single `<span>` around its content: the number badge is absolutely placed, so any mix of text, `<b>`, `<code>` and links lays out as one paragraph.

**Tracer cycles (engine note).** Tracer objects may refer to each other in a cycle (e.g. `prototype` ↔ `constructor`). Arrows draw normally, and the text version prints a repeated object as `{...}` / `[...]`.

**parcel critter (engine note).** `data-char="parcel"` (Rust's Result: `data-state="ok"` with a gift, or `"err"` with a note; plus `data-label`) is now in comic-critters.js. Python ch17 and ch21 have an unrelated chapter-local `parcel`.

**Wide drawings on phones (engine note).** Wrap a wide SVG as `<div class="picscroll"><svg class="fig pic-wide" …></svg></div>`. Below 640px it keeps a 560px width and scrolls sideways inside the panel, so labels stay readable. This is the alternative to drawing a second phone version. Keep the text version.

**Naming chapter widgets and characters (house rule).** Generic names already collide across chapters: `[data-report]` means three different widgets, and `parcel`, `cutter`, `backpack` and `inspector` each have two or three different drawings. In a chapter extension, name new attributes and characters distinctively (e.g. `[data-testboard]`, `data-char="resultbox"`), and grep `assets/` and `assets/ext/` for the name before using it.

**Rust crates (capture note).** crates.io is reachable from the capture machine, so a `.deps` sidecar can name any crate. Pin exact versions (`= "=1.13.3"`) so captures stay reproducible. Already cached: anyhow 1.0.104, thiserror 2.0.21, unicode-segmentation 1.13.3.

**Tracer: leaked objects (engine note).** A tracer object may carry `"leaked": true`. It's drawn faded and dashed like an unreachable object even when it is still pointed at from inside a cycle (shared_ptr or Rc cycles). Say in the step's note that no name can reach it.

**pager critter (engine note).** `data-char="pager"` (JavaScript async: `data-state` wait / buzz / no / never) is now in comic-critters.js.

**inspector critter (engine note).** `data-char="inspector"` is the Rust book's hard-hat Inspector (PASS/FAIL stamp), now in comic-critters.js. Python ch21 and C++ ch18 have their own different chapter-local inspectors.

**`merged` is a separate run (capture note).** When a step prints to both streams, capture.py re-runs it with stderr merged into stdout to get the real interleaving. Anything that varies per run (thread ids, addresses) can therefore differ between `merged` and `stdout`/`stderr`. Don't quote such values from one stream next to the other.

**kitchenhand critter (engine note).** `data-char="kitchenhand"` (Go goroutine helper, numbered with `data-label`) is now in comic-critters.js.

**umpire critter (engine note).** `data-char="umpire"` (Juno, the JavaScript test referee) is now in comic-critters.js.

**trailguide critter (engine note).** `data-char="trailguide"` (the Rust clippy hiker, with optional `data-sign`) is now in comic-critters.js.

**Design tokens (engine note, 2026-11-08).** `comic.css :root` now has semantic tokens on top of the palette:
- colour roles: `--background`, `--foreground`, `--primary`(+`-foreground`), `--secondary`(+`-foreground`), `--accent`(+`-foreground`), `--muted`(+`-foreground`), `--destructive`(+`-foreground`), `--border`, `--input`, `--ring`
- radii: `--radius-sm` 4px, `--radius-md` 8px, `--radius-lg` 14px, `--radius-pill`
- shadows: `--shadow-hard`, `--shadow-hard-lg`, `--shadow-hard-sm` (pressed)
- motion: `--ease-out`, `--ease-in-out`, `--dur-press` 100ms, `--dur-release` 160ms, `--dur-fast` 150ms, `--dur-ui` 200ms, `--dur-move` 280ms

Use them in chapter CSS instead of raw values. The old palette names still work.

`--destructive` (error red) is 7:1 on paper only. Never put it on cream, pink or grey.

Motion in chapter CSS follows the same rules as the engine:
- animate `transform`/`opacity` only
- `--ease-out` for anything entering or pressed, never `ease-in`
- nothing on UI over 300ms
- entrances start at scale 0.95 plus opacity
- hover motion only inside `@media (hover: hover) and (pointer: fine)`

With `prefers-reduced-motion` the engine now keeps short fades instead of stopping everything, and `L.motionOn()` returns false, so scripted movement stays off. The full class map, states and motion table are in `tools/DESIGN_SYSTEM.md`.

**Engine files (engine note).** The shared engine is every `assets/comic*.js` and `assets/comic*.css`. That's seven files: comic.css, comic-widgets.css, comic.js, comic-widgets.js, comic-memory.js, comic-cast.js and comic-critters.js. A chapter never edits them. The list near the top of this guide names only four.

**`.term.wrap` is in the engine (engine note).** `<pre class="term wrap" data-run="x.cpp">` wraps long lines with a hanging indent. A wrapped line continues under its first character, plus 2 columns. Terminal text breaks at spaces only, and a token longer than the line scrolls sideways.
- A source line that a compiler caret line (`^^^`, `---`, `~~~^~~~`, `|____^`) points into never wraps, so the markers stay under the code they mark.
- The caret line's label wraps under its markers.
- Don't define `.term.wrap` in chapter CSS any more. The 49 identical copies are listed for removal in `tools/review/engine-refresh-chapter-todo.md`.

**Parsons `alts` (engine note).** `"alts"` lists extra orders that are also accepted. Each one is either:
- the whole program as 1-based source line numbers, e.g. `[1, 3, 2, 4]`, or
- `{"order": [1, 3, 2, 4], "program": "swap_alt.py"}`

Blank and pinned lines must stay in place. Prefer the program form, because it's proven: the engine reports an error unless that captured program's source is exactly that order and its real output equals the main program's. Add an order only after a real run shows it works. A learner who uses an accepted order sees "it works too: it is one of the accepted orders".

**Fill `sets` (engine note).** By default each blank is graded on its own (its `text` or one of its `accept` spellings). So with two blanks, a learner could mix half of one valid answer with half of another, and the result would not compile.

Add `"sets": [["<", "0"], [">=", "1"]]` (one value per blank, in blank order) to accept only complete answers: the key (with its `accept` spellings) or one whole set. Each blank is then marked against the closest complete answer. Wrong blanks and trace cells also get `aria-invalid="true"`. The "Your code" column now puts each answer at its own blank's position.

**Tracer and memory stepper phone layout (engine note).** A tracer or `[data-mem]` picture now keeps one size for the whole run: the widest and tallest that any step needs. Labels never zoom between steps, and the buttons below never jump.
- When the picture is wider than its box, it's drawn at natural size (every label 12px or larger) and the box scrolls sideways with a "Swipe sideways" hint. Otherwise it fills the box.
- On phones the layout is stacked: names on top, objects below, arrows in the right-hand gutter. Its cells start smaller so more pictures fit without scrolling.
- Expect empty space under early steps of a run whose later steps add objects.
- A long `label` on a list/object box, or on a heap block, now widens the box instead of running past it.
- The first slot of a stack frame sits lower, so its type label clears the "running now" note.
- `.mh-lab` is 12px.
- Chapter copies of comic-memory.js (rs-ch7.js) bypass all of this: see the fix-round list.

**Wrapped code lines and anatomy lines (engine note).** Walkers, `.term.wrap`, and (on phones) tracer code, parsons and spot lines wrap with a hanging indent. Breaks fall at spaces and after `. , ( [ { / ; ::`, so a line breaks at `line.strip().` and not inside `split`. Extensions can call `L.hangLines(lineElements)` on their own code lists.

Two more phone changes:
- Fill exercises no longer wrap: the box scrolls instead.
- Parsons arrows stack vertically to give the code more room.

`.anat-line` wraps between its parts (never inside one) when it's wider than its box.

Opened notebook pages and quiz lists never widen the page. `tools/check_chapter.js` now opens every `<details>` and fails a page that overflows sideways with them open.

**Highlighter and terminals (engine note).** A few highlighter and terminal changes:
- C++ lines starting with `<<` and Rust `<T as Trait>` lines are no longer treated as HTML.
- Rust raw strings with hashes (`r#"say "hi""#`) are coloured whole.
- Rust block comments nest.

rs-ch1.js's highlight override is now redundant.

Merged-stream terminals colour a line as an error when:
- it equals a stderr line, or
- it matches a stderr line after every digit run and `0x…` address is replaced by one placeholder, and it doesn't match a stdout line that way.

This covers thread ids, pids and timings that differ in the separate `merged` run.

**Critter labels (engine note).** These labels were enlarged to stay readable at the default 130px character width:
- the cabinet's drawer labels (17 units, squeezed only when long)
- the crate's and train's index numbers
- Tumble's index digits

The train's frame is now 130 units tall. Characters drawn at `.sm` or smaller sizes still shrink their labels below 12px.

**Engine pass 2 (engine note, 2026-11-08).** Full list in `tools/DESIGN_SYSTEM.md` §8; chapter clean-ups in `tools/review/engine-pass2-chapter-todo.md`. What changes for authors:
- **Steppers keep their height.** `L.runner(box, total, render, { reserve: true })` reserves the tallest step's height for `.narration`, `.screen pre` and any element marked `data-reserve`, so the buttons never move between steps. The walker, map, tracer and memory stepper already do it. In an extension stepper, pass `{ reserve: true }` (or a selector) and put `data-reserve` on a picture or clue box whose height changes per step. Your `render(state, announce)` must draw a step from the state alone; it is called once per step, with `announce = false`, when the box first nears the screen. Helpers: `L.reserveHeight(el, heights)`, `L.reserveSteps(...)`.
- **Phones: controls stick, the clue scrolls into view.** At ≤640px a panel's stepper controls stick to the bottom of the screen, and after each press the page scrolls just enough to show the first `li.now`, `.hl` or `[data-now]` in the box. Mark your widget's highlighted clue with one of those. Don't give `.panel` an `overflow` of your own (it is `clip` now, which sticky needs).
- **Failing runs wrap on phones** (`.wrap-sm`, added automatically when the run's exit code is non-zero). Add `data-nowrap` to a terminal that must scroll instead. Card terminals (`.duo-card pre.term`) are always `.wrap`. Don't force `white-space: pre-wrap; overflow-wrap: anywhere` on terminals in chapter CSS: it splits tokens and moves carets.
- **Text versions stack on phones** as one card per step, labelled from the table header. Write `<thead>` header cells as you do now; no chapter CSS needed. For a cheat-sheet table of names and meanings use `<table class="ref-table">`: names never break, and rows stack at ≤560px.
- **Wide drawings:** `.picscroll` now shows "Swipe sideways…" and a right-edge fade only while the drawing really overflows. Don't roll your own hint or `.pic-scroll` wrapper. `L.scrollHint(el)` gives any other sideways scroller the same behaviour.
- **Labels:** text in character drawings must render at 12px or more at the size you draw it. Decorative plates that can't be (the Compiler's name at `.sm`) carry `class="lbl-deco"` and are hidden below 12px by `L.fitLabels()`; say the name in the bubble.
- **Code wrapping:** break points never fall inside string literals or after a 1–2 letter receiver, short strings never wrap, terminal lines never break at a hyphen, and parsons pieces wrap at every width. Nothing to do in chapters; delete local workarounds.
- **Checker:** `tools/check_chapter.js` now also fails a page when, with every `<details>` open, a `.panel` is wider inside than out (content clipped by the panel), or a strip/notebook child runs past the body's gutter. The message names the panel ("panel clip: P42 +398px").

**Engine pass 3 (engine note, 2026-11-08).** Full list in `tools/DESIGN_SYSTEM.md` §9. What changes for authors:
- **`hidden` always hides.** The engine has `[hidden] { display: none !important; }`. Don't write `.x[hidden] { display: none }` in chapter CSS.
- **Heap caption:** the stack-and-heap picture says "HEAP". Give it your chapter's picture with `data-heap-label` on the `[data-mem]` section (or on any ancestor): `data-heap-label="the coat-check room"` draws "HEAP · the coat-check room". Rust uses the coat-check room, C++ ch13 the library, Go ch28 the storage unit. Don't call the heap a coat check in C++ or Go (it is a map there).
- **Entrances:** add class `fx-in` to an element of your widget that appears and shows what changed. It gets the engine's pop-in (your own, more specific animation wins), a 150ms fade under reduced motion, and nothing when animations are off. Don't write your own reduced-motion fade rule, and don't borrow `.tr-new`.
- **Sanitizer reports:** `[data-asan="ID"]` (comic-widgets.js) is the annotated report reader first built in C++ ch11: a model `{program, fold?, parts: [{title, match, after?, all?, note}]}` and the markup `.rep-keys`, `.rep-text`, `.narration`, `.parity`, `[aria-live]`, optional `ol.rep-tv` and `details.rep-more > pre.rep-full`. Don't copy it.
- **Part of a program:** `<pre class="code" data-src="big.rs" data-lines="12-30">` shows lines 12 to 30 of the captured source.
- **Characters added to comic-critters.js:** `linecook` (data-variant a|b|c|d, data-pose work|wait|ticket|knife|cheer, data-label), `asyncwaiter` (data-pose tray|run|frozen|note|cheer, data-label), `cookiecutter` (data-label, data-size="small"), `cookie` (data-label, data-icing), `emptytrain`. Load comic-critters.js and use them.
- **Labels:** text in a drawing must render at 12px or more at the size you draw it. Data labels in engine drawings grow toward 12px when drawn small (`lbl-grow`: ghost, pager, kitchen helper, sealed crate, bag, cookie, cookie cutter); decorative ones hide (`lbl-deco`: Compiler, Linker, Pip's `>_`, the Bouncer's CREW, the cooks' badges). This works for any `svg[data-char]`, with or without `.char`, and again after you redraw a character with `L.drawCast(scope)`. A kitchen helper that is busy now shows its number on the pot.
- **Code in cards** (`.duo-card pre.code`) wraps with the hanging indent at code break points. Table scrollers (a wrapper around a wide table with `overflow-x: auto`, and trace exercise tables) show the "Swipe sideways" hint and fade while they overflow. Text versions of tracers, walkers and memory steppers break code at the engine's break points. Code in a `.part-h` heading is a paper chip with ink text. No chapter CSS is needed for any of these.
