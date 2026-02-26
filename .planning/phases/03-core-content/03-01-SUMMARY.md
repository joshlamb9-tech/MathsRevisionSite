---
phase: 03-core-content
plan: 01
subsystem: ui
tags: [html, katex, maths-revision, core-level, content]

# Dependency graph
requires:
  - phase: 01-scaffold-and-foundation
    provides: Core stub pages with KaTeX head block, nav, and breadcrumb structure
  - phase: 02-foundation-content
    provides: Established topic page content pattern (breadcrumb > badge > h1 > key facts > worked examples)
provides:
  - Five fully authored Core topic pages replacing stubs
  - Ratio page with sharing-in-ratio and unitary method examples
  - Percentages page with percentage increase and reverse percentage examples
  - Algebra Basics page with linear equation solving and bracket expansion examples
  - Shape page with circle area/circumference and trapezium area examples
  - Averages Core page with frequency table mean (sum fx / sum f) and median examples
affects: [03-core-content, 05-rag-tracker]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Core topic pages use identical KaTeX head block pattern — defer on both scripts, onload callback, $$ before $ in delimiters
    - No non-calculator badge on any Core page (Core = Paper 2, calculator allowed)
    - Frequency table uses inline styles for border/padding to match existing site conventions
    - Core averages page deliberately extends Foundation averages with frequency table worked example

key-files:
  created: []
  modified:
    - core/ratio/index.html
    - core/percentages/index.html
    - core/algebra-basics/index.html
    - core/shape/index.html
    - core/averages/index.html

key-decisions:
  - "Core averages page includes frequency table worked example (sum fx / sum f) to distinguish Core from Foundation level"
  - "No non-calculator badge on any Core page — Core = Calculator (Paper 2)"

patterns-established:
  - "Core topic page structure: breadcrumb > Core badge > h1 > Key Facts h2/ul > Worked Example h2/ol (x2)"
  - "Averages Core extends Foundation: frequency table as first worked example, raw list median as second"

requirements-completed: [CORE-01, CORE-02, CORE-03, CORE-04, CORE-05]

# Metrics
duration: 3min
completed: 2026-02-26
---

# Phase 3 Plan 01: Core Content — Ratio, Percentages, Algebra, Shape, Averages Summary

**Five Core topic stubs replaced with fully authored pages covering ratio, percentages, algebra, shape, and averages — each with KaTeX-rendered equations, 5 key facts, and two step-by-step worked examples**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T21:37:49Z
- **Completed:** 2026-02-26T21:40:42Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Replaced all five Core topic stubs with complete HTML pages matching the established Foundation content pattern
- Averages Core page extends the Foundation version with a frequency table worked example using the sum fx / sum f formula
- Zero non-calculator badges across all five Core pages — Core correctly identified as calculator (Paper 2)
- All pages have KaTeX auto-render, Core level badge, and breadcrumb links back to /MathsRevisionSite/core/

## Task Commits

Each task was committed atomically:

1. **Task 1: Author ratio, percentages, and algebra-basics topic pages** - `77d298f` (feat)
2. **Task 2: Author shape and averages (Core) topic pages** - `086ae00` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `core/ratio/index.html` - Sharing-in-ratio and unitary method worked examples
- `core/percentages/index.html` - Percentage increase and reverse percentage worked examples
- `core/algebra-basics/index.html` - Linear equation solving and bracket expansion worked examples
- `core/shape/index.html` - Circle area/circumference and trapezium area worked examples
- `core/averages/index.html` - Frequency table mean (sum fx/sum f) and median from ordered list

## Decisions Made
- Core averages page includes a frequency table as Worked Example 1 — this is the distinguishing feature between Core and Foundation averages (Foundation uses raw list only)
- No non-calculator badge on any Core page, consistent with plan spec (Core = Paper 2, calculator allowed)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All five Core topic pages authored and ready
- Phase 3 Plan 02 (remaining Core topics) can proceed: sequences-nth-term, probability, powers-roots, coordinates-graphs, straight-line-graphs
- All pages follow established pattern — authoring remaining Core topics is straightforward

---
*Phase: 03-core-content*
*Completed: 2026-02-26*
