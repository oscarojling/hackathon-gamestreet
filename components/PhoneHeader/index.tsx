import type { Station } from "@/types";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import StatusChip, { type StationStatus } from "@/components/StatusChip";

export type { StationStatus };

type Props = {
  station: Station;
  status?: StationStatus;
  statusNote?: string; // e.g. "+30 min added"
  onBack?: () => void;
};

export default function PhoneHeader({ station, status = "available", statusNote, onBack }: Props) {
  return (
    <header className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="absolute left-0 grid size-10 place-items-center rounded-xl text-offwhite hover:bg-surface"
          >
            <Icon name="back" className="size-6" />
          </button>
        )}
        <Logo size="sm" />
      </div>
      <StatusChip station={station} status={status} note={statusNote} />
    </header>
  );
}
