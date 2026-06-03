# Financial Crime

**Slug:** /products/financial-crime

**Status:** Draft v1

**Navigation:** Products › Financial Crime

**Last updated:** 23 May 2026

---

# Page brief

Ten-section product page derived from the locked arc in `00-strategy/about-nymcard/page-arc.md`, modeled structurally on `02-copy/card-issuing-copy.md` (Cards Draft v10). Voice modeled on Stripe, Vercel, Linear, Brex. Primary buyer is the technical Head of Financial Crime / CCO — vocabulary skews to signals, decisioning, audit trail, and regulatory readiness.

Financial Crime is **one layer** of nCore. Identity, fraud, risk, AML & sanctions, and 3D Secure are presented as **five capabilities of the single layer** — distinct sections, tied together by the §3 lead-in and the shared customer record, pipeline, and ledger, so they never read as separate products. (Owner direction, 1 Jun 2026: present the five as distinct sections; this supersedes the earlier "no standalone sections" rule. The single-layer framing is preserved by the connective lead-in, not by collapsing them into one bento.)

Deviations from the canonical arc (each doing real work on this page):

- Skips the arc's Section 3 "Why Financial Crime" — the hero already states the unification claim, and the bento + decisioning console answer the outcome question more concretely than four outcome tiles would.
- Splits the capability story into two consecutive sections: §3 **Risk controls** (five alternating editorial rows — Identity, Fraud monitoring, Risk management, AML & sanctions, 3D Secure) and §4 **Decisioning console** (FeatureShowcase — full-width animated dashboard).
- Drops the arc's Section 5 "Built on nCore" cinematic centerpiece. Per locked decision (2026-05-23), product pages on nymcard.com don't carry this section. The nCore positioning lives in the hero, the FAQ, and the cross-sell banners instead.
- No Migration section. The fact file does not surface a legacy-risk-vendor migration story; adding one would be fabrication.

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Risk controls — What can I actually do with it? *(five alternating editorial capability rows)*
4. Decisioning console — Can I see why a decision was made? *(FeatureShowcase)*
5. Configuration — How do I configure and integrate it?
6. Industries — Who in my space uses this?
7. Deployment — Can I deploy how I need?
8. FAQ — What about edge cases?
9. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

**Top line (small, above headline):**

*(Omitted. No live number for this page that earns the slot.)*

**Headline:**

Cover the full risk perimeter on one layer.

**Sub-copy:**

<!-- CAMPAIGN SHARPEN 2026-06: sub-line ends on "one layer of nCore, not separate vendors" per strategy §12.1 -->
Fraud, AML, sanctions, identity, and 3D Secure run on one customer record, one ledger, one audit trail — one layer of nCore, not a separate fraud vendor and a separate KYC tool wired to your stack.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, product UI right. A single composed surface — the decisioning console in its quiet state. A live event stream flows down the right edge: card authorizations, beneficiary additions, document uploads, logins, transfers. Each event passes through a horizontal pipeline that surfaces nine inline signals before resolving into an APPROVE / CHALLENGE / BLOCK chip. A small inset panel above the stream shows the customer record persisting across all event types. The motion is steady, restrained — closer to a control room than a marketing demo.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

Beneath the logo row, a single quiet trust line: **Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.**

*(Judgment call carried from Cards v10: the arc says no body on the logo strip. The trust line is retained as a single quiet shared element, factually grounded in `architecture.md`. Flag for review — drop if the arc is read strictly.)*

---

# 3. Risk controls

**No eyebrow** — the lead-in headline leads (CLAUDE.md v1.5).

**Lead-in headline:**

One layer, one customer record.

**Lead-in body:**

Identity, fraud, risk, AML, and 3D Secure are capabilities of a single layer — every event flows through the same pipeline and is decided against the same model of who your customer is.

**Visual / layout:**

Five distinct capability sections as alternating editorial rows (`TextImageRow`, design-system §8.20) — text-left / text-right alternating, each with its own bespoke coded visual. Order: Identity → Fraud monitoring → Risk management → AML & sanctions → 3D Secure. The lead-in keeps the "one layer, not five products" framing so the distinct sections never read as separate products.

**1. Identity**

KYC, KYB, and identity verification at onboarding, with ongoing monitoring and periodic reviews — on the same customer record the rest of the layer reads from.

