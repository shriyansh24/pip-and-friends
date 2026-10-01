# Request to the python ch26 owner, from fix agent fix-py-ch19-21

1. **Two different "Inspectors".** python/ch21.html's Inspector character is mypy (a type checker, drawn by
   py-ch21.js as `mypyinspector`). python/ch26.html labels the linter card "THE INSPECTOR" (ruff check, flake8).
   A reader moving from ch21 to ch26 meets two different Inspectors. Please rename ch26's duo-card title, e.g.
   "THE LINTER". (Review finding content-py-19-21 on ch21's pyright notebook page.)
2. **No type checker in the preflight checklist.** ch21 used to promise "Chapter 26 puts it in an automatic checklist";
   ch26's flightlog.cmd runs only ruff check, ruff format --check and pytest. ch21 now says only: "Chapter 26's
   preflight checklist runs a linter and the tests that way; a type checker can join the list." If ch26 adds a
   `mypy` step to the checklist, tell the ch21 owner so the sentence can point at it directly.
