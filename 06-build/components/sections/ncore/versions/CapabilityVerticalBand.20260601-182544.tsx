"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── CapabilityCard (nCore Capabilities — AI / Insights) ─────────────────────
//
// AI and Insights are the two cross-cutting capabilities that run ACROSS the
// six products above. Per owner feedback (2026-06-01, items #4/#5/#6) they are
// now rendered as TWO SEPARATE, FULL-WIDTH cards — each carrying the EXACT same
// chrome as a `ProductsBento` tile — stacked directly beneath the products with
// a tight gap, so the whole thing reads as ONE continuous capabilities section
// rather than a detached band. (The previous shared bordered band with a
// spanning hairline + node markers is retired.)
//
// Card chrome (matches ProductsBento exactly):
//   · rounded-2xl, border (light border-surface-border-subtle / dark
//     border-surface-dark-border), card bg (light bg-surface-white; dark
//     bg-surface-dark-elevated at FULL opacity), `nc-card-hover` lift.
//   · Copy zone: eyebrow (capability name, mono brand/cyan) → headline → one-
//     line description, with an arrow affordance.
//   · Dark-mode legibility intents mirror the product cards: eyebrow
//     dark:text-accent-cyan, headline dark:text-text-on-brand, description
//     dark:text-text-dark-secondary, arrow cyan ≥20% / solid on hover.
//
// Full-width layout: a horizontal split — copy on the left (~2/5), the product
// UI on the right (~3/5) on >= lg; stacks copy-over-UI below lg. The visual zone
// is a fixed-aspect, positioned, clipped box so a `GlassBed` surface
// (absolute inset-0) fills it cleanly. Full width gives the surfaces the room
// they need (fixing the AI-UI overflow, #6).
//
// Motion: card rises + fades on scroll-into-view (once), `nc-card-hover` lift
// on hover; the inner surfaces own their own scroll-in + hover gestures.
// Reduced-motion safe.

export type CapabilityCardData = {
  /** The capability name — e.g. "AI". Rendered as the card eyebrow. */
  label: string;
  /** The one-line claim (verbatim copy), rendered as the card's lead. */
  line: string;
  /** The product-visual surface for this card (fills the visual zone). */
  visual: ReactNode;
};

type CapabilityCardProps = CapabilityCardData & {
  /** Reveal stagger index for the scroll-in. */
  index?: number;
  className?: string;
};

export function CapabilityCard({
  label,
  line,
  visual,
  index = 0,
  className,
}: CapabilityCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduced
          ? undefined
          : { duration: dur.deliberate, ease: ease.out, delay: index * 0.06 }
      }
      className={cn(
        "nc-card-hover group relative grid overflow-hidden rounded-2xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        // Stack copy-over-UI below lg; horizontal split (copy 2/5 · UI 3/5) at lg.
        "grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        className,
      )}
    >
      {/* Copy zone — eyebrow (capability name) → headline → description, with
          an arrow affordance. Matches the ProductsBento copy hierarchy. */}
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
            {label}
          </p>
          {/* Arrow chip — matches the bento affordance; visible in dark. */}
          <span
            aria-hidden="true"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors duration-200 group-hover:bg-brand-purple group-hover:text-white dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:group-hover:bg-accent-cyan dark:group-hover:text-brand-navy lg:hidden"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="max-w-md font-display text-lg font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand sm:text-xl">
          {line}
        </p>
      </div>

      {/* Visual zone — the product-UI surface. A positioned, clipped box with a
          full-width aspect (wide + short) so a GlassBed surface (absolute
          inset-0) fills it cleanly with NO overflow. A hairline separates it
          from the copy: a left border at lg (horizontal split), a top border
          when stacked. */}
      <div className="relative min-h-[16rem] border-t border-surface-border-subtle/70 dark:border-surface-dark-border lg:min-h-[18rem] lg:border-l lg:border-t-0">
        {visual}
      </div>
    </motion.div>
  );
}
