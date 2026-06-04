import Link from "next/link";
import {
  Store,
  ShoppingBag,
  Car,
  RadioTower,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Embedded Finance §6 — Use Cases ──────────────────────────────────────────
//
// Industry descriptions mirrored VERBATIM from
// 02-copy/usecase-embedded-finance.md §Use Cases.
//
// DECISION (build plan): we do NOT use RailCarousel here — its rich cards are
// forced anchors and cannot cleanly render a non-linked card, and two of the
// five (Mobility, Digital Platforms) have no destination route yet. Instead
// this is a STATIC responsive card grid in the same modular-card / navy→cyan
// gradient-icon-chip language as §4 (Launch). The link is a CONDITIONAL
// wrapper: a card with an `href` renders as a Next <Link> (hover-lift); a card
// without one renders as a plain static card (no anchor, no dead href).
//
// The section headline is builder-supplied connective copy — the copy file
// gives no headline for this section. Kept deliberately simple; FLAGGED to the
// owner in the handoff report. On a contained SectionAtmosphere wash.

const COPY = {
  // BUILDER-SUPPLIED connective headline (no headline in the copy file for this
  // section). Flagged to the owner for approval.
  headline: "Where embedded finance creates new experiences.",
  industries: [
    {
      name: "Marketplaces",
      body: "Embed payments, payouts, and seller financial services.",
      icon: Store,
      href: "/solutions/retail-marketplaces",
    },
    {
      name: "Retail",
      body: "Introduce loyalty, financing, rewards, and payment experiences.",
      icon: ShoppingBag,
      href: "/solutions/retail-marketplaces",
    },
    {
      // No Mobility industry route exists yet — render as a static card (no
      // dead /solutions/mobility link). Wire the href when the page ships.
      name: "Mobility",
      body: "Support drivers and riders with payments, cards, and financial tools.",
      icon: Car,
      href: undefined,
    },
    {
      name: "Telecommunications",
      body: "Extend digital experiences with embedded financial services.",
      icon: RadioTower,
      href: "/solutions/telecommunications",
    },
    {
      // No destination — renders as a static card (no anchor, no dead href).
      name: "Digital Platforms",
      body: "Create new revenue streams through financial products and services.",
      icon: LayoutGrid,
      href: undefined,
    },
  ] satisfies {
    name: string;
    body: string;
    icon: LucideIcon;
    href: string | undefined;
  }[],
} as const;

export function EmbeddedFinanceUseCases() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {COPY.industries.map((industry) => (
          <IndustryCard key={industry.name} {...industry} />
        ))}
      </div>
    </Section>
  );
}

function IndustryCard({
  name,
  body,
  icon: Icon,
  href,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  href: string | undefined;
}) {
  const inner = (
    <>
      {/* Gradient icon chip — the §4 product-icon treatment (navy→cyan). */}
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-md text-white"
        style={{
          background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
            visual.cyan,
            0.92,
          )})`,
        }}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {name}
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {body}
      </p>
    </>
  );

  const base =
    "flex h-full flex-col rounded-lg border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-7";

  // Conditional wrapper: linked cards lift on hover; the non-linked card is a
  // plain static surface (no anchor, no dead href).
  if (href) {
    return (
      <Link href={href} className={`nc-card-hover group ${base}`}>
        {inner}
      </Link>
    );
  }

  return <div className={base}>{inner}</div>;
}
