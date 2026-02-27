# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.
**Current focus:** Phase 4 (Additional Content) in progress — 04-01 and 04-02 complete; 04-03 and 04-04 remain

## Current Position

Phase: 4 of 5 (Additional Content) — IN PROGRESS
Plan: 2 of 4 in phase (04-01 complete — Index Laws and Expanding/Factorising; 04-02 complete — Pythagoras with Desmos)
Status: ADD-01, ADD-02, ADD-03, GRAPH-04 complete; 04-03 and 04-04 remain
Last activity: 2026-02-27 — 04-01 Index Laws and Expanding/Factorising authored (ADD-01, ADD-02); 04-02 Pythagoras page authored with KaTeX and Desmos embed (ADD-03, GRAPH-04)

Progress: [█████████████████░░░] 85%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: ~17 min
- Total execution time: ~146 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-scaffold-and-foundation | 3 | 131 min | 44 min |
| 02-foundation-content | 2 | 4 min | 2 min |
| 03-core-content | 4 | 18 min | 4.5 min |
| 04-additional-content | 3 | ~3 min | ~1 min |

**Recent Trend:**
- Last 5 plans: 03-03 (8 min), 03-04 (5 min), 04-02 (1 min), 04-01 (~2 min)
- Trend: Additional content authoring extremely fast — same stub-replace pattern, pure content authoring

*Updated after each plan completion*
| Phase 04.1-site-polish P02 | 3 | 1 tasks | 1 files |

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
- [01-02]: Delimiter order $ before $: prevents greedy inline $ from consuming $
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
- [04-01]: No non-calculator badge on Additional pages — Additional = Calculator (Paper 2), consistent with Core pages
- [04-01]: Breadcrumb uses &rsaquo; entity (matches Core page pattern, not raw ›)
- [04-01]: Difference of two squares included as third Key Fact on Expanding/Factorising page — adds genuine pedagogical value and meets CE 13+ spec
- [04-01]: FOIL labelled explicitly (First/Outer/Inner/Last) — helps pupils who have been taught the mnemonic
- [04-01]: Factorising check step shown as full FOIL expansion — pupils can verify their own work using the same technique
- [04-02]: desmos-wrapper-pyth ID used — scoped, consistent with desmos-wrapper-slg and desmos-wrapper-trans pattern from Phase 3
- [04-02]: Default a=3, b=4 — 3-4-5 triple loads immediately so pupils see c=5 without needing to adjust sliders
- [04-02]: Purple (#7c3aed) for Desmos hypotenuse and triangle — matches Additional level brand colour
- [Phase 04.1-site-polish]: Non-calc badge accepted in both class and inline-style forms as satisfying FND-07 in Phase 2 verification

### Pending Todos

None yet.

### Blockers/Concerns

- **Desmos production API key** — demo key dcb31709b452b1cf9dc26972add0fda6 in use; production key needed before go-live (request from partnerships@desmos.com).
- **Offline use decision** — if site must work on school laptops with no internet, KaTeX must be self-hosted and Desmos cannot be embedded. Resolve before Phase 3.

### Resolved

- ~~**10 missing Core topics** — Maths teacher input required~~ — Claude will research and author all 10 missing Core topics directly from CE 13+ spec. No external content dependency.

## Session Continuity

Last session: 2026-02-27T08:57:56Z
Stopped at: Completed 04.1-02-PLAN.md — Phase 2 formal verification report written (02-VERIFICATION.md, status: passed, 7/7 FND requirements satisfied).
Resume file: None
