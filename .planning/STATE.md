# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.
**Current focus:** Phase 3 COMPLETE — all 15 Core topic pages authored; Phase 4 (Additional Content) next

## Current Position

Phase: 3 of 5 (Core Content) — COMPLETE
Plan: 4 of 4 in phase (03-04 complete — Straight Line Graphs with Desmos y=mx+c sliders, Speed/Distance/Time, Powers/Roots, Charts/Data authored)
Status: Phase 3 fully complete — all 15 Core topic pages authored; Phase 4 (Additional Content) next
Last activity: 2026-02-26 — 03-04 four topic pages authored, all Core stubs replaced

Progress: [████████████████░░░░] 80%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 18 min
- Total execution time: 145 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-scaffold-and-foundation | 3 | 131 min | 44 min |
| 02-foundation-content | 2 | 4 min | 2 min |
| 03-core-content | 4 | 18 min | 4.5 min |

**Recent Trend:**
- Last 5 plans: 02-02 (2 min), 03-01 (3 min), 03-02 (2 min), 03-03 (8 min), 03-04 (5 min)
- Trend: Phase 3 content plans very fast — pure content authoring against pre-built stubs, same pattern as Phase 2

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-planning]: GitHub Pages (static) — matches French site, zero hosting cost
- [Pre-planning]: KaTeX over MathJax — faster render, smaller bundle, sufficient for CE-level maths
- [Pre-planning]: localStorage for RAG tracker — no backend, works offline, GDPR-friendly
- [Pre-planning]: .nojekyll required — prevents Jekyll from mangling prime notation
- [01-01]: Inline nav in every HTML file — fetch() fragments fail silently on GitHub Pages with Safari (CORS)
- [01-01]: Root-relative paths (/assets/css/styles.css) — relative paths break at directory depth ≥1
- [01-01]: --mh-navy (#1a2744) and --mh-gold (#c9962c) are PLACEHOLDER values — Josh must confirm
- [01-02]: katex-swap.min.css over katex.min.css: swap variant prevents FOIT on slow school network connections
- [01-02]: SRI omitted on CSS: katex-swap hash not in official docs; CSS carries styling risk only — acceptable for school site
- [01-02]: Delimiter order $$ before $: prevents greedy inline $ from consuming $$
- [01-02]: onload callback on auto-render (not DOMContentLoaded): guarantees katex.min.js is parsed first
- [01-03]: 24 topic slugs LOCKED — must not be changed; Phase 5 RAG tracker uses these as localStorage keys
- [01-03]: GitHub Pages project site path fix — all href="/" paths must use /MathsRevisionSite/ prefix; root-relative paths resolve to domain root (not project subdirectory)
- [01-03]: If custom domain added later, find-and-replace /MathsRevisionSite/ → / across all 29 HTML files
- [02-01]: Non-calculator badge uses inline style (no class in styles.css yet) — consistent with plan spec; class can be extracted to stylesheet in a future pass
- [02-01]: Topic page content structure locked: breadcrumb > level-badge > h1 > non-calc-badge > Key Facts h2/ul > Worked Example h2/ol (×2) — use this pattern for all remaining topic stubs
- [02-02]: Added "Which Average to Use?" section to averages page to meet 120-line minimum and add genuine pedagogical value
- [02-02]: Display equations in Key Facts (mean formula, range formula) — sets precedent for formulae-heavy Core topics
- [03-01]: Core averages page includes frequency table worked example (sum fx / sum f) to distinguish Core from Foundation level
- [03-01]: No non-calculator badge on any Core page — Core = Calculator (Paper 2)
- [03-02]: Desmos CSS appended to end of styles.css (not separate file) — single stylesheet shared by all Desmos pages in phase 3 without extra link tags
- [03-02]: Mobile scroll-fix uses CSS overlay + JS toggle class (not passive touchstart listeners) — simpler, no JS on overlay element
- [03-02]: Desmos toggle button hidden via display:none on desktop — zero layout space consumed
- [03-02]: Demo API key dcb31709b452b1cf9dc26972add0fda6 with REPLACE comment — production key from partnerships@desmos.com before go-live
- [03-03]: Desmos wrapper id set to desmos-wrapper-trans (scoped) — avoids clash with coordinates page desmos-wrapper if both ever loaded in same session
- [03-03]: U_n notation enforced for sequences (not a_n) — CE 13+ standard
- [03-03]: \text{cm}^3 KaTeX pattern established for volume/area units — precedent for future shape/measure pages
- [03-04]: desmos-wrapper-slg id used on straight-line-graphs page — avoids ID conflicts with other Desmos pages
- [03-04]: expressions: true in Desmos constructor (SLG page) — expression panel visible so pupils can see and drag m and c sliders
- [03-04]: Decimal root worked examples (sqrt(0.49), cbrt(0.008)) — fraction decomposition method established for powers-roots page

### Pending Todos

None yet.

### Blockers/Concerns

- **Desmos production API key** — demo key dcb31709b452b1cf9dc26972add0fda6 in use; production key needed before go-live (request from partnerships@desmos.com).
- **Offline use decision** — if site must work on school laptops with no internet, KaTeX must be self-hosted and Desmos cannot be embedded. Resolve before Phase 3.

### Resolved

- ~~**10 missing Core topics** — Maths teacher input required~~ — Claude will research and author all 10 missing Core topics directly from CE 13+ spec. No external content dependency.

## Session Continuity

Last session: 2026-02-26T21:50:00Z
Stopped at: Completed 03-04-PLAN.md — Straight Line Graphs (Desmos sliders), Speed/Distance/Time, Powers/Roots, Charts/Data authored. Phase 3 complete.
Resume file: None
