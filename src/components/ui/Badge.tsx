// Komponen Badge reusable — dipakai di FoodCard dan FoodDetail

import type { ReactNode } from "react";

type BadgeVariant = "fresh" | "upf" | "neutral";

type BadgeProps = {
  variant: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
};

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  fresh: "bg-emerald-100 text-emerald-700 border-emerald-200",
  upf: "bg-orange-100 text-orange-700 border-orange-200",
  neutral: "bg-stone-100 text-stone-600 border-stone-200",
};

export function Badge({ variant, children, icon }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        text-xs font-semibold border
        ${VARIANT_STYLES[variant]}
      `}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
