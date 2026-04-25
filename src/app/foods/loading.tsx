export default function FoodsLoadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10" aria-busy="true" aria-label="Memuat daftar makanan">
      {/* Header Skeleton */}
      <div className="mb-10 space-y-3 animate-pulse">
        <div className="h-3 w-28 bg-stone-200 rounded-full" />
        <div className="h-10 w-64 bg-stone-200 rounded-xl" />
        <div className="h-4 w-96 bg-stone-100 rounded-full" />
        <div className="flex gap-3 pt-1">
          <div className="h-7 w-24 bg-stone-100 rounded-full" />
          <div className="h-7 w-20 bg-stone-100 rounded-full" />
          <div className="h-7 w-24 bg-stone-100 rounded-full" />
        </div>
      </div>
 
      {/* Grid Skeleton - 6 card placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-pulse"
            aria-hidden="true"
          >
            {/* Image placeholder */}
            <div className="h-44 bg-stone-100" />
            {/* Content placeholder */}
            <div className="p-5 space-y-3">
              <div className="h-5 bg-stone-200 rounded-lg w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-stone-100 rounded-full" />
                <div className="h-3 bg-stone-100 rounded-full w-4/5" />
              </div>
              <div className="h-3 bg-stone-100 rounded-full w-24 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}