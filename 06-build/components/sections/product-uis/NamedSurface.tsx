"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { GlassBed, GlassSurface, type GlassTone } from "./glass";
import { cn } from "@/lib/utils";

// ── NamedSurface ───────────────────────────────────────────────────────────
//
// A product-UI slot that AUTO-LOADS a named handoff SVG when present and
// otherwise shows a clean labelled placeholder naming the exact file it
// expects. Drop `/public/handoff/home/{name}.svg` and it appears on next load;
// until then the zone reads as a deliberate, on-system placeholder (never an
// empty box or a broken image). No looping scan, no fabricated chrome.
//
// `framed` (default): wraps the slot in the canonical glass kit (GlassSurface
// over GlassBed/GlassAtmosphere, §8.1) — use standalone, e.g. a FeatureShowcase
// zone. `framed={false}`: a transparent slot for when the container already
// supplies the glass (e.g. a CardGrid `glass` cell), so the glass never doubles.

const Inner = ({ name, label, missing, onError }: { name: string; label?: string; missing: boolean; onError: () => void }) =>
  missing ? (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="grid size-9 place-items-center rounded-lg bg-brand-primary/[0.08] text-brand-primary ring-1 ring-inset ring-brand-primary/15 dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:ring-white/10">
        <ImageIcon className="size-4" />
      </span>
      <span className="font-mono text-[11px] tracking-tight text-text-secondary dark:text-text-dark-secondary">
        {name}.svg
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        handoff · drop to fill
      </span>
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- handoff SVG slot
    <img
      src={`/handoff/home/${name}.svg`}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      className="block h-full w-full object-contain"
      onError={onError}
      loading="lazy"
      decoding="async"
    />
  );

export function NamedSurface({
  name,
  label,
  tone = "cyan",
  framed = true,
  className,
}: {
  /** Handoff filename (no extension) expected under /public/handoff/home/. */
  name: string;
  label?: string;
  tone?: GlassTone;
  /** Wrap in the glass kit (standalone) vs render a bare slot (glass container supplies it). */
  framed?: boolean;
  className?: string;
}) {
  const [missing, setMissing] = useState(false);
  const inner = <Inner name={name} label={label} missing={missing} onError={() => setMissing(true)} />;

  if (!framed) {
    return (
      <div className={cn("relative grid h-full min-h-[9rem] w-full place-items-center overflow-hidden p-2", className)}>
        {inner}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full min-h-[10rem] w-full overflow-hidden rounded-xl sm:min-h-[11rem]", className)}>
      <GlassBed tone={tone}>
        <div className="absolute inset-0 p-3 sm:p-4">
          <GlassSurface className="grid h-full w-full place-items-center p-4">{inner}</GlassSurface>
        </div>
      </GlassBed>
    </div>
  );
}
