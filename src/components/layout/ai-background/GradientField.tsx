"use client";

import { useAiBackgroundProfile } from "./useAiBackgroundProfile";

export function GradientField() {
  const { animate, isMobile } = useAiBackgroundProfile();

  return (
    <div className="ai-gradient-field pointer-events-none absolute inset-0" aria-hidden>
      <div className="ai-base-wash" />
      <div
        className={`ai-cinematic-glow ai-cinematic-glow-a${animate ? "" : " ai-layer-static"}`}
      />
      <div
        className={`ai-cinematic-glow ai-cinematic-glow-b${animate ? "" : " ai-layer-static"}`}
      />

      <div
        className={`ambient-gradient-mesh ai-mesh-layer${animate ? "" : " ai-layer-static"}`}
      />

      {!isMobile && (
        <div
          className={`ai-gradient-shift${animate ? "" : " ai-layer-static"}`}
          aria-hidden
        />
      )}

      <div className="ambient-gradient-veil ai-veil-layer" />

      {animate && !isMobile && (
        <>
          <div className="ambient-glow-sweep ai-sweep-a" />
          <div className="ambient-glow-sweep ambient-glow-sweep-b ai-sweep-b" />
        </>
      )}

      <div className="ambient-edge-fade" />
    </div>
  );
}
