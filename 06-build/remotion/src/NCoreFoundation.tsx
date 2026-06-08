import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { color, rgba, ease, FONT_FAMILY, FONT_MONO } from "./tokens";

// ── Digital Banking §3 signature — "nCore Full-Stack → the core on top" ──────
//
// Owner direction (2026-06-08): show the ACTUAL nCore full-stack diagram (as per
// the homepage — NymAI Layer rail · six product rows · Unified Data Layer rail,
// with dashed connectors), then COMPRESS it into a single box that just reads
// "nCore Full-Stack" (no icons), then CONNECT it to a core banking system that
// seats on top (nCore the foundation). Transparent (alpha) so it floats on the
// section in both themes.
//
// BEATS (300f / 30fps):
//   0 ─ 86    DIAGRAM    the nCore full-stack diagram assembles (rails + 6 rows +
//                        connectors).
//   90 ─158   COMPRESS   the whole diagram collapses into one "nCore Full-Stack"
//                        box (no icons) at the foundation.
//  162 ─230   CONNECT    the bank's core banking system descends and seats ON TOP,
//                        with a clear gap and a single cyan integration line.
//   226─300   FUEL       the integration line beats; nCore powers the core.

export const FPS = 30;
export const DURATION_IN_FRAMES = 300;
// Tightly framed so the product layers read LARGE in the page slot (no rails).
export const WIDTH = 760;
export const HEIGHT = 960;

const CX = WIDTH / 2;
const bez = (t: readonly [number, number, number, number]) => Easing.bezier(t[0], t[1], t[2], t[3]);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CYAN = color.accent.cyan;

const PRODUCTS: { name: string; glyph: string }[] = [
  { name: "Cards", glyph: "M3 6h18v12H3z M3 10h18" },
  { name: "Accounts", glyph: "M4 9h16 M5 9l7-5 7 5 M6 9v8 M10 9v8 M14 9v8 M18 9v8 M4 19h16" },
  { name: "Payments", glyph: "M3 9h14l-3-3 M21 15H7l3 3" },
  { name: "Lending", glyph: "M4 7h16 M4 12h16 M4 17h10" },
  { name: "Settlement", glyph: "M12 4v15 M5 19h14 M6 9l-3 5h6z M18 9l-3 5h6z" },
  { name: "Financial Crime", glyph: "M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" },
];
const N = PRODUCTS.length;

// ── Diagram geometry — large rows (homepage scale) ───────────────────────────
const ROW_W = 660;
const ROW_H = 90;
const ROW_GAP = 14;
const STACK_TOTAL = N * ROW_H + (N - 1) * ROW_GAP;
const STACK_TOP = 400 - STACK_TOTAL / 2; // diagram centred ~y=400
const rowY = (i: number) => STACK_TOP + i * (ROW_H + ROW_GAP) + ROW_H / 2;
const ROW_L = CX - ROW_W / 2;

// ── Compress targets ──────────────────────────────────────────────────────────
const FOUND = { cx: CX, cy: 600, w: 660, h: 128 };
const FOUND_TOP = FOUND.cy - FOUND.h / 2;
const FOUND_BOTTOM = FOUND.cy + FOUND.h / 2;
const CORE = { cx: CX, cy: 370, w: 600, h: 144, fromY: -150 };
const CORE_BOTTOM = CORE.cy + CORE.h / 2;

const T_COMPRESS = [90, 188] as const; // long, evenly-paced collapse (watchable morph)
const T_CONNECT = [196, 258] as const;
const T_FUEL_START = 254;

