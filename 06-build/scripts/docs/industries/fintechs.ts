import { withKeys } from "../../_seed-utils";

// ── fintechs ───────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/fintechs.
// Mirrors ../02-copy/Industry Fintechs-Copy.md (Draft v2).
// No PayKit callout, fintechs build their own front ends as core IP.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const fintechsDoc = {
  _id: "industryPage-fintechs",
  _type: "industryPage",
  title: "Fintechs",
  slug: { _type: "slug", current: "fintechs" },
  metaTitle: "Fintech Payment Infrastructure | NymCard",
  metaDescription:
    "Card issuing, embedded lending, cross-border payments, and compliance for fintechs, modular, API-first, built on nCore.",

  hero: {
    headline: "Build financial products without building infrastructure.",
    body: "Card issuing, embedded lending, payments, and compliance, modular, API-first, ready to configure for your product.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "fintech product surface",
  },

  outcomes: withKeys(
    [
      { iconName: "Zap", label: "Ship faster", body: "Skip the infrastructure build. Go from integration to launch without waiting on us." },
      { iconName: "TrendingUp", label: "Revenue from day one", body: "Interchange, credit, and FX revenue embedded into your product from launch." },
      { iconName: "Layers", label: "Add capabilities as you scale", body: "Start with cards. Add lending, wallets, and cross-border when your product needs them." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Fintechs that build payment infrastructure from scratch spend years on capability that should be table stakes, engineering time goes into processing, compliance, and program management instead of the product itself.",
    solution:
      "NymCard provides the processing, compliance, and program management layer, so your team builds the product that actually differentiates you.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Cards",
          headline: "Launch a card program in weeks",
          body: "Prepaid, debit, and credit cards, physical, virtual, and tokenized, with scheme access included. No principal membership required.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "card detail surface",
        },
        {
          eyebrow: "Embedded lending",
          headline: "Embed lending into your product",
          body: "Installments, revolving lines, and BNPL, embedded into your flows without a separate lending stack. Configurable underwriting, billing cycles, and disbursement on the same platform.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "credit surface",
        },
        {
          eyebrow: "Cross-border",
          headline: "Go cross-border without new integrations",
          body: "Route international payments across corridors with control over speed and settlement. Activate new corridors without new vendor contracts.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "corridor map",
        },
      ],
      "row",
    ),
  },

  platform: {
    headline: "Built for fast-moving teams.",
    body: "Fintechs need infrastructure that ships in weeks and scales in production. nCore is API-first, modular, and deployable to your regulatory and architectural requirements.",
    items: [
      "1,000+ APIs across cards, payments, lending, and compliance",
      "Sandbox environment for fast development and testing",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "KYC, AML, and sanctions screening inside the authorization path",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, so your engineering team can move from integration to launch without waiting on us.",
    link: { label: "Read the docs", href: "/docs" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue debit, credit, and prepaid cards on infrastructure built to scale with your fintech.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Lending",
        body: "Embed installments, revolving credit, and BNPL into your product on the same platform as your cards.",
        link: { label: "See Lending", href: "/products/lending" },
        iconName: "TrendingUp",
      },
    ],
    "cs",
  ),

  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is fintech payment infrastructure?", answer: "It's the platform a fintech uses to issue cards, run lending, move money, and meet compliance, without building processing, scheme connectivity, or compliance from scratch. NymCard provides this as a modular API-first stack on nCore." },
        { question: "Do we need scheme membership to issue cards?", answer: "No. NymCard is a principal member of Visa and Mastercard. You issue under our scheme membership unless you bring your own." },
        { question: "How fast can a fintech launch on NymCard?", answer: "A core card program typically launches in less than three months, subject to program complexity and market requirements." },
        { question: "Can we add lending or cross-border after launch?", answer: "Yes. You can start with cards and add Lending, Money Movement, Settlement, Financial Crime, or Reconciliation as your product grows, one customer record across all products." },
        { question: "Where is compliance handled?", answer: "Inside the platform. KYC, AML, and sanctions screening run inside the authorization path, not a separate compliance vendor." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to our team.",
    body: "Launch your fintech product on infrastructure built to scale.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
  },
};
