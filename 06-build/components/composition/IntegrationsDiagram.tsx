"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Eyebrow } from "@/components/composition/atoms";
import { CrosshairRails } from "@/components/visuals/CrosshairRails";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── Integrations diagram — §8.24 ───────────────────────────────────────────
//
// The Stripe-architecture moment as a primitive. A central hub (nCore by
// default) with a constellation of integration nodes arranged radially, all
// connected by thin lines. The lines carry ambient data-flow pulses — a
// recessive, never-marquee cadence that says "live network" without
// performing.
//
// Why radial (not grid):
// The story this section tells is "one platform, many networks connecting
// through it." A grid renders every node as equally distant from the centre
// — accurate as a list, wrong as a story. The radial composition makes the
// hub the gravitational centre: every node is in orbit, every line passes
// through the centre, every pulse terminates at nCore. The composition is
// the message.
//
// The diagram is a single SVG so the lines, nodes and pulses share a
// coordinate space and stay aligned at any size. The hub label is rendered
// in the foreground HTML (over the SVG) so it can use Geist font from
// global CSS.

export type IntegrationNode = {
  /** The label that renders inside the node. Geist Mono if no logo is given. */
  name: string;
  /** Optional logo SVG/ReactNode that replaces the text label. */
  logo?: ReactNode;
  /** Optional link wrapping the node. */
  href?: string;
};

export type IntegrationsDiagramProps = {
  eyebrow?: string;
  headline?: string;
  body?: string;
  /** Label rendered in the central hub. Default "nCore". */
  centerLabel?: string;
  /** Integration nodes — tuned for 5–8. Below 5 the orbit reads sparse. */
  nodes: IntegrationNode[];
  className?: string;
};

// SVG viewport — designed in a 800x520 coordinate space, then scaled
// responsively. The hub sits at the centre.
const VB = { w: 800, h: 520 };
const HUB = { x: VB.w / 2, y: VB.h / 2, r: 56 };
// Orbit semi-axes — flatter than a circle so nodes spread across the section's
// natural horizontal aspect; mirrors how Stripe's Connect diagram lays out.
const ORBIT = { rx: 300, ry: 200 };

// Distribute nodes around the orbit. Starts at the top (12 o'clock) and walks
// clockwise so the reading order matches the natural eye path. Slight angular
// inset on the bottom hemisphere so labels never crowd the section padding.
function nodePosition(i: number, total: number) {
  // Start at -π/2 (12 o'clock) and walk a full 2π divided across `total`.
  const start = -Math.PI / 2;
  const angle = start + (i / total) * 2 * Math.PI;
  return {
    x: HUB.x + ORBIT.rx * Math.cos(angle),
    y: HUB.y + ORBIT.ry * Math.sin(angle),
    angle,
  };
}

