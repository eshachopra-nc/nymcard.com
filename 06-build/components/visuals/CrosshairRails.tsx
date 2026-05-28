import { cn } from "@/lib/utils";

// ── Crosshair-marker rails ─────────────────────────────────────────────────
//
// The page-rail signature. Four small plus-glyphs at the four corners of the
// parent's content rectangle — "the cell at the intersection of the rails."
// Reads as a technical mark, never decoration: it says "measured, instrumented,
// on a grid" without saying anything literal.
//
// Locked as the page-rail signature in Phase 0 (gradient-bridge variants
// rejected). Production lift of the styleguide demo at /visual-system#crosshair-rails.
//
// Usage:
//   <section className="relative …">
//     <CrosshairRails />
//     …content…
//   </section>
//
// Renders absolute inset-0 inside a relative parent. Pointer-events disabled.
// Light surfaces → brand-navy at ~22% opacity. Dark surfaces (or under .dark)
// → white at ~22% opacity. Server component.

type CrosshairRailsProps = {
  className?: string;
};

// A single crosshair-marker glyph — a 1.5px-stroke plus sign at a rail
// intersection. 16x16 viewBox; rendered at h-4 w-4 (16px). Inherits
// `currentColor` so the wrapper sets the tone.
function Glyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="8" y1="1" x2="8" y2="15" />
      <line x1="1" y1="8" x2="15" y2="8" />
    </svg>
  );
}

export function CrosshairRails({ className }: CrosshairRailsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 text-brand-navy/[0.22] dark:text-white/[0.22]",
        className,
      )}
    >
      {/* Four crosshair glyphs — one at each corner of the parent's content
          rectangle. The negative inset (-translate-1/2) centres each glyph on
          its corner so the plus straddles the corner cleanly. */}
      <Glyph className="absolute -left-2 -top-2" />
      <Glyph className="absolute -right-2 -top-2" />
      <Glyph className="absolute -bottom-2 -left-2" />
      <Glyph className="absolute -bottom-2 -right-2" />
    </div>
  );
}
