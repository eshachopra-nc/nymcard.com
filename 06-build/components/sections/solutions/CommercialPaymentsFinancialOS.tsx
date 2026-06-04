"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  ReceiptText,
  TrendingUp,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { visual, withAlpha, dur, ease } from "@/components/visuals";

// ── Commercial Payments §3 — The Financial OS (THE CENTERPIECE) ──────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §The
// Financial OS.
//
// This is the PAGE'S SPINE — an EDITORIAL FEATURE-SHOW, not a card grid. The
// headline + description run at the top, then the five capabilities — Spend ·
// Pay · Get Paid · Grow · Understand — each get their OWN full-width row that
// ALTERNATES side to side (text left / UI right, then text right / UI left, …).
// Each row pairs the capability name + verbatim description + a gradient icon
// chip with a GENEROUSLY-SIZED labelled UIPlaceholder (scale="wide") on the
// opposite side — the reserved room for that feature's product-UI, to be filled
// in a later pass. Generous vertical rhythm between rows; each row reveals on
// scroll-into-view (whileInView, once) and its placeholder lifts on hover.
//
// This is the page's editorial centerpiece — it is deliberately the one section
// that gets full-width rows and large UI room, so it reads differently from the
// §5 linked-institution grid and the §6 ConnectedStepper flow. No eyebrow — the
// headline leads. Light (white), on a contained SectionAtmosphere wash.

const COPY = {
  headline: "Everything businesses need. One experience.",
  description:
    "Commercial Payments combines business finance tools, payment infrastructure, and customer-facing experiences into a single platform that can be fully branded as your own.",
  capabilities: [
    {
      name: "Spend",
      body: "Issue prepaid and credit cards, manage expenses, automate approvals, and enforce spending policies across teams, departments, and programmes.",
      icon: CreditCard,
      placeholder:
        "Spend — issuing, expenses, approvals, and spend policy controls",
    },
    {
      name: "Pay",
      body: "Manage supplier payments, payroll, workforce disbursements, and business transfers from a single platform.",
      icon: ArrowLeftRight,
      placeholder:
        "Pay — supplier payments, payroll, and workforce disbursements",
    },
    {
      name: "Get Paid",
      body: "Create invoices, track receivables, monitor collections, and manage incoming payments with complete visibility into cash flow.",
      icon: ReceiptText,
      placeholder:
        "Get Paid — invoices, receivables, collections, and cash flow",
    },
    {
      name: "Grow",
      body: "Offer working capital, invoice financing, and business credit solutions that help businesses access capital when they need it.",
      icon: TrendingUp,
      placeholder:
        "Grow — working capital, invoice financing, and business credit",
    },
    {
      name: "Understand",
      body: "Access real-time insights into spending, payments, receivables, liabilities, cash flow, and business performance.",
      icon: BarChart3,
      placeholder:
        "Understand — real-time insights across spending, cash flow, and performance",
    },
  ] satisfies {
    name: string;
    body: string;
    icon: LucideIcon;
    placeholder: string;
  }[],
} as const;

export function CommercialPaymentsFinancialOS() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      {/* Top — headline + description, constrained measure. */}
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      {/* The editorial feature-show — five alternating rows, generous rhythm. */}
      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28 lg:space-y-32">
        {COPY.capabilities.map((capability, i) => (
          <FeatureRow
            key={capability.name}
            index={i}
            flipped={i % 2 === 1}
            {...capability}
          />
        ))}
      </div>
    </Section>
  );
}

function FeatureRow({
  name,
  body,
  icon: Icon,
  placeholder,
  index,
  flipped,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  placeholder: string;
  index: number;
  flipped: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Copy slides in from its own side, the UI from the opposite — the row reads
  // as two halves resolving into one feature. Reduced-motion: render at rest.
  const copyFrom = flipped ? 28 : -28;
  const uiFrom = flipped ? -28 : 28;

  const reveal = (from: number) => ({
    initial: reduced ? false : { opacity: 0, x: from },
    animate: reduced ? undefined : inView ? { opacity: 1, x: 0 } : undefined,
    transition: reduced
      ? undefined
      : { duration: dur.slow, ease: ease.out },
  });

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      {/* Copy column — order swaps per row so text alternates sides. */}
      <motion.div
        {...reveal(copyFrom)}
        className={`lg:col-span-5 ${
          flipped ? "lg:order-2 lg:col-start-8" : "lg:order-1"
        }`}
      >
        {/* Index + gradient icon chip — the site's product-icon language. */}
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-flex size-12 items-center justify-center rounded-md text-white shadow-[0_8px_22px_-8px_rgba(14,26,51,0.4)]"
            style={{
              background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
                visual.cyan,
                0.92,
              )})`,
            }}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            {String(index + 1).padStart(2, "0")} / 05
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand sm:text-[1.75rem]">
          {name}
        </h3>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {body}
        </p>
      </motion.div>

      {/* UI column — roomy reserved placeholder, opposite the copy. */}
      <motion.div
        {...reveal(uiFrom)}
        className={`group lg:col-span-7 ${
          flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-6"
        }`}
      >
        <div className="relative min-h-[24rem] sm:min-h-[28rem] lg:min-h-[30rem]">
          <UIPlaceholder
            label={placeholder}
            scale="wide"
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1 lg:absolute lg:inset-0"
          />
        </div>
      </motion.div>
    </div>
  );
}
