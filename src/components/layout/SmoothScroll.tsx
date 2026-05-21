"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./smooth-scroll/SmoothScrollProvider";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scroll. Wrap once in the locale layout.
 * Inertia on wheel/touch, same-page anchors, reduced-motion fallback.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}

export { useLenis, useSmoothScroll } from "./smooth-scroll/useSmoothScroll";
export {
  scrollToTop,
  scrollToHash,
  scrollForRouteChange,
} from "./smooth-scroll";
