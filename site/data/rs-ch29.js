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
  "workdir": "/home/you/rust-ch29",
  "versionDifferences": [
   "e0507.rs",
   "e_arc_only.rs",
   "e_write_scope.rs",
   "pool_logs.rs"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): e0507.rs, e_arc_only.rs, e_write_scope.rs, pool_logs.rs."
 },
 "programs": {
  "boss_fill.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| println!(\"dessert is ready\"));\n    thread::sleep(Duration::from_millis(100));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "dessert is ready\nShutting down worker 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "dessert is ready\nShutting down worker 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/boss_fill"
    }
   ]
  },
  "boss_parsons.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    let (status_line, contents) = if request_line == \"GET / HTTP/1.1\" {\n        (\"HTTP/1.1 200 OK\", \"<h1>Hi!</h1>\")\n    } else {\n        (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Oops</h1>\")\n    };\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| [\"/\", \"/menu\"].map(test_diner));\n    for stream in listener.incoming().take(2) {\n        handle_connection(stream.unwrap());\n    }\n    for reply in diner.join().unwrap() {\n        println!(\"{}\", reply.lines().next().unwrap());\n    }\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "HTTP/1.1 200 OK\nHTTP/1.1 404 NOT FOUND\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "HTTP/1.1 200 OK\nHTTP/1.1 404 NOT FOUND\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/boss_parsons"
    }
   ]
  },
  "boss_predict.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let pool = ThreadPool::new(2);\n    let mut diners = Vec::new();\n    for path in [\"/sleep\", \"/\", \"/pizza\"] {\n        diners.push(thread::spawn(move || test_diner(path)));\n    }\n\n    for stream in listener.incoming().take(3) {\n        let stream = stream.unwrap();\n        pool.execute(|| handle_connection(stream));\n    }\n\n    for diner in diners {\n        println!(\"{}\", diner.join().unwrap());\n    }\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\n// It returns the status and the wait, in whole seconds.\nfn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "200 OK after about 1 s\n200 OK after about 0 s\n404 NOT FOUND after about 0 s\nShutting down worker 0\nShutting down worker 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "200 OK after about 1 s\n200 OK after about 0 s\n404 NOT FOUND after about 0 s\nShutting down worker 0\nShutting down worker 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/boss_predict"
    }
   ]
  },
  "boss_spot.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::{thread, time::Duration};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| test_diner(\"/\"));\n\n    let stream = listener.incoming().next().unwrap().unwrap();\n    handle_connection(stream);\n\n    let reply = diner.join().unwrap();\n    println!(\"Diner got: {}\", reply.lines().next().unwrap());\n    println!(\"Body:      {}\", reply.split(\"\\r\\n\\r\\n\").nth(1).unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order:     {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1 \" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order:     GET / HTTP/1.1\nDiner got: HTTP/1.1 404 NOT FOUND\nBody:      <h1>Sorry, not on the menu</h1>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Order:     GET / HTTP/1.1\nDiner got: HTTP/1.1 404 NOT FOUND\nBody:      <h1>Sorry, not on the menu</h1>\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/boss_spot"
    }
   ]
  },
  "boss_trace.rs": {
   "src": "fn main() {\n    // (dish, minute it arrives, minutes to cook)\n    let orders = [(\"stew\", 0, 4), (\"toast\", 1, 1), (\"soup\", 1, 2), (\"tea\", 2, 1)];\n    let mut free_at = [0, 0];\n    for (dish, arrives, minutes) in orders {\n        let cook = if free_at[0] <= free_at[1] { 0 } else { 1 };\n        let start = arrives.max(free_at[cook]);\n        free_at[cook] = start + minutes;\n        println!(\"{dish} {cook} {start} {}\", start - arrives);\n    }\n}\n",
   "stdout": "stew 0 0 0\ntoast 1 1 0\nsoup 1 2 1\ntea 0 4 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stew 0 0 0\ntoast 1 1 0\nsoup 1 2 1\ntea 0 4 2\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/boss_trace"
    }
   ]
  },
  "e0507.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| println!(\"soup is ready\"));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in &mut self.workers {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0507]: cannot move out of `worker.thread` which is behind a mutable reference\n  --> src/main.rs:42:13\n   |\n42 |             worker.thread.join().unwrap();\n   |             ^^^^^^^^^^^^^ ------ `worker.thread` moved due to this method call\n   |             |\n   |             move occurs because `worker.thread` has type `JoinHandle<()>`, which does not implement the `Copy` trait\n   |\nnote: `std::thread::JoinHandle::<T>::join` takes ownership of the receiver `self`, which moves `worker.thread`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/join_handle.rs:149:16\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `e0507` (bin \"e0507\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0507]: cannot move out of `worker.thread` which is behind a mutable reference\n  --> src/main.rs:42:13\n   |\n42 |             worker.thread.join().unwrap();\n   |             ^^^^^^^^^^^^^ ------ `worker.thread` moved due to this method call\n   |             |\n   |             move occurs because `worker.thread` has type `JoinHandle<()>`, which does not implement the `Copy` trait\n   |\nnote: `std::thread::JoinHandle::<T>::join` takes ownership of the receiver `self`, which moves `worker.thread`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/join_handle.rs:149:16\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `e0507` (bin \"e0507\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e0507"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0507]: cannot move out of `worker.thread` which is behind a mutable reference\n  --> src/main.rs:42:13\n   |\n42 |             worker.thread.join().unwrap();\n   |             ^^^^^^^^^^^^^ ------ `worker.thread` moved due to this method call\n   |             |\n   |             move occurs because `worker.thread` has type `JoinHandle<()>`, which does not implement the `Copy` trait\n   |\nnote: `JoinHandle::<T>::join` takes ownership of the receiver `self`, which moves `worker.thread`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/join_handle.rs:149:16\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `e0507` (bin \"e0507\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0507]: cannot move out of `worker.thread` which is behind a mutable reference\n  --> src/main.rs:42:13\n   |\n42 |             worker.thread.join().unwrap();\n   |             ^^^^^^^^^^^^^ ------ `worker.thread` moved due to this method call\n   |             |\n   |             move occurs because `worker.thread` has type `JoinHandle<()>`, which does not implement the `Copy` trait\n   |\nnote: `JoinHandle::<T>::join` takes ownership of the receiver `self`, which moves `worker.thread`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/join_handle.rs:149:16\n\nFor more information about this error, try `rustc --explain E0507`.\nerror: could not compile `e0507` (bin \"e0507\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch29/e0507"
     }
    ]
   }
  },
  "e_addr_in_use.rs": {
   "src": "use std::net::TcpListener;\n\nfn main() {\n    let first = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    println!(\"First restaurant open at {}\", first.local_addr().unwrap());\n\n    let second = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    println!(\"Second restaurant open at {}\", second.local_addr().unwrap());\n}\n",
   "stdout": "First restaurant open at 127.0.0.1:7878\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:7:54:\ncalled `Result::unwrap()` on an `Err` value: Os { code: 98, kind: AddrInUse, message: \"Address already in use\" }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "First restaurant open at 127.0.0.1:7878\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:7:54:\ncalled `Result::unwrap()` on an `Err` value: Os { code: 98, kind: AddrInUse, message: \"Address already in use\" }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_addr_in_use",
     "merged": "First restaurant open at 127.0.0.1:7878\n\nthread 'main' (1) panicked at src/main.rs:7:54:\ncalled `Result::unwrap()` on an `Err` value: Os { code: 98, kind: AddrInUse, message: \"Address already in use\" }\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "e_arc_only.rs": {
   "src": "use std::sync::{Arc, mpsc};\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(receiver);\n    let mut workers = Vec::new();\n    for _ in 0..4 {\n        let receiver = Arc::clone(&receiver);\n        workers.push(thread::spawn(move || {\n            for job in receiver.iter() {\n                job();\n            }\n        }));\n    }\n    sender.send(Box::new(|| println!(\"soup is ready\"))).unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n  --> src/main.rs:12:36\n   |\n12 |           workers.push(thread::spawn(move || {\n   |  ______________________-------------_^\n   | |                      |\n   | |                      required by a bound introduced by this call\n13 | |             for job in receiver.iter() {\n14 | |                 job();\n15 | |             }\n16 | |         }));\n   | |_________^ `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n   |\n   = help: the trait `Sync` is not implemented for `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>`\n   = note: required for `Arc<std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>>` to implement `Send`\nnote: required because it's used within this closure\n  --> src/main.rs:12:36\n   |\n12 |         workers.push(thread::spawn(move || {\n   |                                    ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `e_arc_only` (bin \"e_arc_only\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n  --> src/main.rs:12:36\n   |\n12 |           workers.push(thread::spawn(move || {\n   |  ______________________-------------_^\n   | |                      |\n   | |                      required by a bound introduced by this call\n13 | |             for job in receiver.iter() {\n14 | |                 job();\n15 | |             }\n16 | |         }));\n   | |_________^ `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n   |\n   = help: the trait `Sync` is not implemented for `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>`\n   = note: required for `Arc<std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>>` to implement `Send`\nnote: required because it's used within this closure\n  --> src/main.rs:12:36\n   |\n12 |         workers.push(thread::spawn(move || {\n   |                                    ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `e_arc_only` (bin \"e_arc_only\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_arc_only"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0277]: `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n  --> src/main.rs:12:36\n   |\n12 |           workers.push(thread::spawn(move || {\n   |  ______________________-------------_^\n   | |                      |\n   | |                      required by a bound introduced by this call\n13 | |             for job in receiver.iter() {\n14 | |                 job();\n15 | |             }\n16 | |         }));\n   | |_________^ `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n   |\n   = help: the trait `Sync` is not implemented for `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>`\n   = note: required for `Arc<std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>>` to implement `Send`\nnote: required because it's used within this closure\n  --> src/main.rs:12:36\n   |\n12 |         workers.push(thread::spawn(move || {\n   |                                    ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `e_arc_only` (bin \"e_arc_only\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0277]: `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n  --> src/main.rs:12:36\n   |\n12 |           workers.push(thread::spawn(move || {\n   |  ______________________-------------_^\n   | |                      |\n   | |                      required by a bound introduced by this call\n13 | |             for job in receiver.iter() {\n14 | |                 job();\n15 | |             }\n16 | |         }));\n   | |_________^ `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>` cannot be shared between threads safely\n   |\n   = help: the trait `Sync` is not implemented for `std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>`\n   = note: required for `Arc<std::sync::mpsc::Receiver<Box<(dyn FnOnce() + Send + 'static)>>>` to implement `Send`\nnote: required because it's used within this closure\n  --> src/main.rs:12:36\n   |\n12 |         workers.push(thread::spawn(move || {\n   |                                    ^^^^^^^\nnote: required by a bound in `spawn`\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/thread/functions.rs:125:0\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `e_arc_only` (bin \"e_arc_only\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch29/e_arc_only"
     }
    ]
   }
  },
  "e_moved_receiver.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n        let thread = thread::spawn(move || {\n            for job in receiver {\n                job();\n            }\n        });\n        Worker { id, thread }\n    }\n}\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let mut workers = Vec::new();\n    for id in 0..4 {\n        workers.push(Worker::new(id, receiver));\n    }\n    sender.send(Box::new(|| println!(\"soup is ready\"))).unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of moved value: `receiver`\n  --> src/main.rs:26:38\n   |\n23 |     let (sender, receiver) = mpsc::channel::<Job>();\n   |                  -------- move occurs because `receiver` has type `std::sync::mpsc::Receiver<Box<dyn FnOnce() + Send>>`, which does not implement the `Copy` trait\n24 |     let mut workers = Vec::new();\n25 |     for id in 0..4 {\n   |     -------------- inside of this loop\n26 |         workers.push(Worker::new(id, receiver));\n   |                                      ^^^^^^^^ value moved here, in previous iteration of loop\n   |\nnote: consider changing this parameter type in method `new` to borrow instead if owning the value isn't necessary\n  --> src/main.rs:12:33\n   |\n12 |     fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n   |        --- in this method       ^^^^^^^^^^^^^^^^^^^ this parameter takes ownership of the value\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `e_moved_receiver` (bin \"e_moved_receiver\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of moved value: `receiver`\n  --> src/main.rs:26:38\n   |\n23 |     let (sender, receiver) = mpsc::channel::<Job>();\n   |                  -------- move occurs because `receiver` has type `std::sync::mpsc::Receiver<Box<dyn FnOnce() + Send>>`, which does not implement the `Copy` trait\n24 |     let mut workers = Vec::new();\n25 |     for id in 0..4 {\n   |     -------------- inside of this loop\n26 |         workers.push(Worker::new(id, receiver));\n   |                                      ^^^^^^^^ value moved here, in previous iteration of loop\n   |\nnote: consider changing this parameter type in method `new` to borrow instead if owning the value isn't necessary\n  --> src/main.rs:12:33\n   |\n12 |     fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n   |        --- in this method       ^^^^^^^^^^^^^^^^^^^ this parameter takes ownership of the value\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `e_moved_receiver` (bin \"e_moved_receiver\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_moved_receiver"
    }
   ]
  },
  "e_no_pool.rs": {
   "src": "fn main() {\n    let pool = ThreadPool::new(4);\n    pool.execute(|| println!(\"soup is ready\"));\n}\n",
   "stdout": "",
   "stderr": "error[E0433]: cannot find type `ThreadPool` in this scope\n --> src/main.rs:2:16\n  |\n2 |     let pool = ThreadPool::new(4);\n  |                ^^^^^^^^^^ use of undeclared type `ThreadPool`\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `e_no_pool` (bin \"e_no_pool\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0433]: cannot find type `ThreadPool` in this scope\n --> src/main.rs:2:16\n  |\n2 |     let pool = ThreadPool::new(4);\n  |                ^^^^^^^^^^ use of undeclared type `ThreadPool`\n\nFor more information about this error, try `rustc --explain E0433`.\nerror: could not compile `e_no_pool` (bin \"e_no_pool\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_no_pool"
    }
   ]
  },
  "e_not_mut.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    for stream in listener.incoming().take(1) {\n        handle_connection(stream.unwrap());\n    }\n}\n\nfn handle_connection(stream: TcpStream) {\n    let request_line = BufReader::new(&stream).lines().next().unwrap().unwrap();\n    println!(\"Order: {request_line}\");\n    stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0596]: cannot borrow `stream` as mutable, as it is not declared as mutable\n  --> src/main.rs:14:5\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |     ^^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n11 | fn handle_connection(mut stream: TcpStream) {\n   |                      +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `e_not_mut` (bin \"e_not_mut\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0596]: cannot borrow `stream` as mutable, as it is not declared as mutable\n  --> src/main.rs:14:5\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |     ^^^^^^ cannot borrow as mutable\n   |\nhelp: consider changing this to be mutable\n   |\n11 | fn handle_connection(mut stream: TcpStream) {\n   |                      +++\n\nFor more information about this error, try `rustc --explain E0596`.\nerror: could not compile `e_not_mut` (bin \"e_not_mut\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_not_mut"
    }
   ]
  },
  "e_pool_zero.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\nfn main() {\n    let pool = ThreadPool::new(0);\n    pool.execute(|| println!(\"soup is ready\"));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:18:9:\nassertion failed: size > 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:18:9:\nassertion failed: size > 0\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_pool_zero"
    }
   ]
  },
  "e_write_scope.rs": {
   "src": "use std::io::{BufRead, BufReader};\nuse std::net::{TcpListener, TcpStream};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    for stream in listener.incoming().take(1) {\n        handle_connection(stream.unwrap());\n    }\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let request_line = BufReader::new(&stream).lines().next().unwrap().unwrap();\n    println!(\"Order: {request_line}\");\n    stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0599]: no method named `write_all` found for struct `TcpStream` in the current scope\n  --> src/main.rs:14:12\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |            ^^^^^^^^^\n   |\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/io/write.rs:214:7\n   |\n   = note: the method is available for `TcpStream` here\n   |\n   = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_all` is implemented but not in scope; perhaps you want to import it\n   |\n 1 + use std::io::Write;\n   |\nhelp: there is a method `write` with a similar name\n   |\n14 -     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n14 +     stream.write(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `e_write_scope` (bin \"e_write_scope\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0599]: no method named `write_all` found for struct `TcpStream` in the current scope\n  --> src/main.rs:14:12\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |            ^^^^^^^^^\n   |\n  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/core/src/io/write.rs:214:7\n   |\n   = note: the method is available for `TcpStream` here\n   |\n   = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_all` is implemented but not in scope; perhaps you want to import it\n   |\n 1 + use std::io::Write;\n   |\nhelp: there is a method `write` with a similar name\n   |\n14 -     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n14 +     stream.write(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `e_write_scope` (bin \"e_write_scope\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/e_write_scope"
    }
   ],
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "",
    "stderr": "error[E0599]: no method named `write_all` found for struct `TcpStream` in the current scope\n  --> src/main.rs:14:12\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |            ^^^^^^^^^\n   |\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/mod.rs:1858:7\n   |\n   = note: the method is available for `TcpStream` here\n   |\n   = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_all` is implemented but not in scope; perhaps you want to import it\n   |\n 1 + use std::io::Write;\n   |\nhelp: there is a method `write` with a similar name\n   |\n14 -     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n14 +     stream.write(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `e_write_scope` (bin \"e_write_scope\") due to 1 previous error\n",
    "exit": 101,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "",
      "err": "error[E0599]: no method named `write_all` found for struct `TcpStream` in the current scope\n  --> src/main.rs:14:12\n   |\n14 |     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |            ^^^^^^^^^\n   |\n  --> /rustc/2d8144b7880597b6e6d3dfd63a9a9efae3f533d3/library/std/src/io/mod.rs:1858:7\n   |\n   = note: the method is available for `TcpStream` here\n   |\n   = help: items from traits can only be used if the trait is in scope\nhelp: trait `Write` which provides `write_all` is implemented but not in scope; perhaps you want to import it\n   |\n 1 + use std::io::Write;\n   |\nhelp: there is a method `write` with a similar name\n   |\n14 -     stream.write_all(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n14 +     stream.write(b\"HTTP/1.1 200 OK\\r\\n\\r\\n\").unwrap();\n   |\n\nFor more information about this error, try `rustc --explain E0599`.\nerror: could not compile `e_write_scope` (bin \"e_write_scope\") due to 1 previous error\n",
      "exit": 101,
      "dir": "~/rust-ch29/e_write_scope"
     }
    ]
   }
  },
  "fill_drop.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(2);\n    pool.execute(|| println!(\"waffles are ready\"));\n    thread::sleep(Duration::from_millis(100));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "waffles are ready\nShutting down worker 0\nShutting down worker 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "waffles are ready\nShutting down worker 0\nShutting down worker 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/fill_drop"
    }
   ]
  },
  "fill_pool.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| println!(\"pancakes are ready\"));\n    thread::sleep(Duration::from_millis(100));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "pancakes are ready\nShutting down worker 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "pancakes are ready\nShutting down worker 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/fill_pool"
    }
   ]
  },
  "fill_request.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| {\n        let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n        stream.write_all(b\"GET /menu HTTP/1.1\\r\\nHost: mabel\\r\\nAccept: */*\\r\\n\\r\\n\").unwrap();\n    });\n    let stream = listener.incoming().next().unwrap().unwrap();\n    let buf_reader = BufReader::new(&stream);\n    let request: Vec<String> = buf_reader\n        .lines()\n        .map(|line| line.unwrap())\n        .take_while(|line| !line.is_empty())\n        .collect();\n    println!(\"{} lines, first: {}\", request.len(), request[0]);\n    diner.join().unwrap();\n}\n",
   "stdout": "3 lines, first: GET /menu HTTP/1.1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "3 lines, first: GET /menu HTTP/1.1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/fill_request"
    }
   ]
  },
  "first_listen.rs": {
   "src": "use std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    println!(\"Doors open at 127.0.0.1:7878\");\n    let diners = thread::spawn(|| test_diners(3));\n\n    for stream in listener.incoming().take(3) {\n        let _stream = stream.unwrap();\n        println!(\"Connection established!\");\n    }\n\n    diners.join().unwrap();\n    println!(\"Soft opening over: 3 visits.\");\n}\n\n// The test diners play the browser. They are not the server.\nfn test_diners(how_many: usize) {\n    for _ in 0..how_many {\n        TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    }\n}\n",
   "stdout": "Doors open at 127.0.0.1:7878\nConnection established!\nConnection established!\nConnection established!\nSoft opening over: 3 visits.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Doors open at 127.0.0.1:7878\nConnection established!\nConnection established!\nConnection established!\nSoft opening over: 3 visits.\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/first_listen"
    }
   ]
  },
  "forget_sender.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    // A watchdog: after 2 seconds, it says so and ends the program.\n    thread::spawn(|| {\n        thread::sleep(Duration::from_secs(2));\n        println!(\"watchdog: still waiting after 2 s. The rail never closed!\");\n        std::process::exit(1);\n    });\n\n    let pool = ThreadPool::new(2);\n    pool.execute(|| println!(\"soup is ready\"));\n    thread::sleep(Duration::from_millis(100));\n    println!(\"main: closing time\");\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "soup is ready\nmain: closing time\nShutting down worker 0\nwatchdog: still waiting after 2 s. The rail never closed!\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "soup is ready\nmain: closing time\nShutting down worker 0\nwatchdog: still waiting after 2 s. The rail never closed!\n",
     "err": "",
     "exit": 1,
     "dir": "~/rust-ch29/forget_sender"
    }
   ]
  },
  "grand_opening.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let pool = ThreadPool::new(4);\n    println!(\"Mabel's is open at http://127.0.0.1:7878\");\n\n    for stream in listener.incoming() {\n        let stream = stream.unwrap();\n        pool.execute(|| handle_connection(stream));\n    }\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"start  {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    println!(\"ready  {request_line}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd grand_opening",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29"
    },
    {
     "cmd": "cargo build -q",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    },
    {
     "cmd": "cargo run -q &",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    },
    {
     "cmd": "sleep 1",
     "out": "Mabel's is open at http://127.0.0.1:7878\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    },
    {
     "cmd": "curl -s -i http://127.0.0.1:7878/",
     "out": "start  GET / HTTP/1.1\nready  GET / HTTP/1.1\nHTTP/1.1 200 OK\nContent-Length: 28\n\n<h1>Welcome to Mabel's!</h1>",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    },
    {
     "cmd": "curl -s -i http://127.0.0.1:7878/pizza",
     "out": "start  GET /pizza HTTP/1.1\nready  GET /pizza HTTP/1.1\nHTTP/1.1 404 NOT FOUND\nContent-Length: 31\n\n<h1>Sorry, not on the menu</h1>",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    },
    {
     "cmd": "kill %1",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/grand_opening"
    }
   ]
  },
  "lock_fixed.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    let mut cooks = Vec::new();\n    for _ in 0..2 {\n        let receiver = Arc::clone(&receiver);\n        cooks.push(thread::spawn(move || {\n            loop {\n                let message = receiver.lock().unwrap().recv();\n                match message {\n                    Ok(job) => job(),\n                    Err(_) => break,\n                }\n            }\n        }));\n    }\n\n    let start = Instant::now();\n    sender.send(Box::new(|| thread::sleep(Duration::from_secs(1)))).unwrap();\n    thread::sleep(Duration::from_millis(100));\n    sender.send(Box::new(move || {\n        println!(\"toast served after about {:.0} s\", start.elapsed().as_secs_f64());\n    })).unwrap();\n\n    drop(sender);\n    for cook in cooks {\n        cook.join().unwrap();\n    }\n}\n",
   "stdout": "toast served after about 0 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "toast served after about 0 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/lock_fixed"
    }
   ]
  },
  "lock_held.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    let mut cooks = Vec::new();\n    for _ in 0..2 {\n        let receiver = Arc::clone(&receiver);\n        cooks.push(thread::spawn(move || {\n            while let Ok(job) = receiver.lock().unwrap().recv() {\n                job();\n            }\n        }));\n    }\n\n    let start = Instant::now();\n    sender.send(Box::new(|| thread::sleep(Duration::from_secs(1)))).unwrap();\n    thread::sleep(Duration::from_millis(100));\n    sender.send(Box::new(move || {\n        println!(\"toast served after about {:.0} s\", start.elapsed().as_secs_f64());\n    })).unwrap();\n\n    drop(sender);\n    for cook in cooks {\n        cook.join().unwrap();\n    }\n}\n",
   "stdout": "toast served after about 1 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "toast served after about 1 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/lock_held"
    }
   ]
  },
  "no_drop.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| {\n        thread::sleep(Duration::from_millis(300));\n        println!(\"till counted: 42 coins\");\n    });\n    println!(\"main: closing time\");\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "main: closing time\n",
   "stderr": "warning: field `workers` is never read\n  --> src/main.rs:17:5\n   |\n16 | pub struct ThreadPool {\n   |            ---------- field in this struct\n17 |     workers: Vec<Worker>,\n   |     ^^^^^^^\n   |\n   = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\nwarning: fields `id` and `thread` are never read\n  --> src/main.rs:43:5\n   |\n42 | struct Worker {\n   |        ------ fields in this struct\n43 |     id: usize,\n   |     ^^\n44 |     thread: thread::JoinHandle<()>,\n   |     ^^^^^^\n\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: closing time\n",
     "err": "warning: field `workers` is never read\n  --> src/main.rs:17:5\n   |\n16 | pub struct ThreadPool {\n   |            ---------- field in this struct\n17 |     workers: Vec<Worker>,\n   |     ^^^^^^^\n   |\n   = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\nwarning: fields `id` and `thread` are never read\n  --> src/main.rs:43:5\n   |\n42 | struct Worker {\n   |        ------ fields in this struct\n43 |     id: usize,\n   |     ^^\n44 |     thread: thread::JoinHandle<()>,\n   |     ^^^^^^\n\n",
     "exit": 0,
     "dir": "~/rust-ch29/no_drop",
     "merged": "warning: field `workers` is never read\n  --> src/main.rs:17:5\n   |\n16 | pub struct ThreadPool {\n   |            ---------- field in this struct\n17 |     workers: Vec<Worker>,\n   |     ^^^^^^^\n   |\n   = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default\n\nwarning: fields `id` and `thread` are never read\n  --> src/main.rs:43:5\n   |\n42 | struct Worker {\n   |        ------ fields in this struct\n43 |     id: usize,\n   |     ^^\n44 |     thread: thread::JoinHandle<()>,\n   |     ^^^^^^\n\nmain: closing time\n"
    }
   ]
  },
  "pool_logs.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diners = thread::spawn(|| {\n        for path in [\"/\", \"/pizza\", \"/\"] {\n            test_diner(path);\n        }\n    });\n    let pool = ThreadPool::new(4);\n\n    for stream in listener.incoming().take(3) {\n        let stream = stream.unwrap();\n        pool.execute(|| handle_connection(stream));\n    }\n    diners.join().unwrap();\n    println!(\"Shutting down.\");\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\n// It returns the status and the wait, in whole seconds.\nfn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => {\n                    println!(\"Worker {id} got a job; executing.\");\n                    job();\n                }\n                Err(_) => {\n                    println!(\"Worker {id} disconnected; shutting down.\");\n                    break;\n                }\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "Worker 0 got a job; executing.\nWorker 0 got a job; executing.\nWorker 3 got a job; executing.\nShutting down.\nShutting down worker 0\nWorker 1 disconnected; shutting down.\nWorker 0 disconnected; shutting down.\nWorker 3 disconnected; shutting down.\nShutting down worker 1\nShutting down worker 2\nWorker 2 disconnected; shutting down.\nShutting down worker 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Worker 0 got a job; executing.\nWorker 0 got a job; executing.\nWorker 3 got a job; executing.\nShutting down.\nShutting down worker 0\nWorker 1 disconnected; shutting down.\nWorker 0 disconnected; shutting down.\nWorker 3 disconnected; shutting down.\nShutting down worker 1\nShutting down worker 2\nWorker 2 disconnected; shutting down.\nShutting down worker 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pool_logs"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Rust 1.97.0 (edition 2024)",
    "stdout": "Worker 0 got a job; executing.\nWorker 0 got a job; executing.\nWorker 3 got a job; executing.\nShutting down.\nWorker 0 disconnected; shutting down.\nShutting down worker 0\nShutting down worker 1\nWorker 1 disconnected; shutting down.\nWorker 3 disconnected; shutting down.\nShutting down worker 2\nWorker 2 disconnected; shutting down.\nShutting down worker 3\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cargo run -q",
      "out": "Worker 0 got a job; executing.\nWorker 0 got a job; executing.\nWorker 3 got a job; executing.\nShutting down.\nWorker 0 disconnected; shutting down.\nShutting down worker 0\nShutting down worker 1\nWorker 1 disconnected; shutting down.\nWorker 3 disconnected; shutting down.\nShutting down worker 2\nWorker 2 disconnected; shutting down.\nShutting down worker 3\n",
      "err": "",
      "exit": 0,
      "dir": "~/rust-ch29/pool_logs"
     }
    ]
   }
  },
  "pool_server.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner1 = thread::spawn(|| test_diner(\"/sleep\"));\n    let diner2 = thread::spawn(|| {\n        thread::sleep(Duration::from_millis(100)); // arrives a moment later\n        test_diner(\"/\")\n    });\n    let pool = ThreadPool::new(4);\n\n    for stream in listener.incoming().take(2) {\n        let stream = stream.unwrap();\n        pool.execute(|| handle_connection(stream));\n    }\n\n    println!(\"diner 1 (stew):  {}\", diner1.join().unwrap());\n    println!(\"diner 2 (hello): {}\", diner2.join().unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"start  {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    println!(\"ready  {request_line}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\n// It returns the status and the wait, in whole seconds.\nfn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\nShutting down worker 0\nShutting down worker 1\nShutting down worker 2\nShutting down worker 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\nShutting down worker 0\nShutting down worker 1\nShutting down worker 2\nShutting down worker 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pool_server"
    }
   ]
  },
  "pool_tracer.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    println!(\"owners: {}\", Arc::strong_count(&receiver));\n\n    let mut workers = Vec::new();\n    for _ in 0..2 {\n        let rx = Arc::clone(&receiver);\n        workers.push(thread::spawn(move || loop {\n            let message = rx.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        }));\n    }\n    println!(\"owners: {}\", Arc::strong_count(&receiver));\n\n    sender.send(Box::new(|| println!(\"soup is ready\"))).unwrap();\n    drop(sender);\n    for worker in workers {\n        worker.join().unwrap();\n    }\n    println!(\"owners: {}\", Arc::strong_count(&receiver));\n}\n",
   "stdout": "owners: 1\nowners: 3\nsoup is ready\nowners: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "owners: 1\nowners: 3\nsoup is ready\nowners: 1\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pool_tracer"
    }
   ]
  },
  "predict_response.rs": {
   "src": "fn main() {\n    let status_line = \"HTTP/1.1 404 NOT FOUND\";\n    let contents = \"<p>No pizza</p>\";\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n\n    println!(\"{length}\");\n    println!(\"{response:?}\");\n    println!(\"{}\", response.lines().count());\n}\n",
   "stdout": "15\n\"HTTP/1.1 404 NOT FOUND\\r\\nContent-Length: 15\\r\\n\\r\\n<p>No pizza</p>\"\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "15\n\"HTTP/1.1 404 NOT FOUND\\r\\nContent-Length: 15\\r\\n\\r\\n<p>No pizza</p>\"\n4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/predict_response"
    }
   ]
  },
  "predict_routes.rs": {
   "src": "fn route(request_line: &str) -> (&str, usize) {\n    let (status, contents) = match request_line {\n        \"GET / HTTP/1.1\" => (\"200 OK\", \"<h1>Hi!</h1>\"),\n        \"GET /tea HTTP/1.1\" => (\"200 OK\", \"<p>Tea</p>\"),\n        _ => (\"404 NOT FOUND\", \"<p>Nope</p>\"),\n    };\n    (status, contents.len())\n}\n\nfn main() {\n    for path in [\"/\", \"/tea\", \"/Tea\"] {\n        let line = format!(\"GET {path} HTTP/1.1\");\n        let (status, length) = route(&line);\n        println!(\"{path} {status} {length}\");\n    }\n}\n",
   "stdout": "/ 200 OK 12\n/tea 200 OK 10\n/Tea 404 NOT FOUND 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "/ 200 OK 12\n/tea 200 OK 10\n/Tea 404 NOT FOUND 11\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/predict_routes"
    }
   ]
  },
  "predict_send.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| println!(\"soup is ready\"));\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "",
   "stderr": "error[E0277]: `F` cannot be sent between threads safely\n  --> src/main.rs:33:44\n   |\n33 |         self.sender.as_ref().unwrap().send(job).unwrap();\n   |                                            ^^^ `F` cannot be sent between threads safely\n   |\n   = note: required for the cast from `Box<F>` to `Box<(dyn FnOnce() + Send + 'static)>`\nhelp: consider further restricting type parameter `F` with trait `Send`\n   |\n30 |         F: FnOnce() + 'static + std::marker::Send,\n   |                               +++++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0277]: `F` cannot be sent between threads safely\n  --> src/main.rs:33:44\n   |\n33 |         self.sender.as_ref().unwrap().send(job).unwrap();\n   |                                            ^^^ `F` cannot be sent between threads safely\n   |\n   = note: required for the cast from `Box<F>` to `Box<(dyn FnOnce() + Send + 'static)>`\nhelp: consider further restricting type parameter `F` with trait `Send`\n   |\n30 |         F: FnOnce() + 'static + std::marker::Send,\n   |                               +++++++++++++++++++\n\nFor more information about this error, try `rustc --explain E0277`.\nerror: could not compile `predict_send` (bin \"predict_send\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/predict_send"
    }
   ]
  },
  "predict_shutdown.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    for n in 1..=2 {\n        pool.execute(move || {\n            thread::sleep(Duration::from_millis(200));\n            println!(\"order {n} plated\");\n        });\n    }\n    println!(\"main: last order taken\");\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "main: last order taken\nShutting down worker 0\norder 1 plated\norder 2 plated\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: last order taken\nShutting down worker 0\norder 1 plated\norder 2 plated\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/predict_shutdown"
    }
   ]
  },
  "pz_closing.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn hire(size: usize) -> (mpsc::Sender<Job>, Vec<thread::JoinHandle<()>>) {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    let mut cooks = Vec::with_capacity(size);\n    for _ in 0..size {\n        let receiver = Arc::clone(&receiver);\n        cooks.push(thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        }));\n    }\n    (sender, cooks)\n}\n\nfn main() {\n    let (sender, cooks) = hire(2);\n    sender.send(Box::new(|| println!(\"omelette is ready\"))).unwrap();\n    drop(sender);\n    for cook in cooks {\n        cook.join().unwrap();\n    }\n    println!(\"both cooks clocked out\");\n}\n",
   "stdout": "omelette is ready\nboth cooks clocked out\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "omelette is ready\nboth cooks clocked out\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pz_closing"
    }
   ]
  },
  "pz_pool_new.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn hire(size: usize) -> (mpsc::Sender<Job>, Vec<thread::JoinHandle<()>>) {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    let mut cooks = Vec::with_capacity(size);\n    for _ in 0..size {\n        let receiver = Arc::clone(&receiver);\n        cooks.push(thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        }));\n    }\n    (sender, cooks)\n}\n\nfn main() {\n    let (sender, cooks) = hire(3);\n    sender.send(Box::new(|| println!(\"crepes are ready\"))).unwrap();\n    drop(sender);\n    for cook in cooks {\n        cook.join().unwrap();\n    }\n    println!(\"all 3 cooks clocked out\");\n}\n",
   "stdout": "crepes are ready\nall 3 cooks clocked out\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "crepes are ready\nall 3 cooks clocked out\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pz_pool_new"
    }
   ]
  },
  "pz_response.rs": {
   "src": "fn main() {\n    let contents = \"<h1>Tea</h1>\";\n    let length = contents.len();\n    let headers = format!(\"HTTP/1.1 200 OK\\r\\nContent-Length: {length}\");\n    let response = format!(\"{headers}\\r\\n\\r\\n{contents}\");\n    println!(\"{response:?}\");\n}\n",
   "stdout": "\"HTTP/1.1 200 OK\\r\\nContent-Length: 12\\r\\n\\r\\n<h1>Tea</h1>\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"HTTP/1.1 200 OK\\r\\nContent-Length: 12\\r\\n\\r\\n<h1>Tea</h1>\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/pz_response"
    }
   ]
  },
  "read_request.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| test_diner(\"/\"));\n\n    for stream in listener.incoming().take(1) {\n        let stream = stream.unwrap();\n        handle_connection(stream);\n    }\n    diner.join().unwrap();\n}\n\nfn handle_connection(stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let http_request: Vec<String> = buf_reader\n        .lines()\n        .map(|line| line.unwrap())\n        .take_while(|line| !line.is_empty())\n        .collect();\n\n    println!(\"Request: {http_request:#?}\");\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\nUser-Agent: test-diner\\r\\nAccept: text/html\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Request: [\n    \"GET / HTTP/1.1\",\n    \"Host: 127.0.0.1:7878\",\n    \"User-Agent: test-diner\",\n    \"Accept: text/html\",\n]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Request: [\n    \"GET / HTTP/1.1\",\n    \"Host: 127.0.0.1:7878\",\n    \"User-Agent: test-diner\",\n    \"Accept: text/html\",\n]\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/read_request"
    }
   ]
  },
  "respond.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| test_diner(\"/\"));\n\n    for stream in listener.incoming().take(1) {\n        let stream = stream.unwrap();\n        handle_connection(stream);\n    }\n\n    let reply = diner.join().unwrap();\n    println!(\"The diner got {} bytes:\", reply.len());\n    println!(\"{reply:?}\");\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order: {request_line}\");\n\n    let status_line = \"HTTP/1.1 200 OK\";\n    let contents = \"<h1>Welcome to Mabel's!</h1>\";\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order: GET / HTTP/1.1\nThe diner got 67 bytes:\n\"HTTP/1.1 200 OK\\r\\nContent-Length: 28\\r\\n\\r\\n<h1>Welcome to Mabel's!</h1>\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Order: GET / HTTP/1.1\nThe diner got 67 bytes:\n\"HTTP/1.1 200 OK\\r\\nContent-Length: 28\\r\\n\\r\\n<h1>Welcome to Mabel's!</h1>\"\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/respond"
    }
   ]
  },
  "route_empty.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    // A shy diner: opens the door, then leaves without ordering.\n    let diner = thread::spawn(|| drop(TcpStream::connect(\"127.0.0.1:7878\").unwrap()));\n    diner.join().unwrap();\n\n    let stream = listener.incoming().next().unwrap().unwrap();\n    handle_connection(stream);\n}\n\nfn handle_connection(stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order: {request_line}\");\n}\n",
   "stdout": "",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:17:50:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "\nthread 'main' (1) panicked at src/main.rs:17:50:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch29/route_empty"
    }
   ]
  },
  "route_home.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::{env, thread, time::Duration};\n\nfn main() {\n    let path = env::args().nth(1).unwrap_or(String::from(\"/\"));\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(move || test_diner(&path));\n\n    let stream = listener.incoming().next().unwrap().unwrap();\n    handle_connection(stream);\n\n    let reply = diner.join().unwrap();\n    println!(\"Diner got: {}\", reply.lines().next().unwrap());\n    println!(\"Body:      {}\", reply.split(\"\\r\\n\\r\\n\").nth(1).unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order:     {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order:     GET / HTTP/1.1\nDiner got: HTTP/1.1 200 OK\nBody:      <h1>Welcome to Mabel's!</h1>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- /",
     "out": "Order:     GET / HTTP/1.1\nDiner got: HTTP/1.1 200 OK\nBody:      <h1>Welcome to Mabel's!</h1>\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/route_home"
    }
   ]
  },
  "route_missing.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::{env, thread, time::Duration};\n\nfn main() {\n    let path = env::args().nth(1).unwrap_or(String::from(\"/\"));\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(move || test_diner(&path));\n\n    let stream = listener.incoming().next().unwrap().unwrap();\n    handle_connection(stream);\n\n    let reply = diner.join().unwrap();\n    println!(\"Diner got: {}\", reply.lines().next().unwrap());\n    println!(\"Body:      {}\", reply.split(\"\\r\\n\\r\\n\").nth(1).unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order:     {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order:     GET /pizza HTTP/1.1\nDiner got: HTTP/1.1 404 NOT FOUND\nBody:      <h1>Sorry, not on the menu</h1>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- /pizza",
     "out": "Order:     GET /pizza HTTP/1.1\nDiner got: HTTP/1.1 404 NOT FOUND\nBody:      <h1>Sorry, not on the menu</h1>\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/route_missing"
    }
   ]
  },
  "route_slow.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::{env, thread, time::Duration};\n\nfn main() {\n    let path = env::args().nth(1).unwrap_or(String::from(\"/\"));\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(move || test_diner(&path));\n\n    let stream = listener.incoming().next().unwrap().unwrap();\n    handle_connection(stream);\n\n    let reply = diner.join().unwrap();\n    println!(\"Diner got: {}\", reply.lines().next().unwrap());\n    println!(\"Body:      {}\", reply.split(\"\\r\\n\\r\\n\").nth(1).unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"Order:     {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order:     GET /sleep HTTP/1.1\nDiner got: HTTP/1.1 200 OK\nBody:      <h1>Slow-cooked stew</h1>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q -- /sleep",
     "out": "Order:     GET /sleep HTTP/1.1\nDiner got: HTTP/1.1 200 OK\nBody:      <h1>Slow-cooked stew</h1>\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/route_slow"
    }
   ]
  },
  "route_table.rs": {
   "src": "fn route(request_line: &str) -> &str {\n    match request_line {\n        \"GET / HTTP/1.1\" => \"200 OK\",\n        \"GET /sleep HTTP/1.1\" => \"200 OK (after a nap)\",\n        _ => \"404 NOT FOUND\",\n    }\n}\n\nfn main() {\n    let orders = [\n        \"GET / HTTP/1.1\",\n        \"GET /sleep HTTP/1.1\",\n        \"GET /pizza HTTP/1.1\",\n        \"get / HTTP/1.1\",\n        \"GET /  HTTP/1.1\",\n        \"POST / HTTP/1.1\",\n    ];\n    for order in orders {\n        println!(\"{order:?} -> {}\", route(order));\n    }\n}\n",
   "stdout": "\"GET / HTTP/1.1\" -> 200 OK\n\"GET /sleep HTTP/1.1\" -> 200 OK (after a nap)\n\"GET /pizza HTTP/1.1\" -> 404 NOT FOUND\n\"get / HTTP/1.1\" -> 404 NOT FOUND\n\"GET /  HTTP/1.1\" -> 404 NOT FOUND\n\"POST / HTTP/1.1\" -> 404 NOT FOUND\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "\"GET / HTTP/1.1\" -> 200 OK\n\"GET /sleep HTTP/1.1\" -> 200 OK (after a nap)\n\"GET /pizza HTTP/1.1\" -> 404 NOT FOUND\n\"get / HTTP/1.1\" -> 404 NOT FOUND\n\"GET /  HTTP/1.1\" -> 404 NOT FOUND\n\"POST / HTTP/1.1\" -> 404 NOT FOUND\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/route_table"
    }
   ]
  },
  "rush.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nconst ORDERS: [&str; 5] = [\"/sleep\", \"/\", \"/sleep\", \"/\", \"/\"];\n\nfn rush(size: usize) {\n    println!(\"--- {size} worker{} ---\", if size == 1 { \"\" } else { \"s\" });\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let pool = ThreadPool::new(size);\n\n    // Five diners arrive 50 ms apart.\n    let mut diners = Vec::new();\n    for (i, path) in ORDERS.into_iter().enumerate() {\n        diners.push(thread::spawn(move || {\n            thread::sleep(Duration::from_millis(50 * i as u64));\n            timed_diner(path)\n        }));\n    }\n    for stream in listener.incoming().take(ORDERS.len()) {\n        let stream = stream.unwrap();\n        pool.execute(|| handle_quietly(stream));\n    }\n\n    for (i, diner) in diners.into_iter().enumerate() {\n        let waited = diner.join().unwrap();\n        let path = ORDERS[i];\n        if path == \"/sleep\" {\n            println!(\"diner {} GET {path}: stew (slow dish)\", i + 1);\n        } else {\n            let long = waited > Duration::from_millis(400);\n            println!(\"diner {} GET {path}: waited behind a stew? {}\", i + 1, if long { \"yes\" } else { \"no\" });\n        }\n    }\n}\n\nfn main() {\n    for size in [1, 2, 4] {\n        rush(size);\n    }\n}\n\nfn handle_quietly(mut stream: TcpStream) {\n    let request_line = BufReader::new(&stream).lines().next().unwrap().unwrap();\n    let contents = match &request_line[..] {\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_millis(800));\n            \"<h1>Slow-cooked stew</h1>\"\n        }\n        _ => \"<h1>Welcome to Mabel's!</h1>\",\n    };\n    let length = contents.len();\n    let response = format!(\"HTTP/1.1 200 OK\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// A test diner: sends one order, returns how long the reply took.\nfn timed_diner(path: &str) -> Duration {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    start.elapsed()\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "--- 1 worker ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? yes\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? yes\ndiner 5 GET /: waited behind a stew? yes\nShutting down worker 0\n--- 2 workers ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? no\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? yes\ndiner 5 GET /: waited behind a stew? yes\nShutting down worker 0\nShutting down worker 1\n--- 4 workers ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? no\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? no\ndiner 5 GET /: waited behind a stew? no\nShutting down worker 0\nShutting down worker 1\nShutting down worker 2\nShutting down worker 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "--- 1 worker ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? yes\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? yes\ndiner 5 GET /: waited behind a stew? yes\nShutting down worker 0\n--- 2 workers ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? no\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? yes\ndiner 5 GET /: waited behind a stew? yes\nShutting down worker 0\nShutting down worker 1\n--- 4 workers ---\ndiner 1 GET /sleep: stew (slow dish)\ndiner 2 GET /: waited behind a stew? no\ndiner 3 GET /sleep: stew (slow dish)\ndiner 4 GET /: waited behind a stew? no\ndiner 5 GET /: waited behind a stew? no\nShutting down worker 0\nShutting down worker 1\nShutting down worker 2\nShutting down worker 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/rush"
    }
   ]
  },
  "slow_single.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner1 = thread::spawn(|| test_diner(\"/sleep\"));\n    let diner2 = thread::spawn(|| {\n        thread::sleep(Duration::from_millis(100)); // arrives a moment later\n        test_diner(\"/\")\n    });\n\n    for stream in listener.incoming().take(2) {\n        let stream = stream.unwrap();\n        handle_connection(stream);\n    }\n\n    println!(\"diner 1 (stew):  {}\", diner1.join().unwrap());\n    println!(\"diner 2 (hello): {}\", diner2.join().unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"start  {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    println!(\"ready  {request_line}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\n// It returns the status and the wait, in whole seconds.\nfn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n",
   "stdout": "start  GET /sleep HTTP/1.1\nready  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 1 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "start  GET /sleep HTTP/1.1\nready  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 1 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/slow_single"
    }
   ]
  },
  "spawn_each.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner1 = thread::spawn(|| test_diner(\"/sleep\"));\n    let diner2 = thread::spawn(|| {\n        thread::sleep(Duration::from_millis(100)); // arrives a moment later\n        test_diner(\"/\")\n    });\n\n    for stream in listener.incoming().take(2) {\n        let stream = stream.unwrap();\n        thread::spawn(|| handle_connection(stream));\n    }\n\n    println!(\"diner 1 (stew):  {}\", diner1.join().unwrap());\n    println!(\"diner 2 (hello): {}\", diner2.join().unwrap());\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let buf_reader = BufReader::new(&stream);\n    let request_line = buf_reader.lines().next().unwrap().unwrap();\n    println!(\"start  {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            thread::sleep(Duration::from_secs(1));\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    println!(\"ready  {request_line}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\n// It returns the status and the wait, in whole seconds.\nfn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n",
   "stdout": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/spawn_each"
    }
   ]
  },
  "spot_blank.rs": {
   "src": "use std::io::{BufReader, prelude::*};\nuse std::net::{TcpListener, TcpStream};\nuse std::thread;\n\nfn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").unwrap();\n    let diner = thread::spawn(|| test_diner(\"/\"));\n    handle_connection(listener.incoming().next().unwrap().unwrap());\n\n    let reply = diner.join().unwrap();\n    let body = reply.split(\"\\r\\n\\r\\n\").nth(1).unwrap();\n    println!(\"Body: {body}\");\n}\n\nfn handle_connection(mut stream: TcpStream) {\n    let request_line = BufReader::new(&stream).lines().next().unwrap().unwrap();\n    println!(\"Order: {request_line}\");\n    let contents = \"<h1>Soup of the day</h1>\";\n    let length = contents.len();\n    let response = format!(\"HTTP/1.1 200 OK\\r\\nContent-Length: {length}\\r\\n{contents}\");\n    stream.write_all(response.as_bytes()).unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nfn test_diner(path: &str) -> String {\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).unwrap();\n    reply\n}\n",
   "stdout": "Order: GET / HTTP/1.1\n",
   "stderr": "\nthread 'main' (1) panicked at src/main.rs:11:47:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "Order: GET / HTTP/1.1\n",
     "err": "\nthread 'main' (1) panicked at src/main.rs:11:47:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n",
     "exit": 101,
     "dir": "~/rust-ch29/spot_blank",
     "merged": "Order: GET / HTTP/1.1\n\nthread 'main' (1) panicked at src/main.rs:11:47:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
    }
   ]
  },
  "spot_lock.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::{Duration, Instant};\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let receiver = Arc::new(Mutex::new(receiver));\n    let mut cooks = Vec::new();\n    for _ in 0..2 {\n        let receiver = Arc::clone(&receiver);\n        cooks.push(thread::spawn(move || {\n            while let Ok(job) = receiver.lock().unwrap().recv() {\n                job();\n            }\n        }));\n    }\n\n    let start = Instant::now();\n    sender.send(Box::new(|| thread::sleep(Duration::from_secs(1)))).unwrap();\n    thread::sleep(Duration::from_millis(100));\n    sender.send(Box::new(move || {\n        println!(\"tea served after about {:.0} s\", start.elapsed().as_secs_f64());\n    })).unwrap();\n\n    drop(sender);\n    for cook in cooks {\n        cook.join().unwrap();\n    }\n}\n",
   "stdout": "tea served after about 1 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "tea served after about 1 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/spot_lock"
    }
   ]
  },
  "spot_receiver.rs": {
   "src": "use std::sync::mpsc;\nuse std::thread;\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n        let thread = thread::spawn(move || {\n            for job in receiver {\n                job();\n            }\n        });\n        Worker { id, thread }\n    }\n}\n\nfn main() {\n    let (sender, receiver) = mpsc::channel::<Job>();\n    let mut workers = Vec::new();\n    for id in 0..4 {\n        workers.push(Worker::new(id, receiver));\n    }\n    sender.send(Box::new(|| println!(\"salad is ready\"))).unwrap();\n}\n",
   "stdout": "",
   "stderr": "error[E0382]: use of moved value: `receiver`\n  --> src/main.rs:26:38\n   |\n23 |     let (sender, receiver) = mpsc::channel::<Job>();\n   |                  -------- move occurs because `receiver` has type `std::sync::mpsc::Receiver<Box<dyn FnOnce() + Send>>`, which does not implement the `Copy` trait\n24 |     let mut workers = Vec::new();\n25 |     for id in 0..4 {\n   |     -------------- inside of this loop\n26 |         workers.push(Worker::new(id, receiver));\n   |                                      ^^^^^^^^ value moved here, in previous iteration of loop\n   |\nnote: consider changing this parameter type in method `new` to borrow instead if owning the value isn't necessary\n  --> src/main.rs:12:33\n   |\n12 |     fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n   |        --- in this method       ^^^^^^^^^^^^^^^^^^^ this parameter takes ownership of the value\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_receiver` (bin \"spot_receiver\") due to 1 previous error\n",
   "exit": 101,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "",
     "err": "error[E0382]: use of moved value: `receiver`\n  --> src/main.rs:26:38\n   |\n23 |     let (sender, receiver) = mpsc::channel::<Job>();\n   |                  -------- move occurs because `receiver` has type `std::sync::mpsc::Receiver<Box<dyn FnOnce() + Send>>`, which does not implement the `Copy` trait\n24 |     let mut workers = Vec::new();\n25 |     for id in 0..4 {\n   |     -------------- inside of this loop\n26 |         workers.push(Worker::new(id, receiver));\n   |                                      ^^^^^^^^ value moved here, in previous iteration of loop\n   |\nnote: consider changing this parameter type in method `new` to borrow instead if owning the value isn't necessary\n  --> src/main.rs:12:33\n   |\n12 |     fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {\n   |        --- in this method       ^^^^^^^^^^^^^^^^^^^ this parameter takes ownership of the value\n\nFor more information about this error, try `rustc --explain E0382`.\nerror: could not compile `spot_receiver` (bin \"spot_receiver\") due to 1 previous error\n",
     "exit": 101,
     "dir": "~/rust-ch29/spot_receiver"
    }
   ]
  },
  "tokio_server.rs": {
   "src": "use std::time::{Duration, Instant};\nuse tokio::io::{AsyncBufReadExt, AsyncReadExt, AsyncWriteExt, BufReader};\nuse tokio::net::{TcpListener, TcpStream};\n\n#[tokio::main]\nasync fn main() {\n    let listener = TcpListener::bind(\"127.0.0.1:7878\").await.unwrap();\n    let diner1 = tokio::spawn(test_diner(\"/sleep\"));\n    let diner2 = tokio::spawn(async {\n        tokio::time::sleep(Duration::from_millis(100)).await; // arrives a moment later\n        test_diner(\"/\").await\n    });\n\n    for _ in 0..2 {\n        let (stream, _) = listener.accept().await.unwrap();\n        tokio::spawn(handle_connection(stream));\n    }\n\n    println!(\"diner 1 (stew):  {}\", diner1.await.unwrap());\n    println!(\"diner 2 (hello): {}\", diner2.await.unwrap());\n}\n\nasync fn handle_connection(mut stream: TcpStream) {\n    let mut buf_reader = BufReader::new(&mut stream);\n    let mut request_line = String::new();\n    buf_reader.read_line(&mut request_line).await.unwrap();\n    let request_line = request_line.trim_end().to_string();\n    println!(\"start  {request_line}\");\n\n    let (status_line, contents) = match &request_line[..] {\n        \"GET / HTTP/1.1\" => (\"HTTP/1.1 200 OK\", \"<h1>Welcome to Mabel's!</h1>\"),\n        \"GET /sleep HTTP/1.1\" => {\n            tokio::time::sleep(Duration::from_secs(1)).await;\n            (\"HTTP/1.1 200 OK\", \"<h1>Slow-cooked stew</h1>\")\n        }\n        _ => (\"HTTP/1.1 404 NOT FOUND\", \"<h1>Sorry, not on the menu</h1>\"),\n    };\n\n    let length = contents.len();\n    let response = format!(\"{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}\");\n    println!(\"ready  {request_line}\");\n    stream.write_all(response.as_bytes()).await.unwrap();\n}\n\n// The test diner plays the browser. It is not the server.\nasync fn test_diner(path: &str) -> String {\n    let start = Instant::now();\n    let mut stream = TcpStream::connect(\"127.0.0.1:7878\").await.unwrap();\n    let order = format!(\"GET {path} HTTP/1.1\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n\");\n    stream.write_all(order.as_bytes()).await.unwrap();\n    let mut reply = String::new();\n    stream.read_to_string(&mut reply).await.unwrap();\n    let status = reply.lines().next().unwrap().replace(\"HTTP/1.1 \", \"\");\n    format!(\"{status} after about {:.0} s\", start.elapsed().as_secs_f64())\n}\n",
   "stdout": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "start  GET /sleep HTTP/1.1\nstart  GET / HTTP/1.1\nready  GET / HTTP/1.1\nready  GET /sleep HTTP/1.1\ndiner 1 (stew):  200 OK after about 1 s\ndiner 2 (hello): 200 OK after about 0 s\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/tokio_server"
    }
   ]
  },
  "trace_one_cook.rs": {
   "src": "fn main() {\n    let orders = [(\"stew\", 3), (\"toast\", 1), (\"soup\", 2), (\"tea\", 1)];\n    let mut clock = 0;\n    for (dish, minutes) in orders {\n        let start = clock;\n        clock += minutes;\n        println!(\"{dish} {start} {clock}\");\n    }\n}\n",
   "stdout": "stew 0 3\ntoast 3 4\nsoup 4 6\ntea 6 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stew 0 3\ntoast 3 4\nsoup 4 6\ntea 6 7\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/trace_one_cook"
    }
   ]
  },
  "trace_two_cooks.rs": {
   "src": "fn main() {\n    let orders = [(\"stew\", 3), (\"toast\", 1), (\"soup\", 2), (\"tea\", 1)];\n    let mut free_at = [0, 0]; // the minute each cook is next free\n    for (dish, minutes) in orders {\n        let cook = if free_at[0] <= free_at[1] { 0 } else { 1 };\n        let start = free_at[cook];\n        free_at[cook] += minutes;\n        println!(\"{dish} {cook} {start} {}\", free_at[cook]);\n    }\n}\n",
   "stdout": "stew 0 0 3\ntoast 1 0 1\nsoup 1 1 3\ntea 0 3 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "stew 0 0 3\ntoast 1 0 1\nsoup 1 1 3\ntea 0 3 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/trace_two_cooks"
    }
   ]
  },
  "with_drop.rs": {
   "src": "use std::sync::{Arc, Mutex, mpsc};\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let pool = ThreadPool::new(1);\n    pool.execute(|| {\n        thread::sleep(Duration::from_millis(300));\n        println!(\"till counted: 42 coins\");\n    });\n    println!(\"main: closing time\");\n}\n\ntype Job = Box<dyn FnOnce() + Send + 'static>;\n\npub struct ThreadPool {\n    workers: Vec<Worker>,\n    sender: Option<mpsc::Sender<Job>>,\n}\n\nimpl ThreadPool {\n    pub fn new(size: usize) -> ThreadPool {\n        assert!(size > 0);\n        let (sender, receiver) = mpsc::channel();\n        let receiver = Arc::new(Mutex::new(receiver));\n        let mut workers = Vec::with_capacity(size);\n        for id in 0..size {\n            workers.push(Worker::new(id, Arc::clone(&receiver)));\n        }\n        ThreadPool { workers, sender: Some(sender) }\n    }\n\n    pub fn execute<F>(&self, f: F)\n    where\n        F: FnOnce() + Send + 'static,\n    {\n        let job = Box::new(f);\n        self.sender.as_ref().unwrap().send(job).unwrap();\n    }\n}\n\nimpl Drop for ThreadPool {\n    fn drop(&mut self) {\n        drop(self.sender.take());\n        for worker in self.workers.drain(..) {\n            println!(\"Shutting down worker {}\", worker.id);\n            worker.thread.join().unwrap();\n        }\n    }\n}\n\nstruct Worker {\n    id: usize,\n    thread: thread::JoinHandle<()>,\n}\n\nimpl Worker {\n    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {\n        let thread = thread::spawn(move || loop {\n            let message = receiver.lock().unwrap().recv();\n            match message {\n                Ok(job) => job(),\n                Err(_) => break,\n            }\n        });\n        Worker { id, thread }\n    }\n}\n",
   "stdout": "main: closing time\nShutting down worker 0\ntill counted: 42 coins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cargo run -q",
     "out": "main: closing time\nShutting down worker 0\ntill counted: 42 coins\n",
     "err": "",
     "exit": 0,
     "dir": "~/rust-ch29/with_drop"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
