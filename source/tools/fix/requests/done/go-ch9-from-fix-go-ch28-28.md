# Request to the go ch9 owner, from fix agent fix-go-ch28-28

INTEGRATION_TODO "GO SLICE GROWTH (resolved by evidence)" and go ch28 bundle item 1 ask ch9 and ch28 to agree.

**go/ch9.html line 450** (panel 19 "Different first steps"): "since Go 1.26 the compiler can give a loop's first
`append` a small starter shelf." The cap-4 start for a slice that never leaves its function arrived in **Go 1.25**.

Evidence (2026-11-08):
- Go 1.25 release notes, "Faster slices" (https://go.dev/doc/go1.25, fetched today): "The compiler can now allocate the
  backing store for slices on the stack in more situations ... can also be turned off using
  `-gcflags=all=-d=variablemakehash=n`."
- Scratch run on this machine, /usr/local/go1.25.1 with GOTOOLCHAIN=local, of go ch28's slices_grow.go (a loop of
  appends to `var grow []int`): `len 1 -> new array, cap 4`, same as 1.27.3; with `-gcflags=-d=variablemakehash=n`
  it goes back to `cap 1`, `cap 2`, `cap 4`. Go 1.24.7 prints cap 1, 2, 4.
- The Go 1.26 change (Go blog "Allocating on the Stack", Feb 2026) is for slices that *escape* (returned/stored):
  go ch28's allocs_m.go drops from 12 to 9 trips; Go 1.25.1 still gives 12.

Suggested wording: "Go 1.27.3 started straight at 4: since Go 1.25 the compiler can give a loop's first `append` a
small starter shelf on the stack, when the slice never leaves its function." go/ch28.html now says Go 1.25 for this
(panel 9, notebook, lab note, footer).
