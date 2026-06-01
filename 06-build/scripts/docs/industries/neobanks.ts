import { withKeys } from "../../_seed-utils";

// ── neobanks ───────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/neobanks.
// Mirrors ../02-copy/Industry Neobanks-Copy.md (Draft v2).
// Includes PayKit callout, neobanks ship branded consumer apps.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const neobanksDoc = {
  _id: "industryPage-neobanks",
  _type: "industryPage",
  title: "Neobanks",
  slug: { _type: "slug", current: "neobanks" },
  metaTitle: "Neobank Infrastructure | NymCard",
  metaDescription:
    "Cards, accounts, payments, lending, and compliance for neobanks, modular, API-first, built on nCore.",

  hero: {
    headline: "Launch your neobank on infrastructure that's already built.",
    body: "Cards, accounts, payments, lending, and compliance, modular, API-first, ready to configure for your market.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "neobank app surface",
  },

  outcomes: withKeys(
    [
      { iconName: "Zap", label: "Ship in weeks", body: "Full card and payment stack ready to integrate, no infrastructure build required." },
      { iconName: "TrendingUp", label: "Revenue from day one", body: "Interchange, FX, and credit revenue from the moment you go live." },
      { iconName: "Layers", label: "Add capabilities as you grow", body: "Start with cards. Add lending, wallets, and cross-border when you're ready." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Neobanks need the full financial product stack from day one, cards, accounts, payments, lending, and compliance. Building it independently takes years and pulls engineering away from the product experience that actually differentiates you.",
    solution:
      "nCore provides the processing, compliance, and program management layer, so your team focuses on the customer experience, not the infrastructure underneath.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Cards",
          headline: "Launch a full card program",
          body: "Debit, prepaid, and credit cards, physical, virtual, and tokenized, with full lifecycle management and scheme processing built in.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "card detail surface",
        },
        {
          eyebrow: "BNPL & lending",
          headline: "Add BNPL and embedded lending",
          body: "Installments, revolving lines, and BNPL, embedded directly into your card and payment flows. Configurable underwriting, billing cycles, and disbursement on the same platform.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "credit card surface",
        },
        {
          eyebrow: "Multi-currency",
          headline: "Go multi-currency from the start",
          body: "Multi-currency accounts and wallets with domestic and cross-border payment capability, with FX pricing and margin retained by you, not an intermediary.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "wallet surface",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded consumer banking app on top of your card, account, and lending infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built for fast-moving teams.",
    body: "Neobanks need infrastructure that ships in weeks and scales in production. nCore is API-first, modular, and deployable to your regulatory and architectural requirements.",
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
    body: "Full API access, SDKs, sandbox, and webhooks — everything your engineering team needs to go from integration to launch.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue debit, credit, and prepaid cards on infrastructure built to scale with your neobank.",
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
        { question: "What is neobank infrastructure?", answer: "It's the platform a neobank uses to issue cards, run accounts, move money, extend credit, and meet compliance, all behind its own brand. NymCard provides this as a modular API-first stack on nCore." },
        { question: "How fast can a neobank launch on NymCard?", answer: "A core card program typically launches in less than three months, subject to market and program complexity. Larger programs with credit, lending, or multi-currency take longer." },
        { question: "Do we need our own scheme membership?", answer: "No. nCore is already integrated with Visa and Mastercard, so its built-in scheme connectivity lets you launch fast — or you can bring your own scheme setup if you prefer." },
        { question: "Can we start with cards and add lending later?", answer: "Yes. You can start with the Cards layer and add Lending, Money Movement, Settlement, Financial Crime, or Reconciliation as your product grows, one customer record across all products." },
        { question: "Where is compliance handled?", answer: "Inside the platform. KYC, AML, and sanctions screening run inside the authorization path, not a separate compliance vendor." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch your neobank on infrastructure built to scale.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
