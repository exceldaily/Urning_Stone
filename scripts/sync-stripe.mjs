#!/usr/bin/env node
/**
 * SYNC THE CATALOGUE INTO STRIPE
 * -------------------------------------------------------------------------
 * Creates (or updates) a Stripe Product for every item in src/data/products.ts,
 * with a Price equal to the derived retail figure — supplier cost x the markup
 * multiplier in src/data/pricing.ts.
 *
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/sync-stripe.mjs           # dry run
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/sync-stripe.mjs --apply   # write
 *
 * Products are matched on the `sku` metadata field, so re-running updates in
 * place instead of creating duplicates. Stripe Prices are immutable: when an
 * amount changes, a new Price is created and set as the product default, and
 * the old one is deactivated.
 *
 * REFUSES TO RUN AGAINST A LIVE KEY while any product still has an unverified
 * placeholder cost. Charging real customers a made-up price is not a mistake
 * worth making politely — override with --force-unverified only if you have
 * genuinely decided the placeholder figures are correct.
 */
import Stripe from 'stripe';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const APPLY = process.argv.includes('--apply');
const FORCE = process.argv.includes('--force-unverified');

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('STRIPE_SECRET_KEY is not set.\nExport it first, e.g.  export STRIPE_SECRET_KEY=sk_test_...');
  process.exit(1);
}
const isLive = key.startsWith('sk_live_');

// The data files are TypeScript, so read the derived catalogue out of the
// built output if present, else parse the source with a tiny transform.
const require = createRequire(import.meta.url);
let products, MARKUP;
try {
  ({ products, MARKUP } = await loadCatalogue());
} catch (err) {
  console.error('Could not load the catalogue:', err.message);
  console.error('Run `npm run build` first, or run this via `npm run stripe:sync`.');
  process.exit(1);
}

const unverified = products.filter((p) => !p.costVerified);
if (unverified.length && isLive && !FORCE) {
  console.error(
    `\nRefusing to sync to a LIVE Stripe account: ${unverified.length} of ${products.length} products still ` +
    `carry an unverified placeholder cost.\n\n` +
    unverified.map((p) => `  - ${p.sku}  ${p.name}`).join('\n') +
    `\n\nPut the real supplier cost into costCents and set costVerified: true in src/data/products.ts.\n` +
    `If you are certain the current figures are right, re-run with --force-unverified.\n`,
  );
  process.exit(1);
}

console.log(`\nStripe catalogue sync — ${isLive ? 'LIVE' : 'TEST'} mode, markup x${MARKUP}`);
console.log(APPLY ? 'Applying changes.\n' : 'Dry run. Re-run with --apply to write.\n');
if (unverified.length) console.log(`  ! ${unverified.length} product(s) still have placeholder costs.\n`);

const stripe = new Stripe(key);

// Index existing products by their sku metadata.
const existing = new Map();
for await (const p of stripe.products.list({ limit: 100, active: true })) {
  if (p.metadata?.sku) existing.set(p.metadata.sku, p);
}

let created = 0, updated = 0, repriced = 0, unchanged = 0;

for (const product of products) {
  const retail = product.priceCents;
  const payload = {
    name: product.name,
    description: product.description.slice(0, 500),
    metadata: {
      sku: product.sku,
      productId: product.id,
      slug: product.slug,
      capacityCuIn: String(product.capacityCuIn),
      material: product.material,
      costCents: String(product.costCents),
      costVerified: String(product.costVerified),
      sourceUrl: product.sourceUrl,
    },
  };

  const found = existing.get(product.sku);

  if (!found) {
    console.log(`  + create  ${product.sku.padEnd(18)} ${product.name}  →  $${(retail / 100).toFixed(2)}`);
    if (APPLY) {
      await stripe.products.create({
        ...payload,
        default_price_data: { currency: 'usd', unit_amount: retail },
      });
    }
    created++;
    continue;
  }

  // Update descriptive fields.
  const needsUpdate = found.name !== payload.name || found.description !== payload.description;
  if (needsUpdate) {
    console.log(`  ~ update  ${product.sku.padEnd(18)} ${product.name}`);
    if (APPLY) await stripe.products.update(found.id, payload);
    updated++;
  }

  // Reprice if the amount moved. Prices are immutable, so create a new one.
  const currentPrice = found.default_price
    ? await stripe.prices.retrieve(typeof found.default_price === 'string' ? found.default_price : found.default_price.id)
    : null;

  if (!currentPrice || currentPrice.unit_amount !== retail) {
    const was = currentPrice ? `$${(currentPrice.unit_amount / 100).toFixed(2)}` : 'none';
    console.log(`  $ reprice ${product.sku.padEnd(18)} ${was} → $${(retail / 100).toFixed(2)}`);
    if (APPLY) {
      const price = await stripe.prices.create({ product: found.id, currency: 'usd', unit_amount: retail });
      await stripe.products.update(found.id, { default_price: price.id });
      if (currentPrice) await stripe.prices.update(currentPrice.id, { active: false });
    }
    repriced++;
  } else if (!needsUpdate) {
    unchanged++;
  }
}

console.log(
  `\n${APPLY ? 'Done' : 'Would'}: ${created} created, ${updated} updated, ${repriced} repriced, ${unchanged} unchanged.\n`,
);
if (!APPLY) console.log('Re-run with --apply to write these to Stripe.\n');

/**
 * Loads products + markup from the TS sources without a build step, by
 * stripping types with a minimal transform and evaluating the result.
 */
async function loadCatalogue() {
  const ts = await import('typescript').catch(() => null);
  if (!ts) throw new Error('typescript is not installed');

  const compile = (file) =>
    ts.default.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.default.ModuleKind.ESNext, target: ts.default.ScriptTarget.ES2021 },
    }).outputText;

  const toDataUrl = (code) => 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');

  const pricingSrc = compile('src/data/pricing.ts');
  const pricing = await import(toDataUrl(pricingSrc));

  // products.ts imports ./pricing — inline it so the data URL resolves.
  const productsSrc = compile('src/data/products.ts').replace(
    /import\s*\{[^}]*\}\s*from\s*['"]\.\/pricing['"];?/,
    pricingSrc.replace(/export /g, ''),
  );
  const mod = await import(toDataUrl(productsSrc));

  return { products: mod.products, MARKUP: pricing.MARKUP_MULTIPLIER };
}
