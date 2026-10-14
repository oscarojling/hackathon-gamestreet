"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import {
  endSession,
  extendSession,
  getSession,
  isActive,
  minuteMs,
  resetFromUrl,
  startSession,
  subscribe,
  type Session,
} from "@/lib/session";
import { playtimeOptions } from "@/data/playtimeOptions";
import PlaytimePicker from "@/components/PlaytimePicker";
import Checkout, { type PayMethod } from "@/components/Checkout";
import AllSet from "@/components/AllSet";
import ActiveSession from "@/components/ActiveSession";
import AddTime from "@/components/AddTime";
import SessionEnded, { type SessionSummary } from "@/components/SessionEnded";

type Step = "pick" | "checkout" | "success" | "active" | "addTime" | "extendCheckout" | "ended";

// The phone flow (UX "Flow desktop + mobile"):
// M1 pick → M2 pay → M3 all set → M4 session → M5 add time → M2 pay → M4 (+30 min added) → M6 ended
export default function PlayFlow({ station }: { station: Station }) {
  const [step, setStep] = useState<Step>("pick");
  const [selectedOption, setSelectedOption] = useState<PlaytimeOption>(playtimeOptions[1]); // 60 min = popular
  const [extraOption, setExtraOption] = useState<PlaytimeOption>(playtimeOptions[0]);
  const [method, setMethod] = useState<PayMethod>("swish");
  const [session, setSession] = useState<Session | null>(null);
  const [addedMinutes, setAddedMinutes] = useState(0);
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  // Refresh-safe: if this station already has a running session, jump straight to it
  useEffect(() => {
    if (resetFromUrl()) return; // ?reset → start from M1
    const existing = getSession(station.code);
    if (isActive(existing)) {
      setSession(existing);
      setStep("active");
    }
  }, [station.code]);

  // Listen for changes from the PC tab (fast-forward, +time, end) so both timers match
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    return subscribe(station.code, (next) => {
      if (next) {
        if (sessionRef.current) setSession(next); // only update a session we already have
      } else if (sessionRef.current) {
        finishRef.current(); // ended on the PC → show the receipt here too
      }
    });
  }, [station.code]);

  const finish = useCallback(() => {
    if (!session) return;
    const played = Math.min(Date.now(), session.endsAt) - session.startedAt;
    setSummary({
      playedMinutes: Math.max(1, Math.round(played / minuteMs())),
      totalMinutes: session.totalMinutes,
      totalPaid: session.totalPaid,
      method,
      startedAt: session.startedAt,
      endedAt: Date.now(),
    });
    endSession(station.code);
    setSession(null);
    setAddedMinutes(0);
    setStep("ended");
  }, [session, station.code, method]);
  finishRef.current = finish;

  let screen: React.ReactNode = null;

  if (step === "pick") {
    screen = (
      <PlaytimePicker
        station={station}
        selected={selectedOption}
        onSelect={setSelectedOption}
        onContinue={() => setStep("checkout")}
      />
    );
  } else if (step === "checkout") {
    screen = (
      <Checkout
        station={station}
        option={selectedOption}
        initialMethod={method}
        onBack={() => setStep("pick")}
        onPaid={(paidWith) => {
          setMethod(paidWith);
          setSession(startSession(station.code, selectedOption.minutes, selectedOption.price));
          setStep("success");
        }}
      />
    );
  } else if (step === "success" && session) {
    screen = <AllSet station={station} session={session} onDone={() => setStep("active")} />;
  } else if (step === "active" && session) {
    screen = (
      <ActiveSession
        station={station}
        session={session}
        addedMinutes={addedMinutes}
        onAddTime={() => setStep("addTime")}
        onEnd={finish}
      />
    );
  } else if (step === "addTime" && session) {
    screen = (
      <AddTime
        station={station}
        session={session}
        onBack={() => setStep("active")}
        onContinue={(option) => {
          setExtraOption(option);
          setStep("extendCheckout");
        }}
      />
    );
  } else if (step === "extendCheckout" && session) {
    screen = (
      <Checkout
        station={station}
        option={extraOption}
        mode="extend"
        initialMethod={method}
        onBack={() => setStep("addTime")}
        onPaid={(paidWith) => {
          setMethod(paidWith);
          const updated = extendSession(station.code, extraOption.minutes, extraOption.price);
          if (updated) setSession(updated);
          setAddedMinutes(extraOption.minutes);
          setStep("active");
        }}
      />
    );
  } else if (step === "ended" && summary) {
    screen = (
      <SessionEnded
        station={station}
        summary={summary}
        onPlayAgain={() => {
          setSummary(null);
          setStep("pick");
        }}
      />
    );
  }

  // Phone-width column, centred on bigger screens
  return (
    <main className="mx-auto w-full max-w-md">
      <div key={step} className="motion-safe:animate-screen-in">
        {screen}
      </div>
    </main>
  );
}
