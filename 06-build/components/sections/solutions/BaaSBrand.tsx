import {
  Smartphone,
  Monitor,
  LayoutDashboard,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Banking-as-a-Service §4 — Launch Under Your Brand ────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Launch Under Your Brand".
//
// REWORKED (4 June) off the mirrored F-pattern-with-placeholder onto an
// editorial SEGMENTED-COLUMNS treatment (mirroring the Exchange Houses
// LaunchYourWay): the four white-label channels — Mobile App · Web Experience ·
// Admin Portal · APIs & SDKs — as columns divided by vertical hairlines (not
// boxed cards, not a numbered rail), each opened by a gradient icon chip then
// channel name + verbatim body. The verbatim supporting statement closes the
// section beneath the row. Dropping the second UIPlaceholder keeps the page to
// ONE marquee/visual surface (§2's connected-modules slot) — the variety rule.
// Structurally distinct from §2 (asymmetric marquee), §3 (FeatureMatrix), and
// §5 (ProcessRail). No eyebrow — the headline leads.

const COPY = {
  headline: "Infrastructure underneath. Your brand on top.",
  description:
    "Launch customer experiences through white-label applications, APIs, and SDKs without building every layer from scratch.",
  channels: [
    {
      name: "Mobile App",
      body: "Deliver digital banking experiences through fully branded mobile applications.",
      icon: Smartphone,
    },
    {
      name: "Web Experience",
      body: "Provide customers with modern banking experiences through web portals and self-service channels.",
      icon: Monitor,
    },
    {
      name: "Admin Portal",
      body: "Manage customers, products, programmes, and operations through a unified control centre.",
      icon: LayoutDashboard,
    },
    {
      name: "APIs & SDKs",
      body: "Embed capabilities directly into existing digital channels and customer journeys.",
      icon: Code2,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
  supportingStatement: "Everything running on the same infrastructure and customer record.",
} as const;

export function BaaSBrand() {
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

      {/* Four channels as columns divided by vertical hairlines — a segmented
          block under one top rule, not boxed cards and not a numbered rail. */}
      <div className="mt-12 border-t border-surface-border-subtle pt-8 dark:border-surface-dark-border sm:mt-14 sm:pt-10">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {COPY.channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className="lg:border-l lg:border-surface-border-subtle lg:pl-8 lg:dark:border-surface-dark-border lg:first:border-l-0 lg:first:pl-0"
              >
                {/* Gradient icon chip — the site's product-icon treatment. */}
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
                  {channel.name}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {channel.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supporting statement — the closing connective beat beneath the strip. */}
      <p className="mt-10 max-w-2xl font-display text-base font-semibold leading-relaxed tracking-tight text-text-primary dark:text-text-on-brand sm:mt-12 sm:text-lg">
        {COPY.supportingStatement}
      </p>
    </Section>
  );
}
