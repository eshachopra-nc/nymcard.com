"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { dur, ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Rotating card — Card Issuing §1 hero visual ─────────────────────────────
//
// The focal point of the Card Issuing product hero (02-copy/card-issuing-copy.md
// §1): a single premium payment card rotating slowly on its vertical (Y) axis.
// As it rotates, faint live transaction activity surfaces through the card
// body, and the card morphs between debit → credit → prepaid states with a
// small mono corner label that shifts to match the current state.
//
// "3D" is done with CSS 3D transforms (perspective + preserve-3d + rotateY)
// driven by Framer Motion — never a 3D engine (three.js et al are banned by
// stack-decision.md). The rotation is a continuous ambient loop; the state
// morph is timed to the moments the front face passes the viewer.
//
// On-system:
//   • Cool-only palette — each state owns one cool hue from the CardTreatment
//     vocabulary (debit = cyan, credit = indigo, prepaid = violet). No warm
//     tones. The cyan status dot is the only functional accent.
//   • Transaction activity is ABSTRACT — masked token groups (•••• ••••) and a
//     status dot, never fabricated amounts or a fake dashboard (CLAUDE.md).
//   • Token-driven motion (dur / ease) and token-resolved colour (visual /
//     withAlpha). No raw hex, no magic durations.
//   • prefers-reduced-motion → a static resting frame: the card at a slight
//     angle showing the debit state, activity frozen. (Rule 6.)
//   • Decorative — the whole visual is aria-hidden; the hero keeps its own
//     semantics. (Rule 8.)

type CardState = {
  /** The mono corner label that shifts as the card morphs. */
  label: string;
  /** The state's single cool hue, resolved from the design tokens. */
  hue: string;
  /** A bridge hue for the field's counter-tonal undercurrent. */
  bridge: string;
};

// debit → credit → prepaid, each owning one cool hue (CardTreatment vocabulary,
// design-system.md §8.28: cyan-led → indigo-led → violet-anchor). Cool only.
const STATES: CardState[] = [
  { label: "Debit", hue: visual.cyan, bridge: visual.indigo },
  { label: "Credit", hue: visual.indigo, bridge: visual.cyan },
  { label: "Prepaid", hue: visual.violet, bridge: visual.cyan },
];

// One full rotation cadence. Ambient-slow is the gradient-drift / breathing
// speed (design-system.md §9.4) — the rotation must read as calm and cinematic,
// never spun.
const TURN_SECONDS = dur.ambientSlow * 1.5; // 12s per full vertical turn
// The card presents a fresh face every half-turn, so the morph advances on the
// half-turn cadence. The first advance is phase-shifted to land while the card
// is edge-on (≈90°, the face hidden) so the state swap happens behind the edge,
// never as a visible cross-fade on a viewer-facing face.
const HALF_TURN_MS = (TURN_SECONDS / 2) * 1000; // 6s — one face → next face
const EDGE_ON_DELAY_MS = (TURN_SECONDS / 4) * 1000; // 3s — first 90° crossing

// A single abstract activity row — a masked token group + a status dot. No
// amounts, no merchant names: live activity surfacing, not a fabricated ledger.
function ActivityRow({ width, lit }: { width: string; lit: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full"
        style={{
          background: lit
            ? visual.cyan
            : withAlpha(visual.white, 0.45),
          boxShadow: lit ? `0 0 6px ${withAlpha(visual.cyan, 0.8)}` : "none",
        }}
      />
      <span
        aria-hidden="true"
        className="h-1.5 rounded-full"
        style={{
          width,
          background: withAlpha(visual.white, 0.32),
        }}
      />
      <span
        aria-hidden="true"
        className="ml-auto font-mono text-[9px] tracking-[0.12em]"
        style={{ color: withAlpha(visual.white, 0.4) }}
      >
        ••••
      </span>
    </div>
  );
}

