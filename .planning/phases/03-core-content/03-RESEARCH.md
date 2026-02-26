# Phase 3: Core Content - Research

**Researched:** 2026-02-26
**Domain:** Static HTML content authoring — KaTeX math notation, Desmos API v1.11 embeds, CE 13+ maths curriculum
**Confidence:** HIGH (stack verified; CE topic content from official ISEB-linked syllabus sources)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CORE-01 | Pupil can access a worked example for ratio (Core) | KaTeX fraction/ratio notation confirmed; CE sub-topics mapped |
| CORE-02 | Pupil can access a worked example for percentages (Core) | KaTeX percentage notation confirmed; CE sub-topics mapped |
| CORE-03 | Pupil can access a worked example for algebra basics (Core) | KaTeX algebra notation confirmed; CE sub-topics mapped |
| CORE-04 | Pupil can access a worked example for shape (Core) | KaTeX area/perimeter formulae confirmed; CE sub-topics mapped |
| CORE-05 | Pupil can access a worked example for averages at Core level (Core) | Established pattern from Phase 2 foundation/averages; Core extends to grouped data |
| CORE-06 | Pupil can access a worked example for angles including parallel lines (Core) | KaTeX angle notation confirmed; CE sub-topics mapped |
| CORE-07 | Pupil can access a worked example for probability (Core) | KaTeX P(A) notation confirmed; CE sub-topics mapped |
| CORE-08 | Pupil can access a worked example for coordinates and graphs (Core) | Desmos embed pattern confirmed; KaTeX coordinate notation confirmed |
| CORE-09 | Pupil can access a worked example for transformations (Core) | Desmos embed pattern confirmed; CE transformation sub-topics mapped |
| CORE-10 | Pupil can access a worked example for volume and surface area (Core) | KaTeX volume formulae confirmed; CE sub-topics mapped |
| CORE-11 | Pupil can access a worked example for sequences and nth term (Core) | KaTeX subscript/nth term notation confirmed; CE sub-topics mapped |
| CORE-12 | Pupil can access a worked example for straight line graphs / y=mx+c (Core) | Desmos embed pattern confirmed; KaTeX linear equation notation confirmed |
| CORE-13 | Pupil can access a worked example for speed, distance and time (Core) | KaTeX triangle formula layout confirmed; CE sub-topics mapped |
| CORE-14 | Pupil can access a worked example for powers and roots (Core) | KaTeX power/root notation confirmed; CE sub-topics mapped |
| CORE-15 | Pupil can access a worked example for charts and data interpretation (Core) | KaTeX statistics notation confirmed; CE sub-topics mapped |
| GRAPH-01 | Pupil can interact with a Desmos graph on coordinates/graphs topic page | Desmos API v1.11 embed pattern confirmed; options documented |
| GRAPH-02 | Pupil can interact with a Desmos graph on straight line graphs topic page | Desmos API v1.11 embed pattern confirmed; setExpression() for y=mx+c |
| GRAPH-03 | Pupil can interact with a Desmos graph on transformations topic page | Desmos API v1.11 embed pattern confirmed; transformation expressions documented |
| GRAPH-05 | Desmos embeds are scroll-friendly on mobile (do not trap page scroll) | Mobile scroll trap problem confirmed; CSS + JS workaround pattern documented |
</phase_requirements>

---

## Summary

Phase 3 is primarily a content authoring phase. The technical infrastructure (KaTeX, CSS, HTML template) is fully operational from Phases 1 and 2. The two new technical elements are: (1) Desmos API v1.11 embeds on three topic pages, and (2) authoring 10 entirely new topic pages from the CE 13+ spec (the other 5 topics have existing slide content to convert). No new libraries, no build changes.

The Desmos embed pattern is straightforward: include one script tag with the API key, create a sized `<div>`, call `Desmos.GraphingCalculator(elt, options)`, and use `setExpression()` to pre-load the relevant graph. The mobile scroll trap (GRAPH-05) is the primary technical risk — when a pupil touches the Desmos div to scroll past it on mobile, the browser hands control to the Desmos pan gesture handler instead of scrolling the page. The established workaround is a transparent CSS overlay div that intercepts touch-start and conditionally delegates to the page scroller. This pattern is documented in the Code Examples section below.

The CE 13+ Core syllabus is well-defined: 15 topics covering KS3 Number, Algebra, Geometry, and Statistics. All are Calculator (Paper 2) topics. The worked example content has been mapped topic-by-topic in the Architecture Patterns section below, with specific KaTeX notation for each topic confirmed against official KaTeX docs.

**Primary recommendation:** Author all 15 Core topics against the page template established in Phase 2. Add Desmos embeds to three graph pages using the overlay scroll-fix pattern. Keep expressions panel hidden (`expressions: false`) for clarity on topic pages.

