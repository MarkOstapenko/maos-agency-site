"use client";

import { cn } from "@/lib/utils";
import { AiGrid } from "./AiGrid";
import { FloatingParticles } from "./FloatingParticles";
import { GradientField } from "./GradientField";
import { NeuralNetwork } from "./NeuralNetwork";
import { useAiBackgroundProfile } from "./useAiBackgroundProfile";

export type AiBackgroundSystemProps = {
  /** Additional classes on the root layer */
  className?: string;
};

/**
 * Site-wide animated AI atmosphere (MaOs brand).
 * Layers: red glow gradients → soft grid → neural lines → particles.
 * Subtle by default; respects prefers-reduced-motion and mobile budgets.
 */
export function AiBackgroundSystem({ className }: AiBackgroundSystemProps) {
  const { lite } = useAiBackgroundProfile();

  return (
    <div
      className={cn("ai-bg-system ambient-bg", className)}
      aria-hidden
    >
      <GradientField />
      <AiGrid />
      {!lite && (
        <>
          <NeuralNetwork />
          <FloatingParticles />
        </>
      )}
    </div>
  );
}
