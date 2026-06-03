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
// are the FragmentationWeb / CollapseNode glass-chip material + InfraIcon family
// (the canonical §8.1 frosted glass — translucent, edge-lit, lit from the
// top-left, a diffuse float shadow); the nucleus echoes NCoreStack's engine (a
// recessed navy core with a cyan interface edge + an inner bloom rising from the
// base). The legacy→product label pairs mirror FragmentationWeb's
// DEFAULT_WEB_VENDORS → NCoreStack's canonical six. Count is the locked six.
//
// MOTION MODEL: nothing animates on its own — every value is derived from
// `progress` via useTransform, so it is fully scrubbable and, when the parent
// passes a constant progress (reduced-motion / mobile / SSR), it renders the
// resolved state with zero motion. No timers, no perpetual loops (Rule 6 + the
// no-AI-slop-motion rule).
//
// ON-SYSTEM: composed on GlassAtmosphere (never glass on a flat bed, §8.1).
// Cool palette only — the pain reads through tilt, desaturation, broken seams
// and stale mono statuses, never alarm red. Tokens only (visual / withAlpha).

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

// The frosted-glass cyan top-edge hairline (the §8.1 brand cue) as a 1px
// background layer — asymmetric, brightest at the top-left where light enters,
// with a soft horizontal falloff. Mirrors GlassPanel's GlassMaterial hairline.
const glassHairline = (peak: number, mid: number) =>
  `linear-gradient(to right, transparent 0%, ${withAlpha(CYAN, peak)} 22%, ${withAlpha(
    CYAN,
    mid,
  )} 60%, transparent 92%) center top / 100% 1px no-repeat`;

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

  // ── State 1 cool gloom — a heavy bottom-up vignette that lifts as the estate
  //    heals, so State 1 reads "tired / heavy" and State 4 reads "resolved". ──
  const gloomOpacity = useTransform(progress, [0.28, 0.6], [1, 0]);
  // ── State 4 resolved field — a soft cyan lift across the whole scene. ──
  const resolvedGlow = useTransform(progress, [0.6, 0.9], [0, 1]);

  // ── Nucleus emerges beneath the architecture. Stops mostly-revealed. ──
  const coreOpacity = useTransform(progress, [0.6, 0.82], [0, 1]);
  const coreScale = useTransform(progress, [0.6, 0.86], [0.86, 1]);
  const coreBloom = useTransform(progress, [0.6, 0.86, 1], [0, 0.95, 0.82]);

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

      {/* State-1 cool gloom — a deep bottom-up + corner vignette so the estate
          reads tired and heavy, sitting under its own weight. Cool, contained,
          never an alarm wash. Lifts as the systems heal. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: gloomOpacity,
          background:
            `radial-gradient(125% 80% at 50% 122%, ${withAlpha(visual.navy, 0.22)}, transparent 58%),` +
            `radial-gradient(90% 70% at 8% 6%, ${withAlpha(visual.indigo, 0.12)}, transparent 60%),` +
            `linear-gradient(180deg, transparent 40%, ${withAlpha(visual.navy, 0.1)} 100%)`,
        }}
      />

      {/* State-4 resolved lift — a soft cyan halo blooming from the centre as
          the platform comes online. The "alive" counterpoint to the gloom. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: resolvedGlow,
          background: `radial-gradient(60% 52% at 50% 47%, ${withAlpha(CYAN, 0.1)}, transparent 70%)`,
        }}
      />

      {/* ── Connector layer (SVG, behind the chips) ─────────────────────── */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tx-seam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={visual.primary} stopOpacity={0.95} />
            <stop offset="55%" stopColor={visual.indigo} stopOpacity={0.85} />
            <stop offset="100%" stopColor={visual.primary} stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="tx-spoke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={CYAN} stopOpacity={0.1} />
            <stop offset="100%" stopColor={CYAN} stopOpacity={0.75} />
          </linearGradient>
        </defs>

        {/* Tangled, bowed, partly-broken seams between the scattered systems.
            Each seam is a soft navy "casing" underlay + a crisp gradient core,
            so the cabling reads physical and heavy (FragmentationWeb material),
            not like a faint network diagram. */}
        <motion.g style={{ opacity: tangledOpacity }}>
          {MODULES.map((m, i) => {
            const next = MODULES[(i + 1) % MODULES.length];
            const skip = MODULES[(i + 2) % MODULES.length];
            const bow = i % 2 === 0 ? 9 : -11;
            const broken = i % 3 === 1;
            const dChain = bowed(m.sx, m.sy, next.sx, next.sy, bow);
            const dCross = broken
              ? bowedPartial(m.sx, m.sy, skip.sx, skip.sy, -bow)
              : bowed(m.sx, m.sy, skip.sx, skip.sy, -bow);
            return (
              <g key={`seam-${i}`}>
                {/* chain link — casing + core */}
                <path d={dChain} fill="none" stroke={withAlpha(visual.navy, 0.13)} strokeWidth={3.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d={dChain} fill="none" stroke="url(#tx-seam)" strokeWidth={1.7} strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.92} />
                {/* cross link — casing + core (broken ones stop short, dashed) */}
                <path d={dCross} fill="none" stroke={withAlpha(visual.navy, 0.11)} strokeWidth={broken ? 2.6 : 2.8} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path
                  d={dCross}
                  fill="none"
                  stroke="url(#tx-seam)"
                  strokeWidth={1.3}
                  strokeLinecap="round"
                  strokeDasharray={broken ? "0.6 1.8" : undefined}
                  vectorEffect="non-scaling-stroke"
                  opacity={broken ? 0.62 : 0.8}
                />
                {/* frayed loose end on a broken seam */}
                {broken && (() => {
                  const e = bowedEnd(m.sx, m.sy, skip.sx, skip.sy, -bow, 0.74);
                  return <circle cx={e.x} cy={e.y} r={0.9} fill={withAlpha(visual.navy, 0.5)} />;
                })()}
              </g>
            );
          })}
        </motion.g>

        {/* Clean radial spokes — each ordered module to the nucleus. A soft
            cyan casing underlay + a crisp gradient core (brightest toward the
            nucleus) so the spokes read as lit conduits, not hairlines. */}
        <motion.g style={{ opacity: spokesOpacity }}>
          {MODULES.map((m, i) => (
            <g key={`spoke-${i}`}>
              <line x1={m.ox} y1={m.oy} x2={C.x} y2={C.y} stroke={withAlpha(CYAN, 0.16)} strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <line x1={m.ox} y1={m.oy} x2={C.x} y2={C.y} stroke="url(#tx-spoke)" strokeWidth={1.2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
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
      <ScanLine left={scanLeft} opacity={scanOpacity} />
    </div>
  );
}

// ── The intelligent scan ─────────────────────────────────────────────────────
// Not a hairline rule: a lidar / Vision-Pro sweep — a soft wide trailing wake,
// a bright narrow core, a leading-edge bloom and a faint vertical scan texture,
// so it reads as the system *reading* every surface it passes.
function ScanLine({ left, opacity }: { left: MotionValue<string>; opacity: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-30"
      style={{ left, opacity, x: "-50%" }}
    >
      {/* Wide trailing wake — the volume the scan has already read, dissipating
          to the left. */}
      <span
        className="absolute inset-y-0 right-1/2 w-24"
        style={{ background: `linear-gradient(to left, ${withAlpha(CYAN, 0.22)}, transparent)` }}
      />
      {/* Faint vertical scan texture inside the wake (lidar lines). */}
      <span
        className="absolute inset-y-0 right-1/2 w-16 opacity-50"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, ${withAlpha(CYAN, 0.16)} 0px, ${withAlpha(CYAN, 0.16)} 1px, transparent 1px, transparent 7px)`,
        }}
      />
      {/* Leading bloom — a soft glow just ahead of the core. */}
      <span
        className="absolute inset-y-0 left-1/2 w-10"
        style={{ background: `linear-gradient(to right, ${withAlpha(CYAN, 0.12)}, transparent)` }}
      />
      {/* The bright core line + a tight halo. */}
      <span
        className="absolute inset-y-[6%] left-1/2 w-px -translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, transparent, ${CYAN} 18%, ${CYAN} 82%, transparent)`,
          boxShadow: `0 0 28px 7px ${withAlpha(CYAN, 0.55)}`,
        }}
      />
    </motion.div>
  );
}

