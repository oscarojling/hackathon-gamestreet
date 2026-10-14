"use client";

import { useState } from "react";
import type { Station } from "@/types";
import type { SessionSummary } from "@/components/SessionEnded";
import { METHODS } from "@/components/Checkout";
import Icon from "@/components/Icon";

type Phase = "closed" | "editing" | "sending" | "sent";

// Fake "Email me my receipt": pre-filled address → sending → receipt preview.
// Nothing is actually sent.
export default function EmailReceipt({ station, summary }: { station: Station; summary: SessionSummary }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [email, setEmail] = useState("player@example.com");

  const method = METHODS.find((m) => m.id === summary.method)?.label ?? "Swish";
  const receiptNo = `GS-${String(summary.startedAt).slice(-6)}`;
  const date = new Date(summary.endedAt).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" });

  if (phase === "closed") {
    return (
      <button
        onClick={() => setPhase("editing")}
        className="-mx-1 flex items-center gap-3 rounded-xl px-1 py-2 text-sm transition hover:bg-night/40"
      >
        <Icon name="mail" className="size-5 text-purple" />
        <span className="flex-1 text-left">Email receipt</span>
        <Icon name="arrow" className="size-5 text-purple" />
      </button>
    );
  }

  if (phase !== "sent") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPhase("sending");
          setTimeout(() => setPhase("sent"), 1200);
        }}
        className="animate-screen-in flex flex-col gap-2 rounded-xl bg-night/50 p-3"
      >
        <label htmlFor="receipt-email" className="text-[10px] font-bold tracking-widest text-lilac uppercase">
          Send receipt to
        </label>
        <div className="flex gap-2">
          <input
            id="receipt-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={phase === "sending"}
            className="min-w-0 flex-1 rounded-xl border border-offwhite/15 bg-night px-3 py-2 text-sm outline-none focus:border-purple"
          />
          <button
            type="submit"
            disabled={phase === "sending"}
            className="rounded-xl bg-purple px-4 font-display text-sm tracking-wide uppercase disabled:opacity-60"
          >
            {phase === "sending" ? "Sending…" : "Send"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="animate-screen-in flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm text-green">
        <Icon name="check" className="size-4" /> Receipt sent to {email}
      </p>

      {/* Preview of the email */}
      <article className="rounded-2xl bg-offwhite p-5 text-night">
        <header className="flex items-center justify-between border-b border-night/10 pb-3">
          <span className="font-display text-lg text-pink">GameStreet</span>
          <span className="text-xs opacity-60">Receipt {receiptNo}</span>
        </header>
        <dl className="mt-3 flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="opacity-60">Date</dt>
            <dd>{date}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="opacity-60">Station</dt>
            <dd>
              {station.name} · {station.code}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="opacity-60">Playtime bought</dt>
            <dd>{summary.totalMinutes} min</dd>
          </div>
          <div className="flex justify-between">
            <dt className="opacity-60">Paid with</dt>
            <dd>{method}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-night/10 pt-2 font-bold">
            <dt>Total (incl. 25% VAT)</dt>
            <dd>{summary.totalPaid} kr</dd>
          </div>
        </dl>
        <p className="mt-3 text-center text-xs opacity-60">Thanks for playing! Eat · Drink · Play · Repeat</p>
      </article>
    </div>
  );
}
