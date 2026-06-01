"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals/motion";
import { visual, withAlpha } from "@/components/visuals/palette";

// ── nCore hero visual ────────────────────────────────────────────────────────
//
// The right-column surface for the /platform/ncore PageHero — replaces the
// rejected NCoreStack. Carries the abstract "luminous core" render
// (public/images/ncore/hero-core.webp): cyan light-ribbons converging on a
// bright core over deep navy.
//
// The render is deep navy, so it can't sit raw on the light-first product
// hero. It's contained in a rounded, edge-lit GLASS frame that floats on the
// hero atmosphere (radius-xl, the §8.1 glass minimum) — the same material
// language as the homepage hero card. The dark render reads as a premium
// "core" object held inside the glass, not a black rectangle stamped on a
// light page. In dark mode the frame deepens into the surrounding navy.
//
// Motion (design-system.md §9, all prefers-reduced-motion safe):
//   • on-load reveal — a soft fade + scale-up (visual-fade-up timing).
//   • faint ambient drift — the framed core breathes very slightly so the
//     surface reads "alive" without perpetual content animation.
//   • reduced motion → static end-state (no reveal transform, no drift).

export function NCoreHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-[34rem] lg:ml-auto lg:mr-0", className)}
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: dur.deliberate, ease: ease.out }}
    >
      {/* Edge-lit glass frame — radius-xl, the §8.1 glass minimum. Holds the
          dark render so it reads as a contained object on the light hero. */}
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-xl border p-2 sm:p-2.5",
          // Light: a soft frosted edge so the navy render is framed, not raw.
          "border-white/70 bg-white/55 backdrop-blur-[20px] backdrop-saturate-[160%]",
          // Dark: the frame deepens into the navy field.
          "dark:border-white/[0.1] dark:bg-surface-dark-glass dark:backdrop-blur-[24px]",
          // Soft float shadow (light) / lifted depth + inset highlight (dark).
          "shadow-[0_18px_50px_-16px_rgba(14,26,51,0.22),0_4px_12px_-4px_rgba(14,26,51,0.08)]",
          "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-18px_rgba(0,0,0,0.6)]",
        )}
      >
        {/* The render itself — inner rounded crop so the bright core is never
            cut by the frame edge. aspect ratio matches the source so the core
            stays centred across breakpoints. */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
          <motion.div
            className="absolute inset-0"
            // Faint ambient drift — the core breathes; never a hard loop.
            animate={
              reduced ? undefined : { scale: [1, 1.035, 1], x: [0, -6, 0], y: [0, 4, 0] }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 18,
                    ease: ease.linear,
                    repeat: Infinity,
                    repeatType: "loop",
                  }
            }
          >
            <Image
              src="/images/ncore/hero-core.webp"
              alt="An abstract rendering of nCore: cyan light-ribbons converging on a single luminous core over deep navy — one platform behind every payment product."
              fill
              priority
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 80vw, 90vw"
              className="object-cover"
            />
          </motion.div>

          {/* Top-left lit edge — ties the render to the hero's directional
              light (top-left), matching the glass material elsewhere. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 18% -6%, ${withAlpha(visual.white, 0.16)}, transparent 56%)`,
            }}
          />
          {/* Cyan edge hairline along the top — the lit front face. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${withAlpha(
                visual.cyan,
                0.5,
              )} 26%, ${withAlpha(visual.cyan, 0.28)} 62%, transparent 94%)`,
            }}
          />
          {/* In LIGHT mode only, a faint white veil softens the deep-navy
              render so it sits calmly on the light hero rather than punching a
              dark hole. Removed in dark mode where the navy belongs. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white/[0.06] dark:hidden"
          />
        </div>
      </div>
    </motion.div>
  );
}
