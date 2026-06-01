import {
  ArrowLeftRight,
  Blocks,
  Building2,
  Landmark,
  RadioTower,
  Smartphone,
  Store,
} from "lucide-react";
import type { RailCarouselRichItem } from "@/components/composition";

// ── Homepage "Industries" rail data ─────────────────────────────────────────
//
// Industry cards for the homepage rail (rendered by components/sections/UseCases).
// Per the owner's direction: NO product-UI illustration — text-forward. Each
// card anchors on an infrastructural industry icon (RailCarousel's industries
// mode), then carries:
//   • name        = the industry name
//   • description = the outcome line (the former card headline)
//   • bullets     = three supporting lines
//   • icon        = an infrastructural lucide mark (cool, navy/cyan-tinted tile)
//   • href        = that industry's page (/industries/*), which exists
//
// (The data file keeps its historical name; the content is industries now.)

const ICON_CLS = "size-5";

export const HOMEPAGE_USE_CASES: RailCarouselRichItem[] = [
  {
    id: "commercial-banking",
    name: "Commercial Banking",
    description: "Run a commercial card program",
    icon: <Landmark className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Multi-entity cards and accounts with spend controls, issued with Visa",
      "Limits by merchant category, amount, and time of day",
      "Real-time reconciliation across cards, accounts, and rails",
    ],
    href: "/industries/commercial-banking",
  },
  {
    id: "neobanks",
    name: "Neobanks",
    description: "Launch a bank",
    icon: <Smartphone className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Accounts, cards, payments, and ledger in one programmable platform",
      "One customer record and audit trail across every product",
      "Open APIs to build your own product surfaces, under your brand",
    ],
    href: "/industries/neobanks",
  },
  {
    id: "fintechs",
    name: "Fintechs",
    description: "Embed financial products",
    icon: <Blocks className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Cards, payments, and credit via API and SDKs",
      "White-labeled — your brand, your UX, your data",
      "One contract across the financial stack",
    ],
    href: "/industries/fintechs",
  },
  {
    id: "retail-marketplaces",
    name: "Retail & Marketplaces",
    description: "Offer buy now, pay later",
    icon: <Store className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Real-time decisioning at the point of sale",
      "Servicing, collections, and reporting end to end",
      "Fraud and risk monitoring on every loan",
    ],
    href: "/industries/retail-marketplaces",
  },
  {
    id: "government",
    name: "Government",
    description: "Disburse at scale",
    icon: <Building2 className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "One API to move funds across cards, accounts, and wallets",
      "Routing, retries, and reconciliation built in",
      "Sanctions and AML screening on every payout",
    ],
    href: "/industries/government",
  },
  {
    id: "exchange-houses",
    name: "Exchange Houses",
    description: "Power remittances",
    icon: <ArrowLeftRight className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram",
      "FX, settlement, and reconciliation on one platform",
      "AML and sanctions screening built in",
    ],
    href: "/industries/exchange-houses",
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Launch a mobile wallet",
    icon: <RadioTower className={ICON_CLS} strokeWidth={1.75} />,
    bullets: [
      "Wallet ledger with cash-in, cash-out, and P2P",
      "Card issuance, bill pay, and remittance inflows",
      "Domestic rails and cross-border on one platform",
    ],
    href: "/industries/telecommunications",
  },
];
