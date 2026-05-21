/** Premium ease-out curve for anchor scroll animations */
export const LENIS_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Default Lenis instance options — tuned for inertia on wheel and touch */
export const LENIS_OPTIONS = {
  lerp: 0.092,
  duration: 1.2,
  easing: LENIS_EASING,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.075,
  touchMultiplier: 1.1,
  wheelMultiplier: 0.92,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  autoResize: true,
  overscroll: true,
} as const;

export const ANCHOR_SCROLL_DURATION = 1.35;

/** Retries when scrolling to a hash target that may mount after route transition */
export const HASH_SCROLL_MAX_RETRIES = 8;
export const HASH_SCROLL_RETRY_MS = 80;
