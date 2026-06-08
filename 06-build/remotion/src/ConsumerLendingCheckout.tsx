import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { color, rgba, ease, FONT_FAMILY, FONT_MONO } from "./tokens";

// ── Digital Banking §4 · Consumer Lending video ──────────────────────────────
//
// Owner direction (2026-06-08): a checkout page with a LARGE total, a cursor
// clicks "Buy now, pay later", then the 4-month instalment plan appears —
// decisioning built into origination, approved in the flow. ~9s, dark cinematic,
// pre-rendered to MP4/WebM + poster. USD ($2,400 → 4 × $600).
//
// BEATS (270f / 30fps):
//   0 ─112   CHECKOUT  the checkout panel sits with a $2,400 total + a "Buy now,
//                      pay later" button; a cursor glides to it and CLICKS (~106).
//   116─270  PLAN      the panel swaps to the instalment plan — Approved, 4
//                      interest-free payments of $600 with dates.

export const FPS = 30;
export const DURATION_IN_FRAMES = 270;
// Tightly framed canvas (owner 2026-06-08): the panel fills the frame so the
// text reads large in the page slot — no wide empty margins shrinking it.
export const WIDTH = 860;
export const HEIGHT = 600;

const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const bez = (t: readonly [number, number, number, number]) => Easing.bezier(t[0], t[1], t[2], t[3]);

const T_CLICK = 106;
const PANEL_W = 780;
const BTN = { x: CX, y: CY + 108 }; // "Buy now, pay later" button centre

const PLAN = [
  { when: "Today", date: "8 Jun", amt: "$600.00", now: true },
  { when: "In 1 month", date: "8 Jul", amt: "$600.00" },
  { when: "In 2 months", date: "8 Aug", amt: "$600.00" },
  { when: "In 3 months", date: "8 Sep", amt: "$600.00" },
];

