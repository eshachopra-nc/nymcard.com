import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { color, rgba, ease, FONT_FAMILY, FONT_MONO } from "./tokens";
import { SYSTEMS, type LegacySystem } from "./legacy-systems";

// ── Homepage §3 signature video — "legacy fragmentation → one nCore core" ────
//
// A dark, premium, cinematic ~9s sequence. Pre-rendered to MP4/WebM + a poster
// frame, embedded in components/sections/LegacyProblem.tsx (autoplay/muted/loop;
// reduced-motion shows the poster only).
//
// FOUR BEATS on one 270-frame / 30fps timeline (drive everything from frame):
//   0 ─ 75   ASSEMBLE   the six legacy systems drop in at mismatched angles /
//                       sizes / offsets; tangled stitched seams draw between
//                       them. Reads heavy, separate, precarious.
//   75 ─135  STRAIN     the tangle holds and shudders; the seams pull taut;
//                       a quiet "before" caption. The weight of the estate.
//   135─195  CONVERGE   panels drift inward to a single column; seams retract;
//                       chaos collapses toward the centre.
//   195─270  RESOLVE    the clean nCore stack assembles — six translucent
//                       layers on the nCore engine, a cyan wave rising through
//                       them (echoing components/artifacts/NCoreStack.tsx).
//                       Chaos → order. The relief.
//
// ON-BRAND: navy/cyan-led, deep cool; token values only (src/tokens.ts);
// restrained, premium easing. No alarm red — the pain reads through scatter,
// tangle, mismatch and weight, never colour-coding.

export const FPS = 30;
export const DURATION_IN_FRAMES = 270;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Phase boundaries (frames).
const T_ASSEMBLE_END = 75;
const T_STRAIN_END = 135;
const T_CONVERGE_START = 150;
const T_CONVERGE_END = 200;
const T_RESOLVE_START = 196;

const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

// ── Deterministic scatter for the fragmented field (count-agnostic) ──────────
// Golden-angle distribution + per-index radius bands and jitter so the panels
// read irregular / assembled (no ring, no grid). Mirrors the on-page
// FragmentationWeb geometry intent.
function scatter(i: number, n: number) {
  const golden = 2.399963;
  const angle = i * golden + 1.7;
  // Radius bands pushed off any single ring; wide spread so the estate reads as
  // a scattered SPRAWL, not a near-column. Landscape squash on Y.
  const band = i % 3 === 0 ? 0.92 : i % 3 === 1 ? 0.78 : 0.62;
  const jitter = (((i * 53) % 17) - 8) / 100;
  const r = band + jitter;
  const rx = WIDTH * 0.4;
  const ry = HEIGHT * 0.34;
  const tilt = (((i * 37) % 19) - 9) * 0.9; // deg, deterministic mismatch ±~8
  const sizeJitter = 1 + (((i * 29) % 9) - 4) / 14; // mismatched sizes ±~0.28
  // Mismatched legacy panel width (independent of the resolved layer width) so
  // the fragmented field reads as genuinely different consoles.
  const fragW = 300 + ((i * 47) % 5) * 46;
  const fragH = 86 + ((i * 31) % 3) * 10;
  return {
    x: CENTER.x + Math.cos(angle) * r * rx,
    y: CENTER.y + Math.sin(angle) * r * ry,
    tilt,
    scale: sizeJitter,
    fragW,
    fragH,
  };
}

