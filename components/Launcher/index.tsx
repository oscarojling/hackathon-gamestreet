"use client";

import { useState } from "react";
import { minuteMs, type Session } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import type { Station } from "@/types";
import Logo from "@/components/Logo";
import TimeBar from "@/components/TimeBar";
import AddTimePopup from "@/components/AddTimePopup";
import { WARNING_MINUTES } from "@/components/InGame";
import Icon, { type IconName } from "@/components/Icon";

// Placeholder game covers until the designers' images arrive.
// Put images in /public/games/1.jpg … 4.jpg and they show automatically.
const COVERS = [
  "linear-gradient(160deg, #3a2a5c, #10192d)",
  "linear-gradient(160deg, #7632fa, #2a1660)",
  "linear-gradient(160deg, #fc42b7, #3b1640)",
  "linear-gradient(160deg, #01f39a, #123a44)",
];

const SIDE: { icon: IconName; title: string; sub: string }[] = [
  { icon: "globe", title: "Browser", sub: "Surf the web" },
  { icon: "headphones", title: "Voice chat", sub: "Stay in touch with your friends" },
];

const MORE: { icon: IconName; title: string; sub: string }[] = [
  { icon: "food", title: "Food & drinks", sub: "Order in the lounge or see what's available" },
  { icon: "trophy", title: "Events & tournaments", sub: "See what's happening at GameStreet" },
  { icon: "help", title: "Help", sub: "Need assistance? Ask our staff or see FAQs" },
];

function Tile({ icon, title, sub }: { icon: IconName; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-offwhite/10 bg-surface/80 p-5">
      <Icon name={icon} className="size-9 shrink-0 text-offwhite/80" />
      <span className="flex-1">
        <span className="block font-black uppercase">{title}</span>
        <span className="block text-xs opacity-65">{sub}</span>
      </span>
      <span className="grid size-8 place-items-center rounded-full bg-night">
        <Icon name="arrow" className="size-4" />
      </span>
    </div>
  );
}

type Props = {
  station: Station;
  session: Session;
  onOpenLibrary: () => void; // starts the "game"
  onDemoAddTime: () => void;
};

// PC: "Ready to play?" launcher, shown right after payment
export default function Launcher({ station, session, onOpenLibrary, onDemoAddTime }: Props) {
  const now = useNow();
  const remaining = session.endsAt - now;
  const warning = remaining <= WARNING_MINUTES * minuteMs();
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-[3vh] px-[4vw] py-[4vh]">
      <header className="relative flex items-center justify-between">
        <span className="flex items-center gap-6">
          <Logo />
          <span className="border-l border-offwhite/15 pl-6 text-sm font-bold uppercase">
            {station.name} <span className="text-purple">· {station.code}</span>
          </span>
        </span>
        <TimeBar remainingMs={remaining} warning={warning} onAddTime={() => setPopupOpen((o) => !o)} />
        {popupOpen && (
          <div className="absolute top-full right-0 z-10 mt-3">
            <AddTimePopup
              code={station.code}
              onClose={() => setPopupOpen(false)}
              onDemoAddTime={onDemoAddTime}
            />
          </div>
        )}
      </header>

      <main className="grid flex-1 grid-cols-[1fr_1.6fr_1fr] gap-5">
        <div className="flex flex-col justify-center text-center">
          <h1 className="-rotate-3 text-[5.5vw] leading-[0.85] font-black text-yellow uppercase italic [text-shadow:4px_4px_0_var(--color-night),7px_7px_0_var(--color-purple)]">
            Ready
            <br />
            to play?
          </h1>
          <p className="mt-6 opacity-75">Pick a game and start playing.</p>
        </div>

        <button
          onClick={onOpenLibrary}
          className="group relative overflow-hidden rounded-2xl border border-offwhite/10 text-left"
        >
          <span className="absolute inset-0 grid grid-cols-4">
            {COVERS.map((fallback, i) => (
              <span
                key={i}
                className="transition duration-300 group-hover:scale-105"
                style={{ background: `url(/games/${i + 1}.jpg) center/cover, ${fallback}` }}
              />
            ))}
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
          <span className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-2xl bg-night/80 p-4 backdrop-blur">
            <Icon name="gamepad" className="size-8" />
            <span className="flex-1">
              <span className="block text-2xl font-black uppercase">Game library</span>
              <span className="block text-sm opacity-70">Browse and launch games</span>
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-yellow text-night shadow-[0_0_18px_var(--color-yellow)]">
              <Icon name="arrow" className="size-5" />
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
        <p className="mb-3 text-xs font-bold tracking-widest uppercase opacity-60">More at GameStreet</p>
        <div className="grid grid-cols-3 gap-5">
          {MORE.map((tile) => (
            <Tile key={tile.title} {...tile} />
          ))}
        </div>
      </section>
    </div>
  );
}
