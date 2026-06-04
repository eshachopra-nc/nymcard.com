import { Monitor, Smartphone, Code, type LucideIcon } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §5 — Launch your way ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Launch
// Your Way.
//
// A distinct DELIVERY-OPTIONS treatment — the three ways to ship — Branded
// Website · Branded App · APIs & SDKs — as a three-up segmented strip sharing a
// single top hairline rule, each a quiet column led by a gradient icon chip,
// divided by vertical hairlines so the three read as three routes off one
// platform. Not boxed cards — a divided strip, lighter in weight, and
// structurally distinct from the §4 segment rail and the §3 feature-show. No
// eyebrow — the headline leads. Light (soft), on a contained SectionAtmosphere
// wash.
//
// OWNER EDITS (4 Jun): "White-Label Business Portal" → "Branded Website" and
// "Mobile Experience" → "Branded App"; the website and app carry the
// INSTITUTION's brand (the bank's), not the business's — the bodies say "under
// your brand". Per-column index numerals removed. The supporting line was cut.

const COPY = {
  headline: "Choose the experience that fits your customers.",
  description:
    "Launch complete business banking experiences or embed capabilities into existing customer journeys.",
  options: [
    {
      name: "Branded Website",
      body: "A website under your brand where your business customers manage payments, spending, collections, and financing.",
      icon: Monitor,
    },
    {
      name: "Branded App",
      body: "An app under your brand that lets your business customers manage their financial operations from anywhere.",
      icon: Smartphone,
    },
    {
      name: "APIs & SDKs",
      body: "Embed capabilities into existing banking, payment, and digital experiences.",
      icon: Code,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
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
          {COPY.options.map((option) => (
            <OptionColumn key={option.name} {...option} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function OptionColumn({
  name,
  body,
  icon: Icon,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="lg:border-l lg:border-surface-border-subtle lg:pl-10 lg:dark:border-surface-dark-border lg:first:border-l-0 lg:first:pl-0">
      {/* Gradient icon chip — the site's product-icon treatment (navy→cyan).
          Per-column index numerals removed per owner. */}
      <div className="flex items-center gap-3">
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
