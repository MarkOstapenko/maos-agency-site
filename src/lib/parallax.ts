/** Viewport-relative travel (%) — higher = stronger parallax */
export const PARALLAX = {
  bg: 28,
  slow: 18,
  medium: 12,
  fast: 6,
  subtle: 4,
  /** Foreground moves opposite direction for depth */
  lift: -10,
  float: -14,
} as const;

export type ParallaxSpeed = keyof typeof PARALLAX | number;

export function resolveParallaxSpeed(speed: ParallaxSpeed): number {
  return typeof speed === "number" ? speed : PARALLAX[speed];
}
