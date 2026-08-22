/**
 * LIVE EXCHANGE RATES
 * -------------------------------------------------------------------------
 * Returns { base, rates, fetchedAt, live }.
 *
 * Set EXCHANGE_RATES_API_URL to a feed returning { rates: { CODE: number } }
 * quoted against USD — e.g. an exchangerate.host or openexchangerates URL with
 * your key already in it. Without it, or if the call fails, the static
 * fallback in src/data/currencies.ts is returned with live:false so the UI can
 * say plainly that rates are indicative.
 */
import { NextResponse } from 'next/server';
import { BASE_CURRENCY, currencies } from '@/data/currencies';

export const revalidate = 3600; // refresh at most hourly

const fallback = () => Object.fromEntries(currencies.map((c) => [c.code, c.rate]));

export async function GET() {
  const url = process.env.EXCHANGE_RATES_API_URL;

  if (!url) {
    return NextResponse.json({
      base: BASE_CURRENCY, rates: fallback(), fetchedAt: null, live: false,
      note: 'EXCHANGE_RATES_API_URL is not set — showing indicative rates.',
    });
  }

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`rate feed responded ${res.status}`);
    const data = (await res.json()) as { rates?: Record<string, number> };
    if (!data.rates || typeof data.rates !== 'object') throw new Error('rate feed returned no rates');

    // Keep only the currencies we actually offer, and never trust a junk value.
    const rates: Record<string, number> = {};
    for (const c of currencies) {
      const r = c.code === BASE_CURRENCY ? 1 : data.rates[c.code];
      rates[c.code] = typeof r === 'number' && r > 0 ? r : c.rate;
    }

    return NextResponse.json({
      base: BASE_CURRENCY, rates, fetchedAt: new Date().toISOString(), live: true,
    });
  } catch {
    return NextResponse.json({
      base: BASE_CURRENCY, rates: fallback(), fetchedAt: null, live: false,
      note: 'Live rate feed unavailable — showing indicative rates.',
    });
  }
}
