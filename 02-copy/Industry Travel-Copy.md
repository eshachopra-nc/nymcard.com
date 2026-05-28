# Industry | Travel

**Slug:** /industry/travel

**Status:** Draft v2 — 25 May 2026

**Navigation:** Industries › Travel

**Last updated:** 25 May 2026

---

# Page brief

Ten-section industry page derived from the locked arc in `00-strategy/about-nymcard/industry-page-arc.md`. Voice modeled on Stripe, Vercel, Linear, Brex. UIs carry the story.

Deviations from the canonical arc: none. Standard 10-section build (PayKit callout retained — travel platforms ship branded traveler and corporate apps).

**Story arc:**

1. Hero — What is this for my industry?
2. Outcome chips — What's in it for me?
3. Challenge / Solution — Why does my industry need this?
4. What you can build — What can I actually build?
5. PayKit callout — Want a branded traveler app on top?
6. Platform — Is your platform serious?
7. Developer — How does my team integrate?
8. Cross-sells — Which products power this?
9. FAQ — What about edge cases?
10. Final CTA — Where do I go next?

---

# 1. Hero

**Headline**

Payments that disappear into the travel experience.

**Sub-copy**

Multi-currency cards, travel wallets, corporate expense programs, and agent disbursements — on one platform, under your brand.

**Primary CTA:** Talk to us

**Visual**

F-pattern asymmetric, text left, UI right. A travel app surface: a multi-currency card with corridor balances, a corporate expense flow, and an agent payout — all in the partner's brand.

---

# 2. Outcome chips

**Design note:** 3 chips directly below hero. Component: `OutcomeChips`.

1. Icon: TrendingUp — **Capture FX revenue** — FX margin and corridor settlement fees stay with your platform — no third-party FX provider.
2. Icon: Users — **One platform, every segment** — Consumer, corporate, and agent payment programs managed without separate vendors for each.
3. Icon: Globe — **Built for cross-border operations** — Multi-currency support and international corridor access built in from day one.

---

# 3. Challenge / Solution

*(No section headline. Two short paragraphs.)*

**The challenge**

Travel businesses operate across currencies, corridors, and customer segments that most payment platforms weren't designed to handle. Multi-currency cards, agent disbursements, and cross-border settlement typically need separate providers — adding cost, integration overhead, and reconciliation complexity.

**The solution**

NymCard brings multi-currency card issuing, FX, wallets, and payouts onto one platform — so travel companies manage the full payment lifecycle without managing multiple vendors.

---

# 4. What you can build

**Eyebrow:** What you can build

**Design note:** 4 alternating TextImage rows. Component: `TextImageRow`.

**Multi-currency travel cards** *[copy left, UI right]*

Issue branded multi-currency cards for consumer and corporate travel segments — physical and virtual — with cross-currency spend on one card.

*Tertiary link:* Learn more about Card Issuing → `/products/card-issuing`

*UI snippet:* A multi-currency card with corridor balances, an FX rate ticker, and a transaction stream tagged by currency.

**Corporate and expense cards** *[copy right, UI left]*

Managed spend for corporate travel programs — controls per card, team, and route — with real-time visibility and automated reconciliation.

*Tertiary link:* Learn more about Card Issuing → `/products/card-issuing`

*UI snippet:* A corporate travel card detail with route-level spend, controls toggling, and a reconciliation feed.

**Travel wallets** *[copy left, UI right]*

Wallet accounts with multi-currency support and cross-border payment capability — for travelers without a bank account.

*Tertiary link:* Learn more about Money Movement → `/products/money-movement`

*UI snippet:* A travel wallet surface with multi-currency balances and a cross-border send.

**Agent and staff disbursements** *[copy right, UI left]*

Payout cards for travel agents, ground staff, and contractor networks — with real-time spend controls and visibility per disbursement.

*Tertiary link:* Learn more about Money Movement → `/products/money-movement`

*UI snippet:* An agent payout dashboard with disbursements clearing live and per-agent balances.

---

# 5. PayKit callout

**Design note:** Single CrossSellBanner. Component: `CrossSellBanner` 1-banner variant.

- `leadIn:` PayKit
- `body:` Ship a branded traveler or corporate finance app on top of your card and wallet infrastructure — without building a front end from scratch.
- `link.label:` Learn more about PayKit →
- `link.href:` /services/paykit

---

# 6. Platform

**Eyebrow:** Platform

**Headline**

Built for multi-currency and cross-border flows.

**Body**

Travel businesses need infrastructure that moves money across currencies and corridors without stitching providers together. nCore is built for it — with pre-integrated rails and deployment that fits your obligations.

**Checklist (4–6 items). Component: `PlatformChecklist`.**

