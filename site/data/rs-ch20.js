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
  "workdir": "/home/you/rust-ch20",
  "versionDifferences": [
   "boss_error.rs",
   "boss_spot.rs",
   "collect_untyped.rs",
   "consumed_twice.rs",
   "vec_not_iter.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.rs, boss_spot.rs, collect_untyped.rs, consumed_twice.rs, vec_not_iter.rs."
 },
 "programs": {
  "adapters_join.rs": {
   "src": "fn main() {\n    let titles = [\"Dune\", \"Emma\", \"Coraline\"];\n    let pages = [412, 474, 162];\n    let pairs: Vec<(&str, i32)> = titles.iter().copied().zip(pages.iter().copied()).collect();\n    println!(\"zip        {pairs:?}\");\n\n    let morning = [1, 2];\n    let evening = [8, 9];\n    let day: Vec<i32> = morning.iter().chain(evening.iter()).copied().collect();\n    println!(\"chain      {day:?}\");\n\n    let shelves = vec![vec![\"Dune\", \"Emma\"], vec![\"Coraline\"]];\n    let all: Vec<&str> = shelves.iter().flat_map(|s| s.iter().copied()).collect();\n    println!(\"flat_map   {all:?}\");\n\n    let typed = [\"12\", \"x\", \"7\", \"\", \"30\"];\n    let numbers: Vec<i32> = typed.iter().filter_map(|s| s.parse().ok()).collect();\n    println!(\"filter_map {numbers:?}\");\n\n    let temps = [18, 21, 19, 25];\n    for w in temps.windows(2) {\n        println!(\"windows    {w:?} change {}\", w[1] - w[0]);\n    }\n    for c in temps.chunks(3) {\n        println!(\"chunks     {c:?}\");\n    }\n\n    let mut queue = [3, 3, 5].iter().peekable();\n    while let Some(n) = queue.next() {\n        if queue.peek() == Some(&n) {\n            println!(\"peekable   {n} again next\");\n        } else {\n            println!(\"peekable   {n}\");\n        }\n    }\n}\n",
   "stdout": "zip        [(\"Dune\", 412), (\"Emma\", 474), (\"Coraline\", 162)]\nchain      [1, 2, 8, 9]\nflat_map   [\"Dune\", \"Emma\", \"Coraline\"]\nfilter_map [12, 7, 30]\nwindows    [18, 21] change 3\nwindows    [21, 19] change -2\nwindows    [19, 25] change 6\nchunks     [18, 21, 19]\nchunks     [25]\npeekable   3 again next\npeekable   3\npeekable   5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "zip        [(\"Dune\", 412), (\"Emma\", 474), (\"Coraline\", 162)]\nchain      [1, 2, 8, 9]\nflat_map   [\"Dune\", \"Emma\", \"Coraline\"]\nfilter_map [12, 7, 30]\nwindows    [18, 21] change 3\nwindows    [21, 19] change -2\nwindows    [19, 25] change 6\nchunks     [18, 21, 19]\nchunks     [25]\npeekable   3 again next\npeekable   3\npeekable   5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/adapters_join"
    }
   ]
  },
  "adapters_shape.rs": {
   "src": "fn main() {\n    let pages = [412, 474, 162, 98, 305, 640];\n\n    let hundreds: Vec<i32> = pages.iter().map(|p| p / 100).collect();\n    println!(\"map      {hundreds:?}\");\n\n    let long: Vec<&i32> = pages.iter().filter(|p| **p > 300).collect();\n    println!(\"filter   {long:?}\");\n\n    let first_two: Vec<&i32> = pages.iter().take(2).collect();\n    println!(\"take     {first_two:?}\");\n\n    let rest: Vec<&i32> = pages.iter().skip(4).collect();\n    println!(\"skip     {rest:?}\");\n\n    let every_other: Vec<&i32> = pages.iter().step_by(2).collect();\n    println!(\"step_by  {every_other:?}\");\n\n    let backwards: Vec<&i32> = pages.iter().rev().collect();\n    println!(\"rev      {backwards:?}\");\n\n    for (i, p) in pages.iter().enumerate().skip(4) {\n        println!(\"enumerate shelf {i}: {p} pages\");\n    }\n}\n",
   "stdout": "map      [4, 4, 1, 0, 3, 6]\nfilter   [412, 474, 305, 640]\ntake     [412, 474]\nskip     [305, 640]\nstep_by  [412, 162, 305]\nrev      [640, 305, 98, 162, 474, 412]\nenumerate shelf 4: 305 pages\nenumerate shelf 5: 640 pages\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "map      [4, 4, 1, 0, 3, 6]\nfilter   [412, 474, 305, 640]\ntake     [412, 474]\nskip     [305, 640]\nstep_by  [412, 162, 305]\nrev      [640, 305, 98, 162, 474, 412]\nenumerate shelf 4: 305 pages\nenumerate shelf 5: 640 pages\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/adapters_shape"
    }
   ]
  },
  "bare_trait.rs": {
   "src": "fn make_adder(n: i32) -> Fn(i32) -> i32 {\n    move |x| x + n\n}\n\nfn main() {\n    let add_five = make_adder(5);\n    println!(\"{}\", add_five(1));\n}\n",
   "stdout": "",
   "stderr": "error[E0782]: expected a type, found a trait\n --> src/main.rs:1:26\n  |\n1 | fn make_adder(n: i32) -> Fn(i32) -> i32 {\n  |                          ^^^^^^^^^^^^^^\n  |\nhelp: use `impl Fn(i32) -> i32` to return an opaque type, as long as you return a single underlying type\n  |\n1 | fn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n  |                          ++++\nhelp: alternatively, you can return an owned trait object\n  |\n1 | fn make_adder(n: i32) -> Box<dyn Fn(i32) -> i32> {\n  |                          +++++++               +\n\nFor more information about this error, try `rustc --explain E0782`.\nerror: could not compile `bare_trait` (bin \"bare_trait\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0782]: expected a type, found a trait\n --> src/main.rs:1:26\n  |\n1 | fn make_adder(n: i32) -> Fn(i32) -> i32 {\n  |                          ^^^^^^^^^^^^^^\n  |\nhelp: use `impl Fn(i32) -> i32` to return an opaque type, as long as you return a single underlying type\n  |\n1 | fn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n  |                          ++++\nhelp: alternatively, you can return an owned trait object\n  |\n1 | fn make_adder(n: i32) -> Box<dyn Fn(i32) -> i32> {\n  |                          +++++++               +\n\nFor more information about this error, try `rustc --explain E0782`.\nerror: could not compile `bare_trait` (bin \"bare_trait\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/bare_trait"
    }
   ]
  },
  "boss_error.rs": {
   "src": "fn main() {\n    let fines = [25, 50, 10];\n    let total = fines.iter().map(|f| f * 2).sum();\n    println!(\"total fines: {total}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let total = fines.iter().map(|f| f * 2).sum();\n  |         ^^^^^                               --- type must be known at this point\n  |\n  = note: the type must implement `Sum<i32>`\nhelp: the trait `Sum` is implemented for `i32`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/accum.rs:50:8\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/accum.rs:206:0\n  |\n  = note: in this macro invocation\nnote: required by a bound in `std::iter::Iterator::sum`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:3665:4\n  = note: this error originates in the macro `integer_sum_product` (in Nightly builds, run with -Z macro-backtrace for more info)\nhelp: consider giving `total` an explicit type, where the type for type parameter `S` is specified\n  |\n3 |     let total: i32 = fines.iter().map(|f| f * 2).sum();\n  |              +++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let total = fines.iter().map(|f| f * 2).sum();\n  |         ^^^^^                               --- type must be known at this point\n  |\n  = note: the type must implement `Sum<i32>`\nhelp: the trait `Sum` is implemented for `i32`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/accum.rs:50:8\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/accum.rs:206:0\n  |\n  = note: in this macro invocation\nnote: required by a bound in `std::iter::Iterator::sum`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:3665:4\n  = note: this error originates in the macro `integer_sum_product` (in Nightly builds, run with -Z macro-backtrace for more info)\nhelp: consider giving `total` an explicit type, where the type for type parameter `S` is specified\n  |\n3 |     let total: i32 = fines.iter().map(|f| f * 2).sum();\n  |              +++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let total = fines.iter().map(|f| f * 2).sum();\n  |         ^^^^^                               --- type must be known at this point\n  |\n  = note: the type must implement `Sum<i32>`\nhelp: the trait `Sum` is implemented for `i32`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/accum.rs:50:8\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/accum.rs:206:0\n  |\n  = note: in this macro invocation\nnote: required by a bound in `std::iter::Iterator::sum`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:3669:4\n  = note: this error originates in the macro `integer_sum_product` (in Nightly builds, run with -Z macro-backtrace for more info)\nhelp: consider giving `total` an explicit type, where the type for type parameter `S` is specified\n  |\n3 |     let total: i32 = fines.iter().map(|f| f * 2).sum();\n  |              +++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let total = fines.iter().map(|f| f * 2).sum();\n  |         ^^^^^                               --- type must be known at this point\n  |\n  = note: the type must implement `Sum<i32>`\nhelp: the trait `Sum` is implemented for `i32`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/accum.rs:50:8\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/accum.rs:206:0\n  |\n  = note: in this macro invocation\nnote: required by a bound in `std::iter::Iterator::sum`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:3669:4\n  = note: this error originates in the macro `integer_sum_product` (in Nightly builds, run with -Z macro-backtrace for more info)\nhelp: consider giving `total` an explicit type, where the type for type parameter `S` is specified\n  |\n3 |     let total: i32 = fines.iter().map(|f| f * 2).sum();\n  |              +++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch20/boss_error"
     }
    ]
   }
  },
  "boss_fill.rs": {
   "src": "fn make_ticket_machine(start: u32) -> impl FnMut() -> u32 {\n    let mut next = start;\n    move || {\n        let ticket = next;\n        next += 1;\n        ticket\n    }\n}\n\nfn main() {\n    let mut take_ticket = make_ticket_machine(41);\n    let first = take_ticket();\n    let second = take_ticket();\n    let more: Vec<u32> = (0..3).map(|_| take_ticket()).collect();\n    println!(\"{first} {second} {more:?}\");\n}\n",
   "stdout": "41 42 [43, 44, 45]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "41 42 [43, 44, 45]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "fn main() {\n    let loans = [(\"Dune\", 3), (\"Emma\", 12), (\"Heidi\", 9), (\"Coraline\", 15)];\n    let limit = 10;\n    let overdue: Vec<String> = loans\n        .iter()\n        .filter(|(_, days)| *days > limit)\n        .map(|(title, days)| format!(\"{title} +{}\", days - limit))\n        .collect();\n    println!(\"{}\", overdue.join(\", \"));\n}\n",
   "stdout": "Emma +2, Coraline +5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma +2, Coraline +5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "fn main() {\n    let mut calls = 0;\n    let mut counted_double = |n: i32| {\n        calls += 1;\n        n * 2\n    };\n    let doubled: Vec<i32> = [4, 1, 7]\n        .iter()\n        .map(|n| counted_double(*n))\n        .take(2)\n        .collect();\n    println!(\"{doubled:?} after {calls} calls\");\n\n    let limit = 5;\n    let under: Vec<&i32> = doubled.iter().filter(|d| **d < limit).collect();\n    println!(\"{under:?} {}\", under.is_empty());\n}\n",
   "stdout": "[8, 2] after 2 calls\n[2] false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[8, 2] after 2 calls\n[2] false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "fn main() {\n    let titles = vec![\"dune\", \"emma\", \"heidi\"];\n    let mut stamped = Vec::new();\n    titles.iter().map(|t| stamped.push(t.to_uppercase()));\n    println!(\"stamped {} books: {stamped:?}\", stamped.len());\n}\n",
   "stdout": "stamped 0 books: []\n",
   "stderr": "warning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\nwarning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stamped 0 books: []\n",
     "err": "warning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\nwarning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\n",
     "exit": 0,
     "dir": "~/rust-ch20/boss_spot",
     "merged": "warning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\nwarning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\nstamped 0 books: []\n"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "stamped 0 books: []\n",
    "stderr": "warning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\nwarning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "stamped 0 books: []\n",
      "err": "warning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\nwarning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\n",
      "exit": 0,
      "dir": "~/rust-ch20/boss_spot",
      "merged": "warning: unused `Map` that must be used\n --> src/main.rs:4:5\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n4 |     let _ = titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |     +++++++\n\nwarning: `Iterator::map` call that discard the iterator's values\n --> src/main.rs:4:19\n  |\n4 |     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n  |                   ^^^^----------------------------------^\n  |                   |   |\n  |                   |   this function returns `()`, which is likely not what you wanted\n  |                   |   called `Iterator::map` with callable that returns `()`\n  |                   after this call to map, the resulting iterator is `impl Iterator<Item = ()>`, which means the only information carried by the iterator is the number of items\n  |\n  = note: `Iterator::map`, like many of the methods on `Iterator`, gets executed lazily, meaning that its effects won't be visible until it is iterated\n  = note: `#[warn(map_unit_fn)]` (part of `#[warn(unused)]`) on by default\nhelp: you might have meant to use `Iterator::for_each`\n  |\n4 -     titles.iter().map(|t| stamped.push(t.to_uppercase()));\n4 +     titles.iter().for_each(|t| stamped.push(t.to_uppercase()));\n  |\n\nstamped 0 books: []\n"
     }
    ]
   }
  },
  "boss_trace.rs": {
   "src": "fn main() {\n    let typed = [\"4\", \"ten\", \"6\", \"x\", \"5\"];\n    let mut running = 0;\n    for (shelf, n) in typed.iter().enumerate().filter_map(|(i, s)| s.parse::<i32>().ok().map(|n| (i, n))) {\n        running += n;\n        println!(\"{shelf} {n} {running}\");\n    }\n}\n",
   "stdout": "0 4 4\n2 6 10\n4 5 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 4 4\n2 6 10\n4 5 15\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/boss_trace"
    }
   ]
  },
  "capture_move.rs": {
   "src": "fn main() {\n    let name = String::from(\"Mabel\");\n    let greet = || println!(\"Hi, {name}\");\n    greet();\n    greet();\n\n    let shout = move || println!(\"HI, {name}!\");\n    shout();\n}\n",
   "stdout": "Hi, Mabel\nHi, Mabel\nHI, Mabel!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Hi, Mabel\nHi, Mabel\nHI, Mabel!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/capture_move"
    }
   ]
  },
  "capture_mut.rs": {
   "src": "fn main() {\n    let mut stamped = 0;\n    let mut stamp = || {\n        stamped += 1;\n        println!(\"stamp! ({stamped} so far)\");\n    };\n\n    stamp();\n    stamp();\n    stamp();\n    println!(\"total stamped: {stamped}\");\n}\n",
   "stdout": "stamp! (1 so far)\nstamp! (2 so far)\nstamp! (3 so far)\ntotal stamped: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stamp! (1 so far)\nstamp! (2 so far)\nstamp! (3 so far)\ntotal stamped: 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/capture_mut"
    }
   ]
  },
  "capture_mut_clash.rs": {
   "src": "fn main() {\n    let mut stamped = 0;\n    let mut stamp = || {\n        stamped += 1;\n    };\n\n    stamp();\n    println!(\"so far: {stamped}\");\n    stamp();\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `stamped` as immutable because it is also borrowed as mutable\n --> src/main.rs:8:24\n  |\n3 |     let mut stamp = || {\n  |                     -- mutable borrow occurs here\n4 |         stamped += 1;\n  |         ------- first borrow occurs due to use of `stamped` in closure\n...\n8 |     println!(\"so far: {stamped}\");\n  |                        ^^^^^^^ immutable borrow occurs here\n9 |     stamp();\n  |     ----- mutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `capture_mut_clash` (bin \"capture_mut_clash\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `stamped` as immutable because it is also borrowed as mutable\n --> src/main.rs:8:24\n  |\n3 |     let mut stamp = || {\n  |                     -- mutable borrow occurs here\n4 |         stamped += 1;\n  |         ------- first borrow occurs due to use of `stamped` in closure\n...\n8 |     println!(\"so far: {stamped}\");\n  |                        ^^^^^^^ immutable borrow occurs here\n9 |     stamp();\n  |     ----- mutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `capture_mut_clash` (bin \"capture_mut_clash\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/capture_mut_clash"
    }
   ]
  },
  "capture_ref.rs": {
   "src": "fn main() {\n    let name = String::from(\"Mabel\");\n    let greet = || println!(\"Hello, {name}!\");\n\n    greet();\n    greet();\n    println!(\"{name} still owns her name: {} letters\", name.len());\n}\n",
   "stdout": "Hello, Mabel!\nHello, Mabel!\nMabel still owns her name: 5 letters\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Hello, Mabel!\nHello, Mabel!\nMabel still owns her name: 5 letters\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/capture_ref"
    }
   ]
  },
  "closure_types.rs": {
   "src": "fn main() {\n    let echo = |x| x;\n    let a = echo(String::from(\"owl\"));\n    let b = echo(5);\n    println!(\"{a} {b}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:4:18\n  |\n4 |     let b = echo(5);\n  |             ---- ^ expected `String`, found integer\n  |             |\n  |             arguments to this function are incorrect\n  |\nnote: expected because the closure was earlier called with an argument of type `String`\n --> src/main.rs:3:18\n  |\n3 |     let a = echo(String::from(\"owl\"));\n  |             ---- ^^^^^^^^^^^^^^^^^^^ expected because this argument is of type `String`\n  |             |\n  |             in this closure call\nnote: closure parameter defined here\n --> src/main.rs:2:17\n  |\n2 |     let echo = |x| x;\n  |                 ^\nhelp: try using a conversion method\n  |\n4 |     let b = echo(5.to_string());\n  |                   ++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `closure_types` (bin \"closure_types\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:4:18\n  |\n4 |     let b = echo(5);\n  |             ---- ^ expected `String`, found integer\n  |             |\n  |             arguments to this function are incorrect\n  |\nnote: expected because the closure was earlier called with an argument of type `String`\n --> src/main.rs:3:18\n  |\n3 |     let a = echo(String::from(\"owl\"));\n  |             ---- ^^^^^^^^^^^^^^^^^^^ expected because this argument is of type `String`\n  |             |\n  |             in this closure call\nnote: closure parameter defined here\n --> src/main.rs:2:17\n  |\n2 |     let echo = |x| x;\n  |                 ^\nhelp: try using a conversion method\n  |\n4 |     let b = echo(5.to_string());\n  |                   ++++++++++++\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `closure_types` (bin \"closure_types\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/closure_types"
    }
   ]
  },
  "collect_chain.rs": {
   "src": "fn main() {\n    let pages = vec![412, 474, 162];\n    let n = pages.iter().map(|p| p * 2).collect().len();\n    println!(\"{n}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0282]: type annotations needed\n --> src/main.rs:3:41\n  |\n3 |     let n = pages.iter().map(|p| p * 2).collect().len();\n  |                                         ^^^^^^^ cannot infer type of the type parameter `B` declared on the method `collect`\n  |\nhelp: consider specifying the generic argument\n  |\n3 |     let n = pages.iter().map(|p| p * 2).collect::<Vec<_>>().len();\n  |                                                ++++++++++\n\nFor more information about this error, try `rustc --explain E0282`.\nerror: could not compile `collect_chain` (bin \"collect_chain\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0282]: type annotations needed\n --> src/main.rs:3:41\n  |\n3 |     let n = pages.iter().map(|p| p * 2).collect().len();\n  |                                         ^^^^^^^ cannot infer type of the type parameter `B` declared on the method `collect`\n  |\nhelp: consider specifying the generic argument\n  |\n3 |     let n = pages.iter().map(|p| p * 2).collect::<Vec<_>>().len();\n  |                                                ++++++++++\n\nFor more information about this error, try `rustc --explain E0282`.\nerror: could not compile `collect_chain` (bin \"collect_chain\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/collect_chain"
    }
   ]
  },
  "collect_kinds.rs": {
   "src": "use std::collections::{BTreeMap, HashMap};\n\nfn main() {\n    let word = \"owl\";\n\n    let letters: Vec<char> = word.chars().collect();\n    println!(\"Vec<char>   {letters:?}\");\n\n    let loud: String = word.chars().map(|c| c.to_ascii_uppercase()).collect();\n    println!(\"String      {loud}\");\n\n    let pages: BTreeMap<&str, i32> = [(\"Emma\", 474), (\"Dune\", 412)].into_iter().collect();\n    println!(\"BTreeMap    {pages:?}\");\n\n    let lookup: HashMap<&str, i32> = [(\"Emma\", 474), (\"Dune\", 412)].into_iter().collect();\n    println!(\"HashMap     Dune has {} pages\", lookup[\"Dune\"]);\n\n    let good = [\"1\", \"2\", \"3\"].iter().map(|s| s.parse::<i32>()).collect::<Result<Vec<i32>, _>>();\n    println!(\"all good    {good:?}\");\n\n    let bad = [\"1\", \"x\", \"3\"].iter().map(|s| s.parse::<i32>()).collect::<Result<Vec<i32>, _>>();\n    println!(\"one bad     {bad:?}\");\n}\n",
   "stdout": "Vec<char>   ['o', 'w', 'l']\nString      OWL\nBTreeMap    {\"Dune\": 412, \"Emma\": 474}\nHashMap     Dune has 412 pages\nall good    Ok([1, 2, 3])\none bad     Err(ParseIntError { kind: InvalidDigit })\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Vec<char>   ['o', 'w', 'l']\nString      OWL\nBTreeMap    {\"Dune\": 412, \"Emma\": 474}\nHashMap     Dune has 412 pages\nall good    Ok([1, 2, 3])\none bad     Err(ParseIntError { kind: InvalidDigit })\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/collect_kinds"
    }
   ]
  },
  "collect_untyped.rs": {
   "src": "fn main() {\n    let pages = vec![412, 474, 162];\n    let doubled = pages.iter().map(|p| p * 2).collect();\n    println!(\"{doubled:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let doubled = pages.iter().map(|p| p * 2).collect();\n  |         ^^^^^^^                               ------- type must be known at this point\n  |\n  = note: the type must implement `FromIterator<i32>`\nnote: required by a bound in `collect`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:2073:4\nhelp: consider giving `doubled` an explicit type\n  |\n3 |     let doubled: Vec<_> = pages.iter().map(|p| p * 2).collect();\n  |                ++++++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `collect_untyped` (bin \"collect_untyped\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let doubled = pages.iter().map(|p| p * 2).collect();\n  |         ^^^^^^^                               ------- type must be known at this point\n  |\n  = note: the type must implement `FromIterator<i32>`\nnote: required by a bound in `collect`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:2073:4\nhelp: consider giving `doubled` an explicit type\n  |\n3 |     let doubled: Vec<_> = pages.iter().map(|p| p * 2).collect();\n  |                ++++++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `collect_untyped` (bin \"collect_untyped\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/collect_untyped"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let doubled = pages.iter().map(|p| p * 2).collect();\n  |         ^^^^^^^                               ------- type must be known at this point\n  |\n  = note: the type must implement `FromIterator<i32>`\nnote: required by a bound in `collect`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:2077:4\nhelp: consider giving `doubled` an explicit type\n  |\n3 |     let doubled: Vec<_> = pages.iter().map(|p| p * 2).collect();\n  |                ++++++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `collect_untyped` (bin \"collect_untyped\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0283]: type annotations needed\n --> src/main.rs:3:9\n  |\n3 |     let doubled = pages.iter().map(|p| p * 2).collect();\n  |         ^^^^^^^                               ------- type must be known at this point\n  |\n  = note: the type must implement `FromIterator<i32>`\nnote: required by a bound in `collect`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:2077:4\nhelp: consider giving `doubled` an explicit type\n  |\n3 |     let doubled: Vec<_> = pages.iter().map(|p| p * 2).collect();\n  |                ++++++++\n\nFor more information about this error, try `rustc --explain E0283`.\nerror: could not compile `collect_untyped` (bin \"collect_untyped\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch20/collect_untyped"
     }
    ]
   }
  },
  "consumed_twice.rs": {
   "src": "fn main() {\n    let pages = vec![412, 474, 162];\n    let belt = pages.iter();\n    let total: i32 = belt.sum();\n    let how_many = belt.count();\n    println!(\"{total} {how_many}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of moved value: `belt`\n --> src/main.rs:5:20\n  |\n3 |     let belt = pages.iter();\n  |         ---- move occurs because `belt` has type `std::slice::Iter<'_, i32>`, which does not implement the `Copy` trait\n4 |     let total: i32 = belt.sum();\n  |                           ----- `belt` moved due to this method call\n5 |     let how_many = belt.count();\n  |                    ^^^^ value used here after move\n  |\nnote: `std::iter::Iterator::sum` takes ownership of the receiver `self`, which moves `belt`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:3665:14\nhelp: you can `clone` the value and consume it, but this might not be your desired behavior\n  |\n4 |     let total: i32 = belt.clone().sum();\n  |                          ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consumed_twice` (bin \"consumed_twice\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of moved value: `belt`\n --> src/main.rs:5:20\n  |\n3 |     let belt = pages.iter();\n  |         ---- move occurs because `belt` has type `std::slice::Iter<'_, i32>`, which does not implement the `Copy` trait\n4 |     let total: i32 = belt.sum();\n  |                           ----- `belt` moved due to this method call\n5 |     let how_many = belt.count();\n  |                    ^^^^ value used here after move\n  |\nnote: `std::iter::Iterator::sum` takes ownership of the receiver `self`, which moves `belt`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/iter/traits/iterator.rs:3665:14\nhelp: you can `clone` the value and consume it, but this might not be your desired behavior\n  |\n4 |     let total: i32 = belt.clone().sum();\n  |                          ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consumed_twice` (bin \"consumed_twice\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/consumed_twice"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0382]: use of moved value: `belt`\n --> src/main.rs:5:20\n  |\n3 |     let belt = pages.iter();\n  |         ---- move occurs because `belt` has type `std::slice::Iter<'_, i32>`, which does not implement the `Copy` trait\n4 |     let total: i32 = belt.sum();\n  |                           ----- `belt` moved due to this method call\n5 |     let how_many = belt.count();\n  |                    ^^^^ value used here after move\n  |\nnote: `std::iter::Iterator::sum` takes ownership of the receiver `self`, which moves `belt`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:3669:14\nhelp: you can `clone` the value and consume it, but this might not be your desired behavior\n  |\n4 |     let total: i32 = belt.clone().sum();\n  |                          ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consumed_twice` (bin \"consumed_twice\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0382]: use of moved value: `belt`\n --> src/main.rs:5:20\n  |\n3 |     let belt = pages.iter();\n  |         ---- move occurs because `belt` has type `std::slice::Iter<'_, i32>`, which does not implement the `Copy` trait\n4 |     let total: i32 = belt.sum();\n  |                           ----- `belt` moved due to this method call\n5 |     let how_many = belt.count();\n  |                    ^^^^ value used here after move\n  |\nnote: `std::iter::Iterator::sum` takes ownership of the receiver `self`, which moves `belt`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/iter/traits/iterator.rs:3669:14\nhelp: you can `clone` the value and consume it, but this might not be your desired behavior\n  |\n4 |     let total: i32 = belt.clone().sum();\n  |                          ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consumed_twice` (bin \"consumed_twice\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch20/consumed_twice"
     }
    ]
   }
  },
  "consumers.rs": {
   "src": "fn main() {\n    let fines = [25, 50, 10, 75, 50];\n\n    let total: i32 = fines.iter().sum();\n    println!(\"sum      {total}\");\n    println!(\"count    {}\", fines.iter().count());\n    println!(\"min      {:?}\", fines.iter().min());\n    println!(\"max      {:?}\", fines.iter().max());\n    println!(\"any      {}\", fines.iter().any(|f| *f > 60));\n    println!(\"all      {}\", fines.iter().all(|f| f % 5 == 0));\n    println!(\"find     {:?}\", fines.iter().find(|f| **f > 30));\n    println!(\"position {:?}\", fines.iter().position(|f| *f == 75));\n    println!(\"last     {:?}\", fines.iter().last());\n\n    let biggest = fines.iter().fold(0, |best, f| if *f > best { *f } else { best });\n    println!(\"fold     {biggest}\");\n\n    let empty: [i32; 0] = [];\n    println!(\"empty    {:?} {}\", empty.iter().max(), empty.iter().sum::<i32>());\n}\n",
   "stdout": "sum      210\ncount    5\nmin      Some(10)\nmax      Some(75)\nany      true\nall      true\nfind     Some(50)\nposition Some(3)\nlast     Some(50)\nfold     75\nempty    None 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "sum      210\ncount    5\nmin      Some(10)\nmax      Some(75)\nany      true\nall      true\nfind     Some(50)\nposition Some(3)\nlast     Some(50)\nfold     75\nempty    None 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/consumers"
    }
   ]
  },
  "countdown.rs": {
   "src": "struct Countdown {\n    left: u32,\n}\n\nimpl Iterator for Countdown {\n    type Item = u32;\n\n    fn next(&mut self) -> Option<u32> {\n        if self.left == 0 {\n            None\n        } else {\n            self.left -= 1;\n            Some(self.left + 1)\n        }\n    }\n}\n\nfn main() {\n    let mut c = Countdown { left: 2 };\n    println!(\"{:?}\", c.next());\n    println!(\"{:?}\", c.next());\n    println!(\"{:?}\", c.next());\n    let odd: Vec<u32> = Countdown { left: 5 }\n        .filter(|n| n % 2 == 1)\n        .collect();\n    println!(\"{odd:?}\");\n    let total: u32 = Countdown { left: 4 }.sum();\n    println!(\"{total}\");\n}\n",
   "stdout": "Some(2)\nSome(1)\nNone\n[5, 3, 1]\n10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(2)\nSome(1)\nNone\n[5, 3, 1]\n10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/countdown"
    }
   ]
  },
  "fill_adder.rs": {
   "src": "fn make_multiplier(times: u32) -> impl Fn(u32) -> u32 {\n    move |x| x * times\n}\n\nfn main() {\n    let double = make_multiplier(2);\n    let triple = make_multiplier(3);\n    println!(\"{} {}\", double(7), triple(7));\n    println!(\"{}\", double(triple(1)));\n}\n",
   "stdout": "14 21\n6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "14 21\n6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fill_adder"
    }
   ]
  },
  "fill_filter_map.rs": {
   "src": "fn main() {\n    let typed = [\"3\", \"three\", \"14\", \"-2\", \"1.5\"];\n    let good: Vec<i32> = typed\n        .iter()\n        .filter_map(|s| s.parse().ok())\n        .collect();\n    println!(\"{good:?}\");\n    let total: i32 = good.iter().sum();\n    println!(\"{total}\");\n}\n",
   "stdout": "[3, 14, -2]\n15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[3, 14, -2]\n15\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fill_filter_map"
    }
   ]
  },
  "fill_iters.rs": {
   "src": "fn main() {\n    let mut titles = vec![String::from(\"dune\"), String::from(\"emma\")];\n    for t in titles.iter_mut() {\n        t.push('!');\n    }\n    for t in titles.iter() {\n        println!(\"{t} has {} letters\", t.len());\n    }\n    let owned: Vec<String> = titles.into_iter().collect();\n    println!(\"{owned:?}\");\n}\n",
   "stdout": "dune! has 5 letters\nemma! has 5 letters\n[\"dune!\", \"emma!\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "dune! has 5 letters\nemma! has 5 letters\n[\"dune!\", \"emma!\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fill_iters"
    }
   ]
  },
  "fill_move.rs": {
   "src": "fn make_greeter(name: String) -> impl Fn() -> String {\n    move || format!(\"Welcome back, {name}!\")\n}\n\nfn main() {\n    let greet_ada = make_greeter(String::from(\"Ada\"));\n    let greet_bo = make_greeter(String::from(\"Bo\"));\n    println!(\"{}\", greet_ada());\n    println!(\"{}\", greet_bo());\n    println!(\"{}\", greet_ada());\n}\n",
   "stdout": "Welcome back, Ada!\nWelcome back, Bo!\nWelcome back, Ada!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Welcome back, Ada!\nWelcome back, Bo!\nWelcome back, Ada!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fill_move"
    }
   ]
  },
  "fill_next.rs": {
   "src": "struct EveryOther {\n    now: u32,\n    end: u32,\n}\n\nimpl Iterator for EveryOther {\n    type Item = u32;\n\n    fn next(&mut self) -> Option<Self::Item> {\n        if self.now > self.end {\n            return None;\n        }\n        let here = self.now;\n        self.now += 2;\n        Some(here)\n    }\n}\n\nfn main() {\n    let shelves: Vec<u32> = EveryOther { now: 1, end: 9 }.collect();\n    println!(\"{shelves:?}\");\n    let total: u32 = EveryOther { now: 2, end: 6 }.sum();\n    println!(\"{total}\");\n}\n",
   "stdout": "[1, 3, 5, 7, 9]\n12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[1, 3, 5, 7, 9]\n12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fill_next"
    }
   ]
  },
  "first_closure.rs": {
   "src": "fn add_one_fn(x: i32) -> i32 {\n    x + 1\n}\n\nfn main() {\n    let add_one = |x| x + 1;\n    let add_one_typed = |x: i32| -> i32 { x + 1 };\n    let shout = |word: &str| {\n        let loud = word.to_uppercase();\n        format!(\"{loud}!\")\n    };\n    let hello = || println!(\"hello from a closure\");\n\n    println!(\"{}\", add_one_fn(4));\n    println!(\"{}\", add_one(4));\n    println!(\"{}\", add_one_typed(4));\n    println!(\"{}\", shout(\"owl\"));\n    hello();\n}\n",
   "stdout": "5\n5\n5\nOWL!\nhello from a closure\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5\n5\n5\nOWL!\nhello from a closure\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/first_closure"
    }
   ]
  },
  "fn_mutate.rs": {
   "src": "fn call_twice<F: Fn()>(f: F) {\n    f();\n    f();\n}\n\nfn main() {\n    let mut n = 0;\n    call_twice(|| n += 1);\n    println!(\"{n}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0594]: cannot assign to `n`, as it is a captured variable in a `Fn` closure\n --> src/main.rs:8:19\n  |\n1 | fn call_twice<F: Fn()>(f: F) {\n  |                           - change this to accept `FnMut` instead of `Fn`\n...\n7 |     let mut n = 0;\n  |         ----- `n` declared here, outside the closure\n8 |     call_twice(|| n += 1);\n  |     ---------- -- ^^^^^^ cannot assign\n  |     |          |\n  |     |          in this closure\n  |     expects `Fn` instead of `FnMut`\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `fn_mutate` (bin \"fn_mutate\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0594]: cannot assign to `n`, as it is a captured variable in a `Fn` closure\n --> src/main.rs:8:19\n  |\n1 | fn call_twice<F: Fn()>(f: F) {\n  |                           - change this to accept `FnMut` instead of `Fn`\n...\n7 |     let mut n = 0;\n  |         ----- `n` declared here, outside the closure\n8 |     call_twice(|| n += 1);\n  |     ---------- -- ^^^^^^ cannot assign\n  |     |          |\n  |     |          in this closure\n  |     expects `Fn` instead of `FnMut`\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `fn_mutate` (bin \"fn_mutate\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/fn_mutate"
    }
   ]
  },
  "fn_no_capture.rs": {
   "src": "fn main() {\n    let cents_per_day = 25;\n\n    fn late_fee(days: u32) -> u32 {\n        days * cents_per_day\n    }\n\n    println!(\"{}\", late_fee(2));\n}\n",
   "stdout": "",
   "stderr": "error[E0434]: can't capture dynamic environment in a fn item\n --> src/main.rs:5:16\n  |\n5 |         days * cents_per_day\n  |                ^^^^^^^^^^^^^\n  |\n  = help: use the `|| { ... }` closure form instead\n\nwarning: unused variable: `cents_per_day`\n --> src/main.rs:2:9\n  |\n2 |     let cents_per_day = 25;\n  |         ^^^^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_cents_per_day`\n  |\n  = note: `#[warn(unused_variables)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0434`.\nerror: could not compile `fn_no_capture` (bin \"fn_no_capture\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0434]: can't capture dynamic environment in a fn item\n --> src/main.rs:5:16\n  |\n5 |         days * cents_per_day\n  |                ^^^^^^^^^^^^^\n  |\n  = help: use the `|| { ... }` closure form instead\n\nwarning: unused variable: `cents_per_day`\n --> src/main.rs:2:9\n  |\n2 |     let cents_per_day = 25;\n  |         ^^^^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_cents_per_day`\n  |\n  = note: `#[warn(unused_variables)]` (part of `#[warn(unused)]`) on by default\n\nFor more information about this error, try `rustc --explain E0434`.\nerror: could not compile `fn_no_capture` (bin \"fn_no_capture\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch20/fn_no_capture"
    }
   ]
  },
  "fn_traits.rs": {
   "src": "fn call_twice<F: Fn()>(f: F) {\n    f();\n    f();\n}\n\nfn call_three_times<F: FnMut()>(mut f: F) {\n    f();\n    f();\n    f();\n}\n\nfn call_once<F: FnOnce() -> String>(f: F) -> String {\n    f()\n}\n\nfn main() {\n    let title = String::from(\"Dune\");\n    call_twice(|| println!(\"reading {title}\"));\n\n    let mut pages = 0;\n    call_three_times(|| pages += 100);\n    println!(\"pages read: {pages}\");\n\n    let gift = call_once(move || title);\n    println!(\"given away: {gift}\");\n}\n",
   "stdout": "reading Dune\nreading Dune\npages read: 300\ngiven away: Dune\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "reading Dune\nreading Dune\npages read: 300\ngiven away: Dune\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/fn_traits"
    }
   ]
  },
  "fnonce_twice.rs": {
   "src": "fn main() {\n    let title = String::from(\"Dune\");\n    let give_away = move || title;\n\n    let first = give_away();\n    let second = give_away();\n    println!(\"{first} {second}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of moved value: `give_away`\n --> src/main.rs:6:18\n  |\n5 |     let first = give_away();\n  |                 ----------- `give_away` moved due to this call\n6 |     let second = give_away();\n  |                  ^^^^^^^^^ value used here after move\n  |\nnote: closure cannot be invoked more than once because it moves the variable `title` out of its environment\n --> src/main.rs:3:29\n  |\n3 |     let give_away = move || title;\n  |                             ^^^^^\nnote: this value implements `FnOnce`, which causes it to be moved when called\n --> src/main.rs:5:17\n  |\n5 |     let first = give_away();\n  |                 ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `fnonce_twice` (bin \"fnonce_twice\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of moved value: `give_away`\n --> src/main.rs:6:18\n  |\n5 |     let first = give_away();\n  |                 ----------- `give_away` moved due to this call\n6 |     let second = give_away();\n  |                  ^^^^^^^^^ value used here after move\n  |\nnote: closure cannot be invoked more than once because it moves the variable `title` out of its environment\n --> src/main.rs:3:29\n  |\n3 |     let give_away = move || title;\n  |                             ^^^^^\nnote: this value implements `FnOnce`, which causes it to be moved when called\n --> src/main.rs:5:17\n  |\n5 |     let first = give_away();\n  |                 ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `fnonce_twice` (bin \"fnonce_twice\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/fnonce_twice"
    }
   ]
  },
  "for_desugar.rs": {
   "src": "fn main() {\n    let shelf = vec![\"Dune\", \"Emma\"];\n    for title in shelf.iter() {\n        println!(\"for: {title}\");\n    }\n    let mut belt = shelf.iter();\n    while let Some(title) = belt.next() {\n        println!(\"while let: {title}\");\n    }\n}\n",
   "stdout": "for: Dune\nfor: Emma\nwhile let: Dune\nwhile let: Emma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "for: Dune\nfor: Emma\nwhile let: Dune\nwhile let: Emma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/for_desugar"
    }
   ]
  },
  "late_fee.rs": {
   "src": "fn main() {\n    let cents_per_day = 25;\n    let late_fee = |days: u32| days * cents_per_day;\n\n    println!(\"{}\", late_fee(0));\n    println!(\"{}\", late_fee(1));\n    println!(\"{}\", late_fee(4));\n    println!(\"{}\", late_fee(12));\n}\n",
   "stdout": "0\n25\n100\n300\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0\n25\n100\n300\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/late_fee"
    }
   ]
  },
  "late_fee_bad.rs": {
   "src": "fn main() {\n    let cents_per_day = 25;\n    let late_fee = |days: u32| days * cents_per_day;\n\n    println!(\"{}\", late_fee(2.5));\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n --> src/main.rs:5:29\n  |\n5 |     println!(\"{}\", late_fee(2.5));\n  |                    -------- ^^^ expected `u32`, found floating-point number\n  |                    |\n  |                    arguments to this function are incorrect\n  |\nnote: closure parameter defined here\n --> src/main.rs:3:21\n  |\n3 |     let late_fee = |days: u32| days * cents_per_day;\n  |                     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `late_fee_bad` (bin \"late_fee_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n --> src/main.rs:5:29\n  |\n5 |     println!(\"{}\", late_fee(2.5));\n  |                    -------- ^^^ expected `u32`, found floating-point number\n  |                    |\n  |                    arguments to this function are incorrect\n  |\nnote: closure parameter defined here\n --> src/main.rs:3:21\n  |\n3 |     let late_fee = |days: u32| days * cents_per_day;\n  |                     ^^^^^^^^^\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `late_fee_bad` (bin \"late_fee_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/late_fee_bad"
    }
   ]
  },
  "lazy_belt.rs": {
   "src": "fn main() {\n    let shelf = vec![1, 2, 3, 4];\n    let packed: Vec<i32> = shelf\n        .iter()\n        .map(|n| {\n            println!(\"map    {n} -> {}\", n * 10);\n            n * 10\n        })\n        .filter(|n| {\n            println!(\"filter {n}: keep? {}\", *n > 15);\n            *n > 15\n        })\n        .take(2)\n        .collect();\n    println!(\"packed {packed:?}\");\n}\n",
   "stdout": "map    1 -> 10\nfilter 10: keep? false\nmap    2 -> 20\nfilter 20: keep? true\nmap    3 -> 30\nfilter 30: keep? true\npacked [20, 30]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "map    1 -> 10\nfilter 10: keep? false\nmap    2 -> 20\nfilter 20: keep? true\nmap    3 -> 30\nfilter 30: keep? true\npacked [20, 30]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/lazy_belt"
    }
   ]
  },
  "lazy_warning.rs": {
   "src": "fn main() {\n    let shelf = vec![1, 2, 3];\n    shelf.iter().map(|n| {\n        println!(\"doubling {n}\");\n        n * 2\n    });\n    println!(\"done\");\n}\n",
   "stdout": "done\n",
   "stderr": "warning: unused `Map` that must be used\n --> src/main.rs:3:5\n  |\n3 | /     shelf.iter().map(|n| {\n4 | |         println!(\"doubling {n}\");\n5 | |         n * 2\n6 | |     });\n  | |______^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n3 |     let _ = shelf.iter().map(|n| {\n  |     +++++++\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "done\n",
     "err": "warning: unused `Map` that must be used\n --> src/main.rs:3:5\n  |\n3 | /     shelf.iter().map(|n| {\n4 | |         println!(\"doubling {n}\");\n5 | |         n * 2\n6 | |     });\n  | |______^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n3 |     let _ = shelf.iter().map(|n| {\n  |     +++++++\n\n",
     "exit": 0,
     "dir": "~/rust-ch20/lazy_warning",
     "merged": "warning: unused `Map` that must be used\n --> src/main.rs:3:5\n  |\n3 | /     shelf.iter().map(|n| {\n4 | |         println!(\"doubling {n}\");\n5 | |         n * 2\n6 | |     });\n  | |______^\n  |\n  = note: iterators are lazy and do nothing unless consumed\n  = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default\nhelp: use `let _ = ...` to ignore the resulting value\n  |\n3 |     let _ = shelf.iter().map(|n| {\n  |     +++++++\n\ndone\n"
    }
   ]
  },
  "loop_vs_chain.rs": {
   "src": "fn total_loop(pages: &[u32]) -> u32 {\n    let mut total = 0;\n    for p in pages {\n        if *p > 200 {\n            total += p * 2;\n        }\n    }\n    total\n}\n\nfn total_chain(pages: &[u32]) -> u32 {\n    pages.iter().filter(|p| **p > 200).map(|p| p * 2).sum()\n}\n\nfn main() {\n    let pages = [412, 474, 162, 98, 305];\n    println!(\"loop:  {}\", total_loop(&pages));\n    println!(\"chain: {}\", total_chain(&pages));\n}\n",
   "stdout": "loop:  2382\nchain: 2382\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "loop:  2382\nchain: 2382\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/loop_vs_chain"
    }
   ]
  },
  "make_adder.rs": {
   "src": "fn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n    move |x| x + n\n}\n\nfn make_stamp(word: &str) -> Box<dyn Fn(&str) -> String> {\n    let word = word.to_string();\n    Box::new(move |title| format!(\"{title} [{word}]\"))\n}\n\nfn main() {\n    let add_five = make_adder(5);\n    let add_ten = make_adder(10);\n    println!(\"{} {}\", add_five(1), add_ten(1));\n\n    let stamps = vec![make_stamp(\"DUE\"), make_stamp(\"LATE\")];\n    for stamp in &stamps {\n        println!(\"{}\", stamp(\"Dune\"));\n    }\n}\n",
   "stdout": "6 11\nDune [DUE]\nDune [LATE]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "6 11\nDune [DUE]\nDune [LATE]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/make_adder"
    }
   ]
  },
  "move_error.rs": {
   "src": "fn main() {\n    let name = String::from(\"Mabel\");\n    let shout = move || println!(\"HI, {name}!\");\n    shout();\n    println!(\"{name}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `name`\n --> src/main.rs:5:16\n  |\n2 |     let name = String::from(\"Mabel\");\n  |         ---- move occurs because `name` has type `String`, which does not implement the `Copy` trait\n3 |     let shout = move || println!(\"HI, {name}!\");\n  |                 -------                ---- variable moved due to use in closure\n  |                 |\n  |                 value moved into closure here\n4 |     shout();\n5 |     println!(\"{name}\");\n  |                ^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value before moving it into the closure\n  |\n3 ~     let value = name.clone();\n4 ~     let shout = move || println!(\"HI, {value}!\");\n  |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `move_error` (bin \"move_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `name`\n --> src/main.rs:5:16\n  |\n2 |     let name = String::from(\"Mabel\");\n  |         ---- move occurs because `name` has type `String`, which does not implement the `Copy` trait\n3 |     let shout = move || println!(\"HI, {name}!\");\n  |                 -------                ---- variable moved due to use in closure\n  |                 |\n  |                 value moved into closure here\n4 |     shout();\n5 |     println!(\"{name}\");\n  |                ^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value before moving it into the closure\n  |\n3 ~     let value = name.clone();\n4 ~     let shout = move || println!(\"HI, {value}!\");\n  |\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `move_error` (bin \"move_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/move_error"
    }
   ]
  },
  "next_by_hand.rs": {
   "src": "fn main() {\n    let shelf = vec![\"Dune\", \"Emma\", \"Coraline\"];\n    let mut belt = shelf.iter();\n\n    println!(\"{:?}\", belt.next());\n    println!(\"{:?}\", belt.next());\n    println!(\"{:?}\", belt.next());\n    println!(\"{:?}\", belt.next());\n    println!(\"{:?}\", belt.next());\n}\n",
   "stdout": "Some(\"Dune\")\nSome(\"Emma\")\nSome(\"Coraline\")\nNone\nNone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(\"Dune\")\nSome(\"Emma\")\nSome(\"Coraline\")\nNone\nNone\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/next_by_hand"
    }
   ]
  },
  "next_no_mut.rs": {
   "src": "fn main() {\n    let shelf = vec![\"Dune\", \"Emma\", \"Coraline\"];\n    let belt = shelf.iter();\n    println!(\"{:?}\", belt.next());\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `belt` as mutable, as it is not declared as mutable\n --> src/main.rs:4:22\n  |\n4 |     println!(\"{:?}\", belt.next());\n  |                      ^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n3 |     let mut belt = shelf.iter();\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `next_no_mut` (bin \"next_no_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `belt` as mutable, as it is not declared as mutable\n --> src/main.rs:4:22\n  |\n4 |     println!(\"{:?}\", belt.next());\n  |                      ^^^^ cannot borrow as mutable\n  |\nhelp: consider changing this to be mutable\n  |\n3 |     let mut belt = shelf.iter();\n  |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `next_no_mut` (bin \"next_no_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/next_no_mut"
    }
   ]
  },
  "no_move.rs": {
   "src": "fn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n    |x| x + n\n}\n\nfn main() {\n    let add_five = make_adder(5);\n    println!(\"{}\", add_five(1));\n}\n",
   "stdout": "",
   "stderr": "error[E0373]: closure may outlive the current function, but it borrows `n`, which is owned by the current function\n --> src/main.rs:2:5\n  |\n2 |     |x| x + n\n  |     ^^^     - `n` is borrowed here\n  |     |\n  |     may outlive borrowed value `n`\n  |\nnote: closure is returned here\n --> src/main.rs:2:5\n  |\n2 |     |x| x + n\n  |     ^^^^^^^^^\nhelp: to force the closure to take ownership of `n` (and any other referenced variables), use the `move` keyword\n  |\n2 |     move |x| x + n\n  |     ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `no_move` (bin \"no_move\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0373]: closure may outlive the current function, but it borrows `n`, which is owned by the current function\n --> src/main.rs:2:5\n  |\n2 |     |x| x + n\n  |     ^^^     - `n` is borrowed here\n  |     |\n  |     may outlive borrowed value `n`\n  |\nnote: closure is returned here\n --> src/main.rs:2:5\n  |\n2 |     |x| x + n\n  |     ^^^^^^^^^\nhelp: to force the closure to take ownership of `n` (and any other referenced variables), use the `move` keyword\n  |\n2 |     move |x| x + n\n  |     ++++\n\nFor more information about this error, try `rustc --explain E0373`.\nerror: could not compile `no_move` (bin \"no_move\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/no_move"
    }
   ]
  },
  "parsons_chain.rs": {
   "src": "fn main() {\n    let words = [\"owl\", \"fox\", \"heron\", \"eel\", \"badger\"];\n    let picked: Vec<String> = words\n        .iter()\n        .enumerate()\n        .filter(|(i, _)| i % 2 == 0)\n        .map(|(i, w)| format!(\"{i}:{w}\"))\n        .collect();\n    println!(\"{picked:?}\");\n}\n",
   "stdout": "[\"0:owl\", \"2:heron\", \"4:badger\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[\"0:owl\", \"2:heron\", \"4:badger\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/parsons_chain"
    }
   ]
  },
  "predict_adapters.rs": {
   "src": "fn main() {\n    let a = [1, 2, 3];\n    let b = [10, 20];\n    let joined: Vec<i32> = a.iter().chain(b.iter()).rev().copied().collect();\n    println!(\"{joined:?}\");\n\n    let steps: Vec<i32> = (1..=10).step_by(3).collect();\n    println!(\"{steps:?}\");\n\n    let gaps: Vec<i32> = [2, 5, 6, 10].windows(2).map(|w| w[1] - w[0]).collect();\n    println!(\"{gaps:?}\");\n}\n",
   "stdout": "[20, 10, 3, 2, 1]\n[1, 4, 7, 10]\n[3, 1, 4]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[20, 10, 3, 2, 1]\n[1, 4, 7, 10]\n[3, 1, 4]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_adapters"
    }
   ]
  },
  "predict_basic.rs": {
   "src": "fn main() {\n    let bonus = 3;\n    let score = |base: i32| base * 2 + bonus;\n    let label = |n: i32| {\n        if n > 10 { \"big\" } else { \"small\" }\n    };\n\n    println!(\"{}\", score(1));\n    println!(\"{}\", score(5));\n    println!(\"{}\", label(score(5)));\n    println!(\"{}\", label(score(3)));\n}\n",
   "stdout": "5\n13\nbig\nsmall\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5\n13\nbig\nsmall\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_basic"
    }
   ]
  },
  "predict_capture.rs": {
   "src": "fn main() {\n    let mut count = 10;\n    let show = move || println!(\"inside: {count}\");\n    count += 5;\n    show();\n    println!(\"outside: {count}\");\n\n    let mut seen = 0;\n    let mut look = || seen += 1;\n    look();\n    look();\n    println!(\"seen: {seen}\");\n}\n",
   "stdout": "inside: 10\noutside: 15\nseen: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "inside: 10\noutside: 15\nseen: 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_capture"
    }
   ]
  },
  "predict_consumers.rs": {
   "src": "fn main() {\n    let ages = [7, 12, 9, 15, 12];\n    println!(\"{:?}\", ages.iter().position(|a| *a == 12));\n    println!(\"{:?}\", ages.iter().find(|a| **a > 20));\n    println!(\"{}\", ages.iter().any(|a| *a > 14));\n    println!(\"{}\", ages.iter().all(|a| *a > 7));\n    println!(\"{}\", ages.iter().filter(|a| **a == 12).count());\n}\n",
   "stdout": "Some(1)\nNone\ntrue\nfalse\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(1)\nNone\ntrue\nfalse\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_consumers"
    }
   ]
  },
  "predict_fnmut.rs": {
   "src": "fn apply_n<F: FnMut()>(n: u32, mut f: F) {\n    for _ in 0..n {\n        f();\n    }\n}\n\nfn main() {\n    let mut shelf: Vec<u32> = Vec::new();\n    let mut next_id = 100;\n    apply_n(3, || {\n        shelf.push(next_id);\n        next_id += 10;\n    });\n    println!(\"{shelf:?}\");\n    println!(\"{next_id}\");\n}\n",
   "stdout": "[100, 110, 120]\n130\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[100, 110, 120]\n130\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_fnmut"
    }
   ]
  },
  "predict_lazy.rs": {
   "src": "fn main() {\n    let shelf = vec![1, 2, 3];\n    let belt = shelf.iter().map(|n| {\n        println!(\"map {n}\");\n        n + 1\n    });\n    println!(\"belt built\");\n    let total: i32 = belt.sum();\n    println!(\"total {total}\");\n}\n",
   "stdout": "belt built\nmap 1\nmap 2\nmap 3\ntotal 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "belt built\nmap 1\nmap 2\nmap 3\ntotal 9\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/predict_lazy"
    }
   ]
  },
  "spot_fn.rs": {
   "src": "fn run_each<F: Fn(&str)>(titles: &[&str], f: F) {\n    for t in titles {\n        f(t);\n    }\n}\n\nfn main() {\n    let mut log: Vec<String> = Vec::new();\n    run_each(&[\"Dune\", \"Emma\"], |t| log.push(t.to_uppercase()));\n    println!(\"{log:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `log` as mutable, as it is a captured variable in a `Fn` closure\n --> src/main.rs:9:37\n  |\n1 | fn run_each<F: Fn(&str)>(titles: &[&str], f: F) {\n  |                                              - change this to accept `FnMut` instead of `Fn`\n...\n8 |     let mut log: Vec<String> = Vec::new();\n  |         ------- `log` declared here, outside the closure\n9 |     run_each(&[\"Dune\", \"Emma\"], |t| log.push(t.to_uppercase()));\n  |     --------                    --- ^^^ cannot borrow as mutable\n  |     |                           |\n  |     |                           in this closure\n  |     expects `Fn` instead of `FnMut`\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_fn` (bin \"spot_fn\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `log` as mutable, as it is a captured variable in a `Fn` closure\n --> src/main.rs:9:37\n  |\n1 | fn run_each<F: Fn(&str)>(titles: &[&str], f: F) {\n  |                                              - change this to accept `FnMut` instead of `Fn`\n...\n8 |     let mut log: Vec<String> = Vec::new();\n  |         ------- `log` declared here, outside the closure\n9 |     run_each(&[\"Dune\", \"Emma\"], |t| log.push(t.to_uppercase()));\n  |     --------                    --- ^^^ cannot borrow as mutable\n  |     |                           |\n  |     |                           in this closure\n  |     expects `Fn` instead of `FnMut`\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_fn` (bin \"spot_fn\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/spot_fn"
    }
   ]
  },
  "spot_iter.rs": {
   "src": "fn main() {\n    let mut fines = vec![25, 50, 10];\n    for f in fines.iter() {\n        *f *= 2;\n    }\n    println!(\"{fines:?}\");\n}\n",
   "stdout": "",
   "stderr": "warning: variable does not need to be mutable\n --> src/main.rs:2:9\n  |\n2 |     let mut fines = vec![25, 50, 10];\n  |         ----^^^^^\n  |         |\n  |         help: remove this `mut`\n  |\n  = note: `#[warn(unused_mut)]` (part of `#[warn(unused)]`) on by default\n\nerror[E0594]: cannot assign to `*f`, which is behind a `&` reference\n --> src/main.rs:4:9\n  |\n3 |     for f in fines.iter() {\n  |              ------------ this iterator yields `&` references\n4 |         *f *= 2;\n  |         ^^^^^^^ `f` is a `&` reference, so it cannot be written to\n  |\nhelp: use mutable method\n  |\n3 |     for f in fines.iter_mut() {\n  |                        ++++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `spot_iter` (bin \"spot_iter\") due to 1 previous error; 1 warning emitted\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "warning: variable does not need to be mutable\n --> src/main.rs:2:9\n  |\n2 |     let mut fines = vec![25, 50, 10];\n  |         ----^^^^^\n  |         |\n  |         help: remove this `mut`\n  |\n  = note: `#[warn(unused_mut)]` (part of `#[warn(unused)]`) on by default\n\nerror[E0594]: cannot assign to `*f`, which is behind a `&` reference\n --> src/main.rs:4:9\n  |\n3 |     for f in fines.iter() {\n  |              ------------ this iterator yields `&` references\n4 |         *f *= 2;\n  |         ^^^^^^^ `f` is a `&` reference, so it cannot be written to\n  |\nhelp: use mutable method\n  |\n3 |     for f in fines.iter_mut() {\n  |                        ++++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `spot_iter` (bin \"spot_iter\") due to 1 previous error; 1 warning emitted\n",
     "exit": 101,
     "dir": "~/rust-ch20/spot_iter"
    }
   ]
  },
  "std_closures.rs": {
   "src": "fn main() {\n    let mut books = vec![(\"Dune\", 412), (\"Emma\", 474), (\"Coraline\", 162)];\n\n    books.sort_by_key(|b| b.1);\n    println!(\"{books:?}\");\n\n    books.sort_by(|a, b| b.0.cmp(a.0));\n    println!(\"{books:?}\");\n\n    books.retain(|b| b.1 > 200);\n    println!(\"{books:?}\");\n\n    let found: Option<&str> = None;\n    let shelf = found.unwrap_or_else(|| \"lost and found\");\n    println!(\"{shelf}\");\n\n    let shout: Option<String> = Some(\"owl\").map(|w| w.to_uppercase());\n    println!(\"{shout:?}\");\n}\n",
   "stdout": "[(\"Coraline\", 162), (\"Dune\", 412), (\"Emma\", 474)]\n[(\"Emma\", 474), (\"Dune\", 412), (\"Coraline\", 162)]\n[(\"Emma\", 474), (\"Dune\", 412)]\nlost and found\nSome(\"OWL\")\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[(\"Coraline\", 162), (\"Dune\", 412), (\"Emma\", 474)]\n[(\"Emma\", 474), (\"Dune\", 412), (\"Coraline\", 162)]\n[(\"Emma\", 474), (\"Dune\", 412)]\nlost and found\nSome(\"OWL\")\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/std_closures"
    }
   ]
  },
  "three_iters.rs": {
   "src": "fn main() {\n    let mut pages = vec![412, 474, 162];\n\n    for p in pages.iter() {\n        print!(\"{p} \");\n    }\n    println!(\"<- iter() lent each one\");\n\n    for p in pages.iter_mut() {\n        *p += 10;\n    }\n    println!(\"{pages:?} <- iter_mut() let us write\");\n\n    let mut total = 0;\n    for p in pages.into_iter() {\n        total += p;\n    }\n    println!(\"{total} <- into_iter() took them all\");\n}\n",
   "stdout": "412 474 162 <- iter() lent each one\n[422, 484, 172] <- iter_mut() let us write\n1078 <- into_iter() took them all\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "412 474 162 <- iter() lent each one\n[422, 484, 172] <- iter_mut() let us write\n1078 <- into_iter() took them all\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/three_iters"
    }
   ]
  },
  "trace_belt.rs": {
   "src": "fn main() {\n    let nums = [3, 8, 5, 12];\n    let total: i32 = nums\n        .iter()\n        .map(|n| {\n            println!(\"map {n} {}\", n * 2);\n            n * 2\n        })\n        .filter(|d| {\n            println!(\"filter {d} {}\", *d > 10);\n            *d > 10\n        })\n        .sum();\n    println!(\"sum {total} {}\", total > 30);\n}\n",
   "stdout": "map 3 6\nfilter 6 false\nmap 8 16\nfilter 16 true\nmap 5 10\nfilter 10 false\nmap 12 24\nfilter 24 true\nsum 40 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "map 3 6\nfilter 6 false\nmap 8 16\nfilter 16 true\nmap 5 10\nfilter 10 false\nmap 12 24\nfilter 24 true\nsum 40 true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/trace_belt"
    }
   ]
  },
  "trace_fold.rs": {
   "src": "fn main() {\n    let fines = [25, 50, 10, 75];\n    let total = fines.iter().fold(0, |acc, f| {\n        println!(\"{acc} {f} {}\", acc + f);\n        acc + f\n    });\n    assert_eq!(total, 160);\n}\n",
   "stdout": "0 25 25\n25 50 75\n75 10 85\n85 75 160\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 25 25\n25 50 75\n75 10 85\n85 75 160\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/trace_fold"
    }
   ]
  },
  "trace_zip.rs": {
   "src": "fn main() {\n    let titles = [\"Dune\", \"Emma\", \"Coraline\", \"Heidi\", \"Matilda\"];\n    let pages = [412, 474, 162, 288];\n    for (i, (t, p)) in titles.iter().zip(pages.iter()).enumerate().skip(1) {\n        println!(\"{i} {t} {}\", p / 100);\n    }\n}\n",
   "stdout": "1 Emma 4\n2 Coraline 1\n3 Heidi 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 Emma 4\n2 Coraline 1\n3 Heidi 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/trace_zip"
    }
   ]
  },
  "turbofish.rs": {
   "src": "fn main() {\n    let pages = vec![412, 474, 162];\n    let n = pages.iter().map(|p| p * 2).collect::<Vec<_>>().len();\n    let total = pages.iter().sum::<i32>();\n    let doubled: Vec<i32> = pages.iter().map(|p| p * 2).collect();\n    println!(\"{n} {total} {doubled:?}\");\n}\n",
   "stdout": "3 1048 [824, 948, 324]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 1048 [824, 948, 324]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch20/turbofish"
    }
   ]
  },
  "vec_not_iter.rs": {
   "src": "fn main() {\n    let pages = vec![412, 474, 162];\n    let doubled: Vec<i32> = pages.map(|p| p * 2).collect();\n    println!(\"{doubled:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no method named `map` found for struct `Vec<{integer}>` in the current scope\n --> src/main.rs:3:35\n  |\n3 |     let doubled: Vec<i32> = pages.map(|p| p * 2).collect();\n  |                                   ^^^ `Vec<{integer}>` is not an iterator\n  |\nhelp: call `.into_iter()` first\n  |\n3 |     let doubled: Vec<i32> = pages.into_iter().map(|p| p * 2).collect();\n  |                                   ++++++++++++\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vec_not_iter` (bin \"vec_not_iter\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no method named `map` found for struct `Vec<{integer}>` in the current scope\n --> src/main.rs:3:35\n  |\n3 |     let doubled: Vec<i32> = pages.map(|p| p * 2).collect();\n  |                                   ^^^ `Vec<{integer}>` is not an iterator\n  |\nhelp: call `.into_iter()` first\n  |\n3 |     let doubled: Vec<i32> = pages.into_iter().map(|p| p * 2).collect();\n  |                                   ++++++++++++\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vec_not_iter` (bin \"vec_not_iter\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch20/vec_not_iter"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0599]: the method `map` exists for struct `Vec<{integer}>`, but its trait bounds were not satisfied\n --> src/main.rs:3:35\n  |\n3 |     let doubled: Vec<i32> = pages.map(|p| p * 2).collect();\n  |                                   ^^^\n  |\n  = note: the following trait bounds were not satisfied:\n          `Vec<{integer}>: Iterator`\n          which is required by `&mut Vec<{integer}>: Iterator`\n          `[{integer}]: Iterator`\n          which is required by `&mut [{integer}]: Iterator`\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vec_not_iter` (bin \"vec_not_iter\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0599]: the method `map` exists for struct `Vec<{integer}>`, but its trait bounds were not satisfied\n --> src/main.rs:3:35\n  |\n3 |     let doubled: Vec<i32> = pages.map(|p| p * 2).collect();\n  |                                   ^^^\n  |\n  = note: the following trait bounds were not satisfied:\n          `Vec<{integer}>: Iterator`\n          which is required by `&mut Vec<{integer}>: Iterator`\n          `[{integer}]: Iterator`\n          which is required by `&mut [{integer}]: Iterator`\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vec_not_iter` (bin \"vec_not_iter\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch20/vec_not_iter"
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
