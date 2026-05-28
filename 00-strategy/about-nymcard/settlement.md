# Product Reference — Settlement

Source: NymCard Stablecoin Settlement MCD. Product truth for the Settlement page — don't invent beyond this. Voice: `../../SKILL.md`. Arc: `../page-arc.md`. Platform facts: `../architecture.md`.

## Scope note
The Settlement layer covers real-time, multi-currency, and stablecoin settlement. The source MCD documents the **stablecoin settlement capability** in depth. Real-time and multi-currency settlement are part of the layer but thinly documented — write those with care and mark anything uncertain `[CONFIRM]` rather than inventing detail. Stablecoin settlement is a capability *within* Settlement, not a separate product.

## What it is
The settlement layer of nCore — bank-grade settlement infrastructure that lets regulated financial entities execute cross-border settlement, coordinate liquidity, and optimize capital. It bridges blockchain-based rails with traditional payment infrastructure inside one architecture.

**Critical framing:** this is settlement infrastructure, not a crypto product, trading platform, exchange, or consumer digital-asset service. Stablecoin is the mechanism; regulated settlement is the product. Keep all messaging institutional and compliance-aware.

## One-line positioning
Bank-grade settlement infrastructure on nCore — real-time, multi-currency, and stablecoin settlement, bridging blockchain rails and traditional payment systems for regulated businesses.

## Capabilities
- **Settlement execution** — cross-border settlement in real time on stablecoin rails, with automated fiat bridges on entry and exit; multi-corridor routing; one ledger, full audit trail.
- **Fiat-to-stablecoin bridge** — automated conversion between fiat and stablecoin.
- **Multi-rail routing** — route across stablecoin and traditional rails by cost, speed, and corridor availability.
- **Liquidity and treasury** — corridor-aware liquidity orchestration, capital optimization, reduced collateral lock-up via stablecoin pre-funding, treasury flexibility across time zones.
- **24/7/365 operations** — settlement beyond banking hours, weekends, and holidays — no correspondent-banking window dependency.
- **Compliance** — AML, sanctions screening, and regulatory reporting embedded in the settlement path.

## Stablecoins
USDT, USDC, where applicable.

## Who buys it
Commercial banks, exchange houses, PSPs/EMIs, NBFIs, retail and marketplaces, telecoms, government (where permitted). Roles: Treasurer/Head of Treasury (capital efficiency, liquidity), Head of International Payments (settlement speed, reliability), CTO/CIO (integration, no separate blockchain system), Head of Compliance/CCO (embedded AML, audit readiness), COO (operational continuity), CFO (cost of settlement, treasury ROI).

## How it differs
Infrastructure-first and institutional-only vs crypto-native platforms. Stablecoin and traditional settlement coexist in one nCore architecture — no separate blockchain system. Compliance embedded vs add-on or external. Regulated, controlled deployment vs unregulated crypto-native posture. Integrated with the Cards and Money Movement layers.

## Speed claims — important
Use **"real time"** or "near real time" — never "instant", never "seconds" as an absolute. Qualify with "subject to corridor availability and regulatory requirements" where settlement speed is claimed. This page carries regulatory sensitivity — all copy should be reviewed before publication.

## Don't
Don't position it as a crypto platform, exchange, or speculative/trading product. Don't use crypto-native language (DeFi, Web3, token, yield, on-chain, trading). Don't make stablecoin the hero — regulated settlement capability is the hero. Don't use absolute speed claims. Don't frame correspondent banking as failing — use structural framing (evolving settlement infrastructure). Don't claim universal global coverage. Do not name specific virtual-asset licenses on the page (per current direction); CBUAE may be referenced as the payments regulator. Keep regulatory claims factual and reviewed.

## Cross-sell
Money Movement, Cards.
