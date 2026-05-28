# Industry | Exchange Houses

**Slug:** /industry/exchange-houses

**Status:** Draft v2 — 25 May 2026

**Navigation:** Industries › Exchange Houses

**Last updated:** 25 May 2026

---

# Page brief

Ten-section industry page derived from the locked arc in `00-strategy/about-nymcard/industry-page-arc.md`. Voice modeled on Stripe, Vercel, Linear, Brex. UIs carry the story.

Deviations from the canonical arc: none. Standard 9-section build (no PayKit callout — exchange houses are buyers of money-movement infrastructure, not branded-app builders).

**Story arc:**

1. Hero — What is this for my industry?
2. Outcome chips — What's in it for me?
3. Challenge / Solution — Why does my industry need this?
4. What you can build — What can I actually build?
5. Platform — Is your platform serious?
6. Developer — How does my team integrate?
7. Cross-sells — Which products power this?
8. FAQ — What about edge cases?
9. Final CTA — Where do I go next?

---

# 1. Hero

**Headline**

Expand beyond remittance.

**Sub-copy**

Cards, wallets, cross-border payments, FX, and stablecoin settlement — built for exchange houses growing into broader financial services.

**Primary CTA:** Talk to us

**Visual**

F-pattern asymmetric, text left, UI right. A corridor map with a remittance moving end-to-end, a multi-currency prepaid card surface, and a stablecoin settlement ticker — all on one platform.

---

# 2. Outcome chips

**Design note:** 3 chips directly below hero. Component: `OutcomeChips`.

1. Icon: TrendingUp — **New revenue beyond remittance** — Cards, wallets, and credit revenue added to your existing FX flows.
2. Icon: Users — **Retain your SME clients** — Give business clients the payment tools they're currently getting elsewhere.
3. Icon: Globe — **Capture more corridor revenue** — FX margin and settlement fees stay with your platform.

---

# 3. Challenge / Solution

*(No section headline. Two short paragraphs.)*

**The challenge**

Remittance margins are under pressure from digital-first competitors on faster, lower-cost rails. Exchange houses that grow are the ones turning FX and payment relationships into broader financial offerings — for retail customers and SME clients alike.

**The solution**

NymCard gives you the infrastructure to expand your product range without building from scratch — cards, wallets, cross-border payments, and stablecoin settlement on one platform.

---

# 4. What you can build

**Eyebrow:** What you can build

**Design note:** 3 alternating TextImage rows. Component: `TextImageRow`.

**Launch a multi-currency card program** *[copy left, UI right]*

Issue branded prepaid or debit cards linked to FX and remittance flows — physical and virtual, no bank account required.

*Tertiary link:* Learn more about Card Issuing → `/products/card-issuing`

*UI snippet:* A multi-currency card with corridor balances and a live FX rate refreshing.

**Move into SME business payments** *[copy right, UI left]*

Expand into SME supplier payments and B2B cross-border flows — capture corridor revenue your clients send elsewhere today.

*Tertiary link:* Learn more about Money Movement → `/products/money-movement`

*UI snippet:* A B2B payment surface with corridor selection, FX margin retained, and settlement timing.

**Settle faster with stablecoin infrastructure** *[copy left, UI right]*

Cut capital locked across correspondent networks. Near real-time corridor settlement, 24/7, without banking window constraints.

*Tertiary link:* Learn more about Settlement → `/products/settlement`

*UI snippet:* A settlement dashboard showing a USDC corridor clearing in seconds beside a traditional rail clearing in days.

---

# 5. Platform

**Eyebrow:** Platform

**Headline**

Built for cross-border flows.

**Body**

Exchange houses need infrastructure that moves money across corridors with FX and settlement on one platform. nCore is built for it — with pre-integrated rails and deployment that fits your regulatory obligations.

**Checklist (4–6 items). Component: `PlatformChecklist`.**

- Pre-integrated with Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram
- Cloud, on-soil, and on-premise deployment on the same platform
- Real-time and stablecoin settlement on the same platform
- Principal member of Visa
- Principal member of Mastercard
- PCI DSS Level 1 certified · ISO 27001 certified

