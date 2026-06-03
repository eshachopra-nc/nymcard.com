import { Section } from "@/components/sections/Section";
import { ConnectivityOrbit } from "./ConnectivityOrbit";

// ── nCore §4 Connectivity ───────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → CONNECTIVITY.
// Market-agnostic scheme/network set.
//
// Layout (owner 2026-06-01): a balanced TWO-COLUMN section that earns its space
// — the value prop on the left, the orbit on the right (it had been a single
// sparse orbit, which read as wasted space). Mirrors the proven two-column
// shape used by NCoreDeveloper on this same page (left col-span-5 copy / right
// col-span-7 visual), but light-first via the shared Section wrapper. Stacks to
// one column < lg.
//
// ConnectivityOrbit (the right column) is reused as-is: nCore centred, five
// scheme/network logos on a single orbit ring, no connector spokes. It floats on
// the canonical GlassAtmosphere field and is static under prefers-reduced-motion.
//
// The two supporting groupings ("Card schemes" / "Cross-border & payout") are
// derived directly from the copy's logo set (Visa · Mastercard | Visa Direct ·
// Western Union · MoneyGram) — descriptive labels for the same networks, not
// invented claims.

const COPY = {
  heading: "Connected to the schemes and networks before you arrive.",
  body: "nCore comes pre-integrated with the card schemes and payout networks your programs run on — so you launch on certified rails from day one, instead of spending months on scheme certification and network connectivity.",
  groups: [
    { label: "Card schemes", networks: "Visa, Mastercard" },
    {
      label: "Cross-border & payout",
      networks: "Visa Direct, Western Union, MoneyGram",
    },
  ],
} as const;

export function NCoreConnectivity() {
  return (
    <Section bg="white">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — the value prop. No eyebrow; headline leads (CLAUDE.md v1.5). */}
        <div className="flex flex-col lg:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.heading}
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>

          {/* Light supporting grouping — descriptive labels over the same logo
              set the orbit shows; no new claims. */}
          <dl className="mt-8 grid max-w-md gap-px overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:grid-cols-2">
            {COPY.groups.map((group) => (
              <div
                key={group.label}
                className="bg-surface-white p-5 dark:bg-surface-dark-base"
              >
                <dt className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
                  {group.label}
                </dt>
                <dd className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {group.networks}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — the orbit. Fills the column; the column constrains its width
            so it sits comfortably without dominating. */}
        <div className="lg:col-span-7">
          <ConnectivityOrbit className="mx-auto w-full max-w-[34rem] lg:max-w-none" />
        </div>
      </div>
    </Section>
  );
}
