# Project Research Summary

**Project:** Mowden Hall CE Maths Revision Site
**Domain:** Static educational revision website (GitHub Pages)
**Researched:** 2026-02-26
**Confidence:** HIGH (core stack verified against official docs)

## Executive Summary

This is a static GitHub Pages site serving Year 8 CE Maths revision — similar in architecture to the existing French revision site, with maths-specific additions (equation rendering, interactive graphs, formula sheets). The recommended approach is vanilla HTML/CSS/JS with no build step: KaTeX 0.16.33 for equation rendering and Desmos API v1.11 for interactive graphs. No framework, no npm, no Jekyll.

The biggest structural differentiator is the CE-specific three-level content organisation (Foundation/Core/Additional matching the three exam papers). No mainstream revision site does this — Corbettmaths and Maths Genie map to GCSE/AQA specs, forcing pupils to translate. A RAG localStorage confidence tracker adds further differentiation and is feasible at static-site scale.

The critical risk concentration is in Phase 1: four KaTeX pitfalls (script timing, delimiter order, Jekyll smart quotes, mobile overflow CSS) all need to be solved before any content is authored. Discovering these issues after 30+ topic pages exist is expensive. Locking the topic URL structure early is equally important — the RAG tracker writes topic slugs to localStorage, and changing slugs post-launch loses pupil progress.

## Key Findings

### Recommended Stack

Vanilla HTML/CSS/JS with CDN-loaded KaTeX and Desmos. No npm, no build tool, no framework. GitHub Pages serves the static files directly. Local development via `python3 -m http.server 8080`.

**Core technologies:**
- **Vanilla HTML/CSS/JS (ES2022+):** No build step, no dependency rot. Content-first site gains nothing from React/Vue.
- **KaTeX 0.16.33:** Synchronous render (no reflow), ~100ms vs MathJax's ~300ms on maths-heavy pages. All CE-level LaTeX covered.
- **Desmos API v1.11:** Purpose-built educational graphing. Demo key for dev; production key (free, email required) before go-live.
- **localStorage (browser native):** RAG tracker with namespaced key `maths-revision:tracker`. ~20 lines of vanilla JS.
- **Dosis variable font (wght 200–800):** Mandatory. Matches Josh's Mowden Hall materials.
- **`.nojekyll` file:** Prevents GitHub Pages' Jekyll processor from mangling content.

### Expected Features

**Must have (table stakes):**
- Topic index per level (Foundation / Core / Additional) — pupils expect this navigation model
- Worked examples with KaTeX-rendered notation per topic
- Calculator / non-calculator labelling — CE Paper 1 is non-calc; critical for Foundation topics
- Mobile-responsive layout — pupils revise on phones
- CE-specific topic naming matching the ISEB spec

**Should have (differentiators):**
- RAG confidence tracker (Red/Amber/Green per topic, localStorage) — no CE-specific site has this
- Formula reference sheets per level — massive demand (Maths4Everyone 3M+ downloads)
- Desmos graph embeds for relevant topics (coordinates, straight line graphs, transformations, Pythagoras)

**Defer (v2+):**
- Practice question PDFs (content creation effort, not a development problem)
- Dark mode (low priority, CSS-only when ready)
- Videos (not a static-site problem — a content production problem)

### Architecture Approach

One directory per CE level (`foundation/`, `core/`, `additional/`), one subdirectory per topic with `index.html` inside for clean URLs (`/foundation/fractions/`). Shared nav loaded via `fetch()` fragment to avoid duplicating nav across 30+ pages. KaTeX auto-render included in every page head. Desmos script included only on pages that embed a graph.

**Major components:**
1. **CSS + Dosis typography** — base layout, colour variables, mobile responsiveness, KaTeX mobile overflow fix
2. **Shared nav fragment** (`assets/partials/nav.html`) — loaded via `fetch()` by `nav.js`
3. **tracker.js** — RAG localStorage module, namespaced key, Safari try/catch wrapper
4. **Topic pages** — Foundation (6 existing), Core (5 existing + 10 new), Additional (3 existing)
5. **Formula sheets** — `/formula-sheets/foundation|core|additional.html` with print CSS

### Critical Pitfalls

1. **KaTeX scripts without `defer`** — equations render as raw text. Fix: `defer` on both scripts, `renderMathInElement` in `onload` callback. Must be solved in Phase 1 before content authoring.
2. **Delimiter order: `$` before `$$`** — display equations silently fail. Fix: always list `$$` before `$` in delimiter config.
3. **Jekyll smart quotes break prime notation** — `f'(x)` renders locally but breaks on GitHub Pages live URL. Fix: `.nojekyll` file at repo root.
4. **Long equations overflow mobile with no scroll** — 3-line CSS fix: `overflow-x: auto; overflow-y: hidden` on `.katex-display`. Add to base stylesheet in Phase 1.
5. **localStorage throws in Safari private browsing** — RAG tracker silently crashes. Fix: `try/catch` wrapper on all localStorage calls. Graceful degradation message.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Site Scaffold and KaTeX Foundation
**Rationale:** All four KaTeX pitfalls must be solved before any content is authored. Topic URL structure must be locked before the RAG tracker is built. This phase de-risks everything downstream.
**Delivers:** Working GitHub Pages deployment, KaTeX rendering verified on live URL, topic folder structure, shared nav, base CSS with mobile fixes, `.nojekyll`.
**Avoids:** KaTeX timing pitfall, delimiter order pitfall, Jekyll smart quotes pitfall, mobile overflow pitfall.

