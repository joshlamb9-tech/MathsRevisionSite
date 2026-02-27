# Phase 5: RAG Tracker and Formula Sheets - Research

**Researched:** 2026-02-27
**Domain:** Vanilla JS localStorage, CSS print media, static GitHub Pages
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RAG-01 | Pupil can mark any topic as Red, Amber, or Green from topic page | RAG button pattern; topic page `data-topic-slug` wiring |
| RAG-02 | RAG ratings persist after closing and reopening browser (localStorage) | Single JSON object under namespaced key; try/catch wrapper |
| RAG-03 | Level index pages show each topic's RAG status as colour badge | `tracker.getRating(slug)` called on page load; inject badge into `.topic-list` anchor |
| RAG-04 | Safari private browsing shows clear message rather than crash | Storage availability test on init; `tracker.available` flag; banner on unsupported |
| RAG-05 | localStorage key namespaced (`maths-revision:tracker`) | Decided — locks out French revision site collision on shared GitHub Pages domain |
| FORM-01 | Pupil can view Foundation formula reference page | Separate HTML file at `/foundation/formulas/` |
| FORM-02 | Pupil can view Core formula reference page | Separate HTML file at `/core/formulas/` |
| FORM-03 | Pupil can view Additional formula reference page | Separate HTML file at `/additional/formulas/` |
| FORM-04 | Formula sheets printable from desktop | `@media print` CSS in styles.css; `@page { size: A4; }` |
</phase_requirements>

---

## Summary

Phase 5 has two completely independent workstreams: (1) a vanilla JS localStorage RAG tracker wired to 24 topic pages and 3 level indexes, and (2) three formula reference HTML pages with print CSS. Neither requires a build step, backend, or new npm dependencies.

The localStorage pattern is well-established: store everything under a single namespaced key (`maths-revision:tracker`) as a JSON object, wrap all read/write in try/catch, and expose a simple `tracker.available` boolean so the UI can show a message rather than silently fail. The key insight is that the GitHub Pages domain is shared with the French revision site, so namespacing is not optional — it prevents key collision across projects hosted on the same origin.

Formula sheets should be **separate HTML files** (not inline sections on level index pages). This gives a clean, printable URL, avoids needing to hide non-formula content during printing, and follows the URL structure already established for the site. A shared `@media print` block in `styles.css` handles print styling for all three formula pages consistently.

**Primary recommendation:** Write `tracker.js` as a self-contained module with a storage availability check on load. Wire it to pages by adding `data-topic-slug="foundation/fractions"` attributes to the RAG button containers and topic list anchors. Formula sheets get their own HTML files with KaTeX head block, and print CSS is added to `styles.css`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla JS | ES2020 (no transpile) | tracker.js module | No build step; GitHub Pages serves static files directly; no npm |
| localStorage API | Web standard | RAG persistence | Already decided; no backend; GDPR-friendly |
| CSS `@media print` | Web standard | Formula sheet printing | No PDF generation needed; browser print dialog is sufficient for school use |

### No New Dependencies
This phase adds zero new dependencies. KaTeX is already loaded on all topic pages. Dosis font is already loaded. The tracker is a single vanilla JS file.

---

## Architecture Patterns

### Recommended File Structure

```
assets/
  js/
    tracker.js            # RAG localStorage module (new)
  css/
    styles.css            # Print CSS added here (existing)

foundation/
  formulas/
    index.html            # Foundation formula reference (new)

core/
  formulas/
    index.html            # Core formula reference (new)

additional/
  formulas/
    index.html            # Additional formula reference (new)
```

No changes to existing topic page content. Only additions: `<script>` tag in head and RAG button markup in body.

### Pattern 1: tracker.js — Single Namespaced JSON Object

**What:** All 24 topic ratings stored under one localStorage key as a JSON object. The module detects availability on load, exposes `tracker.available`, and provides `get`/`set`/`reset` methods.

**When to use:** Any time multiple related values need to be stored together. A single `JSON.stringify`/`JSON.parse` is more efficient than 24 separate `setItem`/`getItem` calls, and it prevents littering the shared localStorage namespace.

