"use client";

import type { ReactNode } from "react";
import { formatDuration } from "@/lib/time";
import Icon from "@/components/Icon";

type Props = {
  remainingMs: number;
  warning: boolean;
  onAddTime: () => void;
  children?: ReactNode; // extra buttons, e.g. "Games"
};

// Timer + "+ Time" pill, shown on the launcher and in-game
export default function TimeBar({ remainingMs, warning, onAddTime, children }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-offwhite/10 bg-night/85 p-2 backdrop-blur">
      <span className="flex items-center gap-2 px-3" role="timer">
        <Icon name="clock" className="size-6 opacity-80" />
        <span className="leading-none">
          <span className="block text-[9px] font-bold tracking-widest uppercase opacity-60">Time left</span>
          <span className={`text-2xl font-black tabular-nums ${warning ? "text-pink" : ""}`}>
            {formatDuration(remainingMs)}
          </span>
        </span>
      </span>
      <button
        onClick={onAddTime}
        className="flex items-center gap-1.5 rounded-xl bg-yellow px-4 py-2 text-sm font-black text-night uppercase"
      >
        <Icon name="plus" className="size-4" /> Time
      </button>
      {children}
    </div>
  );
}
