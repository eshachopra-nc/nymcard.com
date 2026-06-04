import type { ReactNode } from "react";
import { Smartphone, MonitorSmartphone, Code2 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Telecommunications §5 — Launch your way ──────────────────────────────────
//
// Three delivery surfaces (White-Label Mobile App, White-Label Customer Portal,
// APIs & SDKs) as a three-column row. Each is its OWN luminous card — icon, name,
// description, and a labelled UIPlaceholder for the realistic UI example the
// copy's visual direction calls for (filled by a later product-ui-designer pass;
// scaffold only). Every card floats on the canonical product-illustration kit so
// it reads dimensional in BOTH light and dark (design-system.md §8.1), never a
// flat panel. A single supporting line closes the row.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal from
// Section/SectionReveal; per-card group-hover lift is pure CSS (reduced-motion
// safe).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §5.

const COPY = {
  headline: "Choose the experience that fits your strategy.",
  description:
    "Launch complete financial experiences or embed capabilities into the channels customers already use.",
  supportingLine:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

type DeliveryOption = {
  name: string;
  description: string;
  icon: ReactNode;
  slotLabel: string;
};

const OPTIONS: DeliveryOption[] = [
  {
    name: "White-Label Mobile App",
    description:
      "Launch branded wallet, payment, and lending experiences without building from scratch.",
    icon: <Smartphone />,
    slotLabel: "White-label mobile app — product UI",
  },
  {
    name: "White-Label Customer Portal",
    description: "Deliver financial services through existing subscriber channels.",
    icon: <MonitorSmartphone />,
    slotLabel: "White-label customer portal — product UI",
  },
  {
    name: "APIs & SDKs",
    description: "Embed capabilities directly into your digital ecosystem.",
    icon: <Code2 />,
    slotLabel: "APIs & SDKs — product UI",
  },
];

function DeliveryCard({ name, description, icon, slotLabel }: DeliveryOption) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                "bg-accent-cyan/[0.12] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20",
                "transition-transform duration-300 group-hover:-translate-y-0.5",
                "[&_svg]:size-[20px]",
              )}
            >
              {icon}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {name}
              </h3>
              <p className="mt-1.5 max-w-[36ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={slotLabel} scale="compact" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function LaunchYourWay() {
  return (
    <Section bg="soft" ariaLabel="Launch your way">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three-column delivery row. Single column on mobile. */}
      <div className="grid gap-6 md:grid-cols-3">
        {OPTIONS.map((o) => (
          <DeliveryCard key={o.name} {...o} />
        ))}
      </div>

      {/* Supporting line — closes the row. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}
