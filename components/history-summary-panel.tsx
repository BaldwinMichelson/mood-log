import type { MoodEntry } from "@/lib/mood-data";
import { getMoodDistribution } from "@/lib/mood-data";

export function HistorySummaryPanel({ entries }: { entries: MoodEntry[] }) {
  const distribution = getMoodDistribution(entries);
  const average = entries.length ? (entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length).toFixed(1) : "0.0";

  return (
    <div className="panel" style={{ padding: 20, display: "grid", gap: 18, background: "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(71,95,150,0.88))", color: "white" }}>
      <div>
        <div className="eyebrow" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Archive summary</div>
        <h2 className="section-title" style={{ color: "white" }}>A soft view of your recent rhythm.</h2>
      </div>
      <div className="grid-three">
        <div><div className="muted" style={{ color: "rgba(255,255,255,0.72)" }}>Entries</div><div className="score-display" style={{ color: "white", fontSize: "2.5rem" }}>{entries.length}</div></div>
        <div><div className="muted" style={{ color: "rgba(255,255,255,0.72)" }}>Average</div><div className="score-display" style={{ color: "white", fontSize: "2.5rem" }}>{average}</div></div>
        <div><div className="muted" style={{ color: "rgba(255,255,255,0.72)" }}>Recent range</div><div style={{ fontWeight: 800, fontSize: "1.12rem", marginTop: 12 }}>{entries[0]?.label ?? "No entries yet"}</div></div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {distribution.map((item) => (
          <div key={item.score} style={{ display: "grid", gridTemplateColumns: "82px 1fr 28px", gap: 10, alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>{item.score} · {item.label}</div>
            <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,0.14)", overflow: "hidden" }}>
              <div style={{ width: `${entries.length ? (item.count / entries.length) * 100 : 0}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(103,232,249,0.9), rgba(196,181,253,0.9))" }} />
            </div>
            <div style={{ textAlign: "right", fontWeight: 800 }}>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



