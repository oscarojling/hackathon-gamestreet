"use client";

import { useState } from "react";
import { playtimeOptions } from "@/data/playtimeOptions";
import { formatClock, minuteMs, type Session } from "@/lib/session";
import type { PlaytimeOption, Station } from "@/types";
import type { PayMethod } from "@/components/Checkout";
import { METHODS } from "@/components/Checkout";
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
  method: PayMethod; // re-use the method from the first payment
  onBack: () => void;
  onPaid: (option: PlaytimeOption) => void;
};

// M5: "Add more time?" – pay with the same method as before
export default function AddTime({ station, session, method, onBack, onPaid }: Props) {
  const [selected, setSelected] = useState<PlaytimeOption>(playtimeOptions[0]);
  const [processing, setProcessing] = useState(false);

  const newEndsAt = Math.max(session.endsAt, Date.now()) + selected.minutes * minuteMs();
  const methodLabel = METHODS.find((m) => m.id === method)?.label ?? "Swish";

  function pay() {
    setProcessing(true);
    setTimeout(() => onPaid(selected), 1500);
  }

  return (
    <PhoneScreen station={station} status="active" onBack={processing ? undefined : onBack}>
      <ScreenTitle sub="Keep playing without interruption.">
        Add more
        <br />
        time?
      </ScreenTitle>

      <OptionList
        options={playtimeOptions}
        selected={selected}
        onSelect={setSelected}
        prefix="+ "
        labels={EXTEND_LABELS}
        disabled={processing}
      />

      <dl className="grid grid-cols-2 divide-x divide-offwhite/10 rounded-2xl border border-offwhite/10 bg-surface p-4">
        <div className="flex items-center gap-3 pr-3">
          <Icon name="card" className="size-5 opacity-70" />
          <div>
            <dt className="text-[10px] uppercase opacity-60">Total amount</dt>
            <dd className="font-black">{selected.price} KR</dd>
          </div>
        </div>
        <div className="pl-4">
          <dt className="text-[10px] uppercase opacity-60">New session end time</dt>
          <dd className="font-black">{formatClock(newEndsAt)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-col gap-2">
        <Button onClick={pay} disabled={processing} arrow={!processing}>
          {processing ? `Paying with ${methodLabel}…` : `Pay ${selected.price} kr`}
        </Button>
        <p className="text-center text-xs opacity-60">Paid with {methodLabel}</p>
      </div>
    </PhoneScreen>
  );
}
