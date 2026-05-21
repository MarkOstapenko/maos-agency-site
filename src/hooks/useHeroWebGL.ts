"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { MOBILE_MEDIA_QUERY } from "@/hooks/useMediaQuery";

const REDUCED_DATA_MQ = "(prefers-reduced-data: reduce)";

export function useHeroWebGL() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const mobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    const reducedData = window.matchMedia(REDUCED_DATA_MQ).matches;
    const lowMemory =
      "deviceMemory" in navigator &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4;

    if (mobile || reducedData || lowMemory) return;

    const start = () => setEnabled(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(start, 500);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return enabled;
}
