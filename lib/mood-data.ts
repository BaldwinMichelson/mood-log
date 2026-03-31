"use client";

export type MoodEntry = {
  id: string;
  score: number;
  label: string;
  tone: string;
  note: string;
  owner: string;
  createdAt: string;
  source: "mock" | "local" | "onchain";
  status: "ready" | "logged" | "latest" | "synced";
  txHash?: string;
};

const moodScale = {
  1: { label: "Low Tide", tone: "Quiet", note: "A gentle day for extra care." },
  2: { label: "Cloud Drift", tone: "Muted", note: "A soft reset could help." },
  3: { label: "Steady Orbit", tone: "Balanced", note: "Even and clear enough to continue." },
  4: { label: "Bright Rise", tone: "Open", note: "Energy feels present and light." },
  5: { label: "Full Moon", tone: "Radiant", note: "A vivid moment worth remembering." }
} as const;

const demoOwner = "0x8b6E5cFf6d6F0011223344556677889900aAbBcC";
const seededEntries: MoodEntry[] = [
  buildMoodEntry(4, demoOwner, "2026-03-29T20:40:00.000Z", "mock", "synced"),
  buildMoodEntry(3, demoOwner, "2026-03-27T19:10:00.000Z", "mock", "logged"),
  buildMoodEntry(5, demoOwner, "2026-03-24T22:22:00.000Z", "mock", "latest")
];

export function buildMoodEntry(
  score: number,
  owner: string,
  createdAt = new Date().toISOString(),
  source: MoodEntry["source"] = "local",
  status: MoodEntry["status"] = "logged",
  txHash?: string
): MoodEntry {
  const meta = moodScale[score as keyof typeof moodScale] ?? moodScale[3];
  const timestamp = new Date(createdAt).getTime();

  return {
    id: `${owner.toLowerCase()}-${timestamp}`,
    score,
    label: meta.label,
    tone: meta.tone,
    note: meta.note,
    owner,
    createdAt,
    source,
    status,
    txHash
  };
}

export function getMoodMeta(score: number) {
  return moodScale[score as keyof typeof moodScale] ?? moodScale[3];
}

function getStorageKey(owner?: string) {
  return `mood-log:entries:${owner?.toLowerCase() ?? "guest"}`;
}

export function getStoredEntries(owner?: string) {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(getStorageKey(owner));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MoodEntry[];
  } catch {
    return [];
  }
}

export function seedMoodEntries(owner?: string) {
  if (!owner || typeof window === "undefined") return;
  const current = getStoredEntries(owner);
  if (current.length > 0) return;
  const seeded = seededEntries.map((entry, index) =>
    buildMoodEntry(entry.score, owner, new Date(Date.now() - index * 86400000).toISOString(), "mock", entry.status)
  );
  window.localStorage.setItem(getStorageKey(owner), JSON.stringify(seeded));
}

export function saveMoodEntry(owner: string, score: number, txHash?: string) {
  const current = getStoredEntries(owner);
  const entry = buildMoodEntry(score, owner, new Date().toISOString(), txHash ? "onchain" : "local", "latest", txHash);
  const next = [entry, ...current.map((item, index) => ({ ...item, status: index === 0 ? "logged" : item.status }))].slice(0, 12);
  if (typeof window !== "undefined") window.localStorage.setItem(getStorageKey(owner), JSON.stringify(next));
  return entry;
}

export function getMoodHistory(owner?: string) {
  const current = getStoredEntries(owner);
  return current.length > 0 ? current : seededEntries;
}

export function getLatestMood(owner?: string) {
  return getMoodHistory(owner)[0] ?? null;
}

export function getMoodById(id: string, owner?: string) {
  return getMoodHistory(owner).find((entry) => entry.id === id) ?? null;
}

export function getMoodDistribution(entries: MoodEntry[]) {
  return [1, 2, 3, 4, 5].map((score) => ({
    score,
    count: entries.filter((entry) => entry.score === score).length,
    label: getMoodMeta(score).label
  }));
}

export function formatEntryTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function shortAddress(address?: string) {
  if (!address) return "Wallet not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}



