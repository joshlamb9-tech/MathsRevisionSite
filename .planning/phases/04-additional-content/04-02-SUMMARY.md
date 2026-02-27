---
phase: 04-additional-content
plan: 02
subsystem: additional-content
tags: [pythagoras, desmos, katex, interactive-graph, additional-level]
one-liner: "Pythagoras topic page with KaTeX worked examples (6-8-10 hypotenuse, 5-12-13 shorter side) and Desmos right-triangle graph with a/b sliders and mobile scroll fix"

dependency-graph:
  requires:
    - 04-01 (additional stubs and Additional index — provides page shell)
    - Phase 3 Desmos CSS pattern (desmos-wrapper, overlay, toggle button in styles.css)
  provides:
    - additional/pythagoras/index.html (fully authored topic page)
    - ADD-03 requirement complete
    - GRAPH-04 requirement complete
  affects:
    - Phase 5 RAG tracker (slug "pythagoras" is a localStorage key — must not change)

tech-stack:
  added:
    - Desmos GraphingCalculator API v1.11 (added to Pythagoras page head only)
  patterns:
    - KaTeX display equations in Key Facts and Worked Examples (established pattern)
    - Scoped Desmos wrapper ID (desmos-wrapper-pyth) — avoids ID conflicts across pages
    - CSS overlay + JS toggle for mobile scroll fix (established in Phase 3)
    - expressions:true in Desmos constructor — slider panel visible to pupils

key-files:
  created: []
  modified:
    - additional/pythagoras/index.html

decisions:
  - "[04-02]: desmos-wrapper-pyth ID used — scoped, consistent with desmos-wrapper-slg and desmos-wrapper-trans pattern from Phase 3"
  - "[04-02]: Default a=3, b=4 — 3-4-5 triple loads immediately so pupils see c=5 without needing to adjust sliders"
  - "[04-02]: Purple (#7c3aed) used for Desmos hypotenuse and triangle — matches Additional level brand colour"

metrics:
  duration: "1 min"
  completed: "2026-02-27"
  tasks-completed: 1
  tasks-total: 1
  files-modified: 1
---

# Phase 4 Plan 2: Pythagoras Page Summary

Pythagoras topic page with KaTeX worked examples (6-8-10 hypotenuse, 5-12-13 shorter side) and Desmos right-triangle graph with a/b sliders and mobile scroll fix.

## What Was Built

The `additional/pythagoras/index.html` stub was replaced with a fully authored topic page completing requirements ADD-03 and GRAPH-04.

**Page structure:**
- Breadcrumb: Home > Additional > Pythagoras
- Purple "Additional" level badge (no non-calculator badge — Additional = calculator paper)
- Key Facts: main theorem display equation, hypotenuse identification rule, find-hypotenuse formula, find-shorter-side formula, classic triples (3-4-5, 5-12-13, 8-15-17) with note on multiples
- Worked Example 1: 6-8-10 triangle (find hypotenuse) — 4 numbered steps with display KaTeX at each step; notes the 6-8-10 is a multiple of 3-4-5
- Worked Example 2: 5-12-13 triangle (find shorter side) — 4 numbered steps including explicit rearrangement step $a^2 = c^2 - b^2$; names the classic triple
- Desmos interactive graph: right-angled triangle with sliders for $a$ and $b$, live $c = \sqrt{a^2 + b^2}$ in expression panel, polygon triangle drawn from (0,0), (a,0), (0,b)
- Mobile scroll fix: `desmos-wrapper-pyth` CSS overlay + toggle button (established Phase 3 pattern)

**File stats:** 162 lines (above 160-line minimum).

## Tasks

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Author Pythagoras page with Desmos embed (ADD-03, GRAPH-04) | 54ea8fd | additional/pythagoras/index.html |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `additional/pythagoras/index.html` exists and is 162 lines
- [x] `desmos-wrapper-pyth` appears twice (wrapper div + toggle function reference)
- [x] `level-badge additional` present, no non-calculator badge
- [x] Two worked examples present
- [x] Desmos script tag in head pointing to v1.11 API
- [x] Commit 54ea8fd confirmed in git log
