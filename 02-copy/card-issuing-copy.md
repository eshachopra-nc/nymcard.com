# Card Issuing

**Slug:** /products/card-issuing

**Status:** Draft v3

**Navigation:** Products › Card Issuing

**Last updated:** 19 May 2026

---

# Page brief

Twelve-section page brief covering story arc, copy, and visual treatment. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Three card types — What can I issue?
4. Card controls — Show me, is this real?
5. Built on nCore — Why NymCard?
6. Credit and financing — Can I do credit, and how?
7. Deployment — Can I deploy how I need?
8. Industries — Who in my space uses this?
9. Partners and integrations — Will this lock me in?
10. Migration — Can I switch without breaking things?
11. FAQ — What about edge cases?
12. Final CTA — Where do I go next?

---

# 1. Hero

**Top line (small, above headline):**

Transactions on nCore today: [live number]

**Headline:**

Launch the card program your customers need.

**Sub-copy:**

Issue debit, credit, and prepaid cards on infrastructure built to scale with you.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, card right. A single 3D card rotating slowly on its vertical axis. As the card rotates, live transaction activity surfaces through the card body in real time. The card morphs between debit, credit, and prepaid states as it rotates, with a small label in the corner shifting accordingly.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

---

# 3. Three card types

**Eyebrow:** Card programs

**Headline:**

Issue debit, credit, and prepaid cards.

**Body:**

One platform, one set of APIs, every card type your customers need.

**Visual:**

Three equal columns side by side. Each column has a live UI snippet as the primary visual, with a large blurred low-opacity card design as the ambient background, and sub-headline plus body underneath.

**Column 1 — Debit**

*Sub-headline:* Cards that move with your customers' account balances.

*Body:* Link cards to live accounts with real-time authorization across consumer and commercial programs.

*UI snippet:* A miniature transaction feed showing live card activity — coffee shop charge, Uber charge, salary deposit — with the balance updating in real time at the top.

*Background:* Blurred debit card in cool blue tones.

**Column 2 — Credit**

*Sub-headline:* Revolving credit with configurable limits.

*Body:* Run credit programs with installment plans, billing cycles, and repayment configured through the API.

*UI snippet:* A credit panel showing the credit limit, a usage bar, and an installments toggle that reveals an EMI breakdown.

*Background:* Blurred credit card in deeper brand color.

**Column 3 — Prepaid**

*Sub-headline:* Loadable cards with full spend visibility.

*Body:* Issue reloadable, gift, payout, and disbursement cards with per-card spend tracking.

*UI snippet:* A top-up surface with quick amount options and a ledger entry that animates in with the updated balance.

*Background:* Blurred prepaid card in lighter tone.

---

# 4. Card controls

**Eyebrow:** Card controls

**Headline:**

Control every card and every transaction.

**Body:**

Freeze cards, set limits, and block categories — in real time, for any cardholder.

**Visual:**

Full-bleed product UI right-aligned, copy compressed left. A single card detail view, universal across consumer and commercial use cases. The UI demonstrates freeze and unfreeze, per-transaction limits, and merchant category controls. A live authorization stream runs continuously beneath the modal — approvals tick through, and a declined authorization appears when its matching category is toggled off, demonstrating the rule taking effect. The KYC and AML check runs silently inside the authorization path.

---

# 5. Built on nCore

**Eyebrow:** Infrastructure

**Headline:**

Built on nCore.

**Body:**

nCore is NymCard's full-stack payments platform. Cards, processing, credit, and operations run on one system — with principal Visa and Mastercard membership.

**Visual:**

Horizontal architecture diagram, right-aligned. Three stacked layers: *Your application*, *nCore* (dominant, brand gradient), *Visa · Mastercard*. A faint intermediary processing layer appears briefly between *Your application* and *Visa/Mastercard* before dissolving away. *PCI DSS · ISO 27001* annotations sit beside the nCore layer.

---

# 6. Credit and financing

**Eyebrow:** Credit and financing

**Headline:**

Run credit and installment programs.

**Body:**

Configure credit limits, billing cycles, repayment, and installment plans through the API.

**Visual:**

Copy left, glass config panel right. The panel contains a JSON config object that completes line by line:

```json
{
  "program_type": "credit",
  "credit_limit_amount": 10000,
  "currency": "USD",
  "billing_cycle_day": 1,
  "grace_period_days": 21,
  "minimum_payment_pct": 5,
  "installments_enabled": true,
  "status": "active"
}
```

