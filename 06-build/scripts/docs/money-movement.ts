import { withKeys } from "../_seed-utils";

export const moneyMovementDoc = {
  _id: "productPage-money-movement",
  _type: "productPage",
  title: "Money Movement",
  slug: { _type: "slug", current: "money-movement" },
  metaTitle:
    "Money Movement, Cross-Border Payments, FX, and Corridor Orchestration | NymCard",
  metaDescription:
    "Orchestrate cross-border payments, route corridors, and manage FX on nCore, NymCard's full-stack payments platform. Connected to Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram. Cloud, on-soil, or on-premise.",
  trustLine:
    "Principal member of Visa and Mastercard · Connected to Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram · PCI DSS compliant · ISO 27001.",
  hero: {
    headline: "Move money where your customers need it.",
    body: "Orchestrate cross-border payments, route corridors, and manage FX on infrastructure you control and monetize.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    visualLabel: "corridor map",
  },
  capabilities: {
    eyebrow: "Capabilities",
    headline: "Orchestrate every flow, every corridor, every currency.",
    body: "One platform for domestic flows, cross-border routing, FX, settlement, and compliance — with the revenue staying on your side of the spread.",
    layout: "bento",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Payment orchestration", heading: "Payment orchestration", description: "Route domestic and international flows through the corridors you choose, with live visibility on every payment.", span: 6, tall: true, uiLabel: "Corridor map + tracking" },
        { eyebrow: "Connectivity", heading: "Connectivity", description: "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram — built in.", span: 3, uiLabel: "Networks" },
        { eyebrow: "Settlement", heading: "Settlement and reconciliation", description: "Multi-currency settlement with automated reconciliation across every leg.", span: 3, uiLabel: "Settlement summary" },
        { eyebrow: "Compliance", heading: "Compliance-aware routing", description: "AML, sanctions, and transaction monitoring run inside the routing decision.", span: 3, uiLabel: "Routing decision tree" },
        { eyebrow: "Activation", heading: "Corridor activation", description: "Activate new corridors without rebuilding — phased rollout, parallel routes, gradual consolidation.", span: 3, uiLabel: "Corridor activation" },
        { eyebrow: "FX and treasury", heading: "FX and treasury", description: "Set your own FX pricing, manage spreads and liquidity, and keep the corridor revenue on your side.", span: 6, uiLabel: "Treasury console" },
      ],
      "cap",
    ),
  },
  featureShowcase: {
    eyebrow: "Controls",
    headline: "Route every corridor in real time.",
    body: "Configure routing rules, manage FX, and respond to corridor conditions, on a console built for treasury and payments teams.",
    uiLabel: "corridor routing console",
  },
  configuration: {
    eyebrow: "Configuration",
    headline: "Configure routing and FX through the API.",
    body: "Corridor preferences, FX spreads, settlement legs, and compliance rules — defined per corridor, applied in real time.",
    docsLink: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    tabs: withKeys(
      [
        { label: "JSON", language: "json", code: `{\n  "corridor": "USD_PHP",\n  "primary_route": "visa_direct",\n  "fallback_route": "mastercard_xb",\n  "fx_spread_bps": 35,\n  "settlement_currency": "USD",\n  "settlement_leg": "T+0",\n  "compliance_profile": "standard",\n  "status": "active"\n}` },
        { label: "cURL", language: "http", code: `curl https://api.nymcard.com/v1/corridors \\\n  -H "Authorization: Bearer $NYMCARD_KEY" \\\n  -d corridor=USD_PHP \\\n  -d primary_route=visa_direct` },
        { label: "Node", language: "ts", code: `const corridor = await nymcard.corridors.create({\n  corridor: "USD_PHP",\n  primary_route: "visa_direct",\n  fx_spread_bps: 35,\n});` },
      ],
      "tab",
    ),
    companion: {
      heading: "Corridor-level configuration",
      body: "Routes, fallback paths, FX spreads, settlement legs, and compliance profiles — all configurable per corridor and per partner program, on the same API surface.",
      link: { label: "Read the configuration docs", href: "https://docs.nymcard.com/" },
    },
  },
  industries: {
    eyebrow: "Industries",
    headline: "Money movement for every industry.",
    items: withKeys(
      [
        { eyebrow: "Banks", copy: "International payments and treasury flows on one platform.", link: { label: "See banks", href: "/solutions/retail-banking" } },
        { eyebrow: "Exchange houses", copy: "Corridor routing and FX with revenue on your side.", link: { label: "See exchange houses", href: "/solutions/exchange-houses" } },
        { eyebrow: "Fintechs", copy: "Cross-border payouts, FX, and settlement through one API.", link: { label: "See fintechs", href: "/solutions/fintechs" } },
        { eyebrow: "Marketplaces", copy: "Pay sellers across currencies and countries.", link: { label: "See marketplaces", href: "/solutions/retail-marketplaces" } },
        { eyebrow: "Telecoms", copy: "Remittance corridors connected to wallets and accounts.", link: { label: "See telecoms", href: "/solutions/telecommunications" } },
        { eyebrow: "Government", copy: "Disbursement and cross-border programs with auditable flows.", link: { label: "See government", href: "/solutions/government" } },
      ],
      "ind",
    ),
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
  // No migration section on Money Movement per the copy brief.
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is Money Movement?", answer: "Money Movement is the money movement layer of nCore, NymCard's full-stack payments platform. It is a multi-currency payment orchestration and FX layer: partners route corridors, manage FX pricing, orchestrate settlement, and capture corridor revenue. It is infrastructure, not a remittance network or FX broker." },
        { question: "Does NymCard take the FX spread or corridor revenue?", answer: "No. The partner sets FX pricing and captures the spread. NymCard provides the infrastructure that makes the routing, pricing, and settlement possible — the revenue stays with the partner." },
        { question: "Which networks and corridors are connected out of the box?", answer: "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram are built in. Additional corridors can be activated per program." },
        { question: "Can I activate new corridors without disrupting my existing ones?", answer: "Yes. Corridors can be activated in parallel with existing routes, traffic can shift gradually, and consolidation happens on your timing. Existing revenue is not interrupted during the migration." },
        { question: "How does compliance fit into routing?", answer: "AML, sanctions, and transaction monitoring run inside the routing decision. Compliance-aware routing can re-route a payment around a flagged corridor and resolve through an alternate path." },
        { question: "Can I deploy Money Movement on-premise?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS compliant and ISO 27001 certified." },
        { question: "Does Money Movement connect to Cards and Settlement on NymCard?", answer: "Yes. Money Movement runs on nCore alongside Cards, Lending, Settlement, Financial Crime, and Reconciliation, one platform, one customer record, one ledger across products." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to us.",
    body: "Orchestrate corridors, manage FX, and capture cross-border revenue on infrastructure built to scale.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Settlement", body: "Settle in real time, across currencies and stablecoin rails, on the same nCore platform behind your corridors.", link: { label: "See Settlement", href: "/products/settlement" }, iconName: "Layers" },
      { leadIn: "Cards", body: "Issue debit, credit, and prepaid cards tied to the same accounts and corridors your customers move money through.", link: { label: "See Cards", href: "/products/card-issuing" }, iconName: "CreditCard" },
    ],
    "cs",
  ),
};
