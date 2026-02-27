# Roadmap: Mowden Hall CE Maths Revision Site

## Overview

Seven phases from empty repo to a complete CE Maths revision site. Phase 1 locks the technical foundation — solving all known KaTeX and GitHub Pages pitfalls before any content is authored. Phases 2, 3, and 4 deliver content level by level. Phases 4.1 and 4.2 are gap closure phases from the v1.0 milestone audit — polishing CSS, fixing documentation, and completing pre-launch prep. Phase 5 completes the site with the RAG confidence tracker and formula reference sheets.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Scaffold and Foundation** - GitHub Pages deployment, KaTeX rendering verified, shared nav, base CSS, URL structure locked
- [x] **Phase 2: Foundation Content** - All 6 Foundation topics live with worked examples and non-calculator labelling
- [x] **Phase 3: Core Content** - All 15 Core topics live with worked examples and Desmos embeds on graph topics
- [x] **Phase 4: Additional Content** - All 3 Additional topics live with worked examples and Desmos on Pythagoras (completed 2026-02-27)
- [x] **Phase 4.1: Site Polish** (INSERTED) - CSS cleanup, doc fixes, Phase 2 verification (completed 2026-02-27)
- [ ] **Phase 4.2: Go-Live Prep** (INSERTED) - Brand colour confirmation and Desmos production API key
- [x] **Phase 5: RAG Tracker and Formula Sheets** - Confidence tracker on every topic page, formula reference sheets per level (completed 2026-02-27)

## Phase Details

### Phase 1: Scaffold and Foundation
**Goal**: Pupils can reach a working site on the live GitHub Pages URL with equations rendering correctly and a locked folder structure ready for content
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, DESIGN-05
**Success Criteria** (what must be TRUE):
  1. Pupil can open the live GitHub Pages URL and see the site with Dosis font and Mowden Hall colours
  2. A test equation renders correctly on the live URL — not as raw LaTeX or broken text
  3. Pupil can navigate between Foundation, Core, and Additional level index pages from any page
  4. Level index pages exist and show the expected topic list with working breadcrumb links back
  5. Site displays without horizontal scrolling on a phone-width screen
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — GitHub Pages repo setup, .nojekyll, base HTML/CSS with Dosis font and Mowden colours, level index pages
- [x] 01-02-PLAN.md — KaTeX integration: defer scripts, delimiter order, mobile overflow fix, verified on live URL
- [x] 01-03-PLAN.md — 24 topic stub pages with locked URL structure (kebab-case slugs), inline nav, KaTeX head block template

### Phase 2: Foundation Content
**Goal**: Pupils can access a worked example for every Foundation CE topic, clearly labelled as non-calculator
**Depends on**: Phase 1
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07
**Success Criteria** (what must be TRUE):
  1. Pupil can navigate to the Foundation index and see all 6 topics listed
  2. Pupil can open each Foundation topic page and read a worked example with correctly rendered equations
  3. Every Foundation topic page displays a non-calculator label (Paper 1)
  4. Pupil can return to the Foundation index from any topic page via breadcrumb or back-link
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Foundation topic pages: fractions, division, prime factors (with KaTeX worked examples, non-calc badge)
- [x] 02-02-PLAN.md — Foundation topic pages: estimation, long multiplication, averages (non-calc badge on all 6)

### Phase 3: Core Content
**Goal**: Pupils can access a worked example for all 15 Core CE topics, including the 10 topics not covered in existing slides, with interactive Desmos graphs on the four graph-heavy topics
**Depends on**: Phase 2
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04, CORE-05, CORE-06, CORE-07, CORE-08, CORE-09, CORE-10, CORE-11, CORE-12, CORE-13, CORE-14, CORE-15, GRAPH-01, GRAPH-02, GRAPH-03, GRAPH-05
**Success Criteria** (what must be TRUE):
  1. Pupil can navigate to the Core index and see all 15 topics listed
  2. Pupil can open each of the 5 existing Core topics and read a worked example with rendered equations
  3. Pupil can open each of the 10 new Core topics and read a worked example with rendered equations
  4. Pupil can interact with a Desmos graph on the coordinates/graphs, straight line graphs, and transformations pages
  5. Desmos embeds on mobile do not trap the page scroll — pupil can scroll past the graph
**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md — ratio, percentages, algebra-basics, shape, averages (5 topics — wave 1)
- [x] 03-02-PLAN.md — angles, probability, coordinates-graphs with Desmos embed + Desmos CSS added to styles.css (wave 1)
- [x] 03-03-PLAN.md — transformations with Desmos, volume-surface-area, sequences-nth-term (wave 2, depends on 03-02)
- [x] 03-04-PLAN.md — straight-line-graphs with Desmos, speed-distance-time, powers-roots, charts-data (wave 2, depends on 03-02)

