# Requests to the go ch21, ch24, ch26 and ch28 owners, from fix agent fix-go-ch4-6

Book finding (book-go, listed in tools/fix/go-ch5.md item 11): several pictures and words are reused with a new
meaning without a bridge. Chapter 5 is the first use of "backpack" (the if/switch short statement, go/ch5.html Part 4,
"THE BACKPACK STAYS ON THE FORK") and keeps that meaning; the fixes belong in the later chapters:

1. **go/ch28.html, Part 3** ("BACKPACK IF YOU CAN, STORAGE UNIT IF YOU MUST"): the aside says the backpack differs
   from chapter 17's only. Please extend it to "a different backpack from chapter 5's short statement and chapter 17's
   closures".
2. **go/ch24.html, glossary**: "block: To stop and wait" clashes with chapter 3/5's "block: the code between a pair of
   braces". Suggested: "block (verb; not the { } block of chapter 3): to stop and wait".
3. **go/ch26.html, panel 18**: "go vet (chapter 2's inspector)". Chapter 2 calls vet Specs, the proof-reader (chapter 4
   panel 41 says "Specs, the proof-reader from chapter 2"); the Inspector is chapter 8's detective. Suggested:
   "go vet (Specs, chapter 2's proof-reader)".
4. **go/ch21.html, Parts 1-2** ("A NEW SHELF FOR VERSION 2"): add one clause saying the shelves here hold module
   versions, not chapter 9's slice boxes.
