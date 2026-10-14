// Shared contract between the phone flow (/play/[code]) and the PC screen (/station/[code]).
// Store endsAt (a timestamp), not minutesLeft, so both sides compute the countdown live.
// Browser-only: call these from client components (inside event handlers or useEffect).

export type Session = {
  code: string;
  startedAt: number; // ms timestamp
  endsAt: number; // ms timestamp
  totalMinutes: number; // incl. extensions
  totalPaid: number; // kr
};

const CHANNEL = "gamestreet";

// Demo trick: add ?fast to the URL and one "minute" lasts one second,
// so you can show the warning, time-up and receipt screens in a short video.
export const minuteMs = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("fast")
    ? 1000
    : 60_000;
const key = (code: string) => `gs-session-${code}`;

export function getSession(code: string): Session | null {
  try {
    const raw = localStorage.getItem(key(code));
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

// Each tab gets an id so it can ignore its own broadcasts
const TAB_ID = Math.random().toString(36).slice(2);

function broadcast(code: string, session: Session | null) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.postMessage({ code, session, from: TAB_ID });
  ch.close();
}

function save(session: Session) {
  localStorage.setItem(key(session.code), JSON.stringify(session));
  broadcast(session.code, session);
}

export function startSession(code: string, minutes: number, price: number): Session {
  const now = Date.now();
  const session: Session = {
    code,
    startedAt: now,
    endsAt: now + minutes * minuteMs(),
    totalMinutes: minutes,
    totalPaid: price,
  };
  save(session);
  return session;
}

export function extendSession(code: string, minutes: number, price: number): Session | null {
  const current = getSession(code);
  if (!current) return null;
  const session: Session = {
    ...current,
    endsAt: Math.max(current.endsAt, Date.now()) + minutes * minuteMs(),
    totalMinutes: current.totalMinutes + minutes,
    totalPaid: current.totalPaid + price,
  };
  save(session);
  return session;
}

export function endSession(code: string) {
  localStorage.removeItem(key(code));
  broadcast(code, null);
}

// Use in a useEffect on both sides: return subscribe(code, setSession)
export function subscribe(code: string, cb: (s: Session | null) => void) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.onmessage = (e) => {
    if (e.data?.kind !== "paying" && e.data?.code === code && e.data.from !== TAB_ID) cb(e.data.session);
  };
  return () => ch.close();
}

// A station is in use while a session exists and hasn't run out
export const isActive = (s: Session | null) => !!s && s.endsAt > Date.now();

export const formatClock = (ms: number) =>
  new Date(ms).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

// Demo helper: wipe every stored session (all stations) and tell open tabs.
export function resetAllSessions() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("gs-session-"))
      .forEach((k) => {
        localStorage.removeItem(k);
        broadcast(k.replace("gs-session-", ""), null);
      });
    Object.keys(localStorage)
      .filter((k) => k.startsWith("gs-paying-"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // storage unavailable – nothing to clear
  }
}

// If the URL has ?reset, clear everything once and remove the flag from the URL.
// Returns true when a reset happened.
export function resetFromUrl(): boolean {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("reset")) return false;
  resetAllSessions();
  url.searchParams.delete("reset");
  window.history.replaceState(null, "", url.toString());
  return true;
}

// Demo helper: jump the clock so the session has `msLeft` remaining.
// Shifts startedAt too, so progress bars still match the purchased time. Syncs open tabs.
export function setRemaining(code: string, msLeft: number): Session | null {
  const current = getSession(code);
  if (!current) return null;
  const endsAt = Date.now() + msLeft;
  const session: Session = { ...current, endsAt, startedAt: endsAt - current.totalMinutes * minuteMs() };
  save(session);
  return session;
}

// ---- "Phone connected, waiting for payment" (PC shows PAYING while the phone is in checkout) ----
const payingKey = (code: string) => `gs-paying-${code}`;
const PAYING_MAX_AGE = 10 * 60_000; // ignore stale flags (phone closed without leaving)

export function setPaying(code: string, paying: boolean) {
  try {
    if (paying) localStorage.setItem(payingKey(code), String(Date.now()));
    else localStorage.removeItem(payingKey(code));
  } catch {}
  const ch = new BroadcastChannel(CHANNEL);
  ch.postMessage({ code, paying, from: TAB_ID, kind: "paying" });
  ch.close();
}

export function getPaying(code: string): boolean {
  try {
    const at = Number(localStorage.getItem(payingKey(code)));
    return !!at && Date.now() - at < PAYING_MAX_AGE;
  } catch {
    return false;
  }
}

export function subscribePaying(code: string, cb: (paying: boolean) => void) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.onmessage = (e) => {
    if (e.data?.kind === "paying" && e.data.code === code && e.data.from !== TAB_ID) cb(e.data.paying);
  };
  return () => ch.close();
}
