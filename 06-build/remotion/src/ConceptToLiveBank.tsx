import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { color, rgba, ease, FONT_FAMILY, FONT_MONO } from "./tokens";

// ── Digital Banking §7 video — "From board approval to live bank" ────────────
//
// A four-stage walkthrough — Design → Configure → Launch → Scale — on a progress
// rail, with a floating product moment per stage. Transparent (alpha) so it sits
// on the section in the same dark-UI language as the §3/§4 clips. ~11s.
//
// BEATS (330f / 30fps):
//   18 ─ 96   DESIGN     proposition + journeys: Accounts · Cards · Payments
//                        connect into one map.
//   96 ─174   CONFIGURE  products, controls, workflows, programme rules switch on.
//  174 ─252   LAUNCH     a cursor hits "Go live"; the branded bank flips to LIVE.
//  252 ─318   SCALE      products + markets multiply; "no migration underneath".
//   318─330   payoff — all four stages complete.

export const FPS = 30;
export const DURATION_IN_FRAMES = 330;
export const WIDTH = 1600;
export const HEIGHT = 820;

const CX = WIDTH / 2;
const bez = (t: readonly [number, number, number, number]) => Easing.bezier(t[0], t[1], t[2], t[3]);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const STAGES = ["Design", "Configure", "Launch", "Scale"] as const;
const STAGE_BODY = [
  "Define your proposition, customer journeys, and operating model.",
  "Set up products, controls, workflows, and programme rules.",
  "Go live under your brand, connected to your core.",
  "Add products and markets — no migration underneath.",
];

// stage windows (frames)
const WINS: [number, number][] = [
  [18, 96],
  [96, 174],
  [174, 252],
  [252, 318],
];

// rail geometry
const RAIL_Y = 678;
const RAIL_X0 = 230;
const RAIL_X1 = 1370;
const nodeX = (i: number) => RAIL_X0 + (i * (RAIL_X1 - RAIL_X0)) / 3;

// panel geometry
const PANEL = { w: 1060, h: 400, cx: CX, cy: 308 };
const PANEL_L = PANEL.cx - PANEL.w / 2;
const PANEL_T = PANEL.cy - PANEL.h / 2;

export const ConceptToLiveBank: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = interpolate(frame, [0, 50, DURATION_IN_FRAMES], [1.012, 1.0, 1.0], { ...clamp, easing: bez(ease.cinematic) });

  // active stage index + rail progress
  const stage = frame < WINS[1][0] ? 0 : frame < WINS[2][0] ? 1 : frame < WINS[3][0] ? 2 : 3;
  const progress = interpolate(frame, [WINS[0][0], WINS[1][0], WINS[2][0], WINS[3][0], WINS[3][1]], [0, 1 / 3, 2 / 3, 1, 1], clamp);

  const railIn = interpolate(frame, [4, 22], [0, 1], { ...clamp, easing: bez(ease.out) });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", fontFamily: FONT_FAMILY }}>
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 50%" }}>
        {/* stage panels — each fades in/out over its window (crossfade) */}
        {WINS.map(([s, e], i) => {
          const vis = interpolate(frame, [s - 10, s + 10, e - 10, e + 10], [0, 1, 1, 0], clamp);
          if (vis <= 0.001) return null;
          const t = interpolate(frame, [s + 6, s + 52], [0, 1], { ...clamp, easing: bez(ease.out) });
          return (
            <Panel key={i} vis={vis}>
              {i === 0 && <DesignStage t={t} />}
              {i === 1 && <ConfigureStage t={t} />}
              {i === 2 && <LaunchStage t={t} frame={frame} start={s} />}
              {i === 3 && <ScaleStage t={t} />}
            </Panel>
          );
        })}

        <StageRail frame={frame} stage={stage} progress={progress} railIn={railIn} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Panel shell ───────────────────────────────────────────────────────────────
