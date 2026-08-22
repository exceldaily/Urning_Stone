'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFocusTrap } from '@/components/ui/useFocusTrap';
import type { Product } from '@/data/products';
import { formatDimensions, formatPrice } from '@/lib/format';
import { useStore } from '@/components/store/StoreProvider';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { UrnImage } from './UrnImage';

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const panel = useRef<HTMLDivElement>(null);

  useFocusTrap(panel, true);

  useEffect(() => {
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        tabIndex={-1}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.4rem] border border-hairline bg-cream shadow-lift sm:rounded-[1.4rem]"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-cream text-ink2 hover:text-ink">
          <span aria-hidden>×</span><span className="sr-only">Close quick view</span>
        </button>
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="aspect-[4/5] bg-linen sm:aspect-auto"><UrnImage product={product} /></div>
          <div className="p-6 sm:p-8">
            <p className="eyebrow">{product.materialLabel}</p>
            <h2 className="mt-2 font-display text-2xl">{product.name}</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink2">{product.description}</p>
            <dl className="mt-5 space-y-2 text-[0.88rem]">
              <div className="flex justify-between gap-4 border-b border-hairline pb-2">
                <dt className="text-muted">Exterior</dt><dd className="tabular-nums">{formatDimensions(product.dimensions)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-hairline pb-2">
                <dt className="text-muted">Closure</dt><dd className="text-right">{product.closure}</dd>
              </div>
            </dl>
            <div className="mt-5"><CapacityScale capacity={product.capacityCuIn} size="lg" label="Interior capacity" /></div>
            <p className="mt-5 text-lg tabular-nums">{formatPrice(product.priceCents)}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.personalization.available ? (
                <Link href={`/products/${product.slug}`} className="btn-primary">Choose engraving</Link>
              ) : (
                <button type="button" disabled={!product.inStock} onClick={() => { addToCart(product); onClose(); }} className="btn-primary disabled:opacity-50">
                  {product.inStock ? 'Add to basket' : 'Currently unavailable'}
                </button>
              )}
              <Link href={`/products/${product.slug}`} className="btn-secondary">Full details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
