"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useId } from "react";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import { GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── FragmentationWeb — the bank's stitched-together estate (Homepage §3) ─────
//
// The pain made literal: the payments lifecycle as SEPARATE LEGACY SYSTEMS —
// each its own little mismatched console, bolted on at its own angle, at its
// own size, crudely wired together with crossed, bowed, broken and taped
// seams. It must read instantly as "fragmented, mismatched, painful" — a heap
// of disparate systems duct-taped into a stack, NEVER a tidy node diagram and
// NEVER flat cards in white space.
//
// REWORK (owner direction, 2026-06): the previous treatment read as a thin,
// faint hub-and-spoke node diagram on a near-white field — exactly the banned
// "node diagram / orbital ecosystem" look (design-system.md §1), and it didn't
// land the pain. This rebuild makes each vendor a SYSTEM PANEL (a tiny legacy
// console: icon + name + a couple of crude mismatched "readout" lines and a
// status chip), so the estate reads as real, separate systems — different
// sizes, slight tilts, crowded, partly overlapping — wired with heavy, messy,
// broken, taped cabling. The seams are thick and physical, not a faint graph.
//
// COUNT-AGNOSTIC (owner direction, non-negotiable): every panel, seam, tape
// patch, broken-seam and status derives from the `vendors` array. Add or remove
// a system and the scatter, the tangle and the seam joints all recompute — the
// story is "a sprawl, stitched together," never "N → one".
//
// ON-SYSTEM: cool-only palette (no alarm red — the pain reads through tangle,
// density, mismatch, broken seams and a heavy cool tone, never colour-coding).
// The panels reuse the InfraIcon family + the system card material so the SAME
// vocabulary carries into the §4 NCoreStack answer. Composed on GlassAtmosphere
// (depth="deep", a quiet muted azure field) — never a flat bed (§8.1). Internal
// padding always.
//
// MOTION: Framer once-on-enter. The seams draw/settle in tangled, the panels
// settle at irregular tilts, the tape patches fade in last — the estate
// "assembling itself, badly," in front of you. Hover squares a panel up a hair
// and brightens its seams (the Stripe-style react). Reduced-motion → the
// settled tangled end-state, statically.
//
// REUSE: this is the `fragmented` surface that `SignatureStitchToCore` composes
// for its entry phase, and the source geometry the §4 morph converges.

export type WebVendor = { icon: IconName; label: string; status: string };

// The payments lifecycle as the bank actually runs it today — each stage a
// SEPARATE legacy system. Mirrors the §3 illustration note (Cards → Lending →
// Money Movement → Settlement → Financial Crime → Reconciliation). Illustrative
// sprawl, NOT a fixed count.
export const DEFAULT_WEB_VENDORS: WebVendor[] = [
  { icon: "cards", label: "Card processor", status: "v3.1" },
  { icon: "lending", label: "Loan servicer", status: "legacy" },
  { icon: "money-movement", label: "Cross-border", status: "vendor B" },
  { icon: "settlement", label: "Settlement ledger", status: "batch" },
  { icon: "fraud", label: "Fraud + AML", status: "3rd party" },
  { icon: "reconciliation", label: "Recon engine", status: "nightly" },
];

// ── Geometry (a wide 100×64 field; panels scatter, seams tangle) ─────────────
//
// Deterministic per-index placement so the layout is stable across renders but
// reads irregular/assembled (no tidy ring, no grid). Golden-angle distributes
// the panels; a per-index radius + jitter pushes them off any single band, and
// a vertical squash keeps the field landscape. Count-agnostic.
const FIELD = { w: 100, h: 64 };
const CENTER = { x: 50, y: 32 };

function nodePoint(i: number) {
  const golden = 2.399963; // golden angle (rad) — irregular, non-repeating
  const angle = i * golden + 2.2; // phase so the first panel isn't dead-centre
  const band = i % 3 === 0 ? 40 : i % 3 === 1 ? 34 : 28;
  const jitter = ((i * 53) % 11) - 5; // deterministic ±5 wobble
  const r = band + jitter;
  return {
    x: CENTER.x + Math.cos(angle) * r * 0.86,
    y: CENTER.y + Math.sin(angle) * (r * 0.82), // squash → landscape sprawl
  };
}

