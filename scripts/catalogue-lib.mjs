/** Shared: load the catalogue out of the TS sources without a build step. */
import { readFileSync } from 'node:fs';

export async function loadCatalogue() {
  const ts = (await import('typescript')).default;
  const compile = (file) =>
    ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2021 },
    }).outputText;
  const toDataUrl = (code) => 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');

  const pricingSrc = compile('src/data/pricing.ts');
  const costsSrc = compile('src/data/supplierCosts.ts');
  const pricing = await import(toDataUrl(pricingSrc));

  // products.ts imports ./pricing and ./supplierCosts — inline both so the
  // data URL has nothing left to resolve.
  const productsSrc = compile('src/data/products.ts')
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]\.\/pricing['"];?/, pricingSrc.replace(/export /g, ''))
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]\.\/supplierCosts['"];?/, costsSrc.replace(/export /g, ''));

  const mod = await import(toDataUrl(productsSrc));
  return { products: mod.products, MARKUP: pricing.MARKUP_MULTIPLIER };
}

/** Minimal RFC4180-ish CSV parser — handles quoted fields and embedded commas. */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}

export const csvCell = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
