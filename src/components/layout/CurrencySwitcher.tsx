'use client';
/**
 * CURRENCY SWITCHER
 * -------------------------------------------------------------------------
 * Lets the visitor pick their own currency and — importantly — tells them the
 * exact rate being applied and whether it is live. Converted prices are an
 * estimate for the customer's benefit; the card is charged in USD, and we say
 * so rather than letting the number imply otherwise.
 */
import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '@/components/store/CurrencyProvider';
import { useFocusTrap } from '@/components/ui/useFocusTrap';

export function CurrencySwitcher() {
  const { currency, setCurrency, all, live, fetchedAt, isBase } = useCurrency();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-sm text-ink-soft transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span aria-hidden="true">{currency.symbol}</span>
        <span>{currency.code}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Change currency. Currently {currency.name}.</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Choose your currency"
          className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-line bg-ivory p-4 shadow-soft"
        >
          <p className="mb-3 font-display text-base text-ink">Show prices in</p>

          <ul className="mb-3 max-h-64 space-y-0.5 overflow-y-auto">
            {all.map((c) => {
              const active = c.code === currency.code;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => { setCurrency(c.code); setOpen(false); buttonRef.current?.focus(); }}
                    aria-current={active ? 'true' : undefined}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 text-left text-sm transition ${
                      active ? 'bg-sand text-ink' : 'text-ink-soft hover:bg-sand/60 hover:text-ink'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="tabular-nums text-ink-soft">{c.symbol} {c.code}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-line pt-3 text-xs leading-relaxed text-ink-soft">
            {isBase ? (
              <p>Prices are shown and charged in US dollars.</p>
            ) : (
              <>
                <p className="tabular-nums">
                  Rate applied: <strong className="font-medium text-ink">1 USD = {currency.rate.toLocaleString(currency.locale, { maximumFractionDigits: 4 })} {currency.code}</strong>
                </p>
                <p className="mt-1">
                  {live && fetchedAt
                    ? `Live rate, updated ${new Date(fetchedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}.`
                    : 'Indicative rate — a live feed is not configured, so this may have drifted.'}
                </p>
                <p className="mt-1">
                  Converted prices are a guide. Your card is charged in US dollars, and your bank sets the final rate.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
