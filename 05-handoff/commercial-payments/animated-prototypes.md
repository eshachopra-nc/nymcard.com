# Commercial Payments — Animated Product-UI Prototypes (Proposal)

**Status:** CONCEPTS ONLY — for owner review. Nothing built, no code, no commits.
**Page:** `/solutions/commercial-payments`
**Date:** 2026-06-04
**Author:** product-ui-designer

---

## Ground rules this proposal lives inside

- **POV is INSTITUTION-voiced.** Every surface reads as *the institution's product, serving its business customers*. Labels say "Business Profile", "Supplier", "Programme", "Customer" — never "you, the business owner". The institution is the operator looking at its book of business customers.
- **One canonical treatment.** Every animated surface is composed on the product-illustration kit (`components/visuals/product-illustration` — `IllustrationField` + `IllustrationCard` + atoms), light AND dark. No flat panels, no `GlassBed`. This is the same frame the homepage Products bento uses — it is the bar.
- **The current §3 uses `UIPlaceholder` (skeleton stand-ins).** Replacing those six placeholders with six distinct kit surfaces is the single biggest win on this page, and the centerpiece the copy calls "Editorial".
- **Motion is gated, never ambient slop.** Each surface = one entrance reveal on scroll-into-view (`whileInView`, once) + ONE motivated beat (a sequenced reveal via `useSequentialReveal`, or a `group-hover` reaction). Every beat is `prefers-reduced-motion` safe — the reduced-motion fallback is always "render at the resolved end-state, no movement." No pulsing dots, no fake live tickers, no perpetual loops.
- **Cool palette only.** Navy + cyan lead; violet is an OBJECT accent only (the physical card body on the Commercial Cards row) — never a field or CTA (the Paymentology trap). No warm/amber. No real brand names or fabricated merchant/PAN/amount data — neutral on-system values only.
- **One focal element per surface** (one `Stat`, one `GlowNode`, or one verdict). Mono reserved for the eyebrow + at most one sublabel.
- **Build medium:** hand-authored tokenized React + SVG on the kit. No Stitch. Recraft only for the one raster object (the physical violet card body) if code can't carry it — and the existing CardsUI proves code can, so even that is optional.

A surface returns `<><IllustrationField /><IllustrationCard>…</IllustrationCard></>` inside a fixed-aspect cell. The §3 rows already reserve a `min-h-[24–30rem]` `scale="wide"` UI column per row — the kit surfaces drop into exactly that slot.

---

## Section-by-section

### §1 — Hero (PageHero, `textOnly`)

**Animate? NO — keep editorial.** The hero is deliberately text-forward (`textOnly`), and the shared `PageHero` already carries the page-load motion and the page rails. Adding a product surface here would (a) duplicate the homepage hero carousel's job and (b) pre-empt the §3 centerpiece, diluting it. The strongest opening move on this page is restraint: a clean institution-voiced headline, then the §3 marquee does the heavy visual storytelling. **Recommendation: no UI. Leave as-is.**

---

### §2 — Why Commercial Payments Is Changing (OutcomeChips)

**Animate? NO new surface — keep the OutcomeChips archetype.** This section's job is three *institution-side business outcomes* (deposits / fee income / lending), not a product screen. The visual direction says "Three outcome cards… do not reference individual products." A literal product UI here would contradict that and steal the §3 reveal. The `OutcomeChips` row already reveals on scroll. **Recommendation: no animated product UI.** (If the owner wants more life, the one acceptable beat is a restrained scroll-in stagger on the three chips — but that's a polish call for the marketing-page-builder, not a product surface.)

---

### §3 — The Financial OS For Businesses (THE MARQUEE — six distinct surfaces)

This is the spine. Six alternating editorial rows, each currently a labelled `UIPlaceholder`. **Every row gets its own bespoke kit surface — no two share a treatment.** Each is institution-voiced (the institution operating the workflow on behalf of a business customer). Each has exactly one focal element and one motivated beat. All drop into the existing `scale="wide"` UI column.

Concept-to-atom mapping is deliberate so they read as six genuinely different products, not one template recoloured.

