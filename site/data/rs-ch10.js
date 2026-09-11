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
  "workdir": "/home/you/rust-ch10",
  "versionDifferences": [
   "boss_error.rs",
   "dot_new.rs",
   "print_debug.rs",
   "print_display.rs",
   "spot_derive.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.rs, dot_new.rs, print_debug.rs, print_display.rs, spot_derive.rs."
 },
 "programs": {
  "assoc_new.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn new(station: &str) -> Self {\n        Self {\n            station: String::from(station),\n            volume: 5,\n        }\n    }\n\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n}\n\nfn main() {\n    let jazz = Radio::new(\"Jazz FM\");\n    let news = Radio::new(\"News 24\");\n    jazz.show();\n    news.show();\n}\n",
   "stdout": "Jazz FM at volume 5\nNews 24 at volume 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at volume 5\nNews 24 at volume 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/assoc_new"
    }
   ]
  },
  "boss_error.rs": {
   "src": "#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\n\nfn main() {\n    let p = Point { x: 3, y: 4 };\n    println!(\"x is {}, y is {}\", p.x, p.y);\n    println!(\"{:?}\", p);\n    println!(\"{}\", p);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Point` doesn't implement `std::fmt::Display`\n  --> src/main.rs:11:20\n   |\n11 |     println!(\"{}\", p);\n   |               --   ^ `Point` cannot be formatted with the default formatter\n   |               |\n   |               required by this formatting parameter\n   |\nhelp: the trait `std::fmt::Display` is not implemented for `Point`\n  --> src/main.rs:2:1\n   |\n 2 | struct Point {\n   | ^^^^^^^^^^^^\n   = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Point` doesn't implement `std::fmt::Display`\n  --> src/main.rs:11:20\n   |\n11 |     println!(\"{}\", p);\n   |               --   ^ `Point` cannot be formatted with the default formatter\n   |               |\n   |               required by this formatting parameter\n   |\nhelp: the trait `std::fmt::Display` is not implemented for `Point`\n  --> src/main.rs:2:1\n   |\n 2 | struct Point {\n   | ^^^^^^^^^^^^\n   = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Point` doesn't implement `std::fmt::Display`\n  --> src/main.rs:11:20\n   |\n11 |     println!(\"{}\", p);\n   |               --   ^ `Point` cannot be formatted with the default formatter\n   |               |\n   |               required by this formatting parameter\n   |\nhelp: the trait `std::fmt::Display` is not implemented for `Point`\n  --> src/main.rs:2:1\n   |\n 2 | struct Point {\n   | ^^^^^^^^^^^^\n   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Point` doesn't implement `std::fmt::Display`\n  --> src/main.rs:11:20\n   |\n11 |     println!(\"{}\", p);\n   |               --   ^ `Point` cannot be formatted with the default formatter\n   |               |\n   |               required by this formatting parameter\n   |\nhelp: the trait `std::fmt::Display` is not implemented for `Point`\n  --> src/main.rs:2:1\n   |\n 2 | struct Point {\n   | ^^^^^^^^^^^^\n   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch10/boss_error"
     }
    ]
   }
  },
  "boss_fill.rs": {
   "src": "struct Timer {\n    seconds: u32,\n}\n\nimpl Timer {\n    fn new() -> Self {\n        Self { seconds: 0 }\n    }\n\n    fn tick(&mut self, n: u32) {\n        self.seconds += n;\n    }\n}\n\nfn main() {\n    let mut t = Timer::new();\n    t.tick(30);\n    t.tick(45);\n    println!(\"{} min {} s\", t.seconds / 60, t.seconds % 60);\n}\n",
   "stdout": "1 min 15 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 min 15 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "#[derive(Debug)]\nstruct Size(u32, u32);\nimpl Size {\n    fn grow(&mut self, by: u32) {\n        self.0 += by;\n        self.1 += by;\n    }\n}\nfn main() {\n    let mut box1 = Size(2, 3);\n    box1.grow(10);\n    println!(\"{:?}\", box1);\n}\n",
   "stdout": "Size(12, 13)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Size(12, 13)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/boss_parsons"
    }
   ]
  },
  "boss_parsons_alt.rs": {
   "src": "#[derive(Debug)]\nstruct Size(u32, u32);\nimpl Size {\n    fn grow(&mut self, by: u32) {\n        self.1 += by;\n        self.0 += by;\n    }\n}\nfn main() {\n    let mut box1 = Size(2, 3);\n    box1.grow(10);\n    println!(\"{:?}\", box1);\n}\n",
   "stdout": "Size(12, 13)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Size(12, 13)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/boss_parsons_alt"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "struct Account {\n    owner: String,\n    balance: u32,\n}\n\nimpl Account {\n    fn new(owner: &str) -> Self {\n        Self { owner: String::from(owner), balance: 0 }\n    }\n\n    fn deposit(&mut self, amount: u32) {\n        self.balance += amount;\n    }\n\n    fn withdraw(&mut self, amount: u32) {\n        if amount <= self.balance {\n            self.balance -= amount;\n        } else {\n            println!(\"{} can't take out {}\", self.owner, amount);\n        }\n    }\n}\n\nfn main() {\n    let mut acc = Account::new(\"Mabel\");\n    acc.deposit(50);\n    acc.withdraw(80);\n    acc.withdraw(20);\n    acc.deposit(5);\n    println!(\"{} has {}\", acc.owner, acc.balance);\n}\n",
   "stdout": "Mabel can't take out 80\nMabel has 35\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Mabel can't take out 80\nMabel has 35\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "struct Square {\n    side: u32,\n}\n\nimpl Square {\n    fn new(side: u32) -> Self {\n        Self { side }\n    }\n\n    fn area(&self) -> u32 {\n        self.side * self.side\n    }\n}\n\nfn main() {\n    let small = Square::new(3);\n    let big = small.new(10);\n    println!(\"{} and {}\", small.area(), big.area());\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no method named `new` found for struct `Square` in the current scope\n  --> src/main.rs:17:21\n   |\n 1 | struct Square {\n   | ------------- method `new` not found for this struct\n...\n17 |     let big = small.new(10);\n   |                     ^^^ this is an associated function, not a method\n   |\n   = note: found the following associated functions; to be used as methods, functions must have a `self` parameter\nnote: the candidate is defined in an impl for the type `Square`\n  --> src/main.rs:6:5\n   |\n 6 |     fn new(side: u32) -> Self {\n   |     ^^^^^^^^^^^^^^^^^^^^^^^^^\nhelp: use associated function syntax instead\n   |\n17 -     let big = small.new(10);\n17 +     let big = Square::new(10);\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no method named `new` found for struct `Square` in the current scope\n  --> src/main.rs:17:21\n   |\n 1 | struct Square {\n   | ------------- method `new` not found for this struct\n...\n17 |     let big = small.new(10);\n   |                     ^^^ this is an associated function, not a method\n   |\n   = note: found the following associated functions; to be used as methods, functions must have a `self` parameter\nnote: the candidate is defined in an impl for the type `Square`\n  --> src/main.rs:6:5\n   |\n 6 |     fn new(side: u32) -> Self {\n   |     ^^^^^^^^^^^^^^^^^^^^^^^^^\nhelp: use associated function syntax instead\n   |\n17 -     let big = small.new(10);\n17 +     let big = Square::new(10);\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "struct Snail {\n    height: i32,\n    tired: bool,\n}\n\nimpl Snail {\n    fn crawl(&mut self) {\n        if self.tired {\n            self.height -= 1;\n        } else {\n            self.height += 3;\n        }\n        self.tired = !self.tired;\n    }\n}\n\nfn main() {\n    let mut s = Snail { height: 0, tired: false };\n    for day in 1..=5 {\n        s.crawl();\n        println!(\"{} {} {}\", day, s.height, s.tired);\n    }\n}\n",
   "stdout": "1 3 true\n2 2 false\n3 5 true\n4 4 false\n5 7 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 3 true\n2 2 false\n3 5 true\n4 4 false\n5 7 true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/boss_trace"
    }
   ]
  },
  "cn_copy_field.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let name = String::from(\"Ana\");\n    let card = Card { name, age: 12 };\n    let mut next = card.age;\n    next += 1;\n    println!(\"{} is {}\", card.name, card.age);\n    println!(\"next year: {next}\");\n}\n",
   "stdout": "Ana is 12\nnext year: 13\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana is 12\nnext year: 13\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/cn_copy_field"
    }
   ]
  },
  "cn_long_way.rs": {
   "src": "struct Radio {\n    volume: u8,\n}\n\nimpl Radio {\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n}\n\nfn main() {\n    let mut radio = Radio { volume: 5 };\n    Radio::louder(&mut radio);\n    println!(\"volume {}\", radio.volume);\n}\n",
   "stdout": "volume 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "volume 6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/cn_long_way"
    }
   ]
  },
  "cn_look_immut.rs": {
   "src": "struct Radio {\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"volume {}\", self.volume);\n    }\n}\n\nfn main() {\n    let radio = Radio { volume: 5 };\n    radio.show();\n}\n",
   "stdout": "volume 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "volume 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/cn_look_immut"
    }
   ]
  },
  "cn_move_name.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let name = String::from(\"Ana\");\n    let card = Card { name, age: 12 };\n    let taken = card.name;\n    println!(\"{taken} is {}\", card.age);\n    println!(\"{}\", card.name);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `card.name`\n  --> src/main.rs:11:20\n   |\n 9 |     let taken = card.name;\n   |                 --------- value moved here\n10 |     println!(\"{taken} is {}\", card.age);\n11 |     println!(\"{}\", card.name);\n   |                    ^^^^^^^^^ value borrowed here after move\n   |\n   = note: move occurs because `card.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `cn_move_name` (bin \"cn_move_name\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `card.name`\n  --> src/main.rs:11:20\n   |\n 9 |     let taken = card.name;\n   |                 --------- value moved here\n10 |     println!(\"{taken} is {}\", card.age);\n11 |     println!(\"{}\", card.name);\n   |                    ^^^^^^^^^ value borrowed here after move\n   |\n   = note: move occurs because `card.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `cn_move_name` (bin \"cn_move_name\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/cn_move_name"
    }
   ]
  },
  "cn_recycle_twice.rs": {
   "src": "struct Radio {\n    volume: u8,\n}\n\nimpl Radio {\n    fn recycle(self) -> u8 {\n        self.volume\n    }\n}\n\nfn main() {\n    let radio = Radio { volume: 5 };\n    let a = radio.recycle();\n    let b = radio.recycle();\n    println!(\"{a} {b}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of moved value: `radio`\n  --> src/main.rs:14:13\n   |\n12 |     let radio = Radio { volume: 5 };\n   |         ----- move occurs because `radio` has type `Radio`, which does not implement the `Copy` trait\n13 |     let a = radio.recycle();\n   |                   --------- `radio` moved due to this method call\n14 |     let b = radio.recycle();\n   |             ^^^^^ value used here after move\n   |\nnote: `Radio::recycle` takes ownership of the receiver `self`, which moves `radio`\n  --> src/main.rs:6:16\n   |\n 6 |     fn recycle(self) -> u8 {\n   |                ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `cn_recycle_twice` (bin \"cn_recycle_twice\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of moved value: `radio`\n  --> src/main.rs:14:13\n   |\n12 |     let radio = Radio { volume: 5 };\n   |         ----- move occurs because `radio` has type `Radio`, which does not implement the `Copy` trait\n13 |     let a = radio.recycle();\n   |                   --------- `radio` moved due to this method call\n14 |     let b = radio.recycle();\n   |             ^^^^^ value used here after move\n   |\nnote: `Radio::recycle` takes ownership of the receiver `self`, which moves `radio`\n  --> src/main.rs:6:16\n   |\n 6 |     fn recycle(self) -> u8 {\n   |                ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `cn_recycle_twice` (bin \"cn_recycle_twice\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/cn_recycle_twice"
    }
   ]
  },
  "cn_tuple_names.rs": {
   "src": "struct Shelf(u32, u32);\n\nfn main() {\n    let spot = Shelf(4, 2);\n    println!(\"aisle {}\", spot.aisle);\n}\n",
   "stdout": "",
   "stderr": "error[E0609]: no field `aisle` on type `Shelf`\n --> src/main.rs:5:31\n  |\n5 |     println!(\"aisle {}\", spot.aisle);\n  |                               ^^^^^ unknown field\n  |\n  = note: available fields are: `0`, `1`\n\nFor more information about this error, try `rustc --explain E0609`.\nerror: could not compile `cn_tuple_names` (bin \"cn_tuple_names\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0609]: no field `aisle` on type `Shelf`\n --> src/main.rs:5:31\n  |\n5 |     println!(\"aisle {}\", spot.aisle);\n  |                               ^^^^^ unknown field\n  |\n  = note: available fields are: `0`, `1`\n\nFor more information about this error, try `rustc --explain E0609`.\nerror: could not compile `cn_tuple_names` (bin \"cn_tuple_names\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/cn_tuple_names"
    }
   ]
  },
  "consume.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n\n    fn recycle(self) -> String {\n        println!(\"taking the radio apart...\");\n        self.station\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let radio = Radio { station, volume: 5 };\n    radio.show();\n    let part = radio.recycle();\n    println!(\"kept the part: {part}\");\n}\n",
   "stdout": "Jazz FM at volume 5\ntaking the radio apart...\nkept the part: Jazz FM\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at volume 5\ntaking the radio apart...\nkept the part: Jazz FM\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/consume"
    }
   ]
  },
  "consume_after.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n\n    fn recycle(self) -> String {\n        self.station\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let radio = Radio { station, volume: 5 };\n    let part = radio.recycle();\n    println!(\"kept the part: {part}\");\n    radio.show();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `radio`\n  --> src/main.rs:21:5\n   |\n18 |     let radio = Radio { station, volume: 5 };\n   |         ----- move occurs because `radio` has type `Radio`, which does not implement the `Copy` trait\n19 |     let part = radio.recycle();\n   |                      --------- `radio` moved due to this method call\n20 |     println!(\"kept the part: {part}\");\n21 |     radio.show();\n   |     ^^^^^ value borrowed here after move\n   |\nnote: `Radio::recycle` takes ownership of the receiver `self`, which moves `radio`\n  --> src/main.rs:11:16\n   |\n11 |     fn recycle(self) -> String {\n   |                ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consume_after` (bin \"consume_after\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `radio`\n  --> src/main.rs:21:5\n   |\n18 |     let radio = Radio { station, volume: 5 };\n   |         ----- move occurs because `radio` has type `Radio`, which does not implement the `Copy` trait\n19 |     let part = radio.recycle();\n   |                      --------- `radio` moved due to this method call\n20 |     println!(\"kept the part: {part}\");\n21 |     radio.show();\n   |     ^^^^^ value borrowed here after move\n   |\nnote: `Radio::recycle` takes ownership of the receiver `self`, which moves `radio`\n  --> src/main.rs:11:16\n   |\n11 |     fn recycle(self) -> String {\n   |                ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consume_after` (bin \"consume_after\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/consume_after"
    }
   ]
  },
  "consume_predict.rs": {
   "src": "struct Ticket {\n    film: String,\n    seat: u32,\n}\n\nimpl Ticket {\n    fn redeem(self) -> String {\n        format!(\"{}, seat {}\", self.film, self.seat)\n    }\n}\n\nfn main() {\n    let t = Ticket { film: String::from(\"Up\"), seat: 12 };\n    let stub = t.redeem();\n    println!(\"{stub}\");\n    println!(\"seat was {}\", t.seat);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `t`\n  --> src/main.rs:16:29\n   |\n13 |     let t = Ticket { film: String::from(\"Up\"), seat: 12 };\n   |         - move occurs because `t` has type `Ticket`, which does not implement the `Copy` trait\n14 |     let stub = t.redeem();\n   |                  -------- `t` moved due to this method call\n15 |     println!(\"{stub}\");\n16 |     println!(\"seat was {}\", t.seat);\n   |                             ^^^^^^ value borrowed here after move\n   |\nnote: `Ticket::redeem` takes ownership of the receiver `self`, which moves `t`\n  --> src/main.rs:7:15\n   |\n 7 |     fn redeem(self) -> String {\n   |               ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consume_predict` (bin \"consume_predict\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `t`\n  --> src/main.rs:16:29\n   |\n13 |     let t = Ticket { film: String::from(\"Up\"), seat: 12 };\n   |         - move occurs because `t` has type `Ticket`, which does not implement the `Copy` trait\n14 |     let stub = t.redeem();\n   |                  -------- `t` moved due to this method call\n15 |     println!(\"{stub}\");\n16 |     println!(\"seat was {}\", t.seat);\n   |                             ^^^^^^ value borrowed here after move\n   |\nnote: `Ticket::redeem` takes ownership of the receiver `self`, which moves `t`\n  --> src/main.rs:7:15\n   |\n 7 |     fn redeem(self) -> String {\n   |               ^^^^\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `consume_predict` (bin \"consume_predict\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/consume_predict"
    }
   ]
  },
  "dbg_card.rs": {
   "src": "#[derive(Debug)]\nstruct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let card = Card { name: String::from(\"Ana\"), age: 12 };\n    dbg!(&card);\n    println!(\"still mine: {}, {}\", card.name, card.age);\n}\n",
   "stdout": "still mine: Ana, 12\n",
   "stderr": "[src/main.rs:9:5] &card = Card {\n    name: \"Ana\",\n    age: 12,\n}\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "still mine: Ana, 12\n",
     "err": "[src/main.rs:9:5] &card = Card {\n    name: \"Ana\",\n    age: 12,\n}\n",
     "exit": 0,
     "dir": "~/rust-ch10/dbg_card",
     "merged": "[src/main.rs:9:5] &card = Card {\n    name: \"Ana\",\n    age: 12,\n}\nstill mine: Ana, 12\n"
    }
   ]
  },
  "derive_debug.rs": {
   "src": "#[derive(Debug)]\nstruct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn main() {\n    let card = Card {\n        name: String::from(\"Ana\"),\n        age: 12,\n        books_out: 3,\n    };\n    println!(\"{} ({}): {} books\", card.name, card.age, card.books_out);\n    println!(\"{:?}\", card);\n    println!(\"{card:#?}\");\n}\n",
   "stdout": "Ana (12): 3 books\nCard { name: \"Ana\", age: 12, books_out: 3 }\nCard {\n    name: \"Ana\",\n    age: 12,\n    books_out: 3,\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana (12): 3 books\nCard { name: \"Ana\", age: 12, books_out: 3 }\nCard {\n    name: \"Ana\",\n    age: 12,\n    books_out: 3,\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/derive_debug"
    }
   ]
  },
  "dot_new.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn new(station: &str) -> Self {\n        Self { station: String::from(station), volume: 5 }\n    }\n}\n\nfn main() {\n    let radio = Radio.new(\"Jazz FM\");\n    println!(\"{} at {}\", radio.station, radio.volume);\n}\n",
   "stdout": "",
   "stderr": "error[E0423]: cannot find value `Radio` in this scope\n  --> src/main.rs:13:17\n   |\n13 |     let radio = Radio.new(\"Jazz FM\");\n   |                 ^^^^^\n   |\n   = note: a struct named `Radio` exists in another namespace\nhelp: use the path separator to refer to an item\n   |\n13 -     let radio = Radio.new(\"Jazz FM\");\n13 +     let radio = Radio::new(\"Jazz FM\");\n   |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `dot_new` (bin \"dot_new\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0423]: cannot find value `Radio` in this scope\n  --> src/main.rs:13:17\n   |\n13 |     let radio = Radio.new(\"Jazz FM\");\n   |                 ^^^^^\n   |\n   = note: a struct named `Radio` exists in another namespace\nhelp: use the path separator to refer to an item\n   |\n13 -     let radio = Radio.new(\"Jazz FM\");\n13 +     let radio = Radio::new(\"Jazz FM\");\n   |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `dot_new` (bin \"dot_new\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/dot_new"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0423]: expected value, found struct `Radio`\n  --> src/main.rs:13:17\n   |\n13 |     let radio = Radio.new(\"Jazz FM\");\n   |                 ^^^^^\n   |\nhelp: use the path separator to refer to an item\n   |\n13 -     let radio = Radio.new(\"Jazz FM\");\n13 +     let radio = Radio::new(\"Jazz FM\");\n   |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `dot_new` (bin \"dot_new\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0423]: expected value, found struct `Radio`\n  --> src/main.rs:13:17\n   |\n13 |     let radio = Radio.new(\"Jazz FM\");\n   |                 ^^^^^\n   |\nhelp: use the path separator to refer to an item\n   |\n13 -     let radio = Radio.new(\"Jazz FM\");\n13 +     let radio = Radio::new(\"Jazz FM\");\n   |\n\nFor more information about this error, try `rustc --explain E0423`.\nerror: could not compile `dot_new` (bin \"dot_new\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch10/dot_new"
     }
    ]
   }
  },
  "field_loans.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let mut card = Card { name: String::from(\"Ana\"), age: 12 };\n    let name = &mut card.name;\n    let age = &card.age;\n    name.push_str(\" Lee\");\n    println!(\"{} is {}\", name, age);\n}\n",
   "stdout": "Ana Lee is 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana Lee is 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/field_loans"
    }
   ]
  },
  "fill_define.rs": {
   "src": "struct Pet {\n    name: String,\n    legs: u32,\n    likes_naps: bool,\n}\n\nfn main() {\n    let cat = Pet {\n        name: String::from(\"Biscuit\"),\n        legs: 4,\n        likes_naps: true,\n    };\n    println!(\"{} has {} legs\", cat.name, cat.legs);\n    println!(\"naps? {}\", cat.likes_naps);\n}\n",
   "stdout": "Biscuit has 4 legs\nnaps? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Biscuit has 4 legs\nnaps? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/fill_define"
    }
   ]
  },
  "fill_impl.rs": {
   "src": "struct Rect {\n    width: u32,\n    height: u32,\n}\n\nimpl Rect {\n    fn perimeter(&self) -> u32 {\n        2 * (self.width + self.height)\n    }\n}\n\nfn main() {\n    let door = Rect { width: 2, height: 5 };\n    println!(\"perimeter: {}\", door.perimeter());\n}\n",
   "stdout": "perimeter: 14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "perimeter: 14\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/fill_impl"
    }
   ]
  },
  "fill_shorthand.rs": {
   "src": "struct Point {\n    x: i32,\n    y: i32,\n}\n\nfn make_point(x: i32, y: i32) -> Point {\n    Point { x, y }\n}\n\nfn main() {\n    let p = make_point(3, 7);\n    println!(\"({}, {})\", p.x, p.y);\n}\n",
   "stdout": "(3, 7)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "(3, 7)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/fill_shorthand"
    }
   ]
  },
  "first_method.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n}\n\nfn main() {\n    let radio = Radio {\n        station: String::from(\"Jazz FM\"),\n        volume: 5,\n    };\n    radio.show();\n    radio.show();\n}\n",
   "stdout": "Jazz FM at volume 5\nJazz FM at volume 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at volume 5\nJazz FM at volume 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/first_method"
    }
   ]
  },
  "first_predict.rs": {
   "src": "struct Book {\n    title: String,\n    pages: u32,\n    year: u32,\n}\n\nfn main() {\n    let b = Book {\n        year: 1847,\n        title: String::from(\"Jane Eyre\"),\n        pages: 500,\n    };\n    let half = b.pages / 2;\n    println!(\"{} ({})\", b.title, b.year);\n    println!(\"halfway: page {half}\");\n}\n",
   "stdout": "Jane Eyre (1847)\nhalfway: page 250\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jane Eyre (1847)\nhalfway: page 250\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/first_predict"
    }
   ]
  },
  "first_struct.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn main() {\n    let card = Card {\n        name: String::from(\"Ana\"),\n        age: 12,\n        books_out: 3,\n    };\n    println!(\"{} is {} years old\", card.name, card.age);\n    println!(\"{} has {} books out\", card.name, card.books_out);\n}\n",
   "stdout": "Ana is 12 years old\nAna has 3 books out\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana is 12 years old\nAna has 3 books out\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/first_struct"
    }
   ]
  },
  "fn_vs_method.rs": {
   "src": "struct Rect {\n    width: u32,\n    height: u32,\n}\n\nfn area(r: &Rect) -> u32 {\n    r.width * r.height\n}\n\nimpl Rect {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n}\n\nfn main() {\n    let rug = Rect { width: 3, height: 4 };\n    println!(\"function: {}\", area(&rug));\n    println!(\"method:   {}\", rug.area());\n    println!(\"long way: {}\", Rect::area(&rug));\n}\n",
   "stdout": "function: 12\nmethod:   12\nlong way: 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "function: 12\nmethod:   12\nlong way: 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/fn_vs_method"
    }
   ]
  },
  "getters.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn new(station: &str) -> Self {\n        Self { station: String::from(station), volume: 5 }\n    }\n\n    fn volume(&self) -> u8 {\n        self.volume\n    }\n\n    fn set_volume(&mut self, level: u8) {\n        if level > 10 {\n            self.volume = 10;\n        } else {\n            self.volume = level;\n        }\n    }\n}\n\nimpl Radio {\n    fn station(&self) -> &str {\n        &self.station\n    }\n}\n\nfn main() {\n    let mut radio = Radio::new(\"Jazz FM\");\n    radio.set_volume(7);\n    println!(\"{}: {}\", radio.station(), radio.volume());\n    radio.set_volume(99);\n    println!(\"{}: {}\", radio.station(), radio.volume());\n}\n",
   "stdout": "Jazz FM: 7\nJazz FM: 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM: 7\nJazz FM: 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/getters"
    }
   ]
  },
  "in_real.rs": {
   "src": "#[derive(Debug)]\nstruct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl Point {\n    fn origin() -> Self {\n        Self { x: 0.0, y: 0.0 }\n    }\n\n    fn distance_to(&self, other: &Point) -> f64 {\n        let dx = self.x - other.x;\n        let dy = self.y - other.y;\n        (dx * dx + dy * dy).sqrt()\n    }\n}\n\nfn main() {\n    let home = Point::origin();\n    let shop = Point { x: 3.0, y: 4.0 };\n    println!(\"{:?} to {:?}\", home, shop);\n    println!(\"distance: {}\", home.distance_to(&shop));\n}\n",
   "stdout": "Point { x: 0.0, y: 0.0 } to Point { x: 3.0, y: 4.0 }\ndistance: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Point { x: 0.0, y: 0.0 } to Point { x: 3.0, y: 4.0 }\ndistance: 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/in_real"
    }
   ]
  },
  "loose_vars.rs": {
   "src": "fn main() {\n    let name = String::from(\"Ana\");\n    let age = 12;\n    let books_out = 3;\n    print_card(name, books_out, age);\n}\n\nfn print_card(name: String, age: u32, books_out: u32) {\n    println!(\"{name}, age {age}, has {books_out} books out\");\n}\n",
   "stdout": "Ana, age 3, has 12 books out\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana, age 3, has 12 books out\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/loose_vars"
    }
   ]
  },
  "method_trace.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let mut radio = Radio { station, volume: 5 };\n    radio.louder();\n    println!(\"{} at {}\", radio.station, radio.volume);\n}\n",
   "stdout": "Jazz FM at 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at 6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/method_trace"
    }
   ]
  },
  "missing_field.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn main() {\n    let card = Card {\n        name: String::from(\"Ben\"),\n        age: 9,\n    };\n    println!(\"{} ({}): {} books\", card.name, card.age, card.books_out);\n}\n",
   "stdout": "",
   "stderr": "error[E0063]: missing field `books_out` in initializer of `Card`\n --> src/main.rs:8:16\n  |\n8 |     let card = Card {\n  |                ^^^^ missing `books_out`\n\nFor more information about this error, try `rustc --explain E0063`.\nerror: could not compile `missing_field` (bin \"missing_field\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0063]: missing field `books_out` in initializer of `Card`\n --> src/main.rs:8:16\n  |\n8 |     let card = Card {\n  |                ^^^^ missing `books_out`\n\nFor more information about this error, try `rustc --explain E0063`.\nerror: could not compile `missing_field` (bin \"missing_field\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/missing_field"
    }
   ]
  },
  "move_out_change.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn into_station(&mut self) -> String {\n        self.station\n    }\n}\n\nfn main() {\n    let mut radio = Radio { station: String::from(\"Jazz FM\"), volume: 5 };\n    println!(\"volume {}\", radio.volume);\n    println!(\"kept {}\", radio.into_station());\n}\n",
   "stdout": "",
   "stderr": "error[E0507]: cannot move out of `self.station` which is behind a mutable reference\n --> src/main.rs:8:9\n  |\n8 |         self.station\n  |         ^^^^^^^^^^^^ move occurs because `self.station` has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n8 |         self.station.clone()\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out_change` (bin \"move_out_change\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0507]: cannot move out of `self.station` which is behind a mutable reference\n --> src/main.rs:8:9\n  |\n8 |         self.station\n  |         ^^^^^^^^^^^^ move occurs because `self.station` has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n8 |         self.station.clone()\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out_change` (bin \"move_out_change\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/move_out_change"
    }
   ]
  },
  "move_out_look.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn into_station(&self) -> String {\n        self.station\n    }\n}\n\nfn main() {\n    let radio = Radio { station: String::from(\"Jazz FM\"), volume: 5 };\n    println!(\"volume {}\", radio.volume);\n    println!(\"kept {}\", radio.into_station());\n}\n",
   "stdout": "",
   "stderr": "error[E0507]: cannot move out of `self.station` which is behind a shared reference\n --> src/main.rs:8:9\n  |\n8 |         self.station\n  |         ^^^^^^^^^^^^ move occurs because `self.station` has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n8 |         self.station.clone()\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out_look` (bin \"move_out_look\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0507]: cannot move out of `self.station` which is behind a shared reference\n --> src/main.rs:8:9\n  |\n8 |         self.station\n  |         ^^^^^^^^^^^^ move occurs because `self.station` has type `String`, which does not implement the `Copy` trait\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n8 |         self.station.clone()\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `move_out_look` (bin \"move_out_look\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/move_out_look"
    }
   ]
  },
  "mut_method.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n\n    fn tune(&mut self, station: &str) {\n        self.station = String::from(station);\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let mut radio = Radio { station, volume: 5 };\n    radio.show();\n    radio.louder();\n    radio.louder();\n    radio.tune(\"News 24\");\n    radio.show();\n}\n",
   "stdout": "Jazz FM at volume 5\nNews 24 at volume 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at volume 5\nNews 24 at volume 7\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/mut_method"
    }
   ]
  },
  "mut_method_err.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let radio = Radio { station, volume: 5 };\n    radio.louder();\n    println!(\"{} at {}\", radio.station, radio.volume);\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `radio` as mutable, as it is not declared as mutable\n  --> src/main.rs:15:5\n   |\n15 |     radio.louder();\n   |     ^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n14 |     let mut radio = Radio { station, volume: 5 };\n   |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `mut_method_err` (bin \"mut_method_err\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `radio` as mutable, as it is not declared as mutable\n  --> src/main.rs:15:5\n   |\n15 |     radio.louder();\n   |     ^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n14 |     let mut radio = Radio { station, volume: 5 };\n   |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `mut_method_err` (bin \"mut_method_err\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/mut_method_err"
    }
   ]
  },
  "mut_missing.rs": {
   "src": "struct Card {\n    name: String,\n    books_out: u32,\n}\n\nfn main() {\n    let card = Card {\n        name: String::from(\"Ana\"),\n        books_out: 3,\n    };\n    card.books_out += 1;\n    println!(\"{} has {} books out\", card.name, card.books_out);\n}\n",
   "stdout": "",
   "stderr": "error[E0594]: cannot assign to `card.books_out`, as `card` is not declared as mutable\n  --> src/main.rs:11:5\n   |\n11 |     card.books_out += 1;\n   |     ^^^^^^^^^^^^^^^^^^^ cannot assign\n   |\nhelp: consider changing this to be mutable\n   |\n 7 |     let mut card = Card {\n   |         +++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `mut_missing` (bin \"mut_missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0594]: cannot assign to `card.books_out`, as `card` is not declared as mutable\n  --> src/main.rs:11:5\n   |\n11 |     card.books_out += 1;\n   |     ^^^^^^^^^^^^^^^^^^^ cannot assign\n   |\nhelp: consider changing this to be mutable\n   |\n 7 |     let mut card = Card {\n   |         +++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `mut_missing` (bin \"mut_missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/mut_missing"
    }
   ]
  },
  "mut_whole.rs": {
   "src": "struct Card {\n    name: String,\n    books_out: u32,\n}\n\nfn main() {\n    let mut card = Card {\n        name: String::from(\"Ana\"),\n        books_out: 3,\n    };\n    card.books_out += 1;\n    card.name.push_str(\" Lee\");\n    println!(\"{} has {} books out\", card.name, card.books_out);\n}\n",
   "stdout": "Ana Lee has 4 books out\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana Lee has 4 books out\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/mut_whole"
    }
   ]
  },
  "mute_look.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn mute(&self) {\n        self.volume = 0;\n    }\n}\n\nfn main() {\n    let radio = Radio { station: String::from(\"Jazz FM\"), volume: 5 };\n    radio.mute();\n    println!(\"{} at {}\", radio.station, radio.volume);\n}\n",
   "stdout": "",
   "stderr": "error[E0594]: cannot assign to `self.volume`, which is behind a `&` reference\n --> src/main.rs:8:9\n  |\n8 |         self.volume = 0;\n  |         ^^^^^^^^^^^^^^^ `self` is a `&` reference, so it cannot be written to\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 |     fn mute(&mut self) {\n  |              +++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `mute_look` (bin \"mute_look\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0594]: cannot assign to `self.volume`, which is behind a `&` reference\n --> src/main.rs:8:9\n  |\n8 |         self.volume = 0;\n  |         ^^^^^^^^^^^^^^^ `self` is a `&` reference, so it cannot be written to\n  |\nhelp: consider changing this to be a mutable reference\n  |\n7 |     fn mute(&mut self) {\n  |              +++\n\nFor more information about this error, try `rustc --explain E0594`.\nerror: could not compile `mute_look` (bin \"mute_look\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/mute_look"
    }
   ]
  },
  "parsons_impl.rs": {
   "src": "struct Lamp {\n    on: bool,\n}\nimpl Lamp {\n    fn flip(&mut self) {\n        self.on = !self.on;\n    }\n}\nfn main() {\n    let mut lamp = Lamp { on: false };\n    lamp.flip();\n    println!(\"on? {}\", lamp.on);\n}\n",
   "stdout": "on? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "on? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/parsons_impl"
    }
   ]
  },
  "partial_whole.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn main() {\n    let a = Card { name: String::from(\"Ana\"), age: 12, books_out: 3 };\n    let b = Card { age: 9, ..a };\n    println!(\"{} is {}\", b.name, b.age);\n    println!(\"a still has {} books out\", a.books_out);\n    let c = a;\n    println!(\"{}\", c.age);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of partially moved value: `a`\n  --> src/main.rs:12:13\n   |\n 9 |     let b = Card { age: 9, ..a };\n   |             -------------------- value partially moved here\n...\n12 |     let c = a;\n   |             ^ value used here after partial move\n   |\n   = note: partial move occurs because `a.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `partial_whole` (bin \"partial_whole\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of partially moved value: `a`\n  --> src/main.rs:12:13\n   |\n 9 |     let b = Card { age: 9, ..a };\n   |             -------------------- value partially moved here\n...\n12 |     let c = a;\n   |             ^ value used here after partial move\n   |\n   = note: partial move occurs because `a.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `partial_whole` (bin \"partial_whole\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/partial_whole"
    }
   ]
  },
  "predict_debug.rs": {
   "src": "#[derive(Debug)]\nstruct Shelf(u32, u32);\n\n#[derive(Debug)]\nstruct Book {\n    title: String,\n    pages: u32,\n}\n\nfn main() {\n    let s = Shelf(4, 2);\n    let b = Book { title: String::from(\"Emma\"), pages: 474 };\n    println!(\"{}, {} pages\", b.title, b.pages);\n    println!(\"aisle {}, row {}\", s.0, s.1);\n    println!(\"{:?}\", s);\n    println!(\"{:?}\", b);\n}\n",
   "stdout": "Emma, 474 pages\naisle 4, row 2\nShelf(4, 2)\nBook { title: \"Emma\", pages: 474 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma, 474 pages\naisle 4, row 2\nShelf(4, 2)\nBook { title: \"Emma\", pages: 474 }\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/predict_debug"
    }
   ]
  },
  "predict_method.rs": {
   "src": "struct Counter {\n    count: u32,\n}\n\nimpl Counter {\n    fn add(&mut self, n: u32) {\n        self.count += n;\n    }\n\n    fn doubled(&self) -> u32 {\n        self.count * 2\n    }\n}\n\nfn main() {\n    let mut c = Counter { count: 1 };\n    c.add(4);\n    let d = c.doubled();\n    c.add(d);\n    println!(\"count is {}\", c.count);\n}\n",
   "stdout": "count is 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "count is 15\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/predict_method"
    }
   ]
  },
  "predict_update.rs": {
   "src": "struct Lamp {\n    color: String,\n    watts: u32,\n    on: bool,\n}\n\nfn main() {\n    let a = Lamp {\n        color: String::from(\"green\"),\n        watts: 40,\n        on: false,\n    };\n    let b = Lamp {\n        color: String::from(\"red\"),\n        on: true,\n        ..a\n    };\n    println!(\"{} {} {}\", a.color, a.watts, a.on);\n    println!(\"{} {} {}\", b.color, b.watts, b.on);\n}\n",
   "stdout": "green 40 false\nred 40 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "green 40 false\nred 40 true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/predict_update"
    }
   ]
  },
  "print_debug.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let card = Card { name: String::from(\"Ana\"), age: 12 };\n    println!(\"{:?}\", card);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Card` doesn't implement `Debug`\n --> src/main.rs:8:22\n  |\n8 |     println!(\"{:?}\", card);\n  |               ----   ^^^^ `Card` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Card`\nhelp: consider annotating `Card` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Card {\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_debug` (bin \"print_debug\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Card` doesn't implement `Debug`\n --> src/main.rs:8:22\n  |\n8 |     println!(\"{:?}\", card);\n  |               ----   ^^^^ `Card` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Card`\nhelp: consider annotating `Card` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Card {\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_debug` (bin \"print_debug\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/print_debug"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Card` doesn't implement `Debug`\n --> src/main.rs:8:22\n  |\n8 |     println!(\"{:?}\", card);\n  |               ----   ^^^^ `Card` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Card`\n  = note: add `#[derive(Debug)]` to `Card` or manually `impl Debug for Card`\nhelp: consider annotating `Card` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Card {\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_debug` (bin \"print_debug\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Card` doesn't implement `Debug`\n --> src/main.rs:8:22\n  |\n8 |     println!(\"{:?}\", card);\n  |               ----   ^^^^ `Card` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Card`\n  = note: add `#[derive(Debug)]` to `Card` or manually `impl Debug for Card`\nhelp: consider annotating `Card` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Card {\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_debug` (bin \"print_debug\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch10/print_debug"
     }
    ]
   }
  },
  "print_display.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let card = Card { name: String::from(\"Ana\"), age: 12 };\n    println!(\"{}\", card);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Card` doesn't implement `std::fmt::Display`\n --> src/main.rs:8:20\n  |\n8 |     println!(\"{}\", card);\n  |               --   ^^^^ `Card` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\nhelp: the trait `std::fmt::Display` is not implemented for `Card`\n --> src/main.rs:1:1\n  |\n1 | struct Card {\n  | ^^^^^^^^^^^\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_display` (bin \"print_display\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Card` doesn't implement `std::fmt::Display`\n --> src/main.rs:8:20\n  |\n8 |     println!(\"{}\", card);\n  |               --   ^^^^ `Card` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\nhelp: the trait `std::fmt::Display` is not implemented for `Card`\n --> src/main.rs:1:1\n  |\n1 | struct Card {\n  | ^^^^^^^^^^^\n  = note: in format strings you may be able to use `{:?}` (or `{:#?}` for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_display` (bin \"print_display\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/print_display"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Card` doesn't implement `std::fmt::Display`\n --> src/main.rs:8:20\n  |\n8 |     println!(\"{}\", card);\n  |               --   ^^^^ `Card` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\nhelp: the trait `std::fmt::Display` is not implemented for `Card`\n --> src/main.rs:1:1\n  |\n1 | struct Card {\n  | ^^^^^^^^^^^\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_display` (bin \"print_display\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Card` doesn't implement `std::fmt::Display`\n --> src/main.rs:8:20\n  |\n8 |     println!(\"{}\", card);\n  |               --   ^^^^ `Card` cannot be formatted with the default formatter\n  |               |\n  |               required by this formatting parameter\n  |\nhelp: the trait `std::fmt::Display` is not implemented for `Card`\n --> src/main.rs:1:1\n  |\n1 | struct Card {\n  | ^^^^^^^^^^^\n  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `print_display` (bin \"print_display\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch10/print_display"
     }
    ]
   }
  },
  "remote_ok.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn show(&self) {\n        println!(\"{} at volume {}\", self.station, self.volume);\n    }\n\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n\n    fn recycle(self) -> String {\n        self.station\n    }\n}\n\nfn main() {\n    let station = String::from(\"Jazz FM\");\n    let mut radio = Radio { station, volume: 5 };\n    radio.show();\n    radio.louder();\n    radio.show();\n    let part = radio.recycle();\n    println!(\"kept the part: {part}\");\n}\n",
   "stdout": "Jazz FM at volume 5\nJazz FM at volume 6\nkept the part: Jazz FM\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Jazz FM at volume 5\nJazz FM at volume 6\nkept the part: Jazz FM\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/remote_ok"
    }
   ]
  },
  "shorthand.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn new_card(name: String, age: u32) -> Card {\n    Card {\n        name,\n        age,\n        books_out: 0,\n    }\n}\n\nfn main() {\n    let card = new_card(String::from(\"Cal\"), 10);\n    println!(\"{} ({}): {} books\", card.name, card.age, card.books_out);\n}\n",
   "stdout": "Cal (10): 0 books\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Cal (10): 0 books\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/shorthand"
    }
   ]
  },
  "sizes.rs": {
   "src": "use std::mem::size_of;\n\nstruct Card {\n    name: String,\n    age: u32,\n}\n\nstruct Radio {\n    station: String,\n    volume: u8,\n}\n\nstruct Shelf(u32, u32);\nstruct Closed;\n\nfn main() {\n    println!(\"String: {} bytes\", size_of::<String>());\n    println!(\"Card:   {} bytes\", size_of::<Card>());\n    println!(\"Radio:  {} bytes\", size_of::<Radio>());\n    println!(\"Shelf:  {} bytes\", size_of::<Shelf>());\n    println!(\"Closed: {} bytes\", size_of::<Closed>());\n    let c = Card { name: String::new(), age: 0 };\n    let r = Radio { station: String::new(), volume: 0 };\n    let s = Shelf(0, 0);\n    let _ = (c.name, c.age, r.station, r.volume, s.0, s.1, Closed);\n}\n",
   "stdout": "String: 24 bytes\nCard:   32 bytes\nRadio:  32 bytes\nShelf:  8 bytes\nClosed: 0 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "String: 24 bytes\nCard:   32 bytes\nRadio:  32 bytes\nShelf:  8 bytes\nClosed: 0 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/sizes"
    }
   ]
  },
  "spot_derive.rs": {
   "src": "struct Shelf(u32, u32);\n\nfn main() {\n    let spot = Shelf(4, 2);\n    println!(\"aisle {}, row {}\", spot.0, spot.1);\n    println!(\"{:?}\", spot);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `Shelf` doesn't implement `Debug`\n --> src/main.rs:6:22\n  |\n6 |     println!(\"{:?}\", spot);\n  |               ----   ^^^^ `Shelf` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Shelf`\nhelp: consider annotating `Shelf` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Shelf(u32, u32);\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_derive` (bin \"spot_derive\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `Shelf` doesn't implement `Debug`\n --> src/main.rs:6:22\n  |\n6 |     println!(\"{:?}\", spot);\n  |               ----   ^^^^ `Shelf` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Shelf`\nhelp: consider annotating `Shelf` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Shelf(u32, u32);\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_derive` (bin \"spot_derive\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/spot_derive"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `Shelf` doesn't implement `Debug`\n --> src/main.rs:6:22\n  |\n6 |     println!(\"{:?}\", spot);\n  |               ----   ^^^^ `Shelf` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Shelf`\n  = note: add `#[derive(Debug)]` to `Shelf` or manually `impl Debug for Shelf`\nhelp: consider annotating `Shelf` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Shelf(u32, u32);\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_derive` (bin \"spot_derive\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `Shelf` doesn't implement `Debug`\n --> src/main.rs:6:22\n  |\n6 |     println!(\"{:?}\", spot);\n  |               ----   ^^^^ `Shelf` cannot be formatted using `{:?}` because it doesn't implement `Debug`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the trait `Debug` is not implemented for `Shelf`\n  = note: add `#[derive(Debug)]` to `Shelf` or manually `impl Debug for Shelf`\nhelp: consider annotating `Shelf` with `#[derive(Debug)]`\n  |\n1 + #[derive(Debug)]\n2 | struct Shelf(u32, u32);\n  |\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_derive` (bin \"spot_derive\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch10/spot_derive"
     }
    ]
   }
  },
  "spot_field.rs": {
   "src": "struct Book {\n    title: String,\n    pages: u32,\n}\n\nfn main() {\n    let book = Book {\n        title: String::from(\"Emma\"),\n        pages: 474,\n    };\n    println!(\"{} has {} pages\", book.titel, book.pages);\n}\n",
   "stdout": "",
   "stderr": "error[E0609]: no field `titel` on type `Book`\n  --> src/main.rs:11:38\n   |\n11 |     println!(\"{} has {} pages\", book.titel, book.pages);\n   |                                      ^^^^^ unknown field\n   |\nhelp: a field with a similar name exists\n   |\n11 -     println!(\"{} has {} pages\", book.titel, book.pages);\n11 +     println!(\"{} has {} pages\", book.title, book.pages);\n   |\n\nFor more information about this error, try `rustc --explain E0609`.\nerror: could not compile `spot_field` (bin \"spot_field\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0609]: no field `titel` on type `Book`\n  --> src/main.rs:11:38\n   |\n11 |     println!(\"{} has {} pages\", book.titel, book.pages);\n   |                                      ^^^^^ unknown field\n   |\nhelp: a field with a similar name exists\n   |\n11 -     println!(\"{} has {} pages\", book.titel, book.pages);\n11 +     println!(\"{} has {} pages\", book.title, book.pages);\n   |\n\nFor more information about this error, try `rustc --explain E0609`.\nerror: could not compile `spot_field` (bin \"spot_field\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/spot_field"
    }
   ]
  },
  "spot_mut_method.rs": {
   "src": "struct Score {\n    points: u32,\n}\n\nimpl Score {\n    fn add(&mut self, n: u32) {\n        self.points += n;\n    }\n}\n\nfn main() {\n    let score = Score { points: 0 };\n    score.add(10);\n    println!(\"{} points\", score.points);\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `score` as mutable, as it is not declared as mutable\n  --> src/main.rs:13:5\n   |\n13 |     score.add(10);\n   |     ^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n12 |     let mut score = Score { points: 0 };\n   |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_mut_method` (bin \"spot_mut_method\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `score` as mutable, as it is not declared as mutable\n  --> src/main.rs:13:5\n   |\n13 |     score.add(10);\n   |     ^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n12 |     let mut score = Score { points: 0 };\n   |         +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `spot_mut_method` (bin \"spot_mut_method\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/spot_mut_method"
    }
   ]
  },
  "station_loan.rs": {
   "src": "struct Radio {\n    station: String,\n    volume: u8,\n}\n\nimpl Radio {\n    fn station(&self) -> &str {\n        &self.station\n    }\n    fn louder(&mut self) {\n        self.volume += 1;\n    }\n}\n\nfn main() {\n    let mut radio = Radio { station: String::from(\"Jazz FM\"), volume: 5 };\n    let name = radio.station();\n    radio.louder();\n    println!(\"{} at {}\", name, radio.volume);\n}\n",
   "stdout": "",
   "stderr": "error[E0502]: cannot borrow `radio` as mutable because it is also borrowed as immutable\n  --> src/main.rs:18:5\n   |\n17 |     let name = radio.station();\n   |                ----- immutable borrow occurs here\n18 |     radio.louder();\n   |     ^^^^^^^^^^^^^^ mutable borrow occurs here\n19 |     println!(\"{} at {}\", name, radio.volume);\n   |                          ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `station_loan` (bin \"station_loan\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0502]: cannot borrow `radio` as mutable because it is also borrowed as immutable\n  --> src/main.rs:18:5\n   |\n17 |     let name = radio.station();\n   |                ----- immutable borrow occurs here\n18 |     radio.louder();\n   |     ^^^^^^^^^^^^^^ mutable borrow occurs here\n19 |     println!(\"{} at {}\", name, radio.volume);\n   |                          ---- immutable borrow later used here\n\nFor more information about this error, try `rustc --explain E0502`.\nerror: could not compile `station_loan` (bin \"station_loan\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/station_loan"
    }
   ]
  },
  "str_field.rs": {
   "src": "struct Card {\n    name: &str,\n    age: u32,\n}\n\nfn main() {\n    let card = Card { name: \"Ana\", age: 12 };\n    println!(\"{} is {}\", card.name, card.age);\n}\n",
   "stdout": "",
   "stderr": "error[E0106]: missing lifetime specifier\n --> src/main.rs:2:11\n  |\n2 |     name: &str,\n  |           ^ expected named lifetime parameter\n  |\nhelp: consider introducing a named lifetime parameter\n  |\n1 ~ struct Card<'a> {\n2 ~     name: &'a str,\n  |\n\nFor more information about this error, try `rustc --explain E0106`.\nerror: could not compile `str_field` (bin \"str_field\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0106]: missing lifetime specifier\n --> src/main.rs:2:11\n  |\n2 |     name: &str,\n  |           ^ expected named lifetime parameter\n  |\nhelp: consider introducing a named lifetime parameter\n  |\n1 ~ struct Card<'a> {\n2 ~     name: &'a str,\n  |\n\nFor more information about this error, try `rustc --explain E0106`.\nerror: could not compile `str_field` (bin \"str_field\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/str_field"
    }
   ]
  },
  "struct_mem.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let card = Card { name: String::from(\"Ana\"), age: 12 };\n    println!(\"{} is {}\", card.name, card.age);\n    let size = std::mem::size_of::<Card>();\n    println!(\"a Card takes {size} bytes on the stack\");\n}\n",
   "stdout": "Ana is 12\na Card takes 32 bytes on the stack\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana is 12\na Card takes 32 bytes on the stack\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/struct_mem"
    }
   ]
  },
  "thermo_panic.rs": {
   "src": "struct Thermostat {\n    target: i32,\n}\n\nimpl Thermostat {\n    fn new(asked: i32) -> Self {\n        if asked > 60 {\n            panic!(\"sensor error: {asked} is not a room temperature\");\n        }\n        let target = if asked < 16 {\n            16\n        } else if asked > 28 {\n            28\n        } else {\n            asked\n        };\n        Self { target }\n    }\n}\n\nfn main() {\n    let t = Thermostat::new(500);\n    println!(\"set to {}\", t.target);\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:8:13:\nsensor error: 500 is not a room temperature\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:8:13:\nsensor error: 500 is not a room temperature\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch10/thermo_panic"
    }
   ]
  },
  "thermostat.rs": {
   "src": "struct Thermostat {\n    target: i32,\n}\n\nimpl Thermostat {\n    fn new(asked: i32) -> Self {\n        if asked > 60 {\n            panic!(\"sensor error: {asked} is not a room temperature\");\n        }\n        let target = if asked < 16 {\n            16\n        } else if asked > 28 {\n            28\n        } else {\n            asked\n        };\n        Self { target }\n    }\n}\n\nfn main() {\n    for asked in [21, 35, 5, 28] {\n        let t = Thermostat::new(asked);\n        println!(\"asked {asked}, set to {}\", t.target);\n    }\n}\n",
   "stdout": "asked 21, set to 21\nasked 35, set to 28\nasked 5, set to 16\nasked 28, set to 28\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "asked 21, set to 21\nasked 35, set to 28\nasked 5, set to 16\nasked 28, set to 28\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/thermostat"
    }
   ]
  },
  "trace_jar.rs": {
   "src": "struct Jar {\n    cookies: u32,\n    eaten: u32,\n}\n\nimpl Jar {\n    fn eat(&mut self, n: u32) {\n        self.cookies -= n;\n        self.eaten += n;\n    }\n}\n\nfn main() {\n    let mut jar = Jar { cookies: 12, eaten: 0 };\n    for n in 1..=4 {\n        jar.eat(n);\n        println!(\"{} {} {}\", n, jar.cookies, jar.eaten);\n    }\n}\n",
   "stdout": "1 11 1\n2 9 3\n3 6 6\n4 2 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 11 1\n2 9 3\n3 6 6\n4 2 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/trace_jar"
    }
   ]
  },
  "trace_steps.rs": {
   "src": "struct Pos(i32, i32);\n\nfn main() {\n    let mut robot = Pos(0, 0);\n    for step in 1..=4 {\n        robot.0 += step;\n        robot.1 -= 1;\n        println!(\"{} {} {}\", step, robot.0, robot.1);\n    }\n}\n",
   "stdout": "1 1 -1\n2 3 -2\n3 6 -3\n4 10 -4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "1 1 -1\n2 3 -2\n3 6 -3\n4 10 -4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/trace_steps"
    }
   ]
  },
  "tuple_mix.rs": {
   "src": "struct Celsius(f64);\nstruct Fahrenheit(f64);\n\nfn show(t: Celsius) {\n    println!(\"{} degrees C\", t.0);\n}\n\nfn main() {\n    let oven = Fahrenheit(350.0);\n    show(oven);\n}\n",
   "stdout": "",
   "stderr": "error[E0308]: mismatched types\n  --> src/main.rs:10:10\n   |\n10 |     show(oven);\n   |     ---- ^^^^ expected `Celsius`, found `Fahrenheit`\n   |     |\n   |     arguments to this function are incorrect\n   |\nnote: function defined here\n  --> src/main.rs:4:4\n   |\n 4 | fn show(t: Celsius) {\n   |    ^^^^ ----------\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `tuple_mix` (bin \"tuple_mix\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0308]: mismatched types\n  --> src/main.rs:10:10\n   |\n10 |     show(oven);\n   |     ---- ^^^^ expected `Celsius`, found `Fahrenheit`\n   |     |\n   |     arguments to this function are incorrect\n   |\nnote: function defined here\n  --> src/main.rs:4:4\n   |\n 4 | fn show(t: Celsius) {\n   |    ^^^^ ----------\n\nFor more information about this error, try `rustc --explain E0308`.\nerror: could not compile `tuple_mix` (bin \"tuple_mix\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/tuple_mix"
    }
   ]
  },
  "tuple_struct.rs": {
   "src": "struct Shelf(u32, u32);\nstruct Celsius(f64);\n\nfn main() {\n    let spot = Shelf(4, 2);\n    println!(\"aisle {}, row {}\", spot.0, spot.1);\n\n    let Shelf(aisle, row) = spot;\n    println!(\"unpacked: {aisle} and {row}\");\n\n    let today = Celsius(21.5);\n    println!(\"{} degrees\", today.0);\n}\n",
   "stdout": "aisle 4, row 2\nunpacked: 4 and 2\n21.5 degrees\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "aisle 4, row 2\nunpacked: 4 and 2\n21.5 degrees\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/tuple_struct"
    }
   ]
  },
  "unit_struct.rs": {
   "src": "use std::mem::size_of;\n\nstruct Closed;\n\nfn main() {\n    let _sign = Closed;\n    println!(\"a Closed sign takes {} bytes\", size_of::<Closed>());\n    println!(\"a (u32, u32) takes {} bytes\", size_of::<(u32, u32)>());\n}\n",
   "stdout": "a Closed sign takes 0 bytes\na (u32, u32) takes 8 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "a Closed sign takes 0 bytes\na (u32, u32) takes 8 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/unit_struct"
    }
   ]
  },
  "update.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n    books_out: u32,\n}\n\nfn main() {\n    let ana = Card {\n        name: String::from(\"Ana\"),\n        age: 12,\n        books_out: 3,\n    };\n    let ada = Card {\n        name: String::from(\"Ada\"),\n        ..ana\n    };\n    println!(\"{}: age {}, {} books\", ada.name, ada.age, ada.books_out);\n    println!(\"{} still has her card\", ana.name);\n}\n",
   "stdout": "Ada: age 12, 3 books\nAna still has her card\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ada: age 12, 3 books\nAna still has her card\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/update"
    }
   ]
  },
  "update_move.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let ana = Card {\n        name: String::from(\"Ana\"),\n        age: 12,\n    };\n    let older = Card {\n        age: 13,\n        ..ana\n    };\n    println!(\"{} is now {}\", older.name, older.age);\n    println!(\"old card: {}\", ana.name);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `ana.name`\n  --> src/main.rs:16:30\n   |\n11 |       let older = Card {\n   |  _________________-\n12 | |         age: 13,\n13 | |         ..ana\n14 | |     };\n   | |_____- value moved here\n15 |       println!(\"{} is now {}\", older.name, older.age);\n16 |       println!(\"old card: {}\", ana.name);\n   |                                ^^^^^^^^ value borrowed here after move\n   |\n   = note: move occurs because `ana.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `update_move` (bin \"update_move\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `ana.name`\n  --> src/main.rs:16:30\n   |\n11 |       let older = Card {\n   |  _________________-\n12 | |         age: 13,\n13 | |         ..ana\n14 | |     };\n   | |_____- value moved here\n15 |       println!(\"{} is now {}\", older.name, older.age);\n16 |       println!(\"old card: {}\", ana.name);\n   |                                ^^^^^^^^ value borrowed here after move\n   |\n   = note: move occurs because `ana.name` has type `String`, which does not implement the `Copy` trait\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `update_move` (bin \"update_move\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch10/update_move"
    }
   ]
  },
  "update_partial.rs": {
   "src": "struct Card {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let ana = Card { name: String::from(\"Ana\"), age: 12 };\n    let older = Card { age: 13, ..ana };\n    println!(\"{} is now {}\", older.name, older.age);\n    println!(\"the old card still says {}\", ana.age);\n}\n",
   "stdout": "Ana is now 13\nthe old card still says 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana is now 13\nthe old card still says 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch10/update_partial"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
