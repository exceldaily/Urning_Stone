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
      { value: 'dog', label: 'A dog' },
      { value: 'cat', label: 'A cat' },
      { value: 'small', label: 'A smaller pet', note: 'Rabbit, bird, guinea pig' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  {
    id: 'amount',
    question: 'Will the urn hold all of the ashes, or a small portion?',
    helper: 'Some families choose one main urn and a few keepsakes alongside it.',
    options: [
      { value: 'all', label: 'All of them' },
      { value: 'portion', label: 'A small portion', note: 'Keepsake or keyring' },
      { value: 'both', label: 'Both, if possible' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  {
    id: 'style',
    question: 'What style feels right?',
    helper: 'Think about the room it will live in.',
    options: [
      { value: 'classic', label: 'Warm and classic' },
      { value: 'modern', label: 'Modern and minimal' },
      { value: 'sculptural', label: 'Shaped like them', note: 'Sculpted pieces' },
      { value: 'nature', label: 'Natural and understated' },
      { value: 'biodegradable', label: 'For burial or planting' },
      { value: 'jewelry', label: 'Something to carry' },
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
      { value: 'u30', label: 'Under $30' },
      { value: '30-50', label: '$30 to $50' },
      { value: '50-80', label: '$50 to $80' },
      { value: '80+', label: '$80 and above' },
      { value: 'any', label: 'No preference' },
    ],
  },
];

export type FinderAnswers = Partial<Record<FinderStep['id'], AnswerValue>>;

/** Scores every product against the answers and returns the closest matches. */
export function scoreProducts(products: Product[], answers: FinderAnswers) {
  const styleMap: Record<string, StyleId> = {
    classic: 'classic', modern: 'modern', sculptural: 'sculptural',
    nature: 'nature', biodegradable: 'biodegradable', jewelry: 'jewelry',
  };

  return products
    .map((p) => {
      let score = 0;

      // Which animal. A piece that suits them scores; one that plainly does not is pushed down.
      if (answers.who === 'dog' || answers.who === 'cat' || answers.who === 'small') {
        score += p.petTypes.includes(answers.who) ? 4 : -6;
      }

      // How much of the ashes it needs to hold.
      if (answers.amount === 'all') score += p.category === 'urn' ? 3 : -5;
      if (answers.amount === 'portion') score += p.category === 'keepsake' || p.category === 'jewelry' ? 4 : -5;
      if (answers.amount === 'both') score += p.category === 'urn' || p.category === 'keepsake' ? 2 : 0;

      const wantedStyle = answers.style ? styleMap[answers.style] : undefined;
      if (wantedStyle) {
        if (p.style === wantedStyle) score += 4;
        else if (wantedStyle === 'biodegradable' && p.material === 'biodegradable') score += 4;
        else if (wantedStyle === 'jewelry' && p.category === 'jewelry') score += 4;
      }

      if (answers.personalization === 'yes') score += p.personalization.available ? 3 : -4;
      if (answers.personalization === 'no' && !p.personalization.available) score += 1;

      const price = p.priceCents / 100;
      if (answers.budget === 'u30') score += price <= 30 ? 3 : -3;
      if (answers.budget === '30-50') score += price > 30 && price <= 50 ? 3 : -1;
      if (answers.budget === '50-80') score += price > 50 && price <= 80 ? 3 : -1;
      if (answers.budget === '80+') score += price > 80 ? 3 : -1;

      if (!p.inStock) score -= 2;
      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.product.popularityRank - b.product.popularityRank);
}

/** Material labels used in the results summary. */
export const materialLabels: Record<MaterialId, string> = {
  ceramic: 'Ceramic', porcelain: 'Porcelain', steel: 'Stainless steel',
  resin: 'Resin', biodegradable: 'Biodegradable', wood: 'Wood',
};

export const categoryLabels: Record<CategoryId, string> = {
  urn: 'Urn', keepsake: 'Keepsake', jewelry: 'Jewellery and keyrings',
};
