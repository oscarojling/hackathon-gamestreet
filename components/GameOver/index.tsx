import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

// PC screen 3: "Game over!"
export default function GameOver({ onNewSession }: { onNewSession: () => void }) {
  return (
    <div className="grid h-full place-items-center bg-night/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Logo size="sm" />
        <Icon name="gamepad" className="mt-4 size-24 text-purple drop-shadow-[0_0_20px_var(--color-purple)]" />
        <h1 className="text-7xl font-black uppercase">Game over!</h1>
        <p className="text-xl opacity-80">Your session has ended.</p>
        <p className="text-sm font-black tracking-[0.3em] italic uppercase">Thanks for playing!</p>
        <button
          onClick={onNewSession}
          className="mt-4 flex w-80 items-center justify-center gap-2 rounded-xl bg-yellow py-3 font-black text-night uppercase"
        >
          Start a new session
        </button>
        <button
          onClick={onNewSession}
          className="flex w-80 items-center justify-center gap-2 rounded-xl border-2 border-purple py-3 text-sm font-black uppercase"
        >
          Scan QR code to begin
        </button>
      </div>
    </div>
  );
}
