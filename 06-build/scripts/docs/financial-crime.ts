import { withKeys } from "../_seed-utils";

export const financialCrimeDoc = {
  _id: "productPage-financial-crime",
  _type: "productPage",
  title: "Financial Crime",
  slug: { _type: "slug", current: "financial-crime" },
  metaTitle:
    "Financial Crime, Fraud, AML, Identity, and 3D Secure on One Layer | NymCard",
  metaDescription:
    "Run fraud, AML, sanctions, identity, and 3D Secure on one layer of nCore, NymCard's full-stack payments platform. Explainable decisioning, immutable audit trail, and configurable typologies. Cloud, on-soil, or on-premise.",
  trustLine:
    "Principal member of Visa and Mastercard · PCI DSS compliant · ISO 27001.",
  hero: {
    headline: "Cover the full risk perimeter on one layer.",
    body: "Fraud, AML, sanctions, identity, and 3D Secure run on one customer record, one ledger, one audit trail — built into nCore.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    visualLabel: "decisioning console",
  },
  // NOTE (1 Jun 2026): §3 now renders from the hardcoded FinancialCrimeControls
  // component (five editorial capability rows — Identity, Fraud, Risk, AML &
  // sanctions, 3D Secure) via the `financial-crime` slug branch in
  // ProductPageRenderer — NOT from this `capabilities` field. Copy source of
  // truth is ../../02-copy/financial-crime-copy.md §3. Retained for Sanity
  // schema shape only; no longer the §3 render source.
  capabilities: {
    eyebrow: "Capabilities",
    headline: "One layer, every risk control your team needs.",
    body: "Fraud, AML transaction monitoring, sanctions screening, identity, and 3D Secure — decided against the same customer record and the same signal pipeline.",
    layout: "bento",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Fraud management", heading: "Fraud management", description: "Real-time decisioning on every card authorization — approve, challenge, or block — with the reason behind every score.", span: 6, tall: true, uiLabel: "Auth stream + SHAP attribution" },
        { eyebrow: "Risk monitoring", heading: "Risk monitoring", description: "Configurable AML typologies, customer risk ratings, and sanctions screening on every transaction, beneficiary, and onboarding.", span: 3, uiLabel: "Typology editor + alert feed" },
        { eyebrow: "Identity", heading: "Identity", description: "KYC, KYB, identity verification, and ongoing monitoring on the same customer record the rest of the layer reads from.", span: 3, uiLabel: "Customer record + KYC lifecycle" },
        { eyebrow: "ACS / 3D Secure", heading: "ACS / 3D Secure", description: "Issuer-side step-up authentication driven by the same enriched signals as the rest of the layer.", span: 6, uiLabel: "CNP step-up decision" },
      ],
      "cap",
    ),
  },
  featureShowcase: {
    eyebrow: "Decisioning",
    headline: "See why every decision was made.",
    body: "Every score, alert, and case is backed by the signals that drove it, the operator actions taken, and an immutable record of both.",
    uiLabel: "decisioning dashboard",
  },
  configuration: {
    eyebrow: "Configuration",
    headline: "Configure typologies, thresholds, and screening through the API.",
    body: "AML rules, sanctions lists, and risk thresholds — versioned, applied in real time, and logged to the ledger.",
    docsLink: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    tabs: withKeys(
      [
        { label: "JSON", language: "json", code: `{\n  "rule_id": "structuring_v3",\n  "rule_type": "aml_typology",\n  "event_types": ["transfer", "cash_deposit"],\n  "threshold_amount": 9500,\n  "window_hours": 24,\n  "min_event_count": 3,\n  "customer_risk_filter": ["MEDIUM", "HIGH", "VERY_HIGH"],\n  "action": "alert_and_case",\n  "status": "active"\n}` },
        { label: "cURL", language: "http", code: `curl https://api.nymcard.com/v1/financial-crime/rules \\\n  -H "Authorization: Bearer $NYMCARD_KEY" \\\n  -d rule_id=structuring_v3 \\\n  -d rule_type=aml_typology` },
        { label: "Node", language: "ts", code: `const rule = await nymcard.financialCrime.rules.create({\n  rule_id: "structuring_v3",\n  rule_type: "aml_typology",\n  threshold_amount: 9500,\n});` },
      ],
      "tab",
    ),
    // Companion block removed (owner direction, 1 Jun 2026). The §5 renderer
    // also suppresses it for financial-crime, so this stays in sync on reseed.
  },
  deployment: {
    eyebrow: "Deployment",
    headline: "Deploy in the cloud, on-soil, or on-premise.",
    body: "Three deployment models on the same platform — pick the one that fits your regulatory and data-residency requirements.",
    items: withKeys(
      [
        { eyebrow: "Cloud", heading: "Cloud", description: "Multi-region, NymCard-hosted, fully managed." },
        { eyebrow: "On-soil", heading: "On-soil", description: "Hosted by NymCard inside your country, meeting in-country data residency." },
        { eyebrow: "On-premise", heading: "On-premise", description: "Run inside your own data center, fully self-hosted." },
      ],
      "dep",
    ),
  },
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is Financial Crime on NymCard?", answer: "Financial Crime is one layer of nCore. Fraud, AML transaction monitoring, sanctions screening, identity (KYC, KYB, IDV, and ongoing monitoring), 3D Secure, and chargeback are capabilities within this layer, not separate products. They share a single customer record, a single signal pipeline, and a single audit trail." },
        { question: "How does Financial Crime relate to nCore?", answer: "It runs on nCore alongside Cards, Lending, Money Movement, Settlement, and Reconciliation. Because NymCard owns nCore and is a principal member of Visa and Mastercard, fraud and 3D Secure decisions run inline with card authorization rather than over a third-party hop." },
        { question: "Is Identity a separate product?", answer: "No. KYC, KYB, identity verification, and ongoing monitoring are capabilities inside the Financial Crime layer, reading and writing the same customer record as fraud and AML." },
        { question: "How explainable are the decisions?", answer: "Every fraud score carries SHAP attribution showing the top contributing signals. Every event, decision, and operator action is written to an append-only, hash-chained ledger retained for seven years." },
        { question: "What about regulatory obligations?", answer: "The platform is designed to support obligations like STR/SAR generation and filing, maker-checker workflows, and periodic KYC reviews. The partner institution holds the regulatory responsibility; NymCard provides the infrastructure beneath it." },
        { question: "Can I bring my own AML typologies and sanctions lists?", answer: "Yes. Typologies, thresholds, customer risk rules, and sanctions lists are configurable through the API. Every change is versioned, logged, and reversible." },
        { question: "Can I deploy Financial Crime on-premise?", answer: "Yes. Cloud, on-soil, and on-premise are supported on the same platform. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS compliant and ISO 27001 certified." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to us.",
    body: "Run fraud, AML, identity, and 3D Secure on one layer of nCore.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Cards", body: "Fraud, 3D Secure, and KYC run inside the authorization path on the same nCore platform.", link: { label: "See Cards", href: "/products/card-issuing" }, iconName: "CreditCard" },
      { leadIn: "Reconciliation", body: "Reconcile authorizations, settlements, chargebacks, and case outcomes across products.", link: { label: "See Reconciliation", href: "/products/reconciliation" }, iconName: "FileCheck2" },
    ],
    "cs",
  ),
};
