import {
  Database,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { GlassPanel } from "@/components/visuals/GlassPanel";
import { GlassAtmosphere } from "@/components/visuals/GlassAtmosphere";
import { ConnectedStepper, type StepperStep } from "@/components/visuals";

// ── Digital Wallets §5 — Powered by nCore ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Powered by
// nCore.
//
// REWORKED (owner: page too static/flat — two near-identical 50:50 +
// placeholder sections). The placeholder is dropped; the four benefits now read
// as a CONNECTED FLOW via the canonical ConnectedStepper (design-system.md
// §8.31 — gradient nodes threaded on a single spine = "one platform behind
// every wallet experience"), floating inside a GlassPanel over a contained
// GlassAtmosphere field (§8.1: glass only over a rich field). Asymmetric: the
// headline + body anchor the left, the connected flow carries the right. Kept
// LIGHT (NOT dark) so it does not stack against the dark §7 deployment beat. No
// eyebrow — the headline leads. The stepper flow is deliberately distinct from
// §2 (centred glass quartet), §3 (card grid) and §4 (hairline list).

const COPY = {
  headline: "One platform behind every wallet experience.",
  body: "Digital wallets are built on the same nCore architecture that powers cards, money movement, settlement, financial crime, and reconciliation. One customer record, one data layer, and one audit trail support every interaction.",
  benefits: [
    {
      title: "One customer record",
      body: "A complete view of every customer across every wallet interaction.",
    },
    {
      title: "Real-time processing",
      body: "Balances, transfers, and payments update instantly.",
    },
    {
      title: "Financial crime controls",
      body: "Identity, fraud, AML, and sanctions integrated directly into the flow.",
    },
    {
      title: "Built to scale",
      body: "Launch new capabilities, markets, and customer experiences on the same platform.",
    },
  ],
} as const;

// Icons paired to each benefit (rendered elements so this server component can
// pass them across the ConnectedStepper client boundary).
const STEPS: StepperStep[] = [
  {
    title: COPY.benefits[0].title,
    body: COPY.benefits[0].body,
    icon: <Database className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.benefits[1].title,
    body: COPY.benefits[1].body,
    icon: <Zap className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.benefits[2].title,
    body: COPY.benefits[2].body,
    icon: <ShieldCheck className="size-5" strokeWidth={1.75} />,
  },
  {
    title: COPY.benefits[3].title,
    body: COPY.benefits[3].body,
    icon: <TrendingUp className="size-5" strokeWidth={1.75} />,
  },
];

export function DigitalWalletsPlatform() {
  return (
    <Section bg="white">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline + body, anchored. */}
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>
        </div>

        {/* Right — the four benefits as a connected flow (the spine = "one
            platform"), inside a glass panel over a contained atmosphere field. */}
        <div className="relative lg:col-span-7">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <GlassAtmosphere tone="indigo" animated />
          </div>
          <GlassPanel className="relative sm:p-10">
            <ConnectedStepper steps={STEPS} />
          </GlassPanel>
        </div>
      </div>
    </Section>
  );
}
