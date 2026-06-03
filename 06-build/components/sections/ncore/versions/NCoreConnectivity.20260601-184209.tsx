import { Section } from "@/components/sections/Section";
import { ConnectivityOrbit } from "./ConnectivityOrbit";

// ── nCore §4 Connectivity ───────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.md → CONNECTIVITY.
// Market-agnostic scheme/network set.
//
// ConnectivityOrbit renders the radial diagram: nCore at the centre, the six
// schemes/networks orbiting on concentric rings, each connected to the centre
// by a faint cyan line. Real grayscale SVGs exist for Visa + Mastercard; the
// other four are tasteful labelled placeholder nodes (see the TODO in
// ConnectivityOrbit to swap them for real marks).

const COPY = {
  heading: "Connected to the schemes and networks before you arrive.",
} as const;

export function NCoreConnectivity() {
  return (
    <Section bg="white">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.heading}
        </h2>
      </div>
      <ConnectivityOrbit className="mx-auto max-w-[40rem]" />
    </Section>
  );
}
