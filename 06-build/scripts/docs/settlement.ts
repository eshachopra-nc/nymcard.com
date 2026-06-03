import { withKeys } from "../_seed-utils";

export const settlementDoc = {
  _id: "productPage-settlement",
  _type: "productPage",
  title: "Settlement",
  slug: { _type: "slug", current: "settlement" },
  metaTitle:
    "Settlement, Real-Time, Multi-Currency, and Stablecoin Rails | NymCard",
  metaDescription:
    "Bank-grade settlement infrastructure on nCore, real-time cross-border, multi-currency, and stablecoin settlement for regulated businesses. Principal member of Visa and Mastercard. Cloud, on-soil, or on-premise.",
  trustLine:
    "Principal member of Visa and Mastercard · PCI DSS compliant · ISO 27001.",
  hero: {
    headline: "Settle across corridors in real time.",
    body: "Bank-grade settlement infrastructure for cross-border, multi-currency, and stablecoin flows — on one regulated platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    visualLabel: "settlement corridor",
  },
  capabilities: {
    eyebrow: "Capabilities",
    headline: "Run settlement end-to-end on one platform.",
    body: "Cross-border execution, multi-rail routing, and treasury orchestration — with stablecoin and traditional rails inside one architecture.",
    layout: "bento",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Settlement execution", heading: "Settlement execution", description: "Run cross-border settlement in real time on stablecoin or scheme rails, with automated fiat bridges on entry and exit.", span: 3, tall: true, uiLabel: "Settlement state machine" },
        { eyebrow: "Multi-rail routing", heading: "Multi-rail routing", description: "Route across stablecoin and traditional rails by cost, speed, and corridor availability.", span: 3, uiLabel: "Rail comparison" },
        { eyebrow: "Stablecoin settlement", heading: "Stablecoin settlement", description: "Settle on USDC and USDT rails where applicable, with automated fiat-to-stablecoin bridges on either side.", span: 3, uiLabel: "Fiat / stablecoin bridge" },
        { eyebrow: "Embedded compliance", heading: "Embedded compliance", description: "AML, sanctions screening, and regulatory reporting run inside the settlement path.", span: 3, uiLabel: "Compliance inline" },
        { eyebrow: "24/7/365 operations", heading: "24/7/365 operations", description: "Settle beyond banking hours, weekends, and holidays — no correspondent-banking window dependency.", span: 3, uiLabel: "Always-on indicator" },
        { eyebrow: "Liquidity & treasury", heading: "Liquidity and treasury", description: "Orchestrate corridor-aware liquidity with stablecoin pre-funding, reduce collateral lock-up, and give treasury flexibility across markets.", span: 6, uiLabel: "Corridor liquidity dashboard" },
      ],
      "cap",
    ),
  },
  // No FeatureShowcase per copy brief.
  configuration: {
    eyebrow: "Configuration",
    headline: "Configure settlement through the API.",
    body: "Corridor, rail preference, currency, pre-funding, and compliance rules — set per program, applied in real time.",
    docsLink: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    tabs: withKeys(
      [
        { label: "JSON", language: "json", code: `{\n  "corridor_id": "usd_eur",\n  "fiat_in": "USD",\n  "fiat_out": "EUR",\n  "primary_rail": "stablecoin",\n  "fallback_rail": "scheme",\n  "stablecoin": "USDC",\n  "pre_funding_position": 250000,\n  "compliance_profile": "standard",\n  "status": "active"\n}` },
        { label: "cURL", language: "http", code: `curl https://api.nymcard.com/v1/corridors \\\n  -H "Authorization: Bearer $NYMCARD_KEY" \\\n  -d corridor_id=usd_eur \\\n  -d primary_rail=stablecoin` },
        { label: "Node", language: "ts", code: `const corridor = await nymcard.corridors.create({\n  corridor_id: "usd_eur",\n  primary_rail: "stablecoin",\n  stablecoin: "USDC",\n});` },
      ],
      "tab",
    ),
    companion: {
      heading: "One configuration surface",
      body: "Corridors, rails, currencies, pre-funding, and compliance — all configurable per program, on the same API surface as Cards and Money Movement.",
      link: { label: "Read the configuration docs", href: "https://docs.nymcard.com/" },
    },
  },
  deployment: {
    eyebrow: "Deployment",
    headline: "Deploy in the cloud, on-soil, or on-premise.",
    body: "Three deployment models on the same platform — pick the one that fits your regulatory and architectural requirements.",
    items: withKeys(
      [
        { eyebrow: "Cloud", heading: "Cloud", description: "Multi-region, NymCard-hosted, fully managed." },
        { eyebrow: "On-soil", heading: "On-soil", description: "Hosted by NymCard inside your country, meeting in-country data residency." },
        { eyebrow: "On-premise", heading: "On-premise", description: "Run inside your own data center, fully self-hosted." },
      ],
      "dep",
    ),
  },
  // No migration section per copy brief.
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is Settlement?", answer: "Settlement is the nCore layer for cross-border, multi-currency, and stablecoin settlement. It runs on the same platform as Cards and Money Movement, with one ledger and one audit trail across every flow." },
        { question: "Does NymCard support stablecoin settlement?", answer: "Yes. Stablecoin settlement is a capability within the Settlement layer, with support for USDC and USDT where applicable. Automated fiat bridges convert into and out of stablecoin on entry and exit." },
        { question: "Is this a crypto product?", answer: "No. Settlement is regulated settlement infrastructure, not a crypto trading platform, exchange, or consumer digital-asset service. Stablecoin is one rail among several; regulated settlement is the product." },
        { question: "How fast is settlement?", answer: "Real time or near real time, depending on corridor availability and regulatory requirements. Specific settlement times vary by corridor and rail." },
        { question: "How does Settlement work with the rest of nCore?", answer: "Settlement runs on the same nCore platform as Cards and Money Movement. Traditional scheme settlement and stablecoin rails operate inside one architecture, no separate blockchain system required." },
        { question: "How is compliance handled?", answer: "AML, sanctions screening, and regulatory reporting run inside the settlement path, not as add-ons. Every flow is written to the same audit trail used across Cards, Money Movement, and Reconciliation." },
        { question: "Which deployment models are available?", answer: "Cloud, on-soil, and on-premise. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS compliant and ISO 27001 certified. NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to us.",
    body: "Run cross-border, multi-currency, and stablecoin settlement on one regulated platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Money Movement", body: "Move funds across domestic rails, cross-border, and FX, on the same nCore platform that settles them.", link: { label: "See Money Movement", href: "/products/money-movement" }, iconName: "ArrowLeftRight" },
      { leadIn: "Card Issuing", body: "Issue debit, credit, and prepaid cards on the same platform behind your settlement flows.", link: { label: "See Card Issuing", href: "/products/card-issuing" }, iconName: "CreditCard" },
    ],
    "cs",
  ),
};
