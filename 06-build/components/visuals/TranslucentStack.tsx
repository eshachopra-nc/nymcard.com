"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

// ── Layered translucency system ────────────────────────────────────────────
//
// The "alive infrastructure" depth effect (design-system.md §8.2): up to three
// translucent surfaces stacked at different depths so a composition reads as
// orchestrated layers, not a flat panel.
//
// Each layer is depth-cued exactly as §8.2 specifies — scale (1.0 / 1.05 /
// 1.1), z-index, and a positional offset that fans the stack. With `parallax`
// on, the layers also move at the documented parallax ratios on scroll
// (1.0 / 1.15 / 1.3) — foreground faster than background, so the depth
// relationship holds while the section travels through the viewport.
//
// Pass the actual surfaces in `layers`, back-to-front — typically GlassPanels.
// The stack handles depth, scale, offset and parallax; it does not style the
// surfaces. Capped at three (§8.2: "maximum 3 layered surfaces").

const SCALE = [1, 1.05, 1.1]; // §8.2 floating-layers scale
const RATIO = [1, 1.15, 1.3]; // §8.2 / motion.parallax — foreground moves fastest
const PARALLAX_TRAVEL = 130; // px swept across the full scroll pass

export function TranslucentStack({
  layers,
  spread = 30,
  parallax = false,
  className,
}: {
  /** Surfaces back-to-front. Only the first three are used. */
  layers: ReactNode[];
  /** Fan offset between layers, px. */
  spread?: number;
  /** Couple layer movement to scroll at §8.2 parallax ratios. */
  parallax?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const used = layers.slice(0, 3);
  const live = parallax && !reduced;

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {used.map((node, i) => (
        <StackLayer
          key={i}
          depth={i}
          spread={spread}
          progress={scrollYProgress}
          parallax={live}
        >
          {node}
        </StackLayer>
      ))}
    </div>
  );
}

function StackLayer({
  depth,
  spread,
  progress,
  parallax,
  children,
}: {
  depth: number;
  spread: number;
  progress: MotionValue<number>;
  parallax: boolean;
  children: ReactNode;
}) {
  // Fan the stack toward the top-right — the §8.2 layered-overlay composition.
  const offsetX = depth * spread;
  const offsetY = -depth * spread * 0.62;

  // Parallax travel scales with the layer's ratio; the base layer (ratio 1)
  // never moves, so it anchors the composition.
  const travel = parallax ? (RATIO[depth] - 1) * PARALLAX_TRAVEL : 0;
  const y = useTransform(progress, [0, 1], [offsetY + travel, offsetY - travel]);

  // The base layer sits in normal flow so it defines the stack's box; the
  // upper layers float over it.
  if (depth === 0) {
    return (
      <div className="relative" style={{ zIndex: 1, scale: SCALE[0] }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x: offsetX, y, scale: SCALE[depth], zIndex: depth + 1 }}
    >
      {children}
    </motion.div>
  );
}
