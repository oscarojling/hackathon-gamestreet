import type { Station } from "@/types";

// PC: short "Unlocking" screen right after payment, before the dashboard
export default function Unlocking({ station }: { station: Station }) {
  return (
    <div className="grid h-full place-items-center bg-night/70 text-center">
      <div className="flex flex-col items-center gap-5">
        <span className="size-14 animate-spin rounded-full border-4 border-offwhite/15 border-t-yellow" />
        <h1 className="font-display text-6xl text-yellow uppercase text-outline">
          Unlocking {station.name} · {station.code}
        </h1>
        <p className="text-xl text-offwhite/85">Payment received. Get ready!</p>
      </div>
    </div>
  );
}
