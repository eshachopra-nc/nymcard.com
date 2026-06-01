"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  MessageSquare,
  Newspaper,
  ShieldAlert,
} from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { RibbonKinetic } from "@/components/hero/RibbonKinetic";
import { GlassPanel } from "@/components/visuals";
import { Section } from "@/components/sections/Section";
import { Field, Input, Select, Textarea, Checkbox } from "@/components/ui/field";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/external-links";
import { DIAL_CODES } from "@/lib/dial-codes";
import { cn } from "@/lib/utils";

// ── Contact — /company/contact ─────────────────────────────────────────────
//
// The conversion surface, in the page's own signature language: the hero's
// kinetic ribbon carries the field, and the lead-gen form floats on it in the
// canonical GlassPanel — exactly how the homepage hero card sits on the ribbon.
//
// Two clearly-separated paths:
//   1. The GLASS FORM — the sales / build enquiry. The hero copy sets the
//      intent ("tell us what you'd like to build"); the form itself is clean.
//   2. "OTHER WAYS TO REACH US" — one card split into four columns (general /
//      press / careers / fraud), each with a brand-gradient icon chip.
//
// Composed from the system: RibbonKinetic (hero ribbon), GlassPanel (§8.1 glass
// on a rich field), the §3/§5/§6 form kit, Section, Button. Cool palette,
// tokens only, light + dark, prefers-reduced-motion safe.
//
// NOTE: the form is visual-only for launch — submit shows the success state but
// does not POST anywhere yet. Wire to the CRM/inbox when chosen.

const COPY = {
  headline: "Let’s build your payment program.",
  body: "Tell us what you’d like to build and the right team will get back to you.",
  submit: "Send message",
  success: {
    heading: "Message sent.",
    body: "Thanks — your message is with the NymCard team. Expect a reply within one business day.",
    docsLabel: "Explore the docs while you wait",
  },
  routesHeading: "Other ways to reach us",
} as const;

// "Company type" — the eleven NymCard industries (verbatim from nav-data /
// industry pages), plus a catch-all.
const COMPANY_TYPES = [
  "Commercial Banking",
  "Retail Banking",
  "Neobanks",
  "Exchange Houses",
  "Fintechs",
  "Telecommunications",
  "Retail & Marketplaces",
  "Travel",
  "Healthcare",
  "Government",
  "Mobility",
  "Other",
] as const;

// Phone dial-code options — compact "AE +971" in the trigger, full country name
// (searchable) in the list.
const DIAL_OPTIONS = DIAL_CODES.map((c) => ({
  value: `${c.iso} ${c.dial}`,
  label: `${c.name} (${c.dial})`,
  short: `${c.iso} ${c.dial}`,
}));

// Country options — every country, searchable.
const COUNTRY_OPTIONS = DIAL_CODES.map((c) => ({ value: c.name, label: c.name }));

// Field label — mirrors the Field kit's <label> span, for controls (Combobox)
// that shouldn't be wrapped in a <label>.
const FIELD_LABEL =
  "mb-1.5 block font-body text-sm font-medium text-text-primary dark:text-text-on-brand";

// Products — multi-select checkboxes (the six nCore products).
const PRODUCTS = [
  "Card Issuing",
  "Lending",
  "Money Movement",
  "Settlement",
  "Financial Crime",
  "Reconciliation",
] as const;

type Route = {
  icon: typeof MessageSquare;
  label: string;
  email: string;
  note: string;
};

const ROUTES: Route[] = [
  {
    icon: MessageSquare,
    label: "General inquiries",
    email: "contact@nymcard.com",
    note: "We’re here to support you.",
  },
  {
    icon: Newspaper,
    label: "Press & media",
    email: "press@nymcard.com",
    note: "Media enquiries and brand assets.",
  },
  {
    icon: Briefcase,
    label: "Careers",
    email: "careers@nymcard.com",
    note: "Join the team building nCore.",
  },
  {
    icon: ShieldAlert,
    label: "Fraud alerts",
    email: "fraud@nymcard.com",
    note: "Report suspected fraud.",
  },
];

