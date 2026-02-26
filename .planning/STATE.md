# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.
**Current focus:** Phase 1 — Scaffold and Foundation

## Current Position

Phase: 1 of 5 (Scaffold and Foundation)
Plan: 3 of 3 in current phase (01-03 complete — Phase 1 DONE)
Status: Phase 1 complete — ready for Phase 2
Last activity: 2026-02-26 — 01-03 all 24 topic stubs created and verified on live GitHub Pages URL

Progress: [████░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 44 min
- Total execution time: 131 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-scaffold-and-foundation | 3 | 131 min | 44 min |

**Recent Trend:**
- Last 5 plans: 01-01 (2 min), 01-02 (30 min), 01-03 (99 min)
- Trend: 01-03 longer due to GitHub Pages deployment waits and root-relative path bug fix

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

### Pending Todos

None yet.

### Blockers/Concerns

- **Desmos production API key** — request from info@desmos.com early, before Phase 3. Demo key works for dev but production key needed before go-live.
- **Offline use decision** — if site must work on school laptops with no internet, KaTeX must be self-hosted and Desmos cannot be embedded. Resolve in Phase 1.

### Resolved

- ~~**10 missing Core topics** — Maths teacher input required~~ — Claude will research and author all 10 missing Core topics directly from CE 13+ spec. No external content dependency.

## Session Continuity

Last session: 2026-02-26T20:34:56Z
Stopped at: Completed 01-03-PLAN.md — all 24 topic stubs created, URL structure locked, live GitHub Pages verified
Resume file: None
