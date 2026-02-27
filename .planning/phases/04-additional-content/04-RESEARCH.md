# Phase 4: Additional Content - Research

**Researched:** 2026-02-27
**Domain:** Static HTML content authoring — KaTeX math notation, Desmos API v1.11 embeds, CE 13+ Additional-level maths curriculum
**Confidence:** HIGH (stack verified from codebase; all patterns inherited from Phase 3 which is confirmed complete)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ADD-01 | Pupil can access a worked example for index laws (Additional) | KaTeX exponent/power notation confirmed; CE Additional sub-topics mapped below |
| ADD-02 | Pupil can access a worked example for algebra — expanding and factorising (Additional) | KaTeX quadratic/bracket notation confirmed; CE Additional sub-topics mapped below |
| ADD-03 | Pupil can access a worked example for Pythagoras (Additional) | KaTeX sqrt/Pythagorean theorem notation confirmed; CE Additional sub-topics mapped below |
| GRAPH-04 | Pupil can interact with a Desmos graph on Pythagoras topic page | Desmos API v1.11 embed pattern confirmed (identical to GRAPH-01/02/03 already live) |
</phase_requirements>

---

## Summary

Phase 4 is a pure content authoring phase — the smallest content phase in the project. Three Additional-level topic stubs already exist at `additional/index-laws/`, `additional/expanding-factorising/`, and `additional/pythagoras/`. Each stub has the correct `<head>` block (Dosis font, KaTeX 0.16.33, styles.css) and the site nav. The only work is replacing the placeholder paragraph in each stub with fully authored content.

The Desmos embed on the Pythagoras page (GRAPH-04) follows the identical pattern established across three Core pages (GRAPH-01, GRAPH-02, GRAPH-03). The CSS for `.desmos-wrapper`, `.desmos-scroll-overlay`, and `.desmos-toggle-btn` is already in `assets/css/styles.css`. No new CSS is needed. The Desmos API script tag must be added to the Pythagoras page `<head>` using the same demo key as the Core pages.

The Additional level at CE 13+ covers higher-demand topics that require pupils to have secure Core knowledge. Index laws go beyond the Core powers-and-roots page (which covered square/cube numbers and calculator use). Expanding and factorising goes beyond the Core algebra-basics page (which covered single bracket expansion and linear equations) into double brackets and factorising quadratics. Pythagoras is a geometric theorem new to Additional. All three topics are calculator topics (Paper 2) — no non-calculator badge.

**Primary recommendation:** Author all three Additional topic pages by replacing stub content, following the established template from Phase 2 and Phase 3 exactly. Add the Desmos script to the Pythagoras page head only. Use wrapper ID `desmos-wrapper-pyth` (scoped, avoids ID conflict). No new libraries, no new CSS.

---

## Standard Stack

### Core (already in place — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| KaTeX | 0.16.33 | Math equation rendering | Already in all three Additional stubs via CDN — SRI hashes present |
| Desmos API | v1.11 | Interactive graphing (Pythagoras page only) | Same API version used on three Core pages; demo key `dcb31709b452b1cf9dc26972add0fda6` already established |
| Dosis (Google Fonts) | variable wght 300–800 | Typography | Mandatory per project; already loaded in all Additional stubs |
| Vanilla HTML/CSS/JS | ES2022 | Page structure and scripting | No framework; static site constraint |

### No New Libraries or CSS Required

All Desmos CSS (`.desmos-wrapper`, `.desmos-scroll-overlay`, `.desmos-toggle-btn`) is already in `assets/css/styles.css`. The Phase 4 plan requires zero new stylesheet modifications.

**Desmos script tag (add to `<head>` of Pythagoras page only):**
```html
<!-- Desmos API v1.11 — add ONLY on pages with a graph embed -->
<!-- REPLACE WITH PRODUCTION KEY BEFORE GO-LIVE (request from partnerships@desmos.com) -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
```

---

## Architecture Patterns

### Page Template (locked — inherited from Phases 2 and 3)

