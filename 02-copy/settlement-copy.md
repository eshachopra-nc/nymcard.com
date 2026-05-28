# Settlement

**Slug:** /products/settlement

**Status:** Draft v1

**Navigation:** Products › Settlement

**Last updated:** 23 May 2026

---

# Page brief

Ten-section product page derived from the locked arc in `00-strategy/about-nymcard/page-arc.md`, following the Cards Draft v10 model. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

Stablecoin settlement is treated as a **capability within Settlement**, not a separate product. Regulated settlement is the hero; stablecoin is the mechanism. The standalone `stablecoin-setlement-copy.md` is superseded by this page.

Deviations from the canonical arc (each doing real work on this page):

- Skips the arc's Section 3 "Why Settlement" — the hero already answers it; the four would-be outcomes (capital efficiency, 24/7 operations, multi-rail routing, embedded compliance) surface naturally inside the §3 bento.
- Drops the arc's Section 5 "Built on nCore" cinematic centerpiece. Per owner direction (2026-05-23), product pages on nymcard.com don't carry this section. The nCore positioning lives in the hero, the cross-sell banners, and the FAQ instead.
- Skips a §5 FeatureShowcase. Settlement is a routing and treasury story, not a controls-dashboard story — the bento + the CodeArtifact carry it.
- Skips a Migration section. `settlement.md` doesn't surface a migration story for Settlement; not invented here.

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Settlement capabilities — What can I actually do with it? *(asymmetric bento)*
4. Configuration — How do I configure and integrate it?
5. Industries — Who in my space uses this?
6. Deployment — Can I deploy how I need?
7. FAQ — What about edge cases?
8. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

**Top line (small, above headline):**

Settlement on nCore: 24/7/365

**Headline:**

Settle across corridors in real time.

**Sub-copy:**

Bank-grade settlement infrastructure for cross-border, multi-currency, and stablecoin flows — on one regulated platform.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, settlement UI right. A corridor view animates: two endpoints — a sending currency and a receiving currency — with a routed path between them. The path resolves through one of two rails (a traditional scheme rail and a stablecoin rail), with the chosen rail highlighting in real time. Beneath the corridor, a settlement state ticks through *Submitted → Routed → Settled* with timestamps. A small 24/7/365 badge sits in the corner. The corridor pair cycles slowly — USD → EUR, then USD → AED, then EUR → SGD — to show the multi-corridor surface.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

Beneath the logo row, a single quiet trust line: **Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.**

*(Judgment call carried over from Cards v10 — the trust line is retained as a single quiet shared element, factually grounded in `architecture.md`. Flag for review.)*

---

# 3. Settlement capabilities

**Eyebrow:** Capabilities

**Headline:**

Run settlement end-to-end on one platform.

**Body:**

Cross-border execution, multi-rail routing, and treasury orchestration — with stablecoin and traditional rails inside one architecture.

**Visual:**

Asymmetric bento. Six tiles on a 1-large + 4-small + 1-large composition. Each tile carries a live UI snippet as its primary visual. Editorial spacing, no atmospheric backgrounds — the UIs do the work.

**(Large) Settlement execution**

Run cross-border settlement in real time on stablecoin or scheme rails, with automated fiat bridges on entry and exit.

*UI snippet:* A live settlement panel with the corridor route at the top, the chosen rail highlighting, a state machine ticking through *Submitted → Routed → Settled*, and a one-ledger audit trail line scrolling beneath with the matched fiat and stablecoin legs.

**(Small) Multi-rail routing**

Route across stablecoin and traditional rails by cost, speed, and corridor availability.

*UI snippet:* A routing decision surface comparing two rails side by side — cost, expected settlement time, corridor availability — with the selected rail glowing.

**(Small) Stablecoin settlement**

Settle on USDC and USDT rails where applicable, with automated fiat-to-stablecoin bridges on either side.

*UI snippet:* A bridge converter showing fiat in, stablecoin transit, and fiat out — with the stablecoin leg labeled USDC or USDT.

**(Small) Embedded compliance**

AML, sanctions screening, and regulatory reporting run inside the settlement path.

*UI snippet:* A compliance pane sitting inside the routing flow — AML check, sanctions screen, and a reporting entry written to the audit trail.

