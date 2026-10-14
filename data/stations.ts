import type { Station } from "@/types";

export const stations: Station[] = [
  { code: "01", name: "Pixel" },
  { code: "02", name: "Arcade" },
  { code: "07", name: "Glitch" },
];

export const getStation = (code: string) => stations.find((s) => s.code === code);
