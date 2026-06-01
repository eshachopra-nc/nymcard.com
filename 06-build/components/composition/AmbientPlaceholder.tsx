"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ── AmbientPlaceholder ─────────────────────────────────────────────────────
//
// The standard "awaiting handoff" surface for any visual slot that doesn't yet
// have a real product UI dropped in (TextImageRow rows, PageHero on industry
// pages, anywhere a UIPlaceholder used to sit). A cool atmosphere field with
// two slow orbital blobs and a periodic L→R cyan sheen, so the slot reads as
// a deliberate, breathing surface — never a flat box. Reduced-motion safe.
//
// Pass `label` for a small mono category line; pass `aspect` or `className` to
// size it per slot. Server-safe via "use client".

export function AmbientPlaceholder({
  label,
  className,
  aspect = "min-h-[20rem] lg:min-h-[22rem]",
  bordered = true,
}: {
  label?: string;
  className?: string;
  /** Sizing utilities (default: tall comfortable zone). */
  aspect?: string;
  /** Outer border + radius — turn off when the parent already provides them. */
  bordered?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        bordered &&
          "rounded-2xl border border-surface-border-subtle bg-surface-soft dark:border-surface-dark-border dark:bg-surface-dark-base/40",
        aspect,
        className,
      )}
    >
      {/* Static cool base — visible always (handles reduced motion). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.07] via-transparent to-brand-primary/[0.06]"
      />

      {!reduce && (
        <>
          {/* Cyan blob — orbits the upper-left. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10"
            style={{
              background:
                "radial-gradient(34% 30% at 28% 24%, rgba(34,211,238,0.18), transparent 70%)",
            }}
            animate={{ x: ["0%", "6%", "-4%", "0%"], y: ["0%", "-4%", "6%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Indigo blob — orbits the lower-right, opposite phase. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10"
            style={{
              background:
                "radial-gradient(38% 36% at 72% 78%, rgba(48,77,187,0.16), transparent 72%)",
            }}
            animate={{ x: ["0%", "-5%", "3%", "0%"], y: ["0%", "5%", "-3%", "0%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Periodic L→R cyan sheen sweep — the "alive" signal. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-full w-[22%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.10) 50%, transparent)",
            }}
            initial={{ x: "-130%" }}
            animate={{ x: "560%" }}
            transition={{
              duration: 6.4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2.2,
            }}
          />
        </>
      )}

      {/* Centred awaiting-handoff label — quiet, on-system. */}
      <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="grid size-9 place-items-center rounded-lg bg-brand-primary/[0.08] text-brand-primary ring-1 ring-inset ring-brand-primary/15 dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:ring-white/10">
          <ImageIcon className="size-4" />
        </span>
        {label && (
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            {label}
          </span>
        )}
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted/70 dark:text-text-dark-muted/70">
          awaiting handoff
        </span>
      </div>
    </div>
  );
}
