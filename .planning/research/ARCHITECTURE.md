# Architecture Research

**Domain:** Static maths education revision website (GitHub Pages)
**Researched:** 2026-02-26
**Confidence:** HIGH (KaTeX, Desmos official docs verified) / MEDIUM (localStorage RAG pattern, shared nav pattern)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Pupil Device)                    │
├──────────────────────────┬──────────────────────────────────────┤
│     Page Layer           │     Interactive Layer                 │
│  ┌───────────┐           │  ┌────────────┐  ┌────────────────┐  │
│  │  index    │           │  │   KaTeX    │  │ Desmos Embed   │  │
│  │  .html    │           │  │ auto-render│  │ (iframe/API)   │  │
│  └───────────┘           │  └────────────┘  └────────────────┘  │
│  ┌───────────┐           │                                       │
│  │  topic    │           │  ┌────────────────────────────────┐  │
│  │  .html    │◄──────────┤  │   RAG Tracker (localStorage)   │  │
│  └───────────┘           │  └────────────────────────────────┘  │
│  ┌───────────┐           │                                       │
│  │  level    │           │  ┌────────────────────────────────┐  │
│  │  index    │           │  │   Shared Nav (fetch fragment)  │  │
│  │  .html    │           │  └────────────────────────────────┘  │
│  └───────────┘           │                                       │
├──────────────────────────┴──────────────────────────────────────┤
│                    Static Asset Layer (CSS/JS/fonts)             │
├─────────────────────────────────────────────────────────────────┤
│                    GitHub Pages (CDN hosting)                    │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Level index (`foundation/index.html`) | Lists all topics for that level with RAG status badges | RAG Tracker (reads localStorage on load) |
| Topic page (`foundation/fractions/index.html`) | Renders worked examples, definitions, KaTeX math, optional Desmos embed | KaTeX (auto-render on DOMContentLoaded), Desmos API (lazy-loaded), RAG Tracker |
| KaTeX auto-render | Scans page DOM, replaces delimiter-wrapped strings with rendered SVG/HTML math | Runs against any page that includes the script; standalone |
| Desmos embed | Renders interactive calculator or geometry tool in a `<div>` container | Desmos CDN API (external dependency); isolated within its container |
| RAG Tracker module (`assets/js/tracker.js`) | Read/write topic confidence (R/A/G) to localStorage; render status buttons; update level index badges | localStorage (browser native); reads topic ID from page `<meta>` or `data-topic` attribute |
| Shared nav fragment (`assets/partials/nav.html`) | Renders site-wide navigation (home, level links) consistently across all pages | Loaded via `fetch()` into a `<div id="nav-placeholder">` in each page's `<body>` |
| CSS (`assets/css/main.css`) | Layout, typography (Dosis font), level colour coding, mobile responsiveness | No runtime dependencies |

---

## Recommended Project Structure

```
maths-revision/
├── index.html                    # Site homepage — level selector
├── assets/
│   ├── css/
│   │   └── main.css             # Global styles (Dosis, colour vars, layout)
│   ├── js/
│   │   ├── tracker.js           # RAG localStorage tracker module
│   │   └── nav.js               # Shared nav fetch-and-inject script
│   ├── partials/
│   │   └── nav.html             # Navigation HTML fragment (fetched client-side)
│   ├── fonts/                   # Optional: self-hosted KaTeX fonts (performance)
│   └── images/
│       └── logo.png             # Mowden Hall logo
├── foundation/
│   ├── index.html               # Foundation topic list + RAG summary
│   ├── fractions/
│   │   └── index.html           # Topic page
│   ├── division/
│   │   └── index.html
│   ├── prime-factors/
│   │   └── index.html
│   ├── estimation/
│   │   └── index.html
│   ├── long-multiplication/
│   │   └── index.html
│   └── averages/
│       └── index.html
├── core/
│   ├── index.html               # Core topic list + RAG summary
│   ├── ratio/
│   │   └── index.html
│   ├── percentages/
│   │   └── index.html
│   ├── algebra-basics/
│   │   └── index.html
│   ├── shape/
│   │   └── index.html
│   ├── angles/
│   │   └── index.html
│   ├── probability/
│   │   └── index.html
│   ├── coordinates-graphs/
│   │   └── index.html
│   ├── transformations/
│   │   └── index.html
│   ├── volume-surface-area/
│   │   └── index.html
│   ├── sequences/
│   │   └── index.html
│   ├── straight-line-graphs/
│   │   └── index.html
│   ├── speed-distance-time/
│   │   └── index.html
│   ├── powers-roots/
│   │   └── index.html
│   └── charts-data/
│       └── index.html
├── additional/
│   ├── index.html               # Additional topic list + RAG summary
│   ├── index-laws/
│   │   └── index.html
│   ├── algebra-expanding-factorising/
│   │   └── index.html
│   └── pythagoras/
│       └── index.html
└── formula-sheets/
    ├── foundation.html          # Foundation formula reference
    ├── core.html                # Core formula reference
    └── additional.html         # Additional formula reference
```

