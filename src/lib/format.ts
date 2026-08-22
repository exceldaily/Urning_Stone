import { site } from '@/data/site';

/** Prices are stored in minor units. Never format a float. */
export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: site.currency, minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatDimensions(d: { height: number; width: number; depth: number; unit: string }) {
  return `${d.height} × ${d.width} × ${d.depth} ${d.unit}`;
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
