"use client";

import { useCallback, useContext } from "react";
import type Lenis from "lenis";
import { LenisContext } from "./LenisContext";
import {
  scrollForRouteChange,
  scrollToAnchor,
  scrollToHash,
  scrollToHashWhenReady,
  scrollToTop,
} from "./scroll-actions";

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export function useSmoothScroll() {
  const lenis = useLenis();

  return {
    lenis,
    scrollToTop: useCallback(() => scrollToTop(lenis), [lenis]),
    scrollToHash: useCallback(
      (hash: string, immediate?: boolean) => scrollToHash(lenis, hash, { immediate }),
      [lenis]
    ),
    scrollToHashWhenReady: useCallback(
      (hash: string) => scrollToHashWhenReady(lenis, hash),
      [lenis]
    ),
    scrollToAnchor: useCallback(
      (target: HTMLElement, immediate?: boolean) =>
        scrollToAnchor(lenis, target, { immediate }),
      [lenis]
    ),
    scrollForRouteChange: useCallback(
      (hash?: string) => scrollForRouteChange(lenis, hash ?? window.location.hash),
      [lenis]
    ),
  };
}