// A single integration node — pill-shaped, label inside. Drawn as a foreignObject
// so the text uses Geist Mono and supports wrapping; the underlying rect provides
// the surface + border that align with the connecting lines.
function NodeChip({
  x,
  y,
  node,
}: {
  x: number;
  y: number;
  node: IntegrationNode;
}) {
  const W = 168;
  const H = 56;
  const inner = (
    <div className="flex h-full w-full items-center justify-center rounded-md border border-white/15 bg-surface-dark-elevated/80 px-4 backdrop-blur-sm">
      {node.logo ? (
        <span className="text-text-on-brand">{node.logo}</span>
      ) : (
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-on-brand">
          {node.name}
        </span>
      )}
    </div>
  );

  return (
    <foreignObject
      x={x - W / 2}
      y={y - H / 2}
      width={W}
      height={H}
      // `overflow-visible` lets the focus ring on the anchor extend outside
      // the box.
      style={{ overflow: "visible" }}
    >
      {node.href ? (
        <a
          href={node.href}
          className="block h-full w-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark-base"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </foreignObject>
  );
}

export function IntegrationsDiagram({
  eyebrow,
  headline,
  body,
  centerLabel = "nCore",
  nodes,
  className,
}: IntegrationsDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  const positioned = nodes.map((n, i) => ({
    ...n,
    pos: nodePosition(i, nodes.length),
  }));

  // Pulse colour — cyan reads as "data / network signal" in the brand
  // vocabulary (design-system.md §9.5.1 — "cyan reads as sensor / scanner").
  const pulseColor = visual.cyan;
  const lineColor = withAlpha(visual.cyan, 0.18);
  const lineColorBright = withAlpha(visual.cyan, 0.34);

  return (
    <section
      ref={ref}
      aria-label={headline ?? "Integrations diagram"}
      className={cn(
        "dark relative isolate overflow-hidden bg-surface-dark-base py-[120px]",
        className,
      )}
    >
      {/* Ambient field — a quiet indigo wash so the diagram has atmosphere
          without competing with the diagram's own structure. Static. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(48, 77, 187, 0.16), transparent 60%)," +
            "radial-gradient(80% 60% at 50% 100%, rgba(91, 79, 217, 0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="relative">
          <CrosshairRails />

          {/* Header — centred above the diagram. The diagram is so symmetric
              and centre-weighted that a centred header reads as one composition
              with it. */}
          <div className="px-8 pt-12 text-center lg:px-12 lg:pt-14">
            <div className="mx-auto max-w-2xl">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {headline && (
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-on-brand sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
                  {headline}
                </h2>
              )}
              {body && (
                <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary">
                  {body}
                </p>
              )}
            </div>
          </div>

          {/* The diagram itself. SVG so lines + nodes + pulses share a
              coordinate system and align at any size. The viewBox is fixed;
              CSS scales it responsively. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: dur.cinematic, ease: ease.out }}
            className="relative mt-12 px-4 pb-12 sm:px-8 lg:px-12 lg:pb-14"
          >
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="block h-auto w-full"
              role="img"
              aria-label={`${centerLabel} connected to ${nodes.length} integration networks`}
            >
              <defs>
                {/* Cyan glow around the hub — a soft halo, applied via filter. */}
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={visual.cyan} stopOpacity="0.5" />
                  <stop
                    offset="60%"
                    stopColor={visual.cyan}
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor={visual.cyan}
                    stopOpacity="0"
                  />
                </radialGradient>
                {/* Hub fill — a darker elevated card, with subtle gradient. */}
                <linearGradient id="hubFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={visual.primary}
                    stopOpacity="0.32"
                  />
                  <stop
                    offset="100%"
                    stopColor={visual.navy}
                    stopOpacity="0.85"
                  />
                </linearGradient>
                {/* Gradient stroke for the connecting lines — softer at the
                    node, brighter at the hub, so the eye traces toward
                    centre. */}
                <linearGradient
                  id="connLine"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={lineColor} />
                  <stop offset="100%" stopColor={lineColorBright} />
                </linearGradient>
                {/* Pulse — small cyan circle that travels along each line. */}
                <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={pulseColor} stopOpacity="0.95" />
                  <stop
                    offset="60%"
                    stopColor={pulseColor}
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor={pulseColor}
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>

              {/* Orbit hint — a single ellipse ring so the radial structure
                  reads even before the eye finds individual lines. Extremely
                  low opacity, dashed. */}
              <ellipse
                cx={HUB.x}
                cy={HUB.y}
                rx={ORBIT.rx}
                ry={ORBIT.ry}
                fill="none"
                stroke={withAlpha(visual.cyan, 0.08)}
                strokeWidth="1"
                strokeDasharray="2 6"
              />

              {/* Connecting lines — hub → node, with the line-draw cinematic
                  motion from §9.6. Each line stroke-dasharray animates from
                  full to 0 on view-in. */}
              {positioned.map((n, i) => {
                // Trim the line endpoints back from the hub circle + node
                // chip edge so they don't visually overlap.
                const dx = n.pos.x - HUB.x;
                const dy = n.pos.y - HUB.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / dist;
                const uy = dy / dist;
                // Hub side: pull back by hub radius. Node side: pull back by
                // ~half the chip's width along the line direction (approx 70px
                // along the diagonal).
                const x1 = HUB.x + ux * HUB.r;
                const y1 = HUB.y + uy * HUB.r;
                const x2 = n.pos.x - ux * 78;
                const y2 = n.pos.y - uy * 32;
                // Approx length for the stroke-dasharray animation.
                const len = Math.sqrt(
                  (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1),
                );

                return (
                  <g key={`line-${i}`}>
                    <motion.line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={lineColor}
                      strokeWidth="1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        inView
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      transition={{
                        duration: dur.cinematic,
                        ease: ease.out,
                        delay: 0.2 + i * 0.06,
                      }}
                      style={{
                        // pathLength on a line in framer-motion is implemented
                        // via stroke-dasharray; expose it explicitly so the
                        // animation works without needing path geometry.
                        strokeDasharray: len,
                      }}
                    />
                    {/* Data-flow pulse — a small cyan dot that travels from
                        node → hub. §9.4: connection-line pulses, 3–5s interval,
                        1.2s per pulse, ease-out. Each line offset so pulses
                        don't all fire on the same beat. */}
                    {!reduced && inView && (
                      <motion.circle
                        r="4"
                        fill="url(#pulseGrad)"
                        initial={{ opacity: 0, cx: x2, cy: y2 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          cx: [x2, x2, x1, x1],
                          cy: [y2, y2, y1, y1],
                        }}
                        transition={{
                          duration: 4,
                          times: [0, 0.05, 0.4, 0.5],
                          ease: ease.out,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          delay: 1.2 + i * 0.45,
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Central hub — sits above the lines so the line endpoints
                  visually meet behind it. */}
              {/* Glow halo. */}
              <motion.circle
                cx={HUB.x}
                cy={HUB.y}
                r={HUB.r * 2.8}
                fill="url(#hubGlow)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: dur.cinematic, ease: ease.out }}
              />
              {/* Hub ring — concentric rings hint at the platform's depth
                  without literally rendering the stack. */}
              <motion.circle
                cx={HUB.x}
                cy={HUB.y}
                r={HUB.r + 10}
                fill="none"
                stroke={withAlpha(visual.cyan, 0.16)}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: dur.cinematic,
                  ease: ease.out,
                  delay: 0.1,
                }}
                style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
              />
              {/* Hub disc. */}
              <motion.circle
                cx={HUB.x}
                cy={HUB.y}
                r={HUB.r}
                fill="url(#hubFill)"
                stroke={withAlpha(visual.cyan, 0.45)}
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: dur.cinematic, ease: ease.out }}
                style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
              />
              {/* Hub label. Rendered inside the SVG via foreignObject so it
                  uses the Geist sans font cleanly. */}
              <foreignObject
                x={HUB.x - HUB.r}
                y={HUB.y - 14}
                width={HUB.r * 2}
                height={28}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-base font-semibold tracking-tight text-text-on-brand">
                    {centerLabel}
                  </span>
                </div>
              </foreignObject>

              {/* Integration nodes — drawn last so they layer above their
                  connecting lines. */}
              {positioned.map((n, i) => (
                <motion.g
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.92 }
                  }
                  transition={{
                    duration: dur.deliberate,
                    ease: ease.out,
                    delay: 0.4 + i * 0.06,
                  }}
                  style={{
                    transformOrigin: `${n.pos.x}px ${n.pos.y}px`,
                  }}
                >
                  <NodeChip x={n.pos.x} y={n.pos.y} node={n} />
                </motion.g>
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
