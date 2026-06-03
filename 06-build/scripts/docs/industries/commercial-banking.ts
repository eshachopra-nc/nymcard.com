import { withKeys } from "../../_seed-utils";

// ── commercial-banking ─────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/commercial-banking.
// Mirrors ../02-copy/Industry Commercial Banking-Copy.md (Draft v2).
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const commercialBankingDoc = {
  _id: "industryPage-commercial-banking",
  _type: "industryPage",
  title: "Commercial Banking",
  slug: { _type: "slug", current: "commercial-banking" },
  metaTitle: "Commercial Banking Payments Infrastructure | NymCard",
  metaDescription:
    "Corporate cards, cross-border payments, expense workflows, and embedded credit for commercial banks. Cloud, on-soil, or on-premise deployment on nCore.",

  hero: {
    headline: "The infrastructure behind modern commercial banking.",
    body: "Cards, cross-border payments, expense workflows, and embedded credit, deployed under your brand, integrated with the core you already run.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    visualLabel: "commercial banking dashboard",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "Retain more revenue", body: "Interchange, FX margin, and credit revenue stay with your bank." },
      { iconName: "Users", label: "Own the relationship", body: "Your brand, your platform, your business clients, protected from fintech competition." },
      { iconName: "Zap", label: "Deploy without disruption", body: "Integrates with the core you already run, no replacement, no long migration." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "SME and corporate clients expect digital-first commercial banking, real-time spend visibility, cross-border payments, expense workflows, and embedded credit. Most bank portals weren't built to deliver this.",
    solution:
      "NymCard gives commercial banks the full payments stack, configurable to your deployment model, integrated with your existing systems, branded to your bank.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Corporate cards",
          headline: "Corporate cards",
          body: "Issue corporate cards, physical, virtual, and tokenized, with real-time spend controls per card, team, and department.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "corporate card detail",
        },
        {
          eyebrow: "Cross-border",
          headline: "Cross-border and supplier payments",
          body: "Move domestic and international supplier payments with FX built in, on a single platform, not stitched across providers.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "supplier payment surface",
        },
        {
          eyebrow: "Embedded credit",
          headline: "Embedded credit",
          body: "Run business credit lines, installments, and working capital financing on the same platform as your cards and payments.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "credit line dashboard",
        },
        {
          eyebrow: "Reporting",
          headline: "Reporting and reconciliation",
          body: "Give business clients real-time spend visibility and your team automated reconciliation across cards, payments, and credit.",
          link: { label: "Learn more about Reconciliation", href: "/products/reconciliation" },
          visualLabel: "reconciliation surface",
        },
      ],
      "row",
    ),
  },

  // No PayKit callout on commercial-banking (buyer is bank IT / product teams,
  // not driver/customer app builders).

  platform: {
    eyebrow: "Platform",
    headline: "Built for banks.",
    body: "Regulated banks need infrastructure that deploys where they need it and integrates with what they already run. nCore is built for it, on your infrastructure, in your data center, aligned to your regulatory obligations.",
    items: [
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "Integrates with existing core banking and payment systems",
      "Principal member of Visa",
      "Principal member of Mastercard",
      "PCI DSS compliant · ISO 27001 certified",
      "1,000+ APIs across cards, payments, lending, and reconciliation",
    ],
  },

  developer: {
    eyebrow: "Developer",
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks — everything your engineering team needs to go from integration to launch.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue corporate cards, physical, virtual, and tokenized, with real-time controls per card, team, and department.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Money Movement",
        body: "Move corporate funds across domestic rails, cross-border corridors, and FX, on the same nCore platform behind your cards.",
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
        { question: "What is commercial banking payment infrastructure?", answer: "It's the platform a bank uses to issue corporate cards, move money domestically and across borders, run expense workflows, and extend credit to business clients, all under the bank's own brand. NymCard provides this as a modular stack that integrates with the bank's existing core." },
        { question: "Does NymCard replace our core banking system?", answer: "No. NymCard sits alongside your existing core and adds the cards, payments, credit, and reconciliation layers on top. No core replacement, no rip-and-replace migration." },
        { question: "Can NymCard be deployed inside our data center?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment on the same platform. On-premise runs inside your own data center, fully self-hosted." },
        { question: "Who owns the customer relationship?", answer: "You do. NymCard is white-label by default, the bank owns the brand, the customer relationship, and the data." },
        { question: "Can we add Lending or Money Movement later?", answer: "Yes. You can start with cards and add Lending, Money Movement, Settlement, Financial Crime, or Reconciliation as your program grows, all on the same platform, with one customer record across products." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch corporate cards, cross-border payments, and embedded credit on infrastructure built for banks.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
