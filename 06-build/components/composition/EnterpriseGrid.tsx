import { cn } from "@/lib/utils";
import {
  InfraIcon,
  type IconName,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── Dense Enterprise Grid ──────────────────────────────────────────────────
//
// The dense module grid for capabilities, compliance, platform modules and
// API ecosystems. Systematic and operational: a tight structural grid of
// abstract module cells with collapsed hairline borders, a restrained
// atmospheric pressure beneath, and a subtle cyan hover light per cell. Dense
// but breathable — enterprise infrastructure, not a playful consumer card
// wall. Hover lighting is pure CSS, so this stays a server component.

type Module = { title: string; detail: string; icon: IconName };

type EnterpriseGridProps = {
  eyebrow: string;
  headline: string;
  modules: Module[];
  className?: string;
};

export function EnterpriseGrid({
  eyebrow,
  headline,
  modules,
  className,
}: EnterpriseGridProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Restrained atmospheric pressure — held low, behind the grid. */}
      <KineticRibbon intensity="calm" focus="bottom-right" />

      <div className="relative z-10 p-8 sm:p-10 lg:p-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-4 max-w-md font-display text-xl font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {headline}
        </h3>

        {/* Structural grid — collapsed hairline borders between cells. */}
        <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-xl border border-surface-border-subtle dark:border-surface-dark-border lg:grid-cols-4">
          {modules.map((module) => (
            <ModuleCell key={module.title} module={module} />
          ))}
        </div>
      </div>
    </section>
  );
}

// A single abstract module cell — icon, title, one line of detail, and a
// cyan hover light that lifts on pointer entry. No data, no chart.
function ModuleCell({ module }: { module: Module }) {
  return (
    <div className="group relative -ml-px -mt-px border-l border-t border-surface-border-subtle p-5 dark:border-surface-dark-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(72% 62% at 50% 0%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 74%)`,
        }}
      />
      <div className="relative">
        <InfraIcon name={module.icon} size="sm" />
        <div className="mt-3 font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
          {module.title}
        </div>
        <div className="mt-1.5 font-body text-xs leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {module.detail}
        </div>
      </div>
    </div>
  );
}
