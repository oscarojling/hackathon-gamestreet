import type { Station } from "@/types";
import Icon from "@/components/Icon";

export type StationStatus = "available" | "paying" | "active" | "ended";

type Props = {
  station: Station;
  status: StationStatus;
  note?: string; // e.g. "+30 min added"
  size?: "sm" | "lg";
};

// "Computer status header" from the UX component sheet
export default function StatusChip({ station, status, note, size = "sm" }: Props) {
  const ended = status === "ended";
  const paying = status === "paying";
  return (
    <div
      className={`flex items-center rounded-2xl border border-offwhite/10 bg-surface/90 backdrop-blur ${
        size === "lg" ? "gap-5 px-6 py-3.5 text-lg" : "gap-3 px-4 py-3 text-[15px]"
      }`}
    >
      <Icon name="gamepad" className={`${size === "lg" ? "size-7" : "size-7"}`} />
      <span className={`font-display tracking-wide uppercase ${size === "lg" ? "text-2xl" : "text-[19px]"}`}>
        {station.name} <span className="text-purple">· {station.code}</span>
      </span>
      <span className="h-6 w-px bg-offwhite/20" />
      <span className="ml-auto flex flex-col items-start leading-tight">
        <span className={`flex items-center gap-2 font-display tracking-wide uppercase ${ended ? "text-offwhite/55" : paying ? "text-yellow" : "text-green"}`}>
          <span
            className={`size-2.5 rounded-full ${ended ? "bg-offwhite/55" : paying ? "animate-pulse bg-yellow shadow-[0_0_8px_var(--color-yellow)]" : "bg-green shadow-[0_0_8px_var(--color-green)]"}`}
          />
          {status}
        </span>
        {note && <span className="pl-[18px] text-[11px] text-offwhite/75">{note}</span>}
      </span>
    </div>
  );
}
