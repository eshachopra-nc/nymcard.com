// ── components/seo/JsonLd.tsx ───────────────────────────────────────────────
//
// Renders a JSON-LD structured-data block as a <script type="application/ld+json">.
// Server component — emits static markup answer engines and crawlers parse.
//
// Accepts a single object or an array of schema objects (rendered as one script
// per object). Data is serialised with JSON.stringify; callers pass only
// schema.org objects built in lib/seo.ts.

type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema objects are author-controlled (lib/seo.ts), not user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
