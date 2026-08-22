export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="skeleton aspect-[4/5] rounded-none" />
      <div className="space-y-2 p-5">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-1.5 w-full" />
        <div className="skeleton h-3 w-16" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
      <span className="sr-only">Loading products</span>
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}