// A tangled seam between two panels — a quadratic curve bowed off the straight
// line, so connections read as messy point-to-point integrations, never a clean
// hub. Returns the curve + a point at parameter `t` (for placing tape) + the
// tangent angle there (for orienting the tape across the seam).
function tangledSeam(
  a: { x: number; y: number },
  b: { x: number; y: number },
  bow: number,
  t = 0.5,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  const it = 1 - t;
  const pt = {
    x: it * it * a.x + 2 * it * t * cx + t * t * b.x,
    y: it * it * a.y + 2 * it * t * cy + t * t * b.y,
  };
  const tx = 2 * it * (cx - a.x) + 2 * t * (b.x - cx);
  const ty = 2 * it * (cy - a.y) + 2 * t * (b.y - cy);
  const tapeAngle = (Math.atan2(ty, tx) * 180) / Math.PI;
  return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`, mid: pt, tapeAngle };
}

// A BROKEN seam — the bowed curve stopping short of `b` (the literal "seam
// where things break"): a → ~78% along, leaving a visible gap before the
// target. Returns the partial path and the loose end (for the frayed tip).
function brokenSeam(
  a: { x: number; y: number },
  b: { x: number; y: number },
  bow: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  const t = 0.78;
  const it = 1 - t;
  const end = {
    x: it * it * a.x + 2 * it * t * cx + t * t * b.x,
    y: it * it * a.y + 2 * it * t * cy + t * t * b.y,
  };
  return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${end.x} ${end.y}`, end };
}

// A small deterministic tilt per panel so the estate reads mismatched/assembled
// (each system bolted on at its own slight angle), never a clean aligned set.
function nodeTilt(i: number) {
  return (((i * 31) % 9) - 4) * 1.5; // deterministic ~±6deg — visibly mismatched
}

// A deterministic per-panel scale so the systems read mismatched in SIZE too
// (different eras / vendors / footprints) — never a uniform set.
function nodeScale(i: number) {
  return [1, 0.86, 1.08, 0.92, 1.04, 0.88][i % 6];
}

