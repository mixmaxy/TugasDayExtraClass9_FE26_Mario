import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto py-12 sm:py-16 border-t border-stone-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 font-display font-bold text-stone-900">
          <UtensilsCrossed className="w-5 h-5 text-amber-500" />
          <span>FoodVault</span>
        </div>
        <p className="text-sm text-stone-400">
          © {new Date().getFullYear()} FoodVault App. Dibangun untuk kesehatan
          Anda.
        </p>
        <div className="flex gap-6">
          <Link
            href="/foods"
            className="text-sm text-stone-600 hover:text-amber-600 font-medium transition-colors"
          >
            Katalog
          </Link>
          <Link
            href="/foods/create"
            className="text-sm text-stone-600 hover:text-amber-600 font-medium transition-colors"
          >
            Tambah
          </Link>
        </div>
      </div>
    </footer>
  );
}
