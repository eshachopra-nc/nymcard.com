# Variety rollout — per-page archetype recipes

Goal: the 8 industry pages currently read as one page eight times (every section a luminous glass card). Re-compose each page from the **section-archetype variety kit** so each page has a DISTINCT mix and no page is a wall of cards. Exchange Houses is the approved REFERENCE — match its quality and restraint.

## Reference (study this first)
- Reworked page: `06-build/app/(site)/solutions/exchange-houses/page.tsx` + `06-build/components/sections/exchange-houses/*` (WhyExchangeHousesChanging, FinancialPlatform, WhyChooseNymCard=EditorialSplit, LaunchYourWay=segmented columns, ExplorePlatform=BridgeBand).
- The kit: `06-build/components/sections/archetypes/` (barrel `index.ts`), documented in `01-design-system/design-system.md` §8.32.

## The kit (11 archetypes)
- **EditorialSplit** — sticky headline left + numbered/dotted hairline list right. (numbers are accent-teal/cyan, not grey.)
- **OversizedEditorialSplit** — display-scale headline ↔ tight hairline list (scale-contrast sibling).
- **ProcessRail** — numbered steps threaded on one spine.
- **FeatureMatrix** — compact label + one-liner rows on a hairline grid (spec table).
- **BorderedListField** — bordered list on a faint blueprint field with crosshair corners (spec sheet).
- **StatBand** — gradient figures separated by vertical hairlines.
- **BigFigureRow** — OVERSIZED numeric proof figures, hairline-separated, airy.
- **StatementBand** — FULL-BLEED DARK band, ONE oversized editorial statement. The page's contrast anchor.
- **HorizontalRow** — a horizontal rail of typographic panels (the alternative to a card grid for a set of peers).
- **AlternatingRows** — full-width copy↔visual rows that alternate side (wraps TextImageRow). The ONE home for a luminous product-illustration card.
- **BridgeBand** — the always-dark "Explore/Built on nCore" closer with the radiating cyan **nucleus** (NO chips, NO diagram). Description white in dark.

Also: **OutcomeChips** (composition) = the "why it's changing" 3-outcome opener — keep it as the consistent opener on every page (gradient icon chips, no crosshairs, no divider). **PillarCards** (luminous glass) = ONLY for the ONE marquee/product-UI section per page.

