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
  "workdir": "/home/you/go-ch13",
  "versionDifferences": [
   "address.go",
   "boss_err.go",
   "lab_nilq.go",
   "map_crash.go",
   "method_noparens.go",
   "new_expr.go",
   "new_gate.go",
   "new_machine.go",
   "nil_deref.go",
   "predict_nil.go",
   "spot_nilfield.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): address.go, boss_err.go, lab_nilq.go, map_crash.go, method_noparens.go, new_expr.go, new_gate.go, new_machine.go, nil_deref.go, predict_nil.go, spot_nilfield.go."
 },
 "programs": {
  "address.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscore := 5\n\tp := &score\n\tfmt.Println(p)\n\tfmt.Println(p == &score)\n}\n",
   "stdout": "0x18b41386008\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run address.go",
     "out": "0x18b41386008\ntrue\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "0xc0000100d0\ntrue\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run address.go",
      "out": "0xc0000100d0\ntrue\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "auto_amp.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c Counter) Inc() {\n\tc.n++\n}\n\nfunc (c *Counter) IncP() {\n\tc.n++\n}\n\nfunc (c Counter) Show() {\n\tfmt.Println(\"n is\", c.n)\n}\n\nfunc main() {\n\tc := Counter{}\n\tc.IncP()\n\t(&c).IncP()\n\tc.Show()\n\tp := &c\n\tp.IncP()\n\tp.Show()\n\t(*p).Show()\n}\n",
   "stdout": "n is 2\nn is 3\nn is 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run auto_amp.go",
     "out": "n is 2\nn is 3\nn is 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "autoderef.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tp := &a\n\t(*p).X = 5\n\tp.Y = 6\n\tfmt.Println(a, p.X, (*p).Y)\n\tfmt.Println(p)\n}\n",
   "stdout": "{5 6} 5 6\n&{5 6}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run autoderef.go",
     "out": "{5 6} 5 6\n&{5 6}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Robot struct {\n\tName string\n}\n\nfunc (r *Robot) Hello() string {\n\treturn \"beep, I am \" + r.Name\n}\n\nfunc main() {\n\tvar r *Robot\n\tfmt.Println(\"waking robot\")\n\tfmt.Println(r.Hello())\n}\n",
   "stdout": "waking robot\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e2b]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4b\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "waking robot\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e2b]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4b\nexit status 2\n",
     "exit": 1,
     "merged": "waking robot\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e2b]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4b\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "waking robot\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b2c]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4c\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "waking robot\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b2c]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4c\nexit status 2\n",
      "exit": 1,
      "merged": "waking robot\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b2c]\n\ngoroutine 1 [running]:\nmain.(*Robot).Hello(...)\n\t/home/you/go-ch13/boss_err.go:10\nmain.main()\n\t/home/you/go-ch13/boss_err.go:16 +0x4c\nexit status 2\n"
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Jar struct {\n\tCookies int\n}\n\nfunc (j *Jar) Bake(n int) {\n\tj.Cookies += n\n}\n\nfunc fill(j *Jar) {\n\tj.Bake(6)\n}\n\nfunc main() {\n\tvar jar Jar\n\tfill(&jar)\n\tjar.Bake(2)\n\tfmt.Println(jar.Cookies)\n}\n",
   "stdout": "8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Lift struct {\n\tFloor int\n}\n\nfunc (l *Lift) Up(n int) {\n\tl.Floor += n\n}\n\nfunc main() {\n\tl := Lift{}\n\tl.Up(3)\n\tfmt.Println(l.Floor)\n}\n",
   "stdout": "3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons_alt.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc (l *Lift) Up(n int) {\n\tl.Floor += n\n}\n\ntype Lift struct {\n\tFloor int\n}\n\nfunc main() {\n\tl := Lift{}\n\tl.Up(3)\n\tfmt.Println(l.Floor)\n}\n",
   "stdout": "3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons_alt.go",
     "out": "3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Score struct {\n\tpts int\n}\n\nfunc (s Score) Peek() int {\n\treturn s.pts\n}\n\nfunc (s *Score) Add(n int) {\n\ts.pts += n\n}\n\nfunc bonus(s Score) {\n\ts.Add(50)\n}\n\nfunc bonusP(s *Score) {\n\ts.Add(50)\n}\n\nfunc main() {\n\tvar s Score\n\ts.Add(10)\n\tbonus(s)\n\tfmt.Println(s.Peek())\n\tbonusP(&s)\n\tfmt.Println(s.Peek())\n}\n",
   "stdout": "10\n60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "10\n60\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc (p *Player) LevelUp() {\n\tp.Level++\n}\n\nfunc main() {\n\tteam := []Player{{\"Rin\", 3}, {\"Bo\", 1}}\n\tfor _, p := range team {\n\t\tp.LevelUp()\n\t}\n\tfmt.Println(team)\n}\n",
   "stdout": "[{Rin 3} {Bo 1}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "[{Rin 3} {Bo 1}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bike struct {\n\tkm int\n}\n\nfunc (b *Bike) Ride(n int) {\n\tb.km += n\n}\n\nfunc main() {\n\tmine := Bike{}\n\tspare := mine\n\tp := &mine\n\tfor day := 1; day <= 4; day++ {\n\t\tp.Ride(day)\n\t\tspare.Ride(1)\n\t\tfmt.Println(day, mine.km, spare.km)\n\t}\n}\n",
   "stdout": "1 1 1\n2 3 2\n3 6 3\n4 10 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "1 1 1\n2 3 2\n3 6 3\n4 10 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "counter.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c Counter) Inc() {\n\tc.n++\n}\n\nfunc (c *Counter) IncP() {\n\tc.n++\n}\n\nfunc main() {\n\tvar c Counter\n\tc.Inc()\n\tfmt.Println(\"after Inc: \", c.n)\n\tc.IncP()\n\tfmt.Println(\"after IncP:\", c.n)\n}\n",
   "stdout": "after Inc:  0\nafter IncP: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run counter.go",
     "out": "after Inc:  0\nafter IncP: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "counter_lit.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c Counter) Inc() {\n\tc.n++\n}\n\nfunc (c *Counter) IncP() {\n\tc.n++\n}\n\nfunc main() {\n\tCounter{}.IncP()\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./counter_lit.go:18:12: cannot call pointer method IncP on Counter\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run counter_lit.go",
     "out": "",
     "err": "# command-line-arguments\n./counter_lit.go:18:12: cannot call pointer method IncP on Counter\n",
     "exit": 1
    }
   ]
  },
  "counter_machine.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c Counter) Inc() {\n\tc.n++\n}\n\nfunc (c *Counter) IncP() {\n\tc.n++\n}\n\nfunc main() {\n\tvar a Counter\n\ta.Inc()\n\tfmt.Println(\"a.Inc() ->\", a.n)\n\tvar b Counter\n\tb.IncP()\n\tfmt.Println(\"b.IncP() ->\", b.n)\n\tvar c Counter\n\tc.Inc()\n\tc.Inc()\n\tc.Inc()\n\tfmt.Println(\"c.Inc() x3 ->\", c.n)\n\tvar d Counter\n\td.IncP()\n\td.IncP()\n\td.IncP()\n\tfmt.Println(\"d.IncP() x3 ->\", d.n)\n\te := &Counter{}\n\te.Inc()\n\tfmt.Println(\"e.Inc() on a pointer ->\", e.n)\n}\n",
   "stdout": "a.Inc() -> 0\nb.IncP() -> 1\nc.Inc() x3 -> 0\nd.IncP() x3 -> 3\ne.Inc() on a pointer -> 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run counter_machine.go",
     "out": "a.Inc() -> 0\nb.IncP() -> 1\nc.Inc() x3 -> 0\nd.IncP() x3 -> 3\ne.Inc() on a pointer -> 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "duration.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tfmt.Println(90 * time.Minute)\n}\n",
   "stdout": "1h30m0s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run duration.go",
     "out": "1h30m0s\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_ptr.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcups := 3\n\tp := &cups\n\t*p = 4\n\tfmt.Println(cups, *p)\n}\n",
   "stdout": "4 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_ptr.go",
     "out": "4 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_recv.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Lamp struct {\n\tOn bool\n}\n\nfunc (l *Lamp) Toggle() {\n\tl.On = !l.On\n}\n\nfunc (l Lamp) Say() string {\n\tif l.On {\n\t\treturn \"glowing\"\n\t}\n\treturn \"dark\"\n}\n\nfunc main() {\n\tvar desk Lamp\n\tdesk.Toggle()\n\tfmt.Println(desk.Say())\n}\n",
   "stdout": "glowing\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_recv.go",
     "out": "glowing\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_recv_dark.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Lamp struct {\n\tOn bool\n}\n\nfunc (l Lamp) Toggle() {\n\tl.On = !l.On\n}\n\nfunc (l Lamp) Say() string {\n\tif l.On {\n\t\treturn \"glowing\"\n\t}\n\treturn \"dark\"\n}\n\nfunc main() {\n\tvar desk Lamp\n\tdesk.Toggle()\n\tfmt.Println(desk.Say())\n}\n",
   "stdout": "dark\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_recv_dark.go",
     "out": "dark\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "first_pointer.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscore := 5\n\tp := &score\n\tfmt.Println(*p)\n\t*p = 7\n\tfmt.Println(score)\n\tfmt.Printf(\"%T %T\\n\", score, p)\n}\n",
   "stdout": "5\n7\nint *int\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run first_pointer.go",
     "out": "5\n7\nint *int\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "int_method.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc (n int) Double() int {\n\treturn n * 2\n}\n\nfunc main() {\n\tfmt.Println(4)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./int_method.go:5:9: cannot define new methods on non-local type int\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run int_method.go",
     "out": "",
     "err": "# command-line-arguments\n./int_method.go:5:9: cannot define new methods on non-local type int\n",
     "exit": 1
    }
   ]
  },
  "lab_movefield.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n\tMove int\n}\n\nfunc (p *Point) Move(dx int) {\n\tp.X += dx\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\ta.Move(99)\n\tfmt.Println(a)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lab_movefield.go:10:17: field and method with the same name Move\n\t./lab_movefield.go:7:2: other declaration of Move\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lab_movefield.go",
     "out": "",
     "err": "# command-line-arguments\n./lab_movefield.go:10:17: field and method with the same name Move\n\t./lab_movefield.go:7:2: other declaration of Move\n",
     "exit": 1
    }
   ]
  },
  "lab_nilq.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc move(p Point) {\n\tp.X = 100\n}\n\nfunc moveP(p *Point) {\n\tp.X = 100\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tmove(a)\n\tfmt.Println(a)\n\tmoveP(&a)\n\tfmt.Println(a)\n\tvar q *Point\n\tq.X = 1\n}\n",
   "stdout": "{1 2}\n{100 2}\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e9e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xbe\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lab_nilq.go",
     "out": "{1 2}\n{100 2}\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e9e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xbe\nexit status 2\n",
     "exit": 1,
     "merged": "{1 2}\n{100 2}\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e9e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xbe\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "{1 2}\n{100 2}\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491ba0]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xc0\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run lab_nilq.go",
      "out": "{1 2}\n{100 2}\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491ba0]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xc0\nexit status 2\n",
      "exit": 1,
      "merged": "{1 2}\n{100 2}\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491ba0]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/lab_nilq.go:24 +0xc0\nexit status 2\n"
     }
    ]
   }
  },
  "lab_noamp.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc move(p Point) {\n\tp.X = 100\n}\n\nfunc moveP(p *Point) {\n\tp.X = 100\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tmove(a)\n\tfmt.Println(a)\n\tmoveP(a)\n\tfmt.Println(a)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lab_noamp.go:21:8: cannot use a (variable of struct type Point) as *Point value in argument to moveP\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lab_noamp.go",
     "out": "",
     "err": "# command-line-arguments\n./lab_noamp.go:21:8: cannot use a (variable of struct type Point) as *Point value in argument to moveP\n",
     "exit": 1
    }
   ]
  },
  "map_blank.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n}\n\nfunc deliver(h *House) {\n\tif h == nil {\n\t\tfmt.Println(\"blank slip: no delivery\")\n\t\treturn\n\t}\n\tfmt.Println(\"delivered to number\", h.Number)\n}\n\nfunc main() {\n\tvar slip *House\n\tdeliver(slip)\n}\n",
   "stdout": "blank slip: no delivery\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_blank.go",
     "out": "blank slip: no delivery\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_crash.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n}\n\nfunc deliver(h *House) {\n\tfmt.Println(\"going to the address on the slip\")\n\tfmt.Println(\"delivered to number\", h.Number)\n}\n\nfunc main() {\n\tvar slip *House\n\tdeliver(slip)\n}\n",
   "stdout": "going to the address on the slip\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e59]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x79\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run map_crash.go",
     "out": "going to the address on the slip\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e59]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x79\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n",
     "exit": 1,
     "merged": "going to the address on the slip\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e59]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x79\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "going to the address on the slip\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b58]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x78\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run map_crash.go",
      "out": "going to the address on the slip\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b58]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x78\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n",
      "exit": 1,
      "merged": "going to the address on the slip\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b58]\n\ngoroutine 1 [running]:\nmain.deliver(0x0)\n\t/home/you/go-ch13/map_crash.go:11 +0x78\nmain.main()\n\t/home/you/go-ch13/map_crash.go:16 +0x15\nexit status 2\n"
     }
    ]
   }
  },
  "map_full.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n}\n\nfunc deliver(h *House) {\n\tif h == nil {\n\t\tfmt.Println(\"blank slip: no delivery\")\n\t\treturn\n\t}\n\tfmt.Println(\"delivered to number\", h.Number)\n}\n\nfunc main() {\n\thome := House{Number: 12}\n\tdeliver(&home)\n}\n",
   "stdout": "delivered to number 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_full.go",
     "out": "delivered to number 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "method.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H int\n}\n\nfunc area(r Rect) int {\n\treturn r.W * r.H\n}\n\nfunc (r Rect) Area() int {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tbox := Rect{W: 3, H: 4}\n\tfmt.Println(area(box))\n\tfmt.Println(box.Area())\n}\n",
   "stdout": "12\n12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run method.go",
     "out": "12\n12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "method_asfunc.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H int\n}\n\nfunc (r Rect) Area() int {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tbox := Rect{W: 3, H: 4}\n\tn := Area(box)\n\tfmt.Println(n)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./method_asfunc.go:15:7: undefined: Area\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run method_asfunc.go",
     "out": "",
     "err": "# command-line-arguments\n./method_asfunc.go:15:7: undefined: Area\n",
     "exit": 1
    }
   ]
  },
  "method_noparens.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H int\n}\n\nfunc (r Rect) Area() int {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tbox := Rect{W: 3, H: 4}\n\ttotal := box.Area + 1\n\tfmt.Println(total)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./method_noparens.go:15:11: invalid operation: box.Area + 1 (mismatched types func() int and untyped int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run method_noparens.go",
     "out": "",
     "err": "# command-line-arguments\n./method_noparens.go:15:11: invalid operation: box.Area + 1 (mismatched types func() int and untyped int)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./method_noparens.go:15:22: cannot convert 1 (untyped int constant) to type func() int\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run method_noparens.go",
      "out": "",
      "err": "# command-line-arguments\n./method_noparens.go:15:22: cannot convert 1 (untyped int constant) to type func() int\n",
      "exit": 1
     }
    ]
   }
  },
  "method_samename.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H int\n\tArea int\n}\n\nfunc (r Rect) Area() int {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tfmt.Println(Rect{W: 3, H: 4}.Area())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./method_samename.go:10:15: field and method with the same name Area\n\t./method_samename.go:7:2: other declaration of Area\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run method_samename.go",
     "out": "",
     "err": "# command-line-arguments\n./method_samename.go:10:15: field and method with the same name Area\n\t./method_samename.go:7:2: other declaration of Area\n",
     "exit": 1
    }
   ]
  },
  "method_undefined.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H int\n}\n\nfunc (r Rect) Area() int {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tbox := Rect{W: 3, H: 4}\n\tfmt.Println(box.Perimeter())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./method_undefined.go:15:18: box.Perimeter undefined (type Rect has no field or method Perimeter)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run method_undefined.go",
     "out": "",
     "err": "# command-line-arguments\n./method_undefined.go:15:18: box.Perimeter undefined (type Rect has no field or method Perimeter)\n",
     "exit": 1
    }
   ]
  },
  "move.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc move(p Point) {\n\tp.X = 100\n}\n\nfunc moveP(p *Point) {\n\tp.X = 100\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tmove(a)\n\tfmt.Println(a)\n\tmoveP(&a)\n\tfmt.Println(a)\n}\n",
   "stdout": "{1 2}\n{100 2}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run move.go",
     "out": "{1 2}\n{100 2}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "named_type.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Minutes int\n\nfunc (m Minutes) Clock() string {\n\treturn fmt.Sprintf(\"%dh%02dm\", m/60, m%60)\n}\n\nfunc main() {\n\tride := Minutes(135)\n\tfmt.Println(ride.Clock())\n\tfmt.Println(Minutes(45).Clock())\n}\n",
   "stdout": "2h15m\n0h45m\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run named_type.go",
     "out": "2h15m\n0h45m\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "new.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n\tColor  string\n}\n\nfunc main() {\n\tp := new(int)\n\tfmt.Println(*p)\n\t*p = 3\n\tfmt.Println(*p)\n\th := new(House)\n\th.Color = \"red\"\n\tfmt.Println(*h, h)\n\tg := &House{Number: 7, Color: \"green\"}\n\tfmt.Println(g.Number, g.Color)\n}\n",
   "stdout": "0\n3\n{0 red} &{0 red}\n7 green\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run new.go",
     "out": "0\n3\n{0 red} &{0 red}\n7 green\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "new_expr.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Order struct {\n\tItem string\n\tTip  *int\n}\n\nfunc main() {\n\tp := new(42)\n\tfmt.Println(*p)\n\ta := Order{Item: \"soup\", Tip: new(5)}\n\tb := Order{Item: \"tea\"}\n\tfmt.Println(a.Item, *a.Tip)\n\tfmt.Println(b.Item, b.Tip == nil)\n}\n",
   "stdout": "42\nsoup 5\ntea true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run new_expr.go",
     "out": "42\nsoup 5\ntea true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./new_expr.go:11:11: 42 is not a type\n./new_expr.go:13:36: 5 is not a type\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run new_expr.go",
      "out": "",
      "err": "# command-line-arguments\n./new_expr.go:11:11: 42 is not a type\n./new_expr.go:13:36: 5 is not a type\n",
      "exit": 1
     }
    ]
   }
  },
  "new_gate.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tp := new(42)\n\tfmt.Println(*p)\n}\n",
   "stdout": "42\n",
   "stderr": "go: creating new go.mod: module example/oldgo\ngo: to add module requirements and sums:\n\tgo mod tidy\n# example/oldgo\n./main.go:6:7: new(42) requires go1.26 or later (-lang was set to go1.25; check go.mod)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go mod init example/oldgo",
     "out": "",
     "err": "go: creating new go.mod: module example/oldgo\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
     "exit": 0,
     "dir": "~/go-ch13/oldgo"
    },
    {
     "cmd": "go mod edit -go=1.25",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch13/oldgo"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/oldgo\n\ngo 1.25\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch13/oldgo"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/oldgo\n./main.go:6:7: new(42) requires go1.26 or later (-lang was set to go1.25; check go.mod)\n",
     "exit": 1,
     "dir": "~/go-ch13/oldgo"
    },
    {
     "cmd": "go mod edit -go=1.26",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch13/oldgo"
    },
    {
     "cmd": "go run .",
     "out": "42\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch13/oldgo"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "go: creating new go.mod: module example/oldgo\ngo: to add module requirements and sums:\n\tgo mod tidy\ngo: go.mod requires go >= 1.25 (running go 1.24.7; GOTOOLCHAIN=local)\ngo: go.mod requires go >= 1.26 (running go 1.24.7; GOTOOLCHAIN=local)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go mod init example/oldgo",
      "out": "",
      "err": "go: creating new go.mod: module example/oldgo\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
      "exit": 0,
      "dir": "~/go-ch13/oldgo"
     },
     {
      "cmd": "go mod edit -go=1.25",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch13/oldgo"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/oldgo\n\ngo 1.25\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch13/oldgo"
     },
     {
      "cmd": "go run .",
      "out": "",
      "err": "go: go.mod requires go >= 1.25 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch13/oldgo"
     },
     {
      "cmd": "go mod edit -go=1.26",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch13/oldgo"
     },
     {
      "cmd": "go run .",
      "out": "",
      "err": "go: go.mod requires go >= 1.26 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch13/oldgo"
     }
    ]
   }
  },
  "new_machine.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n\tColor  string\n}\n\nfunc main() {\n\ta := new(int)\n\tfmt.Println(\"new(int) ->\", *a)\n\tb := new(string)\n\tfmt.Printf(\"new(string) -> %q\\n\", *b)\n\tc := new(bool)\n\tfmt.Println(\"new(bool) ->\", *c)\n\td := new(House)\n\tfmt.Printf(\"new(House) -> %+v\\n\", *d)\n\te := new(42)\n\tfmt.Println(\"new(42) ->\", *e)\n\tf := new(\"hi\")\n\tfmt.Printf(\"new(\\\"hi\\\") -> %q\\n\", *f)\n}\n",
   "stdout": "new(int) -> 0\nnew(string) -> \"\"\nnew(bool) -> false\nnew(House) -> {Number:0 Color:}\nnew(42) -> 42\nnew(\"hi\") -> \"hi\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run new_machine.go",
     "out": "new(int) -> 0\nnew(string) -> \"\"\nnew(bool) -> false\nnew(House) -> {Number:0 Color:}\nnew(42) -> 42\nnew(\"hi\") -> \"hi\"\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./new_machine.go:19:11: 42 is not a type\n./new_machine.go:21:11: \"hi\" is not a type\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run new_machine.go",
      "out": "",
      "err": "# command-line-arguments\n./new_machine.go:19:11: 42 is not a type\n./new_machine.go:21:11: \"hi\" is not a type\n",
      "exit": 1
     }
    ]
   }
  },
  "nil_deref.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar p *int\n\tfmt.Println(\"p is\", p)\n\tfmt.Println(*p)\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "p is <nil>\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e46]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x66\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nil_deref.go",
     "out": "p is <nil>\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e46]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x66\nexit status 2\n",
     "exit": 1,
     "merged": "p is <nil>\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e46]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x66\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "p is <nil>\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b4d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x6d\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run nil_deref.go",
      "out": "p is <nil>\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b4d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x6d\nexit status 2\n",
      "exit": 1,
      "merged": "p is <nil>\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b4d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/nil_deref.go:8 +0x6d\nexit status 2\n"
     }
    ]
   }
  },
  "nil_ptr.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar p *int\n\tfmt.Println(p)\n\tfmt.Println(p == nil)\n\tn := 4\n\tp = &n\n\tfmt.Println(p == nil, *p)\n}\n",
   "stdout": "<nil>\ntrue\nfalse 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nil_ptr.go",
     "out": "<nil>\ntrue\nfalse 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_arith.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tseats := [3]int{10, 20, 30}\n\tp := &seats[0]\n\tp++\n\tfmt.Println(*p)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./no_arith.go:8:2: invalid operation: p++ (non-numeric type *int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run no_arith.go",
     "out": "",
     "err": "# command-line-arguments\n./no_arith.go:8:2: invalid operation: p++ (non-numeric type *int)\n",
     "exit": 1
    }
   ]
  },
  "no_stringer.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\thero := Player{Name: \"Rin\", Level: 3}\n\tfmt.Println(hero)\n\tteam := []Player{hero, {Name: \"Bo\", Level: 1}}\n\tfmt.Println(team)\n\tfmt.Printf(\"Leader: %v\\n\", hero)\n}\n",
   "stdout": "{Rin 3}\n[{Rin 3} {Bo 1}]\nLeader: {Rin 3}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run no_stringer.go",
     "out": "{Rin 3}\n[{Rin 3} {Bo 1}]\nLeader: {Rin 3}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "paint_copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n\tColor  string\n}\n\nfunc paint(h House) {\n\th.Color = \"blue\"\n\tfmt.Println(\"inside paint:\", h)\n}\n\nfunc main() {\n\thome := House{Number: 12, Color: \"white\"}\n\tpaint(home)\n\tfmt.Println(\"after paint: \", home)\n}\n",
   "stdout": "inside paint: {12 blue}\nafter paint:  {12 white}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run paint_copy.go",
     "out": "inside paint: {12 blue}\nafter paint:  {12 white}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "paint_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n\tColor  string\n}\n\nfunc paint(h *House) {\n\th.Color = \"blue\"\n\tfmt.Println(\"inside paint:\", h)\n}\n\nfunc main() {\n\thome := House{Number: 12, Color: \"white\"}\n\tpaint(&home)\n\tfmt.Println(\"after paint: \", home)\n}\n",
   "stdout": "inside paint: &{12 blue}\nafter paint:  {12 blue}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run paint_fix.go",
     "out": "inside paint: &{12 blue}\nafter paint:  {12 blue}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_stringer.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tTo   string\n\tKilo int\n}\n\nfunc (p Parcel) String() string {\n\treturn fmt.Sprintf(\"%dkg for %s\", p.Kilo, p.To)\n}\n\nfunc main() {\n\tfmt.Println(Parcel{To: \"Ana\", Kilo: 2})\n}\n",
   "stdout": "2kg for Ana\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stringer.go",
     "out": "2kg for Ana\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_stringer_alt1.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tKilo int\n\tTo   string\n}\n\nfunc (p Parcel) String() string {\n\treturn fmt.Sprintf(\"%dkg for %s\", p.Kilo, p.To)\n}\n\nfunc main() {\n\tfmt.Println(Parcel{To: \"Ana\", Kilo: 2})\n}\n",
   "stdout": "2kg for Ana\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stringer_alt1.go",
     "out": "2kg for Ana\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_stringer_alt2.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tTo   string\n\tKilo int\n}\n\nfunc main() {\n\tfmt.Println(Parcel{To: \"Ana\", Kilo: 2})\n}\n\nfunc (p Parcel) String() string {\n\treturn fmt.Sprintf(\"%dkg for %s\", p.Kilo, p.To)\n}\n",
   "stdout": "2kg for Ana\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stringer_alt2.go",
     "out": "2kg for Ana\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_stringer_alt3.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tKilo int\n\tTo   string\n}\n\nfunc main() {\n\tfmt.Println(Parcel{To: \"Ana\", Kilo: 2})\n}\n\nfunc (p Parcel) String() string {\n\treturn fmt.Sprintf(\"%dkg for %s\", p.Kilo, p.To)\n}\n",
   "stdout": "2kg for Ana\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_stringer_alt3.go",
     "out": "2kg for Ana\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_swap.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc swap(x, y *int) {\n\tkeep := *x\n\t*x = *y\n\t*y = keep\n}\n\nfunc main() {\n\ta, b := 1, 2\n\tswap(&a, &b)\n\tfmt.Println(a, b)\n}\n",
   "stdout": "2 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_swap.go",
     "out": "2 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_swap_alt.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta, b := 1, 2\n\tswap(&a, &b)\n\tfmt.Println(a, b)\n}\n\nfunc swap(x, y *int) {\n\tkeep := *x\n\t*x = *y\n\t*y = keep\n}\n",
   "stdout": "2 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_swap_alt.go",
     "out": "2 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pointer_basics.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := 5\n\tp := &a\n\t*p = 8\n\tq := p\n\t*q = *q + 1\n\tb := a\n\tb = 100\n\tfmt.Println(a, *p, *q, b)\n}\n",
   "stdout": "9 9 9 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run pointer_basics.go",
     "out": "9 9 9 100\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_counter.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Tally struct {\n\tvotes int\n}\n\nfunc (t Tally) Add() {\n\tt.votes++\n}\n\nfunc (t *Tally) AddP() {\n\tt.votes++\n}\n\nfunc main() {\n\tvar t Tally\n\tt.AddP()\n\tt.Add()\n\tt.AddP()\n\tfmt.Println(t.votes)\n}\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_counter.go",
     "out": "2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_double.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(n int) {\n\tn = n * 2\n}\n\nfunc doubleP(n *int) {\n\t*n = *n * 2\n}\n\nfunc main() {\n\tx := 5\n\tdouble(x)\n\tfmt.Println(x)\n\tdoubleP(&x)\n\tdoubleP(&x)\n\tfmt.Println(x)\n}\n",
   "stdout": "5\n20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_double.go",
     "out": "5\n20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_new.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tp := new(int)\n\tq := p\n\t*q = *q + 5\n\tr := new(int)\n\tfmt.Println(*p, *q, *r)\n}\n",
   "stdout": "5 5 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_new.go",
     "out": "5 5 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_nil.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Box struct {\n\tLabel string\n}\n\nfunc main() {\n\tvar b *Box\n\tfmt.Println(b == nil)\n\tfmt.Println(b.Label)\n}\n",
   "stdout": "true\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e31]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x51\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run predict_nil.go",
     "out": "true\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e31]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x51\nexit status 2\n",
     "exit": 1,
     "merged": "true\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e31]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x51\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "true\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b32]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x52\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run predict_nil.go",
      "out": "true\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b32]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x52\nexit status 2\n",
      "exit": 1,
      "merged": "true\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b32]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/predict_nil.go:12 +0x52\nexit status 2\n"
     }
    ]
   }
  },
  "predict_ptr.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := 10\n\tp := &x\n\t*p = *p * 2\n\tx = x + 1\n\tfmt.Println(x, *p)\n}\n",
   "stdout": "21 21\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_ptr.go",
     "out": "21 21\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ptr_mixup.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tn := 3\n\tvar p *int = n\n\tfmt.Println(*n, p)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./ptr_mixup.go:7:15: cannot use n (variable of type int) as *int value in variable declaration\n./ptr_mixup.go:8:15: invalid operation: cannot indirect n (variable of type int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run ptr_mixup.go",
     "out": "",
     "err": "# command-line-arguments\n./ptr_mixup.go:7:15: cannot use n (variable of type int) as *int value in variable declaration\n./ptr_mixup.go:8:15: invalid operation: cannot indirect n (variable of type int)\n",
     "exit": 1
    }
   ]
  },
  "return_local.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n\tColor  string\n}\n\nfunc build(n int) *House {\n\th := House{Number: n, Color: \"white\"}\n\treturn &h\n}\n\nfunc main() {\n\ta := build(3)\n\tb := build(5)\n\ta.Color = \"yellow\"\n\tfmt.Println(*a, *b)\n}\n",
   "stdout": "{3 yellow} {5 white}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run return_local.go",
     "out": "{3 yellow} {5 white}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "scan_like.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc readInto(box *int) {\n\t*box = 3\n}\n\nfunc main() {\n\tvar parcels int\n\treadInto(&parcels)\n\tfmt.Println(\"parcels:\", parcels)\n\tfmt.Print(\"How many more? \")\n\tfmt.Scan(&parcels)\n\tfmt.Println(\"parcels:\", parcels)\n}\n",
   "stdout": "parcels: 3\nHow many more? parcels: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_like.go",
     "out": "parcels: 3\nHow many more? parcels: 5\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "5\n",
   "screen": "parcels: 3\nHow many more? 5\nparcels: 5\n"
  },
  "spot_heal.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName string\n\tHP   int\n}\n\nfunc heal(p Player, amount int) {\n\tp.HP = p.HP + amount\n}\n\nfunc main() {\n\thero := Player{Name: \"Rin\", HP: 12}\n\theal(hero, 8)\n\tfmt.Println(hero.Name, \"has\", hero.HP, \"HP\")\n}\n",
   "stdout": "Rin has 12 HP\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_heal.go",
     "out": "Rin has 12 HP\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_nilfield.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype House struct {\n\tNumber int\n}\n\ntype Parcel struct {\n\tItem string\n\tTo   *House\n}\n\nfunc main() {\n\tgift := Parcel{Item: \"kite\"}\n\tfmt.Println(\"packing\", gift.Item)\n\tfmt.Println(\"to number\", gift.To.Number)\n}\n",
   "stdout": "packing kite\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e81]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0xa1\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_nilfield.go",
     "out": "packing kite\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e81]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0xa1\nexit status 2\n",
     "exit": 1,
     "merged": "packing kite\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499e81]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0xa1\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "packing kite\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b7e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0x9e\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run spot_nilfield.go",
      "out": "packing kite\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b7e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0x9e\nexit status 2\n",
      "exit": 1,
      "merged": "packing kite\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491b7e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch13/spot_nilfield.go:17 +0x9e\nexit status 2\n"
     }
    ]
   }
  },
  "spot_setter.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc (p Player) Rename(name string) {\n\tp.Name = name\n}\n\nfunc main() {\n\thero := Player{Name: \"Rin\", Level: 3}\n\thero.Rename(\"Riya\")\n\tfmt.Println(hero.Name)\n}\n",
   "stdout": "Rin\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_setter.go",
     "out": "Rin\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stringer.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc (p Player) String() string {\n\treturn fmt.Sprintf(\"%s (level %d)\", p.Name, p.Level)\n}\n\nfunc main() {\n\thero := Player{Name: \"Rin\", Level: 3}\n\tfmt.Println(hero)\n\tteam := []Player{hero, {Name: \"Bo\", Level: 1}}\n\tfmt.Println(team)\n\tfmt.Printf(\"Leader: %v\\n\", hero)\n}\n",
   "stdout": "Rin (level 3)\n[Rin (level 3) Bo (level 1)]\nLeader: Rin (level 3)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run stringer.go",
     "out": "Rin (level 3)\n[Rin (level 3) Bo (level 1)]\nLeader: Rin (level 3)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_ptr.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := 1\n\tp := &a\n\tb := a\n\tfor i := 1; i <= 4; i++ {\n\t\t*p = *p * 2\n\t\tb = b + 1\n\t\tfmt.Println(i, a, b)\n\t}\n}\n",
   "stdout": "1 2 2\n2 4 3\n3 8 4\n4 16 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_ptr.go",
     "out": "1 2 2\n2 4 3\n3 8 4\n4 16 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wallet.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Wallet struct {\n\tcoins int\n}\n\nfunc (w *Wallet) Earn(n int) {\n\tw.coins += n\n}\n\nfunc (w *Wallet) Spend(n int) bool {\n\tif n > w.coins {\n\t\treturn false\n\t}\n\tw.coins -= n\n\treturn true\n}\n\nfunc (w *Wallet) Coins() int {\n\treturn w.coins\n}\n\nfunc main() {\n\tvar w Wallet\n\tw.Earn(10)\n\tfmt.Println(w.Spend(4), w.Coins())\n\tfmt.Println(w.Spend(9), w.Coins())\n}\n",
   "stdout": "true 6\nfalse 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wallet.go",
     "out": "true 6\nfalse 6\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
