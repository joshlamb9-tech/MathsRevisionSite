# Stack Research

**Domain:** Static maths education revision site (CE 13+ exam prep)
**Researched:** 2026-02-26
**Confidence:** HIGH (core choices verified against official docs and GitHub releases)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vanilla HTML/CSS/JS | ES2022+ | Site structure, styling, interactivity | No build step, no dependency rot, zero DevEx overhead. GitHub Pages serves static files directly. Adding a framework (React, Vue) creates npm churn with zero benefit for a content site. |
| KaTeX | 0.16.33 | Maths equation rendering | Synchronous render (no reflow), ~100ms vs MathJax's ~300ms on a page with 20+ equations. CE-level maths uses standard LaTeX notation — KaTeX covers all of it. Released 2026-02-23, actively maintained. |
| Desmos API | v1.11 | Interactive graph embeds | Purpose-built for educational graphing. GraphingCalculator, ScientificCalculator, and FourFunctionCalculator available. Free demo key works for non-commercial educational use; production key free via desmos.com/my-api. |
| GitHub Pages | Current | Hosting | Zero cost, matches existing French revision site pattern, direct push-to-deploy from repo. 1 GB repo limit, 100 GB/month bandwidth, 10 builds/hour — all fine for a school revision site. |
| Dosis (Google Fonts / self-hosted) | Variable (wght 200–800) | Typography | Mandatory — matches Josh's Mowden Hall materials. Variable font means one file covers all weights. |

### Supporting Libraries / Patterns

| Library / Pattern | Version | Purpose | When to Use |
|-------------------|---------|---------|-------------|
| KaTeX auto-render extension | 0.16.33 (bundled) | Auto-detect and render `$$...$$` and `\(...\)` in HTML | Every page that contains maths notation. Include alongside core KaTeX — runs on DOMContentLoaded. |
| localStorage (browser native) | Web Storage API | RAG confidence tracker persistence | Topic confidence state (Red/Amber/Green). No library needed — `localStorage.setItem()` / `getItem()` with a JSON schema keyed by topic slug. Works offline, zero GDPR risk (no server, no personal data leaves device). |
| `katex-swap.min.css` | 0.16.33 | `font-display: swap` for KaTeX fonts | Use instead of `katex.min.css` to prevent FOIT (Flash of Invisible Text) on slower connections. Introduced in KaTeX v0.16.27. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Python `http.server` or `npx serve` | Local dev server | `python3 -m http.server 8080` — zero install for local preview. No build step means no Vite/webpack needed. |
| `.nojekyll` file in repo root | Disable GitHub Pages' Jekyll processing | Required if you're not using Jekyll. Without it, GitHub tries to process the site as Jekyll and can mangle files starting with `_`. Add an empty `.nojekyll` file to the repo root. |
| Prettier | Code formatting | Optional but keeps HTML/CSS/JS consistent if multiple contributors. `npx prettier --write .` |

---

## Installation

This is a no-npm-install stack. All dependencies load from CDN at runtime.

```html
<!-- In every page <head> -->

<!-- Dosis font (Google Fonts CDN with preconnect for performance) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;600;700&display=swap" rel="stylesheet">

<!-- KaTeX (equation rendering) — swap CSS prevents flash of invisible text -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex-swap.min.css"
      integrity="sha384-..." crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.js"
        integrity="sha384-..." crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/contrib/auto-render.min.js"
        integrity="sha384-..." crossorigin="anonymous"
        onload="renderMathInElement(document.body)"></script>

<!-- Desmos API (include only on pages with graph embeds) -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=YOUR_API_KEY"></script>
```

```js
// localStorage RAG tracker — no library, ~20 lines
const TRACKER_KEY = 'maths-rag-v1';

function getTracker() {
  return JSON.parse(localStorage.getItem(TRACKER_KEY) || '{}');
}

function setTopicRating(topicSlug, rating) {
  // rating: 'red' | 'amber' | 'green'
  const tracker = getTracker();
  tracker[topicSlug] = rating;
  localStorage.setItem(TRACKER_KEY, JSON.stringify(tracker));
}

function getTopicRating(topicSlug) {
  return getTracker()[topicSlug] || null;
}
```

> Get integrity hashes from the official KaTeX CDN snippet at katex.org/docs/browser — always copy from the official docs rather than computing manually.

