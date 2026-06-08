import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { ProductVideo } from "./ProductVideo";

// ── Digital Banking §7 — From Concept To Live Bank ───────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"From Concept To Live Bank".
//
// Owner direction (2026-06-08): the four stages (Design → Configure → Launch →
// Scale) run as a full-width Remotion CENTERPIECE — a 4-stage progress rail with
// a floating product moment per stage, in the same transparent dark-UI language
// as the §3/§4 clips. The video carries the animated rail + stage labels + copy;
// the same stage copy is mirrored in a visually-hidden list so the content stays
// in the DOM for assistive tech and crawlers. Reduced-motion → the poster (all
// four stages complete). No eyebrow — the headline leads (CLAUDE.md v1.5).

const COPY = {
  headline: "From board approval to live bank, in months, not years.",
} as const;

const STEPS: { title: string; body: string }[] = [
  { title: "Design", body: "Define your proposition, customer journeys, and operating model." },
  { title: "Configure", body: "Set up products, controls, workflows, and programme rules." },
  { title: "Launch", body: "Go live under your brand on infrastructure that's already connected to your core." },
  { title: "Scale", body: "Add products and markets without another core migration underneath." },
];

export function BaaSHowItWorks() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* Full-width centerpiece — the 4-stage walkthrough. */}
      <div className="mt-12 sm:mt-14">
        <ProductVideo
          name="concept-to-live"
          aspectClass="aspect-[80/41]"
          label="A four-stage walkthrough on a progress rail — Design defines the proposition and journeys, Configure switches on products, controls, workflows, and rules, Launch goes live under your brand connected to your core, and Scale adds products and markets with no migration underneath."
        />
      </div>

      {/* Stage copy kept in the DOM (the video carries it visually). */}
      <ul className="sr-only">
        {STEPS.map((s) => (
          <li key={s.title}>
            <strong>{s.title}.</strong> {s.body}
          </li>
        ))}
      </ul>
    </Section>
  );
}
