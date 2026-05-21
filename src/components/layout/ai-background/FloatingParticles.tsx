"use client";

import {
  FLOATING_PARTICLES,
  MOBILE_PARTICLE_LIMIT,
} from "@/lib/ai-background-data";
import { useAiBackgroundProfile } from "./useAiBackgroundProfile";

export function FloatingParticles() {
  const { animate, isMobile } = useAiBackgroundProfile();

  const particles = isMobile
    ? FLOATING_PARTICLES.slice(0, MOBILE_PARTICLE_LIMIT)
    : FLOATING_PARTICLES;

  return (
    <div
      className="ai-particles-layer pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ai-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: animate ? `${p.duration}s` : undefined,
            animationDelay: animate ? `${p.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
