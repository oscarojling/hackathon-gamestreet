"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";

export const STAGE_W = 1440;
export const STAGE_H = 900;

// PC screens are designed on a fixed 1440×900 canvas (like the UX frames)
// and scaled to fit the window, so the layout always looks exactly as designed.
export default function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-night">
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}
