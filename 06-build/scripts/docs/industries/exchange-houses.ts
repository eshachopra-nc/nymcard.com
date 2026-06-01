import { withKeys } from "../../_seed-utils";

// ── exchange-houses ────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/exchange-houses.
// Mirrors ../02-copy/Industry Exchange Houses-Copy.md (Draft v2).
// No PayKit callout, exchange houses don't typically ship branded consumer
// apps as the primary motion.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const exchangeHousesDoc = {
  _id: "industryPage-exchange-houses",
  _type: "industryPage",
  title: "Exchange Houses",
  slug: { _type: "slug", current: "exchange-houses" },
  metaTitle: "Payment Infrastructure for Exchange Houses | NymCard",
  metaDescription:
    "Cards, wallets, cross-border payments, FX, and stablecoin settlement for exchange houses. Expand beyond remittance on one platform.",

  hero: {
    headline: "Expand beyond remittance.",
    body: "Cards, wallets, cross-border payments, FX, and stablecoin settlement, built for exchange houses growing into broader financial services.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "corridor map + FX",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "New revenue beyond remittance", body: "Cards, wallets, and credit revenue added to your existing FX flows." },
      { iconName: "Users", label: "Retain your SME clients", body: "Give business clients the payment tools they're currently getting elsewhere." },
      { iconName: "Globe", label: "Capture more corridor revenue", body: "FX margin and settlement fees stay with your platform." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Remittance margins are under pressure from digital-first competitors on faster, lower-cost rails. Exchange houses that grow are the ones turning FX and payment relationships into broader financial offerings, for retail customers and SME clients alike.",
    solution:
      "NymCard gives you the infrastructure to expand your product range without building from scratch, cards, wallets, cross-border payments, and stablecoin settlement on one platform.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Multi-currency cards",
          headline: "Launch a multi-currency card program",
          body: "Issue branded prepaid or debit cards linked to FX and remittance flows, physical and virtual, no bank account required.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "multi-currency card",
        },
        {
          eyebrow: "SME payments",
          headline: "Move into SME business payments",
          body: "Expand into SME supplier payments and B2B cross-border flows, capture corridor revenue your clients send elsewhere today.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "B2B payment surface",
        },
        {
          eyebrow: "Stablecoin",
          headline: "Settle faster with stablecoin infrastructure",
          body: "Cut capital locked across correspondent networks. Near real-time corridor settlement, 24/7, without banking window constraints.",
          link: { label: "Learn more about Settlement", href: "/products/settlement" },
          visualLabel: "stablecoin settlement",
        },
      ],
      "row",
    ),
  },

  platform: {
    headline: "Built for cross-border flows.",
    body: "Exchange houses need infrastructure that moves money across corridors with FX and settlement on one platform. nCore is built for it, with pre-integrated rails and deployment that fits your regulatory obligations.",
    items: [
      "Pre-integrated with Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "Real-time and stablecoin settlement on the same platform",
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
        leadIn: "Money Movement",
        body: "Move money across domestic rails, cross-border corridors, and FX, on the platform built for corridor flows.",
        link: { label: "See Money Movement", href: "/products/money-movement" },
        iconName: "ArrowLeftRight",
      },
      {
        leadIn: "Settlement",
        body: "Settle in real time across fiat and stablecoin rails, 24/7, without banking window constraints.",
        link: { label: "See Settlement", href: "/products/settlement" },
        iconName: "Layers",
      },
    ],
    "cs",
  ),

  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is exchange house payment infrastructure?", answer: "It's the platform an exchange house uses to issue multi-currency cards, run cross-border payments, manage FX, and settle across fiat and stablecoin rails, all under its own brand. NymCard provides this as a modular stack." },
        { question: "Do we need a bank account to issue cards on NymCard?", answer: "No. Cards are issued directly on the NymCard platform, exchange houses can offer prepaid and multi-currency cards to customers without a bank account requirement on the end user." },
        { question: "Can we offer stablecoin settlement without becoming a crypto exchange?", answer: "Yes. Stablecoin settlement on NymCard is a settlement capability, not trading. You settle corridor flows in USDC or USDT without operating an exchange." },
        { question: "Which corridors and networks are pre-integrated?", answer: "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram are built in. Local and regional scheme connectivity is added by deployment." },
        { question: "Can we run remittance and SME business payments on the same platform?", answer: "Yes. Cards, wallets, cross-border payments, and settlement run on one platform, one customer record across consumer remittance and SME flows." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch cards, wallets, cross-border payments, and stablecoin settlement on one platform.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