All Additional topic pages use the identical structure established in previous phases, adapted for the Additional level:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta, Dosis font links, KaTeX 0.16.33 CDN block, styles.css -->
  <!-- For Pythagoras page only: Desmos API script tag -->
</head>
<body>
  <header class="site-header">
    <!-- inline nav: Additional link has class="hn-link active" -->
  </header>
  <main class="main-content">
    <p class="breadcrumb">
      <a href="/MathsRevisionSite/">Home</a> &rsaquo;
      <a href="/MathsRevisionSite/additional/">Additional</a> &rsaquo;
      [Topic Name]
    </p>
    <span class="level-badge additional">Additional</span>
    <h1 class="page-title">[Topic Name]</h1>
    <!-- NO non-calculator badge — Additional = Calculator (Paper 2) -->
    <h2>Key Facts</h2>
    <ul><!-- bullet points with inline KaTeX --></ul>
    <h2>Worked Example 1: [Scenario]</h2>
    <ol><!-- numbered steps with display KaTeX --></ol>
    <p><strong>Answer: ...</strong></p>
    <h2>Worked Example 2: [Scenario]</h2>
    <ol><!-- numbered steps --></ol>
    <p><strong>Answer: ...</strong></p>
    <!-- Pythagoras page only: Desmos embed section after worked examples -->
  </main>
  <footer>
    <p>Mowden Hall School &middot; Year 8 CE Maths Revision</p>
  </footer>
</body>
</html>
```

**Key differences from Core and Foundation pages:**
- Level badge is `<span class="level-badge additional">Additional</span>` (purple, not blue or amber)
- Breadcrumb links to `/MathsRevisionSite/additional/` not `/MathsRevisionSite/core/`
- Nav: `Additional` link gets `class="hn-link active"`, not `Core`
- NO non-calculator badge — Additional = Calculator (Paper 2)
- Stubs already exist: REPLACE content, do not create new files

### Pattern: Desmos Embed (Pythagoras Page Only — GRAPH-04)

This pattern is identical to the three Core Desmos pages. The only difference is the scoped wrapper ID.

**Wrapper ID convention (from Phase 3 decisions):** Each Desmos page uses a scoped `id` on the wrapper div to avoid ID conflicts if pages are ever loaded in the same session. Use `desmos-wrapper-pyth` for the Pythagoras page.

```html
<!-- Source: Established in 03-02-PLAN.md, confirmed in transformations and straight-line-graphs pages -->

<!-- In <head>, after KaTeX scripts: -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

<!-- In <main>, after worked examples: -->
<h2>Explore with Desmos</h2>
<p>Use the graph below to explore Pythagoras' Theorem. The right-angled triangle has legs $a$ and $b$ and hypotenuse $c$. Adjust the sliders to see how changing the side lengths affects $c = \sqrt{a^2 + b^2}$.</p>

<!-- Mobile toggle button — hidden on desktop via CSS -->
<button class="desmos-toggle-btn" onclick="toggleDesmosInteraction(this)" aria-label="Toggle graph interaction">
  Tap to interact with graph
</button>

<div class="desmos-wrapper" id="desmos-wrapper-pyth">
  <div id="desmos-calculator"></div>
  <!-- Scroll-fix overlay: intercepts touch on mobile, lets page scroll through -->
  <div class="desmos-scroll-overlay" aria-hidden="true"></div>
</div>

<script>
  var elt = document.getElementById('desmos-calculator');
  var calculator = Desmos.GraphingCalculator(elt, {
    expressions: true,   // show expression panel so pupils can see and drag a/b sliders
    settingsMenu: false,
    zoomButtons: true,
    lockViewport: false
  });
  // Pythagoras theorem: c^2 = a^2 + b^2, show the right triangle and hypotenuse
  calculator.setExpression({ id: 'slider_a', latex: 'a = 3', sliderBounds: { min: 1, max: 10, step: 1 } });
  calculator.setExpression({ id: 'slider_b', latex: 'b = 4', sliderBounds: { min: 1, max: 10, step: 1 } });
  calculator.setExpression({ id: 'hyp', latex: 'c = \\sqrt{a^2 + b^2}', color: '#7c3aed' });
  // Triangle polygon: right angle at origin, a along x-axis, b along y-axis
  calculator.setExpression({ id: 'triangle', latex: 'polygon((0,0),(a,0),(0,b))', color: '#7c3aed' });

  function toggleDesmosInteraction(btn) {
    var wrapper = document.getElementById('desmos-wrapper-pyth');
    wrapper.classList.toggle('interactive');
    btn.textContent = wrapper.classList.contains('interactive')
      ? 'Scroll page (tap to switch)'
      : 'Tap to interact with graph';
  }
