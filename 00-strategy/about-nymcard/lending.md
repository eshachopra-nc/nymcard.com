# Product Reference — Lending

Source: NymCard Embedded Lending MCD. Product truth for the Lending page — don't invent beyond this. Voice: `../../SKILL.md`. Arc: `../page-arc.md`. Platform facts: `../architecture.md`.

## What it is
The credit infrastructure layer of nCore. Banks, fintechs, and digital businesses design, control, and scale digital lending programs — origination, decisioning, disbursement, billing, repayment, collections — built into the card and payment stack, not run as a separate system. Modular and configurable per program.

**Critical boundary:** NymCard does not fund loans. Lending is infrastructure — the partner retains the lending relationship, the funding model, and the regulatory responsibility. This is a compliance-critical line; never imply otherwise.

## One-line positioning
Modular credit infrastructure on nCore — design, control, and scale lending programs built directly into your payment and card ecosystem.

## Capabilities
- **Origination and onboarding** — loan origination workflows, digital onboarding, KYC/KYB, document verification.
- **Credit decisioning** — configurable underwriting rules by segment and product; credit bureau and alternative-data integration; AI-driven scoring; dynamic credit limits and risk-based pricing.
- **Lending structures** — installment (fixed-term), revolving credit, charge, BNPL, working capital, invoice financing; conventional interest-based and Islamic/Sharia-compliant profit-based; balance conversion, early payment.
- **Repayment and collections** — billing cycles, repayment schedules, automated collection, delinquency tracking, early-intervention triggers.
- **Disbursement** — via cards, accounts, or wallets; card-linked credit via the Cards layer.
- **Risk and compliance** — AML, sanctions screening, transaction monitoring, fraud controls, regulatory reporting (via the Financial Crime layer).

## Lending program types
Credit cards, BNPL, installment plans (EPP), working capital loans, invoice financing, revolving credit lines, device financing, patient financing, auto financing/leasing, subsidized SME lending, digital-first lending.

## Who buys it
Consumer banks, commercial banks, fintechs/NBFIs, retail and marketplaces, telecoms, government, healthcare, automotive. Roles: CFO (lending revenue, portfolio profitability), CTO/CIO (integration), Head of Retail Lending/CRO (underwriting control, credit risk), Head of SME Banking (commercial credit scale), Product (speed, configurability), Risk/Compliance (embedded compliance), Operations (billing, reconciliation).

## How it differs
Credit embedded into payment and card flows vs a separate lending system. Configurable underwriting and structures vs rigid core-banking modules. Multi-structure (BNPL to revolving to working capital) on one layer. White-label infrastructure vs direct-to-consumer BNPL providers. Partner-funded, not NymCard-funded — a clean liability boundary regulated institutions need.

## Don't
Never imply NymCard funds or underwrites loans — hard compliance line. Don't position Lending as a standalone product disconnected from the platform. Don't understate the embedded compliance. Don't claim universal global coverage. No absolute speed claims without qualifier.

## Cross-sell
Cards, Money Movement.
