import { withKeys } from "../../_seed-utils";

// ── government ─────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/government.
// Mirrors ../02-copy/Industry Government-Copy.md (Draft v2).
// Includes PayKit callout, government agencies ship branded citizen apps
// on top of disbursement and payroll infrastructure.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const governmentDoc = {
  _id: "industryPage-government",
  _type: "industryPage",
  title: "Government",
  slug: { _type: "slug", current: "government" },
  metaTitle: "Government Payment and Disbursement Infrastructure | NymCard",
  metaDescription:
    "Disbursement cards, payroll programs, and cross-border payment infrastructure for government agencies, compliant, auditable, and built on NymCard.",

  hero: {
    headline: "Disbursement infrastructure built for public accountability.",
    body: "Disbursement cards, payroll programs, SME support schemes, and cross-border payment infrastructure, with compliance, spend controls, and full audit trails built in.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "disbursement console",
  },

  outcomes: withKeys(
    [
      { iconName: "Shield", label: "Full auditability", body: "Every transaction tracked from issuance, spend controls, category restrictions, and real-time reporting built in." },
      { iconName: "Layers", label: "One platform, many programs", body: "Disbursement, payroll, SME support, and inclusion schemes managed without separate systems per program." },
      { iconName: "Globe", label: "Sovereign deployment", body: "On-premise and on-soil deployment for agencies with data residency and regulatory requirements." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Government disbursement and payment programs need structured controls, full audit trails, and regulatory compliance on every transaction. Legacy systems and manual processes create visibility gaps and limit spend control once funds are disbursed.",
    solution:
      "NymCard gives government agencies disbursement and payment infrastructure with spend controls, compliance, and real-time reporting built in from the start.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Disbursement",
          headline: "Disbursement cards",
          body: "Branded prepaid cards for aid, subsidy, and social program distribution, with spend controls, category restrictions, and real-time visibility from issuance to spend.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "disbursement card detail",
        },
        {
          eyebrow: "Payroll",
          headline: "Payroll cards",
          body: "Payroll disbursement for government employees, contractors, and public sector workers, with reconciliation and audit trail per disbursement.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "payroll dashboard",
        },
        {
          eyebrow: "SME",
          headline: "SME and business support programs",
          body: "Structured credit and disbursement for government-backed SME initiatives, with fund flow visibility and policy enforcement built in.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "SME program surface",
        },
        {
          eyebrow: "Inclusion",
          headline: "Youth and inclusion cards",
          body: "Prepaid cards for financial inclusion, student stipends, and youth programs, no bank account required, with spend controls configured per program.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "youth inclusion card",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded citizen app on top of your disbursement and payroll infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Built for sovereign deployment.",
    body: "Government agencies need infrastructure that meets data residency and regulatory obligations. nCore deploys cloud, on-soil, or on-premise, with audit, role-based access, and compliance built in.",
    items: [
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "Audit trails, role-based access, and regulatory reporting built in",
      "KYC, AML, and sanctions screening across all programs",
      "Multi-entity and multi-program configuration",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, with audit trails, role-based access, and regulatory reporting built in from day one.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue disbursement, payroll, and inclusion cards on infrastructure built for public accountability.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Money Movement",
        body: "Disburse to citizens, employees, and contractors in real time, on the same nCore platform behind your cards.",
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
        { question: "What is government payment and disbursement infrastructure?", answer: "It's the platform a government agency uses to issue disbursement and payroll cards, run SME and inclusion programs, and pay citizens, employees, and contractors, with audit, compliance, and spend controls built in. NymCard provides this as a modular stack." },
        { question: "Can NymCard be deployed inside our data center?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment on the same platform. On-premise runs inside your own data center, fully self-hosted." },
        { question: "Can disbursement cards be restricted to specific spend categories?", answer: "Yes. Cards are configurable per program, with category restrictions, spend limits, and merchant controls applied in real time at authorization." },
        { question: "Is every transaction auditable?", answer: "Yes. Audit trails, role-based access, and regulatory reporting are built into the platform across every program." },
        { question: "Can citizens without a bank account receive disbursements?", answer: "Yes. Disbursements can be made to NymCard-issued prepaid cards, no bank account required for the recipient." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch disbursement, payroll, and inclusion programs on infrastructure built for accountability.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