const Panel: React.FC<{ vis: number; children: React.ReactNode }> = ({ vis, children }) => (
  <div
    style={{
      position: "absolute",
      left: PANEL_L,
      top: PANEL_T,
      width: PANEL.w,
      height: PANEL.h,
      opacity: vis,
      transform: `translateY(${(1 - vis) * 14}px)`,
      borderRadius: 24,
      boxSizing: "border-box",
      padding: "30px 38px",
      background: `linear-gradient(180deg, ${rgba(color.brand.navySoft, 0.96)}, ${rgba(color.brand.navy, 0.97)})`,
      border: `1px solid ${rgba(color.text.onBrand, 0.14)}`,
      boxShadow: `0 44px 100px -40px ${rgba(color.brand.navy, 0.7)}, inset 0 1px 0 ${rgba(color.text.onBrand, 0.08)}`,
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg, transparent, ${rgba(color.accent.cyan, 0.5)} 50%, transparent)` }} />
    {children}
  </div>
);

const PanelHead: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ color: color.accent.cyan, fontFamily: FONT_MONO, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase" }}>{kicker}</div>
    <div style={{ color: color.text.onBrand, fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em", marginTop: 6 }}>{title}</div>
  </div>
);

// ── Stage 1 — Design (journey map) ───────────────────────────────────────────
const DESIGN_NODES = [
  { label: "Accounts", glyph: "M4 9h16 M5 9l7-5 7 5 M6 9v8 M10 9v8 M14 9v8 M18 9v8 M4 19h16" },
  { label: "Cards", glyph: "M3 6h18v12H3z M3 10h18" },
  { label: "Payments", glyph: "M3 9h14l-3-3 M21 15H7l3 3" },
];
const DesignStage: React.FC<{ t: number }> = ({ t }) => {
  const gap = 300;
  const startX = PANEL.w / 2 - gap;
  const y = 250;
  return (
    <>
      <PanelHead kicker="01 · Design" title="Proposition & customer journeys" />
      <svg width={PANEL.w - 76} height={170} style={{ display: "block", margin: "0 auto" }}>
        {/* connectors draw left→right */}
        {[0, 1].map((k) => {
          const x1 = startX + k * gap + 56;
          const x2 = startX + (k + 1) * gap - 56;
          const draw = interpolate(t, [0.3 + k * 0.18, 0.6 + k * 0.18], [0, 1], clamp);
          return <line key={k} x1={x1} y1={70} x2={x1 + (x2 - x1) * draw} y2={70} stroke={rgba(color.accent.cyan, 0.7)} strokeWidth={2.5} strokeDasharray="2 6" strokeLinecap="round" />;
        })}
        {DESIGN_NODES.map((n, i) => {
          const appear = interpolate(t, [i * 0.16, i * 0.16 + 0.3], [0, 1], clamp);
          const cx = startX + i * gap;
          return (
            <g key={n.label} transform={`translate(${cx}, 70)`} opacity={appear} style={{ transform: `translate(${cx}px, 70px) scale(${0.7 + appear * 0.3})`, transformOrigin: `${cx}px 70px` }}>
              <rect x={-56} y={-44} width={112} height={88} rx={16} fill={rgba(color.text.onBrand, 0.06)} stroke={rgba(color.accent.cyan, 0.4)} strokeWidth={1.2} />
            </g>
          );
        })}
      </svg>
      {/* node icons + labels as HTML overlay for crisp text */}
      <div style={{ position: "absolute", left: 38, right: 38, top: 116, height: 170 }}>
        {DESIGN_NODES.map((n, i) => {
          const appear = interpolate(t, [i * 0.16, i * 0.16 + 0.3], [0, 1], clamp);
          const cx = startX + i * gap;
          return (
            <div key={n.label} style={{ position: "absolute", left: cx - 56, top: 26, width: 112, height: 88, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, opacity: appear }}>
              <Glyph d={n.glyph} color={color.accent.cyan} size={28} />
              <span style={{ color: color.text.onBrand, fontSize: 17, fontWeight: 600 }}>{n.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

// ── Stage 2 — Configure (rules) ──────────────────────────────────────────────
const CONFIG_ROWS = ["Products", "Spend controls", "Workflows", "Programme rules"];
const ConfigureStage: React.FC<{ t: number }> = ({ t }) => (
  <>
    <PanelHead kicker="02 · Configure" title="Products, controls & rules" />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {CONFIG_ROWS.map((r, i) => {
        const on = t > 0.15 + i * 0.18;
        return (
          <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", borderRadius: 12, background: rgba(color.text.onBrand, 0.05), boxShadow: `inset 0 0 0 1px ${rgba(color.text.onBrand, 0.1)}` }}>
            <span style={{ color: color.text.onBrand, fontSize: 19, fontWeight: 500 }}>{r}</span>
            <Toggle on={on} />
          </div>
        );
      })}
    </div>
  </>
);
const Toggle: React.FC<{ on: boolean }> = ({ on }) => (
  <div style={{ width: 50, height: 28, borderRadius: 999, position: "relative", transition: "none", background: on ? color.accent.cyan : rgba(color.text.onBrand, 0.16), boxShadow: on ? `0 0 16px ${rgba(color.accent.cyan, 0.6)}` : "none" }}>
    <div style={{ position: "absolute", top: 3, left: on ? 25 : 3, width: 22, height: 22, borderRadius: 999, background: "#fff" }} />
  </div>
);

// ── Stage 3 — Launch (go live) ───────────────────────────────────────────────
const LaunchStage: React.FC<{ t: number; frame: number; start: number }> = ({ t, frame, start }) => {
  const clickAt = start + 40;
  const live = frame >= clickAt;
  const cursorX = interpolate(frame, [start + 14, clickAt], [PANEL.w * 0.66, PANEL.w * 0.5 + 30], clamp);
  const cursorY = interpolate(frame, [start + 14, clickAt], [300, 232], clamp);
  const press = frame >= clickAt && frame <= clickAt + 8 ? 0.86 : 1;
  const pulse = live ? interpolate(frame, [clickAt, clickAt + 22], [0, 1], clamp) : 0;
  return (
    <>
      <PanelHead kicker="03 · Launch" title="Go live under your brand" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, marginTop: 6 }}>
        {/* branded bank chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 26px", borderRadius: 16, background: `linear-gradient(135deg, ${rgba(color.brand.primary, live ? 0.95 : 0.5)}, ${rgba(color.accent.cyan, live ? 0.85 : 0.4)})`, boxShadow: live ? `0 0 ${40 * pulse}px -4px ${rgba(color.accent.cyan, 0.6)}` : "none", transition: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: rgba(color.text.onBrand, 0.92), color: color.brand.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>Y</div>
          <div>
            <div style={{ color: color.text.onBrand, fontSize: 20, fontWeight: 700 }}>Your Bank</div>
            <div style={{ color: rgba(color.text.onBrand, 0.8), fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>connected to core</div>
          </div>
        </div>
        {/* status / button */}
        {live ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 26px", borderRadius: 999, background: rgba(color.accent.cyan, 0.16), boxShadow: `inset 0 0 0 1.5px ${rgba(color.accent.cyan, 0.6)}`, color: color.accent.cyan, fontSize: 20, fontWeight: 700, letterSpacing: "0.04em" }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: color.accent.cyan, boxShadow: `0 0 ${10 + pulse * 8}px ${color.accent.cyan}` }} />
            LIVE
          </div>
        ) : (
          <div style={{ padding: "16px 34px", borderRadius: 14, background: `linear-gradient(135deg, ${color.brand.primary}, ${color.accent.cyan})`, color: color.text.onBrand, fontSize: 20, fontWeight: 700 }}>Go live</div>
        )}
      </div>
      {/* cursor */}
      {frame < clickAt + 14 && (
        <svg width={34} height={34} viewBox="0 0 24 24" style={{ position: "absolute", left: cursorX, top: cursorY, transform: `scale(${press})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
          <path d="M5 3l14 8-6 1.5L9 19z" fill={color.text.onBrand} stroke={color.brand.navy} strokeWidth={1} strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
};

// ── Stage 4 — Scale (products + markets) ─────────────────────────────────────
const SCALE_PRODUCTS = ["Cards", "Lending", "Settlement", "FX", "Wallets"];
const SCALE_MARKETS = ["UAE", "KSA", "EGY", "JOR"];
const ScaleStage: React.FC<{ t: number }> = ({ t }) => (
  <>
    <PanelHead kicker="04 · Scale" title="Add products and markets" />
    <div style={{ marginBottom: 16 }}>
      <div style={{ color: rgba(color.text.onBrand, 0.7), fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Products</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {SCALE_PRODUCTS.map((p, i) => {
          const on = interpolate(t, [i * 0.1, i * 0.1 + 0.25], [0, 1], clamp);
          return <Chip key={p} label={p} appear={on} accent />;
        })}
      </div>
    </div>
    <div>
      <div style={{ color: rgba(color.text.onBrand, 0.7), fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Markets</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {SCALE_MARKETS.map((m, i) => {
          const on = interpolate(t, [0.5 + i * 0.1, 0.5 + i * 0.1 + 0.25], [0, 1], clamp);
          return <Chip key={m} label={m} appear={on} />;
        })}
      </div>
    </div>
  </>
);
const Chip: React.FC<{ label: string; appear: number; accent?: boolean }> = ({ label, appear, accent }) => (
  <div style={{ opacity: appear, transform: `translateY(${(1 - appear) * 8}px) scale(${0.9 + appear * 0.1})`, padding: "12px 20px", borderRadius: 999, fontSize: 18, fontWeight: 600, color: accent ? color.accent.cyan : color.text.onBrand, background: accent ? rgba(color.accent.cyan, 0.12) : rgba(color.text.onBrand, 0.06), boxShadow: `inset 0 0 0 1px ${accent ? rgba(color.accent.cyan, 0.4) : rgba(color.text.onBrand, 0.14)}` }}>
    {label}
  </div>
);

// ── Stage rail (the spine) ────────────────────────────────────────────────────
const StageRail: React.FC<{ frame: number; stage: number; progress: number; railIn: number }> = ({ frame, stage, progress, railIn }) => {
  const fillX = RAIL_X0 + progress * (RAIL_X1 - RAIL_X0);
  return (
    <AbsoluteFill style={{ opacity: railIn }}>
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
        {/* base line */}
        <line x1={RAIL_X0} y1={RAIL_Y} x2={RAIL_X1} y2={RAIL_Y} stroke={rgba(color.text.onBrand, 0.14)} strokeWidth={3} strokeLinecap="round" />
        {/* progress fill */}
        <line x1={RAIL_X0} y1={RAIL_Y} x2={fillX} y2={RAIL_Y} stroke={color.accent.cyan} strokeWidth={3} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${rgba(color.accent.cyan, 0.7)})` }} />
        {STAGES.map((_, i) => {
          const x = nodeX(i);
          const done = i < stage;
          const active = i === stage;
          const r = active ? 17 : 13;
          return (
            <g key={i}>
              <circle cx={x} cy={RAIL_Y} r={r + 4} fill={active ? rgba(color.accent.cyan, 0.16) : "transparent"} />
              <circle cx={x} cy={RAIL_Y} r={r} fill={done || active ? color.accent.cyan : color.brand.navy} stroke={done || active ? color.accent.cyan : rgba(color.text.onBrand, 0.3)} strokeWidth={2} style={done || active ? { filter: `drop-shadow(0 0 8px ${rgba(color.accent.cyan, 0.6)})` } : undefined} />
              {done && <path d={`M ${x - 6} ${RAIL_Y} l 4 4 l 8 -8`} fill="none" stroke={color.brand.navy} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />}
              {active && <circle cx={x} cy={RAIL_Y} r={5} fill={color.brand.navy} />}
            </g>
          );
        })}
      </svg>
      {/* labels + bodies */}
      <div style={{ position: "absolute", left: 0, right: 0, top: RAIL_Y + 30 }}>
        {STAGES.map((s, i) => {
          const x = nodeX(i);
          const active = i === stage;
          return (
            <div key={s} style={{ position: "absolute", left: x - 150, width: 300, textAlign: "center", opacity: active ? 1 : 0.5, transition: "none" }}>
              <div style={{ color: active ? color.accent.cyan : color.text.onBrand, fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>{s}</div>
              <div style={{ color: rgba(color.text.onBrand, 0.7), fontSize: 14, lineHeight: 1.4, marginTop: 8, padding: "0 14px" }}>{STAGE_BODY[i]}</div>
            </div>
          );
        })}
      </div>
      {/* "months, not years" timeline cue */}
      <div style={{ position: "absolute", left: RAIL_X0, top: RAIL_Y - 44, color: rgba(color.text.onBrand, 0.55), fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        Months, not years
      </div>
    </AbsoluteFill>
  );
};

const Glyph: React.FC<{ d: string; color: string; size?: number }> = ({ d, color: c, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
