import type { ButtonHTMLAttributes } from "react";
import Icon from "@/components/Icon";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  arrow?: boolean;
};

const VARIANTS = {
  primary:
    "bg-yellow py-4 text-night shadow-[0_0_24px_color-mix(in_srgb,var(--color-yellow)_60%,transparent)]",
  outline: "border-2 border-offwhite/30 py-2.5 text-xs text-offwhite",
};

export default function Button({ variant = "primary", arrow = true, className = "", children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`flex w-full items-center justify-center gap-2 rounded-full font-black uppercase transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {arrow && <Icon name="arrow" className="size-4" />}
    </button>
  );
}
