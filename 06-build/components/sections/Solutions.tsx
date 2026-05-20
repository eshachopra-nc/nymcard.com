"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "./Section";
import { KineticRibbon } from "../visuals/KineticRibbon";

// Solutions — four use-case cards. Clean editorial layout: a brand-gradient
// icon chip top-left, a square arrow top-right, headline + description below.
// Each card carries its own soft cool-palette gradient (DS §8.5). No UI
// mockups here — the product UIs live in the Products section.

function BankingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path d="M3 9.5 12 4l9 5.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20.5h17" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path d="M12 3 21 8l-9 5-9-5 9-5Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmbeddedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="12" height="12" rx="2.5" stroke="#FFFFFF" strokeWidth="1.6" />
      <rect x="9" y="9" width="12" height="12" rx="2.5" fill="#FFFFFF" fillOpacity="0.18" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

function InstalmentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M9 6v12M15 6v12" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

type Solution = {
  id: string;
  name: string;
  description: string;
  Icon: () => React.JSX.Element;
  gradient: string;
};

const DARK = "dark:from-surface-dark-elevated dark:via-surface-dark-elevated dark:to-surface-dark-elevated";

const SOLUTIONS: Solution[] = [
  {
    id: "commercial-banking",
    name: "Commercial Banking",
    description:
      "A white-label commercial payments platform for SMEs and corporates, delivered with Visa.",
    Icon: BankingIcon,
    gradient: `bg-gradient-to-br from-brand-primary/[0.07] via-surface-white to-accent-cyan/[0.05] ${DARK}`,
  },
  {
    id: "banking-as-a-service",
    name: "Banking as a Service",
    description:
      "Run your brand on the NymCard regulatory core, with a complete banking stack on a single programmable platform.",
    Icon: LayersIcon,
    gradient: `bg-gradient-to-bl from-accent-indigo/[0.07] via-surface-white to-brand-purple/[0.05] ${DARK}`,
  },
  {
    id: "embedded-finance",
    name: "Embedded Finance",
    description:
      "Add cards, payments, and credit to the platform your customers already use.",
    Icon: EmbeddedIcon,
    gradient: `bg-gradient-to-tr from-accent-cyan/[0.07] via-surface-white to-brand-primary/[0.05] ${DARK}`,
  },
  {
    id: "buy-now-pay-later",
    name: "Buy Now Pay Later",
    description:
      "Decisioning, origination, servicing, and collections, built into the checkout.",
    Icon: InstalmentIcon,
    gradient: `bg-gradient-to-tl from-brand-purple/[0.07] via-surface-white to-accent-indigo/[0.05] ${DARK}`,
  },
];

export function Solutions() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="soft"
      ariaLabel="Solutions"
      className="dark:bg-surface-dark-base"
      backgrounds={<KineticRibbon intensity="ambient" />}
    >
      <div className="max-w-[720px]">
        <span className="inline-flex items-center rounded-pill bg-brand-primary/[0.08] px-3 py-1 font-body text-sm font-medium text-brand-primary dark:bg-accent-cyan/[0.12] dark:text-accent-cyan">
          Solutions
        </span>
        <h2 className="mt-4 font-display font-bold text-text-primary leading-[1.1] tracking-tight text-[28px] sm:text-[32px] lg:text-[40px] dark:text-text-on-brand">
          Built for the scale of modern finance.
        </h2>
      </div>

      <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
        {SOLUTIONS.map((sol, i) => (
          <motion.a
            key={sol.id}
            href={`#${sol.id}`}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduced
                ? undefined
                : { duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }
            }
            whileHover={reduced ? undefined : { y: -6 }}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl border p-8 transition-shadow duration-300",
              sol.gradient,
              "border-surface-border-subtle shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)]",
              "hover:shadow-[0_18px_44px_-10px_rgba(14,26,51,0.16),0_6px_16px_-4px_rgba(14,26,51,0.08)]",
              "dark:border-surface-dark-border dark:hover:border-surface-dark-border-stronger",
            )}
          >
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-md bg-gradient-to-br from-brand-primary to-brand-purple shadow-[0_6px_16px_-4px_rgba(48,77,187,0.45)]">
                <sol.Icon />
              </span>
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white group-active:bg-brand-primary group-active:text-white dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:group-hover:bg-accent-cyan dark:group-hover:text-brand-navy dark:group-active:bg-accent-cyan dark:group-active:text-brand-navy">
                <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
            <h3 className="mt-7 font-display font-semibold text-text-primary text-xl leading-snug dark:text-text-on-brand">
              {sol.name}
            </h3>
            <p className="mt-2.5 font-body text-[15px] leading-relaxed text-text-secondary max-w-[440px] dark:text-text-dark-secondary">
              {sol.description}
            </p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
