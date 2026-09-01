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
  "workdir": "/home/you/rust-ch25",
  "versionDifferences": [
   "boss_error.rs",
   "forgot_bufread.rs",
   "path_display.rs",
   "try_from.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.rs, forgot_bufread.rs, path_display.rs, try_from.rs."
 },
 "programs": {
  "alias_bug.rs": {
   "src": "type Meters = f64;\ntype Feet = f64;\n\nfn fits_under(van: Meters, bridge: Meters) -> bool {\n    van < bridge\n}\n\nfn main() {\n    let van: Meters = 3.5;\n    let bridge: Feet = 11.0; // the sign on the bridge says 11 ft\n    println!(\"Does the bookmobile fit? {}\", fits_under(van, bridge));\n}\n",
   "stdout": "Does the bookmobile fit? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Does the bookmobile fit? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/alias_bug"
    }
   ]
  },
  "args_strings.rs": {
   "src": "use std::env;\n\nfn main() {\n    let args: Vec<String> = env::args().skip(1).collect();\n    println!(\"{args:?}\");\n    let top = &args[1];\n    println!(\"top + 1 = {}\", top.parse::<i64>().unwrap() + 1);\n}\n",
   "stdout": "[\"--top\", \"3\", \"notes.txt\"]\ntop + 1 = 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- --top 3 notes.txt",
     "out": "[\"--top\", \"3\", \"notes.txt\"]\ntop + 1 = 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/args_strings"
    }
   ]
  },
  "as_casts.rs": {
   "src": "fn main() {\n    let big: i32 = 300;\n    let minus: i32 = -1;\n    let price: f64 = 3.99;\n    let debt: f64 = -5.7;\n    let huge: f64 = 1e10;\n    println!(\"300 as u8   = {}\", big as u8);\n    println!(\"-1 as u8    = {}\", minus as u8);\n    println!(\"-1 as u32   = {}\", minus as u32);\n    println!(\"3.99 as i32 = {}\", price as i32);\n    println!(\"-5.7 as u32 = {}\", debt as u32);\n    println!(\"1e10 as i32 = {}\", huge as i32);\n    println!(\"NaN as i32  = {}\", f64::NAN as i32);\n    println!(\"65 as char  = {}\", 65u8 as char);\n    println!(\"300 as f32  = {}\", big as f32);\n}\n",
   "stdout": "300 as u8   = 44\n-1 as u8    = 255\n-1 as u32   = 4294967295\n3.99 as i32 = 3\n-5.7 as u32 = 0\n1e10 as i32 = 2147483647\nNaN as i32  = 0\n65 as char  = A\n300 as f32  = 300\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "300 as u8   = 44\n-1 as u8    = 255\n-1 as u32   = 4294967295\n3.99 as i32 = 3\n-5.7 as u32 = 0\n1e10 as i32 = 2147483647\nNaN as i32  = 0\n65 as char  = A\n300 as f32  = 300\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/as_casts"
    }
   ]
  },
  "boss_error.rs": {
   "src": "struct Meters(f64);\n\nfn main() {\n    let shelf_a = Meters(1.5);\n    let shelf_b = Meters(2.0);\n    let both = shelf_a + shelf_b;\n    println!(\"{}\", both.0);\n}\n",
   "stdout": "",
   "stderr": "error[E0369]: cannot add `Meters` to `Meters`\n --> src/main.rs:6:24\n  |\n6 |     let both = shelf_a + shelf_b;\n  |                ------- ^ ------- Meters\n  |                |\n  |                Meters\n  |\nnote: an implementation of `Add` might be missing for `Meters`\n --> src/main.rs:1:1\n  |\n1 | struct Meters(f64);\n  | ^^^^^^^^^^^^^ must implement `Add`\nnote: the trait `Add` must be implemented\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:76:0\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0369]: cannot add `Meters` to `Meters`\n --> src/main.rs:6:24\n  |\n6 |     let both = shelf_a + shelf_b;\n  |                ------- ^ ------- Meters\n  |                |\n  |                Meters\n  |\nnote: an implementation of `Add` might be missing for `Meters`\n --> src/main.rs:1:1\n  |\n1 | struct Meters(f64);\n  | ^^^^^^^^^^^^^ must implement `Add`\nnote: the trait `Add` must be implemented\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/ops/arith.rs:76:0\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0369]: cannot add `Meters` to `Meters`\n --> src/main.rs:6:24\n  |\n6 |     let both = shelf_a + shelf_b;\n  |                ------- ^ ------- Meters\n  |                |\n  |                Meters\n  |\nnote: an implementation of `Add` might be missing for `Meters`\n --> src/main.rs:1:1\n  |\n1 | struct Meters(f64);\n  | ^^^^^^^^^^^^^ must implement `Add`\nnote: the trait `Add` must be implemented\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:76:0\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0369]: cannot add `Meters` to `Meters`\n --> src/main.rs:6:24\n  |\n6 |     let both = shelf_a + shelf_b;\n  |                ------- ^ ------- Meters\n  |                |\n  |                Meters\n  |\nnote: an implementation of `Add` might be missing for `Meters`\n --> src/main.rs:1:1\n  |\n1 | struct Meters(f64);\n  | ^^^^^^^^^^^^^ must implement `Add`\nnote: the trait `Add` must be implemented\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/ops/arith.rs:76:0\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch25/boss_error"
     }
    ]
   }
  },
  "boss_fill.rs": {
   "src": "use std::io::{self, BufWriter, Write};\n\nfn main() -> io::Result<()> {\n    let mut out = BufWriter::new(io::stdout().lock());\n    for n in 1..=3 {\n        writeln!(out, \"shelf {n} checked\")?;\n    }\n    out.flush()?;\n    eprintln!(\"note: shelf 4 is closed today\");\n    Ok(())\n}\n",
   "stdout": "shelf 1 checked\nshelf 2 checked\nshelf 3 checked\n",
   "stderr": "note: shelf 4 is closed today\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelf 1 checked\nshelf 2 checked\nshelf 3 checked\n",
     "err": "note: shelf 4 is closed today\n",
     "exit": 0,
     "dir": "~/rust-ch25/boss_fill",
     "merged": "shelf 1 checked\nshelf 2 checked\nshelf 3 checked\nnote: shelf 4 is closed today\n"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "struct Celsius(f64);\nstruct Fahrenheit(f64);\n\nimpl From<Fahrenheit> for Celsius {\n    fn from(f: Fahrenheit) -> Celsius {\n        Celsius((f.0 - 32.0) * 5.0 / 9.0)\n    }\n}\n\nfn main() {\n    let reading = Fahrenheit(68.0);\n    let c: Celsius = reading.into();\n    println!(\"The reading room is {:.1} °C\", c.0);\n}\n",
   "stdout": "The reading room is 20.0 °C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "The reading room is 20.0 °C\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "fn main() {\n    let pages: i64 = 1000;\n    let small = pages as u8;\n    let fits = u8::try_from(pages).is_ok();\n    let doubled = u16::from(small) * 2;\n    let third = (pages as f64 / 3.0) as i32;\n    println!(\"{small} {fits} {doubled} {third}\");\n}\n",
   "stdout": "232 false 464 333\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "232 false 464 333\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "fn main() {\n    let total: u32 = 1200;\n    let read: u32 = 600;\n    let left = (total - read) as u8;\n    println!(\"{left} pages left to read\");\n}\n",
   "stdout": "88 pages left to read\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "88 pages left to read\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "use std::io::BufRead;\n\nfn main() {\n    let input: &[u8] = b\"7\\n300\\n-4\\nten\\n\";\n    for line in input.lines() {\n        let text = line.unwrap();\n        let checked = match text.parse::<i64>() {\n            Ok(n) => match u8::try_from(n) {\n                Ok(b) => format!(\"Ok({b})\"),\n                Err(_) => \"Err\".to_string(),\n            },\n            Err(_) => \"not-a-number\".to_string(),\n        };\n        let cast = text.parse::<i64>().map(|n| n as u8).unwrap_or(0);\n        println!(\"{text} {checked} {cast}\");\n    }\n}\n",
   "stdout": "7 Ok(7) 7\n300 Err 44\n-4 Err 252\nten not-a-number 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 Ok(7) 7\n300 Err 44\n-4 Err 252\nten not-a-number 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/boss_trace"
    }
   ]
  },
  "buffer_steps.rs": {
   "src": "use std::io::{BufWriter, Write};\n\nfn show(w: &BufWriter<Vec<u8>>) -> String {\n    let held = String::from_utf8_lossy(w.buffer());\n    let sent = String::from_utf8_lossy(w.get_ref());\n    format!(\"bucket {held:?}  sent {sent:?}\")\n}\n\nfn main() -> std::io::Result<()> {\n    let mut w = BufWriter::with_capacity(8, Vec::new());\n    w.write_all(b\"owl \")?;\n    println!(\"1 {}\", show(&w));\n    w.write_all(b\"cat \")?;\n    println!(\"2 {}\", show(&w));\n    w.write_all(b\"heron \")?;\n    println!(\"3 {}\", show(&w));\n    w.write_all(b\"albatross\")?;\n    println!(\"4 {}\", show(&w));\n    w.flush()?;\n    println!(\"5 {}\", show(&w));\n    Ok(())\n}\n",
   "stdout": "1 bucket \"owl \"  sent \"\"\n2 bucket \"owl cat \"  sent \"\"\n3 bucket \"heron \"  sent \"owl cat \"\n4 bucket \"\"  sent \"owl cat heron albatross\"\n5 bucket \"\"  sent \"owl cat heron albatross\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 bucket \"owl \"  sent \"\"\n2 bucket \"owl cat \"  sent \"\"\n3 bucket \"heron \"  sent \"owl cat \"\n4 bucket \"\"  sent \"owl cat heron albatross\"\n5 bucket \"\"  sent \"owl cat heron albatross\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/buffer_steps"
    }
   ]
  },
  "checked.rs": {
   "src": "fn main() {\n    let a: u8 = 250;\n    println!(\"checked_add(3)    = {:?}\", a.checked_add(3));\n    println!(\"checked_add(10)   = {:?}\", a.checked_add(10));\n    println!(\"overflowing_add   = {:?}\", a.overflowing_add(10));\n    println!(\"wrapping_add(10)  = {}\", a.wrapping_add(10));\n    println!(\"saturating_add(10)= {}\", a.saturating_add(10));\n    println!(\"checked_sub(251)  = {:?}\", a.checked_sub(251));\n    println!(\"checked_div(0)    = {:?}\", a.checked_div(0));\n}\n",
   "stdout": "checked_add(3)    = Some(253)\nchecked_add(10)   = None\noverflowing_add   = (4, true)\nwrapping_add(10)  = 4\nsaturating_add(10)= 255\nchecked_sub(251)  = None\nchecked_div(0)    = None\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "checked_add(3)    = Some(253)\nchecked_add(10)   = None\noverflowing_add   = (4, true)\nwrapping_add(10)  = 4\nsaturating_add(10)= 255\nchecked_sub(251)  = None\nchecked_div(0)    = None\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/checked"
    }
   ]
  },
  "copy_file.rs": {
   "src": "use std::fs::{self, File};\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\n\nfn main() -> io::Result<()> {\n    let reader = BufReader::new(File::open(\"notes.txt\")?);\n    let mut writer = BufWriter::new(File::create(\"copy.txt\")?);\n    for line in reader.lines() {\n        writeln!(writer, \"{}\", line?)?;\n    }\n    writer.flush()?;\n    let size = fs::metadata(\"copy.txt\")?.len();\n    println!(\"copy.txt holds {size} bytes\");\n    Ok(())\n}\n",
   "stdout": "copy.txt holds 111 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "copy.txt holds 111 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/copy_file"
    }
   ]
  },
  "copy_noflush.rs": {
   "src": "use std::fs::{self, File};\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\n\nfn main() -> io::Result<()> {\n    let reader = BufReader::new(File::open(\"notes.txt\")?);\n    let mut writer = BufWriter::new(File::create(\"copy.txt\")?);\n    for line in reader.lines() {\n        writeln!(writer, \"{}\", line?)?;\n    }\n    let size = fs::metadata(\"copy.txt\")?.len();\n    println!(\"copy.txt holds {size} bytes\");\n    Ok(())\n}\n",
   "stdout": "copy.txt holds 0 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "copy.txt holds 0 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/copy_noflush"
    }
   ]
  },
  "count_stdin.rs": {
   "src": "use std::io::{self, Read};\n\nfn main() -> io::Result<()> {\n    let mut text = String::new();\n    io::stdin().read_to_string(&mut text)?;\n    let lines = text.lines().count();\n    let words = text.split_whitespace().count();\n    println!(\"{lines} lines, {words} words, {} bytes\", text.len());\n    Ok(())\n}\n",
   "stdout": "1 lines, 3 words, 14 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cat notes.txt",
     "out": "The owl reads at night.\nBooks wait on the shelf.\n\nMabel stamps every loan.\nA quiet library is a happy library.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/count_stdin"
    },
    {
     "cmd": "cat notes.txt | cargo run -q",
     "out": "5 lines, 21 words, 111 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/count_stdin"
    },
    {
     "cmd": "echo \"one two three\" | cargo run -q",
     "out": "1 lines, 3 words, 14 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/count_stdin"
    }
   ]
  },
  "create_append.rs": {
   "src": "use std::fs::{self, File, OpenOptions};\nuse std::io::Write;\n\nfn main() -> std::io::Result<()> {\n    let mut log = File::create(\"log.txt\")?;\n    writeln!(log, \"08:00 library opens\")?;\n    writeln!(log, \"08:05 Ada borrows Dune\")?;\n    drop(log);\n\n    let mut log = OpenOptions::new().append(true).open(\"log.txt\")?;\n    writeln!(log, \"08:30 Ben returns Emma\")?;\n    drop(log);\n\n    print!(\"{}\", fs::read_to_string(\"log.txt\")?);\n    Ok(())\n}\n",
   "stdout": "08:00 library opens\n08:05 Ada borrows Dune\n08:30 Ben returns Emma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "08:00 library opens\n08:05 Ada borrows Dune\n08:30 Ben returns Emma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/create_append"
    }
   ]
  },
  "defaults.rs": {
   "src": "#[derive(Debug, Default)]\nstruct Settings {\n    top: u8,\n    quiet: bool,\n    file: String,\n}\n\n#[derive(Debug)]\nstruct Shelves(u32);\n\nimpl Default for Shelves {\n    fn default() -> Self {\n        Shelves(10)\n    }\n}\n\nfn main() {\n    let plain = Settings::default();\n    println!(\"{plain:?}\");\n    let mine = Settings { top: 3, ..Default::default() };\n    println!(\"{mine:?}\");\n    println!(\"top {}, quiet {}, file {:?}\", mine.top, mine.quiet, mine.file);\n    let s: Shelves = Default::default();\n    println!(\"shelves: {}\", s.0);\n    println!(\"{:?} {:?}\", i64::default(), Option::<u8>::default());\n}\n",
   "stdout": "Settings { top: 0, quiet: false, file: \"\" }\nSettings { top: 3, quiet: false, file: \"\" }\ntop 3, quiet false, file \"\"\nshelves: 10\n0 None\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Settings { top: 0, quiet: false, file: \"\" }\nSettings { top: 3, quiet: false, file: \"\" }\ntop 3, quiet false, file \"\"\nshelves: 10\n0 None\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/defaults"
    }
   ]
  },
  "e0308.rs": {
   "src": "fn books_in_catalogue() -> i64 {\n    120_000\n}\n\nfn main() {\n    let count: i32 = books_in_catalogue();\n    println!(\"{count} books\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:6:22\n  |\n6 |     let count: i32 = books_in_catalogue();\n  |                ---   ^^^^^^^^^^^^^^^^^^^^ expected `i32`, found `i64`\n  |                |\n  |                expected due to this\n  |\nhelp: you can convert an `i64` to an `i32` and panic if the converted value doesn't fit\n  |\n6 |     let count: i32 = books_in_catalogue().try_into().unwrap();\n  |                                          ++++++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `e0308` (bin \"e0308\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:6:22\n  |\n6 |     let count: i32 = books_in_catalogue();\n  |                ---   ^^^^^^^^^^^^^^^^^^^^ expected `i32`, found `i64`\n  |                |\n  |                expected due to this\n  |\nhelp: you can convert an `i64` to an `i32` and panic if the converted value doesn't fit\n  |\n6 |     let count: i32 = books_in_catalogue().try_into().unwrap();\n  |                                          ++++++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `e0308` (bin \"e0308\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/e0308"
    }
   ]
  },
  "env_var.rs": {
   "src": "use std::env;\n\nfn main() {\n    match env::var(\"LIBRARY_NAME\") {\n        Ok(name) => println!(\"Welcome to {name}!\"),\n        Err(e) => println!(\"No LIBRARY_NAME ({e}), so: Welcome!\"),\n    }\n    let shelves: u32 = env::var(\"SHELVES\")\n        .ok()\n        .and_then(|s| s.parse().ok())\n        .unwrap_or(10);\n    println!(\"shelves: {shelves}\");\n}\n",
   "stdout": "No LIBRARY_NAME (environment variable not found), so: Welcome!\nshelves: 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "No LIBRARY_NAME (environment variable not found), so: Welcome!\nshelves: 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/env_var"
    },
    {
     "cmd": "LIBRARY_NAME=\"Oak Street\" SHELVES=24 cargo run -q",
     "out": "Welcome to Oak Street!\nshelves: 24\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/env_var"
    },
    {
     "cmd": "SHELVES=lots cargo run -q",
     "out": "No LIBRARY_NAME (environment variable not found), so: Welcome!\nshelves: 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/env_var"
    }
   ]
  },
  "error_kinds.rs": {
   "src": "use std::fs;\nuse std::io::ErrorKind;\n\nfn main() -> std::io::Result<()> {\n    fs::write(\"pic.bin\", [0xFF, 0xD8, 0xFF])?;\n    for path in [\"notes.txt\", \"lost.txt\", \"src\", \"pic.bin\"] {\n        match fs::read_to_string(path) {\n            Ok(text) => println!(\"{path}: {} bytes of text\", text.len()),\n            Err(e) if e.kind() == ErrorKind::NotFound => println!(\"{path}: no such file\"),\n            Err(e) => println!(\"{path}: {:?}: {e}\", e.kind()),\n        }\n    }\n    Ok(())\n}\n",
   "stdout": "notes.txt: 111 bytes of text\nlost.txt: no such file\nsrc: IsADirectory: Is a directory (os error 21)\npic.bin: InvalidData: stream did not contain valid UTF-8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "notes.txt: 111 bytes of text\nlost.txt: no such file\nsrc: IsADirectory: Is a directory (os error 21)\npic.bin: InvalidData: stream did not contain valid UTF-8\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/error_kinds"
    }
   ]
  },
  "exit_predict.rs": {
   "src": "use std::process;\n\nfn main() {\n    let shelves = [4, 7, 0, 5];\n    for (i, books) in shelves.iter().enumerate() {\n        if *books == 0 {\n            eprintln!(\"shelf {i} is empty!\");\n            process::exit(3);\n        }\n        println!(\"shelf {i}: {books} books\");\n    }\n    println!(\"every shelf checked\");\n}\n",
   "stdout": "shelf 0: 4 books\nshelf 1: 7 books\n",
   "stderr": "shelf 2 is empty!\n",
   "exit": 3,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelf 0: 4 books\nshelf 1: 7 books\n",
     "err": "shelf 2 is empty!\n",
     "exit": 3,
     "dir": "~/rust-ch25/exit_predict",
     "merged": "shelf 0: 4 books\nshelf 1: 7 books\nshelf 2 is empty!\n"
    }
   ]
  },
  "exits.rs": {
   "src": "use std::process::ExitCode;\n\nfn main() -> ExitCode {\n    let word = std::env::args().nth(1).unwrap_or_default();\n    match word.as_str() {\n        \"ok\" => {\n            println!(\"all books counted\");\n            ExitCode::SUCCESS\n        }\n        \"help\" => {\n            eprintln!(\"usage: exits ok|help\");\n            ExitCode::from(2)\n        }\n        _ => {\n            eprintln!(\"error: I don't know the word {word:?}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "all books counted\nnext step\n",
   "stderr": "usage: exits ok|help\nerror: I don't know the word \"zebra\"\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- ok",
     "out": "all books counted\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "echo $?",
     "out": "0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "cargo run -q -- help",
     "out": "",
     "err": "usage: exits ok|help\n",
     "exit": 2,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "echo $?",
     "out": "2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "cargo run -q -- zebra",
     "out": "",
     "err": "error: I don't know the word \"zebra\"\n",
     "exit": 1,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "echo $?",
     "out": "1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/exits"
    },
    {
     "cmd": "cargo run -q -- ok && echo \"next step\"",
     "out": "all books counted\nnext step\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/exits"
    }
   ]
  },
  "fill_clap.rs": {
   "src": "use clap::Parser;\n\n/// Greet a library visitor.\n#[derive(Parser)]\nstruct Args {\n    /// Who is visiting\n    name: String,\n\n    /// How many times to say hello\n    #[arg(short, long, default_value_t = 1)]\n    count: u8,\n}\n\nfn main() {\n    let args = Args::parse();\n    for _ in 0..args.count {\n        println!(\"Hello, {}!\", args.name);\n    }\n}\n",
   "stdout": "Hello, Ada!\nHello, Ada!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- Ada --count 2",
     "out": "Hello, Ada!\nHello, Ada!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/fill_clap"
    }
   ]
  },
  "fill_files.rs": {
   "src": "use std::fs;\n\nfn main() -> std::io::Result<()> {\n    fs::write(\"wish.txt\", \"a book about owls\\n\")?;\n    let wish = fs::read_to_string(\"wish.txt\")?;\n    print!(\"Mabel's wish list: {wish}\");\n    Ok(())\n}\n",
   "stdout": "Mabel's wish list: a book about owls\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Mabel's wish list: a book about owls\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/fill_files"
    }
   ]
  },
  "fill_newtype.rs": {
   "src": "#[derive(Debug)]\nstruct Stars(u8);\n\nimpl TryFrom<u32> for Stars {\n    type Error = String;\n\n    fn try_from(n: u32) -> Result<Self, Self::Error> {\n        if n <= 5 {\n            Ok(Stars(n as u8))\n        } else {\n            Err(format!(\"{n} stars? The most is 5.\"))\n        }\n    }\n}\n\nfn main() {\n    println!(\"{:?}\", Stars::try_from(4).map(|s| s.0));\n    println!(\"{:?}\", Stars::try_from(9).map(|s| s.0));\n}\n",
   "stdout": "Ok(4)\nErr(\"9 stars? The most is 5.\")\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ok(4)\nErr(\"9 stars? The most is 5.\")\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/fill_newtype"
    }
   ]
  },
  "forgot_bufread.rs": {
   "src": "use std::fs::File;\nuse std::io::{self, BufReader};\n\nfn main() -> io::Result<()> {\n    let reader = BufReader::new(File::open(\"notes.txt\")?);\n    for line in reader.lines() {\n        println!(\"{}\", line?);\n    }\n    Ok(())\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no method named `lines` found for struct `BufReader<R>` in the current scope\n --> src/main.rs:6:24\n  |\n6 |     for line in reader.lines() {\n  |                        ^^^^^ method not found in `BufReader<File>`\n  |\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/io/buf_read.rs:421:7\n  |\n  = note: the method is available for `BufReader<File>` here\n  |\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `BufRead` which provides `lines` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::io::BufRead;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `forgot_bufread` (bin \"forgot_bufread\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no method named `lines` found for struct `BufReader<R>` in the current scope\n --> src/main.rs:6:24\n  |\n6 |     for line in reader.lines() {\n  |                        ^^^^^ method not found in `BufReader<File>`\n  |\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/io/buf_read.rs:421:7\n  |\n  = note: the method is available for `BufReader<File>` here\n  |\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `BufRead` which provides `lines` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::io::BufRead;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `forgot_bufread` (bin \"forgot_bufread\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/forgot_bufread"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0599]: no method named `lines` found for struct `BufReader<R>` in the current scope\n --> src/main.rs:6:24\n  |\n6 |     for line in reader.lines() {\n  |                        ^^^^^ method not found in `BufReader<File>`\n  |\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/mod.rs:2700:7\n  |\n  = note: the method is available for `BufReader<File>` here\n  |\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `BufRead` which provides `lines` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::io::BufRead;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `forgot_bufread` (bin \"forgot_bufread\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0599]: no method named `lines` found for struct `BufReader<R>` in the current scope\n --> src/main.rs:6:24\n  |\n6 |     for line in reader.lines() {\n  |                        ^^^^^ method not found in `BufReader<File>`\n  |\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/mod.rs:2700:7\n  |\n  = note: the method is available for `BufReader<File>` here\n  |\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `BufRead` which provides `lines` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::io::BufRead;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `forgot_bufread` (bin \"forgot_bufread\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch25/forgot_bufread"
     }
    ]
   }
  },
  "from_bad.rs": {
   "src": "fn main() {\n    let catalogue: i64 = 120_000;\n    let count = i32::from(catalogue);\n    println!(\"{count}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: the trait bound `i32: From<i64>` is not satisfied\n --> src/main.rs:3:17\n  |\n3 |     let count = i32::from(catalogue);\n  |                 ^^^ the trait `From<i64>` is not implemented for `i32`\n  |\n  = help: `i32` implements trait `From<T>`:\n            From<bool>\n            From<i16>\n            From<i8>\n            From<u16>\n            From<u8>\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `from_bad` (bin \"from_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: the trait bound `i32: From<i64>` is not satisfied\n --> src/main.rs:3:17\n  |\n3 |     let count = i32::from(catalogue);\n  |                 ^^^ the trait `From<i64>` is not implemented for `i32`\n  |\n  = help: `i32` implements trait `From<T>`:\n            From<bool>\n            From<i16>\n            From<i8>\n            From<u16>\n            From<u8>\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `from_bad` (bin \"from_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/from_bad"
    }
   ]
  },
  "from_into.rs": {
   "src": "fn main() {\n    let small: u8 = 200;\n    let wide = u32::from(small);\n    let wider: i64 = wide.into();\n    let half = f64::from(2.5_f32);\n    let code = u32::from('é');\n    let name = String::from(\"Mabel\");\n    let shelf: Vec<i32> = [3, 1, 2].into();\n    println!(\"{wide} {wider} {half} {code} {name} {shelf:?}\");\n}\n",
   "stdout": "200 200 2.5 233 Mabel [3, 1, 2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "200 200 2.5 233 Mabel [3, 1, 2]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/from_into"
    }
   ]
  },
  "full_drop.rs": {
   "src": "use std::fs::File;\nuse std::io::{BufWriter, Write};\n\nfn main() -> std::io::Result<()> {\n    let mut out = BufWriter::new(File::create(\"/dev/full\")?);\n    writeln!(out, \"Books on loan: 2\")?;\n    println!(\"saved!\");\n    Ok(())\n}\n",
   "stdout": "saved!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "saved!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/full_drop"
    }
   ]
  },
  "full_flush.rs": {
   "src": "use std::fs::File;\nuse std::io::{BufWriter, Write};\n\nfn main() -> std::io::Result<()> {\n    let mut out = BufWriter::new(File::create(\"/dev/full\")?);\n    writeln!(out, \"Books on loan: 2\")?;\n    out.flush()?;\n    println!(\"saved!\");\n    Ok(())\n}\n",
   "stdout": "",
   "stderr": "Error: Os { code: 28, kind: StorageFull, message: \"No space left on device\" }\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "Error: Os { code: 28, kind: StorageFull, message: \"No space left on device\" }\n",
     "exit": 1,
     "dir": "~/rust-ch25/full_flush"
    }
   ]
  },
  "linecount.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "  5  21 notes.txt\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- --top 1 notes.txt",
     "out": "5 lines, 21 words\n 35 | A quiet library is a happy library.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/linecount"
    },
    {
     "cmd": "wc -l -w notes.txt",
     "out": "  5  21 notes.txt\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "literal_cast.rs": {
   "src": "fn main() {\n    let small = 300 as u8;\n    println!(\"{small}\");\n}\n",
   "stdout": "",
   "stderr": "error: literal out of range for `u8`\n --> src/main.rs:2:17\n  |\n2 |     let small = 300 as u8;\n  |                 ^^^\n  |\n  = note: the literal `300` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `literal_cast` (bin \"literal_cast\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: literal out of range for `u8`\n --> src/main.rs:2:17\n  |\n2 |     let small = 300 as u8;\n  |                 ^^^\n  |\n  = note: the literal `300` does not fit into the type `u8` whose range is `0..=255`\n  = note: `#[deny(overflowing_literals)]` on by default\n\nerror: could not compile `literal_cast` (bin \"literal_cast\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/literal_cast"
    }
   ]
  },
  "missing_file.rs": {
   "src": "use std::fs;\n\nfn main() -> std::io::Result<()> {\n    println!(\"looking for the lost book...\");\n    let text = fs::read_to_string(\"lost.txt\")?;\n    println!(\"found it: {text}\");\n    Ok(())\n}\n",
   "stdout": "looking for the lost book...\n",
   "stderr": "Error: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "looking for the lost book...\n",
     "err": "Error: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n",
     "exit": 1,
     "dir": "~/rust-ch25/missing_file",
     "merged": "looking for the lost book...\nError: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n"
    }
   ]
  },
  "newtype_bad.rs": {
   "src": "struct Meters(f64);\nstruct Feet(f64);\n\nfn fits_under(van: Meters, bridge: Meters) -> bool {\n    van.0 < bridge.0\n}\n\nfn main() {\n    let van = Meters(3.5);\n    let bridge = Feet(11.0);\n    println!(\"Does the bookmobile fit? {}\", fits_under(van, bridge));\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n  --> src/main.rs:11:61\n   |\n11 |     println!(\"Does the bookmobile fit? {}\", fits_under(van, bridge));\n   |                                             ----------      ^^^^^^ expected `Meters`, found `Feet`\n   |                                             |\n   |                                             arguments to this function are incorrect\n   |\nnote: function defined here\n  --> src/main.rs:4:4\n   |\n 4 | fn fits_under(van: Meters, bridge: Meters) -> bool {\n   |    ^^^^^^^^^^              --------------\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `newtype_bad` (bin \"newtype_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n  --> src/main.rs:11:61\n   |\n11 |     println!(\"Does the bookmobile fit? {}\", fits_under(van, bridge));\n   |                                             ----------      ^^^^^^ expected `Meters`, found `Feet`\n   |                                             |\n   |                                             arguments to this function are incorrect\n   |\nnote: function defined here\n  --> src/main.rs:4:4\n   |\n 4 | fn fits_under(van: Meters, bridge: Meters) -> bool {\n   |    ^^^^^^^^^^              --------------\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `newtype_bad` (bin \"newtype_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/newtype_bad"
    }
   ]
  },
  "newtype_ok.rs": {
   "src": "struct Meters(f64);\nstruct Feet(f64);\n\nimpl From<Feet> for Meters {\n    fn from(f: Feet) -> Meters {\n        Meters(f.0 * 0.3048)\n    }\n}\n\nfn fits_under(van: Meters, bridge: Meters) -> bool {\n    van.0 < bridge.0\n}\n\nfn main() {\n    let van = Meters(3.5);\n    let bridge = Feet(11.0);\n    let bridge_m: Meters = bridge.into();\n    println!(\"The bridge is {:.2} m high\", bridge_m.0);\n    println!(\"Does the bookmobile fit? {}\", fits_under(van, bridge_m));\n}\n",
   "stdout": "The bridge is 3.35 m high\nDoes the bookmobile fit? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "The bridge is 3.35 m high\nDoes the bookmobile fit? false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/newtype_ok"
    }
   ]
  },
  "numbered.rs": {
   "src": "use std::fs::File;\nuse std::io::{self, BufRead, BufReader};\n\nfn main() -> io::Result<()> {\n    let file = File::open(\"notes.txt\")?;\n    let reader = BufReader::new(file);\n    for (i, line) in reader.lines().enumerate() {\n        let line = line?;\n        println!(\"{:>3} | {line}\", i + 1);\n    }\n    Ok(())\n}\n",
   "stdout": "  1 | The owl reads at night.\n  2 | Books wait on the shelf.\n  3 | \n  4 | Mabel stamps every loan.\n  5 | A quiet library is a happy library.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "  1 | The owl reads at night.\n  2 | Books wait on the shelf.\n  3 | \n  4 | Mabel stamps every loan.\n  5 | A quiet library is a happy library.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/numbered"
    }
   ]
  },
  "parsons_count.rs": {
   "src": "use std::fs::File;\nuse std::io::{self, BufRead, BufReader};\n\nfn main() -> io::Result<()> {\n    let file = File::open(\"notes.txt\")?;\n    let reader = BufReader::new(file);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    println!(\"{} lines, {words} words\", lines.len());\n    Ok(())\n}\n",
   "stdout": "5 lines, 21 words\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5 lines, 21 words\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/parsons_count"
    }
   ]
  },
  "path_display.rs": {
   "src": "use std::path::PathBuf;\n\nfn main() {\n    let mut out = PathBuf::from(\"reports\");\n    out.push(\"april.txt\");\n    println!(\"saving to {}\", out);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `PathBuf` doesn't implement `std::fmt::Display`\n --> src/main.rs:6:30\n  |\n6 |     println!(\"saving to {}\", out);\n  |                         --   ^^^ `PathBuf` cannot be formatted with the default formatter; call `.display()` on it\n  |                         |\n  |                         required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `PathBuf`\n  = note: call `.display()` or `.to_string_lossy()` to safely print paths, as they may contain non-Unicode data\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `path_display` (bin \"path_display\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `PathBuf` doesn't implement `std::fmt::Display`\n --> src/main.rs:6:30\n  |\n6 |     println!(\"saving to {}\", out);\n  |                         --   ^^^ `PathBuf` cannot be formatted with the default formatter; call `.display()` on it\n  |                         |\n  |                         required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `PathBuf`\n  = note: call `.display()` or `.to_string_lossy()` to safely print paths, as they may contain non-Unicode data\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `path_display` (bin \"path_display\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/path_display"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `PathBuf` doesn't implement `std::fmt::Display`\n --> src/main.rs:6:30\n  |\n6 |     println!(\"saving to {}\", out);\n  |                         --   ^^^ `PathBuf` cannot be formatted with the default formatter; call `.display()` on it\n  |                         |\n  |                         required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `PathBuf`\n  = note: call `.display()` or `.to_string_lossy()` to safely print paths, as they may contain non-Unicode data\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `path_display` (bin \"path_display\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `PathBuf` doesn't implement `std::fmt::Display`\n --> src/main.rs:6:30\n  |\n6 |     println!(\"saving to {}\", out);\n  |                         --   ^^^ `PathBuf` cannot be formatted with the default formatter; call `.display()` on it\n  |                         |\n  |                         required by this formatting parameter\n  |\n  = help: the trait `std::fmt::Display` is not implemented for `PathBuf`\n  = note: call `.display()` or `.to_string_lossy()` to safely print paths, as they may contain non-Unicode data\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `path_display` (bin \"path_display\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch25/path_display"
     }
    ]
   }
  },
  "paths.rs": {
   "src": "use std::path::{Path, PathBuf};\n\nfn main() {\n    let p = Path::new(\"library/reports/march.txt\");\n    println!(\"file name: {:?}\", p.file_name());\n    println!(\"stem:      {:?}\", p.file_stem());\n    println!(\"extension: {:?}\", p.extension());\n    println!(\"parent:    {:?}\", p.parent());\n\n    let mut out = PathBuf::from(\"library\");\n    out.push(\"reports\");\n    out.push(\"april.txt\");\n    println!(\"built:     {}\", out.display());\n    println!(\"swapped:   {}\", out.with_extension(\"csv\").display());\n    println!(\"joined:    {}\", Path::new(\"library\").join(\"logo.png\").display());\n    println!(\"exists?    {}\", out.exists());\n}\n",
   "stdout": "file name: Some(\"march.txt\")\nstem:      Some(\"march\")\nextension: Some(\"txt\")\nparent:    Some(\"library/reports\")\nbuilt:     library/reports/april.txt\nswapped:   library/reports/april.csv\njoined:    library/logo.png\nexists?    false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "file name: Some(\"march.txt\")\nstem:      Some(\"march\")\nextension: Some(\"txt\")\nparent:    Some(\"library/reports\")\nbuilt:     library/reports/april.txt\nswapped:   library/reports/april.csv\njoined:    library/logo.png\nexists?    false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/paths"
    }
   ]
  },
  "predict_casts.rs": {
   "src": "fn main() {\n    let a: i32 = 260;\n    let b: i8 = -2;\n    let c: f64 = 2.7;\n    let d: f64 = 999.0;\n    let e: u8 = 200;\n    println!(\"{}\", a as u8);\n    println!(\"{}\", b as u8);\n    println!(\"{}\", c as u8);\n    println!(\"{}\", d as u8);\n    println!(\"{}\", e as i8);\n}\n",
   "stdout": "4\n254\n2\n255\n-56\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "4\n254\n2\n255\n-56\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/predict_casts"
    }
   ]
  },
  "predict_path.rs": {
   "src": "use std::path::Path;\n\nfn main() {\n    let p = Path::new(\"shelf/poems/owl.song.txt\");\n    println!(\"{}\", p.file_stem().unwrap().to_string_lossy());\n    println!(\"{}\", p.extension().unwrap().to_string_lossy());\n    println!(\"{}\", p.with_file_name(\"cat.txt\").display());\n    println!(\"{}\", p.parent().unwrap().join(\"index.md\").display());\n}\n",
   "stdout": "owl.song\ntxt\nshelf/poems/cat.txt\nshelf/poems/index.md\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "owl.song\ntxt\nshelf/poems/cat.txt\nshelf/poems/index.md\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/predict_path"
    }
   ]
  },
  "predict_stdin.rs": {
   "src": "use std::io;\n\nfn main() -> io::Result<()> {\n    let mut longest = 0;\n    let mut empty = 0;\n    for line in io::stdin().lines() {\n        let line = line?;\n        if line.is_empty() {\n            empty += 1;\n        }\n        longest = longest.max(line.len());\n    }\n    println!(\"longest: {longest}\");\n    println!(\"empty: {empty}\");\n    Ok(())\n}\n",
   "stdout": "longest: 5\nempty: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "printf 'cat\\n\\nheron\\nowl\\n' | cargo run -q",
     "out": "longest: 5\nempty: 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/predict_stdin"
    }
   ]
  },
  "remove_fixed.rs": {
   "src": "use std::fs;\n\nfn main() {\n    match fs::remove_file(\"old_report.txt\") {\n        Ok(()) => println!(\"old report removed!\"),\n        Err(e) => eprintln!(\"could not remove old_report.txt: {e}\"),\n    }\n}\n",
   "stdout": "",
   "stderr": "could not remove old_report.txt: No such file or directory (os error 2)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "could not remove old_report.txt: No such file or directory (os error 2)\n",
     "exit": 0,
     "dir": "~/rust-ch25/remove_fixed"
    }
   ]
  },
  "remove_warn.rs": {
   "src": "use std::fs;\n\nfn main() {\n    fs::remove_file(\"old_report.txt\");\n    println!(\"old report removed!\");\n}\n",
   "stdout": "old report removed!\n",
   "stderr": "warning: unused `Result` that must be used\n --> src/main.rs:4:5\n  |\n4 |     fs::remove_file(\"old_report.txt\");\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = fs::remove_file(\"old_report.txt\");\n  |     +++++++\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "old report removed!\n",
     "err": "warning: unused `Result` that must be used\n --> src/main.rs:4:5\n  |\n4 |     fs::remove_file(\"old_report.txt\");\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = fs::remove_file(\"old_report.txt\");\n  |     +++++++\n\n",
     "exit": 0,
     "dir": "~/rust-ch25/remove_warn",
     "merged": "warning: unused `Result` that must be used\n --> src/main.rs:4:5\n  |\n4 |     fs::remove_file(\"old_report.txt\");\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: this `Result` may be an `Err` variant, which should be handled\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = fs::remove_file(\"old_report.txt\");\n  |     +++++++\n\nold report removed!\n"
    }
   ]
  },
  "road_lost.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "",
   "stderr": "linecount: lost.txt: No such file or directory (os error 2)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q -- --top 2 lost.txt",
     "out": "",
     "err": "linecount: lost.txt: No such file or directory (os error 2)\n",
     "exit": 1,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "road_ok.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "5 lines, 21 words\n 35 | A quiet library is a happy library.\n 24 | Books wait on the shelf.\n 24 | Mabel stamps every loan.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- notes.txt",
     "out": "5 lines, 21 words\n 35 | A quiet library is a happy library.\n 24 | Books wait on the shelf.\n 24 | Mabel stamps every loan.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "road_range.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "",
   "stderr": "linecount: --top must be from 1 to 20, not 50\n",
   "exit": 2,
   "steps": [
    {
     "cmd": "cargo run -q -- --top 50 notes.txt",
     "out": "",
     "err": "linecount: --top must be from 1 to 20, not 50\n",
     "exit": 2,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "road_top.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "5 lines, 21 words\n 35 | A quiet library is a happy library.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- --top 1 notes.txt",
     "out": "5 lines, 21 words\n 35 | A quiet library is a happy library.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "road_usage.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "",
   "stderr": "linecount: usage: linecount [--top N] FILE\n",
   "exit": 2,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "linecount: usage: linecount [--top N] FILE\n",
     "exit": 2,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "road_word.rs": {
   "src": "use std::env;\nuse std::fs::File;\nuse std::io::{self, BufRead, BufReader, BufWriter, Write};\nuse std::process::ExitCode;\n\n/// How many of the longest lines to show: always 1 to 20.\n#[derive(Debug, Clone, Copy)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nimpl Default for TopN {\n    fn default() -> Self {\n        TopN(3)\n    }\n}\n\nfn parse_args(args: &[String]) -> Result<(TopN, String), String> {\n    match args {\n        [file] => Ok((TopN::default(), file.clone())),\n        [flag, n, file] if flag == \"--top\" => {\n            let n: i64 = n.parse().map_err(|e| format!(\"--top needs a whole number: {e}\"))?;\n            Ok((TopN::try_from(n)?, file.clone()))\n        }\n        _ => Err(\"usage: linecount [--top N] FILE\".to_string()),\n    }\n}\n\nfn count(path: &str, top: TopN) -> io::Result<()> {\n    let reader = BufReader::new(File::open(path)?);\n    let mut lines = Vec::new();\n    for line in reader.lines() {\n        lines.push(line?);\n    }\n    let words: usize = lines.iter().map(|l| l.split_whitespace().count()).sum();\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, \"{} lines, {words} words\", lines.len())?;\n    lines.sort_by_key(|l| std::cmp::Reverse(l.chars().count()));\n    for line in lines.iter().take(usize::from(top.0)) {\n        writeln!(out, \"{:>3} | {line}\", line.chars().count())?;\n    }\n    out.flush()?;\n    Ok(())\n}\n\nfn main() -> ExitCode {\n    let args: Vec<String> = env::args().skip(1).collect();\n    let (top, path) = match parse_args(&args) {\n        Ok(found) => found,\n        Err(msg) => {\n            eprintln!(\"linecount: {msg}\");\n            return ExitCode::from(2);\n        }\n    };\n    match count(&path, top) {\n        Ok(()) => ExitCode::SUCCESS,\n        Err(e) => {\n            eprintln!(\"linecount: {path}: {e}\");\n            ExitCode::FAILURE\n        }\n    }\n}\n",
   "stdout": "",
   "stderr": "linecount: --top needs a whole number: invalid digit found in string\n",
   "exit": 2,
   "steps": [
    {
     "cmd": "cargo run -q -- --top lots notes.txt",
     "out": "",
     "err": "linecount: --top needs a whole number: invalid digit found in string\n",
     "exit": 2,
     "dir": "~/rust-ch25/linecount"
    }
   ]
  },
  "set_var_bad.rs": {
   "src": "use std::env;\n\nfn main() {\n    env::set_var(\"SHELVES\", \"12\");\n    println!(\"{:?}\", env::var(\"SHELVES\"));\n}\n",
   "stdout": "",
   "stderr": "error[E0133]: call to unsafe function `set_var` is unsafe and requires unsafe block\n --> src/main.rs:4:5\n  |\n4 |     env::set_var(\"SHELVES\", \"12\");\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ call to unsafe function\n  |\n  = note: consult the function's documentation for information on how to avoid undefined behavior\n\nFor more information about this error, try `rustc --explain E0133`.\nerror: could not compile `set_var_bad` (bin \"set_var_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0133]: call to unsafe function `set_var` is unsafe and requires unsafe block\n --> src/main.rs:4:5\n  |\n4 |     env::set_var(\"SHELVES\", \"12\");\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ call to unsafe function\n  |\n  = note: consult the function's documentation for information on how to avoid undefined behavior\n\nFor more information about this error, try `rustc --explain E0133`.\nerror: could not compile `set_var_bad` (bin \"set_var_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch25/set_var_bad"
    }
   ]
  },
  "set_var_ok.rs": {
   "src": "use std::env;\n\nfn main() {\n    // SAFETY: this program has only one thread, and nothing else\n    // is reading the environment while we change it.\n    unsafe {\n        env::set_var(\"SHELVES\", \"12\");\n    }\n    println!(\"{:?}\", env::var(\"SHELVES\"));\n}\n",
   "stdout": "Ok(\"12\")\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ok(\"12\")\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/set_var_ok"
    }
   ]
  },
  "shout.rs": {
   "src": "use std::io;\n\nfn main() -> io::Result<()> {\n    for line in io::stdin().lines() {\n        let line = line?;\n        println!(\"{}\", line.to_uppercase());\n    }\n    Ok(())\n}\n",
   "stdout": "THE OWL READS AT NIGHT.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cat notes.txt | cargo run -q",
     "out": "THE OWL READS AT NIGHT.\nBOOKS WAIT ON THE SHELF.\n\nMABEL STAMPS EVERY LOAN.\nA QUIET LIBRARY IS A HAPPY LIBRARY.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/shout"
    },
    {
     "cmd": "cat notes.txt | cargo run -q | grep OWL",
     "out": "THE OWL READS AT NIGHT.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/shout"
    }
   ]
  },
  "spot_alias.rs": {
   "src": "type Grams = u32;\ntype Pounds = u32;\n\nfn can_post(parcel: Grams) -> bool {\n    parcel <= 2000\n}\n\nfn main() {\n    let box_of_books: Pounds = 9;\n    let weight: Grams = box_of_books;\n    println!(\"Can the post office take it? {}\", can_post(weight));\n}\n",
   "stdout": "Can the post office take it? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Can the post office take it? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/spot_alias"
    }
   ]
  },
  "spot_flush.rs": {
   "src": "use std::io::{self, BufWriter, Write};\nuse std::process;\n\nfn main() -> io::Result<()> {\n    let loans = [(\"Ada\", 0), (\"Ben\", 3), (\"Cy\", 0)];\n    let mut out = BufWriter::new(io::stdout());\n    let mut overdue = 0;\n    for (name, days) in loans {\n        writeln!(out, \"{name}: {days} days late\")?;\n        overdue += days;\n    }\n    if overdue > 0 {\n        process::exit(1);\n    }\n    Ok(())\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "",
     "exit": 1,
     "dir": "~/rust-ch25/spot_flush"
    }
   ]
  },
  "streams.rs": {
   "src": "fn main() {\n    println!(\"Report: 3 books came back today\");\n    eprintln!(\"warning: 1 book is overdue\");\n    println!(\"Report: done\");\n}\n",
   "stdout": "",
   "stderr": "warning: 1 book is overdue\nwarning: 1 book is overdue\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Report: 3 books came back today\nReport: done\n",
     "err": "warning: 1 book is overdue\n",
     "exit": 0,
     "dir": "~/rust-ch25/streams",
     "merged": "Report: 3 books came back today\nwarning: 1 book is overdue\nReport: done\n"
    },
    {
     "cmd": "cargo run -q 2> /dev/null",
     "out": "Report: 3 books came back today\nReport: done\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/streams"
    },
    {
     "cmd": "cargo run -q > /dev/null",
     "out": "",
     "err": "warning: 1 book is overdue\n",
     "exit": 0,
     "dir": "~/rust-ch25/streams"
    }
   ]
  },
  "tally.rs": {
   "src": "use clap::Parser;\n\n/// Count the lines and words in a text file.\n#[derive(Parser, Debug)]\n#[command(name = \"tally\", version)]\nstruct Args {\n    /// The file to read\n    file: String,\n\n    /// Also show the N longest lines\n    #[arg(short, long, default_value_t = 0)]\n    top: u8,\n\n    /// Print the numbers only, no words\n    #[arg(short, long)]\n    quiet: bool,\n}\n\nfn main() {\n    let args = Args::parse();\n    println!(\"{args:?}\");\n}\n",
   "stdout": "Args { file: \"notes.txt\", top: 0, quiet: true }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- --help",
     "out": "Count the lines and words in a text file\n\nUsage: tally [OPTIONS] <FILE>\n\nArguments:\n  <FILE>  The file to read\n\nOptions:\n  -t, --top <TOP>  Also show the N longest lines [default: 0]\n  -q, --quiet      Print the numbers only, no words\n  -h, --help       Print help\n  -V, --version    Print version\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/tally"
    },
    {
     "cmd": "cargo run -q -- notes.txt --top 3",
     "out": "Args { file: \"notes.txt\", top: 3, quiet: false }\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/tally"
    },
    {
     "cmd": "cargo run -q -- -q notes.txt",
     "out": "Args { file: \"notes.txt\", top: 0, quiet: true }\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/tally"
    }
   ]
  },
  "tally_bad.rs": {
   "src": "use clap::Parser;\n\n/// Count the lines and words in a text file.\n#[derive(Parser, Debug)]\n#[command(name = \"tally\", version)]\nstruct Args {\n    /// The file to read\n    file: String,\n\n    /// Also show the N longest lines\n    #[arg(short, long, default_value_t = 0)]\n    top: u8,\n\n    /// Print the numbers only, no words\n    #[arg(short, long)]\n    quiet: bool,\n}\n\nfn main() {\n    let args = Args::parse();\n    println!(\"{args:?}\");\n}\n",
   "stdout": "",
   "stderr": "error: invalid value '300' for '--top <TOP>': 300 is not in 0..=255\n\nFor more information, try '--help'.\nerror: the following required arguments were not provided:\n  <FILE>\n\nUsage: tally --top <TOP> <FILE>\n\nFor more information, try '--help'.\nerror: unexpected argument '--qiet' found\n\n  tip: a similar argument exists: '--quiet'\n\nUsage: tally --quiet <FILE>\n\nFor more information, try '--help'.\n",
   "exit": 2,
   "steps": [
    {
     "cmd": "cargo run -q -- notes.txt --top 300",
     "out": "",
     "err": "error: invalid value '300' for '--top <TOP>': 300 is not in 0..=255\n\nFor more information, try '--help'.\n",
     "exit": 2,
     "dir": "~/rust-ch25/tally"
    },
    {
     "cmd": "cargo run -q -- --top 2",
     "out": "",
     "err": "error: the following required arguments were not provided:\n  <FILE>\n\nUsage: tally --top <TOP> <FILE>\n\nFor more information, try '--help'.\n",
     "exit": 2,
     "dir": "~/rust-ch25/tally"
    },
    {
     "cmd": "cargo run -q -- notes.txt --qiet",
     "out": "",
     "err": "error: unexpected argument '--qiet' found\n\n  tip: a similar argument exists: '--quiet'\n\nUsage: tally --quiet <FILE>\n\nFor more information, try '--help'.\n",
     "exit": 2,
     "dir": "~/rust-ch25/tally"
    }
   ]
  },
  "topn.rs": {
   "src": "#[derive(Debug)]\nstruct TopN(u8);\n\nimpl TryFrom<i64> for TopN {\n    type Error = String;\n\n    fn try_from(n: i64) -> Result<Self, Self::Error> {\n        if (1..=20).contains(&n) {\n            Ok(TopN(n as u8)) // fits: checked on the line above\n        } else {\n            Err(format!(\"--top must be from 1 to 20, not {n}\"))\n        }\n    }\n}\n\nfn read_top(text: &str) -> Result<TopN, String> {\n    let n: i64 = text.parse().map_err(|e| format!(\"{text:?} is not a whole number: {e}\"))?;\n    TopN::try_from(n)\n}\n\nfn main() {\n    for text in [\"5\", \"20\", \"0\", \"300\", \"-2\", \"lots\"] {\n        match read_top(text) {\n            Ok(top) => println!(\"{text:>4} -> Ok: show {} lines\", top.0),\n            Err(e) => println!(\"{text:>4} -> Err: {e}\"),\n        }\n    }\n}\n",
   "stdout": "   5 -> Ok: show 5 lines\n  20 -> Ok: show 20 lines\n   0 -> Err: --top must be from 1 to 20, not 0\n 300 -> Err: --top must be from 1 to 20, not 300\n  -2 -> Err: --top must be from 1 to 20, not -2\nlots -> Err: \"lots\" is not a whole number: invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "   5 -> Ok: show 5 lines\n  20 -> Ok: show 20 lines\n   0 -> Err: --top must be from 1 to 20, not 0\n 300 -> Err: --top must be from 1 to 20, not 300\n  -2 -> Err: --top must be from 1 to 20, not -2\nlots -> Err: \"lots\" is not a whole number: invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/topn"
    }
   ]
  },
  "trace_buffer.rs": {
   "src": "use std::io::{BufWriter, Write};\n\nfn main() -> std::io::Result<()> {\n    let mut w = BufWriter::with_capacity(10, Vec::new());\n    for word in [\"ink\", \"quill\", \"pen\", \"paper\", \"eraser\"] {\n        w.write_all(word.as_bytes())?;\n        println!(\"{word} {} {}\", w.buffer().len(), w.get_ref().len());\n    }\n    Ok(())\n}\n",
   "stdout": "ink 3 0\nquill 8 0\npen 3 8\npaper 8 8\neraser 6 16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "ink 3 0\nquill 8 0\npen 3 8\npaper 8 8\neraser 6 16\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/trace_buffer"
    }
   ]
  },
  "trace_factorial.rs": {
   "src": "fn main() {\n    let mut product: u8 = 1;\n    for n in 1..=7u8 {\n        match product.checked_mul(n) {\n            Some(p) => product = p,\n            None => {\n                println!(\"{n} overflow\");\n                break;\n            }\n        }\n        println!(\"{n} {product}\");\n    }\n}\n",
   "stdout": "1 1\n2 2\n3 6\n4 24\n5 120\n6 overflow\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1\n2 2\n3 6\n4 24\n5 120\n6 overflow\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/trace_factorial"
    }
   ]
  },
  "try_from.rs": {
   "src": "fn main() {\n    for n in [42_i64, 255, 256, 300, -1] {\n        match u8::try_from(n) {\n            Ok(b) => println!(\"u8::try_from({n}) = Ok({b})\"),\n            Err(e) => println!(\"u8::try_from({n}) = Err: {e}\"),\n        }\n    }\n    let r: Result<i32, _> = 120_000_i64.try_into();\n    println!(\"120000 into i32: {r:?}\");\n    let r: Result<u8, _> = 1000_i32.try_into();\n    println!(\"1000 into u8: {r:?}\");\n}\n",
   "stdout": "u8::try_from(42) = Ok(42)\nu8::try_from(255) = Ok(255)\nu8::try_from(256) = Err: number too large to fit in target type\nu8::try_from(300) = Err: number too large to fit in target type\nu8::try_from(-1) = Err: number too small to fit in target type\n120000 into i32: Ok(120000)\n1000 into u8: Err(TryFromIntError(PosOverflow))\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "u8::try_from(42) = Ok(42)\nu8::try_from(255) = Ok(255)\nu8::try_from(256) = Err: number too large to fit in target type\nu8::try_from(300) = Err: number too large to fit in target type\nu8::try_from(-1) = Err: number too small to fit in target type\n120000 into i32: Ok(120000)\n1000 into u8: Err(TryFromIntError(PosOverflow))\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/try_from"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "u8::try_from(42) = Ok(42)\nu8::try_from(255) = Ok(255)\nu8::try_from(256) = Err: out of range integral type conversion attempted\nu8::try_from(300) = Err: out of range integral type conversion attempted\nu8::try_from(-1) = Err: out of range integral type conversion attempted\n120000 into i32: Ok(120000)\n1000 into u8: Err(TryFromIntError(PosOverflow))\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "u8::try_from(42) = Ok(42)\nu8::try_from(255) = Ok(255)\nu8::try_from(256) = Err: out of range integral type conversion attempted\nu8::try_from(300) = Err: out of range integral type conversion attempted\nu8::try_from(-1) = Err: out of range integral type conversion attempted\n120000 into i32: Ok(120000)\n1000 into u8: Err(TryFromIntError(PosOverflow))\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch25/try_from"
     }
    ]
   }
  },
  "try_unwrap.rs": {
   "src": "fn main() {\n    let pages: i32 = 300;\n    let small = u8::try_from(pages).unwrap();\n    println!(\"{small}\");\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:3:37:\ncalled `Result::unwrap()` on an `Err` value: TryFromIntError(PosOverflow)\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:3:37:\ncalled `Result::unwrap()` on an `Err` value: TryFromIntError(PosOverflow)\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch25/try_unwrap"
    }
   ]
  },
  "vanish.rs": {
   "src": "use std::fs::File;\nuse std::io::{BufWriter, Write};\nuse std::process;\n\nfn main() -> std::io::Result<()> {\n    let file = File::create(\"report.txt\")?;\n    let mut out = BufWriter::new(file);\n    writeln!(out, \"Books on loan: 2\")?;\n    writeln!(out, \"Overdue: 0\")?;\n    println!(\"report written!\");\n    process::exit(0);\n}\n",
   "stdout": "0 report.txt\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "report written!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish"
    },
    {
     "cmd": "cat report.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish"
    },
    {
     "cmd": "wc -c report.txt",
     "out": "0 report.txt\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish"
    }
   ]
  },
  "vanish_fixed.rs": {
   "src": "use std::fs::File;\nuse std::io::{BufWriter, Write};\nuse std::process;\n\nfn main() -> std::io::Result<()> {\n    let file = File::create(\"report.txt\")?;\n    let mut out = BufWriter::new(file);\n    writeln!(out, \"Books on loan: 2\")?;\n    writeln!(out, \"Overdue: 0\")?;\n    out.flush()?;\n    println!(\"report written!\");\n    process::exit(0);\n}\n",
   "stdout": "28 report.txt\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "report written!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish_fixed"
    },
    {
     "cmd": "cat report.txt",
     "out": "Books on loan: 2\nOverdue: 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish_fixed"
    },
    {
     "cmd": "wc -c report.txt",
     "out": "28 report.txt\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/vanish_fixed"
    }
   ]
  },
  "write_read.rs": {
   "src": "use std::fs;\n\nfn main() -> std::io::Result<()> {\n    fs::write(\"loans.txt\", \"Ada: Dune\\nBen: Emma\\n\")?;\n    let text = fs::read_to_string(\"loans.txt\")?;\n    print!(\"{text}\");\n    fs::write(\"loans.txt\", \"Cy: Heidi\\n\")?;\n    let again = fs::read_to_string(\"loans.txt\")?;\n    println!(\"after the second write: {again:?}\");\n    Ok(())\n}\n",
   "stdout": "Ada: Dune\nBen: Emma\nafter the second write: \"Cy: Heidi\\n\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ada: Dune\nBen: Emma\nafter the second write: \"Cy: Heidi\\n\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/write_read"
    }
   ]
  },
  "write_trait.rs": {
   "src": "use std::fs::{self, File};\nuse std::io::{self, Write};\n\nfn report(out: &mut impl Write, books: &[&str]) -> io::Result<()> {\n    writeln!(out, \"Books on loan: {}\", books.len())?;\n    for b in books {\n        writeln!(out, \"- {b}\")?;\n    }\n    Ok(())\n}\n\nfn main() -> io::Result<()> {\n    let books = [\"Dune\", \"Emma\"];\n    report(&mut io::stdout(), &books)?;\n    let mut file = File::create(\"loans.txt\")?;\n    report(&mut file, &books)?;\n    let mut memory: Vec<u8> = Vec::new();\n    report(&mut memory, &books)?;\n    let on_disk = fs::read(\"loans.txt\")?;\n    println!(\"file: {} bytes, memory: {} bytes\", on_disk.len(), memory.len());\n    println!(\"same bytes? {}\", on_disk == memory);\n    Ok(())\n}\n",
   "stdout": "Books on loan: 2\n- Dune\n- Emma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Books on loan: 2\n- Dune\n- Emma\nfile: 31 bytes, memory: 31 bytes\nsame bytes? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/write_trait"
    },
    {
     "cmd": "cat loans.txt",
     "out": "Books on loan: 2\n- Dune\n- Emma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch25/write_trait"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
