import { Store, ShoppingBag, Car, RadioTower, LayoutGrid } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { HorizontalRow } from "@/components/sections/archetypes";

// ── Embedded Finance §6 — Use Cases ──────────────────────────────────────────
//
// Industry descriptions mirrored VERBATIM from
// 02-copy/usecase-embedded-finance.md §Use Cases.
//
// REBUILT (2026-06-04). Was a 5-card grid; now a HorizontalRow — the five
// industries read SIDEWAYS as a hairline-divided horizontal rail of typographic
// panels (index numeral + icon + name + one-liner), the explicit alternative to
// a card grid. The horizontal axis is the contrast against the page's stacked
// sections. Links preserved as a CONDITIONAL: Marketplaces and Retail link to
// /solutions/retail-marketplaces, Telecommunications to
// /solutions/telecommunications; Mobility and Digital Platforms have no route
// yet and render as static panels (no dead href). Linked panels show an arrow
// that nudges on hover.
//
// The headline is builder-supplied connective copy (the copy file gives no
// headline for this section) — kept simple, FLAGGED to the owner.

const COPY = {
  // BUILDER-SUPPLIED connective headline (no headline in the copy file for this
  // section). Flagged to the owner for approval.
  headline: "Where embedded finance creates new experiences.",
  industries: [
    {
      name: "Marketplaces",
      body: "Embed payments, payouts, and seller financial services.",
      icon: <Store strokeWidth={1.75} />,
      href: "/solutions/retail-marketplaces",
    },
    {
      name: "Retail",
      body: "Introduce loyalty, financing, rewards, and payment experiences.",
      icon: <ShoppingBag strokeWidth={1.75} />,
      href: "/solutions/retail-marketplaces",
    },
    {
      // No Mobility industry route exists yet — render as a static panel.
      name: "Mobility",
      body: "Support drivers and riders with payments, cards, and financial tools.",
      icon: <Car strokeWidth={1.75} />,
    },
    {
      name: "Telecommunications",
      body: "Extend digital experiences with embedded financial services.",
      icon: <RadioTower strokeWidth={1.75} />,
      href: "/solutions/telecommunications",
    },
    {
      // No destination — renders as a static panel (no anchor, no dead href).
      name: "Digital Platforms",
      body: "Create new revenue streams through financial products and services.",
      icon: <LayoutGrid strokeWidth={1.75} />,
    },
  ],
} as const;

export function EmbeddedFinanceUseCases() {
  return (
    <Section bg="white">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <div className="mt-10 sm:mt-12">
        <HorizontalRow items={[...COPY.industries]} />
      </div>
    </Section>
  );
}
