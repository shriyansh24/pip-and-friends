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
  "workdir": "/home/you/rust-ch14",
  "versionDifferences": [
   "cargo_add.rs",
   "first_test.rs",
   "report.rs",
   "report_runs.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): cargo_add.rs, first_test.rs, report.rs, report_runs.rs."
 },
 "programs": {
  "annex.rs": {
   "src": "mod front_desk;\nmod stacks;\n\nfn main() {\n    front_desk::check_out(\"Owls\");\n    stacks::fiction::shelve(\"Dune\");\n}\n",
   "stdout": "checked out: Owls\n  (stamp)\nshelved: Dune\n  (old copy to the basement)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls -R src",
     "out": "src:\nfront_desk.rs\nmain.rs\nstacks\nstacks.rs\n\nsrc/stacks:\nfiction.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/annex"
    },
    {
     "cmd": "cargo run -q",
     "out": "checked out: Owls\n  (stamp)\nshelved: Dune\n  (old copy to the basement)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/annex"
    }
   ]
  },
  "annex/src/front_desk.rs": {
   "src": "pub fn check_out(title: &str) {\n    println!(\"checked out: {title}\");\n    stamp_card();\n}\n\nfn stamp_card() {\n    println!(\"  (stamp)\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "annex/src/stacks.rs": {
   "src": "pub mod fiction;\n\nmod basement {\n    pub fn store() {\n        println!(\"  (old copy to the basement)\");\n    }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "annex/src/stacks/fiction.rs": {
   "src": "pub fn shelve(title: &str) {\n    println!(\"shelved: {title}\");\n    super::basement::store();\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "assert_kinds.rs": {
   "src": "fn late_fee(days: u32) -> u32 {\n    if days == 0 { 0 } else { (days - 1) * 10 }\n}\n\nfn main() {\n    println!(\"a week late: fee {}\", late_fee(7));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn a_week_costs_less_than_100() {\n        assert!(late_fee(7) < 100);\n    }\n\n    #[test]\n    fn two_days_is_not_free() {\n        assert_ne!(late_fee(2), 0);\n    }\n\n    #[test]\n    fn a_month_is_capped() {\n        let fee = late_fee(30);\n        assert!(fee <= 50, \"30 days should cost at most 50, but cost {fee}\");\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::a_month_is_capped ... FAILED\ntest tests::a_week_costs_less_than_100 ... ok\ntest tests::two_days_is_not_free ... ok\n\nfailures:\n\n---- tests::a_month_is_capped stdout ----\n\nthread 'tests::a_month_is_capped' (…) panicked at src/main.rs:26:9:\n30 days should cost at most 50, but cost 290\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::a_month_is_capped\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "error: test failed, to rerun pass `--bin assert_kinds`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/assert_kinds"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 3 tests\ntest tests::a_month_is_capped ... FAILED\ntest tests::a_week_costs_less_than_100 ... ok\ntest tests::two_days_is_not_free ... ok\n\nfailures:\n\n---- tests::a_month_is_capped stdout ----\n\nthread 'tests::a_month_is_capped' (…) panicked at src/main.rs:26:9:\n30 days should cost at most 50, but cost 290\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::a_month_is_capped\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "error: test failed, to rerun pass `--bin assert_kinds`\n",
     "exit": 101,
     "dir": "~/rust-ch14/assert_kinds"
    }
   ]
  },
  "bad_path.rs": {
   "src": "mod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelve {title}\");\n        }\n    }\n}\n\nfn main() {\n    stacks::shelve(\"Dune\");\n}\n",
   "stdout": "",
   "stderr": "error[E0425]: cannot find function `shelve` in module `stacks`\n  --> src/main.rs:10:13\n   |\n10 |     stacks::shelve(\"Dune\");\n   |             ^^^^^^ not found in `stacks`\n   |\nhelp: consider importing this function\n   |\n 1 + use crate::stacks::fiction::shelve;\n   |\nhelp: if you import `shelve`, refer to it directly\n   |\n10 -     stacks::shelve(\"Dune\");\n10 +     shelve(\"Dune\");\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `bad_path` (bin \"bad_path\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0425]: cannot find function `shelve` in module `stacks`\n  --> src/main.rs:10:13\n   |\n10 |     stacks::shelve(\"Dune\");\n   |             ^^^^^^ not found in `stacks`\n   |\nhelp: consider importing this function\n   |\n 1 + use crate::stacks::fiction::shelve;\n   |\nhelp: if you import `shelve`, refer to it directly\n   |\n10 -     stacks::shelve(\"Dune\");\n10 +     shelve(\"Dune\");\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `bad_path` (bin \"bad_path\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/bad_path"
    }
   ]
  },
  "boss_error.rs": {
   "src": "mod shop {\n    struct Receipt {\n        pub total: u32,\n    }\n\n    pub fn buy() -> u32 {\n        let r = Receipt { total: 5 };\n        r.total\n    }\n}\n\nfn main() {\n    println!(\"paid {}\", shop::buy());\n    let r = shop::Receipt { total: 9 };\n    println!(\"{}\", r.total);\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: struct `Receipt` is private\n  --> src/main.rs:14:19\n   |\n14 |     let r = shop::Receipt { total: 9 };\n   |                   ^^^^^^^ private struct\n   |\nnote: the struct `Receipt` is defined here\n  --> src/main.rs:2:5\n   |\n 2 |     struct Receipt {\n   |     ^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: struct `Receipt` is private\n  --> src/main.rs:14:19\n   |\n14 |     let r = shop::Receipt { total: 9 };\n   |                   ^^^^^^^ private struct\n   |\nnote: the struct `Receipt` is defined here\n  --> src/main.rs:2:5\n   |\n 2 |     struct Receipt {\n   |     ^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/boss_error"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "mod cinema {\n    pub struct Seat {\n        pub row: char,\n        pub number: u32,\n    }\n\n    pub mod box_office {\n        pub fn sell(row: char, number: u32) -> super::Seat {\n            super::Seat { row, number }\n        }\n    }\n}\n\nuse cinema::box_office;\n\nfn main() {\n    let seat = box_office::sell('F', 7);\n    println!(\"seat {}{}\", seat.row, seat.number);\n}\n",
   "stdout": "seat F7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "seat F7\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "fn triple(n: u32) -> u32 {\n    n * 3\n}\n\nfn main() {\n    println!(\"{}\", triple(5));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn triples_four() {\n        assert_eq!(triple(4), 12);\n    }\n}\n",
   "stdout": "\nrunning 1 test\ntest tests::triples_four ... ok\n\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/boss_parsons"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 1 test\ntest tests::triples_four ... ok\n\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "mod zoo {\n    fn count() -> u32 {\n        2\n    }\n\n    pub mod reptiles {\n        pub fn visit(name: &str) -> u32 {\n            println!(\"hello, {name}\");\n            super::count() + 1\n        }\n    }\n\n    pub fn tour() -> u32 {\n        let a = reptiles::visit(\"gecko\");\n        let b = self::reptiles::visit(\"newt\");\n        a + b + count()\n    }\n}\n\nuse zoo::reptiles::visit;\n\nfn main() {\n    let total = zoo::tour();\n    println!(\"total {total}\");\n    println!(\"{}\", visit(\"toad\") * 10);\n}\n",
   "stdout": "hello, gecko\nhello, newt\ntotal 8\nhello, toad\n30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hello, gecko\nhello, newt\ntotal 8\nhello, toad\n30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "mod museum {\n    pub mod hall {\n        pub fn enter() {\n            println!(\"enter the hall\");\n            super::vault::peek();\n        }\n    }\n\n    mod vault {\n        pub fn peek() {\n            println!(\"peek at the vault\");\n        }\n    }\n}\n\nfn main() {\n    museum::hall::enter();\n    museum::vault::peek();\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: module `vault` is private\n  --> src/main.rs:18:13\n   |\n18 |     museum::vault::peek();\n   |             ^^^^^  ---- function `peek` is not publicly re-exported\n   |             |\n   |             private module\n   |\nnote: the module `vault` is defined here\n  --> src/main.rs:9:5\n   |\n 9 |     mod vault {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: module `vault` is private\n  --> src/main.rs:18:13\n   |\n18 |     museum::vault::peek();\n   |             ^^^^^  ---- function `peek` is not publicly re-exported\n   |             |\n   |             private module\n   |\nnote: the module `vault` is defined here\n  --> src/main.rs:9:5\n   |\n 9 |     mod vault {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "mod bank {\n    pub mod rules {\n        pub fn fee(days: u32) -> u32 {\n            if days == 0 { 0 } else { (days - 1) * 10 }\n        }\n    }\n\n    pub fn pay(wallet: u32, days: u32) -> u32 {\n        wallet - rules::fee(days)\n    }\n}\n\nuse bank::rules;\n\nfn main() {\n    let mut wallet = 100;\n    for days in [1, 3, 2, 4] {\n        wallet = bank::pay(wallet, days);\n        println!(\"{} {} {}\", days, rules::fee(days), wallet);\n    }\n}\n",
   "stdout": "1 0 100\n3 20 80\n2 10 70\n4 30 40\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 0 100\n3 20 80\n2 10 70\n4 30 40\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/boss_trace"
    }
   ]
  },
  "branch.rs": {
   "src": "use branch::catalog;\n\nfn main() {\n    for title in [\"Dune\", \"Moby\"] {\n        match catalog::find(title) {\n            Some(shelf) => println!(\"{title}: shelf {shelf}\"),\n            None => println!(\"{title}: not here\"),\n        }\n    }\n}\n",
   "stdout": "Dune: shelf 12\nMoby: not here\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls src",
     "out": "lib.rs\nmain.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/branch"
    },
    {
     "cmd": "cargo run -q",
     "out": "Dune: shelf 12\nMoby: not here\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/branch"
    }
   ]
  },
  "branch/src/lib.rs": {
   "src": "pub mod catalog {\n    pub fn find(title: &str) -> Option<u32> {\n        match title {\n            \"Dune\" => Some(12),\n            \"Emma\" => Some(31),\n            _ => None,\n        }\n    }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cargo_add.rs": {
   "src": "// This program is the terminal session in cargo_add.cmd (cargo new, cargo add, and a look at Cargo.toml and Cargo.lock).\n",
   "stdout": "name = \"rand\"\nversion = \"0.10.3\"\n",
   "stderr": "    Creating binary (application) `dice_box` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to highest Rust 1.99.1 compatible versions\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo new dice_box",
     "out": "",
     "err": "    Creating binary (application) `dice_box` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "cd dice_box",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "cargo add rand",
     "out": "",
     "err": "    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to highest Rust 1.99.1 compatible versions\n",
     "exit": 0,
     "dir": "~/dice_box"
    },
    {
     "cmd": "tail -2 Cargo.toml",
     "out": "[dependencies]\nrand = \"0.10.3\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/dice_box"
    },
    {
     "cmd": "grep -A1 'name = \"rand\"' Cargo.lock",
     "out": "name = \"rand\"\nversion = \"0.10.3\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/dice_box"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "name = \"rand\"\nversion = \"0.10.3\"\n",
    "stderr": "    Creating binary (application) `dice_box` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to latest Rust 1.97.0 compatible versions\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo new dice_box",
      "out": "",
      "err": "    Creating binary (application) `dice_box` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n",
      "exit": 0,
      "dir": "~"
     },
     {
      "cmd": "cd dice_box",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~"
     },
     {
      "cmd": "cargo add rand",
      "out": "",
      "err": "    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to latest Rust 1.97.0 compatible versions\n",
      "exit": 0,
      "dir": "~/dice_box"
     },
     {
      "cmd": "tail -2 Cargo.toml",
      "out": "[dependencies]\nrand = \"0.10.3\"\n",
      "err": "",
      "exit": 0,
      "dir": "~/dice_box"
     },
     {
      "cmd": "grep -A1 'name = \"rand\"' Cargo.lock",
      "out": "name = \"rand\"\nversion = \"0.10.3\"\n",
      "err": "",
      "exit": 0,
      "dir": "~/dice_box"
     }
    ]
   }
  },
  "dice.rs": {
   "src": "use rand::rngs::StdRng;\nuse rand::{RngExt, SeedableRng};\n\nfn main() {\n    let mut rng = StdRng::seed_from_u64(7);\n    for turn in 1..=5 {\n        let roll = rng.random_range(1..=6);\n        println!(\"turn {turn}: rolled {roll}\");\n    }\n}\n",
   "stdout": "turn 1: rolled 3\nturn 2: rolled 1\nturn 3: rolled 1\nturn 4: rolled 2\nturn 5: rolled 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "turn 1: rolled 3\nturn 2: rolled 1\nturn 3: rolled 1\nturn 4: rolled 2\nturn 5: rolled 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/dice"
    }
   ]
  },
  "door_basement.rs": {
   "src": "mod front_desk {\n    pub fn check_out(title: &str) {\n        println!(\"checked out: {title}\");\n        stamp_card();\n    }\n\n    fn stamp_card() {\n        println!(\"  (stamp)\");\n    }\n}\n\nmod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelved: {title}\");\n            super::basement::store();\n        }\n    }\n\n    mod basement {\n        pub fn store() {\n            println!(\"  (old copy to the basement)\");\n        }\n    }\n}\n\nfn main() {\n    stacks::basement::store();\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: module `basement` is private\n  --> src/main.rs:28:13\n   |\n28 |     stacks::basement::store();\n   |             ^^^^^^^^  ----- function `store` is not publicly re-exported\n   |             |\n   |             private module\n   |\nnote: the module `basement` is defined here\n  --> src/main.rs:20:5\n   |\n20 |     mod basement {\n   |     ^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `door_basement` (bin \"door_basement\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: module `basement` is private\n  --> src/main.rs:28:13\n   |\n28 |     stacks::basement::store();\n   |             ^^^^^^^^  ----- function `store` is not publicly re-exported\n   |             |\n   |             private module\n   |\nnote: the module `basement` is defined here\n  --> src/main.rs:20:5\n   |\n20 |     mod basement {\n   |     ^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `door_basement` (bin \"door_basement\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/door_basement"
    }
   ]
  },
  "door_machine.rs": {
   "src": "mod front_desk {\n    pub fn check_out(title: &str) -> String {\n        format!(\"checked out {title}\")\n    }\n\n    pub struct Card {\n        pub owner: String,\n        pin: u32,\n    }\n\n    impl Card {\n        pub fn new(owner: &str) -> Card {\n            Card { owner: owner.to_string(), pin: 1234 }\n        }\n\n        pub fn pin_ok(&self, guess: u32) -> bool {\n            self.pin == guess\n        }\n    }\n\n    pub enum Level {\n        Junior,\n        Adult,\n    }\n}\n\nuse front_desk::{Card, Level};\n\nfn main() {\n    println!(\"1. {}\", front_desk::check_out(\"Owls\"));\n    let card = Card::new(\"Ada\");\n    println!(\"2. Card::new made a card for {}\", card.owner);\n    println!(\"3. card.owner is {}\", card.owner);\n    println!(\"4. card.pin_ok(1234) is {}\", card.pin_ok(1234));\n    for level in [Level::Junior, Level::Adult] {\n        match level {\n            Level::Junior => println!(\"5. Level::Junior is allowed\"),\n            Level::Adult => println!(\"6. Level::Adult is allowed\"),\n        }\n    }\n}\n",
   "stdout": "1. checked out Owls\n2. Card::new made a card for Ada\n3. card.owner is Ada\n4. card.pin_ok(1234) is true\n5. Level::Junior is allowed\n6. Level::Adult is allowed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1. checked out Owls\n2. Card::new made a card for Ada\n3. card.owner is Ada\n4. card.pin_ok(1234) is true\n5. Level::Junior is allowed\n6. Level::Adult is allowed\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/door_machine"
    }
   ]
  },
  "door_stamp.rs": {
   "src": "mod front_desk {\n    pub fn check_out(title: &str) {\n        println!(\"checked out: {title}\");\n        stamp_card();\n    }\n\n    fn stamp_card() {\n        println!(\"  (stamp)\");\n    }\n}\n\nmod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelved: {title}\");\n            super::basement::store();\n        }\n    }\n\n    mod basement {\n        pub fn store() {\n            println!(\"  (old copy to the basement)\");\n        }\n    }\n}\n\nfn main() {\n    front_desk::stamp_card();\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: function `stamp_card` is private\n  --> src/main.rs:28:17\n   |\n28 |     front_desk::stamp_card();\n   |                 ^^^^^^^^^^ private function\n   |\nnote: the function `stamp_card` is defined here\n  --> src/main.rs:7:5\n   |\n 7 |     fn stamp_card() {\n   |     ^^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `door_stamp` (bin \"door_stamp\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: function `stamp_card` is private\n  --> src/main.rs:28:17\n   |\n28 |     front_desk::stamp_card();\n   |                 ^^^^^^^^^^ private function\n   |\nnote: the function `stamp_card` is defined here\n  --> src/main.rs:7:5\n   |\n 7 |     fn stamp_card() {\n   |     ^^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `door_stamp` (bin \"door_stamp\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/door_stamp"
    }
   ]
  },
  "fee_fail.rs": {
   "src": "// Rule: the first day late is free, then 10 a day.\nfn late_fee(days: u32) -> u32 {\n    if days <= 1 { 0 } else { days * 10 }\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n\n    #[test]\n    fn first_day_is_free() {\n        assert_eq!(late_fee(1), 0);\n    }\n\n    #[test]\n    fn three_days_costs_twenty() {\n        assert_eq!(late_fee(3), 20);\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (…) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "error: test failed, to rerun pass `--bin fee_fail`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fee_fail"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (…) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "error: test failed, to rerun pass `--bin fee_fail`\n",
     "exit": 101,
     "dir": "~/rust-ch14/fee_fail"
    }
   ]
  },
  "fee_pass.rs": {
   "src": "// Rule: the first day late is free, then 10 a day.\nfn late_fee(days: u32) -> u32 {\n    if days <= 1 { 0 } else { (days - 1) * 10 }\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n\n    #[test]\n    fn first_day_is_free() {\n        assert_eq!(late_fee(1), 0);\n    }\n\n    #[test]\n    fn three_days_costs_twenty() {\n        assert_eq!(late_fee(3), 20);\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... ok\n\ntest result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fee_pass"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... ok\n\ntest result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fee_pass"
    }
   ]
  },
  "fill_assert.rs": {
   "src": "fn double(n: u32) -> u32 {\n    n * 2\n}\n\nfn main() {\n    println!(\"{}\", double(21));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn doubles_ten() {\n        assert_eq!(double(10), 20);\n    }\n}\n",
   "stdout": "\nrunning 1 test\ntest tests::doubles_ten ... ok\n\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fill_assert"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 1 test\ntest tests::doubles_ten ... ok\n\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fill_assert"
    }
   ]
  },
  "fill_pub.rs": {
   "src": "mod lobby {\n    pub fn open() {\n        println!(\"doors open\");\n    }\n\n    pub mod lifts {\n        pub fn up(floor: u32) {\n            println!(\"going up to {floor}\");\n        }\n    }\n}\n\nfn main() {\n    lobby::open();\n    lobby::lifts::up(3);\n}\n",
   "stdout": "doors open\ngoing up to 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "doors open\ngoing up to 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fill_pub"
    }
   ]
  },
  "fill_super.rs": {
   "src": "mod kitchen {\n    fn wash() {\n        println!(\"wash the cups\");\n    }\n\n    pub mod counter {\n        pub fn serve() {\n            super::wash();\n            println!(\"serve the tea\");\n        }\n    }\n}\n\nfn main() {\n    kitchen::counter::serve();\n}\n",
   "stdout": "wash the cups\nserve the tea\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "wash the cups\nserve the tea\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/fill_super"
    }
   ]
  },
  "first_room.rs": {
   "src": "mod front_desk {\n    pub fn welcome() {\n        println!(\"Welcome to the library!\");\n    }\n}\n\nfn main() {\n    front_desk::welcome();\n    println!(\"(main is in the lobby)\");\n    front_desk::welcome();\n}\n",
   "stdout": "Welcome to the library!\n(main is in the lobby)\nWelcome to the library!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Welcome to the library!\n(main is in the lobby)\nWelcome to the library!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/first_room"
    }
   ]
  },
  "first_test.rs": {
   "src": "fn late_fee(days: u32) -> u32 {\n    days * 10\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn one_day_costs_ten() {\n        assert_eq!(late_fee(1), 10);\n    }\n\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n}\n",
   "stdout": "\nrunning 2 tests\ntest tests::one_day_costs_ten ... ok\ntest tests::no_days_is_free ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
   "stderr": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.01s\n     Running unittests src/main.rs (target/debug/deps/first_test-10e9bae9a8d91876)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 days late: fee 30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/first_test"
    },
    {
     "cmd": "cargo test",
     "out": "\nrunning 2 tests\ntest tests::one_day_costs_ten ... ok\ntest tests::no_days_is_free ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
     "err": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.01s\n     Running unittests src/main.rs (target/debug/deps/first_test-10e9bae9a8d91876)\n",
     "exit": 0,
     "dir": "~/rust-ch14/first_test",
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "\nrunning 2 tests\ntest tests::no_days_is_free ... ok\ntest tests::one_day_costs_ten ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
    "stderr": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.01s\n     Running unittests src/main.rs (target/debug/deps/first_test-6a5ec80947559c81)\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "3 days late: fee 30\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch14/first_test"
     },
     {
      "cmd": "cargo test",
      "out": "\nrunning 2 tests\ntest tests::no_days_is_free ... ok\ntest tests::one_day_costs_ten ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
      "err": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.01s\n     Running unittests src/main.rs (target/debug/deps/first_test-6a5ec80947559c81)\n",
      "exit": 0,
      "dir": "~/rust-ch14/first_test",
      "merged": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.01s\n     Running unittests src/main.rs (target/debug/deps/first_test-6a5ec80947559c81)\n\nrunning 2 tests\ntest tests::no_days_is_free ... ok\ntest tests::one_day_costs_ten ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n"
     }
    ]
   }
  },
  "forgot.rs": {
   "src": "fn main() {\n    println!(\"opening up\");\n    helpers::greet(\"Ada\");\n}\n",
   "stdout": "",
   "stderr": "error[E0433]: cannot find module or crate `helpers` in this scope\n --> src/main.rs:3:5\n  |\n3 |     helpers::greet(\"Ada\");\n  |     ^^^^^^^ use of unresolved module or unlinked crate `helpers`\n  |\nhelp: to make use of source file src/helpers.rs, use `mod helpers` in this file to declare the module\n  |\n1 + mod helpers;\n  |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `forgot` (bin \"forgot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "ls src",
     "out": "helpers.rs\nmain.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/forgot"
    },
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0433]: cannot find module or crate `helpers` in this scope\n --> src/main.rs:3:5\n  |\n3 |     helpers::greet(\"Ada\");\n  |     ^^^^^^^ use of unresolved module or unlinked crate `helpers`\n  |\nhelp: to make use of source file src/helpers.rs, use `mod helpers` in this file to declare the module\n  |\n1 + mod helpers;\n  |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `forgot` (bin \"forgot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/forgot"
    }
   ]
  },
  "forgot/src/helpers.rs": {
   "src": "pub fn greet(name: &str) {\n    println!(\"hello, {name}\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "forgot_super.rs": {
   "src": "// Rule: the first day late is free, then 10 a day.\nfn late_fee(days: u32) -> u32 {\n    if days <= 1 { 0 } else { (days - 1) * 10 }\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n\n    #[test]\n    fn first_day_is_free() {\n        assert_eq!(late_fee(1), 0);\n    }\n\n    #[test]\n    fn three_days_costs_twenty() {\n        assert_eq!(late_fee(3), 20);\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:14:20\n   |\n14 |         assert_eq!(late_fee(0), 0);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nerror[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:19:20\n   |\n19 |         assert_eq!(late_fee(1), 0);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nerror[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:24:20\n   |\n24 |         assert_eq!(late_fee(3), 20);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `forgot_super` (bin \"forgot_super\" test) due to 3 previous errors\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/forgot_super"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "",
     "err": "error[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:14:20\n   |\n14 |         assert_eq!(late_fee(0), 0);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nerror[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:19:20\n   |\n19 |         assert_eq!(late_fee(1), 0);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nerror[E0425]: cannot find function `late_fee` in this scope\n  --> src/main.rs:24:20\n   |\n24 |         assert_eq!(late_fee(3), 20);\n   |                    ^^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n12 +     use crate::late_fee;\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `forgot_super` (bin \"forgot_super\" test) due to 3 previous errors\n",
     "exit": 101,
     "dir": "~/rust-ch14/forgot_super"
    }
   ]
  },
  "ghostfile.rs": {
   "src": "fn main() {\n    println!(\"the library is open\");\n}\n",
   "stdout": "the library is open\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls src",
     "out": "main.rs\nnotes.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/ghostfile"
    },
    {
     "cmd": "cat src/notes.rs",
     "out": "// half-finished ideas, not declared with `mod notes;` anywhere\nfn late_fees( {\n    this is not even Rust\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/ghostfile"
    },
    {
     "cmd": "cargo run -q",
     "out": "the library is open\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/ghostfile"
    }
   ]
  },
  "ghostfile/src/notes.rs": {
   "src": "// half-finished ideas, not declared with `mod notes;` anywhere\nfn late_fees( {\n    this is not even Rust\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "hood.rs": {
   "src": "mod stacks {\n    pub fn whereami() {\n        println!(\"{}\", module_path!());\n    }\n\n    pub mod fiction {\n        pub fn whereami() {\n            println!(\"{}\", module_path!());\n        }\n    }\n}\n\nfn main() {\n    println!(\"{}\", module_path!());\n    stacks::whereami();\n    stacks::fiction::whereami();\n}\n",
   "stdout": "hood\nhood::stacks\nhood::stacks::fiction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hood\nhood::stacks\nhood::stacks::fiction\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/hood"
    }
   ]
  },
  "library.rs": {
   "src": "mod front_desk {\n    pub fn check_out(title: &str) {\n        println!(\"checked out: {title}\");\n        stamp_card();\n    }\n\n    fn stamp_card() {\n        println!(\"  (stamp)\");\n    }\n}\n\nmod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelved: {title}\");\n            super::basement::store();\n        }\n    }\n\n    mod basement {\n        pub fn store() {\n            println!(\"  (old copy to the basement)\");\n        }\n    }\n}\n\nfn main() {\n    front_desk::check_out(\"Owls\");\n    stacks::fiction::shelve(\"Dune\");\n}\n",
   "stdout": "checked out: Owls\n  (stamp)\nshelved: Dune\n  (old copy to the basement)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "checked out: Owls\n  (stamp)\nshelved: Dune\n  (old copy to the basement)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/library"
    }
   ]
  },
  "literal_card.rs": {
   "src": "mod members {\n    pub struct Card {\n        pub owner: String,\n        pin: u32,\n    }\n\n    impl Card {\n        pub fn new(owner: &str) -> Card {\n            Card { owner: owner.to_string(), pin: 1234 }\n        }\n\n        pub fn check(&self, guess: u32) -> bool {\n            self.pin == guess\n        }\n    }\n}\n\nuse members::Card;\n\nfn main() {\n    let mine = Card::new(\"Mabel\");\n    println!(\"pin ok? {}\", mine.check(1234));\n    let card = Card { owner: String::from(\"Ada\"), pin: 0 };\n    println!(\"owner: {}\", card.owner);\n}\n",
   "stdout": "",
   "stderr": "error[E0451]: field `pin` of struct `Card` is private\n  --> src/main.rs:23:51\n   |\n23 |     let card = Card { owner: String::from(\"Ada\"), pin: 0 };\n   |                                                   ^^^ private field\n\nFor more information about this error, try `rustc --explain E0451`.\nerror: could not compile `literal_card` (bin \"literal_card\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0451]: field `pin` of struct `Card` is private\n  --> src/main.rs:23:51\n   |\n23 |     let card = Card { owner: String::from(\"Ada\"), pin: 0 };\n   |                                                   ^^^ private field\n\nFor more information about this error, try `rustc --explain E0451`.\nerror: could not compile `literal_card` (bin \"literal_card\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/literal_card"
    }
   ]
  },
  "missing.rs": {
   "src": "mod stock;\n\nfn main() {\n    stock::count();\n}\n",
   "stdout": "",
   "stderr": "error[E0583]: file not found for module `stock`\n --> src/main.rs:1:1\n  |\n1 | mod stock;\n  | ^^^^^^^^^^\n  |\n  = help: to create the module `stock`, create file \"src/stock.rs\" or \"src/stock/mod.rs\"\n  = note: if there is a `mod stock` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `missing` (bin \"missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "ls src",
     "out": "main.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/missing"
    },
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0583]: file not found for module `stock`\n --> src/main.rs:1:1\n  |\n1 | mod stock;\n  | ^^^^^^^^^^\n  |\n  = help: to create the module `stock`, create file \"src/stock.rs\" or \"src/stock/mod.rs\"\n  = note: if there is a `mod stock` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `missing` (bin \"missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/missing"
    }
   ]
  },
  "neighbours.rs": {
   "src": "mod front_desk {\n    fn stamp_card() {\n        println!(\"  *stamp*\");\n    }\n\n    pub fn check_out(title: &str) {\n        println!(\"Checking out {title}\");\n        stamp_card();\n    }\n\n    pub mod returns {\n        pub fn take_back(title: &str) {\n            println!(\"Taking back {title}\");\n            super::stamp_card();\n        }\n    }\n}\n\nfn main() {\n    front_desk::check_out(\"Owls\");\n    front_desk::returns::take_back(\"Moths\");\n}\n",
   "stdout": "Checking out Owls\n  *stamp*\nTaking back Moths\n  *stamp*\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Checking out Owls\n  *stamp*\nTaking back Moths\n  *stamp*\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/neighbours"
    }
   ]
  },
  "oldstyle.rs": {
   "src": "mod stacks;\n\nfn main() {\n    stacks::fiction::shelve(\"Dune\");\n}\n",
   "stdout": "shelved: Dune (from stacks/mod.rs)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls -R src",
     "out": "src:\nmain.rs\nstacks\n\nsrc/stacks:\nfiction.rs\nmod.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/oldstyle"
    },
    {
     "cmd": "cargo run -q",
     "out": "shelved: Dune (from stacks/mod.rs)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/oldstyle"
    }
   ]
  },
  "oldstyle/src/stacks/mod.rs": {
   "src": "pub mod fiction;\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "oldstyle/src/stacks/fiction.rs": {
   "src": "pub fn shelve(title: &str) {\n    println!(\"shelved: {title} (from stacks/mod.rs)\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "parsons_tree.rs": {
   "src": "mod garden {\n    pub mod pond {\n        pub fn feed() {\n            println!(\"feed the fish\");\n        }\n    }\n}\n\nuse garden::pond;\n\nfn main() {\n    pond::feed();\n}\n",
   "stdout": "feed the fish\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "feed the fish\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/parsons_tree"
    }
   ]
  },
  "paths.rs": {
   "src": "mod stacks {\n    pub fn tidy() {\n        println!(\"tidy the stacks\");\n    }\n\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelve {title}\");\n            super::tidy();\n            self::label(title);\n        }\n\n        fn label(title: &str) {\n            println!(\"label FIC-{}\", title.len());\n        }\n    }\n}\n\nfn main() {\n    crate::stacks::fiction::shelve(\"Dune\");\n    stacks::tidy();\n}\n",
   "stdout": "shelve Dune\ntidy the stacks\nlabel FIC-4\ntidy the stacks\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelve Dune\ntidy the stacks\nlabel FIC-4\ntidy the stacks\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/paths"
    }
   ]
  },
  "predict_e0425.rs": {
   "src": "fn tickets(people: u32) -> u32 {\n    people * 2\n}\n\nfn main() {\n    println!(\"{}\", tickets(3));\n}\n\n#[cfg(test)]\nmod tests {\n    #[test]\n    fn two_each() {\n        assert_eq!(tickets(3), 6);\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0425]: cannot find function `tickets` in this scope\n  --> src/main.rs:13:20\n   |\n13 |         assert_eq!(tickets(3), 6);\n   |                    ^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n11 +     use crate::tickets;\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `predict_e0425` (bin \"predict_e0425\" test) due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/predict_e0425"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "",
     "err": "error[E0425]: cannot find function `tickets` in this scope\n  --> src/main.rs:13:20\n   |\n13 |         assert_eq!(tickets(3), 6);\n   |                    ^^^^^^^ not found in this scope\n   |\nhelp: consider importing this function\n   |\n11 +     use crate::tickets;\n   |\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `predict_e0425` (bin \"predict_e0425\" test) due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/predict_e0425"
    }
   ]
  },
  "predict_field.rs": {
   "src": "mod garden {\n    pub struct Plant {\n        pub name: String,\n        water: u32,\n    }\n}\n\nfn main() {\n    let p = garden::Plant { name: String::from(\"fern\"), water: 2 };\n    println!(\"{}\", p.name);\n}\n",
   "stdout": "",
   "stderr": "warning: field `water` is never read\n --> src/main.rs:4:9\n  |\n2 |     pub struct Plant {\n  |                ----- field in this struct\n3 |         pub name: String,\n4 |         water: u32,\n  |         ^^^^^\n  |\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\nerror[E0451]: field `water` of struct `Plant` is private\n --> src/main.rs:9:57\n  |\n9 |     let p = garden::Plant { name: String::from(\"fern\"), water: 2 };\n  |                                                         ^^^^^ private field\n\nFor more information about this error, try `rustc --explain E0451`.\nerror: could not compile `predict_field` (bin \"predict_field\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "warning: field `water` is never read\n --> src/main.rs:4:9\n  |\n2 |     pub struct Plant {\n  |                ----- field in this struct\n3 |         pub name: String,\n4 |         water: u32,\n  |         ^^^^^\n  |\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\nerror[E0451]: field `water` of struct `Plant` is private\n --> src/main.rs:9:57\n  |\n9 |     let p = garden::Plant { name: String::from(\"fern\"), water: 2 };\n  |                                                         ^^^^^ private field\n\nFor more information about this error, try `rustc --explain E0451`.\nerror: could not compile `predict_field` (bin \"predict_field\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch14/predict_field"
    }
   ]
  },
  "predict_paths.rs": {
   "src": "mod hall {\n    pub fn lights() -> u32 {\n        3\n    }\n\n    pub mod stage {\n        pub fn show() {\n            let n = super::lights();\n            println!(\"{n} lights on\");\n            self::bow(n);\n        }\n\n        fn bow(times: u32) {\n            for _ in 0..times {\n                print!(\"bow \");\n            }\n            println!();\n        }\n    }\n}\n\nuse hall::stage;\n\nfn main() {\n    stage::show();\n    println!(\"{}\", crate::hall::lights() + 1);\n}\n",
   "stdout": "3 lights on\nbow bow bow \n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 lights on\nbow bow bow \n4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/predict_paths"
    }
   ]
  },
  "predict_rooms.rs": {
   "src": "mod cafe {\n    fn brew() -> String {\n        String::from(\"tea\")\n    }\n\n    pub fn order(n: u32) {\n        println!(\"{n} x {}\", brew());\n    }\n\n    pub mod garden {\n        pub fn sit() {\n            println!(\"sit outside\");\n            super::order(2);\n        }\n    }\n}\n\nfn main() {\n    cafe::order(1);\n    cafe::garden::sit();\n    println!(\"done\");\n}\n",
   "stdout": "1 x tea\nsit outside\n2 x tea\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 x tea\nsit outside\n2 x tea\ndone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/predict_rooms"
    }
   ]
  },
  "private_fn.rs": {
   "src": "mod front_desk {\n    pub fn welcome() {\n        println!(\"Welcome to the library!\");\n    }\n\n    fn stamp_card() {\n        println!(\"*stamp*\");\n    }\n}\n\nfn main() {\n    front_desk::welcome();\n    front_desk::stamp_card();\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: function `stamp_card` is private\n  --> src/main.rs:13:17\n   |\n13 |     front_desk::stamp_card();\n   |                 ^^^^^^^^^^ private function\n   |\nnote: the function `stamp_card` is defined here\n  --> src/main.rs:6:5\n   |\n 6 |     fn stamp_card() {\n   |     ^^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `private_fn` (bin \"private_fn\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: function `stamp_card` is private\n  --> src/main.rs:13:17\n   |\n13 |     front_desk::stamp_card();\n   |                 ^^^^^^^^^^ private function\n   |\nnote: the function `stamp_card` is defined here\n  --> src/main.rs:6:5\n   |\n 6 |     fn stamp_card() {\n   |     ^^^^^^^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `private_fn` (bin \"private_fn\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/private_fn"
    }
   ]
  },
  "private_mod.rs": {
   "src": "mod lobby {\n    pub fn open() {\n        println!(\"doors open\");\n    }\n\n    mod lifts {\n        pub fn up(floor: u32) {\n            println!(\"going up to {floor}\");\n        }\n    }\n}\n\nfn main() {\n    lobby::open();\n    lobby::lifts::up(3);\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: module `lifts` is private\n  --> src/main.rs:15:12\n   |\n15 |     lobby::lifts::up(3);\n   |            ^^^^^  -- function `up` is not publicly re-exported\n   |            |\n   |            private module\n   |\nnote: the module `lifts` is defined here\n  --> src/main.rs:6:5\n   |\n 6 |     mod lifts {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `private_mod` (bin \"private_mod\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: module `lifts` is private\n  --> src/main.rs:15:12\n   |\n15 |     lobby::lifts::up(3);\n   |            ^^^^^  -- function `up` is not publicly re-exported\n   |            |\n   |            private module\n   |\nnote: the module `lifts` is defined here\n  --> src/main.rs:6:5\n   |\n 6 |     mod lifts {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `private_mod` (bin \"private_mod\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/private_mod"
    }
   ]
  },
  "read_pin.rs": {
   "src": "mod members {\n    pub struct Card {\n        pub owner: String,\n        pin: u32,\n    }\n\n    impl Card {\n        pub fn new(owner: &str) -> Card {\n            Card { owner: owner.to_string(), pin: 1234 }\n        }\n\n        pub fn check(&self, guess: u32) -> bool {\n            self.pin == guess\n        }\n    }\n}\n\nuse members::Card;\n\nfn main() {\n    let card = Card::new(\"Ada\");\n    println!(\"pin ok? {}\", card.check(1234));\n    println!(\"pin: {}\", card.pin);\n}\n",
   "stdout": "",
   "stderr": "error[E0616]: field `pin` of struct `Card` is private\n  --> src/main.rs:23:30\n   |\n23 |     println!(\"pin: {}\", card.pin);\n   |                              ^^^ private field\n\nFor more information about this error, try `rustc --explain E0616`.\nerror: could not compile `read_pin` (bin \"read_pin\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0616]: field `pin` of struct `Card` is private\n  --> src/main.rs:23:30\n   |\n23 |     println!(\"pin: {}\", card.pin);\n   |                              ^^^ private field\n\nFor more information about this error, try `rustc --explain E0616`.\nerror: could not compile `read_pin` (bin \"read_pin\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/read_pin"
    }
   ]
  },
  "report.rs": {
   "src": "// Rule: the first day late is free, then 10 a day.\nfn late_fee(days: u32) -> u32 {\n    if days <= 1 { 0 } else { days * 10 }\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n\n    #[test]\n    fn first_day_is_free() {\n        assert_eq!(late_fee(1), 0);\n    }\n\n    #[test]\n    fn three_days_costs_twenty() {\n        assert_eq!(late_fee(3), 20);\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (18) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
   "stderr": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.09s\n     Running unittests src/main.rs (target/debug/deps/report-db3c66cbd9f0b252)\nerror: test failed, to rerun pass `--bin report`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo test",
     "out": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (18) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
     "err": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.09s\n     Running unittests src/main.rs (target/debug/deps/report-db3c66cbd9f0b252)\nerror: test failed, to rerun pass `--bin report`\n",
     "exit": 101,
     "dir": "~/rust-ch14/report",
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (19) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
    "stderr": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.06s\n     Running unittests src/main.rs (target/debug/deps/report-f4e5eae53d0ddec7)\nerror: test failed, to rerun pass `--bin report`\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo test",
      "out": "\nrunning 3 tests\ntest tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n\nfailures:\n\n---- tests::three_days_costs_twenty stdout ----\n\nthread 'tests::three_days_costs_twenty' (19) panicked at src/main.rs:26:9:\nassertion `left == right` failed\n  left: 30\n right: 20\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_days_costs_twenty\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n\n",
      "err": "    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.06s\n     Running unittests src/main.rs (target/debug/deps/report-f4e5eae53d0ddec7)\nerror: test failed, to rerun pass `--bin report`\n",
      "exit": 101,
      "dir": "~/rust-ch14/report",
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "report_runs.rs": {
   "src": "// Rule: the first day late is free, then 10 a day.\nfn late_fee(days: u32) -> u32 {\n    if days <= 1 { 0 } else { days * 10 }\n}\n\nfn main() {\n    println!(\"3 days late: fee {}\", late_fee(3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn no_days_is_free() {\n        assert_eq!(late_fee(0), 0);\n    }\n\n    #[test]\n    fn first_day_is_free() {\n        assert_eq!(late_fee(1), 0);\n    }\n\n    #[test]\n    fn three_days_costs_twenty() {\n        assert_eq!(late_fee(3), 20);\n    }\n}\n",
   "stdout": "test tests::no_days_is_free ... ok\ntest tests::first_day_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo test 2>/dev/null | grep '^test tests'",
     "out": "test tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\ntest tests::first_day_is_free ... ok\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/report_runs"
    },
    {
     "cmd": "cargo test 2>/dev/null | grep '^test tests'",
     "out": "test tests::first_day_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\ntest tests::no_days_is_free ... ok\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/report_runs"
    },
    {
     "cmd": "cargo test 2>/dev/null | grep '^test tests'",
     "out": "test tests::no_days_is_free ... ok\ntest tests::first_day_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/report_runs"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "test tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo test 2>/dev/null | grep '^test tests'",
      "out": "test tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch14/report_runs"
     },
     {
      "cmd": "cargo test 2>/dev/null | grep '^test tests'",
      "out": "test tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch14/report_runs"
     },
     {
      "cmd": "cargo test 2>/dev/null | grep '^test tests'",
      "out": "test tests::first_day_is_free ... ok\ntest tests::no_days_is_free ... ok\ntest tests::three_days_costs_twenty ... FAILED\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch14/report_runs"
     }
    ]
   }
  },
  "result_test.rs": {
   "src": "fn parse_days(text: &str) -> Result<u32, String> {\n    match text.trim().parse::<u32>() {\n        Ok(days) => Ok(days),\n        Err(_) => Err(format!(\"not a number: {text}\")),\n    }\n}\n\nfn late_fee(days: u32) -> u32 {\n    if days == 0 { 0 } else { (days - 1) * 10 }\n}\n\nfn main() {\n    println!(\"{:?}\", parse_days(\"3\"));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn three_days_from_text() -> Result<(), String> {\n        let days = parse_days(\"3\")?;\n        assert_eq!(late_fee(days), 20);\n        Ok(())\n    }\n\n    #[test]\n    fn words_are_refused() {\n        assert!(parse_days(\"three\").is_err());\n    }\n\n    #[test]\n    fn words_with_question_mark() -> Result<(), String> {\n        let days = parse_days(\"three\")?;\n        assert_eq!(late_fee(days), 20);\n        Ok(())\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::three_days_from_text ... ok\ntest tests::words_are_refused ... ok\ntest tests::words_with_question_mark ... FAILED\n\nfailures:\n\n---- tests::words_with_question_mark stdout ----\nError: \"not a number: three\"\n\n\nfailures:\n    tests::words_with_question_mark\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "error: test failed, to rerun pass `--bin result_test`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/result_test"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 3 tests\ntest tests::three_days_from_text ... ok\ntest tests::words_are_refused ... ok\ntest tests::words_with_question_mark ... FAILED\n\nfailures:\n\n---- tests::words_with_question_mark stdout ----\nError: \"not a number: three\"\n\n\nfailures:\n    tests::words_with_question_mark\n\ntest result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "error: test failed, to rerun pass `--bin result_test`\n",
     "exit": 101,
     "dir": "~/rust-ch14/result_test"
    }
   ]
  },
  "shop.rs": {
   "src": "mod tills;\n\nfn main() {\n    tills::open();\n}\n",
   "stdout": "",
   "stderr": "error[E0583]: file not found for module `tills`\n --> src/main.rs:1:1\n  |\n1 | mod tills;\n  | ^^^^^^^^^^\n  |\n  = help: to create the module `tills`, create file \"src/tills.rs\" or \"src/tills/mod.rs\"\n  = note: if there is a `mod tills` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `shop` (bin \"shop\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "ls src",
     "out": "main.rs\ntill.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/shop"
    },
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0583]: file not found for module `tills`\n --> src/main.rs:1:1\n  |\n1 | mod tills;\n  | ^^^^^^^^^^\n  |\n  = help: to create the module `tills`, create file \"src/tills.rs\" or \"src/tills/mod.rs\"\n  = note: if there is a `mod tills` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `shop` (bin \"shop\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/shop"
    }
   ]
  },
  "shop/src/till.rs": {
   "src": "pub fn open() {\n    println!(\"till open\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "should_panic.rs": {
   "src": "fn take_book(shelf: &mut Vec<String>) -> String {\n    match shelf.pop() {\n        Some(book) => book,\n        None => panic!(\"shelf is empty\"),\n    }\n}\n\nfn main() {\n    let mut shelf = vec![String::from(\"Dune\")];\n    println!(\"took {}\", take_book(&mut shelf));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    #[should_panic(expected = \"shelf is empty\")]\n    fn empty_shelf_panics() {\n        let mut shelf: Vec<String> = Vec::new();\n        take_book(&mut shelf);\n    }\n\n    #[test]\n    #[should_panic]\n    fn full_shelf_panics_too() {\n        let mut shelf = vec![String::from(\"Dune\")];\n        take_book(&mut shelf);\n    }\n\n    #[test]\n    #[should_panic(expected = \"no books left\")]\n    fn wrong_message() {\n        let mut shelf: Vec<String> = Vec::new();\n        take_book(&mut shelf);\n    }\n}\n",
   "stdout": "\nrunning 3 tests\ntest tests::empty_shelf_panics - should panic ... ok\ntest tests::full_shelf_panics_too - should panic ... FAILED\ntest tests::wrong_message - should panic ... FAILED\n\nfailures:\n\n---- tests::full_shelf_panics_too stdout ----\nnote: test did not panic as expected at src/main.rs:26:8\n---- tests::wrong_message stdout ----\n\nthread 'tests::wrong_message' (…) panicked at src/main.rs:4:17:\nshelf is empty\nnote: panic did not contain expected string\n      panic message: \"shelf is empty\"\n expected substring: \"no books left\"\n\nfailures:\n    tests::full_shelf_panics_too\n    tests::wrong_message\n\ntest result: FAILED. 1 passed; 2 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "error: test failed, to rerun pass `--bin should_panic`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/should_panic"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 3 tests\ntest tests::empty_shelf_panics - should panic ... ok\ntest tests::full_shelf_panics_too - should panic ... FAILED\ntest tests::wrong_message - should panic ... FAILED\n\nfailures:\n\n---- tests::full_shelf_panics_too stdout ----\nnote: test did not panic as expected at src/main.rs:26:8\n---- tests::wrong_message stdout ----\n\nthread 'tests::wrong_message' (…) panicked at src/main.rs:4:17:\nshelf is empty\nnote: panic did not contain expected string\n      panic message: \"shelf is empty\"\n expected substring: \"no books left\"\n\nfailures:\n    tests::full_shelf_panics_too\n    tests::wrong_message\n\ntest result: FAILED. 1 passed; 2 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "error: test failed, to rerun pass `--bin should_panic`\n",
     "exit": 101,
     "dir": "~/rust-ch14/should_panic"
    }
   ]
  },
  "spot_field.rs": {
   "src": "mod tickets {\n    pub struct Ticket {\n        pub seat: u32,\n        price: u32,\n    }\n\n    impl Ticket {\n        pub fn new(seat: u32) -> Ticket {\n            Ticket { seat, price: 8 }\n        }\n    }\n}\n\nfn main() {\n    let t = tickets::Ticket::new(12);\n    println!(\"seat {}\", t.seat);\n    println!(\"price {}\", t.price);\n}\n",
   "stdout": "",
   "stderr": "error[E0616]: field `price` of struct `Ticket` is private\n  --> src/main.rs:17:28\n   |\n17 |     println!(\"price {}\", t.price);\n   |                            ^^^^^ private field\n\nFor more information about this error, try `rustc --explain E0616`.\nerror: could not compile `spot_field` (bin \"spot_field\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0616]: field `price` of struct `Ticket` is private\n  --> src/main.rs:17:28\n   |\n17 |     println!(\"price {}\", t.price);\n   |                            ^^^^^ private field\n\nFor more information about this error, try `rustc --explain E0616`.\nerror: could not compile `spot_field` (bin \"spot_field\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/spot_field"
    }
   ]
  },
  "spot_private.rs": {
   "src": "mod shelves {\n    pub fn count() -> u32 {\n        dust();\n        42\n    }\n\n    fn dust() {\n        println!(\"(dusting)\");\n    }\n}\n\nfn main() {\n    let n = shelves::count();\n    println!(\"{n} books\");\n    shelves::dust();\n}\n",
   "stdout": "",
   "stderr": "error[E0603]: function `dust` is private\n  --> src/main.rs:15:14\n   |\n15 |     shelves::dust();\n   |              ^^^^ private function\n   |\nnote: the function `dust` is defined here\n  --> src/main.rs:7:5\n   |\n 7 |     fn dust() {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `spot_private` (bin \"spot_private\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0603]: function `dust` is private\n  --> src/main.rs:15:14\n   |\n15 |     shelves::dust();\n   |              ^^^^ private function\n   |\nnote: the function `dust` is defined here\n  --> src/main.rs:7:5\n   |\n 7 |     fn dust() {\n   |     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0603`.\nerror: could not compile `spot_private` (bin \"spot_private\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/spot_private"
    }
   ]
  },
  "spot_test.rs": {
   "src": "fn seats_left(total: u32, sold: u32) -> u32 {\n    total + sold\n}\n\nfn main() {\n    println!(\"{} seats left\", seats_left(10, 3));\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn none_sold() {\n        assert_eq!(seats_left(10, 0), 10);\n    }\n\n    #[test]\n    fn three_sold() {\n        assert_eq!(seats_left(10, 3), 7);\n    }\n}\n",
   "stdout": "\nrunning 2 tests\ntest tests::none_sold ... ok\ntest tests::three_sold ... FAILED\n\nfailures:\n\n---- tests::three_sold stdout ----\n\nthread 'tests::three_sold' (…) panicked at src/main.rs:20:9:\nassertion `left == right` failed\n  left: 13\n right: 7\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_sold\n\ntest result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
   "stderr": "error: test failed, to rerun pass `--bin spot_test`\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/spot_test"
    },
    {
     "cmd": "cargo test -q -- --test-threads=1 --format pretty | sed -E 's/\\([0-9]+\\) panicked/(…) panicked/; s/finished in [0-9.]+s/finished in …s/'",
     "out": "\nrunning 2 tests\ntest tests::none_sold ... ok\ntest tests::three_sold ... FAILED\n\nfailures:\n\n---- tests::three_sold stdout ----\n\nthread 'tests::three_sold' (…) panicked at src/main.rs:20:9:\nassertion `left == right` failed\n  left: 13\n right: 7\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::three_sold\n\ntest result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in …s\n\n",
     "err": "error: test failed, to rerun pass `--bin spot_test`\n",
     "exit": 101,
     "dir": "~/rust-ch14/spot_test"
    }
   ]
  },
  "spot_use.rs": {
   "src": "use std::cmp::min;\n\nmod tickets {\n    pub fn cheapest(a: u32, b: u32) -> u32 {\n        min(a, b)\n    }\n}\n\nfn main() {\n    let price = tickets::cheapest(8, 5);\n    println!(\"pay {price}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0425]: cannot find function `min` in this scope\n --> src/main.rs:5:9\n  |\n5 |         min(a, b)\n  |         ^^^ not found in this scope\n  |\nhelp: consider importing one of these functions\n  |\n4 +     use crate::min;\n  |\n4 +     use std::cmp::min;\n  |\n\nwarning: unused import: `std::cmp::min`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::min;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `spot_use` (bin \"spot_use\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0425]: cannot find function `min` in this scope\n --> src/main.rs:5:9\n  |\n5 |         min(a, b)\n  |         ^^^ not found in this scope\n  |\nhelp: consider importing one of these functions\n  |\n4 +     use crate::min;\n  |\n4 +     use std::cmp::min;\n  |\n\nwarning: unused import: `std::cmp::min`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::min;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `spot_use` (bin \"spot_use\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch14/spot_use"
    }
   ]
  },
  "struct_fields.rs": {
   "src": "mod members {\n    pub struct Card {\n        pub owner: String,\n        pin: u32,\n    }\n\n    impl Card {\n        pub fn new(owner: &str) -> Card {\n            Card { owner: owner.to_string(), pin: 1234 }\n        }\n\n        pub fn check(&self, guess: u32) -> bool {\n            self.pin == guess\n        }\n    }\n\n    pub enum Level {\n        Junior,\n        Adult,\n    }\n\n    pub fn describe(level: Level) -> &'static str {\n        match level {\n            Level::Junior => \"junior card\",\n            Level::Adult => \"adult card\",\n        }\n    }\n}\n\nuse members::{Card, Level};\n\nfn main() {\n    let card = Card::new(\"Ada\");\n    println!(\"owner: {}\", card.owner);\n    println!(\"pin 1111? {}\", card.check(1111));\n    println!(\"pin 1234? {}\", card.check(1234));\n    println!(\"{}\", members::describe(Level::Junior));\n    println!(\"{}\", members::describe(Level::Adult));\n}\n",
   "stdout": "owner: Ada\npin 1111? false\npin 1234? true\njunior card\nadult card\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "owner: Ada\npin 1111? false\npin 1234? true\njunior card\nadult card\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/struct_fields"
    }
   ]
  },
  "trace_rooms.rs": {
   "src": "mod floors {\n    pub fn floor_of(shelf: u32) -> u32 {\n        shelf / 10\n    }\n\n    pub mod rooms {\n        pub fn room_of(shelf: u32) -> u32 {\n            shelf % 10 + super::floor_of(shelf)\n        }\n    }\n}\n\nuse floors::rooms::room_of;\n\nfn main() {\n    for shelf in [12, 25, 31, 40] {\n        println!(\"{} {} {}\", shelf, floors::floor_of(shelf), room_of(shelf));\n    }\n}\n",
   "stdout": "12 1 3\n25 2 7\n31 3 4\n40 4 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "12 1 3\n25 2 7\n31 3 4\n40 4 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/trace_rooms"
    }
   ]
  },
  "twice.rs": {
   "src": "mod stock;\nmod other;\n\nfn main() {\n    stock::count();\n    other::check();\n}\n",
   "stdout": "",
   "stderr": "error[E0583]: file not found for module `stock`\n --> src/other.rs:1:1\n  |\n1 | pub mod stock;\n  | ^^^^^^^^^^^^^^\n  |\n  = help: to create the module `stock`, create file \"src/other/stock.rs\" or \"src/other/stock/mod.rs\"\n  = note: if there is a `mod stock` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `twice` (bin \"twice\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "ls src",
     "out": "main.rs\nother.rs\nstock.rs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/twice"
    },
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0583]: file not found for module `stock`\n --> src/other.rs:1:1\n  |\n1 | pub mod stock;\n  | ^^^^^^^^^^^^^^\n  |\n  = help: to create the module `stock`, create file \"src/other/stock.rs\" or \"src/other/stock/mod.rs\"\n  = note: if there is a `mod stock` elsewhere in the crate already, import it with `use crate::...` instead\n\nFor more information about this error, try `rustc --explain E0583`.\nerror: could not compile `twice` (bin \"twice\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/twice"
    }
   ]
  },
  "twice/src/stock.rs": {
   "src": "pub fn count() {\n    println!(\"3 books in stock\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "twice/src/other.rs": {
   "src": "pub mod stock;\n\npub fn check() {\n    println!(\"stock checked\");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "typo_path.rs": {
   "src": "mod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelve {title}\");\n        }\n    }\n}\n\nfn main() {\n    stack::fiction::shelve(\"Dune\");\n}\n",
   "stdout": "",
   "stderr": "error[E0433]: cannot find module or crate `stack` in this scope\n  --> src/main.rs:10:5\n   |\n10 |     stack::fiction::shelve(\"Dune\");\n   |     ^^^^^ use of unresolved module or unlinked crate `stack`\n   |\nhelp: there is a crate or module with a similar name\n   |\n10 |     stacks::fiction::shelve(\"Dune\");\n   |          +\nhelp: consider importing this module\n   |\n 1 + use crate::stacks::fiction;\n   |\nhelp: if you import `fiction`, refer to it directly\n   |\n10 -     stack::fiction::shelve(\"Dune\");\n10 +     fiction::shelve(\"Dune\");\n   |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `typo_path` (bin \"typo_path\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0433]: cannot find module or crate `stack` in this scope\n  --> src/main.rs:10:5\n   |\n10 |     stack::fiction::shelve(\"Dune\");\n   |     ^^^^^ use of unresolved module or unlinked crate `stack`\n   |\nhelp: there is a crate or module with a similar name\n   |\n10 |     stacks::fiction::shelve(\"Dune\");\n   |          +\nhelp: consider importing this module\n   |\n 1 + use crate::stacks::fiction;\n   |\nhelp: if you import `fiction`, refer to it directly\n   |\n10 -     stack::fiction::shelve(\"Dune\");\n10 +     fiction::shelve(\"Dune\");\n   |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `typo_path` (bin \"typo_path\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch14/typo_path"
    }
   ]
  },
  "use_inside.rs": {
   "src": "use std::cmp::max;\n\nmod scores {\n    pub fn best(a: u32, b: u32) -> u32 {\n        max(a, b)\n    }\n}\n\nfn main() {\n    println!(\"best: {}\", scores::best(4, 9));\n}\n",
   "stdout": "",
   "stderr": "error[E0425]: cannot find function `max` in this scope\n --> src/main.rs:5:9\n  |\n5 |         max(a, b)\n  |         ^^^ not found in this scope\n  |\nhelp: consider importing one of these functions\n  |\n4 +     use crate::max;\n  |\n4 +     use std::cmp::max;\n  |\n\nwarning: unused import: `std::cmp::max`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::max;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `use_inside` (bin \"use_inside\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0425]: cannot find function `max` in this scope\n --> src/main.rs:5:9\n  |\n5 |         max(a, b)\n  |         ^^^ not found in this scope\n  |\nhelp: consider importing one of these functions\n  |\n4 +     use crate::max;\n  |\n4 +     use std::cmp::max;\n  |\n\nwarning: unused import: `std::cmp::max`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::max;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0425`.\nerror: could not compile `use_inside` (bin \"use_inside\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch14/use_inside"
    }
   ]
  },
  "use_inside_fixed.rs": {
   "src": "mod scores {\n    use std::cmp::max;\n\n    pub fn best(a: u32, b: u32) -> u32 {\n        max(a, b)\n    }\n}\n\nfn main() {\n    println!(\"best: {}\", scores::best(4, 9));\n}\n",
   "stdout": "best: 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "best: 9\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/use_inside_fixed"
    }
   ]
  },
  "use_speed.rs": {
   "src": "use std::cmp::{max, min};\n\nmod stacks {\n    pub mod fiction {\n        pub fn shelve(title: &str) {\n            println!(\"shelve {title}\");\n        }\n    }\n}\n\nuse stacks::fiction::shelve;\nuse stacks::fiction as fic;\n\nfn main() {\n    shelve(\"Dune\");\n    fic::shelve(\"Emma\");\n    println!(\"bigger: {}\", max(3, 7));\n    println!(\"smaller: {}\", min(3, 7));\n}\n",
   "stdout": "shelve Dune\nshelve Emma\nbigger: 7\nsmaller: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelve Dune\nshelve Emma\nbigger: 7\nsmaller: 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch14/use_speed"
    }
   ]
  },
  "warn.rs": {
   "src": "use std::cmp::max;\n\nmod shelves {\n    pub fn count() -> u32 {\n        42\n    }\n\n    fn dust() {\n        println!(\"dusting\");\n    }\n}\n\nfn main() {\n    println!(\"{} books\", shelves::count());\n}\n",
   "stdout": "42 books\n",
   "stderr": "warning: unused import: `std::cmp::max`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::max;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nwarning: function `dust` is never used\n --> src/main.rs:8:8\n  |\n8 |     fn dust() {\n  |        ^^^^\n  |\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "42 books\n",
     "err": "warning: unused import: `std::cmp::max`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::max;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nwarning: function `dust` is never used\n --> src/main.rs:8:8\n  |\n8 |     fn dust() {\n  |        ^^^^\n  |\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch14/warn",
     "merged": "warning: unused import: `std::cmp::max`\n --> src/main.rs:1:5\n  |\n1 | use std::cmp::max;\n  |     ^^^^^^^^^^^^^\n  |\n  = note: `#[warn(unused_imports)]` (part of `#[warn(unused)]`) on by default\n\nwarning: function `dust` is never used\n --> src/main.rs:8:8\n  |\n8 |     fn dust() {\n  |        ^^^^\n  |\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\n42 books\n"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
