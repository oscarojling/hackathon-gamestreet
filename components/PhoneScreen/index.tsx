import type { ReactNode } from "react";
import type { Station } from "@/types";
import PhoneHeader, { type StationStatus } from "@/components/PhoneHeader";

type Props = {
  station: Station;
  status?: StationStatus;
  statusNote?: string;
  onBack?: () => void;
  children: ReactNode;
};

// Shared frame for every phone screen: header, content, footer
export default function PhoneScreen({ station, status, statusNote, onBack, children }: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col gap-5 p-5 pb-3">
      <PhoneHeader station={station} status={status} statusNote={statusNote} onBack={onBack} />
      {children}
      <footer className="mt-2 flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.25em] opacity-50">
        <span>EAT · DRINK</span>
        <span className="grid size-6 place-items-center rounded-full border border-pink text-[8px] text-pink">GS</span>
        <span>PLAY · REPEAT</span>
      </footer>
      {/* Pixel corners */}
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 size-3 bg-purple" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 size-2 bg-pink" />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 size-3 bg-purple" />
      <span aria-hidden="true" className="pointer-events-none absolute right-3 bottom-3 size-2 bg-pink" />
    </section>
  );
}
