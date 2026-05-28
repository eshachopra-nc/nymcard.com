import { cn } from "@/lib/utils";
import { TopologyTraces } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── Dense Capability Card ──────────────────────────────────────────────────
//
// The enterprise capability surface — API capabilities, compliance modules,
// platform features. A denser information structure than a product card: a
// metadata header, then capabilities organised into labelled groups across a
// structural hairline grid, over a subtle topology undercurrent. Operational,
// compositional, enterprise-grade.

type CapabilityGroup = {
  label: string;
  items: string[];
};

type DenseCapabilityCardProps = {
  eyebrow: string;
  title: string;
  /** Small metadata chips — version, protocol, scope. Never live data. */
  meta: string[];
  groups: CapabilityGroup[];
  className?: string;
};

export function DenseCapabilityCard({
  eyebrow,
  title,
  meta,
  groups,
  className,
}: DenseCapabilityCardProps) {
  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Subtle topology influence — held at the edge of perception. */}
      <TopologyTraces density="sparse" tone="cyan" />

      <div className="relative z-10 p-7 sm:p-8">
        {/* Metadata header. */}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h4 className="mt-3 font-display text-lg font-bold tracking-tight text-text-primary dark:text-text-on-brand">
          {title}
        </h4>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.map((chip) => (
            <span
              key={chip}
              className="rounded-md border border-surface-border-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted dark:border-surface-dark-border dark:text-text-dark-secondary"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Capability groups — a structural hairline grid. */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.label}
              className="bg-surface-white p-5 dark:bg-surface-dark-elevated"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-primary dark:text-accent-cyan">
                {group.label}
              </div>
              <ul className="mt-3 space-y-2">
                {group.items.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-baseline gap-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-cyan/70" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
