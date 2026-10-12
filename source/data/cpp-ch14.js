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
  "workdir": "/home/you/cpp-ch14",
  "versionDifferences": [
   "const_map.cpp",
   "contains17.cpp",
   "list_rsort.cpp",
   "list_sort.cpp",
   "not_captured.cpp",
   "spot_capture.cpp"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): const_map.cpp, contains17.cpp, list_rsort.cpp, list_sort.cpp, not_captured.cpp, spot_capture.cpp."
 },
 "programs": {
  "any_adult.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> ages{12, 9, 19, 15};\n    std::cout << std::boolalpha;\n    std::cout << \"anyone 18+? \" << std::ranges::any_of(ages, [](int a) { return a >= 18; }) << '\\n';\n    std::cout << \"everyone 10+? \" << std::ranges::all_of(ages, [](int a) { return a >= 10; }) << '\\n';\n}\n",
   "stdout": "anyone 18+? true\neveryone 10+? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g any_adult.cpp -o any_adult",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./any_adult",
     "out": "anyone 18+? true\neveryone 10+? false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "anyone 18+? true\neveryone 10+? false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g any_adult.cpp -o any_adult",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./any_adult",
      "out": "anyone 18+? true\neveryone 10+? false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "at_missing.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}, {\"banana\", 6}};\n    int kiwis = fruit.at(\"kiwi\");\n    std::cout << \"kiwis: \" << kiwis << '\\n';\n}\n",
   "stdout": "",
   "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g at_missing.cpp -o at_missing",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./at_missing",
     "out": "",
     "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g at_missing.cpp -o at_missing",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./at_missing",
      "out": "",
      "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "boss_fill.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::map<std::string, int> price{{\"tea\", 3}, {\"cake\", 5}, {\"soup\", 7}};\n    std::vector<std::string> order{\"cake\", \"pie\", \"soup\", \"tea\"};\n    int budget = 4;\n    auto pricey = std::ranges::count_if(order, [&](const std::string& item) {\n        return price.contains(item) && price.at(item) > budget;\n    });\n    std::cout << pricey << \" items over \" << budget << '\\n';\n}\n",
   "stdout": "2 items over 4\n",
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
     "out": "2 items over 4\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 items over 4\n",
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
      "out": "2 items over 4\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_parsons.cpp": {
   "src": "#include <iostream>\n#include <set>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> log{\"ada\", \"bo\", \"ada\", \"cy\", \"bo\"};\n    std::set<std::string> unique(log.begin(), log.end());\n    std::cout << log.size() << \" visits\\n\";\n    std::cout << unique.size() << \" visitors:\";\n    for (const auto& name : unique) {\n        std::cout << ' ' << name;\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "5 visits\n3 visitors: ada bo cy\n",
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
     "out": "5 visits\n3 visitors: ada bo cy\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 visits\n3 visitors: ada bo cy\n",
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
      "out": "5 visits\n3 visitors: ada bo cy\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_predict.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> shelf{{\"cherry\", 2}, {\"apple\", 5}, {\"Banana\", 1}};\n    shelf[\"apple\"] += 1;\n    if (shelf[\"kiwi\"] == 0) {\n        shelf.erase(\"cherry\");\n    }\n    for (const auto& [name, n] : shelf) {\n        std::cout << name << '=' << n << ' ';\n    }\n    std::cout << shelf.size() << '\\n';\n}\n",
   "stdout": "Banana=1 apple=6 kiwi=0 3\n",
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
     "out": "Banana=1 apple=6 kiwi=0 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Banana=1 apple=6 kiwi=0 3\n",
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
      "out": "Banana=1 apple=6 kiwi=0 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_spot.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> readings{4, -1, 7, -1, 9};\n    std::remove(readings.begin(), readings.end(), -1);\n    int lowest = *std::ranges::min_element(readings);\n    std::cout << readings.size() << \" readings, lowest \" << lowest << '\\n';\n}\n",
   "stdout": "5 readings, lowest -1\n",
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
     "out": "5 readings, lowest -1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5 readings, lowest -1\n",
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
      "out": "5 readings, lowest -1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "boss_trace.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::map<std::string, int> stock{{\"nut\", 3}, {\"bolt\", 1}};\n    std::vector<std::string> orders{\"nut\", \"bolt\", \"gear\", \"bolt\", \"nut\"};\n    for (const auto& item : orders) {\n        std::string result = \"missing\";\n        if (stock.contains(item)) {\n            if (stock.at(item) > 0) {\n                --stock.at(item);\n                result = \"sold\";\n            } else {\n                result = \"empty\";\n            }\n        }\n        std::cout << item << ' ' << result << ' ' << stock.size() << '\\n';\n    }\n}\n",
   "stdout": "nut sold 2\nbolt sold 2\ngear missing 2\nbolt empty 2\nnut sold 2\n",
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
     "out": "nut sold 2\nbolt sold 2\ngear missing 2\nbolt empty 2\nnut sold 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "nut sold 2\nbolt sold 2\ngear missing 2\nbolt empty 2\nnut sold 2\n",
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
      "out": "nut sold 2\nbolt sold 2\ngear missing 2\nbolt empty 2\nnut sold 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "capture_ref.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> tips{3, 12, 5, 20};\n    int total = 0;\n    int big = 0;\n    std::ranges::for_each(tips, [&](int t) {\n        total += t;\n        if (t >= 10) {\n            ++big;\n        }\n    });\n    std::cout << \"total \" << total << \", big tips \" << big << '\\n';\n}\n",
   "stdout": "total 40, big tips 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g capture_ref.cpp -o capture_ref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./capture_ref",
     "out": "total 40, big tips 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "total 40, big tips 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g capture_ref.cpp -o capture_ref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./capture_ref",
      "out": "total 40, big tips 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "capture_value.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> heights{120, 135, 142, 128, 150};\n    int lim = 130;\n    auto tall = std::count_if(heights.begin(), heights.end(), [lim](int h) { return h >= lim; });\n    std::cout << tall << \" riders are at least \" << lim << \" cm\\n\";\n}\n",
   "stdout": "3 riders are at least 130 cm\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g capture_value.cpp -o capture_value",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./capture_value",
     "out": "3 riders are at least 130 cm\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 riders are at least 130 cm\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g capture_value.cpp -o capture_value",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./capture_value",
      "out": "3 riders are at least 130 cm\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "coat_check.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<int, std::string> coats;   // ticket number -> coat\n    coats[12] = \"red scarf\";\n    coats[3] = \"blue raincoat\";\n    coats[7] = \"green hat\";\n\n    std::cout << \"Ticket 7: \" << coats[7] << '\\n';\n    std::cout << \"Coats on the rack: \" << coats.size() << '\\n';\n}\n",
   "stdout": "Ticket 7: green hat\nCoats on the rack: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g coat_check.cpp -o coat_check",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./coat_check",
     "out": "Ticket 7: green hat\nCoats on the rack: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ticket 7: green hat\nCoats on the rack: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g coat_check.cpp -o coat_check",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./coat_check",
      "out": "Ticket 7: green hat\nCoats on the rack: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "const_map.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nvoid show(const std::map<std::string, int>& fruit) {\n    std::cout << \"apples: \" << fruit[\"apple\"] << '\\n';\n}\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    show(fruit);\n}\n",
   "stdout": "",
   "stderr": "const_map.cpp: In function ‘void show(const std::map<std::__cxx11::basic_string<char>, int>&)’:\nconst_map.cpp:6:45: error: passing ‘const std::map<std::__cxx11::basic_string<char>, int>’ as ‘this’ argument discards qualifiers [-fpermissive]\n    6 |     std::cout << \"apples: \" << fruit[\"apple\"] << '\\n';\n      |                                             ^\nIn file included from /usr/include/c++/13/map:63,\n                 from const_map.cpp:2:\n/usr/include/c++/13/bits/stl_map.h:524:7: note:   in call to ‘std::map<_Key, _Tp, _Compare, _Alloc>::mapped_type& std::map<_Key, _Tp, _Compare, _Alloc>::operator[](key_type&&) [with _Key = std::__cxx11::basic_string<char>; _Tp = int; _Compare = std::less<std::__cxx11::basic_string<char> >; _Alloc = std::allocator<std::pair<const std::__cxx11::basic_string<char>, int> >; mapped_type = int; key_type = std::__cxx11::basic_string<char>]’\n  524 |       operator[](key_type&& __k)\n      |       ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g const_map.cpp -o const_map",
     "out": "",
     "err": "const_map.cpp: In function ‘void show(const std::map<std::__cxx11::basic_string<char>, int>&)’:\nconst_map.cpp:6:45: error: passing ‘const std::map<std::__cxx11::basic_string<char>, int>’ as ‘this’ argument discards qualifiers [-fpermissive]\n    6 |     std::cout << \"apples: \" << fruit[\"apple\"] << '\\n';\n      |                                             ^\nIn file included from /usr/include/c++/13/map:63,\n                 from const_map.cpp:2:\n/usr/include/c++/13/bits/stl_map.h:524:7: note:   in call to ‘std::map<_Key, _Tp, _Compare, _Alloc>::mapped_type& std::map<_Key, _Tp, _Compare, _Alloc>::operator[](key_type&&) [with _Key = std::__cxx11::basic_string<char>; _Tp = int; _Compare = std::less<std::__cxx11::basic_string<char> >; _Alloc = std::allocator<std::pair<const std::__cxx11::basic_string<char>, int> >; mapped_type = int; key_type = std::__cxx11::basic_string<char>]’\n  524 |       operator[](key_type&& __k)\n      |       ^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "const_map.cpp:6:37: error: no viable overloaded operator[] for type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>')\n    6 |     std::cout << \"apples: \" << fruit[\"apple\"] << '\\n';\n      |                                ~~~~~^~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_map.h:504:7: note: candidate function not viable: 'this' argument has type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>'), but method is not marked const\n  504 |       operator[](const key_type& __k)\n      |       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_map.h:524:7: note: candidate function not viable: 'this' argument has type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>'), but method is not marked const\n  524 |       operator[](key_type&& __k)\n      |       ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g const_map.cpp -o const_map",
      "out": "",
      "err": "const_map.cpp:6:37: error: no viable overloaded operator[] for type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>')\n    6 |     std::cout << \"apples: \" << fruit[\"apple\"] << '\\n';\n      |                                ~~~~~^~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_map.h:504:7: note: candidate function not viable: 'this' argument has type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>'), but method is not marked const\n  504 |       operator[](const key_type& __k)\n      |       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_map.h:524:7: note: candidate function not viable: 'this' argument has type 'const std::map<std::string, int>' (aka 'const map<basic_string<char>, int>'), but method is not marked const\n  524 |       operator[](key_type&& __k)\n      |       ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "contains17.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    std::cout << std::boolalpha << fruit.contains(\"apple\") << '\\n';\n}\n",
   "stdout": "",
   "stderr": "contains17.cpp: In function ‘int main()’:\ncontains17.cpp:7:42: error: ‘class std::map<std::__cxx11::basic_string<char>, int>’ has no member named ‘contains’\n    7 |     std::cout << std::boolalpha << fruit.contains(\"apple\") << '\\n';\n      |                                          ^~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++17 -Wall -Wextra -g contains17.cpp -o contains17",
     "out": "",
     "err": "contains17.cpp: In function ‘int main()’:\ncontains17.cpp:7:42: error: ‘class std::map<std::__cxx11::basic_string<char>, int>’ has no member named ‘contains’\n    7 |     std::cout << std::boolalpha << fruit.contains(\"apple\") << '\\n';\n      |                                          ^~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "contains17.cpp:7:42: error: no member named 'contains' in 'std::map<std::basic_string<char>, int>'\n    7 |     std::cout << std::boolalpha << fruit.contains(\"apple\") << '\\n';\n      |                                    ~~~~~ ^\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++17 -Wall -Wextra -g contains17.cpp -o contains17",
      "out": "",
      "err": "contains17.cpp:7:42: error: no member named 'contains' in 'std::map<std::basic_string<char>, int>'\n    7 |     std::cout << std::boolalpha << fruit.contains(\"apple\") << '\\n';\n      |                                    ~~~~~ ^\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "countif_machine.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{3, 8, 1, 9, 4, 6};\n    std::cout << \"x > 5: \" << std::ranges::count_if(v, [](int x) { return x > 5; }) << '\\n';\n    std::cout << \"x % 2 == 0: \" << std::ranges::count_if(v, [](int x) { return x % 2 == 0; }) << '\\n';\n    std::cout << \"x < 0: \" << std::ranges::count_if(v, [](int x) { return x < 0; }) << '\\n';\n    std::cout << \"x == 4: \" << std::ranges::count_if(v, [](int x) { return x == 4; }) << '\\n';\n    std::cout << \"x >= 1: \" << std::ranges::count_if(v, [](int x) { return x >= 1; }) << '\\n';\n}\n",
   "stdout": "x > 5: 3\nx % 2 == 0: 3\nx < 0: 0\nx == 4: 1\nx >= 1: 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g countif_machine.cpp -o countif_machine",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./countif_machine",
     "out": "x > 5: 3\nx % 2 == 0: 3\nx < 0: 0\nx == 4: 1\nx >= 1: 6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "x > 5: 3\nx % 2 == 0: 3\nx < 0: 0\nx == 4: 1\nx >= 1: 6\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g countif_machine.cpp -o countif_machine",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./countif_machine",
      "out": "x > 5: 3\nx % 2 == 0: 3\nx < 0: 0\nx == 4: 1\nx >= 1: 6\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_const.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nvoid show(const std::map<std::string, int>& fruit, const std::string& name) {\n    if (fruit.contains(name)) {\n        std::cout << name << \": \" << fruit.at(name) << '\\n';\n    } else {\n        std::cout << name << \": none\\n\";\n    }\n}\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}, {\"pear\", 2}};\n    show(fruit, \"pear\");\n    show(fruit, \"plum\");\n}\n",
   "stdout": "pear: 2\nplum: none\n",
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
     "out": "pear: 2\nplum: none\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "pear: 2\nplum: none\n",
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
      "out": "pear: 2\nplum: none\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_count.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> pets{\"cat\", \"dog\", \"cat\", \"fish\", \"cat\", \"dog\"};\n    std::map<std::string, int> tally;\n    for (const auto& p : pets) {\n        ++tally[p];\n    }\n    for (const auto& [pet, n] : tally) {\n        std::cout << pet << \" x\" << n << '\\n';\n    }\n}\n",
   "stdout": "cat x3\ndog x2\nfish x1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_count.cpp -o fill_count",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_count",
     "out": "cat x3\ndog x2\nfish x1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "cat x3\ndog x2\nfish x1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_count.cpp -o fill_count",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_count",
      "out": "cat x3\ndog x2\nfish x1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fill_sort.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nstruct Racer {\n    std::string name;\n    double seconds;\n};\n\nint main() {\n    std::vector<Racer> race{{\"Kai\", 12.4}, {\"Lu\", 11.9}, {\"Mo\", 13.1}};\n    std::ranges::sort(race, [](const Racer& a, const Racer& b) { return a.seconds < b.seconds; });\n    std::cout << \"winner: \" << race.front().name << '\\n';\n    std::cout << \"last:   \" << race.back().name << '\\n';\n}\n",
   "stdout": "winner: Lu\nlast:   Mo\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g fill_sort.cpp -o fill_sort",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./fill_sort",
     "out": "winner: Lu\nlast:   Mo\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "winner: Lu\nlast:   Mo\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g fill_sort.cpp -o fill_sort",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./fill_sort",
      "out": "winner: Lu\nlast:   Mo\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "find_it.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nvoid report(const std::map<std::string, int>& fruit, const std::string& name) {\n    auto it = fruit.find(name);\n    if (it != fruit.end()) {\n        std::cout << it->first << \": \" << it->second << '\\n';\n    } else {\n        std::cout << name << \": not in the map\\n\";\n    }\n}\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}, {\"banana\", 6}};\n    report(fruit, \"banana\");\n    report(fruit, \"kiwi\");\n    std::cout << \"drawers: \" << fruit.size() << '\\n';\n}\n",
   "stdout": "banana: 6\nkiwi: not in the map\ndrawers: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g find_it.cpp -o find_it",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./find_it",
     "out": "banana: 6\nkiwi: not in the map\ndrawers: 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "banana: 6\nkiwi: not in the map\ndrawers: 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g find_it.cpp -o find_it",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./find_it",
      "out": "banana: 6\nkiwi: not in the map\ndrawers: 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "find_pos.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> names{\"Ada\", \"Bo\", \"Cy\", \"Di\"};\n\n    auto it = std::find(names.begin(), names.end(), \"Cy\");\n    if (it != names.end()) {\n        std::cout << \"Cy is at index \" << (it - names.begin()) << '\\n';\n    }\n\n    auto it2 = std::find(names.begin(), names.end(), \"Zed\");\n    if (it2 == names.end()) {\n        std::cout << \"Zed: not found, find gave end()\\n\";\n    }\n}\n",
   "stdout": "Cy is at index 2\nZed: not found, find gave end()\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g find_pos.cpp -o find_pos",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./find_pos",
     "out": "Cy is at index 2\nZed: not found, find gave end()\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Cy is at index 2\nZed: not found, find gave end()\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g find_pos.cpp -o find_pos",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./find_pos",
      "out": "Cy is at index 2\nZed: not found, find gave end()\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "first_lambda.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nbool is_adult(int age) {\n    return age >= 18;\n}\n\nint main() {\n    std::vector<int> ages{12, 25, 8, 19, 40, 15};\n\n    auto a = std::count_if(ages.begin(), ages.end(), is_adult);\n    std::cout << \"with a named function: \" << a << '\\n';\n\n    auto b = std::count_if(ages.begin(), ages.end(), [](int age) { return age >= 18; });\n    std::cout << \"with a lambda:         \" << b << '\\n';\n}\n",
   "stdout": "with a named function: 3\nwith a lambda:         3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g first_lambda.cpp -o first_lambda",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./first_lambda",
     "out": "with a named function: 3\nwith a lambda:         3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "with a named function: 3\nwith a lambda:         3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g first_lambda.cpp -o first_lambda",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./first_lambda",
      "out": "with a named function: 3\nwith a lambda:         3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "gadgets.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <numeric>\n#include <vector>\n\nvoid show(const char* label, const std::vector<int>& v) {\n    std::cout << label;\n    for (int x : v) {\n        std::cout << ' ' << x;\n    }\n    std::cout << '\\n';\n}\n\nint main() {\n    std::vector<int> v{5, 2, 8, 2, 9, 1};\n    std::cout << \"count of 2: \" << std::count(v.begin(), v.end(), 2) << '\\n';\n    std::cout << \"smallest:   \" << *std::min_element(v.begin(), v.end()) << '\\n';\n    std::cout << \"largest:    \" << *std::max_element(v.begin(), v.end()) << '\\n';\n    std::cout << \"total:      \" << std::accumulate(v.begin(), v.end(), 0) << '\\n';\n    std::sort(v.begin(), v.end());\n    show(\"sorted:    \", v);\n    std::reverse(v.begin(), v.end());\n    show(\"reversed:  \", v);\n}\n",
   "stdout": "count of 2: 2\nsmallest:   1\nlargest:    9\ntotal:      27\nsorted:     1 2 2 5 8 9\nreversed:   9 8 5 2 2 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g gadgets.cpp -o gadgets",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./gadgets",
     "out": "count of 2: 2\nsmallest:   1\nlargest:    9\ntotal:      27\nsorted:     1 2 2 5 8 9\nreversed:   9 8 5 2 2 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "count of 2: 2\nsmallest:   1\nlargest:    9\ntotal:      27\nsorted:     1 2 2 5 8 9\nreversed:   9 8 5 2 2 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g gadgets.cpp -o gadgets",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./gadgets",
      "out": "count of 2: 2\nsmallest:   1\nlargest:    9\ntotal:      27\nsorted:     1 2 2 5 8 9\nreversed:   9 8 5 2 2 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "insert_erase.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<int, std::string> coats{{3, \"blue raincoat\"}, {7, \"green hat\"}};\n    std::cout << std::boolalpha;\n\n    bool added = coats.insert({7, \"purple cape\"}).second;\n    std::cout << \"insert 7: added? \" << added << \", ticket 7 is \" << coats.at(7) << '\\n';\n    added = coats.insert({9, \"purple cape\"}).second;\n    std::cout << \"insert 9: added? \" << added << \", ticket 9 is \" << coats.at(9) << '\\n';\n\n    coats[7] = \"yellow cap\";\n    std::cout << \"after coats[7] = ...: ticket 7 is \" << coats.at(7) << '\\n';\n\n    std::cout << \"erase(3) removed \" << coats.erase(3) << '\\n';\n    std::cout << \"erase(5) removed \" << coats.erase(5) << '\\n';\n    for (const auto& [ticket, coat] : coats) {\n        std::cout << \"  \" << ticket << \": \" << coat << '\\n';\n    }\n}\n",
   "stdout": "insert 7: added? false, ticket 7 is green hat\ninsert 9: added? true, ticket 9 is purple cape\nafter coats[7] = ...: ticket 7 is yellow cap\nerase(3) removed 1\nerase(5) removed 0\n  7: yellow cap\n  9: purple cape\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g insert_erase.cpp -o insert_erase",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./insert_erase",
     "out": "insert 7: added? false, ticket 7 is green hat\ninsert 9: added? true, ticket 9 is purple cape\nafter coats[7] = ...: ticket 7 is yellow cap\nerase(3) removed 1\nerase(5) removed 0\n  7: yellow cap\n  9: purple cape\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "insert 7: added? false, ticket 7 is green hat\ninsert 9: added? true, ticket 9 is purple cape\nafter coats[7] = ...: ticket 7 is yellow cap\nerase(3) removed 1\nerase(5) removed 0\n  7: yellow cap\n  9: purple cape\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g insert_erase.cpp -o insert_erase",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./insert_erase",
      "out": "insert 7: added? false, ticket 7 is green hat\ninsert 9: added? true, ticket 9 is purple cape\nafter coats[7] = ...: ticket 7 is yellow cap\nerase(3) removed 1\nerase(5) removed 0\n  7: yellow cap\n  9: purple cape\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "lab_copy.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> heights{120, 135, 142, 128, 150};\n    int lim = 130;\n    auto tall_enough = [lim](int h) { return h >= lim; };   // copies lim now\n    lim = 140;\n    auto tall = std::count_if(heights.begin(), heights.end(), tall_enough);\n    std::cout << tall << \" riders counted, lim is now \" << lim << '\\n';\n}\n",
   "stdout": "3 riders counted, lim is now 140\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lab_copy.cpp -o lab_copy",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lab_copy",
     "out": "3 riders counted, lim is now 140\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 riders counted, lim is now 140\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lab_copy.cpp -o lab_copy",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lab_copy",
      "out": "3 riders counted, lim is now 140\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "lab_ref.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> heights{120, 135, 142, 128, 150};\n    int lim = 130;\n    auto tall_enough = [&lim](int h) { return h >= lim; };   // uses main's lim\n    lim = 140;\n    auto tall = std::count_if(heights.begin(), heights.end(), tall_enough);\n    std::cout << tall << \" riders counted, lim is now \" << lim << '\\n';\n}\n",
   "stdout": "2 riders counted, lim is now 140\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lab_ref.cpp -o lab_ref",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lab_ref",
     "out": "2 riders counted, lim is now 140\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "2 riders counted, lim is now 140\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lab_ref.cpp -o lab_ref",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lab_ref",
      "out": "2 riders counted, lim is now 140\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "list_member.cpp": {
   "src": "#include <iostream>\n#include <list>\n\nint main() {\n    std::list<int> queue{4, 1, 3};\n    queue.sort();\n    for (int x : queue) {\n        std::cout << x << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "1 3 4 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g list_member.cpp -o list_member",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./list_member",
     "out": "1 3 4 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "1 3 4 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g list_member.cpp -o list_member",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./list_member",
      "out": "1 3 4 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "list_rsort.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <list>\n\nint main() {\n    std::list<int> queue{4, 1, 3};\n    std::ranges::sort(queue);\n    for (int x : queue) {\n        std::cout << x << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "",
   "stderr": "list_rsort.cpp: In function ‘int main()’:\nlist_rsort.cpp:7:22: error: no match for call to ‘(const std::ranges::__sort_fn) (std::__cxx11::list<int>&)’\n    7 |     std::ranges::sort(queue);\n      |     ~~~~~~~~~~~~~~~~~^~~~~~~\nIn file included from /usr/include/c++/13/algorithm:63,\n                 from list_rsort.cpp:1:\n/usr/include/c++/13/bits/ranges_algo.h:1781:7: note: candidate: ‘template<class _Iter, class _Sent, class _Comp, class _Proj>  requires (random_access_iterator<_Iter>) && (sentinel_for<_Sent, _Iter>) && (sortable<_Iter, _Comp, _Proj>) constexpr _Iter std::ranges::__sort_fn::operator()(_Iter, _Sent, _Comp, _Proj) const’\n 1781 |       operator()(_Iter __first, _Sent __last,\n      |       ^~~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1781:7: note:   template argument deduction/substitution failed:\nlist_rsort.cpp:7:22: note:   candidate expects 4 arguments, 1 provided\n    7 |     std::ranges::sort(queue);\n      |     ~~~~~~~~~~~~~~~~~^~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note: candidate: ‘template<class _Range, class _Comp, class _Proj>  requires (random_access_range<_Range>) && (sortable<decltype(std::ranges::__cust_access::__begin((declval<_Container&>)())), _Comp, _Proj>) constexpr std::ranges::borrowed_iterator_t<_Range> std::ranges::__sort_fn::operator()(_Range&&, _Comp, _Proj) const’\n 1794 |       operator()(_Range&& __r, _Comp __comp = {}, _Proj __proj = {}) const\n      |       ^~~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note: constraints not satisfied\nIn file included from /usr/include/c++/13/compare:37,\n                 from /usr/include/c++/13/bits/stl_pair.h:65,\n                 from /usr/include/c++/13/bits/stl_algobase.h:64,\n                 from /usr/include/c++/13/algorithm:60:\n/usr/include/c++/13/concepts: In substitution of ‘template<class _Range, class _Comp, class _Proj>  requires (random_access_range<_Range>) && (sortable<decltype(std::ranges::__cust_access::__begin((declval<_Container&>)())), _Comp, _Proj>) constexpr std::ranges::borrowed_iterator_t<_Range> std::ranges::__sort_fn::operator()(_Range&&, _Comp, _Proj) const [with _Range = std::__cxx11::list<int>&; _Comp = std::ranges::less; _Proj = std::identity]’:\nlist_rsort.cpp:7:22:   required from here\n/usr/include/c++/13/concepts:67:13:   required for the satisfaction of ‘derived_from<typename std::__detail::__iter_concept_impl<_Iter>::type, std::random_access_iterator_tag>’ [with _Iter = std::_List_iterator<int>]\n/usr/include/c++/13/bits/iterator_concepts.h:682:13:   required for the satisfaction of ‘random_access_iterator<decltype (std::ranges::__cust_access::__begin(declval<_Container&>()))>’ [with _Tp = std::__cxx11::list<int, std::allocator<int> >&]\n/usr/include/c++/13/bits/ranges_base.h:604:13:   required for the satisfaction of ‘random_access_range<_Range>’ [with _Range = std::__cxx11::list<int, std::allocator<int> >&]\n/usr/include/c++/13/concepts:67:28: note:   ‘std::random_access_iterator_tag’ is not a base of ‘std::bidirectional_iterator_tag’\n   67 |     concept derived_from = __is_base_of(_Base, _Derived)\n      |                            ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g list_rsort.cpp -o list_rsort",
     "out": "",
     "err": "list_rsort.cpp: In function ‘int main()’:\nlist_rsort.cpp:7:22: error: no match for call to ‘(const std::ranges::__sort_fn) (std::__cxx11::list<int>&)’\n    7 |     std::ranges::sort(queue);\n      |     ~~~~~~~~~~~~~~~~~^~~~~~~\nIn file included from /usr/include/c++/13/algorithm:63,\n                 from list_rsort.cpp:1:\n/usr/include/c++/13/bits/ranges_algo.h:1781:7: note: candidate: ‘template<class _Iter, class _Sent, class _Comp, class _Proj>  requires (random_access_iterator<_Iter>) && (sentinel_for<_Sent, _Iter>) && (sortable<_Iter, _Comp, _Proj>) constexpr _Iter std::ranges::__sort_fn::operator()(_Iter, _Sent, _Comp, _Proj) const’\n 1781 |       operator()(_Iter __first, _Sent __last,\n      |       ^~~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1781:7: note:   template argument deduction/substitution failed:\nlist_rsort.cpp:7:22: note:   candidate expects 4 arguments, 1 provided\n    7 |     std::ranges::sort(queue);\n      |     ~~~~~~~~~~~~~~~~~^~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note: candidate: ‘template<class _Range, class _Comp, class _Proj>  requires (random_access_range<_Range>) && (sortable<decltype(std::ranges::__cust_access::__begin((declval<_Container&>)())), _Comp, _Proj>) constexpr std::ranges::borrowed_iterator_t<_Range> std::ranges::__sort_fn::operator()(_Range&&, _Comp, _Proj) const’\n 1794 |       operator()(_Range&& __r, _Comp __comp = {}, _Proj __proj = {}) const\n      |       ^~~~~~~~\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/ranges_algo.h:1794:7: note: constraints not satisfied\nIn file included from /usr/include/c++/13/compare:37,\n                 from /usr/include/c++/13/bits/stl_pair.h:65,\n                 from /usr/include/c++/13/bits/stl_algobase.h:64,\n                 from /usr/include/c++/13/algorithm:60:\n/usr/include/c++/13/concepts: In substitution of ‘template<class _Range, class _Comp, class _Proj>  requires (random_access_range<_Range>) && (sortable<decltype(std::ranges::__cust_access::__begin((declval<_Container&>)())), _Comp, _Proj>) constexpr std::ranges::borrowed_iterator_t<_Range> std::ranges::__sort_fn::operator()(_Range&&, _Comp, _Proj) const [with _Range = std::__cxx11::list<int>&; _Comp = std::ranges::less; _Proj = std::identity]’:\nlist_rsort.cpp:7:22:   required from here\n/usr/include/c++/13/concepts:67:13:   required for the satisfaction of ‘derived_from<typename std::__detail::__iter_concept_impl<_Iter>::type, std::random_access_iterator_tag>’ [with _Iter = std::_List_iterator<int>]\n/usr/include/c++/13/bits/iterator_concepts.h:682:13:   required for the satisfaction of ‘random_access_iterator<decltype (std::ranges::__cust_access::__begin(declval<_Container&>()))>’ [with _Tp = std::__cxx11::list<int, std::allocator<int> >&]\n/usr/include/c++/13/bits/ranges_base.h:604:13:   required for the satisfaction of ‘random_access_range<_Range>’ [with _Range = std::__cxx11::list<int, std::allocator<int> >&]\n/usr/include/c++/13/concepts:67:28: note:   ‘std::random_access_iterator_tag’ is not a base of ‘std::bidirectional_iterator_tag’\n   67 |     concept derived_from = __is_base_of(_Base, _Derived)\n      |                            ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "list_rsort.cpp:7:5: error: no matching function for call to object of type 'const __sort_fn'\n    7 |     std::ranges::sort(queue);\n      |     ^~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1794:7: note: candidate template ignored: constraints not satisfied [with _Range = std::list<int> &, _Comp = ranges::less, _Proj = identity]\n 1794 |       operator()(_Range&& __r, _Comp __comp = {}, _Proj __proj = {}) const\n      |       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1790:14: note: because 'std::list<int> &' does not satisfy 'random_access_range'\n 1790 |     template<random_access_range _Range,\n      |              ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_base.h:605:37: note: because 'iterator_t<list<int, allocator<int>> &>' (aka '_List_iterator<int>') does not satisfy 'random_access_iterator'\n  605 |       = bidirectional_range<_Tp> && random_access_iterator<iterator_t<_Tp>>;\n      |                                     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/iterator_concepts.h:683:10: note: because 'derived_from<__detail::__iter_concept<_List_iterator<int> >, random_access_iterator_tag>' evaluated to false\n  683 |       && derived_from<__detail::__iter_concept<_Iter>,\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:67:28: note: because '__is_base_of(std::random_access_iterator_tag, std::bidirectional_iterator_tag)' evaluated to false\n   67 |     concept derived_from = __is_base_of(_Base, _Derived)\n      |                            ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1781:7: note: candidate function template not viable: requires at least 2 arguments, but 1 was provided\n 1781 |       operator()(_Iter __first, _Sent __last,\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n 1782 |                  _Comp __comp = {}, _Proj __proj = {}) const\n      |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g list_rsort.cpp -o list_rsort",
      "out": "",
      "err": "list_rsort.cpp:7:5: error: no matching function for call to object of type 'const __sort_fn'\n    7 |     std::ranges::sort(queue);\n      |     ^~~~~~~~~~~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1794:7: note: candidate template ignored: constraints not satisfied [with _Range = std::list<int> &, _Comp = ranges::less, _Proj = identity]\n 1794 |       operator()(_Range&& __r, _Comp __comp = {}, _Proj __proj = {}) const\n      |       ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1790:14: note: because 'std::list<int> &' does not satisfy 'random_access_range'\n 1790 |     template<random_access_range _Range,\n      |              ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_base.h:605:37: note: because 'iterator_t<list<int, allocator<int>> &>' (aka '_List_iterator<int>') does not satisfy 'random_access_iterator'\n  605 |       = bidirectional_range<_Tp> && random_access_iterator<iterator_t<_Tp>>;\n      |                                     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/iterator_concepts.h:683:10: note: because 'derived_from<__detail::__iter_concept<_List_iterator<int> >, random_access_iterator_tag>' evaluated to false\n  683 |       && derived_from<__detail::__iter_concept<_Iter>,\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/concepts:67:28: note: because '__is_base_of(std::random_access_iterator_tag, std::bidirectional_iterator_tag)' evaluated to false\n   67 |     concept derived_from = __is_base_of(_Base, _Derived)\n      |                            ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/ranges_algo.h:1781:7: note: candidate function template not viable: requires at least 2 arguments, but 1 was provided\n 1781 |       operator()(_Iter __first, _Sent __last,\n      |       ^          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n 1782 |                  _Comp __comp = {}, _Proj __proj = {}) const\n      |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "list_sort.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <list>\n\nint main() {\n    std::list<int> queue{4, 1, 3};\n    std::sort(queue.begin(), queue.end());\n    for (int x : queue) {\n        std::cout << x << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "",
   "stderr": "In file included from /usr/include/c++/13/algorithm:61,\n                 from list_sort.cpp:1:\n/usr/include/c++/13/bits/stl_algo.h: In instantiation of ‘constexpr void std::__sort(_RandomAccessIterator, _RandomAccessIterator, _Compare) [with _RandomAccessIterator = _List_iterator<int>; _Compare = __gnu_cxx::__ops::_Iter_less_iter]’:\n/usr/include/c++/13/bits/stl_algo.h:4861:18:   required from ‘constexpr void std::sort(_RAIter, _RAIter) [with _RAIter = _List_iterator<int>]’\nlist_sort.cpp:7:14:   required from here\n/usr/include/c++/13/bits/stl_algo.h:1948:50: error: no match for ‘operator-’ (operand types are ‘std::_List_iterator<int>’ and ‘std::_List_iterator<int>’)\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\nIn file included from /usr/include/c++/13/bits/stl_algobase.h:67,\n                 from /usr/include/c++/13/algorithm:60:\n/usr/include/c++/13/bits/stl_iterator.h:625:5: note: candidate: ‘template<class _IteratorL, class _IteratorR> constexpr decltype ((__y.base() - __x.base())) std::operator-(const reverse_iterator<_IteratorL>&, const reverse_iterator<_IteratorR>&)’\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:625:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/stl_algo.h:1948:50: note:   ‘std::_List_iterator<int>’ is not derived from ‘const std::reverse_iterator<_IteratorL>’\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:1800:5: note: candidate: ‘template<class _IteratorL, class _IteratorR> constexpr decltype ((__x.base() - __y.base())) std::operator-(const move_iterator<_IteratorL>&, const move_iterator<_IteratorR>&)’\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:1800:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/stl_algo.h:1948:50: note:   ‘std::_List_iterator<int>’ is not derived from ‘const std::move_iterator<_IteratorL>’\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g list_sort.cpp -o list_sort",
     "out": "",
     "err": "In file included from /usr/include/c++/13/algorithm:61,\n                 from list_sort.cpp:1:\n/usr/include/c++/13/bits/stl_algo.h: In instantiation of ‘constexpr void std::__sort(_RandomAccessIterator, _RandomAccessIterator, _Compare) [with _RandomAccessIterator = _List_iterator<int>; _Compare = __gnu_cxx::__ops::_Iter_less_iter]’:\n/usr/include/c++/13/bits/stl_algo.h:4861:18:   required from ‘constexpr void std::sort(_RAIter, _RAIter) [with _RAIter = _List_iterator<int>]’\nlist_sort.cpp:7:14:   required from here\n/usr/include/c++/13/bits/stl_algo.h:1948:50: error: no match for ‘operator-’ (operand types are ‘std::_List_iterator<int>’ and ‘std::_List_iterator<int>’)\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\nIn file included from /usr/include/c++/13/bits/stl_algobase.h:67,\n                 from /usr/include/c++/13/algorithm:60:\n/usr/include/c++/13/bits/stl_iterator.h:625:5: note: candidate: ‘template<class _IteratorL, class _IteratorR> constexpr decltype ((__y.base() - __x.base())) std::operator-(const reverse_iterator<_IteratorL>&, const reverse_iterator<_IteratorR>&)’\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:625:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/stl_algo.h:1948:50: note:   ‘std::_List_iterator<int>’ is not derived from ‘const std::reverse_iterator<_IteratorL>’\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:1800:5: note: candidate: ‘template<class _IteratorL, class _IteratorR> constexpr decltype ((__x.base() - __y.base())) std::operator-(const move_iterator<_IteratorL>&, const move_iterator<_IteratorR>&)’\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^~~~~~~~\n/usr/include/c++/13/bits/stl_iterator.h:1800:5: note:   template argument deduction/substitution failed:\n/usr/include/c++/13/bits/stl_algo.h:1948:50: note:   ‘std::_List_iterator<int>’ is not derived from ‘const std::move_iterator<_IteratorL>’\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~~^~~~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "In file included from list_sort.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/algorithm:61:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1948:22: error: invalid operands to binary expression ('std::_List_iterator<int>' and 'std::_List_iterator<int>')\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~ ^ ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4861:12: note: in instantiation of function template specialization 'std::__sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 4861 |       std::__sort(__first, __last, __gnu_cxx::__ops::__iter_less_iter());\n      |            ^\nlist_sort.cpp:7:10: note: in instantiation of function template specialization 'std::sort<std::_List_iterator<int>>' requested here\n    7 |     std::sort(queue.begin(), queue.end());\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:625:5: note: candidate template ignored: could not match 'reverse_iterator' against '_List_iterator'\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:1800:5: note: candidate template ignored: could not match 'move_iterator' against '_List_iterator'\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^\nIn file included from list_sort.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/algorithm:61:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1857:18: error: invalid operands to binary expression ('std::_List_iterator<int>' and 'std::_List_iterator<int>')\n 1857 |       if (__last - __first > int(_S_threshold))\n      |           ~~~~~~ ^ ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1950:9: note: in instantiation of function template specialization 'std::__final_insertion_sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 1950 |           std::__final_insertion_sort(__first, __last, __comp);\n      |                ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4861:12: note: in instantiation of function template specialization 'std::__sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 4861 |       std::__sort(__first, __last, __gnu_cxx::__ops::__iter_less_iter());\n      |            ^\nlist_sort.cpp:7:10: note: in instantiation of function template specialization 'std::sort<std::_List_iterator<int>>' requested here\n    7 |     std::sort(queue.begin(), queue.end());\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:625:5: note: candidate template ignored: could not match 'reverse_iterator' against '_List_iterator'\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:1800:5: note: candidate template ignored: could not match 'move_iterator' against '_List_iterator'\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^\n2 errors generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g list_sort.cpp -o list_sort",
      "out": "",
      "err": "In file included from list_sort.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/algorithm:61:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1948:22: error: invalid operands to binary expression ('std::_List_iterator<int>' and 'std::_List_iterator<int>')\n 1948 |                                 std::__lg(__last - __first) * 2,\n      |                                           ~~~~~~ ^ ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4861:12: note: in instantiation of function template specialization 'std::__sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 4861 |       std::__sort(__first, __last, __gnu_cxx::__ops::__iter_less_iter());\n      |            ^\nlist_sort.cpp:7:10: note: in instantiation of function template specialization 'std::sort<std::_List_iterator<int>>' requested here\n    7 |     std::sort(queue.begin(), queue.end());\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:625:5: note: candidate template ignored: could not match 'reverse_iterator' against '_List_iterator'\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:1800:5: note: candidate template ignored: could not match 'move_iterator' against '_List_iterator'\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^\nIn file included from list_sort.cpp:1:\nIn file included from /usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/algorithm:61:\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1857:18: error: invalid operands to binary expression ('std::_List_iterator<int>' and 'std::_List_iterator<int>')\n 1857 |       if (__last - __first > int(_S_threshold))\n      |           ~~~~~~ ^ ~~~~~~~\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:1950:9: note: in instantiation of function template specialization 'std::__final_insertion_sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 1950 |           std::__final_insertion_sort(__first, __last, __comp);\n      |                ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_algo.h:4861:12: note: in instantiation of function template specialization 'std::__sort<std::_List_iterator<int>, __gnu_cxx::__ops::_Iter_less_iter>' requested here\n 4861 |       std::__sort(__first, __last, __gnu_cxx::__ops::__iter_less_iter());\n      |            ^\nlist_sort.cpp:7:10: note: in instantiation of function template specialization 'std::sort<std::_List_iterator<int>>' requested here\n    7 |     std::sort(queue.begin(), queue.end());\n      |          ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:625:5: note: candidate template ignored: could not match 'reverse_iterator' against '_List_iterator'\n  625 |     operator-(const reverse_iterator<_IteratorL>& __x,\n      |     ^\n/usr/bin/../lib/gcc/x86_64-linux-gnu/13/../../../../include/c++/13/bits/stl_iterator.h:1800:5: note: candidate template ignored: could not match 'move_iterator' against '_List_iterator'\n 1800 |     operator-(const move_iterator<_IteratorL>& __x,\n      |     ^\n2 errors generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "lookups.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}, {\"banana\", 6}};\n    std::cout << std::boolalpha;\n\n    std::cout << \"contains(\\\"apple\\\"): \" << fruit.contains(\"apple\") << '\\n';\n    std::cout << \"contains(\\\"kiwi\\\"):  \" << fruit.contains(\"kiwi\") << '\\n';\n    std::cout << \"count(\\\"apple\\\"):    \" << fruit.count(\"apple\") << '\\n';\n    std::cout << \"count(\\\"kiwi\\\"):     \" << fruit.count(\"kiwi\") << '\\n';\n    std::cout << \"at(\\\"banana\\\"):      \" << fruit.at(\"banana\") << '\\n';\n    std::cout << \"drawers: \" << fruit.size() << '\\n';\n}\n",
   "stdout": "contains(\"apple\"): true\ncontains(\"kiwi\"):  false\ncount(\"apple\"):    1\ncount(\"kiwi\"):     0\nat(\"banana\"):      6\ndrawers: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g lookups.cpp -o lookups",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./lookups",
     "out": "contains(\"apple\"): true\ncontains(\"kiwi\"):  false\ncount(\"apple\"):    1\ncount(\"kiwi\"):     0\nat(\"banana\"):      6\ndrawers: 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "contains(\"apple\"): true\ncontains(\"kiwi\"):  false\ncount(\"apple\"):    1\ncount(\"kiwi\"):     0\nat(\"banana\"):      6\ndrawers: 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g lookups.cpp -o lookups",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./lookups",
      "out": "contains(\"apple\"): true\ncontains(\"kiwi\"):  false\ncount(\"apple\"):    1\ncount(\"kiwi\"):     0\nat(\"banana\"):      6\ndrawers: 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "maxel_empty.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v;   // empty\n    int top = *std::max_element(v.begin(), v.end());   // no check!\n    std::cout << \"top: \" << top << '\\n';\n}\n",
   "stdout": "",
   "stderr": "/usr/include/c++/13/bits/stl_iterator.h:1100:17: runtime error: reference binding to null pointer of type 'int'\n    #0 0x5555555591c4 in __gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >::operator*() const /usr/include/c++/13/bits/stl_iterator.h:1100\n    #1 0x555555558582 in main /home/you/cpp-ch14/maxel_empty.cpp:7\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x555555558324 in _start (/home/you/cpp-ch14/maxel_empty+0x4324) (BuildId: 11a9c03c066f53fcccbec0dd0df185c226d6a218)\n\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer maxel_empty.cpp -o maxel_empty",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "UBSAN_OPTIONS=print_stacktrace=1 ./maxel_empty",
     "out": "",
     "err": "/usr/include/c++/13/bits/stl_iterator.h:1100:17: runtime error: reference binding to null pointer of type 'int'\n    #0 0x5555555591c4 in __gnu_cxx::__normal_iterator<int*, std::vector<int, std::allocator<int> > >::operator*() const /usr/include/c++/13/bits/stl_iterator.h:1100\n    #1 0x555555558582 in main /home/you/cpp-ch14/maxel_empty.cpp:7\n    #2 0x7ffff682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58\n    #3 0x7ffff682a28a in __libc_start_main_impl ../csu/libc-start.c:360\n    #4 0x555555558324 in _start (/home/you/cpp-ch14/maxel_empty+0x4324) (BuildId: 11a9c03c066f53fcccbec0dd0df185c226d6a218)\n\n",
     "exit": 1
    }
   ]
  },
  "maxel_machine.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nvoid biggest(const std::string& label, const std::vector<int>& v) {\n    auto it = std::max_element(v.begin(), v.end());\n    if (it == v.end()) {\n        std::cout << label << \": empty, got end()\\n\";\n        return;\n    }\n    std::cout << label << \": \" << *it << \" at index \" << (it - v.begin()) << '\\n';\n}\n\nint main() {\n    biggest(\"{4, 9, 2}\", {4, 9, 2});\n    biggest(\"{7, 3, 7}\", {7, 3, 7});\n    biggest(\"{-5, -2, -9}\", {-5, -2, -9});\n    biggest(\"{42}\", {42});\n    biggest(\"{}\", {});\n}\n",
   "stdout": "{4, 9, 2}: 9 at index 1\n{7, 3, 7}: 7 at index 0\n{-5, -2, -9}: -2 at index 1\n{42}: 42 at index 0\n{}: empty, got end()\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g maxel_machine.cpp -o maxel_machine",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./maxel_machine",
     "out": "{4, 9, 2}: 9 at index 1\n{7, 3, 7}: 7 at index 0\n{-5, -2, -9}: -2 at index 1\n{42}: 42 at index 0\n{}: empty, got end()\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "{4, 9, 2}: 9 at index 1\n{7, 3, 7}: 7 at index 0\n{-5, -2, -9}: -2 at index 1\n{42}: 42 at index 0\n{}: empty, got end()\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g maxel_machine.cpp -o maxel_machine",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./maxel_machine",
      "out": "{4, 9, 2}: 9 at index 1\n{7, 3, 7}: 7 at index 0\n{-5, -2, -9}: -2 at index 1\n{42}: 42 at index 0\n{}: empty, got end()\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "not_captured.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> heights{120, 135, 142, 128, 150};\n    int lim = 130;\n    auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n    std::cout << tall << \" riders are at least \" << lim << \" cm\\n\";\n}\n",
   "stdout": "",
   "stderr": "not_captured.cpp: In lambda function:\nnot_captured.cpp:8:87: error: ‘lim’ is not captured\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                                       ^~~\nnot_captured.cpp:8:64: note: the lambda has no capture-default\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\nnot_captured.cpp:7:9: note: ‘int lim’ declared here\n    7 |     int lim = 130;\n      |         ^~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g not_captured.cpp -o not_captured",
     "out": "",
     "err": "not_captured.cpp: In lambda function:\nnot_captured.cpp:8:87: error: ‘lim’ is not captured\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                                       ^~~\nnot_captured.cpp:8:64: note: the lambda has no capture-default\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\nnot_captured.cpp:7:9: note: ‘int lim’ declared here\n    7 |     int lim = 130;\n      |         ^~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "not_captured.cpp:8:87: error: variable 'lim' cannot be implicitly captured in a lambda with no capture-default specified\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                                       ^\nnot_captured.cpp:7:9: note: 'lim' declared here\n    7 |     int lim = 130;\n      |         ^\nnot_captured.cpp:8:63: note: lambda expression begins here\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                               ^\nnot_captured.cpp:8:64: note: capture 'lim' by value\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                lim\nnot_captured.cpp:8:64: note: capture 'lim' by reference\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                &lim\nnot_captured.cpp:8:64: note: default capture by value\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                =\nnot_captured.cpp:8:64: note: default capture by reference\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                &\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g not_captured.cpp -o not_captured",
      "out": "",
      "err": "not_captured.cpp:8:87: error: variable 'lim' cannot be implicitly captured in a lambda with no capture-default specified\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                                       ^\nnot_captured.cpp:7:9: note: 'lim' declared here\n    7 |     int lim = 130;\n      |         ^\nnot_captured.cpp:8:63: note: lambda expression begins here\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                               ^\nnot_captured.cpp:8:64: note: capture 'lim' by value\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                lim\nnot_captured.cpp:8:64: note: capture 'lim' by reference\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                &lim\nnot_captured.cpp:8:64: note: default capture by value\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                =\nnot_captured.cpp:8:64: note: default capture by reference\n    8 |     auto tall = std::count_if(heights.begin(), heights.end(), [](int h) { return h >= lim; });\n      |                                                                ^\n      |                                                                &\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "ordered.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <set>\n#include <string>\n\nint main() {\n    std::map<std::string, int> rack;\n    rack[\"apple\"] = 1;\n    rack[\"banana\"] = 2;\n    rack[\"cherry\"] = 3;\n    rack[\"date\"] = 4;\n    for (const auto& [name, n] : rack) {\n        std::cout << name << '=' << n << ' ';\n    }\n    std::cout << '\\n';\n\n    std::set<int> badges{5, 1, 9, 3};\n    for (int b : badges) {\n        std::cout << b << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "apple=1 banana=2 cherry=3 date=4 \n1 3 5 9 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ordered.cpp -o ordered",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ordered",
     "out": "apple=1 banana=2 cherry=3 date=4 \n1 3 5 9 \n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "apple=1 banana=2 cherry=3 date=4 \n1 3 5 9 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ordered.cpp -o ordered",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ordered",
      "out": "apple=1 banana=2 cherry=3 date=4 \n1 3 5 9 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_find.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> lockers{{\"art\", 3}, {\"gym\", 14}};\n    auto it = lockers.find(\"gym\");\n    if (it != lockers.end()) {\n        std::cout << it->first << \" is locker \" << it->second << '\\n';\n    }\n}\n",
   "stdout": "gym is locker 14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_find.cpp -o parsons_find",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_find",
     "out": "gym is locker 14\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "gym is locker 14\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_find.cpp -o parsons_find",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_find",
      "out": "gym is locker 14\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "parsons_pipeline.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores{70, 95, 88, 61, 99};\n    scores.push_back(90);\n    std::ranges::sort(scores);\n    std::ranges::reverse(scores);\n    std::cout << \"top three: \" << scores[0] << ' ' << scores[1] << ' ' << scores[2] << '\\n';\n}\n",
   "stdout": "top three: 99 95 90\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g parsons_pipeline.cpp -o parsons_pipeline",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./parsons_pipeline",
     "out": "top three: 99 95 90\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "top three: 99 95 90\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g parsons_pipeline.cpp -o parsons_pipeline",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./parsons_pipeline",
      "out": "top three: 99 95 90\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "pile.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <utility>\n#include <vector>\n\nint main() {\n    // one big pile: every slip says ticket number and coat\n    std::vector<std::pair<int, std::string>> pile{\n        {12, \"red scarf\"}, {3, \"blue raincoat\"}, {7, \"green hat\"}};\n\n    int wanted = 7;\n    int looked = 0;\n    for (const auto& [ticket, coat] : pile) {\n        ++looked;\n        if (ticket == wanted) {\n            std::cout << \"Ticket 7: \" << coat << '\\n';\n        }\n    }\n    std::cout << \"Slips checked: \" << looked << '\\n';\n}\n",
   "stdout": "Ticket 7: green hat\nSlips checked: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g pile.cpp -o pile",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./pile",
     "out": "Ticket 7: green hat\nSlips checked: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ticket 7: green hat\nSlips checked: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g pile.cpp -o pile",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./pile",
      "out": "Ticket 7: green hat\nSlips checked: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "positions.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{40, 10, 30};\n    auto first = v.begin();\n    auto last = v.end() - 1;\n    std::cout << \"*begin()       = \" << *first << '\\n';\n    std::cout << \"*(end() - 1)   = \" << *last << '\\n';\n    std::cout << \"end() - begin() = \" << (v.end() - v.begin()) << '\\n';\n}\n",
   "stdout": "*begin()       = 40\n*(end() - 1)   = 30\nend() - begin() = 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g positions.cpp -o positions",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./positions",
     "out": "*begin()       = 40\n*(end() - 1)   = 30\nend() - begin() = 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "*begin()       = 40\n*(end() - 1)   = 30\nend() - begin() = 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g positions.cpp -o positions",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./positions",
      "out": "*begin()       = 40\n*(end() - 1)   = 30\nend() - begin() = 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_brackets.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> score;\n    score[\"Ada\"] = 3;\n    score[\"Bo\"] = 5;\n    score[\"Ada\"] = score[\"Ada\"] + 4;\n    score[\"Cy\"];\n    std::cout << score[\"Ada\"] << ' ' << score.size() << '\\n';\n}\n",
   "stdout": "7 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_brackets.cpp -o predict_brackets",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_brackets",
     "out": "7 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "7 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_brackets.cpp -o predict_brackets",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_brackets",
      "out": "7 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_capture.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v{2, 7, 4, 9, 5, 1};\n    int low = 3;\n    int high = 7;\n    auto inside = std::ranges::count_if(v, [low, high](int x) { return x >= low && x <= high; });\n    auto outside = std::ranges::count_if(v, [low](int x) { return x < low; });\n    std::cout << inside << ' ' << outside << '\\n';\n}\n",
   "stdout": "3 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_capture.cpp -o predict_capture",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_capture",
     "out": "3 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_capture.cpp -o predict_capture",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_capture",
      "out": "3 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_gadgets.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <numeric>\n#include <vector>\n\nint main() {\n    std::vector<int> marks{7, 3, 7, 10, 3, 7};\n    std::cout << std::count(marks.begin(), marks.end(), 7) << ' ';\n    std::cout << *std::min_element(marks.begin(), marks.end()) << ' ';\n    std::cout << std::accumulate(marks.begin(), marks.end(), 0) << '\\n';\n}\n",
   "stdout": "3 3 37\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_gadgets.cpp -o predict_gadgets",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_gadgets",
     "out": "3 3 37\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3 3 37\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_gadgets.cpp -o predict_gadgets",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_gadgets",
      "out": "3 3 37\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_lookup.cpp": {
   "src": "#include <iostream>\n#include <map>\n\nint main() {\n    std::map<char, int> grid{{'b', 2}, {'a', 1}};\n    std::cout << grid.count('c') << ' ';\n    std::cout << grid['c'] << ' ';\n    std::cout << grid.count('c') << ' ';\n    std::cout << grid.size() << '\\n';\n}\n",
   "stdout": "0 0 1 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_lookup.cpp -o predict_lookup",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_lookup",
     "out": "0 0 1 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "0 0 1 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_lookup.cpp -o predict_lookup",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_lookup",
      "out": "0 0 1 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_order.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> ages;\n    ages[\"Zoe\"] = 9;\n    ages[\"Ada\"] = 36;\n    ages[\"Max\"] = 12;\n    ages[\"Bea\"] = 7;\n\n    for (const auto& [name, age] : ages) {\n        std::cout << name << ' ' << age << '\\n';\n    }\n}\n",
   "stdout": "Ada 36\nBea 7\nMax 12\nZoe 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_order.cpp -o predict_order",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_order",
     "out": "Ada 36\nBea 7\nMax 12\nZoe 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Ada 36\nBea 7\nMax 12\nZoe 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_order.cpp -o predict_order",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_order",
      "out": "Ada 36\nBea 7\nMax 12\nZoe 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "predict_set.cpp": {
   "src": "#include <iostream>\n#include <set>\n\nint main() {\n    std::set<int> seen{4, 2, 4, 8, 2};\n    seen.insert(6);\n    seen.insert(8);\n    std::cout << seen.size() << ':';\n    for (int x : seen) {\n        std::cout << ' ' << x;\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "4: 2 4 6 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g predict_set.cpp -o predict_set",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./predict_set",
     "out": "4: 2 4 6 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "4: 2 4 6 8\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g predict_set.cpp -o predict_set",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./predict_set",
      "out": "4: 2 4 6 8\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "rack_order.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<int, std::string> coats;\n    coats[12] = \"red scarf\";\n    coats[3] = \"blue raincoat\";\n    coats[7] = \"green hat\";\n\n    for (const auto& [ticket, coat] : coats) {\n        std::cout << ticket << \": \" << coat << '\\n';\n    }\n}\n",
   "stdout": "3: blue raincoat\n7: green hat\n12: red scarf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g rack_order.cpp -o rack_order",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./rack_order",
     "out": "3: blue raincoat\n7: green hat\n12: red scarf\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3: blue raincoat\n7: green hat\n12: red scarf\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g rack_order.cpp -o rack_order",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./rack_order",
      "out": "3: blue raincoat\n7: green hat\n12: red scarf\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ranges_sort.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nvoid show(const char* label, const std::vector<int>& v) {\n    std::cout << label;\n    for (int x : v) {\n        std::cout << ' ' << x;\n    }\n    std::cout << '\\n';\n}\n\nint main() {\n    std::vector<int> v{5, 2, 8, 1};\n    std::ranges::sort(v);\n    show(\"sorted:  \", v);\n    std::ranges::reverse(v);\n    show(\"reversed:\", v);\n    std::cout << \"smallest: \" << *std::ranges::min_element(v) << '\\n';\n}\n",
   "stdout": "sorted:   1 2 5 8\nreversed: 8 5 2 1\nsmallest: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g ranges_sort.cpp -o ranges_sort",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./ranges_sort",
     "out": "sorted:   1 2 5 8\nreversed: 8 5 2 1\nsmallest: 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "sorted:   1 2 5 8\nreversed: 8 5 2 1\nsmallest: 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g ranges_sort.cpp -o ranges_sort",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./ranges_sort",
      "out": "sorted:   1 2 5 8\nreversed: 8 5 2 1\nsmallest: 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "raw_vs_algo.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> temps{14, 19, 11, 23, 17};\n\n    // carving your own spoon: a hand-written loop\n    int hottest = temps[0];\n    for (int t : temps) {\n        if (t > hottest) {\n            hottest = t;\n        }\n    }\n    std::cout << \"hand-made loop: \" << hottest << '\\n';\n\n    // taking the gadget out of the drawer\n    std::cout << \"max_element:    \" << *std::max_element(temps.begin(), temps.end()) << '\\n';\n}\n",
   "stdout": "hand-made loop: 23\nmax_element:    23\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g raw_vs_algo.cpp -o raw_vs_algo",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./raw_vs_algo",
     "out": "hand-made loop: 23\nmax_element:    23\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "hand-made loop: 23\nmax_element:    23\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g raw_vs_algo.cpp -o raw_vs_algo",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./raw_vs_algo",
      "out": "hand-made loop: 23\nmax_element:    23\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "remove_fixed.cpp": {
   "src": "#include <iostream>\n#include <vector>\n\nvoid show(const std::vector<int>& v) {\n    std::cout << v.size() << ':';\n    for (int x : v) {\n        std::cout << ' ' << x;\n    }\n    std::cout << '\\n';\n}\n\nint main() {\n    std::vector<int> v{1, 0, 2, 0, 3};\n    std::erase(v, 0);\n    show(v);\n}\n",
   "stdout": "3: 1 2 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g remove_fixed.cpp -o remove_fixed",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./remove_fixed",
     "out": "3: 1 2 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "3: 1 2 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g remove_fixed.cpp -o remove_fixed",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./remove_fixed",
      "out": "3: 1 2 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "remove_trap.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <vector>\n\nvoid show(const std::vector<int>& v) {\n    std::cout << v.size() << ':';\n    for (int x : v) {\n        std::cout << ' ' << x;\n    }\n    std::cout << '\\n';\n}\n\nint main() {\n    std::vector<int> v{1, 0, 2, 0, 3};\n    std::remove(v.begin(), v.end(), 0);\n    show(v);\n}\n",
   "stdout": "5: 1 2 3 0 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g remove_trap.cpp -o remove_trap",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./remove_trap",
     "out": "5: 1 2 3 0 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "5: 1 2 3 0 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g remove_trap.cpp -o remove_trap",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./remove_trap",
      "out": "5: 1 2 3 0 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_at.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    int n = fruit.at(\"kiwi\");\n    std::cout << \"at(\\\"kiwi\\\") gave \" << n << '\\n';\n}\n",
   "stdout": "",
   "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
   "exit": 134,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_at.cpp -o road_at",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_at",
     "out": "",
     "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
     "exit": 134
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
    "exit": 134,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_at.cpp -o road_at",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_at",
      "out": "",
      "err": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  map::at\nAborted\n",
      "exit": 134
     }
    ]
   }
  },
  "road_bracket.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    int n = fruit[\"kiwi\"];\n    std::cout << \"fruit[\\\"kiwi\\\"] gave \" << n << '\\n';\n    std::cout << \"drawers now: \" << fruit.size() << '\\n';\n}\n",
   "stdout": "fruit[\"kiwi\"] gave 0\ndrawers now: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_bracket.cpp -o road_bracket",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_bracket",
     "out": "fruit[\"kiwi\"] gave 0\ndrawers now: 2\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "fruit[\"kiwi\"] gave 0\ndrawers now: 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_bracket.cpp -o road_bracket",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_bracket",
      "out": "fruit[\"kiwi\"] gave 0\ndrawers now: 2\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_find.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    auto it = fruit.find(\"kiwi\");\n    if (it == fruit.end()) {\n        std::cout << \"find(\\\"kiwi\\\") gave end(): no such drawer\\n\";\n    }\n    std::cout << \"drawers now: \" << fruit.size() << '\\n';\n}\n",
   "stdout": "find(\"kiwi\") gave end(): no such drawer\ndrawers now: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_find.cpp -o road_find",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_find",
     "out": "find(\"kiwi\") gave end(): no such drawer\ndrawers now: 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "find(\"kiwi\") gave end(): no such drawer\ndrawers now: 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_find.cpp -o road_find",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_find",
      "out": "find(\"kiwi\") gave end(): no such drawer\ndrawers now: 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "road_found.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}};\n    std::cout << \"at(\\\"apple\\\") gave \" << fruit.at(\"apple\") << '\\n';\n    std::cout << \"drawers now: \" << fruit.size() << '\\n';\n}\n",
   "stdout": "at(\"apple\") gave 4\ndrawers now: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g road_found.cpp -o road_found",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./road_found",
     "out": "at(\"apple\") gave 4\ndrawers now: 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "at(\"apple\") gave 4\ndrawers now: 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g road_found.cpp -o road_found",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./road_found",
      "out": "at(\"apple\") gave 4\ndrawers now: 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "set_demo.cpp": {
   "src": "#include <iostream>\n#include <set>\n#include <string>\n\nint main() {\n    std::set<std::string> guests;\n    guests.insert(\"Zoe\");\n    guests.insert(\"Ada\");\n    guests.insert(\"Zoe\");\n    guests.insert(\"Max\");\n\n    std::cout << \"guests: \" << guests.size() << '\\n';\n    for (const auto& g : guests) {\n        std::cout << \"  \" << g << '\\n';\n    }\n    std::cout << std::boolalpha;\n    std::cout << \"Ada invited? \" << guests.contains(\"Ada\") << '\\n';\n    std::cout << \"Max added again? \" << guests.insert(\"Max\").second << '\\n';\n}\n",
   "stdout": "guests: 3\n  Ada\n  Max\n  Zoe\nAda invited? true\nMax added again? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g set_demo.cpp -o set_demo",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./set_demo",
     "out": "guests: 3\n  Ada\n  Max\n  Zoe\nAda invited? true\nMax added again? false\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "guests: 3\n  Ada\n  Max\n  Zoe\nAda invited? true\nMax added again? false\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g set_demo.cpp -o set_demo",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./set_demo",
      "out": "guests: 3\n  Ada\n  Max\n  Zoe\nAda invited? true\nMax added again? false\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "sort_lambda.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nstruct Student {\n    std::string name;\n    int score;\n};\n\nint main() {\n    std::vector<Student> group{{\"Ada\", 82}, {\"Bo\", 95}, {\"Cy\", 78}, {\"Di\", 88}};\n    std::ranges::sort(group, [](const Student& a, const Student& b) { return a.score > b.score; });\n    for (const auto& s : group) {\n        std::cout << s.name << ' ' << s.score << '\\n';\n    }\n}\n",
   "stdout": "Bo 95\nDi 88\nAda 82\nCy 78\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g sort_lambda.cpp -o sort_lambda",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./sort_lambda",
     "out": "Bo 95\nDi 88\nAda 82\nCy 78\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Bo 95\nDi 88\nAda 82\nCy 78\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g sort_lambda.cpp -o sort_lambda",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./sort_lambda",
      "out": "Bo 95\nDi 88\nAda 82\nCy 78\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_accumulate.cpp": {
   "src": "#include <iostream>\n#include <numeric>\n#include <vector>\n\nint main() {\n    std::vector<double> prices{2.5, 1.25, 0.75};\n    double total = std::accumulate(prices.begin(), prices.end(), 0);\n    std::cout << \"total: \" << total << '\\n';\n}\n",
   "stdout": "total: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_accumulate.cpp -o spot_accumulate",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_accumulate",
     "out": "total: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "total: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_accumulate.cpp -o spot_accumulate",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_accumulate",
      "out": "total: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_capture.cpp": {
   "src": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> words{\"map\", \"lambda\", \"set\", \"algorithm\"};\n    std::size_t longest = 5;\n    auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n    std::cout << n << \" long words\\n\";\n}\n",
   "stdout": "",
   "stderr": "spot_capture.cpp: In lambda function:\nspot_capture.cpp:9:101: error: ‘longest’ is not captured\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                                                                     ^~~~~~~\nspot_capture.cpp:9:57: note: the lambda has no capture-default\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\nspot_capture.cpp:8:17: note: ‘std::size_t longest’ declared here\n    8 |     std::size_t longest = 5;\n      |                 ^~~~~~~\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_capture.cpp -o spot_capture",
     "out": "",
     "err": "spot_capture.cpp: In lambda function:\nspot_capture.cpp:9:101: error: ‘longest’ is not captured\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                                                                     ^~~~~~~\nspot_capture.cpp:9:57: note: the lambda has no capture-default\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\nspot_capture.cpp:8:17: note: ‘std::size_t longest’ declared here\n    8 |     std::size_t longest = 5;\n      |                 ^~~~~~~\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "",
    "stderr": "spot_capture.cpp:9:101: error: variable 'longest' cannot be implicitly captured in a lambda with no capture-default specified\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                                                                     ^\nspot_capture.cpp:8:17: note: 'longest' declared here\n    8 |     std::size_t longest = 5;\n      |                 ^\nspot_capture.cpp:9:56: note: lambda expression begins here\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                        ^\nspot_capture.cpp:9:57: note: capture 'longest' by value\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         longest\nspot_capture.cpp:9:57: note: capture 'longest' by reference\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         &longest\nspot_capture.cpp:9:57: note: default capture by value\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         =\nspot_capture.cpp:9:57: note: default capture by reference\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         &\n1 error generated.\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_capture.cpp -o spot_capture",
      "out": "",
      "err": "spot_capture.cpp:9:101: error: variable 'longest' cannot be implicitly captured in a lambda with no capture-default specified\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                                                                     ^\nspot_capture.cpp:8:17: note: 'longest' declared here\n    8 |     std::size_t longest = 5;\n      |                 ^\nspot_capture.cpp:9:56: note: lambda expression begins here\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                        ^\nspot_capture.cpp:9:57: note: capture 'longest' by value\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         longest\nspot_capture.cpp:9:57: note: capture 'longest' by reference\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         &longest\nspot_capture.cpp:9:57: note: default capture by value\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         =\nspot_capture.cpp:9:57: note: default capture by reference\n    9 |     auto n = std::count_if(words.begin(), words.end(), [](const std::string& w) { return w.size() > longest; });\n      |                                                         ^\n      |                                                         &\n1 error generated.\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_typo.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> votes{{\"Ada\", 3}, {\"Bo\", 5}};\n    votes[\"Ada\"] += 1;\n    votes[\"Bo\"] += 2;\n    if (votes[\"Cy\"] > 0) {\n        std::cout << \"Cy got votes too\\n\";\n    }\n    std::cout << \"Candidates: \" << votes.size() << '\\n';\n}\n",
   "stdout": "Candidates: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g spot_typo.cpp -o spot_typo",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./spot_typo",
     "out": "Candidates: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "Candidates: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g spot_typo.cpp -o spot_typo",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./spot_typo",
      "out": "Candidates: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "tr_map.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> stock;\n    stock[\"pears\"] = 2;\n    stock[\"apples\"] = 5;\n    stock[\"apples\"] = 8;\n    std::cout << \"plums: \" << stock[\"plums\"] << '\\n';\n    std::cout << \"drawers: \" << stock.size() << '\\n';\n}\n",
   "stdout": "plums: 0\ndrawers: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g tr_map.cpp -o tr_map",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./tr_map",
     "out": "plums: 0\ndrawers: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "plums: 0\ndrawers: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g tr_map.cpp -o tr_map",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./tr_map",
      "out": "plums: 0\ndrawers: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "trace_counts.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> words{\"sun\", \"rain\", \"sun\", \"snow\", \"rain\", \"sun\"};\n    std::map<std::string, int> counts;\n    for (const auto& w : words) {\n        ++counts[w];\n        std::cout << w << ' ' << counts[w] << ' ' << counts.size() << '\\n';\n    }\n}\n",
   "stdout": "sun 1 1\nrain 1 2\nsun 2 2\nsnow 1 3\nrain 2 3\nsun 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g trace_counts.cpp -o trace_counts",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./trace_counts",
     "out": "sun 1 1\nrain 1 2\nsun 2 2\nsnow 1 3\nrain 2 3\nsun 3 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "sun 1 1\nrain 1 2\nsun 2 2\nsnow 1 3\nrain 2 3\nsun 3 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g trace_counts.cpp -o trace_counts",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./trace_counts",
      "out": "sun 1 1\nrain 1 2\nsun 2 2\nsnow 1 3\nrain 2 3\nsun 3 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "typo_trap.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> fruit{{\"apple\", 4}, {\"banana\", 6}, {\"cherry\", 9}};\n    std::cout << \"drawers before: \" << fruit.size() << '\\n';\n\n    std::cout << \"bananas: \" << fruit[\"bananna\"] << '\\n';   // a typo!\n    std::cout << \"drawers after: \" << fruit.size() << '\\n';\n\n    for (const auto& [name, n] : fruit) {\n        std::cout << \"  \" << name << \" = \" << n << '\\n';\n    }\n}\n",
   "stdout": "drawers before: 3\nbananas: 0\ndrawers after: 4\n  apple = 4\n  banana = 6\n  bananna = 0\n  cherry = 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g typo_trap.cpp -o typo_trap",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./typo_trap",
     "out": "drawers before: 3\nbananas: 0\ndrawers after: 4\n  apple = 4\n  banana = 6\n  bananna = 0\n  cherry = 9\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "drawers before: 3\nbananas: 0\ndrawers after: 4\n  apple = 4\n  banana = 6\n  bananna = 0\n  cherry = 9\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g typo_trap.cpp -o typo_trap",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./typo_trap",
      "out": "drawers before: 3\nbananas: 0\ndrawers after: 4\n  apple = 4\n  banana = 6\n  bananna = 0\n  cherry = 9\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "unordered.cpp": {
   "src": "#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n\nint main() {\n    std::unordered_map<std::string, int> bins;\n    bins[\"apple\"] = 1;\n    bins[\"banana\"] = 2;\n    bins[\"cherry\"] = 3;\n    bins[\"date\"] = 4;\n    for (const auto& [name, n] : bins) {\n        std::cout << name << '=' << n << ' ';\n    }\n    std::cout << '\\n';\n\n    std::unordered_set<int> badges{5, 1, 9, 3};\n    for (int b : badges) {\n        std::cout << b << ' ';\n    }\n    std::cout << '\\n';\n}\n",
   "stdout": "date=4 cherry=3 banana=2 apple=1 \n3 9 1 5 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g unordered.cpp -o unordered",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./unordered",
     "out": "date=4 cherry=3 banana=2 apple=1 \n3 9 1 5 \n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "date=4 cherry=3 banana=2 apple=1 \n3 9 1 5 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g unordered.cpp -o unordered",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./unordered",
      "out": "date=4 cherry=3 banana=2 apple=1 \n3 9 1 5 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "word_count.cpp": {
   "src": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\n\nint main() {\n    std::vector<std::string> words{\"red\", \"blue\", \"red\", \"green\", \"red\"};\n    std::map<std::string, int> counts;\n    for (const auto& w : words) {\n        ++counts[w];\n    }\n    for (const auto& [word, n] : counts) {\n        std::cout << word << \": \" << n << '\\n';\n    }\n}\n",
   "stdout": "blue: 1\ngreen: 1\nred: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g word_count.cpp -o word_count",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./word_count",
     "out": "blue: 1\ngreen: 1\nred: 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "blue: 1\ngreen: 1\nred: 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g word_count.cpp -o word_count",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./word_count",
      "out": "blue: 1\ngreen: 1\nred: 3\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
