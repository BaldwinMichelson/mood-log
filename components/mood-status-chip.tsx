const statusStyles: Record<string, { bg: string; color: string }> = {
  ready: { bg: "rgba(196,181,253,0.18)", color: "#5b4fc2" },
  logged: { bg: "rgba(103,232,249,0.18)", color: "#0f6581" },
  latest: { bg: "rgba(36,59,107,0.12)", color: "#243b6b" },
  synced: { bg: "rgba(165,180,252,0.22)", color: "#42558b" }
};

export function MoodStatusChip({ status }: { status: string }) {
  const style = statusStyles[status] ?? statusStyles.ready;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, background: style.bg, color: style.color, fontSize: "0.85rem", fontWeight: 800, textTransform: "capitalize" }}>
      <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor", opacity: 0.9 }} />
      {status}
    </span>
  );
}



