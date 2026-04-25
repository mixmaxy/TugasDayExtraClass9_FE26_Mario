// Komponen UI reusable untuk form field
// DRY principle: daripada menulis label + input + error message berulang kali,
// kita buat abstraksi yang konsisten di seluruh aplikasi

import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string; // Teks helper di bawah input
  error?: string; // Pesan error validasi
  optional?: boolean; // Tampilkan badge "(opsional)"
  children: ReactNode; // Input/Select/Textarea di dalamnya
};

export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  optional = false,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-stone-700 flex items-center gap-1.5"
      >
        {label}
        {required && (
          <span className="text-red-500 text-xs" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="text-stone-400 text-xs font-normal">(opsional)</span>
        )}
      </label>

      {/* Input slot */}
      {children}

      {/* Error message - lebih diprioritaskan dari hint */}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs text-red-600"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-stone-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
