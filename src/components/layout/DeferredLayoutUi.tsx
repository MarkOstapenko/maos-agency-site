"use client";

import dynamic from "next/dynamic";

export const CinematicLoader = dynamic(
  () =>
    import("@/components/layout/CinematicLoader").then((m) => ({
      default: m.CinematicLoader,
    })),
  { ssr: false }
);

export const AiBackgroundSystem = dynamic(
  () =>
    import("@/components/layout/ai-background").then((m) => ({
      default: m.AiBackgroundSystem,
    })),
  { ssr: false }
);

export const FloatingTelegramButton = dynamic(
  () =>
    import("@/components/ui/FloatingTelegramButton").then((m) => ({
      default: m.FloatingTelegramButton,
    })),
  { ssr: false }
);
