import Icon from "@/components/Icon";
import SpeedMarks from "@/components/SpeedMarks";

// PC screen: "Game over!" over the dimmed game (UX frame "5. End game")
export default function GameOver({ onNewSession }: { onNewSession: () => void }) {
  return (
    <div className="flex h-full flex-col items-center pt-[56px] text-center">
      <p className="flex items-center gap-3 font-display text-[34px] tracking-wide text-offwhite">
        <Icon name="gamepad" className="size-11" /> GameStreet
      </p>
      <div className="mt-[150px] flex items-center gap-6">
        <SpeedMarks className="size-[70px]" direction="left" />
        <Icon name="gamepad" className="size-[150px]" />
        <SpeedMarks className="size-[70px]" direction="right" />
      </div>
      <h1 className="mt-2 font-display text-[104px] leading-none tracking-wide text-offwhite uppercase drop-shadow-[0_6px_0_rgba(8,14,38,0.6)]">
        Game over!
      </h1>
      <p className="mt-5 text-[34px] text-offwhite/90">Your session has ended.</p>
      <p className="mt-6 font-display text-[22px] tracking-[0.35em] text-offwhite uppercase italic">Thanks for playing!</p>
      <button
        onClick={onNewSession}
        className="mt-10 flex h-[70px] items-center gap-4 rounded-2xl bg-yellow px-14 font-display text-[26px] tracking-wide text-night uppercase shadow-[0_5px_0_#b88f0f] transition hover:brightness-110"
      >
        <Icon name="refresh" className="size-7" /> Start a new session
      </button>
    </div>
  );
}
