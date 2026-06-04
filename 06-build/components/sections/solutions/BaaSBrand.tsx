import {
  Smartphone,
  Monitor,
  LayoutDashboard,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { visual, withAlpha } from "@/components/visuals";

// ── Banking-as-a-Service §4 — Launch Under Your Brand ────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Launch Under Your Brand".
//
// Four white-label channels — Mobile App · Web Experience · Admin Portal ·
// APIs & SDKs — as compact channel rows, each led by a gradient icon chip, the
// channel name, and the verbatim description, closing on the supporting
// statement. Per the copy's Visual Direction the visual shows Mobile App / Web
// App / Admin Portal connected to nCore — premium and customer-facing, NOT an
// infrastructure diagram. SCAFFOLD: that surface is a clearly-labelled
// UIPlaceholder for the ui-ux-designer.
//
// Asymmetric F-pattern: the brand-on-nCore visual slot on the left (cols 1–6),
// headline + channels + supporting statement on the right (cols 7–12) — the
// mirror of §2 so adjacent reveals don't read identical. Light, on a contained
// SectionAtmosphere wash. No eyebrow — the headline leads.

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

const VISUAL_LABEL =
  "Brand visual — Mobile App · Web App · Admin Portal connected to nCore, premium and customer-facing (no infrastructure diagram)";

export function BaaSBrand() {
  return (
    <Section
      bg="soft"
      overflowVisible
      backgrounds={<SectionAtmosphere anchor="bottom" />}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — the brand-on-nCore visual slot, sticky on desktop. SCAFFOLD:
            a labelled placeholder for the ui-ux-designer. */}
        <div className="order-last lg:order-first lg:col-span-6">
          <div className="min-h-[22rem] lg:sticky lg:top-28 lg:min-h-[32rem]">
            <UIPlaceholder scale="wide" label={VISUAL_LABEL} className="h-full" />
          </div>
        </div>

        {/* Right — headline, description, the four channels, supporting line. */}
        <div className="lg:col-span-6">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.description}
          </p>

          <ul className="mt-10 space-y-px overflow-hidden">
            {COPY.channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li
                  key={channel.name}
                  className="flex gap-4 border-t border-surface-border-subtle pt-6 first:border-t-0 first:pt-0 dark:border-surface-dark-border"
                >
                  {/* Gradient icon chip — the site's product-icon treatment. */}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{
                      background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
                        visual.cyan,
                        0.92,
                      )})`,
                    }}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                      {channel.name}
                    </p>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
                      {channel.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 font-display text-base font-semibold leading-relaxed tracking-tight text-text-primary dark:text-text-on-brand sm:text-lg">
            {COPY.supportingStatement}
          </p>
        </div>
      </div>
    </Section>
  );
}
