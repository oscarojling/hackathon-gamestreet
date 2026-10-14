"use client";

import StationQR from "@/components/StationQR";
import Icon from "@/components/Icon";

type Props = {
  code: string;
  onClose: () => void;
  onDemoAddTime: () => void;
};

// "Add more time?" popup with a QR to the phone flow (dashboard + in-game)
export default function AddTimePopup({ code, onClose, onDemoAddTime }: Props) {
  return (
    <div className="animate-screen-in relative flex flex-col items-center gap-3 rounded-2xl border border-offwhite/10 bg-night/95 p-5 backdrop-blur">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 grid size-8 place-items-center rounded-lg text-lilac hover:bg-surface"
      >
        <Icon name="close" className="size-5" />
      </button>
      <div className="self-stretch pr-8">
        <p className="text-lg font-bold">Add time from your mobile</p>
        <p className="text-sm text-offwhite/70">Or scan this QR code.</p>
      </div>
      <StationQR code={code} size={140} />
      <DemoButton
        onClick={() => {
          onDemoAddTime();
          onClose();
        }}
      >
        Simulate +30 min
      </DemoButton>
    </div>
  );
}

// Small, low-key button only meant for the demo
export function DemoButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-dashed border-offwhite/30 px-3 py-1 text-[11px] opacity-60 hover:opacity-100"
    >
      Demo: {children}
    </button>
  );
}
