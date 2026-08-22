#!/usr/bin/env node
/**
 * Writes catalogue.csv — one row per product, pre-filled with what we already
 * know and blank where a real supplier figure is needed.
 *
 *   npm run catalogue:template
 *
 * Fill in `cost_usd` (the only required column), then:
 *   npm run catalogue:import
 */
import { writeFileSync, existsSync } from 'node:fs';
import { loadCatalogue, csvCell } from './catalogue-lib.mjs';

const OUT = 'catalogue.csv';
const FORCE = process.argv.includes('--force');

if (existsSync(OUT) && !FORCE) {
  console.error(`${OUT} already exists — refusing to overwrite your work.\nRe-run with --force if you really want a fresh template.`);
  process.exit(1);
}

const { products } = await loadCatalogue();

const headers = [
  'sku', 'name', 'cost_usd', 'verified', 'moq', 'note',
  'capacity_cu_in', 'height_in', 'width_in', 'depth_in', 'weight_lb', 'in_stock', 'source_url',
];

const lines = [headers.join(',')];
for (const p of products) {
  lines.push([
    p.sku,
    p.name,
    '',                        // cost_usd — THE ONE TO FILL IN
    '',                        // verified — yes once the cost is a real quote
    '',                        // moq
    '',                        // note
    p.capacityCuIn,            // pre-filled; overwrite if the listing differs
    p.dimensions.height,
    p.dimensions.width,
    p.dimensions.depth,
    p.weightLb,
    p.inStock ? 'yes' : 'no',
    p.sourceUrl,
  ].map(csvCell).join(','));
}

writeFileSync(OUT, lines.join('\n') + '\n');
console.log(`\nWrote ${OUT} with ${products.length} rows.\n`);
console.log('Fill in the cost_usd column (landed unit cost, e.g. 18.50), set verified to');
console.log('yes on any row taken from a real quote, then run:  npm run catalogue:import\n');
console.log('Everything after cost/verified/moq/note is optional — blank cells are left alone.\n');
