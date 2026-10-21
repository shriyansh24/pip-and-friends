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
  "workdir": "/home/you/cpp-ch10",
  "versionDifferences": [
   "angle.cpp",
   "angle_missing.cpp",
   "bill.cpp",
   "bill_bt.cpp",
   "bill_step.cpp",
   "boss_link.cpp",
   "boss_spot.cpp",
   "crash_gdb.cpp",
   "forgot.cpp",
   "guards_bad.cpp",
   "nm_symbols.cpp",
   "nog.cpp",
   "ns.cpp",
   "opt.cpp",
   "paste.cpp",
   "paste_count.cpp",
   "paste_quiz.cpp",
   "selfc.cpp",
   "spot_kitchen.cpp",
   "tip.cpp",
   "tips_watch.cpp",
   "twice.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): angle.cpp, angle_missing.cpp, bill.cpp, bill_bt.cpp, bill_step.cpp, boss_link.cpp, boss_spot.cpp, crash_gdb.cpp, forgot.cpp, guards_bad.cpp, nm_symbols.cpp, nog.cpp, ns.cpp, opt.cpp, paste.cpp, paste_count.cpp, paste_quiz.cpp, selfc.cpp, spot_kitchen.cpp, tip.cpp, tips_watch.cpp, twice.cpp."
 },
 "programs": {
  "angle.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include <menu.h>\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "main.cpp: In function ‘int main()’:\nmain.cpp:6:38: error: ‘price_of’ was not declared in this scope\n    6 |     std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n      |                                      ^~~~~~~~\nmain.cpp:7:38: error: ‘bill_for’ was not declared in this scope\n    7 |     std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n      |                                      ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
     "out": "",
     "err": "main.cpp: In function ‘int main()’:\nmain.cpp:6:38: error: ‘price_of’ was not declared in this scope\n    6 |     std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n      |                                      ^~~~~~~~\nmain.cpp:7:38: error: ‘bill_for’ was not declared in this scope\n    7 |     std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n      |                                      ^~~~~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch10/angle"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "main.cpp:6:38: error: use of undeclared identifier 'price_of'\n    6 |     std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n      |                                      ^\nmain.cpp:7:38: error: use of undeclared identifier 'bill_for'\n    7 |     std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n      |                                      ^\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
      "out": "",
      "err": "main.cpp:6:38: error: use of undeclared identifier 'price_of'\n    6 |     std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n      |                                      ^\nmain.cpp:7:38: error: use of undeclared identifier 'bill_for'\n    7 |     std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n      |                                      ^\n2 errors generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch10/angle"
     }
    ]
   }
  },
  "angle_missing.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include <order.h>\n\nint main() {\n    Order t4{2, 3};\n    std::cout << t4.soups << \" soups\\n\";\n}\n",
   "stdout": "",
   "stderr": "main.cpp:3:10: fatal error: order.h: No such file or directory\n    3 | #include <order.h>\n      |          ^~~~~~~~~\ncompilation terminated.\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp -o diner",
     "out": "",
     "err": "main.cpp:3:10: fatal error: order.h: No such file or directory\n    3 | #include <order.h>\n      |          ^~~~~~~~~\ncompilation terminated.\n",
     "exit": 1,
     "dir": "~/cpp-ch10/angle2"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "main.cpp:3:10: error: 'order.h' file not found with <angled> include; use \"quotes\" instead\n    3 | #include <order.h>\n      |          ^~~~~~~~~\n      |          \"order.h\"\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp -o diner",
      "out": "",
      "err": "main.cpp:3:10: error: 'order.h' file not found with <angled> include; use \"quotes\" instead\n    3 | #include <order.h>\n      |          ^~~~~~~~~\n      |          \"order.h\"\n1 error generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch10/angle2"
     }
    ]
   }
  },
  "angle2/order.h": {
   "src": "#pragma once\n// order.h: what one table ordered\nstruct Order {\n    int soups;\n    int pies;\n};\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "bill.cpp": {
   "src": "#include <iostream>\n\nint tip_for(int food) {\n    int tip = food / 5;\n    return tip;\n}\n\nint total_bill(int soup, int pie) {\n    int food = soup + pie;\n    int total = food + tip_for(food);\n    return total;\n}\n\nint main() {\n    int bill = total_bill(12, 8);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "+break total_bill\nBreakpoint 1 at 0x11c8: file bill.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, total_bill (soup=12, pie=8) at bill.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+next\n11\t    return total;\n+info locals\nfood = 20\ntotal = 24\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 bill.cpp -o bill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x first.gdb ./bill",
     "out": "+break total_bill\nBreakpoint 1 at 0x11c8: file bill.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, total_bill (soup=12, pie=8) at bill.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+next\n11\t    return total;\n+info locals\nfood = 20\ntotal = 24\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+break total_bill\nBreakpoint 1 at 0x118e: file bill.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, total_bill (soup=12, pie=8) at bill.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+next\n11\t    return total;\n+info locals\nfood = 20\ntotal = 24\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 bill.cpp -o bill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x first.gdb ./bill",
      "out": "+break total_bill\nBreakpoint 1 at 0x118e: file bill.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, total_bill (soup=12, pie=8) at bill.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+next\n11\t    return total;\n+info locals\nfood = 20\ntotal = 24\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "first.gdb": {
   "src": "set trace-commands on\nbreak total_bill\nrun\nnext\nprint food\nnext\ninfo locals\ncontinue\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "bill_bt.cpp": {
   "src": "#include <iostream>\n\nint tip_for(int food) {\n    int tip = food / 5;\n    return tip;\n}\n\nint total_bill(int soup, int pie) {\n    int food = soup + pie;\n    int total = food + tip_for(food);\n    return total;\n}\n\nint main() {\n    int bill = total_bill(12, 8);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "+break 5\nBreakpoint 1 at 0x11b1: file bill_bt.cpp, line 5.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, tip_for (food=20) at bill_bt.cpp:5\n5\t    return tip;\n+bt\n#0  tip_for (food=20) at bill_bt.cpp:5\n#1  0x00005555555551dd in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n#2  0x0000555555555205 in main () at bill_bt.cpp:15\n+info locals\ntip = 4\n+up\n#1  0x00005555555551dd in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+print soup + pie\n$2 = 20\n+up\n#2  0x0000555555555205 in main () at bill_bt.cpp:15\n15\t    int bill = total_bill(12, 8);\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 bill_bt.cpp -o bill_bt",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x frames.gdb ./bill_bt",
     "out": "+break 5\nBreakpoint 1 at 0x11b1: file bill_bt.cpp, line 5.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, tip_for (food=20) at bill_bt.cpp:5\n5\t    return tip;\n+bt\n#0  tip_for (food=20) at bill_bt.cpp:5\n#1  0x00005555555551dd in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n#2  0x0000555555555205 in main () at bill_bt.cpp:15\n+info locals\ntip = 4\n+up\n#1  0x00005555555551dd in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+print soup + pie\n$2 = 20\n+up\n#2  0x0000555555555205 in main () at bill_bt.cpp:15\n15\t    int bill = total_bill(12, 8);\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+break 5\nBreakpoint 1 at 0x1175: file bill_bt.cpp, line 5.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, tip_for (food=20) at bill_bt.cpp:5\n5\t    return tip;\n+bt\n#0  tip_for (food=20) at bill_bt.cpp:5\n#1  0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n#2  0x00005555555551d7 in main () at bill_bt.cpp:15\n+info locals\ntip = 4\n+up\n#1  0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+print soup + pie\n$2 = 20\n+up\n#2  0x00005555555551d7 in main () at bill_bt.cpp:15\n15\t    int bill = total_bill(12, 8);\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 bill_bt.cpp -o bill_bt",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x frames.gdb ./bill_bt",
      "out": "+break 5\nBreakpoint 1 at 0x1175: file bill_bt.cpp, line 5.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, tip_for (food=20) at bill_bt.cpp:5\n5\t    return tip;\n+bt\n#0  tip_for (food=20) at bill_bt.cpp:5\n#1  0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n#2  0x00005555555551d7 in main () at bill_bt.cpp:15\n+info locals\ntip = 4\n+up\n#1  0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_bt.cpp:10\n10\t    int total = food + tip_for(food);\n+print food\n$1 = 20\n+print soup + pie\n$2 = 20\n+up\n#2  0x00005555555551d7 in main () at bill_bt.cpp:15\n15\t    int bill = total_bill(12, 8);\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "frames.gdb": {
   "src": "set trace-commands on\nbreak 5\nrun\nbt\ninfo locals\nup\nprint food\nprint soup + pie\nup\ncontinue\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "bill_step.cpp": {
   "src": "#include <iostream>\n\nint tip_for(int food) {\n    int tip = food / 5;\n    return tip;\n}\n\nint total_bill(int soup, int pie) {\n    int food = soup + pie;\n    int total = food + tip_for(food);\n    return total;\n}\n\nint main() {\n    int bill = total_bill(12, 8);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "+break main\nBreakpoint 1 at 0x11f6: file bill_step.cpp, line 15.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at bill_step.cpp:15\n15\t    int bill = total_bill(12, 8);\n+step\ntotal_bill (soup=12, pie=8) at bill_step.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+step\ntip_for (food=20) at bill_step.cpp:4\n4\t    int tip = food / 5;\n+next\n5\t    return tip;\n+finish\n0x00005555555551dd in total_bill (soup=12, pie=8) at bill_step.cpp:10\n10\t    int total = food + tip_for(food);\nValue returned is $1 = 4\n+next\n11\t    return total;\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 bill_step.cpp -o bill_step",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x step.gdb ./bill_step",
     "out": "+break main\nBreakpoint 1 at 0x11f6: file bill_step.cpp, line 15.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at bill_step.cpp:15\n15\t    int bill = total_bill(12, 8);\n+step\ntotal_bill (soup=12, pie=8) at bill_step.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+step\ntip_for (food=20) at bill_step.cpp:4\n4\t    int tip = food / 5;\n+next\n5\t    return tip;\n+finish\n0x00005555555551dd in total_bill (soup=12, pie=8) at bill_step.cpp:10\n10\t    int total = food + tip_for(food);\nValue returned is $1 = 4\n+next\n11\t    return total;\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+break main\nBreakpoint 1 at 0x11c8: file bill_step.cpp, line 15.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at bill_step.cpp:15\n15\t    int bill = total_bill(12, 8);\n+step\ntotal_bill (soup=12, pie=8) at bill_step.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+step\ntip_for (food=20) at bill_step.cpp:4\n4\t    int tip = food / 5;\n+next\n5\t    return tip;\n+finish\n0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_step.cpp:10\n10\t    int total = food + tip_for(food);\nValue returned is $1 = 4\n+next\n11\t    return total;\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 bill_step.cpp -o bill_step",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x step.gdb ./bill_step",
      "out": "+break main\nBreakpoint 1 at 0x11c8: file bill_step.cpp, line 15.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at bill_step.cpp:15\n15\t    int bill = total_bill(12, 8);\n+step\ntotal_bill (soup=12, pie=8) at bill_step.cpp:9\n9\t    int food = soup + pie;\n+next\n10\t    int total = food + tip_for(food);\n+step\ntip_for (food=20) at bill_step.cpp:4\n4\t    int tip = food / 5;\n+next\n5\t    return tip;\n+finish\n0x00005555555551a5 in total_bill (soup=12, pie=8) at bill_step.cpp:10\n10\t    int total = food + tip_for(food);\nValue returned is $1 = 4\n+next\n11\t    return total;\n+continue\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "step.gdb": {
   "src": "set trace-commands on\nbreak main\nrun\nstep\nnext\nstep\nnext\nfinish\nnext\ncontinue\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_fill.cpp": {
   "src": "// kitchen.cpp\n#include \"tips.h\"\n\nint tip_for(int food) {\n    return food / 5;\n}\n",
   "stdout": "Tip: $4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/boss_fill"
    },
    {
     "cmd": "g++ main.o kitchen.o -o bill",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/boss_fill"
    },
    {
     "cmd": "./bill",
     "out": "Tip: $4\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/boss_fill"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Tip: $4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/boss_fill"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o bill",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/boss_fill"
     },
     {
      "cmd": "./bill",
      "out": "Tip: $4\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/boss_fill"
     }
    ]
   }
  },
  "boss_link.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Price: \" << price_of(1) << '\\n';\n    std::cout << \"Refund: \" << refund(1) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/boss_link/main.cpp:7:(.text+0x6c): undefined reference to `refund(int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/boss_link"
    },
    {
     "cmd": "g++ main.o kitchen.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/boss_link/main.cpp:7:(.text+0x6c): undefined reference to `refund(int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/boss_link"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/boss_link/main.cpp:7:(.text+0x5e): undefined reference to `refund(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/boss_link"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o diner",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/boss_link/main.cpp:7:(.text+0x5e): undefined reference to `refund(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/boss_link"
     }
    ]
   }
  },
  "boss_link/menu.h": {
   "src": "// menu.h\nint price_of(int item);\nint refund(int item);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_link/kitchen.cpp": {
   "src": "// kitchen.cpp\n#include \"menu.h\"\n\nint price_of(int item) {\n    return item == 1 ? 4 : 3;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int total = 0;\n    for (int table = 1; table <= 3; ++table) {\n        total += table * 4;\n        std::cout << \"after table \" << table << \": \" << total << '\\n';\n    }\n    std::cout << \"Total: \" << total << '\\n';\n}\n",
   "stdout": "after table 1: 4\nafter table 2: 12\nafter table 3: 24\nTotal: 24\n",
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
     "out": "after table 1: 4\nafter table 2: 12\nafter table 3: 24\nTotal: 24\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "after table 1: 4\nafter table 2: 12\nafter table 3: 24\nTotal: 24\n",
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
      "out": "after table 1: 4\nafter table 2: 12\nafter table 3: 24\nTotal: 24\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "// specials.h\n#pragma once\n\nint todays_special();\n\nint special_price() {\n    return todays_special() * 2;\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: kitchen.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/kitchen.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\n/usr/bin/ld: specials.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/specials.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp specials.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/boss_odr"
    },
    {
     "cmd": "g++ main.o kitchen.o specials.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: kitchen.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/kitchen.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\n/usr/bin/ld: specials.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/specials.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/boss_odr"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: kitchen.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/kitchen.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\n/usr/bin/ld: specials.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/specials.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp specials.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/boss_odr"
     },
     {
      "cmd": "clang++ main.o kitchen.o specials.o -o diner",
      "out": "",
      "err": "/usr/bin/ld: kitchen.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/kitchen.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\n/usr/bin/ld: specials.o: in function `special_price()':\n/home/you/cpp-ch10/boss_odr/specials.cpp:6: multiple definition of `special_price()'; main.o:/home/you/cpp-ch10/boss_odr/main.cpp:6: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/boss_odr"
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int plates = 20;\n    int tables = 0;\n    while (plates >= 6) {\n        plates -= 6;\n        ++tables;\n        std::cout << tables << ' ' << plates << '\\n';\n    }\n}\n",
   "stdout": "1 14\n2 8\n3 2\n",
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
     "out": "1 14\n2 8\n3 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 14\n2 8\n3 2\n",
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
      "out": "1 14\n2 8\n3 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "crash.cpp": {
   "src": "#include <cstdlib>\n#include <iostream>\n\nvoid check_plates(int plates) {\n    if (plates < 0) {\n        std::cerr << \"Impossible: \" << plates << \" plates!\\n\";\n        std::abort();\n    }\n}\n\nint serve(int plates, int tables) {\n    int left = plates - tables * 2;\n    check_plates(left);\n    return left;\n}\n\nint main() {\n    std::cout << \"Left: \" << serve(10, 3) << '\\n';\n    std::cout << \"Left: \" << serve(4, 3) << '\\n';\n}\n",
   "stdout": "Left: 4\nLeft: ",
   "stderr": "Impossible: -2 plates!\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g crash.cpp -o crash",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./crash",
     "out": "Left: 4\nLeft: ",
     "err": "Impossible: -2 plates!\nAborted\n",
     "exit": 134,
     "merged": "Left: 4\nLeft: Impossible: -2 plates!\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Left: 4\nLeft: ",
    "stderr": "Impossible: -2 plates!\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g crash.cpp -o crash",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./crash",
      "out": "Left: 4\nLeft: ",
      "err": "Impossible: -2 plates!\nAborted\n",
      "exit": 134,
      "merged": "Left: 4\nLeft: Impossible: -2 plates!\nAborted\n"
     }
    ]
   }
  },
  "crash_gdb.cpp": {
   "src": "#include <cstdlib>\n#include <iostream>\n\nvoid check_plates(int plates) {\n    if (plates < 0) {\n        std::cerr << \"Impossible: \" << plates << \" plates!\\n\";\n        std::abort();\n    }\n}\n\nint serve(int plates, int tables) {\n    int left = plates - tables * 2;\n    check_plates(left);\n    return left;\n}\n\nint main() {\n    std::cout << \"Left: \" << serve(10, 3) << '\\n';\n    std::cout << \"Left: \" << serve(4, 3) << '\\n';\n}\n",
   "stdout": "+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nLeft: 4\nLeft: \nProgram received signal SIGABRT, Aborted.\n__pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n+bt\n#0  __pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n#1  __pthread_kill_internal (signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:78\n#2  __GI___pthread_kill (threadid=<optimized out>, signo=signo@entry=6) at ./nptl/pthread_kill.c:89\n#3  0x00007ffff784527e in __GI_raise (sig=sig@entry=6) at ../sysdeps/posix/raise.c:26\n#4  0x00007ffff78288ff in __GI_abort () at ./stdlib/abort.c:79\n#5  0x0000555555555201 in check_plates (plates=-2) at crash_gdb.cpp:7\n#6  0x000055555555522e in serve (plates=4, tables=3) at crash_gdb.cpp:13\n#7  0x00005555555552ad in main () at crash_gdb.cpp:19\n+frame 6\n#6  0x000055555555522e in serve (plates=4, tables=3) at crash_gdb.cpp:13\n13\t    check_plates(left);\n+print left\n$1 = -2\n+print plates\n$2 = 4\n",
   "stderr": "Impossible: -2 plates!\nwarning: 44\t./nptl/pthread_kill.c: No such file or directory\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 crash_gdb.cpp -o crash_gdb",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x crash.gdb ./crash_gdb",
     "out": "+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nLeft: 4\nLeft: \nProgram received signal SIGABRT, Aborted.\n__pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n+bt\n#0  __pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n#1  __pthread_kill_internal (signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:78\n#2  __GI___pthread_kill (threadid=<optimized out>, signo=signo@entry=6) at ./nptl/pthread_kill.c:89\n#3  0x00007ffff784527e in __GI_raise (sig=sig@entry=6) at ../sysdeps/posix/raise.c:26\n#4  0x00007ffff78288ff in __GI_abort () at ./stdlib/abort.c:79\n#5  0x0000555555555201 in check_plates (plates=-2) at crash_gdb.cpp:7\n#6  0x000055555555522e in serve (plates=4, tables=3) at crash_gdb.cpp:13\n#7  0x00005555555552ad in main () at crash_gdb.cpp:19\n+frame 6\n#6  0x000055555555522e in serve (plates=4, tables=3) at crash_gdb.cpp:13\n13\t    check_plates(left);\n+print left\n$1 = -2\n+print plates\n$2 = 4\n",
     "err": "Impossible: -2 plates!\nwarning: 44\t./nptl/pthread_kill.c: No such file or directory\n",
     "exit": 0,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nLeft: 4\nLeft: \nProgram received signal SIGABRT, Aborted.\n__pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n+bt\n#0  __pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n#1  __pthread_kill_internal (signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:78\n#2  __GI___pthread_kill (threadid=<optimized out>, signo=signo@entry=6) at ./nptl/pthread_kill.c:89\n#3  0x00007ffff784527e in __GI_raise (sig=sig@entry=6) at ../sysdeps/posix/raise.c:26\n#4  0x00007ffff78288ff in __GI_abort () at ./stdlib/abort.c:79\n#5  0x00005555555551b7 in check_plates (plates=-2) at crash_gdb.cpp:7\n#6  0x00005555555551e3 in serve (plates=4, tables=3) at crash_gdb.cpp:13\n#7  0x000055555555525c in main () at crash_gdb.cpp:19\n+frame 6\n#6  0x00005555555551e3 in serve (plates=4, tables=3) at crash_gdb.cpp:13\n13\t    check_plates(left);\n+print left\n$1 = -2\n+print plates\n$2 = 4\n",
    "stderr": "Impossible: -2 plates!\nwarning: 44\t./nptl/pthread_kill.c: No such file or directory\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 crash_gdb.cpp -o crash_gdb",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x crash.gdb ./crash_gdb",
      "out": "+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nLeft: 4\nLeft: \nProgram received signal SIGABRT, Aborted.\n__pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n+bt\n#0  __pthread_kill_implementation (no_tid=0, signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:44\n#1  __pthread_kill_internal (signo=6, threadid=<optimized out>) at ./nptl/pthread_kill.c:78\n#2  __GI___pthread_kill (threadid=<optimized out>, signo=signo@entry=6) at ./nptl/pthread_kill.c:89\n#3  0x00007ffff784527e in __GI_raise (sig=sig@entry=6) at ../sysdeps/posix/raise.c:26\n#4  0x00007ffff78288ff in __GI_abort () at ./stdlib/abort.c:79\n#5  0x00005555555551b7 in check_plates (plates=-2) at crash_gdb.cpp:7\n#6  0x00005555555551e3 in serve (plates=4, tables=3) at crash_gdb.cpp:13\n#7  0x000055555555525c in main () at crash_gdb.cpp:19\n+frame 6\n#6  0x00005555555551e3 in serve (plates=4, tables=3) at crash_gdb.cpp:13\n13\t    check_plates(left);\n+print left\n$1 = -2\n+print plates\n$2 = 4\n",
      "err": "Impossible: -2 plates!\nwarning: 44\t./nptl/pthread_kill.c: No such file or directory\n",
      "exit": 0,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "crash.gdb": {
   "src": "set trace-commands on\nrun\nbt\nframe 6\nprint left\nprint plates\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "debug_fill.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int plates = 12;\n    std::cerr << \"DEBUG plates=\" << plates << '\\n';\n    plates = plates - 5;\n    std::cerr << \"DEBUG plates=\" << plates << '\\n';\n    std::cout << \"Plates left: \" << plates << '\\n';\n}\n",
   "stdout": "Plates left: 7\n",
   "stderr": "DEBUG plates=12\nDEBUG plates=7\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g debug_fill.cpp -o debug_fill",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./debug_fill",
     "out": "Plates left: 7\n",
     "err": "DEBUG plates=12\nDEBUG plates=7\n",
     "exit": 0,
     "merged": "DEBUG plates=12\nDEBUG plates=7\nPlates left: 7\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Plates left: 7\n",
    "stderr": "DEBUG plates=12\nDEBUG plates=7\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g debug_fill.cpp -o debug_fill",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./debug_fill",
      "out": "Plates left: 7\n",
      "err": "DEBUG plates=12\nDEBUG plates=7\n",
      "exit": 0,
      "merged": "DEBUG plates=12\nDEBUG plates=7\nPlates left: 7\n"
     }
    ]
   }
  },
  "diner.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "./diner",
     "out": "Item 1 costs $4\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "./diner",
      "out": "Item 1 costs $4\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     }
    ]
   }
  },
  "diner/menu.h": {
   "src": "// menu.h: the menu. It promises dishes. It cooks nothing.\nint price_of(int item);              // item 1 is soup, item 2 is pie\nint bill_for(int soups, int pies);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "diner/kitchen.cpp": {
   "src": "// kitchen.cpp: the kitchen cooks every dish the menu promises.\n#include \"menu.h\"\n\nint price_of(int item) {\n    if (item == 1) return 4;         // soup\n    if (item == 2) return 3;         // pie\n    return 0;                        // not on the menu\n}\n\nint bill_for(int soups, int pies) {\n    return soups * price_of(1) + pies * price_of(2);\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "diner_one.cpp": {
   "src": "#include <iostream>\n\nint price_of(int item) {\n    if (item == 1) return 4;         // soup\n    if (item == 2) return 3;         // pie\n    return 0;                        // not on the menu\n}\n\nint bill_for(int soups, int pies) {\n    return soups * price_of(1) + pies * price_of(2);\n}\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g diner_one.cpp -o diner_one",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./diner_one",
     "out": "Item 1 costs $4\nTable 4 owes $17\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g diner_one.cpp -o diner_one",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./diner_one",
      "out": "Item 1 costs $4\nTable 4 owes $17\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "diner_steps.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls",
     "out": "kitchen.cpp  main.cpp  menu.h\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "ls",
     "out": "kitchen.cpp  kitchen.o\tmain.cpp  main.o  menu.h\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "g++ main.o kitchen.o -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "./diner",
     "out": "Item 1 costs $4\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "ls",
      "out": "kitchen.cpp  main.cpp  menu.h\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "ls",
      "out": "kitchen.cpp  kitchen.o\tmain.cpp  main.o  menu.h\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "./diner",
      "out": "Item 1 costs $4\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     }
    ]
   }
  },
  "forgot.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x2f): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x71): undefined reference to `bill_for(int, int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/forgot"
    },
    {
     "cmd": "g++ main.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x2f): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x71): undefined reference to `bill_for(int, int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/forgot"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x25): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/forgot"
     },
     {
      "cmd": "clang++ main.o -o diner",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x25): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/forgot"
     }
    ]
   }
  },
  "forgot_clang.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x25): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/forgot"
    },
    {
     "cmd": "clang++ main.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/forgot/main.cpp:6:(.text+0x25): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch10/forgot/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
     "exit": 1,
     "dir": "~/cpp-ch10/forgot"
    }
   ]
  },
  "guard_parsons.cpp": {
   "src": "#ifndef ORDER_H\n#define ORDER_H\nstruct Order {\n    int soups;\n    int pies;\n};\n#endif\n",
   "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    },
    {
     "cmd": "./diner",
     "out": "2 soups, 3 pies\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     },
     {
      "cmd": "./diner",
      "out": "2 soups, 3 pies\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     }
    ]
   }
  },
  "guards_bad.cpp": {
   "src": "// order.h: what one table ordered\nstruct Order {\n    int soups;\n    int pies;\n};\n",
   "stdout": "",
   "stderr": "In file included from table.h:2,\n                 from main.cpp:4:\norder.h:2:8: error: redefinition of ‘struct Order’\n    2 | struct Order {\n      |        ^~~~~\nIn file included from main.cpp:3:\norder.h:2:8: note: previous definition of ‘struct Order’\n    2 | struct Order {\n      |        ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
     "out": "",
     "err": "In file included from table.h:2,\n                 from main.cpp:4:\norder.h:2:8: error: redefinition of ‘struct Order’\n    2 | struct Order {\n      |        ^~~~~\nIn file included from main.cpp:3:\norder.h:2:8: note: previous definition of ‘struct Order’\n    2 | struct Order {\n      |        ^~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch10/guards"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "In file included from main.cpp:4:\nIn file included from ./table.h:2:\n./order.h:2:8: error: redefinition of 'Order'\n    2 | struct Order {\n      |        ^\nmain.cpp:3:10: note: './order.h' included multiple times, additional include site here\n    3 | #include \"order.h\"\n      |          ^\n./table.h:2:10: note: './order.h' included multiple times, additional include site here\n    2 | #include \"order.h\"\n      |          ^\n./order.h:2:8: note: unguarded header; consider using #ifdef guards or #pragma once\n    2 | struct Order {\n      |        ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
      "out": "",
      "err": "In file included from main.cpp:4:\nIn file included from ./table.h:2:\n./order.h:2:8: error: redefinition of 'Order'\n    2 | struct Order {\n      |        ^\nmain.cpp:3:10: note: './order.h' included multiple times, additional include site here\n    3 | #include \"order.h\"\n      |          ^\n./table.h:2:10: note: './order.h' included multiple times, additional include site here\n    2 | #include \"order.h\"\n      |          ^\n./order.h:2:8: note: unguarded header; consider using #ifdef guards or #pragma once\n    2 | struct Order {\n      |        ^\n1 error generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch10/guards"
     }
    ]
   }
  },
  "guards/table.h": {
   "src": "// table.h: what a table can do with its order\n#include \"order.h\"\n\nint order_total(const Order& o);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "guards/table.cpp": {
   "src": "// table.cpp\n#include \"table.h\"\n\nint order_total(const Order& o) {\n    return o.soups * 4 + o.pies * 3;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "guards/main.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include \"order.h\"\n#include \"table.h\"\n\nint main() {\n    Order t4{2, 3};\n    std::cout << t4.soups << \" soups, \" << t4.pies << \" pies\\n\";\n    std::cout << \"Table 4 owes $\" << order_total(t4) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "guards_fixed.cpp": {
   "src": "#ifndef ORDER_H\n#define ORDER_H\n// order.h: what one table ordered\nstruct Order {\n    int soups;\n    int pies;\n};\n#endif\n",
   "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    },
    {
     "cmd": "./diner",
     "out": "2 soups, 3 pies\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     },
     {
      "cmd": "./diner",
      "out": "2 soups, 3 pies\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     }
    ]
   }
  },
  "guards_pragma.cpp": {
   "src": "#pragma once\n// order.h: what one table ordered\nstruct Order {\n    int soups;\n    int pies;\n};\n",
   "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    },
    {
     "cmd": "./diner",
     "out": "2 soups, 3 pies\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/guards"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 soups, 3 pies\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp table.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     },
     {
      "cmd": "./diner",
      "out": "2 soups, 3 pies\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/guards"
     }
    ]
   }
  },
  "include_fill.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "./diner",
     "out": "Item 1 costs $4\nTable 4 owes $17\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Item 1 costs $4\nTable 4 owes $17\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "./diner",
      "out": "Item 1 costs $4\nTable 4 owes $17\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     }
    ]
   }
  },
  "lost.cpp": {
   "src": "#include <cstdlib>\n#include <iostream>\n\nint main() {\n    std::cout << \"Order 1 saved\" << std::endl;  // newline + flush\n    std::cout << \"Saving order 2... \";  // waits in the bucket\n    std::abort();                       // stop right now\n}\n",
   "stdout": "Order 1 saved\n",
   "stderr": "Aborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lost.cpp -o lost",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lost",
     "out": "Order 1 saved\n",
     "err": "Aborted\n",
     "exit": 134,
     "merged": "Order 1 saved\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Order 1 saved\n",
    "stderr": "Aborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lost.cpp -o lost",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lost",
      "out": "Order 1 saved\n",
      "err": "Aborted\n",
      "exit": 134,
      "merged": "Order 1 saved\nAborted\n"
     }
    ]
   }
  },
  "lost_fixed.cpp": {
   "src": "#include <cstdlib>\n#include <iostream>\n\nint main() {\n    std::cout << \"Order 1 saved\" << std::endl;\n    std::cerr << \"Saving order 2... \";  // no bucket\n    std::abort();\n}\n",
   "stdout": "Order 1 saved\n",
   "stderr": "Saving order 2... Aborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lost_fixed.cpp -o lost_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lost_fixed",
     "out": "Order 1 saved\n",
     "err": "Saving order 2... Aborted\n",
     "exit": 134,
     "merged": "Order 1 saved\nSaving order 2... Aborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Order 1 saved\n",
    "stderr": "Saving order 2... Aborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lost_fixed.cpp -o lost_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lost_fixed",
      "out": "Order 1 saved\n",
      "err": "Saving order 2... Aborted\n",
      "exit": 134,
      "merged": "Order 1 saved\nSaving order 2... Aborted\n"
     }
    ]
   }
  },
  "lost_quiz.cpp": {
   "src": "#include <cstdlib>\n#include <iostream>\n\nint main() {\n    std::cout << \"Table 1 served\" << std::endl;\n    std::cout << \"Table 2 \";\n    std::cout << \"served\" << std::flush;\n    std::cout << \" and paid\" << std::endl;\n    std::cout << \"Table 3 \";\n    std::abort();\n}\n",
   "stdout": "Table 1 served\nTable 2 served and paid\n",
   "stderr": "Aborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lost_quiz.cpp -o lost_quiz",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lost_quiz",
     "out": "Table 1 served\nTable 2 served and paid\n",
     "err": "Aborted\n",
     "exit": 134,
     "merged": "Table 1 served\nTable 2 served and paid\nAborted\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Table 1 served\nTable 2 served and paid\n",
    "stderr": "Aborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lost_quiz.cpp -o lost_quiz",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lost_quiz",
      "out": "Table 1 served\nTable 2 served and paid\n",
      "err": "Aborted\n",
      "exit": 134,
      "merged": "Table 1 served\nTable 2 served and paid\nAborted\n"
     }
    ]
   }
  },
  "nm_symbols.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "\nmain.o:\n                 U bill_for(int, int)\n                 U price_of(int)\n                 U std::ostream::operator<<(int)\n000000000000001e r std::__detail::__integer_to_chars_is_unsigned<unsigned int>\n000000000000001f r std::__detail::__integer_to_chars_is_unsigned<unsigned long>\n0000000000000020 r std::__detail::__integer_to_chars_is_unsigned<unsigned long long>\n                 U std::ios_base_library_init()\n                 U std::cout\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char)\n0000000000000000 T main\n\nkitchen.o:\n000000000000002c T bill_for(int, int)\n0000000000000000 T price_of(int)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    },
    {
     "cmd": "nm -C main.o kitchen.o",
     "out": "\nmain.o:\n                 U bill_for(int, int)\n                 U price_of(int)\n                 U std::ostream::operator<<(int)\n000000000000001e r std::__detail::__integer_to_chars_is_unsigned<unsigned int>\n000000000000001f r std::__detail::__integer_to_chars_is_unsigned<unsigned long>\n0000000000000020 r std::__detail::__integer_to_chars_is_unsigned<unsigned long long>\n                 U std::ios_base_library_init()\n                 U std::cout\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char)\n0000000000000000 T main\n\nkitchen.o:\n000000000000002c T bill_for(int, int)\n0000000000000000 T price_of(int)\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "\nmain.o:\n0000000000000000 r .L.str\n000000000000000f r .L.str.1\n                 U bill_for(int, int)\n                 U price_of(int)\n                 U std::ostream::operator<<(int)\n                 U std::ios_base_library_init()\n                 U std::cout\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char)\n0000000000000000 T main\n\nkitchen.o:\n0000000000000040 T bill_for(int, int)\n0000000000000000 T price_of(int)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     },
     {
      "cmd": "nm -C main.o kitchen.o",
      "out": "\nmain.o:\n0000000000000000 r .L.str\n000000000000000f r .L.str.1\n                 U bill_for(int, int)\n                 U price_of(int)\n                 U std::ostream::operator<<(int)\n                 U std::ios_base_library_init()\n                 U std::cout\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*)\n                 U std::basic_ostream<char, std::char_traits<char> >& std::operator<< <std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char)\n0000000000000000 T main\n\nkitchen.o:\n0000000000000040 T bill_for(int, int)\n0000000000000000 T price_of(int)\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     }
    ]
   }
  },
  "nog.cpp": {
   "src": "#include <iostream>\n\nint tip_for(int food) {\n    int tip = food / 5;\n    return tip;\n}\n\nint total_bill(int soup, int pie) {\n    int food = soup + pie;\n    int total = food + tip_for(food);\n    return total;\n}\n\nint main() {\n    int bill = total_bill(12, 8);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "Breakpoint 1 at 0x1191\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555191 in tip_for(int) ()\n#0  0x0000555555555191 in tip_for(int) ()\n#1  0x00005555555551dd in total_bill(int, int) ()\n#2  0x0000555555555205 in main ()\nNo symbol table info available.\n",
   "stderr": "No symbol table is loaded.  Use the \"file\" command.\nNo symbol \"food\" in current context.\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -O0 nog.cpp -o nog",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -ex \"break 9\" -ex \"break tip_for\" -ex run -ex bt -ex \"info locals\" -ex \"print food\" ./nog",
     "out": "Breakpoint 1 at 0x1191\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555191 in tip_for(int) ()\n#0  0x0000555555555191 in tip_for(int) ()\n#1  0x00005555555551dd in total_bill(int, int) ()\n#2  0x0000555555555205 in main ()\nNo symbol table info available.\n",
     "err": "No symbol table is loaded.  Use the \"file\" command.\nNo symbol \"food\" in current context.\n",
     "exit": 1,
     "merged": "No symbol table is loaded.  Use the \"file\" command.\nBreakpoint 1 at 0x1191\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555191 in tip_for(int) ()\n#0  0x0000555555555191 in tip_for(int) ()\n#1  0x00005555555551dd in total_bill(int, int) ()\n#2  0x0000555555555205 in main ()\nNo symbol table info available.\nNo symbol \"food\" in current context.\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Breakpoint 1 at 0x1164\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555164 in tip_for(int) ()\n#0  0x0000555555555164 in tip_for(int) ()\n#1  0x00005555555551a5 in total_bill(int, int) ()\n#2  0x00005555555551d7 in main ()\nNo symbol table info available.\n",
    "stderr": "No symbol table is loaded.  Use the \"file\" command.\nNo symbol \"food\" in current context.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -O0 nog.cpp -o nog",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -ex \"break 9\" -ex \"break tip_for\" -ex run -ex bt -ex \"info locals\" -ex \"print food\" ./nog",
      "out": "Breakpoint 1 at 0x1164\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555164 in tip_for(int) ()\n#0  0x0000555555555164 in tip_for(int) ()\n#1  0x00005555555551a5 in total_bill(int, int) ()\n#2  0x00005555555551d7 in main ()\nNo symbol table info available.\n",
      "err": "No symbol table is loaded.  Use the \"file\" command.\nNo symbol \"food\" in current context.\n",
      "exit": 1,
      "merged": "No symbol table is loaded.  Use the \"file\" command.\nBreakpoint 1 at 0x1164\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, 0x0000555555555164 in tip_for(int) ()\n#0  0x0000555555555164 in tip_for(int) ()\n#1  0x00005555555551a5 in total_bill(int, int) ()\n#2  0x00005555555551d7 in main ()\nNo symbol table info available.\nNo symbol \"food\" in current context.\n"
     }
    ]
   }
  },
  "ns.cpp": {
   "src": "// tools.h: kitchen tools, shared by every file\n#pragma once\n#include <algorithm>\n#include <vector>\nusing namespace std;     // pours std into every includer\n\nint busiest(const vector<int>& orders);\n",
   "stdout": "",
   "stderr": "main.cpp: In function ‘int main()’:\nmain.cpp:8:32: error: reference to ‘count’ is ambiguous\n    8 |     std::cout << \"Served: \" << count << '\\n';\n      |                                ^~~~~\nIn file included from /usr/include/c++/13/algorithm:73,\n                 from tools.h:3,\n                 from main.cpp:3:\n/usr/include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidates are: ‘template<class _ExecutionPolicy, class _ForwardIterator, class _Tp> __pstl::__internal::__enable_if_execution_policy<_ExecutionPolicy, typename std::iterator_traits<_II>::difference_type> std::count(_ExecutionPolicy&&, _ForwardIterator, _ForwardIterator, const _Tp&)’\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:4072:5: note:                 ‘template<class _IIter, class _Tp> constexpr typename std::iterator_traits<_Iterator>::difference_type std::count(_IIter, _IIter, const _Tp&)’\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^~~~~\nmain.cpp:5:5: note:                 ‘int count’\n    5 | int count = 3;           // dishes served today\n      |     ^~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "main.cpp: In function ‘int main()’:\nmain.cpp:8:32: error: reference to ‘count’ is ambiguous\n    8 |     std::cout << \"Served: \" << count << '\\n';\n      |                                ^~~~~\nIn file included from /usr/include/c++/13/algorithm:73,\n                 from tools.h:3,\n                 from main.cpp:3:\n/usr/include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidates are: ‘template<class _ExecutionPolicy, class _ForwardIterator, class _Tp> __pstl::__internal::__enable_if_execution_policy<_ExecutionPolicy, typename std::iterator_traits<_II>::difference_type> std::count(_ExecutionPolicy&&, _ForwardIterator, _ForwardIterator, const _Tp&)’\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^~~~~\nIn file included from /usr/include/c++/13/algorithm:61:\n/usr/include/c++/13/bits/stl_algo.h:4072:5: note:                 ‘template<class _IIter, class _Tp> constexpr typename std::iterator_traits<_Iterator>::difference_type std::count(_IIter, _IIter, const _Tp&)’\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^~~~~\nmain.cpp:5:5: note:                 ‘int count’\n    5 | int count = 3;           // dishes served today\n      |     ^~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch10/ns"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "main.cpp:8:32: error: reference to 'count' is ambiguous\n    8 |     std::cout << \"Served: \" << count << '\\n';\n      |                                ^\nmain.cpp:5:5: note: candidate found by name lookup is 'count'\n    5 | int count = 3;           // dishes served today\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidate found by name lookup is 'std::count'\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4072:5: note: candidate found by name lookup is 'std::count'\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "main.cpp:8:32: error: reference to 'count' is ambiguous\n    8 |     std::cout << \"Served: \" << count << '\\n';\n      |                                ^\nmain.cpp:5:5: note: candidate found by name lookup is 'count'\n    5 | int count = 3;           // dishes served today\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/pstl/glue_algorithm_defs.h:101:1: note: candidate found by name lookup is 'std::count'\n  101 | count(_ExecutionPolicy&& __exec, _ForwardIterator __first, _ForwardIterator __last, const _Tp& __value);\n      | ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4072:5: note: candidate found by name lookup is 'std::count'\n 4072 |     count(_InputIterator __first, _InputIterator __last, const _Tp& __value)\n      |     ^\n1 error generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch10/ns"
     }
    ]
   }
  },
  "ns/main.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include \"tools.h\"\n\nint count = 3;           // dishes served today\n\nint main() {\n    std::cout << \"Served: \" << count << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "opt.cpp": {
   "src": "#include <iostream>\n\nint tip_for(int food) {\n    int tip = food / 5;\n    return tip;\n}\n\nint total_bill(int soup, int pie) {\n    int food = soup + pie;\n    int total = food + tip_for(food);\n    return total;\n}\n\nint main() {\n    int bill = total_bill(12, 8);\n    std::cout << \"Bill: \" << bill << '\\n';\n}\n",
   "stdout": "+break total_bill\nBreakpoint 1 at 0x1280: file opt.cpp, line 8.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O2 opt.cpp -o opt",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x opt.gdb ./opt",
     "out": "+break total_bill\nBreakpoint 1 at 0x1280: file opt.cpp, line 8.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+break total_bill\nBreakpoint 1 at 0x1180: file opt.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O2 opt.cpp -o opt",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x opt.gdb ./opt",
      "out": "+break total_bill\nBreakpoint 1 at 0x1180: file opt.cpp, line 9.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\nBill: 24\n[Inferior 1 (process 5) exited normally]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "opt.gdb": {
   "src": "set trace-commands on\nbreak total_bill\nrun\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "paste.cpp": {
   "src": "#include \"shout.h\"\n\nint main() {\n    shout(3);\n}\n",
   "stdout": "void shout(int times);\nint main() {\n    shout(3);\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -E -P main.cpp",
     "out": "void shout(int times);\nint main() {\n    shout(3);\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/paste"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "\nvoid shout(int times);\n\nint main() {\n    shout(3);\n}\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -E -P main.cpp",
      "out": "\nvoid shout(int times);\n\nint main() {\n    shout(3);\n}\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/paste"
     }
    ]
   }
  },
  "paste/shout.h": {
   "src": "// shout.h: one promise\nvoid shout(int times);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "paste_count.cpp": {
   "src": "// main.cpp: the dining room. It orders from the menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Item 1 costs $\" << price_of(1) << '\\n';\n    std::cout << \"Table 4 owes $\" << bill_for(2, 3) << '\\n';\n}\n",
   "stdout": "44658\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -E main.cpp | wc -l",
     "out": "44658\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/diner"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "44156\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -E main.cpp | wc -l",
      "out": "44156\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/diner"
     }
    ]
   }
  },
  "paste_quiz.cpp": {
   "src": "#include \"drinks.h\"\nint main() {\n    return lemonade(large());\n}\n",
   "stdout": "int small();\nint large();\nint lemonade(int size);\nint main() {\n    return lemonade(large());\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -E -P main.cpp",
     "out": "int small();\nint large();\nint lemonade(int size);\nint main() {\n    return lemonade(large());\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/paste2"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "\n\nint small();\nint large();\nint lemonade(int size);\nint main() {\n    return lemonade(large());\n}\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -E -P main.cpp",
      "out": "\n\nint small();\nint large();\nint lemonade(int size);\nint main() {\n    return lemonade(large());\n}\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/paste2"
     }
    ]
   }
  },
  "paste2/sizes.h": {
   "src": "// sizes.h\nint small();\nint large();\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "paste2/drinks.h": {
   "src": "// drinks.h\n#include \"sizes.h\"\nint lemonade(int size);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "predict_split.cpp": {
   "src": "// main.cpp: a different table orders from the same menu.\n#include <iostream>\n#include \"menu.h\"\n\nint main() {\n    std::cout << bill_for(1, 2) << '\\n';\n    std::cout << price_of(3) << '\\n';\n    std::cout << bill_for(0, 0) + price_of(2) << '\\n';\n}\n",
   "stdout": "10\n0\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/quiz"
    },
    {
     "cmd": "./diner",
     "out": "10\n0\n3\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/quiz"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "10\n0\n3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp kitchen.cpp -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/quiz"
     },
     {
      "cmd": "./diner",
      "out": "10\n0\n3\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/quiz"
     }
    ]
   }
  },
  "selfc.cpp": {
   "src": "// menu.h\n#pragma once\n\nstd::string dish_name(int item);\n",
   "stdout": "",
   "stderr": "In file included from main.cpp:2:\nmenu.h:4:6: error: ‘string’ in namespace ‘std’ does not name a type\n    4 | std::string dish_name(int item);\n      |      ^~~~~~\nmenu.h:1:1: note: ‘std::string’ is defined in header ‘<string>’; did you forget to ‘#include <string>’?\n  +++ |+#include <string>\n    1 | // menu.h\nmain.cpp: In function ‘int main()’:\nmain.cpp:7:18: error: ‘dish_name’ was not declared in this scope\n    7 |     std::cout << dish_name(1) << '\\n';\n      |                  ^~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "In file included from main.cpp:2:\nmenu.h:4:6: error: ‘string’ in namespace ‘std’ does not name a type\n    4 | std::string dish_name(int item);\n      |      ^~~~~~\nmenu.h:1:1: note: ‘std::string’ is defined in header ‘<string>’; did you forget to ‘#include <string>’?\n  +++ |+#include <string>\n    1 | // menu.h\nmain.cpp: In function ‘int main()’:\nmain.cpp:7:18: error: ‘dish_name’ was not declared in this scope\n    7 |     std::cout << dish_name(1) << '\\n';\n      |                  ^~~~~~~~~\n",
     "exit": 1,
     "dir": "~/cpp-ch10/selfc"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "In file included from main.cpp:2:\n./menu.h:4:1: error: use of undeclared identifier 'std'\n    4 | std::string dish_name(int item);\n      | ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "In file included from main.cpp:2:\n./menu.h:4:1: error: use of undeclared identifier 'std'\n    4 | std::string dish_name(int item);\n      | ^\n1 error generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch10/selfc"
     }
    ]
   }
  },
  "selfc/main.cpp": {
   "src": "// main.cpp\n#include \"menu.h\"\n#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << dish_name(1) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "spot_kitchen.cpp": {
   "src": "// kitchen.cpp\n#include \"menu.h\"\n\nint price_of(int item) {\n    if (item == 1) return 4;\n    if (item == 2) return 3;\n    return 0;\n}\n\nint bill_for(int soups) {\n    int pies = 3;\n    return soups * price_of(1) + pies * price_of(2);\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/spotk/main.cpp:7:(.text+0x71): undefined reference to `bill_for(int, int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/spotk"
    },
    {
     "cmd": "g++ main.o kitchen.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/spotk/main.cpp:7:(.text+0x71): undefined reference to `bill_for(int, int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/spotk"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/spotk/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/spotk"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o diner",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/spotk/main.cpp:7:(.text+0x63): undefined reference to `bill_for(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/spotk"
     }
    ]
   }
  },
  "spot_loop.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> orders{3, 1, 4, 1, 5};\n    int biggest = 0;\n    for (int i = 0; i < 5; ++i) {\n        if (orders[i] > biggest) {\n            biggest = i;\n        }\n    }\n    std::cout << \"Biggest order: \" << biggest << '\\n';\n}\n",
   "stdout": "Biggest order: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_loop.cpp -o spot_loop",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_loop",
     "out": "Biggest order: 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Biggest order: 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_loop.cpp -o spot_loop",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_loop",
      "out": "Biggest order: 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "tip.cpp": {
   "src": "// kitchen.cpp\n#include \"tips.h\"\n\nint tip_for(double food) {\n    return food / 5;\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/tip/main.cpp:6:(.text+0x2f): undefined reference to `tip_for(int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/tip"
    },
    {
     "cmd": "g++ main.o kitchen.o -o bill",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/tip/main.cpp:6:(.text+0x2f): undefined reference to `tip_for(int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/tip"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/tip/main.cpp:6:(.text+0x25): undefined reference to `tip_for(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/tip"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o bill",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch10/tip/main.cpp:6:(.text+0x25): undefined reference to `tip_for(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/tip"
     }
    ]
   }
  },
  "tip/tips.h": {
   "src": "// tips.h\nint tip_for(int food);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tip/main.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include \"tips.h\"\n\nint main() {\n    std::cout << \"Tip: $\" << tip_for(20) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tips_bug.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tips{4, 6, 9, 5};\n    int total = 0;\n    for (int i = 1; i < 4; ++i) {\n        total += tips[i];\n    }\n    std::cout << \"Total tips: \" << total << '\\n';\n}\n",
   "stdout": "Total tips: 20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g tips_bug.cpp -o tips_bug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./tips_bug",
     "out": "Total tips: 20\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total tips: 20\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g tips_bug.cpp -o tips_bug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./tips_bug",
      "out": "Total tips: 20\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "tips_debug.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tips{4, 6, 9, 5};\n    int total = 0;\n    for (int i = 1; i < 4; ++i) {\n        std::cerr << \"DEBUG i=\" << i << \" tip=\" << tips[i] << '\\n';\n        total += tips[i];\n    }\n    std::cout << \"Total tips: \" << total << '\\n';\n}\n",
   "stdout": "Total tips: 20\n",
   "stderr": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g tips_debug.cpp -o tips_debug",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./tips_debug",
     "out": "Total tips: 20\n",
     "err": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\n",
     "exit": 0,
     "merged": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\nTotal tips: 20\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total tips: 20\n",
    "stderr": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g tips_debug.cpp -o tips_debug",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./tips_debug",
      "out": "Total tips: 20\n",
      "err": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\n",
      "exit": 0,
      "merged": "DEBUG i=1 tip=6\nDEBUG i=2 tip=9\nDEBUG i=3 tip=5\nTotal tips: 20\n"
     }
    ]
   }
  },
  "tips_watch.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tips{4, 6, 9, 5};\n    int total = 0;\n    for (int i = 0; i < 4; ++i) {\n        total += tips[i];\n    }\n    std::cout << \"Total tips: \" << total << '\\n';\n}\n",
   "stdout": "+break 7\nBreakpoint 1 at 0x1315: file tips_watch.cpp, line 7.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+watch total\nHardware watchpoint 2: total\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 0\nNew value = 4\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 4\nNew value = 10\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+info locals\ni = 1\ntips = std::vector of length 4, capacity 4 = {4, 6, 9, 5}\ntotal = 10\n+delete\n+continue\nTotal tips: 24\n[Inferior 1 (process 5) exited normally]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -O0 tips_watch.cpp -o tips_watch",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gdb -q -batch -x watch.gdb ./tips_watch",
     "out": "+break 7\nBreakpoint 1 at 0x1315: file tips_watch.cpp, line 7.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+watch total\nHardware watchpoint 2: total\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 0\nNew value = 4\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 4\nNew value = 10\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+info locals\ni = 1\ntips = std::vector of length 4, capacity 4 = {4, 6, 9, 5}\ntotal = 10\n+delete\n+continue\nTotal tips: 24\n[Inferior 1 (process 5) exited normally]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "+break 7\nBreakpoint 1 at 0x1263: file tips_watch.cpp, line 7.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+watch total\nHardware watchpoint 2: total\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 0\nNew value = 4\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 4\nNew value = 10\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+info locals\ni = 1\ntips = std::vector of length 4, capacity 4 = {4, 6, 9, 5}\ntotal = 10\n+delete\n+continue\nTotal tips: 24\n[Inferior 1 (process 5) exited normally]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -O0 tips_watch.cpp -o tips_watch",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gdb -q -batch -x watch.gdb ./tips_watch",
      "out": "+break 7\nBreakpoint 1 at 0x1263: file tips_watch.cpp, line 7.\n+run\n[Thread debugging using libthread_db enabled]\nUsing host libthread_db library \"/lib/x86_64-linux-gnu/libthread_db.so.1\".\n\nBreakpoint 1, main () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+watch total\nHardware watchpoint 2: total\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 0\nNew value = 4\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+continue\n\nHardware watchpoint 2: total\n\nOld value = 4\nNew value = 10\nmain () at tips_watch.cpp:7\n7\t    for (int i = 0; i < 4; ++i) {\n+info locals\ni = 1\ntips = std::vector of length 4, capacity 4 = {4, 6, 9, 5}\ntotal = 10\n+delete\n+continue\nTotal tips: 24\n[Inferior 1 (process 5) exited normally]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "watch.gdb": {
   "src": "set trace-commands on\nbreak 7\nrun\nwatch total\ncontinue\ncontinue\ninfo locals\ndelete\ncontinue\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "trace_biggest.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> orders{3, 1, 4, 1, 5};\n    int biggest = 0;\n    for (int i = 0; i < 5; ++i) {\n        if (orders[i] > biggest) {\n            biggest = i;\n        }\n        std::cout << i << ' ' << orders[i] << ' ' << biggest << '\\n';\n    }\n}\n",
   "stdout": "0 3 0\n1 1 1\n2 4 2\n3 1 2\n4 5 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_biggest.cpp -o trace_biggest",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_biggest",
     "out": "0 3 0\n1 1 1\n2 4 2\n3 1 2\n4 5 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0 3 0\n1 1 1\n2 4 2\n3 1 2\n4 5 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_biggest.cpp -o trace_biggest",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_biggest",
      "out": "0 3 0\n1 1 1\n2 4 2\n3 1 2\n4 5 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_tips.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tips{4, 6, 9, 5};\n    int total = 0;\n    for (int i = 0; i < 4; ++i) {\n        total += tips[i];\n        std::cout << i << ' ' << tips[i] << ' ' << total << '\\n';\n    }\n}\n",
   "stdout": "0 4 4\n1 6 10\n2 9 19\n3 5 24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_tips.cpp -o trace_tips",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_tips",
     "out": "0 4 4\n1 6 10\n2 9 19\n3 5 24\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0 4 4\n1 6 10\n2 9 19\n3 5 24\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_tips.cpp -o trace_tips",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_tips",
      "out": "0 4 4\n1 6 10\n2 9 19\n3 5 24\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "twice.cpp": {
   "src": "// specials.h\n#pragma once\n\nint todays_special() {       // a whole recipe, in the menu!\n    return 2;\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: kitchen.o: in function `todays_special()':\n/home/you/cpp-ch10/twice/kitchen.cpp:4: multiple definition of `todays_special()'; main.o:/home/you/cpp-ch10/twice/main.cpp:4: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/twice"
    },
    {
     "cmd": "g++ main.o kitchen.o -o diner",
     "out": "",
     "err": "/usr/bin/ld: kitchen.o: in function `todays_special()':\n/home/you/cpp-ch10/twice/kitchen.cpp:4: multiple definition of `todays_special()'; main.o:/home/you/cpp-ch10/twice/main.cpp:4: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch10/twice"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: kitchen.o: in function `todays_special()':\n/home/you/cpp-ch10/twice/kitchen.cpp:4: multiple definition of `todays_special()'; main.o:/home/you/cpp-ch10/twice/main.cpp:4: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/twice"
     },
     {
      "cmd": "clang++ main.o kitchen.o -o diner",
      "out": "",
      "err": "/usr/bin/ld: kitchen.o: in function `todays_special()':\n/home/you/cpp-ch10/twice/kitchen.cpp:4: multiple definition of `todays_special()'; main.o:/home/you/cpp-ch10/twice/main.cpp:4: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch10/twice"
     }
    ]
   }
  },
  "twice/main.cpp": {
   "src": "// main.cpp\n#include <iostream>\n#include \"specials.h\"\n#include \"menu.h\"\n\nint main() {\n    std::cout << \"Special: item \" << todays_special() << '\\n';\n    std::cout << \"It costs $\" << special_price() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "twice/kitchen.cpp": {
   "src": "// kitchen.cpp\n#include \"specials.h\"\n#include \"menu.h\"\n\nint special_price() {\n    return todays_special() * 2;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "twice/menu.h": {
   "src": "// menu.h\nint special_price();\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "twice_ok.cpp": {
   "src": "// specials.h\n#pragma once\n\nint todays_special();        // a promise: the recipe is in specials.cpp\n",
   "stdout": "Special: item 2\nIt costs $4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp specials.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/twice_ok"
    },
    {
     "cmd": "g++ main.o kitchen.o specials.o -o diner",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/twice_ok"
    },
    {
     "cmd": "./diner",
     "out": "Special: item 2\nIt costs $4\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch10/twice_ok"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Special: item 2\nIt costs $4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp kitchen.cpp specials.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/twice_ok"
     },
     {
      "cmd": "clang++ main.o kitchen.o specials.o -o diner",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/twice_ok"
     },
     {
      "cmd": "./diner",
      "out": "Special: item 2\nIt costs $4\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch10/twice_ok"
     }
    ]
   }
  },
  "twice_ok/specials.cpp": {
   "src": "// specials.cpp: the one and only recipe\n#include \"specials.h\"\n\nint todays_special() {\n    return 2;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
