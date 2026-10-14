import type { Station } from "@/types";

export const stations: Station[] = [
  { code: "03", name: "Nebula" },
  { code: "05", name: "Nexus" },
  { code: "07", name: "Glitch" },
  { code: "12", name: "Zone" },
];

export const getStation = (code: string) => stations.find((s) => s.code === code);
