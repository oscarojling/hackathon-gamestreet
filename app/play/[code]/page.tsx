import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getStation } from "@/data/stations";
import PlayFlow from "@/components/PlayFlow";

type Props = {
  params: Promise<{ code: string }>;
};

// cacheComponents is on, so reading params must happen inside <Suspense>.
// The page shell renders instantly; the station part streams in.
export default function PlayPage({ params }: Props) {
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

  return <PlayFlow station={station} />;
}
