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
  "workdir": "/home/you/rust-ch27",
  "versionDifferences": [
   "multi_rounds.rs",
   "no_bang.rs",
   "println_nobang.rs",
   "spot_bang.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): multi_rounds.rs, no_bang.rs, println_nobang.rs, spot_bang.rs."
 },
 "programs": {
  "assert_fail.rs": {
   "src": "fn main() {\n    let shelves = vec![3, 5, 8];\n    let total: i32 = shelves.iter().sum();\n    assert_eq!(total, 15, \"books on all shelves\");\n    println!(\"the count is right\");\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:4:5:\nassertion `left == right` failed: books on all shelves\n  left: 16\n right: 15\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:4:5:\nassertion `left == right` failed: books on all shelves\n  left: 16\n right: 15\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch27/assert_fail"
    }
   ]
  },
  "async_channel.rs": {
   "src": "use tokio::sync::mpsc;\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let (tx, mut rx) = mpsc::channel(8);\n    for table in [1, 2] {\n        let tx = tx.clone();\n        tokio::spawn(async move {\n            for dish in [\"soup\", \"pie\"] {\n                tx.send(format!(\"table {table}: {dish}\")).await.unwrap();\n            }\n        });\n    }\n    drop(tx);\n    while let Some(order) = rx.recv().await {\n        println!(\"kitchen got {order}\");\n    }\n    println!(\"rail empty: every sender is gone\");\n}\n",
   "stdout": "kitchen got table 1: soup\nkitchen got table 1: pie\nkitchen got table 2: soup\nkitchen got table 2: pie\nrail empty: every sender is gone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "kitchen got table 1: soup\nkitchen got table 1: pie\nkitchen got table 2: soup\nkitchen got table 2: pie\nrail empty: every sender is gone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/async_channel"
    }
   ]
  },
  "async_closure.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\n#[tokio::main]\nasync fn main() {\n    let greet = async |name: &str| {\n        sleep(Duration::from_millis(10)).await;\n        format!(\"welcome, {name}\")\n    };\n    println!(\"{}\", greet(\"Ada\").await);\n    println!(\"{}\", greet(\"Ben\").await);\n}\n",
   "stdout": "welcome, Ada\nwelcome, Ben\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "welcome, Ada\nwelcome, Ben\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/async_closure"
    }
   ]
  },
  "await_outside.rs": {
   "src": "async fn make_tea() -> String {\n    String::from(\"tea\")\n}\n\nfn main() {\n    let cup = make_tea().await;\n    println!(\"{cup}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0728]: `await` is only allowed inside `async` functions and blocks\n --> src/main.rs:6:26\n  |\n5 | fn main() {\n  | --------- this is not `async`\n6 |     let cup = make_tea().await;\n  |                          ^^^^^ only allowed inside `async` functions and blocks\n\nFor more information about this error, try `rustc --explain E0728`.\nerror: could not compile `await_outside` (bin \"await_outside\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0728]: `await` is only allowed inside `async` functions and blocks\n --> src/main.rs:6:26\n  |\n5 | fn main() {\n  | --------- this is not `async`\n6 |     let cup = make_tea().await;\n  |                          ^^^^^ only allowed inside `async` functions and blocks\n\nFor more information about this error, try `rustc --explain E0728`.\nerror: could not compile `await_outside` (bin \"await_outside\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/await_outside"
    }
   ]
  },
  "blocking.rs": {
   "src": "use std::time::Duration;\n\nasync fn cook(dish: &str, ms: u64) -> String {\n    println!(\"{dish}: order in\");\n    std::thread::sleep(Duration::from_millis(ms));\n    println!(\"{dish}: ready\");\n    format!(\"{dish} served\")\n}\n\n#[tokio::main]\nasync fn main() {\n    let (a, b, c) = tokio::join!(\n        cook(\"soup\", 300),\n        cook(\"toast\", 100),\n        cook(\"tea\", 200),\n    );\n    println!(\"{a}, {b}, {c}\");\n}\n",
   "stdout": "soup: order in\nsoup: ready\ntoast: order in\ntoast: ready\ntea: order in\ntea: ready\nsoup served, toast served, tea served\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "soup: order in\nsoup: ready\ntoast: order in\ntoast: ready\ntea: order in\ntea: ready\nsoup served, toast served, tea served\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/blocking"
    }
   ]
  },
  "boss_error.rs": {
   "src": "use std::collections::HashMap;\n\nmacro_rules! hashmap {\n    ($($key:expr => $value:expr),*) => {{\n        let mut map = HashMap::new();\n        $( map.insert($key, $value); )*\n        map\n    }};\n}\n\nfn main() {\n    let loans = hashmap! { \"Ada\": 2, \"Ben\": 1 };\n    println!(\"{}\", loans.len());\n}\n",
   "stdout": "",
   "stderr": "error: no rules expected `:`\n  --> src/main.rs:12:33\n   |\n 3 | macro_rules! hashmap {\n   | -------------------- when calling this macro\n...\n12 |     let loans = hashmap! { \"Ada\": 2, \"Ben\": 1 };\n   |                                 ^ no rules expected this token in macro call\n   |\nnote: while trying to match `=>`\n  --> src/main.rs:4:18\n   |\n 4 |     ($($key:expr => $value:expr),*) => {{\n   |                  ^^\n\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: no rules expected `:`\n  --> src/main.rs:12:33\n   |\n 3 | macro_rules! hashmap {\n   | -------------------- when calling this macro\n...\n12 |     let loans = hashmap! { \"Ada\": 2, \"Ben\": 1 };\n   |                                 ^ no rules expected this token in macro call\n   |\nnote: while trying to match `=>`\n  --> src/main.rs:4:18\n   |\n 4 |     ($($key:expr => $value:expr),*) => {{\n   |                  ^^\n\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/boss_error"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "macro_rules! make_greeter {\n    ($name:ident, $words:expr) => {\n        fn $name(who: &str) -> String {\n            format!(\"{}, {}!\", $words, who)\n        }\n    };\n}\n\nmake_greeter!(morning, \"Good morning\");\nmake_greeter!(goodnight, \"Sleep well\");\n\nfn main() {\n    println!(\"{}\", morning(\"Ada\"));\n    println!(\"{}\", goodnight(\"Ben\"));\n}\n",
   "stdout": "Good morning, Ada!\nSleep well, Ben!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Good morning, Ada!\nSleep well, Ben!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let (tx, mut rx) = tokio::sync::mpsc::channel(4);\n    tokio::spawn(async move {\n        for cups in [2, 3] {\n            tx.send(cups).await.unwrap();\n        }\n    });\n    let mut total = 0;\n    while let Some(cups) = rx.recv().await {\n        total += cups;\n    }\n    println!(\"{total} cups of tea poured\");\n}\n",
   "stdout": "5 cups of tea poured\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5 cups of tea poured\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn step(name: &str, ms: u64) -> &str {\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"{name} done\");\n    name\n}\n\n#[tokio::main]\nasync fn main() {\n    let (a, b) = tokio::join!(step(\"kettle\", 200), step(\"toast\", 100));\n    println!(\"{a} + {b}\");\n    tokio::select! {\n        biased;\n        w = step(\"eggs\", 300) => println!(\"{w} won\"),\n        w = step(\"jam\", 60) => println!(\"{w} won\"),\n    }\n    println!(\"end\");\n}\n",
   "stdout": "toast done\nkettle done\nkettle + toast\njam done\njam won\nend\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "toast done\nkettle done\nkettle + toast\njam done\njam won\nend\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "async fn stamp(book: &str) {\n    println!(\"stamped {book}\");\n}\n\n#[tokio::main]\nasync fn main() {\n    for book in [\"Owls\", \"Herons\", \"Wrens\"] {\n        stamp(book);\n    }\n    println!(\"all books stamped?\");\n}\n",
   "stdout": "all books stamped?\n",
   "stderr": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:9\n  |\n8 |         stamp(book);\n  |         ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "all books stamped?\n",
     "err": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:9\n  |\n8 |         stamp(book);\n  |         ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch27/boss_spot",
     "merged": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:9\n  |\n8 |         stamp(book);\n  |         ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\nall books stamped?\n"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "use tokio::sync::mpsc;\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let (tx, mut rx) = mpsc::channel(10);\n    for (table, dishes) in [(1, 2), (2, 1), (3, 2)] {\n        let tx = tx.clone();\n        tokio::spawn(async move {\n            for d in 1..=dishes {\n                tx.send((table, d)).await.unwrap();\n            }\n        });\n    }\n    drop(tx);\n    let mut count = 0;\n    while let Some((table, d)) = rx.recv().await {\n        count += 1;\n        println!(\"{table} {d} {count}\");\n    }\n}\n",
   "stdout": "1 1 1\n1 2 2\n2 1 3\n3 1 4\n3 2 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1 1\n1 2 2\n2 1 3\n3 1 4\n3 2 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/boss_trace"
    }
   ]
  },
  "dbg_demo.rs": {
   "src": "fn main() {\n    let pages = 96;\n    let total = dbg!(pages * 3) + 12;\n    println!(\"total = {total}\");\n}\n",
   "stdout": "total = 300\n",
   "stderr": "[src/main.rs:3:17] pages * 3 = 288\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "total = 300\n",
     "err": "[src/main.rs:3:17] pages * 3 = 288\n",
     "exit": 0,
     "dir": "~/rust-ch27/dbg_demo",
     "merged": "[src/main.rs:3:17] pages * 3 = 288\ntotal = 300\n"
    }
   ]
  },
  "e0752.rs": {
   "src": "async fn make_tea() -> String {\n    String::from(\"tea\")\n}\n\nasync fn main() {\n    let cup = make_tea().await;\n    println!(\"{cup}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0752]: `main` function is not allowed to be `async`\n --> src/main.rs:5:1\n  |\n5 | async fn main() {\n  | ^^^^^^^^^^^^^^^ `main` function is not allowed to be `async`\n\nFor more information about this error, try `rustc --explain E0752`.\nerror: could not compile `e0752` (bin \"e0752\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0752]: `main` function is not allowed to be `async`\n --> src/main.rs:5:1\n  |\n5 | async fn main() {\n  | ^^^^^^^^^^^^^^^ `main` function is not allowed to be `async`\n\nFor more information about this error, try `rustc --explain E0752`.\nerror: could not compile `e0752` (bin \"e0752\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/e0752"
    }
   ]
  },
  "ex_err_await.rs": {
   "src": "async fn fetch_menu() -> Vec<&'static str> {\n    vec![\"soup\", \"toast\", \"pie\"]\n}\n\nfn count_dishes() -> usize {\n    let menu = fetch_menu().await;\n    menu.len()\n}\n\n#[tokio::main]\nasync fn main() {\n    println!(\"{} dishes\", count_dishes());\n}\n",
   "stdout": "",
   "stderr": "error[E0728]: `await` is only allowed inside `async` functions and blocks\n --> src/main.rs:6:29\n  |\n5 | fn count_dishes() -> usize {\n  | -------------------------- this is not `async`\n6 |     let menu = fetch_menu().await;\n  |                             ^^^^^ only allowed inside `async` functions and blocks\n\nFor more information about this error, try `rustc --explain E0728`.\nerror: could not compile `ex_err_await` (bin \"ex_err_await\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0728]: `await` is only allowed inside `async` functions and blocks\n --> src/main.rs:6:29\n  |\n5 | fn count_dishes() -> usize {\n  | -------------------------- this is not `async`\n6 |     let menu = fetch_menu().await;\n  |                             ^^^^^ only allowed inside `async` functions and blocks\n\nFor more information about this error, try `rustc --explain E0728`.\nerror: could not compile `ex_err_await` (bin \"ex_err_await\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/ex_err_await"
    }
   ]
  },
  "ex_macro_late.rs": {
   "src": "fn report(books: u32) {\n    stars!(books);\n}\n\nmacro_rules! stars {\n    ($n:expr) => {\n        println!(\"{}\", \"*\".repeat($n as usize))\n    };\n}\n\nfn main() {\n    report(5);\n}\n",
   "stdout": "",
   "stderr": "error: cannot find macro `stars` in this scope\n --> src/main.rs:2:5\n  |\n2 |     stars!(books);\n  |     ^^^^^ consider moving the definition of `stars` before this call\n  |\nnote: a macro with the same name exists, but it appears later\n --> src/main.rs:5:14\n  |\n5 | macro_rules! stars {\n  |              ^^^^^\n\nwarning: unused macro definition: `stars`\n --> src/main.rs:5:14\n  |\n5 | macro_rules! stars {\n  |              ^^^^^\n  |\n  = note: `#[warn(unused_macros)]` (part of `#[warn(unused)]`) on by default\n\nerror: could not compile `ex_macro_late` (bin \"ex_macro_late\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: cannot find macro `stars` in this scope\n --> src/main.rs:2:5\n  |\n2 |     stars!(books);\n  |     ^^^^^ consider moving the definition of `stars` before this call\n  |\nnote: a macro with the same name exists, but it appears later\n --> src/main.rs:5:14\n  |\n5 | macro_rules! stars {\n  |              ^^^^^\n\nwarning: unused macro definition: `stars`\n --> src/main.rs:5:14\n  |\n5 | macro_rules! stars {\n  |              ^^^^^\n  |\n  = note: `#[warn(unused_macros)]` (part of `#[warn(unused)]`) on by default\n\nerror: could not compile `ex_macro_late` (bin \"ex_macro_late\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch27/ex_macro_late"
    }
   ]
  },
  "fill_blocking.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nfn shrink_photos(count: u32) -> u32 {\n    std::thread::sleep(Duration::from_millis(250));\n    count\n}\n\n#[tokio::main]\nasync fn main() {\n    let job = tokio::task::spawn_blocking(|| shrink_photos(40));\n    sleep(Duration::from_millis(50)).await;\n    println!(\"tables still being served\");\n    let done = job.await.unwrap();\n    println!(\"{done} photos shrunk\");\n}\n",
   "stdout": "tables still being served\n40 photos shrunk\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "tables still being served\n40 photos shrunk\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/fill_blocking"
    }
   ]
  },
  "fill_main.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn toast(slices: u32) -> u32 {\n    sleep(Duration::from_millis(20)).await;\n    slices * 2\n}\n\n#[tokio::main]\nasync fn main() {\n    let halves = toast(3).await;\n    println!(\"{halves} toast halves\");\n}\n",
   "stdout": "6 toast halves\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "6 toast halves\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/fill_main"
    }
   ]
  },
  "fill_repeat.rs": {
   "src": "macro_rules! shelf_list {\n    ($($title:expr),*) => {{\n        let mut list = Vec::new();\n        $( list.push($title); )*\n        list\n    }};\n}\n\nfn main() {\n    let poems = shelf_list![\"Owl\", \"Heron\", \"Wren\"];\n    println!(\"{} poems: {:?}\", poems.len(), poems);\n}\n",
   "stdout": "3 poems: [\"Owl\", \"Heron\", \"Wren\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 poems: [\"Owl\", \"Heron\", \"Wren\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/fill_repeat"
    }
   ]
  },
  "fill_vec.rs": {
   "src": "fn main() {\n    let by_macro = vec![10, 20, 30];\n    let by_hand = {\n        let mut temp = Vec::new();\n        temp.push(10);\n        temp.push(20);\n        temp.push(30);\n        temp\n    };\n    println!(\"{}\", by_macro == by_hand);\n    println!(\"{by_hand:?}\");\n}\n",
   "stdout": "true\n[10, 20, 30]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "true\n[10, 20, 30]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/fill_vec"
    }
   ]
  },
  "first_async.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn make_tea(table: u32) -> String {\n    println!(\"table {table}: kettle on\");\n    sleep(Duration::from_millis(30)).await;\n    format!(\"tea for table {table}\")\n}\n\n#[tokio::main]\nasync fn main() {\n    let cup = make_tea(4).await;\n    println!(\"{cup}\");\n}\n",
   "stdout": "table 4: kettle on\ntea for table 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "table 4: kettle on\ntea for table 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/first_async"
    }
   ]
  },
  "first_macro.rs": {
   "src": "macro_rules! shout {\n    ($text:expr) => {\n        println!(\"{}!\", $text.to_uppercase())\n    };\n}\n\nfn main() {\n    shout!(\"quiet please\");\n    let room = \"reading room\";\n    shout!(room);\n    shout!(format!(\"the {room} is open\"));\n}\n",
   "stdout": "QUIET PLEASE!\nREADING ROOM!\nTHE READING ROOM IS OPEN!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "QUIET PLEASE!\nREADING ROOM!\nTHE READING ROOM IS OPEN!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/first_macro"
    }
   ]
  },
  "ident_macro.rs": {
   "src": "macro_rules! make_counter {\n    ($name:ident, $start:expr) => {\n        fn $name() -> u32 {\n            $start\n        }\n    };\n}\n\nmake_counter!(books_on_loan, 42);\nmake_counter!(late_returns, 3);\n\nfn main() {\n    println!(\"on loan: {}\", books_on_loan());\n    println!(\"late: {}\", late_returns());\n}\n",
   "stdout": "on loan: 42\nlate: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "on loan: 42\nlate: 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/ident_macro"
    }
   ]
  },
  "include_demo.rs": {
   "src": "const NOTES: &str = include_str!(\"../notes.txt\");\n\nfn main() {\n    println!(\"{} lines baked into the program:\", NOTES.lines().count());\n    for line in NOTES.lines() {\n        println!(\"  {line}\");\n    }\n}\n",
   "stdout": "3 lines baked into the program:\n  Opening hours: 9 to 5\n  Quiet in the reading room\n  Return books on time\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 lines baked into the program:\n  Opening hours: 9 to 5\n  Quiet in the reading room\n  Return books on time\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/include_demo"
    }
   ]
  },
  "join_orders.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn cook(dish: &str, ms: u64) -> String {\n    println!(\"{dish}: order in\");\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"{dish}: ready\");\n    format!(\"{dish} served\")\n}\n\n#[tokio::main]\nasync fn main() {\n    let (a, b, c) = tokio::join!(\n        cook(\"soup\", 300),\n        cook(\"toast\", 100),\n        cook(\"tea\", 200),\n    );\n    println!(\"{a}, {b}, {c}\");\n}\n",
   "stdout": "soup: order in\ntoast: order in\ntea: order in\ntoast: ready\ntea: ready\nsoup: ready\nsoup served, toast served, tea served\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "soup: order in\ntoast: order in\ntea: order in\ntoast: ready\ntea: ready\nsoup: ready\nsoup served, toast served, tea served\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/join_orders"
    }
   ]
  },
  "lazy_order.rs": {
   "src": "async fn ring_bell() {\n    println!(\"DING!\");\n}\n\n#[tokio::main]\nasync fn main() {\n    let bell = ring_bell();\n    println!(\"the order slip is written\");\n    bell.await;\n    println!(\"served\");\n}\n",
   "stdout": "the order slip is written\nDING!\nserved\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "the order slip is written\nDING!\nserved\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/lazy_order"
    }
   ]
  },
  "lazy_warn.rs": {
   "src": "async fn ring_bell() {\n    println!(\"DING!\");\n}\n\n#[tokio::main]\nasync fn main() {\n    println!(\"Mabel calls ring_bell()...\");\n    ring_bell();\n    println!(\"...and nothing rang.\");\n}\n",
   "stdout": "Mabel calls ring_bell()...\n...and nothing rang.\n",
   "stderr": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:5\n  |\n8 |     ring_bell();\n  |     ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Mabel calls ring_bell()...\n...and nothing rang.\n",
     "err": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:5\n  |\n8 |     ring_bell();\n  |     ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch27/lazy_warn",
     "merged": "warning: unused implementer of `Future` that must be used\n --> src/main.rs:8:5\n  |\n8 |     ring_bell();\n  |     ^^^^^^^^^^^\n  |\n  = note: futures do nothing unless you `.await` or poll them\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\n\nMabel calls ring_bell()...\n...and nothing rang.\n"
    }
   ]
  },
  "macro_late.rs": {
   "src": "fn main() {\n    greet!(\"Mabel\");\n}\n\nmacro_rules! greet {\n    ($name:expr) => {\n        println!(\"Hello, {}!\", $name)\n    };\n}\n",
   "stdout": "",
   "stderr": "error: cannot find macro `greet` in this scope\n --> src/main.rs:2:5\n  |\n2 |     greet!(\"Mabel\");\n  |     ^^^^^ consider moving the definition of `greet` before this call\n  |\nnote: a macro with the same name exists, but it appears later\n --> src/main.rs:5:14\n  |\n5 | macro_rules! greet {\n  |              ^^^^^\n\nwarning: unused macro definition: `greet`\n --> src/main.rs:5:14\n  |\n5 | macro_rules! greet {\n  |              ^^^^^\n  |\n  = note: `#[warn(unused_macros)]` (part of `#[warn(unused)]`) on by default\n\nerror: could not compile `macro_late` (bin \"macro_late\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: cannot find macro `greet` in this scope\n --> src/main.rs:2:5\n  |\n2 |     greet!(\"Mabel\");\n  |     ^^^^^ consider moving the definition of `greet` before this call\n  |\nnote: a macro with the same name exists, but it appears later\n --> src/main.rs:5:14\n  |\n5 | macro_rules! greet {\n  |              ^^^^^\n\nwarning: unused macro definition: `greet`\n --> src/main.rs:5:14\n  |\n5 | macro_rules! greet {\n  |              ^^^^^\n  |\n  = note: `#[warn(unused_macros)]` (part of `#[warn(unused)]`) on by default\n\nerror: could not compile `macro_late` (bin \"macro_late\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch27/macro_late"
    }
   ]
  },
  "macro_nomatch.rs": {
   "src": "macro_rules! sum {\n    () => { 0 };\n    ($($x:expr),+ $(,)?) => { 0 $(+ $x)+ };\n}\n\nfn main() {\n    println!(\"{}\", sum!(1; 2));\n}\n",
   "stdout": "",
   "stderr": "error: no rules expected `;`\n --> src/main.rs:7:26\n  |\n1 | macro_rules! sum {\n  | ---------------- when calling this macro\n...\n7 |     println!(\"{}\", sum!(1; 2));\n  |                          ^ no rules expected this token in macro call\n  |\n  = note: while trying to match sequence start\n\nerror: could not compile `macro_nomatch` (bin \"macro_nomatch\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: no rules expected `;`\n --> src/main.rs:7:26\n  |\n1 | macro_rules! sum {\n  | ---------------- when calling this macro\n...\n7 |     println!(\"{}\", sum!(1; 2));\n  |                          ^ no rules expected this token in macro call\n  |\n  = note: while trying to match sequence start\n\nerror: could not compile `macro_nomatch` (bin \"macro_nomatch\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/macro_nomatch"
    }
   ]
  },
  "manual_runtime.rs": {
   "src": "use tokio::runtime::Runtime;\n\nasync fn make_tea(table: u32) -> String {\n    format!(\"tea for table {table}\")\n}\n\nfn main() {\n    let waiter = Runtime::new().unwrap();\n    let cup = waiter.block_on(make_tea(4));\n    println!(\"{cup}\");\n}\n",
   "stdout": "tea for table 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "tea for table 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/manual_runtime"
    }
   ]
  },
  "multi_rounds.rs": {
   "src": "#[tokio::main(flavor = \"multi_thread\", worker_threads = 4)]\nasync fn main() {\n    for round in 1..=3 {\n        let mut handles = Vec::new();\n        for table in 1..=4 {\n            handles.push(tokio::spawn(async move {\n                println!(\"round {round}: table {table}\");\n            }));\n        }\n        for handle in handles {\n            handle.await.unwrap();\n        }\n    }\n}\n",
   "stdout": "round 1: table 1\nround 1: table 3\nround 1: table 4\nround 1: table 2\nround 2: table 1\nround 2: table 2\nround 2: table 3\nround 2: table 4\nround 3: table 1\nround 3: table 2\nround 3: table 3\nround 3: table 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "round 1: table 1\nround 1: table 3\nround 1: table 4\nround 1: table 2\nround 2: table 1\nround 2: table 2\nround 2: table 3\nround 2: table 4\nround 3: table 1\nround 3: table 2\nround 3: table 3\nround 3: table 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/multi_rounds"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "round 1: table 1\nround 1: table 2\nround 1: table 4\nround 1: table 3\nround 2: table 1\nround 2: table 2\nround 2: table 4\nround 2: table 3\nround 3: table 1\nround 3: table 2\nround 3: table 3\nround 3: table 4\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "round 1: table 1\nround 1: table 2\nround 1: table 4\nround 1: table 3\nround 2: table 1\nround 2: table 2\nround 2: table 4\nround 2: table 3\nround 3: table 1\nround 3: table 2\nround 3: table 3\nround 3: table 4\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch27/multi_rounds"
     }
    ]
   }
  },
  "no_bang.rs": {
   "src": "fn main() {\n    let shelves = vec[3, 5, 8];\n    println(\"{shelves:?}\");\n}\n",
   "stdout": "",
   "stderr": "error: expected one of `.`, `?`, `]`, or an operator, found `,`\n --> src/main.rs:2:24\n  |\n2 |     let shelves = vec[3, 5, 8];\n  |                        ^ expected one of `.`, `?`, `]`, or an operator\n  |\nhelp: you might have meant to call a macro\n  |\n2 |     let shelves = vec![3, 5, 8];\n  |                      +\n\nerror: could not compile `no_bang` (bin \"no_bang\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: expected one of `.`, `?`, `]`, or an operator, found `,`\n --> src/main.rs:2:24\n  |\n2 |     let shelves = vec[3, 5, 8];\n  |                        ^ expected one of `.`, `?`, `]`, or an operator\n  |\nhelp: you might have meant to call a macro\n  |\n2 |     let shelves = vec![3, 5, 8];\n  |                      +\n\nerror: could not compile `no_bang` (bin \"no_bang\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/no_bang"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error: expected one of `.`, `?`, `]`, or an operator, found `,`\n --> src/main.rs:2:24\n  |\n2 |     let shelves = vec[3, 5, 8];\n  |                        ^ expected one of `.`, `?`, `]`, or an operator\n\nerror: could not compile `no_bang` (bin \"no_bang\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error: expected one of `.`, `?`, `]`, or an operator, found `,`\n --> src/main.rs:2:24\n  |\n2 |     let shelves = vec[3, 5, 8];\n  |                        ^ expected one of `.`, `?`, `]`, or an operator\n\nerror: could not compile `no_bang` (bin \"no_bang\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch27/no_bang"
     }
    ]
   }
  },
  "one_by_one.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn cook(dish: &str, ms: u64) -> String {\n    println!(\"{dish}: order in\");\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"{dish}: ready\");\n    format!(\"{dish} served\")\n}\n\n#[tokio::main]\nasync fn main() {\n    let a = cook(\"soup\", 300).await;\n    let b = cook(\"toast\", 100).await;\n    let c = cook(\"tea\", 200).await;\n    println!(\"{a}, {b}, {c}\");\n}\n",
   "stdout": "soup: order in\nsoup: ready\ntoast: order in\ntoast: ready\ntea: order in\ntea: ready\nsoup served, toast served, tea served\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "soup: order in\nsoup: ready\ntoast: order in\ntoast: ready\ntea: order in\ntea: ready\nsoup served, toast served, tea served\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/one_by_one"
    }
   ]
  },
  "parsons_hashmap.rs": {
   "src": "use std::collections::HashMap;\n\nmacro_rules! hashmap {\n    ($($key:expr => $value:expr),*) => {{\n        let mut map = HashMap::new();\n        $( map.insert($key, $value); )*\n        map\n    }};\n}\n\nfn main() {\n    let fines = hashmap! { \"Ada\" => 0, \"Ben\" => 3 };\n    println!(\"Ben owes {}\", fines[\"Ben\"]);\n}\n",
   "stdout": "Ben owes 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ben owes 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/parsons_hashmap"
    }
   ]
  },
  "parsons_join.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn cook(dish: &str, ms: u64) -> String {\n    println!(\"{dish}: order in\");\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"{dish}: ready\");\n    format!(\"{dish} served\")\n}\n\n#[tokio::main]\nasync fn main() {\n    let (pie, tea) = tokio::join!(cook(\"pie\", 200), cook(\"tea\", 100));\n    println!(\"{pie}, {tea}\");\n}\n",
   "stdout": "pie: order in\ntea: order in\ntea: ready\npie: ready\npie served, tea served\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "pie: order in\ntea: order in\ntea: ready\npie: ready\npie served, tea served\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/parsons_join"
    }
   ]
  },
  "peek_derive.rs": {
   "src": "#[derive(Debug)]\nstruct Book {\n    title: String,\n    pages: u32,\n}\n\nfn main() {\n    let b = Book { title: String::from(\"Owls\"), pages: 96 };\n    println!(\"{b:?}\");\n    println!(\"{} has {} pages\", b.title, b.pages);\n}\n",
   "stdout": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nstruct Book {\n    title: String,\n    pages: u32,\n}\n#[automatically_derived]\nimpl ::core::fmt::Debug for Book {\n    #[inline]\n    fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {\n        ::core::fmt::Formatter::debug_struct_field2_finish(f, \"Book\", \"title\",\n            &self.title, \"pages\", &&self.pages)\n    }\n}\n\nfn main() {\n    let b = Book { title: String::from(\"Owls\"), pages: 96 };\n    { ::std::io::_print(format_args!(\"{0:?}\\n\", b)); };\n    {\n        ::std::io::_print(format_args!(\"{0} has {1} pages\\n\", b.title,\n                b.pages));\n    };\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Book { title: \"Owls\", pages: 96 }\nOwls has 96 pages\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_derive"
    },
    {
     "cmd": "RUSTC_BOOTSTRAP=1 cargo rustc -q -- -Zunpretty=expanded",
     "out": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nstruct Book {\n    title: String,\n    pages: u32,\n}\n#[automatically_derived]\nimpl ::core::fmt::Debug for Book {\n    #[inline]\n    fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {\n        ::core::fmt::Formatter::debug_struct_field2_finish(f, \"Book\", \"title\",\n            &self.title, \"pages\", &&self.pages)\n    }\n}\n\nfn main() {\n    let b = Book { title: String::from(\"Owls\"), pages: 96 };\n    { ::std::io::_print(format_args!(\"{0:?}\\n\", b)); };\n    {\n        ::std::io::_print(format_args!(\"{0} has {1} pages\\n\", b.title,\n                b.pages));\n    };\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_derive"
    }
   ]
  },
  "peek_hashmap.rs": {
   "src": "use std::collections::HashMap;\n\nmacro_rules! hashmap {\n    ($($key:expr => $value:expr),*) => {{\n        let mut map = HashMap::new();\n        $( map.insert($key, $value); )*\n        map\n    }};\n}\n\nfn main() {\n    let loans = hashmap! { \"Ada\" => 2, \"Ben\" => 1 };\n    println!(\"Ada has {} books\", loans[\"Ada\"]);\n}\n",
   "stdout": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nuse std::collections::HashMap;\n\nmacro_rules! hashmap {\n    ($($key:expr => $value:expr),*) =>\n    {{ let mut map = HashMap::new(); $(map.insert($key, $value);)* map }};\n}\n\nfn main() {\n    let loans =\n        {\n            let mut map = HashMap::new();\n            map.insert(\"Ada\", 2);\n            map.insert(\"Ben\", 1);\n            map\n        };\n    { ::std::io::_print(format_args!(\"Ada has {0} books\\n\", loans[\"Ada\"])); };\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ada has 2 books\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_hashmap"
    },
    {
     "cmd": "RUSTC_BOOTSTRAP=1 cargo rustc -q -- -Zunpretty=expanded",
     "out": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nuse std::collections::HashMap;\n\nmacro_rules! hashmap {\n    ($($key:expr => $value:expr),*) =>\n    {{ let mut map = HashMap::new(); $(map.insert($key, $value);)* map }};\n}\n\nfn main() {\n    let loans =\n        {\n            let mut map = HashMap::new();\n            map.insert(\"Ada\", 2);\n            map.insert(\"Ben\", 1);\n            map\n        };\n    { ::std::io::_print(format_args!(\"Ada has {0} books\\n\", loans[\"Ada\"])); };\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_hashmap"
    }
   ]
  },
  "peek_std.rs": {
   "src": "fn main() {\n    let shelves = vec![3, 5, 8];\n    assert!(shelves.len() == 3);\n    let five = matches!(shelves[1], 5);\n    println!(\"{shelves:?} {five}\");\n}\n",
   "stdout": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nfn main() {\n    let shelves =\n        ::alloc::boxed::box_assume_init_into_vec_unsafe(::alloc::intrinsics::write_box_via_move(::alloc::boxed::Box::new_uninit(),\n                [3, 5, 8]));\n    if !(shelves.len() == 3) {\n        ::core::panicking::panic(\"assertion failed: shelves.len() == 3\")\n    };\n    let five =\n        #[allow(non_exhaustive_omitted_patterns)] match shelves[1] {\n            5 => true,\n            _ => false,\n        };\n    { ::std::io::_print(format_args!(\"{0:?} {1}\\n\", shelves, five)); };\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[3, 5, 8] true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_std"
    },
    {
     "cmd": "RUSTC_BOOTSTRAP=1 cargo rustc -q -- -Zunpretty=expanded",
     "out": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nfn main() {\n    let shelves =\n        ::alloc::boxed::box_assume_init_into_vec_unsafe(::alloc::intrinsics::write_box_via_move(::alloc::boxed::Box::new_uninit(),\n                [3, 5, 8]));\n    if !(shelves.len() == 3) {\n        ::core::panicking::panic(\"assertion failed: shelves.len() == 3\")\n    };\n    let five =\n        #[allow(non_exhaustive_omitted_patterns)] match shelves[1] {\n            5 => true,\n            _ => false,\n        };\n    { ::std::io::_print(format_args!(\"{0:?} {1}\\n\", shelves, five)); };\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_std"
    }
   ]
  },
  "peek_tokio.rs": {
   "src": "#[tokio::main]\nasync fn main() {\n    println!(\"hello from inside the runtime\");\n}\n",
   "stdout": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nfn main() {\n    let body =\n        async {\n            {\n                ::std::io::_print(format_args!(\"hello from inside the runtime\\n\"));\n            };\n        };\n    let body =\n        {\n            if false {\n                let _: &dyn ::core::future::Future<Output = ()> = &body;\n            }\n            body\n        };\n\n    #[allow(clippy :: expect_used, clippy :: diverging_sub_expression, clippy\n    :: needless_return, clippy :: unwrap_in_result)]\n    {\n        use tokio::runtime::Builder;\n        return Builder::new_multi_thread().enable_all().build().expect(\"Failed building the Runtime\").block_on(body);\n    }\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hello from inside the runtime\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_tokio"
    },
    {
     "cmd": "RUSTC_BOOTSTRAP=1 cargo rustc -q -- -Zunpretty=expanded",
     "out": "#![feature(prelude_import)]\nextern crate std;\n#[prelude_import]\nuse std::prelude::rust_2024::*;\nfn main() {\n    let body =\n        async {\n            {\n                ::std::io::_print(format_args!(\"hello from inside the runtime\\n\"));\n            };\n        };\n    let body =\n        {\n            if false {\n                let _: &dyn ::core::future::Future<Output = ()> = &body;\n            }\n            body\n        };\n\n    #[allow(clippy :: expect_used, clippy :: diverging_sub_expression, clippy\n    :: needless_return, clippy :: unwrap_in_result)]\n    {\n        use tokio::runtime::Builder;\n        return Builder::new_multi_thread().enable_all().build().expect(\"Failed building the Runtime\").block_on(body);\n    }\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/peek_tokio"
    }
   ]
  },
  "predict_channel.rs": {
   "src": "use tokio::sync::mpsc;\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let (tx, mut rx) = mpsc::channel(4);\n    for name in [\"owl\", \"wren\", \"heron\"] {\n        let tx = tx.clone();\n        tokio::spawn(async move {\n            tx.send(name.len()).await.unwrap();\n        });\n    }\n    drop(tx);\n    println!(\"waiting for letters\");\n    let mut total = 0;\n    while let Some(n) = rx.recv().await {\n        total += n;\n        println!(\"+{n} = {total}\");\n    }\n}\n",
   "stdout": "waiting for letters\n+3 = 3\n+4 = 7\n+5 = 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "waiting for letters\n+3 = 3\n+4 = 7\n+5 = 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/predict_channel"
    }
   ]
  },
  "predict_join.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn fetch(item: &str, ms: u64) -> &str {\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"got the {item}\");\n    item\n}\n\n#[tokio::main]\nasync fn main() {\n    let (x, y) = tokio::join!(fetch(\"milk\", 200), fetch(\"bread\", 100));\n    println!(\"{x} then {y}\");\n}\n",
   "stdout": "got the bread\ngot the milk\nmilk then bread\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "got the bread\ngot the milk\nmilk then bread\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/predict_join"
    }
   ]
  },
  "predict_lazy.rs": {
   "src": "async fn pour(drink: &str) -> &str {\n    println!(\"pouring {drink}\");\n    drink\n}\n\n#[tokio::main]\nasync fn main() {\n    let a = pour(\"cocoa\");\n    let b = pour(\"lemonade\");\n    println!(\"two slips written\");\n    let second = b.await;\n    let first = a.await;\n    println!(\"served {first} and {second}\");\n}\n",
   "stdout": "two slips written\npouring lemonade\npouring cocoa\nserved cocoa and lemonade\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "two slips written\npouring lemonade\npouring cocoa\nserved cocoa and lemonade\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/predict_lazy"
    }
   ]
  },
  "predict_twice.rs": {
   "src": "macro_rules! square {\n    ($x:expr) => {\n        $x * $x\n    };\n}\n\nfn next_ticket(n: &mut u32) -> u32 {\n    *n += 1;\n    println!(\"ticket {n} handed out\");\n    *n\n}\n\nfn main() {\n    println!(\"{}\", square!(2 + 3));\n    let mut counter = 0;\n    let s = square!(next_ticket(&mut counter));\n    println!(\"{s}\");\n}\n",
   "stdout": "25\nticket 1 handed out\nticket 2 handed out\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "25\nticket 1 handed out\nticket 2 handed out\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/predict_twice"
    }
   ]
  },
  "println_nobang.rs": {
   "src": "fn main() {\n    let name = \"Mabel\";\n    println(\"Hello, {name}!\");\n}\n",
   "stdout": "",
   "stderr": "error[E0423]: cannot find function `println` in this scope\n --> src/main.rs:3:5\n  |\n3 |     println(\"Hello, {name}!\");\n  |     ^^^^^^^ not found in this scope\n  |\n  = note: a macro named `println` exists in another namespace\nhelp: use `!` to invoke the macro\n  |\n3 |     println!(\"Hello, {name}!\");\n  |            +\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `println_nobang` (bin \"println_nobang\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0423]: cannot find function `println` in this scope\n --> src/main.rs:3:5\n  |\n3 |     println(\"Hello, {name}!\");\n  |     ^^^^^^^ not found in this scope\n  |\n  = note: a macro named `println` exists in another namespace\nhelp: use `!` to invoke the macro\n  |\n3 |     println!(\"Hello, {name}!\");\n  |            +\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `println_nobang` (bin \"println_nobang\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/println_nobang"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0423]: expected function, found macro `println`\n --> src/main.rs:3:5\n  |\n3 |     println(\"Hello, {name}!\");\n  |     ^^^^^^^ not a function\n  |\nhelp: use `!` to invoke the macro\n  |\n3 |     println!(\"Hello, {name}!\");\n  |            +\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `println_nobang` (bin \"println_nobang\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0423]: expected function, found macro `println`\n --> src/main.rs:3:5\n  |\n3 |     println(\"Hello, {name}!\");\n  |     ^^^^^^^ not a function\n  |\nhelp: use `!` to invoke the macro\n  |\n3 |     println!(\"Hello, {name}!\");\n  |            +\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `println_nobang` (bin \"println_nobang\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch27/println_nobang"
     }
    ]
   }
  },
  "select_race.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn cook(dish: &str, ms: u64) -> &str {\n    println!(\"{dish}: started\");\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"{dish}: done\");\n    dish\n}\n\n#[tokio::main]\nasync fn main() {\n    tokio::select! {\n        biased;\n        d = cook(\"pancakes\", 300) => println!(\"first out: {d}\"),\n        d = cook(\"toast\", 100) => println!(\"first out: {d}\"),\n    }\n    tokio::select! {\n        biased;\n        d = cook(\"stew\", 500) => println!(\"first out: {d}\"),\n        _ = sleep(Duration::from_millis(200)) => println!(\"too slow: stew cancelled\"),\n    }\n    sleep(Duration::from_millis(400)).await;\n    println!(\"closing: nothing else finished\");\n}\n",
   "stdout": "pancakes: started\ntoast: started\ntoast: done\nfirst out: toast\nstew: started\ntoo slow: stew cancelled\nclosing: nothing else finished\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "pancakes: started\ntoast: started\ntoast: done\nfirst out: toast\nstew: started\ntoo slow: stew cancelled\nclosing: nothing else finished\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/select_race"
    }
   ]
  },
  "spawn_blocking.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nfn count_stock() -> u32 {\n    std::thread::sleep(Duration::from_millis(300));\n    1250\n}\n\n#[tokio::main]\nasync fn main() {\n    let stock = tokio::task::spawn_blocking(count_stock);\n    for round in 1..=3 {\n        sleep(Duration::from_millis(60)).await;\n        println!(\"waiter still serving: round {round}\");\n    }\n    let books = stock.await.unwrap();\n    println!(\"stock count: {books} books\");\n}\n",
   "stdout": "waiter still serving: round 1\nwaiter still serving: round 2\nwaiter still serving: round 3\nstock count: 1250 books\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "waiter still serving: round 1\nwaiter still serving: round 2\nwaiter still serving: round 3\nstock count: 1250 books\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/spawn_blocking"
    }
   ]
  },
  "spawn_fixed.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let table9 = tokio::spawn(async {\n        println!(\"table 9: order taken\");\n        sleep(Duration::from_millis(100)).await;\n        println!(\"table 9: food served\");\n    });\n    println!(\"closing time!\");\n    table9.await.unwrap();\n}\n",
   "stdout": "closing time!\ntable 9: order taken\ntable 9: food served\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "closing time!\ntable 9: order taken\ntable 9: food served\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/spawn_fixed"
    }
   ]
  },
  "spawn_forgot.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    tokio::spawn(async {\n        println!(\"table 9: order taken\");\n        sleep(Duration::from_millis(100)).await;\n        println!(\"table 9: food served\");\n    });\n    println!(\"closing time!\");\n}\n",
   "stdout": "closing time!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "closing time!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/spawn_forgot"
    }
   ]
  },
  "spawn_tables.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn serve(table: u32, ms: u64) -> u32 {\n    println!(\"table {table}: order taken\");\n    sleep(Duration::from_millis(ms)).await;\n    println!(\"table {table}: food served\");\n    table * 10\n}\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let mut handles = Vec::new();\n    for (table, ms) in [(1, 300), (2, 100), (3, 200)] {\n        handles.push(tokio::spawn(serve(table, ms)));\n    }\n    println!(\"all orders handed to the runtime\");\n    for handle in handles {\n        let tip = handle.await.unwrap();\n        println!(\"collected a tip of {tip}\");\n    }\n}\n",
   "stdout": "all orders handed to the runtime\ntable 1: order taken\ntable 2: order taken\ntable 3: order taken\ntable 2: food served\ntable 3: food served\ntable 1: food served\ncollected a tip of 10\ncollected a tip of 20\ncollected a tip of 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "all orders handed to the runtime\ntable 1: order taken\ntable 2: order taken\ntable 3: order taken\ntable 2: food served\ntable 3: food served\ntable 1: food served\ncollected a tip of 10\ncollected a tip of 20\ncollected a tip of 30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/spawn_tables"
    }
   ]
  },
  "spot_bang.rs": {
   "src": "fn main() {\n    let shelves = vec![3, 5, 8];\n    let total: i32 = shelves.iter().sum();\n    let msg = format(\"{total} books on the shelves\");\n    println!(\"{msg}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0423]: cannot find function `format` in this scope\n --> src/main.rs:4:15\n  |\n4 |     let msg = format(\"{total} books on the shelves\");\n  |               ^^^^^^ not found in this scope\n  |\n  = note: a macro named `format` exists in another namespace\nhelp: use `!` to invoke the macro\n  |\n4 |     let msg = format!(\"{total} books on the shelves\");\n  |                     +\nhelp: consider importing this function instead\n  |\n1 + use std::fmt::format;\n  |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `spot_bang` (bin \"spot_bang\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0423]: cannot find function `format` in this scope\n --> src/main.rs:4:15\n  |\n4 |     let msg = format(\"{total} books on the shelves\");\n  |               ^^^^^^ not found in this scope\n  |\n  = note: a macro named `format` exists in another namespace\nhelp: use `!` to invoke the macro\n  |\n4 |     let msg = format!(\"{total} books on the shelves\");\n  |                     +\nhelp: consider importing this function instead\n  |\n1 + use std::fmt::format;\n  |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `spot_bang` (bin \"spot_bang\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch27/spot_bang"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0423]: expected function, found macro `format`\n --> src/main.rs:4:15\n  |\n4 |     let msg = format(\"{total} books on the shelves\");\n  |               ^^^^^^ not a function\n  |\nhelp: use `!` to invoke the macro\n  |\n4 |     let msg = format!(\"{total} books on the shelves\");\n  |                     +\nhelp: consider importing this function instead\n  |\n1 + use std::fmt::format;\n  |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `spot_bang` (bin \"spot_bang\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0423]: expected function, found macro `format`\n --> src/main.rs:4:15\n  |\n4 |     let msg = format(\"{total} books on the shelves\");\n  |               ^^^^^^ not a function\n  |\nhelp: use `!` to invoke the macro\n  |\n4 |     let msg = format!(\"{total} books on the shelves\");\n  |                     +\nhelp: consider importing this function instead\n  |\n1 + use std::fmt::format;\n  |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `spot_bang` (bin \"spot_bang\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch27/spot_bang"
     }
    ]
   }
  },
  "spot_block.rs": {
   "src": "use std::time::Duration;\n\nasync fn ask(supplier: &str, ms: u64) -> u32 {\n    println!(\"asking the {supplier}\");\n    std::thread::sleep(Duration::from_millis(ms));\n    println!(\"the {supplier} answered\");\n    (ms / 10) as u32\n}\n\n#[tokio::main]\nasync fn main() {\n    let (rolls, jugs) = tokio::join!(ask(\"bakery\", 200), ask(\"dairy\", 100));\n    println!(\"{rolls} rolls, {jugs} jugs\");\n}\n",
   "stdout": "asking the bakery\nthe bakery answered\nasking the dairy\nthe dairy answered\n20 rolls, 10 jugs\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "asking the bakery\nthe bakery answered\nasking the dairy\nthe dairy answered\n20 rolls, 10 jugs\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/spot_block"
    }
   ]
  },
  "std_macros.rs": {
   "src": "use std::fmt::Write;\n\nfn main() {\n    let shelves = vec![3, 5, 8];\n    let label = format!(\"{} shelves\", shelves.len());\n    let mut note = String::new();\n    write!(note, \"the first holds {}\", shelves[0]).unwrap();\n    println!(\"{label}; {note}\");\n    assert!(shelves.len() == 3);\n    assert_eq!(shelves[2], 8, \"the third shelf\");\n    let small = matches!(shelves[0], 1..=4);\n    println!(\"small first shelf? {small}\");\n}\n",
   "stdout": "3 shelves; the first holds 3\nsmall first shelf? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 shelves; the first holds 3\nsmall first shelf? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/std_macros"
    }
   ]
  },
  "sum_macro.rs": {
   "src": "macro_rules! sum {\n    () => { 0 };\n    ($($x:expr),+ $(,)?) => { 0 $(+ $x)+ };\n}\n\nfn main() {\n    println!(\"{}\", sum!());\n    println!(\"{}\", sum!(4));\n    println!(\"{}\", sum!(1, 2, 3));\n    println!(\"{}\", sum!(10, 20, 30, 40,));\n}\n",
   "stdout": "0\n4\n6\n100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0\n4\n6\n100\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/sum_macro"
    }
   ]
  },
  "todo_panic.rs": {
   "src": "fn late_fee(days: u32) -> u32 {\n    todo!(\"work out the fee for {days} days\")\n}\n\nfn main() {\n    println!(\"checking the loans...\");\n    let fee = late_fee(3);\n    println!(\"fee: {fee}\");\n}\n",
   "stdout": "checking the loans...\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:2:5:\nnot yet implemented: work out the fee for 3 days\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "checking the loans...\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:2:5:\nnot yet implemented: work out the fee for 3 days\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch27/todo_panic",
     "merged": "checking the loans...\n\nthread 'main' (1) panicked at src/main.rs:2:5:\nnot yet implemented: work out the fee for 3 days\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "trace_tasks.rs": {
   "src": "use std::time::Duration;\nuse tokio::time::sleep;\n\nasync fn cook(name: &'static str, every: u64, dishes: &'static [&'static str]) {\n    for (i, dish) in dishes.iter().enumerate() {\n        sleep(Duration::from_millis(every)).await;\n        let at = every * (i as u64 + 1);\n        println!(\"{name} {dish} {at}\");\n    }\n}\n\n#[tokio::main(flavor = \"current_thread\")]\nasync fn main() {\n    let ana = tokio::spawn(cook(\"ana\", 200, &[\"soup\", \"pie\", \"jam\"]));\n    let ben = tokio::spawn(cook(\"ben\", 270, &[\"tea\", \"toast\"]));\n    ana.await.unwrap();\n    ben.await.unwrap();\n}\n",
   "stdout": "ana soup 200\nben tea 270\nana pie 400\nben toast 540\nana jam 600\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "ana soup 200\nben tea 270\nana pie 400\nben toast 540\nana jam 600\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch27/trace_tasks"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
