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
  "workdir": "/home/you/cpp-ch26",
  "versionDifferences": [
   "always_true.cpp",
   "boss_spot.cpp",
   "box_plain.cpp",
   "cookies.cpp",
   "ctad_bad.cpp",
   "deduce_conflict.cpp",
   "explicit_args.cpp",
   "link_bad.cpp",
   "no_greater.cpp",
   "no_greater_c.cpp",
   "over_constrained.cpp",
   "predict_concept_err.cpp",
   "printable_bad.cpp",
   "spot_concept.cpp",
   "spot_deduce.cpp",
   "spot_typename.cpp",
   "stars_runtime.cpp",
   "static_assert_way.cpp",
   "twice_double.cpp",
   "typename_bad.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): always_true.cpp, boss_spot.cpp, box_plain.cpp, cookies.cpp, ctad_bad.cpp, deduce_conflict.cpp, explicit_args.cpp, link_bad.cpp, no_greater.cpp, no_greater_c.cpp, over_constrained.cpp, predict_concept_err.cpp, printable_bad.cpp, spot_concept.cpp, spot_deduce.cpp, spot_typename.cpp, stars_runtime.cpp, static_assert_way.cpp, twice_double.cpp, typename_bad.cpp."
 },
 "programs": {
  "alias.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\ntemplate <typename T>\nusing Grid = std::vector<std::vector<T>>;\n\nint main() {\n    Grid<char> board(3, std::vector<char>(4, '.'));\n    Grid<int> table{{1, 2}, {3, 4}};\n    board[1][2] = 'X';\n    for (const auto& row : board) {\n        for (char c : row) {\n            std::cout << c;\n        }\n        std::cout << '\\n';\n    }\n    std::cout << table[1][0] + table[0][1] << '\\n';\n}\n",
   "stdout": "....\n..X.\n....\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g alias.cpp -o alias",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./alias",
     "out": "....\n..X.\n....\n5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "....\n..X.\n....\n5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g alias.cpp -o alias",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./alias",
      "out": "....\n..X.\n....\n5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "always_true.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nconcept WholeOops = requires {\n    std::integral<T>;            // only checks that this compiles!\n};\n\ntemplate <typename T>\nconcept Whole = requires {\n    requires std::integral<T>;   // checks that it is true\n};\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << WholeOops<int> << ' ' << WholeOops<double> << '\\n';\n    std::cout << Whole<int> << ' ' << Whole<double> << '\\n';\n}\n",
   "stdout": "true true\ntrue false\n",
   "stderr": "always_true.cpp:6:5: warning: testing if a concept-id is a valid expression; add ‘requires’ to check satisfaction [-Wmissing-requires]\n    6 |     std::integral<T>;            // only checks that this compiles!\n      |     ^\n      |     requires \n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g always_true.cpp -o always_true",
     "out": "",
     "err": "always_true.cpp:6:5: warning: testing if a concept-id is a valid expression; add ‘requires’ to check satisfaction [-Wmissing-requires]\n    6 |     std::integral<T>;            // only checks that this compiles!\n      |     ^\n      |     requires \n",
     "exit": 0
    },
    {
     "cmd": "./always_true",
     "out": "true true\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "true true\ntrue false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g always_true.cpp -o always_true",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./always_true",
      "out": "true true\ntrue false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "bigger.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << bigger(3, 7) << '\\n';\n    std::cout << bigger(2.5, 1.5) << '\\n';\n    std::cout << bigger(std::string{\"apple\"}, std::string{\"pear\"}) << '\\n';\n    std::cout << bigger('a', 'z') << '\\n';\n}\n",
   "stdout": "7\n2.5\npear\nz\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bigger.cpp -o bigger",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./bigger",
     "out": "7\n2.5\npear\nz\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7\n2.5\npear\nz\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bigger.cpp -o bigger",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./bigger",
      "out": "7\n2.5\npear\nz\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nconcept HasLength = requires(const T& x) {\n    x.length();\n};\n\nvoid shout(const HasLength auto& word) {\n    std::cout << word << \" has \" << word.length() << \" letters\\n\";\n}\n\nint main() {\n    shout(std::string{\"wrench\"});\n}\n",
   "stdout": "wrench has 6 letters\n",
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
     "out": "wrench has 6 letters\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "wrench has 6 letters\n",
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
      "out": "wrench has 6 letters\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nconcept Sized = requires(const T& c) {\n    c.size();\n};\n\ntemplate <Sized C>\nvoid report(const C& c) {\n    std::cout << c.size() << \" items\\n\";\n}\n\nint main() {\n    report(std::string{\"wren\"});\n}\n",
   "stdout": "4 items\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_parsons.cpp -o boss_parsons",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_parsons",
     "out": "4 items\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4 items\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_parsons.cpp -o boss_parsons",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_parsons",
      "out": "4 items\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_predict.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n#include <string>\n\ntemplate <typename T>\nstd::string tag(T) { return \"any\"; }\n\ntemplate <>\nstd::string tag<double>(double) { return \"dbl\"; }\n\nvoid sort_into(std::integral auto x) { std::cout << tag(x) << \":int \"; }\nvoid sort_into(auto x) { std::cout << tag(x) << \":gen \"; }\n\ntemplate <int N>\nint times(int x) { return x * N; }\n\nint main() {\n    sort_into(4);\n    sort_into(4.0);\n    sort_into(4.0f);\n    std::cout << times<3>(4) + times<2>(1) << '\\n';\n}\n",
   "stdout": "any:int dbl:gen any:gen 14\n",
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
     "out": "any:int dbl:gen any:gen 14\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "any:int dbl:gen any:gen 14\n",
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
      "out": "any:int dbl:gen any:gen 14\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> bolts{4, 9, 2};\n    int wanted = 5;\n    int largest = *std::max_element(bolts.begin(), bolts.end());\n    int extra = std::max(wanted - largest, 0);\n    std::size_t room = std::max(bolts.size(), 10);\n    std::cout << largest << ' ' << extra << ' ' << room << '\\n';\n}\n",
   "stdout": "",
   "stderr": "boss_spot.cpp: In function ‘int main()’:\nboss_spot.cpp:10:32: error: no matching function for call to ‘max(std::vector<int>::size_type, int)’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\nIn file included from /usr/include/c++/13/algorithm:60,\n                 from boss_spot.cpp:1:\n/usr/include/c++/13/bits/stl_algobase.h:257:5: note: candidate: ‘template<class _Tp> constexpr const _Tp& std::max(const _Tp&, const _Tp&)’\n  257 |     max(const _Tp& __a, const _Tp& __b)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algobase.h:257:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   deduced conflicting types for parameter ‘const _Tp’ (‘long unsigned int’ and ‘int’)\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/stl_algobase.h:303:5: note: candidate: ‘template<class _Tp, class _Compare> constexpr const _Tp& std::max(const _Tp&, const _Tp&, _Compare)’\n  303 |     max(const _Tp& __a, const _Tp& __b, _Compare __comp)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algobase.h:303:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   deduced conflicting types for parameter ‘const _Tp’ (‘long unsigned int’ and ‘int’)\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:5795:5: note: candidate: ‘template<class _Tp> constexpr _Tp std::max(initializer_list<_Tp>)’\n 5795 |     max(initializer_list<_Tp> __l)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algo.h:5795:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   mismatched types ‘std::initializer_list<_Tp>’ and ‘long unsigned int’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/stl_algo.h:5805:5: note: candidate: ‘template<class _Tp, class _Compare> constexpr _Tp std::max(initializer_list<_Tp>, _Compare)’\n 5805 |     max(initializer_list<_Tp> __l, _Compare __comp)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algo.h:5805:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   mismatched types ‘std::initializer_list<_Tp>’ and ‘long unsigned int’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_spot.cpp -o boss_spot",
     "out": "",
     "err": "boss_spot.cpp: In function ‘int main()’:\nboss_spot.cpp:10:32: error: no matching function for call to ‘max(std::vector<int>::size_type, int)’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\nIn file included from /usr/include/c++/13/algorithm:60,\n                 from boss_spot.cpp:1:\n/usr/include/c++/13/bits/stl_algobase.h:257:5: note: candidate: ‘template<class _Tp> constexpr const _Tp& std::max(const _Tp&, const _Tp&)’\n  257 |     max(const _Tp& __a, const _Tp& __b)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algobase.h:257:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   deduced conflicting types for parameter ‘const _Tp’ (‘long unsigned int’ and ‘int’)\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/stl_algobase.h:303:5: note: candidate: ‘template<class _Tp, class _Compare> constexpr const _Tp& std::max(const _Tp&, const _Tp&, _Compare)’\n  303 |     max(const _Tp& __a, const _Tp& __b, _Compare __comp)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algobase.h:303:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   deduced conflicting types for parameter ‘const _Tp’ (‘long unsigned int’ and ‘int’)\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:5795:5: note: candidate: ‘template<class _Tp> constexpr _Tp std::max(initializer_list<_Tp>)’\n 5795 |     max(initializer_list<_Tp> __l)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algo.h:5795:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   mismatched types ‘std::initializer_list<_Tp>’ and ‘long unsigned int’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/bits/stl_algo.h:5805:5: note: candidate: ‘template<class _Tp, class _Compare> constexpr _Tp std::max(initializer_list<_Tp>, _Compare)’\n 5805 |     max(initializer_list<_Tp> __l, _Compare __comp)\n      |     ^~~\n/usr/include/c++/13/bits/stl_algo.h:5805:5: note:   template argument deduction/substitution failed:\nboss_spot.cpp:10:32: note:   mismatched types ‘std::initializer_list<_Tp>’ and ‘long unsigned int’\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ~~~~~~~~^~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "boss_spot.cpp:10:24: error: no matching function for call to 'max'\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ^~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/algorithmfwd.h:407:5: note: candidate template ignored: deduced conflicting types for parameter '_Tp' ('size_type' (aka 'unsigned long') vs. 'int')\n  407 |     max(const _Tp&, const _Tp&);\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:5805:5: note: candidate template ignored: could not match 'initializer_list<_Tp>' against 'size_type' (aka 'unsigned long')\n 5805 |     max(initializer_list<_Tp> __l, _Compare __comp)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:5795:5: note: candidate function template not viable: requires single argument '__l', but 2 arguments were provided\n 5795 |     max(initializer_list<_Tp> __l)\n      |     ^   ~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/algorithmfwd.h:412:5: note: candidate function template not viable: requires 3 arguments, but 2 were provided\n  412 |     max(const _Tp&, const _Tp&, _Compare);\n      |     ^   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_spot.cpp -o boss_spot",
      "out": "",
      "err": "boss_spot.cpp:10:24: error: no matching function for call to 'max'\n   10 |     std::size_t room = std::max(bolts.size(), 10);\n      |                        ^~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/algorithmfwd.h:407:5: note: candidate template ignored: deduced conflicting types for parameter '_Tp' ('size_type' (aka 'unsigned long') vs. 'int')\n  407 |     max(const _Tp&, const _Tp&);\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:5805:5: note: candidate template ignored: could not match 'initializer_list<_Tp>' against 'size_type' (aka 'unsigned long')\n 5805 |     max(initializer_list<_Tp> __l, _Compare __comp)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:5795:5: note: candidate function template not viable: requires single argument '__l', but 2 arguments were provided\n 5795 |     max(initializer_list<_Tp> __l)\n      |     ^   ~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/algorithmfwd.h:412:5: note: candidate function template not viable: requires 3 arguments, but 2 were provided\n  412 |     max(const _Tp&, const _Tp&, _Compare);\n      |     ^   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nclass Tally {\npublic:\n    void add(T x) { total_ += x; }\n    T total() const { return total_; }\nprivate:\n    T total_{};\n};\n\nint main() {\n    Tally<int> whole;\n    Tally<double> exact;\n    for (int step : {5, 2, 7}) {\n        whole.add(step / 2);\n        exact.add(step / 2.0);\n        std::cout << step << ' ' << whole.total() << ' ' << exact.total() << '\\n';\n    }\n}\n",
   "stdout": "5 2 2.5\n2 3 3.5\n7 6 7\n",
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
     "out": "5 2 2.5\n2 3 3.5\n7 6 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 2 2.5\n2 3 3.5\n7 6 7\n",
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
      "out": "5 2 2.5\n2 3 3.5\n7 6 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "box_plain.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nclass Box {\npublic:\n    explicit Box(T item) : item_{item} {}\n    void replace(T item);\n    T peek() const { return item_; }\nprivate:\n    T item_;\n};\n\ntemplate <typename T>\nvoid Box::replace(T item) {\n    item_ = item;\n}\n\nint main() {\n    Box<std::string> b{\"bolt\"};\n    b.replace(\"nut\");\n    std::cout << b.peek() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "box_plain.cpp:15:6: error: ‘template<class T> class Box’ used without template arguments\n   15 | void Box::replace(T item) {\n      |      ^~~\nbox_plain.cpp: In function ‘void replace(T)’:\nbox_plain.cpp:16:5: error: ‘item_’ was not declared in this scope; did you mean ‘item’?\n   16 |     item_ = item;\n      |     ^~~~~\n      |     item\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g box_plain.cpp -o box_plain",
     "out": "",
     "err": "box_plain.cpp:15:6: error: ‘template<class T> class Box’ used without template arguments\n   15 | void Box::replace(T item) {\n      |      ^~~\nbox_plain.cpp: In function ‘void replace(T)’:\nbox_plain.cpp:16:5: error: ‘item_’ was not declared in this scope; did you mean ‘item’?\n   16 |     item_ = item;\n      |     ^~~~~\n      |     item\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "box_plain.cpp:15:6: error: use of class template 'Box' requires template arguments\n   15 | void Box::replace(T item) {\n      |      ^\nbox_plain.cpp:5:7: note: template is declared here\n    4 | template <typename T>\n      | ~~~~~~~~~~~~~~~~~~~~~\n    5 | class Box {\n      |       ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g box_plain.cpp -o box_plain",
      "out": "",
      "err": "box_plain.cpp:15:6: error: use of class template 'Box' requires template arguments\n   15 | void Box::replace(T item) {\n      |      ^\nbox_plain.cpp:5:7: note: template is declared here\n    4 | template <typename T>\n      | ~~~~~~~~~~~~~~~~~~~~~\n    5 | class Box {\n      |       ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "cookies.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\ntemplate <typename T>\nT smaller(T a, T b) {          // a cutter nobody uses\n    return a < b ? a : b;\n}\n\nint main() {\n    std::cout << bigger(3, 7) << '\\n';\n    std::cout << bigger(2.5, 1.5) << '\\n';\n    std::cout << bigger('a', 'z') << '\\n';\n}\n",
   "stdout": "0000000000001284 W char bigger<char>(char, char)\n0000000000001258 W double bigger<double>(double, double)\n0000000000001238 W int bigger<int>(int, int)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g cookies.cpp -o cookies",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./cookies",
     "out": "7\n2.5\nz\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm -C cookies | grep -E 'bigger|smaller'",
     "out": "0000000000001284 W char bigger<char>(char, char)\n0000000000001258 W double bigger<double>(double, double)\n0000000000001238 W int bigger<int>(int, int)\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0000000000001260 W char bigger<char>(char, char)\n0000000000001220 W double bigger<double>(double, double)\n00000000000011f0 W int bigger<int>(int, int)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g cookies.cpp -o cookies",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./cookies",
      "out": "7\n2.5\nz\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm -C cookies | grep -E 'bigger|smaller'",
      "out": "0000000000001260 W char bigger<char>(char, char)\n0000000000001220 W double bigger<double>(double, double)\n00000000000011f0 W int bigger<int>(int, int)\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "copies.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint bigger(int a, int b) {\n    return a > b ? a : b;\n}\n\ndouble bigger(double a, double b) {\n    return a > b ? a : b;\n}\n\nstd::string bigger(std::string a, std::string b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << bigger(3, 7) << '\\n';\n    std::cout << bigger(2.5, 1.5) << '\\n';\n    std::cout << bigger(std::string{\"apple\"}, std::string{\"pear\"}) << '\\n';\n}\n",
   "stdout": "7\n2.5\npear\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g copies.cpp -o copies",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./copies",
     "out": "7\n2.5\npear\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7\n2.5\npear\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g copies.cpp -o copies",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./copies",
      "out": "7\n2.5\npear\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ctad.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <utility>\n#include <vector>\n\ntemplate <typename T>\nclass Pair {\npublic:\n    Pair(T first, T second) : first_{first}, second_{second} {}\n    T bigger() const { return first_ > second_ ? first_ : second_; }\nprivate:\n    T first_;\n    T second_;\n};\n\nint main() {\n    Pair dice{3, 5};                     // Pair<int>\n    Pair cash{2.5, 9.75};                // Pair<double>\n    std::vector marks{8, 6, 9};          // std::vector<int>\n    std::pair label{\"age\", 12};          // std::pair<const char*, int>\n    std::cout << dice.bigger() << ' ' << cash.bigger() << '\\n';\n    std::cout << marks.size() << ' ' << label.first << '=' << label.second << '\\n';\n}\n",
   "stdout": "5 9.75\n3 age=12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ctad.cpp -o ctad",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ctad",
     "out": "5 9.75\n3 age=12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 9.75\n3 age=12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ctad.cpp -o ctad",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ctad",
      "out": "5 9.75\n3 age=12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ctad_bad.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nclass Pair {\npublic:\n    Pair(T first, T second) : first_{first}, second_{second} {}\n    T bigger() const { return first_ > second_ ? first_ : second_; }\nprivate:\n    T first_;\n    T second_;\n};\n\nint main() {\n    Pair mixed{3, 2.5};\n    std::cout << mixed.bigger() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "ctad_bad.cpp: In function ‘int main()’:\nctad_bad.cpp:14:22: error: class template argument deduction failed:\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\nctad_bad.cpp:14:22: error: no matching function for call to ‘Pair(int, double)’\nctad_bad.cpp:6:5: note: candidate: ‘template<class T> Pair(T, T)-> Pair<T>’\n    6 |     Pair(T first, T second) : first_{first}, second_{second} {}\n      |     ^~~~\nctad_bad.cpp:6:5: note:   template argument deduction/substitution failed:\nctad_bad.cpp:14:22: note:   deduced conflicting types for parameter ‘T’ (‘int’ and ‘double’)\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\nctad_bad.cpp:4:7: note: candidate: ‘template<class T> Pair(Pair<T>)-> Pair<T>’\n    4 | class Pair {\n      |       ^~~~\nctad_bad.cpp:4:7: note:   template argument deduction/substitution failed:\nctad_bad.cpp:14:22: note:   mismatched types ‘Pair<T>’ and ‘int’\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ctad_bad.cpp -o ctad_bad",
     "out": "",
     "err": "ctad_bad.cpp: In function ‘int main()’:\nctad_bad.cpp:14:22: error: class template argument deduction failed:\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\nctad_bad.cpp:14:22: error: no matching function for call to ‘Pair(int, double)’\nctad_bad.cpp:6:5: note: candidate: ‘template<class T> Pair(T, T)-> Pair<T>’\n    6 |     Pair(T first, T second) : first_{first}, second_{second} {}\n      |     ^~~~\nctad_bad.cpp:6:5: note:   template argument deduction/substitution failed:\nctad_bad.cpp:14:22: note:   deduced conflicting types for parameter ‘T’ (‘int’ and ‘double’)\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\nctad_bad.cpp:4:7: note: candidate: ‘template<class T> Pair(Pair<T>)-> Pair<T>’\n    4 | class Pair {\n      |       ^~~~\nctad_bad.cpp:4:7: note:   template argument deduction/substitution failed:\nctad_bad.cpp:14:22: note:   mismatched types ‘Pair<T>’ and ‘int’\n   14 |     Pair mixed{3, 2.5};\n      |                      ^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "ctad_bad.cpp:14:10: error: no viable constructor or deduction guide for deduction of template arguments of 'Pair'\n   14 |     Pair mixed{3, 2.5};\n      |          ^\nctad_bad.cpp:6:5: note: candidate template ignored: deduced conflicting types for parameter 'T' ('int' vs. 'double')\n    6 |     Pair(T first, T second) : first_{first}, second_{second} {}\n      |     ^\nctad_bad.cpp:4:7: note: candidate function template not viable: requires 1 argument, but 2 were provided\n    4 | class Pair {\n      |       ^~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ctad_bad.cpp -o ctad_bad",
      "out": "",
      "err": "ctad_bad.cpp:14:10: error: no viable constructor or deduction guide for deduction of template arguments of 'Pair'\n   14 |     Pair mixed{3, 2.5};\n      |          ^\nctad_bad.cpp:6:5: note: candidate template ignored: deduced conflicting types for parameter 'T' ('int' vs. 'double')\n    6 |     Pair(T first, T second) : first_{first}, second_{second} {}\n      |     ^\nctad_bad.cpp:4:7: note: candidate function template not viable: requires 1 argument, but 2 were provided\n    4 | class Pair {\n      |       ^~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "deduce_conflict.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << bigger(3, 4.5) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "deduce_conflict.cpp: In function ‘int main()’:\ndeduce_conflict.cpp:9:24: error: no matching function for call to ‘bigger(int, double)’\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ~~~~~~^~~~~~~~\ndeduce_conflict.cpp:4:3: note: candidate: ‘template<class T> T bigger(T, T)’\n    4 | T bigger(T a, T b) {\n      |   ^~~~~~\ndeduce_conflict.cpp:4:3: note:   template argument deduction/substitution failed:\ndeduce_conflict.cpp:9:24: note:   deduced conflicting types for parameter ‘T’ (‘int’ and ‘double’)\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ~~~~~~^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g deduce_conflict.cpp -o deduce_conflict",
     "out": "",
     "err": "deduce_conflict.cpp: In function ‘int main()’:\ndeduce_conflict.cpp:9:24: error: no matching function for call to ‘bigger(int, double)’\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ~~~~~~^~~~~~~~\ndeduce_conflict.cpp:4:3: note: candidate: ‘template<class T> T bigger(T, T)’\n    4 | T bigger(T a, T b) {\n      |   ^~~~~~\ndeduce_conflict.cpp:4:3: note:   template argument deduction/substitution failed:\ndeduce_conflict.cpp:9:24: note:   deduced conflicting types for parameter ‘T’ (‘int’ and ‘double’)\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ~~~~~~^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "deduce_conflict.cpp:9:18: error: no matching function for call to 'bigger'\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ^~~~~~\ndeduce_conflict.cpp:4:3: note: candidate template ignored: deduced conflicting types for parameter 'T' ('int' vs. 'double')\n    4 | T bigger(T a, T b) {\n      |   ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g deduce_conflict.cpp -o deduce_conflict",
      "out": "",
      "err": "deduce_conflict.cpp:9:18: error: no matching function for call to 'bigger'\n    9 |     std::cout << bigger(3, 4.5) << '\\n';\n      |                  ^~~~~~\ndeduce_conflict.cpp:4:3: note: candidate template ignored: deduced conflicting types for parameter 'T' ('int' vs. 'double')\n    4 | T bigger(T a, T b) {\n      |   ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "deduce_literal.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << \"T is const char*: \"\n              << std::same_as<decltype(bigger(\"fig\", \"date\")), const char*> << '\\n';\n}\n",
   "stdout": "T is const char*: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g deduce_literal.cpp -o deduce_literal",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./deduce_literal",
     "out": "T is const char*: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "T is const char*: true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g deduce_literal.cpp -o deduce_literal",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./deduce_literal",
      "out": "T is const char*: true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "door_ok.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::totally_ordered T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << bigger(3, 7) << '\\n';\n}\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g door_ok.cpp -o door_ok",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./door_ok",
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
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g door_ok.cpp -o door_ok",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./door_ok",
      "out": "7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "explicit_args.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << bigger<double>(3, 4.5) << '\\n';   // T is double: 3 becomes 3.0\n    std::cout << bigger<int>(3, 4.9) << '\\n';      // T is int: 4.9 is chopped to 4\n    std::cout << bigger(3.0, 4.5) << '\\n';         // or make both arguments match\n}\n",
   "stdout": "4.5\n4\n4.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g explicit_args.cpp -o explicit_args",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./explicit_args",
     "out": "4.5\n4\n4.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4.5\n4\n4.5\n",
    "stderr": "explicit_args.cpp:10:33: warning: implicit conversion from 'double' to 'int' changes value from 4.9 to 4 [-Wliteral-conversion]\n   10 |     std::cout << bigger<int>(3, 4.9) << '\\n';      // T is int: 4.9 is chopped to 4\n      |                  ~~~~~~         ^~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g explicit_args.cpp -o explicit_args",
      "out": "",
      "err": "explicit_args.cpp:10:33: warning: implicit conversion from 'double' to 'int' changes value from 4.9 to 4 [-Wliteral-conversion]\n   10 |     std::cout << bigger<int>(3, 4.9) << '\\n';      // T is int: 4.9 is chopped to 4\n      |                  ~~~~~~         ^~~\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./explicit_args",
      "out": "4.5\n4\n4.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_box.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nclass Box {\npublic:\n    explicit Box(T item) : item_{item} {}\n    void replace(T item);\n    T peek() const { return item_; }\nprivate:\n    T item_;\n};\n\ntemplate <typename T>\nvoid Box<T>::replace(T item) {\n    item_ = item;\n}\n\nint main() {\n    Box<std::string> b{\"bolt\"};\n    b.replace(\"nut\");\n    Box<int> n{5};\n    std::cout << b.peek() << ' ' << n.peek() << '\\n';\n}\n",
   "stdout": "nut 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_box.cpp -o fill_box",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_box",
     "out": "nut 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "nut 5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_box.cpp -o fill_box",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_box",
      "out": "nut 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_numeric.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nconcept Numeric = std::integral<T> || std::floating_point<T>;\n\ntemplate <Numeric T>\nT square(T x) {\n    return x * x;\n}\n\nint main() {\n    std::cout << square(4) << ' ' << square(1.5) << '\\n';\n}\n",
   "stdout": "16 2.25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_numeric.cpp -o fill_numeric",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_numeric",
     "out": "16 2.25\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "16 2.25\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_numeric.cpp -o fill_numeric",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_numeric",
      "out": "16 2.25\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_template.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nT smaller(T a, T b) {\n    return a < b ? a : b;\n}\n\nint main() {\n    std::cout << smaller(8, 3) << '\\n';\n    std::cout << smaller(std::string{\"kiwi\"}, std::string{\"fig\"}) << '\\n';\n}\n",
   "stdout": "3\nfig\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_template.cpp -o fill_template",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_template",
     "out": "3\nfig\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3\nfig\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_template.cpp -o fill_template",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_template",
      "out": "3\nfig\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "link_bad.cpp": {
   "src": "// twice.cpp: the recipe, hidden in its own file\n#include \"twice.h\"\n\ntemplate <typename T>\nT twice(T x) {\n    return x + x;\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch26/link_bad/main.cpp:5:(.text+0xe): undefined reference to `int twice<int>(int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp twice.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch26/link_bad"
    },
    {
     "cmd": "g++ main.o twice.o -o app",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch26/link_bad/main.cpp:5:(.text+0xe): undefined reference to `int twice<int>(int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch26/link_bad"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch26/link_bad/main.cpp:5:(.text+0xa): undefined reference to `int twice<int>(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp twice.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch26/link_bad"
     },
     {
      "cmd": "clang++ main.o twice.o -o app",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch26/link_bad/main.cpp:5:(.text+0xa): undefined reference to `int twice<int>(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch26/link_bad"
     }
    ]
   }
  },
  "link_bad/twice.h": {
   "src": "// twice.h: only the promise\n#pragma once\n\ntemplate <typename T>\nT twice(T x);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "link_bad/main.cpp": {
   "src": "#include <iostream>\n#include \"twice.h\"\n\nint main() {\n    std::cout << twice(21) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "link_fixed.cpp": {
   "src": "// twice.h: the whole recipe, in the header\n#pragma once\n\ntemplate <typename T>\nT twice(T x) {\n    return x + x;\n}\n",
   "stdout": "42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp -o app",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch26/link_fixed"
    },
    {
     "cmd": "./app",
     "out": "42\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch26/link_fixed"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "42\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp -o app",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch26/link_fixed"
     },
     {
      "cmd": "./app",
      "out": "42\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch26/link_fixed"
     }
    ]
   }
  },
  "no_greater.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    Point p{1, 2};\n    Point q{3, 4};\n    Point r = bigger(p, q);\n    std::cout << r.x << '\\n';\n}\n",
   "stdout": "",
   "stderr": "no_greater.cpp: In instantiation of ‘T bigger(T, T) [with T = Point]’:\nno_greater.cpp:16:21:   required from here\nno_greater.cpp:5:14: error: no match for ‘operator>’ (operand types are ‘Point’ and ‘Point’)\n    5 |     return a > b ? a : b;\n      |            ~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g no_greater.cpp -o no_greater",
     "out": "",
     "err": "no_greater.cpp: In instantiation of ‘T bigger(T, T) [with T = Point]’:\nno_greater.cpp:16:21:   required from here\nno_greater.cpp:5:14: error: no match for ‘operator>’ (operand types are ‘Point’ and ‘Point’)\n    5 |     return a > b ? a : b;\n      |            ~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "no_greater.cpp:5:14: error: invalid operands to binary expression ('Point' and 'Point')\n    5 |     return a > b ? a : b;\n      |            ~ ^ ~\nno_greater.cpp:16:15: note: in instantiation of function template specialization 'bigger<Point>' requested here\n   16 |     Point r = bigger(p, q);\n      |               ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g no_greater.cpp -o no_greater",
      "out": "",
      "err": "no_greater.cpp:5:14: error: invalid operands to binary expression ('Point' and 'Point')\n    5 |     return a > b ? a : b;\n      |            ~ ^ ~\nno_greater.cpp:16:15: note: in instantiation of function template specialization 'bigger<Point>' requested here\n   16 |     Point r = bigger(p, q);\n      |               ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "no_greater_c.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::totally_ordered T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    Point p{1, 2};\n    Point q{3, 4};\n    Point r = bigger(p, q);\n    std::cout << r.x << '\\n';\n}\n",
   "stdout": "",
   "stderr": "no_greater_c.cpp: In function ‘int main()’:\nno_greater_c.cpp:17:21: error: no matching function for call to ‘bigger(Point&, Point&)’\n   17 |     Point r = bigger(p, q);\n      |               ~~~~~~^~~~~~\nno_greater_c.cpp:5:3: note: candidate: ‘template<class T>  requires  totally_ordered<T> T bigger(T, T)’\n    5 | T bigger(T a, T b) {\n      |   ^~~~~~\nno_greater_c.cpp:5:3: note:   template argument deduction/substitution failed:\nno_greater_c.cpp:5:3: note: constraints not satisfied\nIn file included from no_greater_c.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  totally_ordered<T> T bigger(T, T) [with T = Point]’:\nno_greater_c.cpp:17:21:   required from here\n/usr/include/c++/13/concepts:294:15:   required for the satisfaction of ‘__weakly_eq_cmp_with<_Tp, _Tp>’ [with _Tp = Point]\n/usr/include/c++/13/concepts:304:13:   required for the satisfaction of ‘equality_comparable<_Tp>’ [with _Tp = Point]\n/usr/include/c++/13/concepts:333:13:   required for the satisfaction of ‘totally_ordered<T>’ [with T = Point]\n/usr/include/c++/13/concepts:295:4:   in requirements with ‘std::remove_reference_t<_Tp>& __t’, ‘std::remove_reference_t<_Up>& __u’ [with _Tp = Point; _Up = Point]\n/usr/include/c++/13/concepts:296:17: note: the required expression ‘(__t == __u)’ is invalid\n  296 |           { __t == __u } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:297:17: note: the required expression ‘(__t != __u)’ is invalid\n  297 |           { __t != __u } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:298:17: note: the required expression ‘(__u == __t)’ is invalid\n  298 |           { __u == __t } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:299:17: note: the required expression ‘(__u != __t)’ is invalid\n  299 |           { __u != __t } -> __boolean_testable;\n      |             ~~~~^~~~~~\ncc1plus: note: set ‘-fconcepts-diagnostics-depth=’ to at least 2 for more detail\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g no_greater_c.cpp -o no_greater_c",
     "out": "",
     "err": "no_greater_c.cpp: In function ‘int main()’:\nno_greater_c.cpp:17:21: error: no matching function for call to ‘bigger(Point&, Point&)’\n   17 |     Point r = bigger(p, q);\n      |               ~~~~~~^~~~~~\nno_greater_c.cpp:5:3: note: candidate: ‘template<class T>  requires  totally_ordered<T> T bigger(T, T)’\n    5 | T bigger(T a, T b) {\n      |   ^~~~~~\nno_greater_c.cpp:5:3: note:   template argument deduction/substitution failed:\nno_greater_c.cpp:5:3: note: constraints not satisfied\nIn file included from no_greater_c.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  totally_ordered<T> T bigger(T, T) [with T = Point]’:\nno_greater_c.cpp:17:21:   required from here\n/usr/include/c++/13/concepts:294:15:   required for the satisfaction of ‘__weakly_eq_cmp_with<_Tp, _Tp>’ [with _Tp = Point]\n/usr/include/c++/13/concepts:304:13:   required for the satisfaction of ‘equality_comparable<_Tp>’ [with _Tp = Point]\n/usr/include/c++/13/concepts:333:13:   required for the satisfaction of ‘totally_ordered<T>’ [with T = Point]\n/usr/include/c++/13/concepts:295:4:   in requirements with ‘std::remove_reference_t<_Tp>& __t’, ‘std::remove_reference_t<_Up>& __u’ [with _Tp = Point; _Up = Point]\n/usr/include/c++/13/concepts:296:17: note: the required expression ‘(__t == __u)’ is invalid\n  296 |           { __t == __u } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:297:17: note: the required expression ‘(__t != __u)’ is invalid\n  297 |           { __t != __u } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:298:17: note: the required expression ‘(__u == __t)’ is invalid\n  298 |           { __u == __t } -> __boolean_testable;\n      |             ~~~~^~~~~~\n/usr/include/c++/13/concepts:299:17: note: the required expression ‘(__u != __t)’ is invalid\n  299 |           { __u != __t } -> __boolean_testable;\n      |             ~~~~^~~~~~\ncc1plus: note: set ‘-fconcepts-diagnostics-depth=’ to at least 2 for more detail\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "no_greater_c.cpp:17:15: error: no matching function for call to 'bigger'\n   17 |     Point r = bigger(p, q);\n      |               ^~~~~~\nno_greater_c.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = Point]\n    5 | T bigger(T a, T b) {\n      |   ^\nno_greater_c.cpp:4:11: note: because 'Point' does not satisfy 'totally_ordered'\n    4 | template <std::totally_ordered T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:334:9: note: because 'Point' does not satisfy 'equality_comparable'\n  334 |       = equality_comparable<_Tp>\n      |         ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:304:35: note: because '__detail::__weakly_eq_cmp_with<Point, Point>' evaluated to false\n  304 |     concept equality_comparable = __detail::__weakly_eq_cmp_with<_Tp, _Tp>;\n      |                                   ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:296:10: note: because '__t == __u' would be invalid: invalid operands to binary expression ('const remove_reference_t<Point>' (aka 'const Point') and 'const remove_reference_t<Point>' (aka 'const Point'))\n  296 |           { __t == __u } -> __boolean_testable;\n      |                 ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g no_greater_c.cpp -o no_greater_c",
      "out": "",
      "err": "no_greater_c.cpp:17:15: error: no matching function for call to 'bigger'\n   17 |     Point r = bigger(p, q);\n      |               ^~~~~~\nno_greater_c.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = Point]\n    5 | T bigger(T a, T b) {\n      |   ^\nno_greater_c.cpp:4:11: note: because 'Point' does not satisfy 'totally_ordered'\n    4 | template <std::totally_ordered T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:334:9: note: because 'Point' does not satisfy 'equality_comparable'\n  334 |       = equality_comparable<_Tp>\n      |         ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:304:35: note: because '__detail::__weakly_eq_cmp_with<Point, Point>' evaluated to false\n  304 |     concept equality_comparable = __detail::__weakly_eq_cmp_with<_Tp, _Tp>;\n      |                                   ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:296:10: note: because '__t == __u' would be invalid: invalid operands to binary expression ('const remove_reference_t<Point>' (aka 'const Point') and 'const remove_reference_t<Point>' (aka 'const Point'))\n  296 |           { __t == __u } -> __boolean_testable;\n      |                 ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "non_type.cpp": {
   "src": "#include <array>\n#include <iostream>\n\ntemplate <int N>\nvoid stars() {\n    for (int i = 0; i < N; ++i) {\n        std::cout << '*';\n    }\n    std::cout << '\\n';\n}\n\ntemplate <typename T, std::size_t N>\nT total(const std::array<T, N>& row) {\n    T sum{};\n    for (const T& x : row) {\n        sum += x;\n    }\n    return sum;\n}\n\nint main() {\n    stars<3>();\n    stars<5>();\n    std::array<int, 4> scores{7, 9, 4, 10};\n    std::array<double, 2> prices{1.25, 2.5};\n    std::cout << total(scores) << ' ' << total(prices) << '\\n';\n}\n",
   "stdout": "***\n*****\n30 3.75\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g non_type.cpp -o non_type",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./non_type",
     "out": "***\n*****\n30 3.75\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "***\n*****\n30 3.75\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g non_type.cpp -o non_type",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./non_type",
      "out": "***\n*****\n30 3.75\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "numeric.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n#include <vector>\n\ntemplate <typename T>\nconcept Numeric = std::integral<T> || std::floating_point<T>;\n\ntemplate <Numeric T>\ndouble average(const std::vector<T>& values) {\n    T sum{};\n    for (const T& v : values) {\n        sum += v;\n    }\n    return static_cast<double>(sum) / values.size();\n}\n\nint main() {\n    std::vector<int> goals{2, 0, 3, 1};\n    std::vector<double> times{9.5, 10.25};\n    std::cout << average(goals) << ' ' << average(times) << '\\n';\n    std::cout << std::boolalpha << Numeric<char> << ' ' << Numeric<bool> << '\\n';\n}\n",
   "stdout": "1.5 9.875\ntrue true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g numeric.cpp -o numeric",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./numeric",
     "out": "1.5 9.875\ntrue true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1.5 9.875\ntrue true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g numeric.cpp -o numeric",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./numeric",
      "out": "1.5 9.875\ntrue true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "over_constrained.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\n    requires std::integral<T> && std::floating_point<T>\nT half(T x) {\n    return x / 2;\n}\n\nint main() {\n    std::cout << half(9) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "over_constrained.cpp: In function ‘int main()’:\nover_constrained.cpp:11:22: error: no matching function for call to ‘half(int)’\n   11 |     std::cout << half(9) << '\\n';\n      |                  ~~~~^~~\nover_constrained.cpp:6:3: note: candidate: ‘template<class T>  requires (integral<T>) && (floating_point<T>) T half(T)’\n    6 | T half(T x) {\n      |   ^~~~\nover_constrained.cpp:6:3: note:   template argument deduction/substitution failed:\nover_constrained.cpp:6:3: note: constraints not satisfied\nIn file included from over_constrained.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires (integral<T>) && (floating_point<T>) T half(T) [with T = int]’:\nover_constrained.cpp:11:22:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g over_constrained.cpp -o over_constrained",
     "out": "",
     "err": "over_constrained.cpp: In function ‘int main()’:\nover_constrained.cpp:11:22: error: no matching function for call to ‘half(int)’\n   11 |     std::cout << half(9) << '\\n';\n      |                  ~~~~^~~\nover_constrained.cpp:6:3: note: candidate: ‘template<class T>  requires (integral<T>) && (floating_point<T>) T half(T)’\n    6 | T half(T x) {\n      |   ^~~~\nover_constrained.cpp:6:3: note:   template argument deduction/substitution failed:\nover_constrained.cpp:6:3: note: constraints not satisfied\nIn file included from over_constrained.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires (integral<T>) && (floating_point<T>) T half(T) [with T = int]’:\nover_constrained.cpp:11:22:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "over_constrained.cpp:11:18: error: no matching function for call to 'half'\n   11 |     std::cout << half(9) << '\\n';\n      |                  ^~~~\nover_constrained.cpp:6:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    6 | T half(T x) {\n      |   ^\nover_constrained.cpp:5:34: note: because 'int' does not satisfy 'floating_point'\n    5 |     requires std::integral<T> && std::floating_point<T>\n      |                                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g over_constrained.cpp -o over_constrained",
      "out": "",
      "err": "over_constrained.cpp:11:18: error: no matching function for call to 'half'\n   11 |     std::cout << half(9) << '\\n';\n      |                  ^~~~\nover_constrained.cpp:6:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    6 | T half(T x) {\n      |   ^\nover_constrained.cpp:5:34: note: because 'int' does not satisfy 'floating_point'\n    5 |     requires std::integral<T> && std::floating_point<T>\n      |                                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "overload_concepts.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\nvoid describe(auto) {\n    std::cout << \"something else\\n\";\n}\n\nvoid describe(std::integral auto) {\n    std::cout << \"a whole number\\n\";\n}\n\nvoid describe(std::signed_integral auto) {\n    std::cout << \"a whole number that can be negative\\n\";\n}\n\nvoid describe(std::floating_point auto) {\n    std::cout << \"a number with a fraction\\n\";\n}\n\nint main() {\n    describe(-3);\n    describe(3u);\n    describe(2.5);\n    describe(\"hi\");\n}\n",
   "stdout": "a whole number that can be negative\na whole number\na number with a fraction\nsomething else\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g overload_concepts.cpp -o overload_concepts",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./overload_concepts",
     "out": "a whole number that can be negative\na whole number\na number with a fraction\nsomething else\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a whole number that can be negative\na whole number\na number with a fraction\nsomething else\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g overload_concepts.cpp -o overload_concepts",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./overload_concepts",
      "out": "a whole number that can be negative\na whole number\na number with a fraction\nsomething else\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "pair_box.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nclass Pair {\npublic:\n    Pair(T first, T second) : first_{first}, second_{second} {}\n    T bigger() const { return first_ > second_ ? first_ : second_; }\n    void swap_sides();\n    void print() const { std::cout << first_ << \" | \" << second_ << '\\n'; }\nprivate:\n    T first_;\n    T second_;\n};\n\ntemplate <typename T>\nvoid Pair<T>::swap_sides() {\n    T old = first_;\n    first_ = second_;\n    second_ = old;\n}\n\nint main() {\n    Pair<int> dice{3, 5};\n    Pair<std::string> words{\"fig\", \"date\"};\n    dice.swap_sides();\n    dice.print();\n    words.print();\n    std::cout << dice.bigger() << ' ' << words.bigger() << '\\n';\n}\n",
   "stdout": "5 | 3\nfig | date\n5 fig\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pair_box.cpp -o pair_box",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pair_box",
     "out": "5 | 3\nfig | date\n5 fig\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 | 3\nfig | date\n5 fig\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pair_box.cpp -o pair_box",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pair_box",
      "out": "5 | 3\nfig | date\n5 fig\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_concept.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nconcept Halvable = requires(T x) {\n    x / 2;\n};\n\ntemplate <Halvable T>\nT half(T x) {\n    return x / 2;\n}\n\nint main() {\n    std::cout << half(9) << ' ' << half(9.0) << '\\n';\n}\n",
   "stdout": "4 4.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_concept.cpp -o parsons_concept",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_concept",
     "out": "4 4.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4 4.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_concept.cpp -o parsons_concept",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_concept",
      "out": "4 4.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_label.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nstruct Labelled {\n    std::string label;\n    T value;\n};\n\nint main() {\n    Labelled<double> price{\"tea\", 2.5};\n    Labelled<int> stock{price.label, 40};\n    std::cout << stock.label << \": \" << price.value << \" x \" << stock.value << '\\n';\n}\n",
   "stdout": "tea: 2.5 x 40\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_label.cpp -o parsons_label",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_label",
     "out": "tea: 2.5 x 40\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "tea: 2.5 x 40\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_label.cpp -o parsons_label",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_label",
      "out": "tea: 2.5 x 40\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_concept.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n#include <string>\n\nvoid label(std::integral auto x) { std::cout << x << \" whole\\n\"; }\nvoid label(std::floating_point auto x) { std::cout << x << \" fraction\\n\"; }\nvoid label(auto x) { std::cout << x << \" other\\n\"; }\n\nint main() {\n    label(7);\n    label(7.5f);\n    label('7');\n    label(true);\n    label(std::string{\"7\"});\n}\n",
   "stdout": "7 whole\n7.5 fraction\n7 whole\n1 whole\n7 other\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_concept.cpp -o predict_concept",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_concept",
     "out": "7 whole\n7.5 fraction\n7 whole\n1 whole\n7 other\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7 whole\n7.5 fraction\n7 whole\n1 whole\n7 other\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_concept.cpp -o predict_concept",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_concept",
      "out": "7 whole\n7.5 fraction\n7 whole\n1 whole\n7 other\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_concept_err.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::floating_point T>\nT half(T x) {\n    return x / 2;\n}\n\nint main() {\n    std::cout << half(9.0) << '\\n';\n    std::cout << half(9) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "predict_concept_err.cpp: In function ‘int main()’:\npredict_concept_err.cpp:11:22: error: no matching function for call to ‘half(int)’\n   11 |     std::cout << half(9) << '\\n';\n      |                  ~~~~^~~\npredict_concept_err.cpp:5:3: note: candidate: ‘template<class T>  requires  floating_point<T> T half(T)’\n    5 | T half(T x) {\n      |   ^~~~\npredict_concept_err.cpp:5:3: note:   template argument deduction/substitution failed:\npredict_concept_err.cpp:5:3: note: constraints not satisfied\nIn file included from predict_concept_err.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  floating_point<T> T half(T) [with T = int]’:\npredict_concept_err.cpp:11:22:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_concept_err.cpp -o predict_concept_err",
     "out": "",
     "err": "predict_concept_err.cpp: In function ‘int main()’:\npredict_concept_err.cpp:11:22: error: no matching function for call to ‘half(int)’\n   11 |     std::cout << half(9) << '\\n';\n      |                  ~~~~^~~\npredict_concept_err.cpp:5:3: note: candidate: ‘template<class T>  requires  floating_point<T> T half(T)’\n    5 | T half(T x) {\n      |   ^~~~\npredict_concept_err.cpp:5:3: note:   template argument deduction/substitution failed:\npredict_concept_err.cpp:5:3: note: constraints not satisfied\nIn file included from predict_concept_err.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  floating_point<T> T half(T) [with T = int]’:\npredict_concept_err.cpp:11:22:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "predict_concept_err.cpp:11:18: error: no matching function for call to 'half'\n   11 |     std::cout << half(9) << '\\n';\n      |                  ^~~~\npredict_concept_err.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    5 | T half(T x) {\n      |   ^\npredict_concept_err.cpp:4:11: note: because 'int' does not satisfy 'floating_point'\n    4 | template <std::floating_point T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_concept_err.cpp -o predict_concept_err",
      "out": "",
      "err": "predict_concept_err.cpp:11:18: error: no matching function for call to 'half'\n   11 |     std::cout << half(9) << '\\n';\n      |                  ^~~~\npredict_concept_err.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    5 | T half(T x) {\n      |   ^\npredict_concept_err.cpp:4:11: note: because 'int' does not satisfy 'floating_point'\n    4 | template <std::floating_point T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_special.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nstd::string kind(T) { return \"thing\"; }\n\ntemplate <>\nstd::string kind<int>(int) { return \"int\"; }\n\ntemplate <>\nstd::string kind<char>(char) { return \"char\"; }\n\nint main() {\n    std::cout << kind(1) << ' ' << kind('1') << ' ' << kind(1.0) << ' ' << kind(1L) << '\\n';\n}\n",
   "stdout": "int char thing thing\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_special.cpp -o predict_special",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_special",
     "out": "int char thing thing\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "int char thing thing\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_special.cpp -o predict_special",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_special",
      "out": "int char thing thing\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_static.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nint stamp() {\n    static int count = 0;\n    ++count;\n    return count;\n}\n\nint main() {\n    std::cout << stamp<int>() << ' ';\n    std::cout << stamp<int>() << ' ';\n    std::cout << stamp<double>() << ' ';\n    std::cout << stamp<int>() << ' ';\n    std::cout << stamp<char>() << '\\n';\n}\n",
   "stdout": "1 2 1 3 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_static.cpp -o predict_static",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_static",
     "out": "1 2 1 3 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 2 1 3 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_static.cpp -o predict_static",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_static",
      "out": "1 2 1 3 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_wins.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nvoid show(T x) {\n    std::cout << \"template \" << x << '\\n';\n}\n\nvoid show(double x) {\n    std::cout << \"plain \" << x << '\\n';\n}\n\nint main() {\n    show(2.5);\n    show(2);\n    show<>(2.5);\n    show('x');\n}\n",
   "stdout": "plain 2.5\ntemplate 2\ntemplate 2.5\ntemplate x\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_wins.cpp -o predict_wins",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_wins",
     "out": "plain 2.5\ntemplate 2\ntemplate 2.5\ntemplate x\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "plain 2.5\ntemplate 2\ntemplate 2.5\ntemplate x\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_wins.cpp -o predict_wins",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_wins",
      "out": "plain 2.5\ntemplate 2\ntemplate 2.5\ntemplate x\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "printable.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\ntemplate <typename T>\nconcept Printable = requires(std::ostream& os, const T& x) {\n    os << x;\n};\n\ntemplate <Printable T>\nvoid print_all(const std::vector<T>& items) {\n    for (const T& item : items) {\n        std::cout << item << ' ';\n    }\n    std::cout << '\\n';\n}\n\nstruct Badge {\n    int number;\n};\n\nint main() {\n    print_all(std::vector<int>{3, 1, 4});\n    print_all(std::vector<std::string>{\"tin\", \"foil\"});\n    std::cout << std::boolalpha << Printable<Badge> << '\\n';\n}\n",
   "stdout": "3 1 4 \ntin foil \nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g printable.cpp -o printable",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./printable",
     "out": "3 1 4 \ntin foil \nfalse\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 1 4 \ntin foil \nfalse\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g printable.cpp -o printable",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./printable",
      "out": "3 1 4 \ntin foil \nfalse\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "printable_bad.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\ntemplate <typename T>\nconcept Printable = requires(std::ostream& os, const T& x) {\n    os << x;\n};\n\ntemplate <Printable T>\nvoid print_all(const std::vector<T>& items) {\n    for (const T& item : items) {\n        std::cout << item << ' ';\n    }\n    std::cout << '\\n';\n}\n\nstruct Badge {\n    int number;\n};\n\nint main() {\n    std::vector<Badge> badges{{7}, {12}};\n    print_all(badges);\n}\n",
   "stdout": "",
   "stderr": "printable_bad.cpp: In function ‘int main()’:\nprintable_bad.cpp:23:14: error: no matching function for call to ‘print_all(std::vector<Badge>&)’\n   23 |     print_all(badges);\n      |     ~~~~~~~~~^~~~~~~~\nprintable_bad.cpp:10:6: note: candidate: ‘template<class T>  requires  Printable<T> void print_all(const std::vector<T>&)’\n   10 | void print_all(const std::vector<T>& items) {\n      |      ^~~~~~~~~\nprintable_bad.cpp:10:6: note:   template argument deduction/substitution failed:\nprintable_bad.cpp:10:6: note: constraints not satisfied\nprintable_bad.cpp: In substitution of ‘template<class T>  requires  Printable<T> void print_all(const std::vector<T>&) [with T = Badge]’:\nprintable_bad.cpp:23:14:   required from here\nprintable_bad.cpp:5:9:   required for the satisfaction of ‘Printable<T>’ [with T = Badge]\nprintable_bad.cpp:5:21:   in requirements with ‘std::ostream& os’, ‘const T& x’ [with T = Badge]\nprintable_bad.cpp:6:8: note: the required expression ‘(os << x)’ is invalid\n    6 |     os << x;\n      |     ~~~^~~~\ncc1plus: note: set ‘-fconcepts-diagnostics-depth=’ to at least 2 for more detail\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g printable_bad.cpp -o printable_bad",
     "out": "",
     "err": "printable_bad.cpp: In function ‘int main()’:\nprintable_bad.cpp:23:14: error: no matching function for call to ‘print_all(std::vector<Badge>&)’\n   23 |     print_all(badges);\n      |     ~~~~~~~~~^~~~~~~~\nprintable_bad.cpp:10:6: note: candidate: ‘template<class T>  requires  Printable<T> void print_all(const std::vector<T>&)’\n   10 | void print_all(const std::vector<T>& items) {\n      |      ^~~~~~~~~\nprintable_bad.cpp:10:6: note:   template argument deduction/substitution failed:\nprintable_bad.cpp:10:6: note: constraints not satisfied\nprintable_bad.cpp: In substitution of ‘template<class T>  requires  Printable<T> void print_all(const std::vector<T>&) [with T = Badge]’:\nprintable_bad.cpp:23:14:   required from here\nprintable_bad.cpp:5:9:   required for the satisfaction of ‘Printable<T>’ [with T = Badge]\nprintable_bad.cpp:5:21:   in requirements with ‘std::ostream& os’, ‘const T& x’ [with T = Badge]\nprintable_bad.cpp:6:8: note: the required expression ‘(os << x)’ is invalid\n    6 |     os << x;\n      |     ~~~^~~~\ncc1plus: note: set ‘-fconcepts-diagnostics-depth=’ to at least 2 for more detail\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "printable_bad.cpp:23:5: error: no matching function for call to 'print_all'\n   23 |     print_all(badges);\n      |     ^~~~~~~~~\nprintable_bad.cpp:10:6: note: candidate template ignored: constraints not satisfied [with T = Badge]\n   10 | void print_all(const std::vector<T>& items) {\n      |      ^\nprintable_bad.cpp:9:11: note: because 'Badge' does not satisfy 'Printable'\n    9 | template <Printable T>\n      |           ^\nprintable_bad.cpp:6:8: note: because 'os << x' would be invalid: invalid operands to binary expression ('std::ostream' (aka 'basic_ostream<char>') and 'const Badge')\n    6 |     os << x;\n      |        ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g printable_bad.cpp -o printable_bad",
      "out": "",
      "err": "printable_bad.cpp:23:5: error: no matching function for call to 'print_all'\n   23 |     print_all(badges);\n      |     ^~~~~~~~~\nprintable_bad.cpp:10:6: note: candidate template ignored: constraints not satisfied [with T = Badge]\n   10 | void print_all(const std::vector<T>& items) {\n      |      ^\nprintable_bad.cpp:9:11: note: because 'Badge' does not satisfy 'Printable'\n    9 | template <Printable T>\n      |           ^\nprintable_bad.cpp:6:8: note: because 'os << x' would be invalid: invalid operands to binary expression ('std::ostream' (aka 'basic_ostream<char>') and 'const Badge')\n    6 |     os << x;\n      |        ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "special.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename T>\nvoid show(T x) {\n    std::cout << \"[\" << x << \"]\\n\";\n}\n\ntemplate <>\nvoid show<bool>(bool x) {\n    std::cout << (x ? \"[yes]\" : \"[no]\") << '\\n';\n}\n\nint main() {\n    show(42);\n    show(std::string{\"tea\"});\n    show(true);\n    show(3 > 5);\n}\n",
   "stdout": "[42]\n[tea]\n[yes]\n[no]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g special.cpp -o special",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./special",
     "out": "[42]\n[tea]\n[yes]\n[no]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "[42]\n[tea]\n[yes]\n[no]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g special.cpp -o special",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./special",
      "out": "[42]\n[tea]\n[yes]\n[no]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_concept.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nconcept Numeric = std::integral<T> && std::floating_point<T>;\n\ntemplate <Numeric T>\nT triple(T x) {\n    return x * 3;\n}\n\nint main() {\n    std::cout << triple(4) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_concept.cpp: In function ‘int main()’:\nspot_concept.cpp:13:24: error: no matching function for call to ‘triple(int)’\n   13 |     std::cout << triple(4) << '\\n';\n      |                  ~~~~~~^~~\nspot_concept.cpp:8:3: note: candidate: ‘template<class T>  requires  Numeric<T> T triple(T)’\n    8 | T triple(T x) {\n      |   ^~~~~~\nspot_concept.cpp:8:3: note:   template argument deduction/substitution failed:\nspot_concept.cpp:8:3: note: constraints not satisfied\nIn file included from spot_concept.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  Numeric<T> T triple(T) [with T = int]’:\nspot_concept.cpp:13:24:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\nspot_concept.cpp:5:9:   required for the satisfaction of ‘Numeric<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_concept.cpp -o spot_concept",
     "out": "",
     "err": "spot_concept.cpp: In function ‘int main()’:\nspot_concept.cpp:13:24: error: no matching function for call to ‘triple(int)’\n   13 |     std::cout << triple(4) << '\\n';\n      |                  ~~~~~~^~~\nspot_concept.cpp:8:3: note: candidate: ‘template<class T>  requires  Numeric<T> T triple(T)’\n    8 | T triple(T x) {\n      |   ^~~~~~\nspot_concept.cpp:8:3: note:   template argument deduction/substitution failed:\nspot_concept.cpp:8:3: note: constraints not satisfied\nIn file included from spot_concept.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  Numeric<T> T triple(T) [with T = int]’:\nspot_concept.cpp:13:24:   required from here\n/usr/include/c++/13/concepts:109:13:   required for the satisfaction of ‘floating_point<T>’ [with T = int]\nspot_concept.cpp:5:9:   required for the satisfaction of ‘Numeric<T>’ [with T = int]\n/usr/include/c++/13/concepts:109:30: note: the expression ‘is_floating_point_v<_Tp> [with _Tp = int]’ evaluated to ‘false’\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^~~~~~~~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_concept.cpp:13:18: error: no matching function for call to 'triple'\n   13 |     std::cout << triple(4) << '\\n';\n      |                  ^~~~~~\nspot_concept.cpp:8:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    8 | T triple(T x) {\n      |   ^\nspot_concept.cpp:7:11: note: because 'int' does not satisfy 'Numeric'\n    7 | template <Numeric T>\n      |           ^\nspot_concept.cpp:5:39: note: because 'int' does not satisfy 'floating_point'\n    5 | concept Numeric = std::integral<T> && std::floating_point<T>;\n      |                                       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_concept.cpp -o spot_concept",
      "out": "",
      "err": "spot_concept.cpp:13:18: error: no matching function for call to 'triple'\n   13 |     std::cout << triple(4) << '\\n';\n      |                  ^~~~~~\nspot_concept.cpp:8:3: note: candidate template ignored: constraints not satisfied [with T = int]\n    8 | T triple(T x) {\n      |   ^\nspot_concept.cpp:7:11: note: because 'int' does not satisfy 'Numeric'\n    7 | template <Numeric T>\n      |           ^\nspot_concept.cpp:5:39: note: because 'int' does not satisfy 'floating_point'\n    5 | concept Numeric = std::integral<T> && std::floating_point<T>;\n      |                                       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:109:30: note: because 'is_floating_point_v<int>' evaluated to false\n  109 |     concept floating_point = is_floating_point_v<_Tp>;\n      |                              ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_deduce.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nT clamp_to(T value, T low, T high) {\n    if (value < low) return low;\n    if (value > high) return high;\n    return value;\n}\n\nint main() {\n    double oven = 262.5;\n    std::cout << clamp_to(oven, 0.0, 250.0) << '\\n';\n    std::cout << clamp_to(oven, 0, 250) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_deduce.cpp: In function ‘int main()’:\nspot_deduce.cpp:13:26: error: no matching function for call to ‘clamp_to(double&, int, int)’\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ~~~~~~~~^~~~~~~~~~~~~~\nspot_deduce.cpp:4:3: note: candidate: ‘template<class T> T clamp_to(T, T, T)’\n    4 | T clamp_to(T value, T low, T high) {\n      |   ^~~~~~~~\nspot_deduce.cpp:4:3: note:   template argument deduction/substitution failed:\nspot_deduce.cpp:13:26: note:   deduced conflicting types for parameter ‘T’ (‘double’ and ‘int’)\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ~~~~~~~~^~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_deduce.cpp -o spot_deduce",
     "out": "",
     "err": "spot_deduce.cpp: In function ‘int main()’:\nspot_deduce.cpp:13:26: error: no matching function for call to ‘clamp_to(double&, int, int)’\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ~~~~~~~~^~~~~~~~~~~~~~\nspot_deduce.cpp:4:3: note: candidate: ‘template<class T> T clamp_to(T, T, T)’\n    4 | T clamp_to(T value, T low, T high) {\n      |   ^~~~~~~~\nspot_deduce.cpp:4:3: note:   template argument deduction/substitution failed:\nspot_deduce.cpp:13:26: note:   deduced conflicting types for parameter ‘T’ (‘double’ and ‘int’)\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ~~~~~~~~^~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_deduce.cpp:13:18: error: no matching function for call to 'clamp_to'\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ^~~~~~~~\nspot_deduce.cpp:4:3: note: candidate template ignored: deduced conflicting types for parameter 'T' ('double' vs. 'int')\n    4 | T clamp_to(T value, T low, T high) {\n      |   ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_deduce.cpp -o spot_deduce",
      "out": "",
      "err": "spot_deduce.cpp:13:18: error: no matching function for call to 'clamp_to'\n   13 |     std::cout << clamp_to(oven, 0, 250) << '\\n';\n      |                  ^~~~~~~~\nspot_deduce.cpp:4:3: note: candidate template ignored: deduced conflicting types for parameter 'T' ('double' vs. 'int')\n    4 | T clamp_to(T value, T low, T high) {\n      |   ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_typename.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\ntemplate <typename Map>\nvoid report(const Map& m) {\n    Map::size_type n = m.size();\n    std::cout << n << \" entries\\n\";\n}\n\nint main() {\n    std::map<std::string, int> stock{{\"nuts\", 40}, {\"bolts\", 25}};\n    report(stock);\n}\n",
   "stdout": "",
   "stderr": "spot_typename.cpp: In function ‘void report(const Map&)’:\nspot_typename.cpp:7:5: error: need ‘typename’ before ‘Map::size_type’ because ‘Map’ is a dependent scope\n    7 |     Map::size_type n = m.size();\n      |     ^~~\nspot_typename.cpp:7:19: error: expected ‘;’ before ‘n’\n    7 |     Map::size_type n = m.size();\n      |                   ^~\n      |                   ;\nspot_typename.cpp:8:18: error: ‘n’ was not declared in this scope\n    8 |     std::cout << n << \" entries\\n\";\n      |                  ^\nspot_typename.cpp: In instantiation of ‘void report(const Map&) [with Map = std::map<std::__cxx11::basic_string<char>, int>]’:\nspot_typename.cpp:13:11:   required from here\nspot_typename.cpp:7:10: error: dependent-name ‘Map::size_type’ is parsed as a non-type, but instantiation yields a type\n    7 |     Map::size_type n = m.size();\n      |          ^~~~~~~~~\nspot_typename.cpp:7:10: note: say ‘typename Map::size_type’ if a type is meant\nspot_typename.cpp:6:24: warning: unused parameter ‘m’ [-Wunused-parameter]\n    6 | void report(const Map& m) {\n      |             ~~~~~~~~~~~^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_typename.cpp -o spot_typename",
     "out": "",
     "err": "spot_typename.cpp: In function ‘void report(const Map&)’:\nspot_typename.cpp:7:5: error: need ‘typename’ before ‘Map::size_type’ because ‘Map’ is a dependent scope\n    7 |     Map::size_type n = m.size();\n      |     ^~~\nspot_typename.cpp:7:19: error: expected ‘;’ before ‘n’\n    7 |     Map::size_type n = m.size();\n      |                   ^~\n      |                   ;\nspot_typename.cpp:8:18: error: ‘n’ was not declared in this scope\n    8 |     std::cout << n << \" entries\\n\";\n      |                  ^\nspot_typename.cpp: In instantiation of ‘void report(const Map&) [with Map = std::map<std::__cxx11::basic_string<char>, int>]’:\nspot_typename.cpp:13:11:   required from here\nspot_typename.cpp:7:10: error: dependent-name ‘Map::size_type’ is parsed as a non-type, but instantiation yields a type\n    7 |     Map::size_type n = m.size();\n      |          ^~~~~~~~~\nspot_typename.cpp:7:10: note: say ‘typename Map::size_type’ if a type is meant\nspot_typename.cpp:6:24: warning: unused parameter ‘m’ [-Wunused-parameter]\n    6 | void report(const Map& m) {\n      |             ~~~~~~~~~~~^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_typename.cpp:7:5: error: missing 'typename' prior to dependent type name 'Map::size_type'\n    7 |     Map::size_type n = m.size();\n      |     ^~~~~~~~~~~~~~\n      |     typename \n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_typename.cpp -o spot_typename",
      "out": "",
      "err": "spot_typename.cpp:7:5: error: missing 'typename' prior to dependent type name 'Map::size_type'\n    7 |     Map::size_type n = m.size();\n      |     ^~~~~~~~~~~~~~\n      |     typename \n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "stars_runtime.cpp": {
   "src": "#include <iostream>\n\ntemplate <int N>\nvoid stars() {\n    for (int i = 0; i < N; ++i) {\n        std::cout << '*';\n    }\n    std::cout << '\\n';\n}\n\nint main() {\n    int n = 0;\n    std::cin >> n;\n    stars<n>();\n}\n",
   "stdout": "",
   "stderr": "stars_runtime.cpp: In function ‘int main()’:\nstars_runtime.cpp:14:13: error: no matching function for call to ‘stars<n>()’\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\nstars_runtime.cpp:4:6: note: candidate: ‘template<int N> void stars()’\n    4 | void stars() {\n      |      ^~~~~\nstars_runtime.cpp:4:6: note:   template argument deduction/substitution failed:\nstars_runtime.cpp:14:13: error: the value of ‘n’ is not usable in a constant expression\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\nstars_runtime.cpp:12:9: note: ‘int n’ is not const\n   12 |     int n = 0;\n      |         ^\nstars_runtime.cpp:14:13: note: in template argument for type ‘int’\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g stars_runtime.cpp -o stars_runtime",
     "out": "",
     "err": "stars_runtime.cpp: In function ‘int main()’:\nstars_runtime.cpp:14:13: error: no matching function for call to ‘stars<n>()’\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\nstars_runtime.cpp:4:6: note: candidate: ‘template<int N> void stars()’\n    4 | void stars() {\n      |      ^~~~~\nstars_runtime.cpp:4:6: note:   template argument deduction/substitution failed:\nstars_runtime.cpp:14:13: error: the value of ‘n’ is not usable in a constant expression\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\nstars_runtime.cpp:12:9: note: ‘int n’ is not const\n   12 |     int n = 0;\n      |         ^\nstars_runtime.cpp:14:13: note: in template argument for type ‘int’\n   14 |     stars<n>();\n      |     ~~~~~~~~^~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "stars_runtime.cpp:14:5: error: no matching function for call to 'stars'\n   14 |     stars<n>();\n      |     ^~~~~~~~\nstars_runtime.cpp:4:6: note: candidate template ignored: invalid explicitly-specified argument for template parameter 'N'\n    4 | void stars() {\n      |      ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g stars_runtime.cpp -o stars_runtime",
      "out": "",
      "err": "stars_runtime.cpp:14:5: error: no matching function for call to 'stars'\n   14 |     stars<n>();\n      |     ^~~~~~~~\nstars_runtime.cpp:4:6: note: candidate template ignored: invalid explicitly-specified argument for template parameter 'N'\n    4 | void stars() {\n      |      ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "static_assert_way.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nT twice(T x) {\n    static_assert(std::integral<T>, \"twice needs a whole number\");\n    return x + x;\n}\n\nint main() {\n    std::cout << twice(2.5) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "static_assert_way.cpp: In instantiation of ‘T twice(T) [with T = double]’:\nstatic_assert_way.cpp:11:23:   required from here\nstatic_assert_way.cpp:6:24: error: static assertion failed: twice needs a whole number\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ~~~~~^~~~~~~~~~~\nstatic_assert_way.cpp:6:24: note: constraints not satisfied\nIn file included from static_assert_way.cpp:1:\n/usr/include/c++/13/concepts:100:13:   required by the constraints of ‘template<class _Tp> concept std::integral’\n/usr/include/c++/13/concepts:100:24: note: the expression ‘is_integral_v<_Tp> [with _Tp = double]’ evaluated to ‘false’\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g static_assert_way.cpp -o static_assert_way",
     "out": "",
     "err": "static_assert_way.cpp: In instantiation of ‘T twice(T) [with T = double]’:\nstatic_assert_way.cpp:11:23:   required from here\nstatic_assert_way.cpp:6:24: error: static assertion failed: twice needs a whole number\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ~~~~~^~~~~~~~~~~\nstatic_assert_way.cpp:6:24: note: constraints not satisfied\nIn file included from static_assert_way.cpp:1:\n/usr/include/c++/13/concepts:100:13:   required by the constraints of ‘template<class _Tp> concept std::integral’\n/usr/include/c++/13/concepts:100:24: note: the expression ‘is_integral_v<_Tp> [with _Tp = double]’ evaluated to ‘false’\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "static_assert_way.cpp:6:19: error: static assertion failed: twice needs a whole number\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ^~~~~~~~~~~~~~~~\nstatic_assert_way.cpp:11:18: note: in instantiation of function template specialization 'twice<double>' requested here\n   11 |     std::cout << twice(2.5) << '\\n';\n      |                  ^\nstatic_assert_way.cpp:6:19: note: because 'double' does not satisfy 'integral'\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:100:24: note: because 'is_integral_v<double>' evaluated to false\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g static_assert_way.cpp -o static_assert_way",
      "out": "",
      "err": "static_assert_way.cpp:6:19: error: static assertion failed: twice needs a whole number\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ^~~~~~~~~~~~~~~~\nstatic_assert_way.cpp:11:18: note: in instantiation of function template specialization 'twice<double>' requested here\n   11 |     std::cout << twice(2.5) << '\\n';\n      |                  ^\nstatic_assert_way.cpp:6:19: note: because 'double' does not satisfy 'integral'\n    6 |     static_assert(std::integral<T>, \"twice needs a whole number\");\n      |                   ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:100:24: note: because 'is_integral_v<double>' evaluated to false\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "std_concepts.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n#include <list>\n#include <ranges>\n#include <string>\n#include <vector>\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << \"integral<int>              \" << std::integral<int> << '\\n';\n    std::cout << \"integral<double>           \" << std::integral<double> << '\\n';\n    std::cout << \"floating_point<double>     \" << std::floating_point<double> << '\\n';\n    std::cout << \"same_as<int, long>         \" << std::same_as<int, long> << '\\n';\n    std::cout << \"totally_ordered<string>    \" << std::totally_ordered<std::string> << '\\n';\n    std::cout << \"ranges::range<vector<int>> \" << std::ranges::range<std::vector<int>> << '\\n';\n    std::cout << \"ranges::random_access_range<list<int>> \"\n              << std::ranges::random_access_range<std::list<int>> << '\\n';\n}\n",
   "stdout": "integral<int>              true\nintegral<double>           false\nfloating_point<double>     true\nsame_as<int, long>         false\ntotally_ordered<string>    true\nranges::range<vector<int>> true\nranges::random_access_range<list<int>> false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g std_concepts.cpp -o std_concepts",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./std_concepts",
     "out": "integral<int>              true\nintegral<double>           false\nfloating_point<double>     true\nsame_as<int, long>         false\ntotally_ordered<string>    true\nranges::range<vector<int>> true\nranges::random_access_range<list<int>> false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "integral<int>              true\nintegral<double>           false\nfloating_point<double>     true\nsame_as<int, long>         false\ntotally_ordered<string>    true\nranges::range<vector<int>> true\nranges::random_access_range<list<int>> false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g std_concepts.cpp -o std_concepts",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./std_concepts",
      "out": "integral<int>              true\nintegral<double>           false\nfloating_point<double>     true\nsame_as<int, long>         false\ntotally_ordered<string>    true\nranges::range<vector<int>> true\nranges::random_access_range<list<int>> false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "three_spellings.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::integral T>\nT twice_a(T x) { return x + x; }\n\ntemplate <typename T>\n    requires std::integral<T>\nT twice_b(T x) { return x + x; }\n\nauto twice_c(std::integral auto x) { return x + x; }\n\nint main() {\n    std::cout << twice_a(5) << ' ' << twice_b(5) << ' ' << twice_c(5) << '\\n';\n}\n",
   "stdout": "10 10 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g three_spellings.cpp -o three_spellings",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./three_spellings",
     "out": "10 10 10\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "10 10 10\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g three_spellings.cpp -o three_spellings",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./three_spellings",
      "out": "10 10 10\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_concepts.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <typename T>\nvoid row(const char* name) {\n    std::cout << name << ' ' << std::integral<T> << ' ' << std::floating_point<T>\n              << ' ' << std::signed_integral<T> << '\\n';\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    row<int>(\"int\");\n    row<unsigned>(\"unsigned\");\n    row<double>(\"double\");\n    row<bool>(\"bool\");\n    row<long>(\"long\");\n}\n",
   "stdout": "int true false true\nunsigned true false false\ndouble false true false\nbool true false false\nlong true false true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_concepts.cpp -o trace_concepts",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_concepts",
     "out": "int true false true\nunsigned true false false\ndouble false true false\nbool true false false\nlong true false true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "int true false true\nunsigned true false false\ndouble false true false\nbool true false false\nlong true false true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_concepts.cpp -o trace_concepts",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_concepts",
      "out": "int true false true\nunsigned true false false\ndouble false true false\nbool true false false\nlong true false true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_shelf.cpp": {
   "src": "#include <array>\n#include <iostream>\n#include <string>\n\ntemplate <typename T, int Capacity>\nclass Shelf {\npublic:\n    bool put(T item) {\n        if (count_ == Capacity) return false;\n        items_[count_] = item;\n        ++count_;\n        return true;\n    }\n    int count() const { return count_; }\nprivate:\n    std::array<T, Capacity> items_{};\n    int count_ = 0;\n};\n\nint main() {\n    Shelf<std::string, 3> shelf;\n    std::cout << std::boolalpha;\n    for (std::string jar : {\"jam\", \"honey\", \"salt\", \"rice\"}) {\n        bool ok = shelf.put(jar);\n        std::cout << jar << ' ' << ok << ' ' << shelf.count() << '\\n';\n    }\n}\n",
   "stdout": "jam true 1\nhoney true 2\nsalt true 3\nrice false 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_shelf.cpp -o trace_shelf",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_shelf",
     "out": "jam true 1\nhoney true 2\nsalt true 3\nrice false 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "jam true 1\nhoney true 2\nsalt true 3\nrice false 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_shelf.cpp -o trace_shelf",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_shelf",
      "out": "jam true 1\nhoney true 2\nsalt true 3\nrice false 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "twice_concept.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::integral T>\nT twice(T x) {\n    return x + x;\n}\n\nint main() {\n    std::cout << twice(21) << '\\n';\n    std::cout << twice(4'000'000'000LL) << '\\n';\n    std::cout << twice(short{7}) << '\\n';\n}\n",
   "stdout": "42\n8000000000\n14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g twice_concept.cpp -o twice_concept",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./twice_concept",
     "out": "42\n8000000000\n14\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "42\n8000000000\n14\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g twice_concept.cpp -o twice_concept",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./twice_concept",
      "out": "42\n8000000000\n14\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "twice_double.cpp": {
   "src": "#include <concepts>\n#include <iostream>\n\ntemplate <std::integral T>\nT twice(T x) {\n    return x + x;\n}\n\nint main() {\n    std::cout << twice(2.5) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "twice_double.cpp: In function ‘int main()’:\ntwice_double.cpp:10:23: error: no matching function for call to ‘twice(double)’\n   10 |     std::cout << twice(2.5) << '\\n';\n      |                  ~~~~~^~~~~\ntwice_double.cpp:5:3: note: candidate: ‘template<class T>  requires  integral<T> T twice(T)’\n    5 | T twice(T x) {\n      |   ^~~~~\ntwice_double.cpp:5:3: note:   template argument deduction/substitution failed:\ntwice_double.cpp:5:3: note: constraints not satisfied\nIn file included from twice_double.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  integral<T> T twice(T) [with T = double]’:\ntwice_double.cpp:10:23:   required from here\n/usr/include/c++/13/concepts:100:13:   required for the satisfaction of ‘integral<T>’ [with T = double]\n/usr/include/c++/13/concepts:100:24: note: the expression ‘is_integral_v<_Tp> [with _Tp = double]’ evaluated to ‘false’\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g twice_double.cpp -o twice_double",
     "out": "",
     "err": "twice_double.cpp: In function ‘int main()’:\ntwice_double.cpp:10:23: error: no matching function for call to ‘twice(double)’\n   10 |     std::cout << twice(2.5) << '\\n';\n      |                  ~~~~~^~~~~\ntwice_double.cpp:5:3: note: candidate: ‘template<class T>  requires  integral<T> T twice(T)’\n    5 | T twice(T x) {\n      |   ^~~~~\ntwice_double.cpp:5:3: note:   template argument deduction/substitution failed:\ntwice_double.cpp:5:3: note: constraints not satisfied\nIn file included from twice_double.cpp:1:\n/usr/include/c++/13/concepts: In substitution of ‘template<class T>  requires  integral<T> T twice(T) [with T = double]’:\ntwice_double.cpp:10:23:   required from here\n/usr/include/c++/13/concepts:100:13:   required for the satisfaction of ‘integral<T>’ [with T = double]\n/usr/include/c++/13/concepts:100:24: note: the expression ‘is_integral_v<_Tp> [with _Tp = double]’ evaluated to ‘false’\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "twice_double.cpp:10:18: error: no matching function for call to 'twice'\n   10 |     std::cout << twice(2.5) << '\\n';\n      |                  ^~~~~\ntwice_double.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = double]\n    5 | T twice(T x) {\n      |   ^\ntwice_double.cpp:4:11: note: because 'double' does not satisfy 'integral'\n    4 | template <std::integral T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:100:24: note: because 'is_integral_v<double>' evaluated to false\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g twice_double.cpp -o twice_double",
      "out": "",
      "err": "twice_double.cpp:10:18: error: no matching function for call to 'twice'\n   10 |     std::cout << twice(2.5) << '\\n';\n      |                  ^~~~~\ntwice_double.cpp:5:3: note: candidate template ignored: constraints not satisfied [with T = double]\n    5 | T twice(T x) {\n      |   ^\ntwice_double.cpp:4:11: note: because 'double' does not satisfy 'integral'\n    4 | template <std::integral T>\n      |           ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:100:24: note: because 'is_integral_v<double>' evaluated to false\n  100 |     concept integral = is_integral_v<_Tp>;\n      |                        ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "two_types.cpp": {
   "src": "#include <iostream>\n#include <string>\n\ntemplate <typename A, typename B>\nauto add(A a, B b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << add(3, 4.5) << '\\n';                    // A = int, B = double\n    std::cout << add(std::string{\"cook\"}, 'y') << '\\n';  // A = std::string, B = char\n    std::cout << add('A', 1) << '\\n';                    // A = char, B = int\n}\n",
   "stdout": "7.5\ncooky\n66\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g two_types.cpp -o two_types",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./two_types",
     "out": "7.5\ncooky\n66\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7.5\ncooky\n66\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g two_types.cpp -o two_types",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./two_types",
      "out": "7.5\ncooky\n66\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "typename_bad.cpp": {
   "src": "#include <iostream>\n#include <list>\n#include <vector>\n\ntemplate <typename C>\nvoid print_first(const C& box) {\n    C::const_iterator it = box.begin();\n    std::cout << *it << '\\n';\n}\n\nint main() {\n    std::vector<int> v{4, 8};\n    std::list<char> l{'q', 'r'};\n    print_first(v);\n    print_first(l);\n}\n",
   "stdout": "",
   "stderr": "typename_bad.cpp: In function ‘void print_first(const C&)’:\ntypename_bad.cpp:7:5: error: need ‘typename’ before ‘C::const_iterator’ because ‘C’ is a dependent scope\n    7 |     C::const_iterator it = box.begin();\n      |     ^\ntypename_bad.cpp:7:22: error: expected ‘;’ before ‘it’\n    7 |     C::const_iterator it = box.begin();\n      |                      ^~~\n      |                      ;\ntypename_bad.cpp:8:19: error: ‘it’ was not declared in this scope; did you mean ‘int’?\n    8 |     std::cout << *it << '\\n';\n      |                   ^~\n      |                   int\ntypename_bad.cpp: In instantiation of ‘void print_first(const C&) [with C = std::vector<int>]’:\ntypename_bad.cpp:14:16:   required from here\ntypename_bad.cpp:7:8: error: dependent-name ‘C::const_iterator’ is parsed as a non-type, but instantiation yields a type\n    7 |     C::const_iterator it = box.begin();\n      |        ^~~~~~~~~~~~~~\ntypename_bad.cpp:7:8: note: say ‘typename C::const_iterator’ if a type is meant\ntypename_bad.cpp:6:27: warning: unused parameter ‘box’ [-Wunused-parameter]\n    6 | void print_first(const C& box) {\n      |                  ~~~~~~~~~^~~\ntypename_bad.cpp: In instantiation of ‘void print_first(const C&) [with C = std::__cxx11::list<char>]’:\ntypename_bad.cpp:15:16:   required from here\ntypename_bad.cpp:7:8: error: dependent-name ‘C::const_iterator’ is parsed as a non-type, but instantiation yields a type\n    7 |     C::const_iterator it = box.begin();\n      |        ^~~~~~~~~~~~~~\ntypename_bad.cpp:7:8: note: say ‘typename C::const_iterator’ if a type is meant\ntypename_bad.cpp:6:27: warning: unused parameter ‘box’ [-Wunused-parameter]\n    6 | void print_first(const C& box) {\n      |                  ~~~~~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g typename_bad.cpp -o typename_bad",
     "out": "",
     "err": "typename_bad.cpp: In function ‘void print_first(const C&)’:\ntypename_bad.cpp:7:5: error: need ‘typename’ before ‘C::const_iterator’ because ‘C’ is a dependent scope\n    7 |     C::const_iterator it = box.begin();\n      |     ^\ntypename_bad.cpp:7:22: error: expected ‘;’ before ‘it’\n    7 |     C::const_iterator it = box.begin();\n      |                      ^~~\n      |                      ;\ntypename_bad.cpp:8:19: error: ‘it’ was not declared in this scope; did you mean ‘int’?\n    8 |     std::cout << *it << '\\n';\n      |                   ^~\n      |                   int\ntypename_bad.cpp: In instantiation of ‘void print_first(const C&) [with C = std::vector<int>]’:\ntypename_bad.cpp:14:16:   required from here\ntypename_bad.cpp:7:8: error: dependent-name ‘C::const_iterator’ is parsed as a non-type, but instantiation yields a type\n    7 |     C::const_iterator it = box.begin();\n      |        ^~~~~~~~~~~~~~\ntypename_bad.cpp:7:8: note: say ‘typename C::const_iterator’ if a type is meant\ntypename_bad.cpp:6:27: warning: unused parameter ‘box’ [-Wunused-parameter]\n    6 | void print_first(const C& box) {\n      |                  ~~~~~~~~~^~~\ntypename_bad.cpp: In instantiation of ‘void print_first(const C&) [with C = std::__cxx11::list<char>]’:\ntypename_bad.cpp:15:16:   required from here\ntypename_bad.cpp:7:8: error: dependent-name ‘C::const_iterator’ is parsed as a non-type, but instantiation yields a type\n    7 |     C::const_iterator it = box.begin();\n      |        ^~~~~~~~~~~~~~\ntypename_bad.cpp:7:8: note: say ‘typename C::const_iterator’ if a type is meant\ntypename_bad.cpp:6:27: warning: unused parameter ‘box’ [-Wunused-parameter]\n    6 | void print_first(const C& box) {\n      |                  ~~~~~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "typename_bad.cpp:7:5: error: missing 'typename' prior to dependent type name 'C::const_iterator'\n    7 |     C::const_iterator it = box.begin();\n      |     ^~~~~~~~~~~~~~~~~\n      |     typename \n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g typename_bad.cpp -o typename_bad",
      "out": "",
      "err": "typename_bad.cpp:7:5: error: missing 'typename' prior to dependent type name 'C::const_iterator'\n    7 |     C::const_iterator it = box.begin();\n      |     ^~~~~~~~~~~~~~~~~\n      |     typename \n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "typename_ok.cpp": {
   "src": "#include <iostream>\n#include <list>\n#include <vector>\n\ntemplate <typename C>\nvoid print_first(const C& box) {\n    typename C::const_iterator it = box.begin();\n    std::cout << *it << '\\n';\n}\n\nint main() {\n    std::vector<int> v{4, 8};\n    std::list<char> l{'q', 'r'};\n    print_first(v);\n    print_first(l);\n}\n",
   "stdout": "4\nq\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g typename_ok.cpp -o typename_ok",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./typename_ok",
     "out": "4\nq\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4\nq\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g typename_ok.cpp -o typename_ok",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./typename_ok",
      "out": "4\nq\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "which_wins.cpp": {
   "src": "#include <iostream>\n\ntemplate <typename T>\nvoid show(T) {\n    std::cout << \"template\\n\";\n}\n\nvoid show(int) {\n    std::cout << \"plain\\n\";\n}\n\nint main() {\n    show(5);       // exact match for the plain function\n    show(5.0);     // the template can make a perfect show(double)\n    show<>(5);     // <> means: templates only, please\n}\n",
   "stdout": "plain\ntemplate\ntemplate\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g which_wins.cpp -o which_wins",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./which_wins",
     "out": "plain\ntemplate\ntemplate\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "plain\ntemplate\ntemplate\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g which_wins.cpp -o which_wins",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./which_wins",
      "out": "plain\ntemplate\ntemplate\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
