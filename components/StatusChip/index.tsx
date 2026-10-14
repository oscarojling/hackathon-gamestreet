import type { Station } from "@/types";
import Icon from "@/components/Icon";

export type StationStatus = "available" | "active" | "ended";

type Props = {
  station: Station;
  status: StationStatus;
  note?: string; // e.g. "+30 min added"
  size?: "sm" | "lg";
};

// "Computer status header" from the UX component sheet
export default function StatusChip({ station, status, note, size = "sm" }: Props) {
  const ended = status === "ended";
  return (
    <div
      className={`flex items-center rounded-2xl border border-offwhite/10 bg-surface/90 backdrop-blur ${
        size === "lg" ? "gap-5 px-6 py-3.5 text-lg" : "gap-3 px-4 py-2.5 text-sm"
      }`}
    >
      <Icon name="gamepad" className={`text-lilac ${size === "lg" ? "size-7" : "size-5"}`} />
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] font-semibold tracking-[0.15em] text-lilac uppercase">
          {size === "lg" ? "Station" : "Your station"}
        </span>
        <span className={`font-display tracking-wide uppercase ${size === "lg" ? "text-2xl" : "text-lg"}`}>
          {station.name} <span className="text-purple">· {station.code}</span>
        </span>
      </span>
      <span className="ml-auto flex flex-col items-end leading-tight">
        <span className={`flex items-center gap-2 font-display tracking-wide uppercase ${ended ? "text-offwhite/55" : "text-green"}`}>
          <span
            className={`size-2.5 rounded-full ${ended ? "bg-offwhite/55" : "bg-green shadow-[0_0_8px_var(--color-green)]"}`}
          />
          {status}
        </span>
        {note && <span className="text-[10px] text-lilac">{note}</span>}
      </span>
    </div>
  );
}
