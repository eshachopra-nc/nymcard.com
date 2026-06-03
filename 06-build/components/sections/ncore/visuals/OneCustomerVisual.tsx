"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Users, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { GlassPanel, GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── §4 — One customer record: Legacy ×3 → nCore ×1 ──────────────────────────
//
// A sibling of the homepage FragmentedCanvas + NCoreFullStack glass diagram,
// built for a LIGHT section (composes GlassPanel on GlassAtmosphere so the
// frost reads, §8.1). The SAME customer ("Customer A", ID 78214) appears THREE
// times on the left with conflicting balances (the fragmented state, reusing
// the FragmentedCanvas customer-card language) and resolves into ONE unified,
// trusted record on the right. The ×3 → ×1 convergence is the whole point.
//
// Motion (all prefers-reduced-motion safe):
//   • reveal-on-scroll — the fragmented stack, the convergence, then the
//     unified record settle in sequence (whileInView, once).
//   • hover (group) — the unified record lights cyan, its verified ring
//     brightens, and the convergence connectors draw toward it (Stripe-style).
//   • ambient — a single restrained cyan pulse travels the convergence beam
//     (the NCoreFullStack beat), nothing more.

const CYAN = "#22D3EE";
const ALERT = "#D1453B";
const NYM = visual.primary;

// The three conflicting copies of the same customer (FragmentedCanvas data).
// A horizontal stagger keeps every balance visible — the "×3 conflicting" point
// is the whole story, so none can be hidden behind another.
const DUPES = [
  { balance: "$4,210.00", indent: "ml-2" },
  { balance: "$3,870.25", indent: "ml-0", mismatch: true },
  { balance: "$4,975.50", indent: "ml-3" },
] as const;

