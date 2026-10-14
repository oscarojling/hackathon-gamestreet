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

      {warning && <p className="-mt-2 text-center font-display text-lg text-pink">Want to keep playing?</p>}

      <Button onClick={onAddTime} icon="plus">
        Add more time
      </Button>

      <InfoRows
        title="Session details"
        rows={[
          { icon: "clock", label: "Purchased time", value: `${session.totalMinutes} min` },
          { icon: "coins", label: "Amount paid", value: `${session.totalPaid} kr` },
          { icon: "receipt", label: "Session ends at", value: formatClock(session.endsAt) },
        ]}
      >
        <Button variant="destructive" icon="logout" onClick={onEnd} className="normal-case">
          End session
        </Button>
      </InfoRows>
    </PhoneScreen>
  );
}
