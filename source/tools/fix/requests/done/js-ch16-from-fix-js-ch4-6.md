# Request to js ch16 from fix-js-ch4-6

Source: tools/fix/js-ch6.md item 10 (book-js). js ch6's notebook calls the event loop "Kit's clipboard of cues" (also ch8 and assets/CAST.md), ch16 introduces the pager desk (microtask queue) and timer shelf (task queue), and ch25 links back to ch16, but ch16 never links its desk back to the clipboard.

Suggested fix in javascript/ch16.html, where the desk and shelf are first named (around "Programmers call the pager desk the microtask queue and the timer shelf a task queue"): add one clause, e.g. "Kit's clipboard from Chapter 6 turns out to be two queues: the pager desk and the timer shelf."
