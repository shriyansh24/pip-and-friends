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
  "workdir": "/home/you/go-ch25",
  "versionDifferences": [
   "atomic_count.go",
   "boss_err.go",
   "boss_fill.go",
   "boss_parsons.go",
   "boss_predict.go",
   "boss_spot.go",
   "boss_trace.go",
   "chan_counter.go",
   "copy_fixed.go",
   "copy_lock.go",
   "copy_vet.go",
   "errgroup.go",
   "fanin.go",
   "fill_atomic.go",
   "fill_lock.go",
   "fill_sem.go",
   "forgot_unlock.go",
   "keyhook.go",
   "leakprof.go",
   "map_fixed.go",
   "map_writes.go",
   "mutex_count.go",
   "once.go",
   "parsons_pool.go",
   "pool_m.go",
   "predict_mutex.go",
   "predict_pool.go",
   "race.go",
   "race_count.go",
   "rwmutex.go",
   "safe_counter.go",
   "semaphore.go",
   "tally_vet.go",
   "unlock_twice.go",
   "workers.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): atomic_count.go, boss_err.go, boss_fill.go, boss_parsons.go, boss_predict.go, boss_spot.go, boss_trace.go, chan_counter.go, copy_fixed.go, copy_lock.go, copy_vet.go, errgroup.go, fanin.go, fill_atomic.go, fill_lock.go, fill_sem.go, forgot_unlock.go, keyhook.go, leakprof.go, map_fixed.go, map_writes.go, mutex_count.go, once.go, parsons_pool.go, pool_m.go, predict_mutex.go, predict_pool.go, race.go, race_count.go, rwmutex.go, safe_counter.go, semaphore.go, tally_vet.go, unlock_twice.go, workers.go."
 },
 "programs": {
  "atomic_count.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"sync/atomic\"\n)\n\nfunc main() {\n\tvar count atomic.Int64\n\tvar wg sync.WaitGroup\n\tfor range 1000 {\n\t\twg.Go(func() {\n\t\t\tcount.Add(1)\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"count =\", count.Load())\n}\n",
   "stdout": "count = 1000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atomic_count.go",
     "out": "count = 1000\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./atomic_count.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run atomic_count.go",
      "out": "",
      "err": "# command-line-arguments\n./atomic_count.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "atomic_err.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync/atomic\"\n)\n\nfunc main() {\n\tvar count atomic.Int64\n\tcount++\n\tfmt.Println(count.Load())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./atomic_err.go:10:2: invalid operation: count++ (non-numeric type \"sync/atomic\".Int64)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run atomic_err.go",
     "out": "",
     "err": "# command-line-arguments\n./atomic_err.go:10:2: invalid operation: count++ (non-numeric type \"sync/atomic\".Int64)\n",
     "exit": 1
    }
   ]
  },
  "atomic_more.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync/atomic\"\n)\n\nfunc main() {\n\tvar open atomic.Bool\n\tvar parcels atomic.Int64\n\n\topen.Store(true)\n\tparcels.Add(5)\n\tparcels.Add(-2)\n\tfmt.Println(open.Load(), parcels.Load())\n\n\told := parcels.Swap(10)\n\tfmt.Println(\"swap:\", old, parcels.Load())\n\n\tok := parcels.CompareAndSwap(10, 11)\n\tfmt.Println(\"CAS 10->11:\", ok, parcels.Load())\n\tok = parcels.CompareAndSwap(10, 12)\n\tfmt.Println(\"CAS 10->12:\", ok, parcels.Load())\n}\n",
   "stdout": "true 3\nswap: 3 10\nCAS 10->11: true 11\nCAS 10->12: false 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atomic_more.go",
     "out": "true 3\nswap: 3 10\nCAS 10->11: true 11\nCAS 10->12: false 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc shout(in <-chan string) {\n\tfor s := range in {\n\t\tfmt.Println(s + \"!\")\n\t}\n\tin <- \"done\"\n}\n\nfunc main() {\n\tin := make(chan string, 1)\n\tin <- \"hi\"\n\tclose(in)\n\tshout(in)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:9:2: invalid operation: cannot send to receive-only channel <-chan string in (variable of type <-chan string)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:9:2: invalid operation: cannot send to receive-only channel <-chan string in (variable of type <-chan string)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_err.go:9:2: invalid operation: cannot send to receive-only channel in (variable of type <-chan string)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_err.go:9:2: invalid operation: cannot send to receive-only channel in (variable of type <-chan string)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Config struct {\n\tonce  sync.Once\n\tmu    sync.RWMutex\n\tspeed int\n}\n\nfunc (c *Config) Speed() int {\n\tc.once.Do(func() { c.speed = 25 })\n\tc.mu.RLock()\n\tdefer c.mu.RUnlock()\n\treturn c.speed\n}\n\nfunc main() {\n\tvar c Config\n\tvar wg sync.WaitGroup\n\tgot := make([]int, 3)\n\tfor i := range 3 {\n\t\twg.Go(func() { got[i] = c.Speed() })\n\t}\n\twg.Wait()\n\tfmt.Println(got)\n}\n",
   "stdout": "[25 25 25]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "[25 25 25]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_fill.go:26:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_fill.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_fill.go:26:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n\t\"sync\"\n)\n\nfunc merge(a, b <-chan int) <-chan int {\n\tout := make(chan int)\n\tvar wg sync.WaitGroup\n\tfor _, c := range []<-chan int{a, b} {\n\t\twg.Go(func() {\n\t\t\tfor v := range c {\n\t\t\t\tout <- v\n\t\t\t}\n\t\t})\n\t}\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(out)\n\t}()\n\treturn out\n}\n\nfunc main() {\n\ta, b := make(chan int, 2), make(chan int, 2)\n\ta <- 1\n\ta <- 3\n\tb <- 2\n\tb <- 4\n\tclose(a)\n\tclose(b)\n\tvar got []int\n\tfor v := range merge(a, b) {\n\t\tgot = append(got, v)\n\t}\n\tslices.Sort(got)\n\tfmt.Println(got)\n}\n",
   "stdout": "[1 2 3 4]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "[1 2 3 4]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_parsons.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_parsons.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_parsons.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_predict.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"sync/atomic\"\n)\n\nfunc source(n int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor i := 1; i <= n; i++ {\n\t\t\tout <- i\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc odds(in <-chan int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := range in {\n\t\t\tif n%2 == 1 {\n\t\t\t\tout <- n\n\t\t\t}\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tvar total atomic.Int64\n\tbelt := odds(source(7))\n\tvar wg sync.WaitGroup\n\tfor range 3 {\n\t\twg.Go(func() {\n\t\t\tfor n := range belt {\n\t\t\t\ttotal.Add(int64(n * n))\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"total:\", total.Load())\n}\n",
   "stdout": "total: 84\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "total: 84\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_predict.go:38:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_predict.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_predict.go:38:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_spot.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Box struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc main() {\n\tboxes := make([]Box, 3)\n\tvar wg sync.WaitGroup\n\tfor _, b := range boxes {\n\t\twg.Go(func() {\n\t\t\tb.mu.Lock()\n\t\t\tb.n++\n\t\t\tb.mu.Unlock()\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(boxes[0].n, boxes[1].n, boxes[2].n)\n}\n",
   "stdout": "0 0 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "0 0 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_spot.go:17:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_spot.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_spot.go:17:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n\t\"sync\"\n)\n\nfunc main() {\n\torders := []string{\"Oslo\", \"Rome\", \"Oslo\", \"Lima\", \"Oslo\", \"Rome\"}\n\tjobs := make(chan string, len(orders))\n\tfor _, o := range orders {\n\t\tjobs <- o\n\t}\n\tclose(jobs)\n\n\tvar mu sync.Mutex\n\tcount := map[string]int{}\n\tvar wg sync.WaitGroup\n\tfor range 3 {\n\t\twg.Go(func() {\n\t\t\tfor town := range jobs {\n\t\t\t\tmu.Lock()\n\t\t\t\tcount[town]++\n\t\t\t\tmu.Unlock()\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\n\tfor _, town := range slices.Sorted(maps.Keys(count)) {\n\t\tfmt.Println(town, count[town], count[town]*4)\n\t}\n}\n",
   "stdout": "Lima 1 4\nOslo 3 12\nRome 2 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "Lima 1 4\nOslo 3 12\nRome 2 8\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_trace.go:22:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_trace.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_trace.go:22:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "chan_counter.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tplus := make(chan int)\n\tdone := make(chan int)\n\n\t// One goroutine owns the count. Nobody else touches it.\n\tgo func() {\n\t\tcount := 0\n\t\tfor n := range plus {\n\t\t\tcount += n\n\t\t}\n\t\tdone <- count\n\t}()\n\n\tvar wg sync.WaitGroup\n\tfor range 1000 {\n\t\twg.Go(func() {\n\t\t\tplus <- 1 // don't share the note: send it!\n\t\t})\n\t}\n\twg.Wait()\n\tclose(plus)\n\tfmt.Println(\"count =\", <-done)\n}\n",
   "stdout": "count = 1000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run chan_counter.go",
     "out": "count = 1000\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./chan_counter.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run chan_counter.go",
      "out": "",
      "err": "# command-line-arguments\n./chan_counter.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "copy_fixed.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c *Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc main() {\n\tvar c Counter\n\tvar wg sync.WaitGroup\n\tfor range 100 {\n\t\twg.Go(func() {\n\t\t\tc.Inc()\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"count =\", c.n)\n}\n",
   "stdout": "count = 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy_fixed.go",
     "out": "count = 100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./copy_fixed.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run copy_fixed.go",
      "out": "",
      "err": "# command-line-arguments\n./copy_fixed.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "copy_lock.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc main() {\n\tvar c Counter\n\tvar wg sync.WaitGroup\n\tfor range 100 {\n\t\twg.Go(func() {\n\t\t\tc.Inc()\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"count =\", c.n)\n}\n",
   "stdout": "count = 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy_lock.go",
     "out": "count = 0\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./copy_lock.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run copy_lock.go",
      "out": "",
      "err": "# command-line-arguments\n./copy_lock.go:23:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "copy_one.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc main() {\n\tvar c Counter\n\tc.Inc()\n\tfmt.Println(\"count =\", c.n)\n}\n",
   "stdout": "count = 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy_one.go",
     "out": "count = 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "copy_vet.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc main() {\n\tvar c Counter\n\tc.Inc()\n\tfmt.Println(\"count =\", c.n)\n}\n",
   "stdout": "",
   "stderr": "copy_vet.go:13:9: Inc passes lock by value: command-line-arguments.Counter contains sync.Mutex\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run copy_vet.go",
     "out": "count = 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch25"
    },
    {
     "cmd": "go vet copy_vet.go",
     "out": "",
     "err": "copy_vet.go:13:9: Inc passes lock by value: command-line-arguments.Counter contains sync.Mutex\n",
     "exit": 1,
     "dir": "~/go-ch25"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n# [command-line-arguments]\n./copy_vet.go:13:9: Inc passes lock by value: command-line-arguments.Counter contains sync.Mutex\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run copy_vet.go",
      "out": "count = 0\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch25"
     },
     {
      "cmd": "go vet copy_vet.go",
      "out": "",
      "err": "# command-line-arguments\n# [command-line-arguments]\n./copy_vet.go:13:9: Inc passes lock by value: command-line-arguments.Counter contains sync.Mutex\n",
      "exit": 1,
      "dir": "~/go-ch25"
     }
    ]
   }
  },
  "done.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"time\"\n)\n\n// tickets hands out ticket numbers forever, until done is closed.\nfunc tickets(done <-chan struct{}) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := 1; ; n++ {\n\t\t\tselect {\n\t\t\tcase out <- n:\n\t\t\tcase <-done:\n\t\t\t\treturn // the stop signal: go home\n\t\t\t}\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tdone := make(chan struct{})\n\tt := tickets(done)\n\tfmt.Println(<-t, <-t, <-t)\n\tclose(done) // everyone listening hears it at once\n\ttime.Sleep(100 * time.Millisecond)\n\tfmt.Println(\"goroutines still alive:\", runtime.NumGoroutine())\n}\n",
   "stdout": "1 2 3\ngoroutines still alive: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run done.go",
     "out": "1 2 3\ngoroutines still alive: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "errgroup.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\n\t\"golang.org/x/sync/errgroup\"\n)\n\nfunc check(depot string) error {\n\tif depot == \"Lima\" {\n\t\treturn errors.New(\"Lima: depot closed\")\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tdepots := []string{\"Oslo\", \"Rome\", \"Lima\", \"Kyiv\"}\n\topen := make([]bool, len(depots))\n\n\tvar g errgroup.Group\n\tg.SetLimit(2) // at most two checks at a time\n\tfor i, d := range depots {\n\t\tg.Go(func() error {\n\t\t\terr := check(d)\n\t\t\topen[i] = err == nil // each check writes its own slot\n\t\t\treturn err\n\t\t})\n\t}\n\terr := g.Wait() // waits for all, returns the first error\n\tfmt.Println(\"open:\", open)\n\tfmt.Println(\"error:\", err)\n}\n",
   "stdout": "open: [true true false true]\nerror: Lima: depot closed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd errg",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch25"
    },
    {
     "cmd": "go run .",
     "out": "open: [true true false true]\nerror: Lima: depot closed\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch25/errg"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "go: golang.org/x/sync@v0.24.0 requires go >= 1.26.0 (running go 1.24.7; GOTOOLCHAIN=local)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd errg",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch25"
     },
     {
      "cmd": "go run .",
      "out": "",
      "err": "go: golang.org/x/sync@v0.24.0 requires go >= 1.26.0 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch25/errg"
     }
    ]
   }
  },
  "errg/main.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\n\t\"golang.org/x/sync/errgroup\"\n)\n\nfunc check(depot string) error {\n\tif depot == \"Lima\" {\n\t\treturn errors.New(\"Lima: depot closed\")\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tdepots := []string{\"Oslo\", \"Rome\", \"Lima\", \"Kyiv\"}\n\topen := make([]bool, len(depots))\n\n\tvar g errgroup.Group\n\tg.SetLimit(2) // at most two checks at a time\n\tfor i, d := range depots {\n\t\tg.Go(func() error {\n\t\t\terr := check(d)\n\t\t\topen[i] = err == nil // each check writes its own slot\n\t\t\treturn err\n\t\t})\n\t}\n\terr := g.Wait() // waits for all, returns the first error\n\tfmt.Println(\"open:\", open)\n\tfmt.Println(\"error:\", err)\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "errg/go.mod": {
   "src": "module example/errg\n\ngo 1.27.3\n\nrequire golang.org/x/sync v0.24.0\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fanin.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n\t\"sync\"\n)\n\nfunc belt(name string, n int) <-chan string {\n\tout := make(chan string)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor i := 1; i <= n; i++ {\n\t\t\tout <- fmt.Sprintf(\"%s%d\", name, i)\n\t\t}\n\t}()\n\treturn out\n}\n\n// merge joins several belts into one (fan-in).\nfunc merge(belts ...<-chan string) <-chan string {\n\tout := make(chan string)\n\tvar wg sync.WaitGroup\n\tfor _, b := range belts {\n\t\twg.Go(func() {\n\t\t\tfor v := range b {\n\t\t\t\tout <- v\n\t\t\t}\n\t\t})\n\t}\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(out)\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tvar all []string\n\tfor v := range merge(belt(\"a\", 3), belt(\"b\", 2), belt(\"c\", 2)) {\n\t\tall = append(all, v)\n\t}\n\tslices.Sort(all)\n\tfmt.Println(len(all), \"items:\", all)\n}\n",
   "stdout": "7 items: [a1 a2 a3 b1 b2 c1 c2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fanin.go",
     "out": "7 items: [a1 a2 a3 b1 b2 c1 c2]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./fanin.go:25:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run fanin.go",
      "out": "",
      "err": "# command-line-arguments\n./fanin.go:25:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_atomic.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"sync/atomic\"\n)\n\nfunc main() {\n\tvar bells atomic.Int64\n\tvar wg sync.WaitGroup\n\tfor range 40 {\n\t\twg.Go(func() {\n\t\t\tbells.Add(1)\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"the bell rang\", bells.Load(), \"times\")\n}\n",
   "stdout": "the bell rang 40 times\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_atomic.go",
     "out": "the bell rang 40 times\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./fill_atomic.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run fill_atomic.go",
      "out": "",
      "err": "# command-line-arguments\n./fill_atomic.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_lock.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nvar (\n\tmu     sync.Mutex\n\tstamps int\n)\n\nfunc stamp() {\n\tmu.Lock()\n\tdefer mu.Unlock()\n\tstamps++\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor range 250 {\n\t\twg.Go(stamp)\n\t}\n\twg.Wait()\n\tfmt.Println(stamps, \"stamps\")\n}\n",
   "stdout": "250 stamps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_lock.go",
     "out": "250 stamps\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./fill_lock.go:22:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run fill_lock.go",
      "out": "",
      "err": "# command-line-arguments\n./fill_lock.go:22:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_sem.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tsem := make(chan struct{}, 3)\n\tvar mu sync.Mutex\n\tdone := 0\n\tvar wg sync.WaitGroup\n\tfor range 10 {\n\t\twg.Go(func() {\n\t\t\tsem <- struct{}{}\n\t\t\tdefer func() { <-sem }()\n\t\t\tmu.Lock()\n\t\t\tdone++\n\t\t\tmu.Unlock()\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(done, \"downloads, at most 3 at a time\")\n}\n",
   "stdout": "10 downloads, at most 3 at a time\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_sem.go",
     "out": "10 downloads, at most 3 at a time\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./fill_sem.go:14:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run fill_sem.go",
      "out": "",
      "err": "# command-line-arguments\n./fill_sem.go:14:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "forgot_unlock.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nvar mu sync.Mutex\nvar count int\n\nfunc add() {\n\tmu.Lock()\n\tcount++\n\t// oops: no Unlock\n}\n\nfunc main() {\n\tadd()\n\tfmt.Println(\"first add done:\", count)\n\tadd()\n\tfmt.Println(\"second add done:\", count)\n}\n",
   "stdout": "first add done: 1\n",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [sync.Mutex.Lock]:\ninternal/sync.runtime_SemacquireMutex(0x24c64d870030?, 0x40?, 0x12?)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/sema.go:95 +0x25\ninternal/sync.(*Mutex).lockSlow(0x593ff8)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:149 +0x15a\ninternal/sync.(*Mutex).Lock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:70\nsync.(*Mutex).Lock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/mutex.go:46\nmain.add(...)\n\t/home/you/go-ch25/forgot_unlock.go:12\nmain.main()\n\t/home/you/go-ch25/forgot_unlock.go:20 +0xd0\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run forgot_unlock.go",
     "out": "first add done: 1\n",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [sync.Mutex.Lock]:\ninternal/sync.runtime_SemacquireMutex(0x24c64d870030?, 0x40?, 0x12?)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/sema.go:95 +0x25\ninternal/sync.(*Mutex).lockSlow(0x593ff8)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:149 +0x15a\ninternal/sync.(*Mutex).Lock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:70\nsync.(*Mutex).Lock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/mutex.go:46\nmain.add(...)\n\t/home/you/go-ch25/forgot_unlock.go:12\nmain.main()\n\t/home/you/go-ch25/forgot_unlock.go:20 +0xd0\nexit status 2\n",
     "exit": 1,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "first add done: 1\n",
    "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [sync.Mutex.Lock]:\ninternal/sync.runtime_SemacquireMutex(0xc00008e020?, 0x0?, 0x12?)\n\t/usr/local/go1.24.7/src/runtime/sema.go:95 +0x25\ninternal/sync.(*Mutex).lockSlow(0x57e090)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:149 +0x15d\ninternal/sync.(*Mutex).Lock(...)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:70\nsync.(*Mutex).Lock(...)\n\t/usr/local/go1.24.7/src/sync/mutex.go:46\nmain.add(...)\n\t/home/you/go-ch25/forgot_unlock.go:12\nmain.main()\n\t/home/you/go-ch25/forgot_unlock.go:20 +0xd0\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run forgot_unlock.go",
      "out": "first add done: 1\n",
      "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [sync.Mutex.Lock]:\ninternal/sync.runtime_SemacquireMutex(0xc00008e020?, 0x0?, 0x12?)\n\t/usr/local/go1.24.7/src/runtime/sema.go:95 +0x25\ninternal/sync.(*Mutex).lockSlow(0x57e090)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:149 +0x15d\ninternal/sync.(*Mutex).Lock(...)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:70\nsync.(*Mutex).Lock(...)\n\t/usr/local/go1.24.7/src/sync/mutex.go:46\nmain.add(...)\n\t/home/you/go-ch25/forgot_unlock.go:12\nmain.main()\n\t/home/you/go-ch25/forgot_unlock.go:20 +0xd0\nexit status 2\n",
      "exit": 1,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "gen.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// count is a generator: it returns a channel and fills it\n// from its own goroutine, closing it when it runs out.\nfunc count(n int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor i := 1; i <= n; i++ {\n\t\t\tout <- i\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tfor v := range count(4) {\n\t\tfmt.Println(\"got\", v)\n\t}\n\tfmt.Println(\"belt empty\")\n}\n",
   "stdout": "got 1\ngot 2\ngot 3\ngot 4\nbelt empty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run gen.go",
     "out": "got 1\ngot 2\ngot 3\ngot 4\nbelt empty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "interleave.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// Two helpers, A and B, each add 1 to the board.\n// count++ is really three moves: read, add, write.\n// This program acts out ONE unlucky order, move by move.\nfunc main() {\n\tboard := 7\n\tvar a, b int // each helper's private note\n\n\ta = board\n\tfmt.Println(\"A reads\", a, board)\n\tb = board\n\tfmt.Println(\"B reads\", b, board)\n\ta = a + 1\n\tfmt.Println(\"A adds\", a, board)\n\tb = b + 1\n\tfmt.Println(\"B adds\", b, board)\n\tboard = a\n\tfmt.Println(\"A writes\", a, board)\n\tboard = b\n\tfmt.Println(\"B writes\", b, board)\n}\n",
   "stdout": "A reads 7 7\nB reads 7 7\nA adds 8 7\nB adds 8 7\nA writes 8 8\nB writes 8 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run interleave.go",
     "out": "A reads 7 7\nB reads 7 7\nA adds 8 7\nB adds 8 7\nA writes 8 8\nB writes 8 8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "keyhook.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar mu sync.Mutex\n\tboard := 0\n\tvar wg sync.WaitGroup\n\tfor range 3 {\n\t\twg.Go(func() {\n\t\t\tfor range 2 {\n\t\t\t\tmu.Lock()\n\t\t\t\tboard++\n\t\t\t\tmu.Unlock()\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"board =\", board)\n}\n",
   "stdout": "board = 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run keyhook.go",
     "out": "board = 6\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./keyhook.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run keyhook.go",
      "out": "",
      "err": "# command-line-arguments\n./keyhook.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "leak_fast.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"time\"\n)\n\nfunc fetch(work time.Duration) int {\n\tch := make(chan int)\n\tgo func() {\n\t\ttime.Sleep(work) // the slow part\n\t\tch <- 42         // hand over the answer\n\t}()\n\tselect {\n\tcase v := <-ch:\n\t\treturn v\n\tcase <-time.After(time.Second):\n\t\treturn -1 // gave up waiting\n\t}\n}\n\nfunc main() {\n\tfmt.Println(\"fetch:\", fetch(10*time.Millisecond))\n\ttime.Sleep(500 * time.Millisecond)\n\tfmt.Println(\"goroutines still alive:\", runtime.NumGoroutine())\n}\n",
   "stdout": "fetch: 42\ngoroutines still alive: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run leak_fast.go",
     "out": "fetch: 42\ngoroutines still alive: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "leak_fixed.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"time\"\n)\n\nfunc fetch(work time.Duration) int {\n\tch := make(chan int, 1) // a slot: the send never waits\n\tgo func() {\n\t\ttime.Sleep(work) // the slow part\n\t\tch <- 42         // hand over the answer\n\t}()\n\tselect {\n\tcase v := <-ch:\n\t\treturn v\n\tcase <-time.After(50 * time.Millisecond):\n\t\treturn -1 // gave up waiting\n\t}\n}\n\nfunc main() {\n\tfmt.Println(\"fetch:\", fetch(200*time.Millisecond))\n\ttime.Sleep(500 * time.Millisecond)\n\tfmt.Println(\"goroutines still alive:\", runtime.NumGoroutine())\n}\n",
   "stdout": "fetch: -1\ngoroutines still alive: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run leak_fixed.go",
     "out": "fetch: -1\ngoroutines still alive: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "leak_slow.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"time\"\n)\n\nfunc fetch(work time.Duration) int {\n\tch := make(chan int)\n\tgo func() {\n\t\ttime.Sleep(work) // the slow part\n\t\tch <- 42         // hand over the answer\n\t}()\n\tselect {\n\tcase v := <-ch:\n\t\treturn v\n\tcase <-time.After(50 * time.Millisecond):\n\t\treturn -1 // gave up waiting\n\t}\n}\n\nfunc main() {\n\tfmt.Println(\"fetch:\", fetch(200*time.Millisecond))\n\ttime.Sleep(500 * time.Millisecond)\n\tfmt.Println(\"goroutines still alive:\", runtime.NumGoroutine())\n}\n",
   "stdout": "fetch: -1\ngoroutines still alive: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run leak_slow.go",
     "out": "fetch: -1\ngoroutines still alive: 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "leakprof.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"runtime/pprof\"\n\t\"time\"\n)\n\nfunc fetch() int {\n\tch := make(chan int)\n\tgo func() {\n\t\ttime.Sleep(200 * time.Millisecond) // slow work\n\t\tch <- 42                           // never taken\n\t}()\n\tselect {\n\tcase v := <-ch:\n\t\treturn v\n\tcase <-time.After(20 * time.Millisecond):\n\t\treturn -1 // gave up waiting\n\t}\n}\n\nfunc main() {\n\tfor range 3 {\n\t\tfmt.Println(\"fetch:\", fetch())\n\t}\n\ttime.Sleep(500 * time.Millisecond)\n\tpprof.Lookup(\"goroutineleak\").WriteTo(os.Stdout, 1)\n}\n",
   "stdout": "fetch: -1\nfetch: -1\nfetch: -1\ngoroutineleak profile: total 3\n3 @ 0x47f06a 0x41421c 0x413e17 0x4e06d6 0x484ec1\n#\t0x4e06d5\tmain.fetch.func1+0x35\t/home/you/go-ch25/leakprof.go:14\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run leakprof.go",
     "out": "fetch: -1\nfetch: -1\nfetch: -1\ngoroutineleak profile: total 3\n3 @ 0x47f06a 0x41421c 0x413e17 0x4e06d6 0x484ec1\n#\t0x4e06d5\tmain.fetch.func1+0x35\t/home/you/go-ch25/leakprof.go:14\n\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "fetch: -1\nfetch: -1\nfetch: -1\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x8 pc=0x4ba62a]\n\ngoroutine 1 [running]:\nruntime/pprof.(*Profile).WriteTo(0x4fe44a?, {0x529998?, 0xc00008e030?}, 0x2?)\n\t/usr/local/go1.24.7/src/runtime/pprof/pprof.go:373 +0x2a\nmain.main()\n\t/home/you/go-ch25/leakprof.go:29 +0xce\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run leakprof.go",
      "out": "fetch: -1\nfetch: -1\nfetch: -1\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x8 pc=0x4ba62a]\n\ngoroutine 1 [running]:\nruntime/pprof.(*Profile).WriteTo(0x4fe44a?, {0x529998?, 0xc00008e030?}, 0x2?)\n\t/usr/local/go1.24.7/src/runtime/pprof/pprof.go:373 +0x2a\nmain.main()\n\t/home/you/go-ch25/leakprof.go:29 +0xce\nexit status 2\n",
      "exit": 1,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "map_fixed.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar mu sync.Mutex\n\tseen := map[int]bool{}\n\tvar wg sync.WaitGroup\n\tfor g := range 4 {\n\t\twg.Go(func() {\n\t\t\tfor i := range 10_000 {\n\t\t\t\tmu.Lock()\n\t\t\t\tseen[g*10_000+i] = true\n\t\t\t\tmu.Unlock()\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(len(seen), \"parcels logged\")\n}\n",
   "stdout": "40000 parcels logged\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_fixed.go",
     "out": "40000 parcels logged\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./map_fixed.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run map_fixed.go",
      "out": "",
      "err": "# command-line-arguments\n./map_fixed.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "map_writes.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tseen := map[int]bool{}\n\tvar wg sync.WaitGroup\n\tfor g := range 4 {\n\t\twg.Go(func() {\n\t\t\tfor i := range 10_000 {\n\t\t\t\tseen[g*10_000+i] = true\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(len(seen), \"parcels logged\")\n}\n",
   "stdout": "",
   "stderr": "fatal error: concurrent map writes\n\ngoroutine 7 [running]:\ninternal/runtime/maps.fatal({0x49dfdb?, 0x0?})\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/panic.go:1195 +0x18\nmain.main.func1()\n\t/home/you/go-ch25/map_writes.go:14 +0x45\nsync.(*WaitGroup).Go.func1()\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:258 +0x4a\ncreated by sync.(*WaitGroup).Go in goroutine 1\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x7d\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run map_writes.go",
     "out": "",
     "err": "fatal error: concurrent map writes\n\ngoroutine 7 [running]:\ninternal/runtime/maps.fatal({0x49dfdb?, 0x0?})\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/panic.go:1195 +0x18\nmain.main.func1()\n\t/home/you/go-ch25/map_writes.go:14 +0x45\nsync.(*WaitGroup).Go.func1()\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:258 +0x4a\ncreated by sync.(*WaitGroup).Go in goroutine 1\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x7d\nexit status 2\n",
     "exit": 1
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./map_writes.go:12:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run map_writes.go",
      "out": "",
      "err": "# command-line-arguments\n./map_writes.go:12:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "mutex_count.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"sync\"\n)\n\nvar (\n\tmu    sync.Mutex\n\tcount int\n)\n\nfunc add() {\n\tmu.Lock()         // take the key (or wait for it)\n\tdefer mu.Unlock() // hang it back when add returns\n\tn := count\n\truntime.Gosched()\n\tcount = n + 1\n}\n\nfunc main() {\n\tfor try := 1; try <= 5; try++ {\n\t\tcount = 0\n\t\tvar wg sync.WaitGroup\n\t\tfor range 10 {\n\t\t\twg.Go(func() {\n\t\t\t\tfor range 100 {\n\t\t\t\t\tadd()\n\t\t\t\t}\n\t\t\t})\n\t\t}\n\t\twg.Wait()\n\t\tfmt.Println(\"try\", try, \"count =\", count)\n\t}\n}\n",
   "stdout": "try 1 count = 1000\ntry 2 count = 1000\ntry 3 count = 1000\ntry 4 count = 1000\ntry 5 count = 1000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run mutex_count.go",
     "out": "try 1 count = 1000\ntry 2 count = 1000\ntry 3 count = 1000\ntry 4 count = 1000\ntry 5 count = 1000\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./mutex_count.go:27:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run mutex_count.go",
      "out": "",
      "err": "# command-line-arguments\n./mutex_count.go:27:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "once.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nvar (\n\tloadOnce sync.Once\n\troutes   []string\n)\n\nfunc loadRoutes() {\n\tfmt.Println(\"loading the route map...\")\n\troutes = []string{\"Oslo\", \"Rome\", \"Lima\"}\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor range 5 {\n\t\twg.Go(func() {\n\t\t\tloadOnce.Do(loadRoutes)\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"routes:\", routes)\n}\n",
   "stdout": "loading the route map...\nroutes: [Oslo Rome Lima]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run once.go",
     "out": "loading the route map...\nroutes: [Oslo Rome Lima]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./once.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run once.go",
      "out": "",
      "err": "# command-line-arguments\n./once.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "parsons_pool.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n\t\"sync\"\n)\n\nfunc main() {\n\tjobs := make(chan int)\n\tresults := make(chan int)\n\tvar wg sync.WaitGroup\n\tfor range 2 {\n\t\twg.Go(func() {\n\t\t\tfor j := range jobs {\n\t\t\t\tresults <- j + 100\n\t\t\t}\n\t\t})\n\t}\n\tgo func() {\n\t\tfor j := 1; j <= 4; j++ {\n\t\t\tjobs <- j\n\t\t}\n\t\tclose(jobs)\n\t}()\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(results)\n\t}()\n\tvar got []int\n\tfor r := range results {\n\t\tgot = append(got, r)\n\t}\n\tslices.Sort(got)\n\tfmt.Println(got)\n}\n",
   "stdout": "[101 102 103 104]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_pool.go",
     "out": "[101 102 103 104]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./parsons_pool.go:14:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run parsons_pool.go",
      "out": "",
      "err": "# command-line-arguments\n./parsons_pool.go:14:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "parsons_stage.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(in <-chan int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := range in {\n\t\t\tout <- n * 2\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tin := make(chan int, 3)\n\tin <- 5\n\tin <- 6\n\tin <- 7\n\tclose(in)\n\tfor v := range double(in) {\n\t\tfmt.Println(v)\n\t}\n}\n",
   "stdout": "10\n12\n14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stage.go",
     "out": "10\n12\n14\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_stage_alt.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(in <-chan int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tfor n := range in {\n\t\t\tout <- n * 2\n\t\t}\n\t\tdefer close(out)\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tin := make(chan int, 3)\n\tin <- 5\n\tin <- 6\n\tin <- 7\n\tclose(in)\n\tfor v := range double(in) {\n\t\tfmt.Println(v)\n\t}\n}\n",
   "stdout": "10\n12\n14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stage_alt.go",
     "out": "10\n12\n14\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pipeline.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// Station 1: puts raw numbers on the belt.\nfunc source(nums ...int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor _, n := range nums {\n\t\t\tout <- n\n\t\t}\n\t}()\n\treturn out\n}\n\n// Station 2: squares each number that arrives.\nfunc square(in <-chan int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := range in {\n\t\t\tout <- n * n\n\t\t}\n\t}()\n\treturn out\n}\n\n// Station 3: puts each result in a labelled box.\nfunc box(in <-chan int) <-chan string {\n\tout := make(chan string)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := range in {\n\t\t\tout <- fmt.Sprintf(\"[box: %d]\", n)\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tfor b := range box(square(source(2, 3, 4))) {\n\t\tfmt.Println(b)\n\t}\n}\n",
   "stdout": "[box: 4]\n[box: 9]\n[box: 16]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run pipeline.go",
     "out": "[box: 4]\n[box: 9]\n[box: 16]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pool_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tjobs := make(chan string, 5)\n\tjobs <- \"oslo\"\n\tjobs <- \"rome\"\n\tclose(jobs)    // the dispatcher thinks it's finished...\n\tjobs <- \"lima\" // ...but one more job turns up\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "",
   "stderr": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch25/pool_err.go:10 +0x65\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run pool_err.go",
     "out": "",
     "err": "panic: send on closed channel\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch25/pool_err.go:10 +0x65\nexit status 2\n",
     "exit": 1
    }
   ]
  },
  "pool_m.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n\t\"strings\"\n\t\"sync\"\n)\n\ntype result struct{ in, out string }\n\nfunc main() {\n\tjobs := make(chan string)\n\tresults := make(chan result)\n\tvar wg sync.WaitGroup\n\tfor range 3 {\n\t\twg.Go(func() {\n\t\t\tfor j := range jobs {\n\t\t\t\tresults <- result{j, strings.ToUpper(j) + \" ✓\"}\n\t\t\t}\n\t\t})\n\t}\n\tgo func() {\n\t\ttowns := []string{\"oslo\", \"rome\", \"lima\", \"kyiv\", \"pune\"}\n\t\tfor _, j := range towns {\n\t\t\tjobs <- j\n\t\t}\n\t\tclose(jobs)\n\t}()\n\tgo func() { wg.Wait(); close(results) }()\n\n\tvar lines []string\n\tfor r := range results {\n\t\tlines = append(lines, r.in+\" -> \"+r.out)\n\t}\n\tslices.Sort(lines)\n\tfor _, l := range lines {\n\t\tfmt.Println(l)\n\t}\n}\n",
   "stdout": "kyiv -> KYIV ✓\nlima -> LIMA ✓\noslo -> OSLO ✓\npune -> PUNE ✓\nrome -> ROME ✓\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run pool_m.go",
     "out": "kyiv -> KYIV ✓\nlima -> LIMA ✓\noslo -> OSLO ✓\npune -> PUNE ✓\nrome -> ROME ✓\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./pool_m.go:17:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run pool_m.go",
      "out": "",
      "err": "# command-line-arguments\n./pool_m.go:17:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_gen.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc evens(limit int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor n := 0; n <= limit; n += 2 {\n\t\t\tout <- n\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tsum := 0\n\tfor n := range evens(7) {\n\t\tsum += n\n\t}\n\tfmt.Println(\"sum:\", sum)\n}\n",
   "stdout": "sum: 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_gen.go",
     "out": "sum: 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_mutex.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar mu sync.Mutex\n\ttotal := 0\n\tvar wg sync.WaitGroup\n\tfor i := 1; i <= 4; i++ {\n\t\twg.Go(func() {\n\t\t\tmu.Lock()\n\t\t\tdefer mu.Unlock()\n\t\t\ttotal += i * 10\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"total:\", total)\n}\n",
   "stdout": "total: 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_mutex.go",
     "out": "total: 100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./predict_mutex.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run predict_mutex.go",
      "out": "",
      "err": "# command-line-arguments\n./predict_mutex.go:13:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_once.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar once sync.Once\n\tcalls := 0\n\tfor i := 1; i <= 3; i++ {\n\t\tonce.Do(func() {\n\t\t\tcalls++\n\t\t\tfmt.Println(\"hello from call\", i)\n\t\t})\n\t}\n\tfmt.Println(\"calls:\", calls)\n}\n",
   "stdout": "hello from call 1\ncalls: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_once.go",
     "out": "hello from call 1\ncalls: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_pool.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tjobs := make(chan int, 10)\n\tfor j := 1; j <= 10; j++ {\n\t\tjobs <- j\n\t}\n\tclose(jobs)\n\n\tvar mu sync.Mutex\n\tsum := 0\n\tvar wg sync.WaitGroup\n\tfor range 4 {\n\t\twg.Go(func() {\n\t\t\tfor j := range jobs {\n\t\t\t\tif j%2 == 0 {\n\t\t\t\t\tmu.Lock()\n\t\t\t\t\tsum += j\n\t\t\t\t\tmu.Unlock()\n\t\t\t\t}\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"even jobs add up to\", sum)\n}\n",
   "stdout": "even jobs add up to 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_pool.go",
     "out": "even jobs add up to 30\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./predict_pool.go:19:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run predict_pool.go",
      "out": "",
      "err": "# command-line-arguments\n./predict_pool.go:19:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_rw.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar mu sync.RWMutex\n\tmu.RLock()\n\tfmt.Println(\"reader 1 in\")\n\tmu.RLock()\n\tfmt.Println(\"reader 2 in\")\n\tok := mu.TryLock()\n\tfmt.Println(\"writer got in?\", ok)\n\tmu.RUnlock()\n\tmu.RUnlock()\n\tok = mu.TryLock()\n\tfmt.Println(\"writer got in now?\", ok)\n}\n",
   "stdout": "reader 1 in\nreader 2 in\nwriter got in? false\nwriter got in now? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_rw.go",
     "out": "reader 1 in\nreader 2 in\nwriter got in? false\nwriter got in now? true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "race.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcount := 0\n\tvar wg sync.WaitGroup\n\tfor range 2 {\n\t\twg.Go(func() {\n\t\t\tcount++\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"count =\", count)\n}\n",
   "stdout": "count = 2\n",
   "stderr": "==================\nWARNING: DATA RACE\nRead at 0x00c000094028 by goroutine 8:\n  main.main.func1()\n      /home/you/go-ch25/race.go:13 +0x2e\n\nPrevious write at 0x00c000094028 by goroutine 9:\n  main.main.func1()\n      /home/you/go-ch25/race.go:13 +0x44\n\nGoroutine 8 (running) created at:\n  sync.(*WaitGroup).Go()\n      /root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x72\n\nGoroutine 9 (finished) created at:\n  sync.(*WaitGroup).Go()\n      /root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x72\n==================\nFound 1 data race(s)\nexit status 66\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "CGO_ENABLED=1 go run -race race.go",
     "out": "count = 2\n",
     "err": "==================\nWARNING: DATA RACE\nRead at 0x00c000094028 by goroutine 8:\n  main.main.func1()\n      /home/you/go-ch25/race.go:13 +0x2e\n\nPrevious write at 0x00c000094028 by goroutine 9:\n  main.main.func1()\n      /home/you/go-ch25/race.go:13 +0x44\n\nGoroutine 8 (running) created at:\n  sync.(*WaitGroup).Go()\n      /root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x72\n\nGoroutine 9 (finished) created at:\n  sync.(*WaitGroup).Go()\n      /root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/waitgroup.go:238 +0x72\n==================\nFound 1 data race(s)\nexit status 66\n",
     "exit": 1,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./race.go:12:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "CGO_ENABLED=1 go run -race race.go",
      "out": "",
      "err": "# command-line-arguments\n./race.go:12:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "race_count.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"sync\"\n)\n\nfunc main() {\n\tfor try := 1; try <= 5; try++ {\n\t\tcount := 0\n\t\tvar wg sync.WaitGroup\n\t\tfor range 10 {\n\t\t\twg.Go(func() {\n\t\t\t\tfor range 100 {\n\t\t\t\t\tn := count        // 1. read the board\n\t\t\t\t\truntime.Gosched() //    (a moment's pause)\n\t\t\t\t\tcount = n + 1     // 2. write n+1 back\n\t\t\t\t}\n\t\t\t})\n\t\t}\n\t\twg.Wait()\n\t\tfmt.Println(\"try\", try, \"count =\", count)\n\t}\n}\n",
   "stdout": "try 1 count = 100\ntry 2 count = 100\ntry 3 count = 100\ntry 4 count = 100\ntry 5 count = 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run race_count.go",
     "out": "try 1 count = 100\ntry 2 count = 100\ntry 3 count = 100\ntry 4 count = 100\ntry 5 count = 100\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./race_count.go:14:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run race_count.go",
      "out": "",
      "err": "# command-line-arguments\n./race_count.go:14:7: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "rwmutex.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\n// Board is the depot's price board: read often, changed rarely.\ntype Board struct {\n\tmu     sync.RWMutex\n\tprices map[string]int\n}\n\nfunc (b *Board) Price(item string) int {\n\tb.mu.RLock() // a reading pass: many readers at once\n\tdefer b.mu.RUnlock()\n\treturn b.prices[item]\n}\n\nfunc (b *Board) SetPrice(item string, p int) {\n\tb.mu.Lock() // the writing key: nobody else, not even readers\n\tdefer b.mu.Unlock()\n\tb.prices[item] = p\n}\n\nfunc main() {\n\tb := Board{prices: map[string]int{\"stamp\": 2}}\n\tb.SetPrice(\"stamp\", 3)\n\n\tseen := make([]int, 5)\n\tvar wg sync.WaitGroup\n\tfor i := range 5 {\n\t\twg.Go(func() {\n\t\t\tseen[i] = b.Price(\"stamp\") // own slot: no race\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"five readers saw:\", seen)\n}\n",
   "stdout": "five readers saw: [3 3 3 3 3]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run rwmutex.go",
     "out": "five readers saw: [3 3 3 3 3]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./rwmutex.go:33:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run rwmutex.go",
      "out": "",
      "err": "# command-line-arguments\n./rwmutex.go:33:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "safe_counter.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\n// Tally counts parcels per town. Safe for many goroutines.\ntype Tally struct {\n\tmu     sync.Mutex\n\tcounts map[string]int\n}\n\nfunc (t *Tally) Add(town string) {\n\tt.mu.Lock()\n\tdefer t.mu.Unlock()\n\tt.counts[town]++\n}\n\nfunc (t *Tally) Get(town string) int {\n\tt.mu.Lock()\n\tdefer t.mu.Unlock()\n\treturn t.counts[town]\n}\n\nfunc main() {\n\tt := Tally{counts: map[string]int{}}\n\tvar wg sync.WaitGroup\n\tfor i := range 300 {\n\t\twg.Go(func() {\n\t\t\tif i%3 == 0 {\n\t\t\t\tt.Add(\"Oslo\")\n\t\t\t} else {\n\t\t\t\tt.Add(\"Rome\")\n\t\t\t}\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"Oslo:\", t.Get(\"Oslo\"), \"Rome:\", t.Get(\"Rome\"))\n}\n",
   "stdout": "Oslo: 100 Rome: 200\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run safe_counter.go",
     "out": "Oslo: 100 Rome: 200\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./safe_counter.go:30:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run safe_counter.go",
      "out": "",
      "err": "# command-line-arguments\n./safe_counter.go:30:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "semaphore.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\nfunc main() {\n\tsem := make(chan struct{}, 2) // two loading bays\n\tvar mu sync.Mutex\n\tinBay, most := 0, 0\n\tvar wg sync.WaitGroup\n\n\tfor range 6 {\n\t\twg.Go(func() {\n\t\t\tsem <- struct{}{}        // take a bay (or wait)\n\t\t\tdefer func() { <-sem }() // free the bay when done\n\n\t\t\tmu.Lock()\n\t\t\tinBay++\n\t\t\tmost = max(most, inBay)\n\t\t\tmu.Unlock()\n\n\t\t\ttime.Sleep(20 * time.Millisecond) // unload the truck\n\n\t\t\tmu.Lock()\n\t\t\tinBay--\n\t\t\tmu.Unlock()\n\t\t})\n\t}\n\twg.Wait()\n\tfmt.Println(\"6 trucks unloaded\")\n\tfmt.Println(\"never more than 2 at once:\", most <= 2)\n}\n",
   "stdout": "6 trucks unloaded\nnever more than 2 at once: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run semaphore.go",
     "out": "6 trucks unloaded\nnever more than 2 at once: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./semaphore.go:16:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run semaphore.go",
      "out": "",
      "err": "# command-line-arguments\n./semaphore.go:16:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_leak.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n\t\"time\"\n)\n\nfunc price(item string) string {\n\tch := make(chan string)\n\tgo func() {\n\t\ttime.Sleep(300 * time.Millisecond) // a slow price check\n\t\tch <- item + \": 3 coins\"\n\t}()\n\tselect {\n\tcase p := <-ch:\n\t\treturn p\n\tcase <-time.After(30 * time.Millisecond):\n\t\treturn item + \": unknown\"\n\t}\n}\n\nfunc main() {\n\tfor _, it := range []string{\"stamp\", \"box\", \"tape\"} {\n\t\tfmt.Println(price(it))\n\t}\n\ttime.Sleep(600 * time.Millisecond)\n\tfmt.Println(\"goroutines alive:\", runtime.NumGoroutine())\n}\n",
   "stdout": "stamp: unknown\nbox: unknown\ntape: unknown\ngoroutines alive: 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_leak.go",
     "out": "stamp: unknown\nbox: unknown\ntape: unknown\ngoroutines alive: 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_noclose.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc shout(in <-chan string) <-chan string {\n\tout := make(chan string)\n\tgo func() {\n\t\tfor s := range in {\n\t\t\tout <- s + \"!\"\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tin := make(chan string, 2)\n\tin <- \"hi\"\n\tin <- \"go\"\n\tclose(in)\n\tfor s := range shout(in) {\n\t\tfmt.Println(s)\n\t}\n\tfmt.Println(\"all shouted\")\n}\n",
   "stdout": "hi!\ngo!\n",
   "stderr": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch25/spot_noclose.go:20 +0xc5\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_noclose.go",
     "out": "hi!\ngo!\n",
     "err": "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch25/spot_noclose.go:20 +0xc5\nexit status 2\n",
     "exit": 1,
     "merged": "hi!\ngo!\nfatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan receive]:\nmain.main()\n\t/home/you/go-ch25/spot_noclose.go:20 +0xc5\nexit status 2\n"
    }
   ]
  },
  "tally_vet.go": {
   "src": "// Package tally counts parcels.\npackage tally\n\nimport \"sync\"\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc (c *Counter) Value() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.n\n}\n",
   "stdout": "",
   "stderr": "tally.go:11:9: Inc passes lock by value: example.com/tally.Counter contains sync.Mutex\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd tally",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch25"
    },
    {
     "cmd": "go test -count=1",
     "out": "PASS\nok  \texample.com/tally\t0.002s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch25/tally"
    },
    {
     "cmd": "go vet .",
     "out": "",
     "err": "tally.go:11:9: Inc passes lock by value: example.com/tally.Counter contains sync.Mutex\n",
     "exit": 1,
     "dir": "~/go-ch25/tally"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# example.com/tally\n# [example.com/tally]\n./tally.go:11:9: Inc passes lock by value: example.com/tally.Counter contains sync.Mutex\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd tally",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch25"
     },
     {
      "cmd": "go test -count=1",
      "out": "PASS\nok  \texample.com/tally\t0.002s\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch25/tally"
     },
     {
      "cmd": "go vet .",
      "out": "",
      "err": "# example.com/tally\n# [example.com/tally]\n./tally.go:11:9: Inc passes lock by value: example.com/tally.Counter contains sync.Mutex\n",
      "exit": 1,
      "dir": "~/go-ch25/tally"
     }
    ]
   }
  },
  "tally/tally.go": {
   "src": "// Package tally counts parcels.\npackage tally\n\nimport \"sync\"\n\ntype Counter struct {\n\tmu sync.Mutex\n\tn  int\n}\n\nfunc (c Counter) Inc() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.n++\n}\n\nfunc (c *Counter) Value() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.n\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tally/tally_test.go": {
   "src": "package tally\n\nimport \"testing\"\n\nfunc TestStartsAtZero(t *testing.T) {\n\tvar c Counter\n\tif got := c.Value(); got != 0 {\n\t\tt.Errorf(\"new counter = %d, want 0\", got)\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "ticker.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\ttick := time.NewTicker(100 * time.Millisecond) // every 100ms\n\tdefer tick.Stop()\n\n\tstart := time.Now()\n\tfor i := 1; i <= 5; i++ {\n\t\t<-tick.C // wait for the next pass\n\t\tfmt.Println(\"request\", i, \"served\")\n\t}\n\ttook := time.Since(start)\n\tfmt.Println(\"took at least 500ms:\", took >= 500*time.Millisecond)\n}\n",
   "stdout": "request 1 served\nrequest 2 served\nrequest 3 served\nrequest 4 served\nrequest 5 served\ntook at least 500ms: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run ticker.go",
     "out": "request 1 served\nrequest 2 served\nrequest 3 served\nrequest 4 served\nrequest 5 served\ntook at least 500ms: true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_belt.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype item struct{ raw, painted, packed int }\n\nfunc paint(in <-chan item) <-chan item {\n\tout := make(chan item)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor it := range in {\n\t\t\tit.painted = it.raw * 3\n\t\t\tout <- it\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc pack(in <-chan item) <-chan item {\n\tout := make(chan item)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor it := range in {\n\t\t\tit.packed = it.painted - 1\n\t\t\tout <- it\n\t\t}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tsrc := make(chan item)\n\tgo func() {\n\t\tdefer close(src)\n\t\tfor _, n := range []int{1, 4, 2, 5} {\n\t\t\tsrc <- item{raw: n}\n\t\t}\n\t}()\n\tfor it := range pack(paint(src)) {\n\t\tfmt.Println(it.raw, it.painted, it.packed)\n\t}\n}\n",
   "stdout": "1 3 2\n4 12 11\n2 6 5\n5 15 14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_belt.go",
     "out": "1 3 2\n4 12 11\n2 6 5\n5 15 14\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unlock_twice.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar mu sync.Mutex\n\tmu.Lock()\n\tfmt.Println(\"key taken\")\n\tmu.Unlock()\n\tfmt.Println(\"key back on the hook\")\n\tmu.Unlock()\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "key taken\nkey back on the hook\n",
   "stderr": "fatal error: sync: unlock of unlocked mutex\n\ngoroutine 1 [running]:\ninternal/sync.fatal({0x49ecd8?, 0x3119597ca000?})\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/panic.go:1205 +0x18\ninternal/sync.(*Mutex).unlockSlow(0x31195975e0b0, 0xffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:204 +0x35\ninternal/sync.(*Mutex).Unlock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:198\nsync.(*Mutex).Unlock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/mutex.go:65\nmain.main()\n\t/home/you/go-ch25/unlock_twice.go:14 +0xe9\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unlock_twice.go",
     "out": "key taken\nkey back on the hook\n",
     "err": "fatal error: sync: unlock of unlocked mutex\n\ngoroutine 1 [running]:\ninternal/sync.fatal({0x49ecd8?, 0x3119597ca000?})\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/runtime/panic.go:1205 +0x18\ninternal/sync.(*Mutex).unlockSlow(0x31195975e0b0, 0xffffffff)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:204 +0x35\ninternal/sync.(*Mutex).Unlock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/internal/sync/mutex.go:198\nsync.(*Mutex).Unlock(...)\n\t/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/sync/mutex.go:65\nmain.main()\n\t/home/you/go-ch25/unlock_twice.go:14 +0xe9\nexit status 2\n",
     "exit": 1,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "key taken\nkey back on the hook\n",
    "stderr": "fatal error: sync: unlock of unlocked mutex\n\ngoroutine 1 [running]:\ninternal/sync.fatal({0x4b898b?, 0xc00009a270?})\n\t/usr/local/go1.24.7/src/runtime/panic.go:1068 +0x18\ninternal/sync.(*Mutex).unlockSlow(0xc00008c040, 0xffffffff)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:204 +0x35\ninternal/sync.(*Mutex).Unlock(...)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:198\nsync.(*Mutex).Unlock(...)\n\t/usr/local/go1.24.7/src/sync/mutex.go:65\nmain.main()\n\t/home/you/go-ch25/unlock_twice.go:14 +0xeb\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run unlock_twice.go",
      "out": "key taken\nkey back on the hook\n",
      "err": "fatal error: sync: unlock of unlocked mutex\n\ngoroutine 1 [running]:\ninternal/sync.fatal({0x4b898b?, 0xc00009a270?})\n\t/usr/local/go1.24.7/src/runtime/panic.go:1068 +0x18\ninternal/sync.(*Mutex).unlockSlow(0xc00008c040, 0xffffffff)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:204 +0x35\ninternal/sync.(*Mutex).Unlock(...)\n\t/usr/local/go1.24.7/src/internal/sync/mutex.go:198\nsync.(*Mutex).Unlock(...)\n\t/usr/local/go1.24.7/src/sync/mutex.go:65\nmain.main()\n\t/home/you/go-ch25/unlock_twice.go:14 +0xeb\nexit status 2\n",
      "exit": 1,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   }
  },
  "workers.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n\t\"sync\"\n)\n\nfunc worker(jobs <-chan int, results chan<- int) {\n\tfor j := range jobs {\n\t\tresults <- j * j\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int)\n\tresults := make(chan int)\n\n\tvar wg sync.WaitGroup\n\tfor range 3 { // three workers at the station\n\t\twg.Go(func() { worker(jobs, results) })\n\t}\n\n\tgo func() { // the dispatcher hands out six jobs\n\t\tfor j := 1; j <= 6; j++ {\n\t\t\tjobs <- j\n\t\t}\n\t\tclose(jobs) // no more jobs: workers' loops end\n\t}()\n\n\tgo func() { // close results once every worker has left\n\t\twg.Wait()\n\t\tclose(results)\n\t}()\n\n\tvar got []int\n\tfor r := range results {\n\t\tgot = append(got, r)\n\t}\n\tslices.Sort(got) // arrival order varies; sorted it doesn't\n\tfmt.Println(got)\n}\n",
   "stdout": "[1 4 9 16 25 36]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run workers.go",
     "out": "[1 4 9 16 25 36]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./workers.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run workers.go",
      "out": "",
      "err": "# command-line-arguments\n./workers.go:21:6: wg.Go undefined (type \"sync\".WaitGroup has no field or method Go)\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
