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

import { LOW_MINUTES, URGENT_MINUTES } from "@/lib/thresholds";
import Alert from "@/components/Alert";

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
  const low = remaining <= LOW_MINUTES * minuteMs();
  const urgent = remaining <= URGENT_MINUTES * minuteMs();

  useEffect(() => {
    if (remaining <= 0) onEnd();
  }, [remaining, onEnd]);

  return (
    <PhoneScreen station={station} status="active">
      {low ? (
        <Alert tone="warning" title={`${Math.max(1, Math.ceil(remaining / minuteMs()))} min left!`} sub="Want to keep playing?">
          <Button onClick={onAddTime} icon="plus" arrow={false} className="!py-3 !text-base">
            Add time
          </Button>
        </Alert>
      ) : (
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
        warning={urgent}
      />

      <Button onClick={onAddTime} icon="plus">
        Add more time
      </Button>

      <InfoRows
        title="Session details"
        rows={[
          { icon: "clock", label: "Purchased time", value: `${session.totalMinutes} min` },
          { icon: "coins", label: "Amount paid", value: `${session.totalPaid} kr` },
          { icon: "calendar", label: "Session ends at", value: formatClock(session.endsAt) },
        ]}
      >
        <Button variant="destructive" icon="logout" onClick={onEnd} className="normal-case">
          End session
        </Button>
      </InfoRows>
    </PhoneScreen>
  );
}
