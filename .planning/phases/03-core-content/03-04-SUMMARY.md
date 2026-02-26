---
phase: 03-core-content
plan: 04
subsystem: ui
tags: [html, katex, desmos, maths-revision, core-content]

# Dependency graph
requires:
  - phase: 03-02
    provides: Desmos CSS block (.desmos-wrapper, .desmos-scroll-overlay, .desmos-toggle-btn) in styles.css

provides:
  - Straight Line Graphs page with interactive Desmos y=mx+c (m and c sliders, sliderBounds)
  - Speed, Distance and Time page with three formula display equations using \text{}
  - Powers and Roots page with \sqrt{} and \sqrt[3]{} notation throughout
  - Charts and Data page with pie chart sector formula and scatter correlation example
  - All 15 Core topic pages complete — Phase 3 content authoring finished

affects: [04-additional-content, 05-rag-tracker]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Desmos sliderBounds pattern: setExpression with sliderBounds {min, max, step} for interactive variables
    - Mobile scroll-fix: unique id per wrapper (desmos-wrapper-slg) to avoid ID conflicts across pages
    - KaTeX \text{} for words inside display equations (SDT formulae)
    - KaTeX \sqrt[3]{} for cube root notation
    - KaTeX ^{\circ} for degree symbol inside equations

key-files:
  created: []
  modified:
    - core/straight-line-graphs/index.html
    - core/speed-distance-time/index.html
    - core/powers-roots/index.html
    - core/charts-data/index.html

key-decisions:
  - "desmos-wrapper-slg id used (not desmos-wrapper) to avoid ID conflicts with other Desmos pages in the same site"
  - "expressions: true in Desmos constructor — shows expression panel so pupils can see and drag m and c slider values"
  - "Decimal root worked examples added to powers-roots page (sqrt(0.49), cbrt(0.008)) to demonstrate fraction decomposition method"

patterns-established:
  - "Desmos slider pattern: setExpression with latex='var=value' and sliderBounds object — established in 03-02, extended here with two simultaneous sliders"
  - "SDT formula trio: all three rearrangements shown as separate display equations — pupils see all three, not just one"

requirements-completed: [CORE-12, CORE-13, CORE-14, CORE-15, GRAPH-02]

# Metrics
duration: 5min
completed: 2026-02-26
---

# Phase 3 Plan 04: Final Four Core Pages Summary

**Four Core topic pages authored completing all 15 Core stubs: Straight Line Graphs with interactive y=mx+c Desmos sliders (m and c sliderBounds), Speed/Distance/Time with three KaTeX display formulae, Powers and Roots with cube root notation, and Charts and Data with pie chart sector angle formula**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-02-26T21:45:00Z
- **Completed:** 2026-02-26T21:50:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Straight Line Graphs page with Desmos embed: y=mx+c line in blue, m slider (-5 to 5, step 0.5), c slider (-10 to 10, step 1), expressions panel visible, mobile scroll-fix with unique desmos-wrapper-slg id
- Speed, Distance and Time page: all three SDT formulae as KaTeX display equations using \text{Speed}, \text{Distance}, \text{Time}; two worked examples including minutes-to-hours conversion
- Powers and Roots page: square root (\sqrt{}), cube root (\sqrt[3]{}), and powers throughout; worked example 2 demonstrates decimal root decomposition via fractions
- Charts and Data page: pie chart sector angle formula (frequency/total * 360 degrees) as display equation; scatter graph correlation interpretation with causation caveat
- Zero placeholder stubs remaining across all 15 Core topic directories — Phase 3 content complete

## Task Commits

Each task was committed atomically:

1. **Task 1: Author straight-line-graphs topic page with Desmos** - `b1ba6b4` (feat)
2. **Task 2: Author speed-distance-time, powers-roots, and charts-data topic pages** - `1c98095` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `core/straight-line-graphs/index.html` - Complete Desmos embed page: y=mx+c with m and c sliderBounds, mobile scroll-fix, gradient formula in KaTeX, two worked examples
- `core/speed-distance-time/index.html` - Three SDT display formulae using \text{}, two worked examples with unit conversion
- `core/powers-roots/index.html` - Square/cube root notation, powers, two worked examples including decimal roots via fraction decomposition
- `core/charts-data/index.html` - Pie chart sector angle formula, scatter graph correlation worked example

## Decisions Made

- Used `id="desmos-wrapper-slg"` (not generic `desmos-wrapper`) to avoid DOM ID conflicts with other Desmos pages (quadratic-graphs, trigonometry) that use their own unique IDs per the 03-02 pattern.
- Set `expressions: true` in Desmos constructor so the expression list is visible — pupils can see m and c as named sliders and drag them directly, not just see the graph update.
- Added decimal root worked example (sqrt(0.49) and cbrt(0.008)) using fraction decomposition method — adds genuine CE-level challenge beyond integer examples.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 15 Core topic pages authored and committed. Phase 3 is fully complete.
- Phase 4 (Additional Content) can begin — same stub-replacement pattern, same CSS/KaTeX setup.
- Desmos production API key (partnerships@desmos.com) still outstanding before go-live.

---
*Phase: 03-core-content*
*Completed: 2026-02-26*

## Self-Check: PASSED

- FOUND: core/straight-line-graphs/index.html (sliderBounds: 2 occurrences)
- FOUND: core/speed-distance-time/index.html (\text{Speed}: 5 occurrences)
- FOUND: core/powers-roots/index.html (\sqrt[3]{}: 8 occurrences)
- FOUND: core/charts-data/index.html (360: 3 occurrences)
- FOUND: .planning/phases/03-core-content/03-04-SUMMARY.md
- FOUND: commit b1ba6b4 (Task 1 - straight-line-graphs)
- FOUND: commit 1c98095 (Task 2 - three remaining pages)
