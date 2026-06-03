import { withKeys } from "../../_seed-utils";

// ── healthcare ─────────────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/healthcare.
// Mirrors ../02-copy/Industry Healthcare-Copy.md (Draft v2).
// Includes PayKit callout, healthcare providers ship branded patient/staff
// apps on top of financing and payout infrastructure.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const healthcareDoc = {
  _id: "industryPage-healthcare",
  _type: "industryPage",
  title: "Healthcare",
  slug: { _type: "slug", current: "healthcare" },
  metaTitle: "Payment Infrastructure for Healthcare | NymCard",
  metaDescription:
    "Patient financing, staff disbursements, and healthcare payment programs, compliant, structured, and built on NymCard infrastructure.",

  hero: {
    headline: "Payment infrastructure that keeps up with patient expectations.",
    body: "Patient financing, staff disbursements, procurement cards, and insurance payouts, structured, compliant, and built for healthcare providers managing complex payment flows.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    visualLabel: "healthcare ops surface",
  },

  outcomes: withKeys(
    [
      { iconName: "Shield", label: "Compliance built in", body: "KYC, AML, audit trails, and regulatory reporting are part of the platform, not added after." },
      { iconName: "Zap", label: "One platform, every flow", body: "Patient financing, staff payroll, procurement, and insurance disbursements managed without fragmented systems." },
      { iconName: "TrendingUp", label: "Reduce third-party dependency", body: "Card programs, financing, and disbursements run on your infrastructure, not a mix of external vendors." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Healthcare providers manage complex payment flows, patient financing, staff payroll, vendor payments, and insurance disbursements, often across fragmented systems with limited visibility and compliance bolted on later. Each program adds a new vendor and integration overhead.",
    solution:
      "NymCard gives healthcare providers a single platform for payment programs, financing, disbursement, and spend management, with compliance and KYC built in from the start.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Patient financing",
          headline: "Patient financing",
          body: "Embed installments and deferred payment programs directly into the care journey, with configurable repayment, on the same platform as your cards.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "patient financing surface",
        },
        {
          eyebrow: "Payroll",
          headline: "Staff and payroll disbursement",
          body: "Payout cards for medical staff, contractors, and agency workers, real-time disbursement with spend controls and reconciliation per disbursement.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "staff payout dashboard",
        },
        {
          eyebrow: "Procurement",
          headline: "Procurement and vendor payments",
          body: "Managed spend cards for procurement teams and vendor payments, with policy enforcement, approval controls, and automated reconciliation.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "procurement card detail",
        },
        {
          eyebrow: "Insurance",
          headline: "Insurance and government disbursements",
          body: "Structured payouts for insurance claim settlements and government health programs, with a full audit trail and compliance reporting at every step.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "insurance disbursement surface",
        },
      ],
      "row",
    ),
  },

  payKit: {
    leadIn: "PayKit",
    body: "Ship a branded patient or staff app on top of your financing and payout infrastructure, without building a front end from scratch.",
    link: { label: "Learn more about PayKit", href: "/services/paykit" },
    iconName: "Smartphone",
  },

  platform: {
    headline: "Compliance built in, not added after.",
    body: "Healthcare needs payment infrastructure with compliance inside it, not bolted on. nCore embeds KYC, AML, audit trails, and reporting across every program, deployable inside your environment.",
    items: [
      "KYC, KYB, AML, and sanctions screening across all programs",
      "Audit trails and regulatory reporting built into the platform",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "Principal member of Visa and Mastercard",
      "PCI DSS compliant · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, with audit trails and regulatory reporting built in from day one.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue procurement, payout, and patient-facing cards on infrastructure built for healthcare.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Lending",
        body: "Run patient financing and installments on the same platform as your cards, with configurable repayment.",
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
        { question: "What is healthcare payment infrastructure?", answer: "It's the platform a healthcare provider uses to run patient financing, staff and contractor payouts, procurement spend, and insurance disbursements, all on one platform, with compliance built in. NymCard provides this as a modular stack." },
        { question: "Can patient financing run without a third-party consumer lender?", answer: "Yes. Patient financing runs on the NymCard Lending layer, installments, deferred payments, and configurable repayment, embedded directly into the care journey." },
        { question: "Is the platform deployable inside our environment?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment on the same platform. On-premise runs inside your data center, fully self-hosted." },
        { question: "How is compliance handled?", answer: "Inside the platform. KYC, KYB, AML, and sanctions screening run across all programs, with audit trails and regulatory reporting built in." },
        { question: "Can we ship a branded patient app on this?", answer: "Yes. PayKit delivers a white-labeled mobile and web app built directly on your card, financing, and payout infrastructure, no separate front-end build." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch patient financing, staff disbursements, and procurement programs on one platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
