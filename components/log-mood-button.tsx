export function LogMoodButton({ onClick, disabled, busy }: { onClick: () => void; disabled?: boolean; busy?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: "100%", borderRadius: 22, padding: "18px 22px", background: disabled ? "rgba(148,163,184,0.28)" : "linear-gradient(135deg, rgba(36,59,107,1), rgba(103,232,249,0.9))", color: disabled ? "rgba(30,41,59,0.45)" : "white", fontWeight: 800, fontSize: "1rem", boxShadow: disabled ? "none" : "0 18px 30px rgba(36,59,107,0.18)" }}>
      {busy ? "Saving entry..." : "Log mood"}
    </button>
  );
}



