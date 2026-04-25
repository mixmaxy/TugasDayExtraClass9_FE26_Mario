// SERVER COMPONENT - fetch detail data di server
// Client interactivity (form submit, delete) di-handle oleh FoodDetailForm

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Leaf, AlertTriangle, Clock } from "lucide-react";
import { FoodDetailForm } from "@/components/FoodDetailForm";
import type { Food } from "@/types/food";

type PageProps = {
  params: Promise<{ id: string }>;
};

import { prisma } from "@/lib/prisma";

async function getFood(id: string): Promise<Food> {
  // DIRECT ACCESS - Mengambil data langsung dari database
  const food = await prisma.food.findUnique({
    where: { id },
  });

  if (!food) {
    notFound(); // Trigger Next.js 404 page
  }

  return food;
}

// Dinamis generate metadata berdasarkan data makanan (untuk SEO)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const food = await getFood(id);
    return {
      title: food.name,
      description: food.description.slice(0, 160), // Max 160 char untuk meta description
    };
  } catch {
    return { title: "Detail Makanan" };
  }
}

const TYPE_CONFIG = {
  fresh: {
    label: "Fresh",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Icon: Leaf,
  },
  upf: {
    label: "Ultra Processed",
    className: "bg-orange-100 text-orange-700 border-orange-200",
    Icon: AlertTriangle,
  },
} as const;

export default async function FoodDetailPage({ params }: PageProps) {
  const { id } = await params;
  const food = await getFood(id);
  const typeConfig = TYPE_CONFIG[food.type as keyof typeof TYPE_CONFIG];

  // Format tanggal untuk display
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(food.createdAt));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
      {/* Breadcrumb Navigation - penting untuk SEO & UX */}
      <nav aria-label="Breadcrumb" className="mb-8 animate-fade-up">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <Link
              href="/foods"
              className="hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Daftar Makanan
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="text-stone-900 font-medium truncate max-w-50"
            aria-current="page"
          >
            {food.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar: Gambar + Info */}
        <aside className="lg:col-span-2 space-y-5 animate-fade-up stagger-1">
          {/* Gambar */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            {food.imageUrl ? (
              <Image
                src={food.imageUrl}
                alt={`Gambar ${food.name}`}
                fill
                priority // LCP image - prioritas loading tinggi
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl" aria-hidden="true">
                  🍽️
                </span>
              </div>
            )}
          </div>

          {/* Meta Info Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            {/* Tipe */}
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">
                Tipe Makanan
              </p>
              <span
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  text-sm font-semibold border
                  ${typeConfig.className}
                `}
              >
                <typeConfig.Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {typeConfig.label}
              </span>
            </div>

            {/* Tanggal dibuat */}
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
                Ditambahkan
              </p>
              <p className="text-sm text-stone-700 flex items-center gap-1.5">
                <Clock
                  className="w-3.5 h-3.5 text-stone-400"
                  aria-hidden="true"
                />
                <time dateTime={food.createdAt.toString()}>
                  {formattedDate}
                </time>
              </p>
            </div>

            {/* Bahan-bahan (view only di sidebar) */}
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">
                Bahan-bahan
              </p>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients
                  .split(",")
                  .map((ingredient: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-stone-100 text-stone-700 text-xs rounded-full"
                    >
                      {ingredient.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main: Edit Form */}
        <main className="lg:col-span-3 animate-fade-up stagger-2">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
            <header className="mb-6">
              <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">
                {food.name}
              </h1>
              <p className="text-stone-500 text-sm">Edit detail makanan ini</p>
            </header>

            {/*
              FoodDetailForm adalah Client Component
              Kita pass data dari server ke client via props
              Ini adalah pattern "islands architecture" - server renders data,
              client handles interactivity
            */}
            <FoodDetailForm food={food} />
          </div>
        </main>
      </div>
    </main>
  );
}
