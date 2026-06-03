"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useId } from "react";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import { GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── FragmentationWeb — the bank's stitched-together estate (Homepage §3) ─────
//
// The pain made literal: a sprawl of mismatched, disparate vendor systems
// CRUDELY WIRED TOGETHER — crossed, bowed, precarious seams; uneven; visibly
// held together with tape at the joins. It must read instantly as "this is a
// fragmented, painful mess," not a tidy diagram and never flat cards.
//
// COUNT-AGNOSTIC (owner direction, non-negotiable): every node, seam and tape
// patch derives from the `vendors` array. Add or remove a system and the
// scatter, the tangle (chain + dense cross-links) and the seam joints all
// recompute — the story is "a sprawl, stitched together," never "N → one".
//
// ON-SYSTEM: cool-only palette (no alarm red — the pain reads through tangle,
// density, mismatch and a heavy tone, never colour-coding). The nodes reuse the
// InfraIcon family + the system card material so the SAME vocabulary carries
// into the §4 answer. Composed on GlassAtmosphere (depth="deep", a quiet muted
// field) — never a flat bed (§8.1). Internal padding always.
//
// MOTION: Framer once-on-enter. The seams draw in tangled (pathLength), the
// nodes settle at slight irregular tilts, the tape patches fade in last — the
// estate "assembling itself, badly," in front of you. Hover lifts a node a hair
// and brightens its seams (the Stripe-style react). Reduced-motion → the settled
// tangled end-state, statically (no draw, no perpetual motion).
//
// REUSE: this is the `fragmented` surface that `SignatureStitchToCore` composes
// for its entry phase; exported standalone so §3 owns the full-width tangle and
// the morph can reference the same geometry.

export type WebVendor = { icon: IconName; label: string };

// Illustrative sprawl — NOT a fixed count, NOT a 1:1 map to the product layers.
// Mirrors the category vendors a bank recognises across its assembled estate.
export const DEFAULT_WEB_VENDORS: WebVendor[] = [
  { icon: "cards", label: "Card processor" },
  { icon: "fraud", label: "Fraud vendor" },
  { icon: "settlement", label: "Ledger" },
  { icon: "money-movement", label: "Cross-border" },
  { icon: "reconciliation", label: "Recon engine" },
  { icon: "3d-secure", label: "KYC / identity" },
  { icon: "lending", label: "Loan servicer" },
];

// ── Geometry (a wide 100×62 field; nodes scatter, seams tangle) ──────────────
//
// Deterministic per-index placement so the layout is stable across renders but
// reads irregular/assembled (no tidy ring, no grid). Golden-angle distributes
// the nodes; a per-index radius + jitter pushes them off any single band, and a
// vertical squash keeps the field landscape. Count-agnostic.
const FIELD = { w: 100, h: 64 };
const CENTER = { x: 50, y: 32 };

// Scatter the nodes wide across the field (not on a single ring) so the seams
// drawn between them genuinely cross the whole frame. Golden-angle distributes
// the angle; the radius pushes nodes near the edges; a deterministic jitter
// breaks any residual ring. Squash is mild so the field uses its full height —
// the tangle should fill the frame, not knot in the middle.
function nodePoint(i: number) {
  const golden = 2.399963; // golden angle (rad) — irregular, non-repeating
  const angle = i * golden + 0.7;
  const band = i % 3 === 0 ? 47 : i % 3 === 1 ? 40 : 33;
  const jitter = ((i * 53) % 15) - 7; // deterministic ±7 wobble
  const r = band + jitter;
  return {
    x: CENTER.x + Math.cos(angle) * r * 0.96,
    y: CENTER.y + Math.sin(angle) * (r * 0.74), // mild squash → landscape sprawl
  };
}

