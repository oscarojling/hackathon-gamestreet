"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const STATION = "/station/07";
const PHONE = "/play/07";

// Opens the phone flow in a phone-sized window and the PC screen in this tab.
// Same browser → paying on the "phone" unlocks the "PC" live.
function startLiveDemo() {
  window.open(PHONE, "gamestreet-phone", "width=420,height=880,left=40,top=40");
  window.location.href = STATION;
}

export default function DemoStart() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-10 px-6 py-12 text-center">
      <div className="animate-screen-in flex flex-col items-center gap-4">
        <Logo />
        <h1 className="-rotate-2 text-5xl font-black text-yellow uppercase italic md:text-7xl [text-shadow:4px_4px_0_var(--color-night),7px_7px_0_var(--color-purple)]">
          Scan. Pay. Play.
        </h1>
        <p className="max-w-xl text-lilac">
          No queue at the counter. Scan the QR code on any free PC, pick your playtime, pay on your phone –
          and the PC unlocks.
        </p>
      </div>

      <button
        onClick={startLiveDemo}
        className="animate-screen-in flex items-center gap-3 rounded-full bg-yellow px-10 py-5 text-lg font-black text-night uppercase shadow-[0_0_30px_color-mix(in_srgb,var(--color-yellow)_55%,transparent)] transition hover:brightness-110 active:scale-[0.98]"
      >
        Start live demo <Icon name="arrow" className="size-5" />
      </button>

      <div className="grid w-full gap-5 md:grid-cols-2">
        <Link
          href={STATION}
          className="group flex items-center gap-5 rounded-2xl border border-offwhite/10 bg-surface p-6 text-left transition hover:border-purple hover:shadow-[0_0_24px_var(--color-purple)]"
        >
          <span className="grid size-14 place-items-center rounded-xl bg-night text-purple">
            <Icon name="gamepad" className="size-8" />
          </span>
          <span className="flex-1">
            <span className="block text-xl font-black uppercase">PC screen</span>
            <span className="block text-sm opacity-70">What the customer sees on the gaming station</span>
          </span>
          <Icon name="chevron" className="size-5 opacity-50 transition group-hover:translate-x-1" />
        </Link>

        <Link
          href={PHONE}
          className="group flex items-center gap-5 rounded-2xl border border-offwhite/10 bg-surface p-6 text-left transition hover:border-pink hover:shadow-[0_0_24px_var(--color-pink)]"
        >
          <span className="grid size-14 place-items-center rounded-xl bg-night text-pink">
            <Icon name="card" className="size-8" />
          </span>
          <span className="flex-1">
            <span className="block text-xl font-black uppercase">Phone</span>
            <span className="block text-sm opacity-70">Choose time and pay after scanning</span>
          </span>
          <Icon name="chevron" className="size-5 opacity-50 transition group-hover:translate-x-1" />
        </Link>
      </div>

      <p className="text-xs opacity-50">
        Live demo opens the phone in its own window. Allow pop-ups if nothing happens. PC shortcuts: P = pay ·
        T = +30 min · G = games · E = end
      </p>
    </main>
  );
}