---

## Standard Stack

### Core (already in place — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| KaTeX | 0.16.33 | Math equation rendering | Already wired in all 15 Core stubs via CDN |
| Desmos API | v1.11 | Interactive graphing | Official educational API; demo key `dcb31709b452b1cf9dc26972add0fda6` confirmed |
| Dosis (Google Fonts) | variable wght 200–800 | Typography | Mandatory per project brief |
| Vanilla HTML/CSS/JS | ES2022 | Page structure and scripting | No framework; static site constraint |

### No New Libraries Required

Phase 3 introduces no new CDN dependencies beyond Desmos (which is already planned). KaTeX, Google Fonts, and styles.css are already present in every stub.

**Desmos script tag (add to `<head>` of graph topic pages only):**
```html
<!-- Desmos API v1.11 — add ONLY on pages with a graph embed -->
<!-- Dev: demo key. Production: replace with key from desmos.com/my-api -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
```

**Production key:** Request from `partnerships@desmos.com` — free for educational non-commercial use, email confirmation required. Do not wait until go-live.

---

## Architecture Patterns

### Page Template (inherited from Phase 2 — locked)

All Core topic pages use the exact same structure established in Phase 2:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta, Dosis font links, KaTeX 0.16.33 CDN block, styles.css -->
</head>
<body>
  <header class="site-header"><!-- inline nav, core link active --></header>
  <main class="main-content">
    <p class="breadcrumb">Home › Core › [Topic Name]</p>
    <span class="level-badge core">Core</span>
    <h1 class="page-title">[Topic Name]</h1>
    <!-- NO non-calc badge — Core = Calculator (Paper 2) -->
    <h2>Key Facts</h2>
    <ul><!-- bullet points with inline KaTeX --></ul>
    <h2>Worked Example 1: [Scenario]</h2>
    <ol><!-- numbered steps with display KaTeX --></ol>
    <p><strong>Answer: ...</strong></p>
    <h2>Worked Example 2: [Scenario]</h2>
    <ol><!-- numbered steps --></ol>
    <p><strong>Answer: ...</strong></p>
  </main>
  <footer><!-- Mowden Hall footer --></footer>
</body>
</html>
```

**Key difference from Foundation:** No non-calculator badge. Core = Calculator topics (Paper 2). Do not add the green "Non-calculator — Paper 1" badge.

### Pattern: Desmos Embed (Graph Topic Pages Only)

**What:** A Desmos GraphingCalculator embedded in a `<div>` on three topic pages.
**When to use:** `core/coordinates-graphs/`, `core/straight-line-graphs/`, `core/transformations/` only.

**Where in page:** After the final Worked Example, before `</main>`. Use a h2 heading: `<h2>Explore with Desmos</h2>`.

```html
<!-- Source: Desmos API v1.11 official docs — desmos.com/api/v1.11/docs/index.html -->

<!-- In <head>, after KaTeX scripts: -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

<!-- In <main>, after worked examples: -->
<h2>Explore with Desmos</h2>
<div class="desmos-wrapper">
  <div id="desmos-calculator"></div>
  <!-- Scroll-fix overlay: intercepts touch on the graph div, passes scroll to page -->
  <div class="desmos-scroll-overlay" aria-hidden="true"></div>
</div>

<script>
  var elt = document.getElementById('desmos-calculator');
  var calculator = Desmos.GraphingCalculator(elt, {
    expressions: false,   // hide expression list for cleaner pupil-facing UI
    settingsMenu: false,  // hide settings wrench
    zoomButtons: true,
    lockViewport: false   // pupils can pan/zoom to explore
  });
  // Pre-load expressions appropriate to topic (see topic-by-topic section below)
  calculator.setExpression({ id: 'graph1', latex: 'y = 2x + 1' });
</script>
```

**CSS for Desmos wrapper and mobile scroll fix:**
```css
/* Add to styles.css — Desmos embed block */
.desmos-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

#desmos-calculator {
  width: 100%;
  height: 100%;
}

/* Mobile scroll-fix overlay — transparent div sits on top of Desmos.
   On touch devices, touching the graph triggers the overlay's touchstart,
   which delegates to a passive scroll on the parent page rather than
   letting Desmos capture the touch for panning.
   Users can still interact with Desmos by tapping a "Use graph" button
   that toggles pointer-events off on the overlay. */
.desmos-scroll-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: transparent;
  /* On desktop, pass pointer events through to Desmos */
  pointer-events: none;
}

