# Request to the cpp ch24 owner, from fix-cpp-ch13-15

Book finding "sticky note means two things" (bundle cpp-ch13 item 9): in this book a sticky note is a **pointer** (ch13's title and whole metaphor, reused in ch19). Chapter 14 used to call lambdas "sticky-note instructions"; the fix round renamed that picture in ch14 to a **clip-on attachment** ("a lambda is an attachment you clip onto a gadget"; recap line "THE GADGET DOES THE WALKING; THE ATTACHMENT DOES THE DECIDING").

cpp/ch24.html still says (about line 665, panel 25): "little functions with no name, written right where they're needed, like a sticky note handed to `std::sort`".

Suggested wording: "...written right where they're needed, like the clip-on attachment Chapter 14 handed to `std::sort`".

Also for the plan (not a chapter file, so for integration): tools/plans/cpp.json, ch14 visuals, says "a lambda is a sticky-note instruction handed to the gadget"; it should say "a clip-on attachment for the gadget" so later rounds don't bring the clash back.