// The faint transaction stream that surfaces through the card body. Abstract
// rows scroll up slowly behind a top/bottom mask so they emerge and dissolve
// rather than hard-cutting at the edges. Vertical scroll = ambient-fast cadence
// per design-system.md §9.4 ("transaction stream rows").
function ActivityStream({ animate }: { animate: boolean }) {
  const rows = useMemo(
    () => [
      { width: "38%", lit: true },
      { width: "52%", lit: false },
      { width: "30%", lit: false },
      { width: "46%", lit: true },
      { width: "34%", lit: false },
      { width: "50%", lit: false },
    ],
    [],
  );

  const list = (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <ActivityRow key={i} width={r.width} lit={r.lit} />
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-5 bottom-5 top-[42%] overflow-hidden"
      style={{
        // soft mask so rows emerge and dissolve at the edges of the window
        maskImage:
          "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
      }}
    >
      {animate ? (
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-50%" }}
          transition={{
            duration: dur.ambientFast * 6, // calm vertical drift
            ease: ease.linear,
            repeat: Infinity,
          }}
        >
          {list}
          <div className="mt-2.5" />
          {list}
        </motion.div>
      ) : (
        list
      )}
    </div>
  );
}

// The lit front face of the card. The chromatic field + corner label cross-fade
// when `state` changes, so the card "morphs" between debit / credit / prepaid.
function CardFace({ state }: { state: CardState }) {
  // Per-hue field: a focal pool (lit corner) + a counter-tonal undercurrent +
  // a navy depth anchor — the CardTreatment composition (§8.28), tuned darker
  // here because the card body is a deep navy material, not a light tile.
  const field =
    `radial-gradient(120% 96% at 88% 6%, ${withAlpha(state.hue, 0.5)}, transparent 62%),` +
    `radial-gradient(116% 100% at 4% 100%, ${withAlpha(state.bridge, 0.32)}, transparent 70%),` +
    `radial-gradient(150% 90% at 50% 120%, ${withAlpha(visual.navy, 0.9)}, transparent 72%)`;

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-xl"
      style={{
        background: visual.navy,
        // backface so the front face hides when rotated away
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Chromatic field — cross-fades on state morph. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={state.label}
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: field }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur.deliberate, ease: ease.inOut }}
        />
      </AnimatePresence>

      {/* Material structure on top of the field — all faint, cool only. */}
      {/* Top-edge lit hairline — the front face catches the atmosphere. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.7,
          )} 30%, transparent 88%)`,
        }}
      />
      {/* A soft directional sheen so the surface reads as a lit material. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(130% 70% at 18% -8%, ${withAlpha(
            visual.white,
            0.12,
          )}, transparent 56%)`,
        }}
      />

      {/* Brand mark — a small abstract glyph, brand-tinted (never a logo). */}
      <div className="absolute left-5 top-5 flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="size-2 rounded-full"
          style={{
            background: withAlpha(visual.cyan, 0.9),
            boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.7)}`,
          }}
        />
        <span
          aria-hidden="true"
          className="block h-2 w-9 rounded-full"
          style={{ background: withAlpha(visual.white, 0.22) }}
        />
      </div>

      {/* EMV chip — a small structural rectangle, never a photoreal chip. */}
      <div
        aria-hidden="true"
        className="absolute left-5 top-[34%] h-7 w-10 rounded-[6px] border"
        style={{
          borderColor: withAlpha(visual.white, 0.18),
          background: `linear-gradient(135deg, ${withAlpha(
            visual.cyan,
            0.28,
          )}, ${withAlpha(visual.indigo, 0.22)})`,
        }}
      >
        <span
          className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2"
          style={{ background: withAlpha(visual.white, 0.22) }}
        />
        <span
          className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2"
          style={{ background: withAlpha(visual.white, 0.22) }}
        />
      </div>

      {/* The corner state label — shifts as the card morphs. Geist Mono. */}
      <div className="absolute right-5 top-5">
        <AnimatePresence mode="wait">
          <motion.span
            key={state.label}
            className="block font-mono text-[11px] tracking-[0.18em]"
            style={{ color: withAlpha(visual.white, 0.92) }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: dur.base, ease: ease.out }}
          >
            {state.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// The reverse of the card — the magnetic stripe + a mono signature panel.
// Cool only, abstract: it exists so the half-turn presents a real back face
// rather than a hollow card.
function CardBack() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(160deg, ${visual.navy}, ${withAlpha(
          visual.primary,
          0.45,
        )})`,
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Magnetic stripe band. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-7 h-10"
        style={{ background: withAlpha(visual.navy, 0.92) }}
      />
      {/* Signature panel — an abstract mono token strip, no real data. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-[58%] flex h-9 items-center rounded-[4px] px-3"
        style={{ background: withAlpha(visual.white, 0.85) }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.18em]"
          style={{ color: withAlpha(visual.navy, 0.6) }}
        >
          ••• ••• •••
        </span>
      </div>
      {/* Faint cyan edge so the back face stays in the same lit material. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.4,
          )} 40%, transparent 86%)`,
        }}
      />
    </div>
  );
}

export function RotatingCard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [stateIndex, setStateIndex] = useState(0);
  const state = STATES[stateIndex];

  // Advance debit → credit → prepaid on the half-turn cadence, phase-shifted so
  // each swap lands while the card is edge-on (face hidden). Disabled under
  // reduced motion — the static frame holds the debit state.
  useEffect(() => {
    if (reduced) return;
    let interval: number | undefined;
    const first = window.setTimeout(() => {
      setStateIndex((i) => (i + 1) % STATES.length);
      interval = window.setInterval(() => {
        setStateIndex((i) => (i + 1) % STATES.length);
      }, HALF_TURN_MS);
    }, EDGE_ON_DELAY_MS);
    return () => {
      window.clearTimeout(first);
      if (interval) window.clearInterval(interval);
    };
  }, [reduced]);

  // The continuous vertical rotation. Driven entirely through the `animate`
  // prop — rotateY must NOT also live in `style`, or the (static) style value
  // wins and the card never turns. Reduced motion → a static resting angle.
  const cardInner = (
    <motion.div
      className="relative h-full w-full"
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        ...(reduced ? { rotateY: -22 } : null),
      }}
      {...(reduced
        ? {}
        : {
            animate: { rotateY: 360 },
            transition: {
              duration: TURN_SECONDS,
              ease: ease.linear,
              repeat: Infinity,
            },
          })}
    >
      <CardFace state={state} />
      <CardBack />
      {/* Activity surfaces through the front face, in the same 3D plane so it
          rotates with the card body. */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <ActivityStream animate={!reduced} />
      </div>
    </motion.div>
  );

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ display: "flex", height: "100%", width: "100%" }}
    >
      {/* Scene — sets perspective + centres the card. */}
      <div
        className="relative m-auto"
        style={{
          width: "min(100%, 24rem)",
          perspective: "1400px",
          WebkitPerspective: "1400px",
        }}
      >
        {/* Ambient pool behind the card — the state hue casts onto the scene. */}
        <motion.div
          className="pointer-events-none absolute -inset-10 -z-10"
          style={{
            background: `radial-gradient(60% 60% at 50% 46%, ${withAlpha(
              state.hue,
              0.22,
            )}, transparent 72%)`,
          }}
          animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: dur.ambientMid,
                  ease: ease.inOut,
                  repeat: Infinity,
                }
          }
        />

        {/* The card. 1.586:1 is the ISO/IEC 7810 ID-1 card aspect ratio. */}
        <div
          className="relative w-full drop-shadow-[0_30px_60px_rgba(14,26,51,0.35)]"
          style={{ aspectRatio: "1.586 / 1" }}
        >
          {cardInner}
        </div>

        {/* Floor reflection — a faint mirrored echo so the card reads as
            sitting in a lit room, not floating on a flat plane. */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-3 w-[88%] opacity-30"
          style={{
            aspectRatio: "3.6 / 1",
            background: `radial-gradient(80% 100% at 50% 0%, ${withAlpha(
              state.hue,
              0.3,
            )}, transparent 70%)`,
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
    </div>
  );
}
