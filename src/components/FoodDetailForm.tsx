// "use client" karena ada state, event handler, dan router.push
// Dipisah dari page.tsx (Server Component) agar data fetching tetap di server
 
"use client";
 
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Food, FoodType } from "@/types/food";
import {
  Save,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
 
type FoodDetailFormProps = {
  food: Food;
};
 
// Input styling yang reusable
const inputClass = `
  w-full px-4 py-2.5 rounded-xl
  border border-stone-200 bg-stone-50
  text-stone-900 placeholder:text-stone-400
  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
  transition-shadow
`;
 
const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";
 
export function FoodDetailForm({ food }: FoodDetailFormProps) {
  const router = useRouter();
 
  // Pre-fill form dengan data yang sudah ada
  const [name, setName] = useState(food.name);
  const [description, setDescription] = useState(food.description);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [type, setType] = useState<FoodType>(food.type);
  const [imageUrl, setImageUrl] = useState(food.imageUrl ?? "");
 
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
 
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setFeedback(null);
 
    try {
      const res = await fetch(`/api/foods/${food.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, ingredients, type, imageUrl }),
      });
 
      const json = await res.json();
 
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Update gagal");
      }
 
      setFeedback({ type: "success", message: "Makanan berhasil diperbarui!" });
 
      // Reload halaman setelah update untuk sinkronisasi data server
      // router.refresh() me-refetch server component tanpa full page reload
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setFeedback({ type: "error", message });
    } finally {
      setIsUpdating(false);
    }
  };
 
  const handleDelete = async () => {
    // Konfirmasi sebelum delete - UX best practice
    const confirmed = window.confirm(
      `Yakin ingin menghapus "${food.name}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;
 
    setIsDeleting(true);
    setFeedback(null);
 
    try {
      const res = await fetch(`/api/foods/${food.id}`, {
        method: "DELETE",
      });
 
      const json = await res.json();
 
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Hapus gagal");
      }
 
      // Redirect ke list setelah berhasil hapus
      router.push("/foods");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setFeedback({ type: "error", message });
      setIsDeleting(false);
    }
  };
 
  return (
    <form onSubmit={handleUpdate} noValidate className="space-y-6">
      {/* Feedback Alert */}
      {feedback && (
        <div
          role="alert"
          aria-live="polite"
          className={`
            flex items-start gap-3 p-4 rounded-xl border text-sm
            ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }
          `}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          )}
          {feedback.message}
        </div>
      )}
 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nama */}
        <div className="sm:col-span-2">
          <label htmlFor="food-name" className={labelClass}>
            Nama Makanan <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="food-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Contoh: Nasi Goreng Kampung"
            className={inputClass}
            aria-required="true"
          />
        </div>
 
        {/* Tipe */}
        <div>
          <label htmlFor="food-type" className={labelClass}>
            Tipe Makanan <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="food-type"
            value={type}
            onChange={(e) => setType(e.target.value as FoodType)}
            required
            className={inputClass}
            aria-required="true"
          >
            <option value="fresh">🥦 Fresh (Makanan Segar)</option>
            <option value="upf">🏭 UPF (Ultra Processed Food)</option>
          </select>
        </div>
 
        {/* URL Gambar */}
        <div>
          <label htmlFor="food-image" className={labelClass}>
            URL Gambar
          </label>
          <input
            id="food-image"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://contoh.com/gambar.jpg"
            className={inputClass}
          />
        </div>
 
        {/* Bahan-bahan */}
        <div className="sm:col-span-2">
          <label htmlFor="food-ingredients" className={labelClass}>
            Bahan-bahan <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="food-ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            placeholder="Pisahkan bahan dengan koma: nasi, telur, bawang putih, ..."
            className={inputClass}
            aria-required="true"
          />
        </div>
 
        {/* Deskripsi */}
        <div className="sm:col-span-2">
          <label htmlFor="food-description" className={labelClass}>
            Deskripsi <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="food-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Ceritakan lebih lanjut tentang makanan ini..."
            className={`${inputClass} resize-none`}
            aria-required="true"
          />
        </div>
      </div>
 
      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
          className="
            flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl
            border border-red-200 bg-red-50 hover:bg-red-100
            text-red-600 font-medium text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
          aria-busy={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          )}
          {isDeleting ? "Menghapus..." : "Hapus Makanan"}
        </button>
 
        {/* Submit/Update Button */}
        <button
          type="submit"
          disabled={isUpdating || isDeleting}
          className="
            flex-1 flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl
            bg-amber-500 hover:bg-amber-600 active:scale-[0.98]
            text-white font-medium text-sm
            disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
            transition-all duration-150
          "
          aria-busy={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-4 h-4" aria-hidden="true" />
          )}
          {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}