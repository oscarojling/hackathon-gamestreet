import type { ReactNode } from "react";
import type { Station } from "@/types";
import PhoneHeader, { type StationStatus } from "@/components/PhoneHeader";
import GsBadge from "@/components/GsBadge";

type Props = {
  station: Station;
  status?: StationStatus;
  statusNote?: string;
  onBack?: () => void;
  children: ReactNode;
};

const CORNER = ["P..", ".PK", "..P"]; // pixel staircase

function PixelCorner({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 3 3" shapeRendering="crispEdges" className={`size-6 shrink-0 ${flip ? "-scale-x-100" : ""}`}>
      {CORNER.flatMap((row, y) =>
        [...row].map((c, x) =>
          c !== "." ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={c === "K" ? "var(--color-pink)" : "var(--color-purple)"} />
          ) : null,
        ),
      )}
    </svg>
  );
}

// Shared frame for every phone screen: header, content, "Eat · Drink · GS1 · Play · Repeat" footer
export default function PhoneScreen({ station, status, statusNote, onBack, children }: Props) {
  return (
    <section className="flex min-h-dvh flex-col gap-5 p-5 pb-3">
      <PhoneHeader station={station} status={status} statusNote={statusNote} onBack={onBack} />
      {children}
      <footer className="mt-auto flex items-end justify-between pt-2">
        <PixelCorner />
        <span className="flex items-center gap-3 font-display text-[11px] tracking-[0.2em] text-offwhite/60">
          <span>EAT · DRINK</span>
          <GsBadge className="size-10" />
          <span>PLAY · REPEAT</span>
        </span>
        <PixelCorner flip />
      </footer>
    </section>
  );
}