**Example:**
```javascript
// assets/js/tracker.js
// Source: pattern from https://www.theanshuman.dev/articles/the-right-way-to-use-localstorage-in-javascript-41a0
// and https://trackjs.com/javascript-errors/failed-to-execute-setitem-on-storage/

(function () {
  'use strict';

  const NAMESPACE = 'maths-revision:tracker';

  // ── Storage availability detection ────────────────────────────────────
  // Safari private browsing: older versions (pre-iOS 11) set quota to 0
  // and throw QUOTA_EXCEEDED_ERR synchronously on setItem. Modern Safari
  // (iOS 11+ confirmed) supports localStorage in private mode but isolates
  // data per session. We still test defensively because school devices may
  // run old iOS versions (iPads with iOS 9/10 are common in schools).
  function isStorageAvailable() {
    try {
      const test = '__maths-revision-test__';
      localStorage.setItem(test, '1');
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const available = isStorageAvailable();

  // ── Read/write helpers ────────────────────────────────────────────────
  function readAll() {
    if (!available) return {};
    try {
      return JSON.parse(localStorage.getItem(NAMESPACE)) || {};
    } catch (e) {
      return {};
    }
  }

  function writeAll(data) {
    if (!available) return;
    try {
      localStorage.setItem(NAMESPACE, JSON.stringify(data));
    } catch (e) {
      // Storage full or revoked mid-session — degrade silently
    }
  }

  // ── Public API ────────────────────────────────────────────────────────
  window.tracker = {
    available: available,

    // slug: e.g. 'foundation/fractions'
    // rating: 'red' | 'amber' | 'green' | null
    getRating: function (slug) {
      return readAll()[slug] || null;
    },

    setRating: function (slug, rating) {
      const data = readAll();
      if (rating === null) {
        delete data[slug];
      } else {
        data[slug] = rating;
      }
      writeAll(data);
    },

    reset: function () {
      if (!available) return;
      try {
        localStorage.removeItem(NAMESPACE);
      } catch (e) {}
    }
  };
}());
```

### Pattern 2: Topic Page — RAG Selector Buttons

**What:** Three buttons (R/A/G) below the page title. The active state is set from `tracker.getRating()` on load. Clicking updates the tracker and re-renders the active state.

**When to use:** On all 24 topic pages. Add after the breadcrumb / level-badge block.

**HTML to add to each topic page:**
```html
<!-- RAG Confidence Tracker -->
<div class="rag-selector" data-topic-slug="foundation/fractions">
  <span class="rag-label">How confident are you?</span>
  <button class="rag-btn rag-red"   data-rating="red">Not sure</button>
  <button class="rag-btn rag-amber" data-rating="amber">Getting there</button>
  <button class="rag-btn rag-green" data-rating="green">Got it</button>
</div>
<div class="rag-unavailable" style="display:none">
  Confidence tracker not available in private browsing.
</div>
```

**JS snippet (inline in each topic page, after tracker.js loads):**
```javascript
// Called after tracker.js is loaded via <script defer>
document.addEventListener('DOMContentLoaded', function () {
  var sel = document.querySelector('.rag-selector');
  if (!sel) return;

  var slug = sel.dataset.topicSlug;

  // Show unavailable message if storage blocked
  if (!window.tracker.available) {
    document.querySelector('.rag-unavailable').style.display = '';
    sel.style.display = 'none';
    return;
  }

  // Apply current rating on load
  function applyRating(rating) {
    sel.querySelectorAll('.rag-btn').forEach(function (btn) {
      btn.classList.toggle('rag-active', btn.dataset.rating === rating);
    });
  }

  applyRating(tracker.getRating(slug));

  // Handle clicks
  sel.addEventListener('click', function (e) {
    var btn = e.target.closest('.rag-btn');
    if (!btn) return;
    var rating = btn.dataset.rating;
    tracker.setRating(slug, rating);
    applyRating(rating);
  });
});
```

### Pattern 3: Level Index Pages — RAG Badge Per Topic

**What:** On page load, read each topic's rating and inject a coloured dot/badge into the topic list link.

**When to use:** On `foundation/index.html`, `core/index.html`, `additional/index.html`. Each `<li>` in `.topic-list` needs a `data-topic-slug` attribute added.

**Modified topic list `<li>` pattern:**
```html
<li data-topic-slug="foundation/fractions">
  <a href="/MathsRevisionSite/foundation/fractions/">Fractions</a>
</li>
```

**JS snippet (inline in each index page):**
```javascript
document.addEventListener('DOMContentLoaded', function () {
  if (!window.tracker || !window.tracker.available) return;

  document.querySelectorAll('.topic-list li[data-topic-slug]').forEach(function (li) {
    var slug = li.dataset.topicSlug;
    var rating = tracker.getRating(slug);
    if (!rating) return;

    var badge = document.createElement('span');
    badge.className = 'rag-index-badge rag-' + rating;
    li.querySelector('a').appendChild(badge);
  });
});
```

