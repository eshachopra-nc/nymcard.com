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
        "Fallback trust line when a page doesn't override it (e.g. 'Principal member of Visa and Mastercard · PCI DSS compliant · ISO 27001.').",
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

    // ── Alert banner ──────────────────────────────────────────────────────
    //
    // Site-wide announcement bar pinned above the navbar on every public
    // page. Manually curated — used to surface the latest NymCard news
    // (blog or newsroom). When this object is left empty in Studio the site
    // falls back to a code-level default (see components/sections/AlertBanner).
    defineField({
      name: "alertBanner",
      title: "Alert banner",
      type: "object",
      description:
        "Announcement bar at the very top of every page. Point it at the latest blog or newsroom story.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Show banner",
          type: "boolean",
          description: "Toggle the banner on or off site-wide.",
          initialValue: true,
        }),
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
          description:
            "Short label shown ahead of the message, e.g. 'Announcement' or 'New'.",
          validation: (r) =>
            r.max(24).warning("Tags over 24 chars crowd the bar on mobile."),
        }),
        defineField({
          name: "message",
          title: "Message",
          type: "string",
          description:
            "The headline shown in the bar. Keep it to a single line — it truncates on small screens.",
          validation: (r) =>
            r.max(120).warning("Messages over 120 chars truncate on most viewports."),
        }),
        defineField({
          name: "href",
          title: "Link",
          type: "string",
          description:
            "Where the banner links. Internal path (/company/newsroom/...) or full URL.",
        }),
        defineField({
          name: "linkLabel",
          title: "Link label",
          type: "string",
          description:
            "Accessible call-to-action text, e.g. 'Read the announcement'. Defaults to 'Read more'.",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site config" };
    },
  },
});
