'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { categoryLabels } from '@/data/finder';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { useStore } from '@/components/store/StoreProvider';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { UrnImage } from './UrnImage';
import { QuickView } from './QuickView';

export function ProductCard({ product, view = 'grid', showCompare = true }: { product: Product; view?: 'grid' | 'list'; showCompare?: boolean }) {
  const { price } = useCurrency();
  const { saved, toggleSaved, compare, toggleCompare } = useStore();
  const [quickView, setQuickView] = useState(false);
  const isSaved = saved.includes(product.id);
  const isCompared = compare.includes(product.id);
  const compareFull = compare.length >= 3 && !isCompared;

  const meta = (
    <>
      <p className="eyebrow">{categoryLabels[product.category]} · {product.materialLabel}</p>
      <h3 className="mt-2 font-display text-[1.35rem] leading-snug">
        <Link href={`/products/${product.slug}`} className="transition-colors hover:text-bronze-deep focus-visible:text-bronze-deep">
          <span className="absolute inset-0 md:hidden" aria-hidden />
          {product.name}
        </Link>
      </h3>
      <div className="mt-3"><CapacityScale capacity={product.capacityCuIn} /></div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-ink2">
        <span className="tabular-nums text-ink">{price(product.priceCents)}</span>
        {product.personalization.available && <span className="text-muted">· Engraving available</span>}
        {!product.inStock && <span className="text-bronze-deep">· Currently unavailable</span>}
      </div>
    </>
  );

  return (
    <>
      <article className={`group card relative overflow-hidden transition-all duration-500 ease-calm hover:-translate-y-0.5 hover:shadow-lift ${view === 'list' ? 'sm:flex' : ''}`}>
        <div className={`relative overflow-hidden bg-linen ${view === 'list' ? 'sm:w-56 sm:shrink-0' : ''}`}>
          <div className={view === 'list' ? 'aspect-[4/3] sm:h-full' : 'aspect-[4/5]'}>
            <UrnImage product={product} className="transition-transform duration-700 ease-calm group-hover:scale-[1.02]" />
          </div>
          <button
            type="button"
            onClick={() => toggleSaved(product.id)}
            aria-pressed={isSaved}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-cream/90 text-ink2 transition-colors hover:text-bronze-deep"
          >
            <svg aria-hidden viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${isSaved ? 'text-bronze-deep' : ''}`} fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
              <path d="M5 3h10v14l-5-3.6L5 17Z" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">{isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}</span>
          </button>
        </div>

        <div className={`relative p-5 ${view === 'list' ? 'sm:flex-1' : ''}`}>
          {meta}
          <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setQuickView(true)} className="btn-secondary px-4 py-2 text-[0.82rem]">
              Quick view<span className="sr-only"> of {product.name}</span>
            </button>
            {showCompare && (
              <button
                type="button"
                onClick={() => toggleCompare(product.id)}
                disabled={compareFull}
                aria-pressed={isCompared}
                className="btn-quiet px-3 py-2 text-[0.82rem] disabled:cursor-not-allowed disabled:text-muted/60"
              >
                {isCompared ? 'Comparing' : 'Compare'}
                <span className="sr-only"> {product.name}{compareFull ? ' — comparison is full at three items' : ''}</span>
              </button>
            )}
          </div>
        </div>
      </article>
      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}
