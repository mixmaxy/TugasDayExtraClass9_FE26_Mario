// Custom 404 page - otomatis ditampilkan ketika notFound() dipanggil
// atau route tidak ditemukan
 
import Link from "next/link";
import type { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
};
 
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        {/* Big decorative number */}
        <p
          className="font-display text-[120px] sm:text-[160px] font-bold leading-none text-stone-100 select-none"
          aria-hidden="true"
        >
          404
        </p>
        <div className="-mt-6 sm:-mt-10">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-stone-500 max-w-sm mx-auto mb-8">
            Makanan atau halaman yang kamu cari tidak ada atau sudah dihapus.
          </p>
          <Link
            href="/foods"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-full
              bg-amber-500 hover:bg-amber-600
              text-white font-medium
              transition-colors
            "
          >
            Kembali ke Daftar Makanan
          </Link>
        </div>
      </div>
    </div>
  );
}