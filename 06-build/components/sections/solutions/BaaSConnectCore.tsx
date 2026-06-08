import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { ProductVideo } from "./ProductVideo";

// ── Digital Banking §3 — Connect To The Core You Already Run ──────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"Connect To The Core You Already Run".
//
// The page SIGNATURE — and the page's ONE cinematic marquee. Asymmetric
// F-pattern (§8.3): headline + body on the left (cols 1–5), the signature VIDEO
// on the right (cols 6–12). The pre-rendered Remotion sequence (owner-directed)
// dramatises the copy: the nCore full-stack compresses into a foundation, and the
// bank's existing core banking system seats ON TOP of it, fuelled by nCore from
// beneath — nCore as the foundation the bank runs on. This is deliberately NOT
// the homepage's nCore stack diagram (retired for this page). No eyebrow — the
// headline leads (CLAUDE.md v1.5).

const COPY = {
  headline: "Keep your core. Add the bank on top.",
  body: "NymCard is not a core replacement. Your new digital products run on nCore, connected to the system of record you already operate, so you keep your licence, your core, and your source of truth, and gain a modern product factory beside it.",
} as const;

export function BaaSConnectCore() {
  return (
    <Section
      bg="white"
      overflowVisible
      backgrounds={<SectionAtmosphere anchor="top" />}
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline + body. */}
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>
        </div>

        {/* Right — the page SIGNATURE: the floating nCore-foundation video. */}
        <div className="lg:col-span-7">
          <ProductVideo
            name="ncore-foundation"
            aspectClass="aspect-[19/24]"
            label="The nCore full-stack diagram compresses into a single nCore Full-Stack box; the bank's core banking system then seats on top, connected by a single integration."
          />
        </div>
      </div>
    </Section>
  );
}
