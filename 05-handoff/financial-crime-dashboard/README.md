# Handoff: Financial Crime Suite Dashboard

## Overview

An interactive operations dashboard for NymCard's Financial Crime Suite, scoped to a **CRO / Head of Risk** persona. Covers five capability areas — Fraud Monitoring, Risk Management, AML & Monitoring, Identity & KYC, and a unified Overview — all connected through the same customer record and signal pipeline that underpins nCore's Financial Crime layer.

---

## About the Design Files

The files in this bundle are **high-fidelity HTML prototypes** — design references showing intended look, layout, and interactive behaviour. They are not production code to ship as-is.

The task is to **recreate these designs in the existing NymCard Next.js codebase** (`06-build/`) using its established component patterns, Tailwind tokens, and Geist font stack. The HTML prototypes use two shared CSS files from the design-system kit (`colors_and_type.css`, `dashboards/app.css`) — treat those as the token reference, not as production stylesheets.

---

## Fidelity

**High-fidelity.** Pixel-level intent is final:
- Colors are exact tokens from `tokens.json v1.3.0`
- Typography is Geist Sans / Geist Mono per the design system
- Spacing follows the 4px base grid (`space-1` through `space-13`)
- Radii use the locked token set (`radius-md` 8px, `radius-lg` 16px, `radius-xl` 24px)
- All interactions (hover lifts, stream animation, dark mode) are implemented and should be carried over

---

## Screens / Views

### App Shell (persistent)

**Sidebar** — `252px` wide, `var(--surface-white)` background, `1px solid var(--surface-border-subtle)` right border. Collapses to `76px` icon-only on toggle.
- Brand mark: 30×30px, `border-radius: 9px`, gradient fill `var(--gradient-cta-echo)` (`#304DBB → #5B4FD9`)
- Wordmark: Geist 600, 17px, `letter-spacing: -0.02em`. "Card" portion in `var(--brand-primary)` `#304DBB`
- Section labels: Geist Mono, 10px, `letter-spacing: 0.13em`, uppercase, `var(--text-muted)` — **exception to the no-caps rule** — these are functional nav labels, not eyebrows
- Nav items: 14px Geist 500, `border-radius: var(--radius-md)` (8px), 9px/12px padding. Active state: `background: rgba(48,77,187,0.10)`, `color: var(--brand-primary)`
- Footer: user avatar 34×34 `radius-pill`, name Geist 600 13px, role 11px `var(--text-muted)`

**Topbar** — `64px` tall, `var(--surface-white)`, `1px` bottom border. Contains:
- Hamburger collapse button: 34×34, `radius-md`
- Page title: breadcrumb in Geist Mono 11px (`var(--text-muted)`), h1 in Geist 600 18px `letter-spacing: -0.01em`
- Live pulse indicator: 7px dot `var(--color-success)` pulsing at 4s cycle, Geist Mono 11px label
- Search bar: 280px, 38px tall, `var(--surface-soft)` bg, `radius-md`, 13px placeholder
- Date range segmented control: 3 options (24h / 7d / 30d)
- Theme toggle: sun/moon icon swap on click
- Notification bell with red dot

**Dark mode:** toggled via `.dark` class on `<html>`. All surface/text/shadow tokens remap — see `colors_and_type.css`. Persists to `localStorage` key `nc-fc-theme`. Respects `prefers-color-scheme` on first visit.

---

### 1. Overview

**Purpose:** CRO morning briefing — portfolio risk posture at a glance before drilling into any specific module.

**Layout:** Single scrolling column inside `content` area (24px padding). Sequence:
1. Page head row (title + actions)
2. 4-column KPI strip
3. 2/3 + 1/3 grid row (risk distribution | rating changes)
4. 3-column grid row (fraud trend chart | typology list | live mini-stream)
5. Full-width signal engines panel

#### KPI Tiles (4-up grid)

Each tile: `var(--surface-white)` bg, `1px solid var(--surface-border-subtle)`, `radius-lg` (16px), `22px` padding, `box-shadow: var(--shadow-sm)`. Hover: `translateY(-3px)` + `var(--shadow-lift)`.

| Tile | Value | Delta colour |
|------|-------|-------------|
| Open alerts | 342 | up/danger |
| High + very high risk | 2,192 | up/danger |
| Cases in review | 47 | down/success (good down) |
| SAR / STR filed MTD | 23 | up/brand-purple |

Icon container: 30×30, `radius-md`, tinted bg at `rgba(color, 0.10)`.

