import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { FragmentedCanvas } from "@/components/sections/transformation/FragmentedCanvas";

// ── nCore §3 — Why We Built nCore ────────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §3.
//
// Layout (owner direction, 3 June — the prior copy-left/visual-right split read
// unbalanced): a FeatureShowcase-style stack — headline + the two-paragraph body
// run FULL WIDTH at the top, then a balanced 50:50 row beneath with the five
// pain points (left) opposite the FragmentedCanvas legacy visual (right). The
// two columns stretch to equal height so the points and the design read as a
// matched pair. FragmentedCanvas renders in its STATIC fragmented state (no
// `progress` prop). No CTA (owner direction). No eyebrow — the headline leads.
//
// On a contained SectionAtmosphere wash so the section reads dimensional.

const COPY = {
  headline: "Your payments stack wasn't built. It was assembled.",
  body: [
    "A card processor, a separate fraud vendor, a ledger that doesn't talk to settlement, cross-border through someone else. Six vendors, six data silos, and six audit trails that don't reconcile.",
    "The result isn't a platform. It's a collection of systems trying to behave like one.",
  ],
  pains: [
    {
      title: "No single view of the customer",
      body: "The same customer exists across multiple systems, creating conflicting records and fragmented data.",
    },
    {
      title: "No real-time view",
      body: "Data moves between systems in batches and syncs, leaving every decision a step behind.",
    },
    {
      title: "Intelligence lives on the outside",
      body: "Risk, fraud, and decisioning rely on disconnected data sources rather than a shared foundation.",
    },
    {
      title: "A stack of vendors, not a platform",
      body: "Cards, fraud, the ledger, and cross-border payments each come from different providers.",
    },
    {
      title: "Slow to evolve",
      body: "Every new product, feature, or market expansion means another integration and another implementation cycle.",
    },
  ],
} as const;

export function NCoreWhy() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      {/* Top — headline + body, full width (constrained measure). */}
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <div className="mt-5 space-y-4">
          {COPY.body.map((para) => (
            <p
              key={para}
              className="font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg"
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 50:50 — the five pain points (left) opposite the legacy visual (right),
          stretched to equal height. */}
      <div className="mt-12 grid items-stretch gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
        {/* Left — the five pains, a bordered list whose rows distribute to fill
            the column so it matches the visual's height. */}
        <ul className="flex flex-col overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated">
          {COPY.pains.map((pain) => (
            <li
              key={pain.title}
              className="flex flex-1 flex-col justify-center border-b border-surface-border-subtle p-5 last:border-b-0 dark:border-surface-dark-border sm:p-6"
            >
              <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {pain.title}
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {pain.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Right — the legacy-architecture visualization (FragmentedCanvas,
            static fragmented state). Portrait on mobile; fills the row height on
            desktop so it sits level with the pain list. */}
        <div className="relative min-h-[26rem]">
          <FragmentedCanvas className="aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" />
        </div>
      </div>
    </Section>
  );
}
