"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { VoiceDemoPhase } from "@/lib/voice-demo";

type VoiceMicButtonProps = {
  phase: VoiceDemoPhase;
  onPress: () => void;
};

export function VoiceMicButton({ phase, onPress }: VoiceMicButtonProps) {
  const t = useTranslations("voiceAiDemo");
  const reduceMotion = useReducedMotion();
  const isListening = phase === "listening";
  const isBusy = phase === "listening" || phase === "processing";

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onPress}
        disabled={phase === "processing"}
        aria-label={t("micLabel")}
        className={cn(
          "voice-mic-btn relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border sm:h-20 sm:w-20",
          isListening && "voice-mic-btn-active",
          isBusy && "voice-mic-btn-busy"
        )}
        whileHover={!isBusy && !reduceMotion ? { scale: 1.04 } : undefined}
        whileTap={!reduceMotion ? { scale: 0.96 } : undefined}
      >
        {!reduceMotion && isListening && (
          <>
            <motion.span
              className="voice-mic-pulse absolute inset-0 rounded-full border border-primary/40"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.span
              className="voice-mic-pulse absolute inset-0 rounded-full border border-primary/25"
              animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.35 }}
            />
          </>
        )}
        {isBusy ? (
          <Square className="relative z-[1] h-6 w-6 text-off-white sm:h-7 sm:w-7" />
        ) : (
          <Mic className="relative z-[1] h-7 w-7 text-off-white sm:h-8 sm:w-8" />
        )}
      </motion.button>
      <p className="text-caption text-center text-muted">{t("micHint")}</p>
    </div>
  );
}
