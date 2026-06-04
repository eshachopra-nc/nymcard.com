import type { ReactNode } from "react";
import { Layers, User, ShieldCheck, Zap, Server } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

// ── Retail Banking §5 — Why retail banks choose NymCard ─────────────────────
//
// Five reasons as a clean, on-system editorial feature grid — icon + title +
// description per reason, read as a group of statements on the section surface
// (the OutcomeChips philosophy, §8.19), never five floating glass cards on a
// flat bed. No eyebrow — the headline leads (CLAUDE.md v1.5). Static, so a
// server component; the scroll reveal comes from Section/SectionReveal.
//
// Copy mirrored verbatim from 02-copy/Industry Retail Banking-Copy.md §"Why
// Retail Banks Choose NymCard" (US-English; "Integrate, Don't Replace", etc.).

const COPY = {
  headline: "Built for modern retail banking.",
} as const;

type Reason = {
  title: string;
  description: string;
  icon: ReactNode;
};

const REASONS: Reason[] = [
  {
    title: "Integrate, don't replace",
    description:
      "Connect to your existing core banking infrastructure without disrupting what already works.",
    icon: <Layers />,
  },
  {
    title: "One customer record",
    description:
      "Cards, payments, wallets, and lending operate on the same customer view.",
    icon: <User />,
  },
  {
    title: "Unified risk intelligence",
    description:
      "Build richer customer profiles using transaction, payment, and lending activity from across the platform.",
    icon: <ShieldCheck />,
  },
  {
    title: "Real-time experiences",
    description:
      "Support instant payments, card controls, lending decisions, and customer interactions.",
    icon: <Zap />,
  },
  {
    title: "Deploy your way",
    description:
      "Cloud, on-soil, and on-premise deployment models available on the same platform.",
    icon: <Server />,
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="white" ariaLabel="Why retail banks choose NymCard">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Editorial feature grid — items read as a group on the section
          surface, divided by a hairline top border. */}
      <ul
        className={cn(
          "grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
          "border-t border-surface-border-subtle pt-12 dark:border-surface-dark-border",
        )}
      >
        {REASONS.map((reason) => (
          <li key={reason.title} className="flex flex-col">
            <span
              aria-hidden="true"
              className={cn(
                "mb-4 inline-flex size-10 items-center justify-center rounded-xl",
                "bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20",
                "dark:bg-accent-cyan/[0.12]",
                "[&_svg]:size-[20px]",
              )}
            >
              {reason.icon}
            </span>
            <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
              {reason.title}
            </h3>
            <p className="mt-2 max-w-[40ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {reason.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
