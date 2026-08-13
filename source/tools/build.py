#!/usr/bin/env python3
"""Assemble the shippable site from comic-site/ into two folders:

  dist/publish/  for the Artifact publish: index.html stays a bare page body (the Artifact wraps it); chapter
                 pages are full documents.
  dist/local/    for opening from disk: identical, except index.html is wrapped in a full HTML document.

Only shipped files are copied: index.html, python/ch*.html, assets/ (engine plus ext/), and data/py-ch<N>.js for the
chapters that exist. Fixtures, tools, sources, JSON audit copies and the ch99 test data are excluded.
The script fails loudly if a chapter page references a file that is not shipped.

--preview  ships only chapters that are ready (see tools/gen_index.py: page exists AND finished), and in the copies
           rewrites links to chapters that are not ready yet ("ch12.html", "ch12.html#x") to that book's contents page
           ("index.html#ch12"), where the chapter is listed as being written. Source pages are never modified.
           Without --preview every chapter page is shipped and a dangling link fails the build."""
import re
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gen_index import ready_set  # noqa: E402

SITE = Path(__file__).resolve().parent.parent
DIST = SITE / "dist"
WRAP_HEAD = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
             '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n')


BOOKS = {"python": "py", "rust": "rs", "go": "go", "cpp": "cpp", "javascript": "js"}


PREVIEW = "--preview" in sys.argv[1:]
CHLINK = re.compile(r'(?<![\w-])href="(ch(\d+)\.html)(#[^"]*)?"')


def shipped():
    files, pages = [SITE / "index.html"], []
    ready = ready_set() if PREVIEW else None
    for folder, prefix in BOOKS.items():
        d = SITE / folder
        if not d.is_dir():
            continue
        chs = sorted(d.glob("ch*.html"), key=lambda p: int(re.sub(r"\D", "", p.stem)))
        if PREVIEW:
            chs = [p for p in chs if int(re.sub(r"\D", "", p.stem)) in ready[folder]]
        pages += chs
        if (d / "index.html").exists():
            pages.append(d / "index.html")
        for p in chs:
            data = SITE / "data" / f"{prefix}-{p.stem}.js"
            if not data.exists():
                sys.exit(f"build: {folder}/{p.name} has no captured data file {data.name}")
            files.append(data)
    files += pages
    assets = [p for p in (SITE / "assets").rglob("*") if p.is_file() and p.suffix in (".css", ".js")]
    if PREVIEW:   # leave out chapter extensions of chapters still being written
        pre = {v: k for k, v in BOOKS.items()}
        def keep(p):
            m = re.match(r"(\w+)-ch(\d+)$", p.stem) if p.parent.name == "ext" else None
            return not m or (m.group(1) in pre and int(m.group(2)) in ready[pre[m.group(1)]])
        assets = [p for p in assets if keep(p)]
    files += assets
    return files, pages


def preview_text(p, have):
    """In --preview copies, point links at not-yet-ready chapters to the contents page entry instead."""
    def sub(m):
        return m.group(0) if (p.parent / m.group(1)).resolve() in have else f'href="index.html#ch{m.group(2)}"'
    return CHLINK.sub(sub, p.read_text())


FFFD = "\ufffd"


def escape_fffd(text, suffix):
    """U+FFFD (the replacement character) appears legitimately in chapters about decoding errors, but the artifact host
    rejects files that contain it raw. In the shipped copies only, write it as an escape with the same meaning:
    \\ufffd inside JavaScript/JSON, &#xFFFD; in HTML text. Source files keep the real character."""
    if FFFD not in text:
        return text
    if suffix == ".js":
        return text.replace(FFFD, "\\ufffd")
    parts = re.split(r'(<script\b[^>]*>.*?</script>)', text, flags=re.S)
    return "".join(pt.replace(FFFD, "\\ufffd") if pt.startswith("<script") else pt.replace(FFFD, "&#xFFFD;") for pt in parts)


def check_refs(pages, have):
    bad = []
    for p in pages + [SITE / "index.html"]:
        text = preview_text(p, have) if PREVIEW else p.read_text()
        # Real attributes only: inside an actual tag (escaped code such as &lt;script src="x"&gt; is text, not a link),
        # and not data-src or JS strings.
        for ref in re.findall(r'<[A-Za-z][^<>]*?(?<![\w-])(?:href|src)="([^"#:+\' ]+)"', text):
            target = (p.parent / ref).resolve()
            if target not in have:
                bad.append(f"{p.relative_to(SITE)} -> {ref}")
    if bad:
        sys.exit("build: references to files that are not shipped:\n  " + "\n  ".join(bad))


EXT_LINK = re.compile(r'<link rel="stylesheet" href="\.\./assets/ext/([\w-]+\.css)">')


def inline_ext_css(text):
    """dist/publish only: the artifact host holds at most 511 files per version, and the full five-book site is ~548.
    Each chapter's extension stylesheet is used by that one page only, so in the published copy it is inlined as a
    <style> block at the same place in <head> (same cascade order; the sheets contain no url()), and the 142 .css files
    are not shipped there. Source pages and dist/local keep the separate files."""
    def sub(m):
        css = (SITE / "assets" / "ext" / m.group(1)).read_text()
        if "url(" in css or "</style" in css:
            sys.exit(f"build: {m.group(1)} can't be inlined (url() or </style>)")
        return f'<style data-ext="{m.group(1)}">\n{css}\n</style>'
    return EXT_LINK.sub(sub, text)


def main():
    files, pages = shipped()
    have = {f.resolve() for f in files}
    check_refs(pages, have)
    for kind in ("publish", "local"):
        out = DIST / kind
        out.mkdir(parents=True, exist_ok=True)
        for f in files:
            if kind == "publish" and f.suffix == ".css" and f.parent.name == "ext":
                continue                                  # inlined into its page (see inline_ext_css)
            dest = out / f.relative_to(SITE)
            dest.parent.mkdir(parents=True, exist_ok=True)
            if kind == "publish" and f.suffix == ".html" and f in pages:
                text = preview_text(f, have) if PREVIEW else f.read_text()
                dest.write_text(escape_fffd(inline_ext_css(text), ".html"))
            elif PREVIEW and f.suffix == ".html" and f in pages:
                dest.write_text(escape_fffd(preview_text(f, have), ".html"))
            elif f.suffix in (".html", ".js") and FFFD in f.read_text():
                dest.write_text(escape_fffd(f.read_text(), f.suffix))
            else:
                shutil.copy2(f, dest)
        if kind == "local":
            s = (SITE / "index.html").read_text()
            i = s.index('<a class="skip"')
            (out / "index.html").write_text(WRAP_HEAD + s[:i] + "</head>\n<body>\n" + s[i:] + "\n</body>\n</html>\n")
    total = sum(f.stat().st_size for f in files)
    npub = sum(1 for f in (DIST / "publish").rglob("*") if f.is_file())
    print(("build (preview): " if PREVIEW else "build: ") + f"{len(files)} files ({total / 1024:.0f} KB), {len(pages)} pages -> dist/local; "
          f"dist/publish has {npub} files (extension CSS inlined)")
    if npub > 511:
        sys.exit(f"build: dist/publish has {npub} files; the artifact host allows 511 per version")


if __name__ == "__main__":
    main()
