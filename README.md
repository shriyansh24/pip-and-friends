# Pip & Friends

Pip & Friends is a set of five comic books that teach programming to complete beginners. Each book covers one language, starts from zero and has its own guide character. The five books have 142 chapters in total.

**Read the books:** https://shriyansh24.github.io/pip-and-friends/

[![Deploy to GitHub Pages](https://github.com/shriyansh24/pip-and-friends/actions/workflows/pages.yml/badge.svg)](https://github.com/shriyansh24/pip-and-friends/actions/workflows/pages.yml)

## Books

| Book | Guide | Chapters | Topics |
|------|-------|---------:|--------|
| [Python](https://shriyansh24.github.io/pip-and-friends/python/) | Pip | 27 | names, decisions, loops, functions, data, files, classes, testing |
| [Rust](https://shriyansh24.github.io/pip-and-friends/rust/) | Mabel | 29 | ownership, borrowing, lifetimes, traits |
| [Go](https://shriyansh24.github.io/pip-and-friends/go/) | Scoot | 28 | types, slices, maps, errors, interfaces, packages, goroutines |
| [C++](https://shriyansh24.github.io/pip-and-friends/cpp/) | Wren | 29 | types, memory, pointers, classes, templates, the standard library |
| [JavaScript](https://shriyansh24.github.io/pip-and-friends/javascript/) | Kit | 29 | values, functions, objects, the DOM, events, async code |

You can start with any book. No book depends on another.

## How the books work

- **Real output.** Every program in a chapter was run in a real toolchain, and the page shows the output from that run. The footer of each chapter lists the toolchain versions and the date of the run.
- **Checked exercises.** Each exercise puts your answer next to the real output, so you can see where they differ.
- **Code-drawn art.** Every character, creature and panel is SVG and CSS. The site has no image files.
- **Offline reading.** The site works from disk. Only the fonts come from the internet, and without a connection the pages use system fonts.
- **Local progress.** Your browser saves your progress. The site sends nothing to a server.

## Run the site locally

```bash
git clone https://github.com/shriyansh24/pip-and-friends.git
cd pip-and-friends/site
python -m http.server 8000
```

Then open http://localhost:8000. You can also open `site/index.html` in a browser directly.

## Repository layout

```text
site/                      published site, deployed to GitHub Pages
  index.html               bookshelf page
  python/ rust/ go/ cpp/ javascript/
                           one folder per book, one chN.html per chapter
  assets/                  comic engine (styles, widgets, characters) and per-chapter files
  data/                    run data for every chapter
source/                    authoring project
  AUTHORING.md             guide to writing, checking and building a chapter
  assets/ data/ src/       engine, run data, multi-part chapter sources
  research/                research notes
  tools/                   capture, check, audit and build scripts
.github/workflows/         Pages deployment
```

## Write a chapter

1. Write the chapter in `source/<book>/chN.html`.
2. Run its programs with `source/tools/capture.py`, which saves the run data to `source/data/`.
3. Check the chapter with `source/tools/check_chapter.js` and `source/tools/audit_chapter.py`.
4. Build the site with `source/tools/build.py`, which writes to `site/`.
5. Push to `main`. GitHub Actions deploys `site/` to GitHub Pages.

[`source/AUTHORING.md`](source/AUTHORING.md) explains each step in detail.

## Status

All 142 chapters pass `source/tools/check_chapter.js` at 1280 px and 390 px with reduced motion (284 of 284 checks). [`source/tools/INTEGRATION_TODO.md`](source/tools/INTEGRATION_TODO.md) lists the known gaps that are deferred.

The programs from every chapter are in `programs.tgz` on the [Releases](https://github.com/shriyansh24/pip-and-friends/releases) page.

## Plans

Java, C and TypeScript books come next, followed by deeper second books for the current languages and books on frameworks. [SCOPE.md](SCOPE.md) has the full plan.

## Contribute

- Report a problem with [ISSUES.md](ISSUES.md).
- Fix a chapter or propose a book with [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

Pip, Mabel, Scoot, Wren, Kit, the Professor, the Compiler and the creatures are original characters. The fonts are Bangers, Comic Neue, Shantell Sans, Atkinson Hyperlegible Next and JetBrains Mono, from [Google Fonts](https://fonts.google.com/).

## License

Pip & Friends is licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for attribution.
