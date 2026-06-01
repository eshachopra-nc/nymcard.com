import { withKeys } from "../../_seed-utils";

// ── retail-banking ─────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/retail-banking.
// Mirrors ../02-copy/Industry Retail Banking-Copy.md (Draft v2).
// Includes PayKit callout, retail banks ship branded consumer apps.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const retailBankingDoc = {
  _id: "industryPage-retail-banking",
  _type: "industryPage",
  title: "Retail Banking",
  slug: { _type: "slug", current: "retail-banking" },
  metaTitle:
    "Card, Credit, and Digital Banking Infrastructure for Retail Banks | NymCard",
  metaDescription:
    "Consumer cards, credit, wallets, and digital banking infrastructure for retail banks, built on nCore, integrated with the core you already run.",

  hero: {
    headline: "The digital banking your customers expect.",
    body: "Consumer cards, credit programs, digital wallets, and embedded lending, integrated with the core you already run.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "consumer banking surface",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "New revenue streams", body: "Interchange, credit, and wallet revenue stay with your bank." },
      { iconName: "Users", label: "Deeper customer loyalty", body: "Digital products your customers use daily keep them from looking elsewhere." },
      { iconName: "Zap", label: "Faster to market", body: "Launch new programs without waiting on core upgrade cycles." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Legacy core banking systems were built for accounts and deposits. Cards, credit, wallets, and embedded lending need a separate infrastructure layer that moves faster than core upgrade cycles.",
    solution:
      "NymCard integrates with your existing core and adds the card, credit, and digital product layer on top. No core replacement. No disruption to what already runs.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Debit cards",
          headline: "Issue a full debit card program",
          body: "Account-linked debit cards with real-time spend controls, ATM access, and full lifecycle management, configured for your program without touching your core.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "debit card detail",
        },
        {
          eyebrow: "Credit & BNPL",
          headline: "Launch consumer credit and BNPL",
          body: "Revolving credit, installments, and BNPL, with configurable billing cycles, rewards, and underwriting. Consumer and commercial programs on the same platform.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "credit card detail",
        },
        {
          eyebrow: "Digital wallet",
          headline: "Build a branded digital wallet",
          body: "Wallet accounts with domestic and cross-border payment capability, deployable under your brand.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "wallet surface",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded consumer banking app on top of your card, credit, and wallet infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built for banks.",
    body: "Regulated banks need infrastructure that integrates with what they already run and deploys where they need it. nCore is built for it, on your infrastructure, in your data center, aligned to your regulatory obligations.",
    items: [
      "Integrates with your existing core banking architecture, no replacement required",
      "1,000+ APIs to connect to your current systems",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "Principal member of Visa",
      "Principal member of Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks — everything your engineering team needs to go from integration to launch.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue consumer debit, credit, and prepaid cards on infrastructure built to scale with your retail bank.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Lending",
        body: "Run revolving credit, installments, and BNPL on the same platform as your cards, with configurable billing cycles and underwriting.",
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
        { question: "What is retail banking card and digital infrastructure?", answer: "It's the platform a retail bank uses to issue consumer cards, run credit and BNPL programs, build digital wallets, and ship a branded banking app, all integrated with the bank's existing core. NymCard provides this as a modular stack." },
        { question: "Does NymCard replace our core banking system?", answer: "No. NymCard sits alongside your existing core and adds the cards, credit, wallet, and lending layers on top. No core replacement." },
        { question: "Can we launch BNPL on the same platform as our debit and credit cards?", answer: "Yes. BNPL, installments, and revolving credit run on the Lending layer alongside your card programs, one customer record across both." },
        { question: "Who owns the brand and customer relationship?", answer: "You do. NymCard is white-label by default, the bank owns the brand, the customer, and the data." },
        { question: "Can NymCard be deployed inside our data center?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment on the same platform." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch consumer cards, credit, and digital wallets on infrastructure built for retail banks.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
