"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TEMPORARY — homepage section navigator for design review. Remove before ship:
// delete this file and the <SectionNav /> + id wrappers in app/page.tsx.

// Status mirrors the owner's homepage-completion arc:
//   done    — built and wired
//   improve — built, flagged for a craft pass
//   todo    — not built yet (no anchor; rendered as a non-link)
type Status = "done" | "improve" | "todo";

const SECTIONS: { id: string; label: string; status: Status }[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "trust", label: "Trust Bar", status: "done" },
  { id: "problem", label: "Problem", status: "done" },
  { id: "ncore", label: "nCore", status: "done" },
  { id: "products", label: "Products", status: "done" },
  { id: "why-nymcard", label: "Why NymCard", status: "done" },
  { id: "migration", label: "Migration", status: "improve" },
  { id: "deployment", label: "Deployment", status: "done" },
  { id: "industries", label: "Industries", status: "improve" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Dev-only review tool — never render in a production / preview build (so it
  // can't appear in a CEO review). Stays visible on the local dev server.
  if (process.env.NODE_ENV === "production") return null;

  return (
    <nav
      aria-label="Section navigator (temporary)"
      className="fixed left-4 top-1/2 z-[60] hidden -translate-y-1/2 lg:block"
    >
      <div className="rounded-xl border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-md dark:border-surface-dark-border dark:bg-surface-dark-elevated/85">
        <p className="px-2 pb-1.5 pt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brand-purple">
          Temp · Sections
        </p>
        <ol className="space-y-0.5">
          {SECTIONS.map(({ id, label, status }, i) => {
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
                <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.1em] text-brand-purple/70">
                  soon
                </span>
              ) : status === "improve" ? (
                <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted/60 dark:text-text-dark-secondary/50">
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
