import { formatClock } from "@/lib/session";
import { formatDuration } from "@/lib/time";

type Props = {
  remainingMs: number;
  totalMs: number;
  endsAt: number;
  warning?: boolean; // last minutes: pink + glow
};

// Big "TIME LEFT" card with progress bar
export default function Countdown({ remainingMs, totalMs, endsAt, warning }: Props) {
  const progress = Math.max(0, Math.min(1, remainingMs / totalMs));

  return (
    <div
      className={`rounded-2xl border-2 bg-surface p-5 text-center ${
        warning ? "border-pink shadow-[0_0_24px_var(--color-pink)]" : "border-offwhite/10"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Time left</p>
      <p
        className={`my-1 text-6xl font-black tabular-nums ${warning ? "text-pink" : ""}`}
        role="timer"
        aria-live="off"
      >
        {formatDuration(remainingMs)}
      </p>
      <div className="mx-auto h-2 w-4/5 overflow-hidden rounded-full bg-night">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${warning ? "bg-pink" : "bg-purple"}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs opacity-60">Session ends at {formatClock(endsAt)}</p>
    </div>
  );
}
