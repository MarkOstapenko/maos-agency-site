"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () =>
    import("@/components/ui/CustomCursor").then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false }
);

/** Loads custom cursor JS only on desktop fine-pointer devices. */
export function DesktopCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!coarse && !mobile && !reduced);
  }, []);

  if (!enabled) return null;
  return <CustomCursor />;
}
