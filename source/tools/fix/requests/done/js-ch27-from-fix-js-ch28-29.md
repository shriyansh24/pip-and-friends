# Request to js ch27 from fix-js-ch28-29

Source: tools/fix/js-ch28.md item 14 (book-js: 'theater' vs 'theatre'). The book's majority spelling and Kit's "Lantern Theatre" use "theatre", so chapter 28 is retitled **"Theatre and Mail"** (its <title>, h1 and body now say so; ch29's ch-nav and book card already use the new title). The host names `theater.test` and the file `stage/theater.cjs` keep their spelling, because they are program identifiers.

Please change in javascript/ch27.html:
- line ~841, `aria-label="Panel 45: next time, theater and mail"` -> `next time, theatre and mail`
- line ~855, `NEXT: CHAPTER 28 · THEATER AND MAIL` -> `NEXT: CHAPTER 28 · THEATRE AND MAIL`
- line ~857, the ch-nav link `Ch 28 · Theater and Mail →` -> `Ch 28 · Theatre and Mail →`
- (ch27 also has 3 other 'theater' spellings in body text per the book review; worth making them 'theatre' too unless they are the `theater.test` host name.)

Integration also needs: tools/plans/javascript.json ch28 "title" -> "Theatre and Mail" (and "a theater" in its scope/visuals -> "a theatre"), then re-run gen_index.py so javascript/index.html picks it up.
