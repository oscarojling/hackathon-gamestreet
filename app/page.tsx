import { redirect } from "next/navigation";
import DemoStart from "@/components/DemoStart";

// On Vercel each project sets NEXT_PUBLIC_APP, so the root opens the right screen.
// Locally (no variable) you get the demo start page.
export default function Home() {
  if (process.env.NEXT_PUBLIC_APP === "desktop") redirect("/station/07");
  if (process.env.NEXT_PUBLIC_APP === "mobile") redirect("/play/07");

  return <DemoStart />;
}
