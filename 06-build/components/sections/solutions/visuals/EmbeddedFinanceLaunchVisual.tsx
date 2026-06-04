"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  CreditCard,
  Landmark,
  ArrowLeftRight,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
} from "@/components/visuals/product-illustration";

// ── EmbeddedFinanceLaunchVisual (Embedded Finance §4 — What You Can Launch) ──
//
// The RESOLUTION: the same four modular capabilities (Cards · Lending ·
// Payments · Rewards) that were scattered across separate vendors in §2 are now
// COMPOSED into ONE branded product experience embedded inside a host product —
// all running on a single nCore base. The surface is a host-product SHELL (a
// branded app frame with its own header) into which the four capability modules
// stack as one coherent experience; a single nCore foundation bar anchors the
// bottom. The composed branded experience is the ONE focal subject; the nCore
// base is the quiet platform line beneath it.
//
// Distinct from every existing surface:
//   • EmbeddedFinanceProblemVisual (§2) is the INVERSE — scattered vendor tiles
//     ringing a fractured customer, broken links. This is the assembled, branded
//     product shell — vertical composition inside one frame.
//   • BaaSBundleVisual is a hub-and-spoke ring → core. This is a layered product-
//     shell stack on a foundation bar — its own composition.
//
// Maps to copy: "Financial experiences built into customer journeys" — modular
// capabilities composed into one branded product. Chips avoid echoing the
// adjacent card descriptions (no "issue cards", no "instalment plans") — they
// carry a one-word in-product state instead (Active / Live / Enabled / On).
//
// Composed on the canonical product-illustration kit (§8.1 v-illus):
// IllustrationCard floating in the lit IllustrationField — same treatment as the
// homepage Products surfaces, light AND dark.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in — the branded host shell fades up, the four capability modules
//     drop into the shell one-by-one (composed in), then the nCore base bar lights.
//   • hover (group) — the shell lifts, the brand accent line brightens, and the
//     four module status dots commit to live. Reduced motion shows it composed.

type Capability = {
  name: string;
  state: string;
  icon: LucideIcon;
};

const CAPABILITIES: Capability[] = [
  { name: "Cards", state: "Active", icon: CreditCard },
  { name: "Lending", state: "Enabled", icon: Landmark },
  { name: "Payments", state: "Live", icon: ArrowLeftRight },
  { name: "Rewards", state: "On", icon: Gift },
];

export function EmbeddedFinanceLaunchVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const stack: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
  };
  const module: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div
          ref={ref}
          role="img"
          aria-label="A single branded host product experience with four modular financial capabilities — Cards, Lending, Payments and Rewards — composed inside it, all running on one nCore platform base."
          className="group/launch flex h-full flex-col p-4 sm:p-5"
        >
          {/* Header — the branded host-product identity. */}
          <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
            <Eyebrow>Your product</Eyebrow>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent-teal dark:text-accent-cyan"
              style={{
                background: withAlpha(visual.cyan, 0.12),
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: visual.cyan, boxShadow: `0 0 8px ${visual.cyan}` }}
              />
              One brand
            </span>
          </div>

          {/* The branded host shell — a single product frame the capabilities
              compose into. */}
          <motion.div
            className="my-auto"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.15 }}
          >
            <div
              className="relative overflow-hidden rounded-[14px] p-3 transition-shadow duration-500 group-hover/launch:shadow-[0_24px_44px_-18px_rgba(48,77,187,0.4)]"
              style={{
                background: withAlpha(visual.white, 0.5),
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.6)}, 0 12px 28px -16px ${withAlpha(visual.navy, 0.32)}`,
              }}
            >
              {/* brand accent line — the host product's own brand, lit on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500 group-hover/launch:opacity-100"
                style={{
                  opacity: 0.75,
                  background: `linear-gradient(90deg, ${visual.primary}, ${visual.cyan} 60%, transparent)`,
                }}
              />

              {/* shell header — branded app bar */}
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="grid size-5 place-items-center rounded-[6px] text-white"
                  style={{ background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})` }}
                >
                  <span className="size-1.5 rounded-[2px] bg-white" />
                </span>
                <span className="font-display text-[11px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">
                  Your app
                </span>
                <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
                  Embedded
                </span>
              </div>

              {/* the four capability modules, composed into the one shell */}
              <motion.div
                className="space-y-1.5"
                variants={reduced ? undefined : stack}
                initial={reduced ? false : "hidden"}
                animate={inView ? (reduced ? undefined : "show") : undefined}
              >
                {CAPABILITIES.map((c) => (
                  <ModuleRow key={c.name} c={c} variants={reduced ? undefined : module} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* nCore foundation — the single base every module runs on. The quiet
              platform line, lit on scroll-in. */}
          <motion.div
            className="mt-auto"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, y: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 1.05 }}
          >
            <div
              className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2"
              style={{
                background: `linear-gradient(150deg, ${withAlpha(visual.navy, 0.06)}, ${withAlpha(visual.primary, 0.06)})`,
                boxShadow: `inset 0 0 0 1px ${withAlpha(visual.primary, 0.18)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full"
                  style={{ background: visual.cyan, boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.8)}` }}
                />
                <span className="font-display text-[11px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">
                  Running on nCore
                </span>
              </div>
              <SubLabel>One platform</SubLabel>
            </div>
          </motion.div>
        </div>
      </IllustrationCard>
    </>
  );
}

// A composed capability module inside the host shell — a brand-gradient icon
// chip (these ARE first-party now, on the brand), the name, and a one-word
// in-product state with a live dot. The dot commits to cyan under hover.
function ModuleRow({ c, variants }: { c: Capability; variants?: Variants }) {
  const Icon = c.icon;
  return (
    <motion.div
      variants={variants}
      className="flex items-center gap-2.5 rounded-[9px] bg-white/55 px-2.5 py-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
    >
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-[7px] text-white shadow-[0_3px_8px_-3px_rgba(48,77,187,0.5)]"
        style={{ background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})` }}
      >
        <Icon className="size-3" strokeWidth={2} />
      </span>
      <span className="flex-1 truncate font-body text-[11.5px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
        {c.name}
      </span>
      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
        {c.state}
      </span>
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full transition-colors duration-500"
        style={{ background: withAlpha(visual.cyan, 0.55) }}
      />
    </motion.div>
  );
}
