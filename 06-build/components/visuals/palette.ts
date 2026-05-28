// Visual-engine colour helpers.
//
// Every colour the visual engine renders resolves from the generated design
// tokens (lib/tokens.ts → design-system.md §3). The atmospheric primitives
// need rgba() strings with alpha for gradients — tokens store opaque hex — so
// `withAlpha` is the single bridge. Never hand-pick a hex in a visual
// component; pull it from `visual` and apply alpha here.

import { tokens } from "@/lib/tokens";

/** Convert a #RRGGBB token value into an rgba() string at the given alpha. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * The cool-only palette the visual engine draws from (design-system.md §3 —
 * "the palette is cool only"). Blue-dominant: cyan is the highlight, indigo
 * bridges to purple, primary/navy carry the infrastructure weight. No warm
 * tones exist here by construction.
 */
export const visual = {
  cyan: tokens.color.accent.cyan, // #22D3EE — scan / highlight
  teal: tokens.color.accent.teal, // #0EA5E9 — technical accent
  indigo: tokens.color.accent.indigo, // #5B6DD8 — gradient bridge
  violet: tokens.color.accent.violet, // #6D28D9 — deep gradient anchor; chip / glow only, never a CTA
  purple: tokens.color.brand.purple, // #5B4FD9 — gradient mid
  primary: tokens.color.brand.primary, // #304DBB — infrastructure blue
  navy: tokens.color.brand.navy, // #0E1A33 — depth / shadow
  white: tokens.color.surface.white, // #FFFFFF — soft glow
} as const;

/** Tones a consumer can pick for glow / trace primitives. Cyan is the default. */
export type VisualTone = "cyan" | "indigo" | "violet" | "purple" | "primary";

export const toneHex: Record<VisualTone, string> = {
  cyan: visual.cyan,
  indigo: visual.indigo,
  violet: visual.violet,
  purple: visual.purple,
  primary: visual.primary,
};
