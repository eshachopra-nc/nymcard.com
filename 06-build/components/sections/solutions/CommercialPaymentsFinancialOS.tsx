"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  ReceiptText,
  Users,
  TrendingUp,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { visual, withAlpha, dur, ease } from "@/components/visuals";

// ── Commercial Payments §3 — The Financial OS for businesses (CENTERPIECE) ────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §The
// Financial OS For Businesses. Written from the institution's perspective —
// each capability is something the institution gives the businesses it serves.
//
// This is the PAGE'S SPINE — an EDITORIAL FEATURE-SHOW, not a card grid. The
// headline + description run at the top, then the six business workflows —
// Commercial Cards · Accounts Payable · Accounts Receivable · Payroll &
// Workforce Payments · Working Capital & Financing · Real-Time Insights — each
// get their OWN full-width row that ALTERNATES side to side (text left / UI
// right, then text right / UI left, …). Each row pairs the capability name +
// verbatim description + a gradient icon chip with a GENEROUSLY-SIZED labelled
// UIPlaceholder (scale="wide") on the opposite side — the reserved room for that
// feature's product-UI, to be filled in a later pass. Generous vertical rhythm
// between rows; each row reveals on scroll-into-view (whileInView, once) and its
// placeholder lifts on hover.
//
// This is the page's editorial centerpiece — deliberately the ONE section that
// gets full-width rows and large UI room, so it reads differently from the §4
// segment rail, §5 launch columns, and §6 reasons split. No eyebrow — the
// headline leads. Light (white), on a contained SectionAtmosphere wash.

const COPY = {
  headline: "One platform. Every business workflow.",
  description:
    "Give businesses a single place to manage spending, payments, collections, payroll, financing, and cash flow visibility.",
  capabilities: [
    {
      name: "Commercial Cards",
      body: "Issue virtual, physical, debit, prepaid, and credit card programmes for business spending.",
      icon: CreditCard,
      placeholder:
        "Commercial Cards — virtual, physical, debit, prepaid, and credit programmes",
    },
    {
      name: "Accounts Payable",
      body: "Help businesses manage supplier payments, approvals, and outgoing cash flows.",
      icon: ArrowLeftRight,
      placeholder:
        "Accounts Payable — supplier payments, approvals, and outgoing flows",
    },
    {
      name: "Accounts Receivable",
      body: "Enable invoicing, collections, payment acceptance, and cash flow visibility.",
      icon: ReceiptText,
      placeholder:
        "Accounts Receivable — invoicing, collections, and acceptance",
    },
    {
      name: "Payroll & Workforce Payments",
      body: "Support payroll, contractor payments, and workforce disbursements.",
      icon: Users,
      placeholder:
        "Payroll & Workforce Payments — payroll, contractors, and disbursements",
    },
    {
      name: "Working Capital & Financing",
      body: "Offer credit lines, invoice financing, and business lending solutions.",
      icon: TrendingUp,
      placeholder:
        "Working Capital & Financing — credit lines, invoice financing, and lending",
    },
    {
      name: "Real-Time Insights",
      body: "Provide visibility into spending, cash flow, liabilities, and financial performance.",
      icon: BarChart3,
      placeholder:
        "Real-Time Insights — spending, cash flow, liabilities, and performance",
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
  flipped,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  placeholder: string;
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
        {/* Gradient icon chip — the site's product-icon language. (Row index
            numerals removed per owner — the chip alone leads the row.) */}
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
