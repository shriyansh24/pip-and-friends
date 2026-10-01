# Request to the cpp ch18, ch22 and ch25 owners, from fix-cpp-ch13-15

Book finding "coat check means two things" (bundle cpp-ch14 item 6): "coat check" is **std::map** (ch14's title and metaphor, reused in ch20 and ch29). Chapter 13 calls the **heap** a **library** (Mabel's library, borrower cards for unique_ptr). The engine's stack-and-heap picture still labels the heap "HEAP · the coat-check room" (an engine change is requested separately: a per-page heap caption such as `data-heap-label`).

Prose in your chapters attributes the heap coat-check room to Chapter 13, which never uses it:
- cpp/ch18.html about line 415: "a block on the heap (Chapter 13's coat-check room)" -> suggested "(Chapter 13's library)".
- cpp/ch22.html about line 690: "watch the coat-check room, the heap" -> suggested "watch the heap".
- cpp/ch25.html panel 19: "holds a ticket to its block in the coat-check room" -> suggested "holds a card for its block on the heap".