**(Small) 24/7/365 operations**

Settle beyond banking hours, weekends, and holidays — no correspondent-banking window dependency.

*UI snippet:* An operating-window indicator showing always-on status with a rolling clock across multiple time zones.

**(Large) Liquidity and treasury**

Orchestrate corridor-aware liquidity with stablecoin pre-funding, reduce collateral lock-up, and give treasury flexibility across markets.

*UI snippet:* A corridor liquidity dashboard with balances, pre-funding positions, and capital deployed across corridors — with a sidebar showing capital freed versus a correspondent-banking baseline.

---

# 4. Configuration

**Eyebrow:** Configuration

**Headline:**

Configure settlement through the API.

**Body:**

Corridor, rail preference, currency, pre-funding, and compliance rules — set per program, applied in real time.

**Sub-CTA:** Read the docs →

**Visual:**

`CodeArtifact` primitive. Dark section frame across both columns. Copy left, code panel right. The code panel carries language tabs across the top (active tab in cyan — *JSON*, with *cURL* and *Node* available), line numbers down the gutter, and restrained syntax highlight (cyan keywords, lighter strings and comments). The JSON config object completes line by line:

```json
{
  "corridor_id": "usd_eur",
  "fiat_in": "USD",
  "fiat_out": "EUR",
  "primary_rail": "stablecoin",
  "fallback_rail": "scheme",
  "stablecoin": "USDC",
  "pre_funding_position": 250000,
  "compliance_profile": "standard",
  "status": "active"
}
```

As the config completes, a small approval state renders beneath the code — an inline confirmation that the corridor was provisioned with the configured values, mirroring Stripe's "config applied" pattern.

**Companion block beneath the code panel:**

*Heading:* One configuration surface

*Body:* Corridors, rails, currencies, pre-funding, and compliance — all configurable per program, on the same API surface as Cards and Money Movement.

*Tertiary link:* Read the configuration docs →

---

# 5. Industries

**Eyebrow:** Industries

**Headline:**

Settlement for every cross-border business.

**Body:**

Banks, exchange houses, PSPs, marketplaces, telecoms, and government agencies run settlement on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are large, generous illuminated tiles — clean, roomy padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"Cross-border settlement and corridor liquidity on one platform."* → /industries/banks

**EXCHANGE HOUSES** — *"Settle remittance corridors in real time and free up correspondent capital."* → /industries/exchange-houses

**PSPS & EMIS** — *"Add a stablecoin settlement layer without standing up a separate blockchain system."* → /industries/psps

**MARKETPLACES** — *"Pay cross-border vendors and sellers on real-time rails."* → /industries/marketplaces

**TELECOMS** — *"Settle international B2B flows on 24/7 corridors."* → /industries/telecoms

**GOVERNMENT** — *"Run controlled digital settlement programs within a compliance-aligned framework."* → /industries/government

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 6. Deployment

**Eyebrow:** Deployment

**Headline:**

Deploy in the cloud, on-soil, or on-premise.

**Body:**

Three deployment models on the same platform — pick the one that fits your regulatory and architectural requirements.

**Visual:**

Three equal cards on a dark background. Each card features a Linear/Vercel-style abstract line illustration in white outline with a single brand-accent color highlight. Geometric, minimal.

**Cloud** — Layered geometric platforms floating in space, connected by thin lines, with several nodes pulsing to suggest multi-region deployment.

*Body:* Multi-region, NymCard-hosted, fully managed.

**On-soil** — A contained geometric form (a faceted dome or bounded shape) with a single point of light at its center. The boundary is visible — the visual metaphor is "inside the perimeter."

*Body:* Hosted by NymCard inside your country, meeting in-country data residency.

**On-premise** — A vertical stack of geometric modules, like nested rectangles, with one module glowing from within. Self-contained, anchored.

*Body:* Run inside your own data center, fully self-hosted.

---

# 7. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What is Settlement?**

Settlement is the nCore layer for cross-border, multi-currency, and stablecoin settlement. It runs on the same platform as Cards and Money Movement, with one ledger and one audit trail across every flow.

**2. Does NymCard support stablecoin settlement?**

