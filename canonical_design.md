# THE STACK — COMPLETE DESIGN SYSTEM SPECIFICATION

**Version:** 1.0 — February 9, 2026
**Purpose:** This document is the single source of truth for transforming any presentation, document, or visual asset into The Stack brand identity. Follow every rule exactly. When in doubt, this document is correct.
**Active Override (React Deck Migration):** Slide subtitles render in sentence case (no forced all-caps on `.slide-subtitle`).
**Audience:** AI agents (Claude Code, etc.), designers, developers.

---

## TABLE OF CONTENTS

1. Brand Identity Overview
2. Color System (Dark Mode)
3. Color System (Light Mode — Vivid Strata / Cool White)
4. Typography
5. Spacing & Proportions
6. Slide Architecture
7. Chart System
8. Components
9. Logo Specification
10. Do / Don't Rules
11. Implementation Notes for Agents

---

## 1. BRAND IDENTITY OVERVIEW

**Name:** The Stack
**Thesis:** Physical-layer AI infrastructure investing. We invest at the constrained infrastructure layer — power, copper, semiconductors, cooling — that every AI model must flow through.
**Philosophy:** Inspired by Benjamin Bratton's "The Stack" — computation as layered geological strata. Three layers: Physical (bottom, dominant), Model (middle), Revenue (top).
**Visual Language:** Dense, data-rich, institutional. Dark-mode primary. No decorative elements. Every pixel serves information or hierarchy.
**Palette Name:** Strata
**Font System:** EB Garamond (display) + Inter (body) + JetBrains Mono (data)

---

## 2. COLOR SYSTEM — DARK MODE (PRIMARY)

Dark mode is the primary presentation mode. All slides default to dark unless explicitly specified otherwise.

### 2.1 Backgrounds & Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0A0A0A` | Primary canvas. Every slide background. NON-NEGOTIABLE. |
| `bg-alt` | `#070707` | Cover slides, section dividers, hero moments |
| `surface-1` | `#111111` | Card backgrounds, chart containers, panels |
| `surface-2` | `#181818` | Hover states, active panels, nested containers |
| `surface-3` | `#1E1E1E` | Table alternate rows, input fields, deepest nesting |
| `border` | `#1E1E1E` | All borders, chart gridlines, separators |
| `border-light` | `#282828` | Subtle separators where `border` is too dark |

### 2.2 Primary — Green (Physical Layer)

The green family is THE identity. It always leads. It always appears first in any chart. It represents the physical infrastructure layer.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-darkest` | `#2D5435` | Pressed states, gradient endpoints |
| `primary-dark` | `#3D6E4A` | Area fills, hover states, secondary emphasis |
| `primary` | `#5A8F6A` | **THE identity color.** Logo, chart series #1, key highlights, CTAs, accent text |
| `primary-light` | `#7BAF8B` | Chart series #3, tags, subtle emphasis, hover |
| `primary-lightest` | `#A3CBAF` | Disabled states, annotations, very subtle accents |
| `primary-muted` | `#5A8F6A40` | 25% opacity. Area chart gradient fills, glow effects, selection highlights. NEVER for text or borders. |

### 2.3 Secondary — Blue (Model / Compute Layer)

Blue is ALWAYS the counterpoint. It never leads. It never appears as series #1. It represents the model/compute layer.

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary-dark` | `#345E82` | Pressed states, gradient endpoints |
| `secondary` | `#4A7DA8` | Chart series #2, model/compute references, links |
| `secondary-light` | `#6B9DC8` | Chart series #4, hover states |
| `secondary-lightest` | `#92BDE0` | Annotations, 5th option in some contexts |
| `secondary-muted` | `#4A7DA840` | 25% opacity. Area fills, highlights. NEVER for text or borders. |

### 2.4 Extended Palette (5+ chart series only)

These colors exist ONLY for charts that require 5 or 6 series. They are never used for UI, accents, or branding.

| Token | Hex | Usage |
|-------|-----|-------|
| `ext-warm` | `#8B7355` | Chart series #5. Earthy, commodity reference. |
| `ext-warm-light` | `#A0856B` | Paired with ext-warm for hover/light variant |
| `ext-cool` | `#7A7A9B` | Chart series #6. Cool gray. Neutral filler. |

### 2.5 Text Hierarchy — Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#F0F0F0` | Headlines, hero numbers, slide titles, key data |
| `text-secondary` | `#C0C0C0` | Body text, descriptions, table data, paragraphs |
| `text-tertiary` | `#999999` | Captions, axis labels, chart titles, source lines, footnotes |
| `text-muted` | `#666666` | Disabled text, placeholders, watermarks, page numbers |
| `text-faint` | `#444444` | Very subtle markers, background text elements |
| `text-inverse` | `#1A1A1A` | Text on light backgrounds (tags, inverted elements) |

### 2.6 Semantic Colors — Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `positive` | `#5A8F6A` | Gains, up arrows, positive changes. Same as primary — intentional. |
| `negative` | `#C45B5B` | Losses, down arrows, negative changes. MUTED red, never bright. |
| `caution` | `#C4A35B` | Alerts, medium-risk indicators. Warm gold. |
| `neutral` | `#999999` | Flat, unchanged, no signal. |

---

## 3. COLOR SYSTEM — LIGHT MODE (VIVID STRATA / COOL WHITE)

Light mode uses DIFFERENT primary/secondary values than dark mode. The hues are the same but pushed to higher saturation and darker values to maintain vibrancy on light backgrounds. The background is Cool White with a very slight blue undertone.

### 3.1 Backgrounds & Surfaces — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#F9FAFB` | Primary canvas. Cool white with very slight blue undertone. |
| `bg-alt` | `#F3F4F6` | Section dividers, hero moments |
| `surface-1` | `#FFFFFF` | Cards, chart containers, panels |
| `surface-2` | `#F6F7F8` | Hover states, nested containers |
| `surface-3` | `#EFF0F2` | Table alternate rows, input fields |
| `border` | `#DDE0E4` | All borders, gridlines, separators |
| `border-light` | `#E6E8EB` | Subtle separators |

