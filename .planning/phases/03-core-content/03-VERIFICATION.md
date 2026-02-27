---
phase: 03-core-content
verified: 2026-02-27T00:00:00Z
status: passed
score: 5/5 success criteria verified
re_verification: null
gaps: []
human_verification:
  - test: "Open coordinates-graphs, transformations, and straight-line-graphs in a browser and interact with each Desmos graph"
    expected: "Graphs load and are interactive; on a phone the 'Tap to interact with graph' button is visible and toggle works without trapping page scroll"
    why_human: "Desmos API requires a live browser with network access; scroll-fix behaviour can only be confirmed on a real touch device"
  - test: "Open the straight-line-graphs page and drag the m and c sliders in the Desmos expression panel"
    expected: "Dragging m changes the gradient of the line; dragging c shifts the y-intercept; the line updates in real time"
    why_human: "Slider interactivity requires a live browser with the Desmos JS loaded from the CDN"
---

# Phase 3: Core Content Verification Report

**Phase Goal:** Pupils can access a worked example for all 15 Core CE topics, including the 10 topics not covered in existing slides, with interactive Desmos graphs on the four graph-heavy topics

**Verified:** 2026-02-27
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 15 Core topic pages exist and have real content (not stub placeholder text) | VERIFIED | All 15 files exist; zero placeholder text found; all exceed min_lines thresholds |
| 2 | All 15 pages have Core level badge and NO non-calculator badge | VERIFIED | All 15 contain `class="level-badge core"` and `Core` text; grep across all 15 pages finds zero instances of "Non-calculator", "Paper 1", or "non-calc" |
| 3 | All 15 pages have breadcrumb linking to /MathsRevisionSite/core/ | VERIFIED | All 15 contain `href="/MathsRevisionSite/core/"` inside a breadcrumb `<p>` element |
| 4 | coordinates-graphs, transformations, and straight-line-graphs have Desmos API script and embed | VERIFIED | All three have `<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6">`, `.desmos-wrapper`, `.desmos-scroll-overlay`, `toggleDesmosInteraction` function, and `Desmos.GraphingCalculator` initialisation |
| 5 | styles.css contains .desmos-wrapper and .desmos-scroll-overlay with touch-action: pan-y for mobile scroll fix | VERIFIED | styles.css lines 293–356 confirm `.desmos-wrapper`, `.desmos-scroll-overlay` with `touch-action: pan-y` inside `@media (max-width: 900px)`, and `.desmos-toggle-btn` |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Provided | Lines | Status | Detail |
|----------|----------|-------|--------|--------|
| `core/ratio/index.html` | Ratio page with 5 key facts, 2 worked examples | 105 | VERIFIED | Sharing in a ratio + unitary method. KaTeX throughout. |
| `core/percentages/index.html` | Percentages page with reverse percentage | 100 | VERIFIED | Percentage increase + reverse percentage worked examples. |
| `core/algebra-basics/index.html` | Algebra basics with bracket expansion | 105 | VERIFIED | Linear equation solve + expand and simplify. |
| `core/shape/index.html` | Shape with circle area and trapezium | 107 | VERIFIED | Circle area/circumference + trapezium area. |
| `core/averages/index.html` | Averages with frequency table (Core-specific) | 117 | VERIFIED | Frequency table + sum-fx formula + median from ordered list. |
| `core/angles/index.html` | Angles with parallel line rules | 105 | VERIFIED | 7 key facts, missing angle in triangle + parallel lines transversal. |
| `core/probability/index.html` | Probability with sample space | 108 | VERIFIED | P(A) formula, complement, sample space combined events. |
| `core/coordinates-graphs/index.html` | Coordinates with Desmos embed | 139 | VERIFIED | Midpoint formula, quadrants, Desmos with point A(2,3), mobile scroll fix. |
| `core/transformations/index.html` | Transformations with Desmos showing reflection | 144 | VERIFIED | Reflection + column vector translation, Desmos shows blue/red dashed triangles, mirror line x=0. |
| `core/volume-surface-area/index.html` | Volume and surface area | 115 | VERIFIED | Cuboid V + SA + triangular prism V with cm³ units in KaTeX. |
| `core/sequences-nth-term/index.html` | Sequences with U_n notation | 106 | VERIFIED | U_n notation, nth term derivation, is-value-in-sequence check. |
| `core/straight-line-graphs/index.html` | Straight line graphs with Desmos y=mx+c sliders | 146 | VERIFIED | Plotting + finding equation, Desmos with m/c sliders, sliderBounds present. |
| `core/speed-distance-time/index.html` | SDT with three display formulae | 100 | VERIFIED | All three SDT formulae using \text{Speed}, \text{Distance}, \text{Time}. |
| `core/powers-roots/index.html` | Powers and roots with sqrt and cube root | 106 | VERIFIED | sqrt{} and sqrt[3]{} notation, decimal roots worked example. |
| `core/charts-data/index.html` | Charts with pie chart sector formula | 101 | VERIFIED | Sector angle = frequency/total × 360°, scatter graph correlation. |
| `assets/css/styles.css` | Desmos CSS block | 357 | VERIFIED | .desmos-wrapper, .desmos-scroll-overlay with touch-action: pan-y, .desmos-toggle-btn. |

