// SERVER COMPONENT - fetch data langsung di server, tanpa useEffect
//
// KENAPA Server Component untuk fetch data?
// 1. Data langsung ada saat HTML dikirim ke browser → lebih cepat (FCP lebih baik)
// 2. Tidak ada loading spinner untuk initial load
// 3. API key/secrets tidak terekspos ke client
// 4. SEO: search engine bisa index konten lengkap

import type { Metadata } from "next";
import { FoodCard } from "@/components/FoodCard";
import { UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Daftar Makanan",
  description:
    "Jelajahi dan kelola daftar makanan segar dan ultra-proses di FoodVault.",
};

import { prisma } from "@/lib/prisma";

// Revalidate setiap 60 detik (ISR - Incremental Static Regeneration)
// KENAPA? Data makanan tidak berubah setiap detik. Dengan cache 60s,
// halaman ini sangat cepat dan tidak membebani database di setiap request.
export const revalidate = 60;

async function getFoods() {
  // DIRECT ACCESS - Mengambil data langsung dari database
  // Di Server Component, kita bisa langsung menggunakan Prisma client
  // Ini lebih efisien daripada membuat HTTP request internal ke API route sendiri
  try {
    const foods = await prisma.food.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        imageUrl: true,
      },
    });
    return foods;
  } catch (error) {
    console.error("[FoodsPage] Error fetching foods directly:", error);
    // Kita bisa melempar error agar ditangkap oleh error boundary
    throw new Error("Gagal mengambil data makanan");
  }
}

export default async function FoodsPage() {
  const foods = await getFoods();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
      {/* Page Header */}
      <header className="mb-12 animate-fade-up">
        <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">
          Koleksi Makanan
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Daftar Makanan
        </h1>
        <p className="text-stone-500 mt-3 max-w-xl">
          Temukan dan kelola informasi makanan — dari bahan segar hingga produk
          ultra-proses.
        </p>

        {/* Stats */}
        {foods.length > 0 && (
          <div className="flex gap-4 mt-5">
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-sm">
              {foods.length} Makanan
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">
              {foods.filter((f) => f.type === "fresh").length} Segar
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
              {foods.filter((f) => f.type === "upf").length} Ultra Proses
            </span>
          </div>
        )}
      </header>

      {/* Empty State */}
      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
          <UtensilsCrossed
            className="w-16 h-16 text-stone-300 mb-4"
            aria-hidden="true"
          />
          <h2 className="font-display text-xl font-semibold text-stone-600 mb-2">
            Belum Ada Makanan
          </h2>
          <p className="text-stone-400 text-sm">
            Mulai dengan membuat makanan pertamamu!
          </p>
        </div>
      ) : (
        /*
          CSS Grid responsif:
          - Mobile: 1 kolom
          - Tablet: 2 kolom
          - Desktop: 3 kolom
        */
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up"
          aria-label="Daftar makanan"
          /*
            <ul> dengan <li> adalah struktur semantik yang benar untuk list
            Ini membantu screen reader mengumumkan "list dengan N item"
          */
        >
          {foods.map((food, index) => (
            <li key={food.id}>
              <FoodCard food={food} index={index} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