@media (max-width: 900px) {
  /* On mobile, overlay is active by default to prevent scroll trap.
     Toggle with JS button below. */
  .desmos-scroll-overlay {
    pointer-events: auto;
    touch-action: pan-y;
  }

  .desmos-wrapper.interactive .desmos-scroll-overlay {
    pointer-events: none; /* disabled when user activates graph mode */
  }

  .desmos-wrapper {
    height: 350px;
  }
}
```

**"Use graph" toggle button (mobile UX):**
```html
<!-- Add this button directly above .desmos-wrapper on mobile -->
<button class="desmos-toggle-btn" onclick="toggleDesmosInteraction(this)" aria-label="Toggle graph interaction">
  Tap to interact with graph
</button>

<script>
function toggleDesmosInteraction(btn) {
  var wrapper = btn.nextElementSibling; // .desmos-wrapper
  wrapper.classList.toggle('interactive');
  btn.textContent = wrapper.classList.contains('interactive')
    ? 'Scroll page (tap to switch)'
    : 'Tap to interact with graph';
}
</script>
```

**Alternative simpler approach (if toggle adds too much complexity):** Set a fixed height on the Desmos wrapper that leaves obvious page content above and below the graph, so pupils naturally understand they can scroll past it. Do not use `lockViewport: true` — that would prevent pupils from exploring.

### Pattern: KaTeX Notation Per Topic

Use `$...$` for inline equations, `$$...$$` for display (block) equations. The `$$` before `$` delimiter order is already set in the KaTeX config on every page — do not change it.

**Confirmed KaTeX commands for Core topics (HIGH confidence — verified against katex.org/docs/supported.html):**

| Topic | Key KaTeX Commands | Example |
|-------|-------------------|---------|
| Ratio | `\frac`, `:` literal | `$3:4$`, `$\frac{3}{7}$` |
| Percentages | `\%`, `\frac`, `\times` | `$25\% = \frac{25}{100}$` |
| Algebra basics | `^`, `_`, `\times`, `\div`, variable letters | `$2x + 3 = 11$` |
| Shape (area/perimeter) | `\pi`, `r^2`, `\times`, `\frac{1}{2}` | `$$A = \pi r^2$$` |
| Averages (Core) | `\frac`, `\text{}`, `\sum` | `$$\bar{x} = \frac{\sum x}{n}$$` |
| Angles | `\angle`, `\degree`, `\circ`, `^{\circ}` | `$\angle ABC = 65^{\circ}$` |
| Probability | `\text{P}`, fractions | `$\text{P}(A) = \frac{3}{8}$` |
| Coordinates/Graphs | `(x, y)` literal | `$(3, -2)$` |
| Transformations | `\begin{pmatrix}`, `\vec{}` | `$\begin{pmatrix} 3 \\ -2 \end{pmatrix}$` |
| Volume/Surface Area | `^3`, `^2`, `\pi`, `\frac{4}{3}` | `$$V = l \times w \times h$$` |
| Sequences/nth term | `_n`, `^{th}`, `U_n =` | `$U_n = 3n + 2$` |
| Straight line graphs | `y = mx + c` literal | `$y = 2x - 1$` |
| Speed/Distance/Time | `\text{Speed} = \frac{\text{Distance}}{\text{Time}}` | Use display equation |
| Powers and roots | `^2`, `^3`, `\sqrt{}`, `\sqrt[3]{}` | `$\sqrt{49} = 7$`, `$2^5 = 32$` |
| Charts/Data | `\frac`, `\%`, `\times 360` | `$\frac{f}{n} \times 360^{\circ}$` |

**Note on degree symbol:** Use `^{\circ}` not `\degree` — both are supported in KaTeX 0.16.33 but `^{\circ}` is more universally recognised in KaTeX source. Either works but be consistent.

**Note on transformation vectors:** KaTeX supports `\begin{pmatrix}a \\ b\end{pmatrix}` for column vectors. This renders cleanly for translation vectors.

---

## CE 13+ Core Topic Content Map

This section defines what each worked example should cover. Sourced from ISEB CE 13+ syllabus (owltutors.co.uk/advice/13-plus/maths/syllabus/ — MEDIUM confidence, aligns with official ISEB spec structure).

All 15 Core topics are **Calculator (Paper 2)**. Do not add non-calculator badge to any Core page.

### CORE-01: Ratio
**Key facts to cover:** Simplifying ratios, ratio notation (a:b), sharing in a ratio, finding one part given the other, ratio and fractions.
**Worked Example 1:** Share £240 in the ratio 3:5. (Clear: total parts = 8, each part = £30, so 3×30=£90 and 5×30=£150.)
**Worked Example 2:** Two quantities are in ratio 2:7. If the smaller is 14, find the larger. (Unitary method.)
**KaTeX needed:** `\frac`, colon notation, multiplication.

### CORE-02: Percentages
**Key facts to cover:** Percentage as fraction/decimal, finding a percentage of an amount, percentage increase/decrease, finding the original value (reverse percentage).
**Worked Example 1:** Increase £360 by 15%. (Multiplier method: 360 × 1.15.)
**Worked Example 2:** A jacket costs £68 after a 20% reduction. Find the original price. (Reverse percentage: 68 ÷ 0.8.)
**KaTeX needed:** `\times`, `\div`, `\%`, multiplier notation.

### CORE-03: Algebra Basics
**Key facts to cover:** Collecting like terms, expanding single brackets, solving linear equations, substituting values.
**Worked Example 1:** Solve $3x + 7 = 22$. (Rearrangement, step by step.)
**Worked Example 2:** Expand and simplify $3(2x - 1) + 4(x + 3)$. (Distribution then collect.)
**KaTeX needed:** Variable letters, `^`, `\times`, parentheses, `=`.

### CORE-04: Shape (Area and Perimeter)
**Key facts to cover:** Area of rectangle, triangle, parallelogram, trapezium, and circle. Perimeter of polygons. Circumference of circle.
**Worked Example 1:** Find the area and circumference of a circle with diameter 10 cm. ($$A = \pi r^2$$, $$C = \pi d$$.)
**Worked Example 2:** Find the area of a trapezium with parallel sides 6 cm and 10 cm, height 4 cm. ($$A = \frac{1}{2}(a + b)h$$.)
**KaTeX needed:** `\pi`, `r^2`, `\frac{1}{2}`, `(a+b)`, display equations for formulae.

### CORE-05: Averages (Core Level)
**Key facts to cover:** Mean/median/mode/range (extends Foundation knowledge), mean from frequency table, identifying the modal class.
**Worked Example 1:** Find the mean from a frequency table with 5 values. (Use $$\text{Mean} = \frac{\sum fx}{\sum f}$$.)
**Worked Example 2:** Find the median from an ordered list of 9 values. (Identify the 5th value.)
**KaTeX needed:** `\frac`, `\sum`, `\text{}`, display equations. Note: Foundation averages page already sets precedent — Core extends to frequency tables.

### CORE-06: Angles (Including Parallel Lines)
**Key facts to cover:** Angles at a point (360°), angles on a straight line (180°), vertically opposite angles, angles in a triangle (180°), angles in parallel lines (alternate, co-interior, corresponding).
**Worked Example 1:** Find missing angle in a triangle given two angles. (180° - 47° - 63° = 70°.)
**Worked Example 2:** Two parallel lines cut by a transversal. Find all marked angles using alternate/corresponding/co-interior rules.
**KaTeX needed:** `^{\circ}`, `\angle`, subtraction. No complex notation needed — this topic is more geometric reasoning than algebraic.

### CORE-07: Probability
**Key facts to cover:** Probability scale (0 to 1), theoretical probability = favourable outcomes ÷ total outcomes, complementary probability P(not A) = 1 - P(A), sample spaces, listing outcomes.
**Worked Example 1:** A bag has 3 red and 5 blue balls. Find P(red) and P(not red). (`$\text{P}(\text{red}) = \frac{3}{8}$`, `$\text{P}(\text{not red}) = \frac{5}{8}$`.)
**Worked Example 2:** List all outcomes when a coin is flipped and a dice is rolled. Find P(head and even number).
**KaTeX needed:** `\text{P}`, `\frac`, fractions, complement notation `1 -`.

### CORE-08: Coordinates and Graphs (with Desmos — GRAPH-01)
**Key facts to cover:** Four-quadrant coordinates, plotting points, reading coordinates from graphs, midpoint of two points.
**Worked Example 1:** Plot the points A(2,3), B(-1,4), C(-2,-3) and identify the quadrant of each.
**Worked Example 2:** Find the midpoint of the line segment from A(1,5) to B(7,-1). ($$M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right)$$.)
**Desmos setup:** Grid with axes labelled, no pre-loaded expressions — pupils plot their own points by clicking. `lockViewport: false`, `expressions: false`.
**KaTeX needed:** Coordinate pairs `(x, y)`, `\frac{x_1 + x_2}{2}` for midpoint formula.

### CORE-09: Transformations (with Desmos — GRAPH-03)
**Key facts to cover:** Reflection (in x-axis, y-axis, y=x), rotation (90°, 180° about origin or a point), translation (using column vectors), enlargement (positive scale factor from a centre).
**Worked Example 1:** Reflect the triangle with vertices (1,2), (3,2), (2,4) in the y-axis. (Negate x-coordinates.)
**Worked Example 2:** Translate the shape by vector `$\begin{pmatrix} 3 \\ -2 \end{pmatrix}$`. (Add 3 to each x, subtract 2 from each y.)
**Desmos setup:** Show a triangle pre-loaded and its reflection in the y-axis. Pupils can toggle expressions on to explore.
**KaTeX needed:** `\begin{pmatrix}a \\ b\end{pmatrix}` for column vectors, `^{\circ}` for rotation angles.

### CORE-10: Volume and Surface Area
**Key facts to cover:** Volume of cuboid, volume of prism (V = Ah), surface area of cuboid. Units: cm³, m³.
**Worked Example 1:** Find the volume and surface area of a cuboid 4cm × 3cm × 5cm.
**Worked Example 2:** A triangular prism has a cross-section of area 12 cm² and length 8 cm. Find its volume. (V = 12 × 8 = 96 cm³.)
**KaTeX needed:** `^3`, `^2`, `\times`, display equations. Units shown as `\text{cm}^3`.

### CORE-11: Sequences and Nth Term
**Key facts to cover:** Arithmetic sequences (common difference), finding the nth term rule ($$U_n = a + (n-1)d$$), using nth term to find a specific term or find which term has a given value.
**Worked Example 1:** Find the nth term of the sequence 5, 8, 11, 14, ... (a=5, d=3, so $$U_n = 3n + 2$$.)
**Worked Example 2:** Is 100 a term in the sequence $U_n = 4n - 3$? (Solve 4n - 3 = 100, check if n is a positive integer.)
**KaTeX needed:** `U_n`, subscripts `_n`, display equations for formulae. The `U_n` notation is standard CE notation.

### CORE-12: Straight Line Graphs (with Desmos — GRAPH-02)
**Key facts to cover:** y = mx + c form, identifying gradient (m) and y-intercept (c), plotting straight lines, finding the equation of a line from a graph, parallel lines (same gradient).
**Worked Example 1:** Plot the line y = 2x - 1. Identify gradient and y-intercept.
**Worked Example 2:** Find the equation of the line passing through (0, 3) and (4, 11). (Gradient = (11-3)/(4-0) = 2, c = 3, so y = 2x + 3.)
**Desmos setup:** Pre-load y = 2x + 1 with sliders for m and c so pupils can see how gradient and intercept affect the line.

```javascript
calculator.setExpression({ id: 'line', latex: 'y = m*x + c' });
calculator.setExpression({ id: 'slider_m', latex: 'm = 2', sliderBounds: { min: -5, max: 5 } });
calculator.setExpression({ id: 'slider_c', latex: 'c = 1', sliderBounds: { min: -10, max: 10 } });
```

**KaTeX needed:** `y = mx + c` literal, gradient formula `\frac{\Delta y}{\Delta x}` or `\frac{y_2 - y_1}{x_2 - x_1}`.

### CORE-13: Speed, Distance and Time
**Key facts to cover:** The SDT triangle (Speed = Distance ÷ Time, Distance = Speed × Time, Time = Distance ÷ Speed), unit conversions (km/h to m/s), average speed.
**Worked Example 1:** A car travels 240 km in 3 hours. Find the average speed. (240 ÷ 3 = 80 km/h.)
**Worked Example 2:** A train travels at 60 mph. How far does it go in 2.5 hours? (60 × 2.5 = 150 miles.)
**KaTeX needed:** Display equations: `$$\text{Speed} = \frac{\text{Distance}}{\text{Time}}$$` etc. Use `\text{}` for words in formulae.

### CORE-14: Powers and Roots
**Key facts to cover:** Square numbers and square roots, cube numbers and cube roots, powers of 2/3/4/5/10, using a calculator for roots, negative/fractional powers (if stretch needed, but not required at Core).
**Worked Example 1:** Evaluate $2^5 + \sqrt{144} - \sqrt[3]{27}$. (32 + 12 - 3 = 41.)
**Worked Example 2:** Find $\sqrt{0.49}$ and $\sqrt[3]{0.008}$. (0.7 and 0.2.)
**KaTeX needed:** `^2`, `^3`, `^5`, `\sqrt{}`, `\sqrt[3]{}`, `\sqrt[n]{}`.

### CORE-15: Charts and Data Interpretation
**Key facts to cover:** Reading and drawing bar charts, pie charts (sector angle = frequency/total × 360), frequency tables, line graphs, scatter graphs (positive/negative/no correlation).
**Worked Example 1:** A pie chart shows 45 pupils' favourite subjects. If 15 choose Maths, find the sector angle. ($$\frac{15}{45} \times 360 = 120^{\circ}$$.)
**Worked Example 2:** Describe the correlation shown in a described scatter graph and interpret what it means in context.
**KaTeX needed:** `\frac{f}{\text{total}} \times 360^{\circ}` for pie chart formula.

---

## Desmos Expressions Per Graph Topic

### Coordinates and Graphs (CORE-08 / GRAPH-01)
```javascript
// Minimal setup — let pupils explore. No pre-loaded expressions.
// Grid is shown by default.
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: false,
  settingsMenu: false,
  zoomButtons: true,
  lockViewport: false
});
// Optional: show a sample point to demonstrate
calculator.setExpression({ id: 'point_a', latex: '(2,3)', label: 'A(2,3)', showLabel: true });
```

### Straight Line Graphs (CORE-12 / GRAPH-02)
```javascript
// Interactive y=mx+c with sliders
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: true,  // show expression list so pupils can see m and c sliders
  settingsMenu: false,
  zoomButtons: true,
  lockViewport: false
});
calculator.setExpression({ id: 'line', latex: 'y = m*x + c', color: '#2563eb' });
calculator.setExpression({ id: 'slider_m', latex: 'm = 2', sliderBounds: { min: -5, max: 5, step: 0.5 } });
calculator.setExpression({ id: 'slider_c', latex: 'c = 1', sliderBounds: { min: -10, max: 10, step: 1 } });
```

### Transformations (CORE-09 / GRAPH-03)
```javascript
// Show a triangle and its reflection
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: false,
  settingsMenu: false,
  zoomButtons: true,
  lockViewport: false
});
// Original triangle
calculator.setExpression({ id: 'tri_orig', latex: 'polygon((1,2),(3,2),(2,4))', color: '#2563eb', label: 'Original' });
// Reflected in y-axis
calculator.setExpression({ id: 'tri_refl', latex: 'polygon((-1,2),(-3,2),(-2,4))', color: '#dc2626', label: 'Reflection', lineStyle: Desmos.Styles.DASHED });
// y-axis line for reference
calculator.setExpression({ id: 'mirror', latex: 'x=0', color: '#71717a' });
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Math equation rendering | Custom CSS hacks for fractions | KaTeX 0.16.33 (already wired) | Handles fraction sizing, superscript, Greek letters, alignment — 200+ LaTeX commands |
| Interactive graphs | SVG/canvas graphing from scratch | Desmos API v1.11 | Panning, zooming, label rendering, touch support built in |
| Degree/special symbol rendering | HTML entities `&deg;` mixed with math | KaTeX `^{\circ}` inside `$...$` | Keeps sizing consistent with surrounding math |
| Mobile scroll fix | Complex touch event middleware | CSS overlay toggle pattern (documented above) | Simple, no dependencies, doesn't break desktop |
| Column vectors (transformations) | ASCII art `[3, -2]` | KaTeX `\begin{pmatrix}3 \\ -2\end{pmatrix}` | Renders as proper mathematical notation |