export const LegacyToNCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const systems = SYSTEMS;
  const n = systems.length;

  // Global cinematic camera: a slow push-in across the whole piece, plus a
  // gentle settle as it resolves. Premium, restrained.
  const camScale = interpolate(
    frame,
    [0, T_ASSEMBLE_END, T_CONVERGE_END, DURATION_IN_FRAMES],
    [1.02, 1.0, 1.03, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ease.cinematic) },
  );

  // Converge progress 0→1 (panels travel from scatter to the resolved column).
  const converge = interpolate(frame, [T_CONVERGE_START, T_CONVERGE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.cinematic),
  });

  // Resolved stack reveal 0→1.
  const resolve = interpolate(frame, [T_RESOLVE_START, DURATION_IN_FRAMES - 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.cinematic),
  });

  // The stack's resolved column geometry (echo NCoreStack: layers top→down,
  // engine at the base). Computed here so the converging panels can fly to the
  // exact slots their resolved layers will occupy (chaos → order continuity).
  const stack = stackGeometry(n);

  // Precompute scatter once.
  const pts = systems.map((_, i) => scatter(i, n));

  return (
    <AbsoluteFill style={{ backgroundColor: color.brand.navy, fontFamily: FONT_FAMILY }}>
      <DeepField frame={frame} />

      <AbsoluteFill
        style={{
          transform: `scale(${camScale})`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* Seams (behind panels). Tangled in the fragmented phase; retract on
            converge; replaced by the clean cyan spine on resolve. */}
        <Seams
          frame={frame}
          systems={systems}
          pts={pts}
          stack={stack}
          converge={converge}
          resolve={resolve}
        />

        {/* The legacy system panels → converge → fade into the resolved layers. */}
        {systems.map((sys, i) => (
          <LegacyPanel
            key={sys.name}
            sys={sys}
            index={i}
            count={n}
            frame={frame}
            from={pts[i]}
            to={stack.layers[i]}
            converge={converge}
            resolve={resolve}
            fps={fps}
          />
        ))}

        {/* The resolved nCore stack — translucent layers assembling on the
            engine, cyan wave rising. Crossfades up as the panels arrive. */}
        <ResolvedStack frame={frame} systems={systems} stack={stack} resolve={resolve} fps={fps} />
      </AbsoluteFill>

      {/* Cinematic captions — abstract, no invented data. Beat-tied. */}
      <Captions frame={frame} />

      {/* Cinematic vignette + faint grain for the dark frame. */}
      <Vignette />
    </AbsoluteFill>
  );
};

// ── Resolved-stack geometry (echo NCoreStack) ────────────────────────────────
function stackGeometry(n: number) {
  const layerH = 84;
  const gap = 16;
  const engineH = 104;
  const totalH = n * layerH + (n - 1) * gap + gap + engineH;
  const top = CENTER.y - totalH / 2;
  const layerW = 520;
  const x = CENTER.x;
  const layers = Array.from({ length: n }, (_, i) => ({
    x,
    y: top + i * (layerH + gap) + layerH / 2,
    w: layerW,
    h: layerH,
  }));
  const engine = {
    x,
    y: top + n * (layerH + gap) + gap + engineH / 2,
    w: layerW,
    h: engineH,
  };
  return { layers, engine, layerW, top, totalH };
}

