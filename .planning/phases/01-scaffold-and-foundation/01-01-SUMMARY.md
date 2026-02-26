---
phase: 01-scaffold-and-foundation
plan: "01"
subsystem: infra
tags: [html, css, github-pages, dosis, design-tokens, mobile-responsive]

# Dependency graph
requires: []
provides:
  - Jekyll bypass via .nojekyll (fixes prime notation on GitHub Pages)
  - Base stylesheet with Mowden Hall design tokens (--mh-navy, --mh-gold), Dosis font, responsive layout
  - Homepage with inline nav and three level cards
  - Foundation, Core, Additional level index pages with all 24 topic slug links
affects:
  - 01-02 (KaTeX + GitHub Pages deployment — depends on .nojekyll and base stylesheet)
  - 01-03 (topic stubs — link to these level index pages as parents)
  - All content phases (inherit styles.css design tokens)

# Tech tracking
tech-stack:
  added:
    - "Dosis Google Font (wght 300;400;500;600;700;800, display=swap)"
    - "Vanilla HTML/CSS — no npm, no build step"
  patterns:
    - "Inline nav in every HTML file (NOT fetch fragments — Safari/CORS bug on GitHub Pages)"
    - "Root-relative asset paths (/assets/css/styles.css) — never relative ../assets"
    - "CSS custom properties in :root for all design tokens"
    - "Level badge + breadcrumb pattern for all non-homepage pages"

key-files:
  created:
    - .nojekyll
    - index.html
    - assets/css/styles.css
    - foundation/index.html
    - core/index.html
    - additional/index.html
  modified: []

key-decisions:
  - "Inline nav repeated in every HTML file — fetch() fragments cause CORS failures on GitHub Pages with Safari"
  - "Root-relative paths (/assets/css/styles.css) — relative paths break at directory depth ≥1"
  - "--mh-navy (#1a2744) and --mh-gold (#c9962c) are PLACEHOLDER values — Josh must confirm before go-live"
  - "No KaTeX on index/level pages — added in 01-02 only on pages that need it"

patterns-established:
  - "Design tokens: all colours via CSS custom properties, never hardcoded"
  - "Nav pattern: .site-header > .header-inner > .header-nav with .hn-link and .hn-link.active"
  - "Level theming: .foundation / .core / .additional modifier classes for badges and cards"
  - "Mobile breakpoint: max-width 600px, .hero h1 shrinks, .level-grid becomes 1-column"

requirements-completed: [INFRA-01, INFRA-03, DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-05]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 1 Plan 01: Scaffold and Foundation Summary

**Vanilla HTML/CSS site scaffold with Dosis font, Mowden Hall navy/gold design tokens, .nojekyll Jekyll bypass, and 3 level index pages covering all 24 topic slugs**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T17:05:33Z
- **Completed:** 2026-02-26T17:07:45Z
- **Tasks:** 2 of 2 auto tasks completed (checkpoint pending human verification)
- **Files created:** 6

## Accomplishments

- `.nojekyll` at repo root — prevents Jekyll from mangling prime notation (f'(x)) on GitHub Pages
- `assets/css/styles.css` with all design tokens, Dosis font stack, responsive layout at 600px breakpoint, and complete class library for headers, level cards, topic lists, breadcrumbs, badges
- `index.html` homepage with inline nav, hero section, and three level cards linking Foundation/Core/Additional
- Three level index pages with correct active nav state, breadcrumb, level badge, and all 24 topic stub links (6 + 15 + 3)

## Task Commits

Each task was committed atomically:

1. **Task 1: Repo scaffold — .nojekyll, homepage, base stylesheet** - `a394656` (feat)
2. **Task 2: Level index pages (Foundation, Core, Additional)** - `94cc32b` (feat)

## Files Created/Modified

- `.nojekyll` — empty file at repo root, disables Jekyll processing
- `assets/css/styles.css` — base stylesheet: CSS tokens, Dosis, Mowden colours, header/nav, level cards, topic list, breadcrumb, badge, footer, 600px responsive breakpoint
- `index.html` — homepage with inline nav and three level cards
- `foundation/index.html` — Foundation level index with 6 topic links
- `core/index.html` — Core level index with 15 topic links
- `additional/index.html` — Additional level index with 3 topic links

## Decisions Made

- **Inline nav (not fetch fragments):** Repeated nav HTML in every file. Fetch()-based nav injection fails silently on GitHub Pages when served over Safari due to CORS restrictions on file:// and GitHub Pages CDN responses.
- **Root-relative paths:** `/assets/css/styles.css` not `../assets/css/styles.css` — relative paths break for pages at depth ≥1 (e.g. `/foundation/index.html`).
- **Placeholder colours:** `--mh-navy: #1a2744` and `--mh-gold: #c9962c` are LOW confidence. Josh must confirm or correct these before the site goes live.
- **No KaTeX on scaffold pages:** KaTeX deferred to 01-02. Homepage and level index pages contain no mathematics, so loading KaTeX here would be pure overhead.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Colour confirmation needed before go-live.** The CSS variables `--mh-navy` (`#1a2744`) and `--mh-gold` (`#c9962c`) are placeholder values. Both are set in one place: `assets/css/styles.css` lines 16–17. To update, simply change those two hex values.

## Next Phase Readiness

- .nojekyll is present — 01-02 can proceed with GitHub Pages deployment immediately
- Base stylesheet is complete — 01-02 adds KaTeX CSS, topic pages can extend with `.katex` selectors
- All 24 topic slug links are locked — 01-03 can create stubs at these exact paths
- Local server for verification: `cd /Users/josh/projects/maths-revision && python3 -m http.server 8080`

---
*Phase: 01-scaffold-and-foundation*
*Completed: 2026-02-26*
