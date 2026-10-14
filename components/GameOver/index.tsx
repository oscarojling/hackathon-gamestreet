import Button from "@/components/Button";
import Icon from "@/components/Icon";
import SpeedMarks from "@/components/SpeedMarks";

// PC screen: "Game over!" over the dimmed game
export default function GameOver({ onNewSession }: { onNewSession: () => void }) {
  return (
    <div className="flex h-full flex-col items-center px-8 py-[5vh] text-center">
      <p className="flex items-center gap-2 font-display text-2xl">
        <Icon name="gamepad" className="size-7 text-purple" /> GameStreet
      </p>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <SpeedMarks className="size-14" direction="left" />
          <Icon name="gamepad" className="size-28 text-purple drop-shadow-[0_0_18px_var(--color-purple)]" />
          <SpeedMarks className="size-14" direction="right" />
        </div>
        <h1 className="font-display text-8xl uppercase text-outline">Game over!</h1>
        <p className="text-2xl text-offwhite/90">Your session has ended.</p>
        <p className="font-display tracking-[0.35em] uppercase italic">Thanks for playing!</p>
        <div className="mt-6 w-96">
          <Button onClick={onNewSession} icon="refresh" arrow={false}>
            Start a new session
          </Button>
        </div>
      </div>
    </div>
  );
}
