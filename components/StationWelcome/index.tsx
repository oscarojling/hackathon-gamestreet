import { Fragment } from "react";
import type { Station } from "@/types";
import { playtimeOptions } from "@/data/playtimeOptions";
import Logo from "@/components/Logo";
import StationQR from "@/components/StationQR";
import SpeedMarks from "@/components/SpeedMarks";
import Icon, { type IconName } from "@/components/Icon";

const STEPS = [
  { title: "Scan", sub: "the QR code" },
  { title: "Choose time", sub: "on your phone" },
  { title: "Pay", sub: "with Swish or card" },
  { title: "Play", sub: "This PC unlocks\nautomatically" },
];

const INFO: { icon: IconName; title: string; sub: string }[] = [
  { icon: "noAccount", title: "No booking or account needed.", sub: "Just scan, pay & play." },
  { icon: "food", title: "Food & drinks available", sub: "in the lounge." },
  { icon: "info", title: "No phone?", sub: "Ask at reception." },
];

// Big station chip shown above the QR ("Station · Glitch · 07 · Available / Paying")
function StationChip({ station, paying }: { station: Station; paying: boolean }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-purple/20 bg-[#1c1a44]/85 px-6 py-4 backdrop-blur">
      <Icon name="gamepad" className="size-11" />
      <span className="leading-none">
        <span className="block text-[13px] font-semibold tracking-[0.15em] text-lilac uppercase">Station</span>
        <span className="mt-1.5 block font-display text-[32px] tracking-wide uppercase">
          {station.name} <span className="text-purple">· {station.code}</span>
        </span>
      </span>
      <span
        className={`ml-2 flex items-center gap-2 font-display text-[18px] tracking-wide uppercase ${
          paying ? "text-yellow" : "text-green"
        }`}
      >
        <span
          className={`size-3 rounded-full ${
            paying ? "animate-pulse bg-yellow shadow-[0_0_8px_var(--color-yellow)]" : "bg-green shadow-[0_0_8px_var(--color-green)]"
          }`}
        />
        {paying ? "Paying" : "Available"}
      </span>
    </div>
  );
}

// PC screen 1 (1440×900 canvas): "Game on?" + QR
export default function StationWelcome({ station, paying = false }: { station: Station; paying?: boolean }) {
  const cheapest = playtimeOptions[0];

  return (
    <div className="flex h-full flex-col px-[64px] pt-[52px] pb-[36px]">
      <div className="grid flex-1 grid-cols-2 gap-10">
        {/* Left: logo + Game on? */}
        <div className="flex flex-col">
          <Logo />
          <div className="flex flex-1 flex-col items-center justify-center pb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/titles/game-on.png" alt="Game on?" className="h-[300px] w-auto" />
            <p className="mt-14 rounded-full bg-yellow px-9 py-3.5 font-display text-[30px] tracking-wide text-night uppercase shadow-[0_5px_0_#b88f0f]">
              From {cheapest.price} kr / {cheapest.minutes} min
            </p>
          </div>
        </div>

        {/* Right: chip centred over the QR */}
        <div className="flex flex-col items-center">
          <StationChip station={station} paying={paying} />
          <div className="mt-10">
            <StationQR code={station.code} size={256} waiting={paying} />
          </div>
          <p className="mt-6 font-display text-[54px] leading-none tracking-wide uppercase">Scan to play</p>
          <p className="mt-3 text-[22px] font-semibold text-lilac">Choose your time. Pay. Start playing.</p>
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-8 flex items-center justify-between">
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            <li className="flex items-center gap-4">
              <span className="grid size-[46px] place-items-center rounded-full bg-purple font-display text-[22px] shadow-[0_0_14px_var(--color-purple)]">
                {i + 1}
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[22px] tracking-wide uppercase">{step.title}</span>
                <span className="block text-[16px] whitespace-pre-line text-offwhite/75">{step.sub}</span>
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <li aria-hidden="true">
                <Icon name="arrow" className="size-7 text-purple" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      {/* Info row */}
      <ul className="mt-6 grid grid-cols-3 border-t border-offwhite/15 pt-6">
        {INFO.map((item, i) => (
          <li key={item.title} className={`flex items-center gap-4 px-6 ${i > 0 ? "border-l border-offwhite/15" : ""}`}>
            <Icon name={item.icon} className="size-11 shrink-0" />
            <span className="leading-snug">
              <span className="block text-[17px] font-semibold">{item.title}</span>
              <span className="block text-[16px] text-lilac">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
