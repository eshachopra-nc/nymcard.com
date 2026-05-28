"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TEMPORARY — homepage section navigator for design review. Remove before ship:
// delete this file and the <SectionNav /> + id wrappers in app/page.tsx.

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "trust", label: "Trust Bar" },
  { id: "ncore", label: "nCore" },
  { id: "products", label: "Products" },
  { id: "solutions", label: "Solutions" },
  { id: "final-cta", label: "Final CTA" },
  { id: "footer", label: "Footer" },
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

  return (
    <nav
      aria-label="Section navigator (temporary)"
      className="fixed left-4 top-1/2 z-[60] hidden -translate-y-1/2 lg:block"
    >
      <div className="rounded-xl border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-md dark:border-surface-dark-border dark:bg-surface-dark-elevated/85">
        <p className="px-2 pb-1.5 pt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brand-purple">
          Temp · Sections
        </p>
        <ul className="space-y-0.5">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
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
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 font-body text-[12px] transition-colors",
                  active === id
                    ? "bg-brand-primary/10 font-medium text-brand-primary dark:bg-accent-cyan/15 dark:text-accent-cyan"
                    : "text-text-secondary hover:bg-black/[0.05] dark:text-text-dark-secondary dark:hover:bg-white/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    active === id
                      ? "bg-brand-primary dark:bg-accent-cyan"
                      : "bg-current opacity-40",
                  )}
                />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
