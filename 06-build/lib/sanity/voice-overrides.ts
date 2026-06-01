// ── Voice overrides (live copy hotfix, no Sanity reseed) ────────────────────
//
// Sanity is the live source for industry copy, but the project gates Sanity
// reseeds until the whole site is built. These exact-string overrides correct
// approved brand-voice fixes on the way OUT of the renderer (keyed off the
// existing doc field values), so the corrected copy shows live now. The seed
// docs (scripts/docs/industries/*.ts) are ALSO updated to the same strings, so
// this map becomes a harmless no-op after the eventual reseed and can be
// deleted then.
//
// Rule enforced: NymCard never refers to itself as "we/our/us" (CLAUDE.md
// Rule 5). Plus a positioning fix: card issuance is enabled by nCore's
// built-in scheme connectivity (pre-integrated with Visa + Mastercard), not by
// customers "issuing under NymCard's scheme membership".

const DEV_BODY_FIXED =
  "Full API access, SDKs, sandbox, and webhooks — everything your engineering team needs to go from integration to launch.";

export const VOICE_FIXES: Record<string, string> = {
  // developer.body — the deployed Sanity copy uses an em dash after
  // "webhooks" (the seed uses a comma), so both punctuation variants are keyed.
  "Full API access, SDKs, sandbox, and webhooks, so your engineering team can move from integration to launch without waiting on us.":
    DEV_BODY_FIXED,
  "Full API access, SDKs, sandbox, and webhooks, so your engineering team can move fast without waiting on us.":
    DEV_BODY_FIXED,
  "Full API access, SDKs, sandbox, and webhooks — so your engineering team can move from integration to launch without waiting on us.":
    DEV_BODY_FIXED,
  "Full API access, SDKs, sandbox, and webhooks — so your engineering team can move fast without waiting on us.":
    DEV_BODY_FIXED,

  // finalCta.headline
  "Talk to our team.": "Talk to us.",

  // fintechs outcome chip
  "Skip the infrastructure build. Go from integration to launch without waiting on us.":
    "Skip the infrastructure build. Go from integration to launch on your own schedule.",

  // scheme-membership FAQ answers — reframed to built-in scheme connectivity
  "No. NymCard is a principal member of Visa and Mastercard. You issue under our scheme membership unless you bring your own.":
    "No. nCore comes with built-in scheme connectivity — it's already integrated with Visa and Mastercard — so you can issue cards fast without building those connections yourself.",
  "No. NymCard is a principal member of Visa and Mastercard. You issue under our scheme membership unless you have your own and prefer to use it.":
    "No. nCore is already integrated with Visa and Mastercard, so its built-in scheme connectivity lets you launch fast — or you can bring your own scheme setup if you prefer.",
};

/** Return the approved-corrected copy for a string, or the string unchanged. */
export function fixVoice(s: string): string {
  return VOICE_FIXES[s] ?? s;
}

// Link destinations corrected on the way out of the renderer (same no-reseed
// rationale as the copy fixes). The "Read the docs" CTA pointed at "/docs",
// which has no route — repoint to the real developer docs host. Seed docs are
// updated to match, so this becomes a no-op after the next reseed.
import { DOCS_URL } from "@/lib/external-links";

const HREF_FIXES: Record<string, string> = {
  "/docs": DOCS_URL,
  "/docs/configuration": DOCS_URL,
  "/docs/underwriting": DOCS_URL,
  // Wrong / legacy industry slugs in product-page cross-links → the real routes.
  "/industries/banks": "/industries/retail-banking",
  "/industries/retail": "/industries/retail-marketplaces",
  "/industries/telecoms": "/industries/telecommunications",
  "/industries/automotive": "/industries/mobility",
  "/industries/consumer-banking": "/industries/retail-banking",
  "/industries/marketplaces": "/industries/retail-marketplaces",
  "/industries/remittance": "/industries/exchange-houses",
};

/** Return the corrected destination for an href, or the href unchanged. */
export function fixHref(href: string): string {
  return HREF_FIXES[href] ?? href;
}

/** Deep-walk a (plain JSON) Sanity doc and rewrite every `href` string via
 *  fixHref — so dead/legacy links are corrected wherever they sit in the
 *  document, present or future, without threading fixHref through each field.
 *  Same no-reseed rationale; becomes a no-op once the seed is reseeded. */
export function fixDocHrefs<T>(value: T): T {
  if (Array.isArray(value)) return value.map((v) => fixDocHrefs(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === "href" && typeof v === "string" ? fixHref(v) : fixDocHrefs(v);
    }
    return out as T;
  }
  return value;
}
