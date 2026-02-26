# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.
**Current focus:** Phase 1 — Scaffold and Foundation

## Current Position

Phase: 1 of 5 (Scaffold and Foundation)
Plan: 2 of 3 in current phase (01-02 complete)
Status: In progress
Last activity: 2026-02-26 — 01-02 KaTeX integration verified on live GitHub Pages URL

Progress: [██░░░░░░░░] 13%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 16 min
- Total execution time: 32 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-scaffold-and-foundation | 2 | 32 min | 16 min |

**Recent Trend:**
- Last 5 plans: 01-01 (2 min), 01-02 (30 min)
- Trend: n/a (only 2 plans)

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

### Pending Todos

None yet.

### Blockers/Concerns

- **Desmos production API key** — request from info@desmos.com early, before Phase 3. Demo key works for dev but production key needed before go-live.
- **Offline use decision** — if site must work on school laptops with no internet, KaTeX must be self-hosted and Desmos cannot be embedded. Resolve in Phase 1.

### Resolved

- ~~**10 missing Core topics** — Maths teacher input required~~ — Claude will research and author all 10 missing Core topics directly from CE 13+ spec. No external content dependency.

## Session Continuity

Last session: 2026-02-26T18:51:40Z
Stopped at: Completed 01-02-PLAN.md — KaTeX integration verified on live GitHub Pages URL
Resume file: None
