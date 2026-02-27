---
phase: 04-additional-content
plan: "01"
subsystem: additional-content
tags: [html, katex, index-laws, expanding-factorising, algebra, additional-level]
dependency_graph:
  requires: []
  provides: [ADD-01, ADD-02]
  affects: [additional/index-laws/index.html, additional/expanding-factorising/index.html]
tech_stack:
  added: []
  patterns: [topic-page-content-structure, katex-display-equations, foil-worked-example]
key_files:
  created: []
  modified:
    - additional/index-laws/index.html
    - additional/expanding-factorising/index.html
decisions:
  - "No non-calculator badge on Additional pages (Additional = Calculator, Paper 2) — consistent with Core pages"
  - "Breadcrumb uses &rsaquo; entity (matches Core page pattern, not raw ›)"
  - "Difference of two squares included as third Key Fact on Expanding/Factorising page — adds genuine pedagogical value and meets CE 13+ spec"
  - "FOIL labelled explicitly (First/Outer/Inner/Last) in worked example steps — helps pupils who have been taught the mnemonic"
  - "Factorising check step shown as full FOIL expansion — pupils can verify their own work using the same technique"
metrics:
  duration_seconds: 80
  completed_date: "2026-02-27"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 4 Plan 1: Index Laws and Expanding/Factorising Summary

**One-liner:** Two Additional-level algebra topic pages authored with KaTeX Key Facts and fully worked FOIL/index-law examples.

## What Was Built

### Task 1: Index Laws (ADD-01)

File: `additional/index-laws/index.html` — 126 lines

Placeholder paragraph replaced with:
- **Key Facts** (5 laws): multiplication (`a^m x a^n = a^{m+n}`), division (`a^m / a^n = a^{m-n}`), power of a power (`(a^m)^n = a^{mn}`), zero index (`a^0 = 1`), negative index (`a^{-n} = 1/a^n`) — all displayed as KaTeX equations
- **Worked Example 1**: Simplify `5^3 x 5^4` (= `5^7`) and `2^7 / 2^3` (= `2^4 = 16`) — covers multiplication and division laws
- **Worked Example 2**: `(3^2)^4 = 3^8`, `7^0 = 1`, `3^{-2} = 1/9` — covers power of a power, zero index, and negative index

### Task 2: Expanding and Factorising (ADD-02)

File: `additional/expanding-factorising/index.html` — 121 lines

Placeholder paragraph replaced with:
- **Key Facts** (3 rules): FOIL double bracket expansion `(x+a)(x+b) = x^2 + (a+b)x + ab`, factorising `x^2 + bx + c` (find two numbers that multiply to c and add to b), difference of two squares `a^2 - b^2 = (a+b)(a-b)` with example `x^2 - 9 = (x+3)(x-3)`
- **Worked Example 1**: Expand `(x+3)(x-2)` using four explicit FOIL steps then collect like terms to get `x^2 + x - 6`
- **Worked Example 2**: Factorise `x^2 + 5x + 6` — list factor pairs of 6, select (2,3), write `(x+2)(x+3)`, then verify by expanding back with FOIL showing checkmark

## Commits

| Hash | Task | Description |
|------|------|-------------|
| `f5c5fcb` | Task 1 | feat(04-01): author Index Laws topic page (ADD-01) |
| `4501f4c` | Task 2 | feat(04-01): author Expanding and Factorising topic page (ADD-02) |

## Verification

Both pages confirmed passing:
- `level-badge additional` present (1 instance each)
- Nav `active` class on "Additional" link
- Zero `non-calc` badge instances
- Breadcrumb links use `/MathsRevisionSite/additional/` pattern
- Index Laws: 126 lines (min 120 met)
- Expanding/Factorising: 121 lines (min 120 met)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

All files confirmed present and all commits verified in git log.
