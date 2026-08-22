'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/data/products';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { useStore, type Personalization } from '@/components/store/StoreProvider';
import { PersonalizationForm, personalizationErrors } from './PersonalizationForm';
import { CapacityScale } from '@/components/ui/CapacityScale';
import { track } from '@/lib/analytics';

const emptyPersonalization: Personalization = { font: 'serif', motif: 'none', confirmed: false };

export function BuyBox({ product }: { product: Product }) {
  const { price, isBase } = useCurrency();
  const baseFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.priceCents / 100);
  const router = useRouter();
  const { addToCart, saved, toggleSaved, markViewed } = useStore();
  const [wantsEngraving, setWantsEngraving] = useState(false);
  const [personalization, setPersonalization] = useState<Personalization>(emptyPersonalization);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    markViewed(product.id);
    track('product_viewed', { sku: product.sku });
  }, [product.id, product.sku, markViewed]);

  const isSaved = saved.includes(product.id);

  const submit = (then?: () => void) => {
    if (wantsEngraving) {
      const found = personalizationErrors(personalization, product.personalization.fields);
      setErrors(found);
      if (found.length) { document.getElementById('personalization-errors')?.focus(); return; }
    }
    setErrors([]);
    addToCart(product, quantity, wantsEngraving ? personalization : undefined);
    setAdded(true);
    then?.();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl tabular-nums">{price(product.priceCents)}</p>
        {!isBase && (
          <p className="mt-1 text-[0.82rem] text-ink2">
            Converted from {baseFormatted} — your card is charged in US dollars.
          </p>
        )}
        {!product.costVerified && (
          <p className="pending mt-3 text-[0.85rem]">
            Indicative price. This piece is awaiting a confirmed supplier quote, so the
            figure above may change before it can be ordered.
          </p>
        )}
        {!product.inStock && <p className="mt-1 text-[0.88rem] text-bronze-deep">Currently unavailable. {product.stockNote}</p>}
      </div>

      <CapacityScale capacity={product.capacityCuIn} size="lg" showTicks label="Interior capacity" />
      <p className="text-[0.85rem] leading-relaxed text-ink2">
        {product.suitableUpToLb
          ? `Generally suitable for a pet of up to about ${product.suitableUpToLb} lb, using the usual one cubic inch per pound estimate.`
          : 'Holds a small portion of ashes rather than the full amount.'}{' '}
        <Link href="/size-guide" className="link-underline" onClick={() => track('size_guide_opened', { from: 'pdp' })}>How capacity works</Link>
      </p>

      {product.personalization.available && (
        <div className="rounded-[1.1rem] border border-hairline bg-linen/50 p-5">
          <fieldset>
            <legend className="font-display text-lg">Would you like this engraved?</legend>
            <div className="mt-3 flex gap-2">
              {[{ v: false, l: 'Leave it plain' }, { v: true, l: 'Add engraving' }].map((o) => (
                <button
                  key={String(o.v)} type="button" onClick={() => setWantsEngraving(o.v)} aria-pressed={wantsEngraving === o.v}
                  className={`btn px-5 py-2.5 text-[0.88rem] ${wantsEngraving === o.v ? 'bg-ink text-ivory' : 'border border-hairline bg-cream text-ink2 hover:text-ink'}`}
                >{o.l}</button>
              ))}
            </div>
          </fieldset>
          {wantsEngraving && (
            <div className="mt-5">
              <PersonalizationForm product={product} value={personalization} onChange={setPersonalization} />
              {product.personalization.finalSale === null && (
                <p className="mt-4 text-[0.78rem] leading-relaxed text-muted">
                  {/* TODO: replace once the returns policy for engraved items is set. */}
                  Returns policy for engraved items: to be confirmed by the business. See <Link href="/help/returns" className="link-underline">returns</Link>.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <div id="personalization-errors" tabIndex={-1} role="alert" className="rounded-xl border border-bronze/60 bg-bronze/[0.06] p-4">
          <p className="text-[0.9rem] font-medium">Before adding this to your basket:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.88rem] text-ink2">
            {errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-hairline bg-cream">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-lg text-ink2 hover:text-ink" aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center tabular-nums" aria-live="polite" aria-label={`Quantity ${quantity}`}>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="flex h-12 w-12 items-center justify-center text-lg text-ink2 hover:text-ink" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" disabled={!product.inStock} onClick={() => submit()} className="btn-primary flex-1 disabled:opacity-50">
          {product.inStock ? 'Add to basket' : 'Currently unavailable'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={!product.inStock} onClick={() => submit(() => router.push('/checkout'))} className="btn-secondary flex-1 disabled:opacity-50">Buy now</button>
        <button type="button" onClick={() => toggleSaved(product.id)} aria-pressed={isSaved} className="btn-secondary flex-1">
          {isSaved ? 'Saved' : 'Save for later'}
        </button>
      </div>

      <p aria-live="polite" className="text-[0.85rem] text-sage-deep">{added ? 'Added to your basket.' : ''}</p>
    </div>
  );
}

/** Calm sticky bar for small screens. Appears only after the main buy area scrolls away. */
export function StickyBuyBar({ product }: { product: Product }) {
  const { price } = useCurrency();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-cream/95 px-4 py-3 backdrop-blur transition-transform duration-300 ease-calm md:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.85rem]">{product.name}</p>
          <p className="text-[0.8rem] tabular-nums text-ink2">{price(product.priceCents)} · {product.capacityCuIn} cu in</p>
        </div>
        <a href="#buy" className="btn-primary px-5 py-2.5 text-[0.85rem]">Choose options</a>
      </div>
    </div>
  );
}
