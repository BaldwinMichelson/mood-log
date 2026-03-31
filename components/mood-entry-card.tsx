import Link from "next/link";

import type { MoodEntry } from "@/lib/mood-data";
import { formatEntryTime } from "@/lib/mood-data";
import { MoodStatusChip } from "@/components/mood-status-chip";

export function MoodEntryCard({ entry, href, compact = false }: { entry: MoodEntry; href?: string; compact?: boolean }) {
  const content = (
    <div className="surface-card soft-glow" style={{ padding: compact ? 16 : 20, display: "grid", gap: 14, background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(236,242,252,0.88))" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Mood entry</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <div className="score-display" style={{ fontSize: compact ? "2.4rem" : "3rem" }}>{entry.score}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.08rem" }}>{entry.label}</div>
              <div className="muted">{entry.tone}</div>
            </div>
          </div>
        </div>
        <MoodStatusChip status={entry.status} />
      </div>
      <div className="section-copy">{entry.note}</div>
      <div className="chip-row">
        <span className="moon-chip">{formatEntryTime(entry.createdAt)}</span>
        <span className="moon-chip">{entry.source}</span>
      </div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}



