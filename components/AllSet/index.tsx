import type { Session } from "@/lib/session";
import { formatClock } from "@/lib/session";
import type { Station } from "@/types";
import PhoneHeader from "@/components/PhoneHeader";

type Props = {
  station: Station;
  session: Session;
  onDone: () => void;
};

// M3: "You're all set!"
export default function AllSet({ station, session, onDone }: Props) {
  return (
    <section className="flex min-h-dvh flex-col gap-6 p-5">
      <PhoneHeader station={station} status="active" />

      <div>
        <h1 className="text-5xl font-black uppercase leading-none text-yellow">You&apos;re all set!</h1>
        <p className="mt-2 text-sm opacity-70">Your playtime is ready. Head to your gaming station!</p>
      </div>

      <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-surface p-4">
        <div className="col-span-2">
          <dt className="text-xs uppercase opacity-60">Your station</dt>
          <dd className="text-xl font-black">
            {station.name} · {station.code}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase opacity-60">Playtime</dt>
          <dd className="text-lg font-bold">{session.totalMinutes} min</dd>
        </div>
        <div>
          <dt className="text-xs uppercase opacity-60">Total paid</dt>
          <dd className="text-lg font-bold">{session.totalPaid} kr</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs uppercase opacity-60">Session ends</dt>
          <dd className="text-lg font-bold">{formatClock(session.endsAt)}</dd>
        </div>
      </dl>

      <p className="rounded-2xl border-2 border-surface p-4 text-sm opacity-80">
        ⓘ The timer starts automatically at the gaming station.
      </p>

      <button
        onClick={onDone}
        className="mt-auto rounded-full bg-yellow py-4 font-black uppercase text-night shadow-[0_0_24px_var(--color-yellow)]"
      >
        Got it! →
      </button>
    </section>
  );
}
