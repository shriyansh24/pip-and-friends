import json, copy
OUT = "/home/claude/comic-site/python/ch19.html"
def j(x): return json.dumps(x, ensure_ascii=False)

# ---------- tracer: lookup.py ----------
C = {"kind": "class", "label": "class Member", "pairs": [{"k": "club", "val": "'Robot Club'"}, {"k": "__init__", "val": "a function"}]}
F1 = {"kind": "function", "value": "__init__(self, name)"}
A = {"kind": "object", "label": "Member object (ada)", "pairs": [{"k": "__class__", "ref": "C"}, {"k": "name", "val": "'Ada'"}]}
B = {"kind": "object", "label": "Member object (bo)", "pairs": [{"k": "__class__", "ref": "C"}, {"k": "name", "val": "'Bo'"}]}
B2 = copy.deepcopy(B); B2["pairs"].append({"k": "club", "val": "'Chess Club'"})
g = lambda *v: [{"name": "global", "vars": [{"n": n, "ref": r} for n, r in v]}]
o1 = ["Robot Club Robot Club"]; o2 = o1 + ["Robot Club Chess Club"]; o3 = o2 + ["Robot Club"]
look = {"program": "lookup.py", "steps": [
 {"line": 1, "output": [], "frames": g(), "objects": {}, "note": "Nothing yet. Line 1 starts a <code>class</code> statement."},
 {"line": 6, "output": [], "frames": g(("Member", "C")), "objects": {"C": C}, "changed": ["Member"], "note": "The class body ran once and built the <b>class object</b>: the whiteboard. It holds <code>club</code> and the <code>__init__</code> machine (a function)."},
 {"line": 7, "output": [], "frames": g(("Member", "C"), ("ada", "A")), "objects": {"C": C, "A": A}, "changed": ["ada"], "note": "<code>Member(\"Ada\")</code> stamps an object and <code>__init__</code> writes <code>name</code> in its notebook. Its <code>__class__</code> arrow points back at the class."},
 {"line": 8, "output": [], "frames": g(("Member", "C"), ("ada", "A"), ("bo", "B")), "objects": {"C": C, "A": A, "B": B}, "changed": ["bo"], "note": "A second member with its own notebook. Neither notebook has a <code>club</code>."},
 {"line": 9, "output": o1, "frames": g(("Member", "C"), ("ada", "A"), ("bo", "B")), "objects": {"C": C, "A": A, "B": B}, "note": "<code>ada.club</code>: not in Ada's notebook, so Python follows <code>__class__</code> to the whiteboard and finds <code>'Robot Club'</code>. Same for Bo."},
 {"line": 10, "output": o1, "frames": g(("Member", "C"), ("ada", "A"), ("bo", "B")), "objects": {"C": C, "A": A, "B": B2}, "changed": ["bo"], "note": "<code>bo.club = …</code> is a <b>write</b>, and writes go in Bo's own notebook. The whiteboard is untouched."},
 {"line": 11, "output": o2, "frames": g(("Member", "C"), ("ada", "A"), ("bo", "B")), "objects": {"C": C, "A": A, "B": B2}, "note": "Now Bo's notebook has a <code>club</code>, so the search stops there: <samp>Chess Club</samp>. Ada still falls through to the whiteboard."},
 {"line": None, "output": o3, "frames": g(("Member", "C"), ("ada", "A"), ("bo", "B")), "objects": {"C": C, "A": A, "B": B2}, "note": "The class itself still says <samp>Robot Club</samp>. Bo's entry only <b>hides</b> it, for Bo."}]}

# ---------- tracer: tricks_trap.py ----------
D = {"kind": "class", "label": "class Dog", "pairs": [{"k": "tricks", "ref": "L1"}, {"k": "__init__", "val": "a function"}, {"k": "learn", "val": "a function"}]}
TF1 = {"kind": "function", "value": "__init__(self, name)"}; TF2 = {"kind": "function", "value": "learn(self, trick)"}
R = {"kind": "object", "label": "Dog object (rex)", "pairs": [{"k": "__class__", "ref": "D"}, {"k": "name", "val": "'Rex'"}]}
Bo = {"kind": "object", "label": "Dog object (bo)", "pairs": [{"k": "__class__", "ref": "D"}, {"k": "name", "val": "'Bo'"}]}
def L(*vals): return {"kind": "list", "items": [{"val": v} for v in vals]}
s1 = {"kind": "str", "value": "'sit'"}; s2 = {"kind": "str", "value": "'roll over'"}
def objs(lst, extra=None):
    o = {"D": D, "L1": lst}
    o.update(extra or {}); return o
