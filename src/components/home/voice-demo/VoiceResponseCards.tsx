"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Calendar, User } from "lucide-react";
import { useTranslations } from "next-intl";
import type { VoiceDemoPhase } from "@/lib/voice-demo";

type VoiceResponseCardsProps = {
  phase: VoiceDemoPhase;
};

export function VoiceResponseCards({ phase }: VoiceResponseCardsProps) {
  const t = useTranslations("voiceAiDemo");
  const reduceMotion = useReducedMotion();
  const show = phase === "response";

  const cards = [
    {
      key: "user",
      icon: User,
      label: t("cards.userLabel"),
      text: t("samples.user"),
      variant: "user" as const,
    },
    {
      key: "ai",
      icon: Bot,
      label: t("cards.aiLabel"),
      text: t("samples.ai"),
      variant: "ai" as const,
    },
    {
      key: "action",
      icon: Calendar,
      label: t("cards.actionLabel"),
      text: t("samples.action"),
      variant: "action" as const,
    },
  ];

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="voice-response-cards mt-6 space-y-3 sm:mt-8 sm:space-y-3.5"
    >
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.key}
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.12 + i * 0.14, duration: 0.4 }}
            className={`voice-response-card voice-response-card-${card.variant}`}
          >
            <div className="flex items-start gap-3">
              <div className="voice-response-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-black/40">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {card.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-off-white/90 sm:text-[15px]">
                  {card.text}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
