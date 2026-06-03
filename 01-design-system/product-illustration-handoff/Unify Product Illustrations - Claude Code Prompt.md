# Handoff — Codify ONE product-illustration treatment in the design system (light + dark), apply site-wide

## Objective
Right now product illustrations are inconsistent: the hero carousel is cinematic and dimensional, but the bento + product-page + industry-page UIs read as flat, generic AI-SaaS dashboards. **Define a single, reusable "Product Illustration" treatment in the design system and apply it to every product illustration across the entire site, with proper light AND dark variants.**

This is NOT a one-page change. It is a design-system change (`01-design-system/design-system.md` + `tokens.json` + the shared visual kit) that then propagates to every surface that renders a product UI.

### Reference (build to these)
- **`Products Grid — 3 Column.html`** — the target: all six homepage products in a uniform grid, in the final treatment. Open it.
- **`Bento Surfaces — Before vs After.html`** — before/after per product.
- **`frames/bento-shared.jsx` + `frames/bento-reworked.jsx`** — working source for the frame + atoms + all six surfaces. Lift the structure and values from here.
- The hero (`components/hero/ProductCarousel.tsx`, `/public/handoff/*.svg`) is the abstract source of the look — it already has it and **stays abstract**. Everything literal should now look like it belongs in the same world.

## 1. Build the shared kit (the new design-system primitives)
Create a canonical, theme-aware kit (suggested: `components/visuals/product-illustration/`) and document it in `design-system.md` as the single way to build a product illustration. Refactor `components/sections/product-uis/glass.tsx` + `GlassAtmosphere.tsx` to it.

**Frame primitives**
- `IllustrationField` — the lit surround: bright diagonal light rays (white + cyan) over the ground.
- `IllustrationCard` — the luminous glass card the UI floats in: an internal **cyan bloom that glows**, a lit top-left edge, deep float shadow. NOT a flat white panel.

