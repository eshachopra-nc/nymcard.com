import {
  CreditCard,
  Landmark,
  ArrowLeftRight,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Embedded Finance §4 — What You Can Launch ────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §What You Can
// Launch.
//
// The four modular financial experiences — Embedded Cards · Embedded Lending ·
// Embedded Payments · Embedded Rewards — as modular cards (§8.5) across ONE row:
// 4-up on desktop, 2-up on tablet, 1-up on mobile. The headline sits full-width
// above the row. The previous asymmetric 7/5 grid with a right-column
// UIPlaceholder is removed (owner note, 4 June). Each card leads with the site's
// navy→cyan gradient icon chip, a name, and the verbatim description; cards
// stretch to equal heights so the single row reads balanced. White section, on
// a contained SectionAtmosphere wash. No eyebrow — the headline leads.

const COPY = {
  headline: "Financial experiences built into customer journeys.",
  experiences: [
    {
      name: "Embedded Cards",
      body: "Issue virtual, physical, or tokenised cards directly inside your product experience.",
      icon: CreditCard,
    },
    {
      name: "Embedded Lending",
      body: "Offer instalment plans, revolving credit, and financing at the point of need.",
      icon: Landmark,
    },
    {
      name: "Embedded Payments",
      body: "Move money between customers, businesses, accounts, wallets, and cards.",
      icon: ArrowLeftRight,
    },
    {
      name: "Embedded Rewards",
      body: "Create loyalty, cashback, and engagement programmes connected directly to spend.",
      icon: Gift,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function EmbeddedFinanceLaunch() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      {/* Headline — full width above the single experience row. */}
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* The four experiences on ONE row: 4-up desktop, 2-up tablet, 1-up
          mobile. Equal heights so the row reads balanced. */}
      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {COPY.experiences.map((experience) => (
          <ExperienceCard key={experience.name} {...experience} />
        ))}
      </div>
    </Section>
  );
}

function ExperienceCard({
  name,
  body,
  icon: Icon,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="nc-card-hover flex h-full flex-col rounded-lg border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-7">
      {/* Gradient icon chip — the site's product-icon treatment (navy→cyan). */}
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
    </div>
  );
}
