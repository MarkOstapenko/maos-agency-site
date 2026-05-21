"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BRAND } from "@/lib/constants";
import { easeOut } from "@/lib/motion";

const STORAGE_KEY = "maos-cinematic-loader-v2";
const MIN_DURATION_MS = 1600;
const EXIT_MS = 650;
const MAX_DURATION_MS = 3200;

type LoaderPhase = "active" | "exit" | "done";

const STEP_KEYS = ["s0", "s1", "s2"] as const;

function getStepIndex(progress: number): number {
  if (progress >= 72) return 2;
  if (progress >= 38) return 1;
  return 0;
}

export function CinematicLoader() {
  const t = useTranslations("loader");
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<LoaderPhase>("done");
  const [progress, setProgress] = useState(0);
  const [showMesh, setShowMesh] = useState(false);

  const stepIndex = getStepIndex(progress);
  const statusText = t(`steps.${STEP_KEYS[stepIndex]}`);
  const show = ready && phase !== "done" && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setShowMesh(mq.matches);
    const onChange = () => setShowMesh(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setReady(true);

    if (reduceMotion) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }

    setPhase("active");
    document.documentElement.classList.add("loader-active");

    let pageLoaded = document.readyState === "complete";
    const onLoad = () => {
      pageLoaded = true;
    };
    window.addEventListener("load", onLoad);

    const startedAt = Date.now();
    let exited = false;
    let frame = 0;

    const finish = () => {
      if (exited) return;
      exited = true;
      setProgress(100);
      setPhase("exit");
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setPhase("done");
        document.documentElement.classList.remove("loader-active");
      }, EXIT_MS);
    };

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const timeRatio = Math.min(elapsed / MIN_DURATION_MS, 1);
      let next = Math.round(timeRatio * 94);

      if (pageLoaded && elapsed >= MIN_DURATION_MS) {
        next = Math.min(94 + Math.round(((elapsed - MIN_DURATION_MS) / 400) * 6), 100);
      }

      if (elapsed >= MAX_DURATION_MS) next = 100;

      setProgress(next);

      const canFinish =
        next >= 100 && pageLoaded && elapsed >= MIN_DURATION_MS;
      const forceFinish = elapsed >= MAX_DURATION_MS;

      if (canFinish || forceFinish) {
        finish();
        return;
      }

      if (!exited) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      document.documentElement.classList.remove("loader-active");
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="cinematic-loader"
          role="status"
          aria-live="polite"
          aria-label={statusText}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: EXIT_MS / 1000, ease: easeOut },
          }}
          className="cinematic-loader fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#030303]"
        >
          <div className="cinematic-loader-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="cinematic-loader-grid pointer-events-none absolute inset-0 hidden sm:block" aria-hidden />
          <div className="cinematic-loader-scan pointer-events-none absolute inset-0 opacity-60 sm:opacity-100" aria-hidden />

          {showMesh && (
            <svg
              className="cinematic-loader-mesh pointer-events-none absolute inset-0 hidden h-full w-full opacity-30 md:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <line x1="15" y1="20" x2="50" y2="50" className="cinematic-loader-line" />
              <line x1="85" y1="25" x2="50" y2="50" className="cinematic-loader-line" />
              <line x1="50" y1="50" x2="20" y2="78" className="cinematic-loader-line" />
              <line x1="50" y1="50" x2="80" y2="75" className="cinematic-loader-line" />
              <circle cx="50" cy="50" r="1.2" className="cinematic-loader-node" />
            </svg>
          )}

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              className="cinematic-loader-brand"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div
                className="cinematic-loader-brand-orbit pointer-events-none absolute inset-0"
                aria-hidden
              />
              <motion.div
                className="brand-logo-mark-wrap cinematic-loader-brand-mark"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <BrandLogo size={64} priority className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" />
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-6 font-mono text-base font-semibold tracking-[0.06em] text-off-white sm:mt-7 sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45, ease: easeOut }}
            >
              {BRAND.name}
            </motion.p>

            <p className="premium-eyebrow mt-2 text-primary/80">{t("tagline")}</p>

            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-5 min-h-[1.25rem] font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]"
              >
                {statusText}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 sm:px-10 sm:pb-10">
            <div className="mx-auto max-w-xs sm:max-w-sm">
              <div className="mb-2 flex justify-between font-mono text-[10px] text-subtle">
                <span className="hidden sm:inline">{t("progressLabel")}</span>
                <span className="text-primary tabular-nums">{progress}%</span>
              </div>
              <div
                className="cinematic-loader-track h-[2px] overflow-hidden rounded-full sm:h-[3px]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label={t("progressLabel")}
              >
                <div
                  className="cinematic-loader-bar h-full rounded-full transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {phase === "exit" && (
            <motion.div
              className="cinematic-loader-reveal pointer-events-none absolute inset-0 bg-[#030303]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: EXIT_MS / 1000, ease: easeOut }}
              aria-hidden
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
