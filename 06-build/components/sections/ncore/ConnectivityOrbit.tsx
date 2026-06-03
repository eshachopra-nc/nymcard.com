"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/components/visuals/motion";
import { GlassAtmosphere } from "@/components/visuals/GlassAtmosphere";
import { visual, withAlpha } from "@/components/visuals/palette";

// ── nCore connectivity orbit ─────────────────────────────────────────────────
//
// Radial "orbit" composition for the nCore connectivity section
// ("Connected to the schemes and networks before you arrive."): nCore in the
// dead centre, five scheme/network logos evenly spaced on a SINGLE clean orbit
// ring around it. There are NO connector spokes/lines from the centre to the
// nodes — the picture reads "nCore at the hub" purely from the centred mark and
// the encircling ring, not from a spoke diagram. A faint dashed orbit-ring
// guide is the only line.
//
// On-system: the composition floats on the canonical GlassAtmosphere field
// (§8.1 — glass needs a rich field to refract); centre + nodes are glass
// surfaces. Navy/cyan-led (azure tone), light-first, restrained.
//
// Motion (design-system.md §9): the ring drifts slowly (a gentle, continuous
// orbital rotation); each node counter-rotates so its label stays upright and
// legible. Under prefers-reduced-motion the whole thing is STATIC — a fixed,
// legible end-state, no perpetual spin (no AI-slop).
//
// Accessibility: the diagram is aria-hidden (logos/positions aren't readable);
// a visually-hidden list names nCore and every network it connects to.

type NetworkNode = {
  name: string;
  /** A real grayscale SVG mark, when one exists. */
  logo?: { light: string; dark?: string };
  /** Theme-reactive mark that reads on both surfaces from a single asset. */
  logoUniversal?: string;
};

// Five networks (02-copy/nCore-copy.md → CONNECTIVITY). Real SVGs exist only
// for Visa + Mastercard (public/logos/); the other three render as tasteful
// labelled placeholder nodes.
//
// TODO (ui-ux-designer): swap the three placeholder nodes (Visa Direct,
// Western Union, MoneyGram) for real grayscale SVGs when they land — drop the
// asset in public/logos/ and set `logo`/`logoUniversal` exactly as Visa/
// Mastercard do below.
const NODES: NetworkNode[] = [
  {
    name: "Visa",
    logo: { light: "/logos/visa-full.svg", dark: "/logos/visa-white.svg" },
  },
  {
    name: "Mastercard",
    logoUniversal: "/logos/mastercard.svg",
  },
  { name: "Visa Direct" },
  { name: "Western Union" },
  { name: "MoneyGram" },
];

// Single orbit ring radius as a fraction of the half-size (centre is 0,0).
const RADIUS = 0.78;

// Evenly space the nodes on the ring. 0deg = top, clockwise. A small offset
// keeps the layout from looking mechanically axis-aligned.
const ANGLE_OFFSET = -90;
function nodeAngle(i: number, count: number): number {
  return ANGLE_OFFSET + (360 / count) * i;
}

// Convert an angle (deg, 0 = top) → percentage offset from centre.
function posFor(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: 50 + Math.cos(rad) * RADIUS * 50,
    top: 50 + Math.sin(rad) * RADIUS * 50,
  };
}

