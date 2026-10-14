"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import {
  endSession,
  extendSession,
  getSession,
  isActive,
  minuteMs,
  startSession,
  type Session,
} from "@/lib/session";
import { playtimeOptions } from "@/data/playtimeOptions";
import PlaytimePicker from "@/components/PlaytimePicker";
import Checkout, { type PayMethod } from "@/components/Checkout";
import AllSet from "@/components/AllSet";
import ActiveSession from "@/components/ActiveSession";
import AddTime from "@/components/AddTime";
import TimeAdded from "@/components/TimeAdded";
import SessionEnded, { type SessionSummary } from "@/components/SessionEnded";

type Step = "pick" | "checkout" | "success" | "active" | "addTime" | "timeAdded" | "ended";

// The phone flow: M1 pick → M2 pay → M3 all set → M4 session → M5 add time → M6 ended
export default function PlayFlow({ station }: { station: Station }) {
  const [step, setStep] = useState<Step>("pick");
  const [selectedOption, setSelectedOption] = useState<PlaytimeOption>(playtimeOptions[1]); // 60 min = popular
  const [method, setMethod] = useState<PayMethod>("swish");
  const [session, setSession] = useState<Session | null>(null);
  const [addedMinutes, setAddedMinutes] = useState(0);
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  // Refresh-safe: if this station already has a running session, jump straight to it
  useEffect(() => {
    const existing = getSession(station.code);
    if (isActive(existing)) {
      setSession(existing);
      setStep("active");
    }
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
    setStep("ended");
  }, [session, station.code, method]);

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
        onAddTime={() => setStep("addTime")}
        onEnd={finish}
      />
    );
  } else if (step === "addTime" && session) {
    screen = (
      <AddTime
        station={station}
        session={session}
        method={method}
        onBack={() => setStep("active")}
        onPaid={(option) => {
          const updated = extendSession(station.code, option.minutes, option.price);
          if (updated) setSession(updated);
          setAddedMinutes(option.minutes);
          setStep("timeAdded");
        }}
      />
    );
  } else if (step === "timeAdded" && session) {
    screen = (
      <TimeAdded
        station={station}
        session={session}
        addedMinutes={addedMinutes}
        onBackToSession={() => setStep("active")}
        onAddMore={() => setStep("addTime")}
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
