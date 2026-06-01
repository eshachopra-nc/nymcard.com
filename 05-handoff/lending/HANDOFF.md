# Lending page — Claude Code handoff
**Reference prototype:** `Lending.html`
**Stack target:** Next.js 14 · React · Framer Motion · Tailwind CSS v4 · Geist (next/font) · Sanity CMS
**Date:** 2026-05-29 · v1.0

---

## 1. What this package is

`Lending.html` is the **production-faithful reference prototype** for `/products/lending`. Every section, visual, interaction, and motion timing is implemented and approved. Your job is to port it into the existing component system, map tokens, and wire Sanity.

The reference is **vanilla HTML/CSS/JS** for stack-agnosticism. Everything below maps it to the real stack.

---

## 2. Files

| File | Purpose |
|---|---|
| `Lending.html` | Assembled 10-section page reference |
| `lending/page.css` | All section-level styles |
| `lending/glass-kit.css` | §4 tile glass kit + tile-internal styles |
| `lending/credit-journey.js` | §4 bento: reveal, count-ups, interactions |
| `lending/page.js` | All other behaviors: hero cycle, migration, FAQ, rail |
| `Lending Credit Journey Live.html` | §4 bento in isolation (approved) |
| `Lending Tile - Card-Linked Credit.html` | §4 hero tile proof (approved) |

---

## 3. Section → primitive mapping

| § | Section | Design-system primitive | Component path |
|---|---|---|---|
| 1 | Hero | `HeroSection` (§8.12) — F-pattern | `components/sections/HeroSection.tsx` |
| 2 | Logo strip | `TrustBand` (§8.13) — marquee | `components/sections/TrustBand.tsx` |
| 3 | Why embed credit | `CardGrid` (§8.5) — 4 modular cards | `components/sections/CardGrid.tsx` |
| 4 | Credit journey | `SplitEditorial` / bento custom | `components/sections/product-uis/LendingUI.tsx` ← **create** |
| 5 | Underwriting | `CodeArtifact` (§8.17) + decisioning viz | `components/sections/CodeArtifact.tsx` ← **create** |
| 6 | Industries | `RailCarousel` (§8.18) `variant="sparse"` | `components/sections/RailCarousel.tsx` |
| 7 | Deployment | `CardGrid` dark — 3 cards with line art | reuse `CardGrid`, dark section |
| 8 | Migration | custom `MigrationFlow` | `components/sections/MigrationFlow.tsx` ← **create** |
| 9 | FAQ | `FAQSection` (§8.15) | `components/sections/FAQSection.tsx` |
| 10 | CTA + cross-sell | `CTASection` (§8.14) + `CrossSellBanner` (§8.16) ×2 | existing primitives |

---

## 4. §4 LendingUI — the glass kit component

The most complex section. The reference is `Lending Credit Journey Live.html`.

### Architecture
```
<section>  ← standard light section, 96px padding
  <bento>  ← 4-col grid, rows 312px
    <GlassTile slot="card-linked-credit" size="2x2"> ← CardLinkedCreditTile
    <GlassTile slot="origination" size="1x1">        ← OriginationTile
    <GlassTile slot="decisioning" size="1x1">        ← DecisioningTile
    <GlassTile slot="disbursement" size="1x1">       ← DisbursementTile
    <GlassTile slot="collections" size="1x1">        ← CollectionsTile
    <GlassTile slot="repayment" size="4x1">          ← RepaymentTile
  </bento>
```

### Glass material (already in codebase)
- **`GlassBed` → `GlassAtmosphere`** (`components/visuals/GlassAtmosphere.tsx`) — provides the cool field
- **`GlassSurface` → `GlassPanel`** (`components/visuals/GlassPanel.tsx`) — the frosted layer
- Atmosphere tone per tile: card-linked=`azure`, origination=`indigo`, decisioning=`teal`, disbursement=`azure`, collections=`indigo`, repayment=`teal`
- Cyan top-edge hairline: `::before` 1px gradient on GlassSurface — already in GlassPanel

### Tile animations (Framer Motion)
```tsx
// Reveal on view-in
const variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.64, ease: [0.22,1,0.36,1], delay: i * 0.07 }
  })
}
// In each tile: useInView + animate={isInView ? "visible" : "hidden"}
// Meter fill: animate={{ width: isInView ? "26%" : "0%" }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
// Count-up: use framer-motion useMotionValue + useTransform, or react-countup
// Gauge arc: animate strokeDashoffset on inView
```

### Interactions
- **Repayment seg** (card-linked credit): `useState("full" | "min" | "emi")` → AnimatePresence for installment schedule slide-in
- **Disbursement selector**: `useState("card" | "account" | "wallet")` 
- **Structure toggle** (repayment chart): `useState("conventional" | "flat" | "reducing")` → bars morph via Framer Motion `animate={{ height }}` with spring

### `prefers-reduced-motion`
```tsx
const { prefersReducedMotion } = useReducedMotion() // Framer Motion hook
// Pass to all animations: if prefersReducedMotion, skip transitions
```

---

## 5. §5 CodeArtifact

Spec: §8.17. Dark section by default.

```tsx
// Tab state
const [lang, setLang] = useState<"json" | "curl" | "node">("json")

// Line-by-line reveal on inView — use Framer Motion stagger:
const containerVariants = { visible: { transition: { staggerChildren: 0.15 } } }
const lineVariants = { hidden: { width: 0 }, visible: { width: "auto", transition: { duration: 0.24 } } }

// Syntax tokens: cyan=keyword, #6EE7C8=string, #A78BFA=number, rgba(255,255,255,0.4)=punctuation
```