**Key insight:** KaTeX is already in every page. Use it for everything mathematical — even a lone degree symbol or simple fraction. Consistency matters for pupil comprehension.

---

## Common Pitfalls

### Pitfall 1: Adding Non-Calculator Badge to Core Pages
**What goes wrong:** Core pages get the green "Non-calculator — Paper 1" badge that Foundation pages have.
**Why it happens:** Copy-paste from a Foundation topic page during authoring.
**How to avoid:** The badge HTML is an inline style block starting with `style="display:inline-block;background:#e8f5e9"`. Do not include it in any Core page.
**Warning signs:** If you see the green badge in any `core/*/index.html`, it's wrong.

### Pitfall 2: Desmos Script on Every Page
**What goes wrong:** The Desmos API script tag gets added to all 15 Core topic pages (or all HTML files).
**Why it happens:** Adding it to the template then applying to all pages.
**How to avoid:** Add the Desmos `<script>` tag ONLY to the three graph pages: `coordinates-graphs/index.html`, `straight-line-graphs/index.html`, `transformations/index.html`.
**Warning signs:** Any non-graph Core page loading `calculator.js` in network tab.

### Pitfall 3: Desmos Mobile Scroll Trap (GRAPH-05)
**What goes wrong:** On a phone, when a pupil touches the Desmos graph area to scroll down the page, their touch is captured by Desmos as a pan gesture. The page doesn't scroll. They are stuck.
**Why it happens:** Desmos registers `touchstart` on its container element and calls `preventDefault()`, stealing the touch event from the browser's scroll handler.
**How to avoid:** Use the CSS overlay pattern documented in Architecture Patterns above. On mobile viewports, a transparent overlay with `touch-action: pan-y` sits above Desmos and allows vertical scroll events to pass to the browser. A toggle button lets pupils switch between "scroll mode" and "interact mode".
**Warning signs:** Testing on an actual phone (not browser DevTools mobile emulation) and finding you cannot scroll past the graph.