*UI:* Customer-record card — verified status, KYC / KYB / IDV chips, document lifecycle (ID, proof of address, liveness) with check states, and a next-review date.

**2. Fraud monitoring**

Real-time fraud decisioning on every authorization — approve, challenge, or block across card-present, card-not-present, account-takeover, and app-based fraud, with SHAP attribution behind every score.

*UI:* An authorization with an APPROVE decision over SHAP attribution bars — top contributing signals with signed weights.

**3. Risk management**

A live Customer Risk Rating, low to very high, drives thresholds, review cadence, and monitoring intensity per customer — with one case system across fraud, AML, and compliance.

*UI:* Customer Risk Rating tiers (low → very high) with the active tier marked, and the review cadence, monitoring intensity, and thresholds it drives.

**4. AML & sanctions**

AML transaction monitoring against configurable typologies, plus sanctions and PEP screening on every transaction, beneficiary, and onboarding — with STR/SAR generation and filing under maker-checker.

*UI:* A structuring typology in alert, a beneficiary PEP-screening match, and an STR drafted under maker-checker.

**5. 3D Secure**

Issuer-side ACS step-up authentication for card-not-present payments, with challenge decisions driven by the same enriched signals as fraud scoring.

*UI:* A card-not-present authorization raising a step-up challenge with its reasons, an OTP entry, and a verified → authorized result.

---

# 4. Decisioning console

**Eyebrow:** Decisioning

**Headline:**

See why every decision was made.

**Body:**

Every score, alert, and case is backed by the signals that drove it, the operator actions taken, and an immutable record of both.

**Visual:**

`FeatureShowcase` pattern. Two-column header above a full-width animated dashboard. Header left: headline. Header right: body.

Beneath the header, a full-width dashboard. A feature callout list runs vertically down the left side of the dashboard:

- Explainable scoring
- Unified case management
- Immutable ledger
- AI Ops Assistant

Each item highlights in sequence. As it does, the right side of the dashboard responds: a fraud score expands to reveal SHAP attribution with the top signals weighted; a case opens with SLA timer, escalation path, and linked events across fraud, AML, and identity; the ledger panel surfaces hash-chained entries spanning seven years with filter chips for event type, operator, and decision; the AI Ops Assistant drafts a case narrative inline, with a clear *Analyst approves* control at the bottom of the draft. A small reminder line beneath the dashboard: *AI reduces typing, not judgment.*

---

# 5. Configuration

**Eyebrow:** Configuration

**Headline:**

Configure typologies, thresholds, and screening through the API.

**Body:**

AML rules, sanctions lists, and risk thresholds — versioned, applied in real time, and logged to the ledger.

**Sub-CTA:** Read the docs →

**Visual:**

`CodeArtifact` primitive. Dark section frame across both columns. Copy left, code panel right. The code panel carries language tabs across the top (active tab in cyan — *JSON*, with *cURL* and *Node* available), line numbers down the gutter, and restrained syntax highlight (cyan keywords, lighter strings and comments). The JSON config object completes line by line:

```json
{
  "rule_id": "structuring_v3",
  "rule_type": "aml_typology",
  "event_types": ["transfer", "cash_deposit"],
  "threshold_amount": 9500,
  "window_hours": 24,
  "min_event_count": 3,
  "customer_risk_filter": ["MEDIUM", "HIGH", "VERY_HIGH"],
  "action": "alert_and_case",
  "status": "active"
}
```

As the config completes, a small approval state renders beneath the code — an inline confirmation that the rule was versioned and applied, with a hash entry written to the ledger.

<!-- Companion block ("Versioned, auditable, applied in real time" + body + "Read the configuration docs" link) removed per owner direction, 1 Jun 2026. -->

---

# 6. Industries

**Eyebrow:** Industries

**Headline:**

Risk infrastructure for every industry.

**Body:**

Banks, fintechs, wallet operators, remittance operators, and digital asset platforms run their fraud, AML, and identity stack on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are large, generous illuminated tiles — clean, roomy padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"Fraud, AML, and identity on one regulated layer."* → /industries/banks

**FINTECHS** — *"Launch a risk stack alongside cards and lending."* → /industries/fintechs

