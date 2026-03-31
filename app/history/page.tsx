"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { ActionBar } from "@/components/action-bar";
import { EmptyState } from "@/components/empty-state";
import { HistorySummaryPanel } from "@/components/history-summary-panel";
import { MoonShell } from "@/components/moon-shell";
import { MoodTimeline } from "@/components/mood-timeline";
import { getMoodHistory, seedMoodEntries, type MoodEntry } from "@/lib/mood-data";

export default function HistoryPage() {
  const { address } = useAccount();
  const [entries, setEntries] = useState<MoodEntry[]>(getMoodHistory(address));

  useEffect(() => {
    seedMoodEntries(address);
    setEntries(getMoodHistory(address));
  }, [address]);

  return (
    <MoonShell currentPath="/history">
      <div className="page-stack">
        <ActionBar eyebrow="My history" title="A personal archive with a softer rhythm." copy="Your recent entries appear as a timeline instead of a dashboard so each mood feels like a dated note." />
        {entries.length ? (
          <section className="grid-two">
            <MoodTimeline entries={entries} />
            <div className="page-stack">
              <HistorySummaryPanel entries={entries} />
              <div className="panel" style={{ padding: 22, display: "grid", gap: 12, background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(231,237,251,0.9))" }}>
                <div className="eyebrow">Status</div>
                <div className="section-title" style={{ fontSize: "1.18rem" }}>Latest archive synced for quick review.</div>
                <div className="section-copy">Detail routes stay independent, so every entry can be revisited directly.</div>
              </div>
            </div>
          </section>
        ) : (
          <EmptyState title="No archive yet" copy="Log a mood score to start your personal reflection timeline." actionHref="/log" actionLabel="Log first entry" />
        )}
      </div>
    </MoonShell>
  );
}



