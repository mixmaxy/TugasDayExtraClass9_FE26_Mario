// Server Component wrapper untuk halaman buat makanan
 
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CreateFoodForm } from "@/components/CreateFoodForm";
 
export const metadata: Metadata = {
  title: "Buat Makanan Baru",
  description: "Tambahkan makanan baru ke koleksi FoodVault kamu.",
};
 
export default function CreateFoodPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Back Navigation */}
      <nav aria-label="Navigasi kembali" className="mb-8 animate-fade-up">
        <Link
          href="/foods"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Kembali ke Daftar
        </Link>
      </nav>
 
      {/* Card */}
      <article className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-fade-up stagger-1">
        {/* Card Header dengan accent */}
        <div className="bg-linear-to-r from-amber-500 to-orange-400 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Makanan Baru
              </h1>
              <p className="text-amber-100 text-sm mt-0.5">
                Isi detail makanan yang ingin kamu tambahkan
              </p>
            </div>
          </div>
        </div>
 
        {/* Form */}
        <div className="p-6 sm:p-8">
          {/*
            CreateFoodForm adalah Client Component karena butuh state & event
            Tapi halaman ini (wrapper) tetap Server Component → optimasi yang baik
          */}
          <CreateFoodForm />
        </div>
      </article>
 
      {/* Tips Card */}
      <aside
        className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-100 animate-fade-up stagger-2"
        aria-label="Tips mengisi form"
      >
        <h2 className="font-semibold text-amber-900 text-sm mb-3">💡 Tips Pengisian</h2>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>
              <strong>Fresh</strong>: Makanan alami seperti buah, sayur, daging segar, biji-bijian utuh.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>
              <strong>UPF</strong>: Makanan dengan banyak bahan tambahan pabrik seperti pengawet, pewarna, pemanis buatan.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>Pisahkan bahan dengan koma untuk tampilan tag yang rapi di halaman detail.</span>
          </li>
        </ul>
      </aside>
    </main>
  );
}