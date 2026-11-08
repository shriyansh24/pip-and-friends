# Reporting issues

This page explains how to report a problem with Pip & Friends and lists the issues that are already known.

## Choose a report type

| Report type | Use it when | Template |
|-------------|-------------|----------|
| Bug report | output is wrong, a page breaks or a widget does not respond | [bug.yml](https://github.com/shriyansh24/pip-and-friends/issues/new?template=bug.yml) |
| Chapter feedback | a panel, explanation or exercise is confusing | [chapter-feedback.yml](https://github.com/shriyansh24/pip-and-friends/issues/new?template=chapter-feedback.yml) |
| Book request | you want a new book, framework or topic | [book-request.yml](https://github.com/shriyansh24/pip-and-friends/issues/new?template=book-request.yml) |

## Include these details

Every report needs:

1. **Book and chapter**, for example "Go ch9".
2. **Panel or exercise**, for example "panel 14" or "the second predict exercise".
3. **What you expected** and **what you saw**.
4. **Browser and screen size**, for example "Firefox 140, phone".
5. **A screenshot**, if the problem is visual.

Bug reports about program output also need the toolchain version you used and the output you got.

## Labels

| Label | Meaning |
|-------|---------|
| `bug` | Something is wrong and needs a fix. |
| `content` | The explanation, story or exercise needs work. |
| `accessibility` | The page fails for keyboard, screen reader or reduced-motion users. |
| `book-request` | A request for a new book or topic. |
| `good first issue` | A small fix that suits a first contribution. |
| `deferred` | A known issue that is accepted for now. |

## Known issues

These issues are known and deferred. [`source/tools/INTEGRATION_TODO.md`](source/tools/INTEGRATION_TODO.md) has the full notes.

| Area | Issue | Severity |
|------|-------|----------|
| Engine | Tracer arrows cross each other in Python ch5. | Low |
| Engine | The text version of the code walker shows blank lines as full rows (Python ch6). | Low |
| Engine | Comparison cells wrap on phones in Python ch4. | Low |
| Engine | Compiler output has no shared fold control (C++ ch21 and ch29). | Low |
| Engine | Radio groups have no shared keyboard helper. | Low |
| Go | Go ch9 and ch28 use separate slice-window widgets, not one shared widget. | Low |
| C++ | C++ ch17 has no predict or trace exercise over CMake logs. | Low |
| JavaScript | JavaScript ch18 has panels that could be merged for better pacing. | Low |

## Security

Do not report a security problem in a public issue. Use [private vulnerability reporting](https://github.com/shriyansh24/pip-and-friends/security/advisories/new) instead.
