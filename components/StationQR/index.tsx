"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  code: string;
  size?: number;
  waiting?: boolean; // phone connected, waiting for payment
};

// QR that opens the phone flow for this station.
// Uses NEXT_PUBLIC_MOBILE_URL in production (separate mobile site),
// falls back to this site's own address locally.
export default function StationQR({ code, size = 200, waiting = false }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_MOBILE_URL || window.location.origin;
    setUrl(`${base}/play/${code}`);
  }, [code]);

  return (
    <div className="relative p-4">
      {/* Corner brackets (UX): pink top-left, purple top-right + bottom-left */}
      <span aria-hidden="true" className="absolute top-0 left-0 size-14 rounded-tl-xl border-t-[5px] border-l-[5px] border-pink" />
      <span aria-hidden="true" className="absolute top-0 right-0 size-14 rounded-tr-xl border-t-[5px] border-r-[5px] border-purple" />
      <span aria-hidden="true" className="absolute bottom-0 left-0 size-14 rounded-bl-xl border-b-[5px] border-l-[5px] border-purple" />
      <div className="relative rounded-[22px] bg-offwhite p-4" style={{ width: size + 32, height: size + 32 }}>
        {waiting && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-offwhite/90 text-center text-night">
            <span className="size-10 animate-spin rounded-full border-4 border-night/15 border-t-yellow" />
            <span className="font-display text-xl leading-tight uppercase">
              Phone connected
              <br />
              waiting for
              <br />
              payment…
            </span>
          </div>
        )}
        {url && (
          <a href={url} target="_blank" rel="noreferrer" title={url}>
            <QRCodeSVG value={url} size={size} bgColor="#F6F6FB" fgColor="#080E26" />
          </a>
        )}
      </div>
    </div>
  );
}
