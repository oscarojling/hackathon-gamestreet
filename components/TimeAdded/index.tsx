"use client";

import type { Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import type { Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Countdown from "@/components/Countdown";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";

type Props = {
  station: Station;
  session: Session;
  addedMinutes: number;
  onBackToSession: () => void;
  onAddMore: () => void;
};

// M5 success: "Time added!"
export default function TimeAdded({ station, session, addedMinutes, onBackToSession, onAddMore }: Props) {
  const now = useNow();

  return (
    <PhoneScreen station={station} status="active" statusNote={`+${addedMinutes} min added`}>
      <ScreenTitle sub="Your session has been extended.">
        Time
        <br />
        added!
      </ScreenTitle>

      <Countdown
        remainingMs={session.endsAt - now}
        totalMs={session.endsAt - session.startedAt}
        endsAt={session.endsAt}
      />

      <InfoRows
        title="Updated session"
        rows={[
          { icon: "clock", label: "Total playtime", value: `${session.totalMinutes} min` },
          { icon: "card", label: "Total paid", value: `${session.totalPaid} kr` },
        ]}
      />

      <div className="mt-auto flex flex-col gap-2">
        <Button onClick={onBackToSession}>Back to session</Button>
        <Button variant="outline" onClick={onAddMore}>
          Add more time
        </Button>
      </div>
    </PhoneScreen>
  );
}
