import { defineType, defineField } from "sanity";

// ── siteConfig ─────────────────────────────────────────────────────────────
//
// Singleton document for site-wide settings: trust line shown beneath the
// logo strip, footer copy, contact details, social links. Mirrors the small
// strings that currently live inline in components or are duplicated across
// pages.

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site config",
  type: "document",
  fields: [
    defineField({
      name: "defaultTrustLine",
      title: "Default trust line",
      type: "string",
      description:
        "Fallback trust line when a page doesn't override it (e.g. 'Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.').",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site config" };
    },
  },
});
