import { defineType, defineField } from "sanity";

// ── customerLogo ───────────────────────────────────────────────────────────
//
// One per customer brand shown in the TrustBar marquee. Currently rendered as
// `[Logo 1]…[Logo 12]` text placeholders on the frontend — switching to
// these documents replaces them with real grayscale logos uploaded by the
// content team.

export const customerLogo = defineType({
  name: "customerLogo",
  title: "Customer logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Customer name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (SVG preferred, grayscale)",
      type: "image",
      options: { accept: "image/svg+xml,image/png,image/webp" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logoDark",
      title: "Dark-mode logo (optional)",
      type: "image",
      description:
        "Optional override for dark mode. Defaults to inverting the main logo if omitted.",
      options: { accept: "image/svg+xml,image/png,image/webp" },
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "Accessible label. Convention: 'CustomerName logo' (e.g. 'Mashreq logo').",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first in the marquee.",
      initialValue: 0,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description:
        "Uncheck to hide this logo without deleting it (e.g. for time-limited customer permissions).",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo", subtitle: "alt" },
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
