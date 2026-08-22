/**
 * PRICING
 * -------------------------------------------------------------------------
 * Retail price is DERIVED, never typed by hand.
 *
 *     retail = supplier cost x MARKUP_MULTIPLIER
 *
 * Every product in products.ts carries `costCents` — what the supplier charges
 * us per unit, landed. The storefront never displays that number; it displays
 * the derived retail price. Change the multiplier here and every price on the
 * site, in structured data, in the cart and in Stripe moves with it.
 *
 * >> COSTS ARE UNVERIFIED. See the PRICING NOTICE at the top of products.ts.
 *    Each `costCents` is a placeholder until the real supplier quote is
 *    entered. Nothing here invents a supplier price.
 */

/** 100% markup — retail is twice the landed supplier cost. */
export const MARKUP_MULTIPLIER = 2;

/** Derived retail price, in minor units. */
export function retailCents(costCents: number): number {
  return Math.round(costCents * MARKUP_MULTIPLIER);
}

/** Gross margin on a unit, in minor units. */
export function marginCents(costCents: number): number {
  return retailCents(costCents) - costCents;
}

/** Gross margin as a percentage of retail (50% at a 100% markup). */
export function marginPercent(): number {
  return Math.round(((MARKUP_MULTIPLIER - 1) / MARKUP_MULTIPLIER) * 100);
}
