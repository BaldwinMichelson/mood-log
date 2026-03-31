import type { ReactNode } from "react";

import { MoonHeader } from "@/components/moon-header";
import { SideNav } from "@/components/side-nav";

export function MoonShell({ children, currentPath }: { children: ReactNode; currentPath: string }) {
  return (
    <div className="app-shell">
      <div className="shell-grid">
        <aside className="desktop-nav">
          <SideNav currentPath={currentPath} />
        </aside>
        <div className="page-column">
          <MoonHeader currentPath={currentPath} />
          <main className="page-content">{children}</main>
        </div>
      </div>
    </div>
  );
}