Delta row: `delta up` = `var(--color-success)` + up arrow SVG. `delta down` = `var(--color-danger)` + down arrow SVG. Font: 12px Geist 600.

#### Customer Risk Distribution Panel (2/3 width)

Panel: `var(--surface-white)`, `radius-lg`, `shadow-sm`, full overflow-hidden. Header: 14px Geist 600 title + right-aligned badge.

Distribution rows (one per tier): `grid-template-columns: 76px 1fr 68px 52px`. Bar track: 9px tall, `radius-sm`, `var(--surface-soft)` background. Bar fill: tier color. Count: Geist Mono 12px. Percentage: Geist Mono 11px `var(--text-muted)`.

Tiers and colours:
- **Low** — `#10B981` (`var(--color-success)`) — 410,000 customers
- **Medium** — `#22D3EE` (`var(--accent-cyan)`) — 58,400
- **High** — `#F59E0B` (`var(--color-warning)`) — 1,884
- **Very High** — `#EF4444` (`var(--color-danger)`) — 308

#### Rating Changes Watchlist (1/3 width)

List rows (`.lrow`): flex, 14px gap. Icon: 34×34 `radius-md`, `rgba(239,68,68,0.08)` bg, danger-coloured SVG. Name+segment: Geist 500 13.5px / Geist 400 12px muted. Right column: stacked from→to risk chips with arrow, and time string 11px muted.

Risk chips: 20px tall, 7px horizontal padding, `radius-sm`. 
- LOW: `rgba(16,185,129,0.12)` bg, `#047857` text
- MEDIUM: `rgba(34,211,238,0.14)` bg, `#0E7C8E` text
- HIGH: `rgba(245,158,11,0.13)` bg, `#B45309` text
- VERY HIGH: `rgba(239,68,68,0.12)` bg, `#B91C1C` text

#### Fraud Trend Chart

SVG line chart. Width: fills panel. Height: 130px. Padding: `{t:8, r:14, b:22, l:32}`. Three lines: approve (green), challenge (amber), block (danger). Grid lines: `var(--surface-border-subtle)`. X-axis labels: Geist Mono 9px, every 3rd day label. Y-axis: no labels. Axes: 4 horizontal grid lines only.

#### Alert Typologies

6 rows, each `grid-template-columns: 148px 1fr 48px`. Bar track 8px. Values from `DATA.risk.typologies`. Colours:
- Structuring: `var(--brand-primary)` `#304DBB`
- Rapid movement: `var(--accent-indigo)` `#5B6DD8`
- Sanctions hit: `var(--color-danger)` `#EF4444`
- High-risk geo: `var(--accent-violet)` `#6D28D9`
- Velocity: `var(--accent-cyan)` `#22D3EE`
- Dormant reactivation: `var(--accent-teal)` `#0EA5E9`

#### Live Mini-Stream

Capped at 4 visible rows. Each row: flex, 8px gap, score donut (38×38 SVG), kind + timestamp, decision chip. New rows prepend every 2.2s with `streamIn` fade-up animation (`opacity: 0 → 1, translateY -6px → 0, 250ms ease-out`).

#### Signal Engines Panel

Flex-wrap grid of 9 badge chips. Each: `padding: 5px 10px`, `radius-sm`, `var(--surface-soft)` bg, `1px solid var(--surface-border-subtle)`, 12px Geist 500. 6px green dot prefix. Engines: Geographic physics, Temporal context, Session context, Device trust, Behavioral baseline, Transition anomaly, Merchant familiarity, Registry metadata, Entity state.

---

### 2. Fraud Monitoring

**Purpose:** Real-time fraud analyst view — watch every authorization decision as it fires, with full SHAP attribution on the last blocked transaction.

**Layout:** KPI strip → 2/3+1/3 row (stream | SHAP+3DS) → full-width trend chart.

#### Live Authorization Stream (2/3)

Column header row: `var(--surface-soft)` bg, 36px tall, Geist Mono 10px uppercase `var(--text-muted)` labels. Columns: `38px 130px 1fr 88px 84px`.

