"use client";

import {
  motion,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import { GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── TransformScene — the §3 signature visualization ──────────────────────────
//
// ONE scene, scrubbed by a single scroll `progress` (0 → 1), moving through the
// four owner-locked states (02-copy/Homepage.revised.md §3):
//
//   State 1 — Fragmented   (p < 0.25)   the bank's own systems, scattered,
//                                       tilted, desaturated, stale statuses,
//                                       tangled + broken seams. No source of truth.
//   State 2 — The scan     (0.25–0.45)  a single cyan scan-line sweeps L→R.
//   State 3 — Transform    (0.45–0.72)  in the scan's wake each system heals
//                                       (tilt → straight, stale → live, legacy
//                                       label → product name) and converges
//                                       inward toward an ordered ring.
//   State 4 — nCore        (0.62–1.0)   a unified nucleus resolves BENEATH the
//                                       architecture (capability chips inside),
//                                       the six product modules reconnect around
//                                       it on clean spokes. Stops mostly-revealed.
//
// Reuses the existing vocabulary so this stays one coherent system: the chips
// are the FragmentationWeb / CollapseNode glass-chip material + InfraIcon family;
// the legacy→product label pairs mirror FragmentationWeb's DEFAULT_WEB_VENDORS →
// NCoreStack's canonical six. Count is the locked six (CLAUDE.md taxonomy).
//
// MOTION MODEL: nothing animates on its own — every value is derived from
// `progress` via useTransform, so it is fully scrubbable and, when the parent
// passes a constant progress (reduced-motion / mobile / SSR), it renders the
// resolved state with zero motion. No timers, no perpetual loops (Rule 6 + the
// no-AI-slop-motion rule).
//
// ON-SYSTEM: composed on GlassAtmosphere (never glass on a flat bed, §8.1).
// Cool palette only — the pain reads through tilt, desaturation, broken seams
// and stale mono statuses, never alarm red.

type Module = {
  icon: IconName;
  legacy: string; // State 1 — the legacy system name
  product: string; // State 4 — the nCore product layer
  stale: string; // State 1 — a stale mono status
  sx: number; // scattered x (% of scene)
  sy: number; // scattered y
  tilt: number; // scattered tilt (deg)
  ox: number; // ordered x (ring around the nucleus)
  oy: number; // ordered y
};

// Center of the ordered ring / nucleus.
const C = { x: 50, y: 47 };
const R = { x: 34, y: 31 };
const ring = (deg: number) => ({
  ox: C.x + Math.cos((deg * Math.PI) / 180) * R.x,
  oy: C.y + Math.sin((deg * Math.PI) / 180) * R.y,
});

// Lifecycle order = NCoreStack order. Legacy labels mirror FragmentationWeb.
const MODULES: Module[] = [
  { icon: "cards", legacy: "Card processor", product: "Card Issuing", stale: "v3.1", sx: 24, sy: 19, tilt: -6, ...ring(-90) },
  { icon: "lending", legacy: "Loan servicer", product: "Lending", stale: "legacy", sx: 71, sy: 15, tilt: 5, ...ring(-30) },
  { icon: "money-movement", legacy: "Cross-border", product: "Money Movement", stale: "vendor B", sx: 83, sy: 47, tilt: -4, ...ring(30) },
  { icon: "settlement", legacy: "Settlement ledger", product: "Settlement", stale: "batch", sx: 65, sy: 81, tilt: 7, ...ring(90) },
  { icon: "fraud", legacy: "Fraud + AML", product: "Financial Crime", stale: "3rd party", sx: 27, sy: 79, tilt: -5, ...ring(150) },
  { icon: "reconciliation", legacy: "Recon engine", product: "Reconciliation", stale: "nightly", sx: 13, sy: 49, tilt: 4, ...ring(210) },
];

const CAPABILITIES = ["Real-time", "AI-native", "Unified customer record", "API-first"];

const CYAN = visual.cyan;

export function TransformScene({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  // ── Scan line — sweeps L→R across the scan window, then clears. ──
  const scanLeft = useTransform(progress, [0.25, 0.45], ["-4%", "104%"]);
  const scanOpacity = useTransform(progress, [0.24, 0.28, 0.43, 0.47], [0, 1, 1, 0]);

  // ── Tangled seams (State 1) fade out as the estate converges. ──
  const tangledOpacity = useTransform(progress, [0.45, 0.6], [1, 0]);
  // ── Clean radial spokes (State 4) draw in as the nucleus resolves. ──
  const spokesOpacity = useTransform(progress, [0.62, 0.82], [0, 1]);

  // ── Nucleus emerges beneath the architecture. Stops mostly-revealed. ──
  const coreOpacity = useTransform(progress, [0.6, 0.82], [0, 1]);
  const coreScale = useTransform(progress, [0.6, 0.86], [0.86, 1]);
  const coreBloom = useTransform(progress, [0.6, 0.86, 1], [0, 0.9, 0.78]);

  return (
    <div
      role="img"
      aria-label="A bank's fragmented legacy systems — card processor, loan servicer, cross-border, settlement ledger, fraud and AML, reconciliation — scattered and tangled. A cyan scan passes across them; duplicates merge, stale batches turn live, and the systems converge and reconnect around a single unified nCore platform, with the six product layers on clean spokes around it."
      className={cn(
        "relative isolate aspect-[5/6] w-full overflow-hidden rounded-3xl border sm:aspect-[4/5]",
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_30px_80px_-40px_rgba(14,26,51,0.35)] dark:shadow-[0_30px_80px_-36px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* Rich field so the glass chips read dimensional (§8.1). Cool, calm,
          theme-aware; never a flat bed, never an alarm wash. */}
      <GlassAtmosphere tone="indigo" depth="deep" />

      {/* ── Connector layer (SVG, behind the chips) ─────────────────────── */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tx-seam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={visual.primary} stopOpacity={0.9} />
            <stop offset="100%" stopColor={visual.indigo} stopOpacity={0.85} />
          </linearGradient>
        </defs>

        {/* Tangled, bowed, partly-broken seams between the scattered systems. */}
        <motion.g style={{ opacity: tangledOpacity }}>
          {MODULES.map((m, i) => {
            const next = MODULES[(i + 1) % MODULES.length];
            const skip = MODULES[(i + 2) % MODULES.length];
            const bow = i % 2 === 0 ? 9 : -11;
            const broken = i % 3 === 1;
            return (
              <g key={`seam-${i}`}>
                <path
                  d={bowed(m.sx, m.sy, next.sx, next.sy, bow)}
                  fill="none"
                  stroke="url(#tx-seam)"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.85}
                />
                <path
                  d={broken ? bowedPartial(m.sx, m.sy, skip.sx, skip.sy, -bow) : bowed(m.sx, m.sy, skip.sx, skip.sy, -bow)}
                  fill="none"
                  stroke="url(#tx-seam)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeDasharray={broken ? "0.6 1.8" : undefined}
                  vectorEffect="non-scaling-stroke"
                  opacity={0.6}
                />
              </g>
            );
          })}
        </motion.g>

        {/* Clean radial spokes — each ordered module to the nucleus. */}
        <motion.g style={{ opacity: spokesOpacity }}>
          {MODULES.map((m, i) => (
            <line
              key={`spoke-${i}`}
              x1={m.ox}
              y1={m.oy}
              x2={C.x}
              y2={C.y}
              stroke={withAlpha(CYAN, 0.5)}
              strokeWidth={1}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </motion.g>
      </svg>

      {/* ── The nucleus (z-10, beneath the chips) ───────────────────────── */}
      <Nucleus opacity={coreOpacity} scale={coreScale} bloom={coreBloom} />

      {/* ── The module chips (z-20) ─────────────────────────────────────── */}
      {MODULES.map((m, i) => (
        <ModuleChip key={m.legacy} progress={progress} mod={m} index={i} />
      ))}

      {/* ── The scan line (z-30, above everything during the sweep) ─────── */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-30 w-px"
        style={{
          left: scanLeft,
          opacity: scanOpacity,
          background: `linear-gradient(to bottom, transparent, ${CYAN}, transparent)`,
          boxShadow: `0 0 24px 6px ${withAlpha(CYAN, 0.5)}`,
        }}
      >
        {/* a soft leading glow so the scan reads as an intelligent sweep,
            not a hairline rule. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 -left-6 w-12"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.18)})`,
          }}
        />
      </motion.span>
    </div>
  );
}

// ── A single module chip ─────────────────────────────────────────────────────
// Scattered + tilted + desaturated in State 1; heals as the scan passes its
// x-position (tilt → 0, saturate → 1, legacy label → product name, stale status
// → "live"); converges to its ring position in State 3 → 4.
function ModuleChip({
  progress,
  mod,
  index,
}: {
  progress: MotionValue<number>;
  mod: Module;
  index: number;
}) {
  // The scan crosses this chip in proportion to its scattered x (the scan runs
  // L→R across [0.25, 0.45]); heal completes a hair after the scan passes.
  const healStart = 0.25 + (mod.sx / 100) * 0.18;
  const healEnd = healStart + 0.05;

  const left = useTransform(progress, [0.45, 0.72], [mod.sx, mod.ox]);
  const top = useTransform(progress, [0.45, 0.72], [mod.sy, mod.oy]);
  const leftPct = useMotionTemplate`${left}%`;
  const topPct = useMotionTemplate`${top}%`;

  const rotate = useTransform(progress, [0.25, healStart], [mod.tilt, 0]);
  const scale = useTransform(progress, [0.45, 0.72], [1, 0.92]);
  const sat = useTransform(progress, [0.25, healEnd], [0.55, 1]);
  const filter = useMotionTemplate`saturate(${sat})`;

  const legacyOpacity = useTransform(progress, [healStart, healEnd], [1, 0]);
  const productOpacity = useTransform(progress, [healStart, healEnd], [0, 1]);

  // A faint duplicate "ghost" record sits behind the chip in State 1 and merges
  // in as it heals (the "duplicated customer records merge" beat). Two of six.
  const hasGhost = index % 3 === 0;
  const ghostOpacity = useTransform(progress, [healStart - 0.04, healEnd], [0.5, 0]);
  const ghostShift = useTransform(progress, [healStart - 0.04, healEnd], [6, 0]);

  // The lit ring as the scan touches the chip.
  const litRing = useTransform(progress, [healStart - 0.015, healStart, healEnd], [0, 1, 0]);

  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: leftPct, top: topPct }}
    >
      <motion.div style={{ rotate, scale, filter }} className="relative">
        {/* Duplicate ghost record (State 1 only). */}
        {hasGhost && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl border border-white/50 bg-white/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
            style={{ opacity: ghostOpacity, x: ghostShift, y: ghostShift }}
          />
        )}

        <div
          className={cn(
            "relative w-[124px] overflow-hidden rounded-xl border backdrop-blur-md sm:w-[140px]",
            "border-white/70 bg-white/72 shadow-[0_14px_34px_-16px_rgba(14,26,51,0.5)]",
            "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.66)]",
          )}
        >
          {/* Cyan lit ring as the scan passes. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset"
            style={{ opacity: litRing, boxShadow: `inset 0 0 18px ${withAlpha(CYAN, 0.45)}`, ["--tw-ring-color" as string]: withAlpha(CYAN, 0.6) }}
          />

          <div className="flex items-center gap-2 px-2.5 py-2">
            <InfraIcon name={mod.icon} size="sm" className="!size-7 !rounded-lg" />
            <div className="min-w-0 flex-1">
              {/* Label crossfade: legacy system → product layer. */}
              <span className="relative block h-[15px]">
                <motion.span
                  style={{ opacity: legacyOpacity }}
                  className="absolute inset-0 truncate font-display text-[12px] font-semibold leading-[15px] tracking-tight text-text-primary dark:text-text-on-brand"
                >
                  {mod.legacy}
                </motion.span>
                <motion.span
                  style={{ opacity: productOpacity }}
                  className="absolute inset-0 truncate font-display text-[12px] font-semibold leading-[15px] tracking-tight text-text-primary dark:text-text-on-brand"
                >
                  {mod.product}
                </motion.span>
              </span>
              {/* Status crossfade: stale → live. */}
              <span className="relative mt-0.5 block h-[9px]">
                <motion.span
                  style={{ opacity: legacyOpacity }}
                  className="absolute inset-0 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-secondary"
                >
                  {mod.stale}
                </motion.span>
                <motion.span
                  style={{ opacity: productOpacity }}
                  className="absolute inset-0 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em]"
                >
                  <span className="inline-block size-1 rounded-full" style={{ background: CYAN }} />
                  <span style={{ color: CYAN }}>live</span>
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── The nucleus — the unified nCore platform ─────────────────────────────────
// Not a rectangle: a soft rounded core with a cyan bloom, the nCore mark, and
// the capability chips revealing inside. Sits centred, beneath the module ring.
function Nucleus({
  opacity,
  scale,
  bloom,
}: {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  bloom: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, scale }}
    >
      <div className="relative">
        {/* Cyan bloom behind the core. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 rounded-full"
          style={{
            opacity: bloom,
            background: `radial-gradient(50% 50% at 50% 50%, ${withAlpha(CYAN, 0.3)}, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />

        <div className="relative w-[176px] overflow-hidden rounded-[20px] border border-white/15 bg-brand-navy/95 px-4 py-4 shadow-[0_24px_60px_-24px_rgba(14,26,51,0.6)] backdrop-blur-md sm:w-[200px] dark:bg-brand-navy">
          {/* Inner cyan interface bloom rising from the base. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(80% 70% at 50% 100%, ${withAlpha(CYAN, 0.28)}, transparent 70%)` }}
          />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(CYAN, 0.6) }} />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="size-1.5 rounded-full" style={{ background: CYAN }} />
              <span className="font-display text-lg font-bold tracking-tight text-text-on-brand">nCore</span>
            </div>

            {/* Capability chips inside the nucleus. */}
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {CAPABILITIES.map((cap) => (
                <span
                  key={cap}
                  className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-1 text-center font-display text-[9px] font-medium leading-tight tracking-tight text-text-on-brand/85"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Geometry helpers ─────────────────────────────────────────────────────────
function bowed(ax: number, ay: number, bx: number, by: number, bow: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (ax + bx) / 2 + (-dy / len) * bow;
  const cy = (ay + by) / 2 + (dx / len) * bow;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
}

function bowedPartial(ax: number, ay: number, bx: number, by: number, bow: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (ax + bx) / 2 + (-dy / len) * bow;
  const cy = (ay + by) / 2 + (dx / len) * bow;
  const t = 0.74;
  const it = 1 - t;
  const ex = it * it * ax + 2 * it * t * cx + t * t * bx;
  const ey = it * it * ay + 2 * it * t * cy + t * t * by;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${ex} ${ey}`;
}
