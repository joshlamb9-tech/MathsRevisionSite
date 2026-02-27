---
phase: 05-rag-tracker-and-formula-sheets
plan: "01"
subsystem: rag-tracker
tags: [localStorage, javascript, css, html, tracker, rag, confidence]
requirements-completed: [RAG-01, RAG-02, RAG-03, RAG-04, RAG-05]

dependency-graph:
  requires: []
  provides:
    - window.tracker public API (available, getRating, setRating, reset)
    - RAG CSS classes (.rag-selector, .rag-btn, .rag-index-badge, .rag-unavailable)
    - data-topic-slug wiring on all 27 HTML pages
  affects:
    - foundation/index.html
    - core/index.html
    - additional/index.html
    - all 24 topic pages

tech-stack:
  added:
    - assets/js/tracker.js (IIFE module, localStorage, ES3-compatible var syntax)
  patterns:
    - Write-test localStorage availability check (Safari private mode safe)
    - Single namespaced JSON object under 'maths-revision:tracker'
    - Inline DOMContentLoaded wiring on every topic page (no bundler)
    - Badge injection via createElement on index pages

key-files:
  created:
    - assets/js/tracker.js
  modified:
    - assets/css/styles.css
    - foundation/fractions/index.html
    - foundation/division/index.html
    - foundation/prime-factors/index.html
    - foundation/estimation/index.html
    - foundation/long-multiplication/index.html
    - foundation/averages/index.html
    - core/ratio/index.html
    - core/percentages/index.html
    - core/algebra-basics/index.html
    - core/shape/index.html
    - core/averages/index.html
    - core/angles/index.html
    - core/probability/index.html
    - core/coordinates-graphs/index.html
    - core/transformations/index.html
    - core/volume-surface-area/index.html
    - core/sequences-nth-term/index.html
    - core/straight-line-graphs/index.html
    - core/speed-distance-time/index.html
    - core/powers-roots/index.html
    - core/charts-data/index.html
    - additional/index-laws/index.html
    - additional/expanding-factorising/index.html
    - additional/pythagoras/index.html
    - foundation/index.html
    - core/index.html
    - additional/index.html

decisions:
  - "Write-test localStorage check used (not typeof) — handles Safari private browsing which throws on setItem"
  - "var throughout tracker.js (not const/let) — broadest compatibility with old school iPad Safari versions"
  - "Single namespaced key 'maths-revision:tracker' — prevents localStorage collision with French revision site on same GitHub Pages origin"
  - "Foundation pages: RAG block inserted after .non-calc-badge; Core/Additional: after h1.page-title — consistent placement per level"
  - "Formula sheet links added to all 3 index pages pointing to /level/formulas/ — safe forward links for 05-02"
  - "Inline DOMContentLoaded scripts used on all pages — no ES modules, matches GitHub Pages static constraint"

metrics:
  duration: "7 min 29 sec"
  completed: "2026-02-27"
  tasks-completed: 3
  tasks-total: 3
  files-created: 1
  files-modified: 27
---

# Phase 05 Plan 01: RAG Confidence Tracker Summary

RAG self-assessment tracker using localStorage write-test pattern, wired to all 24 topic pages and 3 level index pages with coloured dot badges.

## What Was Built

### Task 1: tracker.js + RAG CSS (commit a24a60e)

Created `assets/js/tracker.js` as a self-contained IIFE with `'use strict'`. Key design choices:

- `isStorageAvailable()` uses a write-test (`setItem` / `removeItem`) inside try/catch — not `typeof localStorage` which is insufficient for Safari private mode
- `var available = isStorageAvailable()` captured at module level
- `readAll()` returns `{}` on any failure (unavailable, null, JSON corrupt)
- `writeAll(data)` silently swallows quota errors
- `window.tracker` exposes: `available`, `getRating(slug)`, `setRating(slug, rating)`, `reset()`
- `reset()` uses `localStorage.removeItem` inside try/catch — no crash on restricted environments
- All var (no const/let) for old Safari on school iPads

Added `/* ─── RAG TRACKER ─── */` section to `assets/css/styles.css`:
- `.rag-selector` flex layout with wrap
- `.rag-btn` with opacity 0.45 unselected, 1.0 active with border-color and box-shadow
- `.rag-btn.rag-red` (#dc2626), `.rag-btn.rag-amber` (#d97706), `.rag-btn.rag-green` (#16a34a)
- `.rag-index-badge` 10px circle with matching colours
- `.rag-unavailable` yellow warning banner (#fef9c3 / #fde047)
- `@media print` rule hides `.rag-selector` and `.rag-unavailable`

### Task 2: 24 topic pages wired (commit 54cb51b)

All 24 topic pages received:
1. `<script defer src="/MathsRevisionSite/assets/js/tracker.js">` in `<head>` after styles.css
2. `.rag-selector` div with correct `data-topic-slug` (locked Phase 1 slugs verbatim)
3. `.rag-unavailable` div hidden by default
4. Inline `DOMContentLoaded` script with: null check on sel, availability gate (shows warning, hides selector), `applyRating()` helper, click handler delegating to `.rag-btn`

Placement: Foundation pages — after `.non-calc-badge` (before `<h2>Key Facts</h2>`). Core and Additional pages — after `<h1 class="page-title">` (before `<h2>Key Facts</h2>`).

### Task 3: 3 level index pages (commit f71cbeb)

All 3 level index pages (foundation, core, additional) received:
1. tracker.js script tag in head
2. `data-topic-slug` attribute on every `<li>` in `.topic-list` — 6 Foundation, 15 Core, 3 Additional
3. Badge injection script after `</ul>`: guards on `tracker.available`, iterates slugged li elements, creates `<span class="rag-index-badge rag-{rating}">` and appends inside the `<a>` tag
4. Formula sheet link (`<p class="formula-sheet-link">`) pointing to `/level/formulas/` — forward link for plan 05-02

## Deviations from Plan

None — plan executed exactly as written.

## Success Criteria Verification

- RAG-01: Red/Amber/Green buttons visible on all 24 topic pages, active state styling via `.rag-active` class
- RAG-02: Ratings persist in localStorage under single JSON object at key `'maths-revision:tracker'`
- RAG-03: Coloured dot badges (.rag-index-badge) injected on level index pages for any rated topic
- RAG-04: `.rag-unavailable` banner shown when `tracker.available` is false; selector hidden; no JS crash
- RAG-05: Single key `'maths-revision:tracker'` — tracker.js creates no other localStorage keys

## Self-Check: PASSED

| Item | Status |
|------|--------|
| assets/js/tracker.js | FOUND |
| assets/css/styles.css | FOUND |
| foundation/fractions/index.html | FOUND |
| foundation/index.html | FOUND |
| commit a24a60e (Task 1) | FOUND |
| commit 54cb51b (Task 2) | FOUND |
| commit f71cbeb (Task 3) | FOUND |
