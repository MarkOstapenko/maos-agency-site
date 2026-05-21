"use client";

import { useAiBackgroundProfile } from "./useAiBackgroundProfile";

export function AiGrid() {
  const { animate } = useAiBackgroundProfile();

  return (
    <div className="ai-grid-layer pointer-events-none absolute inset-0" aria-hidden>
      <div className="ai-grid-overlay" />
      <div
        className={`ai-grid-perspective${animate ? "" : " ai-layer-static"}`}
      >
        <div className="ai-grid-floor" />
      </div>
    </div>
  );
}
