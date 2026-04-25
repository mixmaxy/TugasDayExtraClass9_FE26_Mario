// Client Component untuk form pembuatan makanan
 
"use client";
 
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { FoodType } from "@/types/food";
import { PlusCircle, Loader2, AlertCircle } from "lucide-react";
 
const inputClass = `
  w-full px-4 py-2.5 rounded-xl
  border border-stone-200 bg-stone-50
  text-stone-900 placeholder:text-stone-400
  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
  transition-shadow
`;
 
const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";
 
export function CreateFoodForm() {
  const router = useRouter();
 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [type, setType] = useState<FoodType>("fresh");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
 
    try {
      const res = await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          ingredients: ingredients.trim(),
          type,
          imageUrl: imageUrl.trim() || undefined,
        }),
      });
 
      const json = await res.json();
 
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Gagal membuat makanan");
      }
 
      // Redirect ke list setelah berhasil
      // router.push() vs router.replace():
      // push() tambah ke history (bisa back), replace() tidak
      router.push("/foods");
      // refresh() agar list page mengambil data terbaru
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
 
  // Cek apakah form valid untuk enable/disable tombol submit
  const isFormValid = name.trim() && description.trim() && ingredients.trim() && type;
 
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}
 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nama */}
        <div className="sm:col-span-2">
          <label htmlFor="create-name" className={labelClass}>
            Nama Makanan{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="create-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Contoh: Salad Quinoa Mediterania"
            className={inputClass}
            aria-required="true"
          />
        </div>
 
        {/* Tipe */}
        <div>
          <label htmlFor="create-type" className={labelClass}>
            Tipe Makanan{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="create-type"
            value={type}
            onChange={(e) => setType(e.target.value as FoodType)}
            required
            className={inputClass}
          >
            <option value="fresh">🥦 Fresh (Makanan Segar)</option>
            <option value="upf">🏭 UPF (Ultra Processed Food)</option>
          </select>
        </div>
 
        {/* URL Gambar */}
        <div>
          <label htmlFor="create-image" className={labelClass}>
            URL Gambar{" "}
            <span className="text-stone-400 text-xs font-normal">(opsional)</span>
          </label>
          <input
            id="create-image"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://contoh.com/gambar.jpg"
            className={inputClass}
          />
        </div>
 
        {/* Bahan-bahan */}
        <div className="sm:col-span-2">
          <label htmlFor="create-ingredients" className={labelClass}>
            Bahan-bahan{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="create-ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            placeholder="Pisahkan dengan koma: quinoa, tomat, timun, zaitun, feta..."
            className={inputClass}
            aria-required="true"
          />
          <p className="mt-1 text-xs text-stone-400">
            Pisahkan setiap bahan dengan tanda koma ( , )
          </p>
        </div>
 
        {/* Deskripsi */}
        <div className="sm:col-span-2">
          <label htmlFor="create-description" className={labelClass}>
            Deskripsi{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="create-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Ceritakan tentang makanan ini — asal-usul, cara makan, manfaat nutrisi..."
            className={`${inputClass} resize-none`}
            aria-required="true"
          />
        </div>
      </div>
 
      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className="
          w-full flex items-center justify-center gap-2
          py-3 rounded-xl
          bg-amber-500 hover:bg-amber-600 active:scale-[0.98]
          text-white font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          transition-all duration-150
        "
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Membuat...</span>
          </>
        ) : (
          <>
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Buat Makanan</span>
          </>
        )}
      </button>
    </form>
  );
}