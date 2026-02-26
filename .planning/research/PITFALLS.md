# Pitfalls Research

**Domain:** Static maths education site (CE 13+ revision, GitHub Pages)
**Researched:** 2026-02-26
**Confidence:** MEDIUM — KaTeX and GitHub Pages confirmed against official docs; Desmos API limitations partially confirmed (production key policy verified, CSP details from community); localStorage Safari behaviour confirmed via community sources; PDF generation limitations from multiple sources.

---

## Critical Pitfalls

### Pitfall 1: KaTeX Auto-Render Does Not Fire If Scripts Load Before DOM

**What goes wrong:**
`renderMathInElement()` is called before the page content exists. All equations render as raw LaTeX strings (e.g. `\frac{1}{2}`) instead of typeset maths.

**Why it happens:**
The KaTeX auto-render script is included in `<head>` without `defer`, or the call to `renderMathInElement(document.body, ...)` is placed before the closing `</body>` tag but triggers before DOM is ready. Developers often copy the CDN snippet from tutorials that predate the `defer` pattern.

**How to avoid:**
Always include the KaTeX scripts with the `defer` attribute and use the `onload` callback pattern, or wrap the call in a `DOMContentLoaded` listener. The official KaTeX browser docs explicitly recommend this:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.x/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.x/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.x/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, { delimiters: [...] });"></script>
```

**Warning signs:**
- Equations appear as literal `$...$` or `\(...\)` text strings on the rendered page
- Browser console shows KaTeX functions called before document load
- Works on page refresh but not on first load

**Phase to address:** Foundation / Setup phase — establish the correct script loading pattern before any maths content is written.

---

### Pitfall 2: Dollar Sign Delimiter Order Causes Silent Breakage

**What goes wrong:**
Listing `$...$` (single dollar, inline) *before* `$$...$$` (double dollar, display) in the KaTeX auto-render delimiter configuration causes `$$` to be parsed as two consecutive empty `$` expressions rather than one display block. All display equations silently fail or render incorrectly.

**Why it happens:**
KaTeX auto-render processes delimiters in the order they are listed. The double-dollar delimiter must be listed first so the parser matches it before it tries single-dollar. This is documented in the official auto-render docs but easily missed when following community tutorials.

**How to avoid:**
Always configure delimiters with `$$` listed before `$`:

```javascript
renderMathInElement(document.body, {
  delimiters: [
    { left: "$$", right: "$$", display: true },   // must come first
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true }
  ]
});
```

**Warning signs:**
- Display equations (multi-line, centred) render as inline text
- `$$x^2 + y^2$$` appears as two empty maths spans with `x^2 + y^2` between them
- Unit tests on individual equations pass but page-level rendering looks wrong

**Phase to address:** Foundation / Setup phase — test the delimiter config with at least one inline and one display equation before authoring content.

---

### Pitfall 3: Jekyll Smart Quotes Break KaTeX Prime Notation

**What goes wrong:**
GitHub Pages uses Jekyll by default. Jekyll's Kramdown processor applies "smart quotes" — converting `'` to `'` (curly apostrophe). KaTeX cannot parse curly apostrophes as prime notation. Equations like `f'(x)` break silently or throw parse errors.

**Why it happens:**
Jekyll's Markdown processing runs *before* KaTeX sees the content. The Markdown processor treats prime notation as punctuation and converts it. This only manifests on the live GitHub Pages site — local development without Jekyll may not reproduce the problem.

**How to avoid:**
Two options:
1. Disable Jekyll smart quotes in `_config.yml`:
   ```yaml
   kramdown:
     smart_quotes: ["apos", "apos", "quot", "quot"]
   ```
2. Or avoid Jekyll entirely — use plain HTML files rather than Markdown-to-HTML conversion via Jekyll. Given the site is custom HTML anyway (not a blog), this is the cleaner approach. Set `.nojekyll` file at repo root to disable Jekyll processing entirely.

**Warning signs:**
- Equations with primes (derivatives, function notation) render locally but break on the deployed site
- KaTeX console error: "ParseError: KaTeX parse error: Expected 'EOF', got `'`"
- Problem only appears on `*.github.io` URL, not in local `file://` testing

