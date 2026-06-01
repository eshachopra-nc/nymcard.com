# Platform | nCore — REVISED (pending owner approval)

**Slug:** /platform/ncore
**Navigation:** Platform › nCore
**Status:** Revised 1 June 2026 after major review. Supersedes the 18 April 2026 draft once approved. Original kept at `nCore-copy.md`.

**Decisions applied (owner, 1 June 2026):**
- **Market-agnostic** — no CEMEA/MENA/"the region"; no CBUAE; connectivity excludes Mada/Meeza/1LINK (per `architecture.md`).
- **Capabilities = 6 product layers + AI/Insights** (canonical architecture); the old "Feature Chips" block is removed (it duplicated the capability tiles).
- **Stats** kept but moved below capabilities; **values confirmed by owner** (1 June 2026).

## Open items — all resolved (owner, 1 June 2026)
1. ✅ **Stats verified** — values are correct as shown.
2. ✅ **"Hybrid" dropped** — three native models only (Cloud, On-soil, On-premise).
3. ✅ **Comparison "time to launch" verified** — 12–18 months vs weeks.
4. ✅ **FAQ Q5** — market-neutral regulated/licensed line added (no CBUAE).

---

# HERO

**Headline**

Build every payment product on nCore.

**Description**

One customer record, one ledger, one audit trail — on a processor NymCard owns.

**CTAs**

Primary: Talk to us · Secondary: Read the docs

**Visual:** abstract "single core" hero render (Recraft — Concept 1: a luminous core with converging light ribbons, `/images/ncore/hero-core.webp`), replacing the NCoreStack artifact per owner feedback.

---

# CAPABILITIES

(Was "What you can build". Feature Chips block deleted.)

**Build note (owner, 2026-06-01):** the products grid REUSES the homepage `ProductsBento` component as-is (no bespoke recreation). Its six products + copy come from the homepage. Only the AI/Insights band below it is nCore-specific. The per-layer copy below is reference only — the rendered product copy is whatever `ProductsBento` ships.

**Section heading**

Every product in the payments stack, on one platform.

**Intro**

Every product in the modern payments stack, with AI and Insights running across all of them. Take one, or compose the whole platform.

**The product layers** (reference — rendered by `ProductsBento`):

- **Cards** — Issuer processing across debit, credit, prepaid, and wallets — physical, virtual, and tokenized, with the full lifecycle built in.
- **Lending** — Decisioning, origination, and servicing for BNPL, revolving credit, and installments — embedded directly in the payment flow.
- **Money Movement** — Domestic rails, cross-border, FX, and remittance, without managing a separate provider for each.
- **Settlement** — Real-time, multi-currency settlement — including stablecoin settlement — so liquidity isn't trapped between banking hours.
- **Financial Crime** — Fraud, risk, 3D Secure, AML, sanctions, and identity — applied in the authorization path, not bolted on after.
- **Reconciliation** — Automated reconciliation across ledger, schemes, and settlement, with reporting your finance and ops teams can act on.

**Across every layer** (shown as a cross-cutting band beneath the products, not as peer tiles):

- **AI** — Agentic, domain-trained models woven into decisioning, routing, underwriting, and monitoring across every layer.
- **Insights** — Dashboards and analytics across every product, so you see the whole program in one place.

---

# STATS

(Positioned directly BELOW the hero, per owner feedback 2026-06-01.)

**Frame**

What runs on one platform looks like this.

**Values (confirmed):**

1. **1,000+** — APIs available
2. **99.99%** — Platform uptime
3. **<2s** — Transaction processing time
4. **135+** — Currencies supported

---

# CONNECTIVITY

**Section heading**

Connected to the schemes and networks before you arrive.

**Logos (market-agnostic set):**

Visa · Mastercard · Visa Direct · Mastercard Cross-Border · Western Union · MoneyGram

---

# DEPLOYMENT

**Section heading**

Deploy nCore where your infrastructure needs it.

**Description**

nCore connects to your existing core banking system — no replacement required — and runs in the model your regulator and infrastructure call for.

**Deployment chips:**

Cloud · On-soil · On-premise

**Supporting line:**

PCI DSS Level 1 certified · ISO 27001 certified · Principal member of Visa · Principal member of Mastercard

---

# MIGRATION

**Section heading**

Migrate without taking your program down.

**Description**

Phased migration from legacy processors, fragmented stacks, or in-house builds — full portfolio, re-carding, and parallel runs all supported. Your program stays live throughout, and your customers never feel the cutover.

---

# COMPARISON

**Section heading**

What you get on nCore that legacy processors can't give you.

**Columns:** Legacy processors | nCore
**Design note:** prefer a one-word *reality* per side over all-✓/all-✗ (more credible to institutional buyers). Cut to these 6 rows.

| Dimension | Legacy processors | nCore |
| --- | --- | --- |
| Time to launch | 12–18 months | weeks |
| Cards, payments, and credit | separate vendors | one platform |
| Scheme connectivity | you integrate | pre-integrated |
| Settlement | banking hours | real-time, incl. stablecoin |
| Deployment | fixed model | cloud, on-soil, or on-premise |
| Compliance | bolted on | in the authorization path |

---

# DEVELOPER

(Moved above FAQ.)

**Section heading**

Built for your engineers to integrate fast.

**Body**

Full API access, SDKs, a sandbox, and webhooks — so your engineers ship without waiting on NymCard.

**CTA**

Read the docs

---

# FAQ

**Section heading**

Common questions

**Items:**

Q: What is nCore?
A: nCore is NymCard's proprietary payments and banking platform — a single architecture that powers card issuing, embedded lending, cross-border payments, settlement, and financial crime controls. Banks, fintechs, and digital businesses build on nCore without stitching together multiple vendors or systems.

Q: How is nCore different from a core banking system?
A: nCore is not a core banking replacement. It's a payments and banking infrastructure layer that connects to your existing core — enabling card programs, payment flows, credit products, and settlement without rebuilding what you already run.

Q: What can you build on nCore?
A: Card issuing (prepaid, debit, credit), embedded lending (BNPL, revolving, installment), domestic and cross-border payments, settlement including stablecoin settlement, and multi-currency accounts — all on a single architecture.

Q: What deployment options does nCore support?
A: nCore can be deployed in the cloud, on-soil, or on-premise — depending on your regulatory requirements and infrastructure model. It connects to your existing core banking system without replacement.

Q: Is nCore regulated and certified?
A: nCore is PCI DSS Level 1 certified and ISO 27001 certified. NymCard is a licensed and regulated payments provider and a principal member of Visa and Mastercard.

(Q6 "What markets does nCore operate in?" removed — market-agnostic decision.)

**JSON-LD:** FAQPage schema on /platform/ncore (existing FAQ component pattern).

---

# FINAL CTA

**Headline**

Talk to our team.

**Description**

See how banks, fintechs, and digital businesses build their payment programs on nCore.

**CTAs**

[ Talk to us ] [ Read the docs ]

---

# META

**Page title:** nCore — Payments and Banking Platform | NymCard

**Meta description:** nCore is NymCard's payments and banking platform — card issuing, embedded lending, cross-border payments, and stablecoin settlement on a single architecture.

**Primary keyword:** nCore payments platform

**Secondary keywords:** payments processing platform, card issuing infrastructure, modular payments platform, nCore NymCard
