"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  Landmark,
  Shield,
  FileCheck2,
  Users,
  BrainCircuit,
  X,
  AlertTriangle,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── LegacyState — the fragmented estate (Homepage §3, Legacy) ─────────────────
//
// Owner direction (3 June 2026): bring back the visceral fragmentation/chaos —
// the earlier "estate duct-taped together" read better than the tidy 3-layer
// version. The HERO is the customer: the same Customer A exists three times with
// conflicting data (nobody knows which is correct). Around it, the bank's
// systems sit as separate, mismatched, tilted consoles, crudely cross-wired with
// tangled + broken + taped seams. Beneath, the intelligence layer can't decide.
//
// Neutral only — grey + dark blue + slate. NO gold, NO red. Chaos reads through
// scatter, tilt, tangle, broken seams and the contradicting values — not colour.

const GREY = "#8A93A8";
const NAVY = "#2B3A57";
const SLATE = "#5B6473";

type Sys = { name: string; icon: LucideIcon; owner: string; x: number; y: number; tilt: number; scale: number };
const SYSTEMS: Sys[] = [
  { name: "Cards", icon: CreditCard, owner: "Core system", x: 13, y: 19, tilt: -5, scale: 1 },
  { name: "Payments", icon: ArrowLeftRight, owner: "Vendor A", x: 52, y: 12, tilt: 4, scale: 0.92 },
  { name: "Lending", icon: Landmark, owner: "Vendor B", x: 88, y: 21, tilt: -4, scale: 1.06 },
  { name: "Risk", icon: Shield, owner: "On-prem", x: 11, y: 66, tilt: 6, scale: 0.9 },
  { name: "Compliance", icon: FileCheck2, owner: "Vendor C", x: 90, y: 62, tilt: -5, scale: 1.02 },
];

type Rec = { balance: string; status: string; restricted?: boolean; x: number; y: number; tilt: number };
const RECORDS: Rec[] = [
  { balance: "$4,210.00", status: "Active", x: 47, y: 37, tilt: -2 },
  { balance: "$3,870.25", status: "Restricted", restricted: true, x: 33, y: 57, tilt: 3 },
  { balance: "$4,975.50", status: "Active", x: 63, y: 55, tilt: -3 },
];

const INTEL = { x: 50, y: 88 };

// Bowed quadratic seam (tangled, crossing cabling).
function seam(a: { x: number; y: number }, b: { x: number; y: number }, bow: number, t = 1) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  if (t >= 1) return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`, end: b };
  const it = 1 - t;
  const ex = it * it * a.x + 2 * it * t * cx + t * t * b.x;
  const ey = it * it * a.y + 2 * it * t * cy + t * t * b.y;
  return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${ex} ${ey}`, end: { x: ex, y: ey } };
}

const S = (i: number) => ({ x: SYSTEMS[i].x, y: SYSTEMS[i].y });
const R = (i: number) => ({ x: RECORDS[i].x, y: RECORDS[i].y });

// Cross-wired tangle: systems → multiple records (no single source), a couple of
// system↔system strands, some broken (frayed), some taped. records → intel are
// severed (no AI). Neutral tones.
type Seam = { a: { x: number; y: number }; b: { x: number; y: number }; bow: number; c: string; broken?: boolean; taped?: boolean; badge?: "x" | "alert" | "clock" };
const SEAMS: Seam[] = [
  { a: S(0), b: R(0), bow: 9, c: NAVY, taped: true },
  { a: S(0), b: R(1), bow: -12, c: GREY, broken: true, badge: "x" },
  { a: S(1), b: R(0), bow: 7, c: GREY },
  { a: S(1), b: R(2), bow: -10, c: NAVY },
  { a: S(2), b: R(2), bow: 11, c: GREY, taped: true },
  { a: S(2), b: R(0), bow: -16, c: NAVY, broken: true },
  { a: S(3), b: R(1), bow: 10, c: NAVY, badge: "alert" },
  { a: S(3), b: R(0), bow: -14, c: GREY },
  { a: S(4), b: R(2), bow: 9, c: GREY, badge: "clock" },
  { a: S(4), b: R(1), bow: -18, c: NAVY, broken: true },
  // a couple of system↔system strands (over-connected)
  { a: S(0), b: S(3), bow: 13, c: GREY },
  { a: S(2), b: S(4), bow: -12, c: NAVY },
  // severed links down to the intelligence layer
  { a: R(0), b: { x: 42, y: INTEL.y }, bow: 4, c: GREY, broken: true },
  { a: R(1), b: { x: 50, y: INTEL.y }, bow: -3, c: NAVY, broken: true },
  { a: R(2), b: { x: 58, y: INTEL.y }, bow: 4, c: GREY, broken: true },
];

