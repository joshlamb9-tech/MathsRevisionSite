---
phase: 01-scaffold-and-foundation
plan: 02
subsystem: infra
tags: [katex, mathjax, github-pages, jekyll, css, math-rendering]

# Dependency graph
requires:
  - phase: 01-scaffold-and-foundation/01-01
    provides: ".nojekyll at repo root (required for prime notation), base stylesheet, GitHub Pages deployment"
provides:
  - "KaTeX 0.16.33 integrated via jsDelivr CDN with all four pitfalls resolved"
  - "KaTeX head block template — exact HTML to copy into every topic page"
  - ".katex-display overflow fix in base stylesheet — applies to all topic pages automatically"
  - "Live GitHub Pages verification that f'(x) prime notation renders correctly"
  - "/katex-test/ page proving all 6 equation types work on deployed site"
affects:
  - phases 2-4 topic pages (every topic page uses this KaTeX head block)
  - 01-03 (remaining Phase 1 scaffold work)

# Tech tracking
tech-stack:
  added:
    - "KaTeX 0.16.33 (CDN via jsDelivr)"
    - "katex-swap.min.css (swap font-display variant, FOIT prevention)"
    - "katex auto-render extension 0.16.33"
  patterns:
    - "defer on both KaTeX scripts + onload callback on auto-render — prevents FOUC and timing race"
    - "$$ delimiter listed before $ in delimiters array — prevents $$ being parsed as two empty $ expressions"
    - "SRI on JS, not CSS — CSS hashes unconfirmed in official KaTeX docs; acceptable for school site"
    - "katex-swap.min.css not katex.min.css — prevents invisible text during font load"

key-files:
  created:
    - "katex-test/index.html — KaTeX verification page with 6 test cases"
  modified:
    - "assets/css/styles.css — added .katex-display overflow fix and .katex font-size rule"

key-decisions:
  - "Use katex-swap.min.css not katex.min.css — swap variant prevents FOIT on slow connections"
  - "Omit SRI on CSS file — katex-swap.min.css hash not confirmed in official KaTeX docs; JS hashes are confirmed and cover the execution risk"
  - "$$ delimiter listed before $ — order matters; $ first would greedily consume $$ as two empty inline expressions"
  - "onload callback on auto-render script (not DOMContentLoaded or window.onload) — guarantees katex.min.js is already parsed when auto-render runs"

patterns-established:
  - "KaTeX head block: defer + SRI on katex.min.js, defer + SRI + onload on auto-render.min.js, $$ before $ in delimiters"
  - "Global overflow fix in base stylesheet — .katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.5em 0; }"

requirements-completed: [INFRA-01, INFRA-02, INFRA-03, INFRA-05]

# Metrics
duration: ~30min (including GitHub Pages deployment wait and live verification)
completed: 2026-02-26
---

# Phase 1 Plan 02: KaTeX Integration Summary

**KaTeX 0.16.33 integrated via jsDelivr with all four pitfalls resolved and all 6 test cases verified live on GitHub Pages at https://joshlamb9-tech.github.io/MathsRevisionSite/katex-test/**

## Performance

- **Duration:** ~30 min (including GitHub Pages deployment + human verification)
- **Started:** 2026-02-26T18:00:00Z
- **Completed:** 2026-02-26T18:51:40Z
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 2

## Accomplishments

- KaTeX 0.16.33 loaded from jsDelivr CDN with SRI integrity hashes on both JS files
- All four KaTeX pitfalls resolved: defer timing, delimiter order, Jekyll smart quotes (.nojekyll), mobile overflow CSS
- Live GitHub Pages verification passed — f'(x) prime notation confirmed rendering correctly on deployed site (the pitfall that only manifests on GitHub Pages, not localhost)
- Established canonical KaTeX head block template for all topic pages in Phases 2-4

## Task Commits

Each task was committed atomically:

1. **Task 1: Add KaTeX mobile overflow CSS** - `6c347af` (feat)
2. **Task 2: Create KaTeX test page and push to GitHub Pages** - `b5bc0f7` (feat)
3. **Task 3: Checkpoint — live GitHub Pages verification** - human-verify (approved by Josh)

## Files Created/Modified

- `assets/css/styles.css` — Added KaTeX section: `.katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.5em 0; }` and `.katex { font-size: 1.1em; }`
- `katex-test/index.html` — Dedicated KaTeX verification page with 6 test cases covering inline, display, prime notation, long equation mobile overflow, nested fractions, and mixed inline+display

## Live URL

**KaTeX test page:** https://joshlamb9-tech.github.io/MathsRevisionSite/katex-test/

