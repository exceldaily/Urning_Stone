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
 * crematorium.
 */
export const CAPACITY_RULE = 'Roughly one cubic inch of capacity for each pound your pet weighed.';
export const CAPACITY_CAVEAT =
  'This is a general planning estimate rather than a guarantee. Breed, bone density and each crematorium’s practice all affect the final volume, and a long-haired animal weighs less than they look. When you are between two sizes, the larger one is the safer choice — an urn with room to spare is never a problem, and one that does not close is. Your vet or crematorium can confirm the figure before you order.';

export const sizeBands: SizeBand[] = [
  { id: 'keepsake', label: 'Keepsakes and keyrings', range: 'Under 20 cu in', capacityLow: 0.2, capacityHigh: 20, suits: 'A small portion, often shared between the people who loved them.', href: '/collections/keepsake-urns' },
  { id: 'small', label: 'Small pets', range: '10 – 25 cu in', capacityLow: 10, capacityHigh: 25, suits: 'Rabbits, guinea pigs, ferrets, birds, and cats up to around 25 lb.', href: '/collections/small-pet-urns' },
  { id: 'cat', label: 'Cats and small dogs', range: '25 – 40 cu in', capacityLow: 25, capacityHigh: 40, suits: 'Most cats, and dogs up to around 40 lb — terriers, spaniels, dachshunds.', href: '/collections/cat-urns' },
  { id: 'dog-med', label: 'Medium dogs', range: '40 – 70 cu in', capacityLow: 40, capacityHigh: 70, suits: 'Border collies, bulldogs, retrievers on the smaller side.', href: '/collections/dog-urns' },
  { id: 'dog-lg', label: 'Large dogs', range: '70 cu in and above', capacityLow: 70, capacityHigh: 140, suits: 'Labradors, shepherds, ridgebacks and larger. Measure rather than guess.', href: '/collections/dog-urns' },
];

/** Rough weight guide by animal, used on the size guide page. */
export const weightExamples = [
  { animal: 'Rabbit or guinea pig', weight: '3 – 12 lb', capacity: '10 – 15 cu in' },
  { animal: 'Cat', weight: '8 – 20 lb', capacity: '20 – 25 cu in' },
  { animal: 'Small dog', weight: '10 – 30 lb', capacity: '25 – 35 cu in' },
  { animal: 'Medium dog', weight: '30 – 60 lb', capacity: '35 – 65 cu in' },
  { animal: 'Large dog', weight: '60 – 100 lb', capacity: '65 – 105 cu in' },
  { animal: 'Giant breed', weight: '100 lb and above', capacity: '105 cu in and above' },
];

/** Max value on the shared capacity scale, so every bar is comparable. */
export const CAPACITY_SCALE_MAX = 140;
