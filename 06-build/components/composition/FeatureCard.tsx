import { cn } from "@/lib/utils";
import { KineticRibbon, visual, withAlpha } from "@/components/visuals";
import { AbstractMark, Eyebrow } from "./atoms";

// ── Large Feature Card ─────────────────────────────────────────────────────
//
// The homepage product-spotlight surface — a large asymmetric bento card.
// Composition, not chrome: editorial spacing, themed atmosphere integrated
// INTO the surface (between the card's fill and its content, never a panel
// floating over a separate background), one directional light from the
// top-right, and an abstract placeholder visual zone — never a chart or a
// dashboard.
//
// Theme-responsive: the same card in light and dark, KineticRibbon carrying
// the themed atmosphere. Reusable for every product spotlight on the site.

type FeatureCardProps = {
  eyebrow: string;
  headline: string;
  body: string;
  /** Abstract caption under the visual zone — a system label, not data. */
  zoneLabel?: string;
  className?: string;
};

export function FeatureCard({
  eyebrow,
  headline,
  body,
  zoneLabel = "system topology",
  className,
}: FeatureCardProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Atmosphere — integrated into the surface, themed and calm. */}
      <KineticRibbon intensity="calm" focus="top-right" />
      {/* Directional environmental lighting — one soft light, top-right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(58% 50% at 94% -4%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 72%)`,
        }}
      />
      {/* Cyan edge hairline — the lit front face. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.45,
          )} 32%, transparent 82%)`,
        }}
      />

      <div className="relative z-10 grid gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        {/* Text column — the editorial block. */}
        <div className="flex flex-col lg:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-tight text-text-primary dark:text-text-on-brand lg:text-[2rem]">
            {headline}
          </h3>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {body}
          </p>
        </div>

        {/* Visual zone — abstract placeholder, framed and atmospheric. */}
        <div className="lg:col-span-7">
          <VisualZone label={zoneLabel} />
        </div>
      </div>
    </section>
  );
}

// The abstract placeholder visual zone — a framed atmospheric area carrying
// one abstract mark. Deliberately not a product UI.
function VisualZone({ label }: { label: string }) {
  return (
    <div className="relative h-full min-h-56 overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-soft/60 dark:border-surface-dark-border dark:bg-surface-dark-base/55">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `radial-gradient(80% 72% at 72% 20%, ${withAlpha(visual.cyan, 0.08)}, transparent 70%),` +
            `radial-gradient(92% 82% at 18% 104%, ${withAlpha(visual.indigo, 0.08)}, transparent 72%)`,
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <AbstractMark className="size-32 text-brand-primary dark:text-accent-cyan" />
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
        {label}
      </span>
    </div>
  );
}
