"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TEMPORARY — section navigator for design review. Remove before ship: delete
// this file and every <SectionNav /> (+ the id wrappers on the curated pages).
//
// Two modes:
//   • Curated  — pass `sections` (with optional status flags). Used on the
//     hand-built pages (homepage, migration, nCore) where short labels + a
//     done/improve/todo status read best. Each id must match an element id on
//     the page (the `<div id=… className="scroll-mt-24">` wrappers).
//   • Auto     — omit `sections`. The nav discovers every top-level <section>
//     (and the <footer>) inside <main> at runtime, labels each from its
//     heading, and assigns an id where one is missing. Used on the renderer-
//     driven product pages, which have no hand-wired anchors.

type Status = "done" | "improve" | "todo";

export type NavSection = { id: string; label: string; status?: Status };

const MAX_LABEL = 26;

const tidy = (s: string) => s.replace(/\s+/g, " ").trim();
const clip = (s: string) =>
  s.length > MAX_LABEL ? `${s.slice(0, MAX_LABEL - 1).trimEnd()}…` : s;

// Build the section list from the live DOM (auto mode).
function discoverSections(): NavSection[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const blocks = Array.from(main.querySelectorAll<HTMLElement>("section, footer"));
  // Keep only top-level blocks (skip any <section> nested inside another).
  const topLevel = blocks.filter((el) => !el.parentElement?.closest("section"));
  return topLevel.map((el, i) => {
    if (!el.id) el.id = `sec-${i + 1}`;
    let label = el.getAttribute("data-nav-label") ?? "";
    if (!label && el.tagName === "FOOTER") label = "Footer";
    if (!label) {
      const h = el.querySelector("h1, h2");
      label = h?.textContent ?? el.id;
    }
    return { id: el.id, label: clip(tidy(label)) };
  });
}

export function SectionNav({
  sections,
  title = "Sections",
}: {
  sections?: NavSection[];
  title?: string;
}) {
  const [items, setItems] = useState<NavSection[]>(sections ?? []);
  const [active, setActive] = useState<string>(sections?.[0]?.id ?? "");

  useEffect(() => {
    const list = sections ?? discoverSections();
    setItems(list);
    if (list.length && !sections) setActive(list[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    list.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Disabled — the temporary section navigator is turned off everywhere,
  // including the local dev server (owner request). Re-enable by restoring the
  // production guard below. To remove permanently: delete this file and every
  // <SectionNav /> usage (+ the id wrappers on the curated pages).
  return null;
  // eslint-disable-next-line no-unreachable
  if (process.env.NODE_ENV === "production") return null;
  if (!items.length) return null;

  return (
    <nav
      aria-label="Section navigator (temporary)"
      className="fixed left-4 top-1/2 z-[60] hidden max-h-[88vh] -translate-y-1/2 overflow-y-auto lg:block"
    >
      <div className="rounded-xl border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-md dark:border-surface-dark-border dark:bg-surface-dark-elevated/85">
        <p className="px-2 pb-1.5 pt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brand-purple">
          Temp · {title}
        </p>
        <ol className="space-y-0.5">
          {items.map(({ id, label, status }, i) => {
            const isTodo = status === "todo";
            const rowClass = cn(
              "flex items-center gap-2 rounded-md px-2 py-1 font-body text-[12px] transition-colors",
              isTodo
                ? "cursor-default text-text-muted/70 dark:text-text-dark-secondary/50"
                : active === id
                  ? "bg-brand-primary/10 font-medium text-brand-primary dark:bg-accent-cyan/15 dark:text-accent-cyan"
                  : "text-text-secondary hover:bg-black/[0.05] dark:text-text-dark-secondary dark:hover:bg-white/[0.06]",
            );
            const dot = (
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  isTodo
                    ? "border border-dashed border-current bg-transparent"
                    : active === id
                      ? "bg-brand-primary dark:bg-accent-cyan"
                      : "bg-current opacity-40",
                )}
              />
            );
            const num = (
              <span className="w-3.5 shrink-0 text-right font-mono text-[9px] tabular-nums opacity-50">
                {i + 1}
              </span>
            );
            // A small right-aligned hint for anything not yet shippable.
            const hint =
              status === "todo" ? (
                <span className="ml-auto pl-2 font-mono text-[8px] uppercase tracking-[0.1em] text-brand-purple/70">
                  soon
                </span>
              ) : status === "improve" ? (
                <span className="ml-auto pl-2 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted/60 dark:text-text-dark-secondary/50">
                  polish
                </span>
              ) : null;

            return (
              <li key={id}>
                {isTodo ? (
                  <span className={rowClass} aria-disabled="true">
                    {num}
                    {dot}
                    {label}
                    {hint}
                  </span>
                ) : (
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const reduced = window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches;
                      document.getElementById(id)?.scrollIntoView({
                        behavior: reduced ? "auto" : "smooth",
                        block: "start",
                      });
                    }}
                    className={rowClass}
                  >
                    {num}
                    {dot}
                    {label}
                    {hint}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