### Pattern 4: Formula Sheet HTML Pages

**What:** Separate HTML files at `/foundation/formulas/index.html`, `/core/formulas/index.html`, `/additional/formulas/index.html`. Each uses the same KaTeX head block as topic pages and links to `styles.css`.

**When to use:** Formula sheets must be separate pages, not inline sections on index pages.

**Why separate pages:**
- Printer-friendly URL: pupil can bookmark `/foundation/formulas/` and print directly
- No need to hide non-formula content with `@media print`
- Clean `@page` rule applies to the whole page
- Follows the existing URL structure pattern established in Phase 1

**Formula sheet HTML structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Same KaTeX head block as topic pages -->
  ...
  <link rel="stylesheet" href="/MathsRevisionSite/assets/css/styles.css">
  <title>Foundation Formulae | Maths Revision | Mowden Hall</title>
</head>
<body>
  <header class="site-header">...</header>
  <main class="main-content">
    <p class="breadcrumb">...</p>
    <h1 class="page-title">Foundation Formula Sheet</h1>
    <span class="level-badge foundation">Foundation</span>
    <p class="formula-print-hint">Press Ctrl+P (or Cmd+P on Mac) to print this sheet.</p>

    <section class="formula-section">
      <h2>Fractions</h2>
      <div class="formula-block">...</div>
    </section>
    ...
  </main>
  <footer>...</footer>
