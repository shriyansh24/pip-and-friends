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
  "workdir": "/home/you/rust-ch26",
  "versionDifferences": [
   "boss_spot.rs",
   "interleave.rs",
   "many_runs.rs",
   "poison.rs",
   "poison_spot.rs",
   "predict_send.rs",
   "rc_thread.rs",
   "scope_race.rs",
   "sync_error.rs",
   "thread_panic.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_spot.rs, interleave.rs, many_runs.rs, poison.rs, poison_spot.rs, predict_send.rs, rc_thread.rs, scope_race.rs, sync_error.rs, thread_panic.rs."
 },
 "programs": {
  "arc_guard.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let shelf = Arc::new(Mutex::new(vec![\"soup\"]));\n    let helper = Arc::clone(&shelf);\n    println!(\"owners: {}\", Arc::strong_count(&shelf));\n    let cook = thread::spawn(move || {\n        let mut dishes = helper.lock().unwrap();\n        dishes.push(\"pie\");\n    });\n    cook.join().unwrap();\n    println!(\"owners: {}\", Arc::strong_count(&shelf));\n    let dishes = shelf.lock().unwrap();\n    println!(\"{:?}\", *dishes);\n}\n",
   "stdout": "owners: 2\nowners: 1\n[\"soup\", \"pie\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "owners: 2\nowners: 1\n[\"soup\", \"pie\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/arc_guard"
    }
   ]
  },
  "arc_mut_error.rs": {
   "src": "use std::sync::Arc;\nuse std::thread;\n\nfn main() {\n    let book = Arc::new(vec![\"soup\"]);\n    let mine = Arc::clone(&book);\n    let cook = thread::spawn(move || {\n        mine.push(\"pie\");\n    });\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow data in an `Arc` as mutable\n --> src/main.rs:8:9\n  |\n8 |         mine.push(\"pie\");\n  |         ^^^^ cannot borrow as mutable\n  |\n  = help: trait `DerefMut` is required to modify through a dereference, but it is not implemented for `Arc<Vec<&str>>`\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `arc_mut_error` (bin \"arc_mut_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow data in an `Arc` as mutable\n --> src/main.rs:8:9\n  |\n8 |         mine.push(\"pie\");\n  |         ^^^^ cannot borrow as mutable\n  |\n  = help: trait `DerefMut` is required to modify through a dereference, but it is not implemented for `Arc<Vec<&str>>`\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `arc_mut_error` (bin \"arc_mut_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/arc_mut_error"
    }
   ]
  },
  "arc_mutex.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let done = Arc::new(Mutex::new(0));\n    let mut cooks = vec![];\n    for _ in 0..4 {\n        let done = Arc::clone(&done);\n        cooks.push(thread::spawn(move || {\n            for _ in 0..1000 {\n                *done.lock().unwrap() += 1;\n            }\n        }));\n    }\n    for c in cooks {\n        c.join().unwrap();\n    }\n    println!(\"dishes done: {}\", *done.lock().unwrap());\n}\n",
   "stdout": "dishes done: 4000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "dishes done: 4000\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/arc_mutex"
    }
   ]
  },
  "arc_share.rs": {
   "src": "use std::sync::Arc;\nuse std::thread;\n\nfn main() {\n    let book = Arc::new(vec![\"soup\", \"pie\", \"stew\"]);\n    let mut cooks = Vec::new();\n    for id in 1..=3 {\n        let my_copy = Arc::clone(&book);\n        cooks.push(thread::spawn(move || {\n            format!(\"cook {id} reads {}\", my_copy[id - 1])\n        }));\n    }\n    for c in cooks {\n        println!(\"{}\", c.join().unwrap());\n    }\n    println!(\"readers left: {}\", Arc::strong_count(&book));\n}\n",
   "stdout": "cook 1 reads soup\ncook 2 reads pie\ncook 3 reads stew\nreaders left: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cook 1 reads soup\ncook 2 reads pie\ncook 3 reads stew\nreaders left: 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/arc_share"
    }
   ]
  },
  "atomic.rs": {
   "src": "use std::sync::atomic::{AtomicUsize, Ordering};\nuse std::thread;\n\nfn main() {\n    let plates = AtomicUsize::new(0);\n    thread::scope(|s| {\n        for _ in 0..4 {\n            s.spawn(|| {\n                for _ in 0..1000 {\n                    plates.fetch_add(1, Ordering::Relaxed);\n                }\n            });\n        }\n    });\n    println!(\"plates washed: {}\", plates.load(Ordering::Relaxed));\n}\n",
   "stdout": "plates washed: 4000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "plates washed: 4000\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/atomic"
    }
   ]
  },
  "borrow_error.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let order = vec![\"soup\", \"salad\"];\n    let cook = thread::spawn(|| {\n        println!(\"cooking {:?}\", order);\n    });\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0373]: closure may outlive the current function, but it borrows `order`, which is owned by the current function\n --> src/main.rs:5:30\n  |\n5 |     let cook = thread::spawn(|| {\n  |                              ^^ may outlive borrowed value `order`\n6 |         println!(\"cooking {:?}\", order);\n  |                                  ----- `order` is borrowed here\n  |\nnote: function requires argument type to outlive `'static`\n --> src/main.rs:5:16\n  |\n5 |       let cook = thread::spawn(|| {\n  |  ________________^\n6 | |         println!(\"cooking {:?}\", order);\n7 | |     });\n  | |______^\nhelp: to force the closure to take ownership of `order` (and any other referenced variables), use the `move` keyword\n  |\n5 |     let cook = thread::spawn(move || {\n  |                              ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `borrow_error` (bin \"borrow_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0373]: closure may outlive the current function, but it borrows `order`, which is owned by the current function\n --> src/main.rs:5:30\n  |\n5 |     let cook = thread::spawn(|| {\n  |                              ^^ may outlive borrowed value `order`\n6 |         println!(\"cooking {:?}\", order);\n  |                                  ----- `order` is borrowed here\n  |\nnote: function requires argument type to outlive `'static`\n --> src/main.rs:5:16\n  |\n5 |       let cook = thread::spawn(|| {\n  |  ________________^\n6 | |         println!(\"cooking {:?}\", order);\n7 | |     });\n  | |______^\nhelp: to force the closure to take ownership of `order` (and any other referenced variables), use the `move` keyword\n  |\n5 |     let cook = thread::spawn(move || {\n  |                              ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `borrow_error` (bin \"borrow_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/borrow_error"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    for table in 1..=3 {\n        let tx = tx.clone();\n        thread::spawn(move || {\n            tx.send(table * 100).unwrap();\n        });\n    }\n    drop(tx);\n    let mut bills: Vec<u32> = rx.iter().collect();\n    bills.sort();\n    println!(\"{:?}\", bills);\n}\n",
   "stdout": "[100, 200, 300]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[100, 200, 300]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let log = Arc::new(Mutex::new(Vec::new()));\n    let helper = Arc::clone(&log);\n    let cook = thread::spawn(move || {\n        helper.lock().unwrap().push(\"chopped\");\n    });\n    cook.join().unwrap();\n    log.lock().unwrap().push(\"served\");\n    println!(\"{:?}\", *log.lock().unwrap());\n}\n",
   "stdout": "[\"chopped\", \"served\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[\"chopped\", \"served\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "use std::sync::{mpsc, Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let pantry = Arc::new(Mutex::new(10));\n    let (tx, rx) = mpsc::channel();\n    let mut cooks = Vec::new();\n    for need in [1, 2, 3] {\n        let pantry = Arc::clone(&pantry);\n        let tx = tx.clone();\n        cooks.push(thread::spawn(move || {\n            *pantry.lock().unwrap() -= need;\n            tx.send(need * 10).unwrap();\n        }));\n    }\n    drop(tx);\n    for c in cooks {\n        c.join().unwrap();\n    }\n    let total: i32 = rx.iter().sum();\n    println!(\"dishes worth {total}\");\n    println!(\"eggs left {}\", *pantry.lock().unwrap());\n    println!(\"owners {}\", Arc::strong_count(&pantry));\n    println!(\"rail open? {}\", rx.recv().is_ok());\n}\n",
   "stdout": "dishes worth 60\neggs left 4\nowners 1\nrail open? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "dishes worth 60\neggs left 4\nowners 1\nrail open? false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "use std::sync::Mutex;\nuse std::thread;\n\nfn main() {\n    let shelf = Mutex::new(vec![\"jam\"]);\n    thread::scope(|s| {\n        let mut held = shelf.lock().unwrap();\n        s.spawn(move || {\n            held.push(\"honey\");\n        });\n    });\n    println!(\"{:?}\", shelf.lock().unwrap());\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n  --> src/main.rs:8:17\n   |\n 8 |           s.spawn(move || {\n   |             ----- ^------\n   |             |     |\n   |  ___________|_____within this `{closure@src/main.rs:8:17: 8:24}`\n   | |           |\n   | |           required by a bound introduced by this call\n 9 | |             held.push(\"honey\");\n10 | |         });\n   | |_________^ `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n   |\n   = help: within `{closure@src/main.rs:8:17: 8:24}`, the trait `Send` is not implemented for `std::sync::MutexGuard<'_, Vec<&str>>`\nnote: required because it's used within this closure\n  --> src/main.rs:8:17\n   |\n 8 |         s.spawn(move || {\n   |                 ^^^^^^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n  --> src/main.rs:8:17\n   |\n 8 |           s.spawn(move || {\n   |             ----- ^------\n   |             |     |\n   |  ___________|_____within this `{closure@src/main.rs:8:17: 8:24}`\n   | |           |\n   | |           required by a bound introduced by this call\n 9 | |             held.push(\"honey\");\n10 | |         });\n   | |_________^ `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n   |\n   = help: within `{closure@src/main.rs:8:17: 8:24}`, the trait `Send` is not implemented for `std::sync::MutexGuard<'_, Vec<&str>>`\nnote: required because it's used within this closure\n  --> src/main.rs:8:17\n   |\n 8 |         s.spawn(move || {\n   |                 ^^^^^^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/boss_spot"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n  --> src/main.rs:8:17\n   |\n 8 |           s.spawn(move || {\n   |             ----- ^------\n   |             |     |\n   |  ___________|_____within this `{closure@src/main.rs:8:17: 8:24}`\n   | |           |\n   | |           required by a bound introduced by this call\n 9 | |             held.push(\"honey\");\n10 | |         });\n   | |_________^ `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n   |\n   = help: within `{closure@src/main.rs:8:17: 8:24}`, the trait `Send` is not implemented for `std::sync::MutexGuard<'_, Vec<&str>>`\nnote: required because it's used within this closure\n  --> src/main.rs:8:17\n   |\n 8 |         s.spawn(move || {\n   |                 ^^^^^^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n  --> src/main.rs:8:17\n   |\n 8 |           s.spawn(move || {\n   |             ----- ^------\n   |             |     |\n   |  ___________|_____within this `{closure@src/main.rs:8:17: 8:24}`\n   | |           |\n   | |           required by a bound introduced by this call\n 9 | |             held.push(\"honey\");\n10 | |         });\n   | |_________^ `std::sync::MutexGuard<'_, Vec<&str>>` cannot be sent between threads safely\n   |\n   = help: within `{closure@src/main.rs:8:17: 8:24}`, the trait `Send` is not implemented for `std::sync::MutexGuard<'_, Vec<&str>>`\nnote: required because it's used within this closure\n  --> src/main.rs:8:17\n   |\n 8 |         s.spawn(move || {\n   |                 ^^^^^^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch26/boss_spot"
     }
    ]
   }
  },
  "boss_trace.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let orders = [5, 3, 8, 2, 7, 1];\n    let mut totals = [0; 3];\n    thread::scope(|s| {\n        for (cook, slot) in totals.iter_mut().enumerate() {\n            let mine = &orders[cook * 2..cook * 2 + 2];\n            s.spawn(move || *slot = mine.iter().sum());\n        }\n    });\n    let mut running = 0;\n    for (cook, t) in totals.iter().enumerate() {\n        running += t;\n        println!(\"{cook} {t} {running}\");\n    }\n}\n",
   "stdout": "0 8 8\n1 10 18\n2 8 26\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 8 8\n1 10 18\n2 8 26\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/boss_trace"
    }
   ]
  },
  "channel_basic.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    thread::spawn(move || {\n        for dish in [\"soup\", \"salad\", \"pie\"] {\n            tx.send(dish).unwrap();\n        }\n    });\n    for ticket in rx {\n        println!(\"serving {ticket}\");\n    }\n    println!(\"rail empty, kitchen closed\");\n}\n",
   "stdout": "serving soup\nserving salad\nserving pie\nrail empty, kitchen closed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "serving soup\nserving salad\nserving pie\nrail empty, kitchen closed\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/channel_basic"
    }
   ]
  },
  "clone_first.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let order = vec![\"soup\", \"salad\"];\n    let for_cook = order.clone();\n    let cook = thread::spawn(move || {\n        println!(\"cook has {:?}\", for_cook);\n    });\n    cook.join().unwrap();\n    println!(\"main still has {:?}\", order);\n}\n",
   "stdout": "cook has [\"soup\", \"salad\"]\nmain still has [\"soup\", \"salad\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cook has [\"soup\", \"salad\"]\nmain still has [\"soup\", \"salad\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/clone_first"
    }
   ]
  },
  "crew.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let mut crew = Vec::new();\n    for cook in 1..=3 {\n        let handle = thread::spawn(move || {\n            format!(\"cook {cook} made {} pancakes\", cook * 2)\n        });\n        crew.push(handle);\n    }\n    for handle in crew {\n        println!(\"{}\", handle.join().unwrap());\n    }\n}\n",
   "stdout": "cook 1 made 2 pancakes\ncook 2 made 4 pancakes\ncook 3 made 6 pancakes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cook 1 made 2 pancakes\ncook 2 made 4 pancakes\ncook 3 made 6 pancakes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/crew"
    }
   ]
  },
  "deadlock_try.rs": {
   "src": "use std::sync::{Arc, Barrier, Mutex};\nuse std::thread;\n\nfn main() {\n    let knife = Arc::new(Mutex::new(\"knife\"));\n    let board = Arc::new(Mutex::new(\"board\"));\n    let gate = Arc::new(Barrier::new(2));\n\n    let (k, b, g) = (Arc::clone(&knife), Arc::clone(&board), Arc::clone(&gate));\n    let ana = thread::spawn(move || {\n        let _knife = k.lock().unwrap();\n        g.wait();\n        let got_board = b.try_lock().is_ok();\n        g.wait();\n        if got_board { \"Ana: got the board too\" } else { \"Ana: has the knife, waiting for the board...\" }\n    });\n\n    let (k, b, g) = (Arc::clone(&knife), Arc::clone(&board), Arc::clone(&gate));\n    let ben = thread::spawn(move || {\n        let _board = b.lock().unwrap();\n        g.wait();\n        let got_knife = k.try_lock().is_ok();\n        g.wait();\n        if got_knife { \"Ben: got the knife too\" } else { \"Ben: has the board, waiting for the knife...\" }\n    });\n\n    println!(\"{}\", ana.join().unwrap());\n    println!(\"{}\", ben.join().unwrap());\n    println!(\"deadlock: with lock() instead of try_lock(), both would wait forever\");\n}\n",
   "stdout": "Ana: has the knife, waiting for the board...\nBen: has the board, waiting for the knife...\ndeadlock: with lock() instead of try_lock(), both would wait forever\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana: has the knife, waiting for the board...\nBen: has the board, waiting for the knife...\ndeadlock: with lock() instead of try_lock(), both would wait forever\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/deadlock_try"
    }
   ]
  },
  "fill_arc.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let menu = Arc::new(Mutex::new(Vec::new()));\n    let mut cooks = Vec::new();\n    for dish in [\"soup\", \"pie\"] {\n        let menu = Arc::clone(&menu);\n        cooks.push(thread::spawn(move || {\n            menu.lock().unwrap().push(dish);\n        }));\n    }\n    for c in cooks {\n        c.join().unwrap();\n    }\n    let mut dishes = menu.lock().unwrap();\n    dishes.sort();\n    println!(\"{:?}\", *dishes);\n}\n",
   "stdout": "[\"pie\", \"soup\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[\"pie\", \"soup\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/fill_arc"
    }
   ]
  },
  "fill_atomic.rs": {
   "src": "use std::sync::atomic::{AtomicU32, Ordering};\nuse std::thread;\n\nfn main() {\n    let orders = AtomicU32::new(0);\n    thread::scope(|s| {\n        for _ in 0..3 {\n            s.spawn(|| {\n                for _ in 0..10 {\n                    orders.fetch_add(1, Ordering::Relaxed);\n                }\n            });\n        }\n    });\n    println!(\"orders taken: {}\", orders.load(Ordering::Relaxed));\n}\n",
   "stdout": "orders taken: 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "orders taken: 30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/fill_atomic"
    }
   ]
  },
  "fill_move.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let guest = String::from(\"Ada\");\n    let table = 7;\n    let waiter = thread::spawn(move || {\n        format!(\"table {table}: welcome, {guest}!\")\n    });\n    let greeting = waiter.join().unwrap();\n    println!(\"{greeting}\");\n}\n",
   "stdout": "table 7: welcome, Ada!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "table 7: welcome, Ada!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/fill_move"
    }
   ]
  },
  "forgot_drop.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    for n in 1..=2 {\n        let tx = tx.clone();\n        thread::spawn(move || tx.send(n).unwrap());\n    }\n    // forgot: drop(tx);\n    let mut got = Vec::new();\n    loop {\n        match rx.recv_timeout(Duration::from_millis(300)) {\n            Ok(n) => got.push(n),\n            Err(e) => {\n                println!(\"waited 300 ms, still no ticket: {e:?}\");\n                break;\n            }\n        }\n    }\n    got.sort();\n    println!(\"got {:?}\", got);\n}\n",
   "stdout": "waited 300 ms, still no ticket: Timeout\ngot [1, 2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "waited 300 ms, still no ticket: Timeout\ngot [1, 2]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/forgot_drop"
    }
   ]
  },
  "forgot_join.rs": {
   "src": "use std::thread;\nuse std::time::Duration;\n\nfn main() {\n    thread::spawn(|| {\n        thread::sleep(Duration::from_millis(100));\n        println!(\"helper: dessert is ready!\");\n    });\n    println!(\"main: closing the kitchen\");\n}\n",
   "stdout": "main: closing the kitchen\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: closing the kitchen\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/forgot_join"
    }
   ]
  },
  "interleave.rs": {
   "src": "use std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let helper = thread::spawn(|| {\n        for i in 1..=3 {\n            println!(\"helper: chop {i}\");\n            thread::sleep(Duration::from_millis(1));\n        }\n    });\n    for i in 1..=3 {\n        println!(\"main:   stir {i}\");\n        thread::sleep(Duration::from_millis(1));\n    }\n    helper.join().unwrap();\n}\n",
   "stdout": "main:   stir 1\nhelper: chop 1\nmain:   stir 2\nhelper: chop 2\nhelper: chop 3\nmain:   stir 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main:   stir 1\nhelper: chop 1\nmain:   stir 2\nhelper: chop 2\nhelper: chop 3\nmain:   stir 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/interleave"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "helper: chop 1\nmain:   stir 1\nhelper: chop 2\nmain:   stir 2\nhelper: chop 3\nmain:   stir 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "helper: chop 1\nmain:   stir 1\nhelper: chop 2\nmain:   stir 2\nhelper: chop 3\nmain:   stir 3\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch26/interleave"
     }
    ]
   }
  },
  "join_value.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let baker = thread::spawn(|| {\n        let loaves = 3 * 4;\n        loaves\n    });\n    println!(\"main: waiting for the baker...\");\n    let result = baker.join();\n    println!(\"join gave back: {:?}\", result);\n    let loaves = result.unwrap();\n    println!(\"main: {loaves} loaves on the shelf\");\n}\n",
   "stdout": "main: waiting for the baker...\njoin gave back: Ok(12)\nmain: 12 loaves on the shelf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: waiting for the baker...\njoin gave back: Ok(12)\nmain: 12 loaves on the shelf\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/join_value"
    }
   ]
  },
  "many_runs.rs": {
   "src": "use std::collections::BTreeMap;\nuse std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let mut seen: BTreeMap<String, u32> = BTreeMap::new();\n    for _round in 0..200 {\n        let (tx, rx) = mpsc::channel();\n        let mut cooks = Vec::new();\n        for id in 0..4 {\n            let tx = tx.clone();\n            cooks.push(thread::spawn(move || tx.send(id).unwrap()));\n        }\n        drop(tx);\n        let order: Vec<String> = rx.iter().map(|id| id.to_string()).collect();\n        *seen.entry(order.join(\" \")).or_insert(0) += 1;\n        for c in cooks {\n            c.join().unwrap();\n        }\n    }\n    println!(\"200 rounds, 4 cooks ringing the bell:\");\n    for (order, times) in &seen {\n        println!(\"  {order}   {times} times\");\n    }\n}\n",
   "stdout": "200 rounds, 4 cooks ringing the bell:\n  0 1 2 3   197 times\n  0 1 3 2   2 times\n  1 0 2 3   1 times\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "200 rounds, 4 cooks ringing the bell:\n  0 1 2 3   197 times\n  0 1 3 2   2 times\n  1 0 2 3   1 times\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/many_runs"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "200 rounds, 4 cooks ringing the bell:\n  0 1 2 3   187 times\n  0 1 3 2   5 times\n  1 0 2 3   1 times\n  1 2 0 3   1 times\n  1 2 3 0   5 times\n  1 3 2 0   1 times\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "200 rounds, 4 cooks ringing the bell:\n  0 1 2 3   187 times\n  0 1 3 2   5 times\n  1 0 2 3   1 times\n  1 2 0 3   1 times\n  1 2 3 0   5 times\n  1 3 2 0   1 times\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch26/many_runs"
     }
    ]
   }
  },
  "move_fix.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let order = vec![\"soup\", \"salad\"];\n    let cook = thread::spawn(move || {\n        println!(\"cooking {:?}\", order);\n    });\n    cook.join().unwrap();\n}\n",
   "stdout": "cooking [\"soup\", \"salad\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cooking [\"soup\", \"salad\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/move_fix"
    }
   ]
  },
  "move_then_use.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let order = vec![\"soup\", \"salad\"];\n    let cook = thread::spawn(move || {\n        println!(\"cooking {:?}\", order);\n    });\n    println!(\"main still has {:?}\", order);\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `order`\n --> src/main.rs:8:37\n  |\n4 |     let order = vec![\"soup\", \"salad\"];\n  |         ----- move occurs because `order` has type `Vec<&str>`, which does not implement the `Copy` trait\n5 |     let cook = thread::spawn(move || {\n  |                              ------- value moved into closure here\n6 |         println!(\"cooking {:?}\", order);\n  |                                  ----- variable moved due to use in closure\n7 |     });\n8 |     println!(\"main still has {:?}\", order);\n  |                                     ^^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value before moving it into the closure\n  |\n5 ~     let value = order.clone();\n6 ~     let cook = thread::spawn(move || {\n7 ~         println!(\"cooking {:?}\", value);\n  |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `move_then_use` (bin \"move_then_use\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `order`\n --> src/main.rs:8:37\n  |\n4 |     let order = vec![\"soup\", \"salad\"];\n  |         ----- move occurs because `order` has type `Vec<&str>`, which does not implement the `Copy` trait\n5 |     let cook = thread::spawn(move || {\n  |                              ------- value moved into closure here\n6 |         println!(\"cooking {:?}\", order);\n  |                                  ----- variable moved due to use in closure\n7 |     });\n8 |     println!(\"main still has {:?}\", order);\n  |                                     ^^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value before moving it into the closure\n  |\n5 ~     let value = order.clone();\n6 ~     let cook = thread::spawn(move || {\n7 ~         println!(\"cooking {:?}\", value);\n  |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `move_then_use` (bin \"move_then_use\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/move_then_use"
    }
   ]
  },
  "multi_live.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    for cook in [\"Ana\", \"Ben\", \"Cy\"] {\n        let tx = tx.clone();\n        thread::spawn(move || {\n            tx.send(format!(\"{cook}: soup\")).unwrap();\n            tx.send(format!(\"{cook}: pie\")).unwrap();\n        });\n    }\n    drop(tx);\n    for ticket in rx {\n        println!(\"{ticket}\");\n    }\n}\n",
   "stdout": "Ana: soup\nAna: pie\nBen: soup\nBen: pie\nCy: soup\nCy: pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana: soup\nAna: pie\nBen: soup\nBen: pie\nCy: soup\nCy: pie\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/multi_live"
    }
   ],
   "nondeterministic": true
  },
  "multi_producer.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    for cook in [\"Ana\", \"Ben\", \"Cy\"] {\n        let tx = tx.clone();\n        thread::spawn(move || {\n            tx.send(format!(\"{cook}: soup\")).unwrap();\n            tx.send(format!(\"{cook}: pie\")).unwrap();\n        });\n    }\n    drop(tx);\n    let mut tickets: Vec<String> = rx.iter().collect();\n    println!(\"{} tickets arrived\", tickets.len());\n    tickets.sort();\n    for t in &tickets {\n        println!(\"{t}\");\n    }\n}\n",
   "stdout": "6 tickets arrived\nAna: pie\nAna: soup\nBen: pie\nBen: soup\nCy: pie\nCy: soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "6 tickets arrived\nAna: pie\nAna: soup\nBen: pie\nBen: soup\nCy: pie\nCy: soup\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/multi_producer"
    }
   ]
  },
  "mutex_basic.rs": {
   "src": "use std::sync::Mutex;\n\nfn main() {\n    let board = Mutex::new(vec![\"onion\"]);\n    {\n        let mut chopped = board.lock().unwrap();\n        chopped.push(\"carrot\");\n        println!(\"while I hold it, can anyone else lock? {}\", board.try_lock().is_ok());\n    }\n    println!(\"after the brace, can anyone else lock? {}\", board.try_lock().is_ok());\n    println!(\"{:?}\", board);\n}\n",
   "stdout": "while I hold it, can anyone else lock? false\nafter the brace, can anyone else lock? true\nMutex { data: [\"onion\", \"carrot\"], poisoned: false, .. }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "while I hold it, can anyone else lock? false\nafter the brace, can anyone else lock? true\nMutex { data: [\"onion\", \"carrot\"], poisoned: false, .. }\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/mutex_basic"
    }
   ]
  },
  "mutex_loop_error.rs": {
   "src": "use std::sync::Mutex;\nuse std::thread;\n\nfn main() {\n    let done = Mutex::new(0);\n    let mut cooks = vec![];\n    for _ in 0..3 {\n        cooks.push(thread::spawn(move || {\n            *done.lock().unwrap() += 1;\n        }));\n    }\n    for c in cooks {\n        c.join().unwrap();\n    }\n    println!(\"dishes done: {}\", *done.lock().unwrap());\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `done`\n  --> src/main.rs:15:34\n   |\n 5 |     let done = Mutex::new(0);\n   |         ---- move occurs because `done` has type `std::sync::Mutex<i32>`, which does not implement the `Copy` trait\n 6 |     let mut cooks = vec![];\n 7 |     for _ in 0..3 {\n   |     ------------- inside of this loop\n 8 |         cooks.push(thread::spawn(move || {\n   |                                  ------- value moved into closure here, in previous iteration of loop\n...\n15 |     println!(\"dishes done: {}\", *done.lock().unwrap());\n   |                                  ^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `mutex_loop_error` (bin \"mutex_loop_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `done`\n  --> src/main.rs:15:34\n   |\n 5 |     let done = Mutex::new(0);\n   |         ---- move occurs because `done` has type `std::sync::Mutex<i32>`, which does not implement the `Copy` trait\n 6 |     let mut cooks = vec![];\n 7 |     for _ in 0..3 {\n   |     ------------- inside of this loop\n 8 |         cooks.push(thread::spawn(move || {\n   |                                  ------- value moved into closure here, in previous iteration of loop\n...\n15 |     println!(\"dishes done: {}\", *done.lock().unwrap());\n   |                                  ^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `mutex_loop_error` (bin \"mutex_loop_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/mutex_loop_error"
    }
   ]
  },
  "parsons_channel.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let cook = thread::spawn(move || {\n        for dish in [\"toast\", \"eggs\"] {\n            tx.send(dish).unwrap();\n        }\n    });\n    for dish in rx {\n        println!(\"served {dish}\");\n    }\n    cook.join().unwrap();\n    println!(\"kitchen closed\");\n}\n",
   "stdout": "served toast\nserved eggs\nkitchen closed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "served toast\nserved eggs\nkitchen closed\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/parsons_channel"
    }
   ]
  },
  "parsons_scope.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let words = vec![\"salt\", \"pepper\", \"thyme\"];\n    let mut longest = \"\";\n    thread::scope(|s| {\n        s.spawn(|| {\n            longest = words.iter().copied().max_by_key(|w| w.len()).unwrap();\n        });\n    });\n    println!(\"{} spices, longest is {longest}\", words.len());\n}\n",
   "stdout": "3 spices, longest is pepper\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 spices, longest is pepper\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/parsons_scope"
    }
   ]
  },
  "poison.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let pot = Arc::new(Mutex::new(vec![\"water\"]));\n    let p = Arc::clone(&pot);\n    let clumsy = thread::spawn(move || {\n        let mut soup = p.lock().unwrap();\n        soup.push(\"salt\");\n        panic!(\"dropped the pot!\");\n    });\n    let _ = clumsy.join();\n    println!(\"poisoned? {}\", pot.is_poisoned());\n    match pot.lock() {\n        Ok(soup) => println!(\"fine: {:?}\", *soup),\n        Err(poisoned) => {\n            let soup = poisoned.into_inner();\n            println!(\"poisoned, but here it is: {:?}\", *soup);\n        }\n    }\n}\n",
   "stdout": "poisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n",
   "stderr": "\nthread '<unnamed>' (62) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "poisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n",
     "err": "\nthread '<unnamed>' (62) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 0,
     "dir": "~/rust-ch26/poison",
     "merged": "\nthread '<unnamed>' (4) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\npoisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "poisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n",
    "stderr": "\nthread '<unnamed>' (63) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "poisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n",
      "err": "\nthread '<unnamed>' (63) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
      "exit": 0,
      "dir": "~/rust-ch26/poison",
      "merged": "\nthread '<unnamed>' (4) panicked at src/main.rs:10:9:\ndropped the pot!\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\npoisoned? true\npoisoned, but here it is: [\"water\", \"salt\"]\n"
     }
    ]
   }
  },
  "poison_spot.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let orders = Arc::new(Mutex::new(vec![101, 102]));\n    let o = Arc::clone(&orders);\n    let cook = thread::spawn(move || {\n        let list = o.lock().unwrap();\n        println!(\"cooking order {}\", list[2]);\n    });\n    let _ = cook.join();\n    let list = orders.lock().unwrap();\n    println!(\"{} orders\", list.len());\n}\n",
   "stdout": "",
   "stderr": "\nthread '<unnamed>' (60) panicked at src/main.rs:9:42:\nindex out of bounds: the len is 2 but the index is 2\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\nthread 'main' (1) panicked at src/main.rs:12:30:\ncalled `Result::unwrap()` on an `Err` value: PoisonError { .. }\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread '<unnamed>' (60) panicked at src/main.rs:9:42:\nindex out of bounds: the len is 2 but the index is 2\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\nthread 'main' (1) panicked at src/main.rs:12:30:\ncalled `Result::unwrap()` on an `Err` value: PoisonError { .. }\n",
     "exit": 101,
     "dir": "~/rust-ch26/poison_spot"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "\nthread '<unnamed>' (61) panicked at src/main.rs:9:42:\nindex out of bounds: the len is 2 but the index is 2\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\nthread 'main' (1) panicked at src/main.rs:12:30:\ncalled `Result::unwrap()` on an `Err` value: PoisonError { .. }\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "\nthread '<unnamed>' (61) panicked at src/main.rs:9:42:\nindex out of bounds: the len is 2 but the index is 2\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\nthread 'main' (1) panicked at src/main.rs:12:30:\ncalled `Result::unwrap()` on an `Err` value: PoisonError { .. }\n",
      "exit": 101,
      "dir": "~/rust-ch26/poison_spot"
     }
    ]
   }
  },
  "predict_channel.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let cook = thread::spawn(move || {\n        for n in [3, 1, 2] {\n            tx.send(n * 10).unwrap();\n        }\n        \"cook: all sent\"\n    });\n    let first = rx.recv().unwrap();\n    println!(\"first: {first}\");\n    let rest: Vec<i32> = rx.iter().collect();\n    println!(\"rest: {:?}\", rest);\n    println!(\"{}\", cook.join().unwrap());\n}\n",
   "stdout": "first: 30\nrest: [10, 20]\ncook: all sent\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first: 30\nrest: [10, 20]\ncook: all sent\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/predict_channel"
    }
   ]
  },
  "predict_join.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let soup = thread::spawn(|| {\n        let mut pot = Vec::new();\n        for veg in [\"leek\", \"bean\", \"pea\"] {\n            pot.push(veg.len());\n        }\n        pot\n    });\n    let toast = thread::spawn(|| \"rye\".len() + 1);\n    let slices = toast.join().unwrap();\n    let pot = soup.join().unwrap();\n    println!(\"toast: {slices} slices\");\n    println!(\"soup: {:?}\", pot);\n    println!(\"total: {}\", slices + pot.iter().sum::<usize>());\n}\n",
   "stdout": "toast: 4 slices\nsoup: [4, 4, 3]\ntotal: 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "toast: 4 slices\nsoup: [4, 4, 3]\ntotal: 15\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/predict_join"
    }
   ]
  },
  "predict_mutex.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let jar = Arc::new(Mutex::new(Vec::new()));\n    let mut cooks = vec![];\n    for id in 1..=3 {\n        let jar = Arc::clone(&jar);\n        cooks.push(thread::spawn(move || {\n            jar.lock().unwrap().push(id * 2);\n        }));\n    }\n    for c in cooks {\n        c.join().unwrap();\n    }\n    let mut coins = jar.lock().unwrap();\n    coins.sort();\n    println!(\"{:?}\", *coins);\n    println!(\"sum {}\", coins.iter().sum::<i32>());\n    println!(\"owners {}\", Arc::strong_count(&jar));\n}\n",
   "stdout": "[2, 4, 6]\nsum 12\nowners 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[2, 4, 6]\nsum 12\nowners 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/predict_mutex"
    }
   ]
  },
  "predict_rwlock.rs": {
   "src": "use std::sync::RwLock;\n\nfn main() {\n    let specials = RwLock::new(vec![\"soup\"]);\n    {\n        let a = specials.read().unwrap();\n        let b = specials.read().unwrap();\n        println!(\"{} {}\", a.len(), b.len());\n        println!(\"{}\", specials.try_write().is_err());\n    }\n    specials.write().unwrap().push(\"pie\");\n    let r = specials.read().unwrap();\n    println!(\"{}\", specials.try_read().is_ok());\n    println!(\"{:?}\", *r);\n}\n",
   "stdout": "1 1\ntrue\ntrue\n[\"soup\", \"pie\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1\ntrue\ntrue\n[\"soup\", \"pie\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/predict_rwlock"
    }
   ]
  },
  "predict_scope.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let prices = [4, 8, 15, 16, 23, 42];\n    let (left, right) = prices.split_at(3);\n    let mut a = 0;\n    let mut b = 0;\n    thread::scope(|s| {\n        s.spawn(|| a = left.iter().sum());\n        s.spawn(|| b = right.iter().sum());\n    });\n    println!(\"left {a}, right {b}\");\n    println!(\"all {}\", a + b);\n    println!(\"prices still here: {}\", prices.len());\n}\n",
   "stdout": "left 27, right 81\nall 108\nprices still here: 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "left 27, right 81\nall 108\nprices still here: 6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/predict_scope"
    }
   ]
  },
  "predict_send.rs": {
   "src": "use std::rc::Rc;\nuse std::sync::Arc;\nuse std::thread;\n\nfn main() {\n    let shared = Arc::new(5);\n    let local = Rc::new(7);\n    let s = Arc::clone(&shared);\n    let worker = thread::spawn(move || *s + 1);\n    println!(\"{}\", worker.join().unwrap());\n    let l = Rc::clone(&local);\n    let other = thread::spawn(move || *l + 1);\n    println!(\"{}\", other.join().unwrap());\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Rc<i32>` cannot be sent between threads safely\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                 ------------- -------^^^^^^^\n   |                 |             |\n   |                 |             `Rc<i32>` cannot be sent between threads safely\n   |                 |             within this `{closure@src/main.rs:12:31: 12:38}`\n   |                 required by a bound introduced by this call\n   |\n   = help: within `{closure@src/main.rs:12:31: 12:38}`, the trait `Send` is not implemented for `Rc<i32>`\nnote: required because it's used within this closure\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                               ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Rc<i32>` cannot be sent between threads safely\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                 ------------- -------^^^^^^^\n   |                 |             |\n   |                 |             `Rc<i32>` cannot be sent between threads safely\n   |                 |             within this `{closure@src/main.rs:12:31: 12:38}`\n   |                 required by a bound introduced by this call\n   |\n   = help: within `{closure@src/main.rs:12:31: 12:38}`, the trait `Send` is not implemented for `Rc<i32>`\nnote: required because it's used within this closure\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                               ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/predict_send"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Rc<i32>` cannot be sent between threads safely\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                 ------------- -------^^^^^^^\n   |                 |             |\n   |                 |             `Rc<i32>` cannot be sent between threads safely\n   |                 |             within this `{closure@src/main.rs:12:31: 12:38}`\n   |                 required by a bound introduced by this call\n   |\n   = help: within `{closure@src/main.rs:12:31: 12:38}`, the trait `Send` is not implemented for `Rc<i32>`\nnote: required because it's used within this closure\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                               ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Rc<i32>` cannot be sent between threads safely\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                 ------------- -------^^^^^^^\n   |                 |             |\n   |                 |             `Rc<i32>` cannot be sent between threads safely\n   |                 |             within this `{closure@src/main.rs:12:31: 12:38}`\n   |                 required by a bound introduced by this call\n   |\n   = help: within `{closure@src/main.rs:12:31: 12:38}`, the trait `Send` is not implemented for `Rc<i32>`\nnote: required because it's used within this closure\n  --> src/main.rs:12:31\n   |\n12 |     let other = thread::spawn(move || *l + 1);\n   |                               ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch26/predict_send"
     }
    ]
   }
  },
  "rail_machine.rs": {
   "src": "use std::sync::mpsc;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    tx.send(\"soup\").unwrap();\n    println!(\"send, then recv: {:?}\", rx.recv());\n    println!(\"try_recv on an empty rail: {:?}\", rx.try_recv());\n    drop(tx);\n    println!(\"recv after every sender is gone: {:?}\", rx.recv());\n\n    let (tx2, rx2) = mpsc::channel::<&str>();\n    drop(rx2);\n    println!(\"send after the receiver is gone: {:?}\", tx2.send(\"pie\"));\n\n    let (short, _rx3) = mpsc::sync_channel(1);\n    println!(\"try_send, room for 1: {:?}\", short.try_send(\"tea\"));\n    println!(\"try_send on a full rail: {:?}\", short.try_send(\"cake\"));\n}\n",
   "stdout": "send, then recv: Ok(\"soup\")\ntry_recv on an empty rail: Err(Empty)\nrecv after every sender is gone: Err(RecvError)\nsend after the receiver is gone: Err(SendError { .. })\ntry_send, room for 1: Ok(())\ntry_send on a full rail: Err(TrySendError::Full(..))\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "send, then recv: Ok(\"soup\")\ntry_recv on an empty rail: Err(Empty)\nrecv after every sender is gone: Err(RecvError)\nsend after the receiver is gone: Err(SendError { .. })\ntry_send, room for 1: Ok(())\ntry_send on a full rail: Err(TrySendError::Full(..))\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/rail_machine"
    }
   ]
  },
  "rail_panic.rs": {
   "src": "use std::sync::mpsc;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    drop(rx);\n    tx.send(\"pie\").unwrap();\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:6:20:\ncalled `Result::unwrap()` on an `Err` value: SendError { .. }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:6:20:\ncalled `Result::unwrap()` on an `Err` value: SendError { .. }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch26/rail_panic"
    }
   ]
  },
  "rc_thread.rs": {
   "src": "use std::rc::Rc;\nuse std::thread;\n\nfn main() {\n    let recipes = Rc::new(vec![\"soup\", \"pie\"]);\n    let copy = Rc::clone(&recipes);\n    let cook = thread::spawn(move || {\n        println!(\"{} recipes\", copy.len());\n    });\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Rc<Vec<&str>>` cannot be sent between threads safely\n --> src/main.rs:7:30\n  |\n7 |       let cook = thread::spawn(move || {\n  |                  ------------- ^------\n  |                  |             |\n  |  ________________|_____________within this `{closure@src/main.rs:7:30: 7:37}`\n  | |                |\n  | |                required by a bound introduced by this call\n8 | |         println!(\"{} recipes\", copy.len());\n9 | |     });\n  | |_____^ `Rc<Vec<&str>>` cannot be sent between threads safely\n  |\n  = help: within `{closure@src/main.rs:7:30: 7:37}`, the trait `Send` is not implemented for `Rc<Vec<&str>>`\nnote: required because it's used within this closure\n --> src/main.rs:7:30\n  |\n7 |     let cook = thread::spawn(move || {\n  |                              ^^^^^^^\nnote: required by a bound in `spawn`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `rc_thread` (bin \"rc_thread\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Rc<Vec<&str>>` cannot be sent between threads safely\n --> src/main.rs:7:30\n  |\n7 |       let cook = thread::spawn(move || {\n  |                  ------------- ^------\n  |                  |             |\n  |  ________________|_____________within this `{closure@src/main.rs:7:30: 7:37}`\n  | |                |\n  | |                required by a bound introduced by this call\n8 | |         println!(\"{} recipes\", copy.len());\n9 | |     });\n  | |_____^ `Rc<Vec<&str>>` cannot be sent between threads safely\n  |\n  = help: within `{closure@src/main.rs:7:30: 7:37}`, the trait `Send` is not implemented for `Rc<Vec<&str>>`\nnote: required because it's used within this closure\n --> src/main.rs:7:30\n  |\n7 |     let cook = thread::spawn(move || {\n  |                              ^^^^^^^\nnote: required by a bound in `spawn`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `rc_thread` (bin \"rc_thread\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/rc_thread"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Rc<Vec<&str>>` cannot be sent between threads safely\n --> src/main.rs:7:30\n  |\n7 |       let cook = thread::spawn(move || {\n  |                  ------------- ^------\n  |                  |             |\n  |  ________________|_____________within this `{closure@src/main.rs:7:30: 7:37}`\n  | |                |\n  | |                required by a bound introduced by this call\n8 | |         println!(\"{} recipes\", copy.len());\n9 | |     });\n  | |_____^ `Rc<Vec<&str>>` cannot be sent between threads safely\n  |\n  = help: within `{closure@src/main.rs:7:30: 7:37}`, the trait `Send` is not implemented for `Rc<Vec<&str>>`\nnote: required because it's used within this closure\n --> src/main.rs:7:30\n  |\n7 |     let cook = thread::spawn(move || {\n  |                              ^^^^^^^\nnote: required by a bound in `spawn`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `rc_thread` (bin \"rc_thread\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Rc<Vec<&str>>` cannot be sent between threads safely\n --> src/main.rs:7:30\n  |\n7 |       let cook = thread::spawn(move || {\n  |                  ------------- ^------\n  |                  |             |\n  |  ________________|_____________within this `{closure@src/main.rs:7:30: 7:37}`\n  | |                |\n  | |                required by a bound introduced by this call\n8 | |         println!(\"{} recipes\", copy.len());\n9 | |     });\n  | |_____^ `Rc<Vec<&str>>` cannot be sent between threads safely\n  |\n  = help: within `{closure@src/main.rs:7:30: 7:37}`, the trait `Send` is not implemented for `Rc<Vec<&str>>`\nnote: required because it's used within this closure\n --> src/main.rs:7:30\n  |\n7 |     let cook = thread::spawn(move || {\n  |                              ^^^^^^^\nnote: required by a bound in `spawn`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `rc_thread` (bin \"rc_thread\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch26/rc_thread"
     }
    ]
   }
  },
  "rwlock.rs": {
   "src": "use std::sync::RwLock;\n\nfn main() {\n    let menu = RwLock::new(vec![\"soup\"]);\n    let r1 = menu.read().unwrap();\n    let r2 = menu.read().unwrap();\n    println!(\"two readers at once: {} and {}\", r1.len(), r2.len());\n    println!(\"can a writer get in? {}\", menu.try_write().is_ok());\n    drop(r1);\n    drop(r2);\n    menu.write().unwrap().push(\"pie\");\n    println!(\"after writing: {:?}\", *menu.read().unwrap());\n}\n",
   "stdout": "two readers at once: 1 and 1\ncan a writer get in? false\nafter writing: [\"soup\", \"pie\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "two readers at once: 1 and 1\ncan a writer get in? false\nafter writing: [\"soup\", \"pie\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/rwlock"
    }
   ]
  },
  "same_order.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let knife = Arc::new(Mutex::new(\"knife\"));\n    let board = Arc::new(Mutex::new(\"board\"));\n\n    let (k, b) = (Arc::clone(&knife), Arc::clone(&board));\n    let ana = thread::spawn(move || {\n        let _knife = k.lock().unwrap();\n        let _board = b.lock().unwrap();\n        \"Ana: knife, then board. Chopped!\"\n    });\n\n    let (k, b) = (Arc::clone(&knife), Arc::clone(&board));\n    let ben = thread::spawn(move || {\n        let _knife = k.lock().unwrap();\n        let _board = b.lock().unwrap();\n        \"Ben: knife, then board. Chopped!\"\n    });\n\n    println!(\"{}\", ana.join().unwrap());\n    println!(\"{}\", ben.join().unwrap());\n}\n",
   "stdout": "Ana: knife, then board. Chopped!\nBen: knife, then board. Chopped!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana: knife, then board. Chopped!\nBen: knife, then board. Chopped!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/same_order"
    }
   ]
  },
  "scope_race.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let mut plates = 0;\n    thread::scope(|s| {\n        s.spawn(|| plates += 1);\n        s.spawn(|| plates += 1);\n    });\n    println!(\"plates = {plates}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0499]: cannot borrow `plates` as mutable more than once at a time\n --> src/main.rs:7:17\n  |\n5 |     thread::scope(|s| {\n  |                    - has type `&'1 Scope<'1, '_>`\n6 |         s.spawn(|| plates += 1);\n  |         -----------------------\n  |         |       |  |\n  |         |       |  first borrow occurs due to use of `plates` in closure\n  |         |       first mutable borrow occurs here\n  |         argument requires that `plates` is borrowed for `'1`\n7 |         s.spawn(|| plates += 1);\n  |                 ^^ ------ second borrow occurs due to use of `plates` in closure\n  |                 |\n  |                 second mutable borrow occurs here\n  |\nnote: requirement that the value outlives `'1` introduced here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:203:34\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `scope_race` (bin \"scope_race\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0499]: cannot borrow `plates` as mutable more than once at a time\n --> src/main.rs:7:17\n  |\n5 |     thread::scope(|s| {\n  |                    - has type `&'1 Scope<'1, '_>`\n6 |         s.spawn(|| plates += 1);\n  |         -----------------------\n  |         |       |  |\n  |         |       |  first borrow occurs due to use of `plates` in closure\n  |         |       first mutable borrow occurs here\n  |         argument requires that `plates` is borrowed for `'1`\n7 |         s.spawn(|| plates += 1);\n  |                 ^^ ------ second borrow occurs due to use of `plates` in closure\n  |                 |\n  |                 second mutable borrow occurs here\n  |\nnote: requirement that the value outlives `'1` introduced here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:203:34\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `scope_race` (bin \"scope_race\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/scope_race"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0499]: cannot borrow `plates` as mutable more than once at a time\n --> src/main.rs:7:17\n  |\n5 |     thread::scope(|s| {\n  |                    - has type `&'1 Scope<'1, '_>`\n6 |         s.spawn(|| plates += 1);\n  |         -----------------------\n  |         |       |  |\n  |         |       |  first borrow occurs due to use of `plates` in closure\n  |         |       first mutable borrow occurs here\n  |         argument requires that `plates` is borrowed for `'1`\n7 |         s.spawn(|| plates += 1);\n  |                 ^^ ------ second borrow occurs due to use of `plates` in closure\n  |                 |\n  |                 second mutable borrow occurs here\n  |\nnote: requirement that the value outlives `'1` introduced here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:203:34\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `scope_race` (bin \"scope_race\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0499]: cannot borrow `plates` as mutable more than once at a time\n --> src/main.rs:7:17\n  |\n5 |     thread::scope(|s| {\n  |                    - has type `&'1 Scope<'1, '_>`\n6 |         s.spawn(|| plates += 1);\n  |         -----------------------\n  |         |       |  |\n  |         |       |  first borrow occurs due to use of `plates` in closure\n  |         |       first mutable borrow occurs here\n  |         argument requires that `plates` is borrowed for `'1`\n7 |         s.spawn(|| plates += 1);\n  |                 ^^ ------ second borrow occurs due to use of `plates` in closure\n  |                 |\n  |                 second mutable borrow occurs here\n  |\nnote: requirement that the value outlives `'1` introduced here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:203:34\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `scope_race` (bin \"scope_race\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch26/scope_race"
     }
    ]
   }
  },
  "scoped.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let pantry = vec![3, 1, 4, 1, 5, 9];\n    let mut total = 0;\n    thread::scope(|s| {\n        s.spawn(|| {\n            let big = pantry.iter().filter(|&&n| n > 3).count();\n            println!(\"cook A: {big} big jars\");\n        });\n        s.spawn(|| {\n            total = pantry.iter().sum();\n        });\n    });\n    println!(\"pantry still here: {:?}\", pantry);\n    println!(\"total = {total}\");\n}\n",
   "stdout": "cook A: 3 big jars\npantry still here: [3, 1, 4, 1, 5, 9]\ntotal = 23\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cook A: 3 big jars\npantry still here: [3, 1, 4, 1, 5, 9]\ntotal = 23\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/scoped"
    }
   ]
  },
  "send_moves.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let cook = thread::spawn(move || {\n        let order = String::from(\"soup\");\n        tx.send(order).unwrap();\n        println!(\"sent {order}\");\n    });\n    println!(\"got {}\", rx.recv().unwrap());\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `order`\n --> src/main.rs:9:25\n  |\n7 |         let order = String::from(\"soup\");\n  |             ----- move occurs because `order` has type `String`, which does not implement the `Copy` trait\n8 |         tx.send(order).unwrap();\n  |                 ----- value moved here\n9 |         println!(\"sent {order}\");\n  |                         ^^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `send_moves` (bin \"send_moves\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `order`\n --> src/main.rs:9:25\n  |\n7 |         let order = String::from(\"soup\");\n  |             ----- move occurs because `order` has type `String`, which does not implement the `Copy` trait\n8 |         tx.send(order).unwrap();\n  |                 ----- value moved here\n9 |         println!(\"sent {order}\");\n  |                         ^^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `send_moves` (bin \"send_moves\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/send_moves"
    }
   ]
  },
  "spawn_basic.rs": {
   "src": "use std::thread;\n\nfn main() {\n    println!(\"main: lunch rush! calling a helper\");\n    let helper = thread::spawn(|| {\n        for dish in [\"salad\", \"soup\", \"bread\"] {\n            println!(\"helper: making {dish}\");\n        }\n    });\n    helper.join().unwrap();\n    println!(\"main: helper is done, serving lunch\");\n}\n",
   "stdout": "main: lunch rush! calling a helper\nhelper: making salad\nhelper: making soup\nhelper: making bread\nmain: helper is done, serving lunch\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: lunch rush! calling a helper\nhelper: making salad\nhelper: making soup\nhelper: making bread\nmain: helper is done, serving lunch\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/spawn_basic"
    }
   ]
  },
  "spot_borrow.rs": {
   "src": "use std::thread;\n\nfn count_words(text: &str) -> usize {\n    text.split_whitespace().count()\n}\n\nfn main() {\n    let menu = String::from(\"soup salad pie tea\");\n    let counter = thread::spawn(|| count_words(&menu));\n    let n = counter.join().unwrap();\n    println!(\"{n} items on the menu\");\n}\n",
   "stdout": "",
   "stderr": "error[E0373]: closure may outlive the current function, but it borrows `menu`, which is owned by the current function\n --> src/main.rs:9:33\n  |\n9 |     let counter = thread::spawn(|| count_words(&menu));\n  |                                 ^^              ---- `menu` is borrowed here\n  |                                 |\n  |                                 may outlive borrowed value `menu`\n  |\nnote: function requires argument type to outlive `'static`\n --> src/main.rs:9:19\n  |\n9 |     let counter = thread::spawn(|| count_words(&menu));\n  |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nhelp: to force the closure to take ownership of `menu` (and any other referenced variables), use the `move` keyword\n  |\n9 |     let counter = thread::spawn(move || count_words(&menu));\n  |                                 ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `spot_borrow` (bin \"spot_borrow\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0373]: closure may outlive the current function, but it borrows `menu`, which is owned by the current function\n --> src/main.rs:9:33\n  |\n9 |     let counter = thread::spawn(|| count_words(&menu));\n  |                                 ^^              ---- `menu` is borrowed here\n  |                                 |\n  |                                 may outlive borrowed value `menu`\n  |\nnote: function requires argument type to outlive `'static`\n --> src/main.rs:9:19\n  |\n9 |     let counter = thread::spawn(|| count_words(&menu));\n  |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nhelp: to force the closure to take ownership of `menu` (and any other referenced variables), use the `move` keyword\n  |\n9 |     let counter = thread::spawn(move || count_words(&menu));\n  |                                 ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `spot_borrow` (bin \"spot_borrow\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/spot_borrow"
    }
   ]
  },
  "spot_deadlock.rs": {
   "src": "use std::sync::{Arc, Barrier, Mutex};\nuse std::thread;\n\nfn main() {\n    let pan = Arc::new(Mutex::new(()));\n    let lid = Arc::new(Mutex::new(()));\n    let gate = Arc::new(Barrier::new(2));\n    let (p, l, g) = (Arc::clone(&pan), Arc::clone(&lid), Arc::clone(&gate));\n    let ana = thread::spawn(move || {\n        let _first = p.lock().unwrap();\n        g.wait();\n        let got_both = l.try_lock().is_ok();\n        g.wait();\n        got_both\n    });\n    let (p, l, g) = (Arc::clone(&pan), Arc::clone(&lid), Arc::clone(&gate));\n    let ben = thread::spawn(move || {\n        let _first = l.lock().unwrap();\n        g.wait();\n        let got_both = p.try_lock().is_ok();\n        g.wait();\n        got_both\n    });\n    println!(\"Ana got both: {}\", ana.join().unwrap());\n    println!(\"Ben got both: {}\", ben.join().unwrap());\n}\n",
   "stdout": "Ana got both: false\nBen got both: false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana got both: false\nBen got both: false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/spot_deadlock"
    }
   ]
  },
  "spot_loop.rs": {
   "src": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let tips = Arc::new(Mutex::new(0));\n    let mut waiters = Vec::new();\n    for amount in [2, 3, 5] {\n        waiters.push(thread::spawn(move || {\n            *tips.lock().unwrap() += amount;\n        }));\n    }\n    for w in waiters {\n        w.join().unwrap();\n    }\n    println!(\"tips: {}\", tips.lock().unwrap());\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: the type `Arc` does not implement `Copy`\n  --> src/main.rs:15:26\n   |\n 5 |     let tips = Arc::new(Mutex::new(0));\n   |         ---- this move could be avoided by cloning the original `Arc`, which is inexpensive\n 6 |     let mut waiters = Vec::new();\n 7 |     for amount in [2, 3, 5] {\n   |     ----------------------- inside of this loop\n 8 |         waiters.push(thread::spawn(move || {\n   |                                    ------- value moved into closure here, in previous iteration of loop\n...\n15 |     println!(\"tips: {}\", tips.lock().unwrap());\n   |                          ^^^^ value borrowed here after move\n   |\n   = note: consider using `Arc::clone`\n   = note: borrow occurs due to deref coercion to `std::sync::Mutex<i32>`\nhelp: consider cloning the value before moving it into the closure\n   |\n 8 ~         let value = tips.clone();\n 9 ~         waiters.push(thread::spawn(move || {\n10 ~             *value.lock().unwrap() += amount;\n   |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_loop` (bin \"spot_loop\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: the type `Arc` does not implement `Copy`\n  --> src/main.rs:15:26\n   |\n 5 |     let tips = Arc::new(Mutex::new(0));\n   |         ---- this move could be avoided by cloning the original `Arc`, which is inexpensive\n 6 |     let mut waiters = Vec::new();\n 7 |     for amount in [2, 3, 5] {\n   |     ----------------------- inside of this loop\n 8 |         waiters.push(thread::spawn(move || {\n   |                                    ------- value moved into closure here, in previous iteration of loop\n...\n15 |     println!(\"tips: {}\", tips.lock().unwrap());\n   |                          ^^^^ value borrowed here after move\n   |\n   = note: consider using `Arc::clone`\n   = note: borrow occurs due to deref coercion to `std::sync::Mutex<i32>`\nhelp: consider cloning the value before moving it into the closure\n   |\n 8 ~         let value = tips.clone();\n 9 ~         waiters.push(thread::spawn(move || {\n10 ~             *value.lock().unwrap() += amount;\n   |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_loop` (bin \"spot_loop\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/spot_loop"
    }
   ]
  },
  "spot_send.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let cook = thread::spawn(move || {\n        let soup = vec![\"carrot\", \"leek\"];\n        tx.send(soup).unwrap();\n        println!(\"sent {} vegetables\", soup.len());\n    });\n    println!(\"{:?}\", rx.recv().unwrap());\n    cook.join().unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `soup`\n --> src/main.rs:9:40\n  |\n7 |         let soup = vec![\"carrot\", \"leek\"];\n  |             ---- move occurs because `soup` has type `Vec<&str>`, which does not implement the `Copy` trait\n8 |         tx.send(soup).unwrap();\n  |                 ---- value moved here\n9 |         println!(\"sent {} vegetables\", soup.len());\n  |                                        ^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_send` (bin \"spot_send\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `soup`\n --> src/main.rs:9:40\n  |\n7 |         let soup = vec![\"carrot\", \"leek\"];\n  |             ---- move occurs because `soup` has type `Vec<&str>`, which does not implement the `Copy` trait\n8 |         tx.send(soup).unwrap();\n  |                 ---- value moved here\n9 |         println!(\"sent {} vegetables\", soup.len());\n  |                                        ^^^^ value borrowed here after move\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_send` (bin \"spot_send\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/spot_send"
    }
   ]
  },
  "sync_error.rs": {
   "src": "use std::cell::Cell;\nuse std::thread;\n\nfn main() {\n    let count = Cell::new(0);\n    thread::scope(|s| {\n        s.spawn(|| count.set(count.get() + 1));\n    });\n    println!(\"{}\", count.get());\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Cell<i32>` cannot be shared between threads safely\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |           ----- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `Cell<i32>` cannot be shared between threads safely\n  |           |\n  |           required by a bound introduced by this call\n  |\n  = help: the trait `Sync` is not implemented for `Cell<i32>`\n  = note: if you want to do aliasing and mutation between multiple threads, use `std::sync::RwLock` or `std::sync::atomic::AtomicI32` instead\n  = note: required for `&Cell<i32>` to implement `Send`\nnote: required because it's used within this closure\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |                 ^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `sync_error` (bin \"sync_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Cell<i32>` cannot be shared between threads safely\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |           ----- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `Cell<i32>` cannot be shared between threads safely\n  |           |\n  |           required by a bound introduced by this call\n  |\n  = help: the trait `Sync` is not implemented for `Cell<i32>`\n  = note: if you want to do aliasing and mutation between multiple threads, use `std::sync::RwLock` or `std::sync::atomic::AtomicI32` instead\n  = note: required for `&Cell<i32>` to implement `Send`\nnote: required because it's used within this closure\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |                 ^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `sync_error` (bin \"sync_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch26/sync_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Cell<i32>` cannot be shared between threads safely\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |           ----- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `Cell<i32>` cannot be shared between threads safely\n  |           |\n  |           required by a bound introduced by this call\n  |\n  = help: the trait `Sync` is not implemented for `Cell<i32>`\n  = note: if you want to do aliasing and mutation between multiple threads, use `std::sync::RwLock` or `std::sync::atomic::AtomicI32` instead\n  = note: required for `&Cell<i32>` to implement `Send`\nnote: required because it's used within this closure\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |                 ^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `sync_error` (bin \"sync_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Cell<i32>` cannot be shared between threads safely\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |           ----- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `Cell<i32>` cannot be shared between threads safely\n  |           |\n  |           required by a bound introduced by this call\n  |\n  = help: the trait `Sync` is not implemented for `Cell<i32>`\n  = note: if you want to do aliasing and mutation between multiple threads, use `std::sync::RwLock` or `std::sync::atomic::AtomicI32` instead\n  = note: required for `&Cell<i32>` to implement `Send`\nnote: required because it's used within this closure\n --> src/main.rs:7:17\n  |\n7 |         s.spawn(|| count.set(count.get() + 1));\n  |                 ^^\nnote: required by a bound in `Scope::<'scope, 'env>::spawn`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/scoped.rs:201:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `sync_error` (bin \"sync_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch26/sync_error"
     }
    ]
   }
  },
  "sync_rail.rs": {
   "src": "use std::sync::mpsc;\n\nfn main() {\n    let (tx, rx) = mpsc::sync_channel(2);\n    for n in 1..=4 {\n        match tx.try_send(n) {\n            Ok(()) => println!(\"ticket {n}: on the rail\"),\n            Err(e) => println!(\"ticket {n}: {e}\"),\n        }\n    }\n    println!(\"cook takes ticket {}\", rx.recv().unwrap());\n    println!(\"ticket 5: {:?}\", tx.try_send(5));\n}\n",
   "stdout": "ticket 1: on the rail\nticket 2: on the rail\nticket 3: sending on a full channel\nticket 4: sending on a full channel\ncook takes ticket 1\nticket 5: Ok(())\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "ticket 1: on the rail\nticket 2: on the rail\nticket 3: sending on a full channel\nticket 4: sending on a full channel\ncook takes ticket 1\nticket 5: Ok(())\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/sync_rail"
    }
   ]
  },
  "thread_panic.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let helper = thread::spawn(|| {\n        let eggs: Vec<u32> = Vec::new();\n        println!(\"helper: cracking the first egg\");\n        eggs[0]\n    });\n    match helper.join() {\n        Ok(n) => println!(\"main: got {n}\"),\n        Err(_) => println!(\"main: the helper panicked, but the kitchen is still open\"),\n    }\n}\n",
   "stdout": "helper: cracking the first egg\nmain: the helper panicked, but the kitchen is still open\n",
   "stderr": "\nthread '<unnamed>' (56) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "helper: cracking the first egg\nmain: the helper panicked, but the kitchen is still open\n",
     "err": "\nthread '<unnamed>' (56) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 0,
     "dir": "~/rust-ch26/thread_panic",
     "merged": "helper: cracking the first egg\n\nthread '<unnamed>' (4) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\nmain: the helper panicked, but the kitchen is still open\n"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "helper: cracking the first egg\nmain: the helper panicked, but the kitchen is still open\n",
    "stderr": "\nthread '<unnamed>' (57) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "helper: cracking the first egg\nmain: the helper panicked, but the kitchen is still open\n",
      "err": "\nthread '<unnamed>' (57) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
      "exit": 0,
      "dir": "~/rust-ch26/thread_panic",
      "merged": "helper: cracking the first egg\n\nthread '<unnamed>' (4) panicked at src/main.rs:7:13:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\nmain: the helper panicked, but the kitchen is still open\n"
     }
    ]
   }
  },
  "trace_arc.rs": {
   "src": "use std::sync::Arc;\nuse std::thread;\n\nfn main() {\n    let book = Arc::new(String::from(\"recipes\"));\n    let mut cooks = Vec::new();\n    for _ in 0..3 {\n        let copy = Arc::clone(&book);\n        cooks.push(thread::spawn(move || copy));\n    }\n    println!(\"0 {}\", Arc::strong_count(&book));\n    for (i, c) in cooks.into_iter().enumerate() {\n        let returned = c.join().unwrap();\n        drop(returned);\n        println!(\"{} {}\", i + 1, Arc::strong_count(&book));\n    }\n}\n",
   "stdout": "0 4\n1 3\n2 2\n3 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 4\n1 3\n2 2\n3 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/trace_arc"
    }
   ]
  },
  "trace_channel.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    thread::spawn(move || {\n        for bill in [12, 5, 8, 20] {\n            tx.send(bill).unwrap();\n        }\n    });\n    let mut total = 0;\n    for bill in rx {\n        total += bill;\n        println!(\"{bill} {total}\");\n    }\n}\n",
   "stdout": "12 12\n5 17\n8 25\n20 45\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "12 12\n5 17\n8 25\n20 45\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/trace_channel"
    }
   ]
  },
  "trace_crew.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let mut handles = Vec::new();\n    for cook in 1..=4 {\n        handles.push(thread::spawn(move || cook * cook));\n    }\n    let mut total = 0;\n    for (i, h) in handles.into_iter().enumerate() {\n        let made = h.join().unwrap();\n        total += made;\n        println!(\"{} {} {}\", i + 1, made, total);\n    }\n}\n",
   "stdout": "1 1 1\n2 4 5\n3 9 14\n4 16 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1 1\n2 4 5\n3 9 14\n4 16 30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/trace_crew"
    }
   ]
  },
  "two_cooks.rs": {
   "src": "use std::thread;\n\nfn main() {\n    let ana = thread::spawn(|| {\n        println!(\"ana: wash\");\n        println!(\"ana: dry\");\n    });\n    println!(\"main: plate\");\n    ana.join().unwrap();\n    println!(\"main: serve\");\n}\n",
   "stdout": "main: plate\nana: wash\nana: dry\nmain: serve\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: plate\nana: wash\nana: dry\nmain: serve\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch26/two_cooks"
    }
   ],
   "nondeterministic": true
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
