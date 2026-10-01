# Request from fix-js-ch7-9: reduce's running value is no longer a "crate"

Book finding (tools/fix/js-ch9.md item 6, book-js): the crate creature means an array in every chapter, so reduce's
accumulator must not also be a "crate". Chapter 9 now calls reduce's running value the **bucket** ("one bucket
catches them all"; the belt station says "THE BUCKET (running total)"), and arrays are "a crate of numbered boxes".

- javascript/ch21.html Part 3 ("THE CRATE ON THE BELT", panel 18 "three shapes of crate", and the explain texts that
  say "the crate starts empty", "starting crate"): rename the accumulator to the bucket, and change
  "Chapter 9's `reduce` walks the belt with a **crate**" to "... with a **bucket**".
- Recap line "`reduce` crates count, index and group" → "`reduce` buckets ...".
