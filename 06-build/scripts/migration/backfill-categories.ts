import { getSanityClient } from "../_seed-utils";
import type { BlogCategory } from "@/lib/sanity/types";

// ── Backfill blog categories on migrated posts ─────────────────────────────
//
// Hand-classified mapping of every imported blog post (by slug) to its
// category. Categorisation was done by reading each title against the
// CATEGORY_META options in app/(site)/company/blog/page.tsx:
//
//   Industry              market analysis, regional payments trends
//   Product               NymCard product launches, capability deep-dives
//   Engineering           architecture pieces, technical design
//   Inside NymCard        team / culture / leadership Q&A
//   Security & Compliance financial safety, scam awareness, regulation
//   Customer Stories      (none in the current corpus)
//
// One-shot. Safe to re-run: each patch is idempotent (no-op if the post
// already has the assigned category).

const CATEGORY_BY_SLUG: Record<string, BlogCategory> = {
  // Industry
  "embedded-finance-the-next-big-disruption": "industry",
  "the-imperative-digital-transformation-for-saudi-arabias-traditional-banks":
    "industry",
  "embedded-finance-in-mena-trends-to-watch-in-2025": "industry",
  "ai-powered-credit-decisioning-the-future-of-sme-and-consumer-lending-in-mena":
    "industry",
  "the-future-of-b2b-payments-in-mena-why-banks-cant-wait": "industry",
  "debunking-the-biggest-baas-myths-in-menap": "industry",
  "why-banks-are-turning-to-commercial-cards-in-menap": "industry",
  "how-banks-can-power-the-future-of-sme-payments-with-modern-infrastructurec":
    "industry",
  "10-credit-trends-transforming-the-future-of-banking": "industry",

  // Product
  "release-highlights-q1-2023": "product",
  "unlock-global-opportunities-with-nymcard": "product",
  "how-nymcards-new-credit-card-platform-will-boost-your-growth": "product",
  "nymcard-surpasses-1000-apis": "product",
  "10-must-haves-for-card-issuing-in-todays-payment-ecosystems": "product",
  "introducing-altareq": "product",

  // Engineering
  "where-experience-meets-infrastructure-the-future-of-mobile-banking-design":
    "engineering",
  "open-vs-closed-loop-cards-the-architecture-behind-modern-card-programs":
    "engineering",
  "why-banks-are-rethinking-payment-architectures": "engineering",

  // Inside NymCard
  "payments-beyond-introducing-our-front-end-creative-team": "inside",
  "bringing-innovation-to-egypt": "inside",
  "embracing-zero-bureaucracy": "inside",
  "nymcard-seamless-north-africa-2024-interview-with-omar-elmoataz": "inside",
  "shaping-the-future-of-embedded-finance-a-qa-with-mario-wehbe-chief-product-officer-at-nymcard":
    "inside",

  // Security & Compliance
  "financial-safety-101-tips-to-protect-your-finances": "security",
  "uae-banks-to-stop-sending-otps-via-sms-and-email-what-you-need-to-know":
    "security",
  "know-your-rights-and-responsibilities": "security",
  "scam-call-tactics-dont-get-tricked": "security",
  "recognising-scam-messages-in-everyday-communication": "security",
};

const client = getSanityClient();

type PostRow = { _id: string; slug: string; title: string; category?: string };

async function main() {
  const posts = await client.fetch<PostRow[]>(
    `*[_type == "blogPost"]{ _id, "slug": slug.current, title, category }`,
  );

  const counts: Record<string, number> = {};
  const unknown: PostRow[] = [];

  for (const post of posts) {
    const target = CATEGORY_BY_SLUG[post.slug];
    if (!target) {
      unknown.push(post);
      continue;
    }
    if (post.category === target) {
      console.log(`  · ${post.slug} → ${target} (already set)`);
    } else {
      await client.patch(post._id).set({ category: target }).commit();
      console.log(`  ✓ ${post.slug} → ${target}`);
    }
    counts[target] = (counts[target] ?? 0) + 1;
  }

  console.log("\nSummary:");
  for (const [cat, n] of Object.entries(counts).sort()) {
    console.log(`  ${cat.padEnd(18)} ${n}`);
  }

  if (unknown.length > 0) {
    console.log(`\nUnmapped posts (${unknown.length}) — please assign manually in Studio:`);
    for (const p of unknown) {
      console.log(`  ${p.slug}  —  ${p.title}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
