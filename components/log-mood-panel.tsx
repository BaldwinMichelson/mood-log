"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAccount, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { LogMoodButton } from "@/components/log-mood-button";
import { MoodEntryCard } from "@/components/mood-entry-card";
import { MoodSelector } from "@/components/mood-selector";
import { MoodStatusChip } from "@/components/mood-status-chip";
import { WalletButton } from "@/components/wallet-button";
import { DATA_SUFFIX } from "@/lib/base-attribution";
import { APP_NAME, APP_TRACKING_ID, MOOD_LOG_ADDRESS, moodLogAbi } from "@/lib/contracts";
import { buildMoodEntry, getLatestMood, saveMoodEntry, seedMoodEntries, shortAddress, type MoodEntry } from "@/lib/mood-data";
import { trackTransaction } from "@/utils/track";

export function LogMoodPanel() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();
  const [selected, setSelected] = useState(3);
  const [pendingHash, setPendingHash] = useState<`0x${string}` | undefined>();
  const [feedback, setFeedback] = useState("Ready to save a fresh mood entry.");
  const [latestSaved, setLatestSaved] = useState<MoodEntry | null>(getLatestMood(address));
  const processedHash = useRef<string | null>(null);

  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: pendingHash,
    query: { enabled: Boolean(pendingHash) }
  });

  const { data: onchainRead } = useReadContracts({
    allowFailure: true,
    contracts: address ? [
      { address: MOOD_LOG_ADDRESS, abi: moodLogAbi, functionName: "mood", args: [address] },
      { address: MOOD_LOG_ADDRESS, abi: moodLogAbi, functionName: "updatedAt", args: [address] }
    ] : [],
    query: { enabled: Boolean(address) }
  });

  useEffect(() => {
    seedMoodEntries(address);
    setLatestSaved(getLatestMood(address));
  }, [address]);

  useEffect(() => {
    if (!receipt || !address) return;
    const txHash = receipt.transactionHash;
    if (processedHash.current === txHash) return;
    processedHash.current = txHash;
    const entry = saveMoodEntry(address, selected, txHash);
    setLatestSaved(entry);
    setFeedback("Mood logged and synced.");
    trackTransaction(APP_TRACKING_ID, APP_NAME, address, txHash);
    setPendingHash(undefined);
  }, [address, receipt, selected]);

  async function handleSubmit() {
    if (!address) {
      setFeedback("Connect a wallet to log your mood.");
      return;
    }

    try {
      setFeedback("Waiting for wallet confirmation...");
      const hash = await writeContractAsync({
        address: MOOD_LOG_ADDRESS,
        abi: moodLogAbi,
        functionName: "setMood",
        args: [selected],
        dataSuffix: DATA_SUFFIX
      });
      setPendingHash(hash);
      setFeedback("Transaction sent. Waiting for confirmation...");
    } catch (error) {
      const message = error instanceof Error ? error.message : "The mood entry could not be saved.";
      setFeedback(message.replace(/BaseMoodLog: /g, ""));
    }
  }

  const latestOnchainScore = Number(onchainRead?.[0]?.result ?? 0);
  const latestOnchainTimestamp = Number(onchainRead?.[1]?.result ?? 0);
  const onchainEntry = latestOnchainScore >= 1 && latestOnchainTimestamp > 0 && address
    ? buildMoodEntry(latestOnchainScore, address, new Date(latestOnchainTimestamp * 1000).toISOString(), "onchain", "synced", receipt?.transactionHash)
    : null;

  return (
    <section className="grid-two">
      <div className="panel soft-glow" style={{ padding: 24, display: "grid", gap: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(231,237,251,0.96))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Reflective log panel</div>
            <h1 className="display-title" style={{ fontSize: "clamp(2.3rem, 6vw, 4.4rem)" }}>Mark the<br />present score.</h1>
          </div>
          <WalletButton />
        </div>
        <MoodSelector value={selected} onChange={setSelected} />
        <div style={{ display: "grid", gap: 12 }}>
          <LogMoodButton onClick={handleSubmit} disabled={!isConnected || isWriting || isConfirming} busy={isWriting || isConfirming} />
          <div className="chip-row">
            <MoodStatusChip status={isConfirming ? "logged" : "ready"} />
            <span className="moon-chip">Owner: {shortAddress(address)}</span>
            <span className="moon-chip">Range: 1 to 5</span>
          </div>
          <div style={{ borderRadius: 18, padding: 14, background: "rgba(255,255,255,0.64)", border: "1px solid rgba(36,59,107,0.08)" }}>
            <div style={{ fontWeight: 700 }}>{feedback}</div>
          </div>
        </div>
      </div>

      <div className="page-stack">
        <div className="panel" style={{ padding: 22, display: "grid", gap: 16, background: "linear-gradient(180deg, rgba(36,59,107,0.95), rgba(71,95,150,0.9))", color: "white" }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Last result</div>
            <div className="section-title" style={{ color: "white" }}>Current synced view</div>
          </div>
          {onchainEntry || latestSaved ? <MoodEntryCard entry={onchainEntry ?? latestSaved!} href={`/mood/${(onchainEntry ?? latestSaved!)?.id}`} /> : <div className="section-copy" style={{ color: "rgba(255,255,255,0.82)" }}>Your latest confirmed entry will appear here.</div>}
          <Link href="/history" style={{ display: "inline-flex", alignSelf: "start", padding: "12px 16px", borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)", color: "white", fontWeight: 700 }}>Open history</Link>
        </div>
        <div className="panel" style={{ padding: 22, display: "grid", gap: 12, background: "linear-gradient(180deg, rgba(248,251,255,0.86), rgba(255,255,255,0.78))" }}>
          <div className="eyebrow">Flow</div>
          <div className="section-title" style={{ fontSize: "1.2rem" }}>Calm transaction path</div>
          <div className="section-copy">Choose a score, confirm in wallet, then return to the latest synced state.</div>
        </div>
      </div>
    </section>
  );
}
