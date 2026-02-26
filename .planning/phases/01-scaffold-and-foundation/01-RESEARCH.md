# Phase 1: Scaffold and Foundation - Research

**Researched:** 2026-02-26
**Domain:** Static GitHub Pages setup, KaTeX 0.16.33 equation rendering, Dosis typography, mobile-responsive CSS, topic URL structure
**Confidence:** HIGH

---

## Summary

Phase 1 establishes the entire technical foundation that all subsequent content phases depend on. The work divides cleanly into three tasks: (1) GitHub Pages repo setup with `.nojekyll`, base HTML/CSS scaffolding, Dosis font, and Mowden Hall colours; (2) KaTeX integration with all four known pitfalls resolved and verified on the live URL; and (3) topic folder structure locked before any content authoring begins.

The stack is deliberately minimal — vanilla HTML/CSS/JS, no build step, no npm. The existing French revision site (`y8-french-revision/` in the marvin workspace) provides a proven pattern to reference: Dosis font via Google Fonts CSS2 API, inline nav in each page (not a fetched fragment), CSS custom properties for design tokens, and sticky header. The maths site should follow the same structural conventions while introducing its own colour scheme and the KaTeX-specific setup.

The single most important decision for this phase is resolving all four KaTeX pitfalls — defer scripts, delimiter order, `.nojekyll`, and mobile overflow CSS — before any equations are authored. Fixing these after 30+ topic pages exist is expensive. A verification gate on the live GitHub Pages URL (not just localhost) must be built into the KaTeX task, because Jekyll's smart quote mangling only manifests on the deployed site.

**Primary recommendation:** Follow the French revision site's inline-nav pattern (nav HTML duplicated in each file), use KaTeX 0.16.33 with `katex-swap.min.css`, and lock the URL structure (`/foundation/topic-slug/`, `/core/topic-slug/`, `/additional/topic-slug/`) before any topic content is committed.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Site is deployed and publicly accessible on GitHub Pages | GitHub Pages deployment pattern: push to main branch, configure Pages source in repo settings, `index.html` at repo root serves as entry point |
| INFRA-02 | KaTeX equations render correctly on the live GitHub Pages URL | KaTeX 0.16.33 CDN setup with `defer` + `onload` pattern; verified on official katex.org docs; must test display and inline on live URL, not just localhost |
| INFRA-03 | Jekyll processing is disabled (`.nojekyll`) — prime notation and underscores render correctly | `.nojekyll` file at repo root prevents Jekyll's Kramdown smart-quote processing; verified from GitHub blog post; test `f'(x)` on deployed URL |
| INFRA-04 | Topic URL structure is locked (kebab-case slugs, `/level/topic-slug/` pattern) before content authoring | GitHub Pages serves `index.html` files in subdirectories at clean URLs — `/foundation/fractions/index.html` resolves to `/foundation/fractions/`; 24 topic folders must be created as empty stubs this phase |
| INFRA-05 | Mobile CSS is in place including KaTeX display equation overflow fix before content authoring | 3-line CSS rule on `.katex-display`: `overflow-x: auto; overflow-y: hidden; padding: 0.5em 0` — confirmed from KaTeX GitHub issues #327 and #2942 |
| DESIGN-01 | Site uses Dosis font and Mowden Hall colour scheme throughout | Dosis: `@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap')` — matches French site pattern; Mowden colours: dark navy/white primary palette (see Colour section below) |
| DESIGN-02 | Pupil can navigate between Foundation, Core, and Additional from any page | Inline nav in every HTML file (matching French site pattern) — three level links persistent in header |
| DESIGN-03 | Pupil can see the full topic list for a level from the level index page | Level index pages: `/foundation/index.html`, `/core/index.html`, `/additional/index.html` — list all topics for that level |
| DESIGN-04 | Every topic page has a breadcrumb or back-link to its level index | Breadcrumb pattern established from French site: `Home > Level > Topic` using CSS `.breadcrumb` class |
| DESIGN-05 | Layout is usable on mobile (phone-width) without horizontal scrolling | CSS: `overflow-x: hidden` on `body`, responsive max-width containers, KaTeX overflow fix, viewport meta tag |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla HTML/CSS/JS | ES2022+ | Site structure, styling, interactivity | No build step, no dependency rot, GitHub Pages serves static files directly — identical to French revision site pattern |
| KaTeX | 0.16.33 | Maths equation rendering | Synchronous render (no reflow), faster than MathJax, CE-level LaTeX fully covered; latest release 2026-02-23 |
| Dosis (Google Fonts) | Variable wght 200–800 | Typography | Mandatory — matches all of Josh's Mowden Hall materials including the French revision site |
| GitHub Pages | Current | Hosting | Zero cost, push-to-deploy, same origin as French site |

