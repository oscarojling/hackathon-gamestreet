"use client";

import { playtimeOptions } from "@/data/playtimeOptions";
import type { PlaytimeOption, Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import OptionList from "@/components/OptionList";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

type Props = {
  station: Station;
  selected: PlaytimeOption;
  onSelect: (option: PlaytimeOption) => void;
  onContinue: () => void;
};

// M1: "How long will you play?"
export default function PlaytimePicker({ station, selected, onSelect, onContinue }: Props) {
  return (
    <PhoneScreen station={station} status="available">
      <ScreenTitle sub="Choose your playtime." image="how-long" alt="How long will you play?" height={120} />

      <OptionList options={playtimeOptions} selected={selected} onSelect={onSelect} />

      <div className="mt-auto flex flex-col gap-2">
        <Button onClick={onContinue}>Continue – {selected.price} kr</Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-offwhite/60">
          <Icon name="lock" className="size-3.5" /> No app. No account. Just play.
        </p>
      </div>
    </PhoneScreen>
  );
}