// A tangled seam between two nodes — a quadratic curve bowed off the straight
// line, so connections read as messy point-to-point integrations, never a clean
// hub. `bow` is the perpendicular offset of the control point. Returns the curve
// and a point at parameter `t` along it (for placing tape away from the centre).
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
  // Quadratic bezier point at parameter t.
  const it = 1 - t;
  const pt = {
    x: it * it * a.x + 2 * it * t * cx + t * t * b.x,
    y: it * it * a.y + 2 * it * t * cy + t * t * b.y,
  };
  // Tangent angle at t (for orienting the tape patch across the seam).
  const tx = 2 * it * (cx - a.x) + 2 * t * (b.x - cx);
  const ty = 2 * it * (cy - a.y) + 2 * t * (b.y - cy);
  const tapeAngle = (Math.atan2(ty, tx) * 180) / Math.PI;
  return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`, mid: pt, tapeAngle };
}

// A BROKEN seam — the same bowed curve but stopping short of `b` (the literal
// "another seam where things break"): drawn from a → a point ~78% along, leaving
// a visible gap before the target node.
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
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
}

// A small deterministic tilt per node so the estate reads mismatched / assembled
// (each system bolted on at its own slight angle), never a clean aligned set.
function nodeTilt(i: number) {
  return (((i * 31) % 11) - 5) * 1.4; // deterministic ~±7deg — visibly mismatched
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

  // Seams: a chain (each node → the next) PLUS DENSE cross-links (each node to
  // the node two AND three ahead) so the graph reads genuinely tangled — seams
  // crossing all over the frame, never a clean radial hub. A subset are BROKEN
  // (stop short of the target) — the literal "seam where things break." Each
  // seam may carry a tape patch, placed away from the centre along the curve.
  // Count-agnostic — all wrap with modulo.
  type Seam = {
    d: string;
    mid: { x: number; y: number };
    tapeAngle: number;
    key: string;
    weight: number;
    dashed: boolean;
    tape: boolean;
    broken: boolean;
  };
  const seams: Seam[] = [];
  points.forEach((p, i) => {
    // chain link → next. Tape sits near the START node (~22% along) so it
    // clearly bandages where the seam leaves the system — like real tape on a
    // wire joint, not a chip floating in space.
    const next = points[(i + 1) % n];
    const s1 = tangledSeam(p, next, i % 2 === 0 ? 12 : -14, 0.22);
    seams.push({ ...s1, key: `chain-${i}`, weight: 1.5, dashed: false, tape: i % 2 === 0, broken: false });

    // cross link → two ahead (the dense tangle)
    if (n > 3) {
      const skip = points[(i + 2) % n];
      const s2 = tangledSeam(p, skip, i % 3 === 0 ? -18 : 16, 0.8);
      const broken = i % 4 === 1; // a quarter of the cross-links break
      seams.push({
        d: broken ? brokenSeam(p, skip, i % 3 === 0 ? -18 : 16) : s2.d,
        mid: s2.mid,
        tapeAngle: s2.tapeAngle,
        key: `cross-${i}`,
        weight: 1.1,
        dashed: true,
        tape: i % 3 === 1 && !broken,
        broken,
      });
    }

    // far link → three ahead (a few long crossing strands)
    if (n > 5 && i % 2 === 0) {
      const far = points[(i + 3) % n];
      const s3 = tangledSeam(p, far, 20, 0.2);
      seams.push({ ...s3, key: `far-${i}`, weight: 1.0, dashed: false, tape: false, broken: i % 4 === 0 });
      if (i % 4 === 0) seams[seams.length - 1].d = brokenSeam(p, far, 20);
    }
  });

  const viewport = { once: true, amount: 0.35 } as const;

  const seamTransition = (i: number): Transition =>
    reduced
      ? { duration: 0 }
      : { duration: dur.deliberate, ease: ease.cinematic, delay: 0.05 + i * 0.02 };

  return (
    <div
      role="img"
      aria-label="A sprawl of separate vendor systems — a card processor, a fraud vendor, a ledger, cross-border, reconciliation, identity, a loan servicer — crudely wired together with crossed, taped seams: the bank's fragmented, assembled estate."
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-2xl border",
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_24px_60px_-30px_rgba(14,26,51,0.32)] dark:shadow-[0_26px_60px_-26px_rgba(0,0,0,0.62)]",
        className,
      )}
    >
      {/* Quiet, muted cool field — the fragmented estate reads tired/heavy, not
          celebratory. A deep low-saturation azure field so the tangle sits in
          a cool gloom, never an alarm wash and never a flat bed (§8.1). */}
      <GlassAtmosphere tone="azure" depth="deep" />
      {/* A faint top-down vignette adds weight so the tangle feels like it sags
          under its own seams — premium tone, contained, cool. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 120%, ${withAlpha(
            visual.navy,
            0.12,
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
                <stop offset="55%" stopColor={visual.indigo} stopOpacity={0.85} />
                <stop offset="100%" stopColor={visual.primary} stopOpacity={0.8} />
              </linearGradient>
            </defs>

            {/* Tangled seams — bowed, crossed, dense cables; a subset broken
                (stopping short of the target). Each seam is drawn as a soft
                "casing" underlay + a crisp core, so the cables read physical and
                heavy, not like a faint network diagram. Drawn in on enter. */}
            {seams.map((s, i) => (
              <g key={s.key}>
                {/* soft casing underlay — gives the cable body / weight. Cables
                    fade + settle in (a staggered opacity reveal); pathLength is
                    avoided because non-scaling-stroke under a non-uniform viewBox
                    leaves dash artifacts mid-draw. */}
                {!s.broken && (
                  <motion.path
                    d={s.d}
                    fill="none"
                    stroke={withAlpha(visual.navy, 0.12)}
                    strokeWidth={s.weight + 1.4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={reduced ? undefined : { opacity: 1 }}
                    viewport={viewport}
                    transition={seamTransition(i)}
                    style={reduced ? { opacity: 1 } : undefined}
                  />
                )}
                {/* crisp core */}
                <motion.path
                  d={s.d}
                  fill="none"
                  stroke={`url(#seam-${uid})`}
                  strokeWidth={s.weight}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: s.dashed ? 0.7 : 0.92 }}
                  viewport={viewport}
                  transition={seamTransition(i)}
                  style={reduced ? { opacity: s.dashed ? 0.7 : 0.9 } : undefined}
                />
              </g>
            ))}
          </svg>

          {/* ── Tape patches at the seam joints (the "held together with tape"
              read). Small skewed translucent quads sitting over a subset of
              seam midpoints. Count-agnostic — derived from the same seams. ── */}
          {seams
            .filter((s) => s.tape)
            .map((s, i) => {
              // Orient the patch ACROSS the seam (perpendicular to the tangent),
              // plus a small deterministic wobble — the crude, hand-applied read.
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
                  {/* torn-tape striations across the patch */}
                  <span
                    className="absolute inset-y-0 left-1/3 w-px"
                    style={{ background: withAlpha(visual.navy, 0.14) }}
                  />
                  <span
                    className="absolute inset-y-0 right-1/3 w-px"
                    style={{ background: withAlpha(visual.navy, 0.14) }}
                  />
                  {/* faint diagonal sheen — sellotape, not a clean chip */}
                  <span
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(115deg, ${withAlpha(
                        visual.white,
                        0.5,
                      )}, transparent 60%)`,
                    }}
                  />
                </motion.span>
              );
            })}

          {/* ── Vendor nodes ─────────────────────────────────────────────── */}
          {vendors.map((v, i) => {
            const p = points[i];
            const tilt = nodeTilt(i);
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
                  initial={reduced ? false : { opacity: 0, scale: 0.82, y: 8 }}
                  whileInView={
                    reduced ? undefined : { opacity: 1, scale: 1, y: 0 }
                  }
                  viewport={viewport}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: dur.deliberate, ease: ease.out, delay: 0.25 + i * 0.06 }
                  }
                >
                  <WebNode icon={v.icon} label={v.label} tilt={tilt} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── A single mismatched vendor node ──────────────────────────────────────────
// Reuses the InfraIcon family. Sits at a slight deterministic tilt (mismatched /
// bolted-on) and desaturates a touch so the estate reads tired. Hover lifts it
// and squares it up a hair (the only thing trying to be tidy is the cursor).
function WebNode({
  icon,
  label,
  tilt,
}: {
  icon: IconName;
  label: string;
  tilt: number;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-2.5 py-2 backdrop-blur-md",
        "border-white/70 bg-white/70 shadow-[0_12px_30px_-16px_rgba(14,26,51,0.45)]",
        "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[0_14px_32px_-16px_rgba(0,0,0,0.62)]",
        "saturate-[0.82] transition-[transform,box-shadow,filter] duration-300 ease-out",
        "group-hover/node:-translate-y-0.5 group-hover/node:saturate-100",
        "group-hover/node:shadow-[0_16px_36px_-16px_rgba(48,77,187,0.4)]",
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <InfraIcon name={icon} size="sm" className="!size-7 !rounded-lg" />
      <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-tight tracking-tight text-text-primary sm:text-[12.5px] dark:text-text-on-brand">
        {label}
      </span>
    </div>
  );
}