### Pitfall 4: KaTeX Delimiter Mismatch in Angle/Degree Content
**What goes wrong:** Writing `45°` as a raw HTML entity (`&deg;`) outside KaTeX delimiters, mixed with KaTeX-rendered angle notation — sizes and fonts don't match.
**Why it happens:** Reaching for `&deg;` as the quick option.
**How to avoid:** Write all degree values inside KaTeX: `$45^{\circ}$`. The `°` symbol rendered by KaTeX matches the surrounding math font.
**Warning signs:** Degree symbols look slightly different from angle values on the same line.

### Pitfall 5: Transformation Vector Notation
**What goes wrong:** Writing translation vectors as `(3, -2)` in parentheses rather than as a column vector.
**Why it happens:** Coordinate notation `(3, -2)` looks similar but has different meaning.
**How to avoid:** Use KaTeX column vectors: `$\begin{pmatrix}3 \\ -2\end{pmatrix}$`. This is the standard CE notation.
**Warning signs:** Any translation described with round brackets `(a, b)` instead of column vector notation.

### Pitfall 6: Desmos API Key in Production
**What goes wrong:** Site goes live with demo key `dcb31709b452b1cf9dc26972add0fda6` — demo key may have usage limits or be revoked.
**Why it happens:** Forgetting to swap to production key before go-live.
**How to avoid:** Request production key from `partnerships@desmos.com` NOW (free, educational use). Replace in all three graph page script tags before go-live. Demo key is acceptable during development.
**Warning signs:** Any graph page loading with demo key in production.

