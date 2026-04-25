export default function FoodDetailLoadingPage() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10"
      aria-busy="true"
      aria-label="Memuat detail makanan"
    >
      {/* Breadcrumb skeleton */}
      <div className="mb-8 h-4 w-48 bg-stone-200 rounded-full animate-pulse" />
 
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar skeleton */}
        <div className="lg:col-span-2 space-y-5 animate-pulse" aria-hidden="true">
          <div className="aspect-square w-full rounded-2xl bg-stone-200" />
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-5">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-stone-200 rounded-full" />
              <div className="h-7 w-24 bg-stone-100 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-stone-200 rounded-full" />
              <div className="h-4 w-36 bg-stone-100 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-stone-200 rounded-full" />
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-stone-100 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
 
        {/* Form skeleton */}
        <div className="lg:col-span-3 animate-pulse" aria-hidden="true">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-stone-200 rounded-xl" />
              <div className="h-4 w-40 bg-stone-100 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 space-y-2">
                <div className="h-3 w-24 bg-stone-200 rounded-full" />
                <div className="h-11 bg-stone-100 rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-stone-200 rounded-full" />
                <div className="h-11 bg-stone-100 rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-stone-200 rounded-full" />
                <div className="h-11 bg-stone-100 rounded-xl" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="h-3 w-24 bg-stone-200 rounded-full" />
                <div className="h-11 bg-stone-100 rounded-xl" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="h-3 w-24 bg-stone-200 rounded-full" />
                <div className="h-28 bg-stone-100 rounded-xl" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-36 bg-red-50 rounded-xl" />
              <div className="flex-1 h-11 bg-amber-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}