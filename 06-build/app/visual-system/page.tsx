// ─────────────────────────────────────────────────────────────────────────
//  DEV-ONLY preview route — /visual-system
//
//  A QA surface for the NymCard visual engine (components/visuals/*). It is
//  NOT a marketing page: not linked from the nav, not in any sitemap, and
//  marked noindex below. Delete this folder (app/visual-system/) once the
//  visual engine has been reviewed.
//
//  Each primitive is shown in a light tile and a dark tile. The dark tiles
//  force `.dark` locally, so open this route in the default light theme to
//  see both themes at once; the navbar theme toggle flips the whole page.
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AmbientGlow,
  BlueprintOverlay,
  GlassPanel,
  InfraGrid,
  KineticRibbon,
  ScanSweep,
  SectionAtmosphere,
  SpotlightCard,
  TopologyTraces,
  TranslucentStack,
  type AtmospherePreset,
} from "@/components/visuals";

export const metadata: Metadata = {
  title: "Visual System — dev",
  robots: { index: false, follow: false },
};

// ── Layout helpers ─────────────────────────────────────────────────────────

function Spec({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-surface-border-subtle py-14 dark:border-surface-dark-border">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-brand-primary dark:text-accent-cyan">
          {n}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
          {title}
        </h2>
      </div>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {desc}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

function Tile({
  label,
  dark = false,
  className,
  children,
}: {
  label: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-72 overflow-hidden rounded-lg border",
        dark
          ? "dark border-surface-dark-border bg-surface-dark-base"
          : "border-surface-border-subtle bg-surface-soft",
        className,
      )}
    >
      {children}
      <span
        className={[
          "absolute left-3 top-3 z-20 font-mono text-[10px] uppercase tracking-wider",
          dark ? "text-white/55" : "text-text-muted",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

// A neutral grid-centred caption — sample content for demos that need
// something on top of the visual layer.
function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center p-6">
      {children}
    </div>
  );
}

function SampleCardBody({ title }: { title: string }) {
  return (
    <div className="p-5">
      <div className="font-display text-base font-semibold text-text-primary dark:text-text-on-brand">
        {title}
      </div>
      <div className="mt-2 font-body text-xs leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        Lit panel — cursor-tracked highlight with the §8.6 border and shadow
        hover sequence.
      </div>
      <div className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-brand-primary transition-transform duration-150 group-hover:translate-x-1 dark:text-accent-cyan">
        Inspect →
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

const PRESETS: AtmospherePreset[] = [
  "calm",
  "technical",
  "signal",
  "kinetic",
  "peak",
];

export default function VisualSystemPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-20">
      <header className="pb-6">
        <span className="font-mono text-xs uppercase tracking-wider text-brand-primary dark:text-accent-cyan">
          Dev preview
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
          Visual engine
        </h1>
        <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          Reusable visual primitives and cinematic infrastructure systems for
          the NymCard site. Every primitive is cool-palette only, token-driven,
          reduced-motion aware, and works in light and dark. Each is shown below
          in both themes.
        </p>
      </header>

      {/* 01 — Kinetic ribbon system */}
      <Spec
        n="01"
        title="Kinetic ribbon system"
        desc="A slow-rotating conic gradient under drifting depth orbs — gradient lighting that is alive. Intensity scales calm → ambient → peak; direction sets the gradient axis."
      >
        <Tile label="calm">
          <KineticRibbon intensity="calm" />
        </Tile>
        <Tile label="ambient">
          <KineticRibbon intensity="ambient" />
        </Tile>
        <Tile label="peak · dark" dark>
          <KineticRibbon intensity="peak" />
        </Tile>
      </Spec>

      {/* 02 — Scan / sweep effect system */}
      <Spec
        n="02"
        title="Scan / sweep effect system"
        desc="The AI-extraction scan — a layered luminous ripple (halo + cyan band + trailing shadow), never a hard line. Linear for documents, radial for biometric surfaces. Always cyan."
      >
        <Tile label="linear · brackets">
          <KineticRibbon intensity="calm" />
          <Centered>
            <GlassPanel className="relative h-44 w-full max-w-xs overflow-hidden" padded={false}>
              <ScanSweep variant="linear" brackets intensity="standard" />
            </GlassPanel>
          </Centered>
        </Tile>
        <Tile label="radial">
          <KineticRibbon intensity="calm" />
          <Centered>
            <GlassPanel className="relative size-44 overflow-hidden" padded={false}>
              <ScanSweep variant="radial" intensity="standard" />
            </GlassPanel>
          </Centered>
        </Tile>
        <Tile label="linear · dark" dark>
          <KineticRibbon intensity="calm" />
          <Centered>
            <GlassPanel className="relative h-44 w-full max-w-xs overflow-hidden" padded={false}>
              <ScanSweep variant="linear" brackets intensity="standard" />
            </GlassPanel>
          </Centered>
        </Tile>
      </Spec>

      {/* 03 — Glass morphism layer system */}
      <Spec
        n="03"
        title="Glass morphism layer system"
        desc="Translucent floating surfaces — blur + saturate + thin top-edge border (§8.1). Only ever over imagery or gradients, never a solid colour."
      >
        <Tile label="light glass">
          <KineticRibbon intensity="ambient" />
          <Centered>
            <GlassPanel className="w-full max-w-xs">
              <div className="font-display text-base font-semibold text-text-primary dark:text-text-on-brand">
                Glass surface
              </div>
              <div className="mt-2 font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                blur · saturate · translucency
              </div>
            </GlassPanel>
          </Centered>
        </Tile>
        <Tile label="dark glass" dark>
          <KineticRibbon intensity="ambient" />
          <Centered>
            <GlassPanel className="w-full max-w-xs">
              <div className="font-display text-base font-semibold text-text-primary dark:text-text-on-brand">
                Glass surface
              </div>
              <div className="mt-2 font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                blur · saturate · translucency
              </div>
            </GlassPanel>
          </Centered>
        </Tile>
        <Tile label="over topology">
          <InfraGrid variant="dots" />
          <TopologyTraces density="sparse" />
          <Centered>
            <GlassPanel className="w-full max-w-xs">
              <div className="font-display text-base font-semibold text-text-primary dark:text-text-on-brand">
                Operational overlay
              </div>
              <div className="mt-2 font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                glass floats above the trace field
              </div>
            </GlassPanel>
          </Centered>
        </Tile>
      </Spec>

      {/* 04 — Ambient glow system */}
      <Spec
        n="04"
        title="Ambient glow system"
        desc="A single blurred radial light source anchored off a composition edge — soft atmospheric depth. Slow low-amplitude drift; lighting, never a coloured fill."
      >
        <Tile label="cyan · top-right">
          <AmbientGlow placement="top-right" tone="cyan" size="lg" />
        </Tile>
        <Tile label="purple · bottom-left">
          <AmbientGlow placement="bottom-left" tone="purple" size="lg" />
        </Tile>
        <Tile label="indigo · centre · dark" dark>
          <AmbientGlow
            placement="center"
            tone="indigo"
            size="lg"
            intensity="standard"
          />
        </Tile>
      </Spec>

      {/* 05 — Infrastructure grid system */}
      <Spec
        n="05"
        title="Infrastructure grid system"
        desc="The faint structural grid that gives a section an architectural feel — one SVG pattern, fixed pixel cell, masked so it dissolves into the section edge."
      >
        <Tile label="dots · radial fade">
          <InfraGrid variant="dots" fade="radial" />
        </Tile>
        <Tile label="lines · top fade">
          <InfraGrid variant="lines" fade="top" />
        </Tile>
        <Tile label="dots · dark" dark>
          <InfraGrid variant="dots" fade="radial" />
        </Tile>
      </Spec>

      {/* 06 — Product card lighting behaviour */}
      <Spec
        n="06"
        title="Product card lighting behaviour"
        desc="A card surface that lights up under the cursor — a soft cyan light pool tracks the pointer. Layered over the §8.6 hover sequence: border deepens, shadow appears, no scale."
      >
        <Tile label="hover to light">
          <div className="grid h-full place-items-center gap-4 p-6">
            <SpotlightCard className="w-full max-w-xs">
              <SampleCardBody title="Module" />
            </SpotlightCard>
          </div>
        </Tile>
        <Tile label="hover to light · dark" dark>
          <div className="grid h-full place-items-center gap-4 p-6">
            <SpotlightCard className="w-full max-w-xs">
              <SampleCardBody title="Module" />
            </SpotlightCard>
          </div>
        </Tile>
        <Tile label="grid of surfaces">
          <div className="grid h-full grid-cols-2 place-items-center gap-3 p-6">
            <SpotlightCard className="size-full">
              <div className="grid h-full place-items-center font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Cards
              </div>
            </SpotlightCard>
            <SpotlightCard className="size-full">
              <div className="grid h-full place-items-center font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Lending
              </div>
            </SpotlightCard>
          </div>
        </Tile>
      </Spec>

      {/* 07 — Topology trace system */}
      <Spec
        n="07"
        title="Topology trace system"
        desc="Infrastructure routing traces with signal pulses travelling along them — orchestration and connectivity. Routes, not a node graph; a short bright pulse propagates, rests, repeats."
      >
        <Tile label="medium · cyan">
          <TopologyTraces density="medium" tone="cyan" />
        </Tile>
        <Tile label="sparse · indigo">
          <TopologyTraces density="sparse" tone="indigo" />
        </Tile>
        <Tile label="medium · dark" dark>
          <TopologyTraces density="medium" tone="cyan" />
        </Tile>
      </Spec>

      {/* 08 — Layered translucency system */}
      <Spec
        n="08"
        title="Layered translucency system"
        desc="Up to three translucent surfaces stacked at depth — scale, z-index and a fan offset (§8.2). With parallax on, layers move at 1.0 / 1.15 / 1.3 ratios on scroll."
      >
        <Tile label="three depth layers">
          <KineticRibbon intensity="calm" />
          <div className="grid h-full place-items-center p-8">
            <TranslucentStack
              className="w-full max-w-[200px]"
              layers={[
                <GlassPanel key="0" className="h-28" padded={false}>
                  <DepthLabel n="00 · base" />
                </GlassPanel>,
                <GlassPanel key="1" className="h-28" padded={false}>
                  <DepthLabel n="01 · mid" />
                </GlassPanel>,
                <GlassPanel key="2" className="h-28" padded={false}>
                  <DepthLabel n="02 · front" />
                </GlassPanel>,
              ]}
            />
          </div>
        </Tile>
        <Tile label="three depth layers · dark" dark>
          <KineticRibbon intensity="calm" />
          <div className="grid h-full place-items-center p-8">
            <TranslucentStack
              className="w-full max-w-[200px]"
              layers={[
                <GlassPanel key="0" className="h-28" padded={false}>
                  <DepthLabel n="00 · base" />
                </GlassPanel>,
                <GlassPanel key="1" className="h-28" padded={false}>
                  <DepthLabel n="01 · mid" />
                </GlassPanel>,
                <GlassPanel key="2" className="h-28" padded={false}>
                  <DepthLabel n="02 · front" />
                </GlassPanel>,
              ]}
            />
          </div>
        </Tile>
      </Spec>

      {/* 09 — Blueprint-style atmospheric overlay */}
      <Spec
        n="09"
        title="Blueprint-style atmospheric overlay"
        desc="Registration brackets, a ruler of edge ticks and an optional centre crosshair — the framing language of a technical drawing."
      >
        <Tile label="corners · ticks · crosshair">
          <InfraGrid variant="lines" fade="none" />
          <BlueprintOverlay corners ticks crosshair />
        </Tile>
        <Tile label="corners · ticks · dark" dark>
          <InfraGrid variant="lines" fade="none" />
          <BlueprintOverlay corners ticks />
        </Tile>
        <Tile label="frame only">
          <BlueprintOverlay corners ticks crosshair />
        </Tile>
      </Spec>

      {/* 10 — Atmosphere presets */}
      <Spec
        n="10"
        title="Atmosphere presets"
        desc="Pre-composed background bundles built from the primitives — drop one into a Section's `backgrounds` slot. Each stays inside the restraint rules: ≤ 3 layers, ≤ 1 motion."
      >
        {PRESETS.map((preset) => (
          <Tile key={preset} label={`preset · ${preset}`}>
            <SectionAtmosphere preset={preset} />
          </Tile>
        ))}
        <Tile label="preset · technical · dark" dark>
          <SectionAtmosphere preset="technical" />
        </Tile>
      </Spec>
    </main>
  );
}

function DepthLabel({ n }: { n: string }) {
  return (
    <div className="grid h-full place-items-center font-mono text-[10px] uppercase tracking-wider text-text-muted">
      {n}
    </div>
  );
}
