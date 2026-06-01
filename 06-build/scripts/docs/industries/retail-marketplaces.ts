import { withKeys } from "../../_seed-utils";

// ── retail-marketplaces ────────────────────────────────────────────────────
// Sanity-shaped industry document for /industries/retail-marketplaces.
// Mirrors ../02-copy/Industry Retail & Marketplaces-Copy.md (Draft v2).
// No PayKit callout, marketplaces typically own their commerce front end.
//
// Shape contract (must match the productPage seed pattern):
//   _id, _type, title, slug, metaTitle, metaDescription
//   hero, outcomes (3 chips), challenge, build, payKit?, platform, developer,
//   crossSell (2), faq, finalCta
//
// Icons live as strings (`iconName`), resolved to JSX in the renderer via
// lib/sanity/icon-map.tsx. Every array field is wrapped in `withKeys` so the
// Studio doesn't surface "Missing keys" warnings.

export const retailMarketplacesDoc = {
  _id: "industryPage-retail-marketplaces",
  _type: "industryPage",
  title: "Retail & Marketplaces",
  slug: { _type: "slug", current: "retail-marketplaces" },
  metaTitle:
    "Payment and Credit Infrastructure for Retail & Marketplaces | NymCard",
  metaDescription:
    "Gift cards, BNPL, co-branded cards, and seller payouts for retail and marketplace platforms, built on NymCard. Own the commerce payment experience end-to-end.",

  hero: {
    headline: "Embed payments and credit into the commerce experience.",
    body: "Gift cards, BNPL, co-branded cards, and seller payouts, built for retail and marketplace platforms that own the full payment experience.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    visualLabel: "commerce checkout surface",
  },

  outcomes: withKeys(
    [
      { iconName: "TrendingUp", label: "Revenue at every touchpoint", body: "Interchange, credit, and FX margin stay with your platform, not a third-party provider's." },
      { iconName: "ShoppingBag", label: "Own the checkout experience", body: "Cards, BNPL, and wallets embedded directly, no dependency on external providers at checkout." },
      { iconName: "Users", label: "Keep customers in your ecosystem", body: "Branded financial products build loyalty and reduce the incentive to shop elsewhere." },
    ],
    "out",
  ),

  challenge: {
    challenge:
      "Retail and marketplace platforms depend on third-party providers at every point in the commerce journey, checkout, payout, rewards, and credit. Each provider adds cost, integration overhead, and a layer of dependency between you and your customer.",
    solution:
      "NymCard brings card issuing, BNPL, seller payouts, and co-branded programs onto one platform, so retailers and marketplaces control the payment experience end-to-end.",
  },

  build: {
    eyebrow: "What you can build",
    rows: withKeys(
      [
        {
          eyebrow: "Co-branded cards",
          headline: "Co-branded and loyalty cards",
          body: "Issue co-branded debit or credit cards linked to your loyalty or rewards program, with interchange revenue and customer spend data retained by your platform.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "co-branded card surface",
        },
        {
          eyebrow: "BNPL",
          headline: "BNPL and installments",
          body: "Embed point-of-sale financing directly into checkout, with configurable installments and no third-party BNPL provider in the flow.",
          link: { label: "Learn more about Lending", href: "/products/lending" },
          visualLabel: "checkout surface",
        },
        {
          eyebrow: "Gift cards",
          headline: "Gift and prepaid cards",
          body: "Branded gift card programs, physical and virtual, with closed-loop and open-loop options on one platform.",
          link: { label: "Learn more about Card Issuing", href: "/products/card-issuing" },
          visualLabel: "gift card surface",
        },
        {
          eyebrow: "Seller payouts",
          headline: "Seller and vendor payouts",
          body: "Payout cards and accounts for marketplace sellers, gig workers, and vendor networks, with real-time disbursement, spend controls, and visibility per recipient.",
          link: { label: "Learn more about Money Movement", href: "/products/money-movement" },
          visualLabel: "seller payout dashboard",
        },
      ],
      "row",
    ),
  },

  platform: {
    headline: "Built to integrate with your commerce stack.",
    body: "Retail and marketplace platforms run on ecommerce, ERP, and marketplace systems that can't be replaced. nCore connects to them, API-first, modular, and deployable to your requirements.",
    items: [
      "API-first, connects to existing ecommerce, ERP, and marketplace systems",
      "Cloud, on-soil, and on-premise deployment on the same platform",
      "KYC and AML inside cardholder and seller onboarding",
      "Principal member of Visa and Mastercard",
      "PCI DSS Level 1 certified · ISO 27001 certified",
    ],
  },

  developer: {
    headline: "Built for your team to integrate.",
    body: "Full API access, SDKs, sandbox, and webhooks, connects to your existing ecommerce, ERP, and marketplace systems without rebuilding around them.",
    link: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },

  crossSell: withKeys(
    [
      {
        leadIn: "Card Issuing",
        body: "Issue co-branded, gift, and payout cards on infrastructure built to scale with your commerce platform.",
        link: { label: "See Card Issuing", href: "/products/card-issuing" },
        iconName: "CreditCard",
      },
      {
        leadIn: "Lending",
        body: "Embed BNPL and installments directly into checkout on the same platform as your cards.",
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
        { question: "What is retail and marketplace payment infrastructure?", answer: "It's the platform a retailer or marketplace uses to issue co-branded cards, run BNPL and gift card programs, and pay sellers and vendors, all on one platform, under the partner's brand. NymCard provides this as a modular stack." },
        { question: "Can we run BNPL at checkout without a third-party BNPL provider?", answer: "Yes. BNPL and installments run on the NymCard Lending layer, embedded directly into your checkout, no third-party BNPL in the flow." },
        { question: "Do sellers and vendors need a bank account to receive payouts?", answer: "No. Payouts can be made to NymCard-issued accounts or payout cards, no bank account required for the recipient." },
        { question: "Who owns the customer relationship and spend data?", answer: "You do. NymCard is white-label by default, the partner owns the brand, the customer relationship, and the spend data." },
        { question: "Can we start with one program and add others later?", answer: "Yes. You can start with one Cards or Lending program and add others as the platform grows, one customer record across all products." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard." },
      ],
      "faq",
    ),
  },

  finalCta: {
    headline: "Talk to us.",
    body: "Launch co-branded cards, BNPL, gift cards, and seller payouts on one platform.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
};
