import { withKeys } from "../../_seed-utils";

// ── mobility ───────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/mobility.
// Mirrors ../02-copy/Industry Mobility-Copy.md (Draft v2).
// Includes PayKit callout, mobility platforms ship branded driver and
// customer apps on top of payout and payment infrastructure.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const mobilityDoc = {
  _id: "industryPage-mobility",
  _type: "industryPage",
  title: "Mobility",
  slug: { _type: "slug", current: "mobility" },
  metaTitle: "Payment Infrastructure for Mobility Platforms | NymCard",
  metaDescription:
    "Driver payouts, fleet cards, auto financing, and embedded payment programs for mobility companies, built on NymCard infrastructure.",

  hero: {
    headline: "Pay drivers, manage fleets, and finance vehicles on one platform.",
    body: "Driver payouts, fleet cards, auto financing, and customer payment programs, built for mobility platforms managing distributed networks at scale.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "mobility ops surface",
  },

  outcomes: withKeys(
    [
      { iconName: "Zap", label: "Real-time payouts", body: "Instant disbursement to drivers and contractors, no manual payroll or reconciliation lag." },
      { iconName: "Layers", label: "Every program on one platform", body: "Driver payouts, fleet spend, financing, and customer wallets without separate vendors for each." },
      { iconName: "TrendingUp", label: "Revenue from your own network", body: "Interchange and financing revenue stay with your platform, not a third-party provider." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Mobility platforms manage high-volume, distributed payment flows across drivers, dealers, and customers. Fragmented payout systems, manual reconciliation, and limited spend control slow down the speed your network operates at.",
    solution:
      "NymCard gives you the disbursement, fleet spend, and financing infrastructure mobility platforms need, on one platform, with real-time controls and reconciliation built in.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Driver payouts",
          headline: "Driver and contractor payouts",
          body: "Real-time payout cards for drivers, couriers, and contractor networks, instant disbursement with spend controls, no batch delays.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "driver payout dashboard",
        },
        {
          eyebrow: "Fleet",
          headline: "Fleet and expense cards",
          body: "Managed spend cards for fleet operators, fuel, maintenance, and operational expenses, with controls per vehicle, driver, and expense category.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "fleet card detail",
        },
        {
          eyebrow: "Auto financing",
          headline: "Auto and vehicle financing",
          body: "Installments and lease structures for vehicle acquisition programs, dealer-linked credit with configurable repayment, on the same platform as your cards.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "auto financing surface",
        },
        {
          eyebrow: "Customer programs",
          headline: "Customer payment programs",
          body: "Prepaid wallet accounts and branded cards for customer payments and rewards.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "customer wallet",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded driver or customer app on top of your payout and payment infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built for high-volume distributed operations.",
    body: "Mobility platforms move money across drivers, fleets, and customers in real time. nCore is built for it, connecting to your fleet management and CRM, with deployment that fits your obligations.",
    items: [
      "API-first, connects to fleet management, CRM, and operational systems",
      "Real-time disbursement and spend visibility across distributed networks",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "KYC and AML inside driver and partner onboarding",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, connects to your fleet management, CRM, and operational systems without rebuilding around them.",
    link: { label: "Read the docs", href: "/docs" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue fleet, expense, and customer cards on infrastructure built to scale across distributed networks.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Money Movement",
        body: "Pay drivers and contractors in real time, on the same nCore platform behind your cards.",
        link: { label: "See Money Movement", href: "/products/money-movement" },
        iconName: "ArrowLeftRight",
      },
    ],
    "cs",
  ),

  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is mobility payment infrastructure?", answer: "It's the platform a mobility company uses to pay drivers in real time, run fleet expense cards, finance vehicles, and offer customer payment programs, all on one platform. NymCard provides this as a modular stack." },
        { question: "How fast are driver payouts?", answer: "Real-time. Drivers and contractors receive disbursement to their payout card the moment a payout is triggered, no batch delays." },
        { question: "Can fleet operators set spend controls per vehicle or driver?", answer: "Yes. Controls are configurable per card, per vehicle, per driver, and per merchant category, applied in real time at authorization." },
        { question: "Can we ship a branded driver or customer app on this?", answer: "Yes. PayKit delivers a white-labeled mobile and web app built directly on your payout and payment infrastructure, no separate front-end build." },
        { question: "Can we run financing for vehicle acquisition on the same platform?", answer: "Yes. Auto financing runs on the Lending layer alongside your payout and fleet card programs, one customer record across products." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to our team.",
    body: "Pay drivers, run fleets, and finance vehicles on one platform.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
  },
};
