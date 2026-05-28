import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── UI container ───────────────────────────────────────────────────────────
//
// The reusable infrastructure UI container — how a product UI sits inside the
// cinematic atmosphere: embedded, never pasted on. It holds an abstract UI
// placeholder (skeleton forms only — never a fake dashboard or chart). Three
// depths place it in the scene; an optional edge dissolve fades it into the
// surrounding atmosphere; environmental lighting — a cyan edge, faint cyan /
// indigo reflections — lets the atmosphere read across the surface. For
// dashboards, identity flows, fraud systems, operational controls, platform
// modules. Static → server component.

type Depth = "foreground" | "embedded" | "recessed";
type Dissolve = "none" | "left" | "right" | "bottom";

// Three depths — a crisp lifted surface, a translucent embedded one, and a
// recessed infrastructure surface pushed back behind the atmosphere.
const DEPTH: Record<Depth, { surface: string; shadow: string; extra: string }> = {
  foreground: {
    surface:
      "border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated",
    shadow:
      "shadow-[0_22px_48px_-20px_rgba(14,26,51,0.28)] dark:shadow-[0_24px_52px_-20px_rgba(0,0,0,0.6)]",
    extra: "",
  },
  embedded: {
    surface:
      "border-white/55 bg-white/70 backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.08] dark:bg-surface-dark-glass",
    shadow:
      "shadow-[0_14px_34px_-18px_rgba(14,26,51,0.18)] dark:shadow-[0_16px_38px_-18px_rgba(0,0,0,0.45)]",
    extra: "",
  },
  recessed: {
    surface:
      "border-surface-border-subtle/55 bg-surface-soft/50 backdrop-blur-md dark:border-white/[0.05] dark:bg-surface-dark-base/45",
    shadow: "",
    extra: "opacity-[0.62]",
  },
};

const DISSOLVE_MASK: Record<Dissolve, string | undefined> = {
  none: undefined,
  left: "linear-gradient(to left, #000 56%, transparent 99%)",
  right: "linear-gradient(to right, #000 56%, transparent 99%)",
  bottom: "linear-gradient(to bottom, #000 54%, transparent 99%)",
};

export function UIContainer({
  depth = "foreground",
  dissolve = "none",
  className,
}: {
  depth?: Depth;
  dissolve?: Dissolve;
  className?: string;
}) {
  const d = DEPTH[depth];
  const mask = DISSOLVE_MASK[dissolve];
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border",
        d.surface,
        // a hard float shadow fights an edge dissolve — drop it when dissolving
        dissolve === "none" && d.shadow,
        d.extra,
        className,
      )}
      style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
    >
      {/* Environmental lighting — a lit cyan edge and faint corner reflections
          so the atmosphere reads across the UI surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.5,
          )} 36%, transparent 86%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            `radial-gradient(68% 54% at 90% 3%, ${withAlpha(visual.cyan, 0.07)}, transparent 72%),` +
            `radial-gradient(78% 62% at 12% 103%, ${withAlpha(visual.indigo, 0.07)}, transparent 72%)`,
        }}
      />
      <UISkeleton />
    </div>
  );
}

// The abstract UI placeholder — skeleton forms only. A header, a divider, a
// few content rows, two blocks. Never a chart, never data, never a dashboard.
function UISkeleton() {
  return (
    <div className="relative z-10 p-5">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-accent-cyan/70" />
        <span className="size-2 rounded-full bg-text-primary/15 dark:bg-white/15" />
        <span className="ml-1 h-2 w-20 rounded-full bg-text-primary/15 dark:bg-white/15" />
      </div>
      <div className="mt-4 h-px w-full bg-surface-border-subtle dark:bg-surface-dark-border" />
      <div className="mt-4 space-y-2.5">
        <span className="block h-2.5 w-full rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
        <span className="block h-2.5 w-4/5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
        <span className="block h-2.5 w-3/5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-16 rounded-lg border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
        <div className="h-16 rounded-lg border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
      </div>
    </div>
  );
}
