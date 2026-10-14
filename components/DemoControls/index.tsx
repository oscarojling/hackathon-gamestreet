"use client";

import { minuteMs } from "@/lib/session";
import { DemoButton } from "@/components/AddTimePopup";

// Fast-forward steps for the live demo
export const SKIPS = [
  { label: "10 min left", minutes: 10 },
  { label: "5 min left", minutes: 5 },
  { label: "Ends in 10 s", minutes: 10 / 60 },
];

export const skipMs = (minutes: number) => Math.round(minutes * minuteMs());

// Small dashed demo panel (bottom-left on the PC screen). Shortcut: F cycles through the steps.
export default function DemoControls({ onSkip }: { onSkip: (msLeft: number) => void }) {
  return (
    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full bg-night/80 px-3 py-1.5 opacity-80 backdrop-blur hover:opacity-100">
      <span className="text-[11px] text-offwhite/60">⏩ Fast-forward:</span>
      {SKIPS.map((s) => (
        <DemoButton key={s.label} onClick={() => onSkip(skipMs(s.minutes))}>
          {s.label}
        </DemoButton>
      ))}
    </div>
  );
}
