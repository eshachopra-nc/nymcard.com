"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCS_URL, API_CATALOG_URL, isExternalHref } from "@/lib/external-links";

// A footer link is either a bare label (placeholder href "#") or a label with
// a real destination. External (http) hrefs open in a new tab.
type FooterLink = string | { label: string; href: string };
const linkLabel = (l: FooterLink) => (typeof l === "string" ? l : l.label);
const linkHref = (l: FooterLink) => (typeof l === "string" ? "#" : l.href);

// Footer link groups — mirrored from ../02-copy/Homepage.md §7. Real hrefs are
// wired where a destination exists; the rest stay "#" until their routes land.
const LINK_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "nCore", href: "/platform/ncore" },
      { label: "Cards", href: "/products/card-issuing" },
      { label: "Lending", href: "/products/lending" },
      { label: "Money Movement", href: "/products/money-movement" },
      { label: "Settlement", href: "/products/settlement" },
      { label: "Financial Crime", href: "/products/financial-crime" },
      { label: "Reconciliation", href: "/products/reconciliation" },
      { label: "Migration", href: "/platform/migration" },
    ],
  },
  {
    // Mirrors the nav's "Solutions → By Use Case" — the 4 built use-case pages.
    // "Digital Banking" is the label for the Banking-as-a-Service page (slug
    // stays /solutions/banking-as-a-service for SEO).
    title: "Use Cases",
    links: [
      { label: "Digital Banking", href: "/solutions/banking-as-a-service" },
      { label: "Embedded Finance", href: "/solutions/embedded-finance" },
      { label: "Digital Wallets", href: "/solutions/digital-wallets" },
      { label: "Commercial Payments", href: "/solutions/commercial-payments" },
    ],
  },
  {
    // Mirrors the nav's "Solutions → By Industry" — the 8 live industry pages.
    title: "Industries",
    links: [
      { label: "Commercial Banking", href: "/solutions/commercial-banking" },
      { label: "Retail Banking", href: "/solutions/retail-banking" },
      { label: "Exchange Houses", href: "/solutions/exchange-houses" },
      { label: "Fintechs", href: "/solutions/fintechs" },
      { label: "Telecommunications", href: "/solutions/telecommunications" },
      { label: "Retail & Marketplaces", href: "/solutions/retail-marketplaces" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Government", href: "/solutions/government" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: DOCS_URL },
      { label: "API Catalog", href: API_CATALOG_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
      { label: "Blog", href: "/company/blog" },
      { label: "Newsroom", href: "/company/newsroom" },
    ],
  },
];

// Compliance certifications — a single inline row (label + marks on one line).
// White-on-transparent marks derived from the owner-supplied official artwork
// (PCI DSS / PCI SSF / AICPA SOC 2) plus the ISO 27001 seal, so they sit
// directly on the navy footer. Placement TBC with owner.
// Per-mark height — the wide PCI wordmarks are scaled down so they read
// uniform next to the compact SOC / ISO seals.
const CERTS = [
  { src: "/pcidss-white.png", alt: "PCI DSS compliant", h: "h-6" },
  { src: "/pcissf-white.png", alt: "PCI Software Security Framework", h: "h-6" },
  { src: "/soc2-white.png", alt: "AICPA SOC 2 — SOC for Service Organizations", h: "h-9" },
  { src: "/logos/iso-27001-seal-white.svg", alt: "ISO/IEC 27001 certified", h: "h-9" },
];

function FooterCertifications({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dark-muted">
        Certifications
      </span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {CERTS.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element -- certification mark
          <img key={c.src} src={c.src} alt={c.alt} className={cn(c.h, "w-auto")} loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  );
}

// Minimal LinkedIn glyph — currentColor so it inherits the bottom-bar text tone.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.555v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.017H3.555V9h3.564v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FooterLinkGroup({ group }: { group: { title: string; links: FooterLink[] } }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-text-on-brand text-sm">
        {group.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {group.links.map((link) => {
          const href = linkHref(link);
          const ext = isExternalHref(href);
          return (
            <li key={linkLabel(link)}>
              <a
                href={href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-body text-sm text-text-dark-secondary hover:text-text-on-brand transition-colors"
              >
                {linkLabel(link)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-20 pb-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        {/* Desktop / tablet: brand mark, then Platform, Use Cases, Industries,
            and a combined Developers + Company column. On lg the five blocks are
            distributed with space-between so the gaps read evenly and the row
            spans the full width (the brand column's short address no longer
            leaves an oversized first gap). md collapses to 3 columns. */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-12 lg:flex lg:items-start lg:justify-between lg:gap-x-8">
          {/* Column 1 — brand mark + HQ address */}
          <div>
            <Image
              src="/nymcard-logo-white.svg"
              alt="NymCard"
              width={148}
              height={22}
              className="h-[22px] w-auto"
            />
            <div className="mt-5 max-w-[15rem] font-body text-sm leading-relaxed text-text-dark-secondary">
              <p className="font-semibold text-text-on-brand">Office</p>
              <address className="mt-1 not-italic">
                North West House<br />
                119 Marylebone Road<br />
                London<br />
                United Kingdom<br />
                NW1 5PU
              </address>
            </div>
          </div>
          {/* Platform · Use Cases · Industries each get their own column. */}
          {LINK_GROUPS.slice(0, 3).map((group) => (
            <FooterLinkGroup key={group.title} group={group} />
          ))}
          {/* Developers + Company share the last column (stacked) so the row
              reads as 5 columns rather than a squashed 6. */}
          <div className="flex flex-col gap-10">
            {LINK_GROUPS.slice(3).map((group) => (
              <FooterLinkGroup key={group.title} group={group} />
            ))}
          </div>
        </div>

        {/* Mobile: logo above the accordion */}
        <div className="md:hidden">
          <Image
            src="/nymcard-logo-white.svg"
            alt="NymCard"
            width={148}
            height={22}
            className="h-[22px] w-auto"
          />
          <div className="mt-5 max-w-[18rem] font-body text-sm leading-relaxed text-text-dark-secondary">
            <p className="font-semibold text-text-on-brand">Office</p>
            <address className="mt-1 not-italic">
              North West House<br />
              119 Marylebone Road<br />
              London<br />
              United Kingdom<br />
              NW1 5PU
            </address>
          </div>
          <div className="mt-10 border-t border-surface-dark-border">
            {LINK_GROUPS.map((group) => (
              <FooterAccordion key={group.title} title={group.title} links={group.links} />
            ))}
          </div>
        </div>

        {/* Certifications — full-width single row above the legal bar so all
            marks sit on one line with room. */}
        <FooterCertifications className="mt-16 pt-8 border-t border-surface-dark-border" />

        {/* Bottom region: copyright · LinkedIn · legal. */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-body text-xs text-text-dark-muted">
            © 2026 NymCard Payment Services
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/company/nymcard/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NymCard on LinkedIn"
              className="text-text-dark-muted hover:text-text-on-brand transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a href="/legal/privacy" className="font-body text-xs text-text-dark-muted hover:text-text-on-brand transition-colors">
              Privacy
            </a>
            <a href="/legal/cookies" className="font-body text-xs text-text-dark-muted hover:text-text-on-brand transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({ title, links }: { title: string; links: FooterLink[] }) {
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
          {links.map((link) => {
            const href = linkHref(link);
            const ext = isExternalHref(href);
            return (
              <li key={linkLabel(link)}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-body text-sm text-text-dark-secondary hover:text-brand-primary transition-colors"
                >
                  {linkLabel(link)}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