### Pitfall 7: Averages Core vs Foundation Duplication
**What goes wrong:** Core averages page (CORE-05) is identical to Foundation averages page — no new content.
**Why it happens:** Core level does address mean/median/mode/range, but extends to frequency tables (not just raw data sets).
**How to avoid:** Core averages MUST include at least one worked example using a frequency table (computing mean from a grouped/frequency table). This distinguishes Core from Foundation.
**Warning signs:** Core averages page with only two raw data set examples.

---

## Code Examples

### Standard Core Page Opening (no Desmos)
```html
<!-- Source: Established in 02-01-PLAN.md, 02-02-PLAN.md — verified against existing files -->
<main class="main-content">
  <p class="breadcrumb">
    <a href="/MathsRevisionSite/">Home</a> &rsaquo;
    <a href="/MathsRevisionSite/core/">Core</a> &rsaquo;
    [Topic Name]
  </p>

  <span class="level-badge core">Core</span>
  <h1 class="page-title">[Topic Name]</h1>
  <!-- NO non-calc badge — Core = calculator paper -->

  <h2>Key Facts</h2>
  <ul>
    <li><strong>[Fact]:</strong> Explanation with inline KaTeX $x = y$ as needed.</li>
  </ul>

  <h2>Worked Example 1: [Scenario]</h2>
  <p>[Question statement with inline KaTeX if needed]</p>
  <ol>
    <li>Step 1 with display KaTeX:
      $$\text{formula} = \frac{a}{b}$$
    </li>
    <li>Step 2...</li>
  </ol>
  <p><strong>Answer: [final answer with inline KaTeX]</strong></p>

  <h2>Worked Example 2: [Scenario]</h2>
  <!-- same pattern -->
</main>
```

