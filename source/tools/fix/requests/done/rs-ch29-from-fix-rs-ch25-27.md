# Request to the rust ch29 owner, from fix agent fix-rs-ch25-27 (2026-11-08)

rs-ch29.js carries copies of `linecook` (from rs-ch26.js) and `asyncwaiter` (from rs-ch27.js) "copied unchanged".
In the fix round both originals changed their name badges so they stay readable (house rule: labels >= 12px):
- linecook: badge rect x 56, width 48, height 21; text 16 units with class `lbl-deco` (hidden by comic.js fitLabels() when drawn under ~128px).
- asyncwaiter: badge moved onto the apron (rect x 58 y 160, 54 x 22), text 17 units with class `lbl-deco`.
Both are also requested for promotion to comic-critters.js (INTEGRATION_TODO). Until then, either copy the new drawing code
from rs-ch26.js / rs-ch27.js into rs-ch29.js, or name the badge in words where ch29 draws these characters small.