// The brand-gradient icon chip — the cool primary→purple→cyan fill, white glyph.
// One gradient across all four so the card reads cohesive (color-consistency).
const GRADIENT_CHIP =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-xl " +
  "bg-gradient-to-br from-brand-primary via-brand-purple to-accent-cyan text-white " +
  "shadow-[0_8px_20px_-8px_rgba(48,77,187,0.55)] dark:shadow-[0_8px_22px_-8px_rgba(34,211,238,0.4)]";

// Group label styling mirrors the Field kit's <label> span.
const GROUP_LABEL =
  "mb-2 block font-body text-sm font-medium text-text-primary dark:text-text-on-brand";

export function ContactExperience() {
  const reduced = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  // The dial code lives in the Combobox's hidden input, which the browser won't
  // run `required` on — so it's validated here instead.
  const [needCode, setNeedCode] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      dialCode: String(fd.get("dialCode") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      companyType: String(fd.get("companyType") ?? ""),
      country: String(fd.get("country") ?? ""),
      products: fd.getAll("products").map(String),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company_website: String(fd.get("company_website") ?? ""), // honeypot
      submittedAt: new Date().toISOString(),
    };
    if (!payload.dialCode) {
      setNeedCode(true);
      return;
    }
    setNeedCode(false);
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  // Orchestrated load-in; reduced motion is handled at the parent so the
  // variants stay well-formed and the content simply paints in place.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: dur.cinematic, ease: ease.cinematic },
    },
  };

  return (
    <>
      {/* ── Hero band — copy + glass form on the kinetic ribbon ────────────── */}
      <section className="relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
        <RibbonKinetic />

        <motion.div
          variants={container}
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-16 lg:pb-28 lg:pt-36"
        >
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy — sits directly on the ribbon, with a soft surface halo so
                it stays legible (same trick as the homepage hero). */}
            <motion.div variants={item} className="max-w-xl lg:pt-8">
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl lg:tracking-tighter dark:text-text-on-brand">
                {COPY.headline}
              </h1>
              <p className="mt-6 max-w-md font-body text-base font-medium leading-relaxed text-text-primary sm:text-lg [text-shadow:0_0_11px_var(--color-surface-soft),0_0_22px_var(--color-surface-soft)] dark:text-text-dark-secondary dark:[text-shadow:0_0_11px_var(--color-surface-dark-base),0_0_22px_var(--color-surface-dark-base)]">
                {COPY.body}
              </p>
            </motion.div>

            {/* Glass form card — the hero signature: glass on the ribbon. */}
            <motion.div
              variants={item}
              className="w-full lg:max-w-[540px] lg:justify-self-end"
            >
              <GlassPanel className="rounded-2xl p-6 sm:p-8">
                {sent ? (
                  <SuccessState />
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Honeypot — hidden from people; bots that fill it are
                        dropped server-side. */}
                    <input
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    <Field label="Full name">
                      <Input
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Work email">
                      <Input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="you@company.com"
                      />
                    </Field>
                    <div>
                      <span className={FIELD_LABEL}>Phone number</span>
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                        <div className="sm:w-40 sm:shrink-0">
                          <Combobox
                            name="dialCode"
                            required
                            ariaLabel="Country dialling code"
                            options={DIAL_OPTIONS}
                            placeholder="Code"
                            searchPlaceholder="Search country…"
                            panelClassName="min-w-[18rem]"
                            onChange={() => setNeedCode(false)}
                          />
                        </div>
                        <Input
                          type="tel"
                          name="phone"
                          autoComplete="tel-national"
                          required
                          aria-label="Phone number"
                          placeholder="Phone number"
                          className="min-w-0 sm:flex-1"
                        />
                      </div>
                      {needCode && (
                        <p role="alert" className="mt-1.5 font-body text-xs text-semantic-danger">
                          Please select your country code.
                        </p>
                      )}
                    </div>
                    <Field label="Company">
                      <Input
                        name="company"
                        autoComplete="organization"
                        required
                        placeholder="Company name"
                      />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Company type">
                        <Select name="companyType" defaultValue="">
                          <option value="" disabled>
                            Select…
                          </option>
                          {COMPANY_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <div>
                        <span className={FIELD_LABEL}>Country</span>
                        <Combobox
                          name="country"
                          ariaLabel="Country"
                          options={COUNTRY_OPTIONS}
                          placeholder="Select…"
                          searchPlaceholder="Search countries…"
                        />
                      </div>
                    </div>

                    {/* Products — multi-select checkboxes (staq-style). */}
                    <fieldset>
                      <legend className={GROUP_LABEL}>
                        Products you’re interested in
                      </legend>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                        {PRODUCTS.map((p) => (
                          <Checkbox
                            key={p}
                            name="products"
                            value={p}
                            label={p}
                            labelClassName="text-text-primary dark:text-text-on-brand"
                          />
                        ))}
                      </div>
                    </fieldset>

                    <Field label="How can we help?">
                      <Textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="A few lines on what you’re planning and where you are in the process."
                      />
                    </Field>

                    <Checkbox
                      name="consent"
                      required
                      className="mt-1 items-start"
                      label="I agree to NymCard’s Privacy Policy."
                    />

                    {error && (
                      <p
                        role="alert"
                        className="font-body text-sm text-semantic-danger"
                      >
                        Something went wrong. Please try again, or email{" "}
                        <a
                          href="mailto:contact@nymcard.com"
                          className="font-medium underline underline-offset-4"
                        >
                          contact@nymcard.com
                        </a>
                        .
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submitting}
                      className="mt-2 w-full justify-center"
                    >
                      {submitting ? "Sending…" : COPY.submit}
                    </Button>
                  </form>
                )}
              </GlassPanel>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Other ways to reach us — one card, four-column split ───────────── */}
      <Section id="other-ways" bg="soft" ariaLabel="Other ways to reach us">
        <div className="rounded-2xl border border-surface-border-subtle bg-surface-white p-7 shadow-[var(--shadow-lift)] sm:p-9 dark:border-surface-dark-border dark:bg-surface-dark-elevated/70 dark:shadow-[var(--shadow-dark-lift)]">
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
            {COPY.routesHeading}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {ROUTES.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.email}
                  className={cn(
                    "flex flex-col gap-3",
                    // The "split" — a hairline divider before each column on lg.
                    "lg:border-l lg:border-surface-border-subtle lg:pl-8 dark:lg:border-surface-dark-border",
                    i === 0 && "lg:border-l-0 lg:pl-0",
                  )}
                >
                  <span aria-hidden="true" className={GRADIENT_CHIP}>
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-body text-[15px] font-semibold text-text-primary dark:text-text-on-brand">
                      {r.label}
                    </p>
                    <a
                      href={`mailto:${r.email}`}
                      className="mt-1 inline-block break-all font-mono text-[13px] text-brand-primary transition-colors hover:text-brand-purple dark:text-accent-cyan dark:hover:text-accent-cyan/80"
                    >
                      {r.email}
                    </a>
                  </div>
                  <p className="font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {r.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

// Success state — replaces the form body in place once sent.
function SuccessState() {
  return (
    <div className="flex flex-col items-start py-6">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary via-brand-purple to-accent-cyan text-white shadow-[0_8px_20px_-8px_rgba(48,77,187,0.55)]">
        <Check className="size-6" strokeWidth={2.25} />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {COPY.success.heading}
      </h2>
      <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {COPY.success.body}
      </p>
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-primary transition-colors hover:text-brand-purple dark:text-accent-cyan"
      >
        {COPY.success.docsLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
