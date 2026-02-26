# Feature Research

**Domain:** Static maths revision website (CE 13+ / secondary school level)
**Researched:** 2026-02-26
**Confidence:** MEDIUM-HIGH — competitor sites verified via direct inspection; student preference data from teacher surveys (2025); CE exam structure from ISEB; some claims based on educator consensus rather than controlled user research.

---

## Context

This site serves Year 8 pupils at Mowden Hall preparing for CE 13+ Maths. It is a static GitHub Pages site — no backend, no accounts, no dynamic features. The primary competitors pupils are likely using are Corbettmaths, Maths Genie, and generalist sites like Khan Academy. The CE 13+ structure is three papers: Foundation (non-calc), Core (calc), Additional (calc). Content must work for independent self-study, especially on mobile.

The survey evidence (Third Space Learning, 2025; Resourceaholic teacher review, 2024) points clearly: students most value **exam-style questions, worked examples, and structured topic coverage** — not videos, gamification, or accounts. This is convenient for a static site.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features pupils assume exist. Missing these = site feels incomplete and pupils go elsewhere (Corbettmaths, Maths Genie).

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Topic index by level (Foundation / Core / Additional) | Every revision site organises by topic/level — this is the primary navigation model pupils expect | LOW | Three sections mirroring CE papers; each links to topic pages |
| Worked examples per topic | Top resource type in teacher survey (2025). "Worked example" is what pupils open a revision site for | MEDIUM | Step-by-step solutions, not just answers. Requires careful markdown + KaTeX formatting |
| Mathematical notation rendering (KaTeX) | Without this, equations look broken. Pupils will not tolerate garbled fractions and indices | LOW | KaTeX is already decided; build-time rendering preferred (1.8s vs 4.2s load vs MathJax). Auto-render extension handles inline and block delimiters |
| Mobile-friendly layout | Pupils revise on phones. Non-mobile = site is unusable for a large portion of self-study sessions | MEDIUM | Responsive CSS required; navigation must be thumb-accessible; KaTeX renders fine on mobile |
| Fast navigation between topics | Pupils jump around — they search for specific topics, they don't read linearly | LOW | Simple HTML anchor links and a clear topic list per level is sufficient; no JS routing needed |
| Calculator / non-calculator labelling | CE Paper 1 (Foundation) is non-calculator. Pupils revising Paper 1 topics must know which skills to practise without a calculator | LOW | Badge/tag on each topic page. Possibly a site-wide filter. Critical for Foundation topics particularly |
| Clear topic naming matching CE spec | Pupils look up topics by name (e.g. "Pythagoras", "ratio"). If naming diverges from what teachers use, pupils can't find content | LOW | Use CE spec topic names directly — do not invent creative names |

### Differentiators (Competitive Advantage)

Features that set this site apart from Corbettmaths, Maths Genie, and generic resources. Not required to launch, but add genuine value.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| RAG confidence tracker (Red / Amber / Green per topic) | No major CE-specific site offers this. Helps pupils prioritise revision time — focus Red topics, not just what's easy. Completely static: localStorage, no accounts needed | MEDIUM | Per-topic RAG state saved in localStorage. Colour-coded on topic index. Reset button. Works offline. GDPR-friendly (no server data) |
| Formula reference sheets per level (printable) | Pupils and teachers consistently use printable formula sheets (Maths4Everyone sheets downloaded 3M+ times). A per-level formula PDF gives pupils a physical revision aid | MEDIUM | Static PDF files generated once. One per level (Foundation / Core / Additional). Consider calc vs non-calc variant for Foundation |
| Desmos embed for graph and geometry topics | No CE 13+ specific site offers interactive graph exploration. Desmos is the standard tool in classrooms — familiar to pupils. Directly useful for coordinates, straight line graphs, transformations | MEDIUM | Desmos API is free. Embed selectively (not every topic). Particularly valuable for: straight line graphs, coordinates, transformations. Keep optional — do not block page load |
| CE-specific content organisation | Generic GCSE sites map to AQA/Edexcel specs. This site maps directly to ISEB CE 13+ papers (Foundation/Core/Additional). Pupils don't have to cross-reference to find what they need | LOW | This is the structural decision — its value depends on execution quality, not extra features |
| Mowden Hall branding (Dosis font, school colours) | Pupils recognise it as "their" resource, not generic. Teachers recommend it confidently. Matches existing school materials | LOW | Font already decided. Implement in CSS |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem like obvious additions but conflict with the static-site constraint or would bloat scope without proportional pupil benefit.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Video tutorials | Corbettmaths uses them; pupils are used to them | Static GitHub Pages can embed videos (YouTube iframes), but creating CE-specific maths video content is a massive content production effort (not a development effort). v1 is text + examples only, which the PROJECT.md already specifies | Clear, multi-step worked examples with diagrams reduce the need for video. Embed a Desmos graph where visual exploration matters |
| Automated quiz / marking | Pupils ask for "test yourself" features | Requires JS-heavy question engine or a backend. On a static site, a simple quiz is feasible but automated marking with randomised questions is significant complexity. Also: wrong answers need specific feedback, which requires content creation at scale | Exam-style practice questions (PDF/printable) linked from each topic page. Self-marking via provided answers. This is what Maths Genie and Corbettmaths do for most topics |
| User accounts / saved progress cross-device | "Why doesn't my tracker carry over to my laptop?" | Requires a backend — out of scope by constraint. Also introduces GDPR obligations for pupil data | localStorage RAG tracker works per-device. Document this limitation clearly. For a school site, device consistency is lower priority |
| Teacher admin panel | "Can teachers update topics without touching code?" | Major scope expansion. Adds a CMS, authentication layer, and server infrastructure | Content managed directly in HTML/markdown. Teacher input happens offline (with Josh) and is committed to the repo |
| Progress reports / analytics | "Which topics are Red across the class?" | Would require collecting and aggregating data from multiple pupils — impossible without a backend | Not in scope for v1. If needed in future, consider Google Forms-based check-in, not site analytics |
| Dark mode | Standard modern web expectation | CSS custom properties make this low-complexity to implement, but it is pure polish with no revision value | Defer to v1.x. Add `prefers-color-scheme` media query if time allows; do not block launch |

