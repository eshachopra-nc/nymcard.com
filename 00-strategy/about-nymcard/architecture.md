# NymCard — Architecture & Facts Reference

This file is the factual source of truth for NymCard website copy. It is a condensed extract of the NymCard Master Context Document (MCD), scoped to what a website copywriter needs. For voice and copy rules, see `SKILL.md`. For page structure, see `page-arc.md`.

When this file conflicts with anything else on a matter of fact, this file wins. If a needed fact is not here, do not invent it — flag it and ask.

---

## What NymCard is

NymCard is a full-stack payments infrastructure company. It provides modular financial infrastructure that lets banks, fintechs, and digital businesses launch and scale every product in the modern payments stack — running on one platform, nCore.

NymCard is global. It is headquartered in the UAE and operates across multiple markets, expanding internationally. **Website copy is market-agnostic** — no CEMEA, no MENA, no "the region", no region-specific regulators on product or platform pages.

NymCard powers financial products behind the scenes. It is white-label by default — the partner owns the brand and the customer relationship.

**The misconception to fight:** that NymCard is a card processor. It is not — it is full-stack payments infrastructure. Card processing is one layer of what it does.

---

## The platform — nCore

**nCore is NymCard's full-stack payments infrastructure platform.** Every NymCard product runs on nCore. Every capability is enabled by nCore.

The structural facts about nCore:
- One platform behind every product. One customer record, one ledger, one audit trail across all products.
- Proprietary processing engine — NymCard owns the processor; it is not dependent on third-party processors.
- API-first architecture.
- AI woven through every layer — decisioning, routing, underwriting, monitoring.
- Most payment infrastructure is stitched together from separate vendors. nCore is built as a single system.

**Standard descriptor (first mention):** "nCore — NymCard's full-stack payments infrastructure platform."

---

## Architecture: 6 product layers + 2 verticals

This is the locked structure. It is identical across the website, decks, and all materials.

### The 6 product layers

Discrete products a partner can take, composably:

| Layer | What it is |
|---|---|
| **Cards** | Issuer processing across debit, credit, prepaid, and wallets |
| **Lending** | Credit decisioning, origination, servicing — BNPL, revolving credit, installments |
| **Money Movement** | Domestic rails, cross-border, FX, remittance |
| **Settlement** | Real-time, multi-currency, and stablecoin settlement |
| **Financial Crime** | Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity (KYC, KYB, IDV, monitoring) — as capabilities within one layer |
| **Reconciliation** | Automated reconciliation across products and rails |

### The 2 verticals

Intelligence and data layers that run across all six product layers. Not discrete products, not standalone pages.

| Vertical | What it is |
|---|---|
| **AI** | Agentic AI, domain-trained models, intelligence woven into every layer. Flows *into* the layers — decisioning, routing, underwriting, monitoring. |
| **Insights** | Dashboards, MIS, and analytics across every layer. Flows *out of* the layers — visibility, reporting, management information. |

### Architecture rules

- The architecture is **6 product layers + 2 verticals**. Fixed.
- **Financial Crime is ONE layer.** Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity are capabilities within it — not separate products. Do not create standalone Fraud, Risk, 3DS, or Identity product pages.
- **Identity** (KYC, KYB, IDV, monitoring) is a capability within Financial Crime.
- **Settlement includes stablecoin settlement** as a capability. "Stablecoin Settlement" is not a separate product — it is part of the Settlement layer. (Note: an older standalone "Stablecoin Settlement" page exists; current architecture folds it into Settlement.)
- **Insights is a vertical**, not a product. No standalone Insights page. It is referenced as a capability within relevant product pages. Per-product dashboards that ship inside a product are called "dashboards" or "reporting" — never "Insights".
- **AI is a vertical**, woven across every layer. Not sold or positioned as a discrete product.
- The taxonomy is composable and evolving — new layers can be added without rework.

---

## Solutions

Solutions are distinct from products. A **product layer** is a discrete capability on nCore. A **solution** is a buyer-segment use case that combines multiple product layers into a packaged offering for a defined buyer.

Solutions never introduce new capabilities — they are a way of presenting the product layers to a specific buyer, organized around what that buyer is launching. On the website, solutions live in a dedicated Solutions section, separate from product navigation. Each solution may have its own page.

| Solution | What it is | Primary layers |
|---|---|---|
| **Commercial Banking** | A white-label commercial payments platform for SMEs and corporates, delivered with Visa — corporate cards, accounts, spend controls, governance | Cards, Lending, Money Movement |
| **Banking as a Service** | A complete banking stack on the NymCard regulatory core, under the partner's brand | Cards, Money Movement, Settlement, Financial Crime |
| **Embedded Finance** | Cards, payments, and credit added to the platform a partner's customers already use | Cards, Lending, Money Movement |
| **Buy Now Pay Later** | Decisioning, origination, servicing, collections built into the checkout | Lending, Cards |
| **Cross-Border & Remittance** | Money moved across corridors with FX, settlement, and compliance on one offering | Money Movement, Settlement, Financial Crime |

Note: "Commercial Payments" is the older name for the Commercial Banking solution. Use "Commercial Banking". Commercial Payments is not a product layer.

---

## Services

Services complement the products. They are delivered by NymCard people, on top of nCore, around the products — not self-serve.