### Phase 2: Foundation Content (6 Topics)
**Rationale:** Foundation content already exists in Google Slides. Proves the content-to-web pipeline on known material before tackling the 10 missing Core topics.
**Delivers:** All 6 Foundation topic pages with worked examples, calc/non-calc labelling, Foundation level index.
**Uses:** KaTeX auto-render from Phase 1, topic template.

### Phase 3: Core Content (15 Topics — 5 existing + 10 new)
**Rationale:** Core is the largest content effort — 10 topics need new content written. This is the most work-intensive phase.
**Delivers:** All 15 Core topic pages. Requires Maths teacher input for the 10 missing topics (angles, probability, coordinates, transformations, volume/surface area, sequences, straight line graphs, speed/distance/time, powers/roots, charts/data).
**Note:** Desmos embeds for graph-heavy Core topics (coordinates, straight line graphs, transformations) can be added in this phase or Phase 5.

### Phase 4: Additional Content (3 Topics)
**Rationale:** Smaller scope — 3 topics from existing slides. Desmos embeds needed for Pythagoras and index laws.
**Delivers:** All 3 Additional topic pages, Additional level index.

### Phase 5: RAG Tracker and Formula Sheets
**Rationale:** Must wait until topic URLs are stable (Phases 2–4 complete). RAG tracker writes topic slugs to localStorage — changing slugs post-tracker loses pupil state.
**Delivers:** `tracker.js` with Safari try/catch, RAG buttons on all topic pages, coloured badges on level index pages. Formula reference sheets per level.
**Avoids:** localStorage Safari pitfall, key collision pitfall.

### Phase Ordering Rationale

- Phase 1 first: four pitfalls must be caught before any content is authored
- Foundation before Core: existing content proves the template before tackling new content
- RAG tracker last: depends on stable topic URL structure

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Core Content):** 10 new topics need content scoping — which need Desmos, which are text-only
- **Phase 5 (RAG Tracker):** Safari private mode handling and localStorage namespacing need explicit acceptance criteria

Phases with standard patterns (skip research-phase):
- **Phase 1 (Scaffold):** Well-documented GitHub Pages + KaTeX setup pattern
- **Phase 2 (Foundation Content):** Content conversion from existing slides — no technical unknowns
- **Phase 4 (Additional Content):** Same as Foundation

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | KaTeX 0.16.33 and Desmos v1.11 verified against official docs |
| Features | HIGH | Competitor analysis + teacher survey data; CE-specific gap confirmed |
| Architecture | HIGH | KaTeX and Desmos patterns from official docs; fetch fragment pattern from community |
| Pitfalls | MEDIUM | KaTeX pitfalls verified against official issues tracker; localStorage/Safari confirmed via community sources |

**Overall confidence:** HIGH

### Gaps to Address

- **Desmos production API key:** Request from `info@desmos.com` early — do not wait until launch. Free for educational non-commercial use but requires email confirmation.
- **Missing Core topic content:** 10 topics need content written. Maths teacher input required. Scope this before Phase 3 planning.
- **Offline use decision:** If site needs to work on school laptops with no internet (e.g. exam prep rooms), KaTeX must be self-hosted and Desmos cannot be embedded. Decision should be made in Phase 1.
- **localStorage origin:** If maths site shares `*.github.io` origin with French site, namespace key as `maths-revision:tracker` (already specified in architecture). If on custom domain, collision risk disappears.

## Sources

### Primary (HIGH confidence)
- KaTeX official docs (katex.org) — version 0.16.33, CDN setup, auto-render, delimiter config, mobile overflow
- Desmos API v1.11 official docs — embed pattern, API key process
- GitHub Pages official docs — limits, deployment, Jekyll behaviour

### Secondary (MEDIUM confidence)
- KaTeX GitHub issues tracker — mobile overflow fix (#327, #2942), delimiter order (#712)
- Third Space Learning teacher survey 2025 — worked examples are most-valued feature
- Maths4Everyone — formula sheet demand evidence (3M+ downloads)

### Tertiary (LOW confidence)
- Desmos educational API key terms — not publicly documented; confirm via `info@desmos.com`

---
*Research completed: 2026-02-26*
*Ready for roadmap: yes*
