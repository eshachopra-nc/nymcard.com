import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── Floating Operational Panel ─────────────────────────────────────────────
//
// An elevated operational surface for infrastructure snippets, identity and
// fraud modules, real-time controls. Subtle glass (translucent, blurred,
// saturated), lifted off the page on a soft float shadow, lit directionally
// from one corner, with a localized atmospheric pressure pooling beneath it.
// Operational hierarchy, infrastructural calmness — never a consumer-app card.
//
// Place over imagery or atmosphere (like GlassPanel) — the glass needs a
// field behind it to read.

type PanelStatus = { label: string; state: string };

type FloatingOperationalPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  /** Abstract operational status rows — a label and a state word, not data. */
  status: PanelStatus[];
  className?: string;
};

export function FloatingOperationalPanel({
  eyebrow,
  title,
  body,
  status,
  className,
}: FloatingOperationalPanelProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Localized atmospheric pressure — atmosphere pooling beneath the panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5"
        style={{
          background: `radial-gradient(56% 60% at 64% 28%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 74%)`,
          filter: "blur(26px)",
        }}
      />
      {/* The elevated glass panel. */}
      <article className="relative isolate overflow-hidden rounded-2xl border border-white/60 bg-surface-white/80 shadow-[0_18px_44px_-16px_rgba(14,26,51,0.22)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.08] dark:bg-surface-dark-glass dark:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.6)]">
        {/* Directional environmental lighting — one soft corner light. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(56% 52% at 100% 0%, ${withAlpha(
              visual.cyan,
              0.12,
            )}, transparent 72%)`,
          }}
        />
        {/* Cyan edge hairline — the lit front face. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(
              visual.cyan,
              0.5,
            )} 36%, transparent 86%)`,
          }}
        />

        <div className="relative z-10 p-7 sm:p-8">
          {/* Operational header. */}
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h4 className="mt-4 font-display text-lg font-bold tracking-tight text-text-primary dark:text-text-on-brand">
            {title}
          </h4>
          <p className="mt-2 max-w-sm font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {body}
          </p>

          {/* Operational status rail — abstract: a label and a state. */}
          <div className="mt-6 divide-y divide-surface-border-subtle overflow-hidden rounded-lg border border-surface-border-subtle dark:divide-surface-dark-border dark:border-surface-dark-border">
            {status.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between bg-surface-soft/55 px-4 py-2.5 dark:bg-surface-dark-base/45"
              >
                <span className="font-body text-[13px] text-text-primary dark:text-text-on-brand">
                  {row.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-brand-primary dark:text-accent-cyan">
                  {row.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
