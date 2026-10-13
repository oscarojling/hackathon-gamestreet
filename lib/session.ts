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
const key = (code: string) => `gs-session-${code}`;

export function getSession(code: string): Session | null {
  try {
    const raw = localStorage.getItem(key(code));
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function broadcast(code: string, session: Session | null) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.postMessage({ code, session });
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
    endsAt: now + minutes * 60_000,
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
    endsAt: current.endsAt + minutes * 60_000,
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
    if (e.data?.code === code) cb(e.data.session);
  };
  return () => ch.close();
}

// A station is in use while a session exists and hasn't run out
export const isActive = (s: Session | null) => !!s && s.endsAt > Date.now();

export const formatClock = (ms: number) =>
  new Date(ms).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
