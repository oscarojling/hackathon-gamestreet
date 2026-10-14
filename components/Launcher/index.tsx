"use client";

import { useState } from "react";
import { minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import { formatDuration } from "@/lib/time";
import { URGENT_MINUTES } from "@/lib/thresholds";
import type { Station } from "@/types";
import Logo from "@/components/Logo";
import AddTimePopup from "@/components/AddTimePopup";
import Icon, { type IconName } from "@/components/Icon";
import GameCovers from "@/components/GameCovers";
import SpeedMarks from "@/components/SpeedMarks";

function ArrowDot() {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-offwhite/15 text-offwhite/80 transition group-hover:border-purple group-hover:text-purple">
      <Icon name="arrow" className="size-4" />
    </span>
  );
}

type TileProps = { icon: IconName; title: string; sub: string; badge?: IconName };

// Right-column tile (Browser, Voice chat): tall, content centred vertically
function SideTile({ icon, title, sub }: TileProps) {
  return (
    <div className="group flex items-center gap-6 rounded-2xl border border-purple/20 bg-[#1c1a44]/85 px-7 transition hover:border-purple/70">
      <Icon name={icon} className="size-[58px] shrink-0" />
      <span className="flex-1 leading-tight">
        <span className="block font-display text-[24px] tracking-wide whitespace-nowrap uppercase">{title}</span>
        <span className="mt-1 block text-[17px] text-offwhite/75">{sub}</span>
      </span>
      <ArrowDot />
    </div>
  );
}

// Bottom-row tile (Food & drinks, Events, Help)
function MoreTile({ icon, title, sub, badge }: TileProps) {
  return (
    <div className="group relative flex items-center gap-5 rounded-2xl border border-purple/20 bg-[#1c1a44]/85 px-7 transition hover:border-purple/70">
      <Icon name={icon} className="size-[54px] shrink-0" />
      <span className="flex-1 leading-tight">
        <span className="block font-display text-[22px] tracking-wide uppercase">{title}</span>
        <span className="mt-1 block text-[16px] text-offwhite/75">{sub}</span>
      </span>
      {badge && <Icon name={badge} className="absolute top-4 right-[84px] size-9" />}
      <ArrowDot />
    </div>
  );
}

