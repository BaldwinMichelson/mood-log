"use client";

import clsx from "clsx";

import { getMoodMeta } from "@/lib/mood-data";

export function MoodSelector({ value, onChange }: { value: number; onChange: (score: number) => void }) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Select score</div>
          <div className="section-title">How does this moment feel?</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="score-display">{value}</div>
          <div className="muted" style={{ fontWeight: 700 }}>{getMoodMeta(value).label}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 10 }}>
        {[1, 2, 3, 4, 5].map((score) => {
          const active = value === score;
          const meta = getMoodMeta(score);
          return (
            <button key={score} className={clsx(active && "animate-pulse")} onClick={() => onChange(score)} style={{ minHeight: 116, borderRadius: 24, border: active ? "1px solid rgba(103,232,249,0.4)" : "1px solid rgba(36,59,107,0.09)", background: active ? "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(64,83,130,0.95))" : "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(234,240,251,0.9))", color: active ? "white" : "var(--text)", padding: 14, display: "grid", alignContent: "space-between", textAlign: "left", boxShadow: active ? "0 20px 34px rgba(36,59,107,0.18)" : undefined, transition: "all 180ms ease" }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.06em" }}>{score}</span>
              <span>
                <span style={{ display: "block", fontWeight: 800 }}>{meta.label}</span>
                <span style={{ display: "block", opacity: 0.82, fontSize: "0.9rem", marginTop: 4 }}>{meta.tone}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ borderRadius: 22, background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(165,180,252,0.18))", border: "1px solid rgba(36,59,107,0.08)", padding: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 4 }}>{getMoodMeta(value).tone}</div>
        <div className="muted">{getMoodMeta(value).note}</div>
      </div>
    </div>
  );
}