As the config completes, an approval toast slides in and a live credit product preview generates alongside the panel — a card design with the configured limit, repayment summary, and installment plan visualized. Inline list beside the panel: *Limits · Billing · Installments · Delinquency · Reporting*.

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

# 8. Industries

**Eyebrow:** Industries

**Headline:**

Card programs for every industry.

**Body:**

Banks, fintechs, telecoms, retailers, governments, and mobility platforms run card programs on NymCard.

**Visual:**

Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are illuminated tiles — clean, generous padding, no atmospheric backgrounds, no imagery. The cinematic feel comes from spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Small icon at top-left in the accent color
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"Retail and commercial card portfolios on one platform."*

**FINTECHS** — *"Launch debit, credit, prepaid, and BNPL programs."*

**TELECOMS** — *"Wallet-linked debit, prepaid, and rewards cards."*

**RETAIL & MARKETPLACES** — *"Co-branded, gift, and payout cards for customers and sellers."*

**GOVERNMENT** — *"Prepaid and disbursement cards with auditable spend."*

**MOBILITY & FLEET** — *"Fuel and expense cards with category-level controls."*

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 9. Partners and integrations

**Eyebrow:** Partners and integrations

**Headline:**

Use NymCard's services or bring your own vendors.

**Body:**

Card fulfillment, call center, and program management — delivered by NymCard or integrated with the vendors you already work with.

**Visual:**

Hub-and-spoke composition. NymCard / nCore at the center as a glowing node. Five spokes radiate outward to labeled partner categories: *Card fulfillment, Rewards engines, Cashback platforms, Customer support, KYC and identity vendors*. Connection lines pulse between center and spokes. Hover on a spoke reveals a short descriptor for what plugs in there.

---

# 10. Migration

**Eyebrow:** Migration

**Headline:**

Migrate from legacy infrastructure with agentic AI.

**Body:**

Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team.

**Visual:**

Horizontal flow visualization, full width. Five stages laid out left to right: *Discovery → Mapping → Configuration → Parallel run → Cutover*. Above each stage, an abstract geometric agent avatar (Linear-style, not anthropomorphized) handles its phase. Stages light up in sequence with completion checkmarks. A small status line after the cycle: *"Full portfolio, re-carding, and phased migrations supported."*

---

# 11. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What card types can I issue on NymCard?**

Debit, credit, and prepaid cards — physical, virtual, and tokenized — on the same platform.

**2. Does NymCard own its processor, or use a third party?**

NymCard owns nCore, its own processing platform, and is a principal member of Visa and Mastercard. No third-party processor sits between your application and the schemes.

**3. Can I deploy NymCard on-premise?**

Yes. NymCard supports cloud, on-soil, and on-premise deployment. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**4. How long does a card program take to launch?**

Typically less than three months, subject to program complexity and market requirements. Larger or more configured programs can take longer.

**5. Can I migrate from my existing card processor?**

Yes. NymCard offers agentic AI-led migration that handles discovery, mapping, configuration, parallel running, and cutover. Full portfolio, re-carding, and phased migrations are supported.

**6. Do I have to use NymCard for card fulfillment and customer support?**

No. You can use NymCard's services or bring your own vendors for fulfillment, rewards, cashback, and customer support.

**7. What certifications does NymCard hold?**

nCore is PCI DSS certified and ISO 27001 certified.

**8. Is credit card issuing supported, or only debit and prepaid?**

Credit is fully supported. Configure credit limits, billing cycles, grace periods, and installment plans through the API.

---

# 12. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Launch debit, credit, or prepaid card programs on infrastructure built to scale.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Two adjacent product cards beneath:**

**Embedded Lending →**

Credit decisioning, origination, and servicing on the same platform.

**Cross-Border & FX →**

Domestic rails, cross-border, FX, and Open Finance.

---

# META

**Page title:** Card Issuing — Debit, Credit, Prepaid on One Platform | NymCard

**Meta description:** Launch debit, credit, and prepaid card programs on nCore — NymCard's full-stack payments platform. Principal member of Visa and Mastercard. Cloud, on-soil, or on-premise.

**Primary keyword:** card issuing infrastructure

**Secondary keywords:** debit card issuing, credit card processing, prepaid card program, virtual card issuance, card program migration

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Embedded Lending" → /products/embedded-lending
- "Cross-Border & FX" → /products/money-movement
- "Identity" (where KYC is referenced) → /products/identity
- "Financial Crime" (where fraud/AML is referenced) → /products/financial-crime