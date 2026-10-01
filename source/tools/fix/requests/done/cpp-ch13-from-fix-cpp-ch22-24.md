# Request to the cpp ch13 owner, from fix-cpp-ch22-24

INTEGRATION_TODO "From cpp ch24" CONTRADICTION: cpp ch13's notebook (cpp/ch13.html, around line 968, and the lab around line 1023) says that in g++ 13 AddressSanitizer's stack-use-after-return check "is off unless you run the program with `ASAN_OPTIONS=detect_stack_use_after_return=1`".

On this machine that is not what g++ 13.3 does. Scratch runs (2026-11-08, `g++ -std=c++23 -g -fsanitize=address,undefined -fno-sanitize-recover=all`, run under `setarch x86_64 -R` like capture.py):

| program | ASAN_OPTIONS unset/empty | `detect_stack_use_after_return=0` | `=1` |
|---|---|---|---|
| `/home/you/cpp-ch24/dangling_return.cpp` (lambda capturing a local by reference, returned) | stack-use-after-return reported | no report | reported |
| `/home/you/cpp-ch13/dangle_uar.cpp` (address of a local saved in a global) | stack-use-after-return reported | no report | reported |

So the check is on by default with this g++ 13 / libasan, for both shapes of dangling address. cpp ch24's capture (data/cpp-ch24.json, dangling_return.cpp) agrees: it reports with no ASAN_OPTIONS.

Suggested fix in ch13: capture `dangle_uar.cpp` (it is in /home/you/cpp-ch13 with a `.san` sidecar but is not in data/cpp-ch13.json) and reword the notebook and lab: "g++ 13 here reports it by default; `ASAN_OPTIONS=detect_stack_use_after_return=0` turns it off, and `=1` turns it on on toolchains that leave it off."

cpp ch24's lab now says only what was run (reported with no option; `=0` switches it off).
