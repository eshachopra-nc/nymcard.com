"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useId } from "react";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import {
  GlassAtmosphere,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── Signature moment — "the stitched stack becomes one core" ────────────────
//
// ONE continuous designed sequence, two phases, shared visual vocabulary. This
// is the campaign's signature visual (strategy §5) and the CEO's glass-morphism
// + Framer mandate.
//
//   • phase="fragmented" (LegacyProblem §3) — a scatter of separate, labelled
//     vendor tiles connected by tangled, broken seams. The bank's assembled
//     estate: many surfaces, many seams, none of them aligned. Reads as
//     fragmentation through scatter + tangled tone, NEVER colour-coding (no
//     alarm red — cool palette only, §3).
//
//   • phase="collapse" (NCoreFoundation §4) — the same tiles converge and
//     collapse INTO a single glass core (nCore) floating on the rich
//     GlassAtmosphere / kinetic field. The tangled seams resolve to clean
//     radial spokes; the labels reappear as layers INSIDE the one core. The
//     payoff to the §3 problem beat directly above.
//
// COUNT-AGNOSTIC (owner direction, non-negotiable): every tile, seam, spoke and
// in-core layer is derived from the VENDORS array. Add or remove an entry and
// the scatter, the tangle, the convergence vectors and the inner layers all
// recompute — nothing is baked to a fixed count. The story is "a sprawl → one
// core," never "N → one."
//
// ON THE CANONICAL GLASS KIT (§8.1): the core is a frosted glass surface
// (mirroring GlassPanel) floating on GlassAtmosphere over a kinetic ribbon —
// NEVER glass on a flat bed. Navy/cyan-led; violet is the committed signature
// accent (§3), never the field. Light-first / restrained.
//
// MOTION: Framer Motion only, driven once-on-enter via whileInView. Cyan is the
// connectivity signal (§9.5.1). Reduced-motion (Rule 6) renders the clean END
// state of each phase directly — fragmented tiles settled in place, or the
// consolidated core with its layers — no perpetual motion, no scrub.
//
// REUSE: same family as NCoreStack (InfraIcon tiles + the navy engine with the
// cyan interface edge). Built as a standalone reusable component so the
// homepage problem beat, the answer beat, and (later) the nCore centerpiece all
// draw from one source — produced once, used everywhere (§5).

export type SignaturePhase = "fragmented" | "collapse";

// Illustrative examples of the sprawl — NOT a fixed count, NOT a 1:1 map to the
// product layers. Mirrors the category vendors a bank recognises in its estate
// (strategy §4b). Changing this set reflows the whole sequence.
type SignatureVendor = { icon: IconName; label: string };

const VENDORS: SignatureVendor[] = [
  { icon: "cards", label: "Card processor" },
  { icon: "fraud", label: "Fraud vendor" },
  { icon: "settlement", label: "Ledger" },
  { icon: "money-movement", label: "Cross-border" },
  { icon: "reconciliation", label: "Reconciliation" },
  { icon: "3d-secure", label: "KYC / identity" },
];

// ── Geometry ────────────────────────────────────────────────────────────────
//
// A 100×100 viewBox the SVG seam/spoke layer draws into (overlaid behind the
// HTML tiles via percentage positioning, so tiles and seams share one
// coordinate space). The core sits at centre.

const CENTER = { x: 50, y: 50 };

// Scattered positions for the fragmented state — deliberately irregular (no
// tidy ring) so the estate reads as assembled, not designed. Derived
// per-index from golden-angle placement + a deterministic radius jitter, so it
// stays count-agnostic: any N tiles scatter without overlapping the core.
function scatterPoint(i: number, n: number) {
  const golden = 2.399963; // golden angle (rad) — irregular, non-repeating
  const angle = i * golden + 0.6;
  // Radius alternates between two bands so tiles don't sit on one ring.
  const band = i % 2 === 0 ? 38 : 30;
  const jitter = ((i * 37) % 11) - 5; // deterministic ±5 wobble
  const r = band + jitter;
  return {
    x: CENTER.x + Math.cos(angle) * r,
    y: CENTER.y + Math.sin(angle) * (r * 0.82), // slightly squashed vertically
  };
}

