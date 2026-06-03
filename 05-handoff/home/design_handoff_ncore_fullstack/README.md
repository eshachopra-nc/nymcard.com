# Handoff: nCore Full-Stack Section

## Overview
A single marketing-site section for **nymcard.com** that presents NymCard's six payment products as composable layers on the **nCore** platform, framed by an **AI Intelligence Layer** rail (left) and a **Unified Data Layer** rail (right). Clicking any product row opens a **Linear-style pop-out overlay** that reads as a mini product page (tagline, product surface, capability highlights, feature chips, and a "Learn more →" link to the product page).

The section lays out as a **50/50 split**: marketing copy on the left, the nCore visual on the right. Both halves sit in one centered container.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior, **not production code to ship directly**. The task is to **recreate this section in the target codebase's environment** (the nymcard.com build is Next.js + React with `lucide-react`) using its established components, tokens, and patterns. Where this prototype hardcodes values, map them onto the codebase's existing design-system tokens (see `colors_and_type.css`, the source-of-truth token sheet, included here).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, motion, and interactions. Recreate pixel-for-pixel using the codebase's primitives. The only deliberate placeholders:
- The six **product-surface mocks** inside the pop-outs are bespoke illustrative UI fragments. Swap for real product screens if available; otherwise reproduce as-is.
- **Learn more →** links point to product-page slugs (`/products/card-issuing`, etc.) that should resolve to the real product pages in the app.

## Files
- `nCore Full-Stack - Dark.html` — dark variant (no `data-theme`, or set `data-theme="dark"`-equivalent default).
- `nCore Full-Stack - Light.html` — light variant (`<html lang="en" data-theme="light">`). **Only difference from dark is the `data-theme="light"` attribute.**
- `colors_and_type.css` — NymCard design-system tokens (colors, type scale, spacing, radii, motion, fonts). Linked by both HTML files.
- `fonts/` — Geist Sans (400/500/600/700/900 + italic). Geist Mono loads from Google Fonts via `colors_and_type.css`.

Both variants reference Lucide via CDN (`https://unpkg.com/lucide@latest`). In the codebase, use `lucide-react` components instead.

---

## Screens / Views

### 1. Section (resting state)
**Purpose:** Communicate "one platform, every product" and let the user drill into any product.

**Layout (desktop, design width 1440px):**
- Outer `.section`: 1440px wide, centered, padding `96px 80px`.
- `.layout`: CSS grid `grid-template-columns: 1fr 1fr`, `gap: 64px`, `align-items: center` — **copy left, visual right (50/50)**.
- `.copy` (left column, left-aligned, max-width 520px): eyebrow → headline (44/52, 700) → intro → `.cta-row`. The CTA row is a flex row: a primary gradient button **Talk to sales** + a tertiary **Explore nCore →** link.
- `.visual` (right column): contains the `.ncore-shell`.
- `.ncore-shell`: rounded 28px card, padding `20px 20px 22px`. Top-left lowercase mono label `nCore`.
  - `.ncore-body`: CSS grid, `grid-template-columns: 58px 1fr 58px`, `gap: 28px`, `align-items: stretch`.
    - Left column: `.rail.ai` — vertical capsule, cyan border + glow, vertical text "AI INTELLIGENCE LAYER" (writing-mode vertical-rl, rotated 180°).
    - Middle column: `.rows` — flex column, `gap: 14px`, six `.prow` product rows. Also hosts the **cyan data pulse** (see below).
    - Right column: `.rail.data` — vertical capsule, purple border + glow, vertical text "UNIFIED DATA LAYER".
  - `.unify-band` (inside the shell, below `.ncore-body`, separated by a top border): the problem statement. A cyan icon tile (`fingerprint`) + two lines — **"One customer. One record."** (18px/700) and a muted sub-line *"Shared across every product, decision, and ledger entry — no duplicates, no reconciliation gaps."*

**Cyan data pulse `.data-pulse`:** a bright cyan glow segment (100px tall, soft box-shadow) that travels **down the vertical center of the product stack and back up** on a 4.8s `ease-in-out` loop (`@keyframes pulse-updown`). It is centered horizontally (`left:50%`) over the rows — the rows' centers are empty (name on the far left, chevron on the far right), so the pulse passes through open space, never over text. Vertically faded at both ends via a `mask-image` so it emerges and dissolves within the stack. Disabled under `prefers-reduced-motion`.

**Product row `.prow`:** (rows are intentionally minimal on the homepage — chips moved into the pop-out)
- `display: flex`, `align-items: center`, `justify-content: space-between`, `min-height: 66px`, padding `0 20px`, radius 14px, 1px border, pointer cursor.
- Left: `.prow-head` = icon tile (36×36, radius 10px) + product name (17px/600). No chips, no divider panel.
- Right: `.prow-go` = a `chevron-right` affordance tile (30×30) signalling the row opens a pop-out; brightens and nudges 2px right on hover.
- **Dashed connectors** (`.conn-l`, `.conn-r`): absolutely positioned, width 28px, sit in the 28px grid gap between each row and the rails. Each is `dot — dashed line — dot`. Left = cyan, right = purple.

