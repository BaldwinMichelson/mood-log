"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TopTabs } from "@/components/top-tabs";
import { WalletButton } from "@/components/wallet-button";

export function MoonHeader({ currentPath }: { currentPath?: string }) {
  const pathname = usePathname();
  const activePath = currentPath ?? pathname;

  return (
    <header className="topbar-card">
      <div style={{ display: "grid", gap: 16, alignItems: "center", padding: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <div aria-hidden style={{ width: 42, height: 42, borderRadius: 999, background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(165,180,252,0.78) 38%, rgba(36,59,107,1) 100%)", boxShadow: "0 12px 24px rgba(36,59,107,0.16)" }} />
            <div>
              <div className="eyebrow" style={{ color: "var(--muted)", marginBottom: 4 }}>Private mood studio</div>
              <div className="section-title" style={{ fontSize: "1.18rem", letterSpacing: "-0.03em" }}>mood-log</div>
            </div>
          </Link>
          <WalletButton compact />
        </div>
        <TopTabs currentPath={activePath} />
      </div>
    </header>
  );
}