// ── Deep cool field — the dark cinematic bed ─────────────────────────────────
const DeepField: React.FC<{ frame: number }> = ({ frame }) => {
  // Slow ambient drift of two cool blooms (navy→indigo→cyan), restrained.
  const drift = interpolate(frame, [0, DURATION_IN_FRAMES], [0, 1]);
  const cyanRise = interpolate(frame, [T_CONVERGE_START, DURATION_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.cinematic),
  });
  return (
    <AbsoluteFill>
      {/* base deep navy */}
      <AbsoluteFill style={{ backgroundColor: color.brand.navy }} />
      {/* indigo / purple bloom top-left (the "estate" weight) */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${50 + drift * 6}% ${48}% at ${18 + drift * 4}% ${
            22 + drift * 3
          }%, ${rgba(color.accent.indigo, 0.34)}, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(46% 44% at 84% 80%, ${rgba(color.brand.purple, 0.22)}, transparent 62%)`,
        }}
      />
      {/* cyan core glow rising as the resolve approaches — the relief */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 42% at 50% ${64 - cyanRise * 8}%, ${rgba(
            color.accent.cyan,
            0.05 + cyanRise * 0.16,
          )}, transparent 64%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ── Tangled seams ────────────────────────────────────────────────────────────
// Heavy, bowed, crossed connectors between the scattered panels (fragmented),
// retracting toward the centre on converge; on resolve a single clean cyan
// spine remains through the stack.
const Seams: React.FC<{
  frame: number;
  systems: LegacySystem[];
  pts: ReturnType<typeof scatter>[];
  stack: ReturnType<typeof stackGeometry>;
  converge: number;
  resolve: number;
}> = ({ frame, systems, pts, stack, converge, resolve }) => {
  // Build a tangle: connect each panel to two others (i+1, i+3) so seams cross.
  const edges: [number, number][] = [];
  const n = systems.length;
  for (let i = 0; i < n; i++) {
    edges.push([i, (i + 1) % n]);
    edges.push([i, (i + 3) % n]);
  }

  // Draw-in over the assemble beat.
  const draw = interpolate(frame, [10, T_ASSEMBLE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.out),
  });
  // Strain shudder.
  const strain =
    frame > T_ASSEMBLE_END && frame < T_STRAIN_END
      ? Math.sin((frame - T_ASSEMBLE_END) * 0.9) * 3
      : 0;
  const seamOpacity = (1 - converge) * 0.9;

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="seam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={rgba(color.accent.indigo, 0.55)} />
            <stop offset="100%" stopColor={rgba(color.brand.purple, 0.4)} />
          </linearGradient>
        </defs>
        {edges.map(([a, b], k) => {
          const pa = lerpPoint(pts[a], stack.layers[a], converge);
          const pb = lerpPoint(pts[b], stack.layers[b], converge);
          // Bowed control point with deterministic sag + strain shudder.
          const mx = (pa.x + pb.x) / 2 + (((k * 41) % 80) - 40) * (1 - converge);
          const my =
            (pa.y + pb.y) / 2 + (((k * 23) % 70) - 20) * (1 - converge) + strain * ((k % 2) - 0.5);
          const path = `M ${pa.x} ${pa.y} Q ${mx} ${my} ${pb.x} ${pb.y}`;
          const len = 1600;
          return (
            <path
              key={k}
              d={path}
              fill="none"
              stroke="url(#seam)"
              strokeWidth={2 + (k % 2)}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              opacity={seamOpacity}
            />
          );
        })}

        {/* Tape patches at a few crossings — the "crudely stitched" tell. */}
        {!resolve &&
          edges.slice(0, 3).map(([a, b], k) => {
            const pa = lerpPoint(pts[a], stack.layers[a], converge);
            const pb = lerpPoint(pts[b], stack.layers[b], converge);
            const cx = (pa.x + pb.x) / 2;
            const cy = (pa.y + pb.y) / 2;
            const tapeOpacity = interpolate(frame, [55, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) * (1 - converge);
            return (
              <rect
                key={`tape-${k}`}
                x={cx - 18}
                y={cy - 7}
                width={36}
                height={14}
                rx={2}
                transform={`rotate(${(k * 33) % 50 - 25} ${cx} ${cy})`}
                fill={rgba(color.text.onBrand, 0.1)}
                stroke={rgba(color.text.onBrand, 0.16)}
                strokeWidth={1}
                opacity={tapeOpacity}
              />
            );
          })}

        {/* Clean cyan spine through the resolved stack. */}
        <line
          x1={CENTER.x}
          y1={stack.layers[0].y}
          x2={CENTER.x}
          y2={stack.engine.y}
          stroke={rgba(color.accent.cyan, 0.5 * resolve)}
          strokeWidth={2}
        />
      </svg>
    </AbsoluteFill>
  );
};

// ── A legacy system panel ─────────────────────────────────────────────────────
const LegacyPanel: React.FC<{
  sys: LegacySystem;
  index: number;
  count: number;
  frame: number;
  from: ReturnType<typeof scatter>;
  to: { x: number; y: number; w: number; h: number };
  converge: number;
  resolve: number;
  fps: number;
}> = ({ sys, index, frame, from, to, converge, resolve, fps }) => {
  // Drop-in on the assemble beat, staggered.
  const appear = spring({
    frame: frame - index * 5,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.9 },
    durationInFrames: 40,
  });
  const enterY = interpolate(appear, [0, 1], [-46, 0]);
  const enterOpacity = interpolate(appear, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // Strain shudder during the hold.
  const strain =
    frame > T_ASSEMBLE_END && frame < T_STRAIN_END
      ? Math.sin((frame - T_ASSEMBLE_END) * 0.7 + index) * 2.4
      : 0;

  // Position: scatter → resolved slot.
  const p = lerpPoint(from, to, converge);
  const x = p.x;
  const y = p.y + enterY + strain;

  // Tilt straightens as it converges (mismatched → squared up).
  const tilt = from.tilt * (1 - converge);
  // Mismatched scale normalises toward the resolved layer scale on converge.
  const scale = from.scale * (1 - converge) + 1 * converge;

  // The legacy panel fades out just as the resolved layer takes its place.
  const panelOpacity = enterOpacity * (1 - resolve);

  // Mismatched legacy size (fragmented) → the uniform resolved layer size on
  // converge. This is the visual "everything squares up into one system".
  const w = from.fragW + (to.w - from.fragW) * converge;
  const h = from.fragH + (to.h - from.fragH) * converge;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transform: `rotate(${tilt}deg) scale(${scale})`,
        opacity: panelOpacity,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 14,
          // mismatched legacy console look: faint, cool, slightly different per
          // panel via index-driven tint; reads "old + separate".
          background: `linear-gradient(180deg, ${rgba(color.surfaceDark.elevated, 0.92)}, ${rgba(
            color.brand.navy,
            0.92,
          )})`,
          border: `1px solid ${rgba(color.text.onBrand, 0.12)}`,
          boxShadow: `0 20px 50px -24px ${rgba("#000000", 0.7)}`,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Glyph d={sys.glyph} color={rgba(color.accent.indigo, 0.95)} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          <span
            style={{
              color: color.text.onBrand,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {sys.vendor}
          </span>
          <span
            style={{
              color: color.text.darkMuted,
              fontFamily: FONT_MONO,
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {sys.tag}
          </span>
        </div>
        {/* mismatched "readout" bars — different per panel, the legacy-console tell */}
        <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((b) => (
            <span
              key={b}
              style={{
                display: "block",
                height: 4,
                width: 40 + ((index + b) % 4) * 12,
                borderRadius: 2,
                background: rgba(color.text.onBrand, 0.16 - b * 0.03),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── The resolved nCore stack (echo NCoreStack) ───────────────────────────────
const ResolvedStack: React.FC<{
  frame: number;
  systems: LegacySystem[];
  stack: ReturnType<typeof stackGeometry>;
  resolve: number;
  fps: number;
}> = ({ frame, systems, stack, resolve, fps }) => {
  if (resolve <= 0) return null;
  const n = systems.length;

  // Cyan wave: a lit-layer index that rises from the engine (index n) up to the
  // top (index 0) once the stack has assembled. Drives the "alive" read.
  const waveStart = DURATION_IN_FRAMES - 60;
  const waveProgress = interpolate(frame, [waveStart, DURATION_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.inOut),
  });
  // litFloat: n (engine) .. 0 (top layer)
  const litFloat = n - waveProgress * n;

  return (
    <AbsoluteFill>
      {/* engine bloom + label */}
      <StackEngine engine={stack.engine} resolve={resolve} lit={litFloat <= 0.6} frame={frame} />

      {/* product layers, top→down = systems order (Cards first) */}
      {systems.map((sys, i) => {
        const layer = stack.layers[i];
        // each layer rises into place, staggered from the engine up.
        const layerReveal = interpolate(
          resolve,
          [0.15 + ((n - i) / n) * 0.5, 0.55 + ((n - i) / n) * 0.45],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const isLit = Math.abs(litFloat - i) < 0.6;
        return (
          <StackLayer
            key={sys.name}
            sys={sys}
            layer={layer}
            reveal={layerReveal}
            isLit={isLit}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const StackLayer: React.FC<{
  sys: LegacySystem;
  layer: { x: number; y: number; w: number; h: number };
  reveal: number;
  isLit: boolean;
}> = ({ sys, layer, reveal, isLit }) => {
  const y = layer.y + interpolate(reveal, [0, 1], [16, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: layer.x - layer.w / 2,
        top: y - layer.h / 2,
        width: layer.w,
        height: layer.h,
        opacity: reveal,
        borderRadius: 14,
        boxSizing: "border-box",
        padding: "0 22px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: rgba(color.text.onBrand, 0.05),
        border: `1px solid ${isLit ? rgba(color.accent.cyan, 0.5) : rgba(color.text.onBrand, 0.12)}`,
        boxShadow: isLit
          ? `0 0 30px -4px ${rgba(color.accent.cyan, 0.55)}, inset 0 0 0 1px ${rgba(color.accent.cyan, 0.25)}`
          : `0 14px 34px -18px ${rgba("#000000", 0.6)}`,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* cyan wash when lit */}
      {isLit && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            background: `linear-gradient(90deg, transparent, ${rgba(color.accent.cyan, 0.16)} 50%, transparent)`,
          }}
        />
      )}
      <Glyph
        d={sys.glyph}
        color={isLit ? color.accent.cyan : rgba(color.text.onBrand, 0.85)}
        size={28}
      />
      <span
        style={{
          position: "relative",
          color: isLit ? color.accent.cyan : color.text.onBrand,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {sys.name}
      </span>
    </div>
  );
};

const StackEngine: React.FC<{
  engine: { x: number; y: number; w: number; h: number };
  resolve: number;
  lit: boolean;
  frame: number;
}> = ({ engine, resolve, lit }) => {
  const reveal = interpolate(resolve, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: engine.x - engine.w / 2,
        top: engine.y - engine.h / 2,
        width: engine.w,
        height: engine.h,
        opacity: reveal,
        borderRadius: 14,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: color.brand.navy,
        border: `1px solid ${rgba(color.accent.cyan, 0.22)}`,
        overflow: "hidden",
      }}
    >
      {/* cyan interface edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 2,
          background: rgba(color.accent.cyan, 0.7),
        }}
      />
      {/* inner bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(70% 120% at 50% 100%, ${rgba(
            color.accent.cyan,
            lit ? 0.4 : 0.22,
          )}, transparent 70%)`,
        }}
      />
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: color.accent.cyan,
          boxShadow: `0 0 14px ${rgba(color.accent.cyan, 0.9)}`,
          position: "relative",
        }}
      />
      <span
        style={{
          position: "relative",
          color: color.text.onBrand,
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        nCore
      </span>
    </div>
  );
};