G3 = [("Dog", "D"), ("rex", "R"), ("bo", "B")]
t1 = ["Rex knows: ['sit', 'roll over']"]; t2 = t1 + ["Bo knows: ['sit', 'roll over']"]; t3 = t2 + ["True"]
trap = {"program": "tricks_trap.py", "steps": [
 {"line": 1, "output": [], "frames": g(), "objects": {}, "note": "Line 2 will put a list on the whiteboard. Count the lists as you go."},
 {"line": 10, "output": [], "frames": g(("Dog", "D")), "objects": objs(L()), "changed": ["Dog"], "note": "The class is built. Its whiteboard holds <b>one</b> empty list, <code>tricks</code>, made once, when the class body ran."},
 {"line": 11, "output": [], "frames": g(("Dog", "D"), ("rex", "R")), "objects": objs(L(), {"R": R}), "changed": ["rex"], "note": "Rex's notebook gets a <code>name</code>. No <code>tricks</code> in it."},
 {"line": 12, "output": [], "frames": g(*G3), "objects": objs(L(), {"R": R, "B": Bo}), "changed": ["bo"], "note": "Bo's notebook: also just a <code>name</code>. Still one list in the whole program."},
 {"line": 8, "output": [], "frames": g(*G3) + [{"name": "learn(self, trick)", "vars": [{"n": "self", "ref": "R"}]}], "objects": objs(L(), {"R": R, "B": Bo}), "changed": ["self"], "note": "<code>rex.learn(\"sit\")</code>: a frame opens with <code>self</code> = Rex (and <code>trick</code> = <code>'sit'</code>)."},
 {"line": 13, "output": [], "frames": g(*G3), "objects": objs(L("'sit'"), {"R": R, "B": Bo}), "changed": ["Dog"], "note": "<code>self.tricks</code> is a <b>read</b>: not in Rex's notebook, so it falls through to the whiteboard's list, and <code>append</code> changes <b>that</b> list."},
 {"line": 8, "output": [], "frames": g(*G3) + [{"name": "learn(self, trick)", "vars": [{"n": "self", "ref": "B"}]}], "objects": objs(L("'sit'"), {"R": R, "B": Bo}), "changed": ["self"], "note": "<code>bo.learn(\"roll over\")</code>: this time <code>self</code> = Bo."},
 {"line": 14, "output": [], "frames": g(*G3), "objects": objs(L("'sit'", "'roll over'"), {"R": R, "B": Bo}), "changed": ["Dog"], "note": "Bo's notebook has no <code>tricks</code> either, so the read lands on the <b>same</b> list. Now it holds both tricks."},
 {"line": 15, "output": t1, "frames": g(*G3), "objects": objs(L("'sit'", "'roll over'"), {"R": R, "B": Bo}), "note": "<code>rex.tricks</code>: the shared list."},
 {"line": 16, "output": t2, "frames": g(*G3), "objects": objs(L("'sit'", "'roll over'"), {"R": R, "B": Bo}), "note": "<code>bo.tricks</code>: the very same list."},
 {"line": None, "output": t3, "frames": g(*G3), "objects": objs(L("'sit'", "'roll over'"), {"R": R, "B": Bo}), "note": "<code>is</code> confirms it (Chapter 15): one object, reached from both dogs. No error, just wrong."}]}

