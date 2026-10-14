import type { Station } from "@/types";
import type { PayMethod } from "@/components/Checkout";
import { METHODS } from "@/components/Checkout";
import PhoneScreen from "@/components/PhoneScreen";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";
import EmailReceipt from "@/components/EmailReceipt";
import PixelArt, { TROPHY } from "@/components/PixelArt";
import SpeedMarks from "@/components/SpeedMarks";

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

// M6: "Session ended!" + "Session summary card" from the UX sheet
export default function SessionEnded({ station, summary, onPlayAgain }: Props) {
  const method = METHODS.find((m) => m.id === summary.method)?.label ?? "Swish";

  return (
    <PhoneScreen station={station} status="ended">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <SpeedMarks className="size-8" direction="left" />
          <PixelArt rows={TROPHY} className="size-16" glow="var(--color-yellow)" />
          <SpeedMarks className="size-8" direction="right" />
        </div>
        <h1 className="mt-3 -rotate-3 font-display text-[44px] leading-[0.88] uppercase text-outline [text-shadow:0_5px_0_var(--color-purple)]">
          <span className="text-yellow">Session</span>
          <br />
          <span className="text-pink">ended!</span>
        </h1>
        <p className="mt-3 text-sm text-offwhite/80">Thanks for playing!</p>
      </div>

      <InfoRows
        title="Session summary"
        rows={[
          { icon: "clock", label: "Time played", value: `${summary.playedMinutes} min` },
          { icon: "hourglass", label: "Time purchased", value: `${summary.totalMinutes} min` },
          { icon: "card", label: "Payment method", value: method },
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
