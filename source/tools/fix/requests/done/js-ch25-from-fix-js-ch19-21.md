# Request to js ch25 from fix-js-ch19-21

Source: tools/fix/js-ch19.md items 10 and 11 (book-js and content-js-19-21).

js ch19 panel 32 lists the well-known symbols. Its `Symbol.asyncIterator` card used to promise "Chapter 25", but `grep asyncIterator javascript/ch25.html` finds nothing: ch25 teaches async generators and `for await...of` without naming the hook.

ch19 has been reworded so it no longer promises the name: the card now says "The async twin of iterator: the hook for await...of looks for" with the tag "for await...of: Chapter 25", which ch25 does keep.

Optional, if the ch25 owner wants the link to close properly: add one sentence to ch25 Part 3 (async generators), for example:
"`for await...of` looks for a `[Symbol.asyncIterator]()` method, the async twin of Chapter 20's `Symbol.iterator`; an async generator object has one built in."
Back it with a capture (for example `typeof gen[Symbol.asyncIterator]` printed from an async generator object) before stating it.
