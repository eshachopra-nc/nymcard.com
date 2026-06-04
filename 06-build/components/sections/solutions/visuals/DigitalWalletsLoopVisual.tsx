"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
} from "@/components/visuals/product-illustration";

// ── DigitalWalletsLoopVisual (Digital Wallets §2 — The Opportunity) ──────────
//
// The wallet IS the experience: a single branded mobile-wallet device frame in
// which money arrives, sits as one balance, moves, and spends — receive →
// store → move → spend, all in ONE surface. The device shows a focal balance
// (store value), a Receive / Send action pair (move money), and a short
// activity list whose rows step through the four loop moments (an incoming
// transfer, a card spend, an outgoing transfer). The branded wallet device is
// the ONE focal subject; the balance is its centrepiece.
//
// Distinct from every existing surface:
//   • A literal mobile-wallet DEVICE frame — no other product UI is a phone
//     surface. BaaSBundleVisual is a hub-and-spoke ring; the EmbeddedFinance
//     pair is a host-product shell stack / scattered-vendor ring; the homepage
//     surfaces are flows/consoles. This is the customer-facing wallet itself.
//
// Maps to copy: "where money arrives, where payments happen, and where
// financial services begin… store value, move money, spend anywhere." Chips
// avoid echoing the four left-column expectations (no "store value", no "move
// money") — they carry the loop as a quiet four-stop legend instead.
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — same treatment as
// the homepage Products surfaces, light AND dark.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in — the device fades up, the balance counts up, the action pair
//     and activity rows reveal one-by-one (whileInView, once).
//   • hover (group) — the device lifts, the balance brightens, and a single
//     cyan pulse rides the loop legend (receive → store → move → spend).
//     Reduced motion shows the settled state immediately.

type Activity = {
  label: string;
  meta: string;
  amount: string;
  dir: "in" | "out" | "card";
  icon: LucideIcon;
};

// On-system, neutral activity — no third-party brands, no fabricated merchants.
// Each row maps to one moment of the loop without echoing the section copy.
const ACTIVITY: Activity[] = [
  { label: "Funds received", meta: "Incoming transfer", amount: "+ 420.00", dir: "in", icon: ArrowDownLeft },
  { label: "Card purchase", meta: "Contactless", amount: "− 38.50", dir: "card", icon: CreditCard },
  { label: "Sent to contact", meta: "Wallet transfer", amount: "− 120.00", dir: "out", icon: ArrowUpRight },
];

// The four loop stops — a quiet legend beneath the device.
const LOOP = ["Receive", "Store", "Move", "Spend"] as const;

