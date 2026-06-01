import { withKeys } from "../_seed-utils";

export const reconciliationDoc = {
  _id: "productPage-reconciliation",
  _type: "productPage",
  title: "Reconciliation",
  slug: { _type: "slug", current: "reconciliation" },
  metaTitle:
    "Reconciliation, Automated Matching Across Products and Systems | NymCard",
  metaDescription:
    "Reconcile activity across every NymCard product and the external systems they connect to. Runs on nCore. PCI DSS Level 1 and ISO 27001 certified. Cloud, on-soil, or on-premise.",
  trustLine:
    "Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.",
  hero: {
    headline: "Reconcile across every product and system, automatically.",
    body: "Reconciliation runs on nCore, matching activity across your NymCard products and the external systems they connect to.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    visualLabel: "reconciliation streams",
  },
  capabilities: {
    eyebrow: "Reconciliation scope",
    headline: "Match across the whole platform.",
    body: "Reconciliation works across every product on nCore and the external systems they touch.",
    layout: "cols-2",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Across NymCard products", heading: "Across NymCard products", description: "Reconcile Cards, Lending, Money Movement, Settlement, and Financial Crime activity in one place.", uiLabel: "Unified ledger view" },
        { eyebrow: "Across external systems", heading: "Across external systems", description: "Reconcile NymCard activity against external rails, banks, and partner systems.", uiLabel: "Two-column ledger match" },
      ],
      "cap",
    ),
  },
  // No FeatureShowcase, no Configuration, no Migration, Reconciliation is intentionally thin per copy.
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
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is Reconciliation?", answer: "Reconciliation is the layer of nCore that automates matching across NymCard products and the external systems they connect to. It is one of the six product layers on the platform." },
        { question: "What does it reconcile?", answer: "Activity across your NymCard products, Cards, Lending, Money Movement, Settlement, and Financial Crime, and the external rails, banks, and partner systems they touch." },
        { question: "Does Reconciliation run on nCore?", answer: "Yes. Reconciliation runs on nCore alongside the other product layers, with one customer record and one audit trail across the platform." },
        { question: "What deployment models are available?", answer: "Cloud, on-soil, and on-premise. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center." },
        { question: "Is the platform certified?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified." },
        { question: "When will more capability detail be available?", answer: "Reconciliation is a recently promoted layer on nCore, expanding through 2026. Talk to us for current scope." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to us.",
    body: "See how Reconciliation runs across your products and the systems you connect to.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Settlement", body: "Real-time, multi-currency, and stablecoin settlement on the same nCore platform.", link: { label: "See Settlement", href: "/products/settlement" }, iconName: "Layers" },
      { leadIn: "Financial Crime", body: "Fraud, AML, sanctions, and identity as capabilities within one layer on nCore.", link: { label: "See Financial Crime", href: "/products/financial-crime" }, iconName: "ShieldAlert" },
    ],
    "cs",
  ),
};