### Supporting

| Library / Pattern | Version | Purpose | When to Use |
|-------------------|---------|---------|-------------|
| `katex-swap.min.css` | 0.16.33 | KaTeX fonts with `font-display: swap` | Always — use instead of `katex.min.css` to prevent FOIT (Flash of Invisible Text) on slower connections; confirmed available at jsdelivr for v0.16.33 |
| KaTeX auto-render extension | 0.16.33 (bundled) | Auto-detect and render delimiters in HTML | Every page — runs on `onload` callback of the auto-render script |
| CSS custom properties | Browser native | Design tokens (colours, spacing) | Base stylesheet — follow French site pattern of `:root` variables |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline nav in each HTML file | `fetch()` HTML fragment | Fetch fragment has documented Safari/CORS issues on GitHub Pages (May 2025 community report); inline nav is simpler, more robust, and is already proven in the French revision site |
| Google Fonts CDN | Fontsource self-hosted | Self-hosting requires build step or manual file management; Google Fonts CDN is acceptable for a school internal site with `preconnect` hints |
| KaTeX 0.16.33 | MathJax 4.0 | MathJax renders asynchronously, larger bundle; CE-level maths has no accessibility or AsciiMath requirement that would justify MathJax |

**Installation:**

No npm install. All dependencies load from CDN. To serve locally:

```bash
python3 -m http.server 8080
```

---

## Architecture Patterns

### Recommended Project Structure

```
/                                      # repo root
├── .nojekyll                          # disables Jekyll processing
├── index.html                         # site home / level selector
├── assets/
│   ├── css/
│   │   └── styles.css                 # single base stylesheet
│   └── js/
│       └── (tracker.js in Phase 5)
├── foundation/
│   ├── index.html                     # Foundation level index
│   ├── fractions/index.html           # stub (populated Phase 2)
│   ├── division/index.html            # stub
│   ├── prime-factors/index.html       # stub
│   ├── estimation/index.html          # stub
│   ├── long-multiplication/index.html # stub
│   └── averages/index.html            # stub
├── core/
│   ├── index.html                     # Core level index
│   ├── ratio/index.html               # stub (populated Phase 3)
│   ├── percentages/index.html
│   ├── algebra-basics/index.html
│   ├── shape/index.html
│   ├── averages/index.html
│   ├── angles/index.html
│   ├── probability/index.html
│   ├── coordinates-graphs/index.html
│   ├── transformations/index.html
│   ├── volume-surface-area/index.html
│   ├── sequences-nth-term/index.html
│   ├── straight-line-graphs/index.html
│   ├── speed-distance-time/index.html
│   ├── powers-roots/index.html
│   └── charts-data/index.html
└── additional/
    ├── index.html                     # Additional level index
    ├── index-laws/index.html          # stub (populated Phase 4)
    ├── expanding-factorising/index.html
    └── pythagoras/index.html
```

**Note on clean URLs:** GitHub Pages serves `folder/index.html` at the URL `folder/` — so `/foundation/fractions/index.html` is accessible at `/foundation/fractions/`. This is the correct pattern for INFRA-04.

### Pattern 1: Base HTML Template

Every page should include this `<head>` block:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Topic Name] | Mowden Hall Maths Revision</title>

  <!-- Dosis font (Google Fonts CDN) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- KaTeX (equation rendering) — swap CSS prevents FOIT -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex-swap.min.css"
        crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.js"
          integrity="sha384-YPHNAPyrxGS8BNnA7Q4ommqra8WQPEjooVSLzFgwgs8OXJBvadbyvx4QpfiFurGr"
          crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/contrib/auto-render.min.js"
          integrity="sha384-JKXHIJf8PKPyDFptuKZoUyMRQJAmQKj4B4xyOca62ebJhciMYGiDdq/9twUUWyZH"
          crossorigin="anonymous"
          onload="renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\\\(', right: '\\\\)', display: false},
              {left: '\\\\[', right: '\\\\]', display: true}
            ]
          });"></script>

  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
