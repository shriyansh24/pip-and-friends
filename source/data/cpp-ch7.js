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
  "workdir": "/home/you/cpp-ch7",
  "versionDifferences": [
   "ambiguous.cpp",
   "collision.cpp",
   "default_middle.cpp",
   "loop_var.cpp",
   "mangle.cpp",
   "missing_return.cpp",
   "missing_return_werror.cpp",
   "no_def.cpp",
   "not_declared.cpp",
   "scope_quiz.cpp",
   "shadow.cpp",
   "void_main.cpp",
   "void_value.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): ambiguous.cpp, collision.cpp, default_middle.cpp, loop_var.cpp, mangle.cpp, missing_return.cpp, missing_return_werror.cpp, no_def.cpp, not_declared.cpp, scope_quiz.cpp, shadow.cpp, void_main.cpp, void_value.cpp."
 },
 "programs": {
  "ambiguous.cpp": {
   "src": "#include <iostream>\n\nint biggest(int a, int b) {\n    return a > b ? a : b;\n}\n\ndouble biggest(double a, double b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << biggest(2, 3.5) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "ambiguous.cpp: In function ‘int main()’:\nambiguous.cpp:12:25: error: call of overloaded ‘biggest(int, double)’ is ambiguous\n   12 |     std::cout << biggest(2, 3.5) << '\\n';\n      |                  ~~~~~~~^~~~~~~~\nambiguous.cpp:3:5: note: candidate: ‘int biggest(int, int)’\n    3 | int biggest(int a, int b) {\n      |     ^~~~~~~\nambiguous.cpp:7:8: note: candidate: ‘double biggest(double, double)’\n    7 | double biggest(double a, double b) {\n      |        ^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ambiguous.cpp -o ambiguous",
     "out": "",
     "err": "ambiguous.cpp: In function ‘int main()’:\nambiguous.cpp:12:25: error: call of overloaded ‘biggest(int, double)’ is ambiguous\n   12 |     std::cout << biggest(2, 3.5) << '\\n';\n      |                  ~~~~~~~^~~~~~~~\nambiguous.cpp:3:5: note: candidate: ‘int biggest(int, int)’\n    3 | int biggest(int a, int b) {\n      |     ^~~~~~~\nambiguous.cpp:7:8: note: candidate: ‘double biggest(double, double)’\n    7 | double biggest(double a, double b) {\n      |        ^~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "ambiguous.cpp:12:18: error: call to 'biggest' is ambiguous\n   12 |     std::cout << biggest(2, 3.5) << '\\n';\n      |                  ^~~~~~~\nambiguous.cpp:3:5: note: candidate function\n    3 | int biggest(int a, int b) {\n      |     ^\nambiguous.cpp:7:8: note: candidate function\n    7 | double biggest(double a, double b) {\n      |        ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ambiguous.cpp -o ambiguous",
      "out": "",
      "err": "ambiguous.cpp:12:18: error: call to 'biggest' is ambiguous\n   12 |     std::cout << biggest(2, 3.5) << '\\n';\n      |                  ^~~~~~~\nambiguous.cpp:3:5: note: candidate function\n    3 | int biggest(int a, int b) {\n      |     ^\nambiguous.cpp:7:8: note: candidate function\n    7 | double biggest(double a, double b) {\n      |        ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "banner.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nvoid banner(std::string name) {\n    std::cout << \"**********\\n\";\n    std::cout << \"* Hi \" << name << \" *\\n\";\n    std::cout << \"**********\\n\";\n}\n\nint main() {\n    banner(\"Ada\");\n    banner(\"Bob\");\n    banner(\"Kim\");\n}\n",
   "stdout": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g banner.cpp -o banner",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./banner",
     "out": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g banner.cpp -o banner",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./banner",
      "out": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_calls.cpp": {
   "src": "#include <iostream>\n\nint bump(int n, int step = 1) {\n    n = n + step;\n    return n;\n}\n\nint main() {\n    int a = 5;\n    int b = bump(a);\n    int c = bump(a, 10);\n    bump(a, 100);\n    std::cout << a << ' ' << b << ' ' << c << '\\n';\n}\n",
   "stdout": "5 6 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_calls.cpp -o boss_calls",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_calls",
     "out": "5 6 15\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 6 15\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_calls.cpp -o boss_calls",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_calls",
      "out": "5 6 15\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <iostream>\n\nint visit() {\n    static int visitors = 0;\n    visitors = visitors + 1;\n    return visitors;\n}\n\nint main() {\n    visit();\n    visit();\n    std::cout << \"Visitors: \" << visit() << '\\n';\n}\n",
   "stdout": "Visitors: 3\n",
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
     "out": "Visitors: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Visitors: 3\n",
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
      "out": "Visitors: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\nnamespace bakery {\n    int loaves(int flour_kg) {\n        return flour_kg * 3;\n    }\n}\nint main() {\n    std::cout << bakery::loaves(4) << \" loaves\\n\";\n}\n",
   "stdout": "12 loaves\n",
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
     "out": "12 loaves\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12 loaves\n",
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
      "out": "12 loaves\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <iostream>\n\nvoid print_box(int width, int height) {\n    for (int row = 0; row < height; row++) {\n        for (int col = 0; col < width; col++) {\n            std::cout << '#';\n        }\n        std::cout << '\\n';\n    }\n}\n\nint main() {\n    int width = 5;\n    int height = 2;\n    std::cout << \"A box 5 wide and 2 tall:\\n\";\n    print_box(height, width);\n}\n",
   "stdout": "A box 5 wide and 2 tall:\n##\n##\n##\n##\n##\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_spot.cpp -o boss_spot",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_spot",
     "out": "A box 5 wide and 2 tall:\n##\n##\n##\n##\n##\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "A box 5 wide and 2 tall:\n##\n##\n##\n##\n##\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_spot.cpp -o boss_spot",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_spot",
      "out": "A box 5 wide and 2 tall:\n##\n##\n##\n##\n##\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n\nint step(int n) {\n    if (n % 2 == 0) {\n        return n / 2;\n    }\n    return 3 * n + 1;\n}\n\nint main() {\n    int n = 6;\n    for (int k = 1; k <= 5; k++) {\n        n = step(n);\n        std::cout << k << ' ' << n << '\\n';\n    }\n}\n",
   "stdout": "1 3\n2 10\n3 5\n4 16\n5 8\n",
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
     "out": "1 3\n2 10\n3 5\n4 16\n5 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 3\n2 10\n3 5\n4 16\n5 8\n",
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
      "out": "1 3\n2 10\n3 5\n4 16\n5 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_unused_decl.cpp": {
   "src": "#include <iostream>\n\nvoid launch_rocket();\n\nint main() {\n    std::cout << \"Countdown cancelled\\n\";\n}\n",
   "stdout": "Countdown cancelled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_unused_decl.cpp -o boss_unused_decl",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_unused_decl",
     "out": "Countdown cancelled\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Countdown cancelled\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_unused_decl.cpp -o boss_unused_decl",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_unused_decl",
      "out": "Countdown cancelled\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "by_value.cpp": {
   "src": "#include <iostream>\n\nvoid add_bonus(int score) {\n    score = score + 10;\n    std::cout << \"Inside: \" << score << '\\n';\n}\n\nint main() {\n    int score = 50;\n    add_bonus(score);\n    std::cout << \"Outside: \" << score << '\\n';\n}\n",
   "stdout": "Inside: 60\nOutside: 50\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g by_value.cpp -o by_value",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./by_value",
     "out": "Inside: 60\nOutside: 50\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Inside: 60\nOutside: 50\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g by_value.cpp -o by_value",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./by_value",
      "out": "Inside: 60\nOutside: 50\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "by_value_fixed.cpp": {
   "src": "#include <iostream>\n\nint add_bonus(int score) {\n    return score + 10;\n}\n\nint main() {\n    int score = 50;\n    score = add_bonus(score);\n    std::cout << \"Outside: \" << score << '\\n';\n}\n",
   "stdout": "Outside: 60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g by_value_fixed.cpp -o by_value_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./by_value_fixed",
     "out": "Outside: 60\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Outside: 60\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g by_value_fixed.cpp -o by_value_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./by_value_fixed",
      "out": "Outside: 60\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "by_value_quiz.cpp": {
   "src": "#include <iostream>\n\nvoid double_it(int n) {\n    n = n * 2;\n}\n\nint main() {\n    int coins = 4;\n    double_it(coins);\n    double_it(coins);\n    std::cout << coins << '\\n';\n}\n",
   "stdout": "4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g by_value_quiz.cpp -o by_value_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./by_value_quiz",
     "out": "4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g by_value_quiz.cpp -o by_value_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./by_value_quiz",
      "out": "4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "call_order.cpp": {
   "src": "#include <iostream>\n\nvoid first() {\n    std::cout << \"one\\n\";\n}\n\nvoid second() {\n    std::cout << \"two\\n\";\n    first();\n}\n\nint main() {\n    second();\n    first();\n    std::cout << \"three\\n\";\n}\n",
   "stdout": "two\none\none\nthree\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g call_order.cpp -o call_order",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./call_order",
     "out": "two\none\none\nthree\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "two\none\none\nthree\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g call_order.cpp -o call_order",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./call_order",
      "out": "two\none\none\nthree\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "calls_trace.cpp": {
   "src": "#include <iostream>\n\nint square(int n) {\n    return n * n;\n}\n\nint cube(int n) {\n    return n * square(n);\n}\n\nint main() {\n    for (int i = 1; i <= 4; i++) {\n        std::cout << i << ' ' << square(i) << ' ' << cube(i) << '\\n';\n    }\n}\n",
   "stdout": "1 1 1\n2 4 8\n3 9 27\n4 16 64\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g calls_trace.cpp -o calls_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./calls_trace",
     "out": "1 1 1\n2 4 8\n3 9 27\n4 16 64\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 1\n2 4 8\n3 9 27\n4 16 64\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g calls_trace.cpp -o calls_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./calls_trace",
      "out": "1 1 1\n2 4 8\n3 9 27\n4 16 64\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "collision.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\nusing namespace std;\n\nint count = 5;\n\nint main() {\n    cout << count << '\\n';\n}\n",
   "stdout": "",
   "stderr": "collision.cpp: In function ‘int main()’:\ncollision.cpp:8:13: error: reference to ‘count’ is ambiguous\n    8 |     cout << count << '\\n';\n      |             ^~~~~\nIn file included from /usr/include/c++/13/algorithm:73,\n                 from collision.cpp:1:\n/usr/include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidates are: ‘template<class _ExecutionPolicy, class _ForwardIterator, class _Tp> __pstl::__internal::__enable_if_execution_policy<_ExecutionPolicy, typename std::iterator_traits<_II>::difference_type> std::count(_ExecutionPolicy&&, _ForwardIterator, _ForwardIterator, const _Tp&)’\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:4072:5: note:                 ‘template<class _IIter, class _Tp> constexpr typename std::iterator_traits< <template-parameter-1-1> >::difference_type std::count(_IIter, _IIter, const _Tp&)’\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^~~~~\ncollision.cpp:5:5: note:                 ‘int count’\n    5 | int count = 5;\n      |     ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g collision.cpp -o collision",
     "out": "",
     "err": "collision.cpp: In function ‘int main()’:\ncollision.cpp:8:13: error: reference to ‘count’ is ambiguous\n    8 |     cout << count << '\\n';\n      |             ^~~~~\nIn file included from /usr/include/c++/13/algorithm:73,\n                 from collision.cpp:1:\n/usr/include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidates are: ‘template<class _ExecutionPolicy, class _ForwardIterator, class _Tp> __pstl::__internal::__enable_if_execution_policy<_ExecutionPolicy, typename std::iterator_traits<_II>::difference_type> std::count(_ExecutionPolicy&&, _ForwardIterator, _ForwardIterator, const _Tp&)’\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:4072:5: note:                 ‘template<class _IIter, class _Tp> constexpr typename std::iterator_traits< <template-parameter-1-1> >::difference_type std::count(_IIter, _IIter, const _Tp&)’\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^~~~~\ncollision.cpp:5:5: note:                 ‘int count’\n    5 | int count = 5;\n      |     ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "collision.cpp:8:13: error: reference to 'count' is ambiguous\n    8 |     cout << count << '\\n';\n      |             ^\ncollision.cpp:5:5: note: candidate found by name lookup is 'count'\n    5 | int count = 5;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidate found by name lookup is 'std::count'\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4072:5: note: candidate found by name lookup is 'std::count'\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g collision.cpp -o collision",
      "out": "",
      "err": "collision.cpp:8:13: error: reference to 'count' is ambiguous\n    8 |     cout << count << '\\n';\n      |             ^\ncollision.cpp:5:5: note: candidate found by name lookup is 'count'\n    5 | int count = 5;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidate found by name lookup is 'std::count'\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4072:5: note: candidate found by name lookup is 'std::count'\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "collision_fixed.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n\nint count = 5;\n\nint main() {\n    std::cout << count << '\\n';\n}\n",
   "stdout": "5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g collision_fixed.cpp -o collision_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./collision_fixed",
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
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g collision_fixed.cpp -o collision_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./collision_fixed",
      "out": "5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "copy_paste.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << \"**********\\n\";\n    std::cout << \"* Hi Ada *\\n\";\n    std::cout << \"**********\\n\";\n    std::cout << \"**********\\n\";\n    std::cout << \"* Hi Bob *\\n\";\n    std::cout << \"**********\\n\";\n    std::cout << \"**********\\n\";\n    std::cout << \"* Hi Kim *\\n\";\n    std::cout << \"**********\\n\";\n}\n",
   "stdout": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g copy_paste.cpp -o copy_paste",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./copy_paste",
     "out": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g copy_paste.cpp -o copy_paste",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./copy_paste",
      "out": "**********\n* Hi Ada *\n**********\n**********\n* Hi Bob *\n**********\n**********\n* Hi Kim *\n**********\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "declared.cpp": {
   "src": "#include <iostream>\n\nvoid greet();\n\nint main() {\n    greet();\n    std::cout << \"Back in main\\n\";\n}\n\nvoid greet() {\n    std::cout << \"Hello from greet\\n\";\n}\n",
   "stdout": "Hello from greet\nBack in main\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g declared.cpp -o declared",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./declared",
     "out": "Hello from greet\nBack in main\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Hello from greet\nBack in main\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g declared.cpp -o declared",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./declared",
      "out": "Hello from greet\nBack in main\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "default_middle.cpp": {
   "src": "#include <iostream>\n\nint area(int width = 1, int height) {\n    return width * height;\n}\n\nint main() {\n    std::cout << area(4, 3) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "default_middle.cpp:3:29: error: default argument missing for parameter 2 of ‘int area(int, int)’\n    3 | int area(int width = 1, int height) {\n      |                         ~~~~^~~~~~\ndefault_middle.cpp:3:14: note: ...following parameter 1 which has a default argument\n    3 | int area(int width = 1, int height) {\n      |          ~~~~^~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g default_middle.cpp -o default_middle",
     "out": "",
     "err": "default_middle.cpp:3:29: error: default argument missing for parameter 2 of ‘int area(int, int)’\n    3 | int area(int width = 1, int height) {\n      |                         ~~~~^~~~~~\ndefault_middle.cpp:3:14: note: ...following parameter 1 which has a default argument\n    3 | int area(int width = 1, int height) {\n      |          ~~~~^~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "default_middle.cpp:3:29: error: missing default argument on parameter 'height'\n    3 | int area(int width = 1, int height) {\n      |                             ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g default_middle.cpp -o default_middle",
      "out": "",
      "err": "default_middle.cpp:3:29: error: missing default argument on parameter 'height'\n    3 | int area(int width = 1, int height) {\n      |                             ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "defaults.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nvoid greet(std::string name, std::string greeting = \"Hello\") {\n    std::cout << greeting << \", \" << name << \"!\\n\";\n}\n\nint main() {\n    greet(\"Ada\");\n    greet(\"Bob\", \"Howdy\");\n    greet(\"Kim\", \"Good morning\");\n}\n",
   "stdout": "Hello, Ada!\nHowdy, Bob!\nGood morning, Kim!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g defaults.cpp -o defaults",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./defaults",
     "out": "Hello, Ada!\nHowdy, Bob!\nGood morning, Kim!\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Hello, Ada!\nHowdy, Bob!\nGood morning, Kim!\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g defaults.cpp -o defaults",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./defaults",
      "out": "Hello, Ada!\nHowdy, Bob!\nGood morning, Kim!\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "defaults_fill.cpp": {
   "src": "#include <iostream>\n\nint area(int width, int height = 1) {\n    return width * height;\n}\n\nint main() {\n    std::cout << area(4, 3) << '\\n';\n    std::cout << area(5) << '\\n';\n}\n",
   "stdout": "12\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g defaults_fill.cpp -o defaults_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./defaults_fill",
     "out": "12\n5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12\n5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g defaults_fill.cpp -o defaults_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./defaults_fill",
      "out": "12\n5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "exit_300.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << \"Returning 300\\n\";\n    return 300;\n}\n",
   "stdout": "44\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g exit_300.cpp -o exit_300",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch7"
    },
    {
     "cmd": "./exit_300",
     "out": "Returning 300\n",
     "err": "",
     "exit": 44,
     "dir": "~/cpp-ch7"
    },
    {
     "cmd": "echo $?",
     "out": "44\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch7"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "44\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g exit_300.cpp -o exit_300",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch7"
     },
     {
      "cmd": "./exit_300",
      "out": "Returning 300\n",
      "err": "",
      "exit": 44,
      "dir": "~/cpp-ch7"
     },
     {
      "cmd": "echo $?",
      "out": "44\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch7"
     }
    ]
   }
  },
  "exit_code.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << \"Oven too cold, giving up\\n\";\n    return 3;\n}\n",
   "stdout": "3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g exit_code.cpp -o exit_code",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch7"
    },
    {
     "cmd": "./exit_code",
     "out": "Oven too cold, giving up\n",
     "err": "",
     "exit": 3,
     "dir": "~/cpp-ch7"
    },
    {
     "cmd": "echo $?",
     "out": "3\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch7"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g exit_code.cpp -o exit_code",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch7"
     },
     {
      "cmd": "./exit_code",
      "out": "Oven too cold, giving up\n",
      "err": "",
      "exit": 3,
      "dir": "~/cpp-ch7"
     },
     {
      "cmd": "echo $?",
      "out": "3\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch7"
     }
    ]
   }
  },
  "global.cpp": {
   "src": "#include <iostream>\n\nconst int max_lives = 5;\nint lives = 3;\n\nvoid fall_in_pit() {\n    lives = lives - 1;\n}\n\nvoid find_potion() {\n    lives = lives + 5;\n    if (lives > max_lives) {\n        lives = max_lives;\n    }\n}\n\nint main() {\n    fall_in_pit();\n    find_potion();\n    fall_in_pit();\n    std::cout << \"Lives: \" << lives << '\\n';\n}\n",
   "stdout": "Lives: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g global.cpp -o global",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./global",
     "out": "Lives: 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Lives: 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g global.cpp -o global",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./global",
      "out": "Lives: 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "global_scope.cpp": {
   "src": "#include <iostream>\n\nint level = 1;\n\nint main() {\n    int level = 9;\n    std::cout << \"inner level: \" << level << '\\n';\n    std::cout << \"global level: \" << ::level << '\\n';\n}\n",
   "stdout": "inner level: 9\nglobal level: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g global_scope.cpp -o global_scope",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./global_scope",
     "out": "inner level: 9\nglobal level: 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "inner level: 9\nglobal level: 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g global_scope.cpp -o global_scope",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./global_scope",
      "out": "inner level: 9\nglobal level: 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "lifetime.cpp": {
   "src": "#include <iostream>\n\nvoid garden() {\n    int flowers = 12;\n    std::cout << \"Garden: \" << flowers << '\\n';\n}\n\nint main() {\n    int apples = 3;\n    {\n        int pears = 5;\n        std::cout << apples + pears << \" fruit\\n\";\n    }\n    garden();\n    std::cout << \"Hall: \" << apples << '\\n';\n}\n",
   "stdout": "8 fruit\nGarden: 12\nHall: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lifetime.cpp -o lifetime",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lifetime",
     "out": "8 fruit\nGarden: 12\nHall: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "8 fruit\nGarden: 12\nHall: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lifetime.cpp -o lifetime",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lifetime",
      "out": "8 fruit\nGarden: 12\nHall: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "loop_var.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 3; i++) {\n        total = total + i;\n    }\n    std::cout << \"Last i was \" << i << '\\n';\n}\n",
   "stdout": "",
   "stderr": "loop_var.cpp: In function ‘int main()’:\nloop_var.cpp:8:35: error: ‘i’ was not declared in this scope\n    8 |     std::cout << \"Last i was \" << i << '\\n';\n      |                                   ^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g loop_var.cpp -o loop_var",
     "out": "",
     "err": "loop_var.cpp: In function ‘int main()’:\nloop_var.cpp:8:35: error: ‘i’ was not declared in this scope\n    8 |     std::cout << \"Last i was \" << i << '\\n';\n      |                                   ^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "loop_var.cpp:8:35: error: use of undeclared identifier 'i'\n    8 |     std::cout << \"Last i was \" << i << '\\n';\n      |                                   ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g loop_var.cpp -o loop_var",
      "out": "",
      "err": "loop_var.cpp:8:35: error: use of undeclared identifier 'i'\n    8 |     std::cout << \"Last i was \" << i << '\\n';\n      |                                   ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "mangle.cpp": {
   "src": "int biggest(int a, int b) {\n    return a > b ? a : b;\n}\n\ndouble biggest(double a, double b) {\n    return a > b ? a : b;\n}\n",
   "stdout": "0000000000000020 T biggest(double, double)\n0000000000000000 T biggest(int, int)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -c mangle.cpp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm mangle.o",
     "out": "0000000000000020 T _Z7biggestdd\n0000000000000000 T _Z7biggestii\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm -C mangle.o",
     "out": "0000000000000020 T biggest(double, double)\n0000000000000000 T biggest(int, int)\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0000000000000030 T biggest(double, double)\n0000000000000000 T biggest(int, int)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -c mangle.cpp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm mangle.o",
      "out": "0000000000000030 T _Z7biggestdd\n0000000000000000 T _Z7biggestii\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm -C mangle.o",
      "out": "0000000000000030 T biggest(double, double)\n0000000000000000 T biggest(int, int)\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "max3.cpp": {
   "src": "#include <iostream>\n\nint max3(int a, int b, int c) {\n    int best = a;\n    if (b > best) {\n        best = b;\n    }\n    if (c > best) {\n        best = c;\n    }\n    return best;\n}\n\nint main() {\n    std::cout << max3(3, 9, 4) << '\\n';\n    std::cout << max3(7, 2, 5) << '\\n';\n    std::cout << max3(1, 2, 8) << '\\n';\n    std::cout << max3(-5, -2, -9) << '\\n';\n    std::cout << max3(6, 6, 6) << '\\n';\n}\n",
   "stdout": "9\n7\n8\n-2\n6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g max3.cpp -o max3",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./max3",
     "out": "9\n7\n8\n-2\n6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "9\n7\n8\n-2\n6\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g max3.cpp -o max3",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./max3",
      "out": "9\n7\n8\n-2\n6\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "max_fill.cpp": {
   "src": "#include <iostream>\n\nint max3(int a, int b, int c) {\n    int best = a;\n    if (b > best) {\n        best = b;\n    }\n    if (c > best) {\n        best = c;\n    }\n    return best;\n}\n\nint main() {\n    int top = max3(8, 12, 5);\n    std::cout << \"Biggest: \" << top << '\\n';\n}\n",
   "stdout": "Biggest: 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g max_fill.cpp -o max_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./max_fill",
     "out": "Biggest: 12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Biggest: 12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g max_fill.cpp -o max_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./max_fill",
      "out": "Biggest: 12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "missing_return.cpp": {
   "src": "#include <iostream>\n\nint sign_of(int n) {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n}\n\nint main() {\n    std::cout << sign_of(0) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "missing_return.cpp: In function ‘int sign_of(int)’:\nmissing_return.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g missing_return.cpp -o missing_return",
     "out": "",
     "err": "missing_return.cpp: In function ‘int sign_of(int)’:\nmissing_return.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\n",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "missing_return.cpp:10:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n   10 | }\n      | ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g missing_return.cpp -o missing_return",
      "out": "",
      "err": "missing_return.cpp:10:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n   10 | }\n      | ^\n1 warning generated.\n",
      "exit": 0
     }
    ]
   }
  },
  "missing_return_clang.cpp": {
   "src": "#include <iostream>\n\nint sign_of(int n) {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n}\n\nint main() {\n    std::cout << sign_of(0) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "missing_return_clang.cpp:10:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n   10 | }\n      | ^\n1 warning generated.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g missing_return_clang.cpp -o missing_return_clang",
     "out": "",
     "err": "missing_return_clang.cpp:10:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n   10 | }\n      | ^\n1 warning generated.\n",
     "exit": 0
    }
   ]
  },
  "missing_return_san.cpp": {
   "src": "#include <iostream>\n\nint sign_of(int n) {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n}\n\nint main() {\n    std::cout << sign_of(0) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "missing_return_san.cpp: In function ‘int sign_of(int)’:\nmissing_return_san.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\nmissing_return_san.cpp:3:5: runtime error: execution reached the end of a value-returning function without returning a value\n    #0 0x5555555552c5 in sign_of(int) /home/you/cpp-ch7/missing_return_san.cpp:3\n    #1 0x5555555553b5 in main /home/you/cpp-ch7/missing_return_san.cpp:13\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555551c4 in _start (/home/you/cpp-ch7/missing_return_san+0x11c4) (BuildId: c05c7d202d9daa4c8834a45d76f2700ca2dfa798)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer missing_return_san.cpp -o missing_return_san",
     "out": "",
     "err": "missing_return_san.cpp: In function ‘int sign_of(int)’:\nmissing_return_san.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\n",
     "exit": 0
    },
    {
     "cmd": "./missing_return_san",
     "out": "",
     "err": "missing_return_san.cpp:3:5: runtime error: execution reached the end of a value-returning function without returning a value\n    #0 0x5555555552c5 in sign_of(int) /home/you/cpp-ch7/missing_return_san.cpp:3\n    #1 0x5555555553b5 in main /home/you/cpp-ch7/missing_return_san.cpp:13\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555551c4 in _start (/home/you/cpp-ch7/missing_return_san+0x11c4) (BuildId: c05c7d202d9daa4c8834a45d76f2700ca2dfa798)\n\n",
     "exit": 1
    }
   ]
  },
  "missing_return_werror.cpp": {
   "src": "#include <iostream>\n\nint sign_of(int n) {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n}\n\nint main() {\n    std::cout << sign_of(0) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "missing_return_werror.cpp: In function ‘int sign_of(int)’:\nmissing_return_werror.cpp:10:1: error: control reaches end of non-void function [-Werror=return-type]\n   10 | }\n      | ^\ncc1plus: some warnings being treated as errors\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -Werror=return-type -g missing_return_werror.cpp -o missing_return_werror",
     "out": "",
     "err": "missing_return_werror.cpp: In function ‘int sign_of(int)’:\nmissing_return_werror.cpp:10:1: error: control reaches end of non-void function [-Werror=return-type]\n   10 | }\n      | ^\ncc1plus: some warnings being treated as errors\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "missing_return_werror.cpp:10:1: error: non-void function does not return a value in all control paths [-Werror,-Wreturn-type]\n   10 | }\n      | ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -Werror=return-type -g missing_return_werror.cpp -o missing_return_werror",
      "out": "",
      "err": "missing_return_werror.cpp:10:1: error: non-void function does not return a value in all control paths [-Werror,-Wreturn-type]\n   10 | }\n      | ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "namespaces.cpp": {
   "src": "#include <iostream>\n\nnamespace kitchen {\n    const int count = 3;\n    void report() {\n        std::cout << \"Kitchen: \" << count << \" cups\\n\";\n    }\n}\n\nnamespace garden {\n    const int count = 7;\n    void report() {\n        std::cout << \"Garden: \" << count << \" pots\\n\";\n    }\n}\n\nint main() {\n    kitchen::report();\n    garden::report();\n    std::cout << \"Both: \" << kitchen::count + garden::count << '\\n';\n}\n",
   "stdout": "Kitchen: 3 cups\nGarden: 7 pots\nBoth: 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g namespaces.cpp -o namespaces",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./namespaces",
     "out": "Kitchen: 3 cups\nGarden: 7 pots\nBoth: 10\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Kitchen: 3 cups\nGarden: 7 pots\nBoth: 10\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g namespaces.cpp -o namespaces",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./namespaces",
      "out": "Kitchen: 3 cups\nGarden: 7 pots\nBoth: 10\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "nested_x.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int x = 1;\n    {\n        int x = 2;\n        std::cout << x << '\\n';\n        {\n            x = 3;\n            std::cout << x << '\\n';\n        }\n    }\n    std::cout << x << '\\n';\n}\n",
   "stdout": "2\n3\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g nested_x.cpp -o nested_x",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./nested_x",
     "out": "2\n3\n1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2\n3\n1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g nested_x.cpp -o nested_x",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./nested_x",
      "out": "2\n3\n1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "no_def.cpp": {
   "src": "#include <iostream>\n\nvoid greet();\n\nint main() {\n    greet();\n    std::cout << \"Back in main\\n\";\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: no_def.o: in function `main':\n/home/you/cpp-ch7/no_def.cpp:6:(.text+0x9): undefined reference to `greet()'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c no_def.cpp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "g++ no_def.o -o no_def",
     "out": "",
     "err": "/usr/bin/ld: no_def.o: in function `main':\n/home/you/cpp-ch7/no_def.cpp:6:(.text+0x9): undefined reference to `greet()'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: no_def.o: in function `main':\n/home/you/cpp-ch7/no_def.cpp:6:(.text+0x5): undefined reference to `greet()'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c no_def.cpp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "clang++ no_def.o -o no_def",
      "out": "",
      "err": "/usr/bin/ld: no_def.o: in function `main':\n/home/you/cpp-ch7/no_def.cpp:6:(.text+0x5): undefined reference to `greet()'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1
     }
    ]
   }
  },
  "not_declared.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    greet();\n    std::cout << \"Back in main\\n\";\n}\n\nvoid greet() {\n    std::cout << \"Hello from greet\\n\";\n}\n",
   "stdout": "",
   "stderr": "not_declared.cpp: In function ‘int main()’:\nnot_declared.cpp:4:5: error: ‘greet’ was not declared in this scope\n    4 |     greet();\n      |     ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g not_declared.cpp -o not_declared",
     "out": "",
     "err": "not_declared.cpp: In function ‘int main()’:\nnot_declared.cpp:4:5: error: ‘greet’ was not declared in this scope\n    4 |     greet();\n      |     ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "not_declared.cpp:4:5: error: use of undeclared identifier 'greet'\n    4 |     greet();\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g not_declared.cpp -o not_declared",
      "out": "",
      "err": "not_declared.cpp:4:5: error: use of undeclared identifier 'greet'\n    4 |     greet();\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "ns_fill.cpp": {
   "src": "#include <iostream>\n\nnamespace shop {\n    const int price = 4;\n}\n\nnamespace cafe {\n    const int price = 3;\n}\n\nint main() {\n    std::cout << shop::price + cafe::price << '\\n';\n}\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ns_fill.cpp -o ns_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ns_fill",
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
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ns_fill.cpp -o ns_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ns_fill",
      "out": "7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "overload.cpp": {
   "src": "#include <iostream>\n\nint biggest(int a, int b) {\n    std::cout << \"(int, int) \";\n    return a > b ? a : b;\n}\n\ndouble biggest(double a, double b) {\n    std::cout << \"(double, double) \";\n    return a > b ? a : b;\n}\n\nint biggest(int a, int b, int c) {\n    std::cout << \"(int, int, int) \";\n    return a > b ? (a > c ? a : c) : (b > c ? b : c);\n}\n\nint main() {\n    std::cout << biggest(3, 8) << '\\n';\n    std::cout << biggest(2.5, 1.5) << '\\n';\n    std::cout << biggest(4, 9, 6) << '\\n';\n}\n",
   "stdout": "(int, int) 8\n(double, double) 2.5\n(int, int, int) 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g overload.cpp -o overload",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./overload",
     "out": "(int, int) 8\n(double, double) 2.5\n(int, int, int) 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "(int, int) 8\n(double, double) 2.5\n(int, int, int) 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g overload.cpp -o overload",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./overload",
      "out": "(int, int) 8\n(double, double) 2.5\n(int, int, int) 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "params.cpp": {
   "src": "#include <iostream>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << add(2, 3) << '\\n';\n    int x = 10;\n    std::cout << add(x, -4) << '\\n';\n    std::cout << add(add(1, 1), 5) << '\\n';\n}\n",
   "stdout": "5\n6\n7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g params.cpp -o params",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./params",
     "out": "5\n6\n7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5\n6\n7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g params.cpp -o params",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./params",
      "out": "5\n6\n7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_order.cpp": {
   "src": "#include <iostream>\nint half(int n);\nint main() {\n    std::cout << half(10) << '\\n';\n}\nint half(int n) {\n    return n / 2;\n}\n",
   "stdout": "5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_order.cpp -o parsons_order",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_order",
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
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_order.cpp -o parsons_order",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_order",
      "out": "5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "price.cpp": {
   "src": "#include <iostream>\n\nint ticket_price(int age) {\n    if (age < 12) {\n        return 5;\n    }\n    if (age >= 65) {\n        return 7;\n    }\n    return 12;\n}\n\nint main() {\n    int age = 0;\n    std::cout << \"Age? \";\n    std::cin >> age;\n    int price = ticket_price(age);\n    std::cout << \"Ticket: $\" << price << '\\n';\n}\n",
   "stdout": "Age? Ticket: $12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g price.cpp -o price",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./price",
     "out": "Age? Ticket: $12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Age? Ticket: $12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g price.cpp -o price",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./price",
      "out": "Age? Ticket: $12\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "30\n",
   "screen": "Age? 30\nTicket: $12\n"
  },
  "price_kid.cpp": {
   "src": "#include <iostream>\n\nint ticket_price(int age) {\n    if (age < 12) {\n        return 5;\n    }\n    if (age >= 65) {\n        return 7;\n    }\n    return 12;\n}\n\nint main() {\n    int age = 0;\n    std::cout << \"Age? \";\n    std::cin >> age;\n    int price = ticket_price(age);\n    std::cout << \"Ticket: $\" << price << '\\n';\n}\n",
   "stdout": "Age? Ticket: $5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g price_kid.cpp -o price_kid",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./price_kid",
     "out": "Age? Ticket: $5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Age? Ticket: $5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g price_kid.cpp -o price_kid",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./price_kid",
      "out": "Age? Ticket: $5\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "8\n",
   "screen": "Age? 8\nTicket: $5\n"
  },
  "price_senior.cpp": {
   "src": "#include <iostream>\n\nint ticket_price(int age) {\n    if (age < 12) {\n        return 5;\n    }\n    if (age >= 65) {\n        return 7;\n    }\n    return 12;\n}\n\nint main() {\n    int age = 0;\n    std::cout << \"Age? \";\n    std::cin >> age;\n    int price = ticket_price(age);\n    std::cout << \"Ticket: $\" << price << '\\n';\n}\n",
   "stdout": "Age? Ticket: $7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g price_senior.cpp -o price_senior",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./price_senior",
     "out": "Age? Ticket: $7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Age? Ticket: $7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g price_senior.cpp -o price_senior",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./price_senior",
      "out": "Age? Ticket: $7\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "70\n",
   "screen": "Age? 70\nTicket: $7\n"
  },
  "print_quiz.cpp": {
   "src": "#include <iostream>\n\nint triple(int n) {\n    std::cout << \"tripling \" << n << '\\n';\n    return n * 3;\n}\n\nint main() {\n    int t = triple(2);\n    triple(4);\n    std::cout << t + triple(1) << '\\n';\n}\n",
   "stdout": "tripling 2\ntripling 4\ntripling 1\n9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g print_quiz.cpp -o print_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./print_quiz",
     "out": "tripling 2\ntripling 4\ntripling 1\n9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "tripling 2\ntripling 4\ntripling 1\n9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g print_quiz.cpp -o print_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./print_quiz",
      "out": "tripling 2\ntripling 4\ntripling 1\n9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "print_vs_return.cpp": {
   "src": "#include <iostream>\n\nvoid say_double(int n) {\n    std::cout << n * 2 << '\\n';\n}\n\nint make_double(int n) {\n    return n * 2;\n}\n\nint main() {\n    say_double(5);\n    int d = make_double(5);\n    std::cout << d + 1 << '\\n';\n    make_double(100);\n    std::cout << \"done\\n\";\n}\n",
   "stdout": "10\n11\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g print_vs_return.cpp -o print_vs_return",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./print_vs_return",
     "out": "10\n11\ndone\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "10\n11\ndone\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g print_vs_return.cpp -o print_vs_return",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./print_vs_return",
      "out": "10\n11\ndone\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "scope_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int age = 20;\n    if (age >= 18) {\n        bool adult = true;\n    }\n    std::cout << adult << '\\n';\n}\n",
   "stdout": "",
   "stderr": "scope_quiz.cpp: In function ‘int main()’:\nscope_quiz.cpp:6:14: warning: unused variable ‘adult’ [-Wunused-variable]\n    6 |         bool adult = true;\n      |              ^~~~~\nscope_quiz.cpp:8:18: error: ‘adult’ was not declared in this scope\n    8 |     std::cout << adult << '\\n';\n      |                  ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g scope_quiz.cpp -o scope_quiz",
     "out": "",
     "err": "scope_quiz.cpp: In function ‘int main()’:\nscope_quiz.cpp:6:14: warning: unused variable ‘adult’ [-Wunused-variable]\n    6 |         bool adult = true;\n      |              ^~~~~\nscope_quiz.cpp:8:18: error: ‘adult’ was not declared in this scope\n    8 |     std::cout << adult << '\\n';\n      |                  ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "scope_quiz.cpp:6:14: warning: unused variable 'adult' [-Wunused-variable]\n    6 |         bool adult = true;\n      |              ^~~~~\nscope_quiz.cpp:8:18: error: use of undeclared identifier 'adult'\n    8 |     std::cout << adult << '\\n';\n      |                  ^\n1 warning and 1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g scope_quiz.cpp -o scope_quiz",
      "out": "",
      "err": "scope_quiz.cpp:6:14: warning: unused variable 'adult' [-Wunused-variable]\n    6 |         bool adult = true;\n      |              ^~~~~\nscope_quiz.cpp:8:18: error: use of undeclared identifier 'adult'\n    8 |     std::cout << adult << '\\n';\n      |                  ^\n1 warning and 1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "shadow.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total = 0;\n    int bonus = 5;\n    if (bonus > 0) {\n        int total = bonus * 2;\n        std::cout << \"Bonus added: \" << total << '\\n';\n    }\n    std::cout << \"Total: \" << total << '\\n';\n}\n",
   "stdout": "Bonus added: 10\nTotal: 0\n",
   "stderr": "shadow.cpp: In function ‘int main()’:\nshadow.cpp:7:13: warning: declaration of ‘total’ shadows a previous local [-Wshadow]\n    7 |         int total = bonus * 2;\n      |             ^~~~~\nshadow.cpp:4:9: note: shadowed declaration is here\n    4 |     int total = 0;\n      |         ^~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -Wshadow shadow.cpp -o shadow",
     "out": "",
     "err": "shadow.cpp: In function ‘int main()’:\nshadow.cpp:7:13: warning: declaration of ‘total’ shadows a previous local [-Wshadow]\n    7 |         int total = bonus * 2;\n      |             ^~~~~\nshadow.cpp:4:9: note: shadowed declaration is here\n    4 |     int total = 0;\n      |         ^~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./shadow",
     "out": "Bonus added: 10\nTotal: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Bonus added: 10\nTotal: 0\n",
    "stderr": "shadow.cpp:7:13: warning: declaration shadows a local variable [-Wshadow]\n    7 |         int total = bonus * 2;\n      |             ^\nshadow.cpp:4:9: note: previous declaration is here\n    4 |     int total = 0;\n      |         ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -Wshadow shadow.cpp -o shadow",
      "out": "",
      "err": "shadow.cpp:7:13: warning: declaration shadows a local variable [-Wshadow]\n    7 |         int total = bonus * 2;\n      |             ^\nshadow.cpp:4:9: note: previous declaration is here\n    4 |     int total = 0;\n      |         ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./shadow",
      "out": "Bonus added: 10\nTotal: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "sign_fixed.cpp": {
   "src": "#include <iostream>\n\nint sign_of(int n) {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n    return 0;\n}\n\nint main() {\n    std::cout << sign_of(5) << ' ' << sign_of(-8) << ' ' << sign_of(0) << '\\n';\n}\n",
   "stdout": "1 -1 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g sign_fixed.cpp -o sign_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./sign_fixed",
     "out": "1 -1 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 -1 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g sign_fixed.cpp -o sign_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./sign_fixed",
      "out": "1 -1 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_return.cpp": {
   "src": "#include <iostream>\n\nint points_for(int place) {\n    if (place == 1) {\n        return 10;\n    }\n    if (place == 2) {\n        return 5;\n    }\n}\n\nint main() {\n    std::cout << \"1st: \" << points_for(1) << std::endl;\n    std::cout << \"3rd: \" << points_for(3) << std::endl;\n}\n",
   "stdout": "1st: 10\n",
   "stderr": "spot_return.cpp: In function ‘int points_for(int)’:\nspot_return.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\nspot_return.cpp:3:5: runtime error: execution reached the end of a value-returning function without returning a value\n    #0 0x5555555562e5 in points_for(int) /home/you/cpp-ch7/spot_return.cpp:3\n    #1 0x555555556684 in main /home/you/cpp-ch7/spot_return.cpp:14\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555561e4 in _start (/home/you/cpp-ch7/spot_return+0x21e4) (BuildId: c20989bac4386a178b7e0a79e81efdbb95eb5380)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer spot_return.cpp -o spot_return",
     "out": "",
     "err": "spot_return.cpp: In function ‘int points_for(int)’:\nspot_return.cpp:10:1: warning: control reaches end of non-void function [-Wreturn-type]\n   10 | }\n      | ^\n",
     "exit": 0
    },
    {
     "cmd": "./spot_return",
     "out": "1st: 10\n",
     "err": "spot_return.cpp:3:5: runtime error: execution reached the end of a value-returning function without returning a value\n    #0 0x5555555562e5 in points_for(int) /home/you/cpp-ch7/spot_return.cpp:3\n    #1 0x555555556684 in main /home/you/cpp-ch7/spot_return.cpp:14\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555561e4 in _start (/home/you/cpp-ch7/spot_return+0x21e4) (BuildId: c20989bac4386a178b7e0a79e81efdbb95eb5380)\n\n",
     "exit": 1,
     "merged": "1st: 10\nspot_return.cpp:3:5: runtime error: execution reached the end of a value-returning function without returning a value\n    #0 0x5555555562e5 in points_for(int) /home/you/cpp-ch7/spot_return.cpp:3\n    #1 0x555555556684 in main /home/you/cpp-ch7/spot_return.cpp:14\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555561e4 in _start (/home/you/cpp-ch7/spot_return+0x21e4) (BuildId: c20989bac4386a178b7e0a79e81efdbb95eb5380)\n\n"
    }
   ]
  },
  "spot_shadow.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 4; i++) {\n        int sum = 0;\n        sum = sum + i;\n        std::cout << \"added \" << i << '\\n';\n    }\n    std::cout << \"Sum: \" << sum << '\\n';\n}\n",
   "stdout": "added 1\nadded 2\nadded 3\nadded 4\nSum: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_shadow.cpp -o spot_shadow",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_shadow",
     "out": "added 1\nadded 2\nadded 3\nadded 4\nSum: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "added 1\nadded 2\nadded 3\nadded 4\nSum: 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_shadow.cpp -o spot_shadow",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_shadow",
      "out": "added 1\nadded 2\nadded 3\nadded 4\nSum: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "square_walk.cpp": {
   "src": "#include <iostream>\n\nint square(int n) {\n    int result = n * n;\n    return result;\n}\n\nint main() {\n    std::cout << \"Start\\n\";\n    int a = square(4);\n    std::cout << a << '\\n';\n    std::cout << square(3) << '\\n';\n}\n",
   "stdout": "Start\n16\n9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g square_walk.cpp -o square_walk",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./square_walk",
     "out": "Start\n16\n9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Start\n16\n9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g square_walk.cpp -o square_walk",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./square_walk",
      "out": "Start\n16\n9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "stack.cpp": {
   "src": "#include <iostream>\n\nint with_tax(int price) {\n    int tax = price / 10;\n    return price + tax;\n}\n\nint total_cost(int qty, int each) {\n    int subtotal = qty * each;\n    return with_tax(subtotal);\n}\n\nint main() {\n    int bill = total_cost(3, 20);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "Bill: 66\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g stack.cpp -o stack",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./stack",
     "out": "Bill: 66\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Bill: 66\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g stack.cpp -o stack",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./stack",
      "out": "Bill: 66\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "static_counter.cpp": {
   "src": "#include <iostream>\n\nvoid ring_plain() {\n    int count = 0;\n    count = count + 1;\n    std::cout << \"plain bell: \" << count << '\\n';\n}\n\nvoid ring_static() {\n    static int count = 0;\n    count = count + 1;\n    std::cout << \"static bell: \" << count << '\\n';\n}\n\nint main() {\n    ring_plain();\n    ring_plain();\n    ring_static();\n    ring_static();\n    ring_static();\n}\n",
   "stdout": "plain bell: 1\nplain bell: 1\nstatic bell: 1\nstatic bell: 2\nstatic bell: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g static_counter.cpp -o static_counter",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./static_counter",
     "out": "plain bell: 1\nplain bell: 1\nstatic bell: 1\nstatic bell: 2\nstatic bell: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "plain bell: 1\nplain bell: 1\nstatic bell: 1\nstatic bell: 2\nstatic bell: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g static_counter.cpp -o static_counter",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./static_counter",
      "out": "plain bell: 1\nplain bell: 1\nstatic bell: 1\nstatic bell: 2\nstatic bell: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "static_quiz.cpp": {
   "src": "#include <iostream>\n\nint next_ticket() {\n    static int number = 100;\n    number = number + 1;\n    return number;\n}\n\nint main() {\n    std::cout << next_ticket() << '\\n';\n    std::cout << next_ticket() << '\\n';\n    int n = next_ticket();\n    std::cout << n + next_ticket() << '\\n';\n}\n",
   "stdout": "101\n102\n207\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g static_quiz.cpp -o static_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./static_quiz",
     "out": "101\n102\n207\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "101\n102\n207\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g static_quiz.cpp -o static_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./static_quiz",
      "out": "101\n102\n207\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "using.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nnamespace tools {\n    std::string favourite() {\n        return \"wrench\";\n    }\n}\n\nint main() {\n    using std::cout;\n    using tools::favourite;\n    cout << \"Wren's favourite: \" << favourite() << '\\n';\n}\n",
   "stdout": "Wren's favourite: wrench\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g using.cpp -o using",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./using",
     "out": "Wren's favourite: wrench\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Wren's favourite: wrench\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g using.cpp -o using",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./using",
      "out": "Wren's favourite: wrench\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "void_main.cpp": {
   "src": "#include <iostream>\n\nvoid main() {\n    std::cout << \"Hello from a void main\\n\";\n}\n",
   "stdout": "",
   "stderr": "void_main.cpp:3:1: error: ‘::main’ must return ‘int’\n    3 | void main() {\n      | ^~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g void_main.cpp -o void_main",
     "out": "",
     "err": "void_main.cpp:3:1: error: ‘::main’ must return ‘int’\n    3 | void main() {\n      | ^~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "void_main.cpp:3:1: error: 'main' must return 'int'\n    3 | void main() {\n      | ^~~~\n      | int\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g void_main.cpp -o void_main",
      "out": "",
      "err": "void_main.cpp:3:1: error: 'main' must return 'int'\n    3 | void main() {\n      | ^~~~\n      | int\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "void_value.cpp": {
   "src": "#include <iostream>\n\nvoid print_max(int a, int b, int c) {\n    int best = a;\n    if (b > best) {\n        best = b;\n    }\n    if (c > best) {\n        best = c;\n    }\n    std::cout << best << '\\n';\n}\n\nint main() {\n    int m = print_max(3, 9, 4);\n    std::cout << m + 1 << '\\n';\n}\n",
   "stdout": "",
   "stderr": "void_value.cpp: In function ‘int main()’:\nvoid_value.cpp:15:22: error: void value not ignored as it ought to be\n   15 |     int m = print_max(3, 9, 4);\n      |             ~~~~~~~~~^~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g void_value.cpp -o void_value",
     "out": "",
     "err": "void_value.cpp: In function ‘int main()’:\nvoid_value.cpp:15:22: error: void value not ignored as it ought to be\n   15 |     int m = print_max(3, 9, 4);\n      |             ~~~~~~~~~^~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "void_value.cpp:15:9: error: cannot initialize a variable of type 'int' with an rvalue of type 'void'\n   15 |     int m = print_max(3, 9, 4);\n      |         ^   ~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g void_value.cpp -o void_value",
      "out": "",
      "err": "void_value.cpp:15:9: error: cannot initialize a variable of type 'int' with an rvalue of type 'void'\n   15 |     int m = print_max(3, 9, 4);\n      |         ^   ~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
