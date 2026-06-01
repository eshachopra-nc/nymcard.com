"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Banknote, Plane, ShoppingBag, Snowflake } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── CardsUI ────────────────────────────────────────────────────────────────
//
// Homepage Products bento → Cards (wide cell). The straight electric-violet
// card object (retained from the original design — no wordmark/brand on the
// face) linked by a dotted connector to a CARD CONTROLS panel of real-time
// toggles (Freeze · ATM · eCommerce · Travel), per the handoff reference.
// Composed on the cool field (GlassBed → §8.1). Card stays STRAIGHT — never
// tilted or fanned. Maps to copy: "debit, credit, prepaid card programs with
// native processing and real-time controls."
//
// Motion (static at rest): scroll-in rise (card, then panel); on hover the card
// lifts (translate only) and the Travel control flips ON (the live change).
// Reduced-motion safe.

const CARD_SURFACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.55)}, transparent 56%),` +
  `radial-gradient(140% 130% at 104% 116%, ${withAlpha(visual.cyan, 0.34)}, transparent 60%),` +
  `linear-gradient(150deg, ${visual.purple}, ${tokens.color.brand.navy})`;

const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.7)} 50%, transparent)`;

export function CardsUI() {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };
  const riseItem: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
  };

  return (
    <GlassBed tone="violet">
      <motion.div
        className="relative flex h-full w-full items-center gap-4 p-6 sm:gap-6 sm:p-8"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* The electric-violet card — straight, vertical. No wordmark on face. */}
        <motion.div
          className="relative aspect-[1.586/1] w-[46%] max-w-[280px] shrink-0 transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-1.5"
          variants={riseItem}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_24px_50px_-18px_rgba(14,26,51,0.5),0_8px_18px_-8px_rgba(14,26,51,0.3)] ring-1 ring-inset ring-white/15"
            style={{ background: CARD_SURFACE }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: TOP_EDGE }} />
            {/* chip */}
            <span aria-hidden="true" className="absolute left-4 top-4 z-10 block h-6 w-9">
              <svg viewBox="0 0 44 32" className="size-full" fill="none">
                <rect x="0.6" y="0.6" width="42.8" height="30.8" rx="5" fill={withAlpha(visual.cyan, 0.1)} stroke={withAlpha(visual.white, 0.45)} />
                <path d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32" stroke={withAlpha(visual.white, 0.4)} strokeWidth="0.8" />
              </svg>
            </span>
            {/* contactless glyph */}
            <span aria-hidden="true" className="absolute right-4 top-4 z-10 block size-5 opacity-70">
              <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke={withAlpha(visual.white, 0.7)} strokeWidth="1.6" strokeLinecap="round">
                <path d="M8 7a7 7 0 0 1 0 10M12 5a10 10 0 0 1 0 14M4 9a4 4 0 0 1 0 6" />
              </svg>
            </span>
            {/* PAN — no wordmark */}
            <span aria-hidden="true" className="absolute bottom-4 left-4 z-10 font-mono text-[11px] tracking-[0.18em] text-white/65">
              •••• •••• •••• 4291
            </span>
          </div>
        </motion.div>

        {/* dotted connector — card → controls. */}
        <span aria-hidden="true" className="relative hidden h-px w-8 shrink-0 items-center sm:flex">
          <span className="absolute left-0 size-1.5 -translate-y-1/2 rounded-full bg-accent-cyan" />
          <span className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t border-dashed border-accent-cyan/70" />
          <span className="absolute right-0 size-1.5 -translate-y-1/2 rounded-full border border-accent-cyan" />
        </span>

        {/* Card controls — a frosted glass panel of real-time toggles. */}
        <motion.div className="min-w-0 flex-1" variants={riseItem}>
          <GlassSurface className="p-3.5 sm:p-4">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">
              Card controls
            </span>
            <div className="mt-2.5 h-px bg-surface-border-subtle dark:bg-white/10" />
            <div className="mt-3 flex flex-col gap-2">
              <ControlRow icon={<Snowflake className="size-3.5" />} label="Freeze" on={false} hoverToggles={false} />
              <ControlRow icon={<Banknote className="size-3.5" />} label="ATM" on hoverToggles={false} />
              <ControlRow icon={<ShoppingBag className="size-3.5" />} label="eCommerce" on hoverToggles={false} />
              <ControlRow icon={<Plane className="size-3.5" />} label="Travel" on={false} hoverToggles />
            </div>
          </GlassSurface>
        </motion.div>
      </motion.div>
    </GlassBed>
  );
}

function ControlRow({
  icon,
  label,
  on,
  hoverToggles,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  hoverToggles: boolean;
}) {
  const trackOn = "bg-brand-primary dark:bg-accent-cyan";
  const trackOff = "bg-text-muted/25 dark:bg-white/15";
  const track = on
    ? trackOn
    : hoverToggles
      ? `${trackOff} group-hover:bg-brand-primary dark:group-hover:bg-accent-cyan`
      : trackOff;
  const knobPos = on
    ? "translate-x-2.5"
    : hoverToggles
      ? "translate-x-0 group-hover:translate-x-2.5"
      : "translate-x-0";

  return (
    <div className="flex items-center justify-between rounded-md bg-white/50 px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10">
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="text-text-muted dark:text-text-dark-muted">{icon}</span>
        <span className="truncate font-body text-[12px] text-text-secondary dark:text-text-dark-secondary">{label}</span>
      </span>
      <span aria-hidden="true" className={`relative h-3.5 w-6 shrink-0 rounded-full transition-colors duration-300 ${track}`}>
        <span className={`absolute left-0.5 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${knobPos}`} />
      </span>
    </div>
  );
}
