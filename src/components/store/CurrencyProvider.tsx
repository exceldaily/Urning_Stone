'use client';
/**
 * CURRENCY CONTEXT
 * -------------------------------------------------------------------------
 * Detects the visitor's currency from their browser locale, lets them change
 * it, remembers the choice, and refreshes rates from /api/rates.
 *
 * Prices are stored once in USD minor units. Everything on screen is a
 * conversion for display only — settlement is in USD at checkout, which the
 * UI states wherever a converted price is shown.
 */
import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';
import {
  BASE_CURRENCY, currencies, currencyByCode, guessCurrency, convert, type Currency,
} from '@/data/currencies';

const STORAGE_KEY = 'ls.currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (code: string) => void;
  /** Format a base-currency (USD) minor-unit amount in the active currency. */
  price: (baseCents: number) => string;
  /** True once a live rate feed has been applied. */
  live: boolean;
  fetchedAt: string | null;
  isBase: boolean;
  all: Currency[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState(BASE_CURRENCY);
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [live, setLive] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  // Restore a saved choice, else guess from the browser locale.
  useEffect(() => {
    let initial = BASE_CURRENCY;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && currencies.some((c) => c.code === saved)) initial = saved;
      else initial = guessCurrency(navigator.language);
    } catch {
      initial = guessCurrency(navigator.language);
    }
    setCode(initial);
  }, []);

  // Refresh rates. Failure is silent — the static fallback still renders.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/rates')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d?.rates) return;
        setRates(d.rates);
        setLive(Boolean(d.live));
        setFetchedAt(d.fetchedAt ?? null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const setCurrency = useCallback((next: string) => {
    setCode(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
  }, []);

  const currency = useMemo(() => {
    const base = currencyByCode(code);
    const liveRate = rates?.[base.code];
    return liveRate && liveRate > 0 ? { ...base, rate: liveRate } : base;
  }, [code, rates]);

  const price = useCallback(
    (baseCents: number) => {
      const value = convert(baseCents, currency);
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals,
      }).format(value);
    },
    [currency],
  );

  const value = useMemo(
    () => ({
      currency, setCurrency, price, live, fetchedAt,
      isBase: currency.code === BASE_CURRENCY, all: currencies,
    }),
    [currency, setCurrency, price, live, fetchedAt],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
  return ctx;
}
