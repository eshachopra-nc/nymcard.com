import { withKeys } from "../../_seed-utils";

// ── telecommunications ─────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/telecommunications.
// Mirrors ../02-copy/Industry Telecommunications-Copy.md (Draft v2).
// Includes PayKit callout, telcos ship branded financial apps to subscribers.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const telecommunicationsDoc = {
  _id: "industryPage-telecommunications",
  _type: "industryPage",
  title: "Telecommunications",
  slug: { _type: "slug", current: "telecommunications" },
  metaTitle: "Embedded Finance Infrastructure for Telecoms | NymCard",
  metaDescription:
    "Cards, wallets, device financing, and embedded lending for telecoms. Launch financial products under your brand on NymCard infrastructure.",

  hero: {
    headline: "Turn your subscribers into financial services customers.",
    body: "Cards, wallets, device financing, and embedded lending, launched under your brand, integrated with the billing and CRM systems you already run.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "telco financial app",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "New revenue beyond connectivity", body: "Add interchange, credit, and wallet revenue to your existing subscriber base." },
      { iconName: "Users", label: "Deepen subscriber loyalty", body: "Financial products subscribers use daily make switching to a competitor harder." },
      { iconName: "Zap", label: "Launch without a separate build", body: "NymCard connects to your billing and CRM, no full rebuild required." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Connectivity revenue is under pressure from low-cost competitors and shrinking margins. Telcos with large, loyal subscriber bases have the distribution network for financial services, but building payment infrastructure independently is costly and complex.",
    solution:
      "NymCard gives you the card, wallet, lending, and payment infrastructure that sits alongside your billing and CRM, so you launch financial products under your own brand without starting from scratch.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Branded cards",
          headline: "Branded prepaid and co-branded cards",
          body: "Issue prepaid or co-branded cards linked to your subscriber base, physical and virtual, with rewards, loyalty, and spend controls configured to your program.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "co-branded card",
        },
        {
          eyebrow: "Wallets",
          headline: "Digital wallets",
          body: "Wallet accounts with domestic and cross-border payment capability, for subscribers without a bank account.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "wallet surface",
        },
        {
          eyebrow: "Device financing",
          headline: "Device financing",
          body: "Embed installments directly into device purchase and upgrade flows, with credit decisioning, billing cycles, and repayment on one platform.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "device upgrade flow",
        },
        {
          eyebrow: "Consumer lending",
          headline: "Consumer lending",
          body: "Installments and revolving lines for your subscriber base, launched in your existing digital channels without a separate lending stack.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "lending surface",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded financial app to your subscribers on top of your card and wallet infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built to connect to what you already run.",
    body: "Telcos run on billing, CRM, and operational systems that can't be replaced. nCore connects to them, API-first, modular, and deployable to your requirements.",
    items: [
      "API-first architecture, connects to billing, CRM, and existing telco systems",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "KYC and AML inside the authorization path",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, so your engineering team connects NymCard to your billing and CRM without a full rebuild.",
    link: { label: "Read the docs", href: "/docs" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue branded prepaid and co-branded cards linked to your subscriber base, physical, virtual, and tokenized.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Lending",
        body: "Embed device financing and consumer installments on the same platform as your cards.",
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
        { question: "What is telecom embedded finance infrastructure?", answer: "It's the platform a telco uses to issue cards, run wallets, finance devices, and extend credit to subscribers, all under the telco's own brand. NymCard provides this as a modular API-first stack that integrates with the telco's billing and CRM." },
        { question: "Do we need to replace our billing or CRM system?", answer: "No. NymCard connects to your existing billing and CRM through APIs, no replacement." },
        { question: "Can subscribers without a bank account use the wallet?", answer: "Yes. Wallets are issued directly on NymCard, no bank account required for the end user." },
        { question: "Can we ship a branded mobile app on top of this?", answer: "Yes. PayKit delivers a white-labeled mobile and web app built directly on your card and wallet infrastructure, no separate front-end build." },
        { question: "Can we start with prepaid cards and add lending later?", answer: "Yes. You can start with the Cards layer and add Lending, Money Movement, Settlement, or Financial Crime as your program grows." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to our team.",
    body: "Launch cards, wallets, and device financing for your subscribers on one platform.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
  },
};
