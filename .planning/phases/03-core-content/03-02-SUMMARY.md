---
phase: 03-core-content
plan: 02
subsystem: ui
tags: [html, katex, desmos, coordinates, angles, probability, mobile-scroll-fix]

# Dependency graph
requires:
  - phase: 01-scaffold-and-foundation
    provides: styles.css design system, inline nav pattern, KaTeX head block
  - phase: 02-foundation-content
    provides: topic page content structure (breadcrumb > badge > h1 > key facts > worked examples)
provides:
  - Angles topic page with parallel line rules and two worked examples
  - Probability topic page with P(A) fraction formula and sample space worked example
  - Coordinates and Graphs topic page with Desmos embed and mobile scroll-fix
  - Desmos wrapper CSS block in styles.css (used by 03-03 and 03-04)
  - Mobile scroll-fix pattern: .desmos-scroll-overlay + toggleDesmosInteraction
affects:
  - 03-03-PLAN (straight-line-graphs — uses Desmos CSS from styles.css)
  - 03-04-PLAN (transformations — uses Desmos CSS from styles.css)

# Tech tracking
tech-stack:
  added:
    - Desmos Graphing Calculator API v1.11 (demo key — replace before go-live)
  patterns:
    - Desmos embed pattern: .desmos-wrapper > #desmos-calculator + .desmos-scroll-overlay
    - Mobile scroll-fix: CSS overlay with pointer-events:none on desktop, touch-action:pan-y on mobile, toggle button hidden on desktop

key-files:
  created: []
  modified:
    - core/angles/index.html
    - core/probability/index.html
    - core/coordinates-graphs/index.html
    - assets/css/styles.css

key-decisions:
  - "Desmos CSS appended at end of styles.css (not in separate file) — single stylesheet, shared by all Desmos pages in phase 3"
  - "Mobile scroll-fix uses CSS overlay + JS toggle (not passive event listener) — simpler, no JS touch event required on overlay itself"
  - "Desmos toggle button hidden via display:none on desktop (not visibility:hidden) — no layout space consumed"
  - "Demo API key dcb31709b452b1cf9dc26972add0fda6 used with REPLACE comment — production key request to partnerships@desmos.com"

patterns-established:
  - "Desmos embed pattern: .desmos-wrapper wrapper div with relative positioning, #desmos-calculator fills full height, .desmos-scroll-overlay sits on top with z-index:10"
  - "Mobile scroll toggle: .desmos-wrapper.interactive class removes overlay pointer-events, button text swaps to indicate mode"
  - "Core page structure matches Foundation: breadcrumb > level-badge > h1 > h2(Key Facts) > h2(Worked Example 1) > h2(Worked Example 2) — NO non-calc badge"

requirements-completed: [CORE-06, CORE-07, CORE-08, GRAPH-01, GRAPH-05]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 3 Plan 02: Core Content (Angles, Probability, Coordinates) Summary

**Three Core topic pages authored with KaTeX worked examples, plus Desmos GraphingCalculator embed with CSS mobile scroll-fix pattern that unblocks plans 03-03 and 03-04**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T21:38:04Z
- **Completed:** 2026-02-26T21:40:38Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Angles page: 7 key facts covering Z/F/C parallel line rules, two worked examples using `^{\circ}` KaTeX degree notation
- Probability page: P(A) fraction formula in display mode, complement rule, sample space / combined events worked example
- Coordinates and Graphs page: midpoint formula, four-quadrant worked examples, Desmos GraphingCalculator embed with pre-loaded point A(2,3)
- Desmos CSS block appended to styles.css — .desmos-wrapper, .desmos-scroll-overlay (mobile touch-action:pan-y), .desmos-toggle-btn — required by 03-03 and 03-04

## Task Commits

Each task was committed atomically:

1. **Task 1: Author angles and probability topic pages** - `f74c51c` (feat)
2. **Task 2: Add Desmos CSS to styles.css and author coordinates-graphs page** - `4a3da1e` (feat)

## Files Created/Modified

- `core/angles/index.html` — Angles topic page: 7 key facts (inc. 3 parallel line rules), two worked examples, KaTeX, Core badge, no non-calc badge (105 lines)
- `core/probability/index.html` — Probability topic page: P(A) formula, complement rule, sample space example, KaTeX, Core badge, no non-calc badge (108 lines)
- `core/coordinates-graphs/index.html` — Coordinates and Graphs topic: midpoint formula, four-quadrant examples, Desmos embed, mobile scroll-fix, toggle button (139 lines)
- `assets/css/styles.css` — Desmos CSS block appended: .desmos-wrapper, #desmos-calculator, .desmos-scroll-overlay with mobile media query, .desmos-toggle-btn with mobile media query

## Decisions Made

- Desmos CSS appended to end of styles.css (not in a separate file) — keeps single stylesheet, consistent with existing pattern; shared automatically by all three Desmos pages in Phase 3 without additional link tags
- Mobile scroll-fix uses a CSS overlay div with `touch-action: pan-y` and a JS toggle class, not passive touchstart event listeners — simpler implementation, no JS required on the overlay element itself
- Toggle button hidden via `display: none` on desktop (not `visibility: hidden`) — zero layout space consumed when not needed
- Desmos API v1.11 demo key with a "REPLACE WITH PRODUCTION KEY" comment added — consistent with plan spec; production key request goes to partnerships@desmos.com

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required during this plan. Note that the Desmos demo key (`dcb31709b452b1cf9dc26972add0fda6`) must be replaced with a production key before go-live. Request from partnerships@desmos.com.

## Next Phase Readiness

- 03-03 (straight-line-graphs) and 03-04 (transformations) are unblocked — Desmos CSS is in styles.css
- All three Desmos pages in Phase 3 can use `.desmos-wrapper`, `.desmos-scroll-overlay`, and `.desmos-toggle-btn` without modification
- Mobile scroll-fix pattern established — copy/paste `toggleDesmosInteraction` function and wrapper div structure to 03-03 and 03-04

---
*Phase: 03-core-content*
*Completed: 2026-02-26*
