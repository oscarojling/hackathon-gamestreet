"use client";

import { useEffect, useRef, useState } from "react";
import { formatClock, resetAllSessions } from "@/lib/session";
import { useNow } from "@/lib/useNow";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const PC = { src: "/station/07", w: 1440, h: 900 };
const PHONE = { src: "/play/07", w: 390, h: 844 };
const STATUS_BAR = 50; // iOS-style status bar like in the UX frames, with the real time
const HOME_BAR = 30; // iOS home indicator area at the bottom

// Scales a fixed-size iframe to fit its container (keeps the real layout, just smaller)
function useFitScale(w: number, h: number, pad = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(0.1, Math.min((width - pad) / w, (height - pad) / h)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h, pad]);
  return { ref, scale };
}

const CONTROLS = [
  { key: "p", label: "Simulate pay", icon: "card" },
  { key: "f", label: "Fast-forward", icon: "clock" },
  { key: "t", label: "+30 min", icon: "plus" },
  { key: "g", label: "Dashboard / game", icon: "gamepad" },
  { key: "e", label: "End session", icon: "logout" },
] as const;

// Real local time (HH:MM), like the clock in an iPhone's status bar
function PhoneClock() {
  const now = useNow();
  return <span suppressHydrationWarning>{formatClock(now)}</span>;
}

// Signal, wifi and battery, drawn small like the iPhone status bar
function StatusIcons() {
  return (
    <svg aria-hidden="true" viewBox="0 0 70 14" className="h-[13px] w-[66px]" fill="currentColor">
      <rect x="0" y="9" width="3" height="4" rx="1" />
      <rect x="5" y="6.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="4" width="3" height="9" rx="1" />
      <rect x="15" y="1" width="3" height="12" rx="1" />
      <path d="M31 3.5a10 10 0 0 1 7 2.8l1.4-1.5A12 12 0 0 0 31 1.5a12 12 0 0 0-8.4 3.3L24 6.3a10 10 0 0 1 7-2.8Zm0 4a6 6 0 0 1 4.2 1.7l1.4-1.5A8 8 0 0 0 31 5.5a8 8 0 0 0-5.6 2.2l1.4 1.5A6 6 0 0 1 31 7.5Zm0 4 2.4-2.4a3.4 3.4 0 0 0-4.8 0Z" />
      <rect x="44.5" y="1" width="21" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity=".4" />
      <rect x="46.5" y="3" width="17" height="8" rx="2" />
      <path d="M67 5v4a2 2 0 0 0 0-4Z" fillOpacity=".4" />
    </svg>
  );
}

// One-window live demo: PC screen (left) + phone (right), both real pages in iframes on the same site,
// so they sync through localStorage/BroadcastChannel exactly like two tabs would.
export default function LiveDemo() {
  const [run, setRun] = useState(0); // bump to reload both screens
  const [ready, setReady] = useState(false);
  const pcFrame = useRef<HTMLIFrameElement>(null);
  const pc = useFitScale(PC.w, PC.h, 8);
  const phone = useFitScale(PHONE.w, PHONE.h, 20); // 20 = phone frame border

  // Always start fresh
  useEffect(() => {
    resetAllSessions();
    setReady(true);
  }, [run]);

  // Send a demo shortcut to the PC screen
  function press(key: string) {
    pcFrame.current?.contentWindow?.dispatchEvent(new KeyboardEvent("keydown", { key }));
  }

  // Shortcuts also work while this outer page has focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "r") restart();
      else if ("pftge".includes(key)) press(key);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function restart() {
    setReady(false);
    setRun((r) => r + 1);
  }

  return (
    <main className="flex h-dvh flex-col gap-4 bg-night p-4">
      <header className="flex flex-wrap items-center gap-3">
        <Logo size="sm" />
        <span className="mr-auto text-sm text-lilac">Live demo · PC and phone are synced</span>
        {CONTROLS.map((c) => (
          <button
            key={c.key}
            onClick={() => press(c.key)}
            className="flex items-center gap-1.5 rounded-xl border border-offwhite/15 bg-surface px-3 py-2 text-xs transition hover:border-purple"
          >
            <Icon name={c.icon} className="size-4 text-purple" />
            {c.label}
            <kbd className="rounded bg-night px-1.5 font-mono text-[10px] text-offwhite/60 uppercase">{c.key}</kbd>
          </button>
        ))}
        <button
          onClick={restart}
          className="flex items-center gap-1.5 rounded-xl bg-yellow px-3 py-2 font-display text-xs tracking-wide text-night uppercase"
        >
          <Icon name="refresh" className="size-4" /> Start over
          <kbd className="rounded bg-night/15 px-1.5 font-mono text-[10px]">R</kbd>
        </button>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto] gap-6">
        <section className="flex min-h-0 flex-col gap-2">
          <p className="font-display text-xs tracking-widest text-lilac uppercase">PC – station Glitch · 07</p>
          <div ref={pc.ref} className="relative min-h-0 flex-1">
            {ready && (
              <div
                className="absolute top-0 left-0 overflow-hidden rounded-2xl border-4 border-black shadow-2xl"
                style={{ width: PC.w * pc.scale + 8, height: PC.h * pc.scale + 8 }}
              >
                <iframe
                  key={`pc-${run}`}
                  ref={pcFrame}
                  src={PC.src}
                  title="PC screen"
                  style={{ width: PC.w, height: PC.h, transform: `scale(${pc.scale})`, transformOrigin: "0 0" }}
                />
              </div>
            )}
          </div>
        </section>

        <section className="flex min-h-0 flex-col gap-2" style={{ width: PHONE.w * phone.scale + 24 }}>
          <p className="font-display text-xs tracking-widest text-lilac uppercase">Customer&apos;s phone</p>
          <div ref={phone.ref} className="relative min-h-0 flex-1" style={{ minWidth: 220 }}>
            {ready && (
              <div
                className="absolute top-0 left-0 overflow-hidden rounded-[2.5rem] border-[10px] border-black shadow-2xl"
                style={{ width: PHONE.w * phone.scale + 20, height: PHONE.h * phone.scale + 20 }}
              >
                <div
                  className="bg-night"
                  style={{ width: PHONE.w, height: PHONE.h, transform: `scale(${phone.scale})`, transformOrigin: "0 0" }}
                >
                  <div className="flex items-center justify-between px-8 pt-1 text-[17px] font-semibold text-offwhite" style={{ height: STATUS_BAR }}>
                    <PhoneClock />
                    <StatusIcons />
                  </div>
                  <iframe key={`phone-${run}`} src={PHONE.src} title="Phone" style={{ width: PHONE.w, height: PHONE.h - STATUS_BAR - HOME_BAR }} />
                  <div className="grid place-items-center" style={{ height: HOME_BAR }}>
                    <span className="h-[5px] w-[134px] rounded-full bg-offwhite" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
