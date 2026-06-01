import { withKeys } from "../../_seed-utils";

// ── travel ─────────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/travel.
// Mirrors ../02-copy/Industry Travel-Copy.md (Draft v2).
// Includes PayKit callout, travel platforms ship branded traveler apps.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const travelDoc = {
  _id: "industryPage-travel",
  _type: "industryPage",
  title: "Travel",
  slug: { _type: "slug", current: "travel" },
  metaTitle: "Payment Infrastructure for Travel Companies | NymCard",
  metaDescription:
    "Multi-currency cards, travel wallets, FX programs, and disbursement infrastructure for travel companies and loyalty platforms, built on NymCard.",

  hero: {
    headline: "Payments that disappear into the travel experience.",
    body: "Multi-currency cards, travel wallets, corporate expense programs, and agent disbursements, on one platform, under your brand.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    visualLabel: "travel app surface",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "Capture FX revenue", body: "FX margin and corridor settlement fees stay with your platform, no third-party FX provider." },
      { iconName: "Users", label: "One platform, every segment", body: "Consumer, corporate, and agent payment programs managed without separate vendors for each." },
      { iconName: "Globe", label: "Built for cross-border operations", body: "Multi-currency support and international corridor access built in from day one." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Travel businesses operate across currencies, corridors, and customer segments that most payment platforms weren't designed to handle. Multi-currency cards, agent disbursements, and cross-border settlement typically need separate providers, adding cost, integration overhead, and reconciliation complexity.",
    solution:
      "NymCard brings multi-currency card issuing, FX, wallets, and payouts onto one platform, so travel companies manage the full payment lifecycle without managing multiple vendors.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Multi-currency cards",
          headline: "Multi-currency travel cards",
          body: "Issue branded multi-currency cards for consumer and corporate travel segments, physical and virtual, with cross-currency spend on one card.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "multi-currency card",
        },
        {
          eyebrow: "Corporate travel",
          headline: "Corporate and expense cards",
          body: "Managed spend for corporate travel programs, controls per card, team, and route, with real-time visibility and automated reconciliation.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "corporate travel card",
        },
        {
          eyebrow: "Travel wallets",
          headline: "Travel wallets",
          body: "Wallet accounts with multi-currency support and cross-border payment capability, for travelers without a bank account.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "travel wallet",
        },
        {
          eyebrow: "Agent payouts",
          headline: "Agent and staff disbursements",
          body: "Payout cards for travel agents, ground staff, and contractor networks, with real-time spend controls and visibility per disbursement.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "agent payout dashboard",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded traveler or corporate finance app on top of your card and wallet infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built for multi-currency and cross-border flows.",
    body: "Travel businesses need infrastructure that moves money across currencies and corridors without stitching providers together. nCore is built for it, with pre-integrated rails and deployment that fits your obligations.",
    items: [
      "Pre-integrated with Visa Direct and Mastercard Cross-Border",
      "Multi-currency cards and wallets on one platform",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "KYC and AML inside cardholder onboarding",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, pre-integrated with Visa, Mastercard, and international corridors so your team can move fast.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Money Movement",
        body: "Move money across corridors with FX built in, on the platform behind your travel cards and wallets.",
        link: { label: "See Money Movement", href: "/products/money-movement" },
        iconName: "ArrowLeftRight",
      },
      {
        leadIn: "Card Issuing",
        body: "Issue multi-currency consumer, corporate, and disbursement cards on infrastructure built for travel.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
    ],
    "cs",
  ),

  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is travel payment infrastructure?", answer: "It's the platform a travel business uses to issue multi-currency cards, run travel wallets, manage corporate expense programs, and disburse to agents, all on one platform. NymCard provides this as a modular stack." },
        { question: "Can one card support spend in multiple currencies?", answer: "Yes. Multi-currency cards on NymCard let cardholders spend across currencies on a single card, with FX margin retained by your platform." },
        { question: "Do travelers need a bank account to use the wallet?", answer: "No. Wallets are issued directly on NymCard, no bank account required for the end user." },
        { question: "Can we ship a branded traveler app on this?", answer: "Yes. PayKit delivers a white-labeled mobile and web app built directly on your card and wallet infrastructure, no separate front-end build." },
        { question: "Can we run consumer, corporate, and agent programs on the same platform?", answer: "Yes. Consumer travel cards, corporate expense cards, travel wallets, and agent disbursements run on one platform, one customer record across segments." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch multi-currency cards, wallets, and disbursements for travel on one platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
