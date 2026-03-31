"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import { ActionBar } from "@/components/action-bar";
import { CopyEntryButton } from "@/components/copy-entry-button";
import { EmptyState } from "@/components/empty-state";
import { MoonShell } from "@/components/moon-shell";
import { MoodStatusChip } from "@/components/mood-status-chip";
import { formatEntryTime, getMoodById, seedMoodEntries, shortAddress, type MoodEntry } from "@/lib/mood-data";

export default function MoodDetailPage() {
  const params = useParams<{ id: string }>();
  const { address } = useAccount();
  const [entry, setEntry] = useState<MoodEntry | null>(getMoodById(params.id, address));

  useEffect(() => {
    seedMoodEntries(address);
    setEntry(getMoodById(params.id, address));
  }, [address, params.id]);

  return (
    <MoonShell currentPath="/history">
      <div className="page-stack">
        <ActionBar eyebrow="Mood detail" title="A single score, held in focus." copy="This route stays independent so each mood entry can be opened directly, copied, and revisited." actions={<Link href="/history" style={{ padding: "12px 16px", borderRadius: 999, background: "rgba(255,255,255,0.74)", border: "1px solid rgba(36,59,107,0.1)", fontWeight: 700 }}>Back to history</Link>} />
        {entry ? (
          <section className="grid-two">
            <div className="panel soft-glow" style={{ padding: 24, display: "grid", gap: 20, background: "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(71,95,150,0.92))", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div className="eyebrow" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Entry showcase</div>
                  <div className="score-display" style={{ color: "white" }}>{entry.score}</div>
                </div>
                <MoodStatusChip status={entry.status} />
              </div>
              <div>
                <div className="section-title" style={{ color: "white", marginBottom: 8 }}>{entry.label}</div>
                <div className="section-copy" style={{ color: "rgba(255,255,255,0.82)" }}>{entry.note}</div>
              </div>
              <div className="chip-row">
                <span className="moon-chip" style={{ color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.08)" }}>{formatEntryTime(entry.createdAt)}</span>
                <span className="moon-chip" style={{ color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.08)" }}>{entry.source}</span>
              </div>
            </div>
            <div className="page-stack">
              <div className="panel" style={{ padding: 22, display: "grid", gap: 14, background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(231,237,251,0.92))" }}>
                <div className="eyebrow">Entry details</div>
                <div><div className="muted" style={{ marginBottom: 6 }}>Owner</div><div style={{ fontWeight: 800 }}>{shortAddress(entry.owner)}</div></div>
                <div><div className="muted" style={{ marginBottom: 6 }}>Entry id</div><div style={{ fontWeight: 700, wordBreak: "break-all" }}>{entry.id}</div></div>
                <div><div className="muted" style={{ marginBottom: 6 }}>Transaction hash</div><div style={{ fontWeight: 700, wordBreak: "break-all" }}>{entry.txHash ?? "Pending local sync"}</div></div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <CopyEntryButton value={entry.id} />
                  <Link href="/log" style={{ padding: "12px 16px", borderRadius: 999, background: "rgba(36,59,107,1)", color: "white", fontWeight: 700 }}>Log another mood</Link>
                </div>
              </div>
              <div className="panel" style={{ padding: 22, display: "grid", gap: 12, background: "linear-gradient(180deg, rgba(248,251,255,0.88), rgba(255,255,255,0.78))" }}>
                <div className="eyebrow">State</div>
                <div className="section-title" style={{ fontSize: "1.15rem" }}>A single mood can stay small and still be meaningful.</div>
                <div className="section-copy">This panel keeps the score, owner, and timing easy to scan on mobile.</div>
              </div>
            </div>
          </section>
        ) : (
          <EmptyState title="Entry not found" copy="This detail route is ready, but the requested mood entry is not available in the current local archive." actionHref="/history" actionLabel="Return to history" />
        )}
      </div>
    </MoonShell>
  );
}