export const NCoreFoundation: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = interpolate(frame, [0, 60, DURATION_IN_FRAMES], [1.012, 1.0, 1.0], { ...clamp, easing: bez(ease.cinematic) });

  // Even ease-in-out so the layers visibly collapse/morph (cinematic ease-out
  // rushed it to the box in a few frames).
  const compress = interpolate(frame, [T_COMPRESS[0], T_COMPRESS[1]], [0, 1], { ...clamp, easing: bez(ease.inOut) });
  const seat = interpolate(frame, [T_CONNECT[0], T_CONNECT[1]], [0, 1], { ...clamp, easing: bez(ease.cinematic) });
  const fuel = interpolate(frame, [T_FUEL_START, DURATION_IN_FRAMES - 20], [0, 1], { ...clamp, easing: bez(ease.inOut) });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", fontFamily: FONT_FAMILY }}>
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 50%" }}>
        {/* the diagram (rails + rows + connectors), fading as it compresses */}
        <Diagram frame={frame} compress={compress} />

        {/* the compressed "nCore Full-Stack" box (forms on compress) */}
        <FoundationBox compress={compress} />

        {/* single cyan integration line nCore ↔ core */}
        <Integration frame={frame} seat={seat} fuel={fuel} />

        {/* the bank's core banking system, seating on top */}
        <CoreBox seat={seat} fuel={fuel} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── The nCore product layers (owner: no AI / Data side rails) ────────────────
