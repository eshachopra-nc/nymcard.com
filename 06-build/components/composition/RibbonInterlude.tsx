import { cn } from "@/lib/utils";
import { KineticRibbon } from "@/components/visuals";

// ── Ribbon interlude ───────────────────────────────────────────────────────
//
// A slim full-bleed kinetic-ribbon band that runs between content sections —
// the page-arc connective tissue. Where CTASection (§8.14) is the closing
// ribbon home, RibbonInterlude is the mid-page ribbon home: a quiet beat that
// lets the ribbon recur without competing with copy.
//
// The brief calls for the kinetic ribbon to recur beyond the hero. Phase 1.5
// gives it three homes: the hero (untouched master), CTASection (closing
// echo, ribbon-led), and RibbonInterlude (mid-page interlude). One per page
// maximum so it stays a signature, not a motif.
//
// Composition: a horizontal band (default 160px tall) carrying the KineticRibbon
// atmosphere at the chosen intensity, with hairline edges so the band reads as
// a deliberate interruption rather than a section. No content; never used as a
// section anchor — drop it between two sections that need an editorial breath.
//
// Light and dark by construction. The `tone` prop swaps the surface so the
// interlude can punctuate either rhythm. Server component — no client motion
// here; KineticRibbon carries it.

type RibbonInterludeProps = {
  /**
   * Ribbon intensity. `ambient` is the default; `peak` lifts the band to
   * climb between two heavy sections. `calm` keeps the band almost silent —
   * use for a near-invisible breath between two narratives.
   */
  intensity?: "calm" | "ambient" | "peak";
  /**
   * Ribbon focus origin. Default `bottom-right` so the interlude reads as a
   * "ribbon passing through" rather than a centred field.
   */
  focus?: "top-right" | "left" | "bottom-right";
  /** Surface tone — `light` (default) or `dark`. Forces `.dark` locally for dark. */
  tone?: "light" | "dark";
  /**
   * Band height. Slim by default so the interlude is a breath, not a section.
   * The four tokens correspond to ~96 / 128 / 160 / 200px desktop.
   */
  height?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const HEIGHT: Record<NonNullable<RibbonInterludeProps["height"]>, string> = {
  sm: "h-24 sm:h-24",
  md: "h-32 sm:h-32",
  lg: "h-40 sm:h-40",
  xl: "h-44 sm:h-52",
};

export function RibbonInterlude({
  intensity = "ambient",
  focus = "bottom-right",
  tone = "light",
  height = "md",
  className,
}: RibbonInterludeProps) {
  const dark = tone === "dark";
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden",
        HEIGHT[height],
        dark ? "dark bg-surface-dark-base" : "bg-surface-white dark:bg-surface-dark-base",
        // Hairline edges — the interlude reads as a deliberate interruption,
        // not a section. The lines never reach full-bleed; they fade at the
        // page-rail margins.
        "before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-surface-border-subtle before:dark:bg-surface-dark-border",
        "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-surface-border-subtle after:dark:bg-surface-dark-border",
        className,
      )}
    >
      <KineticRibbon intensity={intensity} focus={focus} />
    </section>
  );
}
