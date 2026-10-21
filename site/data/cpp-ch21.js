/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "cpp",
  "capturedWith": [
   "g++ 13.3 (-std=c++23)",
   "clang++ 18.1 (-std=c++23)"
  ],
  "primary": "g++ 13.3 (-std=c++23)",
  "date": "2026-11-08",
  "workdir": "/home/you/cpp-ch21",
  "versionDifferences": [
   "const_compare_bad.cpp",
   "conversion_bad.cpp",
   "deleted_copy.cpp",
   "explicit_bad.cpp",
   "friend_bad.cpp",
   "int_plus_bad.cpp",
   "member_plus.cpp",
   "no_print.cpp",
   "point_void.cpp",
   "predict_deleted.cpp",
   "road_explicit.cpp",
   "spot_cmp.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): const_compare_bad.cpp, conversion_bad.cpp, deleted_copy.cpp, explicit_bad.cpp, friend_bad.cpp, int_plus_bad.cpp, member_plus.cpp, no_print.cpp, point_void.cpp, predict_deleted.cpp, road_explicit.cpp, spot_cmp.cpp."
 },
 "programs": {
  "bool_plus.cpp": {
   "src": "#include <iostream>\n\nclass Battery {\npublic:\n    explicit Battery(int percent) : percent_{percent} {}\n    operator bool() const { return percent_ > 0; }\nprivate:\n    int percent_;\n};\n\nint main() {\n    Battery torch{80};\n    std::cout << torch + 1 << '\\n';\n}\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bool_plus.cpp -o bool_plus",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./bool_plus",
     "out": "2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bool_plus.cpp -o bool_plus",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./bool_plus",
      "out": "2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <algorithm>\n#include <compare>\n#include <iostream>\n#include <vector>\n\nclass Money {\npublic:\n    explicit Money(int cents) : cents_{cents} {}\n    auto operator<=>(const Money&) const = default;\n    friend std::ostream& operator<<(std::ostream& out, const Money& m) {\n        return out << '$' << m.cents_ / 100 << '.' << m.cents_ % 100 / 10 << m.cents_ % 10;\n    }\nprivate:\n    int cents_;\n};\n\nint main() {\n    std::vector<Money> prices{Money{450}, Money{99}, Money{1205}};\n    std::sort(prices.begin(), prices.end());\n    std::cout << prices.front() << \" to \" << prices.back() << '\\n';\n    std::cout << std::boolalpha << (Money{100} >= Money{99}) << '\\n';\n}\n",
   "stdout": "$0.99 to $12.05\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_fill.cpp -o boss_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_fill",
     "out": "$0.99 to $12.05\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "$0.99 to $12.05\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_fill.cpp -o boss_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_fill",
      "out": "$0.99 to $12.05\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n\nclass Scores {\npublic:\n    explicit Scores(int first) : data_{new int[3]{first, 0, 0}} {}\n    Scores(const Scores& other) : data_{new int[3]} {\n        std::copy(other.data_, other.data_ + 3, data_);\n    }\n    Scores& operator=(const Scores& other) {\n        if (this == &other) return *this;\n        int* fresh = new int[3];\n        std::copy(other.data_, other.data_ + 3, fresh);\n        delete[] data_;\n        data_ = fresh;\n        return *this;\n    }\n    ~Scores() { delete[] data_; }\n    int& operator[](int i) { return data_[i]; }\nprivate:\n    int* data_;\n};\n\nint main() {\n    Scores mine{7};\n    Scores backup{1};\n    backup = mine;\n    backup = backup;\n    backup[0] = 99;\n    std::cout << mine[0] << ' ' << backup[0] << '\\n';\n}\n",
   "stdout": "7 99\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer boss_parsons.cpp -o boss_parsons",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_parsons",
     "out": "7 99\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.cpp": {
   "src": "#include <iostream>\n\nstruct Vec {\n    int x{0};\n    int y{0};\n    Vec& operator+=(const Vec& o) { x += o.x; y += o.y; return *this; }\n    bool operator==(const Vec&) const = default;\n};\n\nVec operator+(Vec a, const Vec& b) { return a += b; }\n\nstd::ostream& operator<<(std::ostream& out, const Vec& v) {\n    return out << '<' << v.x << ',' << v.y << '>';\n}\n\nint main() {\n    Vec a{1, 2};\n    Vec b{3, 4};\n    Vec c = a + b;\n    (a += b) += b;\n    std::cout << a << ' ' << c << ' ' << std::boolalpha << (a + Vec{-3, -4} == c) << '\\n';\n}\n",
   "stdout": "<7,10> <4,6> true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_predict.cpp -o boss_predict",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_predict",
     "out": "<7,10> <4,6> true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "<7,10> <4,6> true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_predict.cpp -o boss_predict",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_predict",
      "out": "<7,10> <4,6> true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n\nclass Scores {\npublic:\n    explicit Scores(int first) : data_{new int[3]{first, 0, 0}} {}\n    Scores(const Scores& other) : data_{new int[3]} {\n        std::copy(other.data_, other.data_ + 3, data_);\n    }\n    Scores& operator=(const Scores&) = default;\n    ~Scores() { delete[] data_; }\n    int& operator[](int i) { return data_[i]; }\nprivate:\n    int* data_;\n};\n\nint main() {\n    Scores mine{7};\n    Scores backup{1};\n    backup = mine;\n    backup[0] = 99;\n    std::cout << \"mine[0] is \" << mine[0] << std::endl;\n}\n",
   "stdout": "mine[0] is 99\n",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x55555555683d in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x555555556831 in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556966 in Scores::Scores(int) /home/you/cpp-ch21/boss_spot.cpp:6\n    #2 0x555555556478 in main /home/you/cpp-ch21/boss_spot.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer boss_spot.cpp -o boss_spot",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_spot",
     "out": "mine[0] is 99\n",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x55555555683d in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x555555556831 in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556966 in Scores::Scores(int) /home/you/cpp-ch21/boss_spot.cpp:6\n    #2 0x555555556478 in main /home/you/cpp-ch21/boss_spot.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n",
     "exit": 1,
     "merged": "mine[0] is 99\n=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x55555555683d in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556c63 in Scores::~Scores() /home/you/cpp-ch21/boss_spot.cpp:11\n    #2 0x555555556831 in main /home/you/cpp-ch21/boss_spot.cpp:23\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556966 in Scores::Scores(int) /home/you/cpp-ch21/boss_spot.cpp:6\n    #2 0x555555556478 in main /home/you/cpp-ch21/boss_spot.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/boss_spot+0x2304) (BuildId: 88e687983593fb96d041ca4ce1ee2e6b1d9ad975)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n"
    }
   ]
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n\nstruct Tally {\n    inline static int copies{0};\n    inline static int alive{0};\n    Tally() { ++alive; }\n    Tally(const Tally&) { ++copies; ++alive; }\n    ~Tally() { --alive; }\n};\n\nvoid by_value(Tally) {}\nvoid by_ref(const Tally&) {}\n\nint main() {\n    Tally keep;\n    for (int i{1}; i <= 4; ++i) {\n        Tally t;\n        if (i % 2 == 0) by_value(t); else by_ref(t);\n        Tally extra = t;\n        std::cout << i << ' ' << Tally::copies << ' ' << Tally::alive << '\\n';\n    }\n}\n",
   "stdout": "1 1 3\n2 3 3\n3 4 3\n4 6 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_trace.cpp -o boss_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_trace",
     "out": "1 1 3\n2 3 3\n3 4 3\n4 6 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 3\n2 3 3\n3 4 3\n4 6 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_trace.cpp -o boss_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_trace",
      "out": "1 1 3\n2 3 3\n3 4 3\n4 6 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "chain.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nclass Receipt {\npublic:\n    Receipt& add(const std::string& item, int cents) {\n        lines_ += item + \" \";\n        total_ += cents;\n        return *this;\n    }\n    Receipt& operator+=(int tip) {\n        total_ += tip;\n        return *this;\n    }\n    void print() const {\n        std::cout << lines_ << \"= \" << total_ << \" cents\\n\";\n    }\nprivate:\n    std::string lines_;\n    int total_{0};\n};\n\nint main() {\n    Receipt r;\n    r.add(\"tea\", 250).add(\"cake\", 400);\n    r += 50;\n    r.print();\n}\n",
   "stdout": "tea cake = 700 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g chain.cpp -o chain",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./chain",
     "out": "tea cake = 700 cents\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "tea cake = 700 cents\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g chain.cpp -o chain",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./chain",
      "out": "tea cake = 700 cents\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "const_compare_bad.cpp": {
   "src": "#include <iostream>\n\nstruct Card {\n    int rank{0};\n    bool operator==(const Card& other) { return rank == other.rank; }\n};\n\nbool same(const Card& a, const Card& b) {\n    return a == b;\n}\n\nint main() {\n    std::cout << same(Card{5}, Card{5}) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "const_compare_bad.cpp: In function ‘bool same(const Card&, const Card&)’:\nconst_compare_bad.cpp:9:17: warning: C++20 says that these are ambiguous, even though the second is reversed:\n    9 |     return a == b;\n      |                 ^\nconst_compare_bad.cpp:5:10: note: candidate 1: ‘bool Card::operator==(const Card&)’ (near match)\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^~~~~~~~\nconst_compare_bad.cpp:5:10: note:   passing ‘const Card*’ as ‘this’ argument discards qualifiers\nconst_compare_bad.cpp:5:10: note: candidate 2: ‘bool Card::operator==(const Card&)’ (near match)\nconst_compare_bad.cpp:5:10: note:   passing ‘const Card*’ as ‘this’ argument discards qualifiers\nconst_compare_bad.cpp:5:10: note: try making the operator a ‘const’ member function\nconst_compare_bad.cpp:9:17: error: passing ‘const Card’ as ‘this’ argument discards qualifiers [-fpermissive]\n    9 |     return a == b;\n      |                 ^\nconst_compare_bad.cpp:5:10: note:   in call to ‘bool Card::operator==(const Card&)’\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_compare_bad.cpp -o const_compare_bad",
     "out": "",
     "err": "const_compare_bad.cpp: In function ‘bool same(const Card&, const Card&)’:\nconst_compare_bad.cpp:9:17: warning: C++20 says that these are ambiguous, even though the second is reversed:\n    9 |     return a == b;\n      |                 ^\nconst_compare_bad.cpp:5:10: note: candidate 1: ‘bool Card::operator==(const Card&)’ (near match)\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^~~~~~~~\nconst_compare_bad.cpp:5:10: note:   passing ‘const Card*’ as ‘this’ argument discards qualifiers\nconst_compare_bad.cpp:5:10: note: candidate 2: ‘bool Card::operator==(const Card&)’ (near match)\nconst_compare_bad.cpp:5:10: note:   passing ‘const Card*’ as ‘this’ argument discards qualifiers\nconst_compare_bad.cpp:5:10: note: try making the operator a ‘const’ member function\nconst_compare_bad.cpp:9:17: error: passing ‘const Card’ as ‘this’ argument discards qualifiers [-fpermissive]\n    9 |     return a == b;\n      |                 ^\nconst_compare_bad.cpp:5:10: note:   in call to ‘bool Card::operator==(const Card&)’\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "const_compare_bad.cpp:9:14: error: invalid operands to binary expression ('const Card' and 'const Card')\n    9 |     return a == b;\n      |            ~ ^  ~\nconst_compare_bad.cpp:5:10: note: candidate function not viable: 'this' argument has type 'const Card', but method is not marked const\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^\nconst_compare_bad.cpp:5:10: note: candidate function (with reversed parameter order) not viable: 1st argument ('const Card') would lose const qualifier\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^          ~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_compare_bad.cpp -o const_compare_bad",
      "out": "",
      "err": "const_compare_bad.cpp:9:14: error: invalid operands to binary expression ('const Card' and 'const Card')\n    9 |     return a == b;\n      |            ~ ^  ~\nconst_compare_bad.cpp:5:10: note: candidate function not viable: 'this' argument has type 'const Card', but method is not marked const\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^\nconst_compare_bad.cpp:5:10: note: candidate function (with reversed parameter order) not viable: 1st argument ('const Card') would lose const qualifier\n    5 |     bool operator==(const Card& other) { return rank == other.rank; }\n      |          ^          ~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "conversion_bad.cpp": {
   "src": "#include <iostream>\n\nclass Battery {\npublic:\n    explicit Battery(int percent) : percent_{percent} {}\n    explicit operator bool() const { return percent_ > 0; }\n    explicit operator int() const { return percent_; }\nprivate:\n    int percent_;\n};\n\nint main() {\n    Battery torch{80};\n    int level = torch;\n    std::cout << level << \"%\\n\";\n}\n",
   "stdout": "",
   "stderr": "conversion_bad.cpp: In function ‘int main()’:\nconversion_bad.cpp:14:17: error: cannot convert ‘Battery’ to ‘int’ in initialization\n   14 |     int level = torch;\n      |                 ^~~~~\n      |                 |\n      |                 Battery\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g conversion_bad.cpp -o conversion_bad",
     "out": "",
     "err": "conversion_bad.cpp: In function ‘int main()’:\nconversion_bad.cpp:14:17: error: cannot convert ‘Battery’ to ‘int’ in initialization\n   14 |     int level = torch;\n      |                 ^~~~~\n      |                 |\n      |                 Battery\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "conversion_bad.cpp:14:9: error: no viable conversion from 'Battery' to 'int'\n   14 |     int level = torch;\n      |         ^       ~~~~~\nconversion_bad.cpp:7:14: note: explicit conversion function is not a candidate\n    7 |     explicit operator int() const { return percent_; }\n      |              ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g conversion_bad.cpp -o conversion_bad",
      "out": "",
      "err": "conversion_bad.cpp:14:9: error: no viable conversion from 'Battery' to 'int'\n   14 |     int level = torch;\n      |         ^       ~~~~~\nconversion_bad.cpp:7:14: note: explicit conversion function is not a candidate\n    7 |     explicit operator int() const { return percent_; }\n      |              ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "conversion_op.cpp": {
   "src": "#include <iostream>\n\nclass Battery {\npublic:\n    explicit Battery(int percent) : percent_{percent} {}\n    explicit operator bool() const { return percent_ > 0; }\n    explicit operator int() const { return percent_; }\nprivate:\n    int percent_;\n};\n\nint main() {\n    Battery phone{0};\n    Battery torch{80};\n    if (!phone) std::cout << \"phone is flat\\n\";\n    if (torch) std::cout << \"torch works\\n\";\n    std::cout << static_cast<int>(torch) << \"%\\n\";\n}\n",
   "stdout": "phone is flat\ntorch works\n80%\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g conversion_op.cpp -o conversion_op",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./conversion_op",
     "out": "phone is flat\ntorch works\n80%\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "phone is flat\ntorch works\n80%\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g conversion_op.cpp -o conversion_op",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./conversion_op",
      "out": "phone is flat\ntorch works\n80%\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "deep.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n\nclass Scores {\npublic:\n    explicit Scores(int first) : data_{new int[3]{first, 0, 0}} {}\n    Scores(const Scores& other) : data_{new int[3]} {\n        std::copy(other.data_, other.data_ + 3, data_);\n    }\n    Scores& operator=(const Scores& other) {\n        if (this != &other) std::copy(other.data_, other.data_ + 3, data_);\n        return *this;\n    }\n    ~Scores() { delete[] data_; }\n    int& operator[](int i) { return data_[i]; }\nprivate:\n    int* data_;\n};\n\nint main() {\n    Scores mine{7};\n    Scores copy{mine};\n    copy[0] = 99;\n    std::cout << \"mine[0] is \" << mine[0] << \", copy[0] is \" << copy[0] << '\\n';\n    copy = mine;\n    std::cout << \"after copy = mine: copy[0] is \" << copy[0] << '\\n';\n}\n",
   "stdout": "mine[0] is 7, copy[0] is 99\nafter copy = mine: copy[0] is 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer deep.cpp -o deep",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./deep",
     "out": "mine[0] is 7, copy[0] is 99\nafter copy = mine: copy[0] is 7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "deleted_copy.cpp": {
   "src": "#include <iostream>\n#include <memory>\n#include <string>\n\nclass Diary {\npublic:\n    explicit Diary(const std::string& owner) : owner_{std::make_unique<std::string>(owner)} {}\n    const std::string& owner() const { return *owner_; }\nprivate:\n    std::unique_ptr<std::string> owner_;\n};\n\nint main() {\n    Diary mine{\"Wren\"};\n    Diary copy{mine};\n    std::cout << copy.owner() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "deleted_copy.cpp: In function ‘int main()’:\ndeleted_copy.cpp:15:20: error: use of deleted function ‘Diary::Diary(const Diary&)’\n   15 |     Diary copy{mine};\n      |                    ^\ndeleted_copy.cpp:5:7: note: ‘Diary::Diary(const Diary&)’ is implicitly deleted because the default definition would be ill-formed:\n    5 | class Diary {\n      |       ^~~~~\ndeleted_copy.cpp:5:7: error: use of deleted function ‘std::unique_ptr<_Tp, _Dp>::unique_ptr(const std::unique_ptr<_Tp, _Dp>&) [with _Tp = std::__cxx11::basic_string<char>; _Dp = std::default_delete<std::__cxx11::basic_string<char> >]’\nIn file included from /usr/include/c++/13/memory:78,\n                 from deleted_copy.cpp:2:\n/usr/include/c++/13/bits/unique_ptr.h:522:7: note: declared here\n  522 |       unique_ptr(const unique_ptr&) = delete;\n      |       ^~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g deleted_copy.cpp -o deleted_copy",
     "out": "",
     "err": "deleted_copy.cpp: In function ‘int main()’:\ndeleted_copy.cpp:15:20: error: use of deleted function ‘Diary::Diary(const Diary&)’\n   15 |     Diary copy{mine};\n      |                    ^\ndeleted_copy.cpp:5:7: note: ‘Diary::Diary(const Diary&)’ is implicitly deleted because the default definition would be ill-formed:\n    5 | class Diary {\n      |       ^~~~~\ndeleted_copy.cpp:5:7: error: use of deleted function ‘std::unique_ptr<_Tp, _Dp>::unique_ptr(const std::unique_ptr<_Tp, _Dp>&) [with _Tp = std::__cxx11::basic_string<char>; _Dp = std::default_delete<std::__cxx11::basic_string<char> >]’\nIn file included from /usr/include/c++/13/memory:78,\n                 from deleted_copy.cpp:2:\n/usr/include/c++/13/bits/unique_ptr.h:522:7: note: declared here\n  522 |       unique_ptr(const unique_ptr&) = delete;\n      |       ^~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "deleted_copy.cpp:15:11: error: call to implicitly-deleted copy constructor of 'Diary'\n   15 |     Diary copy{mine};\n      |           ^   ~~~~~~\ndeleted_copy.cpp:10:34: note: copy constructor of 'Diary' is implicitly deleted because field 'owner_' has a deleted copy constructor\n   10 |     std::unique_ptr<std::string> owner_;\n      |                                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/unique_ptr.h:522:7: note: 'unique_ptr' has been explicitly marked deleted here\n  522 |       unique_ptr(const unique_ptr&) = delete;\n      |       ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g deleted_copy.cpp -o deleted_copy",
      "out": "",
      "err": "deleted_copy.cpp:15:11: error: call to implicitly-deleted copy constructor of 'Diary'\n   15 |     Diary copy{mine};\n      |           ^   ~~~~~~\ndeleted_copy.cpp:10:34: note: copy constructor of 'Diary' is implicitly deleted because field 'owner_' has a deleted copy constructor\n   10 |     std::unique_ptr<std::string> owner_;\n      |                                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/unique_ptr.h:522:7: note: 'unique_ptr' has been explicitly marked deleted here\n  522 |       unique_ptr(const unique_ptr&) = delete;\n      |       ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "elision.cpp": {
   "src": "#include <iostream>\n\nstruct Gadget {\n    Gadget() { std::cout << \"  default\\n\"; }\n    Gadget(const Gadget&) { std::cout << \"  copy\\n\"; }\n    Gadget(Gadget&&) noexcept { std::cout << \"  move\\n\"; }\n    ~Gadget() { std::cout << \"  destroy\\n\"; }\n};\n\nGadget build() {\n    Gadget g;\n    return g;\n}\n\nint main() {\n    std::cout << \"calling build()\\n\";\n    Gadget x = build();\n    std::cout << \"back in main\\n\";\n}\n",
   "stdout": "calling build()\n  default\nback in main\n  destroy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g elision.cpp -o elision",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./elision",
     "out": "calling build()\n  default\nback in main\n  destroy\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "calling build()\n  default\nback in main\n  destroy\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g elision.cpp -o elision",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./elision",
      "out": "calling build()\n  default\nback in main\n  destroy\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "elision_noelide.cpp": {
   "src": "#include <iostream>\n\nstruct Gadget {\n    Gadget() { std::cout << \"  default\\n\"; }\n    Gadget(const Gadget&) { std::cout << \"  copy\\n\"; }\n    Gadget(Gadget&&) noexcept { std::cout << \"  move\\n\"; }\n    ~Gadget() { std::cout << \"  destroy\\n\"; }\n};\n\nGadget build() {\n    Gadget g;\n    return g;\n}\n\nint main() {\n    std::cout << \"calling build()\\n\";\n    Gadget x = build();\n    std::cout << \"back in main\\n\";\n}\n",
   "stdout": "calling build()\n  default\n  move\n  destroy\nback in main\n  destroy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fno-elide-constructors elision_noelide.cpp -o elision_noelide",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./elision_noelide",
     "out": "calling build()\n  default\n  move\n  destroy\nback in main\n  destroy\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "calling build()\n  default\n  move\n  destroy\nback in main\n  destroy\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fno-elide-constructors elision_noelide.cpp -o elision_noelide",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./elision_noelide",
      "out": "calling build()\n  default\n  move\n  destroy\nback in main\n  destroy\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "explicit_bad.cpp": {
   "src": "#include <iostream>\n\nclass Playlist {\npublic:\n    explicit Playlist(int capacity) : capacity_{capacity} {}\n    int capacity() const { return capacity_; }\nprivate:\n    int capacity_;\n};\n\nvoid show(const Playlist& p) {\n    std::cout << \"playlist with room for \" << p.capacity() << \" songs\\n\";\n}\n\nint main() {\n    int songs_played{42};\n    show(songs_played);\n}\n",
   "stdout": "",
   "stderr": "explicit_bad.cpp: In function ‘int main()’:\nexplicit_bad.cpp:17:10: error: invalid initialization of reference of type ‘const Playlist&’ from expression of type ‘int’\n   17 |     show(songs_played);\n      |          ^~~~~~~~~~~~\nexplicit_bad.cpp:11:27: note: in passing argument 1 of ‘void show(const Playlist&)’\n   11 | void show(const Playlist& p) {\n      |           ~~~~~~~~~~~~~~~~^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g explicit_bad.cpp -o explicit_bad",
     "out": "",
     "err": "explicit_bad.cpp: In function ‘int main()’:\nexplicit_bad.cpp:17:10: error: invalid initialization of reference of type ‘const Playlist&’ from expression of type ‘int’\n   17 |     show(songs_played);\n      |          ^~~~~~~~~~~~\nexplicit_bad.cpp:11:27: note: in passing argument 1 of ‘void show(const Playlist&)’\n   11 | void show(const Playlist& p) {\n      |           ~~~~~~~~~~~~~~~~^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "explicit_bad.cpp:17:5: error: no matching function for call to 'show'\n   17 |     show(songs_played);\n      |     ^~~~\nexplicit_bad.cpp:11:6: note: candidate function not viable: no known conversion from 'int' to 'const Playlist' for 1st argument\n   11 | void show(const Playlist& p) {\n      |      ^    ~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g explicit_bad.cpp -o explicit_bad",
      "out": "",
      "err": "explicit_bad.cpp:17:5: error: no matching function for call to 'show'\n   17 |     show(songs_played);\n      |     ^~~~\nexplicit_bad.cpp:11:6: note: candidate function not viable: no known conversion from 'int' to 'const Playlist' for 1st argument\n   11 | void show(const Playlist& p) {\n      |      ^    ~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_call.cpp": {
   "src": "#include <iostream>\n\nstruct Counter {\n    int calls{0};\n    int operator()(int x) {\n        ++calls;\n        return x * x;\n    }\n};\n\nint main() {\n    Counter square;\n    std::cout << square(3) << ' ' << square(4) << '\\n';\n    std::cout << \"called \" << square.calls << \" times\\n\";\n}\n",
   "stdout": "9 16\ncalled 2 times\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_call.cpp -o fill_call",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_call",
     "out": "9 16\ncalled 2 times\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "9 16\ncalled 2 times\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_call.cpp -o fill_call",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_call",
      "out": "9 16\ncalled 2 times\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_delete.cpp": {
   "src": "#include <iostream>\n\nclass Locker {\npublic:\n    explicit Locker(int number) : number_{number} {}\n    Locker(const Locker&) = delete;\n    Locker& operator=(const Locker&) = delete;\n    int number() const { return number_; }\nprivate:\n    int number_;\n};\n\nvoid open(const Locker& l) {\n    std::cout << \"opening locker \" << l.number() << '\\n';\n}\n\nint main() {\n    Locker mine{17};\n    open(mine);\n}\n",
   "stdout": "opening locker 17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_delete.cpp -o fill_delete",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_delete",
     "out": "opening locker 17\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "opening locker 17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_delete.cpp -o fill_delete",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_delete",
      "out": "opening locker 17\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_print.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nstruct Pet {\n    std::string name;\n    int age{0};\n};\n\nstd::ostream& operator<<(std::ostream& out, const Pet& p) {\n    out << p.name << \" (\" << p.age << \")\";\n    return out;\n}\n\nint main() {\n    Pet a{\"Rex\", 3};\n    Pet b{\"Moss\", 11};\n    std::cout << a << \", \" << b << '\\n';\n}\n",
   "stdout": "Rex (3), Moss (11)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_print.cpp -o fill_print",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_print",
     "out": "Rex (3), Moss (11)\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Rex (3), Moss (11)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_print.cpp -o fill_print",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_print",
      "out": "Rex (3), Moss (11)\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "frac_zero.cpp": {
   "src": "#include <iostream>\n#include <numeric>\n#include <stdexcept>\n\nclass Fraction {\npublic:\n    Fraction(int num, int den = 1) : num_{num}, den_{den} {\n        if (den_ == 0) throw std::invalid_argument{\"denominator is zero\"};\n        if (den_ < 0) { num_ = -num_; den_ = -den_; }\n        int g{std::gcd(num_, den_)};\n        num_ /= g;\n        den_ /= g;\n    }\n    int num() const { return num_; }\n    int den() const { return den_; }\nprivate:\n    int num_;\n    int den_;\n};\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.den() + b.num() * a.den(), a.den() * b.den()};\n}\n\nFraction operator*(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.num(), a.den() * b.den()};\n}\n\nstd::ostream& operator<<(std::ostream& out, const Fraction& f) {\n    return out << f.num() << '/' << f.den();\n}\n\nint main() {\n    Fraction ok{3, 4};\n    std::cout << \"made \" << ok << '\\n';\n    Fraction broken{1, 0};\n    std::cout << \"made \" << broken << '\\n';\n}\n",
   "stdout": "",
   "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  denominator is zero\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g frac_zero.cpp -o frac_zero",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./frac_zero",
     "out": "",
     "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  denominator is zero\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  denominator is zero\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g frac_zero.cpp -o frac_zero",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./frac_zero",
      "out": "",
      "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  denominator is zero\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "fraction.cpp": {
   "src": "#include <iostream>\n#include <numeric>\n#include <stdexcept>\n\nclass Fraction {\npublic:\n    Fraction(int num, int den = 1) : num_{num}, den_{den} {\n        if (den_ == 0) throw std::invalid_argument{\"denominator is zero\"};\n        if (den_ < 0) { num_ = -num_; den_ = -den_; }\n        int g{std::gcd(num_, den_)};\n        num_ /= g;\n        den_ /= g;\n    }\n    int num() const { return num_; }\n    int den() const { return den_; }\nprivate:\n    int num_;\n    int den_;\n};\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.den() + b.num() * a.den(), a.den() * b.den()};\n}\n\nFraction operator*(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.num(), a.den() * b.den()};\n}\n\nstd::ostream& operator<<(std::ostream& out, const Fraction& f) {\n    return out << f.num() << '/' << f.den();\n}\n\nint main() {\n    Fraction half{1, 2};\n    Fraction third{1, 3};\n    std::cout << half + third << '\\n';\n    std::cout << half * third << '\\n';\n    std::cout << half + 1 << '\\n';\n    std::cout << 1 + half << '\\n';\n}\n",
   "stdout": "5/6\n1/6\n3/2\n3/2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fraction.cpp -o fraction",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fraction",
     "out": "5/6\n1/6\n3/2\n3/2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5/6\n1/6\n3/2\n3/2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fraction.cpp -o fraction",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fraction",
      "out": "5/6\n1/6\n3/2\n3/2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fraction_default.cpp": {
   "src": "#include <compare>\n#include <iostream>\n\nstruct Fraction {\n    int num;\n    int den;\n    auto operator<=>(const Fraction&) const = default;\n};\n\nint main() {\n    Fraction third{1, 3};\n    Fraction half{1, 2};\n    std::cout << std::boolalpha;\n    std::cout << \"1/3 < 1/2 is \" << (third < half) << '\\n';\n    std::cout << \"1/3 > 1/2 is \" << (third > half) << '\\n';\n}\n",
   "stdout": "1/3 < 1/2 is false\n1/3 > 1/2 is true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fraction_default.cpp -o fraction_default",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fraction_default",
     "out": "1/3 < 1/2 is false\n1/3 > 1/2 is true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1/3 < 1/2 is false\n1/3 > 1/2 is true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fraction_default.cpp -o fraction_default",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fraction_default",
      "out": "1/3 < 1/2 is false\n1/3 > 1/2 is true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fraction_machine.cpp": {
   "src": "#include <iostream>\n#include <numeric>\n#include <stdexcept>\n\nclass Fraction {\npublic:\n    Fraction(int num, int den = 1) : num_{num}, den_{den} {\n        if (den_ == 0) throw std::invalid_argument{\"denominator is zero\"};\n        if (den_ < 0) { num_ = -num_; den_ = -den_; }\n        int g{std::gcd(num_, den_)};\n        num_ /= g;\n        den_ /= g;\n    }\n    int num() const { return num_; }\n    int den() const { return den_; }\nprivate:\n    int num_;\n    int den_;\n};\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.den() + b.num() * a.den(), a.den() * b.den()};\n}\n\nFraction operator*(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.num(), a.den() * b.den()};\n}\n\nstd::ostream& operator<<(std::ostream& out, const Fraction& f) {\n    return out << f.num() << '/' << f.den();\n}\n\nFraction operator-(const Fraction& a, const Fraction& b) {\n    return a + Fraction{-b.num(), b.den()};\n}\n\nbool operator==(const Fraction& a, const Fraction& b) {\n    return a.num() == b.num() && a.den() == b.den();\n}\n\nbool operator<(const Fraction& a, const Fraction& b) {\n    return a.num() * b.den() < b.num() * a.den();\n}\n\nint main() {\n    Fraction a{1, 2}, b{1, 3}, c{2, 3}, d{3, 4}, e{1, 4}, f{2, 4};\n    std::cout << a << \" + \" << b << \" = \" << a + b << '\\n';\n    std::cout << a << \" * \" << c << \" = \" << a * c << '\\n';\n    std::cout << d << \" - \" << e << \" = \" << d - e << '\\n';\n    std::cout << std::boolalpha;\n    std::cout << f << \" == \" << a << \" is \" << (f == a) << '\\n';\n    std::cout << a << \" < \" << c << \" is \" << (a < c) << '\\n';\n    std::cout << a << \" + 1 = \" << a + 1 << '\\n';\n    std::cout << \"1 + \" << a << \" = \" << 1 + a << '\\n';\n    std::cout << \"6/-8 is stored as \" << Fraction{6, -8} << '\\n';\n}\n",
   "stdout": "1/2 + 1/3 = 5/6\n1/2 * 2/3 = 1/3\n3/4 - 1/4 = 1/2\n1/2 == 1/2 is true\n1/2 < 2/3 is true\n1/2 + 1 = 3/2\n1 + 1/2 = 3/2\n6/-8 is stored as -3/4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fraction_machine.cpp -o fraction_machine",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fraction_machine",
     "out": "1/2 + 1/3 = 5/6\n1/2 * 2/3 = 1/3\n3/4 - 1/4 = 1/2\n1/2 == 1/2 is true\n1/2 < 2/3 is true\n1/2 + 1 = 3/2\n1 + 1/2 = 3/2\n6/-8 is stored as -3/4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1/2 + 1/3 = 5/6\n1/2 * 2/3 = 1/3\n3/4 - 1/4 = 1/2\n1/2 == 1/2 is true\n1/2 < 2/3 is true\n1/2 + 1 = 3/2\n1 + 1/2 = 3/2\n6/-8 is stored as -3/4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fraction_machine.cpp -o fraction_machine",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fraction_machine",
      "out": "1/2 + 1/3 = 5/6\n1/2 * 2/3 = 1/3\n3/4 - 1/4 = 1/2\n1/2 == 1/2 is true\n1/2 < 2/3 is true\n1/2 + 1 = 3/2\n1 + 1/2 = 3/2\n6/-8 is stored as -3/4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "friend.cpp": {
   "src": "#include <iostream>\n\nclass Wallet {\npublic:\n    explicit Wallet(int cents) : cents_{cents} {}\n    friend std::ostream& operator<<(std::ostream& out, const Wallet& w);\nprivate:\n    int cents_;\n};\n\nstd::ostream& operator<<(std::ostream& out, const Wallet& w) {\n    return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n}\n\nint main() {\n    std::cout << Wallet{1205} << '\\n';\n}\n",
   "stdout": "12.05\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g friend.cpp -o friend",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./friend",
     "out": "12.05\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12.05\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g friend.cpp -o friend",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./friend",
      "out": "12.05\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "friend_bad.cpp": {
   "src": "#include <iostream>\n\nclass Wallet {\npublic:\n    explicit Wallet(int cents) : cents_{cents} {}\nprivate:\n    int cents_;\n};\n\nstd::ostream& operator<<(std::ostream& out, const Wallet& w) {\n    return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n}\n\nint main() {\n    std::cout << Wallet{1205} << '\\n';\n}\n",
   "stdout": "",
   "stderr": "friend_bad.cpp: In function ‘std::ostream& operator<<(std::ostream&, const Wallet&)’:\nfriend_bad.cpp:11:21: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                     ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\nfriend_bad.cpp:11:46: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                              ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\nfriend_bad.cpp:11:69: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                                                     ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g friend_bad.cpp -o friend_bad",
     "out": "",
     "err": "friend_bad.cpp: In function ‘std::ostream& operator<<(std::ostream&, const Wallet&)’:\nfriend_bad.cpp:11:21: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                     ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\nfriend_bad.cpp:11:46: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                              ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\nfriend_bad.cpp:11:69: error: ‘int Wallet::cents_’ is private within this context\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                                                     ^~~~~~\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "friend_bad.cpp:11:21: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                     ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\nfriend_bad.cpp:11:46: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                              ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\nfriend_bad.cpp:11:69: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                                                     ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\n3 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g friend_bad.cpp -o friend_bad",
      "out": "",
      "err": "friend_bad.cpp:11:21: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                     ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\nfriend_bad.cpp:11:46: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                              ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\nfriend_bad.cpp:11:69: error: 'cents_' is a private member of 'Wallet'\n   11 |     return out << w.cents_ / 100 << '.' << w.cents_ % 100 / 10 << w.cents_ % 10;\n      |                                                                     ^\nfriend_bad.cpp:7:9: note: declared private here\n    7 |     int cents_;\n      |         ^\n3 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "generated.cpp": {
   "src": "#include <iostream>\n#include <memory>\n#include <string>\n#include <type_traits>\n\nstruct Plain { std::string name; int age{0}; };\nstruct Named { explicit Named(std::string n) : name{n} {} std::string name; };\nstruct Owner { std::unique_ptr<int> p; };\nstruct Locked { Locked() = default; Locked(const Locked&) = delete; };\nstruct Asked { Asked() = default; Asked(const Asked&) = default; };\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << \"Plain:  default \" << std::is_default_constructible_v<Plain>\n              << \", copy \" << std::is_copy_constructible_v<Plain> << '\\n';\n    std::cout << \"Named:  default \" << std::is_default_constructible_v<Named>\n              << \", copy \" << std::is_copy_constructible_v<Named> << '\\n';\n    std::cout << \"Owner:  default \" << std::is_default_constructible_v<Owner>\n              << \", copy \" << std::is_copy_constructible_v<Owner> << '\\n';\n    std::cout << \"Locked: default \" << std::is_default_constructible_v<Locked>\n              << \", copy \" << std::is_copy_constructible_v<Locked> << '\\n';\n    std::cout << \"Asked:  default \" << std::is_default_constructible_v<Asked>\n              << \", copy \" << std::is_copy_constructible_v<Asked> << '\\n';\n}\n",
   "stdout": "Plain:  default true, copy true\nNamed:  default false, copy true\nOwner:  default true, copy false\nLocked: default true, copy false\nAsked:  default true, copy true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g generated.cpp -o generated",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./generated",
     "out": "Plain:  default true, copy true\nNamed:  default false, copy true\nOwner:  default true, copy false\nLocked: default true, copy false\nAsked:  default true, copy true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Plain:  default true, copy true\nNamed:  default false, copy true\nOwner:  default true, copy false\nLocked: default true, copy false\nAsked:  default true, copy true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g generated.cpp -o generated",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./generated",
      "out": "Plain:  default true, copy true\nNamed:  default false, copy true\nOwner:  default true, copy false\nLocked: default true, copy false\nAsked:  default true, copy true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "implicit_bad.cpp": {
   "src": "#include <iostream>\n\nclass Playlist {\npublic:\n    Playlist(int capacity) : capacity_{capacity} {}\n    int capacity() const { return capacity_; }\nprivate:\n    int capacity_;\n};\n\nvoid show(const Playlist& p) {\n    std::cout << \"playlist with room for \" << p.capacity() << \" songs\\n\";\n}\n\nint main() {\n    int songs_played{42};\n    show(songs_played);\n}\n",
   "stdout": "playlist with room for 42 songs\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g implicit_bad.cpp -o implicit_bad",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./implicit_bad",
     "out": "playlist with room for 42 songs\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "playlist with room for 42 songs\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g implicit_bad.cpp -o implicit_bad",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./implicit_bad",
      "out": "playlist with room for 42 songs\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "int_plus_bad.cpp": {
   "src": "#include <iostream>\n\nint operator+(int a, int b) {\n    return a - b;\n}\n\nint main() {\n    std::cout << 2 + 2 << '\\n';\n}\n",
   "stdout": "",
   "stderr": "int_plus_bad.cpp:3:5: error: ‘int operator+(int, int)’ must have an argument of class or enumerated type\n    3 | int operator+(int a, int b) {\n      |     ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g int_plus_bad.cpp -o int_plus_bad",
     "out": "",
     "err": "int_plus_bad.cpp:3:5: error: ‘int operator+(int, int)’ must have an argument of class or enumerated type\n    3 | int operator+(int a, int b) {\n      |     ^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "int_plus_bad.cpp:3:5: error: overloaded 'operator+' must have at least one parameter of class or enumeration type\n    3 | int operator+(int a, int b) {\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g int_plus_bad.cpp -o int_plus_bad",
      "out": "",
      "err": "int_plus_bad.cpp:3:5: error: overloaded 'operator+' must have at least one parameter of class or enumeration type\n    3 | int operator+(int a, int b) {\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "member_plus.cpp": {
   "src": "#include <iostream>\n\nclass Coins {\npublic:\n    Coins(int n) : n_{n} {}\n    Coins operator+(const Coins& other) const { return Coins{n_ + other.n_}; }\n    int count() const { return n_; }\nprivate:\n    int n_;\n};\n\nint main() {\n    Coins purse{5};\n    std::cout << (purse + 2).count() << '\\n';\n    std::cout << (2 + purse).count() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "member_plus.cpp: In function ‘int main()’:\nmember_plus.cpp:15:21: error: no match for ‘operator+’ (operand types are ‘int’ and ‘Coins’)\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n      |                   |   |\n      |                   int Coins\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g member_plus.cpp -o member_plus",
     "out": "",
     "err": "member_plus.cpp: In function ‘int main()’:\nmember_plus.cpp:15:21: error: no match for ‘operator+’ (operand types are ‘int’ and ‘Coins’)\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n      |                   |   |\n      |                   int Coins\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "member_plus.cpp:15:21: error: invalid operands to binary expression ('int' and 'Coins')\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g member_plus.cpp -o member_plus",
      "out": "",
      "err": "member_plus.cpp:15:21: error: invalid operands to binary expression ('int' and 'Coins')\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "no_print.cpp": {
   "src": "#include <iostream>\n\nstruct Point {\n    int x{0};\n    int y{0};\n};\n\nint main() {\n    Point p{3, 4};\n    std::cout << p << '\\n';\n}\n",
   "stdout": "",
   "stderr": "no_print.cpp: In function ‘int main()’:\nno_print.cpp:10:15: error: no match for ‘operator<<’ (operand types are ‘std::ostream’ {aka ‘std::basic_ostream<char>’} and ‘Point’)\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~~~~~ ^~ ~\n      |          |       |\n      |          |       Point\n      |          std::ostream {aka std::basic_ostream<char>}\nIn file included from /usr/include/c++/13/iostream:41,\n                 from no_print.cpp:1:\n/usr/include/c++/13/ostream:110:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__ostream_type& (*)(__ostream_type&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:110:36: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__ostream_type& (*)(std::basic_ostream<char>::__ostream_type&)’ {aka ‘std::basic_ostream<char>& (*)(std::basic_ostream<char>&)’}\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |                  ~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:119:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__ios_type& (*)(__ios_type&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; __ios_type = std::basic_ios<char>]’\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:119:32: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__ios_type& (*)(std::basic_ostream<char>::__ios_type&)’ {aka ‘std::basic_ios<char>& (*)(std::basic_ios<char>&)’}\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |                  ~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:129:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(std::ios_base& (*)(std::ios_base&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:129:30: note:   no known conversion for argument 1 from ‘Point’ to ‘std::ios_base& (*)(std::ios_base&)’\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |                  ~~~~~~~~~~~~^~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:168:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  168 |       operator<<(long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:168:23: note:   no known conversion for argument 1 from ‘Point’ to ‘long int’\n  168 |       operator<<(long __n)\n      |                  ~~~~~^~~\n/usr/include/c++/13/ostream:172:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  172 |       operator<<(unsigned long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:172:32: note:   no known conversion for argument 1 from ‘Point’ to ‘long unsigned int’\n  172 |       operator<<(unsigned long __n)\n      |                  ~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:176:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(bool) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  176 |       operator<<(bool __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:176:23: note:   no known conversion for argument 1 from ‘Point’ to ‘bool’\n  176 |       operator<<(bool __n)\n      |                  ~~~~~^~~\nIn file included from /usr/include/c++/13/ostream:880:\n/usr/include/c++/13/bits/ostream.tcc:96:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(short int) [with _CharT = char; _Traits = std::char_traits<char>]’\n   96 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:97:22: note:   no known conversion for argument 1 from ‘Point’ to ‘short int’\n   97 |     operator<<(short __n)\n      |                ~~~~~~^~~\n/usr/include/c++/13/ostream:183:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(short unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  183 |       operator<<(unsigned short __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:183:33: note:   no known conversion for argument 1 from ‘Point’ to ‘short unsigned int’\n  183 |       operator<<(unsigned short __n)\n      |                  ~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/bits/ostream.tcc:110:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(int) [with _CharT = char; _Traits = std::char_traits<char>]’\n  110 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:111:20: note:   no known conversion for argument 1 from ‘Point’ to ‘int’\n  111 |     operator<<(int __n)\n      |                ~~~~^~~\n/usr/include/c++/13/ostream:194:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  194 |       operator<<(unsigned int __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:194:31: note:   no known conversion for argument 1 from ‘Point’ to ‘unsigned int’\n  194 |       operator<<(unsigned int __n)\n      |                  ~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:203:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long long int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  203 |       operator<<(long long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:203:28: note:   no known conversion for argument 1 from ‘Point’ to ‘long long int’\n  203 |       operator<<(long long __n)\n      |                  ~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:207:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long long unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  207 |       operator<<(unsigned long long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:207:37: note:   no known conversion for argument 1 from ‘Point’ to ‘long long unsigned int’\n  207 |       operator<<(unsigned long long __n)\n      |                  ~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:222:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(double) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  222 |       operator<<(double __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:222:25: note:   no known conversion for argument 1 from ‘Point’ to ‘double’\n  222 |       operator<<(double __f)\n      |                  ~~~~~~~^~~\n/usr/include/c++/13/ostream:226:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(float) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  226 |       operator<<(float __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:226:24: note:   no known conversion for argument 1 from ‘Point’ to ‘float’\n  226 |       operator<<(float __f)\n      |                  ~~~~~~^~~\n/usr/include/c++/13/ostream:234:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long double) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  234 |       operator<<(long double __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:234:30: note:   no known conversion for argument 1 from ‘Point’ to ‘long double’\n  234 |       operator<<(long double __f)\n      |                  ~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:241:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float16) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  241 |       operator<<(_Float16 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:241:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float16’\n  241 |       operator<<(_Float16 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:250:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float32) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  250 |       operator<<(_Float32 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:250:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float32’\n  250 |       operator<<(_Float32 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:259:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float64) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  259 |       operator<<(_Float64 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:259:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float64’\n  259 |       operator<<(_Float64 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:277:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__gnu_cxx::__bfloat16_t) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; __gnu_cxx::__bfloat16_t = __bf16]’\n  277 |       operator<<(__gnu_cxx::__bfloat16_t __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:277:42: note:   no known conversion for argument 1 from ‘Point’ to ‘__gnu_cxx::__bfloat16_t’ {aka ‘__bf16’}\n  277 |       operator<<(__gnu_cxx::__bfloat16_t __f)\n      |                  ~~~~~~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:292:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(const void*) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  292 |       operator<<(const void* __p)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:292:30: note:   no known conversion for argument 1 from ‘Point’ to ‘const void*’\n  292 |       operator<<(const void* __p)\n      |                  ~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:297:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(std::nullptr_t) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; std::nullptr_t = std::nullptr_t]’\n  297 |       operator<<(nullptr_t)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:297:18: note:   no known conversion for argument 1 from ‘Point’ to ‘std::nullptr_t’\n  297 |       operator<<(nullptr_t)\n      |                  ^~~~~~~~~\n/usr/include/c++/13/ostream:304:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(const volatile void*) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  304 |       operator<<(const volatile void* __p)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:304:39: note:   no known conversion for argument 1 from ‘Point’ to ‘const volatile void*’\n  304 |       operator<<(const volatile void* __p)\n      |                  ~~~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/bits/ostream.tcc:124:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(__streambuf_type*) [with _CharT = char; _Traits = std::char_traits<char>; __streambuf_type = std::basic_streambuf<char>]’\n  124 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:125:34: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__streambuf_type*’ {aka ‘std::basic_streambuf<char>*’}\n  125 |     operator<<(__streambuf_type* __sbin)\n      |                ~~~~~~~~~~~~~~~~~~^~~~~~\nIn file included from /usr/include/c++/13/bits/basic_string.h:47,\n                 from /usr/include/c++/13/string:54,\n                 from /usr/include/c++/13/bits/locale_classes.h:40,\n                 from /usr/include/c++/13/bits/ios_base.h:41,\n                 from /usr/include/c++/13/ios:44,\n                 from /usr/include/c++/13/ostream:40:\n/usr/include/c++/13/string_view:761:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, basic_string_view<_CharT, _Traits>)’\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^~~~~~~~\n/usr/include/c++/13/string_view:761:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   ‘Point’ is not derived from ‘std::basic_string_view<_CharT, _Traits>’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/bits/basic_string.h:4032:5: note: candidate: ‘template<class _CharT, class _Traits, class _Alloc> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const __cxx11::basic_string<_CharT, _Traits, _Allocator>&)’\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/basic_string.h:4032:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   ‘Point’ is not derived from ‘const std::__cxx11::basic_string<_CharT, _Traits, _Allocator>’\n   10 |     std::cout << p << '\\n';\n      |                  ^\nIn file included from /usr/include/c++/13/bits/memory_resource.h:38,\n                 from /usr/include/c++/13/string:58:\n/usr/include/c++/13/cstddef:124:5: note: candidate: ‘template<class _IntegerType> constexpr std::__byte_op_t<_IntegerType> std::operator<<(byte, _IntegerType)’\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^~~~~~~~\n/usr/include/c++/13/cstddef:124:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:10: note:   cannot convert ‘std::cout’ (type ‘std::ostream’ {aka ‘std::basic_ostream<char>’}) to type ‘std::byte’\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~^~~~\nIn file included from /usr/include/c++/13/bits/ios_base.h:46:\n/usr/include/c++/13/system_error:339:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const error_code&)’\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^~~~~~~~\n/usr/include/c++/13/system_error:339:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const std::error_code&’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:554:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, _CharT)’\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:554:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   deduced conflicting types for parameter ‘_CharT’ (‘char’ and ‘Point’)\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:564:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, char)’\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:564:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:570:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char)’\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:570:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:581:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, signed char)’\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:581:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘signed char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:586:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, unsigned char)’\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:586:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘unsigned char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:595:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, wchar_t)’ (deleted)\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:595:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘wchar_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:600:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char8_t)’ (deleted)\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:600:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char8_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:605:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char16_t)’ (deleted)\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:605:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char16_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:609:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char32_t)’ (deleted)\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:609:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char32_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:615:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char8_t)’ (deleted)\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:615:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:620:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char16_t)’ (deleted)\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:620:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:624:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char32_t)’ (deleted)\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:624:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:645:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const _CharT*)’\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:645:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘const _CharT*’ and ‘Point’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/bits/ostream.tcc:307:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const char*)’\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:307:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:662:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char*)’\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:662:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:675:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const signed char*)’\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:675:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const signed char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:680:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const unsigned char*)’\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:680:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const unsigned char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:689:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const wchar_t*)’ (deleted)\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:689:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const wchar_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:694:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char8_t*)’ (deleted)\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:694:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char8_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:699:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char16_t*)’ (deleted)\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:699:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char16_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:703:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char32_t*)’ (deleted)\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:703:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char32_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:709:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*)’ (deleted)\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:709:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:714:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*)’ (deleted)\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:714:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:718:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*)’ (deleted)\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:718:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:801:5: note: candidate: ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&)’\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:801:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/ostream: In substitution of ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&) [with _Ostream = std::basic_ostream<char>&; _Tp = Point]’:\nno_print.cpp:10:18:   required from here\n/usr/include/c++/13/ostream:801:5: error: template constraint failure for ‘template<class _Os, class _Tp>  requires (__derived_from_ios_base<_Os>) && requires(_Os& __os, const _Tp& __t) {__os << __t;} using std::__rvalue_stream_insertion_t = _Os&&’\n/usr/include/c++/13/ostream:801:5: note: constraints not satisfied\n/usr/include/c++/13/ostream: In substitution of ‘template<class _Os, class _Tp>  requires (__derived_from_ios_base<_Os>) && requires(_Os& __os, const _Tp& __t) {__os << __t;} using std::__rvalue_stream_insertion_t = _Os&& [with _Os = std::basic_ostream<char>&; _Tp = Point]’:\n/usr/include/c++/13/ostream:801:5:   required by substitution of ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&) [with _Ostream = std::basic_ostream<char>&; _Tp = Point]’\nno_print.cpp:10:18:   required from here\n/usr/include/c++/13/ostream:768:13:   required for the satisfaction of ‘__derived_from_ios_base<_Os>’ [with _Os = std::basic_ostream<char, std::char_traits<char> >&]\n/usr/include/c++/13/ostream:768:39: note: the expression ‘is_class_v<_Tp> [with _Tp = std::basic_ostream<char, std::char_traits<char> >&]’ evaluated to ‘false’\n  768 |     concept __derived_from_ios_base = is_class_v<_Tp>\n      |                                       ^~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g no_print.cpp -o no_print",
     "out": "",
     "err": "no_print.cpp: In function ‘int main()’:\nno_print.cpp:10:15: error: no match for ‘operator<<’ (operand types are ‘std::ostream’ {aka ‘std::basic_ostream<char>’} and ‘Point’)\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~~~~~ ^~ ~\n      |          |       |\n      |          |       Point\n      |          std::ostream {aka std::basic_ostream<char>}\nIn file included from /usr/include/c++/13/iostream:41,\n                 from no_print.cpp:1:\n/usr/include/c++/13/ostream:110:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__ostream_type& (*)(__ostream_type&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:110:36: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__ostream_type& (*)(std::basic_ostream<char>::__ostream_type&)’ {aka ‘std::basic_ostream<char>& (*)(std::basic_ostream<char>&)’}\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |                  ~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:119:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__ios_type& (*)(__ios_type&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; __ios_type = std::basic_ios<char>]’\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:119:32: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__ios_type& (*)(std::basic_ostream<char>::__ios_type&)’ {aka ‘std::basic_ios<char>& (*)(std::basic_ios<char>&)’}\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |                  ~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:129:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(std::ios_base& (*)(std::ios_base&)) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:129:30: note:   no known conversion for argument 1 from ‘Point’ to ‘std::ios_base& (*)(std::ios_base&)’\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |                  ~~~~~~~~~~~~^~~~~~~~~~~~~~~~~\n/usr/include/c++/13/ostream:168:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  168 |       operator<<(long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:168:23: note:   no known conversion for argument 1 from ‘Point’ to ‘long int’\n  168 |       operator<<(long __n)\n      |                  ~~~~~^~~\n/usr/include/c++/13/ostream:172:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  172 |       operator<<(unsigned long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:172:32: note:   no known conversion for argument 1 from ‘Point’ to ‘long unsigned int’\n  172 |       operator<<(unsigned long __n)\n      |                  ~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:176:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(bool) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  176 |       operator<<(bool __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:176:23: note:   no known conversion for argument 1 from ‘Point’ to ‘bool’\n  176 |       operator<<(bool __n)\n      |                  ~~~~~^~~\nIn file included from /usr/include/c++/13/ostream:880:\n/usr/include/c++/13/bits/ostream.tcc:96:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(short int) [with _CharT = char; _Traits = std::char_traits<char>]’\n   96 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:97:22: note:   no known conversion for argument 1 from ‘Point’ to ‘short int’\n   97 |     operator<<(short __n)\n      |                ~~~~~~^~~\n/usr/include/c++/13/ostream:183:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(short unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  183 |       operator<<(unsigned short __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:183:33: note:   no known conversion for argument 1 from ‘Point’ to ‘short unsigned int’\n  183 |       operator<<(unsigned short __n)\n      |                  ~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/bits/ostream.tcc:110:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(int) [with _CharT = char; _Traits = std::char_traits<char>]’\n  110 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:111:20: note:   no known conversion for argument 1 from ‘Point’ to ‘int’\n  111 |     operator<<(int __n)\n      |                ~~~~^~~\n/usr/include/c++/13/ostream:194:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  194 |       operator<<(unsigned int __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:194:31: note:   no known conversion for argument 1 from ‘Point’ to ‘unsigned int’\n  194 |       operator<<(unsigned int __n)\n      |                  ~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:203:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long long int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  203 |       operator<<(long long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:203:28: note:   no known conversion for argument 1 from ‘Point’ to ‘long long int’\n  203 |       operator<<(long long __n)\n      |                  ~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:207:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long long unsigned int) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  207 |       operator<<(unsigned long long __n)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:207:37: note:   no known conversion for argument 1 from ‘Point’ to ‘long long unsigned int’\n  207 |       operator<<(unsigned long long __n)\n      |                  ~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:222:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(double) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  222 |       operator<<(double __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:222:25: note:   no known conversion for argument 1 from ‘Point’ to ‘double’\n  222 |       operator<<(double __f)\n      |                  ~~~~~~~^~~\n/usr/include/c++/13/ostream:226:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(float) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  226 |       operator<<(float __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:226:24: note:   no known conversion for argument 1 from ‘Point’ to ‘float’\n  226 |       operator<<(float __f)\n      |                  ~~~~~~^~~\n/usr/include/c++/13/ostream:234:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(long double) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  234 |       operator<<(long double __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:234:30: note:   no known conversion for argument 1 from ‘Point’ to ‘long double’\n  234 |       operator<<(long double __f)\n      |                  ~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:241:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float16) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  241 |       operator<<(_Float16 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:241:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float16’\n  241 |       operator<<(_Float16 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:250:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float32) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  250 |       operator<<(_Float32 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:250:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float32’\n  250 |       operator<<(_Float32 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:259:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(_Float64) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  259 |       operator<<(_Float64 __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:259:27: note:   no known conversion for argument 1 from ‘Point’ to ‘_Float64’\n  259 |       operator<<(_Float64 __f)\n      |                  ~~~~~~~~~^~~\n/usr/include/c++/13/ostream:277:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(__gnu_cxx::__bfloat16_t) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; __gnu_cxx::__bfloat16_t = __bf16]’\n  277 |       operator<<(__gnu_cxx::__bfloat16_t __f)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:277:42: note:   no known conversion for argument 1 from ‘Point’ to ‘__gnu_cxx::__bfloat16_t’ {aka ‘__bf16’}\n  277 |       operator<<(__gnu_cxx::__bfloat16_t __f)\n      |                  ~~~~~~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:292:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(const void*) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  292 |       operator<<(const void* __p)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:292:30: note:   no known conversion for argument 1 from ‘Point’ to ‘const void*’\n  292 |       operator<<(const void* __p)\n      |                  ~~~~~~~~~~~~^~~\n/usr/include/c++/13/ostream:297:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(std::nullptr_t) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>; std::nullptr_t = std::nullptr_t]’\n  297 |       operator<<(nullptr_t)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:297:18: note:   no known conversion for argument 1 from ‘Point’ to ‘std::nullptr_t’\n  297 |       operator<<(nullptr_t)\n      |                  ^~~~~~~~~\n/usr/include/c++/13/ostream:304:7: note: candidate: ‘std::basic_ostream<_CharT, _Traits>::__ostream_type& std::basic_ostream<_CharT, _Traits>::operator<<(const volatile void*) [with _CharT = char; _Traits = std::char_traits<char>; __ostream_type = std::basic_ostream<char>]’\n  304 |       operator<<(const volatile void* __p)\n      |       ^~~~~~~~\n/usr/include/c++/13/ostream:304:39: note:   no known conversion for argument 1 from ‘Point’ to ‘const volatile void*’\n  304 |       operator<<(const volatile void* __p)\n      |                  ~~~~~~~~~~~~~~~~~~~~~^~~\n/usr/include/c++/13/bits/ostream.tcc:124:5: note: candidate: ‘std::basic_ostream<_CharT, _Traits>& std::basic_ostream<_CharT, _Traits>::operator<<(__streambuf_type*) [with _CharT = char; _Traits = std::char_traits<char>; __streambuf_type = std::basic_streambuf<char>]’\n  124 |     basic_ostream<_CharT, _Traits>::\n      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:125:34: note:   no known conversion for argument 1 from ‘Point’ to ‘std::basic_ostream<char>::__streambuf_type*’ {aka ‘std::basic_streambuf<char>*’}\n  125 |     operator<<(__streambuf_type* __sbin)\n      |                ~~~~~~~~~~~~~~~~~~^~~~~~\nIn file included from /usr/include/c++/13/bits/basic_string.h:47,\n                 from /usr/include/c++/13/string:54,\n                 from /usr/include/c++/13/bits/locale_classes.h:40,\n                 from /usr/include/c++/13/bits/ios_base.h:41,\n                 from /usr/include/c++/13/ios:44,\n                 from /usr/include/c++/13/ostream:40:\n/usr/include/c++/13/string_view:761:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, basic_string_view<_CharT, _Traits>)’\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^~~~~~~~\n/usr/include/c++/13/string_view:761:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   ‘Point’ is not derived from ‘std::basic_string_view<_CharT, _Traits>’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/bits/basic_string.h:4032:5: note: candidate: ‘template<class _CharT, class _Traits, class _Alloc> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const __cxx11::basic_string<_CharT, _Traits, _Allocator>&)’\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/basic_string.h:4032:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   ‘Point’ is not derived from ‘const std::__cxx11::basic_string<_CharT, _Traits, _Allocator>’\n   10 |     std::cout << p << '\\n';\n      |                  ^\nIn file included from /usr/include/c++/13/bits/memory_resource.h:38,\n                 from /usr/include/c++/13/string:58:\n/usr/include/c++/13/cstddef:124:5: note: candidate: ‘template<class _IntegerType> constexpr std::__byte_op_t<_IntegerType> std::operator<<(byte, _IntegerType)’\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^~~~~~~~\n/usr/include/c++/13/cstddef:124:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:10: note:   cannot convert ‘std::cout’ (type ‘std::ostream’ {aka ‘std::basic_ostream<char>’}) to type ‘std::byte’\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~^~~~\nIn file included from /usr/include/c++/13/bits/ios_base.h:46:\n/usr/include/c++/13/system_error:339:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const error_code&)’\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^~~~~~~~\n/usr/include/c++/13/system_error:339:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const std::error_code&’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:554:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, _CharT)’\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:554:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   deduced conflicting types for parameter ‘_CharT’ (‘char’ and ‘Point’)\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:564:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, char)’\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:564:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:570:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char)’\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:570:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:581:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, signed char)’\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:581:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘signed char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:586:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, unsigned char)’\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:586:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘unsigned char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:595:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, wchar_t)’ (deleted)\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:595:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘wchar_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:600:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char8_t)’ (deleted)\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:600:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char8_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:605:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char16_t)’ (deleted)\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:605:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char16_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:609:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, char32_t)’ (deleted)\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:609:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘char32_t’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:615:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char8_t)’ (deleted)\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:615:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:620:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char16_t)’ (deleted)\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:620:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:624:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, char32_t)’ (deleted)\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:624:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:645:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const _CharT*)’\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:645:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘const _CharT*’ and ‘Point’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/bits/ostream.tcc:307:5: note: candidate: ‘template<class _CharT, class _Traits> std::basic_ostream<_CharT, _Traits>& std::operator<<(basic_ostream<_CharT, _Traits>&, const char*)’\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/ostream.tcc:307:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:662:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char*)’\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:662:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:675:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const signed char*)’\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:675:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const signed char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:680:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const unsigned char*)’\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:680:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const unsigned char*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:689:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const wchar_t*)’ (deleted)\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:689:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const wchar_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:694:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char8_t*)’ (deleted)\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:694:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char8_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:699:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char16_t*)’ (deleted)\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:699:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char16_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:703:5: note: candidate: ‘template<class _Traits> std::basic_ostream<char, _Traits>& std::operator<<(basic_ostream<char, _Traits>&, const char32_t*)’ (deleted)\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:703:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   cannot convert ‘p’ (type ‘Point’) to type ‘const char32_t*’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:709:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*)’ (deleted)\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:709:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:714:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*)’ (deleted)\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:714:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:718:5: note: candidate: ‘template<class _Traits> std::basic_ostream<wchar_t, _Traits>& std::operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*)’ (deleted)\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:718:5: note:   template argument deduction/substitution failed:\nno_print.cpp:10:18: note:   mismatched types ‘wchar_t’ and ‘char’\n   10 |     std::cout << p << '\\n';\n      |                  ^\n/usr/include/c++/13/ostream:801:5: note: candidate: ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&)’\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^~~~~~~~\n/usr/include/c++/13/ostream:801:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/ostream: In substitution of ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&) [with _Ostream = std::basic_ostream<char>&; _Tp = Point]’:\nno_print.cpp:10:18:   required from here\n/usr/include/c++/13/ostream:801:5: error: template constraint failure for ‘template<class _Os, class _Tp>  requires (__derived_from_ios_base<_Os>) && requires(_Os& __os, const _Tp& __t) {__os << __t;} using std::__rvalue_stream_insertion_t = _Os&&’\n/usr/include/c++/13/ostream:801:5: note: constraints not satisfied\n/usr/include/c++/13/ostream: In substitution of ‘template<class _Os, class _Tp>  requires (__derived_from_ios_base<_Os>) && requires(_Os& __os, const _Tp& __t) {__os << __t;} using std::__rvalue_stream_insertion_t = _Os&& [with _Os = std::basic_ostream<char>&; _Tp = Point]’:\n/usr/include/c++/13/ostream:801:5:   required by substitution of ‘template<class _Ostream, class _Tp> _Ostream&& std::operator<<(_Ostream&&, const _Tp&) [with _Ostream = std::basic_ostream<char>&; _Tp = Point]’\nno_print.cpp:10:18:   required from here\n/usr/include/c++/13/ostream:768:13:   required for the satisfaction of ‘__derived_from_ios_base<_Os>’ [with _Os = std::basic_ostream<char, std::char_traits<char> >&]\n/usr/include/c++/13/ostream:768:39: note: the expression ‘is_class_v<_Tp> [with _Tp = std::basic_ostream<char, std::char_traits<char> >&]’ evaluated to ‘false’\n  768 |     concept __derived_from_ios_base = is_class_v<_Tp>\n      |                                       ^~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "no_print.cpp:10:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and 'Point')\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~~~~~ ^  ~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: no known conversion from 'Point' to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: no known conversion from 'Point' to 'char' for 2nd argument\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^                                                 ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:570:5: note: candidate function template not viable: no known conversion from 'Point' to 'char' for 2nd argument\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^                                               ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:581:5: note: candidate function template not viable: no known conversion from 'Point' to 'signed char' for 2nd argument\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:586:5: note: candidate function template not viable: no known conversion from 'Point' to 'unsigned char' for 2nd argument\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:595:5: note: candidate function template not viable: no known conversion from 'Point' to 'wchar_t' for 2nd argument\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:600:5: note: candidate function template not viable: no known conversion from 'Point' to 'char8_t' for 2nd argument\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:605:5: note: candidate function template not viable: no known conversion from 'Point' to 'char16_t' for 2nd argument\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:609:5: note: candidate function template not viable: no known conversion from 'Point' to 'char32_t' for 2nd argument\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:662:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char *' for 2nd argument\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:675:5: note: candidate function template not viable: no known conversion from 'Point' to 'const signed char *' for 2nd argument\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:680:5: note: candidate function template not viable: no known conversion from 'Point' to 'const unsigned char *' for 2nd argument\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:689:5: note: candidate function template not viable: no known conversion from 'Point' to 'const wchar_t *' for 2nd argument\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:694:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char8_t *' for 2nd argument\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:699:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char16_t *' for 2nd argument\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:703:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char32_t *' for 2nd argument\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ostream.tcc:307:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char *' for 2nd argument\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^                                                 ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/cstddef:124:5: note: candidate function template not viable: no known conversion from 'ostream' (aka 'basic_ostream<char>') to 'byte' for 1st argument\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:554:5: note: candidate template ignored: deduced conflicting types for parameter '_CharT' ('char' vs. 'Point')\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string_view:761:5: note: candidate template ignored: could not match 'basic_string_view<_CharT, _Traits>' against 'Point'\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/basic_string.h:4032:5: note: candidate template ignored: could not match 'basic_string<_CharT, _Traits, _Alloc>' against 'Point'\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:615:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:620:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:624:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:645:5: note: candidate template ignored: could not match 'const _CharT *' against 'Point'\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:709:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:714:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:718:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:801:5: note: candidate template ignored: substitution failure [with _Ostream = ostream &, _Tp = Point]: constraints not satisfied for alias template '__rvalue_stream_insertion_t' [with _Os = std::basic_ostream<char> &, _Tp = Point]\n  800 |     inline __rvalue_stream_insertion_t<_Ostream, _Tp>\n      |            ~~~~~~~~~~~~~~~~~~~~~~~~~~~\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:110:7: note: candidate function not viable: no known conversion from 'Point' to '__ostream_type &(*)(__ostream_type &)' (aka 'basic_ostream<char, std::char_traits<char>> &(*)(basic_ostream<char, std::char_traits<char>> &)') for 1st argument\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:119:7: note: candidate function not viable: no known conversion from 'Point' to '__ios_type &(*)(__ios_type &)' (aka 'basic_ios<char, std::char_traits<char>> &(*)(basic_ios<char, std::char_traits<char>> &)') for 1st argument\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:129:7: note: candidate function not viable: no known conversion from 'Point' to 'ios_base &(*)(ios_base &)' for 1st argument\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:168:7: note: candidate function not viable: no known conversion from 'Point' to 'long' for 1st argument\n  168 |       operator<<(long __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:172:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned long' for 1st argument\n  172 |       operator<<(unsigned long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:176:7: note: candidate function not viable: no known conversion from 'Point' to 'bool' for 1st argument\n  176 |       operator<<(bool __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:180:7: note: candidate function not viable: no known conversion from 'Point' to 'short' for 1st argument\n  180 |       operator<<(short __n);\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:183:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned short' for 1st argument\n  183 |       operator<<(unsigned short __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:191:7: note: candidate function not viable: no known conversion from 'Point' to 'int' for 1st argument\n  191 |       operator<<(int __n);\n      |       ^          ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:194:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned int' for 1st argument\n  194 |       operator<<(unsigned int __n)\n      |       ^          ~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:203:7: note: candidate function not viable: no known conversion from 'Point' to 'long long' for 1st argument\n  203 |       operator<<(long long __n)\n      |       ^          ~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:207:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned long long' for 1st argument\n  207 |       operator<<(unsigned long long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:222:7: note: candidate function not viable: no known conversion from 'Point' to 'double' for 1st argument\n  222 |       operator<<(double __f)\n      |       ^          ~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:226:7: note: candidate function not viable: no known conversion from 'Point' to 'float' for 1st argument\n  226 |       operator<<(float __f)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:234:7: note: candidate function not viable: no known conversion from 'Point' to 'long double' for 1st argument\n  234 |       operator<<(long double __f)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:292:7: note: candidate function not viable: no known conversion from 'Point' to 'const void *' for 1st argument; take the address of the argument with &\n  292 |       operator<<(const void* __p)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:297:7: note: candidate function not viable: no known conversion from 'Point' to 'nullptr_t' (aka 'std::nullptr_t') for 1st argument\n  297 |       operator<<(nullptr_t)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:304:7: note: candidate function not viable: no known conversion from 'Point' to 'const volatile void *' for 1st argument; take the address of the argument with &\n  304 |       operator<<(const volatile void* __p)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:330:7: note: candidate function not viable: no known conversion from 'Point' to '__streambuf_type *' (aka 'basic_streambuf<char, std::char_traits<char>> *') for 1st argument\n  330 |       operator<<(__streambuf_type* __sb);\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g no_print.cpp -o no_print",
      "out": "",
      "err": "no_print.cpp:10:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and 'Point')\n   10 |     std::cout << p << '\\n';\n      |     ~~~~~~~~~ ^  ~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: no known conversion from 'Point' to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: no known conversion from 'Point' to 'char' for 2nd argument\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^                                                 ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:570:5: note: candidate function template not viable: no known conversion from 'Point' to 'char' for 2nd argument\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^                                               ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:581:5: note: candidate function template not viable: no known conversion from 'Point' to 'signed char' for 2nd argument\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:586:5: note: candidate function template not viable: no known conversion from 'Point' to 'unsigned char' for 2nd argument\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:595:5: note: candidate function template not viable: no known conversion from 'Point' to 'wchar_t' for 2nd argument\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:600:5: note: candidate function template not viable: no known conversion from 'Point' to 'char8_t' for 2nd argument\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:605:5: note: candidate function template not viable: no known conversion from 'Point' to 'char16_t' for 2nd argument\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:609:5: note: candidate function template not viable: no known conversion from 'Point' to 'char32_t' for 2nd argument\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:662:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char *' for 2nd argument\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:675:5: note: candidate function template not viable: no known conversion from 'Point' to 'const signed char *' for 2nd argument\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:680:5: note: candidate function template not viable: no known conversion from 'Point' to 'const unsigned char *' for 2nd argument\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:689:5: note: candidate function template not viable: no known conversion from 'Point' to 'const wchar_t *' for 2nd argument\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:694:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char8_t *' for 2nd argument\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:699:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char16_t *' for 2nd argument\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:703:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char32_t *' for 2nd argument\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ostream.tcc:307:5: note: candidate function template not viable: no known conversion from 'Point' to 'const char *' for 2nd argument\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^                                                 ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/cstddef:124:5: note: candidate function template not viable: no known conversion from 'ostream' (aka 'basic_ostream<char>') to 'byte' for 1st argument\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:554:5: note: candidate template ignored: deduced conflicting types for parameter '_CharT' ('char' vs. 'Point')\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string_view:761:5: note: candidate template ignored: could not match 'basic_string_view<_CharT, _Traits>' against 'Point'\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/basic_string.h:4032:5: note: candidate template ignored: could not match 'basic_string<_CharT, _Traits, _Alloc>' against 'Point'\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:615:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:620:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:624:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:645:5: note: candidate template ignored: could not match 'const _CharT *' against 'Point'\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:709:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:714:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:718:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:801:5: note: candidate template ignored: substitution failure [with _Ostream = ostream &, _Tp = Point]: constraints not satisfied for alias template '__rvalue_stream_insertion_t' [with _Os = std::basic_ostream<char> &, _Tp = Point]\n  800 |     inline __rvalue_stream_insertion_t<_Ostream, _Tp>\n      |            ~~~~~~~~~~~~~~~~~~~~~~~~~~~\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:110:7: note: candidate function not viable: no known conversion from 'Point' to '__ostream_type &(*)(__ostream_type &)' (aka 'basic_ostream<char, std::char_traits<char>> &(*)(basic_ostream<char, std::char_traits<char>> &)') for 1st argument\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:119:7: note: candidate function not viable: no known conversion from 'Point' to '__ios_type &(*)(__ios_type &)' (aka 'basic_ios<char, std::char_traits<char>> &(*)(basic_ios<char, std::char_traits<char>> &)') for 1st argument\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:129:7: note: candidate function not viable: no known conversion from 'Point' to 'ios_base &(*)(ios_base &)' for 1st argument\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:168:7: note: candidate function not viable: no known conversion from 'Point' to 'long' for 1st argument\n  168 |       operator<<(long __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:172:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned long' for 1st argument\n  172 |       operator<<(unsigned long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:176:7: note: candidate function not viable: no known conversion from 'Point' to 'bool' for 1st argument\n  176 |       operator<<(bool __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:180:7: note: candidate function not viable: no known conversion from 'Point' to 'short' for 1st argument\n  180 |       operator<<(short __n);\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:183:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned short' for 1st argument\n  183 |       operator<<(unsigned short __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:191:7: note: candidate function not viable: no known conversion from 'Point' to 'int' for 1st argument\n  191 |       operator<<(int __n);\n      |       ^          ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:194:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned int' for 1st argument\n  194 |       operator<<(unsigned int __n)\n      |       ^          ~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:203:7: note: candidate function not viable: no known conversion from 'Point' to 'long long' for 1st argument\n  203 |       operator<<(long long __n)\n      |       ^          ~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:207:7: note: candidate function not viable: no known conversion from 'Point' to 'unsigned long long' for 1st argument\n  207 |       operator<<(unsigned long long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:222:7: note: candidate function not viable: no known conversion from 'Point' to 'double' for 1st argument\n  222 |       operator<<(double __f)\n      |       ^          ~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:226:7: note: candidate function not viable: no known conversion from 'Point' to 'float' for 1st argument\n  226 |       operator<<(float __f)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:234:7: note: candidate function not viable: no known conversion from 'Point' to 'long double' for 1st argument\n  234 |       operator<<(long double __f)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:292:7: note: candidate function not viable: no known conversion from 'Point' to 'const void *' for 1st argument; take the address of the argument with &\n  292 |       operator<<(const void* __p)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:297:7: note: candidate function not viable: no known conversion from 'Point' to 'nullptr_t' (aka 'std::nullptr_t') for 1st argument\n  297 |       operator<<(nullptr_t)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:304:7: note: candidate function not viable: no known conversion from 'Point' to 'const volatile void *' for 1st argument; take the address of the argument with &\n  304 |       operator<<(const volatile void* __p)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:330:7: note: candidate function not viable: no known conversion from 'Point' to '__streambuf_type *' (aka 'basic_streambuf<char, std::char_traits<char>> *') for 1st argument\n  330 |       operator<<(__streambuf_type* __sb);\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "noisy.cpp": {
   "src": "#include <iostream>\n\nint next_id{1};\n\nstruct Gadget {\n    int id;\n    Gadget() : id{next_id++} {\n        std::cout << \"  default #\" << id << '\\n';\n    }\n    Gadget(const Gadget& o) : id{next_id++} {\n        std::cout << \"  copy #\" << id << \" from #\" << o.id << '\\n';\n    }\n    Gadget& operator=(const Gadget& o) {\n        std::cout << \"  copy-assign #\" << id << \" = #\" << o.id << '\\n';\n        return *this;\n    }\n    Gadget(Gadget&& o) noexcept : id{next_id++} {\n        std::cout << \"  move #\" << id << \" from #\" << o.id << '\\n';\n    }\n    Gadget& operator=(Gadget&& o) noexcept {\n        std::cout << \"  move-assign #\" << id << \" = #\" << o.id << '\\n';\n        return *this;\n    }\n    ~Gadget() {\n        std::cout << \"  destroy #\" << id << '\\n';\n    }\n};\n\nint main() {\n    std::cout << \"1: Gadget a;\\n\";\n    Gadget a;\n    std::cout << \"2: Gadget b{a};\\n\";\n    Gadget b{a};\n    std::cout << \"3: Gadget c = a;\\n\";\n    Gadget c = a;\n    std::cout << \"4: b = c;\\n\";\n    b = c;\n    std::cout << \"5: c = Gadget{};\\n\";\n    c = Gadget{};\n    std::cout << \"6: end of main\\n\";\n}\n",
   "stdout": "1: Gadget a;\n  default #1\n2: Gadget b{a};\n  copy #2 from #1\n3: Gadget c = a;\n  copy #3 from #1\n4: b = c;\n  copy-assign #2 = #3\n5: c = Gadget{};\n  default #4\n  move-assign #3 = #4\n  destroy #4\n6: end of main\n  destroy #3\n  destroy #2\n  destroy #1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g noisy.cpp -o noisy",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./noisy",
     "out": "1: Gadget a;\n  default #1\n2: Gadget b{a};\n  copy #2 from #1\n3: Gadget c = a;\n  copy #3 from #1\n4: b = c;\n  copy-assign #2 = #3\n5: c = Gadget{};\n  default #4\n  move-assign #3 = #4\n  destroy #4\n6: end of main\n  destroy #3\n  destroy #2\n  destroy #1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1: Gadget a;\n  default #1\n2: Gadget b{a};\n  copy #2 from #1\n3: Gadget c = a;\n  copy #3 from #1\n4: b = c;\n  copy-assign #2 = #3\n5: c = Gadget{};\n  default #4\n  move-assign #3 = #4\n  destroy #4\n6: end of main\n  destroy #3\n  destroy #2\n  destroy #1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g noisy.cpp -o noisy",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./noisy",
      "out": "1: Gadget a;\n  default #1\n2: Gadget b{a};\n  copy #2 from #1\n3: Gadget c = a;\n  copy #3 from #1\n4: b = c;\n  copy-assign #2 = #3\n5: c = Gadget{};\n  default #4\n  move-assign #3 = #4\n  destroy #4\n6: end of main\n  destroy #3\n  destroy #2\n  destroy #1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_compound.cpp": {
   "src": "#include <iostream>\n\nstruct Score {\n    int points{0};\n    Score& operator+=(const Score& other) {\n        points += other.points;\n        return *this;\n    }\n};\n\nScore operator+(Score a, const Score& b) {\n    a += b;\n    return a;\n}\n\nint main() {\n    Score s{10};\n    s += Score{5};\n    std::cout << (s + Score{1}).points << ' ' << s.points << '\\n';\n}\n",
   "stdout": "16 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_compound.cpp -o parsons_compound",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_compound",
     "out": "16 15\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "16 15\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_compound.cpp -o parsons_compound",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_compound",
      "out": "16 15\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "point_print.cpp": {
   "src": "#include <iostream>\n\nstruct Point {\n    int x{0};\n    int y{0};\n};\n\nstd::ostream& operator<<(std::ostream& out, const Point& p) {\n    out << '(' << p.x << \", \" << p.y << ')';\n    return out;\n}\n\nint main() {\n    Point p{3, 4};\n    Point q{-1, 7};\n    std::cout << p << \" and \" << q << '\\n';\n    operator<<(std::cout, p) << '\\n';\n}\n",
   "stdout": "(3, 4) and (-1, 7)\n(3, 4)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g point_print.cpp -o point_print",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./point_print",
     "out": "(3, 4) and (-1, 7)\n(3, 4)\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "(3, 4) and (-1, 7)\n(3, 4)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g point_print.cpp -o point_print",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./point_print",
      "out": "(3, 4) and (-1, 7)\n(3, 4)\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "point_void.cpp": {
   "src": "#include <iostream>\n\nstruct Point {\n    int x{0};\n    int y{0};\n};\n\nvoid operator<<(std::ostream& out, const Point& p) {\n    out << '(' << p.x << \", \" << p.y << ')';\n}\n\nint main() {\n    Point p{3, 4};\n    Point q{-1, 7};\n    std::cout << p << \" and \" << q << '\\n';\n    operator<<(std::cout, p) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "point_void.cpp: In function ‘int main()’:\npoint_void.cpp:15:20: error: invalid operands of types ‘void’ and ‘const char [6]’ to binary ‘operator<<’\n   15 |     std::cout << p << \" and \" << q << '\\n';\n      |     ~~~~~~~~~~~~~~ ^~ ~~~~~~~\n      |               |       |\n      |               void    const char [6]\npoint_void.cpp:16:30: error: invalid operands of types ‘void’ and ‘char’ to binary ‘operator<<’\n   16 |     operator<<(std::cout, p) << '\\n';\n      |     ~~~~~~~~~~~~~~~~~~~~~~~~ ^~ ~~~~\n      |               |                 |\n      |               void              char\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g point_void.cpp -o point_void",
     "out": "",
     "err": "point_void.cpp: In function ‘int main()’:\npoint_void.cpp:15:20: error: invalid operands of types ‘void’ and ‘const char [6]’ to binary ‘operator<<’\n   15 |     std::cout << p << \" and \" << q << '\\n';\n      |     ~~~~~~~~~~~~~~ ^~ ~~~~~~~\n      |               |       |\n      |               void    const char [6]\npoint_void.cpp:16:30: error: invalid operands of types ‘void’ and ‘char’ to binary ‘operator<<’\n   16 |     operator<<(std::cout, p) << '\\n';\n      |     ~~~~~~~~~~~~~~~~~~~~~~~~ ^~ ~~~~\n      |               |                 |\n      |               void              char\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "point_void.cpp:15:20: error: invalid operands to binary expression ('void' and 'const char[6]')\n   15 |     std::cout << p << \" and \" << q << '\\n';\n      |     ~~~~~~~~~~~~~~ ^  ~~~~~~~\npoint_void.cpp:16:30: error: invalid operands to binary expression ('void' and 'char')\n   16 |     operator<<(std::cout, p) << '\\n';\n      |     ~~~~~~~~~~~~~~~~~~~~~~~~ ^  ~~~~\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g point_void.cpp -o point_void",
      "out": "",
      "err": "point_void.cpp:15:20: error: invalid operands to binary expression ('void' and 'const char[6]')\n   15 |     std::cout << p << \" and \" << q << '\\n';\n      |     ~~~~~~~~~~~~~~ ^  ~~~~~~~\npoint_void.cpp:16:30: error: invalid operands to binary expression ('void' and 'char')\n   16 |     operator<<(std::cout, p) << '\\n';\n      |     ~~~~~~~~~~~~~~~~~~~~~~~~ ^  ~~~~\n2 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_deep.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nstruct Team {\n    std::string name;\n    std::vector<std::string> players;\n};\n\nint main() {\n    Team a{\"Reds\", {\"Ana\", \"Bo\"}};\n    Team b = a;\n    b.name = \"Blues\";\n    b.players.push_back(\"Cy\");\n    a.players[0] = \"Al\";\n    std::cout << a.name << ' ' << a.players.size() << ' ' << a.players[0] << '\\n';\n    std::cout << b.name << ' ' << b.players.size() << ' ' << b.players[0] << '\\n';\n}\n",
   "stdout": "Reds 2 Al\nBlues 3 Ana\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_deep.cpp -o predict_deep",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_deep",
     "out": "Reds 2 Al\nBlues 3 Ana\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Reds 2 Al\nBlues 3 Ana\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_deep.cpp -o predict_deep",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_deep",
      "out": "Reds 2 Al\nBlues 3 Ana\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_deleted.cpp": {
   "src": "#include <iostream>\n\nclass Badge {\npublic:\n    explicit Badge(int id) : id_{id} {}\n    Badge(const Badge&) = delete;\n    int id() const { return id_; }\nprivate:\n    int id_;\n};\n\nint main() {\n    Badge mine{7};\n    std::cout << \"badge \" << mine.id() << '\\n';\n    Badge spare = mine;\n    std::cout << \"spare \" << spare.id() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "predict_deleted.cpp: In function ‘int main()’:\npredict_deleted.cpp:15:19: error: use of deleted function ‘Badge::Badge(const Badge&)’\n   15 |     Badge spare = mine;\n      |                   ^~~~\npredict_deleted.cpp:6:5: note: declared here\n    6 |     Badge(const Badge&) = delete;\n      |     ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_deleted.cpp -o predict_deleted",
     "out": "",
     "err": "predict_deleted.cpp: In function ‘int main()’:\npredict_deleted.cpp:15:19: error: use of deleted function ‘Badge::Badge(const Badge&)’\n   15 |     Badge spare = mine;\n      |                   ^~~~\npredict_deleted.cpp:6:5: note: declared here\n    6 |     Badge(const Badge&) = delete;\n      |     ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "predict_deleted.cpp:15:11: error: call to deleted constructor of 'Badge'\n   15 |     Badge spare = mine;\n      |           ^       ~~~~\npredict_deleted.cpp:6:5: note: 'Badge' has been explicitly marked deleted here\n    6 |     Badge(const Badge&) = delete;\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_deleted.cpp -o predict_deleted",
      "out": "",
      "err": "predict_deleted.cpp:15:11: error: call to deleted constructor of 'Badge'\n   15 |     Badge spare = mine;\n      |           ^       ~~~~\npredict_deleted.cpp:6:5: note: 'Badge' has been explicitly marked deleted here\n    6 |     Badge(const Badge&) = delete;\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_fraction.cpp": {
   "src": "#include <iostream>\n#include <numeric>\n#include <stdexcept>\n\nclass Fraction {\npublic:\n    Fraction(int num, int den = 1) : num_{num}, den_{den} {\n        if (den_ == 0) throw std::invalid_argument{\"denominator is zero\"};\n        if (den_ < 0) { num_ = -num_; den_ = -den_; }\n        int g{std::gcd(num_, den_)};\n        num_ /= g;\n        den_ /= g;\n    }\n    int num() const { return num_; }\n    int den() const { return den_; }\nprivate:\n    int num_;\n    int den_;\n};\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.den() + b.num() * a.den(), a.den() * b.den()};\n}\n\nFraction operator*(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num() * b.num(), a.den() * b.den()};\n}\n\nstd::ostream& operator<<(std::ostream& out, const Fraction& f) {\n    return out << f.num() << '/' << f.den();\n}\n\nint main() {\n    Fraction a{3, 4};\n    Fraction b{1, 4};\n    std::cout << a + b << '\\n';\n    std::cout << a * 2 << '\\n';\n    std::cout << b + b + b << '\\n';\n}\n",
   "stdout": "1/1\n3/2\n3/4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_fraction.cpp -o predict_fraction",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_fraction",
     "out": "1/1\n3/2\n3/4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1/1\n3/2\n3/4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_fraction.cpp -o predict_fraction",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_fraction",
      "out": "1/1\n3/2\n3/4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_sort.cpp": {
   "src": "#include <algorithm>\n#include <compare>\n#include <iostream>\n#include <string>\n#include <vector>\n\nstruct Runner {\n    int laps{0};\n    std::string name;\n    auto operator<=>(const Runner&) const = default;\n};\n\nint main() {\n    std::vector<Runner> rs{{3, \"Zed\"}, {2, \"Amy\"}, {3, \"Bea\"}, {1, \"Cat\"}};\n    std::sort(rs.begin(), rs.end());\n    for (const auto& r : rs) std::cout << r.laps << ' ' << r.name << '\\n';\n}\n",
   "stdout": "1 Cat\n2 Amy\n3 Bea\n3 Zed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_sort.cpp -o predict_sort",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_sort",
     "out": "1 Cat\n2 Amy\n3 Bea\n3 Zed\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 Cat\n2 Amy\n3 Bea\n3 Zed\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_sort.cpp -o predict_sort",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_sort",
      "out": "1 Cat\n2 Amy\n3 Bea\n3 Zed\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_builtin.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int a{2};\n    int b{3};\n    std::cout << a + b << '\\n';\n}\n",
   "stdout": "5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_builtin.cpp -o road_builtin",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_builtin",
     "out": "5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_builtin.cpp -o road_builtin",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_builtin",
      "out": "5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_convert.cpp": {
   "src": "#include <iostream>\n\nclass Coins {\npublic:\n    Coins(int n) : n_{n} {}\n    int count() const { return n_; }\nprivate:\n    int n_;\n};\n\nCoins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n\nint main() {\n    Coins purse{5};\n    std::cout << (2 + purse).count() << '\\n';\n}\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_convert.cpp -o road_convert",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_convert",
     "out": "7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_convert.cpp -o road_convert",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_convert",
      "out": "7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_exact.cpp": {
   "src": "#include <iostream>\n\nclass Coins {\npublic:\n    Coins(int n) : n_{n} {}\n    int count() const { return n_; }\nprivate:\n    int n_;\n};\n\nCoins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n\nint main() {\n    Coins purse{5};\n    Coins jar{7};\n    std::cout << (purse + jar).count() << '\\n';\n}\n",
   "stdout": "12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_exact.cpp -o road_exact",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_exact",
     "out": "12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_exact.cpp -o road_exact",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_exact",
      "out": "12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_explicit.cpp": {
   "src": "#include <iostream>\n\nclass Coins {\npublic:\n    explicit Coins(int n) : n_{n} {}\n    int count() const { return n_; }\nprivate:\n    int n_;\n};\n\nCoins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n\nint main() {\n    Coins purse{5};\n    std::cout << (2 + purse).count() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "road_explicit.cpp: In function ‘int main()’:\nroad_explicit.cpp:15:21: error: no match for ‘operator+’ (operand types are ‘int’ and ‘Coins’)\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n      |                   |   |\n      |                   int Coins\nroad_explicit.cpp:11:7: note: candidate: ‘Coins operator+(const Coins&, const Coins&)’\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |       ^~~~~~~~\nroad_explicit.cpp:11:30: note:   no known conversion for argument 1 from ‘int’ to ‘const Coins&’\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |                 ~~~~~~~~~~~~~^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_explicit.cpp -o road_explicit",
     "out": "",
     "err": "road_explicit.cpp: In function ‘int main()’:\nroad_explicit.cpp:15:21: error: no match for ‘operator+’ (operand types are ‘int’ and ‘Coins’)\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\n      |                   |   |\n      |                   int Coins\nroad_explicit.cpp:11:7: note: candidate: ‘Coins operator+(const Coins&, const Coins&)’\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |       ^~~~~~~~\nroad_explicit.cpp:11:30: note:   no known conversion for argument 1 from ‘int’ to ‘const Coins&’\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |                 ~~~~~~~~~~~~~^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "road_explicit.cpp:15:21: error: invalid operands to binary expression ('int' and 'Coins')\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\nroad_explicit.cpp:11:7: note: candidate function not viable: no known conversion from 'int' to 'const Coins' for 1st argument\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |       ^         ~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_explicit.cpp -o road_explicit",
      "out": "",
      "err": "road_explicit.cpp:15:21: error: invalid operands to binary expression ('int' and 'Coins')\n   15 |     std::cout << (2 + purse).count() << '\\n';\n      |                   ~ ^ ~~~~~\nroad_explicit.cpp:11:7: note: candidate function not viable: no known conversion from 'int' to 'const Coins' for 1st argument\n   11 | Coins operator+(const Coins& a, const Coins& b) { return Coins{a.count() + b.count()}; }\n      |       ^         ~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "rule_zero.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nclass Scores {\npublic:\n    explicit Scores(int first) : data_{first, 0, 0} {}\n    int& operator[](int i) { return data_.at(i); }\nprivate:\n    std::vector<int> data_;\n};\n\nint main() {\n    Scores mine{7};\n    Scores copy{mine};\n    copy[0] = 99;\n    std::cout << \"mine[0] is \" << mine[0] << \", copy[0] is \" << copy[0] << '\\n';\n    copy = mine;\n    std::cout << \"after copy = mine: copy[0] is \" << copy[0] << '\\n';\n}\n",
   "stdout": "mine[0] is 7, copy[0] is 99\nafter copy = mine: copy[0] is 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer rule_zero.cpp -o rule_zero",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./rule_zero",
     "out": "mine[0] is 7, copy[0] is 99\nafter copy = mine: copy[0] is 7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shallow.cpp": {
   "src": "#include <iostream>\n\nclass Scores {\npublic:\n    explicit Scores(int first) : data_{new int[3]{first, 0, 0}} {}\n    ~Scores() {\n        std::cout << \"returning the block\" << std::endl;\n        delete[] data_;\n    }\n    int& operator[](int i) { return data_[i]; }\nprivate:\n    int* data_;\n};\n\nint main() {\n    Scores mine{7};\n    Scores copy{mine};\n    copy[0] = 99;\n    std::cout << \"mine[0] is \" << mine[0] << std::endl;\n}\n",
   "stdout": "mine[0] is 99\nreturning the block\nreturning the block\n",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x555555556805 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x5555555567f9 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556926 in Scores::Scores(int) /home/you/cpp-ch21/shallow.cpp:5\n    #2 0x555555556478 in main /home/you/cpp-ch21/shallow.cpp:16\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer shallow.cpp -o shallow",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./shallow",
     "out": "mine[0] is 99\nreturning the block\nreturning the block\n",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x555555556805 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x5555555567f9 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556926 in Scores::Scores(int) /home/you/cpp-ch21/shallow.cpp:5\n    #2 0x555555556478 in main /home/you/cpp-ch21/shallow.cpp:16\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n",
     "exit": 1,
     "merged": "mine[0] is 99\nreturning the block\nreturning the block\n=================================================================\n==2==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x555555556805 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff1f8 in operator delete[](void*) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155\n    #1 0x555555556d69 in Scores::~Scores() /home/you/cpp-ch21/shallow.cpp:8\n    #2 0x5555555567f9 in main /home/you/cpp-ch21/shallow.cpp:20\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe6c8 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:98\n    #1 0x555555556926 in Scores::Scores(int) /home/you/cpp-ch21/shallow.cpp:5\n    #2 0x555555556478 in main /home/you/cpp-ch21/shallow.cpp:16\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x555555556304 in _start (/home/you/cpp-ch21/shallow+0x2304) (BuildId: 119c731362169c79464a2b969380320bb53f213a)\n\nSUMMARY: AddressSanitizer: double-free ../../../../src/libsanitizer/asan/asan_new_delete.cpp:155 in operator delete[](void*)\n==2==ABORTING\n"
    }
   ]
  },
  "shelf.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nclass Shelf {\npublic:\n    std::string& operator[](std::size_t i) { return books_.at(i); }\n    const std::string& operator[](std::size_t i) const { return books_.at(i); }\n    void add(const std::string& b) { books_.push_back(b); }\nprivate:\n    std::vector<std::string> books_;\n};\n\nstruct Scale {\n    double factor{1.0};\n    double operator()(double x) const { return x * factor; }\n};\n\nint main() {\n    Shelf s;\n    s.add(\"Dune\");\n    s.add(\"Emma\");\n    s[1] = \"Ulysses\";\n    std::cout << s[0] << \", \" << s[1] << '\\n';\n    Scale twice{2.0};\n    std::cout << twice(21) << '\\n';\n    std::cout << Scale{0.5}(9) << '\\n';\n}\n",
   "stdout": "Dune, Ulysses\n42\n4.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g shelf.cpp -o shelf",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./shelf",
     "out": "Dune, Ulysses\n42\n4.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Dune, Ulysses\n42\n4.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g shelf.cpp -o shelf",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./shelf",
      "out": "Dune, Ulysses\n42\n4.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_cmp.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nstruct Parcel {\n    std::string label;\n    int grams{0};\n    bool operator<(const Parcel& other) { return grams < other.grams; }\n};\n\nconst Parcel& lighter(const Parcel& a, const Parcel& b) {\n    return b < a ? b : a;\n}\n\nint main() {\n    Parcel box{\"books\", 900};\n    Parcel bag{\"socks\", 200};\n    std::cout << lighter(box, bag).label << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_cmp.cpp: In function ‘const Parcel& lighter(const Parcel&, const Parcel&)’:\nspot_cmp.cpp:11:16: error: passing ‘const Parcel’ as ‘this’ argument discards qualifiers [-fpermissive]\n   11 |     return b < a ? b : a;\n      |                ^\nspot_cmp.cpp:7:10: note:   in call to ‘bool Parcel::operator<(const Parcel&)’\n    7 |     bool operator<(const Parcel& other) { return grams < other.grams; }\n      |          ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_cmp.cpp -o spot_cmp",
     "out": "",
     "err": "spot_cmp.cpp: In function ‘const Parcel& lighter(const Parcel&, const Parcel&)’:\nspot_cmp.cpp:11:16: error: passing ‘const Parcel’ as ‘this’ argument discards qualifiers [-fpermissive]\n   11 |     return b < a ? b : a;\n      |                ^\nspot_cmp.cpp:7:10: note:   in call to ‘bool Parcel::operator<(const Parcel&)’\n    7 |     bool operator<(const Parcel& other) { return grams < other.grams; }\n      |          ^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_cmp.cpp:11:14: error: invalid operands to binary expression ('const Parcel' and 'const Parcel')\n   11 |     return b < a ? b : a;\n      |            ~ ^ ~\nspot_cmp.cpp:7:10: note: candidate function not viable: 'this' argument has type 'const Parcel', but method is not marked const\n    7 |     bool operator<(const Parcel& other) { return grams < other.grams; }\n      |          ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_cmp.cpp -o spot_cmp",
      "out": "",
      "err": "spot_cmp.cpp:11:14: error: invalid operands to binary expression ('const Parcel' and 'const Parcel')\n   11 |     return b < a ? b : a;\n      |            ~ ^ ~\nspot_cmp.cpp:7:10: note: candidate function not viable: 'this' argument has type 'const Parcel', but method is not marked const\n    7 |     bool operator<(const Parcel& other) { return grams < other.grams; }\n      |          ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_explicit.cpp": {
   "src": "#include <iostream>\n\nclass Timer {\npublic:\n    Timer(int seconds) : seconds_{seconds} {}\n    int seconds() const { return seconds_; }\nprivate:\n    int seconds_;\n};\n\nbool is_long(const Timer& t) {\n    return t.seconds() > 60;\n}\n\nint main() {\n    int minutes{5};\n    std::cout << std::boolalpha << is_long(minutes) << '\\n';\n}\n",
   "stdout": "false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_explicit.cpp -o spot_explicit",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_explicit",
     "out": "false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_explicit.cpp -o spot_explicit",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_explicit",
      "out": "false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_shallow.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nclass Note {\npublic:\n    explicit Note(const std::string& s) : text_{new std::string{s}} {}\n    Note(const Note& other) : text_{other.text_} {}\n    ~Note() { delete text_; }\n    const std::string& text() const { return *text_; }\nprivate:\n    std::string* text_;\n};\n\nint main() {\n    Note a{\"buy milk\"};\n    Note b{a};\n    std::cout << b.text() << std::endl;\n}\n",
   "stdout": "buy milk\n",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x503000000040 at pc 0x55555555db35 bp 0x7fffffffe9f0 sp 0x7fffffffe9e0\nREAD of size 8 at 0x503000000040 thread T0\n    #0 0x55555555db34 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const /usr/include/c++/13/bits/basic_string.h:223\n    #1 0x55555555df94 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_is_local() const /usr/include/c++/13/bits/basic_string.h:264\n    #2 0x55555555dceb in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_dispose() /usr/include/c++/13/bits/basic_string.h:282\n    #3 0x55555555d30b in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::~basic_string() /usr/include/c++/13/bits/basic_string.h:804\n    #4 0x55555555cd90 in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #5 0x55555555c7cb in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #6 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #7 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #8 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\n0x503000000040 is located 0 bytes inside of 32-byte region [0x503000000040,0x503000000060)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x55555555cd9d in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #2 0x55555555c7bc in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cb56 in Note::Note(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&) /home/you/cpp-ch21/spot_shallow.cpp:6\n    #2 0x55555555c5e5 in main /home/you/cpp-ch21/spot_shallow.cpp:15\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /usr/include/c++/13/bits/basic_string.h:223 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa[fd]fd fd fd fa fa fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer spot_shallow.cpp -o spot_shallow",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_shallow",
     "out": "buy milk\n",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x503000000040 at pc 0x55555555db35 bp 0x7fffffffe9f0 sp 0x7fffffffe9e0\nREAD of size 8 at 0x503000000040 thread T0\n    #0 0x55555555db34 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const /usr/include/c++/13/bits/basic_string.h:223\n    #1 0x55555555df94 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_is_local() const /usr/include/c++/13/bits/basic_string.h:264\n    #2 0x55555555dceb in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_dispose() /usr/include/c++/13/bits/basic_string.h:282\n    #3 0x55555555d30b in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::~basic_string() /usr/include/c++/13/bits/basic_string.h:804\n    #4 0x55555555cd90 in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #5 0x55555555c7cb in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #6 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #7 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #8 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\n0x503000000040 is located 0 bytes inside of 32-byte region [0x503000000040,0x503000000060)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x55555555cd9d in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #2 0x55555555c7bc in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cb56 in Note::Note(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&) /home/you/cpp-ch21/spot_shallow.cpp:6\n    #2 0x55555555c5e5 in main /home/you/cpp-ch21/spot_shallow.cpp:15\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /usr/include/c++/13/bits/basic_string.h:223 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa[fd]fd fd fd fa fa fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
     "exit": 1,
     "merged": "buy milk\n=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x503000000040 at pc 0x55555555db35 bp 0x7fffffffe9f0 sp 0x7fffffffe9e0\nREAD of size 8 at 0x503000000040 thread T0\n    #0 0x55555555db34 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const /usr/include/c++/13/bits/basic_string.h:223\n    #1 0x55555555df94 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_is_local() const /usr/include/c++/13/bits/basic_string.h:264\n    #2 0x55555555dceb in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_dispose() /usr/include/c++/13/bits/basic_string.h:282\n    #3 0x55555555d30b in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::~basic_string() /usr/include/c++/13/bits/basic_string.h:804\n    #4 0x55555555cd90 in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #5 0x55555555c7cb in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #6 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #7 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #8 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\n0x503000000040 is located 0 bytes inside of 32-byte region [0x503000000040,0x503000000060)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x55555555cd9d in Note::~Note() /home/you/cpp-ch21/spot_shallow.cpp:8\n    #2 0x55555555c7bc in main /home/you/cpp-ch21/spot_shallow.cpp:18\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cb56 in Note::Note(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&) /home/you/cpp-ch21/spot_shallow.cpp:6\n    #2 0x55555555c5e5 in main /home/you/cpp-ch21/spot_shallow.cpp:15\n    #3 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #4 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #5 0x55555555c404 in _start (/home/you/cpp-ch21/spot_shallow+0x8404) (BuildId: c8fc6fab2084fbf089e68b23b49351e735a59823)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /usr/include/c++/13/bits/basic_string.h:223 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_data() const\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa[fd]fd fd fd fa fa fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n"
    }
   ]
  },
  "static_count.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nclass Ticket {\npublic:\n    enum class Kind { adult, child };\n    explicit Ticket(Kind k) : kind_{k}, number_{++issued_} {}\n    int number() const { return number_; }\n    std::string kind() const { return kind_ == Kind::adult ? \"adult\" : \"child\"; }\n    static int issued() { return issued_; }\nprivate:\n    Kind kind_;\n    int number_;\n    inline static int issued_{0};\n};\n\nint main() {\n    std::cout << \"before: \" << Ticket::issued() << '\\n';\n    Ticket a{Ticket::Kind::adult};\n    Ticket b{Ticket::Kind::child};\n    Ticket c{Ticket::Kind::adult};\n    std::cout << b.kind() << \" ticket #\" << b.number() << '\\n';\n    std::cout << \"issued: \" << Ticket::issued() << '\\n';\n}\n",
   "stdout": "before: 0\nchild ticket #2\nissued: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g static_count.cpp -o static_count",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./static_count",
     "out": "before: 0\nchild ticket #2\nissued: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "before: 0\nchild ticket #2\nissued: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g static_count.cpp -o static_count",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./static_count",
      "out": "before: 0\nchild ticket #2\nissued: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_eight.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <utility>\n\nstd::string calls;\n\nstruct Gadget {\n    Gadget() { calls += \"default+\"; }\n    Gadget(const Gadget&) { calls += \"copy+\"; }\n    Gadget& operator=(const Gadget&) { calls += \"copy-assign+\"; return *this; }\n    Gadget(Gadget&&) noexcept { calls += \"move+\"; }\n    Gadget& operator=(Gadget&&) noexcept { calls += \"move-assign+\"; return *this; }\n    ~Gadget() { calls += \"destroy+\"; }\n};\n\nvoid row(int n) {\n    calls.pop_back();\n    std::cout << n << ' ' << calls << '\\n';\n    calls.clear();\n}\n\nGadget make() { return Gadget{}; }\nvoid use(Gadget) {}\n\nint main() {\n    Gadget a;                row(1);\n    Gadget b{a};             row(2);\n    Gadget c = a;            row(3);\n    b = c;                   row(4);\n    Gadget d = make();       row(5);\n    use(a);                  row(6);\n    c = Gadget{};            row(7);\n    Gadget e{std::move(d)};  row(8);\n}\n",
   "stdout": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_eight.cpp -o trace_eight",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_eight",
     "out": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_eight.cpp -o trace_eight",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_eight",
      "out": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_eight_noelide.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <utility>\n\nstd::string calls;\n\nstruct Gadget {\n    Gadget() { calls += \"default+\"; }\n    Gadget(const Gadget&) { calls += \"copy+\"; }\n    Gadget& operator=(const Gadget&) { calls += \"copy-assign+\"; return *this; }\n    Gadget(Gadget&&) noexcept { calls += \"move+\"; }\n    Gadget& operator=(Gadget&&) noexcept { calls += \"move-assign+\"; return *this; }\n    ~Gadget() { calls += \"destroy+\"; }\n};\n\nvoid row(int n) {\n    calls.pop_back();\n    std::cout << n << ' ' << calls << '\\n';\n    calls.clear();\n}\n\nGadget make() { return Gadget{}; }\nvoid use(Gadget) {}\n\nint main() {\n    Gadget a;                row(1);\n    Gadget b{a};             row(2);\n    Gadget c = a;            row(3);\n    b = c;                   row(4);\n    Gadget d = make();       row(5);\n    use(a);                  row(6);\n    c = Gadget{};            row(7);\n    Gadget e{std::move(d)};  row(8);\n}\n",
   "stdout": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fno-elide-constructors trace_eight_noelide.cpp -o trace_eight_noelide",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_eight_noelide",
     "out": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fno-elide-constructors trace_eight_noelide.cpp -o trace_eight_noelide",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_eight_noelide",
      "out": "1 default\n2 copy\n3 copy\n4 copy-assign\n5 default\n6 copy+destroy\n7 default+move-assign+destroy\n8 move\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_static.cpp": {
   "src": "#include <iostream>\n\nclass Robot {\npublic:\n    Robot() : id_{++made_} { ++alive_; }\n    ~Robot() { --alive_; }\n    int id() const { return id_; }\n    static int alive() { return alive_; }\nprivate:\n    int id_;\n    inline static int made_{0};\n    inline static int alive_{0};\n};\n\nint main() {\n    for (int round{1}; round <= 4; ++round) {\n        Robot r;\n        Robot spare;\n        std::cout << round << ' ' << r.id() << ' ' << spare.id() << ' ' << Robot::alive() << '\\n';\n    }\n}\n",
   "stdout": "1 1 2 2\n2 3 4 2\n3 5 6 2\n4 7 8 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_static.cpp -o trace_static",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_static",
     "out": "1 1 2 2\n2 3 4 2\n3 5 6 2\n4 7 8 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 2 2\n2 3 4 2\n3 5 6 2\n4 7 8 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_static.cpp -o trace_static",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_static",
      "out": "1 1 2 2\n2 3 4 2\n3 5 6 2\n4 7 8 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "versions.cpp": {
   "src": "#include <algorithm>\n#include <compare>\n#include <iostream>\n#include <vector>\n\nstruct Version {\n    int major{0};\n    int minor{0};\n    int patch{0};\n    auto operator<=>(const Version&) const = default;\n};\n\nstd::ostream& operator<<(std::ostream& out, const Version& v) {\n    return out << v.major << '.' << v.minor << '.' << v.patch;\n}\n\nint main() {\n    std::vector<Version> vs{{1, 10, 0}, {1, 2, 9}, {0, 9, 9}, {1, 2, 10}};\n    std::sort(vs.begin(), vs.end());\n    for (const auto& v : vs) std::cout << v << '\\n';\n    std::cout << std::boolalpha << (Version{2, 0, 0} > Version{1, 99, 99}) << '\\n';\n    std::cout << (Version{1, 2, 3} == Version{1, 2, 3}) << '\\n';\n}\n",
   "stdout": "0.9.9\n1.2.9\n1.2.10\n1.10.0\ntrue\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g versions.cpp -o versions",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./versions",
     "out": "0.9.9\n1.2.9\n1.2.10\n1.10.0\ntrue\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0.9.9\n1.2.9\n1.2.10\n1.10.0\ntrue\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g versions.cpp -o versions",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./versions",
      "out": "0.9.9\n1.2.9\n1.2.10\n1.10.0\ntrue\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
