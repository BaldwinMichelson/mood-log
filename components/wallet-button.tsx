"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { shortAddress } from "@/lib/mood-data";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const injectedConnector = useMemo(() => connectors.find((connector) => connector.id === "injected") ?? connectors[0], [connectors]);

  if (isConnected) {
    return (
      <button onClick={() => disconnect()} style={{ borderRadius: 999, padding: compact ? "10px 14px" : "12px 16px", background: "linear-gradient(135deg, rgba(36,59,107,1), rgba(71,95,150,0.94))", color: "white", fontWeight: 700, boxShadow: "0 14px 24px rgba(36,59,107,0.16)" }}>
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <button onClick={() => injectedConnector && connect({ connector: injectedConnector })} disabled={!injectedConnector || isPending} style={{ borderRadius: 999, padding: compact ? "10px 14px" : "12px 16px", background: "rgba(255,255,255,0.78)", color: "var(--primary)", fontWeight: 700, border: "1px solid rgba(36,59,107,0.12)" }}>
      {isPending ? "Connecting..." : "Connect wallet"}
    </button>
  );
}



