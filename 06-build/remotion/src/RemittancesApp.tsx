import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { color, rgba, ease, FONT_FAMILY, FONT_MONO } from "./tokens";

// ── Digital Banking §4 · Remittances video ───────────────────────────────────
//
// Owner direction (2026-06-08): a mobile app where a user chooses their
// multi-currency wallet and sends money. ~9s, dark cinematic, a phone centred on
// a deep field, pre-rendered to MP4/WebM + poster.
//
// BEATS (270f / 30fps):
//   0 ─104   WALLETS  the app shows multi-currency wallets (USD · EUR · GBP); a
//                     cursor taps the EUR wallet (~64) → it highlights.
//   112─182  SEND     a send screen: recipient + €500; the cursor taps Send (~150).
//   190─270  SENT     a confirmation — €500 sent, settled.

export const FPS = 30;
export const DURATION_IN_FRAMES = 270;
// Portrait canvas (owner 2026-06-08): the phone fills the frame so it reads large
// in the page slot — no wide transparent "card" around it shrinking the device.
export const WIDTH = 500;
export const HEIGHT = 1000;

const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const bez = (t: readonly [number, number, number, number]) => Easing.bezier(t[0], t[1], t[2], t[3]);

const PHONE_W = 430;
const PHONE_H = 900;
const PHONE_TOP = CY - PHONE_H / 2;
const SCREEN_L = CX - PHONE_W / 2 + 16;
const SCREEN_W = PHONE_W - 32;

const WALLETS = [
  { code: "USD", glyph: "$", name: "US Dollar", bal: "$8,420.00" },
  { code: "EUR", glyph: "€", name: "Euro", bal: "€3,120.00" },
  { code: "GBP", glyph: "£", name: "British Pound", bal: "£1,540.00" },
];

const TAP_EUR = 64;
const TAP_SEND = 150;

export const RemittancesApp: React.FC = () => {
  const frame = useCurrentFrame();
  // The phone already fills the portrait canvas; just a whisper of push-in.
  const cam = interpolate(frame, [0, 60, DURATION_IN_FRAMES], [1.01, 1.0, 1.0], { extrapolateRight: "clamp", easing: bez(ease.cinematic) });

  const walletsVis = interpolate(frame, [0, 14, 104, 120], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  const sendVis = interpolate(frame, [112, 128, 182, 196], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  const sentVis = interpolate(frame, [190, 212], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.cinematic) });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", fontFamily: FONT_FAMILY }}>
      <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "50% 50%" }}>
        <Phone>
          {walletsVis > 0 && <WalletsScreen vis={walletsVis} frame={frame} />}
          {sendVis > 0 && <SendScreen vis={sendVis} />}
          {sentVis > 0 && <SentScreen vis={sentVis} frame={frame} />}
        </Phone>
        <Cursor frame={frame} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const DeepField: React.FC<{ frame: number; sent: number }> = ({ frame, sent }) => {
  const drift = interpolate(frame, [0, DURATION_IN_FRAMES], [0, 1]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(${54 + drift * 6}% 52% at ${24 + drift * 4}% 22%, ${rgba(color.accent.indigo, 0.28)}, transparent 60%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(50% 46% at 78% 82%, ${rgba(color.accent.cyan, 0.1 + sent * 0.12)}, transparent 62%)` }} />
    </AbsoluteFill>
  );
};

// ── Phone frame ───────────────────────────────────────────────────────────────
// The titanium device frame (owner wants the mobile device kept); it fills the
// portrait canvas so the phone reads large on the page.
const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: CX - PHONE_W / 2,
      top: PHONE_TOP,
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 60,
      padding: 6,
      boxSizing: "border-box",
      background: "linear-gradient(150deg, #4a4e55, #16181c 52%, #303338)",
      boxShadow: "0 50px 90px -30px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.22)",
    }}
  >
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 54, overflow: "hidden", background: "linear-gradient(180deg, #112143 0%, #0C1730 60%, #0A1428 100%)" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(90% 50% at 82% -6%, ${rgba(color.accent.cyan, 0.28)}, transparent 56%)` }} />
      {/* Dynamic Island */}
      <div style={{ position: "absolute", left: "50%", top: 16, transform: "translateX(-50%)", width: 108, height: 28, borderRadius: 999, background: "#000", zIndex: 30 }} />
      {children}
    </div>
  </div>
);

