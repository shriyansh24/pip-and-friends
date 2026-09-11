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
  "workdir": "/home/you/rust-ch22",
  "versionDifferences": [
   "boss_error.rs",
   "hash_ops_nondet.rs",
   "heap_float.rs",
   "write_bad.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.rs, hash_ops_nondet.rs, heap_float.rs, write_bad.rs."
 },
 "programs": {
  "binary_search.rs": {
   "src": "fn main() {\n    let mut shelf = vec![105, 230, 412, 598, 801];\n    println!(\"{:?}\", shelf.binary_search(&412));\n    println!(\"{:?}\", shelf.binary_search(&300));\n    match shelf.binary_search(&300) {\n        Ok(i) => println!(\"already at {i}\"),\n        Err(i) => {\n            shelf.insert(i, 300);\n            println!(\"inserted at {i}: {shelf:?}\");\n        }\n    }\n}\n",
   "stdout": "Ok(2)\nErr(2)\ninserted at 2: [105, 230, 300, 412, 598, 801]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ok(2)\nErr(2)\ninserted at 2: [105, 230, 300, 412, 598, 801]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/binary_search"
    }
   ]
  },
  "boss_error.rs": {
   "src": "use std::collections::BTreeSet;\n\nfn main() {\n    let mut ratings = BTreeSet::new();\n    ratings.insert(4.5);\n    println!(\"{} ratings\", ratings.len());\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.insert(4.5);\n  |             ^^^^^^ --- `{float}` doesn't satisfy the trait bound\n  |             |\n  |             the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BTreeSet::<T, A>::insert`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/collections/btree/set.rs:900:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.insert(4.5);\n  |             ^^^^^^ --- `{float}` doesn't satisfy the trait bound\n  |             |\n  |             the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BTreeSet::<T, A>::insert`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/collections/btree/set.rs:900:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/boss_error"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.insert(4.5);\n  |             ^^^^^^ the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BTreeSet::<T, A>::insert`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/alloc/src/collections/btree/set.rs:900:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.insert(4.5);\n  |             ^^^^^^ the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BTreeSet::<T, A>::insert`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/alloc/src/collections/btree/set.rs:900:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `boss_error` (bin \"boss_error\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch22/boss_error"
     }
    ]
   }
  },
  "boss_fill.rs": {
   "src": "fn main() {\n    let rows = [(\"Dune\", 1965), (\"Naïveté\", 2001), (\"It\", 1986)];\n    let w = rows.iter().map(|(t, _)| t.chars().count()).max().unwrap();\n    for (title, year) in rows {\n        print!(\"{title:<w$}|\");\n        println!(\"{year:>6}|\");\n    }\n}\n",
   "stdout": "Dune   |  1965|\nNaïveté|  2001|\nIt     |  1986|\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune   |  1965|\nNaïveté|  2001|\nIt     |  1986|\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let mut count = BTreeMap::new();\n    for w in \"b a b c b a\".split(' ') {\n        *count.entry(w).or_insert(0) += 1;\n    }\n    println!(\"{count:?}\");\n    println!(\"top: {:?}\", count.iter().max_by_key(|&(_, n)| *n).unwrap());\n}\n",
   "stdout": "{\"a\": 2, \"b\": 3, \"c\": 1}\ntop: (\"b\", 3)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "{\"a\": 2, \"b\": 3, \"c\": 1}\ntop: (\"b\", 3)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "use std::collections::{BTreeMap, VecDeque};\n\nfn main() {\n    let mut q = VecDeque::from([\"owl\", \"Bees\", \"cat\"]);\n    q.push_front(\"an\");\n    q.pop_back();\n    let mut m = BTreeMap::new();\n    while let Some(w) = q.pop_front() {\n        m.insert(w, w.len());\n    }\n    for (k, v) in &m {\n        println!(\"[{k:>4}|{v:<2}]\");\n    }\n    println!(\"{}\", m.len());\n}\n",
   "stdout": "[Bees|4 ]\n[  an|2 ]\n[ owl|3 ]\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[Bees|4 ]\n[  an|2 ]\n[ owl|3 ]\n3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "fn main() {\n    let rows = [(\"owl\", 3), (\"café\", 12), (\"book\", 7)];\n    for (word, n) in rows {\n        let gap = \" \".repeat(8 - word.len());\n        println!(\"{word}{gap}|{n:>3}\");\n    }\n}\n",
   "stdout": "owl     |  3\ncafé   | 12\nbook    |  7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "owl     |  3\ncafé   | 12\nbook    |  7\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "use std::cmp::Reverse;\nuse std::collections::BinaryHeap;\n\nfn main() {\n    let mut heap = BinaryHeap::from([Reverse(5), Reverse(2), Reverse(8)]);\n    let mut done = 0;\n    while let Some(Reverse(t)) = heap.pop() {\n        done += t;\n        if t == 2 {\n            heap.push(Reverse(4));\n        }\n        println!(\"{t} {done} {}\", heap.len());\n    }\n}\n",
   "stdout": "2 2 3\n4 6 2\n5 11 1\n8 19 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "2 2 3\n4 6 2\n5 11 1\n8 19 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/boss_trace"
    }
   ]
  },
  "bsearch_unsorted.rs": {
   "src": "fn main() {\n    let shelf = vec![598, 105, 801, 230, 412];\n    println!(\"binary_search says {:?}\", shelf.binary_search(&598));\n    println!(\"contains says {}\", shelf.contains(&598));\n}\n",
   "stdout": "binary_search says Err(2)\ncontains says true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "binary_search says Err(2)\ncontains says true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/bsearch_unsorted"
    }
   ]
  },
  "btree_catalog.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let mut shelf = BTreeMap::new();\n    shelf.insert(\"QA76\", \"Rust for Readers\");\n    shelf.insert(\"B105\", \"Thinking Clearly\");\n    shelf.insert(\"PZ7\", \"The Owl Who Coded\");\n    shelf.insert(\"F1219\", \"Old Maps\");\n    for (call, title) in &shelf {\n        println!(\"{call:6} {title}\");\n    }\n    println!(\"first: {:?}\", shelf.first_key_value());\n    println!(\"last:  {:?}\", shelf.last_key_value());\n    for (call, _) in shelf.range(\"C\"..\"Q\") {\n        println!(\"between C and Q: {call}\");\n    }\n}\n",
   "stdout": "B105   Thinking Clearly\nF1219  Old Maps\nPZ7    The Owl Who Coded\nQA76   Rust for Readers\nfirst: Some((\"B105\", \"Thinking Clearly\"))\nlast:  Some((\"QA76\", \"Rust for Readers\"))\nbetween C and Q: F1219\nbetween C and Q: PZ7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "B105   Thinking Clearly\nF1219  Old Maps\nPZ7    The Owl Who Coded\nQA76   Rust for Readers\nfirst: Some((\"B105\", \"Thinking Clearly\"))\nlast:  Some((\"QA76\", \"Rust for Readers\"))\nbetween C and Q: F1219\nbetween C and Q: PZ7\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/btree_catalog"
    }
   ]
  },
  "btreeset.rs": {
   "src": "use std::collections::BTreeSet;\n\nfn main() {\n    let mut genres = BTreeSet::new();\n    for g in [\"sci-fi\", \"poetry\", \"mystery\", \"poetry\", \"atlas\", \"sci-fi\"] {\n        let new = genres.insert(g);\n        println!(\"insert {g:8} new? {new}\");\n    }\n    println!(\"{genres:?}\");\n    println!(\"first {:?}, last {:?}\", genres.first(), genres.last());\n}\n",
   "stdout": "insert sci-fi   new? true\ninsert poetry   new? true\ninsert mystery  new? true\ninsert poetry   new? false\ninsert atlas    new? true\ninsert sci-fi   new? false\n{\"atlas\", \"mystery\", \"poetry\", \"sci-fi\"}\nfirst Some(\"atlas\"), last Some(\"sci-fi\")\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "insert sci-fi   new? true\ninsert poetry   new? true\ninsert mystery  new? true\ninsert poetry   new? false\ninsert atlas    new? true\ninsert sci-fi   new? false\n{\"atlas\", \"mystery\", \"poetry\", \"sci-fi\"}\nfirst Some(\"atlas\"), last Some(\"sci-fi\")\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/btreeset"
    }
   ]
  },
  "chunk_zero.rs": {
   "src": "fn main() {\n    let loans = [12, 15, 11];\n    let size = loans.len() / 4;\n    for c in loans.chunks(size) {\n        println!(\"{c:?}\");\n    }\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:4:20:\nchunk size must be non-zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:4:20:\nchunk size must be non-zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch22/chunk_zero"
    }
   ]
  },
  "classify.rs": {
   "src": "fn main() {\n    for c in ['R', 'é', '7', '½', '日', ' ', '-'] {\n        println!(\n            \"{c:?} alphabetic {:5} numeric {:5} ascii_digit {:5} to_digit {:?}\",\n            c.is_alphabetic(),\n            c.is_numeric(),\n            c.is_ascii_digit(),\n            c.to_digit(10)\n        );\n    }\n    println!(\"{} {} {}\", 'é'.is_lowercase(), 'ß'.to_uppercase(), 'f'.to_digit(16).unwrap());\n}\n",
   "stdout": "'R' alphabetic true  numeric false ascii_digit false to_digit None\n'é' alphabetic true  numeric false ascii_digit false to_digit None\n'7' alphabetic false numeric true  ascii_digit true  to_digit Some(7)\n'½' alphabetic false numeric true  ascii_digit false to_digit None\n'日' alphabetic true  numeric false ascii_digit false to_digit None\n' ' alphabetic false numeric false ascii_digit false to_digit None\n'-' alphabetic false numeric false ascii_digit false to_digit None\ntrue SS 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "'R' alphabetic true  numeric false ascii_digit false to_digit None\n'é' alphabetic true  numeric false ascii_digit false to_digit None\n'7' alphabetic false numeric true  ascii_digit true  to_digit Some(7)\n'½' alphabetic false numeric true  ascii_digit false to_digit None\n'日' alphabetic true  numeric false ascii_digit false to_digit None\n' ' alphabetic false numeric false ascii_digit false to_digit None\n'-' alphabetic false numeric false ascii_digit false to_digit None\ntrue SS 15\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/classify"
    }
   ]
  },
  "count_machine.rs": {
   "src": "fn main() {\n    println!(\"\\\"hello\\\".len() = {}\", \"hello\".len());\n    println!(\"\\\"hello\\\".chars().count() = {}\", \"hello\".chars().count());\n    println!(\"\\\"héllo\\\".len() = {}\", \"héllo\".len());\n    println!(\"\\\"héllo\\\".chars().count() = {}\", \"héllo\".chars().count());\n    let decomposed = \"he\\u{301}llo\";\n    println!(\"decomposed.len() = {}\", decomposed.len());\n    println!(\"decomposed.chars().count() = {}\", decomposed.chars().count());\n    println!(\"\\\"日本\\\".len() = {}\", \"日本\".len());\n    println!(\"\\\"日本\\\".chars().count() = {}\", \"日本\".chars().count());\n    let family = \"👨\\u{200d}👩\\u{200d}👧\";\n    println!(\"family.len() = {}\", family.len());\n    println!(\"family.chars().count() = {}\", family.chars().count());\n}\n",
   "stdout": "\"hello\".len() = 5\n\"hello\".chars().count() = 5\n\"héllo\".len() = 6\n\"héllo\".chars().count() = 5\ndecomposed.len() = 7\ndecomposed.chars().count() = 6\n\"日本\".len() = 6\n\"日本\".chars().count() = 2\nfamily.len() = 18\nfamily.chars().count() = 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"hello\".len() = 5\n\"hello\".chars().count() = 5\n\"héllo\".len() = 6\n\"héllo\".chars().count() = 5\ndecomposed.len() = 7\ndecomposed.chars().count() = 6\n\"日本\".len() = 6\n\"日本\".chars().count() = 2\nfamily.len() = 18\nfamily.chars().count() = 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/count_machine"
    }
   ]
  },
  "cow.rs": {
   "src": "use std::borrow::Cow;\n\nfn tidy(title: &str) -> Cow<'_, str> {\n    if title.contains('\\t') {\n        Cow::Owned(title.replace('\\t', \" \"))\n    } else {\n        Cow::Borrowed(title)\n    }\n}\n\nfn main() {\n    for t in [\"Dune\", \"The\\tOwl\"] {\n        let clean = tidy(t);\n        let kind = match &clean {\n            Cow::Borrowed(_) => \"borrowed: no copy made\",\n            Cow::Owned(_) => \"owned: a new String\",\n        };\n        println!(\"{clean:<8} {kind}\");\n    }\n}\n",
   "stdout": "Dune     borrowed: no copy made\nThe Owl  owned: a new String\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune     borrowed: no copy made\nThe Owl  owned: a new String\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/cow"
    }
   ]
  },
  "display_pad.rs": {
   "src": "use std::fmt;\n\nstruct Plain(u32);\nstruct Padded(u32);\n\nimpl fmt::Display for Plain {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, \"QA-{}\", self.0)\n    }\n}\n\nimpl fmt::Display for Padded {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        let text = format!(\"QA-{}\", self.0);\n        f.pad(&text)\n    }\n}\n\nfn main() {\n    println!(\"[{:>8}]\", Plain(76));\n    println!(\"[{:>8}]\", Padded(76));\n    println!(\"[{:<8}]\", Padded(76));\n    println!(\"[{:*^10}]\", Padded(76));\n    println!(\"[{:.2}]\", Padded(76));\n}\n",
   "stdout": "[QA-76]\n[   QA-76]\n[QA-76   ]\n[**QA-76***]\n[QA]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[QA-76]\n[   QA-76]\n[QA-76   ]\n[**QA-76***]\n[QA]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/display_pad"
    }
   ]
  },
  "entry_default.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let mut late: BTreeMap<&str, u32> = BTreeMap::new();\n    *late.entry(\"Ada\").or_default() += 3;\n    *late.entry(\"Ben\").or_default() += 1;\n    *late.entry(\"Ada\").or_default() += 2;\n    let mut tags: BTreeMap<&str, Vec<&str>> = BTreeMap::new();\n    tags.entry(\"Dune\").or_default().push(\"sci-fi\");\n    tags.entry(\"Dune\").or_default().push(\"desert\");\n    println!(\"{late:?}\");\n    println!(\"{tags:?}\");\n}\n",
   "stdout": "{\"Ada\": 5, \"Ben\": 1}\n{\"Dune\": [\"sci-fi\", \"desert\"]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "{\"Ada\": 5, \"Ben\": 1}\n{\"Dune\": [\"sci-fi\", \"desert\"]}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/entry_default"
    }
   ]
  },
  "entry_eager.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn new_list(shelf: char) -> Vec<&'static str> {\n    println!(\"  (making a new list for shelf {shelf})\");\n    Vec::new()\n}\n\nfn main() {\n    let mut by_shelf = BTreeMap::new();\n    for (title, shelf) in [(\"Dune\", 'S'), (\"Holes\", 'S'), (\"Emma\", 'C')] {\n        println!(\"returning {title}\");\n        by_shelf.entry(shelf).or_insert(new_list(shelf)).push(title);\n    }\n    println!(\"{by_shelf:?}\");\n}\n",
   "stdout": "returning Dune\n  (making a new list for shelf S)\nreturning Holes\n  (making a new list for shelf S)\nreturning Emma\n  (making a new list for shelf C)\n{'C': [\"Emma\"], 'S': [\"Dune\", \"Holes\"]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "returning Dune\n  (making a new list for shelf S)\nreturning Holes\n  (making a new list for shelf S)\nreturning Emma\n  (making a new list for shelf C)\n{'C': [\"Emma\"], 'S': [\"Dune\", \"Holes\"]}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/entry_eager"
    }
   ]
  },
  "entry_lazy.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn new_list(shelf: char) -> Vec<&'static str> {\n    println!(\"  (making a new list for shelf {shelf})\");\n    Vec::new()\n}\n\nfn main() {\n    let mut by_shelf = BTreeMap::new();\n    for (title, shelf) in [(\"Dune\", 'S'), (\"Holes\", 'S'), (\"Emma\", 'C')] {\n        println!(\"returning {title}\");\n        by_shelf.entry(shelf).or_insert_with(|| new_list(shelf)).push(title);\n    }\n    println!(\"{by_shelf:?}\");\n}\n",
   "stdout": "returning Dune\n  (making a new list for shelf S)\nreturning Holes\nreturning Emma\n  (making a new list for shelf C)\n{'C': [\"Emma\"], 'S': [\"Dune\", \"Holes\"]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "returning Dune\n  (making a new list for shelf S)\nreturning Holes\nreturning Emma\n  (making a new list for shelf C)\n{'C': [\"Emma\"], 'S': [\"Dune\", \"Holes\"]}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/entry_lazy"
    }
   ]
  },
  "entry_variants.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let returns = [(\"Dune\", 'S'), (\"Emma\", 'C'), (\"Dune\", 'S')];\n    let mut by_shelf: BTreeMap<char, Vec<&str>> = BTreeMap::new();\n    let mut times: BTreeMap<&str, u32> = BTreeMap::new();\n    for (title, shelf) in returns {\n        by_shelf.entry(shelf).or_insert_with(Vec::new).push(title);\n        times.entry(title).and_modify(|n| *n += 1).or_insert(1);\n    }\n    println!(\"{by_shelf:?}\");\n    println!(\"{times:?}\");\n}\n",
   "stdout": "{'C': [\"Emma\"], 'S': [\"Dune\", \"Dune\"]}\n{\"Dune\": 2, \"Emma\": 1}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "{'C': [\"Emma\"], 'S': [\"Dune\", \"Dune\"]}\n{\"Dune\": 2, \"Emma\": 1}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/entry_variants"
    }
   ]
  },
  "fill_entry.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let words = [\"owl\", \"cat\", \"owl\", \"bee\", \"owl\"];\n    let mut count: BTreeMap<&str, u32> = BTreeMap::new();\n    for w in words {\n        count.entry(w).and_modify(|n| *n += 1).or_insert(1);\n    }\n    let mut by_letter: BTreeMap<char, Vec<&str>> = BTreeMap::new();\n    for w in words {\n        let first = w.chars().next().unwrap();\n        by_letter.entry(first).or_default().push(w);\n    }\n    println!(\"{count:?}\");\n    println!(\"{by_letter:?}\");\n}\n",
   "stdout": "{\"bee\": 1, \"cat\": 1, \"owl\": 3}\n{'b': [\"bee\"], 'c': [\"cat\"], 'o': [\"owl\", \"owl\", \"owl\"]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "{\"bee\": 1, \"cat\": 1, \"owl\": 3}\n{'b': [\"bee\"], 'c': [\"cat\"], 'o': [\"owl\", \"owl\", \"owl\"]}\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fill_entry"
    }
   ]
  },
  "fill_format.rs": {
   "src": "fn main() {\n    let rows = [(\"Dune\", 3, 0.5), (\"Emma\", 12, 1.25)];\n    for (title, copies, fee) in rows {\n        print!(\"{:<6}|\", title);\n        print!(\"{:>4}|\", copies);\n        println!(\"{:>6.2}\", fee);\n    }\n}\n",
   "stdout": "Dune  |   3|  0.50\nEmma  |  12|  1.25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune  |   3|  0.50\nEmma  |  12|  1.25\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fill_format"
    }
   ]
  },
  "fill_sets.rs": {
   "src": "use std::collections::BTreeSet;\n\nfn main() {\n    let borrowed: BTreeSet<u32> = [101, 102, 103, 104].into();\n    let returned: BTreeSet<u32> = [102, 104].into();\n    let out: Vec<_> = borrowed.difference(&returned).collect();\n    let back: Vec<_> = borrowed.intersection(&returned).collect();\n    println!(\"still out: {out:?}\");\n    println!(\"back: {back:?}\");\n}\n",
   "stdout": "still out: [101, 103]\nback: [102, 104]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "still out: [101, 103]\nback: [102, 104]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fill_sets"
    }
   ]
  },
  "fill_split.rs": {
   "src": "fn main() {\n    let record = \"Dune;Frank Herbert;1965;sci-fi\";\n    let (title, rest) = record.split_once(';').unwrap();\n    let parts: Vec<&str> = rest.splitn(2, ';').collect();\n    let (_, genre) = record.rsplit_once(';').unwrap();\n    println!(\"{title} | {} | {genre}\", parts[0]);\n    println!(\"{}\", parts[1]);\n}\n",
   "stdout": "Dune | Frank Herbert | sci-fi\n1965;sci-fi\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune | Frank Herbert | sci-fi\n1965;sci-fi\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fill_split"
    }
   ]
  },
  "fmt_count_bad.rs": {
   "src": "fn main() {\n    let title = \"Dune\";\n    println!(\"{} has {} copies\", title);\n}\n",
   "stdout": "",
   "stderr": "error: 2 positional arguments in format string, but there is 1 argument\n --> src/main.rs:3:15\n  |\n3 |     println!(\"{} has {} copies\", title);\n  |               ^^     ^^          -----\n\nerror: could not compile `fmt_count_bad` (bin \"fmt_count_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error: 2 positional arguments in format string, but there is 1 argument\n --> src/main.rs:3:15\n  |\n3 |     println!(\"{} has {} copies\", title);\n  |               ^^     ^^          -----\n\nerror: could not compile `fmt_count_bad` (bin \"fmt_count_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/fmt_count_bad"
    }
   ]
  },
  "fmt_hex_bad.rs": {
   "src": "fn main() {\n    let code = \"255\";\n    println!(\"{:#x}\", code);\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: the trait bound `str: LowerHex` is not satisfied\n --> src/main.rs:3:23\n  |\n3 |     println!(\"{:#x}\", code);\n  |               -----   ^^^^ the trait `LowerHex` is not implemented for `str`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the following other types implement trait `LowerHex`:\n            &T\n            &mut T\n            NonZero<T>\n            Saturating<T>\n            Wrapping<T>\n            compiler_builtins::math::libm_math::support::big::i256\n            compiler_builtins::math::libm_math::support::big::u256\n            compiler_builtins::math::libm_math::support::hex_float::hex_fmt::Hex<T>\n          and 12 others\n  = note: required for `&str` to implement `LowerHex`\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `fmt_hex_bad` (bin \"fmt_hex_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: the trait bound `str: LowerHex` is not satisfied\n --> src/main.rs:3:23\n  |\n3 |     println!(\"{:#x}\", code);\n  |               -----   ^^^^ the trait `LowerHex` is not implemented for `str`\n  |               |\n  |               required by this formatting parameter\n  |\n  = help: the following other types implement trait `LowerHex`:\n            &T\n            &mut T\n            NonZero<T>\n            Saturating<T>\n            Wrapping<T>\n            compiler_builtins::math::libm_math::support::big::i256\n            compiler_builtins::math::libm_math::support::big::u256\n            compiler_builtins::math::libm_math::support::hex_float::hex_fmt::Hex<T>\n          and 12 others\n  = note: required for `&str` to implement `LowerHex`\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `fmt_hex_bad` (bin \"fmt_hex_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/fmt_hex_bad"
    }
   ]
  },
  "fmt_more.rs": {
   "src": "fn main() {\n    let shelf = vec![(\"Dune\", 3), (\"Emma\", 1)];\n    println!(\"{shelf:?}\");\n    println!(\"{shelf:#?}\");\n    println!(\"[{:>12}]\", format!(\"{:?}\", Some(7)));\n    println!(\"{:>6}|{:<6}|{:^6}|\", 'é', 'é', 'é');\n    println!(\"{0} {1} {0} {name}\", \"a\", \"b\", name = \"c\");\n    println!(\"{{literal braces}} {:5.1}%\", 99.25);\n}\n",
   "stdout": "[(\"Dune\", 3), (\"Emma\", 1)]\n[\n    (\n        \"Dune\",\n        3,\n    ),\n    (\n        \"Emma\",\n        1,\n    ),\n]\n[     Some(7)]\n     é|é     |  é   |\na b a c\n{literal braces}  99.2%\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[(\"Dune\", 3), (\"Emma\", 1)]\n[\n    (\n        \"Dune\",\n        3,\n    ),\n    (\n        \"Emma\",\n        1,\n    ),\n]\n[     Some(7)]\n     é|é     |  é   |\na b a c\n{literal braces}  99.2%\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fmt_more"
    }
   ]
  },
  "fmt_ruler.rs": {
   "src": "fn main() {\n    println!(\"|{:>8}|\", \"Pip\");\n    println!(\"|{:<8}|\", \"Pip\");\n    println!(\"|{:^8}|\", \"Pip\");\n    println!(\"|{:*^8}|\", \"Pip\");\n    println!(\"|{:8}|\", 42);\n    println!(\"|{:<8}|\", 42);\n    println!(\"|{:+}|\", 42);\n    println!(\"|{:08.2}|\", -3.14159);\n    println!(\"|{:.0}|\", 2.5);\n    println!(\"|{:#x}|\", 255);\n    println!(\"|{:#010b}|\", 5);\n    println!(\"|{:.4}|\", \"typesetter\");\n    println!(\"|{:>8.4}|\", \"typesetter\");\n    println!(\"|{:e}|\", 1234.5);\n    println!(\"|{:-^12}|\", \" end \");\n}\n",
   "stdout": "|     Pip|\n|Pip     |\n|  Pip   |\n|**Pip***|\n|      42|\n|42      |\n|+42|\n|-0003.14|\n|2|\n|0xff|\n|0b00000101|\n|type|\n|    type|\n|1.2345e3|\n|--- end ----|\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "|     Pip|\n|Pip     |\n|  Pip   |\n|**Pip***|\n|      42|\n|42      |\n|+42|\n|-0003.14|\n|2|\n|0xff|\n|0b00000101|\n|type|\n|    type|\n|1.2345e3|\n|--- end ----|\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fmt_ruler"
    }
   ]
  },
  "fromstr.rs": {
   "src": "use std::str::FromStr;\n\nstruct Loan {\n    title: String,\n    days: u32,\n}\n\nimpl FromStr for Loan {\n    type Err = String;\n    fn from_str(s: &str) -> Result<Self, Self::Err> {\n        let (title, days) = s.split_once(':').ok_or_else(|| format!(\"no colon in {s:?}\"))?;\n        let days = days.trim().parse::<u32>().map_err(|e| format!(\"bad days in {s:?}: {e}\"))?;\n        Ok(Loan { title: title.trim().to_string(), days })\n    }\n}\n\nfn main() {\n    for line in [\"Dune: 14\", \"Emma:7\", \"Holes\", \"It: soon\"] {\n        match line.parse::<Loan>() {\n            Ok(loan) => println!(\"{} for {} days\", loan.title, loan.days),\n            Err(e) => println!(\"error: {e}\"),\n        }\n    }\n}\n",
   "stdout": "Dune for 14 days\nEmma for 7 days\nerror: no colon in \"Holes\"\nerror: bad days in \"It: soon\": invalid digit found in string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune for 14 days\nEmma for 7 days\nerror: no colon in \"Holes\"\nerror: bad days in \"It: soon\": invalid digit found in string\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/fromstr"
    }
   ]
  },
  "graphemes.rs": {
   "src": "fn main() {\n    let words = [\"cafe\", \"café\", \"cafe\\u{301}\", \"🇫🇷\", \"👨\\u{200d}👩\\u{200d}👧\"];\n    for w in words {\n        println!(\"{w}: {} bytes, {} chars\", w.len(), w.chars().count());\n    }\n    let pieces: Vec<char> = \"cafe\\u{301}\".chars().collect();\n    println!(\"{pieces:?}\");\n    println!(\"same text? {}\", \"café\" == \"cafe\\u{301}\");\n}\n",
   "stdout": "cafe: 4 bytes, 4 chars\ncafé: 5 bytes, 4 chars\ncafé: 6 bytes, 5 chars\n🇫🇷: 8 bytes, 2 chars\n👨‍👩‍👧: 18 bytes, 5 chars\n['c', 'a', 'f', 'e', '\\u{301}']\nsame text? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "cafe: 4 bytes, 4 chars\ncafé: 5 bytes, 4 chars\ncafé: 6 bytes, 5 chars\n🇫🇷: 8 bytes, 2 chars\n👨‍👩‍👧: 18 bytes, 5 chars\n['c', 'a', 'f', 'e', '\\u{301}']\nsame text? false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/graphemes"
    }
   ]
  },
  "graphemes_seg.rs": {
   "src": "use unicode_segmentation::UnicodeSegmentation;\n\nfn main() {\n    for w in [\"cafe\\u{301}\", \"noe\\u{308}l\", \"🇫🇷\", \"👨‍👩‍👧\"] {\n        let back: String = w.graphemes(true).rev().collect();\n        println!(\"{w}  bytes {}, chars {}, graphemes {}\", w.len(), w.chars().count(), w.graphemes(true).count());\n        println!(\"  reversed by grapheme: {back}\");\n    }\n}\n",
   "stdout": "café  bytes 6, chars 5, graphemes 4\n  reversed by grapheme: éfac\nnoël  bytes 6, chars 5, graphemes 4\n  reversed by grapheme: lëon\n🇫🇷  bytes 8, chars 2, graphemes 1\n  reversed by grapheme: 🇫🇷\n👨‍👩‍👧  bytes 18, chars 5, graphemes 1\n  reversed by grapheme: 👨‍👩‍👧\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "café  bytes 6, chars 5, graphemes 4\n  reversed by grapheme: éfac\nnoël  bytes 6, chars 5, graphemes 4\n  reversed by grapheme: lëon\n🇫🇷  bytes 8, chars 2, graphemes 1\n  reversed by grapheme: 🇫🇷\n👨‍👩‍👧  bytes 18, chars 5, graphemes 1\n  reversed by grapheme: 👨‍👩‍👧\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/graphemes_seg"
    }
   ]
  },
  "hash_ops_nondet.rs": {
   "src": "use std::collections::HashSet;\n\nfn main() {\n    for round in 1..=3 {\n        let poetry = HashSet::from([\"Ada\", \"Ben\", \"Cleo\", \"Dev\"]);\n        let chess = HashSet::from([\"Cleo\", \"Dev\", \"Eve\"]);\n        let either: Vec<_> = poetry.union(&chess).collect();\n        println!(\"round {round}: {either:?}\");\n    }\n}\n",
   "stdout": "round 1: [\"Ben\", \"Cleo\", \"Ada\", \"Dev\", \"Eve\"]\nround 2: [\"Cleo\", \"Ben\", \"Dev\", \"Ada\", \"Eve\"]\nround 3: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "round 1: [\"Ben\", \"Cleo\", \"Ada\", \"Dev\", \"Eve\"]\nround 2: [\"Cleo\", \"Ben\", \"Dev\", \"Ada\", \"Eve\"]\nround 3: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/hash_ops_nondet"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "round 1: [\"Ben\", \"Cleo\", \"Ada\", \"Dev\", \"Eve\"]\nround 2: [\"Ada\", \"Cleo\", \"Dev\", \"Ben\", \"Eve\"]\nround 3: [\"Cleo\", \"Ben\", \"Dev\", \"Ada\", \"Eve\"]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "round 1: [\"Ben\", \"Cleo\", \"Ada\", \"Dev\", \"Eve\"]\nround 2: [\"Ada\", \"Cleo\", \"Dev\", \"Ben\", \"Eve\"]\nround 3: [\"Cleo\", \"Ben\", \"Dev\", \"Ada\", \"Eve\"]\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch22/hash_ops_nondet"
     }
    ]
   }
  },
  "hash_ops_sorted.rs": {
   "src": "use std::collections::HashSet;\n\nfn main() {\n    let poetry = HashSet::from([\"Ada\", \"Ben\", \"Cleo\", \"Dev\"]);\n    let chess = HashSet::from([\"Cleo\", \"Dev\", \"Eve\"]);\n    let mut either: Vec<&str> = poetry.union(&chess).copied().collect();\n    either.sort();\n    println!(\"either club: {either:?}\");\n    let mut both: Vec<&str> = (&poetry & &chess).into_iter().collect();\n    both.sort();\n    println!(\"both clubs:  {both:?}\");\n}\n",
   "stdout": "either club: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\nboth clubs:  [\"Cleo\", \"Dev\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "either club: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\nboth clubs:  [\"Cleo\", \"Dev\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/hash_ops_sorted"
    }
   ]
  },
  "heap_basic.rs": {
   "src": "use std::collections::BinaryHeap;\n\nfn main() {\n    let mut repairs = BinaryHeap::new();\n    repairs.push((2, \"loose page\"));\n    repairs.push((5, \"flooded atlas\"));\n    repairs.push((1, \"bent corner\"));\n    repairs.push((3, \"torn cover\"));\n    println!(\"most urgent: {:?}\", repairs.peek());\n    println!(\"{} jobs waiting\", repairs.len());\n    while let Some((urgency, job)) = repairs.pop() {\n        println!(\"fix {job} (urgency {urgency})\");\n    }\n}\n",
   "stdout": "most urgent: Some((5, \"flooded atlas\"))\n4 jobs waiting\nfix flooded atlas (urgency 5)\nfix torn cover (urgency 3)\nfix loose page (urgency 2)\nfix bent corner (urgency 1)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "most urgent: Some((5, \"flooded atlas\"))\n4 jobs waiting\nfix flooded atlas (urgency 5)\nfix torn cover (urgency 3)\nfix loose page (urgency 2)\nfix bent corner (urgency 1)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/heap_basic"
    }
   ]
  },
  "heap_float.rs": {
   "src": "use std::collections::BinaryHeap;\n\nfn main() {\n    let mut ratings = BinaryHeap::new();\n    ratings.push(4.5);\n    println!(\"{} ratings\", ratings.len());\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.push(4.5);\n  |             ^^^^ --- `{float}` doesn't satisfy the trait bound\n  |             |\n  |             the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BinaryHeap::<T, A>::push`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/collections/binary_heap/mod.rs:747:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `heap_float` (bin \"heap_float\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.push(4.5);\n  |             ^^^^ --- `{float}` doesn't satisfy the trait bound\n  |             |\n  |             the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BinaryHeap::<T, A>::push`\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/collections/binary_heap/mod.rs:747:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `heap_float` (bin \"heap_float\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/heap_float"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.push(4.5);\n  |             ^^^^ the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BinaryHeap::<T, A>::push`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/alloc/src/collections/binary_heap/mod.rs:747:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `heap_float` (bin \"heap_float\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: the trait bound `{float}: Ord` is not satisfied\n --> src/main.rs:5:13\n  |\n5 |     ratings.push(4.5);\n  |             ^^^^ the trait `Ord` is not implemented for `{float}`\n  |\n  = help: the following other types implement trait `Ord`:\n            i128\n            i16\n            i32\n            i64\n            i8\n            isize\n            u128\n            u16\n          and 4 others\nnote: required by a bound in `BinaryHeap::<T, A>::push`\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/alloc/src/collections/binary_heap/mod.rs:747:4\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `heap_float` (bin \"heap_float\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch22/heap_float"
     }
    ]
   }
  },
  "heap_min.rs": {
   "src": "use std::cmp::Reverse;\nuse std::collections::BinaryHeap;\n\nfn main() {\n    let mut due = BinaryHeap::new();\n    for day in [12, 3, 25, 8] {\n        due.push(Reverse(day));\n    }\n    println!(\"soonest: {:?}\", due.peek());\n    while let Some(Reverse(day)) = due.pop() {\n        println!(\"due on day {day}\");\n    }\n    let sorted = BinaryHeap::from(vec![4, 1, 3]).into_sorted_vec();\n    println!(\"into_sorted_vec: {sorted:?}\");\n}\n",
   "stdout": "soonest: Some(Reverse(3))\ndue on day 3\ndue on day 8\ndue on day 12\ndue on day 25\ninto_sorted_vec: [1, 3, 4]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "soonest: Some(Reverse(3))\ndue on day 3\ndue on day 8\ndue on day 12\ndue on day 25\ninto_sorted_vec: [1, 3, 4]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/heap_min"
    }
   ]
  },
  "heap_steps.rs": {
   "src": "use std::collections::BinaryHeap;\n\nfn main() {\n    let mut heap = BinaryHeap::new();\n    for n in [3, 8, 5, 9, 1, 7] {\n        heap.push(n);\n        println!(\"push {n}: {:?}\", heap.as_slice());\n    }\n    for _ in 0..3 {\n        let top = heap.pop().unwrap();\n        println!(\"pop {top}: {:?}\", heap.as_slice());\n    }\n}\n",
   "stdout": "push 3: [3]\npush 8: [8, 3]\npush 5: [8, 3, 5]\npush 9: [9, 8, 5, 3]\npush 1: [9, 8, 5, 3, 1]\npush 7: [9, 8, 7, 3, 1, 5]\npop 9: [8, 5, 7, 3, 1]\npop 8: [7, 5, 1, 3]\npop 7: [5, 3, 1]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "push 3: [3]\npush 8: [8, 3]\npush 5: [8, 3, 5]\npush 9: [9, 8, 5, 3]\npush 1: [9, 8, 5, 3, 1]\npush 7: [9, 8, 7, 3, 1, 5]\npop 9: [8, 5, 7, 3, 1]\npop 8: [7, 5, 1, 3]\npop 7: [5, 3, 1]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/heap_steps"
    }
   ]
  },
  "index_drawers.rs": {
   "src": "use std::ops::{Index, IndexMut};\n\nstruct Drawers {\n    labels: Vec<char>,\n    counts: Vec<u32>,\n}\n\nimpl Index<char> for Drawers {\n    type Output = u32;\n    fn index(&self, label: char) -> &u32 {\n        let i = self.labels.iter().position(|&l| l == label).expect(\"no such drawer\");\n        &self.counts[i]\n    }\n}\n\nimpl IndexMut<char> for Drawers {\n    fn index_mut(&mut self, label: char) -> &mut u32 {\n        let i = self.labels.iter().position(|&l| l == label).expect(\"no such drawer\");\n        &mut self.counts[i]\n    }\n}\n\nfn main() {\n    let mut d = Drawers { labels: vec!['A', 'B', 'C'], counts: vec![0, 0, 0] };\n    d['B'] += 5;\n    d['A'] = 2;\n    println!(\"A {} B {} C {}\", d['A'], d['B'], d['C']);\n    println!(\"Z {}\", d['Z']);\n}\n",
   "stdout": "A 2 B 5 C 0\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:28:23:\nno such drawer\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "A 2 B 5 C 0\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:28:23:\nno such drawer\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch22/index_drawers",
     "merged": "A 2 B 5 C 0\n\nthread 'main' (1) panicked at src/main.rs:28:23:\nno such drawer\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "owned.rs": {
   "src": "fn main() {\n    let page: &str = \"Dune\";\n    let a: String = page.to_owned();\n    let b: String = page.into();\n    let c = page.to_string();\n    let d = String::from(page);\n    println!(\"{a} {b} {c} {d} all equal? {}\", a == b && b == c && c == d);\n    let slice: &[i32] = &[1, 2];\n    let nums: Vec<i32> = slice.to_owned();\n    let n = 42.to_string();\n    println!(\"{nums:?} {n}\");\n}\n",
   "stdout": "Dune Dune Dune Dune all equal? true\n[1, 2] 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Dune Dune Dune Dune all equal? true\n[1, 2] 42\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/owned"
    }
   ]
  },
  "parse_kinds.rs": {
   "src": "fn main() {\n    println!(\"{:?}\", \"42\".parse::<u8>());\n    println!(\"{:?}\", \"300\".parse::<u8>());\n    println!(\"{:?}\", \"-3.5\".parse::<f64>());\n    println!(\"{:?}\", \"true\".parse::<bool>());\n    println!(\"{:?}\", \"x\".parse::<char>());\n    println!(\"{:?}\", \" 7\".parse::<i32>());\n}\n",
   "stdout": "Ok(42)\nErr(ParseIntError { kind: PosOverflow })\nOk(-3.5)\nOk(true)\nOk('x')\nErr(ParseIntError { kind: InvalidDigit })\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ok(42)\nErr(ParseIntError { kind: PosOverflow })\nOk(-3.5)\nOk(true)\nOk('x')\nErr(ParseIntError { kind: InvalidDigit })\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/parse_kinds"
    }
   ]
  },
  "parsons_pipeline.rs": {
   "src": "fn main() {\n    let mut ids = vec![42, 7, 42, 19, 7];\n    ids.sort();\n    println!(\"{ids:?}\");\n    ids.dedup();\n    println!(\"{ids:?}\");\n    println!(\"{:?}\", ids.binary_search(&19));\n}\n",
   "stdout": "[7, 7, 19, 42, 42]\n[7, 19, 42]\nOk(1)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[7, 7, 19, 42, 42]\n[7, 19, 42]\nOk(1)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/parsons_pipeline"
    }
   ]
  },
  "predict_btree.rs": {
   "src": "use std::collections::BTreeMap;\n\nfn main() {\n    let mut m = BTreeMap::new();\n    for word in [\"cherry\", \"Banana\", \"9\", \"apple\", \"10\", \"Zebra\"] {\n        m.insert(word, word.len());\n    }\n    for (k, v) in &m {\n        println!(\"{k} {v}\");\n    }\n}\n",
   "stdout": "10 2\n9 1\nBanana 6\nZebra 5\napple 5\ncherry 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "10 2\n9 1\nBanana 6\nZebra 5\napple 5\ncherry 6\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/predict_btree"
    }
   ]
  },
  "predict_dedup.rs": {
   "src": "fn main() {\n    let mut v = vec![1, 1, 2, 1, 3, 3, 3];\n    v.dedup();\n    println!(\"{v:?}\");\n    v.retain(|&x| x != 2);\n    println!(\"{v:?}\");\n    v.dedup();\n    println!(\"{v:?} {}\", v.len());\n}\n",
   "stdout": "[1, 2, 1, 3]\n[1, 1, 3]\n[1, 3] 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[1, 2, 1, 3]\n[1, 1, 3]\n[1, 3] 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/predict_dedup"
    }
   ]
  },
  "predict_len.rs": {
   "src": "fn main() {\n    let a = \"owl\";\n    let b = \"Zoë\";\n    let c = \"日本語\";\n    println!(\"{} {}\", a.len(), a.chars().count());\n    println!(\"{} {}\", b.len(), b.chars().count());\n    println!(\"{} {}\", c.len(), c.chars().count());\n    println!(\"{}\", b.to_uppercase());\n}\n",
   "stdout": "3 3\n4 3\n9 3\nZOË\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 3\n4 3\n9 3\nZOË\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/predict_len"
    }
   ]
  },
  "predict_reverse.rs": {
   "src": "use std::cmp::Reverse;\nuse std::collections::BinaryHeap;\n\nfn main() {\n    let mut big = BinaryHeap::from([4, 9, 2]);\n    let mut small = BinaryHeap::from([Reverse(4), Reverse(9), Reverse(2)]);\n    big.push(6);\n    small.push(Reverse(6));\n    println!(\"{:?} {:?}\", big.pop(), big.pop());\n    println!(\"{:?}\", small.pop());\n    println!(\"{}\", big.len() + small.len());\n}\n",
   "stdout": "Some(9) Some(6)\nSome(Reverse(2))\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Some(9) Some(6)\nSome(Reverse(2))\n5\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/predict_reverse"
    }
   ]
  },
  "predict_two_mut.rs": {
   "src": "fn main() {\n    let mut scores = vec![3, 5];\n    let a = &mut scores[0];\n    let b = &mut scores[1];\n    *a += *b;\n    println!(\"{scores:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0499]: cannot borrow `scores` as mutable more than once at a time\n --> src/main.rs:4:18\n  |\n3 |     let a = &mut scores[0];\n  |                  ------ first mutable borrow occurs here\n4 |     let b = &mut scores[1];\n  |                  ^^^^^^ second mutable borrow occurs here\n5 |     *a += *b;\n  |     -------- first borrow later used here\n  |\n  = help: use `.split_at_mut(position)` to obtain two mutable non-overlapping sub-slices\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `predict_two_mut` (bin \"predict_two_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0499]: cannot borrow `scores` as mutable more than once at a time\n --> src/main.rs:4:18\n  |\n3 |     let a = &mut scores[0];\n  |                  ------ first mutable borrow occurs here\n4 |     let b = &mut scores[1];\n  |                  ^^^^^^ second mutable borrow occurs here\n5 |     *a += *b;\n  |     -------- first borrow later used here\n  |\n  = help: use `.split_at_mut(position)` to obtain two mutable non-overlapping sub-slices\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `predict_two_mut` (bin \"predict_two_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/predict_two_mut"
    }
   ]
  },
  "queue_vec.rs": {
   "src": "fn main() {\n    let mut line = vec![\"Ada\", \"Ben\", \"Cleo\", \"Dev\"];\n    while !line.is_empty() {\n        let next = line.remove(0);\n        println!(\"serving {next}, still waiting: {line:?}\");\n    }\n}\n",
   "stdout": "serving Ada, still waiting: [\"Ben\", \"Cleo\", \"Dev\"]\nserving Ben, still waiting: [\"Cleo\", \"Dev\"]\nserving Cleo, still waiting: [\"Dev\"]\nserving Dev, still waiting: []\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "serving Ada, still waiting: [\"Ben\", \"Cleo\", \"Dev\"]\nserving Ben, still waiting: [\"Cleo\", \"Dev\"]\nserving Cleo, still waiting: [\"Dev\"]\nserving Dev, still waiting: []\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/queue_vec"
    }
   ]
  },
  "retain_dedup.rs": {
   "src": "fn main() {\n    let mut loans = vec![3, 0, 7, 0, 0, 2];\n    loans.retain(|&n| n > 0);\n    println!(\"retain n > 0: {loans:?}\");\n\n    let mut visits = vec![\"Ada\", \"Ada\", \"Ben\", \"Ada\", \"Cleo\", \"Cleo\"];\n    visits.dedup();\n    println!(\"dedup:        {visits:?}\");\n    visits.sort();\n    visits.dedup();\n    println!(\"sort + dedup: {visits:?}\");\n}\n",
   "stdout": "retain n > 0: [3, 7, 2]\ndedup:        [\"Ada\", \"Ben\", \"Ada\", \"Cleo\"]\nsort + dedup: [\"Ada\", \"Ben\", \"Cleo\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "retain n > 0: [3, 7, 2]\ndedup:        [\"Ada\", \"Ben\", \"Ada\", \"Cleo\"]\nsort + dedup: [\"Ada\", \"Ben\", \"Cleo\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/retain_dedup"
    }
   ]
  },
  "reverse_bytes.rs": {
   "src": "fn main() {\n    let word = \"héllo\";\n    let mut bytes = word.as_bytes().to_vec();\n    bytes.reverse();\n    let backwards = String::from_utf8(bytes).unwrap();\n    println!(\"{backwards}\");\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:5:46:\ncalled `Result::unwrap()` on an `Err` value: FromUtf8Error { bytes: [111, 108, 108, 169, 195, 104], error: Utf8Error { valid_up_to: 3, error_len: Some(1) } }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:5:46:\ncalled `Result::unwrap()` on an `Err` value: FromUtf8Error { bytes: [111, 108, 108, 169, 195, 104], error: Utf8Error { valid_up_to: 3, error_len: Some(1) } }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch22/reverse_bytes"
    }
   ]
  },
  "reverse_chars.rs": {
   "src": "fn main() {\n    for w in [\"héllo\", \"日本\", \"noe\\u{308}l\"] {\n        let backwards: String = w.chars().rev().collect();\n        println!(\"{w} -> {backwards}\");\n    }\n}\n",
   "stdout": "héllo -> olléh\n日本 -> 本日\nnoël -> l̈eon\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "héllo -> olléh\n日本 -> 本日\nnoël -> l̈eon\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/reverse_chars"
    }
   ]
  },
  "set_ops.rs": {
   "src": "use std::collections::BTreeSet;\n\nfn main() {\n    let poetry: BTreeSet<&str> = [\"Ada\", \"Ben\", \"Cleo\", \"Dev\"].into();\n    let chess: BTreeSet<&str> = [\"Cleo\", \"Dev\", \"Eve\"].into();\n    let both: Vec<_> = poetry.intersection(&chess).collect();\n    let either: Vec<_> = poetry.union(&chess).collect();\n    let only_poetry: Vec<_> = poetry.difference(&chess).collect();\n    let just_one: Vec<_> = poetry.symmetric_difference(&chess).collect();\n    println!(\"both clubs:  {both:?}\");\n    println!(\"either club: {either:?}\");\n    println!(\"poetry only: {only_poetry:?}\");\n    println!(\"exactly one: {just_one:?}\");\n    println!(\"is Eve in poetry? {}\", poetry.contains(\"Eve\"));\n    println!(\"chess inside poetry? {}\", chess.is_subset(&poetry));\n}\n",
   "stdout": "both clubs:  [\"Cleo\", \"Dev\"]\neither club: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\npoetry only: [\"Ada\", \"Ben\"]\nexactly one: [\"Ada\", \"Ben\", \"Eve\"]\nis Eve in poetry? false\nchess inside poetry? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "both clubs:  [\"Cleo\", \"Dev\"]\neither club: [\"Ada\", \"Ben\", \"Cleo\", \"Dev\", \"Eve\"]\npoetry only: [\"Ada\", \"Ben\"]\nexactly one: [\"Ada\", \"Ben\", \"Eve\"]\nis Eve in poetry? false\nchess inside poetry? false\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/set_ops"
    }
   ]
  },
  "sizes.rs": {
   "src": "use std::collections::{BTreeMap, BinaryHeap, HashMap, VecDeque};\nuse std::mem::size_of;\n\nfn main() {\n    println!(\"Vec<u32>          {:>2} bytes\", size_of::<Vec<u32>>());\n    println!(\"VecDeque<u32>     {:>2} bytes\", size_of::<VecDeque<u32>>());\n    println!(\"BinaryHeap<u32>   {:>2} bytes\", size_of::<BinaryHeap<u32>>());\n    println!(\"BTreeMap<u32,u32> {:>2} bytes\", size_of::<BTreeMap<u32, u32>>());\n    println!(\"HashMap<u32,u32>  {:>2} bytes\", size_of::<HashMap<u32, u32>>());\n    println!(\"String            {:>2} bytes\", size_of::<String>());\n    println!(\"&str              {:>2} bytes\", size_of::<&str>());\n    println!(\"char              {:>2} bytes\", size_of::<char>());\n}\n",
   "stdout": "Vec<u32>          24 bytes\nVecDeque<u32>     32 bytes\nBinaryHeap<u32>   24 bytes\nBTreeMap<u32,u32> 24 bytes\nHashMap<u32,u32>  48 bytes\nString            24 bytes\n&str              16 bytes\nchar               4 bytes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Vec<u32>          24 bytes\nVecDeque<u32>     32 bytes\nBinaryHeap<u32>   24 bytes\nBTreeMap<u32,u32> 24 bytes\nHashMap<u32,u32>  48 bytes\nString            24 bytes\n&str              16 bytes\nchar               4 bytes\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/sizes"
    }
   ]
  },
  "sort_kinds.rs": {
   "src": "fn main() {\n    let mut years = vec![1999, 2021, 1851, 2021, 1965];\n    years.sort_unstable();\n    println!(\"sort_unstable: {years:?}\");\n    years.sort_by(|a, b| b.cmp(a));\n    println!(\"biggest first: {years:?}\");\n\n    let mut books = vec![(\"Dune\", 1965), (\"Emma\", 1815), (\"Holes\", 1998), (\"It\", 1986)];\n    books.sort_by_key(|&(title, _)| title.len());\n    println!(\"by title length: {books:?}\");\n    books.sort_by(|a, b| a.1.cmp(&b.1));\n    println!(\"by year: {books:?}\");\n}\n",
   "stdout": "sort_unstable: [1851, 1965, 1999, 2021, 2021]\nbiggest first: [2021, 2021, 1999, 1965, 1851]\nby title length: [(\"It\", 1986), (\"Dune\", 1965), (\"Emma\", 1815), (\"Holes\", 1998)]\nby year: [(\"Emma\", 1815), (\"Dune\", 1965), (\"It\", 1986), (\"Holes\", 1998)]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "sort_unstable: [1851, 1965, 1999, 2021, 2021]\nbiggest first: [2021, 2021, 1999, 1965, 1851]\nby title length: [(\"It\", 1986), (\"Dune\", 1965), (\"Emma\", 1815), (\"Holes\", 1998)]\nby year: [(\"Emma\", 1815), (\"Dune\", 1965), (\"It\", 1986), (\"Holes\", 1998)]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/sort_kinds"
    }
   ]
  },
  "split_at_mut.rs": {
   "src": "fn main() {\n    let mut shelf = vec![1, 2, 3, 4, 5, 6];\n    let (left, right) = shelf.split_at_mut(3);\n    left[0] = 10;\n    right[0] = 40;\n    println!(\"left {left:?}, right {right:?}\");\n    left.swap_with_slice(right);\n    println!(\"{shelf:?}\");\n}\n",
   "stdout": "left [10, 2, 3], right [40, 5, 6]\n[40, 5, 6, 10, 2, 3]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "left [10, 2, 3], right [40, 5, 6]\n[40, 5, 6, 10, 2, 3]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/split_at_mut"
    }
   ]
  },
  "split_variants.rs": {
   "src": "fn main() {\n    let path = \"shelf/C/poetry/odes.txt\";\n    let v: Vec<&str> = path.split('/').collect();\n    println!(\"split:      {v:?}\");\n    let v: Vec<&str> = path.splitn(2, '/').collect();\n    println!(\"splitn(2):  {v:?}\");\n    let v: Vec<&str> = path.rsplit('/').collect();\n    println!(\"rsplit:     {v:?}\");\n    let v: Vec<&str> = path.rsplitn(2, '/').collect();\n    println!(\"rsplitn(2): {v:?}\");\n    println!(\"split_once:  {:?}\", path.split_once('/'));\n    println!(\"rsplit_once: {:?}\", path.rsplit_once('.'));\n\n    let list = \"Dune;Emma;Holes;\";\n    let v: Vec<&str> = list.split(';').collect();\n    println!(\"split:            {v:?}\");\n    let v: Vec<&str> = list.split_terminator(';').collect();\n    println!(\"split_terminator: {v:?}\");\n    let spaced = \"  owl   cat \";\n    let v: Vec<&str> = spaced.split(' ').collect();\n    println!(\"split(' '):       {v:?}\");\n    let v: Vec<&str> = spaced.split_whitespace().collect();\n    println!(\"split_whitespace: {v:?}\");\n}\n",
   "stdout": "split:      [\"shelf\", \"C\", \"poetry\", \"odes.txt\"]\nsplitn(2):  [\"shelf\", \"C/poetry/odes.txt\"]\nrsplit:     [\"odes.txt\", \"poetry\", \"C\", \"shelf\"]\nrsplitn(2): [\"odes.txt\", \"shelf/C/poetry\"]\nsplit_once:  Some((\"shelf\", \"C/poetry/odes.txt\"))\nrsplit_once: Some((\"shelf/C/poetry/odes\", \"txt\"))\nsplit:            [\"Dune\", \"Emma\", \"Holes\", \"\"]\nsplit_terminator: [\"Dune\", \"Emma\", \"Holes\"]\nsplit(' '):       [\"\", \"\", \"owl\", \"\", \"\", \"cat\", \"\"]\nsplit_whitespace: [\"owl\", \"cat\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "split:      [\"shelf\", \"C\", \"poetry\", \"odes.txt\"]\nsplitn(2):  [\"shelf\", \"C/poetry/odes.txt\"]\nrsplit:     [\"odes.txt\", \"poetry\", \"C\", \"shelf\"]\nrsplitn(2): [\"odes.txt\", \"shelf/C/poetry\"]\nsplit_once:  Some((\"shelf\", \"C/poetry/odes.txt\"))\nrsplit_once: Some((\"shelf/C/poetry/odes\", \"txt\"))\nsplit:            [\"Dune\", \"Emma\", \"Holes\", \"\"]\nsplit_terminator: [\"Dune\", \"Emma\", \"Holes\"]\nsplit(' '):       [\"\", \"\", \"owl\", \"\", \"\", \"cat\", \"\"]\nsplit_whitespace: [\"owl\", \"cat\"]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/split_variants"
    }
   ]
  },
  "spot_bsearch.rs": {
   "src": "fn main() {\n    let shelf = vec![598, 105, 801, 230, 412];\n    let mut sorted = shelf.clone();\n    sorted.sort();\n    println!(\"sorted: {sorted:?}\");\n    match shelf.binary_search(&598) {\n        Ok(i) => println!(\"598 is at {i}\"),\n        Err(_) => println!(\"598 is missing!\"),\n    }\n}\n",
   "stdout": "sorted: [105, 230, 412, 598, 801]\n598 is missing!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "sorted: [105, 230, 412, 598, 801]\n598 is missing!\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/spot_bsearch"
    }
   ]
  },
  "spot_display.rs": {
   "src": "use std::fmt;\n\nstruct Fee(u32);\n\nimpl fmt::Display for Fee {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, \"£{}.{:02}\", self.0 / 100, self.0 % 100)\n    }\n}\n\nfn main() {\n    for (who, pennies) in [(\"Ada\", 250), (\"Ben\", 1205)] {\n        println!(\"{who:<5}{:>8}|\", Fee(pennies));\n    }\n}\n",
   "stdout": "Ada  £2.50|\nBen  £12.05|\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Ada  £2.50|\nBen  £12.05|\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/spot_display"
    }
   ]
  },
  "top_k.rs": {
   "src": "use std::cmp::Reverse;\nuse std::collections::BinaryHeap;\n\nfn main() {\n    let loans = [(\"Dune\", 41), (\"Emma\", 12), (\"Holes\", 57), (\"It\", 33), (\"Matilda\", 64), (\"Odes\", 5)];\n    let mut top: BinaryHeap<Reverse<(u32, &str)>> = BinaryHeap::new();\n    for (title, n) in loans {\n        top.push(Reverse((n, title)));\n        if top.len() > 3 {\n            top.pop();\n        }\n    }\n    let mut best: Vec<(u32, &str)> = top.into_iter().map(|Reverse(pair)| pair).collect();\n    best.sort_by(|a, b| b.cmp(a));\n    for (n, title) in best {\n        println!(\"{title:<8}{n:>4} loans\");\n    }\n}\n",
   "stdout": "Matilda   64 loans\nHoles     57 loans\nDune      41 loans\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Matilda   64 loans\nHoles     57 loans\nDune      41 loans\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/top_k"
    }
   ]
  },
  "trace_digits.rs": {
   "src": "fn main() {\n    let code = \"B7-0x49\";\n    let mut total = 0;\n    for c in code.chars() {\n        if let Some(d) = c.to_digit(10) {\n            total += d;\n        }\n        println!(\"{c} {} {total}\", c.is_alphanumeric());\n    }\n}\n",
   "stdout": "B true 0\n7 true 7\n- false 7\n0 true 7\nx true 7\n4 true 11\n9 true 20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "B true 0\n7 true 7\n- false 7\n0 true 7\nx true 7\n4 true 11\n9 true 20\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/trace_digits"
    }
   ]
  },
  "trace_queue.rs": {
   "src": "use std::collections::VecDeque;\n\nfn main() {\n    let mut q = VecDeque::from([4, 7]);\n    for step in [\"push_back 9\", \"pop_front\", \"push_front 1\", \"pop_back\", \"push_back 3\"] {\n        match step.split_once(' ') {\n            Some((\"push_back\", n)) => q.push_back(n.parse().unwrap()),\n            Some((_, n)) => q.push_front(n.parse().unwrap()),\n            None if step == \"pop_front\" => {\n                q.pop_front();\n            }\n            None => {\n                q.pop_back();\n            }\n        }\n        let name = step.split(' ').next().unwrap();\n        println!(\"{} {} {} {}\", name, q[0], q[q.len() - 1], q.len());\n    }\n}\n",
   "stdout": "push_back 4 9 3\npop_front 7 9 2\npush_front 1 9 3\npop_back 1 7 2\npush_back 1 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "push_back 4 9 3\npop_front 7 9 2\npush_front 1 9 3\npop_back 1 7 2\npush_back 1 3 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/trace_queue"
    }
   ]
  },
  "trace_windows.rs": {
   "src": "fn main() {\n    let counts = [5, 8, 6, 6, 10];\n    for w in counts.windows(2) {\n        let change = w[1] - w[0];\n        println!(\"{} {} {}\", w[0], w[1], change);\n    }\n}\n",
   "stdout": "5 8 3\n8 6 -2\n6 6 0\n6 10 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "5 8 3\n8 6 -2\n6 6 0\n6 10 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/trace_windows"
    }
   ]
  },
  "two_mut_bad.rs": {
   "src": "fn main() {\n    let mut shelf = vec![1, 2, 3, 4, 5, 6];\n    let left = &mut shelf[..3];\n    let right = &mut shelf[3..];\n    left[0] = 10;\n    right[0] = 40;\n    println!(\"{shelf:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0499]: cannot borrow `shelf` as mutable more than once at a time\n --> src/main.rs:4:22\n  |\n3 |     let left = &mut shelf[..3];\n  |                     ----- first mutable borrow occurs here\n4 |     let right = &mut shelf[3..];\n  |                      ^^^^^ second mutable borrow occurs here\n5 |     left[0] = 10;\n  |     ------- first borrow later used here\n  |\n  = help: use `.split_at_mut(position)` to obtain two mutable non-overlapping sub-slices\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `two_mut_bad` (bin \"two_mut_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0499]: cannot borrow `shelf` as mutable more than once at a time\n --> src/main.rs:4:22\n  |\n3 |     let left = &mut shelf[..3];\n  |                     ----- first mutable borrow occurs here\n4 |     let right = &mut shelf[3..];\n  |                      ^^^^^ second mutable borrow occurs here\n5 |     left[0] = 10;\n  |     ------- first borrow later used here\n  |\n  = help: use `.split_at_mut(position)` to obtain two mutable non-overlapping sub-slices\n\nFor more information about this error, try `rustc --explain E0499`.\nerror: could not compile `two_mut_bad` (bin \"two_mut_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/two_mut_bad"
    }
   ]
  },
  "utf8_bytes.rs": {
   "src": "fn main() {\n    for c in ['h', 'é', '日', '🦉'] {\n        let mut buf = [0u8; 4];\n        let bytes = c.encode_utf8(&mut buf).as_bytes();\n        let bits: Vec<String> = bytes.iter().map(|b| format!(\"{b:08b}\")).collect();\n        println!(\"{c} U+{:04X} {} byte(s): {}\", c as u32, bytes.len(), bits.join(\" \"));\n    }\n}\n",
   "stdout": "h U+0068 1 byte(s): 01101000\né U+00E9 2 byte(s): 11000011 10101001\n日 U+65E5 3 byte(s): 11100110 10010111 10100101\n🦉 U+1F989 4 byte(s): 11110000 10011111 10100110 10001001\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "h U+0068 1 byte(s): 01101000\né U+00E9 2 byte(s): 11000011 10101001\n日 U+65E5 3 byte(s): 11100110 10010111 10100101\n🦉 U+1F989 4 byte(s): 11110000 10011111 10100110 10001001\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/utf8_bytes"
    }
   ]
  },
  "vec_ring.rs": {
   "src": "use std::collections::VecDeque;\n\nfn main() {\n    let mut q: VecDeque<char> = VecDeque::with_capacity(4);\n    println!(\"capacity {}\", q.capacity());\n    q.push_back('A');\n    q.push_back('B');\n    q.push_back('C');\n    println!(\"{:?}\", q.as_slices());\n    q.pop_front();\n    println!(\"{:?}\", q.as_slices());\n    q.push_back('D');\n    q.push_back('E');\n    println!(\"{:?}\", q.as_slices());\n    println!(\"{q:?}, capacity {}\", q.capacity());\n}\n",
   "stdout": "capacity 4\n(['A', 'B', 'C'], [])\n(['B', 'C'], [])\n(['B', 'C', 'D'], ['E'])\n['B', 'C', 'D', 'E'], capacity 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "capacity 4\n(['A', 'B', 'C'], [])\n(['B', 'C'], [])\n(['B', 'C', 'D'], ['E'])\n['B', 'C', 'D', 'E'], capacity 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/vec_ring"
    }
   ]
  },
  "vecdeque_queue.rs": {
   "src": "use std::collections::VecDeque;\n\nfn main() {\n    let mut line: VecDeque<&str> = VecDeque::new();\n    line.push_back(\"Ada\");\n    line.push_back(\"Ben\");\n    line.push_back(\"Cleo\");\n    println!(\"line: {line:?}\");\n    line.push_front(\"Zoe\");\n    println!(\"Zoe was here first: {line:?}\");\n    println!(\"front: {:?}, back: {:?}\", line.front(), line.back());\n    while let Some(next) = line.pop_front() {\n        println!(\"serving {next}, {} left\", line.len());\n    }\n    println!(\"empty? {}\", line.is_empty());\n}\n",
   "stdout": "line: [\"Ada\", \"Ben\", \"Cleo\"]\nZoe was here first: [\"Zoe\", \"Ada\", \"Ben\", \"Cleo\"]\nfront: Some(\"Zoe\"), back: Some(\"Cleo\")\nserving Zoe, 3 left\nserving Ada, 2 left\nserving Ben, 1 left\nserving Cleo, 0 left\nempty? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "line: [\"Ada\", \"Ben\", \"Cleo\"]\nZoe was here first: [\"Zoe\", \"Ada\", \"Ben\", \"Cleo\"]\nfront: Some(\"Zoe\"), back: Some(\"Cleo\")\nserving Zoe, 3 left\nserving Ada, 2 left\nserving Ben, 1 left\nserving Cleo, 0 left\nempty? true\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/vecdeque_queue"
    }
   ]
  },
  "vecdeque_sort.rs": {
   "src": "use std::collections::VecDeque;\n\nfn main() {\n    let mut returns = VecDeque::from([42, 7, 19]);\n    returns.sort();\n    println!(\"{returns:?}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no method named `sort` found for struct `VecDeque<T, A>` in the current scope\n --> src/main.rs:5:13\n  |\n5 |     returns.sort();\n  |             ^^^^ method not found in `VecDeque<{integer}>`\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vecdeque_sort` (bin \"vecdeque_sort\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no method named `sort` found for struct `VecDeque<T, A>` in the current scope\n --> src/main.rs:5:13\n  |\n5 |     returns.sort();\n  |             ^^^^ method not found in `VecDeque<{integer}>`\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `vecdeque_sort` (bin \"vecdeque_sort\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/vecdeque_sort"
    }
   ]
  },
  "vecdeque_sorted.rs": {
   "src": "use std::collections::VecDeque;\n\nfn main() {\n    let mut returns = VecDeque::from([42, 7, 19]);\n    returns.push_front(88);\n    returns.make_contiguous().sort();\n    println!(\"{returns:?}\");\n    println!(\"biggest: {:?}\", returns.back());\n}\n",
   "stdout": "[7, 19, 42, 88]\nbiggest: Some(88)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "[7, 19, 42, 88]\nbiggest: Some(88)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/vecdeque_sorted"
    }
   ]
  },
  "widths.rs": {
   "src": "fn main() {\n    let titles = [\"Dune\", \"The Owl Who Coded\", \"Emma\"];\n    let w = titles.iter().map(|t| t.chars().count()).max().unwrap();\n    for (i, t) in titles.iter().enumerate() {\n        println!(\"{:>2}. {t:<w$} |\", i + 1);\n    }\n    let width = 10;\n    let prec = 3;\n    let pi = 3.14159265;\n    println!(\"[{pi:>width$.prec$}]\");\n    println!(\"[{:>1$}]\", \"owl\", 6);\n    println!(\"[{:.*}]\", 1, pi);\n}\n",
   "stdout": " 1. Dune              |\n 2. The Owl Who Coded |\n 3. Emma              |\n[     3.142]\n[   owl]\n[3.1]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": " 1. Dune              |\n 2. The Owl Who Coded |\n 3. Emma              |\n[     3.142]\n[   owl]\n[3.1]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/widths"
    }
   ]
  },
  "windows_chunks.rs": {
   "src": "fn main() {\n    let loans = [12, 15, 11, 18, 20, 9, 14];\n    for w in loans.windows(3) {\n        let sum: i32 = w.iter().sum();\n        println!(\"window {w:?} average {}\", sum / 3);\n    }\n    for (n, c) in loans.chunks(3).enumerate() {\n        println!(\"box {n}: {c:?}\");\n    }\n}\n",
   "stdout": "window [12, 15, 11] average 12\nwindow [15, 11, 18] average 14\nwindow [11, 18, 20] average 16\nwindow [18, 20, 9] average 15\nwindow [20, 9, 14] average 14\nbox 0: [12, 15, 11]\nbox 1: [18, 20, 9]\nbox 2: [14]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "window [12, 15, 11] average 12\nwindow [15, 11, 18] average 14\nwindow [11, 18, 20] average 16\nwindow [18, 20, 9] average 15\nwindow [20, 9, 14] average 14\nbox 0: [12, 15, 11]\nbox 1: [18, 20, 9]\nbox 2: [14]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/windows_chunks"
    }
   ]
  },
  "with_cap.rs": {
   "src": "fn main() {\n    let mut seats: Vec<u32> = Vec::with_capacity(3);\n    println!(\"len {} cap {}\", seats.len(), seats.capacity());\n    for n in [7, 8, 9, 10] {\n        seats.push(n);\n        println!(\"push {n}: len {} cap {}\", seats.len(), seats.capacity());\n    }\n    let mut title = String::with_capacity(24);\n    title.push_str(\"Drawers\");\n    title.push_str(\" and Typesetters\");\n    println!(\"{title}: len {} cap {}\", title.len(), title.capacity());\n}\n",
   "stdout": "len 0 cap 3\npush 7: len 1 cap 3\npush 8: len 2 cap 3\npush 9: len 3 cap 3\npush 10: len 4 cap 6\nDrawers and Typesetters: len 23 cap 24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "len 0 cap 3\npush 7: len 1 cap 3\npush 8: len 2 cap 3\npush 9: len 3 cap 3\npush 10: len 4 cap 6\nDrawers and Typesetters: len 23 cap 24\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/with_cap"
    }
   ]
  },
  "with_cap_bad.rs": {
   "src": "fn main() {\n    let mut seats: Vec<u32> = Vec::with_capacity(3);\n    seats[0] = 7;\n    println!(\"{seats:?}\");\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:3:10:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:3:10:\nindex out of bounds: the len is 0 but the index is 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch22/with_cap_bad"
    }
   ]
  },
  "word_report.rs": {
   "src": "use std::collections::HashMap;\nuse std::fmt::Write;\n\nfn main() {\n    let text = \"The owl read the book. The café owl? Café, café! Such naïveté, owl.\";\n    let mut counts: HashMap<String, usize> = HashMap::new();\n    for word in text.split(|c: char| !c.is_alphabetic()) {\n        if word.is_empty() {\n            continue;\n        }\n        *counts.entry(word.to_lowercase()).or_insert(0) += 1;\n    }\n    let mut rows: Vec<(String, usize)> = counts.into_iter().collect();\n    rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));\n    let w = rows.iter().map(|(word, _)| word.chars().count()).max().unwrap_or(0).max(4);\n    let total: usize = rows.iter().map(|(_, n)| n).sum();\n    let mut report = String::new();\n    writeln!(report, \"{:<w$} {:>5}  BAR\", \"WORD\", \"COUNT\").unwrap();\n    writeln!(report, \"{}\", \"-\".repeat(w + 12)).unwrap();\n    for (word, n) in &rows {\n        writeln!(report, \"{word:<w$} {n:>5}  {}\", \"#\".repeat(*n)).unwrap();\n    }\n    write!(report, \"{:<w$} {total:>5}\", \"total\").unwrap();\n    println!(\"{report}\");\n}\n",
   "stdout": "WORD    COUNT  BAR\n-------------------\ncafé        3  ###\nowl         3  ###\nthe         3  ###\nbook        1  #\nnaïveté     1  #\nread        1  #\nsuch        1  #\ntotal      13\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "WORD    COUNT  BAR\n-------------------\ncafé        3  ###\nowl         3  ###\nthe         3  ###\nbook        1  #\nnaïveté     1  #\nread        1  #\nsuch        1  #\ntotal      13\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/word_report"
    }
   ]
  },
  "write_bad.rs": {
   "src": "fn main() {\n    let mut report = String::new();\n    write!(report, \"{} books\", 3).unwrap();\n    println!(\"{report}\");\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: cannot write into `String`\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  |\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/fmt/mod.rs:214:7\n  |\n  = note: the method is available for `String` here\nnote: must implement `io::Write`, `fmt::Write`, or have a `write_fmt` method\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_fmt` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::fmt::Write;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `write_bad` (bin \"write_bad\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: cannot write into `String`\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  |\n --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/fmt/mod.rs:214:7\n  |\n  = note: the method is available for `String` here\nnote: must implement `io::Write`, `fmt::Write`, or have a `write_fmt` method\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_fmt` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::fmt::Write;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `write_bad` (bin \"write_bad\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch22/write_bad"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0599]: cannot write into `String`\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  |\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/fmt/mod.rs:212:7\n  |\n  = note: the method is available for `String` here\nnote: must implement `io::Write`, `fmt::Write`, or have a `write_fmt` method\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_fmt` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::fmt::Write;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `write_bad` (bin \"write_bad\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0599]: cannot write into `String`\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  |\n --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/core/src/fmt/mod.rs:212:7\n  |\n  = note: the method is available for `String` here\nnote: must implement `io::Write`, `fmt::Write`, or have a `write_fmt` method\n --> src/main.rs:3:12\n  |\n3 |     write!(report, \"{} books\", 3).unwrap();\n  |            ^^^^^^\n  = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_fmt` is implemented but not in scope; perhaps you want to import it\n  |\n1 + use std::fmt::Write;\n  |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `write_bad` (bin \"write_bad\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch22/write_bad"
     }
    ]
   }
  },
  "write_string.rs": {
   "src": "use std::fmt::Write;\n\nfn main() {\n    let shelves = [(\"A\", 120), (\"B\", 7), (\"C\", 64)];\n    let mut report = String::with_capacity(64);\n    writeln!(report, \"{:<6}{:>6}\", \"SHELF\", \"BOOKS\").unwrap();\n    for (name, count) in shelves {\n        writeln!(report, \"{:<6}{:>6}\", name, count).unwrap();\n    }\n    write!(report, \"{} shelves\", shelves.len()).unwrap();\n    println!(\"{report}\");\n    println!(\"({} bytes, capacity {})\", report.len(), report.capacity());\n}\n",
   "stdout": "SHELF  BOOKS\nA        120\nB          7\nC         64\n3 shelves\n(61 bytes, capacity 64)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "SHELF  BOOKS\nA        120\nB          7\nC         64\n3 shelves\n(61 bytes, capacity 64)\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch22/write_string"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
