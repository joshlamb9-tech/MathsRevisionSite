# Mowden Hall Maths Revision Site

## What This Is

A static revision website for Year 8 pupils at Mowden Hall preparing for CE 13+ Maths exams. Built on GitHub Pages, it mirrors the structure of the existing French revision site — Foundation, Core, and Additional levels matching the three CE exam papers. Content is drawn from existing Google Slides decks and supplemented for the 10 Core topics currently missing from those decks.

## Core Value

Year 8 pupils can find, understand, and practise any CE Maths topic in the right level (Foundation/Core/Additional) — presented clearly enough to revise from independently.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Site hosted on GitHub Pages with Mowden Hall branding (Dosis font, school colours)
- [ ] Three-level structure: Foundation, Core, Additional — matching CE exam papers
- [ ] All Foundation CE topics covered with worked examples
- [ ] All Core CE topics covered — including 10 currently missing from slides
- [ ] All Additional CE topics covered with worked examples
- [ ] Mathematical notation rendered correctly (KaTeX or MathJax)
- [ ] Interactive graph/algebra tool (Desmos embed) where appropriate
- [ ] Formula reference sheets per level (calc and non-calc versions)
- [ ] Calculator vs non-calculator labelling on relevant topics
- [ ] Topic confidence tracker (RAG — Red/Amber/Green self-assessment)
- [ ] Mobile-friendly layout (pupils revise on phones)
- [ ] Navigation between topics and levels is fast and intuitive

### Out of Scope

- Teacher-facing admin panel — content managed directly in code/markdown
- User accounts or saved progress to a backend — tracker lives in localStorage
- Video content — text and worked examples only for v1
- Automated marking / quiz scoring — may revisit in v2
- Integration with school MIS or grade systems — standalone site

## Context

**Existing content:**
- Google Slides deck — Foundation: fractions, division, prime factors, estimation, long multiplication, averages
- Google Slides deck — Core: ratio, percentages, algebra (basics), shape, averages
- Google Slides deck — Additional: index laws, algebra (expanding/factorising), Pythagoras

**10 missing Core topics identified from CE 13+ spec:**
angles (including parallel lines), probability, coordinates and graphs, transformations (rotation/reflection/translation), volume and surface area, sequences (nth term), straight line graphs (y=mx+c), speed/distance/time, powers and roots, charts and data interpretation

**CE exam structure:**
- Paper 1 → Foundation (non-calculator)
- Paper 2 → Core (calculator)
- Paper 3 → Additional (calculator)

**Comparable project:** French revision site — same GitHub Pages + Dosis font approach. Reference that for design and deployment pattern.

**Maths-specific requirements (vs French site):**
- Equation rendering: KaTeX preferred (lighter than MathJax, renders fast)
- Interactive diagrams: Desmos API embeds for graphs and geometry
- Formula sheets: downloadable/printable PDFs per level
- Non-calc flagging on relevant Foundation topics

## Constraints

- **Tech stack**: GitHub Pages (static only) — no server-side code, no databases
- **Font**: Dosis (Google Font) — must match Josh's existing Mowden materials
- **Content**: Starting from Google Slides exports — content needs converting to web format
- **Missing content**: 10 Core topics need content written (Maths teacher input required)
- **Deployment**: Public site — no auth, no personal pupil data stored server-side

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GitHub Pages (static) | Matches French site, zero hosting cost, easy to update | — Pending |
| KaTeX over MathJax | Faster render, smaller bundle, sufficient for CE-level maths | — Pending |
| localStorage for RAG tracker | No backend needed, works offline, GDPR-friendly | — Pending |
| Three-level structure mirroring CE papers | Direct mapping to what pupils are tested on | — Pending |

---
*Last updated: 2026-02-26 after initialization*
