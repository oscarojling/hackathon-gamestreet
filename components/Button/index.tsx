import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

type Variant = "primary" | "secondary" | "destructive" | "link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  arrow?: boolean; // arrow after the label
  icon?: IconName; // icon before the label
  loading?: boolean;
  loadingText?: ReactNode;
};

// Button states from the UX component sheet: default, hover, pressed, disabled, loading
const VARIANTS: Record<Variant, string> = {
  primary:
    "rounded-xl bg-yellow py-4 text-lg text-night shadow-[0_0_24px_color-mix(in_srgb,var(--color-yellow)_30%,transparent)] hover:brightness-110 active:brightness-95 disabled:bg-offwhite/20 disabled:text-offwhite/40 disabled:shadow-none",
  secondary:
    "rounded-xl border-2 border-purple bg-night py-3.5 text-purple hover:bg-purple hover:text-offwhite active:bg-purple/70 active:text-offwhite disabled:border-offwhite/15 disabled:text-offwhite/30",
  destructive:
    "rounded-xl border-2 border-red bg-night py-3.5 text-red hover:bg-red hover:text-offwhite active:bg-red/70 active:text-offwhite disabled:border-offwhite/15 disabled:text-offwhite/30",
  link: "py-2 text-purple normal-case hover:text-lilac disabled:text-offwhite/30",
};

const LOADING: Partial<Record<Variant, string>> = {
  primary: "",
  destructive: "!bg-red !text-offwhite",
};

export default function Button({
  variant = "primary",
  arrow = variant !== "destructive",
  icon,
  loading = false,
  loadingText = "Loading…",
  className = "",
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`flex w-full items-center justify-center gap-2 font-display tracking-wide uppercase transition active:scale-[0.98] ${VARIANTS[variant]} ${loading ? `${LOADING[variant] ?? ""} disabled:opacity-100` : ""} ${className}`}
    >
      {loading ? (
        <>
          {loadingText}
          <span className="size-5 animate-spin rounded-full border-2 border-dashed border-current" />
        </>
      ) : (
        <>
          {icon && <Icon name={icon} className="size-5" />}
          {children}
          {arrow && <Icon name="arrow" className="size-5" />}
        </>
      )}
    </button>
  );
}
