/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "go",
  "capturedWith": [
   "Go 1.27.3",
   "Go 1.24.7"
  ],
  "primary": "Go 1.27.3",
  "date": "2026-11-08",
  "workdir": "/home/you/go-ch96",
  "versionDifferences": [],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. Outputs were identical."
 },
 "programs": {
  "main.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"shopmod/shop\"\n)\n\nfunc main() { fmt.Println(\"fee\", shop.Fee()) }\n",
   "stdout": "fee 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd shopmod",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch96"
    },
    {
     "cmd": "go run .",
     "out": "fee 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch96/shopmod"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
