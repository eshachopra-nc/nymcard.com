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
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §3 — The Financial OS (THE CENTERPIECE) ──────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §The
// Financial OS.
//
// The signature section. Headline + description run full width at the top, then
// an asymmetric F-pattern row: the five capabilities — Spend · Pay · Get Paid ·
// Grow · Understand — as modular gradient-icon cards (the BaaSIncludes
// treatment: navy→cyan gradient chip, name, verbatim description, nc-card-hover)
// on the left (cols 1–7), beside a REQUIRED labelled UIPlaceholder for the
// Financial OS dashboard product surface on the right (cols 8–12, sticky on
// desktop). This is the §3 card grid; §5 is the linked-institution grid — the
// two are differentiated by this section pairing its cards with the dashboard
// visual. No eyebrow — the headline leads. Light (white), on a contained
// SectionAtmosphere wash.

const COPY = {
  headline: "Everything businesses need. One experience.",
  description:
    "Commercial Payments combines business finance tools, payment infrastructure, and customer-facing experiences into a single platform that can be fully branded as your own.",
  capabilities: [
    {
      name: "Spend",
      body: "Issue prepaid and credit cards, manage expenses, automate approvals, and enforce spending policies across teams, departments, and programmes.",
      icon: CreditCard,
    },
    {
      name: "Pay",
      body: "Manage supplier payments, payroll, workforce disbursements, and business transfers from a single platform.",
      icon: ArrowLeftRight,
    },
    {
      name: "Get Paid",
      body: "Create invoices, track receivables, monitor collections, and manage incoming payments with complete visibility into cash flow.",
      icon: ReceiptText,
    },
    {
      name: "Grow",
      body: "Offer working capital, invoice financing, and business credit solutions that help businesses access capital when they need it.",
      icon: TrendingUp,
    },
    {
      name: "Understand",
      body: "Access real-time insights into spending, payments, receivables, liabilities, cash flow, and business performance.",
      icon: BarChart3,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function CommercialPaymentsFinancialOS() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      {/* Top — headline + description, full width (constrained measure). */}
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      {/* Asymmetric F-pattern: the five capability cards (cols 1–7) beside the
          required Financial OS dashboard surface (cols 8–12, sticky). */}
      <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-16">
        {/* Left — the five capability cards. Two-up on tablet/desktop; the
            Understand card spans both columns on the last row so the column
            balances against the visual. */}
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {COPY.capabilities.map((capability, i) => (
              <CapabilityCard
                key={capability.name}
                {...capability}
                wide={i === COPY.capabilities.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right — the Financial OS dashboard surface (labelled UIPlaceholder
            for the product-ui-designer). Sticky on desktop. */}
        <div className="lg:col-span-5">
          <div className="relative min-h-[26rem] lg:sticky lg:top-28 lg:min-h-[34rem]">
            <UIPlaceholder
              label="Financial OS — spend, pay, get paid, grow, and understand in one branded dashboard"
              scale="wide"
              className="lg:absolute lg:inset-0"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CapabilityCard({
  name,
  body,
  icon: Icon,
  wide,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  wide?: boolean;
}) {
  return (
    <div
      className={`nc-card-hover flex flex-col rounded-lg border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-7 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      {/* Gradient icon chip — the site's product-icon treatment (navy→cyan). */}
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-md text-white"
        style={{
          background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
            visual.cyan,
            0.92,
          )})`,
        }}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {name}
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {body}
      </p>
    </div>
  );
}
