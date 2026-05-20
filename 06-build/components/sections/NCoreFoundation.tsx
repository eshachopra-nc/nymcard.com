"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, BadgeCheck, Globe, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Section } from "./Section";
import { useTheme } from "@/lib/theme-provider";

// nCore — the infrastructure-intelligence section. F-pattern asymmetric:
// copy left, the layered-infrastructure illustration right. The illustration
// is a self-contained isometric stack, so the section stays clean — no ribbon.

const CHIPS = [
  { label: "AI-Native", Icon: Sparkles },
  { label: "Cross-Border", Icon: Globe },
  { label: "Global Scale", Icon: TrendingUp },
  { label: "Secure by Design", Icon: ShieldCheck },
  { label: "Always On", Icon: Activity },
  { label: "Enterprise Grade", Icon: BadgeCheck },
] as const;

export function NCoreFoundation() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  return (
    <Section
      bg="white"
      ariaLabel="nCore — the infrastructure core"
      className="dark:bg-surface-dark-base"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left — copy */}
        <motion.div
          className="lg:col-span-5"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center rounded-pill bg-brand-primary/[0.08] px-3 py-1 font-body text-sm font-medium text-brand-primary dark:bg-accent-cyan/[0.12] dark:text-accent-cyan">
            nCore
          </span>
          <h2 className="mt-5 font-display font-bold leading-[1.1] tracking-tight text-text-primary text-[30px] sm:text-[36px] lg:text-[44px] dark:text-text-on-brand">
            The core that powers every NymCard product.
          </h2>
          <p className="mt-6 max-w-[460px] font-body text-base sm:text-lg leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            nCore is the intelligent infrastructure layer behind Cards, Lending,
            Cross-Border &amp; FX, Identity, Fraud, Risk, 3D Secure, Settlement,
            and Reconciliation.
          </p>
          <ul className="mt-7 flex max-w-[460px] flex-wrap gap-2.5">
            {CHIPS.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-pill border border-surface-border-subtle bg-white/60 px-2.5 py-1 font-body text-[12px] font-medium text-text-secondary dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-secondary"
              >
                <Icon
                  aria-hidden="true"
                  className="size-3.5 text-brand-primary dark:text-accent-cyan"
                />
                {label}
              </li>
            ))}
          </ul>
          <a
            href="#ncore"
            className="group mt-8 inline-flex items-center gap-2 font-body font-medium text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
          >
            Explore nCore
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Right — layered infrastructure illustration */}
        <motion.div
          className="lg:col-span-7"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduced ? undefined : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={theme === "dark" ? "/handoff/ncore-infra-dark.svg" : "/handoff/ncore-infra.svg"}
            alt="The nCore infrastructure stack — one nCore plane above nine labeled product layers, lit by a cyan glow along the right of the stack"
            className="mx-auto w-full max-w-[600px] lg:ml-auto lg:mr-0"
          />
        </motion.div>
      </div>
    </Section>
  );
}
