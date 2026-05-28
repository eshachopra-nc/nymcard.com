"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useTime, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { KineticRibbon } from "@/components/visuals/KineticRibbon";
import { CrosshairRails } from "@/components/visuals/CrosshairRails";
import { Eyebrow } from "@/components/composition/atoms";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── Scale stats ribbon — §8.23 ─────────────────────────────────────────────
//
// The proof-of-scale dark moment. Counts up live as it enters the viewport,
// the kinetic ribbon idling beneath the stats at its ambient setting — the
// second visible home for the signature ribbon outside the hero.
//
// Always dark, regardless of page theme — the section forces a local `.dark`
// scope the way RailCarousel (sparse) does, so a light page renders this
// section as its single dark rhythm break. Per design-system.md §10.1, dark
// sections live "toward the end of the page" and carry scale/performance
// moments; this primitive is that pattern as a primitive.
//
// Motion spec (design-system.md §9.5 + §9.6):
//   • Ribbon — the hero's cutout ribbon artwork (`home-hero-ribbon-cutout.png`)
//     drifting on a Lissajous path over the `KineticRibbon intensity="ambient"`
//     field. Lower opacity than the hero (~0.4) so the stats still lead but the
//     signature ribbon is recognisably present — this is the second visible
//     home for the ribbon outside the hero (project memory:
//     kinetic-ribbon-beyond-hero). Same drift cadence as `RibbonKinetic.tsx`.
//   • Numbers — count up from 0 → value, `motion-cinematic` (1000ms) per
//     §9.6, ease-out, triggered when the section is 40% in view.
//   • Ambient violet glow under the number row — the §3 anchor token earning
//     a use; static, low-opacity, accents only.
//   • prefers-reduced-motion → static final values; ribbon artwork holds a
//     static overscan and the KineticRibbon field falls back to its own
//     internal reduced-motion handling.

export type ScaleStatFormat = "number" | "currency" | "compact";

export type ScaleStat = {
  /** The label sitting beneath the value (e.g. "Cards processed"). */
  label: string;
  /** The numeric target — animates from 0 → value on scroll-into-view. */
  value: number;
  /** Optional prefix the formatter doesn't supply (e.g. "+"). */
  prefix?: string;
  /** Optional suffix the formatter doesn't supply (e.g. "%"). */
  suffix?: string;
  /** Currency code when format = "currency". Default "USD". */
  currency?: string;
  /** How to format the value. Default "number" (en-US locale with commas). */
  format?: ScaleStatFormat;
};

export type ScaleStatsRibbonProps = {
  eyebrow?: string;
  headline?: string;
  body?: string;
  /** 3 or 4 stats. More than 4 will render but the layout is tuned for 3–4. */
  stats: ScaleStat[];
  className?: string;
};

// Format a value according to a stat's `format`. The animated value is a
// floating-point — for `number` and `currency` we floor to keep integers;
// `compact` keeps a single decimal so 2.8B reads cleanly.
function formatValue(v: number, stat: ScaleStat): string {
  const fmt = stat.format ?? "number";
  if (fmt === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: stat.currency ?? "USD",
      maximumFractionDigits: 0,
    }).format(Math.floor(v));
  }
  if (fmt === "compact") {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(v);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Math.floor(v),
  );
}

// The ribbon artwork layered over the KineticRibbon ambient field. Mirrors
// the hero's `RibbonKinetic.tsx` motion (Lissajous drift, breathing scale,
// micro-rotation) but at a lower opacity so the stats still lead. Always uses
// the dark cutout variant — ScaleStatsRibbon is always dark.
function ScaleRibbonArtwork() {
  const reduced = useReducedMotion();
  const t = useTime();

  // Slightly larger amplitudes than the hero so the drift is felt at the
  // section's wider aspect ratio, but still inside the §9.4 ambient cap
  // (1–8px / 0.1–0.4 opacity range — we sit at 0.4 opacity).
  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 26000) * 2 * Math.PI) * 12,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 21000) * 2 * Math.PI) * 8,
  );
  const scale = useTransform(t, (v) =>
    reduced ? 1.06 : 1.06 + Math.sin((v / 14000) * 2 * Math.PI) * 0.01,
  );
  const rotate = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 33000) * 2 * Math.PI) * 0.4,
  );

  return (
    <motion.img
      aria-hidden="true"
      src="/handoff/home/home-hero-ribbon-cutout.png"
      alt=""
      className="pointer-events-none absolute inset-0 z-[1] size-full object-cover opacity-40 mix-blend-screen"
      style={{ x, y, scale, rotate, transformOrigin: "center" }}
      loading="lazy"
      decoding="async"
    />
  );
}

