/**
 * CURRENCIES
 * -------------------------------------------------------------------------
 * Customers see prices in their own currency. Prices are stored once, in the
 * base currency (USD, minor units), and converted for display only.
 *
 * RATES: the `rate` values below are a STATIC FALLBACK so the site always
 * renders a price, even if the live rate feed is unavailable. They are not
 * live and will drift. When `EXCHANGE_RATES_API_URL` is set, /api/rates
 * refreshes them hourly and the fallback is only used if that call fails.
 *
 * >> The rate actually used is always shown to the customer, along with the
 *    time it was fetched, so nobody is guessing what they are being charged.
 *    Settlement happens in the base currency at checkout.
 */

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  /** Locale used for Intl number formatting. */
  locale: string;
  /** Units of this currency per 1 unit of BASE_CURRENCY. */
  rate: number;
  /** Round display prices to this many decimals. */
  decimals: number;
}

export const BASE_CURRENCY = 'USD';

/** Static fallback table. Replaced at runtime by the live feed when available. */
export const currencies: Currency[] = [
  { code: 'USD', symbol: '$',  name: 'US dollar',         locale: 'en-US', rate: 1,     decimals: 2 },
  { code: 'EUR', symbol: '€',  name: 'Euro',              locale: 'de-DE', rate: 0.92,  decimals: 2 },
  { code: 'GBP', symbol: '£',  name: 'British pound',     locale: 'en-GB', rate: 0.79,  decimals: 2 },
  { code: 'CAD', symbol: 'CA$',name: 'Canadian dollar',   locale: 'en-CA', rate: 1.37,  decimals: 2 },
  { code: 'AUD', symbol: 'A$', name: 'Australian dollar', locale: 'en-AU', rate: 1.52,  decimals: 2 },
  { code: 'NZD', symbol: 'NZ$',name: 'New Zealand dollar',locale: 'en-NZ', rate: 1.65,  decimals: 2 },
  { code: 'JPY', symbol: '¥',  name: 'Japanese yen',      locale: 'ja-JP', rate: 157,   decimals: 0 },
  { code: 'SEK', symbol: 'kr', name: 'Swedish krona',     locale: 'sv-SE', rate: 10.6,  decimals: 2 },
];

export const currencyByCode = (code: string): Currency =>
  currencies.find((c) => c.code === code) ?? currencies[0];

/**
 * Best-effort guess from the visitor's browser locale. Always overridable —
 * the switcher in the header wins and is remembered.
 */
export function guessCurrency(locale: string | undefined): string {
  if (!locale) return BASE_CURRENCY;
  const region = locale.split('-')[1]?.toUpperCase();
  const byRegion: Record<string, string> = {
    US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', NZ: 'NZD', JP: 'JPY', SE: 'SEK',
    DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', IE: 'EUR', PT: 'EUR',
    AT: 'EUR', BE: 'EUR', FI: 'EUR', GR: 'EUR',
  };
  return (region && byRegion[region]) || BASE_CURRENCY;
}

/** Convert a base-currency amount in minor units into `currency`. */
export function convert(baseCents: number, currency: Currency): number {
  return (baseCents / 100) * currency.rate;
}
