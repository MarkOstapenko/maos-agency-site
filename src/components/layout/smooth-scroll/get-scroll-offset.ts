const EXTRA_GAP = 16;

/** Offset for fixed navbar when scrolling to anchors */
export function getScrollOffset(): number {
  if (typeof document === "undefined") return -96;

  const header = document.querySelector("header");
  if (!header) return -96;

  return -(header.getBoundingClientRect().height + EXTRA_GAP);
}
