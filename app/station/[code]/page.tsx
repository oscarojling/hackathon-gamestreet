import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getStation } from "@/data/stations";
import StationFlow from "@/components/StationFlow";

type Props = {
  params: Promise<{ code: string }>;
};

// The PC screen. Same <Suspense> pattern as /play/[code] (cacheComponents is on).
export default function StationPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <Station params={params} />
    </Suspense>
  );
}

async function Station({ params }: Props) {
  const { code } = await params;
  const station = getStation(code);
  if (!station) notFound();

  return <StationFlow station={station} />;
}