---

## Feature Dependencies

```
[Level navigation (F/C/A)]
    └──requires──> [Topic index per level]
                       └──requires──> [Topic pages with worked examples]
                                          └──requires──> [KaTeX rendering]

[RAG tracker]
    └──requires──> [Topic index per level]  (needs consistent topic IDs to store in localStorage)

[Formula sheets (PDF)]
    └──independent──> can ship any time after topic content is written

[Desmos embeds]
    └──requires──> [Topic pages]  (embedded per-topic, not a global feature)

[Calculator/non-calc labelling]
    └──requires──> [Topic pages]  (label applied at topic-page level)

[Printable formula sheet]
    └──enhances──> [Formula reference content]  (PDF version of content already in site)
```

### Dependency Notes

- **KaTeX rendering must be in place before topic content is written**: Writing worked examples without a rendering pipeline means authors can't verify their notation looks correct. Set up KaTeX first.
- **Topic IDs must be stable before RAG tracker is built**: The RAG tracker stores topic IDs in localStorage. If topic IDs change after launch (because pages were renamed or restructured), pupils lose their saved state. Lock the URL/ID structure early.
- **Desmos embeds are per-topic enhancements**: They do not block any other feature. Add them during content authoring for graph-heavy topics, not as a separate phase.
- **Formula sheets are independent**: Content for formula sheets overlaps with topic content (same formulas). Write topic content first; formula sheets are a compilation of what already exists.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed for pupils to actually revise CE Maths from this site independently.

- [ ] KaTeX rendering working in the build pipeline — without this, nothing else renders correctly
- [ ] Level navigation: Foundation, Core, Additional pages, each with a topic index
- [ ] Topic pages for all Foundation topics (from existing slides) with worked examples
- [ ] Topic pages for all Core topics — including 10 missing topics (requires content writing)
- [ ] Topic pages for all Additional topics (from existing slides) with worked examples
- [ ] Calculator / non-calculator labelling on relevant topics
- [ ] Mobile-responsive layout with Dosis font and school colours
- [ ] Fast, clear navigation — breadcrumbs or back links; topic index always reachable

### Add After Validation (v1.x)

Features to add once core content is live and pupils are using it.

- [ ] RAG confidence tracker — add once topic IDs are stable (locked URL structure needed first)
- [ ] Formula reference sheets (PDF) — compile after topic content is complete; one per level
- [ ] Desmos embeds for graph topics — add during or after content authoring for coordinates, straight line graphs, transformations, Pythagoras

### Future Consideration (v2+)

Features to defer until v1 is in use and feedback suggests they're worth the effort.