const Diagram: React.FC<{ frame: number; compress: number }> = ({ frame, compress }) => {
  return (
    <AbsoluteFill>
      {PRODUCTS.map((p, i) => {
        const appear = interpolate(frame, [i * 6, i * 6 + 26], [0, 1], { ...clamp, easing: bez(ease.out) });
        const enterY = (1 - appear) * -16;
        // COLLAPSE: each layer converges onto the box centre and squashes, the
        // bottom layer first so the stack cascades down INTO the box (a morph,
        // not a crossfade). Heights shrink and the rows overlap into one bar.
        const start = ((N - 1 - i) / N) * 0.34;
        const lc = interpolate(compress, [start, start + 0.52], [0, 1], { ...clamp, easing: bez(ease.cinematic) });
        const assembledY = rowY(i);
        const y = assembledY + (FOUND.cy - assembledY) * lc + enterY;
        const h = ROW_H * (1 - 0.82 * lc);
        const op = appear * (1 - interpolate(compress, [0.52, 0.74], [0, 1], clamp));
        const contentOp = 1 - interpolate(lc, [0.15, 0.5], [0, 1], clamp);
        if (op <= 0.001) return null;
        return (
          <div
            key={p.name}
            style={{
              position: "absolute",
              left: ROW_L,
              top: y - h / 2,
              width: ROW_W,
              height: h,
              opacity: op,
              borderRadius: 12,
              boxSizing: "border-box",
              padding: "0 22px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              overflow: "hidden",
              background: `linear-gradient(180deg, ${rgba(color.brand.navySoft, 0.95)}, ${rgba(color.brand.navy, 0.96)})`,
              border: `1px solid ${rgba(color.text.onBrand, 0.16)}`,
              boxShadow: `0 14px 30px -16px ${rgba(color.brand.navy, 0.6)}, inset 0 1px 0 ${rgba(color.text.onBrand, 0.07)}`,
            }}
          >
            <span style={{ display: "flex", width: 38, height: 38, borderRadius: 9, alignItems: "center", justifyContent: "center", opacity: contentOp, background: rgba(CYAN, 0.12), boxShadow: `inset 0 0 0 1px ${rgba(CYAN, 0.28)}` }}>
              <Glyph d={p.glyph} color={CYAN} size={22} />
            </span>
            <span style={{ color: color.text.onBrand, fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", opacity: contentOp }}>{p.name}</span>
            <svg width={18} height={18} viewBox="0 0 24 24" style={{ marginLeft: "auto", opacity: contentOp }} fill="none" stroke={rgba(color.text.onBrand, 0.4)} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── The compressed "nCore Full-Stack" box (no icons) ─────────────────────────
const FoundationBox: React.FC<{ compress: number }> = ({ compress }) => {
  if (compress <= 0.06) return null;
  // The box forms AT the collapse point (centred on FOUND.cy) and grows as the
  // layers land in it; the label resolves once they've merged.
  const opacity = interpolate(compress, [0.12, 0.34], [0, 1], clamp);
  const grow = interpolate(compress, [0.12, 0.74], [0, 1], { ...clamp, easing: bez(ease.cinematic) });
  const w = FOUND.w;
  const h = ROW_H * 0.5 + (FOUND.h - ROW_H * 0.5) * grow;
  const top = FOUND.cy - h / 2;
  const textOp = interpolate(compress, [0.62, 0.86], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: FOUND.cx - w / 2,
        top,
        width: w,
        height: h,
        opacity,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background: `linear-gradient(180deg, ${rgba(color.brand.navySoft, 0.97)}, ${rgba(color.brand.navy, 0.98)})`,
        border: `1px solid ${rgba(CYAN, 0.4)}`,
        boxShadow: `0 30px 70px -28px ${rgba(color.brand.navy, 0.7)}, 0 0 70px -10px ${rgba(CYAN, 0.22 * compress)}, inset 0 1px 0 ${rgba(color.text.onBrand, 0.08)}`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: rgba(CYAN, 0.75) }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: textOp }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: CYAN, boxShadow: `0 0 16px ${rgba(CYAN, 0.9)}` }} />
        <span style={{ color: color.text.onBrand, fontSize: 38, fontWeight: 700, letterSpacing: "-0.01em" }}>nCore Full-Stack</span>
      </div>
    </div>
  );
};

// ── Single cyan integration line nCore ↔ core ────────────────────────────────
const Integration: React.FC<{ frame: number; seat: number; fuel: number }> = ({ frame, seat, fuel }) => {
  if (seat <= 0) return null;
  const x = CX;
  const yTop = CORE_BOTTOM;
  const yBot = FOUND_TOP;
  const beat = 0.5 + 0.5 * Math.sin(frame * 0.24);
  const travel = (frame * 0.022) % 1;
  const pulseY = yBot - (yBot - yTop) * travel;
  const lineOp = (0.34 + 0.42 * beat) * seat;
  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
        <line x1={x} y1={yTop} x2={x} y2={yBot} stroke={rgba(CYAN, 0.2 * beat * seat)} strokeWidth={14 + beat * 6} strokeLinecap="round" />
        <line x1={x} y1={yTop} x2={x} y2={yBot} stroke={rgba(CYAN, lineOp)} strokeWidth={3} strokeLinecap="round" />
        <circle cx={x} cy={yTop} r={6} fill={CYAN} opacity={seat} style={{ filter: `drop-shadow(0 0 8px ${rgba(CYAN, 0.9)})` }} />
        <circle cx={x} cy={yBot} r={6} fill={CYAN} opacity={seat} style={{ filter: `drop-shadow(0 0 8px ${rgba(CYAN, 0.9)})` }} />
        {fuel > 0 && <circle cx={x} cy={pulseY} r={7} fill={color.text.onBrand} opacity={0.95} style={{ filter: `drop-shadow(0 0 11px ${rgba(CYAN, 1)})` }} />}
      </svg>
    </AbsoluteFill>
  );
};

// ── The bank's core banking system (descends, seats on top) ──────────────────
const CoreBox: React.FC<{ seat: number; fuel: number }> = ({ seat, fuel }) => {
  if (seat <= 0) return null;
  const y = CORE.fromY + (CORE.cy - CORE.fromY) * seat;
  return (
    <div
      style={{
        position: "absolute",
        left: CORE.cx - CORE.w / 2,
        top: y - CORE.h / 2,
        width: CORE.w,
        height: CORE.h,
        opacity: interpolate(seat, [0, 0.3], [0, 1], clamp),
        borderRadius: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        background: `linear-gradient(180deg, ${rgba(color.surfaceDark.elevated, 0.97)}, ${rgba(color.brand.navy, 0.97)})`,
        border: `1px solid ${rgba(color.text.onBrand, 0.22 + fuel * 0.18)}`,
        boxShadow: `0 30px 66px -26px ${rgba(color.brand.navy, 0.6)}, 0 0 ${38 * fuel}px -6px ${rgba(CYAN, 0.42 * fuel)}, inset 0 1px 0 ${rgba(color.text.onBrand, 0.08)}`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(80% 120% at 50% 100%, ${rgba(CYAN, 0.22 * fuel)}, transparent 68%)` }} />
      <Glyph d="M4 9h16 M5 9l7-5 7 5 M6 9v8 M10 9v8 M14 9v8 M18 9v8 M4 19h16" color={color.text.onBrand} size={32} />
      <span style={{ position: "relative", color: color.text.onBrand, fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em" }}>Core banking system</span>
      <span style={{ position: "relative", color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase" }}>Your system of record</span>
    </div>
  );
};

const Glyph: React.FC<{ d: string; color: string; size?: number }> = ({ d, color: c, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
