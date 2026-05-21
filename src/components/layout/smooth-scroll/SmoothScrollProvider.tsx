"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { bindAnchorNavigation } from "./anchor-navigation";
import { LenisContext } from "./LenisContext";
import { LENIS_OPTIONS } from "./constants";
import { scrollToHashWhenReady } from "./scroll-actions";

import "lenis/dist/lenis.css";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function bindLoaderSync(lenis: Lenis): () => void {
  const sync = () => {
    if (document.documentElement.classList.contains("loader-active")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };

  sync();
  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

function bindResizeSync(lenis: Lenis): () => void {
  const resize = () => lenis.resize();

  const observer =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;

  observer?.observe(document.documentElement);
  if (document.body) observer?.observe(document.body);

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("orientationchange", resize, { passive: true });

  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("orientationchange", resize);
  };
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduceMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped"
      );
      return;
    }

    let destroyed = false;
    let instance: Lenis | null = null;
    let unbindAnchors: (() => void) | undefined;
    let unbindLoader: (() => void) | undefined;
    let unbindResize: (() => void) | undefined;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (destroyed) return;

      instance = new LenisCtor({
        ...LENIS_OPTIONS,
        autoRaf: true,
        prevent: (node) =>
          Boolean(
            node.closest(
              "textarea, select, input[type='range'], [data-lenis-prevent]"
            )
          ),
      });

      lenisRef.current = instance;
      setLenis(instance);

      document.documentElement.classList.add("lenis", "lenis-smooth");

      unbindLoader = bindLoaderSync(instance);
      unbindResize = bindResizeSync(instance);
      unbindAnchors = bindAnchorNavigation(instance);

      requestAnimationFrame(() => {
        instance?.resize();
        const hash = window.location.hash;
        if (hash) scrollToHashWhenReady(instance, hash);
      });
    });

    return () => {
      destroyed = true;
      unbindAnchors?.();
      unbindLoader?.();
      unbindResize?.();
      instance?.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped"
      );
    };
  }, [reduceMotion]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
