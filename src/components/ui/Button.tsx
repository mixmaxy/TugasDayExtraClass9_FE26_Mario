// Komponen Button yang konsisten dengan variant system
// KENAPA buat abstraksi Button?
// Agar style dan behavior (disabled state, loading state) konsisten
// di seluruh aplikasi tanpa copy-paste class Tailwind yang panjang

import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  children: ReactNode;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow",
  secondary:
    "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200",
  danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
  ghost: "bg-transparent hover:bg-stone-100 text-stone-600",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  leftIcon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2
            className="w-4 h-4 animate-spin shrink-0"
            aria-hidden="true"
          />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
}
