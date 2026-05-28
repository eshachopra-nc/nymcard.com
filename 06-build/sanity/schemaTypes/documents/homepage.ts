import { defineType, defineField } from "sanity";

// ── homepage ───────────────────────────────────────────────────────────────
//
// Singleton document for the / route. Composes the homepage sections:
// Hero · TrustBar (driven by customerLogo collection) · NCoreFoundation ·
// Products · UseCases · FinalCTA.
//
// Sanity doesn't have a built-in singleton concept; we enforce single-instance
// in code (the productPage / industryPage list filters this document type out
// and the studio structure points to a fixed _id of `homepage`).

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "header", title: "Hero" },
    { name: "body", title: "Body sections" },
    { name: "footer", title: "Final CTA" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
      validation: (r) => r.required(),
      group: "header",
    }),

    // ── nCore foundation ────────────────────────────────────────────────
    defineField({
      name: "ncoreEyebrow",
      title: "nCore eyebrow",
      type: "string",
      initialValue: "Foundation",
      group: "body",
    }),
    defineField({
      name: "ncoreHeadline",
      title: "nCore headline",
      type: "string",
      group: "body",
    }),
    defineField({
      name: "ncoreBody",
      title: "nCore body",
      type: "text",
      rows: 3,
      group: "body",
    }),

    // ── Products grid ───────────────────────────────────────────────────
    defineField({
      name: "productsEyebrow",
      title: "Products eyebrow",
      type: "string",
      initialValue: "Products",
      group: "body",
    }),
    defineField({
      name: "productsHeadline",
      title: "Products headline",
      type: "string",
      group: "body",
    }),
    defineField({
      name: "productsBody",
      title: "Products body",
      type: "text",
      rows: 3,
      group: "body",
    }),
    defineField({
      name: "productCards",
      title: "Product cards (homepage tiles)",
      type: "array",
      of: [{ type: "cardGridItem" }],
      validation: (r) => r.required().min(2).max(8),
      group: "body",
    }),

    // ── Use cases rail ──────────────────────────────────────────────────
    defineField({
      name: "useCasesEyebrow",
      title: "Use cases eyebrow",
      type: "string",
      initialValue: "Use cases",
      group: "body",
    }),
    defineField({
      name: "useCasesHeadline",
      title: "Use cases headline",
      type: "string",
      group: "body",
    }),
    defineField({
      name: "useCases",
      title: "Use case cards",
      type: "array",
      of: [{ type: "railCarouselSparseItem" }],
      validation: (r) => r.required().min(3).max(10),
      group: "body",
    }),

    // ── Final CTA ───────────────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "finalCtaSection",
      validation: (r) => r.required(),
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