// ── Cinematic captions (abstract, no invented data) ──────────────────────────
const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  // "before" line during fragmentation; payoff line on resolve.
  const beforeIn = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.out),
  });
  const beforeOut = interpolate(frame, [T_CONVERGE_START - 12, T_CONVERGE_START + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const before = beforeIn * beforeOut;

  const afterIn = interpolate(frame, [DURATION_IN_FRAMES - 64, DURATION_IN_FRAMES - 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.out),
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: before,
          transform: `translateY(${(1 - before) * -8}px)`,
        }}
      >
        <span
          style={{
            color: color.text.darkSecondary,
            fontFamily: FONT_MONO,
            fontSize: 17,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Separate systems, stitched together
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 74,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: afterIn,
          transform: `translateY(${(1 - afterIn) * 8}px)`,
        }}
      >
        <span
          style={{
            color: color.text.onBrand,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          One platform.{" "}
          <span style={{ color: color.accent.cyan }}>nCore.</span>
        </span>
      </div>
    </>
  );
};

// ── Vignette ──────────────────────────────────────────────────────────────────
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 100% at 50% 50%, transparent 55%, ${rgba(
        "#000000",
        0.45,
      )} 100%)`,
      pointerEvents: "none",
    }}
  />
);

// ── helpers ───────────────────────────────────────────────────────────────────
function lerpPoint(
  a: { x: number; y: number },
  b: { x: number; y: number },
  t: number,
): { x: number; y: number } {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const Glyph: React.FC<{ d: string; color: string; size?: number }> = ({ d, color, size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);
