"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── FAQ (design-system.md §8.15) ───────────────────────────────────────────
//
// A question-and-answer accordion, marked up for answer engines. Divider-
// based — rows separated by a `surface-border-subtle` divider, never a grid
// of cards. Single column, centred, constrained measure.
//
// Rules: all rows closed by default; questions phrased as a user would ask
// them; `FAQPage` JSON-LD is mandatory — every FAQ emits schema.org/FAQPage
// structured data so the answers are citable by answer engines (AEO).
//
// Motion: expand / collapse on the `base` functional timing (§9.2); paused
// under prefers-reduced-motion. Interactive → client component.

export type FAQItem = {
  /** The question — phrased as a user would ask it. */
  question: string;
  /** The answer — plain text. */
  answer: string;
};

type FAQProps = {
  /** Optional eyebrow above the headline. */
  eyebrow?: string;
  /** Headline — `h2`. */
  headline: string;
  items: FAQItem[];
  /**
   * `single` — opening a row closes the others; `multi` — rows open
   * independently. Both are acceptable (§8.15); `single` is the default.
   */
  mode?: "single" | "multi";
  /** `surface-white` (default) or `surface-soft`. */
  background?: "white" | "soft";
  className?: string;
};

export function FAQ({
  eyebrow,
  headline,
  items,
  mode = "single",
  background = "white",
  className,
}: FAQProps) {
  const reduced = useReducedMotion();
  const baseId = useId();
  // Indices of the currently-open rows. Default: all closed.
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (mode === "single") return isOpen ? [] : [i];
      return isOpen ? prev.filter((n) => n !== i) : [...prev, i];
    });
  };

  // schema.org/FAQPage structured data — mandatory (§8.15). This is what makes
  // the answers citable by answer engines.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className={cn(
        "relative",
        background === "soft"
          ? "bg-surface-soft dark:bg-surface-dark-base"
          : "bg-surface-white dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* Mandatory FAQPage JSON-LD for answer-engine citation (AEO). */}
      <script
        type="application/ld+json"
        // The payload is a static object built above — safe to serialise.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-[720px] px-4 py-[96px] sm:px-6">
        {eyebrow && (
          <span className="mb-4 block">
            <Eyebrow>{eyebrow}</Eyebrow>
          </span>
        )}
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>

        {/* Rows with dividers — not cards. */}
        <div className="mt-10 border-t border-surface-border-subtle dark:border-surface-dark-border">
          {items.map((item, i) => {
            const isOpen = open.includes(i);
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div
                key={item.question}
                className="border-b border-surface-border-subtle dark:border-surface-dark-border"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-6 py-5 text-left",
                      "outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:focus-visible:ring-accent-cyan/20",
                    )}
                  >
                    <span className="font-body text-base font-medium leading-snug text-text-primary sm:text-lg dark:text-text-on-brand">
                      {item.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 text-brand-primary transition-transform dark:text-accent-cyan",
                        isOpen && "rotate-45",
                      )}
                      style={{
                        transitionDuration: `${dur.base * 1000}ms`,
                      }}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={
                        reduced
                          ? undefined
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduced ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: dur.base, ease: ease.out }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
