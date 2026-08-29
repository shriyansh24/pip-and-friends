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
  "workdir": "/home/you/rust-ch8",
  "versionDifferences": [],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. Outputs were identical."
 },
 "programs": {
  "add_note.rs": {
   "src": "fn main() {\n    let mut book = String::from(\"Emma\");\n    add_note(&mut book);\n    println!(\"{book}\");\n}\n\nfn add_note(page: &mut String) {\n    page.push_str(\" (great ending!)\");\n}\n",
   "stdout": "Emma (great ending!)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma (great ending!)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/add_note"
    }
   ]
  },
  "boss_error.rs": {
   "src": "fn main() {\n    let note;\n    {\n        let page = String::from(\"p. 42\");\n        note = &page;\n        println!(\"{note}\");\n    }\n    let copy = note.clone();\n    println!(\"{copy}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0597]: `page` does not live long enough\n --> src/main.rs:5:16\n  |\n4 |         let page = String::from(\"p. 42\");\n  |             ---- binding `page` declared here\n5 |         note = &page;\n  |                ^^^^^ borrowed value does not live long enough\n6 |         println!(\"{note}\");\n7 |     }\n  |     - `page` dropped here while still borrowed\n8 |     let copy = note.clone();\n  |                ---- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0597]: `page` does not live long enough\n --> src/main.rs:5:16\n  |\n4 |         let page = String::from(\"p. 42\");\n  |             ---- binding `page` declared here\n5 |         note = &page;\n  |                ^^^^^ borrowed value does not live long enough\n6 |         println!(\"{note}\");\n7 |     }\n  |     - `page` dropped here while still borrowed\n8 |     let copy = note.clone();\n  |                ---- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/boss_error"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "fn main() {\n    let mut balance = 100;\n    spend(&mut balance, 30);\n    spend(&mut balance, 25);\n    report(&balance);\n}\n\nfn spend(money: &mut i32, cost: i32) {\n    *money -= cost;\n}\n\nfn report(money: &i32) {\n    println!(\"left: {money}\");\n}\n",
   "stdout": "left: 45\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "left: 45\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "fn main() {\n    let mut word = String::from(\"cat\");\n    let look = &word;\n    println!(\"before: {look}\");\n    let pen = &mut word;\n    pen.push_str(\"s\");\n    println!(\"after: {word}\");\n}\n",
   "stdout": "before: cat\nafter: cats\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "before: cat\nafter: cats\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "fn main() {\n    let mut shelf = String::from(\"A\");\n    let n = peek(&shelf);\n    grow(&mut shelf, n);\n    let m = peek(&shelf);\n    grow(&mut shelf, m);\n    println!(\"{shelf} {}\", peek(&shelf));\n}\n\nfn peek(s: &String) -> usize {\n    s.len()\n}\n\nfn grow(s: &mut String, times: usize) {\n    for _ in 0..times {\n        s.push('B');\n    }\n}\n",
   "stdout": "ABBB 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "ABBB 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "fn main() {\n    let mut guests = vec![String::from(\"Ana\")];\n    let host = &guests[0];\n    guests.push(String::from(\"Ben\"));\n    println!(\"{host} welcomes everyone\");\n    println!(\"{} guests\", guests.len());\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `guests` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let host = &guests[0];\n  |                 ------ immutable borrow occurs here\n4 |     guests.push(String::from(\"Ben\"));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"{host} welcomes everyone\");\n  |                ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `guests` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let host = &guests[0];\n  |                 ------ immutable borrow occurs here\n4 |     guests.push(String::from(\"Ben\"));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"{host} welcomes everyone\");\n  |                ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "fn main() {\n    let mut total = 0;\n    let mut best = 0;\n    for pages in [3, 9, 4, 12] {\n        read(&mut total, &mut best, pages);\n        println!(\"{pages} {total} {best}\");\n    }\n}\n\nfn read(total: &mut i32, best: &mut i32, pages: i32) {\n    *total += pages;\n    if pages > *best {\n        *best = pages;\n    }\n}\n",
   "stdout": "3 3 3\n9 12 9\n4 16 9\n12 28 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 3 3\n9 12 9\n4 16 9\n12 28 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/boss_trace"
    }
   ]
  },
  "caps.rs": {
   "src": "fn main() {\n    let mut book = String::from(\"Emma\");\n    println!(\"{book}: len {}, capacity {}\", book.len(), book.capacity());\n    book.push_str(\" (great ending!)\");\n    println!(\"{book}: len {}, capacity {}\", book.len(), book.capacity());\n}\n",
   "stdout": "Emma: len 4, capacity 4\nEmma (great ending!): len 20, capacity 20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma: len 4, capacity 4\nEmma (great ending!): len 20, capacity 20\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/caps"
    }
   ]
  },
  "cn_card_outlives.rs": {
   "src": "fn main() {\n    let r;\n    {\n        let n = 7;\n        r = &n;\n    }\n    println!(\"{r}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0597]: `n` does not live long enough\n --> src/main.rs:5:13\n  |\n4 |         let n = 7;\n  |             - binding `n` declared here\n5 |         r = &n;\n  |             ^^ borrowed value does not live long enough\n6 |     }\n  |     - `n` dropped here while still borrowed\n7 |     println!(\"{r}\");\n  |                - borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `cn_card_outlives` (bin \"cn_card_outlives\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0597]: `n` does not live long enough\n --> src/main.rs:5:13\n  |\n4 |         let n = 7;\n  |             - binding `n` declared here\n5 |         r = &n;\n  |             ^^ borrowed value does not live long enough\n6 |     }\n  |     - `n` dropped here while still borrowed\n7 |     println!(\"{r}\");\n  |                - borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `cn_card_outlives` (bin \"cn_card_outlives\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/cn_card_outlives"
    }
   ]
  },
  "cn_mut_behind.rs": {
   "src": "fn main() {\n    let s = String::from(\"hi\");\n    let a = &s;\n    a.push('!');\n    println!(\"{s}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `*a` as mutable, as it is behind a `&` reference\n --> src/main.rs:4:5\n  |\n4 |     a.push('!');\n  |     ^ `a` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n3 |     let a = &mut s;\n  |              +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `cn_mut_behind` (bin \"cn_mut_behind\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `*a` as mutable, as it is behind a `&` reference\n --> src/main.rs:4:5\n  |\n4 |     a.push('!');\n  |     ^ `a` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n3 |     let a = &mut s;\n  |              +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `cn_mut_behind` (bin \"cn_mut_behind\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/cn_mut_behind"
    }
   ]
  },
  "cn_push_while_reading.rs": {
   "src": "fn main() {\n    let mut v = vec![1, 2, 3];\n    let last = &v[2];\n    v.push(4);\n    println!(\"{last}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let last = &v[2];\n  |                 - immutable borrow occurs here\n4 |     v.push(4);\n  |     ^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"{last}\");\n  |                ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `cn_push_while_reading` (bin \"cn_push_while_reading\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let last = &v[2];\n  |                 - immutable borrow occurs here\n4 |     v.push(4);\n  |     ^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"{last}\");\n  |                ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `cn_push_while_reading` (bin \"cn_push_while_reading\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/cn_push_while_reading"
    }
   ]
  },
  "cn_reader_then_writer.rs": {
   "src": "fn main() {\n    let mut s = String::from(\"hi\");\n    let a = &s;\n    println!(\"{a}\");\n    let b = &mut s;\n    b.push('!');\n    println!(\"{s}\");\n}\n",
   "stdout": "hi\nhi!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hi\nhi!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/cn_reader_then_writer"
    }
   ]
  },
  "cn_scoped_writer.rs": {
   "src": "fn main() {\n    let mut s = String::from(\"hi\");\n    {\n        let w = &mut s;\n        w.push('!');\n    }\n    let r = &s;\n    println!(\"{r}\");\n}\n",
   "stdout": "hi!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hi!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/cn_scoped_writer"
    }
   ]
  },
  "cn_two_readers.rs": {
   "src": "fn main() {\n    let s = String::from(\"hi\");\n    let a = &s;\n    let b = &s;\n    println!(\"{a} {b} {s}\");\n}\n",
   "stdout": "hi hi hi\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "hi hi hi\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/cn_two_readers"
    }
   ]
  },
  "cn_writer_overlap.rs": {
   "src": "fn main() {\n    let mut s = String::from(\"hi\");\n    let a = &mut s;\n    let b = &mut s;\n    b.push('!');\n    a.push('?');\n    println!(\"{s}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0499]: cannot borrow `s` as mutable more than once at a time\n --> src/main.rs:4:13\n  |\n3 |     let a = &mut s;\n  |             ------ first mutable borrow occurs here\n4 |     let b = &mut s;\n  |             ^^^^^^ second mutable borrow occurs here\n5 |     b.push('!');\n6 |     a.push('?');\n  |     - first borrow later used here\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `cn_writer_overlap` (bin \"cn_writer_overlap\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0499]: cannot borrow `s` as mutable more than once at a time\n --> src/main.rs:4:13\n  |\n3 |     let a = &mut s;\n  |             ------ first mutable borrow occurs here\n4 |     let b = &mut s;\n  |             ^^^^^^ second mutable borrow occurs here\n5 |     b.push('!');\n6 |     a.push('?');\n  |     - first borrow later used here\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `cn_writer_overlap` (bin \"cn_writer_overlap\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/cn_writer_overlap"
    }
   ]
  },
  "dangle_fix.rs": {
   "src": "fn main() {\n    let card;\n    let book = String::from(\"Emma\");\n    {\n        card = &book;\n    }\n    println!(\"card says {card}\");\n}\n",
   "stdout": "card says Emma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "card says Emma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/dangle_fix"
    }
   ]
  },
  "dangle_scope.rs": {
   "src": "fn main() {\n    let card;\n    {\n        let book = String::from(\"Emma\");\n        card = &book;\n    }\n    println!(\"card says {card}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0597]: `book` does not live long enough\n --> src/main.rs:5:16\n  |\n4 |         let book = String::from(\"Emma\");\n  |             ---- binding `book` declared here\n5 |         card = &book;\n  |                ^^^^^ borrowed value does not live long enough\n6 |     }\n  |     - `book` dropped here while still borrowed\n7 |     println!(\"card says {card}\");\n  |                          ---- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `dangle_scope` (bin \"dangle_scope\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0597]: `book` does not live long enough\n --> src/main.rs:5:16\n  |\n4 |         let book = String::from(\"Emma\");\n  |             ---- binding `book` declared here\n5 |         card = &book;\n  |                ^^^^^ borrowed value does not live long enough\n6 |     }\n  |     - `book` dropped here while still borrowed\n7 |     println!(\"card says {card}\");\n  |                          ---- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `dangle_scope` (bin \"dangle_scope\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/dangle_scope"
    }
   ]
  },
  "deref.rs": {
   "src": "fn main() {\n    let mut count = 5;\n    let r = &mut count;\n    println!(\"*r reads {}\", *r);\n    *r += 1;\n    println!(\"after *r += 1: {}\", *r);\n    *r = *r * 10;\n    println!(\"after *r = *r * 10: {}\", *r);\n    println!(\"count is now {count}\");\n}\n",
   "stdout": "*r reads 5\nafter *r += 1: 6\nafter *r = *r * 10: 60\ncount is now 60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "*r reads 5\nafter *r += 1: 6\nafter *r = *r * 10: 60\ncount is now 60\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/deref"
    }
   ]
  },
  "deref_predict.rs": {
   "src": "fn main() {\n    let mut score = 10;\n    let r = &mut score;\n    *r += 5;\n    *r = *r * 2;\n    println!(\"{}\", *r - 1);\n    println!(\"{score}\");\n}\n",
   "stdout": "29\n30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "29\n30\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/deref_predict"
    }
   ]
  },
  "fill_borrow.rs": {
   "src": "fn main() {\n    let poem = String::from(\"Roses are red\");\n    let n = count_words(&poem);\n    println!(\"{poem}: {n} words\");\n}\n\nfn count_words(text: &String) -> usize {\n    text.split(' ').count()\n}\n",
   "stdout": "Roses are red: 3 words\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Roses are red: 3 words\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/fill_borrow"
    }
   ]
  },
  "fill_star.rs": {
   "src": "fn main() {\n    let mut lives = 3;\n    lose_one(&mut lives);\n    lose_one(&mut lives);\n    println!(\"lives left: {lives}\");\n}\n\nfn lose_one(n: &mut i32) {\n    *n -= 1;\n}\n",
   "stdout": "lives left: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "lives left: 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/fill_star"
    }
   ]
  },
  "give_back.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let (book, letters) = count_letters(book);\n    println!(\"{book} has {letters} letters\");\n}\n\nfn count_letters(title: String) -> (String, usize) {\n    let n = title.len();\n    (title, n)\n}\n",
   "stdout": "Emma has 4 letters\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma has 4 letters\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/give_back"
    }
   ]
  },
  "guess_ritual.rs": {
   "src": "use std::io;\n\nfn main() {\n    let mut guess = String::new();\n    println!(\"Your guess?\");\n    io::stdin()\n        .read_line(&mut guess)\n        .expect(\"Failed to read line\");\n    println!(\"guess now holds {} letters: {}\", guess.len(), guess.trim());\n}\n",
   "stdout": "Your guess?\nguess now holds 3 letters: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Your guess?\nguess now holds 3 letters: 42\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/guess_ritual"
    }
   ],
   "stdin": "42\n",
   "screen": "Your guess?\n42\nguess now holds 3 letters: 42\n"
  },
  "in_real.rs": {
   "src": "fn main() {\n    let mut scores = vec![3, 5, 8];\n    for s in &scores {\n        print!(\"{s} \");\n    }\n    println!();\n    for s in &mut scores {\n        *s *= 10;\n    }\n    println!(\"{scores:?}\");\n    println!(\"total {}\", total(&scores));\n}\n\nfn total(list: &Vec<i32>) -> i32 {\n    let mut t = 0;\n    for x in list {\n        t += x;\n    }\n    t\n}\n",
   "stdout": "3 5 8 \n[30, 50, 80]\ntotal 160\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 5 8 \n[30, 50, 80]\ntotal 160\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/in_real"
    }
   ]
  },
  "last_use.rs": {
   "src": "fn main() {\n    let mut book = String::from(\"Emma\");\n    let r1 = &book;\n    let r2 = &book;\n    println!(\"{r1} and {r2}\");\n    let w = &mut book;\n    w.push_str(\" (2nd ed.)\");\n    println!(\"{book}\");\n}\n",
   "stdout": "Emma and Emma\nEmma (2nd ed.)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma and Emma\nEmma (2nd ed.)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/last_use"
    }
   ]
  },
  "last_use_late.rs": {
   "src": "fn main() {\n    let mut book = String::from(\"Emma\");\n    let r1 = &book;\n    let r2 = &book;\n    println!(\"{r1} and {r2}\");\n    let w = &mut book;\n    w.push_str(\" (2nd ed.)\");\n    println!(\"{r1}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `book` as mutable because it is also borrowed as immutable\n --> src/main.rs:6:13\n  |\n3 |     let r1 = &book;\n  |              ----- immutable borrow occurs here\n...\n6 |     let w = &mut book;\n  |             ^^^^^^^^^ mutable borrow occurs here\n7 |     w.push_str(\" (2nd ed.)\");\n8 |     println!(\"{r1}\");\n  |                -- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `last_use_late` (bin \"last_use_late\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `book` as mutable because it is also borrowed as immutable\n --> src/main.rs:6:13\n  |\n3 |     let r1 = &book;\n  |              ----- immutable borrow occurs here\n...\n6 |     let w = &mut book;\n  |             ^^^^^^^^^ mutable borrow occurs here\n7 |     w.push_str(\" (2nd ed.)\");\n8 |     println!(\"{r1}\");\n  |                -- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `last_use_late` (bin \"last_use_late\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/last_use_late"
    }
   ]
  },
  "lend.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let letters = count_letters(&book);\n    println!(\"{book} has {letters} letters\");\n}\n\nfn count_letters(title: &String) -> usize {\n    title.len()\n}\n",
   "stdout": "Emma has 4 letters\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma has 4 letters\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/lend"
    }
   ]
  },
  "lend_forget.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let letters = count_letters(book);\n    println!(\"{letters} letters\");\n}\n\nfn count_letters(title: &String) -> usize {\n    title.len()\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:3:33\n  |\n3 |     let letters = count_letters(book);\n  |                   ------------- ^^^^ expected `&String`, found `String`\n  |                   |\n  |                   arguments to this function are incorrect\n  |\nnote: function defined here\n --> src/main.rs:7:4\n  |\n7 | fn count_letters(title: &String) -> usize {\n  |    ^^^^^^^^^^^^^ --------------\nhelp: consider borrowing here\n  |\n3 |     let letters = count_letters(&book);\n  |                                 +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `lend_forget` (bin \"lend_forget\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:3:33\n  |\n3 |     let letters = count_letters(book);\n  |                   ------------- ^^^^ expected `&String`, found `String`\n  |                   |\n  |                   arguments to this function are incorrect\n  |\nnote: function defined here\n --> src/main.rs:7:4\n  |\n7 | fn count_letters(title: &String) -> usize {\n  |    ^^^^^^^^^^^^^ --------------\nhelp: consider borrowing here\n  |\n3 |     let letters = count_letters(&book);\n  |                                 +\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `lend_forget` (bin \"lend_forget\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/lend_forget"
    }
   ]
  },
  "many_readers.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let ana = &book;\n    let ben = &book;\n    let cal = &book;\n    println!(\"Ana reads {ana}, Ben reads {ben}, Cal reads {cal}\");\n    println!(\"The owner still has {book}\");\n}\n",
   "stdout": "Ana reads Emma, Ben reads Emma, Cal reads Emma\nThe owner still has Emma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana reads Emma, Ben reads Emma, Cal reads Emma\nThe owner still has Emma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/many_readers"
    }
   ]
  },
  "move_while_lent.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let card = &book;\n    let gift = book;\n    println!(\"{card} {gift}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0505]: cannot move out of `book` because it is borrowed\n --> src/main.rs:4:16\n  |\n2 |     let book = String::from(\"Emma\");\n  |         ---- binding `book` declared here\n3 |     let card = &book;\n  |                ----- borrow of `book` occurs here\n4 |     let gift = book;\n  |                ^^^^ move out of `book` occurs here\n5 |     println!(\"{card} {gift}\");\n  |                ---- borrow later used here\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n3 |     let card = &book.clone();\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0505`.\nerror: could not compile `move_while_lent` (bin \"move_while_lent\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0505]: cannot move out of `book` because it is borrowed\n --> src/main.rs:4:16\n  |\n2 |     let book = String::from(\"Emma\");\n  |         ---- binding `book` declared here\n3 |     let card = &book;\n  |                ----- borrow of `book` occurs here\n4 |     let gift = book;\n  |                ^^^^ move out of `book` occurs here\n5 |     println!(\"{card} {gift}\");\n  |                ---- borrow later used here\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n3 |     let card = &book.clone();\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0505`.\nerror: could not compile `move_while_lent` (bin \"move_while_lent\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/move_while_lent"
    }
   ]
  },
  "my_read_line.rs": {
   "src": "fn main() {\n    let mut guess = String::new();\n    pretend_read_line(&mut guess);\n    println!(\"guess now holds {} letters: {}\", guess.len(), guess.trim());\n}\n\nfn pretend_read_line(buffer: &mut String) {\n    buffer.push_str(\"42\\n\");\n}\n",
   "stdout": "guess now holds 3 letters: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "guess now holds 3 letters: 42\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/my_read_line"
    }
   ]
  },
  "no_mut_owner.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    add_note(&mut book);\n    println!(\"{book}\");\n}\n\nfn add_note(page: &mut String) {\n    page.push_str(\" (great ending!)\");\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `book` as mutable, as it is not declared as mutable\n --> src/main.rs:3:14\n  |\n3 |     add_note(&mut book);\n  |              ^^^^^^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n2 |     let mut book = String::from(\"Emma\");\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `no_mut_owner` (bin \"no_mut_owner\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `book` as mutable, as it is not declared as mutable\n --> src/main.rs:3:14\n  |\n3 |     add_note(&mut book);\n  |              ^^^^^^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n2 |     let mut book = String::from(\"Emma\");\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `no_mut_owner` (bin \"no_mut_owner\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/no_mut_owner"
    }
   ]
  },
  "no_star.rs": {
   "src": "fn main() {\n    let mut count = 5;\n    let r = &mut count;\n    r += 1;\n    println!(\"count is now {count}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0368]: binary assignment operation `+=` cannot be applied to type `&mut {integer}`\n --> src/main.rs:4:5\n  |\n4 |     r += 1;\n  |     -^^^^^\n  |     |\n  |     cannot use `+=` on type `&mut {integer}`\n  |\nhelp: `+=` can be used on `{integer}` if you dereference the left-hand side\n  |\n4 |     *r += 1;\n  |     +\n\nFor more information about this error, try `rustc --explain E0368`.\nerror: could not compile `no_star` (bin \"no_star\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0368]: binary assignment operation `+=` cannot be applied to type `&mut {integer}`\n --> src/main.rs:4:5\n  |\n4 |     r += 1;\n  |     -^^^^^\n  |     |\n  |     cannot use `+=` on type `&mut {integer}`\n  |\nhelp: `+=` can be used on `{integer}` if you dereference the left-hand side\n  |\n4 |     *r += 1;\n  |     +\n\nFor more information about this error, try `rustc --explain E0368`.\nerror: could not compile `no_star` (bin \"no_star\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/no_star"
    }
   ]
  },
  "note_behind_ref.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    add_note(&book);\n    println!(\"{book}\");\n}\n\nfn add_note(page: &String) {\n    page.push_str(\" (great ending!)\");\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `*page` as mutable, as it is behind a `&` reference\n --> src/main.rs:8:5\n  |\n8 |     page.push_str(\" (great ending!)\");\n  |     ^^^^ `page` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 | fn add_note(page: &mut String) {\n  |                    +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `note_behind_ref` (bin \"note_behind_ref\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `*page` as mutable, as it is behind a `&` reference\n --> src/main.rs:8:5\n  |\n8 |     page.push_str(\" (great ending!)\");\n  |     ^^^^ `page` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 | fn add_note(page: &mut String) {\n  |                    +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `note_behind_ref` (bin \"note_behind_ref\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/note_behind_ref"
    }
   ]
  },
  "parsons_note.rs": {
   "src": "fn main() {\n    let mut menu = String::from(\"soup\");\n    add_dish(&mut menu);\n    println!(\"Menu: {menu}\");\n}\nfn add_dish(m: &mut String) {\n    m.push_str(\" and bread\");\n}\n",
   "stdout": "Menu: soup and bread\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Menu: soup and bread\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/parsons_note"
    }
   ]
  },
  "predict_lend.rs": {
   "src": "fn main() {\n    let title = String::from(\"Dracula\");\n    let a = count_letters(&title);\n    let b = count_letters(&title) * 2;\n    println!(\"{a} {b}\");\n    println!(\"{title} is still here\");\n}\n\nfn count_letters(t: &String) -> usize {\n    t.len()\n}\n",
   "stdout": "7 14\nDracula is still here\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 14\nDracula is still here\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/predict_lend"
    }
   ]
  },
  "reader_writer.rs": {
   "src": "fn main() {\n    let mut shelf = vec![10, 20, 30];\n    let first = &shelf[0];\n    shelf.push(40);\n    println!(\"first is {first}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `shelf` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let first = &shelf[0];\n  |                  ----- immutable borrow occurs here\n4 |     shelf.push(40);\n  |     ^^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"first is {first}\");\n  |                         ----- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `reader_writer` (bin \"reader_writer\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `shelf` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let first = &shelf[0];\n  |                  ----- immutable borrow occurs here\n4 |     shelf.push(40);\n  |     ^^^^^^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"first is {first}\");\n  |                         ----- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `reader_writer` (bin \"reader_writer\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/reader_writer"
    }
   ]
  },
  "reader_writer_fix.rs": {
   "src": "fn main() {\n    let mut shelf = vec![10, 20, 30];\n    let first = &shelf[0];\n    println!(\"first is {first}\");\n    shelf.push(40);\n    println!(\"shelf is {shelf:?}\");\n}\n",
   "stdout": "first is 10\nshelf is [10, 20, 30, 40]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first is 10\nshelf is [10, 20, 30, 40]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/reader_writer_fix"
    }
   ]
  },
  "ref_basics.rs": {
   "src": "fn main() {\n    let book = String::from(\"Emma\");\n    let r = &book;\n    println!(\"book = {book}\");\n    println!(\"r = {r}\");\n    println!(\"(*r).len() = {}\", (*r).len());\n    println!(\"r.len() = {}\", r.len());\n}\n",
   "stdout": "book = Emma\nr = Emma\n(*r).len() = 4\nr.len() = 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "book = Emma\nr = Emma\n(*r).len() = 4\nr.len() = 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/ref_basics"
    }
   ]
  },
  "sizes.rs": {
   "src": "use std::mem::size_of;\n\nfn main() {\n    println!(\"String:      {} bytes\", size_of::<String>());\n    println!(\"&String:     {} bytes\", size_of::<&String>());\n    println!(\"&mut String: {} bytes\", size_of::<&mut String>());\n    println!(\"&i32:        {} bytes\", size_of::<&i32>());\n    println!(\"&[i32; 1000]: {} bytes\", size_of::<&[i32; 1000]>());\n}\n",
   "stdout": "String:      24 bytes\n&String:     8 bytes\n&mut String: 8 bytes\n&i32:        8 bytes\n&[i32; 1000]: 8 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "String:      24 bytes\n&String:     8 bytes\n&mut String: 8 bytes\n&i32:        8 bytes\n&[i32; 1000]: 8 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/sizes"
    }
   ]
  },
  "spot_dangle.rs": {
   "src": "fn main() {\n    let longest;\n    {\n        let word = String::from(\"library\");\n        longest = &word;\n        println!(\"inside: {longest}\");\n    }\n    println!(\"outside: {longest}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0597]: `word` does not live long enough\n --> src/main.rs:5:19\n  |\n4 |         let word = String::from(\"library\");\n  |             ---- binding `word` declared here\n5 |         longest = &word;\n  |                   ^^^^^ borrowed value does not live long enough\n6 |         println!(\"inside: {longest}\");\n7 |     }\n  |     - `word` dropped here while still borrowed\n8 |     println!(\"outside: {longest}\");\n  |                         ------- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `spot_dangle` (bin \"spot_dangle\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0597]: `word` does not live long enough\n --> src/main.rs:5:19\n  |\n4 |         let word = String::from(\"library\");\n  |             ---- binding `word` declared here\n5 |         longest = &word;\n  |                   ^^^^^ borrowed value does not live long enough\n6 |         println!(\"inside: {longest}\");\n7 |     }\n  |     - `word` dropped here while still borrowed\n8 |     println!(\"outside: {longest}\");\n  |                         ------- borrow later used here\n\nFor more information about this error, try `rustc --explain E0597`.\nerror: could not compile `spot_dangle` (bin \"spot_dangle\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/spot_dangle"
    }
   ]
  },
  "spot_mut.rs": {
   "src": "fn main() {\n    let mut list = String::from(\"milk\");\n    add_item(&mut list, \" and eggs\");\n    println!(\"{list}\");\n}\n\nfn add_item(list: &String, item: &str) {\n    list.push_str(item);\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `*list` as mutable, as it is behind a `&` reference\n --> src/main.rs:8:5\n  |\n8 |     list.push_str(item);\n  |     ^^^^ `list` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 | fn add_item(list: &mut String, item: &str) {\n  |                    +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_mut` (bin \"spot_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `*list` as mutable, as it is behind a `&` reference\n --> src/main.rs:8:5\n  |\n8 |     list.push_str(item);\n  |     ^^^^ `list` is a `&` reference, so it cannot be borrowed as mutable\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 | fn add_item(list: &mut String, item: &str) {\n  |                    +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_mut` (bin \"spot_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/spot_mut"
    }
   ]
  },
  "spot_shelf.rs": {
   "src": "fn main() {\n    let mut names = String::from(\"Ana\");\n    let pen = &mut names;\n    let count = names.len();\n    pen.push_str(\" and Ben\");\n    println!(\"{names} ({count})\");\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `names` as immutable because it is also borrowed as mutable\n --> src/main.rs:4:17\n  |\n3 |     let pen = &mut names;\n  |               ---------- mutable borrow occurs here\n4 |     let count = names.len();\n  |                 ^^^^^ immutable borrow occurs here\n5 |     pen.push_str(\" and Ben\");\n  |     --- mutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `spot_shelf` (bin \"spot_shelf\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `names` as immutable because it is also borrowed as mutable\n --> src/main.rs:4:17\n  |\n3 |     let pen = &mut names;\n  |               ---------- mutable borrow occurs here\n4 |     let count = names.len();\n  |                 ^^^^^ immutable borrow occurs here\n5 |     pen.push_str(\" and Ben\");\n  |     --- mutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `spot_shelf` (bin \"spot_shelf\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/spot_shelf"
    }
   ]
  },
  "trace_counter.rs": {
   "src": "fn main() {\n    let mut stamps = 0;\n    for pile in 1..=4 {\n        add_stamps(&mut stamps, pile);\n        println!(\"{pile} {stamps}\");\n    }\n}\n\nfn add_stamps(total: &mut i32, n: i32) {\n    *total += n;\n}\n",
   "stdout": "1 1\n2 3\n3 6\n4 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1\n2 3\n3 6\n4 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch8/trace_counter"
    }
   ]
  },
  "two_writers.rs": {
   "src": "fn main() {\n    let mut book = String::from(\"Emma\");\n    let ana = &mut book;\n    let ben = &mut book;\n    ana.push_str(\" (Ana was here)\");\n    ben.push_str(\" (Ben was here)\");\n    println!(\"{book}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0499]: cannot borrow `book` as mutable more than once at a time\n --> src/main.rs:4:15\n  |\n3 |     let ana = &mut book;\n  |               --------- first mutable borrow occurs here\n4 |     let ben = &mut book;\n  |               ^^^^^^^^^ second mutable borrow occurs here\n5 |     ana.push_str(\" (Ana was here)\");\n  |     --- first borrow later used here\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `two_writers` (bin \"two_writers\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0499]: cannot borrow `book` as mutable more than once at a time\n --> src/main.rs:4:15\n  |\n3 |     let ana = &mut book;\n  |               --------- first mutable borrow occurs here\n4 |     let ben = &mut book;\n  |               ^^^^^^^^^ second mutable borrow occurs here\n5 |     ana.push_str(\" (Ana was here)\");\n  |     --- first borrow later used here\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `two_writers` (bin \"two_writers\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch8/two_writers"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