- [ ] Printable topic summary sheets (one-pager per topic) — only if pupils request them
- [ ] Dark mode — CSS-only addition, low priority
- [ ] Practice question PDFs per topic — significant content creation effort; revisit after v1

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| KaTeX rendering | HIGH | LOW | P1 |
| Level navigation (F/C/A) | HIGH | LOW | P1 |
| Topic pages with worked examples | HIGH | MEDIUM (content) | P1 |
| Calculator/non-calc labelling | HIGH | LOW | P1 |
| Mobile-responsive layout | HIGH | MEDIUM | P1 |
| School branding (Dosis, colours) | MEDIUM | LOW | P1 |
| RAG confidence tracker | HIGH | MEDIUM | P2 |
| Formula sheets (PDF) | MEDIUM | MEDIUM (content) | P2 |
| Desmos graph embeds | MEDIUM | LOW (per topic) | P2 |
| Practice question PDFs | HIGH | HIGH (content) | P3 |
| Dark mode | LOW | LOW | P3 |
| Printable topic summaries | LOW | HIGH (content) | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Corbettmaths | Maths Genie | Khan Academy | This Site |
|---------|--------------|-------------|--------------|-----------|
| Video tutorials | Core feature (10-min per topic) | Per topic | Core feature | Not in v1 — text-first |
| Worked examples (text) | Yes | Yes (with PDF) | Yes (interactive) | Yes — primary content format |
| Practice questions | 5-a-day series, worksheets | Exam Q worksheets + PDFs | Interactive exercises | PDFs / printable (v2); worked examples in v1 |
| Exam paper access | Full past papers | Full past papers + predicted | N/A | N/A — not relevant for CE internal use |
| Topic organisation | By topic name (not by CE level) | By grade (1-9) | By course/unit | By CE level (Foundation/Core/Additional) — better fit for CE |
| Formula sheets | Embedded in content | Not prominent | N/A | Per-level PDF — differentiator |
| Self-assessment / tracker | Revision checklists (PDF) | Revision checklists (PDF) | Mastery %, badges | RAG per-topic in localStorage — differentiator |
| Calc/non-calc split | Paper-level (separate pages) | Paper-level | N/A | Per-topic label — more granular |
| Interactive graphs | Not prominent | Not present | Some | Desmos embeds (selected topics) |
| CE 13+ specific | No | No | No | Yes — primary differentiator |
| Mobile-friendly | Yes | Yes | Yes | Required |
| School branding | Generic | Generic | Generic | Mowden Hall specific |

**Key gap this site fills**: No major free revision site is structured around the ISEB CE 13+ three-level paper structure. Pupils using Corbettmaths or Maths Genie have to translate GCSE-era content back to CE topics. This site removes that translation overhead.

---

## Confidence Assessment

| Claim | Confidence | Source |
|-------|------------|--------|
| Worked examples are most valued feature | HIGH | Third Space Learning teacher survey 2025; Resourceaholic educator review 2024 |
| Maths Genie and Corbettmaths are primary competitors | HIGH | Teacher recommendations consistent across multiple sources |
| Students revise on mobile | MEDIUM | General web UX consensus; no CE-specific pupil data found |
| RAG tracker is a differentiator | MEDIUM | No CE site found with this feature; GCSE tools have printable RAG sheets but not interactive web trackers |
| KaTeX faster than MathJax for static sites | HIGH | 2025 benchmark: 1.8s KaTeX vs 4.2s MathJax (500 eq/page) |
| Formula sheets are popular | HIGH | Maths4Everyone 3M+ downloads; Resourceaholic top resource; Third Space survey top 5 |
| Videos are not essential for static text site | MEDIUM | Survey data shows exam Qs, worksheets, past papers rank above videos; but videos rank highly on GCSE sites generally |

---

## Sources

- [Corbettmaths revision resources](https://corbettmaths.com/2023/08/01/gcse-revision/) — content types and feature overview
- [Maths Genie GCSE page](https://www.mathsgenie.co.uk/gcse.php) — site structure and topic organisation (direct inspection)
- [Resourceaholic GCSE Maths Revision 2024](https://www.resourceaholic.com/2024/01/mathsgcserevision.html) — teacher recommendations on most-used resources
- [Third Space Learning GCSE Maths Survey 2025](https://thirdspacelearning.com/blog/gcse-maths-survey-2025/) — student/teacher preference data
- [ISEB CE 13+ Mathematics](https://www.iseb.co.uk/assessments/common-entrance/mathematics/) — exam structure and paper levels
- [Thomas Tolkien CE 13+ Revision](https://thomastolkien.co.uk/13-common-entrance-maths-revision/) — CE-specific competitor feature set
- [KaTeX official site](https://katex.org/) — rendering approach for static sites
- [KaTeX server-side rendering with Jekyll (2024)](https://maxkapur.com/2024/12/26/server-side-katex.html) — build-time KaTeX approach
- [Maths4Everyone revision sheets](https://www.maths4everyone.com/pages/maths-revision-sheets.php) — evidence for formula sheet demand
- [AQA RAG revision checker](https://www.aqa.org.uk/blog/track-learners-understanding-with-our-new-revision-checker) — RAG self-assessment precedent

---

*Feature research for: CE 13+ Maths revision site (static GitHub Pages)*
*Researched: 2026-02-26*