// ── Wallets screen ────────────────────────────────────────────────────────────
const WalletsScreen: React.FC<{ vis: number; frame: number }> = ({ vis, frame }) => (
  <div style={{ position: "absolute", inset: 0, opacity: vis, padding: "70px 26px 0", color: color.text.onBrand }}>
    <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em" }}>Your wallets</div>
    <div style={{ color: color.text.darkMuted, fontFamily: FONT_MONO, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>Multi-currency</div>
    <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
      {WALLETS.map((w) => {
        const selected = w.code === "EUR" && frame >= TAP_EUR;
        return (
          <div
            key={w.code}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 20px",
              borderRadius: 18,
              background: selected ? rgba(color.accent.cyan, 0.12) : rgba(color.text.onBrand, 0.05),
              boxShadow: selected ? `inset 0 0 0 2px ${rgba(color.accent.cyan, 0.6)}, 0 0 30px -8px ${rgba(color.accent.cyan, 0.5)}` : `inset 0 0 0 1px ${rgba(color.text.onBrand, 0.1)}`,
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(150deg, ${color.brand.navySoft}, ${color.brand.navy})`, boxShadow: `inset 0 0 0 1px ${rgba(color.text.onBrand, 0.12)}`, fontSize: 24, fontWeight: 700, color: color.text.onBrand }}>
              {w.glyph}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{w.code}</div>
              <div style={{ color: color.text.darkMuted, fontSize: 13, fontFamily: FONT_MONO, letterSpacing: "0.04em", marginTop: 2 }}>{w.name}</div>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{w.bal}</div>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Send screen ───────────────────────────────────────────────────────────────
const SendScreen: React.FC<{ vis: number }> = ({ vis }) => (
  <div style={{ position: "absolute", inset: 0, opacity: vis, padding: "70px 26px 0", color: color.text.onBrand, display: "flex", flexDirection: "column" }}>
    <div style={{ fontSize: 28, fontWeight: 700 }}>Send</div>
    <div style={{ color: color.accent.cyan, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>From EUR wallet</div>

    {/* recipient */}
    <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 16, background: rgba(color.text.onBrand, 0.05), boxShadow: `inset 0 0 0 1px ${rgba(color.text.onBrand, 0.1)}` }}>
      <div style={{ width: 42, height: 42, borderRadius: 999, background: `linear-gradient(150deg, ${color.accent.cyan}, ${color.brand.primary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: color.text.onBrand }}>MS</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Maria Santos</div>
        <div style={{ color: color.text.darkMuted, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.06em", marginTop: 2 }}>Lisbon · €</div>
      </div>
    </div>

    {/* amount */}
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <div style={{ color: color.text.darkMuted, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>You send</div>
      <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 8 }}>€500.00</div>
      <div style={{ color: color.text.darkSecondary, fontSize: 15, fontFamily: FONT_MONO, marginTop: 6 }}>Maria receives €500.00</div>
    </div>

    {/* send button — lifted into the top 75% (the rest of the phone is cropped) */}
    <div style={{ marginTop: "auto", marginBottom: 252, height: 66, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: `linear-gradient(135deg, ${color.brand.primary}, ${color.accent.cyan})`, boxShadow: `0 18px 40px -16px ${rgba(color.accent.cyan, 0.6)}`, fontSize: 22, fontWeight: 700 }}>
      <Glyph d="M5 12h14 M13 6l6 6-6 6" color={color.text.onBrand} size={22} />
      Send €500
    </div>
  </div>
);

// ── Sent confirmation ─────────────────────────────────────────────────────────
const SentScreen: React.FC<{ vis: number; frame: number }> = ({ vis, frame }) => {
  const pop = interpolate(frame, [192, 214], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: vis, padding: "0 26px 290px", color: color.text.onBrand, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <div style={{ width: 108, height: 108, borderRadius: 999, transform: `scale(${0.6 + pop * 0.4})`, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(150deg, ${color.accent.cyan}, ${color.brand.primary})`, boxShadow: `0 0 60px -6px ${rgba(color.accent.cyan, 0.7)}` }}>
        <Glyph d="M5 12.5 10 17.5 19 6.5" color={color.text.onBrand} size={52} />
      </div>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.01em" }}>€500 sent</div>
      <div style={{ color: color.text.darkSecondary, fontSize: 17, fontFamily: FONT_MONO, letterSpacing: "0.04em" }}>to Maria Santos</div>
      <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: rgba(color.accent.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${rgba(color.accent.cyan, 0.4)}`, color: color.accent.cyan, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Settled instantly
      </div>
    </div>
  );
};

// ── Cursor (taps EUR, then Send) ─────────────────────────────────────────────
const Cursor: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame >= 186) return null;
  // two targets: EUR card (~CX, CY-95) then Send button (~CX, CY+330)
  const eur = { x: CX + 80, y: CY - 70 };
  const send = { x: CX + 50, y: CY + 158 };
  let x: number, y: number, tapAt: number;
  if (frame < 112) {
    x = interpolate(frame, [26, TAP_EUR], [CX + 320, eur.x], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
    y = interpolate(frame, [26, TAP_EUR], [CY + 360, eur.y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
    tapAt = TAP_EUR;
  } else {
    x = interpolate(frame, [120, TAP_SEND], [eur.x, send.x], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
    y = interpolate(frame, [120, TAP_SEND], [eur.y, send.y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
    tapAt = TAP_SEND;
  }
  const press = frame >= tapAt && frame <= tapAt + 8 ? 0.84 : 1;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 40 }}>
      <svg width={36} height={36} viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, transform: `scale(${press})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
        <path d="M5 3l14 8-6 1.5L9 19z" fill={color.text.onBrand} stroke={color.brand.navy} strokeWidth={1} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const afterIn = interpolate(frame, [DURATION_IN_FRAMES - 54, DURATION_IN_FRAMES - 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bez(ease.out) });
  return (
    <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", opacity: afterIn, transform: `translateY(${(1 - afterIn) * 8}px)` }}>
      <span style={{ color: color.text.onBrand, fontSize: 27, fontWeight: 600, letterSpacing: "-0.01em" }}>
        Multi-currency wallets. <span style={{ color: color.accent.cyan }}>Money across borders.</span>
      </span>
    </div>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 50% 50%, transparent 56%, ${rgba("#000000", 0.42)} 100%)`, pointerEvents: "none" }} />
);

const Glyph: React.FC<{ d: string; color: string; size?: number }> = ({ d, color: c, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
