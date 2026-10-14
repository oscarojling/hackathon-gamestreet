import type { Station } from "@/types";
import { playtimeOptions } from "@/data/playtimeOptions";
import Logo from "@/components/Logo";
import StationQR from "@/components/StationQR";
import StatusChip from "@/components/StatusChip";
import SpeedMarks from "@/components/SpeedMarks";
import Icon, { type IconName } from "@/components/Icon";

const STEPS = [
  { title: "Scan", sub: "the QR code" },
  { title: "Choose time", sub: "on your phone" },
  { title: "Pay", sub: "with Swish or card" },
  { title: "Play", sub: "This PC unlocks automatically" },
];

const INFO: { icon: IconName; title: string; sub: string }[] = [
  { icon: "noAccount", title: "No booking or account needed.", sub: "Just scan, pay & play." },
  { icon: "food", title: "Food & drinks available", sub: "in the lounge." },
  { icon: "info", title: "No phone?", sub: "Ask at reception." },
];

// PC screen 1: available + QR ("Game on?")
export default function StationWelcome({ station }: { station: Station }) {
  const cheapest = playtimeOptions[0];

  return (
    <div className="flex h-full flex-col px-[5vw] py-[4vh]">
      <header className="flex items-center justify-between">
        <Logo />
        <div className="w-[420px]">
          <StatusChip station={station} status="available" size="lg" />
        </div>
      </header>

      <main className="grid flex-1 grid-cols-2 items-center gap-[4vw]">
        <div className="text-center">
          <div className="relative inline-block">
            <SpeedMarks className="absolute top-1/2 -left-[10%] size-[5vw]" direction="left" />
            <h1 className="-rotate-3 font-display text-[10vw] leading-[0.85] uppercase text-outline [text-shadow:0_0.06em_0_var(--color-purple)]">
              <span className="block text-yellow">Game</span>
              <span className="block text-lilac">on?</span>
            </h1>
            <SpeedMarks className="absolute top-1/2 -right-[12%] size-[5vw]" direction="right" />
          </div>
          <p className="mt-8 inline-block rounded-xl bg-yellow px-8 py-3 font-display text-2xl tracking-wide text-night uppercase shadow-[0_0_30px_color-mix(in_srgb,var(--color-yellow)_45%,transparent)]">
            From {cheapest.price} kr / {cheapest.minutes} min
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <StationQR code={station.code} size={240} />
          <p className="font-display text-4xl tracking-wide uppercase">Scan to play</p>
          <p className="text-offwhite/80">Choose your time. Pay. Start playing.</p>
        </div>
      </main>

      <ol className="mx-auto flex items-center gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-center gap-6">
            <span className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-purple font-display text-xl shadow-[0_0_14px_var(--color-purple)]">
                {i + 1}
              </span>
              <span>
                <span className="block font-display text-lg tracking-wide uppercase">{step.title}</span>
                <span className="block max-w-36 text-xs text-offwhite/70">{step.sub}</span>
              </span>
            </span>
            {i < STEPS.length - 1 && <Icon name="arrow" className="size-6 text-purple" />}
          </li>
        ))}
      </ol>

      <ul className="mx-auto mt-6 flex divide-x divide-offwhite/15 rounded-2xl border border-offwhite/10 bg-surface/80 py-4 backdrop-blur">
        {INFO.map((item) => (
          <li key={item.title} className="flex items-center gap-3 px-8">
            <Icon name={item.icon} className="size-7 text-purple" />
            <span className="text-sm">
              <span className="block font-semibold">{item.title}</span>
              <span className="block text-offwhite/70">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
