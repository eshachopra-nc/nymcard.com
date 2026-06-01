import type { ComponentType } from "react";
import { CapabilityUIZone } from "./CapabilityUIZone";
import { Section } from "@/components/sections/Section";
import { GlassPanel, GlassAtmosphere } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── CapabilityCards ─────────────────────────────────────────────────────────
//
// The generalized product-page capabilities section. Two modes:
//
//  • Default (no `icons`) — each capability is a bordered card with eyebrow →
//    heading → description ABOVE a CapabilityUIZone placeholder that auto-loads
//    a handoff surface. Used by settlement / reconciliation.
//
//  • Clean glass (an `icons` map is passed) — NO UI zone. Each capability is a
//    GlassPanel (frosted, §8.1) floating on one shared GlassAtmosphere field,
//    led by a brand-gradient icon chip, then eyebrow → heading → description.
//    Used by Money Movement. The eyebrow is suppressed where it merely echoes
//    the heading.
//
// Grid adapts to item count: 6 → 3-up, 4 → 2-up, 2 → 2-up.

const handoffName = (slug: string, label: string) =>
  `${slug}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

type IconComp = ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;

type CapabilityItem = {
  eyebrow?: string;
  heading: string;
  description?: string;
};

const showEyebrow = (item: CapabilityItem) =>
  !!item.eyebrow && item.eyebrow.toLowerCase() !== item.heading.toLowerCase();

// The brand-gradient icon chip — filled, white glyph (matches the nav + contact
// routes). Glass card + this chip is the "glass morphism + chip" treatment.
const CHIP =
  "mb-5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl " +
  "bg-gradient-to-br from-brand-primary via-brand-purple to-accent-cyan text-white " +
  "shadow-[0_8px_20px_-8px_rgba(48,77,187,0.55)] dark:shadow-[0_8px_22px_-8px_rgba(34,211,238,0.4)]";

export function CapabilityCards({
  slug,
  headline,
  body,
  items,
  icons,
}: {
  slug: string;
  headline: string;
  body?: string;
  items: CapabilityItem[];
  /** When provided (keyed by heading), renders the clean glass cards (no UI zone). */
  icons?: Record<string, IconComp>;
}) {
  const threeUp = items.length > 4;

  const header = (
    <div className="mb-12 max-w-2xl sm:mb-14">
      {/* No eyebrow on the section opener — headline leads (CLAUDE.md v1.5). */}
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
        {headline}
      </h2>
      {body && (
        <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {body}
        </p>
      )}
    </div>
  );

  // ── Clean glass mode — glass cards on one shared atmosphere field. ──
  if (icons) {
    return (
      <Section bg="white">
        {header}
        <div className="relative isolate overflow-hidden rounded-3xl border border-surface-border-subtle p-4 sm:p-5 dark:border-surface-dark-border">
          {/* Rich field so the frost reads as glass, never a flat panel (§8.1). */}
          <GlassAtmosphere tone="cyan" />
          <div
            className={cn(
              "relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
              threeUp && "lg:grid-cols-3",
            )}
          >
            {items.map((item) => {
              const Icon = icons[item.heading];
              return (
                <GlassPanel
                  key={item.heading}
                  as="article"
                  padded={false}
                  className="nc-card-hover flex flex-col rounded-2xl p-6"
                >
                  {Icon ? (
                    <span aria-hidden="true" className={CHIP}>
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  {showEyebrow(item) && (
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
                      {item.eyebrow}
                    </p>
                  )}
                  <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                    {item.heading}
                  </h3>
                  {item.description && (
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      {item.description}
                    </p>
                  )}
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </Section>
    );
  }

  // ── Default mode — bordered cards with the CapabilityUIZone placeholder. ──
  return (
    <Section bg="white">
      {header}
      <div
        className={cn(
          "grid grid-cols-1 gap-5 sm:grid-cols-2",
          threeUp && "lg:grid-cols-3",
        )}
      >
        {items.map((item) => {
          const name = handoffName(slug, item.eyebrow ?? item.heading);
          return (
            <article
              key={item.heading}
              className="nc-card-hover group flex flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated"
            >
              <div className="p-6 pb-4">
                {showEyebrow(item) && (
                  <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
                    {item.eyebrow}
                  </p>
                )}
                <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                  {item.heading}
                </h3>
                {item.description && (
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {item.description}
                  </p>
                )}
              </div>

              {/* UI zone — ambient cool field; fills on handoff via NamedSurface. */}
              <CapabilityUIZone name={name} label={item.eyebrow ?? item.heading} />
            </article>
          );
        })}
      </div>
    </Section>
  );
}
