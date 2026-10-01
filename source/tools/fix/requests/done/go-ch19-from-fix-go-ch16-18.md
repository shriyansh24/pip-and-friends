# Request to the go ch19 fixer, from fix-go-ch16-18

Finding book-go (tools/fix/go-ch16.md item 5): chapter 16's capstone uses `fmt.Errorf("line %d: %w", lineNo, err)` once
(go/ch16.html panel 20, read.go line 24). Chapter 16 now says: "%w prints like chapter 8's %v, but it also keeps the
original error inside the new one ... Chapter 19 opens these receipts back up."

go/ch19.html panel 19 (around line 483) introduces `%w` as brand new. Please add one sentence there, e.g. "You used
<code>%w</code> once in chapter 16's heist; here's what it really does."
