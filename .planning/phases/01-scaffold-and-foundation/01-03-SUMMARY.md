---
phase: 01-scaffold-and-foundation
plan: 03
subsystem: infra
tags: [github-pages, url-structure, topic-stubs, katex, breadcrumb, navigation]

# Dependency graph
requires:
  - phase: 01-scaffold-and-foundation/01-01
    provides: "base stylesheet, level index pages, GitHub Pages deployment"
  - phase: 01-scaffold-and-foundation/01-02
    provides: "KaTeX head block template with correct SRI hashes and delimiter order"
provides:
  - "24 topic stub pages with locked URL slugs — RAG tracker (Phase 5) can safely use these as localStorage keys"
  - "Complete page chrome template (nav, breadcrumb, KaTeX, level badge) ready for content authoring"
  - "All paths fixed to use /MathsRevisionSite/ prefix — CSS and navigation functional on live GitHub Pages"
  - "Live verification: all 24 topic URLs return HTTP 200 on https://joshlamb9-tech.github.io/MathsRevisionSite/"
affects:
  - "Phase 2/3/4 topic content pages (copy any stub and fill in the content section)"
  - "Phase 5 RAG tracker (localStorage keys derived from these locked slugs)"
  - "All existing HTML files (katex-test, level indexes, home) — paths fixed as part of this plan"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Topic stub template: KaTeX head block + inline nav (active class per level) + breadcrumb + level badge"
    - "GitHub Pages project site path fix: all href=\"/...\" updated to href=\"/MathsRevisionSite/...\" across all HTML files"
    - "Slug naming convention: kebab-case locked permanently (prime-factors, coordinates-graphs, sequences-nth-term, volume-surface-area, straight-line-graphs, speed-distance-time, charts-data, index-laws, expanding-factorising)"

key-files:
  created:
    - "foundation/fractions/index.html"
    - "foundation/division/index.html"
    - "foundation/prime-factors/index.html"
    - "foundation/estimation/index.html"
    - "foundation/long-multiplication/index.html"
    - "foundation/averages/index.html"
    - "core/ratio/index.html"
    - "core/percentages/index.html"
    - "core/algebra-basics/index.html"
    - "core/shape/index.html"
    - "core/averages/index.html"
    - "core/angles/index.html"
    - "core/probability/index.html"
    - "core/coordinates-graphs/index.html"
    - "core/transformations/index.html"
    - "core/volume-surface-area/index.html"
    - "core/sequences-nth-term/index.html"
    - "core/straight-line-graphs/index.html"
    - "core/speed-distance-time/index.html"
    - "core/powers-roots/index.html"
    - "core/charts-data/index.html"
    - "additional/index-laws/index.html"
    - "additional/expanding-factorising/index.html"
    - "additional/pythagoras/index.html"
  modified:
    - "index.html — root-relative paths fixed with /MathsRevisionSite/ prefix"
    - "foundation/index.html — topic links and nav paths fixed"
    - "core/index.html — topic links and nav paths fixed"
    - "additional/index.html — topic links and nav paths fixed"
    - "katex-test/index.html — nav and CSS paths fixed"

key-decisions:
  - "Slug names are permanently locked — RAG tracker (Phase 5) uses these as localStorage keys; changing slugs loses pupil progress data"
  - "GitHub Pages project site path fix: all root-relative href=\"/\" paths updated to href=\"/MathsRevisionSite/\" across all 29 HTML files — CSS was silently failing on live site since 01-01"
  - "Inline nav pattern confirmed: every stub has nav inlined (not fetch fragment) per Safari CORS bug documented in 01-RESEARCH.md"

requirements-completed: [INFRA-04, DESIGN-04]

# Metrics
duration: ~99min (including GitHub Pages deployment waits and live verification)
completed: 2026-02-26
---

# Phase 1 Plan 03: Topic Stub Pages Summary

**24 topic stub pages created with locked URL slugs — all returning HTTP 200 on live GitHub Pages. Root-relative path bug affecting CSS and navigation on project site fixed across all 29 HTML files.**

## Performance

- **Duration:** ~99 min (including GitHub Pages deployment waits, CSS bug discovery, and path fix)
- **Started:** 2026-02-26T18:56:01Z
- **Completed:** 2026-02-26T20:34:56Z
- **Tasks:** 2 (auto)
- **Files created:** 24
- **Files modified:** 5 (pre-existing HTML files path-fixed)