export function LegacyState({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="A bank's fragmented estate: separate, mismatched legacy systems (Cards, Payments, Lending, Risk, Compliance) crudely cross-wired with tangled, broken and taped connections. The same customer, Customer A (ID 78214), exists three times with conflicting balances and statuses — there is no single source of data. The links down to the intelligence layer are severed, so it cannot establish a trusted customer record: decision confidence is reduced to 42%."
      className={cn("relative isolate", className)}
    >
      {/* ── Tangled / broken / taped seams (behind everything) ──────────── */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        {SEAMS.map((s, i) => {
          const { d, end } = seam(s.a, s.b, s.bow, s.broken ? 0.76 : 1);
          return (
            <g key={i}>
              {/* soft casing under the strand (physical, heavy cabling) */}
              <path d={d} fill="none" stroke={withAlpha(s.c, 0.1)} strokeWidth={s.broken ? 1.6 : 2.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={d} fill="none" stroke={withAlpha(s.c, 0.4)} strokeWidth={1.1} strokeLinecap="round" strokeDasharray={s.broken ? "1 1.8" : undefined} vectorEffect="non-scaling-stroke" />
              {s.broken && <circle cx={end.x} cy={end.y} r={0.9} fill={withAlpha(s.c, 0.5)} />}
            </g>
          );
        })}
      </svg>

      {/* ── Tape patches over a couple of seams (held together with tape) ── */}
      {SEAMS.filter((s) => s.taped).map((s, i) => {
        const { end } = seam(s.a, s.b, s.bow, 0.5);
        return (
          <span
            key={`tape-${i}`}
            aria-hidden="true"
            className="absolute z-[2] h-4 w-7 -translate-x-1/2 -translate-y-1/2 rounded-[2px]"
            style={{ left: `${end.x}%`, top: `${end.y}%`, transform: `translate(-50%,-50%) rotate(${i % 2 ? 24 : -18}deg)`, background: withAlpha("#FFFFFF", 0.62), border: `1px solid ${withAlpha(NAVY, 0.18)}`, boxShadow: `0 2px 8px -4px ${withAlpha(NAVY, 0.35)}` }}
          />
        );
      })}

      {/* ── Error badges on problem seams (broken / conflicting / stale) ── */}
      {SEAMS.filter((s) => s.badge).map((s, i) => {
        const { end } = seam(s.a, s.b, s.bow, 0.5);
        const Icon = s.badge === "x" ? X : s.badge === "alert" ? AlertTriangle : Clock;
        return (
          <div key={`b-${i}`} className="absolute z-[6] -translate-x-1/2 -translate-y-1/2" style={{ left: `${end.x}%`, top: `${end.y}%` }}>
            <span className="flex size-[17px] items-center justify-center rounded-full border bg-white shadow-[0_3px_8px_-4px_rgba(14,26,51,0.4)] dark:bg-[#141d31]" style={{ borderColor: withAlpha(SLATE, 0.45), color: SLATE }}>
              <Icon className="size-2.5" strokeWidth={2.6} />
            </span>
          </div>
        );
      })}

      {/* ── Scattered, mismatched legacy systems ────────────────────────── */}
      {SYSTEMS.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.name} className="absolute z-20 w-[112px] -translate-x-1/2 -translate-y-1/2 sm:w-[124px]" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <div
              className="overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_12px_28px_-16px_rgba(14,26,51,0.4)] saturate-[0.85] dark:border-white/10 dark:bg-[#141d31]"
              style={{ transform: `rotate(${s.tilt}deg) scale(${s.scale})` }}
            >
              <div className="flex items-center gap-1.5 px-2.5 pt-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-[5px]" style={{ background: withAlpha(GREY, 0.14), color: GREY }}>
                  <Icon className="size-3" strokeWidth={2.2} />
                </span>
                <span className="truncate font-display text-[10px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{s.name}</span>
              </div>
              <div className="mt-1.5 border-t px-2.5 py-1" style={{ borderColor: withAlpha(GREY, 0.16) }}>
                <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">{s.owner}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── The same customer, three times — the HERO ───────────────────── */}
      {RECORDS.map((r, i) => (
        <CustomerRecord key={i} rec={r} index={i} reduced={!!reduced} />
      ))}

      {/* ── Intelligence layer (consequence) ────────────────────────────── */}
      <div className="absolute z-20 w-[44%] min-w-[270px] max-w-[320px] -translate-x-1/2 -translate-y-1/2" style={{ left: `${INTEL.x}%`, top: `${INTEL.y}%` }}>
        <div className="overflow-hidden rounded-xl border bg-white px-4 py-3 shadow-[0_22px_46px_-20px_rgba(14,26,51,0.5)] dark:bg-[#141d31]" style={{ borderColor: withAlpha(SLATE, 0.3) }}>
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: withAlpha(SLATE, 0.12), color: SLATE }}>
              <BrainCircuit className="size-4.5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[12.5px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">Intelligence layer</p>
              <p className="font-body text-[9px] leading-tight text-text-muted dark:text-text-dark-secondary">Unable to establish a trusted customer record</p>
            </div>
            <span className="font-mono text-[10px] font-bold" style={{ color: SLATE }}>42%</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full" style={{ background: withAlpha(GREY, 0.16) }}>
            <div className="h-full rounded-full" style={{ width: "42%", background: SLATE }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── A conflicting customer record — the focal object (large, tilted) ──────────
function CustomerRecord({ rec, index, reduced }: { rec: Rec; index: number; reduced: boolean }) {
  const drift = [
    { x: [0, 0.8, -0.6, 0] }, { x: [0, -0.7, 0.6, 0] }, { x: [0, 0.6, -0.7, 0] },
  ][index] ?? { x: [0, 0.6, 0] };
  const tone = rec.restricted ? SLATE : GREY;

  return (
    <div className="absolute z-30 w-[27%] min-w-[170px] max-w-[200px] -translate-x-1/2 -translate-y-1/2" style={{ left: `${rec.x}%`, top: `${rec.y}%` }}>
      <motion.div
        style={{ rotate: rec.tilt }}
        animate={reduced ? undefined : { x: drift.x }}
        transition={reduced ? undefined : { duration: 6 + index * 0.8, ease: "easeInOut", repeat: Infinity, delay: index * 0.6 }}
      >
        <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_24px_50px_-22px_rgba(14,26,51,0.5)] dark:border-white/12 dark:bg-[#141d31]">
          <div className="flex items-center gap-2 px-3.5 pt-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: withAlpha(GREY, 0.14), color: GREY }}>
              <Users className="size-4" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="whitespace-nowrap font-display text-[12px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">Customer A</p>
              <p className="font-mono text-[8.5px] leading-tight text-text-muted dark:text-text-dark-secondary">ID: 78214</p>
            </div>
          </div>
          <div className="px-3.5 pb-2 pt-2.5">
            <p className="font-body text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">Balance</p>
            <p className="font-display text-[19px] font-bold leading-none tracking-tight text-text-primary dark:text-text-on-brand">{rec.balance}</p>
          </div>
          <div className="flex items-center justify-between border-t px-3.5 py-2" style={{ borderColor: withAlpha(GREY, 0.14) }}>
            <span className="font-body text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">Status</span>
            <span className="font-mono text-[9.5px] font-bold tracking-tight" style={{ color: tone }}>{rec.status}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