**Six rows, in lifecycle order** (icon = Lucide name; rows show name only — the feature chips below live in each product's pop-out, not on the row):
1. **Cards** (`credit-card`) — chips: Prepaid · Debit · Credit · Wallets · Tokenization · Virtual Card
2. **Lending** (`circle-dollar-sign`) — chips: Origination · Credit Decisioning · Loan Servicing · Default Management
3. **Money Movement** (`arrow-left-right`) — chips: Domestic · Cross-Border · FX · Treasury · P2P · P2M · vIBAN
4. **Stablecoin Settlement** (`clock`) — chips: Stablecoin · On-Ramp · Prefunding · Off-Ramp · Orchestration
5. **Financial Crime** (`shield`) — chips: Identity · Fraud · AML · Sanctions · Risk · 3DS · Chargeback
6. **Reconciliation** (`file-text`) — chips: Auto-Mapping · Multi-source · Exception Handling · Ledger Posting

**Copy (verbatim):**
- Eyebrow: `nCore` · Headline: `One source of truth for every payment decision.`
- Intro: `Every product in the payments stack, with AI and Data running across all of them. Take one, or compose the whole platform.`
- CTAs: `Talk to sales` (primary) · `Explore nCore →` (tertiary)

### 2. Product pop-out (open state)
**Purpose:** A mini product page that teases the product and links to its full page.

**Trigger:** click (or focus + Enter/Space) on any `.prow`.

**Layout:**
- `.overlay`: fixed, full-viewport, flex-centered, padding 40px, `visibility: hidden` → `.open` makes visible.
- `.ov-backdrop`: dim + `backdrop-filter: blur(10px) saturate(120%)`, fades opacity 0→1 over 300ms. Click closes.
- `.popcard`: 820px wide (max 94vw), max-height 90vh with scroll, radius 22px, padding `32px 34px 30px`. Animates `scale(0.92) translateY(10px)` + opacity 0 → `scale(1) translateY(0)` + opacity 1 (transform 380ms `cubic-bezier(0.16,1,0.3,1)`, opacity 280ms).
- Structure inside:
  1. `.pop-head`: icon tile (44×44) + product name (20px/700) + close button (`x`, 34×34).
  2. `.pop-lede`: `.pop-tag` (20px/600 product tagline) + `.pop-sub` (14px/22 grey one-liner).
  3. `.pop-visual`: the product-surface mock (min-height 232px, radius 16px, bordered, subtle radial tint).
  4. `.pop-high`: 3-column grid of highlight cards (icon tile + 12.5px text).
  5. `.pop-caps-label`: mono uppercase "Capabilities", then `.pop-chips` (pill chips rendered from the product's `chips` array in the `PRODUCTS` map — this is the **only** place chips appear).
  6. `.pop-foot`: top border, then `Learn more →` (primary gradient button → product slug) + `Talk to us` (ghost button).

**Per-product pop-out content** (tagline / one-liner / 3 highlights / slug):

| Product | Tagline | Slug |
|---|---|---|
| Cards | Launch the card program your customers need. | /products/card-issuing |
| Lending | Embed credit into every payment flow. | /products/lending |
| Money Movement | Move money where your customers need it. | /products/money-movement |
| Stablecoin Settlement | Settle across corridors in real time. | /products/settlement |
| Financial Crime | Cover the full risk perimeter on one layer. | /products/financial-crime |
| Reconciliation | Reconcile across every product and system, automatically. | /products/reconciliation |

(Full sub-copy, highlight text + icons, and surface-mock markup live in the `PRODUCTS` JS object and the `<template id="mock-…">` blocks in each HTML file — copy them verbatim.)

**Product-surface mocks (one per product, in `.pop-visual`):**
- **Cards:** gradient card visual (number, cardholder, VISA) + "Recent issuance" key/value panel.
- **Lending:** conic score ring (720) + "Approved · AED 30,000" badge and terms.
- **Money Movement:** USD → AED flow node with FX rate + transfer/rails panels.
- **Settlement:** multi-currency bar list + net-position panel.
- **Financial Crime:** risk shield + 4-item passed checklist.
- **Reconciliation:** green 100%-matched conic ring + run summary.

---

## Interactions & Behavior
- **Open pop-out:** click or keyboard (Enter/Space) on a `.prow`. Populates the overlay from the `PRODUCTS` map and the matching `<template>`, re-runs `lucide.createIcons()`, adds `.open`, sets `body{overflow:hidden}`.
- **Close pop-out:** click backdrop, click close button, or press `Escape`. Removes `.open`, restores body scroll.
- **Row hover:** background lightens, border deepens to brand, `row-shadow-h` appears, the `chevron-right` affordance brightens and nudges 2px right.
- **Row focus-visible:** brand border + focus ring (`--row-focus`).
- **Cyan data pulse:** the `.data-pulse` glow travels down the vertical center of the product stack and back up continuously (4.8s loop). Disabled under `prefers-reduced-motion`.
- **Rails:** continuous ambient glow pulse (`glow-ai` / `glow-data`, 4s ease-in-out, staggered 0.6s). Disabled under `prefers-reduced-motion: reduce`.
- **Unify band:** static; reinforces the "one customer, one record" problem statement nCore solves.
- **Tertiary links / buttons:** arrow (`→`) translates 4px right on hover; primary button brightens; ghost button darkens slightly.
- **Reduced motion:** rail animations disabled; pop-out transform/opacity transitions are short and acceptable.

## State Management
Minimal, client-only:
- `activeProduct` (string key | null) — which product pop-out is open.
- `overlayOpen` (bool) — derived from `activeProduct`.
- On open: lock body scroll. On close: unlock.
- Static product data (`PRODUCTS` map) — in React, model as a typed array/object; render highlights and chips from it rather than cloning DOM. The mock surfaces become small presentational components keyed by product.

## Theming
Both files share one structure; theme is driven entirely by CSS custom properties:
- `:root` defines the **dark** token set.
- `:root[data-theme="light"]` overrides them for **light**.
- Switch by setting `data-theme="light"` (or removing it for dark) on `<html>`. In the app, wire this to the site's existing theme context. No markup or JS differs between themes.

Themed token groups (names as `--token`): page/shell surfaces, rail colors + glow, connectors, row surfaces/borders/hover, icon tile, chips, pop-out surfaces, highlight cards, product-surface panels (`--panel-*`, `--kv-*`, `--ring-*`, `--track`), and semantic `--go-*` (success green) / `--cy` (cyan value).

## Design Tokens
Source of truth: `colors_and_type.css` (NymCard v1.3 tokens). Key values used here:

**Brand / accents**
- Brand primary `#304DBB`, hover `#2840A0`, active `#1F3389`
- Brand purple `#5B4FD9`; navy `#0E1A33`
- Accent cyan `#22D3EE` (dark rails) / teal `#0EA5E9`; light-rail cyan text `#0E7C99`, purple text `#6D28D9`
- Success green `#10B981` / `#34D399`; light success text `#059669`

**Surfaces (light)** white `#FFFFFF`, soft `#F4F6FF`; borders `#E8EBF5` / `#D1D7E8`
**Surfaces (dark)** page `#070A1C`, shell `#080E22`, pop-out `#0F1A36→#0B142C`
**Text (light)** primary `#0E1A33`, secondary `#4A5578`, muted `#7A839E`

**Type** Geist Sans (display + body), Geist Mono (mono/numerals). Headline 44/52/700 `-0.022em`; intro 17/27; product name 17/600; chip 12.5/500; pop tagline 20/600; body small 13–14.

**Radii** shell 28px; rows / pop-visual 14–16px; pop-card 22px; icon tile 9–12px; chips pill (999px); buttons 13px.

**Spacing** 4px base. Notable: section pad 88/84; shell pad 22/26/28; row min-height 78; ncore-body gap 46; rows gap 14; chip gap 8.

**Motion** ease-out `cubic-bezier(0.16,1,0.3,1)`; hovers 150–200ms; pop-out transform 380ms; ambient rail glow 4s loop. Honor `prefers-reduced-motion`.

## Assets
- **Icons:** Lucide. Row icons: `credit-card`, `circle-dollar-sign`, `arrow-left-right`, `clock`, `shield`, `file-text`. Row affordance: `chevron-right`. Unify band: `fingerprint`. Highlights: `sliders-horizontal`, `shield-check`, `layers`, `scale`, `handshake`, `route`, `percent`, `coins`, `infinity`, `scan-face`, `gavel`, `file-check`, `git-compare`, `bell-ring`, `bar-chart-3`. Surfaces: `shield-check`, `check`. Close: `x`. Use `lucide-react` in the app.
- **Fonts:** Geist Sans (bundled in `fonts/`), Geist Mono (Google Fonts). The nymcard build loads both via `next/font`.
- **No raster images.** All visuals are CSS/SVG.

## Notes for the developer
- Keep the **AI Sentinel** / **Data & Insights** framing — it expresses that AI and Data run across every product layer.
- Product order is the locked lifecycle order: **Cards → Lending → Money Movement → Settlement → Financial Crime → Reconciliation**.
- Copy is British-English and sentence case (e.g. "instalment", "tokenized" as written). Don't Title-Case headings or add extra eyebrow labels beyond the existing `nCore` eyebrow.
- The two HTML files differ only by `data-theme="light"`. Implement as one component with a theme prop, not two components.