// ── A single module chip ─────────────────────────────────────────────────────
// The canonical §8.1 frosted glass (FragmentationWeb / GlassPanel material):
// translucent (never solid white), backdrop-blur + saturate, a cyan top-edge
// hairline, a top-left directional bloom (lit from the room), a two-line
// readout giving it depth, and a soft diffuse float shadow so it sits embedded
// in the field, not stamped on it. Scattered + tilted + DESATURATED + tired in
// State 1; heals as the scan passes its x-position (tilt → 0, saturate → 1, a
// brighter base, legacy label → product name, stale → "live", a cyan edge-glow
// lighting up); converges to its ring position in State 3 → 4.
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
  // Desaturated AND dimmed in State 1 (tired), full + bright once healed.
  const sat = useTransform(progress, [0.25, healEnd], [0.6, 1]);
  const bright = useTransform(progress, [0.25, healEnd], [0.92, 1]);
  const filter = useMotionTemplate`saturate(${sat}) brightness(${bright})`;

  const legacyOpacity = useTransform(progress, [healStart, healEnd], [1, 0]);
  const productOpacity = useTransform(progress, [healStart, healEnd], [0, 1]);

  // A faint duplicate "ghost" record sits behind the chip in State 1 and merges
  // in as it heals (the "duplicated customer records merge" beat). Two of six.
  const hasGhost = index % 3 === 0;
  const ghostOpacity = useTransform(progress, [healStart - 0.04, healEnd], [0.5, 0]);
  const ghostShift = useTransform(progress, [healStart - 0.04, healEnd], [7, 0]);

  // The lit edge-glow as the scan touches the chip (a bright flash) settling to
  // a quiet persistent cyan edge once healed/live.
  const litFlash = useTransform(progress, [healStart - 0.02, healStart, healEnd], [0, 1, 0]);
  const liveEdge = useTransform(progress, [healStart, healEnd], [0, 1]);

  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: leftPct, top: topPct }}
    >
      <motion.div style={{ rotate, scale, filter }} className="relative">
        {/* Duplicate ghost record (State 1 only) — a faint offset glass copy. */}
        {hasGhost && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl border border-white/55 bg-white/35 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]"
            style={{ opacity: ghostOpacity, x: ghostShift, y: ghostShift }}
          />
        )}

        {/* The glass chip — frosted, translucent, edge-lit, with a float
            shadow. Never a solid white pill. */}
        <div
          className={cn(
            "relative isolate w-[128px] overflow-hidden rounded-xl border backdrop-blur-[18px] backdrop-saturate-[180%] sm:w-[146px]",
            "border-white/60 bg-white/55",
            "shadow-[0_14px_34px_-14px_rgba(14,26,51,0.5),0_2px_6px_-2px_rgba(14,26,51,0.12)]",
            "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_16px_38px_-16px_rgba(0,0,0,0.7)]",
          )}
        >
          {/* Lit material — environmental light caught in the glass: a cyan
              top-edge hairline, a top-left directional bloom, a faint indigo
              lower-edge diffusion. Mirrors GlassPanel's GlassMaterial. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 dark:hidden"
            style={{
              background: [
                glassHairline(0.5, 0.26),
                `radial-gradient(120% 100% at 20% -8%, ${withAlpha(visual.white, 0.5)}, transparent 60%)`,
                `radial-gradient(120% 80% at 52% 116%, ${withAlpha(visual.indigo, 0.08)}, transparent 66%)`,
              ].join(", "),
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
            style={{
              background: [
                glassHairline(0.42, 0.2),
                `radial-gradient(120% 100% at 20% -8%, ${withAlpha(visual.white, 0.07)}, transparent 60%)`,
                `radial-gradient(120% 82% at 50% 115%, ${withAlpha(visual.indigo, 0.1)}, transparent 70%)`,
              ].join(", "),
            }}
          />

          {/* Cyan edge-glow: a bright flash as the scan touches, settling to a
              quiet persistent live edge once healed. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-xl ring-1 ring-inset"
            style={{ opacity: litFlash, boxShadow: `inset 0 0 20px ${withAlpha(CYAN, 0.5)}`, ["--tw-ring-color" as string]: withAlpha(CYAN, 0.7) }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-xl ring-1 ring-inset"
            style={{ opacity: liveEdge, boxShadow: `inset 0 0 14px ${withAlpha(CYAN, 0.16)}`, ["--tw-ring-color" as string]: withAlpha(CYAN, 0.32) }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 px-2.5 pb-1.5 pt-2">
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
                    <span className="inline-block size-1 rounded-full" style={{ background: CYAN, boxShadow: `0 0 5px ${withAlpha(CYAN, 0.8)}` }} />
                    <span style={{ color: CYAN }}>live</span>
                  </motion.span>
                </span>
              </div>
            </div>
            {/* Crude mismatched "readout" — two bars of different widths, so each
                system reads as its own ad-hoc console (FragmentationWeb depth
                cue), divided off the header by a hairline. Cool-only. */}
            <div
              className="space-y-1 border-t px-2.5 pb-2 pt-1.5"
              style={{ borderColor: withAlpha(visual.navy, 0.08) }}
            >
              <span className="block h-1 w-full rounded-full" style={{ background: withAlpha(visual.primary, 0.22) }} />
              <span className="block h-1 w-3/5 rounded-full" style={{ background: withAlpha(visual.indigo, 0.2) }} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── The nucleus — the unified nCore platform ─────────────────────────────────
