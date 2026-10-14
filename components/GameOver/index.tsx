import Logo from "@/components/Logo";
import Button from "@/components/Button";
import PixelArt, { GAMEPAD } from "@/components/PixelArt";
import SpeedMarks from "@/components/SpeedMarks";

// PC screen: "Game over!"
export default function GameOver({ onNewSession }: { onNewSession: () => void }) {
  return (
    <div className="grid h-full place-items-center bg-night/55 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Logo size="sm" />
        <div className="mt-4 flex items-center gap-4">
          <SpeedMarks className="size-12" direction="left" />
          <PixelArt rows={GAMEPAD} className="h-24 w-40" glow="var(--color-purple)" />
          <SpeedMarks className="size-12" direction="right" />
        </div>
        <h1 className="font-display text-8xl uppercase text-outline [text-shadow:0_6px_0_var(--color-purple)]">
          Game over!
        </h1>
        <p className="text-xl text-offwhite/85">Your session has ended.</p>
        <p className="font-display tracking-[0.3em] text-lilac uppercase">Thanks for playing!</p>
        <div className="mt-4 flex w-96 flex-col gap-3">
          <Button onClick={onNewSession} icon="refresh" arrow={false}>
            Start a new session
          </Button>
          <Button variant="secondary" onClick={onNewSession} arrow={false}>
            Scan QR code to begin
          </Button>
        </div>
      </div>
    </div>
  );
}