#### Row 1 — Commercial Cards
- **Concept:** A card-programme console. The glowing electric-violet **physical card body** (straight, never tilted) sits beside a compact programme-type stack — `VIRTUAL · PHYSICAL · DEBIT · PREPAID · CREDIT` — rendered as `ControlChip` rows, with an `Eyebrow` "Card programme" and a `LiveTag`. The card face carries a neutral `•••• 4291` and a cyan chip, no wordmark. This is the one row that earns the violet object accent.
- **Focal element:** the violet card body.
- **Entrance:** card + chip column slide in from the row's UI side (the existing FeatureRow reveal already does this at the row level; the surface adds its internal reveal).
- **Motivated beat:** `useSequentialReveal` pops the five programme-type checks in one-by-one (virtual → physical → debit → prepaid → credit) as the row scrolls in; replays on hover. Reads as "issue every card type on one platform."
- **Reduced-motion:** all five chips render checked, card static.
- **Composition:** `IllustrationField` + `IllustrationCard`; reuses the `CardsUI` card-body recipe (violet `CARD_FACE`, cyan top-edge) + `ControlChip` + `PopIn`. Closest cousin to the homepage CardsUI, but distinct content (programme types, not freeze/eCommerce/travel toggles).
- **Effort:** **S** (the card body + chip-reveal already exist in CardsUI — recompose, don't reinvent). No net-new primitive.

#### Row 2 — Accounts Payable
- **Concept:** An **AP approvals queue** — the institution's view of a business customer's outgoing supplier payments awaiting approval. A short stack of payable rows (`Supplier A · APPROVED`, `Supplier B · APPROVED`, `Supplier C · PENDING`) as `Slab` rows with a `GlowCheck` on the approved ones and one indigo "pending" marker, under an `Eyebrow` "Approvals queue" and a focal `Stat` — e.g. a neutral count like `3 to approve` or a total payable `Stat`. Suppliers are neutral letters/initials, never real brands; amounts are neutral on-system values.
- **Focal element:** the `Stat` (count or total).
- **Entrance:** rows reveal at row level.
- **Motivated beat:** on scroll-in / hover, the `PENDING` row flips to `APPROVED` — the indigo `!` marker swaps to a `GlowCheck` (one `PopIn`), and the focal count ticks down by one. Reads as "approve outgoing payments in the flow."
- **Reduced-motion:** renders with the row already approved and the count at its settled value.
- **Composition:** `IllustrationField` + `IllustrationCard`; `Slab` rows + `GlowCheck` + `PopIn` + `Stat`. Structurally an approvals list — visually unlike Row 1's card console.
- **Effort:** **M**. No net-new primitive (an approval row is a `Slab` + `GlowCheck`).

#### Row 3 — Accounts Receivable
- **Concept:** An **AR collections / invoice board** — the institution's view of a business customer's incoming collections. Three invoice rows (`INV · PAID`, `INV · PAID`, `INV · DUE`) as `MatchRow`-style or `Slab` rows, with a focal `Stat` for **amount collected** and a `LiveTag` "collected today". This is the mirror of AP — money *coming in*. Invoice IDs are neutral (`INV-0418`), amounts neutral on-system.
- **Focal element:** the "collected" `Stat`.
- **Entrance:** row-level reveal.
- **Motivated beat:** on scroll-in / hover, the `DUE` invoice resolves to `PAID` (a `GlowCheck` pops in), the collected `Stat` counts up. Reads as "collections clearing in real time." Deliberately the inverse motion of Row 2 (AP counts *down* approvals, AR counts *up* collected) so the payable/receivable pair reads as two halves of one cash position.
- **Reduced-motion:** settled paid state, `Stat` at final value.
- **Composition:** `Slab` rows + `GlowCheck` + `Stat` + `LiveTag`. Distinct from AP by direction, focal metric, and the paid/due semantics.
- **Effort:** **M**. No net-new primitive.

#### Row 4 — Payroll & Workforce Payments
- **Concept:** A **disbursement fan-out** — one payroll run paying many recipients at once. A single navy "run" `NavyTile` (glyph `$` or a payroll glyph) on the left, an `Arrow`, then a small column/grid of recipient nodes (`GlowNode` dots or initial-chips) lighting up as paid. `Eyebrow` "Payroll run", a focal `Stat` for **recipients paid** (e.g. `128 paid`), `LiveTag` "disbursing". Recipients are anonymous nodes — never names.
- **Focal element:** the recipients `Stat` (or the run `NavyTile` as the single source — pick one; recommend the `Stat`).
- **Entrance:** the run tile + arrow draw in.
- **Motivated beat:** `useSequentialReveal` lights the recipient nodes one-by-one (a fan-out cascade) and the `Stat` counts up to the final figure. Reads as "one run, many workers paid." This is the only row with a one-to-many *topology*, so it reads structurally unlike the list rows (2 & 3) and the card console (1).
- **Reduced-motion:** all nodes lit, `Stat` at final.
- **Composition:** `NavyTile` + `Arrow` + a grid of `GlowNode` + `PopIn` + `Stat`. The fan-out grid of nodes is the one thing to watch — see "Net-new primitive" note below.
- **Effort:** **M**. Possible net-new atom: a `NodeCluster` / fan-out grid helper (flag below).

#### Row 5 — Working Capital & Financing
- **Concept:** A **credit-line / financing panel** — the institution underwriting against the business's own platform activity. A focal **available-credit `Stat`** (e.g. `$250,000` available) with a utilisation bar (a `Slab` track with a cyan fill), an `Eyebrow` "Credit line", and two `ControlChip` rows for the financing types in the copy: `Credit line · Invoice financing · Business lending`. The narrative hook ("underwrite against real spending behaviour") is shown by a subtle cyan link cue from a small "activity" mark into the limit — abstract, not a chart.
- **Focal element:** the available-credit `Stat`.
- **Entrance:** panel reveals at row level.
- **Motivated beat:** on scroll-in / hover, the utilisation bar fills to its resting level (a width transition) and the available `Stat` settles — reads as "a live, drawable limit." Single restrained fill, not a perpetual loop.
- **Reduced-motion:** bar at its resting fill, `Stat` final.
- **Composition:** `Stat` + a `Slab`-based progress track (cyan fill) + `ControlChip`. The progress/utilisation bar is a small net-new pattern (flag below).
- **Effort:** **M**. Net-new atom candidate: a `MeterBar` / utilisation track (flag below).

#### Row 6 — Real-Time Insights
- **Concept:** An **insights summary** — the institution's real-time read on a business customer's position. A focal `Stat` for a headline figure (e.g. net cash position) with a `LiveTag` "real-time", plus a tidy set of three quiet metric `Slab`s labelled `SPENDING · CASH FLOW · LIABILITIES` (mono `SubLabel`s, neutral values), and a small abstract trend mark (an SVG sparkline rendered as a clean cyan stroke — geometry, not fabricated data points). Mirrors the homepage `InsightsUI` vocabulary but with commercial-payments labels.
- **Focal element:** the headline `Stat`.
- **Entrance:** row-level reveal.
- **Motivated beat:** on scroll-in, the sparkline stroke draws left-to-right (SVG `pathLength` reveal) once, and the `Stat` counts up. Reads as "visibility as it happens." Draw-once, not looping.
- **Reduced-motion:** sparkline fully drawn, `Stat` final.
- **Composition:** `Stat` + `LiveTag` + three `Slab` metric tiles + a single SVG path. Reuse the `InsightsUI` sparkline approach for consistency.
- **Effort:** **M** (S if we lift InsightsUI's sparkline wholesale).

**Why the six don't collide:** card console (object + chips) · approvals list (count down) · collections list (count up) · fan-out topology (one-to-many) · credit meter (a filling bar) · insights summary (a drawing sparkline). Six different *shapes of UI* and six different *shapes of motion*. That is the centerpiece.

---

### §4 — Serve Every Business Segment (HorizontalRow)

**Animate? NO new surface — keep the typographic rail.** SME / Mid-Market / Enterprise is a positioning statement, not a screen, and the visual direction is explicitly "Three-column segment layout… avoid industry-specific examples." A product UI here would fabricate segment-specific data and fight the §3 centerpiece. The `HorizontalRow` already reveals on scroll. **Recommendation: no animated product UI.** If the owner wants the three panels to feel more alive, a per-panel `group-hover` lift is the ceiling — a marketing-page-builder polish, not a product surface.

---

### §5 — Launch Your Way (segmented columns) — **the second-biggest opportunity**

The copy flags this as "one of the strongest sections" and a "major differentiator", and the visual direction asks for **Business Portal / Mobile App / Admin Console connected to nCore**. Today it's three quiet icon columns (Branded Website / Branded App / APIs & SDKs) — correct, but it under-delivers on the "connected to nCore" idea.

- **Concept:** A **"three experiences, one core" device-and-core diagram** rendered as ONE kit surface beneath (or alongside) the three columns: three lit device frames — a **browser window** (Branded Website), a **phone** (Branded App), and a **console panel** (APIs & SDKs / Admin Console) — each a small kit-styled frame, all three connected by `Arrow` connectors down to a single focal **nCore `GlowNode`** at the centre/base. The institution's brand sits on the website + app frames (a neutral brand mark, no real logo); the console shows abstract endpoint rows. This makes "everything runs on one architecture" literal and visual — the differentiator the copy wants.
- **Focal element:** the central nCore `GlowNode` (the one core everything connects to).
- **Entrance:** the three device frames reveal, then the connectors draw down into the nCore node.
- **Motivated beat:** on scroll-in (and replay on hover), `useSequentialReveal` draws the three `Arrow` connectors into the core one-by-one and the nCore node pulses to "lit" once as the last connector lands. Reads as "three front-ends, one platform." Draw-once cascade, not a perpetual pulse.
- **Reduced-motion:** all three connectors drawn, node lit, static.
- **Composition:** `IllustrationField` + `IllustrationCard` (`pad={false}` for free device layout) + three small bespoke device frames (browser/phone/console, built from the kit's slab/edge vocabulary) + `Arrow` + `GlowNode` + `PopIn`. Sits as a full-width surface under the three existing columns, or replaces the column icon-chips with the device frames — owner's call on layout.
- **Effort:** **L** — three device frames are net-new sub-components (browser chrome, phone frame, console panel). They should be built as reusable kit atoms (`DeviceFrame` variants) so other Launch-style sections across the site can reuse them. **Flag: propose adding `DeviceFrame` (browser / phone / console variants) to the kit** rather than one-offing them here.

---

### §6 — Why Institutions Choose NymCard (EditorialSplit)

The visual direction explicitly asks for **"Five benefit cards around a central business profile"** and says it "should feel operational and strategic, not product-focused." Today it's an `EditorialSplit` hairline list — clean, but it doesn't deliver the "central profile with five benefits radiating" picture.

- **Concept:** A **business-profile hub** — a central institution-side **"Business Profile" `NavyTile`/node** (the single customer record), with the five reasons as labelled `ControlChip`/`Slab` satellites connected to it by `Arrow` spokes: One Customer Record · Unified Risk Intelligence · Real-Time Visibility · Expand Over Time · Deploy Your Way. The hub is the "one source of truth"; the spokes are what that unlocks. Strategic and operational, not a product screen — which fits the direction.
- **Focal element:** the central Business Profile node (the one record).
- **Entrance:** the central node reveals first.
- **Motivated beat:** `useSequentialReveal` draws the five spokes outward from the hub one-by-one (or pops the five satellite chips in) as the section scrolls in; replays on hover. Reads as "everything contributes to one record." Draw-once, not looping.
- **Reduced-motion:** all spokes drawn, all five chips present, static.
- **Composition:** `IllustrationField` + `IllustrationCard` (`pad={false}`) + a central `NavyTile`/`GlowNode` + five `Slab`/`ControlChip` satellites + `Arrow` spokes + `PopIn`. This is a **radial hub-and-spoke layout** — the one genuinely new layout shape on the page.
- **Caveat / decision needed:** the homepage `AIDecisioningUI` and the §5 nCore-hub concept above both lean on a hub-and-spoke idea. To avoid two hub diagrams on one page, **either** §5 stays a device diagram and §6 is the hub (recommended — they read differently), **or** §6 stays the `EditorialSplit` and we only build §5. The owner should pick; I'd keep both but make §5 clearly device-led and §6 clearly profile-led.
- **Effort:** **L** — radial layout + spoke connectors are net-new. **Flag: propose a `HubSpoke` layout helper for the kit** (a centred focal node + N positioned satellites + connectors) so §6 here and any future "X around a central Y" section reuse one primitive instead of hand-placing nodes.

---

### §7 — Explore nCore (BridgeBand)

**Animate? NO — already handled.** The `BridgeBand` is the page's one dark beat and already carries the radiating cyan nucleus ("the core made literal"). It is on-system and motivated. Adding a kit surface here would create a second dark focal moment and compete with the nucleus. **Recommendation: leave as-is.**

---

### §8 — FAQ (shared component)

**Animate? NO.** Shared FAQ, emits FAQPage schema, no product surface. Leave as-is.

---

### §9 — Final CTA (CTASection over TopologyTraces)

**Animate? NO new surface.** Already composed over the cyan `TopologyTraces` backdrop with the ribbon CTA. On-system and sufficient. Leave as-is.

---

## Net-new primitives flagged (do NOT build without folding back into the kit)

Per the cardinal rule — if the kit is missing an atom, propose adding it to the kit, never one-off it:

1. **`DeviceFrame`** (browser / phone / console variants) — for §5 Launch. Reusable anywhere a "branded experiences on one core" story appears (other use-case + product pages).
2. **`HubSpoke`** layout helper (centred focal node + positioned satellites + `Arrow` connectors + sequential spoke reveal) — for §6, and reusable for any "five things around a central Y" direction site-wide. Would also retro-fit the homepage `AIDecisioningUI`.
3. **`MeterBar`** (a `Slab` track + cyan fill, animatable width) — for §5 Row 5 credit utilisation; reusable for any limit/utilisation/progress read (e.g. the Lending page).
4. **`NodeCluster`** fan-out grid (a row/grid of `GlowNode`s revealed sequentially) — for §3 Row 4 Payroll disbursement; reusable for any one-to-many disbursement/broadcast story.

Each should land in `kit.tsx`, the `/visual-system` styleguide, and `design-system.md` §8.1, coordinated with the ui-ux-designer, before use.

---

## Prioritised shortlist — build these first

The biggest impact for the least risk, in order:

1. **§3 Rows 1–3 (Commercial Cards, Accounts Payable, Accounts Receivable)** — the top half of the centerpiece, and the three rows that map most directly to recognised institution products. Rows 1–3 are **S/M** and reuse existing atoms almost entirely (card body from CardsUI, list rows + checks + Stat from Reconciliation/Lending vocabulary). Shipping these three immediately replaces the most-visible placeholders with real surfaces and proves the centerpiece. **Start here.**

2. **§5 Launch — the "three experiences, one core" device diagram** — the section the copy itself flags as the strongest differentiator, and currently the most under-delivered (quiet icon columns). Highest *narrative* payoff. **L** because of the `DeviceFrame` primitive — but that primitive pays back across the site.

3. **§3 Rows 4–6 (Payroll fan-out, Financing meter, Insights summary)** — completes the centerpiece. Build after Rows 1–3 so the `NodeCluster` + `MeterBar` primitives are justified by a finished top half. **M each.**

**Then, owner's call:** §6 hub-and-spoke (the visual direction explicitly asks for it, but it needs the `HubSpoke` primitive and a decision on whether two hub-style diagrams (§5 core + §6 profile) coexist — I recommend yes, kept visually distinct).

## Sections where I recommend NO animation
§1 Hero · §2 Opportunity · §4 Segments · §7 Explore nCore · §8 FAQ · §9 Final CTA. These are either deliberately editorial, already animated on-system, or would fabricate data / steal the §3 reveal. Restraint here is what lets the §3 marquee and §5 Launch land as the two signature moments.

---

*End of proposal. Concepts only — awaiting owner review before any build.*
