# Section primitives consistency audit — 2026-05-25

Audit-only pass. No source-file changes — recommendations gate Phase 2.

## Verdict in one paragraph

The system is on a coherent foundation — same palette, same eyebrow atom, same KineticRibbon / AmbientGlow vocabulary, same Geist type ramp — but it has accreted three card-radius families and four card-padding rhythms across the §8.1–§8.25 run, and the radius family in particular drifts from the spec. **Light mode reads less calm than it should** because the largest editorial surfaces (`FeatureCard`, `SplitEditorial`, `ProductSpotlight`, `InfraDiagramFrame`, the `CardGrid` shared-atmosphere wrapper) round at `rounded-3xl`, which — given a token gap in `globals.css` — resolves to approximately **22px** rather than the 32px the spec implies; meanwhile every other card hits `rounded-2xl` (32px) and the smaller surfaces use `rounded-lg` (16px), the product-card token. So the outermost card is *smaller-radius than its child cells*, which inverts the §5 nested-radius rule and is the strongest single source of the "doesn't feel like one design system" reaction. Compounding this: there are two conflicting `@theme` blocks in `app/globals.css` defining `--radius-lg/sm/md/xl/2xl`, `radius-button` in `tokens.json` is 8px while `design-system.md` v2.1 §5 still says 20px, and the §8.5 / §8.8 contract (`radius-lg` (16px) for product and modular cards) is honoured by nothing currently rendering as a card on `/visual-system`. None of this is destructive — every primitive uses tokens, the cool palette holds, the eyebrow atom is uniform, and `CrosshairRails` is correctly section-scoped — but the radius taxonomy needs a deliberate fix before Phase 2 lands more pages on top.

## What's pulling its weight

- **`Eyebrow` atom (`atoms.tsx`)** — one canonical eyebrow used by SplitEditorial, ProductSpotlight, FeatureCard, FeatureShowcase, OutcomeChips, FAQ, PlatformChecklist, DeveloperBlock, TextImageRow, IntegrationsDiagram, ScaleStatsRibbon, InfraDiagramFrame, DenseCapabilityCard, FloatingOperationalPanel. `font-mono text-[11px] tracking-[0.2em] text-brand-primary dark:text-accent-cyan`. Genuinely consistent.
- **`CrosshairRails`** — production primitive, used inside `ScaleStatsRibbon` and `IntegrationsDiagram`; the same `text-brand-navy/[0.22] dark:text-white/[0.22]` everywhere.
- **`UIPlaceholder`** — the placeholder UI is on-system: `rounded-lg`, the cyan front-edge hairline, cool corner reflections, mono label. The slot every section primitive wires into renders consistently.
- **`PageHero`, `FeatureShowcase`, `CTASection`, `FAQ`, `DeveloperBlock`** — no card surface of their own; they sit on a section background and read clean. The eyebrow / headline / body / link hierarchy is consistent across them.
- **`CodeArtifact`** — the §8.17 spec is exact (`rounded-lg`, the cyan front-edge hairline, the cool corner wash that matches `FloatingOperationalPanel` and the embedded UI zones). The companion block sits inside the same surface as written.
- **`TrustBar`** — the §8.25 surface tokens (`white` / `soft` / `dark`) are explicit per-instance (no `dark:` modifiers on the inner LogoMark / trust line), the marquee / reduced-motion / fade behaviour matches the spec.
- **`OutcomeChips`** — chips are flat editorial statements on the section surface, not floating tiles; icons are accent cyan only; row hairline above. On-system.
- **`PlatformChecklist`** — checklist hairlines top/bottom, accent cyan check tile at the correct cyan opacity (`/0.12` light / `/0.16` dark), no card frame on the row. On-system.

## Where the drift is

### 1. Background surface

**Clean.** Every primitive uses one of `surface-white` / `surface-soft` / `surface-dark-base` / `surface-dark-elevated` / a `KineticRibbon` field / glass — no off-system fills, no greys, no warm tones.

**Two ambiguities to flag:**
- **`CardGrid` shared-atmosphere wrapper.** When `surface="glass"` or (`surface="product"` + `card="no-UI"`), CardGrid wraps the grid in `bg-surface-soft dark:bg-surface-dark-base` (`CardGrid.tsx:161-165`). For glass that is **correct** (§8.1 — glass needs a field behind it). For the `product`+`no-UI` case (icon / heading / text cells), it's a stylistic choice rather than a rule from the spec — and the cells themselves are `bg-surface-white`, so the buyer sees white cards on a soft band. Defensible but not documented.
- **`SplitEditorial` `standard` is white; `FeatureCard` is white; `ProductSpotlight` is white; `InfraDiagramFrame` is white.** All four are the §8.7 / §8.5 "single large editorial card on the section surface" pattern. The light-mode reaction is partly that **the section behind these is also `surface-white` by default** — so a 22px-radius white card on a white section reads as a wash, not a card. Either the section needs to be `surface-soft` when the card is white (§5 / §10 implicit), or the card needs a soft surface contrast against the page. The spec §8.7 hints at this ("`surface-card` or `surface-soft`") but no caller currently switches.

