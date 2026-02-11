# Stack Holdings — React Deck Design Review

## Role
This agent is the **design QA reviewer** for the React presentation deck at `/deck-react`.
A parallel agent is migrating legacy HTML slides into React components. This agent reviews
each migrated slide for visual quality, canonical design consistency, and correct rendering.

## Canonical Reference
Full design system spec: `canonical_design.md` (root of repo).
Theme tokens: `lib/theme.ts`. CSS variables: `app/globals.css` `:root`.

## Key Architecture Decisions
- **Light mode** is active (`NEXT_PUBLIC_THEME_MODE=light` or default). All colors use Vivid Strata / Cool White palette.
- **Lazy-mount slides**: DeckPlayer only renders slide content when the slide is first visited. This prevents Chart.js from rendering at zero dimensions inside hidden (`display:none`) slides.
- **Global CSS preferred**: Slide styles go in `app/globals.css` with prefixed class names (e.g., `nnn-structure-*`). CSS modules don't reliably load in this project — avoid them.
- **Resize event**: DeckPlayer dispatches `window.resize` 80ms after each slide change to help Chart.js recalculate.
- **Slide numbering**: Slide 2 (Leadership) was inserted after legacy slide 1. All subsequent legacy slides shift +1 (legacy slide N = deck slide N+1).

## Design Checklist (per slide)
When reviewing a slide, verify:
1. Header bar: `[S] THE STACK` left + `Confidential · N / 62` right (skip for slide 1)
2. Separator: 1px solid border below header (skip for slide 1)
3. Section label: JetBrains Mono, micro size, uppercase, text-muted
4. Title: EB Garamond, h1 size (32px), weight 400, text-primary
5. Subtitle: Inter, h2-accent (15px), weight 500, primary green, UPPERCASE, ls 1.5px
6. Content fills viewport properly — no excessive dead space
7. Charts render with proper dimensions (not crammed/zero-width)
8. Chart colors follow strict series order: green first, blue second
9. Footer: source left (micro, text-muted, uppercase) + "February 2026" right (micro, text-faint)
10. No bold text (max weight 500), no decorative elements
11. Fonts correct: EB Garamond for titles/hero numbers, Inter for body, JetBrains Mono for data
12. Light mode palette: bg #F9FAFB, primary #0D7A3E, secondary #0B5EA8, text-primary #111111

## Slide Review Status

| Slide | Title | Status | Notes |
|-------|-------|--------|-------|
| 1 | Title / Cover (Stack Holdings) | PASS | Centered layout, green underline, confidential line. Clean. |
| 2 | Leadership (Managing Partners) | PASS | Two partner cards with green/blue left accents. Bios readable. Footer present. |
| 3 | Capital Split (Anchored in real assets) | PASS | Two thesis panels (green/blue) + donut chart. $20M center label. Legend below. |
| 4 | Capital Waterfall (How capital flows) | PASS | 5-bar waterfall with annotations. Green increase, red decrease, blue total. |
| 5 | NNN Opportunities (Illustrative NNN) | PASS | 3 property cards with images + data tables + 4-step process row. |
| 6 | NNN Structure (Florida: structure/financing) | PASS | Two-column split. Left: asset desc + WHY FLORIDA table + migration bar chart. Right: debt profile table + NOI surplus chart with balloon line. |
| 7 | Executive Summary (Two macro views) | PASS | Converted CSS module to global (`exec-summary-*`). Increased body font to 13px, centered vertical layout, green-accented intersection card. |
| 8 | Macro Shift (Section Divider) | PASS | Converted CSS module to global (`section-divider-*`). Removed duplicate SectionHeader. Clean divider: kicker + headline with green left border. |
| 9 | Federal Debt (Structural, not cyclical) | PASS | Area chart with actual/projected split. Green series, dashed projection. Chart renders cleanly. |
| 10 | Interest Expense (Major budget item) | PASS | 3-series stacked area (Revenue, Spending+Interest, Program Spending) with ACTUAL/PROJECTED divider plugin. |
| 11 | Interest vs Revenue ($1 in $5 to interest) | PASS | Line chart with recession shading bands + actual/projected divider. |
| 12 | | PENDING | |
| 13-62 | (remaining) | PENDING | |

## Files Owned By This Agent
These files are maintained by the design reviewer. The parallel migration agent should NOT edit them:
- `app/globals.css` — master stylesheet (all slide styles live here)
- `lib/theme.ts` — theme config, typography scale, spacing
- `components/deck/DeckPlayer.tsx` — deck player with lazy-mount and resize logic
- `components/ui/SlideHeaderBar.tsx` — header bar component
- `components/ui/SourceLine.tsx` — footer/source line component

## Files The Migration Agent Creates (this agent reviews)
- `components/slides/NN-*.tsx` — individual slide components
- `lib/data/slides/slideNN.ts` — slide data files
- `lib/data/types.ts` — data type definitions
- `components/deck/slideRegistry.tsx` — slide number to component mapping

## Typography Scale (current, scaled up from canonical for viewport fill)
| Level | Size | Notes |
|-------|------|-------|
| Display | 44px | Cover title |
| H1 | 32px | Slide titles |
| H1 Dense | 22px | Dense titles |
| H2 Accent | 15px | Subtitles, green uppercase |
| H3 | 15px | Panel headers |
| Body | 15px | All body copy |
| Caption | 13px | Chart titles, sources |
| Data | 14px | Numbers, metrics |
| Axis | 12px | Chart axis labels |
| Micro | 10px | Watermarks, page numbers |

## Known Fixes Applied
- **CSS modules broken**: Slides 06, 07, 08 all used CSS modules that weren't loading. Converted to global CSS classes with prefixes (`nnn-structure-*`, `exec-summary-*`, `section-divider-*`).
- **Chart.js zero-dimension render**: Added lazy-mount in DeckPlayer — slides only render content on first visit. Prevents Chart.js from caching zero-width layouts.
- **Slide padding**: `12px 32px 24px 32px` (top right bottom left). Responsive: `8px 24px 20px 24px` below 800px height.
- **Section divider duplicate content**: Slide 08 had both SectionHeader and a custom block rendering the same text. Removed SectionHeader for section dividers.
- **Dev helper**: DeckPlayer exposes `window.__deckGoTo(slideNumber)` for QA navigation via console.
- **Stale `.next` cache**: After heavy HMR, the `.next` cache can corrupt (`__webpack_modules__[moduleId] is not a function`). Fix: kill server, `rm -rf .next`, restart.

## Localhost Reliability Protocol
- Canonical recovery + checks live in `docs/DEV_SERVER_RUNBOOK.md`.
- Use `npm run dev:doctor` before claiming localhost is fixed.
- Never claim a fix until both return HTTP `200`:
  - `http://127.0.0.1:3000/deck-react-short`
  - `http://127.0.0.1:3000/deck-react-short-internal`
