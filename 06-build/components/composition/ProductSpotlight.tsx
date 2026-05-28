import { cn } from "@/lib/utils";
import { KineticRibbon, ScanSweep, visual, withAlpha } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── Product Spotlight Composition ──────────────────────────────────────────
//
// The product-section composition for Cards / Lending / FX / Identity: an
// editorial text block beside an embedded UI zone. The UI zone is not a
// screenshot pasted on top — it is translucent so the section atmosphere
// reads through it, its edges are lit by the same cyan light, and a restrained
// operational scan passes over it. Abstract placeholder only: skeleton forms,
// never a fake dashboard. The composition is the point.

type ProductSpotlightProps = {
  eyebrow: string;
  headline: string;
  body: string;
  className?: string;
};

export function ProductSpotlight({
  eyebrow,
  headline,
  body,
  className,
}: ProductSpotlightProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Atmosphere — themed, calm, drifting in from the left. */}
      <KineticRibbon intensity="calm" focus="left" />

      <div className="relative z-10 grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
        {/* Text block. */}
        <div className="lg:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-5 font-display text-2xl font-bold leading-[1.16] tracking-tight text-text-primary dark:text-text-on-brand lg:text-[1.9rem]">
            {headline}
          </h3>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {body}
          </p>
        </div>

        {/* Embedded UI zone. */}
        <div className="lg:col-span-7">
          <EmbeddedUI />
        </div>
      </div>
    </section>
  );
}

// The embedded UI zone — a translucent panel that the atmosphere reads
// through, cyan-lit at the edge, with a restrained scan. Abstract skeleton
// forms only; this demonstrates UI EMBEDDING, not a product mock.
function EmbeddedUI() {
  return (
    <div className="relative">
      {/* Environmental diffusion — atmosphere pooling around the zone, so it
          sits embedded rather than pasted on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6"
        style={{
          background: `radial-gradient(58% 60% at 52% 40%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 74%)`,
          filter: "blur(22px)",
        }}
      />
      <div className="relative isolate overflow-hidden rounded-2xl border border-white/55 bg-surface-white/70 backdrop-blur-md dark:border-white/[0.08] dark:bg-surface-dark-glass">
        {/* Cyan edge lighting. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(
              visual.cyan,
              0.5,
            )} 42%, transparent)`,
          }}
        />
        {/* Abstract skeleton — placeholder forms, not data. */}
        <div className="relative z-10 space-y-4 p-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent-cyan/70" />
            <span className="h-2 w-24 rounded-full bg-text-primary/15 dark:bg-white/15" />
          </div>
          <div className="space-y-2.5">
            <span className="block h-2.5 w-full rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
            <span className="block h-2.5 w-4/5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
            <span className="block h-2.5 w-3/5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="h-14 rounded-lg border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
            <div className="h-14 rounded-lg border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
          </div>
        </div>
        {/* Operational scan — the atmosphere reaching into the UI. */}
        <ScanSweep variant="linear" intensity="subtle" />
      </div>
    </div>
  );
}