# ---------- walker: super_init.py ----------
w0 = ["making Rex:"]; w1 = w0 + ["  Dog.__init__ starts"]; w2 = w1 + ["  Pet.__init__ runs"]; w3 = w2 + ["  Dog.__init__ ends"]; w4 = w3 + ["Rex ['sit']"]
walk = {"program": "super_init.py", "steps": [
 {"line": 1, "output": [], "mood": "focus", "arms": "point", "note": "Pip starts at the top. Line 1 begins the class Pet."},
 {"line": 6, "output": [], "mood": "focus", "arms": "point", "note": "Pet's body ran: <code>def</code> stored its <code>__init__</code> on the class. Nothing printed; method bodies wait until called."},
 {"line": 13, "output": [], "mood": "focus", "arms": "point", "note": "Class Dog is built the same way, with Pet as its parent. Its own <code>__init__</code> overrides Pet's."},
 {"line": 14, "output": w0, "mood": "happy", "arms": "point", "note": "Line 13 prints. Next, line 14 calls <code>Dog(\"Rex\", [\"sit\"])</code>."},
 {"line": 8, "output": w0, "mood": "focus", "arms": "point", "note": "Python looks for <code>__init__</code>, climbing from Dog. Dog has one, so it runs, with <code>self</code> = the new blank dog."},
 {"line": 9, "output": w1, "mood": "happy", "arms": "point", "note": "Line 8 printed. Line 9: <code>super().__init__(name)</code> asks the next class up, Pet, to do its part."},
 {"line": 3, "output": w1, "mood": "surprised", "mouth": "o", "arms": "point", "note": "Pip jumps up into Pet's <code>__init__</code>, with the <b>same</b> <code>self</code>."},
 {"line": 4, "output": w2, "mood": "happy", "arms": "point", "note": "Pet's line 3 prints. Line 4 writes <code>self.name</code> into the dog's notebook."},
 {"line": 10, "output": w2, "mood": "happy", "arms": "point", "note": "Pet's <code>__init__</code> ends, and Pip returns to Dog's, just after the <code>super()</code> call."},
 {"line": 11, "output": w2, "mood": "happy", "arms": "point", "note": "Line 10 adds the dog-only attribute, <code>tricks</code>."},
 {"line": 15, "output": w3, "mood": "happy", "arms": "point", "note": "Dog's <code>__init__</code> finishes, and <code>rex</code> is tied to the finished object."},
 {"line": None, "output": w4, "mood": "happy", "mouth": "shout", "arms": "cheer", "note": "Both attributes exist: <code>name</code> from Pet's setup, <code>tricks</code> from Dog's."}]}

# ---------- map: attribute lookup ----------
states = [
 {"id": "S0", "x": 60, "y": 30, "w": 260, "h": 62, "label": "`rex.something`", "sub": "a name to look up"},
 {"id": "N", "x": 60, "y": 140, "w": 260, "h": 66, "label": "rex's notebook", "sub": "`vars(rex)`"},
 {"id": "D", "x": 60, "y": 250, "w": 260, "h": 66, "label": "class Dog", "sub": "Dog's whiteboard"},
 {"id": "P", "x": 60, "y": 360, "w": 260, "h": 66, "label": "class Pet", "sub": "the parent"},
 {"id": "O", "x": 60, "y": 470, "w": 260, "h": 66, "label": "class object", "sub": "the root of every tree"},
 {"id": "E", "x": 60, "y": 600, "w": 260, "h": 66, "label": "AttributeError", "sub": "no floor has it", "kind": "error"},
 {"id": "F", "x": 440, "y": 140, "w": 220, "h": 396, "label": "FOUND", "sub": "use the first match", "kind": "end"}]
trans = [
 {"id": "t0", "from": "S0", "to": "N", "pts": [[190, 96], [190, 134]], "label": "start here", "lx": 204, "ly": 120},
 {"id": "nd", "from": "N", "to": "D", "pts": [[190, 210], [190, 244]], "label": "not here: climb", "lx": 204, "ly": 232},
 {"id": "dp", "from": "D", "to": "P", "pts": [[190, 320], [190, 354]], "label": "not here: climb", "lx": 204, "ly": 342},
 {"id": "po", "from": "P", "to": "O", "pts": [[190, 430], [190, 464]], "label": "not here: climb", "lx": 204, "ly": 452},
 {"id": "oe", "from": "O", "to": "E", "pts": [[190, 540], [190, 594]], "label": "not here either", "lx": 204, "ly": 572, "bug": True},
 {"id": "nf", "from": "N", "to": "F", "pts": [[322, 173], [434, 173]], "label": "found", "lx": 378, "ly": 164, "anchor": "middle"},
 {"id": "df", "from": "D", "to": "F", "pts": [[322, 283], [434, 283]], "label": "found", "lx": 378, "ly": 274, "anchor": "middle"},
 {"id": "pf", "from": "P", "to": "F", "pts": [[322, 393], [434, 393]], "label": "found", "lx": 378, "ly": 384, "anchor": "middle"},
 {"id": "of", "from": "O", "to": "F", "pts": [[322, 503], [434, 503]], "label": "found", "lx": 378, "ly": 494, "anchor": "middle"}]
