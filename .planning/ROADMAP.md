# Roadmap: Mowden Hall CE Maths Revision Site

## Overview

Five phases from empty repo to a complete CE Maths revision site. Phase 1 locks the technical foundation — solving all known KaTeX and GitHub Pages pitfalls before any content is authored. Phases 2, 3, and 4 deliver content level by level (Foundation first because it uses existing slides, Core next as the largest effort, Additional last). Phase 5 completes the site with the RAG confidence tracker and formula reference sheets, both of which depend on stable topic URLs from the content phases.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Scaffold and Foundation** - GitHub Pages deployment, KaTeX rendering verified, shared nav, base CSS, URL structure locked
- [ ] **Phase 2: Foundation Content** - All 6 Foundation topics live with worked examples and non-calculator labelling
- [ ] **Phase 3: Core Content** - All 15 Core topics live with worked examples and Desmos embeds on graph topics
- [ ] **Phase 4: Additional Content** - All 3 Additional topics live with worked examples and Desmos on Pythagoras
- [ ] **Phase 5: RAG Tracker and Formula Sheets** - Confidence tracker on every topic page, formula reference sheets per level

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
**Plans**: TBD

Plans:
- [ ] 01-01: GitHub Pages repo setup, .nojekyll, base HTML/CSS with Dosis font and Mowden colours
- [ ] 01-02: KaTeX integration — defer scripts, delimiter order, mobile overflow fix, verified on live URL
- [ ] 01-03: Shared nav fragment, topic folder structure (kebab-case slugs), level index pages

### Phase 2: Foundation Content
**Goal**: Pupils can access a worked example for every Foundation CE topic, clearly labelled as non-calculator
**Depends on**: Phase 1
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07
**Success Criteria** (what must be TRUE):
  1. Pupil can navigate to the Foundation index and see all 6 topics listed
  2. Pupil can open each Foundation topic page and read a worked example with correctly rendered equations
  3. Every Foundation topic page displays a non-calculator label (Paper 1)
  4. Pupil can return to the Foundation index from any topic page via breadcrumb or back-link
**Plans**: TBD

Plans:
- [ ] 02-01: Convert Foundation slides to topic pages — fractions, division, prime factors
- [ ] 02-02: Convert Foundation slides to topic pages — estimation, long multiplication, averages; add non-calc labels throughout

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
**Plans**: TBD

Plans:
- [ ] 03-01: Convert existing Core slides — ratio, percentages, algebra basics, shape, averages
- [ ] 03-02: Author new Core content — angles (incl. parallel lines), probability, coordinates and graphs (with Desmos)
- [ ] 03-03: Author new Core content — transformations (with Desmos), volume and surface area, sequences and nth term
- [ ] 03-04: Author new Core content — straight line graphs y=mx+c (with Desmos), speed/distance/time, powers and roots, charts and data interpretation

### Phase 4: Additional Content
**Goal**: Pupils can access a worked example for all 3 Additional CE topics, with an interactive Desmos graph on the Pythagoras page
**Depends on**: Phase 3
**Requirements**: ADD-01, ADD-02, ADD-03, GRAPH-04
**Success Criteria** (what must be TRUE):
  1. Pupil can navigate to the Additional index and see all 3 topics listed
  2. Pupil can open each Additional topic page and read a worked example with correctly rendered equations
  3. Pupil can interact with a Desmos graph on the Pythagoras page
**Plans**: TBD

Plans:
- [ ] 04-01: Convert Additional slides — index laws, algebra (expanding/factorising), Pythagoras with Desmos embed

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
**Plans**: TBD

Plans:
- [ ] 05-01: tracker.js — RAG localStorage module with namespaced key and Safari try/catch; wire to all topic pages and level indexes
- [ ] 05-02: Formula reference pages — Foundation, Core, Additional — with print CSS

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold and Foundation | 0/3 | Not started | - |
| 2. Foundation Content | 0/2 | Not started | - |
| 3. Core Content | 0/4 | Not started | - |
| 4. Additional Content | 0/1 | Not started | - |
| 5. RAG Tracker and Formula Sheets | 0/2 | Not started | - |
