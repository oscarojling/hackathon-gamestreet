import type { Station } from "@/types";
import Icon from "@/components/Icon";

export type StationStatus = "available" | "active" | "ended";

type Props = {
  station: Station;
  status?: StationStatus;
  statusNote?: string; // e.g. "+30 min added"
  onBack?: () => void;
};

const STATUS_COLOR: Record<StationStatus, string> = {
  available: "text-green",
  active: "text-green",
  ended: "text-red",
};

export default function PhoneHeader({ station, status = "available", statusNote, onBack }: Props) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} aria-label="Back" className="opacity-80">
            <Icon name="back" />
          </button>
        )}
        {/* Pixel logo mark */}
        <span aria-hidden="true" className="grid grid-cols-3 gap-0.5">
          <span className="size-1.5" /> <span className="size-1.5" /> <span className="size-1.5 bg-pink" />
          <span className="size-1.5" /> <span className="size-1.5 bg-purple" /> <span className="size-1.5 bg-pink" />
          <span className="size-1.5 bg-purple" /> <span className="size-1.5 bg-pink" /> <span className="size-1.5 bg-purple" />
        </span>
        <p className="text-2xl font-black tracking-tight text-pink">GameStreet</p>
      </div>

      <div className="flex items-center justify-between rounded-full border border-offwhite/10 bg-surface px-4 py-2 text-xs font-bold uppercase">
        <span className="flex items-center gap-2">
          <Icon name="gamepad" className="size-4 opacity-70" />
          {station.name} <span className="text-purple">· {station.code}</span>
        </span>
        <span className={`flex flex-col items-end leading-tight ${STATUS_COLOR[status]}`}>
          <span className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${status === "ended" ? "bg-red" : "bg-green"}`} />
            {status}
          </span>
          {statusNote && <span className="text-[10px] font-medium normal-case opacity-80">{statusNote}</span>}
        </span>
      </div>
    </header>
  );
}