---

### Key Link Verification

| From | To | Via | Status | Detail |
|------|----|-----|--------|--------|
| `core/ratio/index.html` | `/MathsRevisionSite/core/` | breadcrumb anchor href | WIRED | Line 55: `href="/MathsRevisionSite/core/"` |
| `core/ratio/index.html` | KaTeX auto-render | onload renderMathInElement | WIRED | Line 25: `onload="renderMathInElement(...)` |
| `core/averages/index.html` | frequency table worked example | `\sum fx` formula and HTML table | WIRED | Lines 66, 97: `\sum fx`, `\sum f`; HTML table element at line 76 |
| `core/coordinates-graphs/index.html` | Desmos API | `<script src calculator.js>` | WIRED | Line 36: `desmos.com/api/v1.11/calculator.js?apiKey=...` |
| `core/coordinates-graphs/index.html` | mobile scroll fix | .desmos-scroll-overlay + toggleDesmosInteraction | WIRED | Lines 110, 124: overlay div + JS toggle function |
| `assets/css/styles.css` | .desmos-wrapper | CSS class definition | WIRED | Line 293: `.desmos-wrapper { position: relative; ... }` |
| `core/transformations/index.html` | Desmos API | `<script src calculator.js>` | WIRED | Line 36 |
| `core/transformations/index.html` | column vector notation | KaTeX pmatrix | WIRED | Lines 70, 89: `\begin{pmatrix}` used in key facts and worked examples |
| `core/sequences-nth-term/index.html` | nth term formula | KaTeX U_n notation | WIRED | Lines 66, 80, 84, 87: U_n used throughout |
| `core/straight-line-graphs/index.html` | Desmos API | `<script src calculator.js>` | WIRED | Line 36 |
| `core/straight-line-graphs/index.html` | Desmos m and c sliders | setExpression with sliderBounds | WIRED | Lines 128–129: `sliderBounds: { min: -5, max: 5, step: 0.5 }` and `{ min: -10, max: 10, step: 1 }` |
| `core/speed-distance-time/index.html` | SDT formula trio | KaTeX \text{Speed} display equations | WIRED | Lines 65–67: all three formulae in display mode with \text{} |
| `core/charts-data/index.html` | pie chart sector formula | KaTeX × 360° display equation | WIRED | Line 66: `\frac{\text{frequency}}{\text{total}} \times 360^{\circ}` |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| CORE-01 | 03-01 | Ratio worked example | SATISFIED | `core/ratio/index.html` — 2 worked examples |
| CORE-02 | 03-01 | Percentages worked example | SATISFIED | `core/percentages/index.html` — includes reverse percentage |
| CORE-03 | 03-01 | Algebra basics worked example | SATISFIED | `core/algebra-basics/index.html` — includes bracket expansion |
| CORE-04 | 03-01 | Shape worked example | SATISFIED | `core/shape/index.html` — circle area and trapezium |
| CORE-05 | 03-01 | Averages (Core) worked example | SATISFIED | `core/averages/index.html` — frequency table distinguishes from Foundation |
| CORE-06 | 03-02 | Angles including parallel lines | SATISFIED | `core/angles/index.html` — alternate, corresponding, co-interior angle rules |
| CORE-07 | 03-02 | Probability worked example | SATISFIED | `core/probability/index.html` — P(A) fraction + sample space |
| CORE-08 | 03-02 | Coordinates and graphs worked example | SATISFIED | `core/coordinates-graphs/index.html` — midpoint formula + quadrants |
| CORE-09 | 03-03 | Transformations worked example | SATISFIED | `core/transformations/index.html` — reflection + column vector translation |
| CORE-10 | 03-03 | Volume and surface area worked example | SATISFIED | `core/volume-surface-area/index.html` — cuboid + triangular prism |
| CORE-11 | 03-03 | Sequences and nth term worked example | SATISFIED | `core/sequences-nth-term/index.html` — U_n formula + is-value-in-sequence |
| CORE-12 | 03-04 | Straight line graphs / y=mx+c | SATISFIED | `core/straight-line-graphs/index.html` — plotting + finding equation |
| CORE-13 | 03-04 | Speed, distance and time | SATISFIED | `core/speed-distance-time/index.html` — all three SDT formulae |
| CORE-14 | 03-04 | Powers and roots | SATISFIED | `core/powers-roots/index.html` — sqrt and cube root notation |
| CORE-15 | 03-04 | Charts and data interpretation | SATISFIED | `core/charts-data/index.html` — pie chart + scatter graph |
| GRAPH-01 | 03-02 | Desmos on coordinates/graphs | SATISFIED | Desmos.GraphingCalculator initialised; point A(2,3) pre-loaded |
| GRAPH-02 | 03-04 | Desmos on straight line graphs | SATISFIED | y=mx+c with sliders for m and c; sliderBounds wired |
| GRAPH-03 | 03-03 | Desmos on transformations | SATISFIED | Blue triangle + red dashed reflection + grey y-axis mirror line |
| GRAPH-05 | 03-02 | Desmos embeds mobile scroll-friendly | SATISFIED | .desmos-scroll-overlay with touch-action: pan-y; toggleDesmosInteraction on all 3 pages |

