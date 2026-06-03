import { createElement } from "react";
import type { RailCarouselRichItem } from "@/components/composition";
import { industryItems } from "@/lib/nav-data";

// ── Homepage "Industries" rail data ─────────────────────────────────────────
//
// The industries carousel on the homepage. Each card is compact: a small
// industry icon + an industry-name chip, then an outcome-driven headline and a
// one-line description, linking to that industry page (/solutions/*).
//
// Sourced from the single industries registry in `lib/nav-data.ts` (icon +
// name + href) so the homepage rail, the nav dropdown, and the footer never
// drift; the outcome copy is attached per-industry below.
//
// DRAFT COPY: these outcome headlines/descriptions are first-pass homepage copy
// (the §5 copy file is being reconciled separately). The industry NAME shows in
// the chip; the headline names the outcome.

const OUTCOMES: Record<string, { headline: string; description: string }> = {
  "commercial-banking": {
    headline: "Modernize corporate payments",
    description:
      "Issue cards, run accounts, and control spend for SMEs and corporates.",
  },
  "retail-banking": {
    headline: "Ship digital banking faster",
    description: "Launch cards, accounts, and payments on a single core.",
  },
  neobanks: {
    headline: "Launch a full digital bank",
    description:
      "Stand up an API-first bank with cards, accounts, and a ledger out of the box.",
  },
  "exchange-houses": {
    headline: "Power cross-border at scale",
    description:
      "Move money across corridors with FX, settlement, and compliance built in.",
  },
  fintechs: {
    headline: "Launch regulated products fast",
    description:
      "Go to market on a compliant core for cards, payments, and credit.",
  },
  telecommunications: {
    headline: "Embed finance in your app",
    description:
      "Add wallets, cards, and payments to the experience subscribers already use.",
  },
  "retail-marketplaces": {
    headline: "Pay out and extend credit",
    description:
      "Issue cards, split payouts, and offer credit across your marketplace.",
  },
  travel: {
    headline: "Handle multi-currency flows",
    description:
      "Issue cards and move money across currencies for travelers and partners.",
  },
  healthcare: {
    headline: "Streamline patient payments",
    description:
      "Run patient and provider payments on one compliant platform.",
  },
  government: {
    headline: "Disburse funds at scale",
    description:
      "Distribute payments and benefits with controls and full auditability.",
  },
  mobility: {
    headline: "Pay drivers and riders",
    description:
      "Power instant payouts and payments across your transport ecosystem.",
  },
};

export const HOMEPAGE_INDUSTRIES: RailCarouselRichItem[] = industryItems.map(
  (it) => {
    const copy = OUTCOMES[it.id] ?? {
      headline: it.label,
      description: it.description,
    };
    return {
      id: it.id,
      tag: it.label, // chip = industry name
      name: copy.headline, // outcome-driven headline
      description: copy.description,
      href: it.href,
      icon: createElement(it.icon, {
        size: 20,
        strokeWidth: 1.75,
        "aria-hidden": true,
      }),
    };
  },
);
