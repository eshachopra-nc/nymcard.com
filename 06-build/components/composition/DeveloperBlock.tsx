import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./atoms";

// ── Developer block (design-system.md §8.22) ───────────────────────────────
//
// The slim, mid-page developer call — heading + one-sentence body +
// tertiary "Read the docs →" link. Smaller and less prominent than
// `CTASection` (§8.14), which is the closing CTA. Sits between Platform
// (§8.21) and the product cross-sells (§8.16) on every industry page.
//
// Rules: slim vertical padding — never competes with the hero or the
// final CTA; left-aligned (the page rhythm at this position is asymmetric
// editorial — a centred block here would read as a second closing CTA);
// tertiary link only, never a primary button. Three surface variants —
// `white`, `soft`, `dark` — so it sits cleanly in any place in the page's
// light/dark rhythm. Static → server component.

type DeveloperBlockProps = {
  /** Optional eyebrow above the headline. */
  eyebrow?: string;
  /** Headline — sentence case. `h3` scale. */
  headline: string;
  /** Body — one sentence. */
  body: string;
  /** Tertiary link — typically "Read the docs →". */
  link: { label: string; href: string };
  /** `white` (default), `soft` for rhythm, or `dark` for a technical close. */
  background?: "white" | "soft" | "dark";
  className?: string;
};

const BG: Record<NonNullable<DeveloperBlockProps["background"]>, string> = {
  // Light surfaces collapse onto the dark base in dark mode — the section's
  // inner text already carries dark: variants. Without this, `white`/`soft`
  // rendered a jarring full-width white band in dark mode.
  white: "bg-surface-white dark:bg-surface-dark-base",
  soft: "bg-surface-soft dark:bg-surface-dark-base",
  dark: "dark bg-surface-dark-base",
};

export function DeveloperBlock({
  eyebrow,
  headline,
  body,
  link,
  background = "white",
  className,
}: DeveloperBlockProps) {
  return (
    <section className={cn("relative", BG[background], className)}>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-[72px] sm:px-6 lg:px-20">
        <div className="flex max-w-2xl flex-col">
          {eyebrow && (
            <span className="mb-3">
              <Eyebrow>{eyebrow}</Eyebrow>
            </span>
          )}
          <h3 className="font-display text-2xl font-bold leading-[1.16] tracking-tight text-text-primary dark:text-text-on-brand sm:text-[1.75rem]">
            {headline}
          </h3>
          <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {body}
          </p>
          <a
            href={link.href}
            {...(/^https?:\/\//i.test(link.href)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group mt-5 inline-flex items-center gap-0.5 font-body text-[15px] font-medium text-brand-primary outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:text-accent-cyan"
          >
            {link.label}
            <ChevronRight
              aria-hidden="true"
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
