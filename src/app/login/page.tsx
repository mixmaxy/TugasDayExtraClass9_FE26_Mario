"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Utensils, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
 
export default function LoginPage() {
  const router = useRouter();
 
  // State untuk form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
 
    try {
      /*
        Di sini seharusnya ada call ke Supabase Auth:
        
        import { createClient } from "@/lib/supabase/client";
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        Untuk assignment ini, kita simulasi saja:
      */
      await new Promise((res) => setTimeout(res, 1000)); // Simulasi network request
 
      // Setelah login berhasil, redirect ke halaman makanan
      router.push("/foods");
    } catch {
      setError("Email atau password salah. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    /*
      Gunakan <main> dengan min-h-screen agar layout full-height
      Ini adalah halaman login, jadi tidak ada Navbar di sini
      (override layout dengan layout khusus di folder login jika perlu)
    */
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4 pt-0">
      {/* Decorative background elements */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-100 blur-3xl opacity-60" />
      </div>
 
      {/* Login Card */}
      <article className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-100 p-8 animate-fade-up">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 mb-4">
            <Utensils className="w-7 h-7 text-amber-500" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-bold text-stone-900">
            Selamat Datang
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Masuk ke akun FoodVault kamu
          </p>
        </header>
 
        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            {error}
          </div>
        )}
 
        {/*
          <form> dengan noValidate agar kita bisa custom validation
          onSubmit untuk handle submit dengan JS
        */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ganteng@banget.com"
                className="
                  w-full pl-10 pr-4 py-2.5 rounded-xl
                  border border-stone-200 bg-stone-50
                  text-stone-900 placeholder:text-stone-400
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                  transition-shadow
                "
                aria-required="true"
              />
            </div>
          </div>
 
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full pl-10 pr-11 py-2.5 rounded-xl
                  border border-stone-200 bg-stone-50
                  text-stone-900 placeholder:text-stone-400
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                  transition-shadow
                "
                aria-required="true"
              />
              {/* Toggle show/hide password */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
 
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="
              w-full py-2.5 rounded-xl font-medium text-sm
              bg-amber-500 hover:bg-amber-600 active:scale-[0.98]
              text-white
              disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
              transition-all duration-150
              flex items-center justify-center gap-2
            "
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Masuk...</span>
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
 
        {/* Footer link */}
        <footer className="mt-6 text-center text-sm text-stone-500">
          Belum punya akun?{" "}
          <Link
            href="#"
            className="text-amber-600 hover:underline font-medium"
          >
            Daftar sekarang
          </Link>
        </footer>
      </article>
    </main>
  );
}