// Not a flat rectangle: a dimensional infrastructure core that reads as sitting
// BENEATH the module ring. Echoes NCoreStack's Engine — a recessed navy core
// with a cyan interface edge at the top, an inner cyan bloom rising from the
// base, a rim light, and a soft "platform plate" + bloom beneath it. The
// capability chips reveal inside, lit from within.
function Nucleus({
  opacity,
  scale,
  bloom,
}: {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  bloom: MotionValue<number>;
}) {
  // The plate beneath the core fades in a touch behind the core itself.
  const plate = useTransform(bloom, [0, 0.9], [0, 0.7]);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, scale }}
    >
      <div className="relative">
        {/* Outer cyan bloom behind the core — the platform "coming online". */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-12 rounded-full"
          style={{
            opacity: bloom,
            background: `radial-gradient(50% 50% at 50% 50%, ${withAlpha(CYAN, 0.32)}, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
        {/* A faint platform plate beneath the core — an elliptical shadow + a
            cyan kiss, so the core reads as seated ON a base, not floating. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 left-1/2 h-8 w-[150%] -translate-x-1/2 rounded-[50%]"
          style={{
            opacity: plate,
            background: `radial-gradient(50% 100% at 50% 0%, ${withAlpha(CYAN, 0.2)}, transparent 72%)`,
            filter: "blur(6px)",
          }}
        />

        {/* The core — recessed navy glass. A rim of cyan interface light, a top
            hairline, an inner bloom rising from the base, and a top-left lit
            edge so it reads dimensional, not as a flat box. */}
        <div className="relative w-[180px] overflow-hidden rounded-[22px] border border-white/15 bg-brand-navy/95 px-4 py-4 shadow-[0_28px_64px_-22px_rgba(14,26,51,0.7),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md sm:w-[206px] dark:bg-brand-navy">
          {/* Inner cyan interface bloom rising from the base (the engine glow). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(85% 75% at 50% 105%, ${withAlpha(CYAN, 0.34)}, transparent 68%)` }}
          />
          {/* Top-left lit edge — environmental light on the core's face. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(90% 70% at 18% -6%, ${withAlpha(visual.white, 0.12)}, transparent 58%)` }}
          />
          {/* Cyan interface edge at the top. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: withAlpha(CYAN, 0.7) }} />
          {/* A soft inset rim so the core reads recessed (light catches the rim). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset"
            style={{ ["--tw-ring-color" as string]: withAlpha(CYAN, 0.18) }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="size-1.5 rounded-full" style={{ background: CYAN, boxShadow: `0 0 6px ${withAlpha(CYAN, 0.9)}` }} />
              <span className="font-display text-lg font-bold tracking-tight text-text-on-brand">nCore</span>
            </div>

            {/* Capability chips inside the nucleus — translucent, lit from
                within so they read as live interface elements on the core. */}
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {CAPABILITIES.map((cap) => (
                <span
                  key={cap}
                  className="rounded-md border border-white/[0.12] bg-white/[0.07] px-1.5 py-1 text-center font-display text-[9px] font-medium leading-tight tracking-tight text-text-on-brand/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
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
  const e = bowedEnd(ax, ay, bx, by, bow, 0.74);
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (ax + bx) / 2 + (-dy / len) * bow;
  const cy = (ay + by) / 2 + (dx / len) * bow;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${e.x} ${e.y}`;
}

// The point at parameter t along the bowed quadratic (for a frayed loose end).
function bowedEnd(ax: number, ay: number, bx: number, by: number, bow: number, t: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (ax + bx) / 2 + (-dy / len) * bow;
  const cy = (ay + by) / 2 + (dx / len) * bow;
  const it = 1 - t;
  return {
    x: it * it * ax + 2 * it * t * cx + t * t * bx,
    y: it * it * ay + 2 * it * t * cy + t * t * by,
  };
}
