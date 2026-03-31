import type { ReactNode } from "react";

export function ActionBar({ eyebrow, title, copy, actions }: { eyebrow: string; title: string; copy: string; actions?: ReactNode }) {
  return (
    <div className="panel" style={{ padding: 22, display: "grid", gap: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(244,247,251,0.9))" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", flexWrap: "wrap" }}>
        <div style={{ maxWidth: 620 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>
          <h1 className="section-title" style={{ marginBottom: 8 }}>{title}</h1>
          <p className="section-copy">{copy}</p>
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
    </div>
  );
}



