"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { ActionBar } from "@/components/action-bar";
import { MoonShell } from "@/components/moon-shell";
import { getMoodDistribution, getMoodHistory, seedMoodEntries, type MoodEntry } from "@/lib/mood-data";

export default function InsightsPage() {
  const { address } = useAccount();
  const [entries, setEntries] = useState<MoodEntry[]>(getMoodHistory(address));

  useEffect(() => {
    seedMoodEntries(address);
    setEntries(getMoodHistory(address));
  }, [address]);

  const distribution = getMoodDistribution(entries);
  const highest = [...distribution].sort((a, b) => b.count - a.count)[0];

  return (
    <MoonShell currentPath="/insights">
      <div className="page-stack">
        <ActionBar eyebrow="Insights" title="Small patterns, softly framed." copy="A light glance at your recent mood spread without turning the journal into a chart-heavy dashboard." />
        <section className="grid-two">
          <div className="panel" style={{ padding: 24, display: "grid", gap: 20, background: "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(71,95,150,0.92))", color: "white" }}>
            <div>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Distribution</div>
              <h1 className="section-title" style={{ color: "white" }}>Recent balance</h1>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12, alignItems: "end", minHeight: 260 }}>
              {distribution.map((item) => (
                <div key={item.score} style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                  <div style={{ width: "100%", maxWidth: 64, height: `${Math.max(item.count * 48, 24)}px`, borderRadius: 18, background: "linear-gradient(180deg, rgba(103,232,249,0.92), rgba(196,181,253,0.78))", boxShadow: "0 16px 24px rgba(0,0,0,0.12)" }} />
                  <div style={{ fontWeight: 800 }}>{item.score}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="page-stack">
            <div className="panel" style={{ padding: 22, display: "grid", gap: 12, background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(231,237,251,0.92))" }}>
              <div className="eyebrow">Dominant note</div>
              <div className="display-title" style={{ fontSize: "3rem" }}>{highest?.score ?? 0}</div>
              <div className="section-title" style={{ fontSize: "1.15rem" }}>{highest?.label ?? "No signal yet"}</div>
              <div className="section-copy">{highest?.count ? `This score appears ${highest.count} times in your recent archive.` : "Log a few entries to reveal your current rhythm."}</div>
            </div>
            <div className="panel" style={{ padding: 22, display: "grid", gap: 10, background: "linear-gradient(180deg, rgba(248,251,255,0.88), rgba(255,255,255,0.78))" }}>
              <div className="eyebrow">Perspective</div>
              <div className="section-title" style={{ fontSize: "1.15rem" }}>Keep the graph gentle.</div>
              <div className="section-copy">The journal is meant for noticing patterns, not judging them.</div>
            </div>
          </div>
        </section>
      </div>
    </MoonShell>
  );
}



