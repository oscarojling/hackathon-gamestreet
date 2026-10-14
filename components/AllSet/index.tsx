import type { Session } from "@/lib/session";
import type { Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Confetti from "@/components/Confetti";

type Props = {
  station: Station;
  session: Session;
  onDone: () => void;
};

// M3: "You're all set!"
export default function AllSet({ station, session, onDone }: Props) {
  return (
    <PhoneScreen station={station} status="active">
      <Confetti />
      <ScreenTitle sub="Your playtime is ready. Head to your gaming station!">
        You&apos;re
        <br />
        all set!
      </ScreenTitle>

      <div className="rounded-2xl border border-offwhite/10 bg-surface">
        <div className="flex items-center justify-between border-b border-offwhite/10 p-4">
          <div className="flex items-center gap-3">
            <Icon name="gamepad" className="size-5 opacity-70" />
            <div>
              <p className="text-[10px] uppercase opacity-60">Your station</p>
              <p className="text-lg font-black uppercase">
                {station.name} <span className="text-purple">· {station.code}</span>
              </p>
            </div>
          </div>
          <Icon name="gamepad" className="size-10 text-purple drop-shadow-[0_0_8px_var(--color-purple)]" />
        </div>
        <dl className="grid grid-cols-2 divide-x divide-offwhite/10 p-4">
          <div className="flex items-center gap-3 pr-3">
            <Icon name="clock" className="size-5 opacity-70" />
            <div>
              <dt className="text-[10px] uppercase opacity-60">Playtime</dt>
              <dd className="font-black">{session.totalMinutes} MIN</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-4">
            <Icon name="card" className="size-5 opacity-70" />
            <div>
              <dt className="text-[10px] uppercase opacity-60">Total paid</dt>
              <dd className="font-black">{session.totalPaid} KR</dd>
            </div>
          </div>
        </dl>
      </div>

      <p className="flex items-center gap-3 rounded-2xl border border-offwhite/10 bg-surface p-4 text-xs opacity-80">
        <Icon name="info" className="size-5 shrink-0" />
        The timer will start automatically at the gaming station.
      </p>

      <Button onClick={onDone} className="mt-auto">
        Got it!
      </Button>
    </PhoneScreen>
  );
}