> Get your Desmos API key at desmos.com/my-api. The demo key (`dcb31709b452b1cf9dc26972add0fda6`) works for development and non-commercial educational use, but register a production key before going live.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| KaTeX 0.16.33 | MathJax 4.0 | Only if you need: (a) MathML output for specialist accessibility tools, (b) AsciiMath input, or (c) very complex LaTeX macros not in KaTeX's subset. CE-level maths doesn't require any of these. MathJax 4 has closed the performance gap but still renders asynchronously and ships a larger bundle. |
| Vanilla HTML/JS | Eleventy (11ty) | If the site grows beyond ~50 pages and copy-pasting the `<head>` block becomes painful. Eleventy is the lightest SSG option — zero client JS, good GitHub Pages support via `.nojekyll` + Actions. Not needed at v1 scale. |
| Vanilla HTML/JS | Jekyll | Jekyll has native GitHub Pages support (no custom Actions needed) but requires Ruby. Slower build, older ecosystem. Only worth it if the team already knows Jekyll. |
| Google Fonts CDN | Fontsource self-hosted | Self-hosting (via `@fontsource-variable/dosis` npm package) eliminates third-party DNS round-trips and resolves any GDPR concerns about IP transmission to Google. Downside: requires a build step or manual font file copying. For a school internal site, Google Fonts CDN is acceptable — add `preconnect` hints to mitigate latency. |
| localStorage | IndexedDB | IndexedDB for tracker state is over-engineering. localStorage handles a flat key→rating map trivially. Only upgrade if tracker needs complex querying. |
| jsDelivr CDN | cdnjs / unpkg | jsDelivr is the CDN referenced in official KaTeX docs and has SRI hash support. cdnjs is a valid fallback. unpkg has had reliability issues in the past — avoid for production. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| MathJax 2.x | End-of-life. Last release 2017. Synchronisation issues, large bundle. | KaTeX 0.16.33 |
| React / Vue / Svelte | No benefit for a content-first revision site. Adds build complexity, client hydration cost, and dependency maintenance burden. Pupils on slow mobile connections will notice. | Vanilla HTML + JS |
| Service Workers for offline caching | Over-engineered for v1. localStorage covers the only persistence requirement (RAG state). Adding a SW introduces cache invalidation complexity. | localStorage |
| `<iframe>` embedding for Desmos | Full iframe embeds (desmos.com/calculator in an iframe) are less controllable and can't be pre-configured with specific expressions. | Desmos JavaScript API v1.11 |
| Bootstrap / Tailwind | CSS frameworks add unused bloat. Mowden Hall branding is simple — custom CSS with CSS custom properties (variables) for school colours is 50 lines. | Custom CSS with variables |
| `katex.min.css` (non-swap variant) | Causes FOIT on slower connections — pupils see blank space where equations should be during font load. | `katex-swap.min.css` (available since v0.16.27) |

---

## Stack Patterns by Variant

**If adding a new topic page:**
- Copy the topic page template (`/templates/topic.html`)
- KaTeX renders automatically via `renderMathInElement(document.body)` on DOMContentLoaded
- Only add Desmos `<script>` tag if the topic needs a graph

**If embedding a Desmos graph:**
```html
<div id="calculator" style="width: 600px; height: 400px;"></div>
<script>
  const elt = document.getElementById('calculator');
  const calculator = Desmos.GraphingCalculator(elt, {
    expressions: false,  // hide expression list for pupil-facing embeds
    settingsMenu: false,
    zoomButtons: true,
  });
  calculator.setExpression({ id: 'graph1', latex: 'y = mx + c' });
</script>
```

**If the site needs to work offline (e.g. exam room with no internet):**
- Download KaTeX assets and serve them from `/assets/katex/` — no code change needed, just update the `<link>` and `<script>` src paths
- Desmos API requires internet — cannot be fully offline without a licence for local hosting (contact Desmos)
- Google Fonts can be replaced with `@fontsource-variable/dosis` font files in `/assets/fonts/`

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| KaTeX@0.16.33 | All major browsers, IE11+ | Synchronous render, no async dependencies |
| Desmos API v1.11 | Modern browsers (ES6+) | Requires internet for API script load. No IE11 support. |
| localStorage | All browsers including mobile Safari | 5 MB storage limit per origin — more than enough for a topic rating map |
| Google Fonts CSS2 API | All browsers | Use `?family=Dosis:wght@400;600;700&display=swap` — CSS2 API supports variable font syntax |

---

## Sources

- KaTeX official browser docs — https://katex.org/docs/browser (version 0.16.33 confirmed, CDN snippets verified)
- KaTeX GitHub releases — https://github.com/KaTeX/KaTeX/releases (v0.16.33 released 2026-02-23)
- KaTeX auto-render docs — https://katex.org/docs/autorender (delimiter options and DOMContentLoaded pattern confirmed)
- Desmos API v1.11 docs — https://www.desmos.com/api (version confirmed, API key process)
- GitHub Pages limits — https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits (1 GB, 100 GB/month, 10 builds/hour)
- Fontsource Dosis — https://fontsource.org/fonts/dosis (variable font, weights 200–800 confirmed)
- Google Fonts CSS2 API — https://developers.google.com/fonts/docs/css2 (import syntax verified)
- KaTeX vs MathJax comparison — https://biggo.com/news/202511040733_KaTeX_MathJax_Web_Rendering_Comparison (MEDIUM confidence — WebSearch source, consistent with official docs)
- MathJax 4 accessibility — https://docs.mathjax.org/en/v4.0/basic/accessibility.html (HIGH confidence — official docs, confirms MathJax accessibility advantage)
- Desmos demo API key — https://github.com/desmosinc/desmos-sample-cms (MEDIUM confidence — community source confirming demo key, verify licensing before go-live)
- localStorage MDN — https://javascript.info/localstorage (HIGH confidence — confirmed Web Storage API behaviour)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| KaTeX version and setup | HIGH | Verified against official KaTeX docs and GitHub releases page |
| Desmos API version (v1.11) | HIGH | Confirmed from official Desmos API docs |
| Desmos licensing for educational use | LOW | Demo key verified from community sources; production key process confirmed at desmos.com/my-api; specific educational licensing terms not publicly documented — contact partnerships@desmos.com before go-live |
| GitHub Pages limits | HIGH | Verified from official GitHub docs |
| Dosis font weights | HIGH | Verified from Fontsource |
| KaTeX vs MathJax performance | MEDIUM | Multiple sources agree KaTeX is faster for standard maths; MathJax has better accessibility — consistent finding across sources |
| localStorage pattern | HIGH | Standard browser API, well-documented, no library needed |
| No-framework recommendation | MEDIUM | Community consensus for content sites; no single authoritative source |

---

*Stack research for: Mowden Hall CE Maths Revision Site (GitHub Pages, static, no backend)*
*Researched: 2026-02-26*