**WALLETS** — *"Account-takeover and app-based fraud built into auth."* → /industries/wallets

**REMITTANCE** — *"Sanctions screening and corridor monitoring on every transfer."* → /industries/remittance

**DIGITAL ASSETS** — *"Onboarding, monitoring, and screening for crypto flows."* → /industries/digital-assets

**LENDING PLATFORMS** — *"Identity, fraud, and risk inside origination and servicing."* → /industries/lending

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 7. Deployment

**Eyebrow:** Deployment

**Headline:**

Deploy in the cloud, on-soil, or on-premise.

**Body:**

Three deployment models on the same platform — pick the one that fits your regulatory and data-residency requirements.

**Visual:**

Three equal cards on a dark background. Each card features a Linear/Vercel-style abstract line illustration in white outline with a single brand-accent color highlight. Geometric, minimal.

**Cloud** — Layered geometric platforms floating in space, connected by thin lines, with several nodes pulsing to suggest multi-region deployment.

*Body:* Multi-region, NymCard-hosted, fully managed.

**On-soil** — A contained geometric form (a faceted dome or bounded shape) with a single point of light at its center. The boundary is visible — the visual metaphor is "inside the perimeter."

*Body:* Hosted by NymCard inside your country, meeting in-country data residency.

**On-premise** — A vertical stack of geometric modules, like nested rectangles, with one module glowing from within. Self-contained, anchored.

*Body:* Run inside your own data center, fully self-hosted.

---

# 8. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What is Financial Crime on NymCard?**

Financial Crime is one layer of nCore. Fraud, AML transaction monitoring, sanctions screening, identity (KYC, KYB, IDV, and ongoing monitoring), 3D Secure, and chargeback are capabilities within this layer — not separate products. They share a single customer record, a single signal pipeline, and a single audit trail.

**2. How does Financial Crime relate to nCore?**

<!-- CAMPAIGN SHARPEN 2026-06: one-platform thread (one customer record / ledger / audit trail) made explicit per strategy §12.2 -->
It runs on nCore alongside Cards, Lending, Money Movement, Settlement, and Reconciliation — one platform, sharing one customer record, one ledger, and one audit trail across every layer. Because NymCard owns nCore and is a principal member of Visa and Mastercard, fraud and 3D Secure decisions run inline with card authorization rather than over a third-party hop. <!-- CAMPAIGN SHARPEN 2026-06: light legacy/migration nod to Migration & Modernisation per strategy §12.4 -->If you run separate fraud and identity vendors today, Migration & Modernisation handles the path onto the layer.

**3. Is Identity a separate product?**

No. KYC, KYB, identity verification, and ongoing monitoring are capabilities inside the Financial Crime layer, reading and writing the same customer record as fraud and AML.

**4. How explainable are the decisions?**

Every fraud score carries SHAP attribution showing the top contributing signals. Every event, decision, and operator action is written to an append-only, hash-chained ledger retained for seven years.

**5. What about regulatory obligations?**

The platform is designed to support obligations like STR/SAR generation and filing, maker-checker workflows, and periodic KYC reviews. The partner institution holds the regulatory responsibility; NymCard provides the infrastructure beneath it.

**6. Can I bring my own AML typologies and sanctions lists?**

Yes. Typologies, thresholds, customer risk rules, and sanctions lists are configurable through the API. Every change is versioned, logged, and reversible.

**7. Can I deploy Financial Crime on-premise?**

Yes. Cloud, on-soil, and on-premise are supported on the same platform. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**8. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified.

---

# 9. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Run fraud, AML, identity, and 3D Secure on one layer of nCore.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Cards
- `body:` Fraud, 3D Secure, and KYC run inside the authorization path on the same nCore platform.
- `link.label:` See Cards →
- `link.href:` /products/card-issuing

**Banner 2**

- `leadIn:` Reconciliation
- `body:` Reconcile authorizations, settlements, chargebacks, and case outcomes across products.
- `link.label:` See Reconciliation →
- `link.href:` /products/reconciliation

---

# META

**Page title:** Financial Crime — Fraud, AML, Identity, and 3D Secure on One Layer | NymCard

**Meta description:** Run fraud, AML, sanctions, identity, and 3D Secure on one layer of nCore — NymCard's full-stack payments platform. Explainable decisioning, immutable audit trail, and configurable typologies. Cloud, on-soil, or on-premise.

