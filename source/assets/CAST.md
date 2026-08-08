# Guide cast: Rust, Go, C++ and JavaScript books

Drawn by `assets/comic-cast.js` in Pip's house style. Load it after `comic-widgets.js`:

```html
<script defer src="../assets/comic.js"></script>
<script defer src="../assets/comic-widgets.js"></script>
<script defer src="../assets/comic-cast.js"></script>
```

Every drawing is `<svg class="char [sm|lg]" data-char="NAME" ...></svg>`, exactly like Pip. The test sheet showing every mood, mouth, pose and prop is `tools/fixture/cast.html`.

Use the names, voices and catchphrases below in every chapter. A catchphrase should land at the moment it explains, not be sprinkled around.

## The guides

| data-char | Name | Book | Look | Stands for |
|---|---|---|---|---|
| `librarian` | **Mabel** | Rust | Hair bun with a pencil, terracotta cardigan, lavender skirt, library card on a lanyard; holds a red book (or her ledger) and a rubber stamp | Ownership, borrowing, lifetimes, drop |
| `courier` | **Scoot** | Go | Red cap, green jacket, satchel of letters, red sneakers with speed lines; holds a letter | Goroutines (couriers) and channels (hand-to-hand deliveries) |
| `mechanic` | **Wren** | C++ | Orange coveralls with a gear patch, goggles up on curly hair, wrench in hand, red toolbox at her feet | Working close to the machine: memory, constructors and destructors, RAII |
| `stagehand` | **Kit** | JavaScript | Pink hoodie, headset with a mic, clipboard of cues | Events, callbacks, promises and the event loop |

### Mabel, the librarian (Rust)
Careful, kind and unhurried. She never loses track of a book, and she says "no" warmly and always explains why.
- "Every book has exactly one owner." (ownership)
- "Lend it to many readers, or to one writer. Never both at once." (`&T` and `&mut T`)
- "Bring it back before the owner leaves." (lifetimes)
- "When the owner leaves, the book goes back on the shelf." (drop)
- Her book is a value. Her ledger records who has borrowed what (the borrow checker's view). Her stamp is a loan being recorded.

### Scoot, the courier (Go)
Quick, cheerful and always moving. Scoot loves a clear handoff and dislikes notes left on shared desks.
- "Don't share the note. Send it!" (share memory by communicating)
- "I wait at the door until someone takes the letter." (unbuffered channel send)
- "Need more hands? Just say go!" (`go f()`)
- Many couriers means many goroutines, and the satchel is a buffered channel.

### Wren, the mechanic (C++)
Capable, unflappable and practical. She respects the machine and expects you to clean up after yourself.
- "Close to the metal. Careful with the wrench." (power, and the danger that comes with it)
- "Every bolt you tighten, you loosen later." (acquire and release, destructors, RAII)
- "Measure twice, compile once."
- Her toolbox is the standard library.

### Kit, the stage manager (JavaScript)
Calm under pressure, never rushes, and runs the show one cue at a time.
- "One cue at a time." (the single thread)
- "Stand by... GO!" (an event fires and its handler runs)
- "Long job? I'll call you back when it's done." (callbacks and promises)
- The clipboard is the queue of cues waiting to run.

## The Compiler (Rust, Go and C++)

| data-char | Name | Look |
|---|---|---|
| `compiler` | **the Compiler** | A big checkpoint robot: a dark screen face with yellow eyes, a beacon on top, a name plate, a printer that writes notes (a red underline, an arrow and a green fix), a raised red marker, a striped gate and tank treads |

It is strict but never mean, and it always says where the problem is and how to fix it. It checks the whole program before anything runs, so the gate stays down until everything checks out.
- "Nothing runs until everything checks out."
- "Here's the problem, here's where, and here's a fix."

It is a different character from Python's Proofreader. The Proofreader reads the whole file just before Python runs it (so a syntax error stops everything before line 1 runs); the Compiler also inspects the whole program first, but turns it into a separate executable that runs later.

## Attributes

**Guides** (`librarian`, `courier`, `mechanic`, `stagehand`) take Pip's attributes:
- `data-mood`: `happy`, `surprised`, `focus`, `worried`, `normal`
- `data-mouth`: `smile`, `shout`, `o`, `flat`, `frown`
- `data-arms`: `down`, `wave`, `point`, `pointL`, `cheer`, `shrug`
- `data-prop` sets what the guide holds, and `none` empties the hand:
  - librarian: `book` (default) or `ledger`. Mabel also holds a stamp when her arms are `down` or `point`.
  - courier: `letter` (default)
  - mechanic: `wrench` (default)
  - stagehand: `clipboard` (default)

**Compiler**:
- `data-mood`: `normal` (blue beacon), `happy` (green beacon, gate up), `focus` (yellow beacon), `stern` (red beacon)
- `data-gate`: `up` or `down`, to override the gate (by default it is up only when the mood is happy)
- `data-label`: the name plate, at most 9 characters, e.g. `rustc`, `go build`, `g++` (default `COMPILER`)

Use `class="char lg"` for the Compiler in scenes. It is a big character, and it shrinks a lot at `sm`.

## Animation and accessibility

The cast uses Pip's animation hooks: `.bob` moves the whole body, `.wave` the waving arm and `.eyes` the blink. They run only when motion is on and never under `prefers-reduced-motion`. Drawings are `aria-hidden`. When a picture carries meaning, add a `.sr-only` sentence, as with Pip.

## Example

```html
<div class="scene">
  <svg class="char" data-char="librarian" data-mood="happy" data-arms="pointL"></svg>
  <div class="talk"><p class="bubble"><span class="sr-only">Mabel says: </span>Every book has exactly one owner. You may <b>borrow</b> it.</p></div>
</div>
```