start = lambda prog, what: {"on": ["S0"], "output": [], "note": f"The last line of <code>{prog}</code> asks for <code>rex.{what}</code>. <code>rex</code> is a Dog."}
paths = [
 {"id": "name", "label": "rex.name", "program": "mro_name.py", "expect": {"exit": 0, "stdoutExact": True}, "steps": [
   start("mro_name.py", "name"),
   {"on": ["N"], "via": ["t0"], "output": [], "mood": "focus", "note": "First stop: Rex's own notebook. Pet's <code>__init__</code> wrote <code>name</code> there."},
   {"on": ["F"], "via": ["nf"], "output": ["Rex"], "note": "Found on the first floor. No climbing needed: <samp>Rex</samp>."}]},
 {"id": "speak", "label": "rex.speak()", "program": "mro_speak.py", "expect": {"exit": 0, "stdoutExact": True}, "steps": [
   start("mro_speak.py", "speak"),
   {"on": ["N"], "via": ["t0"], "output": [], "mood": "focus", "note": "Rex's notebook holds only <code>name</code>. Methods live on classes, never in a notebook."},
   {"on": ["D"], "via": ["nd"], "output": [], "note": "Climb to Dog. Dog defines <code>speak</code>!"},
   {"on": ["F"], "via": ["df"], "output": ["Woof! (from Dog)"], "note": "First match wins. Pet also has a <code>speak</code>, but the search never gets that far: that is what <b>overriding</b> means."}]},
 {"id": "describe", "label": "rex.describe()", "program": "mro_describe.py", "expect": {"exit": 0, "stdoutExact": True}, "steps": [
   start("mro_describe.py", "describe"),
   {"on": ["N"], "via": ["t0"], "output": [], "mood": "focus", "note": "Not in the notebook."},
   {"on": ["D"], "via": ["nd"], "output": [], "note": "Not on Dog either: Dog only defines <code>speak</code>."},
   {"on": ["P"], "via": ["dp"], "output": [], "note": "Climb to Pet. There it is: <code>describe</code>."},
   {"on": ["F"], "via": ["pf"], "output": ["Rex is a pet (from Pet)"], "note": "Found on the parent, and run with <code>self</code> = Rex. That's <b>inheritance</b>."}]},
 {"id": "fly", "label": "rex.fly()", "bug": True, "program": "mro_fly.py", "expect": {"exit": 1, "stdoutExact": True, "stderrContains": "AttributeError: 'Dog' object has no attribute 'fly'"}, "steps": [
   start("mro_fly.py", "fly"),
   {"on": ["N"], "via": ["t0"], "output": [], "mood": "focus", "note": "Not in the notebook."},
   {"on": ["D"], "via": ["nd"], "output": [], "note": "Not on Dog."},
   {"on": ["P"], "via": ["dp"], "output": [], "note": "Not on Pet."},
   {"on": ["O"], "via": ["po"], "output": [], "note": "Last floor: <code>object</code>, which every class inherits from. It has <code>__init__</code>, <code>__repr__</code> and friends, but no <code>fly</code>."},
   {"on": ["E"], "via": ["oe"], "output": [], "error": "AttributeError: 'Dog' object has no attribute 'fly'", "note": "The whole tree was searched. Pockets reports the error, naming the class the search <em>started</em> from."}]}]
mro = {"seed": 19, "size": [690, 690], "start": [[190, 4], [190, 26]], "states": states, "transitions": trans, "paths": paths}

html = "".join(open(f"p{i}.html").read() for i in range(8))
for k, v in {"{{TR_LOOK}}": look, "{{TR_TRAP}}": trap, "{{WALK_SUPER}}": walk, "{{MAP_MRO}}": mro}.items():
    assert k in html, k
    html = html.replace(k, j(v))
assert "{{" not in html
open(OUT, "w").write(html)
print("wrote", OUT, len(html))
