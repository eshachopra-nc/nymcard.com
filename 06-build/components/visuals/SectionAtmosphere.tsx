import { visual, withAlpha } from "./palette";

// ── SectionAtmosphere ───────────────────────────────────────────────────────
//
// A contained, restrained cool field for a full SECTION background — so content
// sections read dimensional and on-system (design-system.md §1/§8.1: the page
// is glassy/atmospheric, never a flat solid bed) without each one hand-rolling
// the radial recipe. Theme-aware: a faint pastel wash in light, a deeper cool
// pooling in dark. Always contained to the section (never a saturated full-page
// wash). Render as an absolute layer behind the content — e.g. via the `Section`
// component's `backgrounds` slot, or `absolute inset-0` in a bespoke section.
//
// `anchor` shifts where the pools sit so adjacent sections don't read identical:
//   "top"    — glow gathers top-left + top-right (default)
//   "bottom" — glow gathers along the lower edge
//   "split"  — top-left + bottom-right diagonal

type Anchor = "top" | "bottom" | "split";

const DARK: Record<Anchor, string> = {
  top:
    `radial-gradient(70% 45% at 10% 0%, ${withAlpha(visual.primary, 0.16)}, transparent 60%),` +
    `radial-gradient(60% 40% at 98% 6%, ${withAlpha(visual.cyan, 0.1)}, transparent 60%),` +
    `radial-gradient(85% 55% at 75% 112%, ${withAlpha(visual.indigo, 0.12)}, transparent 64%)`,
  bottom:
    `radial-gradient(80% 55% at 18% 108%, ${withAlpha(visual.primary, 0.16)}, transparent 62%),` +
    `radial-gradient(70% 50% at 92% 100%, ${withAlpha(visual.indigo, 0.12)}, transparent 62%),` +
    `radial-gradient(55% 40% at 60% -8%, ${withAlpha(visual.cyan, 0.08)}, transparent 60%)`,
  split:
    `radial-gradient(70% 50% at 6% 4%, ${withAlpha(visual.primary, 0.16)}, transparent 60%),` +
    `radial-gradient(75% 55% at 96% 104%, ${withAlpha(visual.indigo, 0.13)}, transparent 62%)`,
};

const LIGHT: Record<Anchor, string> = {
  top:
    `radial-gradient(62% 50% at 8% 0%, ${withAlpha(visual.primary, 0.12)}, transparent 60%),` +
    `radial-gradient(58% 48% at 99% 104%, ${withAlpha(visual.purple, 0.09)}, transparent 62%)`,
  bottom:
    `radial-gradient(72% 54% at 14% 106%, ${withAlpha(visual.primary, 0.12)}, transparent 62%),` +
    `radial-gradient(58% 46% at 94% 0%, ${withAlpha(visual.cyan, 0.08)}, transparent 60%)`,
  split:
    `radial-gradient(62% 52% at 5% 2%, ${withAlpha(visual.primary, 0.12)}, transparent 60%),` +
    `radial-gradient(64% 52% at 97% 104%, ${withAlpha(visual.purple, 0.09)}, transparent 62%)`,
};

export function SectionAtmosphere({ anchor = "top" }: { anchor?: Anchor }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <span className="absolute inset-0 dark:hidden" style={{ background: LIGHT[anchor] }} />
      <span className="absolute inset-0 hidden dark:block" style={{ background: DARK[anchor] }} />
    </div>
  );
}
