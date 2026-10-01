# Fix bundle: go/ch25.html

6 review findings, 3 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 12** (content-go-25-27): Specs claims go test runs the copylocks check for you. It doesn't: copylocks is not in go test's default vet set, so a test run passes silently on this bug.
   - evidence: Page (Specs bubble): "go test runs this check of mine for you." Go 1.27.3 source, src/cmd/go/internal/test/test.go defaultVetFlags: "// \"-copylocks\"," is commented out. The enabled ones are atomic, bools, buildtag, directive, errorsas, ifaceassert, nilfunc, printf, slog, stdversion, stringintconv, tests. Scratch run on Go 1.27.3: a package with `func (c Counter) Inc()` (Counter holds a sync.Mutex) plus a test gives `go test` → PASS, while `go vet .` → "Inc passes lock by value: x.Counter contains sync.Mutex".
   - fix: Replace the sentence with: "go test doesn't run this check, so run go vet ./... yourself (or in CI)."
2. **[medium] [content] panel notebook: Lab, step 1** (content-go-25-27): The lab says to remove the runtime.Gosched() line from race_count.go and run again. Doing exactly that doesn't compile, because "runtime" is then imported and not used.
   - evidence: Lab: "Then remove the runtime.Gosched() line and try again: how often does it go wrong now?" Scratch, Go 1.27.3: race_count.go with that line deleted → "./nopause.go:5:2: \"runtime\" imported and not used".
   - fix: "Then remove the runtime.Gosched() line and the \"runtime\" import (the Compiler will remind you), and try again …"
3. **[low] [content] panel 12** (content-go-25-27): Calls Specs "the go vet checker from chapter 15". Specs and go vet are introduced in chapter 2, and ch27 says "You met me in chapter 2".
   - evidence: ch25 P12 readlist: "Specs, the go vet checker from chapter 15, spots it". go/ch2.html part 2 is titled "Tidy and Specs: gofmt and go vet". ch27 P27: "You met me in chapter 2: I'm go vet."
   - fix: "Specs, the go vet checker from chapter 2, spots it".
4. **[low] [content] panel 30 (exercise ex-errg)** (content-go-25-27): Promises "In chapter 26 you'll meet errgroup.WithContext". Chapter 26 mentions it in only one sentence in its notebook, with no code or explanation.
   - evidence: ex-errg why: "(In chapter 26 you'll meet errgroup.WithContext, which also tells the others to stop when one fails.)" go/ch26.html only mention, in its 'In real programs' notebook page: "The errgroup package from chapter 25 does this with errgroup.WithContext."
   - fix: "(errgroup.WithContext, mentioned in chapter 26's notebook, also tells the others to stop when one fails.)"
5. **[low] [content] panel 33** (content-go-25-27): The map's TIMER RINGS place says "line 18: return -1". In leak_slow.go, return -1 is on line 19 (line 18 is the time.After case), and the map's own step note says line 19.
   - evidence: map-leak state T: "sub": "line 18: `return -1`". leak_slow.go line 18 is "case <-time.After(50 * time.Millisecond):" and line 19 is "return -1 // gave up waiting". Slow-path step note: "fetch returns -1 (line 19)".
   - fix: Change the sub to "line 19: `return -1`" (or "lines 18–19: timer case").
6. **[low] [content] panel 5 (also recap, Lab macOS)** (content-go-25-27): Says the race detector needs cgo and a C compiler, with no exception. The Go docs say a C compiler isn't needed on macOS (Darwin), which also makes the lab's Xcode step unnecessary for -race.
   - evidence: Page P5: "The race detector needs cgo (Go's bridge to C) and a C compiler." go.dev/doc/articles/race_detector: "The race detector requires cgo to be enabled, and on non-Darwin systems requires an installed C compiler."
   - fix: P5: "…needs cgo, and on Linux and Windows a C compiler." Lab macOS: drop the xcode-select step for -race, or say it's only needed for other cgo use.

## INTEGRATION_TODO lines naming this chapter
- ## From go ch25 (Keys and Conveyor Belts)
- go-ch25 copies ch24's `kitchenhand` (guarded). Promote it with `mailcarrier` if more chapters use them.
- go ch25 P12 / ch26 P18 (high): `go test` does NOT run copylocks or lostcancel (they're commented out of defaultVetFlags), so the claims are false. Rewrite them, and capture `go test` on a package with both bugs to show it.

## Engine-refresh clean-ups for this chapter
- `go-ch25.js:197`
- `go-ch25.js:256`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