```

**Source:** KaTeX official browser docs (https://katex.org/docs/browser) — confirmed 2026-02-26
**Integrity hashes:** `katex.min.js` and `auto-render.min.js` verified from official katex.org CDN snippet.

> Note: The integrity hash for `katex-swap.min.css` was not found in official docs or jsDelivr during research. Either omit SRI on the swap CSS (lower risk as it's a stylesheet, not executable) or use `katex.min.css` with its verified hash (`sha384-fgYS3VC1089n2J3rVcEbXDHlnDLQ9B2Y1hvpQ720q1NvxCduQqT4JoGc4u2QCnzE`). **Recommendation:** Use `katex-swap.min.css` without SRI for now; add the hash once retrieved from https://www.srihash.org.

### Pattern 2: KaTeX Delimiter Configuration

The delimiter order is critical. `$$` MUST be listed before `$`:

```javascript
// Source: https://katex.org/docs/autorender — confirmed from official docs
renderMathInElement(document.body, {
  delimiters: [
    { left: "$$", right: "$$", display: true },   // display block — MUST come first
    { left: "$", right: "$", display: false },      // inline
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true }
  ]
});
```

Official docs state: *"putting a `$` rule first would catch `$$` as an empty math expression."*

### Pattern 3: KaTeX Mobile Overflow Fix

```css
/* Source: KaTeX GitHub issues #327 and #2942 — confirmed community pattern */
.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5em 0;   /* prevents descender clipping */
}
```

Apply this in the base `styles.css`. It fixes INFRA-05 globally before content authoring.

### Pattern 4: CSS Design Tokens (Mowden Hall Colours)

The Mowden Hall website uses a dark navy / white primary palette (the school site's nav and backgrounds are dark with white text, referencing `Mowden-White.svg` assets). The French revision site uses neutral off-white `#f4f2ef` with near-black `#18181b`. The maths site should use Mowden's institutional colours more explicitly:

```css
/* Source: Mowden Hall website colour analysis + French revision site pattern */
:root {
  /* Mowden Hall brand palette */
  --mh-navy:        #1a2744;   /* dark navy — primary brand colour */
  --mh-gold:        #c9962c;   /* gold accent — school badge colour */
  --mh-navy-light:  #2a3a5c;   /* lighter navy for hover states */

  /* Page structure */
  --bg:             #f4f2ef;   /* warm off-white — matches French site */
  --white:          #ffffff;
  --text:           #18181b;   /* near-black */
  --text-mid:       #3f3f46;
  --text-muted:     #71717a;
  --border:         #e4e4e7;

  /* Level colours (three CE levels) */
  --foundation-bg:    #fef3c7;
  --foundation-accent: #d97706;
  --core-bg:          #dbeafe;
  --core-accent:      #2563eb;
  --additional-bg:    #ede9fe;
  --additional-accent: #7c3aed;
}
```

> **Caveat (MEDIUM confidence):** The exact Mowden Hall hex codes were not retrievable from their website (TLS error during research). Josh should confirm the correct navy and gold values against existing materials. The values above (`#1a2744` navy, `#c9962c` gold) are an educated approximation for an independent prep school; treat as a starting point, not as authoritative brand values.

### Pattern 5: Inline Nav (not fetched fragment)

The French revision site inlines nav HTML directly in every file. This is the correct approach for GitHub Pages — it avoids the Safari/CORS issue documented in May 2025 where GitHub Pages' `Access-Control-Allow-Origin: *` header caused Safari to reject same-origin fetch requests for HTML content.

```html
<!-- Inline in every page — no fetch() needed -->
<header>
  <div class="header-inner">
    <a href="/" class="header-brand">
      <div class="brand-icon">M</div>
      <div>
        <div class="brand-name">Maths Revision</div>
        <div class="brand-sub">Mowden Hall — Year 8 CE</div>
      </div>
    </a>
    <nav class="header-nav">
      <a href="/" class="hn-link">Home</a>
      <a href="/foundation/" class="hn-link">Foundation</a>
      <a href="/core/" class="hn-link">Core</a>
      <a href="/additional/" class="hn-link">Additional</a>
    </nav>
  </div>
</header>
```

Note: Use root-relative paths (`/foundation/`) not document-relative paths (`../foundation/`) — this ensures links work correctly from any depth in the folder structure.

### Anti-Patterns to Avoid

