# Industry | Mobility

**Slug:** /industry/mobility

**Status:** Draft v2 — 25 May 2026

**Navigation:** Industries › Mobility

**Last updated:** 25 May 2026

---

# Page brief

Ten-section industry page derived from the locked arc in `00-strategy/about-nymcard/industry-page-arc.md`. Voice modeled on Stripe, Vercel, Linear, Brex. UIs carry the story.

Deviations from the canonical arc: none. Standard 10-section build (PayKit callout retained — mobility platforms ship branded driver and customer apps).

**Story arc:**

1. Hero — What is this for my industry?
2. Outcome chips — What's in it for me?
3. Challenge / Solution — Why does my industry need this?
4. What you can build — What can I actually build?
5. PayKit callout — Want a branded driver or customer app on top?
6. Platform — Is your platform serious?
7. Developer — How does my team integrate?
8. Cross-sells — Which products power this?
9. FAQ — What about edge cases?
10. Final CTA — Where do I go next?

---

# 1. Hero

**Headline**

Pay drivers, manage fleets, and finance vehicles on one platform.

**Sub-copy**

Driver payouts, fleet cards, auto financing, and customer payment programs — built for mobility platforms managing distributed networks at scale.

**Primary CTA:** Talk to us

**Visual**

F-pattern asymmetric, text left, UI right. A mobility ops surface: a real-time driver payout clearing, a fleet card spend feed by vehicle, and an auto financing plan — all on one screen.

---

# 2. Outcome chips

**Design note:** 3 chips directly below hero. Component: `OutcomeChips`.

1. Icon: Zap — **Real-time payouts** — Instant disbursement to drivers and contractors — no manual payroll or reconciliation lag.
2. Icon: Layers — **Every program on one platform** — Driver payouts, fleet spend, financing, and customer wallets without separate vendors for each.
3. Icon: TrendingUp — **Revenue from your own network** — Interchange and financing revenue stay with your platform — not a third-party provider.

---

# 3. Challenge / Solution

*(No section headline. Two short paragraphs.)*

**The challenge**

Mobility platforms manage high-volume, distributed payment flows across drivers, dealers, and customers. Fragmented payout systems, manual reconciliation, and limited spend control slow down the speed your network operates at.

**The solution**

NymCard gives you the disbursement, fleet spend, and financing infrastructure mobility platforms need — on one platform, with real-time controls and reconciliation built in.

---

# 4. What you can build

**Eyebrow:** What you can build

**Design note:** 4 alternating TextImage rows. Component: `TextImageRow`.

**Driver and contractor payouts** *[copy left, UI right]*

Real-time payout cards for drivers, couriers, and contractor networks — instant disbursement with spend controls, no batch delays.

*Tertiary link:* Learn more about Money Movement → `/products/money-movement`

*UI snippet:* A driver payout dashboard with payouts clearing live and balances updating per driver.

**Fleet and expense cards** *[copy right, UI left]*

Managed spend cards for fleet operators — fuel, maintenance, and operational expenses — with controls per vehicle, driver, and expense category.

*Tertiary link:* Learn more about Card Issuing → `/products/card-issuing`

*UI snippet:* A fleet card detail surface with category controls toggling and a transaction stream tagged by vehicle.

**Auto and vehicle financing** *[copy left, UI right]*

Installments and lease structures for vehicle acquisition programs — dealer-linked credit with configurable repayment, on the same platform as your cards.

*Tertiary link:* Learn more about Lending → `/products/lending`

*UI snippet:* An auto financing surface with the financed amount, term, repayment schedule, and approval state.

**Customer payment programs** *[copy right, UI left]*

Prepaid wallet accounts and branded cards for customer payments and rewards.

*Tertiary link:* Learn more about Card Issuing → `/products/card-issuing`

*UI snippet:* A customer wallet surface with ride credits, rewards balance, and a card linked to the rider account.

---

# 5. PayKit callout

**Design note:** Single CrossSellBanner. Component: `CrossSellBanner` 1-banner variant.

- `leadIn:` PayKit
- `body:` Ship a branded driver or customer app on top of your payout and payment infrastructure — without building a front end from scratch.
- `link.label:` Learn more about PayKit →
- `link.href:` /services/paykit

---

# 6. Platform

**Eyebrow:** Platform

**Headline**

Built for high-volume distributed operations.

**Body**

Mobility platforms move money across drivers, fleets, and customers in real time. nCore is built for it — connecting to your fleet management and CRM, with deployment that fits your obligations.