### 3.2 Primary — Green (Light Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-dark` | `#065C2D` | Pressed states |
| `primary` | `#0D7A3E` | **Identity color on light.** Logo, series #1, CTAs, accents |
| `primary-light` | `#18A055` | Hover, series #3, tags |
| `primary-muted` | `#0D7A3E18` | ~10% opacity. Area fills, backgrounds. |

### 3.3 Secondary — Blue (Light Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary-dark` | `#084A8A` | Pressed states |
| `secondary` | `#0B5EA8` | Series #2, links, model/compute accents |
| `secondary-light` | `#1474C4` | Hover, series #4 |
| `secondary-muted` | `#0B5EA818` | ~10% opacity. Area fills. |

### 3.4 Text Hierarchy — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#111111` | Headlines, hero numbers, slide titles |
| `text-secondary` | `#2A2A2A` | Body text, descriptions, paragraphs |
| `text-tertiary` | `#585858` | Captions, axis labels, chart titles, sources |
| `text-muted` | `#8A8A8A` | Disabled, placeholders, watermarks |

### 3.5 Semantic Colors — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `positive` | `#0D7A3E` | Same as primary on light |
| `negative` | `#C43030` | Slightly more saturated than dark mode to read on white |
| `caution` | `#B08415` | Warm gold, darkened for light bg |
| `neutral` | `#8A8A8A` | Same as text-muted |

---

## 4. TYPOGRAPHY

### 4.1 Font Stack

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | EB Garamond | 400 (Regular), 500 (Medium) | Slide titles, cover headlines, hero numbers, big metrics. NEVER below 14px. NEVER for body text. |
| **Body** | Inter | 300 (Light), 400 (Regular), 500 (Medium) | All body copy, descriptions, subtitles, UI labels, captions. The workhorse. |
| **Data** | JetBrains Mono | 300 (Light), 400 (Regular), 500 (Medium) | All numbers in charts/tables, axis labels, hex codes, timestamps, CLI output, financial data. |

**Google Fonts Import:**
```
https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@300;400;500&display=swap
```

**CSS Variables:**
```css
--font-display: 'EB Garamond', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif;
--font-data: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, 'Courier New', monospace;
```

### 4.2 Complete Type Scale

| Level | Font | Size | Weight | Letter-Spacing | Color (Dark) | Color (Light) | Transform | Usage |
|-------|------|------|--------|----------------|--------------|---------------|-----------|-------|
| Display | EB Garamond | 36px | 400 | 0.5px | text-primary | text-primary | none | Cover title, section opener |
| H1 | EB Garamond | 24px | 400 | 0.3px | text-primary | text-primary | none | Slide titles |
| H1-Alt | EB Garamond | 18px | 400 | 0.2px | text-primary | text-primary | none | Dense slide titles (when more content needed) |
| H2 Accent | Inter | 13px | 500 | 1.5px | primary | primary | UPPERCASE | Subtitles, key callouts, section labels |
| H3 | Inter | 12px | 500 | 0.3px | text-secondary | text-secondary | none | Panel headers, card titles |
| Body | Inter | 11px | 400 | 0px | text-secondary | text-secondary | none | All body copy, descriptions |
| Caption | Inter | 10px | 400 | 1.5px | text-tertiary | text-tertiary | UPPERCASE | Chart titles (above chart), source lines |
| Data | JetBrains Mono | 11px | 400 | 0px | text-secondary | text-secondary | none | Numbers, financial values, metrics |
| Axis | JetBrains Mono | 9px | 300 | 0px | text-tertiary | text-tertiary | none | Chart axis labels, small data |
| Micro | JetBrains Mono | 8px | 400 | 2px | text-muted | text-muted | UPPERCASE | Watermarks, page numbers, confidentiality |

### 4.3 Number Formatting Rules

- **Abbreviations:** Always abbreviate large numbers. `$143B` not `$143,000,000,000`. Use B/M/K/T with NO space between number and suffix.
- **Multipliers:** Use `×` (multiplication sign), not "x". Example: `32×`, `5-10×`.
- **Percentages — precision:** One decimal for specific data: `34.1%`. Whole numbers for approximations: `~45%`.
- **Financial prices:** Two decimals for commodity prices: `$4.25/lb`. Zero decimals for large sums: `$600B`.
- **Hero metrics:** Display at 24-36px in EB Garamond, `text-primary` or `primary` color. Maximum ONE hero metric per slide.
- **Change indicators:** Prefix with `+` or `-`. Display in semantic color (positive/negative). Use JetBrains Mono. Size should be ~60% of the hero metric it accompanies.
- **Estimates/Projections:** Suffix with `E` — example: `2025E`, `$600BE`. Display at 60% opacity with dashed underline or border.
- **Date formatting:** `Q1'24`, `Q2'25`, `FY2026`. Use apostrophe for abbreviated year. `Feb 2026` for full months.

### 4.4 Font Usage Decision Tree

```
Is it a title or headline?              → EB Garamond, 18-36px, weight 400
Is it a big number / hero metric?       → EB Garamond, 24-36px, weight 400
Is it body text or a description?       → Inter, 11px, weight 400
Is it a subtitle or accent line?        → Inter, 13px, weight 500, primary color, UPPERCASE
Is it a panel/card header?              → Inter, 12px, weight 500
Is it a number in a chart or table?     → JetBrains Mono, 9-11px, weight 400
Is it an axis label?                    → JetBrains Mono, 8-9px, weight 300
Is it a source line or footnote?        → Inter or JetBrains Mono, 8-9px, text-tertiary
Is it a watermark or page number?       → JetBrains Mono, 8px, weight 400, text-muted, UPPERCASE
Is it a positive/negative change?       → JetBrains Mono, positive or negative semantic color
```

**CRITICAL RULE:** EB Garamond is NEVER used below 14px. Below that size, serifs lose definition on screens. Switch to Inter for anything smaller.

**CRITICAL RULE:** Font weight NEVER exceeds 500 (Medium). There is NO bold (700) in this system. The heaviest weight is Inter 500 for subtitles and accents. EB Garamond uses 400 only.

