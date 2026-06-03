"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GlassPanel, GlassAtmosphere, visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";
import { PRODUCTS, NCoreProductPopover, type ProductKey } from "./NCoreProductPopover";

// ── NCoreFullStack — the nCore reveal diagram (Homepage §3.2) ────────────────
//
// Built to 05-handoff/home/design_handoff_ncore_fullstack (Light + Dark). The
// whole stack sits on a translucent glass card (GlassPanel over GlassAtmosphere,
// §8.1 — the hero's material). Six product rows flanked by the AI Intelligence
// Layer rail (left, cyan) and the Unified Data Layer rail (right, purple); a
// wide dashed connector bridges each row to both rails. A cyan pulse beats up
// and down the stack, lighting each layer cyan as it passes. Clicking a product
// opens its pop-up.

const NYM = visual.primary; // brand blue
const CYAN = "#22D3EE"; // AI Intelligence Layer
const PURPLE = "#9673FF"; // Unified Data Layer

// up-then-down sweep across the six rows
const SWEEP = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];

export function NCoreFullStack({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<ProductKey | null>(null);
  const [lit, setLit] = useState(0);
  const activeProduct = PRODUCTS.find((p) => p.key === active) ?? null;

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % SWEEP.length;
      setLit(SWEEP[i]);
    }, 680);
    return () => window.clearInterval(id);
  }, [reduced]);

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const row: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: 12 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* Translucent glass card on a rich azure field (like the hero, §8.1). */}
      <motion.div
        className={cn("relative isolate w-full overflow-hidden rounded-3xl p-2.5", className)}
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassAtmosphere tone="azure" animated />

        <GlassPanel padded className="relative w-full">
          <div
            role="group"
            aria-label="The nCore Full-Stack platform — six products on one platform, with an AI Intelligence Layer and a Unified Data Layer running across every product."
          >
            {/* body: AI rail · rows · Data rail — wide gaps for the connectors */}
            <motion.div
              className="flex items-stretch gap-7 sm:gap-8"
              variants={container}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-15%" }}
            >
              <Rail label="AI Intelligence Layer" tone={CYAN} />

              <div className="relative flex flex-1 flex-col gap-3.5">
                {/* soft cyan pulse beating up & down the stack, behind the rows */}
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 z-0 h-20 w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
                    style={{
                      background: `radial-gradient(50% 50% at 50% 50%, ${withAlpha(CYAN, 0.32)}, transparent 72%)`,
                      filter: "blur(8px)",
                    }}
                    animate={{ top: `${((lit + 0.5) / PRODUCTS.length) * 100}%`, opacity: [0.5, 0.9, 0.5] }}
                    transition={{
                      top: { duration: 0.62, ease: "easeInOut" },
                      opacity: { duration: 1.36, ease: "easeInOut", repeat: Infinity },
                    }}
                  />
                )}

                {PRODUCTS.map((p, i) => {
                  const Icon = p.icon;
                  const isLit = !reduced && i === lit;
                  return (
                    <motion.button
                      key={p.key}
                      type="button"
                      variants={row}
                      onClick={() => setActive(p.key)}
                      className={cn(
                        "group relative z-10 flex min-h-[62px] w-full items-center rounded-lg border px-4 text-left transition-all duration-500",
                        "border-black/[0.07] bg-white/85 hover:border-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                        "dark:bg-[#0e1830]/80 dark:hover:border-white/25",
                        isLit
                          ? "border-accent-cyan/55 shadow-[0_0_26px_-4px_rgba(34,211,238,0.5)] dark:border-accent-cyan/55"
                          : "dark:border-white/[0.1]",
                      )}
                    >
                      {/* cyan wash as the pulse lights this layer */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500"
                        style={{ opacity: isLit ? 1 : 0, background: `linear-gradient(90deg, transparent, ${withAlpha(CYAN, 0.12)} 50%, transparent)` }}
                      />

                      <Conn tone={CYAN} side="left" />
                      <Conn tone={PURPLE} side="right" />

                      {/* boxed icon — dimensional glass chip, square-rounded */}
                      <span
                        className={cn(
                          "relative flex size-9 shrink-0 items-center justify-center rounded-[9px] border bg-gradient-to-br transition-all duration-500",
                          "border-[#304DBB]/25 from-white/90 to-[#304DBB]/15 text-[#304DBB] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_3px_8px_-3px_rgba(48,77,187,0.35)]",
                          "dark:border-[#6E96FF]/35 dark:from-[#3A57C8]/45 dark:to-[#16224a]/55 dark:text-[#96B4FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_-3px_rgba(0,0,0,0.5)]",
                          isLit && "border-accent-cyan/50 text-accent-cyan",
                        )}
                      >
                        <Icon className="size-[18px]" strokeWidth={1.9} />
                      </span>
                      <span className="ml-3.5 flex-1 font-display text-[17px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                        {p.name}
                      </span>
                      {/* boxed chevron affordance — light square-rounded box */}
                      <span className="flex size-[30px] shrink-0 items-center justify-center rounded-md bg-brand-primary/[0.06] text-text-muted transition-all group-hover:translate-x-0.5 group-hover:bg-brand-primary/12 group-hover:text-brand-primary dark:bg-white/[0.05] dark:text-text-dark-secondary dark:group-hover:text-accent-cyan">
                        <ChevronRight className="size-4" strokeWidth={2} />
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <Rail label="Unified Data Layer" tone={PURPLE} />
            </motion.div>

            {/* platform label — the stack's name, centred under the rows */}
            <motion.div
              variants={row}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-15%" }}
              className="mt-5 flex items-center justify-center border-t pt-5"
              style={{ borderColor: withAlpha(NYM, 0.14) }}
            >
              <p className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl dark:text-text-on-brand">
                nCore Full-Stack
              </p>
            </motion.div>
          </div>
        </GlassPanel>
      </motion.div>

      <NCoreProductPopover product={activeProduct} onClose={() => setActive(null)} />
    </>
  );
}

// ── A vertical infrastructure rail (AI / Data) — square-rounded, glowing.
// Both labels rotate 180° (read bottom-to-top), per the handoff. ──────────────
function Rail({ label, tone }: { label: string; tone: string }) {
  return (
    <div
      className="relative flex w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
      style={{
        borderColor: withAlpha(tone, 0.42),
        background: `linear-gradient(180deg, ${withAlpha(tone, 0.14)}, ${withAlpha(tone, 0.05)})`,
        boxShadow: `0 0 26px ${withAlpha(tone, 0.12)}, inset 0 0 24px ${withAlpha(tone, 0.12)}`,
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 40% at 50% 50%, ${withAlpha(tone, 0.16)}, transparent 70%)` }} />
      <span
        className="relative font-display text-[11.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ color: tone, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Connector — dot · dashed line · dot, spanning the gap to a rail ───────────
function Conn({ tone, side }: { tone: string; side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute top-1/2 flex w-7 -translate-y-1/2 items-center sm:w-8", side === "left" ? "right-full" : "left-full")}
    >
      <i className="size-1.5 shrink-0 rounded-full" style={{ background: tone, boxShadow: `0 0 6px ${withAlpha(tone, 0.8)}` }} />
      <i className="h-0 flex-1 border-t-[1.5px] border-dashed" style={{ borderColor: withAlpha(tone, 0.6) }} />
      <i className="size-1.5 shrink-0 rounded-full" style={{ background: withAlpha(tone, 0.85), boxShadow: `0 0 6px ${withAlpha(tone, 0.7)}` }} />
    </span>
  );
}
