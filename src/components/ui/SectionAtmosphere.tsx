"use client";

import {
  SECTION_ATMOSPHERE,
  type SectionAtmosphereVariant,
} from "@/lib/section-atmosphere";
import { cn } from "@/lib/utils";
import { VisualAnchor } from "./VisualAnchor";

type SectionAtmosphereProps = {
  variant?: SectionAtmosphereVariant;
  className?: string;
};

export function SectionAtmosphere({
  variant = "default",
  className,
}: SectionAtmosphereProps) {
  const config = SECTION_ATMOSPHERE[variant];

  return (
    <div
      className={cn("section-atmosphere pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <div
        className={cn(
          "section-atmosphere-glow",
          `section-atmosphere-glow--${config.glow}`
        )}
      />
      {config.holoFrame && <div className="section-atmosphere-holo-frame" />}
      <div className="section-atmosphere-vignette" />
      {config.anchors.map((anchor, i) => (
        <VisualAnchor
          key={`${anchor.type}-${anchor.position}`}
          type={anchor.type}
          position={anchor.position}
          delay={i * 0.15}
        />
      ))}
    </div>
  );
}
