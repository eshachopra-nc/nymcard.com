# Product Reference — Money Movement

Source: NymCard Money Movement MCD. Product truth for the Money Movement page — don't invent beyond this. Voice: `../../SKILL.md`. Arc: `../page-arc.md`. Platform facts: `../architecture.md`.

## Scope note
The MCD documents the **cross-border and FX scope** in detail. Domestic rails fall within Money Movement's product scope but are thinly documented. Write the page on cross-border, FX, and settlement orchestration. If domestic-rail detail is needed, mark it `[CONFIRM]` rather than inventing it.

## What it is
The money movement layer of nCore — multi-currency payment orchestration and FX infrastructure. Partners control routing, manage FX pricing, orchestrate settlement, and capture corridor revenue. It is an orchestration and treasury layer, not a remittance network or FX broker.

**Revenue boundary:** the partner captures FX spread and corridor revenue, not NymCard. Never imply NymCard takes the spread.

## One-line positioning
Multi-currency payment and FX infrastructure on nCore — orchestrate, control, and monetize cross-border settlement flows.

## Capabilities
- **Payment orchestration** — domestic and international flows, corridor routing logic, payment tracking and visibility.
- **FX and treasury** — FX pricing and spread management, liquidity management, treasury coordination, partner-owned FX monetization. Positioned as a treasury infrastructure layer, not just a payment capability.
- **Connectivity** — Visa Direct, Mastercard Cross-Border (XB), Western Union, MoneyGram.
- **Settlement and reconciliation** — multi-currency settlement, automated reconciliation, reporting.
- **Risk and compliance** — AML, sanctions, transaction monitoring, compliance-aware routing.
- **Corridor activation** — activate new corridors without rebuilding; phased activation, parallel settlement routes, gradual consolidation — modernize without disrupting existing revenue.

## Who buys it
Commercial banks, exchange houses, NBFIs/PSPs/EMIs, retail and marketplaces, telecoms, government. Roles: Treasurer/CFO (capital efficiency, FX cost), Head of International Payments / Head of Remittances (settlement speed, corridor reliability), CTO/CIO (integration, routing control), Head of Compliance/CCO (AML, compliance-aware routing), COO (reconciliation, visibility), Head of Product/CPO (corridor expansion).

## How it differs
Infrastructure vs SaaS. Partner-owned revenue vs platform-owned. Configurable routing vs abstracted API aggregation. Orchestration layer across existing and new corridors vs network-controlled or batch correspondent flows. Connected to Cards and Lending on nCore.

## Don't
Don't position it as a remittance provider, FX broker, or payment aggregator — it's infrastructure. Don't imply NymCard captures FX spread or corridor revenue. Don't frame Visa Direct / Mastercard XB / Western Union / MoneyGram as failing — they're integration partners. Don't over-claim domestic rails. Don't claim universal global coverage. No absolute speed claims without qualifier.

## Cross-sell
Settlement, Cards.
