"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"]';

const ringSpring = { stiffness: 140, damping: 22, mass: 0.4 };
const dotSpring = { stiffness: 500, damping: 32, mass: 0.2 };

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const enable = () => {
      const on = finePointer.matches && !reducedMotion.matches;
      setActive(on);
      document.documentElement.classList.toggle("custom-cursor", on);
      if (!on) setVisible(false);
    };

    enable();
    finePointer.addEventListener("change", enable);
    reducedMotion.addEventListener("change", enable);

    return () => {
      finePointer.removeEventListener("change", enable);
      reducedMotion.removeEventListener("change", enable);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [active, mouseX, mouseY, visible]);

  if (!active) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="custom-cursor-root" aria-hidden>
          {/* Trailing ring */}
          <motion.div
            className="custom-cursor-ring"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: pressing ? 0.88 : hovering ? 1.55 : 1,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Core dot */}
          <motion.div
            className="custom-cursor-dot"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: pressing ? 0.75 : hovering ? 1.35 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />

          {/* Hover crosshair ticks */}
          <motion.div
            className="custom-cursor-crosshair"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={false}
            animate={{
              opacity: hovering ? 1 : 0,
              scale: hovering ? 1 : 0.85,
            }}
            transition={{ duration: 0.25 }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
