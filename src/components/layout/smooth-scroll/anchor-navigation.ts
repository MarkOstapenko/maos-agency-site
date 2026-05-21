import type Lenis from "lenis";
import { scrollToHash } from "./scroll-actions";

export function isSamePageHashLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href || href === "#") return false;

  const url = new URL(anchor.href, window.location.href);
  if (!url.hash || url.hash === "#") return false;

  return (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  );
}

export function handleAnchorClick(
  event: MouseEvent,
  lenis: Lenis
): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  const anchor = (event.target as HTMLElement).closest("a");
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  if (!isSamePageHashLink(anchor)) return false;

  const url = new URL(anchor.href, window.location.href);
  const hash = url.hash;
  if (!hash || !scrollToHash(lenis, hash)) return false;

  event.preventDefault();
  history.pushState(null, "", `${url.pathname}${url.search}${hash}`);
  return true;
}

export function bindAnchorNavigation(lenis: Lenis): () => void {
  const onClick = (e: MouseEvent) => {
    handleAnchorClick(e, lenis);
  };

  const onHashChange = () => {
    const hash = window.location.hash;
    if (hash) scrollToHash(lenis, hash);
  };

  document.addEventListener("click", onClick, { passive: false });
  window.addEventListener("hashchange", onHashChange);

  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("hashchange", onHashChange);
  };
}
