import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── TonalCardBed (v4 — owner-locked 2026-05-26) ────────────────────────────
//
// Replaces v3 ProductUISurface. The owner rejected the prior chrome system
// (cyan top hairline + corner crosshairs + LIVE marker + nCore · label) on
// every card because every cell read as a Linear / Notion admin panel.
//
// The new bed is the opposite — a soft tonal field, padding, nothing else.
// No edge, no marker, no crosshair, no mono caption inside the visual. Each
// of the six product cells defines its own iconic visual ON this bed; the
// only thing the bed contributes is the tonal mood that varies per card.
//
// `tone` is the per-card mood (design-system.md §8.8 v4). The palette stays
// cool (§3 — no warm tones); the variation lives in *which* cool hue tints
// the bed and at what depth. Six soft pale beds — never two adjacent the
// same in the bento grid.

export type TonalBedTone =
  | "slate"      // soft pale slate — neutral, the "warm grey" stand-in
  | "porcelain"  // near-white with a faint cyan wash
  | "cyan"       // soft pale cyan — water-light
  | "indigo"     // soft pale indigo — depth
  | "violet"     // soft pale violet — chip / gradient anchor only
  | "mist";      // pale grey-blue — atmospheric

// Background recipes per tone. Two-stop radial gradients with very low alpha
// so the bed reads as a tinted surface, never a coloured panel. Light mode
// only here — dark variants are layered via the `dark:` prefix below.
const BED_LIGHT: Record<TonalBedTone, string> = {
  slate:
    "radial-gradient(120% 100% at 0% 0%, rgba(91,109,216,0.045), transparent 60%)," +
    "radial-gradient(110% 100% at 100% 100%, rgba(48,77,187,0.04), transparent 65%)," +
    "linear-gradient(#F7F8FC, #F2F4FA)",
  porcelain:
    "radial-gradient(120% 100% at 50% 0%, rgba(34,211,238,0.06), transparent 65%)," +
    "linear-gradient(#FCFDFF, #F6F8FE)",
  cyan:
    "radial-gradient(120% 100% at 50% 100%, rgba(34,211,238,0.12), transparent 60%)," +
    "radial-gradient(100% 80% at 0% 0%, rgba(34,211,238,0.05), transparent 70%)," +
    "linear-gradient(#F1FBFE, #EAF7FC)",
  indigo:
    "radial-gradient(120% 100% at 100% 0%, rgba(91,109,216,0.10), transparent 60%)," +
    "radial-gradient(110% 100% at 0% 100%, rgba(48,77,187,0.06), transparent 70%)," +
    "linear-gradient(#F1F3FB, #ECEFF9)",
  violet:
    "radial-gradient(120% 100% at 100% 100%, rgba(109,40,217,0.07), transparent 65%)," +
    "radial-gradient(100% 80% at 0% 0%, rgba(91,79,217,0.05), transparent 70%)," +
    "linear-gradient(#F5F2FB, #F0EDF8)",
  mist:
    "radial-gradient(120% 100% at 0% 0%, rgba(91,109,216,0.05), transparent 60%)," +
    "radial-gradient(110% 100% at 100% 100%, rgba(34,211,238,0.04), transparent 65%)," +
    "linear-gradient(#F5F6FA, #EFF1F7)",
};

// Dark mode — every bed flattens onto navy with a faint per-tone tint.
const BED_DARK: Record<TonalBedTone, string> = {
  slate:
    "radial-gradient(120% 100% at 0% 0%, rgba(91,109,216,0.12), transparent 60%)," +
    "linear-gradient(#101A33, #0E1A33)",
  porcelain:
    "radial-gradient(120% 100% at 50% 0%, rgba(34,211,238,0.10), transparent 65%)," +
    "linear-gradient(#0F1B36, #0E1A33)",
  cyan:
    "radial-gradient(120% 100% at 50% 100%, rgba(34,211,238,0.16), transparent 60%)," +
    "linear-gradient(#0F1E3A, #0E1A33)",
  indigo:
    "radial-gradient(120% 100% at 100% 0%, rgba(91,109,216,0.18), transparent 60%)," +
    "linear-gradient(#101B36, #0E1A33)",
  violet:
    "radial-gradient(120% 100% at 100% 100%, rgba(109,40,217,0.14), transparent 65%)," +
    "linear-gradient(#101933, #0E1A33)",
  mist:
    "radial-gradient(120% 100% at 0% 0%, rgba(91,109,216,0.10), transparent 60%)," +
    "linear-gradient(#0F1B36, #0E1A33)",
};

export function TonalCardBed({
  tone = "slate",
  children,
  className,
}: {
  tone?: TonalBedTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full overflow-hidden rounded-xl",
        // No border by default — the bed is a field, not a panel.
        className,
      )}
    >
      {/* Light tonal bed. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{ background: BED_LIGHT[tone] }}
      />
      {/* Dark tonal bed. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ background: BED_DARK[tone] }}
      />
      <div className="relative z-10 flex h-full w-full">{children}</div>
    </div>
  );
}
