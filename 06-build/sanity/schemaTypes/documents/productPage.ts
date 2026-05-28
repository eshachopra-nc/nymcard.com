import { defineType, defineField } from "sanity";

// ── productPage ────────────────────────────────────────────────────────────
//
// One document per /products/[slug] route. Composes the full product-page
// arc by referencing the embedded section objects (hero, capabilities,
// featureShowcase, configuration, industries, deployment, migration, faq,
// finalCta, crossSell). Optional sections are fields the page renderer
// conditionally mounts.

export const productPage = defineType({
  name: "productPage",
  title: "Product page",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "header", title: "Hero & trust" },
    { name: "body", title: "Body sections" },
    { name: "footer", title: "FAQ + Final CTA" },
  ],
  fields: [
    // ── Meta ────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Used in the Studio list — not surfaced to readers.",
      validation: (r) => r.required(),
      group: "meta",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      group: "meta",
    }),
    defineField({
      name: "metaTitle",
      title: "Page title",
      type: "string",
      description: "<title> tag — keep under ~70 characters.",
      validation: (r) => r.required().max(80),
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
      group: "meta",
    }),

    // ── Hero ────────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
      validation: (r) => r.required(),
      group: "header",
    }),
    defineField({
      name: "trustLine",
      title: "Trust line",
      type: "string",
      description:
        "Single line shown beneath the logo strip (e.g. 'Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001'). Leave blank to hide.",
      group: "header",
    }),

    // ── Body sections ───────────────────────────────────────────────────
    defineField({
      name: "whyTiles",
      title: "Why-this-product tiles (optional)",
      type: "capabilitySection",
      description:
        "Optional 'Why X' outcome tiles that appear before the main capability bento (e.g. Lending §3 Why embed credit). Typically cols-2 + no-UI.",
      group: "body",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities (bento)",
      type: "capabilitySection",
      group: "body",
    }),
    defineField({
      name: "featureShowcase",
      title: "Feature showcase",
      type: "featureShowcase",
      description: "Optional — omit on pages without a controls dashboard.",
      group: "body",
    }),
    defineField({
      name: "configuration",
      title: "Configuration (CodeArtifact)",
      type: "configurationSection",
      group: "body",
    }),
    defineField({
      name: "industries",
      title: "Industries rail",
      type: "industriesSection",
      group: "body",
    }),
    defineField({
      name: "deployment",
      title: "Deployment",
      type: "deploymentSection",
      group: "body",
    }),
    defineField({
      name: "migration",
      title: "Migration console",
      type: "migrationConsole",
      description: "Optional — only present on pages with a migration story.",
      group: "body",
    }),

    // ── FAQ + Final CTA ─────────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ",
      type: "faqSection",
      group: "footer",
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "finalCtaSection",
      validation: (r) => r.required(),
      group: "footer",
    }),
    defineField({
      name: "crossSell",
      title: "Cross-sell banners (exactly 2)",
      type: "array",
      of: [{ type: "crossSellItem" }],
      validation: (r) => r.length(2),
      group: "footer",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `/products/${subtitle}` : "" };
    },
  },
});