Stream rows: same column grid. Max 18 rows; overflow-y auto scrolls. New row prepends at top every 2.2s. Animation: `streamIn` 250ms. Fields:
- **Score donut**: 38×38 SVG. Outer ring: 3.5px stroke `var(--surface-soft)`. Inner arc: score-coloured fill. Text: Geist Mono 9px 600. Colour thresholds: `< 30` → green, `30–64` → amber, `≥ 65` → danger.
- **Reference**: Geist Mono 12px `var(--text-primary)`. Format: `AUTH ····NNNN`
- **Transaction**: kind (13px secondary) + timestamp (11px muted), stacked
- **Amount**: Geist Mono 13px, right-aligned, tabular nums
- **Decision chip**: 22px tall, 8px horizontal padding, `radius-sm`, Geist Mono 10.5px 600, `letter-spacing: 0.04em`
  - APPROVE: `rgba(16,185,129,0.12)` / `#047857`
  - CHALLENGE: `rgba(245,158,11,0.13)` / `#B45309`
  - BLOCK: `rgba(239,68,68,0.12)` / `#B91C1C`
  - Dark mode variants: 0.18 opacity backgrounds, lightened text colours

#### SHAP Attribution Panel (1/3)

Score display: 42px Geist 700, `letter-spacing: -0.03em`, `var(--color-danger)`. Below: "Risk score" 12px muted + BLOCK chip.

SHAP rows: `grid-template-columns: 156px 1fr 50px`. Track: 10px tall `radius-sm`. Risk-direction fills: `var(--color-danger)`. Safe-direction fills: `var(--color-success)`. Value: Geist Mono 12px, coloured by direction, `+`/`−` prefix.

Signals (from data): Geographic physics +34%, Device trust +27%, Transition anomaly +19%, Behavioral baseline −12%, Merchant familiarity −8%.

#### 3DS Panel (1/3, below SHAP)

3-stat strip: Frictionless 86.9% (success), Challenged 3.1% (warning), OTP pass rate 79.4% (primary).

#### Decision Rate Chart

Height 150px. Same line chart pattern as Overview but larger.

---

### 3. Risk Management

**Purpose:** CRO portfolio view — understand risk tier distribution, manage review queue, track rating escalations.

**Layout:** KPI strip → 1/3+2/3 row (donut+tiers | review queue) → 2-column row (rating changes | rules table).

#### Portfolio Distribution Panel (1/3)

Donut SVG: 110×110. `cx=55, cy=55, r=40, stroke-width=13`. Four arcs in tier colours, clockwise from top. Center overlay: 20px Geist 600 "0.46%" + 10px muted "HIGH+".

Below donut: tier rows same as Overview distribution rows.

#### Review Queue (2/3)

Max-height 320px, overflow-y scroll. Rows use a 3px `border-radius: 2px` priority bar as leftmost element:
- VERY HIGH: `var(--color-danger)`
- HIGH: `var(--color-warning)`
- MEDIUM: `var(--accent-indigo)` `#5B6DD8`
- LOW: `var(--text-muted)`

Row contents: customer ID + segment, risk chip, due string (danger-coloured if overdue), "Review" button (26px height, 11.5px).

#### Rating Changes

Same `.lrow` pattern as watchlist. From→to chips with SVG arrow between.

#### Active Rules Table

Sticky header: Geist Mono 10.5px uppercase, `var(--text-muted)`, `var(--surface-soft)` bg. Rows: 48px height. Status badge: green for Active, slate for Draft.

---

### 4. AML & Monitoring

**Purpose:** MLRO / AML operations — monitor open alerts, manage typologies, track sanctions hits, queue SAR/STR filings.

**Layout:** KPI strip → 1/3+2/3 (typologies | alert queue) → full-width SAR/STR queue.

#### Alert Queue Table

7 rows. Columns: Alert ID (mono), Typology, Customer (mono, masked), Amount (right-aligned, mono), Status badge.

Status colours: Escalated → red, Open → amber, Under review → blue, Closed → slate.

#### SAR / STR Filing Queue

`.str-row` grid: `grid-template-columns: 84px 1fr 120px 80px`. Each row: filing ID (mono bold), typology name + customer ID (stacked cell-2), status badge, maker + age (11.5px muted).

Status: Awaiting approval → amber, Draft → blue, Filed → green.

Note in panel header: "Maker-checker enforced — AI Ops Assistant drafts, analyst approves". Blue badge "Maker-checker active". This is a product truth — the AI generates draft narratives but a human analyst must approve before filing.

---

### 5. Identity & KYC

**Purpose:** KYC/compliance ops — track verification coverage, document status, and periodic review cadence per risk tier.

**Layout:** KPI strip → 3-column row (verification types | document lifecycle | review cadence by tier) → full-width KYC queue.

#### Verification Type Panel

