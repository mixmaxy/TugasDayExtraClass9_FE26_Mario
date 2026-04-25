// Error Boundary untuk runtime errors di server/client components
// KENAPA "use client"? Next.js mengharuskan error.tsx menjadi Client Component
// karena butuh akses ke Error object dan reset function
 
"use client";
 
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
 
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
 
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error ke console (di production, kirim ke error tracking seperti Sentry)
    console.error("[App Error]", error);
  }, [error]);
 
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div
          className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5"
          aria-hidden="true"
        >
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          {error.message || "Terjadi kesalahan yang tidak terduga. Silakan coba lagi."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-2.5 rounded-full
              bg-amber-500 hover:bg-amber-600
              text-white font-medium text-sm
              transition-colors
            "
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Coba Lagi
          </button>
          <Link
            href="/foods"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-2.5 rounded-full
              border border-stone-200 hover:bg-stone-50
              text-stone-700 font-medium text-sm
              transition-colors
            "
          >
            Ke Daftar Makanan
          </Link>
        </div>
      </div>
    </div>
  );
}