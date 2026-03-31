"use client";

import { useState } from "react";

export function CopyEntryButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button onClick={onCopy} style={{ padding: "12px 16px", borderRadius: 999, background: copied ? "rgba(103,232,249,0.18)" : "rgba(255,255,255,0.74)", color: "var(--primary)", fontWeight: 700, border: "1px solid rgba(36,59,107,0.1)" }}>
      {copied ? "Copied" : "Copy entry"}
    </button>
  );
}



