# Handoff — Corridor routing console (Money Movement §4)

**Reference build:** `handoff/money-movement/CorridorRoutingConsole.html`
Standalone, self-contained, interactive. Open it and click the left rail — that
is the exact behaviour and styling to reproduce. This is the single hero UI for
the FeatureShowcase section; it **replaces** the static `money-movement-feature.svg`.

---

## Port target

`components/sections/product-uis/CorridorRoutingConsole.tsx`  (`"use client"`)

Wire into `components/composition/ProductPageRenderer.tsx`, in the FeatureShowcase
`ui` branch, beside the existing consoles:

```tsx
doc.slug === "card-issuing"      ? <CardControlsDashboard />
: doc.slug === "financial-crime" ? <FinancialCrimeConsole />
: doc.slug === "money-movement"  ? <CorridorRoutingConsole />   // ADD
: <NamedSurface name={handoffName(doc.slug, "feature")} label={doc.featureShowcase.uiLabel} tone={fv.tone} />
```

Keep `money-movement-feature.svg` as the no-JS / OG fallback if you like, but the
live component takes over for this page.

---

## Anatomy

```
.crc__shell                 grid: 220px navy rail + 1fr light main
  .crc__rail                dark sidebar (#101D38)
    .crc__brand             nCore wordmark
    .crc__nav               the 4 feature callouts as <button.crc__item data-pane>
    .crc__rail-foot         "42 corridors live" status
  .crc__main
    .crc__pane (×4)         one per nav item; active pane has .is-active
      .crc__bar             crumb + title + optional LIVE pill
      .crc__kpis            3 KPI tiles
      (body: table / sliders / stream)
    .crc__ledger            PERSISTENT navy footer; text swaps per active pane,
                            partner FX capture pinned right (FX +$142.50)
```

## The four panes (left-rail items)

| data-pane | rail label | body + interaction |
|---|---|---|
| `rules` | Routing rules | priority table; click a `P#` chip to cycle 1 → 2 → 3 |
| `fx` | FX & spreads | 3 spread sliders; `oninput` recomputes the customer rate **and** the "FX captured" KPI |
| `compliance` | Compliance checks | live stream, new row every 2.4s; one payment **re-routed** around a flagged corridor |
| `corridor` | Per-corridor view | throughput / FX captured / status table; one live row |

## Behaviour

- Click a rail item → activate its pane + swap the ledger text.
- Auto-cycles panes every 4.2s; pauses on hover and after any click.
- **All motion gated behind `prefers-reduced-motion`** — no auto-cycle, no stream
  interval. In React: `useReducedMotion()`.
- **Do not put CSS transitions/opacity-entrance on the rail items or panes.** A
  `transition` on the active state freezes mid-animation when the component is
  rendered inside a backgrounded/embedded iframe (the highlight visually sticks on
  the wrong item even though state is correct). State changes should snap. Row-enter
  on the compliance stream uses transform only, gated on reduced-motion.

## Tokens (design-system.md §3 / §5 / §6)

| role | token | value |
|---|---|---|
| navy rail | `surface-dark` | `#101D38` (elevated rail) |
| active rail item | `accent-cyan` @12% / text `#22D3EE` | `rgba(34,211,238,0.12)` |
| cyan hairline | `accent-cyan` @50% | `#22D3EE` |
| KPI tile | `surface-soft` / border `surface-border-subtle` | `#F4F6FF` / `#E8EBF5` |
| slider fill | `brand-primary` | `#304DBB` |
| status · settled | `success` | `#10B981` (text `#0E7C5A`) |
| status · routing/FX | `accent-cyan` | text `#0E7490` |
| status · screening | `accent-indigo` | text `#3730A3` |
| status · re-routed | `warning` | text `#B45309` |
| text 1 / 2 / muted | — | `#0E1A33` / `#4A5578` / `#7A839E` |
| type | Geist / Geist Mono | labels + figures in mono, `tabular-nums` |
| radii | shell 20 · tiles/rows 10–11 · chips 6–8 | |

Copy is verbatim from `scripts/docs/money-movement.ts` (`featureShowcase`) and
`02-copy/money-movement-copy.md` §4.

## Numbers / data (mock — wire to real API later)

- KPIs: 42 corridors live · FX captured today $24,180 · avg settle T+0.
- FX rows: USD/PHP mid 56.20 @35bps · EUR/NGN mid 1,648.50 @42bps · GBP/INR mid 106.40 @28bps.
  customer rate = mid × (1 + bps/10000); "FX captured" KPI scales with total spread.
- Corridor table: USD→PHP $1.24M / $8,420 settled · USD→NGN $0.86M / $5,610 routing·FX (live) ·
  GBP→INR $0.52M / $3,180 settled · EUR→KES $0.31M / $1,940 screening.
