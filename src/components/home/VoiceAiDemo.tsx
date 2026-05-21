"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioLines } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Parallax, ParallaxSection, ParallaxScroll } from "@/components/ui/Parallax";
import { MotionReveal } from "@/components/ui/motion";
import {
  VOICE_DEMO_TIMING,
  canStartVoiceDemo,
  type VoiceDemoPhase,
} from "@/lib/voice-demo";
import { SoundWaves } from "./voice-demo/SoundWaves";
import { VoiceMicButton } from "./voice-demo/VoiceMicButton";
import { VoiceResponseCards } from "./voice-demo/VoiceResponseCards";
import { VoiceStatusBadge } from "./voice-demo/VoiceStatusBadge";

export function VoiceAiDemo() {
  const t = useTranslations("voiceAiDemo");
  const [phase, setPhase] = useState<VoiceDemoPhase>("idle");

  useEffect(() => {
    if (phase === "listening") {
      const id = window.setTimeout(
        () => setPhase("processing"),
        VOICE_DEMO_TIMING.listeningMs
      );
      return () => window.clearTimeout(id);
    }
    if (phase === "processing") {
      const id = window.setTimeout(
        () => setPhase("response"),
        VOICE_DEMO_TIMING.processingMs
      );
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  const handleMicPress = useCallback(() => {
    if (!canStartVoiceDemo(phase)) return;
    if (phase === "response") {
      setPhase("idle");
      return;
    }
    setPhase("listening");
  }, [phase]);

  const handleStop = useCallback(() => {
    if (phase === "listening") setPhase("processing");
  }, [phase]);

  const isBusy = phase === "listening" || phase === "processing";

  return (
    <ParallaxSection id="voice-ai" className="section-band section-y section-defer relative overflow-hidden">
      <ParallaxScroll speed="slow" className="pointer-events-none absolute inset-0">
        <div className="voice-demo-glow absolute inset-0" aria-hidden />
      </ParallaxScroll>

      <Container className="relative">
        <Parallax speed="subtle" className="section-head">
          <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
        </Parallax>

        <MotionReveal>
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
            <PremiumCard className="voice-demo-panel order-2 lg:order-1">
              <div className="card-pad flex flex-col items-center py-8 sm:py-10">
                <VoiceStatusBadge phase={phase} />

                <div className="relative my-8 flex h-24 w-full items-center justify-center sm:my-10 sm:h-28">
                  <AnimatePresence>
                    {(phase === "listening" || phase === "processing") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <SoundWaves phase={phase} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <VoiceMicButton
                  phase={phase}
                  onPress={phase === "listening" ? handleStop : handleMicPress}
                />

                {phase === "response" && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setPhase("idle")}
                    className="text-caption mt-6 underline-offset-4 hover:text-off-white hover:underline"
                  >
                    {t("tryAgain")}
                  </motion.button>
                )}
              </div>
            </PremiumCard>

            <div className="order-1 lg:order-2">
              <div className="mb-4 flex items-center gap-2">
                <AudioLines className="h-4 w-4 text-primary" />
                <p className="premium-eyebrow text-primary/90">{t("previewLabel")}</p>
              </div>
              <p className="text-body mb-5 max-w-md text-sm leading-relaxed sm:text-base">
                {t("previewDescription")}
              </p>

              <PremiumCard featured className="voice-demo-cards-panel min-h-[200px]">
                <div className="card-pad-sm sm:card-pad">
                  <AnimatePresence mode="wait">
                    {phase !== "response" ? (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/25 px-6 py-10 text-center sm:min-h-[220px]"
                      >
                        <p className="text-caption max-w-xs leading-relaxed text-subtle">
                          {isBusy ? t("placeholder.busy") : t("placeholder.idle")}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cards"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <VoiceResponseCards phase={phase} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </PremiumCard>

              <ul className="mt-5 grid gap-2 sm:grid-cols-3 sm:gap-3">
                {(["f1", "f2", "f3"] as const).map((key) => (
                  <li
                    key={key}
                    className="rounded-xl border border-white/6 bg-black/30 px-3 py-2.5 text-center"
                  >
                    <p className="text-caption leading-snug">{t(`features.${key}`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </ParallaxSection>
  );
}
