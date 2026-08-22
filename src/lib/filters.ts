import type { Product } from '@/data/products';

export interface FilterState {
  q: string;
  categories: string[];
  materials: string[];
  colors: string[];
  capacities: string[];
  personalizedOnly: boolean;
  inStockOnly: boolean;
  maxPrice: number | null;
  sort: SortKey;
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'popular';

export const sortLabels: Record<SortKey, string> = {
  featured: 'Featured',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
  newest: 'Newest',
  popular: 'Most chosen',
};

export const capacityBuckets = [
  { id: 'kp', label: 'Up to 20 cu in', test: (p: Product) => p.capacityCuIn <= 20 },
  { id: 'sm', label: '21 – 150 cu in', test: (p: Product) => p.capacityCuIn > 20 && p.capacityCuIn <= 150 },
  { id: 'ad', label: '151 – 249 cu in', test: (p: Product) => p.capacityCuIn > 150 && p.capacityCuIn < 250 },
  { id: 'xl', label: '250 – 379 cu in', test: (p: Product) => p.capacityCuIn >= 250 && p.capacityCuIn < 380 },
  { id: 'cp', label: '380 cu in and above', test: (p: Product) => p.capacityCuIn >= 380 },
];

export const emptyFilters: FilterState = {
  q: '', categories: [], materials: [], colors: [], capacities: [],
  personalizedOnly: false, inStockOnly: false, maxPrice: null, sort: 'featured',
};

export function applyFilters(items: Product[], f: FilterState) {
  const q = f.q.trim().toLowerCase();
  let out = items.filter((p) => {
    if (q && !(`${p.name} ${p.materialLabel} ${p.colorLabel} ${p.intendedUse} ${p.description}`.toLowerCase().includes(q))) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.materials.length && !f.materials.includes(p.material)) return false;
    if (f.colors.length && !f.colors.includes(p.color)) return false;
    if (f.capacities.length) {
      const match = capacityBuckets.filter((b) => f.capacities.includes(b.id)).some((b) => b.test(p));
      if (!match) return false;
    }
    if (f.personalizedOnly && !p.personalization.available) return false;
    if (f.inStockOnly && !p.inStock) return false;
    if (f.maxPrice !== null && p.priceCents > f.maxPrice * 100) return false;
    return true;
  });

  out = [...out].sort((a, b) => {
    switch (f.sort) {
      case 'price-asc': return a.priceCents - b.priceCents;
      case 'price-desc': return b.priceCents - a.priceCents;
      case 'newest': return b.createdAt.localeCompare(a.createdAt);
      case 'popular': return a.popularityRank - b.popularityRank;
      default: return Number(b.featured) - Number(a.featured) || a.popularityRank - b.popularityRank;
    }
  });
  return out;
}

export function countActive(f: FilterState) {
  return f.categories.length + f.materials.length + f.colors.length + f.capacities.length +
    (f.personalizedOnly ? 1 : 0) + (f.inStockOnly ? 1 : 0) + (f.maxPrice !== null ? 1 : 0) + (f.q ? 1 : 0);
}
