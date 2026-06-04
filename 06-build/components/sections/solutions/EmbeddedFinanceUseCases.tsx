import { ShoppingBag, Store, RadioTower, Landmark, HeartPulse } from "lucide-react";
import { RailCarousel, type RailCarouselRichItem } from "@/components/composition";

// ── Embedded Finance §6 — Use Cases ──────────────────────────────────────────
//
// REBUILT (4 June, owner): use the SAME industries card component as the
// homepage Industries rail (RailCarousel, variant="rich") rather than a bespoke
// band. Owner-selected industries only: Retail, Marketplaces, Telecommunications,
// Government, Healthcare. Each is an icon-tile rich card linking to its
// /solutions/* industry page (Retail + Marketplaces both → the Retail &
// Marketplaces page, the system's single combined route).
//
// Descriptions mirror the homepage industry rail's outcome lines (Retail &
// Marketplaces split here into the two segments the owner named). No bespoke
// product illustration — the rich card is icon + name + one outcome line.

const ICON = "size-5";

const INDUSTRIES: RailCarouselRichItem[] = [
  {
    id: "retail",
    name: "Retail",
    description: "Add loyalty, financing, rewards, and payment experiences in-store and online.",
    icon: <ShoppingBag className={ICON} strokeWidth={1.75} />,
    href: "/solutions/retail-marketplaces",
  },
  {
    id: "marketplaces",
    name: "Marketplaces",
    description: "Embed payments, payouts, and seller financial services at scale.",
    icon: <Store className={ICON} strokeWidth={1.75} />,
    href: "/solutions/retail-marketplaces",
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Embed payments and financial services into digital customer journeys.",
    icon: <RadioTower className={ICON} strokeWidth={1.75} />,
    href: "/solutions/telecommunications",
  },
  {
    id: "government",
    name: "Government",
    description: "Deliver secure payment infrastructure for citizens and public services.",
    icon: <Landmark className={ICON} strokeWidth={1.75} />,
    href: "/solutions/government",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Simplify collections, disbursements, and regulated payment workflows.",
    icon: <HeartPulse className={ICON} strokeWidth={1.75} />,
    href: "/solutions/healthcare",
  },
];

export function EmbeddedFinanceUseCases() {
  return (
    <RailCarousel
      variant="rich"
      background="light"
      atmosphere="split"
      headline="Where embedded finance creates new experiences."
      items={INDUSTRIES}
      ariaLabel="Industries"
    />
  );
}
