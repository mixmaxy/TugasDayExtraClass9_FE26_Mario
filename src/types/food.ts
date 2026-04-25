import type { Food, FoodType } from "@prisma/client";
 
// Re-export Prisma types agar konsisten di seluruh aplikasi
export type { Food, FoodType };
 
// Type untuk form create/update (tanpa auto-generated fields)
export type FoodFormData = {
  name: string;
  ingredients: string;
  description: string;
  type: FoodType;
  imageUrl?: string;
};
 
// Type untuk API response wrapper
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };