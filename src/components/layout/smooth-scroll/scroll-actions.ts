import type Lenis from "lenis";
import {
  ANCHOR_SCROLL_DURATION,
  HASH_SCROLL_MAX_RETRIES,
  HASH_SCROLL_RETRY_MS,
} from "./constants";
import { getScrollOffset } from "./get-scroll-offset";

export function scrollToTop(lenis: Lenis | null): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function resolveHashTarget(hash: string): HTMLElement | null {
  if (!hash || hash === "#" || hash.length < 2) return null;

  try {
    const target = document.querySelector(hash);
    return target instanceof HTMLElement ? target : null;
  } catch {
    return null;
  }
}

export function scrollToAnchor(
  lenis: Lenis | null,
  target: HTMLElement,
  options?: { immediate?: boolean }
): void {
  const offset = getScrollOffset();

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: options?.immediate ? 0 : ANCHOR_SCROLL_DURATION,
      immediate: options?.immediate,
      force: true,
      lock: !options?.immediate,
    });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({
    top,
    behavior: options?.immediate ? "instant" : "smooth",
  });
}

export function scrollToHash(
  lenis: Lenis | null,
  hash: string,
  options?: { immediate?: boolean }
): boolean {
  const target = resolveHashTarget(hash);
  if (!target) return false;

  scrollToAnchor(lenis, target, options);
  return true;
}

/** Retries until the hash target exists (lazy sections / route transitions). */
export function scrollToHashWhenReady(
  lenis: Lenis | null,
  hash: string,
  options?: { immediate?: boolean; maxRetries?: number }
): void {
  const maxRetries = options?.maxRetries ?? HASH_SCROLL_MAX_RETRIES;
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToHash(lenis, hash, options)) {
      lenis?.resize();
      return;
    }
    attempts += 1;
    if (attempts < maxRetries) {
      window.setTimeout(tryScroll, HASH_SCROLL_RETRY_MS);
    }
  };

  tryScroll();
}

export function scrollForRouteChange(
  lenis: Lenis | null,
  hash: string
): void {
  if (hash && hash !== "#") {
    scrollToHashWhenReady(lenis, hash);
    return;
  }
  scrollToTop(lenis);
  requestAnimationFrame(() => lenis?.resize());
}
