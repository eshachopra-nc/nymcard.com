import { defineType, defineField } from "sanity";

// ── industryPage ───────────────────────────────────────────────────────────
//
// One document per /solutions/[slug] route. Composes the industry-page arc:
// hero · trust line · outcome chips · challenge/solution · build rows ·
// (optional) PayKit callout · platform · developer · cross-sell · FAQ · CTA.

export const industryPage = defineType({
  name: "industryPage",
  title: "Industry page",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "header", title: "Hero & outcomes" },
    { name: "body", title: "Body sections" },
    { name: "footer", title: "FAQ + Final CTA" },
  ],
  fields: [
    // ── Meta ────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
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

    // ── Hero + outcomes ─────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
      validation: (r) => r.required(),
      group: "header",
    }),
    defineField({
      name: "outcomes",
      title: "Outcome chips (exactly 3)",
      type: "array",
      of: [{ type: "outcomeChip" }],
      validation: (r) => r.required().length(3),
      group: "header",
    }),
    defineField({
      name: "trustLine",
      title: "Trust line",
      type: "string",
      description: "Single line beneath the logo strip. Leave blank to hide.",
      group: "header",
    }),

    // ── Body ────────────────────────────────────────────────────────────
    defineField({
      name: "challenge",
      title: "Challenge / Solution",
      type: "challengeSection",
      validation: (r) => r.required(),
      group: "body",
    }),
    defineField({
      name: "build",
      title: "What you can build",
      type: "buildSection",
      validation: (r) => r.required(),
      group: "body",
    }),
    defineField({
      name: "payKit",
      title: "PayKit callout (optional)",
      type: "crossSellItem",
      description:
        "Single CrossSellBanner-shaped callout — only on industries where PayKit earns its place (Retail Banking, Neobanks, Telecoms, Travel, Healthcare, Government, Mobility).",
      group: "body",
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "platformSection",
      validation: (r) => r.required(),
      group: "body",
    }),
    defineField({
      name: "developer",
      title: "Developer",
      type: "developerSection",
      validation: (r) => r.required(),
      group: "body",
    }),
    defineField({
      name: "crossSell",
      title: "Cross-sell banners (exactly 2)",
      type: "array",
      of: [{ type: "crossSellItem" }],
      validation: (r) => r.length(2),
      group: "body",
    }),

    // ── FAQ + Final CTA ─────────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ",
      type: "faqSection",
      validation: (r) => r.required(),
      group: "footer",
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "finalCtaSection",
      validation: (r) => r.required(),
      group: "footer",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `/solutions/${subtitle}` : "" };
    },
  },
});
