// ── External destinations ───────────────────────────────────────────────────
//
// Off-site product links surfaced in the nav, footer, and page CTAs. Kept in
// one place so a host change (e.g. swapping the staging API portal for prod)
// is a single edit.

/** Developer documentation (canonical host; GA linker params intentionally
 *  stripped — they're per-session tracking tokens, not part of the address). */
export const DOCS_URL = "https://docs.nymcard.com/";

/** API Catalog — the API specifications in the developer portal.
 *  NOTE: this is a STAGING host; swap for the production portal before launch. */
export const API_CATALOG_URL =
  "https://portal.stg.platform.ae-1.nymcard.com/default/documentation/02_api_specs";

/** True for absolute http(s) URLs — used to decide `<a target="_blank">` vs
 *  an in-app `<Link>`. */
export const isExternalHref = (href: string): boolean => /^https?:\/\//i.test(href);
