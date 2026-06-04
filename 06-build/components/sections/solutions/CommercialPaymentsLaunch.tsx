import { Monitor, Smartphone, Code, type LucideIcon } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §4 — Launch Your Way ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Launch
// Your Way.
//
// A distinct DELIVERY-OPTIONS treatment — NOT the §3 feature-show and NOT the §5
// linked grid. Headline + description lead, then the three delivery options —
// White-Label Web Portal · White-Label Mobile App · APIs & SDKs — as a three-up
// row sharing a single top hairline rule, each a quiet column led by a gradient
// icon chip and a mono "way 01/02/03" marker, divided by vertical hairlines so
// the three read as three routes off one platform. The verbatim supporting line
// closes the section beneath the row. No bordered cards here (those belong to §3
// / §5) — this is a divided strip, lighter in weight. No eyebrow — the headline
// leads. Light (soft), on a contained SectionAtmosphere wash.

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
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="split" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      {/* Three delivery options — a divided strip under one top rule. */}
      <div className="mt-12 border-t border-surface-border-subtle pt-8 dark:border-surface-dark-border sm:mt-14 sm:pt-10">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {COPY.options.map((option, i) => (
            <OptionColumn key={option.name} index={i} {...option} />
          ))}
        </div>
      </div>

      {/* Supporting line — the closing connective beat beneath the strip. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:mt-12 sm:text-lg">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}

function OptionColumn({
  name,
  body,
  icon: Icon,
  index,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <div className="lg:border-l lg:border-surface-border-subtle lg:pl-10 lg:dark:border-surface-dark-border lg:first:border-l-0 lg:first:pl-0">
      <div className="flex items-center gap-3">
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
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {name}
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {body}
      </p>
    </div>
  );
}
