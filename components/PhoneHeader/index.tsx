import type { Station } from "@/types";

type Props = {
  station: Station;
  status?: "available" | "active";
  onBack?: () => void;
};

export default function PhoneHeader({ station, status = "available", onBack }: Props) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} aria-label="Back" className="text-xl opacity-70">
            ←
          </button>
        )}
        <p className="text-2xl font-black text-pink">GameStreet</p>
      </div>
      <div className="flex items-center justify-between rounded-full bg-surface px-4 py-2 text-xs font-bold uppercase">
        <span>
          {station.name} · {station.code}
        </span>
        <span className="flex items-center gap-1.5 text-mint">
          <span className="size-2 rounded-full bg-mint" />
          {status}
        </span>
      </div>
    </header>
  );
}
