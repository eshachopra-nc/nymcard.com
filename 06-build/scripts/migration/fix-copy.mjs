// fix-copy — one-shot copy hygiene sweep over the Sanity doc SOURCE files
// (scripts/docs/**/*.ts). These docs are the seed source; after running this,
// re-seed to push the corrected content to the dataset:
//
//   node scripts/migration/fix-copy.mjs        # apply
//   node scripts/migration/fix-copy.mjs --dry  # preview only
//   npm run seed:products && npm run seed:industries   # then re-seed
//
// What it fixes (from the Stage 0 design audit):
//   1. Em dashes — banned by design-system §1 + the design skills, and they
//      leak into meta descriptions + FAQPage JSON-LD (AEO output). Replaced
//      with a comma, the safe default for the appositive/clause-break usage
//      that dominates this copy. Review the diff for any line that reads
//      better as a colon or period and adjust by hand.
//   2. The fabricated "[live number]" hero topLine token (card-issuing) —
//      invented data, a credibility/compliance risk. The whole topLine is
//      cleared (PageHero renders it conditionally, so it simply drops).

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dry = process.argv.includes("--dry");
const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(here, "..", "docs");

/** Recursively collect every .ts file under scripts/docs. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".ts")) out.push(full);
  }
  return out;
}

let totalEmDashes = 0;
let totalTokens = 0;
const touched = [];

for (const file of walk(docsRoot)) {
  const original = readFileSync(file, "utf8");
  let next = original;

  // 1. Em dashes → comma. Spaced form first (the common parenthetical/clause
  //    usage), then any bare em dash as a fallback.
  const emDashCount = (next.match(/—/g) || []).length;
  next = next.replace(/\s—\s/g, ", ").replace(/—/g, ", ");

  // 2. Clear any topLine that carries a placeholder/fabricated token, then
  //    strip any stray "[live number]" tokens elsewhere.
  const tokenCount =
    (next.match(/topLine:\s*"[^"]*\[live number\][^"]*"/g) || []).length +
    (next.match(/\[live number\]/g) || []).length;
  next = next.replace(/topLine:\s*"[^"]*\[live number\][^"]*"/g, 'topLine: ""');
  next = next.replace(/\s*\[live number\]/g, "");

  if (next !== original) {
    totalEmDashes += emDashCount;
    totalTokens += tokenCount;
    touched.push({ file: file.replace(docsRoot, "docs"), emDashCount, tokenCount });
    if (!dry) writeFileSync(file, next, "utf8");
  }
}

console.log(`${dry ? "[DRY RUN] " : ""}copy hygiene sweep`);
for (const t of touched) {
  console.log(
    `  ${t.file.padEnd(48)} em-dashes:${t.emDashCount}  tokens:${t.tokenCount}`,
  );
}
console.log(
  `\n${dry ? "would change" : "changed"} ${touched.length} files · ${totalEmDashes} em dashes · ${totalTokens} placeholder tokens`,
);
if (!dry && touched.length) {
  console.log("\nNext: npm run seed:products && npm run seed:industries");
}