</body>
</html>
```

### Anti-Patterns to Avoid

- **Calling `localStorage.setItem` without try/catch:** Will crash older Safari private mode. Always wrap.
- **Using `localStorage.clear()`:** Nukes ALL keys on the origin — would destroy the French revision site's data too. Use `localStorage.removeItem(NAMESPACE)` only.
- **24 separate localStorage keys:** Harder to clear cleanly, more namespace pollution, no atomicity. One JSON object is correct.
- **Checking `typeof localStorage !== 'undefined'`:** Insufficient in Safari private mode — `localStorage` IS defined, `setItem` just throws. Must attempt a write to confirm.
- **Inline formula content on level index pages:** Complicates print CSS (you'd need `display:none` on everything else), and pupils can't bookmark the formula sheet URL directly.
- **Using `page-break-inside` (deprecated):** Use `break-inside: avoid` instead (modern CSS). Add `page-break-inside: avoid` as fallback only for very old Safari.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| localStorage availability detection | Custom browser detection (user-agent sniffing) | Try/catch write test | UA sniffing is unreliable; only an actual write attempt confirms storage works |
| Safari version detection | `navigator.userAgent` parsing | `isStorageAvailable()` function | Same reason; future-proof |
| CSS-only RAG state persistence | CSS variables or `:checked` pseudo-class tricks | localStorage | CSS state doesn't survive page reload |
| PDF generation | wkhtmltopdf, Puppeteer, jsPDF | Browser print dialog | Static site constraint; `@media print` is sufficient for a school sheet |
| Font loading for print | Embedding fonts manually | KaTeX CSS (already handles its own fonts) + Dosis via Google Fonts | KaTeX fonts are embedded in the CDN CSS; Dosis loads before print triggers |

**Key insight:** The entire RAG tracker can be implemented in ~60 lines of vanilla JS. There is no case for a library like localForage or store.js on a site this small.

---

## Common Pitfalls

### Pitfall 1: Safari Private Browsing Crash
**What goes wrong:** `localStorage.setItem` throws `QuotaExceededError` synchronously. Any uncaught exception halts subsequent JS, which could break KaTeX auto-render if both are in the same script block.
**Why it happens:** Older Safari (pre-iOS 11, but also possible on managed school iPads with old iOS) sets the storage quota to 0 in private mode. Modern Safari (iOS 11+) has fixed this, but the installed base on school devices is unknown.
**How to avoid:** Run `isStorageAvailable()` at module init (a test write/remove in try/catch). Set `tracker.available = false` if it throws. All subsequent UI checks gate on this flag. Show a dismissable banner rather than crashing.
**Warning signs:** Console shows `QUOTA_EXCEEDED_ERR: DOM Exception 22`. JS execution stops after the error.

**Confidence:** HIGH — confirmed by multiple sources including MDN, WebKit bug tracker, and muffinman.io analysis. Modern Safari fix confirmed by MDN GitHub issue #17827 but school device OS versions are unknown.

### Pitfall 2: GitHub Pages Same-Origin localStorage Collision
**What goes wrong:** The French revision site and Maths revision site share the same GitHub Pages origin (`username.github.io`). A key like `tracker` set by the French site would overwrite the maths tracker.
**Why it happens:** localStorage is scoped to origin (protocol + hostname + port), not to path. Two GitHub Pages sites from the same account share the same storage namespace.
**How to avoid:** Use the full namespace `maths-revision:tracker` as the single localStorage key. This is already decided. Confirmed by TomasHubelbauer/github-pages-local-storage library which specifically addresses this problem.
**Warning signs:** RAG ratings reset unexpectedly when pupil uses the French revision site. Keys from other sites visible in browser dev tools Storage panel.

**Confidence:** HIGH — confirmed by GitHub issues, MDN, and the TomasHubelbauer library specifically built to solve this.

### Pitfall 3: `data-topic-slug` Mismatch
**What goes wrong:** If the slug in the HTML `data-topic-slug` attribute doesn't exactly match the key stored in localStorage, ratings are lost.
**Why it happens:** A typo like `foundation/fraction` instead of `foundation/fractions` creates a separate key that never matches.
**How to avoid:** The 24 slugs are LOCKED (from Phase 1 decision). Use the locked list verbatim when adding `data-topic-slug` attributes. The locked slugs are: `foundation/fractions`, `foundation/division`, `foundation/prime-factors`, `foundation/estimation`, `foundation/long-multiplication`, `foundation/averages`, `core/ratio`, `core/percentages`, `core/algebra-basics`, `core/shape`, `core/averages`, `core/angles`, `core/probability`, `core/coordinates-graphs`, `core/transformations`, `core/volume-surface-area`, `core/sequences-nth-term`, `core/straight-line-graphs`, `core/speed-distance-time`, `core/powers-roots`, `core/charts-data`, `additional/index-laws`, `additional/expanding-factorising`, `additional/pythagoras`.
**Warning signs:** Clicking RAG buttons appears to work but ratings don't appear on the index page, or don't persist after reload.

**Confidence:** HIGH — this is a direct consequence of the Phase 1 locked slug decision.

### Pitfall 4: KaTeX Not Rendered When Page First Loads (formula sheets)
**What goes wrong:** Formula sheet opens, KaTeX expressions show as raw LaTeX text for a moment, then render. In print, if the user triggers Ctrl+P before KaTeX renders, formulas print as raw text.
**Why it happens:** KaTeX scripts are `defer`-loaded; auto-render fires in the `onload` callback. Print dialog opened immediately after page load may catch the page before render completes.
**How to avoid:** Use the same `defer` + `onload` pattern already established on topic pages. Advise pupil to wait for page to fully load before printing (add a print hint: "Wait for equations to appear before printing"). No additional code needed — same pattern, same CDN, same render timing.
**Warning signs:** Printing too quickly shows `$\frac{a}{b}$` in raw form rather than a rendered fraction.

**Confidence:** MEDIUM — no documented KaTeX-specific print bug found. Risk is timing-related, not a KaTeX deficiency.

### Pitfall 5: Print Dialog Includes Browser UI Clutter
**What goes wrong:** Pupil prints formula sheet and gets browser URL, date, page number in header/footer on the printed page.
**Why it happens:** Browser-injected print headers/footers are controlled by the browser's print settings, not CSS. They cannot be removed via CSS alone.
**How to avoid:** Advise pupil to uncheck "Headers and footers" in the print dialog. There is no CSS-only solution to suppress browser-injected headers. Accept this limitation for v1 — it is standard behaviour on all browsers.
**Warning signs:** Formula sheets print with browser URL at top and date/time at bottom.

**Confidence:** HIGH — confirmed by MDN print documentation and multiple sources.

### Pitfall 6: RAG Buttons Break on Index Pages (no topic page context)
**What goes wrong:** tracker.js is loaded globally and the DOMContentLoaded listener looks for `.rag-selector`. On index pages there is no `.rag-selector`, so this is a no-op — but must be confirmed not to error.
**Why it happens:** If the JS uses `querySelector(...).dataset` without null-checking, it throws `TypeError: Cannot read property 'dataset' of null`.
**How to avoid:** Always null-check `querySelector` results before accessing properties. See Pattern 2 above — the `if (!sel) return;` guard.
**Warning signs:** Console error `TypeError: Cannot read property 'dataset' of null` on index pages.

---

## Code Examples

Verified patterns from the research above:

### localStorage Availability Detection (Standard Pattern)
```javascript
// Source: MDN Web Docs, TrackJS, and muffinman.io
// Confirmed correct for all browsers including Safari private mode
function isStorageAvailable() {
  try {
    const test = '__maths-revision-test__';
    localStorage.setItem(test, '1');
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
```

### Read All Ratings (JSON Object Pattern)
```javascript
// Source: theanshuman.dev — namespaced JSON object pattern
function readAll() {
  try {
    return JSON.parse(localStorage.getItem('maths-revision:tracker')) || {};
  } catch (e) {
    return {}; // malformed JSON — reset silently
  }
}
```

### Write All Ratings
```javascript
// Always wrap setItem — storage may be revoked mid-session on some browsers
function writeAll(data) {
  try {
    localStorage.setItem('maths-revision:tracker', JSON.stringify(data));
  } catch (e) {
    // Quota exceeded or storage revoked — degrade silently
  }
}
```

### Print CSS for Formula Sheets (in styles.css)
```css
/* ─── FORMULA SHEETS ─── */
.formula-section {
  margin: 1.5rem 0;
}

.formula-block {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
}

.formula-print-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

/* ─── PRINT MEDIA ─── */
@media print {
  /* Page setup */
  @page {
    size: A4;
    margin: 1.5cm;
  }

  /* Hide site chrome */
  .site-header,
  .breadcrumb,
  footer,
  .formula-print-hint {
    display: none !important;
  }

  /* Keep formula blocks together — don't split a formula across pages */
  .formula-block {
    break-inside: avoid;
    page-break-inside: avoid; /* fallback for older Safari */
  }

  /* Keep section heading with its first formula block */
  .formula-section h2 {
    break-after: avoid;
    page-break-after: avoid;
  }

  /* Ensure white background for printing (browser may default to no-bg) */
  body {
    background: white;
    color: black;
  }

  .main-content {
    max-width: 100%;
    padding: 0;
  }

  /* KaTeX renders HTML/CSS — prints correctly as-is */
  /* No special KaTeX print overrides needed */
}
```

### RAG CSS (in styles.css)
```css
/* ─── RAG TRACKER ─── */
.rag-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0 1.5rem;
  flex-wrap: wrap;
}

.rag-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-mid);
  margin-right: 0.25rem;
}

