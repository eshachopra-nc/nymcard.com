// ── Sanity query result types ──────────────────────────────────────────────
//
// Hand-written types matching the GROQ projections in queries.ts. We're
// keeping these manual for now — switching to `sanity-codegen` is a future
// task once the schemas stabilise. Sanity schema changes that affect query
// shape need a corresponding edit here.

export type SanityCta = {
  label: string;
  href: string;
};

export type SanityLink = {
  label: string;
  href: string;
};

// ── Site config (singleton) ────────────────────────────────────────────────

export type SanityAlertBanner = {
  enabled?: boolean;
  tag?: string;
  message?: string;
  href?: string;
  linkLabel?: string;
};

export type SanitySiteConfig = {
  defaultTrustLine?: string;
  footerTagline?: string;
  contactEmail?: string;
  linkedInUrl?: string;
  alertBanner?: SanityAlertBanner;
};

export type SanityPageHero = {
  topLine?: string;
  headline: string;
  body: string;
  primaryCta: SanityCta;
  secondaryCta?: SanityCta;
  visualLabel?: string;
};

export type SanityFinalCta = {
  headline: string;
  body: string;
  primaryCta: SanityCta;
  secondaryCta?: SanityCta;
};

export type SanityFaqItem = {
  question: string;
  answer: string;
};

export type SanityFaqSection = {
  headline: string;
  items: SanityFaqItem[];
};

export type SanityCrossSellItem = {
  leadIn: string;
  body: string;
  link: SanityLink;
  iconName?: string;
};

export type SanityCardGridItem = {
  eyebrow?: string;
  heading: string;
  description?: string;
  span?: 2 | 3 | 4 | 6;
  tall?: boolean;
  uiLabel?: string;
};

export type SanityRailSparseItem = {
  eyebrow: string;
  copy: string;
  link: SanityLink;
};

export type SanityCodeArtifactTab = {
  label: string;
  language: "json" | "ts" | "http";
  code: string;
};

export type SanityCodeArtifactCompanion = {
  heading: string;
  body: string;
  link?: SanityLink;
};

export type SanityMigrationAgent = {
  id: string;
  role: string;
  glyph: string;
};

export type SanityMigrationActivity = {
  agent: string;
  kind?: "info" | "decision" | "anomaly" | "success";
  message: string;
};

export type SanityMigrationCounter = {
  label: string;
  value: number;
  suffix?: string;
};

export type SanityMigrationTrack = {
  label: string;
  pct: number;
};

export type SanityMigrationConsole = {
  eyebrow?: string;
  headline: string;
  body: string;
  fromSystem: string;
  toSystem?: string;
  throughput: string;
  eta: string;
  drift: string;
  statusLine?: string;
  agents: SanityMigrationAgent[];
  activity: SanityMigrationActivity[];
  counters: SanityMigrationCounter[];
  tracks: SanityMigrationTrack[];
};

export type SanityCapabilitySection = {
  eyebrow?: string;
  headline: string;
  body?: string;
  layout?: "bento" | "cols-2";
  cardMode?: "with-UI" | "no-UI";
  items: SanityCardGridItem[];
};

export type SanityFeatureShowcase = {
  eyebrow?: string;
  headline: string;
  body: string;
  uiLabel?: string;
};

export type SanityConfigurationSection = {
  eyebrow?: string;
  headline: string;
  body: string;
  docsLink?: SanityLink;
  tabs: SanityCodeArtifactTab[];
  companion?: SanityCodeArtifactCompanion;
};

export type SanityIndustriesSection = {
  eyebrow?: string;
  headline: string;
  items: SanityRailSparseItem[];
};

export type SanityDeploymentSection = {
  eyebrow?: string;
  headline: string;
  body?: string;
  items: SanityCardGridItem[];
};

export type SanityProductPage = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: SanityPageHero;
  trustLine?: string;
  whyTiles?: SanityCapabilitySection;
  capabilities?: SanityCapabilitySection;
  featureShowcase?: SanityFeatureShowcase;
  configuration?: SanityConfigurationSection;
  industries?: SanityIndustriesSection;
  deployment?: SanityDeploymentSection;
  migration?: SanityMigrationConsole;
  faq?: SanityFaqSection;
  finalCta: SanityFinalCta;
  crossSell: SanityCrossSellItem[];
};

// ── Industry page ──────────────────────────────────────────────────────────

export type SanityOutcomeChip = {
  iconName: string;
  label: string;
  body: string;
};

export type SanityIndustryBuildRow = {
  eyebrow?: string;
  headline: string;
  body: string;
  link?: SanityLink;
  visualLabel?: string;
};

export type SanityChallengeSection = {
  challenge: string;
  solution: string;
};

export type SanityBuildSection = {
  eyebrow?: string;
  rows: SanityIndustryBuildRow[];
};

export type SanityPlatformSection = {
  eyebrow?: string;
  headline: string;
  body?: string;
  items: string[];
  chips?: string[];
};

export type SanityDeveloperSection = {
  eyebrow?: string;
  headline: string;
  body: string;
  link: SanityLink;
};

export type SanityIndustryPage = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: SanityPageHero;
  outcomes: SanityOutcomeChip[];
  trustLine?: string;
  challenge: SanityChallengeSection;
  build: SanityBuildSection;
  payKit?: SanityCrossSellItem;
  platform: SanityPlatformSection;
  developer: SanityDeveloperSection;
  crossSell: SanityCrossSellItem[];
  faq: SanityFaqSection;
  finalCta: SanityFinalCta;
};

// ── Editorial: blogPost / newsroomItem ────────────────────────────────────
//
// Shapes match the projections in queries.ts. Card-shaped types are the
// listing projection (no body); full-shaped types add body + meta + legacy
// migration fields.

export type SanityImageRef = {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: { width: number; height: number; aspectRatio: number };
      lqip: string;
    };
  };
  alt?: string;
  caption?: string;
};

// Structural minimum compatible with @portabletext/react's input type.
// Each entry carries _key + _type and a free-form payload — keeping this
// permissive lets us add new inline block types in the schema without
// having to teach the type system about every one.
export type PortableTextBlockLike = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

export type BlogCategory =
  | "industry"
  | "product"
  | "engineering"
  | "inside"
  | "security"
  | "customer-stories";

export type SanityBlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  category?: BlogCategory;
  excerpt: string;
  publishedAt: string;
  heroImage?: SanityImageRef;
};

export type SanityBlogPost = SanityBlogPostCard & {
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  body: PortableTextBlockLike[];
  legacyWpId?: number;
  legacyWpUrl?: string;
};

export type NewsroomKind =
  | "press-release"
  | "announcement"
  | "award"
  | "in-the-news";

export type SanityNewsroomItemCard = {
  _id: string;
  title: string;
  slug: string;
  kind: NewsroomKind;
  excerpt: string;
  publishedAt: string;
  location?: string;
  externalLink?: string;
  heroImage?: SanityImageRef;
};

export type SanityNewsroomItem = SanityNewsroomItemCard & {
  metaTitle?: string;
  metaDescription?: string;
  body?: PortableTextBlockLike[];
  legacyWpId?: number;
  legacyWpUrl?: string;
};

export type SanityLegacyWpRedirect = {
  slug: string;
  legacyWpUrl: string;
};

export type SanityLegacyWpRedirects = {
  blog: SanityLegacyWpRedirect[];
  newsroom: SanityLegacyWpRedirect[];
};