- **`fetch()` HTML fragment for shared nav:** Documented CORS/Safari issue on GitHub Pages (May 2025). Use inline nav instead — French site already does this.
- **`katex.min.css` without swap:** Causes FOIT on slower connections. Use `katex-swap.min.css`.
- **Scripts in `<head>` without `defer`:** Page renders blank while KaTeX JS parses. Always `defer`.
- **Relative CSS/JS paths (`../assets/css/`):** Breaks at different folder depths. Use root-relative paths (`/assets/css/`) or carefully calculate relative depth.
- **Bootstrap/Tailwind:** Unused bloat. Custom CSS with variables is 50 lines and already proven in the French site.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Equation rendering | Custom LaTeX parser | KaTeX 0.16.33 auto-render | Parser correctness is extremely hard; KaTeX handles CE-level LaTeX plus edge cases like nested fractions, vector notation, prime |
| FOIT on font load | Custom font swap logic | `font-display: swap` via `katex-swap.min.css` + Google Fonts `display=swap` | Browser-native font-display is the correct solution; custom swap is reinventing a wheel badly |
| Mobile equation scroll | Custom overflow JS | CSS `overflow-x: auto` on `.katex-display` | Pure CSS solution; JS approach adds flicker and complexity |

**Key insight:** This phase is infrastructure. The goal is to assemble proven primitives correctly, not to write custom code for solved problems.

---

## Common Pitfalls

