"use client";

import {
  createContext,
  useContext,
  useRef,
  type RefObject,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { resolveParallaxSpeed, type ParallaxSpeed } from "@/lib/parallax";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

const ParallaxSectionContext =
  createContext<RefObject<HTMLElement | null> | null>(null);

type ParallaxSectionProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
};

export function ParallaxSection({
  children,
  className,
  id,
  ...rest
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <ParallaxSectionContext.Provider value={ref}>
      <section ref={ref} id={id} className={className} {...rest}>
        {children}
      </section>
    </ParallaxSectionContext.Provider>
  );
}

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  speed?: ParallaxSpeed;
  offset?: ScrollOffset;
  opacity?: [number, number, number];
  scale?: [number, number];
  /** When true, only the inner layer moves (layout stays stable) */
  layer?: boolean;
};

export function Parallax({
  children,
  className,
  innerClassName,
  speed = "medium",
  offset = ["start end", "end start"],
  opacity,
  scale,
  layer = true,
}: ParallaxProps) {
  const sectionRef = useContext(ParallaxSectionContext);
  const selfRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const travel = resolveParallaxSpeed(speed);

  const { scrollYProgress } = useScroll({
    target: sectionRef ?? selfRef,
    offset,
    layoutEffect: false,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${travel}%`, `-${travel}%`]
  );
  const opacityMotion = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    opacity ?? [1, 1, 1]
  );
  const scaleMotion = useTransform(
    scrollYProgress,
    [0, 1],
    scale ?? [1, 1]
  );

  if (reduceMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  const motionStyle = {
    y,
    ...(opacity ? { opacity: opacityMotion } : {}),
    ...(scale ? { scale: scaleMotion } : {}),
  };

  if (!layer) {
    return (
      <motion.div
        ref={selfRef}
        style={motionStyle}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={sectionRef ? undefined : selfRef} className={cn("parallax-layer", className)}>
      <motion.div style={motionStyle} className={cn("will-change-transform", innerClassName)}>
        {children}
      </motion.div>
    </div>
  );
}

/** Global scroll-linked shift for fixed / ambient layers */
export function ParallaxScroll({
  children,
  className,
  speed = "subtle",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: ParallaxSpeed;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const travel = resolveParallaxSpeed(speed);

  const y = useTransform(scrollY, (v) => v * (travel / 100) * -0.35);

  if (reduceMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

export function useParallaxProgress(
  target: RefObject<HTMLElement | null>,
  offset: ScrollOffset = ["start end", "end start"]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  return scrollYProgress;
}