## Accomplishments

- All 24 topic stub pages created with locked slugs across Foundation (6), Core (15), and Additional (3) levels
- Every stub has the complete page chrome: KaTeX 0.16.33 head block with defer + SRI, inline nav with correct active level, breadcrumb with back-link to level index, level badge, root-relative CSS path
- Discovered and fixed root-relative path bug (CSS loading from wrong URL on GitHub Pages project site) — affected all 29 HTML files including pre-existing ones from 01-01 and 01-02
- All paths now use `/MathsRevisionSite/` prefix, confirmed working on live URL
- URL structure locked — RAG tracker can safely use these slugs as localStorage keys

## Locked Slug List

**Foundation (6):**
- `fractions` → `/MathsRevisionSite/foundation/fractions/`
- `division` → `/MathsRevisionSite/foundation/division/`
- `prime-factors` → `/MathsRevisionSite/foundation/prime-factors/`
- `estimation` → `/MathsRevisionSite/foundation/estimation/`
- `long-multiplication` → `/MathsRevisionSite/foundation/long-multiplication/`
- `averages` → `/MathsRevisionSite/foundation/averages/`

**Core (15):**
- `ratio` → `/MathsRevisionSite/core/ratio/`
- `percentages` → `/MathsRevisionSite/core/percentages/`
- `algebra-basics` → `/MathsRevisionSite/core/algebra-basics/`
- `shape` → `/MathsRevisionSite/core/shape/`
- `averages` → `/MathsRevisionSite/core/averages/`
- `angles` → `/MathsRevisionSite/core/angles/`
- `probability` → `/MathsRevisionSite/core/probability/`
- `coordinates-graphs` → `/MathsRevisionSite/core/coordinates-graphs/`
- `transformations` → `/MathsRevisionSite/core/transformations/`
- `volume-surface-area` → `/MathsRevisionSite/core/volume-surface-area/`
- `sequences-nth-term` → `/MathsRevisionSite/core/sequences-nth-term/`
- `straight-line-graphs` → `/MathsRevisionSite/core/straight-line-graphs/`
- `speed-distance-time` → `/MathsRevisionSite/core/speed-distance-time/`
- `powers-roots` → `/MathsRevisionSite/core/powers-roots/`
- `charts-data` → `/MathsRevisionSite/core/charts-data/`

**Additional (3):**
- `index-laws` → `/MathsRevisionSite/additional/index-laws/`
- `expanding-factorising` → `/MathsRevisionSite/additional/expanding-factorising/`
- `pythagoras` → `/MathsRevisionSite/additional/pythagoras/`

## Task Commits

1. **Task 1: Create all 24 topic stubs** — `55fe044` (feat)
2. **Rule 1 Auto-fix: GitHub Pages root-relative path bug** — `2315271` (fix)

## Live GitHub Pages URL

**Base URL:** `https://joshlamb9-tech.github.io/MathsRevisionSite/`

Sample verified live URLs (all HTTP 200):
- `https://joshlamb9-tech.github.io/MathsRevisionSite/foundation/fractions/`
- `https://joshlamb9-tech.github.io/MathsRevisionSite/core/coordinates-graphs/`
- `https://joshlamb9-tech.github.io/MathsRevisionSite/additional/pythagoras/`
- `https://joshlamb9-tech.github.io/MathsRevisionSite/assets/css/styles.css`

## Topic Stub Template (for Phases 2–4)