### 2. Border

**Mostly clean.** Every primitive uses `border-surface-border-subtle` light and `border-surface-dark-border` dark, 1px, with hover `border-surface-border-stronger` where the spec calls for it.

**Flag:**
- **Glass primitives have a different border family.** `GlassPanel` uses `border-white/60`, `FloatingOperationalPanel` uses `border-white/60 bg-surface-white/80`, `ProductSpotlight`'s embedded UI uses `border-white/55`, `UIContainer embedded` uses `border-white/55`. This is the §8.1 spec ("border: 1px solid rgba(255,255,255,0.8)"), but the opacities split into three values (`60`, `55`, `0.8`) — small drift across what should be one glass material. **Pick one.**

### 3. Border radius — *the biggest single drift*

The spec radius scale: `sm 4 / md 8 / button 20 / lg 16 / xl 24 / 2xl 32 / pill`. The component table says product cards & modular cards & editorial cards & code blocks = `radius-lg` (16px); glass panels & hero surfaces = `radius-xl` (24px); large floating dashboards = `radius-2xl` (32px).

**Token drift first.**
- `tokens.json` has `radius.button: 8px`, but `design-system.md` v2.1 §5 says **20px**. The spec lock was missed in tokens.json.
- `app/globals.css` has **two conflicting `@theme` blocks** for radii — the shadcn-style inline block at lines 7–48 defines `--radius-3xl` and `--radius-4xl` from `var(--radius) = 0.625rem`, the nymcard-tokens block at lines 52–108 redefines `--radius-lg/sm/md/xl/2xl` to literal px and **does not define `--radius-3xl` or `--radius-4xl`**. So `rounded-3xl` resolves to `calc(0.625rem * 2.2)` ≈ **22px**, not the implied 32px from the radius scale. `rounded-4xl` ≈ 26px. Neither maps to a system token, but `rounded-3xl` is used in production.
- This means `radius-2xl = 32px` (token), but Tailwind class `rounded-3xl ≈ 22px` (CSS calc). A reader of the code who assumes "3xl > 2xl" sees the opposite at runtime.

**Component drift second.**
Below is what each card-surface actually compiles to and what the spec says it should be:

| Primitive / surface (file) | Class | Compiled | Spec |
| --- | --- | --- | --- |
| `ProductCard` outer (`ProductCard.tsx:32`) | `rounded-2xl` | **32px** | `radius-lg` (16px) — §8.8 |
| `ProductCard` UI zone (`ProductCard.tsx:68`) | `rounded-lg` | 16px | `radius-md` (8px) — §8.8 (inner UI zone) |
| `DenseCapabilityCard` (`DenseCapabilityCard.tsx:37`) | `rounded-2xl` | **32px** | §8.5 / §8.8 implied — `radius-lg` (16px) |
| `FloatingOperationalPanel` (`FloatingOperationalPanel.tsx:49`) | `rounded-2xl` | **32px** | §8.1 — `radius-xl` (24px) |
| `FeatureCard` outer (`FeatureCard.tsx:36`) | `rounded-3xl` | **≈22px** | §8.5 / §8.7 — `radius-lg` (16px) |
| `FeatureCard` visual zone (`FeatureCard.tsx:92`) | `rounded-2xl` | **32px** | inner of `radius-lg` should step down per §5 progressive-nesting rule |
| `SplitEditorial` outer (`SplitEditorial.tsx:94`) | `rounded-3xl` | **≈22px** | §8.7 — `radius-lg` (16px) |
| `SplitEditorial` visual zone (`SplitEditorial.tsx:153`) | `rounded-2xl` | **32px** | inner — should step down |
| `ProductSpotlight` outer (`ProductSpotlight.tsx:30`) | `rounded-3xl` | **≈22px** | §8.7 — `radius-lg` (16px) |
| `ProductSpotlight` embedded UI (`ProductSpotlight.tsx:79`) | `rounded-2xl` | **32px** | inner — should step down |
| `InfraDiagramFrame` (`InfraDiagramFrame.tsx:33`) | `rounded-3xl` | **≈22px** | §8.7 — `radius-lg` (16px) |
| `CardGrid` shared-atmosphere wrapper (`CardGrid.tsx:160`) | `rounded-3xl` | **≈22px** | not specified — wrapper is implicit |
| `CardGrid` glass cell (`CardGrid.tsx:322`) | `rounded-2xl` | **32px** | §8.1 glass — `radius-xl` (24px) minimum, but §8.9 says glass cells |
| `CardGrid` treatment cell (`CardGrid.tsx:338`) | `rounded-2xl` | **32px** | §8.5 modular — `radius-lg` (16px) |
| `CardGrid` no-UI cell (`CardGrid.tsx:372`) | `rounded-2xl` | **32px** | §8.5 modular — `radius-lg` (16px) |
| `RailCarousel` rich card (`RailCarousel.tsx:243`) | `rounded-2xl` | **32px** | §8.18 says "`radius-2xl` (32px in the rail)" — **correct** |
| `RailCarousel` sparse card (`RailCarousel.tsx:320`) | `rounded-2xl` | **32px** | §8.18 — correct |
| `UIContainer` (`UIContainer.tsx:64`) | `rounded-xl` | 24px | §8.8 implied UI zone — within spec |
| `UIPlaceholder` (`UIPlaceholder.tsx:39`) | `rounded-lg` | 16px | §8.13 spec UI zone — correct |
| `CodeArtifact` (`CodeArtifact.tsx:107`) | `rounded-lg` | 16px | §8.17 — correct |
| `CrossSellBanner` (`CrossSellBanner.tsx:85`) | `rounded-lg` | 16px | §8.16 — correct |
| `GlassPanel` (`GlassPanel.tsx:111`) | `rounded-xl` | 24px | §8.1 — correct |
| Asymmetric legacy `SymmetricBentoGrid` (`SymmetricBentoGrid.tsx:106`) | `rounded-3xl` | ≈22px | legacy — §8.9 says use `CardGrid` instead |
| Asymmetric legacy `EnterpriseGrid`, `GlassProductGrid`, `SymmetricProductGrid`, `BentoGrid` | `rounded-3xl` / `rounded-2xl` | mix | legacy |