// A tangled seam between two scattered vendors — a quadratic curve bowed off the
// straight line so the connections read as messy point-to-point integrations,
// not a clean hub. Each fragmented tile links to the NEXT one (a chain) plus one
// cross-link, so the graph looks stitched, never radial.
function tangledSeam(a: { x: number; y: number }, b: { x: number; y: number }, bow: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Perpendicular offset for the control point — the "bow" in the seam.
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

// A clean radial spoke from the core to a tile slot — the resolved connectivity.
function spoke(p: { x: number; y: number }) {
  return `M ${CENTER.x} ${CENTER.y} L ${p.x} ${p.y}`;
}

export function SignatureStitchToCore({
  phase,
  className,
}: {
  phase: SignaturePhase;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const n = VENDORS.length;
  const points = VENDORS.map((_, i) => scatterPoint(i, n));

  // Seams: chain each scattered tile to the next + a couple of cross-links so
  // the graph reads tangled. Count-agnostic (wraps with modulo).
  const seams = points.map((p, i) => ({
    d: tangledSeam(p, points[(i + 1) % n], i % 2 === 0 ? 9 : -7),
    key: `chain-${i}`,
  }));
  const crossSeams =
    n > 3
      ? [
          { d: tangledSeam(points[0], points[Math.floor(n / 2)], 13), key: "cross-a" },
          { d: tangledSeam(points[1], points[Math.min(n - 1, Math.floor(n / 2) + 1)], -11), key: "cross-b" },
        ]
      : [];
  const allSeams = [...seams, ...crossSeams];

  const isCollapse = phase === "collapse";

  // Reveal timing — cinematic, once-on-enter. The whole composition is its own
  // motion stage so children orchestrate against a shared viewport trigger.
  const viewport = { once: true, amount: 0.4 } as const;

  const tileTransition = (i: number): Transition => ({
    duration: isCollapse ? dur.cinematic : dur.deliberate,
    ease: isCollapse ? ease.cinematic : ease.out,
    delay: isCollapse ? 0.25 + i * 0.05 : 0.1 + i * 0.06,
  });

  return (
    <div
      role="img"
      aria-label={
        isCollapse
          ? "The separate vendor tiles converge and collapse into a single nCore platform, the tangled seams resolving into clean spokes and the vendors reappearing as layers inside one core."
          : "A scatter of separate, labelled vendor tiles — a card processor, a fraud vendor, a ledger, cross-border, reconciliation, identity — connected by tangled seams: the bank's assembled, fragmented estate."
      }
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-xl border",
        // The surface sits on its own atmospheric field — never a flat bed.
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_20px_48px_-24px_rgba(14,26,51,0.28)] dark:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* Rich field — the canonical atmosphere. The collapse phase leans into
          the kinetic ribbon (the answer / signature payoff); the fragmented
          phase uses a quieter deep field so the scatter reads as a cool,
          muted estate, not a celebratory wash. Both are theme-aware. */}
      {isCollapse ? (
        <>
          <GlassAtmosphere tone="indigo" depth="deep" animated />
          <KineticRibbon intensity="ambient" focus="top-right" />
        </>
      ) : (
        <GlassAtmosphere tone="azure" depth="deep" />
      )}

      {/* Internal padding — the composition never runs flush to the edge. */}
      <div className="absolute inset-0 p-6 sm:p-8">
        <div className="relative h-full w-full">
          {/* ── Seam / spoke layer ───────────────────────────────────────── */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`seam-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={visual.indigo} stopOpacity={0.55} />
                <stop offset="100%" stopColor={visual.cyan} stopOpacity={0.45} />
              </linearGradient>
              <radialGradient id={`spoke-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={visual.cyan} stopOpacity={0.75} />
                <stop offset="100%" stopColor={visual.cyan} stopOpacity={0.15} />
              </radialGradient>
            </defs>

            {/* Tangled seams — present in the fragmented phase; in collapse they
                fade out as the clean spokes draw in. */}
            {allSeams.map((s, i) => (
              <motion.path
                key={s.key}
                d={s.d}
                fill="none"
                stroke={`url(#seam-${uid})`}
                strokeWidth={0.6}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={
                  reduced
                    ? false
                    : isCollapse
                      ? { opacity: 0.5, pathLength: 1 }
                      : { opacity: 0, pathLength: 0 }
                }
                whileInView={
                  reduced
                    ? undefined
                    : isCollapse
                      ? { opacity: 0 }
                      : { opacity: 0.5, pathLength: 1 }
                }
                viewport={viewport}
                transition={
                  reduced
                    ? undefined
                    : isCollapse
                      ? { duration: dur.deliberate, ease: ease.out, delay: 0.15 + i * 0.03 }
                      : { duration: dur.cinematic, ease: ease.cinematic, delay: 0.05 + i * 0.05 }
                }
                style={
                  reduced
                    ? { opacity: isCollapse ? 0 : 0.5 }
                    : undefined
                }
              />
            ))}

            {/* Clean spokes — only in collapse: drawn from the core out to each
                resolved slot once the seams clear. */}
            {isCollapse &&
              points.map((p, i) => (
                <motion.path
                  key={`spoke-${i}`}
                  d={spoke(p)}
                  fill="none"
                  stroke={`url(#spoke-${uid})`}
                  strokeWidth={0.7}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { opacity: 0, pathLength: 0 }}
                  whileInView={reduced ? undefined : { opacity: 0.7, pathLength: 1 }}
                  viewport={viewport}
                  transition={
                    reduced
                      ? undefined
                      : { duration: dur.deliberate, ease: ease.out, delay: 1.1 + i * 0.05 }
                  }
                  style={reduced ? { opacity: 0.55 } : undefined}
                />
              ))}
          </svg>

          {/* ── Vendor tiles ─────────────────────────────────────────────── */}
          {VENDORS.map((v, i) => {
            const p = points[i];
            // Each tile is anchored at its scatter point in the same 0–100
            // space the SVG seams use (so seams meet the tiles exactly). On
            // collapse the tile drifts INWARD toward the core (along the unit
            // vector to centre) while fading + shrinking, so the scatter reads
            // as converging. The drift is a multiple of the tile's own size
            // (em-based, resolution-independent, count-agnostic); the tile
            // fades to 0 before it would overshoot, so it never needs to land
            // precisely on the core. In the fragmented phase it settles in
            // place.
            const dx = CENTER.x - p.x;
            const dy = CENTER.y - p.y;
            const mag = Math.hypot(dx, dy) || 1;
            const drift = 6; // em of inward travel
            const towardCenter = {
              x: `${(dx / mag) * drift}em`,
              y: `${(dy / mag) * drift}em`,
            };
            return (
              <div
                key={v.label}
                className="absolute z-10"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <motion.div
                  className="-translate-x-1/2 -translate-y-1/2"
                  initial={
                    reduced
                      ? false
                      : isCollapse
                        ? { opacity: 1, scale: 1, x: 0, y: 0 }
                        : { opacity: 0, scale: 0.8 }
                  }
                  whileInView={
                    reduced
                      ? undefined
                      : isCollapse
                        ? { opacity: 0, scale: 0.5, ...towardCenter }
                        : { opacity: 1, scale: 1 }
                  }
                  viewport={viewport}
                  transition={tileTransition(i)}
                  style={reduced && isCollapse ? { opacity: 0 } : undefined}
                >
                  <SignatureTile icon={v.icon} label={v.label} muted={!isCollapse} />
                </motion.div>
              </div>
            );
          })}

          {/* ── The core ─────────────────────────────────────────────────── */}
          {isCollapse && (
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 w-[58%] max-w-[280px] -translate-x-1/2 -translate-y-1/2"
              initial={reduced ? false : { opacity: 0, scale: 0.82 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={
                reduced
                  ? undefined
                  : { duration: dur.cinematic, ease: ease.cinematic, delay: 0.95 }
              }
              style={reduced ? { opacity: 1 } : undefined}
            >
              <NCore vendors={VENDORS} reduced={!!reduced} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── A scattered vendor tile ─────────────────────────────────────────────────
// Reuses the InfraIcon family + the system card material. `muted` desaturates
// the fragmented tiles a touch so the estate reads tired/assembled (tone, not
// alarm colour).
function SignatureTile({
  icon,
  label,
  muted,
}: {
  icon: IconName;
  label: string;
  muted: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-2.5 py-2 backdrop-blur-md",
        "border-white/70 bg-white/65 shadow-[0_10px_28px_-16px_rgba(14,26,51,0.4)]",
        "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)]",
        muted && "saturate-[0.85]",
      )}
    >
      <InfraIcon name={icon} size="sm" />
      <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
        {label}
      </span>
    </div>
  );
}

// ── The one core (nCore) ─────────────────────────────────────────────────────
// A frosted glass surface (mirrors GlassPanel / the §8.8 GlassSurface material)
// floating on the field. The vendors reappear as compact LAYERS inside it — the
// resolution: separate vendors are now facets of one system. Same family as the
// NCoreStack engine: navy engine base with the cyan interface edge.
function NCore({
  vendors,
  reduced,
}: {
  vendors: SignatureVendor[];
  reduced: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border p-3.5",
        "border-white/70 bg-white/60 backdrop-blur-[22px] backdrop-saturate-[180%]",
        "dark:border-white/[0.12] dark:bg-surface-dark-glass dark:backdrop-saturate-[160%]",
        "shadow-[0_26px_60px_-24px_rgba(14,26,51,0.55)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_64px_-22px_rgba(0,0,0,0.7)]",
      )}
    >
      {/* cyan top-edge hairline — the brand cue (§8.1: critical) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.6,
          )} 30%, ${withAlpha(visual.cyan, 0.3)} 62%, transparent 92%)`,
        }}
      />
      {/* top-left directional bloom — lit material */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(120% 96% at 20% -8%, ${withAlpha(
            visual.white,
            0.42,
          )}, ${withAlpha(visual.white, 0.06)} 32%, transparent 64%)`,
        }}
      />

      <div className="relative z-10">
        {/* The vendors, now as layers inside the one platform. Count-agnostic:
            one row per vendor, each staggers in after the core forms. */}
        <ul className="space-y-1.5">
          {vendors.map((v, i) => (
            <motion.li
              key={v.label}
              className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/55 px-2 py-1.5 dark:border-white/[0.08] dark:bg-white/[0.05]"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                reduced
                  ? undefined
                  : { duration: dur.slow, ease: ease.out, delay: 1.35 + i * 0.07 }
              }
              style={reduced ? { opacity: 1 } : undefined}
            >
              <InfraIcon name={v.icon} size="sm" className="!size-6 !rounded-md" />
              <span className="truncate font-display text-[11px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {v.label}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* nCore engine base — same family as NCoreStack: navy, cyan interface
            edge, the brand mark. The single platform underneath the layers. */}
        <motion.div
          className="relative mt-2 overflow-hidden rounded-lg bg-brand-navy px-3 py-2.5 ring-1 ring-inset ring-accent-cyan/25"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 1.25 }
          }
          style={reduced ? { opacity: 1 } : undefined}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-accent-cyan/65"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(70% 120% at 50% 100%, ${withAlpha(
                visual.cyan,
                0.28,
              )}, transparent 70%)`,
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            <span className="font-display text-base font-bold tracking-tight text-text-on-brand">
              nCore
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
