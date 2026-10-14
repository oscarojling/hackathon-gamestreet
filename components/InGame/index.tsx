"use client";

import { useState } from "react";
import { minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import type { Station } from "@/types";
import TimeBar from "@/components/TimeBar";
import AddTimePopup from "@/components/AddTimePopup";
import Icon from "@/components/Icon";

export const WARNING_MINUTES = 10;

type Props = {
  station: Station;
  session: Session;
  onGames: () => void; // back to the launcher
  onDemoAddTime: () => void; // demo stand-in for "phone paid for more time"
};

// PC: fake in-game view. The background is a game screenshot,
// the overlay is what GameStreet would draw on top of the game.
export default function InGame({ station, session, onGames, onDemoAddTime }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const warning = remaining <= WARNING_MINUTES * minuteMs();

  const [popupOpen, setPopupOpen] = useState(false);
  const [toastDismissedAt, setToastDismissedAt] = useState<number | null>(null);
  // Toast comes back if time was added and we're in the warning zone again
  const showToast = warning && !popupOpen && toastDismissedAt !== session.endsAt;

  return (
    <div className="relative h-full">
      <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
        <TimeBar remainingMs={remaining} warning={warning} onAddTime={() => setPopupOpen((o) => !o)}>
          <button
            onClick={onGames}
            className="flex items-center gap-1.5 rounded-xl border-2 border-purple px-4 py-2 font-display tracking-wide text-purple uppercase transition hover:bg-purple/15"
          >
            <Icon name="gamepad" className="size-4" /> Games
          </button>
        </TimeBar>

        {popupOpen && (
          <AddTimePopup code={station.code} onClose={() => setPopupOpen(false)} onDemoAddTime={onDemoAddTime} />
        )}

        {showToast && (
          <div className="animate-screen-in flex items-center gap-4 rounded-2xl border-2 border-yellow/60 bg-night/90 py-3 pr-3 pl-4 backdrop-blur">
            <Icon name="warning" className="size-7 text-yellow" />
            <span>
              <span className="block font-display text-lg tracking-wide text-yellow uppercase">
                {Math.max(1, Math.ceil(remaining / minuteMs()))} min left
              </span>
              <span className="block text-xs opacity-75">Want to keep playing?</span>
            </span>
            <button
              onClick={() => setPopupOpen(true)}
              className="rounded-xl bg-yellow px-3 py-2 font-display text-sm tracking-wide text-night uppercase"
            >
              + Add time
            </button>
            <button
              onClick={() => setToastDismissedAt(session.endsAt)}
              aria-label="Dismiss"
              className="self-start text-purple"
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