</script>
```

**Note on `expressions: true`:** The Pythagoras Desmos embed benefits from showing the expression panel (same decision as SLG page, 03-04 decision) so pupils can see the $a$, $b$, and $c$ slider values and understand the relationship $c = \sqrt{a^2 + b^2}$.

**Note on colour:** Use `#7c3aed` (the `--additional-accent` purple from `styles.css`) for the triangle and hypotenuse. This is consistent with the Additional level badge colour and reinforces the visual theming.

### Pattern: KaTeX Notation for Additional Topics

Use `$...$` for inline equations, `$$...$$` for display equations. Delimiter order and config are already set in all three stubs.

**Confirmed KaTeX commands for Additional topics:**

| Topic | Key KaTeX Commands | Example |
|-------|-------------------|---------|
| Index Laws | `^`, `\times`, `\div`, `^{m+n}`, `^{m-n}`, `^{mn}` | `$a^m \times a^n = a^{m+n}$` |
| Expanding/Factorising | `^2`, `(x+a)(x+b)`, `\pm` | `$(x+3)(x-2) = x^2 + x - 6$` |
| Pythagoras | `^2`, `\sqrt{}`, `a^2 + b^2 = c^2` | `$$a^2 + b^2 = c^2$$` |

---

## CE 13+ Additional Topic Content Map

All three Additional topics are **Calculator (Paper 2)**. Do not add non-calculator badge to any Additional page.

### ADD-01: Index Laws

**CE scope:** Pupils should know and apply the laws of indices for multiplication, division, and powers of powers. Zero index and negative indices may appear at Additional level.

**Key facts to cover:**
- Multiplication law: $a^m \times a^n = a^{m+n}$ (bases must be the same)
- Division law: $a^m \div a^n = a^{m-n}$
- Power of a power: $(a^m)^n = a^{mn}$
- Zero index: $a^0 = 1$ for any non-zero $a$
- Negative index: $a^{-n} = \dfrac{1}{a^n}$

**Worked Example 1:** Simplify $5^3 \times 5^4$. Then simplify $\dfrac{2^7}{2^3}$.
- Apply multiplication law: $5^3 \times 5^4 = 5^{3+4} = 5^7$
- Apply division law: $\dfrac{2^7}{2^3} = 2^{7-3} = 2^4 = 16$

**Worked Example 2:** Simplify $(3^2)^4$. Evaluate $7^0$ and write $3^{-2}$ as a fraction.
- Power of a power: $(3^2)^4 = 3^{2 \times 4} = 3^8$
- Zero index: $7^0 = 1$
- Negative index: $3^{-2} = \dfrac{1}{3^2} = \dfrac{1}{9}$

**KaTeX needed:** `^`, `\times`, `\div`, `\dfrac`, display equations for the laws.

---

### ADD-02: Expanding and Factorising

**CE scope:** Expanding double brackets (FOIL/grid method), recognising and factorising simple quadratics of the form $x^2 + bx + c$.

**Key facts to cover:**
- Expanding double brackets: $(x + a)(x + b) = x^2 + (a+b)x + ab$
- FOIL: First, Outer, Inner, Last (or use a grid)
- Factorising a quadratic $x^2 + bx + c$: find two numbers that multiply to $c$ and add to $b$
- Difference of two squares: $a^2 - b^2 = (a+b)(a-b)$

**Worked Example 1:** Expand $(x + 3)(x - 2)$.
- First: $x \times x = x^2$
- Outer: $x \times (-2) = -2x$
- Inner: $3 \times x = 3x$
- Last: $3 \times (-2) = -6$
- Collect: $x^2 - 2x + 3x - 6 = x^2 + x - 6$

