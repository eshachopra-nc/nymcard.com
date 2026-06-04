import {
  Smartphone,
  Signal,
  Briefcase,
  Globe,
  Landmark,
  LayoutGrid,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { HorizontalRow, type HorizontalItem } from "@/components/sections/archetypes";

// ── Digital Wallets §4 — Designed for Multiple Wallet Models ─────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Designed for
// Multiple Wallet Models.
//
// REBUILT (2026-06-04). Was a 2×3 bordered list that read card-ish. The six
// wallet models now read SIDEWAYS as a HorizontalRow — a hairline-divided
// horizontal rail of typographic panels (index numeral + icon + name +
// one-liner), the explicit alternative to a card grid for a set of peers. The
// horizontal axis is the contrast against §3's vertical FeatureMatrix and the
// rest of the page's stacked sections. None of the six models have a route, so
// every panel renders static (no dead href). Panels reveal left-to-right on
// scroll-into-view and tint on hover. Soft section. No eyebrow — headline leads.

const COPY = {
  headline: "One platform. Multiple wallet experiences.",
  models: [
    {
      name: "Consumer Wallets",
      body: "Help customers receive, store, transfer, and spend money every day.",
      icon: <Smartphone strokeWidth={1.75} />,
    },
    {
      name: "Mobile Money",
      body: "Enable digital financial services for telecom subscribers and underserved populations.",
      icon: <Signal strokeWidth={1.75} />,
    },
    {
      name: "Payroll Wallets",
      body: "Provide employees and gig workers with a digital destination for earnings and spending.",
      icon: <Briefcase strokeWidth={1.75} />,
    },
    {
      name: "Remittance Wallets",
      body: "Receive, hold, transfer, and spend funds from domestic and international transfers.",
      icon: <Globe strokeWidth={1.75} />,
    },
    {
      name: "Government Wallets",
      body: "Deliver benefits, payments, and public services through secure digital experiences.",
      icon: <Landmark strokeWidth={1.75} />,
    },
    {
      name: "Super Apps",
      body: "Embed financial services into broader consumer ecosystems.",
      icon: <LayoutGrid strokeWidth={1.75} />,
    },
  ] satisfies HorizontalItem[],
} as const;

export function DigitalWalletsModels() {
  return (
    <Section bg="soft">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <div className="mt-10 sm:mt-12">
        <HorizontalRow items={[...COPY.models]} />
      </div>
    </Section>
  );
}
