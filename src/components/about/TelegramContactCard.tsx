"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PARTICLE_OFFSETS = [
  { left: "12%", top: "18%", delay: 0, size: 3 },
  { left: "78%", top: "12%", delay: 0.8, size: 2 },
  { left: "88%", top: "42%", delay: 1.4, size: 2 },
  { left: "6%", top: "55%", delay: 0.4, size: 2 },
  { left: "72%", top: "72%", delay: 1.1, size: 3 },
  { left: "22%", top: "82%", delay: 1.8, size: 2 },
  { left: "55%", top: "8%", delay: 0.6, size: 2 },
] as const;

export function TelegramContactCard() {
  const t = useTranslations("aboutPage.contact");
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={BRAND.telegram}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="telegram-contact-card premium-card premium-card-interactive premium-card-featured group relative flex min-h-[22rem] flex-col overflow-hidden sm:min-h-[24rem]"
    >
      <div className="telegram-contact-ambient pointer-events-none" aria-hidden />
      <div className="telegram-contact-grid pointer-events-none" aria-hidden />
      <div className="telegram-contact-scan pointer-events-none" aria-hidden />

      {!reduceMotion &&
        PARTICLE_OFFSETS.map((p, i) => (
          <span
            key={i}
            className="telegram-contact-particle pointer-events-none absolute rounded-full bg-primary/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
            }}
            aria-hidden
          />
        ))}

      <div className="premium-card-glow pointer-events-none" aria-hidden />

      <div className="telegram-contact-inner card-pad relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="premium-eyebrow text-primary/90">{t("telegram")}</p>
          <span className="telegram-contact-online">
            <span className="telegram-contact-online-indicator" aria-hidden>
              <span className="telegram-contact-online-pulse" />
              <span className="telegram-contact-online-dot" />
            </span>
            {t("online")}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4 sm:mt-6">
          <div className="telegram-contact-icon-wrap">
            <MessageCircle className="h-7 w-7 text-primary sm:h-8 sm:w-8" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-all text-xl font-bold tracking-tight text-off-white sm:text-2xl">
              {t("telegramHandle")}
            </p>
            <p className="text-caption mt-1.5">{t("telegramHint")}</p>
          </div>
        </div>

        <div className="telegram-contact-metrics mt-6 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
          <div className="telegram-contact-metric telegram-contact-metric-featured">
            <p className="telegram-contact-metric-value">{t("responseBadge")}</p>
            <p className="telegram-contact-metric-label">{t("responseBadgeLabel")}</p>
          </div>
          <div className="telegram-contact-metric">
            <p className="telegram-contact-metric-value">{t("responseValue")}</p>
            <p className="telegram-contact-metric-label">{t("response")}</p>
          </div>
        </div>

        <div className="telegram-contact-activity mt-5 flex-1 space-y-2 sm:mt-6">
          <p className="telegram-contact-activity-label">{t("activityTitle")}</p>
          <ul className="space-y-2" aria-hidden>
            {(["a1", "a2", "a3"] as const).map((key, i) => (
              <li key={key} className="telegram-contact-activity-row">
                <span
                  className={cn(
                    "telegram-contact-activity-dot",
                    i === 0 && "telegram-contact-activity-dot-live"
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-[11px] text-off-white/80 sm:text-xs">
                  {t(`activity.${key}`)}
                </span>
                <span className="font-mono text-[9px] text-subtle sm:text-[10px]">
                  {t(`activityTime.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="telegram-contact-service mt-4 rounded-xl border border-white/[0.06] bg-black/25 px-3.5 py-3 sm:px-4">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
            <p className="text-[11px] font-medium text-muted sm:text-xs">{t("service")}</p>
          </div>
          <p className="mt-1.5 text-sm font-medium leading-snug text-off-white">
            {t("serviceValue")}
          </p>
        </div>

        <div className="telegram-contact-cta mt-5 flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 transition-[border-color,background,box-shadow] duration-300 group-hover:border-primary/40 group-hover:bg-primary/14 sm:mt-6">
          <span className="text-sm font-semibold text-off-white">{t("openChat")}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}
