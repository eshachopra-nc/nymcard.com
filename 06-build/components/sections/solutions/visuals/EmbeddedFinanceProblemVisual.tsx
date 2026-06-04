"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  CreditCard,
  Landmark,
  ArrowLeftRight,
  Gift,
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
} from "@/components/visuals/product-illustration";

// ── EmbeddedFinanceProblemVisual (Embedded Finance §2 — The Problem) ─────────
//
// The PAIN: every capability comes from a DIFFERENT provider, so the customer
// journey is fragmented and no one sees the whole customer. Four separate
// provider tiles (Cards · Lending · Payments · Rewards) sit at the corners,
// each a SEPARATE vendor, linked to the customer at the centre by BROKEN,
// dashed connectors that never resolve — and three of the four carry a mismatch
// (!) marker. The customer node is the ONE focal element, but it reads as
// fractured: a dimmed record ringed by disconnect, never unified.
//
// Distinct from every existing surface:
//   • BaaSBundleVisual is the INVERSE — a clean 2×2 ring of layers converging on
//     ONE glowing core (the resolution). This is the disconnected, pre-platform
//     state: separate vendors, dashed non-convergent links, mismatch flags.
//   • OneCustomerVisual / FragmentedCanvas show ×3 duplicate records. This shows
//     ×4 scattered PROVIDERS around one customer — a different fragmentation.
//
// Maps to copy: "Each solves a single problem, but none were designed to work
// together… fragmented customer experiences, disconnected data." Chips avoid
// echoing the pain list (no "different provider", no "data lives everywhere") —
// they carry the structural count instead (4 providers · 0 shared view).
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — same treatment as the
// homepage Products surfaces, light AND dark.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in — the four provider tiles fan out one-by-one, the broken links
//     draw, the mismatch flags pop, then the fractured customer settles.
//   • hover (group) — the disconnect deepens: the dashed links drift outward and
//     the mismatch flags brighten amber-free (cool indigo), underscoring that
//     nothing joins up. Reduced motion shows the final fractured state.

type Provider = {
  name: string;
  vendor: string;
  icon: LucideIcon;
  pos: "tl" | "tr" | "bl" | "br";
  mismatch: boolean;
};

const PROVIDERS: Provider[] = [
  { name: "Cards", vendor: "Vendor A", icon: CreditCard, pos: "tl", mismatch: false },
  { name: "Lending", vendor: "Vendor B", icon: Landmark, pos: "tr", mismatch: true },
  { name: "Payments", vendor: "Vendor C", icon: ArrowLeftRight, pos: "bl", mismatch: true },
  { name: "Rewards", vendor: "Vendor D", icon: Gift, pos: "br", mismatch: true },
];

// Provider inner-corner endpoints in the 100×100 connector viewBox, reaching
// toward — but NOT meeting — the customer at centre (50,50). Each dashed link
// stops short at a gap, so the journey never resolves.
const LINKS: Record<Provider["pos"], { x: number; y: number }> = {
  tl: { x: 26, y: 26 },
  tr: { x: 74, y: 26 },
  bl: { x: 26, y: 74 },
  br: { x: 74, y: 74 },
};

export function EmbeddedFinanceProblemVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };
  const tile: Variants = {
    hidden: { opacity: 0, scale: 0.82 },
    show: { opacity: 1, scale: 1, transition: { duration: dur.base, ease: ease.spring } },
  };
  const centre: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.spring, delay: 0.8 } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div
          ref={ref}
          role="img"
          aria-label="Four separate financial providers — Cards, Lending, Payments and Rewards, each from a different vendor — scattered around one customer and linked by broken, non-convergent connections, with three of the four flagged as mismatched: a fragmented customer journey with no shared view."
          className="group/frag flex h-full flex-col p-4 sm:p-5"
        >
          {/* Header — the fragmented-stack identity. */}
          <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
            <Eyebrow>Disconnected stack</Eyebrow>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.13em]"
              style={{
                color: visual.indigo,
                background: withAlpha(visual.indigo, 0.12),
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.4)}`,
              }}
            >
              4 providers
            </span>
          </div>

          {/* Topology — four provider tiles, broken links, fractured customer. */}
          <div className="relative my-auto py-4">
            {/* Broken connectors — dashed lines that stop short of the customer,
                so the journey never joins up. They draw on scroll-in and drift
                outward on hover (the disconnect deepens). */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {PROVIDERS.map((p) => {
                const l = LINKS[p.pos];
                // stop short of centre — leave a visible gap toward (50,50)
                const gx = l.x + (50 - l.x) * 0.62;
                const gy = l.y + (50 - l.y) * 0.62;
                return (
                  <motion.line
                    key={p.name}
                    x1={l.x}
                    y1={l.y}
                    x2={gx}
                    y2={gy}
                    stroke={withAlpha(visual.indigo, 0.55)}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-65 transition-opacity duration-500 group-hover/frag:opacity-90"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={inView ? (reduced ? undefined : { pathLength: 1, opacity: 0.65 }) : undefined}
                    transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Provider ring + fractured customer — a 3×3 grid. */}
            <motion.div
              className="relative z-10 grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] items-center gap-x-2 gap-y-3.5"
              variants={reduced ? undefined : grid}
              initial={reduced ? false : "hidden"}
              animate={inView ? (reduced ? undefined : "show") : undefined}
            >
              <ProviderTile p={PROVIDERS[0]} variants={reduced ? undefined : tile} className="col-start-1 row-start-1" />
              <ProviderTile p={PROVIDERS[1]} variants={reduced ? undefined : tile} className="col-start-3 row-start-1" />

              {/* Fractured customer — the ONE focal element, but it reads as
                  incomplete: a dimmed record with no shared view. */}
              <motion.div className="col-start-2 row-start-2 mx-auto" variants={reduced ? undefined : centre}>
                <FracturedCustomer />
              </motion.div>

              <ProviderTile p={PROVIDERS[2]} variants={reduced ? undefined : tile} className="col-start-1 row-start-3" />
              <ProviderTile p={PROVIDERS[3]} variants={reduced ? undefined : tile} className="col-start-3 row-start-3" />
            </motion.div>
          </div>

          {/* Verdict — nothing joins up. */}
          <motion.div
            className="flex items-center justify-between gap-3 border-t border-surface-border-subtle pt-2.5 dark:border-white/10"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 1.1 }}
          >
            <SubLabel>4 contracts · 0 shared view</SubLabel>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
              Nothing joins up
            </span>
          </motion.div>
        </div>
      </IllustrationCard>
    </>
  );
}

// A separate-vendor provider tile — a muted grey icon chip (NOT the brand
// gradient: these are foreign systems), the capability name, and the vendor
// label. A mismatch (!) flag sits on three of the four to show the data never
// reconciles.
function ProviderTile({
  p,
  variants,
  className,
}: {
  p: Provider;
  variants?: Variants;
  className?: string;
}) {
  const Icon = p.icon;
  return (
    <motion.div
      variants={variants}
      className={
        "relative flex items-center gap-2 rounded-[11px] bg-white/55 px-2.5 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_10px_-6px_rgba(14,26,51,0.18)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] " +
        (className ?? "")
      }
    >
      {/* foreign-system icon chip — neutral slate, never the brand gradient */}
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-md text-text-secondary dark:text-text-dark-secondary"
        style={{
          background: withAlpha(visual.navy, 0.08),
          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.navy, 0.12)}`,
        }}
      >
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="truncate font-body text-[11.5px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
          {p.name}
        </div>
        <div className="truncate font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
          {p.vendor}
        </div>
      </div>
      {/* mismatch flag — the data never reconciles across vendors (cool indigo,
          no warm/amber). */}
      {p.mismatch && (
        <span
          aria-hidden="true"
          className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full font-mono text-[9px] font-bold transition-transform duration-500 group-hover/frag:scale-110"
          style={{
            color: visual.indigo,
            background: withAlpha(visual.white, 0.92),
            boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.55)}, 0 2px 6px -2px ${withAlpha(visual.navy, 0.4)}`,
          }}
        >
          !
        </span>
      )}
    </motion.div>
  );
}

// The fractured customer at the centre — the same person every provider sees a
// SLICE of, but nobody sees whole. A dimmed record with a dashed, broken ring
// (no unified, verified seal) — the inverse of OneCustomerVisual's verified
// node.
function FracturedCustomer() {
  return (
    <span className="relative grid size-[64px] place-items-center">
      {/* broken dashed ring — the journey is never closed */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border border-dashed transition-colors duration-500"
        style={{ borderColor: withAlpha(visual.indigo, 0.5) }}
      />
      <span
        className="relative grid size-[52px] place-items-center rounded-[14px]"
        style={{
          background: `linear-gradient(150deg, ${withAlpha(visual.navy, 0.1)}, ${withAlpha(visual.indigo, 0.08)})`,
          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.navy, 0.14)}`,
        }}
      >
        <span className="flex flex-col items-center gap-0.5 text-text-secondary dark:text-text-dark-secondary">
          <User className="size-[18px]" strokeWidth={1.9} />
          <span className="font-mono text-[6.5px] uppercase tracking-[0.14em]">Customer</span>
        </span>
      </span>
    </span>
  );
}
