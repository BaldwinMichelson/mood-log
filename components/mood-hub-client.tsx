"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";

import { EmptyState } from "@/components/empty-state";
import { HistorySummaryPanel } from "@/components/history-summary-panel";
import { MoodEntryCard } from "@/components/mood-entry-card";
import { MoodStatusChip } from "@/components/mood-status-chip";
import { APP_NAME, MOOD_LOG_ADDRESS, moodLogAbi } from "@/lib/contracts";
import { buildMoodEntry, getLatestMood, getMoodHistory, seedMoodEntries, shortAddress, type MoodEntry } from "@/lib/mood-data";

export function MoodHubClient() {
  const { address, isConnected } = useAccount();
  const [entries, setEntries] = useState<MoodEntry[]>(getMoodHistory(address));

  const { data } = useReadContracts({
    allowFailure: true,
    contracts: address ? [
      { address: MOOD_LOG_ADDRESS, abi: moodLogAbi, functionName: "mood", args: [address] },
      { address: MOOD_LOG_ADDRESS, abi: moodLogAbi, functionName: "updatedAt", args: [address] }
    ] : [],
    query: { enabled: Boolean(address) }
  });

  useEffect(() => {
    seedMoodEntries(address);
    setEntries(getMoodHistory(address));
  }, [address]);

  const latestLocal = getLatestMood(address);
  const latestOnchainScore = Number(data?.[0]?.result ?? 0);
  const latestOnchainTimestamp = Number(data?.[1]?.result ?? 0);
  const latestEntry = latestOnchainScore >= 1 && latestOnchainTimestamp > 0 && address
    ? buildMoodEntry(latestOnchainScore, address, new Date(latestOnchainTimestamp * 1000).toISOString(), "onchain", "synced")
    : latestLocal;

  return (
    <div className="page-stack">
      <section className="grid-two">
        <div className="panel soft-glow" style={{ padding: 24, display: "grid", gap: 18, background: "linear-gradient(180deg, rgba(255,255,255,0.74), rgba(231,237,251,0.92))" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Mood hub</div>
            <h1 className="display-title" style={{ maxWidth: 560 }}>A quiet place to mark the tone of now.</h1>
          </div>
          <p className="section-copy" style={{ maxWidth: 520 }}>Log one score on Base, keep the latest feeling in view, and return when the day shifts.</p>
          <div className="chip-row">
            <span className="moon-chip">App: {APP_NAME}</span>
            <span className="moon-chip">Owner: {shortAddress(address)}</span>
            <MoodStatusChip status={latestEntry ? "latest" : "ready"} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/log" style={{ display: "inline-flex", padding: "14px 18px", borderRadius: 999, background: "rgba(36,59,107,1)", color: "white", fontWeight: 800 }}>Log my mood</Link>
            <Link href="/history" style={{ display: "inline-flex", padding: "14px 18px", borderRadius: 999, background: "rgba(255,255,255,0.74)", border: "1px solid rgba(36,59,107,0.1)", color: "var(--primary)", fontWeight: 800 }}>View history</Link>
          </div>
        </div>

        <div className="panel" style={{ padding: 22, display: "grid", gap: 16, background: "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(71,95,150,0.9))", color: "white" }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Live status</div>
            <h2 className="section-title" style={{ color: "white" }}>Latest entry</h2>
          </div>
          {latestEntry ? (
            <MoodEntryCard entry={latestEntry} href={`/mood/${latestEntry.id}`} />
          ) : (
            <EmptyState title="No entry yet" copy="Connect a wallet and log your first mood score." actionHref="/log" actionLabel="Open log panel" />
          )}
          <div className="chip-row">
            <span className="moon-chip" style={{ color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.08)" }}>Wallet {isConnected ? "connected" : "idle"}</span>
            <span className="moon-chip" style={{ color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.08)" }}>Sync {latestOnchainScore ? "live" : "local"}</span>
          </div>
        </div>
      </section>

      <section className="grid-two">
        <HistorySummaryPanel entries={entries} />
        <div className="page-stack">
          <div className="panel" style={{ padding: 22, display: "grid", gap: 14, background: "linear-gradient(180deg, rgba(248,251,255,0.86), rgba(255,255,255,0.75))" }}>
            <div className="eyebrow">Quick view</div>
            <div className="section-title">Recent archive</div>
            {entries.slice(0, 2).map((entry) => <MoodEntryCard key={entry.id} entry={entry} href={`/mood/${entry.id}`} compact />)}
          </div>
        </div>
      </section>
    </div>
  );
}



