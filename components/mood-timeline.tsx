import Link from "next/link";

import type { MoodEntry } from "@/lib/mood-data";
import { formatEntryTime } from "@/lib/mood-data";
import { MoodStatusChip } from "@/components/mood-status-chip";

export function MoodTimeline({ entries }: { entries: MoodEntry[] }) {
  return (
    <div className="panel" style={{ padding: 22, display: "grid", gap: 18, background: "linear-gradient(180deg, rgba(248,251,255,0.92), rgba(235,241,251,0.92))" }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Reflection archive</div>
        <h2 className="section-title">Your recent timeline</h2>
      </div>
      <div style={{ display: "grid", gap: 18 }}>
        {entries.map((entry, index) => (
          <Link key={entry.id} href={`/mood/${entry.id}`} style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: 14, alignItems: "start" }}>
            <div style={{ display: "grid", justifyItems: "center", gap: 8, paddingTop: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "linear-gradient(180deg, rgba(36,59,107,1), rgba(103,232,249,0.88))", boxShadow: "0 0 0 6px rgba(165,180,252,0.18)" }} />
              {index !== entries.length - 1 ? <div style={{ width: 2, minHeight: 88, background: "linear-gradient(180deg, rgba(36,59,107,0.16), rgba(103,232,249,0.12))" }} /> : null}
            </div>
            <div className="surface-card" style={{ padding: 18, display: "grid", gap: 12, background: "rgba(255,255,255,0.74)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <div className="score-display" style={{ fontSize: "2.3rem" }}>{entry.score}</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>{entry.label}</div>
                    <div className="muted">{formatEntryTime(entry.createdAt)}</div>
                  </div>
                </div>
                <MoodStatusChip status={entry.status} />
              </div>
              <div className="section-copy">{entry.note}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



