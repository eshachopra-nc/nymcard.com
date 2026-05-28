import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";

// ── Infrastructure icon system ─────────────────────────────────────────────
//
// One icon treatment: atmospheric. Each icon is a restrained geometric mark
// on a 24×24 grid, drawn with a cool gradient stroke, set inside a
// rounded-square tile that carries a soft tonal glow. Never a circle, never
// a flat fill, never neon.
//
// The set spans the full cool palette — cyan, teal, indigo, purple and
// primary blue — keyed per icon so the library never reads as one-note cyan.
// `InfraIcon` renders the tile itself: the rounded square is the icon, so it
// is impossible to drop one of these into a circular container by accident.
//
//   cards · lending · money-movement · fraud · risk · 3d-secure
//   settlement · reconciliation · design · migration · ai

export type IconName =
  | "cards"
  | "lending"
  | "money-movement"
  | "fraud"
  | "risk"
  | "3d-secure"
  | "settlement"
  | "reconciliation"
  | "design"
  | "migration"
  | "ai";

/** The 11 icons, in library order. */
export const iconNames: IconName[] = [
  "cards",
  "lending",
  "money-movement",
  "fraud",
  "risk",
  "3d-secure",
  "settlement",
  "reconciliation",
  "design",
  "migration",
  "ai",
];

export const iconLabels: Record<IconName, string> = {
  cards: "Cards",
  lending: "Lending",
  "money-movement": "Money Movement",
  fraud: "Fraud",
  risk: "Risk",
  "3d-secure": "3D Secure",
  settlement: "Settlement",
  reconciliation: "Reconciliation",
  design: "Design",
  migration: "Migration",
  ai: "AI",
};

// [toneA, toneB] — the cool gradient the glyph stroke and tile glow resolve
// to. Distributed across the palette: cyan highlights, indigo/purple bridges,
// primary blue for infrastructure weight. No icon is mono-cyan.
const TONE: Record<IconName, [string, string]> = {
  cards: [visual.cyan, visual.indigo],
  lending: [visual.indigo, visual.primary],
  "money-movement": [visual.primary, visual.cyan],
  fraud: [visual.purple, visual.indigo],
  risk: [visual.indigo, visual.purple],
  "3d-secure": [visual.cyan, visual.teal],
  settlement: [visual.primary, visual.indigo],
  reconciliation: [visual.teal, visual.cyan],
  design: [visual.purple, visual.cyan],
  migration: [visual.indigo, visual.cyan],
  ai: [visual.cyan, visual.purple],
};

