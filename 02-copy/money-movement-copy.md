# Money Movement

**Slug:** /products/money-movement

**Status:** Draft v1

**Navigation:** Products › Money Movement

**Last updated:** 23 May 2026

---

# Page brief

Ten-section product page derived from the locked arc in `00-strategy/about-nymcard/page-arc.md` with deliberate deviations, modeled on the Cards Draft v10 structure. Voice: Stripe, Vercel, Linear, Brex. UIs carry the story.

Deviations from the canonical arc (each doing real work on this page):

- Skips the arc's Section 3 "Why [product]" — the hero already answers it.
- Splits the capability story into two consecutive sections: §3 **Money movement capabilities** (asymmetric bento — six capability families) and §4 **Corridor routing** (FeatureShowcase — full-width animated routing console). Money Movement's "control" story is the corridor-by-corridor operational view; it warrants its own showcase.
- Drops the arc's Section 5 "Built on nCore" cinematic centerpiece, per locked decision (`ncore-centerpiece-removed-from-product-pages.md`). The nCore positioning lives in the hero, FAQ, and cross-sell banners.
- Adds §8 **Migration** (the canonical arc has no Migration section; Money Movement's "corridor activation" story is a real phased-migration narrative per `money-movement.md`).

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Money movement capabilities — What can I actually do with it? *(asymmetric bento)*
4. Corridor routing — Can I run corridors in real time? *(FeatureShowcase)*
5. Configuration — How do I configure and integrate it?
6. Industries — Who in my space uses this?
7. Deployment — Can I deploy how I need?
8. Migration — Can I move corridors over without disrupting revenue?
9. FAQ — What about edge cases?
10. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

**Top line (small, above headline):**

Corridors live on nCore today: [live number]

**Headline:**

Move money where your customers need it.

**Sub-copy:**

Orchestrate cross-border payments, route corridors, and manage FX on infrastructure you control — and monetize.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, product UI right. A live corridor map sits center-right — a single payment originates from one node, branches through a routing decision, and resolves on a destination node with an FX rate stamped beside it. The route highlights as it executes; a small ledger entry surfaces in the lower-right showing the corridor, the rate, the spread, and the settlement leg. The animation loops with a different corridor each pass.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

Beneath the logo row, a single quiet trust line: **Principal member of Visa and Mastercard · Connected to Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram · PCI DSS Level 1 · ISO 27001.**

*(Judgment call: the arc says no body on the logo strip. The trust line carries Money Movement's network connectivity — a load-bearing trust signal for this product specifically — and is factually grounded in `architecture.md` and `money-movement.md`. Flag for review.)*

---

# 3. Money movement capabilities

**Eyebrow:** Capabilities

**Headline:**

Orchestrate every flow, every corridor, every currency.

**Body:**

One platform for domestic flows, cross-border routing, FX, settlement, and compliance — with the revenue staying on your side of the spread.

**Visual:**

Asymmetric bento. Six tiles on a six-column grid in a 1 large + 4 small + 1 wide-large composition:

- Row 1 — **Payment orchestration** (full-width, tall showpiece).
- Rows 2–3 — Four half-thirds: **Connectivity**, **Settlement and reconciliation**, **Compliance-aware routing**, **Corridor activation**.
- Row 4 — **FX and treasury** (full-width closing tile).

Each tile carries a live UI snippet. Editorial spacing, no atmospheric backgrounds — the UIs do the work.

**(Full-width, tall) Payment orchestration**

Route domestic and international flows through the corridors you choose, with live visibility on every payment.

*UI snippet:* A corridor map at the top with three active corridors lit. Beneath, a payment-tracking table updates row by row — origination, FX leg, settlement leg, status — with one in-flight payment moving from `routing` to `settled` in real time.

**(Small) Connectivity**

Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram — built in.

*UI snippet:* A connection panel listing the four networks with green status indicators. A small toggle next to each shows the network as active or standby.

**(Small) Settlement and reconciliation**

Multi-currency settlement with automated reconciliation across every leg.

*UI snippet:* A settlement summary card showing three currency balances reconciling in parallel — incoming, outgoing, net — with a "reconciled" stamp animating in.

**(Small) Compliance-aware routing**

AML, sanctions, and transaction monitoring run inside the routing decision.

*UI snippet:* A routing decision tree with a sanctions check node lighting up; the payment routes around a flagged corridor and resolves through an alternate.

**(Small) Corridor activation**

Activate new corridors without rebuilding — phased rollout, parallel routes, gradual consolidation.

*UI snippet:* A corridor list with one corridor toggling from `inactive` to `parallel run` to `active`. A small percentage indicator beside it climbs from 10% to 100% as traffic shifts over.

**(Full-width, wide) FX and treasury**

Set your own FX pricing, manage spreads and liquidity, and keep the corridor revenue on your side.

*UI snippet:* A treasury console across the tile. Left: a live FX rate panel for three currency pairs with spreads configurable per pair. Center: a liquidity meter per currency. Right: a daily P&L summary showing FX revenue captured by the partner, with a quiet note: *"Spread accrues to your account."*

---

# 4. Corridor routing

**Eyebrow:** Controls

**Headline:**

Route every corridor in real time.

**Body:**

Configure routing rules, manage FX, and respond to corridor conditions — on a console built for treasury and payments teams.

**Visual:**

`FeatureShowcase` pattern. Two-column header above a full-width animated dashboard. Header left: headline. Header right: body.

Beneath the header, a full-width corridor routing console. A feature callout list runs vertically down the left side:

- Corridor routing rules
- Live FX rates and spread controls
- Compliance checks inline
- Per-corridor visibility

Each item highlights in sequence. As it does, the right side of the console responds: the routing rules panel updates a priority order, the FX rate panel toggles a spread on a corridor and the rate refreshes, the compliance lane flashes a sanctions check passing inline, and the corridor-by-corridor table reveals throughput, FX captured, and settlement status per row. A live payment moves through the console end-to-end as the cycle resolves — routed, priced, screened, settled — with a final ledger entry confirming the partner's FX capture.

---

# 5. Configuration

**Eyebrow:** Configuration

**Headline:**

Configure routing and FX through the API.

**Body:**

Corridor preferences, FX spreads, settlement legs, and compliance rules — defined per corridor, applied in real time.

**Sub-CTA:** Read the docs →

**Visual:**

`CodeArtifact` primitive. Dark section frame across both columns. Copy left, code panel right. The code panel carries language tabs across the top (active tab in cyan — *JSON*, with *cURL* and *Node* available), line numbers down the gutter, and restrained syntax highlight (cyan keywords, lighter strings and comments). The JSON config object completes line by line:

```json
{
  "corridor": "USD_PHP",
  "primary_route": "visa_direct",
  "fallback_route": "mastercard_xb",
  "fx_spread_bps": 35,
  "settlement_currency": "USD",
  "settlement_leg": "T+0",
  "compliance_profile": "standard",
  "status": "active"
}
```

As the config completes, a small confirmation renders beneath the code — an inline state showing the corridor live on the partner's account, with the spread, route, and settlement leg applied. Mirrors Stripe's "config applied" pattern.

**Companion block beneath the code panel:**

*Heading:* Corridor-level configuration

*Body:* Routes, fallback paths, FX spreads, settlement legs, and compliance profiles — all configurable per corridor and per partner program, on the same API surface.

*Tertiary link:* Read the configuration docs →

---

# 6. Industries

**Eyebrow:** Industries

**Headline:**

Money movement for every industry.

**Body:**

Banks, exchange houses, fintechs, marketplaces, telecoms, and governments move money on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are large, generous illuminated tiles — clean padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"International payments and treasury flows on one platform."* → /industries/banks

**EXCHANGE HOUSES** — *"Corridor routing and FX with revenue on your side."* → /industries/exchange-houses

**FINTECHS** — *"Cross-border payouts, FX, and settlement through one API."* → /industries/fintechs

**MARKETPLACES** — *"Pay sellers across currencies and countries."* → /industries/marketplaces

**TELECOMS** — *"Remittance corridors connected to wallets and accounts."* → /industries/telecoms

**GOVERNMENT** — *"Disbursement and cross-border programs with auditable flows."* → /industries/government

**NBFIs AND PSPs** — *"Add corridors and FX without rebuilding."* → /industries/nbfis

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 7. Deployment

**Eyebrow:** Deployment

**Headline:**

Deploy in the cloud, on-soil, or on-premise.

**Body:**

Three deployment models on the same platform — pick the one that fits your regulatory and architectural requirements.

**Visual:**

Three equal cards on a dark background. Each card features a Linear/Vercel-style abstract line illustration in white outline with a single brand-accent color highlight. Geometric, minimal.

**Cloud** — Layered geometric platforms floating in space, connected by thin lines, with several nodes pulsing to suggest multi-region deployment.

*Body:* Multi-region, NymCard-hosted, fully managed.

**On-soil** — A contained geometric form with a single point of light at its center. The boundary is visible — the visual metaphor is "inside the perimeter."

*Body:* Hosted by NymCard inside your country, meeting in-country data residency.

**On-premise** — A vertical stack of geometric modules, like nested rectangles, with one module glowing from within. Self-contained, anchored.

*Body:* Run inside your own data center, fully self-hosted.

---

# 8. Migration

**Eyebrow:** Migration

**Headline:**

Move corridors over without disrupting revenue.

**Body:**

Activate new corridors in parallel with existing routes, shift volume gradually, and consolidate when you're ready.

**Visual:**

Horizontal flow visualization, full width. Five stages laid out left to right: *Discovery → Corridor mapping → Parallel activation → Phased shift → Consolidation*. Above each stage, an abstract geometric agent avatar (Linear-style, not anthropomorphized) handles its phase. Stages light up in sequence with completion checkmarks. A live corridor table runs beneath, showing two corridors active in parallel — one on a legacy route, one on NymCard — with the traffic percentage shifting from 10/90 to 90/10 across the cycle. A small status line after the cycle: *"Phased corridor activation supported, with revenue continuity across the migration."*

---

# 9. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What is Money Movement?**

Money Movement is the money movement layer of nCore — NymCard's full-stack payments infrastructure platform. It is a multi-currency payment orchestration and FX layer: partners route corridors, manage FX pricing, orchestrate settlement, and capture corridor revenue. It is infrastructure, not a remittance network or FX broker.

**2. Does NymCard take the FX spread or corridor revenue?**

No. The partner sets FX pricing and captures the spread. NymCard provides the infrastructure that makes the routing, pricing, and settlement possible — the revenue stays with the partner.

**3. Which networks and corridors are connected out of the box?**

Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram are built in. Additional corridors can be activated per program.

**4. Can I activate new corridors without disrupting my existing ones?**

Yes. Corridors can be activated in parallel with existing routes, traffic can shift gradually, and consolidation happens on your timing. Existing revenue is not interrupted during the migration.

**5. How does compliance fit into routing?**

AML, sanctions, and transaction monitoring run inside the routing decision. Compliance-aware routing can re-route a payment around a flagged corridor and resolve through an alternate path.

**6. Can I deploy Money Movement on-premise?**

Yes. NymCard supports cloud, on-soil, and on-premise deployment. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**7. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified.

**8. Does Money Movement connect to Cards and Settlement on NymCard?**

Yes. Money Movement runs on nCore alongside Cards, Lending, Settlement, Financial Crime, and Reconciliation — one platform, one customer record, one ledger across products.

---

# 10. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Orchestrate corridors, manage FX, and capture cross-border revenue on infrastructure built to scale.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Settlement
- `body:` Settle in real time, across currencies and stablecoin rails — on the same nCore platform behind your corridors.
- `link.label:` See Settlement →
- `link.href:` /products/settlement

**Banner 2**

- `leadIn:` Cards
- `body:` Issue debit, credit, and prepaid cards tied to the same accounts and corridors your customers move money through.
- `link.label:` See Cards →
- `link.href:` /products/card-issuing

---

# META

**Page title:** Money Movement — Cross-Border Payments, FX, and Corridor Orchestration | NymCard

**Meta description:** Orchestrate cross-border payments, route corridors, and manage FX on nCore — NymCard's full-stack payments platform. Connected to Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram. Cloud, on-soil, or on-premise.

**Primary keyword:** cross-border payment infrastructure

**Secondary keywords:** corridor routing, FX infrastructure, multi-currency settlement, remittance infrastructure, cross-border payments API, payment orchestration platform

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Settlement" → /products/settlement
- "Cards" → /products/card-issuing
- "Financial Crime" (where AML/sanctions are referenced) → /products/financial-crime

---

# Changelog

**v0 → v1 (23 May 2026):** Initial draft.

- **Structural model:** Cards Draft v10. Ten sections, two capability sections (bento + FeatureShowcase), CodeArtifact for configuration, RailCarousel sparse for industries, three-card Deployment, Migration before FAQ, CrossSellBanner pair beneath the final CTA.
- **Section 3 "Why [product]" skipped.** Hero already names the buyer outcome ("Move money where your customers need it" + revenue-and-control sub-copy). A Why-product section would have restated the hero in tile form.
- **Capability surface — asymmetric bento.** Six tiles in a 1 large + 4 small + 1 wide-large composition. Opening showpiece is **Payment orchestration** (Money Movement's core promise). Four smalls cover **Connectivity**, **Settlement and reconciliation**, **Compliance-aware routing**, **Corridor activation**. Closing wide-large is **FX and treasury** — positioned as a full treasury console, surfacing the partner-owned-revenue claim that defines this product.
- **FeatureShowcase added as §4.** Money Movement has a strong operational "control" story (routing rules + live FX + compliance inline + per-corridor visibility) that warrants its own full-width animated dashboard separate from the bento. Pattern matches Cards v10 §4.
- **Migration retained.** Per `money-movement.md`, corridor activation is explicitly a phased-migration story (phased activation, parallel settlement routes, gradual consolidation). Stages adapted to corridor language: Discovery → Corridor mapping → Parallel activation → Phased shift → Consolidation. The Cards-style "Migrate from legacy with agentic AI" framing was not used here — `money-movement.md` does not name agentic AI in the migration story, only phased corridor activation. Flag for owner: agentic-AI-led corridor migration may apply, but is not in the fact file.
- **Cross-sell pair: Settlement, then Cards.** Per `money-movement.md` §Cross-sell.
- **Revenue-side language carried throughout.** "Capture corridor revenue", "the revenue stays on your side of the spread", "spread accrues to your account", FAQ #2 makes the revenue boundary explicit. Per `money-movement.md`: never imply NymCard takes the spread.
- **Domestic rails treated lightly.** Per scope note in `money-movement.md`, domestic rails are thinly documented. The page leads with cross-border, FX, and orchestration; domestic flows are referenced only in the orchestration tile body ("domestic and international flows") and in §5 ("domestic flows" implied through "every flow, every corridor, every currency"). No domestic-rail-specific claims invented.
- **Hero top line:** "Corridors live on nCore today" — assumes a live count exists. Flag for owner; drop if no live number is available.
- **Logo-strip trust line:** retained from Cards v10 pattern, with Money Movement-specific network connectivity (Visa Direct, Mastercard XB, Western Union, MoneyGram) added per `money-movement.md`. Worth a review on whether the connectivity belongs in the trust line or only in the §3 Connectivity tile.
