import type { Station } from "@/types";
import { playtimeOptions } from "@/data/playtimeOptions";
import Logo from "@/components/Logo";
import StationQR from "@/components/StationQR";
import Icon, { type IconName } from "@/components/Icon";

const STEPS = [
  { title: "Scan", sub: "the QR code" },
  { title: "Choose time", sub: "on your phone" },
  { title: "Pay", sub: "with Swish or card" },
  { title: "Play", sub: "This PC unlocks automatically" },
];

const INFO: { icon: IconName; title: string; sub: string }[] = [
  { icon: "gamepad", title: "No booking or account needed.", sub: "Just scan, pay & play." },
  { icon: "card", title: "Food & drinks available", sub: "in the lounge." },
  { icon: "info", title: "No phone?", sub: "Ask at reception." },
];

// PC screen 1: available + QR ("Game on?")
export default function StationWelcome({ station }: { station: Station }) {
  const cheapest = playtimeOptions[0];

  return (
    <div className="flex h-full flex-col px-[5vw] py-[4vh]">
      <header className="flex items-center justify-between">
        <Logo />
        <span className="flex items-center gap-4 rounded-full border border-offwhite/10 bg-surface/80 px-5 py-2.5 text-sm font-bold uppercase backdrop-blur">
          <Icon name="gamepad" className="size-5 opacity-70" />
          {station.name} <span className="text-purple">· {station.code}</span>
          <span className="flex items-center gap-2 text-green">
            <span className="size-2.5 rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" /> Available
          </span>
        </span>
      </header>

      <main className="grid flex-1 grid-cols-2 items-center gap-[4vw]">
        <div className="text-center">
          <h1 className="-rotate-3 text-[9vw] leading-[0.85] font-black uppercase italic [text-shadow:6px_6px_0_var(--color-night),10px_10px_0_var(--color-purple)]">
            <span className="block text-yellow">Game</span>
            <span className="block text-purple [text-shadow:6px_6px_0_var(--color-night),10px_10px_0_var(--color-pink)]">
              on?
            </span>
          </h1>
          <p className="mt-8 inline-block rounded-full bg-yellow px-8 py-3 text-xl font-black text-night uppercase shadow-[0_0_30px_color-mix(in_srgb,var(--color-yellow)_50%,transparent)]">
            From {cheapest.price} kr / {cheapest.minutes} min
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <StationQR code={station.code} size={220} />
          <p className="text-3xl font-black uppercase">Scan to play</p>
          <p className="opacity-75">Choose your time. Pay. Start playing.</p>
        </div>
      </main>

      <ol className="mx-auto flex items-center gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-center gap-6">
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-purple font-black shadow-[0_0_14px_var(--color-purple)]">
                {i + 1}
              </span>
              <span>
                <span className="block font-black uppercase">{step.title}</span>
                <span className="block max-w-36 text-xs opacity-70">{step.sub}</span>
              </span>
            </span>
            {i < STEPS.length - 1 && <Icon name="arrow" className="size-5 text-purple" />}
          </li>
        ))}
      </ol>

      <ul className="mx-auto mt-6 flex divide-x divide-offwhite/15 border-t border-offwhite/10 pt-5">
        {INFO.map((item) => (
          <li key={item.title} className="flex items-center gap-3 px-8">
            <Icon name={item.icon} className="size-7 opacity-70" />
            <span className="text-sm">
              <span className="block font-bold">{item.title}</span>
              <span className="block opacity-70">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