export function OneCustomerVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const stack: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const dupe: Variants = {
    hidden: reduced ? {} : { opacity: 0, x: -18 },
    shown: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  const unified: Variants = {
    hidden: reduced ? {} : { opacity: 0, scale: 0.92, x: 14 },
    shown: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 } },
  };

  return (
    <motion.div
      className={cn("group relative isolate w-full overflow-hidden rounded-3xl p-2.5", className)}
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassAtmosphere tone="azure" animated />

      <GlassPanel padded className="relative w-full">
        <div
          role="img"
          aria-label="The same customer, Customer A (ID 78214), appears three times across legacy systems with three conflicting balances — $4,210.00, $3,870.25 and $4,975.50 — and converges, on nCore, into one unified, trusted customer record."
          className="relative flex min-h-[19rem] items-stretch"
        >
          {/* ── Left — the fragmented stack (Legacy ×3) ──────────────────── */}
          <div className="relative flex w-[44%] flex-col justify-center">
            <Tag tone={ALERT} icon={AlertTriangle} className="mb-4 ml-1">
              Legacy <span className="font-mono font-bold">×3</span>
            </Tag>
            <motion.div
              className="flex flex-col gap-2.5"
              variants={stack}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-15%" }}
            >
              {DUPES.map((d, i) => (
                <motion.div key={i} variants={dupe} className={cn("w-[88%] max-w-[16rem]", d.indent)}>
                  <DupeCard balance={d.balance} mismatch={"mismatch" in d && d.mismatch} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Convergence beam — the ×3 → ×1 resolve ───────────────────── */}
          <div className="relative flex w-[12%] items-center justify-center" aria-hidden="true">
            {/* dashed convergence connectors, drawing toward the unified record */}
            <svg viewBox="0 0 60 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {[42, 100, 158].map((y, i) => (
                <motion.path
                  key={i}
                  d={`M 2 ${y} C 24 ${y}, 30 100, 58 100`}
                  fill="none"
                  stroke={withAlpha(CYAN, 0.55)}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                  animate={reduced ? undefined : { strokeDashoffset: [0, -12] }}
                  transition={reduced ? undefined : { duration: 2.4 + i * 0.3, ease: "linear", repeat: Infinity }}
                />
              ))}
            </svg>
            {/* the merge arrow glyph */}
            <motion.span
              className="relative z-10 flex size-7 items-center justify-center rounded-full border bg-white/90 text-[#304DBB] shadow-[0_4px_12px_-4px_rgba(48,77,187,0.4)] transition-colors duration-500 group-hover:border-accent-cyan/60 group-hover:text-accent-cyan dark:bg-[#0e1830]/90 dark:text-[#96B4FF]"
              style={{ borderColor: withAlpha(NYM, 0.25) }}
              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <ArrowRight className="size-3.5" strokeWidth={2.4} />
            </motion.span>
            {/* a single cyan pulse riding the beam toward the unified record */}
            {!reduced && (
              <motion.span
                className="pointer-events-none absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full"
                style={{ background: CYAN, boxShadow: `0 0 10px ${withAlpha(CYAN, 0.9)}` }}
                animate={{ left: ["0%", "92%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
              />
            )}
          </div>

          {/* ── Right — the unified, trusted record (nCore ×1) ───────────── */}
          <div className="relative flex w-[44%] flex-col justify-center">
            <Tag tone={CYAN} icon={CheckCircle2} className="mb-4 ml-1">
              nCore <span className="font-mono font-bold">×1</span>
            </Tag>
            <motion.div
              variants={unified}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-15%" }}
              className="relative"
            >
              <UnifiedCard />
            </motion.div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

// A fragmented duplicate — same customer, conflicting balance (mismatch dashed).
// Compact single-row form so all three balances stay visible at once.
function DupeCard({ balance, mismatch }: { balance: string; mismatch?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-2.5 overflow-hidden rounded-lg border bg-white px-3 py-2.5 shadow-[0_14px_32px_-18px_rgba(14,26,51,0.4)] dark:bg-[#141d31]",
        "border-black/[0.07] dark:border-white/12",
      )}
    >
      {mismatch && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg border border-dashed"
          style={{ borderColor: withAlpha(ALERT, 0.55) }}
        />
      )}
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#8A93A8]/16 text-[#697689] dark:bg-white/[0.08] dark:text-[#9DB2DA]">
        <Users className="size-3.5" strokeWidth={2.2} />
      </span>
      <div className="flex-1">
        <p className="whitespace-nowrap font-display text-[12px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
          Customer A
        </p>
        <p className="font-mono text-[8px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">ID: 78214</p>
      </div>
      <span
        className={cn(
          "shrink-0 font-display text-[14px] font-bold leading-tight tracking-tight",
          mismatch ? "" : "text-text-primary dark:text-text-on-brand",
        )}
        style={mismatch ? { color: ALERT } : undefined}
      >
        {balance}
      </span>
    </div>
  );
}

// The one unified record — cyan verified ring, single source of truth.
function UnifiedCard() {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-white px-4 py-4 transition-all duration-500 dark:bg-[#141d31]",
        "border-accent-cyan/40 shadow-[0_22px_50px_-20px_rgba(14,26,51,0.5)]",
        "group-hover:border-accent-cyan/70 group-hover:shadow-[0_0_34px_-4px_rgba(34,211,238,0.5)]",
      )}
    >
      {/* lit top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.7)} 30%, ${withAlpha(CYAN, 0.7)} 70%, transparent)` }}
      />
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border bg-gradient-to-br text-[#304DBB] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_3px_8px_-3px_rgba(48,77,187,0.35)] dark:text-[#96B4FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_-3px_rgba(0,0,0,0.5)]"
          style={{ borderColor: withAlpha(NYM, 0.25) }}
        >
          <Users className="size-[18px]" strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">Customer A</p>
          <p className="font-mono text-[9px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">ID: 78214</p>
        </div>
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ background: withAlpha(CYAN, 0.16), color: CYAN }}>
          <CheckCircle2 className="size-3.5" strokeWidth={2.4} />
        </span>
      </div>
      <div className="mt-3">
        <p className="font-body text-[8px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">Balance</p>
        <p className="font-display text-[22px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">$4,210.00</p>
      </div>
      <div className="mt-3 flex items-center gap-1.5 border-t pt-2.5" style={{ borderColor: withAlpha(NYM, 0.12) }}>
        <span className="size-1.5 rounded-full" style={{ background: CYAN, boxShadow: `0 0 6px ${withAlpha(CYAN, 0.8)}` }} />
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wide" style={{ color: CYAN }}>
          Single source of truth
        </span>
      </div>
    </div>
  );
}

// A small status tag — the ×3 / ×1 labels above each side.
function Tag({
  tone,
  icon: Icon,
  children,
  className,
}: {
  tone: string;
  icon: typeof AlertTriangle;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border bg-white/80 px-2.5 py-1 font-display text-[11px] font-semibold tracking-tight dark:bg-[#0e1830]/70",
        className,
      )}
      style={{ borderColor: withAlpha(tone, 0.45), color: tone }}
    >
      <Icon className="size-3" strokeWidth={2.6} />
      {children}
    </span>
  );
}
