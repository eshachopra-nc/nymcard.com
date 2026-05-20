**Slug:** /products/lending

**Status:** Draft v2

**Navigation:** Products › Lending

**Last updated:** 19 May 2026

---

# Page brief

Eleven-section page brief covering story arc, copy, and visual treatment. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Why embed credit — What does this product do for me?
4. Credit journey — What can I configure?
5. Lending built into the payment stack — Why NymCard? *(cinematic centerpiece)*
6. Underwriting — How does decisioning work?
7. Industries — Who in my space uses this?
8. Deployment — Can I deploy how I need?
9. Migration — Can I switch without breaking things?
10. FAQ — What about edge cases?
11. Final CTA — Where do I go next?

---

# 1. Hero

**Headline:**

Embed credit into every payment flow.

**Sub-copy:**

Launch BNPL, installment, revolving credit, and working capital programs on nCore.

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

# 5. Built on nCore *(cinematic centerpiece)*

**Eyebrow:** Infrastructure

**Headline:**

Lending built into the payment stack.

**Body:**

NymCard runs Lending on nCore — the same platform that runs your card and payment programs. One customer record, one ledger, one audit trail. NymCard provides the infrastructure. You retain the lending relationship and regulatory responsibility.

**Visual:**

The page's most-produced moment. Full-width architecture diagram showing four horizontal layers stacked vertically — *Your application*, *nCore platform*, *NymCard products*, *Schemes and rails*.

The middle layer (nCore) is dominant — brand gradient, glowing edge. Sitting on top of it, the *NymCard products* layer shows three connected modules: *Cards*, *Lending*, *Money Movement*. Beneath, the *Schemes and rails* layer shows Visa, Mastercard, and local rails.

Motion sequence: a credit application enters at the top from *Your application*. As it flows down, it passes through *Embedded Lending* where the decisioning happens, then routes laterally to *Card Issuing* where the credit limit is set on a card, and the same flow continues down through the schemes layer where the disbursement settles. Throughout the animation, a single thread visualizes the customer record persisting across all three NymCard products — making the "one customer record, one ledger, one audit trail" claim visible.

The ambient state, after the animation completes, shows a faint continuous data flow between the three NymCard products on the nCore layer — reinforcing that they are not separate systems but one platform.

---

# 6. Underwriting

**Eyebrow:** Decisioning

**Headline:**

Configure underwriting rules through the API.

**Body:**

Connect to credit bureaus, open banking data, or your own scoring model. Adjust limits, pricing, and approval logic by segment and product.

**Sub-CTA:** Read the underwriting docs →

**Visual:**

Copy left, glass config panel right. The panel contains a JSON config object that completes line by line:

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

As the config completes, a live decisioning visualization appears alongside the panel. Three applicant cards animate through the rules in sequence: applicant A clears the threshold and renders as approved with a credit limit calculated against the configured range; applicant B falls below the threshold and renders as declined with the reasoning visible; applicant C triggers a manual review state. The visualization makes the configured rules visible by showing them apply in real time.

---

# 7. Industries

**Eyebrow:** Industries

**Headline:**

Credit programs for every industry.

**Body:**

Banks, fintechs, retailers, telecoms, healthcare providers, and mobility platforms run credit programs on NymCard.

**Visual:**

Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are illuminated tiles — clean, generous padding, no atmospheric backgrounds, no imagery. The cinematic feel comes from spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Small icon at top-left in the accent color
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**CONSUMER BANKING** — *"Revolving credit, installment plans, and credit cards on one platform."*

**COMMERCIAL BANKING** — *"Working capital, invoice financing, and SME credit lines that scale."*

**FINTECHS** — *"Launch BNPL, installment, and digital-first credit products."*

**RETAIL & MARKETPLACES** — *"BNPL and installment options at checkout to lift basket size."*

**TELECOMS** — *"Device financing and consumer installment plans inside your customer relationship."*

**HEALTHCARE** — *"Patient financing embedded at the point of care."*

**AUTOMOTIVE** — *"Dealer-linked auto financing and lease structures."*

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 8. Deployment

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

# 9. Migration

**Eyebrow:** Migration

**Headline:**

Migrate from legacy infrastructure with agentic AI.

**Body:**

Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team. Existing lending portfolios, books, and credit programs all supported.

**Visual:**

Horizontal flow visualization, full width. Five stages laid out left to right: *Discovery → Mapping → Configuration → Parallel run → Cutover*. Above each stage, an abstract geometric agent avatar (Linear-style, not anthropomorphized) handles its phase. Stages light up in sequence with completion checkmarks. A small status line after the cycle: *"Full portfolio, re-carding, and phased migrations supported."*

---

# 10. FAQ

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

# 11. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Launch BNPL, installment, revolving credit, and working capital programs on infrastructure built to scale.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Two adjacent product cards beneath:**

**Card Issuing →**

Debit, credit, and prepaid cards on one infrastructure layer.

**Identity →**

KYC, KYB, IDV, and ongoing monitoring across every credit program.

---

---

# META

**Page title:**  Lending — Credit Infrastructure for BNPL, Installment, and Revolving Credit | NymCard

**Meta description:** Launch BNPL, installment, revolving credit, and working capital programs on nCore. Configure underwriting, disbursement, and collections through one platform. NymCard provides the credit infrastructure; you retain the lending relationship.

**Primary keyword:** digital lending infrastructure

**Secondary keywords:** BNPL infrastructure, installment plan platform, revolving credit infrastructure, credit decisioning API, embedded credit platform, working capital infrastructure

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Card Issuing" → /products/card-issuing
- "Money Movement" → /products/money-movement
- "Identity" (where KYC/KYB is referenced) → /products/identity
- "Financial Crime" (where compliance is referenced) → /products/financial-crime