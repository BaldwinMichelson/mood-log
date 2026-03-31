import { MoonShell } from "@/components/moon-shell";
import { MoodHubClient } from "@/components/mood-hub-client";

export default function HomePage() {
  return (
    <MoonShell currentPath="/">
      <MoodHubClient />
    </MoonShell>
  );
}



