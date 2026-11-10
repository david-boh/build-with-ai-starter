---
name: Market Precision
colors:
  surface: '#faf9ff'
  surface-dim: '#d7d9e6'
  surface-bright: '#faf9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#ebedfa'
  surface-container-high: '#e5e8f4'
  surface-container-highest: '#e0e2ee'
  on-surface: '#181b24'
  on-surface-variant: '#434656'
  inverse-surface: '#2d303a'
  inverse-on-surface: '#eef0fd'
  outline: '#737687'
  outline-variant: '#c3c5d8'
  surface-tint: '#004ee8'
  primary: '#0049db'
  on-primary: '#ffffff'
  primary-container: '#2962ff'
  on-primary-container: '#f7f5ff'
  inverse-primary: '#b6c4ff'
  secondary: '#5a5e6b'
  on-secondary: '#ffffff'
  secondary-container: '#dfe2f2'
  on-secondary-container: '#606471'
  tertiary: '#9e3500'
  on-tertiary: '#ffffff'
  tertiary-container: '#c74500'
  on-tertiary-container: '#fff4f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#003ab3'
  secondary-fixed: '#dfe2f2'
  secondary-fixed-dim: '#c3c6d5'
  on-secondary-fixed: '#171b26'
  on-secondary-fixed-variant: '#434653'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#faf9ff'
  on-background: '#181b24'
  surface-variant: '#e0e2ee'
  bull-green: '#089981'
  bull-green-tint: '#E5F6F3'
  bear-red: '#F23645'
  bear-red-tint: '#FEECEE'
  border-hairline: '#E0E3EB'
  surface-subtle: '#F0F3FA'
  dark-bg-base: '#131722'
  dark-surface: '#1E222D'
  dark-border: '#2A2E39'
  dark-bull-tint: rgba(8, 153, 129, 0.15)
  dark-bear-tint: rgba(242, 54, 69, 0.15)
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-base-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  body-base-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

The design system establishes a high-density, analytical environment tailored for traders, institutional investors, and modern retail market participants. The brand voice is precise, authoritative, highly responsive, and uncluttered. It eliminates decorative ambiguity in favor of pure data fidelity, clarity, and rapid scanability.

The visual style blends **Corporate / Modern FinTech** with **Instrumental Minimalism**:
- Pristine typographic hierarchy supporting fast visual parsing of alphanumeric data, ticker symbols, ratios, and percentages.
- High-contrast chromatic signals reserved exclusively for market directionality (bullish versus bearish momentum) and interactive anchors.
- Clean 1px structural framing with soft hairline dividers rather than aggressive dropshadows.
- Dual-theme resilience ensuring equal legibility and zero loss of contrast in both blinding midday desks and low-light multi-monitor trading setups.

## Colors

The color palette centers on financial accuracy, functional contrast, and clear state communication:

- **Primary (`#2962FF`):** Reserved for primary navigation indicators, links, active tab highlights, focus rings, and high-priority action buttons.
- **Directional Signals:**
  - **Bull Green (`#089981`):** Represents positive price changes, upward momentum, bid strength, and outperforming sectors. Never use standard lime or low-contrast greens.
  - **Bear Red (`#F23645`):** Distinct crimson-red for negative yields, loss indicators, ask pressures, and downward revisions.
- **Neutrals & Surfaces:**
  - **Light Mode:** Canvas defaults to pure `#FFFFFF` paired with `#F0F3FA` for track backgrounds, search fields, and sub-panels, framed by crisp `#E0E3EB` hairline dividers.
  - **Dark Mode:** Canvas shifts to deep navy-charcoal `#131722` with `#1E222D` card fills and `#2A2E39` borders. Text transitions to `#D1D4DC` for body and `#FFFFFF` for primary values.
- **Semantic Usage Rule:** Do not tint non-financial decorative elements with green or red; keep functional actions blue, charcoal, or neutral to avoid false analytical triggers.

## Typography

The design system adopts **Inter** across all UI layers for its balanced mechanical structure, extensive weight range, and native tabular figure (`tnum`) features.

- **Tabular Figures (`font-feature-settings: "tnum"`):** Mandatory for all numeric stock quotes, percentages, market caps, and volume metrics to ensure columns line up without jittering during live stream changes.
- **Ticker Hierarchy:** Stock tickers (e.g., `AAPL`, `SPX`) use uppercase semibold or bold weights with a subtle tracking boost (`0.02em`).
- **Hierarchy Balance:** Large display typography features tighter negative tracking (`-0.02em` to `-0.03em`) for a solid, editorial market presence, while micro metadata and table headers use uppercase labels with open tracking (`0.06em`).

## Layout & Spacing

The system enforces a 12-column responsive layout built for data-dense interfaces:

