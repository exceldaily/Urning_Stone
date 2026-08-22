'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFocusTrap } from '@/components/ui/useFocusTrap';
import { useStore } from '@/components/store/StoreProvider';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { UrnImage } from '@/components/product/UrnImage';

export function CartDrawer() {
  const { price } = useCurrency();
  const { cartOpen, setCartOpen, lines, lineProduct, subtotalCents, removeLine, setQuantity } = useStore();
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, cartOpen);

  useEffect(() => {
    if (!cartOpen) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCartOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/30" onClick={() => setCartOpen(false)} aria-hidden />
      <div
        ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Your basket"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-hairline bg-ivory"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-hairline px-5">
          <h2 className="font-display text-xl">Your basket</h2>
          <button type="button" onClick={() => setCartOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-ink2 hover:text-ink" aria-label="Close basket"><span aria-hidden>×</span></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="font-display text-xl">Nothing here yet</p>
            <p className="max-w-[32ch] text-[0.9rem] text-ink2">When you find something suitable it will wait here for you. Nothing is held or reserved, so there is no rush.</p>
            <Link href="/collections/memorial-urns-for-ashes" onClick={() => setCartOpen(false)} className="btn-primary">Browse the collection</Link>
            <Link href="/urn-finder" onClick={() => setCartOpen(false)} className="btn-quiet underline decoration-bronze/40 underline-offset-4">Or answer five short questions</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-hairline overflow-y-auto px-5">
              {lines.map((line) => {
                const p = lineProduct(line);
                if (!p) return null;
                return (
                  <li key={line.lineId} className="flex gap-4 py-5">
                    <Link href={`/products/${p.slug}`} onClick={() => setCartOpen(false)} className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-hairline bg-linen">
                      <UrnImage product={p} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.95rem]">{p.name}</p>
                      <p className="text-[0.8rem] text-muted">{p.materialLabel} · {p.capacityCuIn} cu in</p>
                      {line.personalization && (
                        <div className="mt-2 rounded-lg border border-hairline bg-linen/60 p-2.5 text-[0.78rem] text-ink2">
                          <p className="eyebrow mb-1">Engraving</p>
                          {line.personalization.name && <p>{line.personalization.name}</p>}
                          {line.personalization.dates && <p>{line.personalization.dates}</p>}
                          {line.personalization.inscription && <p className="italic">{line.personalization.inscription}</p>}
                          <Link href={`/cart`} onClick={() => setCartOpen(false)} className="mt-1 inline-block underline decoration-bronze/50 underline-offset-2">Edit</Link>
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-hairline bg-cream">
                          <button type="button" onClick={() => setQuantity(line.lineId, line.quantity - 1)} className="h-9 w-9 text-ink2" aria-label={`Decrease quantity of ${p.name}`}>−</button>
                          <span className="w-6 text-center text-[0.85rem] tabular-nums">{line.quantity}</span>
                          <button type="button" onClick={() => setQuantity(line.lineId, line.quantity + 1)} className="h-9 w-9 text-ink2" aria-label={`Increase quantity of ${p.name}`}>+</button>
                        </div>
                        <span className="text-[0.9rem] tabular-nums">{price(p.priceCents * line.quantity)}</span>
                      </div>
                      <button type="button" onClick={() => removeLine(line.lineId)} className="mt-2 text-[0.78rem] text-muted underline underline-offset-2 hover:text-ink">Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="shrink-0 space-y-3 border-t border-hairline p-5">
              <div className="flex justify-between text-[0.95rem]">
                <span>Subtotal</span><span className="tabular-nums">{price(subtotalCents)}</span>
              </div>
              {/* TODO: replace with real shipping rates once carriers are configured. */}
              <p className="text-[0.8rem] text-muted">Delivery and any taxes are calculated at checkout.</p>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full">Go to checkout</Link>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="btn-secondary w-full">View full basket</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
