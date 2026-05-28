"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TonalCardBed } from "./TonalCardBed";

// ── SettlementUI (v4) — Painterly 3D blocks mode ───────────────────────────
//
// Owner-locked direction 2026-05-26: stylized 3D blocks rendered as soft
// geometric shapes — NOT a literal blockchain UI, NOT a transaction row
// list. Reads as a sculpture: a row of cubes receding in perspective, the
// leading one (just-settled) glowing cyan.
//
// Implementation: pure SVG isometric cubes. Five cubes in a row, slight
// receding scale so the front one reads as "closer." Each cube has three
// faces (top, left, right) rendered with subtle tonal differentiation —
// indigo on the right face, lighter indigo on the left, near-white on top.
// The lead cube renders with a cyan top face and a cyan rim glow.

const ISO_SHIFT_X = 36; // each cube is offset by this much horizontally
const ISO_SHIFT_Y = -2; // slight y-rise as cubes recede

type CubeProps = {
  size: number;
  cx: number;
  cy: number;
  lead?: boolean;
  rng: number; // 0..1 — controls tonal variance
};

// One isometric cube — three rhombus faces. Coordinates derived from a
// standard 30°/30° isometric projection. `size` is the cube edge in user
// units. `lead` flips the colour scheme to the cyan-lit "just settled" cube.
function IsoCube({ size, cx, cy, lead = false, rng }: CubeProps) {
  // Isometric projection helpers.
  const dx = size * Math.cos(Math.PI / 6); // ~0.866 * size
  const dy = size * Math.sin(Math.PI / 6); // ~0.5 * size

  // Cube vertices. cx,cy is the centre of the top face.
  // Top face: 4 corners
  const top1 = [cx, cy - dy];       // back
  const top2 = [cx + dx, cy];       // right
  const top3 = [cx, cy + dy];       // front
  const top4 = [cx - dx, cy];       // left
  // Bottom corners (drop by `size`)
  const bot2 = [cx + dx, cy + size];
  const bot3 = [cx, cy + dy + size];
  const bot4 = [cx - dx, cy + size];

  // Colours — tonal variation across cubes via rng. Lead is cyan-keyed.
  const topFill = lead ? "#5EE7F4" : `hsl(220, 30%, ${94 - rng * 4}%)`;
  const leftFill = lead ? "#5B6DD8" : `hsl(220, 28%, ${82 - rng * 4}%)`;
  const rightFill = lead ? "#304DBB" : `hsl(220, 30%, ${70 - rng * 4}%)`;
  const stroke = lead ? "#22D3EE" : "rgba(14,26,51,0.10)";
  const strokeW = lead ? 1.2 : 0.6;

  return (
    <g>
      {/* Cyan glow under the lead cube. */}
      {lead && (
        <ellipse
          cx={cx}
          cy={cy + size + dy + 4}
          rx={dx * 1.1}
          ry={6}
          fill="#22D3EE"
          fillOpacity="0.35"
          style={{ filter: "blur(6px)" }}
        />
      )}

      {/* Top face. */}
      <polygon
        points={`${top1[0]},${top1[1]} ${top2[0]},${top2[1]} ${top3[0]},${top3[1]} ${top4[0]},${top4[1]}`}
        fill={topFill}
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />
      {/* Left face. */}
      <polygon
        points={`${top4[0]},${top4[1]} ${top3[0]},${top3[1]} ${bot3[0]},${bot3[1]} ${bot4[0]},${bot4[1]}`}
        fill={leftFill}
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />
      {/* Right face. */}
      <polygon
        points={`${top3[0]},${top3[1]} ${top2[0]},${top2[1]} ${bot2[0]},${bot2[1]} ${bot3[0]},${bot3[1]}`}
        fill={rightFill}
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />

      {/* Lead cube — soft cyan top-face shimmer. */}
      {lead && (
        <polygon
          points={`${top1[0]},${top1[1]} ${top2[0]},${top2[1]} ${top3[0]},${top3[1]} ${top4[0]},${top4[1]}`}
          fill="url(#cube-top-shimmer)"
          opacity={0.6}
        />
      )}
    </g>
  );
}

// Cube descriptor — used to drive perspective scaling across the row.
const CUBES = [
  { rng: 0.2 }, // back
  { rng: 0.4 },
  { rng: 0.5 },
  { rng: 0.7 },
  { rng: 1.0, lead: true }, // front — "just settled"
];

const VIEWBOX_W = 320;
const VIEWBOX_H = 220;

export function SettlementUI() {
  const reduced = useReducedMotion();

  // Lay the cubes out along a diagonal. The lead (last) cube sits front-
  // right at full scale; each preceding cube recedes back-left at smaller
  // scale.
  const BASE_SIZE = 38;
  const SCALE_STEP = 0.86;
  const Y_BASE = 116;
  const X_BASE = 220; // lead cube position

  const placed = [...CUBES].reverse().map((c, idxFromFront) => {
    const scale = Math.pow(SCALE_STEP, idxFromFront);
    const size = BASE_SIZE * scale;
    // Step back-left along the diagonal.
    const cx =
      X_BASE - idxFromFront * (ISO_SHIFT_X * scale + 6);
    const cy = Y_BASE + idxFromFront * ISO_SHIFT_Y;
    return { ...c, size, cx, cy };
  });

  return (
    <TonalCardBed tone="indigo">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-3 py-4 sm:px-5 sm:py-6">
        {/* Halo behind the chain. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[12%] top-1/2 z-0 h-[70%] w-[60%] -translate-y-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.16), transparent 70%)",
          }}
        />

        <motion.svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="relative z-10 size-full"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="cube-top-shimmer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Faint guide-line under the row of cubes — the "chain." */}
          <line
            x1="10"
            y1={Y_BASE + 80}
            x2={VIEWBOX_W - 10}
            y2={Y_BASE + 80}
            stroke="#22D3EE"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Cubes — stagger their appearance on view-in. Reversed list so
              back cube renders first (z-order). */}
          {placed.reverse().map((c, i) => {
            const cube = (
              <IsoCube
                size={c.size}
                cx={c.cx}
                cy={c.cy}
                lead={!!c.lead}
                rng={c.rng}
              />
            );
            return (
              <motion.g
                key={i}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + i * 0.08,
                }}
              >
                {cube}
              </motion.g>
            );
          })}

          {/* Lead cube cyan pulse — slow breathing ring around the front
              cube. */}
          {!reduced && (
            <motion.circle
              cx={X_BASE}
              cy={Y_BASE + 18}
              r={32}
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{
                opacity: [0.5, 0.15, 0.5],
                scale: [1, 1.18, 1],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ transformOrigin: `${X_BASE}px ${Y_BASE + 18}px` }}
            />
          )}
        </motion.svg>

        {/* Small mono caption — bottom-left, lives outside the visual area
            on the bed. Reads as a label, not data inside the surface. */}
        <span className="pointer-events-none absolute bottom-3 left-4 z-10 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
          Real-time · USDC
        </span>
      </div>
    </TonalCardBed>
  );
}
