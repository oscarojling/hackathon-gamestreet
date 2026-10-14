"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  code: string;
  size?: number;
};

// QR that opens the phone flow for this station.
// Uses NEXT_PUBLIC_MOBILE_URL in production (separate mobile site),
// falls back to this site's own address locally.
export default function StationQR({ code, size = 200 }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_MOBILE_URL || window.location.origin;
    setUrl(`${base}/play/${code}`);
  }, [code]);

  return (
    <div className="relative p-3">
      {/* Neon corner brackets */}
      <span aria-hidden="true" className="absolute top-0 left-0 size-8 rounded-tl-xl border-t-4 border-l-4 border-pink" />
      <span aria-hidden="true" className="absolute top-0 right-0 size-8 rounded-tr-xl border-t-4 border-r-4 border-pink" />
      <span aria-hidden="true" className="absolute bottom-0 left-0 size-8 rounded-bl-xl border-b-4 border-l-4 border-pink" />
      <span aria-hidden="true" className="absolute right-0 bottom-0 size-8 rounded-br-xl border-r-4 border-b-4 border-pink" />
      <div className="rounded-xl bg-offwhite p-3" style={{ width: size + 24, height: size + 24 }}>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" title={url}>
            <QRCodeSVG value={url} size={size} bgColor="#F6F6FB" fgColor="#080E26" />
          </a>
        )}
      </div>
    </div>
  );
}