export const ConsumerLendingCheckout: React.FC = () => {
  const frame = useCurrentFrame();

  // The panel already fills the tight canvas; just a whisper of push-in.
  const cam = interpolate(frame, [0, 60, DURATION_IN_FRAMES], [1.015, 1.0, 1.0], { extrapolateRight: "clamp", easing: bez(ease.cinematic) });
  const checkoutVis = interpolate(frame, [0, 18, 112, 132], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  const planVis = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.cinematic) });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", fontFamily: FONT_FAMILY }}>
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 50%" }}>
        {checkoutVis > 0 && <Checkout vis={checkoutVis} />}
        {planVis > 0 && <Plan vis={planVis} frame={frame} />}
        {frame < 120 && <Cursor frame={frame} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const DeepField: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = interpolate(frame, [0, DURATION_IN_FRAMES], [0, 1]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(${54 + drift * 6}% 52% at ${26 + drift * 4}% 22%, ${rgba(color.accent.indigo, 0.28)}, transparent 60%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(46% 44% at 80% 84%, ${rgba(color.accent.cyan, 0.12)}, transparent 62%)` }} />
    </AbsoluteFill>
  );
};

// ── Checkout panel ────────────────────────────────────────────────────────────
const Checkout: React.FC<{ vis: number }> = ({ vis }) => {
  return (
    <Panel vis={vis} top={CY - 250} height={500}>
      <Header label="Checkout" />
      {/* line item */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: rgba(color.text.onBrand, 0.07), border: `1px solid ${rgba(color.text.onBrand, 0.12)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Glyph d="M3 6h18v12H3z M3 10h18" color={rgba(color.accent.cyan, 0.9)} size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: color.text.onBrand, fontSize: 24, fontWeight: 600 }}>34&quot; Ultrawide Monitor</div>
          <div style={{ color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 14, letterSpacing: "0.04em", marginTop: 4 }}>Qty 1 · ships free</div>
        </div>
        <div style={{ color: color.text.onBrand, fontSize: 24, fontWeight: 600 }}>$2,400.00</div>
      </div>
      <div style={{ height: 1, background: rgba(color.text.onBrand, 0.1), margin: "26px 0" }} />
      {/* total */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span style={{ color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase" }}>Order total</span>
        <span style={{ color: color.text.onBrand, fontSize: 52, fontWeight: 800, letterSpacing: "-0.02em" }}>$2,400.00</span>
      </div>
      {/* BNPL button */}
      <div
        style={{
          marginTop: 34,
          height: 70,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: `linear-gradient(135deg, ${color.brand.primary}, ${color.accent.cyan})`,
          boxShadow: `0 18px 40px -16px ${rgba(color.accent.cyan, 0.6)}`,
          color: color.text.onBrand,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Buy now, pay later
      </div>
      <div style={{ textAlign: "center", marginTop: 14, color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.06em" }}>
        4 interest-free payments · or pay in full
      </div>
    </Panel>
  );
};

// ── Instalment plan panel ─────────────────────────────────────────────────────
const Plan: React.FC<{ vis: number; frame: number }> = ({ vis, frame }) => {
  return (
    <Panel vis={vis} top={CY - 250} height={500}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Header label="Pay in 4" sub="Interest-free" inline />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: rgba(color.accent.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${rgba(color.accent.cyan, 0.45)}`, color: color.accent.cyan, fontFamily: FONT_MONO, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <Glyph d="M5 12.5 10 17.5 19 6.5" color={color.accent.cyan} size={16} />
          Approved
        </span>
      </div>
      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        {PLAN.map((p, i) => {
          const rowIn = interpolate(frame, [134 + i * 9, 150 + i * 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
          return (
            <div
              key={p.when}
              style={{
                opacity: rowIn,
                transform: `translateY(${(1 - rowIn) * 10}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 12,
                background: p.now ? rgba(color.accent.cyan, 0.1) : rgba(color.text.onBrand, 0.05),
                boxShadow: p.now ? `inset 0 0 0 1px ${rgba(color.accent.cyan, 0.4)}` : `inset 0 0 0 1px ${rgba(color.text.onBrand, 0.1)}`,
              }}
            >
              <span style={{ width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: p.now ? color.accent.cyan : rgba(color.text.onBrand, 0.1), color: p.now ? color.brand.navy : color.text.onBrand, fontSize: 15, fontWeight: 700 }}>
                {i + 1}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ color: color.text.onBrand, fontSize: 20, fontWeight: 600 }}>{p.when}</div>
                <div style={{ color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.06em", marginTop: 2 }}>{p.date}</div>
              </div>
              <div style={{ color: color.text.onBrand, fontSize: 22, fontWeight: 700 }}>{p.amt}</div>
              {p.now && <span style={{ color: color.accent.cyan, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Due now</span>}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

// ── Shared panel shell ────────────────────────────────────────────────────────
const Panel: React.FC<{ vis: number; top: number; height: number; children: React.ReactNode }> = ({ vis, top, height, children }) => (
  <div
    style={{
      position: "absolute",
      left: CX - PANEL_W / 2,
      top,
      width: PANEL_W,
      minHeight: height,
      opacity: vis,
      transform: `translateY(${(1 - vis) * 16}px) scale(${0.98 + vis * 0.02})`,
      borderRadius: 22,
      boxSizing: "border-box",
      padding: 36,
      background: `linear-gradient(180deg, ${rgba(color.surfaceDark.elevated, 0.92)}, ${rgba(color.brand.navy, 0.94)})`,
      border: `1px solid ${rgba(color.text.onBrand, 0.12)}`,
      boxShadow: `0 40px 90px -36px ${rgba("#000000", 0.7)}`,
      backdropFilter: "blur(8px)",
    }}
  >
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg, transparent, ${rgba(color.accent.cyan, 0.5)} 50%, transparent)` }} />
    {children}
  </div>
);

const Header: React.FC<{ label: string; sub?: string; inline?: boolean }> = ({ label, sub, inline }) => (
  <div>
    <div style={{ color: color.text.onBrand, fontSize: inline ? 28 : 30, fontWeight: 700, letterSpacing: "-0.01em" }}>{label}</div>
    {sub ? <div style={{ color: color.text.darkSecondary, fontFamily: FONT_MONO, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{sub}</div> : null}
  </div>
);

// ── Cursor ────────────────────────────────────────────────────────────────────
const Cursor: React.FC<{ frame: number }> = ({ frame }) => {
  const x = interpolate(frame, [40, T_CLICK], [CX + 250, BTN.x + 52], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  const y = interpolate(frame, [40, T_CLICK], [CY + 210, BTN.y + 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  const press = frame >= T_CLICK && frame <= T_CLICK + 8 ? 0.86 : 1;
  const ringR = frame >= T_CLICK ? interpolate(frame, [T_CLICK, T_CLICK + 16], [0, 60], { extrapolateRight: "clamp" }) : 0;
  const ringO = frame >= T_CLICK ? interpolate(frame, [T_CLICK, T_CLICK + 16], [0.5, 0], { extrapolateRight: "clamp" }) : 0;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {ringR > 0 && (
        <div style={{ position: "absolute", left: BTN.x - ringR, top: BTN.y - ringR, width: ringR * 2, height: ringR * 2, borderRadius: 999, border: `2px solid ${rgba(color.accent.cyan, ringO)}` }} />
      )}
      <svg width={36} height={36} viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, transform: `scale(${press})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
        <path d="M5 3l14 8-6 1.5L9 19z" fill={color.text.onBrand} stroke={color.brand.navy} strokeWidth={1} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const afterIn = interpolate(frame, [DURATION_IN_FRAMES - 56, DURATION_IN_FRAMES - 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  return (
    <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, textAlign: "center", opacity: afterIn, transform: `translateY(${(1 - afterIn) * 8}px)` }}>
      <span style={{ color: color.text.onBrand, fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}>
        Approved in the flow. <span style={{ color: color.accent.cyan }}>Decisioned at checkout.</span>
      </span>
    </div>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 50% 50%, transparent 56%, ${rgba("#000000", 0.42)} 100%)`, pointerEvents: "none" }} />
);

const Glyph: React.FC<{ d: string; color: string; size?: number }> = ({ d, color: c, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
