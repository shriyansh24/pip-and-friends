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
  "workdir": "/home/you/cpp-ch12",
  "versionDifferences": [
   "boss_spot.cpp",
   "const_body.cpp",
   "const_error.cpp",
   "const_mismatch.cpp",
   "default_access.cpp",
   "explicit_conv.cpp",
   "forgot_scope.cpp",
   "gdb_this.cpp",
   "init_order.cpp",
   "no_default.cpp",
   "order_quiz.cpp",
   "private_access.cpp",
   "reorder_bug.cpp",
   "spot_const.cpp",
   "spot_private.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_spot.cpp, const_body.cpp, const_error.cpp, const_mismatch.cpp, default_access.cpp, explicit_conv.cpp, forgot_scope.cpp, gdb_this.cpp, init_order.cpp, no_default.cpp, order_quiz.cpp, private_access.cpp, reorder_bug.cpp, spot_const.cpp, spot_private.cpp."
 },
 "programs": {
  "boss_fill.cpp": {
   "src": "// boss_fill.cpp\n#include <iostream>\n#include <string>\n\nclass Card {\npublic:\n    Card(std::string owner, int credit);\n    int credit() const;\nprivate:\n    std::string owner_;\n    int credit_;\n};\n\nCard::Card(std::string owner, int credit)\n    : owner_{owner}, credit_{credit < 0 ? 0 : credit} {}\n\nint Card::credit() const {\n    return credit_;\n}\n\nint main() {\n    const Card c{\"Wren\", -5};\n    std::cout << c.credit() << '\\n';\n}\n",
   "stdout": "0\n",
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
     "out": "0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0\n",
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
      "out": "0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\nclass Door {\npublic:\n    Door() { std::cout << \"built\\n\"; }\n    ~Door() { std::cout << \"taken down\\n\"; }\n};\nint main() {\n    Door d;\n    std::cout << \"open and shut\\n\";\n}\n",
   "stdout": "built\nopen and shut\ntaken down\n",
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
     "out": "built\nopen and shut\ntaken down\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "built\nopen and shut\ntaken down\n",
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
      "out": "built\nopen and shut\ntaken down\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons_alt.cpp": {
   "src": "#include <iostream>\nclass Door {\npublic:\n    ~Door() { std::cout << \"taken down\\n\"; }\n    Door() { std::cout << \"built\\n\"; }\n};\nint main() {\n    Door d;\n    std::cout << \"open and shut\\n\";\n}\n",
   "stdout": "built\nopen and shut\ntaken down\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g boss_parsons_alt.cpp -o boss_parsons_alt",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./boss_parsons_alt",
     "out": "built\nopen and shut\ntaken down\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "built\nopen and shut\ntaken down\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_parsons_alt.cpp -o boss_parsons_alt",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./boss_parsons_alt",
      "out": "built\nopen and shut\ntaken down\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_predict.cpp": {
   "src": "// boss_predict.cpp\n#include <iostream>\n\nclass Meter {\npublic:\n    Meter() = default;\n    Meter(int v) : value_{v < 0 ? 0 : (v > 100 ? 100 : v)} {}\n    void add(int n) {\n        if (n > 0 && value_ + n <= 100) value_ += n;\n    }\n    int value() const { return value_; }\nprivate:\n    int value_ = 10;    // invariant: 0 to 100\n};\n\nint main() {\n    Meter a;\n    Meter b{95};\n    Meter c = b;\n    a.add(5);\n    b.add(10);\n    c.add(5);\n    std::cout << a.value() << ' ' << b.value() << ' ' << c.value() << '\\n';\n}\n",
   "stdout": "15 95 100\n",
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
     "out": "15 95 100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "15 95 100\n",
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
      "out": "15 95 100\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "// boss_spot.cpp\n#include <iostream>\n\nclass Score {\npublic:\n    Score(int points) {\n        points = points;\n    }\n    int now() const { return points; }\nprivate:\n    int points = 0;\n};\n\nint main() {\n    Score s{100};\n    std::cout << \"Score: \" << s.now() << '\\n';\n}\n",
   "stdout": "Score: 0\n",
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
     "out": "Score: 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Score: 0\n",
    "stderr": "boss_spot.cpp:7:16: warning: explicitly assigning value of variable of type 'int' to itself; did you mean to assign to member 'points'? [-Wself-assign]\n    7 |         points = points;\n      |         ~~~~~~ ^ ~~~~~~\n      |         this->\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g boss_spot.cpp -o boss_spot",
      "out": "",
      "err": "boss_spot.cpp:7:16: warning: explicitly assigning value of variable of type 'int' to itself; did you mean to assign to member 'points'? [-Wself-assign]\n    7 |         points = points;\n      |         ~~~~~~ ^ ~~~~~~\n      |         this->\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./boss_spot",
      "out": "Score: 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "// boss_trace.cpp\n#include <iostream>\n#include <vector>\n\nclass Tank {\npublic:\n    Tank(int start) : level_{start} {}\n    bool fill(int litres) {\n        if (litres <= 0 || level_ + litres > 50) return false;\n        level_ += litres;\n        return true;\n    }\n    int level() const { return level_; }\nprivate:\n    int level_;    // invariant: 0 to 50\n};\n\nint main() {\n    Tank t{20};\n    std::vector<int> orders{15, 20, -5, 15, 1};\n    for (int litres : orders) {\n        bool ok = t.fill(litres);\n        std::cout << litres << ' ' << (ok ? \"yes\" : \"no\") << ' ' << t.level() << '\\n';\n    }\n}\n",
   "stdout": "15 yes 35\n20 no 35\n-5 no 35\n15 yes 50\n1 no 50\n",
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
     "out": "15 yes 35\n20 no 35\n-5 no 35\n15 yes 50\n1 no 50\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "15 yes 35\n20 no 35\n-5 no 35\n15 yes 50\n1 no 50\n",
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
      "out": "15 yes 35\n20 no 35\n-5 no 35\n15 yes 50\n1 no 50\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "const_body.cpp": {
   "src": "// const_body.cpp: a const member function tries to change a member.\n#include <iostream>\n\nclass Account {\npublic:\n    int balance() const {\n        ++peeks_;             // count every look?\n        return balance_;\n    }\nprivate:\n    int balance_ = 0;\n    int peeks_ = 0;\n};\n\nint main() {\n    Account acc;\n    std::cout << acc.balance() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "const_body.cpp: In member function ‘int Account::balance() const’:\nconst_body.cpp:7:11: error: increment of member ‘Account::peeks_’ in read-only object\n    7 |         ++peeks_;             // count every look?\n      |           ^~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_body.cpp -o const_body",
     "out": "",
     "err": "const_body.cpp: In member function ‘int Account::balance() const’:\nconst_body.cpp:7:11: error: increment of member ‘Account::peeks_’ in read-only object\n    7 |         ++peeks_;             // count every look?\n      |           ^~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "const_body.cpp:7:9: error: cannot assign to non-static data member within const member function 'balance'\n    7 |         ++peeks_;             // count every look?\n      |         ^ ~~~~~~\nconst_body.cpp:6:9: note: member function 'Account::balance' is declared const here\n    6 |     int balance() const {\n      |     ~~~~^~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_body.cpp -o const_body",
      "out": "",
      "err": "const_body.cpp:7:9: error: cannot assign to non-static data member within const member function 'balance'\n    7 |         ++peeks_;             // count every look?\n      |         ^ ~~~~~~\nconst_body.cpp:6:9: note: member function 'Account::balance' is declared const here\n    6 |     int balance() const {\n      |     ~~~~^~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "const_error.cpp": {
   "src": "// const_error.cpp: a look-only visitor calls a getter that never promised to only look.\n#include <iostream>\n\nclass Account {\npublic:\n    void deposit(int amount) { if (amount > 0) balance_ += amount; }\n    int balance() { return balance_; }        // no const promise\nprivate:\n    int balance_ = 0;\n};\n\nvoid show(const Account& acc) {               // look, don't touch (Chapter 8)\n    std::cout << \"Balance: $\" << acc.balance() << '\\n';\n}\n\nint main() {\n    Account acc;\n    acc.deposit(70);\n    show(acc);\n}\n",
   "stdout": "",
   "stderr": "const_error.cpp: In function ‘void show(const Account&)’:\nconst_error.cpp:13:45: error: passing ‘const Account’ as ‘this’ argument discards qualifiers [-fpermissive]\n   13 |     std::cout << \"Balance: $\" << acc.balance() << '\\n';\n      |                                  ~~~~~~~~~~~^~\nconst_error.cpp:7:9: note:   in call to ‘int Account::balance()’\n    7 |     int balance() { return balance_; }        // no const promise\n      |         ^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_error.cpp -o const_error",
     "out": "",
     "err": "const_error.cpp: In function ‘void show(const Account&)’:\nconst_error.cpp:13:45: error: passing ‘const Account’ as ‘this’ argument discards qualifiers [-fpermissive]\n   13 |     std::cout << \"Balance: $\" << acc.balance() << '\\n';\n      |                                  ~~~~~~~~~~~^~\nconst_error.cpp:7:9: note:   in call to ‘int Account::balance()’\n    7 |     int balance() { return balance_; }        // no const promise\n      |         ^~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "const_error.cpp:13:34: error: 'this' argument to member function 'balance' has type 'const Account', but function is not marked const\n   13 |     std::cout << \"Balance: $\" << acc.balance() << '\\n';\n      |                                  ^~~\nconst_error.cpp:7:9: note: 'balance' declared here\n    7 |     int balance() { return balance_; }        // no const promise\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_error.cpp -o const_error",
      "out": "",
      "err": "const_error.cpp:13:34: error: 'this' argument to member function 'balance' has type 'const Account', but function is not marked const\n   13 |     std::cout << \"Balance: $\" << acc.balance() << '\\n';\n      |                                  ^~~\nconst_error.cpp:7:9: note: 'balance' declared here\n    7 |     int balance() { return balance_; }        // no const promise\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "const_fixed.cpp": {
   "src": "// const_fixed.cpp: the getter promises to only look, so a look-only visitor may call it.\n#include <iostream>\n\nclass Account {\npublic:\n    void deposit(int amount) { if (amount > 0) balance_ += amount; }\n    int balance() const { return balance_; }  // const: \"I only look\"\nprivate:\n    int balance_ = 0;\n};\n\nvoid show(const Account& acc) {\n    std::cout << \"Balance: $\" << acc.balance() << '\\n';\n}\n\nint main() {\n    Account acc;\n    acc.deposit(70);\n    show(acc);\n    const Account empty;\n    show(empty);\n    // empty.deposit(5);   // would not build: deposit is not const\n}\n",
   "stdout": "Balance: $70\nBalance: $0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_fixed.cpp -o const_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./const_fixed",
     "out": "Balance: $70\nBalance: $0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Balance: $70\nBalance: $0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_fixed.cpp -o const_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./const_fixed",
      "out": "Balance: $70\nBalance: $0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "const_mismatch.cpp": {
   "src": "// account.cpp: behind the counter. How each request is handled.\n#include \"account.h\"\n#include <algorithm>\n\nAccount::Account(std::string owner, int opening)\n    : owner_{owner}, balance_{std::max(0, opening)} {}\n\nvoid Account::deposit(int amount) {\n    if (amount > 0) balance_ += amount;\n}\n\nbool Account::withdraw(int amount) {\n    if (amount <= 0 || amount > balance_) return false;\n    balance_ -= amount;\n    return true;\n}\n\nint Account::balance() { return balance_; }\n\nstd::string Account::owner() const { return owner_; }\n",
   "stdout": "",
   "stderr": "account.cpp:18:5: error: no declaration matches ‘int Account::balance()’\n   18 | int Account::balance() { return balance_; }\n      |     ^~~~~~~\nIn file included from account.cpp:2:\naccount.h:11:9: note: candidate is: ‘int Account::balance() const’\n   11 |     int balance() const;\n      |         ^~~~~~~\naccount.h:6:7: note: ‘class Account’ defined here\n    6 | class Account {\n      |       ^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
     "out": "",
     "err": "account.cpp:18:5: error: no declaration matches ‘int Account::balance()’\n   18 | int Account::balance() { return balance_; }\n      |     ^~~~~~~\nIn file included from account.cpp:2:\naccount.h:11:9: note: candidate is: ‘int Account::balance() const’\n   11 |     int balance() const;\n      |         ^~~~~~~\naccount.h:6:7: note: ‘class Account’ defined here\n    6 | class Account {\n      |       ^~~~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch12/mismatch"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "account.cpp:18:14: error: out-of-line definition of 'balance' does not match any declaration in 'Account'\n   18 | int Account::balance() { return balance_; }\n      |              ^~~~~~~\n./account.h:11:9: note: member declaration does not match because it is const qualified\n   11 |     int balance() const;\n      |         ^         ~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
      "out": "",
      "err": "account.cpp:18:14: error: out-of-line definition of 'balance' does not match any declaration in 'Account'\n   18 | int Account::balance() { return balance_; }\n      |              ^~~~~~~\n./account.h:11:9: note: member declaration does not match because it is const qualified\n   11 |     int balance() const;\n      |         ^         ~~~~~\n1 error generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch12/mismatch"
     }
    ]
   }
  },
  "ctor_first.cpp": {
   "src": "// ctor_first.cpp: a constructor runs the moment an account is born.\n#include <iostream>\n#include <string>\n\nclass Account {\npublic:\n    Account(std::string owner, int opening)\n        : owner_{owner}, balance_{opening} {\n        std::cout << \"Opened for \" << owner_ << \" with $\" << balance_ << '\\n';\n    }\n    int balance() const { return balance_; }\nprivate:\n    std::string owner_;\n    int balance_;\n};\n\nint main() {\n    Account a{\"Ada\", 50};\n    Account b{\"Bo\", 20};\n    std::cout << \"In the vault: $\" << a.balance() + b.balance() << '\\n';\n}\n",
   "stdout": "Opened for Ada with $50\nOpened for Bo with $20\nIn the vault: $70\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ctor_first.cpp -o ctor_first",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ctor_first",
     "out": "Opened for Ada with $50\nOpened for Bo with $20\nIn the vault: $70\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Opened for Ada with $50\nOpened for Bo with $20\nIn the vault: $70\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ctor_first.cpp -o ctor_first",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ctor_first",
      "out": "Opened for Ada with $50\nOpened for Bo with $20\nIn the vault: $70\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "default_access.cpp": {
   "src": "// default_access.cpp: the same member, once in a struct and once in a class.\n#include <iostream>\n\nstruct LampS {\n    bool on = false;\n};\n\nclass LampC {\n    bool on = false;\n};\n\nint main() {\n    LampS s;\n    LampC c;\n    s.on = true;    // struct: public unless you say otherwise\n    c.on = true;    // class: private unless you say otherwise\n}\n",
   "stdout": "",
   "stderr": "default_access.cpp: In function ‘int main()’:\ndefault_access.cpp:16:7: error: ‘bool LampC::on’ is private within this context\n   16 |     c.on = true;    // class: private unless you say otherwise\n      |       ^~\ndefault_access.cpp:9:10: note: declared private here\n    9 |     bool on = false;\n      |          ^~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g default_access.cpp -o default_access",
     "out": "",
     "err": "default_access.cpp: In function ‘int main()’:\ndefault_access.cpp:16:7: error: ‘bool LampC::on’ is private within this context\n   16 |     c.on = true;    // class: private unless you say otherwise\n      |       ^~\ndefault_access.cpp:9:10: note: declared private here\n    9 |     bool on = false;\n      |          ^~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "default_access.cpp:16:7: error: 'on' is a private member of 'LampC'\n   16 |     c.on = true;    // class: private unless you say otherwise\n      |       ^\ndefault_access.cpp:9:10: note: implicitly declared private here\n    9 |     bool on = false;\n      |          ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g default_access.cpp -o default_access",
      "out": "",
      "err": "default_access.cpp:16:7: error: 'on' is a private member of 'LampC'\n   16 |     c.on = true;    // class: private unless you say otherwise\n      |       ^\ndefault_access.cpp:9:10: note: implicitly declared private here\n    9 |     bool on = false;\n      |          ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "dtor_first.cpp": {
   "src": "// dtor_first.cpp: the constructor opens the locker; the destructor closes it.\n#include <iostream>\n#include <string>\n\nclass Locker {\npublic:\n    Locker(std::string name) : name_{name} {\n        std::cout << \"open \" << name_ << '\\n';\n    }\n    ~Locker() {\n        std::cout << \"close \" << name_ << '\\n';\n    }\nprivate:\n    std::string name_;\n};\n\nint main() {\n    Locker a{\"A\"};\n    {\n        Locker b{\"B\"};\n        std::cout << \"using B\\n\";\n    }\n    Locker c{\"C\"};\n    std::cout << \"end of main\\n\";\n}\n",
   "stdout": "open A\nopen B\nusing B\nclose B\nopen C\nend of main\nclose C\nclose A\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g dtor_first.cpp -o dtor_first",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dtor_first",
     "out": "open A\nopen B\nusing B\nclose B\nopen C\nend of main\nclose C\nclose A\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "open A\nopen B\nusing B\nclose B\nopen C\nend of main\nclose C\nclose A\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g dtor_first.cpp -o dtor_first",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./dtor_first",
      "out": "open A\nopen B\nusing B\nclose B\nopen C\nend of main\nclose C\nclose A\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "dtor_quiz.cpp": {
   "src": "// dtor_quiz.cpp\n#include <iostream>\n#include <string>\n\nclass Tool {\npublic:\n    Tool(std::string name) : name_{name} { std::cout << \"+\" << name_ << '\\n'; }\n    ~Tool() { std::cout << \"-\" << name_ << '\\n'; }\nprivate:\n    std::string name_;\n};\n\nint main() {\n    Tool hammer{\"hammer\"};\n    for (int i = 0; i < 2; ++i) {\n        Tool drill{\"drill\"};\n    }\n    Tool saw{\"saw\"};\n}\n",
   "stdout": "+hammer\n+drill\n-drill\n+drill\n-drill\n+saw\n-saw\n-hammer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g dtor_quiz.cpp -o dtor_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./dtor_quiz",
     "out": "+hammer\n+drill\n-drill\n+drill\n-drill\n+saw\n-saw\n-hammer\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+hammer\n+drill\n-drill\n+drill\n-drill\n+saw\n-saw\n-hammer\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g dtor_quiz.cpp -o dtor_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./dtor_quiz",
      "out": "+hammer\n+drill\n-drill\n+drill\n-drill\n+saw\n-saw\n-hammer\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "explicit_conv.cpp": {
   "src": "// explicit_conv.cpp: the same class, with the constructor marked explicit.\n#include <iostream>\n#include <string>\n\nclass Account {\npublic:\n    explicit Account(std::string owner) : owner_{owner} {\n        std::cout << \"(a new account for \" << owner_ << \" was opened)\\n\";\n    }\n    std::string owner() const { return owner_; }\nprivate:\n    std::string owner_;\n};\n\nvoid welcome(const Account& acc) {\n    std::cout << \"Welcome, \" << acc.owner() << '\\n';\n}\n\nint main() {\n    std::string name = \"Bo\";\n    welcome(name);    // explicit: no quiet conversion any more\n}\n",
   "stdout": "",
   "stderr": "explicit_conv.cpp: In function ‘int main()’:\nexplicit_conv.cpp:21:13: error: invalid initialization of reference of type ‘const Account&’ from expression of type ‘std::string’ {aka ‘std::__cxx11::basic_string<char>’}\n   21 |     welcome(name);    // explicit: no quiet conversion any more\n      |             ^~~~\nexplicit_conv.cpp:15:29: note: in passing argument 1 of ‘void welcome(const Account&)’\n   15 | void welcome(const Account& acc) {\n      |              ~~~~~~~~~~~~~~~^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g explicit_conv.cpp -o explicit_conv",
     "out": "",
     "err": "explicit_conv.cpp: In function ‘int main()’:\nexplicit_conv.cpp:21:13: error: invalid initialization of reference of type ‘const Account&’ from expression of type ‘std::string’ {aka ‘std::__cxx11::basic_string<char>’}\n   21 |     welcome(name);    // explicit: no quiet conversion any more\n      |             ^~~~\nexplicit_conv.cpp:15:29: note: in passing argument 1 of ‘void welcome(const Account&)’\n   15 | void welcome(const Account& acc) {\n      |              ~~~~~~~~~~~~~~~^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "explicit_conv.cpp:21:5: error: no matching function for call to 'welcome'\n   21 |     welcome(name);    // explicit: no quiet conversion any more\n      |     ^~~~~~~\nexplicit_conv.cpp:15:6: note: candidate function not viable: no known conversion from 'std::string' (aka 'basic_string<char>') to 'const Account' for 1st argument\n   15 | void welcome(const Account& acc) {\n      |      ^       ~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g explicit_conv.cpp -o explicit_conv",
      "out": "",
      "err": "explicit_conv.cpp:21:5: error: no matching function for call to 'welcome'\n   21 |     welcome(name);    // explicit: no quiet conversion any more\n      |     ^~~~~~~\nexplicit_conv.cpp:15:6: note: candidate function not viable: no known conversion from 'std::string' (aka 'basic_string<char>') to 'const Account' for 1st argument\n   15 | void welcome(const Account& acc) {\n      |      ^       ~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_const.cpp": {
   "src": "// fill_const.cpp\n#include <iostream>\n\nclass Lamp {\npublic:\n    void flip() { on_ = !on_; }\n    bool is_on() const { return on_; }\nprivate:\n    bool on_ = false;\n};\n\nvoid describe(const Lamp& lamp) {\n    std::cout << (lamp.is_on() ? \"on\" : \"off\") << '\\n';\n}\n\nint main() {\n    Lamp lamp;\n    describe(lamp);\n    lamp.flip();\n    describe(lamp);\n}\n",
   "stdout": "off\non\n",
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
     "out": "off\non\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "off\non\n",
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
      "out": "off\non\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_init.cpp": {
   "src": "// fill_init.cpp\n#include <iostream>\n#include <string>\n\nclass Pet {\npublic:\n    Pet(std::string name, int age) : name_{name}, age_{age} {}\n    void show() const {\n        std::cout << name_ << \" is \" << age_ << '\\n';\n    }\nprivate:\n    std::string name_;\n    int age_;\n};\n\nint main() {\n    Pet p{\"Rex\", 3};\n    p.show();\n}\n",
   "stdout": "Rex is 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_init.cpp -o fill_init",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_init",
     "out": "Rex is 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Rex is 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_init.cpp -o fill_init",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_init",
      "out": "Rex is 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "first_class.cpp": {
   "src": "// first_class.cpp: the balance is locked in the vault. Only the teller touches it.\n#include <iostream>\n\nclass Account {\npublic:\n    void deposit(int amount) {\n        if (amount > 0) {\n            balance_ += amount;\n        }\n    }\n    int balance() {\n        return balance_;\n    }\nprivate:\n    int balance_ = 0;\n};\n\nint main() {\n    Account acc;\n    acc.deposit(50);\n    acc.deposit(-20);     // refused: the teller only takes positive amounts\n    acc.deposit(30);\n    std::cout << \"Balance: $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Balance: $80\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g first_class.cpp -o first_class",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./first_class",
     "out": "Balance: $80\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Balance: $80\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g first_class.cpp -o first_class",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./first_class",
      "out": "Balance: $80\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "forgot_scope.cpp": {
   "src": "// account.cpp: behind the counter. How each request is handled.\n#include \"account.h\"\n#include <algorithm>\n\nAccount::Account(std::string owner, int opening)\n    : owner_{owner}, balance_{std::max(0, opening)} {}\n\nvoid deposit(int amount) {\n    if (amount > 0) balance_ += amount;\n}\n\nbool Account::withdraw(int amount) {\n    if (amount <= 0 || amount > balance_) return false;\n    balance_ -= amount;\n    return true;\n}\n\nint Account::balance() const { return balance_; }\n\nstd::string Account::owner() const { return owner_; }\n",
   "stdout": "",
   "stderr": "account.cpp: In function ‘void deposit(int)’:\naccount.cpp:9:21: error: ‘balance_’ was not declared in this scope\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
     "out": "",
     "err": "account.cpp: In function ‘void deposit(int)’:\naccount.cpp:9:21: error: ‘balance_’ was not declared in this scope\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch12/scope"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "account.cpp:9:21: error: use of undeclared identifier 'balance_'; did you mean 'Account::balance'?\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n      |                     Account::balance\n./account.h:11:9: note: 'Account::balance' declared here\n   11 |     int balance() const;\n      |         ^\naccount.cpp:9:21: error: call to non-static member function without an object argument\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
      "out": "",
      "err": "account.cpp:9:21: error: use of undeclared identifier 'balance_'; did you mean 'Account::balance'?\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n      |                     Account::balance\n./account.h:11:9: note: 'Account::balance' declared here\n   11 |     int balance() const;\n      |         ^\naccount.cpp:9:21: error: call to non-static member function without an object argument\n    9 |     if (amount > 0) balance_ += amount;\n      |                     ^~~~~~~~\n2 errors generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch12/scope"
     }
    ]
   }
  },
  "gdb_this.cpp": {
   "src": "// teller_trace.cpp: two accounts, and member calls that change them.\n#include <iostream>\n\nclass Account {\npublic:\n    void deposit(int amount) {\n        if (amount > 0) balance_ += amount;\n    }\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() { return balance_; }\nprivate:\n    int balance_ = 0;\n};\n\nint main() {\n    Account ada;\n    Account bo;\n    ada.deposit(40);\n    bo.deposit(10);\n    bool ok = bo.withdraw(25);\n    std::cout << \"ada $\" << ada.balance() << \", bo $\" << bo.balance() << '\\n';\n    std::cout << std::boolalpha << \"bo's withdrawal ok? \" << ok << '\\n';\n}\n",
   "stdout": "Breakpoint 1 at 0x13d5: file gdb_this.cpp, line 7.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb50, amount=40) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n$1 = {balance_ = 0}\n8\t    }\n$2 = {balance_ = 40}\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb54, amount=10) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 gdb_this.cpp -o gdb_this",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -ex \"break Account::deposit\" -ex run -ex \"print *this\" -ex next -ex \"print *this\" -ex continue ./gdb_this",
     "out": "Breakpoint 1 at 0x13d5: file gdb_this.cpp, line 7.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb50, amount=40) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n$1 = {balance_ = 0}\n8\t    }\n$2 = {balance_ = 40}\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb54, amount=10) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Breakpoint 1 at 0x12a3: file gdb_this.cpp, line 7.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb6c, amount=40) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n$1 = {balance_ = 0}\n8\t    }\n$2 = {balance_ = 40}\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb68, amount=10) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 gdb_this.cpp -o gdb_this",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -ex \"break Account::deposit\" -ex run -ex \"print *this\" -ex next -ex \"print *this\" -ex continue ./gdb_this",
      "out": "Breakpoint 1 at 0x12a3: file gdb_this.cpp, line 7.\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb6c, amount=40) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n$1 = {balance_ = 0}\n8\t    }\n$2 = {balance_ = 40}\n\nBreakpoint 1, Account::deposit (this=0x7fffffffeb68, amount=10) at gdb_this.cpp:7\n7\t        if (amount > 0) balance_ += amount;\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "implicit_conv.cpp": {
   "src": "// implicit_conv.cpp: a one-argument constructor lets a plain string turn into an account.\n#include <iostream>\n#include <string>\n\nclass Account {\npublic:\n    Account(std::string owner) : owner_{owner} {\n        std::cout << \"(a new account for \" << owner_ << \" was opened)\\n\";\n    }\n    std::string owner() const { return owner_; }\nprivate:\n    std::string owner_;\n};\n\nvoid welcome(const Account& acc) {\n    std::cout << \"Welcome, \" << acc.owner() << '\\n';\n}\n\nint main() {\n    std::string name = \"Bo\";\n    welcome(name);    // a string, not an Account! C++ quietly builds one\n}\n",
   "stdout": "(a new account for Bo was opened)\nWelcome, Bo\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g implicit_conv.cpp -o implicit_conv",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./implicit_conv",
     "out": "(a new account for Bo was opened)\nWelcome, Bo\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "(a new account for Bo was opened)\nWelcome, Bo\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g implicit_conv.cpp -o implicit_conv",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./implicit_conv",
      "out": "(a new account for Bo was opened)\nWelcome, Bo\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "init_order.cpp": {
   "src": "// init_order.cpp: the list says \"b_, then a_\". Watch what really happens.\n#include <iostream>\n\nint note(const char* name, int value) {\n    std::cout << \"setting \" << name << \" to \" << value << '\\n';\n    return value;\n}\n\nclass Pair {\npublic:\n    Pair() : b_{note(\"b_\", 2)}, a_{note(\"a_\", 1)} {}\n    int sum() const { return a_ + b_; }\nprivate:\n    int a_;     // declared first, so it is set first\n    int b_;\n};\n\nint main() {\n    Pair p;\n    std::cout << \"sum \" << p.sum() << '\\n';\n}\n",
   "stdout": "setting a_ to 1\nsetting b_ to 2\nsum 3\n",
   "stderr": "init_order.cpp: In constructor ‘Pair::Pair()’:\ninit_order.cpp:15:9: warning: ‘Pair::b_’ will be initialized after [-Wreorder]\n   15 |     int b_;\n      |         ^~\ninit_order.cpp:14:9: warning:   ‘int Pair::a_’ [-Wreorder]\n   14 |     int a_;     // declared first, so it is set first\n      |         ^~\ninit_order.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Pair() : b_{note(\"b_\", 2)}, a_{note(\"a_\", 1)} {}\n      |     ^~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g init_order.cpp -o init_order",
     "out": "",
     "err": "init_order.cpp: In constructor ‘Pair::Pair()’:\ninit_order.cpp:15:9: warning: ‘Pair::b_’ will be initialized after [-Wreorder]\n   15 |     int b_;\n      |         ^~\ninit_order.cpp:14:9: warning:   ‘int Pair::a_’ [-Wreorder]\n   14 |     int a_;     // declared first, so it is set first\n      |         ^~\ninit_order.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Pair() : b_{note(\"b_\", 2)}, a_{note(\"a_\", 1)} {}\n      |     ^~~~\n",
     "exit": 0
    },
    {
     "cmd": "./init_order",
     "out": "setting a_ to 1\nsetting b_ to 2\nsum 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "setting a_ to 1\nsetting b_ to 2\nsum 3\n",
    "stderr": "init_order.cpp:11:14: warning: field 'b_' will be initialized after field 'a_' [-Wreorder-ctor]\n   11 |     Pair() : b_{note(\"b_\", 2)}, a_{note(\"a_\", 1)} {}\n      |              ^~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~\n      |              a_{note(\"a_\", 1)}  b_{note(\"b_\", 2)}\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g init_order.cpp -o init_order",
      "out": "",
      "err": "init_order.cpp:11:14: warning: field 'b_' will be initialized after field 'a_' [-Wreorder-ctor]\n   11 |     Pair() : b_{note(\"b_\", 2)}, a_{note(\"a_\", 1)} {}\n      |              ^~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~\n      |              a_{note(\"a_\", 1)}  b_{note(\"b_\", 2)}\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./init_order",
      "out": "setting a_ to 1\nsetting b_ to 2\nsum 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "invariant_bug.cpp": {
   "src": "// invariant_bug.cpp: the rule is \"never below zero\". The constructor forgot to check.\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening} {}    // no check!\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;    // INVARIANT: balance_ >= 0\n};\n\nint main() {\n    BankAccount acc{-50};\n    std::cout << \"Opened with $\" << acc.balance() << '\\n';\n    std::cout << std::boolalpha << \"withdraw 10? \" << acc.withdraw(10) << '\\n';\n}\n",
   "stdout": "Opened with $-50\nwithdraw 10? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g invariant_bug.cpp -o invariant_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./invariant_bug",
     "out": "Opened with $-50\nwithdraw 10? false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Opened with $-50\nwithdraw 10? false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g invariant_bug.cpp -o invariant_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./invariant_bug",
      "out": "Opened with $-50\nwithdraw 10? false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "invariant_fixed.cpp": {
   "src": "// invariant_fixed.cpp: every door into the vault checks the rule.\n#include <algorithm>\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{std::max(0, opening)} {}   // below 0 becomes 0\n    void deposit(int amount) {\n        if (amount > 0) balance_ += amount;\n    }\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;           // refuse, untouched\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;    // INVARIANT: balance_ >= 0, true after every public call\n};\n\nint main() {\n    BankAccount acc{-50};\n    std::cout << \"Opened with $\" << acc.balance() << '\\n';\n    acc.deposit(80);\n    std::cout << std::boolalpha << \"withdraw 100? \" << acc.withdraw(100) << '\\n';\n    std::cout << \"withdraw 30? \" << acc.withdraw(30) << '\\n';\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Opened with $0\nwithdraw 100? false\nwithdraw 30? true\nBalance $50\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g invariant_fixed.cpp -o invariant_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./invariant_fixed",
     "out": "Opened with $0\nwithdraw 100? false\nwithdraw 30? true\nBalance $50\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Opened with $0\nwithdraw 100? false\nwithdraw 30? true\nBalance $50\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g invariant_fixed.cpp -o invariant_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./invariant_fixed",
      "out": "Opened with $0\nwithdraw 100? false\nwithdraw 30? true\nBalance $50\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "lamp_quiz.cpp": {
   "src": "// lamp_quiz.cpp\n#include <iostream>\n#include <string>\n\nclass Lamp {\npublic:\n    Lamp() = default;\n    Lamp(int watts) : watts_{watts} {}\n    Lamp(int watts, std::string colour) : watts_{watts}, colour_{colour} {}\n    void describe() const {\n        std::cout << watts_ << \"W \" << colour_ << '\\n';\n    }\nprivate:\n    int watts_ = 60;\n    std::string colour_ = \"white\";\n};\n\nint main() {\n    Lamp a;\n    Lamp b{100};\n    Lamp c{40, \"red\"};\n    a.describe();\n    b.describe();\n    c.describe();\n}\n",
   "stdout": "60W white\n100W white\n40W red\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lamp_quiz.cpp -o lamp_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lamp_quiz",
     "out": "60W white\n100W white\n40W red\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "60W white\n100W white\n40W red\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lamp_quiz.cpp -o lamp_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lamp_quiz",
      "out": "60W white\n100W white\n40W red\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "no_default.cpp": {
   "src": "// no_default.cpp: opening an account without saying whose, or how much.\n#include <string>\n\nclass Account {\npublic:\n    Account(std::string owner, int opening)\n        : owner_{owner}, balance_{opening} {}\nprivate:\n    std::string owner_;\n    int balance_;\n};\n\nint main() {\n    Account a{\"Ada\", 50};\n    Account c;\n}\n",
   "stdout": "",
   "stderr": "no_default.cpp: In function ‘int main()’:\nno_default.cpp:15:13: error: no matching function for call to ‘Account::Account()’\n   15 |     Account c;\n      |             ^\nno_default.cpp:6:5: note: candidate: ‘Account::Account(std::string, int)’\n    6 |     Account(std::string owner, int opening)\n      |     ^~~~~~~\nno_default.cpp:6:5: note:   candidate expects 2 arguments, 0 provided\nno_default.cpp:4:7: note: candidate: ‘constexpr Account::Account(const Account&)’\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:4:7: note:   candidate expects 1 argument, 0 provided\nno_default.cpp:4:7: note: candidate: ‘constexpr Account::Account(Account&&)’\nno_default.cpp:4:7: note:   candidate expects 1 argument, 0 provided\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g no_default.cpp -o no_default",
     "out": "",
     "err": "no_default.cpp: In function ‘int main()’:\nno_default.cpp:15:13: error: no matching function for call to ‘Account::Account()’\n   15 |     Account c;\n      |             ^\nno_default.cpp:6:5: note: candidate: ‘Account::Account(std::string, int)’\n    6 |     Account(std::string owner, int opening)\n      |     ^~~~~~~\nno_default.cpp:6:5: note:   candidate expects 2 arguments, 0 provided\nno_default.cpp:4:7: note: candidate: ‘constexpr Account::Account(const Account&)’\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:4:7: note:   candidate expects 1 argument, 0 provided\nno_default.cpp:4:7: note: candidate: ‘constexpr Account::Account(Account&&)’\nno_default.cpp:4:7: note:   candidate expects 1 argument, 0 provided\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "no_default.cpp:15:13: error: no matching constructor for initialization of 'Account'\n   15 |     Account c;\n      |             ^\nno_default.cpp:4:7: note: candidate constructor (the implicit copy constructor) not viable: requires 1 argument, but 0 were provided\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:4:7: note: candidate constructor (the implicit move constructor) not viable: requires 1 argument, but 0 were provided\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:6:5: note: candidate constructor not viable: requires 2 arguments, but 0 were provided\n    6 |     Account(std::string owner, int opening)\n      |     ^       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nno_default.cpp:10:9: warning: private field 'balance_' is not used [-Wunused-private-field]\n   10 |     int balance_;\n      |         ^\n1 warning and 1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g no_default.cpp -o no_default",
      "out": "",
      "err": "no_default.cpp:15:13: error: no matching constructor for initialization of 'Account'\n   15 |     Account c;\n      |             ^\nno_default.cpp:4:7: note: candidate constructor (the implicit copy constructor) not viable: requires 1 argument, but 0 were provided\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:4:7: note: candidate constructor (the implicit move constructor) not viable: requires 1 argument, but 0 were provided\n    4 | class Account {\n      |       ^~~~~~~\nno_default.cpp:6:5: note: candidate constructor not viable: requires 2 arguments, but 0 were provided\n    6 |     Account(std::string owner, int opening)\n      |     ^       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nno_default.cpp:10:9: warning: private field 'balance_' is not used [-Wunused-private-field]\n   10 |     int balance_;\n      |         ^\n1 warning and 1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "objects_quiz.cpp": {
   "src": "// objects_quiz.cpp\n#include <iostream>\n\nclass Counter {\npublic:\n    void click() { ++count_; }\n    void reset() { count_ = 0; }\n    int count() { return count_; }\nprivate:\n    int count_ = 0;\n};\n\nint main() {\n    Counter door;\n    Counter gate;\n    door.click();\n    door.click();\n    gate.click();\n    door.reset();\n    door.click();\n    gate.click();\n    std::cout << \"door \" << door.count() << \", gate \" << gate.count() << '\\n';\n}\n",
   "stdout": "door 1, gate 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g objects_quiz.cpp -o objects_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./objects_quiz",
     "out": "door 1, gate 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "door 1, gate 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g objects_quiz.cpp -o objects_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./objects_quiz",
      "out": "door 1, gate 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "open_struct.cpp": {
   "src": "// open_struct.cpp: an account as a plain struct. Anyone can write on it.\n#include <iostream>\n#include <string>\n\nstruct Account {\n    std::string owner;\n    int balance = 0;      // the rule: never below zero. Who checks?\n};\n\nint main() {\n    Account acc{\"Wren\", 100};\n    acc.balance -= 500;   // nobody stops this\n    std::cout << acc.owner << \" has $\" << acc.balance << '\\n';\n}\n",
   "stdout": "Wren has $-400\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g open_struct.cpp -o open_struct",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./open_struct",
     "out": "Wren has $-400\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Wren has $-400\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g open_struct.cpp -o open_struct",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./open_struct",
      "out": "Wren has $-400\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "order_quiz.cpp": {
   "src": "// order_quiz.cpp\n#include <iostream>\n\nint say(const char* word) {\n    std::cout << word << '\\n';\n    return 0;\n}\n\nclass Robot {\npublic:\n    Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n        say(\"ready\");\n    }\nprivate:\n    int legs_;\n    int head_;\n    int arms_;\n};\n\nint main() {\n    Robot r;\n}\n",
   "stdout": "legs\nhead\narms\nready\n",
   "stderr": "order_quiz.cpp: In constructor ‘Robot::Robot()’:\norder_quiz.cpp:17:9: warning: ‘Robot::arms_’ will be initialized after [-Wreorder]\n   17 |     int arms_;\n      |         ^~~~~\norder_quiz.cpp:16:9: warning:   ‘int Robot::head_’ [-Wreorder]\n   16 |     int head_;\n      |         ^~~~~\norder_quiz.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |     ^~~~~\norder_quiz.cpp:16:9: warning: ‘Robot::head_’ will be initialized after [-Wreorder]\n   16 |     int head_;\n      |         ^~~~~\norder_quiz.cpp:15:9: warning:   ‘int Robot::legs_’ [-Wreorder]\n   15 |     int legs_;\n      |         ^~~~~\norder_quiz.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |     ^~~~~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g order_quiz.cpp -o order_quiz",
     "out": "",
     "err": "order_quiz.cpp: In constructor ‘Robot::Robot()’:\norder_quiz.cpp:17:9: warning: ‘Robot::arms_’ will be initialized after [-Wreorder]\n   17 |     int arms_;\n      |         ^~~~~\norder_quiz.cpp:16:9: warning:   ‘int Robot::head_’ [-Wreorder]\n   16 |     int head_;\n      |         ^~~~~\norder_quiz.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |     ^~~~~\norder_quiz.cpp:16:9: warning: ‘Robot::head_’ will be initialized after [-Wreorder]\n   16 |     int head_;\n      |         ^~~~~\norder_quiz.cpp:15:9: warning:   ‘int Robot::legs_’ [-Wreorder]\n   15 |     int legs_;\n      |         ^~~~~\norder_quiz.cpp:11:5: warning:   when initialized here [-Wreorder]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |     ^~~~~\n",
     "exit": 0
    },
    {
     "cmd": "./order_quiz",
     "out": "legs\nhead\narms\nready\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "legs\nhead\narms\nready\n",
    "stderr": "order_quiz.cpp:11:15: warning: initializer order does not match the declaration order [-Wreorder-ctor]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |               ^~~~~~~~~~~~~~~~~~                      ~~~~~~~~~~~~~~~~~~\n      |               legs_{say(\"legs\")}                      arms_{say(\"arms\")}\norder_quiz.cpp:11:15: note: field 'arms_' will be initialized after field 'head_'\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |               ^~~~~~~~~~~~~~~~~~\norder_quiz.cpp:11:35: note: field 'head_' will be initialized after field 'legs_'\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |                                   ^~~~~~~~~~~~~~~~~~\n1 warning generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g order_quiz.cpp -o order_quiz",
      "out": "",
      "err": "order_quiz.cpp:11:15: warning: initializer order does not match the declaration order [-Wreorder-ctor]\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |               ^~~~~~~~~~~~~~~~~~                      ~~~~~~~~~~~~~~~~~~\n      |               legs_{say(\"legs\")}                      arms_{say(\"arms\")}\norder_quiz.cpp:11:15: note: field 'arms_' will be initialized after field 'head_'\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |               ^~~~~~~~~~~~~~~~~~\norder_quiz.cpp:11:35: note: field 'head_' will be initialized after field 'legs_'\n   11 |     Robot() : arms_{say(\"arms\")}, head_{say(\"head\")}, legs_{say(\"legs\")} {\n      |                                   ^~~~~~~~~~~~~~~~~~\n1 warning generated.\n",
      "exit": 0
     },
     {
      "cmd": "./order_quiz",
      "out": "legs\nhead\narms\nready\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "overloads.cpp": {
   "src": "// overloads.cpp: three ways to open an account, one constructor each.\n#include <iostream>\n#include <string>\n\nclass Account {\npublic:\n    Account() {\n        std::cout << \"default: \" << owner_ << \" $\" << balance_ << '\\n';\n    }\n    Account(std::string owner) : owner_{owner} {\n        std::cout << \"name only: \" << owner_ << \" $\" << balance_ << '\\n';\n    }\n    Account(std::string owner, int opening) : owner_{owner}, balance_{opening} {\n        std::cout << \"name and money: \" << owner_ << \" $\" << balance_ << '\\n';\n    }\nprivate:\n    std::string owner_ = \"nobody\";    // default member initialisers\n    int balance_ = 0;\n};\n\nint main() {\n    Account a;\n    Account b{\"Bo\"};\n    Account c{\"Cy\", 75};\n}\n",
   "stdout": "default: nobody $0\nname only: Bo $0\nname and money: Cy $75\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g overloads.cpp -o overloads",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./overloads",
     "out": "default: nobody $0\nname only: Bo $0\nname and money: Cy $75\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "default: nobody $0\nname only: Bo $0\nname and money: Cy $75\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g overloads.cpp -o overloads",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./overloads",
      "out": "default: nobody $0\nname only: Bo $0\nname and money: Cy $75\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_ctor.cpp": {
   "src": "#include <iostream>\nclass Clock {\npublic:\n    Clock(int h) : hour_{h % 24} {\n        std::cout << hour_ << \":00\\n\";\n    }\nprivate:\n    int hour_;\n};\nint main() {\n    Clock c{26};\n}\n",
   "stdout": "2:00\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_ctor.cpp -o parsons_ctor",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_ctor",
     "out": "2:00\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2:00\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_ctor.cpp -o parsons_ctor",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_ctor",
      "out": "2:00\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "piggy_predict.cpp": {
   "src": "// piggy_predict.cpp\n#include <iostream>\n\nclass Piggy {\npublic:\n    void add(int coins) {\n        if (coins > 0) coins_ += coins;\n    }\n    void spend(int coins) {\n        if (coins > 0 && coins <= coins_) coins_ -= coins;\n    }\n    int coins() { return coins_; }\nprivate:\n    int coins_ = 0;\n};\n\nint main() {\n    Piggy p;\n    p.add(5);\n    p.spend(8);\n    p.add(4);\n    p.spend(6);\n    std::cout << \"Coins: \" << p.coins() << '\\n';\n}\n",
   "stdout": "Coins: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g piggy_predict.cpp -o piggy_predict",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./piggy_predict",
     "out": "Coins: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Coins: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g piggy_predict.cpp -o piggy_predict",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./piggy_predict",
      "out": "Coins: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "private_access.cpp": {
   "src": "// private_access.cpp: reaching into the vault from outside.\n#include <iostream>\n\nclass Account {\npublic:\n    int balance() { return balance_; }\nprivate:\n    int balance_ = 0;\n};\n\nint main() {\n    Account acc;\n    acc.balance_ = -400;   // straight into the vault?\n    std::cout << acc.balance() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "private_access.cpp: In function ‘int main()’:\nprivate_access.cpp:13:9: error: ‘int Account::balance_’ is private within this context\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^~~~~~~~\nprivate_access.cpp:8:9: note: declared private here\n    8 |     int balance_ = 0;\n      |         ^~~~~~~~\nprivate_access.cpp:13:9: note: field ‘int Account::balance_’ can be accessed via ‘int Account::balance()’\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^~~~~~~~\n      |         balance()\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g private_access.cpp -o private_access",
     "out": "",
     "err": "private_access.cpp: In function ‘int main()’:\nprivate_access.cpp:13:9: error: ‘int Account::balance_’ is private within this context\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^~~~~~~~\nprivate_access.cpp:8:9: note: declared private here\n    8 |     int balance_ = 0;\n      |         ^~~~~~~~\nprivate_access.cpp:13:9: note: field ‘int Account::balance_’ can be accessed via ‘int Account::balance()’\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^~~~~~~~\n      |         balance()\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "private_access.cpp:13:9: error: 'balance_' is a private member of 'Account'\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^\nprivate_access.cpp:8:9: note: declared private here\n    8 |     int balance_ = 0;\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g private_access.cpp -o private_access",
      "out": "",
      "err": "private_access.cpp:13:9: error: 'balance_' is a private member of 'Account'\n   13 |     acc.balance_ = -400;   // straight into the vault?\n      |         ^\nprivate_access.cpp:8:9: note: declared private here\n    8 |     int balance_ = 0;\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "reorder_bug.cpp": {
   "src": "// reorder_bug.cpp: b_ is made from a_, but a_ is not set yet. Built, never run.\n#include <iostream>\n\nclass Pair {\npublic:\n    Pair(int x) : a_{x}, b_{a_ + 1} {}\n    int sum() const { return a_ + b_; }\nprivate:\n    int b_;     // declared first, so set FIRST, from a_, which is still blank\n    int a_;\n};\n\nint main() {\n    Pair p{5};\n    std::cout << p.sum() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "reorder_bug.cpp: In constructor ‘Pair::Pair(int)’:\nreorder_bug.cpp:10:9: warning: ‘Pair::a_’ will be initialized after [-Wreorder]\n   10 |     int a_;\n      |         ^~\nreorder_bug.cpp:9:9: warning:   ‘int Pair::b_’ [-Wreorder]\n    9 |     int b_;     // declared first, so set FIRST, from a_, which is still blank\n      |         ^~\nreorder_bug.cpp:6:5: warning:   when initialized here [-Wreorder]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |     ^~~~\nreorder_bug.cpp:6:29: warning: member ‘Pair::a_’ is used uninitialized [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^~\nreorder_bug.cpp: In constructor ‘Pair::Pair(int)’:\nreorder_bug.cpp:6:29: warning: ‘*this.Pair::a_’ is used uninitialized [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^~\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g reorder_bug.cpp -o reorder_bug",
     "out": "",
     "err": "reorder_bug.cpp: In constructor ‘Pair::Pair(int)’:\nreorder_bug.cpp:10:9: warning: ‘Pair::a_’ will be initialized after [-Wreorder]\n   10 |     int a_;\n      |         ^~\nreorder_bug.cpp:9:9: warning:   ‘int Pair::b_’ [-Wreorder]\n    9 |     int b_;     // declared first, so set FIRST, from a_, which is still blank\n      |         ^~\nreorder_bug.cpp:6:5: warning:   when initialized here [-Wreorder]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |     ^~~~\nreorder_bug.cpp:6:29: warning: member ‘Pair::a_’ is used uninitialized [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^~\nreorder_bug.cpp: In constructor ‘Pair::Pair(int)’:\nreorder_bug.cpp:6:29: warning: ‘*this.Pair::a_’ is used uninitialized [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^~\n",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "reorder_bug.cpp:6:19: warning: field 'a_' will be initialized after field 'b_' [-Wreorder-ctor]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                   ^~~~~  ~~~~~~~~~~\n      |                   b_{a_ + 1} a_{x}\nreorder_bug.cpp:6:29: warning: field 'a_' is uninitialized when used here [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^\n2 warnings generated.\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g reorder_bug.cpp -o reorder_bug",
      "out": "",
      "err": "reorder_bug.cpp:6:19: warning: field 'a_' will be initialized after field 'b_' [-Wreorder-ctor]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                   ^~~~~  ~~~~~~~~~~\n      |                   b_{a_ + 1} a_{x}\nreorder_bug.cpp:6:29: warning: field 'a_' is uninitialized when used here [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^\n2 warnings generated.\n",
      "exit": 0
     }
    ]
   }
  },
  "reorder_bug_clang.cpp": {
   "src": "// reorder_bug.cpp: b_ is made from a_, but a_ is not set yet. Built, never run.\n#include <iostream>\n\nclass Pair {\npublic:\n    Pair(int x) : a_{x}, b_{a_ + 1} {}\n    int sum() const { return a_ + b_; }\nprivate:\n    int b_;     // declared first, so set FIRST, from a_, which is still blank\n    int a_;\n};\n\nint main() {\n    Pair p{5};\n    std::cout << p.sum() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "reorder_bug_clang.cpp:6:19: warning: field 'a_' will be initialized after field 'b_' [-Wreorder-ctor]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                   ^~~~~  ~~~~~~~~~~\n      |                   b_{a_ + 1} a_{x}\nreorder_bug_clang.cpp:6:29: warning: field 'a_' is uninitialized when used here [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^\n2 warnings generated.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g reorder_bug_clang.cpp -o reorder_bug_clang",
     "out": "",
     "err": "reorder_bug_clang.cpp:6:19: warning: field 'a_' will be initialized after field 'b_' [-Wreorder-ctor]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                   ^~~~~  ~~~~~~~~~~\n      |                   b_{a_ + 1} a_{x}\nreorder_bug_clang.cpp:6:29: warning: field 'a_' is uninitialized when used here [-Wuninitialized]\n    6 |     Pair(int x) : a_{x}, b_{a_ + 1} {}\n      |                             ^\n2 warnings generated.\n",
     "exit": 0
    }
   ]
  },
  "reorder_fixed.cpp": {
   "src": "// reorder_fixed.cpp: declare a_ first, so it is ready when b_ needs it.\n#include <iostream>\n\nclass Pair {\npublic:\n    Pair(int x) : a_{x}, b_{a_ + 1} {}\n    int sum() const { return a_ + b_; }\nprivate:\n    int a_;     // declared first, so set first\n    int b_;     // then b_, from a ready a_\n};\n\nint main() {\n    Pair p{5};\n    std::cout << p.sum() << '\\n';\n}\n",
   "stdout": "11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g reorder_fixed.cpp -o reorder_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./reorder_fixed",
     "out": "11\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "11\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g reorder_fixed.cpp -o reorder_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./reorder_fixed",
      "out": "11\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "setter_hole.cpp": {
   "src": "// setter_hole.cpp: a \"helpful\" setter that opens the vault door wide.\n#include <iostream>\n\nclass BankAccount {\npublic:\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }         // getter: fine, look only\n    void set_balance(int b) { balance_ = b; }        // setter: skips every check!\nprivate:\n    int balance_ = 0;    // INVARIANT: balance_ >= 0 ... supposedly\n};\n\nint main() {\n    BankAccount acc;\n    acc.set_balance(-999);\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Balance $-999\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g setter_hole.cpp -o setter_hole",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./setter_hole",
     "out": "Balance $-999\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Balance $-999\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g setter_hole.cpp -o setter_hole",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./setter_hole",
      "out": "Balance $-999\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "sizes.cpp": {
   "src": "// sizes.cpp: member functions live in the program, not inside each object.\n#include <iostream>\n\nstruct PlainForm {\n    int balance = 0;\n};\n\nclass Account {\npublic:\n    void deposit(int amount) { if (amount > 0) balance_ += amount; }\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_ = 0;\n};\n\nint main() {\n    std::cout << \"sizeof(int)       = \" << sizeof(int) << '\\n';\n    std::cout << \"sizeof(PlainForm) = \" << sizeof(PlainForm) << '\\n';\n    std::cout << \"sizeof(Account)   = \" << sizeof(Account) << '\\n';\n}\n",
   "stdout": "sizeof(int)       = 4\nsizeof(PlainForm) = 4\nsizeof(Account)   = 4\n",
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
     "out": "sizeof(int)       = 4\nsizeof(PlainForm) = 4\nsizeof(Account)   = 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "sizeof(int)       = 4\nsizeof(PlainForm) = 4\nsizeof(Account)   = 4\n",
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
      "out": "sizeof(int)       = 4\nsizeof(PlainForm) = 4\nsizeof(Account)   = 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "split_fill.cpp": {
   "src": "// split_fill.cpp: the class says WHAT; the definitions below say HOW.\n#include <iostream>\n\nclass Tank {\npublic:\n    void fill(int litres);\n    int level() const;\nprivate:\n    int level_ = 0;    // invariant: 0 to 50 litres\n};\n\nvoid Tank::fill(int litres) {\n    if (litres > 0 && level_ + litres <= 50) level_ += litres;\n}\n\nint Tank::level() const {\n    return level_;\n}\n\nint main() {\n    Tank t;\n    t.fill(30);\n    t.fill(30);\n    std::cout << t.level() << \" litres\\n\";\n}\n",
   "stdout": "30 litres\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g split_fill.cpp -o split_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./split_fill",
     "out": "30 litres\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "30 litres\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g split_fill.cpp -o split_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./split_fill",
      "out": "30 litres\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_const.cpp": {
   "src": "// spot_const.cpp\n#include <iostream>\n#include <string>\n\nclass Book {\npublic:\n    void borrow() { ++loans_; }\n    std::string title() const { return title_; }\n    int loans() { return loans_; }\nprivate:\n    std::string title_ = \"Dune\";\n    int loans_ = 0;\n};\n\nvoid report(const Book& b) {\n    std::cout << b.title() << \" was borrowed \" << b.loans() << \" times\\n\";\n}\n\nint main() {\n    Book b;\n    b.borrow();\n    b.borrow();\n    report(b);\n}\n",
   "stdout": "",
   "stderr": "spot_const.cpp: In function ‘void report(const Book&)’:\nspot_const.cpp:16:58: error: passing ‘const Book’ as ‘this’ argument discards qualifiers [-fpermissive]\n   16 |     std::cout << b.title() << \" was borrowed \" << b.loans() << \" times\\n\";\n      |                                                   ~~~~~~~^~\nspot_const.cpp:9:9: note:   in call to ‘int Book::loans()’\n    9 |     int loans() { return loans_; }\n      |         ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_const.cpp -o spot_const",
     "out": "",
     "err": "spot_const.cpp: In function ‘void report(const Book&)’:\nspot_const.cpp:16:58: error: passing ‘const Book’ as ‘this’ argument discards qualifiers [-fpermissive]\n   16 |     std::cout << b.title() << \" was borrowed \" << b.loans() << \" times\\n\";\n      |                                                   ~~~~~~~^~\nspot_const.cpp:9:9: note:   in call to ‘int Book::loans()’\n    9 |     int loans() { return loans_; }\n      |         ^~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_const.cpp:16:51: error: 'this' argument to member function 'loans' has type 'const Book', but function is not marked const\n   16 |     std::cout << b.title() << \" was borrowed \" << b.loans() << \" times\\n\";\n      |                                                   ^\nspot_const.cpp:9:9: note: 'loans' declared here\n    9 |     int loans() { return loans_; }\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_const.cpp -o spot_const",
      "out": "",
      "err": "spot_const.cpp:16:51: error: 'this' argument to member function 'loans' has type 'const Book', but function is not marked const\n   16 |     std::cout << b.title() << \" was borrowed \" << b.loans() << \" times\\n\";\n      |                                                   ^\nspot_const.cpp:9:9: note: 'loans' declared here\n    9 |     int loans() { return loans_; }\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_private.cpp": {
   "src": "// spot_private.cpp\n#include <iostream>\n\nclass Thermostat {\npublic:\n    void set(int degrees) {\n        if (degrees >= 10 && degrees <= 30) target_ = degrees;\n    }\n    int target() { return target_; }\nprivate:\n    int target_ = 20;\n};\n\nint main() {\n    Thermostat t;\n    t.set(25);\n    t.target_ = 99;\n    std::cout << \"Target: \" << t.target() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "spot_private.cpp: In function ‘int main()’:\nspot_private.cpp:17:7: error: ‘int Thermostat::target_’ is private within this context\n   17 |     t.target_ = 99;\n      |       ^~~~~~~\nspot_private.cpp:11:9: note: declared private here\n   11 |     int target_ = 20;\n      |         ^~~~~~~\nspot_private.cpp:17:7: note: field ‘int Thermostat::target_’ can be accessed via ‘int Thermostat::target()’\n   17 |     t.target_ = 99;\n      |       ^~~~~~~\n      |       target()\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_private.cpp -o spot_private",
     "out": "",
     "err": "spot_private.cpp: In function ‘int main()’:\nspot_private.cpp:17:7: error: ‘int Thermostat::target_’ is private within this context\n   17 |     t.target_ = 99;\n      |       ^~~~~~~\nspot_private.cpp:11:9: note: declared private here\n   11 |     int target_ = 20;\n      |         ^~~~~~~\nspot_private.cpp:17:7: note: field ‘int Thermostat::target_’ can be accessed via ‘int Thermostat::target()’\n   17 |     t.target_ = 99;\n      |       ^~~~~~~\n      |       target()\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_private.cpp:17:7: error: 'target_' is a private member of 'Thermostat'\n   17 |     t.target_ = 99;\n      |       ^\nspot_private.cpp:11:9: note: declared private here\n   11 |     int target_ = 20;\n      |         ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_private.cpp -o spot_private",
      "out": "",
      "err": "spot_private.cpp:17:7: error: 'target_' is a private member of 'Thermostat'\n   17 |     t.target_ = 99;\n      |       ^\nspot_private.cpp:11:9: note: declared private here\n   11 |     int target_ = 20;\n      |         ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_timer.cpp": {
   "src": "// spot_timer.cpp\n#include <iostream>\n\nclass Timer {\npublic:\n    Timer(int seconds) : left_{seconds} {}\n    void tick() {\n        if (left_ > 0) --left_;\n    }\n    int left() const { return left_; }\nprivate:\n    int left_;    // INVARIANT: never below zero\n};\n\nint main() {\n    Timer t{-5};\n    t.tick();\n    std::cout << t.left() << \" seconds left\\n\";\n}\n",
   "stdout": "-5 seconds left\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_timer.cpp -o spot_timer",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_timer",
     "out": "-5 seconds left\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "-5 seconds left\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_timer.cpp -o spot_timer",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_timer",
      "out": "-5 seconds left\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "teller_negative.cpp": {
   "src": "// teller_negative.cpp: the teller's checks, out loud (a negative amount).\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening < 0 ? 0 : opening} {}\n    bool withdraw(int amount) {\n        std::cout << \"Teller: is $\" << amount << \" above zero? \";\n        if (amount <= 0) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\nTeller: is there $\" << amount << \" in the vault? \";\n        if (amount > balance_) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\n\";\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nint main() {\n    BankAccount acc{100};\n    std::cout << \"Request: withdraw $-20\\n\";\n    acc.withdraw(-20);\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Request: withdraw $-20\nTeller: is $-20 above zero? no. Refused.\nBalance $100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g teller_negative.cpp -o teller_negative",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./teller_negative",
     "out": "Request: withdraw $-20\nTeller: is $-20 above zero? no. Refused.\nBalance $100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Request: withdraw $-20\nTeller: is $-20 above zero? no. Refused.\nBalance $100\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g teller_negative.cpp -o teller_negative",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./teller_negative",
      "out": "Request: withdraw $-20\nTeller: is $-20 above zero? no. Refused.\nBalance $100\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "teller_paid.cpp": {
   "src": "// teller_paid.cpp: the teller's checks, out loud (paid).\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening < 0 ? 0 : opening} {}\n    bool withdraw(int amount) {\n        std::cout << \"Teller: is $\" << amount << \" above zero? \";\n        if (amount <= 0) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\nTeller: is there $\" << amount << \" in the vault? \";\n        if (amount > balance_) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\n\";\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nint main() {\n    BankAccount acc{100};\n    std::cout << \"Request: withdraw $30\\n\";\n    acc.withdraw(30);\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Request: withdraw $30\nTeller: is $30 above zero? yes.\nTeller: is there $30 in the vault? yes.\nBalance $70\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g teller_paid.cpp -o teller_paid",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./teller_paid",
     "out": "Request: withdraw $30\nTeller: is $30 above zero? yes.\nTeller: is there $30 in the vault? yes.\nBalance $70\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Request: withdraw $30\nTeller: is $30 above zero? yes.\nTeller: is there $30 in the vault? yes.\nBalance $70\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g teller_paid.cpp -o teller_paid",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./teller_paid",
      "out": "Request: withdraw $30\nTeller: is $30 above zero? yes.\nTeller: is there $30 in the vault? yes.\nBalance $70\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "teller_short.cpp": {
   "src": "// teller_short.cpp: the teller's checks, out loud (too much).\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening < 0 ? 0 : opening} {}\n    bool withdraw(int amount) {\n        std::cout << \"Teller: is $\" << amount << \" above zero? \";\n        if (amount <= 0) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\nTeller: is there $\" << amount << \" in the vault? \";\n        if (amount > balance_) { std::cout << \"no. Refused.\\n\"; return false; }\n        std::cout << \"yes.\\n\";\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nint main() {\n    BankAccount acc{100};\n    std::cout << \"Request: withdraw $150\\n\";\n    acc.withdraw(150);\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Request: withdraw $150\nTeller: is $150 above zero? yes.\nTeller: is there $150 in the vault? no. Refused.\nBalance $100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g teller_short.cpp -o teller_short",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./teller_short",
     "out": "Request: withdraw $150\nTeller: is $150 above zero? yes.\nTeller: is there $150 in the vault? no. Refused.\nBalance $100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Request: withdraw $150\nTeller: is $150 above zero? yes.\nTeller: is there $150 in the vault? no. Refused.\nBalance $100\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g teller_short.cpp -o teller_short",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./teller_short",
      "out": "Request: withdraw $150\nTeller: is $150 above zero? yes.\nTeller: is there $150 in the vault? no. Refused.\nBalance $100\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "teller_trace.cpp": {
   "src": "// teller_trace.cpp: two accounts, and member calls that change them.\n#include <iostream>\n\nclass Account {\npublic:\n    void deposit(int amount) {\n        if (amount > 0) balance_ += amount;\n    }\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() { return balance_; }\nprivate:\n    int balance_ = 0;\n};\n\nint main() {\n    Account ada;\n    Account bo;\n    ada.deposit(40);\n    bo.deposit(10);\n    bool ok = bo.withdraw(25);\n    std::cout << \"ada $\" << ada.balance() << \", bo $\" << bo.balance() << '\\n';\n    std::cout << std::boolalpha << \"bo's withdrawal ok? \" << ok << '\\n';\n}\n",
   "stdout": "ada $40, bo $10\nbo's withdrawal ok? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g teller_trace.cpp -o teller_trace",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./teller_trace",
     "out": "ada $40, bo $10\nbo's withdrawal ok? false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "ada $40, bo $10\nbo's withdrawal ok? false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g teller_trace.cpp -o teller_trace",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./teller_trace",
      "out": "ada $40, bo $10\nbo's withdrawal ok? false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "this_demo.cpp": {
   "src": "// this_demo.cpp: inside a member function, \"this\" points at the object it was called on.\n#include <iostream>\n#include <string>\n\nclass Robot {\npublic:\n    void rename(std::string name) {\n        this->name = name;    // this->name: MY name. name: the parameter.\n    }\n    void greet() {\n        std::cout << \"Beep! I am \" << name << '\\n';   // means this->name\n    }\nprivate:\n    std::string name = \"unnamed\";\n};\n\nint main() {\n    Robot r1;\n    Robot r2;\n    r1.rename(\"Bolt\");\n    r1.greet();\n    r2.greet();\n}\n",
   "stdout": "Beep! I am Bolt\nBeep! I am unnamed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g this_demo.cpp -o this_demo",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./this_demo",
     "out": "Beep! I am Bolt\nBeep! I am unnamed\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Beep! I am Bolt\nBeep! I am unnamed\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g this_demo.cpp -o this_demo",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./this_demo",
      "out": "Beep! I am Bolt\nBeep! I am unnamed\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_bank.cpp": {
   "src": "// trace_bank.cpp\n#include <iostream>\n#include <vector>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening < 0 ? 0 : opening} {}\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nint main() {\n    BankAccount acc{120};\n    std::vector<int> requests{50, -10, 30, 100, 40};\n    for (int r : requests) {\n        bool ok = acc.withdraw(r);\n        std::cout << r << ' ' << (ok ? \"paid\" : \"refused\") << ' ' << acc.balance() << '\\n';\n    }\n}\n",
   "stdout": "50 paid 70\n-10 refused 70\n30 paid 40\n100 refused 40\n40 paid 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_bank.cpp -o trace_bank",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_bank",
     "out": "50 paid 70\n-10 refused 70\n30 paid 40\n100 refused 40\n40 paid 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "50 paid 70\n-10 refused 70\n30 paid 40\n100 refused 40\n40 paid 0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_bank.cpp -o trace_bank",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_bank",
      "out": "50 paid 70\n-10 refused 70\n30 paid 40\n100 refused 40\n40 paid 0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "vault.cpp": {
   "src": "// main.cpp: the customer. Uses only what account.h promises.\n#include <iostream>\n#include \"account.h\"\n\nint main() {\n    Account acc{\"Ada\", 100};\n    acc.deposit(25);\n    acc.withdraw(500);      // refused: not enough money\n    std::cout << acc.owner() << \" has $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "Ada has $125\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch12/vault"
    },
    {
     "cmd": "./vault",
     "out": "Ada has $125\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch12/vault"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada has $125\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp account.cpp -o vault",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch12/vault"
     },
     {
      "cmd": "./vault",
      "out": "Ada has $125\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch12/vault"
     }
    ]
   }
  },
  "vault/account.h": {
   "src": "// account.h: the teller's window. What customers may ask for.\n#ifndef ACCOUNT_H\n#define ACCOUNT_H\n#include <string>\n\nclass Account {\npublic:\n    Account(std::string owner, int opening);\n    void deposit(int amount);\n    bool withdraw(int amount);\n    int balance() const;\n    std::string owner() const;\nprivate:\n    std::string owner_;\n    int balance_;    // invariant: never below zero\n};\n\n#endif\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "vault/account.cpp": {
   "src": "// account.cpp: behind the counter. How each request is handled.\n#include \"account.h\"\n#include <algorithm>\n\nAccount::Account(std::string owner, int opening)\n    : owner_{owner}, balance_{std::max(0, opening)} {}\n\nvoid Account::deposit(int amount) {\n    if (amount > 0) balance_ += amount;\n}\n\nbool Account::withdraw(int amount) {\n    if (amount <= 0 || amount > balance_) return false;\n    balance_ -= amount;\n    return true;\n}\n\nint Account::balance() const { return balance_; }\n\nstd::string Account::owner() const { return owner_; }\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "withdraw_assert.cpp": {
   "src": "// withdraw_assert.cpp: a teller who treats \"too much\" as a programmer's mistake.\n#include <cassert>\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{opening} {\n        assert(opening >= 0);\n    }\n    void take(int amount) {\n        assert(amount <= balance_);    // callers must check first!\n        balance_ -= amount;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nint main() {\n    BankAccount acc{100};\n    acc.take(150);\n    std::cout << \"Balance $\" << acc.balance() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "withdraw_assert: withdraw_assert.cpp:11: void BankAccount::take(int): Assertion `amount <= balance_' failed.\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g withdraw_assert.cpp -o withdraw_assert",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./withdraw_assert",
     "out": "",
     "err": "withdraw_assert: withdraw_assert.cpp:11: void BankAccount::take(int): Assertion `amount <= balance_' failed.\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "withdraw_assert: withdraw_assert.cpp:11: void BankAccount::take(int): Assertion `amount <= balance_' failed.\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g withdraw_assert.cpp -o withdraw_assert",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./withdraw_assert",
      "out": "",
      "err": "withdraw_assert: withdraw_assert.cpp:11: void BankAccount::take(int): Assertion `amount <= balance_' failed.\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "withdraw_machine.cpp": {
   "src": "// withdraw_machine.cpp: feed the teller one request at a time.\n#include <algorithm>\n#include <format>\n#include <iostream>\n\nclass BankAccount {\npublic:\n    BankAccount(int opening) : balance_{std::max(0, opening)} {}\n    bool withdraw(int amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    int balance() const { return balance_; }\nprivate:\n    int balance_;\n};\n\nvoid attempt(int start, int amount) {\n    BankAccount acc{start};\n    bool ok = acc.withdraw(amount);\n    std::cout << std::format(\"withdraw({}) from ${}: {}, balance ${}\\n\",\n                             amount, start, ok ? \"paid\" : \"refused\", acc.balance());\n}\n\nint main() {\n    attempt(100, 30);\n    attempt(100, 100);\n    attempt(100, 150);\n    attempt(100, -20);\n    attempt(0, 1);\n}\n",
   "stdout": "withdraw(30) from $100: paid, balance $70\nwithdraw(100) from $100: paid, balance $0\nwithdraw(150) from $100: refused, balance $100\nwithdraw(-20) from $100: refused, balance $100\nwithdraw(1) from $0: refused, balance $0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g withdraw_machine.cpp -o withdraw_machine",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./withdraw_machine",
     "out": "withdraw(30) from $100: paid, balance $70\nwithdraw(100) from $100: paid, balance $0\nwithdraw(150) from $100: refused, balance $100\nwithdraw(-20) from $100: refused, balance $100\nwithdraw(1) from $0: refused, balance $0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "withdraw(30) from $100: paid, balance $70\nwithdraw(100) from $100: paid, balance $0\nwithdraw(150) from $100: refused, balance $100\nwithdraw(-20) from $100: refused, balance $100\nwithdraw(1) from $0: refused, balance $0\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g withdraw_machine.cpp -o withdraw_machine",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./withdraw_machine",
      "out": "withdraw(30) from $100: paid, balance $70\nwithdraw(100) from $100: paid, balance $0\nwithdraw(150) from $100: refused, balance $100\nwithdraw(-20) from $100: refused, balance $100\nwithdraw(1) from $0: refused, balance $0\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
