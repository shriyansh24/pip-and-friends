/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "go",
  "capturedWith": [
   "Go 1.27.3",
   "Go 1.24.7"
  ],
  "primary": "Go 1.27.3",
  "date": "2026-11-08",
  "workdir": "/home/you/go-ch24",
  "versionDifferences": [
   "boss_err.go",
   "cheap.go",
   "close_twice.go",
   "direction_err.go",
   "fill_wggo.go",
   "negative.go",
   "nilchan.go",
   "order.go",
   "order_quick.go",
   "predict_slots.go",
   "range_noclose.go",
   "select_once.go",
   "select_random.go",
   "send_closed.go",
   "speed.go",
   "spot_closer.go",
   "spot_negative.go",
   "wg_basic.go",
   "wggo.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_err.go, cheap.go, close_twice.go, direction_err.go, fill_wggo.go, negative.go, nilchan.go, order.go, order_quick.go, predict_slots.go, range_noclose.go, select_once.go, select_random.go, send_closed.go, speed.go, spot_closer.go, spot_negative.go, wg_basic.go, wggo.go."
 },
 "programs": {
  "baton.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbaton := make(chan string)\n\tgo func() {\n\t\tbaton <- \"soup is ready\"\n\t}()\n\tmsg := <-baton\n\tfmt.Println(\"main got:\", msg)\n}\n",
   "stdout": "main got: soup is ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run baton.go",
     "out": "main got: soup is ready\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc report(in <-chan int) {\n\ttotal := 0\n\tfor v := range in {\n\t\ttotal += v\n\t}\n\tin <- total\n\tfmt.Println(total)\n}\n\nfunc main() {\n\tch := make(chan int)\n\tgo report(ch)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:10:2: invalid operation: cannot send to receive-only channel <-chan int in (variable of type <-chan int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:10:2: invalid operation: cannot send to receive-only channel <-chan int in (variable of type <-chan int)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_err.go:10:2: invalid operation: cannot send to receive-only channel in (variable of type <-chan int)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_err.go:10:2: invalid operation: cannot send to receive-only channel in (variable of type <-chan int)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc send(out chan<- string) {\n\tout <- \"hello\"\n\tclose(out)\n}\n\nfunc show(in <-chan string) {\n\tfor s := range in {\n\t\tfmt.Println(\"read\", s)\n\t}\n}\n\nfunc main() {\n\tch := make(chan string)\n\tgo send(ch)\n\tshow(ch)\n}\n",
   "stdout": "read hello\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "read hello\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tmail := make(chan string, 3)\n\tgo func() {\n\t\tmail <- \"card\"\n\t\tmail <- \"bill\"\n\t\tclose(mail)\n\t}()\n\tcount := 0\n\tfor m := range mail {\n\t\tcount++\n\t\tfmt.Println(count, m)\n\t}\n\tfmt.Println(\"delivered\", count)\n}\n",
   "stdout": "1 card\n2 bill\ndelivered 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "1 card\n2 bill\ndelivered 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc numbers(out chan<- int) {\n\tfor i := 1; i <= 4; i++ {\n\t\tout <- i\n\t}\n\tclose(out)\n}\n\nfunc double(in <-chan int, out chan<- int) {\n\tfor v := range in {\n\t\tout <- v * 2\n\t}\n\tclose(out)\n}\n\nfunc main() {\n\ta := make(chan int)\n\tb := make(chan int)\n\tgo numbers(a)\n\tgo double(a, b)\n\tsum := 0\n\tfor v := range b {\n\t\tsum += v\n\t}\n\tfmt.Println(\"sum\", sum)\n\t_, ok := <-b\n\tfmt.Println(\"open?\", ok)\n}\n",
   "stdout": "sum 20\nopen? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "sum 20\nopen? false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc chef(orders <-chan string, finished chan<- bool) {\n\tfor o := range orders {\n\t\tfmt.Println(\"cooking\", o)\n\t}\n\tfinished <- true\n}\n\nfunc main() {\n\torders := make(chan string)\n\tfinished := make(chan bool)\n\torders <- \"soup\"\n\tgo chef(orders, finished)\n\tclose(orders)\n\t<-finished\n\tfmt.Println(\"all orders cooked\")\n}\n",
   "stdout": "",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/boss_spot.go:15 +0x4e\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/boss_spot.go:15 +0x4e\nexit status 2\n",
     "exit": 1
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttray := make(chan string, 2)\n\tfor _, dish := range []string{\"soup\", \"pie\", \"tea\", \"jam\"} {\n\t\tselect {\n\t\tcase tray <- dish:\n\t\t\tfmt.Println(dish, \"tray\", len(tray))\n\t\tdefault:\n\t\t\tserved := <-tray\n\t\t\ttray <- dish\n\t\t\tfmt.Println(dish, \"swap\", served)\n\t\t}\n\t}\n}\n",
   "stdout": "soup tray 1\npie tray 2\ntea swap soup\njam swap pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "soup tray 1\npie tray 2\ntea swap soup\njam swap pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "buffered.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbox := make(chan string, 3)\n\tfmt.Println(\"empty:\", len(box), \"of\", cap(box))\n\tbox <- \"card\"\n\tbox <- \"bill\"\n\tbox <- \"parcel\"\n\tfmt.Println(\"full:\", len(box), \"of\", cap(box))\n\tfmt.Println(\"took\", <-box)\n\tfmt.Println(\"now:\", len(box), \"of\", cap(box))\n\tbox <- \"postcard\"\n\tfmt.Println(\"took\", <-box)\n\tfmt.Println(\"took\", <-box)\n\tfmt.Println(\"took\", <-box)\n\tfmt.Println(\"left:\", len(box), \"of\", cap(box))\n}\n",
   "stdout": "empty: 0 of 3\nfull: 3 of 3\ntook card\nnow: 2 of 3\ntook bill\ntook parcel\ntook postcard\nleft: 0 of 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run buffered.go",
     "out": "empty: 0 of 3\nfull: 3 of 3\ntook card\nnow: 2 of 3\ntook bill\ntook parcel\ntook postcard\nleft: 0 of 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cheap.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tconst n = 10000\n\tgot := make([]int, n)\n\tvar wg sync.WaitGroup\n\tfor i := range n {\n\t\twg.Go(func() {\n\t\t\tgot[i] = i + 1\n\t\t})\n\t}\n\twg.Wait()\n\ttotal := 0\n\tfor _, v := range got {\n\t\ttotal += v\n\t}\n\tfmt.Println(n, \"helpers, total\", total)\n}\n",
   "stdout": "10000 helpers, total 50005000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run cheap.go",
     "out": "10000 helpers, total 50005000\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./cheap.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run cheap.go",
      "out": "",
      "err": "# command-line-arguments\n./cheap.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "close_twice.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int)\n\tclose(ch)\n\tfmt.Println(\"closed once\")\n\tclose(ch)\n}\n",
   "stdout": "closed once\n",
   "stderr": "panic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x67\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run close_twice.go",
     "out": "closed once\n",
     "err": "panic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x67\nexit status 2\n",
     "exit": 1,
     "merged": "closed once\npanic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x67\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "closed once\n",
    "stderr": "panic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x68\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run close_twice.go",
      "out": "closed once\n",
      "err": "panic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x68\nexit status 2\n",
      "exit": 1,
      "merged": "closed once\npanic: close of closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/close_twice.go:9 +0x68\nexit status 2\n"
     }
    ]
   }
  },
  "closed.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int, 1)\n\tch <- 1\n\tclose(ch)\n\tv, ok := <-ch\n\tfmt.Println(v, ok)\n\tv, ok = <-ch\n\tfmt.Println(v, ok)\n}\n",
   "stdout": "1 true\n0 false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run closed.go",
     "out": "1 true\n0 false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cores.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n)\n\nfunc main() {\n\tfmt.Println(\"CPU cores:\", runtime.NumCPU())\n\tfmt.Println(\"GOMAXPROCS:\", runtime.GOMAXPROCS(0))\n\tfmt.Println(\"goroutines right now:\", runtime.NumGoroutine())\n}\n",
   "stdout": "CPU cores: 2\nGOMAXPROCS: 2\ngoroutines right now: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run cores.go",
     "out": "CPU cores: 2\nGOMAXPROCS: 2\ngoroutines right now: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "deadlock_send.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbaton := make(chan string)\n\tbaton <- \"soup is ready\"\n\tfmt.Println(\"sent!\")\n}\n",
   "stdout": "",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/deadlock_send.go:7 +0x28\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run deadlock_send.go",
     "out": "",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/deadlock_send.go:7 +0x28\nexit status 2\n",
     "exit": 1
    }
   ]
  },
  "direction.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc produce(out chan<- int) {\n\tfor i := 1; i <= 3; i++ {\n\t\tout <- i * i\n\t}\n\tclose(out)\n}\n\nfunc consume(in <-chan int) {\n\tfor v := range in {\n\t\tfmt.Println(\"got\", v)\n\t}\n}\n\nfunc main() {\n\tch := make(chan int)\n\tgo produce(ch)\n\tconsume(ch)\n}\n",
   "stdout": "got 1\ngot 4\ngot 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run direction.go",
     "out": "got 1\ngot 4\ngot 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "direction_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc produce(out chan<- int) {\n\tout <- 42\n\tfmt.Println(<-out)\n}\n\nfunc main() {\n\tch := make(chan int, 1)\n\tproduce(ch)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./direction_err.go:7:16: invalid operation: cannot receive from send-only channel chan<- int out (variable of type chan<- int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run direction_err.go",
     "out": "",
     "err": "# command-line-arguments\n./direction_err.go:7:16: invalid operation: cannot receive from send-only channel chan<- int out (variable of type chan<- int)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./direction_err.go:7:16: invalid operation: cannot receive from send-only channel out (variable of type chan<- int)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run direction_err.go",
      "out": "",
      "err": "# command-line-arguments\n./direction_err.go:7:16: invalid operation: cannot receive from send-only channel out (variable of type chan<- int)\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_close.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc countdown(out chan<- int) {\n\tfor n := 3; n >= 1; n-- {\n\t\tout <- n\n\t}\n\tclose(out)\n}\n\nfunc main() {\n\tch := make(chan int)\n\tgo countdown(ch)\n\tfor n := range ch {\n\t\tfmt.Println(n)\n\t}\n\tfmt.Println(\"liftoff\")\n}\n",
   "stdout": "3\n2\n1\nliftoff\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_close.go",
     "out": "3\n2\n1\nliftoff\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_wggo.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tprices := []int{4, 9, 2}\n\tdoubled := make([]int, len(prices))\n\tvar wg sync.WaitGroup\n\tfor i, p := range prices {\n\t\twg.Go(func() {\n\t\t\tdoubled[i] = p * 2\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(doubled)\n}\n",
   "stdout": "[8 18 4]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_wggo.go",
     "out": "[8 18 4]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./fill_wggo.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run fill_wggo.go",
      "out": "",
      "err": "# command-line-arguments\n./fill_wggo.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "handoff.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbaton := make(chan string)\n\tgo func() {\n\t\tbaton <- \"soup\"\n\t\tbaton <- \"salad\"\n\t}()\n\tfmt.Println(\"main: ready for the baton\")\n\tfmt.Println(\"main got\", <-baton)\n\tfmt.Println(\"main got\", <-baton)\n\tfmt.Println(\"finish line\")\n}\n",
   "stdout": "main: ready for the baton\nmain got soup\nmain got salad\nfinish line\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run handoff.go",
     "out": "main: ready for the baton\nmain got soup\nmain got salad\nfinish line\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "helpers_chan.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc cook(minutes int, done chan int) {\n\tdone <- minutes * 2\n}\n\nfunc main() {\n\tdone := make(chan int)\n\tgo cook(3, done)\n\tgo cook(5, done)\n\tgo cook(1, done)\n\ttotal := 0\n\tfor range 3 {\n\t\ttotal += <-done\n\t}\n\tfmt.Println(\"total minutes:\", total)\n}\n",
   "stdout": "total minutes: 18\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run helpers_chan.go",
     "out": "total minutes: 18\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "missing_wait.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor _, dish := range []string{\"soup\", \"salad\", \"pie\"} {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(\"helper finished\", dish)\n\t\t}()\n\t}\n\tfmt.Println(\"all dishes ready\")\n}\n",
   "stdout": "all dishes ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run missing_wait.go",
     "out": "all dishes ready\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true
  },
  "negative.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\twg.Add(1)\n\twg.Done()\n\tfmt.Println(\"one helper signed off\")\n\twg.Done()\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "one helper signed off\n",
   "stderr": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x2b1a62506020, 0xffffffffffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:118 +0x23a\nsync.(*WaitGroup).Done(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:156\nmain.main()\n\t/home/you/go-ch24/negative.go:13 +0x97\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run negative.go",
     "out": "one helper signed off\n",
     "err": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x2b1a62506020, 0xffffffffffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:118 +0x23a\nsync.(*WaitGroup).Done(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:156\nmain.main()\n\t/home/you/go-ch24/negative.go:13 +0x97\nexit status 2\n",
     "exit": 1,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "one helper signed off\n",
    "stderr": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x4da2a8?, 0xc00003c028?)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:64 +0xcd\nsync.(*WaitGroup).Done(...)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:89\nmain.main()\n\t/home/you/go-ch24/negative.go:13 +0x89\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run negative.go",
      "out": "one helper signed off\n",
      "err": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x4da2a8?, 0xc00003c028?)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:64 +0xcd\nsync.(*WaitGroup).Done(...)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:89\nmain.main()\n\t/home/you/go-ch24/negative.go:13 +0x89\nexit status 2\n",
      "exit": 1,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "nilchan.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar ch chan int\n\tfmt.Println(ch == nil)\n\t<-ch\n}\n",
   "stdout": "true\n",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4e\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nilchan.go",
     "out": "true\n",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4e\nexit status 2\n",
     "exit": 1,
     "merged": "true\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4e\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "true\n",
    "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4f\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run nilchan.go",
      "out": "true\n",
      "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4f\nexit status 2\n",
      "exit": 1,
      "merged": "true\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive (nil chan)]:\nmain.main()\n\t/home/you/go-ch24/nilchan.go:8 +0x4f\nexit status 2\n"
     }
    ]
   }
  },
  "nonblock.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbox := make(chan string, 1)\n\tselect {\n\tcase m := <-box:\n\t\tfmt.Println(\"got\", m)\n\tdefault:\n\t\tfmt.Println(\"no mail, keep going\")\n\t}\n\tbox <- \"postcard\"\n\tselect {\n\tcase m := <-box:\n\t\tfmt.Println(\"got\", m)\n\tdefault:\n\t\tfmt.Println(\"no mail, keep going\")\n\t}\n}\n",
   "stdout": "no mail, keep going\ngot postcard\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nonblock.go",
     "out": "no mail, keep going\ngot postcard\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nothing.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tgo fmt.Println(\"from goroutine\")\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nothing.go",
     "out": "",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true
  },
  "order.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc chop(n int) int {\n\tsum := 0\n\tfor k := range n {\n\t\tsum += k % 7\n\t}\n\treturn sum\n}\n\nfunc main() {\n\tfor round := 1; round <= 4; round++ {\n\t\tvar wg sync.WaitGroup\n\t\tfmt.Print(\"round \", round, \": \")\n\t\tfor i := range 5 {\n\t\t\twg.Go(func() {\n\t\t\t\tchop(2000000)\n\t\t\t\tfmt.Print(i, \" \")\n\t\t\t})\n\t\t}\n\t\twg.Wait()\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "round 1: 4 0 2 1 3 \nround 2: 4 1 2 0 3 \nround 3: 4 0 1 2 3 \nround 4: 4 1 0 2 3 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order.go",
     "out": "round 1: 4 0 2 1 3 \nround 2: 4 1 2 0 3 \nround 3: 4 0 1 2 3 \nround 4: 4 1 0 2 3 \n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./order.go:21:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run order.go",
      "out": "",
      "err": "# command-line-arguments\n./order.go:21:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "order_quick.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tfor round := 1; round <= 4; round++ {\n\t\tvar wg sync.WaitGroup\n\t\tfmt.Print(\"round \", round, \": \")\n\t\tfor i := range 5 {\n\t\t\twg.Go(func() {\n\t\t\t\tfmt.Print(i, \" \") // no chopping: each helper is tiny\n\t\t\t})\n\t\t}\n\t\twg.Wait()\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "round 1: 4 0 1 2 3 \nround 2: 4 0 1 2 3 \nround 3: 4 0 1 2 3 \nround 4: 4 0 1 2 3 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order_quick.go",
     "out": "round 1: 4 0 1 2 3 \nround 2: 4 0 1 2 3 \nround 3: 4 0 1 2 3 \nround 4: 4 0 1 2 3 \n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./order_quick.go:13:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run order_quick.go",
      "out": "",
      "err": "# command-line-arguments\n./order_quick.go:13:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "overfull.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbox := make(chan string, 3)\n\tbox <- \"card\"\n\tbox <- \"bill\"\n\tbox <- \"parcel\"\n\tfmt.Println(\"three in the box\")\n\tbox <- \"postcard\"\n\tfmt.Println(\"four in the box\")\n}\n",
   "stdout": "three in the box\n",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/overfull.go:11 +0xa5\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run overfull.go",
     "out": "three in the box\n",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/overfull.go:11 +0xa5\nexit status 2\n",
     "exit": 1,
     "merged": "three in the box\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/overfull.go:11 +0xa5\nexit status 2\n"
    }
   ]
  },
  "parsons_timeout.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\treply := make(chan string)\n\tgo func() {\n\t\ttime.Sleep(400 * time.Millisecond)\n\t\treply <- \"pizza\"\n\t}()\n\tselect {\n\tcase food := <-reply:\n\t\tfmt.Println(\"served\", food)\n\tcase <-time.After(100 * time.Millisecond):\n\t\tfmt.Println(\"too slow, ordering elsewhere\")\n\t}\n}\n",
   "stdout": "too slow, ordering elsewhere\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_timeout.go",
     "out": "too slow, ordering elsewhere\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_wg.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tsquares := make([]int, 4)\n\tfor i := range 4 {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tsquares[i] = i * i\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(squares)\n}\n",
   "stdout": "[0 1 4 9]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_wg.go",
     "out": "[0 1 4 9]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_wg_alt.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tsquares := make([]int, 4)\n\tfor i := range 4 {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tsquares[i] = i * i\n\t\t\tdefer wg.Done()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(squares)\n}\n",
   "stdout": "[0 1 4 9]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_wg_alt.go",
     "out": "[0 1 4 9]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_closed.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan string, 2)\n\tch <- \"card\"\n\tclose(ch)\n\ta, ok1 := <-ch\n\tb, ok2 := <-ch\n\tfmt.Printf(\"%q %v\\n\", a, ok1)\n\tfmt.Printf(\"%q %v\\n\", b, ok2)\n\tfmt.Println(len(ch))\n}\n",
   "stdout": "\"card\" true\n\"\" false\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_closed.go",
     "out": "\"card\" true\n\"\" false\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_deadlock.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\torders := make(chan string, 2)\n\torders <- \"soup\"\n\torders <- \"salad\"\n\torders <- \"pie\"\n\tfmt.Println(<-orders)\n}\n",
   "stdout": "",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/predict_deadlock.go:9 +0x58\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run predict_deadlock.go",
     "out": "",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n\t/home/you/go-ch24/predict_deadlock.go:9 +0x58\nexit status 2\n",
     "exit": 1
    }
   ]
  },
  "predict_nonblock.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbox := make(chan int, 1)\n\tfor i := 1; i <= 3; i++ {\n\t\tselect {\n\t\tcase box <- i:\n\t\t\tfmt.Println(\"posted\", i)\n\t\tdefault:\n\t\t\tfmt.Println(\"full, skipped\", i)\n\t\t}\n\t}\n\tfmt.Println(\"in the box:\", <-box)\n}\n",
   "stdout": "posted 1\nfull, skipped 2\nfull, skipped 3\nin the box: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_nonblock.go",
     "out": "posted 1\nfull, skipped 2\nfull, skipped 3\nin the box: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_range.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttips := make(chan int, 3)\n\ttips <- 5\n\ttips <- 2\n\ttips <- 8\n\tclose(tips)\n\ttotal := 0\n\tfor t := range tips {\n\t\ttotal += t\n\t\tfmt.Println(\"tip\", t, \"total\", total)\n\t}\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "tip 5 total 5\ntip 2 total 7\ntip 8 total 15\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_range.go",
     "out": "tip 5 total 5\ntip 2 total 7\ntip 8 total 15\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_slots.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\twords := []string{\"go\", \"chef\", \"pasta\"}\n\tsizes := make([]int, len(words))\n\tvar wg sync.WaitGroup\n\tfor i, w := range words {\n\t\twg.Go(func() {\n\t\t\tsizes[i] = len(w)\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(sizes, len(words))\n}\n",
   "stdout": "[2 4 5] 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_slots.go",
     "out": "[2 4 5] 3\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./predict_slots.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run predict_slots.go",
      "out": "",
      "err": "# command-line-arguments\n./predict_slots.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "range_noclose.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tmail := make(chan string)\n\tgo func() {\n\t\tfor _, m := range []string{\"card\", \"bill\", \"parcel\"} {\n\t\t\tmail <- m\n\t\t}\n\t}()\n\tfor m := range mail {\n\t\tfmt.Println(\"delivered:\", m)\n\t}\n\tfmt.Println(\"no more mail\")\n}\n",
   "stdout": "delivered: card\ndelivered: bill\ndelivered: parcel\n",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xf8\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run range_noclose.go",
     "out": "delivered: card\ndelivered: bill\ndelivered: parcel\n",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xf8\nexit status 2\n",
     "exit": 1,
     "merged": "delivered: card\ndelivered: bill\ndelivered: parcel\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xf8\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "delivered: card\ndelivered: bill\ndelivered: parcel\n",
    "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xe7\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run range_noclose.go",
      "out": "delivered: card\ndelivered: bill\ndelivered: parcel\n",
      "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xe7\nexit status 2\n",
      "exit": 1,
      "merged": "delivered: card\ndelivered: bill\ndelivered: parcel\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch24/range_noclose.go:12 +0xe7\nexit status 2\n"
     }
    ]
   }
  },
  "rangech.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tmail := make(chan string)\n\tgo func() {\n\t\tfor _, m := range []string{\"card\", \"bill\", \"parcel\"} {\n\t\t\tmail <- m\n\t\t}\n\t\tclose(mail)\n\t}()\n\tfor m := range mail {\n\t\tfmt.Println(\"delivered:\", m)\n\t}\n\tfmt.Println(\"no more mail\")\n}\n",
   "stdout": "delivered: card\ndelivered: bill\ndelivered: parcel\nno more mail\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run rangech.go",
     "out": "delivered: card\ndelivered: bill\ndelivered: parcel\nno more mail\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "recv_m.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\topen := make(chan int, 1)\n\topen <- 7\n\tv, ok := <-open\n\tfmt.Println(v, ok)\n\n\tleftover := make(chan int, 1)\n\tleftover <- 5\n\tclose(leftover)\n\tv, ok = <-leftover\n\tfmt.Println(v, ok)\n\n\tempty := make(chan int)\n\tclose(empty)\n\tv, ok = <-empty\n\tfmt.Println(v, ok)\n\n\twords := make(chan string)\n\tclose(words)\n\tw, ok := <-words\n\tfmt.Printf(\"%q %v\\n\", w, ok)\n}\n",
   "stdout": "7 true\n5 true\n0 false\n\"\" false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run recv_m.go",
     "out": "7 true\n5 true\n0 false\n\"\" false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "select_once.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := make(chan string, 1)\n\tb := make(chan string, 1)\n\ta <- \"apple\"\n\tb <- \"banana\"\n\tselect {\n\tcase x := <-a:\n\t\tfmt.Println(x)\n\tcase y := <-b:\n\t\tfmt.Println(y)\n\t}\n}\n",
   "stdout": "apple\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run select_once.go",
     "out": "apple\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "banana\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run select_once.go",
      "out": "banana\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "select_random.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor run := 1; run <= 3; run++ {\n\t\ta := make(chan byte, 10)\n\t\tb := make(chan byte, 10)\n\t\tfor range 10 {\n\t\t\ta <- 'a'\n\t\t\tb <- 'b'\n\t\t}\n\t\tline := \"\"\n\t\tfor range 10 {\n\t\t\tselect {\n\t\t\tcase c := <-a:\n\t\t\t\tline += string(c)\n\t\t\tcase c := <-b:\n\t\t\t\tline += string(c)\n\t\t\t}\n\t\t}\n\t\tfmt.Println(\"run\", run, line)\n\t}\n}\n",
   "stdout": "run 1 baabaaabaa\nrun 2 bbbaaaaaaa\nrun 3 abaabbaaba\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run select_random.go",
     "out": "run 1 baabaaabaa\nrun 2 bbbaaaaaaa\nrun 3 abaabbaaba\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "run 1 babbbabbba\nrun 2 bbabbbbbbb\nrun 3 bbbaaabbbb\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run select_random.go",
      "out": "run 1 babbbabbba\nrun 2 bbabbbbbbb\nrun 3 bbbaaabbbb\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "select_two.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tsoup := make(chan string)\n\tbread := make(chan string)\n\tgo func() {\n\t\tsoup <- \"tomato soup\"\n\t\tbread <- \"rye bread\"\n\t}()\n\tfor range 2 {\n\t\tselect {\n\t\tcase s := <-soup:\n\t\t\tfmt.Println(\"from the soup door:\", s)\n\t\tcase b := <-bread:\n\t\t\tfmt.Println(\"from the bread door:\", b)\n\t\t}\n\t}\n}\n",
   "stdout": "from the soup door: tomato soup\nfrom the bread door: rye bread\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run select_two.go",
     "out": "from the soup door: tomato soup\nfrom the bread door: rye bread\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "send_closed.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int, 2)\n\tch <- 1\n\tclose(ch)\n\tfmt.Println(\"closed the mailbox\")\n\tch <- 2\n}\n",
   "stdout": "closed the mailbox\n",
   "stderr": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8d\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run send_closed.go",
     "out": "closed the mailbox\n",
     "err": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8d\nexit status 2\n",
     "exit": 1,
     "merged": "closed the mailbox\npanic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8d\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "closed the mailbox\n",
    "stderr": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8e\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run send_closed.go",
      "out": "closed the mailbox\n",
      "err": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8e\nexit status 2\n",
      "exit": 1,
      "merged": "closed the mailbox\npanic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/send_closed.go:10 +0x8e\nexit status 2\n"
     }
    ]
   }
  },
  "sequential.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc cook(dish string) {\n\tfmt.Println(\"chopping for\", dish)\n\tfmt.Println(\"plating\", dish)\n}\n\nfunc main() {\n\tcook(\"soup\")\n\tcook(\"salad\")\n\tcook(\"pie\")\n\tfmt.Println(\"kitchen closed\")\n}\n",
   "stdout": "chopping for soup\nplating soup\nchopping for salad\nplating salad\nchopping for pie\nplating pie\nkitchen closed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sequential.go",
     "out": "chopping for soup\nplating soup\nchopping for salad\nplating salad\nchopping for pie\nplating pie\nkitchen closed\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "slots.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tdishes := []string{\"soup\", \"salad\", \"pie\"}\n\tready := make([]string, len(dishes))\n\tvar wg sync.WaitGroup\n\tfor i, d := range dishes {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tready[i] = d + \" ✓\"\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(ready)\n}\n",
   "stdout": "[soup ✓ salad ✓ pie ✓]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run slots.go",
     "out": "[soup ✓ salad ✓ pie ✓]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "speed.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\nfunc cook() { time.Sleep(300 * time.Millisecond) }\n\nfunc main() {\n\tstart := time.Now()\n\tcook()\n\tcook()\n\tcook()\n\tfmt.Println(\"one cook, three dishes:\", time.Since(start).Round(100*time.Millisecond))\n\n\tstart = time.Now()\n\tvar wg sync.WaitGroup\n\tfor range 3 {\n\t\twg.Go(cook)\n\t}\n\twg.Wait()\n\tfmt.Println(\"three helpers, three dishes:\", time.Since(start).Round(100*time.Millisecond))\n}\n",
   "stdout": "one cook, three dishes: 900ms\nthree helpers, three dishes: 300ms\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run speed.go",
     "out": "one cook, three dishes: 900ms\nthree helpers, three dishes: 300ms\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./speed.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run speed.go",
      "out": "",
      "err": "# command-line-arguments\n./speed.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_closer.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc taster(dishes chan string, done chan bool) {\n\tfmt.Println(\"tasted\", <-dishes)\n\tclose(dishes)\n\tdone <- true\n}\n\nfunc main() {\n\tdishes := make(chan string)\n\tdone := make(chan bool)\n\tgo taster(dishes, done)\n\tdishes <- \"soup\"\n\t<-done\n\tdishes <- \"stew\"\n\tfmt.Println(\"served\")\n}\n",
   "stdout": "tasted soup\n",
   "stderr": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xc5\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_closer.go",
     "out": "tasted soup\n",
     "err": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xc5\nexit status 2\n",
     "exit": 1,
     "merged": "tasted soup\npanic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xc5\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "tasted soup\n",
    "stderr": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xb9\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run spot_closer.go",
      "out": "tasted soup\n",
      "err": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xb9\nexit status 2\n",
      "exit": 1,
      "merged": "tasted soup\npanic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch24/spot_closer.go:17 +0xb9\nexit status 2\n"
     }
    ]
   }
  },
  "spot_negative.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nvar clipboard sync.WaitGroup\n\nfunc signOff(name string) {\n\tfmt.Println(name, \"signs off\")\n\tclipboard.Done()\n}\n\nfunc main() {\n\tclipboard.Add(2)\n\tsignOff(\"Ada\")\n\tsignOff(\"Bo\")\n\tsignOff(\"Cy\")\n\tclipboard.Wait()\n\tfmt.Println(\"kitchen closed\")\n}\n",
   "stdout": "Ada signs off\nBo signs off\nCy signs off\n",
   "stderr": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x596200, 0xffffffffffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:118 +0x23a\nsync.(*WaitGroup).Done(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:156\nmain.signOff({0x49b012?, 0x2?})\n\t/home/you/go-ch24/spot_negative.go:12 +0x7b\nmain.main()\n\t/home/you/go-ch24/spot_negative.go:19 +0x58\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_negative.go",
     "out": "Ada signs off\nBo signs off\nCy signs off\n",
     "err": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x596200, 0xffffffffffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:118 +0x23a\nsync.(*WaitGroup).Done(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:156\nmain.signOff({0x49b012?, 0x2?})\n\t/home/you/go-ch24/spot_negative.go:12 +0x7b\nmain.main()\n\t/home/you/go-ch24/spot_negative.go:19 +0x58\nexit status 2\n",
     "exit": 1,
     "merged": "Ada signs off\nBo signs off\nCy signs off\npanic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x596200, 0xffffffffffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:118 +0x23a\nsync.(*WaitGroup).Done(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:156\nmain.signOff({0x49b012?, 0x2?})\n\t/home/you/go-ch24/spot_negative.go:12 +0x7b\nmain.main()\n\t/home/you/go-ch24/spot_negative.go:19 +0x58\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Ada signs off\nBo signs off\nCy signs off\n",
    "stderr": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x4da158?, 0xc00008e020?)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:64 +0xcd\nsync.(*WaitGroup).Done(...)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:89\nmain.signOff({0x4b3bcd?, 0x68?})\n\t/home/you/go-ch24/spot_negative.go:12 +0x7b\nmain.main()\n\t/home/you/go-ch24/spot_negative.go:19 +0x58\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run spot_negative.go",
      "out": "Ada signs off\nBo signs off\nCy signs off\n",
      "err": "panic: sync: negative WaitGroup counter\n\ngoroutine 1 [running]:\nsync.(*WaitGroup).Add(0x4da158?, 0xc00008e020?)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:64 +0xcd\nsync.(*WaitGroup).Done(...)\n\t/usr/local/go1.24.7/src/sync/waitgroup.go:89\nmain.signOff({0x4b3bcd?, 0x68?})\n\t/home/you/go-ch24/spot_negative.go:12 +0x7b\nmain.main()\n\t/home/you/go-ch24/spot_negative.go:19 +0x58\nexit status 2\n",
      "exit": 1,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "timeout.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc slowCook(d time.Duration) chan string {\n\tout := make(chan string, 1)\n\tgo func() {\n\t\ttime.Sleep(d)\n\t\tout <- \"stew\"\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tselect {\n\tcase dish := <-slowCook(500 * time.Millisecond):\n\t\tfmt.Println(\"served\", dish)\n\tcase <-time.After(50 * time.Millisecond):\n\t\tfmt.Println(\"timed out: order cancelled\")\n\t}\n\tselect {\n\tcase dish := <-slowCook(20 * time.Millisecond):\n\t\tfmt.Println(\"served\", dish)\n\tcase <-time.After(1 * time.Second):\n\t\tfmt.Println(\"timed out: order cancelled\")\n\t}\n}\n",
   "stdout": "timed out: order cancelled\nserved stew\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run timeout.go",
     "out": "timed out: order cancelled\nserved stew\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_box.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbox := make(chan int, 3)\n\tbox <- 10\n\tfmt.Println(\"send\", 10, len(box))\n\tbox <- 20\n\tfmt.Println(\"send\", 20, len(box))\n\tv := <-box\n\tfmt.Println(\"recv\", v, len(box))\n\tbox <- 30\n\tfmt.Println(\"send\", 30, len(box))\n\tv = <-box\n\tfmt.Println(\"recv\", v, len(box))\n\tv = <-box\n\tfmt.Println(\"recv\", v, len(box))\n}\n",
   "stdout": "send 10 1\nsend 20 2\nrecv 10 1\nsend 30 2\nrecv 20 1\nrecv 30 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_box.go",
     "out": "send 10 1\nsend 20 2\nrecv 10 1\nsend 30 2\nrecv 20 1\nrecv 30 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_relay.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbaton := make(chan int)\n\tgo func() {\n\t\tfor _, n := range []int{4, 1, 6, 2} {\n\t\t\tbaton <- n\n\t\t}\n\t\tclose(baton)\n\t}()\n\ttotal := 0\n\tfor n := range baton {\n\t\ttotal += n\n\t\tfmt.Println(n, total)\n\t}\n}\n",
   "stdout": "4 4\n1 5\n6 11\n2 13\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_relay.go",
     "out": "4 4\n1 5\n6 11\n2 13\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wg_basic.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor _, dish := range []string{\"soup\", \"salad\", \"pie\"} {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(\"helper finished\", dish)\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(\"all dishes ready\")\n}\n",
   "stdout": "helper finished soup\nhelper finished salad\nhelper finished pie\nall dishes ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wg_basic.go",
     "out": "helper finished soup\nhelper finished salad\nhelper finished pie\nall dishes ready\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "helper finished pie\nhelper finished soup\nhelper finished salad\nall dishes ready\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run wg_basic.go",
      "out": "helper finished pie\nhelper finished soup\nhelper finished salad\nall dishes ready\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "wggo.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\torders := []int{3, 1, 4}\n\tplates := make([]int, len(orders))\n\tvar wg sync.WaitGroup\n\tfor i, n := range orders {\n\t\twg.Go(func() {\n\t\t\tplates[i] = n * 10\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"plates:\", plates)\n}\n",
   "stdout": "plates: [30 10 40]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wggo.go",
     "out": "plates: [30 10 40]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./wggo.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run wggo.go",
      "out": "",
      "err": "# command-line-arguments\n./wggo.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