Yes. Stablecoin settlement is a capability within the Settlement layer, with support for USDC and USDT where applicable. Automated fiat bridges convert into and out of stablecoin on entry and exit.

**3. Is this a crypto product?**

No. Settlement is regulated settlement infrastructure, not a crypto trading platform, exchange, or consumer digital-asset service. Stablecoin is one rail among several; regulated settlement is the product.

**4. How fast is settlement?**

Real time or near real time, depending on corridor availability and regulatory requirements. Specific settlement times vary by corridor and rail.

**5. How does Settlement work with the rest of nCore?**

Settlement runs on the same nCore platform as Cards and Money Movement. Traditional scheme settlement and stablecoin rails operate inside one architecture — no separate blockchain system required.

**6. How is compliance handled?**

AML, sanctions screening, and regulatory reporting run inside the settlement path, not as add-ons. Every flow is written to the same audit trail used across Cards, Money Movement, and Reconciliation.

**7. Which deployment models are available?**

Cloud, on-soil, and on-premise. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**8. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified. NymCard is a principal member of Visa and Mastercard.

---

# 8. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Run cross-border, multi-currency, and stablecoin settlement on one regulated platform.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Money Movement
- `body:` Move funds across domestic rails, cross-border, and FX — on the same nCore platform that settles them.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

**Banner 2**

- `leadIn:` Card Issuing
- `body:` Issue debit, credit, and prepaid cards on the same platform behind your settlement flows.
- `link.label:` See Card Issuing →
- `link.href:` /products/card-issuing

---

# META

**Page title:** Settlement — Real-time, multi-currency, and stablecoin settlement | NymCard

**Meta description:** Bank-grade settlement infrastructure on nCore — real-time cross-border, multi-currency, and stablecoin settlement for regulated businesses. Principal member of Visa and Mastercard. Cloud, on-soil, or on-premise.

**Primary keyword:** settlement infrastructure

**Secondary keywords:** cross-border settlement, multi-currency settlement, stablecoin settlement, real-time settlement, USDC settlement, USDT settlement, corridor liquidity orchestration

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Money Movement" → /products/money-movement
- "Cards" / "Card Issuing" → /products/card-issuing
- "Financial Crime" (where AML referenced) → /products/financial-crime
- "Reconciliation" (where reconciliation/audit referenced) → /products/reconciliation

---

# Changelog

**v0 → v1 (23 May 2026):** First draft.

- New Settlement product page covering the full Settlement layer, with stablecoin settlement as a capability within it (per `architecture.md` and `settlement.md`). Supersedes the older standalone `stablecoin-setlement-copy.md`, which pre-dates the architecture change.
- Structured against the Cards Draft v10 model: eight sections total.
- **Skipped §3 Why Settlement** — the hero answers "what does this do for me"; the four would-be outcomes (capital efficiency, 24/7 operations, multi-rail routing, embedded compliance) surface inside the §3 bento. Matches Cards' decision to skip the same section.
- **Skipped the canonical §5 Built on nCore** per owner direction — product pages on nymcard.com don't carry the cinematic centerpiece. nCore positioning lives in the hero ("on one regulated platform"), FAQ #1 and #5, and cross-sell Banner 1 ("on the same nCore platform that settles them").
- **Skipped a FeatureShowcase section.** Settlement is a routing and treasury story, not a controls-dashboard story — the bento + the CodeArtifact carry it without a full-width animated dashboard.
- **Skipped a Migration section.** `settlement.md` doesn't surface a migration story for Settlement; not invented here.
- **Bento composition:** 1 large + 4 small + 1 large. Stablecoin settlement is a discrete small tile, not folded into another tile — it's a headline capability of this layer, but framed as one rail among several (per `settlement.md` "don't make stablecoin the hero").
- **Speed claims:** "real time" or "near real time" throughout. The old draft's "seconds, not days" hero is out per `settlement.md`'s explicit ban on absolute speed language.
- **Cross-sell pair:** Money Movement + Card Issuing, per `settlement.md` §Cross-sell.
- **Flagged for review:** the logo strip trust line (carried over from Cards v10); whether the hero top line "24/7/365" reads as a working live signal or just a label.
