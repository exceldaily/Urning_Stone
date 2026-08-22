export default function Loading() {
  return (
    <div className="shell section" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="skeleton h-4 w-40" />
      <div className="skeleton mt-6 h-10 w-2/3 max-w-lg" />
      <div className="skeleton mt-4 h-4 w-full max-w-2xl" />
      <div className="skeleton mt-2 h-4 w-5/6 max-w-xl" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton aspect-[4/5] rounded-none" />
            <div className="space-y-2 p-5">
              <div className="skeleton h-3 w-20" /><div className="skeleton h-4 w-4/5" /><div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
