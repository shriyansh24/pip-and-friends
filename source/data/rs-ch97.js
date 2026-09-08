/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "rust",
  "capturedWith": [
   "Rust 1.99.1 (edition 2024)",
   "Rust 1.97.0 (edition 2024)"
  ],
  "primary": "Rust 1.99.1 (edition 2024)",
  "date": "2026-11-08",
  "workdir": "/home/you/rust-ch97",
  "versionDifferences": [
   "tc.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): tc.rs."
 },
 "programs": {
  "tc.rs": {
   "src": "fn main() {\n    println!(\"hi\");\n}\n",
   "stdout": "rustfmt 1.10.0-stable (58cf8f9c35 2026-10-13)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo clippy --version",
     "out": "clippy 0.1.99 (58cf8f9c35 2026-10-13)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch97"
    },
    {
     "cmd": "cargo fmt --version",
     "out": "rustfmt 1.10.0-stable (58cf8f9c35 2026-10-13)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch97"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "rustfmt 1.9.0-stable (2d8144b788 2026-07-07)\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo clippy --version",
      "out": "clippy 0.1.97 (2d8144b788 2026-07-07)\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch97"
     },
     {
      "cmd": "cargo fmt --version",
      "out": "rustfmt 1.9.0-stable (2d8144b788 2026-07-07)\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch97"
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
