import { minuteMs } from "@/lib/session";

// 42:15 under an hour, 1:12:15 over an hour.
// In ?fast demo mode a "minute" is 1 s, so scale back up to show real-looking minutes.
export function formatDuration(ms: number) {
  const scaled = (ms * 60_000) / minuteMs();
  const total = Math.max(0, Math.ceil(scaled / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