### Structure Rationale

- **One folder per topic with `index.html` inside:** Clean URLs without file extensions (`/foundation/fractions/` rather than `/foundation/fractions.html`). Consistent and bookmarkable.
- **Level as top-level directory:** Mirrors the CE exam paper structure directly. Pupils navigate by exam paper, not by topic type.
- **`assets/` flat structure:** No build tool means no asset hashing or bundling — keep it simple and direct.
- **`assets/partials/`:** Houses the nav fragment. Only one file, fetched client-side. Avoids copy-pasting nav HTML into every page.
- **`formula-sheets/` at root:** Shared resource across levels — lives outside level directories.
- **Kebab-case naming:** URL-safe, readable, consistent. No spaces, no camelCase.

---

## Architectural Patterns

### Pattern 1: KaTeX CDN with Auto-Render

**What:** Load KaTeX from jsDelivr CDN using `defer`, then trigger `renderMathInElement` on page load. Configure delimiters to support both `$$...$$` (display) and `$...$` (inline).

**When to use:** Every topic page that contains mathematical notation — which is most of them.

**Trade-offs:** ~347 kB added to page weight (JS + fonts). Synchronous render (no reflow jank). Mobile fonts scale correctly. CDN means no self-hosting required unless offline is needed.

**Example — place in every topic page `<head>`:**
```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css">
<script defer
  src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.js"></script>
<script defer
  src="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  });"></script>
```

**Content authoring convention:** Topic page HTML uses `$...$` for inline (e.g., `$x^2 + 3x + 2$`) and `$$...$$` for display equations (centred, larger). This maps directly to standard LaTeX conventions teachers already know.

