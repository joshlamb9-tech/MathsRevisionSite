# Requirements: Mowden Hall Maths Revision Site

**Defined:** 2026-02-26
**Core Value:** Year 8 pupils can find, understand, and practise any CE Maths topic in the right level — presented clearly enough to revise from independently.

## v1 Requirements

### Infrastructure

- [x] **INFRA-01**: Site is deployed and publicly accessible on GitHub Pages
- [x] **INFRA-02**: KaTeX equations render correctly on the live GitHub Pages URL (inline and display)
- [x] **INFRA-03**: Jekyll processing is disabled (`.nojekyll`) — prime notation and underscores render correctly
- [ ] **INFRA-04**: Topic URL structure is locked (kebab-case slugs, `/level/topic-slug/` pattern) before content authoring
- [x] **INFRA-05**: Mobile CSS is in place including KaTeX display equation overflow fix before content authoring

### Design and Navigation

- [x] **DESIGN-01**: Site uses Dosis font and Mowden Hall colour scheme throughout
- [x] **DESIGN-02**: Pupil can navigate between Foundation, Core, and Additional from any page
- [x] **DESIGN-03**: Pupil can see the full topic list for a level from the level index page
- [ ] **DESIGN-04**: Every topic page has a breadcrumb or back-link to its level index
- [x] **DESIGN-05**: Layout is usable on mobile (phone-width) without horizontal scrolling

### Foundation Content (6 topics)

- [x] **FND-01**: Pupil can access a worked example for fractions (Foundation)
- [x] **FND-02**: Pupil can access a worked example for division (Foundation)
- [x] **FND-03**: Pupil can access a worked example for prime factors (Foundation)
- [x] **FND-04**: Pupil can access a worked example for estimation (Foundation)
- [x] **FND-05**: Pupil can access a worked example for long multiplication (Foundation)
- [x] **FND-06**: Pupil can access a worked example for averages (Foundation)
- [x] **FND-07**: All Foundation topics are clearly labelled non-calculator (Paper 1)

### Core Content (15 topics)

- [x] **CORE-01**: Pupil can access a worked example for ratio (Core)
- [x] **CORE-02**: Pupil can access a worked example for percentages (Core)
- [x] **CORE-03**: Pupil can access a worked example for algebra basics (Core)
- [x] **CORE-04**: Pupil can access a worked example for shape (Core)
- [x] **CORE-05**: Pupil can access a worked example for averages at Core level (Core)
- [x] **CORE-06**: Pupil can access a worked example for angles including parallel lines (Core)
- [x] **CORE-07**: Pupil can access a worked example for probability (Core)
- [x] **CORE-08**: Pupil can access a worked example for coordinates and graphs (Core)
- [ ] **CORE-09**: Pupil can access a worked example for transformations (Core)
- [ ] **CORE-10**: Pupil can access a worked example for volume and surface area (Core)
- [ ] **CORE-11**: Pupil can access a worked example for sequences and nth term (Core)
- [ ] **CORE-12**: Pupil can access a worked example for straight line graphs / y=mx+c (Core)
- [ ] **CORE-13**: Pupil can access a worked example for speed, distance and time (Core)
- [ ] **CORE-14**: Pupil can access a worked example for powers and roots (Core)
- [ ] **CORE-15**: Pupil can access a worked example for charts and data interpretation (Core)

### Additional Content (3 topics)

- [ ] **ADD-01**: Pupil can access a worked example for index laws (Additional)
- [ ] **ADD-02**: Pupil can access a worked example for algebra — expanding and factorising (Additional)
- [ ] **ADD-03**: Pupil can access a worked example for Pythagoras (Additional)

### Interactive Graphs (Desmos)

- [x] **GRAPH-01**: Pupil can interact with a Desmos graph on coordinates/graphs topic page
- [ ] **GRAPH-02**: Pupil can interact with a Desmos graph on straight line graphs topic page
- [ ] **GRAPH-03**: Pupil can interact with a Desmos graph on transformations topic page
- [ ] **GRAPH-04**: Pupil can interact with a Desmos graph on Pythagoras topic page
- [x] **GRAPH-05**: Desmos embeds are scroll-friendly on mobile (do not trap page scroll)

### RAG Confidence Tracker

