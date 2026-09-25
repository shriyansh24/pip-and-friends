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
  "workdir": "/home/you/go-ch18",
  "versionDifferences": [],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. Outputs were identical."
 },
 "programs": {
  "alias.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64 // a new type\ntype Temp = float64  // an alias: another name for float64\n\nfunc main() {\n\tvar c Celsius = 20\n\tvar t Temp = 20\n\tvar f float64 = 1.5\n\tfmt.Printf(\"%T %T\\n\", c, t)\n\tfmt.Println(t + f)\n\tvar b byte = 'A'\n\tvar r rune = 'A'\n\tfmt.Printf(\"%T %T\\n\", b, r)\n}\n",
   "stdout": "main.Celsius float64\n21.5\nuint8 int32\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run alias.go",
     "out": "main.Celsius float64\n21.5\nuint8 int32\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "alias_method.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Temp = float64\n\nfunc (t Temp) Show() string { return fmt.Sprint(t, \" degrees\") }\n\nfunc main() {\n\tvar t Temp = 20\n\tfmt.Println(t.Show())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./alias_method.go:7:9: cannot define new methods on non-local type Temp\n./alias_method.go:11:16: t.Show undefined (type Temp has no field or method Show)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run alias_method.go",
     "out": "",
     "err": "# command-line-arguments\n./alias_method.go:7:9: cannot define new methods on non-local type Temp\n./alias_method.go:11:16: t.Show undefined (type Temp has no field or method Show)\n",
     "exit": 1
    }
   ]
  },
  "ambiguous.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bread struct{ Name string }\ntype Filling struct{ Name string }\n\ntype Sandwich struct {\n\tBread\n\tFilling\n}\n\nfunc main() {\n\ts := Sandwich{Bread{\"rye\"}, Filling{\"cheese\"}}\n\tfmt.Println(s.Name)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./ambiguous.go:15:16: ambiguous selector s.Name\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run ambiguous.go",
     "out": "",
     "err": "# command-line-arguments\n./ambiguous.go:15:16: ambiguous selector s.Name\n",
     "exit": 1
    }
   ]
  },
  "ambiguous_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bread struct{ Name string }\ntype Filling struct{ Name string }\n\ntype Sandwich struct {\n\tBread\n\tFilling\n}\n\nfunc main() {\n\ts := Sandwich{Bread{\"rye\"}, Filling{\"cheese\"}}\n\tfmt.Println(s.Filling.Name, \"on\", s.Bread.Name)\n}\n",
   "stdout": "cheese on rye\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run ambiguous_fix.go",
     "out": "cheese on rye\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\ntype Size int\n\nconst Monday Weekday = 1\nconst Large Size = 3\n\nfunc plan(d Weekday) {\n\tfmt.Println(\"planning day\", int(d))\n}\n\nfunc main() {\n\tplan(Monday)\n\tplan(Large)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:17:7: cannot use Large (constant 3 of int type Size) as Weekday value in argument to plan\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:17:7: cannot use Large (constant 3 of int type Size) as Weekday value in argument to plan\n",
     "exit": 1
    }
   ]
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\n\nfunc (c Celsius) String() string { return fmt.Sprintf(\"%.0f°C\", float64(c)) }\n\ntype Reading = Celsius\ntype Raw Celsius\n\nfunc main() {\n\tvar r Reading = 21\n\tfmt.Println(r)\n\tfmt.Println(Raw(r))\n}\n",
   "stdout": "21°C\n21\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "21°C\n21\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Light struct {\n\tOn bool\n}\n\nfunc (l *Light) Toggle() { l.On = !l.On }\n\ntype Lamp struct {\n\tLight\n\tRoom string\n}\n\nfunc main() {\n\tl := Lamp{Room: \"hall\"}\n\tfmt.Println(l.Room, l.On)\n\tl.Toggle()\n\tfmt.Println(l.Room, l.On)\n\tl.Room = \"attic\"\n\tfmt.Println(l.Room, l.Light.On)\n}\n",
   "stdout": "hall false\nhall true\nattic true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "hall false\nhall true\nattic true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Size int\n\nconst (\n\tSmall Size = iota + 1\n\tMedium\n\tLarge\n)\n\nfunc (s Size) String() string {\n\treturn [...]string{\"?\", \"S\", \"M\", \"L\"}[s]\n}\n\ntype Cup struct {\n\tSize\n\tShots int\n}\n\nfunc main() {\n\tc := Cup{Medium, 2}\n\tfmt.Println(c)\n\tfmt.Printf(\"%d %d\\n\", c.Size, c.Shots)\n\tc.Size++\n\tfmt.Println(c.Size)\n}\n",
   "stdout": "M\n2 2\nL\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "M\n2 2\nL\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc CToF(c Celsius) Fahrenheit {\n\treturn Fahrenheit(c)\n}\n\nfunc main() {\n\tvar fever Celsius = 39\n\tif CToF(fever) > 100 {\n\t\tfmt.Println(\"fever!\")\n\t} else {\n\t\tfmt.Println(\"all fine:\", CToF(fever))\n\t}\n}\n",
   "stdout": "all fine: 39\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "all fine: 39\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Badge uint8\n\nconst (\n\tFast Badge = 1 << iota\n\tSafe\n\tKind\n)\n\nfunc main() {\n\tvar b Badge\n\tfor _, x := range []Badge{Safe, Fast, Safe, Kind} {\n\t\tb |= x\n\t\tfmt.Println(x, b, b&Fast != 0)\n\t}\n}\n",
   "stdout": "2 2 false\n1 3 true\n2 3 true\n4 7 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "2 2 false\n1 3 true\n2 3 true\n4 7 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "conv_machine.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }\n\nfunc main() {\n\tfor _, c := range []Celsius{100, 0, -40, 37, 180} {\n\t\tfmt.Printf(\"CToF(%v) = %v\\n\", c, CToF(c))\n\t}\n}\n",
   "stdout": "CToF(100) = 212\nCToF(0) = 32\nCToF(-40) = -40\nCToF(37) = 98.6\nCToF(180) = 356\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run conv_machine.go",
     "out": "CToF(100) = 212\nCToF(0) = 32\nCToF(-40) = -40\nCToF(37) = 98.6\nCToF(180) = 356\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "convert.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }\n\nfunc FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }\n\nfunc main() {\n\tvar oven Celsius = 180\n\tvar recipe Fahrenheit = 350\n\tfmt.Println(CToF(oven))\n\tfmt.Println(FToC(recipe))\n\tfmt.Println(Fahrenheit(oven))\n\tfmt.Println(float64(oven) + 0.5)\n}\n",
   "stdout": "356\n176.66666666666666\n180\n180.5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run convert.go",
     "out": "356\n176.66666666666666\n180\n180.5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cups.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc main() {\n\tvar oven Celsius = 180\n\tvar recipe Fahrenheit = 350\n\twarmer := oven + 20\n\tfmt.Println(oven, recipe, warmer)\n\tfmt.Printf(\"%T %T\\n\", oven, recipe)\n\tfmt.Println(oven > 100, warmer*2)\n}\n",
   "stdout": "180 350 200\nmain.Celsius main.Fahrenheit\ntrue 400\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run cups.go",
     "out": "180 350 200\nmain.Celsius main.Fahrenheit\ntrue 400\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "embed.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct {\n\tHP int\n}\n\nfunc (e Engine) Start() string {\n\treturn fmt.Sprintf(\"vroom (%d hp)\", e.HP)\n}\n\ntype Van struct {\n\tEngine\n\tPlate string\n}\n\nfunc main() {\n\tv := Van{Engine: Engine{HP: 150}, Plate: \"GO-123\"}\n\tfmt.Println(v.Plate, v.HP)\n\tfmt.Println(v.Start())\n\tfmt.Println(v.Engine.HP, v.Engine.Start())\n\tfmt.Printf(\"%+v\\n\", v)\n}\n",
   "stdout": "GO-123 150\nvroom (150 hp)\n150 vroom (150 hp)\n{Engine:{HP:150} Plate:GO-123}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run embed.go",
     "out": "GO-123 150\nvroom (150 hp)\n150 vroom (150 hp)\n{Engine:{HP:150} Plate:GO-123}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "enum_loose.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\n\nconst (\n\tSunday Weekday = iota\n\tMonday\n)\n\nfunc plan(d Weekday) {\n\tfmt.Println(\"planning day\", int(d))\n}\n\nfunc main() {\n\tplan(Monday)\n\tplan(42)\n}\n",
   "stdout": "planning day 1\nplanning day 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run enum_loose.go",
     "out": "planning day 1\nplanning day 42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "enum_strict.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\n\nconst (\n\tSunday Weekday = iota\n\tMonday\n)\n\nfunc plan(d Weekday) {\n\tfmt.Println(\"planning day\", int(d))\n}\n\nfunc main() {\n\tn := 2\n\tplan(n)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./enum_strict.go:18:7: cannot use n (variable of type int) as Weekday value in argument to plan\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run enum_strict.go",
     "out": "",
     "err": "# command-line-arguments\n./enum_strict.go:18:7: cannot use n (variable of type int) as Weekday value in argument to plan\n",
     "exit": 1
    }
   ]
  },
  "fill_embed.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Pedaler interface{ Pedal() string }\ntype Ringer interface{ Ring() string }\n\ntype Rider interface {\n\tPedaler\n\tRinger\n}\n\ntype Bell struct{}\n\nfunc (Bell) Ring() string { return \"ding!\" }\n\ntype Bike struct {\n\tBell\n}\n\nfunc (Bike) Pedal() string { return \"whirr\" }\n\nfunc main() {\n\tvar r Rider = Bike{}\n\tfmt.Println(r.Pedal(), r.Ring())\n}\n",
   "stdout": "whirr ding!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_embed.go",
     "out": "whirr ding!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_enum.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Light int\n\nconst (\n\tRed Light = iota\n\tAmber\n\tGreen\n)\n\nvar names = []string{\"red\", \"amber\", \"green\"}\n\nfunc (l Light) String() string {\n\treturn names[l]\n}\n\nfunc main() {\n\tfmt.Println(Green, Red)\n\tfmt.Printf(\"%d\\n\", Amber)\n}\n",
   "stdout": "green red\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_enum.go",
     "out": "green red\n1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_string.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Kelvin float64\n\nfunc (k Kelvin) String() string {\n\treturn fmt.Sprintf(\"%.0f K\", float64(k))\n}\n\nfunc main() {\n\tvar sun Kelvin = 5772\n\tfmt.Println(sun)\n\tfmt.Println(sun + 28)\n}\n",
   "stdout": "5772 K\n5800 K\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_string.go",
     "out": "5772 K\n5800 K\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "flags.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Perm uint8\n\nconst (\n\tRead Perm = 1 << iota\n\tWrite\n\tExec\n)\n\nfunc main() {\n\tfmt.Println(Read, Write, Exec)\n\tmine := Read | Write\n\tfmt.Printf(\"%03b\\n\", mine)\n\tfmt.Println(mine&Write != 0, mine&Exec != 0)\n\tmine |= Exec\n\tfmt.Printf(\"%03b %d\\n\", mine, mine)\n}\n",
   "stdout": "1 2 4\n011\ntrue false\n111 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run flags.go",
     "out": "1 2 4\n011\ntrue false\n111 7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "iface_embed.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Opener interface{ Open() string }\ntype Closer interface{ Close() string }\n\ntype OpenCloser interface {\n\tOpener\n\tCloser\n}\n\ntype Lid struct{}\n\nfunc (Lid) Open() string  { return \"lid up\" }\nfunc (Lid) Close() string { return \"lid down\" }\n\ntype Bin struct {\n\tLid\n\tColor string\n}\n\nfunc use(oc OpenCloser) {\n\tfmt.Println(oc.Open(), \"/\", oc.Close())\n}\n\nfunc main() {\n\tuse(Bin{Color: \"green\"})\n\tvar o Opener = Bin{}\n\tfmt.Println(o.Open())\n}\n",
   "stdout": "lid up / lid down\nlid up\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run iface_embed.go",
     "out": "lid up / lid down\nlid up\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "iota_patterns.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Status int\n\nconst (\n\tUnknown Status = iota\n\tPending\n\tShipped\n\tDelivered\n)\n\nconst (\n\tKB = 1 << (10 * (iota + 1))\n\tMB\n\tGB\n)\n\nfunc main() {\n\tvar s Status\n\tfmt.Println(s == Unknown, Pending, Delivered)\n\tfmt.Println(KB, MB, GB)\n}\n",
   "stdout": "true 1 3\n1024 1048576 1073741824\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run iota_patterns.go",
     "out": "true 1 3\n1024 1048576 1073741824\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "iota_tick.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Size int\n\nconst (\n\t_ Size = iota\n\tSmall\n\tMedium\n\t_\n\tHuge\n)\n\nconst (\n\tGold = iota + 1\n\tSilver\n\tBronze\n)\n\nfunc main() {\n\tfmt.Println(Small, Medium, Huge)\n\tfmt.Println(Gold, Silver, Bronze)\n}\n",
   "stdout": "1 2 4\n1 2 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run iota_tick.go",
     "out": "1 2 4\n1 2 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "keep_methods.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\n\nfunc (c Celsius) String() string { return fmt.Sprintf(\"%.1f°C\", float64(c)) }\n\ntype OvenTemp Celsius // a new type: same numbers, no methods\ntype Heat = Celsius   // an alias: the very same type\n\nfunc main() {\n\tfmt.Println(Celsius(180))\n\tfmt.Println(OvenTemp(180))\n\tfmt.Println(Heat(180))\n\tfmt.Println(Celsius(OvenTemp(180)))\n}\n",
   "stdout": "180.0°C\n180\n180.0°C\n180.0°C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run keep_methods.go",
     "out": "180.0°C\n180\n180.0°C\n180.0°C\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "leaky.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Logbook struct {\n\tentries []string\n}\n\nfunc (l *Logbook) Add(e string) { l.entries = append(l.entries, e) }\nfunc (l *Logbook) Clear()       { l.entries = nil }\nfunc (l *Logbook) Count() int   { return len(l.entries) }\n\ntype Courier struct {\n\tName string\n\tLogbook\n}\n\nfunc main() {\n\tc := Courier{Name: \"Scoot\"}\n\tc.Add(\"parcel 1\")\n\tc.Add(\"parcel 2\")\n\tc.Clear() // anyone holding a Courier can wipe its log!\n\tfmt.Println(c.Name, c.Count())\n}\n",
   "stdout": "Scoot 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run leaky.go",
     "out": "Scoot 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "local_only.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc (n int) Double() int { return n * 2 }\n\nfunc main() {\n\tfmt.Println(21)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./local_only.go:5:9: cannot define new methods on non-local type int\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run local_only.go",
     "out": "",
     "err": "# command-line-arguments\n./local_only.go:5:9: cannot define new methods on non-local type int\n",
     "exit": 1
    }
   ]
  },
  "lookup_missing.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct{}\n\nfunc (Engine) Start() string { return \"Engine's Start: vroom\" }\n\ntype Radio struct{}\n\nfunc (Radio) Play() string { return \"Radio's Play: la la la\" }\n\ntype Van struct {\n\tEngine\n\tRadio\n}\n\nfunc (Van) Honk() string { return \"Van's Honk: beep\" }\n\nfunc main() {\n\tvar v Van\n\tfmt.Println(v.Fly())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lookup_missing.go:22:16: v.Fly undefined (type Van has no field or method Fly)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lookup_missing.go",
     "out": "",
     "err": "# command-line-arguments\n./lookup_missing.go:22:16: v.Fly undefined (type Van has no field or method Fly)\n",
     "exit": 1
    }
   ]
  },
  "lookup_own.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct{}\n\nfunc (Engine) Start() string { return \"Engine's Start: vroom\" }\n\ntype Radio struct{}\n\nfunc (Radio) Play() string { return \"Radio's Play: la la la\" }\n\ntype Van struct {\n\tEngine\n\tRadio\n}\n\nfunc (Van) Honk() string { return \"Van's Honk: beep\" }\n\nfunc main() {\n\tvar v Van\n\tfmt.Println(v.Honk())\n}\n",
   "stdout": "Van's Honk: beep\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run lookup_own.go",
     "out": "Van's Honk: beep\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_promoted.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct{}\n\nfunc (Engine) Start() string { return \"Engine's Start: vroom\" }\n\ntype Radio struct{}\n\nfunc (Radio) Play() string { return \"Radio's Play: la la la\" }\n\ntype Van struct {\n\tEngine\n\tRadio\n}\n\nfunc (Van) Honk() string { return \"Van's Honk: beep\" }\n\nfunc main() {\n\tvar v Van\n\tfmt.Println(v.Start())\n}\n",
   "stdout": "Engine's Start: vroom\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run lookup_promoted.go",
     "out": "Engine's Start: vroom\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_twice.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct{}\n\nfunc (Engine) Start() string { return \"Engine's Start: vroom\" }\n\ntype Radio struct{}\n\nfunc (Radio) Start() string { return \"Radio's Start: crackle\" }\n\ntype Van struct {\n\tEngine\n\tRadio\n}\n\nfunc (Van) Honk() string { return \"Van's Honk: beep\" }\n\nfunc main() {\n\tvar v Van\n\tfmt.Println(v.Start())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lookup_twice.go:22:16: ambiguous selector v.Start\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lookup_twice.go",
     "out": "",
     "err": "# command-line-arguments\n./lookup_twice.go:22:16: ambiguous selector v.Start\n",
     "exit": 1
    }
   ]
  },
  "methods.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc (c Celsius) String() string { return fmt.Sprintf(\"%.1f°C\", float64(c)) }\n\nfunc (c Celsius) ToF() Fahrenheit { return Fahrenheit(c*9/5 + 32) }\n\nfunc (f Fahrenheit) String() string { return fmt.Sprintf(\"%.1f°F\", float64(f)) }\n\ntype Shelf []string\n\nfunc (s Shelf) Count() int { return len(s) }\n\nfunc main() {\n\toven := Celsius(180)\n\tfmt.Println(oven)\n\tfmt.Println(oven.ToF())\n\tfmt.Println(oven.ToF() > 300)\n\tjars := Shelf{\"flour\", \"sugar\", \"salt\"}\n\tfmt.Println(jars.Count(), jars[0])\n}\n",
   "stdout": "180.0°C\n356.0°F\ntrue\n3 flour\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run methods.go",
     "out": "180.0°C\n356.0°F\ntrue\n3 flour\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "mix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc main() {\n\tvar oven Celsius = 180\n\tvar recipe Fahrenheit = oven\n\tfmt.Println(oven + recipe)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./mix.go:10:26: cannot use oven (variable of float64 type Celsius) as Fahrenheit value in variable declaration\n./mix.go:11:14: invalid operation: oven + recipe (mismatched types Celsius and Fahrenheit)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run mix.go",
     "out": "",
     "err": "# command-line-arguments\n./mix.go:10:26: cannot use oven (variable of float64 type Celsius) as Fahrenheit value in variable declaration\n./mix.go:11:14: invalid operation: oven + recipe (mismatched types Celsius and Fahrenheit)\n",
     "exit": 1
    }
   ]
  },
  "no_methods.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\n\nfunc (c Celsius) String() string { return fmt.Sprintf(\"%.1f°C\", float64(c)) }\n\ntype OvenTemp Celsius\n\nfunc main() {\n\tt := OvenTemp(180)\n\tfmt.Println(t.String())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./no_methods.go:13:16: t.String undefined (type OvenTemp has no field or method String)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run no_methods.go",
     "out": "",
     "err": "# command-line-arguments\n./no_methods.go:13:16: t.String undefined (type OvenTemp has no field or method String)\n",
     "exit": 1
    }
   ]
  },
  "not_animal.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Animal struct {\n\tName string\n}\n\ntype Dog struct {\n\tAnimal\n}\n\nfunc main() {\n\td := Dog{Animal{\"Rex\"}}\n\tvar a Animal = d\n\tfmt.Println(a.Name)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./not_animal.go:15:17: cannot use d (variable of struct type Dog) as Animal value in variable declaration\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run not_animal.go",
     "out": "",
     "err": "# command-line-arguments\n./not_animal.go:15:17: cannot use d (variable of struct type Dog) as Animal value in variable declaration\n",
     "exit": 1
    }
   ]
  },
  "not_virtual.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Animal struct {\n\tName string\n}\n\nfunc (a Animal) Sound() string { return \"...\" }\n\nfunc (a Animal) Introduce() string {\n\treturn a.Name + \" says \" + a.Sound()\n}\n\ntype Dog struct {\n\tAnimal\n}\n\nfunc (d Dog) Sound() string { return \"woof\" }\n\nfunc main() {\n\td := Dog{Animal{\"Rex\"}}\n\tfmt.Println(d.Sound())\n\tfmt.Println(d.Introduce())\n}\n",
   "stdout": "woof\nRex says ...\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run not_virtual.go",
     "out": "woof\nRex says ...\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_compose.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Wheels struct{ N int }\ntype Motor struct{ Fuel string }\n\nfunc (m Motor) Go() string { return \"runs on \" + m.Fuel }\n\ntype Scooter struct {\n\tWheels\n\tMotor\n}\n\nfunc main() {\n\ts := Scooter{Wheels{2}, Motor{\"petrol\"}}\n\tfmt.Println(s.N, \"wheels,\", s.Go())\n\ts.Fuel = \"electric\"\n\tfmt.Println(s.Go())\n}\n",
   "stdout": "2 wheels, runs on petrol\nruns on electric\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_compose.go",
     "out": "2 wheels, runs on petrol\nruns on electric\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_enum.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Seat int\n\nconst (\n\t_ Seat = iota\n\tWindow\n\tMiddle\n\tAisle\n)\n\nfunc main() {\n\tfmt.Println(\"aisle\", Aisle)\n\tfmt.Println(\"window\", Window)\n}\n",
   "stdout": "aisle 3\nwindow 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_enum.go",
     "out": "aisle 3\nwindow 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_alias.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Score int\ntype Points = int\n\nfunc main() {\n\tvar s Score = 7\n\tvar p Points = 7\n\tvar n int = 3\n\tfmt.Printf(\"%T %T\\n\", s, p)\n\tfmt.Println(p + n)\n}\n",
   "stdout": "main.Score int\n10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_alias.go",
     "out": "main.Score int\n10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_convert.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Meters float64\ntype Feet float64\n\nfunc main() {\n\tvar m Meters = 10\n\tf := Feet(m)\n\tfmt.Println(f)\n\tfmt.Println(Feet(m * 3.28084))\n\tfmt.Println(m + 5)\n}\n",
   "stdout": "10\n32.8084\n15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_convert.go",
     "out": "10\n32.8084\n15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_flags.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Topping uint8\n\nconst (\n\tCheese Topping = 1 << iota\n\tHam\n\tOlives\n\tOnion\n)\n\nfunc main() {\n\torder := Cheese | Olives\n\tfmt.Println(order)\n\tfmt.Println(order&Ham != 0)\n\tfmt.Println(Onion)\n}\n",
   "stdout": "5\nfalse\n8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_flags.go",
     "out": "5\nfalse\n8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_which.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Base struct{}\n\nfunc (Base) Name() string    { return \"base\" }\nfunc (b Base) Hello() string { return \"hello from \" + b.Name() }\n\ntype Child struct {\n\tBase\n}\n\nfunc (Child) Name() string { return \"child\" }\n\nfunc main() {\n\tc := Child{}\n\tfmt.Println(c.Name())\n\tfmt.Println(c.Hello())\n\tfmt.Println(c.Base.Name())\n}\n",
   "stdout": "child\nhello from base\nbase\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_which.go",
     "out": "child\nhello from base\nbase\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ptr_embed.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c *Counter) Inc()      { c.n++ }\nfunc (c Counter) Count() int { return c.n }\n\ntype Turnstile struct {\n\tCounter\n\tGate string\n}\n\nfunc main() {\n\tt := Turnstile{Gate: \"north\"}\n\tt.Inc()\n\tt.Inc()\n\tfmt.Println(t.Gate, t.Count(), t.Counter.n)\n}\n",
   "stdout": "north 2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run ptr_embed.go",
     "out": "north 2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "relabel.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc main() {\n\tvar oven Celsius = 180\n\tfmt.Println(Fahrenheit(oven))\n}\n",
   "stdout": "180\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run relabel.go",
     "out": "180\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sandwich.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bread struct {\n\tKind string\n}\n\ntype Filling struct {\n\tName string\n\tKcal int\n}\n\ntype Sandwich struct {\n\tBread\n\tFilling\n\tPrice int\n}\n\nfunc main() {\n\ts := Sandwich{Bread{\"rye\"}, Filling{\"cheese\", 300}, 4}\n\ts.Kcal += 50\n\ts.Kind = \"sourdough\"\n\tfmt.Println(s.Name, s.Kcal)\n\tfmt.Println(s.Filling.Kcal, s.Bread.Kind, s.Price)\n}\n",
   "stdout": "cheese 350\n350 sourdough 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sandwich.go",
     "out": "cheese 350\n350 sourdough 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sealed.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Logbook struct {\n\tentries []string\n}\n\nfunc (l *Logbook) Add(e string) { l.entries = append(l.entries, e) }\nfunc (l *Logbook) Clear()       { l.entries = nil }\nfunc (l *Logbook) Count() int   { return len(l.entries) }\n\ntype Courier struct {\n\tName string\n\tlog  Logbook // a named, lower-case field: nothing is promoted\n}\n\nfunc (c *Courier) Deliver(p string) { c.log.Add(p) }\nfunc (c *Courier) Delivered() int   { return c.log.Count() }\n\nfunc main() {\n\tc := Courier{Name: \"Scoot\"}\n\tc.Deliver(\"parcel 1\")\n\tc.Deliver(\"parcel 2\")\n\tfmt.Println(c.Name, c.Delivered())\n}\n",
   "stdout": "Scoot 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sealed.go",
     "out": "Scoot 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sealed_bad.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Logbook struct {\n\tentries []string\n}\n\nfunc (l *Logbook) Add(e string) { l.entries = append(l.entries, e) }\nfunc (l *Logbook) Clear()       { l.entries = nil }\nfunc (l *Logbook) Count() int   { return len(l.entries) }\n\ntype Courier struct {\n\tName string\n\tlog  Logbook // a named, lower-case field: nothing is promoted\n}\n\nfunc (c *Courier) Deliver(p string) { c.log.Add(p) }\nfunc (c *Courier) Delivered() int   { return c.log.Count() }\n\nfunc main() {\n\tc := Courier{Name: \"Scoot\"}\n\tc.Deliver(\"parcel 1\")\n\tc.Deliver(\"parcel 2\")\n\tfmt.Println(c.Name, c.Delivered())\n\tc.Clear()\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./sealed_bad.go:26:4: c.Clear undefined (type Courier has no field or method Clear)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run sealed_bad.go",
     "out": "",
     "err": "# command-line-arguments\n./sealed_bad.go:26:4: c.Clear undefined (type Courier has no field or method Clear)\n",
     "exit": 1
    }
   ]
  },
  "shadow.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Engine struct {\n\tHP int\n}\n\nfunc (e Engine) Start() string { return \"vroom\" }\n\ntype Van struct {\n\tEngine\n\tPlate string\n}\n\nfunc (v Van) Start() string {\n\treturn \"beep beep, then \" + v.Engine.Start()\n}\n\nfunc main() {\n\tv := Van{Engine{150}, \"GO-123\"}\n\tfmt.Println(v.Start())\n\tfmt.Println(v.Engine.Start())\n}\n",
   "stdout": "beep beep, then vroom\nvroom\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shadow.go",
     "out": "beep beep, then vroom\nvroom\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_field.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bell struct{}\n\nfunc (Bell) Ring() string { return \"ding!\" }\n\ntype Bike struct {\n\tbell  Bell\n\tColor string\n}\n\nfunc main() {\n\tb := Bike{Color: \"red\"}\n\tfmt.Println(b.Color, b.Ring())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_field.go:16:25: b.Ring undefined (type Bike has no field or method Ring)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_field.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_field.go:16:25: b.Ring undefined (type Bike has no field or method Ring)\n",
     "exit": 1
    }
   ]
  },
  "spot_mix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc main() {\n\t// all three readings come from the same Celsius thermometer\n\tvar morning Celsius = 12\n\tvar noon Fahrenheit = 24\n\tvar evening Celsius = 15\n\tavg := (morning + noon + evening) / 3\n\tfmt.Println(\"average:\", avg)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_mix.go:13:10: invalid operation: morning + noon (mismatched types Celsius and Fahrenheit)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_mix.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_mix.go:13:10: invalid operation: morning + noon (mismatched types Celsius and Fahrenheit)\n",
     "exit": 1
    }
   ]
  },
  "trace_iota.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Level int\n\nconst (\n\t_ Level = iota * 10\n\tLow\n\tMid\n\t_\n\tMax\n)\n\nfunc main() {\n\tfmt.Println(\"Low\", Low)\n\tfmt.Println(\"Mid\", Mid)\n\tfmt.Println(\"Max\", Max)\n}\n",
   "stdout": "Low 10\nMid 20\nMax 40\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_iota.go",
     "out": "Low 10\nMid 20\nMax 40\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_promote.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Tank struct {\n\tLitres int\n}\n\ntype Truck struct {\n\tTank\n\tKm int\n}\n\nfunc main() {\n\tt := Truck{Tank{40}, 0}\n\tfor _, trip := range []int{100, 50, 200} {\n\t\tt.Km += trip\n\t\tt.Litres -= trip / 10\n\t\tfmt.Println(trip, t.Km, t.Tank.Litres)\n\t}\n}\n",
   "stdout": "100 100 30\n50 150 25\n200 350 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_promote.go",
     "out": "100 100 30\n50 150 25\n200 350 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unexported.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/pantry/kitchen\"\n)\n\nfunc main() {\n\tr := kitchen.NewRecipe(\"pancakes\")\n\tfmt.Println(r.Name, r.Steps())\n}\n",
   "stdout": "pancakes 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cp unexported.go pantry/main.go",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch18"
    },
    {
     "cmd": "cd pantry",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch18"
    },
    {
     "cmd": "go run .",
     "out": "pancakes 3\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch18/pantry"
    }
   ]
  },
  "pantry/kitchen/kitchen.go": {
   "src": "package kitchen\n\n// recipe starts with a small letter: only package kitchen may use its name.\ntype recipe struct {\n\tName  string\n\tsteps int\n}\n\n// NewRecipe starts with a capital letter, so other packages may call it.\nfunc NewRecipe(name string) recipe {\n\treturn recipe{Name: name, steps: 3}\n}\n\n// Steps lets other packages read the hidden field.\nfunc (r recipe) Steps() int { return r.steps }\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "unexported_bad.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/pantry/kitchen\"\n)\n\nfunc main() {\n\tvar r kitchen.recipe\n\tfmt.Println(r.steps)\n}\n",
   "stdout": "",
   "stderr": "# example/pantry\n./main.go:10:16: name recipe not exported by package kitchen\n./main.go:11:16: r.steps undefined (type kitchen.recipe has no field or method steps, but does have method Steps)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cp unexported_bad.go pantry/main.go",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch18"
    },
    {
     "cmd": "cd pantry",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch18"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/pantry\n./main.go:10:16: name recipe not exported by package kitchen\n./main.go:11:16: r.steps undefined (type kitchen.recipe has no field or method steps, but does have method Steps)\n",
     "exit": 1,
     "dir": "~/go-ch18/pantry"
    }
   ]
  },
  "verbs_machine.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\n\nconst (\n\tSunday Weekday = iota\n\tMonday\n\tTuesday\n)\n\nfunc (d Weekday) String() string {\n\tswitch d {\n\tcase Sunday:\n\t\treturn \"Sun\"\n\tcase Monday:\n\t\treturn \"Mon\"\n\tcase Tuesday:\n\t\treturn \"Tue\"\n\t}\n\treturn fmt.Sprintf(\"Weekday(%d)\", int(d))\n}\n\nfunc main() {\n\tfmt.Println(\"Println(Monday) ->\", Monday)\n\tfmt.Printf(\"%%v of Monday -> %v\\n\", Monday)\n\tfmt.Printf(\"%%d of Monday -> %d\\n\", Monday)\n\tfmt.Printf(\"%%q of Tuesday -> %q\\n\", Tuesday)\n\tfmt.Println(\"int(Tuesday) ->\", int(Tuesday))\n\tfmt.Println(\"Weekday(9) ->\", Weekday(9))\n}\n",
   "stdout": "Println(Monday) -> Mon\n%v of Monday -> Mon\n%d of Monday -> 1\n%q of Tuesday -> \"Tue\"\nint(Tuesday) -> 2\nWeekday(9) -> Weekday(9)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run verbs_machine.go",
     "out": "Println(Monday) -> Mon\n%v of Monday -> Mon\n%d of Monday -> 1\n%q of Tuesday -> \"Tue\"\nint(Tuesday) -> 2\nWeekday(9) -> Weekday(9)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "virtual_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Sounder interface {\n\tSound() string\n}\n\nfunc introduce(name string, s Sounder) string {\n\treturn name + \" says \" + s.Sound()\n}\n\ntype Dog struct{}\n\nfunc (Dog) Sound() string { return \"woof\" }\n\ntype Cat struct{}\n\nfunc (Cat) Sound() string { return \"meow\" }\n\nfunc main() {\n\tfmt.Println(introduce(\"Rex\", Dog{}))\n\tfmt.Println(introduce(\"Tom\", Cat{}))\n}\n",
   "stdout": "Rex says woof\nTom says meow\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run virtual_fix.go",
     "out": "Rex says woof\nTom says meow\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weekday_plain.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\n\nconst (\n\tSunday Weekday = iota\n\tMonday\n\tTuesday\n\tWednesday\n)\n\nfunc main() {\n\tfmt.Println(Sunday, Monday, Wednesday)\n\tvar today Weekday\n\tfmt.Println(today == Sunday)\n\tfmt.Printf(\"%T\\n\", Tuesday)\n}\n",
   "stdout": "0 1 3\ntrue\nmain.Weekday\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run weekday_plain.go",
     "out": "0 1 3\ntrue\nmain.Weekday\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weekday_string.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Weekday int\n\nconst (\n\tSunday Weekday = iota\n\tMonday\n\tTuesday\n)\n\nfunc (d Weekday) String() string {\n\tswitch d {\n\tcase Sunday:\n\t\treturn \"Sun\"\n\tcase Monday:\n\t\treturn \"Mon\"\n\tcase Tuesday:\n\t\treturn \"Tue\"\n\t}\n\treturn fmt.Sprintf(\"Weekday(%d)\", int(d))\n}\n\nfunc main() {\n\tfmt.Println(Monday)\n\tfmt.Printf(\"%v %d %s\\n\", Monday, Monday, Monday)\n\tfmt.Println(Weekday(9))\n\tfmt.Println([]Weekday{Sunday, Tuesday})\n}\n",
   "stdout": "Mon\nMon 1 Mon\nWeekday(9)\n[Sun Tue]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run weekday_string.go",
     "out": "Mon\nMon 1 Mon\nWeekday(9)\n[Sun Tue]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wrong_arg.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Celsius float64\ntype Fahrenheit float64\n\nfunc CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }\n\nfunc main() {\n\tvar recipe Fahrenheit = 350\n\tfmt.Println(CToF(recipe))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./wrong_arg.go:12:19: cannot use recipe (variable of float64 type Fahrenheit) as Celsius value in argument to CToF\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run wrong_arg.go",
     "out": "",
     "err": "# command-line-arguments\n./wrong_arg.go:12:19: cannot use recipe (variable of float64 type Fahrenheit) as Celsius value in argument to CToF\n",
     "exit": 1
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
