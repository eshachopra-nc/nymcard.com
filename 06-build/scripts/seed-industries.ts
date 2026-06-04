import { getSanityClient } from "./_seed-utils";
import { commercialBankingDoc } from "./docs/industries/commercial-banking";
import { retailBankingDoc } from "./docs/industries/retail-banking";
import { exchangeHousesDoc } from "./docs/industries/exchange-houses";
import { fintechsDoc } from "./docs/industries/fintechs";
import { telecommunicationsDoc } from "./docs/industries/telecommunications";
import { retailMarketplacesDoc } from "./docs/industries/retail-marketplaces";
import { healthcareDoc } from "./docs/industries/healthcare";
import { governmentDoc } from "./docs/industries/government";

// ── seed-industries ────────────────────────────────────────────────────────
//
// Seeds the industry page documents in one shot. Idempotent via
// `createOrReplace` — re-runs overwrite the docs with the canonical content
// defined in scripts/docs/industries/*.ts.
//
//   npm run seed:industries

const docs = [
  commercialBankingDoc,
  retailBankingDoc,
  exchangeHousesDoc,
  fintechsDoc,
  telecommunicationsDoc,
  retailMarketplacesDoc,
  healthcareDoc,
  governmentDoc,
];

async function main() {
  const client = getSanityClient();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  console.log(`▸ Seeding ${docs.length} industry pages into ${dataset}…`);

  for (const doc of docs) {
    try {
      // Per-doc shapes vary (optional sections come and go), so cast to a
      // loose record for the Sanity client. The schema validates on write.
      const result = await client.createOrReplace(
        doc as unknown as Parameters<typeof client.createOrReplace>[0],
      );
      console.log(`✓ Wrote ${result._id}`);
    } catch (err) {
      console.error(`✗ Failed to write ${doc._id}:`);
      console.error(err);
      process.exit(1);
    }
  }

  console.log(`\n  Open the Studio → Industry page to see them all.`);
}

main().catch((err) => {
  console.error("✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
