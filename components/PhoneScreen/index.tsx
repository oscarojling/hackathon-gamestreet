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

const CORNER = ["..P", ".PP", "PP."]; // pixel corner decoration

function PixelCorner({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 3 3"
      shapeRendering="crispEdges"
      className={`pointer-events-none absolute bottom-2 size-6 ${flip ? "right-2 -scale-x-100" : "left-2"}`}
    >
      {CORNER.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "P" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={(x + y) % 2 ? "var(--color-pink)" : "var(--color-purple)"} />
          ) : null,
        ),
      )}
    </svg>
  );
}

// Shared frame for every phone screen: header, content, footer
export default function PhoneScreen({ station, status, statusNote, onBack, children }: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col gap-5 p-5 pb-4">
      <PhoneHeader station={station} status={status} statusNote={statusNote} onBack={onBack} />
      {children}
      <footer className="mt-2 flex justify-center">
        <GsBadge className="size-14" />
      </footer>
      <PixelCorner />
      <PixelCorner flip />
    </section>
  );
}