// Pixel staircases from the UX frame: ╲ (pink, bottom-left), ╱ (purple, bottom-right), small ╲ top-left
function PixelSteps({ dir, count, color, size, className }: { dir: "down" | "up"; count: number; color: string; size: number; className: string }) {
  return (
    <svg
      aria-hidden="true"
      width={count * size}
      height={count * size}
      viewBox={`0 0 ${count} ${count}`}
      shapeRendering="crispEdges"
      className={`pointer-events-none absolute ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <rect key={i} x={i} y={dir === "down" ? i : count - 1 - i} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}

type Props = {
  station: Station;
  session: Session;
  onOpenLibrary: () => void; // starts the "game"
  onDemoAddTime: () => void;
};

// PC: "Ready to play?" dashboard (1440×900 canvas, measured from the UX frame)
export default function Launcher({ station, session, onOpenLibrary, onDemoAddTime }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const urgent = remaining <= URGENT_MINUTES * minuteMs();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="relative flex h-full flex-col px-[64px] pt-[48px] pb-[56px]">
      <PixelSteps dir="down" count={4} size={16} color="var(--color-pink)" className="bottom-6 left-5" />
      <PixelSteps dir="up" count={5} size={16} color="var(--color-purple)" className="right-5 bottom-8" />
      <PixelSteps dir="down" count={3} size={13} color="var(--color-purple)" className="top-[226px] left-6" />

      {/* Header */}
      <header className="relative flex h-[88px] items-center justify-between">
        <span className="flex items-center gap-7">
          <Logo />
          <span className="h-14 w-px bg-offwhite/20" />
          <span className="flex items-center gap-5">
            <Icon name="gamepad" className="size-10" />
            <span className="leading-none">
              <span className="block text-[14px] font-semibold tracking-[0.15em] text-lilac uppercase">Your station</span>
              <span className="mt-2 block font-display text-[38px] tracking-wide uppercase">
                {station.name} <span className="text-purple">· {station.code}</span>
              </span>
            </span>
          </span>
        </span>

        <div
          className={`flex items-center gap-5 rounded-2xl border bg-[#1c1a44]/85 py-3 pr-3 pl-6 backdrop-blur ${
            urgent ? "border-red/70" : "border-offwhite/10"
          }`}
          role="timer"
        >
          <Icon name="clock" className={`size-10 ${urgent ? "text-red" : ""}`} />
          <span className="leading-none">
            <span className="block text-[13px] font-semibold tracking-[0.15em] text-lilac uppercase">Time left</span>
            <span className={`mt-1 block font-display text-[42px] tabular-nums ${urgent ? "text-red" : ""}`}>
              {formatDuration(remaining)}
            </span>
          </span>
          <button
            onClick={() => setPopupOpen((o) => !o)}
            className="ml-3 flex h-[56px] items-center gap-2 rounded-xl bg-yellow px-6 font-display text-[23px] tracking-wide text-night uppercase shadow-[0_4px_0_#b88f0f] transition hover:brightness-110"
          >
            <Icon name="plus" className="size-5" /> Add time
          </button>
        </div>

        {popupOpen && (
          <div className="absolute top-full right-0 z-10 mt-3">
            <AddTimePopup code={station.code} onClose={() => setPopupOpen(false)} onDemoAddTime={onDemoAddTime} />
          </div>
        )}
      </header>

      {/* Main */}
      <main className="mt-[40px] grid h-[424px] grid-cols-[368px_1fr_336px] gap-[26px]">
        <div className="flex flex-col items-center justify-center">
          <div className="relative -rotate-[7deg] text-center font-display leading-[0.85] uppercase [text-shadow:0_6px_0_rgba(8,14,38,0.55)]">
            <span className="block text-[78px] text-yellow">Ready</span>
            <span className="relative block text-[78px] whitespace-nowrap">
              <SpeedMarks className="absolute top-1/2 -left-10 size-9 -translate-y-1/2" direction="left" />
              <span className="text-yellow">To </span>
              <span className="text-lilac">play?</span>
              <SpeedMarks className="absolute top-1/2 -right-10 size-9 -translate-y-1/2" direction="right" />
            </span>
          </div>
          <p className="mt-12 text-[23px] text-offwhite/85">Pick a game and start playing.</p>
        </div>

        <button
          onClick={onOpenLibrary}
          className="group relative overflow-hidden rounded-2xl border border-offwhite/10 text-left transition hover:border-purple hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-purple)_40%,transparent)]"
        >
          <GameCovers />
          <span className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1c1a44] via-[#1c1a44]/80 to-transparent" />
          <span className="absolute inset-x-7 bottom-7 flex items-center gap-5">
            <span className="grid size-[64px] place-items-center rounded-full border-2 border-offwhite/10 bg-night/60">
              <Icon name="gamepad" className="size-9" />
            </span>
            <span className="flex-1 leading-tight">
              <span className="block font-display text-[42px] tracking-wide uppercase">Game library</span>
              <span className="block text-[21px] text-offwhite/80">Browse and launch games</span>
            </span>
            <span className="grid size-[72px] place-items-center rounded-full bg-yellow text-night shadow-[0_0_18px_color-mix(in_srgb,var(--color-yellow)_45%,transparent)] transition group-hover:scale-105">
              <Icon name="arrow" className="size-8" />
            </span>
          </span>
        </button>

        <div className="grid grid-rows-2 gap-[26px]">
          <SideTile icon="globe" title="Browser" sub="Surf the web" />
          <SideTile icon="headphones" title="Voice chat" sub="Stay in touch with your friends" />
        </div>
      </main>

      {/* More at GameStreet */}
      <section className="mt-[42px] border-t border-offwhite/15 pt-[30px]">
        <p className="font-display text-[19px] tracking-[0.12em] text-offwhite/80 uppercase">More at GameStreet</p>
        <div className="mt-[22px] grid h-[138px] grid-cols-3 gap-[26px]">
          <MoreTile icon="food" title="Food & drinks" sub="Order in the lounge or see what's available" />
          <MoreTile icon="trophy" title="Events & tournaments" sub="See what's happening at GameStreet" badge="crown" />
          <MoreTile icon="help" title="Help" sub="Need assistance? Ask our staff or see FAQs" />
        </div>
      </section>
    </div>
  );
}