Decisioning viz (beneath code panel): 3 applicant cards, Framer Motion stagger in on view:
```tsx
// A: score 768 → approved (green), B: 612 → declined (red), C: 704 → manual (amber)
// Stagger: 0ms, 140ms, 280ms delay
```

---

## 6. §8 MigrationFlow

5 stages cascade `.done` in sequence on inView:
```tsx
const stages = ["Discovery", "Mapping", "Configuration", "Parallel run", "Cutover"]
useEffect(() => {
  if (!inView) return
  stages.forEach((_, i) => {
    setTimeout(() => setDone(prev => [...prev, i]), i * 480)
  })
}, [inView])
// done: connector line width 0→100% + checkmark scale(0.5,0)→(1,1) on done
```

---

## 7. Token mapping (reference CSS → Tailwind/tokens.json)

| Reference CSS var | Token key | Tailwind class |
|---|---|---|
| `var(--brand-primary)` | `brand.primary` (#304DBB) | `text-brand-primary` |
| `var(--brand-navy)` | `brand.navy` (#0E1A33) | `bg-brand-navy` |
| `var(--accent-cyan)` | `accent.cyan` (#22D3EE) | `text-accent-cyan` |
| `var(--surface-soft)` | `surface.soft` (#F4F6FF) | `bg-surface-soft` |
| `var(--surface-card)` | `surface.card` (#FFFFFF) | `bg-surface-card` |
| `var(--surface-border-subtle)` | `surface.borderSubtle` (#E8EBF5) | `border-surface-border-subtle` |
| `var(--text-secondary)` | `text.secondary` (#4A5578) | `text-secondary` |
| `var(--text-muted)` | `text.muted` (#7A839E) | `text-muted` |
| `var(--ease-out)` | `motion.easeOut` | `ease-[0.22,1,0.36,1]` |
| `var(--success)` | `semantic.success` (#10B981) | `text-success` |

**Section padding:** `py-24` desktop (96px) → `py-16` mobile.
**Container:** `max-w-[1200px] mx-auto px-10`.
**Radii:** glass tile = `rounded-2xl` (24px = radius-xl), card = `rounded-[16px]` (radius-lg), button = `rounded-[20px]` (radius-button).

---

## 8. Copy source
All copy verbatim from `02-copy/Lending-copy.md` (v3, 2026-05-23).
Wire to Sanity: each section maps to a document type. The code block JSON is a static asset — hardcoded, not from CMS.

---

## 9. §6 Industries rail data

```ts
// lib/lending-industries.ts
export const INDUSTRIES = [
  { slug: "consumer-banking", label: "Consumer banking", accent: "#304DBB",
    body: ["Revolving", " credit, installment plans, and credit cards on one platform."], href: "/industries/consumer-banking" },
  { slug: "commercial-banking", label: "Commercial banking", accent: "#5B4FD9",
    body: ["Working", " capital, invoice financing, and SME credit lines that scale."], href: "/industries/commercial-banking" },
  { slug: "fintechs", label: "Fintechs", accent: "#0EA5E9",
    body: ["Launch", " BNPL, installment, and digital-first credit products."], href: "/industries/fintechs" },
  { slug: "retail", label: "Retail & marketplaces", accent: "#22D3EE",
    body: ["BNPL", " and installment options at checkout to lift basket size."], href: "/industries/retail" },
  { slug: "telecoms", label: "Telecoms", accent: "#5B6DD8",
    body: ["Device", " financing and consumer installment plans inside your customer relationship."], href: "/industries/telecoms" },
  { slug: "healthcare", label: "Healthcare", accent: "#304DBB",
    body: ["Patient", " financing embedded at the point of care."], href: "/industries/healthcare" },
  { slug: "automotive", label: "Automotive", accent: "#5B4FD9",
    body: ["Dealer-linked", " auto financing and lease structures."], href: "/industries/automotive" },
]
// Pass as items prop to <RailCarousel variant="sparse" items={INDUSTRIES} background="light" />
```

---

## 10. Motion principles (from design-system.md §9)

- **Cinematic reveals:** opacity 0→1 + translateY 18→0, 640ms `[0.22,1,0.36,1]`, stagger 70ms per item
- **Functional (interactions):** 180ms `[0.4,0,0.2,1]` — toggles, hover states
- **Ambient:** slow drift 18–22s alternate — the glass atmosphere field
- **No:** traveling dots · pulsing dots · bouncing · scale transforms on cards
- **Hover on tiles:** `translateY(-4px)` + shadow-lift — `.nc-card-hover` utility (see §8.6)
- **Always:** `useReducedMotion()` guard — skip transitions, land in final state

---

## 11. Approved visuals checklist

| Asset | Status | Location |
|---|---|---|
| §3 outcome icons (×4) | ✅ inline SVG in Lending.html | — |
| §4 six glass tiles | ✅ approved | `Lending Credit Journey Live.html` |
| §5 CodeArtifact | ✅ in reference | `Lending.html §5` |
| §6 industries copy | ✅ | `lib/lending-industries.ts` (above) |
| §7 deployment line-art (×3) | ✅ inline SVG | `Lending.html §7` |
| §8 migration agent avatars (×5) | ✅ inline SVG | `Lending.html §8` |
| Hero config surface | ✅ glass kit | `Lending.html §1` |

---

## 12. Key do-nots (design-system.md §1)

- **No all-caps labels** anywhere on the page (applies to section openers, tile labels, everything)
- **No eyebrow atoms** on section openers — headline + copy carry the framing
- **No warm tones** — cool palette only (navy / primary / purple / cyan / indigo / teal)
- **No scale transforms on card hover** — translateY only
- **No traveling dots, no pulsing dots** (explicit anti-slop rule)
- **No device mockup overload**
- **No 3D illustrations**
- **Glass only on a rich field** — never on a solid/plain background (the GlassAtmosphere is mandatory)