### Phase 4: Additional Content
**Goal**: Pupils can access a worked example for all 3 Additional CE topics, with an interactive Desmos graph on the Pythagoras page
**Depends on**: Phase 3
**Requirements**: ADD-01, ADD-02, ADD-03, GRAPH-04
**Success Criteria** (what must be TRUE):
  1. Pupil can navigate to the Additional index and see all 3 topics listed
  2. Pupil can open each Additional topic page and read a worked example with correctly rendered equations
  3. Pupil can interact with a Desmos graph on the Pythagoras page
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — Index Laws and Expanding/Factorising topic pages (ADD-01, ADD-02)
- [x] 04-02-PLAN.md — Pythagoras topic page with Desmos embed (ADD-03, GRAPH-04)

### Phase 4.1: Site Polish
**Goal**: All v1.0 audit tech debt items resolved — CSS is clean and maintainable, documentation is accurate, Phase 2 has a formal verification report
**Depends on**: Phase 4
**Requirements**: INFRA-04, DESIGN-04 (documentation fix)
**Gap Closure**: Closes audit tech debt items 1, 3, 4, 5, 7, 8
**Success Criteria** (what must be TRUE):
  1. `.non-calc-badge` CSS class exists in styles.css and all 6 Foundation pages use it (no inline style attributes for the badge)
  2. `.desmos-toggle-btn` on the Pythagoras page renders purple, not blue — a CSS scope override exists in styles.css for Additional-level pages
  3. INFRA-04 and DESIGN-04 checkboxes are `[x]` in REQUIREMENTS.md
  4. Phase 4 plan checkboxes are `[x]` in ROADMAP.md (already fixed above)
  5. Phase 4 SUMMARY files use `requirements-completed` field in frontmatter
  6. A `02-VERIFICATION.md` exists in the Phase 2 directory, status passed
**Plans**: 2 plans

Plans:
- [x] 04.1-01-PLAN.md — CSS polish and documentation fixes (non-calc-badge class, Desmos button colour, Phase 4 SUMMARY frontmatter)
- [x] 04.1-02-PLAN.md — Generate Phase 2 verification report

### Phase 4.2: Go-Live Prep
**Goal**: Site is ready for pupils — brand colours confirmed and Desmos API key is production-grade
**Depends on**: Phase 4.1
**Requirements**: DESIGN-01 (colour confirmation)
**Gap Closure**: Closes audit tech debt items 2, 6
**Success Criteria** (what must be TRUE):
  1. `--mh-navy` and `--mh-gold` in styles.css reflect confirmed Mowden Hall brand colours (PLACEHOLDER comment removed)
  2. All 4 Desmos pages use a production API key (demo key replaced, REPLACE comment removed)
**Plans**: TBD

Plans:
- [ ] 04.2-01: Confirm brand colours and replace Desmos demo key (checkpoint tasks — requires Josh input)

### Phase 5: RAG Tracker and Formula Sheets
**Goal**: Pupils can self-assess confidence on every topic using a Red/Amber/Green tracker that persists across sessions, and can access formula reference sheets for each level
**Depends on**: Phase 4
**Requirements**: RAG-01, RAG-02, RAG-03, RAG-04, RAG-05, FORM-01, FORM-02, FORM-03, FORM-04
**Success Criteria** (what must be TRUE):
  1. Pupil can mark any topic as Red, Amber, or Green directly from the topic page
  2. Pupil's RAG ratings are still present after closing and reopening the browser
  3. Level index pages display each topic's RAG status as a colour badge
  4. Pupil using Safari private browsing sees a clear message rather than a crash
  5. Pupil can open a formula reference page for Foundation, Core, and Additional — and print it cleanly from desktop
**Plans**: 2 plans

Plans:
- [ ] 05-01-PLAN.md — tracker.js localStorage module + RAG CSS; wire RAG selector to all 24 topic pages and badge injection to 3 level index pages
- [ ] 05-02-PLAN.md — Formula reference pages for Foundation, Core, Additional with KaTeX formulas and A4 print CSS

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 4.1 → 4.2 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold and Foundation | 3/3 | Complete    | 2026-02-26 |
| 2. Foundation Content | 2/2 | Complete    | 2026-02-26 |
| 3. Core Content | 4/4 | Complete    | 2026-02-27 |
| 4. Additional Content | 2/2 | Complete    | 2026-02-27 |
| 4.1. Site Polish | 1/2 | Complete    | 2026-02-27 |
| 4.2. Go-Live Prep | 0/1 | Not started | - |
| 5. RAG Tracker and Formula Sheets | 2/2 | Complete    | 2026-02-27 |