// A single count-up stat. Internally drives a Framer Motion value that
// transitions 0 → stat.value over `motion-cinematic` on first view, mapped
// through the stat's formatter into the visible string.
function StatCell({
  stat,
  inView,
}: {
  stat: ScaleStat;
  inView: boolean;
}) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  // Map the live motion-value through the formatter into the visible string.
  // `useTransform` lets us avoid pushing per-frame re-renders into React.
  const display = useTransform(mv, (v) => formatValue(v, stat));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(stat.value);
      return;
    }
    const controls = animate(mv, stat.value, {
      duration: dur.cinematic + 0.5, // 1.5s — slightly longer than the §9.6 token to let the digits settle visibly.
      ease: ease.out,
    });
    return controls.stop;
  }, [inView, reduced, stat.value, mv]);

  // Sync the animated value into the DOM. `motion.span` would re-render on
  // every frame; this writes directly via the ref to keep the count smooth.
  useEffect(() => {
    return display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [display]);

  return (
    // Each cell is centred in its grid column so the four stats read as an
    // evenly-paced row regardless of how wide each number is — `2.8B` vs
    // `$18.3B` vs `99.99%` have very different widths and left-aligning inside
    // an equal-width grid cell makes the row look unevenly spaced. Stripe and
    // Linear both centre their stat grids for this reason.
    <div className="relative flex flex-col items-center border-t border-white/10 pt-6 text-center">
      <div className="flex items-baseline justify-center gap-1 font-display text-4xl font-bold tracking-tight text-text-on-brand sm:text-5xl lg:text-[3rem] lg:leading-[1.05] xl:text-[3.5rem]">
        {stat.prefix && (
          <span className="text-accent-cyan/80" aria-hidden="true">
            {stat.prefix}
          </span>
        )}
        <span
          ref={ref}
          className="tabular-nums"
          aria-label={
            // Screen readers get the final formatted value, never the
            // count-up sequence.
            `${stat.prefix ?? ""}${formatValue(stat.value, stat)}${stat.suffix ?? ""}`
          }
        >
          {/* Initial paint — formatter on the final value when reduced motion
              is set; 0 otherwise so the first frame matches the animation. */}
          {formatValue(reduced ? stat.value : 0, stat)}
        </span>
        {stat.suffix && (
          <span className="text-accent-cyan/80" aria-hidden="true">
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="mt-3 max-w-[28ch] font-body text-sm leading-relaxed text-text-dark-secondary">
        {stat.label}
      </div>
    </div>
  );
}

export function ScaleStatsRibbon({
  eyebrow,
  headline,
  body,
  stats,
  className,
}: ScaleStatsRibbonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // §9.6 — cinematic reveals trigger when 40% of the element is in view.
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // 3 stats → 3-col at lg; 4 stats → 4-col at lg. The header sits above the
  // grid so each stat keeps room for a big number — putting the header in a
  // left column compresses 4 stats into a half-width strip and the numbers
  // collide.
  const cols = stats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section
      ref={ref}
      aria-label={headline ?? "Scale stats"}
      className={cn(
        // `dark` forces the dark theme locally regardless of page theme.
        "dark relative isolate overflow-hidden bg-surface-dark-base py-[120px]",
        className,
      )}
    >
      {/* Ribbon stack — two layers:
          1. KineticRibbon `intensity="ambient"` provides the soft cyan/violet
             field that depths the dark surface (§9.4 ambient amplitude cap).
          2. The hero's cutout artwork drifts over the top at ~0.4 opacity with
             `mix-blend-screen` so it reads as light over the navy field. Same
             Lissajous drift as the hero, lower opacity — the stats still lead
             but the signature ribbon is recognisably present. This is the
             second visible home for the ribbon outside the hero. */}
      <KineticRibbon intensity="ambient" focus="top-right" />
      <ScaleRibbonArtwork />

      {/* Violet anchor under the stat row — static, low-opacity. The §3
          violet token (#6D28D9) earning a use as a glow accent. Positioned
          to peak roughly behind the stats grid so it adds depth there rather
          than reading as ambient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[20%] z-[2] h-[40%]"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 60%, rgba(109, 40, 217, 0.32), rgba(109, 40, 217, 0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* The page-rail signature framing the section's content rectangle. */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="relative">
          <CrosshairRails />
          <div className="px-8 py-12 lg:px-12 lg:py-14">
            {/* Header — full-width above the stats. The stats are the proof;
                the headline is the framing. Header centred? No — left-aligned
                keeps the editorial voice consistent with §8.13/§8.20. */}
            <div className="max-w-2xl">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {headline && (
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-on-brand sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
                  {headline}
                </h2>
              )}
              {body && (
                <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary">
                  {body}
                </p>
              )}
            </div>

            {/* Stats row — full-width horizontal grid below the header. */}
            <div
              className={cn(
                "mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2",
                cols,
              )}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={`${stat.label}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  transition={{
                    duration: dur.slow,
                    ease: ease.out,
                    delay: i * 0.08, // §9.6 — 80ms card stagger
                  }}
                >
                  <StatCell stat={stat} inView={inView} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
