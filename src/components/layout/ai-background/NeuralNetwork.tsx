"use client";

import { NEURAL_EDGES, NEURAL_NODES } from "@/lib/ai-background-data";
import { useAiBackgroundProfile } from "./useAiBackgroundProfile";

const nodeMap = new Map(NEURAL_NODES.map((n) => [n.id, n]));

export function NeuralNetwork() {
  const { animate } = useAiBackgroundProfile();

  return (
    <div className="ai-neural-layer pointer-events-none absolute inset-0" aria-hidden>
      <svg
        className="ai-neural-svg h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ai-neural-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ai-red-soft)" />
            <stop offset="50%" stopColor="var(--ai-red-mid)" />
            <stop offset="100%" stopColor="var(--ai-red-soft)" />
          </linearGradient>
        </defs>

        {NEURAL_EDGES.map(([a, b], i) => {
          const n1 = nodeMap.get(a);
          const n2 = nodeMap.get(b);
          if (!n1 || !n2) return null;

          return (
            <line
              key={`${a}-${b}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              className="ai-neural-line"
              style={
                animate
                  ? { animationDelay: `${(i % 12) * 0.45}s` }
                  : undefined
              }
            />
          );
        })}

        {NEURAL_NODES.map((node, i) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.4"
            className="ai-neural-node"
            style={
              animate ? { animationDelay: `${(i % 8) * 0.35}s` } : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}
