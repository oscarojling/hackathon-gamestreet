import { formatClock } from "@/lib/session";
import { formatDuration } from "@/lib/time";

type Props = {
  remainingMs: number;
  totalMs: number;
  endsAt: number;
  warning?: boolean; // last minutes: pink with alarm marks
};

function AlarmMarks({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 24" className={`h-10 w-5 text-pink ${flip ? "-scale-x-100" : ""}`}>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M10 5 4 2" />
        <path d="M10 12H2" />
        <path d="M10 19 4 22" />
      </g>
    </svg>
  );
}

// "Timer component" from the UX component sheet
export default function Countdown({ remainingMs, totalMs, endsAt, warning }: Props) {
  const progress = Math.max(0, Math.min(1, remainingMs / totalMs));

  return (
    <div
      className={`rounded-2xl border bg-surface px-5 py-5 text-center ${
        warning ? "border-pink/60 shadow-[0_0_28px_color-mix(in_srgb,var(--color-pink)_45%,transparent)]" : "border-offwhite/10"
      }`}
    >
      <p className="font-display text-[11px] tracking-[0.2em] text-lilac uppercase">Time left</p>
      <div className="my-1 flex items-center justify-center gap-2">
        {warning && <AlarmMarks />}
        <p
          role="timer"
          className={`font-display text-7xl leading-none tabular-nums ${warning ? "text-pink text-outline" : ""}`}
        >
          {formatDuration(remainingMs)}
        </p>
        {warning && <AlarmMarks flip />}
      </div>
      <div className="mx-auto mt-3 h-2.5 w-5/6 overflow-hidden rounded-full bg-night">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${warning ? "bg-pink" : "bg-purple"}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-offwhite/70">Session ends at {formatClock(endsAt)}</p>
    </div>
  );
}
