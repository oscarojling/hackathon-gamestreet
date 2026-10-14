import type { Station } from "@/types";
import type { PayMethod } from "@/components/Checkout";
import EmailReceipt from "@/components/EmailReceipt";
import PhoneScreen from "@/components/PhoneScreen";
import InfoRows from "@/components/InfoRows";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

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

// M6: "Session ended!" + receipt
export default function SessionEnded({ station, summary, onPlayAgain }: Props) {
  return (
    <PhoneScreen station={station} status="ended">
      <div className="text-center">
        <Icon name="trophy" className="mx-auto size-14 text-pink drop-shadow-[0_0_12px_var(--color-pink)]" />
        <h1 className="mt-3 -rotate-3 text-4xl leading-[0.9] font-black uppercase italic [text-shadow:3px_3px_0_var(--color-night),5px_5px_0_var(--color-purple)]">
          <span className="text-yellow">Session</span>
          <br />
          <span className="text-pink">ended!</span>
        </h1>
        <p className="mt-3 text-sm opacity-75">Thanks for playing!</p>
      </div>

      <InfoRows
        title="Session summary"
        rows={[
          { icon: "clock", label: "Total playtime", value: `${summary.playedMinutes} min` },
          { icon: "card", label: "Amount paid", value: `${summary.totalPaid} kr` },
          { icon: "gamepad", label: "Played on", value: `${station.name} · ${station.code}` },
        ]}
      />

      <EmailReceipt station={station} summary={summary} />

      <Button onClick={onPlayAgain} className="mt-auto">
        Play again
      </Button>
    </PhoneScreen>
  );
}