**Checklist (4–6 items). Component: `PlatformChecklist`.**

- API-first — connects to fleet management, CRM, and operational systems
- Real-time disbursement and spend visibility across distributed networks
- Cloud, on-soil, and on-premise deployment on the same platform
- KYC and AML inside driver and partner onboarding
- Principal member of Visa and Mastercard
- PCI DSS Level 1 certified · ISO 27001 certified

---

# 7. Developer

**Eyebrow:** Developer

**Headline**

Built for your team to integrate.

**Body**

Full API access, SDKs, sandbox, and webhooks — connects to your fleet management, CRM, and operational systems without rebuilding around them.

**Tertiary link:** Read the docs →

**Component:** `DeveloperBlock`

---

# 8. Cross-sells to NymCard products

**Design note:** 2 banners in a row. Component: `CrossSellBanner` 2-banner variant.

**Banner 1**

- `leadIn:` Card Issuing
- `body:` Issue fleet, expense, and customer cards on infrastructure built to scale across distributed networks.
- `link.label:` See Card Issuing →
- `link.href:` /products/card-issuing

**Banner 2**

- `leadIn:` Money Movement
- `body:` Pay drivers and contractors in real time — on the same nCore platform behind your cards.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

---

# 9. FAQ

*(No eyebrow.)*

**Headline**

Common questions.

Clean accordion. **FAQPage JSON-LD mandatory** for AEO citation (flag for development).

**1. What is mobility payment infrastructure?**

It's the platform a mobility company uses to pay drivers in real time, run fleet expense cards, finance vehicles, and offer customer payment programs — all on one platform. NymCard provides this as a modular stack.

**2. How fast are driver payouts?**

Real-time. Drivers and contractors receive disbursement to their payout card the moment a payout is triggered — no batch delays.

**3. Can fleet operators set spend controls per vehicle or driver?**

Yes. Controls are configurable per card, per vehicle, per driver, and per merchant category — applied in real time at authorization.

**4. Can we ship a branded driver or customer app on this?**

Yes. PayKit delivers a white-labeled mobile and web app built directly on your payout and payment infrastructure — no separate front-end build.

**5. Can we run financing for vehicle acquisition on the same platform?**

Yes. Auto financing runs on the Lending layer alongside your payout and fleet card programs — one customer record across products.

**6. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.

---

# 10. Final CTA

*(No eyebrow. Centered.)*

**Headline**

Talk to our team.

**Body**

Pay drivers, run fleets, and finance vehicles on one platform.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Component:** `CTASection`

---

# META

**Page title:** Payment Infrastructure for Mobility Platforms | NymCard

**Meta description:** Driver payouts, fleet cards, auto financing, and embedded payment programs for mobility companies — built on NymCard infrastructure.

**Primary keyword:** mobility payment infrastructure

**Secondary keywords:** driver payout cards, fleet expense cards, auto financing infrastructure, ride-hailing payments, mobility embedded finance

**Internal links:**

- "Card Issuing" → /products/card-issuing
- "Money Movement" → /products/money-movement
- "Lending" → /products/lending
- "PayKit" → /services/paykit

---

# Changelog

**Approved (19 April 2026) → v2 (25 May 2026):** Realigned to the locked industry-page arc and current skill rules.

- **Title Case → sentence case** throughout.
- **Hero CTA:** *"Find out more →"* → *"Talk to us."*
- **Final CTA:** *"Ready to Launch?"* + *"Tell us what you want to launch…"* + *"Request a Demo / Talk to Our Team"* → *"Talk to our team."* + plain body + *"Talk to us"* + *"Read the docs."*
- **PayKit callout:** retained, reshaped as a `CrossSellBanner` 1-banner item per arc; section heading dropped.
- **Platform bullets:** dropped *"Licensed by CBUAE"* (region-specific). *"PCI DSS certified"* → *"PCI DSS Level 1 certified."* *"On-premise, hybrid, and cloud"* aligned to architecture: cloud, on-soil, on-premise. Compliance bullet sharpened. Added *"Principal member of Visa and Mastercard."*
- **"programmes"** → *"programs"* (US English).
- **What you can build:** added *"Learn more →"* tertiary links per row mapping to Money Movement, Card Issuing, and Lending.
- **New §8 Cross-sells:** Card Issuing + Money Movement.
- **New §9 FAQ:** 6 questions with industry-framed opener and FAQPage JSON-LD flagged for development.
- **META:** dropped *"mobility embedded finance CEMEA"* keyword; added internal links.
