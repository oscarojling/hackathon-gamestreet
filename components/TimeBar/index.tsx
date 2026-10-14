"use client";

import type { ReactNode } from "react";
import { formatDuration } from "@/lib/time";
import Icon from "@/components/Icon";

type Props = {
  remainingMs: number;
  warning: boolean; // last 5 min: red
  onAddTime: () => void;
  addLabel?: string; // "Time" in-game, "Add time" on the dashboard
  compact?: boolean; // in-game: no "Time left" label
  children?: ReactNode; // extra buttons, e.g. "Games"
};

// Timer + "+ Time" button, shown on the dashboard and in-game
export default function TimeBar({ remainingMs, warning, onAddTime, addLabel = "Time", compact, children }: Props) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border bg-night/90 p-2 backdrop-blur ${
        warning ? "border-red/70 shadow-[0_0_20px_color-mix(in_srgb,var(--color-red)_40%,transparent)]" : "border-offwhite/10"
      }`}
    >
      <span className="flex items-center gap-2.5 px-3" role="timer">
        <Icon name="clock" className={`size-7 ${warning ? "text-red" : "text-purple"}`} />
        <span className="leading-none">
          {!compact && (
            <span className="block font-display text-[10px] tracking-[0.2em] text-lilac uppercase">Time left</span>
          )}
          <span className={`font-display text-3xl tabular-nums ${warning ? "text-red" : ""}`}>
            {formatDuration(remainingMs)}
          </span>
        </span>
      </span>
      <button
        onClick={onAddTime}
        className="flex items-center gap-1.5 rounded-xl bg-yellow px-4 py-2.5 font-display tracking-wide text-night uppercase transition hover:brightness-110 active:scale-[0.97]"
      >
        <Icon name="plus" className="size-4" /> {addLabel}
      </button>
      {children}
    </div>
  );
}
