// ── Homepage "Use cases" data ──────────────────────────────────────────────
//
// The seven outcome-led cards rendered by the homepage UseCases section. Lives
// here (not in components/sections/UseCases.tsx) because UseCases is now a
// thin shell over the RailCarousel primitive — the rail is the system, the
// content is page-owned. Same shape as RailCarouselRichItem.
//
// TODO: copy from ../02-copy/Homepage.md §5 — back-fill into the copy file.
// Until then this is a polished draft from the copywriter agent.

import type { RailCarouselRichItem } from "@/components/composition";

export const HOMEPAGE_USE_CASES: RailCarouselRichItem[] = [
  {
    id: "commercial-payments",
    name: "Run a commercial card program",
    description:
      "Issue SME and corporate cards on nCore, delivered with Visa.",
    bullets: [
      "Multi-entity cards, accounts, and spend controls",
      "Limits by merchant category, amount, and time of day",
      "Real-time reconciliation across cards, accounts, and rails",
    ],
    uiLabel: "commercial console",
    href: "/solutions/commercial-payments",
  },
  {
    id: "launch-a-bank",
    name: "Launch a bank",
    description:
      "Run a complete banking stack under your brand on a single programmable platform.",
    bullets: [
      "Accounts, cards, payments, and ledger in one platform",
      "One customer record and audit trail across every product",
      "Open APIs for your own product surfaces",
    ],
    uiLabel: "core banking",
    href: "/solutions/launch-a-bank",
  },
  {
    id: "embedded-finance",
    name: "Embed financial products",
    description:
      "Add cards, payments, and credit to the platform your customers already use.",
    bullets: [
      "Cards, accounts, and payouts via API and SDKs",
      "White-labeled — your brand, your UX, your data",
      "One contract across the financial stack",
    ],
    uiLabel: "API console",
    href: "/solutions/embedded-finance",
  },
  {
    id: "buy-now-pay-later",
    name: "Offer buy now, pay later",
    description:
      "Decision, originate, service, and collect — built into your checkout.",
    bullets: [
      "Real-time decisioning at the point of sale",
      "Servicing, collections, and reporting end to end",
      "Fraud and risk monitoring on every loan",
    ],
    uiLabel: "checkout flow",
    href: "/solutions/buy-now-pay-later",
  },
  {
    id: "disbursements",
    name: "Disburse at scale",
    description:
      "Move funds to suppliers, gig workers, payroll, and claimants across rails.",
    bullets: [
      "One API across cards, accounts, and wallets",
      "Routing, retries, and reconciliation built in",
      "Sanctions and AML screening on every payout",
    ],
    uiLabel: "payouts console",
    href: "/solutions/disbursements",
  },
  {
    id: "remittances",
    name: "Power remittances",
    description:
      "Cross-border send and receive for exchange houses, banks, and corridor-led products.",
    bullets: [
      "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram",
      "FX, settlement, and reconciliation on one platform",
      "AML and sanctions screening built in",
    ],
    uiLabel: "remittance flow",
    href: "/solutions/remittances",
  },
  {
    id: "mobile-wallet",
    name: "Launch a mobile wallet",
    description:
      "Run a consumer or agent wallet on nCore, with cash-in, cash-out, and P2P in one ledger.",
    bullets: [
      "Wallet ledger with cash-in, cash-out, and P2P",
      "Card issuance, bill pay, and remittance inflows",
      "Domestic rails and cross-border on one platform",
    ],
    uiLabel: "wallet app",
    href: "/solutions/mobile-wallet",
  },
];
