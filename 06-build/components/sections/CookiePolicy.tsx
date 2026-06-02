import { Section } from "@/components/sections/Section";

// ── Cookie Policy — /legal/cookies ─────────────────────────────────────────
//
// Mirrored from 02-copy/Cookie-Policy.md (fetched from the live WordPress).
// Legal copy: kept in its own first-person voice. Short static document →
// server component. Tokens only, light + dark.

type Block = { kind: "p"; text: string } | { kind: "labelled"; label: string; text: string };

type Sec = { title: string; blocks: Block[] };

const CONTENT: Sec[] = [
  {
    title: "Cookie Policy",
    blocks: [
      {
        kind: "p",
        text: `This Cookie Policy explains how NymCard uses cookies and similar technologies on our website. We use cookies to ensure the site functions correctly, improve performance, remember your preferences (such as language or country), and deliver content that may be relevant to you.`,
      },
    ],
  },
  {
    title: "What are cookies?",
    blocks: [
      {
        kind: "p",
        text: `Cookies are small text files that are placed on your device when you visit a website. They allow recognition of devices and storage of preference information. Cookies function as either session cookies (expiring upon browser closure) or persistent cookies (remaining stored on devices for future visits).`,
      },
    ],
  },
  {
    title: "Types of cookies we use",
    blocks: [
      {
        kind: "labelled",
        label: "Essential cookies.",
        text: `These are required for proper website functionality, enabling core features like page navigation and secure access. Without them, the website may not work as intended.`,
      },
      {
        kind: "labelled",
        label: "Preference cookies.",
        text: `These remember user choices, such as selected country or language, preventing the need to reset them on repeat visits.`,
      },
      {
        kind: "labelled",
        label: "Analytics cookies.",
        text: `These help understand visitor behavior and improve performance by identifying frequently visited pages and user errors. Information is aggregated and does not personally identify individuals.`,
      },
    ],
  },
  {
    title: "Third-party cookies",
    blocks: [
      {
        kind: "p",
        text: `Some cookies may be placed by trusted third parties, such as Google Analytics and Google Ads, to help us analyse site usage and improve user experience.`,
      },
    ],
  },
  {
    title: "Managing your cookies",
    blocks: [
      {
        kind: "p",
        text: `Users can manage cookie preferences through the cookie banner or browser settings. Most browsers allow blocking or deleting cookies, though disabling essential or preference cookies may limit site functionality.`,
      },
    ],
  },
  {
    title: "Updates to this policy",
    blocks: [
      {
        kind: "p",
        text: `The policy may be updated to reflect changes in technology, legislation, or business practices.`,
      },
    ],
  },
];

export function CookiePolicy() {
  return (
    <Section bg="white" ariaLabel="Cookie Policy">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl dark:text-text-on-brand">
          Cookie Policy
        </h1>

        <div className="mt-10 flex flex-col">
          {CONTENT.map((s) => (
            <section
              key={s.title}
              className="border-t border-surface-border-subtle pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-8 dark:border-surface-dark-border"
            >
              <h2 className="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl dark:text-text-on-brand">
                {s.title}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {s.blocks.map((b, i) =>
                  b.kind === "labelled" ? (
                    <p key={i} className="font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      <span className="font-semibold text-text-primary dark:text-text-on-brand">{b.label}</span>{" "}
                      {b.text}
                    </p>
                  ) : (
                    <p key={i} className="font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      {b.text}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}

          <p className="mt-10 border-t border-surface-border-subtle pt-8 font-body text-[15px] leading-relaxed text-text-secondary dark:border-surface-dark-border dark:text-text-dark-secondary">
            For more on how NymCard handles personal data, see the{" "}
            <a
              href="/legal/privacy"
              className="font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-purple dark:text-accent-cyan"
            >
              Global Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
