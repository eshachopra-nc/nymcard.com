import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { KineticRibbon, visual, withAlpha } from "@/components/visuals";
import { AbstractMark, Eyebrow } from "./atoms";

// ── Split Editorial Layout ─────────────────────────────────────────────────
//
// The core text / visual section layout — and, at hero scale, the product
// hero composition itself. One primitive, multiple scales: there is no
// separate "product hero card". About RHYTHM: a content-width-disciplined
// text column, a measured vertical pace (eyebrow → headline → body → an
// itemised rule list → optional CTA), and a visual column with atmosphere
// positioned inside. An optional chip row closes the card.
//
//   standard — an even 50 / 50 split at section scale
//   hero     — a larger 6 / 6 split with hero-scale typography and generous
//              editorial spacing, for product hero sections

type SplitScale = "standard" | "hero";

// One primitive, two scales — `standard` is unchanged from the approved
// layout; `hero` enlarges the type and opens the larger split.
const SCALE: Record<
  SplitScale,
  {
    pad: string;
    gap: string;
    grid: string;
    textCol: string;
    visualCol: string;
    headline: string;
    visualMinH: string;
    markSize: string;
  }
> = {
  standard: {
    pad: "p-8 sm:p-10 lg:p-14",
    gap: "gap-10 lg:gap-16",
    grid: "lg:grid-cols-2",
    textCol: "",
    visualCol: "",
    headline: "text-2xl lg:text-[2rem]",
    visualMinH: "min-h-72",
    markSize: "size-36",
  },
  hero: {
    pad: "p-9 sm:p-12 lg:p-16",
    gap: "gap-12 lg:gap-16",
    grid: "lg:grid-cols-12",
    textCol: "lg:col-span-6",
    visualCol: "lg:col-span-6",
    headline: "text-4xl leading-[1.08] lg:text-[3.4rem]",
    visualMinH: "min-h-80 lg:min-h-[26rem]",
    markSize: "size-44",
  },
};

type SplitEditorialProps = {
  eyebrow: string;
  /** Force the eyebrow to uppercase. False keeps brand casing (e.g. "nCore"). */
  eyebrowCaps?: boolean;
  headline: string;
  body: string;
  /** The itemised rule list — short editorial lines, three is the rhythm. */
  items: string[];
  /** Optional CTA rendered under the rule list. */
  cta?: { label: string; href: string };
  /** Optional chips — rendered centred at the foot of the card. */
  chips?: string[];
  /** A custom visual for the visual column — replaces the default mark. */
  visual?: ReactNode;
  /** `standard` section split, or `hero` for the larger scale. */
  scale?: SplitScale;
  className?: string;
};

export function SplitEditorial({
  eyebrow,
  eyebrowCaps = true,
  headline,
  body,
  items,
  cta,
  chips,
  visual: visualSlot,
  scale = "standard",
  className,
}: SplitEditorialProps) {
  const s = SCALE[scale];
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      <div className={s.pad}>
        <div className={cn("grid", s.gap, s.grid)}>
          {/* Text column — content-width discipline, measured vertical pace. */}
          <div className={cn("flex flex-col", s.textCol)}>
            <Eyebrow caps={eyebrowCaps}>{eyebrow}</Eyebrow>
            <h3
              className={cn(
                "mt-5 max-w-lg font-display font-bold leading-[1.14] tracking-tight text-text-primary dark:text-text-on-brand",
                s.headline,
              )}
            >
              {headline}
            </h3>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {body}
            </p>
            <ul className="mt-9">
              {items.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-3 py-3.5",
                    i > 0 &&
                      "border-t border-surface-border-subtle dark:border-surface-dark-border",
                  )}
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-accent-cyan"
                  />
                  <span className="whitespace-nowrap font-body text-[13px] leading-relaxed text-text-primary dark:text-text-on-brand">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {cta && (
              <a
                href={cta.href}
                className="group mt-9 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
              >
                {cta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            )}
          </div>

          {/* Visual column — atmosphere positioned here, aligned to the block. */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-soft/55 dark:border-surface-dark-border dark:bg-surface-dark-base/55",
              s.visualCol,
              s.visualMinH,
            )}
          >
            <KineticRibbon intensity="calm" focus="bottom-right" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(72% 60% at 30% 16%, ${withAlpha(
                  visual.cyan,
                  0.08,
                )}, transparent 72%)`,
              }}
            />
            {visualSlot ? (
              // Fills the column and centres the custom visual — matches the
              // AbstractMark fallback so the column's vertical centre is the
              // same regardless of which visual sits in it.
              <div className="absolute inset-0 z-10 grid place-items-center p-6 sm:p-8">
                {visualSlot}
              </div>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <AbstractMark
                  className={cn(
                    s.markSize,
                    "text-brand-primary dark:text-accent-cyan",
                  )}
                />
              </div>
            )}
          </div>
        </div>

        {/* Chip row — centred at the foot of the card. */}
        {chips && chips.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:mt-14">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-pill border border-surface-border-subtle bg-surface-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-base dark:text-text-dark-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
