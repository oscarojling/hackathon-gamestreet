"use client";

import type { PlaytimeOption } from "@/types";
import Icon from "@/components/Icon";

type Props = {
  options: PlaytimeOption[];
  selected: PlaytimeOption;
  onSelect: (option: PlaytimeOption) => void;
  prefix?: string; // "+" when extending
  labels?: Record<string, string>; // override labels per option id
  disabled?: boolean;
};

// Radio list of playtime options, used by M1 (pick) and M5 (add time)
export default function OptionList({ options, selected, onSelect, prefix = "", labels, disabled }: Props) {
  return (
    <fieldset className="flex flex-col gap-2.5" disabled={disabled}>
      <legend className="sr-only">Playtime</legend>
      {options.map((option) => {
        const isSelected = option.id === selected.id;
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition ${
              isSelected
                ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                : "border-offwhite/10 bg-surface"
            }`}
          >
            <Icon name="clock" className="size-5 shrink-0 opacity-80" />
            <span className="flex-1">
              <span className="block font-black">
                {prefix}
                {option.minutes} MIN
              </span>
              <span className="block text-xs opacity-70">{labels?.[option.id] ?? option.label}</span>
            </span>
            <span className="text-sm font-bold">{option.price} KR</span>
            <input
              type="radio"
              name="playtime"
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid size-5 place-items-center rounded-full border-2 ${
                isSelected ? "border-offwhite bg-offwhite text-purple" : "border-offwhite/40"
              } peer-focus-visible:ring-2 peer-focus-visible:ring-yellow`}
            >
              {isSelected && <Icon name="check" className="size-3" />}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