## RULES (every page)
1. **One card section maximum.** Exactly ONE section per page may use luminous glass cards (or AlternatingRows with a luminous-card visual) — the marquee/product-UI slot. EVERY other section uses a NON-card archetype from the kit.
2. **OutcomeChips** stays the "why it's changing" opener. **BridgeBand** (always-dark nucleus) stays the Explore/Built-on-nCore closer. These two are the consistent signatures; everything between them VARIES per the recipe.
3. **No bespoke product-UIs yet** — marquee/journey sections keep a single labelled `UIPlaceholder` (or the existing one). Do NOT build animated product surfaces.
4. **Copy verbatim** from the existing page components (already humanized). Keep the existing FAQ + final CTA (CTASection over TopologyTraces). Keep metadata, JsonLd, Footer.
5. Tokens only, cool palette (navy+cyan; violet object-accent only), light AND dark, reveal-on-scroll + restrained hover (Framer Motion, reduced-motion safe), server components by default, no eyebrows on openers, third-person voice.
6. Each page must use its ASSIGNED mix below — do not converge on EditorialSplit-everywhere.
7. Put any new per-page section components in `06-build/components/sections/<slug>/` (replace the old glass-card components in place). If a small bespoke layout is needed (like EH's segmented columns), inline it — don't reinvent a kit archetype.

## Per-page recipes (section-type → archetype)

### retail-banking  (mix: AlternatingRows · ProcessRail · FeatureMatrix)
- Why changing → OutcomeChips (keep)
- Digital Banking Experience (5 pillars: Spend/Move/Save/Borrow/Engage) → **AlternatingRows** — the MARQUEE (five alternating copy↔visual rows; each row's visual is a labelled UIPlaceholder; this is the one card/visual section).
- Launch your way (3) → **ProcessRail**
- Why choose (5) → **FeatureMatrix**
- Built on nCore → BridgeBand (keep)

### government  (mix: BorderedListField · FeatureMatrix · OversizedEditorialSplit · BigFigureRow)
- Why changing → OutcomeChips (keep)
- Public programmes (the journey/ecosystem) → keep its single journey **UIPlaceholder** as the marquee, capabilities as supporting text (NOT cards).
- Public payment infrastructure (6) → **BorderedListField** (spec/blueprint — fits government)
- Launch your way (3) → **FeatureMatrix**
- Built for public accountability (5) → **OversizedEditorialSplit**
- Add ONE **BigFigureRow** as a contrast beat (illustrative public-funds figures, e.g. programs / disbursed / audited — keep neutral, flag as illustrative).
- Built on nCore → BridgeBand (keep)

### fintechs  (mix: HorizontalRow · OversizedEditorialSplit · StatementBand)  [Build→Launch→Expand→Scale]
- Why fintechs choose NymCard (3 outcomes w/ descriptions) → OutcomeChips (keep)
- Growth journey → keep the single growth-journey **UIPlaceholder** as the marquee; the six capabilities as supporting expansion text (NOT cards).
- Build the experience (3 delivery) → **HorizontalRow**
- Why it scales (5) → **OversizedEditorialSplit**  (owner: change layout completely, NO UI here — drop the central nCore placeholder.)
- Add ONE **StatementBand**: "Build once. Expand over time." (full-bleed dark contrast anchor.)
- Explore nCore → BridgeBand (keep)

### telecommunications  (mix: FeatureMatrix · segmented-columns · EditorialSplit)
- Why changing → OutcomeChips (keep)
- Subscriber journey → keep the single subscriber-journey **UIPlaceholder** as the marquee; the 5 capabilities as supporting text.
- Financial services for every subscriber (6) → **FeatureMatrix**
- Launch your way (3) → **segmented columns** (mirror EH LaunchYourWay's segmented treatment)
- Why telecom providers choose NymCard (5) → **EditorialSplit** (numbered)  (owner: change layout, NO UI.)
- Explore nCore → BridgeBand (keep)

### retail-marketplaces  (mix: HorizontalRow · OversizedEditorialSplit · segmented-columns)
- Why changing → OutcomeChips (keep)
- From commerce to financial services (journey) → keep the single journey **UIPlaceholder**; lifecycle stages as supporting text. **OWNER BUG: text must NOT sit inside a card** — render it as plain editorial text beside/under the visual, not boxed.
- Financial services for commerce (6) → **HorizontalRow**
- Launch your way (3) → **segmented columns**
- Why retailers & marketplaces choose NymCard (5) → **OversizedEditorialSplit**
- Explore nCore → BridgeBand (keep)

### healthcare  (mix: AlternatingRows · BorderedListField · StatBand)
- Why changing → OutcomeChips (keep)
- Healthcare journey → keep the single journey **UIPlaceholder** as marquee (supporting text, not cards).
- Financial services (capabilities) → **AlternatingRows** (the marquee visual rows) OR **BorderedListField** — pick ONE; the OTHER capability/why section uses the other.
- Launch your way (3) → **segmented columns** or **ProcessRail**
- Why choose (5) → **BorderedListField** (if AlternatingRows used above) else EditorialSplit
- Add ONE **StatBand** if a proof beat fits (illustrative, flagged).
- Built on nCore → BridgeBand (keep)

### commercial-banking  (LEAVE — already has bespoke pillar UIs)
- No rework needed; it already has a distinct treatment (Financial OS with real surfaces). Just confirm its Why-changing uses the shared updated OutcomeChips. Do NOT touch its FinancialOS surfaces.

## Verify (per page)
- `cd 06-build && npx tsc --noEmit 2>&1 | grep -v validator.ts` → clean.
- Dev server http://localhost:3000 (slow; domcontentloaded + generous timeouts; @playwright/test only from 06-build/node_modules; set theme via localStorage 'nymcard-theme'). The dev SectionNav is OFF now (no overlay to hide). Screenshot the full page LIGHT and DARK; confirm genuine section-to-section variety, no wall of cards, no flat/clipped surfaces, the BridgeBand reads dark with the nucleus.
- Report: section-by-section which archetype each now uses, files changed, tsc + screenshot paths.
