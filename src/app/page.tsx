import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  UtensilsCrossed,
  Leaf,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-24 lg:pt-36 lg:pb-40">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" />
                <span>Revolusi Manajemen Makanan</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-6">
                Kelola Nutrisi, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500">
                  Kendalikan Kesehatan.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                FoodVault membantu kamu membedakan makanan segar dari produk
                ultra-proses. Simpan, pantau, dan pilih yang terbaik untuk
                tubuhmu dengan antarmuka yang modern dan mudah.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/foods"
                  className="
                    w-full sm:w-auto flex items-center justify-center gap-2 
                    px-8 py-4 rounded-2xl bg-stone-900 text-white font-bold 
                    hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] 
                    transition-all shadow-xl shadow-stone-200
                  "
                >
                  Lihat Katalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/foods/create"
                  className="
                    w-full sm:w-auto flex items-center justify-center gap-2 
                    px-8 py-4 rounded-2xl bg-white border-2 border-stone-100 
                    text-stone-700 font-bold hover:bg-stone-50 
                    transition-all
                  "
                >
                  Tambah Baru
                </Link>
              </div>

              {/* Trust Badge / Stats */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-stone-400 grayscale opacity-70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-tight">
                    Verified Data
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-tight">
                    Fresh First
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Element / Image */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none animate-fade-up stagger-2">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-linear-to-br from-amber-100 to-orange-50 flex items-center justify-center">
                  <UtensilsCrossed className="w-32 h-32 text-amber-500/20" />
                </div>
                {/* 
                  Di production, ganti dengan gambar makanan berkualitas tinggi.
                  Menggunakan div sebagai placeholder untuk menjamin tampilan bersih tanpa broken image.
                */}
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                  alt="Healthy Food Display"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Floating Cards for extra depth */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Kategori</p>
                  <p className="text-sm font-bold text-stone-900">100% Fresh</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 animate-bounce-slow delay-300">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Tracking</p>
                  <p className="text-sm font-bold text-stone-900">
                    UPF Analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-stone-50 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Mengapa Memilih FoodVault?
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Sistem manajemen makanan yang dirancang untuk membantu Anda hidup
              lebih sehat setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Klasifikasi Otomatis",
                desc: "Membedakan antara bahan segar dan ultra-processed food secara instan.",
                icon: Leaf,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "Detail Nutrisi",
                desc: "Pantau bahan-bahan yang ada di setiap makanan yang Anda simpan.",
                icon: UtensilsCrossed,
                color: "bg-amber-50 text-amber-600",
              },
              {
                title: "Akses Cepat",
                desc: "Antarmuka yang responsif memudahkan Anda mencari data di mana saja.",
                icon: Sparkles,
                color: "bg-blue-50 text-blue-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all animate-fade-up"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Add Button for Mobile UX */}
      <Link
        href="/foods/create"
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xl shadow-amber-200 active:scale-90 transition-transform z-40"
        aria-label="Tambah Makanan Baru"
      >
        <Sparkles className="w-6 h-6" />
      </Link>
    </div>
  );
}