---

# 6. Developer

**Eyebrow:** Developer

**Headline**

Built for your team to integrate.

**Body**

Full API access, SDKs, sandbox, and webhooks — so your engineering team can move fast without waiting on us.

**Tertiary link:** Read the docs →

**Component:** `DeveloperBlock`

---

# 7. Cross-sells to NymCard products

**Design note:** 2 banners in a row. Component: `CrossSellBanner` 2-banner variant.

**Banner 1**

- `leadIn:` Money Movement
- `body:` Move money across domestic rails, cross-border corridors, and FX — on the platform built for corridor flows.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

**Banner 2**

- `leadIn:` Settlement
- `body:` Settle in real time across fiat and stablecoin rails — 24/7, without banking window constraints.
- `link.label:` See Settlement →
- `link.href:` /products/settlement

---

# 8. FAQ

*(No eyebrow.)*

**Headline**

Common questions.

Clean accordion. **FAQPage JSON-LD mandatory** for AEO citation (flag for development).

**1. What is exchange house payment infrastructure?**

It's the platform an exchange house uses to issue multi-currency cards, run cross-border payments, manage FX, and settle across fiat and stablecoin rails — all under its own brand. NymCard provides this as a modular stack.

**2. Do we need a bank account to issue cards on NymCard?**

No. Cards are issued directly on the NymCard platform — exchange houses can offer prepaid and multi-currency cards to customers without a bank account requirement on the end user.

**3. Can we offer stablecoin settlement without becoming a crypto exchange?**

Yes. Stablecoin settlement on NymCard is a settlement capability — not trading. You settle corridor flows in USDC or USDT without operating an exchange.

**4. Which corridors and networks are pre-integrated?**

Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram are built in. Local and regional scheme connectivity is added by deployment.

**5. Can we run remittance and SME business payments on the same platform?**

Yes. Cards, wallets, cross-border payments, and settlement run on one platform — one customer record across consumer remittance and SME flows.

**6. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.

---

# 9. Final CTA

*(No eyebrow. Centered.)*

**Headline**

Talk to our team.

**Body**

Launch cards, wallets, cross-border payments, and stablecoin settlement on one platform.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Component:** `CTASection`

---

# META

**Page title:** Payment Infrastructure for Exchange Houses | NymCard

**Meta description:** Cards, wallets, cross-border payments, FX, and stablecoin settlement for exchange houses. Expand beyond remittance on one platform.

**Primary keyword:** exchange house payment infrastructure

**Secondary keywords:** remittance infrastructure, multi-currency prepaid cards, cross-border payments exchange houses, stablecoin settlement, FX corridor platform

**Internal links:**

- "Card Issuing" → /products/card-issuing
- "Money Movement" → /products/money-movement
- "Settlement" → /products/settlement

---

# Changelog

**Approved (19 April 2026) → v2 (25 May 2026):** Realigned to the locked industry-page arc and current skill rules.

- **Title Case → sentence case** throughout.
- **Hero CTA:** *"Find out more →"* → *"Talk to us."*
- **Final CTA:** *"Ready to Launch?"* + *"Tell us what you want to launch…"* + *"Request a Demo / Talk to Our Team"* → *"Talk to our team."* + plain body + *"Talk to us"* + *"Read the docs."*
- **Platform bullets:** dropped *"Licensed by CBUAE"* and *"Integration with local and regional payment schemes"* (region-specific). *"PCI DSS certified"* → *"PCI DSS Level 1 certified."* Visa and Mastercard now listed as two separate items.
- **Platform headline:** *"Built for On-Premise Deployment"* → *"Built for cross-border flows"* — more relevant to the buyer; on-premise is one of three deployment models.
- **What you can build:** added *"Learn more →"* tertiary links per row mapping to Card Issuing, Money Movement, and Settlement.
- **New §7 Cross-sells:** Money Movement + Settlement.
- **New §8 FAQ:** 6 questions with industry-framed opener and FAQPage JSON-LD flagged for development.
- **META:** dropped *"FX platform CEMEA"* and *"CEMEA corridors"* framing; added *"stablecoin settlement"* and internal links.
