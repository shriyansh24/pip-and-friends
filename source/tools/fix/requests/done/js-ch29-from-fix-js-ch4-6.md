# Request to js ch29 from fix-js-ch4-6

Source: tools/fix/js-ch5.md item 4 (book-js). Chapter 5 is retitled "Doorkeepers and Translators" (its character is the Doorkeeper; "the Bouncer" means ReferenceError throughout the book). ch4, ch5 and ch6 now use the new title.

Please change javascript/ch29.html line ~950, the book card `<a href="ch5.html">Bouncers and Translators</a>`, to `Doorkeepers and Translators`.
(Integration also needs: tools/plans/javascript.json ch5 "title", then re-run gen_index.py so javascript/index.html picks it up.)
