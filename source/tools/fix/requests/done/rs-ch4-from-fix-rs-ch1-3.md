# Request to the rust ch4 fixer, from fix-rs-ch1-3

Finding book-rs (listed in tools/fix/rs-ch2.md item 4, not in rs-ch4.md): the word "lid" is a recap catchphrase
twice with opposite meanings. Chapter 2 uses it first and throughout: `let mut` adds a lid (a box you can change;
TOC "Boxes with lids", recap "SEALED BY DEFAULT ... let mut adds a lid"). Chapter 4 reuses it for a trailing
semicolon that swallows the return value ("the semicolon lid", figure label "SEMICOLON = LID", recap
"A SEMICOLON IS A LID").

Book-wide rule 10 (one meaning per picture): chapter 2 keeps "lid". Please rename chapter 4's picture to fit its own
machine metaphor, e.g. "A SEMICOLON SHUTS THE CHUTE": the TOC entry, panel 15's aria-label and figure label, and the
recap title (avoid "plug", which ch18 uses for traits).
