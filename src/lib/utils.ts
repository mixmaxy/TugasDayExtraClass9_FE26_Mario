// Utility functions yang dipakai di berbagai tempat
 
/**
 * Memotong teks agar tidak melebihi panjang maksimum
 * Berguna untuk meta description dan preview text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
 
/**
 * Format tanggal ke format Indonesia
 * Contoh: "22 April 2025"
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(d);
}
 
/**
 * Parse string bahan-bahan menjadi array
 * "nasi, telur, bawang" → ["nasi", "telur", "bawang"]
 */
export function parseIngredients(ingredients: string): string[] {
  return ingredients
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean); // Hapus string kosong
}
 
/**
 * Gabungkan class names (mirip clsx tapi ringan)
 * Contoh: cn("base", isActive && "active", undefined) → "base active"
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
 
/**
 * Delay eksekusi (untuk testing loading state)
 * JANGAN dipakai di production!
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
 
/**
 * Capitalize first letter
 * "fresh" → "Fresh"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
 
/**
 * Label display untuk tipe makanan
 */
export const FOOD_TYPE_LABELS: Record<string, string> = {
  fresh: "Fresh",
  upf: "Ultra Processed Food",
} as const;