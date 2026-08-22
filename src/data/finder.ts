/**
 * URN FINDER
 * Five short questions that narrow the catalogue. The finder is guidance, not
 * advice: results are filtered suggestions and the UI says so.
 */
import type { CategoryId, MaterialId, Product, StyleId } from './products';

export type AnswerValue = string;

export interface FinderOption {
  value: AnswerValue;
  label: string;
  note?: string;
}

export interface FinderStep {
  id: 'who' | 'amount' | 'style' | 'personalization' | 'budget';
  question: string;
  helper?: string;
  options: FinderOption[];
}

export const finderSteps: FinderStep[] = [
  {
    id: 'who',
    question: 'Who are you remembering?',
    helper: 'This sets the size range we start from.',
    options: [
      { value: 'adult', label: 'An adult' },
      { value: 'companion', label: 'Two people together', note: 'A companion urn' },
      { value: 'pet', label: 'A pet' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  {
    id: 'amount',
    question: 'Will the urn hold all of the ashes, or a small portion?',
    helper: 'Some families choose one main urn and a few keepsakes alongside it.',
    options: [
      { value: 'all', label: 'All of them' },
      { value: 'portion', label: 'A small portion', note: 'Keepsake or jewelry' },
      { value: 'both', label: 'Both, if possible' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  {
    id: 'style',
    question: 'What style feels right?',
    helper: 'Think about the room it will live in.',
    options: [
      { value: 'traditional', label: 'Warm and traditional' },
      { value: 'modern', label: 'Modern and minimal' },
      { value: 'wood', label: 'Natural wood' },
      { value: 'ceramic', label: 'Ceramic and artisan' },
      { value: 'nature', label: 'Nature-inspired' },
      { value: 'biodegradable', label: 'Biodegradable' },
      { value: 'jewelry', label: 'Memorial jewelry' },
    ],
  },
  {
    id: 'personalization',
    question: 'Is personalization important to you?',
    helper: 'Engraving usually adds to the time before an order ships.',
    options: [
      { value: 'yes', label: 'Yes, I would like engraving' },
      { value: 'no', label: 'No, plain is fine' },
      { value: 'unsure', label: 'Show me both' },
    ],
  },
  {
    id: 'budget',
    question: 'Is there a budget you would like to stay within?',
    helper: 'You can skip this. Nothing is hidden from you either way.',
    options: [
      { value: 'u150', label: 'Under $150' },
      { value: '150-300', label: '$150 to $300' },
      { value: '300-500', label: '$300 to $500' },
      { value: '500+', label: '$500 and above' },
      { value: 'any', label: 'No preference' },
    ],
  },
];

export type FinderAnswers = Partial<Record<FinderStep['id'], AnswerValue>>;

/** Scores every product against the answers and returns the closest matches. */
export function scoreProducts(products: Product[], answers: FinderAnswers) {
  const styleMap: Record<string, StyleId> = {
    traditional: 'traditional', modern: 'modern', wood: 'wood',
    ceramic: 'ceramic', nature: 'nature', biodegradable: 'biodegradable', jewelry: 'jewelry',
  };

  return products
    .map((p) => {
      let score = 0;

      if (answers.who === 'adult' && (p.category === 'adult' || p.category === 'keepsake' || p.category === 'jewelry')) score += 3;
      if (answers.who === 'companion' && p.category === 'companion') score += 5;
      if (answers.who === 'pet' && p.category === 'pet') score += 5;
      if (answers.who && answers.who !== 'unsure' && answers.who !== 'pet' && p.category === 'pet') score -= 6;
      if (answers.who === 'pet' && p.category !== 'pet') score -= 6;

      if (answers.amount === 'all' && p.capacityCuIn >= 60) score += 3;
      if (answers.amount === 'all' && p.capacityCuIn < 60) score -= 5;
      if (answers.amount === 'portion' && (p.category === 'keepsake' || p.category === 'jewelry')) score += 4;
      if (answers.amount === 'portion' && p.capacityCuIn > 20) score -= 5;
      if (answers.amount === 'both') score += p.category === 'keepsake' || p.capacityCuIn >= 150 ? 2 : 0;

      const wantedStyle = answers.style ? styleMap[answers.style] : undefined;
      if (wantedStyle) {
        if (p.style === wantedStyle) score += 4;
        else if (wantedStyle === 'wood' && p.material === 'wood') score += 3;
        else if (wantedStyle === 'ceramic' && p.material === 'ceramic') score += 3;
        else if (wantedStyle === 'biodegradable' && p.material === 'biodegradable') score += 4;
        else if (wantedStyle === 'jewelry' && p.category === 'jewelry') score += 4;
      }

      if (answers.personalization === 'yes') score += p.personalization.available ? 3 : -4;
      if (answers.personalization === 'no' && !p.personalization.available) score += 1;

      const price = p.priceCents / 100;
      if (answers.budget === 'u150') score += price <= 150 ? 3 : -3;
      if (answers.budget === '150-300') score += price > 150 && price <= 300 ? 3 : -1;
      if (answers.budget === '300-500') score += price > 300 && price <= 500 ? 3 : -1;
      if (answers.budget === '500+') score += price > 500 ? 3 : -1;

      if (!p.inStock) score -= 2;
      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.product.popularityRank - b.product.popularityRank);
}

/** Material labels used in the results summary. */
export const materialLabels: Record<MaterialId, string> = {
  wood: 'Wood', ceramic: 'Ceramic', brass: 'Brass', stone: 'Stone',
  glass: 'Glass', biodegradable: 'Biodegradable', sterling: 'Sterling silver', steel: 'Steel',
};

export const categoryLabels: Record<CategoryId, string> = {
  adult: 'Adult urn', keepsake: 'Keepsake', companion: 'Companion urn', pet: 'Pet memorial', jewelry: 'Memorial jewelry',
};