**Worked Example 2:** Factorise $x^2 + 5x + 6$.
- Find two numbers that multiply to $6$ and add to $5$: these are $2$ and $3$
- Result: $(x + 2)(x + 3)$
- Check by expanding: $(x+2)(x+3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$ ✓

**KaTeX needed:** `^2`, `\times`, `(x+a)(x+b)`, display equations for expansions.

---

### ADD-03: Pythagoras (with Desmos — GRAPH-04)

**CE scope:** Applying Pythagoras' Theorem to find missing sides in right-angled triangles; identifying if a triangle is right-angled; problem-solving in context (distances, diagonal of rectangle, etc.).

**Key facts to cover:**
- Pythagoras' Theorem: In a right-angled triangle, $a^2 + b^2 = c^2$ where $c$ is the hypotenuse (longest side, opposite the right angle)
- To find the hypotenuse: $c = \sqrt{a^2 + b^2}$
- To find a shorter side: $a = \sqrt{c^2 - b^2}$
- The hypotenuse is always opposite the right angle — identify it correctly first
- Classic Pythagorean triples: 3-4-5, 5-12-13, 8-15-17

**Worked Example 1:** Find the hypotenuse of a right-angled triangle with legs 6 cm and 8 cm.
- Identify: $a = 6$, $b = 8$, find $c$
- Apply theorem: $c^2 = 6^2 + 8^2 = 36 + 64 = 100$
- Solve: $c = \sqrt{100} = 10$ cm

**Worked Example 2:** A right-angled triangle has a hypotenuse of 13 cm and one leg of 5 cm. Find the other leg.
- Apply theorem rearranged: $a^2 = c^2 - b^2 = 13^2 - 5^2 = 169 - 25 = 144$
- Solve: $a = \sqrt{144} = 12$ cm

**Desmos setup:** Interactive right-angled triangle with sliders for $a$ and $b$. Expression panel visible so pupils can see the live calculation of $c = \sqrt{a^2 + b^2}$. Default values: $a = 3$, $b = 4$ (the classic 3-4-5 triple).

**KaTeX needed:** `^2`, `\sqrt{}`, `a^2 + b^2 = c^2` display equation, `\sqrt{c^2 - b^2}` for rearranged form.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Math equation rendering | Raw HTML for fractions/exponents | KaTeX 0.16.33 (already wired) | Handles superscripts, square roots, fractions correctly across browsers |
| Interactive Pythagoras graph | SVG triangles with JS drag | Desmos API v1.11 | Sliders, polygon rendering, label display built in |
| Degree/special symbol rendering | HTML entities mixed with math | KaTeX `^{\circ}` inside `$...$` | Consistent sizing with surrounding math |
| Mobile scroll fix on Desmos | New JS touch event handling | Existing CSS overlay toggle pattern (already in styles.css) | Already tested on Core pages; no additional code needed |

**Key insight:** Every technical component needed for Phase 4 already exists in the codebase. This phase is purely content authoring. Any attempt to add new libraries, new CSS patterns, or new JS abstractions would be scope creep.

---

## Common Pitfalls

### Pitfall 1: Wrong Active Nav Link
**What goes wrong:** The nav `active` class is applied to `Core` instead of `Additional`.
**Why it happens:** Copy-paste from a Core page stub without updating the nav.
**How to avoid:** In all three Additional pages, the nav must have `class="hn-link active"` on the `Additional` link, NOT the `Core` link. The stubs already have this correct — do not change the nav structure, only replace the main content placeholder.
**Warning signs:** The gold highlighted nav link shows "Core" instead of "Additional" when viewing an Additional topic page.

### Pitfall 2: Adding Non-Calculator Badge
**What goes wrong:** An Additional topic page gets the green "Non-calculator — Paper 1" badge.
**Why it happens:** Confusion between Foundation (non-calc) and Additional (calc) levels.
**How to avoid:** Never include the non-calculator badge HTML on any Additional page. Additional = Calculator (Paper 2).
**Warning signs:** Any green badge visible on an Additional page.

### Pitfall 3: Desmos Script on All Three Pages
**What goes wrong:** The Desmos API `<script>` tag is added to all three Additional topic pages.
**Why it happens:** Adding the script to all stubs for convenience.
**How to avoid:** Add the Desmos script tag ONLY to `additional/pythagoras/index.html`. Index Laws and Expanding/Factorising do NOT require Desmos.
**Warning signs:** Network tab shows `calculator.js` loading on the index-laws or expanding-factorising pages.

### Pitfall 4: Desmos Wrapper ID Collision
**What goes wrong:** The Pythagoras page uses `id="desmos-wrapper-coords"` or another already-used wrapper ID.
**Why it happens:** Copying Desmos markup from a Core page without updating the scoped ID.
**How to avoid:** Use `id="desmos-wrapper-pyth"` on the wrapper div and in the `toggleDesmosInteraction` function. The toggle function must reference the correct ID: `document.getElementById('desmos-wrapper-pyth')`.
**Warning signs:** Toggle button does not work on the Pythagoras page; `desmos-wrapper` ID is shared with another page's element.

### Pitfall 5: Index Laws — Wrong Base Assumption
**What goes wrong:** Worked examples apply index laws to expressions with different bases (e.g., $2^3 \times 3^4$) where the laws don't directly apply.
**Why it happens:** Pupils (and content authors) sometimes apply the multiplication law across different bases.
**How to avoid:** Worked examples must clearly state "bases must be the same". Use same-base examples only: $5^3 \times 5^4$ not $5^3 \times 3^4$.
**Warning signs:** Any index law example combining different bases under a single index law.

### Pitfall 6: Quadratic Factorising Sign Errors
**What goes wrong:** Factorising $x^2 - 5x + 6$ and writing $(x+2)(x+3)$ instead of $(x-2)(x-3)$.
**Why it happens:** Not carefully tracking signs when finding factor pairs.
**How to avoid:** In Worked Example 2 for expanding/factorising, always verify the answer by expanding and checking it matches the original quadratic. Show the check step explicitly.
**Warning signs:** Expanding the factorised answer does not match the original quadratic.

### Pitfall 7: Pythagoras — Not Identifying Hypotenuse Correctly
**What goes wrong:** Treating a leg as the hypotenuse, leading to $a^2 = b^2 - c^2$ (subtracting from a smaller value, giving a negative under the square root).
**Why it happens:** The hypotenuse rule ("opposite the right angle, longest side") is not emphasised.
**How to avoid:** The Key Facts section must explicitly state: "The hypotenuse is the side OPPOSITE the right angle — always the longest side." Both worked examples should call out which side is the hypotenuse before applying the theorem.
**Warning signs:** A worked example that subtracts from a side shorter than the one labeled as hypotenuse.

---

## Code Examples

### Additional Page Opening (no Desmos — Index Laws and Expanding/Factorising)

```html
<!-- Source: Established pattern from Phase 2/3 — verified against existing additional/ stubs -->
<main class="main-content">
  <p class="breadcrumb">
    <a href="/MathsRevisionSite/">Home</a> &rsaquo;
    <a href="/MathsRevisionSite/additional/">Additional</a> &rsaquo;
    [Topic Name]
  </p>

  <span class="level-badge additional">Additional</span>
  <h1 class="page-title">[Topic Name]</h1>
  <!-- NO non-calc badge — Additional = calculator paper -->

  <h2>Key Facts</h2>
  <ul>
    <li><strong>[Fact]:</strong> Explanation with inline KaTeX $a^m \times a^n = a^{m+n}$ as needed.</li>
  </ul>

  <h2>Worked Example 1: [Scenario]</h2>
  <p>[Question statement]</p>
  <ol>
    <li>Step 1 with display KaTeX:
      $$5^3 \times 5^4 = 5^{3+4} = 5^7$$
    </li>
    <li>Step 2...</li>
  </ol>
  <p><strong>Answer: [final answer]</strong></p>
</main>
```

### Index Laws Key Formulae (display equations)

```html
<!-- Source: KaTeX 0.16.33 — verified exponent notation -->
<ul>
  <li><strong>Multiplication:</strong> $$a^m \times a^n = a^{m+n}$$</li>
  <li><strong>Division:</strong> $$a^m \div a^n = a^{m-n}$$</li>
  <li><strong>Power of a power:</strong> $$(a^m)^n = a^{mn}$$</li>
  <li><strong>Zero index:</strong> $a^0 = 1$ (for any non-zero $a$)</li>
  <li><strong>Negative index:</strong> $$a^{-n} = \frac{1}{a^n}$$</li>
</ul>
```

### Quadratic Expansion (FOIL steps)

```html
<!-- Source: Established pattern from Core algebra-basics page -->
<ol>
  <li><strong>First:</strong> $x \times x = x^2$</li>
  <li><strong>Outer:</strong> $x \times (-2) = -2x$</li>
  <li><strong>Inner:</strong> $3 \times x = 3x$</li>
  <li><strong>Last:</strong> $3 \times (-2) = -6$</li>
  <li>Collect like terms:
    $$x^2 - 2x + 3x - 6 = x^2 + x - 6$$
  </li>
</ol>
```

### Pythagoras Theorem — Finding Hypotenuse

```html
<!-- Source: KaTeX 0.16.33 — standard Pythagorean notation -->
<ol>
  <li>Identify the hypotenuse $c$ (the longest side, opposite the right angle).</li>
  <li>Apply Pythagoras' Theorem:
    $$c^2 = a^2 + b^2$$
  </li>
  <li>Substitute the known values:
    $$c^2 = 6^2 + 8^2 = 36 + 64 = 100$$
  </li>
  <li>Take the square root:
    $$c = \sqrt{100} = 10 \text{ cm}$$
  </li>
</ol>
```

### Pythagoras — Finding a Shorter Side

```html
<!-- Rearranged form — must show the rearrangement step explicitly -->
<ol>
  <li>Rearrange to find the missing leg $a$:
    $$a^2 = c^2 - b^2$$
  </li>
  <li>Substitute:
    $$a^2 = 13^2 - 5^2 = 169 - 25 = 144$$
  </li>
  <li>Take the square root:
    $$a = \sqrt{144} = 12 \text{ cm}$$
  </li>
</ol>
```

### Pythagoras Desmos Setup

```javascript
// Source: Established pattern from 03-02-PLAN.md / Core graph pages — scoped ID
var elt = document.getElementById('desmos-calculator');
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: true,    // show panel — pupils see a, b, c values updating live
  settingsMenu: false,
  zoomButtons: true,
  lockViewport: false
});
// Sliders for legs a and b, starting at the 3-4-5 triple
calculator.setExpression({ id: 'slider_a', latex: 'a = 3', sliderBounds: { min: 1, max: 10, step: 1 } });
calculator.setExpression({ id: 'slider_b', latex: 'b = 4', sliderBounds: { min: 1, max: 10, step: 1 } });
// Live hypotenuse calculation
calculator.setExpression({ id: 'hyp', latex: 'c = \\sqrt{a^2 + b^2}', color: '#7c3aed' });
// Right-angled triangle: right angle at origin, a along x-axis, b along y-axis
calculator.setExpression({ id: 'triangle', latex: 'polygon((0,0),(a,0),(0,b))', color: '#7c3aed' });

function toggleDesmosInteraction(btn) {
  var wrapper = document.getElementById('desmos-wrapper-pyth');
  wrapper.classList.toggle('interactive');
  btn.textContent = wrapper.classList.contains('interactive')
    ? 'Scroll page (tap to switch)'
    : 'Tap to interact with graph';
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Shared nav via `fetch()` | Inline nav in every HTML file | Phase 1 (01-01) | Safari CORS bug — must copy nav per-file |
| `katex.min.css` | `katex-swap.min.css` | Phase 1 (01-02) | Prevents FOIT on slow school networks |
| `DOMContentLoaded` for KaTeX | `onload` callback on auto-render script | Phase 1 (01-02) | Guarantees katex.min.js parsed first |
| Relative asset paths | Root-relative paths with `/MathsRevisionSite/` prefix | Phase 1 (01-03) | GitHub Pages project site requires this prefix |
| Desmos default ID per page | Scoped wrapper IDs (`desmos-wrapper-trans`, `desmos-wrapper-slg`) | Phase 3 (03-03, 03-04) | Avoids ID conflicts; use `desmos-wrapper-pyth` for Phase 4 |

**No deprecated approaches in this phase.** The established stack is current and correct.

---

## Open Questions

1. **Desmos production API key**
   - What we know: Demo key `dcb31709b452b1cf9dc26972add0fda6` is in use on all Core graph pages. STATE.md flags this as an open blocker.
   - What's unclear: Whether production key has been requested yet.
   - Recommendation: Proceed with demo key. The REPLACE comment is already established — include it on the Pythagoras page head comment. Request from `partnerships@desmos.com` before go-live.

2. **Difference of two squares in ADD-02**
   - What we know: $a^2 - b^2 = (a+b)(a-b)$ is a standard Additional-level factorising pattern.
   - What's unclear: Whether the CE 13+ spec for Additional requires difference of two squares or if it is optional enrichment.
   - Recommendation: Include it as a Key Fact on the expanding/factorising page (one line, with example). It's concise and valuable for pupils pushing for the top marks. Do not add a full worked example for it — the two main worked examples should focus on standard double bracket expansion and factorising $x^2 + bx + c$.

3. **Desmos triangle orientation for Pythagoras**
   - What we know: `polygon((0,0),(a,0),(0,b))` places the right angle at the origin with legs along the axes. This is the clearest visual for CE pupils.
   - What's unclear: Whether the default viewport will show the triangle clearly for the starting values $a=3, b=4$.
   - Recommendation: The default Desmos viewport shows roughly $-10$ to $10$ on both axes, which easily accommodates a 3-4-5 triangle. No need to set a custom viewport. Test visually before plan completion.

---

## Sources

### Primary (HIGH confidence)
- Project codebase (`/Users/josh/projects/maths-revision/`) — confirmed all three stub pages, styles.css Desmos block, Core page Desmos patterns from direct file reads
- Phase 3 RESEARCH.md (`.planning/phases/03-core-content/03-RESEARCH.md`) — Desmos pattern, KaTeX notation table, established decisions
- STATE.md (`.planning/STATE.md`) — all locked decisions affecting Phase 4 (scoped Desmos IDs, wrapper IDs, `expressions: true` for slider pages, production key status)
- KaTeX 0.16.33 docs (katex.org) — exponent, root, and fraction commands confirmed via Phase 3 research (same library version, same commands)

### Secondary (MEDIUM confidence)
- CE 13+ Additional topic scope — inferred from ISEB-linked sources (owltutors.co.uk/advice/13-plus/maths/syllabus/) cross-referenced with Phase 3 research. Additional level confirmed as covering index laws, expanding/factorising quadratics, and Pythagoras at CE 13+.
- Desmos `polygon()` syntax for triangle rendering — documented pattern used in `transformations/index.html` (Phase 3, confirmed in codebase)

### Tertiary (LOW confidence)
- Difference of two squares as Additional-level content — consistent with GCSE Foundation and CE Additional scoping; not directly confirmed in official ISEB spec PDF.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already wired in stubs; no new dependencies
- Architecture (page template): HIGH — identical to Phase 2/3 template; stubs already correctly structured
- Desmos embed pattern: HIGH — directly lifted from working Core pages in codebase
- CE Additional topic content: MEDIUM — from ISEB-linked syllabus sources; topic scope is standard for CE 13+ Additional
- Common pitfalls: HIGH for template/nav pitfalls (verified against existing pages); MEDIUM for content-specific pitfalls (index law base rule, sign errors)

**Research date:** 2026-02-27
**Valid until:** 2026-03-28 (KaTeX and Desmos stable APIs; CE syllabus changes slowly)
