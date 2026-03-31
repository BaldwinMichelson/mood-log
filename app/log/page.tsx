import { ActionBar } from "@/components/action-bar";
import { LogMoodPanel } from "@/components/log-mood-panel";
import { MoonShell } from "@/components/moon-shell";

export default function LogPage() {
  return (
    <MoonShell currentPath="/log">
      <div className="page-stack">
        <ActionBar eyebrow="Log mood" title="A focused panel for one clear score." copy="This page keeps the action simple: pick a score, sign, and let the latest state refresh." />
        <LogMoodPanel />
      </div>
    </MoonShell>
  );
}



