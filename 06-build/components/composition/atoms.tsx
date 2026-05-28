import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Composition atoms ──────────────────────────────────────────────────────
//
// The two shared building blocks for the composition system: the editorial
// eyebrow label, and the abstract placeholder mark. Kept deliberately minimal
// — composition primitives carry layout and atmosphere, never bespoke chrome
// or fake product UI.

/**
 * The mono eyebrow that opens an editorial block. Uppercased by default;
 * pass `caps={false}` to preserve brand casing (e.g. "nCore").
 *
 * Phase 1.5 — `marker={true}` prepends a small crosshair micro-glyph (the
 * page-rail signature, at 10px) so the eyebrow reads as a measured rail-mark
 * rather than a free-floating label. Opt-in so the existing call sites stay
 * untouched; pages and primitives can choose to surface it.
 */
export function Eyebrow({
  children,
  caps = true,
  marker = false,
}: {
  children: ReactNode;
  caps?: boolean;
  marker?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-mono text-[11px] tracking-[0.2em] text-brand-primary dark:text-accent-cyan",
        caps && "uppercase",
      )}
    >
      {marker ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          className="h-2.5 w-2.5 shrink-0 text-brand-primary/65 dark:text-accent-cyan/65"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}

// An abstract infrastructural figure — orbits and nodes, never a chart or a
// data visualisation. Inherits `currentColor`, so the parent sets the tone. It
// fills a placeholder visual zone so it reads as "a system", abstractly.
export function AbstractMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="60" cy="60" r="47" strokeOpacity="0.13" />
      <circle cx="60" cy="60" r="31" strokeOpacity="0.2" />
      <circle cx="60" cy="60" r="15" strokeOpacity="0.28" />
      <path d="M60 13 V60 H107 M60 60 L25 95" strokeOpacity="0.26" />
      <circle cx="60" cy="13" r="2.6" fill="currentColor" stroke="none" fillOpacity="0.55" />
      <circle cx="107" cy="60" r="2.6" fill="currentColor" stroke="none" fillOpacity="0.55" />
      <circle cx="25" cy="95" r="2.6" fill="currentColor" stroke="none" fillOpacity="0.4" />
      <circle cx="60" cy="60" r="3.4" fill="currentColor" stroke="none" fillOpacity="0.72" />
    </svg>
  );
}