Copy this template for any topic page. Replace `[LEVEL]`, `[LEVEL_NAME]`, `[TOPIC_NAME]`, and the active class:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TOPIC_NAME] | [LEVEL_NAME] | Mowden Hall Maths Revision</title>

  <!-- Dosis font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- KaTeX 0.16.33 — ready for content authoring -->
  <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex-swap.min.css"
        crossorigin="anonymous">
  <script defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.js"
          integrity="sha384-YPHNAPyrxGS8BNnA7Q4ommqra8WQPEjooVSLzFgwgs8OXJBvadbyvx4QpfiFurGr"
          crossorigin="anonymous"></script>
  <script defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/contrib/auto-render.min.js"
          integrity="sha384-JKXHIJf8PKPyDFptuKZoUyMRQJAmQKj4B4xyOca62ebJhciMYGiDdq/9twUUWyZH"
          crossorigin="anonymous"
          onload="renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true}
            ]
          });"></script>

  <link rel="stylesheet" href="/MathsRevisionSite/assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="header-inner">
      <a href="/MathsRevisionSite/" style="display:flex;align-items:center;gap:0.75rem;text-decoration:none">
        <div class="brand-name">Maths Revision</div>
      </a>
      <nav class="header-nav">
        <a href="/MathsRevisionSite/" class="hn-link">Home</a>
        <a href="/MathsRevisionSite/foundation/" class="hn-link[ACTIVE_FOUNDATION]">Foundation</a>
        <a href="/MathsRevisionSite/core/" class="hn-link[ACTIVE_CORE]">Core</a>
        <a href="/MathsRevisionSite/additional/" class="hn-link[ACTIVE_ADDITIONAL]">Additional</a>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <p class="breadcrumb">
      <a href="/MathsRevisionSite/">Home</a> ›
      <a href="/MathsRevisionSite/[LEVEL]/">[LEVEL_NAME]</a> ›
      [TOPIC_NAME]
    </p>

    <span class="level-badge [LEVEL]">[LEVEL_NAME]</span>
    <h1 class="page-title">[TOPIC_NAME]</h1>

    <!-- CONTENT GOES HERE — replace the placeholder below -->
    <p style="color:var(--text-muted);margin-top:1rem">
      Content for this topic will be added in a later phase.
    </p>
  </main>

  <footer>
    <p>Mowden Hall School · Year 8 CE Maths Revision</p>
  </footer>

</body>
</html>
```

**Active nav class:** Add ` active` (with leading space) after `hn-link` for the current level's nav link, e.g. `class="hn-link active"`.

## URL Structure is Locked

**IMPORTANT: The 24 slugs above must never be changed.** The RAG tracker (Phase 5) stores pupil progress in localStorage using these slugs as keys. Renaming a slug means any pupil who visited that page loses their RAG status for that topic.

STATE.md has been updated with this note.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Root-relative paths broken on GitHub Pages project site**

- **Found during:** Task 2 (live URL verification)
- **Issue:** All HTML files used root-relative paths like `href="/assets/css/styles.css"` and `href="/foundation/"`. On a GitHub Pages project site at `joshlamb9-tech.github.io/MathsRevisionSite/`, root-relative paths resolve to `joshlamb9-tech.github.io/` (domain root), which is a 404. CSS was silently not loading on the live site since 01-01. The 01-02 human verification confirmed KaTeX worked (CDN-loaded) but may have not caught the missing project CSS.
- **Fix:** Python script replaced all `href="/..."` paths with `href="/MathsRevisionSite/..."` across all 29 HTML files (24 new stubs + 5 pre-existing: home, 3 level indexes, katex-test).
- **Files modified:** All 29 HTML files in the project
- **Commit:** `2315271`
- **Verified:** `curl` confirms `/MathsRevisionSite/assets/css/styles.css` returns HTTP 200 on live URL

### Future-proofing Note

If a custom domain is ever added (e.g. `maths.mowdenhall.org.uk`), all `/MathsRevisionSite/` prefixes will need to be replaced with `/`. This is a one-time find-and-replace across 29 files. Consider using a CSS custom property or JS variable for the base path if the site is likely to move.

## Self-Check: PASSED

- FOUND: foundation/fractions/index.html
- FOUND: core/coordinates-graphs/index.html
- FOUND: additional/pythagoras/index.html
- FOUND: 24 total topic stubs (verified with find)
- FOUND commit: 55fe044 (Task 1 — 24 topic stubs)
- FOUND commit: 2315271 (Rule 1 fix — path prefix)
- FOUND: .planning/phases/01-scaffold-and-foundation/01-03-SUMMARY.md
- VERIFIED: HTTP 200 on 10 sample topic pages on live GitHub Pages URL
- VERIFIED: /MathsRevisionSite/assets/css/styles.css returns HTTP 200

---
*Phase: 01-scaffold-and-foundation*
*Completed: 2026-02-26*
