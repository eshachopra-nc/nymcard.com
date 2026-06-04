import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { FragmentedCanvas } from "@/components/sections/transformation/FragmentedCanvas";

// ── Banking as a Service §2 — The Problem ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md §The
// Problem.
//
// Layout reuses the NCoreWhy pattern: headline + the two-paragraph body run
// full width at the top, then a balanced 50:50 row beneath with the three pain
// points (left) opposite the FragmentedCanvas legacy visual (right) — a bank
// assembled from vendors, exactly the concept the copy describes. The columns
// stretch to equal height so the points and the design read as a matched pair.
// FragmentedCanvas renders in its STATIC fragmented state (no `progress` prop).
// No eyebrow — the headline leads. On a contained SectionAtmosphere wash so the
// section reads dimensional.

const COPY = {
  headline: "Launching a bank usually means assembling one.",
  body: [
    "Most banking platforms are stitched together from multiple vendors. A processor for cards. Another provider for payments. Separate systems for settlement, fraud, and compliance.",
    "The result is a fragmented stack where every product operates differently, every customer exists multiple times, and every launch becomes another integration project.",
  ],
  pains: [
    {
      title: "No single view of the customer",
      body: "Cards, payments, onboarding, and risk often operate on different systems and different customer records.",
    },
    {
      title: "Every product adds complexity",
      body: "Launching a new capability usually means introducing another vendor, another contract, and another integration.",
    },
    {
      title: "Operations become the integration layer",
      body: "Teams spend time reconciling systems that were never designed to work together.",
    },
  ],
} as const;

export function BaaSProblem() {
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

      {/* 50:50 — the three pain points (left) opposite the legacy visual (right),
          stretched to equal height. */}
      <div className="mt-12 grid items-stretch gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
        {/* Left — the three pains, a bordered list whose rows distribute to fill
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

        {/* Right — the fragmented-stack visualization (FragmentedCanvas, static
            fragmented state): a bank assembled from disconnected vendors.
            Portrait on mobile; fills the row height on desktop so it sits level
            with the pain list. */}
        <div className="relative min-h-[26rem]">
          <FragmentedCanvas className="aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" />
        </div>
      </div>
    </Section>
  );
}