### Speed/Distance/Time Formula Display
```html
<!-- Source: KaTeX 0.16.33 — \text{} for words inside math, \frac for formula -->
<ul>
  <li><strong>Speed:</strong>
    $$\text{Speed} = \frac{\text{Distance}}{\text{Time}}$$
  </li>
  <li><strong>Distance:</strong>
    $$\text{Distance} = \text{Speed} \times \text{Time}$$
  </li>
  <li><strong>Time:</strong>
    $$\text{Time} = \frac{\text{Distance}}{\text{Speed}}$$
  </li>
</ul>
```

### Probability Notation
```html
<!-- Source: KaTeX 0.16.33 — \text{P} for probability operator -->
<li>The probability of event A is written as $\text{P}(A)$.</li>
<li>Complementary probability: $\text{P}(\text{not } A) = 1 - \text{P}(A)$</li>
```

### Nth Term Formula
```html
<!-- Source: KaTeX 0.16.33 — subscripts for sequence notation -->
<li><strong>nth term:</strong> For an arithmetic sequence, $$U_n = a + (n-1)d$$ where $a$ is the first term and $d$ is the common difference.</li>
```

### Transformation Column Vector
```html
<!-- Source: KaTeX 0.16.33 — pmatrix environment for column vectors -->
<li>A translation by vector $\begin{pmatrix}3 \\ -2\end{pmatrix}$ moves each point <strong>3 right</strong> and <strong>2 down</strong>.</li>
```

### Pie Chart Sector Angle
```html
<!-- Source: KaTeX 0.16.33 -->
<li><strong>Sector angle:</strong>
  $$\text{Sector angle} = \frac{\text{frequency}}{\text{total}} \times 360^{\circ}$$
</li>
```

