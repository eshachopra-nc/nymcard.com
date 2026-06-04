import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CrosshairRails } from "@/components/visuals";
import { StaggerList } from "./Reveal";

// ── Archetype · Big-figure row ──────────────────────────────────────────────
//
// The proof metrics at OVERSIZED scale — huge display figures, hairline-
// separated, deliberately airy. Where StatBand (§8.32) is the contained,
// text-4xl light beat, BigFigureRow is the scale moment: figures at display
// size (text-6xl+) with generous whitespace, the numbers themselves the design.
// The opposite of a dense card grid — a wide, quiet row where the figures do
// the talking.
//
// Two grounds via `tone`:
//   • `light`  — figures gradient-anchored cyan→primary on the section surface;
//                the caller wraps it in its own <Section>. A light rhythm break.
//   • `dark`   — a SELF-CONTAINED full-bleed deep-cool band (both themes): it
//                renders its own navy field, max-w container, padding, crosshair
//                signature and an optional `heading`, so a page can drop it in as
//                a considered dark proof beat without a Section wrapper. Figures
//                in near-white with a cyan-accented divider.
//
// Figures reveal left-to-right on scroll via StaggerList; reduced-motion renders
// them at rest. Tokens only, cool palette, light + dark. Server component (dark
// composes only static layers). Figures are real, defensible proof points —
// callers pass real values, never fabricated metrics.

export type BigFigure = {
  /** The figure — e.g. "99.99%", "<2s", "1,000+". Kept short. */
  value: string;
  /** A short label beneath the figure. */
  label: string;
};

type BigFigureRowProps = {
  figures: BigFigure[];
  /** `light` (default) on the section surface, or `dark` self-contained band. */
  tone?: "light" | "dark";
  /** Optional heading rendered above the figures (dark band only). */
  heading?: ReactNode;
  className?: string;
};

export function BigFigureRow({
  figures,
  tone = "light",
  heading,
  className,
}: BigFigureRowProps) {
  const dark = tone === "dark";

  const grid = (
    <StaggerList
      as="ul"
      step={0.1}
      itemClassName="list-none"
      className={cn(
        "relative z-10 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
        // DARK band: no vertical dividers — generous column gap lets the figures
        // stand alone (the dividers crowded the large numerals; owner, 4 June).
        // LIGHT tone keeps the hairline dividers.
        dark
          ? "lg:gap-x-12"
          : "divide-surface-border-subtle lg:divide-x dark:divide-surface-dark-border",
        !dark && className,
      )}
    >
      {figures.map((figure) => (
        <Figure key={figure.label} figure={figure} dark={dark} />
      ))}
    </StaggerList>
  );

  if (!dark) return grid;

  return (
    <div
      className={cn(
        // SELF-CONTAINED full-bleed DARK band (both themes). Deep cool pooling on
        // a navy bed (§8.1 deep-field recipe), static so it's reduced-motion safe
        // by construction.
        "dark relative isolate overflow-hidden bg-surface-dark-base",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_0%,rgba(48,77,187,0.22),transparent_60%),radial-gradient(60%_55%_at_92%_8%,rgba(34,211,238,0.12),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
        <CrosshairRails />
        {heading && <div className="mb-14 max-w-2xl sm:mb-16">{heading}</div>}
        {grid}
      </div>
    </div>
  );
}

function Figure({ figure, dark }: { figure: BigFigure; dark: boolean }) {
  return (
    // Light tone pads each cell off its divider; dark tone has no divider, so the
    // grid's column gap does the separating (no inner padding to crowd numerals).
    <div className={cn(dark ? "" : "px-0 lg:px-10 lg:first:pl-0")}>
      <span
        className={cn(
          "block font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.5rem]",
          dark
            ? "text-text-on-brand"
            : "bg-gradient-to-br from-accent-cyan to-brand-primary bg-clip-text text-transparent dark:from-accent-cyan dark:to-accent-indigo",
        )}
      >
        {figure.value}
      </span>
      <span
        className={cn(
          "mt-4 block max-w-[22ch] font-body text-sm leading-relaxed sm:text-base",
          dark ? "text-text-dark-secondary" : "text-text-secondary dark:text-text-dark-secondary",
        )}
      >
        {figure.label}
      </span>
    </div>
  );
}
