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
  "workdir": "/home/you/rust-ch6",
  "versionDifferences": [
   "boss_error.rs",
   "cargo_add.rs",
   "cmp_string.rs",
   "game.rs",
   "parse_unknown.rs",
   "roll.rs",
   "secret.rs",
   "spot_read.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.rs, cargo_add.rs, cmp_string.rs, game.rs, parse_unknown.rs, roll.rs, secret.rs, spot_read.rs."
 },
 "programs": {
  "append.rs": {
   "src": "use std::io;\n\nfn main() {\n    let mut text = String::new();\n    io::stdin().read_line(&mut text).expect(\"Failed to read line\");\n    println!(\"After one read:  {text:?}\");\n    io::stdin().read_line(&mut text).expect(\"Failed to read line\");\n    println!(\"After two reads: {text:?}\");\n    text.clear();\n    println!(\"After clear():   {text:?}\");\n}\n",
   "stdout": "After one read:  \"first\\n\"\nAfter two reads: \"first\\nsecond\\n\"\nAfter clear():   \"\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "After one read:  \"first\\n\"\nAfter two reads: \"first\\nsecond\\n\"\nAfter clear():   \"\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/append"
    }
   ],
   "stdin": "first\nsecond\n",
   "screen": "first\nAfter one read:  \"first\\n\"\nsecond\nAfter two reads: \"first\\nsecond\\n\"\nAfter clear():   \"\"\n"
  },
  "bad_input.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Please input your guess.\");\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    let guess: u32 = guess.trim().parse().expect(\"need a number\");\n\n    println!(\"You guessed: {guess}\");\n}\n",
   "stdout": "Please input your guess.\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:8:43:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Please input your guess.\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:8:43:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch6/bad_input",
     "merged": "Please input your guess.\n\nthread 'main' (1) panicked at src/main.rs:8:43:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ],
   "stdin": "abc\n",
   "screen": "Please input your guess.\nabc\n\nthread 'main' (1) panicked at src/main.rs:8:43:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
  },
  "boss_error.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let secret_number: u32 = 42;\n    let guess: u32 = \"40\".parse().expect(\"need a number\");\n    match guess.cmp(secret_number) {\n        Ordering::Less => println!(\"Too small!\"),\n        Ordering::Greater => println!(\"Too big!\"),\n        Ordering::Equal => println!(\"You win!\"),\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:6:21\n  |\n6 |     match guess.cmp(secret_number) {\n  |                 --- ^^^^^^^^^^^^^ expected `&u32`, found `u32`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/cmp.rs:1012:7\nhelp: consider borrowing here\n  |\n6 |     match guess.cmp(&secret_number) {\n  |                     +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:6:21\n  |\n6 |     match guess.cmp(secret_number) {\n  |                 --- ^^^^^^^^^^^^^ expected `&u32`, found `u32`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/cmp.rs:1012:7\nhelp: consider borrowing here\n  |\n6 |     match guess.cmp(&secret_number) {\n  |                     +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0308]: mismatched types\n --> src/main.rs:6:21\n  |\n6 |     match guess.cmp(secret_number) {\n  |                 --- ^^^^^^^^^^^^^ expected `&u32`, found `u32`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/cmp.rs:1000:7\nhelp: consider borrowing here\n  |\n6 |     match guess.cmp(&secret_number) {\n  |                     +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0308]: mismatched types\n --> src/main.rs:6:21\n  |\n6 |     match guess.cmp(secret_number) {\n  |                 --- ^^^^^^^^^^^^^ expected `&u32`, found `u32`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/cmp.rs:1000:7\nhelp: consider borrowing here\n  |\n6 |     match guess.cmp(&secret_number) {\n  |                     +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch6/boss_error"
     }
    ]
   }
  },
  "boss_fill.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let typed = \" 64\\n\";\n    let guess = typed.trim().parse::<u32>().expect(\"need a number\");\n    match guess.cmp(&70) {\n        Ordering::Less => println!(\"{guess} is too small\"),\n        Ordering::Greater => println!(\"{guess} is too big\"),\n        Ordering::Equal => println!(\"{guess} wins\"),\n    }\n}\n",
   "stdout": "64 is too small\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "64 is too small\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "use std::io;\nfn main() {\n    loop {\n        println!(\"Code word, please:\");\n        let mut word = String::new();\n        io::stdin().read_line(&mut word).expect(\"Failed to read\");\n        if word.trim() == \"books\" {\n            break;\n        }\n        println!(\"Nope.\");\n    }\n    println!(\"Come in!\");\n}\n",
   "stdout": "Code word, please:\nNope.\nCode word, please:\nCome in!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Code word, please:\nNope.\nCode word, please:\nCome in!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/boss_parsons"
    }
   ],
   "stdin": "cats\nbooks\n",
   "screen": "Code word, please:\ncats\nNope.\nCode word, please:\nbooks\nCome in!\n"
  },
  "boss_parsons_alt.rs": {
   "src": "use std::io;\nfn main() {\n    loop {\n        let mut word = String::new();\n        println!(\"Code word, please:\");\n        io::stdin().read_line(&mut word).expect(\"Failed to read\");\n        if word.trim() == \"books\" {\n            break;\n        }\n        println!(\"Nope.\");\n    }\n    println!(\"Come in!\");\n}\n",
   "stdout": "Code word, please:\nNope.\nCode word, please:\nCome in!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Code word, please:\nNope.\nCode word, please:\nCome in!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/boss_parsons_alt"
    }
   ],
   "stdin": "cats\nbooks\n",
   "screen": "Code word, please:\ncats\nNope.\nCode word, please:\nbooks\nCome in!\n"
  },
  "boss_predict.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let secret: u32 = 55;\n    let typed = [\"80\", \"abc\", \"20\", \"\", \"55\"];\n    let mut tries = 0;\n    for text in typed {\n        let guess: u32 = match text.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n        tries += 1;\n        match guess.cmp(&secret) {\n            Ordering::Less => println!(\"{guess} small\"),\n            Ordering::Greater => println!(\"{guess} big\"),\n            Ordering::Equal => println!(\"{guess} win after {tries}\"),\n        }\n    }\n}\n",
   "stdout": "80 big\n20 small\n55 win after 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "80 big\n20 small\n55 win after 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    let secret_number = 42;\n    let mut guess = String::new();\n    loop {\n        println!(\"Please input your guess.\");\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n        let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Please input your guess.\nToo big!\nPlease input your guess.\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:10:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Please input your guess.\nToo big!\nPlease input your guess.\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:10:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch6/boss_spot",
     "merged": "Please input your guess.\nToo big!\nPlease input your guess.\n\nthread 'main' (1) panicked at src/main.rs:10:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ],
   "stdin": "50\n42\n",
   "screen": "Please input your guess.\n50\nToo big!\nPlease input your guess.\n42\n\nthread 'main' (1) panicked at src/main.rs:10:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
  },
  "boss_trace.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let secret: u32 = 81;\n    let mut low = 1;\n    let mut high = 100;\n    let mut tries = 0;\n    loop {\n        tries += 1;\n        let guess = (low + high) / 2;\n        println!(\"{tries} {low} {high} {guess}\");\n        match guess.cmp(&secret) {\n            Ordering::Less => low = guess + 1,\n            Ordering::Greater => high = guess - 1,\n            Ordering::Equal => break,\n        }\n    }\n}\n",
   "stdout": "1 1 100 50\n2 51 100 75\n3 76 100 88\n4 76 87 81\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1 100 50\n2 51 100 75\n3 76 100 88\n4 76 87 81\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/boss_trace"
    }
   ]
  },
  "cargo_add.rs": {
   "src": "fn main() {\n    println!(\"Hello, world!\");\n}\n",
   "stdout": "name = \"rand\"\nversion = \"0.10.3\"\n",
   "stderr": "    Creating binary (application) `guessing_game` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to highest Rust 1.99.1 compatible versions\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo new guessing_game",
     "out": "",
     "err": "    Creating binary (application) `guessing_game` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "cd guessing_game",
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
     "dir": "~/guessing_game"
    },
    {
     "cmd": "cat Cargo.toml",
     "out": "[package]\nname = \"guessing_game\"\nversion = \"0.1.0\"\nedition = \"2024\"\n\n[dependencies]\nrand = \"0.10.3\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/guessing_game"
    },
    {
     "cmd": "grep '^name' Cargo.lock",
     "out": "name = \"cfg-if\"\nname = \"chacha20\"\nname = \"cpufeatures\"\nname = \"getrandom\"\nname = \"guessing_game\"\nname = \"libc\"\nname = \"r-efi\"\nname = \"rand\"\nname = \"rand_core\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/guessing_game"
    },
    {
     "cmd": "grep -A1 '^name = \"rand\"' Cargo.lock",
     "out": "name = \"rand\"\nversion = \"0.10.3\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/guessing_game"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "name = \"rand\"\nversion = \"0.10.3\"\n",
    "stderr": "    Creating binary (application) `guessing_game` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n    Updating crates.io index\n      Adding rand v0.10.3 to dependencies\n             Features:\n             + alloc\n             + std\n             + std_rng\n             + sys_rng\n             + thread_rng\n             - chacha\n             - log\n             - serde\n             - simd_support\n             - unbiased\n    Updating crates.io index\n     Locking 8 packages to latest Rust 1.97.0 compatible versions\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo new guessing_game",
      "out": "",
      "err": "    Creating binary (application) `guessing_game` package\nnote: see more `Cargo.toml` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n",
      "exit": 0,
      "dir": "~"
     },
     {
      "cmd": "cd guessing_game",
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
      "dir": "~/guessing_game"
     },
     {
      "cmd": "cat Cargo.toml",
      "out": "[package]\nname = \"guessing_game\"\nversion = \"0.1.0\"\nedition = \"2024\"\n\n[dependencies]\nrand = \"0.10.3\"\n",
      "err": "",
      "exit": 0,
      "dir": "~/guessing_game"
     },
     {
      "cmd": "grep '^name' Cargo.lock",
      "out": "name = \"cfg-if\"\nname = \"chacha20\"\nname = \"cpufeatures\"\nname = \"getrandom\"\nname = \"guessing_game\"\nname = \"libc\"\nname = \"r-efi\"\nname = \"rand\"\nname = \"rand_core\"\n",
      "err": "",
      "exit": 0,
      "dir": "~/guessing_game"
     },
     {
      "cmd": "grep -A1 '^name = \"rand\"' Cargo.lock",
      "out": "name = \"rand\"\nversion = \"0.10.3\"\n",
      "err": "",
      "exit": 0,
      "dir": "~/guessing_game"
     }
    ]
   }
  },
  "cmp_demo.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let small: u32 = 3;\n    let big: u32 = 8;\n\n    println!(\"{:?}\", small.cmp(&big));\n    println!(\"{:?}\", big.cmp(&small));\n    println!(\"{:?}\", small.cmp(&small));\n\n    let answer: Ordering = big.cmp(&small);\n    println!(\"{}\", answer == Ordering::Greater);\n}\n",
   "stdout": "Less\nGreater\nEqual\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Less\nGreater\nEqual\ntrue\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/cmp_demo"
    }
   ]
  },
  "cmp_string.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    let secret_number = 42;\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    match guess.cmp(&secret_number) {\n        Ordering::Less => println!(\"Too small!\"),\n        Ordering::Greater => println!(\"Too big!\"),\n        Ordering::Equal => println!(\"You win!\"),\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:9:21\n  |\n9 |     match guess.cmp(&secret_number) {\n  |                 --- ^^^^^^^^^^^^^^ expected `&String`, found `&{integer}`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected reference `&String`\n             found reference `&{integer}`\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/cmp.rs:1012:7\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `cmp_string` (bin \"cmp_string\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:9:21\n  |\n9 |     match guess.cmp(&secret_number) {\n  |                 --- ^^^^^^^^^^^^^^ expected `&String`, found `&{integer}`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected reference `&String`\n             found reference `&{integer}`\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/cmp.rs:1012:7\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `cmp_string` (bin \"cmp_string\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/cmp_string"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0308]: mismatched types\n --> src/main.rs:9:21\n  |\n9 |     match guess.cmp(&secret_number) {\n  |                 --- ^^^^^^^^^^^^^^ expected `&String`, found `&{integer}`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected reference `&String`\n             found reference `&{integer}`\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/cmp.rs:1000:7\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `cmp_string` (bin \"cmp_string\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0308]: mismatched types\n --> src/main.rs:9:21\n  |\n9 |     match guess.cmp(&secret_number) {\n  |                 --- ^^^^^^^^^^^^^^ expected `&String`, found `&{integer}`\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected reference `&String`\n             found reference `&{integer}`\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/cmp.rs:1000:7\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `cmp_string` (bin \"cmp_string\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch6/cmp_string"
     }
    ]
   }
  },
  "compare.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    let secret_number = 42;\n\n    println!(\"Please input your guess.\");\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n    let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n\n    println!(\"You guessed: {guess}\");\n\n    match guess.cmp(&secret_number) {\n        Ordering::Less => println!(\"Too small!\"),\n        Ordering::Greater => println!(\"Too big!\"),\n        Ordering::Equal => println!(\"You win!\"),\n    }\n}\n",
   "stdout": "Please input your guess.\nYou guessed: 50\nToo big!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Please input your guess.\nYou guessed: 50\nToo big!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/compare"
    }
   ],
   "stdin": "50\n",
   "screen": "Please input your guess.\n50\nYou guessed: 50\nToo big!\n"
  },
  "echo.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    println!(\"Please input your guess.\");\n\n    let mut guess = String::new();\n\n    io::stdin()\n        .read_line(&mut guess)\n        .expect(\"Failed to read line\");\n\n    println!(\"You guessed: {guess}\");\n    println!(\"Bye for now!\");\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 42\n\nBye for now!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 42\n\nBye for now!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/echo"
    }
   ],
   "stdin": "42\n",
   "screen": "Guess the number!\nPlease input your guess.\n42\nYou guessed: 42\n\nBye for now!\n"
  },
  "echo_pipe.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Please input your guess.\");\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n\n    println!(\"You guessed: {guess}\");\n    println!(\"One more is {}\", guess + 1);\n}\n",
   "stdout": "Please input your guess.\nYou guessed: 50\nOne more is 51\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "echo 50 | cargo run -q",
     "out": "Please input your guess.\nYou guessed: 50\nOne more is 51\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parse_ok"
    }
   ]
  },
  "eof.rs": {
   "src": "use std::io;\n\nfn main() {\n    let mut text = String::new();\n    let bytes = io::stdin().read_line(&mut text).expect(\"Failed to read line\");\n    println!(\"Read {bytes} bytes: {text:?}\");\n}\n",
   "stdout": "Read 0 bytes: \"\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Read 0 bytes: \"\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/eof"
    }
   ]
  },
  "fill_continue.rs": {
   "src": "use std::io;\n\nfn main() {\n    let secret_number: u32 = 7;\n    loop {\n        println!(\"Pick a number from 1 to 9:\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n        if guess == secret_number {\n            println!(\"Lucky {guess}!\");\n            break;\n        }\n        println!(\"Not {guess}.\");\n    }\n}\n",
   "stdout": "Pick a number from 1 to 9:\nPick a number from 1 to 9:\nNot 3.\nPick a number from 1 to 9:\nLucky 7!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Pick a number from 1 to 9:\nPick a number from 1 to 9:\nNot 3.\nPick a number from 1 to 9:\nLucky 7!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/fill_continue"
    }
   ],
   "stdin": "seven\n3\n7\n",
   "screen": "Pick a number from 1 to 9:\nseven\nPick a number from 1 to 9:\n3\nNot 3.\nPick a number from 1 to 9:\n7\nLucky 7!\n"
  },
  "fill_read.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Favourite language?\");\n    let mut answer = String::new();\n    io::stdin().read_line(&mut answer).expect(\"Failed to read line\");\n    println!(\"Great choice: {answer}\");\n    println!(\"See you soon!\");\n}\n",
   "stdout": "Favourite language?\nGreat choice: Rust\n\nSee you soon!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Favourite language?\nGreat choice: Rust\n\nSee you soon!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/fill_read"
    }
   ],
   "stdin": "Rust\n",
   "screen": "Favourite language?\nRust\nGreat choice: Rust\n\nSee you soon!\n"
  },
  "fill_trim.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"How many pages?\");\n    let mut pages = String::new();\n    io::stdin().read_line(&mut pages).expect(\"Failed to read line\");\n    let pages: u32 = pages.trim().parse().expect(\"need a number\");\n    println!(\"{pages} pages is {} sheets of paper.\", pages / 2);\n}\n",
   "stdout": "How many pages?\n64 pages is 32 sheets of paper.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "How many pages?\n64 pages is 32 sheets of paper.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/fill_trim"
    }
   ],
   "stdin": "64\n",
   "screen": "How many pages?\n64\n64 pages is 32 sheets of paper.\n"
  },
  "full_path.rs": {
   "src": "fn main() {\n    let mut guess = String::new();\n    std::io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n    println!(\"You guessed: {guess}\");\n}\n",
   "stdout": "You guessed: 7\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "You guessed: 7\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/full_path"
    }
   ],
   "stdin": "7\n",
   "screen": "7\nYou guessed: 7\n\n"
  },
  "game.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = rand::random_range(1..=100);\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 1\nToo small!\nPlease input your guess.\nYou guessed: 2\nToo small!\nPlease input your guess.\nYou guessed: 3\nToo small!\nPlease input your guess.\nYou guessed: 4\nToo small!\nPlease input your guess.\nYou guessed: 5\nToo small!\nPlease input your guess.\nYou guessed: 6\nToo small!\nPlease input your guess.\nYou guessed: 7\nToo small!\nPlease input your guess.\nYou guessed: 8\nToo small!\nPlease input your guess.\nYou guessed: 9\nToo small!\nPlease input your guess.\nYou guessed: 10\nToo small!\nPlease input your guess.\nYou guessed: 11\nToo small!\nPlease input your guess.\nYou guessed: 12\nToo small!\nPlease input your guess.\nYou guessed: 13\nToo small!\nPlease input your guess.\nYou guessed: 14\nToo small!\nPlease input your guess.\nYou guessed: 15\nToo small!\nPlease input your guess.\nYou guessed: 16\nToo small!\nPlease input your guess.\nYou guessed: 17\nToo small!\nPlease input your guess.\nYou guessed: 18\nToo small!\nPlease input your guess.\nYou guessed: 19\nToo small!\nPlease input your guess.\nYou guessed: 20\nToo small!\nPlease input your guess.\nYou guessed: 21\nToo small!\nPlease input your guess.\nYou guessed: 22\nToo small!\nPlease input your guess.\nYou guessed: 23\nToo small!\nPlease input your guess.\nYou guessed: 24\nToo small!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 26\nToo small!\nPlease input your guess.\nYou guessed: 27\nToo small!\nPlease input your guess.\nYou guessed: 28\nToo small!\nPlease input your guess.\nYou guessed: 29\nToo small!\nPlease input your guess.\nYou guessed: 30\nToo small!\nPlease input your guess.\nYou guessed: 31\nToo small!\nPlease input your guess.\nYou guessed: 32\nToo small!\nPlease input your guess.\nYou guessed: 33\nToo small!\nPlease input your guess.\nYou guessed: 34\nToo small!\nPlease input your guess.\nYou guessed: 35\nToo small!\nPlease input your guess.\nYou guessed: 36\nToo small!\nPlease input your guess.\nYou guessed: 37\nToo small!\nPlease input your guess.\nYou guessed: 38\nToo small!\nPlease input your guess.\nYou guessed: 39\nToo small!\nPlease input your guess.\nYou guessed: 40\nToo small!\nPlease input your guess.\nYou guessed: 41\nToo small!\nPlease input your guess.\nYou guessed: 42\nToo small!\nPlease input your guess.\nYou guessed: 43\nToo small!\nPlease input your guess.\nYou guessed: 44\nToo small!\nPlease input your guess.\nYou guessed: 45\nToo small!\nPlease input your guess.\nYou guessed: 46\nToo small!\nPlease input your guess.\nYou guessed: 47\nToo small!\nPlease input your guess.\nYou guessed: 48\nToo small!\nPlease input your guess.\nYou guessed: 49\nToo small!\nPlease input your guess.\nYou guessed: 50\nToo small!\nPlease input your guess.\nYou guessed: 51\nToo small!\nPlease input your guess.\nYou guessed: 52\nToo small!\nPlease input your guess.\nYou guessed: 53\nToo small!\nPlease input your guess.\nYou guessed: 54\nToo small!\nPlease input your guess.\nYou guessed: 55\nToo small!\nPlease input your guess.\nYou guessed: 56\nToo small!\nPlease input your guess.\nYou guessed: 57\nToo small!\nPlease input your guess.\nYou guessed: 58\nToo small!\nPlease input your guess.\nYou guessed: 59\nToo small!\nPlease input your guess.\nYou guessed: 60\nToo small!\nPlease input your guess.\nYou guessed: 61\nToo small!\nPlease input your guess.\nYou guessed: 62\nToo small!\nPlease input your guess.\nYou guessed: 63\nToo small!\nPlease input your guess.\nYou guessed: 64\nToo small!\nPlease input your guess.\nYou guessed: 65\nToo small!\nPlease input your guess.\nYou guessed: 66\nToo small!\nPlease input your guess.\nYou guessed: 67\nToo small!\nPlease input your guess.\nYou guessed: 68\nToo small!\nPlease input your guess.\nYou guessed: 69\nToo small!\nPlease input your guess.\nYou guessed: 70\nToo small!\nPlease input your guess.\nYou guessed: 71\nToo small!\nPlease input your guess.\nYou guessed: 72\nToo small!\nPlease input your guess.\nYou guessed: 73\nToo small!\nPlease input your guess.\nYou guessed: 74\nToo small!\nPlease input your guess.\nYou guessed: 75\nToo small!\nPlease input your guess.\nYou guessed: 76\nToo small!\nPlease input your guess.\nYou guessed: 77\nToo small!\nPlease input your guess.\nYou guessed: 78\nToo small!\nPlease input your guess.\nYou guessed: 79\nToo small!\nPlease input your guess.\nYou guessed: 80\nToo small!\nPlease input your guess.\nYou guessed: 81\nToo small!\nPlease input your guess.\nYou guessed: 82\nToo small!\nPlease input your guess.\nYou guessed: 83\nToo small!\nPlease input your guess.\nYou guessed: 84\nToo small!\nPlease input your guess.\nYou guessed: 85\nToo small!\nPlease input your guess.\nYou guessed: 86\nToo small!\nPlease input your guess.\nYou guessed: 87\nToo small!\nPlease input your guess.\nYou guessed: 88\nToo small!\nPlease input your guess.\nYou guessed: 89\nToo small!\nPlease input your guess.\nYou guessed: 90\nToo small!\nPlease input your guess.\nYou guessed: 91\nToo small!\nPlease input your guess.\nYou guessed: 92\nToo small!\nPlease input your guess.\nYou guessed: 93\nToo small!\nPlease input your guess.\nYou guessed: 94\nYou win!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 1\nToo small!\nPlease input your guess.\nYou guessed: 2\nToo small!\nPlease input your guess.\nYou guessed: 3\nToo small!\nPlease input your guess.\nYou guessed: 4\nToo small!\nPlease input your guess.\nYou guessed: 5\nToo small!\nPlease input your guess.\nYou guessed: 6\nToo small!\nPlease input your guess.\nYou guessed: 7\nToo small!\nPlease input your guess.\nYou guessed: 8\nToo small!\nPlease input your guess.\nYou guessed: 9\nToo small!\nPlease input your guess.\nYou guessed: 10\nToo small!\nPlease input your guess.\nYou guessed: 11\nToo small!\nPlease input your guess.\nYou guessed: 12\nToo small!\nPlease input your guess.\nYou guessed: 13\nToo small!\nPlease input your guess.\nYou guessed: 14\nToo small!\nPlease input your guess.\nYou guessed: 15\nToo small!\nPlease input your guess.\nYou guessed: 16\nToo small!\nPlease input your guess.\nYou guessed: 17\nToo small!\nPlease input your guess.\nYou guessed: 18\nToo small!\nPlease input your guess.\nYou guessed: 19\nToo small!\nPlease input your guess.\nYou guessed: 20\nToo small!\nPlease input your guess.\nYou guessed: 21\nToo small!\nPlease input your guess.\nYou guessed: 22\nToo small!\nPlease input your guess.\nYou guessed: 23\nToo small!\nPlease input your guess.\nYou guessed: 24\nToo small!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 26\nToo small!\nPlease input your guess.\nYou guessed: 27\nToo small!\nPlease input your guess.\nYou guessed: 28\nToo small!\nPlease input your guess.\nYou guessed: 29\nToo small!\nPlease input your guess.\nYou guessed: 30\nToo small!\nPlease input your guess.\nYou guessed: 31\nToo small!\nPlease input your guess.\nYou guessed: 32\nToo small!\nPlease input your guess.\nYou guessed: 33\nToo small!\nPlease input your guess.\nYou guessed: 34\nToo small!\nPlease input your guess.\nYou guessed: 35\nToo small!\nPlease input your guess.\nYou guessed: 36\nToo small!\nPlease input your guess.\nYou guessed: 37\nToo small!\nPlease input your guess.\nYou guessed: 38\nToo small!\nPlease input your guess.\nYou guessed: 39\nToo small!\nPlease input your guess.\nYou guessed: 40\nToo small!\nPlease input your guess.\nYou guessed: 41\nToo small!\nPlease input your guess.\nYou guessed: 42\nToo small!\nPlease input your guess.\nYou guessed: 43\nToo small!\nPlease input your guess.\nYou guessed: 44\nToo small!\nPlease input your guess.\nYou guessed: 45\nToo small!\nPlease input your guess.\nYou guessed: 46\nToo small!\nPlease input your guess.\nYou guessed: 47\nToo small!\nPlease input your guess.\nYou guessed: 48\nToo small!\nPlease input your guess.\nYou guessed: 49\nToo small!\nPlease input your guess.\nYou guessed: 50\nToo small!\nPlease input your guess.\nYou guessed: 51\nToo small!\nPlease input your guess.\nYou guessed: 52\nToo small!\nPlease input your guess.\nYou guessed: 53\nToo small!\nPlease input your guess.\nYou guessed: 54\nToo small!\nPlease input your guess.\nYou guessed: 55\nToo small!\nPlease input your guess.\nYou guessed: 56\nToo small!\nPlease input your guess.\nYou guessed: 57\nToo small!\nPlease input your guess.\nYou guessed: 58\nToo small!\nPlease input your guess.\nYou guessed: 59\nToo small!\nPlease input your guess.\nYou guessed: 60\nToo small!\nPlease input your guess.\nYou guessed: 61\nToo small!\nPlease input your guess.\nYou guessed: 62\nToo small!\nPlease input your guess.\nYou guessed: 63\nToo small!\nPlease input your guess.\nYou guessed: 64\nToo small!\nPlease input your guess.\nYou guessed: 65\nToo small!\nPlease input your guess.\nYou guessed: 66\nToo small!\nPlease input your guess.\nYou guessed: 67\nToo small!\nPlease input your guess.\nYou guessed: 68\nToo small!\nPlease input your guess.\nYou guessed: 69\nToo small!\nPlease input your guess.\nYou guessed: 70\nToo small!\nPlease input your guess.\nYou guessed: 71\nToo small!\nPlease input your guess.\nYou guessed: 72\nToo small!\nPlease input your guess.\nYou guessed: 73\nToo small!\nPlease input your guess.\nYou guessed: 74\nToo small!\nPlease input your guess.\nYou guessed: 75\nToo small!\nPlease input your guess.\nYou guessed: 76\nToo small!\nPlease input your guess.\nYou guessed: 77\nToo small!\nPlease input your guess.\nYou guessed: 78\nToo small!\nPlease input your guess.\nYou guessed: 79\nToo small!\nPlease input your guess.\nYou guessed: 80\nToo small!\nPlease input your guess.\nYou guessed: 81\nToo small!\nPlease input your guess.\nYou guessed: 82\nToo small!\nPlease input your guess.\nYou guessed: 83\nToo small!\nPlease input your guess.\nYou guessed: 84\nToo small!\nPlease input your guess.\nYou guessed: 85\nToo small!\nPlease input your guess.\nYou guessed: 86\nToo small!\nPlease input your guess.\nYou guessed: 87\nToo small!\nPlease input your guess.\nYou guessed: 88\nToo small!\nPlease input your guess.\nYou guessed: 89\nToo small!\nPlease input your guess.\nYou guessed: 90\nToo small!\nPlease input your guess.\nYou guessed: 91\nToo small!\nPlease input your guess.\nYou guessed: 92\nToo small!\nPlease input your guess.\nYou guessed: 93\nToo small!\nPlease input your guess.\nYou guessed: 94\nYou win!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/game"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 1\nToo small!\nPlease input your guess.\nYou guessed: 2\nToo small!\nPlease input your guess.\nYou guessed: 3\nToo small!\nPlease input your guess.\nYou guessed: 4\nToo small!\nPlease input your guess.\nYou guessed: 5\nToo small!\nPlease input your guess.\nYou guessed: 6\nToo small!\nPlease input your guess.\nYou guessed: 7\nToo small!\nPlease input your guess.\nYou guessed: 8\nToo small!\nPlease input your guess.\nYou guessed: 9\nToo small!\nPlease input your guess.\nYou guessed: 10\nToo small!\nPlease input your guess.\nYou guessed: 11\nToo small!\nPlease input your guess.\nYou guessed: 12\nToo small!\nPlease input your guess.\nYou guessed: 13\nToo small!\nPlease input your guess.\nYou guessed: 14\nToo small!\nPlease input your guess.\nYou guessed: 15\nToo small!\nPlease input your guess.\nYou guessed: 16\nToo small!\nPlease input your guess.\nYou guessed: 17\nToo small!\nPlease input your guess.\nYou guessed: 18\nToo small!\nPlease input your guess.\nYou guessed: 19\nToo small!\nPlease input your guess.\nYou guessed: 20\nToo small!\nPlease input your guess.\nYou guessed: 21\nToo small!\nPlease input your guess.\nYou guessed: 22\nToo small!\nPlease input your guess.\nYou guessed: 23\nToo small!\nPlease input your guess.\nYou guessed: 24\nToo small!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 26\nToo small!\nPlease input your guess.\nYou guessed: 27\nToo small!\nPlease input your guess.\nYou guessed: 28\nToo small!\nPlease input your guess.\nYou guessed: 29\nToo small!\nPlease input your guess.\nYou guessed: 30\nToo small!\nPlease input your guess.\nYou guessed: 31\nToo small!\nPlease input your guess.\nYou guessed: 32\nToo small!\nPlease input your guess.\nYou guessed: 33\nToo small!\nPlease input your guess.\nYou guessed: 34\nToo small!\nPlease input your guess.\nYou guessed: 35\nToo small!\nPlease input your guess.\nYou guessed: 36\nToo small!\nPlease input your guess.\nYou guessed: 37\nToo small!\nPlease input your guess.\nYou guessed: 38\nToo small!\nPlease input your guess.\nYou guessed: 39\nToo small!\nPlease input your guess.\nYou guessed: 40\nToo small!\nPlease input your guess.\nYou guessed: 41\nToo small!\nPlease input your guess.\nYou guessed: 42\nToo small!\nPlease input your guess.\nYou guessed: 43\nToo small!\nPlease input your guess.\nYou guessed: 44\nToo small!\nPlease input your guess.\nYou guessed: 45\nToo small!\nPlease input your guess.\nYou guessed: 46\nToo small!\nPlease input your guess.\nYou guessed: 47\nToo small!\nPlease input your guess.\nYou guessed: 48\nToo small!\nPlease input your guess.\nYou guessed: 49\nYou win!\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "Guess the number!\nPlease input your guess.\nYou guessed: 1\nToo small!\nPlease input your guess.\nYou guessed: 2\nToo small!\nPlease input your guess.\nYou guessed: 3\nToo small!\nPlease input your guess.\nYou guessed: 4\nToo small!\nPlease input your guess.\nYou guessed: 5\nToo small!\nPlease input your guess.\nYou guessed: 6\nToo small!\nPlease input your guess.\nYou guessed: 7\nToo small!\nPlease input your guess.\nYou guessed: 8\nToo small!\nPlease input your guess.\nYou guessed: 9\nToo small!\nPlease input your guess.\nYou guessed: 10\nToo small!\nPlease input your guess.\nYou guessed: 11\nToo small!\nPlease input your guess.\nYou guessed: 12\nToo small!\nPlease input your guess.\nYou guessed: 13\nToo small!\nPlease input your guess.\nYou guessed: 14\nToo small!\nPlease input your guess.\nYou guessed: 15\nToo small!\nPlease input your guess.\nYou guessed: 16\nToo small!\nPlease input your guess.\nYou guessed: 17\nToo small!\nPlease input your guess.\nYou guessed: 18\nToo small!\nPlease input your guess.\nYou guessed: 19\nToo small!\nPlease input your guess.\nYou guessed: 20\nToo small!\nPlease input your guess.\nYou guessed: 21\nToo small!\nPlease input your guess.\nYou guessed: 22\nToo small!\nPlease input your guess.\nYou guessed: 23\nToo small!\nPlease input your guess.\nYou guessed: 24\nToo small!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 26\nToo small!\nPlease input your guess.\nYou guessed: 27\nToo small!\nPlease input your guess.\nYou guessed: 28\nToo small!\nPlease input your guess.\nYou guessed: 29\nToo small!\nPlease input your guess.\nYou guessed: 30\nToo small!\nPlease input your guess.\nYou guessed: 31\nToo small!\nPlease input your guess.\nYou guessed: 32\nToo small!\nPlease input your guess.\nYou guessed: 33\nToo small!\nPlease input your guess.\nYou guessed: 34\nToo small!\nPlease input your guess.\nYou guessed: 35\nToo small!\nPlease input your guess.\nYou guessed: 36\nToo small!\nPlease input your guess.\nYou guessed: 37\nToo small!\nPlease input your guess.\nYou guessed: 38\nToo small!\nPlease input your guess.\nYou guessed: 39\nToo small!\nPlease input your guess.\nYou guessed: 40\nToo small!\nPlease input your guess.\nYou guessed: 41\nToo small!\nPlease input your guess.\nYou guessed: 42\nToo small!\nPlease input your guess.\nYou guessed: 43\nToo small!\nPlease input your guess.\nYou guessed: 44\nToo small!\nPlease input your guess.\nYou guessed: 45\nToo small!\nPlease input your guess.\nYou guessed: 46\nToo small!\nPlease input your guess.\nYou guessed: 47\nToo small!\nPlease input your guess.\nYou guessed: 48\nToo small!\nPlease input your guess.\nYou guessed: 49\nYou win!\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch6/game"
     }
    ]
   },
   "stdin": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n100\n",
   "screen": "Guess the number!\nPlease input your guess.\n1\nYou guessed: 1\nToo small!\nPlease input your guess.\n2\nYou guessed: 2\nToo small!\nPlease input your guess.\n3\nYou guessed: 3\nToo small!\nPlease input your guess.\n4\nYou guessed: 4\nToo small!\nPlease input your guess.\n5\nYou guessed: 5\nToo small!\nPlease input your guess.\n6\nYou guessed: 6\nToo small!\nPlease input your guess.\n7\nYou guessed: 7\nToo small!\nPlease input your guess.\n8\nYou guessed: 8\nToo small!\nPlease input your guess.\n9\nYou guessed: 9\nToo small!\nPlease input your guess.\n10\nYou guessed: 10\nToo small!\nPlease input your guess.\n11\nYou guessed: 11\nToo small!\nPlease input your guess.\n12\nYou guessed: 12\nToo small!\nPlease input your guess.\n13\nYou guessed: 13\nToo small!\nPlease input your guess.\n14\nYou guessed: 14\nToo small!\nPlease input your guess.\n15\nYou guessed: 15\nToo small!\nPlease input your guess.\n16\nYou guessed: 16\nToo small!\nPlease input your guess.\n17\nYou guessed: 17\nToo small!\nPlease input your guess.\n18\nYou guessed: 18\nToo small!\nPlease input your guess.\n19\nYou guessed: 19\nToo small!\nPlease input your guess.\n20\nYou guessed: 20\nToo small!\nPlease input your guess.\n21\nYou guessed: 21\nToo small!\nPlease input your guess.\n22\nYou guessed: 22\nToo small!\nPlease input your guess.\n23\nYou guessed: 23\nToo small!\nPlease input your guess.\n24\nYou guessed: 24\nYou win!\n"
  },
  "game_abc.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/game_abc"
    }
   ],
   "stdin": "abc\n42\n",
   "screen": "Guess the number!\nPlease input your guess.\nabc\nPlease input your guess.\n42\nYou guessed: 42\nYou win!\n"
  },
  "game_crash.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n        let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:12:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:12:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch6/game_crash",
     "merged": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\n\nthread 'main' (1) panicked at src/main.rs:12:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ],
   "stdin": "50\nabc\n",
   "screen": "Guess the number!\nPlease input your guess.\n50\nYou guessed: 50\nToo big!\nPlease input your guess.\nabc\n\nthread 'main' (1) panicked at src/main.rs:12:47:\nPlease type a number!: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
  },
  "game_fixed.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/game_fixed"
    }
   ],
   "stdin": "50\nabc\n25\n42\n",
   "screen": "Guess the number!\nPlease input your guess.\n50\nYou guessed: 50\nToo big!\nPlease input your guess.\nabc\nPlease input your guess.\n25\nYou guessed: 25\nToo small!\nPlease input your guess.\n42\nYou guessed: 42\nYou win!\n"
  },
  "game_loop.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n        let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 50\nToo big!\nPlease input your guess.\nYou guessed: 25\nToo small!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/game_loop"
    }
   ],
   "stdin": "50\n25\n42\n",
   "screen": "Guess the number!\nPlease input your guess.\n50\nYou guessed: 50\nToo big!\nPlease input your guess.\n25\nYou guessed: 25\nToo small!\nPlease input your guess.\n42\nYou guessed: 42\nYou win!\n"
  },
  "game_lucky.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => continue,\n        };\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\nYou guessed: 42\nYou win!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/game_lucky"
    }
   ],
   "stdin": "42\n",
   "screen": "Guess the number!\nPlease input your guess.\n42\nYou guessed: 42\nYou win!\n"
  },
  "no_dep.rs": {
   "src": "fn main() {\n    let secret_number = rand::random_range(1..=100);\n    println!(\"The secret number is: {secret_number}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0433]: cannot find module or crate `rand` in this scope\n --> src/main.rs:2:25\n  |\n2 |     let secret_number = rand::random_range(1..=100);\n  |                         ^^^^ use of unresolved module or unlinked crate `rand`\n  |\n  = help: if you wanted to use a crate named `rand`, use `cargo add rand` to add it to your `Cargo.toml`\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `no_dep` (bin \"no_dep\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0433]: cannot find module or crate `rand` in this scope\n --> src/main.rs:2:25\n  |\n2 |     let secret_number = rand::random_range(1..=100);\n  |                         ^^^^ use of unresolved module or unlinked crate `rand`\n  |\n  = help: if you wanted to use a crate named `rand`, use `cargo add rand` to add it to your `Cargo.toml`\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `no_dep` (bin \"no_dep\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/no_dep"
    }
   ]
  },
  "no_expect.rs": {
   "src": "use std::io;\n\nfn main() {\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess);\n    println!(\"You guessed: {guess}\");\n}\n",
   "stdout": "You guessed: 42\n\n",
   "stderr": "warning: unused `Result` that must be used\n --> src/main.rs:5:5\n  |\n5 |     io::stdin().read_line(&mut guess);\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n5 |     let _ = io::stdin().read_line(&mut guess);\n  |     +++++++\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "You guessed: 42\n\n",
     "err": "warning: unused `Result` that must be used\n --> src/main.rs:5:5\n  |\n5 |     io::stdin().read_line(&mut guess);\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n5 |     let _ = io::stdin().read_line(&mut guess);\n  |     +++++++\n\n",
     "exit": 0,
     "dir": "~/rust-ch6/no_expect",
     "merged": "warning: unused `Result` that must be used\n --> src/main.rs:5:5\n  |\n5 |     io::stdin().read_line(&mut guess);\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n5 |     let _ = io::stdin().read_line(&mut guess);\n  |     +++++++\n\nYou guessed: 42\n\n"
    }
   ],
   "stdin": "42\n",
   "screen": "warning: unused `Result` that must be used\n --> src/main.rs:5:5\n  |\n5 |     io::stdin().read_line(&mut guess);\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n5 |     let _ = io::stdin().read_line(&mut guess);\n  |     +++++++\n\n42\nYou guessed: 42\n\n"
  },
  "no_mut.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Which book would you like?\");\n    let title = String::new();\n    io::stdin().read_line(&mut title).expect(\"Failed to read line\");\n    println!(\"Fetching: {title}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `title` as mutable, as it is not declared as mutable\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&mut title).expect(\"Failed to read line\");\n  |                           ^^^^^^^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n5 |     let mut title = String::new();\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `no_mut` (bin \"no_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `title` as mutable, as it is not declared as mutable\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&mut title).expect(\"Failed to read line\");\n  |                           ^^^^^^^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n5 |     let mut title = String::new();\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `no_mut` (bin \"no_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/no_mut"
    }
   ]
  },
  "no_trim.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Please input your guess.\");\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    let guess: u32 = guess.parse().expect(\"need a number\");\n\n    println!(\"You guessed: {guess}\");\n}\n",
   "stdout": "Please input your guess.\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:8:36:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Please input your guess.\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:8:36:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch6/no_trim",
     "merged": "Please input your guess.\n\nthread 'main' (1) panicked at src/main.rs:8:36:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ],
   "stdin": "42\n",
   "screen": "Please input your guess.\n42\n\nthread 'main' (1) panicked at src/main.rs:8:36:\nneed a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
  },
  "no_use.rs": {
   "src": "fn main() {\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n    println!(\"You guessed: {guess}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0433]: cannot find module or crate `io` in this scope\n --> src/main.rs:3:5\n  |\n3 |     io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n  |     ^^ use of unresolved module or unlinked crate `io`\n  |\n  = help: if you wanted to use a crate named `io`, use `cargo add io` to add it to your `Cargo.toml`\nhelp: a builtin type with a similar name exists\n  |\n3 -     io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n3 +     i8::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n  |\nhelp: consider importing this module\n  |\n1 + use std::io;\n  |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `no_use` (bin \"no_use\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0433]: cannot find module or crate `io` in this scope\n --> src/main.rs:3:5\n  |\n3 |     io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n  |     ^^ use of unresolved module or unlinked crate `io`\n  |\n  = help: if you wanted to use a crate named `io`, use `cargo add io` to add it to your `Cargo.toml`\nhelp: a builtin type with a similar name exists\n  |\n3 -     io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n3 +     i8::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n  |\nhelp: consider importing this module\n  |\n1 + use std::io;\n  |\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `no_use` (bin \"no_use\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/no_use"
    }
   ]
  },
  "parse_machine.rs": {
   "src": "fn main() {\n    println!(\"{:?}\", \"42\".parse::<u32>());\n    println!(\"{:?}\", \"007\".parse::<u32>());\n    println!(\"{:?}\", \"42\\n\".parse::<u32>());\n    println!(\"{:?}\", \"\".parse::<u32>());\n    println!(\"{:?}\", \"-5\".parse::<u32>());\n    println!(\"{:?}\", \"5000000000\".parse::<u32>());\n}\n",
   "stdout": "Ok(42)\nOk(7)\nErr(ParseIntError { kind: InvalidDigit })\nErr(ParseIntError { kind: Empty })\nErr(ParseIntError { kind: InvalidDigit })\nErr(ParseIntError { kind: PosOverflow })\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ok(42)\nOk(7)\nErr(ParseIntError { kind: InvalidDigit })\nErr(ParseIntError { kind: Empty })\nErr(ParseIntError { kind: InvalidDigit })\nErr(ParseIntError { kind: PosOverflow })\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parse_machine"
    }
   ]
  },
  "parse_ok.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Please input your guess.\");\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");\n\n    println!(\"You guessed: {guess}\");\n    println!(\"One more is {}\", guess + 1);\n}\n",
   "stdout": "Please input your guess.\nYou guessed: 42\nOne more is 43\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Please input your guess.\nYou guessed: 42\nOne more is 43\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parse_ok"
    }
   ],
   "stdin": "42\n",
   "screen": "Please input your guess.\n42\nYou guessed: 42\nOne more is 43\n"
  },
  "parse_result.rs": {
   "src": "fn main() {\n    let n: i32 = \"42\".parse();\n    println!(\"{n}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:2:18\n  |\n2 |     let n: i32 = \"42\".parse();\n  |            ---   ^^^^^^^^^^^^ expected `i32`, found `Result<_, _>`\n  |            |\n  |            expected due to this\n  |\n  = note: expected type `i32`\n             found enum `Result<_, _>`\nhelp: consider using `Result::expect` to unwrap the `Result<_, _>` value, panicking if the value is a `Result::Err`\n  |\n2 |     let n: i32 = \"42\".parse().expect(\"REASON\");\n  |                              +++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `parse_result` (bin \"parse_result\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:2:18\n  |\n2 |     let n: i32 = \"42\".parse();\n  |            ---   ^^^^^^^^^^^^ expected `i32`, found `Result<_, _>`\n  |            |\n  |            expected due to this\n  |\n  = note: expected type `i32`\n             found enum `Result<_, _>`\nhelp: consider using `Result::expect` to unwrap the `Result<_, _>` value, panicking if the value is a `Result::Err`\n  |\n2 |     let n: i32 = \"42\".parse().expect(\"REASON\");\n  |                              +++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `parse_result` (bin \"parse_result\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/parse_result"
    }
   ]
  },
  "parse_unknown.rs": {
   "src": "fn main() {\n    let n = \"42\".parse().expect(\"need a number\");\n    println!(\"{n}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0284]: type annotations needed\n --> src/main.rs:2:9\n  |\n2 |     let n = \"42\".parse().expect(\"need a number\");\n  |         ^        ----- type must be known at this point\n  |\n  = note: cannot satisfy `<_ as FromStr>::Err == _`\n  = note: the type must also implement `FromStr`\nnote: required by a bound in `core::str::<impl str>::parse`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/str/mod.rs:2782:4\nhelp: consider giving `n` an explicit type\n  |\n2 |     let n: /* Type */ = \"42\".parse().expect(\"need a number\");\n  |          ++++++++++++\n\nFor more information about this error, try `rustc --explain E0284`.\nerror: could not compile `parse_unknown` (bin \"parse_unknown\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0284]: type annotations needed\n --> src/main.rs:2:9\n  |\n2 |     let n = \"42\".parse().expect(\"need a number\");\n  |         ^        ----- type must be known at this point\n  |\n  = note: cannot satisfy `<_ as FromStr>::Err == _`\n  = note: the type must also implement `FromStr`\nnote: required by a bound in `core::str::<impl str>::parse`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/str/mod.rs:2782:4\nhelp: consider giving `n` an explicit type\n  |\n2 |     let n: /* Type */ = \"42\".parse().expect(\"need a number\");\n  |          ++++++++++++\n\nFor more information about this error, try `rustc --explain E0284`.\nerror: could not compile `parse_unknown` (bin \"parse_unknown\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/parse_unknown"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0284]: type annotations needed\n --> src/main.rs:2:9\n  |\n2 |     let n = \"42\".parse().expect(\"need a number\");\n  |         ^        ----- type must be known at this point\n  |\n  = note: cannot satisfy `<_ as FromStr>::Err == _`\nhelp: consider giving `n` an explicit type\n  |\n2 |     let n: /* Type */ = \"42\".parse().expect(\"need a number\");\n  |          ++++++++++++\n\nFor more information about this error, try `rustc --explain E0284`.\nerror: could not compile `parse_unknown` (bin \"parse_unknown\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0284]: type annotations needed\n --> src/main.rs:2:9\n  |\n2 |     let n = \"42\".parse().expect(\"need a number\");\n  |         ^        ----- type must be known at this point\n  |\n  = note: cannot satisfy `<_ as FromStr>::Err == _`\nhelp: consider giving `n` an explicit type\n  |\n2 |     let n: /* Type */ = \"42\".parse().expect(\"need a number\");\n  |          ++++++++++++\n\nFor more information about this error, try `rustc --explain E0284`.\nerror: could not compile `parse_unknown` (bin \"parse_unknown\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch6/parse_unknown"
     }
    ]
   }
  },
  "parsons_cmp.rs": {
   "src": "use std::cmp::Ordering;\nfn main() {\n    let text = \" 73\\n\".to_string();\n    let guess: u32 = text.trim().parse().expect(\"need a number\");\n    let verdict: Ordering = guess.cmp(&50);\n    println!(\"{guess} vs 50: {verdict:?}\");\n}\n",
   "stdout": "73 vs 50: Greater\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "73 vs 50: Greater\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parsons_cmp"
    }
   ]
  },
  "parsons_read.rs": {
   "src": "use std::io;\nfn main() {\n    println!(\"Type a number:\");\n    let mut text = String::new();\n    io::stdin().read_line(&mut text).expect(\"Failed to read\");\n    let n: u32 = text.trim().parse().expect(\"need a number\");\n    println!(\"Double: {}\", n * 2);\n}\n",
   "stdout": "Type a number:\nDouble: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Type a number:\nDouble: 42\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parsons_read"
    }
   ],
   "stdin": "21\n",
   "screen": "Type a number:\n21\nDouble: 42\n"
  },
  "parsons_read_alt.rs": {
   "src": "use std::io;\nfn main() {\n    let mut text = String::new();\n    println!(\"Type a number:\");\n    io::stdin().read_line(&mut text).expect(\"Failed to read\");\n    let n: u32 = text.trim().parse().expect(\"need a number\");\n    println!(\"Double: {}\", n * 2);\n}\n",
   "stdout": "Type a number:\nDouble: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Type a number:\nDouble: 42\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/parsons_read_alt"
    }
   ],
   "stdin": "21\n",
   "screen": "Type a number:\n21\nDouble: 42\n"
  },
  "predict_cmp.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let secret: u32 = 30;\n    for guess in [45, 30, 12] {\n        match guess.cmp(&secret) {\n            Ordering::Less => println!(\"{guess}: too small\"),\n            Ordering::Greater => println!(\"{guess}: too big\"),\n            Ordering::Equal => println!(\"{guess}: you win\"),\n        }\n    }\n}\n",
   "stdout": "45: too big\n30: you win\n12: too small\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "45: too big\n30: you win\n12: too small\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/predict_cmp"
    }
   ]
  },
  "predict_echo.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"What's your name?\");\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).expect(\"Failed to read line\");\n    println!(\"Hello, {name}!\");\n    println!(\"Welcome to the library.\");\n}\n",
   "stdout": "What's your name?\nHello, Mabel\n!\nWelcome to the library.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "What's your name?\nHello, Mabel\n!\nWelcome to the library.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/predict_echo"
    }
   ],
   "stdin": "Mabel\n",
   "screen": "What's your name?\nMabel\nHello, Mabel\n!\nWelcome to the library.\n"
  },
  "predict_parse.rs": {
   "src": "fn main() {\n    let a: u32 = \"12\".parse().expect(\"need a number\");\n    let b: u32 = \" 30 \".trim().parse().expect(\"need a number\");\n    let c = \"8\".parse::<u32>().expect(\"need a number\");\n    println!(\"{}\", a + b + c);\n    println!(\"{:?}\", \"12\".parse::<u8>());\n    println!(\"{:?}\", \"1 2\".parse::<u8>());\n}\n",
   "stdout": "50\nOk(12)\nErr(ParseIntError { kind: InvalidDigit })\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "50\nOk(12)\nErr(ParseIntError { kind: InvalidDigit })\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/predict_parse"
    }
   ]
  },
  "roll.rs": {
   "src": "fn main() {\n    let a = rand::random_range(1..=6);\n    let b = rand::random_range(1..=6);\n    println!(\"You rolled {a} and {b}.\");\n}\n",
   "stdout": "You rolled 1 and 5.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "You rolled 1 and 5.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/roll"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "You rolled 3 and 6.\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "You rolled 3 and 6.\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch6/roll"
     }
    ]
   }
  },
  "secret.rs": {
   "src": "fn main() {\n    println!(\"Guess the number!\");\n\n    let secret_number = rand::random_range(1..=100);\n\n    println!(\"The secret number is: {secret_number}\");\n}\n",
   "stdout": "Guess the number!\nThe secret number is: 94\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nThe secret number is: 94\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/secret"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "Guess the number!\nThe secret number is: 2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "Guess the number!\nThe secret number is: 2\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch6/secret"
     }
    ]
   }
  },
  "seeded.rs": {
   "src": "use rand::prelude::*;\n\nfn main() {\n    let mut rng = StdRng::seed_from_u64(2026);\n    for _ in 0..3 {\n        println!(\"{}\", rng.random_range(1..=100));\n    }\n}\n",
   "stdout": "4\n40\n31\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "4\n40\n31\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/seeded"
    }
   ]
  },
  "show_newline.rs": {
   "src": "use std::io;\n\nfn main() {\n    let mut guess = String::new();\n    io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n    println!(\"Raw:     {guess:?} has length {}\", guess.len());\n\n    let opened = guess.trim();\n    println!(\"Trimmed: {opened:?} has length {}\", opened.len());\n}\n",
   "stdout": "Raw:     \"42\\n\" has length 3\nTrimmed: \"42\" has length 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Raw:     \"42\\n\" has length 3\nTrimmed: \"42\" has length 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/show_newline"
    }
   ],
   "stdin": "42\n",
   "screen": "42\nRaw:     \"42\\n\" has length 3\nTrimmed: \"42\" has length 2\n"
  },
  "spot_break.rs": {
   "src": "use std::cmp::Ordering;\nuse std::io;\n\nfn main() {\n    println!(\"Guess the number!\");\n    let secret_number = 42;\n\n    loop {\n        println!(\"Please input your guess.\");\n        let mut guess = String::new();\n        io::stdin().read_line(&mut guess).expect(\"Failed to read line\");\n\n        let guess: u32 = match guess.trim().parse() {\n            Ok(num) => num,\n            Err(_) => break,\n        };\n\n        println!(\"You guessed: {guess}\");\n\n        match guess.cmp(&secret_number) {\n            Ordering::Less => println!(\"Too small!\"),\n            Ordering::Greater => println!(\"Too big!\"),\n            Ordering::Equal => {\n                println!(\"You win!\");\n                break;\n            }\n        }\n    }\n}\n",
   "stdout": "Guess the number!\nPlease input your guess.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Guess the number!\nPlease input your guess.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/spot_break"
    }
   ],
   "stdin": "abc\n42\n",
   "screen": "Guess the number!\nPlease input your guess.\nabc\n"
  },
  "spot_read.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"Your library card number?\");\n    let mut card = String::new();\n    io::stdin().read_line(&card).expect(\"Failed to read line\");\n    println!(\"Card {card} found.\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&card).expect(\"Failed to read line\");\n  |                 --------- ^^^^^ types differ in mutability\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected mutable reference `&mut String`\n                     found reference `&String`\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/io/stdio.rs:412:11\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_read` (bin \"spot_read\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&card).expect(\"Failed to read line\");\n  |                 --------- ^^^^^ types differ in mutability\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected mutable reference `&mut String`\n                     found reference `&String`\nnote: method defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/io/stdio.rs:412:11\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_read` (bin \"spot_read\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/spot_read"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0308]: mismatched types\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&card).expect(\"Failed to read line\");\n  |                 --------- ^^^^^ types differ in mutability\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected mutable reference `&mut String`\n                     found reference `&String`\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/stdio.rs:412:11\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_read` (bin \"spot_read\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0308]: mismatched types\n --> src/main.rs:6:27\n  |\n6 |     io::stdin().read_line(&card).expect(\"Failed to read line\");\n  |                 --------- ^^^^^ types differ in mutability\n  |                 |\n  |                 arguments to this method are incorrect\n  |\n  = note: expected mutable reference `&mut String`\n                     found reference `&String`\nnote: method defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/stdio.rs:412:11\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_read` (bin \"spot_read\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch6/spot_read"
     }
    ]
   }
  },
  "spot_trim.rs": {
   "src": "use std::io;\n\nfn main() {\n    println!(\"How old are you?\");\n    let mut age = String::new();\n    io::stdin().read_line(&mut age).expect(\"Failed to read line\");\n    let age: u8 = age.parse().expect(\"age must be a number\");\n    println!(\"Next year you'll be {}.\", age + 1);\n}\n",
   "stdout": "How old are you?\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:7:31:\nage must be a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "How old are you?\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:7:31:\nage must be a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch6/spot_trim",
     "merged": "How old are you?\n\nthread 'main' (1) panicked at src/main.rs:7:31:\nage must be a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ],
   "stdin": "9\n",
   "screen": "How old are you?\n9\n\nthread 'main' (1) panicked at src/main.rs:7:31:\nage must be a number: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
  },
  "str_fixed.rs": {
   "src": "fn main() {\n    let name: String = \"Mabel\".to_string();\n    println!(\"Hello, {name}!\");\n}\n",
   "stdout": "Hello, Mabel!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Hello, Mabel!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/str_fixed"
    }
   ]
  },
  "str_mismatch.rs": {
   "src": "fn main() {\n    let name: String = \"Mabel\";\n    println!(\"Hello, {name}!\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:2:24\n  |\n2 |     let name: String = \"Mabel\";\n  |               ------   ^^^^^^^ expected `String`, found `&str`\n  |               |\n  |               expected due to this\n  |\nhelp: try using a conversion method\n  |\n2 |     let name: String = \"Mabel\".to_string();\n  |                               ++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `str_mismatch` (bin \"str_mismatch\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:2:24\n  |\n2 |     let name: String = \"Mabel\";\n  |               ------   ^^^^^^^ expected `String`, found `&str`\n  |               |\n  |               expected due to this\n  |\nhelp: try using a conversion method\n  |\n2 |     let name: String = \"Mabel\".to_string();\n  |                               ++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `str_mismatch` (bin \"str_mismatch\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch6/str_mismatch"
    }
   ]
  },
  "trace_game.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let secret: u32 = 63;\n    let mut tries = 0;\n    for guess in [50, 75, 62, 63] {\n        tries += 1;\n        let verdict = match guess.cmp(&secret) {\n            Ordering::Less => \"small\",\n            Ordering::Greater => \"big\",\n            Ordering::Equal => \"win\",\n        };\n        println!(\"{tries} {guess} {verdict}\");\n    }\n}\n",
   "stdout": "1 50 small\n2 75 big\n3 62 small\n4 63 win\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 50 small\n2 75 big\n3 62 small\n4 63 win\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/trace_game"
    }
   ]
  },
  "trace_trim.rs": {
   "src": "fn main() {\n    let letters = [\"42\\n\", \"7\", \"\\n\", \"abc\\n\", \"\\t9\\n\"];\n    for text in letters {\n        println!(\"{:?} {} {}\", text, text.len(), text.trim().len());\n    }\n}\n",
   "stdout": "\"42\\n\" 3 2\n\"7\" 1 1\n\"\\n\" 1 0\n\"abc\\n\" 4 3\n\"\\t9\\n\" 3 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"42\\n\" 3 2\n\"7\" 1 1\n\"\\n\" 1 0\n\"abc\\n\" 4 3\n\"\\t9\\n\" 3 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/trace_trim"
    }
   ]
  },
  "two_ways.rs": {
   "src": "fn main() {\n    let a: u32 = \"42\".parse().expect(\"need a number\");\n    let b = \"58\".parse::<u32>().expect(\"need a number\");\n    println!(\"{a} + {b} = {}\", a + b);\n}\n",
   "stdout": "42 + 58 = 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "42 + 58 = 100\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch6/two_ways"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
