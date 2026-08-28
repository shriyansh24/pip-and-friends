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
  "workdir": "/home/you/rust-ch3",
  "versionDifferences": [
   "mix_types.rs",
   "odo_boss_error.rs",
   "tuple_display.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): mix_types.rs, odo_boss_error.rs, tuple_display.rs."
 },
 "programs": {
  "arithmetic.rs": {
   "src": "fn main() {\n    println!(\"7 + 2 = {}\", 7 + 2);\n    println!(\"7 - 2 = {}\", 7 - 2);\n    println!(\"7 * 2 = {}\", 7 * 2);\n    println!(\"7 / 2 = {}\", 7 / 2);\n    println!(\"7 % 2 = {}\", 7 % 2);\n    println!(\"7.0 / 2.0 = {}\", 7.0 / 2.0);\n    println!(\"-7 / 2 = {}\", -7 / 2);\n}\n",
   "stdout": "7 + 2 = 9\n7 - 2 = 5\n7 * 2 = 14\n7 / 2 = 3\n7 % 2 = 1\n7.0 / 2.0 = 3.5\n-7 / 2 = -3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 + 2 = 9\n7 - 2 = 5\n7 * 2 = 14\n7 / 2 = 3\n7 % 2 = 1\n7.0 / 2.0 = 3.5\n-7 / 2 = -3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/arithmetic"
    }
   ]
  },
  "as_text.rs": {
   "src": "fn main() {\n    let n = \"5\" as i32;\n    println!(\"{n}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0606]: casting `&'static str` as `i32` is invalid\n --> src/main.rs:2:13\n  |\n2 |     let n = \"5\" as i32;\n  |             ^^^^^^^^^^\n  |\n  = help: cast through a raw pointer first\n\nFor more information about this error, try `rustc --explain E0606`.\nerror: could not compile `as_text` (bin \"as_text\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0606]: casting `&'static str` as `i32` is invalid\n --> src/main.rs:2:13\n  |\n2 |     let n = \"5\" as i32;\n  |             ^^^^^^^^^^\n  |\n  = help: cast through a raw pointer first\n\nFor more information about this error, try `rustc --explain E0606`.\nerror: could not compile `as_text` (bin \"as_text\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/as_text"
    }
   ]
  },
  "big_fixed.rs": {
   "src": "fn main() {\n    let small = 42;\n    let big: u64 = 3_000_000_000;\n    println!(\"{small} {big}\");\n}\n",
   "stdout": "42 3000000000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "42 3000000000\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/big_fixed"
    }
   ]
  },
  "bools.rs": {
   "src": "fn main() {\n    let age = 12;\n    let is_teen = age >= 13;\n    let can_ride = age > 10;\n    println!(\"{is_teen}\");\n    println!(\"{can_ride}\");\n    println!(\"{}\", 3 == 3);\n    println!(\"{}\", 3 != 3);\n    println!(\"{}\", 2.5 <= 2.0);\n}\n",
   "stdout": "false\ntrue\ntrue\nfalse\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "false\ntrue\ntrue\nfalse\nfalse\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/bools"
    }
   ]
  },
  "bubbles.rs": {
   "src": "fn main() {\n    print!(\"Odometer \");\n    print!(\"check: \");\n    println!(\"OK\");\n    println!(\"Fuel: {}%\", 80);\n    print!(\"Done\");\n    println!();\n}\n",
   "stdout": "Odometer check: OK\nFuel: 80%\nDone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Odometer check: OK\nFuel: 80%\nDone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/bubbles"
    }
   ]
  },
  "casting.rs": {
   "src": "fn main() {\n    let count: i32 = 3;\n    let price: f64 = 2.5;\n    let total = count as f64 * price;\n    println!(\"{total}\");\n    println!(\"{}\", 7.9 as i32);\n    println!(\"{}\", -7.9 as i32);\n    println!(\"{}\", 'A' as u32);\n    println!(\"{}\", 66u8 as char);\n    println!(\"{}\", true as i32);\n}\n",
   "stdout": "7.5\n7\n-7\n65\nB\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7.5\n7\n-7\n65\nB\n1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/casting"
    }
   ]
  },
  "char_quotes.rs": {
   "src": "fn main() {\n    let c: char = \"a\";\n    println!(\"{c}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:2:19\n  |\n2 |     let c: char = \"a\";\n  |            ----   ^^^ expected `char`, found `&str`\n  |            |\n  |            expected due to this\n  |\nhelp: if you meant to write a `char` literal, use single quotes\n  |\n2 -     let c: char = \"a\";\n2 +     let c: char = 'a';\n  |\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `char_quotes` (bin \"char_quotes\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:2:19\n  |\n2 |     let c: char = \"a\";\n  |            ----   ^^^ expected `char`, found `&str`\n  |            |\n  |            expected due to this\n  |\nhelp: if you meant to write a `char` literal, use single quotes\n  |\n2 -     let c: char = \"a\";\n2 +     let c: char = 'a';\n  |\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `char_quotes` (bin \"char_quotes\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/char_quotes"
    }
   ]
  },
  "chars.rs": {
   "src": "fn main() {\n    let letter = 'M';\n    let accent = 'é';\n    let greek = 'λ';\n    let balloon = '🎈';\n    let quote = '\\'';\n    println!(\"{letter} {accent} {greek} {balloon} {quote}\");\n    println!(\"A char takes {} bytes\", std::mem::size_of::<char>());\n}\n",
   "stdout": "M é λ 🎈 '\nA char takes 4 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "M é λ 🎈 '\nA char takes 4 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/chars"
    }
   ]
  },
  "cookies.rs": {
   "src": "fn main() {\n    let cookies = 7;\n    let friends = 2;\n    println!(\"{cookies} {friends} {} {}\", cookies / friends, cookies % friends);\n    let cookies = 10;\n    let friends = 3;\n    println!(\"{cookies} {friends} {} {}\", cookies / friends, cookies % friends);\n    let cookies = 9;\n    let friends = 4;\n    println!(\"{cookies} {friends} {} {}\", cookies / friends, cookies % friends);\n    let cookies = 3;\n    let friends = 5;\n    println!(\"{cookies} {friends} {} {}\", cookies / friends, cookies % friends);\n}\n",
   "stdout": "7 2 3 1\n10 3 3 1\n9 4 2 1\n3 5 0 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 2 3 1\n10 3 3 1\n9 4 2 1\n3 5 0 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/cookies"
    }
   ]
  },
  "dbg_demo.rs": {
   "src": "fn main() {\n    let km = 12;\n    let doubled = dbg!(km * 2);\n    let total = dbg!(doubled + 1);\n    println!(\"total is {total}\");\n}\n",
   "stdout": "total is 25\n",
   "stderr": "[src/main.rs:3:19] km * 2 = 24\n[src/main.rs:4:17] doubled + 1 = 25\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "total is 25\n",
     "err": "[src/main.rs:3:19] km * 2 = 24\n[src/main.rs:4:17] doubled + 1 = 25\n",
     "exit": 0,
     "dir": "~/rust-ch3/dbg_demo",
     "merged": "[src/main.rs:3:19] km * 2 = 24\n[src/main.rs:4:17] doubled + 1 = 25\ntotal is 25\n"
    }
   ]
  },
  "default_i32.rs": {
   "src": "fn main() {\n    let small = 42;\n    let big = 3_000_000_000;\n    println!(\"{small} {big}\");\n}\n",
   "stdout": "",
   "stderr": "error: literal out of range for `i32`\n --> src/main.rs:3:15\n  |\n3 |     let big = 3_000_000_000;\n  |               ^^^^^^^^^^^^^\n  |\n  = note: the literal `3_000_000_000` does not fit into the type `i32` whose range is `-2147483648..=2147483647`\n  = help: consider using the type `u32` instead\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `default_i32` (bin \"default_i32\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: literal out of range for `i32`\n --> src/main.rs:3:15\n  |\n3 |     let big = 3_000_000_000;\n  |               ^^^^^^^^^^^^^\n  |\n  = note: the literal `3_000_000_000` does not fit into the type `i32` whose range is `-2147483648..=2147483647`\n  = help: consider using the type `u32` instead\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `default_i32` (bin \"default_i32\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/default_i32"
    }
   ]
  },
  "display_debug.rs": {
   "src": "fn main() {\n    let word = \"hi\";\n    let letter = 'M';\n    let whole = 1.0;\n    let point = (3, 4);\n    println!(\"{word} {letter} {whole}\");\n    println!(\"{word:?} {letter:?} {whole:?}\");\n    println!(\"{point:?}\");\n    println!(\"{point:#?}\");\n}\n",
   "stdout": "hi M 1\n\"hi\" 'M' 1.0\n(3, 4)\n(\n    3,\n    4,\n)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hi M 1\n\"hi\" 'M' 1.0\n(3, 4)\n(\n    3,\n    4,\n)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/display_debug"
    }
   ]
  },
  "divide_seen.rs": {
   "src": "fn main() {\n    let cookies = 7;\n    let friends = 0;\n    println!(\"Each friend gets {}\", cookies / friends);\n}\n",
   "stdout": "",
   "stderr": "error: this operation will panic at runtime\n --> src/main.rs:4:37\n  |\n4 |     println!(\"Each friend gets {}\", cookies / friends);\n  |                                     ^^^^^^^^^^^^^^^^^ attempt to divide `7_i32` by zero\n  |\n  = note: `#[deny(unconditional_panic)]` on by default\n\nerror: could not compile `divide_seen` (bin \"divide_seen\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: this operation will panic at runtime\n --> src/main.rs:4:37\n  |\n4 |     println!(\"Each friend gets {}\", cookies / friends);\n  |                                     ^^^^^^^^^^^^^^^^^ attempt to divide `7_i32` by zero\n  |\n  = note: `#[deny(unconditional_panic)]` on by default\n\nerror: could not compile `divide_seen` (bin \"divide_seen\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/divide_seen"
    }
   ]
  },
  "divide_zero.rs": {
   "src": "fn main() {\n    let cookies = 7;\n    let friends = std::hint::black_box(0);\n    println!(\"Sharing {cookies} cookies...\");\n    println!(\"Each friend gets {}\", cookies / friends);\n}\n",
   "stdout": "Sharing 7 cookies...\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:5:37:\nattempt to divide by zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Sharing 7 cookies...\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:5:37:\nattempt to divide by zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch3/divide_zero",
     "merged": "Sharing 7 cookies...\n\nthread 'main' (1) panicked at src/main.rs:5:37:\nattempt to divide by zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "escape_braces.rs": {
   "src": "fn main() {\n    let n = 5;\n    println!(\"Use {{}} to make a hole: {}\", n);\n    println!(\"{{n}} prints the braces, {n} prints the value\");\n}\n",
   "stdout": "Use {} to make a hole: 5\n{n} prints the braces, 5 prints the value\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Use {} to make a hole: 5\n{n} prints the braces, 5 prints the value\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/escape_braces"
    }
   ]
  },
  "fill_as.rs": {
   "src": "fn main() {\n    let total_km: i32 = 7;\n    let days: i32 = 2;\n    let km = total_km as f64;\n    let d = days as f64;\n    println!(\"{} km per day\", km / d);\n}\n",
   "stdout": "3.5 km per day\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3.5 km per day\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/fill_as"
    }
   ]
  },
  "fill_char.rs": {
   "src": "fn main() {\n    let initial: char = 'M';\n    let name = \"Mabel\";\n    println!(\"{initial} is for {name}\");\n}\n",
   "stdout": "M is for Mabel\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "M is for Mabel\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/fill_char"
    }
   ]
  },
  "fill_table.rs": {
   "src": "fn main() {\n    let apples = 3;\n    let pears = 12;\n    println!(\"{:<6}|{:>4}\", \"fruit\", \"qty\");\n    println!(\"{:<6}|{:>4}\", \"apple\", apples);\n    println!(\"{:<6}|{:>4}\", \"pear\", pears);\n}\n",
   "stdout": "fruit | qty\napple |   3\npear  |  12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "fruit | qty\napple |   3\npear  |  12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/fill_table"
    }
   ]
  },
  "float_zero.rs": {
   "src": "fn main() {\n    let zero = std::hint::black_box(0.0);\n    println!(\"{}\", 7.0 / zero);\n    println!(\"{}\", -7.0 / zero);\n    println!(\"{}\", zero / zero);\n}\n",
   "stdout": "inf\n-inf\nNaN\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "inf\n-inf\nNaN\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/float_zero"
    }
   ]
  },
  "floats.rs": {
   "src": "fn main() {\n    let price = 2.5;\n    let small: f32 = 0.1;\n    let sum = 0.1 + 0.2;\n    println!(\"{price}\");\n    println!(\"{small}\");\n    println!(\"{sum}\");\n    println!(\"{}\", sum == 0.3);\n}\n",
   "stdout": "2.5\n0.1\n0.30000000000000004\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "2.5\n0.1\n0.30000000000000004\nfalse\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/floats"
    }
   ]
  },
  "format_ruler.rs": {
   "src": "fn main() {\n    let n = 42;\n    let pi = 3.14159;\n    println!(\"[{n}]\");\n    println!(\"[{n:>5}]\");\n    println!(\"[{n:<5}]\");\n    println!(\"[{n:^5}]\");\n    println!(\"[{n:05}]\");\n    println!(\"[{n:*^9}]\");\n    println!(\"[{pi:.2}]\");\n    println!(\"[{pi:8.3}]\");\n    println!(\"[{n:+}]\");\n}\n",
   "stdout": "[42]\n[   42]\n[42   ]\n[ 42  ]\n[00042]\n[***42****]\n[3.14]\n[   3.142]\n[+42]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[42]\n[   42]\n[42   ]\n[ 42  ]\n[00042]\n[***42****]\n[3.14]\n[   3.142]\n[+42]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/format_ruler"
    }
   ]
  },
  "inline_args.rs": {
   "src": "fn main() {\n    let name = \"Mabel\";\n    let books = 3;\n    println!(\"{} has {} books\", name, books);\n    println!(\"{name} has {books} books\");\n    println!(\"{0} has {1} books. {1} books, {0}!\", name, books);\n    println!(\"{who} has {n} books\", who = name, n = books + 1);\n}\n",
   "stdout": "Mabel has 3 books\nMabel has 3 books\nMabel has 3 books. 3 books, Mabel!\nMabel has 4 books\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Mabel has 3 books\nMabel has 3 books\nMabel has 3 books. 3 books, Mabel!\nMabel has 4 books\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/inline_args"
    }
   ]
  },
  "integer_ranges.rs": {
   "src": "fn main() {\n    println!(\"u8     {} to {}\", u8::MIN, u8::MAX);\n    println!(\"i8     {} to {}\", i8::MIN, i8::MAX);\n    println!(\"u16    {} to {}\", u16::MIN, u16::MAX);\n    println!(\"i16    {} to {}\", i16::MIN, i16::MAX);\n    println!(\"u32    {} to {}\", u32::MIN, u32::MAX);\n    println!(\"i32    {} to {}\", i32::MIN, i32::MAX);\n    println!(\"u64    {} to {}\", u64::MIN, u64::MAX);\n    println!(\"i64    {} to {}\", i64::MIN, i64::MAX);\n    println!(\"u128   {} to {}\", u128::MIN, u128::MAX);\n    println!(\"i128   {} to {}\", i128::MIN, i128::MAX);\n    println!(\"usize  {} to {}\", usize::MIN, usize::MAX);\n    println!(\"isize  {} to {}\", isize::MIN, isize::MAX);\n}\n",
   "stdout": "u8     0 to 255\ni8     -128 to 127\nu16    0 to 65535\ni16    -32768 to 32767\nu32    0 to 4294967295\ni32    -2147483648 to 2147483647\nu64    0 to 18446744073709551615\ni64    -9223372036854775808 to 9223372036854775807\nu128   0 to 340282366920938463463374607431768211455\ni128   -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727\nusize  0 to 18446744073709551615\nisize  -9223372036854775808 to 9223372036854775807\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "u8     0 to 255\ni8     -128 to 127\nu16    0 to 65535\ni16    -32768 to 32767\nu32    0 to 4294967295\ni32    -2147483648 to 2147483647\nu64    0 to 18446744073709551615\ni64    -9223372036854775808 to 9223372036854775807\nu128   0 to 340282366920938463463374607431768211455\ni128   -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727\nusize  0 to 18446744073709551615\nisize  -9223372036854775808 to 9223372036854775807\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/integer_ranges"
    }
   ]
  },
  "literal_predict.rs": {
   "src": "fn main() {\n    let shelf = 0x10;\n    let lamps = 0b11;\n    let pages = 2_500;\n    let letter = b'A';\n    println!(\"{shelf}\");\n    println!(\"{lamps}\");\n    println!(\"{pages}\");\n    println!(\"{letter}\");\n}\n",
   "stdout": "16\n3\n2500\n65\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "16\n3\n2500\n65\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/literal_predict"
    }
   ]
  },
  "literals.rs": {
   "src": "fn main() {\n    let million = 1_000_000;\n    let hex = 0xff;\n    let octal = 0o17;\n    let binary = 0b1010;\n    let byte = b'a';\n    let small = 5u8;\n    let half = 0.5f32;\n    let science = 1e3;\n    println!(\"{million}\");\n    println!(\"{hex}\");\n    println!(\"{octal}\");\n    println!(\"{binary}\");\n    println!(\"{byte}\");\n    println!(\"{small}\");\n    println!(\"{half}\");\n    println!(\"{science}\");\n}\n",
   "stdout": "1000000\n255\n15\n10\n97\n5\n0.5\n1000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1000000\n255\n15\n10\n97\n5\n0.5\n1000\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/literals"
    }
   ]
  },
  "mix_types.rs": {
   "src": "fn main() {\n    let count: i32 = 3;\n    let price: f64 = 2.5;\n    let total = count * price;\n    println!(\"{total}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: cannot multiply `i32` by `f64`\n --> src/main.rs:4:23\n  |\n4 |     let total = count * price;\n  |                       ^ no implementation for `i32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `i32`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `i32` implements `Mul`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&i32` implements `Mul<i32>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `i32` implements `Mul<&i32>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&i32` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_types` (bin \"mix_types\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: cannot multiply `i32` by `f64`\n --> src/main.rs:4:23\n  |\n4 |     let total = count * price;\n  |                       ^ no implementation for `i32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `i32`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `i32` implements `Mul`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&i32` implements `Mul<i32>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `i32` implements `Mul<&i32>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&i32` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_types` (bin \"mix_types\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/mix_types"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: cannot multiply `i32` by `f64`\n --> src/main.rs:4:23\n  |\n4 |     let total = count * price;\n  |                       ^ no implementation for `i32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `i32`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `i32` implements `Mul`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&i32` implements `Mul<i32>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `i32` implements `Mul<&i32>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&i32` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_types` (bin \"mix_types\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: cannot multiply `i32` by `f64`\n --> src/main.rs:4:23\n  |\n4 |     let total = count * price;\n  |                       ^ no implementation for `i32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `i32`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `i32` implements `Mul`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&i32` implements `Mul<i32>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `i32` implements `Mul<&i32>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&i32` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_types` (bin \"mix_types\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch3/mix_types"
     }
    ]
   }
  },
  "odo_boss_error.rs": {
   "src": "fn main() {\n    let price: f64 = 2.5;\n    let count: u32 = 2;\n    let total = price * count;\n    println!(\"{total}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: cannot multiply `f64` by `u32`\n --> src/main.rs:4:23\n  |\n4 |     let total = price * count;\n  |                       ^ no implementation for `f64 * u32`\n  |\n  = help: the trait `Mul<u32>` is not implemented for `f64`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `f64` implements `Mul`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&f64` implements `Mul<f64>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `f64` implements `Mul<&f64>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&f64` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `odo_boss_error` (bin \"odo_boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: cannot multiply `f64` by `u32`\n --> src/main.rs:4:23\n  |\n4 |     let total = price * count;\n  |                       ^ no implementation for `f64 * u32`\n  |\n  = help: the trait `Mul<u32>` is not implemented for `f64`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `f64` implements `Mul`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&f64` implements `Mul<f64>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `f64` implements `Mul<&f64>`\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&f64` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `odo_boss_error` (bin \"odo_boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/odo_boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: cannot multiply `f64` by `u32`\n --> src/main.rs:4:23\n  |\n4 |     let total = price * count;\n  |                       ^ no implementation for `f64 * u32`\n  |\n  = help: the trait `Mul<u32>` is not implemented for `f64`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `f64` implements `Mul`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&f64` implements `Mul<f64>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `f64` implements `Mul<&f64>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&f64` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `odo_boss_error` (bin \"odo_boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: cannot multiply `f64` by `u32`\n --> src/main.rs:4:23\n  |\n4 |     let total = price * count;\n  |                       ^ no implementation for `f64 * u32`\n  |\n  = help: the trait `Mul<u32>` is not implemented for `f64`\nhelp: the following other types implement trait `Mul<Rhs>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:344:8\n  |\n  = note: `f64` implements `Mul`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:359:0\n  |\n  = note: in this macro invocation\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:22:8\n  |\n  = note: `&f64` implements `Mul<f64>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:33:8\n  |\n  = note: `f64` implements `Mul<&f64>`\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/internal_macros.rs:44:8\n  |\n  = note: `&f64` implements `Mul`\n  = note: this error originates in the macro `mul_impl` (in Nightly builds, run with -Z macro-backtrace for more info)\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `odo_boss_error` (bin \"odo_boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch3/odo_boss_error"
     }
    ]
   }
  },
  "odo_boss_fill.rs": {
   "src": "fn main() {\n    let fuel: u8 = 250;\n    let topped = fuel.saturating_add(20);\n    let rolled = fuel.wrapping_add(20);\n    println!(\"{topped} {rolled}\");\n    println!(\"{:?}\", fuel.checked_add(20));\n}\n",
   "stdout": "255 14\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "255 14\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odo_boss_fill"
    }
   ]
  },
  "odo_boss_parsons.rs": {
   "src": "fn main() {\n    let books: u16 = 1200;\n    let per_shelf: u16 = books / 24;\n    let shelves = books / per_shelf;\n    println!(\"{shelves} shelves of {per_shelf}\");\n    println!(\"[{:^9}]\", \"done\");\n}\n",
   "stdout": "24 shelves of 50\n[  done   ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "24 shelves of 50\n[  done   ]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odo_boss_parsons"
    }
   ]
  },
  "odo_boss_predict.rs": {
   "src": "fn main() {\n    let km: u32 = 17;\n    let days: u32 = 3;\n    println!(\"{}\", km / days);\n    println!(\"{:.1}\", km as f64 / days as f64);\n    println!(\"[{:>4}]\", km % days);\n    println!(\"{:?} {}\", 'k', 'k');\n}\n",
   "stdout": "5\n5.7\n[   2]\n'k' k\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5\n5.7\n[   2]\n'k' k\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odo_boss_predict"
    }
   ]
  },
  "odo_boss_spot.rs": {
   "src": "fn main() {\n    let total_score: u32 = 9;\n    let games: u32 = 2;\n    let average = total_score / games;\n    println!(\"Average: {average}\");\n}\n",
   "stdout": "Average: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Average: 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odo_boss_spot"
    }
   ]
  },
  "odo_boss_trace.rs": {
   "src": "fn main() {\n    let mut odo: u8 = 250;\n    let mut safe: u8 = 250;\n    odo = odo.wrapping_add(4);\n    safe = safe.saturating_add(4);\n    println!(\"{odo} {safe}\");\n    odo = odo.wrapping_add(4);\n    safe = safe.saturating_add(4);\n    println!(\"{odo} {safe}\");\n    odo = odo.wrapping_add(4);\n    safe = safe.saturating_add(4);\n    println!(\"{odo} {safe}\");\n}\n",
   "stdout": "254 254\n2 255\n6 255\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "254 254\n2 255\n6 255\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odo_boss_trace"
    }
   ]
  },
  "odometer.rs": {
   "src": "fn main() {\n    let mut odometer: u8 = 254;\n    println!(\"{odometer}\");\n    odometer += 1;\n    println!(\"{odometer}\");\n    odometer += 1;\n    println!(\"{odometer}\");\n    odometer += 2;\n    println!(\"{odometer}\");\n}\n",
   "stdout": "254\n255\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:6:5:\nattempt to add with overflow\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "254\n255\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:6:5:\nattempt to add with overflow\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch3/odometer",
     "merged": "254\n255\n\nthread 'main' (1) panicked at src/main.rs:6:5:\nattempt to add with overflow\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "odometer_release.rs": {
   "src": "fn main() {\n    let mut odometer: u8 = 254;\n    println!(\"{odometer}\");\n    odometer += 1;\n    println!(\"{odometer}\");\n    odometer += 1;\n    println!(\"{odometer}\");\n    odometer += 2;\n    println!(\"{odometer}\");\n}\n",
   "stdout": "254\n255\n0\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q --release",
     "out": "254\n255\n0\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odometer_release"
    }
   ]
  },
  "odometer_saturating.rs": {
   "src": "fn main() {\n    let mut odometer: u8 = 254;\n    println!(\"{odometer}\");\n    odometer = odometer.saturating_add(1);\n    println!(\"{odometer}\");\n    odometer = odometer.saturating_add(1);\n    println!(\"{odometer}\");\n    odometer = odometer.saturating_add(2);\n    println!(\"{odometer}\");\n}\n",
   "stdout": "254\n255\n255\n255\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "254\n255\n255\n255\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odometer_saturating"
    }
   ]
  },
  "odometer_wrapping.rs": {
   "src": "fn main() {\n    let mut odometer: u8 = 254;\n    println!(\"{odometer}\");\n    odometer = odometer.wrapping_add(1);\n    println!(\"{odometer}\");\n    odometer = odometer.wrapping_add(1);\n    println!(\"{odometer}\");\n    odometer = odometer.wrapping_add(2);\n    println!(\"{odometer}\");\n}\n",
   "stdout": "254\n255\n0\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "254\n255\n0\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/odometer_wrapping"
    }
   ]
  },
  "overflow_methods.rs": {
   "src": "fn main() {\n    let odometer: u8 = 250;\n    println!(\"{:?}\", odometer.checked_add(3));\n    println!(\"{:?}\", odometer.checked_add(10));\n    println!(\"{}\", odometer.wrapping_add(10));\n    println!(\"{}\", odometer.saturating_add(10));\n}\n",
   "stdout": "Some(253)\nNone\n4\n255\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(253)\nNone\n4\n255\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/overflow_methods"
    }
   ]
  },
  "overflow_seen.rs": {
   "src": "fn main() {\n    let level: u8 = 255;\n    let next = level + 1;\n    println!(\"{next}\");\n}\n",
   "stdout": "",
   "stderr": "error: this arithmetic operation will overflow\n --> src/main.rs:3:16\n  |\n3 |     let next = level + 1;\n  |                ^^^^^^^^^ attempt to compute `u8::MAX + 1_u8`, which would overflow\n  |\n  = note: `#[deny(arithmetic_overflow)]` on by default\n\nerror: could not compile `overflow_seen` (bin \"overflow_seen\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: this arithmetic operation will overflow\n --> src/main.rs:3:16\n  |\n3 |     let next = level + 1;\n  |                ^^^^^^^^^ attempt to compute `u8::MAX + 1_u8`, which would overflow\n  |\n  = note: `#[deny(arithmetic_overflow)]` on by default\n\nerror: could not compile `overflow_seen` (bin \"overflow_seen\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/overflow_seen"
    }
   ]
  },
  "parsons_avg.rs": {
   "src": "fn main() {\n    let first: u32 = 7;\n    let second = first + 1;\n    let total = first + second;\n    let average = total as f64 / 2.0;\n    println!(\"Average: {average}\");\n}\n",
   "stdout": "Average: 7.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Average: 7.5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/parsons_avg"
    }
   ]
  },
  "predict_div.rs": {
   "src": "fn main() {\n    let pages = 17;\n    let per_day = 5;\n    println!(\"{}\", pages / per_day);\n    println!(\"{}\", pages % per_day);\n    println!(\"{}\", 17.0 / 5.0);\n}\n",
   "stdout": "3\n2\n3.4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3\n2\n3.4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/predict_div"
    }
   ]
  },
  "predict_format.rs": {
   "src": "fn main() {\n    let price = 2.5;\n    let qty = 4;\n    println!(\"[{qty:>3}]\");\n    println!(\"[{price:.2}]\");\n    println!(\"[{qty:03}]\");\n    println!(\"{price:?} {}\", price * 2.0);\n}\n",
   "stdout": "[  4]\n[2.50]\n[004]\n2.5 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[  4]\n[2.50]\n[004]\n2.5 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/predict_format"
    }
   ]
  },
  "predict_methods.rs": {
   "src": "fn main() {\n    let tank: u8 = 200;\n    println!(\"{}\", tank.wrapping_add(100));\n    println!(\"{}\", tank.saturating_add(100));\n    println!(\"{:?}\", tank.checked_add(50));\n    println!(\"{:?}\", tank.checked_add(60));\n}\n",
   "stdout": "44\n255\nSome(250)\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "44\n255\nSome(250)\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/predict_methods"
    }
   ]
  },
  "predict_print.rs": {
   "src": "fn main() {\n    print!(\"Rust\");\n    print!(\" is \");\n    println!(\"fun\");\n    println!(\"{}{}\", 4, 2);\n    print!(\"bye\");\n    println!();\n}\n",
   "stdout": "Rust is fun\n42\nbye\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Rust is fun\n42\nbye\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/predict_print"
    }
   ]
  },
  "spot_char.rs": {
   "src": "fn main() {\n    let grade: char = 'A';\n    let shelf: char = \"B\";\n    let open = true;\n    println!(\"{grade} {shelf} {open}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:3:23\n  |\n3 |     let shelf: char = \"B\";\n  |                ----   ^^^ expected `char`, found `&str`\n  |                |\n  |                expected due to this\n  |\nhelp: if you meant to write a `char` literal, use single quotes\n  |\n3 -     let shelf: char = \"B\";\n3 +     let shelf: char = 'B';\n  |\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_char` (bin \"spot_char\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:3:23\n  |\n3 |     let shelf: char = \"B\";\n  |                ----   ^^^ expected `char`, found `&str`\n  |                |\n  |                expected due to this\n  |\nhelp: if you meant to write a `char` literal, use single quotes\n  |\n3 -     let shelf: char = \"B\";\n3 +     let shelf: char = 'B';\n  |\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `spot_char` (bin \"spot_char\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/spot_char"
    }
   ]
  },
  "spot_fmt.rs": {
   "src": "fn main() {\n    let item = \"map\";\n    let price = 4.5;\n    println!(\"Item: {}\", item);\n    println!(\"{} costs {} coins\", item);\n    println!(\"Thanks! {price}\");\n}\n",
   "stdout": "",
   "stderr": "error: 2 positional arguments in format string, but there is 1 argument\n --> src/main.rs:5:15\n  |\n5 |     println!(\"{} costs {} coins\", item);\n  |               ^^       ^^         ----\n\nerror: could not compile `spot_fmt` (bin \"spot_fmt\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: 2 positional arguments in format string, but there is 1 argument\n --> src/main.rs:5:15\n  |\n5 |     println!(\"{} costs {} coins\", item);\n  |               ^^       ^^         ----\n\nerror: could not compile `spot_fmt` (bin \"spot_fmt\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/spot_fmt"
    }
   ]
  },
  "spot_mix.rs": {
   "src": "fn main() {\n    let apples: u32 = 6;\n    let weight: f64 = 0.2;\n    let bags: u32 = 2;\n    let total_apples = apples * bags;\n    let total_weight = total_apples * weight;\n    println!(\"{total_apples} apples weigh {total_weight} kg\");\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: cannot multiply `u32` by `f64`\n --> src/main.rs:6:37\n  |\n6 |     let total_weight = total_apples * weight;\n  |                                     ^ no implementation for `u32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `u32`\n  = help: the following other types implement trait `Mul<Rhs>`:\n            `&u32` implements `Mul<u32>`\n            `&u32` implements `Mul`\n            `u32` implements `Mul<&u32>`\n            `u32` implements `Mul<Duration>`\n            `u32` implements `Mul`\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_mix` (bin \"spot_mix\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: cannot multiply `u32` by `f64`\n --> src/main.rs:6:37\n  |\n6 |     let total_weight = total_apples * weight;\n  |                                     ^ no implementation for `u32 * f64`\n  |\n  = help: the trait `Mul<f64>` is not implemented for `u32`\n  = help: the following other types implement trait `Mul<Rhs>`:\n            `&u32` implements `Mul<u32>`\n            `&u32` implements `Mul`\n            `u32` implements `Mul<&u32>`\n            `u32` implements `Mul<Duration>`\n            `u32` implements `Mul`\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_mix` (bin \"spot_mix\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/spot_mix"
    }
   ]
  },
  "spot_range.rs": {
   "src": "fn main() {\n    let age: u8 = 12;\n    let year: u16 = 2026;\n    let freezer: i8 = -18;\n    let oven: u8 = 260;\n    let steps: u32 = 70_000;\n    println!(\"{age} {year} {freezer} {oven} {steps}\");\n}\n",
   "stdout": "",
   "stderr": "error: literal out of range for `u8`\n --> src/main.rs:5:20\n  |\n5 |     let oven: u8 = 260;\n  |                    ^^^\n  |\n  = note: the literal `260` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `spot_range` (bin \"spot_range\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: literal out of range for `u8`\n --> src/main.rs:5:20\n  |\n5 |     let oven: u8 = 260;\n  |                    ^^^\n  |\n  = note: the literal `260` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `spot_range` (bin \"spot_range\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/spot_range"
    }
   ]
  },
  "streams.rs": {
   "src": "fn main() {\n    let name = \"Mabel\";\n    let note = format!(\"Hello, {name}!\");\n    println!(\"{note}\");\n    eprintln!(\"(a message on the error stream)\");\n    println!(\"The note has {} letters\", note.len());\n}\n",
   "stdout": "Hello, Mabel!\nThe note has 13 letters\n",
   "stderr": "(a message on the error stream)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Hello, Mabel!\nThe note has 13 letters\n",
     "err": "(a message on the error stream)\n",
     "exit": 0,
     "dir": "~/rust-ch3/streams",
     "merged": "Hello, Mabel!\n(a message on the error stream)\nThe note has 13 letters\n"
    }
   ]
  },
  "trace_receipt.rs": {
   "src": "fn main() {\n    let price = 0.5;\n    let qty = 3;\n    println!(\"apple {qty} {price:.2} {:.2}\", price * qty as f64);\n    let price = 1.25;\n    let qty = 2;\n    println!(\"pear {qty} {price:.2} {:.2}\", price * qty as f64);\n    let price = 0.1;\n    let qty = 7;\n    println!(\"plum {qty} {price:.2} {:.2}\", price * qty as f64);\n}\n",
   "stdout": "apple 3 0.50 1.50\npear 2 1.25 2.50\nplum 7 0.10 0.70\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "apple 3 0.50 1.50\npear 2 1.25 2.50\nplum 7 0.10 0.70\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/trace_receipt"
    }
   ]
  },
  "tuple_display.rs": {
   "src": "fn main() {\n    let point = (3, 4);\n    println!(\"{}\", point);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `({integer}, {integer})` doesn't implement `std::fmt::Display`\n --> src/main.rs:3:20\n  |\n3 |     println!(\"{}\", point);\n  |               --   ^^^^^ `({integer}, {integer})` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `({integer}, {integer})`\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `tuple_display` (bin \"tuple_display\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `({integer}, {integer})` doesn't implement `std::fmt::Display`\n --> src/main.rs:3:20\n  |\n3 |     println!(\"{}\", point);\n  |               --   ^^^^^ `({integer}, {integer})` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `({integer}, {integer})`\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `tuple_display` (bin \"tuple_display\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/tuple_display"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `({integer}, {integer})` doesn't implement `std::fmt::Display`\n --> src/main.rs:3:20\n  |\n3 |     println!(\"{}\", point);\n  |               --   ^^^^^ `({integer}, {integer})` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `({integer}, {integer})`\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `tuple_display` (bin \"tuple_display\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `({integer}, {integer})` doesn't implement `std::fmt::Display`\n --> src/main.rs:3:20\n  |\n3 |     println!(\"{}\", point);\n  |               --   ^^^^^ `({integer}, {integer})` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `({integer}, {integer})`\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `tuple_display` (bin \"tuple_display\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch3/tuple_display"
     }
    ]
   }
  },
  "type_sizes.rs": {
   "src": "fn main() {\n    println!(\"u8    {} byte\", std::mem::size_of::<u8>());\n    println!(\"i16   {} bytes\", std::mem::size_of::<i16>());\n    println!(\"i32   {} bytes\", std::mem::size_of::<i32>());\n    println!(\"u64   {} bytes\", std::mem::size_of::<u64>());\n    println!(\"i128  {} bytes\", std::mem::size_of::<i128>());\n    println!(\"usize {} bytes\", std::mem::size_of::<usize>());\n    println!(\"f32   {} bytes\", std::mem::size_of::<f32>());\n    println!(\"f64   {} bytes\", std::mem::size_of::<f64>());\n    println!(\"bool  {} byte\", std::mem::size_of::<bool>());\n    println!(\"char  {} bytes\", std::mem::size_of::<char>());\n}\n",
   "stdout": "u8    1 byte\ni16   2 bytes\ni32   4 bytes\nu64   8 bytes\ni128  16 bytes\nusize 8 bytes\nf32   4 bytes\nf64   8 bytes\nbool  1 byte\nchar  4 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "u8    1 byte\ni16   2 bytes\ni32   4 bytes\nu64   8 bytes\ni128  16 bytes\nusize 8 bytes\nf32   4 bytes\nf64   8 bytes\nbool  1 byte\nchar  4 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/type_sizes"
    }
   ]
  },
  "typed_boxes.rs": {
   "src": "fn main() {\n    let age: u8 = 12;\n    let temp = -3.5;\n    let initial = 'M';\n    let teen = age >= 13;\n    let age = age as f64 + 0.5;\n    println!(\"{age} {temp} {initial} {teen}\");\n}\n",
   "stdout": "12.5 -3.5 M false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "12.5 -3.5 M false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch3/typed_boxes"
    }
   ]
  },
  "u8_too_big.rs": {
   "src": "fn main() {\n    let x: u8 = 300;\n    println!(\"{x}\");\n}\n",
   "stdout": "",
   "stderr": "error: literal out of range for `u8`\n --> src/main.rs:2:17\n  |\n2 |     let x: u8 = 300;\n  |                 ^^^\n  |\n  = note: the literal `300` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `u8_too_big` (bin \"u8_too_big\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: literal out of range for `u8`\n --> src/main.rs:2:17\n  |\n2 |     let x: u8 = 300;\n  |                 ^^^\n  |\n  = note: the literal `300` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `u8_too_big` (bin \"u8_too_big\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch3/u8_too_big"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
