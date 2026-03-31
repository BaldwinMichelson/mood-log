import Link from "next/link";

export function EmptyState({ title, copy, actionHref, actionLabel }: { title: string; copy: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="panel" style={{ padding: 24, display: "grid", gap: 12, justifyItems: "start", background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(231,237,251,0.92))" }}>
      <div aria-hidden style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(180deg, rgba(165,180,252,0.32), rgba(103,232,249,0.2))", display: "grid", placeItems: "center", fontSize: "1.5rem" }}>?</div>
      <div className="section-title">{title}</div>
      <p className="section-copy">{copy}</p>
      {actionHref && actionLabel ? <Link href={actionHref} style={{ marginTop: 4, display: "inline-flex", padding: "12px 16px", borderRadius: 999, background: "rgba(36,59,107,1)", color: "white", fontWeight: 700 }}>{actionLabel}</Link> : null}
    </div>
  );
}



