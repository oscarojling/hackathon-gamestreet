"use client";

import { useState } from "react";
import { minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import { formatDuration } from "@/lib/time";
import type { Station } from "@/types";
import AddTimePopup from "@/components/AddTimePopup";
import Icon from "@/components/Icon";
import { LOW_MINUTES, URGENT_MINUTES } from "@/lib/thresholds";

type Props = {
  station: Station;
  session: Session;
  onGames: () => void; // back to the launcher
  onDemoAddTime: () => void; // demo stand-in for "phone paid for more time"
};

// PC: in-game overlay. Kept small so it draws little attention:
// timer + kebab (⋮); the kebab reveals "+ Time" and "Games".
export default function InGame({ station, session, onGames, onDemoAddTime }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const low = remaining <= LOW_MINUTES * minuteMs();
  const urgent = remaining <= URGENT_MINUTES * minuteMs();

  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [toastDismissedAt, setToastDismissedAt] = useState<number | null>(null);
  // Popup comes back if time was added and we're in the last 10 min again
  const showToast = low && !popupOpen && toastDismissedAt !== session.endsAt;

  return (
    <div className="relative h-full">
      <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
        <div
          className={`flex items-center gap-2 rounded-2xl border bg-night/90 p-2 backdrop-blur ${
            urgent ? "border-red/70" : "border-offwhite/10"
          }`}
        >
          <span className="flex items-center gap-2.5 px-3" role="timer">
            <Icon name="clock" className={`size-7 ${urgent ? "text-red" : "text-purple"}`} />
            <span className={`font-display text-3xl tabular-nums ${urgent ? "text-red" : ""}`}>
              {formatDuration(remaining)}
            </span>
          </span>

          {menuOpen && (
            <>
              <button
                onClick={() => setPopupOpen((o) => !o)}
                className="animate-screen-in flex items-center gap-1.5 rounded-xl bg-yellow px-4 py-2.5 font-display tracking-wide text-night uppercase transition hover:brightness-110"
              >
                <Icon name="plus" className="size-4" /> Time
              </button>
              <button
                onClick={onGames}
                className="animate-screen-in flex items-center gap-1.5 rounded-xl bg-surface px-4 py-2.5 font-display tracking-wide uppercase transition hover:bg-purple"
              >
                <Icon name="gamepad" className="size-5 text-lilac" /> Games
              </button>
            </>
          )}

          <button
            onClick={() => {
              setMenuOpen((o) => !o);
              setPopupOpen(false);
            }}
            aria-label={menuOpen ? "Hide menu" : "Show menu"}
            aria-expanded={menuOpen}
            className={`grid size-11 place-items-center rounded-xl transition ${
              menuOpen ? "bg-purple" : "hover:bg-surface"
            }`}
          >
            <Icon name="kebab" className="size-6" />
          </button>
        </div>

        {popupOpen && (
          <AddTimePopup code={station.code} onClose={() => setPopupOpen(false)} onDemoAddTime={onDemoAddTime} />
        )}

        {showToast && (
          <div className="animate-screen-in flex items-start gap-3 rounded-2xl border border-offwhite/10 bg-night/90 py-3 pr-3 pl-4 backdrop-blur">
            <Icon name="alert" className="size-9 shrink-0 text-yellow" />
            <span className="pr-4">
              <span className="block font-display text-lg tracking-wide text-yellow uppercase">
                {Math.max(1, Math.ceil(remaining / minuteMs()))} min left
              </span>
              <span className="block text-sm text-offwhite/80">Want to keep playing? Add time on your phone.</span>
            </span>
            <button
              onClick={() => setToastDismissedAt(session.endsAt)}
              aria-label="Dismiss"
              className="text-purple hover:text-lilac"
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
