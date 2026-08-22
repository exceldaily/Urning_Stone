'use client';
import Link from 'next/link';
import { products } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { ProductCard } from '@/components/product/ProductCard';
import { GridSkeleton } from '@/components/ui/Skeleton';

export default function AccountPage() {
  const { saved, hydrated } = useStore();
  const items = saved.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <div className="shell section">
      <h1 className="font-display text-4xl">Your saved pieces</h1>
      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink2">
        Saved items are kept in this browser so you can come back to them. You do not need an account to order,
        and we will not ask you to make one.
      </p>
      {/* TODO: connect real accounts (order history, addresses) when a commerce backend exists. */}
      <p className="pending mt-6 max-w-2xl text-[0.88rem] text-ink2">
        Accounts and order history are not connected yet. Until then, saved pieces live in this browser only.
      </p>

      <div className="mt-12">
        {!hydrated ? (
          <GridSkeleton count={3} />
        ) : items.length === 0 ? (
          <div className="rounded-[1.1rem] border border-hairline bg-linen/60 p-10 text-center">
            <p className="font-display text-xl">Nothing saved yet</p>
            <p className="mx-auto mt-2 max-w-md text-[0.93rem] text-ink2">
              The bookmark on any piece will keep it here while you think. It is often easier to compare two or three
              the next day than to decide in one sitting.
            </p>
            <Link href="/collections/memorial-urns-for-ashes" className="btn-primary mt-6">Browse the collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