---

## 5. SPACING & PROPORTIONS

This section is critical for achieving the correct visual density and breathing room. The system uses an 8px base grid for major spacing and 4px for fine adjustments.

### 5.1 Base Grid

- **Base unit:** 8px
- **Fine unit:** 4px
- All spacing values should be multiples of 4px or 8px.

### 5.2 Slide Dimensions

- **Aspect ratio:** 16:9 (standard widescreen)
- **Working area:** The full slide minus margins
- **Slide outer padding:** 32px on all sides (left, right, top, bottom)
- On python-pptx, use a standard Widescreen slide: **13.333 × 7.5 inches** (914400 × 514350 EMU per inch)

### 5.3 Slide Content Zones

Every slide is divided into vertical zones from top to bottom:

```
┌──────────────────────────────────────────────────┐
│  HEADER BAR (40px height)                        │
│  Logo + Wordmark + "CONFIDENTIAL" + Page Number  │
├──────────────────────────────────────────────────┤ ← 1px border separator
│  TITLE BLOCK (72-88px height)                    │
│  Slide Title (H1) + Subtitle (H2 Accent)        │
│                                                  │
│  12px gap                                        │
│                                                  │
│  CONTENT ZONE (remaining height)                 │
│  Charts, tables, data cards, body text           │
│                                                  │
│                                                  │
│                                                  │
│                                                  │
├──────────────────────────────────────────────────┤
│  FOOTER BAR (24px height)                        │
│  Source (left) + Date (right)                    │
└──────────────────────────────────────────────────┘
```

### 5.4 Detailed Spacing Values

#### Slide Margins & Padding
| Element | Value | Notes |
|---------|-------|-------|
| Slide outer padding (all sides) | 32px | Consistent on all four sides |
| Header bar height | 40px | Contains logo lockup, wordmark, confidential notice, page number |
| Header-to-separator gap | 0px | Separator sits directly below header content |
| Separator line | 1px solid `border` | Full width within margins |
| Separator-to-title gap | 16px | Space between separator and title text |
| Title block height | 72-88px | Depends on whether subtitle is present |
| Title to subtitle gap | 4px | Tight pairing |
| Title block to content gap | 20px | Primary breathing room between title and charts/content |
| Footer bar height | 24px | Source left, date right |
| Content to footer gap | 16px | Breathing room above footer |

#### Within Content Zone
| Element | Value | Notes |
|---------|-------|-------|
| Chart container padding | 16px | All four sides within the surface-1 container |
| Chart title to chart gap | 10px | Between the caption-style chart title and the chart area |
| Chart to legend gap | 8px | Between chart bottom and legend items |
| Multi-chart horizontal gap | 16px | Between side-by-side charts |
| Multi-chart vertical gap | 16px | Between stacked charts |
| Data card padding | 16px | All sides |
| Data card gap (between cards) | 8px | Horizontal and vertical |
| Table cell padding | 8px vertical, 14px horizontal | Consistent across all cells |
| Table header cell padding | 8px vertical, 14px horizontal | Same as body cells |
| Body text line-height | 1.7-1.8 | For readability |
| Body text max-width | 560px | Prevent lines from becoming too long on wide slides |
| Paragraph gap | 12px | Between consecutive paragraphs |

#### Component Internal Spacing
| Element | Value | Notes |
|---------|-------|-------|
| Tag/label padding | 3px vertical, 10px horizontal | Compact but touchable |
| Button padding | 6px vertical, 16px horizontal | For any interactive elements |
| Tooltip padding | 6px 10px | Compact |
| Card label to value gap | 8px | Between the small uppercase label and the big number |
| Card value to change indicator gap | 4px | Between the number and +/-% |

### 5.5 Proportion Rules

#### White Space Philosophy
The system is **data-dense but not cramped**. The goal is to fill slides with meaningful information while maintaining clear visual hierarchy through spacing, not through decorative elements. Empty space is used strategically:

- **Top-heavy breathing:** More space between header/title and content (36px total from separator through title to content). Less space at bottom.
- **Chart containers need air:** 16px padding inside chart containers. Charts should NOT touch container edges.
- **Group related items tightly, separate groups loosely:** Data cards within a group have 8px gaps. Groups of cards separated from other content by 20px+.
- **Never center-align content areas on a slide.** Everything is left-aligned. The only exception is the cover slide logo mark.
- **Maximum 2 levels of nesting.** A surface-1 container can contain surface-2 elements, but never go deeper. If you need more depth, flatten the hierarchy.

#### Content Fill Targets
- **Cover slide:** ~30% filled. Logo, title, tagline. Lots of breathing room. Hero moment.
- **Section divider:** ~20% filled. Section number + title. Maximum emptiness.
- **Data slide (single chart):** ~65-75% filled. Chart dominates the content zone.
- **Data slide (multi-chart/grid):** ~75-85% filled. Dense but each element has its padding.
- **Table slide:** ~70-80% filled. Tables extend to near-full width.
- **Text-heavy slide:** ~50-60% filled. Never fill a slide with text. If you have too much text, split into two slides.

### 5.6 Alignment Rules

