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

// M5 success: "Time added!" – the "Updated session card" from the UX sheet
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
          { icon: "receipt", label: "Total playtime", value: `${session.totalMinutes} min` },
          { icon: "coins", label: "Total paid", value: `${session.totalPaid} kr` },
        ]}
      >
        <Button onClick={onBackToSession}>Back to session</Button>
        <Button variant="secondary" onClick={onAddMore}>
          Add more time
        </Button>
      </InfoRows>
    </PhoneScreen>
  );
}