**Primary keyword:** financial crime platform

**Secondary keywords:** AML transaction monitoring, fraud decisioning, sanctions screening, KYC KYB platform, 3D Secure issuer ACS

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Cards" → /products/card-issuing
- "Reconciliation" → /products/reconciliation
- "Lending" (where decisioning is referenced) → /products/lending

---

# Changelog

**v2 → v3 (1 Jun 2026):** §3 redesigned per owner direction from a single capabilities bento into **five distinct capability sections** as alternating editorial rows — Identity, Fraud monitoring, Risk management, AML & sanctions, 3D Secure — each with its own bespoke coded visual. "Risk monitoring" was split into **Risk management** (Customer Risk Rating → thresholds / cadence / intensity + case management) and **AML & sanctions** (typologies + sanctions/PEP screening + STR/SAR). A connective lead-in ("One layer, one customer record.") preserves the single-layer framing, superseding the prior "no standalone sections" rule. Each row's visual reuses the homepage hero-carousel handoff surface for that capability (identity / fraud-monitoring / risk-management / acs-3ds; AML & sanctions uses the `financial-crime` asset), rendered on the glass kit via `HandoffVisual`. Copy is baked into `components/composition/FinancialCrimeControls.tsx` (rendered via the `financial-crime` slug branch, mirroring CardProgramsBento / LendingCreditJourney) — the seed `capabilities` field is no longer the render source for §3. The trust band and the §6 Industries section are also suppressed on this page (owner direction). Not re-seeded to Sanity.

**v1 → v2 (29 May 2026):** Removed the "nine signal engines" tile from the §3 Capabilities bento and promoted **ACS / 3D Secure** to full-width, so the bento is now four tiles (Fraud full-width tall → Risk monitoring + Identity → ACS / 3D Secure full-width). The nine-signal concept still lives in the §1 hero and §4 decisioning pipeline. Staged in `scripts/docs/financial-crime.ts`; not yet re-seeded to Sanity.

**v0 → v1 (23 May 2026):** Initial draft.

- First copy draft for `/products/financial-crime`. No prior copy in `02-copy/`.
- Modeled structurally on `02-copy/card-issuing-copy.md` (Cards Draft v10): hero → logo strip → asymmetric bento → FeatureShowcase → CodeArtifact → RailCarousel → Deployment → FAQ → Final CTA + 2 CrossSellBanner items. nCore centerpiece dropped per locked decision; nCore positioning carried in hero, FAQ #2, and Banner 1 ("on the same nCore platform").
- **Taxonomy reconciliation:** the source fact file (`00-strategy/about-nymcard/financial-crime.md`) still carries pre-architecture framing ("the sixth product"). That framing is not used. Financial Crime is treated as one layer, with fraud, risk monitoring, identity, ACS / 3D Secure, AML, sanctions, and chargeback as capabilities within it. FAQ #1 makes this explicit. The four-capability presentation comes from the fact file's "four capabilities to reference on the page" guidance.
- **Nine signal engines surfaced as one bento tile** rather than a dedicated section, keeping the page at the standard section count. The engines are named on the tile's UI snippet, not in the body copy, so the visual carries the work.
- **No specific performance numbers used.** Per the fact file's "Claims — handle with care" note, the page stays at the capability level — "real-time decisioning", "explainable scoring", "configurable typologies", "immutable ledger". No latency figures, no typology counts, no TPR/FPR targets. PCI DSS Level 1 + ISO 27001 cited at the platform level only.
- **No Migration section.** The fact file does not flag a legacy-risk-vendor migration story; adding one would be fabrication. Flag for follow-up if migration material later becomes available.
- **No "Why Financial Crime" outcomes section.** The hero already states the unification claim, and the bento + decisioning console answer the buyer-outcome question more concretely than four outcome tiles. Cuts the page-feel-like-a-template risk that page-arc.md warns about.
- **Cross-sell pair:** Cards and Reconciliation, per `financial-crime.md §Cross-sell`.
- **Regulatory framing:** FAQ #5 makes the split explicit — the platform is designed to support obligations; the partner institution holds the regulatory responsibility. No regulator endorsement claimed.