Source: [KaTeX official docs](https://katex.org/docs/browser) — HIGH confidence.

---

### Pattern 2: Desmos Graphing Calculator Embed

**What:** Load the Desmos API script with an API key, create a sized `<div>`, initialise the calculator with `Desmos.GraphingCalculator(element, options)`.

**When to use:** Core and Additional topics involving graphs (`straight-line-graphs`, `coordinates-graphs`, `pythagoras`, `index-laws`). Not every page — only where interactive exploration adds value over a static worked example.

**Trade-offs:** Requires an API key (demo key available for development; production key needs email to Desmos partnerships — this is free for non-commercial educational use, but requires contacting them). External CDN dependency. Embeds are rich but add ~500 kB per page that uses them.

**Recommended approach:** Lazy-load Desmos only on pages that need it. Don't include the Desmos `<script>` tag on pages that have no embed.

**Example — topic page with Desmos (e.g., `straight-line-graphs/index.html`):**
```html
<!-- Only on pages that need it -->
<script src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=YOUR_KEY"></script>

<!-- In the page body -->
<div id="graph-demo" style="width: 100%; height: 400px;"></div>

<script>
  var elt = document.getElementById('graph-demo');
  var calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    expressions: true,
    zoomButtons: true,
    settingsMenu: false
  });
  // Pre-load a starter expression pupils can explore
  calculator.setExpression({ id: 'line', latex: 'y = 2x + 1' });
</script>
```

**API key action required:** Register at https://www.desmos.com/my-api. Use the demo key (`dcb31709b452b1cf9dc26972add0fda6`) during development. Contact `partnerships@desmos.com` for a production key before going live. The current stable API version is v1.10/v1.11.

Source: [Desmos API v1.11 docs](https://www.desmos.com/api) — HIGH confidence on embed pattern; MEDIUM confidence on education key availability (not documented publicly, requires direct contact).

---

### Pattern 3: localStorage RAG Tracker

**What:** A single JavaScript module (`tracker.js`) reads and writes topic confidence ratings (Red/Amber/Green) to `localStorage` as a JSON object. Each topic page includes a confidence selector; level index pages read stored values to display summary badges.

**When to use:** Every topic page and every level index page loads the tracker module. The tracker is the only piece of "state" in the site.

**Data schema:**
```javascript
// localStorage key: "maths-revision-tracker"
// Value: JSON-stringified object
{
  "foundation/fractions": "green",
  "foundation/averages": "amber",
  "core/ratio": "red",
  "additional/pythagoras": "green"
}
```

**Topic ID convention:** `{level}/{kebab-topic-slug}` — matches the URL path segments. Derived from `window.location.pathname` or from a `data-topic-id` attribute on `<body>`.

**Example — tracker.js:**
```javascript
const STORAGE_KEY = 'maths-revision-tracker';

function getAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function setConfidence(topicId, rating) {
  // rating: 'red' | 'amber' | 'green' | null
  const data = getAll();
  if (rating === null) {
    delete data[topicId];
  } else {
    data[topicId] = rating;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getConfidence(topicId) {
  return getAll()[topicId] || null;
}

// On a topic page: render RAG buttons and restore saved state
function initTopicTracker(topicId) {
  const saved = getConfidence(topicId);
  const container = document.getElementById('rag-tracker');
  ['red', 'amber', 'green'].forEach(rating => {
    const btn = document.createElement('button');
    btn.className = `rag-btn rag-${rating}${saved === rating ? ' active' : ''}`;
    btn.textContent = { red: 'Not sure', amber: 'Getting there', green: 'Got it' }[rating];
    btn.addEventListener('click', () => {
      setConfidence(topicId, rating);
      document.querySelectorAll('.rag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    container.appendChild(btn);
  });
}

// On a level index page: decorate each topic link with its RAG status
function decorateLevelIndex() {
  const data = getAll();
  document.querySelectorAll('[data-topic-id]').forEach(el => {
    const id = el.dataset.topicId;
    if (data[id]) {
      el.classList.add(`rag-badge-${data[id]}`);
    }
  });
}
```

**Topic page HTML:**
```html
<body data-topic-id="foundation/fractions">
  <!-- ... content ... -->
  <div id="rag-tracker">
    <p>How confident are you on this topic?</p>
    <!-- buttons injected by tracker.js -->
  </div>
  <script src="/assets/js/tracker.js"></script>
  <script>
    initTopicTracker(document.body.dataset.topicId);
  </script>
</body>
```

**Level index HTML link pattern:**
```html
<a href="/foundation/fractions/" data-topic-id="foundation/fractions">Fractions</a>
```

Source: MDN Web Storage API — HIGH confidence. Pattern design is original based on established localStorage conventions.

---

### Pattern 4: Shared Navigation via Fetch Fragment

**What:** Each page has a `<div id="nav-placeholder">` in the `<body>`. A small script (`nav.js`) fetches `/assets/partials/nav.html` and injects it. The current page's nav link gets `aria-current="page"` via a script that compares `window.location.pathname` to each nav link `href`.

**When to use:** All pages. The nav fragment contains links to `/`, `/foundation/`, `/core/`, `/additional/`, and `/formula-sheets/`.

**Trade-offs:** Tiny flash-of-no-nav on first load (mitigated by placing `nav.js` early in `<body>`). Works without a build tool. Fails gracefully if fetch fails (nav placeholder stays empty, main content still renders). Simpler than duplicating nav HTML across every page.

**Alternative considered:** Duplicate nav HTML in every page. Rejected — 20+ pages means one nav change requires editing every file. Fetch fragment wins for maintainability.

**Example — nav.js:**
```javascript
fetch('/assets/partials/nav.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('nav-placeholder').innerHTML = html;
    // Mark active link
    const path = window.location.pathname;
    document.querySelectorAll('#nav-placeholder a').forEach(a => {
      if (path.startsWith(a.getAttribute('href'))) {
        a.setAttribute('aria-current', 'page');
      }
    });
  });
```

Source: CSS-Tricks, MDN Fetch API, FreeCodeCamp — MEDIUM confidence (pattern is well-established but not from a single canonical source).

---

## Data Flow

### Page Load Flow (Topic Page)

```
Browser requests /foundation/fractions/
        |
        v
GitHub Pages serves foundation/fractions/index.html
        |
        v
Browser parses HTML, defers KaTeX scripts
        |
        ├──> nav.js fetches /assets/partials/nav.html → injects nav
        |
        ├──> KaTeX scripts load (deferred) → auto-render fires on DOMContentLoaded
        │    Scans document.body for $...$ and $$...$$ delimiters
        │    Replaces with rendered math HTML in-place
        |
        ├──> tracker.js loads → initTopicTracker('foundation/fractions')
        │    Reads localStorage['maths-revision-tracker']
        │    Parses JSON → finds saved rating → marks active button
        |
        └──> (if page has Desmos) Desmos API loads → calculator initialises in #graph-demo
```

### RAG State Write Flow

```
Pupil clicks "Got it" button
        |
        v
tracker.js: setConfidence('foundation/fractions', 'green')
        |
        v
JSON.parse(localStorage.getItem('maths-revision-tracker') || '{}')
        |
        v
{ ...existing, 'foundation/fractions': 'green' }
        |
        v
localStorage.setItem('maths-revision-tracker', JSON.stringify(updated))
        |
        v
Button UI updated (active class toggled)
```

### Level Index Load Flow

```
Pupil visits /foundation/
        |
        v
GitHub Pages serves foundation/index.html
        |
        v
tracker.js: decorateLevelIndex()
        |
        v
Reads localStorage['maths-revision-tracker']
        |
        v
For each <a data-topic-id="..."> element:
  If stored rating exists → add class rag-badge-{red|amber|green}
        |
        v
CSS renders coloured badge/dot on topic link
```

---

## Build Order and Component Dependencies

The components have a clear dependency order that dictates build sequence:

```
1. CSS + Typography (no dependencies)
        |
        v
2. Shared nav fragment (depends on: CSS)
        |
        v
3. Homepage (depends on: nav fragment, CSS)
        |
        v
4. tracker.js module (depends on: nothing — pure JS)
        |
        v
5. Level index pages (depends on: nav, tracker.js, CSS)
        |
        v
6. Topic pages — Foundation first (depends on: nav, tracker.js, KaTeX config, CSS)
        |
        v
7. Topic pages — Core (depends on: same as Foundation)
        |
        v
8. Topic pages — Additional (depends on: same, + Desmos for graph topics)
        |
        v
9. Formula sheets (depends on: nav, KaTeX, CSS)
```

**Why Foundation first:** Foundation content exists (Google Slides decks). Proves the end-to-end template works before tackling the 10 missing Core topics that need content written.

**Why tracker.js before topic pages:** Topic page HTML template includes the tracker markup. Build the module once, reference it everywhere.

**Why Desmos last within topics:** Only a subset of Core and Additional topics need it. Adding Desmos to a page is additive — doesn't change the base template.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| KaTeX (jsDelivr CDN) | `<link>` + deferred `<script>` tags in `<head>` | ~347 kB; falls back gracefully (raw LaTeX visible if CDN fails). Self-host fonts optionally for offline resilience. |
| Desmos API (desmos.com CDN) | `<script src="...calculator.js?apiKey=...">` on pages that need it | Requires production API key before going live. Demo key: `dcb31709b452b1cf9dc26972add0fda6`. Contact `partnerships@desmos.com`. |
| Google Fonts (Dosis) | `<link>` to Google Fonts CDN in `<head>` | Can also self-host for offline use. |
| GitHub Pages | Static file hosting from `main` branch | No build step required. Pushes deploy within ~2 min. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Topic page ↔ tracker.js | `data-topic-id` attribute on `<body>` + function call | One-way: page tells tracker its ID; tracker reads/writes storage |
| Level index ↔ tracker.js | `data-topic-id` attributes on `<a>` links | tracker.js decorates links after reading all storage |
| Any page ↔ nav.html | `fetch()` in nav.js; DOM injection | nav.html has no script dependencies — pure HTML |
| Topic page ↔ KaTeX | KaTeX scans entire `document.body` for delimiters | No explicit API call needed — auto-render handles it |
| Topic page ↔ Desmos | Explicit JS init block per embed | Only present on pages that have a `#graph-demo` div |

---

## Anti-Patterns

### Anti-Pattern 1: One flat directory with all topic files

**What people do:** `foundation-fractions.html`, `foundation-averages.html`, `core-ratio.html` — all at the root.

**Why it's wrong:** URLs become ugly. No natural grouping by level. As topics grow (30+ files), the root becomes unnavigable. Level-scoped logic (e.g., colour themes) has no natural anchor.

**Do this instead:** One directory per level, one subdirectory per topic with `index.html` inside. Clean URLs, clear hierarchy.

---

### Anti-Pattern 2: Duplicating nav HTML in every page

**What people do:** Copy-paste the `<nav>` block into all 30+ HTML files.

**Why it's wrong:** One nav change (new level, rebranding, extra link) requires editing every file. Guaranteed to get out of sync.

**Do this instead:** Single `assets/partials/nav.html` fragment, loaded via `fetch()` by `nav.js`. One file to edit, all pages update.

---

### Anti-Pattern 3: Storing RAG state as individual localStorage keys

**What people do:** `localStorage.setItem('foundation-fractions', 'green')`, `localStorage.setItem('foundation-averages', 'amber')` — one key per topic.

**Why it's wrong:** No single point of truth. Enumerating all topics to build a summary requires knowing the key names in advance. Difficult to clear, export, or inspect. Collides with other sites' keys on localhost.

**Do this instead:** One namespaced key (`maths-revision-tracker`) holding a JSON object with all topic ratings. Easy to read entire state, reset, or display summaries.

---

### Anti-Pattern 4: Loading Desmos on every page

**What people do:** Include the Desmos `<script>` in the shared `<head>` template to make it "always available."

**Why it's wrong:** ~500 kB loaded on every page, including ones that never show a calculator. Pages with no Desmos embed are slowed down for no benefit — especially costly on mobile data.

**Do this instead:** Include the Desmos script tag only in the `<head>` of topic pages that actually embed a calculator. Keep a list of which pages need it.

---

### Anti-Pattern 5: Writing LaTeX in HTML attributes

**What people do:** `<p data-formula="x^2 + 3x + 2">` and rendering via JS attribute reader.

**Why it's wrong:** Unnecessary indirection. KaTeX auto-render already handles inline text. Attributes require a custom rendering step and break if JS fails.

**Do this instead:** Write math inline in the page body using `$...$` delimiters directly in HTML text content. KaTeX auto-render finds and replaces them automatically.

---

## Scaling Considerations

This site serves a single year-group at one school. Scaling is not a meaningful concern — GitHub Pages CDN handles this effortlessly.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 30 pupils | Current architecture — no changes needed |
| 300 pupils (whole school) | No changes — GitHub Pages serves from CDN |
| Public revision site (10k+ pupils) | Still GitHub Pages. Only concern: Desmos API key terms of service. Contact Desmos if usage is large-scale commercial. |

**First bottleneck (if it arises):** KaTeX font loading on first visit. Mitigation: self-host the KaTeX fonts in `assets/fonts/` rather than relying on the CDN. CDN will cache on subsequent visits anyway.

**Second bottleneck (if it arises):** Shared nav fetch adds one HTTP request per page load. Mitigation: inline the nav on a per-page basis if performance profiling shows it's genuinely problematic (unlikely for this scale).

---

## Sources

- KaTeX official documentation — browser loading: https://katex.org/docs/browser (HIGH confidence)
- KaTeX auto-render configuration: https://katex.org/docs/autorender (HIGH confidence)
- Desmos API v1.11 documentation: https://www.desmos.com/api (HIGH confidence)
- MDN Web Storage API — localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API (HIGH confidence)
- CSS-Tricks — HTML includes via fetch: https://css-tricks.com/the-simplest-ways-to-handle-html-includes/ (MEDIUM confidence)
- FreeCodeCamp — reusable HTML components: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/ (MEDIUM confidence)
- GitHub community — multi-page website structure: https://github.com/orgs/community/discussions/147721 (MEDIUM confidence)

---

*Architecture research for: Mowden Hall Maths Revision Site (static GitHub Pages)*
*Researched: 2026-02-26*
