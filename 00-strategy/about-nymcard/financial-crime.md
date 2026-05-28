# Product Reference — Financial Crime

Source: NymCard Financial Crime MCD. Product truth for the Financial Crime page — don't invent beyond this. Voice: `../../SKILL.md`. Arc: `../page-arc.md`. Platform facts: `../architecture.md`.

## Important — taxonomy correction
The source MCD predates the current architecture. It calls Financial Crime "the sixth product" and names a stale product list. Ignore that framing. Current architecture: **Financial Crime is one product layer of nCore.** Its capability content in the MCD (the nine signal engines, the claims register, regulatory mapping, deployment model) is valid and usable — the taxonomy framing is not.

## What it is
The financial crime layer of nCore — a unified, AI-first platform that replaces three systems banks usually buy separately: fraud detection, AML transaction monitoring, and compliance (KYC, sanctions, regulatory reporting). It runs on one continuously-updated record per customer: every event — a card swipe, a login, a PIN change, a document upload, a beneficiary addition, a transfer — flows through the same pipeline and is decided against the same model of who that customer is.

## The four capabilities to reference on the page
Financial Crime should be presented through these four:
- **Fraud management** — real-time fraud decisioning on every card authorization (APPROVE / CHALLENGE / BLOCK); covers card-present, card-not-present, account takeover, app-based fraud; explainable, with SHAP attribution on every score.
- **Risk monitoring** — AML transaction monitoring against configurable typologies; Customer Risk Rating (LOW / MEDIUM / HIGH / VERY HIGH) driving thresholds, review cadence, and monitoring intensity; sanctions screening on transactions, beneficiary additions, and onboarding.
- **Identity** — KYC, KYB, identity verification (IDV), and ongoing monitoring; document lifecycle management; periodic KYC reviews. Identity is a capability within Financial Crime, not a separate product.
- **ACS / 3D Secure** — real-time 3D Secure step-up authentication for card-not-present transactions; issuer-side ACS integration included; challenge decisions driven by the same enriched event signals as fraud scoring.

## Underlying architecture (for accuracy, not for the page body)
- **Universal enrichment** — every event passes through nine signal engines before any decision (geographic physics, temporal context, session context, device trust, behavioral baseline, transition anomaly, merchant familiarity, registry metadata, entity state).
- **Single customer record** — fraud, AML, and compliance read and write the same record. No separate "fraud customer" and "AML customer".
- **Immutable ledger** — every event, decision, and operator action written to an append-only, hash-chained, 7-year ledger. It is the audit trail, the training data, and the forensic record.
- **Case management** — one case system across fraud, AML, and compliance, with SLA timers and escalation.
- **Regulatory reporting** — STR/SAR generation and filing, maker-checker enforced.
- **AI Ops Assistant** — drafts case narratives, SAR/STR narratives, rule proposals, KYC review pre-population. Principle: AI reduces typing, not judgment — every output is a draft an analyst approves.

## What it does NOT do
Doesn't do core card processing or issuance (that's the Cards layer). Doesn't issue government identity documents — it consumes identity verification outputs. No consumer-facing interface. Doesn't custody or trade crypto.

## Who buys it
Banks, fintechs, issuer-processors, e-money and payment institutions, wallet operators, remittance operators. Roles: Chief Compliance Officer (regulatory obligations, audit-readiness), MLRO/Head of AML (typology coverage, alert volume), Head of Fraud Operations (real-time detection, false positives), CRO (risk rating, KYC cycle), CTO (API integration, no-code event types), Legal/Data Privacy (data protection built in).

## How it differs
Unifies fraud, AML, and compliance on one customer record vs three separate systems. Enrichment runs on every event type — financial and non-financial — vs financial events only. Explainable AI: SHAP attribution on every score, immutable ledger, human-in-the-loop AI assistant. Native integration with the rest of the nCore platform — for a customer already on NymCard, this is enabling a layer on an existing data spine, not a new integration.

## Claims — handle with care
The detailed performance numbers in the MCD's claims register (latency figures, typology counts, TPR/FPR targets) are real but several are pre-launch targets, not live production metrics. For website copy, stay at the capability level — "real-time fraud decisioning", "explainable scoring", "AML monitoring against configurable typologies" — and avoid specific performance numbers unless confirmed as live. Don't claim certifications not yet held, customer counts, or competitor comparisons. PCI DSS Level 1 and ISO 27001 at the platform level are fine.

## Don't
Don't present Financial Crime as four separate products — it's one layer with four capabilities. Don't claim regulator endorsement — the platform is *designed to satisfy* obligations, not *endorsed by* regulators. Don't make competitor comparisons. Don't cite pre-launch performance targets as production results. Don't claim universal global coverage.

## Cross-sell
Cards, Reconciliation.
