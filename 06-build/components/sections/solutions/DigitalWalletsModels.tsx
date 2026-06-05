import { Smartphone, Signal, Briefcase, Globe, Landmark, LayoutGrid } from "lucide-react";
import { RailCarousel, type RailCarouselRichItem } from "@/components/composition";

// ── Digital Wallets §4 — Designed for Multiple Wallet Models ─────────────────
//
// Copy mirrored from 02-copy/usecase-digital-wallets.md §Designed for Multiple
// Wallet Models.
//
// OWNER EDIT: rebuilt onto the canonical INDUSTRIES component (RailCarousel,
// variant="rich" — the homepage Industries rail) instead of the HorizontalRow.
// That drops the index numerals (RailCarousel has none) and reads as the
// icon-led, snap-scroll rail. Each wallet model links ("Explore →") to the
// industry / use-case page it most naturally serves. No eyebrow — headline leads.

const ITEMS: RailCarouselRichItem[] = [
  {
    id: "consumer",
    name: "Consumer Wallets",
    description: "Help customers receive, store, transfer, and spend money every day.",
    icon: <Smartphone />,
    href: "/solutions/retail-banking",
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "Enable digital financial services for telecom subscribers and underserved populations.",
    icon: <Signal />,
    href: "/solutions/telecommunications",
  },
  {
    id: "payroll",
    name: "Payroll Wallets",
    description: "Give employees and gig workers a digital destination for earnings and spending.",
    icon: <Briefcase />,
    href: "/solutions/commercial-payments",
  },
  {
    id: "remittance",
    name: "Remittance Wallets",
    description: "Receive, hold, transfer, and spend funds from domestic and international transfers.",
    icon: <Globe />,
    href: "/solutions/exchange-houses",
  },
  {
    id: "government",
    name: "Government Wallets",
    description: "Deliver benefits, payments, and public services through secure digital experiences.",
    icon: <Landmark />,
    href: "/solutions/government",
  },
  {
    id: "super-apps",
    name: "Super Apps",
    description: "Embed financial services into broader consumer ecosystems.",
    icon: <LayoutGrid />,
    href: "/solutions/fintechs",
  },
];

export function DigitalWalletsModels() {
  return (
    <RailCarousel
      variant="rich"
      background="light"
      atmosphere="split"
      headline="One platform. Multiple wallet experiences."
      items={ITEMS}
      ariaLabel="Wallet experiences"
    />
  );
}
