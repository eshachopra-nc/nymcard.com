import type { ComponentType } from "react";
import { Cpu, Database, Fingerprint, Layers, RefreshCw } from "lucide-react";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── Why NymCard (Homepage §6) ───────────────────────────────────────────────
//
// The differentiation beat. Owner direction (3 June): NOT a card grid, and NOT
// the full-stack diagram treatment (no glass-panel card, no scan animation).
// A proof-led horizontal stack: copy left (eyebrow + headline + short paragraph),
// five advantage rows right — clean, divider-separated, each led by a vibrant
// brand-gradient icon box. The section floats on a restrained cool atmosphere
// field (design-system.md §1/§8.1 — the page is glassy/translucent, never flat)
// so it stays on-system without being a card. Static (no animation).
//
// Copy mirrored from ../02-copy/Homepage.revised.md §6 (owner-authored).

const COPY = {
  headline: "Built differently from the ground up.",
  // TODO(copy): short paragraph — owner to confirm. Draft echoes the §3 arc.
  paragraph:
    "Most platforms are stitched together from separate systems. NymCard is built as one intelligent core, so every product shares the same data, the same customer record, and the same foundation.",
} as const;

type Advantage = { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; body: string };

const ADVANTAGES: Advantage[] = [
  { icon: Cpu, title: "AI-native core", body: "Intelligence built into the platform, not added around it." },
  { icon: Database, title: "Unified data layer", body: "Every product contributes to the same source of truth." },
  { icon: Fingerprint, title: "One customer record", body: "A single view across cards, lending, movement, risk, and operations." },
  { icon: Layers, title: "Full-stack ownership", body: "NymCard owns the infrastructure underneath the products." },
  { icon: RefreshCw, title: "Built to modernise", body: "Move from fragmented legacy systems without starting over." },
];

export function WhyNymCard() {
  return (
    <section
      aria-label="Why NymCard"
      className="relative isolate overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base"
    >
      {/* Rich, restrained cool field so the section reads dimensional, never a
          flat bed (design-system.md §1). */}
      <SectionAtmosphere anchor="top" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — copy */}
          <div className="lg:col-span-5">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[2.5rem] dark:text-text-on-brand">
              {COPY.headline}
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
              {COPY.paragraph}
            </p>
          </div>

          {/* Right — five advantage rows: gradient icon box + headline + line. */}
          <ul className="lg:col-span-7">
            {ADVANTAGES.map((a) => {
              const Icon = a.icon;
              return (
                <li
                  key={a.title}
                  className="flex items-start gap-5 border-t border-black/[0.08] py-6 first:border-t-0 first:pt-0 dark:border-white/[0.1]"
                >
                  {/* Vibrant brand-gradient icon box (white glyph), §3. */}
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-purple text-white shadow-[0_8px_20px_-6px_rgba(48,77,187,0.55)]"
                  >
                    <Icon className="size-[22px]" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary sm:text-xl dark:text-text-on-brand">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      {a.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
