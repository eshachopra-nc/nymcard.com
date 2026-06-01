"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── CardsUI ────────────────────────────────────────────────────────────────
//
// Homepage Products bento → Cards (wide cell). A bespoke, full-bleed product
// surface — fills the cell's visual zone edge-to-edge (no inner radius). Maps
// to copy: "debit, credit, prepaid card programs with native processing and
// real-time controls."
//
// Composition (an art-directed split, NOT the hero's fanned card carousel):
//   · Left — one STRAIGHT, vertical electric-violet card (never tilted, never
//     fanned). The standout finish per the brief.
//   · Right — a small "program" control rail: three program tabs (Debit /
//     Credit / Prepaid, the active one lit) over two real-time control toggles.
//
// Motion:
//   · Ambient — a single sheen drifts across the card face (sine), suppressed
//     under prefers-reduced-motion. The card itself never moves/tilts.
//   · Entrance — the card + program rail rise + fade in on scroll-into-view
//     (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the card
//     lifts a few px (translate only, never a tilt/scale — design-system.md
//     bans tilted cards), its glow deepens, and the second control toggle
//     ("ATM withdrawals") flips on — a real-time control change you can see.
//   Reduced-motion safe (no entrance transform, no hover lift; toggles still
//   flip on hover since that's a sub-200ms responsive state, preserved per
//   Rule 6 — but gated to no-transform so nothing animates under reduced).

// Electric-violet card finish — the standout (design-system.md §3 violet voice,
// PaymentCard `electric`). Cool-only; every stop from a token via withAlpha.
const CARD_SURFACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.55)}, transparent 56%),` +
  `radial-gradient(140% 130% at 104% 116%, ${withAlpha(visual.cyan, 0.34)}, transparent 60%),` +
  `linear-gradient(150deg, ${visual.purple}, ${tokens.color.brand.navy})`;

const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.7)} 50%, transparent)`;

const PROGRAMS = ["Debit", "Credit", "Prepaid"] as const;
// `hoverToggles: true` means the control flips on when the parent cell is
// hovered — a live real-time control change. "Online payments" is on at rest;
// "ATM withdrawals" flips on under hover.
const CONTROLS = [
  { label: "Online payments", on: true, hoverToggles: false },
  { label: "ATM withdrawals", on: false, hoverToggles: true },
] as const;

export function CardsUI() {
  const reduced = useReducedMotion();
  const t = useTime();
  // Ambient sheen drifting left→right across the card face.
  const sheenX = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 9000) * 2 * Math.PI) * 18,
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: LIGHT_BED }}
    >
      {/* dark wash sits over the light bed only in dark mode */}
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{ background: DARK_BED }}
      />

      <div className="relative flex h-full w-full items-center gap-5 p-6 sm:gap-7 sm:p-8">
        {/* The card — straight, vertical, electric-violet. Lifts a few px on
            cell hover (translate only — never tilted/scaled). */}
        <motion.div
          className="relative aspect-[1.586/1] w-[52%] max-w-[300px] shrink-0 transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-1.5"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_24px_50px_-18px_rgba(14,26,51,0.45),0_8px_18px_-8px_rgba(14,26,51,0.3)] ring-1 ring-inset ring-white/15 transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-18px_rgba(14,26,51,0.5),0_10px_22px_-8px_rgba(14,26,51,0.34)]"
            style={{ background: CARD_SURFACE }}
          >
            {/* cyan top edge — brand cue */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
              style={{ background: TOP_EDGE }}
            />
            {/* drifting sheen */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                x: sheenX,
                background: `linear-gradient(118deg, transparent 38%, ${withAlpha(visual.white, 0.12)} 50%, transparent 62%)`,
              }}
            />
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
            {/* number row */}
            <span aria-hidden="true" className="absolute bottom-8 left-4 z-10 font-mono text-[11px] tracking-[0.18em] text-white/65">
              •••• •••• •••• 4291
            </span>
            {/* NymCard mark — text mark, never a fabricated 3rd-party brand */}
            <span aria-hidden="true" className="absolute bottom-3.5 left-4 z-10 font-display text-[10px] font-semibold tracking-[0.14em] text-white/80">
              NymCard
            </span>
          </div>
        </motion.div>

        {/* Program rail — tabs + real-time controls. */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* program tabs */}
          <div className="flex flex-wrap gap-1.5">
            {PROGRAMS.map((p, i) => (
              <span
                key={p}
                className={
                  i === 0
                    ? "rounded-md bg-brand-primary/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-primary ring-1 ring-inset ring-brand-primary/25 dark:bg-accent-cyan/[0.16] dark:text-accent-cyan dark:ring-accent-cyan/30"
                    : "rounded-md bg-surface-soft/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:text-text-dark-muted dark:ring-white/10"
                }
              >
                {p}
              </span>
            ))}
          </div>

          {/* real-time control toggles. The hover-toggling control flips on
              when the parent cell is hovered (group-hover) — a live control
              change. Track colours + knob position both transition. */}
          <div className="flex flex-col gap-2">
            {CONTROLS.map((c) => {
              // base = on at rest; hover = also reads "on" while hovered.
              const trackOn = "bg-brand-primary dark:bg-accent-cyan";
              const trackOff = "bg-text-muted/25 dark:bg-white/15";
              const track = c.on
                ? trackOn
                : c.hoverToggles
                  ? `${trackOff} group-hover:bg-brand-primary dark:group-hover:bg-accent-cyan`
                  : trackOff;
              // Knob is anchored left and travels by translate-x so the slide
              // animates smoothly. Track inner travel = w-6 (1.5rem) − knob
              // (0.625rem) − 2×pad (0.25rem) = 0.625rem = translate-x-2.5.
              const knobPos = c.on
                ? "left-0.5 translate-x-2.5"
                : c.hoverToggles
                  ? "left-0.5 group-hover:translate-x-2.5"
                  : "left-0.5";
              return (
                <div
                  key={c.label}
                  className="flex items-center justify-between rounded-md bg-surface-white/70 px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.03] dark:ring-white/10"
                >
                  <span className="truncate font-body text-[12px] text-text-secondary dark:text-text-dark-secondary">
                    {c.label}
                  </span>
                  {/* toggle */}
                  <span
                    aria-hidden="true"
                    className={`relative h-3.5 w-6 shrink-0 rounded-full transition-colors duration-300 ${track}`}
                  >
                    <span
                      className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ${knobPos}`}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Soft cool bed (slate tone) — faint two-stop wash on white. Flush to the cell.
const LIGHT_BED =
  `radial-gradient(120% 110% at 16% 4%, ${withAlpha(visual.primary, 0.07)}, transparent 60%),` +
  `radial-gradient(120% 120% at 98% 104%, ${withAlpha(visual.indigo, 0.08)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;

const DARK_BED =
  `radial-gradient(120% 110% at 16% 4%, ${withAlpha(visual.primary, 0.18)}, transparent 60%),` +
  `radial-gradient(120% 120% at 98% 104%, ${withAlpha(visual.indigo, 0.16)}, transparent 64%)`;
