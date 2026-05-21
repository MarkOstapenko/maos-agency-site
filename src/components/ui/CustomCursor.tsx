"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"]';

/** Outer glow — slowest trail */
const trailSpring = { stiffness: 70, damping: 18, mass: 0.55 };
/** Ring — medium lag */
const ringSpring = { stiffness: 110, damping: 22, mass: 0.45 };
/** Core — snappy follow */
const dotSpring = { stiffness: 480, damping: 34, mass: 0.15 };

function canUseCustomCursor(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(max-width: 767px)").matches
  );
}

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const hoveringRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const trailX = useSpring(mouseX, trailSpring);
  const trailY = useSpring(mouseY, trailSpring);
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    const queries = [
      "(pointer: fine)",
      "(hover: hover)",
      "(prefers-reduced-motion: reduce)",
      "(max-width: 767px)",
    ].map((q) => window.matchMedia(q));

    const sync = () => {
      const on = canUseCustomCursor();
      setActive(on);
      document.documentElement.classList.toggle("custom-cursor", on);
      if (!on) setVisible(false);
    };

    sync();
    queries.forEach((mq) => mq.addEventListener("change", sync));
    return () => {
      queries.forEach((mq) => mq.removeEventListener("change", sync));
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const isHover = !!(e.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR
      );
      if (isHover !== hoveringRef.current) {
        hoveringRef.current = isHover;
        setHovering(isHover);
      }
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [active, mouseX, mouseY, visible]);

  if (!active) return null;

  const ringScale = pressing ? 0.85 : hovering ? 1.95 : 1;
  const dotScale = pressing ? 0.65 : hovering ? 1.15 : 1;
  const trailScale = pressing ? 0.9 : hovering ? 1.65 : 1;

  return (
    <AnimatePresence>
      {visible && (
        <div className="custom-cursor-root" aria-hidden>
          <motion.div
            className="custom-cursor-trail"
            style={{
              x: trailX,
              y: trailY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: hovering ? 0.55 : 0.38,
              scale: trailScale,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />

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
              opacity: hovering ? 1 : 0.85,
              scale: ringScale,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

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
              scale: dotScale,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
