import type { SchemaTypeDefinition } from "sanity";

// ── Atomic objects (links, page elements, code artifact, migration) ────────
import { cta, link } from "./objects/links";
import {
  faqItem,
  outcomeChip,
  crossSellItem,
  textImageRow,
  industryBuildRow,
  cardGridItem,
  railCarouselSparseItem,
} from "./objects/page-elements";
import {
  codeArtifactTab,
  codeArtifactCompanion,
} from "./objects/code-artifact";
import {
  migrationAgent,
  migrationActivity,
  migrationCounter,
  migrationTrack,
  migrationConsole,
} from "./objects/migration";

// ── Composite section objects ──────────────────────────────────────────────
import {
  pageHero,
  featureShowcase,
  capabilitySection,
  configurationSection,
  industriesSection,
  deploymentSection,
  faqSection,
  finalCtaSection,
  platformSection,
  developerSection,
  challengeSection,
  buildSection,
} from "./objects/page-sections";

// ── Document types ─────────────────────────────────────────────────────────
import { productPage } from "./documents/productPage";
import { industryPage } from "./documents/industryPage";
import { homepage } from "./documents/homepage";
import { customerLogo } from "./documents/customerLogo";
import { siteConfig } from "./documents/siteConfig";
import { blogPost } from "./documents/blogPost";
import { newsroomItem } from "./documents/newsroomItem";

// ── Aggregate ──────────────────────────────────────────────────────────────
//
// Order matters only for the Studio's left-rail group order (documents
// first); objects come after as "shared shapes" and only surface when used
// inline inside a document.

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents — the things authors create from the Studio's "New" menu.
  homepage,
  productPage,
  industryPage,
  blogPost,
  newsroomItem,
  customerLogo,
  siteConfig,

  // Section objects — embedded in documents above.
  pageHero,
  capabilitySection,
  featureShowcase,
  configurationSection,
  industriesSection,
  deploymentSection,
  faqSection,
  finalCtaSection,
  platformSection,
  developerSection,
  challengeSection,
  buildSection,

  // Migration console family.
  migrationConsole,
  migrationAgent,
  migrationActivity,
  migrationCounter,
  migrationTrack,

  // Atomic objects (used inside the section objects).
  cta,
  link,
  faqItem,
  outcomeChip,
  crossSellItem,
  textImageRow,
  industryBuildRow,
  cardGridItem,
  railCarouselSparseItem,
  codeArtifactTab,
  codeArtifactCompanion,
];
