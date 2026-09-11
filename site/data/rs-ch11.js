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
  "workdir": "/home/you/rust-ch11",
  "versionDifferences": [
   "get_add_err.rs",
   "iter_move.rs",
   "loop_push.rs",
   "option_add.rs",
   "predict_e0369.rs",
   "predict_iter_move.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): get_add_err.rs, iter_move.rs, loop_push.rs, option_add.rs, predict_e0369.rs, predict_iter_move.rs."
 },
 "programs": {
  "bind.rs": {
   "src": "enum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn run(action: Action) {\n    match action {\n        Action::Stop => println!(\"stopping\"),\n        Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n        Action::Write { text } => println!(\"writing: {}\", text),\n    }\n}\n\nfn main() {\n    run(Action::Move(3, -1));\n    run(Action::Write { text: String::from(\"Quiet please\") });\n    run(Action::Stop);\n}\n",
   "stdout": "moving 3 across, -1 up\nwriting: Quiet please\nstopping\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "moving 3 across, -1 up\nwriting: Quiet please\nstopping\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/bind"
    }
   ]
  },
  "borrow_push.rs": {
   "src": "fn main() {\n    let mut cart = vec![10, 20, 30];\n    let first = &cart[0];\n    cart.push(40);\n    println!(\"first is {}\", first);\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let first = &cart[0];\n  |                  ---- immutable borrow occurs here\n4 |     cart.push(40);\n  |     ^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"first is {}\", first);\n  |                             ----- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `borrow_push` (bin \"borrow_push\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let first = &cart[0];\n  |                  ---- immutable borrow occurs here\n4 |     cart.push(40);\n  |     ^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"first is {}\", first);\n  |                             ----- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `borrow_push` (bin \"borrow_push\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/borrow_push"
    }
   ]
  },
  "boss_error.rs": {
   "src": "enum Signal {\n    Red,\n    Amber,\n    Green,\n}\n\nfn go(s: Signal) -> bool {\n    match s {\n        Signal::Green => true,\n        Signal::Red => false,\n    }\n}\n\nfn main() {\n    println!(\"{}\", go(Signal::Amber));\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `Signal::Amber` not covered\n  --> src/main.rs:8:11\n   |\n 8 |     match s {\n   |           ^ pattern `Signal::Amber` not covered\n   |\nnote: `Signal` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Signal {\n   |      ^^^^^^\n 2 |     Red,\n 3 |     Amber,\n   |     ----- not covered\n   = note: the matched value is of type `Signal`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n10 ~         Signal::Red => false,\n11 ~         Signal::Amber => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `Signal::Amber` not covered\n  --> src/main.rs:8:11\n   |\n 8 |     match s {\n   |           ^ pattern `Signal::Amber` not covered\n   |\nnote: `Signal` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Signal {\n   |      ^^^^^^\n 2 |     Red,\n 3 |     Amber,\n   |     ----- not covered\n   = note: the matched value is of type `Signal`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n10 ~         Signal::Red => false,\n11 ~         Signal::Amber => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/boss_error"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "fn biggest(nums: &[i32]) -> Option<i32> {\n    let Some(first) = nums.get(0) else {\n        return None;\n    };\n    let mut best = *first;\n    for n in nums {\n        if *n > best {\n            best = *n;\n        }\n    }\n    Some(best)\n}\n\nfn main() {\n    let scores = vec![4, 9, 2];\n    let none: Vec<i32> = Vec::new();\n    println!(\"{:?}\", biggest(&scores));\n    println!(\"{:?}\", biggest(&none));\n}\n",
   "stdout": "Some(9)\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(9)\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "fn main() {\n    let mut cart = vec![3, 1, 2];\n    cart.sort();\n    let top = cart.pop();\n    if let Some(n) = top {\n        println!(\"took {}, {} left\", n, cart.len());\n    } else {\n        println!(\"empty cart\");\n    }\n}\n",
   "stdout": "took 3, 2 left\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "took 3, 2 left\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "#[derive(Debug)]\nenum Slip {\n    Return(u32),\n    Renew { days: u32 },\n    Lost,\n}\n\nfn fee(s: &Slip) -> u32 {\n    match s {\n        Slip::Return(late) => *late * 10,\n        Slip::Renew { days } => *days,\n        Slip::Lost => 500,\n    }\n}\n\nfn main() {\n    let mut desk = vec![Slip::Return(3), Slip::Lost, Slip::Renew { days: 14 }];\n    let last = desk.pop();\n    println!(\"{:?}\", last);\n    println!(\"{}\", fee(&desk[0]) + fee(&desk[1]));\n    println!(\"{:?}\", desk.get(1));\n    println!(\"{:?}\", desk.get(2).is_some());\n}\n",
   "stdout": "Some(Renew { days: 14 })\n530\nSome(Lost)\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(Renew { days: 14 })\n530\nSome(Lost)\nfalse\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/boss_predict"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "fn main() {\n    let mut stack = vec![1, 2];\n    let todo = [7, 0, 4, 0, 0];\n    for t in todo {\n        if t == 0 {\n            let got = stack.pop();\n            println!(\"{} {:?} {}\", t, got, stack.len());\n        } else {\n            stack.push(t);\n            println!(\"{} {:?} {}\", t, stack.last(), stack.len());\n        }\n    }\n}\n",
   "stdout": "7 Some(7) 3\n0 Some(7) 2\n4 Some(4) 3\n0 Some(4) 2\n0 Some(2) 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 Some(7) 3\n0 Some(7) 2\n4 Some(4) 3\n0 Some(4) 2\n0 Some(2) 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/boss_trace"
    }
   ]
  },
  "capacity.rs": {
   "src": "fn main() {\n    let mut v: Vec<i32> = Vec::new();\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n    for n in 1..=9 {\n        v.push(n * 10);\n        println!(\"len {} cap {}\", v.len(), v.capacity());\n    }\n}\n",
   "stdout": "len 0 cap 0\nlen 1 cap 4\nlen 2 cap 4\nlen 3 cap 4\nlen 4 cap 4\nlen 5 cap 8\nlen 6 cap 8\nlen 7 cap 8\nlen 8 cap 8\nlen 9 cap 16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "len 0 cap 0\nlen 1 cap 4\nlen 2 cap 4\nlen 3 cap 4\nlen 4 cap 4\nlen 5 cap 8\nlen 6 cap 8\nlen 7 cap 8\nlen 8 cap 8\nlen 9 cap 16\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/capacity"
    }
   ]
  },
  "checked.rs": {
   "src": "fn main() {\n    let seats: u8 = 250;\n    let a = seats.checked_add(3);\n    let b = seats.checked_add(10);\n    println!(\"{:?}\", a);\n    println!(\"{:?}\", b);\n}\n",
   "stdout": "Some(253)\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(253)\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/checked"
    }
   ]
  },
  "coin_match.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn cents(coin: Coin) -> u32 {\n    match coin {\n        Coin::Penny => 1,\n        Coin::Nickel => 5,\n        Coin::Dime => 10,\n        Coin::Quarter => 25,\n    }\n}\n\nfn main() {\n    println!(\"penny: {}\", cents(Coin::Penny));\n    println!(\"nickel: {}\", cents(Coin::Nickel));\n    println!(\"dime: {}\", cents(Coin::Dime));\n    println!(\"quarter: {}\", cents(Coin::Quarter));\n}\n",
   "stdout": "penny: 1\nnickel: 5\ndime: 10\nquarter: 25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "penny: 1\nnickel: 5\ndime: 10\nquarter: 25\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/coin_match"
    }
   ]
  },
  "coin_missing.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn cents(coin: Coin) -> u32 {\n    match coin {\n        Coin::Penny => 1,\n        Coin::Nickel => 5,\n        Coin::Quarter => 25,\n    }\n}\n\nfn main() {\n    println!(\"penny: {}\", cents(Coin::Penny));\n    println!(\"dime: {}\", cents(Coin::Dime));\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `Coin::Dime` not covered\n  --> src/main.rs:9:11\n   |\n 9 |     match coin {\n   |           ^^^^ pattern `Coin::Dime` not covered\n   |\nnote: `Coin` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Coin {\n   |      ^^^^\n...\n 4 |     Dime,\n   |     ---- not covered\n   = note: the matched value is of type `Coin`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n12 ~         Coin::Quarter => 25,\n13 ~         Coin::Dime => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `coin_missing` (bin \"coin_missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `Coin::Dime` not covered\n  --> src/main.rs:9:11\n   |\n 9 |     match coin {\n   |           ^^^^ pattern `Coin::Dime` not covered\n   |\nnote: `Coin` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Coin {\n   |      ^^^^\n...\n 4 |     Dime,\n   |     ---- not covered\n   = note: the matched value is of type `Coin`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n12 ~         Coin::Quarter => 25,\n13 ~         Coin::Dime => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `coin_missing` (bin \"coin_missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/coin_missing"
    }
   ]
  },
  "enum_data.rs": {
   "src": "#[derive(Debug)]\nenum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn main() {\n    let a = Action::Stop;\n    let b = Action::Move(3, -1);\n    let c = Action::Write {\n        text: String::from(\"Quiet please\"),\n    };\n    println!(\"{:?}\", a);\n    println!(\"{:?}\", b);\n    println!(\"{:?}\", c);\n}\n",
   "stdout": "Stop\nMove(3, -1)\nWrite { text: \"Quiet please\" }\n",
   "stderr": "warning: fields `0` and `1` are never read\n --> src/main.rs:4:10\n  |\n4 |     Move(i32, i32),\n  |     ---- ^^^  ^^^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the fields to be of unit type to suppress this warning while preserving the field numbering, or remove the fields\n  |\n4 -     Move(i32, i32),\n4 +     Move((), ()),\n  |\n\nwarning: field `text` is never read\n --> src/main.rs:5:13\n  |\n5 |     Write { text: String },\n  |     -----   ^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Stop\nMove(3, -1)\nWrite { text: \"Quiet please\" }\n",
     "err": "warning: fields `0` and `1` are never read\n --> src/main.rs:4:10\n  |\n4 |     Move(i32, i32),\n  |     ---- ^^^  ^^^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the fields to be of unit type to suppress this warning while preserving the field numbering, or remove the fields\n  |\n4 -     Move(i32, i32),\n4 +     Move((), ()),\n  |\n\nwarning: field `text` is never read\n --> src/main.rs:5:13\n  |\n5 |     Write { text: String },\n  |     -----   ^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\n",
     "exit": 0,
     "dir": "~/rust-ch11/enum_data",
     "merged": "warning: fields `0` and `1` are never read\n --> src/main.rs:4:10\n  |\n4 |     Move(i32, i32),\n  |     ---- ^^^  ^^^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the fields to be of unit type to suppress this warning while preserving the field numbering, or remove the fields\n  |\n4 -     Move(i32, i32),\n4 +     Move((), ()),\n  |\n\nwarning: field `text` is never read\n --> src/main.rs:5:13\n  |\n5 |     Write { text: String },\n  |     -----   ^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Action` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\nStop\nMove(3, -1)\nWrite { text: \"Quiet please\" }\n"
    }
   ]
  },
  "enum_floor.rs": {
   "src": "enum Shelf {\n    Fiction,\n    Science,\n    History,\n}\n\nfn floor(shelf: Shelf) -> u8 {\n    match shelf {\n        Shelf::Fiction => 1,\n        Shelf::Science => 2,\n        Shelf::History => 3,\n    }\n}\n\nfn main() {\n    println!(\"Fiction: floor {}\", floor(Shelf::Fiction));\n    println!(\"Science: floor {}\", floor(Shelf::Science));\n    println!(\"History: floor {}\", floor(Shelf::History));\n}\n",
   "stdout": "Fiction: floor 1\nScience: floor 2\nHistory: floor 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Fiction: floor 1\nScience: floor 2\nHistory: floor 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/enum_floor"
    }
   ]
  },
  "enum_method.rs": {
   "src": "enum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nimpl Action {\n    fn show(&self) {\n        match self {\n            Action::Stop => println!(\"[stop]\"),\n            Action::Move(x, y) => println!(\"[move {} {}]\", x, y),\n            Action::Write { text } => println!(\"[write {}]\", text),\n        }\n    }\n\n    fn is_stop(&self) -> bool {\n        match self {\n            Action::Stop => true,\n            _ => false,\n        }\n    }\n}\n\nfn main() {\n    let plan = [Action::Move(2, 0), Action::Write { text: String::from(\"Hi\") }, Action::Stop];\n    for step in &plan {\n        step.show();\n        if step.is_stop() {\n            println!(\"done!\");\n        }\n    }\n}\n",
   "stdout": "[move 2 0]\n[write Hi]\n[stop]\ndone!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[move 2 0]\n[write Hi]\n[stop]\ndone!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/enum_method"
    }
   ]
  },
  "expect_panic.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let full = [true, true, true, true, true];\n    let seat = first_free(full).expect(\"the evening room is full\");\n    println!(\"seat {}\", seat);\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:12:33:\nthe evening room is full\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:12:33:\nthe evening room is full\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch11/expect_panic"
    }
   ]
  },
  "fill_bind.rs": {
   "src": "enum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn main() {\n    let todo = [Action::Move(4, 2), Action::Write { text: String::from(\"Shh\") }, Action::Stop];\n    for a in todo {\n        match a {\n            Action::Move(x, y) => println!(\"{} steps\", x + y),\n            Action::Write { text } => println!(\"{} letters\", text.len()),\n            Action::Stop => println!(\"rest\"),\n        }\n    }\n}\n",
   "stdout": "6 steps\n3 letters\nrest\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "6 steps\n3 letters\nrest\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fill_bind"
    }
   ]
  },
  "fill_enum.rs": {
   "src": "#[derive(Debug)]\nenum Ticket {\n    Return,\n    Renew(u32),\n}\n\nfn main() {\n    let t1 = Ticket::Return;\n    let t2 = Ticket::Renew(7);\n    println!(\"{:?} then {:?}\", t1, t2);\n}\n",
   "stdout": "Return then Renew(7)\n",
   "stderr": "warning: field `0` is never read\n --> src/main.rs:4:11\n  |\n4 |     Renew(u32),\n  |     ----- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Ticket` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Renew(u32),\n4 +     Renew(()),\n  |\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Return then Renew(7)\n",
     "err": "warning: field `0` is never read\n --> src/main.rs:4:11\n  |\n4 |     Renew(u32),\n  |     ----- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Ticket` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Renew(u32),\n4 +     Renew(()),\n  |\n\n",
     "exit": 0,
     "dir": "~/rust-ch11/fill_enum",
     "merged": "warning: field `0` is never read\n --> src/main.rs:4:11\n  |\n4 |     Renew(u32),\n  |     ----- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Ticket` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Renew(u32),\n4 +     Renew(()),\n  |\n\nReturn then Renew(7)\n"
    }
   ]
  },
  "fill_iter_mut.rs": {
   "src": "fn main() {\n    let mut pages = vec![100, 250, 75];\n    for p in &mut pages {\n        *p += 1;\n    }\n    println!(\"{:?}\", pages);\n}\n",
   "stdout": "[101, 251, 76]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[101, 251, 76]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fill_iter_mut"
    }
   ]
  },
  "fill_let_else.rs": {
   "src": "fn half(n: u32) -> Option<u32> {\n    if n % 2 == 0 { Some(n / 2) } else { None }\n}\n\nfn show_half(n: u32) {\n    let Some(h) = half(n) else {\n        println!(\"{} won't split evenly\", n);\n        return;\n    };\n    println!(\"half of {} is {}\", n, h);\n}\n\nfn main() {\n    show_half(10);\n    show_half(7);\n}\n",
   "stdout": "half of 10 is 5\n7 won't split evenly\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "half of 10 is 5\n7 won't split evenly\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fill_let_else"
    }
   ]
  },
  "first_enum.rs": {
   "src": "#[derive(Debug)]\nenum Shelf {\n    Fiction,\n    Science,\n    History,\n}\n\nfn main() {\n    let a = Shelf::Fiction;\n    let b = Shelf::Science;\n    let c = Shelf::History;\n    println!(\"{:?}, {:?}, {:?}\", a, b, c);\n}\n",
   "stdout": "Fiction, Science, History\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Fiction, Science, History\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/first_enum"
    }
   ]
  },
  "first_free.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let morning = [true, true, false, true, false];\n    let evening = [true, true, true, true, true];\n    println!(\"{:?}\", first_free(morning));\n    println!(\"{:?}\", first_free(evening));\n}\n",
   "stdout": "Some(2)\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(2)\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/first_free"
    }
   ]
  },
  "first_room.rs": {
   "src": "fn main() {\n    let mut bytes: Vec<u8> = Vec::new();\n    bytes.push(1);\n    let mut nums: Vec<i32> = Vec::new();\n    nums.push(1);\n    let mut big: Vec<[u8; 2000]> = Vec::new();\n    big.push([0; 2000]);\n    println!(\"Vec<u8>: room for {} after one push\", bytes.capacity());\n    println!(\"Vec<i32>: room for {} after one push\", nums.capacity());\n    println!(\"Vec<[u8; 2000]>: room for {} after one push\", big.capacity());\n    let cart = vec![10, 20, 30];\n    println!(\"vec![10, 20, 30]: len {}, capacity {}\", cart.len(), cart.capacity());\n}\n",
   "stdout": "Vec<u8>: room for 8 after one push\nVec<i32>: room for 4 after one push\nVec<[u8; 2000]>: room for 1 after one push\nvec![10, 20, 30]: len 3, capacity 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Vec<u8>: room for 8 after one push\nVec<i32>: room for 4 after one push\nVec<[u8; 2000]>: room for 1 after one push\nvec![10, 20, 30]: len 3, capacity 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/first_room"
    }
   ]
  },
  "fix_loop_push.rs": {
   "src": "fn main() {\n    let mut cart = vec![1, 2, 3];\n    let mut extra = Vec::new();\n    for x in &cart {\n        if *x > 1 {\n            extra.push(*x * 10);\n        }\n    }\n    for x in extra {\n        cart.push(x);\n    }\n    println!(\"{:?}\", cart);\n}\n",
   "stdout": "[1, 2, 3, 20, 30]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[1, 2, 3, 20, 30]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fix_loop_push"
    }
   ]
  },
  "fix_push_copy.rs": {
   "src": "fn main() {\n    let mut cart = vec![10, 20, 30];\n    let first = cart[0];\n    cart.push(40);\n    println!(\"first is {}\", first);\n}\n",
   "stdout": "first is 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first is 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fix_push_copy"
    }
   ]
  },
  "fix_push_order.rs": {
   "src": "fn main() {\n    let mut cart = vec![10, 20, 30];\n    let first = &cart[0];\n    println!(\"first is {}\", first);\n    cart.push(40);\n}\n",
   "stdout": "first is 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first is 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/fix_push_order"
    }
   ]
  },
  "get_add_err.rs": {
   "src": "fn main() {\n    let cart = vec![10, 20, 30];\n    let next = cart.get(0) + 1;\n    println!(\"{}\", next);\n}\n",
   "stdout": "",
   "stderr": "error[E0369]: cannot add `{integer}` to `Option<&{integer}>`\n --> src/main.rs:3:28\n  |\n3 |     let next = cart.get(0) + 1;\n  |                ----------- ^ - {integer}\n  |                |\n  |                Option<&{integer}>\n  |\nnote: `Option<&{integer}>` does not implement `Add<{integer}>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n  |\n  = note: `Option<&{integer}>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `get_add_err` (bin \"get_add_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0369]: cannot add `{integer}` to `Option<&{integer}>`\n --> src/main.rs:3:28\n  |\n3 |     let next = cart.get(0) + 1;\n  |                ----------- ^ - {integer}\n  |                |\n  |                Option<&{integer}>\n  |\nnote: `Option<&{integer}>` does not implement `Add<{integer}>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n  |\n  = note: `Option<&{integer}>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `get_add_err` (bin \"get_add_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/get_add_err"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0369]: cannot add `{integer}` to `Option<&{integer}>`\n --> src/main.rs:3:28\n  |\n3 |     let next = cart.get(0) + 1;\n  |                ----------- ^ - {integer}\n  |                |\n  |                Option<&{integer}>\n  |\nnote: `Option<&{integer}>` does not implement `Add<{integer}>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n  |\n  = note: `Option<&{integer}>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `get_add_err` (bin \"get_add_err\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0369]: cannot add `{integer}` to `Option<&{integer}>`\n --> src/main.rs:3:28\n  |\n3 |     let next = cart.get(0) + 1;\n  |                ----------- ^ - {integer}\n  |                |\n  |                Option<&{integer}>\n  |\nnote: `Option<&{integer}>` does not implement `Add<{integer}>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n  |\n  = note: `Option<&{integer}>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `get_add_err` (bin \"get_add_err\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/get_add_err"
     }
    ]
   }
  },
  "get_match.rs": {
   "src": "fn main() {\n    let cart = vec![10, 20, 30];\n    for slot in [1, 10] {\n        match cart.get(slot) {\n            Some(book) => println!(\"slot {}: book {}\", slot, book),\n            None => println!(\"slot {}: nothing there\", slot),\n        }\n    }\n}\n",
   "stdout": "slot 1: book 20\nslot 10: nothing there\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "slot 1: book 20\nslot 10: nothing there\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/get_match"
    }
   ]
  },
  "grow.rs": {
   "src": "fn main() {\n    let mut v: Vec<i32> = Vec::new();\n    v.push(10);\n    v.push(20);\n    v.push(30);\n    v.push(40);\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n    v.push(50);\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n    let top = v.pop();\n    println!(\"popped {:?}, len {} cap {}\", top, v.len(), v.capacity());\n}\n",
   "stdout": "len 4 cap 4\nlen 5 cap 8\npopped Some(50), len 4 cap 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "len 4 cap 4\nlen 5 cap 8\npopped Some(50), len 4 cap 8\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/grow"
    }
   ]
  },
  "if_let.rs": {
   "src": "fn main() {\n    let space: u8 = 250;\n    if let Some(total) = space.checked_add(3) {\n        println!(\"room for {} books\", total);\n    }\n    if let Some(total) = space.checked_add(10) {\n        println!(\"room for {} books\", total);\n    } else {\n        println!(\"that would overflow!\");\n    }\n}\n",
   "stdout": "room for 253 books\nthat would overflow!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "room for 253 books\nthat would overflow!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/if_let"
    }
   ]
  },
  "in_real.rs": {
   "src": "#[derive(Debug)]\nenum Event {\n    Borrowed { title: String, days: u32 },\n    Returned(String),\n    Closed,\n}\n\nfn main() {\n    let mut log: Vec<Event> = Vec::new();\n    log.push(Event::Borrowed { title: String::from(\"Emma\"), days: 14 });\n    log.push(Event::Returned(String::from(\"Dune\")));\n    log.push(Event::Closed);\n    for e in &log {\n        match e {\n            Event::Borrowed { title, days } => println!(\"out: {} for {} days\", title, days),\n            Event::Returned(title) => println!(\"back: {}\", title),\n            Event::Closed => println!(\"-- closed --\"),\n        }\n    }\n    println!(\"{:?}\", log.last());\n}\n",
   "stdout": "out: Emma for 14 days\nback: Dune\n-- closed --\nSome(Closed)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "out: Emma for 14 days\nback: Dune\n-- closed --\nSome(Closed)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/in_real"
    }
   ]
  },
  "index_get.rs": {
   "src": "fn main() {\n    let cart = vec![10, 20, 30];\n    println!(\"cart[0] = {}\", cart[0]);\n    println!(\"cart[2] = {}\", cart[2]);\n    println!(\"cart.get(1) = {:?}\", cart.get(1));\n    println!(\"cart.get(10) = {:?}\", cart.get(10));\n}\n",
   "stdout": "cart[0] = 10\ncart[2] = 30\ncart.get(1) = Some(20)\ncart.get(10) = None\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cart[0] = 10\ncart[2] = 30\ncart.get(1) = Some(20)\ncart.get(10) = None\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/index_get"
    }
   ]
  },
  "index_panic.rs": {
   "src": "fn main() {\n    let cart = vec![10, 20, 30];\n    let slot = 10;\n    println!(\"before\");\n    println!(\"{}\", cart[slot]);\n    println!(\"after\");\n}\n",
   "stdout": "before\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:5:24:\nindex out of bounds: the len is 3 but the index is 10\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "before\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:5:24:\nindex out of bounds: the len is 3 but the index is 10\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch11/index_panic",
     "merged": "before\n\nthread 'main' (1) panicked at src/main.rs:5:24:\nindex out of bounds: the len is 3 but the index is 10\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "insert_remove.rs": {
   "src": "fn main() {\n    let mut queue = vec![\"Ana\", \"Ben\", \"Cy\"];\n    queue.insert(1, \"Dev\");\n    println!(\"{:?}\", queue);\n    let gone = queue.remove(0);\n    println!(\"{} left, now {:?}\", gone, queue);\n}\n",
   "stdout": "[\"Ana\", \"Dev\", \"Ben\", \"Cy\"]\nAna left, now [\"Dev\", \"Ben\", \"Cy\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[\"Ana\", \"Dev\", \"Ben\", \"Cy\"]\nAna left, now [\"Dev\", \"Ben\", \"Cy\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/insert_remove"
    }
   ]
  },
  "iter_move.rs": {
   "src": "fn main() {\n    let fines = vec![20, 5, 50];\n    for f in fines {\n        println!(\"fine: {}\", f);\n    }\n    println!(\"{:?}\", fines);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `fines`\n --> src/main.rs:6:22\n  |\n2 |     let fines = vec![20, 5, 50];\n  |         ----- move occurs because `fines` has type `Vec<i32>`, which does not implement the `Copy` trait\n3 |     for f in fines {\n  |              ----- `fines` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{:?}\", fines);\n  |                      ^^^^^ value borrowed here after move\n  |\nnote: the `for` loop is desugared into a call to `std::iter::IntoIterator::into_iter`, which takes ownership of the receiver `self`, which moves `fines`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<i32>`'s content to avoid moving into the `for` loop\n  |\n3 |     for f in &fines {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `iter_move` (bin \"iter_move\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `fines`\n --> src/main.rs:6:22\n  |\n2 |     let fines = vec![20, 5, 50];\n  |         ----- move occurs because `fines` has type `Vec<i32>`, which does not implement the `Copy` trait\n3 |     for f in fines {\n  |              ----- `fines` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{:?}\", fines);\n  |                      ^^^^^ value borrowed here after move\n  |\nnote: the `for` loop is desugared into a call to `std::iter::IntoIterator::into_iter`, which takes ownership of the receiver `self`, which moves `fines`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<i32>`'s content to avoid moving into the `for` loop\n  |\n3 |     for f in &fines {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `iter_move` (bin \"iter_move\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/iter_move"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0382]: borrow of moved value: `fines`\n --> src/main.rs:6:22\n  |\n2 |     let fines = vec![20, 5, 50];\n  |         ----- move occurs because `fines` has type `Vec<i32>`, which does not implement the `Copy` trait\n3 |     for f in fines {\n  |              ----- `fines` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{:?}\", fines);\n  |                      ^^^^^ value borrowed here after move\n  |\nnote: `into_iter` takes ownership of the receiver `self`, which moves `fines`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<i32>`'s content to avoid moving into the `for` loop\n  |\n3 |     for f in &fines {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `iter_move` (bin \"iter_move\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0382]: borrow of moved value: `fines`\n --> src/main.rs:6:22\n  |\n2 |     let fines = vec![20, 5, 50];\n  |         ----- move occurs because `fines` has type `Vec<i32>`, which does not implement the `Copy` trait\n3 |     for f in fines {\n  |              ----- `fines` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{:?}\", fines);\n  |                      ^^^^^ value borrowed here after move\n  |\nnote: `into_iter` takes ownership of the receiver `self`, which moves `fines`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<i32>`'s content to avoid moving into the `for` loop\n  |\n3 |     for f in &fines {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `iter_move` (bin \"iter_move\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/iter_move"
     }
    ]
   }
  },
  "iter_mut.rs": {
   "src": "fn main() {\n    let mut fines = vec![20, 5, 50];\n    for f in &mut fines {\n        *f += 10;\n    }\n    println!(\"{:?}\", fines);\n}\n",
   "stdout": "[30, 15, 60]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[30, 15, 60]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/iter_mut"
    }
   ]
  },
  "iter_mut_err.rs": {
   "src": "fn main() {\n    let mut fines = vec![20, 5, 50];\n    for f in &mut fines {\n        f += 10;\n    }\n    println!(\"{:?}\", fines);\n}\n",
   "stdout": "",
   "stderr": "error[E0368]: binary assignment operation `+=` cannot be applied to type `&mut {integer}`\n --> src/main.rs:4:9\n  |\n4 |         f += 10;\n  |         -^^^^^^\n  |         |\n  |         cannot use `+=` on type `&mut {integer}`\n  |\nhelp: `+=` can be used on `{integer}` if you dereference the left-hand side\n  |\n4 |         *f += 10;\n  |         +\n\nFor more information about this error, try `rustc --explain E0368`.\nerror: could not compile `iter_mut_err` (bin \"iter_mut_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0368]: binary assignment operation `+=` cannot be applied to type `&mut {integer}`\n --> src/main.rs:4:9\n  |\n4 |         f += 10;\n  |         -^^^^^^\n  |         |\n  |         cannot use `+=` on type `&mut {integer}`\n  |\nhelp: `+=` can be used on `{integer}` if you dereference the left-hand side\n  |\n4 |         *f += 10;\n  |         +\n\nFor more information about this error, try `rustc --explain E0368`.\nerror: could not compile `iter_mut_err` (bin \"iter_mut_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/iter_mut_err"
    }
   ]
  },
  "iter_read.rs": {
   "src": "fn main() {\n    let fines = vec![20, 5, 50];\n    let mut total = 0;\n    for f in &fines {\n        total += *f;\n    }\n    println!(\"total {} from {:?}\", total, fines);\n}\n",
   "stdout": "total 75 from [20, 5, 50]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "total 75 from [20, 5, 50]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/iter_read"
    }
   ]
  },
  "let_else.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn book(seats: [bool; 5]) {\n    let Some(i) = first_free(seats) else {\n        println!(\"no seat free, try tomorrow\");\n        return;\n    };\n    println!(\"booked seat {}\", i);\n}\n\nfn main() {\n    book([true, false, false, true, true]);\n    book([true, true, true, true, true]);\n}\n",
   "stdout": "booked seat 1\nno seat free, try tomorrow\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "booked seat 1\nno seat free, try tomorrow\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/let_else"
    }
   ]
  },
  "let_else_err.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn book(seats: [bool; 5]) {\n    let Some(i) = first_free(seats) else {\n        println!(\"no seat free, try tomorrow\");\n    };\n    println!(\"booked seat {}\", i);\n}\n\nfn main() {\n    book([true, true, true, true, true]);\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: `else` clause of `let...else` does not diverge\n  --> src/main.rs:11:42\n   |\n11 |       let Some(i) = first_free(seats) else {\n   |  __________________________________________^\n12 | |         println!(\"no seat free, try tomorrow\");\n13 | |     };\n   | |_____^ expected `!`, found `()`\n   |\n   = note:   expected type `!`\n           found unit type `()`\n   = help: try adding a diverging expression, such as `return` or `panic!(..)`\n   = help: ...or use `match` instead of `let...else`\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `let_else_err` (bin \"let_else_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: `else` clause of `let...else` does not diverge\n  --> src/main.rs:11:42\n   |\n11 |       let Some(i) = first_free(seats) else {\n   |  __________________________________________^\n12 | |         println!(\"no seat free, try tomorrow\");\n13 | |     };\n   | |_____^ expected `!`, found `()`\n   |\n   = note:   expected type `!`\n           found unit type `()`\n   = help: try adding a diverging expression, such as `return` or `panic!(..)`\n   = help: ...or use `match` instead of `let...else`\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `let_else_err` (bin \"let_else_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/let_else_err"
    }
   ]
  },
  "loop_push.rs": {
   "src": "fn main() {\n    let mut cart = vec![1, 2, 3];\n    for x in &cart {\n        if *x > 1 {\n            cart.push(*x * 10);\n        }\n    }\n    println!(\"{:?}\", cart);\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:13\n  |\n3 |       for x in &cart {\n  |       -        -----\n  |       |        |\n  |       |        immutable borrow occurs here\n  |  _____|        immutable borrow later used here\n  | |\n4 | |         if *x > 1 {\n5 | |             cart.push(*x * 10);\n  | |             ^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n6 | |         }\n7 | |     }\n  | |_____- this for loop borrows `cart` immutably, preventing mutation within its body\n  |\n  = help: consider using an index-based loop instead, or collecting modifications into a separate collection\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `loop_push` (bin \"loop_push\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:13\n  |\n3 |       for x in &cart {\n  |       -        -----\n  |       |        |\n  |       |        immutable borrow occurs here\n  |  _____|        immutable borrow later used here\n  | |\n4 | |         if *x > 1 {\n5 | |             cart.push(*x * 10);\n  | |             ^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n6 | |         }\n7 | |     }\n  | |_____- this for loop borrows `cart` immutably, preventing mutation within its body\n  |\n  = help: consider using an index-based loop instead, or collecting modifications into a separate collection\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `loop_push` (bin \"loop_push\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/loop_push"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:13\n  |\n3 |     for x in &cart {\n  |              -----\n  |              |\n  |              immutable borrow occurs here\n  |              immutable borrow later used here\n4 |         if *x > 1 {\n5 |             cart.push(*x * 10);\n  |             ^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `loop_push` (bin \"loop_push\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0502]: cannot borrow `cart` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:13\n  |\n3 |     for x in &cart {\n  |              -----\n  |              |\n  |              immutable borrow occurs here\n  |              immutable borrow later used here\n4 |         if *x > 1 {\n5 |             cart.push(*x * 10);\n  |             ^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `loop_push` (bin \"loop_push\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/loop_push"
     }
    ]
   }
  },
  "match_block.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn main() {\n    let jar = [Coin::Penny, Coin::Quarter, Coin::Nickel, Coin::Dime];\n    let mut total = 0;\n    for coin in jar {\n        let value = match coin {\n            Coin::Penny => {\n                println!(\"a lucky penny!\");\n                1\n            }\n            Coin::Nickel => 5,\n            Coin::Dime => 10,\n            Coin::Quarter => 25,\n        };\n        total += value;\n    }\n    println!(\"total: {} cents\", total);\n}\n",
   "stdout": "a lucky penny!\ntotal: 41 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "a lucky penny!\ntotal: 41 cents\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/match_block"
    }
   ]
  },
  "matches.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn main() {\n    let jar = [Coin::Dime, Coin::Penny, Coin::Quarter, Coin::Nickel, Coin::Penny];\n    let mut pennies = 0;\n    for coin in &jar {\n        if matches!(coin, Coin::Penny) {\n            pennies += 1;\n        }\n    }\n    println!(\"{} pennies\", pennies);\n    let found: Option<u8> = Some(4);\n    println!(\"found something? {}\", matches!(found, Some(_)));\n}\n",
   "stdout": "2 pennies\nfound something? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "2 pennies\nfound something? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/matches"
    }
   ]
  },
  "mixed.rs": {
   "src": "enum Item {\n    Book(String),\n    Dvd(u32),\n    Umbrella,\n}\n\nfn main() {\n    let returns = vec![\n        Item::Book(String::from(\"Emma\")),\n        Item::Dvd(95),\n        Item::Umbrella,\n        Item::Book(String::from(\"Dune\")),\n    ];\n    for item in &returns {\n        match item {\n            Item::Book(title) => println!(\"book: {}\", title),\n            Item::Dvd(minutes) => println!(\"DVD, {} minutes\", minutes),\n            Item::Umbrella => println!(\"someone's umbrella!\"),\n        }\n    }\n    println!(\"{} items returned\", returns.len());\n}\n",
   "stdout": "book: Emma\nDVD, 95 minutes\nsomeone's umbrella!\nbook: Dune\n4 items returned\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "book: Emma\nDVD, 95 minutes\nsomeone's umbrella!\nbook: Dune\n4 items returned\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/mixed"
    }
   ]
  },
  "mixed_err.rs": {
   "src": "fn main() {\n    let bag = vec![42, \"Emma\", 3.5];\n    println!(\"{:?}\", bag);\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:2:24\n  |\n2 |     let bag = vec![42, \"Emma\", 3.5];\n  |                        ^^^^^^ expected integer, found `&str`\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `mixed_err` (bin \"mixed_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:2:24\n  |\n2 |     let bag = vec![42, \"Emma\", 3.5];\n  |                        ^^^^^^ expected integer, found `&str`\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `mixed_err` (bin \"mixed_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/mixed_err"
    }
   ]
  },
  "move_out.rs": {
   "src": "fn main() {\n    let titles = vec![String::from(\"Emma\"), String::from(\"Dune\")];\n    let t = titles[0];\n    println!(\"{}\", t);\n}\n",
   "stdout": "",
   "stderr": "error[E0507]: cannot move out of index of `Vec<String>`\n --> src/main.rs:3:13\n  |\n3 |     let t = titles[0];\n  |             ^^^^^^^^^ move occurs because value has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider borrowing here\n  |\n3 |     let t = &titles[0];\n  |             +\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n3 |     let t = titles[0].clone();\n  |                      ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out` (bin \"move_out\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0507]: cannot move out of index of `Vec<String>`\n --> src/main.rs:3:13\n  |\n3 |     let t = titles[0];\n  |             ^^^^^^^^^ move occurs because value has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider borrowing here\n  |\n3 |     let t = &titles[0];\n  |             +\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n3 |     let t = titles[0].clone();\n  |                      ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out` (bin \"move_out\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/move_out"
    }
   ]
  },
  "number_match.rs": {
   "src": "fn main() {\n    for late in [0, 1, 3, 9] {\n        let note = match late {\n            0 => \"on time, thank you\",\n            1 => \"one day late\",\n            _ => \"please see Mabel\",\n        };\n        println!(\"{} days: {}\", late, note);\n    }\n}\n",
   "stdout": "0 days: on time, thank you\n1 days: one day late\n3 days: please see Mabel\n9 days: please see Mabel\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 days: on time, thank you\n1 days: one day late\n3 days: please see Mabel\n9 days: please see Mabel\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/number_match"
    }
   ]
  },
  "number_missing.rs": {
   "src": "fn main() {\n    let late = 3;\n    let note = match late {\n        0 => \"on time, thank you\",\n        1 => \"one day late\",\n    };\n    println!(\"{}\", note);\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `i32::MIN..=-1_i32` and `2_i32..=i32::MAX` not covered\n --> src/main.rs:3:22\n  |\n3 |     let note = match late {\n  |                      ^^^^ patterns `i32::MIN..=-1_i32` and `2_i32..=i32::MAX` not covered\n  |\n  = note: the matched value is of type `i32`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern, a match arm with multiple or-patterns as shown, or multiple match arms\n  |\n5 ~         1 => \"one day late\",\n6 ~         i32::MIN..=-1_i32 | 2_i32..=i32::MAX => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `number_missing` (bin \"number_missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `i32::MIN..=-1_i32` and `2_i32..=i32::MAX` not covered\n --> src/main.rs:3:22\n  |\n3 |     let note = match late {\n  |                      ^^^^ patterns `i32::MIN..=-1_i32` and `2_i32..=i32::MAX` not covered\n  |\n  = note: the matched value is of type `i32`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern, a match arm with multiple or-patterns as shown, or multiple match arms\n  |\n5 ~         1 => \"one day late\",\n6 ~         i32::MIN..=-1_i32 | 2_i32..=i32::MAX => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `number_missing` (bin \"number_missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/number_missing"
    }
   ]
  },
  "open_box.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let morning = [true, true, false, true, false];\n    println!(\"match: {}\", match first_free(morning) { Some(i) => i, None => 99 });\n    if let Some(i) = first_free(morning) {\n        println!(\"if let: {}\", i);\n    }\n    println!(\"unwrap: {}\", first_free(morning).unwrap());\n    println!(\"expect: {}\", first_free(morning).expect(\"no seat\"));\n}\n",
   "stdout": "match: 2\nif let: 2\nunwrap: 2\nexpect: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "match: 2\nif let: 2\nunwrap: 2\nexpect: 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/open_box"
    }
   ]
  },
  "option_add.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let morning = [true, true, false, true, false];\n    let seat = first_free(morning);\n    println!(\"seat number {}\", seat + 1);\n}\n",
   "stdout": "",
   "stderr": "error[E0369]: cannot add `{integer}` to `Option<usize>`\n  --> src/main.rs:13:37\n   |\n13 |     println!(\"seat number {}\", seat + 1);\n   |                                ---- ^ - {integer}\n   |                                |\n   |                                Option<usize>\n   |\nnote: `Option<usize>` does not implement `Add<{integer}>`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n   |\n   = note: `Option<usize>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `option_add` (bin \"option_add\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0369]: cannot add `{integer}` to `Option<usize>`\n  --> src/main.rs:13:37\n   |\n13 |     println!(\"seat number {}\", seat + 1);\n   |                                ---- ^ - {integer}\n   |                                |\n   |                                Option<usize>\n   |\nnote: `Option<usize>` does not implement `Add<{integer}>`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n   |\n   = note: `Option<usize>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `option_add` (bin \"option_add\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/option_add"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0369]: cannot add `{integer}` to `Option<usize>`\n  --> src/main.rs:13:37\n   |\n13 |     println!(\"seat number {}\", seat + 1);\n   |                                ---- ^ - {integer}\n   |                                |\n   |                                Option<usize>\n   |\nnote: `Option<usize>` does not implement `Add<{integer}>`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n   |\n   = note: `Option<usize>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `option_add` (bin \"option_add\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0369]: cannot add `{integer}` to `Option<usize>`\n  --> src/main.rs:13:37\n   |\n13 |     println!(\"seat number {}\", seat + 1);\n   |                                ---- ^ - {integer}\n   |                                |\n   |                                Option<usize>\n   |\nnote: `Option<usize>` does not implement `Add<{integer}>`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n   |\n   = note: `Option<usize>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `option_add` (bin \"option_add\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/option_add"
     }
    ]
   }
  },
  "option_match.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let morning = [true, true, false, true, false];\n    let evening = [true, true, true, true, true];\n    for room in [morning, evening] {\n        match first_free(room) {\n            Some(i) => println!(\"seat {} is free\", i),\n            None => println!(\"sorry, every seat is taken\"),\n        }\n    }\n}\n",
   "stdout": "seat 2 is free\nsorry, every seat is taken\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "seat 2 is free\nsorry, every seat is taken\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/option_match"
    }
   ]
  },
  "ordering.rs": {
   "src": "use std::cmp::Ordering;\n\nfn main() {\n    let due = 14;\n    for day in [10, 14, 17] {\n        match day.cmp(&due) {\n            Ordering::Less => println!(\"day {}: early, thanks!\", day),\n            Ordering::Equal => println!(\"day {}: right on time\", day),\n            Ordering::Greater => println!(\"day {}: {} days late\", day, day - due),\n        }\n    }\n}\n",
   "stdout": "day 10: early, thanks!\nday 14: right on time\nday 17: 3 days late\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "day 10: early, thanks!\nday 14: right on time\nday 17: 3 days late\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/ordering"
    }
   ]
  },
  "parsons_match.rs": {
   "src": "fn main() {\n    let day = 6;\n    let kind = match day {\n        6 | 7 => \"weekend\",\n        _ => \"school day\",\n    };\n    println!(\"day {} is a {}\", day, kind);\n}\n",
   "stdout": "day 6 is a weekend\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "day 6 is a weekend\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/parsons_match"
    }
   ]
  },
  "parsons_vec.rs": {
   "src": "fn main() {\n    let mut ids = Vec::new();\n    ids.push(30);\n    ids.push(10);\n    ids.push(30);\n    println!(\"{:?}\", ids);\n    ids.sort();\n    ids.dedup();\n    println!(\"{:?}\", ids);\n}\n",
   "stdout": "[30, 10, 30]\n[10, 30]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[30, 10, 30]\n[10, 30]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/parsons_vec"
    }
   ]
  },
  "pop.rs": {
   "src": "fn main() {\n    let mut cart = vec![10, 20, 30];\n    println!(\"{:?}\", cart.pop());\n    println!(\"{:?}\", cart.pop());\n    println!(\"{:?}\", cart);\n    println!(\"{:?}\", cart.pop());\n    println!(\"{:?}\", cart.pop());\n    println!(\"{:?}\", cart);\n}\n",
   "stdout": "Some(30)\nSome(20)\n[10]\nSome(10)\nNone\n[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(30)\nSome(20)\n[10]\nSome(10)\nNone\n[]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/pop"
    }
   ]
  },
  "predict_dedup.rs": {
   "src": "fn main() {\n    let mut a = vec![2, 2, 9, 2, 9];\n    a.dedup();\n    println!(\"{:?}\", a);\n    a.sort();\n    a.dedup();\n    println!(\"{:?}\", a);\n}\n",
   "stdout": "[2, 9, 2, 9]\n[2, 9]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[2, 9, 2, 9]\n[2, 9]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/predict_dedup"
    }
   ]
  },
  "predict_e0369.rs": {
   "src": "fn main() {\n    let price: u8 = 200;\n    let after_tax = price.checked_add(16);\n    let total = after_tax * 2;\n    println!(\"{}\", total);\n}\n",
   "stdout": "",
   "stderr": "error[E0369]: cannot multiply `Option<u8>` by `{integer}`\n --> src/main.rs:4:27\n  |\n4 |     let total = after_tax * 2;\n  |                 --------- ^ - {integer}\n  |                 |\n  |                 Option<u8>\n  |\nnote: `Option<u8>` does not implement `Mul<{integer}>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n  |\n  = note: `Option<u8>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `predict_e0369` (bin \"predict_e0369\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0369]: cannot multiply `Option<u8>` by `{integer}`\n --> src/main.rs:4:27\n  |\n4 |     let total = after_tax * 2;\n  |                 --------- ^ - {integer}\n  |                 |\n  |                 Option<u8>\n  |\nnote: `Option<u8>` does not implement `Mul<{integer}>`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n  |\n  = note: `Option<u8>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `predict_e0369` (bin \"predict_e0369\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/predict_e0369"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0369]: cannot multiply `Option<u8>` by `{integer}`\n --> src/main.rs:4:27\n  |\n4 |     let total = after_tax * 2;\n  |                 --------- ^ - {integer}\n  |                 |\n  |                 Option<u8>\n  |\nnote: `Option<u8>` does not implement `Mul<{integer}>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n  |\n  = note: `Option<u8>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `predict_e0369` (bin \"predict_e0369\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0369]: cannot multiply `Option<u8>` by `{integer}`\n --> src/main.rs:4:27\n  |\n4 |     let total = after_tax * 2;\n  |                 --------- ^ - {integer}\n  |                 |\n  |                 Option<u8>\n  |\nnote: `Option<u8>` does not implement `Mul<{integer}>`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n  |\n  = note: `Option<u8>` is defined in another crate\n\nFor more information about this error, try `rustc --explain E0369`.\nerror: could not compile `predict_e0369` (bin \"predict_e0369\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/predict_e0369"
     }
    ]
   }
  },
  "predict_enum.rs": {
   "src": "#[derive(Debug)]\nenum Light {\n    Off,\n    Dim(u8),\n    Color { r: u8, g: u8, b: u8 },\n}\n\nfn main() {\n    let a = Light::Dim(40);\n    let b = Light::Color { r: 255, g: 0, b: 9 };\n    let c = Light::Off;\n    println!(\"{:?}\", a);\n    println!(\"{:?}\", c);\n    println!(\"{:?}\", b);\n}\n",
   "stdout": "Dim(40)\nOff\nColor { r: 255, g: 0, b: 9 }\n",
   "stderr": "warning: field `0` is never read\n --> src/main.rs:4:9\n  |\n4 |     Dim(u8),\n  |     --- ^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Dim(u8),\n4 +     Dim(()),\n  |\n\nwarning: fields `r`, `g`, and `b` are never read\n --> src/main.rs:5:13\n  |\n5 |     Color { r: u8, g: u8, b: u8 },\n  |     -----   ^      ^      ^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dim(40)\nOff\nColor { r: 255, g: 0, b: 9 }\n",
     "err": "warning: field `0` is never read\n --> src/main.rs:4:9\n  |\n4 |     Dim(u8),\n  |     --- ^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Dim(u8),\n4 +     Dim(()),\n  |\n\nwarning: fields `r`, `g`, and `b` are never read\n --> src/main.rs:5:13\n  |\n5 |     Color { r: u8, g: u8, b: u8 },\n  |     -----   ^      ^      ^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\n",
     "exit": 0,
     "dir": "~/rust-ch11/predict_enum",
     "merged": "warning: field `0` is never read\n --> src/main.rs:4:9\n  |\n4 |     Dim(u8),\n  |     --- ^^\n  |     |\n  |     field in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n4 -     Dim(u8),\n4 +     Dim(()),\n  |\n\nwarning: fields `r`, `g`, and `b` are never read\n --> src/main.rs:5:13\n  |\n5 |     Color { r: u8, g: u8, b: u8 },\n  |     -----   ^      ^      ^\n  |     |\n  |     fields in this variant\n  |\n  = note: `Light` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n\nDim(40)\nOff\nColor { r: 255, g: 0, b: 9 }\n"
    }
   ]
  },
  "predict_get.rs": {
   "src": "fn main() {\n    let days = vec![3, 1, 4, 1, 5];\n    println!(\"{}\", days[2]);\n    println!(\"{:?}\", days.get(4));\n    println!(\"{:?}\", days.get(5));\n    println!(\"{}\", days.len());\n}\n",
   "stdout": "4\nSome(5)\nNone\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "4\nSome(5)\nNone\n5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/predict_get"
    }
   ]
  },
  "predict_iter_move.rs": {
   "src": "fn main() {\n    let names = vec![String::from(\"Ana\"), String::from(\"Ben\")];\n    for n in names {\n        println!(\"hello, {}\", n);\n    }\n    println!(\"{} names\", names.len());\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `names`\n --> src/main.rs:6:26\n  |\n2 |     let names = vec![String::from(\"Ana\"), String::from(\"Ben\")];\n  |         ----- move occurs because `names` has type `Vec<String>`, which does not implement the `Copy` trait\n3 |     for n in names {\n  |              ----- `names` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{} names\", names.len());\n  |                          ^^^^^ value borrowed here after move\n  |\nnote: the `for` loop is desugared into a call to `std::iter::IntoIterator::into_iter`, which takes ownership of the receiver `self`, which moves `names`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<String>`'s content to avoid moving into the `for` loop\n  |\n3 |     for n in &names {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `predict_iter_move` (bin \"predict_iter_move\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `names`\n --> src/main.rs:6:26\n  |\n2 |     let names = vec![String::from(\"Ana\"), String::from(\"Ben\")];\n  |         ----- move occurs because `names` has type `Vec<String>`, which does not implement the `Copy` trait\n3 |     for n in names {\n  |              ----- `names` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{} names\", names.len());\n  |                          ^^^^^ value borrowed here after move\n  |\nnote: the `for` loop is desugared into a call to `std::iter::IntoIterator::into_iter`, which takes ownership of the receiver `self`, which moves `names`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<String>`'s content to avoid moving into the `for` loop\n  |\n3 |     for n in &names {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `predict_iter_move` (bin \"predict_iter_move\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/predict_iter_move"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0382]: borrow of moved value: `names`\n --> src/main.rs:6:26\n  |\n2 |     let names = vec![String::from(\"Ana\"), String::from(\"Ben\")];\n  |         ----- move occurs because `names` has type `Vec<String>`, which does not implement the `Copy` trait\n3 |     for n in names {\n  |              ----- `names` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{} names\", names.len());\n  |                          ^^^^^ value borrowed here after move\n  |\nnote: `into_iter` takes ownership of the receiver `self`, which moves `names`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<String>`'s content to avoid moving into the `for` loop\n  |\n3 |     for n in &names {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `predict_iter_move` (bin \"predict_iter_move\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0382]: borrow of moved value: `names`\n --> src/main.rs:6:26\n  |\n2 |     let names = vec![String::from(\"Ana\"), String::from(\"Ben\")];\n  |         ----- move occurs because `names` has type `Vec<String>`, which does not implement the `Copy` trait\n3 |     for n in names {\n  |              ----- `names` moved due to this implicit call to `.into_iter()`\n...\n6 |     println!(\"{} names\", names.len());\n  |                          ^^^^^ value borrowed here after move\n  |\nnote: `into_iter` takes ownership of the receiver `self`, which moves `names`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/collect.rs:312:17\nhelp: consider iterating over a slice of the `Vec<String>`'s content to avoid moving into the `for` loop\n  |\n3 |     for n in &names {\n  |              +\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `predict_iter_move` (bin \"predict_iter_move\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch11/predict_iter_move"
     }
    ]
   }
  },
  "predict_match.rs": {
   "src": "enum Size {\n    Small,\n    Medium,\n    Large,\n}\n\nfn price(s: Size) -> u32 {\n    match s {\n        Size::Small => 2,\n        Size::Medium => 3,\n        Size::Large => 5,\n    }\n}\n\nfn main() {\n    let total = price(Size::Large) + price(Size::Small);\n    println!(\"{}\", total);\n    println!(\"{}\", price(Size::Medium) * 2);\n}\n",
   "stdout": "7\n6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7\n6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/predict_match"
    }
   ]
  },
  "predict_option.rs": {
   "src": "fn main() {\n    let small: u8 = 100;\n    let a = small.checked_add(100);\n    let b = small.checked_add(200);\n    if let Some(n) = a {\n        println!(\"a holds {}\", n);\n    }\n    if let Some(n) = b {\n        println!(\"b holds {}\", n);\n    } else {\n        println!(\"b is empty\");\n    }\n    println!(\"{}\", matches!(b, None));\n}\n",
   "stdout": "a holds 200\nb is empty\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "a holds 200\nb is empty\ntrue\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/predict_option"
    }
   ]
  },
  "push_no_mut.rs": {
   "src": "fn main() {\n    let cart = vec![10, 20];\n    cart.push(30);\n    println!(\"{:?}\", cart);\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `cart` as mutable, as it is not declared as mutable\n --> src/main.rs:3:5\n  |\n3 |     cart.push(30);\n  |     ^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n2 |     let mut cart = vec![10, 20];\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `push_no_mut` (bin \"push_no_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `cart` as mutable, as it is not declared as mutable\n --> src/main.rs:3:5\n  |\n3 |     cart.push(30);\n  |     ^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n2 |     let mut cart = vec![10, 20];\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `push_no_mut` (bin \"push_no_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/push_no_mut"
    }
   ]
  },
  "road_missing.rs": {
   "src": "enum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn run(action: Action) {\n    match action {\n        Action::Stop => println!(\"stopping\"),\n        Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n    }\n}\n\nfn main() {\n    run(Action::Write { text: String::from(\"Quiet please\") });\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `Action::Write { .. }` not covered\n  --> src/main.rs:8:11\n   |\n 8 |     match action {\n   |           ^^^^^^ pattern `Action::Write { .. }` not covered\n   |\nnote: `Action` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Action {\n   |      ^^^^^^\n...\n 4 |     Write { text: String },\n   |     ----- not covered\n   = note: the matched value is of type `Action`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n10 ~         Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n11 ~         Action::Write { .. } => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `Action::Write { .. }` not covered\n  --> src/main.rs:8:11\n   |\n 8 |     match action {\n   |           ^^^^^^ pattern `Action::Write { .. }` not covered\n   |\nnote: `Action` defined here\n  --> src/main.rs:1:6\n   |\n 1 | enum Action {\n   |      ^^^^^^\n...\n 4 |     Write { text: String },\n   |     ----- not covered\n   = note: the matched value is of type `Action`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n   |\n10 ~         Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n11 ~         Action::Write { .. } => todo!(),\n   |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/road_missing"
    }
   ]
  },
  "road_move.rs": {
   "src": "#[allow(dead_code)]\nenum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn run(action: Action) {\n    match action {\n        Action::Stop => println!(\"stopping\"),\n        Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n        Action::Write { text } => println!(\"writing: {}\", text),\n    }\n}\n\nfn main() {\n    let action = Action::Move(3, -1);\n    run(action);\n}\n",
   "stdout": "moving 3 across, -1 up\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "moving 3 across, -1 up\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/road_move"
    }
   ]
  },
  "road_stop.rs": {
   "src": "#[allow(dead_code)]\nenum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn run(action: Action) {\n    match action {\n        Action::Stop => println!(\"stopping\"),\n        Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n        Action::Write { text } => println!(\"writing: {}\", text),\n    }\n}\n\nfn main() {\n    let action = Action::Stop;\n    run(action);\n}\n",
   "stdout": "stopping\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stopping\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/road_stop"
    }
   ]
  },
  "road_write.rs": {
   "src": "#[allow(dead_code)]\nenum Action {\n    Stop,\n    Move(i32, i32),\n    Write { text: String },\n}\n\nfn run(action: Action) {\n    match action {\n        Action::Stop => println!(\"stopping\"),\n        Action::Move(x, y) => println!(\"moving {} across, {} up\", x, y),\n        Action::Write { text } => println!(\"writing: {}\", text),\n    }\n}\n\nfn main() {\n    let action = Action::Write { text: String::from(\"Quiet please\") };\n    run(action);\n}\n",
   "stdout": "writing: Quiet please\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "writing: Quiet please\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/road_write"
    }
   ]
  },
  "sizes.rs": {
   "src": "use std::mem::size_of;\n\nenum Shelf {\n    Fiction,\n    Science,\n    History,\n}\n\nfn main() {\n    let _ = [Shelf::Fiction, Shelf::Science, Shelf::History];\n    println!(\"Shelf: {} byte\", size_of::<Shelf>());\n    println!(\"u32: {} bytes\", size_of::<u32>());\n    println!(\"Option<u32>: {} bytes\", size_of::<Option<u32>>());\n    println!(\"&u32: {} bytes\", size_of::<&u32>());\n    println!(\"Option<&u32>: {} bytes\", size_of::<Option<&u32>>());\n    println!(\"Vec<i32>: {} bytes\", size_of::<Vec<i32>>());\n}\n",
   "stdout": "Shelf: 1 byte\nu32: 4 bytes\nOption<u32>: 8 bytes\n&u32: 8 bytes\nOption<&u32>: 8 bytes\nVec<i32>: 24 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Shelf: 1 byte\nu32: 4 bytes\nOption<u32>: 8 bytes\n&u32: 8 bytes\nOption<&u32>: 8 bytes\nVec<i32>: 24 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/sizes"
    }
   ]
  },
  "sort_dedup.rs": {
   "src": "fn main() {\n    let mut returns = vec![42, 7, 42, 19, 7, 7];\n    returns.sort();\n    println!(\"sorted:  {:?}\", returns);\n    returns.dedup();\n    println!(\"deduped: {:?}\", returns);\n}\n",
   "stdout": "sorted:  [7, 7, 7, 19, 42, 42]\ndeduped: [7, 19, 42]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "sorted:  [7, 7, 7, 19, 42, 42]\ndeduped: [7, 19, 42]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/sort_dedup"
    }
   ]
  },
  "spot_push.rs": {
   "src": "fn main() {\n    let mut shelf = vec![String::from(\"Emma\"), String::from(\"Dune\")];\n    let top = &shelf[1];\n    println!(\"top: {}\", top);\n    shelf.push(String::from(\"Heidi\"));\n    println!(\"now {} books\", shelf.len());\n    println!(\"top was {}\", top);\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `shelf` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:5\n  |\n3 |     let top = &shelf[1];\n  |                ----- immutable borrow occurs here\n4 |     println!(\"top: {}\", top);\n5 |     shelf.push(String::from(\"Heidi\"));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n6 |     println!(\"now {} books\", shelf.len());\n7 |     println!(\"top was {}\", top);\n  |                            --- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `spot_push` (bin \"spot_push\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `shelf` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:5\n  |\n3 |     let top = &shelf[1];\n  |                ----- immutable borrow occurs here\n4 |     println!(\"top: {}\", top);\n5 |     shelf.push(String::from(\"Heidi\"));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n6 |     println!(\"now {} books\", shelf.len());\n7 |     println!(\"top was {}\", top);\n  |                            --- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `spot_push` (bin \"spot_push\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/spot_push"
    }
   ]
  },
  "spot_unwrap.rs": {
   "src": "fn find(shelf: [&str; 3], title: &str) -> Option<usize> {\n    for i in 0..3 {\n        if shelf[i] == title {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let shelf = [\"Emma\", \"Dune\", \"Heidi\"];\n    println!(\"Dune is in slot {}\", find(shelf, \"Dune\").unwrap());\n    println!(\"Moby is in slot {}\", find(shelf, \"Moby\").unwrap());\n}\n",
   "stdout": "Dune is in slot 1\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:13:56:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune is in slot 1\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:13:56:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch11/spot_unwrap",
     "merged": "Dune is in slot 1\n\nthread 'main' (1) panicked at src/main.rs:13:56:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "spot_wildcard.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn cents(coin: Coin) -> u32 {\n    match coin {\n        _ => 1,\n        Coin::Nickel => 5,\n        Coin::Dime => 10,\n        Coin::Quarter => 25,\n    }\n}\n\nfn main() {\n    println!(\"{}\", cents(Coin::Penny));\n    println!(\"{}\", cents(Coin::Nickel));\n    println!(\"{}\", cents(Coin::Dime));\n    println!(\"{}\", cents(Coin::Quarter));\n}\n",
   "stdout": "1\n1\n1\n1\n",
   "stderr": "warning: unreachable pattern\n  --> src/main.rs:11:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n   |         ^^^^^^^^^^^^ no value can reach this\n   |\n   = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\nwarning: unreachable pattern\n  --> src/main.rs:12:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n12 |         Coin::Dime => 10,\n   |         ^^^^^^^^^^ no value can reach this\n\nwarning: unreachable pattern\n  --> src/main.rs:13:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n...\n13 |         Coin::Quarter => 25,\n   |         ^^^^^^^^^^^^^ no value can reach this\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1\n1\n1\n1\n",
     "err": "warning: unreachable pattern\n  --> src/main.rs:11:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n   |         ^^^^^^^^^^^^ no value can reach this\n   |\n   = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\nwarning: unreachable pattern\n  --> src/main.rs:12:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n12 |         Coin::Dime => 10,\n   |         ^^^^^^^^^^ no value can reach this\n\nwarning: unreachable pattern\n  --> src/main.rs:13:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n...\n13 |         Coin::Quarter => 25,\n   |         ^^^^^^^^^^^^^ no value can reach this\n\n",
     "exit": 0,
     "dir": "~/rust-ch11/spot_wildcard",
     "merged": "warning: unreachable pattern\n  --> src/main.rs:11:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n   |         ^^^^^^^^^^^^ no value can reach this\n   |\n   = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\nwarning: unreachable pattern\n  --> src/main.rs:12:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n11 |         Coin::Nickel => 5,\n12 |         Coin::Dime => 10,\n   |         ^^^^^^^^^^ no value can reach this\n\nwarning: unreachable pattern\n  --> src/main.rs:13:9\n   |\n10 |         _ => 1,\n   |         - matches any value\n...\n13 |         Coin::Quarter => 25,\n   |         ^^^^^^^^^^^^^ no value can reach this\n\n1\n1\n1\n1\n"
    }
   ]
  },
  "string_label.rs": {
   "src": "fn floor(shelf: &str) -> u8 {\n    if shelf == \"fiction\" {\n        1\n    } else if shelf == \"science\" {\n        2\n    } else {\n        3\n    }\n}\n\nfn main() {\n    println!(\"fiction: floor {}\", floor(\"fiction\"));\n    println!(\"Fiction: floor {}\", floor(\"Fiction\"));\n}\n",
   "stdout": "fiction: floor 1\nFiction: floor 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "fiction: floor 1\nFiction: floor 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/string_label"
    }
   ]
  },
  "trace_match.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn main() {\n    let jar = [Coin::Dime, Coin::Penny, Coin::Quarter, Coin::Nickel, Coin::Dime];\n    let mut total = 0;\n    for coin in jar {\n        let c = match coin {\n            Coin::Penny => 1,\n            Coin::Nickel => 5,\n            Coin::Dime => 10,\n            Coin::Quarter => 25,\n        };\n        total += c;\n        println!(\"{} {}\", c, total);\n    }\n}\n",
   "stdout": "10 10\n1 11\n25 36\n5 41\n10 51\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "10 10\n1 11\n25 36\n5 41\n10 51\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/trace_match"
    }
   ]
  },
  "trace_mixed.rs": {
   "src": "enum Item {\n    Book(u32),\n    Dvd(u32),\n    Umbrella,\n}\n\nfn main() {\n    let returns = vec![Item::Dvd(2), Item::Book(5), Item::Umbrella, Item::Book(1)];\n    let mut fee = 0;\n    for item in &returns {\n        let add = match item {\n            Item::Book(days) => *days * 10,\n            Item::Dvd(days) => *days * 50,\n            Item::Umbrella => 0,\n        };\n        fee += add;\n        println!(\"{} {}\", add, fee);\n    }\n}\n",
   "stdout": "100 100\n50 150\n0 150\n10 160\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "100 100\n50 150\n0 150\n10 160\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/trace_mixed"
    }
   ]
  },
  "trace_stack.rs": {
   "src": "fn main() {\n    let mut stack = vec![5];\n    stack.push(8);\n    println!(\"push {:?} {}\", stack.last(), stack.len());\n    stack.push(3);\n    println!(\"push {:?} {}\", stack.last(), stack.len());\n    stack.pop();\n    println!(\"pop {:?} {}\", stack.last(), stack.len());\n    stack.pop();\n    println!(\"pop {:?} {}\", stack.last(), stack.len());\n    stack.pop();\n    println!(\"pop {:?} {}\", stack.last(), stack.len());\n}\n",
   "stdout": "push Some(8) 2\npush Some(3) 3\npop Some(8) 2\npop Some(5) 1\npop None 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "push Some(8) 2\npush Some(3) 3\npop Some(8) 2\npop Some(5) 1\npop None 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/trace_stack"
    }
   ]
  },
  "typo_variant.rs": {
   "src": "#[derive(Debug)]\nenum Shelf {\n    Fiction,\n    Science,\n    History,\n}\n\nfn main() {\n    let a = Shelf::Fictoin;\n    println!(\"{:?}\", a);\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no variant, associated function, or constant named `Fictoin` found for enum `Shelf` in the current scope\n --> src/main.rs:9:20\n  |\n2 | enum Shelf {\n  | ---------- variant, associated function, or constant `Fictoin` not found for this enum\n...\n9 |     let a = Shelf::Fictoin;\n  |                    ^^^^^^^ variant, associated function, or constant not found in `Shelf`\n  |\nhelp: there is a variant with a similar name\n  |\n9 -     let a = Shelf::Fictoin;\n9 +     let a = Shelf::Fiction;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `typo_variant` (bin \"typo_variant\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no variant, associated function, or constant named `Fictoin` found for enum `Shelf` in the current scope\n --> src/main.rs:9:20\n  |\n2 | enum Shelf {\n  | ---------- variant, associated function, or constant `Fictoin` not found for this enum\n...\n9 |     let a = Shelf::Fictoin;\n  |                    ^^^^^^^ variant, associated function, or constant not found in `Shelf`\n  |\nhelp: there is a variant with a similar name\n  |\n9 -     let a = Shelf::Fictoin;\n9 +     let a = Shelf::Fiction;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `typo_variant` (bin \"typo_variant\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/typo_variant"
    }
   ]
  },
  "unwrap_panic.rs": {
   "src": "fn first_free(seats: [bool; 5]) -> Option<usize> {\n    for i in 0..5 {\n        if !seats[i] {\n            return Some(i);\n        }\n    }\n    None\n}\n\nfn main() {\n    let morning = [true, true, false, true, false];\n    let full = [true, true, true, true, true];\n    println!(\"seat {}\", first_free(morning).unwrap());\n    println!(\"seat {}\", first_free(full).unwrap());\n}\n",
   "stdout": "seat 2\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:14:42:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "seat 2\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:14:42:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch11/unwrap_panic",
     "merged": "seat 2\n\nthread 'main' (1) panicked at src/main.rs:14:42:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "vec_basics.rs": {
   "src": "fn main() {\n    let mut cart: Vec<i32> = Vec::new();\n    cart.push(10);\n    cart.push(20);\n    cart.push(30);\n    println!(\"{:?} has {} books\", cart, cart.len());\n    let more = vec![4, 8, 15];\n    println!(\"{:?}\", more);\n    println!(\"empty? {}\", cart.is_empty());\n    println!(\"has 20? {}\", cart.contains(&20));\n}\n",
   "stdout": "[10, 20, 30] has 3 books\n[4, 8, 15]\nempty? false\nhas 20? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[10, 20, 30] has 3 books\n[4, 8, 15]\nempty? false\nhas 20? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/vec_basics"
    }
   ]
  },
  "vec_new_err.rs": {
   "src": "fn main() {\n    let cart = Vec::new();\n    println!(\"{} books\", cart.len());\n}\n",
   "stdout": "",
   "stderr": "error[E0282]: type annotations needed for `Vec<_>`\n --> src/main.rs:2:9\n  |\n2 |     let cart = Vec::new();\n  |         ^^^^   ---------- type must be known at this point\n  |\nhelp: consider giving `cart` an explicit type, where the type for type parameter `T` is specified\n  |\n2 |     let cart: Vec<T> = Vec::new();\n  |             ++++++++\n\nFor more information about this error, try `rustc --explain E0282`.\nerror: could not compile `vec_new_err` (bin \"vec_new_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0282]: type annotations needed for `Vec<_>`\n --> src/main.rs:2:9\n  |\n2 |     let cart = Vec::new();\n  |         ^^^^   ---------- type must be known at this point\n  |\nhelp: consider giving `cart` an explicit type, where the type for type parameter `T` is specified\n  |\n2 |     let cart: Vec<T> = Vec::new();\n  |             ++++++++\n\nFor more information about this error, try `rustc --explain E0282`.\nerror: could not compile `vec_new_err` (bin \"vec_new_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch11/vec_new_err"
    }
   ]
  },
  "wildcard.rs": {
   "src": "enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn describe(coin: Coin) {\n    match coin {\n        Coin::Quarter => println!(\"a quarter: into the jar\"),\n        _ => println!(\"small change: into the dish\"),\n    }\n}\n\nfn main() {\n    describe(Coin::Penny);\n    describe(Coin::Quarter);\n    describe(Coin::Nickel);\n    describe(Coin::Dime);\n}\n",
   "stdout": "small change: into the dish\na quarter: into the jar\nsmall change: into the dish\nsmall change: into the dish\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "small change: into the dish\na quarter: into the jar\nsmall change: into the dish\nsmall change: into the dish\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/wildcard"
    }
   ]
  },
  "with_capacity.rs": {
   "src": "fn main() {\n    let mut v: Vec<i32> = Vec::with_capacity(100);\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n    for n in 0..100 {\n        v.push(n);\n    }\n    println!(\"len {} cap {}\", v.len(), v.capacity());\n}\n",
   "stdout": "len 0 cap 100\nlen 100 cap 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "len 0 cap 100\nlen 100 cap 100\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch11/with_capacity"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
