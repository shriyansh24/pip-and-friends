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
  "workdir": "/home/you/cpp-ch19",
  "versionDifferences": [
   "asif.cpp",
   "asif_O0.cpp",
   "auto_copy.cpp",
   "auto_sign.cpp",
   "binding_count_bad.cpp",
   "checked_bad.cpp",
   "const_member_bad.cpp",
   "consteval_bad.cpp",
   "lab_past_end.cpp",
   "lab_slices_consteval.cpp",
   "label_wrong.cpp",
   "need64.cpp",
   "not_constant.cpp",
   "overflow_ce.cpp",
   "predict_error.cpp",
   "predict_sa.cpp",
   "ptr_reseat_bad.cpp",
   "ptr_write_bad.cpp",
   "read_error.cpp",
   "sealed.cpp",
   "spot_auto.cpp",
   "spot_const.cpp",
   "spot_constexpr.cpp",
   "tuple_get_bad.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): asif.cpp, asif_O0.cpp, auto_copy.cpp, auto_sign.cpp, binding_count_bad.cpp, checked_bad.cpp, const_member_bad.cpp, consteval_bad.cpp, lab_past_end.cpp, lab_slices_consteval.cpp, label_wrong.cpp, need64.cpp, not_constant.cpp, overflow_ce.cpp, predict_error.cpp, predict_sa.cpp, ptr_reseat_bad.cpp, ptr_write_bad.cpp, read_error.cpp, sealed.cpp, spot_auto.cpp, spot_const.cpp, spot_constexpr.cpp, tuple_get_bad.cpp."
 },
 "programs": {
  "alias.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nusing Scores = std::vector<int>;\nusing Scoreboard = std::map<std::string, Scores>;\ntypedef std::map<std::string, Scores> OldScoreboard;\n\nint total(const Scores& s) {\n    int sum{0};\n    for (int x : s) {\n        sum += x;\n    }\n    return sum;\n}\n\nint main() {\n    Scoreboard board{{\"Ada\", {3, 5}}, {\"Bo\", {4, 4, 1}}};\n    OldScoreboard same_type{board};\n    for (const auto& [name, scores] : same_type) {\n        std::cout << name << \": \" << total(scores) << '\\n';\n    }\n}\n",
   "stdout": "Ada: 8\nBo: 9\n",
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
     "out": "Ada: 8\nBo: 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada: 8\nBo: 9\n",
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
      "out": "Ada: 8\nBo: 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "asif.cpp": {
   "src": "int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    return slices_for(10);\n}\n",
   "stdout": "main:\n\tendbr64\n\tmovl\t$24, %eax\n\tret\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -O2 -S asif.cpp -o - | grep -v '^\\s*\\.' | grep -A3 '^main:'",
     "out": "main:\n\tendbr64\n\tmovl\t$24, %eax\n\tret\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "main:                                   # @main\n# %bb.0:\n\tmovl\t$24, %eax\n\tretq\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -O2 -S asif.cpp -o - | grep -v '^\\s*\\.' | grep -A3 '^main:'",
      "out": "main:                                   # @main\n# %bb.0:\n\tmovl\t$24, %eax\n\tretq\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "asif_O0.cpp": {
   "src": "int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    return slices_for(10);\n}\n",
   "stdout": "main:\n\tendbr64\n\tpushq\t%rbp\n\tmovq\t%rsp, %rbp\n\tmovl\t$10, %edi\n\tcall\t_Z10slices_fori\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -O0 -S asif_O0.cpp -o - | grep -v '^\\s*\\.' | grep -A5 '^main:'",
     "out": "main:\n\tendbr64\n\tpushq\t%rbp\n\tmovq\t%rsp, %rbp\n\tmovl\t$10, %edi\n\tcall\t_Z10slices_fori\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "main:                                   # @main\n# %bb.0:\n\tpushq\t%rbp\n\tmovq\t%rsp, %rbp\n\tsubq\t$16, %rsp\n\tmovl\t$0, -4(%rbp)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -O0 -S asif_O0.cpp -o - | grep -v '^\\s*\\.' | grep -A5 '^main:'",
      "out": "main:                                   # @main\n# %bb.0:\n\tpushq\t%rbp\n\tmovq\t%rsp, %rbp\n\tsubq\t$16, %rsp\n\tmovl\t$0, -4(%rbp)\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "auto_basics.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <type_traits>\n\nint main() {\n    auto a = 5;\n    auto b = 2.5;\n    auto c = 'x';\n    auto d = \"hi\";\n    auto e = std::string{\"hi\"};\n    auto f = 5u;\n    static_assert(std::is_same_v<decltype(a), int>);\n    static_assert(std::is_same_v<decltype(b), double>);\n    static_assert(std::is_same_v<decltype(c), char>);\n    static_assert(std::is_same_v<decltype(d), const char*>);\n    static_assert(std::is_same_v<decltype(e), std::string>);\n    static_assert(std::is_same_v<decltype(f), unsigned int>);\n    std::cout << a << ' ' << b << ' ' << c << ' ' << d << ' ' << e << ' ' << f << '\\n';\n    std::cout << \"Every label above was checked by the Compiler.\\n\";\n}\n",
   "stdout": "5 2.5 x hi hi 5\nEvery label above was checked by the Compiler.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g auto_basics.cpp -o auto_basics",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./auto_basics",
     "out": "5 2.5 x hi hi 5\nEvery label above was checked by the Compiler.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 2.5 x hi hi 5\nEvery label above was checked by the Compiler.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g auto_basics.cpp -o auto_basics",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./auto_basics",
      "out": "5 2.5 x hi hi 5\nEvery label above was checked by the Compiler.\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "auto_copy.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{1, 2, 3};\n    auto x = v[0];\n    x = 9;\n    std::cout << \"after auto:  v[0] is \" << v[0] << '\\n';\n    auto& y = v[0];\n    y = 9;\n    std::cout << \"after auto&: v[0] is \" << v[0] << '\\n';\n}\n",
   "stdout": "after auto:  v[0] is 1\nafter auto&: v[0] is 9\n",
   "stderr": "auto_copy.cpp: In function ‘int main()’:\nauto_copy.cpp:6:10: warning: variable ‘x’ set but not used [-Wunused-but-set-variable]\n    6 |     auto x = v[0];\n      |          ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g auto_copy.cpp -o auto_copy",
     "out": "",
     "err": "auto_copy.cpp: In function ‘int main()’:\nauto_copy.cpp:6:10: warning: variable ‘x’ set but not used [-Wunused-but-set-variable]\n    6 |     auto x = v[0];\n      |          ^\n",
     "exit": 0
    },
    {
     "cmd": "./auto_copy",
     "out": "after auto:  v[0] is 1\nafter auto&: v[0] is 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "after auto:  v[0] is 1\nafter auto&: v[0] is 9\n",
    "stderr": "auto_copy.cpp:6:10: warning: variable 'x' set but not used [-Wunused-but-set-variable]\n    6 |     auto x = v[0];\n      |          ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g auto_copy.cpp -o auto_copy",
      "out": "",
      "err": "auto_copy.cpp:6:10: warning: variable 'x' set but not used [-Wunused-but-set-variable]\n    6 |     auto x = v[0];\n      |          ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./auto_copy",
      "out": "after auto:  v[0] is 1\nafter auto&: v[0] is 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "auto_sign.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{3, 1, 4};\n    for (auto i = 0; i < v.size(); ++i) {\n        std::cout << v[i] << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "3 1 4 \n",
   "stderr": "auto_sign.cpp: In function ‘int main()’:\nauto_sign.cpp:6:24: warning: comparison of integer expressions of different signedness: ‘int’ and ‘std::vector<int>::size_type’ {aka ‘long unsigned int’} [-Wsign-compare]\n    6 |     for (auto i = 0; i < v.size(); ++i) {\n      |                      ~~^~~~~~~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g auto_sign.cpp -o auto_sign",
     "out": "",
     "err": "auto_sign.cpp: In function ‘int main()’:\nauto_sign.cpp:6:24: warning: comparison of integer expressions of different signedness: ‘int’ and ‘std::vector<int>::size_type’ {aka ‘long unsigned int’} [-Wsign-compare]\n    6 |     for (auto i = 0; i < v.size(); ++i) {\n      |                      ~~^~~~~~~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./auto_sign",
     "out": "3 1 4 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 1 4 \n",
    "stderr": "auto_sign.cpp:6:24: warning: comparison of integers of different signs: 'int' and 'size_type' (aka 'unsigned long') [-Wsign-compare]\n    6 |     for (auto i = 0; i < v.size(); ++i) {\n      |                      ~ ^ ~~~~~~~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g auto_sign.cpp -o auto_sign",
      "out": "",
      "err": "auto_sign.cpp:6:24: warning: comparison of integers of different signs: 'int' and 'size_type' (aka 'unsigned long') [-Wsign-compare]\n    6 |     for (auto i = 0; i < v.size(); ++i) {\n      |                      ~ ^ ~~~~~~~~\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./auto_sign",
      "out": "3 1 4 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "auto_trap.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<double> prices{2.5, 1.25, 4.75};\n    auto total = 0;\n    for (double p : prices) {\n        total += p;\n    }\n    std::cout << \"total: \" << total << '\\n';\n}\n",
   "stdout": "total: 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g auto_trap.cpp -o auto_trap",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./auto_trap",
     "out": "total: 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "total: 7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g auto_trap.cpp -o auto_trap",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./auto_trap",
      "out": "total: 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "bake.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint main() {\n    constexpr int guests{12};\n    constexpr int slices_each{2};\n    constexpr int slices{guests * slices_each};\n    std::array<int, slices> plates{};\n    std::cout << \"Baked \" << slices << \" slices\\n\";\n    std::cout << \"Set out \" << plates.size() << \" plates\\n\";\n}\n",
   "stdout": "Baked 24 slices\nSet out 24 plates\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bake.cpp -o bake",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./bake",
     "out": "Baked 24 slices\nSet out 24 plates\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Baked 24 slices\nSet out 24 plates\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bake.cpp -o bake",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./bake",
      "out": "Baked 24 slices\nSet out 24 plates\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "binding_count_bad.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <tuple>\n\nint main() {\n    std::tuple<std::string, int, double> cake{\"lemon\", 8, 12.5};\n    auto [flavour, slices] = cake;\n    std::cout << flavour << ' ' << slices << '\\n';\n}\n",
   "stdout": "",
   "stderr": "binding_count_bad.cpp: In function ‘int main()’:\nbinding_count_bad.cpp:7:10: error: only 2 names provided for structured binding\n    7 |     auto [flavour, slices] = cake;\n      |          ^~~~~~~~~~~~~~~~~\nbinding_count_bad.cpp:7:10: note: while ‘std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>’ decomposes into 3 elements\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g binding_count_bad.cpp -o binding_count_bad",
     "out": "",
     "err": "binding_count_bad.cpp: In function ‘int main()’:\nbinding_count_bad.cpp:7:10: error: only 2 names provided for structured binding\n    7 |     auto [flavour, slices] = cake;\n      |          ^~~~~~~~~~~~~~~~~\nbinding_count_bad.cpp:7:10: note: while ‘std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>’ decomposes into 3 elements\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "binding_count_bad.cpp:7:10: error: type 'std::tuple<std::string, int, double>' (aka 'tuple<basic_string<char>, int, double>') decomposes into 3 elements, but only 2 names were provided\n    7 |     auto [flavour, slices] = cake;\n      |          ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g binding_count_bad.cpp -o binding_count_bad",
      "out": "",
      "err": "binding_count_bad.cpp:7:10: error: type 'std::tuple<std::string, int, double>' (aka 'tuple<basic_string<char>, int, double>') decomposes into 3 elements, but only 2 names were provided\n    7 |     auto [flavour, slices] = cake;\n      |          ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "bindings_map.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> ages{{\"Bo\", 9}, {\"Ada\", 36}};\n    for (const auto& [name, age] : ages) {\n        std::cout << name << \" is \" << age << '\\n';\n    }\n}\n",
   "stdout": "Ada is 36\nBo is 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bindings_map.cpp -o bindings_map",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./bindings_map",
     "out": "Ada is 36\nBo is 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada is 36\nBo is 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bindings_map.cpp -o bindings_map",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./bindings_map",
      "out": "Ada is 36\nBo is 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <utility>\n#include <vector>\n\nconstexpr int minutes(int hours) {\n    return hours * 60;\n}\n\nstatic_assert(minutes(2) == 120);\n\nint main() {\n    std::vector<std::pair<std::string, int>> bakes{{\"bread\", 3}, {\"cake\", 1}};\n    for (const auto& [name, hours] : bakes) {\n        std::cout << name << \": \" << minutes(hours) << \" min\\n\";\n    }\n}\n",
   "stdout": "bread: 180 min\ncake: 60 min\n",
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
     "out": "bread: 180 min\ncake: 60 min\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "bread: 180 min\ncake: 60 min\n",
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
      "out": "bread: 180 min\ncake: 60 min\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nconstexpr std::array<int, 4> make_doubles() {\n    std::array<int, 4> t{};\n    for (int i = 0; i < 4; ++i) {\n        t[i] = 1 << i;\n    }\n    return t;\n}\n\nconstexpr auto doubles{make_doubles()};\nstatic_assert(doubles[3] == 8);\n\nint main() {\n    for (int d : doubles) {\n        std::cout << d << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "1 2 4 8 \n",
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
     "out": "1 2 4 8 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 2 4 8 \n",
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
      "out": "1 2 4 8 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_predict.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nconstexpr int twice(int n) {\n    return n * 2;\n}\n\nint main() {\n    constexpr int base{twice(2)};\n    std::vector<int> v{base, base + 1};\n    const auto& first = v[0];\n    auto second = v[1];\n    v[0] = twice(v[1]);\n    second = 0;\n    std::cout << first << ' ' << second << ' ' << v[1] << '\\n';\n}\n",
   "stdout": "10 0 5\n",
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
     "out": "10 0 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "10 0 5\n",
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
      "out": "10 0 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> points{{\"Ada\", 3}, {\"Bo\", 5}};\n    for (auto [name, score] : points) {\n        score += 10;\n    }\n    for (const auto& [name, score] : points) {\n        std::cout << name << ' ' << score << '\\n';\n    }\n}\n",
   "stdout": "Ada 3\nBo 5\n",
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
     "out": "Ada 3\nBo 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada 3\nBo 5\n",
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
      "out": "Ada 3\nBo 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n#include <tuple>\n#include <utility>\n\nint main() {\n    int a{0};\n    int b{1};\n    for (int step = 1; step <= 5; ++step) {\n        std::tie(a, b) = std::pair{b, a + b};\n        std::cout << step << ' ' << a << ' ' << b << '\\n';\n    }\n}\n",
   "stdout": "1 1 1\n2 1 2\n3 2 3\n4 3 5\n5 5 8\n",
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
     "out": "1 1 1\n2 1 2\n3 2 3\n4 3 5\n5 5 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 1\n2 1 2\n3 2 3\n4 3 5\n5 5 8\n",
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
      "out": "1 1 1\n2 1 2\n3 2 3\n4 3 5\n5 5 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "checked.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nstatic_assert(slices_for(0) == 4, \"spare slices even with no guests\");\nstatic_assert(slices_for(1) == 6);\nstatic_assert(slices_for(10) == 24);\n\nint main() {\n    std::cout << \"All three checks passed while compiling.\\n\";\n}\n",
   "stdout": "All three checks passed while compiling.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g checked.cpp -o checked",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./checked",
     "out": "All three checks passed while compiling.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "All three checks passed while compiling.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g checked.cpp -o checked",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./checked",
      "out": "All three checks passed while compiling.\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "checked_bad.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nstatic_assert(slices_for(0) == 4, \"spare slices even with no guests\");\nstatic_assert(slices_for(1) == 5);\nstatic_assert(slices_for(10) == 24);\n\nint main() {\n    std::cout << \"All three checks passed while compiling.\\n\";\n}\n",
   "stdout": "",
   "stderr": "checked_bad.cpp:8:29: error: static assertion failed\n    8 | static_assert(slices_for(1) == 5);\n      |               ~~~~~~~~~~~~~~^~~~\nchecked_bad.cpp:8:29: note: the comparison reduces to ‘(6 == 5)’\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g checked_bad.cpp -o checked_bad",
     "out": "",
     "err": "checked_bad.cpp:8:29: error: static assertion failed\n    8 | static_assert(slices_for(1) == 5);\n      |               ~~~~~~~~~~~~~~^~~~\nchecked_bad.cpp:8:29: note: the comparison reduces to ‘(6 == 5)’\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "checked_bad.cpp:8:15: error: static assertion failed due to requirement 'slices_for(1) == 5'\n    8 | static_assert(slices_for(1) == 5);\n      |               ^~~~~~~~~~~~~~~~~~\nchecked_bad.cpp:8:29: note: expression evaluates to '6 == 5'\n    8 | static_assert(slices_for(1) == 5);\n      |               ~~~~~~~~~~~~~~^~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g checked_bad.cpp -o checked_bad",
      "out": "",
      "err": "checked_bad.cpp:8:15: error: static assertion failed due to requirement 'slices_for(1) == 5'\n    8 | static_assert(slices_for(1) == 5);\n      |               ^~~~~~~~~~~~~~~~~~\nchecked_bad.cpp:8:29: note: expression evaluates to '6 == 5'\n    8 | static_assert(slices_for(1) == 5);\n      |               ~~~~~~~~~~~~~~^~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "const_member_bad.cpp": {
   "src": "#include <iostream>\n\nclass Oven {\npublic:\n    explicit Oven(int degrees) : degrees_{degrees} {}\n    int degrees() { return degrees_; }\nprivate:\n    int degrees_;\n};\n\nvoid show(const Oven& oven) {\n    std::cout << \"oven at \" << oven.degrees() << '\\n';\n}\n\nint main() {\n    Oven oven{180};\n    show(oven);\n}\n",
   "stdout": "",
   "stderr": "const_member_bad.cpp: In function ‘void show(const Oven&)’:\nconst_member_bad.cpp:12:44: error: passing ‘const Oven’ as ‘this’ argument discards qualifiers [-fpermissive]\n   12 |     std::cout << \"oven at \" << oven.degrees() << '\\n';\n      |                                ~~~~~~~~~~~~^~\nconst_member_bad.cpp:6:9: note:   in call to ‘int Oven::degrees()’\n    6 |     int degrees() { return degrees_; }\n      |         ^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_member_bad.cpp -o const_member_bad",
     "out": "",
     "err": "const_member_bad.cpp: In function ‘void show(const Oven&)’:\nconst_member_bad.cpp:12:44: error: passing ‘const Oven’ as ‘this’ argument discards qualifiers [-fpermissive]\n   12 |     std::cout << \"oven at \" << oven.degrees() << '\\n';\n      |                                ~~~~~~~~~~~~^~\nconst_member_bad.cpp:6:9: note:   in call to ‘int Oven::degrees()’\n    6 |     int degrees() { return degrees_; }\n      |         ^~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "const_member_bad.cpp:12:32: error: 'this' argument to member function 'degrees' has type 'const Oven', but function is not marked const\n   12 |     std::cout << \"oven at \" << oven.degrees() << '\\n';\n      |                                ^~~~\nconst_member_bad.cpp:6:9: note: 'degrees' declared here\n    6 |     int degrees() { return degrees_; }\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_member_bad.cpp -o const_member_bad",
      "out": "",
      "err": "const_member_bad.cpp:12:32: error: 'this' argument to member function 'degrees' has type 'const Oven', but function is not marked const\n   12 |     std::cout << \"oven at \" << oven.degrees() << '\\n';\n      |                                ^~~~\nconst_member_bad.cpp:6:9: note: 'degrees' declared here\n    6 |     int degrees() { return degrees_; }\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "const_or_constexpr.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint ask() {\n    return 5;\n}\n\nint main() {\n    const int a{4};\n    const int b{ask()};\n    constexpr int c{a * 3};\n    std::array<int, a> row{};\n    std::array<int, c> table{};\n    std::cout << a << ' ' << b << ' ' << c << '\\n';\n    std::cout << row.size() << ' ' << table.size() << '\\n';\n}\n",
   "stdout": "4 5 12\n4 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_or_constexpr.cpp -o const_or_constexpr",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./const_or_constexpr",
     "out": "4 5 12\n4 12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4 5 12\n4 12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_or_constexpr.cpp -o const_or_constexpr",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./const_or_constexpr",
      "out": "4 5 12\n4 12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "const_param.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nvoid print_list(const std::vector<std::string>& names) {\n    for (const std::string& name : names) {\n        std::cout << \"- \" << name << '\\n';\n    }\n}\n\nvoid add_guest(std::vector<std::string>& names, const std::string& who) {\n    names.push_back(who);\n}\n\nint main() {\n    std::vector<std::string> guests{\"Ada\", \"Bo\"};\n    add_guest(guests, \"Cy\");\n    print_list(guests);\n}\n",
   "stdout": "- Ada\n- Bo\n- Cy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_param.cpp -o const_param",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./const_param",
     "out": "- Ada\n- Bo\n- Cy\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "- Ada\n- Bo\n- Cy\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_param.cpp -o const_param",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./const_param",
      "out": "- Ada\n- Bo\n- Cy\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "consteval_bad.cpp": {
   "src": "#include <iostream>\n\nconsteval int dozens(int n) {\n    return n * 12;\n}\n\nint main() {\n    int boxes{};\n    std::cin >> boxes;\n    std::cout << dozens(boxes) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "consteval_bad.cpp: In function ‘int main()’:\nconsteval_bad.cpp:10:25: error: the value of ‘boxes’ is not usable in a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                         ^~~~~\nconsteval_bad.cpp:8:9: note: ‘int boxes’ is not const\n    8 |     int boxes{};\n      |         ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g consteval_bad.cpp -o consteval_bad",
     "out": "",
     "err": "consteval_bad.cpp: In function ‘int main()’:\nconsteval_bad.cpp:10:25: error: the value of ‘boxes’ is not usable in a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                         ^~~~~\nconsteval_bad.cpp:8:9: note: ‘int boxes’ is not const\n    8 |     int boxes{};\n      |         ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "consteval_bad.cpp:10:18: error: call to consteval function 'dozens' is not a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                  ^\nconsteval_bad.cpp:10:25: note: read of non-const variable 'boxes' is not allowed in a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                         ^\nconsteval_bad.cpp:8:9: note: declared here\n    8 |     int boxes{};\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g consteval_bad.cpp -o consteval_bad",
      "out": "",
      "err": "consteval_bad.cpp:10:18: error: call to consteval function 'dozens' is not a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                  ^\nconsteval_bad.cpp:10:25: note: read of non-const variable 'boxes' is not allowed in a constant expression\n   10 |     std::cout << dozens(boxes) << '\\n';\n      |                         ^\nconsteval_bad.cpp:8:9: note: declared here\n    8 |     int boxes{};\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "consteval_ok.cpp": {
   "src": "#include <iostream>\n\nconsteval int dozens(int n) {\n    return n * 12;\n}\n\nint main() {\n    constexpr int eggs{dozens(3)};\n    std::cout << \"Eggs for the cake: \" << eggs << '\\n';\n    std::cout << \"Spare eggs: \" << dozens(1) << '\\n';\n}\n",
   "stdout": "Eggs for the cake: 36\nSpare eggs: 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g consteval_ok.cpp -o consteval_ok",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./consteval_ok",
     "out": "Eggs for the cake: 36\nSpare eggs: 12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Eggs for the cake: 36\nSpare eggs: 12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g consteval_ok.cpp -o consteval_ok",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./consteval_ok",
      "out": "Eggs for the cake: 36\nSpare eggs: 12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ctad.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <type_traits>\n#include <utility>\n#include <vector>\n\nint main() {\n    std::vector v{1, 2, 3};\n    std::pair p{std::string{\"Ada\"}, 36};\n    static_assert(std::is_same_v<decltype(v), std::vector<int>>);\n    static_assert(std::is_same_v<decltype(p), std::pair<std::string, int>>);\n    std::cout << v.size() << \" numbers, \" << p.first << \" is \" << p.second << '\\n';\n}\n",
   "stdout": "3 numbers, Ada is 36\n",
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
     "out": "3 numbers, Ada is 36\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 numbers, Ada is 36\n",
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
      "out": "3 numbers, Ada is 36\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_alias.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nusing Orders = std::map<std::string, std::vector<std::string>>;\n\nvoid print(const Orders& orders) {\n    for (const auto& [table, dishes] : orders) {\n        std::cout << table << \": \" << dishes.size() << \" dishes\\n\";\n    }\n}\n\nint main() {\n    Orders orders{{\"table 1\", {\"cake\", \"tea\"}}, {\"table 2\", {\"pie\"}}};\n    print(orders);\n}\n",
   "stdout": "table 1: 2 dishes\ntable 2: 1 dishes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_alias.cpp -o fill_alias",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_alias",
     "out": "table 1: 2 dishes\ntable 2: 1 dishes\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "table 1: 2 dishes\ntable 2: 1 dishes\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_alias.cpp -o fill_alias",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_alias",
      "out": "table 1: 2 dishes\ntable 2: 1 dishes\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_const.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nclass Oven {\npublic:\n    explicit Oven(int degrees) : degrees_{degrees} {}\n    int degrees() const { return degrees_; }\n    void set(int degrees) { degrees_ = degrees; }\nprivate:\n    int degrees_;\n};\n\nvoid show(const Oven& oven) {\n    std::cout << \"oven at \" << oven.degrees() << '\\n';\n}\n\nint main() {\n    Oven oven{180};\n    show(oven);\n    oven.set(200);\n    show(oven);\n}\n",
   "stdout": "oven at 180\noven at 200\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_const.cpp -o fill_const",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_const",
     "out": "oven at 180\noven at 200\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "oven at 180\noven at 200\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_const.cpp -o fill_const",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_const",
      "out": "oven at 180\noven at 200\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_constref.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n    const std::vector<std::string> guests{\"Ada\", \"Bo\", \"Cy\"};\n    for (const auto& name : guests) {\n        std::cout << \"Welcome, \" << name << \"!\\n\";\n    }\n    auto count = guests.size();\n    std::cout << count << \" guests\\n\";\n}\n",
   "stdout": "Welcome, Ada!\nWelcome, Bo!\nWelcome, Cy!\n3 guests\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_constref.cpp -o fill_constref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_constref",
     "out": "Welcome, Ada!\nWelcome, Bo!\nWelcome, Cy!\n3 guests\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Welcome, Ada!\nWelcome, Bo!\nWelcome, Cy!\n3 guests\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_constref.cpp -o fill_constref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_constref",
      "out": "Welcome, Ada!\nWelcome, Bo!\nWelcome, Cy!\n3 guests\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_table.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nconstexpr int price_in_cents(int dollars) {\n    return dollars * 100;\n}\n\nconstexpr std::array<int, 3> prices{price_in_cents(2), price_in_cents(5), price_in_cents(9)};\nstatic_assert(prices[1] == 500, \"a $5 cake costs 500 cents\");\n\nint main() {\n    for (int p : prices) {\n        std::cout << p << \" cents\\n\";\n    }\n}\n",
   "stdout": "200 cents\n500 cents\n900 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_table.cpp -o fill_table",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_table",
     "out": "200 cents\n500 cents\n900 cents\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "200 cents\n500 cents\n900 cents\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_table.cpp -o fill_table",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_table",
      "out": "200 cents\n500 cents\n900 cents\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "five.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector a{5};\n    std::vector<int> b(5);\n    std::vector<int> c{5, 0};\n    std::vector<int> d(5, 1);\n    std::cout << \"a: \" << a.size() << \" item(s), first \" << a[0] << '\\n';\n    std::cout << \"b: \" << b.size() << \" item(s), first \" << b[0] << '\\n';\n    std::cout << \"c: \" << c.size() << \" item(s), first \" << c[0] << '\\n';\n    std::cout << \"d: \" << d.size() << \" item(s), first \" << d[0] << '\\n';\n}\n",
   "stdout": "a: 1 item(s), first 5\nb: 5 item(s), first 0\nc: 2 item(s), first 5\nd: 5 item(s), first 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g five.cpp -o five",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./five",
     "out": "a: 1 item(s), first 5\nb: 5 item(s), first 0\nc: 2 item(s), first 5\nd: 5 item(s), first 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a: 1 item(s), first 5\nb: 5 item(s), first 0\nc: 2 item(s), first 5\nd: 5 item(s), first 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g five.cpp -o five",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./five",
      "out": "a: 1 item(s), first 5\nb: 5 item(s), first 0\nc: 2 item(s), first 5\nd: 5 item(s), first 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "if_constexpr.cpp": {
   "src": "#include <iostream>\n\nconstexpr bool party_mode{true};\n\nint main() {\n    if constexpr (party_mode) {\n        std::cout << \"Balloons up!\\n\";\n    } else {\n        std::cout << \"Quiet evening.\\n\";\n    }\n    if constexpr (sizeof(void*) == 8) {\n        std::cout << \"64-bit addresses on this machine\\n\";\n    }\n}\n",
   "stdout": "Balloons up!\n64-bit addresses on this machine\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g if_constexpr.cpp -o if_constexpr",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./if_constexpr",
     "out": "Balloons up!\n64-bit addresses on this machine\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Balloons up!\n64-bit addresses on this machine\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g if_constexpr.cpp -o if_constexpr",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./if_constexpr",
      "out": "Balloons up!\n64-bit addresses on this machine\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "if_constexpr_strings.cpp": {
   "src": "#include <iostream>\n\nconstexpr bool party_mode{true};\n\nint main() {\n    if constexpr (party_mode) {\n        std::cout << \"Balloons up!\\n\";\n    } else {\n        std::cout << \"Quiet evening.\\n\";\n    }\n    if constexpr (sizeof(void*) == 8) {\n        std::cout << \"64-bit addresses on this machine\\n\";\n    }\n}\n",
   "stdout": "0\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g if_constexpr_strings.cpp -o if_constexpr_strings",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "grep -c 'Balloons up' if_constexpr_strings",
     "out": "1\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "grep -c 'Quiet evening' if_constexpr_strings",
     "out": "0\n",
     "err": "",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g if_constexpr_strings.cpp -o if_constexpr_strings",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "grep -c 'Balloons up' if_constexpr_strings",
      "out": "1\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "grep -c 'Quiet evening' if_constexpr_strings",
      "out": "0\n",
      "err": "",
      "exit": 1
     }
    ]
   }
  },
  "lab_overflow_party.cpp": {
   "src": "#include <iostream>\n\nconstexpr int factorial(int n) {\n    int result{1};\n    for (int k = 2; k <= n; ++k) {\n        result *= k;\n    }\n    return result;\n}\n\nint main() {\n    int big{factorial(13)};\n    std::cout << big << '\\n';\n}\n",
   "stdout": "",
   "stderr": "lab_overflow_party.cpp:6:16: runtime error: signed integer overflow: 479001600 * 13 cannot be represented in type 'int'\n    #0 0x555555555430 in factorial(int) /home/you/cpp-ch19/lab_overflow_party.cpp:6\n    #1 0x55555555529e in main /home/you/cpp-ch19/lab_overflow_party.cpp:12\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555551c4 in _start (/home/you/cpp-ch19/lab_overflow_party+0x11c4) (BuildId: 185feccb989c4bcaed4fd0c857d2ba7ce7d6deb3)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer lab_overflow_party.cpp -o lab_overflow_party",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lab_overflow_party",
     "out": "",
     "err": "lab_overflow_party.cpp:6:16: runtime error: signed integer overflow: 479001600 * 13 cannot be represented in type 'int'\n    #0 0x555555555430 in factorial(int) /home/you/cpp-ch19/lab_overflow_party.cpp:6\n    #1 0x55555555529e in main /home/you/cpp-ch19/lab_overflow_party.cpp:12\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x5555555551c4 in _start (/home/you/cpp-ch19/lab_overflow_party+0x11c4) (BuildId: 185feccb989c4bcaed4fd0c857d2ba7ce7d6deb3)\n\n",
     "exit": 1
    }
   ]
  },
  "lab_past_end.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nconstexpr std::array<int, 6> make_squares() {\n    std::array<int, 6> t{};\n    for (int i = 0; i <= 6; ++i) {\n        t[i] = i * i;\n    }\n    return t;\n}\n\nconstexpr std::array<int, 6> squares{make_squares()};\nstatic_assert(squares[5] == 25);\n\nint main() {\n    for (int s : squares) {\n        std::cout << s << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "",
   "stderr": "lab_past_end.cpp:12:50:   in ‘constexpr’ expansion of ‘make_squares()’\nlab_past_end.cpp:12:52: error: array subscript value ‘6’ is outside the bounds of array type ‘std::__array_traits<int, 6>::_Type’ {aka ‘int [6]’}\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                                                    ^\nlab_past_end.cpp:13:26: error: non-constant condition for static assertion\n   13 | static_assert(squares[5] == 25);\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lab_past_end.cpp -o lab_past_end",
     "out": "",
     "err": "lab_past_end.cpp:12:50:   in ‘constexpr’ expansion of ‘make_squares()’\nlab_past_end.cpp:12:52: error: array subscript value ‘6’ is outside the bounds of array type ‘std::__array_traits<int, 6>::_Type’ {aka ‘int [6]’}\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                                                    ^\nlab_past_end.cpp:13:26: error: non-constant condition for static assertion\n   13 | static_assert(squares[5] == 25);\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "lab_past_end.cpp:12:30: error: constexpr variable 'squares' must be initialized by a constant expression\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                              ^      ~~~~~~~~~~~~~~~~\nlab_past_end.cpp:7:14: note: assignment to dereferenced one-past-the-end pointer is not allowed in a constant expression\n    7 |         t[i] = i * i;\n      |              ^\nlab_past_end.cpp:12:38: note: in call to 'make_squares()'\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                                      ^~~~~~~~~~~~~~\nlab_past_end.cpp:13:15: error: static assertion expression is not an integral constant expression\n   13 | static_assert(squares[5] == 25);\n      |               ^~~~~~~~~~~~~~~~\nlab_past_end.cpp:13:15: note: initializer of 'squares' is not a constant expression\nlab_past_end.cpp:12:30: note: declared here\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                              ^\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lab_past_end.cpp -o lab_past_end",
      "out": "",
      "err": "lab_past_end.cpp:12:30: error: constexpr variable 'squares' must be initialized by a constant expression\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                              ^      ~~~~~~~~~~~~~~~~\nlab_past_end.cpp:7:14: note: assignment to dereferenced one-past-the-end pointer is not allowed in a constant expression\n    7 |         t[i] = i * i;\n      |              ^\nlab_past_end.cpp:12:38: note: in call to 'make_squares()'\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                                      ^~~~~~~~~~~~~~\nlab_past_end.cpp:13:15: error: static assertion expression is not an integral constant expression\n   13 | static_assert(squares[5] == 25);\n      |               ^~~~~~~~~~~~~~~~\nlab_past_end.cpp:13:15: note: initializer of 'squares' is not a constant expression\nlab_past_end.cpp:12:30: note: declared here\n   12 | constexpr std::array<int, 6> squares{make_squares()};\n      |                              ^\n2 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "lab_slices_consteval.cpp": {
   "src": "#include <iostream>\n\nconsteval int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    constexpr int planned{slices_for(10)};\n    std::cout << \"Baked before the party: \" << planned << '\\n';\n    int turned_up{};\n    std::cout << \"How many guests came? \";\n    std::cin >> turned_up;\n    int needed{slices_for(turned_up)};\n    std::cout << \"Sliced at the party: \" << needed << '\\n';\n}\n",
   "stdout": "",
   "stderr": "lab_slices_consteval.cpp: In function ‘int main()’:\nlab_slices_consteval.cpp:13:27: error: the value of ‘turned_up’ is not usable in a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                           ^~~~~~~~~\nlab_slices_consteval.cpp:10:9: note: ‘int turned_up’ is not const\n   10 |     int turned_up{};\n      |         ^~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lab_slices_consteval.cpp -o lab_slices_consteval",
     "out": "",
     "err": "lab_slices_consteval.cpp: In function ‘int main()’:\nlab_slices_consteval.cpp:13:27: error: the value of ‘turned_up’ is not usable in a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                           ^~~~~~~~~\nlab_slices_consteval.cpp:10:9: note: ‘int turned_up’ is not const\n   10 |     int turned_up{};\n      |         ^~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "lab_slices_consteval.cpp:13:16: error: call to consteval function 'slices_for' is not a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                ^\nlab_slices_consteval.cpp:13:27: note: read of non-const variable 'turned_up' is not allowed in a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                           ^\nlab_slices_consteval.cpp:10:9: note: declared here\n   10 |     int turned_up{};\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lab_slices_consteval.cpp -o lab_slices_consteval",
      "out": "",
      "err": "lab_slices_consteval.cpp:13:16: error: call to consteval function 'slices_for' is not a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                ^\nlab_slices_consteval.cpp:13:27: note: read of non-const variable 'turned_up' is not allowed in a constant expression\n   13 |     int needed{slices_for(turned_up)};\n      |                           ^\nlab_slices_consteval.cpp:10:9: note: declared here\n   10 |     int turned_up{};\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "label_maker.cpp": {
   "src": "#include <iostream>\n#include <type_traits>\n\nint main() {\n    int x{7};\n    const int ci{7};\n    int& r{x};\n    const int& cr{ci};\n\n    auto a = ci;\n    static_assert(std::is_same_v<decltype(a), int>);\n    std::cout << \"auto a = ci;   a is int\\n\";\n    auto& b = ci;\n    static_assert(std::is_same_v<decltype(b), const int&>);\n    std::cout << \"auto& b = ci;  b is const int&\\n\";\n    const auto c = x;\n    static_assert(std::is_same_v<decltype(c), const int>);\n    std::cout << \"const auto c = x;  c is const int\\n\";\n    auto d = r;\n    static_assert(std::is_same_v<decltype(d), int>);\n    std::cout << \"auto d = r;   d is int\\n\";\n    auto& e = r;\n    static_assert(std::is_same_v<decltype(e), int&>);\n    std::cout << \"auto& e = r;  e is int&\\n\";\n    auto f = cr;\n    static_assert(std::is_same_v<decltype(f), int>);\n    std::cout << \"auto f = cr;  f is int\\n\";\n    const auto& g = x;\n    static_assert(std::is_same_v<decltype(g), const int&>);\n    std::cout << \"const auto& g = x;  g is const int&\\n\";\n    decltype(ci) h{1};\n    static_assert(std::is_same_v<decltype(h), const int>);\n    std::cout << \"decltype(ci) h;  h is const int\\n\";\n    std::cout << a + b + c + d + e + f + g + h << '\\n';\n}\n",
   "stdout": "auto a = ci;   a is int\nauto& b = ci;  b is const int&\nconst auto c = x;  c is const int\nauto d = r;   d is int\nauto& e = r;  e is int&\nauto f = cr;  f is int\nconst auto& g = x;  g is const int&\ndecltype(ci) h;  h is const int\n50\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g label_maker.cpp -o label_maker",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./label_maker",
     "out": "auto a = ci;   a is int\nauto& b = ci;  b is const int&\nconst auto c = x;  c is const int\nauto d = r;   d is int\nauto& e = r;  e is int&\nauto f = cr;  f is int\nconst auto& g = x;  g is const int&\ndecltype(ci) h;  h is const int\n50\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "auto a = ci;   a is int\nauto& b = ci;  b is const int&\nconst auto c = x;  c is const int\nauto d = r;   d is int\nauto& e = r;  e is int&\nauto f = cr;  f is int\nconst auto& g = x;  g is const int&\ndecltype(ci) h;  h is const int\n50\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g label_maker.cpp -o label_maker",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./label_maker",
      "out": "auto a = ci;   a is int\nauto& b = ci;  b is const int&\nconst auto c = x;  c is const int\nauto d = r;   d is int\nauto& e = r;  e is int&\nauto f = cr;  f is int\nconst auto& g = x;  g is const int&\ndecltype(ci) h;  h is const int\n50\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "label_wrong.cpp": {
   "src": "#include <iostream>\n#include <type_traits>\n\nint main() {\n    const int ci{7};\n    auto a = ci;\n    static_assert(std::is_same_v<decltype(a), const int>, \"auto keeps const?\");\n    std::cout << a << '\\n';\n}\n",
   "stdout": "",
   "stderr": "label_wrong.cpp: In function ‘int main()’:\nlabel_wrong.cpp:7:24: error: static assertion failed: auto keeps const?\n    7 |     static_assert(std::is_same_v<decltype(a), const int>, \"auto keeps const?\");\n      |                   ~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g label_wrong.cpp -o label_wrong",
     "out": "",
     "err": "label_wrong.cpp: In function ‘int main()’:\nlabel_wrong.cpp:7:24: error: static assertion failed: auto keeps const?\n    7 |     static_assert(std::is_same_v<decltype(a), const int>, \"auto keeps const?\");\n      |                   ~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "label_wrong.cpp:7:19: error: static assertion failed due to requirement 'std::is_same_v<int, const int>': auto keeps const?\n    7 |     static_assert(std::is_same_v<decltype(a), const int>, \"auto keeps const?\");\n      |                   ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g label_wrong.cpp -o label_wrong",
      "out": "",
      "err": "label_wrong.cpp:7:19: error: static assertion failed due to requirement 'std::is_same_v<int, const int>': auto keeps const?\n    7 |     static_assert(std::is_same_v<decltype(a), const int>, \"auto keeps const?\");\n      |                   ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "minmax.cpp": {
   "src": "#include <iostream>\n#include <tuple>\n#include <utility>\n#include <vector>\n\nstd::pair<int, int> lowest_highest(const std::vector<int>& v) {\n    int lo{v[0]};\n    int hi{v[0]};\n    for (int x : v) {\n        if (x < lo) lo = x;\n        if (x > hi) hi = x;\n    }\n    return {lo, hi};\n}\n\nint main() {\n    std::vector<int> temps{18, 23, 15, 21};\n    auto [lo, hi] = lowest_highest(temps);\n    std::cout << \"binding: \" << lo << \" to \" << hi << '\\n';\n    int low{};\n    int high{};\n    std::tie(low, high) = lowest_highest({4, 9, 2});\n    std::cout << \"tie: \" << low << \" to \" << high << '\\n';\n}\n",
   "stdout": "binding: 15 to 23\ntie: 2 to 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g minmax.cpp -o minmax",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./minmax",
     "out": "binding: 15 to 23\ntie: 2 to 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "binding: 15 to 23\ntie: 2 to 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g minmax.cpp -o minmax",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./minmax",
      "out": "binding: 15 to 23\ntie: 2 to 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "named.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <tuple>\n\nstruct Cake {\n    std::string flavour;\n    int slices;\n    double price;\n};\n\nint main() {\n    std::tuple<std::string, int, double> t{\"lemon\", 8, 12.5};\n    Cake c{\"lemon\", 8, 12.5};\n    std::cout << std::get<2>(t) << \" vs \" << c.price << '\\n';\n    auto [flavour, slices, price] = c;\n    std::cout << flavour << ' ' << slices << ' ' << price << '\\n';\n}\n",
   "stdout": "12.5 vs 12.5\nlemon 8 12.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g named.cpp -o named",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./named",
     "out": "12.5 vs 12.5\nlemon 8 12.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12.5 vs 12.5\nlemon 8 12.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g named.cpp -o named",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./named",
      "out": "12.5 vs 12.5\nlemon 8 12.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "need64.cpp": {
   "src": "#include <iostream>\n\nstatic_assert(sizeof(int) == 8, \"need 64-bit int\");\n\nint main() {\n    std::cout << \"int has \" << sizeof(int) * 8 << \" bits\\n\";\n}\n",
   "stdout": "",
   "stderr": "need64.cpp:3:27: error: static assertion failed: need 64-bit int\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ~~~~~~~~~~~~^~~~\nneed64.cpp:3:27: note: the comparison reduces to ‘(4 == 8)’\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g need64.cpp -o need64",
     "out": "",
     "err": "need64.cpp:3:27: error: static assertion failed: need 64-bit int\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ~~~~~~~~~~~~^~~~\nneed64.cpp:3:27: note: the comparison reduces to ‘(4 == 8)’\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "need64.cpp:3:15: error: static assertion failed due to requirement 'sizeof(int) == 8': need 64-bit int\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ^~~~~~~~~~~~~~~~\nneed64.cpp:3:27: note: expression evaluates to '4 == 8'\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ~~~~~~~~~~~~^~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g need64.cpp -o need64",
      "out": "",
      "err": "need64.cpp:3:15: error: static assertion failed due to requirement 'sizeof(int) == 8': need 64-bit int\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ^~~~~~~~~~~~~~~~\nneed64.cpp:3:27: note: expression evaluates to '4 == 8'\n    3 | static_assert(sizeof(int) == 8, \"need 64-bit int\");\n      |               ~~~~~~~~~~~~^~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "not_constant.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int guests{10};\n    constexpr int slices{guests * 2};\n    std::cout << slices << '\\n';\n}\n",
   "stdout": "",
   "stderr": "not_constant.cpp: In function ‘int main()’:\nnot_constant.cpp:5:26: error: the value of ‘guests’ is not usable in a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                          ^~~~~~\nnot_constant.cpp:4:9: note: ‘int guests’ is not const\n    4 |     int guests{10};\n      |         ^~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g not_constant.cpp -o not_constant",
     "out": "",
     "err": "not_constant.cpp: In function ‘int main()’:\nnot_constant.cpp:5:26: error: the value of ‘guests’ is not usable in a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                          ^~~~~~\nnot_constant.cpp:4:9: note: ‘int guests’ is not const\n    4 |     int guests{10};\n      |         ^~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "not_constant.cpp:5:19: error: constexpr variable 'slices' must be initialized by a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                   ^     ~~~~~~~~~~~~\nnot_constant.cpp:5:26: note: read of non-const variable 'guests' is not allowed in a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                          ^\nnot_constant.cpp:4:9: note: declared here\n    4 |     int guests{10};\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g not_constant.cpp -o not_constant",
      "out": "",
      "err": "not_constant.cpp:5:19: error: constexpr variable 'slices' must be initialized by a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                   ^     ~~~~~~~~~~~~\nnot_constant.cpp:5:26: note: read of non-const variable 'guests' is not allowed in a constant expression\n    5 |     constexpr int slices{guests * 2};\n      |                          ^\nnot_constant.cpp:4:9: note: declared here\n    4 |     int guests{10};\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "overflow_ce.cpp": {
   "src": "#include <iostream>\n\nconstexpr int factorial(int n) {\n    int result{1};\n    for (int k = 2; k <= n; ++k) {\n        result *= k;\n    }\n    return result;\n}\n\nint main() {\n    constexpr int big{factorial(13)};\n    std::cout << big << '\\n';\n}\n",
   "stdout": "",
   "stderr": "overflow_ce.cpp: In function ‘int main()’:\noverflow_ce.cpp:12:32:   in ‘constexpr’ expansion of ‘factorial(13)’\noverflow_ce.cpp:12:36: error: overflow in constant expression [-fpermissive]\n   12 |     constexpr int big{factorial(13)};\n      |                                    ^\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g overflow_ce.cpp -o overflow_ce",
     "out": "",
     "err": "overflow_ce.cpp: In function ‘int main()’:\noverflow_ce.cpp:12:32:   in ‘constexpr’ expansion of ‘factorial(13)’\noverflow_ce.cpp:12:36: error: overflow in constant expression [-fpermissive]\n   12 |     constexpr int big{factorial(13)};\n      |                                    ^\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "overflow_ce.cpp:12:19: error: constexpr variable 'big' must be initialized by a constant expression\n   12 |     constexpr int big{factorial(13)};\n      |                   ^  ~~~~~~~~~~~~~~~\noverflow_ce.cpp:6:16: note: value 6227020800 is outside the range of representable values of type 'int'\n    6 |         result *= k;\n      |                ^\noverflow_ce.cpp:12:23: note: in call to 'factorial(13)'\n   12 |     constexpr int big{factorial(13)};\n      |                       ^~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g overflow_ce.cpp -o overflow_ce",
      "out": "",
      "err": "overflow_ce.cpp:12:19: error: constexpr variable 'big' must be initialized by a constant expression\n   12 |     constexpr int big{factorial(13)};\n      |                   ^  ~~~~~~~~~~~~~~~\noverflow_ce.cpp:6:16: note: value 6227020800 is outside the range of representable values of type 'int'\n    6 |         result *= k;\n      |                ^\noverflow_ce.cpp:12:23: note: in call to 'factorial(13)'\n   12 |     constexpr int big{factorial(13)};\n      |                       ^~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "packed.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <tuple>\n#include <utility>\n\nint main() {\n    std::pair<std::string, int> guest{\"Ada\", 36};\n    std::cout << guest.first << \" is \" << guest.second << '\\n';\n    std::tuple<std::string, int, double> cake{\"lemon\", 8, 12.5};\n    std::cout << std::get<0>(cake) << \", \" << std::get<1>(cake) << \" slices\\n\";\n    std::get<1>(cake) = 6;\n    auto [flavour, slices, price] = cake;\n    std::cout << flavour << \": \" << slices << \" slices, $\" << price << '\\n';\n}\n",
   "stdout": "Ada is 36\nlemon, 8 slices\nlemon: 6 slices, $12.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g packed.cpp -o packed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./packed",
     "out": "Ada is 36\nlemon, 8 slices\nlemon: 6 slices, $12.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada is 36\nlemon, 8 slices\nlemon: 6 slices, $12.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g packed.cpp -o packed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./packed",
      "out": "Ada is 36\nlemon, 8 slices\nlemon: 6 slices, $12.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_bind.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> slices{{\"Bo\", 3}, {\"Ada\", 2}, {\"Cy\", 1}};\n    int total{0};\n    for (const auto& [name, count] : slices) {\n        total += count;\n        std::cout << name << \" ate \" << count << \", total \" << total << '\\n';\n    }\n    std::cout << \"everyone: \" << total << '\\n';\n}\n",
   "stdout": "Ada ate 2, total 2\nBo ate 3, total 5\nCy ate 1, total 6\neveryone: 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_bind.cpp -o parsons_bind",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_bind",
     "out": "Ada ate 2, total 2\nBo ate 3, total 5\nCy ate 1, total 6\neveryone: 6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada ate 2, total 2\nBo ate 3, total 5\nCy ate 1, total 6\neveryone: 6\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_bind.cpp -o parsons_bind",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_bind",
      "out": "Ada ate 2, total 2\nBo ate 3, total 5\nCy ate 1, total 6\neveryone: 6\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_checks.cpp": {
   "src": "#include <iostream>\n\nconstexpr int area(int w, int h) {\n    return w * h;\n}\n\nconstexpr int tray{area(3, 4)};\nstatic_assert(tray == 12, \"a 3 by 4 tray holds 12 cupcakes\");\n\nint main() {\n    std::cout << \"One tray: \" << tray << '\\n';\n    std::cout << \"Two trays: \" << 2 * tray << '\\n';\n}\n",
   "stdout": "One tray: 12\nTwo trays: 24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_checks.cpp -o parsons_checks",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_checks",
     "out": "One tray: 12\nTwo trays: 24\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "One tray: 12\nTwo trays: 24\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_checks.cpp -o parsons_checks",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_checks",
      "out": "One tray: 12\nTwo trays: 24\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_auto.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{5, 6, 7};\n    auto a = v[1];\n    auto& b = v[2];\n    a = 0;\n    b = 0;\n    std::cout << v[0] << ' ' << v[1] << ' ' << v[2] << '\\n';\n    std::cout << a << ' ' << b << '\\n';\n}\n",
   "stdout": "5 6 0\n0 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_auto.cpp -o predict_auto",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_auto",
     "out": "5 6 0\n0 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 6 0\n0 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_auto.cpp -o predict_auto",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_auto",
      "out": "5 6 0\n0 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_error.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nint ask() {\n    return 5;\n}\n\nint main() {\n    const int a{4};\n    const int b{ask()};\n    std::array<int, a> row{};\n    std::array<int, b> col{};\n    std::cout << row.size() << ' ' << col.size() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "predict_error.cpp: In function ‘int main()’:\npredict_error.cpp:12:22: error: the value of ‘b’ is not usable in a constant expression\n   12 |     std::array<int, b> col{};\n      |                      ^\npredict_error.cpp:10:15: note: ‘b’ was not initialized with a constant expression\n   10 |     const int b{ask()};\n      |               ^\npredict_error.cpp:12:22: note: in template argument for type ‘long unsigned int’\n   12 |     std::array<int, b> col{};\n      |                      ^\npredict_error.cpp:13:43: error: request for member ‘size’ in ‘col’, which is of non-class type ‘int’\n   13 |     std::cout << row.size() << ' ' << col.size() << '\\n';\n      |                                           ^~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_error.cpp -o predict_error",
     "out": "",
     "err": "predict_error.cpp: In function ‘int main()’:\npredict_error.cpp:12:22: error: the value of ‘b’ is not usable in a constant expression\n   12 |     std::array<int, b> col{};\n      |                      ^\npredict_error.cpp:10:15: note: ‘b’ was not initialized with a constant expression\n   10 |     const int b{ask()};\n      |               ^\npredict_error.cpp:12:22: note: in template argument for type ‘long unsigned int’\n   12 |     std::array<int, b> col{};\n      |                      ^\npredict_error.cpp:13:43: error: request for member ‘size’ in ‘col’, which is of non-class type ‘int’\n   13 |     std::cout << row.size() << ' ' << col.size() << '\\n';\n      |                                           ^~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "predict_error.cpp:12:21: error: non-type template argument is not a constant expression\n   12 |     std::array<int, b> col{};\n      |                     ^\npredict_error.cpp:12:21: note: initializer of 'b' is not a constant expression\npredict_error.cpp:10:15: note: declared here\n   10 |     const int b{ask()};\n      |               ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_error.cpp -o predict_error",
      "out": "",
      "err": "predict_error.cpp:12:21: error: non-type template argument is not a constant expression\n   12 |     std::array<int, b> col{};\n      |                     ^\npredict_error.cpp:12:21: note: initializer of 'b' is not a constant expression\npredict_error.cpp:10:15: note: declared here\n   10 |     const int b{ask()};\n      |               ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_sa.cpp": {
   "src": "#include <iostream>\n\nconstexpr int plates{6};\nconstexpr int guests{8};\nstatic_assert(plates >= guests, \"one plate per guest\");\n\nint main() {\n    std::cout << \"Enough plates!\\n\";\n}\n",
   "stdout": "",
   "stderr": "predict_sa.cpp:5:22: error: static assertion failed: one plate per guest\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ~~~~~~~^~~~~~~~~\npredict_sa.cpp:5:22: note: the comparison reduces to ‘(6 >= 8)’\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_sa.cpp -o predict_sa",
     "out": "",
     "err": "predict_sa.cpp:5:22: error: static assertion failed: one plate per guest\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ~~~~~~~^~~~~~~~~\npredict_sa.cpp:5:22: note: the comparison reduces to ‘(6 >= 8)’\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "predict_sa.cpp:5:15: error: static assertion failed due to requirement 'plates >= guests': one plate per guest\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ^~~~~~~~~~~~~~~~\npredict_sa.cpp:5:22: note: expression evaluates to '6 >= 8'\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ~~~~~~~^~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_sa.cpp -o predict_sa",
      "out": "",
      "err": "predict_sa.cpp:5:15: error: static assertion failed due to requirement 'plates >= guests': one plate per guest\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ^~~~~~~~~~~~~~~~\npredict_sa.cpp:5:22: note: expression evaluates to '6 >= 8'\n    5 | static_assert(plates >= guests, \"one plate per guest\");\n      |               ~~~~~~~^~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_slices.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    constexpr int planned{slices_for(3)};\n    int late{2};\n    int extra{slices_for(late)};\n    std::cout << planned << '\\n';\n    std::cout << extra << '\\n';\n    std::cout << slices_for(planned) << '\\n';\n}\n",
   "stdout": "10\n8\n24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_slices.cpp -o predict_slices",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_slices",
     "out": "10\n8\n24\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "10\n8\n24\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_slices.cpp -o predict_slices",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_slices",
      "out": "10\n8\n24\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ptr_const.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cake{8};\n    int pie{6};\n    const int* look{&cake};\n    std::cout << \"look sees \" << *look << '\\n';\n    look = &pie;\n    std::cout << \"look sees \" << *look << '\\n';\n    int* const fork{&cake};\n    *fork = 7;\n    std::cout << \"cake is now \" << cake << '\\n';\n}\n",
   "stdout": "look sees 8\nlook sees 6\ncake is now 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ptr_const.cpp -o ptr_const",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ptr_const",
     "out": "look sees 8\nlook sees 6\ncake is now 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "look sees 8\nlook sees 6\ncake is now 7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ptr_const.cpp -o ptr_const",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ptr_const",
      "out": "look sees 8\nlook sees 6\ncake is now 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ptr_reseat_bad.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cake{8};\n    int pie{6};\n    int* const fork{&cake};\n    fork = &pie;\n    std::cout << *fork << '\\n';\n}\n",
   "stdout": "",
   "stderr": "ptr_reseat_bad.cpp: In function ‘int main()’:\nptr_reseat_bad.cpp:7:10: error: assignment of read-only variable ‘fork’\n    7 |     fork = &pie;\n      |     ~~~~~^~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ptr_reseat_bad.cpp -o ptr_reseat_bad",
     "out": "",
     "err": "ptr_reseat_bad.cpp: In function ‘int main()’:\nptr_reseat_bad.cpp:7:10: error: assignment of read-only variable ‘fork’\n    7 |     fork = &pie;\n      |     ~~~~~^~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "ptr_reseat_bad.cpp:7:10: error: cannot assign to variable 'fork' with const-qualified type 'int *const'\n    7 |     fork = &pie;\n      |     ~~~~ ^\nptr_reseat_bad.cpp:6:16: note: variable 'fork' declared const here\n    6 |     int* const fork{&cake};\n      |     ~~~~~~~~~~~^~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ptr_reseat_bad.cpp -o ptr_reseat_bad",
      "out": "",
      "err": "ptr_reseat_bad.cpp:7:10: error: cannot assign to variable 'fork' with const-qualified type 'int *const'\n    7 |     fork = &pie;\n      |     ~~~~ ^\nptr_reseat_bad.cpp:6:16: note: variable 'fork' declared const here\n    6 |     int* const fork{&cake};\n      |     ~~~~~~~~~~~^~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "ptr_write_bad.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cake{8};\n    const int* look{&cake};\n    *look = 7;\n    std::cout << cake << '\\n';\n}\n",
   "stdout": "",
   "stderr": "ptr_write_bad.cpp: In function ‘int main()’:\nptr_write_bad.cpp:6:11: error: assignment of read-only location ‘* look’\n    6 |     *look = 7;\n      |     ~~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ptr_write_bad.cpp -o ptr_write_bad",
     "out": "",
     "err": "ptr_write_bad.cpp: In function ‘int main()’:\nptr_write_bad.cpp:6:11: error: assignment of read-only location ‘* look’\n    6 |     *look = 7;\n      |     ~~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "ptr_write_bad.cpp:6:11: error: read-only variable is not assignable\n    6 |     *look = 7;\n      |     ~~~~~ ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ptr_write_bad.cpp -o ptr_write_bad",
      "out": "",
      "err": "ptr_write_bad.cpp:6:11: error: read-only variable is not assignable\n    6 |     *look = 7;\n      |     ~~~~~ ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "read_error.cpp": {
   "src": "#include <iostream>\n\nint read() {\n    int n{};\n    std::cin >> n;\n    return n;\n}\n\nint main() {\n    constexpr int guests{read()};\n    std::cout << guests << '\\n';\n}\n",
   "stdout": "",
   "stderr": "read_error.cpp: In function ‘int main()’:\nread_error.cpp:10:30: error: call to non-‘constexpr’ function ‘int read()’\n   10 |     constexpr int guests{read()};\n      |                          ~~~~^~\nread_error.cpp:3:5: note: ‘int read()’ declared here\n    3 | int read() {\n      |     ^~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g read_error.cpp -o read_error",
     "out": "",
     "err": "read_error.cpp: In function ‘int main()’:\nread_error.cpp:10:30: error: call to non-‘constexpr’ function ‘int read()’\n   10 |     constexpr int guests{read()};\n      |                          ~~~~^~\nread_error.cpp:3:5: note: ‘int read()’ declared here\n    3 | int read() {\n      |     ^~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "read_error.cpp:10:19: error: constexpr variable 'guests' must be initialized by a constant expression\n   10 |     constexpr int guests{read()};\n      |                   ^     ~~~~~~~~\nread_error.cpp:10:26: note: non-constexpr function 'read' cannot be used in a constant expression\n   10 |     constexpr int guests{read()};\n      |                          ^\nread_error.cpp:3:5: note: declared here\n    3 | int read() {\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g read_error.cpp -o read_error",
      "out": "",
      "err": "read_error.cpp:10:19: error: constexpr variable 'guests' must be initialized by a constant expression\n   10 |     constexpr int guests{read()};\n      |                   ^     ~~~~~~~~\nread_error.cpp:10:26: note: non-constexpr function 'read' cannot be used in a constant expression\n   10 |     constexpr int guests{read()};\n      |                          ^\nread_error.cpp:3:5: note: declared here\n    3 | int read() {\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "road_bake.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    constexpr int planned{slices_for(10)};\n    std::cout << \"Cake ready: \" << planned << \" slices\\n\";\n}\n",
   "stdout": "Cake ready: 24 slices\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_bake.cpp -o road_bake",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_bake",
     "out": "Cake ready: 24 slices\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Cake ready: 24 slices\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_bake.cpp -o road_bake",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_bake",
      "out": "Cake ready: 24 slices\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_party.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    int guests{};\n    std::cout << \"How many guests came? \";\n    std::cin >> guests;\n    int needed{slices_for(guests)};\n    std::cout << \"Slice it now: \" << needed << \" slices\\n\";\n}\n",
   "stdout": "How many guests came? Slice it now: 18 slices\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_party.cpp -o road_party",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_party",
     "out": "How many guests came? Slice it now: 18 slices\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "How many guests came? Slice it now: 18 slices\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_party.cpp -o road_party",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_party",
      "out": "How many guests came? Slice it now: 18 slices\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "7\n",
   "screen": "How many guests came? 7\nSlice it now: 18 slices\n"
  },
  "sealed.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    const int guests{12};\n    std::cout << \"Cake for \" << guests << \" guests\\n\";\n    guests = 13;\n    std::cout << \"Cake for \" << guests << \" guests\\n\";\n}\n",
   "stdout": "",
   "stderr": "sealed.cpp: In function ‘int main()’:\nsealed.cpp:6:12: error: assignment of read-only variable ‘guests’\n    6 |     guests = 13;\n      |     ~~~~~~~^~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g sealed.cpp -o sealed",
     "out": "",
     "err": "sealed.cpp: In function ‘int main()’:\nsealed.cpp:6:12: error: assignment of read-only variable ‘guests’\n    6 |     guests = 13;\n      |     ~~~~~~~^~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "sealed.cpp:6:12: error: cannot assign to variable 'guests' with const-qualified type 'const int'\n    6 |     guests = 13;\n      |     ~~~~~~ ^\nsealed.cpp:4:15: note: variable 'guests' declared const here\n    4 |     const int guests{12};\n      |     ~~~~~~~~~~^~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g sealed.cpp -o sealed",
      "out": "",
      "err": "sealed.cpp:6:12: error: cannot assign to variable 'guests' with const-qualified type 'const int'\n    6 |     guests = 13;\n      |     ~~~~~~ ^\nsealed.cpp:4:15: note: variable 'guests' declared const here\n    4 |     const int guests{12};\n      |     ~~~~~~~~~~^~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "slices.cpp": {
   "src": "#include <iostream>\n\nconstexpr int slices_for(int guests) {\n    return guests * 2 + 4;\n}\n\nint main() {\n    constexpr int planned{slices_for(10)};\n    std::cout << \"Baked before the party: \" << planned << '\\n';\n    int turned_up{};\n    std::cout << \"How many guests came? \";\n    std::cin >> turned_up;\n    int needed{slices_for(turned_up)};\n    std::cout << \"Sliced at the party: \" << needed << '\\n';\n}\n",
   "stdout": "Baked before the party: 24\nHow many guests came? Sliced at the party: 18\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g slices.cpp -o slices",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./slices",
     "out": "Baked before the party: 24\nHow many guests came? Sliced at the party: 18\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Baked before the party: 24\nHow many guests came? Sliced at the party: 18\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g slices.cpp -o slices",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./slices",
      "out": "Baked before the party: 24\nHow many guests came? Sliced at the party: 18\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "7\n",
   "screen": "Baked before the party: 24\nHow many guests came? 7\nSliced at the party: 18\n"
  },
  "spot_auto.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores{70, 85, 90};\n    for (auto s : scores) {\n        s += 10;\n    }\n    for (const auto& s : scores) {\n        std::cout << s << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "70 85 90 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_auto.cpp -o spot_auto",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_auto",
     "out": "70 85 90 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "70 85 90 \n",
    "stderr": "spot_auto.cpp:6:15: warning: variable 's' set but not used [-Wunused-but-set-variable]\n    6 |     for (auto s : scores) {\n      |               ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_auto.cpp -o spot_auto",
      "out": "",
      "err": "spot_auto.cpp:6:15: warning: variable 's' set but not used [-Wunused-but-set-variable]\n    6 |     for (auto s : scores) {\n      |               ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./spot_auto",
      "out": "70 85 90 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_const.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint highest(const std::vector<int>& scores) {\n    int best{scores[0]};\n    for (int s : scores) {\n        if (s > best) {\n            scores[0] = s;\n        }\n    }\n    return best;\n}\n\nint main() {\n    std::vector<int> scores{40, 75, 62};\n    std::cout << \"best: \" << highest(scores) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_const.cpp: In function ‘int highest(const std::vector<int>&)’:\nspot_const.cpp:8:23: error: assignment of read-only location ‘(& scores)->std::vector<int>::operator[](0)’\n    8 |             scores[0] = s;\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_const.cpp -o spot_const",
     "out": "",
     "err": "spot_const.cpp: In function ‘int highest(const std::vector<int>&)’:\nspot_const.cpp:8:23: error: assignment of read-only location ‘(& scores)->std::vector<int>::operator[](0)’\n    8 |             scores[0] = s;\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_const.cpp:8:23: error: cannot assign to return value because function 'operator[]' returns a const value\n    8 |             scores[0] = s;\n      |             ~~~~~~~~~ ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_vector.h:1144:7: note: function 'operator[]' which returns const-qualified type 'const_reference' (aka 'const int &') declared here\n 1144 |       const_reference\n      |       ^~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_const.cpp -o spot_const",
      "out": "",
      "err": "spot_const.cpp:8:23: error: cannot assign to return value because function 'operator[]' returns a const value\n    8 |             scores[0] = s;\n      |             ~~~~~~~~~ ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_vector.h:1144:7: note: function 'operator[]' which returns const-qualified type 'const_reference' (aka 'const int &') declared here\n 1144 |       const_reference\n      |       ^~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_constexpr.cpp": {
   "src": "#include <iostream>\n\nint candles_for(int age) {\n    return age + 1;\n}\n\nconstexpr int cake_size(int guests) {\n    return guests * 2;\n}\n\nint main() {\n    constexpr int size{cake_size(8)};\n    constexpr int candles{candles_for(9)};\n    std::cout << size << \" slices, \" << candles << \" candles\\n\";\n}\n",
   "stdout": "",
   "stderr": "spot_constexpr.cpp: In function ‘int main()’:\nspot_constexpr.cpp:13:38: error: call to non-‘constexpr’ function ‘int candles_for(int)’\n   13 |     constexpr int candles{candles_for(9)};\n      |                           ~~~~~~~~~~~^~~\nspot_constexpr.cpp:3:5: note: ‘int candles_for(int)’ declared here\n    3 | int candles_for(int age) {\n      |     ^~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_constexpr.cpp -o spot_constexpr",
     "out": "",
     "err": "spot_constexpr.cpp: In function ‘int main()’:\nspot_constexpr.cpp:13:38: error: call to non-‘constexpr’ function ‘int candles_for(int)’\n   13 |     constexpr int candles{candles_for(9)};\n      |                           ~~~~~~~~~~~^~~\nspot_constexpr.cpp:3:5: note: ‘int candles_for(int)’ declared here\n    3 | int candles_for(int age) {\n      |     ^~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_constexpr.cpp:13:19: error: constexpr variable 'candles' must be initialized by a constant expression\n   13 |     constexpr int candles{candles_for(9)};\n      |                   ^      ~~~~~~~~~~~~~~~~\nspot_constexpr.cpp:13:27: note: non-constexpr function 'candles_for' cannot be used in a constant expression\n   13 |     constexpr int candles{candles_for(9)};\n      |                           ^\nspot_constexpr.cpp:3:5: note: declared here\n    3 | int candles_for(int age) {\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_constexpr.cpp -o spot_constexpr",
      "out": "",
      "err": "spot_constexpr.cpp:13:19: error: constexpr variable 'candles' must be initialized by a constant expression\n   13 |     constexpr int candles{candles_for(9)};\n      |                   ^      ~~~~~~~~~~~~~~~~\nspot_constexpr.cpp:13:27: note: non-constexpr function 'candles_for' cannot be used in a constant expression\n   13 |     constexpr int candles{candles_for(9)};\n      |                           ^\nspot_constexpr.cpp:3:5: note: declared here\n    3 | int candles_for(int age) {\n      |     ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "table.cpp": {
   "src": "#include <array>\n#include <iostream>\n\nconstexpr std::array<int, 6> make_squares() {\n    std::array<int, 6> t{};\n    for (int i = 0; i < 6; ++i) {\n        t[i] = i * i;\n    }\n    return t;\n}\n\nconstexpr std::array<int, 6> squares{make_squares()};\nstatic_assert(squares[5] == 25);\n\nint main() {\n    for (int s : squares) {\n        std::cout << s << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "0 1 4 9 16 25 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g table.cpp -o table",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./table",
     "out": "0 1 4 9 16 25 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0 1 4 9 16 25 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g table.cpp -o table",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./table",
      "out": "0 1 4 9 16 25 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_auto.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{1, 2, 3};\n    for (int i = 0; i < 3; ++i) {\n        auto copy = v[i];\n        auto& real = v[i];\n        copy *= 10;\n        real += 1;\n        std::cout << i << ' ' << copy << ' ' << v[i] << '\\n';\n    }\n}\n",
   "stdout": "0 10 2\n1 20 3\n2 30 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_auto.cpp -o trace_auto",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_auto",
     "out": "0 10 2\n1 20 3\n2 30 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0 10 2\n1 20 3\n2 30 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_auto.cpp -o trace_auto",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_auto",
      "out": "0 10 2\n1 20 3\n2 30 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_fact.cpp": {
   "src": "#include <iostream>\n\nconstexpr int factorial(int n) {\n    int result{1};\n    for (int k = 2; k <= n; ++k) {\n        result *= k;\n    }\n    return result;\n}\n\nstatic_assert(factorial(5) == 120);\n\nint main() {\n    for (int i = 1; i <= 5; ++i) {\n        std::cout << i << ' ' << factorial(i) << '\\n';\n    }\n}\n",
   "stdout": "1 1\n2 2\n3 6\n4 24\n5 120\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_fact.cpp -o trace_fact",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_fact",
     "out": "1 1\n2 2\n3 6\n4 24\n5 120\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1\n2 2\n3 6\n4 24\n5 120\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_fact.cpp -o trace_fact",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_fact",
      "out": "1 1\n2 2\n3 6\n4 24\n5 120\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "tuple_get_bad.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <tuple>\n\nint main() {\n    std::tuple<std::string, int, double> cake{\"lemon\", 8, 12.5};\n    std::cout << std::get<3>(cake) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "In file included from /usr/include/c++/13/bits/uses_allocator_args.h:38,\n                 from /usr/include/c++/13/bits/memory_resource.h:41,\n                 from /usr/include/c++/13/string:58,\n                 from /usr/include/c++/13/bits/locale_classes.h:40,\n                 from /usr/include/c++/13/bits/ios_base.h:41,\n                 from /usr/include/c++/13/ios:44,\n                 from /usr/include/c++/13/ostream:40,\n                 from /usr/include/c++/13/iostream:41,\n                 from tuple_get_bad.cpp:1:\n/usr/include/c++/13/tuple: In instantiation of ‘struct std::tuple_element<3, std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double> >’:\n/usr/include/c++/13/bits/utility.h:84:11:   required by substitution of ‘template<long unsigned int __i, class _Tp> using std::__tuple_element_t = typename std::tuple_element::type [with long unsigned int __i = 3; _Tp = std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>]’\n/usr/include/c++/13/tuple:1824:5:   required by substitution of ‘template<long unsigned int __i, class ... _Elements> constexpr std::__tuple_element_t<__i, std::tuple<_UTypes ...> >&& std::get(const tuple<_UTypes ...>&&) [with long unsigned int __i = 3; _Elements = {std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double}]’\ntuple_get_bad.cpp:7:29:   required from here\n/usr/include/c++/13/tuple:1780:25: error: static assertion failed: tuple index must be in range\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ~~~~^~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/tuple:1780:25: note: the comparison reduces to ‘(3 < 3)’\n/usr/include/c++/13/tuple:1782:13: error: no type named ‘type’ in ‘struct std::_Nth_type<3, std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>’\n 1782 |       using type = typename _Nth_type<__i, _Types...>::type;\n      |             ^~~~\ntuple_get_bad.cpp: In function ‘int main()’:\ntuple_get_bad.cpp:7:29: error: use of deleted function ‘constexpr std::__enable_if_t<(__i >= sizeof... (_Types))> std::get(const tuple<_UTypes ...>&) [with long unsigned int __i = 3; _Elements = {__cxx11::basic_string<char, char_traits<char>, allocator<char> >, int, double}; __enable_if_t<(__i >= sizeof... (_Types))> = void]’\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ~~~~~~~~~~~^~~~~~\n/usr/include/c++/13/tuple:1834:5: note: declared here\n 1834 |     get(const tuple<_Elements...>&) = delete;\n      |     ^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g tuple_get_bad.cpp -o tuple_get_bad",
     "out": "",
     "err": "In file included from /usr/include/c++/13/bits/uses_allocator_args.h:38,\n                 from /usr/include/c++/13/bits/memory_resource.h:41,\n                 from /usr/include/c++/13/string:58,\n                 from /usr/include/c++/13/bits/locale_classes.h:40,\n                 from /usr/include/c++/13/bits/ios_base.h:41,\n                 from /usr/include/c++/13/ios:44,\n                 from /usr/include/c++/13/ostream:40,\n                 from /usr/include/c++/13/iostream:41,\n                 from tuple_get_bad.cpp:1:\n/usr/include/c++/13/tuple: In instantiation of ‘struct std::tuple_element<3, std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double> >’:\n/usr/include/c++/13/bits/utility.h:84:11:   required by substitution of ‘template<long unsigned int __i, class _Tp> using std::__tuple_element_t = typename std::tuple_element::type [with long unsigned int __i = 3; _Tp = std::tuple<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>]’\n/usr/include/c++/13/tuple:1824:5:   required by substitution of ‘template<long unsigned int __i, class ... _Elements> constexpr std::__tuple_element_t<__i, std::tuple<_UTypes ...> >&& std::get(const tuple<_UTypes ...>&&) [with long unsigned int __i = 3; _Elements = {std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double}]’\ntuple_get_bad.cpp:7:29:   required from here\n/usr/include/c++/13/tuple:1780:25: error: static assertion failed: tuple index must be in range\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ~~~~^~~~~~~~~~~~~~~~~~~\n/usr/include/c++/13/tuple:1780:25: note: the comparison reduces to ‘(3 < 3)’\n/usr/include/c++/13/tuple:1782:13: error: no type named ‘type’ in ‘struct std::_Nth_type<3, std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int, double>’\n 1782 |       using type = typename _Nth_type<__i, _Types...>::type;\n      |             ^~~~\ntuple_get_bad.cpp: In function ‘int main()’:\ntuple_get_bad.cpp:7:29: error: use of deleted function ‘constexpr std::__enable_if_t<(__i >= sizeof... (_Types))> std::get(const tuple<_UTypes ...>&) [with long unsigned int __i = 3; _Elements = {__cxx11::basic_string<char, char_traits<char>, allocator<char> >, int, double}; __enable_if_t<(__i >= sizeof... (_Types))> = void]’\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ~~~~~~~~~~~^~~~~~\n/usr/include/c++/13/tuple:1834:5: note: declared here\n 1834 |     get(const tuple<_Elements...>&) = delete;\n      |     ^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "In file included from tuple_get_bad.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/iostream:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:40:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ios:44:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ios_base.h:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/locale_classes.h:40:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string:58:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/memory_resource.h:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/uses_allocator_args.h:38:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1780:21: error: static assertion failed due to requirement '3UL < sizeof...(_Types)': tuple index must be in range\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ^~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/utility.h:84:5: note: in instantiation of template class 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>' requested here\n   84 |     using __tuple_element_t = typename tuple_element<__i, _Tp>::type;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1802:15: note: in instantiation of template type alias '__tuple_element_t' requested here\n 1802 |     constexpr __tuple_element_t<__i, tuple<_Elements...>>&\n      |               ^\ntuple_get_bad.cpp:7:18: note: while substituting deduced template arguments into function template 'get' [with __i = 3, _Elements = <std::basic_string<char>, int, double>]\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1780:25: note: expression evaluates to '3 < 3'\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ~~~~^~~~~~~~~~~~~~~~~~~\ntuple_get_bad.cpp:7:18: error: call to deleted function 'get'\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ^~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1834:5: note: candidate function [with __i = 3, _Elements = <std::basic_string<char>, int, double>] has been explicitly deleted\n 1834 |     get(const tuple<_Elements...>&) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1035:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1035 |     get(pair<_Tp1, _Tp2>& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1040:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1040 |     get(pair<_Tp1, _Tp2>&& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1045:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1045 |     get(const pair<_Tp1, _Tp2>& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1050:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1050 |     get(const pair<_Tp1, _Tp2>&& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_util.h:438:5: note: candidate template ignored: could not match 'subrange' against 'tuple'\n  438 |     get(const subrange<_It, _Sent, _Kind>& __r)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_util.h:449:5: note: candidate template ignored: could not match 'subrange' against 'tuple'\n  449 |     get(subrange<_It, _Sent, _Kind>&& __r)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1803:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]\n 1803 |     get(tuple<_Elements...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1809:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1809 |     get(const tuple<_Elements...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1815:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1815 |     get(tuple<_Elements...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1824:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1824 |     get(const tuple<_Elements...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2023:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2023 |     get(array<_Tp, _Nm>&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2027:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2027 |     get(array<_Tp, _Nm>&&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2031:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2031 |     get(const array<_Tp, _Nm>&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2035:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2035 |     get(const array<_Tp, _Nm>&&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1059:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1059 |     get(pair<_Tp, _Up>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1064:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1064 |     get(const pair<_Tp, _Up>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1069:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1069 |     get(pair<_Tp, _Up>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1074:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1074 |     get(const pair<_Tp, _Up>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1079:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1079 |     get(pair<_Up, _Tp>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1084:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1084 |     get(const pair<_Up, _Tp>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1089:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1089 |     get(pair<_Up, _Tp>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1094:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1094 |     get(const pair<_Up, _Tp>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1844:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1844 |     get(tuple<_Types...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1855:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1855 |     get(tuple<_Types...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1866:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1866 |     get(const tuple<_Types...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1878:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1878 |     get(const tuple<_Types...>&& __t) noexcept\n      |     ^\ntuple_get_bad.cpp:7:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void'))\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |     ~~~~~~~~~ ^  ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char' for 2nd argument\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^                                                 ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:570:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char' for 2nd argument\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^                                               ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:581:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'signed char' for 2nd argument\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:586:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned char' for 2nd argument\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:595:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'wchar_t' for 2nd argument\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:600:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char8_t' for 2nd argument\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:605:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char16_t' for 2nd argument\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:609:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char32_t' for 2nd argument\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:662:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char *' for 2nd argument\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:675:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const signed char *' for 2nd argument\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:680:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const unsigned char *' for 2nd argument\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:689:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const wchar_t *' for 2nd argument\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:694:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char8_t *' for 2nd argument\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:699:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char16_t *' for 2nd argument\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:703:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char32_t *' for 2nd argument\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ostream.tcc:307:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char *' for 2nd argument\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^                                                 ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/cstddef:124:5: note: candidate function template not viable: no known conversion from 'ostream' (aka 'basic_ostream<char>') to 'byte' for 1st argument\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:554:5: note: candidate template ignored: deduced conflicting types for parameter '_CharT' ('char' vs. '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void'))\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string_view:761:5: note: candidate template ignored: could not match 'basic_string_view<_CharT, _Traits>' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/basic_string.h:4032:5: note: candidate template ignored: could not match 'basic_string<_CharT, _Traits, _Alloc>' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:615:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:620:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:624:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:645:5: note: candidate template ignored: could not match 'const _CharT *' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:709:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:714:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:718:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:801:5: note: candidate template ignored: substitution failure [with _Ostream = ostream &, _Tp = __enable_if_t<(3UL >= sizeof...(_Elements))>]: constraints not satisfied for alias template '__rvalue_stream_insertion_t' [with _Os = std::basic_ostream<char> &, _Tp = void]\n  800 |     inline __rvalue_stream_insertion_t<_Ostream, _Tp>\n      |            ~~~~~~~~~~~~~~~~~~~~~~~~~~~\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:110:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__ostream_type &(*)(__ostream_type &)' (aka 'basic_ostream<char, std::char_traits<char>> &(*)(basic_ostream<char, std::char_traits<char>> &)') for 1st argument\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:119:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__ios_type &(*)(__ios_type &)' (aka 'basic_ios<char, std::char_traits<char>> &(*)(basic_ios<char, std::char_traits<char>> &)') for 1st argument\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:129:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'ios_base &(*)(ios_base &)' for 1st argument\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:168:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long' for 1st argument\n  168 |       operator<<(long __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:172:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned long' for 1st argument\n  172 |       operator<<(unsigned long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:176:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'bool' for 1st argument\n  176 |       operator<<(bool __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:180:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'short' for 1st argument\n  180 |       operator<<(short __n);\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:183:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned short' for 1st argument\n  183 |       operator<<(unsigned short __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:191:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'int' for 1st argument\n  191 |       operator<<(int __n);\n      |       ^          ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:194:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned int' for 1st argument\n  194 |       operator<<(unsigned int __n)\n      |       ^          ~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:203:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long long' for 1st argument\n  203 |       operator<<(long long __n)\n      |       ^          ~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:207:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned long long' for 1st argument\n  207 |       operator<<(unsigned long long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:222:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'double' for 1st argument\n  222 |       operator<<(double __f)\n      |       ^          ~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:226:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'float' for 1st argument\n  226 |       operator<<(float __f)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:234:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long double' for 1st argument\n  234 |       operator<<(long double __f)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:292:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const void *' for 1st argument\n  292 |       operator<<(const void* __p)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:297:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'nullptr_t' (aka 'std::nullptr_t') for 1st argument\n  297 |       operator<<(nullptr_t)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:304:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const volatile void *' for 1st argument\n  304 |       operator<<(const volatile void* __p)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:330:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__streambuf_type *' (aka 'basic_streambuf<char, std::char_traits<char>> *') for 1st argument\n  330 |       operator<<(__streambuf_type* __sb);\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n3 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g tuple_get_bad.cpp -o tuple_get_bad",
      "out": "",
      "err": "In file included from tuple_get_bad.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/iostream:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:40:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ios:44:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ios_base.h:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/locale_classes.h:40:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string:58:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/memory_resource.h:41:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/uses_allocator_args.h:38:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1780:21: error: static assertion failed due to requirement '3UL < sizeof...(_Types)': tuple index must be in range\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ^~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/utility.h:84:5: note: in instantiation of template class 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>' requested here\n   84 |     using __tuple_element_t = typename tuple_element<__i, _Tp>::type;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1802:15: note: in instantiation of template type alias '__tuple_element_t' requested here\n 1802 |     constexpr __tuple_element_t<__i, tuple<_Elements...>>&\n      |               ^\ntuple_get_bad.cpp:7:18: note: while substituting deduced template arguments into function template 'get' [with __i = 3, _Elements = <std::basic_string<char>, int, double>]\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1780:25: note: expression evaluates to '3 < 3'\n 1780 |       static_assert(__i < sizeof...(_Types), \"tuple index must be in range\");\n      |                     ~~~~^~~~~~~~~~~~~~~~~~~\ntuple_get_bad.cpp:7:18: error: call to deleted function 'get'\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |                  ^~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1834:5: note: candidate function [with __i = 3, _Elements = <std::basic_string<char>, int, double>] has been explicitly deleted\n 1834 |     get(const tuple<_Elements...>&) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1035:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1035 |     get(pair<_Tp1, _Tp2>& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1040:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1040 |     get(pair<_Tp1, _Tp2>&& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1045:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1045 |     get(const pair<_Tp1, _Tp2>& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1050:5: note: candidate template ignored: could not match 'pair' against 'tuple'\n 1050 |     get(const pair<_Tp1, _Tp2>&& __in) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_util.h:438:5: note: candidate template ignored: could not match 'subrange' against 'tuple'\n  438 |     get(const subrange<_It, _Sent, _Kind>& __r)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_util.h:449:5: note: candidate template ignored: could not match 'subrange' against 'tuple'\n  449 |     get(subrange<_It, _Sent, _Kind>&& __r)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1803:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]\n 1803 |     get(tuple<_Elements...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1809:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1809 |     get(const tuple<_Elements...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1815:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1815 |     get(tuple<_Elements...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1824:5: note: candidate template ignored: substitution failure [with __i = 3, _Elements = <std::basic_string<char>, int, double>]: no type named 'type' in 'std::tuple_element<3, std::tuple<std::basic_string<char>, int, double>>'\n 1824 |     get(const tuple<_Elements...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2023:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2023 |     get(array<_Tp, _Nm>&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2027:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2027 |     get(array<_Tp, _Nm>&&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2031:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2031 |     get(const array<_Tp, _Nm>&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:2035:5: note: candidate template ignored: could not match 'array' against 'tuple'\n 2035 |     get(const array<_Tp, _Nm>&&) noexcept;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1059:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1059 |     get(pair<_Tp, _Up>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1064:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1064 |     get(const pair<_Tp, _Up>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1069:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1069 |     get(pair<_Tp, _Up>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1074:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1074 |     get(const pair<_Tp, _Up>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1079:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1079 |     get(pair<_Up, _Tp>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1084:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1084 |     get(const pair<_Up, _Tp>& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1089:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1089 |     get(pair<_Up, _Tp>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_pair.h:1094:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1094 |     get(const pair<_Up, _Tp>&& __p) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1844:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1844 |     get(tuple<_Types...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1855:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1855 |     get(tuple<_Types...>&& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1866:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1866 |     get(const tuple<_Types...>& __t) noexcept\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/tuple:1878:5: note: candidate template ignored: invalid explicitly-specified argument for template parameter '_Tp'\n 1878 |     get(const tuple<_Types...>&& __t) noexcept\n      |     ^\ntuple_get_bad.cpp:7:15: error: invalid operands to binary expression ('ostream' (aka 'basic_ostream<char>') and '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void'))\n    7 |     std::cout << std::get<3>(cake) << '\\n';\n      |     ~~~~~~~~~ ^  ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/system_error:339:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const error_code' for 2nd argument\n  339 |     operator<<(basic_ostream<_CharT, _Traits>& __os, const error_code& __e)\n      |     ^                                                ~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:564:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char' for 2nd argument\n  564 |     operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)\n      |     ^                                                 ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:570:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char' for 2nd argument\n  570 |     operator<<(basic_ostream<char, _Traits>& __out, char __c)\n      |     ^                                               ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:581:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'signed char' for 2nd argument\n  581 |     operator<<(basic_ostream<char, _Traits>& __out, signed char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:586:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned char' for 2nd argument\n  586 |     operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)\n      |     ^                                               ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:595:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'wchar_t' for 2nd argument\n  595 |     operator<<(basic_ostream<char, _Traits>&, wchar_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:600:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char8_t' for 2nd argument\n  600 |     operator<<(basic_ostream<char, _Traits>&, char8_t) = delete;\n      |     ^                                         ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:605:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char16_t' for 2nd argument\n  605 |     operator<<(basic_ostream<char, _Traits>&, char16_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:609:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'char32_t' for 2nd argument\n  609 |     operator<<(basic_ostream<char, _Traits>&, char32_t) = delete;\n      |     ^                                         ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:662:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char *' for 2nd argument\n  662 |     operator<<(basic_ostream<char, _Traits>& __out, const char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:675:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const signed char *' for 2nd argument\n  675 |     operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:680:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const unsigned char *' for 2nd argument\n  680 |     operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)\n      |     ^                                               ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:689:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const wchar_t *' for 2nd argument\n  689 |     operator<<(basic_ostream<char, _Traits>&, const wchar_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:694:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char8_t *' for 2nd argument\n  694 |     operator<<(basic_ostream<char, _Traits>&, const char8_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:699:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char16_t *' for 2nd argument\n  699 |     operator<<(basic_ostream<char, _Traits>&, const char16_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:703:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char32_t *' for 2nd argument\n  703 |     operator<<(basic_ostream<char, _Traits>&, const char32_t*) = delete;\n      |     ^                                         ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ostream.tcc:307:5: note: candidate function template not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const char *' for 2nd argument\n  307 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s)\n      |     ^                                                 ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/cstddef:124:5: note: candidate function template not viable: no known conversion from 'ostream' (aka 'basic_ostream<char>') to 'byte' for 1st argument\n  124 |     operator<<(byte __b, _IntegerType __shift) noexcept\n      |     ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:554:5: note: candidate template ignored: deduced conflicting types for parameter '_CharT' ('char' vs. '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void'))\n  554 |     operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/string_view:761:5: note: candidate template ignored: could not match 'basic_string_view<_CharT, _Traits>' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n  761 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/basic_string.h:4032:5: note: candidate template ignored: could not match 'basic_string<_CharT, _Traits, _Alloc>' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n 4032 |     operator<<(basic_ostream<_CharT, _Traits>& __os,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:615:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  615 |     operator<<(basic_ostream<wchar_t, _Traits>&, char8_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:620:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  620 |     operator<<(basic_ostream<wchar_t, _Traits>&, char16_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:624:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  624 |     operator<<(basic_ostream<wchar_t, _Traits>&, char32_t) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:645:5: note: candidate template ignored: could not match 'const _CharT *' against '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void')\n  645 |     operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:709:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  709 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char8_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:714:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  714 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char16_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:718:5: note: candidate template ignored: could not match 'wchar_t' against 'char'\n  718 |     operator<<(basic_ostream<wchar_t, _Traits>&, const char32_t*) = delete;\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:801:5: note: candidate template ignored: substitution failure [with _Ostream = ostream &, _Tp = __enable_if_t<(3UL >= sizeof...(_Elements))>]: constraints not satisfied for alias template '__rvalue_stream_insertion_t' [with _Os = std::basic_ostream<char> &, _Tp = void]\n  800 |     inline __rvalue_stream_insertion_t<_Ostream, _Tp>\n      |            ~~~~~~~~~~~~~~~~~~~~~~~~~~~\n  801 |     operator<<(_Ostream&& __os, const _Tp& __x)\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:110:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__ostream_type &(*)(__ostream_type &)' (aka 'basic_ostream<char, std::char_traits<char>> &(*)(basic_ostream<char, std::char_traits<char>> &)') for 1st argument\n  110 |       operator<<(__ostream_type& (*__pf)(__ostream_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:119:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__ios_type &(*)(__ios_type &)' (aka 'basic_ios<char, std::char_traits<char>> &(*)(basic_ios<char, std::char_traits<char>> &)') for 1st argument\n  119 |       operator<<(__ios_type& (*__pf)(__ios_type&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:129:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'ios_base &(*)(ios_base &)' for 1st argument\n  129 |       operator<<(ios_base& (*__pf) (ios_base&))\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:168:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long' for 1st argument\n  168 |       operator<<(long __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:172:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned long' for 1st argument\n  172 |       operator<<(unsigned long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:176:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'bool' for 1st argument\n  176 |       operator<<(bool __n)\n      |       ^          ~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:180:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'short' for 1st argument\n  180 |       operator<<(short __n);\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:183:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned short' for 1st argument\n  183 |       operator<<(unsigned short __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:191:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'int' for 1st argument\n  191 |       operator<<(int __n);\n      |       ^          ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:194:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned int' for 1st argument\n  194 |       operator<<(unsigned int __n)\n      |       ^          ~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:203:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long long' for 1st argument\n  203 |       operator<<(long long __n)\n      |       ^          ~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:207:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'unsigned long long' for 1st argument\n  207 |       operator<<(unsigned long long __n)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:222:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'double' for 1st argument\n  222 |       operator<<(double __f)\n      |       ^          ~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:226:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'float' for 1st argument\n  226 |       operator<<(float __f)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:234:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'long double' for 1st argument\n  234 |       operator<<(long double __f)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:292:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const void *' for 1st argument\n  292 |       operator<<(const void* __p)\n      |       ^          ~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:297:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'nullptr_t' (aka 'std::nullptr_t') for 1st argument\n  297 |       operator<<(nullptr_t)\n      |       ^          ~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:304:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to 'const volatile void *' for 1st argument\n  304 |       operator<<(const volatile void* __p)\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/ostream:330:7: note: candidate function not viable: cannot convert argument of incomplete type '__enable_if_t<(3UL >= sizeof...(_Elements))>' (aka 'void') to '__streambuf_type *' (aka 'basic_streambuf<char, std::char_traits<char>> *') for 1st argument\n  330 |       operator<<(__streambuf_type* __sb);\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~\n3 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "vecbool.cpp": {
   "src": "#include <iostream>\n#include <type_traits>\n#include <vector>\n\nint main() {\n    std::vector<bool> lit{true, true};\n    auto first = lit[0];\n    bool second = lit[1];\n    static_assert(!std::is_same_v<decltype(first), bool>);\n    lit[0] = false;\n    lit[1] = false;\n    std::cout << \"first: \" << first << '\\n';\n    std::cout << \"second: \" << second << '\\n';\n}\n",
   "stdout": "first: 0\nsecond: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g vecbool.cpp -o vecbool",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./vecbool",
     "out": "first: 0\nsecond: 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "first: 0\nsecond: 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g vecbool.cpp -o vecbool",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./vecbool",
      "out": "first: 0\nsecond: 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
