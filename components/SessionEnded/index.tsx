import type { Station } from "@/types";
import type { PayMethod } from "@/components/Checkout";
import { METHODS } from "@/components/Checkout";
import PhoneScreen from "@/components/PhoneScreen";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";
import EmailReceipt from "@/components/EmailReceipt";
import PixelArt, { TROPHY } from "@/components/PixelArt";

export type SessionSummary = {
  playedMinutes: number;
  totalMinutes: number; // bought
  totalPaid: number;
  method: PayMethod;
  startedAt: number;
  endedAt: number;
};

type Props = {
  station: Station;
  summary: SessionSummary;
  onPlayAgain: () => void;
};

// Two purple rays beside the trophy (UX frame)
function Rays({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={`size-12 ${flip ? "-scale-x-100" : ""}`}>
      <g stroke="var(--color-purple)" strokeWidth={4.5} strokeLinecap="round">
        <path d="M14 6 22 14" />
        <path d="M6 24 19 29" />
      </g>
    </svg>
  );
}

// M6: "Session ended!" + "Session summary card" from the UX sheet
export default function SessionEnded({ station, summary, onPlayAgain }: Props) {
  const method = METHODS.find((m) => m.id === summary.method)?.label ?? "Swish";

  return (
    <PhoneScreen station={station} status="ended">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4">
          <Rays />
          <PixelArt rows={TROPHY} className="size-20" />
          <Rays flip />
        </div>
        <h1 className="mt-3 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/titles/session-ended.png" alt="Session ended!" className="h-[96px] w-auto" />
        </h1>
        <p className="mt-2 text-lg text-lilac">Thanks for playing!</p>
      </div>

      <InfoRows
        title="Session summary"
        rows={[
          { icon: "clock", label: "Time played", value: `${summary.playedMinutes} min` },
          { icon: "hourglass", label: "Time purchased", value: `${summary.totalMinutes} min` },
          { icon: "card", label: "Payment method", value: method, keepCase: true },
          { icon: "coins", label: "Total paid", value: `${summary.totalPaid} kr`, highlight: true },
        ]}
      >
        <EmailReceipt station={station} summary={summary} />
      </InfoRows>

      <Button onClick={onPlayAgain} className="mt-auto">
        Play again
      </Button>
    </PhoneScreen>
  );
}