export function DigitalWalletsLoopVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} className="group/wallet flex h-full items-center justify-center p-4 sm:p-5">
          {/* The branded wallet device — the ONE focal subject. */}
          <motion.div
            className="relative w-full max-w-[228px]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.slow, ease: ease.spring }}
          >
            <div
              className="relative overflow-hidden rounded-[26px] p-2 transition-transform duration-500 group-hover/wallet:-translate-y-1"
              style={{
                background: `linear-gradient(160deg, ${withAlpha(visual.navy, 0.96)}, ${withAlpha(visual.primary, 0.9)})`,
                boxShadow: `0 26px 52px -18px ${withAlpha(visual.navy, 0.62)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              {/* Screen */}
              <div
                className="relative overflow-hidden rounded-[20px] px-3.5 pb-3.5 pt-3"
                style={{
                  background: `linear-gradient(165deg, ${withAlpha(visual.white, 0.1)}, ${withAlpha(visual.navy, 0.18)})`,
                  boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.1)}`,
                }}
              >
                {/* notch */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1.5 h-1 w-12 -translate-x-1/2 rounded-full"
                  style={{ background: withAlpha(visual.white, 0.22) }}
                />

                {/* Wallet header — brand identity, not a status echo. */}
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="grid size-4 place-items-center rounded-[5px]"
                      style={{ background: `linear-gradient(135deg, ${visual.cyan}, ${visual.primary})` }}
                    >
                      <span className="size-1.5 rounded-[2px] bg-white/90" />
                    </span>
                    <span className="font-display text-[10px] font-semibold tracking-tight text-white/90">
                      Wallet
                    </span>
                  </span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/45">
                    USD
                  </span>
                </div>

                {/* Balance — store value, the centrepiece. */}
                <div className="mt-3">
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/45">
                    Available balance
                  </span>
                  <motion.div
                    className="mt-1 font-display text-[26px] font-bold leading-none tracking-tight text-white transition-[text-shadow] duration-500"
                    style={{ textShadow: `0 0 0px ${withAlpha(visual.cyan, 0)}` }}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={inView ? (reduced ? undefined : { opacity: 1 }) : undefined}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.25 }}
                  >
                    <span className="text-[15px] align-top text-white/70">$</span>4,261
                    <span className="text-[15px] text-white/60">.50</span>
                  </motion.div>
                </div>

                {/* Action pair — move money (Receive / Send). */}
                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <Action label="Receive" icon={ArrowDownLeft} primary />
                  <Action label="Send" icon={ArrowUpRight} />
                </div>

                {/* Activity — the loop in motion. */}
                <div className="mt-3.5 flex items-center justify-between">
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/45">
                    Activity
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em]"
                    style={{
                      color: visual.cyan,
                      background: withAlpha(visual.cyan, 0.14),
                      boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`,
                    }}
                  >
                    <span
                      className="size-1 rounded-full"
                      style={{ background: visual.cyan, boxShadow: `0 0 6px ${visual.cyan}` }}
                    />
                    Live
                  </span>
                </div>
                <motion.div
                  className="mt-2 space-y-1.5"
                  variants={reduced ? undefined : list}
                  initial={reduced ? false : "hidden"}
                  animate={inView ? (reduced ? undefined : "show") : undefined}
                >
                  {ACTIVITY.map((a) => (
                    <motion.div key={a.label} variants={reduced ? undefined : row}>
                      <ActivityRow activity={a} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Loop legend — receive → store → move → spend, with a pulse on hover. */}
            <motion.div
              className="mt-3 flex items-center justify-center gap-1.5"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? (reduced ? undefined : { opacity: 1 }) : undefined}
              transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.95 }}
            >
              {LOOP.map((stop, i) => (
                <span key={stop} className="flex items-center gap-1.5">
                  <span className="relative">
                    <span
                      className="block size-1.5 rounded-full"
                      style={{ background: withAlpha(visual.cyan, 0.5) }}
                    />
                    {!reduced && (
                      <motion.span
                        className="absolute inset-0 rounded-full opacity-0 group-hover/wallet:opacity-100"
                        style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: dur.deliberate,
                          ease: ease.inOut,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                          delay: i * 0.22,
                        }}
                      />
                    )}
                  </span>
                  <SubLabel className="text-[8px]">{stop}</SubLabel>
                  {i < LOOP.length - 1 && (
                    <span
                      className="h-px w-2.5"
                      style={{ background: withAlpha(visual.primary, 0.3) }}
                    />
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* a11y + system framing — kit eyebrow, kept out of the device. */}
          <span className="sr-only">
            <Eyebrow>Branded wallet</Eyebrow>
          </span>
        </div>
      </IllustrationCard>
    </>
  );
}

// A wallet action button — Receive (primary cyan) / Send (glass).
function Action({ label, icon: Icon, primary }: { label: string; icon: LucideIcon; primary?: boolean }) {
  return (
    <span
      className="flex items-center justify-center gap-1.5 rounded-[10px] py-1.5 transition-shadow duration-500"
      style={
        primary
          ? {
              background: `linear-gradient(135deg, ${visual.cyan}, ${visual.primary})`,
              boxShadow: `0 6px 16px -6px ${withAlpha(visual.cyan, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.4)}`,
            }
          : {
              background: withAlpha(visual.white, 0.08),
              boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.16)}`,
            }
      }
    >
      <Icon className="size-3 text-white" strokeWidth={2.4} />
      <span className="font-display text-[10px] font-semibold tracking-tight text-white">{label}</span>
    </span>
  );
}

// A single activity row — a directional chip, label + meta, signed amount.
function ActivityRow({ activity }: { activity: Activity }) {
  const Icon = activity.icon;
  const inbound = activity.dir === "in";
  return (
    <div
      className="flex items-center gap-2 rounded-[9px] px-2 py-1.5"
      style={{
        background: withAlpha(visual.white, 0.06),
        boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.1)}`,
      }}
    >
      <span
        className="grid size-5 shrink-0 place-items-center rounded-[6px]"
        style={
          inbound
            ? { background: withAlpha(visual.cyan, 0.18), color: visual.cyan }
            : { background: withAlpha(visual.white, 0.1), color: withAlpha(visual.white, 0.85) }
        }
      >
        <Icon className="size-2.5" strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-body text-[9px] font-semibold leading-tight text-white/90">
          {activity.label}
        </div>
        <div className="truncate font-mono text-[7px] uppercase tracking-[0.1em] text-white/45">
          {activity.meta}
        </div>
      </div>
      <span
        className="shrink-0 font-mono text-[9px] font-semibold tabular-nums"
        style={{ color: inbound ? visual.cyan : withAlpha(visual.white, 0.8) }}
      >
        {activity.amount}
      </span>
    </div>
  );
}
