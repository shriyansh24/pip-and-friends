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
  "workdir": "/home/you/cpp-ch28",
  "versionDifferences": [
   "boss_link.cpp",
   "boss_spot.cpp",
   "cfriend.cpp",
   "clash.cpp",
   "exforgot.cpp",
   "hall.cpp",
   "hdr.cpp",
   "import_std.cpp",
   "leak.cpp",
   "libfirst.cpp",
   "spot_clash.cpp",
   "spot_macro.cpp",
   "tu.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_link.cpp, boss_spot.cpp, cfriend.cpp, clash.cpp, exforgot.cpp, hall.cpp, hdr.cpp, import_std.cpp, leak.cpp, libfirst.cpp, spot_clash.cpp, spot_macro.cpp, tu.cpp."
 },
 "programs": {
  "arrivals.cpp": {
   "src": "#include <iostream>\n#include <string>\n\nstruct Sign {\n    std::string name;\n    explicit Sign(const std::string& n) : name{n} {\n        std::cout << \"put up \" << name << '\\n';\n    }\n    ~Sign() {\n        std::cout << \"take down \" << name << '\\n';\n    }\n};\n\nSign harbor{\"harbor sign\"};  // made first\nSign market{\"market sign\"};  // made second\n\nint main() {\n    std::cout << \"main starts\\n\";\n    Sign park{\"park sign\"};\n    std::cout << \"main ends\\n\";\n}\n",
   "stdout": "put up harbor sign\nput up market sign\nmain starts\nput up park sign\nmain ends\ntake down park sign\ntake down market sign\ntake down harbor sign\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g arrivals.cpp -o arrivals",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./arrivals",
     "out": "put up harbor sign\nput up market sign\nmain starts\nput up park sign\nmain ends\ntake down park sign\ntake down market sign\ntake down harbor sign\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "put up harbor sign\nput up market sign\nmain starts\nput up park sign\nmain ends\ntake down park sign\ntake down market sign\ntake down harbor sign\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g arrivals.cpp -o arrivals",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./arrivals",
      "out": "put up harbor sign\nput up market sign\nmain starts\nput up park sign\nmain ends\ntake down park sign\ntake down market sign\ntake down harbor sign\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "// price.cpp\n#include \"prices.h\"\n\nint read_base() {\n    return 10;                      // pretend this reads a settings file\n}\n\nint base_price() {\n    static int value = read_base(); // made the first time anyone asks\n    return value;\n}\n",
   "stdout": "Soup costs 15 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp menu.cpp price.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_fill"
    },
    {
     "cmd": "g++ main.o menu.o price.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_fill"
    },
    {
     "cmd": "./city",
     "out": "Soup costs 15 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_fill"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Soup costs 15 coins\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp menu.cpp price.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_fill"
     },
     {
      "cmd": "clang++ main.o menu.o price.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_fill"
     },
     {
      "cmd": "./city",
      "out": "Soup costs 15 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_fill"
     }
    ]
   }
  },
  "boss_fill/menu.cpp": {
   "src": "// menu.cpp\n#include \"prices.h\"\n\nint menu_price = base_price() + 5;  // asks: base_price() makes it if needed\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_fill/prices.h": {
   "src": "// prices.h\n#pragma once\n\nint base_price();        // price.cpp: ask, don't peek\nextern int menu_price;   // menu.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_link.cpp": {
   "src": "// park.h\n#ifndef PARK_H\n#define PARK_H\n\nint benches = 8;          // how many benches the park has\n\nint free_benches();       // park.cpp\n\n#endif\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: park.o:/home/you/cpp-ch28/boss_link/park.h:5: multiple definition of `benches'; main.o:/home/you/cpp-ch28/boss_link/park.h:5: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_link"
    },
    {
     "cmd": "g++ main.o park.o -o city",
     "out": "",
     "err": "/usr/bin/ld: park.o:/home/you/cpp-ch28/boss_link/park.h:5: multiple definition of `benches'; main.o:/home/you/cpp-ch28/boss_link/park.h:5: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/boss_link"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: park.o:(.data+0x0): multiple definition of `benches'; main.o:(.data+0x0): first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_link"
     },
     {
      "cmd": "clang++ main.o park.o -o city",
      "out": "",
      "err": "/usr/bin/ld: park.o:(.data+0x0): multiple definition of `benches'; main.o:(.data+0x0): first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/boss_link"
     }
    ]
   }
  },
  "boss_link/main.cpp": {
   "src": "#include <iostream>\n#include \"park.h\"\n\nint main() {\n    std::cout << benches << \" benches, \" << free_benches() << \" free\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_link/park.cpp": {
   "src": "// park.cpp\n#include \"park.h\"\n\nint free_benches() {\n    return benches - 3;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_parsons.cpp": {
   "src": "#ifndef PARK_H\n#define PARK_H\nextern int benches;\ninline int bench_pairs() {\n    return benches / 2;\n}\n#endif\n",
   "stdout": "4 pairs of benches\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_parsons"
    },
    {
     "cmd": "g++ main.o park.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_parsons"
    },
    {
     "cmd": "./city",
     "out": "4 pairs of benches\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_parsons"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4 pairs of benches\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_parsons"
     },
     {
      "cmd": "clang++ main.o park.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_parsons"
     },
     {
      "cmd": "./city",
      "out": "4 pairs of benches\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_parsons"
     }
    ]
   }
  },
  "boss_parsons/park.cpp": {
   "src": "// park.cpp\n#include \"park.h\"\n\nint benches = 9;\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_parsons/main.cpp": {
   "src": "#include <iostream>\n#include \"park.h\"\n\nint main() {\n    std::cout << bench_pairs() << \" pairs of benches\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_spot.cpp": {
   "src": "// tools.cpp\n#include \"tools.h\"\n\nnamespace {\n\nint round_up(int n) {\n    return (n + 9) / 10 * 10;\n}\n\n}  // namespace\n",
   "stdout": "",
   "stderr": "tools.cpp:6:5: warning: ‘int {anonymous}::round_up(int)’ defined but not used [-Wunused-function]\n    6 | int round_up(int n) {\n      |     ^~~~~~~~\n/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/boss_spot/main.cpp:5:(.text+0xe): undefined reference to `round_up(int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp tools.cpp",
     "out": "",
     "err": "tools.cpp:6:5: warning: ‘int {anonymous}::round_up(int)’ defined but not used [-Wunused-function]\n    6 | int round_up(int n) {\n      |     ^~~~~~~~\n",
     "exit": 0,
     "dir": "~/cpp-ch28/boss_spot"
    },
    {
     "cmd": "g++ main.o tools.o -o city",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/boss_spot/main.cpp:5:(.text+0xe): undefined reference to `round_up(int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/boss_spot"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "tools.cpp:6:5: warning: unused function 'round_up' [-Wunused-function]\n    6 | int round_up(int n) {\n      |     ^~~~~~~~\n1 warning generated.\n/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/boss_spot/main.cpp:5:(.text+0xa): undefined reference to `round_up(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp tools.cpp",
      "out": "",
      "err": "tools.cpp:6:5: warning: unused function 'round_up' [-Wunused-function]\n    6 | int round_up(int n) {\n      |     ^~~~~~~~\n1 warning generated.\n",
      "exit": 0,
      "dir": "~/cpp-ch28/boss_spot"
     },
     {
      "cmd": "clang++ main.o tools.o -o city",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/boss_spot/main.cpp:5:(.text+0xa): undefined reference to `round_up(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/boss_spot"
     }
    ]
   }
  },
  "boss_spot/tools.h": {
   "src": "// tools.h\n#pragma once\n\nint round_up(int n);    // to the next multiple of 10\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_spot/main.cpp": {
   "src": "#include <iostream>\n#include \"tools.h\"\n\nint main() {\n    std::cout << round_up(42) << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n\nint city_total = 0;            // global: one for the whole program\n\nint north() {\n    static int visits = 0;     // north's own count, kept between calls\n    ++visits;\n    city_total += 1;\n    return visits;\n}\n\nint south() {\n    static int visits = 10;    // a different variable, also called visits\n    visits += 10;\n    city_total += 2;\n    return visits;\n}\n\nint main() {\n    for (int day = 1; day <= 3; ++day) {\n        int n = north();\n        int s = (day % 2 == 1) ? south() : 0;\n        std::cout << day << ' ' << n << ' ' << s << ' ' << city_total << '\\n';\n    }\n}\n",
   "stdout": "1 1 20 3\n2 2 0 4\n3 3 30 7\n",
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
     "out": "1 1 20 3\n2 2 0 4\n3 3 30 7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 20 3\n2 2 0 4\n3 3 30 7\n",
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
      "out": "1 1 20 3\n2 2 0 4\n3 3 30 7\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "cfriend.cpp": {
   "src": "#include <iostream>\n\nint c_area(int w, int h);              // \"it's in area.c\", says main.cpp\n\nint main() {\n    std::cout << \"Plot: \" << c_area(6, 7) << \" squares\\n\";\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/cfriend/main.cpp:6:(.text+0x34): undefined reference to `c_area(int, int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "gcc -c area.c",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend"
    },
    {
     "cmd": "g++ main.o area.o -o app",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/cfriend/main.cpp:6:(.text+0x34): undefined reference to `c_area(int, int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/cfriend"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/cfriend/main.cpp:6:(.text+0x2a): undefined reference to `c_area(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "gcc -c area.c",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend"
     },
     {
      "cmd": "clang++ main.o area.o -o app",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/cfriend/main.cpp:6:(.text+0x2a): undefined reference to `c_area(int, int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/cfriend"
     }
    ]
   }
  },
  "cfriend/area.c": {
   "src": "/* area.c: written in C, years ago */\nint c_area(int w, int h) {\n    return w * h;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cfriend_ok.cpp": {
   "src": "#include <iostream>\n\nextern \"C\" int c_area(int w, int h);   // \"look for the plain C name\"\n\nint main() {\n    std::cout << \"Plot: \" << c_area(6, 7) << \" squares\\n\";\n}\n",
   "stdout": "Plot: 42 squares\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "gcc -c area.c",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend_ok"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend_ok"
    },
    {
     "cmd": "g++ main.o area.o -o app",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend_ok"
    },
    {
     "cmd": "./app",
     "out": "Plot: 42 squares\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/cfriend_ok"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Plot: 42 squares\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "gcc -c area.c",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend_ok"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend_ok"
     },
     {
      "cmd": "clang++ main.o area.o -o app",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend_ok"
     },
     {
      "cmd": "./app",
      "out": "Plot: 42 squares\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/cfriend_ok"
     }
    ]
   }
  },
  "cfriend_ok/area.c": {
   "src": "/* area.c: written in C, years ago */\nint c_area(int w, int h) {\n    return w * h;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash.cpp": {
   "src": "// harbor.cpp\nint helper() {          // \"my little helper\", thinks harbor.cpp\n    return 5;\n}\n\nint harbor_boats() {\n    return helper() * 2;\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: harbor.o: in function `helper()':\n/home/you/cpp-ch28/clash/harbor.cpp:2: multiple definition of `helper()'; market.o:/home/you/cpp-ch28/clash/market.cpp:2: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash"
    },
    {
     "cmd": "g++ main.o market.o harbor.o -o city",
     "out": "",
     "err": "/usr/bin/ld: harbor.o: in function `helper()':\n/home/you/cpp-ch28/clash/harbor.cpp:2: multiple definition of `helper()'; market.o:/home/you/cpp-ch28/clash/market.cpp:2: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/clash"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: harbor.o: in function `helper()':\n/home/you/cpp-ch28/clash/harbor.cpp:2: multiple definition of `helper()'; market.o:/home/you/cpp-ch28/clash/market.cpp:2: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash"
     },
     {
      "cmd": "clang++ main.o market.o harbor.o -o city",
      "out": "",
      "err": "/usr/bin/ld: harbor.o: in function `helper()':\n/home/you/cpp-ch28/clash/harbor.cpp:2: multiple definition of `helper()'; market.o:/home/you/cpp-ch28/clash/market.cpp:2: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/clash"
     }
    ]
   }
  },
  "clash/market.cpp": {
   "src": "// market.cpp\nint helper() {          // \"my little helper\", thinks market.cpp\n    return 3;\n}\n\nint market_stalls() {\n    return helper() * 4;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash/main.cpp": {
   "src": "#include <iostream>\n\nint market_stalls();   // market.cpp\nint harbor_boats();    // harbor.cpp\n\nint main() {\n    std::cout << market_stalls() << \" stalls, \" << harbor_boats() << \" boats\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash_anon.cpp": {
   "src": "// harbor.cpp\nnamespace {\nint helper() {          // harbor.cpp's helper: local street\n    return 5;\n}\n}  // namespace\n\nint harbor_boats() {\n    return helper() * 2;\n}\n",
   "stdout": "12 stalls, 10 boats\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_anon"
    },
    {
     "cmd": "g++ main.o market.o harbor.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_anon"
    },
    {
     "cmd": "./city",
     "out": "12 stalls, 10 boats\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_anon"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12 stalls, 10 boats\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_anon"
     },
     {
      "cmd": "clang++ main.o market.o harbor.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_anon"
     },
     {
      "cmd": "./city",
      "out": "12 stalls, 10 boats\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_anon"
     }
    ]
   }
  },
  "clash_anon/market.cpp": {
   "src": "// market.cpp\nnamespace {\nint helper() {          // market.cpp's helper: local street\n    return 3;\n}\n}  // namespace\n\nint market_stalls() {\n    return helper() * 4;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash_anon/main.cpp": {
   "src": "#include <iostream>\n\nint market_stalls();   // market.cpp\nint harbor_boats();    // harbor.cpp\n\nint main() {\n    std::cout << market_stalls() << \" stalls, \" << harbor_boats() << \" boats\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash_static.cpp": {
   "src": "// harbor.cpp\nstatic int helper() {   // harbor.cpp's helper: local street\n    return 5;\n}\n\nint harbor_boats() {\n    return helper() * 2;\n}\n",
   "stdout": "12 stalls, 10 boats\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_static"
    },
    {
     "cmd": "g++ main.o market.o harbor.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_static"
    },
    {
     "cmd": "./city",
     "out": "12 stalls, 10 boats\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/clash_static"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "12 stalls, 10 boats\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp market.cpp harbor.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_static"
     },
     {
      "cmd": "clang++ main.o market.o harbor.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_static"
     },
     {
      "cmd": "./city",
      "out": "12 stalls, 10 boats\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/clash_static"
     }
    ]
   }
  },
  "clash_static/market.cpp": {
   "src": "// market.cpp\nstatic int helper() {   // market.cpp's helper: local street\n    return 3;\n}\n\nint market_stalls() {\n    return helper() * 4;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "clash_static/main.cpp": {
   "src": "#include <iostream>\n\nint market_stalls();   // market.cpp\nint harbor_boats();    // harbor.cpp\n\nint main() {\n    std::cout << market_stalls() << \" stalls, \" << harbor_boats() << \" boats\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "debug_flag.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int lamps = 12;\n#ifdef CITY_DEBUG\n    std::cerr << \"[debug] lamps = \" << lamps << '\\n';\n#endif\n    std::cout << \"The street has \" << lamps << \" lamps\\n\";\n}\n",
   "stdout": "The street has 12 lamps\n",
   "stderr": "[debug] lamps = 12\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g debug_flag.cpp -o debug_flag",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./debug_flag",
     "out": "The street has 12 lamps\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -DCITY_DEBUG debug_flag.cpp -o debug_flag",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./debug_flag",
     "out": "The street has 12 lamps\n",
     "err": "[debug] lamps = 12\n",
     "exit": 0,
     "merged": "[debug] lamps = 12\nThe street has 12 lamps\n"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "The street has 12 lamps\n",
    "stderr": "[debug] lamps = 12\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g debug_flag.cpp -o debug_flag",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./debug_flag",
      "out": "The street has 12 lamps\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -DCITY_DEBUG debug_flag.cpp -o debug_flag",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./debug_flag",
      "out": "The street has 12 lamps\n",
      "err": "[debug] lamps = 12\n",
      "exit": 0,
      "merged": "[debug] lamps = 12\nThe street has 12 lamps\n"
     }
    ]
   }
  },
  "demangle.cpp": {
   "src": "// Every definition here gets a city-wide address: its mangled name.\nint area(int w, int h) { return w * h; }\ndouble area(double w, double h) { return w * h; }\n\nnamespace shop {\nint price(int item) { return item * 3; }\n}\n\nstruct Gate {\n    void open(bool wide);\n};\nvoid Gate::open(bool) {}\n\nextern \"C\" int c_area(int w, int h) { return w * h; }\n",
   "stdout": "area(double, double)\narea(int, int)\nGate::open(bool)\nshop::price(int)\nc_area\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c demangle.cpp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm -j demangle.o | c++filt",
     "out": "area(double, double)\narea(int, int)\nGate::open(bool)\nshop::price(int)\nc_area\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "area(double, double)\narea(int, int)\nGate::open(bool)\nshop::price(int)\nc_area\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c demangle.cpp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm -j demangle.o | c++filt",
      "out": "area(double, double)\narea(int, int)\nGate::open(bool)\nshop::price(int)\nc_area\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "exforgot.cpp": {
   "src": "// city.h\n#pragma once\n\nextern int population;            // a promise: \"it exists, somewhere\"\n\nvoid welcome(int newcomers);      // census.cpp\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: census.o: warning: relocation against `population' in read-only section `.text'\n/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/exforgot/main.cpp:6:(.text+0x30): undefined reference to `population'\n/usr/bin/ld: census.o: in function `welcome(int)':\n/home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0xd): undefined reference to `population'\n/usr/bin/ld: /home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0x18): undefined reference to `population'\n/usr/bin/ld: warning: creating DT_TEXTREL in a PIE\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp census.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/exforgot"
    },
    {
     "cmd": "g++ main.o census.o -o city",
     "out": "",
     "err": "/usr/bin/ld: census.o: warning: relocation against `population' in read-only section `.text'\n/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/exforgot/main.cpp:6:(.text+0x30): undefined reference to `population'\n/usr/bin/ld: census.o: in function `welcome(int)':\n/home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0xd): undefined reference to `population'\n/usr/bin/ld: /home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0x18): undefined reference to `population'\n/usr/bin/ld: warning: creating DT_TEXTREL in a PIE\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/exforgot"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/exforgot/main.cpp:6:(.text+0x27): undefined reference to `population'\n/usr/bin/ld: census.o: in function `welcome(int)':\n/home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0xd): undefined reference to `population'\n/usr/bin/ld: /home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0x16): undefined reference to `population'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp census.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/exforgot"
     },
     {
      "cmd": "clang++ main.o census.o -o city",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/exforgot/main.cpp:6:(.text+0x27): undefined reference to `population'\n/usr/bin/ld: census.o: in function `welcome(int)':\n/home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0xd): undefined reference to `population'\n/usr/bin/ld: /home/you/cpp-ch28/exforgot/census.cpp:5:(.text+0x16): undefined reference to `population'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/exforgot"
     }
    ]
   }
  },
  "exforgot/census.cpp": {
   "src": "// census.cpp: someone deleted the definition line\n#include \"city.h\"\n\nvoid welcome(int newcomers) {\n    population += newcomers;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "exforgot/main.cpp": {
   "src": "#include <iostream>\n#include \"city.h\"\n\nint main() {\n    welcome(34);\n    std::cout << \"Population: \" << population << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "expand.cpp": {
   "src": "#define SQUARE(x) x * x\n#define LAMPS 12\n\nint main() {\n    int a = SQUARE(1 + 2);\n    int b = LAMPS;\n    return a + b;\n}\n",
   "stdout": "int main() {\n    int a = 1 + 2 * 1 + 2;\n    int b = 12;\n    return a + b;\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -E -P expand.cpp",
     "out": "int main() {\n    int a = 1 + 2 * 1 + 2;\n    int b = 12;\n    return a + b;\n}\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "int main() {\n    int a = 1 + 2 * 1 + 2;\n    int b = 12;\n    return a + b;\n}\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -E -P expand.cpp",
      "out": "int main() {\n    int a = 1 + 2 * 1 + 2;\n    int b = 12;\n    return a + b;\n}\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_extern.cpp": {
   "src": "// city.h\n#pragma once\n\nextern int population;            // a promise: \"it exists, somewhere\"\n\nvoid welcome(int newcomers);      // census.cpp\n",
   "stdout": "Population: 1234\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp census.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/fill_extern"
    },
    {
     "cmd": "g++ main.o census.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/fill_extern"
    },
    {
     "cmd": "./city",
     "out": "Population: 1234\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/fill_extern"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Population: 1234\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp census.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/fill_extern"
     },
     {
      "cmd": "clang++ main.o census.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/fill_extern"
     },
     {
      "cmd": "./city",
      "out": "Population: 1234\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/fill_extern"
     }
    ]
   }
  },
  "fill_extern/census.cpp": {
   "src": "// census.cpp\n#include \"city.h\"\n\nint population = 1200;            // the one definition: memory lives here\n\nvoid welcome(int newcomers) {\n    population += newcomers;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_extern/main.cpp": {
   "src": "#include <iostream>\n#include \"city.h\"\n\nint main() {\n    welcome(34);\n    std::cout << \"Population: \" << population << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_ifndef.cpp": {
   "src": "#include <iostream>\n\nint main() {\n    int gates = 3;\n#ifndef QUIET\n    std::cout << \"Opening \" << gates << \" gates...\\n\";\n#endif\n    std::cout << \"Gates open: \" << gates << '\\n';\n}\n",
   "stdout": "Opening 3 gates...\nGates open: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_ifndef.cpp -o fill_ifndef",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_ifndef",
     "out": "Opening 3 gates...\nGates open: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Opening 3 gates...\nGates open: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_ifndef.cpp -o fill_ifndef",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_ifndef",
      "out": "Opening 3 gates...\nGates open: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "hall.cpp": {
   "src": "// hall.cpp: one neighbourhood of the city\nint visitors = 0;               // city-wide: other files may use it\nstatic int doors = 4;           // local: only this file can see it\n\nint ring_bell();                // promised here, defined somewhere else\n\nstatic int count_doors() {      // local street\n    return doors;\n}\n\nint open_hall() {               // city-wide address\n    ++visitors;\n    return count_doors() + ring_bell();\n}\n",
   "stdout": "0000000000000010 T open_hall()\n                 U ring_bell()\n0000000000000000 t count_doors()\n0000000000000000 d doors\n0000000000000000 B visitors\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c hall.cpp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm -C hall.o",
     "out": "0000000000000010 T open_hall()\n                 U ring_bell()\n0000000000000000 t count_doors()\n0000000000000000 d doors\n0000000000000000 B visitors\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0000000000000000 T open_hall()\n                 U ring_bell()\n0000000000000040 t count_doors()\n0000000000000000 d doors\n0000000000000000 B visitors\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c hall.cpp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm -C hall.o",
      "out": "0000000000000000 T open_hall()\n                 U ring_bell()\n0000000000000040 t count_doors()\n0000000000000000 d doors\n0000000000000000 B visitors\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "hdr.cpp": {
   "src": "// tools.h\n#ifndef TOOLS_H\n#define TOOLS_H\n\nint helper() {          // a whole body in a header...\n    return 42;\n}\n\nint gate_code();        // gate.cpp\n\n#endif\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: gate.o: in function `helper()':\n/home/you/cpp-ch28/hdr/gate.cpp:5: multiple definition of `helper()'; main.o:/home/you/cpp-ch28/hdr/main.cpp:5: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp gate.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/hdr"
    },
    {
     "cmd": "g++ main.o gate.o -o city",
     "out": "",
     "err": "/usr/bin/ld: gate.o: in function `helper()':\n/home/you/cpp-ch28/hdr/gate.cpp:5: multiple definition of `helper()'; main.o:/home/you/cpp-ch28/hdr/main.cpp:5: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/hdr"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: gate.o: in function `helper()':\n/home/you/cpp-ch28/hdr/gate.cpp:5: multiple definition of `helper()'; main.o:/home/you/cpp-ch28/hdr/main.cpp:5: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp gate.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/hdr"
     },
     {
      "cmd": "clang++ main.o gate.o -o city",
      "out": "",
      "err": "/usr/bin/ld: gate.o: in function `helper()':\n/home/you/cpp-ch28/hdr/gate.cpp:5: multiple definition of `helper()'; main.o:/home/you/cpp-ch28/hdr/main.cpp:5: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/hdr"
     }
    ]
   }
  },
  "hdr/main.cpp": {
   "src": "#include <iostream>\n#include \"tools.h\"\n\nint main() {\n    std::cout << \"helper says \" << helper() << \", gate code \" << gate_code() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "hdr/gate.cpp": {
   "src": "// gate.cpp\n#include \"tools.h\"\n\nint gate_code() {\n    return helper() + 1;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "hdr_inline.cpp": {
   "src": "// tools.h\n#ifndef TOOLS_H\n#define TOOLS_H\n\ninline int helper() {   // inline: \"identical copies are fine\"\n    return 42;\n}\n\nint gate_code();        // gate.cpp\n\n#endif\n",
   "stdout": "helper says 42, gate code 43\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp gate.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/hdr_inline"
    },
    {
     "cmd": "nm -C main.o gate.o | grep helper",
     "out": "0000000000000000 W helper()\n0000000000000000 W helper()\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/hdr_inline"
    },
    {
     "cmd": "g++ main.o gate.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/hdr_inline"
    },
    {
     "cmd": "./city",
     "out": "helper says 42, gate code 43\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/hdr_inline"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "helper says 42, gate code 43\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp gate.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/hdr_inline"
     },
     {
      "cmd": "nm -C main.o gate.o | grep helper",
      "out": "0000000000000000 W helper()\n0000000000000000 W helper()\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/hdr_inline"
     },
     {
      "cmd": "clang++ main.o gate.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/hdr_inline"
     },
     {
      "cmd": "./city",
      "out": "helper says 42, gate code 43\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/hdr_inline"
     }
    ]
   }
  },
  "hdr_inline/main.cpp": {
   "src": "#include <iostream>\n#include \"tools.h\"\n\nint main() {\n    std::cout << \"helper says \" << helper() << \", gate code \" << gate_code() << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "hdr_inline/gate.cpp": {
   "src": "// gate.cpp\n#include \"tools.h\"\n\nint gate_code() {\n    return helper() + 1;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "import_std.cpp": {
   "src": "import std;              // C++23: the whole standard library as one module\n\nint main() {\n    std::cout << \"Hello from a module!\\n\";\n}\n",
   "stdout": "",
   "stderr": "import_std.cpp:1:1: error: ‘import’ does not name a type\n    1 | import std;              // C++23: the whole standard library as one module\n      | ^~~~~~\nimport_std.cpp:1:1: note: C++20 ‘import’ only available with ‘-fmodules-ts’, which is not yet enabled with ‘-std=c++20’\nimport_std.cpp: In function ‘int main()’:\nimport_std.cpp:4:10: error: ‘cout’ is not a member of ‘std’\n    4 |     std::cout << \"Hello from a module!\\n\";\n      |          ^~~~\nimport_std.cpp:1:1: note: ‘std::cout’ is defined in header ‘<iostream>’; did you forget to ‘#include <iostream>’?\n  +++ |+#include <iostream>\n    1 | import std;              // C++23: the whole standard library as one module\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g import_std.cpp -o import_std",
     "out": "",
     "err": "import_std.cpp:1:1: error: ‘import’ does not name a type\n    1 | import std;              // C++23: the whole standard library as one module\n      | ^~~~~~\nimport_std.cpp:1:1: note: C++20 ‘import’ only available with ‘-fmodules-ts’, which is not yet enabled with ‘-std=c++20’\nimport_std.cpp: In function ‘int main()’:\nimport_std.cpp:4:10: error: ‘cout’ is not a member of ‘std’\n    4 |     std::cout << \"Hello from a module!\\n\";\n      |          ^~~~\nimport_std.cpp:1:1: note: ‘std::cout’ is defined in header ‘<iostream>’; did you forget to ‘#include <iostream>’?\n  +++ |+#include <iostream>\n    1 | import std;              // C++23: the whole standard library as one module\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "import_std.cpp:1:8: fatal error: module 'std' not found\n    1 | import std;              // C++23: the whole standard library as one module\n      | ~~~~~~~^~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g import_std.cpp -o import_std",
      "out": "",
      "err": "import_std.cpp:1:8: fatal error: module 'std' not found\n    1 | import std;              // C++23: the whole standard library as one module\n      | ~~~~~~~^~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "leak.cpp": {
   "src": "#include <iostream>\n#include \"gauge.h\"\n\nnamespace shop {\nconst int MAX = 50;   // the most items in one order\n}\n\nint main() {\n    std::cout << \"Orders up to \" << shop::MAX << \" items\\n\";\n}\n",
   "stdout": "",
   "stderr": "In file included from main.cpp:2:\ngauge.h:4:13: error: expected unqualified-id before numeric constant\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^~~\nmain.cpp:5:11: note: in expansion of macro ‘MAX’\n    5 | const int MAX = 50;   // the most items in one order\n      |           ^~~\nmain.cpp: In function ‘int main()’:\ngauge.h:4:13: error: expected unqualified-id before numeric constant\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^~~\nmain.cpp:9:43: note: in expansion of macro ‘MAX’\n    9 |     std::cout << \"Orders up to \" << shop::MAX << \" items\\n\";\n      |                                           ^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "In file included from main.cpp:2:\ngauge.h:4:13: error: expected unqualified-id before numeric constant\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^~~\nmain.cpp:5:11: note: in expansion of macro ‘MAX’\n    5 | const int MAX = 50;   // the most items in one order\n      |           ^~~\nmain.cpp: In function ‘int main()’:\ngauge.h:4:13: error: expected unqualified-id before numeric constant\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^~~\nmain.cpp:9:43: note: in expansion of macro ‘MAX’\n    9 |     std::cout << \"Orders up to \" << shop::MAX << \" items\\n\";\n      |                                           ^~~\n",
     "exit": 1,
     "dir": "~/cpp-ch28/leak"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "main.cpp:5:11: error: expected unqualified-id\n    5 | const int MAX = 50;   // the most items in one order\n      |           ^\n./gauge.h:4:13: note: expanded from macro 'MAX'\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^\nmain.cpp:9:43: error: expected unqualified-id\n    9 |     std::cout << \"Orders up to \" << shop::MAX << \" items\\n\";\n      |                                           ^\n./gauge.h:4:13: note: expanded from macro 'MAX'\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "main.cpp:5:11: error: expected unqualified-id\n    5 | const int MAX = 50;   // the most items in one order\n      |           ^\n./gauge.h:4:13: note: expanded from macro 'MAX'\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^\nmain.cpp:9:43: error: expected unqualified-id\n    9 |     std::cout << \"Orders up to \" << shop::MAX << \" items\\n\";\n      |                                           ^\n./gauge.h:4:13: note: expanded from macro 'MAX'\n    4 | #define MAX 100       // the highest reading a gauge can show\n      |             ^\n2 errors generated.\n",
      "exit": 1,
      "dir": "~/cpp-ch28/leak"
     }
    ]
   }
  },
  "leak/gauge.h": {
   "src": "// gauge.h, from the water company\n#pragma once\n\n#define MAX 100       // the highest reading a gauge can show\n\nint read_gauge();\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "libfirst.cpp": {
   "src": "#include <iostream>\n#include \"shop.h\"\n\nint main() {\n    int cents = with_tax(price_of(2));\n    std::cout << \"Total: \" << cents << \" cents\\n\";\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x12): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x19): undefined reference to `with_tax(int)'\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp tax.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/libfirst"
    },
    {
     "cmd": "ar rcs libshop.a price.o tax.o",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/libfirst"
    },
    {
     "cmd": "g++ -L. -lshop main.o -o shop",
     "out": "",
     "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x12): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x19): undefined reference to `with_tax(int)'\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/libfirst"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0xe): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x15): undefined reference to `with_tax(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp tax.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/libfirst"
     },
     {
      "cmd": "ar rcs libshop.a price.o tax.o",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/libfirst"
     },
     {
      "cmd": "clang++ -L. -lshop main.o -o shop",
      "out": "",
      "err": "/usr/bin/ld: main.o: in function `main':\n/home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0xe): undefined reference to `price_of(int)'\n/usr/bin/ld: /home/you/cpp-ch28/libfirst/main.cpp:5:(.text+0x15): undefined reference to `with_tax(int)'\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/libfirst"
     }
    ]
   }
  },
  "mangle.cpp": {
   "src": "// Every definition here gets a city-wide address: its mangled name.\nint area(int w, int h) { return w * h; }\ndouble area(double w, double h) { return w * h; }\n\nnamespace shop {\nint price(int item) { return item * 3; }\n}\n\nstruct Gate {\n    void open(bool wide);\n};\nvoid Gate::open(bool) {}\n\nextern \"C\" int c_area(int w, int h) { return w * h; }\n",
   "stdout": "_Z4areadd\n_Z4areaii\n_ZN4Gate4openEb\n_ZN4shop5priceEi\nc_area\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c mangle.cpp",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "nm -j mangle.o",
     "out": "_Z4areadd\n_Z4areaii\n_ZN4Gate4openEb\n_ZN4shop5priceEi\nc_area\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "_Z4areadd\n_Z4areaii\n_ZN4Gate4openEb\n_ZN4shop5priceEi\nc_area\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c mangle.cpp",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "nm -j mangle.o",
      "out": "_Z4areadd\n_Z4areaii\n_ZN4Gate4openEb\n_ZN4shop5priceEi\nc_area\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "order_ab.cpp": {
   "src": "// menu.cpp\n#include \"prices.h\"\n\nint menu_price = base_price + 5;    // needs base_price to be ready\n",
   "stdout": "Soup costs 15 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    },
    {
     "cmd": "g++ main.o price.o menu.o -o city_ab",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    },
    {
     "cmd": "./city_ab",
     "out": "Soup costs 15 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Soup costs 15 coins\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     },
     {
      "cmd": "clang++ main.o price.o menu.o -o city_ab",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     },
     {
      "cmd": "./city_ab",
      "out": "Soup costs 15 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     }
    ]
   }
  },
  "order/price.cpp": {
   "src": "// price.cpp\n#include \"prices.h\"\n\nint read_base() {\n    return 10;                      // pretend this reads a settings file\n}\n\nint base_price = read_base();       // set while the program starts up\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "order/prices.h": {
   "src": "// prices.h\n#pragma once\n\nextern int base_price;   // price.cpp\nextern int menu_price;   // menu.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "order/main.cpp": {
   "src": "#include <iostream>\n#include \"prices.h\"\n\nint main() {\n    std::cout << \"Soup costs \" << menu_price << \" coins\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "order_ba.cpp": {
   "src": "// menu.cpp\n#include \"prices.h\"\n\nint menu_price = base_price + 5;    // needs base_price to be ready\n",
   "stdout": "Soup costs 5 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    },
    {
     "cmd": "g++ main.o menu.o price.o -o city_ba",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    },
    {
     "cmd": "./city_ba",
     "out": "Soup costs 5 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Soup costs 5 coins\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     },
     {
      "cmd": "clang++ main.o menu.o price.o -o city_ba",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     },
     {
      "cmd": "./city_ba",
      "out": "Soup costs 5 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order"
     }
    ]
   }
  },
  "order_fixed.cpp": {
   "src": "// menu.cpp\n#include \"prices.h\"\n\nint menu_price = base_price() + 5;  // asks: base_price() makes it if needed\n",
   "stdout": "Soup costs 15 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order_fixed"
    },
    {
     "cmd": "g++ main.o price.o menu.o -o city_ab",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order_fixed"
    },
    {
     "cmd": "g++ main.o menu.o price.o -o city_ba",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order_fixed"
    },
    {
     "cmd": "./city_ab",
     "out": "Soup costs 15 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order_fixed"
    },
    {
     "cmd": "./city_ba",
     "out": "Soup costs 15 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/order_fixed"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Soup costs 15 coins\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp price.cpp menu.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order_fixed"
     },
     {
      "cmd": "clang++ main.o price.o menu.o -o city_ab",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order_fixed"
     },
     {
      "cmd": "clang++ main.o menu.o price.o -o city_ba",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order_fixed"
     },
     {
      "cmd": "./city_ab",
      "out": "Soup costs 15 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order_fixed"
     },
     {
      "cmd": "./city_ba",
      "out": "Soup costs 15 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/order_fixed"
     }
    ]
   }
  },
  "order_fixed/price.cpp": {
   "src": "// price.cpp\n#include \"prices.h\"\n\nint read_base() {\n    return 10;                      // pretend this reads a settings file\n}\n\nint base_price() {\n    static int value = read_base(); // made the first time anyone asks\n    return value;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "order_fixed/prices.h": {
   "src": "// prices.h\n#pragma once\n\nint base_price();        // price.cpp: ask, don't peek\nextern int menu_price;   // menu.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "parsons_firstuse.cpp": {
   "src": "#include \"prices.h\"\n\nint read_base() {\n    return 10;                      // pretend this reads a settings file\n}\n\nint base_price() {\n    static int value = read_base(); // made the first time anyone asks\n    return value;\n}\n",
   "stdout": "Soup costs 15 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp menu.cpp price.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/parsons_firstuse"
    },
    {
     "cmd": "g++ main.o menu.o price.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/parsons_firstuse"
    },
    {
     "cmd": "./city",
     "out": "Soup costs 15 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/parsons_firstuse"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Soup costs 15 coins\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp menu.cpp price.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/parsons_firstuse"
     },
     {
      "cmd": "clang++ main.o menu.o price.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/parsons_firstuse"
     },
     {
      "cmd": "./city",
      "out": "Soup costs 15 coins\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/parsons_firstuse"
     }
    ]
   }
  },
  "parsons_firstuse/menu.cpp": {
   "src": "// menu.cpp\n#include \"prices.h\"\n\nint menu_price = base_price() + 5;  // asks: base_price() makes it if needed\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "rpathlib.cpp": {
   "src": "#include <iostream>\n#include \"shop.h\"\n\nint main() {\n    int cents = with_tax(price_of(2));\n    std::cout << \"Total: \" << cents << \" cents\\n\";\n}\n",
   "stdout": "Total: 495 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    },
    {
     "cmd": "g++ -shared -o libshop.so price.o tax.o",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    },
    {
     "cmd": "g++ main.o -L. -lshop -Wl,-rpath,'$ORIGIN' -o shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    },
    {
     "cmd": "readelf -d shop | grep RUNPATH",
     "out": " 0x000000000000001d (RUNPATH)            Library runpath: [$ORIGIN]\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    },
    {
     "cmd": "./shop",
     "out": "Total: 495 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/rpath"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total: 495 cents\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     },
     {
      "cmd": "clang++ -shared -o libshop.so price.o tax.o",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     },
     {
      "cmd": "clang++ main.o -L. -lshop -Wl,-rpath,'$ORIGIN' -o shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     },
     {
      "cmd": "readelf -d shop | grep RUNPATH",
      "out": " 0x000000000000001d (RUNPATH)            Library runpath: [$ORIGIN]\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     },
     {
      "cmd": "./shop",
      "out": "Total: 495 cents\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/rpath"
     }
    ]
   }
  },
  "sharedlib.cpp": {
   "src": "#include <iostream>\n#include \"shop.h\"\n\nint main() {\n    int cents = with_tax(price_of(2));\n    std::cout << \"Total: \" << cents << \" cents\\n\";\n}\n",
   "stdout": "Total: 495 cents\n",
   "stderr": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ -shared -o libshop.so price.o tax.o",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ main.o -L. -lshop -o shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "./shop",
     "out": "",
     "err": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
     "exit": 127,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "LD_LIBRARY_PATH=. ./shop",
     "out": "Total: 495 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total: 495 cents\n",
    "stderr": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ -shared -o libshop.so price.o tax.o",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ main.o -L. -lshop -o shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "./shop",
      "out": "",
      "err": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
      "exit": 127,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "LD_LIBRARY_PATH=. ./shop",
      "out": "Total: 495 cents\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     }
    ]
   }
  },
  "sharedlib_missing.cpp": {
   "src": "#include <iostream>\n#include \"shop.h\"\n\nint main() {\n    int cents = with_tax(price_of(2));\n    std::cout << \"Total: \" << cents << \" cents\\n\";\n}\n",
   "stdout": "",
   "stderr": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
   "exit": 127,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ -shared -o libshop.so price.o tax.o",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "g++ main.o -L. -lshop -o shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shared"
    },
    {
     "cmd": "./shop",
     "out": "",
     "err": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
     "exit": 127,
     "dir": "~/cpp-ch28/shared"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
    "exit": 127,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fPIC -c price.cpp tax.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ -shared -o libshop.so price.o tax.o",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "clang++ main.o -L. -lshop -o shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shared"
     },
     {
      "cmd": "./shop",
      "out": "",
      "err": "./shop: error while loading shared libraries: libshop.so: cannot open shared object file: No such file or directory\n",
      "exit": 127,
      "dir": "~/cpp-ch28/shared"
     }
    ]
   }
  },
  "spot_clash.cpp": {
   "src": "// park.cpp\n#include \"park.h\"\n\nstatic int lamp_count() {\n    return 12;\n}\n\nint tidy(int n) {          // round down to a multiple of 5\n    return n - n % 5;\n}\n\nint park_lamps() {\n    return tidy(lamp_count() + 3);\n}\n",
   "stdout": "",
   "stderr": "/usr/bin/ld: zoo.o: in function `tidy(int)':\n/home/you/cpp-ch28/spot_clash/zoo.cpp:4: multiple definition of `tidy(int)'; park.o:/home/you/cpp-ch28/spot_clash/park.cpp:8: first defined here\ncollect2: error: ld returned 1 exit status\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp zoo.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/spot_clash"
    },
    {
     "cmd": "g++ main.o park.o zoo.o -o city",
     "out": "",
     "err": "/usr/bin/ld: zoo.o: in function `tidy(int)':\n/home/you/cpp-ch28/spot_clash/zoo.cpp:4: multiple definition of `tidy(int)'; park.o:/home/you/cpp-ch28/spot_clash/park.cpp:8: first defined here\ncollect2: error: ld returned 1 exit status\n",
     "exit": 1,
     "dir": "~/cpp-ch28/spot_clash"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "/usr/bin/ld: zoo.o: in function `tidy(int)':\n/home/you/cpp-ch28/spot_clash/zoo.cpp:4: multiple definition of `tidy(int)'; park.o:/home/you/cpp-ch28/spot_clash/park.cpp:8: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp park.cpp zoo.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/spot_clash"
     },
     {
      "cmd": "clang++ main.o park.o zoo.o -o city",
      "out": "",
      "err": "/usr/bin/ld: zoo.o: in function `tidy(int)':\n/home/you/cpp-ch28/spot_clash/zoo.cpp:4: multiple definition of `tidy(int)'; park.o:/home/you/cpp-ch28/spot_clash/park.cpp:8: first defined here\nclang++: error: linker command failed with exit code 1 (use -v to see invocation)\n",
      "exit": 1,
      "dir": "~/cpp-ch28/spot_clash"
     }
    ]
   }
  },
  "spot_clash/zoo.cpp": {
   "src": "// zoo.cpp\n#include \"park.h\"\n\nint tidy(int n) {          // round down to a multiple of 4\n    return n - n % 4;\n}\n\nint zoo_gates() {\n    return tidy(7);\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "spot_clash/park.h": {
   "src": "#pragma once\n\nint park_lamps();   // park.cpp\nint zoo_gates();    // zoo.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "spot_clash/main.cpp": {
   "src": "#include <iostream>\n#include \"park.h\"\n\nint main() {\n    std::cout << park_lamps() << \" lamps, \" << zoo_gates() << \" gates\\n\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "spot_macro.cpp": {
   "src": "#include <iostream>\n#include <string>\n\n#define size 3             // how many lamps per street\n\nint main() {\n    std::string street = \"Mill Lane\";\n    std::cout << street << \" has \" << street.size() << \" letters\\n\";\n    std::cout << \"and \" << size << \" lamps\\n\";\n}\n",
   "stdout": "",
   "stderr": "spot_macro.cpp: In function ‘int main()’:\nspot_macro.cpp:4:14: error: expected unqualified-id before numeric constant\n    4 | #define size 3             // how many lamps per street\n      |              ^\nspot_macro.cpp:8:46: note: in expansion of macro ‘size’\n    8 |     std::cout << street << \" has \" << street.size() << \" letters\\n\";\n      |                                              ^~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_macro.cpp -o spot_macro",
     "out": "",
     "err": "spot_macro.cpp: In function ‘int main()’:\nspot_macro.cpp:4:14: error: expected unqualified-id before numeric constant\n    4 | #define size 3             // how many lamps per street\n      |              ^\nspot_macro.cpp:8:46: note: in expansion of macro ‘size’\n    8 |     std::cout << street << \" has \" << street.size() << \" letters\\n\";\n      |                                              ^~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_macro.cpp:8:46: error: expected unqualified-id\n    8 |     std::cout << street << \" has \" << street.size() << \" letters\\n\";\n      |                                              ^\nspot_macro.cpp:4:14: note: expanded from macro 'size'\n    4 | #define size 3             // how many lamps per street\n      |              ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_macro.cpp -o spot_macro",
      "out": "",
      "err": "spot_macro.cpp:8:46: error: expected unqualified-id\n    8 |     std::cout << street << \" has \" << street.size() << \" letters\\n\";\n      |                                              ^\nspot_macro.cpp:4:14: note: expanded from macro 'size'\n    4 | #define size 3             // how many lamps per street\n      |              ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "square_macro.cpp": {
   "src": "#include <iostream>\n\n#define SQUARE(x) x * x            // a macro: pasted as text\n\nconstexpr int square(int x) {      // a function: works on values\n    return x * x;\n}\n\nint main() {\n    std::cout << SQUARE(3) << ' ' << square(3) << '\\n';\n    std::cout << SQUARE(1 + 2) << ' ' << square(1 + 2) << '\\n';\n}\n",
   "stdout": "9 9\n5 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g square_macro.cpp -o square_macro",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./square_macro",
     "out": "9 9\n5 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "9 9\n5 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g square_macro.cpp -o square_macro",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./square_macro",
      "out": "9 9\n5 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "staticlib.cpp": {
   "src": "#include <iostream>\n#include \"shop.h\"\n\nint main() {\n    int cents = with_tax(price_of(2));\n    std::cout << \"Total: \" << cents << \" cents\\n\";\n}\n",
   "stdout": "Total: 495 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c price.cpp tax.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    },
    {
     "cmd": "ar rcs libshop.a price.o tax.o",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    },
    {
     "cmd": "ar t libshop.a",
     "out": "price.o\ntax.o\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    },
    {
     "cmd": "g++ main.o -L. -lshop -o shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    },
    {
     "cmd": "./shop",
     "out": "Total: 495 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/shop"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total: 495 cents\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c price.cpp tax.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     },
     {
      "cmd": "ar rcs libshop.a price.o tax.o",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     },
     {
      "cmd": "ar t libshop.a",
      "out": "price.o\ntax.o\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     },
     {
      "cmd": "clang++ main.o -L. -lshop -o shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     },
     {
      "cmd": "./shop",
      "out": "Total: 495 cents\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/shop"
     }
    ]
   }
  },
  "shop/shop.h": {
   "src": "// shop.h\n#pragma once\n\nint price_of(int item);      // price.cpp\nint with_tax(int cents);     // tax.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shop/price.cpp": {
   "src": "// price.cpp\n#include \"shop.h\"\n\nint price_of(int item) {\n    return 250 + item * 100;     // in cents\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shop/tax.cpp": {
   "src": "// tax.cpp\n#include \"shop.h\"\n\nint with_tax(int cents) {\n    return cents + cents / 10;   // the city adds 10%\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "swap.cpp": {
   "src": "// tax_v2.cpp: the city council raised the tax\n#include \"shop.h\"\n\nint with_tax(int cents) {\n    return cents + cents / 5;    // now 20%\n}\n",
   "stdout": "Total: 540 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fPIC -shared price.cpp tax.cpp -o libshop.so",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/swap"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g main.cpp -L. -lshop -Wl,-rpath,'$ORIGIN' -o shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/swap"
    },
    {
     "cmd": "./shop",
     "out": "Total: 495 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/swap"
    },
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fPIC -shared price.cpp tax_v2.cpp -o libshop.so",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/swap"
    },
    {
     "cmd": "./shop",
     "out": "Total: 540 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/swap"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Total: 540 cents\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fPIC -shared price.cpp tax.cpp -o libshop.so",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/swap"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g main.cpp -L. -lshop -Wl,-rpath,'$ORIGIN' -o shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/swap"
     },
     {
      "cmd": "./shop",
      "out": "Total: 495 cents\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/swap"
     },
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -fPIC -shared price.cpp tax_v2.cpp -o libshop.so",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/swap"
     },
     {
      "cmd": "./shop",
      "out": "Total: 540 cents\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/swap"
     }
    ]
   }
  },
  "swap/tax.cpp": {
   "src": "// tax.cpp\n#include \"shop.h\"\n\nint with_tax(int cents) {\n    return cents + cents / 10;   // the city adds 10%\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tickets.cpp": {
   "src": "// tickets.h\n#pragma once\n\ninline int next_ticket = 1;   // C++17: ONE roll, shared by every file\n\ninline int take_ticket() {\n    return next_ticket++;\n}\n\nint booth_ticket();            // booth.cpp\n",
   "stdout": "1 2 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp booth.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets"
    },
    {
     "cmd": "g++ main.o booth.o -o tickets",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets"
    },
    {
     "cmd": "./tickets",
     "out": "1 2 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 2 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp booth.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets"
     },
     {
      "cmd": "clang++ main.o booth.o -o tickets",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets"
     },
     {
      "cmd": "./tickets",
      "out": "1 2 3\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets"
     }
    ]
   }
  },
  "tickets/main.cpp": {
   "src": "#include <iostream>\n#include \"tickets.h\"\n\nint main() {\n    int a = take_ticket();\n    int b = booth_ticket();\n    int c = take_ticket();\n    std::cout << a << ' ' << b << ' ' << c << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tickets/booth.cpp": {
   "src": "// booth.cpp: the ticket booth by the gate\n#include \"tickets.h\"\n\nint booth_ticket() {\n    return take_ticket();\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tickets_static.cpp": {
   "src": "// tickets.h\n#pragma once\n\nstatic int next_ticket = 1;   // static: every file gets its OWN roll\n\nstatic int take_ticket() {\n    return next_ticket++;\n}\n\nint booth_ticket();            // booth.cpp\n",
   "stdout": "1 1 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp booth.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets_static"
    },
    {
     "cmd": "g++ main.o booth.o -o tickets",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets_static"
    },
    {
     "cmd": "./tickets",
     "out": "1 1 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tickets_static"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 1 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp booth.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets_static"
     },
     {
      "cmd": "clang++ main.o booth.o -o tickets",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets_static"
     },
     {
      "cmd": "./tickets",
      "out": "1 1 2\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tickets_static"
     }
    ]
   }
  },
  "tickets_static/main.cpp": {
   "src": "#include <iostream>\n#include \"tickets.h\"\n\nint main() {\n    int a = take_ticket();\n    int b = booth_ticket();\n    int c = take_ticket();\n    std::cout << a << ' ' << b << ' ' << c << '\\n';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tickets_static/booth.cpp": {
   "src": "// booth.cpp: the ticket booth by the gate\n#include \"tickets.h\"\n\nint booth_ticket() {\n    return take_ticket();\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "towns.cpp": {
   "src": "#include <iostream>\n#include \"city.h\"\n\nint city_total = 0;      // the one definition\n\nint main() {\n    north_visit();\n    north_visit();\n    south_visit();\n    int n = north_visit();\n    int s = south_visit();\n    std::cout << \"north \" << n << '\\n';\n    std::cout << \"south \" << s << '\\n';\n    std::cout << \"total \" << city_total << '\\n';\n}\n",
   "stdout": "north 3\nsouth 2\ntotal 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -c main.cpp north.cpp south.cpp",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/towns"
    },
    {
     "cmd": "g++ main.o north.o south.o -o city",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/towns"
    },
    {
     "cmd": "./city",
     "out": "north 3\nsouth 2\ntotal 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/towns"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "north 3\nsouth 2\ntotal 5\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g -c main.cpp north.cpp south.cpp",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/towns"
     },
     {
      "cmd": "clang++ main.o north.o south.o -o city",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/towns"
     },
     {
      "cmd": "./city",
      "out": "north 3\nsouth 2\ntotal 5\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/towns"
     }
    ]
   }
  },
  "towns/city.h": {
   "src": "#pragma once\n\nextern int city_total;   // ONE city-wide counter (defined in main.cpp)\n\nint north_visit();       // north.cpp\nint south_visit();       // south.cpp\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "towns/north.cpp": {
   "src": "#include \"city.h\"\n\nstatic int visits = 0;   // north's own counter: no other file can see it\n\nint north_visit() {\n    ++visits;\n    ++city_total;\n    return visits;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "towns/south.cpp": {
   "src": "#include \"city.h\"\n\nnamespace {              // an unnamed namespace: also \"this file only\"\nint visits = 0;          // south's own counter, a different variable\n}\n\nint south_visit() {\n    ++visits;\n    ++city_total;\n    return visits;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "trace_static.cpp": {
   "src": "#include <iostream>\n\nint calls = 0;                 // global: one, for the whole program\n\nint stamp() {\n    static int next = 100;     // made once, the first time stamp() runs\n    int fresh = 0;             // made again on every call\n    ++calls;\n    ++fresh;\n    next += 5;\n    return next + fresh;\n}\n\nint main() {\n    for (int i = 0; i < 4; ++i) {\n        int s = stamp();\n        std::cout << calls << ' ' << s << '\\n';\n    }\n}\n",
   "stdout": "1 106\n2 111\n3 116\n4 121\n",
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
     "out": "1 106\n2 111\n3 116\n4 121\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 106\n2 111\n3 116\n4 121\n",
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
      "out": "1 106\n2 111\n3 116\n4 121\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "tu.cpp": {
   "src": "#include \"sign.h\"   // the preprocessor pastes sign.h right here\n\nconst char* city = CITY;\n\nint main() {\n    return street_count();\n}\n",
   "stdout": "int street_count();\nconst char* city = \"Gearford\";\nint main() {\n    return street_count();\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -E -P main.cpp",
     "out": "int street_count();\nconst char* city = \"Gearford\";\nint main() {\n    return street_count();\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch28/tu"
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "int street_count();\n\nconst char* city = \"Gearford\";\nint main() {\n    return street_count();\n}\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -E -P main.cpp",
      "out": "int street_count();\n\nconst char* city = \"Gearford\";\nint main() {\n    return street_count();\n}\n",
      "err": "",
      "exit": 0,
      "dir": "~/cpp-ch28/tu"
     }
    ]
   }
  },
  "tu/sign.h": {
   "src": "// sign.h: a sign every neighbourhood can put up\n#define CITY \"Gearford\"\n\nint street_count();\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