**Atoms** (all built from tokens)
- `NavyTile` — deep-navy object tile + glow (fixed entities: $, €, accounts).
- `GlowNode` — the glowing cyan focal node (hero's USDC tile / verdict disk / check).
- `Stat` — the gradient hero number (one per illustration).
- `ControlChip` — a legible labelled capability chip with a glowing check (e.g. Financial Crime's Fraud / Risk / 3D Secure / AML / Sanctions / Identity — these must be **readable**, ~12px, never an 8px caption).
- `LiveTag`, `Toggle`, `Arrow`, `MatchRow` — supporting atoms.

**Rules baked into the kit**
- Exactly **one focal element** (a gradient number, a glowing node, or a verdict) per illustration.
- Minimal mono — reserve it for one eyebrow + a sublabel. No mono-on-everything.
- No invented data-slop (no fake batch numbers, masked PANs, timestamps, decorative metrics).
- Crop/viewfinder brackets are **optional and rare** — at most one surface (a literal flow). Do not stamp them everywhere.
- One canonical cell size — illustrations are designed for it and never stretched to fill a wide cell.

## 2. Light + dark variants (the core of this task)
Both modes must be first-class. Tokenize every value; add tokens where missing (e.g. `--nc-illus-field`, `--nc-illus-bloom`, `--nc-illus-glow`).

**Light** (primary)
- Field ground: `linear-gradient(135deg,#E7EAF7,#D7E9F8,#E9E8F4)`; white + cyan skewed rays.
- Card: `radial-gradient(120% 96% at 66% 64%, rgba(108,214,245,.5), transparent 60%)` (cyan bloom) + `radial-gradient(80% 72% at 16% 8%, rgba(255,255,255,.72), transparent 56%)` (lit edge) + lavender base; shadow `0 30px 66px -24px rgba(14,26,51,.45)`, `inset 0 1px 0 rgba(255,255,255,.85)`.
- Sub-chips: `rgba(255,255,255,.55)` + `inset 0 0 0 1px rgba(255,255,255,.6)`. Text navy. Stat gradient `linear-gradient(180deg,#304DBB,#1B2F86)`.

**Dark**
- Field ground: deep navy `#0E1A33` → `#1A2547`; the SAME cyan bloom but a touch stronger (`rgba(34,211,238,.22–.3)`) so the card glows out of the dark; rays dimmed (cyan/white at ~0.3).
- Card: `surface-dark-glass` (`rgba(26,37,71,.6)`) over the deep field, lit top edge `inset 0 1px 0 rgba(255,255,255,.10)`, deep shadow `0 28px 60px -20px rgba(0,0,0,.65)`, cyan top-hairline.
- Sub-chips: `rgba(255,255,255,.05)` + `1px rgba(255,255,255,.1)`. Text `--nc-text-dark-primary` / `--nc-text-dark-secondary`. Stat gradient uses the light-blue link tokens (`#7B9AFF → #A5BBFF`) or cyan so it reads on dark.
- `GlowNode`, `NavyTile`, glowing checks: keep — they pop on dark (just verify contrast).
- This aligns with `GlassAtmosphere`'s existing `depth="deep"` dark field — reuse/extend it rather than inventing a parallel system.

## 3. Apply across the whole site (not just the homepage)
Refactor every product-illustration surface to the kit + canonical cell:
- **Homepage bento** — `components/sections/ProductsBento.tsx` + `product-uis/*` (the six final designs in the reference). **Recommendation: switch the bento from the asymmetric layout to a uniform 3-column grid** so no UI is stretched; if the asymmetric layout is kept for rhythm, still design every UI at the single canonical size and center it (never stretch to fill).
- **Product pages** — `components/composition/ProductPageRenderer.tsx`, `FeatureShowcase.tsx`, `UIContainer.tsx`, `UIPlaceholder.tsx`, `SplitEditorial.tsx`, `TextImageRow.tsx`.
- **Industry pages** — `components/sections/industry-uis/*`, `IndustryPageRenderer.tsx`.
- **Anywhere else** a product UI is shown (capability sections, cross-sell, etc.). Audit for `GlassSurface`/`GlassBed`/`UIPlaceholder` usage and migrate.

## 4. The six homepage surfaces (final specs, from the reference)
- **Cards** — glowing violet card object + a compact, fixed-width controls group (Freeze / Online payments / Travel) with real toggles; `ACTIVE CARD · DEBIT` + `Live` tag.
- **Lending** — a 4-chip **installment** schedule (first chip Paid + glowing, rest dated) + `Total $480.00`; `PAY IN 4 · 0% APR` + `Approved`.
- **Money Movement** — a compact, left-aligned conversion: `You send $10,000.00 USD` → rate `1 USD = 0.9184 EUR` → focal `€9,184.00` → `Arrives instantly`. No rail jargon. Not stretched.
- **Settlement** — centred flow `USD → USDC → USD` (navy tile → glowing USDC node → navy tile), no brackets; verdict: glowing check + gradient `Real-time` + `SETTLED · FINAL · NO SWIFT`.
- **Financial Crime** — the **controls are the story**: a legible 2×3 grid of capability chips (Fraud · Risk · 3D Secure · AML · Sanctions · Identity), each with a glowing check; `PER-TRANSACTION SCREENING` + `Cleared`. Do not hide these in tiny text.
- **Reconciliation** — focal `12,480` / `AUTO-MATCHED TODAY` + `98.4% matched`; tight Ledger↔Bank match with one indigo exception.

## Constraints
- **Tokens only** via `lib/tokens.ts` / `palette.ts` (`visual` + `withAlpha`); no raw hex in components (values above are reference for new tokens). Cool-only palette; violet is an object accent, never the field, never a CTA.
- **Geist Sans + Geist Mono**; respect the type scale.
- **Reduced-motion safe**; static at rest; one purposeful ambient gesture per illustration max; keep existing scroll-in/hover gestures.
- Honour `Visual-direction.md` anti-patterns: no flat fake screenshots, no device-mockup overload, no generic SaaS look.

## Definition of done
- A single documented product-illustration kit exists in the design system; all product illustrations site-wide are built from it.
- Light AND dark both verified on homepage, a product page, and an industry page — each reads luminous and dimensional, not flat, in both modes.
- One focal element per illustration; no data-slop; mono demoted; capability labels legible.
- No UI is stretched to fill its cell; brackets appear at most once.
- Tokens only; lint/build/type-check pass; reduced-motion verified.
