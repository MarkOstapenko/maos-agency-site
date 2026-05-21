"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { VoiceDemoPhase } from "@/lib/voice-demo";
import { cn } from "@/lib/utils";

type VoiceStatusBadgeProps = {
  phase: VoiceDemoPhase;
};

export function VoiceStatusBadge({ phase }: VoiceStatusBadgeProps) {
  const t = useTranslations("voiceAiDemo");

  const statusKey =
    phase === "listening"
      ? "listening"
      : phase === "processing"
        ? "processing"
        : phase === "response"
          ? "response"
          : "idle";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={statusKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "voice-status-badge inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]",
          phase === "listening" && "voice-status-listening",
          phase === "processing" && "voice-status-processing",
          phase === "response" && "voice-status-response",
          phase === "idle" && "voice-status-idle"
        )}
      >
        <span className="relative flex h-2 w-2">
          {(phase === "listening" || phase === "processing") && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          )}
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              phase === "idle" ? "bg-white/25" : "bg-primary"
            )}
          />
        </span>
        {t(`states.${statusKey}`)}
        {phase === "processing" && (
          <span className="voice-processing-dots ml-0.5 inline-flex gap-0.5">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
