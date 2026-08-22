'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useStore, type Personalization } from '@/components/store/StoreProvider';
import { UrnImage } from '@/components/product/UrnImage';
import { PersonalizationForm } from '@/components/product/PersonalizationForm';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faqs';

export default function CartPage() {
  const { price } = useCurrency();
  const { lines, lineProduct, subtotalCents, setQuantity, removeLine, updatePersonalization, hydrated } = useStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [promo, setPromo] = useState('');
  const [promoState, setPromoState] = useState<'idle' | 'invalid'>('idle');

  const checkoutFaqs = faqs.filter((f) => f.group === 'Ordering').slice(0, 3);

  if (!hydrated) {
    return <div className="shell section"><div className="skeleton h-64 w-full" /></div>;
  }

  return (
    <div className="shell section">
      <h1 className="font-display text-4xl">Your basket</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-[1.1rem] border border-hairline bg-cream p-10 text-center">
          <p className="font-display text-xl">Nothing here yet</p>
          <p className="mx-auto mt-2 max-w-md text-[0.95rem] text-ink2">Nothing is held or reserved, so there is no hurry to decide.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/collections/memorial-urns-for-ashes" className="btn-primary">Browse the collection</Link>
            <Link href="/urn-finder" className="btn-secondary">Answer five questions</Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {lines.map((line) => {
              const p = lineProduct(line);
              if (!p) return null;
              return (
                <li key={line.lineId} className="py-6">
                  <div className="flex gap-5">
                    <Link href={`/products/${p.slug}`} className="h-32 w-24 shrink-0 overflow-hidden rounded-lg border border-hairline bg-linen">
                      <UrnImage product={p} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <Link href={`/products/${p.slug}`} className="font-display text-xl hover:text-bronze-deep">{p.name}</Link>
                        <span className="tabular-nums">{price(p.priceCents * line.quantity)}</span>
                      </div>
                      <p className="mt-1 text-[0.85rem] text-muted">{p.materialLabel} · {p.capacityCuIn} cu in · {p.sku}</p>

                      {line.personalization && (
                        <div className="mt-3 rounded-xl border border-hairline bg-linen/60 p-4">
                          <p className="eyebrow">Engraving</p>
                          <div className="mt-1.5 text-[0.9rem] text-ink2">
                            {line.personalization.name && <p>{line.personalization.name}</p>}
                            {line.personalization.dates && <p>{line.personalization.dates}</p>}
                            {line.personalization.inscription && <p className="italic">{line.personalization.inscription}</p>}
                          </div>
                          <button type="button" onClick={() => setEditing(editing === line.lineId ? null : line.lineId)} className="mt-2 text-[0.82rem] underline decoration-bronze/50 underline-offset-2">
                            {editing === line.lineId ? 'Close' : 'Edit engraving'}
                          </button>
                          {editing === line.lineId && (
                            <div className="mt-4">
                              <PersonalizationForm
                                product={p}
                                value={line.personalization}
                                onChange={(v: Personalization) => updatePersonalization(line.lineId, v)}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center rounded-full border border-hairline bg-cream">
                          <button type="button" onClick={() => setQuantity(line.lineId, line.quantity - 1)} className="h-11 w-11 text-ink2" aria-label={`Decrease quantity of ${p.name}`}>−</button>
                          <span className="w-7 text-center tabular-nums">{line.quantity}</span>
                          <button type="button" onClick={() => setQuantity(line.lineId, line.quantity + 1)} className="h-11 w-11 text-ink2" aria-label={`Increase quantity of ${p.name}`}>+</button>
                        </div>
                        <button type="button" onClick={() => removeLine(line.lineId)} className="text-[0.85rem] text-muted underline underline-offset-2 hover:text-ink">Remove</button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="space-y-6">
            <div className="rounded-[1.1rem] border border-hairline bg-cream p-6">
              <h2 className="font-display text-xl">Summary</h2>
              <dl className="mt-4 space-y-2 text-[0.92rem]">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{price(subtotalCents)}</dd></div>
                {/* TODO: replace with live rates from the shipping provider. */}
                <div className="flex justify-between"><dt>Delivery</dt><dd className="text-muted">Calculated at checkout</dd></div>
                <div className="flex justify-between"><dt>Taxes</dt><dd className="text-muted">Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 border-t border-hairline pt-4">
                <label htmlFor="promo" className="text-[0.85rem]">Promotion code</label>
                <div className="mt-2 flex gap-2">
                  <input id="promo" value={promo} onChange={(e) => { setPromo(e.target.value); setPromoState('idle'); }} className="field" placeholder="Optional" />
                  <button type="button" onClick={() => setPromoState(promo ? 'invalid' : 'idle')} className="btn-secondary px-5">Apply</button>
                </div>
                {promoState === 'invalid' && <p role="status" className="mt-2 text-[0.82rem] text-bronze-deep">That code was not recognised. Codes are case-sensitive.</p>}
              </div>
              <Link href="/checkout" className="btn-primary mt-5 w-full">Go to checkout</Link>
              <p className="mt-3 text-center text-[0.8rem] text-muted">No account needed. No fees added later.</p>
            </div>

            <div className="rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
              <h2 className="font-display text-lg">Common questions</h2>
              <div className="mt-2">
                <Accordion items={checkoutFaqs.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
