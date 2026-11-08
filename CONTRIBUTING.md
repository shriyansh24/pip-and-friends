# Contributing to Pip & Friends

Thank you for helping with Pip & Friends. This guide explains how to give feedback, how to fix a chapter and how to propose a new book.

## Give feedback

Feedback from readers is the most useful contribution. You do not need to write code.

| Feedback | Where to send it |
|----------|------------------|
| Wrong output, typo or broken page | [Open a bug report](https://github.com/shriyansh24/pip-and-friends/issues/new?template=bug.yml) |
| Confusing panel, exercise or explanation | [Open chapter feedback](https://github.com/shriyansh24/pip-and-friends/issues/new?template=chapter-feedback.yml) |
| New book, framework or topic | [Open a book request](https://github.com/shriyansh24/pip-and-friends/issues/new?template=book-request.yml) |
| General question or idea | [Start a discussion](https://github.com/shriyansh24/pip-and-friends/discussions) |

[ISSUES.md](ISSUES.md) explains what to put in a report and lists the known issues.

## Fix a chapter

1. Fork the repository and create a branch, for example `fix-rust-ch7`.
2. Edit the chapter in `source/<book>/chN.html`.
3. Run the chapter's programs again with `source/tools/capture.py` if you changed any code.
4. Check the chapter with `source/tools/check_chapter.js` at 1280 px and 390 px.
5. Build the site with `source/tools/build.py`.
6. Open a pull request that names the book and chapter, for example "Fix Rust ch7: wrong borrow error message".

[`source/AUTHORING.md`](source/AUTHORING.md) explains each tool and the chapter format.

## Follow the chapter rules

- **Use real output.** Every output on a page must come from a real run. Do not type output by hand or edit it after the run.
- **Name the toolchain.** The chapter footer must list the toolchain versions and the date of the run.
- **Pass the checks.** A pull request must keep `check_chapter.js` passing at both widths.
- **Draw in code.** Characters, creatures and panels are SVG and CSS. Do not add image files.
- **Keep the book standalone.** A chapter may refer to earlier chapters in the same book, but never to another book.

## Write in the house style

Readers skim panels and lists quickly, so text in every chapter follows these rules:

- Start each sentence with its subject or its verb.
- Put the words that matter most at the start of a line.
- Give items in a list the same structure.
- Use one word for one idea. For example, a chapter that says "function" does not switch to "method" unless the difference is the lesson.
- Make a difference in length, structure or wording only when the difference means something.

These rules come from [Five Principles for Generating Readable AI Text in Bulk](https://fsdatalab.github.io/blog/agent-text-at-scale/).

## Write commit messages

Start each commit message with a verb, then name the book and chapter:

```text
Fix Rust ch7: wrong borrow error message
Add Go ch29: Contexts and Deadlines
Update C++ ch12: run data from GCC 15
```

## Propose a new book

Open a [book request](https://github.com/shriyansh24/pip-and-friends/issues/new?template=book-request.yml) before you start writing. [SCOPE.md](SCOPE.md) lists the books and topics that are already planned, so check it first.

## License

Pip & Friends uses the [Apache License 2.0](LICENSE). When you open a pull request, you agree that your contribution is licensed under the same terms (section 5 of the license).
