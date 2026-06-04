"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  Wallet,
  ArrowLeftRight,
  Receipt,
  CreditCard,
  User,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── DigitalWalletsRecordVisual (Digital Wallets §5 — Powered by nCore) ───────
//
// ONE customer record, every wallet interaction reading from it. A single
// trusted customer-record node sits at the TOP as the source of truth; four
// wallet interactions — Balance · Transfer · Payment · Card — hang BELOW it,
// each wired up to the same record by a read connector that draws on scroll
// and lights live. The point is the opposite of dedup: it is a ONE → MANY fan-
// out where every interaction reads the same record in real time. The record
// node is the ONE focal element; the four interactions are peers reading from it.
//
// Distinct from every existing surface — and explicitly NOT OneCustomerVisual:
//   • OneCustomerVisual is a ×3 → ×1 LEFT-TO-RIGHT convergence (three duplicate
//     records dedup into one). This is a ×1 → ×4 TOP-DOWN fan-out (one record
//     feeding four live wallet interactions). Different topology, different story.
//   • BaaSBundleVisual is a 2×2 ring → centre core. EmbeddedFinance pair is a
//     shell stack / scattered-vendor ring. The loop visual is a device frame.
//
// Maps to copy: "One customer record… support every interaction." Chips avoid
// echoing the four left-column benefits (no "one customer record", no "real-time
// processing") — the interaction labels carry a one-word read state instead.
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — same treatment as
// the homepage Products surfaces, light AND dark.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in — the record node settles, the four read connectors draw down,
//     then each interaction's "reading" state commits one-by-one
//     (useSequentialReveal — scroll AND hover, latched, reduced-motion safe).
//   • hover (group) — the record node glows brighter and a single cyan pulse
//     descends each connector into the interactions (the live-read beat).

type Interaction = {
  name: string;
  state: string;
  icon: LucideIcon;
  // x-position of the connector's bottom endpoint in the 100-wide viewBox
  x: number;
};

const INTERACTIONS: Interaction[] = [
  { name: "Balance", state: "Reading", icon: Wallet, x: 12.5 },
  { name: "Transfer", state: "Reading", icon: ArrowLeftRight, x: 37.5 },
  { name: "Payment", state: "Reading", icon: Receipt, x: 62.5 },
  { name: "Card", state: "Reading", icon: CreditCard, x: 87.5 },
];

export function DigitalWalletsRecordVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  // sequential reveal for the four interaction read-states
  const { ref: seqRef, n, bind } = useSequentialReveal(INTERACTIONS.length, { start: 700, step: 180 });

  const node: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.spring } },
  };
  const lane: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } },
  };
  const tile: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div
          ref={(el) => {
            ref.current = el;
            seqRef.current = el;
          }}
          {...bind}
          className="group/rec flex h-full flex-col p-4 sm:p-5"
        >
          {/* Header — the system frame. */}
          <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
            <Eyebrow>Powered by nCore</Eyebrow>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent-teal dark:text-accent-cyan"
              style={{
                background: withAlpha(visual.cyan, 0.12),
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }}
              />
              One record
            </span>
          </div>

          <div className="relative my-auto py-3">
            {/* The customer-record node — the ONE focal element, at the top. */}
            <motion.div
              className="relative z-10 mx-auto w-fit"
              initial={reduced ? false : "hidden"}
              animate={inView ? (reduced ? undefined : "show") : undefined}
              variants={reduced ? undefined : node}
            >
              <RecordNode />
            </motion.div>

            {/* Read connectors — one record fanning down to four interactions. */}
            <svg
              aria-hidden="true"
              className="pointer-events-none relative z-0 mt-1 block h-9 w-full sm:h-11"
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="dw-rec-spoke" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={withAlpha(visual.primary, 0.5)} />
                  <stop offset="100%" stopColor={withAlpha(visual.cyan, 0.9)} />
                </linearGradient>
              </defs>
              {INTERACTIONS.map((it, i) => (
                <g key={it.name}>
                  <motion.path
                    d={`M 50 1 C 50 14, ${it.x} 10, ${it.x} 29`}
                    fill="none"
                    stroke="url(#dw-rec-spoke)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-70 transition-opacity duration-500 group-hover/rec:opacity-100"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={inView ? (reduced ? undefined : { pathLength: 1, opacity: 0.7 }) : undefined}
                    transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.4 + i * 0.06 }}
                  />
                  {/* a cyan read-pulse descending the connector on hover */}
                  {!reduced && (
                    <motion.circle
                      r={1.5}
                      fill={visual.cyan}
                      className="opacity-0 group-hover/rec:opacity-100"
                      initial={false}
                      animate={{
                        cx: [50, it.x],
                        cy: [1, 29],
                      }}
                      transition={{
                        duration: dur.deliberate,
                        ease: ease.inOut,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        delay: i * 0.12,
                      }}
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* The four wallet interactions reading from the record. */}
            <motion.div
              className="relative z-10 grid grid-cols-4 gap-1.5 sm:gap-2"
              variants={reduced ? undefined : lane}
              initial={reduced ? false : "hidden"}
              animate={inView ? (reduced ? undefined : "show") : undefined}
            >
              {INTERACTIONS.map((it, i) => (
                <motion.div key={it.name} variants={reduced ? undefined : tile}>
                  <InteractionTile interaction={it} reading={n > i} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Verdict — one record, every interaction. */}
          <motion.div
            className="flex items-center justify-between gap-3 border-t border-surface-border-subtle pt-2.5 dark:border-white/10"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 1.1 }}
          >
            <SubLabel>1 record · 4 interactions</SubLabel>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
              One audit trail
            </span>
          </motion.div>
        </div>
      </IllustrationCard>
    </>
  );
}

// The single customer-record node — the source of truth every interaction reads.
// A glowing cyan→primary card with an identity glyph, a customer label and a
// verified read state. The surface's ONE focal element.
function RecordNode() {
  return (
    <span
      className="relative flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 transition-shadow duration-500 group-hover/rec:shadow-[0_0_44px_rgba(34,211,238,0.65),0_18px_34px_-10px_rgba(48,77,187,0.6),inset_0_0_0_1px_rgba(255,255,255,0.6)]"
      style={{
        background: `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.95)})`,
        boxShadow: `0 0 30px ${withAlpha(visual.cyan, 0.5)}, 0 16px 30px -10px ${withAlpha(visual.primary, 0.55)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.55)}`,
      }}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-[9px]"
        style={{ background: withAlpha(visual.white, 0.22), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.35)}` }}
      >
        <User className="size-4 text-white" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/75">
          Customer record
        </span>
        <span className="font-display text-[13px] font-bold leading-tight tracking-tight text-white">
          One profile
        </span>
      </span>
    </span>
  );
}

// A wallet interaction reading from the record — icon chip, name, and a read
// state that commits (cyan dot) on the sequential beat.
function InteractionTile({ interaction, reading }: { interaction: Interaction; reading: boolean }) {
  const Icon = interaction.icon;
  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-[11px] bg-white/55 px-1.5 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_10px_-6px_rgba(14,26,51,0.18)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
    >
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-md text-white shadow-[0_3px_8px_-3px_rgba(48,77,187,0.5)]"
        style={{ background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})` }}
      >
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <span className="truncate text-[10px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
        {interaction.name}
      </span>
      <span className="flex items-center gap-1">
        <PopIn show={reading}>
          <span
            className="block size-1.5 rounded-full"
            style={{ background: visual.cyan, boxShadow: `0 0 6px ${visual.cyan}` }}
          />
        </PopIn>
        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
          {interaction.state}
        </span>
      </span>
    </div>
  );
}