export function ConnectivityOrbit({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const positions = NODES.map((node, i) => ({
    node,
    ...posFor(nodeAngle(i, NODES.length)),
  }));

  // Gentle, slow orbital drift — disabled under reduced motion.
  const SPIN_DURATION = 150;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border",
        "border-surface-border-subtle dark:border-surface-dark-border",
        "shadow-[0_18px_50px_-18px_rgba(14,26,51,0.14)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_24px_60px_-20px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {/* Rich field — glass needs something to float on (§8.1). Azure tone =
          navy/cyan-led; gentle ambient drift in the field. */}
      <GlassAtmosphere tone="azure" animated />

      {/* The orbit stage — a square that scales with the surface; everything
          inside is positioned as a percentage of it. */}
      <div className="relative mx-auto aspect-square w-full max-w-[34rem] p-6 sm:p-8">
        {/* Faint dashed orbit-ring guide — the ONLY line. No centre-to-node
            connector spokes (this is an orbit, not a spoke diagram). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-6 sm:inset-8"
          style={{ width: "auto", height: "auto" }}
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS * 50}
            fill="none"
            stroke={withAlpha(visual.indigo, 0.18)}
            strokeWidth={0.3}
            strokeDasharray="1.4 1.4"
          />
        </svg>

        {/* Drifting ring layer — the nodes sit on a slowly rotating ring; each
            node counter-rotates to stay upright. Static under reduced motion. */}
        <motion.div
          className="absolute inset-6 sm:inset-8"
          style={{ transformOrigin: "50% 50%" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced
              ? undefined
              : {
                  duration: SPIN_DURATION,
                  ease: ease.linear,
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
        >
          {positions.map(({ node, left, top }) => (
            <div
              key={node.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Counter-rotate so the chip stays upright as the ring spins.
                  Static under reduced motion. */}
              <motion.div
                style={{ transformOrigin: "50% 50%" }}
                animate={reduced ? undefined : { rotate: -360 }}
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: SPIN_DURATION,
                        ease: ease.linear,
                        repeat: Infinity,
                        repeatType: "loop",
                      }
                }
              >
                <NetworkChip node={node} />
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Centre node — nCore. NymCard mark on a brighter glass disc, with a
            soft cyan core glow so it reads as the hub everything orbits. */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-full border sm:h-28 sm:w-28",
              "border-white/70 bg-white/80 backdrop-blur-[20px] backdrop-saturate-[160%]",
              "dark:border-white/[0.12] dark:bg-surface-dark-glass",
              "shadow-[0_10px_30px_-10px_rgba(14,26,51,0.18)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_40px_-14px_rgba(0,0,0,0.55)]",
            )}
          >
            {/* Cyan core glow behind the mark. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(60% 60% at 50% 42%, ${withAlpha(visual.cyan, 0.22)}, transparent 70%)`,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG mark, theme-tinted */}
            <img
              src="/images/shared/logo/nymcard-logo-full.svg"
              alt=""
              aria-hidden="true"
              className="relative w-16 dark:invert sm:w-[4.5rem]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Accessible representation — the diagram is decorative to AT; this
          names nCore and every network it connects to. */}
      <ul className="sr-only">
        <li>nCore connects to the following schemes and networks:</li>
        {NODES.map((n) => (
          <li key={n.name}>{n.name}</li>
        ))}
      </ul>
    </div>
  );
}

// A single orbiting node. Real-logo nodes render the grayscale SVG; the rest
// render a tasteful neutral chip + name, ready to be swapped for a real mark.
function NetworkChip({ node }: { node: NetworkNode }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 sm:gap-2 sm:px-3 sm:py-2",
        "border-white/70 bg-white/75 backdrop-blur-[16px] backdrop-saturate-[160%]",
        "dark:border-white/[0.1] dark:bg-surface-dark-glass",
        "shadow-[0_6px_18px_-8px_rgba(14,26,51,0.16)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_10px_26px_-12px_rgba(0,0,0,0.5)]",
      )}
    >
      {node.logo ? (
        <>
          {/* Visa — navy wordmark on light, white wordmark on dark. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- inline logo SVG */}
          <img
            src={node.logo.light}
            alt={node.name}
            className="h-3.5 w-auto dark:hidden"
            loading="lazy"
            decoding="async"
          />
          {node.logo.dark && (
            // eslint-disable-next-line @next/next/no-img-element -- inline logo SVG
            <img
              src={node.logo.dark}
              alt=""
              aria-hidden="true"
              className="hidden h-3.5 w-auto dark:block"
              loading="lazy"
              decoding="async"
            />
          )}
        </>
      ) : node.logoUniversal ? (
        // Mastercard — single mark reads on both surfaces.
        // eslint-disable-next-line @next/next/no-img-element -- inline logo SVG
        <img
          src={node.logoUniversal}
          alt={node.name}
          className="h-5 w-auto"
          loading="lazy"
          decoding="async"
        />
      ) : (
        // Placeholder node — a neutral dot + the network name. Swap for a real
        // grayscale SVG later (see NODES TODO above).
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-text-muted/40 dark:bg-white/30"
          />
          <span className="whitespace-nowrap font-body text-[10px] font-medium text-text-secondary dark:text-text-dark-secondary sm:text-xs">
            {node.name}
          </span>
        </span>
      )}
    </div>
  );
}
