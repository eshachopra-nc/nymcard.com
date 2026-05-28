import { cn } from "@/lib/utils";
import {
  BlueprintOverlay,
  InfraGrid,
  KineticRibbon,
  TopologyTraces,
} from "@/components/visuals";
import { AbstractMark, Eyebrow } from "./atoms";

// ── Infrastructure Diagram Container ───────────────────────────────────────
//
// The reusable container for infrastructure storytelling — nCore diagrams,
// system architecture, platform visuals. It owns the FRAME, not the content:
// editorial whitespace, a topology-aware atmospheric environment (structural
// grid hints, topology traces, blueprint corners, cinematic depth). The
// diagram itself is an abstract placeholder — drop the real architecture
// visual into the zone.

type InfraDiagramFrameProps = {
  eyebrow: string;
  headline: string;
  className?: string;
};

export function InfraDiagramFrame({
  eyebrow,
  headline,
  className,
}: InfraDiagramFrameProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Topology-aware atmospheric environment — held low, restrained. */}
      <KineticRibbon intensity="calm" />
      <InfraGrid variant="dots" fade="radial" />
      <TopologyTraces density="sparse" tone="cyan" />
      <BlueprintOverlay corners animated={false} />

      <div className="relative z-10 p-8 sm:p-10 lg:p-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-4 max-w-lg font-display text-xl font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {headline}
        </h3>

        {/* Diagram zone — abstract placeholder. */}
        <div className="relative mt-12 grid min-h-72 place-items-center">
          <AbstractMark className="size-44 text-brand-primary dark:text-accent-cyan" />
        </div>
      </div>
    </section>
  );
}