4 horizontal progress bars. Labels: KYC—Individual (87% blue), KYB—Business (9% indigo), IDV only (3% cyan), Liveness verified (84% success). Bar track: 6px, `radius-sm`, `var(--surface-soft)`.

#### Document Lifecycle

6 `.doc-row` items. Each: 28×28 icon container, label + "X on file" sub, status badge (green "Valid" or amber "Action needed").

#### Review Cadence Tiles

4 stacked `.identity-tier` cards. `border-radius: var(--radius-md)` (8px), `var(--surface-soft)` bg, coloured border per tier (`rgba(color, 0.3)`). Contents: risk chip + review interval (20px Geist 600) + sub-text (12px muted).

#### KYC Pending Queue

6 rows. Columns: Customer (mono bold), Type badge (KYC/KYB blue chip), Risk tier chip, Documents (plain text), Due date (danger if overdue, warning if today), Status badge.

---

## Interactions & Behaviour

### Navigation
- Sidebar nav items switch the active view. Only one `.view` is `display: block` at a time; all others `display: none`.
- Sidebar collapses to 76px icon-only via `.collapsed` class on the `<aside>`.

### Live Fraud Stream
- New stream rows prepend every **2,200ms** via `setInterval`.
- Row source: cycles through a 10-item template array (`STREAM_TEMPLATES`).
- Max rows in stream: **18** (full view), **4** (overview mini).
- Animation: `@keyframes streamIn` — `opacity: 0 → 1`, `translateY(-6px) → none`, **250ms** `cubic-bezier(0.16, 1, 0.3, 1)`.
- Score donut colours: `< 30` → `#10B981`, `30–64` → `#F59E0B`, `≥ 65` → `#EF4444`.

### Dark Mode
- Toggle adds/removes `.dark` on `<html>`.
- Topbar icon swaps: sun SVG ↔ moon SVG.
- Persists to `localStorage` key `nc-fc-theme`.
- On first visit: reads `prefers-color-scheme`.
- In dark mode, decision chip opacities shift from 0.12→0.18, text lightens to `#34D399` / `#FBBF24` / `#F87171`.

### Segmented Controls
- Date range and table filters: click moves `.on` class to clicked button. No data reload in prototype — wire to API calls in production.

### Card Hover
- KPI tiles: `translateY(-3px)` + `box-shadow: var(--shadow-lift)` on hover. Duration: 250ms `ease-out`. **No scale transform.**

### Live Clock
- `document.getElementById('liveTs')` updates every 1,000ms with current time in `HH:MM:SS` format.

### Charts
- SVG drawn in JS on `DOMContentLoaded`, redrawn on `window.resize`.
- Chart function signature: `lineChart(svgId, series, colors, height)`.
- Padding: `{ t:8, r:14, b:22, l:32 }`. Grid: 4 horizontal lines `var(--surface-border-subtle)`. X-axis: Geist Mono 9px, every 3rd label. No Y-axis labels.

### Collapse Animations
- Sidebar width transition: `var(--dur-base)` 250ms `var(--ease-out)`.
- Sidebar section labels and wordmark: `opacity: 0` on `.collapsed`.

---

## State Management

### Required state
```
currentView: 'overview' | 'fraud' | 'risk' | 'aml' | 'identity'
sidebarCollapsed: boolean
theme: 'light' | 'dark'
dateRange: '24h' | '7d' | '30d'
streamPointer: number  // cycles through stream templates
```

### Derived state (real-time in production)
- KPI tile values — fetch from `/api/financial-crime/summary?range=24h`
- Stream rows — subscribe to authorization event websocket
- Chart series — fetch from `/api/financial-crime/trend?range=14d`
- Alert / case queues — fetch from `/api/financial-crime/alerts` + `/api/cases`

### Data shape (see `dashboards/data.js`)
All prototype data lives in `window.DATA`. In production:
- `DATA.fraud` → Fraud Monitoring API
- `DATA.risk` → Risk Management API
- `DATA.fraud.engines` → static config (9 signal engines, always-on)

---

## Design Tokens

Full token set in `tokens.json` (project root) and `colors_and_type.css`. Key values:

### Colours
```
--brand-primary:        #304DBB
--brand-purple:         #5B4FD9
--brand-navy:           #0E1A33
--accent-cyan:          #22D3EE
--accent-indigo:        #5B6DD8
--accent-teal:          #0EA5E9
--accent-violet:        #6D28D9
--color-success:        #10B981
--color-warning:        #F59E0B
--color-danger:         #EF4444
--surface-white:        #FFFFFF
--surface-soft:         #F4F6FF
--surface-border-subtle:#E8EBF5
--text-primary:         #0E1A33
--text-secondary:       #4A5578
--text-muted:           #7A839E
```

