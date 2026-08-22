/** Capacity bands used by the size guide, the finder and the capacity scale. */
export interface SizeBand {
  id: string;
  label: string;
  range: string;
  capacityLow: number;
  capacityHigh: number;
  suits: string;
  href: string;
}

/**
 * General planning guideline, stated plainly wherever capacity appears:
 * approximately 1 cubic inch of capacity per 1 pound of healthy body weight.
 * This is an estimate, not a guarantee, and should be confirmed with the
 * crematory or funeral provider.
 */
export const CAPACITY_RULE = 'Roughly one cubic inch of capacity for each pound of healthy body weight.';
export const CAPACITY_CAVEAT =
  'This is a general planning estimate rather than a guarantee. Bone density, height and crematory practice all affect the final volume. When you are between two sizes, the larger one is the safer choice, and your crematory or funeral provider can confirm the figure for you.';

export const sizeBands: SizeBand[] = [
  { id: 'keepsake', label: 'Keepsake urns', range: '1 – 20 cu in', capacityLow: 1, capacityHigh: 20, suits: 'A small portion of ashes, often shared between several people.', href: '/collections/keepsake-urns' },
  { id: 'pet', label: 'Pet urns', range: '10 – 150 cu in', capacityLow: 10, capacityHigh: 150, suits: 'Sized by the animal\u2019s weight, on the same one-to-one guide.', href: '/collections/pet-memorial-urns' },
  { id: 'adult', label: 'Adult urns', range: '180 – 220 cu in', capacityLow: 180, capacityHigh: 220, suits: 'The full amount of ashes for one adult of average build.', href: '/collections/adult-cremation-urns' },
  { id: 'xl', label: 'Extra-large urns', range: '250 cu in and above', capacityLow: 250, capacityHigh: 350, suits: 'A larger adult, or simply more room than you think you need.', href: '/collections/adult-cremation-urns' },
  { id: 'companion', label: 'Companion urns', range: '380 – 440 cu in', capacityLow: 380, capacityHigh: 440, suits: 'Two adults together, usually in separate sealed compartments.', href: '/collections/companion-urns' },
];

/** Max value on the shared capacity scale, so every bar is comparable. */
export const CAPACITY_SCALE_MAX = 440;
