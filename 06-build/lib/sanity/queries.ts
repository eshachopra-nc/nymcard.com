import { groq } from "next-sanity";

// ── GROQ queries ───────────────────────────────────────────────────────────
//
// Hand-written deep queries that mirror the document schemas. We project
// every field explicitly (rather than using `...`) so the response shape is
// predictable and stays under our control as schemas evolve.
//
// Slugs are unprojected as `slug.current` for ergonomic destructuring on
// the page side.

const PAGE_HERO = `
  topLine,
  headline,
  body,
  primaryCta,
  secondaryCta,
  visualLabel
`;

const FINAL_CTA = `
  headline,
  body,
  primaryCta,
  secondaryCta
`;

const FAQ_SECTION = `
  headline,
  items[] { question, answer }
`;

const CROSS_SELL_ITEM = `
  leadIn,
  body,
  link,
  iconName
`;

const CARD_GRID_ITEM = `
  eyebrow,
  heading,
  description,
  span,
  tall,
  uiLabel
`;

const RAIL_CAROUSEL_SPARSE_ITEM = `
  eyebrow,
  copy,
  link
`;

const CODE_ARTIFACT_TAB = `
  label,
  language,
  code
`;

const MIGRATION_CONSOLE = `
  eyebrow,
  headline,
  body,
  fromSystem,
  toSystem,
  throughput,
  eta,
  drift,
  statusLine,
  agents[] { id, role, glyph },
  activity[] { agent, kind, message },
  counters[] { label, value, suffix },
  tracks[] { label, pct }
`;

// ── productPage by slug ────────────────────────────────────────────────────
export const productPageBySlugQuery = groq`
  *[_type == "productPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    hero { ${PAGE_HERO} },
    trustLine,
    whyTiles {
      eyebrow,
      headline,
      body,
      layout,
      cardMode,
      items[] { ${CARD_GRID_ITEM} }
    },
    capabilities {
      eyebrow,
      headline,
      body,
      layout,
      cardMode,
      items[] { ${CARD_GRID_ITEM} }
    },
    featureShowcase {
      eyebrow,
      headline,
      body,
      uiLabel
    },
    configuration {
      eyebrow,
      headline,
      body,
      docsLink,
      tabs[] { ${CODE_ARTIFACT_TAB} },
      companion { heading, body, link }
    },
    industries {
      eyebrow,
      headline,
      items[] { ${RAIL_CAROUSEL_SPARSE_ITEM} }
    },
    deployment {
      eyebrow,
      headline,
      body,
      items[] { ${CARD_GRID_ITEM} }
    },
    migration { ${MIGRATION_CONSOLE} },
    faq { ${FAQ_SECTION} },
    finalCta { ${FINAL_CTA} },
    crossSell[] { ${CROSS_SELL_ITEM} }
  }
`;

// ── List of all product page slugs (for generateStaticParams later) ────────
export const allProductPageSlugsQuery = groq`
  *[_type == "productPage" && defined(slug.current)][].slug.current
`;

// ── industryPage by slug ───────────────────────────────────────────────────
const OUTCOME_CHIP = `iconName, label, body`;
const INDUSTRY_BUILD_ROW = `
  eyebrow,
  headline,
  body,
  link,
  visualLabel
`;

export const industryPageBySlugQuery = groq`
  *[_type == "industryPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    hero { ${PAGE_HERO} },
    outcomes[] { ${OUTCOME_CHIP} },
    trustLine,
    challenge { challenge, solution },
    build {
      eyebrow,
      rows[] { ${INDUSTRY_BUILD_ROW} }
    },
    payKit { ${CROSS_SELL_ITEM} },
    platform {
      eyebrow,
      headline,
      body,
      items,
      chips
    },
    developer {
      eyebrow,
      headline,
      body,
      link
    },
    crossSell[] { ${CROSS_SELL_ITEM} },
    faq { ${FAQ_SECTION} },
    finalCta { ${FINAL_CTA} }
  }
`;

export const allIndustryPageSlugsQuery = groq`
  *[_type == "industryPage" && defined(slug.current)][].slug.current
`;

// ── Editorial: blogPost / newsroomItem ────────────────────────────────────
//
// Projections cover both the listing card shape (excerpt + heroImage) and
// the full article shape (PortableText body + dereferenced images).
// PortableText bodies use a `body[]{ ..., asset-> }` projection so inline
// images carry their asset metadata for @sanity/image-url url building.

const IMAGE_WITH_META = `
  asset->{ _id, url, metadata { dimensions, lqip } },
  alt,
  caption
`;

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  "heroImage": heroImage { ${IMAGE_WITH_META} }
`;

const POST_FULL_FIELDS = `
  ${POST_CARD_FIELDS},
  metaTitle,
  metaDescription,
  tags,
  body[]{
    ...,
    _type == "image" => { ${IMAGE_WITH_META} }
  },
  legacyWpId,
  legacyWpUrl
`;

const NEWSROOM_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  kind,
  excerpt,
  publishedAt,
  location,
  externalLink,
  "heroImage": heroImage { ${IMAGE_WITH_META} }
`;

const NEWSROOM_FULL_FIELDS = `
  ${NEWSROOM_CARD_FIELDS},
  metaTitle,
  metaDescription,
  body[]{
    ...,
    _type == "image" => { ${IMAGE_WITH_META} }
  },
  legacyWpId,
  legacyWpUrl
`;

// ── Blog ───────────────────────────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]
    | order(publishedAt desc) {
      ${POST_CARD_FIELDS}
    }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${POST_FULL_FIELDS}
  }
`;

export const allBlogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`;

// ── Newsroom ───────────────────────────────────────────────────────────────

export const allNewsroomItemsQuery = groq`
  *[_type == "newsroomItem" && defined(slug.current)]
    | order(publishedAt desc) {
      ${NEWSROOM_CARD_FIELDS}
    }
`;

export const newsroomItemBySlugQuery = groq`
  *[_type == "newsroomItem" && slug.current == $slug][0] {
    ${NEWSROOM_FULL_FIELDS}
  }
`;

export const allNewsroomItemSlugsQuery = groq`
  *[_type == "newsroomItem" && defined(slug.current)][].slug.current
`;

// ── Redirects (legacy WordPress URLs) ──────────────────────────────────────
// Returns one row per migrated post/item with its old WP permalink and new
// slug. Used by scripts/migration/build-redirects.ts to generate the
// next.config.ts redirects map.
export const allLegacyWpRedirectsQuery = groq`
  {
    "blog": *[_type == "blogPost" && defined(legacyWpUrl) && defined(slug.current)]
      { "slug": slug.current, legacyWpUrl },
    "newsroom": *[_type == "newsroomItem" && defined(legacyWpUrl) && defined(slug.current)]
      { "slug": slug.current, legacyWpUrl }
  }
`;
