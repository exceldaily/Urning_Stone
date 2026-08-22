/**
 * SUPPLIER COSTS — GENERATED, DO NOT HAND-EDIT
 * -------------------------------------------------------------------------
 * Written by `npm run catalogue:import` from catalogue.csv.
 *
 * Kept separate from products.ts on purpose: products.ts is authored content
 * (names, descriptions, dimensions) and this is commercial data that changes
 * whenever the supplier requotes. Overrides here win over the placeholder
 * costs in products.ts.
 *
 * `verified: true` means a real supplier quote was entered. That removes the
 * "indicative price" notice from the product page and allows a live Stripe
 * sync, so only set it from an actual quote.
 */

export interface SupplierCost {
  /** Landed unit cost in minor units (cents). */
  costCents: number;
  /** True only when taken from a real supplier quote. */
  verified: boolean;
  /** Minimum order quantity, if the supplier sets one. */
  moq?: number;
  /** Anything worth remembering about this quote. */
  note?: string;
}

/** Keyed by SKU. Empty until catalogue.csv is filled in and imported. */
export const supplierCosts: Record<string, SupplierCost> = {};
