// NymCard design-token VALUES, mirrored for the isolated Remotion project.
//
// Remotion renders as a separate Node/React project (no access to the Next app's
// lib/tokens.ts / Tailwind). Per 06-build/CLAUDE.md and the §3 video brief, the
// token *values* are copied here verbatim from 01-design-system/tokens.json
// (v1.3.0) so the composition stays on-system: navy/cyan-led, deep cool, no raw
// off-palette colour. If a token changes upstream, update it here too.

export const color = {
  brand: {
    primary: "#304DBB",
    primaryHover: "#2840A0",
    purple: "#5B4FD9",
    navy: "#0E1A33",
    navySoft: "#1A2547",
  },
  accent: {
    teal: "#0EA5E9",
    cyan: "#22D3EE",
    indigo: "#5B6DD8",
    violet: "#6D28D9",
  },
  text: {
    onBrand: "#FFFFFF",
    darkSecondary: "rgba(255, 255, 255, 0.7)",
    darkMuted: "rgba(255, 255, 255, 0.5)",
  },
  surfaceDark: {
    base: "#0E1A33",
    elevated: "#1A2547",
    glass: "rgba(26, 37, 71, 0.6)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStronger: "rgba(255, 255, 255, 0.16)",
  },
} as const;

// rgba helper for inline use (Remotion forbids CSS animation but inline rgba is fine).
export const rgba = (hex: string, a: number): string => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// Easing curves, as cubic-bezier tuples (from tokens.motion.easing).
export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // premium UI curve
  inOut: [0.65, 0, 0.35, 1] as const,
  cinematic: [0.22, 1, 0.36, 1] as const,
} as const;

export const FONT_FAMILY =
  '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
export const FONT_MONO =
  '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace';
