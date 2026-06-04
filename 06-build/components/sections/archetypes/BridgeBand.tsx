import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassAtmosphere, CrosshairRails } from "@/components/visuals";

// ── Archetype · Bridge / ribbon band ────────────────────────────────────────
//
// The designed hand-off band — the "Explore nCore" / "Built on nCore" moment
// that the owner said "needs a design", not a bare headline + link. A single
// contained panel on the cool GlassAtmosphere field. The "core" is made literal
// as a NUCLEUS that RADIATES across the whole band: a lit cyan→navy core with
// beating radial pulses + concentric rings + a soft glow, anchored to the right
// and bleeding off-edge so it energises the panel rather than sitting as a lone
// dot in empty space. Copy + link sit on the left, over the core's wash.
//
// One panel per page maximum (it's a section-closer bridge). Tokens only, cool
// palette, light + dark. The field drifts ambiently and the nucleus pulses;
// both are `motion-reduce` safe. Content is static; the link nudges on hover.
// Server component (it only composes the client GlassAtmosphere).

type BridgeBandProps = {
  headline: string;
  /** Lede beneath the headline. */
  body: string;
  /** The bridge link. */
  cta: { label: string; href: string };
  /** Atmosphere tone for the contained field. Default indigo — the platform tone. */
  tone?: "indigo" | "cyan" | "violet" | "azure";
  className?: string;
};

// The nucleus — a glowing core radiating beating pulses + rings. Sized in rem so
// the rings bleed off the panel edge (clipped by the band's overflow-hidden),
// reading as a field that fills the band, not an isolated dot. Pure CSS;
// `motion-reduce` drops the pulses and the static rings carry the form.
function Nucleus({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <div className="relative grid size-[26rem] place-items-center">
        {/* Soft radial glow filling the core's field. */}
        <span className="absolute size-[26rem] rounded-full bg-accent-cyan/10 blur-3xl dark:bg-accent-cyan/[0.14]" />
        {/* Beating radial pulses — large, staggered, bleeding outward. */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute size-44 rounded-full bg-accent-cyan/15 animate-ping motion-reduce:hidden"
            style={{ animationDuration: "3.4s", animationDelay: `${i * 1.1}s` }}
          />
        ))}
        {/* Static concentric rings — depth + the reduced-motion resting form. */}
        <span className="absolute size-[22rem] rounded-full ring-1 ring-accent-cyan/[0.07]" />
        <span className="absolute size-72 rounded-full ring-1 ring-accent-cyan/10" />
        <span className="absolute size-52 rounded-full ring-1 ring-accent-cyan/[0.14]" />
        <span className="absolute size-36 rounded-full ring-1 ring-accent-cyan/20" />
        {/* The core / nucleus — a lit cyan→navy sphere with a cyan glow. */}
        <span
          className={cn(
            "relative size-16 rounded-full",
            "bg-gradient-to-br from-accent-cyan to-brand-primary",
            "shadow-[0_0_60px_0] shadow-accent-cyan/60",
            "ring-1 ring-inset ring-white/25",
          )}
        />
      </div>
    </div>
  );
}

export function BridgeBand({
  headline,
  body,
  cta,
  tone = "indigo",
  className,
}: BridgeBandProps) {
  return (
    <div
      className={cn(
        // ALWAYS DARK — a deliberate contrast moment on the (usually light)
        // page. The forced `dark` context flips the atmosphere field, text, and
        // crosshairs to their dark variants, and the cyan nucleus glows far
        // harder on the deep field: the core, in the depths. (owner, 4 Jun)
        "dark relative isolate overflow-hidden rounded-2xl bg-surface-dark-base",
        "border border-surface-dark-border",
        className,
      )}
    >
      {/* The contained cool field — the panel's dimensional bed, drifting. */}
      <GlassAtmosphere tone={tone} className="absolute inset-0" />

      {/* A soft top-edge highlight so the panel reads as a lit surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
      />

      {/* The nucleus radiates from the right, bleeding off-edge (clipped). Hidden
          on small screens, where the band is just the copy block. */}
      <Nucleus className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-[28%] sm:block" />

      {/* Tighter padding than a full section — this is a band, not a section. */}
      <div className="relative z-10 px-7 py-9 sm:px-10 sm:py-10 lg:px-12">
        <CrosshairRails />
        {/* Copy + link, held to the left ~60% so the core's wash reads beside it. */}
        <div className="max-w-[34rem]">
          <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-3xl dark:text-text-on-brand">
            {headline}
          </h2>
          {/* Readable on the dark field (near-white), not the dim secondary tone. */}
          <p className="mt-4 max-w-[46ch] font-body text-base leading-relaxed text-text-secondary dark:text-text-on-brand/85">
            {body}
          </p>
          <div className="mt-7">
            <Button variant="tertiary" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