- [ ] **RAG-01**: Pupil can mark any topic as Red, Amber, or Green from the topic page
- [ ] **RAG-02**: Pupil's RAG ratings persist across browser sessions (localStorage)
- [ ] **RAG-03**: Level index pages show each topic's RAG status as a colour badge
- [ ] **RAG-04**: Tracker works gracefully in Safari private browsing (no crash, clear message)
- [ ] **RAG-05**: localStorage key is namespaced (`maths-revision:tracker`) to avoid collision with French revision site

### Formula Reference Sheets

- [ ] **FORM-01**: Pupil can view a Foundation formula reference page
- [ ] **FORM-02**: Pupil can view a Core formula reference page
- [ ] **FORM-03**: Pupil can view an Additional formula reference page
- [ ] **FORM-04**: Formula sheets are printable from desktop (print CSS or static PDF)

## v2 Requirements

### Content Expansion

- **CONT-V2-01**: Practice question PDFs per topic (significant content creation effort)
- **CONT-V2-02**: One-page printable topic summary sheets
- **CONT-V2-03**: Year 7 content extension (if lower school adopts site)

### UX Enhancements

- **UX-V2-01**: Dark mode (CSS media query — low priority, no revision value)
- **UX-V2-02**: RAG tracker state export as JSON download (data portability for pupils)
- **UX-V2-03**: "Back to top" button on long topic pages

## Out of Scope

| Feature | Reason |
|---------|--------|
| Video tutorials | Content production problem, not a development problem. Massive effort for zero tech benefit. |
| Automated quiz / marking | Requires JS question engine or backend. Static-site constraint. PDFs with self-marking answers are sufficient for v1. |
| User accounts / cross-device sync | Requires backend — out of scope by constraint. localStorage per-device is acceptable. |
| Teacher admin panel / CMS | Major scope expansion. Content managed in code by Josh. |
| Progress reports / class analytics | Requires collecting multi-pupil data — impossible without backend. |
| Offline-first / service worker | Over-engineering. KaTeX can be self-hosted if offline is genuinely needed, but defer this decision. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete (01-01) |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete (01-01) |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 1 | Complete |
| DESIGN-01 | Phase 1 | Complete (01-01) |
| DESIGN-02 | Phase 1 | Complete (01-01) |
| DESIGN-03 | Phase 1 | Complete (01-01) |
| DESIGN-04 | Phase 1 | Pending |
| DESIGN-05 | Phase 1 | Complete (01-01) |
| FND-01 | Phase 2 | Complete |
| FND-02 | Phase 2 | Complete |
| FND-03 | Phase 2 | Complete |
| FND-04 | Phase 2 | Complete (02-02) |
| FND-05 | Phase 2 | Complete (02-02) |
| FND-06 | Phase 2 | Complete (02-02) |
| FND-07 | Phase 2 | Complete |
| CORE-01 | Phase 3 | Complete |
| CORE-02 | Phase 3 | Complete |
| CORE-03 | Phase 3 | Complete |
| CORE-04 | Phase 3 | Complete |
| CORE-05 | Phase 3 | Complete |
| CORE-06 | Phase 3 | Complete |
| CORE-07 | Phase 3 | Complete |
| CORE-08 | Phase 3 | Complete |
| CORE-09 | Phase 3 | Pending |
| CORE-10 | Phase 3 | Pending |
| CORE-11 | Phase 3 | Pending |
| CORE-12 | Phase 3 | Pending |
| CORE-13 | Phase 3 | Pending |
| CORE-14 | Phase 3 | Pending |
| CORE-15 | Phase 3 | Pending |
| ADD-01 | Phase 4 | Pending |
| ADD-02 | Phase 4 | Pending |
| ADD-03 | Phase 4 | Pending |
| GRAPH-01 | Phase 3 | Complete |
| GRAPH-02 | Phase 3 | Pending |
| GRAPH-03 | Phase 3 | Pending |
| GRAPH-04 | Phase 4 | Pending |
| GRAPH-05 | Phase 3 | Complete |
| RAG-01 | Phase 5 | Pending |
| RAG-02 | Phase 5 | Pending |
| RAG-03 | Phase 5 | Pending |
| RAG-04 | Phase 5 | Pending |
| RAG-05 | Phase 5 | Pending |
| FORM-01 | Phase 5 | Pending |
| FORM-02 | Phase 5 | Pending |
| FORM-03 | Phase 5 | Pending |
| FORM-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0

---
*Requirements defined: 2026-02-26*
*Last updated: 2026-02-26 after 02-02 execution (FND-04, FND-05, FND-06 complete — Phase 2 fully complete)*
