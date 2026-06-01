import { CapabilityUIZone } from "./CapabilityUIZone";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

// ── CapabilityCards ─────────────────────────────────────────────────────────
//
// The generalized product-page capabilities section, consistent with the
// lending §4 treatment (and card-issuing's TileShell): each capability is a
// bordered card with eyebrow → headline → description ABOVE the UI, and the UI
// zone below. The UI zone is a NamedSurface placeholder that auto-loads
// `/handoff/home/{slug}-{slug-of-label}.svg` once dropped in — so these pages
// match lending now and fill with real product UIs on handoff.
//
// Grid adapts to item count: 6 → 3-up, 4 → 2-up, 2 → 2-up. Cards in a row share
// height (grid stretch), so the section reads even, not cramped. Theme-aware;
// the eyebrow is suppressed where it would merely echo the heading.

const handoffName = (slug: string, label: string) =>
  `${slug}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

type CapabilityItem = {
  eyebrow?: string;
  heading: string;
  description?: string;
};

export function CapabilityCards({
  slug,
  headline,
  body,
  items,
}: {
  slug: string;
  headline: string;
  body?: string;
  items: CapabilityItem[];
}) {
  const threeUp = items.length > 4;

  return (
    <Section bg="white">
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

      <div
        className={cn(
          "grid grid-cols-1 gap-5 sm:grid-cols-2",
          threeUp && "lg:grid-cols-3",
        )}
      >
        {items.map((item) => {
          const showEyebrow =
            !!item.eyebrow &&
            item.eyebrow.toLowerCase() !== item.heading.toLowerCase();
          const name = handoffName(slug, item.eyebrow ?? item.heading);
          return (
            <article
              key={item.heading}
              className="nc-card-hover group flex flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated"
            >
              <div className="p-6 pb-4">
                {showEyebrow && (
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

              {/* UI zone — ambient cool field with orbital drift + sheen sweep
                  so the placeholder reads as a living surface (CapabilityUIZone
                  client). Fills on handoff via NamedSurface auto-load. */}
              <CapabilityUIZone name={name} label={item.eyebrow ?? item.heading} />
            </article>
          );
        })}
      </div>
    </Section>
  );
}
