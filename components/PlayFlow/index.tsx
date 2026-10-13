"use client";

import { useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import type { Session } from "@/lib/session";
import { startSession } from "@/lib/session";
import { playtimeOptions } from "@/data/playtimeOptions";
import PlaytimePicker from "@/components/PlaytimePicker";
import Checkout from "@/components/Checkout";
import AllSet from "@/components/AllSet";

type Step = "pick" | "checkout" | "success" | "active";

// The phone flow: one step at a time, M1 → M2 → M3 → M4
export default function PlayFlow({ station }: { station: Station }) {
  const [step, setStep] = useState<Step>("pick");
  const [selectedOption, setSelectedOption] = useState<PlaytimeOption>(playtimeOptions[1]); // 60 min = popular default
  const [session, setSession] = useState<Session | null>(null);

  if (step === "pick") {
    return (
      <PlaytimePicker
        station={station}
        selected={selectedOption}
        onSelect={setSelectedOption}
        onContinue={() => setStep("checkout")}
      />
    );
  }

  if (step === "checkout") {
    return (
      <Checkout
        station={station}
        option={selectedOption}
        mode="start"
        onBack={() => setStep("pick")}
        onPaid={() => {
          setSession(startSession(station.code, selectedOption.minutes, selectedOption.price));
          setStep("success");
        }}
      />
    );
  }

  if (step === "success" && session) {
    return <AllSet station={station} session={session} onDone={() => setStep("active")} />;
  }

  // M4 (active session countdown) comes next
  return (
    <section className="grid min-h-dvh place-items-center p-5 text-center">
      <p className="opacity-70">M4 – active session (coming next)</p>
    </section>
  );
}
