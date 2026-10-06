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
  "workdir": "/home/you/cpp-ch5",
  "versionDifferences": [
   "assign_if.cpp",
   "boss_dangle.cpp",
   "boss_empty.cpp",
   "dangling.cpp",
   "door_spot.cpp",
   "empty_if.cpp",
   "literal_plus.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): assign_if.cpp, boss_dangle.cpp, boss_empty.cpp, dangling.cpp, door_spot.cpp, empty_if.cpp, literal_plus.cpp."
 },
 "programs": {
  "ask_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int age{};\n    std::cout << \"Age? \";\n    std::cin >> age;\n    if (age < 5) {\n        std::cout << \"Free\\n\";\n    } else if (age < 16) {\n        std::cout << \"Child fare\\n\";\n    } else if (age >= 65) {\n        std::cout << \"Senior fare\\n\";\n    } else {\n        std::cout << \"Adult fare\\n\";\n    }\n}\n",
   "stdout": "Age? Adult fare\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ask_quiz.cpp -o ask_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ask_quiz",
     "out": "Age? Adult fare\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Age? Adult fare\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ask_quiz.cpp -o ask_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ask_quiz",
      "out": "Age? Adult fare\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "16\n",
   "screen": "Age? 16\nAdult fare\n"
  },
  "assign_if.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int lives{3};\n    if (lives = 0) {\n        std::cout << \"Game over\\n\";\n    } else {\n        std::cout << \"Keep playing\\n\";\n    }\n    std::cout << \"lives is now \" << lives << '\\n';\n}\n",
   "stdout": "Keep playing\nlives is now 0\n",
   "stderr": "assign_if.cpp: In function ‘int main()’:\nassign_if.cpp:5:15: warning: suggest parentheses around assignment used as truth value [-Wparentheses]\n    5 |     if (lives = 0) {\n      |         ~~~~~~^~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g assign_if.cpp -o assign_if",
     "out": "",
     "err": "assign_if.cpp: In function ‘int main()’:\nassign_if.cpp:5:15: warning: suggest parentheses around assignment used as truth value [-Wparentheses]\n    5 |     if (lives = 0) {\n      |         ~~~~~~^~~\n",
     "exit": 0
    },
    {
     "cmd": "./assign_if",
     "out": "Keep playing\nlives is now 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Keep playing\nlives is now 0\n",
    "stderr": "assign_if.cpp:5:15: warning: using the result of an assignment as a condition without parentheses [-Wparentheses]\n    5 |     if (lives = 0) {\n      |         ~~~~~~^~~\nassign_if.cpp:5:15: note: place parentheses around the assignment to silence this warning\n    5 |     if (lives = 0) {\n      |               ^  \n      |         (        )\nassign_if.cpp:5:15: note: use '==' to turn this assignment into an equality comparison\n    5 |     if (lives = 0) {\n      |               ^\n      |               ==\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g assign_if.cpp -o assign_if",
      "out": "",
      "err": "assign_if.cpp:5:15: warning: using the result of an assignment as a condition without parentheses [-Wparentheses]\n    5 |     if (lives = 0) {\n      |         ~~~~~~^~~\nassign_if.cpp:5:15: note: place parentheses around the assignment to silence this warning\n    5 |     if (lives = 0) {\n      |               ^  \n      |         (        )\nassign_if.cpp:5:15: note: use '==' to turn this assignment into an equality comparison\n    5 |     if (lives = 0) {\n      |               ^\n      |               ==\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./assign_if",
      "out": "Keep playing\nlives is now 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "at10.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string word{\"hello\"};\n    std::cout << \"Seat 1 holds \" << word.at(1) << std::endl;\n    std::cout << \"Seat 10 holds \" << word.at(10) << '\\n';\n    std::cout << \"Done\\n\";\n}\n",
   "stdout": "Seat 1 holds e\n",
   "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n",
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
     "out": "Seat 1 holds e\n",
     "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n",
     "exit": 134,
     "merged": "Seat 1 holds e\nterminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Seat 1 holds e\n",
    "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n",
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
      "out": "Seat 1 holds e\n",
      "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n",
      "exit": 134,
      "merged": "Seat 1 holds e\nterminate called after throwing an instance of 'std::out_of_range'\n  what():  basic_string::at: __n (which is 10) >= this->size() (which is 5)\nAborted\n"
     }
    ]
   }
  },
  "at_seats.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string word{\"hello\"};\n    std::cout << \"at(0) gives \" << word.at(0) << '\\n';\n    std::cout << \"at(1) gives \" << word.at(1) << '\\n';\n    std::cout << \"at(4) gives \" << word.at(4) << '\\n';\n}\n",
   "stdout": "at(0) gives h\nat(1) gives e\nat(4) gives o\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g at_seats.cpp -o at_seats",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./at_seats",
     "out": "at(0) gives h\nat(1) gives e\nat(4) gives o\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "at(0) gives h\nat(1) gives e\nat(4) gives o\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g at_seats.cpp -o at_seats",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./at_seats",
      "out": "at(0) gives h\nat(1) gives e\nat(4) gives o\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "bools.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int speed{45};\n    std::cout << (speed > 30) << '\\n';\n    std::cout << std::boolalpha;\n    std::cout << (speed > 30) << '\\n';\n    std::cout << (speed < 30) << '\\n';\n    std::cout << (speed == 45) << '\\n';\n    std::cout << (speed != 45) << '\\n';\n    std::cout << (speed >= 45) << '\\n';\n    std::cout << (speed <= 44) << '\\n';\n    bool fast{speed > 40};\n    std::cout << \"fast: \" << fast << '\\n';\n}\n",
   "stdout": "1\ntrue\nfalse\ntrue\nfalse\ntrue\nfalse\nfast: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g bools.cpp -o bools",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./bools",
     "out": "1\ntrue\nfalse\ntrue\nfalse\ntrue\nfalse\nfast: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1\ntrue\nfalse\ntrue\nfalse\ntrue\nfalse\nfast: true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g bools.cpp -o bools",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./bools",
      "out": "1\ntrue\nfalse\ntrue\nfalse\ntrue\nfalse\nfast: true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_dangle.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int coins{5};\n    bool member{true};\n    if (member)\n        if (coins >= 10)\n            std::cout << \"Free ride\\n\";\n    else\n        std::cout << \"Please pay\\n\";\n    std::cout << \"Bye\\n\";\n}\n",
   "stdout": "Please pay\nBye\n",
   "stderr": "boss_dangle.cpp: In function ‘int main()’:\nboss_dangle.cpp:6:8: warning: suggest explicit braces to avoid ambiguous ‘else’ [-Wdangling-else]\n    6 |     if (member)\n      |        ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_dangle.cpp -o boss_dangle",
     "out": "",
     "err": "boss_dangle.cpp: In function ‘int main()’:\nboss_dangle.cpp:6:8: warning: suggest explicit braces to avoid ambiguous ‘else’ [-Wdangling-else]\n    6 |     if (member)\n      |        ^\n",
     "exit": 0
    },
    {
     "cmd": "./boss_dangle",
     "out": "Please pay\nBye\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Please pay\nBye\n",
    "stderr": "boss_dangle.cpp:9:5: warning: add explicit braces to avoid dangling else [-Wdangling-else]\n    9 |     else\n      |     ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_dangle.cpp -o boss_dangle",
      "out": "",
      "err": "boss_dangle.cpp:9:5: warning: add explicit braces to avoid dangling else [-Wdangling-else]\n    9 |     else\n      |     ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./boss_dangle",
      "out": "Please pay\nBye\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_empty.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string password{\"tr41n\"};\n    if (password.size() < 8) {\n        std::cout << \"Too short!\\n\";\n    }\n    if (password.find('4') != std::string::npos) {\n        std::cout << \"Has a digit\\n\";\n    }\n    if (password.find('9') != std::string::npos); {\n        std::cout << \"Has a nine\\n\";\n    }\n}\n",
   "stdout": "Too short!\nHas a digit\nHas a nine\n",
   "stderr": "boss_empty.cpp: In function ‘int main()’:\nboss_empty.cpp:12:49: warning: suggest braces around empty body in an ‘if’ statement [-Wempty-body]\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                 ^\nboss_empty.cpp:12:5: warning: this ‘if’ clause does not guard... [-Wmisleading-indentation]\n   12 |     if (password.find('9') != std::string::npos); {\n      |     ^~\nboss_empty.cpp:12:51: note: ...this statement, but the latter is misleadingly indented as if it were guarded by the ‘if’\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                   ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_empty.cpp -o boss_empty",
     "out": "",
     "err": "boss_empty.cpp: In function ‘int main()’:\nboss_empty.cpp:12:49: warning: suggest braces around empty body in an ‘if’ statement [-Wempty-body]\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                 ^\nboss_empty.cpp:12:5: warning: this ‘if’ clause does not guard... [-Wmisleading-indentation]\n   12 |     if (password.find('9') != std::string::npos); {\n      |     ^~\nboss_empty.cpp:12:51: note: ...this statement, but the latter is misleadingly indented as if it were guarded by the ‘if’\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                   ^\n",
     "exit": 0
    },
    {
     "cmd": "./boss_empty",
     "out": "Too short!\nHas a digit\nHas a nine\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Too short!\nHas a digit\nHas a nine\n",
    "stderr": "boss_empty.cpp:12:49: warning: if statement has empty body [-Wempty-body]\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                 ^\nboss_empty.cpp:12:49: note: put the semicolon on a separate line to silence this warning\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_empty.cpp -o boss_empty",
      "out": "",
      "err": "boss_empty.cpp:12:49: warning: if statement has empty body [-Wempty-body]\n   12 |     if (password.find('9') != std::string::npos); {\n      |                                                 ^\nboss_empty.cpp:12:49: note: put the semicolon on a separate line to silence this warning\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./boss_empty",
      "out": "Too short!\nHas a digit\nHas a nine\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_initials.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string first{\"grace\"};\n    std::string last{\"hopper\"};\n    std::string initials{};\n    initials += first.at(0);\n    initials += last.at(0);\n    std::cout << initials << '\\n';\n    std::cout << last.substr(0, 3) << '\\n';\n}\n",
   "stdout": "gh\nhop\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_initials.cpp -o boss_initials",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_initials",
     "out": "gh\nhop\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "gh\nhop\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_initials.cpp -o boss_initials",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_initials",
      "out": "gh\nhop\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_password.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string password{\"choochoo\"};\n    if (password.size() < 6) {\n        std::cout << \"Too short\\n\";\n    } else if (password == \"password\") {\n        std::cout << \"Too obvious\\n\";\n    } else {\n        std::cout << \"Accepted\\n\";\n    }\n}\n",
   "stdout": "Accepted\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_password.cpp -o boss_password",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_password",
     "out": "Accepted\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Accepted\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_password.cpp -o boss_password",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_password",
      "out": "Accepted\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_ticket.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string code{\"RX-204\"};\n    std::string line{code.substr(0, 2)};\n    int number{std::stoi(code.substr(3))};\n    if (line == \"RX\" && number > 200) {\n        std::cout << \"Express \" << number << '\\n';\n    } else if (line == \"RX\") {\n        std::cout << \"Regional \" << number << '\\n';\n    } else {\n        std::cout << \"Unknown line\\n\";\n    }\n    std::cout << code.size() << '\\n';\n}\n",
   "stdout": "Express 204\n6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_ticket.cpp -o boss_ticket",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_ticket",
     "out": "Express 204\n6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Express 204\n6\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_ticket.cpp -o boss_ticket",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_ticket",
      "out": "Express 204\n6\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string s{\"signal\"};\n    int k{3};\n    std::cout << \"A \" << s.substr(0, k) << '\\n';\n    s += \"box\";\n    std::cout << \"B \" << s.size() << '\\n';\n    std::cout << \"C \" << s.find('a') << '\\n';\n    std::cout << \"D \" << (s.size() > 8 ? \"long\" : \"short\") << '\\n';\n    std::cout << \"E \" << s.at(k) << s.at(k + 1) << '\\n';\n}\n",
   "stdout": "A sig\nB 9\nC 4\nD long\nE na\n",
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
     "out": "A sig\nB 9\nC 4\nD long\nE na\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "A sig\nB 9\nC 4\nD long\nE na\n",
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
      "out": "A sig\nB 9\nC 4\nD long\nE na\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "build_trace.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string s{\"ab\"};\n    std::cout << 1 << ' ' << s << ' ' << s.size() << '\\n';\n    s += \"cd\";\n    std::cout << 2 << ' ' << s << ' ' << s.size() << '\\n';\n    s = s + s;\n    std::cout << 3 << ' ' << s << ' ' << s.size() << '\\n';\n    s = s.substr(2, 3);\n    std::cout << 4 << ' ' << s << ' ' << s.size() << '\\n';\n    s += s[0];\n    std::cout << 5 << ' ' << s << ' ' << s.size() << '\\n';\n}\n",
   "stdout": "1 ab 2\n2 abcd 4\n3 abcdabcd 8\n4 cda 3\n5 cdac 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g build_trace.cpp -o build_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./build_trace",
     "out": "1 ab 2\n2 abcd 4\n3 abcdabcd 8\n4 cda 3\n5 cdac 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 ab 2\n2 abcd 4\n3 abcdabcd 8\n4 cda 3\n5 cdac 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g build_trace.cpp -o build_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./build_trace",
      "out": "1 ab 2\n2 abcd 4\n3 abcdabcd 8\n4 cda 3\n5 cdac 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "checks_trace.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string word{\"railway\"};\n    int n{static_cast<int>(word.size())};\n    std::cout << std::boolalpha;\n    std::cout << \"size>5 \" << (n > 5) << '\\n';\n    std::cout << \"first=='r' \" << (word[0] == 'r') << '\\n';\n    std::cout << \"has-way \" << (word.find(\"way\") != std::string::npos) << '\\n';\n    std::cout << \"even \" << (n % 2 == 0) << '\\n';\n    std::cout << \"short-or-r \" << (n < 4 || word[0] == 'r') << '\\n';\n}\n",
   "stdout": "size>5 true\nfirst=='r' true\nhas-way true\neven false\nshort-or-r true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g checks_trace.cpp -o checks_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./checks_trace",
     "out": "size>5 true\nfirst=='r' true\nhas-way true\neven false\nshort-or-r true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "size>5 true\nfirst=='r' true\nhas-way true\neven false\nshort-or-r true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g checks_trace.cpp -o checks_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./checks_trace",
      "out": "size>5 true\nfirst=='r' true\nhas-way true\neven false\nshort-or-r true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "compare.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string a{\"apple\"};\n    std::string b{\"banana\"};\n    std::cout << std::boolalpha;\n    std::cout << (a == \"apple\") << '\\n';\n    std::cout << (a == \"Apple\") << '\\n';\n    std::cout << (a < b) << '\\n';\n    std::cout << (std::string{\"Zebra\"} < a) << '\\n';\n    std::cout << (std::string{\"10\"} < \"9\") << '\\n';\n}\n",
   "stdout": "true\nfalse\ntrue\ntrue\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g compare.cpp -o compare",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./compare",
     "out": "true\nfalse\ntrue\ntrue\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "true\nfalse\ntrue\ntrue\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g compare.cpp -o compare",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./compare",
      "out": "true\nfalse\ntrue\ntrue\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "contains.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string message{};\n    std::cout << \"Message? \";\n    std::getline(std::cin, message);\n    if (message.find(\"free\") != std::string::npos) {\n        std::cout << \"Looks like spam!\\n\";\n    } else if (message.empty()) {\n        std::cout << \"Nothing typed.\\n\";\n    } else {\n        std::cout << \"Delivered.\\n\";\n    }\n}\n",
   "stdout": "Message? Looks like spam!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g contains.cpp -o contains",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./contains",
     "out": "Message? Looks like spam!\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Message? Looks like spam!\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g contains.cpp -o contains",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./contains",
      "out": "Message? Looks like spam!\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "Win a free train set\n",
   "screen": "Message? Win a free train set\nLooks like spam!\n"
  },
  "contains_ok.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string message{};\n    std::cout << \"Message? \";\n    std::getline(std::cin, message);\n    if (message.find(\"free\") != std::string::npos) {\n        std::cout << \"Looks like spam!\\n\";\n    } else if (message.empty()) {\n        std::cout << \"Nothing typed.\\n\";\n    } else {\n        std::cout << \"Delivered.\\n\";\n    }\n}\n",
   "stdout": "Message? Delivered.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g contains_ok.cpp -o contains_ok",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./contains_ok",
     "out": "Message? Delivered.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Message? Delivered.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g contains_ok.cpp -o contains_ok",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./contains_ok",
      "out": "Message? Delivered.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "See you at noon\n",
   "screen": "Message? See you at noon\nDelivered.\n"
  },
  "convert.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << std::to_string(42) + \"!\" << '\\n';\n    std::cout << std::stoi(\"42\") + 1 << '\\n';\n    std::cout << std::stoi(\"12 apples\") << '\\n';\n    std::cout << std::stod(\"2.5\") * 2 << '\\n';\n    std::cout << \"4\" + std::to_string(2) << '\\n';\n}\n",
   "stdout": "42!\n43\n12\n5\n42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g convert.cpp -o convert",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./convert",
     "out": "42!\n43\n12\n5\n42\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "42!\n43\n12\n5\n42\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g convert.cpp -o convert",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./convert",
      "out": "42!\n43\n12\n5\n42\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "dangling.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int tickets{0};\n    bool open{false};\n    if (open)\n        if (tickets > 0)\n            std::cout << \"Aboard!\\n\";\n    else\n        std::cout << \"Station closed\\n\";\n    std::cout << \"End of check\\n\";\n}\n",
   "stdout": "End of check\n",
   "stderr": "dangling.cpp: In function ‘int main()’:\ndangling.cpp:6:8: warning: suggest explicit braces to avoid ambiguous ‘else’ [-Wdangling-else]\n    6 |     if (open)\n      |        ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g dangling.cpp -o dangling",
     "out": "",
     "err": "dangling.cpp: In function ‘int main()’:\ndangling.cpp:6:8: warning: suggest explicit braces to avoid ambiguous ‘else’ [-Wdangling-else]\n    6 |     if (open)\n      |        ^\n",
     "exit": 0
    },
    {
     "cmd": "./dangling",
     "out": "End of check\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "End of check\n",
    "stderr": "dangling.cpp:9:5: warning: add explicit braces to avoid dangling else [-Wdangling-else]\n    9 |     else\n      |     ^\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g dangling.cpp -o dangling",
      "out": "",
      "err": "dangling.cpp:9:5: warning: add explicit braces to avoid dangling else [-Wdangling-else]\n    9 |     else\n      |     ^\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./dangling",
      "out": "End of check\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "dangling_fixed.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int tickets{0};\n    bool open{false};\n    if (open) {\n        if (tickets > 0) {\n            std::cout << \"Aboard!\\n\";\n        }\n    } else {\n        std::cout << \"Station closed\\n\";\n    }\n    std::cout << \"End of check\\n\";\n}\n",
   "stdout": "Station closed\nEnd of check\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g dangling_fixed.cpp -o dangling_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dangling_fixed",
     "out": "Station closed\nEnd of check\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Station closed\nEnd of check\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g dangling_fixed.cpp -o dangling_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./dangling_fixed",
      "out": "Station closed\nEnd of check\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "door_spot.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int code{1234};\n    int typed{1111};\n    if (typed = code) {\n        std::cout << \"Door opens\\n\";\n    } else {\n        std::cout << \"Wrong code\\n\";\n    }\n}\n",
   "stdout": "Door opens\n",
   "stderr": "door_spot.cpp: In function ‘int main()’:\ndoor_spot.cpp:6:15: warning: suggest parentheses around assignment used as truth value [-Wparentheses]\n    6 |     if (typed = code) {\n      |         ~~~~~~^~~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g door_spot.cpp -o door_spot",
     "out": "",
     "err": "door_spot.cpp: In function ‘int main()’:\ndoor_spot.cpp:6:15: warning: suggest parentheses around assignment used as truth value [-Wparentheses]\n    6 |     if (typed = code) {\n      |         ~~~~~~^~~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./door_spot",
     "out": "Door opens\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Door opens\n",
    "stderr": "door_spot.cpp:6:15: warning: using the result of an assignment as a condition without parentheses [-Wparentheses]\n    6 |     if (typed = code) {\n      |         ~~~~~~^~~~~~\ndoor_spot.cpp:6:15: note: place parentheses around the assignment to silence this warning\n    6 |     if (typed = code) {\n      |               ^     \n      |         (           )\ndoor_spot.cpp:6:15: note: use '==' to turn this assignment into an equality comparison\n    6 |     if (typed = code) {\n      |               ^\n      |               ==\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g door_spot.cpp -o door_spot",
      "out": "",
      "err": "door_spot.cpp:6:15: warning: using the result of an assignment as a condition without parentheses [-Wparentheses]\n    6 |     if (typed = code) {\n      |         ~~~~~~^~~~~~\ndoor_spot.cpp:6:15: note: place parentheses around the assignment to silence this warning\n    6 |     if (typed = code) {\n      |               ^     \n      |         (           )\ndoor_spot.cpp:6:15: note: use '==' to turn this assignment into an equality comparison\n    6 |     if (typed = code) {\n      |               ^\n      |               ==\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./door_spot",
      "out": "Door opens\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "double_eq.cpp": {
   "src": "#include <cmath>\n#include <iostream>\n\nint main() {\n    double a{0.1 + 0.2};\n    double b{0.3};\n    std::cout << std::boolalpha;\n    std::cout << \"a == b: \" << (a == b) << '\\n';\n    std::cout << \"close enough: \" << (std::abs(a - b) < 1e-9) << '\\n';\n}\n",
   "stdout": "a == b: false\nclose enough: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g double_eq.cpp -o double_eq",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./double_eq",
     "out": "a == b: false\nclose enough: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a == b: false\nclose enough: true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g double_eq.cpp -o double_eq",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./double_eq",
      "out": "a == b: false\nclose enough: true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "empty_if.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int fuel{0};\n    if (fuel > 0);\n    {\n        std::cout << \"Engine started\\n\";\n    }\n    std::cout << \"fuel: \" << fuel << '\\n';\n}\n",
   "stdout": "Engine started\nfuel: 0\n",
   "stderr": "empty_if.cpp: In function ‘int main()’:\nempty_if.cpp:5:18: warning: suggest braces around empty body in an ‘if’ statement [-Wempty-body]\n    5 |     if (fuel > 0);\n      |                  ^\nempty_if.cpp:5:5: warning: this ‘if’ clause does not guard... [-Wmisleading-indentation]\n    5 |     if (fuel > 0);\n      |     ^~\nempty_if.cpp:6:5: note: ...this statement, but the latter is misleadingly indented as if it were guarded by the ‘if’\n    6 |     {\n      |     ^\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g empty_if.cpp -o empty_if",
     "out": "",
     "err": "empty_if.cpp: In function ‘int main()’:\nempty_if.cpp:5:18: warning: suggest braces around empty body in an ‘if’ statement [-Wempty-body]\n    5 |     if (fuel > 0);\n      |                  ^\nempty_if.cpp:5:5: warning: this ‘if’ clause does not guard... [-Wmisleading-indentation]\n    5 |     if (fuel > 0);\n      |     ^~\nempty_if.cpp:6:5: note: ...this statement, but the latter is misleadingly indented as if it were guarded by the ‘if’\n    6 |     {\n      |     ^\n",
     "exit": 0
    },
    {
     "cmd": "./empty_if",
     "out": "Engine started\nfuel: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Engine started\nfuel: 0\n",
    "stderr": "empty_if.cpp:5:18: warning: if statement has empty body [-Wempty-body]\n    5 |     if (fuel > 0);\n      |                  ^\nempty_if.cpp:5:18: note: put the semicolon on a separate line to silence this warning\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g empty_if.cpp -o empty_if",
      "out": "",
      "err": "empty_if.cpp:5:18: warning: if statement has empty body [-Wempty-body]\n    5 |     if (fuel > 0);\n      |                  ^\nempty_if.cpp:5:18: note: put the semicolon on a separate line to silence this warning\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./empty_if",
      "out": "Engine started\nfuel: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "escapes.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << \"She said \\\"hi\\\"\\n\";\n    std::cout << \"name\\tlives\\n\";\n    std::cout << \"Wren\\t3\\n\";\n    std::cout << \"C:\\\\games\\\\new\\n\";\n    std::cout << R\"(C:\\games\\new and \"quotes\")\" << '\\n';\n    std::string two_lines{\"top\\nbottom\"};\n    std::cout << two_lines << '\\n';\n    std::cout << two_lines.size() << '\\n';\n}\n",
   "stdout": "She said \"hi\"\nname\tlives\nWren\t3\nC:\\games\\new\nC:\\games\\new and \"quotes\"\ntop\nbottom\n10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g escapes.cpp -o escapes",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./escapes",
     "out": "She said \"hi\"\nname\tlives\nWren\t3\nC:\\games\\new\nC:\\games\\new and \"quotes\"\ntop\nbottom\n10\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "She said \"hi\"\nname\tlives\nWren\t3\nC:\\games\\new\nC:\\games\\new and \"quotes\"\ntop\nbottom\n10\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g escapes.cpp -o escapes",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./escapes",
      "out": "She said \"hi\"\nname\tlives\nWren\t3\nC:\\games\\new\nC:\\games\\new and \"quotes\"\ntop\nbottom\n10\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "escapes_quiz.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string path{\"a\\\\b\"};\n    std::cout << path << '\\n';\n    std::cout << path.size() << '\\n';\n    std::cout << \"say \\\"go\\\"\" << '\\n';\n    std::cout << R\"(\\n)\" << '\\n';\n}\n",
   "stdout": "a\\b\n3\nsay \"go\"\n\\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g escapes_quiz.cpp -o escapes_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./escapes_quiz",
     "out": "a\\b\n3\nsay \"go\"\n\\n\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "a\\b\n3\nsay \"go\"\n\\n\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g escapes_quiz.cpp -o escapes_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./escapes_quiz",
      "out": "a\\b\n3\nsay \"go\"\n\\n\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "first_string.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"Wren\"};\n    std::string nothing{};\n    std::cout << name << \" has \" << name.size() << \" letters\\n\";\n    std::cout << \"length() agrees: \" << name.length() << '\\n';\n    std::cout << \"nothing has \" << nothing.size() << \" letters\\n\";\n    std::cout << std::boolalpha;\n    std::cout << \"is name empty? \" << name.empty() << '\\n';\n    std::cout << \"is nothing empty? \" << nothing.empty() << '\\n';\n}\n",
   "stdout": "Wren has 4 letters\nlength() agrees: 4\nnothing has 0 letters\nis name empty? false\nis nothing empty? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g first_string.cpp -o first_string",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./first_string",
     "out": "Wren has 4 letters\nlength() agrees: 4\nnothing has 0 letters\nis name empty? false\nis nothing empty? true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Wren has 4 letters\nlength() agrees: 4\nnothing has 0 letters\nis name empty? false\nis nothing empty? true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g first_string.cpp -o first_string",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./first_string",
      "out": "Wren has 4 letters\nlength() agrees: 4\nnothing has 0 letters\nis name empty? false\nis nothing empty? true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "format_look.cpp": {
   "src": "#include <format>\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"Wren\"};\n    int bolts{12};\n    std::string line{std::format(\"{} tightened {} bolts\", name, bolts)};\n    std::cout << line << '\\n';\n    std::cout << std::format(\"{} has {} letters\", name, name.size()) << '\\n';\n    std::cout << std::format(\"{1} before {0}\", \"second\", \"first\") << '\\n';\n}\n",
   "stdout": "Wren tightened 12 bolts\nWren has 4 letters\nfirst before second\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g format_look.cpp -o format_look",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./format_look",
     "out": "Wren tightened 12 bolts\nWren has 4 letters\nfirst before second\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Wren tightened 12 bolts\nWren has 4 letters\nfirst before second\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g format_look.cpp -o format_look",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./format_look",
      "out": "Wren tightened 12 bolts\nWren has 4 letters\nfirst before second\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "gate.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int height{};\n    std::cout << \"Your height in cm? \";\n    std::cin >> height;\n    if (height >= 120) {\n        std::cout << \"On you go!\\n\";\n        std::cout << \"Hold on tight.\\n\";\n    }\n    std::cout << \"Thanks for visiting.\\n\";\n}\n",
   "stdout": "Your height in cm? On you go!\nHold on tight.\nThanks for visiting.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g gate.cpp -o gate",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./gate",
     "out": "Your height in cm? On you go!\nHold on tight.\nThanks for visiting.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Your height in cm? On you go!\nHold on tight.\nThanks for visiting.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g gate.cpp -o gate",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./gate",
      "out": "Your height in cm? On you go!\nHold on tight.\nThanks for visiting.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "135\n",
   "screen": "Your height in cm? 135\nOn you go!\nHold on tight.\nThanks for visiting.\n"
  },
  "gate_short.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int height{};\n    std::cout << \"Your height in cm? \";\n    std::cin >> height;\n    if (height >= 120) {\n        std::cout << \"On you go!\\n\";\n        std::cout << \"Hold on tight.\\n\";\n    }\n    std::cout << \"Thanks for visiting.\\n\";\n}\n",
   "stdout": "Your height in cm? Thanks for visiting.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g gate_short.cpp -o gate_short",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./gate_short",
     "out": "Your height in cm? Thanks for visiting.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Your height in cm? Thanks for visiting.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g gate_short.cpp -o gate_short",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./gate_short",
      "out": "Your height in cm? Thanks for visiting.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "110\n",
   "screen": "Your height in cm? 110\nThanks for visiting.\n"
  },
  "grade.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{};\n    std::cout << \"Score (0-100)? \";\n    std::cin >> score;\n    if (score >= 90) {\n        std::cout << \"Grade A\\n\";\n    } else if (score >= 80) {\n        std::cout << \"Grade B\\n\";\n    } else if (score >= 70) {\n        std::cout << \"Grade C\\n\";\n    } else {\n        std::cout << \"Grade F: let's practise\\n\";\n    }\n    std::cout << \"Report done.\\n\";\n}\n",
   "stdout": "Score (0-100)? Grade B\nReport done.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade.cpp -o grade",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade",
     "out": "Score (0-100)? Grade B\nReport done.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score (0-100)? Grade B\nReport done.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade.cpp -o grade",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade",
      "out": "Score (0-100)? Grade B\nReport done.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "85\n",
   "screen": "Score (0-100)? 85\nGrade B\nReport done.\n"
  },
  "grade_40.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{};\n    std::cout << \"Score (0-100)? \";\n    std::cin >> score;\n    if (score >= 90) {\n        std::cout << \"Grade A\\n\";\n    } else if (score >= 80) {\n        std::cout << \"Grade B\\n\";\n    } else if (score >= 70) {\n        std::cout << \"Grade C\\n\";\n    } else {\n        std::cout << \"Grade F: let's practise\\n\";\n    }\n    std::cout << \"Report done.\\n\";\n}\n",
   "stdout": "Score (0-100)? Grade F: let's practise\nReport done.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade_40.cpp -o grade_40",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade_40",
     "out": "Score (0-100)? Grade F: let's practise\nReport done.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score (0-100)? Grade F: let's practise\nReport done.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade_40.cpp -o grade_40",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade_40",
      "out": "Score (0-100)? Grade F: let's practise\nReport done.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "40\n",
   "screen": "Score (0-100)? 40\nGrade F: let's practise\nReport done.\n"
  },
  "grade_70.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{};\n    std::cout << \"Score (0-100)? \";\n    std::cin >> score;\n    if (score >= 90) {\n        std::cout << \"Grade A\\n\";\n    } else if (score >= 80) {\n        std::cout << \"Grade B\\n\";\n    } else if (score >= 70) {\n        std::cout << \"Grade C\\n\";\n    } else {\n        std::cout << \"Grade F: let's practise\\n\";\n    }\n    std::cout << \"Report done.\\n\";\n}\n",
   "stdout": "Score (0-100)? Grade C\nReport done.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade_70.cpp -o grade_70",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade_70",
     "out": "Score (0-100)? Grade C\nReport done.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score (0-100)? Grade C\nReport done.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade_70.cpp -o grade_70",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade_70",
      "out": "Score (0-100)? Grade C\nReport done.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "70\n",
   "screen": "Score (0-100)? 70\nGrade C\nReport done.\n"
  },
  "grade_95.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{};\n    std::cout << \"Score (0-100)? \";\n    std::cin >> score;\n    if (score >= 90) {\n        std::cout << \"Grade A\\n\";\n    } else if (score >= 80) {\n        std::cout << \"Grade B\\n\";\n    } else if (score >= 70) {\n        std::cout << \"Grade C\\n\";\n    } else {\n        std::cout << \"Grade F: let's practise\\n\";\n    }\n    std::cout << \"Report done.\\n\";\n}\n",
   "stdout": "Score (0-100)? Grade A\nReport done.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade_95.cpp -o grade_95",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade_95",
     "out": "Score (0-100)? Grade A\nReport done.\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score (0-100)? Grade A\nReport done.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade_95.cpp -o grade_95",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade_95",
      "out": "Score (0-100)? Grade A\nReport done.\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "95\n",
   "screen": "Score (0-100)? 95\nGrade A\nReport done.\n"
  },
  "grade_parsons.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{84};\n    if (score >= 90) {\n        std::cout << \"A\\n\";\n    } else if (score >= 80) {\n        std::cout << \"B\\n\";\n    } else {\n        std::cout << \"C or below\\n\";\n    }\n}\n",
   "stdout": "B\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade_parsons.cpp -o grade_parsons",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade_parsons",
     "out": "B\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "B\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade_parsons.cpp -o grade_parsons",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade_parsons",
      "out": "B\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "grade_wrong.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int score{};\n    std::cout << \"Score (0-100)? \";\n    std::cin >> score;\n    if (score >= 70) {\n        std::cout << \"Grade C\\n\";\n    } else if (score >= 80) {\n        std::cout << \"Grade B\\n\";\n    } else if (score >= 90) {\n        std::cout << \"Grade A\\n\";\n    } else {\n        std::cout << \"Grade F: let's practise\\n\";\n    }\n}\n",
   "stdout": "Score (0-100)? Grade C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g grade_wrong.cpp -o grade_wrong",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./grade_wrong",
     "out": "Score (0-100)? Grade C\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score (0-100)? Grade C\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g grade_wrong.cpp -o grade_wrong",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./grade_wrong",
      "out": "Score (0-100)? Grade C\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "95\n",
   "screen": "Score (0-100)? 95\nGrade C\n"
  },
  "hello_fill.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"Wren\"};\n    std::string message{\"Hello, \" + name + \"!\"};\n    std::cout << message << '\\n';\n}\n",
   "stdout": "Hello, Wren!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g hello_fill.cpp -o hello_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./hello_fill",
     "out": "Hello, Wren!\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Hello, Wren!\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g hello_fill.cpp -o hello_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./hello_fill",
      "out": "Hello, Wren!\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "include_note.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    std::string word{\"works here\"};\n    std::cout << word << '\\n';\n}\n",
   "stdout": "works here\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g include_note.cpp -o include_note",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./include_note",
     "out": "works here\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "works here\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g include_note.cpp -o include_note",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./include_note",
      "out": "works here\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "join.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string first{\"Ada\"};\n    std::string last{\"Lovelace\"};\n    std::string full{first + \" \" + last};\n    std::cout << full << '\\n';\n\n    std::string shout{\"go\"};\n    shout += \" team\";\n    shout += '!';\n    std::cout << shout << '\\n';\n    std::cout << full.size() + shout.size() << '\\n';\n}\n",
   "stdout": "Ada Lovelace\ngo team!\n20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g join.cpp -o join",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./join",
     "out": "Ada Lovelace\ngo team!\n20\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada Lovelace\ngo team!\n20\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g join.cpp -o join",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./join",
      "out": "Ada Lovelace\ngo team!\n20\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "junction.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int speed{45};\n    std::cout << \"Speed \" << speed << '\\n';\n    if (speed > 60) {\n        std::cout << \"Track A\\n\";\n    } else {\n        std::cout << \"Track B\\n\";\n    }\n    std::cout << \"Next stop\\n\";\n}\n",
   "stdout": "Speed 45\nTrack B\nNext stop\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g junction.cpp -o junction",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./junction",
     "out": "Speed 45\nTrack B\nNext stop\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Speed 45\nTrack B\nNext stop\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g junction.cpp -o junction",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./junction",
      "out": "Speed 45\nTrack B\nNext stop\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "label_bug.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    int score{66};\n    std::string text{};\n    text = score;\n    std::cout << \"Your score: \" << text << '\\n';\n}\n",
   "stdout": "Your score: B\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g label_bug.cpp -o label_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./label_bug",
     "out": "Your score: B\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Your score: B\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g label_bug.cpp -o label_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./label_bug",
      "out": "Your score: B\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "literal_fixed.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"Wren\"};\n    std::cout << std::string{\"Hi \"} + \"there, \" + name << '\\n';\n    std::cout << \"Hi \" + name + \", there\" << '\\n';\n}\n",
   "stdout": "Hi there, Wren\nHi Wren, there\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g literal_fixed.cpp -o literal_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./literal_fixed",
     "out": "Hi there, Wren\nHi Wren, there\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Hi there, Wren\nHi Wren, there\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g literal_fixed.cpp -o literal_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./literal_fixed",
      "out": "Hi there, Wren\nHi Wren, there\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "literal_plus.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"Wren\"};\n    std::cout << \"Hi \" + \"there, \" + name << '\\n';\n}\n",
   "stdout": "",
   "stderr": "literal_plus.cpp: In function ‘int main()’:\nliteral_plus.cpp:6:24: error: invalid operands of types ‘const char [4]’ and ‘const char [8]’ to binary ‘operator+’\n    6 |     std::cout << \"Hi \" + \"there, \" + name << '\\n';\n      |                  ~~~~~ ^ ~~~~~~~~~\n      |                  |       |\n      |                  |       const char [8]\n      |                  const char [4]\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g literal_plus.cpp -o literal_plus",
     "out": "",
     "err": "literal_plus.cpp: In function ‘int main()’:\nliteral_plus.cpp:6:24: error: invalid operands of types ‘const char [4]’ and ‘const char [8]’ to binary ‘operator+’\n    6 |     std::cout << \"Hi \" + \"there, \" + name << '\\n';\n      |                  ~~~~~ ^ ~~~~~~~~~\n      |                  |       |\n      |                  |       const char [8]\n      |                  const char [4]\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "literal_plus.cpp:6:24: error: invalid operands to binary expression ('const char[4]' and 'const char[8]')\n    6 |     std::cout << \"Hi \" + \"there, \" + name << '\\n';\n      |                  ~~~~~ ^ ~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g literal_plus.cpp -o literal_plus",
      "out": "",
      "err": "literal_plus.cpp:6:24: error: invalid operands to binary expression ('const char[4]' and 'const char[8]')\n    6 |     std::cout << \"Hi \" + \"there, \" + name << '\\n';\n      |                  ~~~~~ ^ ~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "logic.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int height{125};\n    bool with_adult{false};\n    bool tall_enough{height >= 120};\n    std::cout << std::boolalpha;\n    std::cout << \"tall enough: \" << tall_enough << '\\n';\n    std::cout << \"big ride: \" << (tall_enough && with_adult) << '\\n';\n    std::cout << \"small ride: \" << (tall_enough || with_adult) << '\\n';\n    std::cout << \"needs a grown-up: \" << !with_adult << '\\n';\n}\n",
   "stdout": "tall enough: true\nbig ride: false\nsmall ride: true\nneeds a grown-up: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g logic.cpp -o logic",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./logic",
     "out": "tall enough: true\nbig ride: false\nsmall ride: true\nneeds a grown-up: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "tall enough: true\nbig ride: false\nsmall ride: true\nneeds a grown-up: true\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g logic.cpp -o logic",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./logic",
      "out": "tall enough: true\nbig ride: false\nsmall ride: true\nneeds a grown-up: true\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "logic_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    bool raining{true};\n    bool have_umbrella{false};\n    int temp{18};\n    std::cout << std::boolalpha;\n    std::cout << (raining && have_umbrella) << '\\n';\n    std::cout << (raining || have_umbrella) << '\\n';\n    std::cout << (!raining) << '\\n';\n    std::cout << (temp > 15 && !have_umbrella) << '\\n';\n}\n",
   "stdout": "false\ntrue\nfalse\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g logic_quiz.cpp -o logic_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./logic_quiz",
     "out": "false\ntrue\nfalse\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "false\ntrue\nfalse\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g logic_quiz.cpp -o logic_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./logic_quiz",
      "out": "false\ntrue\nfalse\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "medal_spot.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int place{1};\n    if (place <= 3) {\n        std::cout << \"Bronze medal\\n\";\n    } else if (place <= 2) {\n        std::cout << \"Silver medal\\n\";\n    } else if (place == 1) {\n        std::cout << \"Gold medal\\n\";\n    } else {\n        std::cout << \"Well run!\\n\";\n    }\n}\n",
   "stdout": "Bronze medal\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g medal_spot.cpp -o medal_spot",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./medal_spot",
     "out": "Bronze medal\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Bronze medal\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g medal_spot.cpp -o medal_spot",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./medal_spot",
      "out": "Bronze medal\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "name_split.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string full{};\n    std::cout << \"Full name? \";\n    std::getline(std::cin, full);\n    std::size_t gap{full.find(' ')};\n    std::string first{full.substr(0, gap)};\n    std::string last{full.substr(gap + 1)};\n    std::cout << last << \", \" << first << '\\n';\n}\n",
   "stdout": "Full name? King, Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g name_split.cpp -o name_split",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./name_split",
     "out": "Full name? King, Ada\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Full name? King, Ada\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g name_split.cpp -o name_split",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./name_split",
      "out": "Full name? King, Ada\n",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "Ada King\n",
   "screen": "Full name? Ada King\nKing, Ada\n"
  },
  "or_fixed.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int floor{5};\n    if (floor == 1 || floor == 2) {\n        std::cout << \"Floor 1 or 2\\n\";\n    } else {\n        std::cout << \"Another floor\\n\";\n    }\n}\n",
   "stdout": "Another floor\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g or_fixed.cpp -o or_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./or_fixed",
     "out": "Another floor\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Another floor\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g or_fixed.cpp -o or_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./or_fixed",
      "out": "Another floor\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "or_trap.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int floor{5};\n    if (floor == 1 || 2) {\n        std::cout << \"Floor 1 or 2\\n\";\n    } else {\n        std::cout << \"Another floor\\n\";\n    }\n}\n",
   "stdout": "Floor 1 or 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g or_trap.cpp -o or_trap",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./or_trap",
     "out": "Floor 1 or 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Floor 1 or 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g or_trap.cpp -o or_trap",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./or_trap",
      "out": "Floor 1 or 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "relational_quiz.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int a{7};\n    int b{10};\n    std::cout << std::boolalpha;\n    std::cout << (a < b) << '\\n';\n    std::cout << (a >= 7) << '\\n';\n    std::cout << (b != 10) << '\\n';\n    std::cout << (a + 3 == b) << '\\n';\n}\n",
   "stdout": "true\ntrue\nfalse\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g relational_quiz.cpp -o relational_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./relational_quiz",
     "out": "true\ntrue\nfalse\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "true\ntrue\nfalse\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g relational_quiz.cpp -o relational_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./relational_quiz",
      "out": "true\ntrue\nfalse\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "s65.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string s{\"score\"};\n    s = 65;\n    std::cout << \"s holds: \" << s << '\\n';\n    s = std::to_string(65);\n    std::cout << \"s holds: \" << s << '\\n';\n}\n",
   "stdout": "s holds: A\ns holds: 65\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g s65.cpp -o s65",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./s65",
     "out": "s holds: A\ns holds: 65\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "s holds: A\ns holds: 65\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g s65.cpp -o s65",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./s65",
      "out": "s holds: A\ns holds: 65\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "seats.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string word{\"hello\"};\n    std::cout << word[0] << '\\n';\n    std::cout << word[4] << '\\n';\n    std::cout << word.at(1) << '\\n';\n    std::cout << word[word.size() - 1] << '\\n';\n    word[0] = 'j';\n    std::cout << word << '\\n';\n}\n",
   "stdout": "h\no\ne\no\njello\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g seats.cpp -o seats",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./seats",
     "out": "h\no\ne\no\njello\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "h\no\ne\no\njello\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g seats.cpp -o seats",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./seats",
      "out": "h\no\ne\no\njello\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "short_circuit.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total{30};\n    int trips{0};\n    if (trips != 0 && total / trips > 5) {\n        std::cout << \"Long trips on average\\n\";\n    } else {\n        std::cout << \"No trips yet, or short ones\\n\";\n    }\n    std::cout << \"The division never happened\\n\";\n}\n",
   "stdout": "No trips yet, or short ones\nThe division never happened\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g short_circuit.cpp -o short_circuit",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./short_circuit",
     "out": "No trips yet, or short ones\nThe division never happened\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "No trips yet, or short ones\nThe division never happened\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g short_circuit.cpp -o short_circuit",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./short_circuit",
      "out": "No trips yet, or short ones\nThe division never happened\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "size_quiz.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string a{\"C++ rocks\"};\n    std::string b{\"  \"};\n    std::string c{};\n    std::cout << a.size() << '\\n';\n    std::cout << b.size() << '\\n';\n    std::cout << c.size() << '\\n';\n}\n",
   "stdout": "9\n2\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g size_quiz.cpp -o size_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./size_quiz",
     "out": "9\n2\n0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "9\n2\n0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g size_quiz.cpp -o size_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./size_quiz",
      "out": "9\n2\n0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "stoi_abc.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string typed{\"abc\"};\n    std::cout << \"Converting \" << typed << std::endl;\n    int number{std::stoi(typed)};\n    std::cout << \"Got \" << number << '\\n';\n}\n",
   "stdout": "Converting abc\n",
   "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g stoi_abc.cpp -o stoi_abc",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./stoi_abc",
     "out": "Converting abc\n",
     "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
     "exit": 134,
     "merged": "Converting abc\nterminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Converting abc\n",
    "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g stoi_abc.cpp -o stoi_abc",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./stoi_abc",
      "out": "Converting abc\n",
      "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
      "exit": 134,
      "merged": "Converting abc\nterminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n"
     }
    ]
   }
  },
  "stoi_quiz.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string age_text{\"seven\"};\n    int age{std::stoi(age_text)};\n    std::cout << \"Next year you'll be \" << age + 1 << '\\n';\n}\n",
   "stdout": "",
   "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g stoi_quiz.cpp -o stoi_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./stoi_quiz",
     "out": "",
     "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g stoi_quiz.cpp -o stoi_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./stoi_quiz",
      "out": "",
      "err": "terminate called after throwing an instance of 'std::invalid_argument'\n  what():  stoi\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "string_inside.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string tiny{\"hello\"};\n    std::string long_one{\"a train with many carriages\"};\n    std::cout << \"sizeof(std::string): \" << sizeof(std::string) << '\\n';\n    std::cout << \"tiny: size \" << tiny.size() << \", capacity \" << tiny.capacity() << '\\n';\n    std::cout << \"long_one: size \" << long_one.size() << \", capacity \" << long_one.capacity() << '\\n';\n    std::cout << \"npos: \" << std::string::npos << '\\n';\n}\n",
   "stdout": "sizeof(std::string): 32\ntiny: size 5, capacity 15\nlong_one: size 27, capacity 27\nnpos: 18446744073709551615\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g string_inside.cpp -o string_inside",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./string_inside",
     "out": "sizeof(std::string): 32\ntiny: size 5, capacity 15\nlong_one: size 27, capacity 27\nnpos: 18446744073709551615\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "sizeof(std::string): 32\ntiny: size 5, capacity 15\nlong_one: size 27, capacity 27\nnpos: 18446744073709551615\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g string_inside.cpp -o string_inside",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./string_inside",
      "out": "sizeof(std::string): 32\ntiny: size 5, capacity 15\nlong_one: size 27, capacity 27\nnpos: 18446744073709551615\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "substr_find.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string trip{\"Paris to Rome\"};\n    std::cout << trip.substr(0, 5) << '\\n';\n    std::cout << trip.substr(9) << '\\n';\n    std::cout << trip.find(\"to\") << '\\n';\n    std::cout << trip.find('R') << '\\n';\n    std::cout << trip.find(\"Oslo\") << '\\n';\n    std::cout << std::boolalpha;\n    std::cout << (trip.find(\"Oslo\") == std::string::npos) << '\\n';\n}\n",
   "stdout": "Paris\nRome\n6\n9\n18446744073709551615\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g substr_find.cpp -o substr_find",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./substr_find",
     "out": "Paris\nRome\n6\n9\n18446744073709551615\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Paris\nRome\n6\n9\n18446744073709551615\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g substr_find.cpp -o substr_find",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./substr_find",
      "out": "Paris\nRome\n6\n9\n18446744073709551615\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "substr_quiz.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string word{\"junction\"};\n    std::cout << word.substr(0, 4) << '\\n';\n    std::cout << word.substr(4) << '\\n';\n    std::cout << word.find('c') << '\\n';\n    std::cout << word.substr(word.find(\"ion\")) << '\\n';\n}\n",
   "stdout": "junc\ntion\n3\nion\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g substr_quiz.cpp -o substr_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./substr_quiz",
     "out": "junc\ntion\n3\nion\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "junc\ntion\n3\nion\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g substr_quiz.cpp -o substr_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./substr_quiz",
      "out": "junc\ntion\n3\nion\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ternary.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    int count{1};\n    std::string word{count == 1 ? \"ticket\" : \"tickets\"};\n    std::cout << count << ' ' << word << '\\n';\n    count = 3;\n    std::cout << count << ' ' << (count == 1 ? \"ticket\" : \"tickets\") << '\\n';\n    int a{7};\n    int b{12};\n    int bigger{a > b ? a : b};\n    std::cout << \"bigger: \" << bigger << '\\n';\n}\n",
   "stdout": "1 ticket\n3 tickets\nbigger: 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ternary.cpp -o ternary",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ternary",
     "out": "1 ticket\n3 tickets\nbigger: 12\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 ticket\n3 tickets\nbigger: 12\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ternary.cpp -o ternary",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ternary",
      "out": "1 ticket\n3 tickets\nbigger: 12\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ternary_fill.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    int temp{31};\n    std::string advice{temp > 25 ? \"shorts\" : \"jumper\"};\n    std::cout << \"Wear \" << advice << '\\n';\n}\n",
   "stdout": "Wear shorts\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ternary_fill.cpp -o ternary_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ternary_fill",
     "out": "Wear shorts\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Wear shorts\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ternary_fill.cpp -o ternary_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ternary_fill",
      "out": "Wear shorts\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "walk_off.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string trip{\"a train with many carriages\"};\n    std::cout << \"carriages: \" << trip.size() << std::endl;\n    std::cout << \"seat 40: \" << trip[40] << '\\n';\n}\n",
   "stdout": "carriages: 27\n",
   "stderr": "=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000068 at pc 0x55555555a8f5 bp 0x7fffffffeaf0 sp 0x7fffffffeae0\nREAD of size 1 at 0x503000000068 thread T0\n    #0 0x55555555a8f4 in main /home/you/cpp-ch5/walk_off.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\n0x503000000068 is located 12 bytes after 28-byte region [0x503000000040,0x50300000005c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cea4 in std::__new_allocator<char>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555cc2e in std::allocator<char>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555cc2e in std::allocator_traits<std::allocator<char> >::allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555cc2e in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_S_allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/basic_string.h:126\n    #5 0x55555555c752 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_create(unsigned long&, unsigned long) /usr/include/c++/13/bits/basic_string.tcc:159\n    #6 0x55555555b969 in void std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_construct<char const*>(char const*, char const*, std::forward_iterator_tag) /usr/include/c++/13/bits/basic_string.tcc:229\n    #7 0x55555555ae3f in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::basic_string<std::allocator<char> >(char const*, std::allocator<char> const&) /usr/include/c++/13/bits/basic_string.h:649\n    #8 0x55555555a5ed in main /home/you/cpp-ch5/walk_off.cpp:5\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch5/walk_off.cpp:7 in main\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa 00 00 00 04 fa[fa]fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer walk_off.cpp -o walk_off",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./walk_off",
     "out": "carriages: 27\n",
     "err": "=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000068 at pc 0x55555555a8f5 bp 0x7fffffffeaf0 sp 0x7fffffffeae0\nREAD of size 1 at 0x503000000068 thread T0\n    #0 0x55555555a8f4 in main /home/you/cpp-ch5/walk_off.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\n0x503000000068 is located 12 bytes after 28-byte region [0x503000000040,0x50300000005c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cea4 in std::__new_allocator<char>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555cc2e in std::allocator<char>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555cc2e in std::allocator_traits<std::allocator<char> >::allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555cc2e in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_S_allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/basic_string.h:126\n    #5 0x55555555c752 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_create(unsigned long&, unsigned long) /usr/include/c++/13/bits/basic_string.tcc:159\n    #6 0x55555555b969 in void std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_construct<char const*>(char const*, char const*, std::forward_iterator_tag) /usr/include/c++/13/bits/basic_string.tcc:229\n    #7 0x55555555ae3f in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::basic_string<std::allocator<char> >(char const*, std::allocator<char> const&) /usr/include/c++/13/bits/basic_string.h:649\n    #8 0x55555555a5ed in main /home/you/cpp-ch5/walk_off.cpp:5\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch5/walk_off.cpp:7 in main\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa 00 00 00 04 fa[fa]fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n",
     "exit": 1,
     "merged": "carriages: 27\n=================================================================\n==2==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000068 at pc 0x55555555a8f5 bp 0x7fffffffeaf0 sp 0x7fffffffeae0\nREAD of size 1 at 0x503000000068 thread T0\n    #0 0x55555555a8f4 in main /home/you/cpp-ch5/walk_off.cpp:7\n    #1 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #2 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #3 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\n0x503000000068 is located 12 bytes after 28-byte region [0x503000000040,0x50300000005c)\nallocated by thread T0 here:\n    #0 0x7ffff78fe548 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:95\n    #1 0x55555555cea4 in std::__new_allocator<char>::allocate(unsigned long, void const*) /usr/include/c++/13/bits/new_allocator.h:151\n    #2 0x55555555cc2e in std::allocator<char>::allocate(unsigned long) /usr/include/c++/13/bits/allocator.h:198\n    #3 0x55555555cc2e in std::allocator_traits<std::allocator<char> >::allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/alloc_traits.h:482\n    #4 0x55555555cc2e in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_S_allocate(std::allocator<char>&, unsigned long) /usr/include/c++/13/bits/basic_string.h:126\n    #5 0x55555555c752 in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_create(unsigned long&, unsigned long) /usr/include/c++/13/bits/basic_string.tcc:159\n    #6 0x55555555b969 in void std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_construct<char const*>(char const*, char const*, std::forward_iterator_tag) /usr/include/c++/13/bits/basic_string.tcc:229\n    #7 0x55555555ae3f in std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::basic_string<std::allocator<char> >(char const*, std::allocator<char> const&) /usr/include/c++/13/bits/basic_string.h:649\n    #8 0x55555555a5ed in main /home/you/cpp-ch5/walk_off.cpp:5\n    #9 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #10 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #11 0x55555555a464 in _start (/home/you/cpp-ch5/walk_off+0x6464) (BuildId: b085ce5fda299347b1c51b0cf08c120b9b5fd518)\n\nSUMMARY: AddressSanitizer: heap-buffer-overflow /home/you/cpp-ch5/walk_off.cpp:7 in main\nShadow bytes around the buggy address:\n  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n=>0x503000000000: fa fa 00 00 00 fa fa fa 00 00 00 04 fa[fa]fa fa\n  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\n  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa\nShadow byte legend (one shadow byte represents 8 application bytes):\n  Addressable:           00\n  Partially addressable: 01 02 03 04 05 06 07 \n  Heap left redzone:       fa\n  Freed heap region:       fd\n  Stack left redzone:      f1\n  Stack mid redzone:       f2\n  Stack right redzone:     f3\n  Stack after return:      f5\n  Stack use after scope:   f8\n  Global redzone:          f9\n  Global init order:       f6\n  Poisoned by user:        f7\n  Container overflow:      fc\n  Array cookie:            ac\n  Intra object redzone:    bb\n  ASan internal:           fe\n  Left alloca redzone:     ca\n  Right alloca redzone:    cb\n==2==ABORTING\n"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