- **Desktop (>= 1280px):** 12-column grid, max content width capped at `1440px` centered, `2.5rem` outer margins, and `1.5rem` gutters. Multi-column dashboard layouts divide naturally into 8/4 splits (Primary Chart / Market Breadth & Sector Lists).
- **Tablet (768px - 1279px):** 8-column layout, `1.5rem` margins, dynamic horizontal scroll carousels for pill filter bars, and 2-column stacked card modules.
- **Mobile (< 768px):** 4-column layout, `1rem` margin, full-bleed data tables with sticky primary ticker columns, and compact single-column financial cards.
- **Component Rhythm:** Interior component paddings follow an 8pt step system with half-steps (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`) to keep analytical widgets compact without visual crowding.

## Elevation & Depth

Visual hierarchy relies on **crisp structural containment and flat tonal zoning** rather than multi-layered ambient blur shadows:

- **Layer 0 (Canvas Base):** Plain `#FFFFFF` (light) or `#131722` (dark).
- **Layer 1 (Card & Module Surfaces):** Bounded by 1px solid hairline borders (`#E0E3EB` in light, `#2A2E39` in dark). In light mode, subtle surface shifts to `#F0F3FA` establish inset tracks for gauge meters, pill controls, and secondary panels.
- **Layer 2 (Overlays & Menus):** Dropdowns, search modals, and flyout ticker tools use a sharp, controlled shadow: `0 4px 16px rgba(19, 23, 34, 0.08)` (light) or `0 8px 24px rgba(0, 0, 0, 0.45)` (dark), always reinforced by a 1px perimeter stroke.
- **Zero-Shadow Philosophy:** High-density data tables, metric bars, and filter strips feature zero shadow elevation to prevent visual fatigue and blur during data updates.

## Shapes

The geometric language balances technical discipline with approachable modern surfaces:

- **Default Radius (`roundedness: 2` - 0.5rem / 8px):** Standard for main content cards, market widgets, interactive modal containers, and metric summary boxes.
- **Pill Geometry (Full Rounded / `9999px`):** Reserved exclusively for quick-filter horizontal scrollbars (e.g., "Ideas", "Hotlists", "Top stories"), badge tags, search bars, and floating market action buttons.
- **Micro Radii (0.25rem / 4px):** Used on ticker symbols, inline percentage change badges, mini-sparklines, and progress performance bars.

## Components

### Buttons & Interactive Controls
- **Primary Action:** Solid `#131722` (or `#2962FF` for trade triggers), white text, `8px` radius, medium weight. On hover: opacity drops to `0.92`.
- **Secondary / Ghost:** Transparent background with a 1px `#E0E3EB` border. In dark mode, `#2A2E39` stroke. Hover shifts background to `#F0F3FA`.
- **Icon / Utility Buttons:** 32px or 40px circular/rounded squares for language, profile, and theme switches with crisp monochrome icons.

### Pill Filters & Segmented Controls
- **Inactive State:** Transparent background, muted text (`#787B86`), 14px font size, horizontal padding of `14px`, height `32px`.
- **Active State:** Solid dark fill (`#131722`) with pure white text, fully rounded pill shape (`9999px`). In dark theme, uses `#2962FF` or high-contrast white with dark text.

### Financial Ticker Badges & Currency Tags
- **Ticker Block:** Ticker symbols rendered in bold uppercase (`SPX`, `AAPL`) paired with an optional circular market avatar or sector badge (32x32px).
- **Exchange Tag:** Soft neutral container background (`#F0F3FA`), 11px uppercase bold font, 2px 6px padding, 4px rounded radius.

### Performance Bars & Sector Breadth Gauges
- **Track:** 4px to 6px height, flat `#F0F3FA` (light) or `#2A2E39` (dark) track container.
- **Fill Indicator:** Bi-directional from midpoint or baseline. Bullish gains fill from left or center using `#089981`. Bearish pullbacks use `#F23645`. Rounded terminal edges (2px).
- **Metric Anchor:** Tabular percentage aligned to the right, colored in full-saturation `#089981` (+X.XX%) or `#F23645` (-X.XX%).

### Financial Cards & Tabular Lists
- **Cards:** Surrounded by 1px `#E0E3EB` hairline borders, padded with `1rem` to `1.5rem` spacing. Header houses title, timeframe badge, and chevron controls.
- **Data Tables:** Striped or clean lined rows separated by 1px bottom divider `#F0F3FA`. Cell height 48px, numeric columns aligned right with monospace tabular figures, ticker descriptions left-aligned.
- **Hover Row Behavior:** Quick transition to `#F8FAFD` (light) or `#1E222D` (dark) with cursor pointer.

### Inputs & Global Search Bar
- **Global Search:** Capsule pill shape (`9999px`), light background `#F0F3FA`, left-aligned search glyph, right-aligned keyboard shortcut chip (`Ctrl+K` or `⌘K`), zero border in idle state, transitioning to 1px `#2962FF` on focus.