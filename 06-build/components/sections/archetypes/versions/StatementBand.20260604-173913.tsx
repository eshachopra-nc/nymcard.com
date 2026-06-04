import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlassAtmosphere, CrosshairRails } from "@/components/visuals";
import { StaggerList } from "./Reveal";

// ── Archetype · Statement band ──────────────────────────────────────────────
//
// A full-bleed DARK band carrying ONE oversized editorial statement (display
// scale) and almost nothing else — the page's CONTRAST ANCHOR. Where the rest
// of a content page is light and stacked, this is a deep cool field with a huge
// headline that the eye lands on. The opposite of a card grid: no boxes, no
// glass panels, one big idea on a dark ground.
//
// An OPTIONAL `items` slot renders a quiet horizontal row of label + one-liner
// pairs beneath the statement, hairline-separated — so the band can also carry
// a small modular set (e.g. "what you can launch") WITHOUT becoming a card
// grid. The items read as a typographic row on the dark field, not cards.
//
// ALWAYS DARK in both themes (a deliberate dark beat, never theme-dependent) —
// it composes the cool GlassAtmosphere field on a navy bed, exactly the
// BridgeBand recipe. Tokens only, cool palette, reduced-motion safe. The field
// drifts ambiently; the statement + items reveal once on scroll. Server
// component (it only composes the client GlassAtmosphere + StaggerList).

export type StatementItem = {
  /** Short label — 1–3 words. */
  label: string;
  /** One sentence. */
  body: string;
  /** Optional leading icon element. */
  icon?: ReactNode;
};

type StatementBandProps = {
  /** The oversized statement — the one big idea. */
  statement: string;
  /** Optional lede above or below the statement. */
  lede?: string;
  /** Optional horizontal row of modular items beneath the statement. */
  items?: StatementItem[];
  /** Atmosphere tone for the dark field. Default indigo — the platform tone. */
  tone?: "indigo" | "cyan" | "violet" | "azure";
  className?: string;
};

export function StatementBand({
  statement,
  lede,
  items,
  tone = "indigo",
  className,
}: StatementBandProps) {
  return (
    <div
      className={cn(
        // ALWAYS DARK — the considered contrast moment. The forced `dark`
        // context flips the atmosphere, text and crosshairs to their dark
        // variants and the cyan field glows on the deep ground.
        "dark relative isolate overflow-hidden bg-surface-dark-base",
        className,
      )}
    >
      {/* The contained cool field — the band's dimensional bed, drifting. */}
      <GlassAtmosphere tone={tone} animated className="absolute inset-0" />

      {/* Soft top-edge highlight so the band reads as a lit surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-20 lg:py-32">
        <CrosshairRails />

        {lede && (
          <p className="mb-6 max-w-[52ch] font-mono text-[13px] uppercase tracking-[0.18em] text-accent-cyan/80">
            {lede}
          </p>
        )}

        {/* The oversized statement — display scale, the page's largest type. */}
        <h2 className="max-w-[20ch] font-display text-4xl font-bold leading-[1.04] tracking-tight text-text-on-brand sm:text-5xl lg:text-6xl">
          {statement}
        </h2>

        {/* Optional modular row — a quiet typographic row on the dark field,
            hairline-separated. NOT cards. */}
        {items && items.length > 0 && (
          <StaggerList
            as="ul"
            step={0.08}
            itemClassName="list-none"
            className={cn(
              "mt-14 grid gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4",
              "lg:divide-x lg:divide-white/10",
            )}
          >
            {items.map((item) => (
              <li key={item.label} className="group px-0 lg:px-8 lg:first:pl-0">
                {item.icon && (
                  <span
                    aria-hidden="true"
                    className="mb-5 inline-flex size-10 items-center justify-center rounded-md text-accent-cyan ring-1 ring-inset ring-white/15 transition-colors duration-300 group-hover:ring-accent-cyan/40 [&_svg]:size-[18px]"
                  >
                    {item.icon}
                  </span>
                )}
                <p className="font-display text-lg font-semibold tracking-tight text-text-on-brand">
                  {item.label}
                </p>
                <p className="mt-2 max-w-[28ch] font-body text-sm leading-relaxed text-text-dark-secondary">
                  {item.body}
                </p>
              </li>
            ))}
          </StaggerList>
        )}
      </div>
    </div>
  );
}
