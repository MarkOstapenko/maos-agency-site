"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import {
  HUB_POSITION,
  INTEGRATION_POSITIONS,
} from "./integration-layout";

export function IntegrationsConnector() {
  const reduceMotion = useReducedMotion();
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      className="integrations-lines pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id={`int-grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(227 42 57 / 0.05)" />
          <stop offset="50%" stopColor="rgb(227 42 57 / 0.35)" />
          <stop offset="100%" stopColor="rgb(227 42 57 / 0.05)" />
        </linearGradient>
        <radialGradient id={`int-hub-${gradId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(227 42 57 / 0.25)" />
          <stop offset="100%" stopColor="rgb(227 42 57 / 0)" />
        </radialGradient>
      </defs>

      <circle
        cx={HUB_POSITION.x}
        cy={HUB_POSITION.y}
        r="22"
        fill={`url(#int-hub-${gradId})`}
        className="integrations-hub-field"
      />

      {INTEGRATION_POSITIONS.map((pos, i) => (
        <g key={i}>
          <line
            x1={HUB_POSITION.x}
            y1={HUB_POSITION.y}
            x2={pos.x}
            y2={pos.y}
            className="integrations-line"
            stroke={`url(#int-grad-${gradId})`}
          />
          <circle
            cx={pos.x}
            cy={pos.y}
            r="1.2"
            className="integrations-line-node"
          />
        </g>
      ))}

      {!reduceMotion && (
        <>
          <circle r="1.8" className="integrations-signal-dot">
            <animateMotion
              dur={`${5 + (INTEGRATION_POSITIONS.length % 3)}s`}
              repeatCount="indefinite"
              path={`M ${HUB_POSITION.x} ${HUB_POSITION.y} L ${INTEGRATION_POSITIONS[0].x} ${INTEGRATION_POSITIONS[0].y}`}
            />
          </circle>
          <circle r="1.8" className="integrations-signal-dot integrations-signal-dot-delayed">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              begin="1.2s"
              path={`M ${HUB_POSITION.x} ${HUB_POSITION.y} L ${INTEGRATION_POSITIONS[3].x} ${INTEGRATION_POSITIONS[3].y}`}
            />
          </circle>
          <circle r="1.8" className="integrations-signal-dot">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              begin="2.4s"
              path={`M ${HUB_POSITION.x} ${HUB_POSITION.y} L ${INTEGRATION_POSITIONS[5].x} ${INTEGRATION_POSITIONS[5].y}`}
            />
          </circle>
        </>
      )}

      <circle
        cx={HUB_POSITION.x}
        cy={HUB_POSITION.y}
        r="3.5"
        className="integrations-hub-core"
      />
    </svg>
  );
}
