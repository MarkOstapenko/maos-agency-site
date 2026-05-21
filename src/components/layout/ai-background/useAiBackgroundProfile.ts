"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type AiBackgroundProfile = {
  reducedMotion: boolean;
  isMobile: boolean;
  animate: boolean;
  /** Gradient + grid only — skips neural mesh and particles */
  lite: boolean;
};

import { MOBILE_MEDIA_QUERY } from "@/hooks/useMediaQuery";

const REDUCED_DATA_MQ = "(prefers-reduced-data: reduce)";

export function useAiBackgroundProfile(): AiBackgroundProfile {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [reducedData, setReducedData] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const dataMq = window.matchMedia(REDUCED_DATA_MQ);
    const update = () => {
      setIsMobile(mobileMq.matches);
      setReducedData(dataMq.matches);
    };
    update();
    mobileMq.addEventListener("change", update);
    dataMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      dataMq.removeEventListener("change", update);
    };
  }, []);

  const lite = Boolean(reducedMotion) || isMobile || reducedData;

  return {
    reducedMotion: Boolean(reducedMotion),
    isMobile,
    animate: !reducedMotion && !reducedData,
    lite,
  };
}