### Dark mode overrides (on `.dark`)
```
--surface-white:        #0E1A33
--surface-soft:         #1A2547
--surface-card:         #1A2547
--surface-border-subtle:rgba(255,255,255,0.08)
--text-primary:         #FFFFFF
--text-secondary:       rgba(255,255,255,0.70)
--text-muted:           rgba(255,255,255,0.50)
```

### Typography
```
Font family (display + body): "Geist", system-ui, sans-serif
Font family (mono):           "Geist Mono", ui-monospace, monospace
Weights: 400 regular, 500 medium, 600 semibold, 700 bold
```

### Spacing (4px grid)
```
space-2:  8px    space-6: 24px    space-10: 64px
space-3: 12px    space-7: 32px    space-11: 96px
space-4: 16px    space-8: 40px
space-5: 20px    space-9: 48px
```

### Radii
```
radius-sm:  4px    radius-lg:     16px
radius-md:  8px    radius-xl:     24px
radius-pill: 9999px
```

### Shadows
```
shadow-sm:   0 2px 8px 0 rgba(14,26,51,0.04), 0 1px 2px 0 rgba(14,26,51,0.06)
shadow-md:   0 8px 24px -4px rgba(14,26,51,0.06), 0 4px 8px -2px rgba(14,26,51,0.04)
shadow-lift: 0 2px 6px -1px rgba(14,26,51,0.06), 0 18px 36px -10px rgba(14,26,51,0.14)
```

### Motion
```
dur-fast:      150ms
dur-base:      250ms
dur-deliberate:600ms
ease-out:      cubic-bezier(0.16, 1, 0.3, 1)
ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)
```

---

## Assets

| Asset | Location | Notes |
|-------|----------|-------|
| Geist Sans (TTF) | `fonts/` in project root | Regular 400, Medium 500, SemiBold 600, Bold 700 |
| Geist Mono | Google Fonts CDN | `https://fonts.googleapis.com/css2?family=Geist+Mono` |
| Dashboard base CSS | `dashboards/app.css` | App shell, KPI tiles, badges, tables, charts, stream rows |
| Design tokens CSS | `colors_and_type.css` | All CSS custom properties from `tokens.json` |
| Prototype data | `dashboards/data.js` | `window.DATA` — realistic placeholder data for all 6 products |
| Financial Crime controls reference (light) | `assets/financial-crime-controls-light.png` | Earlier design exploration — reference only |
| Financial Crime controls reference (dark) | `assets/financial-crime-controls-dark.png` | Earlier design exploration — reference only |

---

## Files

| File | Purpose |
|------|---------|
| `Financial Crime Dashboard.html` | **Primary design reference** — open in any browser |
| `dashboards/app.css` | Dashboard-specific CSS layer (app shell + all UI primitives) |
| `colors_and_type.css` | DS token layer (variables, dark mode, type scale, motion) |
| `tokens.json` | Machine-readable token source |
| `dashboards/data.js` | Realistic placeholder data (`window.DATA`) |
| `fonts/Geist-*.ttf` | Local Geist Sans font files |

---

## Implementation Notes for Claude Code

1. **Start from the existing Next.js app** at `06-build/`. Do not re-scaffold.
2. **Route:** suggest `app/dashboard/financial-crime/page.tsx` with sub-routes per view via a tab/nav component.
3. **Shared dashboard shell** (sidebar + topbar) likely already exists or should be extracted into a layout component at `app/dashboard/layout.tsx`.
4. **Stream simulation** in production should use a WebSocket subscription to the authorization event pipeline, not `setInterval`. The prototype's `setInterval` pattern is for demo only.
5. **Charts:** use the project's charting library if one exists (check `package.json`). If not, the SVG approach in the prototype is lightweight and sufficient for these line charts — port it to a React component.
6. **Dark mode:** the design system already implements `.dark` toggle via `localStorage`. Wire to the existing theme context if one exists in `06-build/`.
7. **Reduced motion:** all animations must be disabled under `prefers-reduced-motion: reduce` (already handled in `colors_and_type.css` — carry the pattern into React).
8. **No all-caps labels, no eyebrow components** outside the sidebar section dividers (which are functional, not decorative).
9. **The five capability views share a single customer record** — design the routing/state so navigation between views preserves any active customer context (e.g., selected customer ID in the URL).
