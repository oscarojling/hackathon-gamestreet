"use client";

import { playtimeOptions } from "@/data/playtimeOptions";
import type { PlaytimeOption, Station } from "@/types";
import PhoneHeader from "@/components/PhoneHeader";

type Props = {
  station: Station;
  selected: PlaytimeOption;
  onSelect: (option: PlaytimeOption) => void;
  onContinue: () => void;
};

// M1: "How long will you play?"
export default function PlaytimePicker({ station, selected, onSelect, onContinue }: Props) {
  return (
    <section className="flex min-h-dvh flex-col gap-6 p-5">
      <PhoneHeader station={station} />

      <div>
        <h1 className="text-4xl font-black uppercase leading-none text-yellow">
          How long will you play?
        </h1>
        <p className="mt-2 text-sm opacity-70">Choose your playtime.</p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Playtime</legend>
        {playtimeOptions.map((option) => {
          const isSelected = option.id === selected.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition ${
                isSelected
                  ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                  : "border-surface bg-surface"
              }`}
            >
              <span>
                <span className="block text-lg font-black">{option.minutes} MIN</span>
                <span className="block text-xs opacity-70">{option.label}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-bold">{option.price} KR</span>
                <input
                  type="radio"
                  name="playtime"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => onSelect(option)}
                  className="size-5 accent-offwhite"
                />
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={onContinue}
          className="rounded-full bg-yellow py-4 font-black uppercase text-night shadow-[0_0_24px_var(--color-yellow)]"
        >
          Continue · {selected.price} kr →
        </button>
        <p className="text-center text-xs opacity-60">No app. No account. Just play.</p>
      </div>
    </section>
  );
}
