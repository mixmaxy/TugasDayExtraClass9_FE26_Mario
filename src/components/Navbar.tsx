import Link from "next/link";
import { PlusCircle, Utensils } from "lucide-react";
 
export function Navbar() {
  return (
    /*
      <header> + <nav> adalah struktur semantik yang benar:
      - <header> menandai bagian kepala/header situs
      - <nav> menandai sekumpulan link navigasi
      Ini penting untuk screen reader dan SEO
    */
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-stone-900 hover:text-amber-600 transition-colors"
          aria-label="FoodVault - Halaman Utama"
        >
          <Utensils
            className="w-6 h-6 text-amber-500"
            aria-hidden="true" // Dekoratif, sudah ada teks di sebelahnya
          />
          <span>FoodVault</span>
        </Link>
 
        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/foods/create"
            className="
              flex items-center gap-2 px-4 py-2 rounded-full
              bg-amber-500 hover:bg-amber-600 active:scale-95
              text-white font-medium text-sm
              transition-all duration-150
              shadow-sm hover:shadow-md
            "
          >
            {/* aria-hidden karena sudah ada teks "Buat Makanan" */}
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Buat Makanan</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}