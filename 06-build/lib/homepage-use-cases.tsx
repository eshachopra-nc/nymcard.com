import {
  ArrowLeftRight,
  Blocks,
  Building2,
  HeartPulse,
  Landmark,
  RadioTower,
  Store,
  Wallet,
} from "lucide-react";
import type { RailCarouselRichItem } from "@/components/composition";

// ── Homepage "Industries" rail data ─────────────────────────────────────────
//
// Industry cards for the homepage rail (rendered by components/sections/UseCases).
// Per the owner's direction (3 June): icon + name + ONE outcome line, no bullets.
// Each card carries:
//   • name        = the industry name
//   • description = the single outcome line
//   • icon        = an infrastructural lucide mark (cool, navy/cyan-tinted tile)
//   • href        = that industry's /solutions/* page (all ten exist)
//
// Order is owner-locked (3 June): Retail Banking first, Mobility last.
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §8.
// (The data file keeps its historical name; the content is industries now.)

const ICON_CLS = "size-5";

export const HOMEPAGE_USE_CASES: RailCarouselRichItem[] = [
  {
    id: "retail-banking",
    name: "Retail Banking",
    description: "Launch cards, lending, and payment experiences for consumer customers.",
    icon: <Wallet className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/retail-banking",
  },
  {
    id: "commercial-banking",
    name: "Commercial Banking",
    description: "Modernize commercial cards, treasury, supplier payments, and business banking.",
    icon: <Building2 className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/commercial-banking",
  },
  {
    id: "fintechs",
    name: "Fintechs",
    description: "Launch and scale financial products on infrastructure built for growth.",
    icon: <Blocks className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/fintechs",
  },
  {
    id: "exchange-houses",
    name: "Exchange Houses",
    description: "Power remittance, cross-border payments, and settlement on one platform.",
    icon: <ArrowLeftRight className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/exchange-houses",
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Embed payments and financial services into digital customer journeys.",
    icon: <RadioTower className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/telecommunications",
  },
  {
    id: "retail-marketplaces",
    name: "Retail & Marketplaces",
    description: "Move money, issue cards, and create new customer experiences at scale.",
    icon: <Store className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/retail-marketplaces",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Simplify collections, disbursements, and regulated payment workflows.",
    icon: <HeartPulse className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/healthcare",
  },
  {
    id: "government",
    name: "Government",
    description: "Deliver secure payment infrastructure for citizens and public services.",
    icon: <Landmark className={ICON_CLS} strokeWidth={1.75} />,
    href: "/solutions/government",
  },
];
