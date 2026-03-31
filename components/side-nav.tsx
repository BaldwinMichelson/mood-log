import Link from "next/link";
import clsx from "clsx";

const items = [
  { href: "/", label: "Mood Hub", icon: "?" },
  { href: "/log", label: "Log Mood", icon: "?" },
  { href: "/history", label: "My History", icon: "?" },
  { href: "/insights", label: "Insights", icon: "?" }
];

export function SideNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="panel" style={{ minHeight: "calc(100vh - 44px)", padding: 24, display: "grid", gridTemplateRows: "auto auto 1fr auto", gap: 24 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Mood Console</div>
        <h1 className="display-title" style={{ fontSize: "2.5rem" }}>Night<br />journal</h1>
      </div>
      <p className="section-copy" style={{ maxWidth: 180 }}>A calm Base mini app for private score logging.</p>
      <nav style={{ display: "grid", gap: 10 }}>
        {items.map((item) => {
          const active = item.href === "/" ? currentPath === item.href : currentPath.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={clsx("surface-card", active && "animate-rise")} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: active ? "linear-gradient(135deg, rgba(36,59,107,0.95), rgba(71,95,150,0.92))" : "rgba(255,255,255,0.68)", color: active ? "white" : "var(--text)", borderRadius: 18, boxShadow: active ? "0 16px 28px rgba(36,59,107,0.18)" : undefined }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span style={{ fontWeight: 700 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div style={{ borderRadius: 22, padding: 16, background: "linear-gradient(180deg, rgba(165,180,252,0.22), rgba(255,255,255,0.5))", border: "1px solid rgba(36,59,107,0.08)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Rhythm</div>
        <div className="section-title" style={{ fontSize: "1.05rem", marginBottom: 6 }}>Log one score, keep the pattern.</div>
        <p className="section-copy" style={{ fontSize: "0.92rem" }}>The interface stays quiet so the mood becomes the focus.</p>
      </div>
    </div>
  );
}



