import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";

// ── HTML → PortableText converter ──────────────────────────────────────────
//
// Bridges WP `<content:encoded>` HTML → Sanity PortableText. Old-brand images
// are NOT migrated — they'll be redesigned and re-added in Studio after the
// import — so inline `<img>` tags and their wrapping `<figure>` are stripped
// before block-tools sees the markup.
//
// Empty paragraphs and Gutenberg block comments are stripped too — they only
// create extraneous empty blocks in Sanity.

const compiled = Schema.compile({
  name: "wpImport",
  types: [
    {
      type: "object",
      name: "wrapper",
      fields: [
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockType: any = compiled
  .get("wrapper")
  .fields.find((f: { name: string }) => f.name === "body").type;

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  [key: string]: unknown;
};

export function htmlToPortableText(html: string): PortableTextBlock[] {
  if (!html || !html.trim()) return [];
  const cleaned = cleanWpHtml(html);
  const blocks = htmlToBlocks(cleaned, blockType, {
    parseHtml: (raw) => new JSDOM(raw).window.document as unknown as Document,
  });
  return blocks as PortableTextBlock[];
}

// ── helpers ────────────────────────────────────────────────────────────────

function cleanWpHtml(html: string): string {
  return (
    html
      // Strip Gutenberg block comments (`<!-- wp:paragraph -->`, etc.).
      .replace(/<!--\s*\/?wp:[^>]*-->/g, "")
      // Drop `<figure>...</figure>` blocks — they wrap WP image embeds and
      // leave dangling captions if we strip the inner `<img>` alone.
      .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, "")
      // Drop any remaining bare `<img>` tags.
      .replace(/<img\b[^>]*\/?>(?:\s*<\/img>)?/gi, "")
      // Remove visually-empty paragraphs left after image strips.
      .replace(/<p>\s*(?:&nbsp;|<br\s*\/?>)?\s*<\/p>/g, "")
      // Collapse runs of blank lines.
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
