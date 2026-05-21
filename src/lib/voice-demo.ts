export type VoiceDemoPhase = "idle" | "listening" | "processing" | "response";

export const VOICE_DEMO_TIMING = {
  listeningMs: 2400,
  processingMs: 1900,
} as const;

export function canStartVoiceDemo(phase: VoiceDemoPhase): boolean {
  return phase === "idle" || phase === "response";
}
