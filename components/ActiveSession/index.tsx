"use client";

import { useEffect } from "react";
import { formatClock, minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import type { Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Countdown from "@/components/Countdown";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const WARNING_MINUTES = 10;

type Props = {
  station: Station;
  session: Session;
  onAddTime: () => void;
  onEnd: () => void; // "End session" or time ran out
};

// M4: "Your session" with live countdown (turns pink in the last 10 min)
export default function ActiveSession({ station, session, onAddTime, onEnd }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const warning = remaining <= WARNING_MINUTES * minuteMs();

  useEffect(() => {
    if (remaining <= 0) onEnd();
  }, [remaining, onEnd]);

  return (
    <PhoneScreen station={station} status="active">
      {!warning && (
        <ScreenTitle>
          Your
          <br />
          session
        </ScreenTitle>
      )}

      <Countdown
        remainingMs={remaining}
        totalMs={session.endsAt - session.startedAt}
        endsAt={session.endsAt}
        warning={warning}
      />

      {warning && <p className="-mt-2 text-center text-sm text-pink">Want to keep playing?</p>}

      <Button onClick={onAddTime}>
        <Icon name="plus" className="size-4" /> Add more time
      </Button>

      <InfoRows
        title="Session details"
        rows={[
          { icon: "clock", label: "Purchased time", value: `${session.totalMinutes} min` },
          { icon: "card", label: "Amount paid", value: `${session.totalPaid} kr` },
          { icon: "clock", label: "Session ends at", value: formatClock(session.endsAt) },
        ]}
      />

      <button
        onClick={onEnd}
        className="mt-auto flex items-center gap-3 rounded-2xl border-2 border-red/60 px-4 py-3 text-sm font-bold text-red"
      >
        <Icon name="logout" className="size-4" />
        <span className="flex-1 text-left">End session</span>
        <Icon name="chevron" className="size-4" />
      </button>
    </PhoneScreen>
  );
}
