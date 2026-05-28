"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TonalCardBed } from "./TonalCardBed";

// ── MoneyMovementUI (v4) — Painterly particle dot-storm mode ───────────────
//
// Owner-locked direction 2026-05-26: borrow the Stripe "stablecoin / global
// money movement" pattern — a painterly cloud of cyan/indigo dots forming
// an implied globe + radial arc, with one or two small currency chips
// floating in the storm. No dashboard, no rows. The dots ARE the story.
//
// Generation: deterministic seeded scatter of ~480 dots concentrated along
// an implied globe shape (an ellipse with density falloff at the rim), plus
// a sparser orbit arc curving over the top. All sizes are tiny (0.5–2px),
// all alphas low, the palette is cyan / indigo / brand-navy — a painterly
// wash rather than a data visualisation.

const VIEWBOX_W = 320;
const VIEWBOX_H = 320;

// A small seeded pseudo-random — deterministic across renders so the scatter
// doesn't shift on every paint. Lehmer LCG with a fixed seed.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s & 0x7fffffff) / 0x7fffffff;
  };
}

type Dot = {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  alpha: number;
};

// Build the dot field. ~480 dots concentrated inside the globe ellipse, with
// a density that falls off toward the rim — a painterly bloom rather than a
// hard edge. A small extra cluster traces an arc over the upper-left.
function buildDots(): Dot[] {
  const rng = makeRng(20260526);
  const dots: Dot[] = [];
  const cx = VIEWBOX_W / 2;
  const cy = VIEWBOX_H / 2 + 8;
  const rx = 118;
  const ry = 118;

  const palette: [string, number][] = [
    ["#22D3EE", 0.55], // cyan — dominant
    ["#5B6DD8", 0.30], // indigo — bridge
    ["#304DBB", 0.10], // brand primary — structural depth
    ["#0E1A33", 0.05], // navy — accent dot
  ];

  const pick = (rng: () => number) => {
    const r = rng();
    let acc = 0;
    for (const [c, w] of palette) {
      acc += w;
      if (r <= acc) return c;
    }
    return palette[0][0];
  };

  // Dense globe interior — sample within ellipse with density falloff.
  for (let i = 0; i < 540; i++) {
    // Reject-sample inside the ellipse.
    let x = 0;
    let y = 0;
    let d = Infinity;
    let tries = 0;
    while (tries < 6) {
      const u = rng() * 2 - 1;
      const v = rng() * 2 - 1;
      const dd = u * u + v * v;
      if (dd <= 1) {
        x = u * rx;
        y = v * ry;
        d = Math.sqrt(dd);
        break;
      }
      tries++;
    }
    if (d === Infinity) continue;

    // Density falloff — more dots near the centre, fewer at the rim.
    // Skip a fraction of rim dots so the bloom feathers out.
    const rimReject = Math.pow(d, 1.2);
    if (rng() < rimReject * 0.55) continue;

    const fill = pick(rng);
    // Smaller dots near rim, slightly larger near centre.
    const r =
      d < 0.3
        ? 0.6 + rng() * 1.2
        : d < 0.7
          ? 0.5 + rng() * 1.0
          : 0.4 + rng() * 0.7;
    const alpha =
      d < 0.4
        ? 0.55 + rng() * 0.4
        : d < 0.75
          ? 0.35 + rng() * 0.35
          : 0.15 + rng() * 0.25;

    dots.push({ cx: cx + x, cy: cy + y, r, fill, alpha });
  }

  // Orbit arc — a curve passing over the upper-left, faint cyan dots.
  for (let i = 0; i < 70; i++) {
    const t = i / 69;
    // Arc parametric — sweeps from the bottom-left up over the top to the
    // right edge, brushing the globe rim.
    const angle = Math.PI * (0.95 - 0.95 * t);
    const arcR = 152 + (rng() - 0.5) * 12;
    const x = cx + Math.cos(angle) * arcR;
    const y = cy - Math.sin(angle) * (arcR * 0.78);
    if (x < 0 || x > VIEWBOX_W || y < 0 || y > VIEWBOX_H) continue;
    const fill = rng() < 0.7 ? "#22D3EE" : "#5B6DD8";
    dots.push({
      cx: x,
      cy: y,
      r: 0.5 + rng() * 0.8,
      fill,
      alpha: 0.35 + rng() * 0.4,
    });
  }

  return dots;
}

export function MoneyMovementUI() {
  const reduced = useReducedMotion();
  const dots = useMemo(buildDots, []);

  return (
    <TonalCardBed tone="porcelain">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-3 py-4 sm:px-5 sm:py-6">
        {/* The dot storm — fills the cell, slight parallax drift on the 14s
            beat. Slow so the painterly read holds; never strobe. */}
        <motion.svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          aria-hidden="true"
          className="absolute inset-0 size-full"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Soft inner glow behind the storm. */}
          <defs>
            <radialGradient id="mm-glow" cx="50%" cy="56%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#mm-glow)" />

          {/* Drift the dots subtly — translate the whole layer ±4px on a
              16s loop so the storm reads as alive without ever spinning. */}
          <motion.g
            animate={
              reduced
                ? undefined
                : {
                    translateX: [0, 3, -2, 0],
                    translateY: [0, -2, 3, 0],
                  }
            }
            transition={{
              duration: 16,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r={d.r}
                fill={d.fill}
                fillOpacity={d.alpha}
              />
            ))}
          </motion.g>
        </motion.svg>

        {/* Currency chip — floats in the storm, soft white pill. The
            second chip floats below at a different orbit. */}
        <CurrencyChip
          amount="$24K"
          pair="USD → EUR"
          className="absolute left-[12%] top-[26%] z-10"
          delay={0.3}
        />
        <CurrencyChip
          amount="$48K"
          pair="USD → USDC"
          variant="usdc"
          className="absolute bottom-[18%] right-[10%] z-10"
          delay={0.55}
        />

        {/* On hover — the storm breathes brighter momentarily. Pure CSS via
            group-hover on the bed (we sit inside .group). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.16), transparent 70%)",
          }}
        />
      </div>
    </TonalCardBed>
  );
}

// A small floating currency pill — round white surface with a coloured
// indicator and tabular value. Used as the "anchored" labels in the storm.
function CurrencyChip({
  amount,
  pair,
  variant = "fiat",
  className,
  delay,
}: {
  amount: string;
  pair: string;
  variant?: "fiat" | "usdc";
  className?: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const isUsdc = variant === "usdc";
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8, scale: 0.9 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      <motion.div
        // Faint float — drifts in tiny circles, slower than the storm itself.
        animate={
          reduced
            ? undefined
            : {
                y: [0, -3, 0, 2, 0],
              }
        }
        transition={{
          duration: 7,
          ease: "easeInOut",
          repeat: Infinity,
          delay,
        }}
        className="flex items-center gap-1.5 rounded-full bg-surface-white/90 px-2.5 py-1.5 shadow-[0_8px_22px_-8px_rgba(14,26,51,0.18),0_2px_4px_-2px_rgba(14,26,51,0.08)] ring-1 ring-inset ring-brand-navy/8 backdrop-blur-sm dark:bg-surface-dark-elevated/90 dark:ring-white/10"
      >
        <span
          className={[
            "size-1.5 rounded-full",
            isUsdc ? "bg-accent-cyan" : "bg-brand-primary",
          ].join(" ")}
        />
        <span className="font-display text-[11px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-on-brand">
          {amount}
        </span>
        <span className="font-mono text-[8px] uppercase leading-none tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
          {pair}
        </span>
      </motion.div>
    </motion.div>
  );
}
