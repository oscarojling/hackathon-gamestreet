"use client";

import Link from "next/link";
import { useState } from "react";
import { resetAllSessions } from "@/lib/session";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const STATION = "/station/07";
const PHONE = "/play/07";

// Opens the phone flow in a phone-sized window and the PC screen in this tab.
// Same browser → paying on the "phone" unlocks the "PC" live.
// Opens the one-window live demo (PC + phone side by side, synced). It starts fresh by itself.
function startLiveDemo() {
  window.location.href = "/live";
}

export default function DemoStart() {
  const [cleared, setCleared] = useState(false);
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-10 px-6 py-12 text-center">
      <div className="animate-screen-in flex flex-col items-center gap-4">
        <Logo />
        <h1 className="-rotate-2 font-display text-6xl text-yellow uppercase text-outline md:text-8xl [text-shadow:0_0.06em_0_var(--color-purple)]">
          Scan. Pay. Play.
        </h1>
        <p className="max-w-xl text-lilac">
          No queue at the counter. Scan the QR code on any free PC, pick your playtime, pay on your phone –
          and the PC unlocks.
        </p>
      </div>

      <button
        onClick={startLiveDemo}
        className="animate-screen-in flex items-center gap-3 rounded-xl bg-yellow px-10 py-5 font-display text-2xl tracking-wide text-night uppercase shadow-[0_0_30px_color-mix(in_srgb,var(--color-yellow)_55%,transparent)] transition hover:brightness-110 active:scale-[0.98]"
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
            <span className="block font-display text-2xl tracking-wide uppercase">PC screen</span>
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
            <span className="block font-display text-2xl tracking-wide uppercase">Phone</span>
            <span className="block text-sm opacity-70">Choose time and pay after scanning</span>
          </span>
          <Icon name="chevron" className="size-5 opacity-50 transition group-hover:translate-x-1" />
        </Link>
      </div>

      <button
        onClick={() => {
          resetAllSessions();
          setCleared(true);
        }}
        className="flex items-center gap-2 rounded-xl border-2 border-offwhite/20 px-5 py-2.5 font-display text-sm tracking-wide uppercase transition hover:border-purple hover:text-purple"
      >
        <Icon name="refresh" className="size-4" />
        {cleared ? "Demo reset ✓" : "Reset demo"}
      </button>

      <p className="text-xs opacity-50">
        Live demo shows the PC and the phone side by side in one window. PC shortcuts: P = pay ·
        T = +30 min · G = games · E = end · F = fast-forward · R = reset
      </p>
    </main>
  );
}
