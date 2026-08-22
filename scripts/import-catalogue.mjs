#!/usr/bin/env node
/**
 * Reads catalogue.csv and writes src/data/supplierCosts.ts.
 *
 *   npm run catalogue:import           # dry run — shows what would change
 *   npm run catalogue:import -- --apply
 *
 * Only cost/verified/moq/note are written here. If you also corrected
 * capacities or dimensions in the CSV, those are reported as a diff for you
 * to apply to products.ts by hand — they are authored content, and silently
 * rewriting descriptions from a spreadsheet is how catalogues rot.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { loadCatalogue, parseCsv } from './catalogue-lib.mjs';

const IN = 'catalogue.csv';
const OUT = 'src/data/supplierCosts.ts';
const APPLY = process.argv.includes('--apply');

if (!existsSync(IN)) {
  console.error(`${IN} not found. Run \`npm run catalogue:template\` first.`);
  process.exit(1);
}

const rows = parseCsv(readFileSync(IN, 'utf8'));
const [header, ...body] = rows;
const col = Object.fromEntries(header.map((h, i) => [h.trim().toLowerCase(), i]));

for (const required of ['sku', 'cost_usd']) {
  if (col[required] === undefined) {
    console.error(`${IN} is missing a "${required}" column.`);
    process.exit(1);
  }
}

const { products } = await loadCatalogue();
const bySku = new Map(products.map((p) => [p.sku, p]));

const truthy = (v) => ['yes', 'y', 'true', '1'].includes(String(v ?? '').trim().toLowerCase());
const num = (v) => {
  const n = Number(String(v ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

const entries = [];
const specDiffs = [];
const problems = [];

for (const [n, row] of body.entries()) {
  const line = n + 2;
  const sku = (row[col.sku] ?? '').trim();
  if (!sku) continue;

  const product = bySku.get(sku);
  if (!product) { problems.push(`line ${line}: unknown SKU "${sku}"`); continue; }

  const cost = num(row[col.cost_usd]);
  if (cost === null || String(row[col.cost_usd]).trim() === '') continue;  // not filled in yet
  if (cost <= 0) { problems.push(`line ${line}: ${sku} has a non-positive cost`); continue; }

  const costCents = Math.round(cost * 100);
  const verified = truthy(row[col.verified]);
  const moq = col.moq !== undefined ? num(row[col.moq]) : null;
  const note = col.note !== undefined ? (row[col.note] ?? '').trim() : '';

  entries.push({ sku, costCents, verified, moq: moq && moq > 0 ? moq : undefined, note: note || undefined, product });

  // Report spec drift rather than applying it.
  const checks = [
    ['capacity_cu_in', product.capacityCuIn, 'capacityCuIn'],
    ['height_in', product.dimensions.height, 'dimensions.height'],
    ['width_in', product.dimensions.width, 'dimensions.width'],
    ['depth_in', product.dimensions.depth, 'dimensions.depth'],
    ['weight_lb', product.weightLb, 'weightLb'],
  ];
  for (const [csvKey, current, field] of checks) {
    if (col[csvKey] === undefined) continue;
    const v = num(row[col[csvKey]]);
    if (v !== null && String(row[col[csvKey]]).trim() !== '' && v !== current) {
      specDiffs.push(`  ${sku}  ${field}: ${current} → ${v}`);
    }
  }
}

if (problems.length) {
  console.error('\nProblems in the CSV:\n' + problems.map((p) => '  ' + p).join('\n') + '\n');
  if (!entries.length) process.exit(1);
}

if (!entries.length) {
  console.log(`\nNo costs filled in yet — every cost_usd cell in ${IN} is blank.\n`);
  process.exit(0);
}

console.log(`\n${APPLY ? 'Importing' : 'Dry run —'} ${entries.length} of ${products.length} products:\n`);
for (const e of entries) {
  const retail = (e.costCents * 2) / 100;   // markup applied for display only
  console.log(
    `  ${e.sku.padEnd(18)} cost $${(e.costCents / 100).toFixed(2).padStart(7)}` +
    `  → retail $${retail.toFixed(2).padStart(7)}` +
    `  ${e.verified ? '✓ verified' : '! unverified'}`,
  );
}

const unverified = entries.filter((e) => !e.verified).length;
const missing = products.length - entries.length;
if (unverified) console.log(`\n  ! ${unverified} row(s) have a cost but verified is not set — they will still show the indicative-price notice.`);
if (missing) console.log(`  ! ${missing} product(s) have no cost yet and keep their placeholder.`);

if (specDiffs.length) {
  console.log('\nSpec differences found (NOT applied — edit products.ts yourself):\n' + specDiffs.join('\n'));
}

if (!APPLY) {
  console.log('\nRe-run with --apply to write src/data/supplierCosts.ts\n');
  process.exit(0);
}

const body_ = entries
  .map((e) => {
    const parts = [`costCents: ${e.costCents}`, `verified: ${e.verified}`];
    if (e.moq) parts.push(`moq: ${e.moq}`);
    if (e.note) parts.push(`note: ${JSON.stringify(e.note)}`);
    return `  ${JSON.stringify(e.sku)}: { ${parts.join(', ')} },`;
  })
  .join('\n');

const header_ = readFileSync(OUT, 'utf8').split('/** Keyed by SKU.')[0];
writeFileSync(
  OUT,
  `${header_}/** Keyed by SKU. Generated from catalogue.csv — do not hand-edit. */\nexport const supplierCosts: Record<string, SupplierCost> = {\n${body_}\n};\n`,
);

console.log(`\nWrote ${OUT}. Run \`npm run build\` to see the new prices.\n`);
