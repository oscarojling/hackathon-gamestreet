"use client";

import { useState, type ReactNode } from "react";
import { minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import type { Station } from "@/types";
import Logo from "@/components/Logo";
import TimeBar from "@/components/TimeBar";
import AddTimePopup from "@/components/AddTimePopup";
import { URGENT_MINUTES } from "@/lib/thresholds";
import Icon, { type IconName } from "@/components/Icon";
import GameCovers from "@/components/GameCovers";
import SpeedMarks from "@/components/SpeedMarks";
import PixelArt, { BURGER, CROWN, QUESTION, TROPHY } from "@/components/PixelArt";

type TileProps = { icon: IconName; title: string; sub: string; art?: ReactNode; artLeft?: boolean };

function ArrowDot() {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-offwhite/15 bg-night text-offwhite transition group-hover:border-purple group-hover:text-purple">
      <Icon name="arrow" className="size-4" />
    </span>
  );
}

function Tile({ icon, title, sub, art, artLeft }: TileProps) {
  return (
    <div className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-offwhite/10 bg-surface p-5 transition hover:border-purple/70">
      {art && artLeft ? art : <Icon name={icon} className="size-9 shrink-0 text-purple" />}
      <span className="flex-1">
        <span className="block font-display text-lg tracking-wide uppercase">{title}</span>
        <span className="block text-xs leading-snug text-offwhite/70">{sub}</span>
      </span>
      {art && !artLeft && art}
      <ArrowDot />
    </div>
  );
}

const SIDE: TileProps[] = [
  { icon: "globe", title: "Browser", sub: "Surf the web" },
  { icon: "headphones", title: "Voice chat", sub: "Stay in touch with your friends" },
];

const MORE: TileProps[] = [
  {
    icon: "food",
    title: "Food & drinks",
    sub: "Order in the lounge or see what's available",
    artLeft: true,
    art: (
      <span className="flex items-center gap-2">
        <PixelArt rows={BURGER} className="h-10 w-14" glow="#e8873a" />
        <Icon name="food" className="size-7 text-purple" />
      </span>
    ),
  },
  {
    icon: "trophy",
    title: "Events & tournaments",
    sub: "See what's happening at GameStreet",
    art: (
      <span className="flex flex-col items-center gap-0.5">
        <PixelArt rows={CROWN} className="h-5 w-9" glow="var(--color-yellow)" />
        <PixelArt rows={TROPHY} className="size-8" />
      </span>
    ),
  },
  {
    icon: "help",
    title: "Help",
    sub: "Need assistance? Ask our staff or see FAQs",
    art: (
      <span className="grid size-12 place-items-center rounded-lg border-2 border-purple/70 bg-night">
        <PixelArt rows={QUESTION} className="size-8" glow="var(--color-purple)" />
      </span>
    ),
  },
];

type Props = {
  station: Station;
  session: Session;
  onOpenLibrary: () => void; // starts the "game"
  onDemoAddTime: () => void;
};

// PC: "Ready to play?" dashboard, shown right after payment
export default function Launcher({ station, session, onOpenLibrary, onDemoAddTime }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const warning = remaining <= URGENT_MINUTES * minuteMs();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-[3vh] px-[4vw] py-[4vh]">
      <header className="relative flex items-center justify-between">
        <span className="flex items-center gap-6">
          <Logo />
          <span className="h-8 w-px bg-offwhite/20" />
          <span className="font-display text-xl tracking-wide uppercase">
            {station.name} <span className="text-purple">· {station.code}</span>
          </span>
        </span>
        <TimeBar
          remainingMs={remaining}
          warning={warning}
          addLabel="Add time"
          onAddTime={() => setPopupOpen((o) => !o)}
        />
        {popupOpen && (
          <div className="absolute top-full right-0 z-10 mt-3">
            <AddTimePopup code={station.code} onClose={() => setPopupOpen(false)} onDemoAddTime={onDemoAddTime} />
          </div>
        )}
      </header>

      <main className="grid flex-1 grid-cols-[1fr_1.7fr_1fr] gap-5">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            <SpeedMarks className="absolute -top-4 -left-8 size-12" direction="left" />
            <h1 className="-rotate-6 font-display text-[6.5vw] leading-[0.85] text-yellow uppercase text-outline [text-shadow:0_0.06em_0_var(--color-purple)]">
              Ready
              <br />
              <span className="text-lilac">to play?</span>
            </h1>
            <SpeedMarks className="absolute -right-10 bottom-0 size-12" direction="right" />
          </div>
          <p className="mt-8 text-lg text-offwhite/85">Pick a game and start playing.</p>
        </div>

        <button
          onClick={onOpenLibrary}
          className="group relative overflow-hidden rounded-2xl border border-offwhite/10 text-left transition hover:border-purple hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-purple)_40%,transparent)]"
        >
          <GameCovers />
          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
          <span className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl border border-offwhite/10 bg-night/85 p-4 backdrop-blur">
            <Icon name="gamepad" className="size-10 text-purple" />
            <span className="flex-1">
              <span className="block font-display text-3xl tracking-wide uppercase">Game library</span>
              <span className="block text-sm text-offwhite/75">Browse and launch games</span>
            </span>
            <span className="grid size-12 place-items-center rounded-full bg-yellow text-night shadow-[0_0_18px_var(--color-yellow)] transition group-hover:scale-110">
              <Icon name="arrow" className="size-6" />
            </span>
          </span>
        </button>

        <div className="flex flex-col justify-center gap-5">
          {SIDE.map((tile) => (
            <Tile key={tile.title} {...tile} />
          ))}
        </div>
      </main>

      <section>
        <p className="mb-3 font-display text-sm tracking-widest text-lilac uppercase">More at GameStreet</p>
        <div className="grid grid-cols-3 gap-5">
          {MORE.map((tile) => (
            <Tile key={tile.title} {...tile} />
          ))}
        </div>
      </section>
    </div>
  );
}
