"use client";

import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowCheck,
  Slab,
  ControlChip,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// A GlowCheck that pops in (scale + fade) when `revealed`, mirroring the kit's
// ControlChip gesture: the row stays present at rest, only the check animates
// in one-by-one. CSS-only, so reduced-motion safe.
function PopCheck({ revealed, size = 18 }: { revealed: boolean; size?: number }) {
  return (
    <span
      className={cn(
        "inline-flex transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
        revealed ? "scale-100 opacity-100" : "scale-50 opacity-0",
      )}
    >
      <GlowCheck size={size} />
    </span>
  );
}

// ── Healthcare — "What you can build" surfaces ──────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/healthcare §4, one per
// build row, each mapping tightly to its copy and sharing nothing with the
// other verticals. All four are composed on the canonical product-illustration
// kit (design-system.md §8.1) — IllustrationField + IllustrationCard + atoms —
// so the literal surfaces share the hero's lit, dimensional world. Each keeps
// its distinct story; only the frame + atom vocabulary changed in the migration.
//
//   0. Patient financing      — a care-journey installment plan: a glowing
//                               Deferred chip + dated schedule that builds in.
//   1. Staff payroll          — a real-time disbursement run firing payout
//                               cards to staff cohorts; focal = run total.
//   2. Procurement            — a vendor payment passing a policy gate, then a
//                               glowing Approved verdict.
//   3. Insurance / government — a structured claim payout with a sealing audit
//                               trail; focal = the payout Stat.
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. Neutral data — no real third-party brands.

// ── Row 1 · Patient financing — installment plan configurator ───────────────
//
// Focal: the glowing "Deferred $0" chip (the 30-day defer is the story). The
// three monthly installments build in one by one on scroll-in / hover.

const PLAN: [string, string][] = [
  ["$320", "DAY 60"],
  ["$320", "DAY 90"],
  ["$320", "DAY 120"],
];

const DEFER_CHIP =
  `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.92)})`;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(PLAN.length, { amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Treatment plan · point of care</Eyebrow>
          <LiveTag>Embedded</LiveTag>
        </div>

        <div ref={ref} {...bind} className="mt-3.5 flex gap-2">
          {/* Deferred — the glowing focal chip (30-day defer). */}
          <div
            className="flex-1 rounded-[11px] py-2.5 text-center"
            style={{ background: DEFER_CHIP, boxShadow: `0 0 22px ${withAlpha(visual.cyan, 0.5)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}` }}
          >
            <div className="text-[13px] font-bold text-white">$0</div>
            <div className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-white/90">DEFERRED</div>
          </div>
          {PLAN.map(([amt, day], i) => (
            <Slab
              key={day}
              className="flex-1 py-2.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
            >
              <div className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">{amt}</div>
              <div className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                {day}
              </div>
            </Slab>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-between border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            4 × monthly · 0% interest
          </span>
          <span className="text-[14px] font-semibold text-text-primary dark:text-text-dark-primary">Total $1,280</span>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 2 · Staff and payroll disbursement — real-time payout run ───────────
//
// Focal: the run total Stat. Each staff cohort settles in one by one (glow
// check pops on), then the total resolves.

const PAYOUTS: { name: string; role: string; amt: string }[] = [
  { name: "Day staff", role: "Salaried · 48 cards", amt: "$96,400" },
  { name: "Locum contractors", role: "Contractor · 22 cards", amt: "$58,200" },
  { name: "Agency nurses", role: "Agency · 31 cards", amt: "$41,900" },
];

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(PAYOUTS.length, { step: 200, start: 240, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Disbursement run · today</Eyebrow>
          <LiveTag>Real-time</LiveTag>
        </div>

        {/* Cohorts — each settling to its own card pool (check pops in one by one). */}
        <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
          {PAYOUTS.map((p, i) => (
            <Slab key={p.name} className="flex items-center gap-2.5 px-3 py-2">
              <PopCheck revealed={n > i} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  {p.name}
                </div>
                <SubLabel className="normal-case tracking-[0.1em]">{p.role}</SubLabel>
              </div>
              <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                {p.amt}
              </span>
            </Slab>
          ))}
        </div>

        {/* Run total — the focal element. */}
        <div className="mt-3.5 flex items-end justify-between border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
          <div>
            <Stat size={26}>$196,500</Stat>
            <div className="mt-1.5"><SubLabel>101 cards · reconciled</SubLabel></div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 3 · Procurement and vendor payments — policy gate + approval ────────
//
// Focal: the glowing Approved verdict. Three policy checks pass through the
// gate one by one (glow check pops on), then the verdict lands.

const POLICY = ["Within category budget", "Approved vendor list", "Single-txn limit $25k"];

export function Row3() {
  const { ref, n, bind } = useSequentialReveal(POLICY.length, { step: 180, start: 240, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Vendor payment · PO-2294</Eyebrow>
          <span
            className="whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan"
            style={{ background: withAlpha(visual.primary, 0.1) }}
          >
            $18,240
          </span>
        </div>

        {/* Policy enforcement gate — checks tick through. */}
        <div ref={ref} {...bind} className="mt-3 flex flex-col gap-2">
          {POLICY.map((c, i) => (
            <ControlChip key={c} label={c} revealed={n > i} />
          ))}
        </div>

        {/* Verdict — the focal element. */}
        <div className="mt-3.5 flex items-center gap-2.5 border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
          <GlowCheck size={26} />
          <div>
            <Stat size={22}>Approved</Stat>
            <div className="mt-1"><SubLabel>Dept. head · auto-reconciled</SubLabel></div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Row 4 · Insurance and government disbursements — audited claim payout ────
//
// Focal: the payout Stat. The audit trail seals in step by step on a glowing
// spine (each node's check pops on), proving the structured, auditable flow.

const TRAIL: [string, string][] = [
  ["Claim adjudicated", "CLM-80417 · approved"],
  ["Beneficiary verified", "KYC · sanctions clear"],
  ["Funds disbursed", "to payout card · USD"],
  ["Audit record sealed", "immutable · exportable"],
];

export function Row4() {
  const { ref, n, bind } = useSequentialReveal(TRAIL.length, { step: 200, start: 240, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Claim settlement · structured</Eyebrow>
          <div className="text-right">
            <Stat size={22}>$7,450</Stat>
            <div className="mt-1"><SubLabel>Payout · USD</SubLabel></div>
          </div>
        </div>

        {/* Audit trail — each step seals in on a glowing spine (check pops in). */}
        <div ref={ref} {...bind} className="mt-3 flex flex-col">
          {TRAIL.map(([label, meta], i) => (
            <div key={label} className="flex gap-2.5">
              {/* Spine + node. */}
              <div className="flex flex-col items-center">
                <PopCheck revealed={n > i} />
                {i < TRAIL.length - 1 && (
                  <span
                    className="my-0.5 w-px flex-1"
                    style={{ background: withAlpha(visual.cyan, 0.3) }}
                  />
                )}
              </div>
              <div className="pb-2.5">
                <div className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                  {label}
                </div>
                <SubLabel className="normal-case tracking-[0.1em]">{meta}</SubLabel>
              </div>
            </div>
          ))}
        </div>
      </IllustrationCard>
    </>
  );
}