### Pitfall 1: KaTeX Scripts Without `defer`
**What goes wrong:** `renderMathInElement()` called before DOM exists. All equations render as raw LaTeX strings.
**Why it happens:** Copying CDN snippets from tutorials that predate the `defer` pattern.
**How to avoid:** `defer` on both `katex.min.js` and `auto-render.min.js`. Use `onload` callback on the auto-render script tag.
**Warning signs:** Equations show as `$\frac{1}{2}$` text on page load; works on refresh but not cold load.
**Source:** KaTeX official browser docs (https://katex.org/docs/browser)

### Pitfall 2: Delimiter Order — `$` Before `$$`
**What goes wrong:** Display equations (`$$...$$`) silently fail or render as two empty inline expressions.
**Why it happens:** `$$` is parsed as two `$` if single-dollar delimiter is listed first.
**How to avoid:** Always list `{left: "$$", ...}` before `{left: "$", ...}` in the delimiters array.
**Warning signs:** `$$x^2 + y^2 = r^2$$` renders inline instead of as a centred display equation.
**Source:** KaTeX auto-render docs (https://katex.org/docs/autorender) — confirmed official statement

### Pitfall 3: Jekyll Smart Quotes Break Prime Notation
**What goes wrong:** `f'(x)` renders correctly locally but breaks with a KaTeX parse error on the live GitHub Pages URL.
**Why it happens:** GitHub Pages runs Jekyll by default, which converts `'` to curly apostrophe `'`. KaTeX cannot parse curly apostrophes.
**How to avoid:** Add an empty `.nojekyll` file at the repo root. Test a prime equation (`f'(x)`) on the deployed URL specifically.
**Warning signs:** KaTeX console error on live URL: `ParseError: Expected 'EOF', got '\u2019'`. Works perfectly on localhost.
**Source:** GitHub blog post on bypassing Jekyll (https://github.blog/news-insights/bypassing-jekyll-on-github-pages/) + official GitHub Pages docs

### Pitfall 4: Long Equations Overflow Mobile With No Scroll
**What goes wrong:** Multi-term equations extend beyond viewport width on phones. Pupils cannot see the right-hand side.
**Why it happens:** KaTeX `.katex-display` has no `overflow-x` rule by default.
**How to avoid:** Add CSS fix to base stylesheet before any content is authored:
```css
.katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.5em 0; }
```
**Warning signs:** Fine on desktop, equations clip on iPhone. No horizontal scrollbar, content just cut off.
**Source:** KaTeX GitHub issues #327 and #2942

### Pitfall 5: Relative Asset Paths Break at Different Folder Depths
**What goes wrong:** `../assets/css/styles.css` works from `/foundation/fractions/` but not from `/core/averages/`.
**Why it happens:** Pages exist at two levels deep (`/level/topic/`); relative paths must account for depth. The root `index.html` is at depth 0.
**How to avoid:** Use root-relative paths for all assets: `/assets/css/styles.css`, `/assets/js/...`. Alternatively, use a `<base>` tag. Root-relative paths are simpler.
**Warning signs:** CSS loads on homepage but not topic pages; nav links go to wrong URLs.

### Pitfall 6: Fetching Nav Fragment Breaks in Safari
**What goes wrong:** `fetch('/assets/partials/nav.html')` fails in Safari on GitHub Pages due to `Access-Control-Allow-Origin: *` triggering CORS rejection for credentialed same-origin requests.
**Why it happens:** GitHub Pages started returning `Access-Control-Allow-Origin: *` headers; Safari in some configurations rejects these for same-origin HTML content requests.
**How to avoid:** Do not use `fetch()` for HTML partials. Inline the nav HTML in every page. The French revision site already uses this pattern.
**Warning signs:** Nav renders on Chrome/Firefox but not Safari; console shows CORS errors despite same-origin request.
**Source:** GitHub Community Discussion #158588 (May 2025)

---

## Code Examples

Verified patterns from official sources and the French revision site:

### Complete KaTeX Head Block (verified from katex.org)

```html
<!-- Source: https://katex.org/docs/browser — v0.16.33, confirmed 2026-02-26 -->
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
```

### Google Fonts Dosis (matching French revision site)

```html
<!-- Source: French revision site styles-v2.css — proven pattern -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet">
```

### KaTeX Mobile Overflow CSS

```css
/* Source: KaTeX GitHub issues #327, #2942 — community-confirmed pattern */
.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5em 0;
}
```

### `.nojekyll` File

This file must be empty (zero bytes) and placed at the repository root. It disables Jekyll processing for the entire site.

```bash
touch .nojekyll
```

### Topic Slug Naming Convention

All topic folder names must be kebab-case, matching topic URLs. These slugs will be used as localStorage keys in the RAG tracker (Phase 5) — changing them after Phase 5 loses pupil data.

| Topic | Level | Slug | URL |
|-------|-------|------|-----|
| Fractions | Foundation | `fractions` | `/foundation/fractions/` |
| Division | Foundation | `division` | `/foundation/division/` |
| Prime Factors | Foundation | `prime-factors` | `/foundation/prime-factors/` |
| Estimation | Foundation | `estimation` | `/foundation/estimation/` |
| Long Multiplication | Foundation | `long-multiplication` | `/foundation/long-multiplication/` |
| Averages (Foundation) | Foundation | `averages` | `/foundation/averages/` |
| Ratio | Core | `ratio` | `/core/ratio/` |
| Percentages | Core | `percentages` | `/core/percentages/` |
| Algebra Basics | Core | `algebra-basics` | `/core/algebra-basics/` |
| Shape | Core | `shape` | `/core/shape/` |
| Averages (Core) | Core | `averages` | `/core/averages/` |
| Angles | Core | `angles` | `/core/angles/` |
| Probability | Core | `probability` | `/core/probability/` |
| Coordinates & Graphs | Core | `coordinates-graphs` | `/core/coordinates-graphs/` |
| Transformations | Core | `transformations` | `/core/transformations/` |
| Volume & Surface Area | Core | `volume-surface-area` | `/core/volume-surface-area/` |
| Sequences & nth Term | Core | `sequences-nth-term` | `/core/sequences-nth-term/` |
| Straight Line Graphs | Core | `straight-line-graphs` | `/core/straight-line-graphs/` |
| Speed, Distance & Time | Core | `speed-distance-time` | `/core/speed-distance-time/` |
| Powers & Roots | Core | `powers-roots` | `/core/powers-roots/` |
| Charts & Data | Core | `charts-data` | `/core/charts-data/` |
| Index Laws | Additional | `index-laws` | `/additional/index-laws/` |
| Expanding & Factorising | Additional | `expanding-factorising` | `/additional/expanding-factorising/` |
| Pythagoras | Additional | `pythagoras` | `/additional/pythagoras/` |

> These slugs are LOCKED after Phase 1. The RAG tracker (Phase 5) writes these slugs to localStorage under key `maths-revision:tracker`. Changing slugs post-Phase-5 loses pupil progress data.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `katex.min.css` | `katex-swap.min.css` | KaTeX v0.16.27 | Prevents FOIT; use swap variant as default |
| Scripts in `<head>` without `defer` | `defer` + `onload` callback | Standard modern HTML | Equations no longer render as raw text on cold load |
| Jekyll processing on GitHub Pages | `.nojekyll` to disable Jekyll | GitHub Pages feature | Prevents smart-quote mangling of prime notation |
| `fetch()` HTML partials for nav | Inline nav in each file | May 2025 Safari/CORS issue | Avoids Safari breakage; French site already uses inline approach |

**Deprecated/outdated:**
- MathJax 2.x: End-of-life since 2017. Do not use.
- `unpkg` CDN: Has had reliability issues. Use `jsdelivr` (the CDN referenced in official KaTeX docs).

---

## Open Questions

1. **Mowden Hall exact brand hex codes**
   - What we know: Website uses dark navy/white palette; `Mowden-White.svg` referenced; school has gold in badge/crest
   - What's unclear: Exact hex values for the navy and gold — TLS error prevented direct website inspection
   - Recommendation: Josh to confirm against existing materials (printed resources, Google Slides templates). Placeholder values `#1a2744` (navy) and `#c9962c` (gold) are reasonable starting estimates.

2. **SRI integrity hash for `katex-swap.min.css`**
   - What we know: File exists at jsDelivr for v0.16.33, contains `font-display: swap`
   - What's unclear: The SHA-384 hash was not found in official docs during research
   - Recommendation: Either (a) retrieve hash from https://www.srihash.org using the jsDelivr URL, or (b) omit SRI on the CSS file (stylesheets are lower security risk than scripts). Option (b) is acceptable for a school revision site.

3. **GitHub Pages deployment branch**
   - What we know: GitHub Pages supports deploying from main branch or a `gh-pages` branch; deploys from repo Settings > Pages
   - What's unclear: No existing repo URL known; need to confirm branch name
   - Recommendation: Deploy from `main` branch root — simplest, no GitHub Actions needed for a static no-build site.

4. **`averages` slug collision between Foundation and Core**
   - What we know: Both Foundation and Core have an "Averages" topic; Foundation averages is `mean/median/mode`; Core averages extends this
   - What's unclear: Whether having the same slug `averages` in two different level directories causes any issue
   - Recommendation: No issue — they live at `/foundation/averages/` and `/core/averages/`. The localStorage tracker key will use the full path pattern `foundation:averages` or similar to avoid collision within the same namespace.

---

## Sources

### Primary (HIGH confidence)
- KaTeX official browser docs — https://katex.org/docs/browser — CDN setup, integrity hashes, `defer` pattern for v0.16.33
- KaTeX official auto-render docs — https://katex.org/docs/autorender — delimiter order, `renderMathInElement` options, official statement on `$$` before `$`
- jsDelivr CDN — https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/ — confirmed `katex-swap.min.css` exists and contains `font-display: swap`
- GitHub blog on bypassing Jekyll — https://github.blog/news-insights/bypassing-jekyll-on-github-pages/ — `.nojekyll` purpose confirmed
- French revision site source — `/Users/josh/marvin/y8-french-revision/` — inline nav pattern, Dosis import URL, CSS custom property conventions (direct code inspection)
- Google Fonts CSS2 API — `@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@...')` confirmed from French site and web search

### Secondary (MEDIUM confidence)
- KaTeX GitHub issues #327, #2942, #3254 — `.katex-display` overflow CSS fix — community-confirmed, multiple sources agree
- GitHub Community Discussion #158588 — Safari CORS fetch issue on GitHub Pages — May 2025, described as partially resolved but incident confirms risk of `fetch()` for HTML partials
- Mowden Hall website colour analysis — website TLS error prevented direct inspection; analysis based on SVG asset name references and general independent prep school palette conventions

### Tertiary (LOW confidence)
- Mowden Hall specific hex codes (`#1a2744`, `#c9962c`) — estimated from school category norms; Josh must verify against actual materials

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — KaTeX 0.16.33 verified against official docs; Dosis pattern taken directly from French revision site code
- Architecture: HIGH — folder structure is standard GitHub Pages static site pattern; inline nav approach proven in French site
- Pitfalls: HIGH (KaTeX pitfalls 1–4) / MEDIUM (fetch/CORS Safari issue — documented but partially resolved per latest update)
- Colour values: LOW — Mowden Hall brand hex codes are estimated; must be confirmed

**Research date:** 2026-02-26
**Valid until:** 2026-04-30 (KaTeX stable; GitHub Pages behaviour stable; Dosis available)
