"use client";

import { useEffect } from "react";
import { formatClock, minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import { URGENT_MINUTES } from "@/lib/thresholds";
import type { Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Countdown from "@/components/Countdown";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Alert from "@/components/Alert";
import Confetti from "@/components/Confetti";

type Props = {
  station: Station;
  session: Session;
  addedMinutes?: number; // shows "+30 min added" after an extension
  justPaid?: boolean; // show "Payment successful!" for a few seconds
  onAddTime: () => void;
  onEnd: () => void; // "End session" or time ran out
};

// M4: "Your session" with live countdown (turns red in the last 5 min)
export default function ActiveSession({ station, session, addedMinutes, justPaid, onAddTime, onEnd }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const urgent = remaining <= URGENT_MINUTES * minuteMs();

  useEffect(() => {
    if (remaining <= 0) onEnd();
  }, [remaining, onEnd]);

  return (
    <PhoneScreen station={station} status="active">
      {justPaid && (
        <>
          {!addedMinutes && <Confetti />}
          <Alert tone="success" title="Payment successful!" autoHideMs={3500} />
        </>
      )}
      {!urgent && (
        <ScreenTitle image="your-session" alt="Your session" height={84} />
      )}

      <Countdown
        remainingMs={remaining}
        totalMs={session.endsAt - session.startedAt}
        endsAt={session.endsAt}
        warning={urgent}
        note={addedMinutes && !urgent ? `+ ${addedMinutes} min added` : undefined}
      />

      {urgent && <p className="-mb-2 text-center text-lg text-purple">Want to keep playing?</p>}

      <Button onClick={onAddTime} icon="plus">
        Add more time
      </Button>

      <InfoRows
        title="Session details"
        iconTone="white"
        rows={[
          { icon: "clock", label: "Purchased time", value: `${session.totalMinutes} min` },
          { icon: "card", label: "Amount paid", value: `${session.totalPaid} kr` },
          { icon: "calendar", label: "Session ends at", value: formatClock(session.endsAt) },
        ]}
      />
      <button
          onClick={onEnd}
          className="flex items-center gap-3 rounded-xl border-2 border-red px-4 py-3 text-red transition hover:bg-red hover:text-offwhite"
        >
          <Icon name="logout" className="size-5" />
          <span className="flex-1 text-left font-display tracking-wide">End session</span>
          <Icon name="chevron" className="size-5" />
        </button>
    </PhoneScreen>
  );
}
