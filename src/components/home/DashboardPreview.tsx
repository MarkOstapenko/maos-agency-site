"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Bot,
  MessageSquare,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const metrics = [
  { key: "leads" as const, value: "127", trend: "+24%", up: true },
  { key: "processed" as const, value: "98%", trend: "AI", up: true },
  { key: "response" as const, value: "< 2m", trend: "-68%", up: true },
  { key: "uptime" as const, value: "99.9%", trend: "live", up: true },
];

const sparkHeights = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

function Sparkline() {
  return (
    <div className="flex h-10 items-end gap-[3px]">
      {sparkHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-primary/80"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.9 + i * 0.04, duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function DashboardPreview() {
  const t = useTranslations("dashboard");
  const reduceMotion = useReducedMotion();
  const pipelineSteps = t.raw("pipeline.steps") as string[];

  return (
    <div className="relative">
      {/* Floating cards */}
      <motion.div
        className="absolute -left-2 top-8 z-20 hidden rounded-2xl border border-white/10 bg-dark/95 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-left-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-muted">{t("widgets.telegram")}</p>
            <p className="text-xs font-semibold text-off-white">{t("widgets.leads")}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-2 bottom-24 z-20 hidden rounded-2xl border border-primary/20 bg-primary/10 p-3 backdrop-blur-xl sm:block lg:-right-8"
        animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Zap className="h-5 w-5 text-primary" />
        <p className="mt-1 text-xs font-semibold text-off-white">{t("widgets.aiActive")}</p>
        <p className="text-[10px] text-primary/80">{t("widgets.processing")}</p>
      </motion.div>

      <motion.div
        className="absolute -right-4 top-1/3 z-20 hidden rounded-xl border border-white/10 bg-black/80 px-3 py-2 backdrop-blur md:block"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153/0.8)]" />
          <span className="font-mono text-[10px] text-muted">{t("widgets.live")}</span>
        </div>
      </motion.div>

      <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-primary/18 via-transparent to-primary/6 blur-sm" />

      <motion.div
        className="premium-card premium-card-featured relative overflow-hidden p-4 sm:p-6"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

        {/* Header */}
        <div className="relative mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Workflow className="h-4 w-4 shrink-0 text-primary" />
              <p className="premium-eyebrow text-primary">{t("title")}</p>
            </div>
            <p className="text-caption sm:text-sm">{t("subtitle")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
            <div className="hidden sm:block">
              <Sparkline />
            </div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_rgb(227_42_57/0.5)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="relative grid grid-cols-2 gap-3">
          {metrics.map(({ key, value, trend, up }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
              className="group rounded-2xl border border-white/[0.05] bg-black/40 p-4 transition-colors hover:border-primary/20 hover:bg-primary/[0.03]"
            >
              <div className="flex items-center justify-between">
                <p className="text-caption">{t(key)}</p>
                <TrendingUp
                  className={cn("h-3.5 w-3.5 opacity-60", up ? "text-primary" : "text-subtle")}
                />
              </div>
              <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-off-white sm:text-2xl">
                {value}
              </p>
              <p className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                {trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="relative mt-5 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-black/50 to-primary/[0.03] p-4 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/15">
              <Bot className="h-5 w-5 text-primary" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-dark bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex justify-between text-[10px]">
                <span className="text-muted">{t("pipeline.label")}</span>
                <span className="font-mono text-primary">78%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <Activity className="h-5 w-5 shrink-0 text-primary" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {pipelineSteps.map((step, i) => (
              <motion.span
                key={step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="text-caption inline-flex items-center rounded-lg border border-white/5 bg-white/3 px-2 py-1 font-mono"
              >
                {step}
                {i < pipelineSteps.length - 1 && (
                  <span className="ml-1.5 text-primary/50">→</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
