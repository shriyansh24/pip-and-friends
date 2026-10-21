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
  "workdir": "/home/you/cpp-ch8",
  "versionDifferences": [
   "badge_touch.cpp",
   "bind_literal.cpp",
   "double_copy.cpp",
   "index_warn.cpp",
   "past_end_checked.cpp",
   "print_vector_head.cpp",
   "ref_uninit.cpp",
   "return_local.cpp",
   "return_local_ref.cpp",
   "return_local_ref20.cpp",
   "spot_bonus.cpp",
   "spot_rangefor.cpp",
   "swap_gdb.cpp",
   "swap_quiz.cpp",
   "too_many.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): badge_touch.cpp, bind_literal.cpp, double_copy.cpp, index_warn.cpp, past_end_checked.cpp, print_vector_head.cpp, ref_uninit.cpp, return_local.cpp, return_local_ref.cpp, return_local_ref20.cpp, spot_bonus.cpp, spot_rangefor.cpp, swap_gdb.cpp, swap_quiz.cpp, too_many.cpp."
 },
 "programs": {
  "at10.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::cout << \"cup 1: \" << eggs.at(1) << std::endl;\n    std::cout << \"cup 10: \" << eggs.at(10) << '\\n';\n    std::cout << \"Done\\n\";\n}\n",
   "stdout": "cup 1: 58\n",
   "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g at10.cpp -o at10",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./at10",
     "out": "cup 1: 58\n",
     "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n",
     "exit": 134,
     "merged": "cup 1: 58\nterminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "cup 1: 58\n",
    "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g at10.cpp -o at10",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./at10",
      "out": "cup 1: 58\n",
      "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n",
      "exit": 134,
      "merged": "cup 1: 58\nterminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)\nAborted\n"
     }
    ]
   }
  },
  "at_quiz.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::cout << \"last cup: \" << eggs.at(eggs.size()) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 3) >= this->size() (which is 3)\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g at_quiz.cpp -o at_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./at_quiz",
     "out": "",
     "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 3) >= this->size() (which is 3)\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 3) >= this->size() (which is 3)\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g at_quiz.cpp -o at_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./at_quiz",
      "out": "",
      "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check: __n (which is 3) >= this->size() (which is 3)\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "badge.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nvoid greet(const std::string& name) {\n    std::cout << \"Hello, \" << name << \"!\\n\";\n}\n\nint main() {\n    std::string guest{\"Robert\"};\n    greet(guest);        // no copy: name is a nickname for guest\n    greet(\"Bob\");        // a temporary string: const& may hold it\n    const int& lucky{7}; // const& can even hold a plain number\n    std::cout << \"lucky: \" << lucky << '\\n';\n}\n",
   "stdout": "Hello, Robert!\nHello, Bob!\nlucky: 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g badge.cpp -o badge",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./badge",
     "out": "Hello, Robert!\nHello, Bob!\nlucky: 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Hello, Robert!\nHello, Bob!\nlucky: 7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g badge.cpp -o badge",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./badge",
      "out": "Hello, Robert!\nHello, Bob!\nlucky: 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "badge_touch.cpp": {
   "src": "#include <iostream>\n\nvoid show(const int& score) {\n    score = 0;            // tidy up after showing?\n    std::cout << \"Score: \" << score << '\\n';\n}\n\nint main() {\n    int points{120};\n    show(points);\n}\n",
   "stdout": "",
   "stderr": "badge_touch.cpp: In function ‘void show(const int&)’:\nbadge_touch.cpp:4:11: error: assignment of read-only reference ‘score’\n    4 |     score = 0;            // tidy up after showing?\n      |     ~~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g badge_touch.cpp -o badge_touch",
     "out": "",
     "err": "badge_touch.cpp: In function ‘void show(const int&)’:\nbadge_touch.cpp:4:11: error: assignment of read-only reference ‘score’\n    4 |     score = 0;            // tidy up after showing?\n      |     ~~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "badge_touch.cpp:4:11: error: cannot assign to variable 'score' with const-qualified type 'const int &'\n    4 |     score = 0;            // tidy up after showing?\n      |     ~~~~~ ^\nbadge_touch.cpp:3:22: note: variable 'score' declared const here\n    3 | void show(const int& score) {\n      |           ~~~~~~~~~~~^~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g badge_touch.cpp -o badge_touch",
      "out": "",
      "err": "badge_touch.cpp:4:11: error: cannot assign to variable 'score' with const-qualified type 'const int &'\n    4 |     score = 0;            // tidy up after showing?\n      |     ~~~~~ ^\nbadge_touch.cpp:3:22: note: variable 'score' declared const here\n    3 | void show(const int& score) {\n      |           ~~~~~~~~~~~^~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "bind_literal.cpp": {
   "src": "#include <iostream>\n\nvoid have_birthday(int& age) {\n    ++age;\n}\n\nint main() {\n    have_birthday(40);\n    std::cout << \"Happy birthday!\\n\";\n}\n",
   "stdout": "",
   "stderr": "bind_literal.cpp: In function ‘int main()’:\nbind_literal.cpp:8:19: error: cannot bind non-const lvalue reference of type ‘int&’ to an rvalue of type ‘int’\n    8 |     have_birthday(40);\n      |                   ^~\nbind_literal.cpp:3:25: note:   initializing argument 1 of ‘void have_birthday(int&)’\n    3 | void have_birthday(int& age) {\n      |                    ~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bind_literal.cpp -o bind_literal",
     "out": "",
     "err": "bind_literal.cpp: In function ‘int main()’:\nbind_literal.cpp:8:19: error: cannot bind non-const lvalue reference of type ‘int&’ to an rvalue of type ‘int’\n    8 |     have_birthday(40);\n      |                   ^~\nbind_literal.cpp:3:25: note:   initializing argument 1 of ‘void have_birthday(int&)’\n    3 | void have_birthday(int& age) {\n      |                    ~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "bind_literal.cpp:8:5: error: no matching function for call to 'have_birthday'\n    8 |     have_birthday(40);\n      |     ^~~~~~~~~~~~~\nbind_literal.cpp:3:6: note: candidate function not viable: expects an lvalue for 1st argument\n    3 | void have_birthday(int& age) {\n      |      ^             ~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bind_literal.cpp -o bind_literal",
      "out": "",
      "err": "bind_literal.cpp:8:5: error: no matching function for call to 'have_birthday'\n    8 |     have_birthday(40);\n      |     ^~~~~~~~~~~~~\nbind_literal.cpp:3:6: note: candidate function not viable: expects an lvalue for 1st argument\n    3 | void have_birthday(int& age) {\n      |      ^             ~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "birthday.cpp": {
   "src": "#include <iostream>\n\nvoid have_birthday(int& age) {\n    ++age;\n}\n\nint main() {\n    int robert{40};\n    have_birthday(robert);\n    have_birthday(robert);\n    std::cout << \"Robert is \" << robert << '\\n';\n}\n",
   "stdout": "Robert is 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g birthday.cpp -o birthday",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./birthday",
     "out": "Robert is 42\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Robert is 42\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g birthday.cpp -o birthday",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./birthday",
      "out": "Robert is 42\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_array.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint main() {\n    std::array<char, 4> seats{'A', 'B', 'C', 'D'};\n    for (auto& s : seats) {\n        if (s == 'B' || s == 'D') {\n            s = 'x';\n        }\n    }\n    for (char s : seats) {\n        std::cout << s;\n    }\n    std::cout << ' ' << seats.size() << '\\n';\n}\n",
   "stdout": "AxCx 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_array.cpp -o boss_array",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_array",
     "out": "AxCx 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "AxCx 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_array.cpp -o boss_array",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_array",
      "out": "AxCx 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nvoid double_all(std::vector<int>& v) {\n    for (int& x : v) {\n        x *= 2;\n    }\n}\n\nint main() {\n    std::vector<int> eggs{30, 31, 29};\n    double_all(eggs);\n    std::cout << eggs[0] << ' ' << eggs[1] << ' ' << eggs[2] << '\\n';\n}\n",
   "stdout": "60 62 58\n",
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
     "out": "60 62 58\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "60 62 58\n",
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
      "out": "60 62 58\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\nvoid swap_names(int& x, int& y) {\n    int keep{x};\n    x = y;\n    y = keep;\n}\nint main() {\n    int a{1}, b{2};\n    swap_names(a, b);\n    std::cout << a << ' ' << b << '\\n';\n}\n",
   "stdout": "2 1\n",
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
     "out": "2 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 1\n",
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
      "out": "2 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_refs.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nvoid grow(std::vector<int>& v, int extra) {\n    v.push_back(extra);\n    extra = 0;\n}\n\nint main() {\n    std::vector<int> a{1, 2};\n    int n{3};\n    grow(a, n);\n    std::vector<int> b{a};       // a copy of the whole carton\n    b.push_back(4);\n    int& last{a.back()};\n    last += 10;\n    std::cout << a.size() << ' ' << b.size() << ' ' << a.back() << ' ' << b[2] << ' ' << n << '\\n';\n}\n",
   "stdout": "3 4 13 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_refs.cpp -o boss_refs",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_refs",
     "out": "3 4 13 3 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 4 13 3 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_refs.cpp -o boss_refs",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_refs",
      "out": "3 4 13 3 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nvoid add_egg(std::vector<int> carton, int egg) {\n    carton.push_back(egg);\n}\n\nint main() {\n    std::vector<int> eggs{62, 58};\n    add_egg(eggs, 65);\n    add_egg(eggs, 70);\n    std::cout << \"eggs in the carton: \" << eggs.size() << '\\n';\n}\n",
   "stdout": "eggs in the carton: 2\n",
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
     "out": "eggs in the carton: 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "eggs in the carton: 2\n",
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
      "out": "eggs in the carton: 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{58, 63, 61, 55};\n    int total{0};\n    int big{0};\n    for (int egg : eggs) {\n        total += egg;\n        if (egg > 60) {\n            ++big;\n        }\n        std::cout << egg << ' ' << total << ' ' << big << '\\n';\n    }\n}\n",
   "stdout": "58 58 0\n63 121 1\n61 182 2\n55 237 2\n",
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
     "out": "58 58 0\n63 121 1\n61 182 2\n55 237 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "58 58 0\n63 121 1\n61 182 2\n55 237 2\n",
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
      "out": "58 58 0\n63 121 1\n61 182 2\n55 237 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "braces_parens.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> a{10};      // braces: ONE egg, weighing 10\n    std::vector<int> b(10);      // brackets: TEN eggs, each 0\n    std::cout << \"a has \" << a.size() << \", b has \" << b.size() << '\\n';\n}\n",
   "stdout": "a has 1, b has 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g braces_parens.cpp -o braces_parens",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./braces_parens",
     "out": "a has 1, b has 10\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a has 1, b has 10\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g braces_parens.cpp -o braces_parens",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./braces_parens",
      "out": "a has 1, b has 10\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "carton_ops.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58};\n    eggs.push_back(65);\n    eggs.push_back(70);\n    eggs.pop_back();\n    std::cout << eggs.size() << \" eggs, front \" << eggs.front() << \", back \" << eggs.back() << '\\n';\n}\n",
   "stdout": "3 eggs, front 62, back 65\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g carton_ops.cpp -o carton_ops",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./carton_ops",
     "out": "3 eggs, front 62, back 65\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 eggs, front 62, back 65\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g carton_ops.cpp -o carton_ops",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./carton_ops",
      "out": "3 eggs, front 62, back 65\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "dangle.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    int& first{eggs[0]};          // a finger on egg 0\n    eggs.push_back(70);           // the carton is full: a bigger one!\n    std::cout << \"first egg: \" << first << '\\n';\n}\n",
   "stdout": "",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x55555555e918 bp 0x7fffffffead0 sp 0x7fffffffeac0\nREAD of size 4 at 0x502000000010 thread T0\n    #0 0x55555555e917 in main /home/you/cpp-ch8/dangle.cpp:8\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x555555562cc0 in std::__new_allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/new_allocator.h:172\n    #2 0x555555560603 in std::allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/allocator.h:210\n    #3 0x555555560603 in std::allocator_traits<std::allocator<int> >::deallocate(std::allocator<int>&, int*, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:517\n    #4 0x555555560603 in std::_Vector_base<int, std::allocator<int> >::_M_deallocate(int*, unsigned long) /usr/include/c++/13/bits/stl_vector.h:390\n    #5 0x555555561f71 in void std::vector<int, std::allocator<int> >::_M_realloc_insert<int>(__gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >, int&&) /usr/include/c++/13/bits/vector.tcc:519\n    #6 0x555555560b6b in int& std::vector<int, std::allocator<int> >::emplace_back<int>(int&&) /usr/include/c++/13/bits/vector.tcc:123\n    #7 0x555555560507 in std::vector<int, std::allocator<int> >::push_back(int&&) /usr/include/c++/13/bits/stl_vector.h:1299\n    #8 0x55555555e768 in main /home/you/cpp-ch8/dangle.cpp:7\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x555555560294 in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555fed2 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555fed2 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555fed2 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555f44d in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555ec59 in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555e678 in main /home/you/cpp-ch8/dangle.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /home/you/cpp-ch8/dangle.cpp:8 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer dangle.cpp -o dangle",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dangle",
     "out": "",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x55555555e918 bp 0x7fffffffead0 sp 0x7fffffffeac0\nREAD of size 4 at 0x502000000010 thread T0\n    #0 0x55555555e917 in main /home/you/cpp-ch8/dangle.cpp:8\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\n0x502000000010 is located 0 bytes inside of 12-byte region [0x502000000010,0x50200000001c)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x555555562cc0 in std::__new_allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/new_allocator.h:172\n    #2 0x555555560603 in std::allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/allocator.h:210\n    #3 0x555555560603 in std::allocator_traits<std::allocator<int> >::deallocate(std::allocator<int>&, int*, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:517\n    #4 0x555555560603 in std::_Vector_base<int, std::allocator<int> >::_M_deallocate(int*, unsigned long) /usr/include/c++/13/bits/stl_vector.h:390\n    #5 0x555555561f71 in void std::vector<int, std::allocator<int> >::_M_realloc_insert<int>(__gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >, int&&) /usr/include/c++/13/bits/vector.tcc:519\n    #6 0x555555560b6b in int& std::vector<int, std::allocator<int> >::emplace_back<int>(int&&) /usr/include/c++/13/bits/vector.tcc:123\n    #7 0x555555560507 in std::vector<int, std::allocator<int> >::push_back(int&&) /usr/include/c++/13/bits/stl_vector.h:1299\n    #8 0x55555555e768 in main /home/you/cpp-ch8/dangle.cpp:7\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x555555560294 in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555fed2 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555fed2 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555fed2 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555f44d in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555ec59 in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555e678 in main /home/you/cpp-ch8/dangle.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555e404 in _start (/home/you/cpp-ch8/dangle+0xa404) (BuildId: b72f6e1379f84883aa612ccd6e38f7e2f8002037)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /home/you/cpp-ch8/dangle.cpp:8 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
     "exit": 1
    }
   ]
  },
  "dangle_fixed.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    eggs.push_back(70);           // grow first...\n    int& first{eggs[0]};          // ...then point at the egg\n    std::cout << \"first egg: \" << first << '\\n';\n}\n",
   "stdout": "first egg: 62\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g dangle_fixed.cpp -o dangle_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dangle_fixed",
     "out": "first egg: 62\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "first egg: 62\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g dangle_fixed.cpp -o dangle_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./dangle_fixed",
      "out": "first egg: 62\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "dangle_reserve.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    eggs.reserve(10);\n    int& first{eggs[0]};          // a finger on egg 0\n    eggs.push_back(70);           // the carton is full: a bigger one!\n    std::cout << \"first egg: \" << first << '\\n';\n}\n",
   "stdout": "first egg: 62\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer dangle_reserve.cpp -o dangle_reserve",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dangle_reserve",
     "out": "first egg: 62\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "double_copy.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    for (auto x : eggs) {\n        x *= 2;                  // double every egg?\n    }\n    for (int egg : eggs) {\n        std::cout << egg << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "62 58 65 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g double_copy.cpp -o double_copy",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./double_copy",
     "out": "62 58 65 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "62 58 65 \n",
    "stderr": "double_copy.cpp:6:15: warning: variable 'x' set but not used [-Wunused-but-set-variable]\n    6 |     for (auto x : eggs) {\n      |               ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g double_copy.cpp -o double_copy",
      "out": "",
      "err": "double_copy.cpp:6:15: warning: variable 'x' set but not used [-Wunused-but-set-variable]\n    6 |     for (auto x : eggs) {\n      |               ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./double_copy",
      "out": "62 58 65 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "double_ref.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    for (auto& x : eggs) {\n        x *= 2;                  // x is a nickname for each egg\n    }\n    for (int egg : eggs) {\n        std::cout << egg << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "124 116 130 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g double_ref.cpp -o double_ref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./double_ref",
     "out": "124 116 130 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "124 116 130 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g double_ref.cpp -o double_ref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./double_ref",
      "out": "124 116 130 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "erase_cracked.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 0, 58, 0, 65};    // 0 marks a cracked egg\n    auto gone{std::erase(eggs, 0)};             // C++20: remove every 0\n    std::cout << \"removed \" << gone << \", left \" << eggs.size() << ':';\n    for (int egg : eggs) {\n        std::cout << ' ' << egg;\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "removed 2, left 3: 62 58 65\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g erase_cracked.cpp -o erase_cracked",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./erase_cracked",
     "out": "removed 2, left 3: 62 58 65\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "removed 2, left 3: 62 58 65\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g erase_cracked.cpp -o erase_cracked",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./erase_cracked",
      "out": "removed 2, left 3: 62 58 65\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "first_vector.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};      // egg weights in grams\n    std::cout << \"size: \" << eggs.size() << '\\n';\n    std::cout << \"cup 0: \" << eggs[0] << \", cup 2: \" << eggs[2] << '\\n';\n    eggs.push_back(70);                     // a new egg at the end\n    std::cout << \"size: \" << eggs.size() << \", last: \" << eggs.back() << '\\n';\n}\n",
   "stdout": "size: 3\ncup 0: 62, cup 2: 65\nsize: 4, last: 70\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g first_vector.cpp -o first_vector",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./first_vector",
     "out": "size: 3\ncup 0: 62, cup 2: 65\nsize: 4, last: 70\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "size: 3\ncup 0: 62, cup 2: 65\nsize: 4, last: 70\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g first_vector.cpp -o first_vector",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./first_vector",
      "out": "size: 3\ncup 0: 62, cup 2: 65\nsize: 4, last: 70\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "grid.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<char>> tray{\n        {'o', 'o', '.'},\n        {'.', 'o', 'o'},\n    };\n    tray[1][0] = 'o';                 // row 1, cup 0 gets an egg\n    for (const auto& row : tray) {\n        for (char cup : row) {\n            std::cout << cup << ' ';\n        }\n        std::cout << '\\n';\n    }\n}\n",
   "stdout": "o o . \no o o \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grid.cpp -o grid",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grid",
     "out": "o o . \no o o \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "o o . \no o o \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grid.cpp -o grid",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grid",
      "out": "o o . \no o o \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "grid_quiz.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> g{{1, 2, 3}, {4, 5, 6}};\n    g[0][2] = 9;\n    std::cout << g.size() << ' ' << g[1].size() << ' ' << g[0][2] + g[1][0] << '\\n';\n}\n",
   "stdout": "2 3 13\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grid_quiz.cpp -o grid_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grid_quiz",
     "out": "2 3 13\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 3 13\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grid_quiz.cpp -o grid_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grid_quiz",
      "out": "2 3 13\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "grow.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs;\n    for (int egg : {62, 58, 65, 70, 61}) {\n        eggs.push_back(egg);\n        std::cout << \"size \" << eggs.size() << \", capacity \" << eggs.capacity() << '\\n';\n    }\n}\n",
   "stdout": "size 1, capacity 1\nsize 2, capacity 2\nsize 3, capacity 4\nsize 4, capacity 4\nsize 5, capacity 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grow.cpp -o grow",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grow",
     "out": "size 1, capacity 1\nsize 2, capacity 2\nsize 3, capacity 4\nsize 4, capacity 4\nsize 5, capacity 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "size 1, capacity 1\nsize 2, capacity 2\nsize 3, capacity 4\nsize 4, capacity 4\nsize 5, capacity 8\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grow.cpp -o grow",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grow",
      "out": "size 1, capacity 1\nsize 2, capacity 2\nsize 3, capacity 4\nsize 4, capacity 4\nsize 5, capacity 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "grow_reserve.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs;\n    eggs.reserve(5);\n    for (int egg : {62, 58, 65, 70, 61}) {\n        eggs.push_back(egg);\n        std::cout << \"size \" << eggs.size() << \", capacity \" << eggs.capacity() << '\\n';\n    }\n}\n",
   "stdout": "size 1, capacity 5\nsize 2, capacity 5\nsize 3, capacity 5\nsize 4, capacity 5\nsize 5, capacity 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grow_reserve.cpp -o grow_reserve",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grow_reserve",
     "out": "size 1, capacity 5\nsize 2, capacity 5\nsize 3, capacity 5\nsize 4, capacity 5\nsize 5, capacity 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "size 1, capacity 5\nsize 2, capacity 5\nsize 3, capacity 5\nsize 4, capacity 5\nsize 5, capacity 5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grow_reserve.cpp -o grow_reserve",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grow_reserve",
      "out": "size 1, capacity 5\nsize 2, capacity 5\nsize 3, capacity 5\nsize 4, capacity 5\nsize 5, capacity 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "guests_parsons.cpp": {
   "src": "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> eggs;\n    eggs.push_back(61);\n    eggs.push_back(59);\n    std::cout << eggs.size() << \" eggs\\n\";\n    std::cout << \"last: \" << eggs.back() << '\\n';\n}\n",
   "stdout": "2 eggs\nlast: 59\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g guests_parsons.cpp -o guests_parsons",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./guests_parsons",
     "out": "2 eggs\nlast: 59\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 eggs\nlast: 59\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g guests_parsons.cpp -o guests_parsons",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./guests_parsons",
      "out": "2 eggs\nlast: 59\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "index_ssize.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    for (int i{0}; i < std::ssize(eggs); ++i) {\n        std::cout << \"cup \" << i << \": \" << eggs[i] << '\\n';\n    }\n}\n",
   "stdout": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g index_ssize.cpp -o index_ssize",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./index_ssize",
     "out": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g index_ssize.cpp -o index_ssize",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./index_ssize",
      "out": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "index_warn.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    for (int i{0}; i < eggs.size(); ++i) {\n        std::cout << \"cup \" << i << \": \" << eggs[i] << '\\n';\n    }\n}\n",
   "stdout": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
   "stderr": "index_warn.cpp: In function ‘int main()’:\nindex_warn.cpp:6:22: warning: comparison of integer expressions of different signedness: ‘int’ and ‘std::vector<int>::size_type’ {aka ‘long unsigned int’} [-Wsign-compare]\n    6 |     for (int i{0}; i < eggs.size(); ++i) {\n      |                    ~~^~~~~~~~~~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g index_warn.cpp -o index_warn",
     "out": "",
     "err": "index_warn.cpp: In function ‘int main()’:\nindex_warn.cpp:6:22: warning: comparison of integer expressions of different signedness: ‘int’ and ‘std::vector<int>::size_type’ {aka ‘long unsigned int’} [-Wsign-compare]\n    6 |     for (int i{0}; i < eggs.size(); ++i) {\n      |                    ~~^~~~~~~~~~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./index_warn",
     "out": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
    "stderr": "index_warn.cpp:6:22: warning: comparison of integers of different signs: 'int' and 'size_type' (aka 'unsigned long') [-Wsign-compare]\n    6 |     for (int i{0}; i < eggs.size(); ++i) {\n      |                    ~ ^ ~~~~~~~~~~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g index_warn.cpp -o index_warn",
      "out": "",
      "err": "index_warn.cpp:6:22: warning: comparison of integers of different signs: 'int' and 'size_type' (aka 'unsigned long') [-Wsign-compare]\n    6 |     for (int i{0}; i < eggs.size(); ++i) {\n      |                    ~ ^ ~~~~~~~~~~~\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./index_warn",
      "out": "cup 0: 62\ncup 1: 58\ncup 2: 65\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "members.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::vector<int> none{};\n    std::cout << std::boolalpha;\n    std::cout << \"eggs.size() -> \" << eggs.size() << '\\n';\n    std::cout << \"eggs.front() -> \" << eggs.front() << '\\n';\n    std::cout << \"eggs.back() -> \" << eggs.back() << '\\n';\n    std::cout << \"eggs[1] -> \" << eggs[1] << '\\n';\n    std::cout << \"eggs.empty() -> \" << eggs.empty() << '\\n';\n    std::cout << \"none.empty() -> \" << none.empty() << '\\n';\n}\n",
   "stdout": "eggs.size() -> 3\neggs.front() -> 62\neggs.back() -> 65\neggs[1] -> 58\neggs.empty() -> false\nnone.empty() -> true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g members.cpp -o members",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./members",
     "out": "eggs.size() -> 3\neggs.front() -> 62\neggs.back() -> 65\neggs[1] -> 58\neggs.empty() -> false\nnone.empty() -> true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "eggs.size() -> 3\neggs.front() -> 62\neggs.back() -> 65\neggs[1] -> 58\neggs.empty() -> false\nnone.empty() -> true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g members.cpp -o members",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./members",
      "out": "eggs.size() -> 3\neggs.front() -> 62\neggs.back() -> 65\neggs[1] -> 58\neggs.empty() -> false\nnone.empty() -> true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "min_trace.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{64, 59, 66, 52, 57};\n    int smallest{eggs[0]};\n    for (int egg : eggs) {\n        if (egg < smallest) {\n            smallest = egg;\n        }\n        std::cout << egg << ' ' << smallest << '\\n';\n    }\n}\n",
   "stdout": "64 64\n59 59\n66 59\n52 52\n57 52\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g min_trace.cpp -o min_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./min_trace",
     "out": "64 64\n59 59\n66 59\n52 52\n57 52\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "64 64\n59 59\n66 59\n52 52\n57 52\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g min_trace.cpp -o min_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./min_trace",
      "out": "64 64\n59 59\n66 59\n52 52\n57 52\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "names_const.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> names{\"Robert\", \"Wren\", \"Bob\"};\n    for (const auto& name : names) {     // look, don't copy, don't touch\n        std::cout << name << \" has \" << name.size() << \" letters\\n\";\n    }\n}\n",
   "stdout": "Robert has 6 letters\nWren has 4 letters\nBob has 3 letters\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g names_const.cpp -o names_const",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./names_const",
     "out": "Robert has 6 letters\nWren has 4 letters\nBob has 3 letters\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Robert has 6 letters\nWren has 4 letters\nBob has 3 letters\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g names_const.cpp -o names_const",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./names_const",
      "out": "Robert has 6 letters\nWren has 4 letters\nBob has 3 letters\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "nickname.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int robert{40};       // Robert's age\n    int& bob{robert};     // bob: another name for robert\n\n    std::cout << \"Robert is \" << robert << \", Bob is \" << bob << '\\n';\n    bob = 41;             // Bob has a birthday...\n    std::cout << \"Robert is \" << robert << \", Bob is \" << bob << '\\n';\n}\n",
   "stdout": "Robert is 40, Bob is 40\nRobert is 41, Bob is 41\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g nickname.cpp -o nickname",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./nickname",
     "out": "Robert is 40, Bob is 40\nRobert is 41, Bob is 41\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Robert is 40, Bob is 40\nRobert is 41, Bob is 41\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g nickname.cpp -o nickname",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./nickname",
      "out": "Robert is 40, Bob is 40\nRobert is 41, Bob is 41\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "nickname_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{10};\n    int& points{score};\n    points += 5;\n    score = score * 2;\n    std::cout << score << ' ' << points << '\\n';\n}\n",
   "stdout": "30 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g nickname_quiz.cpp -o nickname_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./nickname_quiz",
     "out": "30 30\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "30 30\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g nickname_quiz.cpp -o nickname_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./nickname_quiz",
      "out": "30 30\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "pass_vector.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint total(const std::vector<int>& eggs) {      // look, don't copy\n    int sum{0};\n    for (int egg : eggs) {\n        sum += egg;\n    }\n    return sum;\n}\n\nstd::vector<int> doubled(const std::vector<int>& eggs) {\n    std::vector<int> result;\n    for (int egg : eggs) {\n        result.push_back(egg * 2);\n    }\n    return result;                              // a whole new carton\n}\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::vector<int> big{doubled(eggs)};\n    std::cout << \"eggs: \" << total(eggs) << \"g, big: \" << total(big) << \"g\\n\";\n}\n",
   "stdout": "eggs: 185g, big: 370g\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pass_vector.cpp -o pass_vector",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pass_vector",
     "out": "eggs: 185g, big: 370g\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "eggs: 185g, big: 370g\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pass_vector.cpp -o pass_vector",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pass_vector",
      "out": "eggs: 185g, big: 370g\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "past_end.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::cout << \"size: \" << eggs.size() << std::endl;\n    std::cout << \"cup 3: \" << eggs[3] << '\\n';\n}\n",
   "stdout": "size: 3\n",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c at pc 0x55555555aad7 bp 0x7fffffffeac0 sp 0x7fffffffeab0\nREAD of size 4 at 0x50200000001c thread T0\n    #0 0x55555555aad6 in main /home/you/cpp-ch8/past_end.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\n0x50200000001c is located 0 bytes after 12-byte region [0x502000000010,0x50200000001c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555c35e in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555c066 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555c066 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555c066 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555b5e1 in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555aded in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555a6b8 in main /home/you/cpp-ch8/past_end.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch8/past_end.cpp:7 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer past_end.cpp -o past_end",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./past_end",
     "out": "size: 3\n",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c at pc 0x55555555aad7 bp 0x7fffffffeac0 sp 0x7fffffffeab0\nREAD of size 4 at 0x50200000001c thread T0\n    #0 0x55555555aad6 in main /home/you/cpp-ch8/past_end.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\n0x50200000001c is located 0 bytes after 12-byte region [0x502000000010,0x50200000001c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555c35e in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555c066 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555c066 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555c066 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555b5e1 in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555aded in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555a6b8 in main /home/you/cpp-ch8/past_end.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch8/past_end.cpp:7 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
     "exit": 1,
     "merged": "size: 3\n=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c at pc 0x55555555aad7 bp 0x7fffffffeac0 sp 0x7fffffffeab0\nREAD of size 4 at 0x50200000001c thread T0\n    #0 0x55555555aad6 in main /home/you/cpp-ch8/past_end.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\n0x50200000001c is located 0 bytes after 12-byte region [0x502000000010,0x50200000001c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555c35e in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555c066 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555c066 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555c066 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555b5e1 in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555aded in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555a6b8 in main /home/you/cpp-ch8/past_end.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555a444 in _start (/home/you/cpp-ch8/past_end+0x6444) (BuildId: 2d6105b29bb64ffaccfd79ad92de565dd44f053d)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch8/past_end.cpp:7 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n"
    }
   ]
  },
  "past_end_checked.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::cout << \"size: \" << eggs.size() << std::endl;\n    std::cout << \"cup 3: \" << eggs[3] << '\\n';\n}\n",
   "stdout": "size: 3\n",
   "stderr": "/usr/include/c++/13/bits/stl_vector.h:1128: constexpr std::vector<_Tp, _Alloc>::reference std::vector<_Tp, _Alloc>::operator[](size_type) [with _Tp = int; _Alloc = std::allocator<int>; reference = int&; size_type = long unsigned int]: Assertion '__n < this->size()' failed.\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -D_GLIBCXX_ASSERTIONS past_end_checked.cpp -o past_end_checked",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./past_end_checked",
     "out": "size: 3\n",
     "err": "/usr/include/c++/13/bits/stl_vector.h:1128: constexpr std::vector<_Tp, _Alloc>::reference std::vector<_Tp, _Alloc>::operator[](size_type) [with _Tp = int; _Alloc = std::allocator<int>; reference = int&; size_type = long unsigned int]: Assertion '__n < this->size()' failed.\nAborted\n",
     "exit": 134,
     "merged": "size: 3\n/usr/include/c++/13/bits/stl_vector.h:1128: constexpr std::vector<_Tp, _Alloc>::reference std::vector<_Tp, _Alloc>::operator[](size_type) [with _Tp = int; _Alloc = std::allocator<int>; reference = int&; size_type = long unsigned int]: Assertion '__n < this->size()' failed.\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "size: 3\n",
    "stderr": "/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_vector.h:1128: reference std::vector<int>::operator[](size_type) [_Tp = int, _Alloc = std::allocator<int>]: Assertion '__n < this->size()' failed.\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -D_GLIBCXX_ASSERTIONS past_end_checked.cpp -o past_end_checked",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./past_end_checked",
      "out": "size: 3\n",
      "err": "/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_vector.h:1128: reference std::vector<int>::operator[](size_type) [_Tp = int, _Alloc = std::allocator<int>]: Assertion '__n < this->size()' failed.\nAborted\n",
      "exit": 134,
      "merged": "size: 3\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_vector.h:1128: reference std::vector<int>::operator[](size_type) [_Tp = int, _Alloc = std::allocator<int>]: Assertion '__n < this->size()' failed.\nAborted\n"
     }
    ]
   }
  },
  "print_vector_head.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    std::cout << eggs << '\\n';\n}\n",
   "stdout": "print_vector_head.cpp: In function ‘int main()’:\nprint_vector_head.cpp:6:15: error: no match for ‘operator<<’ (operand types are ‘std::ostream’ {aka ‘std::basic_ostream<char>’} and ‘std::vector<int>’)\n    6 |     std::cout << eggs << '\\n';\n      |     ~~~~~~~~~ ^~ ~~~~\n      |          |       |\n      |          |       std::vector<int>\n      |          std::ostream {aka std::basic_ostream<char>}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g print_vector_head.cpp -o print_vector_head 2>&1 | head -n 7",
     "out": "print_vector_head.cpp: In function ‘int main()’:\nprint_vector_head.cpp:6:15: error: no match for ‘operator<<’ (operand types are ‘std::ostream’ {aka ‘std::basic_ostream<char>’} and ‘std::vector<int>’)\n    6 |     std::cout << eggs << '\\n';\n      |     ~~~~~~~~~ ^~ ~~~~\n      |          |       |\n      |          |       std::vector<int>\n      |          std::ostream {aka std::basic_ostream<char>}\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "print_vector_head.cpp:6:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and 'std::vector<int>')\n    6 |     std::cout << eggs << '\\n';\n      |     ~~~~~~~~~ ^  ~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: no known conversion from 'std::vector<int>' to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: no known conversion from 'std::vector<int>' to 'char' for 2nd argument\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g print_vector_head.cpp -o print_vector_head 2>&1 | head -n 7",
      "out": "print_vector_head.cpp:6:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and 'std::vector<int>')\n    6 |     std::cout << eggs << '\\n';\n      |     ~~~~~~~~~ ^  ~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: no known conversion from 'std::vector<int>' to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: no known conversion from 'std::vector<int>' to 'char' for 2nd argument\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "push_pop_quiz.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v;\n    v.push_back(4);\n    v.push_back(8);\n    v.pop_back();\n    v.push_back(1);\n    v.push_back(9);\n    std::cout << v.size() << ' ' << v.front() << ' ' << v.back() << '\\n';\n}\n",
   "stdout": "3 4 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g push_pop_quiz.cpp -o push_pop_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./push_pop_quiz",
     "out": "3 4 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 4 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g push_pop_quiz.cpp -o push_pop_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./push_pop_quiz",
      "out": "3 4 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "range_for.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65};\n    for (int egg : eggs) {\n        std::cout << egg << \"g \";\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "62g 58g 65g \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g range_for.cpp -o range_for",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./range_for",
     "out": "62g 58g 65g \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "62g 58g 65g \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g range_for.cpp -o range_for",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./range_for",
      "out": "62g 58g 65g \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ref_uninit.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int robert{40};\n    int& bob;             // a nickname for... nobody?\n    bob = robert;\n    std::cout << bob << '\\n';\n}\n",
   "stdout": "",
   "stderr": "ref_uninit.cpp: In function ‘int main()’:\nref_uninit.cpp:5:10: error: ‘bob’ declared as reference but not initialized\n    5 |     int& bob;             // a nickname for... nobody?\n      |          ^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ref_uninit.cpp -o ref_uninit",
     "out": "",
     "err": "ref_uninit.cpp: In function ‘int main()’:\nref_uninit.cpp:5:10: error: ‘bob’ declared as reference but not initialized\n    5 |     int& bob;             // a nickname for... nobody?\n      |          ^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "ref_uninit.cpp:5:10: error: declaration of reference variable 'bob' requires an initializer\n    5 |     int& bob;             // a nickname for... nobody?\n      |          ^~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ref_uninit.cpp -o ref_uninit",
      "out": "",
      "err": "ref_uninit.cpp:5:10: error: declaration of reference variable 'bob' requires an initializer\n    5 |     int& bob;             // a nickname for... nobody?\n      |          ^~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "reseat.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int robert{40};\n    int james{25};\n    int& bob{robert};\n\n    bob = james;          // does bob now mean james?\n    james = 99;\n    std::cout << \"robert \" << robert << \", james \" << james << \", bob \" << bob << '\\n';\n}\n",
   "stdout": "robert 25, james 99, bob 25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g reseat.cpp -o reseat",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./reseat",
     "out": "robert 25, james 99, bob 25\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "robert 25, james 99, bob 25\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g reseat.cpp -o reseat",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./reseat",
      "out": "robert 25, james 99, bob 25\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "reserve_resize.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> a;\n    a.reserve(10);               // room for 10, but no eggs yet\n    std::cout << \"a: size \" << a.size() << \", capacity \" << a.capacity() << '\\n';\n\n    std::vector<int> b;\n    b.resize(3);                 // 3 real eggs, each 0\n    std::cout << \"b: size \" << b.size() << \", b[2] is \" << b[2] << '\\n';\n\n    b.clear();                   // empty the carton, keep the carton\n    std::cout << \"b: size \" << b.size() << \", capacity \" << b.capacity() << '\\n';\n}\n",
   "stdout": "a: size 0, capacity 10\nb: size 3, b[2] is 0\nb: size 0, capacity 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g reserve_resize.cpp -o reserve_resize",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./reserve_resize",
     "out": "a: size 0, capacity 10\nb: size 3, b[2] is 0\nb: size 0, capacity 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a: size 0, capacity 10\nb: size 3, b[2] is 0\nb: size 0, capacity 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g reserve_resize.cpp -o reserve_resize",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./reserve_resize",
      "out": "a: size 0, capacity 10\nb: size 3, b[2] is 0\nb: size 0, capacity 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "resize_quiz.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{5, 6, 7, 8};\n    v.resize(2);\n    v.push_back(9);\n    std::cout << v.size() << \": \" << v[0] << ' ' << v[1] << ' ' << v[2] << '\\n';\n}\n",
   "stdout": "3: 5 6 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g resize_quiz.cpp -o resize_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./resize_quiz",
     "out": "3: 5 6 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3: 5 6 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g resize_quiz.cpp -o resize_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./resize_quiz",
      "out": "3: 5 6 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "return_local.cpp": {
   "src": "#include <iostream>\n\nconst int& bigger(int a, int b) {   // \"saves a copy\"... or does it?\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    const int& winner{bigger(3, 8)};\n    std::cout << \"winner: \" << winner << '\\n';\n}\n",
   "stdout": "",
   "stderr": "return_local.cpp: In function ‘const int& bigger(int, int)’:\nreturn_local.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g return_local.cpp -o return_local",
     "out": "",
     "err": "return_local.cpp: In function ‘const int& bigger(int, int)’:\nreturn_local.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\n",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "return_local.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g return_local.cpp -o return_local",
      "out": "",
      "err": "return_local.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
      "exit": 0
     }
    ]
   }
  },
  "return_local_clang.cpp": {
   "src": "#include <iostream>\n\nconst int& bigger(int a, int b) {   // \"saves a copy\"... or does it?\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    const int& winner{bigger(3, 8)};\n    std::cout << \"winner: \" << winner << '\\n';\n}\n",
   "stdout": "",
   "stderr": "return_local_clang.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g return_local_clang.cpp -o return_local_clang",
     "out": "",
     "err": "return_local_clang.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
     "exit": 0
    }
   ]
  },
  "return_local_ref.cpp": {
   "src": "#include <iostream>\n\nint& bigger(int a, int b) {\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    std::cout << \"winner: \" << bigger(3, 8) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "return_local_ref.cpp: In function ‘int& bigger(int, int)’:\nreturn_local_ref.cpp:5:12: error: cannot bind non-const lvalue reference of type ‘int&’ to an rvalue of type ‘int’\n    5 |     return local;\n      |            ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g return_local_ref.cpp -o return_local_ref",
     "out": "",
     "err": "return_local_ref.cpp: In function ‘int& bigger(int, int)’:\nreturn_local_ref.cpp:5:12: error: cannot bind non-const lvalue reference of type ‘int&’ to an rvalue of type ‘int’\n    5 |     return local;\n      |            ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "return_local_ref.cpp:5:12: error: non-const lvalue reference to type 'int' cannot bind to a temporary of type 'int'\n    5 |     return local;\n      |            ^~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g return_local_ref.cpp -o return_local_ref",
      "out": "",
      "err": "return_local_ref.cpp:5:12: error: non-const lvalue reference to type 'int' cannot bind to a temporary of type 'int'\n    5 |     return local;\n      |            ^~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "return_local_ref20.cpp": {
   "src": "#include <iostream>\n\nint& bigger(int a, int b) {\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    std::cout << \"winner: \" << bigger(3, 8) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "return_local_ref20.cpp: In function ‘int& bigger(int, int)’:\nreturn_local_ref20.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local_ref20.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++20 -Wall -Wextra -g return_local_ref20.cpp -o return_local_ref20",
     "out": "",
     "err": "return_local_ref20.cpp: In function ‘int& bigger(int, int)’:\nreturn_local_ref20.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local_ref20.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\n",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "return_local_ref20.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++20 -Wall -Wextra -g return_local_ref20.cpp -o return_local_ref20",
      "out": "",
      "err": "return_local_ref20.cpp:5:12: warning: reference to stack memory associated with local variable 'local' returned [-Wreturn-stack-address]\n    5 |     return local;\n      |            ^~~~~\n1 warning generated.\n",
      "exit": 0
     }
    ]
   }
  },
  "return_local_san.cpp": {
   "src": "#include <iostream>\n\nconst int& bigger(int a, int b) {   // \"saves a copy\"... or does it?\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    const int& winner{bigger(3, 8)};\n    std::cout << \"winner: \" << winner << '\\n';\n}\n",
   "stdout": "",
   "stderr": "return_local_san.cpp: In function ‘const int& bigger(int, int)’:\nreturn_local_san.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local_san.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\nreturn_local_san.cpp:5:12: runtime error: reference binding to null pointer of type 'const int'\n    #0 0x5555555563a1 in bigger(int, int) /home/you/cpp-ch8/return_local_san.cpp:5\n    #1 0x5555555563bd in main /home/you/cpp-ch8/return_local_san.cpp:9\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x555555556204 in _start (/home/you/cpp-ch8/return_local_san+0x2204) (BuildId: b4a39e4411a26138efb719b8055848ff1030c862)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer return_local_san.cpp -o return_local_san",
     "out": "",
     "err": "return_local_san.cpp: In function ‘const int& bigger(int, int)’:\nreturn_local_san.cpp:5:12: warning: reference to local variable ‘local’ returned [-Wreturn-local-addr]\n    5 |     return local;\n      |            ^~~~~\nreturn_local_san.cpp:4:9: note: declared here\n    4 |     int local{a > b ? a : b};\n      |         ^~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./return_local_san",
     "out": "",
     "err": "return_local_san.cpp:5:12: runtime error: reference binding to null pointer of type 'const int'\n    #0 0x5555555563a1 in bigger(int, int) /home/you/cpp-ch8/return_local_san.cpp:5\n    #1 0x5555555563bd in main /home/you/cpp-ch8/return_local_san.cpp:9\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x555555556204 in _start (/home/you/cpp-ch8/return_local_san+0x2204) (BuildId: b4a39e4411a26138efb719b8055848ff1030c862)\n\n",
     "exit": 1
    }
   ]
  },
  "return_value.cpp": {
   "src": "#include <iostream>\n\nint bigger(int a, int b) {          // returns a value: a fresh copy\n    int local{a > b ? a : b};\n    return local;\n}\n\nint main() {\n    int winner{bigger(3, 8)};\n    std::cout << \"winner: \" << winner << '\\n';\n}\n",
   "stdout": "winner: 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g return_value.cpp -o return_value",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./return_value",
     "out": "winner: 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "winner: 8\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g return_value.cpp -o return_value",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./return_value",
      "out": "winner: 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "running_max.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 71, 65};\n    int best{eggs[0]};\n    for (int egg : eggs) {\n        if (egg > best) {\n            best = egg;\n        }\n    }\n    std::cout << \"biggest egg: \" << best << \"g\\n\";\n}\n",
   "stdout": "biggest egg: 71g\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g running_max.cpp -o running_max",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./running_max",
     "out": "biggest egg: 71g\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "biggest egg: 71g\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g running_max.cpp -o running_max",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./running_max",
      "out": "biggest egg: 71g\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "shopping.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> list{\"eggs\", \"flour\"};\n    list.push_back(\"milk\");\n    for (int i{0}; i < std::ssize(list); ++i) {\n        std::cout << i + 1 << \". \" << list[i] << '\\n';\n    }\n    std::cout << \"first item has \" << list[0].size() << \" letters\\n\";\n}\n",
   "stdout": "1. eggs\n2. flour\n3. milk\nfirst item has 4 letters\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g shopping.cpp -o shopping",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./shopping",
     "out": "1. eggs\n2. flour\n3. milk\nfirst item has 4 letters\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1. eggs\n2. flour\n3. milk\nfirst item has 4 letters\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g shopping.cpp -o shopping",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./shopping",
      "out": "1. eggs\n2. flour\n3. milk\nfirst item has 4 letters\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_bonus.cpp": {
   "src": "#include <iostream>\n\nvoid add_bonus(int score) {\n    score += 10;\n}\n\nint main() {\n    int points{50};\n    add_bonus(points);\n    std::cout << \"points: \" << points << '\\n';\n}\n",
   "stdout": "points: 50\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_bonus.cpp -o spot_bonus",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_bonus",
     "out": "points: 50\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "points: 50\n",
    "stderr": "spot_bonus.cpp:3:20: warning: parameter 'score' set but not used [-Wunused-but-set-parameter]\n    3 | void add_bonus(int score) {\n      |                    ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_bonus.cpp -o spot_bonus",
      "out": "",
      "err": "spot_bonus.cpp:3:20: warning: parameter 'score' set but not used [-Wunused-but-set-parameter]\n    3 | void add_bonus(int score) {\n      |                    ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./spot_bonus",
      "out": "points: 50\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_dangle.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tickets{101, 102};\n    int& next{tickets[0]};\n    tickets.push_back(103);\n    std::cout << \"next up: \" << next << '\\n';\n}\n",
   "stdout": "",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x55555555e8dc bp 0x7fffffffeac0 sp 0x7fffffffeab0\nREAD of size 4 at 0x502000000010 thread T0\n    #0 0x55555555e8db in main /home/you/cpp-ch8/spot_dangle.cpp:8\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\n0x502000000010 is located 0 bytes inside of 8-byte region [0x502000000010,0x502000000018)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x555555562c84 in std::__new_allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/new_allocator.h:172\n    #2 0x5555555605c7 in std::allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/allocator.h:210\n    #3 0x5555555605c7 in std::allocator_traits<std::allocator<int> >::deallocate(std::allocator<int>&, int*, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:517\n    #4 0x5555555605c7 in std::_Vector_base<int, std::allocator<int> >::_M_deallocate(int*, unsigned long) /usr/include/c++/13/bits/stl_vector.h:390\n    #5 0x555555561f35 in void std::vector<int, std::allocator<int> >::_M_realloc_insert<int>(__gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >, int&&) /usr/include/c++/13/bits/vector.tcc:519\n    #6 0x555555560b2f in int& std::vector<int, std::allocator<int> >::emplace_back<int>(int&&) /usr/include/c++/13/bits/vector.tcc:123\n    #7 0x5555555604cb in std::vector<int, std::allocator<int> >::push_back(int&&) /usr/include/c++/13/bits/stl_vector.h:1299\n    #8 0x55555555e72c in main /home/you/cpp-ch8/spot_dangle.cpp:7\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x555555560258 in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555fe96 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555fe96 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555fe96 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555f411 in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555ec1d in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555e63e in main /home/you/cpp-ch8/spot_dangle.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /home/you/cpp-ch8/spot_dangle.cpp:8 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa[fd]fa fa fa 00 00 fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer spot_dangle.cpp -o spot_dangle",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_dangle",
     "out": "",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x55555555e8dc bp 0x7fffffffeac0 sp 0x7fffffffeab0\nREAD of size 4 at 0x502000000010 thread T0\n    #0 0x55555555e8db in main /home/you/cpp-ch8/spot_dangle.cpp:8\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\n0x502000000010 is located 0 bytes inside of 8-byte region [0x502000000010,0x502000000018)\nfreed by thread T0 here:\n    #0 0x7ffff78ff5e8 in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:164\n    #1 0x555555562c84 in std::__new_allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/new_allocator.h:172\n    #2 0x5555555605c7 in std::allocator<int>::deallocate(int*, unsigned long) /usr/include/c++/13/bits/allocator.h:210\n    #3 0x5555555605c7 in std::allocator_traits<std::allocator<int> >::deallocate(std::allocator<int>&, int*, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:517\n    #4 0x5555555605c7 in std::_Vector_base<int, std::allocator<int> >::_M_deallocate(int*, unsigned long) /usr/include/c++/13/bits/stl_vector.h:390\n    #5 0x555555561f35 in void std::vector<int, std::allocator<int> >::_M_realloc_insert<int>(__gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >, int&&) /usr/include/c++/13/bits/vector.tcc:519\n    #6 0x555555560b2f in int& std::vector<int, std::allocator<int> >::emplace_back<int>(int&&) /usr/include/c++/13/bits/vector.tcc:123\n    #7 0x5555555604cb in std::vector<int, std::allocator<int> >::push_back(int&&) /usr/include/c++/13/bits/stl_vector.h:1299\n    #8 0x55555555e72c in main /home/you/cpp-ch8/spot_dangle.cpp:7\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\npreviously allocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x555555560258 in std::__new_allocator<int>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555fe96 in std::allocator<int>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555fe96 in std::allocator_traits<std::allocator<int> >::allocate(std::allocator<int>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555fe96 in std::_Vector_base<int, std::allocator<int> >::_M_allocate(unsigned long) /usr/include/c++/13/bits/stl_vector.h:381\n    #5 0x55555555f411 in void std::vector<int, std::allocator<int> >::_M_range_initialize<int const*>(int const*, int const*, std::forward_iterator_tag) /usr/include/c++/13/bits/stl_vector.h:1692\n    #6 0x55555555ec1d in std::vector<int, std::allocator<int> >::vector(std::initializer_list<int>, std::allocator<int> const&) /usr/include/c++/13/bits/stl_vector.h:682\n    #7 0x55555555e63e in main /home/you/cpp-ch8/spot_dangle.cpp:5\n    #8 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #9 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #10 0x55555555e404 in _start (/home/you/cpp-ch8/spot_dangle+0xa404) (BuildId: f0312d7f20a8059ccf2a8422ff85269ce7cac065)\n\nSUMMARY: AddressSanitizer: heap-use-after-free /home/you/cpp-ch8/spot_dangle.cpp:8 in main\nShadow bytes around the buggy address:\n  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x502000000000: fa fa[fd]fa fa fa 00 00 fa fa fa fa fa fa fa fa\n  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
     "exit": 1
    }
   ]
  },
  "spot_rangefor.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> prices{3, 5, 8};\n    for (int p : prices) {\n        p += 1;\n    }\n    std::cout << prices[0] << ' ' << prices[1] << ' ' << prices[2] << '\\n';\n}\n",
   "stdout": "3 5 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_rangefor.cpp -o spot_rangefor",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_rangefor",
     "out": "3 5 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 5 8\n",
    "stderr": "spot_rangefor.cpp:6:14: warning: variable 'p' set but not used [-Wunused-but-set-variable]\n    6 |     for (int p : prices) {\n      |              ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_rangefor.cpp -o spot_rangefor",
      "out": "",
      "err": "spot_rangefor.cpp:6:14: warning: variable 'p' set but not used [-Wunused-but-set-variable]\n    6 |     for (int p : prices) {\n      |              ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./spot_rangefor",
      "out": "3 5 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "sum_fill.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> eggs{62, 58, 65, 70};\n    int total{0};\n    for (int egg : eggs) {\n        total += egg;\n    }\n    std::cout << \"carton weighs \" << total << \"g\\n\";\n}\n",
   "stdout": "carton weighs 255g\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g sum_fill.cpp -o sum_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./sum_fill",
     "out": "carton weighs 255g\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "carton weighs 255g\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g sum_fill.cpp -o sum_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./sum_fill",
      "out": "carton weighs 255g\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "swap_gdb.cpp": {
   "src": "#include <iostream>\n\nvoid swap_names(int& x, int& y) {\n    int keep{x};\n    x = y;\n    y = keep;\n}\n\nint main() {\n    int a{1};\n    int b{2};\n    swap_names(a, b);\n    std::cout << \"a = \" << a << \", b = \" << b << '\\n';\n}\n",
   "stdout": "Breakpoint 1 at 0x11b9: file swap_gdb.cpp, line 4.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, swap_names (x=@0x7fffffffeb60: 1, y=@0x7fffffffeb64: 2) at swap_gdb.cpp:4\n4\t    int keep{x};\n$1 = (int *) 0x7fffffffeb60\n#1  0x0000555555555216 in main () at swap_gdb.cpp:12\n12\t    swap_names(a, b);\n$2 = (int *) 0x7fffffffeb60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g swap_gdb.cpp -o swap_gdb",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -ex 'break swap_names' -ex run -ex 'print &x' -ex up -ex 'print &a' ./swap_gdb",
     "out": "Breakpoint 1 at 0x11b9: file swap_gdb.cpp, line 4.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, swap_names (x=@0x7fffffffeb60: 1, y=@0x7fffffffeb64: 2) at swap_gdb.cpp:4\n4\t    int keep{x};\n$1 = (int *) 0x7fffffffeb60\n#1  0x0000555555555216 in main () at swap_gdb.cpp:12\n12\t    swap_names(a, b);\n$2 = (int *) 0x7fffffffeb60\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Breakpoint 1 at 0x116c: file swap_gdb.cpp, line 4.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, swap_names (x=@0x7fffffffeb6c: 1, y=@0x7fffffffeb68: 2) at swap_gdb.cpp:4\n4\t    int keep{x};\n$1 = (int *) 0x7fffffffeb6c\n#1  0x00005555555551b3 in main () at swap_gdb.cpp:12\n12\t    swap_names(a, b);\n$2 = (int *) 0x7fffffffeb6c\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g swap_gdb.cpp -o swap_gdb",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -ex 'break swap_names' -ex run -ex 'print &x' -ex up -ex 'print &a' ./swap_gdb",
      "out": "Breakpoint 1 at 0x116c: file swap_gdb.cpp, line 4.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, swap_names (x=@0x7fffffffeb6c: 1, y=@0x7fffffffeb68: 2) at swap_gdb.cpp:4\n4\t    int keep{x};\n$1 = (int *) 0x7fffffffeb6c\n#1  0x00005555555551b3 in main () at swap_gdb.cpp:12\n12\t    swap_names(a, b);\n$2 = (int *) 0x7fffffffeb6c\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "swap_one_ref.cpp": {
   "src": "#include <iostream>\n\nvoid swap_names(int& x, int y) {\n    int keep{x};\n    x = y;\n    y = keep;\n}\n\nint main() {\n    int a{1};\n    int b{2};\n    swap_names(a, b);\n    std::cout << \"a = \" << a << \", b = \" << b << '\\n';\n}\n",
   "stdout": "a = 2, b = 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g swap_one_ref.cpp -o swap_one_ref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./swap_one_ref",
     "out": "a = 2, b = 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a = 2, b = 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g swap_one_ref.cpp -o swap_one_ref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./swap_one_ref",
      "out": "a = 2, b = 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "swap_quiz.cpp": {
   "src": "#include <iostream>\n\nvoid mix(int& x, int y) {\n    x += 10;\n    y += 10;\n}\n\nint main() {\n    int a{1};\n    int b{2};\n    mix(a, b);\n    std::cout << \"a = \" << a << \", b = \" << b << '\\n';\n}\n",
   "stdout": "a = 11, b = 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g swap_quiz.cpp -o swap_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./swap_quiz",
     "out": "a = 11, b = 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a = 11, b = 2\n",
    "stderr": "swap_quiz.cpp:3:22: warning: parameter 'y' set but not used [-Wunused-but-set-parameter]\n    3 | void mix(int& x, int y) {\n      |                      ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g swap_quiz.cpp -o swap_quiz",
      "out": "",
      "err": "swap_quiz.cpp:3:22: warning: parameter 'y' set but not used [-Wunused-but-set-parameter]\n    3 | void mix(int& x, int y) {\n      |                      ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./swap_quiz",
      "out": "a = 11, b = 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "swap_ref.cpp": {
   "src": "#include <iostream>\n\nvoid swap_names(int& x, int& y) {\n    int keep{x};\n    x = y;\n    y = keep;\n}\n\nint main() {\n    int a{1};\n    int b{2};\n    swap_names(a, b);\n    std::cout << \"a = \" << a << \", b = \" << b << '\\n';\n}\n",
   "stdout": "a = 2, b = 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g swap_ref.cpp -o swap_ref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./swap_ref",
     "out": "a = 2, b = 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a = 2, b = 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g swap_ref.cpp -o swap_ref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./swap_ref",
      "out": "a = 2, b = 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "swap_value.cpp": {
   "src": "#include <iostream>\n\nvoid swap_copies(int x, int y) {\n    int keep{x};\n    x = y;\n    y = keep;\n}\n\nint main() {\n    int a{1};\n    int b{2};\n    swap_copies(a, b);\n    std::cout << \"a = \" << a << \", b = \" << b << '\\n';\n}\n",
   "stdout": "a = 1, b = 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g swap_value.cpp -o swap_value",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./swap_value",
     "out": "a = 1, b = 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a = 1, b = 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g swap_value.cpp -o swap_value",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./swap_value",
      "out": "a = 1, b = 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "too_many.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint main() {\n    std::array<int, 3> cups{1, 2, 3, 4};\n    std::cout << cups.size() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "too_many.cpp: In function ‘int main()’:\ntoo_many.cpp:5:39: error: too many initializers for ‘std::array<int, 3>’\n    5 |     std::array<int, 3> cups{1, 2, 3, 4};\n      |                                       ^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g too_many.cpp -o too_many",
     "out": "",
     "err": "too_many.cpp: In function ‘int main()’:\ntoo_many.cpp:5:39: error: too many initializers for ‘std::array<int, 3>’\n    5 |     std::array<int, 3> cups{1, 2, 3, 4};\n      |                                       ^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "too_many.cpp:5:38: error: excess elements in struct initializer\n    5 |     std::array<int, 3> cups{1, 2, 3, 4};\n      |                                      ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g too_many.cpp -o too_many",
      "out": "",
      "err": "too_many.cpp:5:38: error: excess elements in struct initializer\n    5 |     std::array<int, 3> cups{1, 2, 3, 4};\n      |                                      ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "week_array.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint main() {\n    std::array<int, 7> temps{14, 16, 15, 19, 21, 18, 17};   // Mon..Sun\n    int warm{0};\n    for (int t : temps) {\n        if (t >= 18) {\n            ++warm;\n        }\n    }\n    std::cout << temps.size() << \" days, \" << warm << \" warm, Sunday \" << temps.at(6) << '\\n';\n}\n",
   "stdout": "7 days, 3 warm, Sunday 17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g week_array.cpp -o week_array",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./week_array",
     "out": "7 days, 3 warm, Sunday 17\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7 days, 3 warm, Sunday 17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g week_array.cpp -o week_array",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./week_array",
      "out": "7 days, 3 warm, Sunday 17\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
