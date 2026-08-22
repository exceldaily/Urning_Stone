'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/data/products';
import { products as allProducts } from '@/data/products';
import { applyFilters, capacityBuckets, countActive, emptyFilters, sortLabels, type FilterState, type SortKey } from '@/lib/filters';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/components/store/StoreProvider';
import { formatDimensions } from '@/lib/format';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { categoryLabels, materialLabels } from '@/data/finder';
import { GridSkeleton } from '@/components/ui/Skeleton';

const colorLabels: Record<string, string> = {
  natural: 'Natural', cream: 'Cream', sage: 'Sage', charcoal: 'Charcoal', bronze: 'Bronze',
  stone: 'Stone', rose: 'Dusty rose', pink: 'Rosewater', white: 'White', steel: 'Steel',
};

function uniq<T>(items: T[]) { return Array.from(new Set(items)); }

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button type="button" onClick={onRemove} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-cream px-3 py-1.5 text-[0.8rem] text-ink2 hover:text-ink">
      {label}<span aria-hidden>×</span><span className="sr-only">Remove filter</span>
    </button>
  );
}

function CheckList({ legend, options, selected, onToggle }: { legend: string; options: { value: string; label: string; count: number }[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <fieldset className="border-t border-hairline py-5">
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-3 space-y-2">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-3 text-[0.9rem]">
            <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} className="h-4 w-4 accent-[#5C6A56]" />
            <span className="flex-1">{o.label}</span>
            <span className="text-[0.78rem] tabular-nums text-muted">{o.count}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CollectionView({ pool }: { pool: Product[] }) {
  const { price } = useCurrency();
  const params = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const [filters, setFilters] = useState<FilterState>({ ...emptyFilters, q: initialQ });
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [drawer, setDrawer] = useState(false);
  const [ready, setReady] = useState(false);
  const { compare, toggleCompare, clearCompare } = useStore();

  useEffect(() => { setFilters((f) => ({ ...f, q: initialQ })); }, [initialQ]);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [drawer]);

  const results = useMemo(() => applyFilters(pool, filters), [pool, filters]);
  const active = countActive(filters);

  const counts = (key: (p: Product) => string) => (value: string) => pool.filter((p) => key(p) === value).length;

  const toggle = (key: 'categories' | 'materials' | 'colors' | 'capacities') => (value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const compareItems = compare.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[];

  const filterPanel = (
    <div>
      <div className="pb-5">
        <label htmlFor="c-search" className="eyebrow">Search</label>
        <input id="c-search" type="search" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} className="field mt-2" placeholder="Name, material or style" />
      </div>
      <CheckList legend="Type" selected={filters.categories} onToggle={toggle('categories')}
        options={uniq(pool.map((p) => p.category)).map((v) => ({ value: v, label: categoryLabels[v], count: counts((p) => p.category)(v) }))} />
      <CheckList legend="Material" selected={filters.materials} onToggle={toggle('materials')}
        options={uniq(pool.map((p) => p.material)).map((v) => ({ value: v, label: materialLabels[v], count: counts((p) => p.material)(v) }))} />
      <CheckList legend="Colour" selected={filters.colors} onToggle={toggle('colors')}
        options={uniq(pool.map((p) => p.color)).map((v) => ({ value: v, label: colorLabels[v] ?? v, count: counts((p) => p.color)(v) }))} />
      <CheckList legend="Capacity" selected={filters.capacities} onToggle={toggle('capacities')}
        options={capacityBuckets.filter((b) => pool.some(b.test)).map((b) => ({ value: b.id, label: b.label, count: pool.filter(b.test).length }))} />
      <fieldset className="border-t border-hairline py-5">
        <legend className="eyebrow">Price</legend>
        <label htmlFor="c-price" className="mt-3 block text-[0.85rem] text-ink2">
          Up to <span className="tabular-nums">{filters.maxPrice === null ? 'any amount' : price(filters.maxPrice * 100)}</span>
        </label>
        <input
          id="c-price" type="range" min={50} max={700} step={25}
          value={filters.maxPrice ?? 700}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) >= 700 ? null : Number(e.target.value) }))}
          className="mt-2 w-full accent-[#5C6A56]"
        />
      </fieldset>
      <fieldset className="border-y border-hairline py-5">
        <legend className="eyebrow">Options</legend>
        <div className="mt-3 space-y-2">
          <label className="flex cursor-pointer items-center gap-3 text-[0.9rem]">
            <input type="checkbox" checked={filters.personalizedOnly} onChange={(e) => setFilters((f) => ({ ...f, personalizedOnly: e.target.checked }))} className="h-4 w-4 accent-[#5C6A56]" />
            Can be engraved
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-[0.9rem]">
            <input type="checkbox" checked={filters.inStockOnly} onChange={(e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))} className="h-4 w-4 accent-[#5C6A56]" />
            Available now
          </label>
        </div>
      </fieldset>
      {active > 0 && (
        <button type="button" onClick={() => setFilters({ ...emptyFilters, sort: filters.sort })} className="btn-quiet mt-4 px-0 underline decoration-bronze/40 underline-offset-4">Clear all filters</button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
      <aside className="hidden lg:block">
        <h2 className="sr-only">Filters</h2>
        {filterPanel}
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
          <p className="text-[0.88rem] text-ink2" aria-live="polite">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setDrawer(true)} className="btn-secondary px-4 py-2 text-[0.85rem] lg:hidden">
              Filters{active > 0 ? ` (${active})` : ''}
            </button>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select id="sort" value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as SortKey }))}
              className="rounded-full border border-hairline bg-cream px-4 py-2 text-[0.85rem] min-h-[44px]">
              {(Object.keys(sortLabels) as SortKey[]).map((k) => <option key={k} value={k}>{sortLabels[k]}</option>)}
            </select>
            <div className="hidden items-center rounded-full border border-hairline bg-cream sm:flex" role="group" aria-label="View">
              {(['grid', 'list'] as const).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}
                  className={`px-3 py-2 text-[0.8rem] min-h-[44px] ${view === v ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  {v === 'grid' ? 'Grid' : 'List'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {active > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {filters.q && <Chip label={`“${filters.q}”`} onRemove={() => setFilters((f) => ({ ...f, q: '' }))} />}
            {filters.categories.map((v) => <Chip key={v} label={categoryLabels[v as keyof typeof categoryLabels]} onRemove={() => toggle('categories')(v)} />)}
            {filters.materials.map((v) => <Chip key={v} label={materialLabels[v as keyof typeof materialLabels]} onRemove={() => toggle('materials')(v)} />)}
            {filters.colors.map((v) => <Chip key={v} label={colorLabels[v] ?? v} onRemove={() => toggle('colors')(v)} />)}
            {filters.capacities.map((v) => <Chip key={v} label={capacityBuckets.find((b) => b.id === v)?.label ?? v} onRemove={() => toggle('capacities')(v)} />)}
            {filters.personalizedOnly && <Chip label="Can be engraved" onRemove={() => setFilters((f) => ({ ...f, personalizedOnly: false }))} />}
            {filters.inStockOnly && <Chip label="Available now" onRemove={() => setFilters((f) => ({ ...f, inStockOnly: false }))} />}
            {filters.maxPrice !== null && <Chip label={`Up to ${price(filters.maxPrice * 100)}`} onRemove={() => setFilters((f) => ({ ...f, maxPrice: null }))} />}
          </div>
        )}

        <div className="pt-8">
          {!ready ? (
            <GridSkeleton />
          ) : results.length === 0 ? (
            <div className="rounded-[1.1rem] border border-hairline bg-linen/60 p-10 text-center">
              <p className="font-display text-xl">No pieces match those filters</p>
              <p className="mx-auto mt-2 max-w-md text-[0.92rem] text-ink2">Removing the capacity or price filter usually opens things up again. If you are looking for something specific, tell us and we will look for you.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => setFilters({ ...emptyFilters, sort: filters.sort })} className="btn-primary">Clear filters</button>
                <Link href="/help/contact" className="btn-secondary">Ask us</Link>
              </div>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-5'}>
              {results.map((p) => <ProductCard key={p.id} product={p} view={view} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setDrawer(false)} aria-hidden />
          <div role="dialog" aria-modal="true" aria-label="Filters" className="absolute inset-y-0 right-0 flex w-[90%] max-w-sm flex-col bg-ivory">
            <div className="flex h-[72px] items-center justify-between border-b border-hairline px-5">
              <h2 className="font-display text-xl">Filters</h2>
              <button type="button" onClick={() => setDrawer(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-ink2" aria-label="Close filters"><span aria-hidden>×</span></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{filterPanel}</div>
            <div className="border-t border-hairline p-5">
              <button type="button" onClick={() => setDrawer(false)} className="btn-primary w-full">Show {results.length} {results.length === 1 ? 'piece' : 'pieces'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison tray */}
      {compareItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-cream/95 backdrop-blur">
          <div className="shell py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.85rem]">Comparing {compareItems.length} of 3</p>
              <button type="button" onClick={clearCompare} className="btn-quiet text-[0.82rem] underline decoration-bronze/40 underline-offset-4">Clear</button>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {compareItems.map((p) => (
                <div key={p.id} className="rounded-xl border border-hairline bg-ivory p-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${p.slug}`} className="text-[0.88rem] hover:text-bronze-deep">{p.name}</Link>
                    <button type="button" onClick={() => toggleCompare(p.id)} className="text-muted hover:text-ink" aria-label={`Remove ${p.name} from comparison`}><span aria-hidden>×</span></button>
                  </div>
                  <dl className="mt-2 space-y-1 text-[0.78rem] text-ink2">
                    <div className="flex justify-between"><dt className="text-muted">Price</dt><dd className="tabular-nums">{price(p.priceCents)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted">Material</dt><dd>{materialLabels[p.material]}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted">Size</dt><dd className="tabular-nums">{formatDimensions(p.dimensions)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted">Engraving</dt><dd>{p.personalization.available ? 'Yes' : 'No'}</dd></div>
                  </dl>
                  <div className="mt-2"><CapacityScale capacity={p.capacityCuIn} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
