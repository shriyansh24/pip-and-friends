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
  "workdir": "/home/you/go-ch19",
  "versionDifferences": [
   "boss_err.go",
   "custom.go",
   "no_recover.go",
   "parsons_as.go",
   "recover_early.go",
   "wrap_ptr.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_err.go, custom.go, no_recover.go, parsons_as.go, recover_early.go, wrap_ptr.go."
 },
 "programs": {
  "accept_iface.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\n// Accept an interface: report works with ANY Writer.\nfunc report(w io.Writer, parcels []string) {\n\tfor i, p := range parcels {\n\t\tfmt.Fprintf(w, \"%d. %s\\n\", i+1, p)\n\t}\n}\n\n// Log is a Writer that keeps every line it is given.\ntype Log struct{ lines []string }\n\n// Return a struct: callers get ALL of Log's methods.\nfunc NewLog() *Log { return &Log{} }\n\nfunc (l *Log) Write(p []byte) (int, error) {\n\tl.lines = append(l.lines, strings.TrimSuffix(string(p), \"\\n\"))\n\treturn len(p), nil\n}\n\nfunc (l *Log) Count() int { return len(l.lines) }\n\nfunc main() {\n\ttoday := []string{\"tea\", \"maps\", \"a kite\"}\n\treport(os.Stdout, today)\n\n\tlog := NewLog()\n\treport(log, today)\n\tfmt.Println(\"the log kept\", log.Count(), \"lines; the last is\", log.lines[2])\n}\n",
   "stdout": "1. tea\n2. maps\n3. a kite\nthe log kept 3 lines; the last is 3. a kite\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run accept_iface.go",
     "out": "1. tea\n2. maps\n3. a kite\nthe log kept 3 lines; the last is 3. a kite\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc unload() {\n\tdefer recover() // recover is not CALLED by a deferred function here\n\tpanic(\"crate dropped\")\n}\n\nfunc main() {\n\tfmt.Println(\"unloading\")\n\tunload()\n\tfmt.Println(\"all unloaded\")\n}\n",
   "stdout": "unloading\n",
   "stderr": "panic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x3e\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4e\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "unloading\n",
     "err": "panic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x3e\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4e\nexit status 2\n",
     "exit": 1,
     "merged": "unloading\npanic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x3e\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4e\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "unloading\n",
    "stderr": "panic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x52\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4f\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "unloading\n",
      "err": "panic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x52\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4f\nexit status 2\n",
      "exit": 1,
      "merged": "unloading\npanic: crate dropped\n\ngoroutine 1 [running]:\nmain.unload()\n\t/home/you/go-ch19/boss_err.go:7 +0x52\nmain.main()\n\t/home/you/go-ch19/boss_err.go:12 +0x4f\nexit status 2\n"
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\ntype CodeErr struct{ Code int }\n\nfunc (e *CodeErr) Error() string { return fmt.Sprintf(\"code %d\", e.Code) }\n\nfunc send() error {\n\treturn fmt.Errorf(\"send: %w\", &CodeErr{Code: 404})\n}\n\nfunc main() {\n\terr := send()\n\tvar ce *CodeErr\n\tif errors.As(err, &ce) {\n\t\tfmt.Println(\"server said\", ce.Code)\n\t}\n}\n",
   "stdout": "server said 404\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "server said 404\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"io/fs\"\n\t\"os\"\n)\n\nfunc load(name string) {\n\t_, err := os.ReadFile(name)\n\tif err != nil {\n\t\terr = fmt.Errorf(\"reading orders: %w\", err)\n\t}\n\tif errors.Is(err, fs.ErrNotExist) {\n\t\tfmt.Println(\"no orders yet:\", err)\n\t\treturn\n\t}\n\tfmt.Println(\"orders loaded, err =\", err)\n}\n\nfunc main() {\n\tload(\"missing.txt\")\n\tload(\"orders.txt\")\n}\n",
   "stdout": "no orders yet: reading orders: open missing.txt: no such file or directory\norders loaded, err = <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "no orders yet: reading orders: open missing.txt: no such file or directory\norders loaded, err = <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrLost = errors.New(\"parcel lost\")\n\ntype TrackErr struct{ ID int }\n\nfunc (e *TrackErr) Error() string { return fmt.Sprintf(\"tracking %d failed\", e.ID) }\n\nfunc track(id int) error {\n\tvar te *TrackErr\n\tif id > 100 {\n\t\tte = &TrackErr{ID: id}\n\t}\n\tif id == 7 {\n\t\treturn fmt.Errorf(\"track %d: %w\", id, ErrLost)\n\t}\n\treturn te\n}\n\nfunc main() {\n\tfmt.Println(track(7))\n\tfmt.Println(errors.Is(track(7), ErrLost))\n\tfmt.Println(track(5) == nil)\n}\n",
   "stdout": "track 7: parcel lost\ntrue\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "track 7: parcel lost\ntrue\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrBusy = errors.New(\"courier busy\")\n\nfunc book(slot int) error {\n\tif slot == 9 {\n\t\treturn fmt.Errorf(\"slot %d: %w\", slot, ErrBusy)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := book(9)\n\tif err == ErrBusy {\n\t\tfmt.Println(\"busy: try another slot\")\n\t} else if err != nil {\n\t\tfmt.Println(\"give up:\", err)\n\t}\n}\n",
   "stdout": "give up: slot 9: courier busy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "give up: slot 9: courier busy\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrLate = errors.New(\"late\")\n\nfunc main() {\n\terr := fmt.Errorf(\"day 3: %w\", fmt.Errorf(\"van 2: %w\", ErrLate))\n\tdepth := 0\n\tfor e := err; e != nil; e = errors.Unwrap(e) {\n\t\tfmt.Println(depth, e == ErrLate, errors.Is(e, ErrLate))\n\t\tdepth++\n\t}\n}\n",
   "stdout": "0 false true\n1 false true\n2 true true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "0 false true\n1 false true\n2 true true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "check_bad.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n)\n\ntype Logger struct{ lines int }\n\nfunc (l *Logger) Write(s string) error {\n\tl.lines++\n\treturn nil\n}\n\n// Compile-time check: does *Logger fit the io.Writer plug?\nvar _ io.Writer = (*Logger)(nil)\n\nfunc main() {\n\tfmt.Println(\"never runs\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./check_bad.go:16:19: cannot use (*Logger)(nil) (value of type *Logger) as io.Writer value in variable declaration: *Logger does not implement io.Writer (wrong type for method Write)\n\t\thave Write(string) error\n\t\twant Write([]byte) (int, error)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run check_bad.go",
     "out": "",
     "err": "# command-line-arguments\n./check_bad.go:16:19: cannot use (*Logger)(nil) (value of type *Logger) as io.Writer value in variable declaration: *Logger does not implement io.Writer (wrong type for method Write)\n\t\thave Write(string) error\n\t\twant Write([]byte) (int, error)\n",
     "exit": 1
    }
   ]
  },
  "consumer.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// The dispatcher needs ONE thing from a courier, so it\n// declares a tiny interface right here, where it is used.\ntype deliverer interface {\n\tDeliver(addr string) string\n}\n\nfunc dispatch(d deliverer, addrs ...string) {\n\tfor _, a := range addrs {\n\t\tfmt.Println(d.Deliver(a))\n\t}\n}\n\ntype Bike struct{ Rider string }\n\nfunc (b Bike) Deliver(addr string) string { return b.Rider + \" cycled to \" + addr }\nfunc (b Bike) PumpTyres()                 {} // dispatch never needs this\n\ntype Drone struct{ ID int }\n\nfunc (d Drone) Deliver(addr string) string { return fmt.Sprintf(\"drone %d flew to %s\", d.ID, addr) }\n\nfunc main() {\n\tdispatch(Bike{Rider: \"Scoot\"}, \"Pipe St\", \"Bolt Rd\")\n\tdispatch(Drone{ID: 7}, \"the roof\")\n}\n",
   "stdout": "Scoot cycled to Pipe St\nScoot cycled to Bolt Rd\ndrone 7 flew to the roof\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run consumer.go",
     "out": "Scoot cycled to Pipe St\nScoot cycled to Bolt Rd\ndrone 7 flew to the roof\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "copy.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\tsrc := strings.NewReader(\"Deliver to: 12 Pipe Street\\n\")\n\tn, err := io.Copy(os.Stdout, src) // reader -> writer, until EOF\n\tfmt.Println(\"copied\", n, \"bytes, err:\", err)\n\n\tvar buf bytes.Buffer\n\tif _, err := io.Copy(&buf, strings.NewReader(\"into a buffer\")); err != nil {\n\t\tfmt.Println(\"copy failed:\", err)\n\t}\n\tfmt.Println(\"buffer:\", buf.String())\n}\n",
   "stdout": "Deliver to: 12 Pipe Street\ncopied 27 bytes, err: <nil>\nbuffer: into a buffer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy.go",
     "out": "Deliver to: 12 Pipe Street\ncopied 27 bytes, err: <nil>\nbuffer: into a buffer\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "custom.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// WeightErr is a custom error type: it carries details.\ntype WeightErr struct {\n\tKg, Max int\n}\n\nfunc (e *WeightErr) Error() string {\n\treturn fmt.Sprintf(\"%d kg is over the %d kg limit\", e.Kg, e.Max)\n}\n\nfunc load(kg int) error {\n\tif kg > 20 {\n\t\treturn fmt.Errorf(\"loading van: %w\", &WeightErr{Kg: kg, Max: 20})\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := load(24)\n\tfmt.Println(err)\n\n\tvar we *WeightErr // errors.As fills this in\n\tif errors.As(err, &we) {\n\t\tfmt.Println(\"As: too heavy by\", we.Kg-we.Max, \"kg\")\n\t}\n\n\tif we, ok := errors.AsType[*WeightErr](err); ok { // Go 1.26+\n\t\tfmt.Println(\"AsType: the limit is\", we.Max, \"kg\")\n\t}\n}\n",
   "stdout": "loading van: 24 kg is over the 20 kg limit\nAs: too heavy by 4 kg\nAsType: the limit is 20 kg\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run custom.go",
     "out": "loading van: 24 kg is over the 20 kg limit\nAs: too heavy by 4 kg\nAsType: the limit is 20 kg\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./custom.go:33:22: undefined: errors.AsType\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run custom.go",
      "out": "",
      "err": "# command-line-arguments\n./custom.go:33:22: undefined: errors.AsType\n",
      "exit": 1
     }
    ]
   }
  },
  "dolls.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar (\n\tErrNoStamp  = errors.New(\"no stamp\")\n\tErrTooHeavy = errors.New(\"too heavy\")\n)\n\nfunc main() {\n\tinner := fmt.Errorf(\"parcel 42: %w\", ErrNoStamp)\n\terr := fmt.Errorf(\"route B: %w\", inner)\n\n\tfor e := err; e != nil; e = errors.Unwrap(e) {\n\t\tfmt.Println(\"doll:\", e)\n\t}\n\tfmt.Println(\"Is ErrNoStamp:\", errors.Is(err, ErrNoStamp))\n\tfmt.Println(\"Is ErrTooHeavy:\", errors.Is(err, ErrTooHeavy))\n}\n",
   "stdout": "doll: route B: parcel 42: no stamp\ndoll: parcel 42: no stamp\ndoll: no stamp\nIs ErrNoStamp: true\nIs ErrTooHeavy: false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run dolls.go",
     "out": "doll: route B: parcel 42: no stamp\ndoll: parcel 42: no stamp\ndoll: no stamp\nIs ErrNoStamp: true\nIs ErrTooHeavy: false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_check.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"strings\"\n)\n\ntype Upper struct{ out *strings.Builder }\n\nfunc (u Upper) Write(p []byte) (int, error) {\n\treturn u.out.WriteString(strings.ToUpper(string(p)))\n}\n\nvar _ io.Writer = Upper{}\n\nfunc main() {\n\tvar sb strings.Builder\n\tfmt.Fprint(Upper{out: &sb}, \"quiet please\")\n\tfmt.Println(sb.String())\n}\n",
   "stdout": "QUIET PLEASE\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_check.go",
     "out": "QUIET PLEASE\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_wrap.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrFlat = errors.New(\"flat tyre\")\n\nfunc ride() error { return ErrFlat }\n\nfunc deliver(id int) error {\n\tif err := ride(); err != nil {\n\t\treturn fmt.Errorf(\"parcel %d: %w\", id, err)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := deliver(7)\n\tfmt.Println(err)\n\tfmt.Println(errors.Is(err, ErrFlat))\n}\n",
   "stdout": "parcel 7: flat tyre\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_wrap.go",
     "out": "parcel 7: flat tyre\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_write.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// Tally is a Writer that only counts the bytes it is given.\ntype Tally struct {\n\tn int\n}\n\nfunc (t *Tally) Write(p []byte) (int, error) {\n\tt.n += len(p)\n\treturn len(p), nil\n}\n\nfunc main() {\n\tvar t Tally\n\tfmt.Fprint(&t, \"hello\")\n\tfmt.Fprint(&t, \" world\")\n\tfmt.Println(\"bytes written:\", t.n)\n}\n",
   "stdout": "bytes written: 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_write.go",
     "out": "bytes written: 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "is_machine.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrNoStamp = errors.New(\"no stamp\")\n\nfunc main() {\n\twrapped := fmt.Errorf(\"parcel 42: %w\", ErrNoStamp)\n\tflat := fmt.Errorf(\"parcel 42: %v\", ErrNoStamp)\n\n\tfmt.Println(\"errors.Is(ErrNoStamp, ErrNoStamp) =\", errors.Is(ErrNoStamp, ErrNoStamp))\n\tfmt.Println(\"errors.Is(wrapped, ErrNoStamp) =\", errors.Is(wrapped, ErrNoStamp))\n\tfmt.Println(\"wrapped == ErrNoStamp =\", wrapped == ErrNoStamp)\n\tfmt.Println(\"errors.Is(flat, ErrNoStamp) =\", errors.Is(flat, ErrNoStamp))\n\tfmt.Println(\"errors.Is(nil, ErrNoStamp) =\", errors.Is(nil, ErrNoStamp))\n}\n",
   "stdout": "errors.Is(ErrNoStamp, ErrNoStamp) = true\nerrors.Is(wrapped, ErrNoStamp) = true\nwrapped == ErrNoStamp = false\nerrors.Is(flat, ErrNoStamp) = false\nerrors.Is(nil, ErrNoStamp) = false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run is_machine.go",
     "out": "errors.Is(ErrNoStamp, ErrNoStamp) = true\nerrors.Is(wrapped, ErrNoStamp) = true\nwrapped == ErrNoStamp = false\nerrors.Is(flat, ErrNoStamp) = false\nerrors.Is(nil, ErrNoStamp) = false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "join.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrNoName = errors.New(\"name is empty\")\n\nfunc validate(name string, kg int) error {\n\tvar errs []error\n\tif name == \"\" {\n\t\terrs = append(errs, ErrNoName)\n\t}\n\tif kg <= 0 {\n\t\terrs = append(errs, fmt.Errorf(\"weight %d: must be above 0\", kg))\n\t}\n\treturn errors.Join(errs...) // nil when errs is empty\n}\n\nfunc main() {\n\terr := validate(\"\", -2)\n\tfmt.Println(err)\n\tfmt.Println(\"---\")\n\tfmt.Println(\"no name?\", errors.Is(err, ErrNoName))\n\tfmt.Println(\"all good?\", validate(\"Ana\", 3) == nil)\n}\n",
   "stdout": "name is empty\nweight -2: must be above 0\n---\nno name? true\nall good? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run join.go",
     "out": "name is empty\nweight -2: must be above 0\n---\nno name? true\nall good? true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_context.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc readSettings() error {\n\t_, err := os.ReadFile(\"nope\")\n\treturn err\n}\n\nfunc startShift() error {\n\treturn readSettings()\n}\n\nfunc main() {\n\tif err := startShift(); err != nil {\n\t\tfmt.Println(\"error:\", err)\n\t}\n}\n",
   "stdout": "error: open nope: no such file or directory\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run no_context.go",
     "out": "error: open nope: no such file or directory\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_recover.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc get(s []int, i int) int {\n\treturn s[i]\n}\n\nfunc main() {\n\tfmt.Println(get([]int{10}, 0))\n\tfmt.Println(get(nil, 1))\n\tfmt.Println(\"still running\")\n}\n",
   "stdout": "10\n",
   "stderr": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x54\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run no_recover.go",
     "out": "10\n",
     "err": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x54\nexit status 2\n",
     "exit": 1,
     "merged": "10\npanic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x54\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "10\n",
    "stderr": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x65\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run no_recover.go",
      "out": "10\n",
      "err": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x65\nexit status 2\n",
      "exit": 1,
      "merged": "10\npanic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.get(...)\n\t/home/you/go-ch19/no_recover.go:6\nmain.main()\n\t/home/you/go-ch19/no_recover.go:11 +0x65\nexit status 2\n"
     }
    ]
   }
  },
  "once.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"log\"\n)\n\nfunc saveParcel(id int) error {\n\tif id <= 0 {\n\t\treturn fmt.Errorf(\"parcel %d: bad id\", id) // just return it\n\t}\n\treturn nil\n}\n\nfunc deliver(id int) error {\n\tif err := saveParcel(id); err != nil {\n\t\treturn fmt.Errorf(\"deliver: %w\", err) // add context, pass it up\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tlog.SetFlags(0)\n\tif err := deliver(-1); err != nil {\n\t\tlog.Println(\"ERROR:\", err) // handled ONCE, at the top\n\t}\n}\n",
   "stdout": "",
   "stderr": "ERROR: deliver: parcel -1: bad id\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run once.go",
     "out": "",
     "err": "ERROR: deliver: parcel -1: bad id\n",
     "exit": 0
    }
   ]
  },
  "parsons_as.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\ntype LateErr struct{ Mins int }\n\nfunc (e *LateErr) Error() string { return fmt.Sprintf(\"%d min late\", e.Mins) }\n\nfunc refund(err error) {\n\tlate, ok := errors.AsType[*LateErr](err)\n\tif !ok {\n\t\tfmt.Println(\"no refund:\", err)\n\t\treturn\n\t}\n\tfmt.Println(\"refund for\", late.Mins, \"minutes\")\n}\n\nfunc main() {\n\trefund(fmt.Errorf(\"parcel 9: %w\", &LateErr{Mins: 12}))\n\trefund(errors.New(\"parcel 4: lost\"))\n}\n",
   "stdout": "refund for 12 minutes\nno refund: parcel 4: lost\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_as.go",
     "out": "refund for 12 minutes\nno refund: parcel 4: lost\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./parsons_as.go:13:21: undefined: errors.AsType\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run parsons_as.go",
      "out": "",
      "err": "# command-line-arguments\n./parsons_as.go:13:21: undefined: errors.AsType\n",
      "exit": 1
     }
    ]
   }
  },
  "parsons_recover.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc guard(name string) {\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\tfmt.Println(name, \"recovered from:\", r)\n\t\t}\n\t}()\n\tpanic(\"conveyor jammed\")\n}\n\nfunc main() {\n\tguard(\"belt 2\")\n\tfmt.Println(\"the depot keeps running\")\n}\n",
   "stdout": "belt 2 recovered from: conveyor jammed\nthe depot keeps running\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_recover.go",
     "out": "belt 2 recovered from: conveyor jammed\nthe depot keeps running\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_copy.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\tvar buf bytes.Buffer\n\tn, err := io.Copy(&buf, strings.NewReader(\"tea\"))\n\tfmt.Println(n, err)\n\tfmt.Fprint(&buf, \" and cake\")\n\tio.Copy(os.Stdout, &buf) // reading a buffer empties it\n\tfmt.Println()\n\tfmt.Println(\"left:\", buf.Len())\n}\n",
   "stdout": "3 <nil>\ntea and cake\nleft: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_copy.go",
     "out": "3 <nil>\ntea and cake\nleft: 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_is.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrClosed = errors.New(\"shop closed\")\n\nfunc buy() error { return ErrClosed }\n\nfunc shop() error {\n\tif err := buy(); err != nil {\n\t\treturn fmt.Errorf(\"shop: %w\", err)\n\t}\n\treturn nil\n}\n\nfunc trip() error {\n\tif err := shop(); err != nil {\n\t\treturn fmt.Errorf(\"trip: %w\", err)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := trip()\n\tfmt.Println(err)\n\tfmt.Println(err == ErrClosed)\n\tfmt.Println(errors.Is(err, ErrClosed))\n}\n",
   "stdout": "trip: shop: shop closed\nfalse\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_is.go",
     "out": "trip: shop: shop closed\nfalse\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_nil.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype LateErr struct{ Mins int }\n\nfunc (e *LateErr) Error() string { return fmt.Sprintf(\"late by %d min\", e.Mins) }\n\nfunc deliver(mins int) *LateErr {\n\tif mins > 30 {\n\t\treturn &LateErr{Mins: mins}\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tp := deliver(10)\n\tfmt.Println(p == nil)\n\n\tvar err error = deliver(10)\n\tfmt.Println(err == nil)\n\n\terr = deliver(45)\n\tfmt.Println(err)\n}\n",
   "stdout": "true\nfalse\nlate by 45 min\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_nil.go",
     "out": "true\nfalse\nlate by 45 min\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_recover.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc risky(n int) (msg string) {\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\tmsg = fmt.Sprint(\"caught: \", r)\n\t\t}\n\t}()\n\tif n == 0 {\n\t\tpanic(\"zero parcels\")\n\t}\n\treturn \"ok\"\n}\n\nfunc main() {\n\tfmt.Println(risky(3))\n\tfmt.Println(risky(0))\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "ok\ncaught: zero parcels\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_recover.go",
     "out": "ok\ncaught: zero parcels\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "read_chunks.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"strings\"\n)\n\nfunc main() {\n\tr := strings.NewReader(\"parcels!\")\n\tbuf := make([]byte, 3) // a bucket that holds 3 bytes\n\tfor {\n\t\tn, err := r.Read(buf)\n\t\tfmt.Printf(\"n=%d  got %q  err=%v\\n\", n, buf[:n], err)\n\t\tif err == io.EOF {\n\t\t\tbreak\n\t\t}\n\t}\n}\n",
   "stdout": "n=3  got \"par\"  err=<nil>\nn=3  got \"cel\"  err=<nil>\nn=2  got \"s!\"  err=<nil>\nn=0  got \"\"  err=EOF\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run read_chunks.go",
     "out": "n=3  got \"par\"  err=<nil>\nn=3  got \"cel\"  err=<nil>\nn=2  got \"s!\"  err=<nil>\nn=0  got \"\"  err=EOF\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "recover.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc safeGet(s []int, i int) (v int) {\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\tfmt.Println(\"recovered:\", r)\n\t\t\tv = -1\n\t\t}\n\t}()\n\treturn s[i]\n}\n\nfunc main() {\n\tfmt.Println(safeGet([]int{10}, 0))\n\tfmt.Println(safeGet(nil, 1))\n\tfmt.Println(\"still running\")\n}\n",
   "stdout": "10\nrecovered: runtime error: index out of range [1] with length 0\n-1\nstill running\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run recover.go",
     "out": "10\nrecovered: runtime error: index out of range [1] with length 0\n-1\nstill running\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "recover_early.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc safeGet(s []int, i int) int {\n\tif r := recover(); r != nil { // too early: nothing has panicked yet\n\t\tfmt.Println(\"recovered:\", r)\n\t}\n\treturn s[i]\n}\n\nfunc main() {\n\tfmt.Println(safeGet(nil, 1))\n\tfmt.Println(\"still running\")\n}\n",
   "stdout": "",
   "stderr": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.safeGet({0x0, 0x0, 0x0?}, 0x1)\n\t/home/you/go-ch19/recover_early.go:9 +0x8f\nmain.main()\n\t/home/you/go-ch19/recover_early.go:13 +0x25\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run recover_early.go",
     "out": "",
     "err": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.safeGet({0x0, 0x0, 0x0?}, 0x1)\n\t/home/you/go-ch19/recover_early.go:9 +0x8f\nmain.main()\n\t/home/you/go-ch19/recover_early.go:13 +0x25\nexit status 2\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.safeGet({0x0, 0x0, 0x0?}, 0x1)\n\t/home/you/go-ch19/recover_early.go:9 +0x99\nmain.main()\n\t/home/you/go-ch19/recover_early.go:13 +0x25\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run recover_early.go",
      "out": "",
      "err": "panic: runtime error: index out of range [1] with length 0\n\ngoroutine 1 [running]:\nmain.safeGet({0x0, 0x0, 0x0?}, 0x1)\n\t/home/you/go-ch19/recover_early.go:9 +0x99\nmain.main()\n\t/home/you/go-ch19/recover_early.go:13 +0x25\nexit status 2\n",
      "exit": 1
     }
    ]
   }
  },
  "recover_err.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc mustNum(s string) int {\n\tn, err := strconv.Atoi(s)\n\tif err != nil {\n\t\tpanic(err) // deep inside: give up loudly\n\t}\n\treturn n\n}\n\n// sum turns a panic from mustNum back into an ordinary error.\nfunc sum(words []string) (total int, err error) {\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\ttotal, err = 0, fmt.Errorf(\"sum: %v\", r)\n\t\t}\n\t}()\n\tfor _, w := range words {\n\t\ttotal += mustNum(w)\n\t}\n\treturn total, nil\n}\n\nfunc main() {\n\tfmt.Println(sum([]string{\"1\", \"2\", \"3\"}))\n\tfmt.Println(sum([]string{\"1\", \"two\", \"3\"}))\n}\n",
   "stdout": "6 <nil>\n0 sum: strconv.Atoi: parsing \"two\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run recover_err.go",
     "out": "6 <nil>\n0 sum: strconv.Atoi: parsing \"two\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rot13.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\n// rot13Reader wraps another Reader and scrambles letters 13 places.\ntype rot13Reader struct {\n\tsrc   io.Reader\n\ttrips []int // how many bytes each Read call passed on\n}\n\nfunc rot13(b byte) byte {\n\tswitch {\n\tcase b >= 'a' && b <= 'z':\n\t\treturn 'a' + (b-'a'+13)%26\n\tcase b >= 'A' && b <= 'Z':\n\t\treturn 'A' + (b-'A'+13)%26\n\t}\n\treturn b\n}\n\nfunc (r *rot13Reader) Read(p []byte) (int, error) {\n\tif len(p) > 5 {\n\t\tp = p[:5] // a narrow pipe: at most 5 bytes per trip\n\t}\n\tn, err := r.src.Read(p)\n\tfor i := 0; i < n; i++ {\n\t\tp[i] = rot13(p[i])\n\t}\n\tr.trips = append(r.trips, n)\n\treturn n, err\n}\n\nfunc main() {\n\tsecret := strings.NewReader(\"Uryyb, Fpbbg!\\n\")\n\tpipe := &rot13Reader{src: secret}\n\tn, err := io.Copy(os.Stdout, pipe)\n\tfmt.Println(\"copied\", n, \"bytes, err:\", err)\n\tfmt.Println(\"trips:\", pipe.trips)\n}\n",
   "stdout": "Hello, Scoot!\ncopied 14 bytes, err: <nil>\ntrips: [5 5 4 0]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run rot13.go",
     "out": "Hello, Scoot!\ncopied 14 bytes, err: <nil>\ntrips: [5 5 4 0]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sentinel.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// Sentinel errors: fixed values that callers can check for.\nvar (\n\tErrNotFound = errors.New(\"not found\")\n\tErrNoAccess = errors.New(\"no access\")\n)\n\nvar lockers = map[int]string{1: \"tea\", 2: \"maps\", 3: \"gold\"}\n\nfunc open(n int) (string, error) {\n\tif n == 3 {\n\t\treturn \"\", fmt.Errorf(\"locker %d: %w\", n, ErrNoAccess)\n\t}\n\titem, ok := lockers[n]\n\tif !ok {\n\t\treturn \"\", fmt.Errorf(\"locker %d: %w\", n, ErrNotFound)\n\t}\n\treturn item, nil\n}\n\nfunc main() {\n\tfor _, n := range []int{1, 3, 9} {\n\t\titem, err := open(n)\n\t\tswitch {\n\t\tcase errors.Is(err, ErrNotFound):\n\t\t\tfmt.Println(\"no such locker:\", err)\n\t\tcase errors.Is(err, ErrNoAccess):\n\t\t\tfmt.Println(\"ask at the desk:\", err)\n\t\tcase err != nil:\n\t\t\tfmt.Println(\"something else:\", err)\n\t\tdefault:\n\t\t\tfmt.Println(\"got\", item)\n\t\t}\n\t}\n}\n",
   "stdout": "got tea\nask at the desk: locker 3: no access\nno such locker: locker 9: not found\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sentinel.go",
     "out": "got tea\nask at the desk: locker 3: no access\nno such locker: locker 9: not found\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shout.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n)\n\n// Shouter is a Writer that passes everything on IN CAPITALS.\ntype Shouter struct {\n\tout io.Writer\n}\n\nfunc (s Shouter) Write(p []byte) (int, error) {\n\treturn s.out.Write(bytes.ToUpper(p))\n}\n\nfunc main() {\n\tloud := Shouter{out: os.Stdout}\n\tfmt.Fprintln(loud, \"parcel for room 7\")\n\tfmt.Fprintf(loud, \"%d boxes, handle with care\\n\", 3)\n\tfmt.Println(\"(this line is not shouted)\")\n}\n",
   "stdout": "PARCEL FOR ROOM 7\n3 BOXES, HANDLE WITH CARE\n(this line is not shouted)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shout.go",
     "out": "PARCEL FOR ROOM 7\n3 BOXES, HANDLE WITH CARE\n(this line is not shouted)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_nil.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype FormErr struct{ Field string }\n\nfunc (e *FormErr) Error() string { return e.Field + \" is missing\" }\n\nfunc validate(name string) error {\n\tvar problem *FormErr\n\tif name == \"\" {\n\t\tproblem = &FormErr{Field: \"name\"}\n\t}\n\treturn problem\n}\n\nfunc main() {\n\tif err := validate(\"Ana\"); err != nil {\n\t\tfmt.Println(\"form rejected:\", err)\n\t\treturn\n\t}\n\tfmt.Println(\"form accepted\")\n}\n",
   "stdout": "form rejected: <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_nil.go",
     "out": "form rejected: <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_twice.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc charge(cents int) error {\n\tif cents < 0 {\n\t\terr := errors.New(\"negative amount\")\n\t\tfmt.Println(\"warning:\", err)\n\t\treturn err\n\t}\n\treturn nil\n}\n\nfunc checkout(cents int) error {\n\tif err := charge(cents); err != nil {\n\t\treturn fmt.Errorf(\"checkout: %w\", err)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tif err := checkout(-50); err != nil {\n\t\tfmt.Println(\"warning:\", err)\n\t}\n}\n",
   "stdout": "warning: negative amount\nwarning: checkout: negative amount\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_twice.go",
     "out": "warning: negative amount\nwarning: checkout: negative amount\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_join.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc main() {\n\tvar errs []error\n\tfor _, kg := range []int{4, 25, 0, 9, 30} {\n\t\tif kg <= 0 || kg > 20 {\n\t\t\terrs = append(errs, fmt.Errorf(\"bad weight %d\", kg))\n\t\t}\n\t\tfmt.Println(kg, len(errs), errors.Join(errs...) == nil)\n\t}\n}\n",
   "stdout": "4 0 true\n25 1 false\n0 2 false\n9 2 false\n30 3 false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_join.go",
     "out": "4 0 true\n25 1 false\n0 2 false\n9 2 false\n30 3 false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_read.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"strings\"\n)\n\nfunc main() {\n\tr := strings.NewReader(\"Scoot!!\")\n\tbuf := make([]byte, 2)\n\tfor {\n\t\tn, err := r.Read(buf)\n\t\tfmt.Printf(\"%d %q %v\\n\", n, buf[:n], err)\n\t\tif err == io.EOF {\n\t\t\tbreak\n\t\t}\n\t}\n}\n",
   "stdout": "2 \"Sc\" <nil>\n2 \"oo\" <nil>\n2 \"t!\" <nil>\n1 \"!\" <nil>\n0 \"\" EOF\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_read.go",
     "out": "2 \"Sc\" <nil>\n2 \"oo\" <nil>\n2 \"t!\" <nil>\n1 \"!\" <nil>\n0 \"\" EOF\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "twice.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"log\"\n)\n\nfunc saveParcel(id int) error {\n\tif id <= 0 {\n\t\terr := fmt.Errorf(\"parcel %d: bad id\", id)\n\t\tlog.Println(\"ERROR:\", err) // handled here...\n\t\treturn err                 // ...AND passed up\n\t}\n\treturn nil\n}\n\nfunc deliver(id int) error {\n\tif err := saveParcel(id); err != nil {\n\t\tlog.Println(\"ERROR:\", err) // ...handled again...\n\t\treturn fmt.Errorf(\"deliver: %w\", err)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tlog.SetFlags(0) // no timestamps, so every run looks the same\n\tif err := deliver(-1); err != nil {\n\t\tlog.Println(\"ERROR:\", err) // ...and a third time\n\t}\n}\n",
   "stdout": "",
   "stderr": "ERROR: parcel -1: bad id\nERROR: parcel -1: bad id\nERROR: deliver: parcel -1: bad id\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run twice.go",
     "out": "",
     "err": "ERROR: parcel -1: bad id\nERROR: parcel -1: bad id\nERROR: deliver: parcel -1: bad id\n",
     "exit": 0
    }
   ]
  },
  "two_slots.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n)\n\ntype Note struct{ text string }\n\nfunc (n *Note) Write(p []byte) (int, error) {\n\tn.text += string(p)\n\treturn len(p), nil\n}\n\nfunc main() {\n\tvar w io.Writer // an empty box: no type, no value\n\tfmt.Printf(\"%-10T %-6v nil? %t\\n\", w, w, w == nil)\n\n\tw = os.Stdout // type *os.File, value: the screen\n\tfmt.Printf(\"%-10T %-6s nil? %t\\n\", w, \"screen\", w == nil)\n\n\tvar n *Note // a nil pointer: no Note exists yet\n\tw = n       // the box now has a TYPE, even though the value is nil\n\tfmt.Printf(\"%-10T %-6v nil? %t\\n\", w, w, w == nil)\n}\n",
   "stdout": "<nil>      <nil>  nil? true\n*os.File   screen nil? false\n*main.Note <nil>  nil? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run two_slots.go",
     "out": "<nil>      <nil>  nil? true\n*os.File   screen nil? false\n*main.Note <nil>  nil? false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "typed_nil.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype CheckErr struct{ Reason string }\n\nfunc (e *CheckErr) Error() string { return \"check failed: \" + e.Reason }\n\n// check reports a problem if the parcel is too heavy.\nfunc check(kg int) error {\n\tvar e *CheckErr // nil: no problem found yet\n\tif kg > 20 {\n\t\te = &CheckErr{Reason: \"too heavy\"}\n\t}\n\treturn e // BUG: the box always gets a type\n}\n\nfunc main() {\n\terr := check(5)\n\tfmt.Println(\"err == nil:\", err == nil)\n\tfmt.Printf(\"type %T, value %v\\n\", err, err)\n\tif err != nil {\n\t\tfmt.Println(\"parcel rejected!\")\n\t}\n}\n",
   "stdout": "err == nil: false\ntype *main.CheckErr, value <nil>\nparcel rejected!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run typed_nil.go",
     "out": "err == nil: false\ntype *main.CheckErr, value <nil>\nparcel rejected!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "typed_nil_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype CheckErr struct{ Reason string }\n\nfunc (e *CheckErr) Error() string { return \"check failed: \" + e.Reason }\n\n// check reports a problem if the parcel is too heavy.\nfunc check(kg int) error {\n\tif kg > 20 {\n\t\treturn &CheckErr{Reason: \"too heavy\"}\n\t}\n\treturn nil // an empty box: no type, no value\n}\n\nfunc main() {\n\terr := check(5)\n\tfmt.Println(\"err == nil:\", err == nil)\n\tfmt.Printf(\"type %T, value %v\\n\", err, err)\n\tif err != nil {\n\t\tfmt.Println(\"parcel rejected!\")\n\t}\n}\n",
   "stdout": "err == nil: true\ntype <nil>, value <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run typed_nil_fix.go",
     "out": "err == nil: true\ntype <nil>, value <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wrap.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"io/fs\"\n\t\"os\"\n)\n\nfunc loadConfig(name string) error {\n\tf, err := os.Open(name)\n\tif err != nil {\n\t\treturn fmt.Errorf(\"loading config: %w\", err)\n\t}\n\tdefer f.Close()\n\treturn nil\n}\n\nfunc main() {\n\terr := loadConfig(\"nope\")\n\tfmt.Println(err)\n\tfmt.Println(\"err == fs.ErrNotExist:\", err == fs.ErrNotExist)\n\tfmt.Println(\"errors.Is(err, fs.ErrNotExist):\", errors.Is(err, fs.ErrNotExist))\n}\n",
   "stdout": "loading config: open nope: no such file or directory\nerr == fs.ErrNotExist: false\nerrors.Is(err, fs.ErrNotExist): true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wrap.go",
     "out": "loading config: open nope: no such file or directory\nerr == fs.ErrNotExist: false\nerrors.Is(err, fs.ErrNotExist): true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wrap_ptr.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// DiskFull's Error method has a VALUE receiver.\ntype DiskFull struct{ Drive string }\n\nfunc (e DiskFull) Error() string { return \"disk \" + e.Drive + \" is full\" }\n\nvar ErrDiskC = DiskFull{Drive: \"C\"}\n\nfunc backup() error {\n\terr := ErrDiskC\n\treturn fmt.Errorf(\"backup: %w\", &err) // BUG: wraps a POINTER to the error\n}\n\nfunc main() {\n\terr := backup()\n\tfmt.Println(err)\n\tfmt.Println(\"disk C full?\", errors.Is(err, ErrDiskC))\n}\n",
   "stdout": "",
   "stderr": "wrap_ptr.go:17:29: %w wants operand of error type DiskFull, not pointer type *DiskFull (defeats errors.Is)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run wrap_ptr.go",
     "out": "backup: disk C is full\ndisk C full? false\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "go vet wrap_ptr.go",
     "out": "",
     "err": "wrap_ptr.go:17:29: %w wants operand of error type DiskFull, not pointer type *DiskFull (defeats errors.Is)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run wrap_ptr.go",
      "out": "backup: disk C is full\ndisk C full? false\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "go vet wrap_ptr.go",
      "out": "",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "wrap_v.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"io/fs\"\n\t\"os\"\n)\n\nfunc main() {\n\t_, err := os.Open(\"nope\")\n\tw := fmt.Errorf(\"loading config: %w\", err) // wrap: keep the doll inside\n\tv := fmt.Errorf(\"loading config: %v\", err) // copy the words only\n\n\tfmt.Println(\"w:\", w)\n\tfmt.Println(\"v:\", v)\n\tfmt.Println(\"same text?\", w.Error() == v.Error())\n\tfmt.Println(\"w Is ErrNotExist?\", errors.Is(w, fs.ErrNotExist))\n\tfmt.Println(\"v Is ErrNotExist?\", errors.Is(v, fs.ErrNotExist))\n}\n",
   "stdout": "w: loading config: open nope: no such file or directory\nv: loading config: open nope: no such file or directory\nsame text? true\nw Is ErrNotExist? true\nv Is ErrNotExist? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wrap_v.go",
     "out": "w: loading config: open nope: no such file or directory\nv: loading config: open nope: no such file or directory\nsame text? true\nw Is ErrNotExist? true\nv Is ErrNotExist? false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "writers.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\n// greet writes to ANY Writer: all it needs is a Write method.\nfunc greet(w io.Writer, name string) {\n\tfmt.Fprintf(w, \"Hi %s, your parcel is here!\\n\", name)\n}\n\nfunc main() {\n\tgreet(os.Stdout, \"Ana\") // straight to the screen\n\n\tvar buf bytes.Buffer // a growable box of bytes\n\tgreet(&buf, \"Bo\")\n\tfmt.Println(\"the buffer holds\", buf.Len(), \"bytes\")\n\n\tvar sb strings.Builder // builds one long string\n\tgreet(&sb, \"Cy\")\n\tfmt.Print(\"the builder says: \", sb.String())\n}\n",
   "stdout": "Hi Ana, your parcel is here!\nthe buffer holds 28 bytes\nthe builder says: Hi Cy, your parcel is here!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run writers.go",
     "out": "Hi Ana, your parcel is here!\nthe buffer holds 28 bytes\nthe builder says: Hi Cy, your parcel is here!\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
