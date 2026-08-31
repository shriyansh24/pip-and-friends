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
  "workdir": "/home/you/rust-ch21",
  "versionDifferences": [
   "boss_spot.rs",
   "road_missing.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_spot.rs, road_missing.rs."
 },
 "programs": {
  "any_alt.rs": {
   "src": "use anyhow::{Context, Result};\n\nfn parse_days(text: &str) -> Result<u32> {\n    let days: u32 = text.parse().context(\"not a number\")?;\n    Ok(days)\n}\n\nfn main() {\n    let cards = [\"7\", \"x\", \"28\"];\n    for c in cards {\n        match parse_days(c).with_context(|| format!(\"card {c:?}\")) {\n            Ok(d) => println!(\"{d} days\"),\n            Err(e) => {\n                println!(\"{e}\");\n                println!(\"{e:#}\");\n            }\n        }\n    }\n}\n",
   "stdout": "7 days\ncard \"x\"\ncard \"x\": not a number: invalid digit found in string\n28 days\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7 days\ncard \"x\"\ncard \"x\": not a number: invalid digit found in string\n28 days\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/any_alt"
    }
   ]
  },
  "any_how.rs": {
   "src": "use anyhow::{Context, Result, bail};\n\nfn parse_days(text: &str) -> Result<u32> {\n    let days: u32 = text\n        .trim()\n        .parse()\n        .with_context(|| format!(\"{text:?} is not a number of days\"))?;\n    if days > 28 {\n        bail!(\"{days} days is too long\");\n    }\n    Ok(days)\n}\n\nfn read_card(line: &str) -> Result<(String, u32)> {\n    let (title, days) = line.split_once(',').context(\"a loan card needs a comma\")?;\n    let days = parse_days(days).with_context(|| format!(\"bad loan card for {title}\"))?;\n    Ok((title.to_string(), days))\n}\n\nfn main() -> Result<()> {\n    println!(\"{:?}\", read_card(\"Dune,14\")?);\n    println!(\"{:?}\", read_card(\"Emma,two\")?);\n    Ok(())\n}\n",
   "stdout": "(\"Dune\", 14)\n",
   "stderr": "Error: bad loan card for Emma\n\nCaused by:\n    0: \"two\" is not a number of days\n    1: invalid digit found in string\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "(\"Dune\", 14)\n",
     "err": "Error: bad loan card for Emma\n\nCaused by:\n    0: \"two\" is not a number of days\n    1: invalid digit found in string\n",
     "exit": 1,
     "dir": "~/rust-ch21/any_how",
     "merged": "(\"Dune\", 14)\nError: bad loan card for Emma\n\nCaused by:\n    0: \"two\" is not a number of days\n    1: invalid digit found in string\n"
    }
   ]
  },
  "at_bindings.rs": {
   "src": "fn shelf_for(age: u32) -> String {\n    match age {\n        n @ 0..=12 => format!(\"{n}: children's corner\"),\n        n @ 13..=19 => format!(\"{n}: teen shelf\"),\n        n => format!(\"{n}: main stacks\"),\n    }\n}\n\nfn main() {\n    for age in [7, 13, 19, 52] {\n        println!(\"{}\", shelf_for(age));\n    }\n    let late = Some(9);\n    if let Some(d @ 8..=30) = late {\n        println!(\"{d} days late: send the letter\");\n    }\n}\n",
   "stdout": "7: children's corner\n13: teen shelf\n19: teen shelf\n52: main stacks\n9 days late: send the letter\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7: children's corner\n13: teen shelf\n19: teen shelf\n52: main stacks\n9 days late: send the letter\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/at_bindings"
    }
   ]
  },
  "binding_modes.rs": {
   "src": "struct Book {\n    title: String,\n    pages: u32,\n}\n\nfn describe(b: &Book) {\n    let Book { title, pages } = b;\n    println!(\"{title} has {pages} pages\");\n}\n\nfn main() {\n    let b = Book { title: String::from(\"Emma\"), pages: 474 };\n    describe(&b);\n    let Book { ref title, .. } = b;\n    println!(\"borrowed: {title}\");\n    println!(\"b is still whole: {}, {} pages\", b.title, b.pages);\n}\n",
   "stdout": "Emma has 474 pages\nborrowed: Emma\nb is still whole: Emma, 474 pages\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Emma has 474 pages\nborrowed: Emma\nb is still whole: Emma, 474 pages\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/binding_modes"
    }
   ]
  },
  "boss_fill.rs": {
   "src": "use std::num::ParseIntError;\n\nenum FineError {\n    Blank,\n    Bad(ParseIntError),\n}\n\nimpl From<ParseIntError> for FineError {\n    fn from(e: ParseIntError) -> Self {\n        FineError::Bad(e)\n    }\n}\n\nfn fine_cents(days: &str) -> Result<u32, FineError> {\n    let Some(text) = days.split_whitespace().next() else {\n        return Err(FineError::Blank);\n    };\n    let n = text.parse::<u32>()?;\n    Ok(n * 10)\n}\n\nfn main() {\n    for form in [\"3 days\", \"   \", \"x days\"] {\n        match fine_cents(form) {\n            Ok(c) => println!(\"{form:?}: {c} cents\"),\n            Err(FineError::Blank) => println!(\"{form:?}: blank form\"),\n            Err(FineError::Bad(e)) => println!(\"{form:?}: {e}\"),\n        }\n    }\n}\n",
   "stdout": "\"3 days\": 30 cents\n\"   \": blank form\n\"x days\": invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"3 days\": 30 cents\n\"   \": blank form\n\"x days\": invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "fn first_and_last(line: &str) -> String {\n    let words: Vec<&str> = line.split_whitespace().collect();\n    let [first, .., last] = words.as_slice() else {\n        return String::from(\"too short\");\n    };\n    format!(\"{first} ... {last}\")\n}\n\nfn main() {\n    println!(\"{}\", first_and_last(\"the owls are reading late\"));\n    println!(\"{}\", first_and_last(\"hush\"));\n}\n",
   "stdout": "the ... late\ntoo short\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "the ... late\ntoo short\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "enum Item {\n    Book { title: String, pages: u32 },\n    Dvd(String),\n    Returned(Vec<String>),\n}\n\nfn sort(item: &Item) -> String {\n    match item {\n        Item::Book { title, pages: p @ 500.. } => format!(\"{title}: big ({p})\"),\n        Item::Book { title, .. } => format!(\"{title}: book\"),\n        Item::Dvd(t) if t.len() > 4 => format!(\"{t}: long DVD name\"),\n        Item::Dvd(t) => format!(\"{t}: DVD\"),\n        Item::Returned(list) => match list.as_slice() {\n            [] => String::from(\"empty return bin\"),\n            [only] => format!(\"one back: {only}\"),\n            [first, rest @ ..] => format!(\"{first} + {} more\", rest.len()),\n        },\n    }\n}\n\nfn main() {\n    let items = [\n        Item::Book { title: \"Ulysses\".into(), pages: 730 },\n        Item::Book { title: \"Emma\".into(), pages: 474 },\n        Item::Dvd(\"Up\".into()),\n        Item::Dvd(\"Arrival\".into()),\n        Item::Returned(vec![\"Dune\".into(), \"Emma\".into(), \"Kim\".into()]),\n    ];\n    for it in &items {\n        println!(\"{}\", sort(it));\n    }\n}\n",
   "stdout": "Ulysses: big (730)\nEmma: book\nUp: DVD\nArrival: long DVD name\nDune + 2 more\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ulysses: big (730)\nEmma: book\nUp: DVD\nArrival: long DVD name\nDune + 2 more\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "fn shelf(weight: Option<u32>) -> &'static str {\n    match weight {\n        Some(w) if w > 2 => \"bottom\",\n        Some(w) if w <= 2 => \"top\",\n        None => \"none\",\n    }\n}\n\nfn main() {\n    println!(\"{}\", shelf(Some(3)));\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `Some(_)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match weight {\n  |           ^^^^^^ pattern `Some(_)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:606:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n5 ~         None => \"none\",\n6 ~         Some(_) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `Some(_)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match weight {\n  |           ^^^^^^ pattern `Some(_)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:606:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n5 ~         None => \"none\",\n6 ~         Some(_) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/boss_spot"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0004]: non-exhaustive patterns: `Some(_)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match weight {\n  |           ^^^^^^ pattern `Some(_)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:605:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n5 ~         None => \"none\",\n6 ~         Some(_) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0004]: non-exhaustive patterns: `Some(_)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match weight {\n  |           ^^^^^^ pattern `Some(_)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:605:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n5 ~         None => \"none\",\n6 ~         Some(_) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `boss_spot` (bin \"boss_spot\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch21/boss_spot"
     }
    ]
   }
  },
  "boss_trace.rs": {
   "src": "fn main() {\n    let mut stack = vec![(\"Kim\", 3), (\"Emma\", 0), (\"Dune\", 12), (\"Ulysses\", 40)];\n    while let Some((title, days)) = stack.pop() {\n        let note = match days {\n            0 => \"on-time\",\n            d @ 1..=14 if d % 2 == 0 => \"even-late\",\n            1..=14 => \"odd-late\",\n            _ => \"letter\",\n        };\n        println!(\"{title} {days} {note}\");\n    }\n}\n",
   "stdout": "Ulysses 40 letter\nDune 12 even-late\nEmma 0 on-time\nKim 3 odd-late\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ulysses 40 letter\nDune 12 even-late\nEmma 0 on-time\nKim 3 odd-late\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/boss_trace"
    }
   ]
  },
  "box_dyn.rs": {
   "src": "use std::error::Error;\nuse std::fs;\n\nfn main() -> Result<(), Box<dyn Error>> {\n    let days: u32 = \"14\".parse()?;\n    println!(\"parsed {days} days\");\n    let text = fs::read_to_string(\"loans.txt\")?;\n    println!(\"read {} bytes\", text.len());\n    Ok(())\n}\n",
   "stdout": "parsed 14 days\n",
   "stderr": "Error: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "parsed 14 days\n",
     "err": "Error: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n",
     "exit": 1,
     "dir": "~/rust-ch21/box_dyn",
     "merged": "parsed 14 days\nError: Os { code: 2, kind: NotFound, message: \"No such file or directory\" }\n"
    }
   ]
  },
  "box_dyn_parse.rs": {
   "src": "use std::error::Error;\n\nfn main() -> Result<(), Box<dyn Error>> {\n    let days: u32 = \"14\".parse()?;\n    println!(\"parsed {days} days\");\n    let more: u32 = \"two\".parse()?;\n    println!(\"parsed {more} more\");\n    Ok(())\n}\n",
   "stdout": "parsed 14 days\n",
   "stderr": "Error: ParseIntError { kind: InvalidDigit }\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "parsed 14 days\n",
     "err": "Error: ParseIntError { kind: InvalidDigit }\n",
     "exit": 1,
     "dir": "~/rust-ch21/box_dyn_parse",
     "merged": "parsed 14 days\nError: ParseIntError { kind: InvalidDigit }\n"
    }
   ]
  },
  "chain.rs": {
   "src": "use std::error::Error;\nuse std::fmt;\nuse std::num::ParseIntError;\n\n#[derive(Debug)]\nstruct CardError {\n    title: String,\n    cause: ParseIntError,\n}\n\nimpl fmt::Display for CardError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, \"bad loan card for {}\", self.title)\n    }\n}\n\nimpl Error for CardError {\n    fn source(&self) -> Option<&(dyn Error + 'static)> {\n        Some(&self.cause)\n    }\n}\n\nfn main() {\n    let cause = \"two\".parse::<u32>().unwrap_err();\n    let err = CardError { title: String::from(\"Emma\"), cause };\n\n    let mut current: Option<&dyn Error> = Some(&err);\n    let mut depth = 0;\n    while let Some(e) = current {\n        println!(\"{depth}: {e}\");\n        current = e.source();\n        depth += 1;\n    }\n}\n",
   "stdout": "0: bad loan card for Emma\n1: invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0: bad loan card for Emma\n1: invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/chain"
    }
   ]
  },
  "combinators.rs": {
   "src": "fn main() {\n    let found: Option<u32> = Some(412);\n    let missing: Option<u32> = None;\n\n    println!(\"map:      {:?}\", found.map(|p| p / 2));\n    println!(\"map:      {:?}\", missing.map(|p| p / 2));\n    println!(\"and_then: {:?}\", found.and_then(|p| if p > 400 { Some(\"thick\") } else { None }));\n    println!(\"or_else:  {:?}\", missing.or_else(|| Some(100)));\n    println!(\"unwrap_or_else: {}\", missing.unwrap_or_else(|| 0));\n\n    let parsed: Result<u32, _> = \"abc\".parse::<u32>();\n    println!(\"ok:       {:?}\", parsed.ok());\n\n    let maybe_text: Option<&str> = Some(\"28\");\n    let flipped: Result<Option<u32>, _> = maybe_text.map(|t| t.parse::<u32>()).transpose();\n    println!(\"transpose: {flipped:?}\");\n}\n",
   "stdout": "map:      Some(206)\nmap:      None\nand_then: Some(\"thick\")\nor_else:  Some(100)\nunwrap_or_else: 0\nok:       None\ntranspose: Ok(Some(28))\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "map:      Some(206)\nmap:      None\nand_then: Some(\"thick\")\nor_else:  Some(100)\nunwrap_or_else: 0\nok:       None\ntranspose: Ok(Some(28))\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/combinators"
    }
   ]
  },
  "custom_error.rs": {
   "src": "use std::fmt;\nuse std::num::ParseIntError;\n\n#[derive(Debug)]\nenum LoanError {\n    Empty,\n    NotANumber(ParseIntError),\n    TooLong(u32),\n}\n\nimpl fmt::Display for LoanError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        match self {\n            LoanError::Empty => write!(f, \"the form is empty\"),\n            LoanError::NotANumber(e) => write!(f, \"days must be a whole number ({e})\"),\n            LoanError::TooLong(d) => write!(f, \"{d} days is too long (the limit is 28)\"),\n        }\n    }\n}\n\nimpl std::error::Error for LoanError {}\n\nfn main() {\n    let problems = [\n        LoanError::Empty,\n        LoanError::NotANumber(\"two\".parse::<u32>().unwrap_err()),\n        LoanError::TooLong(40),\n    ];\n    for p in &problems {\n        println!(\"Display: {p}\");\n        println!(\"Debug:   {p:?}\");\n    }\n}\n",
   "stdout": "Display: the form is empty\nDebug:   Empty\nDisplay: days must be a whole number (invalid digit found in string)\nDebug:   NotANumber(ParseIntError { kind: InvalidDigit })\nDisplay: 40 days is too long (the limit is 28)\nDebug:   TooLong(40)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Display: the form is empty\nDebug:   Empty\nDisplay: days must be a whole number (invalid digit found in string)\nDebug:   NotANumber(ParseIntError { kind: InvalidDigit })\nDisplay: 40 days is too long (the limit is 28)\nDebug:   TooLong(40)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/custom_error"
    }
   ]
  },
  "destructure.rs": {
   "src": "struct Book {\n    title: String,\n    pages: u32,\n}\n\nenum Shape {\n    Circle { r: f64 },\n    Rect { w: f64, h: f64 },\n}\n\nfn main() {\n    let book = Book { title: String::from(\"Dune\"), pages: 412 };\n    let Book { title, pages: p } = book;\n    println!(\"{title}: {p} pages\");\n\n    let ((x, y), z) = ((1, 2), 3);\n    println!(\"x = {x}, y = {y}, z = {z}\");\n\n    let round = Shape::Circle { r: 1.5 };\n    let shapes = [round, Shape::Rect { w: 2.0, h: 3.0 }];\n    for s in &shapes {\n        match s {\n            Shape::Circle { r } => println!(\"circle, radius {r}\"),\n            Shape::Rect { w, h } => println!(\"rectangle, {w} by {h}\"),\n        }\n    }\n}\n",
   "stdout": "Dune: 412 pages\nx = 1, y = 2, z = 3\ncircle, radius 1.5\nrectangle, 2 by 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune: 412 pages\nx = 1, y = 2, z = 3\ncircle, radius 1.5\nrectangle, 2 by 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/destructure"
    }
   ]
  },
  "fill_chain.rs": {
   "src": "fn main() {\n    let shelf = vec![8, 3, 5];\n    if let Some(n) = shelf.first()\n        && *n > 5\n    {\n        println!(\"first box is heavy: {n}\");\n    }\n}\n",
   "stdout": "first box is heavy: 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first box is heavy: 8\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/fill_chain"
    }
   ]
  },
  "fill_destructure.rs": {
   "src": "struct Point {\n    x: i32,\n    y: i32,\n}\n\nstruct Shelf {\n    label: char,\n    spot: Point,\n}\n\nfn main() {\n    let s = Shelf { label: 'D', spot: Point { x: 4, y: 2 } };\n    let Shelf { label, spot: Point { x, y } } = s;\n    println!(\"shelf {label} is at column {x}, row {y}\");\n}\n",
   "stdout": "shelf D is at column 4, row 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelf D is at column 4, row 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/fill_destructure"
    }
   ]
  },
  "fill_from.rs": {
   "src": "use std::num::ParseIntError;\n\n#[derive(Debug)]\nenum CardError {\n    BadNumber(ParseIntError),\n    Missing,\n}\n\nimpl From<ParseIntError> for CardError {\n    fn from(e: ParseIntError) -> Self {\n        CardError::BadNumber(e)\n    }\n}\n\nfn card_number(line: &str) -> Result<u32, CardError> {\n    let (_, num) = line.split_once('#').ok_or(CardError::Missing)?;\n    let n = num.parse::<u32>()?;\n    Ok(n)\n}\n\nfn main() {\n    for line in [\"Ana #42\", \"Raj\", \"Li #4x\"] {\n        match card_number(line) {\n            Ok(n) => println!(\"{line}: card {n}\"),\n            Err(CardError::Missing) => println!(\"{line}: no # on the card\"),\n            Err(CardError::BadNumber(e)) => println!(\"{line}: {e}\"),\n        }\n    }\n}\n",
   "stdout": "Ana #42: card 42\nRaj: no # on the card\nLi #4x: invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana #42: card 42\nRaj: no # on the card\nLi #4x: invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/fill_from"
    }
   ]
  },
  "fill_let_else.rs": {
   "src": "fn shelf_of(code: &str) -> char {\n    let Some(letter) = code.chars().next() else {\n        return '?';\n    };\n    letter\n}\n\nfn main() {\n    println!(\"{}\", shelf_of(\"D-412\"));\n    println!(\"{}\", shelf_of(\"\"));\n}\n",
   "stdout": "D\n?\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "D\n?\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/fill_let_else"
    }
   ]
  },
  "fill_slice.rs": {
   "src": "fn ends(queue: &[&str]) -> String {\n    match queue {\n        [] => String::from(\"nobody waiting\"),\n        [only] => format!(\"only {only}\"),\n        [first, .., last] => format!(\"first {first}, last {last}\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", ends(&[\"Ana\", \"Raj\", \"Li\"]));\n    println!(\"{}\", ends(&[\"Mo\"]));\n    println!(\"{}\", ends(&[]));\n}\n",
   "stdout": "first Ana, last Li\nonly Mo\nnobody waiting\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "first Ana, last Li\nonly Mo\nnobody waiting\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/fill_slice"
    }
   ]
  },
  "from_impl.rs": {
   "src": "use std::fmt;\nuse std::num::ParseIntError;\n\n#[derive(Debug)]\nenum LoanError {\n    Empty,\n    NotANumber(ParseIntError),\n    TooLong(u32),\n}\n\nimpl fmt::Display for LoanError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        match self {\n            LoanError::Empty => write!(f, \"the form is empty\"),\n            LoanError::NotANumber(e) => write!(f, \"days must be a whole number ({e})\"),\n            LoanError::TooLong(d) => write!(f, \"{d} days is too long (the limit is 28)\"),\n        }\n    }\n}\n\nimpl std::error::Error for LoanError {}\n\nimpl From<ParseIntError> for LoanError {\n    fn from(e: ParseIntError) -> Self {\n        LoanError::NotANumber(e)\n    }\n}\n\nfn parse_days(text: &str) -> Result<u32, LoanError> {\n    let text = text.trim();\n    if text.is_empty() {\n        return Err(LoanError::Empty);\n    }\n    let days: u32 = text.parse()?;\n    if days > 28 {\n        return Err(LoanError::TooLong(days));\n    }\n    Ok(days)\n}\n\nfn main() {\n    for form in [\"14\", \"two\", \"\", \"40\"] {\n        match parse_days(form) {\n            Ok(d) => println!(\"{form:?}: ok, {d} days\"),\n            Err(e) => println!(\"{form:?}: refused, {e}\"),\n        }\n    }\n}\n",
   "stdout": "\"14\": ok, 14 days\n\"two\": refused, days must be a whole number (invalid digit found in string)\n\"\": refused, the form is empty\n\"40\": refused, 40 days is too long (the limit is 28)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"14\": ok, 14 days\n\"two\": refused, days must be a whole number (invalid digit found in string)\n\"\": refused, the form is empty\n\"40\": refused, 40 days is too long (the limit is 28)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/from_impl"
    }
   ]
  },
  "guard_choice.rs": {
   "src": "fn main() {\n    let x = Some(4);\n    let y = 10;\n    match x {\n        Some(n) if n == y => println!(\"matched y\"),\n        Some(y) => println!(\"bound a new y: {y}\"),\n        None => println!(\"none\"),\n    }\n    println!(\"outer y is still {y}\");\n}\n",
   "stdout": "bound a new y: 4\nouter y is still 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "bound a new y: 4\nouter y is still 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/guard_choice"
    }
   ]
  },
  "guards.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n        Some(w) => format!(\"light box: {w} kg, top shelf\"),\n    }\n}\n\nfn main() {\n    for item in [Some(5), Some(2), Some(0), None] {\n        println!(\"{}\", sort(item));\n    }\n}\n",
   "stdout": "heavy box: 5 kg, bottom shelf\nlight box: 2 kg, top shelf\nnothing to shelve\nnothing to shelve\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "heavy box: 5 kg, bottom shelf\nlight box: 2 kg, top shelf\nnothing to shelve\nnothing to shelve\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/guards"
    }
   ]
  },
  "invariant.rs": {
   "src": "struct Shelf {\n    books: Vec<String>,\n}\n\nimpl Shelf {\n    fn new(first: &str) -> Shelf {\n        Shelf { books: vec![first.to_string()] }\n    }\n\n    fn newest(&self) -> &str {\n        self.books.last().expect(\"a Shelf always holds at least one book\")\n    }\n}\n\nfn main() {\n    let s = Shelf::new(\"Dune\");\n    println!(\"newest: {}\", s.newest());\n}\n",
   "stdout": "newest: Dune\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "newest: Dune\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/invariant"
    }
   ]
  },
  "irrefutable_if.rs": {
   "src": "fn main() {\n    let pages = 412;\n    if let n = pages {\n        println!(\"{n} pages\");\n    }\n}\n",
   "stdout": "412 pages\n",
   "stderr": "warning: irrefutable `if let` pattern\n --> src/main.rs:3:8\n  |\n3 |     if let n = pages {\n  |        ^^^^^^^^^^^^^\n  |\n  = note: this pattern will always match, so the `if let` is useless\n  = help: consider replacing the `if let` with a `let`\n  = note: `#[warn(irrefutable_let_patterns)]` on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "412 pages\n",
     "err": "warning: irrefutable `if let` pattern\n --> src/main.rs:3:8\n  |\n3 |     if let n = pages {\n  |        ^^^^^^^^^^^^^\n  |\n  = note: this pattern will always match, so the `if let` is useless\n  = help: consider replacing the `if let` with a `let`\n  = note: `#[warn(irrefutable_let_patterns)]` on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch21/irrefutable_if",
     "merged": "warning: irrefutable `if let` pattern\n --> src/main.rs:3:8\n  |\n3 |     if let n = pages {\n  |        ^^^^^^^^^^^^^\n  |\n  = note: this pattern will always match, so the `if let` is useless\n  = help: consider replacing the `if let` with a `let`\n  = note: `#[warn(irrefutable_let_patterns)]` on by default\n\n412 pages\n"
    }
   ]
  },
  "let_chain.rs": {
   "src": "fn main() {\n    let line = \"Dune:412\";\n\n    if let Some((title, pages)) = line.split_once(':') {\n        if let Ok(n) = pages.parse::<u32>() {\n            if n > 300 {\n                println!(\"nested: {title} is a long read ({n} pages)\");\n            }\n        }\n    }\n\n    if let Some((title, pages)) = line.split_once(':')\n        && let Ok(n) = pages.parse::<u32>()\n        && n > 300\n    {\n        println!(\"chained: {title} is a long read ({n} pages)\");\n    }\n}\n",
   "stdout": "nested: Dune is a long read (412 pages)\nchained: Dune is a long read (412 pages)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "nested: Dune is a long read (412 pages)\nchained: Dune is a long read (412 pages)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/let_chain"
    }
   ]
  },
  "let_chain_2021.rs": {
   "src": "fn main() {\n    let line = \"Dune:412\";\n\n    if let Some((title, pages)) = line.split_once(':') {\n        if let Ok(n) = pages.parse::<u32>() {\n            if n > 300 {\n                println!(\"nested: {title} is a long read ({n} pages)\");\n            }\n        }\n    }\n\n    if let Some((title, pages)) = line.split_once(':')\n        && let Ok(n) = pages.parse::<u32>()\n        && n > 300\n    {\n        println!(\"chained: {title} is a long read ({n} pages)\");\n    }\n}\n",
   "stdout": "",
   "stderr": "error: let chains are only allowed in Rust 2024 or later\n  --> src/main.rs:12:8\n   |\n12 |     if let Some((title, pages)) = line.split_once(':')\n   |        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\nerror: let chains are only allowed in Rust 2024 or later\n  --> src/main.rs:13:12\n   |\n13 |         && let Ok(n) = pages.parse::<u32>()\n   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\nerror: could not compile `let_chain_2021` (bin \"let_chain_2021\") due to 2 previous errors\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: let chains are only allowed in Rust 2024 or later\n  --> src/main.rs:12:8\n   |\n12 |     if let Some((title, pages)) = line.split_once(':')\n   |        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\nerror: let chains are only allowed in Rust 2024 or later\n  --> src/main.rs:13:12\n   |\n13 |         && let Ok(n) = pages.parse::<u32>()\n   |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\nerror: could not compile `let_chain_2021` (bin \"let_chain_2021\") due to 2 previous errors\n",
     "exit": 101,
     "dir": "~/rust-ch21/let_chain_2021"
    }
   ]
  },
  "let_else.rs": {
   "src": "fn first_word(text: &str) -> &str {\n    let Some(word) = text.split_whitespace().next() else {\n        return \"(blank card)\";\n    };\n    word\n}\n\nfn main() {\n    println!(\"{}\", first_word(\"Dune Messiah\"));\n    println!(\"{}\", first_word(\"    \"));\n    println!(\"{}\", first_word(\"Emma\"));\n}\n",
   "stdout": "Dune\n(blank card)\nEmma\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune\n(blank card)\nEmma\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/let_else"
    }
   ]
  },
  "machine_q.rs": {
   "src": "use std::num::ParseIntError;\n\n#[derive(Debug)]\nenum LoanError {\n    Empty,\n    NotANumber(ParseIntError),\n    TooLong(u32),\n}\n\nimpl From<ParseIntError> for LoanError {\n    fn from(e: ParseIntError) -> Self {\n        LoanError::NotANumber(e)\n    }\n}\n\nfn parse_days(text: &str) -> Result<u32, LoanError> {\n    if text.is_empty() {\n        return Err(LoanError::Empty);\n    }\n    let days: u32 = text.parse()?;\n    if days > 28 {\n        return Err(LoanError::TooLong(days));\n    }\n    Ok(days)\n}\n\nfn main() {\n    for form in [\"14\", \"two\", \"-3\", \"\", \"40\"] {\n        println!(\"parse_days({form:?}) = {:?}\", parse_days(form));\n    }\n}\n",
   "stdout": "parse_days(\"14\") = Ok(14)\nparse_days(\"two\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"-3\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"\") = Err(Empty)\nparse_days(\"40\") = Err(TooLong(40))\n",
   "stderr": "warning: field `0` is never read\n --> src/main.rs:6:16\n  |\n6 |     NotANumber(ParseIntError),\n  |     ---------- ^^^^^^^^^^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n6 -     NotANumber(ParseIntError),\n6 +     NotANumber(()),\n  |\n\nwarning: field `0` is never read\n --> src/main.rs:7:13\n  |\n7 |     TooLong(u32),\n  |     ------- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n7 -     TooLong(u32),\n7 +     TooLong(()),\n  |\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "parse_days(\"14\") = Ok(14)\nparse_days(\"two\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"-3\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"\") = Err(Empty)\nparse_days(\"40\") = Err(TooLong(40))\n",
     "err": "warning: field `0` is never read\n --> src/main.rs:6:16\n  |\n6 |     NotANumber(ParseIntError),\n  |     ---------- ^^^^^^^^^^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n6 -     NotANumber(ParseIntError),\n6 +     NotANumber(()),\n  |\n\nwarning: field `0` is never read\n --> src/main.rs:7:13\n  |\n7 |     TooLong(u32),\n  |     ------- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n7 -     TooLong(u32),\n7 +     TooLong(()),\n  |\n\n",
     "exit": 0,
     "dir": "~/rust-ch21/machine_q",
     "merged": "warning: field `0` is never read\n --> src/main.rs:6:16\n  |\n6 |     NotANumber(ParseIntError),\n  |     ---------- ^^^^^^^^^^^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\n  = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n6 -     NotANumber(ParseIntError),\n6 +     NotANumber(()),\n  |\n\nwarning: field `0` is never read\n --> src/main.rs:7:13\n  |\n7 |     TooLong(u32),\n  |     ------- ^^^\n  |     |\n  |     field in this variant\n  |\n  = note: `LoanError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis\nhelp: consider changing the field to be of unit type to suppress this warning while preserving the field numbering, or remove the field\n  |\n7 -     TooLong(u32),\n7 +     TooLong(()),\n  |\n\nparse_days(\"14\") = Ok(14)\nparse_days(\"two\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"-3\") = Err(NotANumber(ParseIntError { kind: InvalidDigit }))\nparse_days(\"\") = Err(Empty)\nparse_days(\"40\") = Err(TooLong(40))\n"
    }
   ]
  },
  "map_err_ok_or.rs": {
   "src": "use std::num::ParseIntError;\n\nenum LoanError {\n    NotANumber(ParseIntError),\n    NoSuchShelf(usize),\n}\n\nfn shelf_days(shelves: &[&str], i: usize) -> Result<u32, LoanError> {\n    let text = shelves.get(i).ok_or(LoanError::NoSuchShelf(i))?;\n    let days = text.parse::<u32>().map_err(LoanError::NotANumber)?;\n    Ok(days)\n}\n\nfn main() {\n    let shelves = [\"14\", \"7\", \"lots\"];\n    for i in [1, 5, 2] {\n        match shelf_days(&shelves, i) {\n            Ok(d) => println!(\"shelf {i}: {d} days\"),\n            Err(LoanError::NoSuchShelf(n)) => println!(\"shelf {i}: there is no shelf {n}\"),\n            Err(LoanError::NotANumber(e)) => println!(\"shelf {i}: {e}\"),\n        }\n    }\n}\n",
   "stdout": "shelf 1: 7 days\nshelf 5: there is no shelf 5\nshelf 2: invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelf 1: 7 days\nshelf 5: there is no shelf 5\nshelf 2: invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/map_err_ok_or"
    }
   ]
  },
  "mix_errors.rs": {
   "src": "#[derive(Debug)]\nenum LoanError {\n    TooLong(u32),\n}\n\nfn parse_days(text: &str) -> Result<u32, LoanError> {\n    let days = text.trim().parse::<u32>()?;\n    if days > 28 {\n        return Err(LoanError::TooLong(days));\n    }\n    Ok(days)\n}\n\nfn main() {\n    println!(\"{:?}\", parse_days(\"14\"));\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `?` couldn't convert the error to `LoanError`\n --> src/main.rs:7:42\n  |\n6 | fn parse_days(text: &str) -> Result<u32, LoanError> {\n  |                              ---------------------- expected `LoanError` because of this\n7 |     let days = text.trim().parse::<u32>()?;\n  |                            --------------^ the trait `From<ParseIntError>` is not implemented for `LoanError`\n  |                            |\n  |                            this can't be annotated with `?` because it has type `Result<_, ParseIntError>`\n  |\nnote: `LoanError` needs to implement `From<ParseIntError>`\n --> src/main.rs:2:1\n  |\n2 | enum LoanError {\n  | ^^^^^^^^^^^^^^\n  = note: the question mark operation (`?`) implicitly performs a conversion on the error value using the `From` trait\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_errors` (bin \"mix_errors\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `?` couldn't convert the error to `LoanError`\n --> src/main.rs:7:42\n  |\n6 | fn parse_days(text: &str) -> Result<u32, LoanError> {\n  |                              ---------------------- expected `LoanError` because of this\n7 |     let days = text.trim().parse::<u32>()?;\n  |                            --------------^ the trait `From<ParseIntError>` is not implemented for `LoanError`\n  |                            |\n  |                            this can't be annotated with `?` because it has type `Result<_, ParseIntError>`\n  |\nnote: `LoanError` needs to implement `From<ParseIntError>`\n --> src/main.rs:2:1\n  |\n2 | enum LoanError {\n  | ^^^^^^^^^^^^^^\n  = note: the question mark operation (`?`) implicitly performs a conversion on the error value using the `From` trait\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `mix_errors` (bin \"mix_errors\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/mix_errors"
    }
   ]
  },
  "mix_errors_infer.rs": {
   "src": "#[derive(Debug)]\nenum LoanError {\n    TooLong(u32),\n}\n\nfn parse_days(text: &str) -> Result<u32, LoanError> {\n    let days: u32 = text.trim().parse()?;\n    if days > 28 {\n        return Err(LoanError::TooLong(days));\n    }\n    Ok(days)\n}\n\nfn main() {\n    println!(\"{:?}\", parse_days(\"14\"));\n}\n",
   "stdout": "",
   "stderr": "error[E0271]: type mismatch resolving `<u32 as FromStr>::Err == LoanError`\n --> src/main.rs:7:33\n  |\n7 |     let days: u32 = text.trim().parse()?;\n  |                                 ^^^^^ expected `LoanError`, found `ParseIntError`\n\nFor more information about this error, try `rustc --explain E0271`.\nerror: could not compile `mix_errors_infer` (bin \"mix_errors_infer\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0271]: type mismatch resolving `<u32 as FromStr>::Err == LoanError`\n --> src/main.rs:7:33\n  |\n7 |     let days: u32 = text.trim().parse()?;\n  |                                 ^^^^^ expected `LoanError`, found `ParseIntError`\n\nFor more information about this error, try `rustc --explain E0271`.\nerror: could not compile `mix_errors_infer` (bin \"mix_errors_infer\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/mix_errors_infer"
    }
   ]
  },
  "nested.rs": {
   "src": "struct Reader {\n    name: String,\n    age: u32,\n}\n\nenum Event {\n    Borrow { who: Reader, title: String },\n    Return(String),\n}\n\nfn log(ev: Event) {\n    match ev {\n        Event::Borrow { who: Reader { name, age: 0..=12 }, title } => {\n            println!(\"{name} (a kid) borrows {title}: kids' card\")\n        }\n        Event::Borrow { who: Reader { name, .. }, title } => {\n            println!(\"{name} borrows {title}\")\n        }\n        Event::Return(title) => println!(\"{title} comes back\"),\n    }\n}\n\nfn main() {\n    let ana = Reader { name: \"Ana\".into(), age: 9 };\n    let raj = Reader { name: \"Raj\".into(), age: 40 };\n    log(Event::Borrow { who: ana, title: \"Matilda\".into() });\n    log(Event::Borrow { who: raj, title: \"Dune\".into() });\n    log(Event::Return(\"Emma\".into()));\n}\n",
   "stdout": "Ana (a kid) borrows Matilda: kids' card\nRaj borrows Dune\nEmma comes back\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ana (a kid) borrows Matilda: kids' card\nRaj borrows Dune\nEmma comes back\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/nested"
    }
   ]
  },
  "nested_match.rs": {
   "src": "fn pages_nested(line: &str) -> Option<u32> {\n    match line.split_once(':') {\n        Some((_, p)) => match p.trim().parse::<u32>() {\n            Ok(n) => Some(n),\n            Err(_) => None,\n        },\n        None => None,\n    }\n}\n\nfn pages_chained(line: &str) -> Option<u32> {\n    line.split_once(':').and_then(|(_, p)| p.trim().parse().ok())\n}\n\nfn main() {\n    for line in [\"Dune: 412\", \"Emma\", \"Ulysses: many\"] {\n        println!(\"{:?} {:?}\", pages_nested(line), pages_chained(line));\n    }\n}\n",
   "stdout": "Some(412) Some(412)\nNone None\nNone None\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(412) Some(412)\nNone None\nNone None\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/nested_match"
    }
   ]
  },
  "nonexhaustive_int.rs": {
   "src": "fn main() {\n    let days: i32 = 3;\n    let msg = match days {\n        1..=10 => \"due soon\",\n    };\n    println!(\"{msg}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `i32::MIN..=0_i32` and `11_i32..=i32::MAX` not covered\n --> src/main.rs:3:21\n  |\n3 |     let msg = match days {\n  |                     ^^^^ patterns `i32::MIN..=0_i32` and `11_i32..=i32::MAX` not covered\n  |\n  = note: the matched value is of type `i32`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern, a match arm with multiple or-patterns as shown, or multiple match arms\n  |\n4 ~         1..=10 => \"due soon\",\n5 ~         i32::MIN..=0_i32 | 11_i32..=i32::MAX => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `nonexhaustive_int` (bin \"nonexhaustive_int\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `i32::MIN..=0_i32` and `11_i32..=i32::MAX` not covered\n --> src/main.rs:3:21\n  |\n3 |     let msg = match days {\n  |                     ^^^^ patterns `i32::MIN..=0_i32` and `11_i32..=i32::MAX` not covered\n  |\n  = note: the matched value is of type `i32`\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern, a match arm with multiple or-patterns as shown, or multiple match arms\n  |\n4 ~         1..=10 => \"due soon\",\n5 ~         i32::MIN..=0_i32 | 11_i32..=i32::MAX => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `nonexhaustive_int` (bin \"nonexhaustive_int\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/nonexhaustive_int"
    }
   ]
  },
  "parsons_match.rs": {
   "src": "fn main() {\n    let mut tickets = vec![None, Some(4), Some(7)];\n    while let Some(t) = tickets.pop() {\n        match t {\n            Some(n) if n % 2 == 0 => println!(\"{n}: even desk\"),\n            Some(n) => println!(\"{n}: odd desk\"),\n            _ => println!(\"no ticket\"),\n        }\n    }\n}\n",
   "stdout": "7: odd desk\n4: even desk\nno ticket\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "7: odd desk\n4: even desk\nno ticket\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/parsons_match"
    }
   ]
  },
  "partial_move.rs": {
   "src": "struct Book { title: String, pages: u32 }\nstruct Loan { book: Book, days: u32 }\n\nfn main() {\n    let loan = Loan { book: Book { title: String::from(\"Dune\"), pages: 412 }, days: 14 };\n    let Loan { book: Book { title, .. }, days } = loan;\n    println!(\"{title} for {days} days\");\n    println!(\"loan.book.pages is still here: {}\", loan.book.pages);\n}\n",
   "stdout": "Dune for 14 days\nloan.book.pages is still here: 412\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune for 14 days\nloan.book.pages is still here: 412\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/partial_move"
    }
   ]
  },
  "partial_move_bad.rs": {
   "src": "struct Book { title: String, pages: u32 }\nstruct Loan { book: Book, days: u32 }\n\nfn main() {\n    let loan = Loan { book: Book { title: String::from(\"Dune\"), pages: 412 }, days: 14 };\n    let Loan { book: Book { title, .. }, days } = loan;\n    println!(\"{title} for {days} days\");\n    let again = loan;\n    println!(\"{} pages\", again.book.pages);\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of partially moved value: `loan`\n --> src/main.rs:8:17\n  |\n6 |     let Loan { book: Book { title, .. }, days } = loan;\n  |                             ----- value partially moved here\n7 |     println!(\"{title} for {days} days\");\n8 |     let again = loan;\n  |                 ^^^^ value used here after partial move\n  |\n  = note: partial move occurs because `loan.book.title` has type `String`, which does not implement the `Copy` trait\nhelp: borrow this binding in the pattern to avoid moving the value\n  |\n6 |     let Loan { book: Book { ref title, .. }, days } = loan;\n  |                             +++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `partial_move_bad` (bin \"partial_move_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of partially moved value: `loan`\n --> src/main.rs:8:17\n  |\n6 |     let Loan { book: Book { title, .. }, days } = loan;\n  |                             ----- value partially moved here\n7 |     println!(\"{title} for {days} days\");\n8 |     let again = loan;\n  |                 ^^^^ value used here after partial move\n  |\n  = note: partial move occurs because `loan.book.title` has type `String`, which does not implement the `Copy` trait\nhelp: borrow this binding in the pattern to avoid moving the value\n  |\n6 |     let Loan { book: Book { ref title, .. }, days } = loan;\n  |                             +++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `partial_move_bad` (bin \"partial_move_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/partial_move_bad"
    }
   ]
  },
  "patterns_everywhere.rs": {
   "src": "fn show(&(x, y): &(i32, i32)) {\n    println!(\"fn parameter: x = {x}, y = {y}\");\n}\n\nfn main() {\n    let (title, pages) = (\"Dune\", 412);\n    println!(\"let: {title} has {pages} pages\");\n\n    match pages {\n        0 => println!(\"match: an empty book\"),\n        n => println!(\"match: {n} pages\"),\n    }\n\n    if let Some(first) = title.chars().next() {\n        println!(\"if let: starts with {first}\");\n    }\n\n    let mut cart = vec![\"Emma\", \"Ulysses\"];\n    while let Some(book) = cart.pop() {\n        println!(\"while let: shelving {book}\");\n    }\n\n    for (i, t) in [\"Dune\", \"Emma\"].iter().enumerate() {\n        println!(\"for: {i} -> {t}\");\n    }\n\n    show(&(3, 4));\n}\n",
   "stdout": "let: Dune has 412 pages\nmatch: 412 pages\nif let: starts with D\nwhile let: shelving Ulysses\nwhile let: shelving Emma\nfor: 0 -> Dune\nfor: 1 -> Emma\nfn parameter: x = 3, y = 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "let: Dune has 412 pages\nmatch: 412 pages\nif let: starts with D\nwhile let: shelving Ulysses\nwhile let: shelving Emma\nfor: 0 -> Dune\nfor: 1 -> Emma\nfn parameter: x = 3, y = 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/patterns_everywhere"
    }
   ]
  },
  "predict_arms.rs": {
   "src": "fn sticker(item: (char, u32)) -> &'static str {\n    match item {\n        ('A'..='M', p) if p > 400 => \"thick, first half\",\n        ('A'..='M', _) => \"first half\",\n        (_, 0) => \"blank book\",\n        (_, 1..=99) | ('Z', _) => \"slim or Z\",\n        _ => \"second half\",\n    }\n}\n\nfn main() {\n    println!(\"{}\", sticker(('D', 412)));\n    println!(\"{}\", sticker(('E', 90)));\n    println!(\"{}\", sticker(('U', 730)));\n    println!(\"{}\", sticker(('Z', 500)));\n    println!(\"{}\", sticker(('P', 0)));\n}\n",
   "stdout": "thick, first half\nfirst half\nsecond half\nslim or Z\nblank book\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "thick, first half\nfirst half\nsecond half\nslim or Z\nblank book\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/predict_arms"
    }
   ]
  },
  "predict_comb.rs": {
   "src": "fn main() {\n    let a: Option<u32> = Some(10);\n    let b: Option<u32> = None;\n    println!(\"{:?}\", a.map(|n| n + 1));\n    println!(\"{:?}\", b.map(|n| n + 1));\n    println!(\"{}\", b.unwrap_or_else(|| 7));\n    println!(\"{:?}\", a.and_then(|n| if n > 20 { Some(n) } else { None }));\n    println!(\"{:?}\", \"5\".parse::<u32>().ok().map(|n| n * 3));\n}\n",
   "stdout": "Some(11)\nNone\n7\nNone\nSome(15)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(11)\nNone\n7\nNone\nSome(15)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/predict_comb"
    }
   ]
  },
  "predict_display.rs": {
   "src": "use std::fmt;\n\n#[derive(Debug)]\nenum ShelfError {\n    Full { shelf: char, max: u32 },\n    Unknown(char),\n}\n\nimpl fmt::Display for ShelfError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        match self {\n            ShelfError::Full { shelf, max } => write!(f, \"shelf {shelf} is full ({max} books)\"),\n            ShelfError::Unknown(c) => write!(f, \"there is no shelf {c}\"),\n        }\n    }\n}\n\nfn main() {\n    let a = ShelfError::Full { shelf: 'D', max: 40 };\n    let b = ShelfError::Unknown('Q');\n    println!(\"{a}\");\n    println!(\"{b:?}\");\n    println!(\"{}\", b.to_string().len());\n}\n",
   "stdout": "shelf D is full (40 books)\nUnknown('Q')\n19\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "shelf D is full (40 books)\nUnknown('Q')\n19\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/predict_display"
    }
   ]
  },
  "predict_let_else.rs": {
   "src": "fn days_left(card: &str) -> u32 {\n    let Some((_, days)) = card.split_once('=') else {\n        return 0;\n    };\n    let Ok(n) = days.parse::<u32>() else {\n        return 99;\n    };\n    n\n}\n\nfn main() {\n    println!(\"{}\", days_left(\"Dune=14\"));\n    println!(\"{}\", days_left(\"Emma\"));\n    println!(\"{}\", days_left(\"Ulysses=soon\"));\n}\n",
   "stdout": "14\n0\n99\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "14\n0\n99\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/predict_let_else"
    }
   ]
  },
  "ranges_or.rs": {
   "src": "fn fine(days_late: u32) -> &'static str {\n    match days_late {\n        0 => \"no fine\",\n        1..=7 => \"10 cents a day\",\n        8..=30 => \"a stern letter\",\n        _ => \"Mabel phones you\",\n    }\n}\n\nfn kind(c: char) -> &'static str {\n    match c {\n        'a' | 'e' | 'i' | 'o' | 'u' => \"vowel\",\n        'a'..='z' => \"consonant\",\n        '0'..='9' => \"digit\",\n        _ => \"something else\",\n    }\n}\n\nfn main() {\n    for d in [0, 3, 12, 45] {\n        println!(\"{d} days late: {}\", fine(d));\n    }\n    for c in ['e', 'k', '7', '!'] {\n        println!(\"{c:?}: {}\", kind(c));\n    }\n}\n",
   "stdout": "0 days late: no fine\n3 days late: 10 cents a day\n12 days late: a stern letter\n45 days late: Mabel phones you\n'e': vowel\n'k': consonant\n'7': digit\n'!': something else\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0 days late: no fine\n3 days late: 10 cents a day\n12 days late: a stern letter\n45 days late: Mabel phones you\n'e': vowel\n'k': consonant\n'7': digit\n'!': something else\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/ranges_or"
    }
   ]
  },
  "refutable_let.rs": {
   "src": "fn main() {\n    let shelf = vec![\"Dune\", \"Emma\"];\n    let Some(first) = shelf.first();\n    println!(\"first book: {first}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0005]: refutable pattern in local binding\n --> src/main.rs:3:9\n  |\n3 |     let Some(first) = shelf.first();\n  |         ^^^^^^^^^^^ pattern `None` not covered\n  |\n  = note: `let` bindings require an \"irrefutable pattern\", like a `struct` or an `enum` with only one variant\n  = note: for more information, visit https://doc.rust-lang.org/book/ch19-02-refutability.html\n  = note: the matched value is of type `Option<&&str>`\nhelp: you might want to use `let...else` to handle the variant that isn't matched\n  |\n3 |     let Some(first) = shelf.first() else { todo!() };\n  |                                     ++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0005`.\nerror: could not compile `refutable_let` (bin \"refutable_let\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0005]: refutable pattern in local binding\n --> src/main.rs:3:9\n  |\n3 |     let Some(first) = shelf.first();\n  |         ^^^^^^^^^^^ pattern `None` not covered\n  |\n  = note: `let` bindings require an \"irrefutable pattern\", like a `struct` or an `enum` with only one variant\n  = note: for more information, visit https://doc.rust-lang.org/book/ch19-02-refutability.html\n  = note: the matched value is of type `Option<&&str>`\nhelp: you might want to use `let...else` to handle the variant that isn't matched\n  |\n3 |     let Some(first) = shelf.first() else { todo!() };\n  |                                     ++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0005`.\nerror: could not compile `refutable_let` (bin \"refutable_let\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/refutable_let"
    }
   ]
  },
  "road_heavy.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n        Some(w) => format!(\"light box: {w} kg, top shelf\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", sort(Some(5)));\n}\n",
   "stdout": "heavy box: 5 kg, bottom shelf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "heavy box: 5 kg, bottom shelf\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/road_heavy"
    }
   ]
  },
  "road_light.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n        Some(w) => format!(\"light box: {w} kg, top shelf\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", sort(Some(2)));\n}\n",
   "stdout": "light box: 2 kg, top shelf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "light box: 2 kg, top shelf\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/road_light"
    }
   ]
  },
  "road_missing.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", sort(Some(5)));\n}\n",
   "stdout": "",
   "stderr": "error[E0004]: non-exhaustive patterns: `Some(1_u32..=u32::MAX)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match item {\n  |           ^^^^ pattern `Some(1_u32..=u32::MAX)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:606:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n4 ~         Some(0) | None => String::from(\"nothing to shelve\"),\n5 ~         Some(1_u32..=u32::MAX) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0004]: non-exhaustive patterns: `Some(1_u32..=u32::MAX)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match item {\n  |           ^^^^ pattern `Some(1_u32..=u32::MAX)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:598:0\n ::: /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/option.rs:606:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n4 ~         Some(0) | None => String::from(\"nothing to shelve\"),\n5 ~         Some(1_u32..=u32::MAX) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/road_missing"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0004]: non-exhaustive patterns: `Some(1_u32..=u32::MAX)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match item {\n  |           ^^^^ pattern `Some(1_u32..=u32::MAX)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:605:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n4 ~         Some(0) | None => String::from(\"nothing to shelve\"),\n5 ~         Some(1_u32..=u32::MAX) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0004]: non-exhaustive patterns: `Some(1_u32..=u32::MAX)` not covered\n --> src/main.rs:2:11\n  |\n2 |     match item {\n  |           ^^^^ pattern `Some(1_u32..=u32::MAX)` not covered\n  |\nnote: `Option<u32>` defined here\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:597:0\n ::: /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/option.rs:605:4\n  |\n  = note: not covered\n  = note: the matched value is of type `Option<u32>`\n  = note: match arms with guards don't count towards exhaustivity\nhelp: ensure that all possible cases are being handled by adding a match arm with a wildcard pattern or an explicit pattern as shown\n  |\n4 ~         Some(0) | None => String::from(\"nothing to shelve\"),\n5 ~         Some(1_u32..=u32::MAX) => todo!(),\n  |\n\nFor more information about this error, try `rustc --explain E0004`.\nerror: could not compile `road_missing` (bin \"road_missing\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch21/road_missing"
     }
    ]
   }
  },
  "road_none.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n        Some(w) => format!(\"light box: {w} kg, top shelf\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", sort(None));\n}\n",
   "stdout": "nothing to shelve\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "nothing to shelve\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/road_none"
    }
   ]
  },
  "road_zero.rs": {
   "src": "fn sort(item: Option<u32>) -> String {\n    match item {\n        Some(w) if w > 2 => format!(\"heavy box: {w} kg, bottom shelf\"),\n        Some(0) | None => String::from(\"nothing to shelve\"),\n        Some(w) => format!(\"light box: {w} kg, top shelf\"),\n    }\n}\n\nfn main() {\n    println!(\"{}\", sort(Some(0)));\n}\n",
   "stdout": "nothing to shelve\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "nothing to shelve\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/road_zero"
    }
   ]
  },
  "slices.rs": {
   "src": "fn describe(shelf: &[&str]) -> String {\n    match shelf {\n        [] => String::from(\"an empty shelf\"),\n        [one] => format!(\"just {one}\"),\n        [first, last] => format!(\"{first} and {last}\"),\n        [first, .., last] => format!(\"{first} ... {last} ({} books)\", shelf.len()),\n    }\n}\n\nfn total(pages: &[u32]) -> u32 {\n    match pages {\n        [] => 0,\n        [first, rest @ ..] => first + total(rest),\n    }\n}\n\nfn main() {\n    println!(\"{}\", describe(&[]));\n    println!(\"{}\", describe(&[\"Dune\"]));\n    println!(\"{}\", describe(&[\"Dune\", \"Emma\"]));\n    println!(\"{}\", describe(&[\"Dune\", \"Emma\", \"Ulysses\", \"Beloved\"]));\n    println!(\"total pages: {}\", total(&[412, 474, 730]));\n}\n",
   "stdout": "an empty shelf\njust Dune\nDune and Emma\nDune ... Beloved (4 books)\ntotal pages: 1616\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "an empty shelf\njust Dune\nDune and Emma\nDune ... Beloved (4 books)\ntotal pages: 1616\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/slices"
    }
   ]
  },
  "spot_from.rs": {
   "src": "use std::num::ParseIntError;\n\n#[derive(Debug)]\nenum CardError {\n    BadNumber(ParseIntError),\n    Missing,\n}\n\nfn card_number(line: &str) -> Result<u32, CardError> {\n    let (_, num) = line.split_once('#').ok_or(CardError::Missing)?;\n    let n = num.parse::<u32>()?;\n    Ok(n)\n}\n\nfn main() {\n    println!(\"{:?}\", card_number(\"Ana #42\"));\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `?` couldn't convert the error to `CardError`\n  --> src/main.rs:11:31\n   |\n 9 | fn card_number(line: &str) -> Result<u32, CardError> {\n   |                               ---------------------- expected `CardError` because of this\n10 |     let (_, num) = line.split_once('#').ok_or(CardError::Missing)?;\n11 |     let n = num.parse::<u32>()?;\n   |                 --------------^ the trait `From<ParseIntError>` is not implemented for `CardError`\n   |                 |\n   |                 this can't be annotated with `?` because it has type `Result<_, ParseIntError>`\n   |\nnote: `CardError` needs to implement `From<ParseIntError>`\n  --> src/main.rs:4:1\n   |\n 4 | enum CardError {\n   | ^^^^^^^^^^^^^^\n   = note: the question mark operation (`?`) implicitly performs a conversion on the error value using the `From` trait\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_from` (bin \"spot_from\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `?` couldn't convert the error to `CardError`\n  --> src/main.rs:11:31\n   |\n 9 | fn card_number(line: &str) -> Result<u32, CardError> {\n   |                               ---------------------- expected `CardError` because of this\n10 |     let (_, num) = line.split_once('#').ok_or(CardError::Missing)?;\n11 |     let n = num.parse::<u32>()?;\n   |                 --------------^ the trait `From<ParseIntError>` is not implemented for `CardError`\n   |                 |\n   |                 this can't be annotated with `?` because it has type `Result<_, ParseIntError>`\n   |\nnote: `CardError` needs to implement `From<ParseIntError>`\n  --> src/main.rs:4:1\n   |\n 4 | enum CardError {\n   | ^^^^^^^^^^^^^^\n   = note: the question mark operation (`?`) implicitly performs a conversion on the error value using the `From` trait\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `spot_from` (bin \"spot_from\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/spot_from"
    }
   ]
  },
  "spot_unreachable.rs": {
   "src": "fn note(days: u32) -> &'static str {\n    match days {\n        0 => \"on time\",\n        1..=7 => \"a little late\",\n        5 => \"exactly five days late\",\n        _ => \"very late\",\n    }\n}\n\nfn main() {\n    for d in [0, 5, 9] {\n        println!(\"{d}: {}\", note(d));\n    }\n}\n",
   "stdout": "0: on time\n5: a little late\n9: very late\n",
   "stderr": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         1..=7 => \"a little late\",\n  |         ----- matches all the relevant values\n5 |         5 => \"exactly five days late\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "0: on time\n5: a little late\n9: very late\n",
     "err": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         1..=7 => \"a little late\",\n  |         ----- matches all the relevant values\n5 |         5 => \"exactly five days late\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch21/spot_unreachable",
     "merged": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         1..=7 => \"a little late\",\n  |         ----- matches all the relevant values\n5 |         5 => \"exactly five days late\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\n0: on time\n5: a little late\n9: very late\n"
    }
   ]
  },
  "this_error.rs": {
   "src": "use std::num::ParseIntError;\nuse thiserror::Error;\n\n#[derive(Debug, Error)]\nenum LoanError {\n    #[error(\"the form is empty\")]\n    Empty,\n    #[error(\"days must be a whole number\")]\n    NotANumber(#[from] ParseIntError),\n    #[error(\"{0} days is too long (the limit is 28)\")]\n    TooLong(u32),\n}\n\ntype Result<T> = std::result::Result<T, LoanError>;\n\nfn parse_days(text: &str) -> Result<u32> {\n    let text = text.trim();\n    if text.is_empty() {\n        return Err(LoanError::Empty);\n    }\n    let days: u32 = text.parse()?;\n    if days > 28 {\n        return Err(LoanError::TooLong(days));\n    }\n    Ok(days)\n}\n\nfn main() {\n    for form in [\"14\", \"two\", \"\", \"40\"] {\n        match parse_days(form) {\n            Ok(d) => println!(\"{form:?}: ok, {d} days\"),\n            Err(e) => println!(\"{form:?}: refused, {e}\"),\n        }\n    }\n}\n",
   "stdout": "\"14\": ok, 14 days\n\"two\": refused, days must be a whole number\n\"\": refused, the form is empty\n\"40\": refused, 40 days is too long (the limit is 28)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"14\": ok, 14 days\n\"two\": refused, days must be a whole number\n\"\": refused, the form is empty\n\"40\": refused, 40 days is too long (the limit is 28)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/this_error"
    }
   ]
  },
  "trace_chain.rs": {
   "src": "fn main() {\n    let forms = [\"14\", \"\", \"x\", \"30\", \"9\"];\n    for f in forms {\n        let result: Result<u32, &str> = if f.is_empty() {\n            Err(\"empty\")\n        } else {\n            f.parse::<u32>().map_err(|_| \"not-a-number\")\n        };\n        let verdict = result.and_then(|d| if d <= 28 { Ok(d) } else { Err(\"too-long\") });\n        println!(\"{f:?} {verdict:?}\");\n    }\n}\n",
   "stdout": "\"14\" Ok(14)\n\"\" Err(\"empty\")\n\"x\" Err(\"not-a-number\")\n\"30\" Err(\"too-long\")\n\"9\" Ok(9)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"14\" Ok(14)\n\"\" Err(\"empty\")\n\"x\" Err(\"not-a-number\")\n\"30\" Err(\"too-long\")\n\"9\" Ok(9)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/trace_chain"
    }
   ]
  },
  "trace_guard.rs": {
   "src": "fn main() {\n    let weights = [Some(4), None, Some(1), Some(3), Some(0)];\n    for w in weights {\n        let shelf = match w {\n            Some(kg) if kg >= 3 => \"bottom\",\n            Some(0) | None => \"none\",\n            Some(_) => \"top\",\n        };\n        println!(\"{w:?} {shelf}\");\n    }\n}\n",
   "stdout": "Some(4) bottom\nNone none\nSome(1) top\nSome(3) bottom\nSome(0) none\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(4) bottom\nNone none\nSome(1) top\nSome(3) bottom\nSome(0) none\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/trace_guard"
    }
   ]
  },
  "underscore.rs": {
   "src": "fn main() {\n    let note = String::from(\"overdue\");\n    let _ = note;\n    println!(\"still have: {note}\");\n    let _kept = note;\n    println!(\"moved into _kept\");\n}\n",
   "stdout": "still have: overdue\nmoved into _kept\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "still have: overdue\nmoved into _kept\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/underscore"
    }
   ]
  },
  "underscore_bad.rs": {
   "src": "fn main() {\n    let note = String::from(\"overdue\");\n    let _ = note;\n    println!(\"still have: {note}\");\n    let _kept = note;\n    println!(\"and now: {note}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: borrow of moved value: `note`\n --> src/main.rs:6:25\n  |\n2 |     let note = String::from(\"overdue\");\n  |         ---- move occurs because `note` has type `String`, which does not implement the `Copy` trait\n...\n5 |     let _kept = note;\n  |                 ---- value moved here\n6 |     println!(\"and now: {note}\");\n  |                         ^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n5 |     let _kept = note.clone();\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `underscore_bad` (bin \"underscore_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: borrow of moved value: `note`\n --> src/main.rs:6:25\n  |\n2 |     let note = String::from(\"overdue\");\n  |         ---- move occurs because `note` has type `String`, which does not implement the `Copy` trait\n...\n5 |     let _kept = note;\n  |                 ---- value moved here\n6 |     println!(\"and now: {note}\");\n  |                         ^^^^ value borrowed here after move\n  |\nhelp: consider cloning the value if the performance cost is acceptable\n  |\n5 |     let _kept = note.clone();\n  |                     ++++++++\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `underscore_bad` (bin \"underscore_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch21/underscore_bad"
    }
   ]
  },
  "unreachable.rs": {
   "src": "fn label(n: u32) -> &'static str {\n    match n {\n        0 => \"none\",\n        _ => \"some\",\n        1 => \"exactly one\",\n    }\n}\n\nfn main() {\n    println!(\"{}\", label(0));\n    println!(\"{}\", label(1));\n}\n",
   "stdout": "none\nsome\n",
   "stderr": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         _ => \"some\",\n  |         - matches any value\n5 |         1 => \"exactly one\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "none\nsome\n",
     "err": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         _ => \"some\",\n  |         - matches any value\n5 |         1 => \"exactly one\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\n",
     "exit": 0,
     "dir": "~/rust-ch21/unreachable",
     "merged": "warning: unreachable pattern\n --> src/main.rs:5:9\n  |\n4 |         _ => \"some\",\n  |         - matches any value\n5 |         1 => \"exactly one\",\n  |         ^ no value can reach this\n  |\n  = note: `#[warn(unreachable_patterns)]` (part of `#[warn(unused)]`) on by default\n\nnone\nsome\n"
    }
   ]
  },
  "unwrap_lib.rs": {
   "src": "fn parse_days(text: &str) -> u32 {\n    text.trim().parse().unwrap()\n}\n\nfn main() {\n    println!(\"{} days\", parse_days(\"14\"));\n    println!(\"{} days\", parse_days(\"two weeks\"));\n    println!(\"this line never runs\");\n}\n",
   "stdout": "14 days\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:2:25:\ncalled `Result::unwrap()` on an `Err` value: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "14 days\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:2:25:\ncalled `Result::unwrap()` on an `Err` value: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch21/unwrap_lib",
     "merged": "14 days\n\nthread 'main' (1) panicked at src/main.rs:2:25:\ncalled `Result::unwrap()` on an `Err` value: ParseIntError { kind: InvalidDigit }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "walk_q.rs": {
   "src": "use std::num::ParseIntError;\n\nfn total_days(a: &str, b: &str) -> Result<u32, ParseIntError> {\n    println!(\"reading {a:?}\");\n    let x: u32 = a.parse()?;\n    println!(\"reading {b:?}\");\n    let y: u32 = b.parse()?;\n    println!(\"both fine\");\n    Ok(x + y)\n}\n\nfn main() {\n    println!(\"{:?}\", total_days(\"7\", \"14\"));\n    println!(\"{:?}\", total_days(\"7\", \"two\"));\n}\n",
   "stdout": "reading \"7\"\nreading \"14\"\nboth fine\nOk(21)\nreading \"7\"\nreading \"two\"\nErr(ParseIntError { kind: InvalidDigit })\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "reading \"7\"\nreading \"14\"\nboth fine\nOk(21)\nreading \"7\"\nreading \"two\"\nErr(ParseIntError { kind: InvalidDigit })\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch21/walk_q"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