- Pre-integrated with Visa Direct and Mastercard Cross-Border
- Multi-currency cards and wallets on one platform
- Cloud, on-soil, and on-premise deployment on the same platform
- KYC and AML inside cardholder onboarding
- Principal member of Visa and Mastercard
- PCI DSS Level 1 certified · ISO 27001 certified

---

# 7. Developer

**Eyebrow:** Developer

**Headline**

Built for your team to integrate.

**Body**

Full API access, SDKs, sandbox, and webhooks — pre-integrated with Visa, Mastercard, and international corridors so your team can move fast.

**Tertiary link:** Read the docs →

**Component:** `DeveloperBlock`

---

# 8. Cross-sells to NymCard products

**Design note:** 2 banners in a row. Component: `CrossSellBanner` 2-banner variant.

**Banner 1**

- `leadIn:` Money Movement
- `body:` Move money across corridors with FX built in — on the platform behind your travel cards and wallets.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

**Banner 2**

- `leadIn:` Card Issuing
- `body:` Issue multi-currency consumer, corporate, and disbursement cards on infrastructure built for travel.
- `link.label:` See Card Issuing →
- `link.href:` /products/card-issuing

---

# 9. FAQ

*(No eyebrow.)*

**Headline**

Common questions.

Clean accordion. **FAQPage JSON-LD mandatory** for AEO citation (flag for development).

**1. What is travel payment infrastructure?**

It's the platform a travel business uses to issue multi-currency cards, run travel wallets, manage corporate expense programs, and disburse to agents — all on one platform. NymCard provides this as a modular stack.

**2. Can one card support spend in multiple currencies?**

Yes. Multi-currency cards on NymCard let cardholders spend across currencies on a single card, with FX margin retained by your platform.

**3. Do travelers need a bank account to use the wallet?**

No. Wallets are issued directly on NymCard — no bank account required for the end user.

**4. Can we ship a branded traveler app on this?**

Yes. PayKit delivers a white-labeled mobile and web app built directly on your card and wallet infrastructure — no separate front-end build.

**5. Can we run consumer, corporate, and agent programs on the same platform?**

Yes. Consumer travel cards, corporate expense cards, travel wallets, and agent disbursements run on one platform — one customer record across segments.

**6. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.

---

# 10. Final CTA

*(No eyebrow. Centered.)*

**Headline**

Talk to our team.

**Body**

Launch multi-currency cards, wallets, and disbursements for travel on one platform.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Component:** `CTASection`

---

# META

**Page title:** Payment Infrastructure for Travel Companies | NymCard

**Meta description:** Multi-currency cards, travel wallets, FX programs, and disbursement infrastructure for travel companies and loyalty platforms — built on NymCard.

**Primary keyword:** travel payment infrastructure

**Secondary keywords:** multi-currency travel card, travel wallet platform, corporate travel card, FX travel infrastructure, travel disbursement

**Internal links:**

- "Card Issuing" → /products/card-issuing
- "Money Movement" → /products/money-movement
- "PayKit" → /services/paykit

---

# Changelog

**Approved (19 April 2026) → v2 (25 May 2026):** Realigned to the locked industry-page arc and current skill rules.

- **Title Case → sentence case** throughout.
- **Hero CTA:** *"Find out more →"* → *"Talk to us."*
- **Final CTA:** *"Ready to Launch?"* + *"Tell us what you want to launch…"* + *"Request a Demo / Talk to Our Team"* → *"Talk to our team."* + plain body + *"Talk to us"* + *"Read the docs."*
- **PayKit callout:** retained, reshaped as a `CrossSellBanner` 1-banner item per arc; section heading dropped. *"travellers"* → *"travelers"* (US English).
- **Platform bullets:** dropped *"Licensed by CBUAE"* and *"Integration with local and regional payment schemes"* (region-specific). *"PCI DSS certified"* → *"PCI DSS Level 1 certified."* *"On-premise, hybrid, and cloud"* aligned to architecture: cloud, on-soil, on-premise. *"Pre-integrated with Visa, Mastercard, and international network corridors"* → *"Pre-integrated with Visa Direct and Mastercard Cross-Border"* (correct rail naming per architecture). Added *"Principal member of Visa and Mastercard."*
- **Platform headline:** *"Built for Multi-Currency and Multi-Market Operations"* → *"Built for multi-currency and cross-border flows"* — drops region-flavored framing.
- **What you can build:** added *"Learn more →"* tertiary links per row mapping to Card Issuing and Money Movement.
- **New §8 Cross-sells:** Money Movement + Card Issuing.
- **New §9 FAQ:** 6 questions with industry-framed opener and FAQPage JSON-LD flagged for development.
- **META:** dropped *"travel disbursement CEMEA"* keyword; added internal links.