### Mean From Frequency Table
```html
<!-- Core-level averages — extends Foundation pattern -->
<li><strong>Mean from frequency table:</strong>
  $$\text{Mean} = \frac{\sum fx}{\sum f}$$
  where $f$ is the frequency and $x$ is the value (or midpoint for grouped data).
</li>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Shared nav via `fetch()` fragment | Inline nav in every HTML file | Phase 1 (01-01) decision | Safari CORS bug; all nav must be copy-pasted per-file |
| `katex.min.css` | `katex-swap.min.css` | Phase 1 (01-02) decision | Prevents FOIT on slow school networks |
| `DOMContentLoaded` for KaTeX init | `onload` callback on auto-render script | Phase 1 (01-02) decision | Guarantees katex.min.js parsed first |
| Foundation pages without display equations | Display equations for formulae | Phase 2 (02-02) — averages page | Sets precedent for Core formula-heavy topics |

**No deprecated approaches in this phase.** The established stack is current and correct.

---

## Open Questions

1. **Desmos production API key**
   - What we know: Demo key `dcb31709b452b1cf9dc26972add0fda6` works for development.
   - What's unclear: Whether the production key will be obtained before Phase 3 completion or go-live.
   - Recommendation: Proceed with demo key in dev. Add a comment in all three graph page script tags: `<!-- REPLACE WITH PRODUCTION KEY BEFORE GO-LIVE -->`. Request key from `partnerships@desmos.com` immediately.

2. **Desmos mobile scroll — toggle button vs. always-active overlay**
   - What we know: The scroll trap is a genuine UX problem on phones. Two solutions: (a) CSS overlay with JS toggle button, (b) accept that users must scroll around the graph.
   - What's unclear: How disruptive the toggle button UX will be vs. the scroll trap problem.
   - Recommendation: Implement the toggle button approach (option a) for GRAPH-05 compliance. If testing shows it adds confusion, fall back to a tall fixed-height graph block with clear scrollable space above and below — but the toggle is more reliable.

3. **Desmos 3D Calculator API v1.12**
   - What we know: Desmos has released v1.12 with a 3D calculator. The changelog mentions this.
   - What's unclear: Whether there are relevant changes in v1.12 for 2D graphing calculator.
   - Recommendation: Stay on v1.11 as locked in the project. v1.12 is not needed for CE 13+ Core content.

4. **Offline use decision (unresolved from Phase 1)**
   - What we know: STATE.md records this as an unresolved blocker.
   - What's unclear: Whether the site must work without internet on school exam-prep laptops.
   - Recommendation: If this remains unresolved, proceed with CDN-loaded Desmos and KaTeX. If offline is a hard requirement, KaTeX can be self-hosted (assets exist in the npm package) but Desmos cannot — the API requires a CDN call.

---

## Sources

### Primary (HIGH confidence)
- KaTeX official docs (katex.org/docs/supported.html) — confirmed all LaTeX commands listed in topic notation table
- Desmos API v1.11 official docs (desmos.com/api/v1.11/docs/index.html) — embed pattern, constructor options, setExpression()
- Project codebase (`/Users/josh/projects/maths-revision/`) — existing Foundation pages, styles.css, confirmed template structure

### Secondary (MEDIUM confidence)
- owltutors.co.uk/advice/13-plus/maths/syllabus/ — CE 13+ Core topic list (aligns with ISEB 2021 specification; verified against multiple CE prep sources)
- ISEB assessment page (iseb.co.uk/assessments/common-entrance/mathematics/) — confirmed three-tier exam structure (Foundation/Core/Additional, Calculator/Non-Calculator split)
- WebSearch cross-references: Desmos demo key `dcb31709b452b1cf9dc26972add0fda6` confirmed across multiple API version docs

### Tertiary (LOW confidence)
- Mobile scroll trap workaround (CSS overlay + toggle button) — general iframe/embedded content pattern from community sources; not officially documented by Desmos. Functionally sound but should be tested on an actual phone before finalising.
- Desmos production key process — `partnerships@desmos.com` email address confirmed via multiple community discussions; official terms not publicly available.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — KaTeX and Desmos both verified against official docs; all CDN URLs confirmed in existing codebase
- Architecture (page template): HIGH — inherited from verified Phase 2 implementation in codebase
- Desmos embed pattern: HIGH — from official API docs; mobile scroll fix is MEDIUM (community pattern, needs phone testing)
- CE topic content: MEDIUM — from ISEB-linked syllabus source; full official spec PDF was unreadable by fetch tool but cross-referenced against multiple prep sources
- Common pitfalls: HIGH for KaTeX/template pitfalls (verified against Phase 1/2 decisions); MEDIUM for Desmos mobile scroll (pattern confirmed, not officially documented)

**Research date:** 2026-02-26
**Valid until:** 2026-03-28 (KaTeX and Desmos are stable APIs; CE syllabus changes slowly)
