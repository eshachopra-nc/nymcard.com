"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Link groups. Most entries are verbatim from homepage.md; gaps marked [Placeholder].
// homepage.md groups its footer as Platform / Products / Industries / Company.
// Spec requires a fifth Developers column — Documentation + API Reference moved
// out of Platform into Developers; Status + Changelog flagged as placeholders.
const LINK_GROUPS = [
  {
    title: "Platform",
    links: ["nCore", "Agentic AI Migration", "[Placeholder: Compliance]", "[Placeholder: Trust]"],
  },
  {
    title: "Products",
    links: [
      "Card Issuing",
      "Embedded Lending",
      "Money Movement",
      "Settlement",
      "Commercial Payments",
      "Financial Crime",
      "Identity",
      "Reconciliation",
    ],
  },
  {
    title: "Industries",
    links: [
      "Commercial Banking",
      "Retail Banking",
      "Exchange Houses",
      "Fintechs",
      "Telecommunications",
      "Retail & Marketplaces",
      "Travel",
      "Healthcare",
      "Government",
      "Mobility",
    ],
  },
  {
    title: "Developers",
    links: ["Documentation", "API Reference", "[Placeholder: Status]", "[Placeholder: Changelog]"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Resources", "Blog", "Newsroom"],
  },
];

// X (Twitter), GitHub, LinkedIn aren't currently exported by this lucide-react
// build — inline minimal SVGs (fill="currentColor" so they inherit text color).
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.555v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.017H3.555V9h3.564v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-20 pb-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        {/* Top region */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-12 lg:gap-16">
          {/* Brand + tagline + socials */}
          <div>
            <div className="font-display font-bold text-text-on-brand text-2xl">NymCard</div>
            <p className="mt-3 font-body text-sm text-text-dark-secondary">
              Full-stack payments infrastructure.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="text-text-dark-secondary hover:text-text-on-brand transition-colors"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href="#x"
                aria-label="X"
                className="text-text-dark-secondary hover:text-text-on-brand transition-colors"
              >
                <XIcon className="size-5" />
              </a>
              <a
                href="#github"
                aria-label="GitHub"
                className="text-text-dark-secondary hover:text-text-on-brand transition-colors"
              >
                <GithubIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Desktop / tablet: link grid (5-col lg, 2-col md). Hidden on mobile. */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-display font-semibold text-text-on-brand text-sm">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body text-sm text-text-dark-secondary hover:text-brand-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: accordion */}
          <div className="md:hidden border-t border-surface-dark-border">
            {LINK_GROUPS.map((group) => (
              <FooterAccordion key={group.title} title={group.title} links={group.links} />
            ))}
          </div>
        </div>

        {/* Bottom region: divider + legal */}
        <div className="mt-16 pt-8 border-t border-surface-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-body text-xs text-text-dark-muted">
            © 2026 NymCard Payment Services. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="font-body text-xs text-text-dark-muted hover:text-text-on-brand transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="font-body text-xs text-text-dark-muted hover:text-text-on-brand transition-colors">
              [Placeholder: Terms of Service]
            </a>
            <a href="#cookies" className="font-body text-xs text-text-dark-muted hover:text-text-on-brand transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-surface-dark-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-display font-semibold text-text-on-brand text-sm">{title}</span>
        <ChevronDown
          className={cn(
            "size-4 text-text-dark-secondary transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul className="pb-4 space-y-2.5">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="font-body text-sm text-text-dark-secondary hover:text-brand-primary transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
