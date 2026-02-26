# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.
**Current focus:** Phase 3 in progress — Core Content (5 of 10 Core topics authored)

## Current Position

Phase: 3 of 5 (Core Content) — IN PROGRESS
Plan: 1 of 2 in phase (03-01 complete — Ratio, Percentages, Algebra Basics, Shape, Averages authored)
Status: Phase 3 Plan 01 complete — 5 Core topics authored; Plan 02 (remaining 5 Core topics) next
Last activity: 2026-02-26 — 03-01 all five Core topic pages authored, no non-calc badge regression

Progress: [██████████░░░░░░░░░░] 50%

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: 23 min
- Total execution time: 138 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-scaffold-and-foundation | 3 | 131 min | 44 min |
| 02-foundation-content | 2 | 4 min | 2 min |
| 03-core-content | 1 | 3 min | 3 min |

**Recent Trend:**
- Last 5 plans: 01-03 (99 min), 02-01 (2 min), 02-02 (2 min), 03-01 (3 min)
- Trend: Phase 3 Plan 01 very fast — pure content authoring against pre-built stubs, same pattern as Phase 2

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

### Pending Todos

None yet.

### Blockers/Concerns

- **Desmos production API key** — request from info@desmos.com early, before Phase 3. Demo key works for dev but production key needed before go-live.
- **Offline use decision** — if site must work on school laptops with no internet, KaTeX must be self-hosted and Desmos cannot be embedded. Resolve before Phase 3.

### Resolved

- ~~**10 missing Core topics** — Maths teacher input required~~ — Claude will research and author all 10 missing Core topics directly from CE 13+ spec. No external content dependency.

## Session Continuity

Last session: 2026-02-26T21:40:42Z
Stopped at: Completed 03-01-PLAN.md — Ratio, Percentages, Algebra Basics, Shape, Averages (Core) authored
Resume file: None