.rag-btn {
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0.35rem 0.9rem;
  font-family: 'Dosis', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.1s;
  opacity: 0.45; /* unselected state — dimmed */
  color: white;
}

.rag-btn.rag-red   { background: #dc2626; }
.rag-btn.rag-amber { background: #d97706; }
.rag-btn.rag-green { background: #16a34a; }

.rag-btn.rag-active {
  opacity: 1;
  border-color: rgba(0,0,0,0.25);
  box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
}

/* Dot badge on index pages */
.rag-index-badge {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.rag-index-badge.rag-red   { background: #dc2626; }
.rag-index-badge.rag-amber { background: #d97706; }
.rag-index-badge.rag-green { background: #16a34a; }

/* Private browsing message */
.rag-unavailable {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 0.5rem 0.75rem;
  background: #fef9c3;
  border: 1px solid #fde047;
  border-radius: 6px;
  margin: 0.5rem 0 1.5rem;
}

/* Hide RAG elements in print — not relevant on formula sheets,
   but formula pages don't have .rag-selector so this is safety-only */
@media print {
  .rag-selector,
  .rag-unavailable { display: none !important; }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multiple individual localStorage keys per topic | Single namespaced JSON object | Established pattern ~2018 | Cleaner reset, fewer key collisions |
| Checking `typeof localStorage !== 'undefined'` | Try/catch write test | ~2012 (Safari private mode bug first reported) | More reliable availability detection |
| `page-break-inside: avoid` | `break-inside: avoid` (with `page-break-inside` as fallback) | CSS3 → CSS Fragmentation Level 3 | Modern browsers prefer non-prefixed version |
| Separate print stylesheet (`<link media="print">`) | `@media print` block in shared stylesheet | Industry practice ~2015 | Fewer HTTP requests; same stylesheet |

**Deprecated/outdated:**
- `localStorage.clear()`: Avoid entirely on GitHub Pages — nukes ALL keys including other sites on the same origin.
- User-agent sniffing for Safari private mode detection: Unreliable. Use write-test instead.

---

## Key Architecture Decision: Separate Formula Pages (Confirmed)

Formula sheets MUST be separate HTML files (`/foundation/formulas/index.html`, etc.), NOT inline sections on the level index pages.

**Reasoning:**
1. A separate page means the print CSS applies to the WHOLE page — no need to `display:none` the topic list, nav, etc.
2. Pupils can bookmark the formula URL and go directly to it before a practice exam.
3. The URL pattern `/level/formulas/` is consistent with `/level/topic-name/` already established.
4. Print output is predictably just the formulas, without risk of accidentally printing the topic list.
5. Each formula page can link to the level index and vice versa — standard navigation.

**Links to add:**
- On `foundation/index.html`: Add "Formula Sheet" link to the topic list (or a separate button)
- On `core/index.html`: Same
- On `additional/index.html`: Same

---

## Open Questions

1. **Which formulas belong on each sheet?**
   - What we know: Foundation = non-calculator arithmetic (fractions, area, perimeter, averages); Core = shape, ratio, algebra, graphs; Additional = index laws, Pythagoras
   - What's unclear: Exact formula selection is a content decision (Josh's call), not a tech decision
   - Recommendation: Josh to supply a formula list, or Claude drafts from CE 13+ spec and Josh approves

2. **Should formula sheets link from the level index or from individual topic pages?**
   - What we know: The formula sheet URL will be `/level/formulas/`
   - What's unclear: Where should the call-to-action live?
   - Recommendation: Add a "Formula Sheet" link at the top of each level index page, above the topic list — natural discovery point

3. **RAG reset button on topic pages?**
   - What we know: RAG-05 says reset must be clean; `tracker.reset()` clears all 24 ratings at once
   - What's unclear: Should there be a "Clear all ratings" button, and if so, where?
   - Recommendation: Omit for v1. The `tracker.reset()` function exists but is not exposed in the UI. Pupils can clear via browser dev tools if needed. Revisit in v2.

---

## Sources

### Primary (HIGH confidence)
- MDN GitHub issue #17827 — Modern Safari private mode localStorage behavior confirmed working (iOS 11+)
- https://muffinman.io/blog/localstorage-and-sessionstorage-in-safaris-private-mode/ — Safari private mode behavior and detection pattern
- https://trackjs.com/javascript-errors/failed-to-execute-setitem-on-storage/ — localStorage setItem error handling patterns
- https://www.theanshuman.dev/articles/the-right-way-to-use-localstorage-in-javascript-41a0 — namespaced JSON object pattern
- https://github.com/TomasHubelbauer/github-pages-local-storage — GitHub Pages same-origin collision problem confirmed
- https://didoesdigital.com/blog/print-styles/ — Print CSS break-inside, @page, hiding navigation
- MDN CSS break-inside, @page — break-inside: avoid for formula blocks
- https://voussoir.net/writing/css_for_printing — @page margin: 0 + DOM padding approach; Chrome @page limitation

### Secondary (MEDIUM confidence)
- https://bugs.webkit.org/show_bug.cgi?id=157010 — WebKit bug tracker confirming QuotaExceededError in private mode (older Safari)
- Apple Developer Forums thread 71593 — Safari private browsing localStorage historical discussions
- https://blog.openreplay.com/css-for-print--designing-web-content-for-physical-output/ — General print CSS patterns

### Tertiary (LOW confidence)
- General WebSearch findings on RAG UI patterns — no authoritative single source; pattern derived from project requirements

---

## Metadata

**Confidence breakdown:**
- localStorage pattern: HIGH — multiple authoritative sources, well-established technique
- Safari private mode behavior: HIGH for detection pattern; MEDIUM for exact behavior on old school iPads (unknown iOS version)
- GitHub Pages collision risk: HIGH — confirmed by dedicated library solving exactly this problem
- Print CSS approach: HIGH — @media print is standard; @page behavior confirmed
- KaTeX + print: MEDIUM — no documented issues, but no explicit "works perfectly in print" statement from KaTeX docs. Low risk.
- Formula sheet architecture (separate pages): HIGH — unambiguous advantage over inline approach

**Research date:** 2026-02-27
**Valid until:** 2026-05-27 (stable domain — localStorage API and print CSS don't change frequently)