// Geometry only — stroke, fill and gradient are applied by the <svg> wrapper.
const PATHS: Record<IconName, ReactNode> = {
  cards: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.6" />
      <path d="M2.5 10.2 H21.5" />
      <rect x="5.8" y="13" width="5" height="2.8" rx="0.7" />
    </>
  ),
  lending: (
    <>
      <ellipse cx="12" cy="6.4" rx="6.8" ry="2.7" />
      <path d="M5.2 6.4 V12 C5.2 13.5 8.2 14.7 12 14.7 C15.8 14.7 18.8 13.5 18.8 12 V6.4" />
      <path d="M5.2 12 V17.6 C5.2 19.1 8.2 20.3 12 20.3 C15.8 20.3 18.8 19.1 18.8 17.6 V12" />
    </>
  ),
  "money-movement": (
    <>
      <rect x="2.6" y="3.6" width="6.8" height="6.8" rx="1.7" />
      <rect x="14.6" y="13.6" width="6.8" height="6.8" rx="1.7" />
      <path d="M12 7 H20.5 M17.8 4.8 L20.5 7 L17.8 9.2" />
      <path d="M12 17 H3.5 M6.2 14.8 L3.5 17 L6.2 19.2" />
    </>
  ),
  fraud: (
    <>
      <path d="M12 2.8 L20 5.8 V11.4 C20 16.4 16.6 19.6 12 21.2 C7.4 19.6 4 16.4 4 11.4 V5.8 Z" />
      <path d="M12 8.4 V12.8" />
      <path d="M12 15.8 H12.01" />
    </>
  ),
  risk: (
    <>
      <path d="M3.4 16.8 A8.6 8.6 0 0 1 20.6 16.8" />
      <path d="M12 16.8 L16.4 11.4" />
      <circle cx="12" cy="16.8" r="1.5" />
    </>
  ),
  "3d-secure": (
    <>
      <rect x="4.4" y="10.3" width="15.2" height="10.3" rx="2.6" />
      <path d="M7.8 10.3 V7.6 A4.2 4.2 0 0 1 16.2 7.6 V10.3" />
      <path d="M9.6 15.4 L11.3 17.1 L14.6 13.8" />
    </>
  ),
  settlement: (
    <>
      <path d="M12 3.4 V13.6" />
      <path d="M7.4 9 L12 13.6 L16.6 9" />
      <path d="M4.4 19.4 H19.6" />
    </>
  ),
  reconciliation: (
    <>
      <path d="M3 8.6 H15.5 M12.8 6 L15.5 8.6 L12.8 11.2" />
      <path d="M21 15.4 H8.5 M11.2 12.8 L8.5 15.4 L11.2 18" />
    </>
  ),
  design: (
    <>
      <path d="M4 20 L6 14 L16 4 L20 8 L10 18 Z" />
      <path d="M6 14 L10 18" />
      <path d="M13.8 6.2 L17.8 10.2" />
    </>
  ),
  migration: (
    <>
      <rect x="2.6" y="8" width="6.6" height="8" rx="1.7" />
      <rect x="14.8" y="8" width="6.6" height="8" rx="1.7" />
      <path d="M9.8 12 H14.6 M12.2 9.4 L14.8 12 L12.2 14.6" />
    </>
  ),
  ai: (
    <>
      <path d="M11 3.5 C11.5 7.8 12.7 9 17 9.5 C12.7 10 11.5 11.2 11 15.5 C10.5 11.2 9.3 10 5 9.5 C9.3 9 10.5 7.8 11 3.5 Z" />
      <path d="M17.5 14 C17.7 15.9 18.1 16.3 20 16.5 C18.1 16.7 17.7 17.1 17.5 19 C17.3 17.1 16.9 16.7 15 16.5 C16.9 16.3 17.3 15.9 17.5 14 Z" />
    </>
  ),
};

const SIZES = {
  sm: { tile: 40, radius: 11, glyph: 20 },
  md: { tile: 48, radius: 13, glyph: 24 },
  lg: { tile: 60, radius: 15, glyph: 30 },
} as const;

export function InfraIcon({
  name,
  size = "md",
  className,
}: {
  name: IconName;
  /** Tile size — sm 40px · md 48px · lg 60px. The radius scales with it. */
  size?: keyof typeof SIZES;
  /** Applied to the rounded-square tile. */
  className?: string;
}) {
  const [a, b] = TONE[name];
  const s = SIZES[size];
  const gradientId = `infra-grad-${name}`;

  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center bg-white ring-1 ring-inset ring-black/[0.06]",
        "shadow-[0_3px_12px_-6px_rgba(14,26,51,0.28)]",
        "dark:bg-[#0b1426] dark:ring-white/[0.09] dark:shadow-none",
        className,
      )}
      style={{
        width: s.tile,
        height: s.tile,
        borderRadius: s.radius,
        // The atmospheric fill: a tonal glow keyed to the icon's gradient.
        backgroundImage: `radial-gradient(135% 120% at 22% 14%, ${withAlpha(
          b,
          0.3,
        )}, transparent 60%), radial-gradient(120% 130% at 84% 90%, ${withAlpha(
          a,
          0.2,
        )}, transparent 62%), linear-gradient(150deg, ${withAlpha(
          a,
          0.16,
        )}, ${withAlpha(b, 0.05)})`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={s.glyph}
        height={s.glyph}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 1px 5px ${withAlpha(b, 0.5)})` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        {PATHS[name]}
      </svg>
    </span>
  );
}