- **Left-align everything** by default: titles, subtitles, chart titles, body text, source lines.
- **Right-align:** Only for numerical columns in tables (values, percentages, prices) and Y-axis labels on charts.
- **Center-align:** ONLY on cover slides (logo + title can be centered). Nowhere else.
- **Baseline alignment:** All elements in a row (e.g., header logo + wordmark + page number) must share a common baseline.
- **Consistent left edge:** The title, subtitle, chart container, and footer source line should all start at the same left x-position (the slide's left margin: 32px).

---

## 6. SLIDE ARCHITECTURE

### 6.1 Header Bar

```
[Logo 18px] [8px gap] [Wordmark "THE STACK" 8px, ls:3, UPPERCASE, text-muted, JetBrains Mono]
                                                    [Right-aligned: "CONFIDENTIAL · {page} / {total}" 8px, text-faint, JetBrains Mono]
```

- Logo is the neural stack mark at 18×18px
- Wordmark is UPPERCASE, letter-spacing 3px
- Page numbers use format `14 / 62` (spaces around slash)
- Entire header bar is vertically centered at 40px height

### 6.2 Title Block

```
[Slide Title — EB Garamond, 22-24px, weight 400, text-primary, letter-spacing 0.3px]
[4px gap]
[Subtitle — Inter, 11-13px, weight 500, primary color, UPPERCASE, letter-spacing 1.5px]
```

- Slide title should be a complete, descriptive sentence or phrase. Not just a topic word.
- **Good:** "Hyperscaler Capex Has Reached Escape Velocity"
- **Bad:** "Capex Overview"
- Subtitle provides the key number or qualifying statement.
- **Good:** "$600B PROJECTED ANNUAL SPEND BY 2026"
- **Bad:** "KEY METRICS"

### 6.3 Content Zone

This is where charts, tables, data cards, and body text live. The content zone fills the space between the title block bottom + 20px gap and the footer top - 16px gap.

### 6.4 Footer Bar

```
[Source — "Source: {sources}" Inter or JetBrains Mono, 8px, text-muted]
                                                    [Right-aligned: "{Month Year}" JetBrains Mono, 8px, text-faint]
```

- Source is always present. If no specific source, use "Source: The Stack analysis"
- Date is always "February 2026" (or current month/year)
- Source and date share the same y-position, left and right aligned respectively

### 6.5 Slide Types

#### Cover Slide
- Background: `bg-alt` (#070707 dark / #F3F4F6 light)
- Logo mark: 120-180px centered or left-aligned
- Title: Display size (36px), EB Garamond
- Tagline: H2 Accent, primary color, UPPERCASE
- No header bar, no footer. Clean.
- "CONFIDENTIAL" in bottom-right corner, text-faint, 8px

#### Section Divider
- Background: `bg` (#0A0A0A dark)
- Section number: EB Garamond, 48px, primary color, weight 400
- Section title: EB Garamond, 28px, text-primary
- Positioned in the left-center or lower-left third of the slide
- No charts, no data. Pure navigation.

#### Data Slide (Single Chart)
- Standard header + title + footer
- One chart container filling ~70% of content zone
- Chart container: surface-1 background, 1px border, 16px padding
- Optionally: 1-3 data cards in a row above or beside the chart

#### Data Slide (Grid)
- Standard header + title + footer
- 2-4 charts or data cards in a grid layout
- Use CSS grid mental model: equal columns, 8-16px gaps
- All containers same height within a row

#### Table Slide
- Standard header + title + footer
- Table fills near-full width of content zone
- Table styling per Component spec (section 8)

#### Text Slide
- Standard header + title + footer
- Body text at 11px, Inter, text-secondary, line-height 1.8
- Max-width 560px for body text columns
- Can pair with a small chart or data callout on the right

---

## 7. CHART SYSTEM

### 7.1 Series Color Assignment — STRICT ORDER

This order is IMMUTABLE. Never skip a step. Never reorder.

| # of Series | Colors (Dark Mode) | Colors (Light Mode) |
|-------------|-------------------|---------------------|
| 1 | `#5A8F6A` | `#0D7A3E` |
| 2 | `#5A8F6A`, `#4A7DA8` | `#0D7A3E`, `#0B5EA8` |
| 3 | `#5A8F6A`, `#4A7DA8`, `#7BAF8B` | `#0D7A3E`, `#0B5EA8`, `#18A055` |
| 4 | `#5A8F6A`, `#4A7DA8`, `#7BAF8B`, `#6B9DC8` | `#0D7A3E`, `#0B5EA8`, `#18A055`, `#1474C4` |
| 5 | + `#8B7355` | + `#8B7355` |
| 6 | + `#7A7A9B` | + `#7A7A9B` |

**MAXIMUM 6 series.** Beyond 6, use small multiples (multiple smaller charts).

**Meaning mapping:** Green = physical layer / primary metric. Blue = model/compute / secondary metric. This is not arbitrary — it encodes thesis meaning.

### 7.2 Area Charts

- **Gradient fills:** Always top-down linear gradient.
  - Frontmost series: primary color at 25-30% opacity at top → 2% opacity at bottom
  - Behind series: 15-18% opacity at top → 1% at bottom
- **Never use solid area fills.** They obscure overlapping data.
- **Stroke on top of fill:** The line sits on top of the gradient fill. Same color as fill, full opacity, 1.5-2px stroke.

#### Area Chart CSS/SVG Pattern (Dark Mode):
```svg
<linearGradient id="area-primary" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#5A8F6A" stop-opacity="0.28" />
  <stop offset="100%" stop-color="#5A8F6A" stop-opacity="0.02" />
</linearGradient>
```

### 7.3 Line Charts

| Property | Series #1 | Series #2 | Series #3+ |
|----------|-----------|-----------|------------|
| Stroke width | 2px | 1.5px | 1.2px |
| Color | primary | secondary | primary-light / secondary-light |
| Dash | Solid (ALWAYS) | Solid | Solid |

- **Dashed lines ONLY for:**
  1. Projections/estimates (future data)
  2. Benchmarks (reference lines like S&P 500)
  3. Secondary comparisons (less important context lines)
- **Never dash a primary data series.**
- **Data point dots:** Show only when <8 data points on the line. Primary: 4px radius. Others: 3px radius. No dots on dense time series (monthly data, daily data).

### 7.4 Bar Charts

#### Horizontal Bars (for comparisons)
- Primary metric: primary color, full opacity
- Comparison/prior: secondary color at 60% opacity
- Bars have 2px gap between them within a group
- Bar height: 16-24px depending on chart density
- Bar corner radius: 0px (sharp corners, no rounding)

#### Vertical Bars (for time series)
- **Single series — opacity graduation:** Oldest bar at 50% opacity, graduating to 100% for the most recent bar. This encodes time visually.
- **Dual series:** Primary and secondary side by side. 2px gap between paired bars.
- **Stacking limit:** Maximum 2 colors in a stacked bar. For 3+ categories, use grouped bars or small multiples.

#### Projections
- Projected bars: 60% opacity + 1px dashed border
- Label with "E" suffix (e.g., "2025E", "2026E")
- Projected bars should be visually distinct from historical bars

### 7.5 Gridlines & Axes

| Property | Value |
|----------|-------|
| Gridline direction | **HORIZONTAL ONLY.** Never vertical gridlines. |
| Gridline color | `border` (#1E1E1E dark / #DDE0E4 light) |
| Gridline stroke | 0.5px |
| Gridline count | 3-5 lines maximum |
| Y-axis labels | JetBrains Mono, text-tertiary, 8-9px, right-aligned |
| X-axis labels | JetBrains Mono, text-tertiary, 8-9px, center-aligned |
| Axis lines | None. No visible axis lines. Gridlines serve as the reference. |

### 7.6 Chart Titles & Labels

- **Chart title:** Inter, text-tertiary, 10px, UPPERCASE, letter-spacing 1.5px
- **Position:** Above the chart, left-aligned. NEVER centered.
- **Legend:** Inline below chart or to the right. Use colored dots (●) + label text.
- **Legend font:** JetBrains Mono, 8-9px, text-tertiary
- **Annotations:** Dashed line in #333333 (dark) / #CCCCCC (light), 0.5px. Max 2 annotations per chart.
- **Key callout:** Highlight ONE number per chart in primary color. Never more than one green-highlighted number per chart.

### 7.7 Pie/Donut Charts

**Avoid.** Use horizontal bars instead. If absolutely unavoidable:
- Same color order as all other charts
- Maximum 5 segments
- Group remaining segments as "Other" using ext-cool (#7A7A9B)
- No 3D effects, no explosion/separation, no drop shadows

### 7.8 Chart Container

Every chart sits inside a container:
```
Background: surface-1
Border: 1px solid border
Padding: 16px (all sides)
```

The chart title sits inside the container, at the top-left. The chart SVG/canvas fills the remaining space. The legend sits below the chart within the container.

---

## 8. COMPONENTS

### 8.1 Data Cards

```
┌─────────────────────────────┐  Background: surface-1
│  LABEL                      │  8px, JetBrains Mono, text-tertiary, UPPERCASE, ls:2
│                             │  8px gap
│  $143B /yr                  │  28-30px EB Garamond value + 11px Inter unit
│  +67% YoY                   │  10px JetBrains Mono, semantic color
└─────────────────────────────┘  Padding: 16px. Border: 1px solid border.
```

- Cards in a row use equal widths with 8px gaps
- Typical layout: 3 cards in a row above a chart
- Hero number in EB Garamond, weight 400, text-primary
- Unit text (GW, /yr, /lb) in Inter, 11px, text-tertiary, baseline-aligned with the number
- Change indicator below the number, 4px gap, JetBrains Mono, semantic color

### 8.2 Tables

#### Header Row
- Background: transparent (no special header background)
- Text: JetBrains Mono, 8px, UPPERCASE, letter-spacing 2px, text-tertiary, weight 400
- Padding: 8px vertical, 14px horizontal
- Bottom border: 1px solid border

#### Body Rows
- Text column (first col): Inter, 11px, text-primary, weight 500
- Data columns: JetBrains Mono, 10px, text-secondary or text-tertiary
- Numbers right-aligned, text left-aligned
- Alternating rows: even rows get `surface-3` background
- Row borders: 1px solid border (horizontal only, never vertical borders)

#### Semantic Data in Tables
- Positive percentages: `positive` color
- Negative percentages: `negative` color
- Use font-weight 500 for change columns to add emphasis

### 8.3 Tags / Labels

```css
/* Structure */
padding: 3px 10px;
font: JetBrains Mono, 8px, UPPERCASE, letter-spacing 1.5px;
border: 1px solid;

/* Color variants: */
/* Green tag (Physical Layer, positive) */
color: primary;
background: primary at 20% opacity;
border-color: primary at 40% opacity;

/* Blue tag (Model Layer) */
color: secondary;
background: secondary at 20% opacity;
border-color: secondary at 40% opacity;

/* Neutral tag */
color: text-tertiary;
background: transparent;
border-color: border;

/* Semantic tags: same pattern */
/* Positive: primary-based */
/* Negative: negative at 15% bg, 30% border */
/* Caution: caution at 15% bg, 30% border */
```

### 8.4 Separator / Divider Line

- 1px solid `border`
- Full width of content area
- Used between header and content, and optionally between major content sections
- Never use more than 2 separator lines per slide

### 8.5 Callout / Highlight Box

For key thesis statements or important quotes:
```
Background: surface-1
Left border: 3px solid primary (creates a left accent stripe)
Padding: 16px (top/bottom/right), 20px (left, including the 3px border)
Text: Inter, 11px, text-secondary, line-height 1.8
```

### 8.6 Footnotes

- Position: Bottom of content zone, above footer
- Font: JetBrains Mono, 8px, text-muted
- Prefix with superscript number: ¹, ², ³
- Separated from content by 12px gap

---

## 9. LOGO SPECIFICATION

### 9.1 Logo Description

The Stack logo is an isometric mark composed of three layered diamond planes (isometric projection) populated with dense neural node fields. Each plane represents a thesis layer:

- **Top plane (Revenue):** Fewest nodes (~8-22), secondary blue color, lowest opacity (0.45-0.5)
- **Middle plane (Model):** Medium density (~14-36 nodes), primary green color, medium opacity (0.72-0.75)
- **Bottom plane (Physical):** Densest (~22-58 nodes), primary-dark green color, full opacity (1.0), optionally with 3D thickness

Nodes are connected by thin edges (synaptic lines) to nearest neighbors, creating a neural mesh across each plane. Thin inter-layer connections link nodes between planes.

### 9.2 Logo Sizes

| Context | Size | Simplification |
|---------|------|----------------|
| Slide header | 18px | Minimal nodes, no grid lines, no contours |
| Business card | 20-24px | Minimal nodes, no grid, no contours |
| Compact lockup | 24px | Same |
| Icon | 32-36px | Low density nodes, optional grid |
| Standard mark | 40-60px | Medium density, grid lines visible |
| Hero / cover | 120-180px | Full density, all features |

### 9.3 Logo Lockups

#### Full Horizontal (primary)
```
[Logo 40px] [14px gap] [EB Garamond "The Stack" 20-22px, weight 400]
```

#### Compact Horizontal
```
[Logo 24px] [8px gap] [Inter "THE STACK" 11px, UPPERCASE, ls:2]
```

#### Icon Only
```
[Logo at any size, no text]
```

### 9.4 Logo Clear Space

Minimum clear space around the logo = 50% of the logo's width on all sides. No other elements should intrude into this zone.

### 9.5 Logo on Different Backgrounds

- On dark (#0A0A0A): Use standard colors
- On light (#F9FAFB): Use light mode primary/secondary values
- On mid-tones: Avoid. The logo requires either a dark or light background.

---

## 10. DO / DON'T RULES

### 10.1 DO

| # | Rule | Detail |
|---|------|--------|
| 1 | Let green lead | Primary green is the most visible color on every slide. When there's one color, it's green. |
| 2 | Blue as counterpoint only | Blue provides contrast and encodes model/compute. It never leads. |
| 3 | EB Garamond for impact | Display font is ONLY for titles, big numbers, and hero moments. Never body text. |
| 4 | Inter for reading | All paragraphs, descriptions, UI labels. The workhorse. |
| 5 | JetBrains Mono for data | Every number in a chart, table, or metric. Axis labels, hex codes, timestamps. |
| 6 | Graduate opacity for time | Older data = more transparent. Recent = full opacity. In bar charts, oldest bar at 0.5, graduating to 1.0 for most recent. |
| 7 | One hero number per slide | 24-36px EB Garamond, text-primary or primary color. Maximum one per slide. |
| 8 | Follow the color sequence | 1→Green 2→Blue 3→GreenLt 4→BlueLt 5→Warm 6→CoolGray. Always. No exceptions. |
| 9 | Horizontal gridlines only | Never vertical gridlines. 3-5 lines, 0.5px, border color. |
| 10 | Use descriptive slide titles | "Hyperscaler Capex Has Reached Escape Velocity" not "Capex Overview". Titles make claims. |
| 11 | Consistent slide structure | Every slide has header bar → separator → title → content → footer. No freestyle layouts. |
| 12 | Warm off-white for light mode | #F9FAFB (Cool White). Never pure white #FFFFFF as a background. |
| 13 | Numbers in JetBrains Mono always | Even a single number embedded in body text should switch to JetBrains Mono. "$143B" in a sentence = JetBrains Mono for the number. |
| 14 | Source every data point | Every chart has a source line in the footer or below the chart. No unsourced data. |

### 10.2 DON'T

| # | Rule | Detail |
|---|------|--------|
| 1 | Never use bold (700) | Maximum weight is Medium (500) for Inter subtitles. EB Garamond uses 400 only. Bold does not exist in this system. |
| 2 | Never exceed 6 chart series | Past 6, the palette breaks. Use small multiples instead. |
| 3 | Never reorder chart colors | Series 1 is green. Series 2 is blue. The order encodes meaning. Never randomize. |
| 4 | Never use pure white backgrounds | Light mode is #F9FAFB. Never #FFFFFF as a slide background. |
| 5 | Never use bright red | Negative color is #C45B5B (dark) / #C43030 (light). Muted, not alarming. Never #FF0000 or similar. |
| 6 | Never center chart titles | Always left-aligned above the chart. Centering looks amateur. |
| 7 | Never use opacity below 20% for data | Below 20% is invisible. Minimum data element opacity is 25%. |
| 8 | Never use colored body text | Body text is always text-secondary. Green = subtitles/data highlights ONLY. Blue = links ONLY. |
| 9 | Never add drop shadows | Depth is created through opacity and surface layering. No shadows anywhere. |
| 10 | Never use EB Garamond below 14px | Serifs lose definition. Switch to Inter for anything smaller. |
| 11 | Never use gradient text | No gradient fills on text. Text is always a single solid color. |
| 12 | Never use vertical borders in tables | Tables use horizontal borders only (row separators). Never column separators. |
| 13 | Never stack more than 2 colors in a bar | For 3+ categories, use grouped bars or small multiples. |
| 14 | Never use decorative elements | No icons, no illustrations, no stock photos, no decorative borders. Every element serves data or hierarchy. |
| 15 | Never use bullet points with custom markers | If lists are needed, use em-dash (—) as the marker, not •, ▸, or custom shapes. But prefer prose over lists. |
| 16 | Never nest more than 2 surface levels | surface-1 can contain surface-2 elements. Never go deeper. |
| 17 | Never place text over charts | No overlaid annotations with text boxes on top of chart data areas. Annotations go in margins or below. |
| 18 | Never use animations other than subtle opacity transitions | No slide transitions, no fly-ins, no builds except simple opacity fades if absolutely necessary. |
| 19 | Never put more than 4 data cards on one slide | 3 is ideal. 4 is the maximum. Beyond that, split slides. |
| 20 | Never use pie charts if a bar chart can work | Horizontal bar charts are almost always superior for comparisons. |

---

## 11. IMPLEMENTATION NOTES FOR AGENTS

### 11.1 General Approach

When transforming an existing presentation:

1. **Audit every slide** for current fonts, colors, backgrounds, and layout.
2. **Set all backgrounds** to `#0A0A0A` (dark mode) or `#F9FAFB` (light mode).
3. **Replace all fonts** according to the type scale in Section 4.
4. **Replace all colors** using the palette tables in Sections 2 and 3. Map existing accent colors to primary/secondary based on importance.
5. **Restructure layouts** to match the slide architecture in Section 6.
6. **Rebuild all charts** with the correct color order, gridline rules, and styling from Section 7.
7. **Add header and footer bars** to every slide.
8. **Review spacing** against Section 5 values.
9. **Final pass:** Check every element against the Do/Don't rules in Section 10.

### 11.2 Python-pptx Specific Notes

When using python-pptx to modify .pptx files:

#### Fonts
```python
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor

# EB Garamond for titles
run.font.name = 'EB Garamond'
run.font.size = Pt(24)
run.font.bold = False  # NEVER bold
run.font.color.rgb = RGBColor(0xF0, 0xF0, 0xF0)  # text-primary dark

# Inter for body
run.font.name = 'Inter'
run.font.size = Pt(11)
run.font.color.rgb = RGBColor(0xC0, 0xC0, 0xC0)  # text-secondary dark

# JetBrains Mono for data
run.font.name = 'JetBrains Mono'
run.font.size = Pt(9)
run.font.color.rgb = RGBColor(0x99, 0x99, 0x99)  # text-tertiary dark
```

#### Backgrounds
```python
from pptx.dml.color import RGBColor
from pptx.util import Pt

# Set slide background
background = slide.background
fill = background.fill
fill.solid()
fill.fore_color.rgb = RGBColor(0x0A, 0x0A, 0x0A)  # dark mode bg
```

#### Colors as RGBColor constants
```python
# Dark Mode
BG = RGBColor(0x0A, 0x0A, 0x0A)
SURFACE_1 = RGBColor(0x11, 0x11, 0x11)
SURFACE_2 = RGBColor(0x18, 0x18, 0x18)
SURFACE_3 = RGBColor(0x1E, 0x1E, 0x1E)
BORDER = RGBColor(0x1E, 0x1E, 0x1E)

PRIMARY_DARKEST = RGBColor(0x2D, 0x54, 0x35)
PRIMARY_DARK = RGBColor(0x3D, 0x6E, 0x4A)
PRIMARY = RGBColor(0x5A, 0x8F, 0x6A)
PRIMARY_LIGHT = RGBColor(0x7B, 0xAF, 0x8B)
PRIMARY_LIGHTEST = RGBColor(0xA3, 0xCB, 0xAF)

SECONDARY_DARK = RGBColor(0x34, 0x5E, 0x82)
SECONDARY = RGBColor(0x4A, 0x7D, 0xA8)
SECONDARY_LIGHT = RGBColor(0x6B, 0x9D, 0xC8)
SECONDARY_LIGHTEST = RGBColor(0x92, 0xBD, 0xE0)

EXT_WARM = RGBColor(0x8B, 0x73, 0x55)
EXT_COOL = RGBColor(0x7A, 0x7A, 0x9B)

TEXT_PRIMARY = RGBColor(0xF0, 0xF0, 0xF0)
TEXT_SECONDARY = RGBColor(0xC0, 0xC0, 0xC0)
TEXT_TERTIARY = RGBColor(0x99, 0x99, 0x99)
TEXT_MUTED = RGBColor(0x66, 0x66, 0x66)

POSITIVE = RGBColor(0x5A, 0x8F, 0x6A)
NEGATIVE = RGBColor(0xC4, 0x5B, 0x5B)
CAUTION = RGBColor(0xC4, 0xA3, 0x5B)

# Light Mode (Vivid Strata / Cool White)
LT_BG = RGBColor(0xF9, 0xFA, 0xFB)
LT_SURFACE_1 = RGBColor(0xFF, 0xFF, 0xFF)
LT_SURFACE_2 = RGBColor(0xF6, 0xF7, 0xF8)
LT_SURFACE_3 = RGBColor(0xEF, 0xF0, 0xF2)
LT_BORDER = RGBColor(0xDD, 0xE0, 0xE4)

LT_PRIMARY = RGBColor(0x0D, 0x7A, 0x3E)
LT_PRIMARY_DARK = RGBColor(0x06, 0x5C, 0x2D)
LT_PRIMARY_LIGHT = RGBColor(0x18, 0xA0, 0x55)

LT_SECONDARY = RGBColor(0x0B, 0x5E, 0xA8)
LT_SECONDARY_DARK = RGBColor(0x08, 0x4A, 0x8A)
LT_SECONDARY_LIGHT = RGBColor(0x14, 0x74, 0xC4)

LT_TEXT_PRIMARY = RGBColor(0x11, 0x11, 0x11)
LT_TEXT_SECONDARY = RGBColor(0x2A, 0x2A, 0x2A)
LT_TEXT_TERTIARY = RGBColor(0x58, 0x58, 0x58)
LT_TEXT_MUTED = RGBColor(0x8A, 0x8A, 0x8A)

LT_POSITIVE = RGBColor(0x0D, 0x7A, 0x3E)
LT_NEGATIVE = RGBColor(0xC4, 0x30, 0x30)
LT_CAUTION = RGBColor(0xB0, 0x84, 0x15)
```

#### Spacing in EMUs (English Metric Units)
python-pptx uses EMUs internally. 1 inch = 914400 EMU. 1 pt = 12700 EMU. 1 px ≈ 9525 EMU at 96dpi.

```python
from pptx.util import Inches, Pt, Emu

# Slide margins (32px ≈ 0.333 inches)
MARGIN = Inches(0.333)

# Common spacing
GAP_4 = Emu(4 * 9525)    # 4px
GAP_8 = Emu(8 * 9525)    # 8px
GAP_12 = Emu(12 * 9525)  # 12px
GAP_16 = Emu(16 * 9525)  # 16px
GAP_20 = Emu(20 * 9525)  # 20px
GAP_24 = Emu(24 * 9525)  # 24px
GAP_32 = Emu(32 * 9525)  # 32px
```

### 11.3 Chart Implementation Notes

When recreating charts programmatically:

1. **Extract data from existing charts** before restyling. Preserve all data series and labels.
2. **Apply colors in strict order.** First series = primary. Second = secondary. Never deviate.
3. **Remove all default chart decorations:** No chart borders, no plot area borders, no default gridlines, no default legends.
4. **Rebuild gridlines manually:** Horizontal only, border color, 0.5px, 3-5 lines.
5. **Rebuild legend manually:** Position below or to the right. Use colored dots + labels.
6. **Background of chart area:** surface-1 with border.

### 11.4 File Outputs

When generating output files:
- Presentation: `.pptx`
- Design reference: `.pdf` or `.md`
- Brand assets: `.svg` for logo, `.png` for raster
- All files should embed fonts or reference Google Fonts URLs

### 11.5 Quality Checklist

Before declaring any slide complete, verify:

- [ ] Background is exactly `#0A0A0A` (dark) or `#F9FAFB` (light)
- [ ] Header bar present with logo, wordmark, confidential, page number
- [ ] 1px separator below header
- [ ] Title in EB Garamond, 18-24px, weight 400
- [ ] Subtitle in Inter, 13px, weight 500, primary color, UPPERCASE
- [ ] All body text in Inter, 11px, text-secondary
- [ ] All numbers in JetBrains Mono
- [ ] Chart series colors follow the strict order
- [ ] No vertical gridlines
- [ ] Source line present in footer
- [ ] No bold text anywhere (max weight 500)
- [ ] No centered chart titles
- [ ] No decorative elements
- [ ] Spacing matches Section 5 values
- [ ] No more than one hero number per slide
- [ ] All tags/labels follow the tag specification
- [ ] No font used below its minimum size (EB Garamond ≥ 14px)
- [ ] Light mode uses Vivid Strata colors, not dark mode colors

---

## APPENDIX A — COMPLETE HEX REFERENCE (COPY-PASTE)

### Dark Mode
```
Background:     #0A0A0A
BG Alt:         #070707
Surface 1:      #111111
Surface 2:      #181818
Surface 3:      #1E1E1E
Border:         #1E1E1E
Border Light:   #282828

Primary:        #5A8F6A
Primary Dark:   #3D6E4A
Primary Dkst:   #2D5435
Primary Light:  #7BAF8B
Primary Ltst:   #A3CBAF
Primary Muted:  #5A8F6A40

Secondary:      #4A7DA8
Secondary Dark: #345E82
Secondary Lt:   #6B9DC8
Secondary Ltst: #92BDE0
Secondary Mut:  #4A7DA840

Extended Warm:  #8B7355
Extended WmLt:  #A0856B
Extended Cool:  #7A7A9B

Text Primary:   #F0F0F0
Text Secondary: #C0C0C0
Text Tertiary:  #999999
Text Muted:     #666666
Text Faint:     #444444

Positive:       #5A8F6A
Negative:       #C45B5B
Caution:        #C4A35B
Neutral:        #999999
```

### Light Mode (Vivid Strata / Cool White)
```
Background:     #F9FAFB
BG Alt:         #F3F4F6
Surface 1:      #FFFFFF
Surface 2:      #F6F7F8
Surface 3:      #EFF0F2
Border:         #DDE0E4
Border Light:   #E6E8EB

Primary:        #0D7A3E
Primary Dark:   #065C2D
Primary Light:  #18A055
Primary Muted:  #0D7A3E18

Secondary:      #0B5EA8
Secondary Dark: #084A8A
Secondary Lt:   #1474C4
Secondary Mut:  #0B5EA818

Text Primary:   #111111
Text Secondary: #2A2A2A
Text Tertiary:  #585858
Text Muted:     #8A8A8A

Positive:       #0D7A3E
Negative:       #C43030
Caution:        #B08415
Neutral:        #8A8A8A
```

### Chart Series Quick Reference
```
Dark Mode:
  1: #5A8F6A
  2: #4A7DA8
  3: #7BAF8B
  4: #6B9DC8
  5: #8B7355
  6: #7A7A9B

Light Mode:
  1: #0D7A3E
  2: #0B5EA8
  3: #18A055
  4: #1474C4
  5: #8B7355
  6: #7A7A9B
```

### Font Stack
```
Display: 'EB Garamond', Georgia, 'Times New Roman', serif
Body:    'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif
Data:    'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, monospace

Google Fonts URL:
https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@300;400;500&display=swap
```

---

## APPENDIX B — SLIDE TITLE WRITING GUIDE

Slide titles should be **claims, not topics.** They tell the audience what to conclude from the data.

### Examples

| ❌ Bad (Topic) | ✅ Good (Claim) |
|---------------|----------------|
| Hyperscaler Capex | Hyperscaler Capex Has Reached Escape Velocity |
| AI Training Costs | Training a Frontier Model Now Costs Over $1 Billion |
| Power Demand | Datacenter Power Demand Will Exceed 120GW by 2028 |
| Copper Market | AI Datacenters Require 5-10× More Copper Per Square Foot |
| Our Portfolio | The Portfolio Is Concentrated in Supply-Constrained Assets |
| Market Overview | Three Physical Constraints Gate All AI Progress |

### Subtitle Pattern
The subtitle provides the key number or qualifier. It's always UPPERCASE, primary color, Inter 13px, weight 500.

| Title | Subtitle |
|-------|----------|
| Hyperscaler Capex Has Reached Escape Velocity | $600B PROJECTED ANNUAL SPEND BY 2026 |
| Training a Frontier Model Now Costs Over $1 Billion | ~100,000× GROWTH IN COMPUTE SINCE 2017 |
| The Portfolio Is Concentrated in Supply-Constrained Assets | 12 POSITIONS · 4 SECTORS · 87% IN PHYSICAL LAYER |

---

## APPENDIX C — LIGHT MODE USAGE GUIDELINES

Light mode is the SECONDARY mode. It is used for:
- Print materials (PDFs for distribution)
- Email attachments (research notes sent to LPs)
- Documents meant to be read on paper
- Contexts where a projector or screen cannot display dark content well

Light mode is NOT used for:
- Primary presentations (use dark mode)
- Website/app interfaces (use dark mode)
- Cover slides (always dark)

When creating a light-mode version of a presentation:
1. Switch all backgrounds to `#F9FAFB`
2. Switch all surface colors to the light mode surface palette
3. Switch all primary/secondary colors to the Vivid Strata light values
4. Switch all text colors to the light mode text hierarchy
5. Charts use light mode chart series colors
6. Borders become `#DDE0E4`
7. Everything else (fonts, spacing, proportions, layout) stays IDENTICAL

---

*END OF SPECIFICATION*
*The Stack — Strata Design System v1.0*
*February 2026*
*CONFIDENTIAL*
