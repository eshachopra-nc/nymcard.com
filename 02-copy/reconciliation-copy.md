# Reconciliation

**Slug:** /products/reconciliation

**Status:** Draft v1

**Navigation:** Products › Reconciliation

**Last updated:** 23 May 2026

---

# Page brief

Intentionally shallow product page (~7 sections) derived from the locked arc in `00-strategy/about-nymcard/page-arc.md` with deliberate deviations. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

Deviations from the canonical arc (each doing real work on this page):

- Skips §3 **Why Reconciliation** — buyer-segment outcomes require `[CONFIRM]` facts; cannot be written honestly.
- Capability bento (§4) is **thin: 2 tiles**, not the canonical six. Only what's writable from confirmed scope.
- Drops §5 **Built on nCore** per the locked decision (2026-05-23) for all product pages. nCore positioning lives in the hero, FAQ, and cross-sell banners.
- Drops §6 **Configuration / CodeArtifact** — integration scope and target systems are `[CONFIRM]`. No config artifact in v1.
- Drops §FeatureShowcase pattern — no confirmed UI specifics.
- Drops §Migration — no confirmed migration story for Reconciliation.

> **Draft v1 — intentionally thin.** `reconciliation.md` is currently a scaffold. This page is written against the confirmed core (automated reconciliation across NymCard products and external systems) and skips sections that would require `[CONFIRM]` facts (Configuration / CodeArtifact, FeatureShowcase, Migration, "Why" outcomes). Full capability copy lands when Product confirms v1 scope.

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. What it reconciles — What can I actually do with it? *(thin bento, 2 tiles)*
4. Industries — Who in my space uses this?
5. Deployment — Can I deploy how I need?
6. FAQ — What about edge cases?
7. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

*(No top line — no confirmed metric to display.)*

**Headline:**

Reconcile across every product and system, automatically.

**Sub-copy:**

Reconciliation runs on nCore — matching activity across your NymCard products and the external systems they connect to.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, product UI right. A reconciliation surface shows two ledger streams entering from opposite sides — NymCard activity on one side, external activity on the other — with matched pairs settling into a centered row of resolved entries. Subtle motion: streams flow in continuously, matches resolve in real time. No counts, no fabricated figures. Neutral, dark, editorial.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

Beneath the logo row, a single quiet trust line: **Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.**

---

# 3. What it reconciles

**Eyebrow:** Reconciliation scope

**Headline:**

Match across the whole platform.

**Body:**

Reconciliation works across every product on nCore and the external systems they touch.

**Visual:**

`CardGrid` bento, two tiles side by side on a six-column grid (3 + 3). Editorial spacing, no atmospheric backgrounds — the UIs do the work.

**(Half-width) Across NymCard products**

Reconcile Cards, Lending, Money Movement, Settlement, and Financial Crime activity in one place.

*UI snippet:* A unified ledger view with rows tagged by product (a card transaction, a settlement entry, a payout, a credit repayment) flowing into a single reconciled stream. Product tags are visible; no fabricated counts.

**(Half-width) Across external systems**

Reconcile NymCard activity against external rails, banks, and partner systems.

*UI snippet:* Two parallel ledger columns — NymCard activity on the left, external activity on the right — with matched rows connecting across the gap. Source labels stay generic ("External rail", "Partner system", "Bank record") — no named third-party systems.

---

# 4. Industries

**Eyebrow:** Industries

**Headline:**

Reconciliation for every business on nCore.

**Body:**

Banks, fintechs, digital businesses, and marketplaces run reconciliation on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Large illuminated tiles — clean, roomy padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"Reconcile card, payment, and settlement activity across the portfolio."* → /industries/banks

**FINTECHS** — *"Match transactions across products and partner systems as you scale."* → /industries/fintechs

**DIGITAL BUSINESSES** — *"Reconcile embedded card and payment flows against your own ledger."* → /industries/digital-businesses

**MARKETPLACES** — *"Match payouts, fees, and settlement across buyers and sellers."* → /industries/marketplaces

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 5. Deployment

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

# 6. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage schema.org markup at the page level (flag for development).

**1. What is Reconciliation?**

Reconciliation is the layer of nCore that automates matching across NymCard products and the external systems they connect to. It is one of the six product layers on the platform.

**2. What does it reconcile?**

Activity across your NymCard products — Cards, Lending, Money Movement, Settlement, and Financial Crime — and the external rails, banks, and partner systems they touch.

**3. Does Reconciliation run on nCore?**

Yes. Reconciliation runs on nCore alongside the other product layers, with one customer record and one audit trail across the platform.

**4. What deployment models are available?**

Cloud, on-soil, and on-premise. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**5. Is the platform certified?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified.

**6. When will more capability detail be available?**

Reconciliation is a recently promoted layer on nCore, expanding through 2026. Talk to us for current scope.

---

# 7. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

See how Reconciliation runs across your products and the systems you connect to.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Settlement
- `body:` Real-time, multi-currency, and stablecoin settlement on the same nCore platform.
- `link.label:` See Settlement →
- `link.href:` /products/settlement

**Banner 2**

- `leadIn:` Financial Crime
- `body:` Fraud, AML, sanctions, and identity as capabilities within one layer on nCore.
- `link.label:` See Financial Crime →
- `link.href:` /products/financial-crime

---

# META

**Page title:** Reconciliation — Automated Reconciliation Across Products and Systems | NymCard

**Meta description:** Reconcile activity across every NymCard product and the external systems they connect to. Runs on nCore. PCI DSS Level 1 and ISO 27001 certified. Cloud, on-soil, or on-premise.

**Primary keyword:** automated reconciliation

**Secondary keywords:** payments reconciliation, transaction matching, multi-system reconciliation, settlement reconciliation

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Settlement" → /products/settlement
- "Financial Crime" → /products/financial-crime

---

# Changelog

**v0 → v1 (23 May 2026):** First draft. Intentionally thin.

- `reconciliation.md` is a scaffold — most capability detail is marked `[CONFIRM]`. This draft writes only against the confirmed core: Reconciliation is a real nCore layer that does automated reconciliation across NymCard products and external systems.
- **Skipped §Why Reconciliation** — buyer-segment outcomes require `[CONFIRM]` facts (operations-led vs finance-led split not confirmed).
- **Capability bento is 2 tiles**, not the canonical six: *Across NymCard products* and *Across external systems*. A third "exception handling" tile was considered and dropped — could not be written honestly from confirmed scope without inventing specifics.
- **Skipped §FeatureShowcase** — no confirmed UI specifics for a controls dashboard.
- **Skipped §Configuration / CodeArtifact** — integration scope and target systems are `[CONFIRM]`. This is the most visible thinness on the page. Restoration is the biggest single uplift from v1-thin to v2.
- **Skipped §Migration** — no confirmed migration story for Reconciliation.
- **Dropped §Built on nCore** per the locked decision applied across product pages (2026-05-23). nCore positioning preserved in the hero, FAQ #1 and #3, and the cross-sell banners.
- **Industries** kept to four cards (Banks, Fintechs, Digital businesses, Marketplaces) — straight from the standard audiences in `architecture.md`. Per-card copy stays at layer level — no invented industry-specific reconciliation features.
- **FAQ is 6 questions**, narrower and more honest than a typical product page. Question 6 ("When will more capability detail be available?") is included as a deliberate forward-looking honesty signal.
- **Cross-sell** follows the pair named in `reconciliation.md`: Settlement (Banner 1), Financial Crime (Banner 2).
- All claims trace to `reconciliation.md` (confirmed scope only) or `architecture.md`. No `[CONFIRM]` facts surface as copy.
