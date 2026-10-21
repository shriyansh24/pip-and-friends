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
  "workdir": "/home/you/cpp-ch3",
  "versionDifferences": [
   "boss_const.cpp",
   "case.cpp",
   "keyword.cpp",
   "mod_double.cpp",
   "readonly.cpp",
   "spot_uninit.cpp",
   "too_early.cpp",
   "twice.cpp",
   "uninit.cpp",
   "xor_trap.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_const.cpp, case.cpp, keyword.cpp, mod_double.cpp, readonly.cpp, spot_uninit.cpp, too_early.cpp, twice.cpp, uninit.cpp, xor_trap.cpp."
 },
 "programs": {
  "auto_look.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    auto whole{7};\n    auto wobbly{7.0};\n    std::cout << whole / 2 << '\\n';\n    std::cout << wobbly / 2 << '\\n';\n}\n",
   "stdout": "3\n3.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g auto_look.cpp -o auto_look",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./auto_look",
     "out": "3\n3.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3\n3.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g auto_look.cpp -o auto_look",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./auto_look",
      "out": "3\n3.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "average_bug.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total{17};\n    int count{4};\n    double average = total / count;\n    std::cout << \"Average: \" << average << '\\n';\n}\n",
   "stdout": "Average: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g average_bug.cpp -o average_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./average_bug",
     "out": "Average: 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Average: 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g average_bug.cpp -o average_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./average_bug",
      "out": "Average: 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "average_fixed.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    double total{17};\n    int count{4};\n    double average = total / count;\n    std::cout << \"Average: \" << average << '\\n';\n}\n",
   "stdout": "Average: 4.25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g average_fixed.cpp -o average_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./average_fixed",
     "out": "Average: 4.25\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Average: 4.25\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g average_fixed.cpp -o average_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./average_fixed",
      "out": "Average: 4.25\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_avg.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    double total{23};\n    int games{4};\n    double average = total / games;\n    std::cout << \"Average: \" << average << '\\n';\n}\n",
   "stdout": "Average: 5.75\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_avg.cpp -o boss_avg",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_avg",
     "out": "Average: 5.75\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Average: 5.75\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_avg.cpp -o boss_avg",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_avg",
      "out": "Average: 5.75\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_bank.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int coins{50};\n    std::cout << \"start \" << coins << '\\n';\n    coins -= 8;\n    std::cout << \"spend \" << coins << '\\n';\n    coins *= 3;\n    std::cout << \"triple \" << coins << '\\n';\n    int bags = coins / 20;\n    std::cout << \"bags \" << bags << '\\n';\n    coins %= 20;\n    std::cout << \"left \" << coins << '\\n';\n}\n",
   "stdout": "start 50\nspend 42\ntriple 126\nbags 6\nleft 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_bank.cpp -o boss_bank",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_bank",
     "out": "start 50\nspend 42\ntriple 126\nbags 6\nleft 6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "start 50\nspend 42\ntriple 126\nbags 6\nleft 6\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_bank.cpp -o boss_bank",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_bank",
      "out": "start 50\nspend 42\ntriple 126\nbags 6\nleft 6\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_const.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    const int max_lives{3};\n    int lives{max_lives};\n    lives = lives - 1;\n    max_lives = lives;\n    std::cout << lives << '\\n';\n}\n",
   "stdout": "",
   "stderr": "boss_const.cpp: In function ‘int main()’:\nboss_const.cpp:7:15: error: assignment of read-only variable ‘max_lives’\n    7 |     max_lives = lives;\n      |     ~~~~~~~~~~^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_const.cpp -o boss_const",
     "out": "",
     "err": "boss_const.cpp: In function ‘int main()’:\nboss_const.cpp:7:15: error: assignment of read-only variable ‘max_lives’\n    7 |     max_lives = lives;\n      |     ~~~~~~~~~~^~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "boss_const.cpp:7:15: error: cannot assign to variable 'max_lives' with const-qualified type 'const int'\n    7 |     max_lives = lives;\n      |     ~~~~~~~~~ ^\nboss_const.cpp:4:15: note: variable 'max_lives' declared const here\n    4 |     const int max_lives{3};\n      |     ~~~~~~~~~~^~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_const.cpp -o boss_const",
      "out": "",
      "err": "boss_const.cpp:7:15: error: cannot assign to variable 'max_lives' with const-qualified type 'const int'\n    7 |     max_lives = lives;\n      |     ~~~~~~~~~ ^\nboss_const.cpp:4:15: note: variable 'max_lives' declared const here\n    4 |     const int max_lives{3};\n      |     ~~~~~~~~~~^~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_mix.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << -7 / 2 << '\\n';\n    std::cout << -7 % 3 << '\\n';\n    std::cout << 7 / 2.0 << '\\n';\n    std::cout << 2 + 3 * 4 % 5 << '\\n';\n    std::cout << (1 + 2) * 3 / 2 << '\\n';\n}\n",
   "stdout": "-3\n-1\n3.5\n4\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_mix.cpp -o boss_mix",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_mix",
     "out": "-3\n-1\n3.5\n4\n4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "-3\n-1\n3.5\n4\n4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_mix.cpp -o boss_mix",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_mix",
      "out": "-3\n-1\n3.5\n4\n4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_temp.cpp": {
   "src": "#include <iostream>\nint main() {\n    double celsius{25.0};\n    double fahrenheit = celsius * 9 / 5 + 32;\n    std::cout << celsius << \" C is \" << fahrenheit << \" F\\n\";\n}\n",
   "stdout": "25 C is 77 F\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_temp.cpp -o boss_temp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_temp",
     "out": "25 C is 77 F\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "25 C is 77 F\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_temp.cpp -o boss_temp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_temp",
      "out": "25 C is 77 F\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boxes.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{10};\n    const int bonus{5};\n    std::cout << \"score: \" << score << '\\n';\n    score = score + bonus;\n    std::cout << \"score: \" << score << '\\n';\n    double speed{2.5};\n    speed = 4.0;\n    std::cout << \"speed: \" << speed << '\\n';\n}\n",
   "stdout": "score: 10\nscore: 15\nspeed: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boxes.cpp -o boxes",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boxes",
     "out": "score: 10\nscore: 15\nspeed: 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "score: 10\nscore: 15\nspeed: 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boxes.cpp -o boxes",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boxes",
      "out": "score: 10\nscore: 15\nspeed: 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "case.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{10};\n    std::cout << Score << '\\n';\n}\n",
   "stdout": "",
   "stderr": "case.cpp: In function ‘int main()’:\ncase.cpp:5:18: error: ‘Score’ was not declared in this scope; did you mean ‘score’?\n    5 |     std::cout << Score << '\\n';\n      |                  ^~~~~\n      |                  score\ncase.cpp:4:9: warning: unused variable ‘score’ [-Wunused-variable]\n    4 |     int score{10};\n      |         ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g case.cpp -o case",
     "out": "",
     "err": "case.cpp: In function ‘int main()’:\ncase.cpp:5:18: error: ‘Score’ was not declared in this scope; did you mean ‘score’?\n    5 |     std::cout << Score << '\\n';\n      |                  ^~~~~\n      |                  score\ncase.cpp:4:9: warning: unused variable ‘score’ [-Wunused-variable]\n    4 |     int score{10};\n      |         ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "case.cpp:5:18: error: use of undeclared identifier 'Score'; did you mean 'score'?\n    5 |     std::cout << Score << '\\n';\n      |                  ^~~~~\n      |                  score\ncase.cpp:4:9: note: 'score' declared here\n    4 |     int score{10};\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g case.cpp -o case",
      "out": "",
      "err": "case.cpp:5:18: error: use of undeclared identifier 'Score'; did you mean 'score'?\n    5 |     std::cout << Score << '\\n';\n      |                  ^~~~~\n      |                  score\ncase.cpp:4:9: note: 'score' declared here\n    4 |     int score{10};\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "char_code.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    char c = 65;\n    std::cout << c << '\\n';\n    std::cout << +c << '\\n';\n    char d{'B'};\n    std::cout << d << ' ' << +d << '\\n';\n}\n",
   "stdout": "A\n65\nB 66\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g char_code.cpp -o char_code",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./char_code",
     "out": "A\n65\nB 66\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "A\n65\nB 66\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g char_code.cpp -o char_code",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./char_code",
      "out": "A\n65\nB 66\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "char_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    char first{'C'};\n    char second = 97;\n    std::cout << first << second << '\\n';\n    std::cout << +first << '\\n';\n}\n",
   "stdout": "Ca\n67\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g char_quiz.cpp -o char_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./char_quiz",
     "out": "Ca\n67\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ca\n67\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g char_quiz.cpp -o char_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./char_quiz",
      "out": "Ca\n67\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "compound.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int x{5};\n    std::cout << \"start \" << x << '\\n';\n    x += 3;\n    std::cout << \"+=3 \" << x << '\\n';\n    x *= 2;\n    std::cout << \"*=2 \" << x << '\\n';\n    --x;\n    std::cout << \"--x \" << x << '\\n';\n    x /= 3;\n    std::cout << \"/=3 \" << x << '\\n';\n    x %= 4;\n    std::cout << \"%=4 \" << x << '\\n';\n}\n",
   "stdout": "start 5\n+=3 8\n*=2 16\n--x 15\n/=3 5\n%=4 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g compound.cpp -o compound",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./compound",
     "out": "start 5\n+=3 8\n*=2 16\n--x 15\n/=3 5\n%=4 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "start 5\n+=3 8\n*=2 16\n--x 15\n/=3 5\n%=4 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g compound.cpp -o compound",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./compound",
      "out": "start 5\n+=3 8\n*=2 16\n--x 15\n/=3 5\n%=4 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "constexpr_week.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    constexpr int days_per_week{7};\n    int weeks{3};\n    std::cout << weeks * days_per_week << \" days\\n\";\n}\n",
   "stdout": "21 days\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g constexpr_week.cpp -o constexpr_week",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./constexpr_week",
     "out": "21 days\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "21 days\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g constexpr_week.cpp -o constexpr_week",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./constexpr_week",
      "out": "21 days\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "counter.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int lives{3};\n    ++lives;\n    std::cout << lives << '\\n';\n    --lives;\n    --lives;\n    std::cout << lives << '\\n';\n}\n",
   "stdout": "4\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g counter.cpp -o counter",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./counter",
     "out": "4\n2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4\n2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g counter.cpp -o counter",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./counter",
      "out": "4\n2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "cube_bug.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int side{3};\n    int volume = side ^ 3;\n    std::cout << \"Volume: \" << volume << '\\n';\n}\n",
   "stdout": "Volume: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g cube_bug.cpp -o cube_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./cube_bug",
     "out": "Volume: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Volume: 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g cube_bug.cpp -o cube_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./cube_bug",
      "out": "Volume: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "divide.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 7 / 2 << '\\n';\n    std::cout << 7.0 / 2 << '\\n';\n    std::cout << -7 / 2 << '\\n';\n    std::cout << 8 / 2 << '\\n';\n    std::cout << 1 / 2 << '\\n';\n}\n",
   "stdout": "3\n3.5\n-3\n4\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g divide.cpp -o divide",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./divide",
     "out": "3\n3.5\n-3\n4\n0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3\n3.5\n-3\n4\n0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g divide.cpp -o divide",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./divide",
      "out": "3\n3.5\n-3\n4\n0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "division_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 9 / 4 << '\\n';\n    std::cout << 9 % 4 << '\\n';\n    std::cout << 9.0 / 4 << '\\n';\n    std::cout << -9 / 4 << '\\n';\n    std::cout << 4 / 9 << '\\n';\n}\n",
   "stdout": "2\n1\n2.25\n-2\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g division_quiz.cpp -o division_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./division_quiz",
     "out": "2\n1\n2.25\n-2\n0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2\n1\n2.25\n-2\n0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g division_quiz.cpp -o division_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./division_quiz",
      "out": "2\n1\n2.25\n-2\n0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "divzero.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cookies{12};\n    int friends{0};\n    std::cout << \"Sharing \" << cookies << \" cookies...\" << std::endl;\n    int each = cookies / friends;\n    std::cout << \"Each friend gets \" << each << '\\n';\n}\n",
   "stdout": "Sharing 12 cookies...\n",
   "stderr": "divzero.cpp:7:24: runtime error: division by zero\n    #0 0x555555556589 in main /home/you/cpp-ch3/divzero.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x555555556204 in _start (/home/you/cpp-ch3/divzero+0x2204) (BuildId: d80c53e978ac1d7b48a84e8cae146feffbadeda3)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all divzero.cpp -o divzero",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "UBSAN_OPTIONS=print_stacktrace=1 ./divzero",
     "out": "Sharing 12 cookies...\n",
     "err": "divzero.cpp:7:24: runtime error: division by zero\n    #0 0x555555556589 in main /home/you/cpp-ch3/divzero.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x555555556204 in _start (/home/you/cpp-ch3/divzero+0x2204) (BuildId: d80c53e978ac1d7b48a84e8cae146feffbadeda3)\n\n",
     "exit": 1,
     "merged": "Sharing 12 cookies...\ndivzero.cpp:7:24: runtime error: division by zero\n    #0 0x555555556589 in main /home/you/cpp-ch3/divzero.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x555555556204 in _start (/home/you/cpp-ch3/divzero+0x2204) (BuildId: d80c53e978ac1d7b48a84e8cae146feffbadeda3)\n\n"
    }
   ]
  },
  "first_box.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int apples{5};\n    std::cout << \"Apples in the box: \" << apples << '\\n';\n}\n",
   "stdout": "Apples in the box: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g first_box.cpp -o first_box",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./first_box",
     "out": "Apples in the box: 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Apples in the box: 5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g first_box.cpp -o first_box",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./first_box",
      "out": "Apples in the box: 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "float_sum.cpp": {
   "src": "#include <iomanip>\n#include <iostream>\n\nint main() {\n    std::cout << 0.1 + 0.2 << '\\n';\n    std::cout << std::setprecision(17);\n    std::cout << 0.1 + 0.2 << '\\n';\n    std::cout << 0.5 + 0.25 << '\\n';\n}\n",
   "stdout": "0.3\n0.30000000000000004\n0.75\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g float_sum.cpp -o float_sum",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./float_sum",
     "out": "0.3\n0.30000000000000004\n0.75\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0.3\n0.30000000000000004\n0.75\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g float_sum.cpp -o float_sum",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./float_sum",
      "out": "0.3\n0.30000000000000004\n0.75\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "good_names.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total_score{120};\n    int totalScore{95};\n    int player2{7};\n    int _hidden{1};\n    std::cout << total_score << ' ' << totalScore << '\\n';\n    std::cout << player2 << ' ' << _hidden << '\\n';\n}\n",
   "stdout": "120 95\n7 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g good_names.cpp -o good_names",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./good_names",
     "out": "120 95\n7 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "120 95\n7 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g good_names.cpp -o good_names",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./good_names",
      "out": "120 95\n7 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "init_or_assign.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cups{2};\n    int plates = 4;\n    cups = 6;\n    plates = cups + 1;\n    std::cout << cups << ' ' << plates << '\\n';\n}\n",
   "stdout": "6 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g init_or_assign.cpp -o init_or_assign",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./init_or_assign",
     "out": "6 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "6 7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g init_or_assign.cpp -o init_or_assign",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./init_or_assign",
      "out": "6 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "jelly_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 1.0 / 3 << '\\n';\n    std::cout << 2.5 * 2 << '\\n';\n    std::cout << 10.0 / 4 << '\\n';\n}\n",
   "stdout": "0.333333\n5\n2.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g jelly_quiz.cpp -o jelly_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./jelly_quiz",
     "out": "0.333333\n5\n2.5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0.333333\n5\n2.5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g jelly_quiz.cpp -o jelly_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./jelly_quiz",
      "out": "0.333333\n5\n2.5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "keyword.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int class{3};\n    std::cout << class << '\\n';\n}\n",
   "stdout": "",
   "stderr": "keyword.cpp: In function ‘int main()’:\nkeyword.cpp:4:15: error: expected unqualified-id before numeric constant\n    4 |     int class{3};\n      |               ^\nkeyword.cpp:4:5: error: multiple types in one declaration\n    4 |     int class{3};\n      |     ^~~\nkeyword.cpp:4:16: error: declaration does not declare anything [-fpermissive]\n    4 |     int class{3};\n      |                ^\nkeyword.cpp:5:18: error: expected primary-expression before ‘class’\n    5 |     std::cout << class << '\\n';\n      |                  ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g keyword.cpp -o keyword",
     "out": "",
     "err": "keyword.cpp: In function ‘int main()’:\nkeyword.cpp:4:15: error: expected unqualified-id before numeric constant\n    4 |     int class{3};\n      |               ^\nkeyword.cpp:4:5: error: multiple types in one declaration\n    4 |     int class{3};\n      |     ^~~\nkeyword.cpp:4:16: error: declaration does not declare anything [-fpermissive]\n    4 |     int class{3};\n      |                ^\nkeyword.cpp:5:18: error: expected primary-expression before ‘class’\n    5 |     std::cout << class << '\\n';\n      |                  ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "keyword.cpp:4:15: error: expected member name or ';' after declaration specifiers\n    4 |     int class{3};\n      |               ^\nkeyword.cpp:4:9: error: cannot combine with previous 'int' declaration specifier\n    4 |     int class{3};\n      |         ^\nkeyword.cpp:4:5: warning: declaration does not declare anything [-Wmissing-declarations]\n    4 |     int class{3};\n      |     ^~~\nkeyword.cpp:5:18: error: expected expression\n    5 |     std::cout << class << '\\n';\n      |                  ^\n1 warning and 3 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g keyword.cpp -o keyword",
      "out": "",
      "err": "keyword.cpp:4:15: error: expected member name or ';' after declaration specifiers\n    4 |     int class{3};\n      |               ^\nkeyword.cpp:4:9: error: cannot combine with previous 'int' declaration specifier\n    4 |     int class{3};\n      |         ^\nkeyword.cpp:4:5: warning: declaration does not declare anything [-Wmissing-declarations]\n    4 |     int class{3};\n      |     ^~~\nkeyword.cpp:5:18: error: expected expression\n    5 |     std::cout << class << '\\n';\n      |                  ^\n1 warning and 3 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "kinds.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int eggs{12};\n    double price{2.49};\n    bool open{true};\n    char grade{'A'};\n    std::cout << eggs << '\\n';\n    std::cout << price << '\\n';\n    std::cout << open << '\\n';\n    std::cout << grade << '\\n';\n}\n",
   "stdout": "12\n2.49\n1\nA\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g kinds.cpp -o kinds",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./kinds",
     "out": "12\n2.49\n1\nA\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12\n2.49\n1\nA\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g kinds.cpp -o kinds",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./kinds",
      "out": "12\n2.49\n1\nA\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "lamps.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    bool door_open{true};\n    bool raining{false};\n    std::cout << door_open << ' ' << raining << '\\n';\n    std::cout << std::boolalpha << door_open << ' ' << raining << '\\n';\n}\n",
   "stdout": "1 0\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lamps.cpp -o lamps",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lamps",
     "out": "1 0\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 0\ntrue false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lamps.cpp -o lamps",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lamps",
      "out": "1 0\ntrue false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "limits.cpp": {
   "src": "#include <climits>\n#include <iostream>\n\nint main() {\n    std::cout << \"biggest int: \" << INT_MAX << '\\n';\n    std::cout << \"smallest int: \" << INT_MIN << '\\n';\n}\n",
   "stdout": "biggest int: 2147483647\nsmallest int: -2147483648\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g limits.cpp -o limits",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./limits",
     "out": "biggest int: 2147483647\nsmallest int: -2147483648\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "biggest int: 2147483647\nsmallest int: -2147483648\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g limits.cpp -o limits",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./limits",
      "out": "biggest int: 2147483647\nsmallest int: -2147483648\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "literals.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 1'000'000 << '\\n';\n    std::cout << 3.0 << '\\n';\n    std::cout << 3.5 << '\\n';\n    std::cout << 1e3 << '\\n';\n    std::cout << 2.5e-3 << '\\n';\n    std::cout << 'A' << '\\n';\n}\n",
   "stdout": "1000000\n3\n3.5\n1000\n0.0025\nA\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g literals.cpp -o literals",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./literals",
     "out": "1000000\n3\n3.5\n1000\n0.0025\nA\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1000000\n3\n3.5\n1000\n0.0025\nA\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g literals.cpp -o literals",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./literals",
      "out": "1000000\n3\n3.5\n1000\n0.0025\nA\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "literals_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 2'500 << '\\n';\n    std::cout << 4.0 << '\\n';\n    std::cout << 1.5e2 << '\\n';\n    std::cout << 'z' << '\\n';\n}\n",
   "stdout": "2500\n4\n150\nz\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g literals_quiz.cpp -o literals_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./literals_quiz",
     "out": "2500\n4\n150\nz\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2500\n4\n150\nz\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g literals_quiz.cpp -o literals_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./literals_quiz",
      "out": "2500\n4\n150\nz\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "make_box.cpp": {
   "src": "#include <iostream>\nint main() {\n    int stars{3};\n    stars = stars + 2;\n    std::cout << \"Stars: \" << stars << '\\n';\n}\n",
   "stdout": "Stars: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g make_box.cpp -o make_box",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./make_box",
     "out": "Stars: 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Stars: 5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g make_box.cpp -o make_box",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./make_box",
      "out": "Stars: 5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "mod_double.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 7.5 % 2 << '\\n';\n}\n",
   "stdout": "",
   "stderr": "mod_double.cpp: In function ‘int main()’:\nmod_double.cpp:4:22: error: invalid operands of types ‘double’ and ‘int’ to binary ‘operator%’\n    4 |     std::cout << 7.5 % 2 << '\\n';\n      |                  ~~~ ^ ~\n      |                  |     |\n      |                  |     int\n      |                  double\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g mod_double.cpp -o mod_double",
     "out": "",
     "err": "mod_double.cpp: In function ‘int main()’:\nmod_double.cpp:4:22: error: invalid operands of types ‘double’ and ‘int’ to binary ‘operator%’\n    4 |     std::cout << 7.5 % 2 << '\\n';\n      |                  ~~~ ^ ~\n      |                  |     |\n      |                  |     int\n      |                  double\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "mod_double.cpp:4:22: error: invalid operands to binary expression ('double' and 'int')\n    4 |     std::cout << 7.5 % 2 << '\\n';\n      |                  ~~~ ^ ~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g mod_double.cpp -o mod_double",
      "out": "",
      "err": "mod_double.cpp:4:22: error: invalid operands to binary expression ('double' and 'int')\n    4 |     std::cout << 7.5 % 2 << '\\n';\n      |                  ~~~ ^ ~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "overflow.cpp": {
   "src": "#include <climits>\n#include <iostream>\n\nint main() {\n    int odometer{INT_MAX};\n    std::cout << \"At the top: \" << odometer << std::endl;\n    odometer = odometer + 1;\n    std::cout << \"One more: \" << odometer << '\\n';\n}\n",
   "stdout": "At the top: 2147483647\n",
   "stderr": "overflow.cpp:7:14: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'\n    #0 0x55555555652c in main /home/you/cpp-ch3/overflow.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x5555555561e4 in _start (/home/you/cpp-ch3/overflow+0x21e4) (BuildId: 39013b5a0e33f27ae4f8423f5d0b4604aec28b3d)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all overflow.cpp -o overflow",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "UBSAN_OPTIONS=print_stacktrace=1 ./overflow",
     "out": "At the top: 2147483647\n",
     "err": "overflow.cpp:7:14: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'\n    #0 0x55555555652c in main /home/you/cpp-ch3/overflow.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x5555555561e4 in _start (/home/you/cpp-ch3/overflow+0x21e4) (BuildId: 39013b5a0e33f27ae4f8423f5d0b4604aec28b3d)\n\n",
     "exit": 1,
     "merged": "At the top: 2147483647\noverflow.cpp:7:14: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'\n    #0 0x55555555652c in main /home/you/cpp-ch3/overflow.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x5555555561e4 in _start (/home/you/cpp-ch3/overflow+0x21e4) (BuildId: 39013b5a0e33f27ae4f8423f5d0b4604aec28b3d)\n\n"
    }
   ]
  },
  "pi_const.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    const double pi{3.14159};\n    double radius{2.0};\n    std::cout << \"Area: \" << pi * radius * radius << '\\n';\n}\n",
   "stdout": "Area: 12.5664\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pi_const.cpp -o pi_const",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pi_const",
     "out": "Area: 12.5664\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Area: 12.5664\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pi_const.cpp -o pi_const",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pi_const",
      "out": "Area: 12.5664\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "pizza.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int slices{17};\n    int friends{5};\n    std::cout << \"Each friend gets \" << slices / friends << \" slices\\n\";\n    std::cout << \"Left over: \" << slices % friends << \" slices\\n\";\n}\n",
   "stdout": "Each friend gets 3 slices\nLeft over: 2 slices\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pizza.cpp -o pizza",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pizza",
     "out": "Each friend gets 3 slices\nLeft over: 2 slices\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Each friend gets 3 slices\nLeft over: 2 slices\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pizza.cpp -o pizza",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pizza",
      "out": "Each friend gets 3 slices\nLeft over: 2 slices\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "pizza_fill.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cookies{23};\n    int kids{4};\n    std::cout << \"Each kid gets \" << cookies / kids << '\\n';\n    std::cout << \"Left in the jar: \" << cookies % kids << '\\n';\n}\n",
   "stdout": "Each kid gets 5\nLeft in the jar: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pizza_fill.cpp -o pizza_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pizza_fill",
     "out": "Each kid gets 5\nLeft in the jar: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Each kid gets 5\nLeft in the jar: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pizza_fill.cpp -o pizza_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pizza_fill",
      "out": "Each kid gets 5\nLeft in the jar: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "power.cpp": {
   "src": "#include <cmath>\n#include <iostream>\n\nint main() {\n    std::cout << std::pow(2, 10) << '\\n';\n    std::cout << std::pow(1.5, 2) << '\\n';\n    std::cout << std::sqrt(49.0) << '\\n';\n    std::cout << std::sqrt(2.0) << '\\n';\n}\n",
   "stdout": "1024\n2.25\n7\n1.41421\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g power.cpp -o power",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./power",
     "out": "1024\n2.25\n7\n1.41421\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1024\n2.25\n7\n1.41421\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g power.cpp -o power",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./power",
      "out": "1024\n2.25\n7\n1.41421\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "precedence.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 2 + 3 * 4 << '\\n';\n    std::cout << (2 + 3) * 4 << '\\n';\n    std::cout << 10 - 4 - 3 << '\\n';\n    std::cout << 20 / 2 * 5 << '\\n';\n    std::cout << 7 + 10 % 4 << '\\n';\n}\n",
   "stdout": "14\n20\n3\n50\n9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g precedence.cpp -o precedence",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./precedence",
     "out": "14\n20\n3\n50\n9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "14\n20\n3\n50\n9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g precedence.cpp -o precedence",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./precedence",
      "out": "14\n20\n3\n50\n9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "precedence_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 1 + 2 * 3 << '\\n';\n    std::cout << (1 + 2) * 3 << '\\n';\n    std::cout << 12 / 2 / 3 << '\\n';\n    std::cout << 24 / 2 * 3 << '\\n';\n    std::cout << 5 + 9 % 4 * 2 << '\\n';\n}\n",
   "stdout": "7\n9\n2\n36\n7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g precedence_quiz.cpp -o precedence_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./precedence_quiz",
     "out": "7\n9\n2\n36\n7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7\n9\n2\n36\n7\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g precedence_quiz.cpp -o precedence_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./precedence_quiz",
      "out": "7\n9\n2\n36\n7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "readonly.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    const int wheels{4};\n    wheels = 5;\n    std::cout << wheels << '\\n';\n}\n",
   "stdout": "",
   "stderr": "readonly.cpp: In function ‘int main()’:\nreadonly.cpp:5:12: error: assignment of read-only variable ‘wheels’\n    5 |     wheels = 5;\n      |     ~~~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g readonly.cpp -o readonly",
     "out": "",
     "err": "readonly.cpp: In function ‘int main()’:\nreadonly.cpp:5:12: error: assignment of read-only variable ‘wheels’\n    5 |     wheels = 5;\n      |     ~~~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "readonly.cpp:5:12: error: cannot assign to variable 'wheels' with const-qualified type 'const int'\n    5 |     wheels = 5;\n      |     ~~~~~~ ^\nreadonly.cpp:4:15: note: variable 'wheels' declared const here\n    4 |     const int wheels{4};\n      |     ~~~~~~~~~~^~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g readonly.cpp -o readonly",
      "out": "",
      "err": "readonly.cpp:5:12: error: cannot assign to variable 'wheels' with const-qualified type 'const int'\n    5 |     wheels = 5;\n      |     ~~~~~~ ^\nreadonly.cpp:4:15: note: variable 'wheels' declared const here\n    4 |     const int wheels{4};\n      |     ~~~~~~~~~~^~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "readonly_clang.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    const int wheels{4};\n    wheels = 5;\n    std::cout << wheels << '\\n';\n}\n",
   "stdout": "",
   "stderr": "readonly_clang.cpp:5:12: error: cannot assign to variable 'wheels' with const-qualified type 'const int'\n    5 |     wheels = 5;\n      |     ~~~~~~ ^\nreadonly_clang.cpp:4:15: note: variable 'wheels' declared const here\n    4 |     const int wheels{4};\n      |     ~~~~~~~~~~^~~~~~~~~\n1 error generated.\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g readonly_clang.cpp -o readonly_clang",
     "out": "",
     "err": "readonly_clang.cpp:5:12: error: cannot assign to variable 'wheels' with const-qualified type 'const int'\n    5 |     wheels = 5;\n      |     ~~~~~~ ^\nreadonly_clang.cpp:4:15: note: variable 'wheels' declared const here\n    4 |     const int wheels{4};\n      |     ~~~~~~~~~~^~~~~~~~~\n1 error generated.\n",
     "exit": 1
    }
   ]
  },
  "readonly_fixed.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int wheels{4};\n    wheels = 5;\n    std::cout << wheels << '\\n';\n}\n",
   "stdout": "5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g readonly_fixed.cpp -o readonly_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./readonly_fixed",
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
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g readonly_fixed.cpp -o readonly_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./readonly_fixed",
      "out": "5\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "remainder.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << 17 % 5 << '\\n';\n    std::cout << 10 % 2 << '\\n';\n    std::cout << 3 % 5 << '\\n';\n    std::cout << -7 % 3 << '\\n';\n    std::cout << 7 % -3 << '\\n';\n}\n",
   "stdout": "2\n0\n3\n-1\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g remainder.cpp -o remainder",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./remainder",
     "out": "2\n0\n3\n-1\n1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2\n0\n3\n-1\n1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g remainder.cpp -o remainder",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./remainder",
      "out": "2\n0\n3\n-1\n1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "sizes.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << \"bool: \" << sizeof(bool) << '\\n';\n    std::cout << \"char: \" << sizeof(char) << '\\n';\n    std::cout << \"int: \" << sizeof(int) << '\\n';\n    std::cout << \"double: \" << sizeof(double) << '\\n';\n    std::cout << \"long long: \" << sizeof(long long) << '\\n';\n}\n",
   "stdout": "bool: 1\nchar: 1\nint: 4\ndouble: 8\nlong long: 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g sizes.cpp -o sizes",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./sizes",
     "out": "bool: 1\nchar: 1\nint: 4\ndouble: 8\nlong long: 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "bool: 1\nchar: 1\nint: 4\ndouble: 8\nlong long: 8\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g sizes.cpp -o sizes",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./sizes",
      "out": "bool: 1\nchar: 1\nint: 4\ndouble: 8\nlong long: 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "speed_bug.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int km{150};\n    int hours{4};\n    double speed = km / hours;\n    std::cout << \"Speed: \" << speed << \" km/h\\n\";\n}\n",
   "stdout": "Speed: 37 km/h\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g speed_bug.cpp -o speed_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./speed_bug",
     "out": "Speed: 37 km/h\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Speed: 37 km/h\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g speed_bug.cpp -o speed_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./speed_bug",
      "out": "Speed: 37 km/h\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_uninit.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int laps;\n    int bonus{2};\n    laps = laps + bonus;\n    std::cout << \"Laps: \" << laps << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_uninit.cpp: In function ‘int main()’:\nspot_uninit.cpp:6:10: warning: ‘laps’ is used uninitialized [-Wuninitialized]\n    6 |     laps = laps + bonus;\n      |     ~~~~~^~~~~~~~~~~~~~\nspot_uninit.cpp:4:9: note: ‘laps’ was declared here\n    4 |     int laps;\n      |         ^~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_uninit.cpp -o spot_uninit",
     "out": "",
     "err": "spot_uninit.cpp: In function ‘int main()’:\nspot_uninit.cpp:6:10: warning: ‘laps’ is used uninitialized [-Wuninitialized]\n    6 |     laps = laps + bonus;\n      |     ~~~~~^~~~~~~~~~~~~~\nspot_uninit.cpp:4:9: note: ‘laps’ was declared here\n    4 |     int laps;\n      |         ^~~~\n",
     "exit": 0,
     "dir": "~/cpp-ch3"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_uninit.cpp:6:12: warning: variable 'laps' is uninitialized when used here [-Wuninitialized]\n    6 |     laps = laps + bonus;\n      |            ^~~~\nspot_uninit.cpp:4:13: note: initialize the variable 'laps' to silence this warning\n    4 |     int laps;\n      |             ^\n      |              = 0\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_uninit.cpp -o spot_uninit",
      "out": "",
      "err": "spot_uninit.cpp:6:12: warning: variable 'laps' is uninitialized when used here [-Wuninitialized]\n    6 |     laps = laps + bonus;\n      |            ^~~~\nspot_uninit.cpp:4:13: note: initialize the variable 'laps' to silence this warning\n    4 |     int laps;\n      |             ^\n      |              = 0\n1 warning generated.\n",
      "exit": 0,
      "dir": "~/cpp-ch3"
     }
    ]
   }
  },
  "three_ways.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int a{5};    // brace initialisation\n    int b = 7;   // copy initialisation\n    int c{};     // value initialisation: empty braces mean zero\n    std::cout << a << ' ' << b << ' ' << c << '\\n';\n}\n",
   "stdout": "5 7 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g three_ways.cpp -o three_ways",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./three_ways",
     "out": "5 7 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 7 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g three_ways.cpp -o three_ways",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./three_ways",
      "out": "5 7 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "too_early.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::cout << coins << '\\n';\n    int coins{3};\n}\n",
   "stdout": "",
   "stderr": "too_early.cpp: In function ‘int main()’:\ntoo_early.cpp:4:18: error: ‘coins’ was not declared in this scope\n    4 |     std::cout << coins << '\\n';\n      |                  ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g too_early.cpp -o too_early",
     "out": "",
     "err": "too_early.cpp: In function ‘int main()’:\ntoo_early.cpp:4:18: error: ‘coins’ was not declared in this scope\n    4 |     std::cout << coins << '\\n';\n      |                  ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "too_early.cpp:4:18: error: use of undeclared identifier 'coins'\n    4 |     std::cout << coins << '\\n';\n      |                  ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g too_early.cpp -o too_early",
      "out": "",
      "err": "too_early.cpp:4:18: error: use of undeclared identifier 'coins'\n    4 |     std::cout << coins << '\\n';\n      |                  ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "trip.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int km{0};\n    km += 120;\n    km += 45;\n    std::cout << km << '\\n';\n    km = km * 2;\n    std::cout << km << '\\n';\n    ++km;\n    std::cout << km << '\\n';\n}\n",
   "stdout": "165\n330\n331\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trip.cpp -o trip",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trip",
     "out": "165\n330\n331\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "165\n330\n331\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trip.cpp -o trip",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trip",
      "out": "165\n330\n331\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "twice.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int coins{3};\n    int coins{5};\n    std::cout << coins << '\\n';\n}\n",
   "stdout": "",
   "stderr": "twice.cpp: In function ‘int main()’:\ntwice.cpp:5:9: error: redeclaration of ‘int coins’\n    5 |     int coins{5};\n      |         ^~~~~\ntwice.cpp:4:9: note: ‘int coins’ previously declared here\n    4 |     int coins{3};\n      |         ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g twice.cpp -o twice",
     "out": "",
     "err": "twice.cpp: In function ‘int main()’:\ntwice.cpp:5:9: error: redeclaration of ‘int coins’\n    5 |     int coins{5};\n      |         ^~~~~\ntwice.cpp:4:9: note: ‘int coins’ previously declared here\n    4 |     int coins{3};\n      |         ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "twice.cpp:5:9: error: redefinition of 'coins'\n    5 |     int coins{5};\n      |         ^\ntwice.cpp:4:9: note: previous definition is here\n    4 |     int coins{3};\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g twice.cpp -o twice",
      "out": "",
      "err": "twice.cpp:5:9: error: redefinition of 'coins'\n    5 |     int coins{5};\n      |         ^\ntwice.cpp:4:9: note: previous definition is here\n    4 |     int coins{3};\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "twice_clang.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int coins{3};\n    int coins{5};\n    std::cout << coins << '\\n';\n}\n",
   "stdout": "",
   "stderr": "twice_clang.cpp:5:9: error: redefinition of 'coins'\n    5 |     int coins{5};\n      |         ^\ntwice_clang.cpp:4:9: note: previous definition is here\n    4 |     int coins{3};\n      |         ^\n1 error generated.\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g twice_clang.cpp -o twice_clang",
     "out": "",
     "err": "twice_clang.cpp:5:9: error: redefinition of 'coins'\n    5 |     int coins{5};\n      |         ^\ntwice_clang.cpp:4:9: note: previous definition is here\n    4 |     int coins{3};\n      |         ^\n1 error generated.\n",
     "exit": 1
    }
   ]
  },
  "uninit.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score;\n    std::cout << score << '\\n';\n}\n",
   "stdout": "",
   "stderr": "uninit.cpp: In function ‘int main()’:\nuninit.cpp:5:27: warning: ‘score’ is used uninitialized [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                           ^~~~\nuninit.cpp:4:9: note: ‘score’ was declared here\n    4 |     int score;\n      |         ^~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g uninit.cpp -o uninit",
     "out": "",
     "err": "uninit.cpp: In function ‘int main()’:\nuninit.cpp:5:27: warning: ‘score’ is used uninitialized [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                           ^~~~\nuninit.cpp:4:9: note: ‘score’ was declared here\n    4 |     int score;\n      |         ^~~~~\n",
     "exit": 0,
     "dir": "~/cpp-ch3"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "uninit.cpp:5:18: warning: variable 'score' is uninitialized when used here [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                  ^~~~~\nuninit.cpp:4:14: note: initialize the variable 'score' to silence this warning\n    4 |     int score;\n      |              ^\n      |               = 0\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g uninit.cpp -o uninit",
      "out": "",
      "err": "uninit.cpp:5:18: warning: variable 'score' is uninitialized when used here [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                  ^~~~~\nuninit.cpp:4:14: note: initialize the variable 'score' to silence this warning\n    4 |     int score;\n      |              ^\n      |               = 0\n1 warning generated.\n",
      "exit": 0,
      "dir": "~/cpp-ch3"
     }
    ]
   }
  },
  "uninit_clang.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score;\n    std::cout << score << '\\n';\n}\n",
   "stdout": "",
   "stderr": "uninit_clang.cpp:5:18: warning: variable 'score' is uninitialized when used here [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                  ^~~~~\nuninit_clang.cpp:4:14: note: initialize the variable 'score' to silence this warning\n    4 |     int score;\n      |              ^\n      |               = 0\n1 warning generated.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g uninit_clang.cpp -o uninit_clang",
     "out": "",
     "err": "uninit_clang.cpp:5:18: warning: variable 'score' is uninitialized when used here [-Wuninitialized]\n    5 |     std::cout << score << '\\n';\n      |                  ^~~~~\nuninit_clang.cpp:4:14: note: initialize the variable 'score' to silence this warning\n    4 |     int score;\n      |              ^\n      |               = 0\n1 warning generated.\n",
     "exit": 0
    }
   ]
  },
  "uninit_quiet.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score;\n    std::cout << score << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -g uninit_quiet.cpp -o uninit_quiet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch3"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -g uninit_quiet.cpp -o uninit_quiet",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch3"
     }
    ]
   }
  },
  "value_init.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int lives{};\n    double gold{};\n    std::cout << \"lives: \" << lives << '\\n';\n    std::cout << \"gold: \" << gold << '\\n';\n}\n",
   "stdout": "lives: 0\ngold: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g value_init.cpp -o value_init",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./value_init",
     "out": "lives: 0\ngold: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "lives: 0\ngold: 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g value_init.cpp -o value_init",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./value_init",
      "out": "lives: 0\ngold: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "xor_trap.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int cube = 2 ^ 3;\n    std::cout << \"2 cubed is \" << cube << '\\n';\n}\n",
   "stdout": "2 cubed is 1\n",
   "stderr": "xor_trap.cpp: In function ‘int main()’:\nxor_trap.cpp:4:18: warning: result of ‘2^3’ is 1; did you mean ‘1 << 3’ (8)? [-Wxor-used-as-pow]\n    4 |     int cube = 2 ^ 3;\n      |                  ^\n      |                -\n      |                1 <<\nxor_trap.cpp:4:16: note: you can silence this warning by using a hexadecimal constant (0x2 rather than 2)\n    4 |     int cube = 2 ^ 3;\n      |                ^\n      |                0x2\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g xor_trap.cpp -o xor_trap",
     "out": "",
     "err": "xor_trap.cpp: In function ‘int main()’:\nxor_trap.cpp:4:18: warning: result of ‘2^3’ is 1; did you mean ‘1 << 3’ (8)? [-Wxor-used-as-pow]\n    4 |     int cube = 2 ^ 3;\n      |                  ^\n      |                -\n      |                1 <<\nxor_trap.cpp:4:16: note: you can silence this warning by using a hexadecimal constant (0x2 rather than 2)\n    4 |     int cube = 2 ^ 3;\n      |                ^\n      |                0x2\n",
     "exit": 0
    },
    {
     "cmd": "./xor_trap",
     "out": "2 cubed is 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 cubed is 1\n",
    "stderr": "xor_trap.cpp:4:18: warning: result of '2 ^ 3' is 1; did you mean '1 << 3' (8)? [-Wxor-used-as-pow]\n    4 |     int cube = 2 ^ 3;\n      |                ~~^~~\n      |                1 << 3\nxor_trap.cpp:4:18: note: replace expression with '0x2 ^ 3' or use 'xor' instead of '^' to silence this warning\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g xor_trap.cpp -o xor_trap",
      "out": "",
      "err": "xor_trap.cpp:4:18: warning: result of '2 ^ 3' is 1; did you mean '1 << 3' (8)? [-Wxor-used-as-pow]\n    4 |     int cube = 2 ^ 3;\n      |                ~~^~~\n      |                1 << 3\nxor_trap.cpp:4:18: note: replace expression with '0x2 ^ 3' or use 'xor' instead of '^' to silence this warning\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./xor_trap",
      "out": "2 cubed is 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
