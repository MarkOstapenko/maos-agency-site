"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useHeroWebGL } from "@/hooks/useHeroWebGL";
import { cn } from "@/lib/utils";
import { HeroAiCoreFallback } from "./HeroAiCoreFallback";

const HeroAiCoreScene = dynamic(
  () =>
    import("./HeroAiCoreScene").then((m) => ({
      default: m.HeroAiCoreScene,
    })),
  {
    ssr: false,
    loading: () => <HeroAiCoreFallback className="h-full w-full" />,
  }
);

type HeroAiCoreProps = {
  className?: string;
};

export function HeroAiCore({ className }: HeroAiCoreProps) {
  const reduceMotion = useReducedMotion();
  const enableWebGL = useHeroWebGL();
  const [webglFailed, setWebglFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  const useFallback = reduceMotion || !enableWebGL || webglFailed;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || useFallback) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [useFallback]);

  const handleUnavailable = useCallback(() => setWebglFailed(true), []);

  return (
    <div
      ref={rootRef}
      className={cn("hero-ai-core pointer-events-none", className)}
      aria-hidden
    >
      {useFallback ? (
        <HeroAiCoreFallback className="h-full w-full" />
      ) : (
        <HeroAiCoreScene active={visible} onUnavailable={handleUnavailable} />
      )}
    </div>
  );
}
