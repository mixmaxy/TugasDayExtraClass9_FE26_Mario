import Link from "next/link";
import Image from "next/image";
import { Leaf, AlertTriangle, ChevronRight } from "lucide-react";
import type { Food } from "@/types/food";
 
type FoodCardProps = {
  food: Pick<Food, "id" | "name" | "description" | "type" | "imageUrl">;
  // index untuk staggered animation
  index?: number;
};
 
// Badge untuk tipe makanan
const TYPE_CONFIG = {
  fresh: {
    label: "Segar",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Icon: Leaf,
  },
  upf: {
    label: "Ultra Proses",
    className: "bg-orange-100 text-orange-700 border-orange-200",
    Icon: AlertTriangle,
  },
} as const;
 
export function FoodCard({ food, index = 0 }: FoodCardProps) {
  const typeConfig = TYPE_CONFIG[food.type as keyof typeof TYPE_CONFIG];
  const staggerClass = `stagger-${Math.min(index + 1, 5)}`;
 
  return (
    /*
      <article> semantik yang benar untuk item konten yang berdiri sendiri
      Setiap card adalah entitas makanan yang independen
    */
    <article
      className={`opacity-0 animate-fade-up ${staggerClass} group`}
    >
      <Link
        href={`/foods/${food.id}`}
        className="
          flex flex-col h-full
          bg-white rounded-2xl overflow-hidden
          border border-stone-200
          hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50
          transition-all duration-200
          focus-visible:ring-2 focus-visible:ring-amber-400
        "
        aria-label={`Lihat detail ${food.name}`}
      >
        {/* Gambar dengan next/image untuk optimasi otomatis (Core Web Vitals: LCP) */}
        <div className="relative h-44 bg-stone-100 overflow-hidden">
          {food.imageUrl ? (
            <Image
              src={food.imageUrl}
              alt={`Gambar ${food.name}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Placeholder jika tidak ada gambar
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl" aria-hidden="true">
                🍽️
              </span>
            </div>
          )}
          {/* Badge tipe makanan di atas gambar */}
          <div className="absolute top-3 left-3">
            <span
              className={`
                inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                text-xs font-semibold border
                ${typeConfig.className}
              `}
            >
              <typeConfig.Icon className="w-3 h-3" aria-hidden="true" />
              {typeConfig.label}
            </span>
          </div>
        </div>
 
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-display font-bold text-lg text-stone-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {food.name}
          </h2>
          {/*
            line-clamp-2 untuk menjaga konsistensi tinggi card
            Deskripsi dipotong di 2 baris
          */}
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 flex-1">
            {food.description}
          </p>
 
          <div className="flex items-center justify-end mt-4 text-amber-500 text-sm font-medium">
            <span>Lihat Detail</span>
            <ChevronRight
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}