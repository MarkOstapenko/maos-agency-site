"use client";

import { useReducedMotion } from "framer-motion";

type WorkflowConnectorProps = {
  variant: "desktop" | "mobile";
};

export function WorkflowConnector({ variant }: WorkflowConnectorProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "mobile") {
    return (
      <div
        className="workflow-connector-mobile pointer-events-none absolute bottom-0 left-[1.35rem] top-0 w-px"
        aria-hidden
      >
        <div className="workflow-connector-track h-full w-full" />
        {!reduceMotion && <div className="workflow-connector-pulse-mobile" />}
      </div>
    );
  }

  return (
    <div
      className="workflow-connector-desktop pointer-events-none absolute left-[6%] right-[6%] top-[4.25rem] hidden h-16 md:block xl:top-[4.5rem]"
      aria-hidden
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 1000 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="workflow-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(227 42 57 / 0.08)" />
            <stop offset="50%" stopColor="rgb(227 42 57 / 0.45)" />
            <stop offset="100%" stopColor="rgb(227 42 57 / 0.08)" />
          </linearGradient>
        </defs>
        <path
          d="M 20 32 H 180 Q 200 32 200 16 H 500 Q 500 48 500 32 H 820 Q 840 32 840 48 H 980"
          className="workflow-connector-path"
          stroke="url(#workflow-line-grad)"
        />
        {!reduceMotion && (
          <circle r="5" className="workflow-connector-dot">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              path="M 20 32 H 180 Q 200 32 200 16 H 500 Q 500 48 500 32 H 820 Q 840 32 840 48 H 980"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