All 6 test cases confirmed passing on live URL:
1. Inline equations ($A = \pi r^2$, $a^2 + b^2 = c^2$)
2. Display (block) quadratic formula
3. Prime notation ($f'(x)$, $g''(x)$, $h'''(x)$) — Jekyll pitfall resolved
4. Long display equation scrolls horizontally on mobile (overflow fix working)
5. Nested fractions (3 levels deep)
6. Mixed inline and display on same page

## KaTeX Head Block Template

Copy this into the `<head>` of every topic page:

```html
<!-- KaTeX 0.16.33 — swap CSS (FOIT prevention), no SRI on CSS (hash unconfirmed in official docs) -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex-swap.min.css"
      crossorigin="anonymous">

<!-- PITFALL 1 FIX: defer on BOTH scripts. onload callback on auto-render only. -->
<script defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.js"
        integrity="sha384-YPHNAPyrxGS8BNnA7Q4ommqra8WQPEjooVSLzFgwgs8OXJBvadbyvx4QpfiFurGr"
        crossorigin="anonymous"></script>

<script defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/contrib/auto-render.min.js"
        integrity="sha384-JKXHIJf8PKPyDFptuKZoUyMRQJAmQKj4B4xyOca62ebJhciMYGiDdq/9twUUWyZH"
        crossorigin="anonymous"
        onload="renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ]
        });"></script>
<!-- PITFALL 2 NOTE: $$ listed BEFORE $ — putting $ first would eat $$ as two empty expressions -->
```

## The Four Pitfalls — Resolved

| Pitfall | Risk | Fix Applied | Verified |
|---------|------|-------------|---------|
| 1. Scripts without defer | Raw LaTeX flash on cold load | `defer` on both scripts, `onload` callback on auto-render | Yes — no FOUC observed |
| 2. Delimiter order ($ before $$) | $$ parsed as two empty $ expressions | $$ listed first in delimiters array | Yes — display equations centred correctly |
| 3. Jekyll smart quotes | f'(x) apostrophe mangled → KaTeX parse error | .nojekyll at repo root (done in 01-01) | Yes — f'(x) renders on live URL |
| 4. Mobile overflow | Display equations cut off on phone screens | `.katex-display { overflow-x: auto; }` in base stylesheet | Yes — Test 4 scrolls horizontally |

## SRI Hash Status

| File | Hash | Status |
|------|------|--------|
| katex.min.js | `sha384-YPHNAPyrxGS8BNnA7Q4ommqra8WQPEjooVSLzFgwgs8OXJBvadbyvx4QpfiFurGr` | Confirmed from katex.org official docs |
| auto-render.min.js | `sha384-JKXHIJf8PKPyDFptuKZoUyMRQJAmQKj4B4xyOca62ebJhciMYGiDdq/9twUUWyZH` | Confirmed from katex.org official docs |
| katex-swap.min.css | Not applied | Hash not confirmed in official KaTeX docs. Omitted — stylesheets are lower risk than scripts; acceptable for a school site |

## Decisions Made

- **katex-swap.min.css over katex.min.css:** Swap variant uses `font-display: swap` preventing invisible text (FOIT) during font load on slow school network connections
- **SRI omitted on CSS:** The katex-swap.min.css SRI hash is not published in official KaTeX docs. JS files carry execution risk (XSS); CSS files carry styling risk only — acceptable tradeoff for a school site
- **$$ before $ in delimiters:** Critical ordering. The $ delimiter is greedy — if listed first, it matches the first $ of $$ and produces a broken inline expression. $$ must be listed first
- **onload callback on auto-render:** Not `DOMContentLoaded` or `window.onload`. The `onload` attribute fires after the script itself is parsed, which is the only guarantee that `katex.min.js` (the peer dependency) has already executed

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None. The GitHub Pages deployment and live verification went smoothly. The .nojekyll file (placed in 01-01) correctly prevented Jekyll from mangling prime notation apostrophes.

## User Setup Required

None — no external service configuration required beyond what was completed in 01-01 (GitHub repo + Pages setup).

## Next Phase Readiness

- KaTeX head block template established — copy into every topic page in Phases 2-4
- Mobile overflow CSS in base stylesheet — no per-page action needed
- Live URL confirmed working: https://joshlamb9-tech.github.io/MathsRevisionSite/katex-test/
- Phase 1 Plan 03 (remaining scaffold) can proceed

## Self-Check: PASSED

- FOUND: .planning/phases/01-scaffold-and-foundation/01-02-SUMMARY.md
- FOUND: assets/css/styles.css
- FOUND: katex-test/index.html
- FOUND commit: 6c347af (Task 1 — KaTeX overflow CSS)
- FOUND commit: b5bc0f7 (Task 2 — KaTeX test page)

---
*Phase: 01-scaffold-and-foundation*
*Completed: 2026-02-26*
