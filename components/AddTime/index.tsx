"use client";

import { useState } from "react";
import { extendOptions } from "@/data/playtimeOptions";
import { formatClock, minuteMs, type Session } from "@/lib/session";
import type { PlaytimeOption, Station } from "@/types";
import type { PayMethod } from "@/components/Checkout";
import { METHODS } from "@/components/Checkout";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import OptionList from "@/components/OptionList";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PaymentOverlay from "@/components/PaymentOverlay";

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

// M5: "Add more time?" – the "Add more time card" from the UX sheet
export default function AddTime({ station, session, method, onBack, onPaid }: Props) {
  const [selected, setSelected] = useState<PlaytimeOption>(extendOptions[0]);
  const [phase, setPhase] = useState<"idle" | "waiting" | "done">("idle");
  const processing = phase !== "idle";

  const newEndsAt = Math.max(session.endsAt, Date.now()) + selected.minutes * minuteMs();
  const methodLabel = METHODS.find((m) => m.id === method)?.label ?? "Swish";

  function pay() {
    setPhase("waiting");
    setTimeout(() => {
      setPhase("done");
      navigator.vibrate?.(60);
      setTimeout(() => onPaid(selected), 900);
    }, 1800);
  }

  return (
    <PhoneScreen station={station} status="active" onBack={processing ? undefined : onBack}>
      <ScreenTitle sub="Keep playing without interruption.">
        Add more
        <br />
        time?
      </ScreenTitle>

      <div className="flex flex-col gap-3 rounded-2xl border border-offwhite/10 bg-surface p-3">
        <OptionList
          options={extendOptions}
          selected={selected}
          onSelect={setSelected}
          prefix="+ "
          labels={EXTEND_LABELS}
          disabled={processing}
        />

        <dl className="grid grid-cols-2 divide-x divide-offwhite/10 rounded-xl bg-night/50 p-3">
          <div className="flex items-center gap-3 pr-3">
            <Icon name="coins" className="size-5 text-purple" />
            <div>
              <dt className="text-[10px] tracking-wider text-lilac uppercase">Total amount</dt>
              <dd className="font-display text-lg">{selected.price} KR</dd>
            </div>
          </div>
          <div className="pl-4">
            <dt className="text-[10px] tracking-wider text-lilac uppercase">New end time</dt>
            <dd className="font-display text-lg">{formatClock(newEndsAt)}</dd>
          </div>
        </dl>

        <Button onClick={pay} loading={processing} loadingText="Paying…">
          Pay {selected.price} kr
        </Button>
      </div>

      <p className="mt-auto text-center text-xs text-offwhite/60">Paid with {methodLabel}</p>

      {processing && (
        <PaymentOverlay method={method} amount={selected.price} phase={phase === "done" ? "done" : "waiting"} />
      )}
    </PhoneScreen>
  );
}
