"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import { NCoreStack } from "@/components/artifacts/NCoreStack";
import {
  GlassAtmosphere,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";
import {
  FragmentationWeb,
  DEFAULT_WEB_VENDORS,
  type WebVendor,
} from "@/components/sections/FragmentationWeb";

// ── Signature moment — "the stitched stack becomes one core" ────────────────
//
// ONE continuous designed sequence, two phases, shared visual vocabulary. The
// campaign's owned visual (strategy §5) and the CEO's glass-morphism + Framer
// mandate. Self-contained and reusable — feeds the nCore-page centerpiece and a
// looping social asset (one idea, everywhere).
//
//   • phase="fragmented" — the FragmentationWeb: a sprawl of separate, labelled
//     vendor systems crudely wired together with crossed, taped, precarious
//     seams. The bank's assembled estate. (On the homepage §3 the full-width
//     FragmentationWeb is used directly; this phase is the same surface for the
//     standalone / social use of the signature.)
//
//   • phase="collapse" — the SAME tangle RESOLVES INTO the original NCoreStack.
//     The scattered vendor nodes converge inward and fade as the clean nCore
//     stack assembles in their place (six product layers on the nCore engine,
//     the cyan wave rising through them). nCore is *created* from the fragments
//     coming together — chaos → order. This is the emotional turn.
//
// REWORK (owner direction, 2026-06): the previous collapse landed on a small
// frosted card with a squashed vertical vendor list inside. Rejected — the
// destination must be the ORIGINAL NCoreStack at full presence. The morph now
// hands off to <NCoreStack/>. The timing is fixed so it never sits half-empty:
// the converging tangle and the assembling stack CROSSFADE on one timeline (the
// stack starts forming while the nodes are still drawing in), so there is no
// dead mid-state.
//
// COUNT-AGNOSTIC: the fragmented tangle derives from one `vendors` array
// (FragmentationWeb). The NCoreStack renders the canonical six product layers
// (its own locked taxonomy) — the morph is "a sprawl → one core," never
// "N → one".
//
// ON THE CANONICAL GLASS KIT (§8.1): both phases sit on GlassAtmosphere over a
// rich field — never glass on a flat bed. NCoreStack carries its own glass
// layers. Navy/cyan-led; violet is the committed signature accent (§3), never
// the field. Light-first / restrained. No alarm red.
//
// MOTION: Framer Motion only, once-on-enter. Reduced-motion (Rule 6) renders the
// clean END state of each phase directly — the settled tangle, or the NCoreStack
// — with NO perpetual motion and NO half-empty mid-state.

export type SignaturePhase = "fragmented" | "collapse";

const CENTER = { x: 50, y: 38 };

// Scatter for the collapse entry — mirrors FragmentationWeb's irregular field so
// the same estate appears to converge. Count-agnostic.
function scatterPoint(i: number) {
  const golden = 2.399963;
  const angle = i * golden + 1.1;
  const band = i % 3 === 0 ? 40 : i % 3 === 1 ? 32 : 25;
  const jitter = ((i * 53) % 13) - 6;
  const r = band + jitter;
  return {
    x: CENTER.x + Math.cos(angle) * r,
    y: CENTER.y + Math.sin(angle) * (r * 0.6),
  };
}

export function SignatureStitchToCore({
  phase,
  vendors = DEFAULT_WEB_VENDORS,
  className,
}: {
  phase: SignaturePhase;
  vendors?: WebVendor[];
  className?: string;
}) {
  // ── fragmented — just the tangle, full surface ──────────────────────────
  if (phase === "fragmented") {
    return <FragmentationWeb vendors={vendors} className={className} />;
  }
  // ── collapse — the tangle resolves into the NCoreStack ──────────────────
  return <CollapseToCore vendors={vendors} className={className} />;
}

// ── The collapse: scattered tangle → NCoreStack ──────────────────────────────
function CollapseToCore({
  vendors,
  className,
}: {
  vendors: WebVendor[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  // Gate the stack's mount so it assembles AFTER the tangle has begun to
  // converge — but the crossfade overlaps so there is never a dead frame.
  const [resolved, setResolved] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setResolved(true);
      return;
    }
    // Start the stack forming partway through the converge so the two states
    // overlap (no half-empty mid-state). ~0.7s in.
    const t = window.setTimeout(() => setResolved(true), 700);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const points = vendors.map((_, i) => scatterPoint(i));

  return (
    <div
      role="img"
      aria-label="The separate vendor systems converge and resolve into the single nCore platform — six product layers (Cards, Lending, Money Movement, Settlement, Financial Crime, Reconciliation) on the nCore engine, with a cyan wave rising through every layer."
      className={cn(
        "relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border p-7 sm:p-9 lg:p-10",
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_24px_60px_-30px_rgba(14,26,51,0.3)] dark:shadow-[0_26px_60px_-26px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* Rich field — the signature payoff leans into the kinetic ribbon over
          a deep indigo atmosphere (never a flat bed, §8.1). */}
      <GlassAtmosphere tone="indigo" depth="deep" animated />
      <KineticRibbon intensity="ambient" focus="top-right" />

      {/* Converging tangle — the scattered nodes drift inward + fade as the
          stack forms. Overlaid absolutely; fades out as `resolved` flips. */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-10 p-7 sm:p-9 lg:p-10"
          animate={{ opacity: resolved ? 0 : 1 }}
          transition={{ duration: dur.deliberate, ease: ease.out }}
        >
          <div className="relative h-full w-full">
            {vendors.map((v, i) => {
              const p = points[i];
              const dx = CENTER.x - p.x;
              const dy = CENTER.y - p.y;
              const mag = Math.hypot(dx, dy) || 1;
              const drift = 5.5; // em of inward travel toward centre
              return (
                <div
                  key={v.label}
                  className="absolute"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <motion.div
                    className="-translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.82, 1, 0.92, 0.6],
                      x: [`0em`, `0em`, `${(dx / mag) * drift}em`],
                      y: [`0em`, `0em`, `${(dy / mag) * drift}em`],
                    }}
                    transition={{
                      duration: 1.3,
                      ease: ease.cinematic,
                      times: [0, 0.3, 0.6, 1],
                      delay: i * 0.05,
                    }}
                  >
                    <CollapseNode icon={v.icon} label={v.label} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* The resolved core — the original NCoreStack at full presence. Scales
          up gently into place as the tangle clears (crossfade, no dead frame). */}
      <motion.div
        className="relative z-20 w-full"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={
          reduced ? undefined : { opacity: resolved ? 1 : 0, scale: resolved ? 1 : 0.94 }
        }
        transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
        style={reduced ? { opacity: 1 } : undefined}
      >
        <NCoreStack className="mx-auto" />
      </motion.div>
    </div>
  );
}

// A converging vendor node — the FragmentationWeb node vocabulary, flying inward.
function CollapseNode({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-2.5 py-2 backdrop-blur-md",
        "border-white/70 bg-white/70 shadow-[0_12px_30px_-16px_rgba(14,26,51,0.45)]",
        "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[0_14px_32px_-16px_rgba(0,0,0,0.62)]",
      )}
    >
      <InfraIcon name={icon} size="sm" className="!size-7 !rounded-lg" />
      <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
        {label}
      </span>
    </div>
  );
}

// Kept for callers that referenced the helper colours — re-export the field
// constant surface so the visual-system demo + nCore centerpiece compose
// consistently. (No-op styling guard to keep withAlpha/visual imported where
// the gradient field is tuned.)
export const SIGNATURE_FIELD_ACCENT = withAlpha(visual.cyan, 0.6);