All 19 requirement IDs from all four plans accounted for and satisfied. No orphaned requirements found — GRAPH-04 (Pythagoras) is correctly assigned to Phase 4 and not claimed by any Phase 3 plan.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `assets/css/styles.css` | 5, 12, 13 | `PLACEHOLDER` in CSS comments for --mh-navy and --mh-gold colour values | Info | Comment-only; colour values are populated and functional. Josh to confirm exact brand colours before go-live. No content impact. |
| `core/coordinates-graphs/index.html` | 35 | `REPLACE WITH PRODUCTION KEY BEFORE GO-LIVE` comment | Info | Demo API key in use. Functional for development; must be replaced before public launch. This was explicitly required by the plan. |
| `core/transformations/index.html` | 35 | `REPLACE WITH PRODUCTION KEY BEFORE GO-LIVE` comment | Info | Same as above. |
| `core/straight-line-graphs/index.html` | 35 | `REPLACE WITH PRODUCTION KEY BEFORE GO-LIVE` comment | Info | Same as above. |

No blockers. No stubs. The REPLACE comments are intentional and required by the plan spec — they flag a go-live action, not missing implementation.

---

### Human Verification Required

#### 1. Desmos Graph Loading and Mobile Scroll Fix

**Test:** Open `core/coordinates-graphs/index.html`, `core/transformations/index.html`, and `core/straight-line-graphs/index.html` in a browser (serve with `python3 -m http.server 8080` from the project root, then visit `http://localhost:8080/core/coordinates-graphs/`). On a phone or using browser dev tools in mobile emulation, tap the page above and below the graph to scroll — then tap the "Tap to interact with graph" button and verify that interaction mode is enabled.

**Expected:** Each Desmos graph loads and renders. On desktop the graph is immediately interactive. On mobile/touch the page scrolls freely over the graph area until the toggle button is pressed. The button text changes between "Tap to interact with graph" and "Scroll page (tap to switch)".

**Why human:** Desmos API loads from an external CDN and requires a live browser. The touch-action scroll fix can only be confirmed on a real touch device or browser emulation.

#### 2. Straight Line Graphs Sliders

**Test:** Open `core/straight-line-graphs/index.html` in a browser. In the left panel of the Desmos graph, locate the m and c sliders. Drag the m slider from its initial value of 2 to -3. Drag the c slider from 1 to 5.

**Expected:** The blue line updates in real time as sliders are dragged. Negative m makes the line slope downward. Higher c shifts the line up. The line always remains y = mx + c.

**Why human:** Slider drag behaviour and real-time graph update require live browser interaction with the loaded Desmos API.

#### 3. KaTeX Equation Rendering

**Test:** Open each of the 15 Core topic pages in a browser and visually confirm that all maths expressions render as formatted equations (not as raw LaTeX strings like `$a:b$` or `$$\text{Speed}...$$`).

**Expected:** All inline and display equations render with proper maths typography via KaTeX.

**Why human:** KaTeX renders client-side via deferred script loading. Cannot verify rendering without a browser.

---

### Gaps Summary

No gaps. All 15 Core topic pages exist, contain real educational content (not stubs), have the correct Core badge with no non-calculator badge, include a breadcrumb to `/MathsRevisionSite/core/`, and all three Desmos graph pages are fully wired with the API script, wrapper, scroll-fix overlay, and mobile toggle. The CSS contains the complete Desmos block with `touch-action: pan-y`. All 19 requirement IDs are satisfied.

The phase goal is achieved: pupils can access a worked example for all 15 Core CE topics with interactive Desmos graphs on coordinates-graphs, transformations, and straight-line-graphs.

Note: The plan specified Desmos on "four graph-heavy topics" but GRAPH-04 (Pythagoras) is assigned to Phase 4. The three Desmos pages delivered in Phase 3 correspond to GRAPH-01, GRAPH-02, and GRAPH-03 — exactly as specified. GRAPH-05 (mobile scroll fix) is also satisfied.

---

_Verified: 2026-02-27_
_Verifier: Claude (gsd-verifier)_
