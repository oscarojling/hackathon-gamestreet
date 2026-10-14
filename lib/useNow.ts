"use client";

import { useEffect, useState } from "react";

// Re-renders every second with the current time.
// Ticks are aligned to the wall-clock second, so the phone and PC tabs flip at the same moment.
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => setNow(Date.now());
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, intervalMs);
    }, intervalMs - (Date.now() % intervalMs));
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [intervalMs]);
  return now;
}
