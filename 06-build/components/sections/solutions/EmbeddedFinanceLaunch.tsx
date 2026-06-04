import { CreditCard, Landmark, ArrowLeftRight, Gift } from "lucide-react";
import { StatementBand } from "@/components/sections/archetypes";

// ── Embedded Finance §4 — What You Can Launch ────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §What You Can
// Launch.
//
// REBUILT (2026-06-04). This is the section the owner specifically called out as
// "just cards". It is now the page's CONTRAST ANCHOR: a FULL-BLEED DARK
// StatementBand. The verbatim headline runs at display scale on a deep cool
// field; the four experiences read as a quiet hairline-separated typographic
// ROW beneath it (icon + name + one-liner) — NOT a 4-up card grid. The dark
// full-bleed band is the first of the page's two non-adjacent dark beats and
// breaks the all-light scroll. Renders edge-to-edge (no Section wrapper) so it
// genuinely bleeds.

const COPY = {
  headline: "Financial experiences built into customer journeys.",
  experiences: [
    {
      label: "Embedded Cards",
      body: "Issue virtual, physical, or tokenised cards directly inside your product experience.",
      icon: <CreditCard strokeWidth={1.75} />,
    },
    {
      label: "Embedded Lending",
      body: "Offer instalment plans, revolving credit, and financing at the point of need.",
      icon: <Landmark strokeWidth={1.75} />,
    },
    {
      label: "Embedded Payments",
      body: "Move money between customers, businesses, accounts, wallets, and cards.",
      icon: <ArrowLeftRight strokeWidth={1.75} />,
    },
    {
      label: "Embedded Rewards",
      body: "Create loyalty, cashback, and engagement programmes connected directly to spend.",
      icon: <Gift strokeWidth={1.75} />,
    },
  ],
} as const;

export function EmbeddedFinanceLaunch() {
  return (
    <StatementBand
      statement={COPY.headline}
      items={[...COPY.experiences]}
      tone="indigo"
    />
  );
}
