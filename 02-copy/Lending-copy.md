# Lending

**Slug:** /products/lending

**Status:** Draft v3

**Navigation:** Products › Lending

**Last updated:** 23 May 2026

---

# Page brief

Ten-section product page derived from the locked arc in `00-strategy/about-nymcard/page-arc.md` with deliberate deviations. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

Deviations from the canonical arc (each doing real work on this page):

- Keeps the arc's Section 3 "Why [product]" — Lending's four outcomes (new revenue, higher conversion, retention, faster time to market) are substantively distinct from the hero and worth carrying. The hero names *what* you can launch; §3 names *why it matters for your business*.
- Drops the arc's Section 5 "Built on nCore" cinematic centerpiece. Per owner direction (2026-05-23), product pages on nymcard.com don't carry this section. The nCore positioning lives in the hero sub-copy, the FAQ (#2, #5, #7), and the cross-sell banners instead.
- §6 **Underwriting** recast onto the `CodeArtifact` primitive — dark section frame, language tabs, line numbers, companion block beneath.
- §7 **Industries** recast onto the `RailCarousel` sparse variant — eyebrow, copy, link. No icon.
- §10 **Final CTA** cross-sell recast as two `CrossSellBanner` items (Cards and Money Movement, per `lending.md` §Cross-sell).
- Adds §8 **Migration** (the canonical arc has no Migration section; Lending has a real migration story for existing portfolios and books).

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Why embed credit — What does this do for me?
4. Credit journey — What can I configure?
5. Underwriting — How does decisioning work?
6. Industries — Who in my space uses this?
7. Deployment — Can I deploy how I need?
8. Migration — Can I switch without breaking things?
9. FAQ — What about edge cases?
10. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

**Headline:**

Embed credit into every payment flow.

**Sub-copy:**

Launch BNPL, installment, revolving credit, and working capital programs on nCore. You retain the lending relationship; NymCard provides the infrastructure.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, UI right. A credit program configuration surface, three-dimensional, slowly rotating on its vertical axis. As it rotates, different program types surface across the panel — *BNPL*, *Installment*, *Revolving*, *Working capital* — with the configuration values (credit limit, billing cycle, repayment terms) updating to match each program. Subtle particle field behind the panel with depth-of-field blur.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

---

# 3. Why embed credit

**Eyebrow:** Why embed credit

**Headline:**

Embed credit where your customers already transact.

**Body:**

Four ways embedded credit changes your payment flows.

**Four cards:**

**New revenue lines**

Earn interest, interchange, and fee income from credit programs added to your existing customer base.

**Higher conversion**

Offer BNPL and installment options at checkout to lift basket size and close more sales.

**Stronger retention**

Keep customers transacting on your products with card-linked credit and revolving lines.

**Faster time to market**

Launch credit programs on infrastructure already built for scale.

**Visual:**

Four clean tiles in a row. Each tile carries a small abstract icon at the top — geometric, white outline, single brand-accent color highlight. No motion at rest; subtle lift on hover.

---

# 4. Credit journey

**Eyebrow:** Credit journey

**Headline:**

Configure every stage of credit.

**Body:**

Origination, decisioning, disbursement, collections, and repayment on one platform.

**Visual:**

Asymmetric bento grid. One large tile (top-left, 2×2), four small tiles (1×1 each), one large tile (bottom-right, 2×1). Each tile carries a live UI snippet as its primary visual.

**(Large, 2×2) Card-linked credit**

Embed revolving credit directly into your card program. One platform for cards, credit, and repayments.

*UI snippet:* A card detail panel showing the credit limit, available credit, and a revolving line meter. A repayment toggles options below — *Pay in full · Pay minimum · Convert to installments*.

**(Small) Origination**

KYC, KYB, and digital onboarding through the API.

*UI snippet:* An onboarding step indicator advancing — *Identity verified · Income verified · Approved*.

**(Small) Decisioning**

Connect bureaus, open banking data, or your own scoring model.

*UI snippet:* A decisioning rules panel with score thresholds and approval logic.

**(Small) Disbursement**

Disburse to cards, accounts, or wallets in the same session.

*UI snippet:* A disbursement destination selector with three options highlighted.

**(Small) Collections**

Automate billing cycles, repayment, and early delinquency intervention.

*UI snippet:* A billing cycle and delinquency status panel showing a payment schedule.

**(Large, 2×1) Repayment structures**

Run conventional interest, flat fee, or reducing balance structures — with the schedule and pricing logic that fits each program.

*UI snippet:* A repayment schedule chart showing three structure shapes overlaid for comparison.

---

# 5. Underwriting

**Eyebrow:** Decisioning

**Headline:**

Configure underwriting rules through the API.

**Body:**

Connect to credit bureaus, open banking data, or your own scoring model. Adjust limits, pricing, and approval logic by segment and product.

**Sub-CTA:** Read the underwriting docs →

**Visual:**

`CodeArtifact` primitive. Dark section frame across both columns. Copy left, code panel right. The code panel carries language tabs across the top (active tab in cyan — *JSON*, with *cURL* and *Node* available), line numbers down the gutter, and restrained syntax highlight (cyan keywords, lighter strings and comments). The JSON config object completes line by line:

```json
{
  "segment": "consumer",
  "credit_structure": "revolving",
  "scoring_model": "partner_internal_v2",
  "data_sources": ["bureau", "open_banking", "transaction_history"],
  "credit_limit_range": [500, 25000],
  "approval_threshold": 720,
  "pricing_tier": "risk_based"
}
```

As the config completes, a live decisioning visualization renders beneath the code. Three applicant cards animate through the rules in sequence: applicant A clears the threshold and renders as approved with a credit limit calculated against the configured range; applicant B falls below the threshold and renders as declined with the reasoning visible; applicant C triggers a manual review state. The visualization makes the configured rules visible by showing them apply in real time.

**Companion block beneath the code panel:**

*Heading:* Decisioning you can defend

*Body:* Bureau, open banking, and transaction-history signals combine with your own scoring model — every decision is logged with the rules and inputs that produced it.

*Tertiary link:* Read the underwriting docs →

---

# 6. Industries

**Eyebrow:** Industries

**Headline:**

Credit programs for every industry.

**Body:**

Banks, fintechs, retailers, telecoms, healthcare providers, and mobility platforms run credit programs on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are large, generous illuminated tiles — clean, roomy padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**CONSUMER BANKING** — *"Revolving credit, installment plans, and credit cards on one platform."* → /industries/consumer-banking

**COMMERCIAL BANKING** — *"Working capital, invoice financing, and SME credit lines that scale."* → /industries/commercial-banking

**FINTECHS** — *"Launch BNPL, installment, and digital-first credit products."* → /industries/fintechs

**RETAIL & MARKETPLACES** — *"BNPL and installment options at checkout to lift basket size."* → /industries/retail

**TELECOMS** — *"Device financing and consumer installment plans inside your customer relationship."* → /industries/telecoms

**HEALTHCARE** — *"Patient financing embedded at the point of care."* → /industries/healthcare

**AUTOMOTIVE** — *"Dealer-linked auto financing and lease structures."* → /industries/automotive

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

**On-soil** — A contained geometric form (a faceted dome or bounded shape) with a single point of light at its center. The boundary is visible — the visual metaphor is "inside the perimeter."

*Body:* Hosted by NymCard inside your country, meeting in-country data residency.

**On-premise** — A vertical stack of geometric modules, like nested rectangles, with one module glowing from within. Self-contained, anchored.

*Body:* Run inside your own data center, fully self-hosted.

---

# 8. Migration

**Eyebrow:** Migration

**Headline:**

Migrate from legacy infrastructure with agentic AI.

**Body:**

Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team. Existing lending portfolios, books, and credit programs all supported.

**Visual:**

Horizontal flow visualization, full width. Five stages laid out left to right: *Discovery → Mapping → Configuration → Parallel run → Cutover*. Above each stage, an abstract geometric agent avatar (Linear-style, not anthropomorphized) handles its phase. Stages light up in sequence with completion checkmarks. A small status line after the cycle: *"Full portfolio, re-carding, and phased migrations supported."*

---

# 9. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What is lending infrastructure?**

Lending infrastructure enables banks, fintechs, and digital businesses to launch and operate credit programs — including BNPL, installment plans, revolving credit, and working capital — directly inside their payment flows. NymCard's Lending product runs on nCore.

**2. Does NymCard fund loans?**

No. NymCard provides credit infrastructure only — the technology layer for origination, decisioning, disbursement, and collections. The financial institution retains the lending relationship, the funding model, and the regulatory responsibility.

**3. What credit structures does NymCard support?**

Revolving credit, charge cards, installment plans, BNPL, working capital loans, and invoice financing across consumer and commercial segments. Conventional interest, flat fee, and reducing balance structures are all supported on the same platform.

**4. How does decisioning work?**

NymCard's decisioning layer supports connections to credit bureaus, open banking data sources, and partner-owned scoring models. Underwriting rules, credit limits, and approval thresholds are configured through the API and applied in real time.

**5. Can NymCard integrate with my existing card program?**

Yes. Embedded Lending runs on the same nCore platform as Card Issuing, with one customer record across both products. Card-linked credit, revolving credit limits, and installment plans on existing cards are all natively supported.

**6. What deployment models are available?**

Cloud, on-soil, and on-premise are all native deployment models on the NymCard platform. The deployment model is chosen based on your regulatory requirements and architecture preferences.

**7. Is NymCard regulated?**

NymCard operates as a regulated infrastructure provider. nCore is PCI DSS certified and ISO 27001 certified. NymCard does not hold a lending license — the partner institution holds the lending relationship and the regulatory responsibility.

---

# 10. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Launch BNPL, installment, revolving credit, and working capital programs on infrastructure built to scale.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Cards
- `body:` Issue debit, credit, and prepaid cards on the same nCore platform behind your credit programs.
- `link.label:` See Cards →
- `link.href:` /products/card-issuing

**Banner 2**

- `leadIn:` Money Movement
- `body:` Disburse loans and move repayments across domestic rails, cross-border, and FX — on one platform.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

---

# META

**Page title:** Lending — Credit Infrastructure for BNPL, Installment, and Revolving Credit | NymCard

**Meta description:** Launch BNPL, installment, revolving credit, and working capital programs on nCore. Configure underwriting, disbursement, and collections through one platform. NymCard provides the credit infrastructure; you retain the lending relationship.

**Primary keyword:** digital lending infrastructure

**Secondary keywords:** BNPL infrastructure, installment plan platform, revolving credit infrastructure, credit decisioning API, embedded credit platform, working capital infrastructure

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Cards" / "Card Issuing" → /products/card-issuing
- "Money Movement" → /products/money-movement
- "Financial Crime" (where compliance is referenced) → /products/financial-crime

---

# Changelog

**v2 → v3 (23 May 2026):** Structural realignment to the Cards v10 model.

- **Dropped §5 Built on nCore** entirely. Owner direction: product pages on nymcard.com don't carry the canonical arc's "cinematic centerpiece" section. The nCore positioning is preserved across other sections — the hero sub-copy now carries the *"You retain the lending relationship; NymCard provides the infrastructure"* framing previously buried in §5's body, and FAQ #2 / #5 / #7 carry the funding-boundary, one-platform, and regulatory statements respectively.
- **Restructured §5 Underwriting (renumbered from v2 §6)** onto the `CodeArtifact` primitive — dark section frame, language tabs (JSON active, cURL/Node available), line numbers, restrained syntax highlight. The JSON config block carries over verbatim. The live decisioning visualization moves from "alongside the panel" to "beneath the code" to match the CodeArtifact composition. Added a companion block beneath the code panel — heading + body + tertiary link — mirroring Cards v10 §5.
- **Restructured §6 Industries (renumbered from v2 §7)** onto the `RailCarousel` sparse variant. Industry copy carries over verbatim. Dropped the "Small icon at top-left in the accent color" line from the per-card spec. Added `/industries/...` hrefs per the Cards v10 pattern.
- **Restructured §10 Final CTA (renumbered from v2 §11)** — converted the two adjacent product cards into two `CrossSellBanner` items with `leadIn / body / link.label / link.href` structure. Cross-sell pair swapped from *Card Issuing + Identity* to *Cards + Money Movement* per `lending.md` §Cross-sell (the fact file wins). Identity removed — per `architecture.md`, Identity is a capability inside Financial Crime, not a standalone product.
- **§3 Why embed credit kept.** Unlike Cards (which skipped §3 because its hero answered "what does this do for me"), Lending's four outcomes — new revenue, higher conversion, retention, faster time to market — are substantively distinct from the hero and earn their place.
- **Hero sub-copy** lightly extended with a second sentence carrying the funding-boundary framing previously in dropped §5: *"You retain the lending relationship; NymCard provides the infrastructure."*
- **§8 Migration kept.** Lending has a real migration story (existing portfolios, books, and credit programs) per the v2 §9 body. Same Migration section as Cards v10 §8.
- **All other sections renumber** from v2's §6–§11 → v3's §5–§10. Content unchanged in §1 Hero (apart from the sub-copy extension), §2 Logo strip, §3 Why embed credit, §4 Credit journey, §7 Deployment, §8 Migration, §9 FAQ.
- **META internal links** updated — *Identity* removed; *Card Issuing* renamed to *Cards / Card Issuing* to match the cross-sell.
- Decision applied: project memory `ncore-centerpiece-removed-from-product-pages.md` and the page-arc amendment marking §5 as "optional on product pages."
