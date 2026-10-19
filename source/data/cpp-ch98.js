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
  "workdir": "/home/you/cpp-ch98",
  "versionDifferences": [],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. Outputs were identical."
 },
 "programs": {
  "cake.cpp": {
   "src": "#include <iostream>\nint main(){ std::cout << \"cake\\n\"; return 3; }\n",
   "stdout": "cake\n",
   "stderr": "",
   "exit": 3,
   "steps": [
    {
     "cmd": "g++ -std=c++23 -Wall -Wextra -g cake.cpp -o cake",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./cake",
     "out": "cake\n",
     "err": "",
     "exit": 3
    }
   ],
   "alt": {
    "version": "clang++ 18.1 (-std=c++23)",
    "stdout": "cake\n",
    "stderr": "",
    "exit": 3,
    "steps": [
     {
      "cmd": "clang++ -std=c++23 -Wall -Wextra -g cake.cpp -o cake",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "./cake",
      "out": "cake\n",
      "err": "",
      "exit": 3
     }
    ]
   }
  },
  "sess.cpp": {
   "src": "// session demo\nint main() {}\n",
   "stdout": "",
   "stderr": "bash: line 6: nosuchcmd: command not found\n",
   "exit": 127,
   "steps": [
    {
     "cmd": "mkdir -p kitchen && cd kitchen",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch98"
    },
    {
     "cmd": "pwd",
     "out": "/home/you/cpp-ch98/kitchen\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch98/kitchen"
    },
    {
     "cmd": "cp ../cake.cpp . && g++ cake.cpp -o cake",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch98/kitchen"
    },
    {
     "cmd": "./cake",
     "out": "cake\n",
     "err": "",
     "exit": 3,
     "dir": "~/cpp-ch98/kitchen"
    },
    {
     "cmd": "echo $?",
     "out": "3\n",
     "err": "",
     "exit": 0,
     "dir": "~/cpp-ch98/kitchen"
    },
    {
     "cmd": "nosuchcmd",
     "out": "",
     "err": "bash: line 6: nosuchcmd: command not found\n",
     "exit": 127,
     "dir": "~/cpp-ch98/kitchen"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