**Phase to address:** Foundation / Setup phase — add `.nojekyll` and test a prime-containing equation on the live URL before bulk content authoring.

---

### Pitfall 4: Long Equations Overflow Horizontally on Mobile With No Scroll

**What goes wrong:**
Wide display equations (e.g. multi-term algebraic expressions) overflow their container on narrow mobile screens. By default, KaTeX does not wrap or scroll long equations — they extend beyond the viewport and are clipped. Pupils on phones cannot see the right-hand side of equations.

**Why it happens:**
KaTeX renders equations into a fixed-width HTML structure. The `.katex-display` container does not apply `overflow-x: auto` by default. Applying overflow rules naively also introduces an unwanted vertical scrollbar due to how KaTeX uses extra height internally.

**How to avoid:**
Wrap `.katex-display` with a scrollable container in CSS. Applying overflow directly to `.katex` or `.katex-display` introduces vertical scroll artefacts. The verified workaround is:

```css
.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5em 0;  /* prevent clipping of descenders */
}
```

This is a confirmed pattern from the KaTeX GitHub issues tracker (Issue #327, Discussion #2942) and is referenced in community implementations.

**Warning signs:**
- Equations look fine on desktop but extend beyond screen on a real iPhone or Android device
- Horizontal scroll appears on the entire page body rather than just the equation container
- Pupils report "the formula goes off the screen"

**Phase to address:** Foundation / Styling phase — add this CSS rule to the base stylesheet before any maths content is authored and test on a real mobile device.

---

### Pitfall 5: Desmos API Requires a Production Key Before Public Launch

**What goes wrong:**
The site ships publicly using Desmos's demo API key (`dcb31709b452b1cf9dc26972add0fda6`). Demo keys are explicitly only for development and may be rate-limited, disabled, or produce attribution watermarks that break layout. If Desmos disables the demo key, all embedded graphs break simultaneously with no warning.

**Why it happens:**
The demo key works fine during development so developers don't apply for a production key before launch. The Desmos API documentation makes this easy to overlook because the demo key is functional and not visually flagged as time-limited.

**How to avoid:**
Email `info@desmos.com` *before* publishing the site publicly to request a production API key. Desmos supports educational use and is generally responsive. The API key swap is a one-line change in the script `src` URL. Do this at the end of the build phase, not at launch.

**Warning signs:**
- All graphs display the demo key attribution or watermark
- Console errors referencing API key validity
- Desmos embeds stop loading after a period of time

**Phase to address:** Pre-launch / Deployment phase — production key application should be a named checklist item before the site URL is shared with pupils.

---

## Moderate Pitfalls

### Pitfall 6: localStorage Throws in Safari Private Browsing — RAG Tracker Silently Breaks

**What goes wrong:**
Safari on iOS in private browsing mode throws a `SecurityError` when any code calls `localStorage.setItem()`. If the RAG (Red/Amber/Green) confidence tracker code does not handle this, the entire tracker UI breaks on first interaction — potentially breaking other JavaScript on the page too if the error is uncaught.

**Why it happens:**
Safari's private mode disables localStorage entirely (rather than returning a no-op). Many pupils will use private browsing to avoid login cookies on shared school devices. School iPads may also be configured with restricted storage settings.

**How to avoid:**
Wrap all localStorage calls in a try/catch and degrade gracefully:

```javascript
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Private mode or storage full — tracker state is session-only
    console.warn('localStorage unavailable:', e);
  }
}
```

Display a non-blocking notice to the user: "Your progress won't be saved in private browsing mode." This is better than a broken tracker.

**Warning signs:**
- Tracker buttons do nothing on iOS Safari
- Browser console shows `SecurityError: DOM Exception 18`
- Works on Chrome/Firefox but fails silently on iPhone

**Phase to address:** RAG Tracker feature phase — required before the tracker feature is considered complete.

---

### Pitfall 7: localStorage Key Collisions If Multiple GitHub Pages Sites Share the Same Origin

**What goes wrong:**
If the maths revision site and the existing French revision site are both hosted under the same GitHub Pages origin (e.g. `username.github.io/maths-revision/` and `username.github.io/french-revision/`), they share the same `localStorage` namespace. Generic key names like `"topic_confidence"` or `"rag_data"` will overwrite each other's data.

**Why it happens:**
`localStorage` is scoped to origin (scheme + host + port), not to URL path. Both sites on `username.github.io` share a single localStorage pool. This is a confirmed GitHub Pages behaviour documented in the community.

**How to avoid:**
Always namespace localStorage keys with a site-specific prefix:

```javascript
// Bad
localStorage.setItem('confidence', JSON.stringify(data));

// Good
localStorage.setItem('maths-revision:confidence', JSON.stringify(data));
```

**Warning signs:**
- RAG data from maths site appears in French site or vice versa
- Tracker state resets unexpectedly after visiting another site on the same domain

**Phase to address:** RAG Tracker feature phase — use namespaced keys from the start; retrofitting is error-prone.

---

### Pitfall 8: PDF Formula Sheets Break on Mobile — `window.print()` Not Supported

**What goes wrong:**
`window.print()` triggers the browser's native print dialog, which on iOS Safari and most Android browsers either does not work, is heavily restricted, or produces unusable output for maths content. Equations may render as blank boxes, cut across page breaks, or fail to load KaTeX fonts.

**Why it happens:**
Print CSS support in mobile browsers is inconsistent. KaTeX fonts must load before print renders, but mobile print dialogs often capture a snapshot before web fonts complete. The CSS `@page` and `page-break-inside` rules have partial mobile support. iOS Safari also disables `window.print()` in certain contexts.

**How to avoid:**
Design PDF formula sheets as print-safe HTML pages with these rules:

```css
@media print {
  .katex-display { page-break-inside: avoid; }
  nav, .tracker, .interactive { display: none; }
}
```

Then guide users to the desktop experience for printing: "For best results, print from a laptop or desktop browser." Alternatively, provide pre-generated PDFs as static assets — a Google Doc exported to PDF avoids all client-side rendering complexity and is more reliable for printing.

**Warning signs:**
- Print preview shows broken/missing equations
- KaTeX fonts appear as blank rectangles in print preview
- Works on Chrome desktop but not on any mobile device

**Phase to address:** Formula Sheets phase — decide early whether to use client-side print CSS or pre-generated PDF assets. The latter is simpler and more reliable.

---

### Pitfall 9: Desmos Embed Iframe Breaks Mobile Touch Scrolling

**What goes wrong:**
Desmos embedded in an `<iframe>` captures touch events on iOS Safari and Android Chrome. When a pupil tries to scroll past a Desmos graph, the touch event is consumed by the iframe and the page does not scroll. The user appears "stuck" behind the embedded graph.

**Why it happens:**
iframes on touch devices intercept pointer and touch events within their bounds. This is a known browser limitation with no clean CSS-only fix. The Desmos API docs acknowledge that mobile layout switches at 450px width but do not address touch event capture.

**How to avoid:**
Keep Desmos embeds contained with a defined minimum tap target area outside the iframe. Add a visible "interact with graph" affordance so pupils know the iframe responds to touch:

```css
.desmos-wrapper {
  position: relative;
  height: 350px;
  touch-action: none; /* prevent propagation to page scroll */
}
```

Alternatively, use Desmos's shareable graph URL with an external link icon rather than an embed, for mobile visitors. Detect viewport width and offer both options.

**Warning signs:**
- Scrolling past a graph on mobile requires swiping outside the iframe bounds
- Pupils report they "can't scroll down" on pages with graphs

**Phase to address:** Interactive Graphs phase — test on a real phone before any graph embeds go into content.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy-paste LaTeX from worked examples without testing on mobile | Fast content authoring | Long equations overflow on phones; discovered only when pupils complain | Never — test on mobile before committing content |
| Use demo Desmos API key forever | No email/wait needed | Key may be disabled or rate-limited without warning after public launch | Development only — swap before launch |
| Store RAG data with generic keys (`"confidence"`, `"progress"`) | Simple to code | Collides with French revision site localStorage | Never — namespace keys from day one |
| Write formula sheets in HTML/CSS only, rely on window.print() | No extra files needed | Inconsistent across browsers; breaks on mobile | Only if desktop-only printing is acceptable and communicated to users |
| Inline all LaTeX as HTML strings without a content authoring system | Simple to start | Each equation edit requires editing raw HTML; teacher cannot maintain independently | Only for MVP; plan for a Markdown-based workflow if site grows beyond 1 person |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| KaTeX CDN | Loading both `katex.min.js` and `auto-render.min.js` without `defer` | Add `defer` to both scripts; trigger `renderMathInElement` in the `onload` callback of `auto-render.min.js` |
| KaTeX + Jekyll | Using Markdown files with `$...$` delimiters via Jekyll's Kramdown processor | Add `.nojekyll` to disable Jekyll entirely, or disable smart quotes in `_config.yml` |
| Desmos API | Using the demo key in production (`dcb31709...`) | Request a production key from `info@desmos.com` before public launch |
| Desmos iframe + CSP | Assuming you can set a CSP `frame-src` header on GitHub Pages | GitHub Pages does not support custom HTTP headers; CSP meta tags exist but `frame-ancestors` is ignored; Desmos loads from `calculator.desmos.com` which GitHub Pages should not block by default |
| localStorage + RAG tracker | Assuming localStorage always works | Wrap all calls in try/catch; test in Safari private mode; namespace all keys |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading KaTeX synchronously (no `defer`) | Page appears blank for 200–500ms while KaTeX JS parses | Add `defer` to all KaTeX script tags | Any page with more than ~10 equations |
| Rendering all KaTeX on page load (no lazy rendering) | Long initial parse time on topic index pages with many equations visible | Use `IntersectionObserver` to defer rendering of off-screen equations | Pages with 50+ equations |
| Embedding multiple Desmos iframes on one page | Slow page load; iframes request separate network connections; mobile browsers may limit concurrent iframes | Limit to 1–2 Desmos embeds per page; use static SVG diagrams from Desmos exports for illustrative graphs that do not need interactivity | Any page with 3+ embeds |
| Loading Google Fonts (Dosis) + KaTeX fonts synchronously | Cumulative font load time delays first contentful paint | Preload Dosis, use `font-display: swap` for KaTeX (`katex-swap.css`) | On slow mobile connections (3G) |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| RAG tracker state lost when pupil clears browser data | Pupils lose all self-assessment history; trust in the tool erodes | Show a "last updated" timestamp; consider exporting state as a URL hash or JSON download as a backup |
| Formula sheets require printing from the site | Pupils on phones cannot print; formula sheet is inaccessible | Provide a PDF download link alongside the print button; pre-generate PDFs as static assets |
| No "back to topics" navigation on individual topic pages | Pupils cannot navigate between topics without hitting the browser back button | Include persistent breadcrumb or level navigation on every topic page |
| Topics do not indicate calculator/non-calculator status prominently | Pupils revise with wrong tools and are caught out in Paper 1 (non-calc Foundation) | Place calculator badge at the top of every topic, not just in the metadata |
| Mobile Desmos graphs require interaction to distinguish from static images | Pupils do not discover graph interactivity | Add a visible label: "Interactive graph — pinch or drag to explore" |

---

## "Looks Done But Isn't" Checklist

- [ ] **KaTeX rendering:** Test with inline `$...$`, display `$$...$$`, and a prime `f'(x)` on the *live GitHub Pages URL* (not just locally). Locally, Jekyll smart-quote conversion does not apply.
- [ ] **Mobile equations:** Open every topic page on an actual iPhone/Android. Confirm no horizontal overflow, no scroll-jacking from iframes.
- [ ] **RAG tracker:** Open in Safari private browsing on iOS. Confirm the UI does not crash and shows a graceful "progress won't be saved" message.
- [ ] **Desmos key:** Confirm the `script src` URL uses the production API key, not `demo` key, before sharing the site URL with pupils.
- [ ] **Formula PDFs:** Print a formula sheet from Chrome desktop and from Safari iOS. Confirm all equations are visible and page breaks are correct.
- [ ] **localStorage namespacing:** Open browser devtools → Application → LocalStorage and verify all keys are prefixed with `maths-revision:` (or equivalent).
- [ ] **Calculator labelling:** Check every Foundation topic page for a visible non-calculator badge. Paper 1 is non-calc — this is a content correctness requirement, not a nice-to-have.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| KaTeX timing issue discovered post-launch | LOW | Add `defer` and `onload` pattern; redeploy in one commit |
| Smart quotes breaking prime notation across all content | MEDIUM | Add `.nojekyll` or fix `_config.yml`; systematic search for `'` in rendered HTML |
| Demo Desmos key disabled | LOW | Request production key (1–2 day turnaround); update one line in base template |
| localStorage key collisions with French site | MEDIUM | Prefix all keys; requires testing all tracker state migration; existing pupil data is lost |
| Mobile overflow on all equations | LOW | Add 3-line CSS rule to base stylesheet; all pages fixed immediately |
| PDF generation broken on mobile | LOW–MEDIUM | Provide static pre-generated PDFs as alternative; removes client-side complexity permanently |
| RAG tracker broken in Safari private mode | LOW | Add try/catch wrapper; 30 lines of code; redeploy |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| KaTeX timing / script load order | Phase 1: Foundation & Setup | Load a test page with `$$...$$` and `f'(x)` on live GitHub Pages URL |
| Dollar sign delimiter order | Phase 1: Foundation & Setup | Test config with inline, display, and empty-space edge cases |
| Jekyll smart quotes / prime notation | Phase 1: Foundation & Setup | Check prime equations on deployed URL; confirm `.nojekyll` present |
| Long equation mobile overflow | Phase 1: Foundation & Setup (base CSS) | Test on real phone with a 20-character-wide equation |
| Desmos production API key | Phase 3 pre-launch / Deployment | Confirm `script src` URL contains production key before sharing with pupils |
| Desmos iframe touch scrolling | Phase 3: Interactive Graphs | Test scroll-past on iPhone Safari before merging any graph pages |
| localStorage Safari private mode crash | Phase 4: RAG Tracker | QA step: open tracker in Safari private mode; confirm no JS errors |
| localStorage key namespacing | Phase 4: RAG Tracker | Inspect localStorage in devtools; all keys must have site-specific prefix |
| PDF mobile print failure | Phase 5: Formula Sheets | Print from mobile; if broken, provide static PDF download as fallback |
| Calculator/non-calc labelling gaps | Phase 2: Content (ongoing) | Content checklist item for every Foundation topic authored |

---

## Sources

- KaTeX Auto-Render documentation (official): https://katex.org/docs/autorender.html
- KaTeX Browser Setup (official): https://katex.org/docs/browser.html
- KaTeX Common Issues (official): https://katex.org/docs/issues.html
- KaTeX Issue #327 — Equation wrapping/overflow: https://github.com/KaTeX/KaTeX/issues/327
- KaTeX Discussion #2942 — Vertical/horizontal overflow: https://github.com/KaTeX/KaTeX/discussions/2942
- KaTeX Issue #3254 — Horizontal scrollbar on display equations: https://github.com/KaTeX/KaTeX/issues/3254
- KaTeX Issue #712 — Single vs double dollar delimiter order: https://github.com/KaTeX/KaTeX/issues/712
- Desmos API v1.11 documentation (official): https://www.desmos.com/api
- GitHub Pages CSP/custom headers discussion: https://github.com/orgs/community/discussions/54257
- GitHub Pages CSP cannot set headers: https://github.com/orgs/community/discussions/49832
- GitHub Pages localStorage collision issue: https://github.com/TomasHubelbauer/github-pages-local-storage
- Safari iOS private browsing localStorage: https://spin.atomicobject.com/ios-private-browsing-localstorage/
- Print CSS and math rendering: https://print-css.rocks/blog/blog_2016-10-05-integrating-mathjax.rst
- window.print() PDF from HTML (DEV Community): https://dev.to/climentea/simple-way-to-generate-pdf-from-html-21mh
- KaTeX on GitHub Pages (community blog): https://blog.claude.nl/posts/using-katex-on-github-pages/

---
*Pitfalls research for: Static CE Maths revision site (GitHub Pages, KaTeX, Desmos)*
*Researched: 2026-02-26*
