// Custom hook untuk mengelola state form makanan
//
// KENAPA custom hook?
// Logika form (state, validation, submit handler) sama antara CreateFoodForm
// dan FoodDetailForm. Dengan custom hook kita:
// 1. Hindari duplikasi kode (DRY)
// 2. Pisahkan "business logic" dari "presentation" → komponen lebih bersih
// 3. Mudah di-test secara terpisah
 
"use client";
 
import { useState } from "react";
import type { FoodType } from "@/types/food";
 
export type FoodFormValues = {
  name: string;
  description: string;
  ingredients: string;
  type: FoodType;
  imageUrl: string;
};
 
type UseFoodFormOptions = {
  initialValues?: Partial<FoodFormValues>;
};
 
const DEFAULT_VALUES: FoodFormValues = {
  name: "",
  description: "",
  ingredients: "",
  type: "fresh",
  imageUrl: "",
};
 
export function useFoodForm({ initialValues = {} }: UseFoodFormOptions = {}) {
  const [values, setValues] = useState<FoodFormValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });
 
  const [errors, setErrors] = useState<Partial<Record<keyof FoodFormValues, string>>>({});
 
  // Handler generik untuk update field apa pun
  const handleChange = <K extends keyof FoodFormValues>(
    field: K,
    value: FoodFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Hapus error saat user mulai mengetik ulang
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
 
  // Validasi client-side sebelum submit
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FoodFormValues, string>> = {};
 
    if (!values.name.trim()) {
      newErrors.name = "Nama makanan wajib diisi";
    }
    if (!values.description.trim()) {
      newErrors.description = "Deskripsi wajib diisi";
    } else if (values.description.trim().length < 10) {
      newErrors.description = "Deskripsi minimal 10 karakter";
    }
    if (!values.ingredients.trim()) {
      newErrors.ingredients = "Bahan-bahan wajib diisi";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const reset = () => {
    setValues({ ...DEFAULT_VALUES, ...initialValues });
    setErrors({});
  };
 
  const isValid =
    values.name.trim() !== "" &&
    values.description.trim() !== "" &&
    values.ingredients.trim() !== "";
 
  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
    isValid,
  };
}