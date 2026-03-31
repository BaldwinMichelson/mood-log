import { parseAbi } from "viem";

export const APP_NAME = "mood-log";
export const APP_TRACKING_ID = "app-045";
export const MOOD_LOG_ADDRESS = "0x19a5e51829bFCd4F7170F6D914A3D411fCF4847a" as const;

export const moodLogAbi = parseAbi([
  "function mood(address user) view returns (uint8)",
  "function updatedAt(address user) view returns (uint256)",
  "function setMood(uint8 _mood)",
  "event MoodUpdated(address indexed user, uint8 mood, uint256 timestamp)"
]);



