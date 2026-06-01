import type { ReactNode } from "react";
import { HandoffVisual, type BedTone } from "@/components/sections/product-uis";

// ── hero-visual-map ──────────────────────────────────────────────────────────
//
// A string → component registry for the right-column PageHero visual, mirroring
// the `iconByName` pattern in `icon-map.tsx`. The product hero (§8.12) accepts
// an optional `visual` ReactNode and falls back to a UIPlaceholder when none is
// given. This map hands each product hero a real Claude Design handoff surface
// (HandoffVisual) so no hero ships the grey UIPlaceholder skeleton (CLAUDE.md
// v1.4 rule 2 — real product surfaces only).
//
// Keyed off the product page slug today (the field that already exists on the
// Sanity doc). When the Sanity schema grows a dedicated `hero.visualKey` field,
// switch `heroVisualFor` to read that key instead of the slug — the registry
// shape stays identical, only the lookup key changes. See the build report.
//
// Cool-palette SVGs only; commercial-payments.svg is never used. Card Issuing
// is intentionally absent — it leads with a text-forward F-pattern hero
// (PageHero `textOnly`) and carries its visual moment in CardProgramsBento.

const HERO: Record<string, { slug: string; tone: BedTone }> = {
  lending: { slug: "embedded-lending", tone: "cyan" },
  settlement: { slug: "stablecoin-settlement", tone: "indigo" },
  "money-movement": { slug: "money-movement", tone: "porcelain" },
  "financial-crime": { slug: "financial-crime", tone: "violet" },
  reconciliation: { slug: "reconciliation", tone: "mist" },
};

/**
 * Resolve the hero visual for a product page by its slug. Returns a
 * `HandoffVisual` for registered pages and `undefined` otherwise, so PageHero
 * falls back to its UIPlaceholder for any page without a registered surface.
 */
export function heroVisualFor(slug: string | undefined): ReactNode | undefined {
  if (!slug) return undefined;
  const entry = HERO[slug];
  if (!entry) return undefined;
  return (
    <div className="h-full min-h-[20rem] w-full lg:min-h-[28rem]">
      <HandoffVisual slug={entry.slug} tone={entry.tone} pad="loose" />
    </div>
  );
}
