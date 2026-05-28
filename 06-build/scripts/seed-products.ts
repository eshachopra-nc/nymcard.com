import { getSanityClient } from "./_seed-utils";
import { cardIssuingDoc } from "./docs/card-issuing";
import { lendingDoc } from "./docs/lending";
import { moneyMovementDoc } from "./docs/money-movement";
import { settlementDoc } from "./docs/settlement";
import { financialCrimeDoc } from "./docs/financial-crime";
import { reconciliationDoc } from "./docs/reconciliation";

// ── seed-products ──────────────────────────────────────────────────────────
//
// Seeds all 6 product page documents in one shot. Idempotent via
// `createOrReplace` — re-runs overwrite the docs with the canonical content
// defined in scripts/docs/*.ts.
//
//   npm run seed:products

const docs = [
  cardIssuingDoc,
  lendingDoc,
  moneyMovementDoc,
  settlementDoc,
  financialCrimeDoc,
  reconciliationDoc,
];

async function main() {
  const client = getSanityClient();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  console.log(`▸ Seeding ${docs.length} product pages into ${dataset}…`);

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

  console.log(`\n  Open the Studio → Product page to see them all.`);
}

main().catch((err) => {
  console.error("✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
