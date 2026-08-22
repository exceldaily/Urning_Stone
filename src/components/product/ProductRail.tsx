'use client';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '@/components/store/StoreProvider';

export function ProductRail({ heading, items, note }: { heading: string; items: typeof products; note?: string }) {
  if (!items.length) return null;
  return (
    <section className="section-tight">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl">{heading}</h2>
        {note && <p className="text-[0.82rem] text-muted">{note}</p>}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((p) => <ProductCard key={p.id} product={p} showCompare={false} />)}
      </div>
    </section>
  );
}

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { recentlyViewed, hydrated } = useStore();
  if (!hydrated) return null;
  const items = recentlyViewed.filter((id) => id !== excludeId).map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  if (!items.length) return null;
  return <ProductRail heading="Recently viewed" items={items} />;
}
