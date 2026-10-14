"use client";

import { useState } from "react";
import { extendOptions } from "@/data/playtimeOptions";
import { formatClock, minuteMs, type Session } from "@/lib/session";
import type { PlaytimeOption, Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import OptionList from "@/components/OptionList";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const EXTEND_LABELS: Record<string, string> = {
  "30": "A little more time",
  "60": "More time, more fun",
  "120": "Maximum playtime",
};

type Props = {
  station: Station;
  session: Session;
  onBack: () => void;
  onContinue: (option: PlaytimeOption) => void; // → payment method screen
};

// M5: "Add more time?" → then the same Choose payment method screen as M2
export default function AddTime({ station, session, onBack, onContinue }: Props) {
  const [selected, setSelected] = useState<PlaytimeOption>(extendOptions[0]);
  const newEndsAt = Math.max(session.endsAt, Date.now()) + selected.minutes * minuteMs();

  return (
    <PhoneScreen station={station} status="active" onBack={onBack}>
      <ScreenTitle sub="Keep playing without interruption.">
        Add
        <br />
        <span className="text-offwhite">more time?</span>
      </ScreenTitle>

      <OptionList
        options={extendOptions}
        selected={selected}
        onSelect={setSelected}
        prefix="+ "
        labels={EXTEND_LABELS}
      />

      <dl className="grid grid-cols-2 divide-x divide-offwhite/10 rounded-2xl border border-offwhite/10 bg-surface p-4">
        <div className="flex items-center gap-3 pr-3">
          <Icon name="card" className="size-6 text-purple" />
          <div>
            <dt className="text-[10px] tracking-wider text-lilac uppercase">Total amount</dt>
            <dd className="font-display text-lg">{selected.price} KR</dd>
          </div>
        </div>
        <div className="pl-4">
          <dt className="text-[10px] tracking-wider text-lilac uppercase">New session end time</dt>
          <dd className="font-display text-lg">{formatClock(newEndsAt)}</dd>
        </div>
      </dl>

      <Button onClick={() => onContinue(selected)}>Pay {selected.price} kr</Button>
    </PhoneScreen>
  );
}