**Net effect in light mode.** Open `/visual-system` (or any product page) and the eye sees four radius rhythms competing: ≈22px on the *outer editorial cards* (small), 32px on the *product cards* (large), 24px on glass and UI placeholders (mid), 16px on cross-sell, code, and inner UI zones (small). The §5 progressive-nesting rule says **outer > inner**; in places we currently have **inner > outer**, e.g. `FeatureCard` outer (≈22px) wrapping a visual zone at 32px. This is the single most visible cause of the "doesn't feel like one system" reaction in the owner brief.

### 4. Padding

**Internal card padding** is meant to follow §4: small cards `space-6` (24px), default product cards `space-7` (32px), editorial single-cards `space-8` (40px).

Actual:
- `ProductCard` — `p-7` (28px in Tailwind's default scale) — **correct intent, but `p-7` = 28px, not `space-7` = 32px**. Tailwind's `p-7` is `1.75rem` (28px). To hit the token's 32px the class is `p-8`. Same in `RailCarousel` cards (`p-7`). Mild drift.
- `DenseCapabilityCard` — `p-7 sm:p-8` (28px → 32px).
- `FloatingOperationalPanel` — `p-7 sm:p-8` (28px → 32px).
- `FeatureCard` — `p-8 sm:p-10 lg:p-14` (32 → 40 → 56). The lg `p-14` (56px) is **outside the spacing scale** — the scale stops at 48px (`space-9`) before jumping to 64px (`space-10`). `p-14` = 56px is a magic number per §4 "no magic numbers."
- `SplitEditorial` — same `p-8 sm:p-10 lg:p-14`. Same drift.
- `ProductSpotlight` — same.
- `InfraDiagramFrame` — same `p-8 sm:p-10 lg:p-14`.
- `CardGrid` outer wrapper — `p-5 sm:p-6` (20px → 24px). On the small side; the cells inside use `p-6` (24px).
- `CardGrid` no-UI / treatment cells — `p-6` (24px) (`space-6`). Correct for a small modular card.
- `CrossSellBanner` body — `p-6` (24px). Correct for a low-profile banner.
- `CodeArtifact` companion — `px-5 py-5 sm:px-7 sm:py-6` (20/20 → 28/24). Slightly off-scale but reads fine.

**Two recommendations here:**
1. `p-7` is used in places that *mean* `space-7` (32px). Replace `p-7` (28px) with `p-8` (32px) — or add a `p-7.5 = 30px`-style token; the spec wants 32px.
2. `p-14` is a magic number. Either drop to `p-12` (48px) or extend `space-9.5 = 56px` (preferred: drop to 48px).

### 5. Shadow / elevation

**Mostly default-to-flat per §6** — the spec wants no shadow by default on cards, with shadow only on hover.

Actual:
- `ProductCard` — no shadow at rest, hover adds a hand-rolled shadow `[0_2px_8px_0_rgba(14,26,51,0.05),0_14px_30px_-14px_rgba(14,26,51,0.18)]`. **Inline hex** — not a token. The §6 `shadow-sm` and `shadow-md` tokens exist; this should be `shadow-sm`.
- `FloatingOperationalPanel` — `shadow-[0_18px_44px_-16px_rgba(14,26,51,0.22)]` inline. Should be `shadow-md` per §8.2 floating-layer guidance.
- `UIPlaceholder` — `shadow-[0_18px_42px_-22px_rgba(14,26,51,0.24)]` inline. Same drift.
- `CodeArtifact` — `shadow-[0_18px_42px_-22px_rgba(14,26,51,0.22)]` inline. Same drift.
- `RailCarousel` cards — `transition-shadow` set up but the hover shadow is not actually wired (no `hover:shadow-…` class). Likely an oversight.
- `GlassPanel` — `shadow-[0_10px_30px_-10px_rgba(14,26,51,0.08),0_2px_6px_-2px_rgba(14,26,51,0.05)]`. Two-shadow composite that approximates `shadow-sm` (§6 says "glass gets shadow-sm maximum"). The composite is fine, but it's inline.

**Pattern.** Five primitives bake their own shadow values rather than using `shadow-sm` / `shadow-md`. Rule 4 in `CLAUDE.md` ("read tokens via `tokens.ts`, not inline values") is violated for every shadow on the site. Worth a single sweep: define `shadow-card`, `shadow-card-hover`, `shadow-glass`, `shadow-float` in `tokens.json` and replace.

### 6. Hover / focus

**Modular card hover (§8.6) calls for:** border deepens to `surface-border-stronger`, `shadow-sm` appears, no transform, no background change. ~120–200ms total.

Actual:
- `ProductCard` — border deepens correctly, hover shadow appears (inline values per §5 above), no transform. **On-spec.**
- `CardGrid` `treatment` cells — border does not deepen; the hover is a soft cyan radial wash from the top-right. This is an additional ambient lift on top of the modular pattern — defensible for a treatment-surface variant, but undocumented in §8.5/§8.6.
- `CardGrid` `no-UI` cells — border deepens + cyan radial from the top-edge. Same comment.
- `CardGrid` `with-UI` `no-UI` cells share an arrow chip in the top-right that **shifts colour from `bg-brand-primary/[0.08]` to `bg-brand-purple`** on parent hover (`CardGrid.tsx:271-274`). The chip going from blue to purple on hover is a small visual signature — but **it crosses a spec rule (§3): violet is reserved for gradient stops and chip / glow accents, not for interactive state changes.** Worth flagging to the owner: this is an off-system use of violet as an interactive accent.
- `CrossSellBanner` — cursor-tracked cyan wash on hover. On-system (cyan is the lit-surface signal per §9.5.1).
- `RailCarousel` cards — `transition-shadow` declared but `hover:shadow-…` not wired (and `hover:border-surface-border-stronger` is wired for dark only at line 247; missing the light counterpart). **Bug.**
- `FAQ`, `PageHero`, `FeatureShowcase`, `OutcomeChips`, `PlatformChecklist`, `DeveloperBlock`, `TextImageRow`, `CTASection`, `ScaleStatsRibbon`, `IntegrationsDiagram`, `InfraDiagramFrame`, `ProductSpotlight`, `SplitEditorial`, `FeatureCard`, `DenseCapabilityCard`, `FloatingOperationalPanel`, `UIPlaceholder`, `UIContainer` — no hover (correct: most aren't interactive cards).

**Focus rings.**
- `FAQ` uses `focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:focus-visible:ring-accent-cyan/20`.
- `CrossSellBanner` uses the same.
- `DeveloperBlock` link, `TextImageRow` link — same.
- `CodeArtifact` tab buttons — `focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40`. Different opacity stops, different ring width. Drift.
- `IntegrationsDiagram` node link — `focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark-base`. Different again.

§6 says `ring-default: 0 0 0 4px rgba(48, 77, 187, 0.16)`. None of the components use it; they all hand-write the focus ring. Three ring widths and three opacity values across the system. **Worth a unification pass.**

### 7. Typography weights and sizes

**Eyebrow style.** All paths through `Eyebrow` are uniform. But there are **four off-`Eyebrow` eyebrow strings** in `composition/`:
- `DenseCapabilityCard.tsx:56` — meta chips at `font-mono text-[10px] uppercase tracking-wider`. OK (chips, not eyebrow).
- `DenseCapabilityCard.tsx:70` — group label at `font-mono text-[10px] uppercase tracking-[0.16em]`. **This is an eyebrow that bypasses the atom.** Use `<Eyebrow>` or document a "group label" variant.
- `FeatureCard.tsx:105` — visual-zone label at `font-mono text-[10px] uppercase tracking-wider`. Same — should consider unifying as a "caption" variant.
- `IndustryPage.tsx:148-156` — eyebrow strings, hand-written.
- `IntegrationsDiagram.tsx:94` — `font-mono text-[12px] uppercase tracking-[0.14em]` on a node label. Different size, different tracking.
- `ProductPageRenderer.tsx:215` — eyebrow at `font-mono text-[12px] uppercase tracking-[0.16em]`. Different from the atom (11px / 0.2em).
- `UIPlaceholder.tsx:96`, `FloatingOperationalPanel.tsx:96` — `text-[10px] tracking-wider` mono labels.

Three "mono-uppercase" treatments coexist: 10px/wider (chip / caption), 11px/0.2em (canonical eyebrow), 12px/0.14em or 0.16em (label / heading-strip). The first and third are not eyebrows per the spec — they're chip / caption usage, which is legitimate, but the names aren't consistent and the 12px variant in `ProductPageRenderer` is misnamed `Eyebrow`. **Worth resolving.**

**Card headlines.** The §8.5 spec says "Title is `h3` Geist 500". The §8.8 spec says "h4 Geist 600". Actual:
- `ProductCard` — `font-display text-lg font-semibold` — `font-semibold` is **600**; `text-lg` is 18px (not the 22px of `h4` or 28px of `h3`). The weight is right for §8.8; the size is smaller than `h4`. Reads compact in stacked grids.
- `DenseCapabilityCard` — `font-display text-lg font-bold` — `font-bold` is **700**. §8.8 says 600. Drift.
- `FloatingOperationalPanel` — `font-display text-lg font-bold` — **700**. Drift.
- `FeatureCard` — `font-display text-2xl font-bold leading-[1.15] lg:text-[2rem]` — **700**, sizes outside the `h2`/`h3` token scale (`text-[2rem]` = 32px, between `h3` 28 and `h2` 36). Magic size.
- `SplitEditorial` headline — `font-display font-bold` + `text-2xl lg:text-[2rem]` (standard) or `text-4xl leading-[1.08] lg:text-[3.4rem]` (hero). `text-[3.4rem]` = 54.4px is a magic number; `display-lg` is 64px and `h1` is 48px — 54.4 is in between.
- `ProductSpotlight` — `font-display text-2xl font-bold lg:text-[1.9rem]`. `text-[1.9rem]` = 30.4px is a magic number.
- `TextImageRow` — `font-display text-2xl font-bold lg:text-[1.75rem]`. `text-[1.75rem]` = 28px (= `h3`). Matches but expressed as an inline rem rather than `text-[28px]` or `text-h3`.
- `DeveloperBlock` — `text-2xl font-bold sm:text-[1.75rem]`. Same comment.
- `PlatformChecklist` headline — `text-3xl font-bold sm:text-[2rem]`. `text-[2rem]` = 32px.
- `FeatureShowcase` headline — `text-3xl font-bold sm:text-[2.25rem]`. `text-[2.25rem]` = 36px (= `h2`).
- `RailCarousel` header — `font-display font-bold text-[28px] sm:text-[32px] lg:text-[40px]`. Three inline pixel sizes, none aligning to the type-scale tokens.
- `ScaleStatsRibbon` headline — `text-3xl font-bold sm:text-4xl lg:text-[42px]`. `text-[42px]` is a magic size.
- `IntegrationsDiagram` headline — `text-3xl font-bold sm:text-4xl lg:text-[42px]`. Same.

**Pattern.** Half the section primitives express their headline at an inline rem value rather than via the `h2` / `h3` / `display-lg` tokens. The values cluster around 28 / 30 / 32 / 36 / 40 / 42 / 54 px — most are off-scale. The §2 spec scale is **28 / 36 / 48 / 64 / 72** for h3 / h2 / h1 / display-lg / display-xl. Some of the inline values *match* a token expressed in rem (e.g. `text-[1.75rem]` = 28px = `h3`) — those are not magic but cosmetic drift (use the token name); others *don't* match (42 / 54). **Worth a single typography pass.**

The §2 spec also says headlines lead with Geist 700 (display) and **500** for sub-section / card-level titles. Most card-surface headlines use `font-bold` (700) — slightly heavy for `h3`/`h4`. SplitEditorial body card uses 700 at `text-2xl` which reads as a chunky title.

### 8. Accent colour use

**Cyan** — used uniformly as the sensor / scanner / lit-edge signal. Cyan hairlines on UIContainer, UIPlaceholder, ProductCard UI zone, FeatureCard, FloatingOperationalPanel, ProductSpotlight embedded UI, CodeArtifact, GlassPanel. Cyan tinted tiles on OutcomeChips icons and PlatformChecklist check icons. **On-system.**

**Violet** — used in `KineticRibbon` gradients, in `ScaleStatsRibbon`'s static glow anchor, in `RibbonStreak`, and in the styleguide ribbon-violet comparison. **On-system per the owner's "violet is good" note** — except:
- **`CardGrid` `with-UI` arrow chip hover** (`CardGrid.tsx:272-275`) — `group-hover:bg-brand-purple group-hover:text-white`. This is brand-purple, not the §3 violet, but the spec rule is "violet is gradient anchor / glow / chip — never CTA / never interactive state." A hover colour change *into* purple uses purple as a kinetic indicator. Worth confirming with the owner.

**Indigo / brand-primary** — `brand-primary` correctly used for icons, inline links, eyebrow accent. `accent-indigo` used in the corner washes (UIContainer, UIPlaceholder, CodeArtifact, FloatingOperationalPanel pool) — on-system.

### 9. Atmosphere / motion / treatments

Three atmosphere vocabularies coexist; each is on-system, but **what gets which** is not consistent:

- `KineticRibbon intensity="calm"` — used in `FeatureCard`, `SplitEditorial` (visual column), `ProductSpotlight`, `InfraDiagramFrame`.
- `KineticRibbon intensity="ambient"` — used in `CardGrid` glass wrapper, `ScaleStatsRibbon`.
- `AmbientGlow tone="cyan" intensity="subtle"` — used in `PageHero`, `FeatureShowcase`, `CTASection`.
- `TopologyTraces` + `BlueprintOverlay` + `InfraGrid` stack — used only in `InfraDiagramFrame`. The most decorated atmosphere on the site.
- `RibbonStreak` — used only in `PageHero` (footer band).
- `ScanSweep` — used in `ProductCard` UI zone and `ProductSpotlight` embedded UI.
- `TopologyTraces density="medium"` — used only in `CrossSellBanner` (banner background) and `density="sparse"` in `DenseCapabilityCard` and `InfraDiagramFrame`.
- `CardGrid` `treatment` surface — own two-radial-gradient compositions per cell.

The vocabularies don't conflict — they're all cool-only — but the "what is the atmosphere for this kind of card?" question doesn't have a system answer. `FeatureCard`, `SplitEditorial`, `ProductSpotlight`, `InfraDiagramFrame` are all "single large editorial card on a section" yet only `InfraDiagramFrame` carries the dotted-grid + blueprint corners. **A single editorial-card atmosphere kit (kept lighter) would tighten this.**

### 10. Crosshair rails

The §7 page-rail signature. Used:
- `ScaleStatsRibbon` — yes, framing the inner content rectangle.
- `IntegrationsDiagram` — yes (per the doc; primitives ref).
- Everywhere else — **not applied.**

The §7 spec says crosshair rails are "section-level — marks individual section frames within the canvas." Most section primitives (PageHero, FeatureShowcase, CTASection, RailCarousel, CrossSellBanner, OutcomeChips, PlatformChecklist, DeveloperBlock, FAQ, TrustBar, TextImageRow, SplitEditorial, ProductSpotlight, FeatureCard, DenseCapabilityCard, FloatingOperationalPanel) do not render them. This is the under-application that the spec language ("every section's content rectangle" — owner brief) flags. **Worth a decision: are crosshair rails on every section, or only on the dark moments + signature primitives?** The current behaviour is the latter; the spec language implies the former.

### 11. Light-mode contrast

The owner's specific concern. After walking the styleguide and the source:

- **Page background vs card background.** The biggest contrast gap. `surface-white` page + `surface-white` card + 1px `surface-border-subtle = #E8EBF5` border = a very faint card edge. On a `surface-soft = #F4F6FF` page the same card edge reads cleanly. Several primitives default to `surface-white` (FeatureShowcase, FAQ, TrustBar default, DeveloperBlock default) — composing two of those in a row on a page leaves the cards inside them undifferentiated from the page.
- **Card border weight.** 1px solid #E8EBF5 against white is the spec — fine on `surface-soft`, faint on `surface-white`. The §8.5/§8.6 hover deepens to `surface-border-stronger = #D1D7E8`, which is also faint by web-fintech standards. The spec is correct in choosing restraint — but in light mode the page can look "all the same colour" because the contrast budget is sitting almost entirely in the type + cyan hairlines.
- **Where it works.** `CardGrid` `treatment` surface (each cell carries its own faint cool gradient) reads more dimensional than the plain product grid. `SplitEditorial` standard reads fine because the visual column has a `bg-surface-soft/55` band against the white card. `CodeArtifact` reads strong because the cyan front-edge hairline anchors it.
- **Where it falls flat.** `FeatureShowcase` on `surface-white` + `UIPlaceholder` on white = nothing-on-nothing in light mode. `PlatformChecklist` on `surface-white` reads as a checklist on a page (correct intent), but adjacent to a `FeatureShowcase` of the same surface it loses any rhythmic break.

**The light-mode reaction is partly real and partly a function of the radius drift in §3.** A card that the eye can't visually parse as a card because its outer radius is smaller than its inner radius reads as a tonal wash, not a surface. Fix the radius taxonomy and a chunk of the "light mode feels off" reaction lifts on its own.

## Prioritized recommendations

Ranked by impact on the light-mode "doesn't feel like one system" reaction.

1. **Radius taxonomy reset.** *Primitives affected:* `ProductCard`, `DenseCapabilityCard`, `FloatingOperationalPanel`, `FeatureCard`, `SplitEditorial`, `ProductSpotlight`, `InfraDiagramFrame`, `CardGrid` (outer wrapper + treatment / no-UI / glass cells). *Change:* fix `app/globals.css` so `--radius-3xl` / `--radius-4xl` resolve to system tokens (or remove them entirely and forbid `rounded-3xl` in code); fix `tokens.json` `radius.button` to 20px to match the spec; then sweep every card-surface so outer cards = `rounded-lg` (§8.5 / §8.7 / §8.8) or `rounded-xl` (§8.1 glass), inner UI zones = `rounded-md`. Concretely: `ProductCard` `rounded-2xl → rounded-lg`; `FeatureCard` / `SplitEditorial` / `ProductSpotlight` / `InfraDiagramFrame` `rounded-3xl → rounded-lg`; `CardGrid` wrapper `rounded-3xl → rounded-xl`; treatment / no-UI cells `rounded-2xl → rounded-lg`. *Cost:* **L** (system-wide token + sweep).
2. **Section-vs-card surface rule.** *Primitives affected:* `FeatureShowcase`, `FAQ`, `DeveloperBlock`, `TrustBar`, `PlatformChecklist`, `TextImageRow`, and anything else defaulting to `surface-white`. *Change:* add an explicit "alternation contract" to §10 — when a section places a `surface-white` card on a section background, the section background must be `surface-soft`; when the section is `surface-white`, the card surface is either `surface-soft` or carries an explicit shadow / treatment to read as a card. Either set sensible per-primitive defaults (e.g. `FeatureShowcase` default `soft`, `FAQ` default `white`, `DeveloperBlock` default `soft`) or document that the page composer picks. *Cost:* **M** (defaults + spec).
3. **Headline / sub-headline token cleanup.** *Primitives affected:* `FeatureCard`, `SplitEditorial`, `ProductSpotlight`, `TextImageRow`, `DeveloperBlock`, `PlatformChecklist`, `FeatureShowcase`, `RailCarousel`, `ScaleStatsRibbon`, `IntegrationsDiagram`. *Change:* replace every `text-[Npx]` / `text-[Nrem]` headline with the nearest §2 token (`h1/h2/h3/h4` or `display-lg/display-xl`). Either add `text-display-lg` etc. as utility classes that map to the §2 token, or sweep callsites to the existing Tailwind utility that hits the same px (e.g. `text-4xl` = 36px = `h2`). Drop magic 42 / 54px. *Cost:* **M**.
4. **Shadow tokenisation.** *Primitives affected:* `ProductCard`, `UIPlaceholder`, `CodeArtifact`, `FloatingOperationalPanel`, `GlassPanel`. *Change:* add `--shadow-card-hover`, `--shadow-glass`, `--shadow-float` to `tokens.json` (matching the §6 named values) and replace all the inline `shadow-[…]` strings with the token utility. *Cost:* **M**.
5. **Focus-ring unification.** *Primitives affected:* `FAQ`, `CrossSellBanner`, `CodeArtifact`, `DeveloperBlock`, `TextImageRow`, `IntegrationsDiagram`. *Change:* ship one `focus-ring` utility (`ring-default` from §6 — `0 0 0 4px rgba(48, 77, 187, 0.16)` light / `rgba(91, 79, 217, 0.24)` dark) and use it everywhere. *Cost:* **S–M**.
6. **`p-7` (28px) vs `p-8` (32px).** *Primitives affected:* `ProductCard`, `DenseCapabilityCard`, `FloatingOperationalPanel`, `RailCarousel` cards. *Change:* `p-7 → p-8` to hit the §4 `space-7` (32px) intent on default product cards. *Cost:* **S**.
7. **`p-14` magic number.** *Primitives affected:* `FeatureCard`, `SplitEditorial`, `ProductSpotlight`, `InfraDiagramFrame`. *Change:* `p-14` (56px) is off-scale; replace with `p-12` (48px = `space-9`). *Cost:* **S**.
8. **Crosshair rails — apply or formally restrict.** *Primitives affected:* every section primitive that currently doesn't render them. *Change:* either (a) decide they sit on **every** section's content rectangle and add a `withCrosshairs?: boolean` (default `true`) to the section primitives, or (b) document that they're reserved for `ScaleStatsRibbon` / `IntegrationsDiagram` / dark moments + signature primitives, and tighten the §7 language. *Cost:* **M** (sweep) or **S** (spec edit).
9. **Glass-border opacity.** *Primitives affected:* `GlassPanel`, `FloatingOperationalPanel`, `ProductSpotlight` embedded UI, `UIContainer embedded`. *Change:* pick **one** opacity for the white-tint border (the §8.1 spec says `0.8`; the code uses `60/55`). Land on `0.6` and document, or land on `0.8` and sweep. *Cost:* **S**.
10. **CardGrid arrow-chip violet hover.** *Primitives affected:* `CardGrid` (arrow chip). *Change:* confirm with owner whether brand-purple as an interactive state is on-system; if not, switch to a darkening of `brand-primary` or to the cyan accent on hover. *Cost:* **S**.
11. **Bespoke eyebrow strings.** *Primitives affected:* `DenseCapabilityCard` group label, `FeatureCard` visual-zone label, `IntegrationsDiagram` node label, `ProductPageRenderer` mis-named eyebrow. *Change:* extend `atoms.tsx` with a `<MonoLabel size="caption" | "eyebrow">` variant or split out `<MonoCaption>`; sweep callsites. *Cost:* **S–M**.
12. **`RailCarousel` hover-shadow wiring bug.** *Change:* the cards have `transition-shadow duration-300` but no `hover:shadow-*` class on light; add `hover:shadow-sm` (or the to-be-tokenised `shadow-card-hover`). *Cost:* **S**.

Suggested order: **1, 2, 3, 4, 7, 6, 9, 5, 12, 10, 11, 8.** That is — fix the radius and surface-rhythm contracts (which solve most of the light-mode reaction in one pass), then unify the typography, then the inline-shadow sweep, then the small padding cleanups, then the harder structural questions (crosshair scope, violet rule) at the end so the system is already tight before those decisions land.

## What I would NOT change

- **The `Eyebrow` atom** is doing its job — leave it alone.
- **The `KineticRibbon` / `AmbientGlow` / `TopologyTraces` / `CrosshairRails` visual primitives** — the bones are good; only the *application* across cards needs tightening.
- **The cool-only palette discipline** — it holds across every primitive. Don't touch it.
- **The `ScanSweep` cyan signal** for "live UI" — used in two places, consistently.
- **`CodeArtifact` and `CrossSellBanner`** — both spec-honest. Don't sweep them in the radius pass; they're already at `rounded-lg`.
- **`OutcomeChips`, `PlatformChecklist`, `DeveloperBlock`** as editorial blocks-on-section-surface — the no-card-frame rhetoric is right for those positions; don't card-ify them.
- **The §10 light-vs-dark rules and the `dark` variant tokens for primitives that force `.dark` locally** (`ScaleStatsRibbon`, `IntegrationsDiagram`, `CodeArtifact background="dark"`, `TrustBar background="dark"`, `DeveloperBlock background="dark"`) — all four use the same pattern; on-system.
- **Violet as anchor** (`ScaleStatsRibbon`, `KineticRibbon` stop, `accent-violet` `#6D28D9`) — owner confirmed; correct restraint.

## Open questions for the owner

1. **Radius default for the editorial-card family.** §8.5 / §8.7 say `radius-lg` (16px) for product / modular / editorial single-card surfaces. Today the build uses `rounded-3xl` (≈22px in CSS due to the token gap) — confirm we drop everything to 16px and let `rounded-xl` (24px) be the glass-only step up, or do you want a softer 20px for editorial cards (in which case we add a new `radius-card` token at 20px and skip 16px for the card family)? Phase 2 hinges on this.
2. **`surface-white` vs `surface-soft` defaults.** Should `FeatureShowcase`, `FAQ`, `DeveloperBlock`, `TrustBar` default to `soft` so cards on them always have surface contrast, with `white` available as a deliberate opt-in for rhythm? Or keep the current `white` default and rely on the page composer to alternate?
3. **Crosshair rails on every section, or only on signature dark moments?** The §7 spec language says "every section's content rectangle"; current behaviour is "only `ScaleStatsRibbon` and `IntegrationsDiagram`." Which is the lock?
4. **Violet on interactive state.** The `CardGrid` `with-UI` arrow chip flips from `brand-primary/[0.08]` → `brand-purple` on hover. Spec says violet is "gradient anchor / glow / chip — never CTA / interactive state." Keep this signature, or replace with a darkening of `brand-primary` (or a cyan lift)?

Audit ends here. Awaiting approval before any source-file change.