export function FragmentationWeb({
  vendors = DEFAULT_WEB_VENDORS,
  className,
}: {
  vendors?: WebVendor[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const n = vendors.length;
  const points = vendors.map((_, i) => nodePoint(i));

  // Seams: a chain (each panel → the next) PLUS dense cross-links (two and
  // three ahead) so the graph reads genuinely tangled — seams crossing all over
  // the frame, never a clean radial hub. A subset are BROKEN (stop short). Each
  // seam may carry a tape patch. Count-agnostic — all wrap with modulo.
  type Seam = {
    d: string;
    mid: { x: number; y: number };
    tapeAngle: number;
    end?: { x: number; y: number };
    key: string;
    weight: number;
    dashed: boolean;
    tape: boolean;
    broken: boolean;
  };
  const seams: Seam[] = [];
  points.forEach((p, i) => {
    // chain link → next.
    const next = points[(i + 1) % n];
    const s1 = tangledSeam(p, next, i % 2 === 0 ? 11 : -13, 0.24);
    seams.push({ ...s1, key: `chain-${i}`, weight: 1.9, dashed: false, tape: i % 2 === 0, broken: false });

    // cross link → two ahead (the dense tangle); a quarter break.
    if (n > 3) {
      const skip = points[(i + 2) % n];
      const broken = i % 4 === 1;
      if (broken) {
        const bs = brokenSeam(p, skip, i % 3 === 0 ? -16 : 15);
        const s2 = tangledSeam(p, skip, i % 3 === 0 ? -16 : 15, 0.8);
        seams.push({ d: bs.d, mid: s2.mid, tapeAngle: s2.tapeAngle, end: bs.end, key: `cross-${i}`, weight: 1.4, dashed: true, tape: false, broken: true });
      } else {
        const s2 = tangledSeam(p, skip, i % 3 === 0 ? -16 : 15, 0.8);
        seams.push({ ...s2, key: `cross-${i}`, weight: 1.4, dashed: true, tape: i % 3 === 1, broken: false });
      }
    }

    // far link → three ahead (a few long crossing strands).
    if (n > 5 && i % 2 === 0) {
      const far = points[(i + 3) % n];
      const broken = i % 4 === 0;
      if (broken) {
        const bs = brokenSeam(p, far, 18);
        const s3 = tangledSeam(p, far, 18, 0.2);
        seams.push({ d: bs.d, mid: s3.mid, tapeAngle: s3.tapeAngle, end: bs.end, key: `far-${i}`, weight: 1.2, dashed: false, tape: false, broken: true });
      } else {
        const s3 = tangledSeam(p, far, 18, 0.2);
        seams.push({ ...s3, key: `far-${i}`, weight: 1.2, dashed: false, tape: false, broken: false });
      }
    }
  });

  const viewport = { once: true, amount: 0.3 } as const;

  const seamTransition = (i: number): Transition =>
    reduced
      ? { duration: 0 }
      : { duration: dur.deliberate, ease: ease.cinematic, delay: 0.05 + i * 0.02 };

  return (
    <div
      role="img"
      aria-label="The payments lifecycle run as separate legacy systems — a card processor, a loan servicer, cross-border, a settlement ledger, fraud and AML, a reconciliation engine — each its own mismatched console, crudely wired together with crossed, broken and taped seams: the bank's fragmented, assembled estate."
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-2xl border",
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_24px_60px_-30px_rgba(14,26,51,0.32)] dark:shadow-[0_26px_60px_-26px_rgba(0,0,0,0.62)]",
        className,
      )}
    >
      {/* Quiet, muted cool field — the fragmented estate reads tired/heavy, not
          celebratory. A deep low-saturation azure field so the tangle sits in a
          cool gloom, never an alarm wash and never a flat bed (§8.1). */}
      <GlassAtmosphere tone="azure" depth="deep" />
      {/* A bottom-up vignette adds weight so the tangle feels like it sags
          under its own seams — premium tone, contained, cool. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 120%, ${withAlpha(
            visual.navy,
            0.14,
          )}, transparent 60%)`,
        }}
      />

      {/* Internal padding — the composition never runs flush to an edge. */}
      <div className="absolute inset-0 p-7 sm:p-9 lg:p-10">
        <div className="relative h-full w-full">
          {/* ── Seam / tape layer ────────────────────────────────────────── */}
          <svg
            viewBox={`0 0 ${FIELD.w} ${FIELD.h}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`seam-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={visual.primary} stopOpacity={0.95} />
                <stop offset="55%" stopColor={visual.indigo} stopOpacity={0.88} />
                <stop offset="100%" stopColor={visual.primary} stopOpacity={0.82} />
              </linearGradient>
            </defs>

            {/* Tangled seams — bowed, crossed, dense, heavy cables; a subset
                broken (stopping short, with a frayed loose end). Each seam is a
                soft "casing" underlay + a crisp core so the cables read physical
                and heavy, not like a faint network diagram. Settle in on enter
                (opacity reveal — pathLength draw-in avoided: non-scaling-stroke
                under a non-uniform viewBox leaves dash artifacts). */}
            {seams.map((s, i) => (
              <g key={s.key}>
                <motion.path
                  d={s.d}
                  fill="none"
                  stroke={withAlpha(visual.navy, 0.14)}
                  strokeWidth={s.weight + 1.6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: 1 }}
                  viewport={viewport}
                  transition={seamTransition(i)}
                  style={reduced ? { opacity: 1 } : undefined}
                />
                <motion.path
                  d={s.d}
                  fill="none"
                  stroke={`url(#seam-${uid})`}
                  strokeWidth={s.weight}
                  strokeLinecap="round"
                  strokeDasharray={s.dashed ? "0.6 1.6" : undefined}
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: s.dashed ? 0.72 : 0.95 }}
                  viewport={viewport}
                  transition={seamTransition(i)}
                  style={reduced ? { opacity: s.dashed ? 0.72 : 0.92 } : undefined}
                />
                {/* Broken seams: a frayed loose end — a tiny cross-hatch tick at
                    the dead stop, so the gap reads as a snapped cable, not a
                    deliberate short line. */}
                {s.broken && s.end && (
                  <motion.g
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={reduced ? undefined : { opacity: 0.85 }}
                    viewport={viewport}
                    transition={seamTransition(i)}
                    style={reduced ? { opacity: 0.85 } : undefined}
                  >
                    <circle cx={s.end.x} cy={s.end.y} r={0.9} fill={withAlpha(visual.navy, 0.5)} />
                  </motion.g>
                )}
              </g>
            ))}
          </svg>

          {/* ── Tape patches at the seam joints (the "held together with tape"
              read). Small skewed translucent quads over a subset of seam
              midpoints. Count-agnostic — derived from the same seams. ── */}
          {seams
            .filter((s) => s.tape)
            .map((s, i) => {
              const wobble = ((i * 47) % 9) - 4;
              const angle = s.tapeAngle + 90 + wobble;
              return (
                <motion.span
                  key={`tape-${s.key}`}
                  aria-hidden="true"
                  className="absolute z-[15] h-5 w-9 rounded-[2px] sm:h-6 sm:w-11"
                  style={{
                    left: `${(s.mid.x / FIELD.w) * 100}%`,
                    top: `${(s.mid.y / FIELD.h) * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    background: withAlpha(visual.white, 0.62),
                    border: `1px solid ${withAlpha(visual.primary, 0.24)}`,
                    boxShadow: `0 2px 8px -4px ${withAlpha(visual.navy, 0.35)}`,
                    backdropFilter: "blur(1.5px)",
                  }}
                  initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={reduced ? undefined : { opacity: 0.92, scale: 1 }}
                  viewport={viewport}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: dur.slow, ease: ease.out, delay: 0.65 + i * 0.08 }
                  }
                >
                  <span className="absolute inset-y-0 left-1/3 w-px" style={{ background: withAlpha(visual.navy, 0.14) }} />
                  <span className="absolute inset-y-0 right-1/3 w-px" style={{ background: withAlpha(visual.navy, 0.14) }} />
                  <span
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(115deg, ${withAlpha(visual.white, 0.5)}, transparent 60%)` }}
                  />
                </motion.span>
              );
            })}

          {/* ── System panels ───────────────────────────────────────────── */}
          {vendors.map((v, i) => {
            const p = points[i];
            return (
              <div
                key={v.label}
                className="absolute z-10"
                style={{
                  left: `${(p.x / FIELD.w) * 100}%`,
                  top: `${(p.y / FIELD.h) * 100}%`,
                }}
              >
                <motion.div
                  className="group/node -translate-x-1/2 -translate-y-1/2"
                  initial={reduced ? false : { opacity: 0, scale: 0.82, y: 10 }}
                  whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  viewport={viewport}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: dur.deliberate, ease: ease.out, delay: 0.25 + i * 0.07 }
                  }
                >
                  <SystemPanel
                    icon={v.icon}
                    label={v.label}
                    status={v.status}
                    tilt={nodeTilt(i)}
                    scale={nodeScale(i)}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── A single mismatched legacy SYSTEM PANEL ──────────────────────────────────
// A tiny legacy console: the InfraIcon + the system name + a crude mismatched
// "readout" (a couple of bars of different widths) and a status chip. Sits at a
// slight deterministic tilt AND scale (mismatched / bolted-on), desaturated so
// the estate reads tired. Hover squares it up a hair and lifts it (the only
// thing trying to be tidy is the cursor).
function SystemPanel({
  icon,
  label,
  status,
  tilt,
  scale,
}: {
  icon: IconName;
  label: string;
  status: string;
  tilt: number;
  scale: number;
}) {
  return (
    <div
      className={cn(
        "w-[132px] overflow-hidden rounded-xl border backdrop-blur-md sm:w-[156px]",
        "border-white/70 bg-white/72 shadow-[0_14px_34px_-16px_rgba(14,26,51,0.5)]",
        "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.66)]",
        "saturate-[0.82] transition-[transform,box-shadow,filter] duration-300 ease-out",
        "group-hover/node:saturate-100",
        "group-hover/node:shadow-[0_18px_40px_-16px_rgba(48,77,187,0.45)]",
      )}
      style={{ transform: `rotate(${tilt}deg) scale(${scale})` }}
    >
      {/* Console header — icon + system name + status chip. */}
      <div className="flex items-center gap-2 px-2.5 pb-1.5 pt-2">
        <InfraIcon name={icon} size="sm" className="!size-7 !rounded-lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[11.5px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand sm:text-[12px]">
            {label}
          </p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-secondary">
            {status}
          </p>
        </div>
      </div>
      {/* Crude mismatched "readout" — bars of different widths/tones, so each
          system reads as its own ad-hoc UI (no shared design), divided off the
          header by a hairline. Cool-only. */}
      <div
        className="space-y-1 border-t px-2.5 pb-2 pt-1.5"
        style={{ borderColor: withAlpha(visual.navy, 0.08) }}
      >
        <span className="block h-1 w-full rounded-full" style={{ background: withAlpha(visual.primary, 0.22) }} />
        <span className="block h-1 w-3/5 rounded-full" style={{ background: withAlpha(visual.indigo, 0.2) }} />
      </div>
    </div>
  );
}