| Service | What it is |
|---|---|
| **Migration & Modernisation** | Platform migration from legacy infrastructure to NymCard, including agentic AI-led migration tooling |
| **Card Fulfilment** | Physical card production, personalization, packaging, logistics |
| **Call Centre** | 24/7 customer support, cardholder services, dispute management |
| **Product Design** | Custom front-end design and build for web, mobile, desktop, portal interfaces |
| **PayKit** | White-labeled front-end delivered by NymCard — SDKs or full mobile/web UI/UX built on the partner's payment and wallet infrastructure, so partners ship a branded customer-facing experience without a separate front-end build |

---

## Deployment models

Three native deployment models on the same platform. All three appear on product pages in the deployment section.

- **Cloud** — multi-region, NymCard-hosted, fully managed.
- **On-soil** — hosted by NymCard inside the customer's country, meeting in-country data residency requirements.
- **On-premise** — run inside the customer's own data center, fully self-hosted.

---

## Network & certifications

- **Principal member of Visa and Mastercard.** (On the website, list Visa and Mastercard as separate items, not "Visa and Mastercard" as one.)
- Built-in connectivity: Visa, Mastercard, Visa Direct, Mastercard Cross-Border (XB), Western Union, MoneyGram.
- **PCI DSS Level 1 certified.**
- **ISO 27001 certified.**
- Blockchain rails (USDC, USDT) where applicable, for the Settlement layer.

These are trust signals. State them factually. Do not dress them as marketing superlatives.

---

## Audiences

The buyers NymCard sells to. Use these names. **Never use "institutions" as a collective noun.**

- **Banks and financial institutions** — revenue growth, product expansion, regulatory alignment.
- **Fintechs / NBFIs** — speed to market, modular infrastructure, scalability.
- **Digital businesses / enterprises** — embedded financial capabilities, operational efficiency.
- **Exchange houses** — cross-border flows, corridor monetization.
- **Government agencies** — disbursement infrastructure, financial inclusion.

When listing collectively, three is the right number: "banks, fintechs, and digital businesses."

Buyer roles that shape page emphasis: CFO/Treasurer (revenue, cost, FX, capital efficiency), CTO/CIO (integration, architecture, scalability), CPO/Head of Product (speed to launch, configurability), Head of Payments (transaction flows, settlement, network access), Head of Lending (credit infrastructure, underwriting), Head of Financial Crime/CCO (regulatory exposure, decision defensibility, explainability, audit trail), COO (operational efficiency, risk control, consolidation).

---

## Positioning claim

**Primary:** Full-stack payments infrastructure.

This is the fixed category claim. Do not invent alternatives ("powering the future of payments", "reinventing infrastructure", etc.).

Brand messaging hierarchy:
- Level 1 — Full-stack payments infrastructure (corporate identity)
- Level 2 — nCore, the platform that powers it
- Level 3 — Cards. Lending. Money Movement. Settlement. Financial Crime. Reconciliation. With AI and Insights across the platform.
- Level 4 — product-specific value statements

Note on case: the MCD specifies Title Case for decks and press. **The website uses sentence case** — see `SKILL.md`. Sentence case wins for all website copy.

---

## Regulatory framing

- NymCard operates as a regulated infrastructure provider.
- Compliance posture and licensing vary by jurisdiction.
- Website copy must not: imply a banking license unless confirmed for a specific market; imply deposit-taking; imply loan funding (Lending is infrastructure, not direct lending — NymCard does not fund loans); overstate geographic regulatory coverage.
- Keep regulatory claims factual and global. Do not put region-specific regulators on the global product/platform pages unless a page is explicitly scoped to a market.

---

## What NymCard is NOT

Do not position NymCard as any of these:

- A consumer neobank — it provides infrastructure and white-label products; consumer distribution is not the model.
- A crypto exchange or trading platform — stablecoin settlement is a settlement capability, not trading.
- A core banking replacement — it integrates with existing cores.
- A front-end-only fintech app — it provides the processing and infrastructure underneath.
- A payment acceptance or acquiring provider — acceptance/acquiring is explicitly out of scope.

---

## Banned language (facts side)

For the full voice ban list see `SKILL.md`. The facts-specific bans:

- No "CEMEA", "MENA", "the region", "regional" — the site is global.
- No "institutions" as a collective noun.
- No standalone Fraud, Risk, 3DS, Identity, Insights, or Stablecoin Settlement products — these are capabilities or verticals.
- No "Commercial Payments" as a product — it is the Commercial Banking solution.
- No invented certifications, customer names, statistics, or capabilities.
- No implied banking license, deposit-taking, or loan funding.

---

## Per-product reference files

Product-level facts (capability detail, buyers, competitive framing, claims registers) live in `reference/products/`. One file per product. The website copywriting workflow requires the relevant product file before a product page is written.

Status of product reference material:
- **Cards** — product reference needed.
- **Lending** — product reference needed.
- **Money Movement** — product reference needed.
- **Settlement** — product reference needed (note: an older "Stablecoin Settlement" MCD exists in Notion and has usable capability content; stablecoin is now a capability within Settlement).
- **Financial Crime** — a detailed MCD exists (Notion). It predates the current architecture: it refers to Financial Crime as "the sixth product" and names a stale product list. Its capability content (the nine signal engines, the claims register, regulatory mapping, deployment model) is valid and usable; its taxonomy framing is not — Financial Crime is a layer, not a standalone "sixth product", and it houses fraud, risk, 3DS, AML, sanctions, chargeback, and identity as capabilities.
- **Reconciliation** — no product facts available yet. A scaffolded reference file should be created with facts marked for confirmation. Do not write a Reconciliation page from invented capabilities.

If a product page is requested and its reference file does not exist, surface this and stop.
