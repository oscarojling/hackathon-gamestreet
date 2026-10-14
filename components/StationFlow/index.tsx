"use client";

import { useEffect, useState } from "react";
import type { Station } from "@/types";
import {
  endSession,
  extendSession,
  getSession,
  isActive,
  startSession,
  subscribe,
  type Session,
} from "@/lib/session";
import { useNow } from "@/lib/useNow";
import StationWelcome from "@/components/StationWelcome";
import InGame from "@/components/InGame";
import Launcher from "@/components/Launcher";
import { DemoButton } from "@/components/AddTimePopup";
import GameOver from "@/components/GameOver";
import Backdrop from "@/components/Backdrop";

// The PC screen: QR (available) → launcher → in-game → game over → QR again
export default function StationFlow({ station }: { station: Station }) {
  const [session, setSession] = useState<Session | null>(null);
  const [over, setOver] = useState(false);
  const [view, setView] = useState<"launcher" | "game">("launcher");
  const now = useNow();

  // Pick up an existing session, and listen for payments from the phone
  // (works when phone + PC are tabs in the same browser, e.g. in the demo)
  useEffect(() => {
    const existing = getSession(station.code);
    if (isActive(existing)) setSession(existing);

    return subscribe(station.code, (next) => {
      setSession((prev) => {
        if (prev && !next) setOver(true); // phone pressed "End session"
        if (!prev && next) setView("launcher"); // new payment → launcher first
        return next;
      });
      if (next) setOver(false);
    });
  }, [station.code]);

  // Time ran out
  useEffect(() => {
    if (session && session.endsAt <= now) {
      endSession(station.code);
      setSession(null);
      setOver(true);
    }
  }, [session, now, station.code]);

  const playing = !!session && session.endsAt > now;

  // Demo shortcuts: P = pay, T = +30 min, G = games/dashboard, E = end session
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target instanceof HTMLInputElement) return;
      const key = e.key.toLowerCase();
      if (key === "p" && !playing) {
        setSession(startSession(station.code, 60, 100));
        setOver(false);
        setView("launcher");
      } else if (key === "t" && playing) {
        setSession(extendSession(station.code, 30, 50));
      } else if (key === "g" && playing) {
        setView((v) => (v === "launcher" ? "game" : "launcher"));
      } else if (key === "e" && playing) {
        endSession(station.code);
        setSession(null);
        setOver(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, station.code]);

  // Which screen is showing – used as a key so each change animates in
  const screenKey = playing ? view : over ? "over" : "welcome";

  return (
    <div className="relative isolate h-dvh w-full overflow-hidden">
      <Backdrop variant={(playing && view === "game") || over ? "game" : "lounge"} />
      <div key={screenKey} className="h-full motion-safe:animate-screen-in">
      {playing && session && view === "launcher" ? (
        <Launcher
          station={station}
          session={session}
          onOpenLibrary={() => setView("game")}
          onDemoAddTime={() => setSession(extendSession(station.code, 30, 50))}
        />
      ) : playing && session ? (
        <InGame
          station={station}
          session={session}
          onGames={() => setView("launcher")}
          onDemoAddTime={() => setSession(extendSession(station.code, 30, 50))}
        />
      ) : over ? (
        <GameOver onNewSession={() => setOver(false)} />
      ) : (
        <>
          <StationWelcome station={station} />
          <div className="absolute right-4 bottom-4">
            <DemoButton
              onClick={() => {
                setSession(startSession(station.code, 60, 100));
                setOver(false);
                setView("launcher");
              }}
            >
              Simulate scan &amp; pay (60 min)
            </DemoButton>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
