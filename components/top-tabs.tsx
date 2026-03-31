import Link from "next/link";

const tabs = [
  { href: "/", label: "Mood Hub" },
  { href: "/log", label: "Log Mood" },
  { href: "/history", label: "My History" },
  { href: "/insights", label: "Insights" }
];

export function TopTabs({ currentPath }: { currentPath: string }) {
  return (
    <nav style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 2 }}>
      {tabs.map((tab) => {
        const active = tab.href === "/" ? currentPath === tab.href : currentPath.startsWith(tab.href);
        return (
          <Link key={tab.href} href={tab.href} style={{ whiteSpace: "nowrap", padding: "10px 14px", borderRadius: 999, background: active ? "rgba(36,59,107,1)" : "rgba(255,255,255,0.65)", color: active ? "white" : "var(--text)", fontWeight: 700, border: active ? "1px solid rgba(36,59,107,0.88)" : "1px solid rgba(36,59,107,0.1)" }}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}



