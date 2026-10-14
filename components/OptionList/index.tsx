"use client";

import type { PlaytimeOption } from "@/types";
import Icon from "@/components/Icon";

type Props = {
  options: PlaytimeOption[];
  selected: PlaytimeOption;
  onSelect: (option: PlaytimeOption) => void;
  variant?: "tiles" | "list"; // tiles = M1 playtime cards, list = M5 add-time rows
  prefix?: string; // "+ " when extending
  labels?: Record<string, string>; // override labels per option id
  disabled?: boolean;
};

function Check({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
        on ? "border-offwhite bg-offwhite text-purple" : "border-offwhite/40"
      }`}
    >
      {on && <Icon name="check" className="size-3.5" />}
    </span>
  );
}

// Playtime selection: "tiles" (M1) or "list" (M5), both from the UX component sheet
export default function OptionList({
  options,
  selected,
  onSelect,
  variant = "list",
  prefix = "",
  labels,
  disabled,
}: Props) {
  return (
    <fieldset
      className={variant === "tiles" ? "grid grid-cols-3 gap-2.5" : "flex flex-col gap-2"}
      disabled={disabled}
    >
      <legend className="sr-only">Playtime</legend>
      {options.map((option) => {
        const on = option.id === selected.id;
        const input = (
          <input
            type="radio"
            name="playtime"
            value={option.id}
            checked={on}
            onChange={() => onSelect(option)}
            className="peer sr-only"
          />
        );
        const ring = "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-yellow";

        if (variant === "tiles") {
          return (
            <label
              key={option.id}
              className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-4 text-center transition ${ring} ${
                on
                  ? "border-purple bg-purple shadow-[0_0_24px_var(--color-purple)]"
                  : "border-offwhite/10 bg-surface hover:border-offwhite/30"
              }`}
            >
              {input}
              {on && (
                <span className="absolute -top-2 -right-2">
                  <Check on />
                </span>
              )}
              <Icon name="clock" className={`size-8 ${on ? "text-offwhite" : "text-purple"}`} />
              <span className="font-display text-2xl leading-none">
                {option.minutes} MIN
              </span>
              <span className={`font-display text-lg leading-none ${on ? "text-offwhite" : "text-purple"}`}>
                {option.price} KR
              </span>
              <span className="text-[11px] leading-tight opacity-70">{labels?.[option.id] ?? option.label}</span>
            </label>
          );
        }

        return (
          <label
            key={option.id}
            className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition ${ring} ${
              on
                ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                : "border-transparent bg-night/40 hover:border-offwhite/20"
            }`}
          >
            {input}
            <Icon name="clock" className={`size-6 shrink-0 ${on ? "text-offwhite" : "text-purple"}`} />
            <span className="flex-1">
              <span className="block font-display text-lg leading-tight">
                {prefix}
                {option.minutes} MIN
              </span>
              <span className="block text-xs opacity-70">{labels?.[option.id] ?? option.label}</span>
            </span>
            <span className="font-display text-lg">{option.price} KR</span>
            <Check on={on} />
          </label>
        );
      })}
    </fieldset>
  );
}
