import type { Session } from "@/lib/session";
import type { Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Banner from "@/components/Banner";
import Alert from "@/components/Alert";
import Confetti from "@/components/Confetti";
import PixelArt, { GAMEPAD } from "@/components/PixelArt";

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
      <Alert tone="success" title="Payment successful!" />
      <ScreenTitle sub="Your playtime is ready. Head to your gaming station!">
        You&apos;re
        <br />
        all set!
      </ScreenTitle>

      <div className="rounded-2xl border border-offwhite/10 bg-surface">
        <div className="flex items-center justify-between border-b border-offwhite/10 p-4">
          <div className="flex items-center gap-3">
            <Icon name="gamepad" className="size-6 text-purple" />
            <div>
              <p className="text-[10px] tracking-wider text-lilac uppercase">Your station</p>
              <p className="font-display text-2xl leading-tight uppercase">
                {station.name} · {station.code}
              </p>
            </div>
          </div>
          <PixelArt rows={GAMEPAD} className="h-10 w-16" glow="var(--color-purple)" />
        </div>
        <dl className="grid grid-cols-2 divide-x divide-offwhite/10 p-4">
          <div className="flex items-center gap-3 pr-3">
            <Icon name="clock" className="size-6 text-purple" />
            <div>
              <dt className="text-[10px] tracking-wider text-lilac uppercase">Playtime</dt>
              <dd className="font-display text-lg">{session.totalMinutes} MIN</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-4">
            <Icon name="coins" className="size-6 text-purple" />
            <div>
              <dt className="text-[10px] tracking-wider text-lilac uppercase">Total paid</dt>
              <dd className="font-display text-lg">{session.totalPaid} KR</dd>
            </div>
          </div>
        </dl>
      </div>

      <Banner title="The timer will start automatically" sub="at the gaming station." />

      <Button onClick={onDone} className="mt-auto">
        Got it!
      </Button>
    </PhoneScreen>
  );
}
