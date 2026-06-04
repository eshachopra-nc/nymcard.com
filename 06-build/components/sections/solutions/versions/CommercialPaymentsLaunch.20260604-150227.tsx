import { Monitor, Smartphone, Code, type LucideIcon } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §4 — Launch Your Way ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Launch
// Your Way.
//
// Headline + description, then the three delivery options — White-Label Web
// Portal · White-Label Mobile App · APIs & SDKs — as modular gradient-icon cards
// (the BaaSIncludes treatment) in a three-up row, with the verbatim supporting
// line rendered beneath the cards as a closing connective beat. No eyebrow — the
// headline leads. Light (soft), on a contained SectionAtmosphere wash.

const COPY = {
  headline: "Choose the experience that fits your customers.",
  description:
    "Launch with a complete business finance experience out of the box or embed capabilities into the channels you already operate.",
  options: [
    {
      name: "White-Label Web Portal",
      body: "Deliver a fully branded Financial OS through a web experience designed for business users.",
      icon: Monitor,
    },
    {
      name: "White-Label Mobile App",
      body: "Give businesses access to spending, payments, payroll, invoices, and financing from anywhere.",
      icon: Smartphone,
    },
    {
      name: "APIs & SDKs",
      body: "Embed commercial payment capabilities directly into existing digital channels and customer journeys.",
      icon: Code,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
  supportingLine:
    "Infrastructure, applications, and customer experiences running on the same platform.",
} as const;

export function CommercialPaymentsLaunch() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      {/* Three delivery options — modular gradient-icon cards, three-up. */}
      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {COPY.options.map((option) => (
          <OptionCard key={option.name} {...option} />
        ))}
      </div>

      {/* Supporting line — the closing connective beat beneath the cards. */}
      <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:mt-10 sm:text-lg">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}

function OptionCard({
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
