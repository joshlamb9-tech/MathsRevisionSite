---
phase: 05-rag-tracker-and-formula-sheets
plan: "02"
subsystem: ui
tags: [katex, html, css, print, formula-sheets]

# Dependency graph
requires:
  - phase: 05-rag-tracker-and-formula-sheets/05-01
    provides: RAG tracker CSS and tracker.js already in place; formula links on index pages pointing to /level/formulas/
  - phase: 01-scaffold-and-foundation
    provides: KaTeX CDN setup pattern, root-relative path convention, Dosis font setup
provides:
  - Three printable formula reference pages (Foundation, Core, Additional) with KaTeX-rendered formulas
  - Formula sheet CSS (screen and print) in assets/css/styles.css
  - @page A4 print setup with nav/header/footer hidden from print output
  - break-inside: avoid on .formula-block to prevent mid-formula page splits
affects:
  - Any future pages that use .formula-section or .formula-block classes
  - Print stylesheet — @page A4 applies globally when print is triggered

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Formula blocks pattern: .formula-section > h2 + .formula-block (one concept per block)
    - Print CSS pattern: separate @media print block for formula pages, additive to existing RAG print rules
    - Printer-ready A4 layout via @page { size: A4; margin: 1.5cm }

key-files:
  created:
    - foundation/formulas/index.html
    - core/formulas/index.html
    - additional/formulas/index.html
  modified:
    - assets/css/styles.css

key-decisions:
  - "Second @media print block added (not merged into RAG block) — additive CSS, both blocks valid and browsers merge them"
  - "No tracker.js script tag on formula pages — formula sheets have no topic slug and no RAG confidence buttons"
  - "break-inside: avoid + page-break-inside: avoid (fallback) on .formula-block — modern browsers + older Safari"
  - "formula-print-hint paragraph hidden in print via display:none — instruction text irrelevant on paper"
  - "breadcrumb uses &rsaquo; entity — consistent with Core/Additional page pattern from Phase 4"

patterns-established:
  - "Formula page structure: breadcrumb > level-badge > h1 > formula-print-hint > formula-section* > footer"
  - "One formula concept per .formula-block div — keeps break-inside: avoid meaningful and prevents visual clutter"

requirements-completed: [FORM-01, FORM-02, FORM-03, FORM-04]

# Metrics
duration: 2min
completed: 2026-02-27
---

# Phase 5 Plan 02: Formula Sheets Summary

**Three KaTeX formula reference pages (Foundation/Core/Additional) with A4 print CSS — one-stop pre-exam printable for each level**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-27T10:39:49Z
- **Completed:** 2026-02-27T10:41:49Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created `foundation/formulas/index.html` covering Averages, Fractions, Prime Factors, Estimation, Long Multiplication — all with KaTeX-rendered formulas
- Created `core/formulas/index.html` covering Percentages, Ratio, Algebra, Sequences, Straight Line Graphs, Speed/Distance/Time, Area and Volume
- Created `additional/formulas/index.html` covering all 5 Index Laws, Expanding/Factorising (FOIL, factorising, DOTS), Pythagoras' Theorem
- Added formula screen CSS (.formula-section, .formula-block, .formula-print-hint) and print CSS (@page A4, nav hidden, break-inside avoid) to styles.css

## Task Commits

Each task was committed atomically:

1. **Task 1: Add formula screen and print CSS to styles.css** - `d0bd593` (feat)
2. **Task 2: Create the three formula reference HTML pages** - `a29fc26` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `assets/css/styles.css` - Added .formula-section, .formula-block, .formula-print-hint screen styles and @media print block with @page A4 sizing, nav/header/footer hidden, break-inside: avoid on formula blocks
- `foundation/formulas/index.html` - Foundation formula reference: Averages (mean, range), Fractions (add/sub/multiply/divide), Prime Factors, Estimation, Long Multiplication
- `core/formulas/index.html` - Core formula reference: Percentages (4 forms), Ratio, Algebra (collecting terms/expanding/DOTS), Sequences (nth term), Straight Line Graphs, Speed/Distance/Time, Area and Volume (6 formulas)
- `additional/formulas/index.html` - Additional formula reference: 5 Index Laws, Expanding/Factorising (FOIL/factorising/DOTS), Pythagoras (theorem + finding each side)

## Decisions Made
- Second `@media print` block added separately rather than merged into the RAG print block — both are valid CSS and browsers merge `@media print` blocks correctly. Keeps formula print rules clearly separated and readable.
- No `tracker.js` script tag on formula pages — these pages have no `data-topic-slug` and no RAG confidence selector; including tracker.js would be dead weight.
- `page-break-inside: avoid` included alongside `break-inside: avoid` on `.formula-block` as explicit legacy fallback for older Safari on school iPads.
- `formula-print-hint` hidden in print (`display: none !important`) — the "press Ctrl+P" instruction is meaningless on paper.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 phases complete. All 10 requirements satisfied (RAG-01 through RAG-05, FORM-01 through FORM-04, plus all earlier phase requirements).
- Site is ready for deployment review. Remaining pre-launch items: Desmos production API key (from partnerships@desmos.com), Mowden Hall brand colour confirmation.
- Formula sheet links were already placed on all 3 level index pages in plan 05-01 — no further wiring needed.

---
*Phase: 05-rag-tracker-and-formula-sheets*
*Completed: 2026-02-27*

## Self-Check: PASSED

- foundation/formulas/index.html: FOUND
- core/formulas/index.html: FOUND
- additional/formulas/index.html: FOUND
- assets/css/styles.css: FOUND
- 05-02-SUMMARY.md: FOUND
- Commit d0bd593: FOUND
- Commit a29fc26: FOUND
