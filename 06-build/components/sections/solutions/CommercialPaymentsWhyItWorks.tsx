import {
  Database,
  ShieldCheck,
  Activity,
  Scale,
  Layers,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { GlassPanel } from "@/components/visuals/GlassPanel";
import { GlassAtmosphere } from "@/components/visuals/GlassAtmosphere";
import { ConnectedStepper, type StepperStep } from "@/components/visuals";

// ── Commercial Payments §6 — Why It Works ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Why It
// Works.
//
// The page's THIRD distinct treatment (after the §3 alternating feature-show and
// the §5 dark linked grid): the canonical ConnectedStepper "one continuous
// platform" beat (design-system.md §8.31). An asymmetric row — the headline and
// a framing line on the left, the five reasons — One Customer Record · Unified
// Risk Intelligence · Real-Time Visibility · Financial Crime Controls · Built to
// Scale — threaded onto a single gradient spine inside a GlassPanel floating on
// a GlassAtmosphere field (the §8.31 composition; glass over a rich field, never
// a flat bed). Each step's gradient node carries a Lucide icon and reveals
// top-to-bottom on scroll-into-view. No cards, no icon chips on the left. No
// eyebrow — the headline leads. Light (soft), on a contained SectionAtmosphere
// wash; the glass panel rides its own GlassAtmosphere.

const COPY = {
  headline: "A complete Financial OS powered by one platform.",
  reasons: [
    {
      title: "One Customer Record",
      body: "Every transaction, payment, invoice, expense, and financing event contributes to the same source of truth.",
    },
    {
      title: "Unified Risk Intelligence",
      body: "Build richer business risk profiles using spending behaviour, payment activity, lending performance, and operational data from across the platform.",
    },
    {
      title: "Real-Time Visibility",
      body: "Monitor spending, invoices, payroll, repayments, receivables, and cash flow activity as it happens.",
    },
    {
      title: "Financial Crime Controls",
      body: "Identity verification, fraud detection, AML, and sanctions screening integrated directly into payment workflows.",
    },
    {
      title: "Built to Scale",
      body: "Launch new products, markets, and business services without rebuilding infrastructure.",
    },
  ],
} as const;

// Icons composed here (rendered elements cross the server boundary as ReactNode).
const STEPS: StepperStep[] = [
  {
    title: COPY.reasons[0].title,
    body: COPY.reasons[0].body,
    icon: <Database className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.reasons[1].title,
    body: COPY.reasons[1].body,
    icon: <ShieldCheck className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.reasons[2].title,
    body: COPY.reasons[2].body,
    icon: <Activity className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.reasons[3].title,
    body: COPY.reasons[3].body,
    icon: <Scale className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.reasons[4].title,
    body: COPY.reasons[4].body,
    icon: <Layers className="size-5" strokeWidth={1.75} />,
  },
];

export function CommercialPaymentsWhyItWorks() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline + framing line, sticky on desktop so it holds while
            the connected flow scrolls beside it. */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
        </div>

        {/* Right — the five reasons as one connected platform flow, inside glass
            floating on its own GlassAtmosphere field (§8.31). */}
        <div className="lg:col-span-8">
          <div className="relative isolate">
            <GlassAtmosphere
              tone="azure"
              className="rounded-xl"
            />
            <GlassPanel className="relative">
              <ConnectedStepper steps={STEPS} />
            </GlassPanel>
          </div>
        </div>
      </div>
    </Section>
  );
}
